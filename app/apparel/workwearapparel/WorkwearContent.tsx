"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─── scroll helper ─── */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 128 + 48 + 16;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ─── BackToTop ─── */
function BackToTop({ dark }: { dark?: boolean }) {
  return (
    <div className="flex justify-center mt-16">
      <button
        onClick={() => scrollToId("ww-bento")}
        className={`group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 ${
          dark ? "border border-gold/60 text-gold hover:bg-gold hover:text-navy-900" : "border-2 border-gold text-navy-900 hover:bg-gold shadow-sm"
        }`}
        style={{ animation: "btt-pulse 2.2s ease-out infinite" }}
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} aria-hidden="true">↑</motion.span>
        Move back to top
      </button>
      <style>{`@keyframes btt-pulse{0%{box-shadow:0 0 0 0 rgba(212,160,23,.45)}70%{box-shadow:0 0 0 10px rgba(212,160,23,0)}100%{box-shadow:0 0 0 0 rgba(212,160,23,0)}}`}</style>
    </div>
  );
}

/* ─── ExploreBtn ─── */
function ExploreBtn({ sectionId, label }: { sectionId: string; label: string }) {
  return (
    <button
      onClick={() => scrollToId(sectionId)}
      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-gold hover:text-amber-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      aria-label={`Explore ${label}`}
    >
      {label}
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path fillRule="evenodd" d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.44 8.75H2.75a.75.75 0 010-1.5h8.69L8.22 4.03a.75.75 0 010-1.06z" clipRule="evenodd" />
      </svg>
    </button>
  );
}

/* ─── DATA ─── */

const CONSTRUCTIONS = [
  {
    name: "Canvas (Heavy)",
    gsm: "280–400 gsm",
    composition: "100% Cotton or 65/35 Poly-Cotton",
    strength: "Exceptional",
    suitable: "General labour, trades, outdoor work",
    certNotes: "BSCI, WRAP, SA8000",
    tag: "STANDARD",
    tagColor: "bg-amber-100 text-amber-800",
    desc:
      "The workhorse of workwear. Dense plain-weave canvas delivers abrasion resistance for high-wear zones — knees, elbows, cuffs. Poly-cotton blends add shape retention for uniform programmes.",
  },
  {
    name: "Ripstop TC Poly-Cotton",
    gsm: "240–320 gsm",
    composition: "65/35 Poly-Cotton with reinforcement grid",
    strength: "Superior tear resistance",
    suitable: "Construction, logistics, field crews",
    certNotes: "ISO 9001, BSCI, Sedex",
    tag: "HIGH-PERFORMANCE",
    tagColor: "bg-teal-100 text-teal-800",
    desc:
      "The signature grid weave halts tear propagation at the point of contact. Lighter than canvas while resisting rip forces. Ideal for fleet uniforms where durability-to-weight matters.",
  },
  {
    name: "Twill (Durable)",
    gsm: "260–340 gsm",
    composition: "100% Cotton or 80/20 Poly-Cotton",
    strength: "High — diagonal weave integrity",
    suitable: "Maintenance crews, service uniforms",
    certNotes: "ISO 9001, WRAP, BSCI",
    tag: "VERSATILE",
    tagColor: "bg-sky-100 text-sky-800",
    desc:
      "Diagonal weave locks yarns under stress, preventing pilling and surface wear. Accepts dyeing exceptionally well — suited for branded corporate colour programmes requiring precise colour matching.",
  },
  {
    name: "FR Cotton (Flame Retardant)",
    gsm: "280–360 gsm",
    composition: "100% FR-treated Cotton",
    strength: "Meets EN ISO 11612 / NFPA 2112",
    suitable: "Oil & gas, mining, electrical trades",
    certNotes: "EN ISO 13688, ISO 9001",
    tag: "SAFETY-RATED",
    tagColor: "bg-rose-100 text-rose-800",
    desc:
      "Inherent or durable FR treatment that resists ignition and self-extinguishes. Maintains protection after 50+ industrial laundry cycles. Mandatory for arc flash and petrochemical environments.",
  },
  {
    name: "Hi-Vis Polyester / Fluorescent",
    gsm: "120–180 gsm shell",
    composition: "100% Polyester with retroreflective tape",
    strength: "EN ISO 20471 Class 2 / Class 3",
    suitable: "Road works, logistics, rail, night shifts",
    certNotes: "EN ISO 13688, EN ISO 20471",
    tag: "VISIBILITY-RATED",
    tagColor: "bg-yellow-100 text-yellow-800",
    desc:
      "Fluorescent background with silver retroreflective tape meeting international day / night visibility standards. Sewn-in reflective tape patterns available for full Class 2 or Class 3 compliance.",
  },
  {
    name: "Denim (Workwear Grade)",
    gsm: "340–420 gsm",
    composition: "100% Cotton or 98/2 Cotton-Spandex",
    strength: "Very high — 3×1 twill dense",
    suitable: "Denim jeans, overalls, heavy-use trades",
    certNotes: "BSCI, BCI, WRAP",
    tag: "TRADE CLASSIC",
    tagColor: "bg-indigo-100 text-indigo-800",
    desc:
      "Workwear-weight denim at 340 gsm+ gives the structural integrity of classic trade garments. BCI cotton sourcing option available for buyers with sustainability requirements in their supply chain.",
  },
];

const FIT_PROFILES = [
  {
    name: "Regular Fit",
    label: "STANDARD PROGRAMME",
    score: 85,
    scoreLabel: "Coverage breadth",
    detail:
      "Proportioned for a mixed workforce — generous through chest and seat, straight leg. Industry default for fleet orders covering varied body types.",
    highlight: "Ideal for bulk fleet ordering across gender & body type diversity",
  },
  {
    name: "Loose / Relaxed (Safety)",
    label: "SAFETY COMPLIANT",
    score: 100,
    scoreLabel: "Safety compliance",
    detail:
      "Mandated in environments where PPE layers underneath. Loose at shoulder, arm, and leg — ensures unrestricted evacuation movement. EN ISO 13688 compliant cut.",
    highlight: "Mandatory for FR and hi-vis garments over PPE base layers",
  },
  {
    name: "Slim (Modern Workwear)",
    label: "CORPORATE UNIFORMS",
    score: 72,
    scoreLabel: "Movement comfort",
    detail:
      "Tailored silhouette for service, hospitality, and corporate trade environments where brand presentation matters alongside function. Not recommended for heavy physical PPE use.",
    highlight: "Service industry uniforms, corporate trades, concierge teams",
  },
];

const GSM_TIERS = [
  {
    label: "Light Duty",
    range: "240–280 gsm",
    width: "55%",
    colour: "bg-sky-400",
    uses: "Food processing, service roles, clean environments",
    properties: "Breathable, easy-care, comfortable all-day wear",
  },
  {
    label: "Medium Duty",
    range: "280–320 gsm",
    width: "70%",
    colour: "bg-teal-500",
    uses: "Construction, logistics, field maintenance",
    properties: "Balanced durability and movement; fleet programme default",
  },
  {
    label: "Heavy Duty",
    range: "320–360 gsm",
    width: "85%",
    colour: "bg-amber-500",
    uses: "Mining, trades, abrasive environments",
    properties: "High abrasion resistance; reinforced stress points standard",
  },
  {
    label: "Industrial Grade",
    range: "360–400+ gsm",
    width: "100%",
    colour: "bg-rose-600",
    uses: "Oil & gas, arc flash zones, heavy industry",
    properties: "Maximum structural integrity; meets EN ISO 11612 FR thresholds",
  },
];

const DECO_METHODS = [
  {
    name: "Left Chest Embroidery",
    ideal: "Company logos, crests",
    durability: "Excellent — withstands industrial laundering",
    placements: "Left chest, right chest, sleeves",
    icon: "🪡",
    note: "Preferred for corporate fleet identity",
  },
  {
    name: "Back Large-Format Print",
    ideal: "Company name, division text",
    durability: "Good — avoid solvent exposure",
    placements: "Full back panel",
    icon: "🖨️",
    note: "Screen print or heat transfer on hi-vis panels",
  },
  {
    name: "Woven Badge / Patch",
    ideal: "Premium uniform identity",
    durability: "Very high — sewn-on lasts garment life",
    placements: "Chest, shoulder epaulette, sleeve",
    icon: "🏷️",
    note: "Removable Velcro version available for shared garments",
  },
  {
    name: "Reflective Tape (Sewn)",
    ideal: "Safety compliance (EN ISO 20471)",
    durability: "High — 30+ wash cycles per standard",
    placements: "Torso bands, sleeve, leg bands",
    icon: "⚡",
    note: "Mandatory on Class 2 and Class 3 hi-vis orders",
  },
];

const COLOURS = [
  { name: "Safety Orange", hex: "#FF6600", type: "hi-vis" },
  { name: "Fluorescent Yellow", hex: "#FFFF00", type: "hi-vis" },
  { name: "Lime Green", hex: "#76B900", type: "hi-vis" },
  { name: "Navy Blue", hex: "#001F5B", type: "standard" },
  { name: "Royal Blue", hex: "#3B5BDB", type: "standard" },
  { name: "Charcoal", hex: "#4A4A4A", type: "standard" },
  { name: "Black", hex: "#111111", type: "standard" },
  { name: "Khaki / Tan", hex: "#C3A882", type: "standard" },
  { name: "Olive Drab", hex: "#6B7340", type: "standard" },
  { name: "Custom Pantone", hex: "", type: "custom" },
];

const OEM_FEATURES = [
  {
    step: "01",
    title: "Technical Pack Review",
    desc: "Our engineers review your garment tech pack — fabric specs, safety certifications required, decoration brief, and compliance requirements — before factory selection.",
  },
  {
    step: "02",
    title: "Certified Factory Matching",
    desc: "We match your programme to factories in our 50+ vetted network holding the specific certifications your programme requires: EN ISO 13688, NFPA, BSCI, SA8000.",
  },
  {
    step: "03",
    title: "FR & Hi-Vis Compliance Testing",
    desc: "Factory testing for FR self-extinguishing time, reflective tape retroreflectivity, and colour fastness to industrial laundering — all verified before bulk production.",
  },
  {
    step: "04",
    title: "Fleet Size Programmes",
    desc: "Full size range production across XS–5XL with per-size allocation planning for fleet orders. Individual employee name / number embroidery available.",
  },
  {
    step: "05",
    title: "Branded Packaging",
    desc: "Individual polybag with size label, or bulk export carton labelled per programme. Garment hang-tag with care instructions and safety certification details included.",
  },
  {
    step: "06",
    title: "Repeat Order Infrastructure",
    desc: "Colour-matched fabrics held on order card; trim specifications stored. Annual fleet replenishment programmes processed with consistent quality across production runs.",
  },
];

