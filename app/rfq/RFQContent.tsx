"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import { PhoneInputField, validatePhone } from "@/components/PhoneInputField";
import {
  getProductOptions,
  HOW_HEAR_OPTIONS,
  APPAREL_TYPES,
  HOME_TEXTILE_TYPES,
  FABRIC_TYPES,
} from "@/lib/rfq-product-options";

// ── Constants ─────────────────────────────────────────────────────────────────

const RECIPIENT = "info@mzglobaltrading.com";
const STEPS = ["Products", "Delivery", "Your Details", "Review & Submit"];

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Germany", "France",
  "Netherlands", "Italy", "Spain", "Belgium", "Sweden", "Norway", "Denmark",
  "Finland", "Switzerland", "Austria", "Poland", "Portugal", "Ireland",
  "Czech Republic", "Hungary", "Romania", "Greece", "Brazil", "Argentina",
  "Chile", "Colombia", "Peru", "Mexico",
  "Afghanistan", "Albania", "Algeria", "Angola", "Armenia", "Australia",
  "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belize", "Benin",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bulgaria", "Burkina Faso",
  "Cambodia", "Cameroon", "China", "Congo", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia",
  "Ethiopia", "Georgia", "Ghana", "Guatemala", "Honduras", "India", "Indonesia",
  "Iran", "Iraq", "Israel", "Ivory Coast", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", "Libya",
  "Lithuania", "Luxembourg", "Madagascar", "Malaysia", "Mali", "Malta",
  "Morocco", "Mozambique", "Myanmar", "New Zealand", "Nicaragua", "Nigeria",
  "Oman", "Pakistan", "Panama", "Paraguay", "Philippines", "Qatar", "Russia",
  "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia",
  "Slovenia", "South Africa", "South Korea", "Sri Lanka", "Syria", "Taiwan",
  "Tanzania", "Thailand", "Tunisia", "Turkey", "Uganda", "Ukraine",
  "United Arab Emirates", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam",
  "Yemen", "Zimbabwe",
];

const COUNTRIES_SORTED = [...COUNTRIES].sort((a, b) => a.localeCompare(b));

const INCOTERMS = [
  "EXW – Ex Works (factory)",
  "FOB – Free on Board (Karachi)",
  "CIF – Cost, Insurance & Freight",
  "CFR – Cost & Freight",
  "To be discussed",
];

const FIBER_CONTENT_APPAREL = [
  "100% Cotton", "Polyester-Cotton Blend", "Cotton-Elastane (Stretch)", "100% Polyester",
  "Viscose / Rayon", "Bamboo-Cotton", "Organic Cotton (GOTS)", "Recycled Polyester (GRS)",
  "Modal-Cotton", "Linen-Cotton", "Other",
];
const FIBER_CONTENT_HT = [
  "100% Cotton", "Cotton-Polyester Blend", "100% Polyester", "Bamboo-Cotton",
  "Organic Cotton (GOTS)", "Microfiber", "Zero Twist Cotton", "Turkish Cotton",
  "Egyptian Cotton", "Recycled Cotton (GRS)", "Other",
];
const FIBER_CONTENT_FABRIC = [
  "100% Cotton", "Polyester-Cotton", "100% Polyester", "Cotton-Elastane",
  "Viscose / Rayon", "Bamboo", "Linen", "Wool Blend",
  "Recycled Polyester (GRS)", "Modal", "Other",
];

const YARN_TYPES = ["Ring Spun", "Open End (OE)", "Compact Spun", "Combed", "Carded", "Air-Jet Spun", "Other"];
const SIZE_STANDARDS = ["US / ASTM", "EU Standard", "UK Standard", "Brand's own size guide", "Custom"];
const DYEING_METHODS = [
  "Solid / Piece Dyed", "Yarn Dyed", "Garment Dyed", "Tie Dye / Hand Dyed",
  "Space Dyed", "Raw / Undyed", "To be discussed",
];
const NUMBER_OF_COLORS = [
  "1 color", "2 colors", "3 colors", "4 colors", "5+ colors",
  "All-over / Multicolor", "TBC",
];
const BRAND_LABELS = [
  "Woven label", "Printed label", "Heat transfer label", "Hang tag",
  "Woven label + Hang tag", "No label (OEM blank)", "To be discussed",
];
const CARE_LABELS = [
  "Sewn-in care label", "Heat transfer care label", "No care label", "To be discussed",
];
const STITCH_TYPES = [
  "Overlock (Serger)", "Flatlock", "Chain Stitch", "Cover Stitch", "Double Needle", "To be confirmed",
];
const MASTER_CARTONS = [
  "12 pcs per carton", "24 pcs per carton", "36 pcs per carton",
  "48 pcs per carton", "60 pcs per carton", "Custom / To be confirmed",
];
const SUSTAINABILITY_OPTIONS = [
  "Conventional", "GOTS Organic Cotton", "BCI Cotton", "GRS Recycled", "No preference",
];
const KNIT_TYPES_FABRIC = [
  "Single Jersey", "Double Jersey", "Interlock", "Pique", "Rib",
  "French Terry", "Fleece / Brushed Back", "Waffle", "Pointelle", "Other",
];
const WOVEN_TYPES_FABRIC = [
  "Plain Weave", "Twill", "Satin", "Oxford", "Canvas",
  "Poplin", "Denim", "Jacquard", "Chambray", "Other",
];
const FABRIC_STATES = [
  "Greige / Raw", "Bleached", "Piece Dyed (Solid)", "Yarn Dyed", "Printed", "To be discussed",
];
const ROLL_LENGTHS = [
  "50m per roll", "100m per roll", "150m per roll", "200m per roll", "Custom / TBC",
];
const ROLL_CORES = [
  "Paper tube core", "Plastic tube core", "No core / Bulk roll", "To be confirmed",
];
const FABRIC_WIDTHS_FABRIC = [
  "44\" / 112 cm", "58–60\" / 147–152 cm", "72\" / 183 cm",
  "90\" / 228 cm", "108\" / 274 cm", "Custom",
];
const BORDER_TYPES = [
  "Plain border / hem", "Satin border", "Jacquard woven border", "Dobby border", "No border", "Other",
];
const SAMPLE_OPTIONS = [
  "Counter sample (match our reference)",
  "No sample needed",
];
const SAMPLE_NOTES: Record<string, { note: string; sub?: string }> = {
  "Counter sample (match our reference)": {
    note: "Please courier your reference sample to our Karachi office. We will produce a counter sample for your approval.",
    sub: "Sample + courier cost is at buyer's account and will be credited against the bulk order upon approval.",
  },
  "No sample needed": {
    note: "Bulk production will proceed once product specifications, pricing, and payment terms are agreed in writing.",
  },
};
const TECH_PACK_OPTIONS = [
  "Yes — I have artwork / tech pack",
  "No — will provide later",
];

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProductSpec {
  id: string;
  category: string;
  productType: string;
  productTypeOther: string;
  fiberContent: string;
  fiberContentOther: string;
  compositionNotes: string;
  yarnType: string;
  yarnTypeOther: string;
  sustainability: string;
  construction: string;
  constructionOther: string;
  weight: string;
  fabricSubType: string;
  fabricSubTypeOther: string;
  sizeRange: string[];
  sizeRangeNotes: string;
  fitType: string;
  sizeStandard: string;
  sizeStandardOther: string;
  style: string;
  styleOther: string;
  borderType: string;
  borderTypeOther: string;
  pocketDepth: string;
  closureType: string;
  closureTypeOther: string;
  collarType: string;
  collarTypeOther: string;
  heatRating: string;
  backingType: string;
  backingTypeOther: string;
  headingType: string;
  headingTypeOther: string;
  liningType: string;
  liningTypeOther: string;
  warpYarn: string;
  weftYarn: string;
  pileYarn: string;
  groundYarn: string;
  picksPerCm: string;
  dyeingMethod: string;
  numberOfColors: string;
  pantoneRef: string;
  printType: string;
  printPlacement: string;
  printDetail: string;
  fabricState: string;
  colorFastnessNotes: string;
  finishing: string[];
  finishingOther: string;
  embellishments: string[];
  embellishmentsOther: string;
  accessories: string[];
  accessoriesOther: string;
  brandLabel: string;
  careLabel: string;
  stitchType: string;
  labelNotes: string;
  individualPack: string;
  setComposition: string;
  masterCarton: string;
  masterCartonOther: string;
  packingNotes: string;
  rollLength: string;
  rollLengthOther: string;
  rollCore: string;
  rollNotes: string;
  certifications: string[];
  certOther: string;
  quantity: string;
  unitOfMeasure: string;
  targetPrice: string;
  sampleRequired: string;
  hasTechPack: string;
}

export interface RFQFormState {
  products: ProductSpec[];
  destinationCountry: string;
  incoterm: string;
  portOfDestination: string;
  deliveryDate: string;
  logisticsNotes: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  howHear: string;
}

function mkProduct(): ProductSpec {
  return {
    id: Math.random().toString(36).slice(2, 10),
    category: "", productType: "", productTypeOther: "",
    fiberContent: "", fiberContentOther: "", compositionNotes: "",
    yarnType: "", yarnTypeOther: "", sustainability: "",
    construction: "", constructionOther: "", weight: "",
    fabricSubType: "", fabricSubTypeOther: "",
    sizeRange: [], sizeRangeNotes: "",
    fitType: "", sizeStandard: "", sizeStandardOther: "",
    style: "", styleOther: "",
    borderType: "", borderTypeOther: "", pocketDepth: "",
    closureType: "", closureTypeOther: "",
    collarType: "", collarTypeOther: "",
    heatRating: "", backingType: "", backingTypeOther: "",
    headingType: "", headingTypeOther: "",
    liningType: "", liningTypeOther: "",
    warpYarn: "", weftYarn: "", pileYarn: "", groundYarn: "", picksPerCm: "",
    dyeingMethod: "", numberOfColors: "", pantoneRef: "",
    printType: "", printPlacement: "", printDetail: "",
    fabricState: "", colorFastnessNotes: "",
    finishing: [], finishingOther: "",
    embellishments: [], embellishmentsOther: "",
    accessories: [], accessoriesOther: "",
    brandLabel: "", careLabel: "", stitchType: "", labelNotes: "",
    individualPack: "", setComposition: "",
    masterCarton: "", masterCartonOther: "", packingNotes: "",
    rollLength: "", rollLengthOther: "", rollCore: "", rollNotes: "",
    certifications: [], certOther: "",
    quantity: "", unitOfMeasure: "", targetPrice: "",
    sampleRequired: "", hasTechPack: "",
  };
}

function specReset(p: ProductSpec): ProductSpec {
  const fresh = mkProduct();
  return {
    ...p, ...{
      fiberContent: fresh.fiberContent, fiberContentOther: fresh.fiberContentOther,
      compositionNotes: fresh.compositionNotes, yarnType: fresh.yarnType,
      yarnTypeOther: fresh.yarnTypeOther, sustainability: fresh.sustainability,
      construction: fresh.construction, constructionOther: fresh.constructionOther,
      weight: fresh.weight, fabricSubType: fresh.fabricSubType,
      fabricSubTypeOther: fresh.fabricSubTypeOther, sizeRange: fresh.sizeRange,
      sizeRangeNotes: fresh.sizeRangeNotes, fitType: fresh.fitType,
      sizeStandard: fresh.sizeStandard, sizeStandardOther: fresh.sizeStandardOther,
      style: fresh.style, styleOther: fresh.styleOther,
      borderType: fresh.borderType, borderTypeOther: fresh.borderTypeOther,
      pocketDepth: fresh.pocketDepth, closureType: fresh.closureType,
      closureTypeOther: fresh.closureTypeOther, collarType: fresh.collarType,
      collarTypeOther: fresh.collarTypeOther, heatRating: fresh.heatRating,
      backingType: fresh.backingType, backingTypeOther: fresh.backingTypeOther,
      headingType: fresh.headingType, headingTypeOther: fresh.headingTypeOther,
      liningType: fresh.liningType, liningTypeOther: fresh.liningTypeOther,
      warpYarn: fresh.warpYarn, weftYarn: fresh.weftYarn,
      pileYarn: fresh.pileYarn, groundYarn: fresh.groundYarn, picksPerCm: fresh.picksPerCm,
      dyeingMethod: fresh.dyeingMethod, numberOfColors: fresh.numberOfColors,
      pantoneRef: fresh.pantoneRef, printType: fresh.printType,
      printPlacement: fresh.printPlacement, printDetail: fresh.printDetail,
      fabricState: fresh.fabricState, colorFastnessNotes: fresh.colorFastnessNotes,
      finishing: fresh.finishing, finishingOther: fresh.finishingOther,
      embellishments: fresh.embellishments, embellishmentsOther: fresh.embellishmentsOther,
      accessories: fresh.accessories, accessoriesOther: fresh.accessoriesOther,
      brandLabel: fresh.brandLabel, careLabel: fresh.careLabel,
      stitchType: fresh.stitchType, labelNotes: fresh.labelNotes,
      individualPack: fresh.individualPack, setComposition: fresh.setComposition,
      masterCarton: fresh.masterCarton, masterCartonOther: fresh.masterCartonOther,
      packingNotes: fresh.packingNotes, rollLength: fresh.rollLength,
      rollLengthOther: fresh.rollLengthOther, rollCore: fresh.rollCore,
      rollNotes: fresh.rollNotes, certifications: fresh.certifications, certOther: fresh.certOther,
    },
  };
}

const INITIAL_FORM: RFQFormState = {
  products: [mkProduct()],
  destinationCountry: "", incoterm: "", portOfDestination: "",
  deliveryDate: "", logisticsNotes: "",
  name: "", position: "", company: "",
  email: "", phone: "", country: "", howHear: "",
};

