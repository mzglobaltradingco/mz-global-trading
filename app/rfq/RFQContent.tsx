"use client";

import { useState, useEffect, useRef } from "react";
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

// ─── Constants ────────────────────────────────────────────────────────────────

const RECIPIENT = "info@mzglobaltrading.com";
const STEPS = ["Product Requirements", "Commercial & Logistics", "Your Details", "Review & Submit"];

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

const INCOTERMS = [
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
  "1 color (solid)", "2 colors", "3 colors", "4 colors", "5+ colors",
  "Multicolor / All-over print", "To be confirmed",
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
  "Conventional", "GOTS Organic Cotton", "BCI Cotton", "GRS Recycled", "No preference / Standard",
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
  "50m per roll", "100m per roll", "150m per roll", "200m per roll", "Custom / To be confirmed",
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

// ─── Types ────────────────────────────────────────────────────────────────────

interface RFQData {
  // Step 1
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
  dyeingMethod: string;
  numberOfColors: string;
  pantoneRef: string;
  printType: string;
  printPlacement: string;
  printDetail: string;
  finishing: string[];
  finishingOther: string;
  brandLabel: string;
  careLabel: string;
  stitchType: string;
  labelNotes: string;
  individualPack: string;
  setComposition: string;
  masterCarton: string;
  masterCartonOther: string;
  packingNotes: string;
  fabricSubType: string;
  fabricSubTypeOther: string;
  fabricState: string;
  colorFastnessNotes: string;
  rollLength: string;
  rollLengthOther: string;
  rollCore: string;
  rollNotes: string;
  certifications: string[];
  certOther: string;
  warpYarn: string;
  weftYarn: string;
  pileYarn: string;
  groundYarn: string;
  picksPerCm: string;
  embellishments: string[];
  embellishmentsOther: string;
  accessories: string[];
  accessoriesOther: string;
  // Step 2
  quantity: string;
  unitOfMeasure: string;
  targetPrice: string;
  destinationCountry: string;
  incoterm: string;
  portOfDestination: string;
  deliveryDate: string;
  notes: string;
  // Step 3
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  howHear: string;
}

const INITIAL: RFQData = {
  category: "", productType: "", productTypeOther: "",
  fiberContent: "", fiberContentOther: "", compositionNotes: "",
  yarnType: "", yarnTypeOther: "", sustainability: "",
  construction: "", constructionOther: "", weight: "",
  sizeRange: [], sizeRangeNotes: "", fitType: "", sizeStandard: "", sizeStandardOther: "",
  style: "", styleOther: "",
  borderType: "", borderTypeOther: "",
  pocketDepth: "", closureType: "", closureTypeOther: "",
  collarType: "", collarTypeOther: "",
  heatRating: "", backingType: "", backingTypeOther: "",
  headingType: "", headingTypeOther: "", liningType: "", liningTypeOther: "",
  dyeingMethod: "", numberOfColors: "", pantoneRef: "",
  printType: "", printPlacement: "", printDetail: "",
  finishing: [], finishingOther: "",
  brandLabel: "", careLabel: "", stitchType: "", labelNotes: "",
  individualPack: "", setComposition: "", masterCarton: "", masterCartonOther: "", packingNotes: "",
  fabricSubType: "", fabricSubTypeOther: "", fabricState: "",
  colorFastnessNotes: "", rollLength: "", rollLengthOther: "", rollCore: "", rollNotes: "",
  certifications: [], certOther: "",
  warpYarn: "", weftYarn: "", pileYarn: "", groundYarn: "", picksPerCm: "",
  embellishments: [], embellishmentsOther: "", accessories: [], accessoriesOther: "",
  quantity: "", unitOfMeasure: "", targetPrice: "",
  destinationCountry: "", incoterm: "", portOfDestination: "",
  deliveryDate: "", notes: "",
  name: "", position: "", company: "", email: "", phone: "", country: "", howHear: "",
};

const SPEC_RESET: Partial<RFQData> = {
  fiberContent: "", fiberContentOther: "", compositionNotes: "",
  yarnType: "", yarnTypeOther: "", sustainability: "",
  construction: "", constructionOther: "", weight: "",
  sizeRange: [], sizeRangeNotes: "", fitType: "", sizeStandard: "", sizeStandardOther: "",
  style: "", styleOther: "",
  borderType: "", borderTypeOther: "",
  pocketDepth: "", closureType: "", closureTypeOther: "",
  collarType: "", collarTypeOther: "",
  heatRating: "", backingType: "", backingTypeOther: "",
  headingType: "", headingTypeOther: "", liningType: "", liningTypeOther: "",
  dyeingMethod: "", numberOfColors: "", pantoneRef: "",
  printType: "", printPlacement: "", printDetail: "",
  finishing: [], finishingOther: "",
  brandLabel: "", careLabel: "", stitchType: "", labelNotes: "",
  individualPack: "", setComposition: "", masterCarton: "", masterCartonOther: "", packingNotes: "",
  fabricSubType: "", fabricSubTypeOther: "", fabricState: "",
  colorFastnessNotes: "", rollLength: "", rollLengthOther: "", rollCore: "", rollNotes: "",
  certifications: [], certOther: "",
  warpYarn: "", weftYarn: "", pileYarn: "", groundYarn: "", picksPerCm: "",
  embellishments: [], embellishmentsOther: "", accessories: [], accessoriesOther: "",
};

type Status = "idle" | "sent";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Email builder ────────────────────────────────────────────────────────────

function buildEmailBody(f: RFQData): string {
  const BORDER  = "=".repeat(62);
  const DIVIDER = "-".repeat(62);
  const submittedAt = new Date().toLocaleString("en-US", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  });

  const row = (label: string, value: string) => value ? `  ${label}: ${value}` : "";

  function block(title: string, rows: string[]): string {
    const populated = rows.filter(Boolean);
    if (populated.length === 0) return "";
    return [`  -- ${title}`, ...populated].join("\n");
  }

  const certText = f.certifications.length > 0
    ? (f.certOther
        ? [...f.certifications.filter(c => c !== "Other (specify below)"), `Other: ${f.certOther}`].join(", ")
        : f.certifications.join(", "))
    : "None specified";

  const productDisplay = f.productType === "Other / Multiple" && f.productTypeOther
    ? `${f.productType} — ${f.productTypeOther}` : f.productType;

  const opts = f.productType ? getProductOptions(f.productType) : null;

  const constrVal = f.construction === "Other" && f.constructionOther
    ? `Other — ${f.constructionOther}` : f.construction;
  const fiberVal = f.fiberContent === "Other" && f.fiberContentOther
    ? `Other — ${f.fiberContentOther}` : f.fiberContent;
  const yarnVal = f.yarnType === "Other" && f.yarnTypeOther
    ? `Other — ${f.yarnTypeOther}` : f.yarnType;
  const subTypeVal = f.fabricSubType === "Other" && f.fabricSubTypeOther
    ? `Other — ${f.fabricSubTypeOther}` : f.fabricSubType;
  const styleVal = f.style === "Other" && f.styleOther
    ? `Other — ${f.styleOther}` : f.style;
  const finishVal = (() => {
    const arr = f.finishing.includes("Other (specify below)") && f.finishingOther
      ? [...f.finishing.filter(x => x !== "Other (specify below)"), `Other: ${f.finishingOther}`]
      : f.finishing;
    return arr.join(", ");
  })();
  const sizeDisplay = f.sizeRange.length > 0
    ? (f.sizeRangeNotes ? `${f.sizeRange.join(", ")} (${f.sizeRangeNotes})` : f.sizeRange.join(", "))
    : "";

  function specBlocks(): string {
    if (!f.category) return "";
    const sizeLabel = opts?.sizeLabel ?? "Size Range";
    const constructionLabel = opts?.constructionLabel ?? "Fabric Type";
    const weightLabel = opts?.weightLabel ?? "GSM";

    if (opts?.isFabricRoll) {
      return [
        block("COMPOSITION", [row("Fiber Content", fiberVal), row("Sustainability", f.sustainability), row("Notes", f.compositionNotes)]),
        block("CONSTRUCTION", [
          row("Fabric Category", constrVal),
          f.construction === "Knitted" ? row("Knit Type", subTypeVal) : "",
          f.construction === "Woven" ? row("Woven Type", subTypeVal) : "",
          row("GSM / Thread Count", f.weight),
          row("Fabric Width", f.sizeRange[0] ?? ""),
        ]),
        block("STATE & DESIGN", [row("Fabric State", f.printType), row("Color / Pattern", f.pantoneRef), row("Color Fastness Notes", f.colorFastnessNotes)]),
        block("FINISHING", [row("Finish", finishVal)]),
        block("ROLL PACKING", [row("Roll Length", f.rollLength.startsWith("Custom") && f.rollLengthOther ? `Custom — ${f.rollLengthOther}` : f.rollLength), row("Roll Core", f.rollCore), row("Notes", f.rollNotes)]),
      ].filter(Boolean).join("\n\n");
    }

    if (f.category === "Apparel") {
      const embDisplay = (() => {
        const arr = f.embellishments.includes("Other") && f.embellishmentsOther
          ? [...f.embellishments.filter(x => x !== "Other"), `Other: ${f.embellishmentsOther}`]
          : f.embellishments;
        return arr.join(", ");
      })();
      const accDisplay = (() => {
        const arr = f.accessories.includes("Other") && f.accessoriesOther
          ? [...f.accessories.filter(x => x !== "Other"), `Other: ${f.accessoriesOther}`]
          : f.accessories;
        return arr.join(", ");
      })();
      const warpWeftNeeded = opts?.showWarpWeft && (f.warpYarn || f.weftYarn || f.picksPerCm);
      return [
        block("COMPOSITION", [row("Fiber Content", fiberVal), row("Yarn Type", yarnVal), row("Notes", f.compositionNotes)]),
        block("CONSTRUCTION", [row(constructionLabel, constrVal), row(weightLabel, f.weight)]),
        warpWeftNeeded ? block("YARN SPECIFICATION", [row("Warp Yarn", f.warpYarn), row("Weft Yarn", f.weftYarn), row("Picks / Thread Density", f.picksPerCm)]) : "",
        block("SIZING & STYLE", [row(sizeLabel, sizeDisplay), row("Fit", f.fitType), row("Style", styleVal), row("Size Standard", f.sizeStandard === "Custom" && f.sizeStandardOther ? `Custom — ${f.sizeStandardOther}` : f.sizeStandard)]),
        block("COLOR & DYEING", [row("Dyeing Method", f.dyeingMethod), row("No. of Colors", f.numberOfColors), row("Pantone / Color Ref", f.pantoneRef)]),
        block("PRINT & DESIGN", [row("Type", f.printType), row("Placement", f.printPlacement), row("Detail / Notes", f.printDetail)]),
        block("EMBELLISHMENTS & ACCESSORIES", [row("Embellishments", embDisplay), row("Accessories / Trims", accDisplay)]),
        block("FINISHING", [row("Finish", finishVal), row("Stitch Type", f.stitchType)]),
        block("LABELS & BRANDING", [row("Brand Label", f.brandLabel), row("Care Label", f.careLabel), row("Notes", f.labelNotes)]),
        block("PACKING", [row("Individual Pack", f.individualPack), row("Set Composition", f.setComposition), row("Master Carton", f.masterCarton.startsWith("Custom") && f.masterCartonOther ? `Custom — ${f.masterCartonOther}` : f.masterCarton), row("Notes", f.packingNotes)]),
      ].filter(Boolean).join("\n\n");
    }

    // Home Textiles
    const closureVal = f.closureType === "Other" && f.closureTypeOther ? `Other — ${f.closureTypeOther}` : f.closureType;
    const collarVal  = f.collarType === "Other" && f.collarTypeOther ? `Other — ${f.collarTypeOther}` : f.collarType;
    const backVal    = f.backingType === "Other" && f.backingTypeOther ? `Other — ${f.backingTypeOther}` : f.backingType;
    const headVal    = f.headingType === "Other" && f.headingTypeOther ? `Other — ${f.headingTypeOther}` : f.headingType;
    const liningVal  = f.liningType === "Other" && f.liningTypeOther ? `Other — ${f.liningTypeOther}` : f.liningType;
    const borderVal  = f.borderType === "Other" && f.borderTypeOther ? `Other — ${f.borderTypeOther}` : f.borderType;
    const htIsTerry = /terry|velour/i.test(f.construction);
    const htWarpWeftNeeded = opts?.showWarpWeft && !htIsTerry && (f.warpYarn || f.weftYarn || f.picksPerCm);
    const htPileGroundNeeded = opts?.showPileGround && htIsTerry && (f.pileYarn || f.groundYarn || f.picksPerCm);
    return [
      block("COMPOSITION", [row("Fiber Content", fiberVal), row("Notes", f.compositionNotes)]),
      block("CONSTRUCTION", [
        row(constructionLabel, constrVal), row(weightLabel, f.weight),
        row("Style", styleVal),
        row("Border / Selvedge", borderVal), row("Collar Type", collarVal),
        row("Backing", backVal), row("Closure", closureVal), row("Pocket Depth", f.pocketDepth),
        row("Heat Rating", f.heatRating), row("Heading Type", headVal), row("Lining", liningVal),
      ]),
      htWarpWeftNeeded ? block("YARN SPECIFICATION", [row("Warp Yarn", f.warpYarn), row("Weft Yarn", f.weftYarn), row("Picks / Thread Density", f.picksPerCm)]) : "",
      htPileGroundNeeded ? block("YARN SPECIFICATION", [row("Pile Yarn", f.pileYarn), row("Ground Yarn", f.groundYarn), row("Picks per cm / Loop Density", f.picksPerCm)]) : "",
      block("DIMENSIONS", [row(sizeLabel, sizeDisplay)]),
      block("COLOR & DESIGN", [row("Print / Design", f.printType), row("Placement", f.printPlacement), row("Pantone / Color Ref", f.pantoneRef), row("Detail / Notes", f.printDetail)]),
      block("FINISHING", [row("Finish", finishVal)]),
      block("PACKING", [row("Individual Pack", f.individualPack), row("Set Composition", f.setComposition), row("Notes", f.packingNotes)]),
    ].filter(Boolean).join("\n\n");
  }

  const lines = [
    BORDER,
    "  RFQ SUBMISSION — MZ GLOBAL TRADING",
    "  Source:     mzglobaltrading.com/rfq/",
    `  Submitted:  ${submittedAt}`,
    BORDER, "",
    "[1]  CONTACT DETAILS", DIVIDER,
    row("Name", f.name), row("Position", f.position), row("Company", f.company),
    row("Email", f.email), row("Phone", f.phone), row("Country", f.country),
    f.howHear ? row("How Did You Hear About Us", f.howHear) : "",
    "", "[2]  PRODUCT REQUIREMENTS & SPECIFICATIONS", DIVIDER,
    row("Category", f.category), row("Product Type", productDisplay), row("Certifications", certText),
    "", specBlocks() || "  No additional specifications provided.",
    "", "[3]  COMMERCIAL & LOGISTICS", DIVIDER,
    row("Quantity", f.quantity + (f.unitOfMeasure ? ` ${f.unitOfMeasure}` : "")),
    row("Target Price", f.targetPrice ? `USD ${f.targetPrice} per unit` : ""),
    row("Destination", f.destinationCountry), row("Incoterm", f.incoterm),
    ...(needsPort(f.incoterm) ? [row("Port of Destination", f.portOfDestination)] : []),
    row("Required Delivery", f.deliveryDate),
    ...(f.notes ? ["", "[4]  ADDITIONAL NOTES", DIVIDER, `  ${f.notes}`] : []),
    "", BORDER,
    "  The buyer confirms they have read and agreed to the Terms of Use",
    "  at: mzglobaltrading.com/termsofuse/ and the Privacy Policy",
    "  at: mzglobaltrading.com/privacypolicy/",
    BORDER,
  ];
  return lines.filter(l => l !== null && l !== undefined).join("\n");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({
  id, label, required, error, hint, children,
}: {
  id: string; label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-navy-900">
        {label}{required && <span className="text-gold ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-gray-400 text-xs">{hint}</p>}
      {error && <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1" role="alert"><span aria-hidden="true">↑</span> {error}</p>}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">{children}</p>;
}

function SpecSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <div className="bg-navy-900 px-5 py-2.5">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gold/80">{title}</p>
      </div>
      <div className="px-5 py-5 space-y-4">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-gray-400 text-sm w-44 flex-shrink-0">{label}</span>
      <span className="text-navy-900 text-sm font-medium break-words min-w-0">{value || "—"}</span>
    </div>
  );
}

const ic = (err?: string) =>
  `w-full px-4 py-3 border rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors bg-white disabled:bg-gray-50 ${
    err ? "border-red-400 focus:ring-red-300/40 focus:border-red-400"
        : "border-gray-200 focus:ring-gold/40 focus:border-gold"
  }`;

const stepAnim = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -24 },
  transition: { duration: 0.22 },
};

