// ─── lib/rfq-pdf.ts ────────────────────────────────────────────────────────────
// Lazily imported on RFQ submit — never in the initial bundle.
// Generates a watermarked PDF of the submitted RFQ and triggers a one-time download.
// ──────────────────────────────────────────────────────────────────────────────

import type { RFQFormState, ProductSpec } from "@/app/rfq/RFQContent";
import { getProductOptions } from "@/lib/rfq-product-options";

// ── Minimal jsPDF interface — typed against what we actually call ───────────────
// We use a double-cast through unknown because @types/jspdf is for v1.3
// while the installed package is v4.x with different export structure.

interface JsPDFDoc {
  addPage(): JsPDFDoc;
  setPage(n: number): JsPDFDoc;
  getNumberOfPages(): number;
  addImage(data: string, format: string, x: number, y: number, w: number, h: number, alias?: string): JsPDFDoc;
  text(text: string | string[], x: number, y: number, opts?: { align?: "left" | "center" | "right"; angle?: number; maxWidth?: number }): JsPDFDoc;
  setFont(name: string, style: string): JsPDFDoc;
  setFontSize(size: number): JsPDFDoc;
  setTextColor(r: number, g: number, b: number): JsPDFDoc;
  setFillColor(r: number, g: number, b: number): JsPDFDoc;
  setDrawColor(r: number, g: number, b: number): JsPDFDoc;
  setLineWidth(w: number): JsPDFDoc;
  line(x1: number, y1: number, x2: number, y2: number): JsPDFDoc;
  roundedRect(x: number, y: number, w: number, h: number, rx: number, ry: number, style: string): JsPDFDoc;
  splitTextToSize(text: string, maxW: number): string[];
  output(type: "blob"): Blob;
}

interface JsPDFCtor {
  new(opts: { orientation: string; unit: string; format: string }): JsPDFDoc;
}

// ── Page geometry (A4 mm) ──────────────────────────────────────────────────────

const PW = 210, PH = 297;
const ML = 20, MR = 20, MB = 25;
const UW = PW - ML - MR; // 170mm usable width
const LH = 5.2;          // standard line height mm
const LW = 55;            // label column width mm (row helper)
const LOGO_RATIO = 695 / 335; // header logo natural dims

// 9 watermark centers [x, y] in mm — 3×3 staggered grid covering full page
const WM_POS: [number, number][] = [
  [43, 62],  [106, 68],  [167, 60],
  [38, 148], [106, 143], [172, 152],
  [44, 234], [107, 240], [165, 228],
];

// ── Entry point ────────────────────────────────────────────────────────────────

