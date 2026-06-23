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
            : "border-2 border-gold text-navy-900 hover:bg-gold shadow-xs"
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
    id: "ripstop",
    name: "Ripstop",
    badge: "Most Popular",
    gsm: "200–260 GSM",
    hand: "Lightweight yet tear-resistant — grid pattern reinforcement",
    best: ["Outdoor Brands", "Military-Style Fashion", "Workwear"],
    markets: ["USA", "UK", "EU", "Australia"],
    decorations: ["Embroidery", "Screen Print", "Heat Transfer"],
    detail:
      "Ripstop is the defining cargo pants construction — the grid-reinforced weave prevents tearing and ripping from spreading. Originally military fabric, it is now the primary construction for outdoor, adventure and fashion cargo programmes globally. Available in 100% nylon, 100% cotton and poly-cotton TC blends. Lighter than canvas at equivalent durability.",
    spec: "100% nylon, 100% cotton ripstop, or 65/35 TC poly-cotton ripstop. GSM 200–260. Grid reinforcement weave. DWR finish available.",
    durability: "High",
  },
  {
    id: "canvas",
    name: "Canvas (Heavy)",
    badge: "",
    gsm: "240–300 GSM",
    hand: "Dense, structured, maximum durability construction",
    best: ["Trade Workwear", "Construction", "Industrial"],
    markets: ["USA", "Canada", "Australia", "Germany"],
    decorations: ["Embroidery"],
    detail:
      "Heavy cotton canvas cargo pants for trade and industrial workwear programmes where maximum abrasion resistance is the primary specification. The densest construction in the cargo range — heavier than ripstop, designed for environments where durability, not weight, is the priority. Reinforced stitching at all stress points is standard.",
    spec: "100% cotton canvas or 65/35 TC. GSM 240–300. Reinforced stress points. DWR available.",
    durability: "Very High",
  },
  {
    id: "tc-poly-cotton",
    name: "TC Poly-Cotton",
    badge: "",
    gsm: "210–270 GSM",
    hand: "Balanced blend — cotton comfort with polyester durability",
    best: ["Multi-Purpose Workwear", "Uniform", "Military Adjacent"],
    markets: ["USA", "UK", "Australia", "Middle East"],
    decorations: ["Embroidery", "Screen Print"],
    detail:
      "TC (Tetoron-Cotton) poly-cotton is a versatile blend construction — typically 65% polyester / 35% cotton — delivering durability and wrinkle resistance from the polyester component with the comfort and breathability of cotton. Standard for uniform and workwear programmes requiring durability and easy-care performance at controlled unit cost.",
    spec: "65/35 poly-cotton TC. GSM 210–270. Wrinkle resistant. Anti-static finish available. OEKO-TEX Standard 100 compatible.",
    durability: "High",
  },
  {
    id: "nylon-poly-canvas",
    name: "Nylon / Poly Canvas",
    badge: "",
    gsm: "200–250 GSM",
    hand: "Lightweight, water-resistant, technical outdoor feel",
    best: ["Technical Outdoor", "Packable Programmes", "Adventure Brands"],
    markets: ["USA", "EU", "Japan", "Australia"],
    decorations: ["Screen Print", "Heat Transfer"],
    detail:
      "Nylon and poly canvas constructions for technical outdoor and adventure brand cargo programmes. Lighter than cotton ripstop for the same durability profile — ideal for packable and travel-oriented collections. DWR finish is standard on nylon variants. Popular in Japan and EU technical outdoor markets.",
    spec: "100% nylon or 100% polyester canvas. GSM 200–250. DWR standard. Anti-UV optional.",
    durability: "High",
  },
  {
    id: "stretch-ripstop",
    name: "Stretch Ripstop",
    badge: "Growing",
    gsm: "200–250 GSM",
    hand: "Ripstop durability with 4-way stretch freedom of movement",
    best: ["Performance Outdoor", "Tactical Fashion", "Athletic Cargo"],
    markets: ["USA", "EU", "Australia", "South Korea"],
    decorations: ["Heat Transfer", "Embroidery"],
    detail:
      "Stretch ripstop adds elastane (typically 4–8%) to the ripstop base fabric, delivering the tear resistance of ripstop with 4-way stretch for unrestricted movement. Growing rapidly in tactical-fashion crossover and performance outdoor segments. Popular in USA and EU athleisure-outdoor markets.",
    spec: "93/7 cotton-elastane or poly-cotton-spandex ripstop. GSM 200–250. 4-way stretch. DWR compatible.",
    durability: "High",
  },
  {
    id: "fr-cotton",
    name: "FR (Flame Retardant) Cotton",
    badge: "Specialist",
    gsm: "250–350 GSM",
    hand: "Heavy, structured — treated for flame retardancy",
    best: ["Industrial Safety", "Oil & Gas", "FR Workwear"],
    markets: ["USA", "Canada", "Middle East", "Australia"],
    decorations: ["Embroidery only"],
    detail:
      "FR-treated cotton cargo pants for industrial and hazardous environment workwear programmes. Meets NFPA 2112, EN ISO 11612 and ASTM F1506 flame resistance standards on request. Used in oil and gas, electrical utility, welding and chemical processing industries. Available in cotton FR and inherent FR Nomex-blend.",
    spec: "100% cotton FR treated or inherent FR Nomex blend. GSM 250–350. Meets NFPA 2112/EN 11612. Hi-vis reflective tape compatible.",
    durability: "Max",
  },
];

