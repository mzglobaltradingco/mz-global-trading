"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CertificationsStrip from "@/components/CertificationsStrip";

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
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">→</span>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  {
    id: "velour-one-sided",
    name: "Velour (One-Sided)",
    badge: "Resort Favourite",
    gsm: "380–450 GSM",
    icon: "☀️",
    color: "bg-amber-500",
    best: ["Resort & Hotel", "Promotional Print", "Retail Collections"],
    markets: ["USA", "Caribbean", "EU", "Australia"],
    printMethods: ["Sublimation (all-over)", "Reactive Print"],
    detail:
      "The dominant construction for beach and pool programmes. A sheared velour face creates a smooth surface for sublimation print — photographic-quality imagery with vivid colour saturation. The terry loop reverse provides absorbency. Standard for resort identity programmes and retail print collections worldwide.",
    spec: "One-side sheared velour. Terry loop reverse. 380–450 GSM. Sublimation print requires 100% polyester face; reactive print on cotton velour.",
  },
  {
    id: "velour-both-sides",
    name: "Velour (Both Sides)",
    badge: "Premium Tier",
    gsm: "420–500 GSM",
    icon: "⭐",
    color: "bg-purple-600",
    best: ["Luxury Hotel", "Premium Retail", "Gift Programmes"],
    markets: ["USA", "UK", "EU", "Middle East"],
    printMethods: ["Embroidery", "Woven Label"],
    detail:
      "Double-sheared velour on both faces delivers a noticeably premium feel — heavier in hand, plush surface front and back. Positioned at the top of the retail and hospitality tier. Typically plain or with woven monogram. Longer lead time due to fabric sourcing and finishing complexity.",
    spec: "Both-face sheared velour. 420–500 GSM. 100% ring-spun cotton. Reactive dyed. No sublimation — incompatible with both-side shearing.",
  },
  {
    id: "terry-loop",
    name: "Terry Loop",
    badge: "",
    gsm: "350–420 GSM",
    icon: "🌊",
    color: "bg-sky-500",
    best: ["Hotel Pools", "Leisure Clubs", "Wholesale"],
    markets: ["USA", "UK", "Middle East", "SE Asia"],
    printMethods: ["Dobby Border", "Jacquard Woven", "Embroidery"],
    detail:
      "Classic uncut terry loop both sides. Maximum absorbency — looped pile absorbs water faster than velour. Dobby border and jacquard construction adds colour and pattern without print processes. The standard for pool operators, leisure clubs and wholesale distributors prioritising durability and value.",
    spec: "Terry loop both sides. 350–420 GSM. 100% ring-spun cotton. Reactive dyed. Dobby border woven-in. High wash durability.",
  },
  {
    id: "microfiber",
    name: "Microfiber",
    badge: "Travel Specialist",
    gsm: "300–380 GSM",
    icon: "✈️",
    color: "bg-teal-500",
    best: ["Travel Retail", "Outdoor Brands", "Sports & Fitness"],
    markets: ["USA", "UK", "EU", "Australia"],
    printMethods: ["Sublimation (all-over)", "Reactive Print"],
    detail:
      "Ultra-fine polyester/polyamide microfiber offers the fastest drying speed — 3× faster than cotton, 40–50% lighter than equivalent cotton constructions. Packable and sublimation-printable. Preferred for travel retail and branded outdoor or sports programmes.",
    spec: "80% polyester / 20% polyamide. 300–380 GSM. Sublimation printable. Ultra-quick dry. OEM label programme available.",
  },
  {
    id: "fouta-pestemal",
    name: "Fouta / Pestemal",
    badge: "Premium Trend",
    gsm: "200–280 GSM",
    icon: "🏨",
    color: "bg-rose-500",
    best: ["Boutique Hospitality", "Premium Retail", "Spa & Hammam"],
    markets: ["EU", "USA", "Middle East", "Australia"],
    printMethods: ["Yarn-Dyed Stripe", "Jacquard Woven"],
    detail:
      "Flat-woven cotton fouta — the hammam tradition adapted for resort and boutique hotel. Lighter than terry, folds to a fraction of the size, dries fast. Yarn-dyed stripes and jacquard woven patterns ensure exceptional colour permanence. Premium positioning in EU boutique hotel and conscious lifestyle retail.",
    spec: "100% cotton. Flat loom woven — no pile. 200–280 GSM. Yarn-dyed stripe or jacquard woven. Fringe or hemmed ends.",
  },
];