type Status = "idle" | "sent";

// ── Helpers ───────────────────────────────────────────────────────────────────

function needsPort(incoterm: string) {
  return incoterm.startsWith("CIF") || incoterm.startsWith("CFR");
}

function focusFirstError(errorMap: Record<string, string>) {
  const firstKey = Object.keys(errorMap)[0];
  if (!firstKey) return;
  setTimeout(() => {
    const el = document.getElementById(firstKey);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.focus(); }
  }, 50);
}

function getProductTypes(category: string): string[] {
  if (category === "Apparel") return APPAREL_TYPES;
  if (category === "Home Textiles") return HOME_TEXTILE_TYPES;
  if (category === "Fabric") return FABRIC_TYPES;
  return [];
}

function getProductTabLabel(p: ProductSpec): string {
  if (p.productType && p.productType !== "Other / Multiple") return p.productType;
  if (p.productType === "Other / Multiple" && p.productTypeOther) return p.productTypeOther;
  if (p.category) return p.category;
  return "New Product";
}

// ── Email builder ─────────────────────────────────────────────────────────────

function buildEmailBody(f: RFQFormState): string {
  // All separators use plain ASCII only — Unicode chars (U+2550, U+2500, U+00B7) each encode
  // to 9/9/6 chars in a mailto: URL, inflating a 2 KB body to 15+ KB and causing truncation.
  const LINE  = "=".repeat(64);
  const DIV   = "-".repeat(64);
  const SUB   = ".".repeat(48);
  const submittedAt = new Date().toLocaleString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  });

  const row = (label: string, value: string | null | undefined, pad = 24): string => {
    if (!value) return "";
    const fill = ".".repeat(Math.max(2, pad - label.length));
    return `${label} ${fill} ${value}`;
  };

  const subHead = (title: string) => `\n${title}\n${SUB}`;

  const validProducts = f.products.filter(p => p.category && p.productType);

  function productBlock(p: ProductSpec, idx: number, total: number): string {
    const opts = getProductOptions(p.productType);
    const name = p.productType === "Other / Multiple" && p.productTypeOther
      ? `${p.productType} — ${p.productTypeOther}` : p.productType;
    const qty = p.quantity ? `${p.quantity}${p.unitOfMeasure ? " " + p.unitOfMeasure : ""}` : "";
    const price = p.targetPrice ? `USD ${p.targetPrice}/unit` : "";
    const qtyLine = [qty, price].filter(Boolean).join(" | ");

    const header = [
      DIV,
      `PRODUCT ${idx + 1} OF ${total} -- ${name.toUpperCase()}`,
      qtyLine || "",
      DIV,
    ].filter(Boolean).join("\n");

    const certText = p.certifications.length > 0
      ? (p.certOther
          ? [...p.certifications.filter(c => c !== "Other (specify below)"), `Other: ${p.certOther}`].join(", ")
          : p.certifications.join(", "))
      : "";

    const finishVal = (() => {
      const arr = p.finishing.includes("Other (specify below)") && p.finishingOther
        ? [...p.finishing.filter(x => x !== "Other (specify below)"), `Other: ${p.finishingOther}`]
        : p.finishing;
      return arr.join(", ");
    })();

    const constrVal = p.construction === "Other" && p.constructionOther
      ? `Other — ${p.constructionOther}` : p.construction;
    const fiberVal = p.fiberContent === "Other" && p.fiberContentOther
      ? `Other — ${p.fiberContentOther}` : p.fiberContent;
    const styleVal = p.style === "Other" && p.styleOther
      ? `Other — ${p.styleOther}` : p.style;
    const sizeDisplay = p.sizeRange.length > 0
      ? (p.sizeRangeNotes ? `${p.sizeRange.join(", ")} (${p.sizeRangeNotes})` : p.sizeRange.join(", "))
      : "";

    const lines: string[] = [header, ""];

    if (opts?.isFabricRoll) {
      const subTypeVal = p.fabricSubType === "Other" && p.fabricSubTypeOther
        ? `Other — ${p.fabricSubTypeOther}` : p.fabricSubType;
      const compRows = [
        row("Fiber Content", fiberVal), row("Sustainability", p.sustainability),
        row("Composition Notes", p.compositionNotes),
      ].filter(Boolean);
      if (compRows.length) lines.push(subHead("COMPOSITION"), ...compRows);

      const conRows = [
        row("Category", constrVal),
        p.construction === "Knitted" ? row("Knit Type", subTypeVal) : "",
        p.construction === "Woven" ? row("Woven Type", subTypeVal) : "",
        row(opts.weightLabel ?? "GSM", p.weight),
        row("Fabric Width", p.sizeRange[0] ?? ""),
      ].filter(Boolean);
      if (conRows.length) lines.push(subHead("CONSTRUCTION"), ...conRows);

      const stateRows = [
        row("Fabric State", p.printType), row("Pattern / Color Type", p.fabricState),
        row("Pantone / Color Ref", p.pantoneRef), row("Color Fastness", p.colorFastnessNotes),
      ].filter(Boolean);
      if (stateRows.length) lines.push(subHead("STATE & DESIGN"), ...stateRows);

      if (p.warpYarn || p.weftYarn || (p.construction !== "Terry" && p.picksPerCm)) {
        const yarnRows = [
          row("Warp Yarn", p.warpYarn), row("Weft Yarn", p.weftYarn),
          row("Picks / Thread Density", p.picksPerCm),
        ].filter(Boolean);
        if (yarnRows.length) lines.push(subHead("WARP & WEFT SPECIFICATION"), ...yarnRows);
      }
      if (p.pileYarn || p.groundYarn || (p.construction === "Terry" && p.picksPerCm)) {
        const pileRows = [
          row("Pile Yarn", p.pileYarn), row("Ground Yarn", p.groundYarn),
          row("Loop Density", p.picksPerCm),
        ].filter(Boolean);
        if (pileRows.length) lines.push(subHead("PILE YARN SPECIFICATION"), ...pileRows);
      }

      if (finishVal) lines.push(subHead("FINISHING"), row("Applied", finishVal));

      const rollRows = [
        row("Roll Length", p.rollLength.startsWith("Custom") && p.rollLengthOther ? `Custom — ${p.rollLengthOther}` : p.rollLength),
        row("Roll Core", p.rollCore), row("Notes", p.rollNotes),
      ].filter(Boolean);
      if (rollRows.length) lines.push(subHead("ROLL PACKING"), ...rollRows);

    } else if (p.category === "Apparel") {
      const yarnVal = p.yarnType === "Other" && p.yarnTypeOther ? `Other — ${p.yarnTypeOther}` : p.yarnType;
      const embDisplay = (() => {
        const arr = p.embellishments.includes("Other") && p.embellishmentsOther
          ? [...p.embellishments.filter(x => x !== "Other"), `Other: ${p.embellishmentsOther}`]
          : p.embellishments;
        return arr.join(", ");
      })();
      const accDisplay = (() => {
        const arr = p.accessories.includes("Other") && p.accessoriesOther
          ? [...p.accessories.filter(x => x !== "Other"), `Other: ${p.accessoriesOther}`]
          : p.accessories;
        return arr.join(", ");
      })();

      const fabricRows = [
        row(opts?.constructionLabel ?? "Fabric Type", constrVal),
        row(opts?.weightLabel ?? "GSM", p.weight),
        row("Fiber Content", fiberVal), row("Yarn Type", yarnVal),
        row("Composition Notes", p.compositionNotes),
      ].filter(Boolean);
      if (fabricRows.length) lines.push(subHead("FABRIC & CONSTRUCTION"), ...fabricRows);

      if (opts?.showWarpWeft && (p.warpYarn || p.weftYarn || p.picksPerCm)) {
        const yarnRows = [
          row("Warp Yarn", p.warpYarn), row("Weft Yarn", p.weftYarn),
          row("Picks / Density", p.picksPerCm),
        ].filter(Boolean);
        if (yarnRows.length) lines.push(subHead("YARN SPECIFICATION"), ...yarnRows);
      }

      const sizeRows = [
        row(opts?.sizeLabel ?? "Size Range", sizeDisplay),
        row("Fit", p.fitType),
        row(opts?.styleLabel ?? "Style", styleVal),
        row("Size Standard", p.sizeStandard === "Custom" && p.sizeStandardOther ? `Custom — ${p.sizeStandardOther}` : p.sizeStandard),
      ].filter(Boolean);
      if (sizeRows.length) lines.push(subHead("SIZING"), ...sizeRows);

      const colorRows = [
        row("Dyeing Method", p.dyeingMethod), row("Colors", p.numberOfColors),
        row("Pantone / Color Ref", p.pantoneRef),
        row(opts?.designLabel ?? "Print Type", p.printType),
        row(opts?.printPlacementLabel ?? "Placement", p.printPlacement),
        row("Print / Design Detail", p.printDetail),
      ].filter(Boolean);
      if (colorRows.length) lines.push(subHead("COLOR & DESIGN"), ...colorRows);

      if (embDisplay || accDisplay) {
        const embRows = [row("Embellishments", embDisplay), row("Accessories / Trims", accDisplay)].filter(Boolean);
        if (embRows.length) lines.push(subHead("EMBELLISHMENTS & ACCESSORIES"), ...embRows);
      }

      if (finishVal) lines.push(subHead("FINISHING"), row("Applied", finishVal));

      const labelRows = [
        row("Brand Label", p.brandLabel), row("Care Label", p.careLabel),
        row("Stitch Type", p.stitchType), row("Label Notes", p.labelNotes),
      ].filter(Boolean);
      if (labelRows.length) lines.push(subHead("LABELS & BRANDING"), ...labelRows);

      const cartonVal = p.masterCarton.startsWith("Custom") && p.masterCartonOther
        ? `Custom — ${p.masterCartonOther}` : p.masterCarton;
      const packRows = [
        row("Individual Pack", p.individualPack), row("Set Composition", p.setComposition),
        row("Master Carton", cartonVal), row("Packing Notes", p.packingNotes),
      ].filter(Boolean);
      if (packRows.length) lines.push(subHead("PACKING"), ...packRows);

    } else {
      // Home Textiles
      const closureVal = p.closureType === "Other" && p.closureTypeOther ? `Other — ${p.closureTypeOther}` : p.closureType;
      const collarVal  = p.collarType === "Other"  && p.collarTypeOther  ? `Other — ${p.collarTypeOther}`  : p.collarType;
      const backVal    = p.backingType === "Other"  && p.backingTypeOther ? `Other — ${p.backingTypeOther}` : p.backingType;
      const headVal    = p.headingType === "Other"  && p.headingTypeOther ? `Other — ${p.headingTypeOther}` : p.headingType;
      const liningVal  = p.liningType === "Other"   && p.liningTypeOther  ? `Other — ${p.liningTypeOther}`  : p.liningType;
      const borderVal  = p.borderType === "Other"   && p.borderTypeOther  ? `Other — ${p.borderTypeOther}`  : p.borderType;

      const conRows = [
        row(opts?.constructionLabel ?? "Weave / Structure", constrVal),
        row(opts?.weightLabel ?? "GSM", p.weight),
        row("Fiber Content", fiberVal), row("Composition Notes", p.compositionNotes),
      ].filter(Boolean);
      if (conRows.length) lines.push(subHead("CONSTRUCTION & COMPOSITION"), ...conRows);

      if (opts?.showWarpWeft && (p.warpYarn || p.weftYarn || p.picksPerCm)) {
        const warpRows = [
          row("Warp Yarn", p.warpYarn), row("Weft Yarn", p.weftYarn),
          row("Picks / Thread Density", p.picksPerCm),
        ].filter(Boolean);
        if (warpRows.length) lines.push(subHead("YARN SPECIFICATION — WARP & WEFT"), ...warpRows);
      }

      if (opts?.showPileGround && (p.pileYarn || p.groundYarn || p.picksPerCm)) {
        const pileRows = [
          row("Pile Yarn", p.pileYarn), row("Ground Yarn", p.groundYarn),
          row("Loop Density", p.picksPerCm),
        ].filter(Boolean);
        if (pileRows.length) lines.push(subHead("YARN SPECIFICATION — PILE & GROUND"), ...pileRows);
      }

      const dimRows = [
        row(opts?.sizeLabel ?? "Size", sizeDisplay),
        row(opts?.styleLabel ?? "Style", styleVal),
        row("Border / Selvedge", borderVal), row("Collar Type", collarVal),
        row("Backing", backVal), row("Closure", closureVal),
        row("Pocket Depth", p.pocketDepth), row("Heading Type", headVal),
        row("Lining", liningVal), row("Heat Rating", p.heatRating),
      ].filter(Boolean);
      if (dimRows.length) lines.push(subHead("DIMENSIONS & SPECIFICATIONS"), ...dimRows);

      const colorRows = [
        row("Dyeing Method", p.dyeingMethod), row("Colors", p.numberOfColors),
        row(opts?.designLabel ?? "Design", p.printType),
        row(opts?.printPlacementLabel ?? "Placement", p.printPlacement),
        row("Pantone / Color Ref", p.pantoneRef), row("Design Detail", p.printDetail),
      ].filter(Boolean);
      if (colorRows.length) lines.push(subHead("COLOR & DESIGN"), ...colorRows);

      if (finishVal) lines.push(subHead("FINISHING"), row("Applied", finishVal));

      const packRows = [
        row("Individual Pack", p.individualPack), row("Set Composition", p.setComposition),
        row("Packing Notes", p.packingNotes),
      ].filter(Boolean);
      if (packRows.length) lines.push(subHead("PACKING"), ...packRows);
    }

    if (certText) lines.push(subHead("CERTIFICATIONS"), row("Required", certText));

    const docRows = [row("Sample Required", p.sampleRequired), row("Tech Pack / Artwork", p.hasTechPack)].filter(Boolean);
    if (docRows.length) lines.push(subHead("SAMPLES & DOCUMENTATION"), ...docRows);

    lines.push("");
    return lines.filter(l => l !== null && l !== undefined).join("\n");
  }

  const parts = [
    LINE,
    "REQUEST FOR QUOTATION",
    `MZ Global Trading - mzglobaltrading.com - info@mzglobaltrading.com`,
    `Submitted: ${submittedAt}`,
    LINE,
    "",
    "BUYER",
    DIV,
    [f.name, f.position].filter(Boolean).join(" - "),
    f.company,
    `${f.email}${f.phone ? " | " + f.phone : ""}`,
    f.country,
    f.howHear ? `Via: ${f.howHear}` : "",
    "",
    ...validProducts.map((p, i) => productBlock(p, i, validProducts.length)),
    LINE,
    "SHIPPING & DELIVERY",
    LINE,
    row("Destination", f.destinationCountry),
    row("Incoterm", f.incoterm),
    needsPort(f.incoterm) ? row("Port of Destination", f.portOfDestination) : "",
    row("Required Delivery", f.deliveryDate),
    f.logisticsNotes ? `\nAdditional Notes\n${f.logisticsNotes}` : "",
    "",
    LINE,
    "The buyer confirms they have read and agreed to the Terms of Use",
    "at: mzglobaltrading.com/termsofuse/ and the Privacy Policy",
    "at: mzglobaltrading.com/privacypolicy/",
    LINE,
  ];

  return parts.filter(l => l !== null && l !== undefined).join("\n");
}

