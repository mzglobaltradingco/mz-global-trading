// Full content for /downloads/[slug]/ print-ready document pages.

export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "check"; title?: string; items: string[] }
  | { type: "note"; text: string }
  | { type: "fields"; items: { label: string; hint?: string }[] };

export type DocKind = "Reference" | "Checklist" | "Template" | "Policy";

export interface DownloadDoc {
  slug: string;
  keywords: string[];
  category: "company" | "quality" | "technical" | "trade";
  kind: DocKind;
  title: string;
  subtitle: string;
  description: string;
  blocks: DocBlock[];
}

export const DOWNLOAD_DOCS: DownloadDoc[] = [
  // ───────────────────────────────────────── Company
  {
    slug: "company-profile",
    keywords: ["MZ Global Trading company profile", "Pakistan textile sourcing company", "textile supplier company profile"],
    category: "company",
    kind: "Reference",
    title: "Company Profile",
    subtitle: "MZ Global Trading — B2B Textile Sourcing from Pakistan",
    description:
      "Full company overview — sourcing capabilities, factory network, certifications, process and contact details. Share with stakeholders before placing an order.",
    blocks: [
      { type: "h2", text: "Who We Are" },
      { type: "p", text: "MZ Global Trading is a Pakistan-based B2B textile sourcing company serving procurement managers, import directors, brand owners and retail buyers across the USA, UK, Canada, Europe and South America. We connect international buyers with vetted, certified Pakistani manufacturers across apparel, home textiles and fabric — and stay accountable for the order from enquiry to delivered shipment." },
      { type: "table", headers: ["Company facts", ""], rows: [
        ["Legal name", "MZ Global Trading"],
        ["Founder & CEO", "Muhammad Muzammil"],
        ["Head office", "Office G20, Ground Floor, Columbus Tower, Main Clifton Road, Karachi 75600, Pakistan"],
        ["Business email", "info@mzglobaltrading.com"],
        ["Phone / WhatsApp", "+92 300 8256203"],
        ["Website", "https://mzglobaltrading.com"],
        ["Markets served", "USA, Canada, UK, Europe, South America"],
        ["Export ports", "Karachi Port / Port Qasim (FOB standard)"],
      ]},
      { type: "h2", text: "Product Categories" },
      { type: "table", headers: ["Category", "Product lines"], rows: [
        ["Apparel — Knitted", "T-shirts, polo shirts, henley shirts, sweatshirts & hoodies, sweatpants & joggers, tank tops"],
        ["Apparel — Woven", "Denim jeans, formal & casual shirts, pants & trousers, cargo pants, shorts"],
        ["Apparel — Baby & Kids", "Kids t-shirts, swaddle muslin, overalls, rompers, bibs, hooded towels"],
        ["Apparel — Specialised", "Workwear apparel, socks"],
        ["Home Textiles — Bath", "Towels, institutional towels, bathrobes, bath mats, beach & pool towels"],
        ["Home Textiles — Bed", "Bedsheets, fitted sheets, duvet covers, pillow & cushion covers, curtains"],
        ["Home Textiles — Kitchen & Table", "Kitchen towels, bar mops, aprons, pot holders, table covers"],
        ["Home Textiles — Institutional", "Hospital linen (gowns, scrubs, huck towels), thermal blankets, industrial linen, Ihram"],
        ["Fabric", "Apparel fabric and home textile fabric — knitted, woven and terry, by the roll"],
      ]},
      { type: "h2", text: "How We Work" },
      { type: "ol", items: [
        "Requirement analysis — your specification or Tech Pack is reviewed and converted into a factory-ready brief.",
        "Factory allocation — the order is matched to a vetted factory whose machinery, certifications and capacity fit the product.",
        "Sampling — development and pre-production samples supervised and couriered for your written approval.",
        "Production control — in-line inspections and weekly status reporting with photographs.",
        "Final inspection — ISO 2859-1 AQL Level II random inspection per the agreed order scope, with a photographic report before release.",
        "Shipment & documents — loading supervision, export clearance and a verified document set for your customs broker.",
      ]},
      { type: "h2", text: "Quality & Compliance" },
      { type: "p", text: "Factories in our network hold certifications appropriate to their products and markets, including OEKO-TEX Standard 100, GOTS, BSCI, Sedex, ISO 9001, GRS, WRAP, BCI, SA8000 and bluesign. Certificates for the specific factory allocated to your order are supplied and independently verifiable before bulk production begins." },
      { type: "h2", text: "Why Buyers Choose Pakistan — and Us" },
      { type: "ul", items: [
        "Domestic cotton base and vertical integration — shorter lead times and stable pricing on cotton-rich products",
        "GSP+ duty-free access to the EU for most textile categories",
        "Category leadership in terry towels, denim, knits and bed linen",
        "One accountable contact on the ground — sourcing, QC, logistics and documentation handled as one service",
      ]},
      { type: "note", text: "To start a conversation, submit a structured RFQ at mzglobaltrading.com/rfq/ or email info@mzglobaltrading.com — quotations are issued within 3–5 business days." },
    ],
  },
  {
    slug: "factory-network-overview",
    keywords: ["Pakistan textile factory network", "vetted garment factories Pakistan", "textile supplier qualification process"],
    category: "company",
    kind: "Reference",
    title: "Factory Network Overview",
    subtitle: "Vetted manufacturing partners by product category",
    description:
      "Summary of our vetted factory network — product specialisations, certification coverage and how facilities are qualified before any order is placed.",
    blocks: [
      { type: "p", text: "MZ Global Trading does not own factories — deliberately. Owning one factory means selling you that factory's capability whether it fits or not. Instead we maintain a vetted network of specialised manufacturers across Pakistan's main textile clusters, and allocate each order to the facility whose machinery, certifications and capacity genuinely fit the product. This document describes the network's structure and our qualification process." },
      { type: "h2", text: "Network Coverage by Category" },
      { type: "table", headers: ["Category", "Cluster locations", "Typical certifications held"], rows: [
        ["Terry towels & bath linen", "Karachi, Faisalabad", "OEKO-TEX 100, BSCI, ISO 9001, GOTS (selected)"],
        ["Knitted apparel", "Karachi, Lahore, Faisalabad", "OEKO-TEX 100, BSCI/Sedex, WRAP, GOTS/GRS (selected)"],
        ["Denim & woven bottoms", "Karachi, Lahore", "BSCI, ISO 9001, OEKO-TEX 100, laser/eco-wash laundries"],
        ["Woven shirts & workwear", "Lahore, Faisalabad", "BSCI/Sedex, ISO 9001, EN ISO 13688 (workwear)"],
        ["Bed linen & home wovens", "Faisalabad, Karachi", "OEKO-TEX 100, BSCI, GOTS (selected), wide-width capacity"],
        ["Hospital & institutional linen", "Karachi, Faisalabad", "ISO 9001, ISO 13485 / EN 13795 (selected), BSCI"],
        ["Socks & accessories", "Karachi, Sialkot", "OEKO-TEX 100, BSCI, ISO 9001"],
        ["Fabric mills (knit / woven / terry)", "Faisalabad, Karachi, Lahore", "OEKO-TEX 100, ISO 9001, GOTS/GRS (selected)"],
      ]},
      { type: "h2", text: "How a Factory Enters the Network" },
      { type: "ol", items: [
        "Document screening — legal registration, export licence, certification certificates verified in issuer databases.",
        "On-site technical audit — machinery list, capacity, in-line quality system, lab equipment, calibration records.",
        "Social compliance review — current BSCI/Sedex/WRAP audit rating checked; critical findings disqualify.",
        "Trial order monitoring — first orders receive enhanced inspection frequency before the factory earns standard status.",
        "Ongoing scorecard — every shipment's inspection results, on-time performance and claim history feed a rolling score; underperformers are suspended.",
      ]},
      { type: "h2", text: "What This Means for Your Order" },
      { type: "ul", items: [
        "Your towels are made in a towel mill and your polos in a knitwear unit — never forced into a mismatched facility.",
        "Certificates supplied to you belong to the actual producing unit, verified, current and scope-matched.",
        "Capacity is confirmed before order acceptance — your delivery date is based on the allocated factory's real loading.",
        "If a factory underperforms mid-program, the network provides qualified alternatives without restarting your sourcing from zero.",
      ]},
      { type: "note", text: "Factory names and audit reports for the unit allocated to your order are disclosed under NDA during order confirmation. Request specifics at info@mzglobaltrading.com." },
    ],
  },
  {
    slug: "sustainable-sourcing-policy",
    keywords: ["sustainable textile sourcing policy", "ethical textile supply chain Pakistan", "textile supplier code of conduct"],
    category: "company",
    kind: "Policy",
    title: "Sustainable Sourcing Policy",
    subtitle: "Environmental, social and chemical commitments across our supply chain",
    description:
      "Our documented commitments on environmental responsibility, ethical labour standards and restricted substance compliance across the supply chain.",
    blocks: [
      { type: "p", text: "This policy defines the minimum environmental, social and chemical standards MZ Global Trading applies when selecting and retaining manufacturing partners, and the commitments we make to buyers who source through us. It applies to all orders, all product categories and all factories in our network." },
      { type: "h2", text: "1. Ethical Labour Standards" },
      { type: "ul", items: [
        "No child labour and no forced, bonded or involuntary labour, in line with ILO core conventions.",
        "Legal minimum wages or above, documented working hours, and freedom of association respected.",
        "Safe buildings and workplaces — fire safety, machine guarding and emergency preparedness verified at audit.",
        "Factories must hold a current social audit (amfori BSCI, Sedex/SMETA, WRAP or SA8000); critical findings disqualify a facility until remediated.",
      ]},
      { type: "h2", text: "2. Environmental Responsibility" },
      { type: "ul", items: [
        "Preference for vertically integrated and cluster-local supply chains, reducing transport emissions between processing stages.",
        "Dye-houses must operate functioning effluent treatment and comply with national environmental regulations.",
        "Support for certified sustainable fibre programs: organic cotton (GOTS), Better Cotton (BCI), recycled fibres (GRS) — offered on request for any compatible product.",
        "Progressive water- and energy-reduction practices (low liquor-ratio dyeing, heat recovery) weighted positively in factory scoring.",
      ]},
      { type: "h2", text: "3. Chemical & Product Safety" },
      { type: "ul", items: [
        "Products comply with the destination market's chemical regulations: EU REACH, US CPSIA (children's products), UK REACH.",
        "OEKO-TEX Standard 100 certification available across product categories; Class 1 (baby-safe) for infant items.",
        "Restricted Substances List (RSL) compliance — see our separate RSL reference document for substance groups and limits.",
        "Azo dyes releasing restricted arylamines, chlorinated phenols, cadmium, lead and nickel above limits are prohibited in all products.",
      ]},
      { type: "h2", text: "4. Traceability & Transparency" },
      { type: "ul", items: [
        "Every order is traceable to its producing factory; certificates supplied belong to that specific unit.",
        "Chain-of-custody documentation (transaction certificates) provided for GOTS and GRS claimed orders.",
        "Buyers may audit, or appoint third parties to audit, the allocated factory with reasonable notice.",
      ]},
      { type: "h2", text: "5. Continuous Improvement" },
      { type: "p", text: "This policy is reviewed annually. Factories failing to maintain the standards above are suspended from the network until verified remediation. Buyers with stricter codes of conduct may supply their own requirements, which we contractually flow down to the producing factory." },
      { type: "note", text: "Policy owner: Muhammad Muzammil, Founder & CEO. Questions and audit requests: info@mzglobaltrading.com." },
    ],
  },
  // ───────────────────────────────────────── Quality
  {
    slug: "pre-shipment-inspection-checklist",
    keywords: ["pre-shipment inspection checklist textile", "AQL inspection checklist garments", "final random inspection checklist"],
    category: "quality",
    kind: "Checklist",
    title: "Pre-Shipment Inspection Checklist",
    subtitle: "AQL Level II final random inspection — full verification list",
    description:
      "Comprehensive AQL Level II pre-shipment checklist covering workmanship, measurements, colour, packing and documentation — for buyers and QC teams.",
    blocks: [
      { type: "p", text: "Use this checklist to brief an inspector or verify an inspection report. It follows the structure of a standard final random inspection under ISO 2859-1, General Inspection Level II. Inspection should take place with at least 80% of the order packed in final export cartons." },
      { type: "h2", text: "A. Inspection Setup" },
      { type: "check", items: [
        "Order documents on hand: approved PP sample, Tech Pack (current revision), approved lab dips, packing list",
        "AQL plan confirmed: Critical 0 / Major 2.5 / Minor 4.0 (or buyer-specified), Level II",
        "Lot size confirmed against order quantity; sample size determined from AQL table",
        "Cartons selected randomly across the full lot (√n rule or all carton numbers in draw)",
      ]},
      { type: "h2", text: "B. Quantity & Assortment" },
      { type: "check", items: [
        "Total packed quantity matches packing list and order confirmation",
        "Size ratio per carton matches approved ratio pack (or solid-size plan)",
        "Colour assortment matches order breakdown",
        "Shipping marks, carton numbering and side marks match the approved layout",
      ]},
      { type: "h2", text: "C. Workmanship (per sampled piece, inside & out)" },
      { type: "check", items: [
        "No critical defects: needles/metal contamination, mould, infestation, non-compliant safety labelling",
        "Seams: no open seams, skipped stitches, broken stitches, puckering beyond standard",
        "Fabric: no holes, slubs beyond tolerance, stains, shading within piece",
        "Trims: buttons/zips/snaps functional and secure; bartacks present at stress points",
        "Threads trimmed; no untrimmed ends beyond minor classification",
        "Labels: brand, size, care and origin labels correct, straight and securely attached",
      ]},
      { type: "h2", text: "D. Measurements" },
      { type: "check", items: [
        "Measurement sub-sample taken per size (minimum 2 pieces per size, more for critical programs)",
        "All points of measure within Tech Pack tolerance column",
        "Out-of-tolerance points recorded with actual vs spec values",
      ]},
      { type: "h2", text: "E. Colour & Appearance" },
      { type: "check", items: [
        "Bulk shade checked against approved lap dip / PP sample in lightbox (D65 primary)",
        "Shade continuity across cartons and within sets checked",
        "Print/embroidery position, size and colours match approved artwork",
      ]},
      { type: "h2", text: "F. On-Site Tests" },
      { type: "check", items: [
        "GSM cutter check on fabric weight (where applicable) — within ±5% or specified tolerance",
        "Stitch density (SPI) counted against construction spec",
        "Seam strength pull test on representative seams",
        "Crocking/rub test for dark or printed items (where applicable)",
        "Barcode scan test — codes scan and match the item",
      ]},
      { type: "h2", text: "G. Packing & Documentation" },
      { type: "check", items: [
        "Polybag spec, warning print and folding per Tech Pack",
        "Hangtags, stickers and inserts present and correct",
        "Carton type, dimensions and gross weight per spec (max weight respected)",
        "Desiccants/humidity control as specified; no damp cartons",
        "Inspection report completed: standard, AQL, lot/sample size, defect log with photos, measurement tables, result",
      ]},
      { type: "h2", text: "H. Result & Actions" },
      { type: "table", headers: ["Result", "Action"], rows: [
        ["PASS", "Issue written shipment release; proceed to booking/loading"],
        ["FAIL", "Agree rework scope and re-inspection date in writing; do not fix vessel"],
        ["PENDING", "Resolve open items (e.g. missing shipping marks) and verify with photo evidence"],
      ]},
      { type: "note", text: "MZ Global Trading performs this inspection on managed orders per the agreed service scope, and supplies the photographic report before requesting shipment release." },
    ],
  },
  {
    slug: "aql-reference-table",
    keywords: ["AQL table 2.5 4.0", "ISO 2859-1 sampling table", "AQL chart textile inspection"],
    category: "quality",
    kind: "Reference",
    title: "AQL Level II Reference Table",
    subtitle: "ISO 2859-1 single sampling plan — normal inspection",
    description:
      "ISO 2859-1 AQL Level II sampling tables — acceptance and rejection numbers by lot size for Critical (0), Major (2.5) and Minor (4.0) defect classes.",
    blocks: [
      { type: "p", text: "This table gives the sample size and acceptance/rejection numbers for the AQL values most used in textile trade: Critical 0 (zero tolerance), Major 2.5 and Minor 4.0, under General Inspection Level II, normal severity, single sampling." },
      { type: "h2", text: "Sampling Table — General Inspection Level II" },
      { type: "table", headers: ["Lot size (units)", "Sample size", "Critical (0) Ac/Re", "Major (2.5) Ac/Re", "Minor (4.0) Ac/Re"], rows: [
        ["2 – 8", "2", "0 / 1", "0 / 1", "0 / 1"],
        ["9 – 15", "3", "0 / 1", "0 / 1", "0 / 1"],
        ["16 – 25", "5", "0 / 1", "0 / 1", "0 / 1"],
        ["26 – 50", "8", "0 / 1", "0 / 1", "1 / 2"],
        ["51 – 90", "13", "0 / 1", "1 / 2", "1 / 2"],
        ["91 – 150", "20", "0 / 1", "1 / 2", "2 / 3"],
        ["151 – 280", "32", "0 / 1", "2 / 3", "3 / 4"],
        ["281 – 500", "50", "0 / 1", "3 / 4", "5 / 6"],
        ["501 – 1,200", "80", "0 / 1", "5 / 6", "7 / 8"],
        ["1,201 – 3,200", "125", "0 / 1", "7 / 8", "10 / 11"],
        ["3,201 – 10,000", "200", "0 / 1", "10 / 11", "14 / 15"],
        ["10,001 – 35,000", "315", "0 / 1", "14 / 15", "21 / 22"],
        ["35,001 – 150,000", "500", "0 / 1", "21 / 22", "21 / 22"],
      ]},
      { type: "h2", text: "How to Read the Table" },
      { type: "ol", items: [
        "Find the row matching your total shipment quantity (the lot).",
        "Inspect the number of randomly selected pieces shown in 'Sample size'.",
        "Count defects per class. A piece with multiple defects counts once, at its most severe defect.",
        "Compare against Ac (accept) / Re (reject): defects ≤ Ac per class = pass that class; defects ≥ Re = fail.",
        "All three classes must pass for the lot to pass. Any critical defect fails the lot.",
      ]},
      { type: "h2", text: "Defect Classification Quick Reference" },
      { type: "table", headers: ["Class", "Definition", "Typical examples"], rows: [
        ["Critical", "Unsafe, illegal, or renders product unusable", "Needle fragment, mould, failed safety labelling"],
        ["Major", "Likely to cause return or customer complaint", "Open seam, hole, stain, wrong label, strong shade variance"],
        ["Minor", "Workmanship deviation unlikely to cause return", "Untrimmed thread, slightly crooked label, light crease"],
      ]},
      { type: "note", text: "Stricter programs use AQL 1.5/2.5; promotional goods sometimes 4.0/6.5. The buyer's purchase contract always overrides these defaults — state your AQL in the order confirmation." },
    ],
  },
  {
    slug: "supplier-evaluation-matrix",
    keywords: ["supplier evaluation matrix textile", "factory audit scoring criteria", "garment supplier assessment checklist"],
    category: "quality",
    kind: "Reference",
    title: "Supplier Evaluation Criteria Matrix",
    subtitle: "The scoring framework used during factory onboarding",
    description:
      "The full scoring matrix used during factory onboarding — production capability, certifications, quality systems and social compliance.",
    blocks: [
      { type: "p", text: "Every factory entering the MZ Global Trading network is scored against this matrix. A facility must reach the minimum overall score and pass all knock-out criteria before receiving any order. Buyers are welcome to use the same framework for their own supplier assessments." },
      { type: "h2", text: "Knock-Out Criteria (must pass — no score)" },
      { type: "check", items: [
        "Valid legal registration and export licence",
        "No unremediated critical findings on the latest social audit",
        "No child or forced labour indicators",
        "Functioning effluent treatment where wet processing exists on site",
        "Willingness to accept third-party inspection and buyer audits",
      ]},
      { type: "h2", text: "Scored Criteria" },
      { type: "table", headers: ["Area", "Weight", "What we verify"], rows: [
        ["Production capability", "25%", "Machine park matches product; capacity headroom; maintenance records; sampling room capability"],
        ["Quality management", "25%", "In-line inspection system; final AQL practice; lab equipment & calibration; corrective-action records; historical DHU"],
        ["Certifications & compliance", "20%", "ISO 9001; social audit rating (BSCI/Sedex/WRAP); product certificates (OEKO-TEX/GOTS/GRS) verified in issuer databases"],
        ["Commercial reliability", "15%", "On-time delivery history; claim history; financial stability indicators; communication quality"],
        ["Social & environmental", "15%", "Audit score detail; safety walkthrough; wages & hours records; environmental practices beyond minimum"],
      ]},
      { type: "h2", text: "Scoring Bands" },
      { type: "table", headers: ["Overall score", "Status", "Meaning"], rows: [
        ["85–100", "Preferred", "Eligible for all programs including tight-tolerance and certified-claim orders"],
        ["70–84", "Approved", "Eligible for standard programs; enhanced inspection on first 3 orders"],
        ["55–69", "Conditional", "Trial orders only, with corrective-action plan and full-frequency inspection"],
        ["Below 55", "Rejected", "Not admitted to network; may reapply after 12 months with evidence of improvement"],
      ]},
      { type: "h2", text: "Ongoing Performance Review" },
      { type: "ul", items: [
        "Every shipment feeds the rolling scorecard: final inspection result, measurement compliance, on-time performance, claims.",
        "Two consecutive failed final inspections trigger automatic suspension pending root-cause review.",
        "Social audits must remain current; expired audits freeze new order allocation.",
      ]},
      { type: "note", text: "Want the audit summary for the factory allocated to your order? It is shared under NDA at order confirmation — request via info@mzglobaltrading.com." },
    ],
  },
  {
    slug: "restricted-substances-list",
    keywords: ["restricted substances list textile", "RSL REACH CPSIA textiles", "textile chemical compliance list"],
    category: "quality",
    kind: "Reference",
    title: "Restricted Substances List (RSL)",
    subtitle: "Prohibited and restricted chemicals — REACH, CPSIA and OEKO-TEX aligned",
    description:
      "Reference list of prohibited and restricted chemical groups in compliance with REACH, CPSIA, OEKO-TEX and market regulations for the USA, EU and UK.",
    blocks: [
      { type: "p", text: "This RSL summarises the substance groups restricted in textile products supplied by MZ Global Trading. It aligns with EU REACH Annex XVII, US CPSIA (for children's products), UK REACH and OEKO-TEX Standard 100 limit values. It is a working reference, not a substitute for the full legal texts — limit values cited are indicative of the strictest commonly applied retail standard." },
      { type: "h2", text: "Restricted Substance Groups" },
      { type: "table", headers: ["Substance group", "Where it appears", "Indicative limit", "Primary regulation"], rows: [
        ["Azo dyes (releasing 24 restricted arylamines)", "Dyed fabrics & trims", "≤ 20–30 mg/kg per amine", "REACH Annex XVII (43); OEKO-TEX"],
        ["Formaldehyde", "Easy-care/wrinkle-free finishes", "Baby ≤ 16 · skin contact ≤ 75 · other ≤ 150 mg/kg", "OEKO-TEX; national laws (JP Law 112)"],
        ["Lead (total)", "Paints, prints, metal trims", "≤ 90 mg/kg (children's: ≤ 100 substrate)", "CPSIA; REACH"],
        ["Cadmium", "Pigments, PVC prints, metal parts", "≤ 40 mg/kg (REACH ≤ 0.01% in plastics)", "REACH Annex XVII (23)"],
        ["Nickel release", "Buttons, rivets, zips with skin contact", "≤ 0.5 µg/cm²/week", "REACH Annex XVII (27)"],
        ["Phthalates (DEHP, DBP, BBP, DINP etc.)", "Plastisol prints, coated fabrics", "≤ 0.1% sum (children's articles)", "CPSIA; REACH Annex XVII (51/52)"],
        ["Chlorinated phenols (PCP, TeCP)", "Preservation of textiles", "≤ 0.5 mg/kg (PCP)", "REACH; OEKO-TEX"],
        ["Organotin compounds (TBT, DBT)", "Antimicrobial finishes, prints", "≤ 1 mg/kg TBT", "REACH Annex XVII (20)"],
        ["PFOS / PFOA / PFAS (long-chain)", "Water/stain repellent finishes", "PFOA ≤ 25 µg/kg; market phase-outs apply", "REACH; US state laws"],
        ["APEO / NPEO (alkylphenol ethoxylates)", "Detergents, wetting agents in processing", "≤ 100 mg/kg (NPEO sum)", "REACH Annex XVII (46a)"],
        ["Chromium VI", "Leather trims, some pigments", "≤ 3 mg/kg (leather)", "REACH Annex XVII (47)"],
        ["Dimethyl fumarate (DMFu)", "Anti-mould sachets", "≤ 0.1 mg/kg", "REACH Annex XVII (61)"],
        ["Flame retardants (TRIS, PBB, pentaBDE etc.)", "FR-treated textiles", "Prohibited / ≤ trace", "REACH; CPSC"],
      ]},
      { type: "h2", text: "Children's Products — Additional Requirements" },
      { type: "ul", items: [
        "CPSIA (USA): total lead, phthalates, tracking labels, CPC certificate based on third-party testing at a CPSC-accepted lab.",
        "EN 71-3 (EU): migration limits on 19 elements for products classifiable as toys (e.g. comfort items).",
        "Drawstrings: prohibited at hood/neck for sizes up to children's 14 (US ASTM F1816; EN 14682 in EU).",
        "OEKO-TEX Class 1 certification recommended for all baby and infant items.",
      ]},
      { type: "h2", text: "Compliance Mechanism" },
      { type: "ol", items: [
        "Factory and dye-house declare RSL conformity at order placement (flow-down clause in our purchase contract).",
        "OEKO-TEX Standard 100 certification provides tested evidence across most groups above.",
        "Buyer-specific RSLs (brand lists are often stricter) are accepted and contractually flowed down.",
        "Third-party lab testing (SGS, Intertek, BV) arranged on request per shipment or per program.",
      ]},
      { type: "note", text: "Regulations change. Verify current limit values against the latest REACH Annex XVII consolidations and CPSC rules before relying on this summary for a compliance decision." },
    ],
  },
  // ───────────────────────────────────────── Technical
  {
    slug: "tech-pack-template-apparel",
    keywords: ["tech pack template apparel", "garment tech pack template printable", "free tech pack template"],
    category: "technical",
    kind: "Template",
    title: "Tech Pack Template — Apparel",
    subtitle: "Print, fill and attach to your RFQ — or use as a structure check",
    description:
      "Structured Tech Pack template for apparel products — construction, BOM, measurements, print placement, finishing and packaging specification.",
    blocks: [
      { type: "p", text: "This template contains every section a factory needs to quote and produce an apparel style accurately. Print it and fill it by hand, or recreate the sections in your own document. Fields marked • are mandatory for an accurate quotation." },
      { type: "h2", text: "1. Style Header" },
      { type: "fields", items: [
        { label: "Style name / number •" }, { label: "Season / collection" }, { label: "Date & version number •" },
        { label: "Product category •", hint: "e.g. Men's polo shirt" }, { label: "Order quantity (per colour) •" }, { label: "Target FOB price" },
      ]},
      { type: "h2", text: "2. Fabric Specification •" },
      { type: "fields", items: [
        { label: "Composition", hint: "e.g. 100% combed cotton" },
        { label: "Construction", hint: "e.g. pique knit / 3×1 twill" },
        { label: "Weight (GSM) & tolerance", hint: "e.g. 220 GSM ±5%" },
        { label: "Finish", hint: "e.g. silicone soft, enzyme wash" },
        { label: "Shrinkage tolerance & test method", hint: "e.g. ≤5%, ISO 6330" },
      ]},
      { type: "h2", text: "3. Bill of Materials" },
      { type: "table", headers: ["Item", "Specification", "Supplier / reference", "Colour"], rows: [
        ["Shell fabric", "", "", ""],
        ["Rib / trim fabric", "", "", ""],
        ["Sewing thread", "", "", ""],
        ["Buttons / zip", "", "", ""],
        ["Main label", "", "", ""],
        ["Size + care label", "", "", ""],
        ["Hangtag", "", "", ""],
        ["Polybag", "", "", ""],
      ]},
      { type: "h2", text: "4. Measurement Chart • (add rows per point of measure)" },
      { type: "table", headers: ["Point of measure", "How to measure", "S", "M", "L", "XL", "Tol ±"], rows: [
        ["Chest width", "2.5 cm below armhole, flat", "", "", "", "", ""],
        ["Body length", "HPS to hem", "", "", "", "", ""],
        ["Sleeve length", "Shoulder seam to cuff", "", "", "", "", ""],
        ["Shoulder width", "Seam to seam across back", "", "", "", "", ""],
        ["Neck opening", "Inside edge to edge, flat", "", "", "", "", ""],
        ["Hem opening", "Edge to edge at hem", "", "", "", "", ""],
      ]},
      { type: "h2", text: "5. Construction Details" },
      { type: "fields", items: [
        { label: "Shoulder seam", hint: "stitch type / tape" }, { label: "Side seams" }, { label: "Hem", hint: "e.g. twin-needle 2.5 cm" },
        { label: "Neck finish", hint: "e.g. self-fabric binding" }, { label: "Stitches per inch (SPI)" }, { label: "Reinforcements", hint: "bartacks etc." },
      ]},
      { type: "h2", text: "6. Artwork & Decoration" },
      { type: "fields", items: [
        { label: "Technique", hint: "screen / DTG / embroidery" },
        { label: "Placement & size", hint: "measured from fixed point, e.g. 7 cm below HPS centre" },
        { label: "Colours (Pantone)" },
        { label: "Artwork file reference", hint: "vector file name attached" },
      ]},
      { type: "h2", text: "7. Colourways" },
      { type: "table", headers: ["Colourway", "Body (Pantone TCX)", "Trim", "Thread", "Label"], rows: [
        ["1", "", "", "", ""], ["2", "", "", "", ""], ["3", "", "", "", ""],
      ]},
      { type: "h2", text: "8. Packing" },
      { type: "fields", items: [
        { label: "Fold size / polybag size" }, { label: "Pieces per carton & ratio", hint: "solid size or assorted" },
        { label: "Carton max gross weight" }, { label: "Shipping mark layout", hint: "attach artwork" },
      ]},
      { type: "h2", text: "9. Quality Requirements" },
      { type: "fields", items: [
        { label: "AQL for final inspection", hint: "default 2.5 major / 4.0 minor" },
        { label: "Colour fastness minimum grades", hint: "wash / rub / light" },
        { label: "Certifications required", hint: "e.g. OEKO-TEX 100" },
      ]},
      { type: "note", text: "Attach: technical flats (front/back), artwork vectors, label artworks and any reference sample photos. Email the completed pack with your RFQ to info@mzglobaltrading.com." },
    ],
  },
  {
    slug: "tech-pack-template-home-textiles",
    keywords: ["tech pack template home textiles", "towel specification template", "bed linen spec sheet template"],
    category: "technical",
    kind: "Template",
    title: "Tech Pack Template — Home Textiles",
    subtitle: "Specification template for towels, bed linen and home textile products",
    description:
      "Tech Pack template for home textile products — fabric spec, weave/GSM, colour references, size options, finishing and packing requirements.",
    blocks: [
      { type: "p", text: "This template covers the specification points that determine price and quality for woven and terry home textiles. Print and fill, or mirror the structure in your own format. Fields marked • are mandatory for an accurate quotation." },
      { type: "h2", text: "1. Product Header" },
      { type: "fields", items: [
        { label: "Product name / SKU •" }, { label: "Product type •", hint: "e.g. bath towel, duvet cover, kitchen towel" },
        { label: "Date & version •" }, { label: "Order quantity (per size/colour) •" }, { label: "Target FOB price" },
      ]},
      { type: "h2", text: "2. Fabric & Construction •" },
      { type: "fields", items: [
        { label: "Composition", hint: "e.g. 100% ring-spun cotton" },
        { label: "Weave / structure", hint: "terry loop / percale / sateen / waffle / jacquard" },
        { label: "Weight", hint: "GSM for terry & woven; thread count (TC) for bed linen" },
        { label: "Yarn details", hint: "e.g. 16/1 ring-spun pile; 40s combed warp" },
        { label: "Tolerances", hint: "GSM ±5%; size ±2–3% typical" },
      ]},
      { type: "h2", text: "3. Size Specification (add rows as needed)" },
      { type: "table", headers: ["Item / size name", "Dimensions (cm)", "Weight per piece (g)", "Qty"], rows: [
        ["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""],
      ]},
      { type: "h2", text: "4. Design & Decoration" },
      { type: "fields", items: [
        { label: "Border / hem style", hint: "dobby border, satin border, plain hem, piped edge" },
        { label: "Decoration", hint: "jacquard pattern, embroidery, printed design — attach artwork" },
        { label: "Placement & size of decoration" },
        { label: "Closure type (covers)", hint: "zip / buttons / envelope" },
        { label: "Special features", hint: "hanging loop, pocket depth (fitted sheets), heading type (curtains)" },
      ]},
      { type: "h2", text: "5. Colourways" },
      { type: "table", headers: ["Colourway", "Body (Pantone TCX)", "Border / decoration", "Label"], rows: [
        ["1", "", "", ""], ["2", "", "", ""], ["3", "", "", ""],
      ]},
      { type: "h2", text: "6. Finishing" },
      { type: "fields", items: [
        { label: "Finish", hint: "soft/silicone, anti-bacterial, zero-twist, velour shearing" },
        { label: "Wash requirement", hint: "pre-washed / unwashed" },
        { label: "Shrinkage tolerance & test method" },
      ]},
      { type: "h2", text: "7. Labelling & Packing" },
      { type: "fields", items: [
        { label: "Labels", hint: "main, size, care, origin — attach artworks" },
        { label: "Individual packing", hint: "belly band, polybag, ribbon, gift box" },
        { label: "Set composition", hint: "e.g. 2 bath + 2 hand + 4 face" },
        { label: "Pieces per carton & carton max weight" },
        { label: "Shipping mark layout" },
      ]},
      { type: "h2", text: "8. Quality & Compliance" },
      { type: "fields", items: [
        { label: "AQL for final inspection", hint: "default 2.5 / 4.0 Level II" },
        { label: "Absorbency / performance requirements", hint: "towels: sinking time test" },
        { label: "Colour fastness minimums", hint: "wash / rub / chlorine (pool towels)" },
        { label: "Certifications required", hint: "OEKO-TEX 100, GOTS, etc." },
      ]},
      { type: "note", text: "Attach: dimensioned drawing, border/decoration artwork, label artworks. Email the completed pack with your RFQ to info@mzglobaltrading.com." },
    ],
  },
  {
    slug: "gsm-thread-count-reference",
    keywords: ["GSM chart by product", "thread count reference bed linen", "fabric weight reference table"],
    category: "technical",
    kind: "Reference",
    title: "GSM & Thread Count Reference Guide",
    subtitle: "Fabric weight and construction ranges by product application",
    description:
      "Quick-reference chart mapping GSM and thread count ranges to product applications — apparel, home textiles and fabric — with recommended end-uses.",
    blocks: [
      { type: "p", text: "Print-friendly reference tables for the fabric weights and constructions used across apparel and home textiles. GSM = grams per square metre, measured on finished relaxed fabric with a 100 cm² cutter. TC (thread count) = ends + picks per square inch." },
      { type: "h2", text: "Apparel — GSM by Product" },
      { type: "table", headers: ["Product", "Light", "Retail standard", "Heavy / premium"], rows: [
        ["T-shirt (single jersey)", "120–150", "160–180", "190–240"],
        ["Polo (pique)", "170–190", "200–220", "230–260"],
        ["Henley / long-sleeve", "150–170", "180–200", "210–240"],
        ["Hoodie / sweatshirt (fleece, terry)", "240–280", "300–360", "380–450+"],
        ["Joggers / sweatpants", "240–280", "300–340", "360–400"],
        ["Woven shirt (poplin/oxford)", "90–110", "115–135", "140–160"],
        ["Chino / twill trouser", "180–220", "230–280", "290–340"],
        ["Denim", "8–10 oz", "11–13 oz", "14 oz+"],
        ["Workwear (canvas/twill)", "240–280", "300–360", "380–430"],
      ]},
      { type: "h2", text: "Home Textiles — GSM by Product" },
      { type: "table", headers: ["Product", "Economy", "Retail standard", "Premium / hotel"], rows: [
        ["Bath towel (terry)", "350–420", "450–550", "600–700"],
        ["Hand / guest towel", "350–420", "450–550", "550–650"],
        ["Beach towel (velour)", "300–350", "380–420", "450–500"],
        ["Bathrobe (terry/waffle)", "280–350", "380–420", "450–500"],
        ["Bath mat", "700–900", "1000–1200", "1300–1500"],
        ["Kitchen towel (waffle/terry)", "150–180", "200–250", "260–300"],
        ["Bar mop", "380–450", "480–550", "560–620"],
        ["Fleece blanket", "180–220", "240–280", "300–350"],
        ["Cellular blanket (cotton)", "150–200", "220–260", "280–320"],
      ]},
      { type: "h2", text: "Bed Linen — Thread Count" },
      { type: "table", headers: ["Grade", "Thread count", "Construction notes"], rows: [
        ["Institutional / hospitality", "T-180 – T-200", "Percale, often 50/50 poly-cotton for laundry durability"],
        ["Retail standard", "T-200 – T-300", "100% cotton percale (crisp) or sateen (smooth)"],
        ["Premium retail", "T-300 – T-600", "Combed or compact cotton, sateen weave dominant"],
        ["Luxury", "T-600+", "Verify single-ply vs multi-ply counting; compare GSM and yarn fineness"],
      ]},
      { type: "h2", text: "Verification Methods" },
      { type: "ul", items: [
        "GSM: punch a 100 cm² circle with a GSM cutter, weigh in grams, multiply by 100. Tolerance standard: ±5% on finished fabric.",
        "Thread count: count ends and picks per inch with a pick glass; TC = EPI + PPI. Confirm the counting basis (per-ply counting inflates TC).",
        "Denim weight: quoted in oz/yd²; multiply by 33.9 to convert to GSM.",
      ]},
      { type: "note", text: "These bands reflect common trade practice for export production from Pakistan; individual buyer specifications always take precedence." },
    ],
  },
  // ───────────────────────────────────────── Trade
  {
    slug: "incoterms-quick-reference",
    keywords: ["incoterms quick reference chart", "EXW FOB CIF CFR table", "incoterms 2020 cheat sheet"],
    category: "trade",
    kind: "Reference",
    title: "Incoterms 2020 Quick Reference",
    subtitle: "EXW · FOB · CFR · CIF — responsibility, cost and risk at a glance",
    description:
      "Visual guide to EXW, FOB, CIF and CFR — responsibility split, cost and risk transfer points, and best-use cases for textile importers.",
    blocks: [
      { type: "p", text: "The four incoterms that cover most textile trade, summarised for quick reference. S = seller's responsibility, B = buyer's responsibility." },
      { type: "h2", text: "Responsibility Matrix" },
      { type: "table", headers: ["Cost / task", "EXW", "FOB", "CFR", "CIF"], rows: [
        ["Export packing", "S", "S", "S", "S"],
        ["Inland transport to port (origin)", "B", "S", "S", "S"],
        ["Export customs clearance", "B", "S", "S", "S"],
        ["Origin port charges & loading", "B", "S", "S", "S"],
        ["Ocean freight", "B", "B", "S", "S"],
        ["Marine insurance", "B", "B", "B", "S (min. cover)"],
        ["Destination port charges", "B", "B", "B", "B"],
        ["Import clearance & duty", "B", "B", "B", "B"],
        ["Inland delivery (destination)", "B", "B", "B", "B"],
      ]},
      { type: "h2", text: "Risk Transfer Points" },
      { type: "table", headers: ["Term", "Risk passes to buyer…", "Caution"], rows: [
        ["EXW", "At the factory gate", "Buyer must handle export clearance in origin country — avoid; use FCA instead"],
        ["FOB", "When goods are on board the vessel", "Recommended default for sea freight"],
        ["CFR", "On board at ORIGIN port", "Seller pays freight but risk is yours at Karachi — insure it yourself"],
        ["CIF", "On board at ORIGIN port", "Insurance included is minimum cover (ICC-C); specify ICC-A for full cover"],
      ]},
      { type: "h2", text: "Quick Selection Guide" },
      { type: "table", headers: ["Your situation", "Use"], rows: [
        ["You have a freight forwarder / carrier contract", "FOB"],
        ["First import, want one supplier invoice incl. freight + insurance", "CIF (named destination port)"],
        ["You carry an open marine insurance policy", "FOB or CFR"],
        ["Air shipment", "FCA (named airport) — not FOB"],
      ]},
      { type: "ul", items: [
        "Always name the port precisely: 'FOB Karachi', 'CIF Felixstowe' — never 'CIF UK'.",
        "Normalise quotations to one term before comparing suppliers.",
        "Destination duty, taxes and delivery are the buyer's under all four terms.",
      ]},
      { type: "note", text: "MZ Global Trading quotes FOB Karachi / Port Qasim as standard; CFR and CIF to any named port available on request with transparent freight breakdown." },
    ],
  },
  {
    slug: "export-documentation-checklist",
    keywords: ["export documents checklist textile", "import documentation checklist", "bill of lading checklist buyer"],
    category: "trade",
    kind: "Checklist",
    title: "Export Documentation Checklist",
    subtitle: "Every document your shipment needs — and what to verify on each",
    description:
      "Complete checklist of export documents — commercial invoice, packing list, B/L, certificate of origin and market-specific compliance documents.",
    blocks: [
      { type: "p", text: "Use this checklist when reviewing the document set for any shipment from Pakistan. Errors in these documents cause customs delays, demurrage and LC rejections — every line is worth the two minutes it takes to check." },
      { type: "h2", text: "Core Commercial Documents" },
      { type: "check", items: [
        "Commercial invoice — prices, currency, incoterm + named port, HS codes, totals match the order confirmation exactly",
        "Packing list — carton count, contents per carton, net & gross weights, dimensions; totals reconcile with invoice quantity",
        "Bill of lading (B/L) — consignee & notify party correct, port pair correct, 'shipped on board' date, container and seal numbers match loading report",
        "Beneficiary's certificate / shipment advice (if LC requires)",
      ]},
      { type: "h2", text: "Origin & Preference Documents" },
      { type: "check", items: [
        "Certificate of origin — issued by chamber of commerce, consistent with invoice",
        "EU buyers: REX statement on origin (GSP+) for duty-free entry — verify the REX number is valid",
        "UK buyers: origin declaration under DCTS for preferential duty",
        "HS codes on origin documents match the invoice and your customs broker's classification",
      ]},
      { type: "h2", text: "Quality & Compliance Documents" },
      { type: "check", items: [
        "Final inspection report (AQL) — result PASS, signed, dated, matching this shipment's PO",
        "Product certificates as contracted: OEKO-TEX / GOTS transaction certificate / GRS TC",
        "Children's products (USA): CPC with third-party test reports per CPSIA",
        "Fumigation certificate (if wooden pallets / specific destinations require)",
      ]},
      { type: "h2", text: "Financial & Insurance Documents" },
      { type: "check", items: [
        "Insurance certificate or policy (CIF: from seller, check coverage clauses; FOB/CFR: from your own insurer)",
        "LC document set checked against every LC clause BEFORE presentation — dates, spellings, amounts, partial shipment terms",
        "Bank's document courier tracking (or e-release/surrendered B/L confirmation)",
      ]},
      { type: "h2", text: "Pre-Arrival Actions" },
      { type: "check", items: [
        "Copy documents emailed to your customs broker at least 7 days before vessel arrival",
        "ISF filing (USA: '10+2') submitted no later than 24h before loading at origin",
        "Import licences / market registrations confirmed where applicable",
        "Delivery booking at destination warehouse aligned with free-time window to avoid demurrage",
      ]},
      { type: "h2", text: "Common Errors That Cause Delays" },
      { type: "table", headers: ["Error", "Consequence"], rows: [
        ["Consignee name differs from import registration", "Customs hold at destination"],
        ["Invoice total ≠ LC amount (even cents)", "LC discrepancy fees / payment delay"],
        ["HS code mismatch between invoice and CO", "Preference denied — full duty charged"],
        ["Late ISF filing (USA)", "Penalties up to USD 5,000 + exam risk"],
        ["B/L notify party left blank", "No arrival notice — free time burns silently"],
      ]},
      { type: "note", text: "MZ Global Trading prepares and pre-verifies this document set on managed shipments, with copies emailed promptly after vessel departure." },
    ],
  },
];

export const DOWNLOAD_SLUGS = DOWNLOAD_DOCS.map((d) => d.slug);

export function getDownloadDoc(slug: string): DownloadDoc | undefined {
  return DOWNLOAD_DOCS.find((d) => d.slug === slug);
}
