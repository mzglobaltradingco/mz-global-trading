"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Scroll helpers ────────────────────────────────────────────────────────────

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
    id: "percale",
    name: "Percale",
    tc: "200–400 TC",
    feel: "Crisp, matte, cool to touch",
    best: ["UK Mainstream Retail", "Hotel & Hospitality", "Summer Collections"],
    markets: ["UK", "EU", "Australia", "USA"],
    desc: "Percale is a plain-weave construction with one thread over, one thread under — producing a matte, crisp surface that becomes softer with each wash. The dominant construction for UK high-street retail and mid-to-upper hotel programmes. OEKO-TEX and GOTS options available.",
    note: "100% cotton or cotton-poly blend. TC 200–400. Anti-shrink finish available.",
  },
  {
    id: "sateen",
    name: "Sateen",
    tc: "300–600 TC",
    feel: "Silky sheen, smooth drape",
    best: ["Luxury Hotel", "Premium DTC", "European Boutique Retail"],
    markets: ["EU", "UK", "USA", "Middle East"],
    desc: "Sateen uses a four-over, one-under weave structure to expose more thread surface — creating the characteristic silky sheen and smooth hand-feel that defines luxury bedding. The premium standard for European five-star hotels and luxury DTC brands.",
    note: "100% combed long-staple cotton preferred. TC 300–600. Lab dip approval before bulk.",
  },
  {
    id: "jacquard",
    name: "Jacquard Woven",
    tc: "300–600 TC",
    feel: "Patterned surface, textured luxury",
    best: ["Heritage Premium Retail", "Gifting Collections", "Luxury Hospitality"],
    markets: ["EU", "UK", "USA", "Japan"],
    desc: "Jacquard weaving programmes patterns directly into the fabric structure — no printing or embroidery. Elevated hand-feel with dimensional surface. The preferred construction for heritage bedding brands and premium gifting programmes in Europe and East Asia.",
    note: "Damask and geometric patterns available. Custom jacquard programming on request.",
  },
  {
    id: "oxford",
    name: "Oxford Weave",
    tc: "200–300 TC",
    feel: "Durable basket texture, sturdy",
    best: ["Contract & Institutional", "Entry-Retail", "Durable Programmes"],
    markets: ["USA", "UK", "Middle East"],
    desc: "Oxford weave uses a basket structure with two threads woven as one — producing exceptional durability at moderate thread count. The standard for contract and institutional supply where wash-cycle resistance outweighs surface refinement.",
    note: "Cotton or cotton-poly blend. High wash-cycle durability. Institutional spec available.",
  },
  {
    id: "linen",
    name: "Linen / Linen Blend",
    tc: "N/A",
    feel: "Textured, natural, breathable",
    best: ["French & Scandinavian Premium", "Natural Lifestyle Brands", "Summer Luxury"],
    markets: ["France", "Italy", "Scandinavia", "Australia"],
    desc: "Pure linen and linen-cotton blend duvet covers offer unmatched breathability and natural texture. Growing strongly in European premium and lifestyle markets. Each wash improves softness while maintaining the distinctive linen texture.",
    note: "Pure linen (100%) or linen-cotton blend (50/50). Natural colour or dyed available.",
  },
  {
    id: "flannel",
    name: "Flannel / Brushed Cotton",
    tc: "150–200 GSM",
    feel: "Soft nap, thermal, cosy",
    best: ["UK/US Winter Retail", "Canada", "Northern Europe Autumn/Winter"],
    markets: ["UK", "USA", "Canada", "N. Europe"],
    desc: "Brushed cotton flannel delivers a soft raised nap surface with thermal properties — the seasonal standard for autumn/winter bedding ranges in UK, USA and Canada. Programme-friendly at mid-price retail and strong in family and children's bedding.",
    note: "100% brushed cotton. GSM 150–200. Pill-resistant finish available.",
  },
];