// ── UI helpers ────────────────────────────────────────────────────────────────

const ic = (err?: string) =>
  `w-full px-3 py-2 border rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors bg-white ${
    err ? "border-red-400 focus:ring-red-300/40 focus:border-red-400"
        : "border-gray-200 focus:ring-gold/40 focus:border-gold"
  }`;

function SearchableSelect({
  id, value, onChange, placeholder, options, error,
}: {
  id: string; value: string; onChange: (v: string) => void;
  placeholder: string; options: string[]; error?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listboxId = `${id}-lb`;

  const filtered = query
    ? options.filter(o => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  function reposition() {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    setMenuStyle({ position: "fixed", top: r.bottom + 4, left: r.left, width: r.width, zIndex: 9999 });
  }

  function openMenu() {
    reposition();
    setQuery("");
    setOpen(true);
    setActiveIdx(value ? options.indexOf(value) : -1);
  }

  function closeMenu() {
    setOpen(false);
    setQuery("");
    setActiveIdx(-1);
  }

  function pick(opt: string) {
    onChange(opt);
    closeMenu();
  }

  useEffect(() => {
    if (!open) return;
    function onDown(e: PointerEvent) {
      if (wrapRef.current?.contains(e.target as Node)) return;
      if (listRef.current?.contains(e.target as Node)) return;
      closeMenu();
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onScroll() { closeMenu(); }
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, [open]);

  useEffect(() => {
    if (activeIdx < 0 || !listRef.current) return;
    (listRef.current.children[activeIdx] as HTMLElement)?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openMenu();
        else setActiveIdx(i => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) setActiveIdx(i => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (open && activeIdx >= 0 && filtered[activeIdx]) pick(filtered[activeIdx]);
        else if (!open) openMenu();
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Tab":
        if (open) closeMenu();
        break;
    }
  }

  const menu = open && typeof window !== "undefined"
    ? createPortal(
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          style={menuStyle}
          className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-52 overflow-y-auto"
        >
          {filtered.length === 0
            ? <li className="px-3 py-2 text-sm text-gray-400">No results</li>
            : filtered.map((c, i) => (
                <li
                  key={c}
                  id={`${id}-o-${i}`}
                  role="option"
                  aria-selected={value === c}
                  onPointerDown={e => e.preventDefault()}
                  onClick={() => pick(c)}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                    i === activeIdx
                      ? "bg-gold/10 text-navy-900 font-semibold"
                      : value === c
                      ? "bg-gold/5 text-navy-900"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {c}
                </li>
              ))
          }
        </ul>,
        document.body
      )
    : null;

  return (
    <div ref={wrapRef} id={id}>
      <div
        className={`${ic(error)} flex items-center gap-2`}
        style={{ cursor: "text" }}
        onClick={() => { if (!open) inputRef.current?.focus(); }}
      >
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={open && activeIdx >= 0 ? `${id}-o-${activeIdx}` : undefined}
          aria-autocomplete="list"
          placeholder={open ? (value || placeholder) : placeholder}
          value={open ? query : value}
          readOnly={!open}
          className="flex-1 bg-transparent outline-none text-sm min-w-0 text-gray-900 placeholder-gray-400"
          onFocus={() => { if (!open) openMenu(); }}
          onChange={e => { if (open) { setQuery(e.target.value); setActiveIdx(-1); } }}
          onKeyDown={onKeyDown}
        />
        <button
          type="button"
          tabIndex={-1}
          onPointerDown={e => {
            e.preventDefault();
            if (open) closeMenu();
            else { inputRef.current?.focus(); openMenu(); }
          }}
          aria-hidden="true"
          className="shrink-0"
        >
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      {menu}
    </div>
  );
}

const stepAnim = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -20 },
  transition: { duration: 0.2 },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function Field({
  id, label, required, error, hint, children,
}: {
  id: string; label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-navy-900/80">
        {label}{required && <span className="text-gold ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-gray-400 text-[11px]">{hint}</p>}
      {error && <p className="text-red-500 text-[11px] mt-0.5 flex items-center gap-1" role="alert"><span aria-hidden="true">↑</span> {error}</p>}
    </div>
  );
}

type SectionColor = "blue" | "amber" | "green" | "purple" | "teal" | "indigo" | "gold";

function sectionBorder(c?: SectionColor) {
  if (c === "blue")   return "border-blue-400";
  if (c === "amber")  return "border-amber-500";
  if (c === "green")  return "border-green-500";
  if (c === "purple") return "border-purple-400";
  if (c === "teal")   return "border-teal-400";
  if (c === "indigo") return "border-indigo-400";
  if (c === "gold")   return "border-gold";
  return "border-gray-300";
}
function sectionBg(c?: SectionColor) {
  if (c === "blue")   return "bg-blue-50/70";
  if (c === "amber")  return "bg-amber-50/70";
  if (c === "green")  return "bg-green-50/70";
  if (c === "purple") return "bg-purple-50/70";
  if (c === "teal")   return "bg-teal-50/70";
  if (c === "indigo") return "bg-indigo-50/70";
  if (c === "gold")   return "bg-gold/5";
  return "bg-gray-50/70";
}
function sectionBadge(c?: SectionColor) {
  if (c === "blue")   return "bg-blue-100 text-blue-700";
  if (c === "amber")  return "bg-amber-100 text-amber-700";
  if (c === "green")  return "bg-green-100 text-green-700";
  if (c === "purple") return "bg-purple-100 text-purple-700";
  if (c === "teal")   return "bg-teal-100 text-teal-700";
  if (c === "indigo") return "bg-indigo-100 text-indigo-700";
  if (c === "gold")   return "bg-gold/15 text-yellow-700";
  return "bg-gray-100 text-gray-500";
}
function sectionText(c?: SectionColor) {
  if (c === "blue")   return "text-blue-700";
  if (c === "amber")  return "text-amber-700";
  if (c === "green")  return "text-green-700";
  if (c === "purple") return "text-purple-700";
  if (c === "teal")   return "text-teal-700";
  if (c === "indigo") return "text-indigo-700";
  if (c === "gold")   return "text-yellow-700";
  return "text-navy-900/60";
}

function SpecSection({ title, number, color, children }: {
  title: string; number?: number; color?: SectionColor; children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <div className={`border-l-[3px] ${sectionBorder(color)} px-4 py-2.5 ${sectionBg(color)}`}>
        <div className="flex items-center gap-2">
          {number !== undefined && (
            <span className={`w-[18px] h-[18px] rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 ${sectionBadge(color)}`}>
              {number}
            </span>
          )}
          <p className={`text-[10px] font-bold tracking-[0.18em] uppercase ${sectionText(color)}`}>{title}</p>
        </div>
      </div>
      <div className="px-4 py-3 space-y-3">{children}</div>
    </div>
  );
}

function ReviewSection({ title, onEdit, children }: {
  title: string; onEdit: () => void; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-navy-900 font-bold text-sm">{title}</h3>
        <button type="button" onClick={onEdit}
          className="text-xs font-semibold text-gold hover:text-yellow-600 transition-colors"
          aria-label={`Edit ${title}`}>
          Edit
        </button>
      </div>
      <div className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-1">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-400 text-xs w-36 shrink-0">{label}</span>
      <span className="text-navy-900 text-xs font-medium break-words min-w-0">{value || "—"}</span>
    </div>
  );
}

function ChipSelect({
  id, options, value, onChange, error,
}: {
  id?: string; options: string[]; value: string;
  onChange: (v: string) => void; error?: string;
}) {
  return (
    <div id={id}>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button key={opt} type="button"
              onClick={() => onChange(active ? "" : opt)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                active
                  ? "border-gold bg-gold/8 text-navy-900"
                  : error
                  ? "border-red-200 text-gray-500 hover:border-red-300"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-navy-900"
              }`}>
              {opt}
            </button>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1" role="alert"><span aria-hidden="true">↑</span> {error}</p>}
    </div>
  );
}

function CheckboxGrid({ options, selected, onToggle }: {
  options: string[]; selected: string[]; onToggle: (val: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <label key={opt} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors select-none ${
            checked ? "border-gold bg-gold/5 text-navy-900" : "border-gray-200 hover:border-gray-300 text-gray-600"
          }`}>
            <input type="checkbox" className="accent-[#D4A017] w-3.5 h-3.5 shrink-0"
              checked={checked} onChange={() => onToggle(opt)} />
            <span className="text-xs font-medium leading-tight">{opt}</span>
          </label>
        );
      })}
    </div>
  );
}

function OtherInput({ id, show, value, onChange, placeholder }: {
  id: string; show: boolean; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  if (!show) return null;
  return (
    <input id={id} type="text" placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`mt-2 ${ic()}`} />
  );
}

// ── Category icons ────────────────────────────────────────────────────────────