const SIZE_OPTIONS = [
  { size: "Standard", dims: "75 × 150 cm", equiv: '30 × 59"', bestFor: "Pool lounger, casual beach", note: "Most ordered" },
  { size: "Large", dims: "90 × 170 cm", equiv: '35 × 67"', bestFor: "Resort sun deck, lounger", note: "Resort standard" },
  { size: "Oversized", dims: "100 × 180 cm", equiv: '39 × 71"', bestFor: "Luxury hotel, premium retail", note: "Volume capable" },
  { size: "Kids", dims: "60 × 120 cm", equiv: '24 × 47"', bestFor: "Family resort, swim clubs", note: "Reduced programme" },
  { size: "Custom", dims: "To specification", equiv: "—", bestFor: "Brand or buyer spec", note: "On request" },
];

const GSM_TIERS = [
  { gsm: "200–280", name: "Lightweight (Fouta)", season: "Year-Round / Travel", market: "EU Boutique · Australia · Spa", pct: 35, featured: false, desc: "Fouta and flat-woven category. Fastest drying, most compact. Travel retail, boutique hospitality and spa programmes.", color: "bg-sky-400" },
  { gsm: "300–380", name: "Mid-Weight", season: "Year-Round / Travel", market: "USA · UK · Sports & Outdoor", pct: 55, featured: false, desc: "Microfiber and lighter velour. Travel, branded outdoor and sports retail. Sublimation printable in microfiber construction.", color: "bg-amber-400" },
  { gsm: "380–500", name: "Standard–Heavy (Resort)", season: "Resort & Hotel", market: "All resort & retail markets", pct: 100, featured: true, desc: "The dominant weight range for resort, hotel and print programme beach towels. Velour one-sided at this weight is the global resort standard.", color: "bg-gold" },
];

const PRINT_METHODS = [
  { code: "SUB", method: "Sublimation Print", best: "All-over photographic imagery, resort identity, retail print collections", compat: ["Velour (One-Sided)", "Microfiber"], note: "Requires 100% polyester face — confirm fabric composition before ordering" },
  { code: "REA", method: "Reactive Print", best: "Geometric and repeat patterns — rich colour on cotton constructions", compat: ["Velour (One-Sided) Cotton", "Terry Loop"], note: "Better wash fastness than sublimation on cotton substrates" },
  { code: "JAC", method: "Jacquard Woven", best: "Premium woven patterns — permanent design, no surface print, no fading", compat: ["Terry Loop", "Fouta / Pestemal"], note: "Woven into the fabric — exceptional colour permanence across wash cycles" },
  { code: "STR", method: "Yarn-Dyed Stripe", best: "Classic stripe, colour-block border — timeless resort and beach aesthetic", compat: ["Terry Loop", "Fouta / Pestemal"], note: "Yarn dyed before weaving — consistent colour throughout full pile depth" },
];

const COLOUR_OPTIONS = [
  { name: "Sublimation Palette", subtitle: "Photographic / All-Over", note: "Full RGB/CMYK colour range. Brand colour matching available. Print file to 300 DPI minimum.", swatches: ["bg-red-400", "bg-sky-400", "bg-emerald-400", "bg-amber-400", "bg-violet-400", "bg-pink-400"] },
  { name: "Reactive Dye", subtitle: "PMS Matched / Solid", note: "Full PMS colour range on cotton constructions. Lab dip approval before bulk production.", swatches: ["bg-slate-700", "bg-teal-600", "bg-rose-500", "bg-amber-500", "bg-slate-500", "bg-emerald-600"] },
  { name: "Yarn-Dyed Stripe", subtitle: "Stripe / Colour Block", note: "Multi-colour warp-stripe combinations. Contrast border designs. Higher minimum quantities.", swatches: ["bg-sky-200", "bg-white", "bg-slate-700", "bg-gold", "bg-rose-300", "bg-teal-300"] },
  { name: "Natural / Undyed", subtitle: "Ecru / Off-White", note: "For fouta and premium terry. Pairs with GOTS organic cotton for sustainability-positioned programmes.", swatches: ["bg-stone-100", "bg-stone-200", "bg-stone-300", "bg-amber-100", "bg-neutral-200", "bg-gray-100"] },
];

const PROGRAMMES = [
  { prog: "Resort Identity", construction: "Velour One-Sided", print: "Sublimation all-over", pack: "Branded bag / Retail roll", buyer: "Hotel procurement" },
  { prog: "Retail Print Collection", construction: "Velour / Microfiber", print: "Sublimation", pack: "Retail box / Header card", buyer: "Importers, retail buyers" },
  { prog: "Corporate Gifting", construction: "Velour One-Sided", print: "Sublimation / Embroidery", pack: "Gift box / Branded bag", buyer: "Brand buyers" },
  { prog: "Promotional", construction: "Terry Loop / Microfiber", print: "Reactive / Sublimation", pack: "Bulk / Individual polybag", buyer: "Promotional distributors" },
];