const FIT_PROFILES = [
  { code: "REG", name: "Regular Fit", ease: "Straight leg, standard rise — classic cargo silhouette", market: "Workwear, general trade, USA mainstream outdoor retail" },
  { code: "RLX", name: "Relaxed Fit", ease: "Generous thigh and leg for maximum movement", market: "Trade workwear, outdoor fieldwork, utility programmes" },
  { code: "TPR", name: "Slim / Tactical", ease: "Tapered leg, mid-rise — fashion tactical silhouette", market: "Fashion cargo, tactical-crossover, USA/EU contemporary" },
];

const GSM_TIERS = [
  { gsm: "200–230", name: "Lightweight / Performance", season: "Multi-Season Outdoor", market: "Adventure brands · Technical outdoor · Travel programmes", pct: 35, featured: false, desc: "Nylon and stretch ripstop at this weight prioritise packability and movement over durability. Primary choice for adventure travel and performance outdoor programmes.", color: "bg-teal-400" },
  { gsm: "230–260", name: "Standard Commercial", season: "Year-Round", market: "USA · UK · EU · Australia outdoor and workwear retail", pct: 70, featured: true, desc: "Cotton and TC ripstop at this weight delivers the commercial balance of durability, comfort and DWR finish performance across all major cargo markets.", color: "bg-gold" },
  { gsm: "260–300+", name: "Heavy Duty", season: "Workwear / Industrial", market: "USA workwear · Canada trade · Industrial sectors", pct: 45, featured: false, desc: "Canvas and FR cotton at this weight for maximum durability. Required for trade workwear, industrial safety and heavy-duty outdoor programmes.", color: "bg-neutral-600" },
];

