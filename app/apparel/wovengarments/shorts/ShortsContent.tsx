"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Scroll helpers ───────────────────────────────────────────────────────────

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 160;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function BackToTop({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex justify-center mt-16">
      <button
        onClick={() => scrollToId("bento-grid")}
        className={`group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 ${
          dark
            ? "border border-gold/60 text-gold hover:bg-gold hover:text-navy-900"
            : "border-2 border-gold text-navy-900 hover:bg-gold shadow-sm"
        }`}
        style={{ animation: "btt-pulse 2.2s ease-out infinite" }}
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          aria-hidden="true"
        >
          ↑
        </motion.span>
        Move back to top
      </button>
      <style>{`
        @keyframes btt-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(212,160,23,0.45); }
          70%  { box-shadow: 0 0 0 10px rgba(212,160,23,0); }
          100% { box-shadow: 0 0 0 0 rgba(212,160,23,0); }
        }
      `}</style>
    </div>
  );
}

function ExploreBtn({ sectionId, label }: { sectionId: string; label: string }) {
  return (
    <button
      onClick={() => scrollToId(sectionId)}
      className="group self-start inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold transition-colors mt-auto pt-4"
    >
      {label}
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">
        →
      </span>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  {
    id: "chino-twill",
    name: "Twill / Chino",
    badge: "Fashion Favourite",
    gsm: "200–240 GSM",
    hand: "Smooth, structured, holds crease — the classic casual short",
    best: ["Fashion Retailers", "Lifestyle Brands", "Department Stores"],
    markets: ["USA", "UK", "EU", "Australia"],
    decorations: ["Screen Print", "Embroidery", "Heat Transfer"],
    detail:
      "Chino twill is Pakistan's strongest suit in the shorts category. The 2×1 or 3×1 twill weave produces a refined surface that presses cleanly and wears comfortably across casual-to-smart occasions. Waist 28–38\" with inseam options from 5\" (fashion) to 9\" (classic) make this the broadest-reach construction in the range. Cotton, cotton-spandex stretch and poly-cotton easy-care variants all source reliably.",
    icon: "👔",
  },
  {
    id: "ripstop",
    name: "Ripstop",
    badge: "Outdoor & Cargo",
    gsm: "180–260 GSM",
    hand: "Grid-reinforced, tear-resistant — built for outdoor performance",
    best: ["Outdoor Brands", "Tactical Fashion", "Workwear"],
    markets: ["USA", "Germany", "Australia", "Canada"],
    decorations: ["Embroidery", "Screen Print", "Heat Transfer"],
    detail:
      "Ripstop shorts occupy the overlap between cargo trousers and activewear — the reinforced grid weave resists tearing without added weight. Available in 100% nylon, 100% cotton and TC poly-cotton. Inseam 7\"–11\" with multi-pocket cargo detailing or clean utility styling. DWR water-repellent finish makes these suitable for hiking, field work and outdoor recreation programmes.",
    icon: "🏕️",
  },
  {
    id: "canvas",
    name: "Canvas",
    badge: "Heavy-Duty",
    gsm: "240–280 GSM",
    hand: "Stiff, robust, high-durability — workwear and utility builds",
    best: ["Workwear Brands", "Construction Sector", "Utility Retailers"],
    markets: ["USA", "UK", "Middle East", "Australia"],
    decorations: ["Embroidery", "Screen Print"],
    detail:
      "Canvas shorts serve the crossover between workwear trousers and casual utility. The heavy plain weave resists abrasion and retains shape through hard use. Cotton canvas is the dominant fabric; poly-cotton canvas offers lighter weight with added durability. Inseam 9\"–11\" for functional utility styling. Often paired with reinforced knee area, bar-tacked pocket corners and hammer loops.",
    icon: "🔧",
  },
  {
    id: "linen-blend",
    name: "Linen Blend",
    badge: "Summer Premium",
    gsm: "160–200 GSM",
    hand: "Breathable, textured, relaxed — the EU summer essential",
    best: ["Premium Lifestyle Brands", "EU/Scandinavian Buyers", "Resort Wear"],
    markets: ["Germany", "France", "Netherlands", "Scandinavia"],
    decorations: ["Embroidery", "Screen Print", "No decoration"],
    detail:
      "Linen blend shorts are a growing niche for the EU and Scandinavian summer market — natural texture, superior breathability and a relaxed aesthetic that reads as considered rather than casual. Cotton-linen 55/45 is the most workable blend, delivering the drape and hand of linen with the wash stability of cotton. GOTS-certified organic linen blend is available for premium sustainable programmes.",
    icon: "🌿",
  },
  {
    id: "single-jersey",
    name: "Single Jersey",
    badge: "Athletic",
    gsm: "160–200 GSM",
    hand: "Soft, stretchy, moisture-wicking — performance activewear build",
    best: ["Activewear Brands", "Sports Retailers", "Fitness Labels"],
    markets: ["USA", "UK", "Canada", "Australia"],
    decorations: ["Screen Print", "Digital / DTG", "Sublimation"],
    detail:
      "Single jersey athletic shorts span running, gym and casual sport end uses. The lightweight knit construction offers natural stretch without spandex blend in mid-weights; cotton-spandex 95/5 adds compression and shape retention for sport-specific programmes. Inseam 5\"–9\" depending on end use — shorter for running, longer for gym and casual. Moisture-wicking treatment is available as a standard finish upgrade.",
    icon: "🏃",
  },
  {
    id: "french-terry",
    name: "French Terry",
    badge: "Leisure & Loungewear",
    gsm: "220–320 GSM",
    hand: "Looped reverse, soft face — weekend and loungewear positioning",
    best: ["Loungewear Brands", "Casual Lifestyle", "Athleisure"],
    markets: ["USA", "UK", "EU", "Canada"],
    decorations: ["Screen Print", "Embroidery", "Heat Transfer"],
    detail:
      "French terry shorts occupy the athleisure and loungewear segment — the looped reverse provides warmth and a premium hand feel while the smooth face presents cleanly. 280–320 GSM is the standard weight for shorts, keeping the garment from feeling heavy through the inseam. Inseam 6\"–8\" is typical. Often produced as co-ordinated set bottoms with French terry sweatshirts or hoodies.",
    icon: "🛋️",
  },
  {
    id: "nylon-swim",
    name: "Nylon (Swim)",
    badge: "Beach & Pool",
    gsm: "130–180 GSM",
    hand: "Fast-drying, chlorine-resistant — swim and beach programmes",
    best: ["Swimwear Brands", "Beach Retailers", "Holiday & Resort"],
    markets: ["USA", "Australia", "Middle East", "EU"],
    decorations: ["Sublimation Print", "Heat Transfer", "Screen Print"],
    detail:
      "Nylon swim shorts combine fast-dry performance with vibrant colour retention — critical for beach and poolside end uses where chlorine and saltwater resistance are buying criteria. 100% nylon or nylon-spandex blends with sublimation print capability across the full surface. Inseam 7\"–10\" with mesh inner lining and drawstring waistband as standard. DWR coating is included on all swim programmes.",
    icon: "🏖️",
  },
];

const FIT_PROFILES = [
  {
    name: "Regular Fit",
    inseam: '7"–9"',
    waist: "28–38\"",
    description:
      "The commercial baseline — straight leg from seat with moderate seat room. Works across casual, smart-casual and workwear applications. The most broadly stocked fit globally.",
    markets: "USA · UK · EU · Canada · Australia",
    icon: "📐",
  },
  {
    name: "Slim Fit",
    inseam: '6"–8"',
    waist: "28–36\"",
    description:
      "Tapered through the thigh with a cleaner hem. Fashion-forward positioning in the casual and smart-casual segments. Strong in European and East Asian markets where a fitted silhouette is standard.",
    markets: "EU · UK · Japan · South Korea · Australia",
    icon: "✂️",
  },
  {
    name: "Relaxed / Loose",
    inseam: '8"–11"',
    waist: "30–42\"",
    description:
      "Extra seat room and thigh width for maximum comfort. Preferred for workwear, utility and the streetwear-influenced oversized trend that dominates USA/Canada youth markets.",
    markets: "USA · Canada · Middle East · South America",
    icon: "🌊",
  },
  {
    name: "Athletic / Performance",
    inseam: '5"–7"',
    waist: "28–38\"",
    description:
      "Contoured seat and thigh to follow body movement without restriction. Built for running, gym and active sports. Often includes gusset crotch for unrestricted range of motion.",
    markets: "USA · UK · Canada · Australia · Germany",
    icon: "⚡",
  },
];

const GSM_WEIGHTS = [
  { label: "130–160 GSM", name: "Lightweight", use: "Nylon swim / athletic jersey", markets: "Beach · Pool · Running", color: "bg-sky-100 text-sky-800" },
  { label: "160–200 GSM", name: "Light-Medium", use: "Linen blend / single jersey", markets: "EU summer · Athleisure", color: "bg-lime-100 text-lime-800" },
  { label: "200–240 GSM", name: "Medium", use: "Chino twill / ripstop", markets: "Fashion · Casual · Outdoor", color: "bg-teal-100 text-teal-800" },
  { label: "240–280 GSM", name: "Heavy", use: "Canvas / heavy ripstop", markets: "Workwear · Utility · Cargo", color: "bg-emerald-100 text-emerald-800" },
];

const DECORATION_OPTIONS = [
  {
    type: "Screen Print",
    placements: ["Left leg / thigh", "Front centre (below waistband)", "Back (hip)"],
    best: "Fashion branding on chino and canvas shorts",
    icon: "🖨️",
  },
  {
    type: "Digital / DTG",
    placements: ["Full leg panel", "Small logo (left leg)", "Hip print"],
    best: "Short-run and sampling on cotton-rich shorts",
    icon: "🖥️",
  },
  {
    type: "Embroidery",
    placements: ["Left thigh (logo)", "Waistband", "Back pocket"],
    best: "Premium finish on chino, linen blend and workwear",
    icon: "🪡",
  },
  {
    type: "Heat Transfer",
    placements: ["Leg badge", "Hip logo", "Waistband badge"],
    best: "Retail-ready finish — fast lead time, low setup cost",
    icon: "🌡️",
  },
  {
    type: "Sublimation Print",
    placements: ["All-over (swim shorts)", "Full leg (athletic)", "Side stripe"],
    best: "Nylon swim and performance shorts — photographic quality",
    icon: "🌈",
  },
  {
    type: "No Decoration",
    placements: ["Plain / unbranded"],
    best: "Institutional, workwear and retailer own-brand programmes",
    icon: "⬜",
  },
];

const COLOUR_FAMILIES = [
  { name: "Naturals", shades: ["Ecru", "Stone", "Sand", "Wheat", "Parchment"], icon: "🌾" },
  { name: "Blues", shades: ["Navy", "Mid Blue", "Sky", "Slate", "Denim Blue"], icon: "💙" },
  { name: "Greens", shades: ["Olive", "Sage", "Forest", "Hunter", "Khaki"], icon: "🌿" },
  { name: "Brights", shades: ["Cobalt", "Coral", "Lime", "Tangerine", "Fuchsia"], icon: "🎨" },
  { name: "Neutrals", shades: ["White", "Off-White", "Light Grey", "Mid Grey", "Charcoal"], icon: "⚪" },
  { name: "Darks", shades: ["Black", "Dark Navy", "Espresso", "Dark Olive", "Burgundy"], icon: "🖤" },
  { name: "Brights (Swim)", shades: ["Turquoise", "Aqua", "Flamingo", "Lemon", "Electric Blue"], icon: "🏊" },
];

const DYE_OPTIONS = [
  { label: "Reactive Dye", note: "Cotton, linen, terry — brilliant colour, wash-fast" },
  { label: "Vat Dye", note: "Deep, fade-resistant blacks and navies" },
  { label: "Disperse Dye", note: "Polyester and nylon — sublimation-ready" },
  { label: "Pigment Dye", note: "Vintage / washed appearance on chino and canvas" },
  { label: "Garment Dye", note: "Finished garment dyed — unique tonal variation" },
  { label: "Yarn Dye", note: "Stripe and check wovens — colour woven in, not printed" },
];

const OEM_FEATURES = [
  {
    icon: "📐",
    title: "Technical Spec Development",
    body: "Full tech pack creation from your sketch, reference sample or concept brief. Inseam, rise, waist circumference and pocket specs detailed to production tolerance.",
  },
  {
    icon: "🧵",
    title: "Fabric & Trim Sourcing",
    body: "We source fabric, thread, labels, buttons, zippers and hardware from Pakistan's certified mill network — no third-party sourcing delays.",
  },
  {
    icon: "🎨",
    title: "Colour Development",
    body: "Lab dip approval against your Pantone, fabric swatch or digital reference. Typically 2–3 rounds to sign-off.",
  },
  {
    icon: "✂️",
    title: "Pattern Grading",
    body: "Full size set grading from your base pattern or our block. US, UK and EU grading conventions all supported.",
  },
  {
    icon: "📦",
    title: "Packing & Labelling",
    body: "Custom hangtags, woven labels, care labels, barcode stickers and retail packaging included. Compliance with US, EU and AU labelling requirements.",
  },
  {
    icon: "🚢",
    title: "FOB / CIF / CFR Export",
    body: "Full logistics co-ordination from Karachi port. Documentary requirements handled: commercial invoice, packing list, certificate of origin, inspection certificates.",
  },
];

const MARKETS = [
  { region: "North America", countries: "USA · Canada · Mexico", notes: "Chino, cargo and athletic shorts dominate. California casualwear and outdoor segments strongest.", icon: "🌎", glow: "shadow-blue-500/20" },
  { region: "Europe", countries: "UK · Germany · France · Netherlands · Scandinavia", notes: "Linen blend and premium chino lead. EU buyers specify OEKO-TEX and GOTS at increasing rates.", icon: "🌍", glow: "shadow-emerald-500/20" },
  { region: "Middle East", countries: "UAE · Saudi Arabia · Qatar · Kuwait", notes: "Chino and canvas shorts for hospitality and retail. White and neutral tones prevalent.", icon: "🌙", glow: "shadow-amber-500/20" },
  { region: "Australia & NZ", countries: "Australia · New Zealand", notes: "Outdoor, swim and active segments all strong. DWR and quick-dry finishes standard expectation.", icon: "🦘", glow: "shadow-orange-500/20" },
  { region: "Southeast Asia", countries: "Singapore · Malaysia · Thailand · Vietnam", notes: "Athletic and swim shorts for growing sports retail. Sublimation print capability in demand.", icon: "🌴", glow: "shadow-teal-500/20" },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", use: "Organic cotton linen and jersey shorts programmes" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", use: "All construction types — no harmful substances" },
  { name: "BSCI", full: "Business Social Compliance Initiative", use: "Social audit for EU buyers" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", use: "UK and EU ethical sourcing programmes" },
  { name: "ISO 9001", full: "Quality Management System", use: "Quality process verification for all categories" },
  { name: "GRS", full: "Global Recycled Standard", use: "Recycled nylon and poly-cotton shorts" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", use: "USA and North American buyers" },
  { name: "BCI", full: "Better Cotton Initiative", use: "Conventional cotton programmes with sustainability credentials" },
  { name: "SA8000", full: "Social Accountability International", use: "Labour compliance for multinational brands" },
  { name: "Bluesign", full: "Bluesign Standard", use: "Resource-efficient production for premium outdoor brands" },
];

const PACK_OPTIONS = [
  { label: "Individual Polybag", detail: "Standard export pack — pair folded, sealed polybag", icon: "🛍️" },
  { label: "Hanger + Polybag", detail: "Retail-ready — branded or plain hanger inside polybag", icon: "👗" },
  { label: "Retail Box", detail: "Premium gift or boutique presentation", icon: "📦" },
  { label: "Folded Flat (Export)", detail: "High-density bulk packing for FOB shipments", icon: "📋" },
  { label: "Bulk / No Individual Pack", detail: "Institutional and distributor programmes", icon: "📫" },
];

const INCOTERMS = [
  { term: "FOB Karachi", buyer: "Buyer", seller: "MZ Global", desc: "Risk transfers at port of loading. Buyer arranges freight and insurance." },
  { term: "CIF Destination", buyer: "Buyer", seller: "MZ Global", desc: "Cost, insurance and freight to named port. MZ arranges sea freight." },
  { term: "CFR Destination", buyer: "Buyer", seller: "MZ Global", desc: "Cost and freight included; buyer arranges own insurance." },
  { term: "EXW Factory", buyer: "Buyer", seller: "MZ Global", desc: "Ex-works. Buyer collects from factory gate — lowest risk for MZ." },
];

const LEAD_STAGES = [
  { phase: "Spec & Sampling", weeks: "3–5", note: "Tech pack, fabric approval, pre-production sample" },
  { phase: "Bulk Fabric Production", weeks: "3–4", note: "Mill weaving / knitting and dyeing" },
  { phase: "Garment Production", weeks: "3–5", note: "Cutting, sewing, finishing, inline QC" },
  { phase: "Final Inspection & Packing", weeks: "1–2", note: "AQL inspection, packing, documentation" },
  { phase: "Shipping (Sea Freight)", weeks: "3–5", note: "Karachi to USA / UK / EU — port dependent" },
];

const SUSTAINABILITY_ITEMS = [
  {
    label: "Organic Cotton",
    detail: "GOTS-certified organic cotton available for chino and linen blend constructions",
    icon: "🌱",
  },
  {
    label: "Recycled Nylon",
    detail: "GRS-certified recycled nylon for swim and outdoor shorts programmes",
    icon: "♻️",
  },
  {
    label: "BCI Better Cotton",
    detail: "Better Cotton Initiative sourcing across all conventional cotton programmes",
    icon: "🌾",
  },
  {
    label: "Water-Based Dyes",
    detail: "Low-impact reactive and disperse dyes across all fabric types",
    icon: "💧",
  },
  {
    label: "Bluesign Fabric",
    detail: "Bluesign-certified mills for outdoor and performance shorts",
    icon: "🔵",
  },
  {
    label: "AZO-Free Dyes",
    detail: "All programmes are AZO-free as standard — OEKO-TEX compliance baseline",
    icon: "✅",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Enquiry & Brief",
    detail: "Submit construction type, quantity, inseam and waist range, target GSM, certification needs and delivery port. We confirm feasibility within 24–48 hours.",
  },
  {
    num: "02",
    title: "Factory Selection",
    detail: "We match your programme to the most suitable verified factory from our network of 50+ units — considering construction capability, certifications and capacity.",
  },
  {
    num: "03",
    title: "Tech Pack & Sampling",
    detail: "Tech pack development or refinement, fabric and trim sourcing, lab dip approval and pre-production sample submission. Typically 3–5 weeks.",
  },
  {
    num: "04",
    title: "Sample Approval",
    detail: "You review the pre-production sample and provide fit, colour and construction feedback. We revise until approval is granted before any bulk commitment.",
  },
  {
    num: "05",
    title: "Bulk Production",
    detail: "Fabric production, garment cutting, sewing and finishing with inline quality checks at every stage. Production timeline 6–9 weeks depending on programme size.",
  },
  {
    num: "06",
    title: "QC & Inspection",
    detail: "Final AQL inspection — we arrange third-party inspection (SGS, Bureau Veritas or equivalent) on request. Defects addressed before packing.",
  },
  {
    num: "07",
    title: "Shipment & Documentation",
    detail: "Packing, loading and full documentation set: commercial invoice, packing list, bill of lading, certificate of origin, inspection certificates and compliance declarations.",
  },
];

const FAQS = [
  {
    q: "Can you source both woven and knit shorts in a single order?",
    a: "Yes. MZ Global Trading sources across woven (chino, ripstop, canvas, linen blend, nylon swim) and knit (single jersey, French terry) constructions. Mixed-construction orders can be consolidated under one purchase order and shipped together, subject to factory capability alignment.",
  },
  {
    q: "What inseam lengths are available, and can inseam be customised?",
    a: "Standard inseam options run from 5\" (athletic/running) through to 11\" (utility/workwear). Custom inseam lengths are available — simply specify your target in centimetres or inches when submitting your tech pack. Graded inseam adjustments across the size run are also supported.",
  },
  {
    q: "Which construction is best for activewear vs. casual fashion shorts?",
    a: "For activewear and sport, single jersey (160–200 GSM) with moisture-wicking treatment or nylon (130–180 GSM) for swim are the primary builds. For casual fashion, chino twill (200–240 GSM) is the strongest performer — refined hand, wide colour range and the broadest retail positioning. Ripstop bridges the outdoor/fashion gap.",
  },
  {
    q: "Do you offer DWR water-repellent finishing for swim and outdoor shorts?",
    a: "Yes. DWR (Durable Water Repellent) coating is a standard finish option on nylon swim shorts and ripstop outdoor programmes. It is applied as a final finishing step and does not affect print or colour. Fluorocarbon-free DWR (C0 DWR) is available for buyers with PFAS-free sourcing requirements.",
  },
  {
    q: "What certifications apply to linen blend and organic cotton shorts?",
    a: "GOTS certification applies to shorts made from certified organic cotton and organic linen fibres where the entire supply chain (fibre to finished garment) holds GOTS status. OEKO-TEX Standard 100 certifies the finished garment against harmful substances regardless of fibre. BCI applies to conventional (non-organic) cotton programmes with sustainability credentials.",
  },
  {
    q: "What is the typical lead time for woven shorts programmes?",
    a: "Indicative total lead time from order confirmation to cargo-ready at Karachi port is 10–16 weeks — comprising 3–5 weeks for sampling and approval, 6–9 weeks for bulk production, and 1–2 weeks for final inspection and packing. Sea transit to USA/UK/EU adds a further 3–5 weeks. Timelines vary with programme size, construction complexity and certification requirements.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ShortsContent() {
  const [activeConstruction, setActiveConstruction] = useState(CONSTRUCTIONS[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeCon = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-shorts.webp"
            fill
            priority
            sizes="100vw"
            alt="Pakistan shorts manufacturer — chino, ripstop and athletic shorts for wholesale buyers in USA, UK and Europe"
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/apparel/wovengarments/" className="hover:text-gold transition-colors">Woven Garments</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Shorts</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Woven Garment Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Shorts
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
              MZ Global Trading sources custom shorts from Pakistan&apos;s certified woven and knit factories. Chino twill, ripstop, canvas, linen blend, athletic jersey and nylon swim. 130–280 GSM. Inseam 5&quot;–11&quot;. OEKO-TEX, BSCI, GOTS. FOB / CIF export.
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
                onClick={() => scrollToId("bento-grid")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Product Guide
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Anchor ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="lg:flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                Shorts Sourcing — At a Glance
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Seven Constructions. One Sourcing Partner.
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
                Casual chino to technical nylon swim — MZ Global Trading covers the full shorts spectrum from Pakistan&apos;s verified factory network. One enquiry opens access to all seven build types.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:flex-1">
              {[
                { value: "50+", label: "Vetted Factories" },
                { value: "35+", label: "Export Markets" },
                { value: "10+", label: "Certifications" },
                { value: "7", label: "Fabric Types" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="lg:flex-shrink-0">
              <Link
                href="/rfq/"
                className="inline-flex items-center gap-2 bg-gold text-navy-900 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 transition-colors text-sm"
              >
                Start Your Enquiry →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento Grid ────────────────────────────────────────────────────── */}
      <section id="bento-grid" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Specification</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects of Shorts Sourcing</h2>
          </div>

          {/* Row 1 — 2-col equal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-lime-50 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-3xl mb-3" aria-hidden="true">🏗️</span>
              <p className="text-xs font-semibold text-lime-700 uppercase tracking-wider mb-1">Constructions</p>
              <h3 className="text-lg font-bold text-navy-900 mb-2">7 Fabric Builds</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                From 130 GSM nylon swim to 280 GSM canvas utility. Widest construction range in the woven garment category.
              </p>
              <ExploreBtn sectionId="sec-constructions" label="View constructions" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="bg-sky-50 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-3xl mb-3" aria-hidden="true">👟</span>
              <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">Fit Profiles</p>
              <h3 className="text-lg font-bold text-navy-900 mb-2">4 Fit Options</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                Regular, Slim, Relaxed and Athletic fits. Inseam 5&quot;–11&quot;. Custom inseam grading across the full size run supported.
              </p>
              <ExploreBtn sectionId="sec-fits" label="View fits" />
            </motion.div>
          </div>

          {/* Row 2 — 4-col equal */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {[
              { bg: "bg-teal-50", accent: "text-teal-700", icon: "⚖️", label: "GSM & Weight", desc: "160–280 GSM range. Lightest of all woven categories at the top end.", section: "sec-gsm" },
              { bg: "bg-emerald-50", accent: "text-emerald-700", icon: "🎨", label: "Decoration", desc: "Screen, DTG, embroidery, heat transfer and sublimation. All-over swim print available.", section: "sec-decoration" },
              { bg: "bg-cyan-50", accent: "text-cyan-700", icon: "🌈", label: "Colours", desc: "7 colour families from naturals and blues to vivid swim tones. Garment dye available on chino.", section: "sec-colours" },
              { bg: "bg-green-50", accent: "text-green-700", icon: "🔧", label: "OEM & Custom", desc: "Full tech pack, inseam grading, trim sourcing, packing and labelling included.", section: "sec-oem" },
            ].map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`${b.bg} rounded-2xl p-5 flex flex-col min-h-[180px]`}
              >
                <span className="text-2xl mb-2" aria-hidden="true">{b.icon}</span>
                <p className={`text-xs font-semibold ${b.accent} uppercase tracking-wider mb-1`}>{b.label}</p>
                <p className="text-gray-600 text-xs leading-relaxed flex-1">{b.desc}</p>
                <ExploreBtn sectionId={b.section} label="Explore →" />
              </motion.div>
            ))}
          </div>

          {/* Row 3 — 5-col 2+2+1 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-yellow-50 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-3xl mb-3" aria-hidden="true">🌍</span>
              <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wider mb-1">Export Markets</p>
              <h3 className="text-lg font-bold text-navy-900 mb-2">35+ Countries Served</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                USA, UK, Germany, France, UAE, Australia, Canada, Scandinavia and beyond. Linen blend specialists for EU summer programmes.
              </p>
              <ExploreBtn sectionId="sec-markets" label="View markets" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 }}
              className="md:col-span-2 bg-lime-50 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-3xl mb-3" aria-hidden="true">🏆</span>
              <p className="text-xs font-semibold text-lime-700 uppercase tracking-wider mb-1">Certifications</p>
              <h3 className="text-lg font-bold text-navy-900 mb-2">10+ Certifications Available</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                OEKO-TEX, GOTS, BSCI, Sedex, ISO 9001, GRS, WRAP, BCI, SA8000, Bluesign. All programmes carry at least OEKO-TEX as baseline.
              </p>
              <ExploreBtn sectionId="sec-certs" label="View certifications" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="md:col-span-1 bg-sky-50 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-3xl mb-3" aria-hidden="true">🚢</span>
              <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">Export</p>
              <h3 className="text-lg font-bold text-navy-900 mb-2">FOB · CIF · CFR</h3>
              <p className="text-gray-600 text-xs leading-relaxed flex-1">
                Karachi port. Full documentation. Inspection on request.
              </p>
              <ExploreBtn sectionId="sec-export" label="Details →" />
            </motion.div>
          </div>

          {/* Row 4 — 3-col 2+1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-teal-50 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-3xl mb-3" aria-hidden="true">🌱</span>
              <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">Sustainability</p>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Organic, Recycled & Better Cotton Options</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                GOTS organic cotton and linen, GRS recycled nylon, BCI Better Cotton and C0 DWR fluorocarbon-free finishing all available to specification.
              </p>
              <ExploreBtn sectionId="sec-sustainability" label="View sustainable options" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 }}
              className="md:col-span-1 bg-emerald-50 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-3xl mb-3" aria-hidden="true">🔄</span>
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">Sourcing Process</p>
              <h3 className="text-lg font-bold text-navy-900 mb-2">7-Stage Flow</h3>
              <p className="text-gray-600 text-xs leading-relaxed flex-1">
                Enquiry to shipment — transparent milestones and indicative timelines at every stage.
              </p>
              <ExploreBtn sectionId="sec-process" label="View process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Resources Row ─────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "📚", label: "Knowledge Hub", desc: "Fabric guides, GSM tables, certification explainers", href: "/knowledge" },
              { icon: "📖", label: "Sourcing Guides", desc: "Step-by-step buyer guides for woven garment programmes", href: "/guides" },
              { icon: "📥", label: "Downloads", desc: "Factory profile, quality policy, company overview", href: "/downloads" },
              { icon: "📋", label: "Request a Quote", desc: "Submit specs — we respond within 24–48 hours", href: "/rfq/" },
            ].map((r) => (
              <Link
                key={r.label}
                href={r.href}
                className="bg-white rounded-2xl p-5 flex gap-4 items-start hover:shadow-md transition-shadow group"
              >
                <span className="text-2xl shrink-0" aria-hidden="true">{r.icon}</span>
                <div>
                  <p className="font-bold text-navy-900 text-sm group-hover:text-gold transition-colors">{r.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{r.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 1: Constructions — Split-Screen UI ────────────────────── */}
      <section id="sec-constructions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Section 01</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Shorts Fabric Constructions — Seven Build Options
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
              No other woven garment category spans as wide a GSM range as shorts. From 130 GSM nylon swim to 280 GSM canvas utility — select your construction on the left to explore the full specification.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            {/* Left panel — selector */}
            <div className="lg:w-64 xl:w-72 bg-[#080E1A] flex flex-col">
              {CONSTRUCTIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConstruction(c.id)}
                  className={`flex items-center gap-3 px-5 py-4 text-left transition-colors border-b border-white/5 last:border-0 ${
                    activeConstruction === c.id
                      ? "bg-gold/10 border-l-2 border-l-gold"
                      : "hover:bg-white/5"
                  }`}
                >
                  <span className="text-xl shrink-0" aria-hidden="true">{c.icon}</span>
                  <div>
                    <p className={`text-sm font-semibold ${activeConstruction === c.id ? "text-gold" : "text-white"}`}>
                      {c.name}
                    </p>
                    <p className="text-[10px] text-gray-500 font-mono">{c.gsm}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right panel — detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCon.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28 }}
                className="flex-1 bg-white p-8 lg:p-10"
              >
                <div className="flex flex-wrap items-start gap-3 mb-6">
                  <span className="text-3xl" aria-hidden="true">{activeCon.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-navy-900">{activeCon.name}</h3>
                      <span className="text-[10px] font-semibold bg-gold/10 text-gold rounded-full px-2 py-0.5">
                        {activeCon.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-mono">{activeCon.gsm} · {activeCon.hand}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-8">{activeCon.detail}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-navy-900 uppercase tracking-wider mb-2">Best For</p>
                    <ul className="space-y-1">
                      {activeCon.best.map((b) => (
                        <li key={b} className="text-sm text-gray-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-gold rounded-full shrink-0" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-900 uppercase tracking-wider mb-2">Key Markets</p>
                    <ul className="space-y-1">
                      {activeCon.markets.map((m) => (
                        <li key={m} className="text-sm text-gray-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-teal-500 rounded-full shrink-0" aria-hidden="true" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-900 uppercase tracking-wider mb-2">Decoration Options</p>
                    <ul className="space-y-1">
                      {activeCon.decorations.map((d) => (
                        <li key={d} className="text-sm text-gray-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full shrink-0" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <BackToTop />
        </div>
      </section>

      {/* ── Section 2: Fit Profiles — Minimal UI ─────────────────────────── */}
      <section id="sec-fits" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Section 02</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Fit Profiles for Shorts Programmes
            </h2>
            <p className="text-gray-500 text-sm">Inseam and waist range are the defining specification variables for shorts. All fits are supported across all constructions.</p>
          </div>

          <div className="space-y-0 divide-y divide-gray-100 border-t border-b border-gray-200">
            {FIT_PROFILES.map((fit, i) => (
              <motion.div
                key={fit.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-8"
              >
                <div className="flex items-center gap-4 sm:w-56 shrink-0">
                  <span className="text-2xl" aria-hidden="true">{fit.icon}</span>
                  <div>
                    <p className="font-bold text-navy-900 text-base">{fit.name}</p>
                    <p className="text-xs text-gray-400 font-mono">Waist {fit.waist} · Inseam {fit.inseam}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed mb-1">{fit.description}</p>
                  <p className="text-xs text-gray-400">{fit.markets}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Custom inseam grading across size runs is supported on all programmes. Specify your target inseam in your tech pack or enquiry.
            </p>
          </div>

          <BackToTop />
        </div>
      </section>

      {/* ── Section 3: GSM & Weight — Glassmorphism ──────────────────────── */}
      <section id="sec-gsm" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-700 to-emerald-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Section 03</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Fabric Weight Guide for Shorts — 160 to 280 GSM
            </h2>
            <p className="text-white/70 text-sm max-w-xl mx-auto">
              Shorts span the broadest weight range of all woven garment categories. Construction drives the GSM — not the other way around.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {GSM_WEIGHTS.map((w, i) => (
              <motion.div
                key={w.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
              >
                <p className="text-2xl font-bold text-white mb-1">{w.label}</p>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">{w.name}</p>
                <div className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold ${w.color} mb-3`}>
                  {w.use}
                </div>
                <p className="text-white/60 text-xs">{w.markets}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
            <p className="text-white font-semibold mb-2">GSM out of range? Custom weights available.</p>
            <p className="text-white/70 text-sm">
              Nylon swim programmes can source as low as 110–130 GSM. Heavy canvas utility shorts go up to 300 GSM. Specify your target GSM in the RFQ and we will confirm mill capability.
            </p>
          </div>

          <BackToTop dark />
        </div>
      </section>

      {/* ── Section 4: Decoration & Print — Product Showcase UI ──────────── */}
      <section id="sec-decoration" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Section 04</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Print &amp; Decoration Options for Shorts
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              From discreet embroidered thigh logos to all-over sublimation on swim shorts — every decoration technique is supported across the construction range.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DECORATION_OPTIONS.map((d, i) => (
              <motion.div
                key={d.type}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group relative bg-gray-50 rounded-2xl p-6 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/5 to-transparent rounded-bl-full" />
                <span className="text-3xl block mb-4" aria-hidden="true">{d.icon}</span>
                <h3 className="font-bold text-navy-900 text-base mb-2 group-hover:text-gold transition-colors">{d.type}</h3>
                <p className="text-xs text-gold font-semibold mb-3">{d.best}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Placement Options</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.placements.map((pl) => (
                      <span key={pl} className="text-[10px] bg-white border border-gray-200 rounded-full px-2 py-0.5 text-gray-600">
                        {pl}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <BackToTop />
        </div>
      </section>

      {/* ── Section 5: Colours — Maximalist UI ───────────────────────────── */}
      <section id="sec-colours" className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Section 05</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Colour &amp; Dye Options
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Seven colour families across the full construction range. Pantone matching, lab dip approval and garment dye available to specification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {COLOUR_FAMILIES.map((family, i) => (
              <motion.div
                key={family.name}
                initial={{ opacity: 0, rotate: -1 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl" aria-hidden="true">{family.icon}</span>
                  <p className="font-bold text-white text-sm">{family.name}</p>
                </div>
                <div className="space-y-2">
                  {family.shades.map((shade) => (
                    <div key={shade} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gold/60 shrink-0" />
                      <p className="text-gray-400 text-xs">{shade}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-3">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Dye Technologies Available</p>
            </div>
            {DYE_OPTIONS.map((dye) => (
              <div key={dye.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white font-semibold text-sm mb-1">{dye.label}</p>
                <p className="text-gray-500 text-xs">{dye.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gold/10 border border-gold/20 rounded-xl p-4 text-center">
            <p className="text-gold text-sm font-semibold">Pantone Matching Standard</p>
            <p className="text-white/60 text-xs mt-1">All colour development is against the Pantone TCX (textile) scale. Lab dip rounds typically 2–3 approvals to sign-off.</p>
          </div>

          <BackToTop dark />
        </div>
      </section>

      {/* ── Section 6: OEM — Bento UI ─────────────────────────────────────── */}
      <section id="sec-oem" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Section 06</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              OEM Custom Development for Shorts
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              Every programme is built to your exact inseam, waist range, construction and labelling spec. No off-the-shelf modifications — we start from your brief.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OEM_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold/30 hover:shadow-md transition-all"
              >
                <span className="text-3xl block mb-4" aria-hidden="true">{f.icon}</span>
                <h3 className="font-bold text-navy-900 text-base mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 bg-navy-900 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-3">Ready to Start a Shorts Programme?</h3>
            <p className="text-gray-300 text-sm mb-6 max-w-lg mx-auto">
              Submit construction type, inseam range, target GSM, certifications and destination — we confirm feasibility and factory match within 24–48 hours.
            </p>
            <Link
              href="/rfq/"
              className="inline-flex items-center gap-2 bg-gold text-navy-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors text-sm"
            >
              Submit Your Specifications →
            </Link>
          </div>

          <BackToTop />
        </div>
      </section>

      {/* ── Section 7: Markets — Dark Mode UI ────────────────────────────── */}
      <section id="sec-markets" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Section 07</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Export Markets — USA, UK, Europe &amp; Beyond
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              35+ countries served from Karachi. Each region has distinct construction preferences — we align factory selection to your destination market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MARKETS.map((m, i) => (
              <motion.div
                key={m.region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-colors shadow-lg ${m.glow}`}
              >
                <span className="text-3xl block mb-3" aria-hidden="true">{m.icon}</span>
                <h3 className="font-bold text-white text-base mb-1">{m.region}</h3>
                <p className="text-gray-400 text-xs mb-3 font-mono">{m.countries}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{m.notes}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: "35+", label: "Countries Served" },
              { value: "95%", label: "On-Time Delivery" },
              { value: "50+", label: "Vetted Factories" },
            ].map((s) => (
              <div key={s.label} className="bg-slate-800 rounded-xl p-5 text-center border border-slate-700">
                <p className="text-3xl font-bold text-gold">{s.value}</p>
                <p className="text-gray-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <BackToTop dark />
        </div>
      </section>

      {/* ── Section 8: Certifications — Card-Based UI ─────────────────────── */}
      <section id="sec-certs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Section 08</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Certifications Available for Shorts Programmes
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              10+ certifications across our factory network. All programmes carry OEKO-TEX as the baseline. Additional certifications selected to match your destination market requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-gold/40 hover:shadow-md transition-all text-center"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-xs font-bold text-navy-900">{cert.name}</span>
                </div>
                <p className="text-xs font-semibold text-navy-900 mb-1">{cert.full}</p>
                <p className="text-[10px] text-gray-500 leading-snug">{cert.use}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 bg-gray-50 rounded-2xl p-6 text-center">
            <p className="text-navy-900 font-semibold mb-2">Not sure which certifications your buyer requires?</p>
            <p className="text-gray-600 text-sm mb-4 max-w-lg mx-auto">
              Provide your buyer&apos;s destination country and we will recommend the appropriate certification set at enquiry stage.
            </p>
            <Link href="/rfq/" className="inline-flex items-center gap-2 bg-gold text-navy-900 font-bold px-6 py-2.5 rounded-full hover:bg-yellow-400 transition-colors text-sm">
              Enquire About Certifications →
            </Link>
          </div>

          <BackToTop />
        </div>
      </section>

      {/* ── Section 9: Export & Packaging — Flat Design UI ────────────────── */}
      <section id="sec-export" className="py-20 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Section 09</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Export Terms, Packing &amp; Lead Times
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Incoterms */}
            <div>
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Export Terms (Incoterms 2020)</h3>
              <div className="space-y-3">
                {INCOTERMS.map((t) => (
                  <div key={t.term} className="flex gap-4 bg-white rounded-xl border border-sky-100 p-4">
                    <div className="w-24 shrink-0">
                      <p className="text-xs font-bold text-navy-900">{t.term}</p>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Packing */}
            <div>
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Packing Options</h3>
              <div className="space-y-3">
                {PACK_OPTIONS.map((p) => (
                  <div key={p.label} className="flex gap-4 bg-white rounded-xl border border-sky-100 p-4 items-center">
                    <span className="text-xl shrink-0" aria-hidden="true">{p.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{p.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lead time table */}
          <div>
            <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Indicative Lead Times</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex gap-2 items-start">
              <span className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true">⚠</span>
              <p className="text-amber-800 text-xs">
                All timelines are indicative. Actual lead times depend on construction type, programme size, certification requirements and factory scheduling at the time of order confirmation.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-sky-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-navy-900 text-white">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-semibold">Phase</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold">Weeks</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold hidden md:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {LEAD_STAGES.map((ls, i) => (
                    <tr key={ls.phase} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-sky-50/40"}`}>
                      <td className="px-5 py-3 text-navy-900 font-medium text-sm">{ls.phase}</td>
                      <td className="px-5 py-3">
                        <span className="text-gold font-bold">{ls.weeks}</span>
                        <span className="text-gray-400 text-xs"> wks</span>
                      </td>
                      <td className="px-5 py-3 text-gray-500 text-xs hidden md:table-cell">{ls.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <BackToTop />
        </div>
      </section>

      {/* ── Section 10: Sustainability — Monochrome UI ────────────────────── */}
      <section id="sec-sustainability" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">Section 10</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
                Sustainable Sourcing Options
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Sustainable shorts sourcing is not a premium add-on — it is a standard programme option across all seven constructions. From organic cotton chino to GRS recycled nylon swim, certified sustainable credentials are available from enquiry stage.
              </p>
              <div className="space-y-5">
                {SUSTAINABILITY_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="flex gap-4 border-b border-gray-100 pb-5 last:border-0"
                  >
                    <span className="text-2xl shrink-0" aria-hidden="true">{item.icon}</span>
                    <div>
                      <p className="font-bold text-navy-900 text-sm mb-0.5">{item.label}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-black text-white rounded-2xl p-8">
                <p className="text-4xl font-bold mb-2">C0 DWR</p>
                <p className="text-gray-400 text-sm">Fluorocarbon-free water repellent finish available on all swim and outdoor shorts programmes — meets EU PFAS restrictions.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-2xl p-6">
                  <p className="text-2xl font-bold text-navy-900 mb-1">GOTS</p>
                  <p className="text-gray-500 text-xs">Organic cotton linen and jersey programmes</p>
                </div>
                <div className="bg-gray-100 rounded-2xl p-6">
                  <p className="text-2xl font-bold text-navy-900 mb-1">GRS</p>
                  <p className="text-gray-500 text-xs">Recycled nylon for swim and outdoor</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-6">
                <p className="text-sm font-semibold text-navy-900 mb-2">AZO-Free as Standard</p>
                <p className="text-gray-500 text-xs">All shorts programmes are AZO-free dye compliant. OEKO-TEX Standard 100 certification provides full chemical safety verification of the finished garment.</p>
              </div>
            </div>
          </div>

          <BackToTop />
        </div>
      </section>

      {/* ── Section 11: Sourcing Process — Material Design ───────────────── */}
      <section id="sec-process" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Section 11</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Sourcing Process — Enquiry to Shipment
            </h2>
            <p className="text-gray-600 text-sm max-w-lg mx-auto">
              Seven clearly defined stages from your first brief to cargo-ready at Karachi port. No hidden steps, no ambiguous handoffs.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 hidden sm:block" aria-hidden="true" />
            <div className="space-y-6">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative flex gap-5 sm:gap-8"
                >
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-gold flex items-center justify-center shadow-md">
                      <span className="text-xs font-bold text-navy-900">{step.num}</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex-1">
                    <h3 className="font-bold text-navy-900 text-base mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
            <span className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true">⚠</span>
            <p className="text-amber-800 text-xs leading-relaxed">
              All stage timelines shown are indicative. Actual durations vary with programme complexity, construction type and factory scheduling. Stage timelines are confirmed at order placement.
            </p>
          </div>

          <BackToTop />
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Frequently Asked</p>
            <h2 className="text-3xl font-bold text-navy-900">Shorts Sourcing — Common Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-navy-900 text-sm pr-4">{faq.q}</span>
                  <span className="text-gold font-bold shrink-0 text-lg" aria-hidden="true">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Same-tier Navigation ──────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Woven Garments</p>
            <h2 className="text-2xl font-bold text-navy-900">More Woven Garments</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Denim Jeans", desc: "Rigid, stretch, raw and recycled cotton denim. 8–14 oz. Six wash techniques.", href: "/apparel/wovengarments/denimjeans/", img: "/images/hero/hero-denim-jeans.webp", alt: "Pakistan denim jeans manufacturer — OEM rigid and stretch denim for fashion brands in USA, UK and Europe" },
              { name: "Formal & Casual Shirts", desc: "Poplin, oxford, twill and linen. Corporate, fashion and hospitality programmes.", href: "/apparel/wovengarments/formalcasualshirts/", img: "/images/hero/hero-formal-casual-shirts.webp", alt: "Pakistan formal and casual shirts manufacturer — OEM woven shirts for corporate and fashion brands worldwide" },
              { name: "Pants & Trousers", desc: "Twill, chino and stretch ponte. Business-casual to formal tailored programmes.", href: "/apparel/wovengarments/pantsandtrousers/", img: "/images/hero/hero-pants-trousers.webp", alt: "Pakistan pants and trousers manufacturer — OEM twill and chino trousers for fashion and workwear brands" },
              { name: "Cargo Pants", desc: "Ripstop, canvas and stretch ripstop. Tactical, outdoor and workwear programmes.", href: "/apparel/wovengarments/cargopants/", img: "/images/hero/hero-cargo-pants.webp", alt: "Pakistan cargo pants manufacturer — OEM ripstop and canvas cargo trousers for outdoor brands worldwide" },
            ].map((p) => (
              <Link href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image src={p.img} alt={p.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-bold text-white text-sm leading-tight mb-1">{p.name}</p>
                  <p className="text-gray-300 text-xs leading-relaxed mb-2">{p.desc}</p>
                  <span className="text-xs font-semibold text-gold transition-all duration-200">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0D1B2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Start Your Shorts Programme Today
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            From 5&quot; inseam athletic runners to 11&quot; canvas utility shorts — submit your construction, inseam range, incoterm and destination and we respond within 24–48 hours with factory match and feasibility confirmation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rfq/"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-bold px-8 py-3.5 rounded-full hover:bg-yellow-400 transition-colors text-sm"
            >
              Request a Quote →
            </Link>
            <Link
              href="/contact-us/"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
