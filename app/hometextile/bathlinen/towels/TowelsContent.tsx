"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            ? "border border-gold/60 text-[#D4A017] hover:bg-gold hover:text-navy-900"
            : "border-2 border-gold text-navy-900 hover:bg-gold shadow-xs"
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

function ExploreBtn({ sectionId, label, light = false }: { sectionId: string; label: string; light?: boolean }) {
  return (
    <button
      onClick={() => scrollToId(sectionId)}
      className={`group self-start inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mt-auto pt-4 ${light ? "text-gold hover:text-yellow-300" : "text-navy-900 hover:text-gold"}`}
    >
      {label}
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">→</span>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  {
    id: "terry-loop",
    name: "Terry Loop",
    badge: "Most Ordered",
    gsm: "400–600 GSM",
    hand: "Classic looped pile, excellent absorbency, standard weight",
    best: ["Hotels & Hospitality", "Retail Chains", "OEM Programmes"],
    markets: ["USA", "UK", "EU", "Middle East", "Australia"],
    desc: "Terry loop is the global standard for bath towel production. The uncut loop pile creates maximum surface area for water absorption — the defining characteristic of all high-performance bath towels. Both sides of the fabric carry loops; pile height controls GSM and softness. This construction is the default specification for all hotel supply, hospitality and retail bath towel programmes worldwide.",
    spec: "100% combed ring-spun cotton or 100% combed open-end cotton. GSM 400–600. Loop height 3–5 mm. Reactive dyed. OEKO-TEX Standard 100 compliant.",
  },
  {
    id: "velour",
    name: "Velour / Sheared Terry",
    badge: "Premium",
    gsm: "400–550 GSM",
    hand: "Sheared face, velvet-soft surface, premium positioning",
    best: ["Luxury Hotels", "Spa Brands", "Premium Retail"],
    markets: ["USA", "UK", "EU", "Middle East", "Japan"],
    desc: "Velour towels are produced by shearing the loop pile on one or both faces to create a smooth, plush velvet-like surface. The sheared face has a distinctly luxurious hand-feel and prints with exceptional clarity for sublimation — making velour the preferred construction for beach towels, luxury hotel collections and high-end spa brands. Absorbency is slightly lower than terry loop due to the cut pile.",
    spec: "100% combed cotton. One-face or two-face sheared. GSM 400–550. Sublimation or reactive print compatible. OEKO-TEX Standard 100.",
  },
  {
    id: "zero-twist",
    name: "Zero Twist Terry",
    badge: "Soft / Luxury",
    gsm: "380–550 GSM",
    hand: "Extraordinary softness, looser yarn structure, premium hand-feel",
    best: ["Luxury Hotel Chains", "Premium Brand Retail", "Gift Collections"],
    markets: ["USA", "UK", "EU", "Japan", "South Korea"],
    desc: "Zero twist cotton uses untwisted yarn — producing the softest hand-feel of any towel construction while retaining strong absorbency. The loose fibre structure means first-wash softness is retained wash-after-wash, making zero twist the preferred construction for luxury hotel brands and premium retail gift sets. Slightly more delicate than standard ring-spun terry — specify care instructions accordingly.",
    spec: "100% zero-twist combed cotton yarn. GSM 380–550. Enhanced surface softness. GOTS and OEKO-TEX certified available.",
  },
  {
    id: "waffle",
    name: "Waffle / Honeycomb",
    badge: "Decorative",
    gsm: "180–300 GSM",
    hand: "Grid cell texture, lightweight, spa and gym positioning",
    best: ["Spa & Wellness", "Gym & Sports", "Kitchen Linen"],
    markets: ["USA", "UK", "EU", "Australia"],
    desc: "Waffle weave (honeycomb) towels are produced on a dobby or jacquard loom creating a distinctive raised grid cell pattern. The lightweight construction (180–300 GSM) makes waffle towels ideal for gym, spa and beach use where packability and quick-dry performance matter. The textured surface also provides light exfoliation — a key selling point for spa and wellness brands.",
    spec: "100% cotton. GSM 180–300. Grid cell depth 2–4 mm. Reactive dyed. Dobby or jacquard loom construction.",
  },
  {
    id: "jacquard",
    name: "Jacquard Terry",
    badge: "Patterned",
    gsm: "350–550 GSM",
    hand: "Woven-in pattern, structured surface, high-design positioning",
    best: ["Hotel Luxury", "Gift & Homeware", "Premium Retail"],
    markets: ["USA", "UK", "EU", "Middle East"],
    desc: "Jacquard terry towels are woven on a jacquard loom — the pattern (floral, geometric, branded) is woven directly into the fabric structure rather than printed. This produces a permanent, wash-proof design that does not degrade over time. Jacquard constructions command a premium price and are primarily used in luxury hotel collections, premium homeware retail and high-value branded gift sets.",
    spec: "100% combed cotton or cotton blend. GSM 350–550. Multi-colour woven pattern. Custom Jacquard design development available.",
  },
  {
    id: "dobby-border",
    name: "Dobby Border Terry",
    badge: "Classic",
    gsm: "400–600 GSM",
    hand: "Plain terry body, woven dobby border, classic presentation",
    best: ["Hotel Institutional", "Corporate Supply", "Healthcare"],
    markets: ["USA", "UK", "EU", "Middle East", "SE Asia"],
    desc: "Dobby border terry combines a standard terry loop body with a woven decorative border running along the short edges — and sometimes along all four sides. The border is produced on a dobby attachment during weaving. This construction is the most widely ordered for hotel institutional programmes, healthcare and corporate supply where a clean, professional border presentation is desired without the cost of full jacquard.",
    spec: "100% combed cotton or open-end cotton. GSM 400–600. Dobby border 2–10 cm width. Plain white or coloured border options.",
  },
];

const STANDARD_SIZES = [
  { name: "Face Towel", dims: "30 × 30 cm", code: "FT", note: "Daily face care, guest amenity packs", gsm: "400–500" },
  { name: "Guest Towel", dims: "30 × 50 cm", code: "GT", note: "Hotel guest turndown service", gsm: "400–500" },
  { name: "Hand Towel", dims: "40 × 70 cm", code: "HT", note: "Bathroom hand drying, retail sets", gsm: "450–550" },
  { name: "Bath Towel", dims: "70 × 140 cm", code: "BT", note: "Standard bath, USA/UK/EU retail", gsm: "500–600" },
  { name: "Bath Sheet", dims: "90 × 150 cm", code: "BS", note: "Premium hotel, luxury retail wrap", gsm: "550–650" },
  { name: "Gym Towel", dims: "50 × 100 cm", code: "GYM", note: "Sports clubs, gym, fitness retail", gsm: "350–500" },
];

const SET_COMPOSITIONS = [
  { set: "1-Piece", content: "Bath Towel", popular: false },
  { set: "2-Piece", content: "Bath Towel + Hand Towel", popular: false },
  { set: "4-Piece", content: "Bath Towel + Hand Towel + 2 × Face Towel", popular: true },
  { set: "6-Piece", content: "2 × Bath Towel + 2 × Hand Towel + 2 × Face Towel", popular: true },
  { set: "8-Piece", content: "2 × Bath Towel + 2 × Hand Towel + 4 × Face Towel", popular: false },
  { set: "Custom Set", content: "Any combination to buyer specification", popular: false },
];

const GSM_DATA = [
  { range: "180–300", label: "Waffle / Lightweight", pct: 28, use: "Gym, Spa, Beach", hex: "#38bdf8", note: "Fast dry, packable, light" },
  { range: "350–450", label: "Standard Terry", pct: 55, use: "Retail, Healthcare, Gym", hex: "#D4A017", note: "Balanced weight and absorbency" },
  { range: "450–550", label: "Hotel Grade", pct: 82, use: "Hotel, Hospitality, Retail Premium", hex: "#0D1B2A", note: "Main hotel supply specification", featured: true },
  { range: "550–650", label: "Luxury / Bath Sheet", pct: 65, use: "Luxury Hotel, Premium Brand", hex: "#6366f1", note: "Maximum softness and weight" },
  { range: "650+", label: "Ultra Premium", pct: 38, use: "5-Star Hotel, Spa, Gift", hex: "#ec4899", note: "Zero twist cotton, highest GSM" },
];

const BORDER_OPTIONS = [
  { style: "Dobby Woven Border", desc: "Classic hotel presentation — woven stripe border along short edges. Permanent, wash-proof. The most common hotel specification worldwide.", icon: "═══", accent: "border-navy-900" },
  { style: "Plain Hem (No Border)", desc: "Clean overlocked hem only — no border. The most cost-effective specification. Primarily institutional supply, healthcare and industrial programmes.", icon: "———", accent: "border-gray-400" },
  { style: "Satin Border", desc: "Smooth glossy satin weave border strip. Creates a luxury presentation contrast against the terry body. Premium retail and hotel gift sets.", icon: "≋≋≋", accent: "border-amber-500" },
  { style: "Embroidered Corner", desc: "Hotel monogram, logo or motif embroidered on one or both corners. The standard branding method for high-end hotel and spa programmes.", icon: "✦", accent: "border-gold" },
  { style: "Jacquard Pattern", desc: "Full woven pattern across the towel body. Permanent design with luxury appearance and feel. Highest cost per unit — premium collections only.", icon: "⬗⬗", accent: "border-purple-500" },
  { style: "Sublimation Print Face", desc: "Full-face photographic sublimation print on velour construction only. Vivid design reproduction for branded retail and beach towels.", icon: "▓▓", accent: "border-sky-500" },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic cotton sourcing and processing — required for organic cotton claim", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — EU/UK import standard for all textile products", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Labour standards and worker welfare audited independently", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data sharing", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled fibre verification for sustainable cotton blend programmes", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle ethical manufacturing compliance", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Sustainable cotton farming practices and measurable impact", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "Most rigorous social certification — worker rights, wages and safety independently audited", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency across the supply chain", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Full PMS / Pantone Range", swatches: ["bg-white border border-gray-200", "bg-gray-100", "bg-amber-300", "bg-red-500", "bg-navy-900"], note: "Standard for all constructions. Lab dip before bulk. ISO 105 fastness." },
  { name: "Yarn-Dyed", subtitle: "Stripe / Border Contrast", swatches: ["bg-slate-700", "bg-amber-500", "bg-sky-400", "bg-red-700", "bg-emerald-600"], note: "Colour woven into yarn before construction. Permanent — no fading." },
  { name: "GOTS Organic Dye", subtitle: "Certified Low-Impact", swatches: ["bg-stone-200", "bg-stone-300", "bg-teal-300", "bg-lime-300", "bg-emerald-200"], note: "GOTS-compliant dyes only. No restricted substances or azo dyes." },
  { name: "White / Institutional", subtitle: "Optical White Only", swatches: ["bg-white border border-gray-200", "bg-gray-50 border border-gray-200", "bg-slate-50 border border-gray-200", "bg-zinc-50 border border-gray-200", "bg-stone-50 border border-gray-200"], note: "Optical brightening agents available. Standard for hotel institutional." },
];

const SECTORS = [
  { name: "Hotel & Hospitality", market: "USA · UK · EU · Middle East", desc: "Hotel guest towel programmes from standard 450 GSM terry to luxury zero twist — room towels, spa packages, turndown amenity sets.", icon: "🏨", color: "from-amber-400 to-orange-500" },
  { name: "Retail & E-Commerce", market: "USA · UK · EU · Australia", desc: "Retail bath towel sets from 2-piece to 8-piece — plain hem, dobby border and jacquard constructions for shelf and online retail.", icon: "🛍️", color: "from-sky-400 to-blue-500" },
  { name: "Healthcare & Institutional", market: "USA · UK · EU · Middle East", desc: "Dobby border terry in white and institutional colours. Dozen-banded and bulk carton packaging for hospital linen supply programmes.", icon: "🏥", color: "from-emerald-400 to-teal-500" },
  { name: "Spa & Wellness", market: "USA · UK · EU · Middle East · Asia", desc: "Waffle weave, velour and zero twist constructions for spa chains and wellness brands. Embroidery branding and premium retail packaging.", icon: "🧖", color: "from-violet-400 to-purple-500" },
  { name: "Sports & Gym", market: "USA · UK · EU · Australia", desc: "Gym and sports towels in 350–450 GSM terry loop — fast-dry, light, bulk packaging. Custom embroidery for sports club and gym chain programmes.", icon: "💪", color: "from-red-400 to-rose-500" },
  { name: "Gift & Premium Retail", market: "USA · UK · EU · East Asia", desc: "Premium jacquard and velour towel gift sets. Retail box, ribbon-tied and gift bag packaging for premium homeware and department stores.", icon: "🎁", color: "from-pink-400 to-fuchsia-500" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Competitive pricing." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange freight. Buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory. Lowest quoted price." },
];

const PACK_OPTIONS = [
  { icon: "🎁", label: "Individual Polybag" },
  { icon: "🎀", label: "Rolled & Banded" },
  { icon: "📦", label: "Retail Box (Single)" },
  { icon: "🎁", label: "Gift Box (Set)" },
  { icon: "🎗️", label: "Ribbon / Band Wrapped" },
  { icon: "🗂️", label: "Bulk (12 pcs / Carton)" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", pct: 8 },
  { stage: "Sample Production", days: "18–25", pct: 32 },
  { stage: "Bulk Production", days: "45–60", pct: 72 },
  { stage: "QC & Inspection", days: "3–5", pct: 88 },
  { stage: "Sea Freight", days: "18–28", pct: 100 },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic combed cotton for all standard terry constructions. Fully traceable from farm to finished towel.", tag: "GOTS" },
  { icon: "💧", title: "Water Reduction", desc: "Eco-dyeing reduces water consumption by up to 50% versus conventional reactive dyeing processes in our certified mill network.", tag: "Process" },
  { icon: "♻️", title: "Recycled Cotton", desc: "GRS-certified recycled cotton content available for retail sustainability programmes and circular textile commitments.", tag: "GRS" },
  { icon: "⚖️", title: "Social Audits", desc: "BSCI, Sedex and SA8000 audited mill facilities. Worker wages, safety and welfare independently verified and reported.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "OEKO-TEX Dyes", desc: "No azo dyes, no restricted substances. All reactive dyes are OEKO-TEX Standard 100 compliant across every colour programme.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "FSC-certified retail boxes, recycled polybags and biodegradable ribbon options available on all towel programmes.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Specify construction, GSM, size, set composition, border style, embroidery and quantity via our RFQ form.", color: "bg-amber-700" },
  { num: "02", title: "Mill Matching", desc: "We shortlist 2–3 Pakistan certified towel mills. Competitive quotation returned within 3–5 days.", color: "bg-sky-700" },
  { num: "03", title: "Sample Development", desc: "Physical pre-production samples produced to your exact specification. 18–25 days from fabric and spec lock.", color: "bg-indigo-600" },
  { num: "04", title: "Sample Sign-Off", desc: "Approve construction, GSM, border, embroidery, colour and packaging. Revise as required before placing PO.", color: "bg-violet-600" },
  { num: "05", title: "Bulk Production", desc: "Confirmed PO triggers bulk production across certified mills. 45–60 days from PO depending on quantity and specifications.", color: "bg-rose-700" },
  { num: "06", title: "QC & Dispatch", desc: "Pre-shipment inspection. AQL sampling, GSM testing, colour fastness. Packing and vessel loading Karachi / Port Qasim.", color: "bg-teal-700" },
];

const FAQS = [
  { q: "What GSM is standard for hotel towels supplied from Pakistan?", a: "Hotel towel programmes typically specify 450–550 GSM in terry loop or dobby border terry construction. This weight delivers the combination of absorbency, durability and hand-feel expected by hotel brands in USA, UK, Europe and the Middle East. Ultra-luxury hotel programmes (5-star and above) often specify 550–650 GSM in zero twist cotton. Specify your exact GSM target in the RFQ — we match you with mills producing precisely that specification." },
  { q: "What is the difference between terry loop and velour towels?", a: "Terry loop towels retain the uncut loop pile on both faces — producing maximum water absorbency. Velour (sheared terry) has one or both faces sheared to create a smooth, velvet-like surface with a luxury hand-feel. Velour towels have slightly lower absorbency than terry loop but register print designs (sublimation) with exceptional clarity — making velour the preferred construction for beach towels, branded luxury products and spa collections." },
  { q: "Can towels be embroidered with a hotel logo in Pakistan?", a: "Yes — hotel logo embroidery on corner or along the short border is one of the most frequently ordered customisations in our supply network. Embroidery is applied after the towel is constructed and dyed. Standard placement is left or right corner. Multi-colour logos require a digitised embroidery file — we can digitise from your vector artwork. Woven labels and fabric patches are also available as decoration alternatives for hotel programmes." },
  { q: "Is OEKO-TEX certification available for Pakistan-made towels?", a: "Yes. OEKO-TEX Standard 100 certification is widely held by Pakistan's leading towel mills. This certification confirms that no harmful substances are present in the finished product — it is a standard import requirement for UK and EU buyers. GOTS (Global Organic Textile Standard) certification is also available if your programme requires certified organic cotton sourcing. Specify certification requirements as hard filters in your RFQ." },
  { q: "What set compositions are available for retail towel programmes?", a: "Standard retail set compositions from Pakistan are: 2-piece (bath towel + hand towel), 4-piece (bath towel + hand towel + 2 face towels), 6-piece (2 bath + 2 hand + 2 face) and 8-piece (2 bath + 2 hand + 4 face). Custom set compositions are available — specify the exact combination and packaging requirement in your RFQ. Retail box, ribbon-tied and gift bag packaging are all available." },
  { q: "How do order quantities work for towel programmes from Pakistan?", a: "Towel programme quantities depend on construction, GSM, size range, embroidery complexity, colour count and factory scheduling. There is no single figure that covers all programmes — a hotel institutional programme specifying plain white dobby terry in bulk cartons will differ significantly from a premium retail set in gift boxes. Include your target quantity per style, size and colour in your RFQ and we will advise on the most commercially efficient programme structure." },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function TowelsContent() {
  const [activeConstruction, setActiveConstruction] = useState("terry-loop");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-towels.webp" fill alt="Pakistan bath towel manufacturer — OEM terry cotton towels wholesale for hotels and retailers in USA, UK and Europe" className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/hometextile/bathlinen/" className="hover:text-gold transition-colors">Bath Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Towels</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Home Textile Export</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Towel<br /><span className="text-gold">Manufacturer</span><br />Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading sources OEM bath towels from Pakistan&rsquo;s certified textile mills. Terry loop, velour, zero twist, waffle, jacquard and dobby border constructions. Hotel, hospitality, retail and spa programmes. OEKO-TEX, GOTS certified.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote <span aria-hidden="true">&#8594;</span></Link>
              <button onClick={() => scrollToId("bento-grid")} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">Explore Product Guide</button>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* STATS ANCHOR */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="bg-navy-900 rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Certified Home Textile Sourcing Partner</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Bath Towel Sourcing — Hotel, Hospitality &amp; Retail Programmes</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">Pakistan&rsquo;s certified towel mills — accessed directly through MZ Global Trading. Terry loop to zero twist, custom GSM, branded packaging and full export documentation handled under one sourcing partnership.</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[{ val: "50+", label: "Vetted Factories" }, { val: "35+", label: "Export Markets" }, { val: "10+", label: "Certifications" }, { val: "6", label: "Constructions" }].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
            <Link prefetch={false} href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit">Request a Quote <span aria-hidden="true">&#8594;</span></Link>
          </motion.div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1 — Constructions (large) + Sizes + GSM */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-1 bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[340px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧶</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">6 Weave Constructions</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl px-4 py-3 border border-amber-100 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.gsm}</p>
                    </div>
                    {c.badge && <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-1 bg-sky-50 border border-sky-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[340px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📏</span>
                <div>
                  <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizes</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Standard Size Guide</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {STANDARD_SIZES.map((s) => (
                  <div key={s.code} className="bg-white rounded-xl px-3 py-2.5 border border-sky-100 grid grid-cols-3 items-center gap-2">
                    <p className="text-xs font-bold text-sky-700">{s.code}</p>
                    <p className="text-xs font-semibold text-navy-900">{s.dims}</p>
                    <p className="text-[10px] text-gray-500">{s.gsm}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="View Full Size Guide" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-1 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[340px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">⚖️</span>
                <div>
                  <p className="text-lime-700 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">GSM Weight Guide</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {GSM_DATA.map((g) => (
                  <div key={g.range}>
                    <div className="flex justify-between mb-1 items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: g.hex }} aria-hidden="true" />
                        <p className="text-xs font-bold text-navy-900">{g.range}</p>
                      </div>
                      {g.featured && <span className="text-[9px] font-bold text-lime-700">Hotel Standard</span>}
                    </div>
                    <div className="w-full h-1.5 bg-lime-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${g.pct}%`, backgroundColor: g.hex }} aria-hidden="true" />
                    </div>
                    <p className="text-[9px] text-gray-500 mt-0.5">{g.label}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View GSM Details" />
            </motion.div>
          </div>

          {/* Row 2 — Design + Colors + OEM */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-1 bg-rose-50 border border-rose-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🪡</span>
                <div>
                  <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Design</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Border &amp; Decoration</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {BORDER_OPTIONS.slice(0, 4).map((b) => (
                  <div key={b.style} className={`bg-white rounded-xl px-3 py-2.5 border-l-4 ${b.accent} border-r border-t border-b border-r-rose-50 border-t-rose-50 border-b-rose-50`}>
                    <p className="text-xs font-semibold text-navy-900">{b.style}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-500 pl-1">+ 2 more border styles</p>
              </div>
              <ExploreBtn sectionId="section-design" label="Explore Design Options" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-1 bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🎨</span>
                <div>
                  <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Colour Programs</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-3 border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs font-bold text-navy-900">{d.name}</p>
                      <p className="text-[9px] text-gray-500">{d.subtitle}</p>
                    </div>
                    <div className="flex gap-1.5">{d.swatches.map((s, i) => <div key={i} className={`w-4 h-4 rounded-full ${s}`} aria-hidden="true" />)}</div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colors" label="Explore Colors" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-1 bg-emerald-50 border border-emerald-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏷️</span>
                <div>
                  <p className="text-emerald-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">OEM Programs</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {["Construction & GSM spec", "PMS Colour matching", "Border & embroidery spec", "Label & branding", "Set composition", "Retail packaging"].map((f) => (
                  <div key={f} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                    <p className="text-xs text-gray-600">{f}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore OEM" />
            </motion.div>
          </div>

          {/* Row 3 — Markets + Certs + Export */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-2 bg-[#1a0a2e] rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-purple-400 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-white mt-0.5">6 Industry Sectors</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.name} className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-base" aria-hidden="true">{s.icon}</span>
                    <p className="text-xs font-semibold text-white mt-1 leading-tight">{s.name}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollToId("section-markets")} className="self-start inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-yellow-300 transition-colors mt-auto pt-2">View All Sectors <span aria-hidden="true">→</span></button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">10 Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-xl border border-gray-200 flex items-center justify-center p-1.5" style={{ height: 48 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={60} height={36} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-1 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-teal-700 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 border border-teal-100">
                    <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <div><p className="text-xs font-semibold text-navy-900">{e.full}</p><p className="text-[10px] text-gray-500">{e.port}</p></div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* Row 4 — Sustainability + Process */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-3 bg-[#0a1a0a] rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌿</span>
                <div>
                  <p className="text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase">Ethics</p>
                  <h3 className="text-xl font-bold text-white mt-0.5">Sustainable Sourcing</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {SUSTAINABILITY_ITEMS.map((s) => (
                  <div key={s.title} className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col gap-1">
                    <span className="text-base" aria-hidden="true">{s.icon}</span>
                    <p className="text-sm font-semibold text-white">{s.title}</p>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded-full w-fit">{s.tag}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollToId("section-sustainability")} className="self-start inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mt-auto pt-2">View Sustainability <span aria-hidden="true">→</span></button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }} className="lg:col-span-2 bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Sourcing Process</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {PROCESS_STEPS.map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-full ${p.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>{p.num}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-process" label="View Sourcing Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESOURCES ROW */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link prefetch={false} href="/knowledge/terry-towel-gsm-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">GSM Guide for Terry Towels: What 300 to 900 GSM Means for Buyers</p>
              <p className="text-xs text-gray-500 leading-relaxed">Every GSM tier explained — from 300 GSM institutional to 900 GSM luxury spa, with certification requirements by market.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link prefetch={false} href="/guides/how-to-source-towels-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">How to Source Hotel & Hospitality Towels from Pakistan</p>
              <p className="text-xs text-gray-500 leading-relaxed">8-step sourcing process — specification, mill vetting, sampling, QC, lead times and FOB logistics for USA, UK and EU buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Guide →</span>
            </Link>
            <Link prefetch={false} href="/downloads/towel-specification-sheet/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Towel Specification & Order Sheet</p>
              <p className="text-xs text-gray-500 leading-relaxed">Complete spec template — GSM, sizes, construction, certifications, packing and quality tests. Attach to your RFQ.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Template →</span>
            </Link>
            <Link prefetch={false} href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Towels?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Send us your GSM, size range and set composition — we&rsquo;ll return mill options and indicative pricing within 3–5 business days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS — SKEUOMORPHIC UI */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">01 / Weave Constructions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Six Terry Constructions</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Construction determines absorbency, hand-feel, durability, visual character and target segment. Selection starts with end-use and buyer segment.</p>
          <div className="flex flex-wrap gap-3 mb-8">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConstruction(c.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-xl border-2 transition-all ${activeConstruction === c.id ? "bg-navy-900 text-white border-navy-900" : "bg-white text-gray-500 border-gray-200 hover:border-navy-900/30"}`}
              >
                {c.name}
                {c.badge && <span className="ml-2 text-[10px] text-gold">• {c.badge}</span>}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeConstruction} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="grid lg:grid-cols-2 gap-6">
              {/* Fabric-texture card (Skeuomorphic) */}
              <div className="rounded-3xl overflow-hidden border-2 border-amber-200 shadow-xl" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(212,160,23,0.04) 0px, rgba(212,160,23,0.04) 2px, transparent 2px, transparent 8px), repeating-linear-gradient(90deg, rgba(212,160,23,0.04) 0px, rgba(212,160,23,0.04) 2px, transparent 2px, transparent 8px)", backgroundColor: "#FEFAF0" }}>
                <div className="bg-amber-100/60 border-b-2 border-amber-200 px-8 py-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-navy-900">{ac.name}</h3>
                    {ac.badge && <span className="text-xs font-bold text-gold">{ac.badge}</span>}
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-navy-900">{ac.gsm}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">GSM Range</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-5">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Hand Feel</p>
                    <p className="text-sm font-semibold text-navy-900 italic">&ldquo;{ac.hand}&rdquo;</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">{ac.desc}</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-2">Technical Specification</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{ac.spec}</p>
                  </div>
                </div>
              </div>
              {/* Best-for + Markets */}
              <div className="flex flex-col gap-5">
                <div className="bg-navy-900 rounded-3xl p-7">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Best For</p>
                  <div className="flex flex-col gap-3">
                    {ac.best.map((b, i) => (
                      <div key={b} className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-gold text-navy-900 text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                        <p className="text-white font-medium">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-7 flex-1">
                  <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-4">Primary Export Markets</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => (
                      <span key={m} className="bg-white border-2 border-amber-300 text-navy-900 font-bold text-sm px-4 py-2 rounded-xl">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 2 — SIZES — GRID UI */}
      <section id="section-sizes" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Size Guide</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Standard Dimensions &amp; Set Compositions</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">All sizes are available across all six construction types. Custom dimensions are available — specify in your RFQ.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {STANDARD_SIZES.map((s, i) => (
              <motion.div key={s.code} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-navy-900 px-6 py-4 flex items-center justify-between">
                  <span className="text-xs font-black text-gold tracking-widest uppercase">{s.code}</span>
                  <span className="text-xs text-white/50">{s.gsm} GSM</span>
                </div>
                <div className="p-6">
                  <p className="text-2xl font-black text-navy-900 mb-1">{s.dims}</p>
                  <p className="font-semibold text-gray-600 mb-3">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Set Compositions</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SET_COMPOSITIONS.map((s) => (
                <div key={s.set} className={`rounded-2xl px-6 py-4 flex items-center gap-4 border-2 ${s.popular ? "border-gold bg-gold/5" : "border-gray-100 bg-white"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${s.popular ? "bg-gold text-navy-900" : "bg-gray-100 text-gray-500"}`}>{s.set.replace("-Piece", "").replace(" Set", "")}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-navy-900">{s.set}</p>
                      {s.popular && <span className="text-[10px] font-bold text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <p className="text-sm text-gray-500">{s.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 3 — GSM — INFOGRAPHIC UI */}
      <section id="section-gsm" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Reference</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Towel GSM Selection Guide</h2>
          <p className="text-gray-500 mb-14 max-w-2xl leading-relaxed">GSM determines feel, durability, absorbency, drying time and retail price tier. Hotel programmes start at 450 GSM; luxury programmes at 550+ GSM.</p>
          <div className="space-y-5 mb-14">
            {GSM_DATA.map((g, i) => (
              <motion.div key={g.range} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className={`grid grid-cols-12 gap-4 items-center rounded-2xl p-5 border-2 ${g.featured ? "border-navy-900 bg-navy-900 text-white" : "border-gray-100 bg-gray-50"}`}>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-2xl font-black" style={{ color: g.featured ? "#D4A017" : g.hex }}>{g.range}</p>
                  {g.featured && <p className="text-[10px] text-gold/70 font-semibold mt-0.5">Hotel Std.</p>}
                </div>
                <div className="col-span-10 sm:col-span-3">
                  <p className={`font-bold text-sm ${g.featured ? "text-white" : "text-navy-900"}`}>{g.label}</p>
                  <p className={`text-xs mt-0.5 ${g.featured ? "text-gray-300" : "text-gray-500"}`}>{g.note}</p>
                </div>
                <div className="col-span-12 sm:col-span-5">
                  <div className={`w-full h-3 rounded-full ${g.featured ? "bg-white/10" : "bg-gray-200"}`} aria-hidden="true">
                    <div className="h-full rounded-full" style={{ width: `${g.pct}%`, backgroundColor: g.hex }} />
                  </div>
                  <p className={`text-[10px] mt-1 ${g.featured ? "text-gray-500" : "text-gray-500"}`}>{g.pct}% of towel programmes</p>
                </div>
                <div className="col-span-12 sm:col-span-3">
                  <p className={`text-xs font-semibold ${g.featured ? "text-gray-300" : "text-gray-500"}`}>{g.use}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[["450–550 GSM", "Hotel standard — highest demand globally"], ["500 GSM", "Most-specified single GSM for retail bath towels"], ["550–650 GSM", "Luxury hotel and premium retail bath sheets"]].map(([val, label]) => (
              <div key={val} className="bg-navy-900 rounded-2xl p-6 text-center">
                <p className="text-xl font-black text-gold">{val}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 4 — DESIGN / BORDER — BENTO UI */}
      <section id="section-design" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Design &amp; Border</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Six Border &amp; Decoration Styles</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Border and decoration selection determines the visual presentation tier, target buyer segment and per-unit cost position of your towel programme.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {BORDER_OPTIONS.map((b, i) => {
              const bgs = ["bg-navy-900", "bg-gray-100", "bg-amber-50", "bg-gold/10", "bg-purple-50", "bg-sky-50"];
              const texts = ["text-white", "text-navy-900", "text-navy-900", "text-navy-900", "text-navy-900", "text-navy-900"];
              const subtexts = ["text-gray-300", "text-gray-500", "text-gray-600", "text-gray-600", "text-gray-600", "text-gray-600"];
              return (
                <motion.div key={b.style} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className={`rounded-2xl p-7 ${bgs[i]} flex flex-col gap-4`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-black font-mono ${i === 0 ? "text-gold" : "text-navy-900/40"}`}>{b.icon}</span>
                  </div>
                  <div>
                    <h3 className={`text-base font-bold mb-2 ${texts[i]}`}>{b.style}</h3>
                    <p className={`text-sm leading-relaxed ${subtexts[i]}`}>{b.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 grid sm:grid-cols-3 gap-6">
            {[["Dobby Border", "Most ordered border style for hotel institutional programmes"], ["Embroidery", "Standard logo branding for premium hotel and spa collections"], ["Sublimation Print", "Full-face design for beach and lifestyle retail towels"]].map(([title, desc]) => (
              <div key={title} className="text-center">
                <p className="font-bold text-gold text-base mb-1">{title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 5 — COLOURS — SWISS DESIGN UI */}
      <section id="section-colors" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Programs</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6 leading-tight">Full PMS Range &mdash; Every Construction</h2>
              <p className="text-gray-500 leading-relaxed mb-8">Every towel construction is available in full PMS colour matching. Lab dip submitted for buyer approval before bulk production begins. ISO 105 colour fastness compliance across all programmes.</p>
              <div className="space-y-2 mb-8">
                {["White / Optical White — Hotel institutional standard", "Full PMS matched — Reactive dye, all constructions", "Yarn-dyed stripe and contrast borders available", "GOTS organic dye programmes — low-impact certified"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-navy-900 rounded-full mt-2 shrink-0" aria-hidden="true" />
                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-navy-900/90 transition-colors">Specify Your Colours →</Link>
            </div>
            <div className="space-y-4">
              {DYE_OPTIONS.map((d) => (
                <div key={d.name} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-navy-900">{d.name}</p>
                      <p className="text-xs text-gray-500">{d.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                      {d.swatches.map((s, i) => <div key={i} className={`w-6 h-6 rounded-full ${s}`} aria-hidden="true" />)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{d.note}</p>
                </div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 6 — OEM — EDITORIAL UI */}
      <section id="section-oem" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Custom Development</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 leading-tight mb-6">Complete OEM Towel Programmes — Every Specification Managed</h2>
            <p className="text-gray-500 text-lg leading-relaxed">MZ Global Trading manages every aspect of your towel OEM programme. From initial construction and GSM specification through to retail packaging and incoterm negotiation — your programme, delivered to spec.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
            {[
              { num: "01", title: "Construction & GSM Specification", body: "Choose from all six towel constructions — terry loop, velour, zero twist, waffle, jacquard or dobby border terry. GSM specified to your exact target — 350 GSM institutional to 650+ GSM ultra luxury. We source exactly what you specify." },
              { num: "02", title: "PMS Colour Matching & Lab Dip Approval", body: "Full Pantone/PMS colour range across all constructions and dye methods. Lab dip submitted for buyer approval before bulk production begins. ISO 105 colour fastness testing on bulk submission." },
              { num: "03", title: "Border, Embroidery & Decoration Spec", body: "Dobby woven border, satin border, embroidered corner logo, jacquard pattern, sublimation print — all specified to your brief. Embroidery digitisation from your vector artwork included in the quotation." },
              { num: "04", title: "Label, Branding & Packaging", body: "Woven neck label, care label, hang tag, bar code tag — all to your brand specification. Individual polybag, retail box, gift box, ribbon-tied, bulk carton — all packaging types available." },
              { num: "05", title: "Set Composition & Size Mix", body: "2-piece, 4-piece, 6-piece and 8-piece set compositions across all six standard sizes. Custom set compositions and custom dimensions are available on request." },
              { num: "06", title: "Certification Management", body: "We match your programme with OEKO-TEX, GOTS, BSCI, Sedex or SA8000 certified mills as required. Certification documentation provided for customs and buyer compliance purposes." },
            ].map((item, i) => (
              <motion.div key={item.num} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 2) * 0.1 }} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  <span className="text-4xl font-black text-gray-100 leading-none shrink-0 mt-1">{item.num}</span>
                  <div>
                    <h3 className="text-base font-bold text-navy-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Start Your Towel Programme</p>
              <p className="text-white font-semibold text-lg">Every specification. Every certification. Fully managed from Pakistan&rsquo;s certified mills.</p>
            </div>
            <Link prefetch={false} href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap">Request a Quote →</Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 7 — MARKETS — MODULAR UI */}
      <section id="section-markets" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Industry Sectors</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Six Towel Sectors Supplied</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Bath towels serve more distinct market segments than virtually any other textile product — from hotel institutional programmes to luxury spa collections and mass-market retail.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-gray-100 rounded-3xl overflow-hidden">
            {SECTORS.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }} className={`p-7 border-b-2 sm:border-r-2 border-gray-100 last:border-b-0 ${i % 3 === 2 ? "sm:border-r-0" : ""} ${i >= 3 ? "sm:border-b-0" : ""} hover:bg-gray-50 transition-colors`}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl text-white mb-4 shadow-xs`} aria-hidden="true">{s.icon}</div>
                <h3 className="text-base font-bold text-navy-900 mb-2">{s.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                <p className="text-xs font-semibold text-gold">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-navy-900 rounded-2xl p-8 text-center">
            <p className="text-5xl font-black text-gold mb-2">35+</p>
            <p className="text-white font-semibold mb-1">Export Markets Served</p>
            <p className="text-gray-500 text-sm">USA · UK · EU · Middle East · SE Asia · Australia · East Asia · South America · Russia/CIS</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 8 — CERTIFICATIONS — PRODUCT SHOWCASE UI */}
      <section id="section-certs" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards &amp; Certifications</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">10 Active Certifications</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Every mill in our towel network carries the certifications your market demands — chemical safety, labour standards and environmental compliance. Each standard is third-party verified and renewed on the certification body&rsquo;s schedule.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-6">
                <div className="w-20 h-14 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center p-2 shrink-0" style={{ width: 80, height: 56 }}>
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={72} height={44} className="object-contain w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-bold text-navy-900 text-sm">{c.full}</p>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${c.tier === "Premium" ? "bg-navy-900 text-gold" : c.tier === "Optional" ? "bg-gray-100 text-gray-500" : "bg-amber-50 text-amber-700"}`}>{c.tier}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 9 — EXPORT — INDUSTRIAL UI */}
      <section id="section-export" className="bg-[#1a1a1a] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Logistics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Export, Packaging &amp; Indicative Timeline</h2>
          <p className="text-gray-500 mb-14 max-w-2xl leading-relaxed">Pakistan towel export via Karachi Port Qasim. All major incoterms available. Packaging options from bulk carton to premium gift box.</p>

          {/* Incoterms — industrial panel row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {EXPORT_TERMS.map((e, i) => (
              <div key={e.term} className={`rounded-2xl p-5 border ${i === 0 ? "border-gold bg-gold/10" : "border-white/10 bg-white/5"}`}>
                <p className={`text-2xl font-black mb-1 ${i === 0 ? "text-gold" : "text-white"}`}>{e.term}</p>
                <p className="text-xs text-gray-500 mb-2">{e.full}</p>
                <p className="text-[10px] text-gold/70">{e.port}</p>
                <p className="text-xs text-gray-500 mt-2 leading-snug">{e.desc}</p>
              </div>
            ))}
          </div>

          {/* Packaging icons */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Packaging Options</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {PACK_OPTIONS.map((p) => (
                <div key={p.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:border-gold/40 transition-colors">
                  <span className="text-xl mb-1 block" aria-hidden="true">{p.icon}</span>
                  <p className="text-[10px] text-gray-300 font-medium leading-tight">{p.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline — industrial pipeline */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">Indicative Production &amp; Shipping Timeline</p>
            <div className="space-y-5">
              {LEAD_STAGES.map((s, i) => (
                <div key={s.stage} className="grid grid-cols-12 items-center gap-4">
                  <div className="col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gold text-navy-900 text-[10px] font-black flex items-center justify-center">{String(i + 1).padStart(2, "0")}</div>
                  </div>
                  <div className="col-span-4 sm:col-span-3">
                    <p className="text-sm font-semibold text-white">{s.stage}</p>
                    <p className="text-xs text-gold font-bold">{s.days} days</p>
                  </div>
                  <div className="col-span-7 sm:col-span-8">
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden" aria-hidden="true">
                      <div className="h-full rounded-full bg-gold" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-amber-900/30 border border-amber-700/40 rounded-xl px-5 py-3 flex items-start gap-2">
              <span className="text-amber-500 shrink-0" aria-hidden="true">⚠</span>
              <p className="text-xs text-amber-300 leading-relaxed"><strong>Indicative durations only.</strong> Actual timelines vary by construction, GSM, quantity and mill scheduling. These are guide durations, not contractual commitments.</p>
            </div>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 10 — SUSTAINABILITY — DARK MODE UI */}
      <section id="section-sustainability" className="bg-[#0a1a0a] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Responsible Towel Sourcing</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Our factory network holds GOTS, OEKO-TEX and BSCI certifications. Organic cotton, ethical audits, low-impact dyeing and eco packaging are all available on demand for any programme.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/30 border border-emerald-800/50 px-2.5 py-1 rounded-full">{s.tag}</span>
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[["GOTS Certified", "Organic cotton programmes"], ["OEKO-TEX", "All constructions compliant"], ["SA8000 Audited", "Highest social standard"]].map(([title, desc]) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm font-bold text-gold">{title}</p>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 11 — PROCESS — GLASSMORPHISM */}
      <section id="section-process" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero/hero-towels.webp" fill alt="Pakistan towel sourcing process — certified mill network managed by MZ Global Trading" className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-xs" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Six-Step Towel Sourcing Process</h2>
          <p className="text-white/50 mb-14 max-w-2xl leading-relaxed">From weave selection and mill matching through production oversight to final shipment — six defined stages with full visibility and documented sign-off at each point.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }} className="rounded-2xl p-7 backdrop-blur-md bg-white/8 border border-white/15 hover:bg-white/12 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-10 h-10 rounded-xl ${p.color} text-white text-[10px] font-black flex items-center justify-center shrink-0`}>{p.num}</span>
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[["50+", "Vetted Mills"], ["95%", "On-Time Delivery"], ["3–5 days", "Quotation Return"]].map(([val, label]) => (
              <div key={label} className="rounded-2xl p-6 text-center backdrop-blur-md bg-white/8 border border-white/15">
                <p className="text-2xl font-black text-gold">{val}</p>
                <p className="text-xs text-white/50 mt-1">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-12">Frequently Asked Questions</h2>
          <div className="divide-y divide-gray-200">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i} className="w-full flex items-start gap-4 py-6 text-left group">
                  <span className="relative shrink-0 mt-0.5">
                    {faqOpen !== i && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                      </span>
                    )}
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${faqOpen === i ? "border-gold bg-gold text-navy-900" : "border-gray-300 text-gray-500 group-hover:border-gold"}`}>{faqOpen === i ? "−" : "+"}</span>
                  </span>
                  <p className={`font-semibold leading-snug transition-colors ${faqOpen === i ? "text-navy-900" : "text-gray-700 group-hover:text-navy-900"}`}>{faq.q}</p>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                      <p className="pl-10 pb-6 text-gray-600 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAME-TIER PAGES */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Bath Linen</p>
            <h2 className="text-2xl font-bold text-navy-900">More Bath Linen</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Institutional Towels", desc: "Plain white terry and dobby border stripe. Hotel, hospital and hospitality bulk supply.", href: "/hometextile/bathlinen/institutionaltowels/", img: "/images/hero/hero-institutional-towels.webp", alt: "Pakistan institutional towel manufacturer — plain white and dobby border terry for hotel and healthcare bulk supply" },
              { name: "Bathrobes", desc: "Terry loop, velour and waffle kimono. Shawl collar, hooded and kimono styles.", href: "/hometextile/bathlinen/bathrobes/", img: "/images/hero/hero-bathrobes.webp", alt: "Pakistan bathrobe manufacturer — OEM terry, velour and waffle kimono bathrobes for hotel and spa programmes" },
              { name: "Bath Mats", desc: "Tufted terry, chenille and memory foam. Anti-slip backing, custom sizing.", href: "/hometextile/bathlinen/bathmats/", img: "/images/hero/hero-bath-mats.webp", alt: "Pakistan bath mat manufacturer — OEM tufted and chenille bath mats with anti-slip backing for hotel and retail" },
              { name: "Beach & Pool Towels", desc: "Velour, fouta and microfiber. Sublimation and reactive print. Resort programmes.", href: "/hometextile/bathlinen/beachpooltowel/", img: "/images/hero/hero-beach-pool-towels.webp", alt: "Pakistan beach and pool towel manufacturer — OEM velour and sublimation print towels for resort programmes" },
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

      {/* FINAL CTA */}
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Source Bath Towels from Pakistan&rsquo;s Certified Mills</h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">Hotel institutional supply, premium retail sets, spa collections — towel programmes of any specification and volume. Submit the RFQ; receive a mill match with competitive quotation within 3–5 working days. Certification documentation included.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote <span aria-hidden="true">→</span></Link>
              <Link prefetch={false} href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