const CLOSURES = [
  {
    icon: "🔘",
    name: "Button Closure",
    code: "BTN",
    desc: "Traditional 3–5 button fastening along the duvet opening. The standard for UK, EU and Australian premium retail. Elegant appearance, no metal hardware.",
    best: "Premium retail UK/EU/AU",
    markets: "UK · EU · Australia",
    note: "Pearl, fabric-covered or branded button options available",
  },
  {
    icon: "🤐",
    name: "Zip / Concealed Zip",
    code: "ZIP",
    desc: "Concealed zipper runs the full length of the opening for clean appearance and easy removal and washing. The hospitality industry standard for operational efficiency.",
    best: "Hotel & institutional supply",
    markets: "USA · UK · Middle East",
    note: "Concealed zip preferred; exposed zip for value tier",
  },
  {
    icon: "📂",
    name: "Envelope / Overlapping",
    code: "ENV",
    desc: "Overlapping panel closure with no hardware — simplest and most cost-effective option. Suited to casual lifestyle brands and value retail where price point matters.",
    best: "Value retail, casual lifestyle",
    markets: "Global",
    note: "Overlap depth typically 30–40cm. Most economical option",
  },
  {
    icon: "🔩",
    name: "Snap / Popper",
    code: "SNP",
    desc: "Press-stud fastening with quick open/close functionality. Preferred by institutional buyers and children's bedding programmes for fast linen changeover.",
    best: "Institutional, children's bedding",
    markets: "USA · UK · Europe",
    note: "Plastic or metal snaps. Custom snap count available",
  },
];

const TC_TIERS = [
  { range: "200–300 TC", name: "Entry", feel: "Durable, practical, matte", use: "Budget retail, institutional, contract", buyer: "Mass retail buyers, institutional procurement", pct: 30 },
  { range: "300–500 TC", name: "Standard", feel: "Balanced softness, good drape", use: "Mid-to-premium retail, mid-scale hotels", buyer: "Fashion retail, 3–4 star hospitality", pct: 75, featured: true },
  { range: "500–600 TC", name: "Premium", feel: "Noticeably soft, smooth face", use: "Luxury retail, 5-star hotels, premium DTC", buyer: "Luxury brands, high-end hotel groups", pct: 50 },
  { range: "600+ TC", name: "Luxury", feel: "Exceptionally silky, heavy drape", use: "Ultra-premium, gifting, flagship collections", buyer: "Luxury gifting brands, boutique hotels", pct: 20 },
];

const PATTERNS = [
  { name: "Plain Solid", icon: "⬜", desc: "Most commercial construction. Full PMS colour range via reactive dyeing. Clean, versatile.", note: "Dominant for hotel and mass retail" },
  { name: "Jacquard Woven", icon: "🏛️", desc: "Woven-in damask or geometric patterns. No print. Dimensional surface with heritage appeal.", note: "Heritage premium and gifting" },
  { name: "Reactive Print", icon: "🌿", desc: "Geometric, botanical and abstract designs. Full colour fidelity. Contemporary lifestyle positioning.", note: "DTC, lifestyle and fashion retail" },
  { name: "Embroidered Border", icon: "🪡", desc: "Border or hem embroidery in contrast thread. Entry-luxury positioning at accessible price.", note: "Premium entry — accessible luxury" },
  { name: "Dobby / Stripe", icon: "〰️", desc: "Yarn-dyed or woven stripe and dobby patterns. Classic hotel aesthetic with durable colour.", note: "Classic hotel and resort supply" },
  { name: "Yarn-Dyed Stripe", icon: "🌊", desc: "Colour-blocked yarn-dyed stripe. Coastal, casual lifestyle and Scandinavian aesthetic.", note: "Lifestyle retail, beach resort" },
];

const DYE_DIST = [
  { name: "Reactive Dye", pct: 60, color: "bg-amber-400", swatches: ["bg-white", "bg-stone-200", "bg-blue-200", "bg-sage-300", "bg-slate-300"] },
  { name: "Yarn-Dyed", pct: 20, color: "bg-amber-600", swatches: ["bg-slate-600", "bg-amber-300", "bg-teal-400", "bg-blue-400", "bg-stone-400"] },
  { name: "Jacquard Woven", pct: 15, color: "bg-amber-800", swatches: ["bg-white", "bg-stone-300", "bg-slate-200", "bg-amber-100", "bg-gray-100"] },
  { name: "GOTS Organic Dye", pct: 5, color: "bg-green-500", swatches: ["bg-green-100", "bg-green-200", "bg-emerald-200", "bg-lime-200", "bg-stone-100"] },
];