const SECTORS = [
  {
    name: "Construction & Civil",
    icon: "🏗️",
    requirements: "Heavy canvas, ripstop, reinforced knees, hi-vis options",
    markets: "USA, UK, Australia, UAE, Saudi Arabia",
    colour: "bg-amber-50 border-amber-200",
  },
  {
    name: "Oil, Gas & Petrochemical",
    icon: "⛽",
    requirements: "FR cotton mandatory, EN ISO 11612, anti-static finishing",
    markets: "Saudi Arabia, UAE, Qatar, Kuwait, Norway, USA",
    colour: "bg-rose-50 border-rose-200",
  },
  {
    name: "Mining & Extraction",
    icon: "⛏️",
    requirements: "Heavy duty 360+ gsm, FR options, hi-vis Class 3",
    markets: "Australia, Canada, South Africa, Chile, Peru",
    colour: "bg-stone-50 border-stone-200",
  },
  {
    name: "Logistics & Warehousing",
    icon: "📦",
    requirements: "Ripstop, hi-vis Class 2, breathable medium-duty construction",
    markets: "UK, Germany, USA, Netherlands, UAE",
    colour: "bg-sky-50 border-sky-200",
  },
  {
    name: "Healthcare & Facility Services",
    icon: "🏥",
    requirements: "Light-medium canvas, anti-bacterial, colour-coded by division",
    markets: "UK, Canada, Germany, Australia, Gulf states",
    colour: "bg-teal-50 border-teal-200",
  },
  {
    name: "Food Processing & Hospitality",
    icon: "🍽️",
    requirements: "Food-safe dyestuffs, HACCP-compliant lightweight fabric, no external pockets, colour-coded zones",
    markets: "USA, Germany, Netherlands, Australia, UAE",
    colour: "bg-green-50 border-green-200",
  },
  {
    name: "Manufacturing & Automotive",
    icon: "🏭",
    requirements: "Anti-static options, reinforced knees, multiple utility pockets, oil-resistant finishing",
    markets: "Germany, USA, UK, Czech Republic, Mexico",
    colour: "bg-zinc-50 border-zinc-200",
  },
  {
    name: "Electrical & Energy",
    icon: "⚡",
    requirements: "Arc-rated FR garments, NFPA 70E / IEC 61482 compliance, anti-static construction",
    markets: "USA, UK, Germany, Australia, Saudi Arabia",
    colour: "bg-yellow-50 border-yellow-200",
  },
  {
    name: "Security & Law Enforcement",
    icon: "🛡️",
    requirements: "Tactical pocket layout, reinforced seams, low-profile uniform finish, ID badge accommodation",
    markets: "UK, Germany, USA, Gulf states, Australia",
    colour: "bg-indigo-50 border-indigo-200",
  },
  {
    name: "Agriculture & Outdoor",
    icon: "🌾",
    requirements: "Breathable lightweight canvas, waterproof outer options, UV protection, reinforced knees",
    markets: "Australia, New Zealand, USA, Canada, UK",
    colour: "bg-lime-50 border-lime-200",
  },
];

const CERTIFICATIONS = [
  { name: "ISO 9001", desc: "Quality Management", file: "iso9001" },
  { name: "BSCI", desc: "Social Compliance", file: "bsci" },
  { name: "WRAP", desc: "Responsible Production", file: "wrap" },
  { name: "SA8000", desc: "Labour Standards", file: "sa8000" },
  { name: "Sedex", desc: "Ethical Sourcing Data", file: "sedex" },
  { name: "OEKO-TEX", desc: "Harmful Substances", file: "oeko-tex" },
  { name: "GRS", desc: "Recycled Content", file: "grs" },
  { name: "Bluesign", desc: "Process Chemistry", file: "bluesign" },
];

const EXPORT_STEPS = [
  { n: "01", label: "Order Confirmation", detail: "Tech pack, quantities, size ratio, delivery port" },
  { n: "02", label: "Lab Dip / Pre-Production", detail: "Colour matching, FR test sample, reflective tape validation" },
  { n: "03", label: "Bulk Production", detail: "Fabric inspection → cutting → sewing → finishing → QC inline" },
  { n: "04", label: "Final Inspection", detail: "Random sampling per AQL 2.5; FR and wash-fastness test on bulk" },
  { n: "05", label: "Packing & Marking", detail: "Individual polybag or carton; export marks per buyer requirement" },
  { n: "06", label: "Shipment Dispatch", detail: "FOB Karachi / CIF / CFR to designated port" },
];