export async function generateRFQPdf(
  formState: RFQFormState,
  submittedAt: string
): Promise<void> {
  // Load jsPDF + company logo concurrently
  const [jsPDFModule, logoImg] = await Promise.all([
    import("jspdf") as Promise<unknown>,
    loadImg("/images/logo/mz-global-trading-logo-header.webp"),
  ]);
  const mod = jsPDFModule as { jsPDF?: JsPDFCtor; default?: JsPDFCtor };
  const JsPDF = (mod.jsPDF ?? mod.default) as JsPDFCtor;

  // Prepare two canvas variants of the logo
  const headerLogoUrl = bakeCanvas(logoImg, 1.0, 0, 800);    // full-opacity header
  const wmUrl = bakeCanvas(logoImg, 0.12, -38, 600);          // 12% opacity, -38° for watermark
  const [wmW, wmH] = wmBBox(40, LOGO_RATIO, 38);              // watermark bounding box in mm

  const doc = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  let y = 0;
  let totalPages = 1;

  // ── Tiny layout DSL ─────────────────────────────────────────────────────────

  function newPage() {
    doc.addPage();
    totalPages++;
    y = 22;
  }

  function guard(need = LH * 2) {
    if (y + need > PH - MB) newPage();
  }

  function sBar(label: string) {
    guard(12);
    doc.setFillColor(13, 27, 42);
    doc.roundedRect(ML, y, UW, 8, 1.2, 1.2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(label, ML + 4, y + 5.4);
    y += 10.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
  }

  function sHead(label: string) {
    guard(9);
    y += 1.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(212, 160, 23);
    doc.text(label.toUpperCase(), ML, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
  }

  function row(label: string, value: string | null | undefined) {
    if (!value?.trim()) return;
    guard(LH);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(135, 135, 135);
    doc.text(label, ML, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(13, 27, 42);
    const lines = doc.splitTextToSize(value.trim(), UW - LW) as string[];
    lines.forEach((ln, i) => {
      if (i > 0) { y += LH; guard(); }
      doc.text(ln, ML + LW, y);
    });
    y += LH;
  }

  function gap(mm = 4) {
    y += mm;
  }

  // ── Page 1: header ──────────────────────────────────────────────────────────

  const hLogoW = 50;
  const hLogoH = hLogoW / LOGO_RATIO;
  doc.addImage(headerLogoUrl, "PNG", ML, 13, hLogoW, hLogoH, "hdr-logo");

  const rx = PW - MR;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(13, 27, 42);
  doc.text("MZ Global Trading", rx, 16, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text("mzglobaltrading.com", rx, 20.5, { align: "right" });
  doc.text("info@mzglobaltrading.com", rx, 24.5, { align: "right" });
  doc.text("+92 300 8256203", rx, 28.5, { align: "right" });
  doc.text("Karachi 75600, Pakistan", rx, 32.5, { align: "right" });

  y = 38;
  doc.setDrawColor(212, 160, 23);
  doc.setLineWidth(0.7);
  doc.line(ML, y, PW - MR, y);
  y += 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(13, 27, 42);
  doc.text("REQUEST FOR QUOTATION", ML, y);
  y += 6.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(110, 110, 110);
  doc.text(`Submitted: ${submittedAt}`, ML, y);
  doc.text("CONFIDENTIAL DOCUMENT — DO NOT FORWARD", rx, y, { align: "right" });
  y += 2;

  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.25);
  doc.line(ML, y, PW - MR, y);
  y += 5;

  // ── [1] Buyer Details ────────────────────────────────────────────────────────

  sBar("[1]  BUYER DETAILS");
  row("Full Name", formState.name);
  row("Job Title / Position", formState.position);
  row("Company", formState.company);
  row("Email", formState.email);
  row("Phone", formState.phone);
  row("Country", formState.country);
  row("How Did You Hear", formState.howHear);
  gap();

  // ── Products ─────────────────────────────────────────────────────────────────

  const vp = formState.products.filter(p => p.category && p.productType);

  vp.forEach((p: ProductSpec, idx: number) => {
    const opts = p.productType ? getProductOptions(p.productType) : null;
    const isFabric = opts?.isFabricRoll ?? false;
    const isApparel = p.category === "Apparel";
    const pName = (p.productType === "Other / Multiple" && p.productTypeOther)
      ? `${p.productType} — ${p.productTypeOther}` : p.productType;

    // Inline helpers — keep them close to usage for readability
    const or = (v: string, o: string) => (v === "Other" && o) ? `Other — ${o}` : (v || undefined);
    const ar = (arr: string[], o: string) => {
      const items = (arr.includes("Other (specify below)") && o)
        ? [...arr.filter(x => x !== "Other (specify below)"), `Other: ${o}`] : arr;
      return items.length ? items.join(", ") : undefined;
    };
    const sz = () => p.sizeRange.length
      ? (p.sizeRangeNotes ? `${p.sizeRange.join(", ")} (${p.sizeRangeNotes})` : p.sizeRange.join(", "))
      : undefined;

    sBar(`[${idx + 2}]  PRODUCT ${idx + 1} OF ${vp.length} — ${pName.toUpperCase()}`);

    // Quantity + price summary line directly under section header
    const qtyStr = p.quantity ? `${p.quantity}${p.unitOfMeasure ? " " + p.unitOfMeasure : ""}` : "";
    const priceStr = p.targetPrice ? `USD ${p.targetPrice} per unit` : "";
    if (qtyStr || priceStr) {
      guard(LH);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(13, 27, 42);
      doc.text([qtyStr, priceStr].filter(Boolean).join("   |   "), ML, y);
      y += LH + 1;
    }

    if (isFabric) {
      sHead("Composition");
      row("Fiber Content", or(p.fiberContent, p.fiberContentOther));
      row("Sustainability", p.sustainability);
      if (p.compositionNotes) row("Composition Notes", p.compositionNotes);

      sHead("Construction");
      row(opts?.constructionLabel ?? "Weave / Structure", or(p.construction, p.constructionOther));
      if (p.fabricSubType) row("Sub-type", or(p.fabricSubType, p.fabricSubTypeOther));
      row(opts?.weightLabel ?? "GSM", p.weight);
      if (p.sizeRange[0]) row("Fabric Width", p.sizeRange[0]);
      if (p.warpYarn || p.weftYarn || p.picksPerCm) {
        row("Warp Yarn", p.warpYarn);
        row("Weft Yarn", p.weftYarn);
        row("Thread Density", p.picksPerCm);
      }

      sHead("State & Design");
      row("Fabric State", p.fabricState);
      row("Colour / Pattern Type", p.printType);
      row("Pantone / Colour Reference", p.pantoneRef);

      const fv = ar(p.finishing, p.finishingOther);
      if (fv) { sHead("Finishing"); row("Applied", fv); }

      sHead("Roll Packing");
      const rl = (p.rollLength.startsWith("Custom") && p.rollLengthOther)
        ? `Custom — ${p.rollLengthOther}` : p.rollLength;
      row("Roll Length", rl);
      row("Roll Core", p.rollCore);
      if (p.rollNotes) row("Notes", p.rollNotes);

    } else if (isApparel) {
      sHead("Fabric & Construction");
      row(opts?.constructionLabel ?? "Construction", or(p.construction, p.constructionOther));
      row(opts?.weightLabel ?? "GSM", p.weight);
      row("Fiber Content", or(p.fiberContent, p.fiberContentOther));
      row("Yarn Type", or(p.yarnType, p.yarnTypeOther));
      row("Sustainability", p.sustainability);

      sHead("Sizing & Fit");
      row(opts?.sizeLabel ?? "Size Range", sz());
      row("Fit", p.fitType);
      row(opts?.styleLabel ?? "Style", or(p.style, p.styleOther));

      sHead("Colour & Design");
      row("Dyeing Method", p.dyeingMethod);
      row("Number of Colours", p.numberOfColors);
      row("Pantone / Colour Reference", p.pantoneRef);
      row(opts?.designLabel ?? "Print / Design Type", p.printType);
      if (p.printDetail) row("Design Details", p.printDetail);

      const ev = ar(p.embellishments, p.embellishmentsOther);
      if (ev) { sHead("Embellishments"); row("Applied", ev); }

      const fv = ar(p.finishing, p.finishingOther);
      if (fv) { sHead("Finishing"); row("Applied", fv); }

      if (p.brandLabel || p.careLabel || p.stitchType) {
        sHead("Labels & Branding");
        row("Brand Label", p.brandLabel);
        row("Care Label", p.careLabel);
        row("Stitch Type", p.stitchType);
      }

      if (p.individualPack || p.setComposition || p.masterCarton) {
        sHead("Packing");
        row("Individual Pack", p.individualPack);
        row("Set Composition", p.setComposition);
        const mc = (p.masterCarton.startsWith("Custom") && p.masterCartonOther)
          ? `Custom — ${p.masterCartonOther}` : p.masterCarton;
        row("Master Carton", mc);
        if (p.packingNotes) row("Notes", p.packingNotes);
      }

    } else {
      // Home Textiles
      sHead("Construction & Composition");
      row(opts?.constructionLabel ?? "Weave / Structure", or(p.construction, p.constructionOther));
      row(opts?.weightLabel ?? "GSM", p.weight);
      row("Fiber Content", or(p.fiberContent, p.fiberContentOther));
      row("Sustainability", p.sustainability);
      if (p.pileYarn || p.groundYarn) {
        row("Pile Yarn", p.pileYarn);
        row("Ground Yarn", p.groundYarn);
      }

      sHead("Dimensions & Specifications");
      row(opts?.sizeLabel ?? "Size", sz());
      row(opts?.styleLabel ?? "Style", or(p.style, p.styleOther));
      if (p.borderType) row("Border / Selvedge", or(p.borderType, p.borderTypeOther));
      if (p.collarType) row("Collar Type", or(p.collarType, p.collarTypeOther));
      if (p.backingType) row("Backing", or(p.backingType, p.backingTypeOther));
      if (p.closureType) row("Closure Type", or(p.closureType, p.closureTypeOther));
      if (p.pocketDepth) row("Pocket Depth", p.pocketDepth);
      if (p.heatRating) row("Heat Rating", p.heatRating);
      if (p.headingType) row("Heading Type", or(p.headingType, p.headingTypeOther));
      if (p.liningType) row("Lining Type", or(p.liningType, p.liningTypeOther));

      sHead("Colour & Design");
      row("Dyeing Method", p.dyeingMethod);
      row("Number of Colours", p.numberOfColors);
      row("Pantone / Colour Reference", p.pantoneRef);
      row(opts?.designLabel ?? "Design Type", p.printType);
      if (p.printDetail) row("Design Details", p.printDetail);

      const fv = ar(p.finishing, p.finishingOther);
      if (fv) { sHead("Finishing Treatments"); row("Applied", fv); }

      if (p.individualPack || p.setComposition) {
        sHead("Packing");
        row("Individual Pack", p.individualPack);
        row("Set Composition", p.setComposition);
        if (p.packingNotes) row("Notes", p.packingNotes);
      }
    }

    // Certifications, sample & tech pack (all product types)
    const cv = (p.certifications.includes("Other") && p.certOther)
      ? [...p.certifications.filter(c => c !== "Other"), `Other: ${p.certOther}`].join(", ")
      : p.certifications.join(", ");
    if (cv) { sHead("Certifications Required"); row("Required", cv); }
    row("Sample Required", p.sampleRequired);
    row("Tech Pack / Artwork", p.hasTechPack);
    gap();
  });

  // ── [N] Commercial & Logistics ────────────────────────────────────────────────

  sBar(`[${vp.length + 2}]  COMMERCIAL & LOGISTICS`);
  row("Destination Country", formState.destinationCountry);
  row("Incoterm", formState.incoterm);
  row("Port of Destination", formState.portOfDestination);
  row("Required Delivery Date", formState.deliveryDate);
  row("Additional Notes", formState.logisticsNotes);
  gap(6);

  // ── Stamp watermarks + footers across every page ──────────────────────────────
  // Pages are visited AFTER content is drawn so watermarks render on top

  for (let pg = 1; pg <= totalPages; pg++) {
    doc.setPage(pg);

    // 9 logo watermarks — use alias so jsPDF reuses the cached image object
    WM_POS.forEach(([cx, cy]) => {
      doc.addImage(wmUrl, "PNG", cx - wmW / 2, cy - wmH / 2, wmW, wmH, "wm-logo");
    });

    // Diagonal text watermarks — 8 instances in a 2-column × 4-row layout
    // angle: 43 = 43° counterclockwise from horizontal (bottom-left → top-right diagonal)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    doc.setTextColor(210, 210, 210);
    const wt = "MZ GLOBAL TRADING — CONFIDENTIAL";
    const wmTextGrid: [number, number][] = [
      [30, 285], [115, 285],
      [30, 195], [115, 195],
      [30, 105], [115, 105],
      [30, 15],  [115, 15],
    ];
    wmTextGrid.forEach(([tx, ty]) => doc.text(wt, tx, ty, { angle: 43 }));

    // Gold divider + footer text
    doc.setDrawColor(212, 160, 23);
    doc.setLineWidth(0.35);
    doc.line(ML, PH - 19, PW - MR, PH - 19);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(130, 130, 130);
    doc.text(
      "CONFIDENTIAL — MZ Global Trading  ·  mzglobaltrading.com  ·  info@mzglobaltrading.com  ·  +92 300 8256203",
      ML, PH - 14.5
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(13, 27, 42);
    doc.text(`Page ${pg} of ${totalPages}`, PW - MR, PH - 14.5, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(170, 170, 170);
    doc.text(
      "This document contains commercially sensitive procurement information. Not for redistribution.",
      ML, PH - 10
    );
  }

  // ── One-time blob download ─────────────────────────────────────────────────────
  // Blob URL is created, used once, then scheduled for revocation after 30 s.

  const ref = `RFQ-${Date.now().toString(36).toUpperCase()}`;
  const blob = doc.output("blob");
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = `MZ-Global-Trading-${ref}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
}

// ── Image utilities (browser-only — only called after lazy import) ─────────────

async function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`rfq-pdf: failed to load ${src}`));
    img.src = src;
  });
}

// Renders the logo onto a canvas with specified opacity and rotation angle.
// Returns a PNG data URL suitable for jsPDF addImage.
function bakeCanvas(
  img: HTMLImageElement,
  opacity: number,
  angleDeg: number,
  targetW: number
): string {
  const aspect = img.naturalWidth / img.naturalHeight;
  const srcW = targetW;
  const srcH = Math.round(targetW / aspect);

  if (angleDeg === 0) {
    const c = document.createElement("canvas");
    c.width = srcW;
    c.height = srcH;
    const ctx = c.getContext("2d")!;
    ctx.globalAlpha = opacity;
    ctx.drawImage(img, 0, 0, srcW, srcH);
    return c.toDataURL("image/png");
  }

  // For non-zero rotation: compute bounding canvas that contains the fully-rotated image
  const rad = (Math.abs(angleDeg) * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const cw = Math.ceil(srcW * cos + srcH * sin);
  const ch = Math.ceil(srcW * sin + srcH * cos);

  const c = document.createElement("canvas");
  c.width = cw;
  c.height = ch;
  const ctx = c.getContext("2d")!;
  ctx.globalAlpha = opacity;
  ctx.translate(cw / 2, ch / 2);
  ctx.rotate((angleDeg * Math.PI) / 180); // negative angle = clockwise
  ctx.drawImage(img, -srcW / 2, -srcH / 2, srcW, srcH);
  return c.toDataURL("image/png");
}

// Returns the bounding-box [width, height] in PDF mm for a rotated watermark logo.
function wmBBox(logoDisplayW: number, logoRatio: number, angleDeg: number): [number, number] {
  const h = logoDisplayW / logoRatio;
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return [
    logoDisplayW * cos + h * sin,
    logoDisplayW * sin + h * cos,
  ];
}