function CheckboxGrid({
  options, selected, onToggle,
}: { options: string[]; selected: string[]; onToggle: (val: string) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <label key={opt} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors select-none ${
            checked ? "border-gold bg-gold/5 text-navy-900" : "border-gray-200 hover:border-gray-300 text-gray-600"
          }`}>
            <input type="checkbox" className="accent-[#D4A017] w-3.5 h-3.5 flex-shrink-0"
              checked={checked} onChange={() => onToggle(opt)} />
            <span className="text-xs font-medium leading-tight">{opt}</span>
          </label>
        );
      })}
    </div>
  );
}

// ─── Category icons ───────────────────────────────────────────────────────────

function IconApparel() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}
function IconHomeTextile() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3" />
      <path d="M2 11v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-4 0v1H6v-1a2 2 0 0 0-4 0z" />
    </svg>
  );
}
function IconFabric() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}

// ─── OtherInput helper ────────────────────────────────────────────────────────

function OtherInput({
  id, show, value, onChange, placeholder,
}: { id: string; show: boolean; value: string; onChange: (v: string) => void; placeholder: string }) {
  if (!show) return null;
  return (
    <input id={id} type="text" placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`mt-2 ${ic()}`} />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RFQContent() {
  const [step, setStep]         = useState(1);
  const [formData, setFormData] = useState<RFQData>(INITIAL);
  const [phoneCountry, setPhoneCountry] = useState("us");
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [status, setStatus]     = useState<Status>("idle");
  const [clipboardCopied, setClipboardCopied] = useState(false);
  const formRef  = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rfq_wizard_draft");
      if (saved) setFormData(JSON.parse(saved) as RFQData);
    } catch { /* ignore */ }
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    if (!hasMounted.current) return;
    const t = setTimeout(() => {
      try { localStorage.setItem("rfq_wizard_draft", JSON.stringify(formData)); } catch { /* ignore */ }
    }, 500);
    return () => clearTimeout(t);
  }, [formData]);

  function scrollToForm() {
    if (!formRef.current) return;
    const y = formRef.current.getBoundingClientRect().top + window.scrollY - 176;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }

  function set(field: keyof RFQData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    set(e.target.name as keyof RFQData, e.target.value);
  }

  function toggleCategory(cat: string) {
    setFormData(prev => ({ ...prev, ...SPEC_RESET, category: cat, productType: "", productTypeOther: "" }));
    setErrors({});
  }

  function handleProductTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFormData(prev => ({ ...prev, ...SPEC_RESET, productType: e.target.value, productTypeOther: "" }));
    if (errors.productType) setErrors(prev => ({ ...prev, productType: "" }));
  }

  function toggleCert(cert: string) {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert],
    }));
  }

  function toggleFinish(finish: string) {
    setFormData(prev => ({
      ...prev,
      finishing: prev.finishing.includes(finish)
        ? prev.finishing.filter(f => f !== finish)
        : [...prev.finishing, finish],
    }));
  }

  function toggleSize(size: string) {
    setFormData(prev => ({
      ...prev,
      sizeRange: prev.sizeRange.includes(size)
        ? prev.sizeRange.filter(s => s !== size)
        : [...prev.sizeRange, size],
    }));
  }

  function toggleEmbellishment(val: string) {
    setFormData(prev => ({
      ...prev,
      embellishments: prev.embellishments.includes(val)
        ? prev.embellishments.filter(e => e !== val)
        : [...prev.embellishments, val],
    }));
  }

  function toggleAccessory(val: string) {
    setFormData(prev => ({
      ...prev,
      accessories: prev.accessories.includes(val)
        ? prev.accessories.filter(a => a !== val)
        : [...prev.accessories, val],
    }));
  }

  // ── Validation ────────────────────────────────────────────────────────────

  function validateStep1(): boolean {
    const e: Record<string, string> = {};
    if (!formData.category) e.category = "Please select a product category";
    if (formData.category && !formData.productType) e.productType = "Please select a product type";
    if (formData.productType === "Other / Multiple" && !formData.productTypeOther.trim())
      e.productTypeOther = "Please describe your product type";
    if (formData.productType && formData.productType !== "Other / Multiple" && !formData.weight.trim()) {
      const opts = getProductOptions(formData.productType);
      e.weight = `${opts?.weightLabel ?? "GSM"} is required`;
    }
    setErrors(e); focusFirstError(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    const e: Record<string, string> = {};
    if (!formData.quantity.trim()) e.quantity = "Quantity is required";
    else if (!/\d/.test(formData.quantity)) e.quantity = "Enter a numeric quantity (e.g. 5000)";
    if (formData.targetPrice && !/\d/.test(formData.targetPrice))
      e.targetPrice = "Enter a valid price (e.g. 3.50)";
    if (!formData.destinationCountry) e.destinationCountry = "Please select a destination country";
    if (!formData.deliveryDate) e.deliveryDate = "Required delivery date is required";
    else if (new Date(formData.deliveryDate) <= new Date()) e.deliveryDate = "Delivery date must be in the future";
    if (needsPort(formData.incoterm) && !formData.portOfDestination.trim())
      e.portOfDestination = "Port of destination is required for CIF / CFR";
    setErrors(e); focusFirstError(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3(): boolean {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Full name is required";
    if (!formData.position.trim()) e.position = "Position / job title is required";
    if (!formData.company.trim()) e.company = "Company name is required";
    if (!formData.email.trim()) e.email = "Business email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) e.email = "Enter a valid email address";
    const phoneErr = validatePhone(formData.phone, phoneCountry);
    if (phoneErr) e.phone = phoneErr;
    if (!formData.country) e.country = "Please select your country";
    setErrors(e); focusFirstError(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    const valid = step === 1 ? validateStep1() : step === 2 ? validateStep2() : step === 3 ? validateStep3() : true;
    if (valid) { setErrors({}); setStep(s => s + 1); scrollToForm(); }
  }

  function handleBack() {
    setErrors({}); setStep(s => s - 1); scrollToForm();
  }

  async function handleSubmit() {
    const body = buildEmailBody(formData);
    const subject = `[RFQ] ${formData.category} - ${formData.productType} - ${formData.company}`;

    // Copy full body to clipboard before opening mailto.
    // Mobile email apps silently truncate long mailto URLs — clipboard is the reliable fallback.
    let copied = false;
    try {
      await navigator.clipboard.writeText(body);
      copied = true;
    } catch {
      // Clipboard API blocked or unavailable — mailto still fires, no action needed
    }

    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try { localStorage.removeItem("rfq_wizard_draft"); } catch { /* ignore */ }
    setClipboardCopied(copied);
    setStatus("sent");
    scrollToForm();
  }

  // ── Back button ───────────────────────────────────────────────────────────

  function BackBtn({ className = "" }: { className?: string }) {
    if (step === 1) return null;
    return (
      <button type="button" onClick={handleBack}
        className={`inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:border-gray-300 hover:text-navy-900 transition-colors ${className}`}>
        ← Back
      </button>
    );
  }

  // ── Step 1 ────────────────────────────────────────────────────────────────

  function renderStep1() {
    const opts = formData.productType ? getProductOptions(formData.productType) : null;
    const productTypes = getProductTypes(formData.category);
    const fiberOptions =
      formData.category === "Apparel" ? FIBER_CONTENT_APPAREL :
      formData.category === "Home Textiles" ? FIBER_CONTENT_HT : FIBER_CONTENT_FABRIC;

    const finishingOpts = opts ? [...opts.finishingOptions, "Other (specify below)"] : [];

    const isTerrySelected = formData.construction !== "" && /terry|velour/i.test(formData.construction);
    const shouldShowWarpWeft = !!(opts?.showWarpWeft && (
      opts.isFabricRoll
        ? formData.construction === "Woven"
        : !opts.showPileGround || !isTerrySelected
    ));
    const shouldShowPileGround = !!(opts?.showPileGround && (
      opts.isFabricRoll
        ? formData.construction === "Terry"
        : !opts.showWarpWeft || isTerrySelected
    ));

    return (
      <motion.div key="step1" {...stepAnim}>
        <div className="flex items-center justify-between mb-5">
          <SectionLabel>Step 1 — Product Requirements</SectionLabel>
          <BackBtn />
        </div>
        <div className="space-y-4">

          {/* Category */}
          <SpecSection title="Product Category">
            <div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "Apparel", icon: <IconApparel /> },
                  { id: "Home Textiles", icon: <IconHomeTextile /> },
                  { id: "Fabric", icon: <IconFabric /> },
                ].map(({ id, icon }) => (
                  <button key={id} type="button" onClick={() => toggleCategory(id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
                      formData.category === id ? "border-gold bg-gold/5 text-navy-900"
                      : errors.category ? "border-red-300 hover:border-red-400 text-gray-500"
                      : "border-gray-200 hover:border-gray-300 text-gray-500"
                    }`}>
                    <span className={formData.category === id ? "text-gold" : "text-gray-400"}>{icon}</span>
                    <span className="text-xs font-semibold leading-tight">{id}</span>
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1" role="alert">
                  <span aria-hidden="true">↑</span> {errors.category}
                </p>
              )}
            </div>

            {formData.category && (
              <Field id="productType" label="Product Type" required error={errors.productType}>
                <select id="productType" name="productType" aria-invalid={!!errors.productType}
                  value={formData.productType} onChange={handleProductTypeChange} className={ic(errors.productType)}>
                  <option value="">Select product type…</option>
                  {productTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
            )}

            {formData.productType === "Other / Multiple" && (
              <Field id="productTypeOther" label="Please describe your product(s)" required error={errors.productTypeOther}>
                <input id="productTypeOther" name="productTypeOther" type="text" required
                  aria-invalid={!!errors.productTypeOther}
                  placeholder="e.g. Compression sportswear, cycling jerseys"
                  value={formData.productTypeOther} onChange={handleChange} className={ic(errors.productTypeOther)} />
              </Field>
            )}
          </SpecSection>

          {formData.productType && (
            <>
              {/* Composition */}
              <SpecSection title="Composition">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Field id="fiberContent" label="Fiber Content">
                      <select id="fiberContent" name="fiberContent"
                        value={formData.fiberContent} onChange={handleChange} className={ic()}>
                        <option value="">Select fiber…</option>
                        {fiberOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <OtherInput id="fiberContentOther" show={formData.fiberContent === "Other"}
                      value={formData.fiberContentOther} onChange={v => set("fiberContentOther", v)}
                      placeholder="Specify fiber content (e.g. Bamboo-Linen blend)" />
                  </div>
                  {formData.category === "Apparel" && (
                    <div>
                      <Field id="yarnType" label="Yarn Type">
                        <select id="yarnType" name="yarnType"
                          value={formData.yarnType} onChange={handleChange} className={ic()}>
                          <option value="">Select…</option>
                          {YARN_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                      <OtherInput id="yarnTypeOther" show={formData.yarnType === "Other"}
                        value={formData.yarnTypeOther} onChange={v => set("yarnTypeOther", v)}
                        placeholder="Specify yarn type" />
                    </div>
                  )}
                  {opts?.isFabricRoll && (
                    <Field id="sustainability" label="Sustainability Requirement">
                      <select id="sustainability" name="sustainability"
                        value={formData.sustainability} onChange={handleChange} className={ic()}>
                        <option value="">Select…</option>
                        {SUSTAINABILITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                  )}
                </div>
                <Field id="compositionNotes" label="Composition Notes">
                  <input id="compositionNotes" name="compositionNotes" type="text"
                    placeholder="e.g. 100% ring spun combed cotton"
                    value={formData.compositionNotes} onChange={handleChange} className={ic()} />
                </Field>
              </SpecSection>

              {/* Construction & Weight */}
              {opts && (
                <SpecSection title={opts.isFabricRoll ? "Construction & Width" : "Construction & Weight"}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Field id="construction" label={opts.constructionLabel}>
                        <select id="construction" name="construction"
                          value={formData.construction} onChange={handleChange} className={ic()}>
                          <option value="">Select…</option>
                          {opts.constructionOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                      {formData.construction === "Other" && (
                        <input type="text" placeholder={opts.constructionOtherPlaceholder}
                          value={formData.constructionOther} onChange={e => set("constructionOther", e.target.value)}
                          className={`mt-2 ${ic()}`} />
                      )}
                    </div>
                    <Field id="weight" label={opts.weightLabel} required error={errors.weight}>
                      <input id="weight" name="weight" type="text"
                        aria-invalid={!!errors.weight}
                        placeholder={opts.weightPlaceholder}
                        value={formData.weight} onChange={handleChange} className={ic(errors.weight)} />
                    </Field>
                  </div>
                  {/* Fabric sub-type */}
                  {opts.isFabricRoll && formData.construction === "Knitted" && (
                    <div>
                      <Field id="fabricSubType" label="Knit Type">
                        <select id="fabricSubType" name="fabricSubType"
                          value={formData.fabricSubType} onChange={handleChange} className={ic()}>
                          <option value="">Select…</option>
                          {KNIT_TYPES_FABRIC.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                      <OtherInput id="fabricSubTypeOther" show={formData.fabricSubType === "Other"}
                        value={formData.fabricSubTypeOther} onChange={v => set("fabricSubTypeOther", v)}
                        placeholder="Specify knit type" />
                    </div>
                  )}
                  {opts.isFabricRoll && formData.construction === "Woven" && (
                    <div>
                      <Field id="fabricSubType" label="Woven Type">
                        <select id="fabricSubType" name="fabricSubType"
                          value={formData.fabricSubType} onChange={handleChange} className={ic()}>
                          <option value="">Select…</option>
                          {WOVEN_TYPES_FABRIC.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                      <OtherInput id="fabricSubTypeOther" show={formData.fabricSubType === "Other"}
                        value={formData.fabricSubTypeOther} onChange={v => set("fabricSubTypeOther", v)}
                        placeholder="Specify woven type" />
                    </div>
                  )}
                  {opts.isFabricRoll && (
                    <div>
                      <Field id="sizeRange0" label="Fabric Width">
                        <select id="sizeRange0"
                          value={formData.sizeRange[0] ?? ""}
                          onChange={e => setFormData(p => ({ ...p, sizeRange: e.target.value ? [e.target.value] : [] }))}
                          className={ic()}>
                          <option value="">Select width…</option>
                          {FABRIC_WIDTHS_FABRIC.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                      <OtherInput id="fabricWidthCustom" show={formData.sizeRange[0] === "Custom"}
                        value={formData.sizeRangeNotes} onChange={v => set("sizeRangeNotes", v)}
                        placeholder={'e.g. 64" / 163 cm usable width'} />
                    </div>
                  )}
                </SpecSection>
              )}

              {/* Warp & Weft yarn specification */}
              {shouldShowWarpWeft && (
                <SpecSection title="Yarn Specification — Warp &amp; Weft">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="warpYarn" label="Warp Yarn">
                      <input id="warpYarn" name="warpYarn" type="text"
                        placeholder="e.g. 30/1 Ne Ring Spun Cotton"
                        value={formData.warpYarn} onChange={handleChange} className={ic()} />
                    </Field>
                    <Field id="weftYarn" label="Weft Yarn">
                      <input id="weftYarn" name="weftYarn" type="text"
                        placeholder="e.g. 20/1 OE Cotton"
                        value={formData.weftYarn} onChange={handleChange} className={ic()} />
                    </Field>
                  </div>
                  <Field id="picksPerCm" label="Picks per cm / Thread Density">
                    <input id="picksPerCm" name="picksPerCm" type="text"
                      placeholder="e.g. Warp 40 × Weft 30 per cm"
                      value={formData.picksPerCm} onChange={handleChange} className={ic()} />
                  </Field>
                </SpecSection>
              )}

              {/* Pile & Ground yarn specification */}
              {shouldShowPileGround && (
                <SpecSection title="Yarn Specification — Pile &amp; Ground">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="pileYarn" label="Pile Yarn">
                      <input id="pileYarn" name="pileYarn" type="text"
                        placeholder="e.g. 16/1 Ne Ring Spun Cotton"
                        value={formData.pileYarn} onChange={handleChange} className={ic()} />
                    </Field>
                    <Field id="groundYarn" label="Ground Yarn">
                      <input id="groundYarn" name="groundYarn" type="text"
                        placeholder="e.g. 20/1 Ne Ring Spun Cotton"
                        value={formData.groundYarn} onChange={handleChange} className={ic()} />
                    </Field>
                  </div>
                  <Field id="picksPerCm" label="Picks per cm / Loop Density">
                    <input id="picksPerCm" name="picksPerCm" type="text"
                      placeholder="e.g. 8 pile rows per cm"
                      value={formData.picksPerCm} onChange={handleChange} className={ic()} />
                  </Field>
                </SpecSection>
              )}

              {/* Dimensions — apparel & HT */}
              {opts && !opts.isFabricRoll && (
                <SpecSection title="Dimensions & Sizing">
                  {/* Multi-select sizes */}
                  <div>
                    <p className="text-sm font-medium text-navy-900 mb-2">
                      {opts.sizeLabel} <span className="text-gray-400 font-normal text-xs">(select all that apply)</span>
                    </p>
                    <CheckboxGrid options={opts.sizeOptions} selected={formData.sizeRange} onToggle={toggleSize} />
                    {formData.sizeRange.includes("Custom") && (
                      <input type="text" placeholder="Describe your custom size requirement"
                        value={formData.sizeRangeNotes} onChange={e => set("sizeRangeNotes", e.target.value)}
                        className={`mt-3 ${ic()}`} />
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {opts.showFitType && (
                      <Field id="fitType" label="Fit">
                        <select id="fitType" name="fitType"
                          value={formData.fitType} onChange={handleChange} className={ic()}>
                          <option value="">Select…</option>
                          {opts.fitOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                    )}
                    {opts.styleOptions.length > 0 && (
                      <div>
                        <Field id="style" label={opts.styleLabel}>
                          <select id="style" name="style"
                            value={formData.style} onChange={handleChange} className={ic()}>
                            <option value="">Select…</option>
                            {opts.styleOptions.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <OtherInput id="styleOther" show={formData.style === "Other"}
                          value={formData.styleOther} onChange={v => set("styleOther", v)}
                          placeholder={`Specify ${opts.styleLabel.toLowerCase()}`} />
                      </div>
                    )}
                    {opts.showSizeStandard && (
                      <div>
                        <Field id="sizeStandard" label="Size Standard">
                          <select id="sizeStandard" name="sizeStandard"
                            value={formData.sizeStandard} onChange={handleChange} className={ic()}>
                            <option value="">Select…</option>
                            {SIZE_STANDARDS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <OtherInput id="sizeStandardOther" show={formData.sizeStandard === "Custom"}
                          value={formData.sizeStandardOther} onChange={v => set("sizeStandardOther", v)}
                          placeholder="Describe your custom size standard / size chart" />
                      </div>
                    )}
                    {opts.showCollarType && (
                      <div>
                        <Field id="collarType" label="Collar Type">
                          <select id="collarType" name="collarType"
                            value={formData.collarType} onChange={handleChange} className={ic()}>
                            <option value="">Select…</option>
                            {opts.collarOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <OtherInput id="collarTypeOther" show={formData.collarType === "Other"}
                          value={formData.collarTypeOther} onChange={v => set("collarTypeOther", v)}
                          placeholder="Specify collar type" />
                      </div>
                    )}
                    {opts.showBackingType && (
                      <div>
                        <Field id="backingType" label="Backing">
                          <select id="backingType" name="backingType"
                            value={formData.backingType} onChange={handleChange} className={ic()}>
                            <option value="">Select…</option>
                            {opts.backingOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <OtherInput id="backingTypeOther" show={formData.backingType === "Other"}
                          value={formData.backingTypeOther} onChange={v => set("backingTypeOther", v)}
                          placeholder="Specify backing type" />
                      </div>
                    )}
                    {opts.showClosureType && (
                      <div>
                        <Field id="closureType" label="Closure Type">
                          <select id="closureType" name="closureType"
                            value={formData.closureType} onChange={handleChange} className={ic()}>
                            <option value="">Select…</option>
                            {opts.closureOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <OtherInput id="closureTypeOther" show={formData.closureType === "Other"}
                          value={formData.closureTypeOther} onChange={v => set("closureTypeOther", v)}
                          placeholder="Specify closure type" />
                      </div>
                    )}
                    {opts.showPocketDepth && (
                      <Field id="pocketDepth" label="Pocket Depth">
                        <select id="pocketDepth" name="pocketDepth"
                          value={formData.pocketDepth} onChange={handleChange} className={ic()}>
                          <option value="">Select…</option>
                          {opts.pocketDepthOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                    )}
                    {opts.showHeadingType && (
                      <div>
                        <Field id="headingType" label="Heading Type">
                          <select id="headingType" name="headingType"
                            value={formData.headingType} onChange={handleChange} className={ic()}>
                            <option value="">Select…</option>
                            {opts.headingOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <OtherInput id="headingTypeOther" show={formData.headingType === "Other"}
                          value={formData.headingTypeOther} onChange={v => set("headingTypeOther", v)}
                          placeholder="Specify heading type" />
                      </div>
                    )}
                    {opts.showLiningType && (
                      <div>
                        <Field id="liningType" label="Lining">
                          <select id="liningType" name="liningType"
                            value={formData.liningType} onChange={handleChange} className={ic()}>
                            <option value="">Select…</option>
                            {opts.liningOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <OtherInput id="liningTypeOther" show={formData.liningType === "Other"}
                          value={formData.liningTypeOther} onChange={v => set("liningTypeOther", v)}
                          placeholder="Specify lining type" />
                      </div>
                    )}
                    {opts.showHeatingRating && (
                      <Field id="heatRating" label="Heat Rating">
                        <select id="heatRating" name="heatRating"
                          value={formData.heatRating} onChange={handleChange} className={ic()}>
                          <option value="">Select…</option>
                          {opts.heatingOptions!.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                    )}
                    {opts.showBorderField && (
                      <div>
                        <Field id="borderType" label="Border / Selvedge">
                          <select id="borderType" name="borderType"
                            value={formData.borderType} onChange={handleChange} className={ic()}>
                            <option value="">Select…</option>
                            {BORDER_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <OtherInput id="borderTypeOther" show={formData.borderType === "Other"}
                          value={formData.borderTypeOther} onChange={v => set("borderTypeOther", v)}
                          placeholder="Specify border / selvedge type" />
                      </div>
                    )}
                  </div>
                </SpecSection>
              )}

              {/* Color & Design */}
              {opts && !opts.isFabricRoll && (
                <SpecSection title="Color & Design">
                  {formData.category === "Apparel" && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field id="dyeingMethod" label="Dyeing Method">
                        <select id="dyeingMethod" name="dyeingMethod"
                          value={formData.dyeingMethod} onChange={handleChange} className={ic()}>
                          <option value="">Select…</option>
                          {DYEING_METHODS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                      <Field id="numberOfColors" label="Number of Colors">
                        <select id="numberOfColors" name="numberOfColors"
                          value={formData.numberOfColors} onChange={handleChange} className={ic()}>
                          <option value="">Select…</option>
                          {NUMBER_OF_COLORS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="printType" label={opts.designLabel}>
                      <select id="printType" name="printType"
                        value={formData.printType} onChange={handleChange} className={ic()}>
                        <option value="">Select…</option>
                        {opts.printTypeOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field id="printPlacement" label={opts.printPlacementLabel}>
                      <select id="printPlacement" name="printPlacement"
                        value={formData.printPlacement} onChange={handleChange} className={ic()}>
                        <option value="">Select…</option>
                        {opts.printPlacementOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field id="pantoneRef" label="Pantone / Color Reference">
                    <input id="pantoneRef" name="pantoneRef" type="text"
                      placeholder="e.g. PMS 286C or describe colors"
                      value={formData.pantoneRef} onChange={handleChange} className={ic()} />
                  </Field>
                  <Field id="printDetail" label="Print / Design Detail">
                    <input id="printDetail" name="printDetail" type="text"
                      placeholder="e.g. Brand logo, 8×4 cm, 2 spot colors"
                      value={formData.printDetail} onChange={handleChange} className={ic()} />
                  </Field>
                </SpecSection>
              )}

              {/* Fabric state & design */}
              {opts?.isFabricRoll && (
                <SpecSection title="State & Design">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="printType" label="Fabric State">
                      <select id="printType" name="printType"
                        value={formData.printType} onChange={handleChange} className={ic()}>
                        <option value="">Select…</option>
                        {FABRIC_STATES.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field id="fabricState" label="Pattern / Color Type">
                      <select id="fabricState" name="fabricState"
                        value={formData.fabricState} onChange={handleChange} className={ic()}>
                        <option value="">Select…</option>
                        {opts.printPlacementOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field id="pantoneRef" label="Pantone / Color Reference">
                    <input id="pantoneRef" name="pantoneRef" type="text"
                      placeholder="e.g. PMS 286C or describe colors"
                      value={formData.pantoneRef} onChange={handleChange} className={ic()} />
                  </Field>
                  <Field id="colorFastnessNotes" label="Color Fastness Notes">
                    <input id="colorFastnessNotes" name="colorFastnessNotes" type="text"
                      placeholder="e.g. ISO 105-C06 grade 4 minimum"
                      value={formData.colorFastnessNotes} onChange={handleChange} className={ic()} />
                  </Field>
                </SpecSection>
              )}

              {/* Embellishments & Accessories — apparel only */}
              {formData.category === "Apparel" && opts?.embellishmentOptions && opts.embellishmentOptions.length > 0 && (
                <SpecSection title="Embellishments &amp; Accessories / Trims">
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-medium text-navy-900 mb-2">
                        Embellishments <span className="text-gray-400 font-normal text-xs">(select all that apply)</span>
                      </p>
                      <CheckboxGrid
                        options={opts.embellishmentOptions}
                        selected={formData.embellishments}
                        onToggle={toggleEmbellishment}
                      />
                      {formData.embellishments.includes("Other") && (
                        <input type="text" placeholder="Describe other embellishment"
                          value={formData.embellishmentsOther} onChange={e => set("embellishmentsOther", e.target.value)}
                          className={`mt-3 ${ic()}`} />
                      )}
                    </div>
                    {opts.accessoryOptions && opts.accessoryOptions.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-navy-900 mb-2">
                          Accessories &amp; Trims <span className="text-gray-400 font-normal text-xs">(select all that apply)</span>
                        </p>
                        <CheckboxGrid
                          options={opts.accessoryOptions}
                          selected={formData.accessories}
                          onToggle={toggleAccessory}
                        />
                        {formData.accessories.includes("Other") && (
                          <input type="text" placeholder="Describe other accessories / trims"
                            value={formData.accessoriesOther} onChange={e => set("accessoriesOther", e.target.value)}
                            className={`mt-3 ${ic()}`} />
                        )}
                      </div>
                    )}
                  </div>
                </SpecSection>
              )}

              {/* Finishing */}
              {opts && (
                <SpecSection title="Finishing">
                  <p className="text-xs text-gray-500 mb-3">Select all that apply</p>
                  <CheckboxGrid options={finishingOpts} selected={formData.finishing} onToggle={toggleFinish} />
                  {formData.finishing.includes("Other (specify below)") && (
                    <input type="text" placeholder="Describe other finishing requirement"
                      value={formData.finishingOther} onChange={e => set("finishingOther", e.target.value)}
                      className={`mt-3 ${ic()}`} />
                  )}
                </SpecSection>
              )}

              {/* Labels — apparel only */}
              {formData.category === "Apparel" && (
                <SpecSection title="Labels & Branding">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="brandLabel" label="Brand Label">
                      <select id="brandLabel" name="brandLabel"
                        value={formData.brandLabel} onChange={handleChange} className={ic()}>
                        <option value="">Select…</option>
                        {BRAND_LABELS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field id="careLabel" label="Care Label">
                      <select id="careLabel" name="careLabel"
                        value={formData.careLabel} onChange={handleChange} className={ic()}>
                        <option value="">Select…</option>
                        {CARE_LABELS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field id="stitchType" label="Stitch Type">
                      <select id="stitchType" name="stitchType"
                        value={formData.stitchType} onChange={handleChange} className={ic()}>
                        <option value="">Select…</option>
                        {STITCH_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field id="labelNotes" label="Label Placement / Artwork Notes">
                    <input id="labelNotes" name="labelNotes" type="text"
                      placeholder="e.g. Neck label, buyer-supplied artwork PDF"
                      value={formData.labelNotes} onChange={handleChange} className={ic()} />
                  </Field>
                </SpecSection>
              )}

              {/* Packing */}
              {opts && (
                <SpecSection title="Packing">
                  {opts.isFabricRoll ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Field id="rollLength" label="Roll Length">
                          <select id="rollLength" name="rollLength"
                            value={formData.rollLength} onChange={handleChange} className={ic()}>
                            <option value="">Select…</option>
                            {ROLL_LENGTHS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <OtherInput id="rollLengthOther" show={formData.rollLength.startsWith("Custom")}
                          value={formData.rollLengthOther} onChange={v => set("rollLengthOther", v)}
                          placeholder="e.g. 120m per roll" />
                      </div>
                      <Field id="rollCore" label="Roll Core">
                        <select id="rollCore" name="rollCore"
                          value={formData.rollCore} onChange={handleChange} className={ic()}>
                          <option value="">Select…</option>
                          {ROLL_CORES.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                      <Field id="rollNotes" label="Roll Packing Notes">
                        <input id="rollNotes" name="rollNotes" type="text"
                          placeholder="e.g. Polybag per roll, 50 rolls per pallet"
                          value={formData.rollNotes} onChange={handleChange} className={ic()} />
                      </Field>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field id="individualPack" label="Individual Pack">
                          <select id="individualPack" name="individualPack"
                            value={formData.individualPack} onChange={handleChange} className={ic()}>
                            <option value="">Select…</option>
                            {opts.individualPackOptions.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        <Field id="setComposition" label="Set Composition">
                          <select id="setComposition" name="setComposition"
                            value={formData.setComposition} onChange={handleChange} className={ic()}>
                            <option value="">Select…</option>
                            {opts.setCompositionOptions.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </Field>
                        {formData.category === "Apparel" && (
                          <div>
                            <Field id="masterCarton" label="Master Carton">
                              <select id="masterCarton" name="masterCarton"
                                value={formData.masterCarton} onChange={handleChange} className={ic()}>
                                <option value="">Select…</option>
                                {MASTER_CARTONS.map(o => <option key={o} value={o}>{o}</option>)}
                              </select>
                            </Field>
                            <OtherInput id="masterCartonOther" show={formData.masterCarton.startsWith("Custom")}
                              value={formData.masterCartonOther} onChange={v => set("masterCartonOther", v)}
                              placeholder="e.g. 30 pcs per carton, max 18 kg gross" />
                          </div>
                        )}
                      </div>
                      <Field id="packingNotes" label="Packing Notes">
                        <input id="packingNotes" name="packingNotes" type="text"
                          placeholder="e.g. Retail-ready, buyer barcodes required"
                          value={formData.packingNotes} onChange={handleChange} className={ic()} />
                      </Field>
                    </div>
                  )}
                </SpecSection>
              )}

              {/* Certifications */}
              {opts && (
                <SpecSection title="Certifications Required">
                  <p className="text-xs text-gray-500 mb-3">Select all that apply</p>
                  <CheckboxGrid options={opts.certifications} selected={formData.certifications} onToggle={toggleCert} />
                  {formData.certifications.includes("Other (specify below)") && (
                    <input type="text" placeholder="e.g. USDA Organic, Fairtrade, Responsible Down Standard"
                      value={formData.certOther} onChange={e => set("certOther", e.target.value)}
                      className={`mt-3 ${ic()}`} />
                  )}
                </SpecSection>
              )}
            </>
          )}
        </div>
      </motion.div>
    );
  }

  // ── Step 2 ────────────────────────────────────────────────────────────────

  function renderStep2() {
    const opts = formData.productType ? getProductOptions(formData.productType) : null;
    const uomOptions = opts?.unitOfMeasure ?? ["Pieces", "Dozens", "Sets", "Meters", "Kg"];
    return (
      <motion.div key="step2" {...stepAnim}>
        <div className="flex items-center justify-between mb-5">
          <SectionLabel>Step 2 — Commercial &amp; Logistics</SectionLabel>
          <BackBtn />
        </div>
        <div className="space-y-4">
          <SpecSection title="Order Details">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Field id="quantity" label="Quantity" required error={errors.quantity}>
                  <input id="quantity" name="quantity" type="text" required aria-invalid={!!errors.quantity}
                    placeholder="e.g. 5000"
                    value={formData.quantity} onChange={handleChange} className={ic(errors.quantity)} />
                </Field>
              </div>
              <Field id="unitOfMeasure" label="Unit">
                <select id="unitOfMeasure" name="unitOfMeasure"
                  value={formData.unitOfMeasure} onChange={handleChange} className={ic()}>
                  <option value="">Unit…</option>
                  {uomOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            </div>
            <Field id="targetPrice" label="Target Price per Unit (USD)" error={errors.targetPrice}>
              <input id="targetPrice" name="targetPrice" type="text"
                placeholder="e.g. 3.50 (leave blank to discuss)"
                value={formData.targetPrice} onChange={handleChange} className={ic(errors.targetPrice)} />
            </Field>
          </SpecSection>
          <SpecSection title="Logistics & Timeline">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field id="destinationCountry" label="Destination Country" required error={errors.destinationCountry}>
                <select id="destinationCountry" name="destinationCountry" required aria-invalid={!!errors.destinationCountry}
                  value={formData.destinationCountry} onChange={handleChange} className={ic(errors.destinationCountry)}>
                  <option value="">Select country…</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field id="incoterm" label="Incoterm">
                <select id="incoterm" name="incoterm"
                  value={formData.incoterm} onChange={handleChange} className={ic()}>
                  <option value="">Select…</option>
                  {INCOTERMS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              {needsPort(formData.incoterm) && (
                <Field id="portOfDestination" label="Port of Destination" required error={errors.portOfDestination}>
                  <input id="portOfDestination" name="portOfDestination" type="text" required aria-invalid={!!errors.portOfDestination}
                    placeholder="e.g. Port of Los Angeles"
                    value={formData.portOfDestination} onChange={handleChange} className={ic(errors.portOfDestination)} />
                </Field>
              )}
              <Field id="deliveryDate" label="Required Delivery Date" required error={errors.deliveryDate}>
                <input id="deliveryDate" name="deliveryDate" type="date" required aria-invalid={!!errors.deliveryDate}
                  value={formData.deliveryDate} onChange={handleChange} className={ic(errors.deliveryDate)} />
              </Field>
            </div>
          </SpecSection>
          <SpecSection title="Additional Notes">
            <Field id="notes" label="Notes / Special Requirements">
              <textarea id="notes" name="notes" rows={4}
                placeholder="Tech pack reference, special requirements, or any other relevant details"
                value={formData.notes} onChange={handleChange}
                className={`${ic()} resize-none`} />
            </Field>
          </SpecSection>
        </div>
      </motion.div>
    );
  }

  // ── Step 3 ────────────────────────────────────────────────────────────────

  function renderStep3() {
    return (
      <motion.div key="step3" {...stepAnim}>
        <div className="flex items-center justify-between mb-5">
          <SectionLabel>Step 3 — Your Details</SectionLabel>
          <BackBtn />
        </div>
        <div className="space-y-4">
          <SpecSection title="Contact Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field id="name" label="Full Name" required error={errors.name}>
                <input id="name" name="name" type="text" required autoComplete="name"
                  aria-invalid={!!errors.name} placeholder="Jane Smith"
                  value={formData.name} onChange={handleChange} className={ic(errors.name)} />
              </Field>
              <Field id="position" label="Position / Job Title" required error={errors.position}>
                <input id="position" name="position" type="text" required
                  aria-invalid={!!errors.position} placeholder="Procurement Manager"
                  value={formData.position} onChange={handleChange} className={ic(errors.position)} />
              </Field>
            </div>
            <Field id="company" label="Company Name" required error={errors.company}>
              <input id="company" name="company" type="text" required autoComplete="organization"
                aria-invalid={!!errors.company} placeholder="Acme Retail Ltd."
                value={formData.company} onChange={handleChange} className={ic(errors.company)} />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field id="email" label="Business Email" required error={errors.email}>
                <input id="email" name="email" type="email" required autoComplete="email"
                  aria-invalid={!!errors.email} placeholder="jane@acmeretail.com"
                  value={formData.email} onChange={handleChange} className={ic(errors.email)} />
              </Field>
              <PhoneInputField
                id="phone"
                label="Phone Number"
                required
                value={formData.phone}
                countryIso2={phoneCountry}
                onChange={(e164, iso2) => {
                  setFormData((prev) => ({ ...prev, phone: e164 }));
                  setPhoneCountry(iso2);
                }}
                error={errors.phone}
                onClearError={() =>
                  setErrors((prev) => ({ ...prev, phone: "" }))
                }
                disabledStyle
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field id="country" label="Country" required error={errors.country}>
                <select id="country" name="country" required aria-invalid={!!errors.country}
                  value={formData.country} onChange={handleChange} className={ic(errors.country)}>
                  <option value="">Select your country…</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field id="howHear" label="How Did You Hear About Us">
                <select id="howHear" name="howHear"
                  value={formData.howHear} onChange={handleChange} className={ic()}>
                  <option value="">Select…</option>
                  {HOW_HEAR_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            </div>
          </SpecSection>
        </div>
      </motion.div>
    );
  }

  // ── Step 4 ────────────────────────────────────────────────────────────────

  function renderStep4() {
    const f = formData;
    const opts = f.productType ? getProductOptions(f.productType) : null;
    const productDisplay = f.productType === "Other / Multiple" && f.productTypeOther
      ? `${f.productType} — ${f.productTypeOther}` : f.productType;
    const certDisplay = f.certifications.length > 0
      ? (f.certOther ? [...f.certifications.filter(c => c !== "Other (specify below)"), `Other: ${f.certOther}`].join(", ") : f.certifications.join(", "))
      : "—";
    const sizeDisplay = f.sizeRange.length > 0
      ? (f.sizeRangeNotes ? `${f.sizeRange.join(", ")} (${f.sizeRangeNotes})` : f.sizeRange.join(", "))
      : "—";
    const finishDisplay = (() => {
      const arr = f.finishing.includes("Other (specify below)") && f.finishingOther
        ? [...f.finishing.filter(x => x !== "Other (specify below)"), `Other: ${f.finishingOther}`]
        : f.finishing;
      return arr.length > 0 ? arr.join(", ") : "—";
    })();
    const styleDisplay = f.style === "Other" && f.styleOther ? `Other — ${f.styleOther}` : f.style;
    const constrDisplay = f.construction === "Other" && f.constructionOther ? `Other — ${f.constructionOther}` : f.construction;
    const embReviewDisplay = (() => {
      const arr = f.embellishments.includes("Other") && f.embellishmentsOther
        ? [...f.embellishments.filter(x => x !== "Other"), `Other: ${f.embellishmentsOther}`]
        : f.embellishments;
      return arr.length > 0 ? arr.join(", ") : "";
    })();
    const accReviewDisplay = (() => {
      const arr = f.accessories.includes("Other") && f.accessoriesOther
        ? [...f.accessories.filter(x => x !== "Other"), `Other: ${f.accessoriesOther}`]
        : f.accessories;
      return arr.length > 0 ? arr.join(", ") : "";
    })();

    return (
      <motion.div key="step4" {...stepAnim}>
        <div className="flex items-center justify-between mb-5">
          <SectionLabel>Step 4 — Review &amp; Submit</SectionLabel>
          <BackBtn />
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-navy-900 font-semibold text-sm">1. Product Requirements</h3>
              <button type="button" onClick={() => { setStep(1); scrollToForm(); }} className="text-gold text-xs hover:underline">Edit</button>
            </div>
            <div className="bg-gray-50 rounded-xl px-5 py-1">
              <ReviewRow label="Category" value={f.category} />
              <ReviewRow label="Product Type" value={productDisplay} />
              <ReviewRow label="Certifications" value={certDisplay} />
              {f.fiberContent && <ReviewRow label="Fiber Content" value={f.fiberContent === "Other" ? `Other — ${f.fiberContentOther}` : f.fiberContent} />}
              {f.construction && <ReviewRow label={opts?.constructionLabel ?? "Construction"} value={constrDisplay} />}
              {f.weight && <ReviewRow label={opts?.weightLabel ?? "Weight"} value={f.weight} />}
              {f.sizeRange.length > 0 && <ReviewRow label={opts?.sizeLabel ?? "Size"} value={sizeDisplay} />}
              {styleDisplay && <ReviewRow label={opts?.styleLabel ?? "Style"} value={styleDisplay} />}
              {f.fitType && <ReviewRow label="Fit" value={f.fitType} />}
              {f.warpYarn && <ReviewRow label="Warp Yarn" value={f.warpYarn} />}
              {f.weftYarn && <ReviewRow label="Weft Yarn" value={f.weftYarn} />}
              {f.pileYarn && <ReviewRow label="Pile Yarn" value={f.pileYarn} />}
              {f.groundYarn && <ReviewRow label="Ground Yarn" value={f.groundYarn} />}
              {f.picksPerCm && <ReviewRow label="Picks / Density" value={f.picksPerCm} />}
              {f.printType && <ReviewRow label={opts?.designLabel ?? "Print"} value={f.printType} />}
              {embReviewDisplay && <ReviewRow label="Embellishments" value={embReviewDisplay} />}
              {accReviewDisplay && <ReviewRow label="Accessories / Trims" value={accReviewDisplay} />}
              {f.finishing.length > 0 && <ReviewRow label="Finishing" value={finishDisplay} />}
              {f.individualPack && <ReviewRow label="Individual Pack" value={f.individualPack} />}
              {f.rollLength && <ReviewRow label="Roll Length" value={f.rollLength.startsWith("Custom") && f.rollLengthOther ? `Custom — ${f.rollLengthOther}` : f.rollLength} />}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-navy-900 font-semibold text-sm">2. Commercial &amp; Logistics</h3>
              <button type="button" onClick={() => { setStep(2); scrollToForm(); }} className="text-gold text-xs hover:underline">Edit</button>
            </div>
            <div className="bg-gray-50 rounded-xl px-5 py-1">
              <ReviewRow label="Quantity" value={f.quantity + (f.unitOfMeasure ? ` ${f.unitOfMeasure}` : "")} />
              <ReviewRow label="Target Price" value={f.targetPrice ? `USD ${f.targetPrice} per unit` : ""} />
              <ReviewRow label="Destination" value={f.destinationCountry} />
              <ReviewRow label="Incoterm" value={f.incoterm} />
              {needsPort(f.incoterm) && <ReviewRow label="Port of Destination" value={f.portOfDestination} />}
              <ReviewRow label="Required Delivery" value={f.deliveryDate} />
              {f.notes && <ReviewRow label="Notes" value={f.notes} />}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-navy-900 font-semibold text-sm">3. Your Details</h3>
              <button type="button" onClick={() => { setStep(3); scrollToForm(); }} className="text-gold text-xs hover:underline">Edit</button>
            </div>
            <div className="bg-gray-50 rounded-xl px-5 py-1">
              <ReviewRow label="Name" value={f.name} />
              <ReviewRow label="Position" value={f.position} />
              <ReviewRow label="Company" value={f.company} />
              <ReviewRow label="Email" value={f.email} />
              <ReviewRow label="Phone" value={f.phone} />
              <ReviewRow label="Country" value={f.country} />
              {f.howHear && <ReviewRow label="How Did You Hear" value={f.howHear} />}
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
            By clicking <strong>Submit RFQ</strong>, you confirm you have read and agreed to the{" "}
            <Link href="/termsofuse/" className="text-gold hover:underline font-medium" target="_blank" rel="noopener noreferrer">Terms of Use</Link>.
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Sent state ────────────────────────────────────────────────────────────

  if (status === "sent") {
    return (
      <>
        <PageHero
          image="/images/hero/hero-about.webp"
          imageAlt="MZ Global Trading — request a quote for B2B textile sourcing from Pakistan"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
          label="Request a Quote"
          title="Start Your" titleGold="Sourcing Request"
          description="Your email client has been opened with your RFQ pre-filled."
          pills={["Response Within 3–5 Business Days", "No Obligation", "All Categories"]}
        />
        <div className="bg-gray-50 py-20">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h2 className="text-navy-900 font-bold text-2xl mb-3">Almost done</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Your email app should now be open with your RFQ pre-filled and addressed to <strong>info@mzglobaltrading.com</strong>. Review it and click <strong>Send</strong> to submit.
              </p>

              {clipboardCopied && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm mb-4 text-left flex items-start gap-3">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  <div>
                    <p className="text-green-800 font-semibold">Full RFQ copied to clipboard</p>
                    <p className="text-green-700 text-xs mt-0.5">
                      If your email app shows incomplete content, click inside the email body and paste (<strong>Ctrl+V</strong> on Windows · <strong>⌘V</strong> on Mac · long-press &rarr; Paste on mobile).
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-gold/8 border border-gold/20 rounded-xl p-4 text-sm text-gray-700 mb-7 text-left">
                <strong className="text-navy-900">Email did not open?</strong> Compose an email to{" "}
                <a href={`mailto:${RECIPIENT}`} className="text-gold hover:underline font-medium">{RECIPIENT}</a> with your requirements, or{" "}
                <button type="button" onClick={() => { setStatus("idle"); setStep(4); scrollToForm(); }} className="text-gold hover:underline font-medium">go back and try again</button>.
              </div>
              <Link href="/" className="inline-flex items-center gap-2 px-7 py-3 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors">Back to Home</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────

  return (
    <>
      <PageHero
        image="/images/hero/hero-about.webp"
        imageAlt="MZ Global Trading — request a quote for B2B textile sourcing from Pakistan"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
        label="Request a Quote"
        title="Start Your" titleGold="Sourcing Request"
        description="Tell us what you need — product type, quantity, certifications, and timeline. We match your requirements with the right factory and respond within 3–5 business days."
        pills={["Response Within 3–5 Business Days", "No Obligation", "All Categories"]}
      />

      {/* Progress bar — sticky inside the form section so it never overlaps the hero */}
      <div ref={formRef} className="bg-gray-50">
        <div
          className="sticky left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm"
          style={{ top: 128, height: 48 }}
        >
          <div className="max-w-2xl mx-auto h-full px-4 sm:px-6 flex items-center">
            {STEPS.map((label, idx) => {
              const num = idx + 1;
              const done   = num < step;
              const active = num === step;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none min-w-0">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
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

        <div className="py-14 sm:py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-7 py-8 sm:px-10 sm:py-10">
              <AnimatePresence mode="wait">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
              </AnimatePresence>

              {step === 4 && (
                <p className="text-gray-400 text-xs text-center mt-8 pt-6 border-t border-gray-100">
                  By submitting you confirm you have read our{" "}
                  <Link href="/termsofuse/" className="underline underline-offset-2 hover:text-gold transition-colors">Terms of Use</Link>
                  {" "}and{" "}
                  <Link href="/privacypolicy/" className="underline underline-offset-2 hover:text-gold transition-colors">Privacy Policy</Link>
                  . Your details are used solely to process this enquiry.
                </p>
              )}
              <div className={`flex items-center mt-4 ${step === 4 ? "" : "mt-8 pt-6 border-t border-gray-100"} ${step > 1 ? "justify-between" : "justify-end"}`}>
                {step > 1 && (
                  <button type="button" onClick={handleBack}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:border-gray-300 hover:text-navy-900 transition-colors">
                    ← Back
                  </button>
                )}
                {step < 4 ? (
                  <button type="button" onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors">
                    Next →
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    Submit RFQ — Open Email
                  </button>
                )}
              </div>
            </div>
            <p className="text-center text-gray-400 text-xs mt-5">
              Step {step} of {STEPS.length} · Submitting opens your email app with all details pre-filled.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">After You Submit</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">What happens next?</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 relative">
            <div className="absolute top-7 left-[20%] right-[20%] h-0.5 bg-gray-100 hidden sm:block" aria-hidden="true" />
            {[
              { s: "01", title: "Requirements Review", time: "1–3 Business Days", body: "Our sourcing team reviews your submission and identifies suitable factories from our vetted network. We may reach out for clarification if required." },
              { s: "02", title: "Quotation",          time: "3–5 Business Days", body: "Once requirements are confirmed, we provide an initial quotation covering unit pricing, MOQ, lead times, and payment terms." },
              { s: "03", title: "Samples",            time: "Upon Confirmation",  body: "Pre-production samples are arranged once the quotation is accepted. Sample costs and courier charges are borne by the buyer and credited against the confirmed order." },
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