const OEM_SERVICES = [
  { num: "01", title: "Weave & TC Specification", desc: "Specify construction, thread count and fibre blend — sourced to exact buyer specification from certified Pakistan mills." },
  { num: "02", title: "Closure Engineering", desc: "Button count, zip type, snap specification — closure hardware to your standard. Custom button colour and material." },
  { num: "03", title: "Size Chart Customisation", desc: "UK, US, EU or custom dimensions. Deep pockets, extended drops, king-super-king variants all accommodated." },
  { num: "04", title: "Jacquard Pattern Programming", desc: "Custom jacquard pattern development for exclusive designs. Buyer-owned pattern files; no re-use without permission." },
  { num: "05", title: "Brand Label & Packaging", desc: "Woven neck labels, care labels, hang tags, retail box — all to your brand specification and artwork." },
  { num: "06", title: "Coordinated Set Development", desc: "Matching duvet cover, flat sheet, fitted sheet and pillow covers from a single programme. Consistent TC, construction and colour across the set." },
];

const SECTORS = [
  { abbr: "PRM", name: "Premium Retail", detail: "UK, EU and Australian bedding chains, department stores and independent retailers", market: "UK · EU · AU" },
  { abbr: "HTL", name: "Hotel & Resort", detail: "Four and five-star international hotel groups requiring ISO 9001 and Sedex compliance", market: "Worldwide" },
  { abbr: "DTC", name: "E-commerce / DTC", detail: "Direct-to-consumer bedding brands with GOTS and OEKO-TEX consumer claims", market: "USA · UK · EU" },
  { abbr: "HLC", name: "Healthcare", detail: "Clinical and care-home supply requiring washable, durable constructions", market: "USA · UK" },
  { abbr: "DST", name: "Trade Distribution", detail: "Wholesale distributors supplying regional retail and hospitality networks", market: "Middle East · SE Asia" },
  { abbr: "GFT", name: "Gifting & Sets", detail: "Premium gift bedding sets, coordinated bedroom collections for seasonal retail", market: "USA · EU · Japan" },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", img: "/images/certs/cert-bluesign.webp" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Price covers goods to port of loading. Buyer arranges ocean freight and insurance." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight; buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer collects from factory gate and manages all logistics from that point." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard bulk export" },
  { icon: "🗂️", label: "Retail Box (Single)", note: "In-store ready" },
  { icon: "🎁", label: "Retail Box (Set)", note: "Coordinated set packaging" },
  { icon: "🔒", label: "Zippered Pouch", note: "Display and premium retail" },
  { icon: "💨", label: "Vacuum Packed", note: "Space-efficient shipping" },
  { icon: "📋", label: "Bulk / Carton", note: "Hotel/institutional supply" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton available for percale and sateen constructions. Fully traceable, farm to finished duvet cover.", tag: "GOTS" },
  { icon: "💧", title: "Water Efficiency", desc: "Enzyme finishing replaces water-intensive stone-wash processes, cutting water use per unit by up to 50%.", tag: "Process" },
  { icon: "♻️", title: "Recycled Content", desc: "GRS-certified recycled polyester blends available for cotton-poly duvet cover programmes.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Sourcing", desc: "BSCI, Sedex and SA8000 audited factories. Labour standards, worker welfare and safe conditions independently verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "Reactive dyeing with OEKO-TEX certified dyes only. No azo dyes, no restricted substances across all constructions.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags, FSC-certified paper tags and retail boxes available for all programmes on request.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Share construction, TC, closure type, sizing, quantity and destination via our RFQ form.", icon: "📝" },
  { num: "02", title: "Factory Matching", desc: "We shortlist 2–3 certified mills whose weaving specialisation and capacity match your programme. Pricing in 3–5 days.", icon: "🏭" },
  { num: "03", title: "Sample Production", desc: "Pre-production samples produced to specification. 15–20 days from confirmed spec and fabric approval.", icon: "🧵" },
  { num: "04", title: "Sample Approval", desc: "Review construction, TC, closure, colour and labelling. Revise as needed before purchase order placement.", icon: "✅" },
  { num: "05", title: "Bulk Production", desc: "Fabric cut and production commences. Duration varies by construction, quantity and scheduling.", icon: "⚙️" },
  { num: "06", title: "QC & Shipment", desc: "Pre-shipment inspection, carton packing and vessel loading. FCL or LCL from Karachi or Port Qasim.", icon: "🚢" },
];

const FAQS = [
  {
    q: "Which closure is most popular for UK retail duvet covers?",
    a: "Button closure is the standard for mainstream UK and European retail — typically 3–5 pearl or fabric-covered buttons along the foot of the duvet opening. Concealed zip is preferred by hotel buyers for operational efficiency and clean appearance. Envelope closure suits value and casual markets where cost and simplicity take priority.",
  },
  {
    q: "Do you supply UK, US and EU sized duvet covers?",
    a: "Yes. UK: Single 135×200cm, Double 200×200cm, King 225×220cm, Super King 260×220cm. US: Twin 172×218cm, Full/Queen 203×228cm, King 259×228cm. EU: 135×200cm, 200×200cm, 200×220cm. Custom dimensions are accommodated — include your required dimensions in the RFQ.",
  },
  {
    q: "Can I order duvet covers with matching flat sheets and pillow covers?",
    a: "Yes — coordinated bedding sets are among our most frequently ordered programmes. Specify the complete set in your RFQ: duvet cover, flat sheet, fitted sheet and pillow covers. We source across all components from the same mill to ensure consistent thread count, construction and colour throughout the set.",
  },
  {
    q: "What construction should I specify for a hotel duvet cover programme?",
    a: "Percale 200–300 TC in a cotton-poly blend delivers the operational durability and wash-cycle resistance hotel housekeeping demands. For luxury hotel tier or room upgrade sets, specify sateen 400–500 TC in 100% combed cotton with concealed zip closure. OEKO-TEX certification should be included as a standard requirement.",
  },
  {
    q: "Are GOTS-certified duvet covers available from Pakistan?",
    a: "Yes. GOTS certification is available for 100% organic cotton percale and sateen constructions. This is required for organic cotton claims in the EU and UK and increasingly demanded by GOTS-certified brands in the USA and Australia. Specify GOTS as a hard requirement in your RFQ.",
  },
  {
    q: "How are duvet covers packaged for retail export?",
    a: "Standard retail: individual polybag with header card or folded in retail box. Premium: zippered display pouch or branded gift box. Coordinated sets can be packaged together in a single retail box. Hotel and institutional supply: bulk folded, 12–24 per carton with carton labelling. Specify your fulfilment requirement in the RFQ.",
  },
];

const PAGE_SIBLINGS = [
  { title: "Bedsheets", desc: "Percale, sateen and jacquard flat sheets — all standard sizes for retail and hospitality.", href: "/hometextile/bedlinen/bedsheets/", img: "/images/hero/hero-bedsheets.webp", cta: "Explore Bedsheets" },
  { title: "Fitted Sheets", desc: "Elasticated fitted sheets — precise pocket depths from 12\" to 26\" across all major size standards.", href: "/hometextile/bedlinen/fittedsheets/", img: "/images/hero/hero-fitted-sheets.webp", cta: "Explore Fitted Sheets" },
  { title: "Pillow Covers", desc: "Standard, Oxford and Euro pillowcases — percale, sateen and linen in all retail and hotel sizes.", href: "/hometextile/bedlinen/pillowcovers/", img: "/images/hero/hero-pillow-covers.webp", cta: "Explore Pillow Covers" },
  { title: "Cushion Covers", desc: "Decorative cushion covers — woven, printed and embroidered in 40×40 to 60×60cm and custom sizes.", href: "/hometextile/bedlinen/cushioncovers/", img: "/images/hero/hero-cushion-covers.webp", cta: "Explore Cushion Covers" },
  { title: "Curtains", desc: "Blackout, sheer and lined curtains — eyelet, rod pocket, pinch pleat and tab top heading styles.", href: "/hometextile/bedlinen/curtains/", img: "/images/hero/hero-curtains.webp", cta: "Explore Curtains" },
  { title: "Institutional Bedding", desc: "Commercial-grade bedding for hotels, hospitals and airlines — engineered for durability and compliance.", href: "/hometextile/bedlinen/institutionalbedding/", img: "/images/hero/hero-institutional-bedding.webp", cta: "Explore Institutional Bedding" },
];

// ─── Main component ────────────────────────────────────────────────────────────

export default function DuvetCoversContent() {
  const [activeConstruction, setActiveConstruction] = useState("percale");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-duvet-covers.webp"
            fill
            alt="Pakistan duvet cover manufacturer — wholesale comforter covers in percale, sateen and jacquard for buyers in UK, USA and Europe"
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
              <Link prefetch={false} href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/hometextile/bedlinen/" className="hover:text-gold transition-colors">Bed Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Duvet Covers</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Bed Linen Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Duvet Cover
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
              MZ Global Trading sources premium duvet covers from Pakistan&rsquo;s
              certified weaving and finishing mills. Cotton percale, sateen and
              jacquard constructions. UK, US and EU sizing. Button, zip and envelope
              closure. GOTS and OEKO-TEX certified. FOB&nbsp;/&nbsp;CIF export.
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
                Request a Quote <span aria-hidden="true">→</span>
              </Link>
              <button
                onClick={() => scrollToId("bento-grid")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Duvet Cover Guide
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

      {/* ════════ STATS ANCHOR ════════ */}
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
                Duvet Cover Supply — Pakistan Home Textiles
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Duvet Cover Sourcing Built for International Retail
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                European and US bedding buyers demand precise sizing, consistent thread count and reliable closure quality. Pakistan&rsquo;s certified weaving mills deliver to international retail specification — percale, sateen and jacquard across all major standard sizes.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "4", label: "Closure Systems" },
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
              Request a Quote <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ BENTO GRID ════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏗️</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Construction</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Weave Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-amber-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.tc}</p>
                    <p className="text-xs text-amber-600 mt-1 leading-tight">{c.best[0]}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-yellow-50 border border-yellow-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🔒</span>
                <div>
                  <p className="text-yellow-600 text-xs font-semibold tracking-[0.2em] uppercase">Closure</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Closure Systems</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CLOSURES.map((cl) => (
                  <div key={cl.code} className="bg-white rounded-xl p-3.5 border border-yellow-100">
                    <span className="text-lg" aria-hidden="true">{cl.icon}</span>
                    <p className="text-sm font-semibold text-navy-900 mt-1">{cl.name}</p>
                    <p className="text-xs text-yellow-700 mt-0.5">{cl.best}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-closures" label="Explore Closures" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Thread Count</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">TC Guide</h3>
              <div className="flex flex-col gap-2 flex-1">
                {TC_TIERS.map((t) => (
                  <div key={t.range} className="bg-white rounded-lg p-2.5 border border-sky-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-navy-900">{t.range}</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <div className="w-full h-1 bg-sky-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-sky-400" style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">{t.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-tc" label="View TC Guide" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-violet-50 border border-violet-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-violet-600 text-xs font-semibold tracking-[0.2em] uppercase">Design</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Pattern &amp; Embellishment</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PATTERNS.slice(0, 4).map((p) => (
                  <div key={p.name} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-violet-50">
                    <span className="text-base" aria-hidden="true">{p.icon}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-pattern" label="Explore Designs" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DYE_DIST.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-2.5 border border-rose-50">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-navy-900">{d.name}</p>
                      <span className="text-[10px] text-gray-500">{d.pct}%</span>
                    </div>
                    <div className="w-full h-1 bg-rose-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.pct}%` }} aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colours" label="Explore Colours" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM Development</h3>
              <div className="flex flex-col gap-2 flex-1">
                {OEM_SERVICES.slice(0, 5).map((f) => (
                  <div key={f.num} className="flex items-start gap-2">
                    <span className="text-gold text-xs font-bold mt-0.5 shrink-0">{f.num}</span>
                    <p className="text-xs text-gray-600 leading-snug">{f.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore OEM" />
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Market Sectors</h3>
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

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Quality Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-gray-50 rounded-xl border border-gray-200 shadow-xs flex items-center justify-center p-2" style={{ height: 56 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={72} height={44} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-orange-100">
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <p className="text-xs font-semibold text-navy-900">{e.full}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
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

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-fuchsia-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-fuchsia-200 text-fuchsia-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.title}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-500 mt-1 pl-8">+ 2 more steps</p>
              </div>
              <ExploreBtn sectionId="section-process" label="View Our Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ RESOURCES ROW ════════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link prefetch={false} href="/knowledge/duvet-cover-closure-types/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Duvet Cover Closure Types</p>
              <p className="text-xs text-gray-500 leading-relaxed">Buttons, zips, poppers and envelope closures compared — laundry durability, market preference and specification guide.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link prefetch={false} href="/guides/sourcing-duvet-covers-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Sourcing Duvet Covers from Pakistan</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fabric, closure selection, size ranges and certification — complete sourcing guide for hotel, retail and institutional programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Guide →</span>
            </Link>
            <Link prefetch={false} href="/downloads/duvet-cover-spec-order-sheet/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Duvet Cover Spec &amp; Order Sheet</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fill-in template covering fabric, closure, size range table, certification and logistics fields for duvet cover programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Download →</span>
            </Link>
            <Link prefetch={false} href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Duvet Covers?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, closure and sizing confirmed — RFQ takes 3 minutes. Factory match and quotation within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 1 — CONSTRUCTIONS — EDITORIAL UI ════════ */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-4">No. 01 / Fabric Construction</p>
              <h2 className="text-5xl sm:text-6xl font-bold text-navy-900 leading-[1] mb-8">
                Six<br />Constructions
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-8" aria-hidden="true" />
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
                The construction determines everything downstream — hand-feel, TC range, decoration compatibility and market positioning.
              </p>
              <blockquote className="border-l-4 border-gold pl-6 text-xl font-medium text-navy-900 italic leading-relaxed">
                &ldquo;The choice of construction defines the bedding collection — percale for modern minimalist, sateen for hotel luxury, jacquard for heritage premium.&rdquo;
              </blockquote>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-8" role="tablist">
                {CONSTRUCTIONS.map((c) => (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={activeConstruction === c.id}
                    onClick={() => setActiveConstruction(c.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${activeConstruction === c.id ? "bg-navy-900 text-white border-navy-900" : "bg-white text-navy-900 border-gray-200 hover:border-amber-300"}`}
                  >
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
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
                >
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">{ac.name}</h3>
                  <p className="text-amber-600 font-semibold text-sm mb-4">{ac.tc}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{ac.desc}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Hand Feel</p>
                      <p className="text-sm text-navy-900">{ac.feel}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Markets</p>
                      <div className="flex flex-wrap gap-1.5">
                        {ac.markets.map((m) => (
                          <span key={m} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Technical Note</p>
                    <p className="text-sm text-gray-600">{ac.note}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 2 — CLOSURE SYSTEMS — BENTO UI ════════ */}
      <section id="section-closures" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Closure</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Duvet Cover Closure Systems</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">Each closure system serves a specific buyer segment — button for premium retail, zip for hotel efficiency, envelope for value positioning.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CLOSURES.map((cl, i) => (
              <motion.div
                key={cl.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gold hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl" aria-hidden="true">{cl.icon}</span>
                  <div>
                    <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{cl.code}</span>
                    <h3 className="text-xl font-bold text-navy-900 mt-1">{cl.name}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{cl.desc}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Best For</p>
                    <p className="text-navy-900 font-medium">{cl.best}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Markets</p>
                    <p className="text-navy-900 font-medium">{cl.markets}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">{cl.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 3 — THREAD COUNT — MONOCHROME UI ════════ */}
      <section id="section-tc" className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/40 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Thread Count</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Thread Count for Duvet Covers</h2>
          <p className="text-white/50 mb-12 max-w-2xl">Thread count is the single most frequently misunderstood specification in bedding. The range that matters is narrower than retail marketing suggests.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {TC_TIERS.map((t, i) => (
              <motion.div
                key={t.range}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`rounded-2xl p-8 border ${t.featured ? "bg-white border-white" : "bg-white/5 border-white/10"}`}
              >
                {t.featured && <span className="inline-block mb-3 text-[10px] font-bold text-navy-900 bg-gold px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>}
                <p className={`text-3xl font-bold mb-1 ${t.featured ? "text-navy-900" : "text-white"}`}>{t.range}</p>
                <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${t.featured ? "text-gray-500" : "text-white/30"}`}>{t.name}</p>
                <p className={`text-sm mb-3 font-semibold ${t.featured ? "text-navy-900" : "text-white/80"}`}>{t.feel}</p>
                <p className={`text-xs leading-relaxed mb-3 ${t.featured ? "text-gray-500" : "text-white/40"}`}>{t.use}</p>
                <p className={`text-xs font-semibold ${t.featured ? "text-amber-600" : "text-white/30"}`}>{t.buyer}</p>
              </motion.div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 text-xs uppercase tracking-wider py-3 pr-6">TC Range</th>
                  <th className="text-left text-white/40 text-xs uppercase tracking-wider py-3 pr-6">Hand Feel</th>
                  <th className="text-left text-white/40 text-xs uppercase tracking-wider py-3 pr-6">Best Use</th>
                  <th className="text-left text-white/40 text-xs uppercase tracking-wider py-3">Typical Buyer</th>
                </tr>
              </thead>
              <tbody>
                {TC_TIERS.map((t) => (
                  <tr key={t.range} className="border-b border-white/5">
                    <td className="py-4 pr-6 font-bold text-white">{t.range}</td>
                    <td className="py-4 pr-6 text-white/60">{t.feel}</td>
                    <td className="py-4 pr-6 text-white/60">{t.use}</td>
                    <td className="py-4 text-white/60">{t.buyer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════ SECTION 4 — PATTERN & EMBELLISHMENT — MAXIMALIST UI ════════ */}
      <section id="section-pattern" className="bg-[#FFF8EC] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Design</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Pattern &amp; Embellishment Options</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">From minimal plain percale to elaborate jacquard damask — every design register has a matching construction and finish in Pakistan&rsquo;s certified mill network.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATTERNS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative bg-white rounded-2xl p-8 shadow-md border-l-4 border-amber-400 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full" aria-hidden="true" />
                <span className="relative text-4xl mb-4 block" aria-hidden="true">{p.icon}</span>
                <h3 className="relative text-xl font-bold text-navy-900 mb-2">{p.name}</h3>
                <p className="relative text-gray-600 text-sm leading-relaxed mb-4">{p.desc}</p>
                <span className="relative inline-block text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">{p.note}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 5 — COLOURS — DATA VISUALIZATION UI ════════ */}
      <section id="section-colours" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Programs</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Colour Programs for Duvet Covers</h2>
          <p className="text-gray-500 mb-12 max-w-2xl">Reactive dyeing covers the full PMS range. Lab dip approval is mandatory before bulk production begins across all dye types.</p>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Donut chart visual */}
            <div className="flex flex-col gap-6">
              <div className="relative w-64 h-64 mx-auto">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  {[
                    { pct: 60, color: "#FBBF24", offset: 0 },
                    { pct: 20, color: "#D97706", offset: 60 },
                    { pct: 15, color: "#92400E", offset: 80 },
                    { pct: 5, color: "#22C55E", offset: 95 },
                  ].map((seg, i) => {
                    const circumference = 2 * Math.PI * 45;
                    const dash = (seg.pct / 100) * circumference;
                    const gap = circumference - dash;
                    const rotateOffset = (seg.offset / 100) * circumference;
                    return (
                      <circle
                        key={i}
                        cx="60" cy="60" r="45"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="20"
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-rotateOffset}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-navy-900">4</p>
                  <p className="text-xs text-gray-500">Dye Types</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {DYE_DIST.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${d.color} shrink-0`} aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{d.name}</p>
                      <p className="text-xs text-gray-500">{d.pct}% of orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Swatch rows */}
            <div className="flex flex-col gap-6">
              {DYE_DIST.map((d) => (
                <div key={d.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-navy-900">{d.name}</h3>
                    <span className="text-sm font-bold text-amber-600">{d.pct}%</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    {["bg-white border border-gray-200", "bg-stone-200", "bg-blue-200", "bg-slate-300", "bg-amber-200", "bg-emerald-200", "bg-rose-200", "bg-violet-200"].map((s, idx) => (
                      <div key={idx} className={`flex-1 h-8 rounded-lg ${s}`} aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Full PMS range · Lab dip approval included</p>
                </div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 6 — OEM — MARKETPLACE UI ════════ */}
      <section id="section-oem" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Custom Development</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Custom Duvet Cover Development</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">Every aspect of your duvet cover programme can be specified to your brand requirement — from weave structure through to retail packaging and coordinated set development.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OEM_SERVICES.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-gold hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-gold/10 text-gold text-sm font-bold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                    {f.num}
                  </span>
                  <h3 className="text-base font-bold text-navy-900">{f.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link prefetch={false} href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-800 transition-colors">
              Start Your Programme <span aria-hidden="true">→</span>
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 7 — MARKETS — COLLAGE UI ════════ */}
      <section id="section-markets" className="bg-[#1A1A2E] py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold/60 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Markets</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">Duvet Cover Market Sectors</h2>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative p-8 bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="absolute top-4 right-4 text-6xl font-black text-white/5 leading-none select-none" aria-hidden="true">{s.abbr}</div>
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">{s.market}</p>
                <h3 className="text-2xl font-bold text-white mb-3 relative">{s.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed relative">{s.detail}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════ SECTION 8 — CERTIFICATIONS — MATERIAL DESIGN ════════ */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Quality Certifications</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">10+ certifications covering organic fibre, chemical safety, social compliance and quality management — meeting EU, UK and US import requirements.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center gap-3 group"
              >
                <div className="w-full h-16 flex items-center justify-center">
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={96} height={56} className="object-contain max-h-14" />
                </div>
                <p className="text-sm font-bold text-navy-900 text-center">{c.name}</p>
                <p className="text-[10px] text-gray-500 text-center leading-tight">{c.full}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 9 — EXPORT & PACKAGING — INFOGRAPHIC UI ════════ */}
      <section id="section-export" className="bg-[#F0F4F8] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Export Terms &amp; Packaging</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">All standard incoterms available from Karachi and Port Qasim. Packaging configured to your retail, hotel or e-commerce fulfilment specification.</p>
          <div className="grid lg:grid-cols-2 gap-10 mb-12">
            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-6">Export Terms</h3>
              <div className="flex flex-col gap-4">
                {EXPORT_TERMS.map((e, i) => (
                  <motion.div
                    key={e.term}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex gap-5 bg-white rounded-2xl p-6 shadow-xs"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center shrink-0">
                      <span className="text-gold font-black text-sm">{e.term}</span>
                    </div>
                    <div>
                      <p className="font-bold text-navy-900">{e.full}</p>
                      <p className="text-xs text-amber-600 font-semibold mb-1">{e.port}</p>
                      <p className="text-sm text-gray-500">{e.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-6">Packaging Options</h3>
              <div className="grid grid-cols-2 gap-4">
                {PACK_OPTIONS.map((p, i) => (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="bg-white rounded-2xl p-5 shadow-xs flex flex-col gap-2"
                  >
                    <span className="text-2xl" aria-hidden="true">{p.icon}</span>
                    <p className="font-semibold text-navy-900 text-sm">{p.label}</p>
                    <p className="text-xs text-gray-500">{p.note}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-800 text-sm">
            <strong>Lead time disclaimer:</strong> Lead times are indicative only and subject to factory scheduling, material availability and order complexity. RFQ submission generates a confirmed timeline within 3–5 working days.
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 10 — SUSTAINABILITY — SKEUOMORPHIC UI ════════ */}
      <section id="section-sustainability" className="bg-[#F0EDE8] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Ethics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Sustainable Duvet Cover Sourcing</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">From farm to finished product, MZ Global Trading aligns with sustainability standards that matter to international retail buyers and their customers.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 shadow-xs border border-stone-200 relative overflow-hidden"
                style={{ boxShadow: "4px 4px 0 0 rgba(180,160,120,0.25)" }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-stone-100 rounded-bl-3xl" aria-hidden="true" />
                <span className="text-3xl mb-4 block" aria-hidden="true">{s.icon}</span>
                <h3 className="text-lg font-bold text-navy-900 mb-2 relative">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 relative">{s.desc}</p>
                <span className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-1 rounded-full">{s.tag}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 11 — PROCESS — ISOMETRIC UI ════════ */}
      <section id="section-process" className="bg-slate-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold/70 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Sourcing Your Duvet Cover Programme</h2>
          <p className="text-white/50 mb-12 max-w-2xl">Six defined stages from RFQ submission to vessel loading. Each stage has a confirmed outcome before the next begins.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-gold/30 transition-all"
                style={{ transform: "perspective(800px) rotateX(2deg)" }}
              >
                <div className="absolute top-4 right-4 text-5xl font-black text-white/5 leading-none select-none" aria-hidden="true">{step.num}</div>
                <span className="text-3xl mb-4 block" aria-hidden="true">{step.icon}</span>
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Step {step.num}</p>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 bg-amber-900/30 border border-amber-700/30 rounded-2xl p-6 text-amber-300/80 text-sm">
            Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={faqOpen === i}
                >
                  <span className="text-base font-semibold text-navy-900 pr-4">{faq.q}</span>
                  <span className={`text-gold font-bold shrink-0 text-xl transition-transform ${faqOpen === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PAGE BOXES ════════ */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Bed Linen Collection</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore Bed Linen Products</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAGE_SIBLINGS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow"
              >
                <Link prefetch={false} href={card.href} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={card.img} alt={`${card.title} — Pakistan bed linen manufacturer`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-1.5">{card.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                      {card.cta} →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section className="bg-navy-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Source Duvet Covers?</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Construction, closure and sizing confirmed — submit your RFQ and receive factory matches and pricing within 3–5 working days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
              Request a Quote <span aria-hidden="true">→</span>
            </Link>
            <Link prefetch={false} href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:border-gold hover:text-gold transition-colors text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