const PACK_OPTIONS = [
  { label: "Individual polybag", detail: "Per piece with size label" },
  { label: "Hanger + polybag", detail: "For retail or premium uniform programmes" },
  { label: "Bulk export carton", detail: "12–24 pieces per carton, no individual packing" },
  { label: "Branded fleet pack", detail: "Employee name / number labelled per piece" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌾", title: "BCI Better Cotton", scope: "Cotton-rich workwear fabrics", standard: "Better Cotton Initiative", desc: "Available for cotton-rich workwear fabrics sourced under the Better Cotton Initiative." },
  { icon: "♻️", title: "GRS Recycled Fibres", scope: "Recycled polyester ripstop & hi-vis shell", standard: "Global Recycled Standard", desc: "Recycled polyester ripstop and hi-vis shell fabric available for sustainability-focused fleet programmes." },
  { icon: "🧪", title: "OEKO-TEX Tested", scope: "All fabric in direct skin contact", standard: "OEKO-TEX Standard 100", desc: "Fabrics and dyes tested against 100+ restricted substances. Safe for prolonged skin contact in work environments." },
  { icon: "🏭", title: "SA8000 Labour", scope: "All sourcing factories", standard: "Social Accountability Intl.", desc: "Verified living wage, no forced labour, safe workplace conditions in all sourcing factories." },
  { icon: "💧", title: "Bluesign Chemistry", scope: "Dyeing and finishing processes", standard: "Bluesign Standard", desc: "Reduced water and chemical use in dyeing and finishing. Option for buyers with Scope 3 chemical footprint targets." },
  { icon: "📋", title: "Sedex SMETA Audits", scope: "Factory-level ethical audits", standard: "Sedex SMETA 4-Pillar", desc: "Factory-level ethical audit data shared via Sedex platform for buyers with supply chain transparency requirements." },
];

const LEAD_STAGES = [
  { phase: "Enquiry → Sample", weeks: "3–4", note: "Tech pack review, factory match, pre-production sample" },
  { phase: "Sample Approval", weeks: "1–2", note: "Buyer sign-off on sample, compliance test results" },
  { phase: "Bulk Production", weeks: "6–10", note: "Varies with programme size, FR testing adds time" },
  { phase: "QC & Packing", weeks: "1–2", note: "AQL inspection, carton marking, packing confirmation" },
  { phase: "Transit (FOB)", weeks: "2–5", note: "Subject to destination port and shipping schedule" },
];

const PROCESS_STEPS = [
  { n: "1", title: "Requirement Analysis", desc: "Define end-use sector, safety standards required, size allocation and branding brief with your sourcing manager." },
  { n: "2", title: "Factory Selection", desc: "Shortlist certified factories from our 50+ vetted network based on your compliance requirements and volume." },
  { n: "3", title: "Sampling & Compliance", desc: "Pre-production sample with FR/hi-vis test reports where applicable. Fabric and trim approvals." },
  { n: "4", title: "Bulk Production", desc: "Inline quality checks at cutting, sewing and finishing. Deviation log maintained." },
  { n: "5", title: "Inspection & Clearance", desc: "Third-party or in-house AQL 2.5 inspection. Safety attribute checks on bulk." },
  { n: "6", title: "Export & Delivery", desc: "Commercial documents, packing list, certificates of origin and test reports dispatched with shipment." },
];

const FAQS = [
  {
    q: "Can you supply FR-rated workwear that meets EN ISO 11612 and NFPA 2112?",
    a: "Yes. Our factory network includes facilities experienced in FR cotton garments with durable or inherent FR treatment. We supply test reports confirming flame spread, char length and afterflame duration per EN ISO 11612 / NFPA 2112. FR protection is validated on bulk fabric before production begins.",
  },
  {
    q: "What hi-vis visibility classes can you manufacture to?",
    a: "We manufacture garments meeting EN ISO 20471 Class 2 and Class 3 using fluorescent polyester background fabric with silver retroreflective tape sewn at mandatory minimum widths and positions. Class 1 accessories are also available. Test certification from accredited labs is provided.",
  },
  {
    q: "Is individual employee name or number embroidery available for fleet orders?",
    a: "Yes. For fleet programmes, individual personalisation — employee name, number, or job title — is embroidered at the left chest or right chest. Each garment is bagged individually with the employee's details on the polybag. Sorting and packing lists are provided for distribution.",
  },
  {
    q: "Do you offer anti-static finishing for electrical-hazard environments?",
    a: "Yes. Anti-static finishing is available on canvas and ripstop fabrics. The treatment meets EN 1149-3 (charge decay) requirements suitable for garment use in ATEX environments. Anti-static properties are validated after 50 wash cycles.",
  },
  {
    q: "What is the process for a repeat annual fleet order?",
    a: "After the first production run, we retain your colour lab dip reference, approved trim spec, and factory file. Annual repeat orders are processed against that file, ensuring consistent colour and quality. Minimum lead time for repeat orders is shorter than first production as pre-production sampling is condensed.",
  },
  {
    q: "Can you produce workwear in custom corporate colours with precise Pantone matching?",
    a: "Yes. We work to target Pantone / RAL references with lab dip approval before bulk dyeing. Corporate colour programmes with consistent colour across multiple garment types (jackets, trousers, shirts) are matched within ΔE 1.0 tolerance. Colour consistency is confirmed on bulk fabric pre-cut.",
  },
  {
    q: "Which garment types can you source — do you cover full-body coveralls and bib-and-brace overalls?",
    a: "Yes. Our catalogue covers five garment categories: upper body (shirts, FR shirts, work jackets), lower body (work trousers, cargo pants, FR trousers), full-body (coveralls/boiler suits, bib-and-brace overalls, hi-vis one-piece coveralls), outerwear (hi-vis jackets, rain jackets, FR jackets), and accessories (safety vests, aprons, caps). If your required garment type is not listed, submit the specification in your RFQ and we confirm factory capability.",
  },
  {
    q: "Can you supply extended sizes up to 5XL for large fleet programmes?",
    a: "Yes. Our standard size range for men's workwear runs XS through 5XL with EU 44–60 equivalents. Women's sizing runs XS/6 through 3XL/20 with EU 34–48 equivalents. All size charts are based on body measurements in centimetres. Custom grading for non-standard size ranges is available on request. For fleet programmes, buyers provide a size ratio and we produce per that allocation.",
  },
  {
    q: "How do you confirm compliance with the correct safety standard for our destination market?",
    a: "At enquiry stage we review your destination market and end-use sector and identify the applicable standard — EN ISO for EU and UK, NFPA for USA, ANSI/ISEA 107 for US hi-vis, AS/NZS 4602.1 for Australia and New Zealand. We then confirm that the selected factory holds the required certification before production is authorised. Test reports from accredited third-party laboratories are provided with shipment documentation.",
  },
  {
    q: "Can workwear accessories (vests, aprons, base layers) be included in the same order as garments?",
    a: "Yes. Hi-vis safety vests, work aprons, bouffant caps, neck gaiters, moisture-wicking base layers, reflective wristbands, ID lanyards, and fleece liner jackets can all be included in a single RFQ alongside your garment order. We coordinate sourcing and consolidate accessories and garments into one shipment from Pakistan to your nominated port, reducing freight cost and administrative overhead.",
  },
];


const WORKWEAR_ARTICLES = [
  {
    category: "Upper Body",
    icon: "👕",
    accent: "bg-blue-50 border-blue-200",
    labelClr: "text-blue-700",
    garments: [
      { name: "Work Shirts & Polo Shirts", desc: "Woven or piqué knit. Collar formats for corporate identity programmes. Available in short and long sleeve.", tags: ["Corporate", "Service", "Healthcare"] },
      { name: "Hi-Vis T-Shirts", desc: "Fluorescent background with reflective tape at chest and shoulder. Class 1 base-layer for low-risk visibility zones.", tags: ["Construction", "Logistics"] },
      { name: "Work Jackets & Blouson", desc: "Mid-layer or outer-shell in canvas or ripstop. Removable liner options. Available in standard and hi-vis shell.", tags: ["Construction", "Outdoor", "Cold weather"] },
      { name: "FR Shirts", desc: "FR cotton treated or inherent. Satisfies EN ISO 11612 arc and flame requirements. Available in Class A1/A2.", tags: ["Oil & Gas", "Petrochemical", "Electrical"] },
    ],
  },
  {
    category: "Lower Body",
    icon: "👖",
    accent: "bg-amber-50 border-amber-200",
    labelClr: "text-amber-700",
    garments: [
      { name: "Work Trousers", desc: "Straight leg with reinforced knees and multiple utility pockets. Available in canvas, ripstop and twill.", tags: ["Construction", "Logistics", "Mining"] },
      { name: "Cargo Pants", desc: "Dual-bellows cargo pockets with secure flap fastening. Used across construction and logistics sectors.", tags: ["Construction", "Outdoor"] },
      { name: "FR Trousers", desc: "FR cotton construction to pair with FR shirts in two-piece suit programmes. EN ISO 11612 validated.", tags: ["Oil & Gas", "Electrical"] },
    ],
  },
  {
    category: "Full-Body Garments",
    icon: "🦺",
    accent: "bg-emerald-50 border-emerald-200",
    labelClr: "text-emerald-700",
    garments: [
      { name: "Coveralls / Boiler Suits", desc: "One-piece full-body construction in canvas or ripstop. Zip-front with concealed placket. Standard, FR and anti-static options.", tags: ["Oil & Gas", "Industrial", "Mining"] },
      { name: "Bib & Brace Overalls", desc: "Adjustable shoulder straps, front bib pocket. Ideal for trades needing torso coverage without a full-body suit.", tags: ["Construction", "Manufacturing"] },
      { name: "Hi-Vis One-Piece Coverall", desc: "Fluorescent shell with sewn reflective tape meeting EN ISO 20471 Class 3. Road maintenance and site-perimeter work.", tags: ["Road", "Construction", "Rail"] },
    ],
  },
  {
    category: "Outerwear",
    icon: "🧥",
    accent: "bg-violet-50 border-violet-200",
    labelClr: "text-violet-700",
    garments: [
      { name: "Hi-Vis Jackets", desc: "Fluorescent polyester shell with retroreflective tape. EN ISO 20471 Class 2 or Class 3. Multiple pocket configurations.", tags: ["Construction", "Logistics", "Rail"] },
      { name: "Rain Jackets / Windcheaters", desc: "Waterproof/water-resistant outer layer in ripstop or bonded fabric. Available in hi-vis or standard colour.", tags: ["Outdoor", "Construction", "Agriculture"] },
      { name: "FR Jackets", desc: "Inherent or treated FR outer shell. Paired with FR trousers for two-piece compliance programmes in petrochemical environments.", tags: ["Oil & Gas", "Electrical"] },
    ],
  },
  {
    category: "Accessories & Add-ons",
    icon: "🎒",
    accent: "bg-rose-50 border-rose-200",
    labelClr: "text-rose-700",
    garments: [
      { name: "Safety Vests (Hi-Vis)", desc: "Mesh or solid fluorescent shell with adjustable side. Class 2 per EN ISO 20471 / ANSI/ISEA 107. Fast assembly for site check-in.", tags: ["All sectors", "Site visitors"] },
      { name: "Work Aprons", desc: "Canvas or poly-cotton. Used in food processing, laboratory, and automotive finishing environments.", tags: ["Food", "Lab", "Automotive"] },
      { name: "Disposable / Reusable Caps", desc: "Bouffant and mob caps for food and pharmaceutical environments. Non-woven or cotton. Colour-coded by department.", tags: ["Food", "Pharma", "Hospital"] },
    ],
  },
];

const COMPLIANCE_STANDARDS = [
  {
    code: "EN ISO 13688",
    title: "General Performance Requirements",
    region: "EU / UK",
    hazard: "All workwear baseline",
    icon: "🇪🇺",
    accent: "bg-blue-50 border-blue-200",
    labelClr: "text-blue-700",
    desc: "Sets baseline ergonomic, size, aging and marking requirements for all protective clothing sold in the EU and UK. Every garment in a compliant programme must meet EN ISO 13688 before additional hazard-specific standards are applied.",
    applies: ["All workwear", "Prerequisite for EN ISO 11612, EN ISO 20471"],
  },
  {
    code: "EN ISO 11612",
    title: "Protection Against Heat & Flame",
    region: "EU / UK",
    hazard: "FR — Flame & heat",
    icon: "🔥",
    accent: "bg-red-50 border-red-200",
    labelClr: "text-red-700",
    desc: "Specifies test methods and performance requirements for garments protecting against convective heat, radiant heat, flame spread, and molten metal splash. Performance levels A1/A2 (flame), B (convective), C (radiant), D/E/F (metal splash) are certified independently.",
    applies: ["Oil & Gas", "Petrochemical", "Welding & Foundry", "Electrical (arc flash)"],
  },
  {
    code: "EN ISO 20471",
    title: "High-Visibility Warning Clothing",
    region: "EU / UK",
    hazard: "Hi-Vis — Road & site visibility",
    icon: "🔆",
    accent: "bg-yellow-50 border-yellow-200",
    labelClr: "text-yellow-700",
    desc: "Defines minimum areas of fluorescent background material and retroreflective tape to ensure visibility in daylight and in the dark. Class 1 (lowest) to Class 3 (highest). Class 3 mandatory for most roadside and rail environments.",
    applies: ["Road Construction", "Logistics", "Rail", "Airport Ground"],
  },
  {
    code: "EN 1149-3",
    title: "Electrostatic Properties",
    region: "EU / UK",
    hazard: "Anti-static (ATEX zones)",
    icon: "⚡",
    accent: "bg-sky-50 border-sky-200",
    labelClr: "text-sky-700",
    desc: "Measures charge decay in fabrics intended for use in explosive atmospheres. Anti-static finishing on canvas and ripstop measured after 50 wash cycles. Required for garments used in ATEX-classified zones.",
    applies: ["Oil & Gas", "Petrochemical", "Grain Handling", "Chemical Plants"],
  },
  {
    code: "EN 342",
    title: "Protection Against Cold",
    region: "EU / UK",
    hazard: "Cold — Below 0°C environments",
    icon: "❄️",
    accent: "bg-cyan-50 border-cyan-200",
    labelClr: "text-cyan-700",
    desc: "Covers insulation and wind resistance for garments protecting workers in cold environments. Thermal resistance (Rct) and breathability (Ret) values are test-certified. Applicable for cold-store logistics and outdoor work in northern markets.",
    applies: ["Cold Storage", "Outdoor Logistics", "Northern European Markets"],
  },
  {
    code: "EN 343",
    title: "Protection Against Rain",
    region: "EU / UK",
    hazard: "Rain & wind resistance",
    icon: "🌧️",
    accent: "bg-indigo-50 border-indigo-200",
    labelClr: "text-indigo-700",
    desc: "Covers penetration resistance and water vapour permeability of materials used in rain-protective workwear. Classes 1–3 for water penetration, breathability index 1–2. Used on rain jackets and waterproof outer shells.",
    applies: ["Outdoor Construction", "Agriculture", "Marine"],
  },
  {
    code: "NFPA 2112",
    title: "Flash Fire Protection",
    region: "USA / Canada",
    hazard: "FR — Flash fire (USA)",
    icon: "🇺🇸",
    accent: "bg-orange-50 border-orange-200",
    labelClr: "text-orange-700",
    desc: "NFPA 2112 governs FR garments for industrial workers exposed to flash fire in the USA. Requires minimum 40% body coverage, thermal protective performance (TPP) testing, and heat shrinkage resistance. Differs from EN ISO 11612 — both may be required for export to US buyers.",
    applies: ["Oil & Gas (USA)", "Petrochemical (USA)", "Utilities (USA)"],
  },
  {
    code: "NFPA 70E",
    title: "Arc Flash Electrical Safety",
    region: "USA",
    hazard: "Arc flash (electrical hazard)",
    icon: "⚡",
    accent: "bg-amber-50 border-amber-200",
    labelClr: "text-amber-700",
    desc: "Sets requirements for electrical safe work practices and defines arc flash PPE categories. Arc rating (cal/cm²) is the key metric — garments must meet or exceed the incident energy at the worker's position. Common in electrical utility, switchgear, and industrial electrical maintenance.",
    applies: ["Electrical Utilities (USA)", "Industrial Electrical Maintenance"],
  },
  {
    code: "ANSI/ISEA 107",
    title: "High-Visibility Apparel (USA)",
    region: "USA",
    hazard: "Hi-Vis — US road & site",
    icon: "🔆",
    accent: "bg-lime-50 border-lime-200",
    labelClr: "text-lime-700",
    desc: "US equivalent of EN ISO 20471. Class 1, 2, 3 for hi-vis garments; E class for lower-body hi-vis (trousers, gaiters). Required by MUTCD for all US roadside construction workers. Fluorescent lime-yellow or orange-red backgrounds only.",
    applies: ["Road Construction (USA)", "Logistics (USA)", "Railway (USA)"],
  },
  {
    code: "AS/NZS 4602.1",
    title: "High-Visibility Garments (AUS/NZ)",
    region: "Australia / New Zealand",
    hazard: "Hi-Vis — Australasian standard",
    icon: "🇦🇺",
    accent: "bg-teal-50 border-teal-200",
    labelClr: "text-teal-700",
    desc: "Australasian equivalent of EN ISO 20471 for day-only, day-night, and night-only use garments. Class D (day), N (night), D/N (combined). Fluorescent backgrounds must meet AS 1906.4. Used across construction, mining, and transport in Australia and New Zealand.",
    applies: ["Mining (AUS)", "Construction (AUS)", "Transport (AUS/NZ)"],
  },
];

const ACCESSORIES = [
  {
    name: "Hi-Vis Safety Vest",
    icon: "🦺",
    desc: "Mesh or solid fluorescent shell. Class 2 per EN ISO 20471 / ANSI/ISEA 107. Adjustable side closure. Used for site visitors and short-duration workers.",
    materials: "Fluorescent polyester mesh + retroreflective tape",
    colour: "bg-yellow-50 border-yellow-200",
    tag: "All sectors",
  },
  {
    name: "Work Apron",
    icon: "👨‍🍳",
    desc: "Canvas or poly-cotton apron with adjustable neck and waist ties. Used in food processing, automotive, and laboratory environments.",
    materials: "300–350 gsm canvas or poly-cotton",
    colour: "bg-stone-50 border-stone-200",
    tag: "Food / Automotive / Lab",
  },
  {
    name: "Bouffant & Mob Cap",
    icon: "🎩",
    desc: "Non-woven or cotton caps for food and pharmaceutical clean-room environments. Colour-coded per department hygiene protocol.",
    materials: "Non-woven PP or 100% cotton",
    colour: "bg-sky-50 border-sky-200",
    tag: "Food / Pharma / Hospital",
  },
  {
    name: "Neck Gaiter / Balaclava",
    icon: "🧣",
    desc: "FR cotton or polyester fleece for cold-weather site work. Worn under hard hats in mining and outdoor construction.",
    materials: "FR cotton or polyester fleece",
    colour: "bg-slate-50 border-slate-200",
    tag: "Mining / Cold weather",
  },
  {
    name: "Moisture-Wicking Base Layer",
    icon: "🧤",
    desc: "Polyester or FR-treated base layer for workers wearing heavy PPE. Reduces skin temperature under coveralls and FR outerwear.",
    materials: "100% polyester moisture-wicking or FR cotton",
    colour: "bg-blue-50 border-blue-200",
    tag: "FR / Oil & Gas / Mining",
  },
  {
    name: "Reflective Wrist Bands",
    icon: "💪",
    desc: "Add-on retroreflective bands at wrist or ankle. Supplement lower-class hi-vis garments for improved low-light visibility.",
    materials: "Silver retroreflective tape on elastic band",
    colour: "bg-gray-50 border-gray-200",
    tag: "Construction / Road",
  },
  {
    name: "ID Lanyard",
    icon: "🪪",
    desc: "Woven polyester lanyards with detachable clip or breakaway safety release. Branded with company name or logo on request.",
    materials: "Woven polyester, 15–20 mm width",
    colour: "bg-emerald-50 border-emerald-200",
    tag: "All sectors — fleet ID",
  },
  {
    name: "Fleece Liner Jacket",
    icon: "🧥",
    desc: "Zip-through polyester fleece mid-layer for workwear systems in cold climates. Designed to layer under hi-vis or FR outer shells.",
    materials: "Polyester anti-pill fleece, 240–300 gsm",
    colour: "bg-violet-50 border-violet-200",
    tag: "Cold storage / Outdoor",
  },
];

const SIZE_TABLE_MEN = [
  { size: "XS",  eu: "44",    chest: "86–90",   waist: "70–74",   hip: "90–94",   inseam: "78–80" },
  { size: "S",   eu: "46",    chest: "90–94",   waist: "74–78",   hip: "94–98",   inseam: "80–82" },
  { size: "M",   eu: "48",    chest: "94–98",   waist: "78–82",   hip: "98–102",  inseam: "82–84" },
  { size: "L",   eu: "50",    chest: "98–102",  waist: "82–86",   hip: "102–106", inseam: "82–84" },
  { size: "XL",  eu: "52",    chest: "102–107", waist: "86–92",   hip: "106–111", inseam: "82–84" },
  { size: "2XL", eu: "54",    chest: "107–112", waist: "92–98",   hip: "111–116", inseam: "82–84" },
  { size: "3XL", eu: "56",    chest: "112–117", waist: "98–104",  hip: "116–121", inseam: "82–84" },
  { size: "4XL", eu: "58",    chest: "117–122", waist: "104–110", hip: "121–126", inseam: "82–84" },
  { size: "5XL", eu: "60",    chest: "122–127", waist: "110–116", hip: "126–131", inseam: "82–84" },
];

const SIZE_TABLE_WOMEN = [
  { size: "XS/6",      eu: "34",    bust: "80–84",   waist: "62–66",  hip: "86–90",   inseam: "76–78" },
  { size: "S/8",       eu: "36",    bust: "84–88",   waist: "66–70",  hip: "90–94",   inseam: "76–78" },
  { size: "M/10",      eu: "38",    bust: "88–92",   waist: "70–74",  hip: "94–98",   inseam: "78–80" },
  { size: "L/12",      eu: "40",    bust: "92–97",   waist: "74–80",  hip: "98–103",  inseam: "78–80" },
  { size: "XL/14",     eu: "42",    bust: "97–102",  waist: "80–86",  hip: "103–108", inseam: "78–80" },
  { size: "2XL/16",    eu: "44",    bust: "102–107", waist: "86–92",  hip: "108–113", inseam: "78–80" },
  { size: "3XL/18–20", eu: "46–48", bust: "107–117", waist: "92–104", hip: "113–123", inseam: "78–80" },
];

/* ─── Bento data ─── */
const BENTO_ROWS = [
  /* Row 0: 2-col equal — Articles + Compliance (new) */
  [
    {
      id: "articles",
      icon: "👕",
      label: "Garment Types",
      title: "15 Garment Types Across 5 Workwear Categories",
      body: "Shirts, coveralls, boiler suits, hi-vis jackets, FR trousers, bib-and-brace overalls, rain jackets and more — full programme catalogue for any sector.",
      accent: "bg-indigo-50 border-indigo-200",
      labelClr: "text-indigo-700",
      col: "md:col-span-3",
    },
    {
      id: "compliance",
      icon: "📋",
      label: "Safety Standards",
      title: "10 International Standards — EN ISO, NFPA, ANSI, AS/NZS",
      body: "EN ISO 13688, EN ISO 11612, EN ISO 20471, EN 1149-3, NFPA 2112, NFPA 70E, ANSI/ISEA 107, AS/NZS 4602.1 and more. Region-specific compliance matched to your destination.",
      accent: "bg-emerald-50 border-emerald-200",
      labelClr: "text-emerald-700",
      col: "md:col-span-3",
    },
  ],
  /* Row 1: 2-col equal */
  [
    {
      id: "constructions",
      icon: "🦺",
      label: "Fabric Construction",
      title: "Six Engineered Builds — Chosen for the Hazard, Not the Budget",
      body: "Canvas, ripstop, FR cotton, hi-vis polyester, twill, and workwear denim. Each construction addresses a specific risk environment. Matching the fabric to the hazard is the first compliance decision.",
      accent: "bg-amber-50 border-amber-200",
      labelClr: "text-amber-700",
      col: "md:col-span-3",
    },
    {
      id: "fits",
      icon: "📐",
      label: "Fit Profiles",
      title: "Three Cuts — Regular, Safety-Loose, and Corporate Slim",
      body: "Safety workwear has a mandatory loose cut for PPE layering. Corporate service uniforms use a slim, tailored silhouette. Fleet programmes default to Regular for cross-workforce sizing.",
      accent: "bg-teal-50 border-teal-200",
      labelClr: "text-teal-700",
      col: "md:col-span-3",
    },
  ],
  /* Row 2: 4-col equal */
  [
    {
      id: "gsm",
      icon: "⚖️",
      label: "GSM Tiers",
      title: "240–400+ gsm",
      body: "Light-duty service wear through industrial-grade 400 gsm constructions for arc flash and heavy trades.",
      accent: "bg-sky-50 border-sky-200",
      labelClr: "text-sky-700",
      col: "md:col-span-3",
    },
    {
      id: "sectors",
      icon: "🏗️",
      label: "Industry Sectors",
      title: "10 Sectors Served",
      body: "Construction · Oil & Gas · Mining · Logistics · Healthcare · Food Processing · Manufacturing · Electrical · Security · Agriculture",
      accent: "bg-rose-50 border-rose-200",
      labelClr: "text-rose-700",
      col: "md:col-span-3",
    },
    {
      id: "decoration",
      icon: "🪡",
      label: "Branding & Decoration",
      title: "Fleet Branding Across All Garment Types",
      body: "Embroidery, reflective tape (sewn), woven badge, and large-format back print. Individual employee personalisation available.",
      accent: "bg-violet-50 border-violet-200",
      labelClr: "text-violet-700",
      col: "md:col-span-3",
    },
    {
      id: "certifications",
      icon: "🏆",
      label: "Certifications",
      title: "10+ Factory Certifications",
      body: "ISO 9001, BSCI, WRAP, SA8000, Sedex and more — across 50+ vetted factories in our sourcing network.",
      accent: "bg-emerald-50 border-emerald-200",
      labelClr: "text-emerald-700",
      col: "md:col-span-3",
    },
  ],
  /* Row 3: 5 cells (2+2+1) */
  [
    {
      id: "colours",
      icon: "🎨",
      label: "Colour Programme",
      title: "Hi-Vis + Standard Palette",
      body: "Safety orange, fluorescent yellow, lime green for hi-vis garments. Navy, black, charcoal, khaki and custom Pantone for standard programmes.",
      accent: "bg-stone-50 border-stone-200",
      labelClr: "text-stone-700",
      col: "md:col-span-2",
    },
    {
      id: "oem",
      icon: "⚙️",
      label: "OEM Programme",
      title: "From Tech Pack to Fleet Delivery",
      body: "Technical pack review, certified factory matching, FR compliance testing, size allocation planning, and repeat-order infrastructure for annual fleet programmes.",
      accent: "bg-orange-50 border-orange-200",
      labelClr: "text-orange-700",
      col: "md:col-span-2",
    },
    {
      id: "sustainability",
      icon: "🌱",
      label: "Sustainability",
      title: "BCI · GRS · OEKO-TEX · SA8000 · Bluesign",
      body: "Recycled polyester ripstop, BCI cotton, and Bluesign-certified process chemistry available for buyers with Scope 3 requirements.",
      accent: "bg-cyan-50 border-cyan-200",
      labelClr: "text-cyan-700",
      col: "md:col-span-1",
    },
  ],
  /* Row 4: 3-col (2+1) */
  [
    {
      id: "export",
      icon: "🚢",
      label: "Export & Logistics",
      title: "FOB Karachi, CIF or CFR — with Full Compliance Documentation",
      body: "Commercial invoice, packing list, certificate of origin, test reports and AQL inspection results travel with every workwear shipment. Buyers receive a complete compliance file.",
      accent: "bg-lime-50 border-lime-200",
      labelClr: "text-lime-700",
      col: "md:col-span-2",
    },
    {
      id: "process",
      icon: "📋",
      label: "Sourcing Process",
      title: "6 Defined Steps — From Enquiry to Port",
      body: "Requirement analysis → factory selection → sampling → production → inspection → shipment. Clear milestones at each stage with your dedicated account contact.",
      accent: "bg-fuchsia-50 border-fuchsia-200",
      labelClr: "text-fuchsia-700",
      col: "md:col-span-1",
    },
  ],
  /* Row 5: 2-col equal — Sizing + Accessories (new) */
  [
    {
      id: "sizing",
      icon: "📏",
      label: "Size Tables",
      title: "Men’s XS–5XL · Women’s XS/6–3XL/20 — All in cm",
      body: "Complete measurement charts for chest, waist, hip and inseam in centimetres. EU, UK and US size equivalents provided. Custom size allocation for fleet programmes on request.",
      accent: "bg-violet-50 border-violet-200",
      labelClr: "text-violet-700",
      col: "md:col-span-3",
    },
    {
      id: "accessories",
      icon: "🎒",
      label: "Workwear Accessories",
      title: "8 Textile Accessories — Vests, Aprons, Base Layers, Lanyards",
      body: "Hi-vis vests, work aprons, bouffant caps, neck gaiters, base layers, reflective wristbands, ID lanyards, and fleece liners sourced through the same certified factory network.",
      accent: "bg-rose-50 border-rose-200",
      labelClr: "text-rose-700",
      col: "md:col-span-3",
    },
  ],
];

/* ─── animation presets ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function WorkwearContent() {
  const [activeConst, setActiveConst] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div id="ww-top" className="overflow-x-clip">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden" aria-label="Workwear Apparel hero">
        <Image
          src="/images/hero/hero-apparel.webp"
          alt="Pakistan workwear apparel manufacturer — OEM safety workwear, FR clothing and hi-vis uniforms for industrial sectors in the USA, UK, Australia and Middle East"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="absolute top-6 left-0 right-0 px-6 md:px-12"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/apparel/" className="hover:text-white transition-colors">Apparel</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-white/90">Workwear Apparel</li>
          </ol>
        </nav>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Workwear Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Workwear
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              MZ Global Trading sources custom workwear from Pakistan&apos;s certified factories. Canvas, ripstop, FR cotton and hi-vis constructions. ISO 9001, BSCI, Sedex, SA8000. Fleet programmes for construction, oil &amp; gas, mining, logistics and healthcare.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base"
              >
                Request a Quote
                <span aria-hidden="true">&#8594;</span>
              </Link>
              <button
                onClick={() => scrollToId("ww-bento")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Specifications
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ANCHOR ═══ */}
      <section className="bg-navy-900 py-10" aria-label="Key supply chain statistics">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            {[
              { value: "50+", label: "Vetted Factories" },
              { value: "35+", label: "Export Markets" },
              { value: "10+", label: "Certifications" },
              { value: "10", label: "Industry Sectors" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="text-3xl md:text-4xl font-bold text-gold">{s.value}</p>
                <p className="mt-1 text-sm text-white/60">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BENTO INTRO ═══ */}
      <section id="ww-bento" className="py-20 bg-white" aria-label="Workwear specifications overview">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Full Programme Specification</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects of Our Workwear Programme</h2>
          </motion.div>

          {/* Row 0 — Articles + Compliance */}
          <div className="grid grid-cols-6 gap-4 mb-4">
            {BENTO_ROWS[0].map((cell, i) => (
              <motion.div
                key={cell.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${cell.col} col-span-6 rounded-2xl border p-6 flex flex-col justify-between ${cell.accent}`}
              >
                <div>
                  <span className="text-3xl mb-3 block" aria-hidden="true">{cell.icon}</span>
                  <p className={`text-xs font-semibold tracking-[0.18em] uppercase mb-2 ${cell.labelClr}`}>{cell.label}</p>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{cell.title}</h3>
                  <p className="text-sm text-gray-600">{cell.body}</p>
                </div>
                <ExploreBtn sectionId={`ww-${cell.id}`} label={`Explore ${cell.label}`} />
              </motion.div>
            ))}
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-6 gap-4 mb-4">
            {BENTO_ROWS[1].map((cell, i) => (
              <motion.div
                key={cell.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${cell.col} col-span-6 rounded-2xl border p-6 flex flex-col justify-between ${cell.accent}`}
              >
                <div>
                  <span className="text-3xl mb-3 block" aria-hidden="true">{cell.icon}</span>
                  <p className={`text-xs font-semibold tracking-[0.18em] uppercase mb-2 ${cell.labelClr}`}>{cell.label}</p>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{cell.title}</h3>
                  <p className="text-sm text-gray-600">{cell.body}</p>
                </div>
                <ExploreBtn sectionId={`ww-${cell.id}`} label={`Explore ${cell.label}`} />
              </motion.div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-6 gap-4 mb-4">
            {BENTO_ROWS[2].map((cell, i) => (
              <motion.div
                key={cell.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${cell.col} col-span-6 rounded-2xl border p-6 flex flex-col justify-between ${cell.accent}`}
              >
                <div>
                  <span className="text-3xl mb-3 block" aria-hidden="true">{cell.icon}</span>
                  <p className={`text-xs font-semibold tracking-[0.18em] uppercase mb-2 ${cell.labelClr}`}>{cell.label}</p>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{cell.title}</h3>
                  <p className="text-sm text-gray-600">{cell.body}</p>
                </div>
                <ExploreBtn sectionId={`ww-${cell.id}`} label={`Explore ${cell.label}`} />
              </motion.div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            {BENTO_ROWS[3].map((cell, i) => (
              <motion.div
                key={cell.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`col-span-5 ${cell.col === "md:col-span-1" ? "md:col-span-1" : "md:col-span-2"} rounded-2xl border p-6 flex flex-col justify-between ${cell.accent}`}
              >
                <div>
                  <span className="text-3xl mb-3 block" aria-hidden="true">{cell.icon}</span>
                  <p className={`text-xs font-semibold tracking-[0.18em] uppercase mb-2 ${cell.labelClr}`}>{cell.label}</p>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{cell.title}</h3>
                  <p className="text-sm text-gray-600">{cell.body}</p>
                </div>
                <ExploreBtn sectionId={`ww-${cell.id}`} label={`Explore ${cell.label}`} />
              </motion.div>
            ))}
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {BENTO_ROWS[4].map((cell, i) => (
              <motion.div
                key={cell.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`col-span-3 ${cell.col === "md:col-span-1" ? "md:col-span-1" : "md:col-span-2"} rounded-2xl border p-6 flex flex-col justify-between ${cell.accent}`}
              >
                <div>
                  <span className="text-3xl mb-3 block" aria-hidden="true">{cell.icon}</span>
                  <p className={`text-xs font-semibold tracking-[0.18em] uppercase mb-2 ${cell.labelClr}`}>{cell.label}</p>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{cell.title}</h3>
                  <p className="text-sm text-gray-600">{cell.body}</p>
                </div>
                <ExploreBtn sectionId={`ww-${cell.id}`} label={`Explore ${cell.label}`} />
              </motion.div>
            ))}
          </div>

          {/* Row 5 — Sizing + Accessories */}
          <div className="grid grid-cols-6 gap-4 mb-4">
            {BENTO_ROWS[5].map((cell, i) => (
              <motion.div
                key={cell.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${cell.col} col-span-6 rounded-2xl border p-6 flex flex-col justify-between ${cell.accent}`}
              >
                <div>
                  <span className="text-3xl mb-3 block" aria-hidden="true">{cell.icon}</span>
                  <p className={`text-xs font-semibold tracking-[0.18em] uppercase mb-2 ${cell.labelClr}`}>{cell.label}</p>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{cell.title}</h3>
                  <p className="text-sm text-gray-600">{cell.body}</p>
                </div>
                <ExploreBtn sectionId={`ww-${cell.id}`} label={`Explore ${cell.label}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESOURCES SECTION ═══ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100" aria-label="Guides and resources">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/guides/" className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <span className="text-2xl mb-3" aria-hidden="true">📚</span>
              <h3 className="text-sm font-bold text-navy-900 mb-1">Knowledge Hub</h3>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">Workwear standards, fabric guides, and compliance references for procurement teams.</p>
              <span className="mt-4 text-xs font-semibold text-gold">Browse Knowledge Hub →</span>
            </Link>
            <Link href="/guides/" className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <span className="text-2xl mb-3" aria-hidden="true">📋</span>
              <h3 className="text-sm font-bold text-navy-900 mb-1">Workwear Sourcing Guide</h3>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">Step-by-step guide for specifying and procuring workwear for industrial fleet programmes.</p>
              <span className="mt-4 text-xs font-semibold text-gold">Read the Guide →</span>
            </Link>
            <Link href="/downloads/" className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <span className="text-2xl mb-3" aria-hidden="true">⬇️</span>
              <h3 className="text-sm font-bold text-navy-900 mb-1">Downloads</h3>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">Certification documents, compliance spec sheets, and product data sheets available for download.</p>
              <span className="mt-4 text-xs font-semibold text-gold">Go to Downloads →</span>
            </Link>
            <Link href="/rfq/" className="rounded-2xl bg-navy-900 border border-navy-900 p-6 flex flex-col hover:bg-navy-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <span className="text-2xl mb-3" aria-hidden="true">✉️</span>
              <h3 className="text-sm font-bold text-white mb-1">Quick Start — Request a Quote</h3>
              <p className="text-xs text-white/60 leading-relaxed flex-1">Tell us your sector, safety standard required, and fleet size. We confirm factory match within 48 hours.</p>
              <span className="mt-4 text-xs font-semibold text-gold">Submit RFQ →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION A — WORKWEAR ARTICLES (Catalogue UI) ═══ */}
      <section id="ww-articles" className="py-20 bg-white" aria-labelledby="ww-articles-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Garment Catalogue</p>
            <h2 id="ww-articles-h2" className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              15 Workwear Garments — Upper Body, Lower Body, Full-Body, Outerwear
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Our sourcing network covers the full range of industrial and corporate workwear garments. From FR coveralls to hi-vis blouson jackets to corporate polo shirts — each garment category includes standard, FR, anti-static, and hi-vis variants where applicable. Garment-specific tech packs available on request.
            </p>
          </motion.div>

          <div className="space-y-5">
            {WORKWEAR_ARTICLES.map((cat, ci) => (
              <motion.div
                key={cat.category}
                custom={ci}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`rounded-2xl border p-6 ${cat.accent}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                  <h3 className={`text-sm font-bold uppercase tracking-[0.18em] ${cat.labelClr}`}>{cat.category}</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {cat.garments.map((g) => (
                    <div key={g.name} className="rounded-xl bg-white border border-white/60 p-4 flex flex-col shadow-sm">
                      <h4 className="text-sm font-bold text-navy-900 mb-1.5">{g.name}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed flex-1 mb-3">{g.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {g.tags.map((tag) => (
                          <span key={tag} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cat.labelClr} bg-white border border-current/20`}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 rounded-xl bg-navy-900 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <p className="text-gold font-bold text-sm uppercase tracking-wider mb-1">Bespoke Garment Development</p>
              <p className="text-white/70 text-sm">Garment type not listed? Submit your specification and we source from our 50+ vetted factory network.</p>
            </div>
            <Link
              href="/rfq/"
              className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-bold px-6 py-3 rounded-lg text-sm hover:bg-yellow-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Submit Garment RFQ
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
        <BackToTop />
      </section>

      {/* ═══ SECTION 1 — CONSTRUCTIONS (Industrial UI + Comparison Table) ═══ */}
      <section id="ww-constructions" className="py-20 bg-white" aria-labelledby="ww-constructions-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Fabric Construction</p>
            <h2 id="ww-constructions-h2" className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Six Engineered Builds for Six Risk Environments
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Each construction in our workwear programme is selected for a specific hazard profile — not interchangeable. FR cotton is mandatory in petrochemical environments; hi-vis polyester satisfies visibility standards; canvas handles abrasion. Matching fabric to hazard is the first compliance decision in any workwear programme.
            </p>
          </motion.div>

          {/* Tab nav */}
          <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Fabric constructions">
            {CONSTRUCTIONS.map((c, i) => (
              <button
                key={c.name}
                role="tab"
                aria-selected={activeConst === i}
                aria-controls={`ww-const-panel-${i}`}
                onClick={() => setActiveConst(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  activeConst === i
                    ? "bg-navy-900 text-white border-navy-900"
                    : "bg-white text-navy-900 border-gray-200 hover:border-gold"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeConst}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              id={`ww-const-panel-${activeConst}`}
              role="tabpanel"
            >
              {(() => {
                const c = CONSTRUCTIONS[activeConst];
                return (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-bold text-navy-900">{c.name}</h3>
                        <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${c.tagColor}`}>{c.tag}</span>
                      </div>
                      <p className="text-gray-600 mb-6">{c.desc}</p>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                          <span className="font-semibold text-navy-900 w-32 shrink-0">GSM Range:</span>
                          <span className="text-gray-700">{c.gsm}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-semibold text-navy-900 w-32 shrink-0">Composition:</span>
                          <span className="text-gray-700">{c.composition}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-semibold text-navy-900 w-32 shrink-0">Strength:</span>
                          <span className="text-gray-700">{c.strength}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-semibold text-navy-900 w-32 shrink-0">Best For:</span>
                          <span className="text-gray-700">{c.suitable}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-semibold text-navy-900 w-32 shrink-0">Certifications:</span>
                          <span className="text-gray-700">{c.certNotes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Comparison mini-table */}
                    <div>
                      <h4 className="text-sm font-semibold text-navy-900 mb-4 uppercase tracking-wider">All Builds at a Glance</h4>
                      <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                              <th className="text-left px-4 py-3 font-semibold text-navy-900">Construction</th>
                              <th className="text-left px-4 py-3 font-semibold text-navy-900">GSM</th>
                              <th className="text-left px-4 py-3 font-semibold text-navy-900 hidden sm:table-cell">Strength</th>
                            </tr>
                          </thead>
                          <tbody>
                            {CONSTRUCTIONS.map((row, idx) => (
                              <tr
                                key={row.name}
                                className={`border-b border-gray-50 cursor-pointer transition-colors ${idx === activeConst ? "bg-amber-50" : "hover:bg-gray-50"}`}
                                onClick={() => setActiveConst(idx)}
                              >
                                <td className="px-4 py-3 font-medium text-navy-900">{row.name}</td>
                                <td className="px-4 py-3 text-gray-600">{row.gsm}</td>
                                <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{row.strength}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
        <BackToTop />
      </section>

      {/* ═══ SECTION 2 — FIT PROFILES (Brutalist UI + Scorecard) ═══ */}
      <section id="ww-fits" className="py-20 bg-navy-900" aria-labelledby="ww-fits-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Fit Profiles</p>
            <h2 id="ww-fits-h2" className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Cut is a Safety Decision, Not Just a Style Choice
            </h2>
            <p className="text-white/70 max-w-3xl">
              In safety workwear, garment cut has compliance implications. A loose cut is mandatory when PPE is worn underneath — tight garments impair evacuation movement. Corporate service environments use a slim silhouette where presentation matters. Matching cut to end-use environment is part of your specification.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {FIT_PROFILES.map((f, i) => (
              <motion.div
                key={f.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border-2 border-white/10 bg-white/5 p-8 flex flex-col"
              >
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-4">{f.label}</span>
                <h3 className="text-xl font-bold text-white mb-4">{f.name}</h3>

                {/* Score bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/60">{f.scoreLabel}</span>
                    <span className="text-xs font-bold text-gold">{f.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${f.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                      className="h-full bg-gold rounded-full"
                    />
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-4 flex-1">{f.detail}</p>
                <p className="text-gold text-xs font-semibold border-t border-white/10 pt-4">{f.highlight}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <BackToTop dark />
      </section>

      {/* ═══ SECTION — SIZING TABLES ═══ */}
      <section id="ww-sizing" className="py-20 bg-white" aria-labelledby="ww-sizing-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Sizing Guide</p>
            <h2 id="ww-sizing-h2" className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Men&apos;s XS–5XL · Women&apos;s XS/6–3XL/20 — All Measurements in Centimetres
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Workwear fleet programmes require precise size allocation. The tables below provide body measurements (not finished garment measurements) in centimetres with EU size equivalents. For fleet orders, buyers supply a size ratio and we produce accordingly. Custom grading and non-standard size ranges are available on request.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span aria-hidden="true">👨</span> Men&apos;s Sizing — Body Measurements (cm)
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy-900">
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider">Size</th>
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider">EU</th>
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider">Chest</th>
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider">Waist</th>
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider">Hip</th>
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">Inseam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_TABLE_MEN.map((row, i) => (
                      <motion.tr
                        key={row.size}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className={`border-b border-gray-50 hover:bg-amber-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                      >
                        <td className="px-4 py-3 font-bold text-navy-900">{row.size}</td>
                        <td className="px-4 py-3 text-gray-500 font-mono text-xs">{row.eu}</td>
                        <td className="px-4 py-3 text-gray-700 font-mono text-xs">{row.chest}</td>
                        <td className="px-4 py-3 text-gray-700 font-mono text-xs">{row.waist}</td>
                        <td className="px-4 py-3 text-gray-700 font-mono text-xs">{row.hip}</td>
                        <td className="px-4 py-3 text-gray-700 font-mono text-xs hidden sm:table-cell">{row.inseam}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span aria-hidden="true">👩</span> Women&apos;s Sizing — Body Measurements (cm)
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy-900">
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider">Size / UK</th>
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider">EU</th>
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider">Bust</th>
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider">Waist</th>
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider">Hip</th>
                      <th className="text-left px-4 py-3 text-white text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">Inseam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_TABLE_WOMEN.map((row, i) => (
                      <motion.tr
                        key={row.size}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className={`border-b border-gray-50 hover:bg-amber-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                      >
                        <td className="px-4 py-3 font-bold text-navy-900">{row.size}</td>
                        <td className="px-4 py-3 text-gray-500 font-mono text-xs">{row.eu}</td>
                        <td className="px-4 py-3 text-gray-700 font-mono text-xs">{row.bust}</td>
                        <td className="px-4 py-3 text-gray-700 font-mono text-xs">{row.waist}</td>
                        <td className="px-4 py-3 text-gray-700 font-mono text-xs">{row.hip}</td>
                        <td className="px-4 py-3 text-gray-700 font-mono text-xs hidden sm:table-cell">{row.inseam}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-amber-700 text-sm"><strong>Tolerances:</strong> All figures are body measurements in centimetres with ±1 cm tolerance. Finished garment measurements include ease allowance per garment type. Custom grading for non-standard size ranges is available — state requirements in your RFQ.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 rounded-2xl bg-navy-900 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <p className="font-bold text-white mb-1">Non-standard sizes, plus-size fleet, or custom grading spec?</p>
              <p className="text-white/60 text-sm">Attach your measurement sheet or grading file to the RFQ — we confirm factory grading capability and sample lead time within 48 hours.</p>
            </div>
            <Link
              href="/rfq/"
              className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-bold px-6 py-3 rounded-lg text-sm hover:bg-yellow-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Submit Sizing Spec
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
        <BackToTop />
      </section>

      {/* ═══ SECTION 3 — GSM TIERS (Material Design + Table with bars) ═══ */}
      <section id="ww-gsm" className="py-20 bg-white" aria-labelledby="ww-gsm-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Weight & Durability</p>
            <h2 id="ww-gsm-h2" className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              240–400+ gsm — Four Durability Tiers for Four Risk Levels
            </h2>
            <p className="text-gray-600 max-w-3xl">
              GSM in workwear directly correlates with durability against abrasion, puncture and mechanical stress. Light-duty food processing environments require 240–280 gsm breathable constructions; heavy industry and arc flash environments mandate 360–400 gsm industrial-grade fabric. Buyers receive GSM testing certification on bulk.
            </p>
          </motion.div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-semibold text-navy-900">Tier</th>
                  <th className="text-left px-6 py-4 font-semibold text-navy-900">GSM Range</th>
                  <th className="text-left px-6 py-4 font-semibold text-navy-900 hidden md:table-cell">Typical Uses</th>
                  <th className="text-left px-6 py-4 font-semibold text-navy-900 hidden lg:table-cell">Key Properties</th>
                  <th className="text-left px-6 py-4 font-semibold text-navy-900">Weight Index</th>
                </tr>
              </thead>
              <tbody>
                {GSM_TIERS.map((t, i) => (
                  <motion.tr
                    key={t.label}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-5 font-semibold text-navy-900">{t.label}</td>
                    <td className="px-6 py-5 text-gray-700 font-mono">{t.range}</td>
                    <td className="px-6 py-5 text-gray-600 hidden md:table-cell">{t.uses}</td>
                    <td className="px-6 py-5 text-gray-600 hidden lg:table-cell">{t.properties}</td>
                    <td className="px-6 py-5">
                      <div className="h-2.5 w-full max-w-[160px] bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: t.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }}
                          className={`h-full ${t.colour} rounded-full`}
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-gray-400 italic">GSM values are indicative for standard production. FR and hi-vis shell constructions may vary by product standard requirement.</p>
        </div>
        <BackToTop />
      </section>

      {/* ═══ SECTION 4 — DECORATION (Retail UI + Card Layout) ═══ */}
      <section id="ww-decoration" className="py-20 bg-gray-50" aria-labelledby="ww-deco-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Fleet Branding</p>
            <h2 id="ww-deco-h2" className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Corporate Fleet Identity — Every Garment, Every Worker
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Workwear branding is not decoration — it is fleet identity, safety compliance, and corporate visibility. Reflective tape sewn in compliance positions satisfies EN ISO 20471. Company name embroidery on every garment supports site identification. We handle all decoration in-house at the production facility.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DECO_METHODS.map((d, i) => (
              <motion.div
                key={d.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col"
              >
                <div className="text-3xl mb-4" aria-hidden="true">{d.icon}</div>
                <h3 className="text-base font-bold text-navy-900 mb-2">{d.name}</h3>
                <div className="space-y-2 flex-1 text-sm">
                  <div>
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider">Best For</span>
                    <p className="text-gray-600 mt-0.5">{d.ideal}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider">Durability</span>
                    <p className="text-gray-600 mt-0.5">{d.durability}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider">Placement</span>
                    <p className="text-gray-600 mt-0.5">{d.placements}</p>
                  </div>
                </div>
                <p className="mt-4 pt-4 border-t border-gray-100 text-xs text-navy-900/70 italic">{d.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <BackToTop />
      </section>

      {/* ═══ SECTION 5 — COLOURS (Monochrome UI + Tile Layout) ═══ */}
      <section id="ww-colours" className="py-20 bg-navy-900" aria-labelledby="ww-colours-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Colour Options</p>
            <h2 id="ww-colours-h2" className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Hi-Vis Safety Palette + Full Standard Colour Range
            </h2>
            <p className="text-white/70 max-w-3xl">
              Hi-vis workwear uses fluorescent yellow, safety orange, and lime green backgrounds — colours regulated by EN ISO 20471. Standard workwear fleet programmes use navy, black, charcoal, khaki, or custom corporate Pantone. Colour matching is confirmed by lab dip approval before bulk dyeing.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {COLOURS.map((col, i) => (
              <motion.div
                key={col.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-xl overflow-hidden border border-white/10"
              >
                {col.type === "custom" ? (
                  <div className="h-20 bg-gradient-to-br from-gray-700 via-gray-500 to-gray-400 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold tracking-wider">PANTONE</span>
                  </div>
                ) : (
                  <div className="h-20" style={{ backgroundColor: col.hex }} />
                )}
                <div className="bg-white/5 px-3 py-2">
                  <p className="text-white text-xs font-semibold">{col.name}</p>
                  <p className={`text-xs mt-0.5 ${col.type === "hi-vis" ? "text-yellow-400" : col.type === "custom" ? "text-gold" : "text-white/50"}`}>
                    {col.type === "hi-vis" ? "Hi-Vis Regulated" : col.type === "custom" ? "By Request" : "Standard Fleet"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-white/40 text-xs">Lab dip approval on all bulk colour orders. Pantone / RAL target matching within ΔE 1.0 tolerance.</p>
        </div>
        <BackToTop dark />
      </section>

      {/* ═══ SECTION — ACCESSORIES ═══ */}
      <section id="ww-accessories" className="py-20 bg-white" aria-labelledby="ww-accessories-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Workwear Accessories</p>
            <h2 id="ww-accessories-h2" className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              8 Textile Accessories — Sourced Through the Same Certified Factory Network
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Fleet programmes typically require more than garments alone. Hi-vis vests, aprons, base layers, headwear, lanyards and fleece liners complete the workwear programme. All accessories sourced from the same vetted factories — consolidated into a single shipment with your garment order.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ACCESSORIES.map((acc, i) => (
              <motion.div
                key={acc.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`rounded-2xl border p-5 flex flex-col ${acc.colour}`}
              >
                <span className="text-3xl mb-3 block" aria-hidden="true">{acc.icon}</span>
                <h3 className="text-sm font-bold text-navy-900 mb-2">{acc.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed flex-1 mb-3">{acc.desc}</p>
                <div className="border-t border-white/60 pt-3 space-y-1">
                  <p className="text-[10px] font-semibold text-gold uppercase tracking-wider">Materials</p>
                  <p className="text-xs text-gray-500">{acc.materials}</p>
                  <span className="inline-block mt-1 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-navy-900/70">{acc.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <p className="text-gray-600 text-sm max-w-xl">All accessories can be included in a single RFQ with your garment order. We coordinate production and consolidate into one shipment to your port.</p>
            <Link
              href="/rfq/"
              className="shrink-0 inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3 rounded-lg text-sm hover:bg-navy-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Include Accessories in RFQ
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
        <BackToTop />
      </section>

      {/* ═══ SECTION 6 — OEM CAPABILITIES (Isometric UI + Workflow Diagram) ═══ */}
      <section id="ww-oem" className="py-20 bg-slate-900" aria-labelledby="ww-oem-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM Programme</p>
            <h2 id="ww-oem-h2" className="text-3xl sm:text-4xl font-bold text-white mb-4">
              From Tech Pack to Fleet Delivery — Six Managed Steps
            </h2>
            <p className="text-white/60 max-w-3xl">
              Workwear procurement for industrial fleets involves compliance requirements that consumer garment sourcing does not. FR testing, reflective tape compliance, anti-static certification — all handled before bulk production, not after.
            </p>
          </motion.div>

          {/* Workflow Diagram — horizontal on lg, vertical on mobile */}
          <div className="hidden lg:flex items-start gap-0">
            {OEM_FEATURES.map((f, i) => (
              <div key={f.step} className="flex items-start flex-1 min-w-0">
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex-1 min-w-0 rounded-xl border border-gold/20 bg-white/5 p-5 hover:bg-white/10 hover:border-gold/50 transition-all"
                  style={{ transform: "perspective(600px) rotateX(4deg)", transformOrigin: "top" }}
                >
                  <span className="block text-2xl font-black text-gold mb-3 leading-none">{f.step}</span>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
                {i < OEM_FEATURES.length - 1 && (
                  <div className="shrink-0 flex items-center px-1 pt-8" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gold/50">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Vertical workflow — mobile only */}
          <div className="lg:hidden relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gold/20" aria-hidden="true" />
            <div className="space-y-4">
              {OEM_FEATURES.map((f, i) => (
                <motion.div
                  key={f.step}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative flex items-start gap-4"
                >
                  <div className="relative z-10 w-10 h-10 rounded-full bg-slate-800 border border-gold/40 flex items-center justify-center shrink-0">
                    <span className="text-gold text-xs font-black">{f.step}</span>
                  </div>
                  <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4">
                    <h3 className="font-bold text-white text-sm mb-1">{f.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <BackToTop dark />
      </section>

      {/* ═══ SECTION 7 — SECTORS (Industrial Infographic on slate-900) ═══ */}
      <section id="ww-sectors" className="py-20" style={{ background: "#0f172a" }} aria-labelledby="ww-sectors-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Industry Sectors</p>
            <h2 id="ww-sectors-h2" className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ten Industries · Distinct Requirements · One Sourcing Partner
            </h2>
            <p className="text-white/60 max-w-3xl">
              Each sector demands a specific combination of fabric, safety rating, and certification. Our programme experience spans construction, oil and gas, mining, logistics, healthcare, food processing, manufacturing, electrical, security, and agriculture — matching the right factory, fabric, and compliance pathway to your procurement brief.
            </p>
          </motion.div>

          {/* Horizontal sector bars */}
          <div className="space-y-3 mb-6">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group flex items-center gap-5 rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/8 hover:border-white/20 transition-all"
              >
                <span className="text-4xl shrink-0" aria-hidden="true">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-base font-bold text-white">{s.name}</h3>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-gold/20 text-gold px-2 py-0.5 rounded-full">ACTIVE SOURCING</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-x-8 gap-y-1 text-sm">
                    <div>
                      <span className="text-xs font-semibold text-gold uppercase tracking-wider">Requirements: </span>
                      <span className="text-white/70">{s.requirements}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gold uppercase tracking-wider">Key Markets: </span>
                      <span className="text-white/70">{s.markets}</span>
                    </div>
                  </div>
                </div>
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity shrink-0" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.44 8.75H2.75a.75.75 0 010-1.5h8.69L8.22 4.03a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl border border-gold/30 bg-gold/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <p className="text-gold font-bold text-sm uppercase tracking-wider mb-1">Your Sector Not Listed?</p>
              <p className="text-white/70 text-sm">Our 50+ factory network covers most industrial workwear categories. Submit an RFQ with your programme requirements.</p>
            </div>
            <Link
              href="/rfq/"
              className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-bold px-6 py-3 rounded-lg text-sm hover:bg-yellow-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Submit Programme RFQ
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
        <BackToTop dark />
      </section>

      {/* ═══ SECTION 8 — CERTIFICATIONS (Technical Registry on #f0f4f8) ═══ */}
      <section id="ww-certifications" className="py-20" style={{ background: "#f0f4f8" }} aria-labelledby="ww-certs-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Compliance Registry</p>
              <h2 id="ww-certs-h2" className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
                10+ Certifications Across 50+ Vetted Factories
              </h2>
              <p className="text-gray-600">
                Across our sourcing network, factories hold a combination of quality, social compliance, and product safety certifications. For programmes with specific requirements — EN ISO 13688, NFPA, SA8000 — we match buyers to factories holding those exact credentials.
              </p>
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "10+", label: "Certifications", sub: "Quality, social, safety" },
                { value: "50+", label: "Vetted Factories", sub: "Screened for compliance" },
                { value: "95%", label: "On-Time Delivery", sub: "Across active programmes" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="rounded-2xl bg-white border border-gray-200 p-5 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-gold mb-1">{s.value}</p>
                  <p className="text-navy-900 font-semibold text-sm">{s.label}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Registry table */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
            <div className="grid grid-cols-3 bg-navy-900 px-6 py-3">
              <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">Certification</span>
              <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">Standard Area</span>
              <span className="text-xs font-semibold text-white/60 uppercase tracking-widest hidden sm:block">Status</span>
            </div>
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`grid grid-cols-3 items-center px-6 py-4 border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-1 h-8 rounded-full bg-gold shrink-0" aria-hidden="true" />
                  <div className="flex items-center gap-3">
                    <Image
                      src={`/images/certs/cert-${cert.file}.webp`}
                      alt={cert.name}
                      width={48}
                      height={28}
                      className="object-contain h-7 w-auto"
                      sizes="48px"
                    />
                    <span className="font-bold text-navy-900 font-mono text-sm">{cert.name}</span>
                  </div>
                </div>
                <span className="text-gray-600 text-sm">{cert.desc}</span>
                <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" aria-hidden="true" />
                  Available in Network
                </span>
              </motion.div>
            ))}
          </div>
        </div>
        <BackToTop />
      </section>

      {/* ═══ SECTION — COMPLIANCE STANDARDS ═══ */}
      <section id="ww-compliance" className="py-20 bg-gray-50" aria-labelledby="ww-compliance-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Safety Standards</p>
            <h2 id="ww-compliance-h2" className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              10 International Standards — Matched to Your Export Region
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Workwear compliance is jurisdiction-specific. EN ISO standards govern EU and UK markets; NFPA standards are mandatory for US buyers; ANSI/ISEA 107 applies to hi-vis workwear in the USA; AS/NZS 4602.1 covers Australian and New Zealand programmes. We identify the correct standard for your destination market and confirm factory certification before production begins.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {COMPLIANCE_STANDARDS.map((std, i) => (
              <motion.div
                key={std.code}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`rounded-2xl border p-6 ${std.accent}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0 mt-0.5" aria-hidden="true">{std.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-base font-bold text-navy-900 font-mono">{std.code}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${std.labelClr} bg-white/70`}>{std.region}</span>
                    </div>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${std.labelClr}`}>{std.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{std.desc}</p>
                    <div>
                      <p className="text-[10px] font-bold text-navy-900/60 uppercase tracking-wider mb-1.5">Applies To</p>
                      <div className="flex flex-wrap gap-1.5">
                        {std.applies.map((a) => (
                          <span key={a} className="rounded-full bg-white/60 border border-gray-200 px-2 py-0.5 text-[10px] font-semibold text-navy-900/70">{a}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 rounded-2xl bg-navy-900 p-8 text-center"
          >
            <p className="text-gold font-bold text-xs tracking-[0.2em] uppercase mb-3">Standard Not Listed?</p>
            <h3 className="text-xl font-bold text-white mb-3">We Source to Buyer-Specified Standards</h3>
            <p className="text-white/70 text-sm max-w-2xl mx-auto mb-6">
              If your programme requires a standard not listed above — country-specific regulations, military standards, or combined standard compliance — state the exact standard code in your RFQ and we confirm factory capability before accepting the order.
            </p>
            <Link
              href="/rfq/"
              className="inline-flex items-center gap-2 bg-gold text-navy-900 font-bold px-8 py-3 rounded-lg text-sm hover:bg-yellow-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Specify Your Standard in the RFQ
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
        <BackToTop />
      </section>

      {/* ═══ SECTION 9 — EXPORT & PACKAGING (Swiss Design on amber-50) ═══ */}
      <section id="ww-export" className="py-20 bg-amber-50" aria-labelledby="ww-export-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-amber-300" aria-hidden="true" />
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase shrink-0">Export &amp; Logistics</p>
              <div className="h-px flex-1 bg-amber-300" aria-hidden="true" />
            </div>
            <h2 id="ww-export-h2" className="text-3xl sm:text-4xl font-bold text-navy-900 text-center mb-4">
              FOB Karachi · CIF · CFR — Full Compliance Documentation
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-center">
              Workwear shipments include a compliance documentation package: commercial invoice, packing list, certificate of origin, AQL inspection report, and safety test certificates (FR, hi-vis, anti-static) where applicable.
            </p>
          </motion.div>

          {/* Shipment steps — Swiss large-number style */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {EXPORT_STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative rounded-2xl bg-white border border-amber-200 p-7 overflow-hidden"
              >
                <p className="absolute top-3 right-5 text-[72px] font-black text-amber-100 leading-none select-none" aria-hidden="true">{s.n}</p>
                <p className="relative font-bold text-navy-900 text-base mb-2">{s.label}</p>
                <p className="relative text-gray-600 text-sm">{s.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Packing + terms */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-amber-200 p-6">
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Packing Options</h3>
              <div className="grid grid-cols-2 gap-3">
                {PACK_OPTIONS.map((p) => (
                  <div key={p.label} className="rounded-xl bg-amber-50 border border-amber-100 p-3">
                    <p className="font-semibold text-navy-900 text-sm">{p.label}</p>
                    <p className="text-gray-600 text-xs mt-1">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-amber-200 p-6">
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Export Terms Available</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {["FOB", "CIF", "CFR", "EXW", "DAP", "DDP"].map((term) => (
                  <div key={term} className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center">
                    <p className="font-black text-navy-900 text-sm">{term}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400">Port: Karachi (PKKHIA). Alternative: Port Qasim.</p>
            </div>
          </div>
        </div>
        <BackToTop />
      </section>

      {/* ═══ SECTION 10 — SUSTAINABILITY (Neumorphism on #E8EDF2) ═══ */}
      <section id="ww-sustainability" className="py-20" style={{ background: "#E8EDF2" }} aria-labelledby="ww-sustain-h2">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Sustainability</p>
            <h2 id="ww-sustain-h2" className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              ESG-Ready Workwear Sourcing for Scope 3 Reporting
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Large-fleet workwear buyers increasingly face Scope 3 reporting obligations. Recycled polyester ripstop, BCI cotton, SA8000 verified labour, and OEKO-TEX tested fabrics — so your workwear procurement can be included in ESG reporting.
            </p>
          </motion.div>

          {/* Scorecard — desktop table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden hidden md:block"
            style={{ boxShadow: "8px 8px 16px #c8cdd2, -8px -8px 16px #ffffff" }}
          >
            <table className="w-full text-sm" style={{ background: "#E8EDF2" }}>
              <thead>
                <tr style={{ background: "#dde2e8", boxShadow: "inset 0 -1px 0 #c8cdd2" }}>
                  <th className="text-left px-6 py-4 font-bold text-navy-900 text-xs uppercase tracking-wider">Criterion</th>
                  <th className="text-left px-6 py-4 font-bold text-navy-900 text-xs uppercase tracking-wider">Scope</th>
                  <th className="text-center px-6 py-4 font-bold text-navy-900 text-xs uppercase tracking-wider">Available</th>
                  <th className="text-left px-6 py-4 font-bold text-navy-900 text-xs uppercase tracking-wider">Standard</th>
                </tr>
              </thead>
              <tbody>
                {SUSTAINABILITY_ITEMS.map((item, i) => (
                  <tr
                    key={item.title}
                    style={{ background: i % 2 === 0 ? "#E8EDF2" : "#eff2f5", borderBottom: "1px solid #d8dde2" }}
                  >
                    <td className="px-6 py-4">
                      <span className="mr-2" aria-hidden="true">{item.icon}</span>
                      <span className="font-semibold text-navy-900">{item.title}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.scope}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-emerald-600 font-bold text-base" aria-label="Available">✓</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{item.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Scorecard — mobile card list */}
          <div className="md:hidden space-y-3">
            {SUSTAINABILITY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-xl p-4 flex items-start gap-3"
                style={{ background: "#E8EDF2", boxShadow: "4px 4px 8px #c8cdd2, -4px -4px 8px #ffffff" }}
              >
                <span className="text-2xl shrink-0" aria-hidden="true">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-navy-900 text-sm">{item.title}</span>
                    <span className="text-emerald-600 font-bold text-base shrink-0" aria-label="Available">✓</span>
                  </div>
                  <p className="text-xs text-gray-500">{item.scope} · {item.standard}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <BackToTop />
      </section>

      {/* ═══ SECTION 11 — PROCESS (Material Design Stepper on white) ═══ */}
      <section id="ww-process" className="py-20 bg-white" aria-labelledby="ww-process-h2">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Sourcing Process</p>
            <h2 id="ww-process-h2" className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Six Stages — Structured for Safety-Regulated Procurement
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Workwear sourcing requires more structured pre-production than standard garment sourcing. Compliance testing, FR validation, and reflective tape verification occur before bulk production — built into stages 2 and 3.
            </p>
          </motion.div>

          {/* Lead time banner */}
          <div className="mb-10 rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="text-amber-700 text-sm">
              <strong>Lead times are indicative.</strong> FR compliance testing, hi-vis retroreflectivity certification, and anti-static validation add time to pre-production. Actual timelines confirmed at enquiry stage.
            </p>
          </div>

          {/* Vertical Material Design stepper */}
          <div className="relative">
            <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gray-200" aria-hidden="true" />
            <div className="space-y-5">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative flex items-start gap-5"
                >
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md border-4 border-white ${i < 3 ? "bg-navy-900" : "bg-gold"}`}>
                    <span className={`text-xs font-bold ${i < 3 ? "text-gold" : "text-navy-900"}`}>{step.n}</span>
                  </div>
                  <div className="flex-1 rounded-2xl border border-gray-100 bg-white shadow-sm p-5 mb-2">
                    <h3 className="font-bold text-navy-900 mb-1.5">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lead time table */}
          <div className="mt-12 rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-navy-900">
              <p className="text-white font-semibold text-sm">Indicative Lead Time Breakdown</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-3 font-semibold text-navy-900">Phase</th>
                    <th className="text-left px-6 py-3 font-semibold text-navy-900">Weeks</th>
                    <th className="text-left px-6 py-3 font-semibold text-navy-900 hidden md:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {LEAD_STAGES.map((ls, i) => (
                    <tr key={ls.phase} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/50" : ""}`}>
                      <td className="px-6 py-3 text-navy-900 font-medium">{ls.phase}</td>
                      <td className="px-6 py-3">
                        <span className="text-gold font-bold">{ls.weeks}</span>
                        <span className="text-gray-400 text-xs"> wks</span>
                      </td>
                      <td className="px-6 py-3 text-gray-500 hidden md:table-cell">{ls.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <BackToTop />
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 bg-white" aria-labelledby="ww-faq-h2">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">FAQ</p>
            <h2 id="ww-faq-h2" className="text-3xl sm:text-4xl font-bold text-navy-900">
              Workwear Sourcing — Common Buyer Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span className="font-semibold text-navy-900 text-sm leading-snug">{faq.q}</span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className={`h-4 w-4 shrink-0 text-gold transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5">
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="py-20 bg-navy-900" aria-label="Request a quote call to action">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Start Your Programme</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Request Workwear Samples or a Fleet Programme Quote
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Tell us your sector, safety standards required, and fleet size. We will confirm factory match, certification pathway, and indicative lead time within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-8 py-4 text-sm font-semibold text-navy-900 hover:bg-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Request a Quote
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.44 8.75H2.75a.75.75 0 010-1.5h8.69L8.22 4.03a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