function IconApparel({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}
function IconHomeTextile({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3" />
      <path d="M2 11v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-4 0v1H6v-1a2 2 0 0 0-4 0z" />
    </svg>
  );
}
function IconFabric({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" />
    </svg>
  );
}

function getCategoryIcon(cat: string) {
  if (cat === "Apparel") return <IconApparel size={14} />;
  if (cat === "Home Textiles") return <IconHomeTextile size={14} />;
  if (cat === "Fabric") return <IconFabric size={14} />;
  return null;
}

// ── Grouped product data (mirrors mega-menu structure) ────────────────────────

const APPAREL_GROUPS: { group: string; items: string[] }[] = [
  { group: "Knitted Garments", items: ["T-Shirts", "Polo Shirts", "Henley Shirts", "Sweatshirts & Hoodies", "Sweatpants & Joggers", "Tank Tops"] },
  { group: "Woven Garments", items: ["Denim Jeans", "Formal & Casual Shirts", "Pants & Trousers", "Cargo Pants", "Shorts"] },
  { group: "Baby & Kids", items: ["T-Shirts for Kids", "Swaddle Muslin Fabric", "Overalls", "Baby Rompers", "Baby Bibs", "Baby Hooded Towels"] },
  { group: "Specialty", items: ["Workwear Apparel", "Socks", "Other / Multiple"] },
];

const HOME_TEXTILE_GROUPS: { group: string; items: string[] }[] = [
  { group: "Bath Linen", items: ["Towels", "Institutional Towels", "Bathrobes", "Bath Mats", "Beach & Pool Towels"] },
  { group: "Bed Linen", items: ["Bedsheets", "Fitted Sheets", "Duvet Covers", "Pillow Covers", "Cushion Covers", "Curtains"] },
  { group: "Kitchen Linen", items: ["Kitchen Towels", "Bar Mops", "Aprons", "Pot Holders"] },
  { group: "Table & Thermal", items: ["Table Covers", "Cellular Thermal Blanket", "Fleece Thermal Blankets"] },
  { group: "Hospital Linen", items: ["Doctor Surgical Gowns", "Medical Scrubs", "Patient Gowns", "Surgical Huck Towels"] },
  { group: "Industrial & Specialty", items: ["Shop Towels", "Fender Covers", "Ihram", "Other / Multiple"] },
];

const FABRIC_GROUPS: { group: string; items: string[] }[] = [
  { group: "Fabric Type", items: ["Apparel Fabric", "Home Textile Fabric"] },
];

function getProductGroups(category: string) {
  if (category === "Apparel") return APPAREL_GROUPS;
  if (category === "Home Textiles") return HOME_TEXTILE_GROUPS;
  if (category === "Fabric") return FABRIC_GROUPS;
  return [];
}

// ── Grouped product selector (two-level: sub-category pill → product chips) ───

const GROUP_DOT: Record<string, string> = {
  "Knitted Garments":       "bg-indigo-400",
  "Woven Garments":         "bg-violet-400",
  "Baby & Kids":            "bg-pink-400",
  "Specialty":              "bg-gray-400",
  "Bath Linen":             "bg-teal-400",
  "Bed Linen":              "bg-blue-400",
  "Kitchen Linen":          "bg-amber-400",
  "Table & Thermal":        "bg-orange-400",
  "Hospital Linen":         "bg-red-400",
  "Industrial & Specialty": "bg-slate-400",
  "Fabric Type":            "bg-amber-400",
};

function GroupedProductSelector({
  category,
  value,
  onChange,
  error,
}: {
  category: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const groups = getProductGroups(category);
  const ownerGroup = groups.find(g => g.items.includes(value))?.group ?? "";
  const [openGroup, setOpenGroup] = useState<string>(ownerGroup);

  useEffect(() => {
    setOpenGroup(groups.find(g => g.items.includes(value))?.group ?? "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const activeItems = groups.find(g => g.group === openGroup)?.items ?? [];

  // Fabric only has 2 options — skip sub-category level entirely
  if (category === "Fabric") {
    return (
      <div>
        <div className="flex flex-wrap gap-2">
          {groups.flatMap(g => g.items).map(item => {
            const sel = value === item;
            return (
              <button key={item} type="button" onClick={() => onChange(item)}
                className={`px-3.5 py-2 rounded-xl border text-sm font-medium transition-all ${
                  sel ? "border-gold bg-gold/10 text-navy-900 shadow-sm" : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-navy-900"
                }`}>
                {sel && <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold mr-1.5 mb-px align-middle" aria-hidden="true" />}
                {item}
              </button>
            );
          })}
        </div>
        {error && <p className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1" role="alert"><span aria-hidden="true">↑</span> {error}</p>}
      </div>
    );
  }

  return (
    <div>
      {/* Level 1 — sub-category pills (always visible, one row wraps on mobile) */}
      <div className="flex flex-wrap gap-1.5">
        {groups.map(({ group, items }) => {
          const dot   = GROUP_DOT[group] ?? "bg-gray-300";
          const isOpen    = group === openGroup;
          const hasValue  = items.includes(value);
          return (
            <button
              key={group}
              type="button"
              onClick={() => setOpenGroup(isOpen ? "" : group)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                isOpen
                  ? "border-navy-900 bg-navy-900 text-white"
                  : hasValue
                  ? "border-gold bg-gold/10 text-navy-900"
                  : error
                  ? "border-red-200 text-gray-600 hover:border-red-300"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-navy-900"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isOpen ? "bg-gold" : dot}`} aria-hidden="true" />
              {group}
              {hasValue && !isOpen && (
                <svg className="w-3 h-3 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              <svg
                className={`w-3 h-3 shrink-0 transition-transform ${isOpen ? "rotate-180 text-gold" : "text-current opacity-50"}`}
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Level 2 — product chips for the open sub-category */}
      <AnimatePresence>
        {openGroup && (
          <motion.div
            key={openGroup}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.16 }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex flex-wrap gap-1.5">
              {activeItems.map(item => {
                const sel = value === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onChange(item)}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all leading-tight ${
                      sel
                        ? "border-gold bg-white text-navy-900 shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-navy-900"
                    }`}
                  >
                    {sel && <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold mr-1.5 mb-px align-middle" aria-hidden="true" />}
                    {item}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1" role="alert">
          <span aria-hidden="true">↑</span> {error}
        </p>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function RFQContent() {
  const [step, setStep]               = useState(1);
  const [formState, setFormState]     = useState<RFQFormState>(INITIAL_FORM);
  const [activeProduct, setActiveProduct] = useState(0);
  const [phoneCountry, setPhoneCountry]   = useState("us");
  const [errors, setErrors]           = useState<Record<string, string>>({});
  const [status, setStatus]           = useState<Status>("idle");
  const [submittedAt, setSubmittedAt] = useState("");
  const [pdfState, setPdfState]       = useState<"idle" | "loading" | "done" | "error">("idle");
  const formRef  = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rfq_wizard_draft_v2");
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<RFQFormState>;
        // Restore personal/logistics details only — products always start blank
        // so the user is never dropped into a pre-selected product state on load.
        const { products: _p, ...rest } = parsed;
        setFormState(prev => ({ ...prev, ...rest }));
      }
    } catch { /* ignore */ }
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    if (!hasMounted.current) return;
    const t = setTimeout(() => {
      try { localStorage.setItem("rfq_wizard_draft_v2", JSON.stringify(formState)); } catch { /* ignore */ }
    }, 500);
    return () => clearTimeout(t);
  }, [formState]);

  function scrollToForm() {
    if (!formRef.current) return;
    const y = formRef.current.getBoundingClientRect().top + window.scrollY - 180;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }

  function updateProduct(index: number, updates: Partial<ProductSpec>) {
    setFormState(prev => ({
      ...prev,
      products: prev.products.map((p, i) => i === index ? { ...p, ...updates } : p),
    }));
  }

  function setGlobal(field: keyof RFQFormState, value: string) {
    setFormState(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  }

  function addProduct() {
    setFormState(prev => ({ ...prev, products: [...prev.products, mkProduct()] }));
    setActiveProduct(formState.products.length);
    setErrors({});
    setStep(1);
    scrollToForm();
  }

  function removeProduct(index: number) {
    if (formState.products.length <= 1) return;
    setFormState(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
    setActiveProduct(prev => Math.min(prev, formState.products.length - 2));
    setErrors({});
  }

  // ── Validation ──────────────────────────────────────────────────────────────

  function validateCurrentProduct(): boolean {
    const p = formState.products[activeProduct];
    const e: Record<string, string> = {};
    if (!p.category) e.category = "Please select a product category";
    if (p.category && !p.productType) e.productType = "Please select a product type";
    if (p.productType === "Other / Multiple" && !p.productTypeOther.trim())
      e.productTypeOther = "Please describe your product";
    const opts = p.productType ? getProductOptions(p.productType) : undefined;
    if (p.productType && p.productType !== "Other / Multiple" && !p.weight.trim())
      e.weight = `${opts?.weightLabel ?? "GSM / Weight"} is required`;
    if (opts?.isFabricRoll && !p.sizeRange[0])
      e.sizeRange0 = "Fabric width is required";
    if (p.productType && p.productType !== "Other / Multiple" && !p.fiberContent)
      e.fiberContent = "Fiber content is required";
    if (p.productType && p.productType !== "Other / Multiple" && opts?.constructionOptions?.length && !p.construction)
      e.construction = "Construction / weave type is required";
    // Section 4 — at least one size
    if (p.productType && p.productType !== "Other / Multiple" && opts?.sizeOptions?.length && !opts?.isFabricRoll && p.sizeRange.length === 0)
      e.sizeRange = "Please select at least one size option";
    // Section 5 — dyeing method (Apparel / Home Textiles)
    if (p.productType && p.productType !== "Other / Multiple" && !opts?.isFabricRoll && (p.category === "Apparel" || p.category === "Home Textiles") && !p.dyeingMethod)
      e.dyeingMethod = "Dyeing method is required";
    // Section 5 — fabric state (Fabric rolls)
    if (opts?.isFabricRoll && !p.printType)
      e.printType = "Fabric state is required";
    // Section 6 — at least one finishing option
    if (p.productType && p.productType !== "Other / Multiple" && opts?.finishingOptions?.length && p.finishing.length === 0)
      e.finishing = "Please select at least one finishing option";
    // Section 7 — brand label (Apparel only)
    if (p.productType && p.productType !== "Other / Multiple" && p.category === "Apparel" && !p.brandLabel)
      e.brandLabel = "Brand label type is required";
    // Section 8 — packing type
    if (p.productType && p.productType !== "Other / Multiple" && opts?.isFabricRoll && !p.rollLength)
      e.rollLength = "Roll length is required";
    if (p.productType && p.productType !== "Other / Multiple" && !opts?.isFabricRoll && opts?.individualPackOptions?.length && !p.individualPack)
      e.individualPack = "Individual pack type is required";
    // Section 9 — at least one certification entry
    if (p.productType && p.productType !== "Other / Multiple" && opts?.certifications?.length && p.certifications.length === 0)
      e.certifications = "Select at least one option — or choose 'No specific requirement'";
    if (!p.quantity.trim()) e.quantity = "Quantity is required";
    else if (!/\d/.test(p.quantity)) e.quantity = "Enter a numeric quantity";
    if (p.targetPrice && !/\d/.test(p.targetPrice)) e.targetPrice = "Enter a valid price (e.g. 3.50)";
    setErrors(e); focusFirstError(e);
    return Object.keys(e).length === 0;
  }

  function validateAllProducts(): boolean {
    for (let i = 0; i < formState.products.length; i++) {
      const p = formState.products[i];
      if (!p.category && !p.productType) continue;
      if (!p.category || !p.productType || !p.quantity.trim()) {
        setActiveProduct(i);
        setErrors({
          ...(!p.category ? { category: "Please select a product category" } : {}),
          ...(!p.productType && p.category ? { productType: "Please select a product type" } : {}),
          ...(!p.quantity.trim() ? { quantity: "Quantity is required" } : {}),
        });
        return false;
      }
    }
    return true;
  }

  function validateStep2(): boolean {
    const e: Record<string, string> = {};
    if (!formState.destinationCountry) e.destinationCountry = "Please select a destination country";
    if (!formState.deliveryDate) e.deliveryDate = "Required delivery date is required";
    else if (new Date(formState.deliveryDate) <= new Date()) e.deliveryDate = "Delivery date must be in the future";
    if (needsPort(formState.incoterm) && !formState.portOfDestination.trim())
      e.portOfDestination = "Port of destination is required for CIF / CFR";
    setErrors(e); focusFirstError(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3(): boolean {
    const e: Record<string, string> = {};
    if (!formState.name.trim()) e.name = "Full name is required";
    if (!formState.position.trim()) e.position = "Position / job title is required";
    if (!formState.company.trim()) e.company = "Company name is required";
    if (!formState.email.trim()) e.email = "Business email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) e.email = "Enter a valid email";
    const phoneErr = validatePhone(formState.phone, phoneCountry);
    if (phoneErr) e.phone = phoneErr;
    if (!formState.country) e.country = "Please select your country";
    setErrors(e); focusFirstError(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    let valid = false;
    if (step === 1) { valid = validateCurrentProduct() && validateAllProducts(); }
    else if (step === 2) { valid = validateStep2(); }
    else if (step === 3) { valid = validateStep3(); }
    else { valid = true; }
    if (valid) { setErrors({}); setStep(s => s + 1); scrollToForm(); }
  }

  function handleBack() {
    setErrors({}); setStep(s => s - 1); scrollToForm();
  }

  async function handleSubmit() {
    const validProducts = formState.products.filter(p => p.category && p.productType);
    const subject = `[RFQ] ${validProducts.map(p => p.productType || p.category).join(" + ")} — ${formState.company}`;
    const body = buildEmailBody(formState);
    try { await navigator.clipboard.writeText(body); } catch { /* ignore — clipboard is a silent backup */ }
    // Full body in mailto — desktop email clients (Outlook, Thunderbird, Mail) handle it.
    // Gmail web ignores body; clipboard copy is the fallback for those users.
    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try { localStorage.removeItem("rfq_wizard_draft_v2"); } catch { /* ignore */ }
    const now = new Date();
    setSubmittedAt(
      now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
      + " at " + now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    );
    setStatus("sent");
    scrollToForm();
  }

  async function handleDownloadPdf() {
    setPdfState("loading");
    try {
      const { generateRFQPdf } = await import("@/lib/rfq-pdf");
      const validProducts = formState.products.filter(p => p.category && p.productType);
      const pdfSubject = `[RFQ] ${validProducts.map(p => p.productType || p.category).join(" + ")} — ${formState.company}`;
      await generateRFQPdf(formState, submittedAt, pdfSubject);
      setPdfState("done");
    } catch {
      setPdfState("error");
    }
  }

  // ── Step 1: Product(s) ──────────────────────────────────────────────────────

  function renderStep1() {
    const product = formState.products[activeProduct];
    const opts = product.productType ? getProductOptions(product.productType) : null;
    const productTypes = getProductTypes(product.category);
    const fiberOptions =
      product.category === "Apparel" ? FIBER_CONTENT_APPAREL :
      product.category === "Home Textiles" ? FIBER_CONTENT_HT : FIBER_CONTENT_FABRIC;

    function setP(field: keyof ProductSpec, value: string) {
      updateProduct(activeProduct, { [field]: value });
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    }

    function toggleArr(field: "finishing" | "certifications" | "embellishments" | "accessories" | "sizeRange", val: string) {
      const arr = (product[field] as string[]) || [];
      const next = arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
      updateProduct(activeProduct, { [field]: next } as Partial<ProductSpec>);
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    }

    const finishingOpts = opts ? ["Standard / No special finishing", ...opts.finishingOptions, "Other (specify below)"] : [];
    const isTerrySelected = product.construction !== "" && /terry|velour/i.test(product.construction);
    const shouldShowWarpWeft = !!(opts?.showWarpWeft && (
      opts.isFabricRoll ? product.construction === "Woven"
        : !opts.showPileGround || !isTerrySelected
    ));
    const shouldShowPileGround = !!(opts?.showPileGround && (
      opts.isFabricRoll ? product.construction === "Terry"
        : !opts.showWarpWeft || isTerrySelected
    ));

    return (
      <motion.div key="step1" {...stepAnim}>
        {/* Product tab strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none">
          {formState.products.map((p, idx) => {
            const isActive = idx === activeProduct;
            const label = getProductTabLabel(p);
            const cat = p.category;
            return (
              <button key={p.id} type="button"
                onClick={() => { setActiveProduct(idx); setErrors({}); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-semibold shrink-0 transition-colors ${
                  isActive
                    ? "bg-navy-900 border-navy-900 text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-navy-900"
                }`}>
                <span className={isActive ? "text-gold" : "text-gray-400"}>{getCategoryIcon(cat)}</span>
                <span className="max-w-[110px] truncate">{label}</span>
                {formState.products.length > 1 && (
                  <span
                    onClick={(e) => { e.stopPropagation(); removeProduct(idx); }}
                    className={`ml-0.5 text-sm leading-none transition-opacity ${isActive ? "text-white/60 hover:text-white" : "text-gray-400 hover:text-red-400"}`}
                    aria-label={`Remove ${label}`}>
                    ×
                  </span>
                )}
              </button>
            );
          })}
          {formState.products.length < 6 && (
            <button type="button" onClick={addProduct}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-navy-900 bg-navy-900 text-white text-xs font-medium shrink-0 hover:bg-navy-900/85 transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              Add Product
            </button>
          )}
        </div>

        <div className="space-y-3">
          {/* Category */}
          <SpecSection title="Product Category" number={1} color="blue">
            <div>
              <div className="grid grid-cols-3 gap-3">
                {([
                  {
                    id: "Apparel",
                    icon: <IconApparel size={26} />,
                    selClass: "border-indigo-500 bg-indigo-50 text-indigo-900",
                    selIcon: "text-indigo-500",
                    hoverClass: "hover:border-indigo-300 hover:bg-indigo-50/50",
                    idleIcon: "text-indigo-300",
                  },
                  {
                    id: "Home Textiles",
                    icon: <IconHomeTextile size={26} />,
                    selClass: "border-teal-500 bg-teal-50 text-teal-900",
                    selIcon: "text-teal-500",
                    hoverClass: "hover:border-teal-300 hover:bg-teal-50/50",
                    idleIcon: "text-teal-300",
                  },
                  {
                    id: "Fabric",
                    icon: <IconFabric size={26} />,
                    selClass: "border-amber-500 bg-amber-50 text-amber-900",
                    selIcon: "text-amber-500",
                    hoverClass: "hover:border-amber-300 hover:bg-amber-50/50",
                    idleIcon: "text-amber-300",
                  },
                ] as const).map(({ id, icon, selClass, selIcon, hoverClass, idleIcon }) => (
                  <button key={id} type="button"
                    onClick={() => {
                      updateProduct(activeProduct, { ...specReset(product), category: id, productType: "", productTypeOther: "" });
                      setErrors({});
                    }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
                      product.category === id ? selClass
                      : errors.category ? `border-red-300 hover:border-red-400 text-gray-500 ${hoverClass}`
                      : `border-gray-200 text-gray-500 ${hoverClass}`
                    }`}>
                    <span className={product.category === id ? selIcon : idleIcon}>{icon}</span>
                    <span className="text-xs font-semibold leading-tight">{id}</span>
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1" role="alert">
                  <span aria-hidden="true">↑</span> {errors.category}
                </p>
              )}
            </div>

            {product.category && (
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-navy-900/80">
                  Product Type <span className="text-gold ml-0.5" aria-hidden="true">*</span>
                </p>
                <GroupedProductSelector
                  category={product.category}
                  value={product.productType}
                  onChange={(v) => {
                    updateProduct(activeProduct, { ...specReset(product), productType: v, productTypeOther: "" });
                    if (errors.productType) setErrors(prev => ({ ...prev, productType: "" }));
                  }}
                  error={errors.productType}
                />
              </div>
            )}

            {product.productType === "Other / Multiple" && (
              <Field id="productTypeOther" label="Describe your product(s)" required error={errors.productTypeOther}>
                <input id="productTypeOther" type="text" required aria-invalid={!!errors.productTypeOther}
                  placeholder="e.g. Compression sportswear, cycling jerseys"
                  value={product.productTypeOther} onChange={e => setP("productTypeOther", e.target.value)}
                  className={ic(errors.productTypeOther)} />
              </Field>
            )}
          </SpecSection>

          {product.productType && (
            <div className="space-y-3">

              {/* Row 1: Composition | Construction */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
                <SpecSection title="Composition" number={2} color="teal">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Field id="fiberContent" label="Fiber Content" required error={errors.fiberContent}>
                        <select id="fiberContent" value={product.fiberContent}
                          onChange={e => { setP("fiberContent", e.target.value); if (errors.fiberContent) setErrors(prev => ({ ...prev, fiberContent: "" })); }} className={ic(errors.fiberContent)}>
                          <option value="">Select…</option>
                          {fiberOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                      <OtherInput id="fiberContentOther" show={product.fiberContent === "Other"}
                        value={product.fiberContentOther} onChange={v => setP("fiberContentOther", v)}
                        placeholder="Specify fiber (e.g. Bamboo-Linen)" />
                    </div>
                    {product.category === "Apparel" && (
                      <div>
                        <Field id="yarnType" label="Yarn Type">
                          <select id="yarnType" value={product.yarnType}
                            onChange={e => setP("yarnType", e.target.value)} className={ic()}>
                            <option value="">Select…</option>
                            {YARN_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <OtherInput id="yarnTypeOther" show={product.yarnType === "Other"}
                          value={product.yarnTypeOther} onChange={v => setP("yarnTypeOther", v)}
                          placeholder="Specify yarn type" />
                      </div>
                    )}
                    {opts?.isFabricRoll && (
                      <Field id="sustainability" label="Sustainability">
                        <select id="sustainability" value={product.sustainability}
                          onChange={e => setP("sustainability", e.target.value)} className={ic()}>
                          <option value="">Select…</option>
                          {SUSTAINABILITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                    )}
                  </div>
                  <Field id="compositionNotes" label="Composition Notes">
                    <input id="compositionNotes" type="text"
                      placeholder="e.g. 100% ring spun combed cotton"
                      value={product.compositionNotes} onChange={e => setP("compositionNotes", e.target.value)}
                      className={ic()} />
                  </Field>
                </SpecSection>

                <div className="space-y-3">
                  {opts && (
                    <SpecSection title={opts.isFabricRoll ? "Construction & Width" : "Construction & Weight"} number={3} color="amber">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <Field id="construction" label={opts.constructionLabel} required error={errors.construction}>
                            <select id="construction" value={product.construction}
                              onChange={e => { setP("construction", e.target.value); if (errors.construction) setErrors(prev => ({ ...prev, construction: "" })); }} className={ic(errors.construction)}>
                              <option value="">Select…</option>
                              {opts.constructionOptions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          {product.construction === "Other" && (
                            <input type="text" placeholder={opts.constructionOtherPlaceholder}
                              value={product.constructionOther} onChange={e => setP("constructionOther", e.target.value)}
                              className={`mt-2 ${ic()}`} />
                          )}
                        </div>
                        <Field id="weight" label={opts.weightLabel} required error={errors.weight}>
                          <input id="weight" type="text" aria-invalid={!!errors.weight}
                            placeholder={opts.weightPlaceholder}
                            value={product.weight} onChange={e => { setP("weight", e.target.value); }}
                            className={ic(errors.weight)} />
                        </Field>
                      </div>

                      {opts.isFabricRoll && product.construction === "Knitted" && (
                        <div>
                          <Field id="fabricSubType" label="Knit Type">
                            <select id="fabricSubType" value={product.fabricSubType}
                              onChange={e => setP("fabricSubType", e.target.value)} className={ic()}>
                              <option value="">Select…</option>
                              {KNIT_TYPES_FABRIC.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="fabricSubTypeOther" show={product.fabricSubType === "Other"}
                            value={product.fabricSubTypeOther} onChange={v => setP("fabricSubTypeOther", v)}
                            placeholder="Specify knit type" />
                        </div>
                      )}
                      {opts.isFabricRoll && product.construction === "Woven" && (
                        <div>
                          <Field id="fabricSubType" label="Woven Type">
                            <select id="fabricSubType" value={product.fabricSubType}
                              onChange={e => setP("fabricSubType", e.target.value)} className={ic()}>
                              <option value="">Select…</option>
                              {WOVEN_TYPES_FABRIC.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="fabricSubTypeOther" show={product.fabricSubType === "Other"}
                            value={product.fabricSubTypeOther} onChange={v => setP("fabricSubTypeOther", v)}
                            placeholder="Specify woven type" />
                        </div>
                      )}
                      {opts.isFabricRoll && (
                        <div>
                          <Field id="sizeRange0" label="Fabric Width" required error={errors.sizeRange0}>
                            <select id="sizeRange0" aria-invalid={!!errors.sizeRange0}
                              value={product.sizeRange[0] ?? ""}
                              onChange={e => {
                                updateProduct(activeProduct, { sizeRange: e.target.value ? [e.target.value] : [] });
                                if (errors.sizeRange0) setErrors(prev => ({ ...prev, sizeRange0: "" }));
                              }}
                              className={ic(errors.sizeRange0)}>
                              <option value="">Select width…</option>
                              {FABRIC_WIDTHS_FABRIC.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="fabricWidthCustom" show={product.sizeRange[0] === "Custom"}
                            value={product.sizeRangeNotes} onChange={v => setP("sizeRangeNotes", v)}
                            placeholder={'e.g. 64" / 163 cm usable width'} />
                        </div>
                      )}
                    </SpecSection>
                  )}

                  {shouldShowWarpWeft && (
                    <SpecSection title="Yarn Specification — Warp & Weft" color="teal">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Field id="warpYarn" label="Warp Yarn">
                          <input id="warpYarn" type="text" placeholder="e.g. 30/1 Ne Ring Spun Cotton"
                            value={product.warpYarn} onChange={e => setP("warpYarn", e.target.value)} className={ic()} />
                        </Field>
                        <Field id="weftYarn" label="Weft Yarn">
                          <input id="weftYarn" type="text" placeholder="e.g. 20/1 OE Cotton"
                            value={product.weftYarn} onChange={e => setP("weftYarn", e.target.value)} className={ic()} />
                        </Field>
                      </div>
                      <Field id="picksPerCm" label="Picks per cm / Thread Density">
                        <input id="picksPerCm" type="text" placeholder="e.g. Warp 40 × Weft 30 per cm"
                          value={product.picksPerCm} onChange={e => setP("picksPerCm", e.target.value)} className={ic()} />
                      </Field>
                    </SpecSection>
                  )}
                  {shouldShowPileGround && (
                    <SpecSection title="Yarn Specification — Pile & Ground" color="teal">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Field id="pileYarn" label="Pile Yarn">
                          <input id="pileYarn" type="text" placeholder="e.g. 16/1 Ne Ring Spun Cotton"
                            value={product.pileYarn} onChange={e => setP("pileYarn", e.target.value)} className={ic()} />
                        </Field>
                        <Field id="groundYarn" label="Ground Yarn">
                          <input id="groundYarn" type="text" placeholder="e.g. 20/1 Ne Ring Spun Cotton"
                            value={product.groundYarn} onChange={e => setP("groundYarn", e.target.value)} className={ic()} />
                        </Field>
                      </div>
                      <Field id="picksPerCm" label="Loop Density">
                        <input id="picksPerCm" type="text" placeholder="e.g. 8 pile rows per cm"
                          value={product.picksPerCm} onChange={e => setP("picksPerCm", e.target.value)} className={ic()} />
                      </Field>
                    </SpecSection>
                  )}
                </div>
              </div>

              {/* Row 2: Dimensions | Color & Design */}
              {opts && !opts.isFabricRoll && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
                  <SpecSection title="Dimensions & Sizing" number={4} color="green">
                    <div>
                      <p className="text-xs font-semibold text-navy-900/80 mb-2">
                        {opts.sizeLabel} <span className="text-gray-400 font-normal text-[11px]">(select all that apply)</span>
                      </p>
                      <CheckboxGrid options={opts.sizeOptions} selected={product.sizeRange} onToggle={v => toggleArr("sizeRange", v)} />
                      {errors.sizeRange && <p className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1" role="alert"><span aria-hidden="true">↑</span> {errors.sizeRange}</p>}
                      {product.sizeRange.includes("Custom") && (
                        <input type="text" placeholder="Describe your custom size requirement"
                          value={product.sizeRangeNotes} onChange={e => setP("sizeRangeNotes", e.target.value)}
                          className={`mt-3 ${ic()}`} />
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {opts.showFitType && (
                        <Field id="fitType" label="Fit Type">
                          <select id="fitType" value={product.fitType}
                            onChange={e => setP("fitType", e.target.value)} className={ic()}>
                            <option value="">Select…</option>
                            {opts.fitOptions.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                      )}
                      {opts.styleOptions.length > 0 && (
                        <div>
                          <Field id="style" label={opts.styleLabel}>
                            <select id="style" value={product.style}
                              onChange={e => setP("style", e.target.value)} className={ic()}>
                              <option value="">Select…</option>
                              {opts.styleOptions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="styleOther" show={product.style === "Other"}
                            value={product.styleOther} onChange={v => setP("styleOther", v)}
                            placeholder={`Specify ${opts.styleLabel.toLowerCase()}`} />
                        </div>
                      )}
                      {opts.showSizeStandard && (
                        <div>
                          <Field id="sizeStandard" label="Size Standard">
                            <select id="sizeStandard" value={product.sizeStandard}
                              onChange={e => setP("sizeStandard", e.target.value)} className={ic()}>
                              <option value="">Select…</option>
                              {SIZE_STANDARDS.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="sizeStandardOther" show={product.sizeStandard === "Custom"}
                            value={product.sizeStandardOther} onChange={v => setP("sizeStandardOther", v)}
                            placeholder="Describe your size chart" />
                        </div>
                      )}
                      {opts.showCollarType && (
                        <div>
                          <Field id="collarType" label="Collar Type">
                            <select id="collarType" value={product.collarType}
                              onChange={e => setP("collarType", e.target.value)} className={ic()}>
                              <option value="">Select…</option>
                              {opts.collarOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="collarTypeOther" show={product.collarType === "Other"}
                            value={product.collarTypeOther} onChange={v => setP("collarTypeOther", v)}
                            placeholder="Specify collar type" />
                        </div>
                      )}
                      {opts.showBackingType && (
                        <div>
                          <Field id="backingType" label="Backing">
                            <select id="backingType" value={product.backingType}
                              onChange={e => setP("backingType", e.target.value)} className={ic()}>
                              <option value="">Select…</option>
                              {opts.backingOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="backingTypeOther" show={product.backingType === "Other"}
                            value={product.backingTypeOther} onChange={v => setP("backingTypeOther", v)}
                            placeholder="Specify backing type" />
                        </div>
                      )}
                      {opts.showClosureType && (
                        <div>
                          <Field id="closureType" label="Closure Type">
                            <select id="closureType" value={product.closureType}
                              onChange={e => setP("closureType", e.target.value)} className={ic()}>
                              <option value="">Select…</option>
                              {opts.closureOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="closureTypeOther" show={product.closureType === "Other"}
                            value={product.closureTypeOther} onChange={v => setP("closureTypeOther", v)}
                            placeholder="Specify closure type" />
                        </div>
                      )}
                      {opts.showPocketDepth && (
                        <Field id="pocketDepth" label="Pocket Depth">
                          <select id="pocketDepth" value={product.pocketDepth}
                            onChange={e => setP("pocketDepth", e.target.value)} className={ic()}>
                            <option value="">Select…</option>
                            {opts.pocketDepthOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                      )}
                      {opts.showHeadingType && (
                        <div>
                          <Field id="headingType" label="Heading Type">
                            <select id="headingType" value={product.headingType}
                              onChange={e => setP("headingType", e.target.value)} className={ic()}>
                              <option value="">Select…</option>
                              {opts.headingOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="headingTypeOther" show={product.headingType === "Other"}
                            value={product.headingTypeOther} onChange={v => setP("headingTypeOther", v)}
                            placeholder="Specify heading type" />
                        </div>
                      )}
                      {opts.showLiningType && (
                        <div>
                          <Field id="liningType" label="Lining">
                            <select id="liningType" value={product.liningType}
                              onChange={e => setP("liningType", e.target.value)} className={ic()}>
                              <option value="">Select…</option>
                              {opts.liningOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="liningTypeOther" show={product.liningType === "Other"}
                            value={product.liningTypeOther} onChange={v => setP("liningTypeOther", v)}
                            placeholder="Specify lining type" />
                        </div>
                      )}
                      {opts.showHeatingRating && (
                        <Field id="heatRating" label="Heat Rating">
                          <select id="heatRating" value={product.heatRating}
                            onChange={e => setP("heatRating", e.target.value)} className={ic()}>
                            <option value="">Select…</option>
                            {opts.heatingOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                      )}
                      {opts.showBorderField && (
                        <div>
                          <Field id="borderType" label="Border / Selvedge">
                            <select id="borderType" value={product.borderType}
                              onChange={e => setP("borderType", e.target.value)} className={ic()}>
                              <option value="">Select…</option>
                              {BORDER_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="borderTypeOther" show={product.borderType === "Other"}
                            value={product.borderTypeOther} onChange={v => setP("borderTypeOther", v)}
                            placeholder="Specify border type" />
                        </div>
                      )}
                    </div>
                  </SpecSection>

                  <SpecSection title="Color & Design" number={5} color="purple">
                    {(product.category === "Apparel" || product.category === "Home Textiles") && (
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Field id="dyeingMethod" label="Dyeing Method" required error={errors.dyeingMethod}>
                          <select id="dyeingMethod" value={product.dyeingMethod} aria-invalid={!!errors.dyeingMethod}
                            onChange={e => { setP("dyeingMethod", e.target.value); if (errors.dyeingMethod) setErrors(prev => ({ ...prev, dyeingMethod: "" })); }} className={ic(errors.dyeingMethod)}>
                            <option value="">Select…</option>
                            {DYEING_METHODS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <Field id="numberOfColors" label="Number of Colors">
                          <select id="numberOfColors" value={product.numberOfColors}
                            onChange={e => setP("numberOfColors", e.target.value)} className={ic()}>
                            <option value="">Select…</option>
                            {NUMBER_OF_COLORS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Field id="printType" label={opts.designLabel}>
                        <select id="printType" value={product.printType}
                          onChange={e => setP("printType", e.target.value)} className={ic()}>
                          <option value="">Select…</option>
                          {opts.printTypeOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                      <Field id="printPlacement" label={opts.printPlacementLabel}>
                        <select id="printPlacement" value={product.printPlacement}
                          onChange={e => setP("printPlacement", e.target.value)} className={ic()}>
                          <option value="">Select…</option>
                          {opts.printPlacementOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field id="pantoneRef" label="Pantone / Color Reference">
                      <input id="pantoneRef" type="text"
                        placeholder="e.g. PMS 286C or describe colors"
                        value={product.pantoneRef} onChange={e => setP("pantoneRef", e.target.value)} className={ic()} />
                    </Field>
                    <Field id="printDetail" label="Design Detail">
                      <input id="printDetail" type="text"
                        placeholder="e.g. Brand logo 8×4 cm, 2 spot colors"
                        value={product.printDetail} onChange={e => setP("printDetail", e.target.value)} className={ic()} />
                    </Field>
                  </SpecSection>
                </div>
              )}

              {/* Fabric roll: State & Design */}
              {opts?.isFabricRoll && (
                <SpecSection title="State & Design" number={4} color="purple">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field id="printType" label="Fabric State" required error={errors.printType}>
                      <select id="printType" value={product.printType} aria-invalid={!!errors.printType}
                        onChange={e => { setP("printType", e.target.value); if (errors.printType) setErrors(prev => ({ ...prev, printType: "" })); }} className={ic(errors.printType)}>
                        <option value="">Select…</option>
                        {FABRIC_STATES.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field id="fabricState" label="Pattern / Color Type">
                      <select id="fabricState" value={product.fabricState}
                        onChange={e => setP("fabricState", e.target.value)} className={ic()}>
                        <option value="">Select…</option>
                        {opts.printPlacementOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field id="pantoneRef" label="Pantone / Color Reference">
                    <input id="pantoneRef" type="text" placeholder="e.g. PMS 286C or describe colors"
                      value={product.pantoneRef} onChange={e => setP("pantoneRef", e.target.value)} className={ic()} />
                  </Field>
                  <Field id="colorFastnessNotes" label="Color Fastness Notes">
                    <input id="colorFastnessNotes" type="text"
                      placeholder="e.g. ISO 105-C06 grade 4 minimum"
                      value={product.colorFastnessNotes} onChange={e => setP("colorFastnessNotes", e.target.value)} className={ic()} />
                  </Field>
                </SpecSection>
              )}

              {/* Row 3: Embellishments | Finishing */}
              {opts && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
                  {product.category === "Apparel" && opts.embellishmentOptions && opts.embellishmentOptions.length > 0 ? (
                    <SpecSection title="Embellishments & Accessories / Trims" number={6} color="indigo">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-navy-900/80 mb-2">Embellishments <span className="text-gray-400 font-normal text-[11px]">(select all that apply)</span></p>
                          <CheckboxGrid options={opts.embellishmentOptions} selected={product.embellishments} onToggle={v => toggleArr("embellishments", v)} />
                          {product.embellishments.includes("Other") && (
                            <input type="text" placeholder="Describe other embellishment"
                              value={product.embellishmentsOther} onChange={e => setP("embellishmentsOther", e.target.value)}
                              className={`mt-3 ${ic()}`} />
                          )}
                        </div>
                        {opts.accessoryOptions && opts.accessoryOptions.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-navy-900/80 mb-2">Accessories & Trims <span className="text-gray-400 font-normal text-[11px]">(select all that apply)</span></p>
                            <CheckboxGrid options={opts.accessoryOptions} selected={product.accessories} onToggle={v => toggleArr("accessories", v)} />
                            {product.accessories.includes("Other") && (
                              <input type="text" placeholder="Describe other accessories / trims"
                                value={product.accessoriesOther} onChange={e => setP("accessoriesOther", e.target.value)}
                                className={`mt-3 ${ic()}`} />
                            )}
                          </div>
                        )}
                      </div>
                    </SpecSection>
                  ) : <div />}

                  <SpecSection title="Finishing" number={6} color="teal">
                    <p className="text-[11px] text-gray-500">Select all that apply</p>
                    <CheckboxGrid options={finishingOpts} selected={product.finishing} onToggle={v => toggleArr("finishing", v)} />
                    {errors.finishing && <p className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1" role="alert"><span aria-hidden="true">↑</span> {errors.finishing}</p>}
                    {product.finishing.includes("Other (specify below)") && (
                      <input type="text" placeholder="Describe other finishing requirement"
                        value={product.finishingOther} onChange={e => setP("finishingOther", e.target.value)}
                        className={`mt-3 ${ic()}`} />
                    )}
                  </SpecSection>
                </div>
              )}

              {/* Row 4: Labels | Packing */}
              {opts && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
                  {product.category === "Apparel" ? (
                    <SpecSection title="Labels & Branding" number={7} color="indigo">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Field id="brandLabel" label="Brand Label" required error={errors.brandLabel}>
                          <select id="brandLabel" value={product.brandLabel} aria-invalid={!!errors.brandLabel}
                            onChange={e => { setP("brandLabel", e.target.value); if (errors.brandLabel) setErrors(prev => ({ ...prev, brandLabel: "" })); }} className={ic(errors.brandLabel)}>
                            <option value="">Select…</option>
                            {BRAND_LABELS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <Field id="careLabel" label="Care Label">
                          <select id="careLabel" value={product.careLabel}
                            onChange={e => setP("careLabel", e.target.value)} className={ic()}>
                            <option value="">Select…</option>
                            {CARE_LABELS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <Field id="stitchType" label="Stitch Type">
                          <select id="stitchType" value={product.stitchType}
                            onChange={e => setP("stitchType", e.target.value)} className={ic()}>
                            <option value="">Select…</option>
                            {STITCH_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                      </div>
                      <Field id="labelNotes" label="Label Placement / Artwork Notes">
                        <input id="labelNotes" type="text"
                          placeholder="e.g. Neck label, buyer-supplied artwork PDF"
                          value={product.labelNotes} onChange={e => setP("labelNotes", e.target.value)} className={ic()} />
                      </Field>
                    </SpecSection>
                  ) : <div />}

                  <SpecSection title="Packing" number={8} color="blue">
                    {opts.isFabricRoll ? (
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <Field id="rollLength" label="Roll Length" required error={errors.rollLength}>
                            <select id="rollLength" value={product.rollLength} aria-invalid={!!errors.rollLength}
                              onChange={e => { setP("rollLength", e.target.value); if (errors.rollLength) setErrors(prev => ({ ...prev, rollLength: "" })); }} className={ic(errors.rollLength)}>
                              <option value="">Select…</option>
                              {ROLL_LENGTHS.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <OtherInput id="rollLengthOther" show={product.rollLength.startsWith("Custom")}
                            value={product.rollLengthOther} onChange={v => setP("rollLengthOther", v)}
                            placeholder="e.g. 120m per roll" />
                        </div>
                        <Field id="rollCore" label="Roll Core">
                          <select id="rollCore" value={product.rollCore}
                            onChange={e => setP("rollCore", e.target.value)} className={ic()}>
                            <option value="">Select…</option>
                            {ROLL_CORES.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <Field id="rollNotes" label="Roll Packing Notes">
                          <input id="rollNotes" type="text"
                            placeholder="e.g. Polybag per roll, 50 rolls per pallet"
                            value={product.rollNotes} onChange={e => setP("rollNotes", e.target.value)} className={ic()} />
                        </Field>
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <Field id="individualPack" label="Individual Pack" required error={errors.individualPack}>
                            <select id="individualPack" value={product.individualPack} aria-invalid={!!errors.individualPack}
                              onChange={e => { setP("individualPack", e.target.value); if (errors.individualPack) setErrors(prev => ({ ...prev, individualPack: "" })); }} className={ic(errors.individualPack)}>
                              <option value="">Select…</option>
                              {opts.individualPackOptions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          <Field id="setComposition" label="Set Composition">
                            <select id="setComposition" value={product.setComposition}
                              onChange={e => setP("setComposition", e.target.value)} className={ic()}>
                              <option value="">Select…</option>
                              {opts.setCompositionOptions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </Field>
                          {product.category === "Apparel" && (
                            <div>
                              <Field id="masterCarton" label="Master Carton">
                                <select id="masterCarton" value={product.masterCarton}
                                  onChange={e => setP("masterCarton", e.target.value)} className={ic()}>
                                  <option value="">Select…</option>
                                  {MASTER_CARTONS.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                              </Field>
                              <OtherInput id="masterCartonOther" show={product.masterCarton.startsWith("Custom")}
                                value={product.masterCartonOther} onChange={v => setP("masterCartonOther", v)}
                                placeholder="e.g. 30 pcs per carton, max 18 kg gross" />
                            </div>
                          )}
                        </div>
                        <Field id="packingNotes" label="Packing Notes">
                          <input id="packingNotes" type="text"
                            placeholder="e.g. Retail-ready, buyer barcodes required"
                            value={product.packingNotes} onChange={e => setP("packingNotes", e.target.value)} className={ic()} />
                        </Field>
                      </div>
                    )}
                  </SpecSection>
                </div>
              )}

              {/* Certifications */}
              {opts && (
                <SpecSection title="Certifications Required" number={9} color="gold">
                  <p className="text-[11px] text-gray-500">Select all that apply — or choose &ldquo;No specific requirement&rdquo;</p>
                  <CheckboxGrid options={["No specific requirement", ...opts.certifications]} selected={product.certifications} onToggle={v => toggleArr("certifications", v)} />
                  {errors.certifications && <p className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1" role="alert"><span aria-hidden="true">↑</span> {errors.certifications}</p>}
                  {product.certifications.includes("Other (specify below)") && (
                    <input type="text" placeholder="e.g. USDA Organic, Fairtrade"
                      value={product.certOther} onChange={e => setP("certOther", e.target.value)}
                      className={`mt-3 ${ic()}`} />
                  )}
                </SpecSection>
              )}

              {/* Order Details — per product */}
              {opts && (
                <SpecSection title="Order Details" number={10} color="gold">
                  <div className="flex flex-wrap gap-4 items-start">
                    <div className="w-36 shrink-0">
                      <Field id="quantity" label="Quantity" required error={errors.quantity}>
                        <input id="quantity" type="text" aria-invalid={!!errors.quantity}
                          placeholder="e.g. 5000"
                          value={product.quantity}
                          onChange={e => { setP("quantity", e.target.value); }}
                          className={ic(errors.quantity)} />
                      </Field>
                    </div>
                    <div className="shrink-0">
                      <Field id="unitOfMeasure" label="Unit">
                        <ChipSelect
                          id="unitOfMeasure"
                          options={opts.unitOfMeasure}
                          value={product.unitOfMeasure}
                          onChange={v => setP("unitOfMeasure", v)}
                        />
                      </Field>
                    </div>
                    <div className="w-44 shrink-0">
                      <Field id="targetPrice" label="Target Price (USD / unit)">
                        <input id="targetPrice" type="text"
                          placeholder="e.g. 3.50 (optional)"
                          value={product.targetPrice}
                          onChange={e => setP("targetPrice", e.target.value)}
                          className={ic(errors.targetPrice)} />
                        {errors.targetPrice && <p className="text-red-500 text-[11px] mt-0.5" role="alert">{errors.targetPrice}</p>}
                      </Field>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-1 border-t border-gray-100">
                    <Field id="sampleRequired" label="Sample Required?">
                      <ChipSelect
                        id="sampleRequired"
                        options={SAMPLE_OPTIONS}
                        value={product.sampleRequired}
                        onChange={v => setP("sampleRequired", v)}
                      />
                      {product.sampleRequired && SAMPLE_NOTES[product.sampleRequired] && (
                        <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 px-3.5 py-2.5 text-xs text-amber-900 leading-relaxed">
                          <p className="font-semibold mb-0.5">{SAMPLE_NOTES[product.sampleRequired].note}</p>
                          {SAMPLE_NOTES[product.sampleRequired].sub && (
                            <p className="text-amber-700">{SAMPLE_NOTES[product.sampleRequired].sub}</p>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field id="hasTechPack" label="Tech Pack / Artwork?">
                      <ChipSelect
                        id="hasTechPack"
                        options={TECH_PACK_OPTIONS}
                        value={product.hasTechPack}
                        onChange={v => setP("hasTechPack", v)}
                      />
                    </Field>
                  </div>
                </SpecSection>
              )}

            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // ── Step 2: Delivery ────────────────────────────────────────────────────────

  function renderStep2() {
    return (
      <motion.div key="step2" {...stepAnim}>
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">Step 2 — Shipping & Delivery</p>
        <div className="space-y-3">
          <SpecSection title="Destination & Incoterm" number={1} color="blue">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field id="destinationCountry" label="Destination Country" required error={errors.destinationCountry}>
                <SearchableSelect
                  id="destinationCountry"
                  value={formState.destinationCountry}
                  onChange={v => { setGlobal("destinationCountry", v); }}
                  placeholder="Select country…"
                  options={COUNTRIES_SORTED}
                  error={errors.destinationCountry}
                />
              </Field>
              <Field id="deliveryDate" label="Required Delivery Date" required error={errors.deliveryDate}>
                <input id="deliveryDate" type="date" required aria-invalid={!!errors.deliveryDate}
                  value={formState.deliveryDate}
                  onChange={e => setGlobal("deliveryDate", e.target.value)}
                  className={`${ic(errors.deliveryDate)} max-w-[180px]`} />
              </Field>
            </div>
            <Field id="incoterm" label="Incoterm">
              <ChipSelect
                id="incoterm"
                options={INCOTERMS}
                value={formState.incoterm}
                onChange={v => setGlobal("incoterm", v)}
              />
            </Field>
            {needsPort(formState.incoterm) && (
              <Field id="portOfDestination" label="Port of Destination" required error={errors.portOfDestination}>
                <input id="portOfDestination" type="text" required aria-invalid={!!errors.portOfDestination}
                  placeholder="e.g. Port of Los Angeles, Port of Hamburg"
                  value={formState.portOfDestination}
                  onChange={e => setGlobal("portOfDestination", e.target.value)}
                  className={ic(errors.portOfDestination)} />
              </Field>
            )}
          </SpecSection>

          <SpecSection title="Additional Notes" number={2} color="green">
            <Field id="logisticsNotes" label="Special Requirements or Notes">
              <textarea id="logisticsNotes" rows={2}
                placeholder="Tech pack reference, special delivery requirements, or any other relevant details"
                value={formState.logisticsNotes}
                onChange={e => setGlobal("logisticsNotes", e.target.value)}
                className={`${ic()} resize-none`} />
            </Field>
          </SpecSection>
        </div>
      </motion.div>
    );
  }

  // ── Step 3: Your Details ────────────────────────────────────────────────────

  function renderStep3() {
    return (
      <motion.div key="step3" {...stepAnim}>
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">Step 3 — Your Details</p>
        <div className="space-y-3">
          <SpecSection title="Contact Information" number={1} color="blue">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field id="name" label="Full Name" required error={errors.name}>
                <input id="name" type="text" required autoComplete="name" aria-invalid={!!errors.name}
                  placeholder="Jane Smith"
                  value={formState.name} onChange={e => setGlobal("name", e.target.value)}
                  className={ic(errors.name)} />
              </Field>
              <Field id="company" label="Company Name" required error={errors.company}>
                <input id="company" type="text" required autoComplete="organization" aria-invalid={!!errors.company}
                  placeholder="Acme Retail Ltd."
                  value={formState.company} onChange={e => setGlobal("company", e.target.value)}
                  className={ic(errors.company)} />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field id="position" label="Position / Job Title" required error={errors.position}>
                <input id="position" type="text" required aria-invalid={!!errors.position}
                  placeholder="Procurement Manager"
                  value={formState.position} onChange={e => setGlobal("position", e.target.value)}
                  className={ic(errors.position)} />
              </Field>
              <Field id="country" label="Country" required error={errors.country}>
                <SearchableSelect
                  id="country"
                  value={formState.country}
                  onChange={v => { setGlobal("country", v); }}
                  placeholder="Select your country…"
                  options={COUNTRIES_SORTED}
                  error={errors.country}
                />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field id="email" label="Business Email" required error={errors.email}>
                <input id="email" type="email" required autoComplete="email" aria-invalid={!!errors.email}
                  placeholder="jane@acmeretail.com"
                  value={formState.email} onChange={e => setGlobal("email", e.target.value)}
                  className={ic(errors.email)} />
              </Field>
              <PhoneInputField
                id="phone" label="Phone Number" required
                value={formState.phone} countryIso2={phoneCountry}
                onChange={(e164, iso2) => {
                  setFormState(prev => ({ ...prev, phone: e164 }));
                  setPhoneCountry(iso2);
                }}
                error={errors.phone}
                onClearError={() => setErrors(prev => ({ ...prev, phone: "" }))}
              />
            </div>
            <Field id="howHear" label="How Did You Hear About Us">
              <div className="sm:max-w-xs">
                <select id="howHear"
                  value={formState.howHear} onChange={e => setGlobal("howHear", e.target.value)}
                  className={ic()}>
                  <option value="">Select…</option>
                  {HOW_HEAR_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </Field>
          </SpecSection>
        </div>
      </motion.div>
    );
  }

  // ── Step 4: Review & Submit ─────────────────────────────────────────────────

  function renderStep4() {
    const validProducts = formState.products.filter(p => p.category && p.productType);

    return (
      <motion.div key="step4" {...stepAnim}>
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">Step 4 — Review & Submit</p>
        <div className="space-y-3">

          {/* Products */}
          {validProducts.map((p, idx) => {
            const opts = getProductOptions(p.productType);
            const productName = p.productType === "Other / Multiple" && p.productTypeOther
              ? `${p.productType} — ${p.productTypeOther}` : p.productType;
            const qtyStr = [
              p.quantity + (p.unitOfMeasure ? " " + p.unitOfMeasure : ""),
              p.targetPrice ? `USD ${p.targetPrice}/unit` : "",
            ].filter(Boolean).join(" · ");
            const sizeDisplay = p.sizeRange.length > 0
              ? (p.sizeRangeNotes ? `${p.sizeRange.join(", ")} (${p.sizeRangeNotes})` : p.sizeRange.join(", ")) : "";
            const finishDisplay = (() => {
              const arr = p.finishing.includes("Other (specify below)") && p.finishingOther
                ? [...p.finishing.filter(x => x !== "Other (specify below)"), `Other: ${p.finishingOther}`]
                : p.finishing;
              return arr.length > 0 ? arr.join(", ") : "";
            })();
            const certDisplay = p.certifications.length > 0
              ? (p.certOther ? [...p.certifications.filter(c => c !== "Other (specify below)"), `Other: ${p.certOther}`].join(", ") : p.certifications.join(", "))
              : "";
            const yarnVal = p.yarnType === "Other" && p.yarnTypeOther ? `Other — ${p.yarnTypeOther}` : p.yarnType;
            const sizeStdVal = p.sizeStandard === "Custom" && p.sizeStandardOther ? `Custom — ${p.sizeStandardOther}` : p.sizeStandard;
            const cartonVal = p.masterCarton.startsWith("Custom") && p.masterCartonOther ? `Custom — ${p.masterCartonOther}` : p.masterCarton;
            const rollVal = p.rollLength.startsWith("Custom") && p.rollLengthOther ? `Custom — ${p.rollLengthOther}` : p.rollLength;
            const subTypeLabel = p.construction === "Knitted" ? "Knit Type" : p.construction === "Woven" ? "Woven Type" : "Weave / Knit Type";
            const subTypeVal = p.fabricSubType === "Other" && p.fabricSubTypeOther ? `Other — ${p.fabricSubTypeOther}` : p.fabricSubType;
            const embDisplay = (() => {
              const arr = p.embellishments.includes("Other") && p.embellishmentsOther
                ? [...p.embellishments.filter(x => x !== "Other"), `Other: ${p.embellishmentsOther}`]
                : p.embellishments;
              return arr.length > 0 ? arr.join(", ") : "";
            })();
            const accDisplay = (() => {
              const arr = p.accessories.includes("Other") && p.accessoriesOther
                ? [...p.accessories.filter(x => x !== "Other"), `Other: ${p.accessoriesOther}`]
                : p.accessories;
              return arr.length > 0 ? arr.join(", ") : "";
            })();

            return (
              <ReviewSection
                key={p.id}
                title={`${idx + 1}. ${productName}`}
                onEdit={() => { setActiveProduct(idx); setStep(1); scrollToForm(); }}>
                <div className="pt-1">
                  {qtyStr && (
                    <div className="flex items-center gap-2 py-2 border-b border-gray-100">
                      <span className="text-gray-400 text-xs w-36 shrink-0">Order</span>
                      <span className="text-navy-900 text-xs font-semibold">{qtyStr}</span>
                    </div>
                  )}

                  {/* Composition */}
                  {p.fiberContent && <ReviewRow label="Fiber Content" value={p.fiberContent === "Other" ? `Other — ${p.fiberContentOther}` : p.fiberContent} />}
                  {opts?.isFabricRoll && p.sustainability && <ReviewRow label="Sustainability" value={p.sustainability} />}
                  {p.category === "Apparel" && yarnVal && <ReviewRow label="Yarn Type" value={yarnVal} />}
                  {p.compositionNotes && <ReviewRow label="Composition Notes" value={p.compositionNotes} />}

                  {/* Construction */}
                  {p.construction && <ReviewRow label={opts?.constructionLabel ?? "Construction"} value={p.construction === "Other" ? `Other — ${p.constructionOther}` : p.construction} />}
                  {opts?.isFabricRoll && subTypeVal && <ReviewRow label={subTypeLabel} value={subTypeVal} />}
                  {p.weight && <ReviewRow label={opts?.weightLabel ?? "Weight"} value={p.weight} />}
                  {opts?.isFabricRoll && p.sizeRange[0] && <ReviewRow label="Fabric Width" value={p.sizeRange[0]} />}

                  {/* Yarn Specs */}
                  {opts?.showWarpWeft && p.warpYarn && <ReviewRow label="Warp Yarn" value={p.warpYarn} />}
                  {opts?.showWarpWeft && p.weftYarn && <ReviewRow label="Weft Yarn" value={p.weftYarn} />}
                  {opts?.showWarpWeft && p.picksPerCm && <ReviewRow label="Picks / Thread Density" value={p.picksPerCm} />}
                  {opts?.showPileGround && p.pileYarn && <ReviewRow label="Pile Yarn" value={p.pileYarn} />}
                  {opts?.showPileGround && p.groundYarn && <ReviewRow label="Ground Yarn" value={p.groundYarn} />}
                  {opts?.showPileGround && p.picksPerCm && !opts?.showWarpWeft && <ReviewRow label="Loop Density" value={p.picksPerCm} />}

                  {/* Sizing */}
                  {sizeDisplay && <ReviewRow label={opts?.sizeLabel ?? "Size"} value={sizeDisplay} />}
                  {p.fitType && <ReviewRow label="Fit" value={p.fitType} />}
                  {p.style && <ReviewRow label={opts?.styleLabel ?? "Style"} value={p.style === "Other" ? `Other — ${p.styleOther}` : p.style} />}
                  {opts?.showSizeStandard && sizeStdVal && <ReviewRow label="Size Standard" value={sizeStdVal} />}

                  {/* HT conditional dimension fields */}
                  {opts?.showBorderField && p.borderType && <ReviewRow label="Border / Selvedge" value={p.borderType === "Other" && p.borderTypeOther ? `Other — ${p.borderTypeOther}` : p.borderType} />}
                  {opts?.showCollarType && p.collarType && <ReviewRow label="Collar Type" value={p.collarType === "Other" && p.collarTypeOther ? `Other — ${p.collarTypeOther}` : p.collarType} />}
                  {opts?.showBackingType && p.backingType && <ReviewRow label="Backing" value={p.backingType === "Other" && p.backingTypeOther ? `Other — ${p.backingTypeOther}` : p.backingType} />}
                  {opts?.showClosureType && p.closureType && <ReviewRow label="Closure" value={p.closureType === "Other" && p.closureTypeOther ? `Other — ${p.closureTypeOther}` : p.closureType} />}
                  {opts?.showPocketDepth && p.pocketDepth && <ReviewRow label="Pocket Depth" value={p.pocketDepth} />}
                  {opts?.showHeadingType && p.headingType && <ReviewRow label="Heading Type" value={p.headingType === "Other" && p.headingTypeOther ? `Other — ${p.headingTypeOther}` : p.headingType} />}
                  {opts?.showLiningType && p.liningType && <ReviewRow label="Lining" value={p.liningType === "Other" && p.liningTypeOther ? `Other — ${p.liningTypeOther}` : p.liningType} />}
                  {opts?.showHeatingRating && p.heatRating && <ReviewRow label="Heat Rating" value={p.heatRating} />}

                  {/* Color & Design */}
                  {p.dyeingMethod && <ReviewRow label="Dyeing Method" value={p.dyeingMethod} />}
                  {p.numberOfColors && <ReviewRow label="No. of Colors" value={p.numberOfColors} />}
                  {opts?.isFabricRoll ? (
                    <>
                      {p.printType && <ReviewRow label="Fabric State" value={p.printType} />}
                      {p.fabricState && <ReviewRow label="Pattern / Color Type" value={p.fabricState} />}
                    </>
                  ) : (
                    <>
                      {p.printType && <ReviewRow label={opts?.designLabel ?? "Design"} value={p.printType} />}
                      {p.printPlacement && <ReviewRow label={opts?.printPlacementLabel ?? "Placement"} value={p.printPlacement} />}
                    </>
                  )}
                  {p.pantoneRef && <ReviewRow label="Pantone / Color Ref" value={p.pantoneRef} />}
                  {p.printDetail && <ReviewRow label="Design Detail" value={p.printDetail} />}
                  {opts?.isFabricRoll && p.colorFastnessNotes && <ReviewRow label="Color Fastness" value={p.colorFastnessNotes} />}

                  {/* Embellishments (Apparel) */}
                  {embDisplay && <ReviewRow label="Embellishments" value={embDisplay} />}
                  {accDisplay && <ReviewRow label="Accessories / Trims" value={accDisplay} />}

                  {/* Finishing */}
                  {finishDisplay && <ReviewRow label="Finishing" value={finishDisplay} />}

                  {/* Labels (Apparel) */}
                  {p.brandLabel && <ReviewRow label="Brand Label" value={p.brandLabel} />}
                  {p.careLabel && <ReviewRow label="Care Label" value={p.careLabel} />}
                  {p.stitchType && <ReviewRow label="Stitch Type" value={p.stitchType} />}
                  {p.labelNotes && <ReviewRow label="Label Notes" value={p.labelNotes} />}

                  {/* Packing */}
                  {p.individualPack && <ReviewRow label="Individual Pack" value={p.individualPack} />}
                  {p.setComposition && <ReviewRow label="Set Composition" value={p.setComposition} />}
                  {cartonVal && <ReviewRow label="Master Carton" value={cartonVal} />}
                  {p.packingNotes && <ReviewRow label="Packing Notes" value={p.packingNotes} />}

                  {/* Fabric Roll Packing */}
                  {opts?.isFabricRoll && rollVal && <ReviewRow label="Roll Length" value={rollVal} />}
                  {opts?.isFabricRoll && p.rollCore && <ReviewRow label="Roll Core" value={p.rollCore} />}
                  {opts?.isFabricRoll && p.rollNotes && <ReviewRow label="Roll Packing Notes" value={p.rollNotes} />}

                  {/* Certifications & Docs */}
                  {certDisplay && <ReviewRow label="Certifications" value={certDisplay} />}
                  {p.sampleRequired && <ReviewRow label="Sample" value={p.sampleRequired} />}
                  {p.hasTechPack && <ReviewRow label="Tech Pack" value={p.hasTechPack} />}
                </div>
              </ReviewSection>
            );
          })}

          {/* Delivery */}
          <ReviewSection title="Shipping & Delivery" onEdit={() => { setStep(2); scrollToForm(); }}>
            <ReviewRow label="Destination" value={formState.destinationCountry} />
            <ReviewRow label="Incoterm" value={formState.incoterm} />
            {needsPort(formState.incoterm) && <ReviewRow label="Port" value={formState.portOfDestination} />}
            <ReviewRow label="Delivery Date" value={formState.deliveryDate} />
            {formState.logisticsNotes && <ReviewRow label="Notes" value={formState.logisticsNotes} />}
          </ReviewSection>

          {/* Contact */}
          <ReviewSection title="Your Details" onEdit={() => { setStep(3); scrollToForm(); }}>
            <ReviewRow label="Name" value={`${formState.name}${formState.position ? " · " + formState.position : ""}`} />
            <ReviewRow label="Company" value={formState.company} />
            <ReviewRow label="Email" value={formState.email} />
            <ReviewRow label="Phone" value={formState.phone} />
            <ReviewRow label="Country" value={formState.country} />
          </ReviewSection>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-gray-700 leading-relaxed">
            By clicking <strong>Submit RFQ</strong>, you confirm you have read and agreed to the{" "}
            <Link href="/termsofuse/" className="text-gold hover:underline font-semibold" target="_blank" rel="noopener noreferrer">Terms of Use</Link>
            {" "}and{" "}
            <Link href="/privacypolicy/" className="text-gold hover:underline font-semibold" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.
            Submitting opens your email app with the full RFQ pre-filled and addressed to <strong>{RECIPIENT}</strong>.
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Sent state ──────────────────────────────────────────────────────────────

  if (status === "sent") {
    return (
      <>
        <PageHero
          image="/images/hero/hero-rfq.webp"
          imageAlt="MZ Global Trading — request a quote for B2B textile sourcing from Pakistan"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
          label="Request a Quote"
          title="Start Your" titleGold="Sourcing Request"
          description="Your email client has been opened with your RFQ pre-filled."
          pills={["Response Within 3–5 Business Days", "No Obligation", "All Categories"]}
        />
        <div className="bg-gray-50 py-20">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-10">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h2 className="text-navy-900 font-bold text-2xl mb-3">RFQ submitted — check your email app</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Your email app has opened with the full RFQ pre-filled and addressed to <strong>info@mzglobaltrading.com</strong>. Review and click <strong>Send</strong>.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm mb-4 text-left flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                <div>
                  <p className="text-amber-800 font-bold text-sm">If the email body appears empty</p>
                  <p className="text-amber-700 text-xs mt-1">
                    This happens with Gmail web or some browsers. Your full RFQ is also in your clipboard — press <strong>Ctrl+V</strong> (Windows) or <strong>⌘V</strong> (Mac) to paste it into the email body.
                  </p>
                </div>
              </div>
              <div className="bg-gold/8 border border-gold/20 rounded-xl p-4 text-sm text-gray-700 mb-7 text-left">
                <strong className="text-navy-900 text-xs">Email did not open?</strong><br />
                <span className="text-xs">Compose a new email to{" "}
                <a href={`mailto:${RECIPIENT}`} className="text-gold hover:underline font-medium">{RECIPIENT}</a>, or{" "}
                <button type="button" onClick={() => { setStatus("idle"); setStep(4); scrollToForm(); }}
                  className="text-gold hover:underline font-medium">go back and try again</button>.</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-1">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={pdfState === "loading"}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm border transition-colors ${
                    pdfState === "error"
                      ? "bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                      : pdfState === "loading"
                      ? "bg-gray-50 border-gray-200 text-gray-400 cursor-wait"
                      : "bg-white border-navy-900/20 text-navy-900 hover:bg-navy-900 hover:text-white hover:border-navy-900"
                  }`}
                  aria-label="Download a PDF copy of your RFQ submission"
                >
                  {pdfState === "loading" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                      Generating PDF…
                    </>
                  ) : pdfState === "done" ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                      Download PDF Again
                    </>
                  ) : pdfState === "error" ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                      Download failed — try again
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 12-4-4m4 4 4-4M4 20h16" /></svg>
                      Download PDF Copy
                    </>
                  )}
                </button>
                <Link href="/" className="inline-flex items-center gap-2 px-7 py-3 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────

  return (
    <>
      <PageHero
        image="/images/hero/hero-rfq.webp"
        imageAlt="MZ Global Trading — request a quote for B2B textile sourcing from Pakistan"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
        label="Request a Quote"
        title="Start Your" titleGold="Sourcing Request"
        description="Tell us what you need — product type, quantity, certifications, and delivery timeline. We match your requirements with the right factory and respond within 3–5 business days."
        pills={["Response Within 3–5 Business Days", "No Obligation", "All Categories"]}
      />

      <div ref={formRef} className="bg-gray-50">
        {/* Sticky progress bar */}
        <div
          className="sticky left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-xs"
          style={{ top: 128, height: 48 }}>
          <div className="max-w-[1600px] mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center">
            {STEPS.map((label, idx) => {
              const num = idx + 1;
              const done   = num < step;
              const active = num === step;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none min-w-0">
                  <div className="flex items-center gap-2 shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      done ? "bg-gold text-navy-900" : active ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-400"
                    }`}>
                      {done ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                      ) : num}
                    </div>
                    <span className={`text-xs font-medium hidden md:block whitespace-nowrap transition-colors ${
                      active ? "text-navy-900 font-semibold" : done ? "text-gold" : "text-gray-400"
                    }`}>{label}</span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`flex-1 h-px mx-2 transition-colors ${done ? "bg-gold" : "bg-gray-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="py-6 sm:py-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs px-5 py-5 sm:px-7 sm:py-6">
              <AnimatePresence mode="wait">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
              </AnimatePresence>

              {/* Bottom navigation */}
              <div className={`flex items-center mt-6 pt-5 border-t border-gray-100 ${step > 1 ? "justify-between" : "justify-end"}`}>
                {step > 1 && (
                  <button type="button" onClick={handleBack}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 border border-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-900/85 transition-colors">
                    ← Back
                  </button>
                )}
                <div className="flex items-center gap-3">
                  {step <= 2 && formState.products.length < 6 && formState.products[activeProduct].productType && (
                    <button type="button" onClick={addProduct}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-navy-900 border border-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-900/85 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                      Add Product
                    </button>
                  )}
                  {step < 4 ? (
                    <button type="button" onClick={handleNext}
                      className="inline-flex items-center gap-2 px-8 py-2.5 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors">
                      {step === 1 && formState.products.length > 1
                        ? `Continue with ${formState.products.filter(p => p.category).length} Products →`
                        : "Continue →"}
                    </button>
                  ) : (
                    <button type="button" onClick={handleSubmit}
                      className="inline-flex items-center gap-2 px-8 py-2.5 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      Submit RFQ →
                    </button>
                  )}
                </div>
              </div>
            </div>

            <p className="text-center text-navy-900/60 text-xs mt-4">
              Step {step} of {STEPS.length} · Submitting opens your email app with the full RFQ pre-filled.
            </p>
          </div>
        </div>
      </div>

      {/* What happens next */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">After You Submit</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">What happens next?</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 relative">
            <div className="absolute top-7 left-[20%] right-[20%] h-0.5 bg-gray-100 hidden sm:block" aria-hidden="true" />
            {[
              { s: "01", title: "Requirements Review", time: "1–3 Business Days", body: "Our sourcing team reviews your submission and identifies suitable factories from our vetted network. We may reach out for clarification if required." },
              { s: "02", title: "Quotation",           time: "3–5 Business Days", body: "Once requirements are confirmed, we provide an initial quotation covering unit pricing, MOQ, lead times, and payment terms." },
              { s: "03", title: "Samples",             time: "Upon Confirmation", body: "Pre-production samples are arranged once the quotation is accepted. Sample costs and courier charges are borne by the buyer and credited against the confirmed order." },
            ].map(({ s, title, time, body }) => (
              <div key={s} className="flex flex-col items-center text-center relative">
                <div className="w-14 h-14 rounded-full bg-navy-900 flex items-center justify-center mb-5 relative z-10">
                  <span className="text-gold font-bold text-sm">{s}</span>
                </div>
                <p className="text-xs text-gold font-semibold tracking-wider uppercase mb-1">{time}</p>
                <h3 className="text-navy-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