const REGIONS = [
  { region: "AMERICAS", abbr: "AM", detail: "Resort properties, retail chains and promotional distributors. Caribbean and Mexican Riviera hotel programmes. USA direct-import buyers.", markets: ["USA", "Canada", "Mexico", "Caribbean"] },
  { region: "EUROPE", abbr: "EU", detail: "Mediterranean resort supply. UK retail print collections. EU boutique hospitality. Fouta demand growing in premium hospitality segment.", markets: ["UK", "Germany", "France", "Spain", "Italy"] },
  { region: "MIDDLE EAST", abbr: "ME", detail: "Five-star hotel pool and spa supply. Beach club procurement. GCC resort development driving consistent volume demand.", markets: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"] },
  { region: "ASIA PACIFIC", abbr: "AP", detail: "Australian beach retail. SE Asian resort supply. Japanese premium quality programmes prioritising certified cotton construction.", markets: ["Australia", "Singapore", "Thailand", "Japan"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight to your port. Buyer arranges own marine insurance." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all inland and ocean logistics from factory gate." },
];

const PACK_OPTIONS = [
  { icon: "🛍️", label: "Individual Polybag", note: "Standard export bulk" },
  { icon: "📜", label: "Retail Roll (Paper Band)", note: "Retail floor presentation" },
  { icon: "👜", label: "Branded Bag", note: "Resort gift & spa retail" },
  { icon: "📦", label: "Retail Box", note: "Premium retail presentation" },
  { icon: "🏗️", label: "Bulk Carton", note: "Volume export — no individual pack" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Construction, print method and size confirmation. Mill shortlist and pricing returned.", color: "bg-gold" },
  { stage: "Artwork & Strike-Off", days: "5–10", desc: "Print artwork submission, colour profile lock and pre-production strike-off approval.", color: "bg-sky-500" },
  { stage: "Sample Production", days: "15–20", desc: "Pre-production samples produced to specification. Size, construction, GSM and border confirmed.", color: "bg-blue-500" },
  { stage: "Bulk Production", days: "35–55", desc: "From confirmed PO and approved sample. Print programme adds 5–10 days to standard production.", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Print fidelity, GSM, sizing and packing inspection before vessel loading.", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "20–30", desc: "FCL/LCL from Karachi or Port Qasim to destination port worldwide.", color: "bg-teal-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton available for terry loop and fouta constructions. Farm-to-finished-product traceability.", tag: "GOTS" },
  { icon: "♻️", title: "Recycled Polyester", desc: "GRS-certified recycled polyester face for microfiber and velour print programmes. Reduces virgin material usage per programme.", tag: "GRS" },
  { icon: "💧", title: "Low-Water Dyeing", desc: "Reactive dyeing at certified mills uses closed-loop water systems. Wastewater treated to local and international discharge standards.", tag: "Process" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited factories. Worker welfare, fair wages and safe conditions independently verified annually.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Safe Ink Chemistry", desc: "Sublimation and reactive inks used at OEKO-TEX certified mills only. No restricted substances in any printed or dyed finish.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Minimal Packaging", desc: "Recycled polybags, FSC-certified retail boxes and biodegradable paper bands available for sustainability-positioned programmes.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction, GSM, print method, size, quantity, destination and target delivery. Include brand artwork brief for sublimation programmes." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We evaluate print-capable certified mills in Pakistan for your construction and programme size. 2–3 options with pricing within 3–5 working days." },
  { num: "03", title: "Artwork & Strike-Off", short: "Print Approval", desc: "For sublimation and reactive print programmes, strike-offs are produced from your approved artwork — colour profile locked before bulk production." },
  { num: "04", title: "Sample Production", short: "Sampling", desc: "Pre-production samples produced to specification. Size, construction, GSM and border style confirmed against buyer approval before PO." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "From confirmed PO and approved sample. Duration 35–55 working days depending on construction, print method and order quantity." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection covers print fidelity, GSM, sizing, packing and labelling. FCL or LCL from Karachi or Port Qasim." },
];

const FAQS = [
  {
    q: "What is the difference between sublimation print and reactive print for beach towels?",
    a: "Sublimation bonds dye into the fibre at high temperature — it achieves photographic all-over imagery but requires a 100% polyester face (velour polyester or microfiber). Reactive print uses dye chemistry applied to the fabric surface and is compatible with cotton — it produces rich, deep colours with excellent wash fastness but cannot replicate photographic detail. The choice is determined by your fabric construction: photographic resort identity programmes use sublimation on polyester velour; geometric repeat patterns on cotton terry use reactive print.",
  },
  {
    q: "What is a fouta or pestemal towel, and which hospitality programmes use them?",
    a: "Fouta (also called pestemal or hammam towel) is a flat-woven cotton textile — no pile, no looping, no shearing. It originated in Turkish hammam culture and is now a premium segment in boutique hospitality and beach lifestyle retail. Fouta dries in under an hour, weighs 40–50% less than equivalent cotton terry, and folds to a fraction of the size. EU boutique hotels, Australian beach lifestyle brands and premium spa programmes are the primary buyers. Yarn-dyed stripe and jacquard woven are the only decoration options — sublimation and reactive print are not compatible with flat woven construction.",
  },
  {
    q: "What does chlorine and salt-resistant finishing do, and is it recommended for pool towels?",
    a: "Chlorine and salt-resistant finishing applies a chemical treatment that slows dye fading and fibre degradation caused by pool chlorination and seawater exposure. For pool-side programmes where towels are used daily in chlorinated water environments, this finishing significantly extends usable life and maintains colour vibrancy through repeated laundering. It is particularly recommended for hotel and resort programmes with high-rotation inventory where replacement cost is a commercial factor. It adds a small cost premium per unit and is available on velour and terry constructions.",
  },
  {
    q: "Can you produce branded all-over print beach towels for a resort property launch?",
    a: "Yes. All-over sublimation print on velour one-sided construction is the standard specification for resort identity programmes. The process requires your brand artwork in a high-resolution vector or raster file (300 DPI minimum at print size), confirmation of towel dimensions, and fabric composition confirmation (100% polyester face required for sublimation). Strike-off samples are produced before bulk. Indicative lead time from artwork approval to bulk ex-factory is 50–70 working days — actual timeline depends on print complexity, quantity and mill scheduling.",
  },
  {
    q: "What sizes are available and can oversized 100×180 cm be produced at volume?",
    a: "Standard sizes are 75×150 cm, 90×170 cm, 100×180 cm, 60×120 cm (kids) and custom. The 100×180 cm oversized dimension is a regular programme size for luxury hotel and premium retail — it is not a special order. All standard sizes are production-capable at volume. Custom dimensions can be accommodated for branded programmes with confirmed order quantities. Fouta programmes typically run in standard pair dimensions.",
  },
  {
    q: "What are typical indicative lead times for a beach towel print programme from artwork approval?",
    a: "Indicative lead times from artwork approval: sublimation print programme — 40–55 working days to ex-factory; reactive print programme — 35–50 working days. Sea freight to USA or Europe adds 20–30 working days depending on routing. These are indicative estimates based on typical production scheduling. Actual timelines depend on construction, quantity, factory capacity and seasonal demand. All timelines are confirmed at quotation stage before purchase order placement.",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function BeachTowelsContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip">

      {/* ════════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-beach-pool-towels.webp"
            fill
            alt="Pakistan beach towel manufacturer — OEM velour and sublimation print pool towels for resorts and retailers worldwide"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/bathlinen/" className="hover:text-gold transition-colors">Bath Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Beach & Pool Towels</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Home Textile Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Beach Towel
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
              MZ Global Trading connects resort buyers, retail importers and promotional distributors with Pakistan&rsquo;s certified terry mills. Velour, fouta/pestemal, microfiber and terry loop. 350&ndash;500 GSM. Sublimation all-over print and reactive print. Resort, retail and corporate programmes for USA, UK, Europe and worldwide.
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
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <button
                onClick={() => scrollToId("section-constructions")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Constructions
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
                Beach &amp; Pool Towel Supply — Pakistan Terry Mills
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Print Identity and Resort Quality, Mill-Direct
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan holds over 10% of the world&rsquo;s terry towel export market. The same certified mill infrastructure that serves leading resort chains and retail importers is accessed directly through MZ Global Trading — print programme, sampling and bulk under one coordination.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "5", label: "Construction Types" },
                { val: "350–500", label: "GSM Range" },
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
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
          MAIN BENTO GRID
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* ROW 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏖️</span>
                <div>
                  <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Product</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Beach Towel Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-sky-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    <p className="text-xs text-sky-600 mt-1 leading-tight">{c.best[0]}</p>
                    {c.badge && (
                      <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>
                    )}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📏</span>
                <div>
                  <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase">Dimensions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Standard Size Range</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {SIZE_OPTIONS.map((s) => (
                  <div key={s.size} className="bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{s.size}</p>
                      <p className="text-xs text-gray-400">{s.dims}</p>
                    </div>
                    {s.note === "Most ordered" && (
                      <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full shrink-0">Popular</span>
                    )}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="View Size Guide" />
            </motion.div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Guide</h3>
              <div className="flex flex-col gap-3 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-xl p-3 border border-amber-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-navy-900">{t.gsm}</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Resort Std</span>}
                    </div>
                    <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] text-amber-700 font-semibold">{t.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{t.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View Weight Guide" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🖨️</span>
              <p className="text-fuchsia-600 text-xs font-semibold tracking-[0.2em] uppercase">Print</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Print Technology</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PRINT_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-fuchsia-50">
                    <span className="w-6 h-6 rounded bg-fuchsia-100 text-fuchsia-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{d.code}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{d.compat.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-print" label="Explore Print Options" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour &amp; Print Palette</h3>
              <div className="flex flex-col gap-3 flex-1">
                {COLOUR_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-3 border border-rose-50">
                    <p className="text-xs font-semibold text-navy-900 mb-1.5">{d.name}</p>
                    <div className="flex gap-1.5 mb-1">
                      {d.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${s} border border-gray-100`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400">{d.subtitle}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colors" label="Explore Colours" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Programmes</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM Programmes</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROGRAMMES.map((p) => (
                  <div key={p.prog} className="flex items-start gap-2">
                    <span className="text-gold text-xs font-bold mt-0.5 shrink-0">›</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{p.prog}</p>
                      <p className="text-[10px] text-gray-400">{p.buyer}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="View Programmes" />
            </motion.div>
          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Buyer Regions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {REGIONS.map((r) => (
                  <div key={r.abbr} className="bg-white rounded-xl p-3 border border-indigo-100">
                    <p className="text-xs font-bold text-indigo-600">{r.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{r.region}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.markets.slice(0, 2).join(" · ")}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Regions" />
            </motion.div>

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

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-orange-100">
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{e.full}</p>
                      <p className="text-[10px] text-gray-400">{e.port}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* ROW 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-purple-50 border border-purple-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.short}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-1 pl-8">+ 2 more steps</p>
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
            <Link href="/knowledge/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Beach Towel Sourcing Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction selection, print technology and programme sizing for international resort and retail buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Home Textile Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times, print programme requirements and factory audit overview for buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Spec Sheets &amp; Size Charts</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction spec sheets, size charts and certification documentation for beach and pool towels.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Beach Towels?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, GSM and print method confirmed — RFQ takes 3 minutes. Mill match and quotation within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — CONSTRUCTIONS — PRODUCT SHOWCASE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Construction Catalogue</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Beach Towel Construction Types for OEM Programmes</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            Five distinct constructions — each with different absorbency, drying speed, print compatibility and market position. Construction choice determines the entire print and packaging programme.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
              >
                <div className={`${c.color} px-8 py-6 flex items-center justify-between`}>
                  <div>
                    <span className="text-3xl" aria-hidden="true">{c.icon}</span>
                    <h3 className="text-xl font-bold text-white mt-2">{c.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{c.gsm}</p>
                  </div>
                  {c.badge && (
                    <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1.5 rounded-full border border-white/30">{c.badge}</span>
                  )}
                </div>
                <div className="bg-white p-6 flex flex-col gap-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{c.detail}</p>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Best For</p>
                    <div className="flex flex-wrap gap-1.5">
                      {c.best.map((b) => (
                        <span key={b} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">{b}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Print Compatible</p>
                    <div className="flex flex-wrap gap-1.5">
                      {c.printMethods.map((pm) => (
                        <span key={pm} className="text-xs bg-gold/10 text-navy-900 border border-gold/20 px-2.5 py-1 rounded-full font-medium">{pm}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Technical Spec</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{c.spec}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.markets.map((m) => (
                      <span key={m} className="text-xs text-gold font-semibold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — SIZE RANGE — MINIMAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sizes" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Dimensions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Standard Beach &amp; Pool Towel Size Range</h2>
          <p className="text-gray-500 mb-10 max-w-xl leading-relaxed">
            Five standard dimensions covering resort pool, retail and promotional programmes. Custom dimensions available for branded programmes with confirmed order quantities.
          </p>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[560px]">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="grid grid-cols-5 bg-navy-900 px-6 py-4 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  <span>Size</span>
                  <span>Dimensions</span>
                  <span>Imperial</span>
                  <span>Best For</span>
                  <span>Note</span>
                </div>
                {SIZE_OPTIONS.map((s, i) => (
                  <div
                    key={s.size}
                    className={`grid grid-cols-5 px-6 py-4 text-sm items-center ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} border-b border-gray-100 last:border-b-0`}
                  >
                    <span className="font-semibold text-navy-900">{s.size}</span>
                    <span className="text-navy-900">{s.dims}</span>
                    <span className="text-gray-500">{s.equiv}</span>
                    <span className="text-gray-500 text-xs">{s.bestFor}</span>
                    <span>
                      {s.note === "Most ordered" ? (
                        <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{s.note}</span>
                      ) : (
                        <span className="text-xs text-gray-400">{s.note}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-8 text-center">
            {[["5", "Standard sizes"], ["Custom", "Dimensions on request"], ["US / UK / EU", "Market size standards"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-3xl font-bold text-navy-900">{val}</p>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — GSM WEIGHT — DASHBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-gsm" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Guide</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">GSM Weight by Beach Towel Construction</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            GSM determines absorbency, pack weight, drying time and retail price positioning. Beach towel programmes span a wider weight range than bath programmes — from 200 GSM fouta to 500 GSM luxury velour.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Full GSM Range", val: "200–500", sub: "Fouta to heavy velour" },
              { label: "Resort Standard", val: "380–450", sub: "Velour one-sided" },
              { label: "Travel / Microfiber", val: "300–380", sub: "Ultra-quick dry" },
              { label: "Constructions", val: "5", sub: "Velour to fouta" },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-navy-900">{m.val}</p>
                <p className="text-xs text-gray-500 mt-1">{m.sub}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {GSM_TIERS.map((tier) => (
              <div key={tier.gsm} className={`bg-white rounded-2xl p-7 border-2 ${tier.featured ? "border-gold shadow-lg" : "border-gray-100 shadow-sm"}`}>
                {tier.featured && (
                  <span className="inline-block mb-3 text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">Resort Standard</span>
                )}
                <p className={`text-3xl font-bold mb-1 ${tier.featured ? "text-gold" : "text-navy-900"}`}>{tier.gsm}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{tier.name}</p>
                <p className="text-sm font-semibold text-navy-900 mb-3">{tier.season}</p>
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${tier.featured ? "bg-gold" : "bg-navy-900/30"}`} style={{ width: `${tier.pct}%` }} aria-hidden="true" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Programme share</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tier.desc}</p>
                <p className="text-xs text-gold font-semibold mt-3">{tier.market}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — PRINT TECHNOLOGY — MOODBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-print" className="bg-[#FAF9F7] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Print Technology</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Beach Towel Print Methods — Construction Compatibility</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Print method is not interchangeable — it is determined by fabric construction. Sublimation requires polyester; reactive and yarn-dyed work on cotton. Specifying the wrong method results in failed print adhesion or colour bleed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRINT_METHODS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                style={{ transform: `rotate(${["-1deg", "0.8deg", "-0.6deg", "1.1deg"][i]})` }}
                className="bg-white rounded-2xl p-7 shadow-md border border-gray-100 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">{d.code}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">{d.method}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{d.best}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Compatible With</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.compat.map((c) => (
                      <span key={c} className="text-[11px] bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">⚠ {d.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOURS — GRADIENT UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-colors" className="py-20 lg:py-28" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1a3a4a 50%, #0f2535 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Programme</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Colour &amp; Print Palette Options</h2>
          <p className="text-gray-400 mb-10 max-w-2xl leading-relaxed">
            Colour delivery depends on fabric construction and print method. Sublimation achieves photographic full-spectrum; reactive dye delivers deep PMS-matched solids; yarn-dyed stripe combinations are woven-in permanently.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLOUR_OPTIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div>
                  <p className="font-semibold text-white">{d.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{d.subtitle}</p>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {d.swatches.map((s, idx) => (
                    <div key={idx} className={`h-7 rounded-lg ${s} border border-white/10`} aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM PROGRAMMES — CORPORATE UI (COMPARISON TABLE)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-teal-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM Programmes</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Beach Towel Programme Types by Buyer Category</h2>
          <p className="text-gray-600 mb-10 max-w-2xl leading-relaxed">
            Each buyer category has distinct construction, print and packaging requirements. MZ Global Trading sources to the programme specification — not a catalogue selection.
          </p>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[640px]">
              <div className="border border-teal-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-5 bg-navy-900 px-6 py-4 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  <span>Programme</span>
                  <span>Construction</span>
                  <span>Print Method</span>
                  <span>Packaging</span>
                  <span>Typical Buyer</span>
                </div>
                {PROGRAMMES.map((p, i) => (
                  <div
                    key={p.prog}
                    className={`grid grid-cols-5 px-6 py-5 text-sm items-start gap-2 border-b border-teal-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-teal-50/60"}`}
                  >
                    <span className="font-semibold text-navy-900">{p.prog}</span>
                    <span className="text-gray-600">{p.construction}</span>
                    <span className="text-gray-600">{p.print}</span>
                    <span className="text-gray-600">{p.pack}</span>
                    <span className="text-teal-700 font-medium">{p.buyer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 bg-white rounded-2xl border border-teal-200 p-8">
            <h3 className="text-lg font-bold text-navy-900 mb-4">What MZ Global Trading Coordinates</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { num: "01", title: "Print Artwork Coordination", desc: "Artwork file review, colour profile confirmation and strike-off management before bulk." },
                { num: "02", title: "Mill Matching", desc: "Factory shortlist to programme spec — construction, GSM, size, print capability and certification." },
                { num: "03", title: "Labelling Programme", desc: "Woven care labels, hang tags and brand neck labels to your specification." },
                { num: "04", title: "Packaging Development", desc: "Branded bag, retail box, paper roll band — tailored to your distribution channel." },
                { num: "05", title: "Certification Documentation", desc: "GOTS, OEKO-TEX and other certificates provided per factory capability at no extra cost." },
                { num: "06", title: "Pre-Shipment QC", desc: "Print fidelity, GSM, sizing and packing inspection before vessel loading." },
              ].map((f) => (
                <div key={f.num} className="flex items-start gap-3">
                  <span className="text-gold text-xs font-bold mt-0.5 shrink-0">{f.num}</span>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{f.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKETS — TYPOGRAPHY-DRIVEN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">International Reach</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">Beach Towel Export Markets Served</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-white/10 sm:divide-y-0 sm:divide-x sm:divide-white/10">
            {REGIONS.map((r, i) => (
              <motion.div
                key={r.abbr}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="p-8 sm:p-10"
              >
                <p className="text-[80px] sm:text-[100px] font-black text-white/5 leading-none select-none" aria-hidden="true">{r.abbr}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white -mt-6 mb-4">{r.region}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{r.detail}</p>
                <div className="flex flex-wrap gap-2">
                  {r.markets.map((m) => (
                    <span key={m} className="text-xs bg-white/10 text-gray-300 border border-white/10 px-3 py-1 rounded-full">{m}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS — INFOGRAPHIC UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Certifications Across Our Beach Towel Factory Network</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Certification documentation is a standard deliverable — not an add-on. Specify required certifications in the RFQ and we match you with factories holding the relevant active documentation.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col items-center gap-3 text-center hover:border-gold transition-colors"
              >
                <div className="w-full flex items-center justify-center" style={{ height: 60 }}>
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={90} height={56} className="object-contain w-full h-full" />
                </div>
                <p className="text-xs font-bold text-navy-900">{c.name}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.tier === "Premium" ? "text-gold bg-gold/10" : c.tier === "Optional" ? "text-gray-400 bg-gray-100" : "text-green-700 bg-green-100"}`}>
                  {c.tier}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[["10+", "Active Certifications"], ["100%", "Documentation at Pre-Shipment"], ["GCC · EU · USA", "Accepted Import Standards"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-3xl font-bold text-gold">{val}</p>
                <p className="text-sm text-gray-300 mt-2">{label}</p>
              </div>
            ))}
          </div>
          <CertificationsStrip />
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — EXPORT & PACKAGING — DATA VISUALIZATION UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-orange-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Logistics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Export, Packaging &amp; Indicative Lead Times</h2>
          <div className="text-amber-700 bg-amber-100 border border-amber-200 rounded-xl px-4 py-3 text-sm mb-10 flex items-start gap-2 max-w-2xl">
            <span aria-hidden="true">⚠</span>
            <span>All lead time figures are <strong>indicative</strong> estimates. Confirmed timelines are agreed at quotation stage before purchase order placement and depend on construction, print method, quantity and factory scheduling.</span>
          </div>
          <div className="bg-white rounded-2xl border border-orange-100 p-8 mb-10 shadow-sm">
            <h3 className="text-lg font-bold text-navy-900 mb-6">Indicative Timeline — Print Programme (Sublimation)</h3>
            <div className="flex flex-col gap-0">
              {LEAD_STAGES.map((stage, i) => (
                <div key={stage.stage} className="flex items-start gap-5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-10 h-10 rounded-full ${stage.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {i < LEAD_STAGES.length - 1 && <div className="w-0.5 h-8 bg-gray-200" aria-hidden="true" />}
                  </div>
                  <div className="pb-6 pt-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="font-bold text-navy-900">{stage.stage}</h4>
                      <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">{stage.days} working days</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {EXPORT_TERMS.map((e) => (
              <div key={e.term} className="bg-white rounded-2xl border border-orange-100 p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center mb-4">{e.term}</div>
                <p className="font-semibold text-navy-900 text-sm mb-1">{e.full}</p>
                <p className="text-xs text-gray-400 mb-3">{e.port}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-bold text-navy-900 mb-5">Packaging Options</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PACK_OPTIONS.map((p) => (
              <div key={p.label} className="bg-white rounded-2xl border border-orange-100 p-5 flex flex-col items-center gap-2 text-center shadow-sm">
                <span className="text-2xl" aria-hidden="true">{p.icon}</span>
                <p className="text-sm font-semibold text-navy-900">{p.label}</p>
                <p className="text-xs text-gray-400">{p.note}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — SCANDINAVIAN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="py-20 lg:py-28" style={{ backgroundColor: "#F8FAF7" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#4a7c59] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainable Sourcing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Certified Environmental &amp; Ethical Standards</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            Resort and retail buyers increasingly require documented sustainability credentials — not self-declared claims. Every certification listed here is independently verified and available as a programme requirement, not an optional extra.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#d4e8d4] flex items-center justify-center text-xl shrink-0">
                  <span aria-hidden="true">{s.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-bold text-navy-900">{s.title}</h3>
                    <span className="text-[10px] font-semibold text-[#4a7c59] bg-[#d4e8d4] px-2 py-0.5 rounded-full">{s.tag}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 border-t border-[#d4e8d4] pt-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[["GOTS", "Organic Cotton Option"], ["GRS", "Recycled Polyester Option"], ["OEKO-TEX", "No Harmful Substances"], ["SA8000", "Worker Welfare Verified"]].map(([cert, label]) => (
              <div key={cert}>
                <p className="text-2xl font-bold text-[#4a7c59]">{cert}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — PROCESS — SWISS DESIGN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t-4 border-navy-900 pt-8 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 leading-[1]">Six Defined<br />Stages</h2>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">RFQ to goods at destination port — every stage has a clear deliverable and a confirmed schedule.</p>
          </div>
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-6 items-start p-7 border-b border-gray-100 last:border-b-0"
              >
                <div className="shrink-0">
                  <p className="text-6xl font-bold leading-none text-gray-100">{step.num}</p>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-navy-900" aria-hidden="true" />
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{step.short}</p>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 border-t-2 border-gold pt-8 flex flex-col sm:flex-row gap-5">
            <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-800 transition-colors">
              Begin Your Programme — Step 01 <span aria-hidden="true">→</span>
            </Link>
            <Link href="/ourprocess/" className="inline-flex items-center gap-2 border border-gray-200 text-navy-900 font-semibold px-8 py-4 rounded-xl hover:border-navy-900 transition-colors">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Beach &amp; Pool Towel FAQ</h2>
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
          SAME-TIER PAGES — Bath Linen
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Bath Linen</p>
            <h2 className="text-2xl font-bold text-navy-900">More Bath Linen</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Towels", desc: "Six constructions — terry loop to zero twist. 450–600 GSM. Hotel and retail programmes.", href: "/hometextile/bathlinen/towels/", img: "/images/hero/hero-towels.webp", alt: "Pakistan bath towel manufacturer — OEM terry cotton towels for hotels and retailers in USA, UK and Europe" },
              { name: "Institutional Towels", desc: "Plain white terry and dobby border stripe. Hotel, hospital and hospitality bulk supply.", href: "/hometextile/bathlinen/institutionaltowels/", img: "/images/hero/hero-institutional-towels.webp", alt: "Pakistan institutional towel manufacturer — plain white and dobby border terry for hotel and healthcare bulk supply" },
              { name: "Bathrobes", desc: "Terry loop, velour and waffle kimono. Shawl collar, hooded and kimono styles.", href: "/hometextile/bathlinen/bathrobes/", img: "/images/hero/hero-bathrobes.webp", alt: "Pakistan bathrobe manufacturer — OEM terry, velour and waffle kimono bathrobes for hotel and spa programmes" },
              { name: "Bath Mats", desc: "Tufted terry, chenille and memory foam. Anti-slip backing, custom sizing.", href: "/hometextile/bathlinen/bathmats/", img: "/images/hero/hero-bath-mats.webp", alt: "Pakistan bath mat manufacturer — OEM tufted and chenille bath mats with anti-slip backing for hotel and retail" },
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
              Ready to Source Beach &amp; Pool Towels<br />from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Resort identity programme, retail print collection, corporate branded gifting — velour sublimation, fouta weave or classic terry, any size, any print. Submit the RFQ; receive a certified Pakistan terry mill match with print costing and sample lead time within 3&ndash;5 working days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-9 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-9 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