const DECO_METHODS = [
  { code: "EMB", method: "Embroidery", best: "Brand marks, logo, chest or knee placement — all non-stretch constructions", compat: ["Ripstop", "Canvas", "TC Poly-Cotton", "FR Cotton"], note: "High-density embroidery may require backing on lightweight ripstop variants" },
  { code: "SCR", method: "Screen Print", best: "Bold graphics, brand artwork — ripstop, TC and canvas constructions", compat: ["Ripstop", "TC Poly-Cotton", "Nylon Canvas"], note: "Discharge printing not compatible with FR treatments; use plastisol on FR fabrics" },
  { code: "HT", method: "Heat Transfer", best: "Logo marks, reflective tape placement — stretch ripstop and nylon", compat: ["Stretch Ripstop", "Nylon Canvas"], note: "Reflective heat transfer tape available for hi-vis and safety marking" },
  { code: "RFT", method: "Reflective Tape", best: "Safety marking, hi-vis identification on workwear and FR programmes", compat: ["All Constructions"], note: "EN ISO 13688 compliant reflective tape available for EU workwear standards" },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Solid / PMS Matched", note: "Khaki, olive, stone, black, navy, grey — full PMS range on cotton constructions. Lab dip approval before bulk.", swatches: ["bg-yellow-700", "bg-green-800", "bg-stone-400", "bg-gray-900", "bg-slate-800"] },
  { name: "Yarn-Dyed / Camo Print", subtitle: "Camouflage & Tactical", note: "DPM, Multicam, ACU and custom camo patterns. Yarn-dyed or printed camo on ripstop base.", swatches: ["bg-green-700", "bg-amber-700", "bg-green-900", "bg-stone-500", "bg-slate-600"] },
  { name: "Pigment Dye", subtitle: "Vintage / Washed", note: "Pigment dyeing produces a worn, vintage appearance popular in fashion cargo programmes. Compatible with cotton and TC.", swatches: ["bg-stone-300", "bg-amber-200", "bg-slate-300", "bg-neutral-300", "bg-yellow-200"] },
  { name: "Hi-Vis Fluorescent", subtitle: "Safety / Visibility", note: "Fluorescent yellow, orange and lime for workwear safety programmes. EN 471 / ANSI 107 compatible.", swatches: ["bg-yellow-400", "bg-orange-500", "bg-lime-400", "bg-red-500", "bg-white border border-gray-200"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic cotton ripstop programmes with full supply chain certification", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — key EU/UK compliance standard for cargo pants", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — labour standards at factory level", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, safety and environment data sharing across the supply chain", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality across all cargo pants constructions", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled polyester content verification for TC and nylon blends", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance for woven garment factories", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Sustainable cotton practices for cotton-based cargo constructions", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "Most demanding social certification — wages, rights and conditions audited", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency in dyeing and finishing", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Fabric Construction to Spec", desc: "Six constructions — ripstop, canvas, TC, nylon, stretch ripstop, FR — sourced to your exact GSM, blend and weave specification from certified Pakistan factories." },
  { num: "02", title: "Pocket Engineering", desc: "Cargo pocket size, position, closure (snap, zip, Velcro), bellows depth and flap design — any pocket configuration per your technical specification." },
  { num: "03", title: "Performance Finish Programme", desc: "DWR water repellent, anti-static, soil release, anti-UV and FR treatment — applied to the correct construction for your end-use environment." },
  { num: "04", title: "Hardware & Closure Spec", desc: "YKK or equivalent zips, branded snap buttons, D-rings, webbing belt loops, Velcro panels — any hardware configuration to your specification." },
  { num: "05", title: "Hi-Vis & Safety Integration", desc: "EN ISO 13688 and ANSI 107 compliant reflective tape placement. FR treatment programmes. Hi-vis fluorescent fabric integration on workwear constructions." },
  { num: "06", title: "Brand Label Programme", desc: "Woven waistband label, care and content label, hang tag, reflective badge — full label programme developed to your artwork and standard." },
];

const SECTORS = [
  { abbr: "OD", name: "Outdoor & Adventure", detail: "Technical outdoor brands, expedition equipment and adventure lifestyle brands", market: "USA · EU · Australia · Japan" },
  { abbr: "TF", name: "Tactical / Fashion", detail: "Military-aesthetic fashion brands and tactical-crossover contemporary collections", market: "USA · EU · South Korea" },
  { abbr: "WK", name: "Trade Workwear", detail: "Construction, landscaping, plumbing and industrial trade workwear programmes", market: "USA · Canada · Australia · UK" },
  { abbr: "IN", name: "Industrial Safety", detail: "Oil &amp; gas, utilities, welding — FR and hi-vis safety cargo programmes", market: "USA · Canada · Middle East" },
  { abbr: "UN", name: "Uniform / Military Adjacent", detail: "Government, military-adjacent and security uniform programmes", market: "USA · EU · Middle East · SE Asia" },
  { abbr: "FA", name: "Fashion Cargo", detail: "Fashion brand cargo collections — urban, streetwear and contemporary styling", market: "USA · EU · South Korea" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Covers goods to port of loading." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange freight. Buyer arranges marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory gate." },
];

const PACK_OPTIONS = [
  { icon: "👖", label: "Individual Polybag (folded)", note: "Standard bulk export" },
  { icon: "🪝", label: "Hanger + Polybag", note: "Retail-ready on arrival" },
  { icon: "📦", label: "Flat Fold (bulk export)", note: "Volume-optimised" },
  { icon: "🎁", label: "Retail Box", note: "Premium positioning" },
  { icon: "🔒", label: "Vacuum Packed", note: "Space-efficient shipping" },
  { icon: "✏️", label: "Custom Packaging", note: "To your brand brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory shortlist, construction and finish confirmed with pricing", color: "bg-gold" },
  { stage: "Sample Production", days: "15–20", desc: "Pre-production sample with pockets, hardware and finish to spec", color: "bg-teal-500" },
  { stage: "Bulk Production", days: "45–65", desc: "From confirmed PO and approved pre-production sample", color: "bg-blue-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Measurement, pocket spec, seam and finish inspection", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "18–28", desc: "FCL/LCL from Karachi or Port Qasim to destination", color: "bg-neutral-600" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "♻️", title: "Recycled Polyester", desc: "GRS-certified recycled polyester available for TC poly-cotton and nylon cargo constructions — same performance, lower carbon footprint.", tag: "GRS" },
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton ripstop available for brands requiring organic fibre verification on cargo programmes.", tag: "GOTS" },
  { icon: "💧", title: "PFC-Free DWR", desc: "Non-fluorinated (PFAS-free) DWR finish available for EU REACH compliance — equal water-repellent performance without restricted chemistry.", tag: "Process" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 certified factories. Labour standards, wages and worker safety independently verified at every factory.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "OEKO-TEX Chemistry", desc: "All dyes and finishes OEKO-TEX Standard 100 certified. No restricted substances in fabric, dye or DWR treatment.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Reduced Packaging", desc: "Flat-fold bulk export minimises packaging material. Recycled polybag and FSC-certified hang tag options available on request.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction, GSM, pocket configuration, hardware, finish type, size range, quantity, destination and target delivery date." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We shortlist 2–3 Pakistan factories with your required construction capability and certifications. Pricing in 3–5 working days." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Pre-production sample with all pockets, hardware and finish executed. 15–20 days from specification lock." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review pocket construction, hardware, finish and fit. Revise as required before purchase order placement." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Fabric cut, sewn and finished. Duration depends on construction, pocket complexity and factory scheduling." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pocket spec, seam strength, measurement audit and packing verification. FCL or LCL from Karachi or Port Qasim." },
];

const FAQS = [
  { q: "What is the best cargo pants construction for outdoor and adventure brands?", a: "Ripstop is the primary construction for outdoor and adventure programmes — the grid-reinforced weave prevents tear propagation without adding significant weight. For packable and travel-oriented collections, lightweight nylon canvas (200–230 GSM) with DWR finish is the correct choice. Stretch ripstop (200–250 GSM) is growing rapidly in the performance-outdoor and tactical-fashion crossover segment where freedom of movement is as important as durability." },
  { q: "What finishes are available for water resistance on cargo pants?", a: "DWR (Durable Water Repellent) is the standard water-repellent finish for cargo pants. Fluorinated DWR (C6 based) is the most durable but is being phased out in EU markets under REACH regulation. Non-fluorinated (PFAS-free) DWR is now available at comparable performance — strongly recommended for EU-market programmes. For industrial workwear requiring waterproofing beyond DWR, PU-coated nylon canvas is the appropriate construction." },
  { q: "Can I get FR (flame retardant) cargo pants from Pakistan for industrial safety programmes?", a: "Yes. FR-treated cotton and inherent-FR Nomex-blend cargo pants are available for industrial safety programmes. Treated FR cotton meets NFPA 2112 and EN ISO 11612 standards on request. Inherent FR provides higher-performance protection where standard FR treatment is insufficient. Specify your required standard (NFPA, EN ISO or ASTM) and end-use environment in your RFQ to ensure correct fabric selection and certification." },
  { q: "What pocket configurations are available for OEM cargo programmes?", a: "Cargo pocket configuration is fully OEM-customisable. Specify pocket count, size, position (thigh, knee, rear, coin), closure type (snap button, zip, Velcro, bellows open), flap style and depth. Multi-pocket programmes (6–8 pockets) are common for workwear; cleaner 4-pocket configurations for fashion cargo. Technical packs accepted — any configuration achievable from your specification." },
  { q: "Which GSM is standard for fashion cargo programmes versus trade workwear?", a: "Fashion cargo programmes typically specify 200–240 GSM cotton or TC ripstop — lightweight enough for comfort but providing the structured look expected in tactical fashion. Trade workwear requires 240–300 GSM canvas or heavy TC for durability in demanding environments. FR cargo for industrial safety typically runs 250–350 GSM to meet flame resistance standards. Specify your end-use environment in your RFQ and we align GSM to your performance requirements." },
  { q: "What order quantities are typical for cargo pants programmes?", a: "Cargo pants programme quantities vary depending on construction, number of colourways, pocket specification complexity and factory capacity. Standard commercial ripstop and TC construction programmes are achievable at moderate order quantities. FR and specialty constructions typically require larger programme sizes due to fabric minimums. Include your target quantity and size breakdown in your RFQ — we will advise on the optimal quantity structure for your construction and certification requirements." },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function CargoPantsContent() {
  const [activeConstruction, setActiveConstruction] = useState("ripstop");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* ════════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-cargo-pants.webp"
            fill
            alt="Pakistan cargo pants manufacturer — OEM ripstop and canvas cargo pants for outdoor, tactical and workwear brands in USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/apparel/wovengarments/" className="hover:text-gold transition-colors">Woven Garments</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Cargo Pants</span>
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
              Cargo Pants
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
              MZ Global Trading sources custom cargo pants from Pakistan&rsquo;s
              certified woven factories. Ripstop, canvas, TC poly-cotton and
              stretch ripstop. 200&ndash;300 GSM. DWR, anti-static and
              soil-release finishes. OEKO-TEX, BSCI, Sedex certified. FOB /
              CIF export.
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          STATS ANCHOR
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Cargo Pants Supply &mdash; Pakistan Woven Garment
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Technical Cargo Programmes Across Six Fabric Builds
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s woven garment sector produces cargo pants for outdoor,
                tactical, workwear and fashion markets. Certified factories, performance
                finishes, verified quality on every programme.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "6", label: "Fabric Builds" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/rfq/"
              className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit"
            >
              Request a Quote <span aria-hidden="true">&#8594;</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          BENTO GRID
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* ROW 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bento 1 — Constructions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-neutral-50 border border-neutral-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🪖</span>
                <div>
                  <p className="text-neutral-600 text-xs font-semibold tracking-[0.2em] uppercase">Technical</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-neutral-200">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.gsm}</p>
                    <p className="text-xs text-neutral-600 mt-1 leading-tight">{c.best[0]}</p>
                    {c.badge && (
                      <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                        {c.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            {/* Bento 2 — Fits */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-stone-50 border border-stone-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-stone-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fit Profiles &amp; Sizing</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {FIT_PROFILES.map((f) => (
                  <div key={f.code} className="bg-white rounded-xl px-4 py-3.5 border border-stone-100 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-stone-100 text-stone-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {f.code}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{f.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{f.ease}</p>
                      <p className="text-xs text-stone-600 mt-0.5">{f.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-fits" label="Explore Fit Profiles" />
            </motion.div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Bento 3 — Weight */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-amber-700 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Weight Selection</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-xl p-3 border border-amber-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-navy-900">{t.gsm}</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] font-semibold text-amber-700">{t.season}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{t.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View Weight Guide" />
            </motion.div>

            {/* Bento 4 — Decoration */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🖨️</span>
              <p className="text-zinc-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Decoration Methods</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-zinc-100">
                    <span className="w-6 h-6 rounded bg-zinc-100 text-zinc-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{d.code}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{d.compat[0]}{d.compat.length > 1 ? ` +${d.compat.length - 1}` : ""}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decorations" />
            </motion.div>

            {/* Bento 5 — Colours */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-3 border border-slate-100">
                    <p className="text-xs font-semibold text-navy-900 mb-1.5">{d.name}</p>
                    <div className="flex gap-1.5 mb-1">
                      {d.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${s}`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-500">{d.subtitle}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colors" label="Explore Colors" />
            </motion.div>

            {/* Bento 6 — OEM */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM &amp; Custom Programs</h3>
              <div className="flex flex-col gap-2 flex-1">
                {OEM_FEATURES.slice(0, 5).map((f) => (
                  <div key={f.num} className="flex items-start gap-2">
                    <span className="text-gold text-xs font-bold mt-0.5 shrink-0">{f.num}</span>
                    <p className="text-xs text-gray-600 leading-snug">{f.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore OEM" />
            </motion.div>
          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            {/* Bento 7 — Markets */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-xs font-bold text-teal-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Markets" />
            </motion.div>

            {/* Bento 8 — Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Quality Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-xl border border-green-100 flex items-center justify-center p-2" style={{ height: 56 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={72} height={44} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            {/* Bento 9 — Export */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-blue-100">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{e.full}</p>
                      <p className="text-[10px] text-gray-500">{e.port}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* ROW 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bento 10 — Sustainability */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌿</span>
                <div>
                  <p className="text-lime-700 text-xs font-semibold tracking-[0.2em] uppercase">Ethics</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Sustainable Sourcing</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {SUSTAINABILITY_ITEMS.map((s) => (
                  <div key={s.title} className="bg-white rounded-xl p-3 border border-lime-100 flex flex-col gap-1">
                    <span className="text-base" aria-hidden="true">{s.icon}</span>
                    <p className="text-sm font-semibold text-navy-900">{s.title}</p>
                    <span className="text-[10px] font-semibold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full w-fit">{s.tag}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            {/* Bento 11 — Process */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-red-50 border border-red-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-red-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.short}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-500 mt-1 pl-8">+ 2 more steps</p>
              </div>
              <ExploreBtn sectionId="section-process" label="View Our Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          RESOURCES ROW
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link prefetch={false} href="/knowledge/cargo-pants-construction-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Cargo Pants Construction Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Pocket placement, fabric and durability standards for B2B procurement managers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link prefetch={false} href="/guides/sourcing-cargo-pants-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Cargo Pants Sourcing Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Workwear grade, fabric, custom options and certification for international buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guide →</span>
            </Link>
            <Link prefetch={false} href="/downloads/cargo-pants-spec-template/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Cargo Pants Spec Template</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fill-in specification template for cargo pants sourcing from Pakistan.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Template →</span>
            </Link>
            <Link prefetch={false} href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Cargo Pants?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, GSM and finish confirmed — RFQ takes 3 minutes. Factory match and quotation returned within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — CONSTRUCTIONS — TECHNICAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" style={{ backgroundColor: "#0E1420" }} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-12">
            <div className="w-px h-16 bg-teal-400/40 mt-1 hidden sm:block" aria-hidden="true" />
            <div>
              <p className="font-mono text-teal-400/70 text-xs tracking-[0.3em] uppercase mb-2">[TECHNICAL SPECIFICATION — CARGO CONSTRUCTIONS]</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Fabric Constructions</h2>
              <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
                Cargo pants performance starts with fabric construction. Each build has distinct durability profile, finish compatibility and end-use application.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeConstruction === c.id}
                onClick={() => setActiveConstruction(c.id)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeConstruction === c.id
                    ? "bg-teal-400 text-navy-900 border-teal-400"
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-teal-400/40"
                }`}
              >
                {activeConstruction !== c.id && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400" />
                  </span>
                )}
                {c.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeConstruction}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-white">{ac.name}</h3>
                  {ac.badge && (
                    <span className="text-xs font-semibold text-teal-400 bg-teal-400/15 px-3 py-1 rounded-full border border-teal-400/30">{ac.badge}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">GSM_RANGE</p>
                    <p className="text-lg font-bold text-teal-400">{ac.gsm}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">DURABILITY</p>
                    <p className="text-lg font-bold text-white">{ac.durability}</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">HAND_FEEL</p>
                  <p className="text-sm text-gray-300">{ac.hand}</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{ac.detail}</p>
                <div className="border border-white/10 rounded-xl p-4">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">TECHNICAL_SPEC</p>
                  <p className="text-sm text-gray-300">{ac.spec}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">BEST_FOR[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.best.map((b) => (
                      <span key={b} className="text-xs text-white bg-white/10 px-3 py-1 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">KEY_MARKETS[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => (
                      <span key={m} className="text-xs text-teal-400 bg-teal-400/10 border border-teal-400/20 px-3 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">DECORATION[ ]</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.decorations.map((d) => (
                      <div key={d} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-300">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — FIT PROFILES — GRID UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-fits" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sizing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Fit Profiles &amp; Sizing</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Cargo pants are ordered across three primary silhouettes. Each targets a distinct end use and buyer segment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 bg-white border border-gray-200 rounded-2xl overflow-hidden">
            {FIT_PROFILES.map((f, i) => (
              <motion.div
                key={f.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8 flex flex-col items-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-navy-900">{f.code}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{f.name}</h3>
                  <p className="text-sm text-gold font-semibold mb-2">{f.ease}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.market}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-3 gap-8 text-center">
            {[["XS–3XL", "Standard size range"], ["US / UK / EU", "Size standards"], ["Custom", "Size spec accepted"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl sm:text-3xl font-bold text-navy-900">{val}</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — WEIGHT GUIDE — DASHBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-gsm" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Guide</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Fabric Weight Guide</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            GSM determines end-use performance, finish compatibility and market positioning for cargo programmes.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "GSM Range", val: "200–300+", sub: "Full construction range" },
              { label: "Commercial Standard", val: "230–260", sub: "Ripstop and TC" },
              { label: "Workwear Min.", val: "240 GSM", sub: "Canvas and heavy TC" },
              { label: "FR Min.", val: "250 GSM", sub: "For FR treatment" },
            ].map((m) => (
              <div key={m.label} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-navy-900">{m.val}</p>
                <p className="text-xs text-gray-500 mt-1">{m.sub}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {GSM_TIERS.map((tier) => (
              <div key={tier.gsm} className={`bg-white rounded-2xl p-7 border-2 ${tier.featured ? "border-gold shadow-lg" : "border-gray-100 shadow-xs"}`}>
                {tier.featured && (
                  <span className="inline-block mb-3 text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>
                )}
                <p className={`text-3xl font-bold mb-1 ${tier.featured ? "text-gold" : "text-navy-900"}`}>{tier.gsm}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{tier.name}</p>
                <p className="text-sm font-semibold text-navy-900 mb-3">{tier.season}</p>
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${tier.featured ? "bg-gold" : "bg-navy-900/30"}`} style={{ width: `${tier.pct}%` }} aria-hidden="true" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{tier.pct}% of orders</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tier.desc}</p>
                <p className="text-xs text-gold font-semibold mt-3">{tier.market}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-bold text-navy-900 mb-4">End-Use Weight Guide</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-gray-500 font-semibold text-xs">End Use</th>
                    <th className="text-left py-2 pr-4 text-gray-500 font-semibold text-xs">Recommended GSM</th>
                    <th className="text-left py-2 text-gray-500 font-semibold text-xs">Construction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Fashion / Tactical Fashion", "200–240", "Cotton Ripstop / TC Ripstop"],
                    ["Outdoor / Adventure", "200–250", "Nylon Canvas / Stretch Ripstop"],
                    ["Trade Workwear", "240–280", "TC Poly-Cotton / Canvas"],
                    ["Industrial / Heavy Duty", "260–300+", "Heavy Canvas"],
                    ["Safety / FR Programmes", "250–350", "FR Cotton / Nomex Blend"],
                  ].map(([use, gsm, construction]) => (
                    <tr key={use}>
                      <td className="py-2.5 pr-4 text-navy-900 font-medium text-xs">{use}</td>
                      <td className="py-2.5 pr-4 text-gold font-bold text-xs">{gsm}</td>
                      <td className="py-2.5 text-gray-500 text-xs">{construction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — DECORATION — FLAT DESIGN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-decoration" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Decoration</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Decoration Methods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DECO_METHODS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`rounded-2xl p-7 flex flex-col gap-4 ${
                  i === 0 ? "bg-teal-50" : i === 1 ? "bg-slate-50" : i === 2 ? "bg-stone-50" : "bg-amber-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy-900 flex items-center justify-center" style={{ borderRadius: 4 }}>
                    <span className="text-gold text-xs font-bold">{d.code}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-900">{d.method}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{d.best}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Compatible Constructions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.compat.map((c) => (
                      <span key={c} className="text-[11px] bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded">{c}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOURS — MONOCHROME UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-colors" style={{ backgroundColor: "#0D0D0D" }} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-teal-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Colour Programs</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            Cargo pants span tactical palettes to fashion-forward colourways. Full PMS matching on cotton constructions with lab dip approval before bulk.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-2">
                  {d.swatches.map((s, idx) => (
                    <div key={idx} className={`w-7 h-7 rounded-full border-2 border-white/10 ${s}`} aria-hidden="true" />
                  ))}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{d.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{d.subtitle}</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-gray-600 text-xs mb-3 uppercase tracking-wider">Tactical &amp; Fashion Palette — Illustrative</p>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
              {["bg-yellow-700", "bg-green-800", "bg-stone-400", "bg-gray-900", "bg-slate-700", "bg-gray-500", "bg-amber-800", "bg-neutral-600", "bg-green-900", "bg-stone-600", "bg-yellow-400", "bg-orange-500"].map((c, i) => (
                <div key={i} className={`h-10 rounded ${c} opacity-90`} aria-hidden="true" />
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-3 text-center">Illustrative palette — full PMS range available on cotton and TC constructions</p>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM & CUSTOM — CORPORATE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM &amp; Custom</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">OEM &amp; Custom Programs</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every cargo pants programme element can be specified to your requirements — construction, pocket engineering, performance finish, hardware and branding.
              </p>
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-800 transition-colors">
                Start Your Programme <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OEM_FEATURES.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="border border-gray-100 rounded-2xl p-6 hover:border-gold hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">{f.num}</span>
                    <h3 className="text-sm font-bold text-navy-900">{f.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKETS — DATA VISUALIZATION UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Markets</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Industry Applications</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            Cargo pants serve six distinct market segments — each with specific construction, finish and certification requirements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4 hover:border-gold hover:shadow-xs transition-all"
              >
                <div className="flex items-start justify-between">
                  <span className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 text-sm font-bold flex items-center justify-center shrink-0">{s.abbr}</span>
                  <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-3">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${60 + i * 5}%` }} aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900">{s.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.detail }} />
                </div>
                <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full w-fit">{s.market}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[["USA / Canada", "Primary Market"], ["UK / Europe", "Key Market"], ["Middle East", "Safety Workwear"], ["Australia / Japan", "Technical Outdoor"]].map(([region, tier]) => (
              <div key={region} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                <p className="text-navy-900 font-semibold text-sm">{region}</p>
                <p className="text-gold text-xs mt-1">{tier}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS — RETAIL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Quality Certifications</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Pakistan&rsquo;s certified woven garment factories carry internationally recognised certifications. Specify your required standard in your RFQ.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="rounded-2xl overflow-hidden border border-gray-100 hover:border-gold hover:shadow-xs transition-all flex flex-col"
              >
                <div className={`h-2 ${i % 5 === 0 ? "bg-green-500" : i % 5 === 1 ? "bg-blue-500" : i % 5 === 2 ? "bg-teal-500" : i % 5 === 3 ? "bg-gold" : "bg-purple-500"}`} />
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="h-10 flex items-center">
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={80} height={40} className="object-contain h-full w-auto" />
                  </div>
                  <p className="text-sm font-bold text-navy-900">{c.name}</p>
                  <p className="text-[11px] text-gray-500 leading-snug flex-1">{c.desc}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${
                    c.tier === "Premium" ? "bg-gold/15 text-gold" : c.tier === "Optional" ? "bg-gray-100 text-gray-500" : "bg-green-50 text-green-700"
                  }`}>{c.tier}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — EXPORT & PACKAGING — MODULAR UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export &amp; Packaging</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Export Terms &amp; Packaging</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Choose the Incoterm that aligns with your logistics setup. Packaging is programme-specified for your retail or distribution requirements.
          </p>
          <h3 className="text-lg font-bold text-navy-900 mb-4">Export Incoterms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {EXPORT_TERMS.map((e, i) => (
              <motion.div
                key={e.term}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center shrink-0">
                    <span className="text-gold text-sm font-bold">{e.term}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{e.term}</p>
                    <p className="text-xs text-gray-500">{e.full}</p>
                  </div>
                </div>
                <p className="text-xs text-gold font-semibold">📍 {e.port}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
          <h3 className="text-lg font-bold text-navy-900 mb-4">Packaging Options</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {PACK_OPTIONS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col items-center gap-2 text-center"
              >
                <span className="text-2xl" aria-hidden="true">{p.icon}</span>
                <p className="text-xs font-semibold text-navy-900 leading-snug">{p.label}</p>
                <p className="text-[10px] text-gray-500">{p.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <h3 className="text-lg font-bold text-navy-900">Indicative Programme Timeline</h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full w-fit">
              <span aria-hidden="true">ℹ️</span>
              Guide only — actual timelines vary
            </span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800 leading-relaxed">
            <strong>Important:</strong> Durations shown are indicative guides based on typical programmes. Actual timelines depend on factory scheduling, fabric and finish sourcing, sample iterations, seasonal demand and Incoterm. Share your target delivery date in your RFQ for a specific assessment.
          </div>
          <div className="flex flex-col gap-3">
            {LEAD_STAGES.map((stage, i) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl ${stage.color} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy-900">{stage.stage}</p>
                  <p className="text-xs text-gray-500">{stage.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-navy-900">{stage.days}</p>
                  <p className="text-xs text-gray-500">days (guide)</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-5 bg-gray-100 border border-gray-200 rounded-xl p-4 text-sm text-gray-500">
            Indicative total programme duration: approximately 85–120 days from RFQ to departure port. Add sea freight time for your destination. These figures are for planning purposes only and are not a contractual commitment.
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — SCANDINAVIAN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" style={{ backgroundColor: "#F4F7F2" }} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#4a7c59" }}>
              Ethics &amp; Environment
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-5 leading-[1.1]">
              Sustainable<br />Cargo Sourcing
            </h2>
            <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: "#4a7c59" }} aria-hidden="true" />
            <p className="text-gray-500 text-lg leading-loose">
              International buyers across outdoor, workwear and fashion require verifiable sustainability credentials. Every cargo programme can be specified to your environmental and ethical standards.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {SUSTAINABILITY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-2xl border-2 flex items-center justify-center bg-white" style={{ borderColor: "rgba(74,124,89,0.2)" }}>
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-navy-900">{item.title}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(74,124,89,0.1)", color: "#4a7c59" }}>{item.tag}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-loose">{item.desc}</p>
                </div>
                <div className="w-8 h-px" style={{ backgroundColor: "rgba(74,124,89,0.3)" }} aria-hidden="true" />
              </motion.div>
            ))}
          </div>
          <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <Link prefetch={false} href="/rfq/" className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors" style={{ backgroundColor: "#4a7c59" }}>
              Request Certified Programme <span aria-hidden="true">→</span>
            </Link>
            <Link prefetch={false} href="/qualitycompliance/certifications/" className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 text-navy-900 hover:border-navy-900 transition-colors">
              View All Certifications
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — PROCESS — BRUTALIST UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t-4 border-black pt-8 mb-12">
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-gray-500 mb-2">MZ GLOBAL TRADING — SOURCING PROGRAMME</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900">Our Process</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xs leading-relaxed">Six structured steps from specification to shipment.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative border border-black p-8 flex gap-6 items-start"
                style={{ marginTop: i >= 2 ? -1 : 0, marginLeft: i % 2 === 1 ? -1 : 0 }}
              >
                <div className="shrink-0 relative">
                  <p className="text-7xl font-bold leading-none select-none" style={{ color: "#f3f4f6" }}>{step.num}</p>
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-black" aria-hidden="true" />
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">{step.short}</p>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 border-t-2 border-gold pt-8 flex flex-col sm:flex-row gap-5">
            <Link prefetch={false} href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-800 transition-colors">
              Begin Your Programme — Step 01 <span aria-hidden="true">→</span>
            </Link>
            <Link prefetch={false} href="/ourprocess/" className="inline-flex items-center gap-2 border border-gray-200 text-navy-900 font-semibold px-8 py-4 rounded-xl hover:border-navy-900 transition-colors">
              View Full Process Detail
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Cargo Pants FAQ</h2>
          <div className="divide-y divide-gray-200">
            {FAQS.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full text-left py-5 flex justify-between items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  aria-expanded={faqOpen === i}
                >
                  <span className="font-semibold text-navy-900 text-[15px] leading-snug">{item.q}</span>
                  <span className="relative shrink-0 mt-0.5">
                    {faqOpen !== i && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                      </span>
                    )}
                    <motion.span
                      animate={{ rotate: faqOpen === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gold text-xl font-light select-none inline-block"
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-gray-600 leading-relaxed text-[15px]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SAME-TIER NAVIGATION
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Woven Garments</p>
            <h2 className="text-2xl font-bold text-navy-900">More Woven Garments</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Denim Jeans", desc: "Rigid, stretch and recycled cotton denim. Stone, acid, enzyme and laser wash.", href: "/apparel/wovengarments/denimjeans/", img: "/images/hero/hero-denim-jeans.webp", alt: "Pakistan denim jeans manufacturer — OEM rigid and stretch denim for fashion brands in USA, UK and Europe" },
              { name: "Formal & Casual Shirts", desc: "Poplin, oxford, twill and linen. Corporate, fashion and hospitality programmes.", href: "/apparel/wovengarments/formalcasualshirts/", img: "/images/hero/hero-formal-casual-shirts.webp", alt: "Pakistan formal and casual shirts manufacturer — OEM poplin and oxford shirts for corporate and fashion brands" },
              { name: "Pants & Trousers", desc: "Twill chino, canvas, linen and ponte. Business-casual to formal trouser programmes.", href: "/apparel/wovengarments/pantsandtrousers/", img: "/images/hero/hero-pants-trousers.webp", alt: "Pakistan pants and trousers manufacturer — OEM chino and formal trousers for business and fashion brands" },
              { name: "Shorts", desc: "Chino, canvas, linen and nylon. Casual, athletic and resort programmes.", href: "/apparel/wovengarments/shorts/", img: "/images/hero/hero-shorts.webp", alt: "Pakistan shorts manufacturer — OEM chino and linen shorts for casual and resort wear brands worldwide" },
            ].map((p) => (
              <Link prefetch={false} href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow">
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

      {/* ════════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Start Your Programme</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-snug">
              Ready to Source Cargo Pants<br />from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Cargo pants from Pakistan&rsquo;s certified woven factories. Ripstop, canvas, TC,
              stretch ripstop or FR cotton &mdash; any construction, any finish. Submit the spec;
              we coordinate factory matching, sampling and bulk production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-9 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link prefetch={false} href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-9 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

