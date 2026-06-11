// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductOptions {
  constructionLabel: string;
  constructionOptions: string[];
  constructionOtherPlaceholder: string;
  weightLabel: string;
  weightPlaceholder: string;
  sizeLabel: string;
  sizeOptions: string[];
  showFitType: boolean;
  fitOptions: string[];
  showSizeStandard: boolean;
  styleLabel: string;
  styleOptions: string[];
  designLabel: string;
  printTypeOptions: string[];
  printPlacementLabel: string;
  printPlacementOptions: string[];
  finishingOptions: string[];
  individualPackOptions: string[];
  setCompositionOptions: string[];
  unitOfMeasure: string[];
  certifications: string[];
  // Structural yarn fields
  showWarpWeft?: boolean;
  showPileGround?: boolean;
  // Embellishments & accessories (apparel)
  embellishmentOptions?: string[];
  accessoryOptions?: string[];
  // Conditional field flags
  isIhram?: boolean;
  isMedical?: boolean;
  isFabricRoll?: boolean;
  showBorderField?: boolean;
  showPocketDepth?: boolean;
  pocketDepthOptions?: string[];
  showClosureType?: boolean;
  closureOptions?: string[];
  showCollarType?: boolean;
  collarOptions?: string[];
  showHeatingRating?: boolean;
  heatingOptions?: string[];
  showBackingType?: boolean;
  backingOptions?: string[];
  showHeadingType?: boolean;
  headingOptions?: string[];
  showLiningType?: boolean;
  liningOptions?: string[];
}

// ─── Shared certification sets ────────────────────────────────────────────────

const CERTS_APPAREL: string[] = [
  "GOTS", "OEKO-TEX", "BSCI", "Sedex", "ISO 9001", "GRS", "WRAP", "BCI", "SA8000", "Bluesign",
  "Other (specify below)", "None required",
];

const CERTS_BABY: string[] = [
  "GOTS", "OEKO-TEX (Class 1 — infant)", "BSCI", "Sedex", "ISO 9001", "WRAP", "BCI",
  "Other (specify below)", "None required",
];

const CERTS_WORKWEAR: string[] = [
  "ISO 9001", "BSCI", "WRAP", "SA8000", "Sedex", "EN ISO 13688 (PPE standard)",
  "Other (specify below)", "None required",
];

const CERTS_HT: string[] = [
  "GOTS", "OEKO-TEX", "BSCI", "Sedex", "ISO 9001", "GRS", "WRAP", "SA8000", "Bluesign",
  "Other (specify below)", "None required",
];

const CERTS_MEDICAL: string[] = [
  "ISO 9001", "ISO 13485 (medical devices QMS)", "EN 13795 (surgical gowns)",
  "BSCI", "Sedex", "WRAP", "SA8000",
  "Other (specify below)", "None required",
];

const CERTS_FABRIC: string[] = [
  "GOTS", "OEKO-TEX", "GRS", "BCI", "Bluesign", "ISO 9001", "BSCI",
  "Other (specify below)", "None required",
];

// ─── Shared option arrays ─────────────────────────────────────────────────────

const FIT_APPAREL_STANDARD: string[] = [
  "Regular / Standard", "Slim Fit", "Oversized / Relaxed", "Athletic / Performance",
  "Women's Cut", "Unisex",
];

const FIT_BOTTOMS: string[] = [
  "Regular Fit", "Slim / Tapered", "Relaxed / Loose",
];

const PACK_APPAREL_STANDARD: string[] = [
  "Individual polybag", "Hanger + polybag", "Board fold (retail)", "Folded flat (export)",
  "Vacuum packed", "No individual packaging",
];

const PACK_HT_STANDARD: string[] = [
  "Individual polybag", "Retail box (single)", "Rolled & banded", "Folded flat", "Bulk carton",
];

const SET_STANDARD: string[] = [
  "Single piece", "2-piece set", "4-piece set", "6-piece set", "Custom set",
];

const UOM_PIECES_DOZENS: string[] = ["Pieces", "Dozens"];

const UOM_PIECES_SETS_DOZENS: string[] = ["Pieces", "Sets", "Dozens"];

const BED_LINEN_SIZES: string[] = [
  "Twin / Single 96×183 cm", "Full / Double 137×190 cm", "Queen 152×203 cm",
  "King 183×203 cm", "Cal King 183×213 cm", "EU Single 140×200 cm",
  "EU Double 200×200 cm", "EU King 240×220 cm", "Custom",
];

const BED_LINEN_FINISHING: string[] = [
  "Wrinkle Resistant / Easy Care", "Moisture Wicking", "Anti-bacterial",
  "Hypoallergenic", "Soft hand finish", "No special finish",
];

const BED_LINEN_CONSTRUCTION: string[] = [
  "Percale (200–400 TC)", "Sateen (300–600 TC)", "Oxford Weave",
  "Flannel / Brushed Cotton", "Jersey Knit (stretch)", "Jacquard", "Dobby Stripe",
  "Linen / Linen Blend", "Other",
];

const CLOSURE_BED: string[] = ["Button", "Zip / Concealed zip", "Envelope (overlapping)", "Snap / Popper", "Other"];

const STYLE_NONE: string[] = [];

// ─── Shared embellishment arrays ──────────────────────────────────────────────

const EMB_KNIT: string[] = [
  "Screen Print", "Digital / DTG Print", "Embroidery", "Heat Transfer",
  "Sublimation Print", "Puff / Rubber Print", "Appliqué",
  "Rhinestones / Studs", "Reflective Print", "Woven patch", "None / Plain", "Other",
];

const EMB_HOOD: string[] = [
  "Screen Print", "Embroidery", "Appliqué", "Sublimation Print",
  "Heat Transfer", "Puff Print", "Chenille lettering", "Woven badge", "None / Plain", "Other",
];

const EMB_WOVEN: string[] = [
  "Embroidery (logo / monogram)", "Woven badge / crest",
  "Contrast stitching", "Heat Transfer", "None / Plain", "Other",
];

const EMB_DENIM: string[] = [
  "Laser etch / fading effects", "Embroidery (back pocket)",
  "Rubber / leather waistband patch", "Woven label patch",
  "Metal studs decoration", "None / Plain", "Other",
];

const EMB_WORKWEAR: string[] = [
  "Embroidery (company logo)", "Reflective tape — ANSI / EN compliant",
  "Screen Print", "Heat Transfer", "Woven badge", "None / Plain", "Other",
];

const EMB_BABY: string[] = [
  "Appliqué", "Screen Print (water-based / baby-safe)",
  "Digital / DTG Print", "Embroidery", "None / Plain", "Other",
];

const EMB_SOCKS: string[] = [
  "Knitted-in Jacquard logo", "All-over sublimation print",
  "Embroidered ankle logo", "Contrast heel & toe", "None / Plain", "Other",
];

// ─── Shared accessory arrays ──────────────────────────────────────────────────

const ACC_KNIT: string[] = [
  "Drawstring / Cord", "Elastic cuff / hem band",
  "Chest pocket", "Woven label patch", "Ribbed cuff & hem",
  "Grommets / Eyelets", "Thumb holes (sleeve)", "None", "Other",
];

const ACC_POLO: string[] = [
  "Buttons — 3-button placket", "Buttons — 2-button placket",
  "Collar stays", "Chest pocket", "Side vents",
  "Ribbed collar & cuffs", "None", "Other",
];

const ACC_HOOD: string[] = [
  "Drawstring — woven cord", "Drawstring — rope cord",
  "Zipper — full front (YKK)", "Zipper — half zip",
  "Kangaroo pocket", "Side pockets", "Metal eyelets (hood)",
  "Ribbed cuff & hem", "Zipper puller (custom branded)", "None", "Other",
];

const ACC_JOGGER: string[] = [
  "Drawstring waistband", "Elastic waistband (no drawstring)",
  "Ribbed ankle cuffs", "Open hem", "Side pockets",
  "Back pocket", "Zip side pocket", "Side stripe / taping", "None", "Other",
];

const ACC_DENIM: string[] = [
  "Metal shank button", "Metal rivets (copper / brass)",
  "YKK zip", "Standard zip", "Belt loops",
  "Coin pocket", "Watch pocket", "None", "Other",
];

const ACC_FORMAL_SHIRT: string[] = [
  "MOP (mother-of-pearl) buttons", "Resin / plastic buttons",
  "Metal buttons", "Collar stays", "Cufflinks holes",
  "Chest pocket", "Back pleat", "Sleeve placket", "None", "Other",
];

const ACC_TROUSERS: string[] = [
  "Belt loops", "Hook & bar waistband closure",
  "Suspender buttons", "D-rings / loops",
  "Side pockets (slant)", "Back welt pockets",
  "Front pleats", "Cuffed / turn-up hem", "None", "Other",
];

const ACC_CARGO: string[] = [
  "Industrial zip (YKK / SBS)", "Velcro / Hook-loop fasteners",
  "Snap buttons (cargo pockets)", "D-rings",
  "Cargo pocket flaps", "Reinforcement panels (knee)",
  "Belt loops", "Drawstring hem", "None", "Other",
];

const ACC_SHORTS: string[] = [
  "Drawstring waistband", "Belt loops", "Elastic waistband",
  "Side pockets", "Back pockets", "Mesh liner",
  "Zip pocket", "Key loop", "None", "Other",
];

const ACC_WORKWEAR: string[] = [
  "Industrial zip (YKK / SBS)", "Velcro / Hook-loop",
  "D-rings", "Snap buttons",
  "Reinforcement patches (elbow / knee)", "Multiple pockets (tool organizer)",
  "Adjustable cuffs", "Pen pocket / tool loops", "None", "Other",
];

const ACC_BABY: string[] = [
  "Snap buttons (metal-free / plastic)", "Non-metal zipper",
  "Elastic waistband", "Rib cuffs / hem",
  "Tie strings", "Velcro (soft, no-scratch)", "None", "Other",
];

const ACC_SOCKS: string[] = [
  "Custom ankle band header", "Reinforced toe & heel",
  "Arch support band", "Cushioned sole padding", "None", "Other",
];

// ─── Product options — keyed by exact productType string ─────────────────────

