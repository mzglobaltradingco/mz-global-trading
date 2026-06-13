// Full article content for /guides/[slug]/ pages — single source of truth.

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "note"; text: string };

export interface GuideArticle {
  slug: string;
  seoTitle: string;
  seoDescription?: string;
  keywords: string[];
  num: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  blocks: ContentBlock[];
  related: string[];
}

export const GUIDES: GuideArticle[] = [
  // ───────────────────────────────────────── 01
  {
    slug: "pakistan-textile-sourcing-guide",
    seoTitle: "Pakistan Textile Sourcing Guide",
    seoDescription:
      "How to source textiles from Pakistan — factory selection, certifications, AQL inspection, logistics and payment terms for international buyers.",
    keywords: ["sourcing textiles from Pakistan", "Pakistan textile sourcing guide", "Pakistan garment manufacturers for importers", "how to import textiles from Pakistan", "Pakistan textile factory selection"],
    num: "01",
    category: "Sourcing Strategy",
    title: "The Complete Buyer's Guide to Sourcing Textiles from Pakistan",
    description:
      "Everything a procurement manager needs to evaluate Pakistan as a sourcing destination — factory selection, certifications, quality control, logistics and payment terms in one comprehensive reference.",
    readTime: "18 min read",
    related: ["aql-pre-shipment-inspection", "incoterms-for-textile-buyers", "pakistan-vs-bangladesh-vs-china"],
    blocks: [
      { type: "p", text: "Pakistan is the world's fifth-largest cotton producer and the eighth-largest exporter of textiles, shipping over $16 billion of textile products annually to buyers in the USA, Europe and the UK. Yet many procurement managers still know it mainly for towels and denim. This guide covers what Pakistan actually offers, how to select and verify factories, how an order runs from enquiry to delivery, and how to manage quality and commercial risk along the way." },
      { type: "h2", text: "Why Pakistan: The Structural Advantages" },
      { type: "p", text: "Pakistan's textile industry is built on a domestic cotton base — a structural difference from Bangladesh and Vietnam, which import most of their fibre. Cotton grown in Punjab and Sindh feeds an integrated chain of spinning, weaving, knitting, dyeing and garmenting that often sits within a single industrial cluster, sometimes within a single vertically integrated mill. For buyers this means three practical things." },
      { type: "ul", items: [
        "Shorter raw-material lead times — greige fabric does not cross a border before production starts, which can save 2–4 weeks against fabric-importing countries.",
        "Better cost stability on cotton-rich products — towels, bed linen, denim, fleece and jersey basics — because the fibre, energy and labour cost base is domestic.",
        "Traceability — cotton-to-garment programs (BCI, organic, recycled) are easier to document when the whole chain is in one country.",
      ]},
      { type: "p", text: "Pakistan also benefits from GSP+ status with the European Union, giving duty-free access for most textile categories — a direct landed-cost advantage for EU buyers compared with sourcing from China." },
      { type: "h2", text: "What Pakistan Does Best" },
      { type: "table", headers: ["Category", "Strength", "Typical buyers"], rows: [
        ["Terry towels & bath linen", "World-class; among top 3 global exporters", "Hospitality, retail, institutional"],
        ["Denim & jeans", "Full vertical chain from spinning to laundry", "Brands, wholesalers"],
        ["Knitwear (tees, polos, fleece)", "Strong cotton jersey and fleece base", "Retail, promotional, workwear"],
        ["Bed linen & home textiles", "High-volume woven capacity, wide widths", "Retail, hospitality"],
        ["Workwear & hospital linen", "Durable cotton/poly weaves, FR finishes", "Industrial laundries, healthcare"],
        ["Socks & accessories", "Growing specialised cluster", "Retail, sports"],
      ]},
      { type: "h2", text: "Selecting the Right Factory" },
      { type: "p", text: "Factory selection is where most first orders go right or wrong. A capable sourcing partner pre-vets factories, but every buyer should understand the criteria. We evaluate factories against five areas before placing any program." },
      { type: "ol", items: [
        "Certifications & compliance — at minimum ISO 9001 plus the social audit your market expects (BSCI or Sedex for Europe, WRAP for the USA). Product-level claims (GOTS, OEKO-TEX, GRS) must be certificate-verified, not brochure-claimed.",
        "Product specialisation — a towel mill should not sew your polo shirts. Match the factory's core machinery and order history to your product.",
        "Capacity fit — your order should be 5–20% of monthly capacity. Below that you get no priority; above it, delivery risk.",
        "Quality system — in-line inspection records, calibrated lab equipment, documented AQL practice at final inspection.",
        "Financial stability — a factory under cash stress cuts corners on fabric and trims first.",
      ]},
      { type: "h2", text: "The Ordering Process: Four Stages" },
      { type: "h3", text: "Stage 1 — Enquiry and quotation (week 0–2)" },
      { type: "p", text: "A complete enquiry includes target product specification (or a Tech Pack), quantity, target price, certifications required and destination market. Expect a formal quotation in 3–5 business days, with FOB Karachi or Port Qasim as the standard term. A quotation built on a proper specification holds; one built on a vague enquiry will be re-negotiated later — usually upward." },
      { type: "h3", text: "Stage 2 — Sampling and approval (week 2–6)" },
      { type: "p", text: "Development samples confirm construction and handfeel; lab dips confirm colour; the pre-production (PP) sample is the legal reference for bulk. Do not allow bulk production to start before written PP approval — every later quality dispute is resolved against the approved PP sample." },
      { type: "h3", text: "Stage 3 — Production and in-line control (week 6–14)" },
      { type: "p", text: "Bulk fabric is knitted/woven, dyed and finished, then cut and sewn. A competent partner inspects in-line — fabric inspection on the 4-point system, first-output checks on each line, and mid-production DHU tracking — so problems surface when 10% of the order is made, not 100%." },
      { type: "h3", text: "Stage 4 — Final inspection and shipment (week 14–16)" },
      { type: "p", text: "Final random inspection follows ISO 2859-1 AQL Level II (typically AQL 2.5 major / 4.0 minor for retail products). After a documented PASS, cartons are sealed, the container is loaded and export documents are couriered or released through the bank, depending on payment terms." },
      { type: "h2", text: "Logistics from Pakistan" },
      { type: "table", headers: ["Destination", "Port-to-port transit (sea)", "Notes"], rows: [
        ["US East Coast (NY/Savannah)", "28–35 days", "Direct or via transshipment"],
        ["US West Coast (LA/Long Beach)", "30–38 days", "Usually via Singapore/Colombo"],
        ["UK (Felixstowe/Southampton)", "22–28 days", "GSP-style UK DCTS duty preferences apply"],
        ["North Europe (Rotterdam/Hamburg)", "22–28 days", "GSP+ duty-free for most categories"],
        ["South America (Santos)", "35–45 days", "Transshipment routings vary"],
      ]},
      { type: "p", text: "Shipments leave from Karachi Port or Port Qasim. FOB is the recommended term for most buyers: you control the freight contract and insurance while the supplier handles export clearance. Air freight from Karachi (JIAP) is available for samples and emergency replenishment at roughly 8–12× the sea cost per kg." },
      { type: "h2", text: "Payment Terms" },
      { type: "ul", items: [
        "Telegraphic transfer (TT) — typically 30% deposit with order, 70% against copy of shipping documents. Simple and cheap; standard for small-to-mid orders.",
        "Letter of credit (LC) at sight — bank-guaranteed payment against compliant documents. Preferred for first large orders; adds bank charges of roughly 0.5–1.5%.",
        "Documents against payment (D/P) — the bank releases shipping documents only when you pay. A middle ground when trust is established.",
      ]},
      { type: "h2", text: "Managing Risk" },
      { type: "ul", items: [
        "Always require a PP sample and written approval before bulk.",
        "Insist on third-party or sourcing-partner final inspection with a full AQL report — photos, measurements, defect counts.",
        "Verify every certificate directly in the issuer's database (GOTS, OEKO-TEX and amfori all have public verification).",
        "Use incoterms that match your capability: FOB if you have a freight forwarder; CIF/CFR only with a clearly named destination port.",
        "Put tolerances in writing — GSM ±5%, measurements per your size chart tolerance column, shade within an agreed grey-scale rating.",
      ]},
      { type: "note", text: "A sourcing partner on the ground compresses every stage of this guide: factory shortlisting from a vetted network, sampling supervision, in-line and final QC, document handling and one accountable contact. That is precisely the role MZ Global Trading performs for buyers in the USA, UK, Europe and South America." },
    ],
  },
  // ───────────────────────────────────────── 02
  {
    slug: "aql-pre-shipment-inspection",
    seoTitle: "AQL Inspection Guide for Importers",
    seoDescription:
      "ISO 2859-1 AQL Level II explained — sample sizes, defect classes, acceptance numbers and what PASS or FAIL means for your shipment release.",
    keywords: ["AQL inspection textile", "AQL 2.5 4.0 sampling table", "pre-shipment inspection garments", "ISO 2859-1 Level II explained", "textile inspection report guide"],
    num: "02",
    category: "Quality",
    title: "Understanding AQL: Pre-Shipment Inspection for Importers",
    description:
      "ISO 2859-1 AQL Level II explained in plain language — sample sizes, defect classifications, acceptance numbers and what a PASS and FAIL means for your shipment release.",
    readTime: "8 min read",
    related: ["first-shipment-checklist", "pakistan-textile-sourcing-guide", "gsm-fabric-weight-guide"],
    blocks: [
      { type: "p", text: "AQL — Acceptable Quality Limit — is the statistical method behind almost every pre-shipment inspection in the textile trade. It answers a simple question: out of a shipment of thousands of pieces, how many do we inspect, and how many defects are acceptable before the shipment fails? The framework is defined in ISO 2859-1 (identical to ANSI/ASQ Z1.4), and General Inspection Level II is the industry default." },
      { type: "h2", text: "The Three Defect Classes" },
      { type: "table", headers: ["Class", "Definition", "Standard AQL", "Examples"], rows: [
        ["Critical", "Unsafe, illegal or unusable; blocks sale", "0 — zero tolerance", "Broken needle in garment, mould, failed flammability label"],
        ["Major", "Likely to cause a return or complaint", "2.5", "Open seam, visible stain, hole, wrong size label, shade variation"],
        ["Minor", "Workmanship flaw a customer may not notice", "4.0", "Untrimmed thread, slightly skewed label, light crease"],
      ]},
      { type: "p", text: "AQL 2.5/4.0 is the common standard for retail apparel and home textiles. Premium programs sometimes specify 1.5/2.5; institutional or promotional goods sometimes accept 4.0/6.5. The buyer's specification always overrides the default." },
      { type: "h2", text: "Sample Size: How Many Pieces Get Inspected" },
      { type: "p", text: "The sample size depends only on the lot size (total units in the shipment). Under Level II, the most-used rows are:" },
      { type: "table", headers: ["Lot size (pcs)", "Sample size", "Major 2.5 — Accept / Reject", "Minor 4.0 — Accept / Reject"], rows: [
        ["281 – 500", "50", "3 / 4", "5 / 6"],
        ["501 – 1,200", "80", "5 / 6", "7 / 8"],
        ["1,201 – 3,200", "125", "7 / 8", "10 / 11"],
        ["3,201 – 10,000", "200", "10 / 11", "14 / 15"],
        ["10,001 – 35,000", "315", "14 / 15", "21 / 22"],
      ]},
      { type: "p", text: "Reading the table: for a 5,000-piece shipment, the inspector randomly pulls 200 pieces from across the packed cartons. If 10 or fewer major defects are found, the lot passes on majors; at 11 it fails. Critical defects are always 0-accept regardless of lot size." },
      { type: "h2", text: "What a Final Random Inspection Actually Covers" },
      { type: "ul", items: [
        "Quantity and assortment — carton count, size/colour ratio against the packing list",
        "Workmanship — every sampled piece checked inside and out against the defect list",
        "Measurements — a measurement sub-sample checked against the size chart and tolerances",
        "Colour — bulk shade compared with the approved lap dip / PP sample under a lightbox",
        "Packing & labelling — polybag, hangtags, carton markings, barcode scans",
        "On-site tests — seam strength pull, stitch density count, GSM cut where applicable",
      ]},
      { type: "h2", text: "Reading the Inspection Report" },
      { type: "p", text: "A proper report states the standard used (ISO 2859-1, Level II), the AQL values, the lot and sample size, defect counts per class with photographs, measurement tables, and an overall result: PASS, FAIL, or PENDING (when a non-defect issue such as missing shipping marks needs correction). Never accept a verbal 'it passed' — the report is your evidence in any later claim." },
      { type: "h2", text: "If the Inspection Fails" },
      { type: "ol", items: [
        "The factory sorts and reworks the order — 100% screening of the failed defect type, then re-inspection (typically at the factory's cost).",
        "You negotiate — accept with a documented discount if the defect is cosmetic and your market tolerates it.",
        "You reject — rare, but the AQL report is what makes the rejection commercially enforceable.",
      ]},
      { type: "note", text: "Common pitfall: inspecting too early. Final random inspection requires at least 80% of the order packed in final cartons. An inspection on 50% packed goods is a 'during production' check, not a basis for shipment release." },
    ],
  },
  // ───────────────────────────────────────── 03
  {
    slug: "textile-certifications-explained",
    seoTitle: "Textile Certifications Explained",
    keywords: ["GOTS certification explained", "OEKO-TEX Standard 100 meaning", "BSCI audit textile factory", "verify GOTS certificate", "textile certifications for importers"],
    num: "03",
    category: "Compliance",
    title: "GOTS, OEKO-TEX, BSCI and ISO 9001 Explained",
    description:
      "The key certifications that matter for textile buyers — what each covers, how to verify them and which you need for your market.",
    readTime: "10 min read",
    related: ["pakistan-textile-sourcing-guide", "aql-pre-shipment-inspection", "how-to-write-a-tech-pack"],
    blocks: [
      { type: "p", text: "Certifications in the textile trade fall into three families: product certifications (what is in the textile), facility/social certifications (how the people who made it were treated) and management-system certifications (how the factory is run). Confusing the three is the most common buyer mistake — a BSCI audit says nothing about chemical safety, and an OEKO-TEX certificate says nothing about working conditions." },
      { type: "h2", text: "Product Certifications" },
      { type: "table", headers: ["Certification", "What it verifies", "When you need it"], rows: [
        ["GOTS (Global Organic Textile Standard)", "≥70% certified organic fibre plus environmental and social criteria through the whole chain", "Any 'organic' claim on the label in the EU/US"],
        ["OEKO-TEX Standard 100", "Finished article tested against a list of harmful substances; Class 1 is baby-safe", "Mass retail, baby & kids products, EU market entry"],
        ["GRS (Global Recycled Standard)", "Recycled content with chain-of-custody plus social/environmental criteria", "Any 'recycled' content claim"],
        ["BCI (Better Cotton)", "Mass-balance sourcing of more sustainably grown cotton", "Retailer sustainability programs (not a label claim)"],
      ]},
      { type: "h2", text: "Social & Facility Certifications" },
      { type: "table", headers: ["Audit / standard", "What it verifies", "Market preference"], rows: [
        ["amfori BSCI", "Social audit: labour rights, safety, wages, working hours", "European retailers"],
        ["Sedex / SMETA", "Social + ethics audit data shared on the Sedex platform", "UK retailers and brands"],
        ["WRAP", "Social compliance certification for sewn products", "US brands and importers"],
        ["SA8000", "Full social accountability management system", "Brands with strict CSR policies"],
      ]},
      { type: "h2", text: "Management Systems" },
      { type: "p", text: "ISO 9001 certifies a documented quality management system — traceable processes, corrective action loops and management review. It does not guarantee good product, but its absence in a mid-size factory is a red flag. For medical textiles, ISO 13485 and EN 13795 become relevant; for chemicals management, look for ZDHC alignment and bluesign partnership at the dye-house level." },
      { type: "h2", text: "How to Verify a Certificate — Never Trust the PDF" },
      { type: "ol", items: [
        "GOTS: check the supplier on the public GOTS certified-suppliers database; match the licence number, scope (processing categories) and validity date.",
        "OEKO-TEX: use the OEKO-TEX Label Check with the certificate number printed on the certificate — it returns the holder, product class and expiry.",
        "BSCI: ask for the producer's amfori ID and the latest audit rating (A–E) with the audit date; an importer member can pull the audit on the platform.",
        "ISO 9001: confirm the certification body is IAF-accredited and check the certificate on the CB's own register.",
      ]},
      { type: "ul", items: [
        "Match the legal entity name and address on the certificate to the factory actually making your goods — 'borrowed' certificates from sister units are a known problem.",
        "Check the scope covers your product type (a GOTS scope of 'trading' does not cover manufacturing).",
        "Check expiry — social audits are typically valid 12–24 months.",
      ]},
      { type: "h2", text: "Which Certifications Do You Actually Need?" },
      { type: "table", headers: ["Your situation", "Minimum sensible set"], rows: [
        ["Selling basic apparel/home textiles at EU retail", "OEKO-TEX 100 + BSCI (or Sedex)"],
        ["Selling in the USA", "WRAP or BSCI + CPSIA compliance for children's items"],
        ["Making an organic claim", "GOTS through every processing stage, including your importer licence if you relabel"],
        ["Baby & kids products", "OEKO-TEX Class 1 + market safety regs (CPSIA/EN 71-3)"],
        ["Hospital & medical linen", "ISO 9001 + ISO 13485 / EN 13795 as applicable"],
      ]},
      { type: "note", text: "Certification costs money and the factory recovers it in price. Demand the certificates your market genuinely requires — not the longest possible list — and verify every one of them independently. MZ Global Trading supplies verified certificate copies for the specific factory allocated to your order before bulk begins." },
    ],
  },
  // ───────────────────────────────────────── 04
  {
    slug: "incoterms-for-textile-buyers",
    seoTitle: "Incoterms for Textile Buyers",
    keywords: ["incoterms textile import", "FOB vs CIF textile", "incoterms 2020 explained importers", "FOB Karachi meaning", "CIF risk transfer textile"],
    num: "04",
    category: "Logistics",
    title: "Incoterms 2020: EXW, FOB, CIF and CFR for Textile Buyers",
    description:
      "Visual walkthrough of the four incoterms most used in textile trade — cost split, risk transfer and the correct use case for each.",
    readTime: "7 min read",
    related: ["pakistan-textile-sourcing-guide", "first-shipment-checklist", "aql-pre-shipment-inspection"],
    blocks: [
      { type: "p", text: "Incoterms define exactly where the seller's costs and risks end and yours begin. In textile trade four terms cover the overwhelming majority of contracts: EXW, FOB, CFR and CIF. Choosing the wrong one doesn't just shift cost — it shifts who controls the freight, who claims against insurance, and who is exposed when something goes wrong at a port." },
      { type: "h2", text: "The Four Terms Side by Side" },
      { type: "table", headers: ["Term", "Seller pays up to", "Risk transfers to buyer", "Who books freight", "Who insures"], rows: [
        ["EXW (Ex Works)", "Goods ready at factory gate", "At the factory gate", "Buyer", "Buyer"],
        ["FOB (Free On Board)", "Loaded on vessel at origin port", "On board the vessel", "Buyer", "Buyer"],
        ["CFR (Cost & Freight)", "Ocean freight to destination port", "On board at ORIGIN", "Seller", "Buyer"],
        ["CIF (Cost, Insurance & Freight)", "Freight + minimum insurance to destination", "On board at ORIGIN", "Seller", "Seller (min. cover, buyer is beneficiary)"],
      ]},
      { type: "note", text: "The trap in CFR and CIF: the seller pays the freight, but the RISK still transfers to you when the goods go on board at Karachi — not when they arrive. If the vessel has a problem mid-ocean under CFR, it is your loss and you have no insurance unless you bought it." },
      { type: "h2", text: "Why FOB Is the Textile Default" },
      { type: "ul", items: [
        "You (or your forwarder) control the ocean freight contract — carrier choice, routing, transit time and cost transparency.",
        "The supplier handles what they do best: export customs, port handling and loading at their own port.",
        "Price comparison between suppliers is clean — FOB Karachi vs FOB Chittagong vs FOB Shanghai compares like with like.",
        "Letters of credit work smoothly: the on-board bill of lading is the trigger document.",
      ]},
      { type: "h2", text: "When the Other Terms Make Sense" },
      { type: "ul", items: [
        "EXW — almost never for international textile buyers. You become responsible for export clearance in a country where you have no entity. If a supplier insists on EXW, ask for FCA (factory) instead.",
        "CFR — acceptable for experienced buyers who carry open marine insurance policies and just want the supplier to arrange freight.",
        "CIF — useful for first-time importers who want one invoice covering goods, freight and insurance; just understand the insurance is minimum cover (Institute Cargo Clauses C) unless you specify Clauses A.",
      ]},
      { type: "h2", text: "Common First-Time Errors" },
      { type: "ol", items: [
        "Comparing one supplier's FOB price against another's CIF price — always normalise to the same term before deciding.",
        "Accepting CIF without naming the destination port precisely (\"CIF UK\" is not a term; \"CIF Felixstowe\" is).",
        "Forgetting destination charges — under every term above, destination THC, customs clearance, duty and inland delivery are yours.",
        "Not insuring under FOB/CFR — a $50,000 order travelling uninsured for 30 days at sea is an unpriced risk on your balance sheet.",
        "Using FOB for air freight — for air shipments the correct equivalent is FCA (named airport).",
      ]},
      { type: "note", text: "MZ Global Trading quotes FOB Karachi / Port Qasim as standard and can quote CFR or CIF to any named port on request — with the cost difference shown transparently so you can compare against your own freight rates." },
    ],
  },
  // ───────────────────────────────────────── 05
  {
    slug: "how-to-write-a-tech-pack",
    seoTitle: "How to Write a Tech Pack",
    keywords: ["how to write a tech pack", "tech pack template garment", "garment specification sheet", "tech pack measurement chart tolerances", "apparel manufacturing spec sheet"],
    num: "05",
    category: "Technical",
    title: "How to Write a Tech Pack for Garment and Home Textile Manufacturing",
    description:
      "Step-by-step structure for a factory-ready Tech Pack — BOM, measurements, construction spec, print placement, finishing and packaging.",
    readTime: "12 min read",
    related: ["gsm-fabric-weight-guide", "aql-pre-shipment-inspection", "first-shipment-checklist"],
    blocks: [
      { type: "p", text: "A Tech Pack is the single document that turns your product idea into something a factory can quote accurately and manufacture repeatably. A weak Tech Pack produces a weak quotation — full of assumptions that get re-negotiated after sampling. A complete one removes ambiguity, speeds sampling by weeks and becomes the contractual reference in any quality dispute." },
      { type: "h2", text: "The Nine Sections of a Factory-Ready Tech Pack" },
      { type: "h3", text: "1. Cover page" },
      { type: "ul", items: [
        "Style name and number, season, date and version number (version control matters — factories must know which revision is live)",
        "Product category, brief description and a hero image or technical sketch",
        "Your company contact for technical questions",
      ]},
      { type: "h3", text: "2. Technical flats" },
      { type: "p", text: "Front and back line drawings (not photos) with call-outs for every construction detail: seam types, stitch placements, pocket positions, closures. For home textiles, a dimensioned drawing showing hems, borders and any decorative elements." },
      { type: "h3", text: "3. Bill of Materials (BOM)" },
      { type: "table", headers: ["BOM line", "What to specify"], rows: [
        ["Shell fabric", "Composition, construction (e.g. single jersey), weight (GSM ±5%), finish, colour reference"],
        ["Trims", "Zippers (brand/size), buttons (ligne size, material), elastic, drawcords, interlinings"],
        ["Threads", "Composition and tex/ticket size; contrast or match"],
        ["Labels", "Main label, size label, care label content (market-compliant), country of origin"],
        ["Packaging", "Polybag spec, hangtag, carton type — with artwork references"],
      ]},
      { type: "h3", text: "4. Measurement chart" },
      { type: "p", text: "Every point of measure (PoM) with a how-to-measure description, the value per size, and a tolerance column. Without tolerances, the chart is unenforceable at inspection." },
      { type: "table", headers: ["PoM (example: T-shirt)", "How to measure", "M", "Tolerance"], rows: [
        ["Chest width", "2.5 cm below armhole, flat, seam to seam", "53 cm", "±1.0 cm"],
        ["Body length", "HPS to bottom hem", "71 cm", "±1.0 cm"],
        ["Sleeve length", "Shoulder seam to cuff edge", "21 cm", "±0.5 cm"],
        ["Neck opening", "Inside edge to inside edge, flat", "18 cm", "±0.5 cm"],
      ]},
      { type: "h3", text: "5. Construction specification" },
      { type: "ul", items: [
        "Stitch types per seam (e.g. shoulder: 4-thread overlock with tape; hem: twin-needle coverstitch)",
        "Stitches per inch/cm (typical knitwear: 10–12 SPI) — this is checkable at inspection",
        "Seam allowances and any reinforcement (bartacks at pocket corners, stress points)",
      ]},
      { type: "h3", text: "6. Artwork & decoration" },
      { type: "p", text: "Print/embroidery artwork as vector files, exact placement measured from fixed reference points (e.g. '7 cm below HPS, centred'), dimensions, colour references per channel, and the technique (screen print, DTG, embroidery thread colours). Include a wash-durability requirement for prints." },
      { type: "h3", text: "7. Colourways" },
      { type: "p", text: "Each colourway with Pantone TCX references for fabric and every trim. State the approval method: lab dips against Pantone under D65 lighting, with your tolerance (e.g. grey scale 4–5)." },
      { type: "h3", text: "8. Finishing & packing" },
      { type: "ul", items: [
        "Garment finish (enzyme wash, silicone softener, compacting for shrinkage control)",
        "Folding dimensions, polybag size and warning print, ratio packing per carton (solid size or assorted)",
        "Carton specifications and shipping mark layout",
      ]},
      { type: "h3", text: "9. Quality & compliance requirements" },
      { type: "ul", items: [
        "AQL level for final inspection (e.g. 2.5 major / 4.0 minor, Level II)",
        "Shrinkage tolerance and test method (e.g. ≤5% after 3 domestic washes, ISO 6330)",
        "Colour fastness minimum grades (wash, rubbing, light) and required certifications (OEKO-TEX etc.)",
      ]},
      { type: "h2", text: "The Five Most Expensive Tech Pack Mistakes" },
      { type: "ol", items: [
        "No tolerances — every measurement dispute becomes an argument instead of a table lookup.",
        "Photos instead of flats — factories guess at construction, and you pay for the guess in sampling rounds.",
        "Missing care-label content — goods arrive unsellable in your market until relabelled.",
        "Pantone references from a screen instead of TCX swatches — lab dips bounce twice and cost you 2–3 weeks.",
        "No version control — the factory sews revision 2 while you inspect against revision 3.",
      ]},
      { type: "note", text: "Don't have a Tech Pack yet? The structured RFQ on this site captures the same core specification interactively, and our merchandising team converts approved orders into full factory Tech Packs as part of the service." },
    ],
  },
  // ───────────────────────────────────────── 06
  {
    slug: "gsm-fabric-weight-guide",
    seoTitle: "GSM Fabric Weight Guide",
    keywords: ["GSM fabric weight chart", "what GSM for t-shirts", "towel GSM guide", "thread count vs GSM bed linen", "fabric weight by product type"],
    num: "06",
    category: "Technical",
    title: "GSM Reference Guide: Choosing the Right Fabric Weight",
    description:
      "Quick-reference chart mapping GSM ranges to product applications — apparel, home textiles and fabric — with end-use recommendations.",
    readTime: "6 min read",
    related: ["how-to-write-a-tech-pack", "aql-pre-shipment-inspection", "pakistan-textile-sourcing-guide"],
    blocks: [
      { type: "p", text: "GSM — grams per square metre — is the single most-quoted number in any textile specification. It drives handfeel, drape, durability, warmth and, directly, your price: fabric is bought by weight, so a 200 GSM tee uses 25% more cotton than a 160 GSM tee of the same dimensions. This guide maps the ranges that actually matter per product." },
      { type: "h2", text: "Apparel GSM Ranges" },
      { type: "table", headers: ["Product", "Light", "Standard", "Heavy / premium"], rows: [
        ["T-shirts (single jersey)", "120–150 (fashion, drapey)", "160–180 (retail standard)", "190–240 (heavyweight, streetwear)"],
        ["Polo shirts (pique)", "170–190", "200–220", "230–260"],
        ["Sweatshirts & hoodies (fleece/terry)", "240–280", "300–360", "380–450+"],
        ["Joggers & sweatpants", "240–280", "300–340", "360–400"],
        ["Woven shirts (poplin/oxford)", "90–110", "115–135", "140–160 (brushed/flannel)"],
        ["Denim", "8–10 oz (270–340)", "11–13 oz (370–440)", "14 oz+ (475+, raw/selvedge)"],
      ]},
      { type: "h2", text: "Home Textile GSM Ranges" },
      { type: "table", headers: ["Product", "Economy", "Retail standard", "Premium / hotel"], rows: [
        ["Bath towels (terry)", "350–420", "450–550", "600–700"],
        ["Beach towels (velour)", "300–350", "380–420", "450–500"],
        ["Bathrobes", "280–350", "380–420", "450–500"],
        ["Bath mats", "700–900", "1000–1200", "1300–1500"],
        ["Fleece blankets", "180–220", "240–280", "300–350"],
        ["Kitchen towels (waffle/terry)", "150–180", "200–250", "260–300"],
      ]},
      { type: "h2", text: "Thread Count vs GSM for Bed Linen" },
      { type: "p", text: "Bed linen is specified by thread count (TC = ends + picks per square inch), not GSM — but the two interact. A 300 TC percale of fine combed yarn weighs around 110–120 GSM and feels crisp; a 300 TC sateen of the same yarn weighs slightly more and feels smoother because of the weave, not the count. Above roughly 600 TC, increases come from multi-ply counting rather than genuinely finer construction — at that point compare GSM, yarn fineness and finish instead of the headline TC." },
      { type: "table", headers: ["Bed linen grade", "Thread count", "Typical construction"], rows: [
        ["Institutional / hospitality", "T-180 – T-200", "Percale, often poly-cotton"],
        ["Retail standard", "T-200 – T-300", "100% cotton percale or sateen"],
        ["Premium retail", "T-300 – T-600", "Combed/compact cotton sateen"],
        ["Luxury", "T-600+", "Fine-count, often multi-ply — verify construction"],
      ]},
      { type: "h2", text: "How GSM Affects Cost and Performance" },
      { type: "ul", items: [
        "Cost scales nearly linearly with GSM for the same fabric type — moving a tee from 160 to 180 GSM raises fabric cost ~12%.",
        "Heavier is not automatically better: a 700 GSM towel absorbs more but dries slowly and raises laundry costs — hotels often deliberately choose 500–550.",
        "Always specify GSM with a tolerance (±5% is standard) and the state it applies to: finished, relaxed fabric — not greige.",
        "Verify at inspection with a GSM cutter (100 cm² punch, weighed ×100) — it takes two minutes and prevents the most common silent substitution in the trade.",
      ]},
      { type: "note", text: "Unsure which weight fits your market and price point? Send us the product and target retail price through the RFQ — recommending the right construction and GSM band is part of every MZ Global Trading quotation." },
    ],
  },
  // ───────────────────────────────────────── 07
  {
    slug: "pakistan-vs-bangladesh-vs-china",
    seoTitle: "Pakistan vs Bangladesh vs China",
    keywords: ["Pakistan vs Bangladesh textile sourcing", "Pakistan vs China garment manufacturing", "best country to source textiles", "textile sourcing country comparison", "GSP+ Pakistan EU duty textiles"],
    num: "07",
    category: "Sourcing",
    title: "Pakistan vs Bangladesh vs China: Textile Sourcing Compared",
    description:
      "Objective comparison across cost, lead time, certification availability, MOQ and product specialisation — with a decision matrix for buyers.",
    readTime: "8 min read",
    related: ["pakistan-textile-sourcing-guide", "incoterms-for-textile-buyers", "first-shipment-checklist"],
    blocks: [
      { type: "p", text: "No single country wins textile sourcing outright — each of the big three has a distinct profile, and the right answer depends on your product, volumes and market. This comparison is deliberately even-handed: we source from Pakistan, but the fastest way to lose a buyer's trust is to pretend the alternatives have no strengths." },
      { type: "h2", text: "The Headline Comparison" },
      { type: "table", headers: ["Factor", "Pakistan", "Bangladesh", "China"], rows: [
        ["Labour cost", "Low", "Lowest", "High (2–3× PK/BD)"],
        ["Raw material base", "Domestic cotton — major advantage", "Mostly imported fibre/fabric", "Domestic, incl. synthetics dominance"],
        ["Typical production lead time", "60–90 days", "90–120 days", "45–75 days"],
        ["EU duty status", "GSP+ (duty-free most lines)", "EBA (duty-free, transitioning post-LDC)", "Full MFN duty (typically 12%)"],
        ["US duty status", "MFN rates", "MFN rates", "MFN + Section 301 exposure on some lines"],
        ["Typical MOQ flexibility", "Moderate — good for 1,000–5,000 pc programs", "High MOQs — built for volume", "Highly variable; small-lot ecosystems exist"],
        ["Vertical integration", "Strong (cotton to garment)", "Strong in knits; wovens import fabric", "Strongest overall"],
        ["Synthetics & technical fabrics", "Limited", "Limited", "World-leading"],
      ]},
      { type: "h2", text: "Product Specialisation — Where Each Country Wins" },
      { type: "table", headers: ["Product", "First choice", "Why"], rows: [
        ["Terry towels & bath linen", "Pakistan", "Top-3 global exporter; domestic cotton; dedicated mills"],
        ["Denim", "Pakistan / Bangladesh", "PK: vertical mills & laundries; BD: volume price"],
        ["Basic knits (tees, fleece)", "Bangladesh / Pakistan", "BD at extreme volume; PK for cotton quality & speed"],
        ["Bed linen & home textiles", "Pakistan / China", "PK for cotton wovens; CN for wide-width prints & blends"],
        ["Performance / activewear", "China", "Synthetic fibre chain, technical finishes"],
        ["Outerwear & complex construction", "China", "Component ecosystem, technical sewing"],
        ["Hospital & institutional linen", "Pakistan", "Durable cotton/poly weaves, autoclavable constructions"],
      ]},
      { type: "h2", text: "Risk & Compliance Profile" },
      { type: "ul", items: [
        "All three countries have deep audit coverage (BSCI/Sedex/WRAP). Bangladesh leads in structural/fire safety programs post-Accord; Pakistan and China audit coverage is broad at export-grade factories.",
        "China carries tariff and forced-labour-regulation exposure for US buyers (Section 301, UFLPA cotton scrutiny) — a compliance burden the other two largely avoid.",
        "Pakistan's GSP+ gives EU buyers a hard landed-cost edge of typically 9–12% over China on like products.",
        "Currency: PKR volatility can work in buyers' favour on USD contracts; lock prices per order, not per year.",
      ]},
      { type: "h2", text: "A Simple Decision Matrix" },
      { type: "table", headers: ["If your priority is…", "Lean towards"], rows: [
        ["Lowest possible FOB on high-volume basics", "Bangladesh"],
        ["Cotton-rich products with EU duty advantage", "Pakistan"],
        ["Technical synthetics, complex garments, components", "China"],
        ["Mid-size orders (1–10k pcs) with negotiable MOQs", "Pakistan"],
        ["Speed for replenishment programs", "China (or Pakistan for cotton lines)"],
        ["Towels, denim, bed linen specifically", "Pakistan — category specialist"],
      ]},
      { type: "note", text: "Most mature buyers run a two-country strategy: a primary origin per category plus a qualified backup. If cotton-based apparel or home textiles are in your range, Pakistan has earned a place on that shortlist — and MZ Global Trading exists to make testing it low-risk: vetted factories, supervised sampling and inspected shipments from the first order." },
    ],
  },
  // ───────────────────────────────────────── 08
  {
    slug: "first-shipment-checklist",
    seoTitle: "First Shipment Checklist for Importers",
    keywords: ["first import shipment checklist", "textile import checklist new buyers", "pre-shipment checklist garments", "PP sample approval process", "import documents checklist textile"],
    num: "08",
    category: "Sourcing",
    title: "First Shipment Checklist: Step-by-Step for New Importers",
    description:
      "A complete pre-shipment preparation checklist for buyers placing their first bulk order — from Tech Pack sign-off to container seal confirmation.",
    readTime: "5 min read",
    related: ["aql-pre-shipment-inspection", "incoterms-for-textile-buyers", "pakistan-textile-sourcing-guide"],
    blocks: [
      { type: "p", text: "First bulk orders fail for predictable reasons: an unapproved sample, a missed document, an inspection booked too late. This checklist sequences every verification from order confirmation to the container leaving port. Work through it in order — each stage gates the next." },
      { type: "h2", text: "Stage 1 — Before Production Starts" },
      { type: "ol", items: [
        "Tech Pack signed off — final revision number confirmed in writing by both sides.",
        "Pre-production (PP) sample received, checked against the Tech Pack and approved in writing. Keep one sealed counter-sample.",
        "Lab dips / strike-offs approved for every colourway.",
        "Order confirmation states: quantity per size/colour, FOB price and term, ship date, AQL level, tolerances (GSM, measurements, shrinkage) and payment terms.",
        "Deposit paid against proforma invoice (if TT) or LC opened and accepted by the supplier's bank.",
        "Care label and packaging artwork approved — confirm market compliance (fibre content wording, country of origin, warning prints).",
      ]},
      { type: "h2", text: "Stage 2 — During Production" },
      { type: "ol", items: [
        "Bulk fabric approval: GSM report and shade continuity (request a fabric swatch card from bulk before cutting).",
        "In-line inspection report at ~20–30% sewn — catches systematic defects while they are still cheap to fix.",
        "Weekly production status with photos against the agreed timeline.",
        "Book the final inspection 7–10 days before ex-factory — never after goods are 100% packed and the vessel is fixed.",
        "Book freight (FOB: your forwarder; CIF/CFR: confirm vessel details from supplier) and confirm the shipping mark layout.",
      ]},
      { type: "h2", text: "Stage 3 — Final Inspection & Release" },
      { type: "ol", items: [
        "Final random inspection at ≥80% packed, per ISO 2859-1 Level II at your specified AQL.",
        "Review the full report — defect photos, measurement tables, packing check — not just the PASS stamp.",
        "Any FAIL: agree rework + re-inspection dates in writing before discussing the vessel.",
        "Written shipment release issued by you (or your sourcing partner) — this is the gate for loading.",
        "Container loading supervision: carton count tallied, container condition checked, seal number photographed and recorded.",
      ]},
      { type: "h2", text: "Stage 4 — Documents & Arrival" },
      { type: "ol", items: [
        "Document set checked against LC/contract: commercial invoice, packing list, bill of lading, certificate of origin (GSP/DCTS form for EU/UK preferences), and any product certificates.",
        "Balance payment per terms; documents released; surrender or courier of original B/L confirmed.",
        "Customs broker at destination pre-alerted with copy documents and HS codes.",
        "Marine insurance confirmed (your policy under FOB/CFR).",
        "On arrival: count and condition check at deconsolidation; report any discrepancy within the claim window of your insurance and contract.",
      ]},
      { type: "h2", text: "The Five Documents to Verify Line-by-Line" },
      { type: "table", headers: ["Document", "What to check"], rows: [
        ["Commercial invoice", "Prices, term (FOB/CIF + port), totals match the order confirmation"],
        ["Packing list", "Carton count, per-carton contents, net/gross weights, measurements"],
        ["Bill of lading", "Consignee/notify party, port pair, 'shipped on board' date, container & seal numbers"],
        ["Certificate of origin", "Correct preference form for your market (EUR.1/REX/DCTS), HS codes match invoice"],
        ["Inspection report", "Standard, AQL, lot/sample size, result PASS, signed and dated"],
      ]},
      { type: "note", text: "Buyers working with MZ Global Trading get this checklist executed as part of the agreed service scope — sampling supervision, in-line and final inspection, loading supervision and a verified document set — with one accountable contact from enquiry to arrival." },
    ],
  },
];

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);

export function getGuide(slug: string): GuideArticle | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