export const PRODUCT_OPTIONS: Record<string, ProductOptions> = {

  // ── APPAREL ─────────────────────────────────────────────────────────────────

  "T-Shirts": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Single Jersey", "Double Jersey / Interlock", "Pique",
      "Rib (1×1)", "Rib (2×2)", "Waffle Knit", "Mesh / Eyelet", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Modal Jersey, Bamboo-Cotton Jersey",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 180 gsm",
    sizeLabel: "Size Range",
    sizeOptions: [
      "XS–XL", "XS–2XL", "XS–3XL", "XXS–3XL", "S–XXL",
      "Women's XS–XL", "Youth S/M/L", "Custom",
    ],
    showFitType: true,
    fitOptions: FIT_APPAREL_STANDARD,
    showSizeStandard: true,
    styleLabel: "Neckline / Style",
    styleOptions: [
      "Crew neck", "V-neck", "Round neck", "Scoop neck", "Boat neck", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Screen Print", "Digital / DTG Print", "Embroidery", "Heat Transfer",
      "Sublimation Print", "Appliqué", "Rubber / Puff Print", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Front chest — left", "Front chest — center", "Front — full chest",
      "Back — upper", "Back — full", "Left sleeve", "Right sleeve",
      "All-over", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Silicone", "Anti-shrink / Compacted", "Enzyme wash", "Stone wash",
      "Garment dye", "Peached / Sueded", "Moisture Wicking", "Anti-pill", "No special finish",
    ],
    individualPackOptions: PACK_APPAREL_STANDARD,
    setCompositionOptions: ["Single piece", "3-pack", "5-pack", "6-pack", "Custom set"],
    unitOfMeasure: UOM_PIECES_SETS_DOZENS,
    certifications: CERTS_APPAREL,
    embellishmentOptions: EMB_KNIT,
    accessoryOptions: ACC_KNIT,
  },

  "Polo Shirts": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Pique / Polo Knit", "Mini Pique (fine)", "Single Jersey",
      "French Terry (sport polo)", "Waffle Knit", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Bamboo Pique, Performance Mesh",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 200 gsm",
    sizeLabel: "Size Range",
    sizeOptions: ["XS–XL", "XS–3XL", "S–XXL", "Custom"],
    showFitType: true,
    fitOptions: ["Regular Fit", "Slim Fit", "Athletic Fit"],
    showSizeStandard: true,
    styleLabel: "Polo Style",
    styleOptions: [
      "Classic polo (short-sleeve)", "Long-sleeve polo", "Sleeveless polo",
      "Rugby polo (wide stripe)", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Embroidery", "Woven badge / crest", "Screen Print", "Heat Transfer", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Left chest (logo)", "Right chest", "Back yoke",
      "Left sleeve", "Right sleeve", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Silicone", "Anti-shrink / Compacted", "Moisture Wicking",
      "Anti-pill", "Enzyme wash", "No special finish",
    ],
    individualPackOptions: PACK_APPAREL_STANDARD,
    setCompositionOptions: ["Single piece", "2-piece set", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_APPAREL,
    embellishmentOptions: [
      "Embroidery (chest logo)", "Woven badge / crest", "Heat Transfer logo",
      "Screen Print", "Contrast tipping (collar / cuffs)", "Jacquard knit panel",
      "None / Plain", "Other",
    ],
    accessoryOptions: ACC_POLO,
  },

  "Henley Shirts": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Single Jersey", "Waffle Knit (thermal)", "Rib (1×1)", "French Terry (heavyweight)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Slub Jersey, Pointelle Knit",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 170 gsm",
    sizeLabel: "Size Range",
    sizeOptions: ["XS–XL", "XS–3XL", "S–XXL", "Custom"],
    showFitType: true,
    fitOptions: ["Regular Fit", "Slim Fit", "Oversized / Relaxed", "Athletic"],
    showSizeStandard: true,
    styleLabel: "Placket / Style",
    styleOptions: [
      "3-button placket", "2-button placket", "5-button placket",
      "Long-sleeve", "Short-sleeve", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Screen Print", "Digital / DTG Print", "Embroidery", "Heat Transfer", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Front chest — left", "Front chest — center",
      "Back — upper", "Left sleeve", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Silicone", "Anti-shrink / Compacted", "Enzyme wash",
      "Peached / Sueded", "No special finish",
    ],
    individualPackOptions: PACK_APPAREL_STANDARD,
    setCompositionOptions: ["Single piece", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_APPAREL,
    embellishmentOptions: EMB_KNIT,
    accessoryOptions: [
      "3-button placket set", "2-button placket set", "5-button placket set",
      "Chest pocket", "Long cuffs (button)", "Ribbed hem", "None", "Other",
    ],
  },

  "Sweatshirts & Hoodies": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "French Terry (300–400 gsm)", "Loop Back Fleece", "Brushed Fleece (3-end)",
      "Polar Fleece", "Air Layer / Space Dye", "Bonded Fleece", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Organic Cotton French Terry, Recycled Fleece",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 340 gsm",
    sizeLabel: "Size Range",
    sizeOptions: ["XS–XL", "XS–2XL", "XS–3XL", "S–XXL", "Plus sizes", "Custom"],
    showFitType: true,
    fitOptions: ["Regular Fit", "Slim Fit", "Oversized / Relaxed", "Athletic"],
    showSizeStandard: true,
    styleLabel: "Garment Style",
    styleOptions: [
      "Crewneck sweatshirt", "Pullover hoodie", "Zip-up hoodie (full zip)",
      "Quarter-zip pullover", "Mock neck / funnel neck", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Screen Print", "Digital / DTG Print", "Embroidery",
      "Heat Transfer", "Sublimation", "Appliqué", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Front chest — center", "Front — full chest", "Back — upper", "Back — full",
      "Hood panel", "Left sleeve", "Right sleeve", "All-over", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Silicone", "Anti-pill", "Anti-shrink / Compacted", "Enzyme wash",
      "Stone wash", "Garment dye", "Brushed interior", "Water Repellent (shell)", "No special finish",
    ],
    individualPackOptions: PACK_APPAREL_STANDARD,
    setCompositionOptions: ["Single piece", "2-piece set (top + bottom)", "Custom set"],
    unitOfMeasure: ["Pieces", "Sets (top + bottom)", "Dozens"],
    certifications: CERTS_APPAREL,
    embellishmentOptions: EMB_HOOD,
    accessoryOptions: ACC_HOOD,
  },

  "Sweatpants & Joggers": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "French Terry (300–380 gsm)", "Loop Back Fleece", "Brushed Fleece",
      "Cotton-Spandex (performance)", "Polar Fleece", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Organic French Terry, Bamboo-Cotton Fleece",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 320 gsm",
    sizeLabel: "Size Range",
    sizeOptions: ["XS–XL", "XS–2XL", "XS–3XL", "S–XXL", "Custom"],
    showFitType: true,
    fitOptions: FIT_BOTTOMS,
    showSizeStandard: true,
    styleLabel: "Waistband / Style",
    styleOptions: [
      "Elastic waist (no drawstring)", "Drawstring waist", "Cuffed ankle",
      "Open hem", "Drop crotch", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Screen Print", "Digital / DTG Print", "Embroidery", "Heat Transfer", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Left thigh", "Right thigh", "Waistband", "Side stripe / taping",
      "Back hip", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Silicone", "Anti-pill", "Anti-shrink", "Enzyme wash",
      "Stone wash", "No special finish",
    ],
    individualPackOptions: PACK_APPAREL_STANDARD,
    setCompositionOptions: ["Single piece", "2-piece set (top + bottom)", "Custom set"],
    unitOfMeasure: ["Pieces", "Sets (top + bottom)", "Dozens"],
    certifications: CERTS_APPAREL,
    embellishmentOptions: EMB_HOOD,
    accessoryOptions: ACC_JOGGER,
  },

  "Tank Tops": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Single Jersey", "Rib (1×1)", "Mesh / Eyelet (athletic)",
      "Slub Jersey", "Bamboo Jersey", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Modal Jersey, Pointelle Knit",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 150 gsm",
    sizeLabel: "Size Range",
    sizeOptions: ["XS–XL", "XS–3XL", "S–XXL", "Custom"],
    showFitType: true,
    fitOptions: [
      "Regular Fit", "Slim Fit", "Oversized / Relaxed",
      "Athletic / Performance", "Women's Cut",
    ],
    showSizeStandard: true,
    styleLabel: "Tank Style",
    styleOptions: [
      "Standard spaghetti strap", "Muscle tank (wide strap)", "Racerback",
      "Crop tank", "Vest / undershirt", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Screen Print", "Digital / DTG Print", "Embroidery", "Heat Transfer",
      "Sublimation Print", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Front chest — left", "Front chest — center", "Front — full",
      "Back — upper", "Back — full", "All-over", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Silicone", "Moisture Wicking", "Anti-shrink", "Enzyme wash", "No special finish",
    ],
    individualPackOptions: PACK_APPAREL_STANDARD,
    setCompositionOptions: ["Single piece", "3-pack", "6-pack", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_APPAREL,
    embellishmentOptions: EMB_KNIT,
    accessoryOptions: [
      "Racerback panel", "Wide strap", "Thin strap (spaghetti)",
      "Elastic hem", "Chest pocket", "Brand label patch", "None", "Other",
    ],
  },

  "Denim Jeans": {
    constructionLabel: "Denim Type",
    constructionOptions: [
      "3×1 Twill Denim — Rigid", "Stretch Denim (98/2 Cotton/Spandex)",
      "Stretch Denim (95/5)", "Raw / Dry Denim", "Selvedge Denim",
      "Recycled Cotton Denim", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Bull Denim, Overdyed Denim, Poly-Cotton Denim",
    weightLabel: "Weight (oz)",
    weightPlaceholder: "e.g. 12 oz",
    sizeLabel: "Waist / Inseam Range",
    sizeOptions: [
      "Waist 28–36\" / Inseam 28–34\"", "Waist 28–40\" (extended range)",
      "Waist 28–42\" (plus range)", "Women's Waist 24–34\"", "Custom",
    ],
    showFitType: true,
    fitOptions: [
      "Slim Fit", "Regular / Straight Leg", "Relaxed / Baggy",
      "Skinny", "Bootcut", "Tapered",
    ],
    showSizeStandard: false,
    showWarpWeft: true,
    styleLabel: "Pocket Style",
    styleOptions: [
      "5-pocket (classic)", "Carpenter / painter (extra loops)", "Patch pocket",
      "Wide leg", "Barrel / balloon leg", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Laser etch (fading / distress effects)", "Embroidery", "Rubber / Woven patch label",
      "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Back pocket embroidery", "Waistband patch / leather label",
      "Selvedge ID (woven)", "No decoration",
    ],
    finishingOptions: [
      "Stone Wash", "Acid Wash", "Sand Wash / Sand Blast", "Enzyme Wash",
      "Raw / No Wash", "Overdye / Tinted", "Bleach Wash", "Distressed", "Garment Dye",
    ],
    individualPackOptions: [
      "Individual polybag (folded)", "Hanger + polybag", "Folded on board (retail)",
      "Flat fold (bulk export)",
    ],
    setCompositionOptions: ["Single piece", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_APPAREL,
    embellishmentOptions: EMB_DENIM,
    accessoryOptions: ACC_DENIM,
  },

  "Formal & Casual Shirts": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Poplin", "Oxford Weave", "Twill", "Linen / Linen-Cotton Blend",
      "Chambray", "End-on-End", "Dobby Weave", "Seersucker", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Micro-polyester, Lyocell / Tencel blend",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 100 gsm",
    sizeLabel: "Size Range",
    sizeOptions: [
      "S / M / L / XL / XXL", "XS–3XL", "Collar 14\"–18\" (US sizing)",
      "EU 38–46", "Custom",
    ],
    showFitType: true,
    fitOptions: ["Regular / Classic", "Slim Fit", "Relaxed", "Athletic / Trim"],
    showSizeStandard: true,
    showWarpWeft: true,
    styleLabel: "Collar / Style",
    styleOptions: [
      "Regular spread collar", "Button-down collar", "Mandarin / Band collar",
      "Camp collar", "Point collar", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Embroidery (logo / monogram)", "Woven badge", "Screen Print", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Left chest — embroidery", "Right chest", "Collar / cuff monogram",
      "Back yoke", "No decoration",
    ],
    finishingOptions: [
      "Wrinkle Resistant / Easy Care", "Soil Release", "Soft hand finish",
      "Anti-shrink", "Anti-static", "Mercerized", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag (board fold)", "Hanger + polybag",
      "Retail box (gift / premium)", "Flat fold",
    ],
    setCompositionOptions: ["Single piece", "2-piece set", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_APPAREL,
    embellishmentOptions: EMB_WOVEN,
    accessoryOptions: ACC_FORMAL_SHIRT,
  },

  "Pants & Trousers": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Twill / Chino", "Canvas (heavy)", "Poplin (lightweight)",
      "Linen / Linen Blend", "Wool Blend", "Sateen Stretch", "Ponte (knit-look)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Crepe, Scuba, Technical polyester",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 220 gsm",
    sizeLabel: "Waist / Inseam Range",
    sizeOptions: [
      "Waist 28–38\" standard inseam", "Waist 28–42\" extended",
      "S / M / L / XL / XXL", "Custom",
    ],
    showFitType: true,
    fitOptions: ["Regular Fit", "Slim Fit", "Relaxed / Straight", "Tapered", "Athletic / Performance"],
    showSizeStandard: false,
    showWarpWeft: true,
    styleLabel: "Waistband / Pocket Style",
    styleOptions: [
      "Flat front", "Single pleat", "Double pleat", "Side pockets only", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: ["Embroidery", "No decoration"],
    printPlacementLabel: "Placement",
    printPlacementOptions: ["Back pocket embroidery", "Waistband label / patch", "No decoration"],
    finishingOptions: [
      "Wrinkle Resistant", "DWR / Water Repellent", "Soil Release",
      "Anti-shrink", "Soft hand finish", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag (folded)", "Hanger + polybag", "Folded on board (retail)", "Flat fold",
    ],
    setCompositionOptions: ["Single piece", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_APPAREL,
    embellishmentOptions: [
      "Embroidery (pocket / logo)", "Contrast stitching",
      "Woven label patch", "None / Plain", "Other",
    ],
    accessoryOptions: ACC_TROUSERS,
  },

  "Cargo Pants": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Ripstop", "Canvas", "Heavy Twill", "TC Poly-Cotton", "Nylon / Poly Canvas",
      "Stretch Ripstop", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Cordura nylon, Waxed canvas",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 240 gsm",
    sizeLabel: "Waist / Inseam Range",
    sizeOptions: ["Waist 28–40\" standard inseam", "S / M / L / XL / XXL / 3XL", "Custom"],
    showFitType: true,
    fitOptions: ["Regular Fit", "Relaxed Fit", "Slim / Tactical"],
    showSizeStandard: false,
    showWarpWeft: true,
    styleLabel: "Pocket Configuration",
    styleOptions: [
      "6-pocket (2 cargo)", "8-pocket (tactical)", "Multi-pocket utility",
      "Standard cargo with flap", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: ["Embroidery", "Screen Print", "No decoration"],
    printPlacementLabel: "Placement",
    printPlacementOptions: ["Pocket embroidery", "Left thigh patch", "Right thigh patch", "No decoration"],
    finishingOptions: [
      "DWR / Water Repellent", "Anti-static", "Soil Release", "Anti-shrink", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag (folded)", "Hanger + polybag", "Flat fold (export)",
    ],
    setCompositionOptions: ["Single piece", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_APPAREL,
    embellishmentOptions: [
      "Embroidery (pocket / knee)", "Reflective tape / piping",
      "Contrast stitching", "Screen Print", "None / Plain", "Other",
    ],
    accessoryOptions: ACC_CARGO,
  },

  "Shorts": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Single Jersey (athletic)", "French Terry (casual)", "Twill / Chino",
      "Canvas", "Ripstop (cargo)", "Linen Blend", "Nylon (swim / board)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Stretch poplin, Seersucker",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 200 gsm",
    sizeLabel: "Size Range",
    sizeOptions: [
      "XS–XL", "XS–3XL", "Waist 28–38\" / Inseam 5\"–11\"",
      "S / M / L / XL / XXL", "Custom",
    ],
    showFitType: true,
    fitOptions: ["Regular Fit", "Slim Fit", "Relaxed / Loose", "Athletic / Performance"],
    showSizeStandard: true,
    showWarpWeft: true,
    styleLabel: "Short Style",
    styleOptions: [
      "Gym / athletic (5–7\")", "Board / swim shorts", "Cargo shorts (multi-pocket)",
      "Chino / casual", "Running shorts (split hem)", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Screen Print", "Digital / DTG Print", "Embroidery",
      "Sublimation Print", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Left leg / thigh", "Right leg / thigh", "Front center (below waistband)",
      "Back hip", "All-over", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Silicone", "Moisture Wicking", "DWR / Water Repellent",
      "Anti-shrink", "Enzyme wash", "No special finish",
    ],
    individualPackOptions: PACK_APPAREL_STANDARD,
    setCompositionOptions: ["Single piece", "2-piece set", "Custom set"],
    unitOfMeasure: UOM_PIECES_SETS_DOZENS,
    certifications: CERTS_APPAREL,
    embellishmentOptions: EMB_KNIT,
    accessoryOptions: ACC_SHORTS,
  },

  "Baby & Kids Apparel": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Single Jersey Combed Cotton", "Interlock", "Rib (1×1)", "Muslin / Double Gauze",
      "French Terry (lightweight)", "Fleece", "Organic Cotton Jersey", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Bamboo Jersey, Modal-Cotton, GOTS Organic Interlock",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 150 gsm",
    sizeLabel: "Age / Size Range",
    sizeOptions: [
      "Premature (<2.5 kg)", "0–3 months", "3–6 months", "6–9 months",
      "9–12 months", "12–18 months", "18–24 months", "2 years", "3 years",
      "4 years", "5–6 years", "6–8 years", "8–10 years", "8–12 years", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    styleLabel: "Garment Type",
    styleOptions: [
      "T-shirt", "Bodysuit / onesie", "Set (top + bottom)", "Romper",
      "Sleep suit / pajama", "Jacket / hoodie", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Screen Print (water-based)", "Digital / DTG", "Embroidery", "Appliqué", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Front chest — small center", "Front — all-over", "Back — upper",
      "Sleeve (small)", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Baby-safe silicone", "Hypoallergenic", "Anti-shrink / Pre-washed",
      "Enzyme wash (baby-safe)", "OEKO-TEX compliant finish", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Gift box", "3-pack set", "6-pack set", "Retail hanger bag",
    ],
    setCompositionOptions: ["Single piece", "2-piece set", "3-piece set", "6-piece set", "Custom set"],
    unitOfMeasure: UOM_PIECES_SETS_DOZENS,
    certifications: CERTS_BABY,
    embellishmentOptions: EMB_BABY,
    accessoryOptions: ACC_BABY,
  },

  // ── BABY & KIDS SUB-TYPES ────────────────────────────────────────────────────

  "T-Shirts for Kids": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Single Jersey Combed Cotton", "Interlock", "Rib (1×1)",
      "Organic Cotton Jersey", "Bamboo Jersey", "Other",
    ],
    constructionOtherPlaceholder: "e.g. GOTS Organic Interlock, Modal-Cotton",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 150 gsm",
    sizeLabel: "Age / Size Range",
    sizeOptions: [
      "0–3 months", "3–6 months", "6–12 months", "12–18 months", "18–24 months",
      "2–3 years", "3–4 years", "4–5 years", "5–6 years", "6–8 years", "8–10 years", "10–12 years", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    styleLabel: "T-Shirt Style",
    styleOptions: ["Short sleeve crewneck", "Long sleeve crewneck", "Short sleeve polo-neck", "Sleeveless / vest", "Other"],
    designLabel: "Print Type",
    printTypeOptions: [
      "Screen Print (water-based)", "Digital / DTG", "Embroidery", "Appliqué", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Front chest — center", "Front — all-over", "Back — upper", "Sleeve (small)", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Baby-safe silicone", "Hypoallergenic", "Anti-shrink / Pre-washed",
      "Enzyme wash (baby-safe)", "OEKO-TEX compliant finish", "No special finish",
    ],
    individualPackOptions: ["Individual polybag", "Gift box", "3-pack set", "6-pack set", "Retail hanger bag"],
    setCompositionOptions: ["Single piece", "2-piece set", "3-piece set", "6-piece set", "Custom set"],
    unitOfMeasure: UOM_PIECES_SETS_DOZENS,
    certifications: CERTS_BABY,
    embellishmentOptions: EMB_BABY,
    accessoryOptions: ACC_BABY,
  },

  "Swaddle Muslin Fabric": {
    constructionLabel: "Weave / Structure",
    constructionOptions: [
      "Open weave muslin (single layer)", "Double gauze (2-layer muslin)",
      "Organic cotton muslin", "Bamboo-cotton muslin", "Other",
    ],
    constructionOtherPlaceholder: "e.g. GOTS organic double gauze, Bamboo-cotton blend",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 90 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: ["70×70 cm", "80×80 cm", "100×100 cm", "120×120 cm", "Custom"],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    styleLabel: "Product Type",
    styleOptions: [
      "Swaddle blanket (large square)", "Muslin cloth / burp cloth (small)",
      "Receiving blanket", "Multi-purpose wrap", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Reactive print (all-over)", "Screen Print (water-based)", "Digital / DTG", "Plain / no print",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["All-over (full face)", "Border / edge", "Corner motif", "Plain"],
    finishingOptions: [
      "Soft hand / Baby-safe silicone", "Hypoallergenic", "Pre-washed / Shrink Resistant",
      "OEKO-TEX compliant finish", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Gift box", "3-pack set", "4-pack set", "Retail hanger bag",
    ],
    setCompositionOptions: ["Single piece", "2-pack", "3-pack", "4-pack", "Custom set"],
    unitOfMeasure: ["Pieces", "Packs", "Dozens"],
    certifications: CERTS_BABY,
    embellishmentOptions: EMB_BABY,
    accessoryOptions: ["Satin trim / edge binding", "Knotted corner tag", "None", "Other"],
  },

  "Overalls": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Single Jersey (casual)", "Interlock", "Denim", "Poplin / Cotton weave",
      "Canvas (lightweight)", "Organic Cotton Jersey", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Bamboo Jersey, GOTS Organic Twill",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 200 gsm",
    sizeLabel: "Age / Size Range",
    sizeOptions: [
      "0–3 months", "3–6 months", "6–12 months", "12–18 months", "18–24 months",
      "2–3 years", "3–4 years", "4–5 years", "5–6 years", "6–8 years", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    styleLabel: "Overalls Style",
    styleOptions: [
      "Bib overall / dungarees (full length)", "Short dungarees", "Sleeveless bib overall",
      "Overalls with feet / footie", "Shortall (shorts overall)", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Screen Print (water-based)", "Embroidery", "Appliqué", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: ["Front bib area", "Back pocket", "All-over", "No decoration"],
    finishingOptions: [
      "Soft hand / Baby-safe silicone", "Hypoallergenic", "Anti-shrink / Pre-washed",
      "Enzyme wash (baby-safe)", "OEKO-TEX compliant finish", "No special finish",
    ],
    individualPackOptions: ["Individual polybag", "Gift box", "Retail hanger bag"],
    setCompositionOptions: ["Single piece", "2-piece set", "Custom set"],
    unitOfMeasure: UOM_PIECES_SETS_DOZENS,
    certifications: CERTS_BABY,
    embellishmentOptions: EMB_BABY,
    accessoryOptions: [
      "Snap buttons (metal-free)", "Adjustable suspender buttons",
      "Bib pocket", "Side buttons", "None", "Other",
    ],
  },

  "Baby Rompers": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Single Jersey Combed Cotton", "Interlock", "Rib (1×1)", "Organic Cotton Jersey",
      "Terry (lightweight)", "Bamboo Jersey", "Other",
    ],
    constructionOtherPlaceholder: "e.g. GOTS Organic Interlock, Modal blend",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 160 gsm",
    sizeLabel: "Age / Size Range",
    sizeOptions: [
      "Premature (<2.5 kg)", "0–3 months", "3–6 months", "6–9 months",
      "9–12 months", "12–18 months", "18–24 months", "2–3 years", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    styleLabel: "Romper Style",
    styleOptions: [
      "Short sleeve + shorts", "Long sleeve + pants", "Sleeveless romper",
      "Snap-bottom bodysuit / onesie", "Zip-front romper", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Reactive / screen print (water-based)", "Digital / DTG", "Embroidery", "Appliqué", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Front chest — center", "Front — all-over", "Back", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Baby-safe silicone", "Hypoallergenic", "Anti-shrink / Pre-washed",
      "Enzyme wash (baby-safe)", "OEKO-TEX compliant finish", "No special finish",
    ],
    individualPackOptions: ["Individual polybag", "Gift box", "2-pack", "Retail hanger bag"],
    setCompositionOptions: ["Single piece", "2-piece set", "Custom set"],
    unitOfMeasure: UOM_PIECES_SETS_DOZENS,
    certifications: CERTS_BABY,
    embellishmentOptions: EMB_BABY,
    accessoryOptions: [
      "Snap crotch buttons (metal-free)", "Zip front (non-metal slider)",
      "Envelope neckline", "Rib cuff", "None", "Other",
    ],
  },

  "Baby Bibs": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Terry Cotton (absorbent)", "Double Gauze / Muslin", "Velour (soft face)",
      "Cotton + waterproof backing", "Silicone (food-grade)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Bamboo terry, Organic cotton velour",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 300 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "Feeding bib standard 22×30 cm", "Bandana bib 28×28 cm",
      "Long-sleeve bib (smock) child size", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showPileGround: true,
    styleLabel: "Bib Style",
    styleOptions: [
      "Feeding bib (standard)", "Bandana / drool bib", "Long-sleeve bib / smock",
      "Waterproof pocket bib (with catcher)", "Tie-back bib", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Reactive / screen print (water-based)", "Embroidery", "Appliqué", "Plain / no decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: ["Front face (all-over print)", "Center motif", "Plain"],
    finishingOptions: [
      "Waterproof backing (PUL)", "Absorbent multi-layer", "Soft hand / Baby-safe silicone",
      "Hypoallergenic", "OEKO-TEX compliant finish", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Gift box (pair)", "3-pack set", "Header card", "Retail hanger",
    ],
    setCompositionOptions: ["Single piece", "2-pack (pair)", "3-pack", "5-pack", "Custom"],
    unitOfMeasure: ["Pieces", "Packs", "Dozens"],
    certifications: CERTS_BABY,
    embellishmentOptions: EMB_BABY,
    accessoryOptions: [
      "Snap closure (metal-free)", "Velcro closure (soft)", "Tie strings",
      "Silicone pocket (food catcher)", "None", "Other",
    ],
  },

  "Baby Hooded Towels": {
    constructionLabel: "Weave / Structure",
    constructionOptions: [
      "Terry Loop (100% Cotton)", "Velour / Sheared Terry", "Organic Cotton Terry",
      "Zero Twist Terry", "Bamboo-Cotton Terry", "Other",
    ],
    constructionOtherPlaceholder: "e.g. GOTS Organic Terry, Bamboo velour",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 360 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "70×70 cm", "75×75 cm", "80×80 cm", "90×90 cm",
      "Poncho style 50×60 cm (0–3 yrs)", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showPileGround: true,
    styleLabel: "Hood Style",
    styleOptions: [
      "Corner hood (classic square)", "Ear detail hood (bear / bunny / animal)",
      "Hooded poncho style (full coverage)", "Plain hood (no character)", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: [
      "Embroidered motif", "Appliqué character", "Reactive print", "Plain / no decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["Hood face", "Front body center", "All-over", "No decoration"],
    finishingOptions: [
      "Soft hand / Baby-safe silicone", "Anti-bacterial", "Hypoallergenic",
      "Pre-washed / Shrink Resistant", "OEKO-TEX compliant finish", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Gift box (with presentation ribbon)", "Retail box", "Bulk folded",
    ],
    setCompositionOptions: ["Single piece", "2-piece set (towel + washcloth)", "Custom set"],
    unitOfMeasure: UOM_PIECES_SETS_DOZENS,
    certifications: CERTS_BABY,
    embellishmentOptions: [
      "Embroidered name / monogram", "Appliqué character (hood)", "Woven label",
      "Reactive print (all-over)", "None / Plain", "Other",
    ],
    accessoryOptions: [
      "Satin trim / ribbon edging", "Gift ribbon / bow",
      "Matching washcloth", "None", "Other",
    ],
  },

  "Workwear Apparel": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Canvas (heavy: 280–400 gsm)", "Ripstop Poly-Cotton TC", "Twill (durable)",
      "FR (Flame Retardant) Cotton", "Hi-Vis Polyester / Fluorescent", "Denim", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Nomex, Kevlar blend, Anti-static poly-cotton",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 300 gsm",
    sizeLabel: "Size Range",
    sizeOptions: ["XS–XL", "XS–3XL", "XS–5XL", "S / M / L / XL / XXL / 3XL", "Custom (provide size chart)"],
    showFitType: true,
    fitOptions: ["Regular Fit", "Loose / Relaxed (safety clearance)", "Slim (modern workwear)"],
    showSizeStandard: false,
    showWarpWeft: true,
    styleLabel: "Garment Type",
    styleOptions: [
      "Coverall / boilersuit (1-piece)", "Jacket", "Shirt", "Trousers",
      "Hi-vis vest", "Lab coat", "Other",
    ],
    designLabel: "Print Type",
    printTypeOptions: [
      "Embroidery", "Screen Print", "Heat Transfer", "Reflective tape / Hi-Vis trim", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Left chest embroidery", "Right chest", "Back (company name — large format)",
      "Sleeve", "Reflective tape placement", "No decoration",
    ],
    finishingOptions: [
      "FR (Flame Retardant)", "DWR / Water Repellent", "Anti-static",
      "Hi-Vis retroreflective", "Anti-bacterial", "Stain Repellent", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Hanger + polybag", "Bulk export (no individual packaging)",
    ],
    setCompositionOptions: ["Single piece", "2-piece set (top + bottom)", "Custom set"],
    unitOfMeasure: UOM_PIECES_SETS_DOZENS,
    certifications: CERTS_WORKWEAR,
    embellishmentOptions: EMB_WORKWEAR,
    accessoryOptions: ACC_WORKWEAR,
  },

  "Socks": {
    constructionLabel: "Knit Structure",
    constructionOptions: [
      "Plain Knit (smooth all-over)", "Rib Cuff + Plain Foot", "Terry Sole Cushion",
      "Full Terry Cushion (all-over)", "Jacquard / Pattern Knit",
      "Mesh / Open Knit (ventilated)", "Compression Knit", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Pointelle knit, Thermal loop knit",
    weightLabel: "Weight / Denier",
    weightPlaceholder: "e.g. 200 denier",
    sizeLabel: "Shoe Size Range",
    sizeOptions: [
      "EU 35–38 / UK 2–5 / US Women 5–8", "EU 39–42 / UK 6–8 / US Men 6–9",
      "EU 43–46 / UK 9–11 / US Men 10–13", "EU 47–50 / UK 12–14 / US Men 14+",
      "Kids EU 22–27 / UK 4–10", "Kids EU 28–34 / UK 10–2",
      "One Size Fits Most (EU 38–44)", "Custom size range",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    styleLabel: "Sock Height",
    styleOptions: [
      "No-show / invisible", "Ankle socks", "Trainer / crew",
      "Mid-calf", "Knee-high", "Over-the-knee", "Athletic (cushioned ankle)", "Other",
    ],
    designLabel: "Design / Pattern",
    printTypeOptions: [
      "Knitted-in Jacquard pattern", "Intarsia (multi-color blocks)",
      "All-over print (sublimation)", "Plain / No design",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: [
      "Ankle / cuff area", "Leg (knitted-in pattern)", "Heel & toe contrast color",
      "Custom knitted logo", "Full sock (all-over)", "Plain / No placement",
    ],
    finishingOptions: [
      "Anti-odor / Antimicrobial", "Moisture Wicking", "Cushioned Sole (extra terry)",
      "Arch Compression / Support", "Anti-static", "Thermal / Heat-trapping", "No special finish",
    ],
    individualPackOptions: [
      "Ankle band (pair)", "Header card — 2-pair", "Header card — 3-pair",
      "Polybag — 3-pair", "Polybag — 6-pair", "Polybag — 12-pair",
      "Polybag — 24-pair", "Bulk (no individual packing)",
    ],
    setCompositionOptions: ["1 pair", "2-pack", "3-pack", "6-pack", "12-pack", "Custom"],
    unitOfMeasure: ["Pairs", "Dozens (pairs)", "Packs"],
    certifications: CERTS_APPAREL,
    embellishmentOptions: EMB_SOCKS,
    accessoryOptions: ACC_SOCKS,
  },

  // ── HOME TEXTILES ────────────────────────────────────────────────────────────

  "Towels": {
    constructionLabel: "Weave / Structure",
    constructionOptions: [
      "Terry Loop", "Velour / Sheared Terry", "Zero Twist Terry",
      "Waffle / Honeycomb", "Jacquard Terry", "Dobby Border Terry", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Microfiber, Bamboo Terry, Organic Terry",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 500 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "Face Towel 30×30 cm", "Guest Towel 30×50 cm", "Hand Towel 40×70 cm",
      "Bath Towel 70×140 cm", "Bath Sheet 90×150 cm", "Gym Towel 50×100 cm", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showBorderField: true,
    showPileGround: true,
    styleLabel: "Towel Application",
    styleOptions: ["Bath / daily use", "Hotel / hospitality", "Gym / sports", "Spa / wellness", "Gift / retail", "Other"],
    designLabel: "Design",
    printTypeOptions: [
      "Dobby / Jacquard woven border", "Plain hem (no border)", "Satin border",
      "Embroidered corner", "Sublimation printed face", "No decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: [
      "Border (full length)", "Corner (embroidery / woven label)",
      "Face (sublimation print)", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Silicone finish", "Anti-bacterial", "Zero Twist effect",
      "Velour shearing", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Rolled & banded", "Retail box (single)",
      "Gift box (set)", "Wrapped with ribbon / band", "Bulk (12 pcs per carton)",
    ],
    setCompositionOptions: ["Single piece", "2-piece set", "4-piece set", "6-piece set", "8-piece set", "Custom set"],
    unitOfMeasure: UOM_PIECES_SETS_DOZENS,
    certifications: CERTS_HT,
  },

  "Institutional Towels": {
    constructionLabel: "Weave / Structure",
    constructionOptions: [
      "Terry Loop", "Dobby Border Terry", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Microfiber, Zero Twist Terry",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 480 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "Face Towel 30×30 cm", "Hand Towel 40×70 cm", "Bath Towel 70×140 cm", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showPileGround: true,
    showSizeStandard: false,
    styleLabel: "Institution Type",
    styleOptions: ["Hotel / hospitality chain", "Healthcare / hospital", "Airline / transport", "Gym / sports facility", "Other"],
    designLabel: "Design",
    printTypeOptions: ["Plain white", "White with dobby stripe border"],
    printPlacementLabel: "Placement",
    printPlacementOptions: ["Border stripe", "Plain / no decoration"],
    finishingOptions: [
      "Soft hand / Silicone finish", "Anti-bacterial", "No special finish",
    ],
    individualPackOptions: [
      "Dozen (12 pcs) banded", "Case (120 pcs) bulk", "Bulk / no individual packing",
    ],
    setCompositionOptions: ["Dozen (12 pcs)", "24-pack", "Case (120 pcs)", "Custom"],
    unitOfMeasure: ["Pieces", "Dozens", "Cases (120 pcs)"],
    certifications: CERTS_HT,
  },

  "Bathrobes": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Terry Loop", "Velour / Sheared Terry", "Waffle / Honeycomb",
      "Kimono Flat Weave", "Microfleece / Coral Fleece", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Bamboo Terry, Organic Cotton Velour",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 400 gsm",
    sizeLabel: "Size Range",
    sizeOptions: [
      "XS/S (fits 32–36\")", "M/L (fits 38–42\")", "XL/XXL (fits 44–50\")",
      "One Size Fits Most", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showCollarType: true,
    collarOptions: ["Shawl collar", "Kimono collar", "Hooded", "Other"],
    showPileGround: true,
    styleLabel: "Robe Length",
    styleOptions: ["Short (above knee)", "Knee length (midi)", "Long (calf to ankle)", "Other"],
    designLabel: "Design",
    printTypeOptions: [
      "Embroidery", "Woven patch / crest", "Heat transfer label", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Left chest (logo embroidery)", "Back center", "Pocket embroidery", "No decoration",
    ],
    finishingOptions: [
      "Soft hand / Silicone finish", "Anti-bacterial", "Velour shearing", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag + hanger", "Retail box", "Cloth / non-woven gift bag", "Bulk folded",
    ],
    setCompositionOptions: ["Single piece", "2-piece set (robe + sash)", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_HT,
  },

  "Bath Mats": {
    constructionLabel: "Construction",
    constructionOptions: [
      "Terry Loop (tufted)", "Chenille Tufted", "Memory Foam + Terry Cover",
      "Microfiber Tufted", "Waffle Weave", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Shaggy tufted, Bamboo surface",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 1000 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: ["Small 40×60 cm", "Standard 50×80 cm", "Large 60×100 cm", "Custom"],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showBackingType: true,
    backingOptions: ["Latex backing (anti-slip)", "Rubber spray backing", "No backing", "Other"],
    showPileGround: true,
    styleLabel: "Mat Shape",
    styleOptions: ["Rectangular (standard)", "Contour / U-shape (toilet mat)", "Oval", "Round", "Other"],
    designLabel: "Design",
    printTypeOptions: [
      "Tufted pattern (woven in)", "Printed design", "Plain / no decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: ["All-over (woven pattern)", "Plain / no decoration"],
    finishingOptions: [
      "Anti-slip backing (latex)", "Anti-slip backing (rubber spray)",
      "Soft hand finish", "Anti-bacterial", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Retail header card", "Retail box", "Bulk",
    ],
    setCompositionOptions: ["Single piece", "2-piece set (bath mat + toilet mat)", "Custom set"],
    unitOfMeasure: ["Pieces", "Sets (mat + toilet mat)", "Dozens"],
    certifications: CERTS_HT,
  },

  "Beach & Pool Towels": {
    constructionLabel: "Construction",
    constructionOptions: [
      "Velour (one-sided) / Terry back", "Velour (both sides)", "Terry Loop",
      "Microfiber", "Fouta / Pestemal (flat woven)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Bamboo velour, Waffle weave cotton",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 420 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "Standard 75×150 cm", "Large 90×170 cm", "Oversized 100×180 cm",
      "Kids 60×120 cm", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showPileGround: true,
    styleLabel: "Towel Format",
    styleOptions: ["Rectangular (standard)", "Round beach towel", "Hooded beach towel", "Fouta / hammam wrap", "Other"],
    designLabel: "Design",
    printTypeOptions: [
      "Sublimation print (all-over photographic)", "Reactive print (geometric)",
      "Jacquard woven", "Yarn-dyed stripe", "No decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["All-over (sublimation / reactive)", "Woven stripe / border", "No decoration"],
    finishingOptions: [
      "Chlorine / Salt Resistant", "Color Fast treatment",
      "Soft hand finish", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Retail roll (paper band)", "Branded bag", "Retail box", "Bulk",
    ],
    setCompositionOptions: ["Single piece", "2-piece set", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_HT,
  },

  "Bedsheets": {
    constructionLabel: "Weave / Construction",
    constructionOptions: BED_LINEN_CONSTRUCTION,
    constructionOtherPlaceholder: "e.g. Bamboo-Cotton blend, Tencel / Lyocell",
    weightLabel: "Thread Count (TC)",
    weightPlaceholder: "e.g. 300 TC",
    sizeLabel: "Bed Size",
    sizeOptions: BED_LINEN_SIZES,
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    styleLabel: "Sheet Application",
    styleOptions: [
      "Flat sheet (residential)", "Top sheet (hotel / luxury)", "Hospital flat sheet",
      "Crib / nursery sheet", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: [
      "Embroidered border / hem", "All-over reactive print",
      "Jacquard woven pattern", "Printed border / stripe", "Plain / solid", "No decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: [
      "Embroidered border", "All-over", "Printed border / stripe", "No decoration",
    ],
    finishingOptions: BED_LINEN_FINISHING,
    individualPackOptions: [
      "Individual polybag", "Retail box (single)", "Retail box (set)",
      "Zippered pouch", "Vacuum packed", "Bulk",
    ],
    setCompositionOptions: SET_STANDARD,
    unitOfMeasure: ["Pieces", "Sets"],
    certifications: CERTS_HT,
  },

  "Fitted Sheets": {
    constructionLabel: "Weave / Construction",
    constructionOptions: BED_LINEN_CONSTRUCTION,
    constructionOtherPlaceholder: "e.g. Bamboo-Cotton blend, Tencel / Lyocell",
    weightLabel: "Thread Count (TC)",
    weightPlaceholder: "e.g. 300 TC",
    sizeLabel: "Bed Size",
    sizeOptions: BED_LINEN_SIZES,
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showPocketDepth: true,
    pocketDepthOptions: ["12\" / 30 cm", "15\" / 38 cm", "18\" / 46 cm", "21\" / 53 cm", "Deep pocket 26\"+"],
    showWarpWeft: true,
    styleLabel: "Sheet Application",
    styleOptions: [
      "Residential standard", "Hotel / hospitality", "Hospital / healthcare",
      "Deep mattress (RV / motorhome)", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: [
      "Embroidered border", "All-over reactive print", "Jacquard woven", "Plain / solid", "No decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["Embroidered border", "All-over", "No decoration"],
    finishingOptions: BED_LINEN_FINISHING,
    individualPackOptions: [
      "Individual polybag", "Retail box (single)", "Retail box (set)",
      "Zippered pouch", "Vacuum packed", "Bulk",
    ],
    setCompositionOptions: SET_STANDARD,
    unitOfMeasure: ["Pieces", "Sets"],
    certifications: CERTS_HT,
  },

  "Duvet Covers": {
    constructionLabel: "Weave / Construction",
    constructionOptions: BED_LINEN_CONSTRUCTION,
    constructionOtherPlaceholder: "e.g. Bamboo-Cotton blend, Tencel / Lyocell",
    weightLabel: "Thread Count (TC)",
    weightPlaceholder: "e.g. 300 TC",
    sizeLabel: "Bed Size",
    sizeOptions: [
      "UK Single 135×200 cm", "UK Double 200×200 cm", "UK King 225×220 cm",
      "US Twin 172×218 cm", "US Full / Queen 203×228 cm", "US King 259×228 cm",
      "EU 135×200 cm", "EU 200×200 cm", "EU 200×220 cm", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showClosureType: true,
    closureOptions: CLOSURE_BED,
    showWarpWeft: true,
    styleLabel: "Duvet Cover Style",
    styleOptions: [
      "Reversible (two-sided print)", "Single sided print / solid",
      "Hotel white / institutional", "Kids / juvenile", "Designer / fashion", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: [
      "Embroidered panel", "All-over reactive print", "Jacquard woven pattern",
      "Printed border / stripe", "Plain / solid", "No decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["All-over", "Border / panel", "No decoration"],
    finishingOptions: BED_LINEN_FINISHING,
    individualPackOptions: [
      "Individual polybag", "Retail box (single)", "Retail box (set)",
      "Zippered pouch", "Vacuum packed", "Bulk",
    ],
    setCompositionOptions: ["Single piece", "Duvet cover + 2 pillow covers", "Full bed set", "Custom set"],
    unitOfMeasure: ["Pieces", "Sets"],
    certifications: CERTS_HT,
  },

  "Pillow Covers": {
    constructionLabel: "Weave / Construction",
    constructionOptions: BED_LINEN_CONSTRUCTION,
    constructionOtherPlaceholder: "e.g. Bamboo-Cotton, Tencel / Lyocell",
    weightLabel: "Thread Count (TC)",
    weightPlaceholder: "e.g. 300 TC",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "Standard 50×75 cm", "Queen 50×90 cm", "Euro / Square 65×65 cm",
      "Oxford 50×75 cm + 5 cm flange", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showClosureType: true,
    closureOptions: ["Button", "Zip", "Open-end", "Envelope", "Other"],
    showWarpWeft: true,
    styleLabel: "Pillow Cover Format",
    styleOptions: [
      "Standard pillowcase", "Oxford pillowcase (flanged)",
      "Continental / Euro square", "Body pillow case", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: [
      "Embroidered design", "All-over reactive print", "Jacquard woven",
      "Plain / solid", "No decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["All-over", "Border / flange", "No decoration"],
    finishingOptions: BED_LINEN_FINISHING,
    individualPackOptions: PACK_HT_STANDARD,
    setCompositionOptions: ["Single piece", "2-pack (pair)", "4-pack", "Custom set"],
    unitOfMeasure: ["Pieces", "Pairs", "Sets"],
    certifications: CERTS_HT,
  },

  "Cushion Covers": {
    constructionLabel: "Weave / Construction",
    constructionOptions: [
      ...BED_LINEN_CONSTRUCTION,
      "Velvet (polyester / cotton)", "Canvas (decorative)", "Jute / Natural Fibre",
    ],
    constructionOtherPlaceholder: "e.g. Macramé, Embroidered panel fabric",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 250 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "40×40 cm", "45×45 cm", "50×50 cm", "60×60 cm", "Oblong 30×50 cm", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showClosureType: true,
    closureOptions: ["Zip", "Button", "Envelope", "Other"],
    showWarpWeft: true,
    styleLabel: "Cushion Border",
    styleOptions: ["Plain (no border)", "Oxford / flange border", "Piped / corded edge", "Ruffled edge", "Other"],
    designLabel: "Design",
    printTypeOptions: [
      "Embroidered design", "All-over reactive / digital print",
      "Jacquard woven", "Appliqué", "Plain / solid", "No decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["All-over", "Front face only", "No decoration"],
    finishingOptions: [
      "Soft hand finish", "Anti-bacterial", "Wrinkle Resistant", "No special finish",
    ],
    individualPackOptions: PACK_HT_STANDARD,
    setCompositionOptions: ["Single piece", "2-pack", "4-pack", "Custom set"],
    unitOfMeasure: ["Pieces", "Sets"],
    certifications: CERTS_HT,
  },

  "Curtains": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Plain Weave", "Jacquard", "Voile / Sheer", "Blackout Woven (coated)",
      "Twill", "Linen / Linen-Look", "Velvet (polyester)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Organza, Chenille, Dupioni",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 280 gsm",
    sizeLabel: "Panel Size",
    sizeOptions: [
      "90×137 cm (short)", "90×183 cm (standard)", "90×274 cm (extra long)",
      "137×183 cm", "137×274 cm", "Custom width & drop",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showHeadingType: true,
    headingOptions: ["Rod pocket", "Eyelet / Grommet", "Pinch pleat", "Tab top", "Ring top", "Other"],
    showLiningType: true,
    liningOptions: ["Unlined", "Lined", "Interlined / Blackout lined", "Other"],
    showWarpWeft: true,
    styleLabel: "Curtain Type",
    styleOptions: ["Sheer / voile panel", "Blackout panel", "Semi-sheer", "Thermal / insulating", "Decorative / Jacquard", "Other"],
    designLabel: "Design",
    printTypeOptions: [
      "Printed pattern (full drop)", "Embroidered panel", "Jacquard woven", "Plain / no decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["Full drop", "Panel", "Border", "No decoration"],
    finishingOptions: [
      "Blackout coating", "Thermal / Insulating", "Fire Retardant (FR)", "Anti-UV", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag (per panel)", "Retail box (pair)", "Tied roll", "Bulk",
    ],
    setCompositionOptions: ["Single panel", "Pair (2 panels)", "Custom set"],
    unitOfMeasure: ["Panels", "Pairs", "Sets"],
    certifications: CERTS_HT,
  },

  "Kitchen Towels": {
    constructionLabel: "Weave / Structure",
    constructionOptions: [
      "Waffle / Honeycomb (primary)", "Huck Weave", "Plain Weave", "Terry Loop", "Dobby Weave", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Linen-cotton, Microfiber",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 180 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: ["Small 40×60 cm", "Standard 45×65 cm", "Large 50×70 cm", "Custom"],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    showPileGround: true,
    styleLabel: "Hanging Loop",
    styleOptions: ["No loop", "Loop at top center", "Button loop (corner)", "Tie strings", "Other"],
    designLabel: "Design",
    printTypeOptions: [
      "Yarn-dyed stripe / check", "Full face reactive print",
      "Embroidery", "No decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["Full face", "Border", "Yarn-dyed pattern", "Corner embroidery", "No decoration"],
    finishingOptions: [
      "Anti-bacterial", "Stain Repellent", "Anti-grease", "Enzyme wash", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "2-pack banded", "4-pack banded", "Header card (2–3 pack)", "Bulk",
    ],
    setCompositionOptions: ["Single piece", "2-pack", "4-pack", "6-pack", "Custom set"],
    unitOfMeasure: ["Pieces", "Packs", "Dozens"],
    certifications: CERTS_HT,
  },

  "Bar Mops": {
    constructionLabel: "Weave / Structure",
    constructionOptions: ["Heavy Terry Loop", "Huck Weave", "Other"],
    constructionOtherPlaceholder: "e.g. Microfiber, Canvas-weight cotton",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 500 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: ["Standard 35×60 cm", "Heavy 35×65 cm", "Custom"],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    showPileGround: true,
    styleLabel: "Bar Mop Application",
    styleOptions: ["Bar / hospitality", "Kitchen / culinary", "Spa / wellness", "Industrial utility", "Other"],
    designLabel: "Design",
    printTypeOptions: ["Plain white", "White with colored border"],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["Border", "Plain / no decoration"],
    finishingOptions: ["Anti-bacterial", "No special finish"],
    individualPackOptions: [
      "Dozen (12 pcs) banded", "24-pack banded", "Case (144 pcs)", "Bulk",
    ],
    setCompositionOptions: ["Dozen (12 pcs)", "24-pack", "Case (144 pcs)", "Custom"],
    unitOfMeasure: ["Pieces", "Dozens", "Cases (144 pcs)"],
    certifications: CERTS_HT,
  },

  "Aprons": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Canvas (heavy: 280–400 gsm)", "Plain Weave / Poplin", "Denim",
      "Terry (chef / kitchen)", "Ripstop", "Waxed Cotton", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Linen, Oil cloth, Poly-cotton blend",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 300 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: ["Bib apron 60×90 cm", "Waist apron 60×40 cm", "Cobbler (full coverage)", "Custom"],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    styleLabel: "Apron Cut",
    styleOptions: ["Bib apron (full front, with chest)", "Waist / half apron", "Cobbler (all-sides coverage)", "Crossback apron", "Chef adjustable apron", "Other"],
    designLabel: "Print Type",
    printTypeOptions: [
      "Screen print", "Digital print", "Embroidery", "Heat transfer", "No decoration",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Front chest / bib", "Lower bib", "Pocket area", "All-over print", "No decoration",
    ],
    finishingOptions: [
      "DWR / Water Repellent", "Stain Repellent", "Anti-bacterial", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Retail hanger bag", "Header card", "Bulk",
    ],
    setCompositionOptions: ["Single piece", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_HT,
  },

  "Pot Holders": {
    constructionLabel: "Construction",
    constructionOptions: [
      "Terry Double-layer (insulated)", "Quilted Cotton (multi-layer)",
      "Waffle Weave + batting", "Canvas + silicone lining", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Aramid fibre insulation, Neoprene backing",
    weightLabel: "Heat Rating",
    weightPlaceholder: "e.g. Up to 200°C",
    sizeLabel: "Standard Size",
    sizeOptions: ["Square 18×18 cm", "Standard 20×20 cm", "Oven Mitt 17×28 cm", "Custom"],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showHeatingRating: true,
    heatingOptions: [
      "Up to 150°C", "Up to 180°C", "Up to 200°C", "Up to 220°C (silicone lined)", "Other",
    ],
    styleLabel: "Product Shape",
    styleOptions: ["Square pot holder", "Round pot holder", "Oven mitt (full hand)", "Mini / cocktail mitt", "Other"],
    designLabel: "Design",
    printTypeOptions: [
      "Reactive / screen print (face)", "Embroidered motif", "No decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["One-side face print", "Embroidered motif", "No decoration"],
    finishingOptions: [
      "Heat Resistant lining (FR batting)", "Non-slip surface (silicone dots)", "No special finish",
    ],
    individualPackOptions: [
      "2-pack banded (pair)", "Blister card (2-pack)", "Header card (single)", "Bulk",
    ],
    setCompositionOptions: ["Single piece", "2-pack (pair)", "4-pack", "Custom set"],
    unitOfMeasure: ["Pieces", "Pairs (2-pack)", "Sets"],
    certifications: CERTS_HT,
  },

  "Table Covers": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Cotton Damask / Jacquard (formal)", "Plain Weave / Poplin", "Satin Weave",
      "Dobby / Waffle", "Linen / Linen-Look", "Poly-Cotton (easy care)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Vinyl / PVC coating, Hemp-cotton",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 250 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "Rectangular 132×178 cm (4-seat)", "Rectangular 152×213 cm (6-seat)",
      "Rectangular 178×274 cm (8-seat)", "Round 152 cm dia.",
      "Square 137×137 cm", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    styleLabel: "Table Cover Style",
    styleOptions: [
      "Flat tablecloth", "Fitted / stretch tablecloth",
      "Table runner", "Placemat set", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: [
      "Embroidered hem / border", "Woven jacquard (all-over)",
      "Printed design", "Plain / no decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["Hem / border", "All-over", "No decoration"],
    finishingOptions: [
      "Wrinkle Resistant", "Water / Stain Repellent", "Soft finish", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Retail box", "Zippered pouch", "Bulk",
    ],
    setCompositionOptions: ["Single piece", "2-piece set", "Custom set"],
    unitOfMeasure: ["Pieces", "Sets"],
    certifications: CERTS_HT,
  },

  "Cellular Thermal Blanket": {
    constructionLabel: "Weave / Structure",
    constructionOptions: ["Cellular / Open-Cell Weave 100% Cotton", "Other"],
    constructionOtherPlaceholder: "e.g. Modified open-cell with cotton-polyester blend",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 200 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "Cot / Baby 75×100 cm", "Pram 70×90 cm", "Single 150×200 cm",
      "Double 180×200 cm", "King 230×220 cm", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    styleLabel: "Blanket Application",
    styleOptions: [
      "Baby / infant (hospital / home)", "Adult residential",
      "Hospital / healthcare (institutional)", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: ["Plain white / cream", "Basic yarn-dyed pattern"],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["All-over (woven-in)", "Plain"],
    finishingOptions: ["Anti-shrink", "No special finish"],
    individualPackOptions: [
      "Individual polybag", "Retail box", "Zippered carry bag",
      "Dozen pack (institutional)", "Bulk",
    ],
    setCompositionOptions: ["Single piece", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_HT,
  },

  "Fleece Thermal Blankets": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Anti-Pill Polar Fleece 100% Polyester", "Sherpa Fleece (double-sided)",
      "Mink Touch / Velvet print", "Woven Jacquard", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Recycled PET fleece, Bamboo fleece",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 200 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "Baby / Cot 75×100 cm", "Throw 125×150 cm", "Single 150×200 cm",
      "Double 200×200 cm", "King 240×220 cm", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    styleLabel: "Blanket Style",
    styleOptions: ["Throw (sofa / couch)", "Bed blanket (flat)", "Sherpa (double-sided plush)", "Baby blanket", "Stadium / travel throw", "Other"],
    designLabel: "Print Type",
    printTypeOptions: [
      "Sublimation / reactive print (all-over)", "Embroidered corner",
      "Jacquard woven", "Plain / no decoration",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["All-over", "Corner embroidery", "No decoration"],
    finishingOptions: [
      "Anti-pill", "Anti-static", "Flame Retardant (FR) (institutional use)",
      "Hypoallergenic", "Ultra-soft brushed", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Retail box", "Zippered carry bag",
      "Vacuum packed", "Bulk folded",
    ],
    setCompositionOptions: ["Single piece", "2-piece set", "Custom set"],
    unitOfMeasure: UOM_PIECES_DOZENS,
    certifications: CERTS_HT,
  },

  "Doctor Surgical Gowns": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Plain Weave TC 65/35 Poly-Cotton (reusable)", "Plain Weave 100% Cotton",
      "Non-Woven Polypropylene (disposable)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. SMS non-woven, Spunbond polyester",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 150 gsm",
    sizeLabel: "Size Range",
    sizeOptions: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "One Size (disposable)", "Custom"],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    isMedical: true,
    styleLabel: "Gown Style",
    styleOptions: [
      "Wraparound (full coverage)", "Standard back-tie",
      "Impervious zone (reinforced front / sleeves)", "Sterile individually wrapped", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: ["Embroidered logo (chest)", "Heat transfer logo", "No decoration"],
    printPlacementLabel: "Placement",
    printPlacementOptions: ["Left chest", "Back center", "No decoration"],
    finishingOptions: [
      "Anti-bacterial", "Fluid / Blood Repellent", "Anti-static",
      "Sterilizable / Autoclave Safe", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Institutional pack (5 pcs)", "Institutional pack (12 pcs)",
      "Individually wrapped (sterile)", "Bulk carton",
    ],
    setCompositionOptions: ["Single piece", "5-pack", "12-pack", "Custom set"],
    unitOfMeasure: ["Pieces", "Sets (5-pack)", "Cases (12-pack)"],
    certifications: CERTS_MEDICAL,
  },

  "Medical Scrubs": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Twill 65/35 TC Poly-Cotton (standard)", "100% Cotton Twill",
      "4-Way Stretch (Poly/Spandex)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Moisture-wicking performance poly, Bamboo blend",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 175 gsm",
    sizeLabel: "Size Range",
    sizeOptions: ["XS–3XL", "Petite XS–2XL", "Tall XS–2XL", "Custom"],
    showFitType: true,
    fitOptions: ["Regular Fit", "Slim / Modern Fit", "Relaxed Fit"],
    showSizeStandard: false,
    showWarpWeft: true,
    isMedical: true,
    styleLabel: "Scrub Style",
    styleOptions: [
      "Classic V-neck top + drawstring pants", "Mock wrap top",
      "Cargo scrubs (extra pockets)", "Jogger scrub pants", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: ["Embroidery (logo / name)", "Heat transfer", "No decoration"],
    printPlacementLabel: "Placement",
    printPlacementOptions: ["Left chest", "Right chest", "No decoration"],
    finishingOptions: [
      "Anti-bacterial", "Fluid Repellent", "Anti-static",
      "Moisture Wicking", "Sterilizable", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Set packed (top + bottom)", "Institutional case", "Bulk",
    ],
    setCompositionOptions: ["Top only", "Bottom only", "2-piece set (top + bottom)", "Custom"],
    unitOfMeasure: ["Pieces", "Sets (top + bottom)", "Cases"],
    certifications: CERTS_MEDICAL,
  },

  "Patient Gowns": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Plain Weave 100% Cotton (primary)", "TC Poly-Cotton 65/35", "Jersey Knit (wrap-style)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Flannel cotton, Microfiber",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 130 gsm",
    sizeLabel: "Size Range",
    sizeOptions: ["Pediatric XS/S", "S/M", "L/XL", "XXL/3XL", "One Size", "Custom"],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    isMedical: true,
    styleLabel: "Gown Opening",
    styleOptions: ["Open back (standard tie)", "Double-backed / wrap", "Side opening", "Front opening / tie", "Other"],
    designLabel: "Design",
    printTypeOptions: [
      "Plain (standard hospital)", "Printed pattern (pediatric / decorative)",
    ],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["All-over (printed pattern)", "Plain"],
    finishingOptions: [
      "Anti-bacterial", "Fluid Repellent", "Sterilizable / Autoclave Safe", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Institutional pack (5 pcs)", "Institutional case", "Bulk",
    ],
    setCompositionOptions: ["Single piece", "5-pack", "Custom set"],
    unitOfMeasure: ["Pieces", "Sets", "Cases"],
    certifications: CERTS_MEDICAL,
  },

  "Surgical Huck Towels": {
    constructionLabel: "Weave / Structure",
    constructionOptions: ["Huck / Honeycomb Weave 100% Cotton", "Other"],
    constructionOtherPlaceholder: "e.g. Waffle weave cotton, Linen huck",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 220 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: ["Standard 40×75 cm", "Large 45×100 cm", "Custom"],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    isMedical: true,
    styleLabel: "Towel Application",
    styleOptions: [
      "Surgical / OR (sterile pack)", "Medical exam room (utility)",
      "Institutional (non-sterile)", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: ["Plain white", "Blue stripe (absorbent side marker)"],
    printPlacementLabel: "Design",
    printPlacementOptions: ["Plain white", "Blue stripe edge"],
    finishingOptions: ["Pre-washed / Shrink Resistant", "No special finish"],
    individualPackOptions: [
      "Dozen (12 pcs) banded", "24-pack banded", "50-pack bulk", "Bulk carton",
    ],
    setCompositionOptions: ["Dozen (12 pcs)", "24-pack", "50-pack", "Custom"],
    unitOfMeasure: ["Pieces", "Dozens", "Gross (144 pcs)"],
    certifications: CERTS_MEDICAL,
  },

  "Shop Towels": {
    constructionLabel: "Weave / Structure",
    constructionOptions: [
      "Heavy Cotton Terry Loop", "Huck Weave", "Plain Weave (canvas-weight)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Microfiber, Non-woven industrial",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 380 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: ["Standard 35×35 cm", "Large 40×50 cm", "Industrial roll", "Custom"],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    showPileGround: true,
    styleLabel: "Shop Towel Application",
    styleOptions: [
      "Automotive / garage", "Industrial cleaning",
      "Food service (color-coded)", "Janitorial", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: ["Plain white", "Blue and white stripe"],
    printPlacementLabel: "Design",
    printPlacementOptions: ["Plain", "Stripe"],
    finishingOptions: [
      "Oil Absorbent treatment", "Anti-bacterial", "No special finish",
    ],
    individualPackOptions: [
      "Dozen (12 pcs) banded", "50-pack bulk", "200-pack bulk", "Bulk carton",
    ],
    setCompositionOptions: ["Dozen (12 pcs)", "50-pack", "200-pack", "Custom"],
    unitOfMeasure: ["Pieces", "Dozens", "Cases"],
    certifications: CERTS_HT,
  },

  "Fender Covers": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Knitted Terry (stretchy — primary)", "Woven Terry",
      "Chenille", "Microfiber (non-scratch)", "Other",
    ],
    constructionOtherPlaceholder: "e.g. Bamboo terry, Anti-scratch velour",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 350 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "Small 28×45 cm", "Standard 35×55 cm", "Large 45×65 cm", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showPileGround: true,
    styleLabel: "Vehicle Type",
    styleOptions: [
      "Standard passenger car", "Truck / SUV (larger)",
      "Motorcycle", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: ["Plain", "Company logo embroidery"],
    printPlacementLabel: "Placement",
    printPlacementOptions: ["Center embroidery", "Plain / no decoration"],
    finishingOptions: [
      "Non-scratch surface", "Oil & solvent resistant", "No special finish",
    ],
    individualPackOptions: ["2-pack (pair)", "4-pack", "Bulk carton"],
    setCompositionOptions: ["Single piece", "Pair (2 pcs)", "4-pack", "Custom"],
    unitOfMeasure: ["Pieces", "Pairs", "Sets"],
    certifications: CERTS_HT,
  },

  "Ihram": {
    constructionLabel: "Weave / Structure",
    constructionOptions: [
      "Plain Weave 100% White Cotton (primary)",
      "Terry Weave (lightweight cotton)",
      "Dobby stripe cotton",
      "Other",
    ],
    constructionOtherPlaceholder: "e.g. Organic cotton plain weave",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 250 gsm",
    sizeLabel: "Standard Size",
    sizeOptions: [
      "Standard pair (90×150 cm each)", "Small pair (80×140 cm)",
      "Large pair (100×170 cm)", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    showWarpWeft: true,
    isIhram: true,
    styleLabel: "Ihram Weight",
    styleOptions: [
      "Standard weight (250–300 gsm)", "Lightweight travel set (180–240 gsm)",
      "Premium weight (320+ gsm)", "Other",
    ],
    designLabel: "Design",
    printTypeOptions: ["Plain — no decoration (religious requirement)"],
    printPlacementLabel: "Design Placement",
    printPlacementOptions: ["Plain / No decoration"],
    finishingOptions: [
      "Soft hand / Silicone finish", "Anti-shrink", "No special finish",
    ],
    individualPackOptions: [
      "Pair pack (2 pieces — top + bottom)", "Individual piece",
      "Retail poly pack (pair)", "Bulk carton",
    ],
    setCompositionOptions: ["Pair (2-piece set)", "Single piece", "Custom"],
    unitOfMeasure: ["Pairs (2-piece sets)", "Pieces"],
    certifications: CERTS_HT,
  },

  // ── FABRIC ───────────────────────────────────────────────────────────────────

  "Apparel Fabric": {
    constructionLabel: "Fabric Category",
    constructionOptions: ["Knitted", "Woven", "Non-woven", "Other"],
    constructionOtherPlaceholder: "e.g. Bonded / laminated, Coated fabric",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 160 gsm",
    sizeLabel: "Fabric Width",
    sizeOptions: [
      "44\" / 112 cm", "58–60\" / 147–152 cm", "72\" / 183 cm",
      "90\" / 228 cm", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    isFabricRoll: true,
    showWarpWeft: true,
    showPileGround: true,
    styleLabel: "",
    styleOptions: STYLE_NONE,
    designLabel: "Fabric State",
    printTypeOptions: [
      "Greige / Raw", "Bleached", "Piece Dyed (Solid)", "Yarn Dyed", "Printed",
      "To be discussed",
    ],
    printPlacementLabel: "Pattern",
    printPlacementOptions: [
      "Solid / piece dyed", "Yarn dyed stripe / check", "All-over print",
      "Jacquard woven", "Plain greige",
    ],
    finishingOptions: [
      "Soft hand / Silicone", "Anti-pill", "Anti-shrink / Compacted",
      "Enzyme treatment / Bio-finish", "Peached / Sueded", "Brushed",
      "Moisture Wicking", "Mercerized", "Wrinkle Resistant", "Anti-static", "No special finish",
    ],
    individualPackOptions: [
      "50m per roll", "100m per roll", "150m per roll", "200m per roll", "Custom / To be confirmed",
    ],
    setCompositionOptions: ["Single roll", "Multi-roll order", "To be confirmed"],
    unitOfMeasure: ["Meters", "Kg", "Rolls"],
    certifications: CERTS_FABRIC,
  },

  "Home Textile Fabric": {
    constructionLabel: "Fabric Category",
    constructionOptions: ["Woven", "Terry", "Knitted", "Other"],
    constructionOtherPlaceholder: "e.g. Bonded / laminated, Non-woven",
    weightLabel: "GSM / Thread Count",
    weightPlaceholder: "e.g. 500 gsm",
    sizeLabel: "Fabric Width",
    sizeOptions: [
      "44\" / 112 cm", "58–60\" / 147–152 cm", "72\" / 183 cm",
      "90\" / 228 cm", "108\" / 274 cm", "Custom",
    ],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    isFabricRoll: true,
    showWarpWeft: true,
    showPileGround: true,
    styleLabel: "",
    styleOptions: STYLE_NONE,
    designLabel: "Fabric State",
    printTypeOptions: [
      "Greige / Raw", "Bleached", "Piece Dyed (Solid)", "Yarn Dyed", "Printed",
      "To be discussed",
    ],
    printPlacementLabel: "Pattern",
    printPlacementOptions: [
      "Solid / piece dyed", "Yarn dyed stripe", "All-over print",
      "Jacquard woven", "Plain greige",
    ],
    finishingOptions: [
      "Soft hand / Silicone", "Anti-bacterial", "Anti-shrink",
      "Velour / Shearing finish", "Moisture Wicking", "Wrinkle Resistant",
      "Flame Retardant (FR)", "No special finish",
    ],
    individualPackOptions: [
      "50m per roll", "100m per roll", "150m per roll", "200m per roll", "Custom / To be confirmed",
    ],
    setCompositionOptions: ["Single roll", "Multi-roll order", "To be confirmed"],
    unitOfMeasure: ["Meters", "Kg", "Rolls"],
    certifications: CERTS_FABRIC,
  },

  // ── GENERIC FALLBACK ─────────────────────────────────────────────────────────

  "Other / Multiple": {
    constructionLabel: "Fabric Type",
    constructionOptions: [
      "Single Jersey", "Pique", "French Terry", "Fleece", "Twill", "Plain Weave",
      "Terry Loop", "Waffle / Honeycomb", "Other",
    ],
    constructionOtherPlaceholder: "Describe your fabric / construction requirements",
    weightLabel: "GSM",
    weightPlaceholder: "e.g. 200 gsm",
    sizeLabel: "Size Range",
    sizeOptions: ["XS–XL", "XS–3XL", "S–XXL", "Standard", "Custom", "To be confirmed"],
    showFitType: false,
    fitOptions: [],
    showSizeStandard: false,
    styleLabel: "",
    styleOptions: STYLE_NONE,
    designLabel: "Print Type",
    printTypeOptions: [
      "Screen Print", "Embroidery", "Digital / DTG", "Heat Transfer",
      "Sublimation", "No decoration", "Other",
    ],
    printPlacementLabel: "Placement",
    printPlacementOptions: [
      "Front chest", "Back", "Sleeve", "All-over", "No decoration", "Other",
    ],
    finishingOptions: [
      "Soft hand finish", "Anti-bacterial", "Anti-shrink",
      "Moisture Wicking", "No special finish",
    ],
    individualPackOptions: [
      "Individual polybag", "Retail box", "Bulk / export pack", "To be confirmed",
    ],
    setCompositionOptions: ["Single piece", "Custom set", "To be confirmed"],
    unitOfMeasure: ["Pieces", "Dozens", "Sets", "Meters", "Kg"],
    certifications: [
      "GOTS", "OEKO-TEX", "BSCI", "Sedex", "ISO 9001", "GRS", "WRAP", "BCI", "SA8000", "Bluesign",
      "Other (specify below)", "None required",
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProductOptions(productType: string): ProductOptions {
  return PRODUCT_OPTIONS[productType] ?? PRODUCT_OPTIONS["Other / Multiple"];
}

export const HOW_HEAR_OPTIONS: string[] = [
  "Google Search",
  "LinkedIn",
  "Trade Show / Exhibition",
  "Referral from a Contact",
  "Social Media (Facebook / Instagram)",
  "Industry Directory",
  "Other",
];

export const APPAREL_TYPES: string[] = [
  "T-Shirts", "Polo Shirts", "Henley Shirts", "Sweatshirts & Hoodies",
  "Sweatpants & Joggers", "Tank Tops", "Denim Jeans", "Formal & Casual Shirts",
  "Pants & Trousers", "Cargo Pants", "Shorts",
  "Baby & Kids Apparel",
  "T-Shirts for Kids", "Swaddle Muslin Fabric", "Overalls",
  "Baby Rompers", "Baby Bibs", "Baby Hooded Towels",
  "Workwear Apparel", "Socks", "Other / Multiple",
];

export const HOME_TEXTILE_TYPES: string[] = [
  "Towels", "Institutional Towels", "Bathrobes", "Bath Mats", "Beach & Pool Towels",
  "Bedsheets", "Fitted Sheets", "Duvet Covers", "Pillow Covers", "Cushion Covers", "Curtains",
  "Kitchen Towels", "Bar Mops", "Aprons", "Pot Holders",
  "Table Covers", "Cellular Thermal Blanket", "Fleece Thermal Blankets",
  "Doctor Surgical Gowns", "Medical Scrubs", "Patient Gowns", "Surgical Huck Towels",
  "Shop Towels", "Fender Covers", "Ihram", "Other / Multiple",
];

export const FABRIC_TYPES: string[] = [
  "Apparel Fabric", "Home Textile Fabric", "Other / Multiple",
];
