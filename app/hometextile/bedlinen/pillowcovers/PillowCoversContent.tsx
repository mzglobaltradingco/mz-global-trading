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
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">→</span>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  {
    id: "percale",
    name: "Percale",
    tc: "200–400 TC",
    icon: "🌬️",
    feel: "Crisp, matte, cool to touch — improves with every wash",
    markets: ["UK", "EU", "USA", "Australia"],
    best: "Hotel & mainstream retail",
    desc: "Plain-weave construction with one-over-one-under structure. The standard construction for UK mainstream bedding retail and mid-scale hotel supply programmes. Consistent colour, excellent print base.",
  },
  {
    id: "sateen",
    name: "Sateen",
    tc: "300–600 TC",
    icon: "✨",
    feel: "Silky sheen, smooth surface, luxurious drape",
    markets: ["EU", "UK", "Middle East", "Japan"],
    best: "Luxury hotel & premium DTC",
    desc: "Four-over-one-under weave exposes maximum thread surface for the characteristic silky sheen. The benchmark construction for five-star hotel programmes and luxury direct-to-consumer brands.",
  },
  {
    id: "oxford",
    name: "Oxford Weave",
    tc: "200–300 TC",
    icon: "🏛️",
    feel: "Durable basket texture, sturdy and structured",
    markets: ["UK", "USA", "EU"],
    best: "Oxford pillowcase with decorative flange",
    desc: "Basket weave structure using two threads as one. Defines the Oxford pillowcase style — the 5–8cm sewn decorative flange (border) that frames the pillow. Premium UK and EU retail staple.",
  },
  {
    id: "flannel",
    name: "Flannel / Brushed",
    tc: "150–200 GSM",
    icon: "🌨️",
    feel: "Raised nap, soft, thermal — seasonal warmth",
    markets: ["UK", "USA", "Canada"],
    best: "Autumn/winter seasonal retail",
    desc: "Brushed cotton raises a soft nap for thermal comfort. The seasonal pillowcase standard for UK, USA and Canada A/W programmes. Family and children's bedding market favourite.",
  },
  {
    id: "linen",
    name: "Linen / Blend",
    tc: "N/A",
    icon: "🌾",
    feel: "Natural texture, breathable, anti-bacterial",
    markets: ["France", "Italy", "Scandinavia"],
    best: "French/Italian premium lifestyle",
    desc: "Pure linen or linen-cotton blend pillowcases. Each wash improves softness while retaining the natural textured character. Premium positioning in French, Italian and Scandinavian lifestyle markets.",
  },
  {
    id: "jersey",
    name: "Jersey Knit",
    tc: "150–200 GSM",
    icon: "🧘",
    feel: "Stretchy, T-shirt soft, wraps the pillow",
    markets: ["USA", "Australia", "UK"],
    best: "Casual lifestyle, children's bedding",
    desc: "Knitted structure with 4-way stretch. Casual comfort positioning — popular in USA family bedding, children's rooms and relaxed lifestyle brands. No ironing required.",
  },
];

const CLOSURE_TYPES = [
  { side: "traditional", closures: [
    { name: "Open-End", icon: "↔️", desc: "No closure — pillow slides in from one end. The simplest, most economical option. Standard for value retail and bulk export.", market: "Value retail · Global" },
    { name: "Envelope / Overlapping", icon: "📂", desc: "Overlapping fabric panel covers the opening — no hardware. Neater than open-end, no stitching required. Mid-market retail standard.", market: "Mid-market · EU · USA" },
  ]},
  { side: "engineered", closures: [
    { name: "Button", icon: "🔘", desc: "One to three buttons along the pillow opening. Premium, elegant, tactile. The standard for premium UK retail and hotel Oxford pillowcases.", market: "Premium retail · UK · EU" },
    { name: "Zip / Concealed", icon: "🤐", desc: "Full-length concealed zipper for a clean finish and easy removal. Hotel housekeeping standard — fast changeover, professional appearance.", market: "Hotel supply · USA · UK" },
  ]},
];

const SIZES = [
  { market: "USA", flag: "🇺🇸", sizes: [
    { name: "Standard", dims: "50 × 75 cm", note: "Most common — fits standard US pillow" },
    { name: "Queen", dims: "50 × 90 cm", note: "Extra length — queen bed programmes" },
    { name: "King", dims: "50 × 102 cm", note: "Widest US size — king bed programmes" },
  ]},
  { market: "UK / EU", flag: "🇬🇧", sizes: [
    { name: "Standard / Housewife", dims: "50 × 75 cm", note: "Plain closure — most common UK style" },
    { name: "Oxford", dims: "50 × 75 cm + 5 cm flange", note: "Decorative sewn border — premium UK retail" },
    { name: "Euro Square", dims: "65 × 65 cm", note: "Continental standard — EU market dominant" },
  ]},
  { market: "Custom", flag: "✏️", sizes: [
    { name: "Body Pillow", dims: "50 × 150 cm", note: "Long pillow style — specialist programmes" },
    { name: "Bolster", dims: "Various", note: "Cylindrical format — hospitality & décor" },
    { name: "Custom", dims: "To specification", note: "Any dimension accommodated in RFQ" },
  ]},
];

const EMBELLISHMENTS = [
  { name: "Plain / Solid", icon: "⬜", tag: "Hotel & mass retail", desc: "Most commercially versatile — full PMS colour range via reactive dyeing. Clean, consistent, no minimum order restriction on colour." },
  { name: "Embroidered Monogram", icon: "🪡", tag: "Premium retail & hotel", desc: "Guest initials, brand monogram or simple motif embroidered at corner or flap edge. Entry-luxury positioning at accessible price point." },
  { name: "Embroidered Border", icon: "🔲", tag: "Boutique & gift", desc: "Running border embroidery along hem or flange. Premium depth of decoration — associated with heritage and artisan bedding brands." },
  { name: "Satin Stripe", icon: "〰️", tag: "Classic hotel", desc: "Woven satin stripe in self-colour or contrast. The classic hotel pillowcase aesthetic. Structured, traditional, durable colour via yarn-dyeing." },
  { name: "Dobby Woven Border", icon: "🧱", tag: "Contemporary retail", desc: "Textural dobby pattern woven into the hem or border zone. No print, no embroidery — texture as decoration. Clean, modern premium positioning." },
  { name: "Printed Border / Face", icon: "🖨️", tag: "Fashion & lifestyle", desc: "Reactive or digital print on the pillow face or along the flap. Full photographic quality. Contemporary retail and DTC lifestyle brands." },
];

const PALETTES = [
  { name: "Neutral Hotel Palette", swatch: ["bg-white border border-gray-200", "bg-stone-100", "bg-stone-200", "bg-amber-50", "bg-gray-100"], desc: "White, ivory, champagne, linen — the hospitality standard for 4–5 star hotel linen programmes." },
  { name: "Pastel Lifestyle", swatch: ["bg-blue-100", "bg-pink-100", "bg-purple-100", "bg-green-100", "bg-yellow-100"], desc: "Soft pastels for contemporary lifestyle, DTC brands and gift bedding. Seasonal refresh programmes." },
  { name: "Bold Fashion Palette", swatch: ["bg-navy-900", "bg-slate-700", "bg-rose-600", "bg-emerald-600", "bg-amber-500"], desc: "Statement colours for fashion-forward retail and the growing bold-bedroom décor market in USA and EU." },
  { name: "Organic / Natural", swatch: ["bg-stone-300", "bg-amber-200", "bg-green-200", "bg-teal-200", "bg-lime-200"], desc: "Earthy tones, undyed natural cotton and GOTS-dyed options for organic and sustainable lifestyle brands." },
];

const OEM_FEATURES = [
  { num: "01", title: "Weave & TC Specification", desc: "Specify construction, thread count and fibre blend — sourced to exact specification from Pakistan's certified weaving mills." },
  { num: "02", title: "Oxford Flange Engineering", desc: "Flange width (typically 5–8cm), mitre or straight corners, same fabric or contrast flange — all configurable." },
  { num: "03", title: "Closure Specification", desc: "Button style and count, zip type, envelope depth or open-end finish — closure hardware to your brand standard." },
  { num: "04", title: "Label & Brand Programme", desc: "Woven labels, care labels, heat transfer labels, hang tags — all branded to your specification and brand guide." },
  { num: "05", title: "Coordinated Set Development", desc: "Matching pillowcases, duvet covers and sheets from one programme — consistent TC, construction and colour across all components." },
  { num: "06", title: "Retail & Hotel Packaging", desc: "Individual polybag, pair-pack retail box, premium gift pouch or bulk carton — configured to your fulfilment requirement." },
];

const MARKET_KPIs = [
  { name: "Hotel & Hospitality", abbr: "HTL", geo: "Worldwide", demand: 95, note: "Highest volume sector — consistent repeat ordering" },
  { name: "Premium Retail", abbr: "PRM", geo: "UK · EU · AU", demand: 80, note: "Growing share — branded bedding programmes" },
  { name: "E-commerce / DTC", abbr: "DTC", geo: "USA · UK", demand: 75, note: "Organic and artisan positioning in demand" },
  { name: "Healthcare", abbr: "HLC", geo: "USA · UK", demand: 55, note: "Specification buying — certified required" },
  { name: "Wholesale Distribution", abbr: "WSD", geo: "Middle East · SE Asia", demand: 65, note: "Multi-brand distributors — volume programmes" },
  { name: "Gifting & Sets", abbr: "GFT", geo: "USA · EU · Japan", demand: 45, note: "Set packaging, premium gift positioning" },
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
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight; buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory gate. Lowest quoted price." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard bulk export" },
  { icon: "👫", label: "Pair-Pack Polybag", note: "2-piece retail pack" },
  { icon: "🗂️", label: "Retail Box (2-pack)", note: "In-store presentation" },
  { icon: "🎁", label: "Gift Box / Pouch", note: "Premium / gifting" },
  { icon: "📋", label: "Bulk per Carton", note: "Hotel/institutional" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton across percale, sateen and Oxford constructions. Fully traceable sourcing.", tag: "GOTS" },
  { icon: "💧", title: "Water Efficiency", desc: "Enzyme finishing replaces conventional stone-wash processes — significantly lower water use per unit.", tag: "Process" },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester blends available for cotton-poly pillow cover programmes.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited factories — labour standards, wages and safe conditions independently verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "Reactive dyeing with OEKO-TEX certified chemicals only across all constructions. No restricted substances.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags, FSC-certified paper tags and retail boxes available on request for any programme.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Share construction, TC, closure type, size, embellishment, quantity and destination.", days: "Day 1" },
  { num: "02", title: "Factory Matching", desc: "We shortlist certified mills matching your pillowcase specification, certifications and programme size.", days: "Days 3–5" },
  { num: "03", title: "Sample Production", desc: "Pre-production samples produced to your specification. 15–20 days from confirmed spec.", days: "Days 18–25" },
  { num: "04", title: "Sample Approval", desc: "Review construction, embellishment, colour and label. Revise before purchase order placement.", days: "Days 25–35" },
  { num: "05", title: "Bulk Production", desc: "Fabric cut and production begins. Duration varies by construction, quantity and scheduling.", days: "Days 35–105" },
  { num: "06", title: "QC & Shipment", desc: "Pre-shipment inspection, carton packing and vessel loading from Karachi or Port Qasim.", days: "Days 108–113" },
];

const FAQS = [
  {
    q: "What size should I order for USA and UK retail pillow cover programmes?",
    a: "USA: Standard 50×75cm is the baseline for most retail and hotel programmes. Queen 50×90cm is ordered for queen-specific bedding collections. UK: Standard (Housewife) 50×75cm and Oxford 50×75cm+5cm flange are both common. Euro square 65×65cm is the dominant size across continental Europe.",
  },
  {
    q: "What is an Oxford pillowcase?",
    a: "An Oxford pillowcase has a flat sewn border — called a flange — of 5–8cm that extends around all four sides beyond the pillow-sized opening. Popular in premium UK and EU retail. The flange creates a decorative frame around the pillow when the bed is made. Oxford-style pillowcases are produced in Oxford weave, percale or sateen constructions.",
  },
  {
    q: "What TC is standard for hotel pillowcases?",
    a: "Hotels typically specify 250–350 TC percale for standard room supply and 300–400 TC sateen for premium room tier. Luxury hotel programmes move to 500–600 TC sateen with embroidered monogram or border. TC selection should be confirmed against the hotel's target wash-cycle count — higher TC requires more careful laundering.",
  },
  {
    q: "Can I order pillowcases with matching duvet covers and flat sheets?",
    a: "Yes. Coordinated bedding sets — duvet cover, flat sheet, fitted sheet and pillow covers — are among our most common hotel and retail orders. Specify the complete set in your RFQ to ensure consistent thread count, construction and colour matching across all components.",
  },
  {
    q: "Are OEKO-TEX certified pillowcases available from Pakistan?",
    a: "Yes. OEKO-TEX Standard 100 certification is available across all standard constructions. This is mandatory for EU and UK buyers with chemical compliance requirements and increasingly expected by US retailers. Specify OEKO-TEX as a hard requirement in your RFQ — it should be non-negotiable for any retail programme.",
  },
  {
    q: "How are pairs and sets packaged for retail?",
    a: "Standard: polybag with header card or label (1-pack or 2-pack). Retail: folded in branded retail box. Premium: zippered fabric display pouch. Gift programmes: fabric pouch or gift box, often with ribbon or card insert. Coordinated sets can be packaged as a complete unit. Specify your fulfilment requirement in the RFQ.",
  },
];

const PAGE_SIBLINGS = [
  { title: "Bedsheets", desc: "Percale, sateen and jacquard flat sheets in all standard sizes for retail and hospitality.", href: "/hometextile/bedlinen/bedsheets/", img: "/images/hero/hero-bedsheets.webp", cta: "Explore Bedsheets" },
  { title: "Fitted Sheets", desc: "Elasticated fitted sheets — precise pocket depths from 12\" to 26\" across all major size standards.", href: "/hometextile/bedlinen/fittedsheets/", img: "/images/hero/hero-fitted-sheets.webp", cta: "Explore Fitted Sheets" },
  { title: "Duvet Covers", desc: "Custom comforter covers — button, zip and envelope closure in UK, US and EU sizing.", href: "/hometextile/bedlinen/duvetcovers/", img: "/images/hero/hero-duvet-covers.webp", cta: "Explore Duvet Covers" },
  { title: "Cushion Covers", desc: "Decorative cushion covers — woven, printed and embroidered from 40×40 to 60×60cm.", href: "/hometextile/bedlinen/cushioncovers/", img: "/images/hero/hero-cushion-covers.webp", cta: "Explore Cushion Covers" },
  { title: "Curtains", desc: "Blackout, sheer and lined curtains — eyelet, rod pocket and pinch pleat heading styles.", href: "/hometextile/bedlinen/curtains/", img: "/images/hero/hero-curtains.webp", cta: "Explore Curtains" },
  { title: "Institutional Bedding", desc: "Commercial-grade bedding for hotels, hospitals and airlines — built for high wash-cycle durability.", href: "/hometextile/bedlinen/institutionalbedding/", img: "/images/hero/hero-institutional-bedding.webp", cta: "Explore Institutional Bedding" },
];

// ─── Main component ────────────────────────────────────────────────────────────

export default function PillowCoversContent() {
  const [activeConstr, setActiveConstr] = useState("percale");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstr) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-pillow-covers.webp"
            fill
            alt="Pakistan pillow cover manufacturer — wholesale percale, sateen and Oxford pillowcases for buyers in USA, UK and Europe"
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
              <span className="text-gold">Pillow Covers</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Pakistan Bed Linen Export
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Pillow Cover
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading connects international bedding brands with Pakistan&rsquo;s certified textile factories. Cotton percale, sateen and Oxford pillowcases. Standard, Queen and Euro sizing. Embroidered, plain and bordered finishes. GOTS and OEKO-TEX certified. FOB&nbsp;/&nbsp;CIF export.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">→</span>
              </Link>
              <button onClick={() => scrollToId("bento-grid")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Explore Pillow Cover Guide
              </button>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ════════ STATS ANCHOR ════════ */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Pillow Cover Supply — Pakistan Bed Linen</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Pillowcase Sourcing for International Retail &amp; Hospitality</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pillow covers are the most frequently touched and washed element of any bedding programme. Construction quality, colour consistency and finishing determine buyer retention. Pakistan&rsquo;s certified weaving mills deliver to retail and hotel specification.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "6", label: "Standard Sizes" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
            <Link prefetch={false} href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit">
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
              className="bg-pink-50 border border-pink-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏗️</span>
                <div>
                  <p className="text-pink-600 text-xs font-semibold tracking-[0.2em] uppercase">Construction</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-pink-100">
                    <span className="text-lg" aria-hidden="true">{c.icon}</span>
                    <p className="text-sm font-semibold text-navy-900 mt-1">{c.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.tc}</p>
                    <p className="text-xs text-pink-600 mt-1 leading-tight">{c.best}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🔒</span>
                <div>
                  <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Closure</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Closure Options</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CLOSURE_TYPES.flatMap(ct => ct.closures).map((cl) => (
                  <div key={cl.name} className="bg-white rounded-xl p-3.5 border border-rose-100">
                    <span className="text-lg" aria-hidden="true">{cl.icon}</span>
                    <p className="text-sm font-semibold text-navy-900 mt-1">{cl.name}</p>
                    <p className="text-xs text-rose-600 mt-0.5">{cl.market}</p>
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
              <span className="text-2xl" aria-hidden="true">📐</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Size Standards</h3>
              <div className="flex flex-col gap-2 flex-1">
                {SIZES.map((s) => (
                  <div key={s.market} className="bg-white rounded-lg p-2.5 border border-sky-100">
                    <p className="text-xs font-bold text-navy-900">{s.flag} {s.market}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{s.sizes.length} size options</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="View All Sizes" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Embellishment</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Embellishment Styles</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EMBELLISHMENTS.slice(0, 4).map((e) => (
                  <div key={e.name} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-amber-50">
                    <span className="text-base" aria-hidden="true">{e.icon}</span>
                    <p className="text-xs font-semibold text-navy-900">{e.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-embellishment" label="Explore Embellishments" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-violet-50 border border-violet-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-violet-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-3 flex-1">
                {PALETTES.slice(0, 3).map((p) => (
                  <div key={p.name} className="bg-white rounded-xl p-2.5 border border-violet-50">
                    <p className="text-xs font-semibold text-navy-900 mb-1.5">{p.name}</p>
                    <div className="flex gap-1">
                      {p.swatch.map((s, idx) => (
                        <div key={idx} className={`flex-1 h-4 rounded ${s}`} aria-hidden="true" />
                      ))}
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

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {MARKET_KPIs.map((m) => (
                  <div key={m.abbr} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-xs font-bold text-teal-600">{m.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{m.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{m.geo}</p>
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
                  <div key={c.name} className="bg-white rounded-xl border border-green-100 flex items-center justify-center p-2" style={{ height: 56 }}>
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
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link prefetch={false} href="/knowledge/pillow-cover-fabric-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Pillow Cover Fabric Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Percale, sateen, jersey, flannel and microfibre constructions compared — performance profiles for retail, hotel and institutional programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link prefetch={false} href="/guides/custom-pillow-cover-sourcing/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Custom Pillow Cover Sourcing</p>
              <p className="text-xs text-gray-500 leading-relaxed">International sizes by market, closure options, embroidery process and fabric matching for hotel and retail programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Guide →</span>
            </Link>
            <Link prefetch={false} href="/downloads/pillow-cover-size-reference/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Pillow Cover Size Reference</p>
              <p className="text-xs text-gray-500 leading-relaxed">Finished dimensions across UK, USA, EU, Middle East and Australia — Standard, King, Oxford, Euro and Body sizes with ease allowance guide.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Download →</span>
            </Link>
            <Link prefetch={false} href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Pillow Covers?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction and size confirmed — RFQ takes 3 minutes. Quotation within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 1 — CONSTRUCTIONS — PRODUCT SHOWCASE UI ════════ */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Construction</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Pillowcase Fabric Constructions</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">Six fabric constructions covering every market segment — from hotel-operational percale to luxury sateen and natural linen.</p>
          <div className="flex flex-wrap gap-3 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button key={c.id} role="tab" aria-selected={activeConstr === c.id} onClick={() => setActiveConstr(c.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${activeConstr === c.id ? "bg-pink-600 text-white border-pink-600" : "bg-white text-navy-900 border-gray-200 hover:border-pink-300"}`}>
                <span aria-hidden="true">{c.icon}</span> {c.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeConstr} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-pink-50 rounded-2xl p-10 border border-pink-100">
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <span className="text-5xl" aria-hidden="true">{ac.icon}</span>
                  <div>
                    <h3 className="text-3xl font-bold text-navy-900">{ac.name}</h3>
                    <p className="text-pink-600 font-semibold">{ac.tc}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{ac.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-pink-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Hand Feel</p>
                    <p className="text-sm text-navy-900">{ac.feel}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-pink-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Best For</p>
                    <p className="text-sm text-pink-700 font-semibold">{ac.best}</p>
                  </div>
                </div>
              </div>
              <div className="bg-navy-900 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-4">Key Markets</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => (
                      <span key={m} className="text-xs text-white bg-white/10 border border-white/10 px-3 py-1.5 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
                <Link prefetch={false} href="/rfq/" className="mt-8 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-5 py-3 rounded-xl hover:bg-yellow-400 transition-colors text-sm">
                  Request Samples →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 2 — CLOSURES — SPLIT-SCREEN UI ════════ */}
      <section id="section-closures" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Closure</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Closure Options for Pillow Covers</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">Closure selection determines price tier and buyer segment. Oxford-style pillowcases include a sewn decorative flange that is an additional construction element, not a closure type.</p>
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {CLOSURE_TYPES.map((side, si) => (
              <div key={side.side} className={`rounded-2xl p-8 ${si === 0 ? "bg-white border-2 border-gray-100" : "bg-navy-900 text-white"}`}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${si === 0 ? "text-gray-500" : "text-gold"}`}>
                  {si === 0 ? "Traditional / No Hardware" : "Engineered Closures"}
                </p>
                <div className="flex flex-col gap-6">
                  {side.closures.map((cl) => (
                    <div key={cl.name} className="flex gap-4">
                      <span className="text-2xl shrink-0 mt-1" aria-hidden="true">{cl.icon}</span>
                      <div>
                        <h3 className={`text-lg font-bold mb-1 ${si === 0 ? "text-navy-900" : "text-white"}`}>{cl.name}</h3>
                        <p className={`text-sm leading-relaxed mb-2 ${si === 0 ? "text-gray-500" : "text-white/60"}`}>{cl.desc}</p>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${si === 0 ? "bg-pink-50 text-pink-700" : "bg-white/10 text-white/70"}`}>{cl.market}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="text-base font-bold text-navy-900 mb-2">Oxford Pillowcase Note</h3>
            <p className="text-sm text-amber-800 leading-relaxed">The Oxford pillowcase has a flat sewn flange (decorative border) of 5–8cm extending around all four sides beyond the pillow opening. The flange is an additional construction feature — not a closure type. Oxford pillowcases typically use button or envelope closure within the flange-bordered design.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 3 — SIZES — GRID UI ════════ */}
      <section id="section-sizes" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sizing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">International Pillowcase Size Standards</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">Six standard sizes cover USA, UK and EU retail and hospitality requirements. Custom dimensions accommodated in all constructions.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SIZES.map((market, mi) => (
              <motion.div key={market.market} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: mi * 0.1 }}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                <div className="bg-navy-900 px-6 py-4 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{market.flag}</span>
                  <h3 className="text-lg font-bold text-white">{market.market}</h3>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  {market.sizes.map((sz) => (
                    <div key={sz.name} className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-sm font-bold text-navy-900">{sz.name}</p>
                      <p className="text-base font-bold text-pink-600 mt-0.5">{sz.dims}</p>
                      <p className="text-xs text-gray-500 mt-1">{sz.note}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-pink-50 border border-pink-100 rounded-2xl p-6">
            <p className="text-sm text-navy-900 font-semibold mb-1">Custom Sizing</p>
            <p className="text-sm text-gray-600">Any dimension can be specified. Include target dimensions in your RFQ — we confirm feasibility within 3–5 days of submission.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 4 — EMBELLISHMENT — SOCIAL-FIRST UI ════════ */}
      <section id="section-embellishment" className="bg-[#FAFAFA] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Embellishment</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Embellishment Styles</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">From plain solid to intricate embroidered border — every embellishment style serves a specific retail tier and buyer expectation.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EMBELLISHMENTS.map((e, i) => (
              <motion.div key={e.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-2xl group-hover:bg-pink-100 transition-colors" aria-hidden="true">{e.icon}</span>
                  <div>
                    <h3 className="text-base font-bold text-navy-900">{e.name}</h3>
                    <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">{e.tag}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 5 — COLOURS — RETAIL UI ════════ */}
      <section id="section-colours" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Colour Programs</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">Four colour programme types covering every retail and hospitality positioning — from neutral hotel palette to bold fashion statement.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PALETTES.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gold hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-navy-900 mb-4">{p.name}</h3>
                <div className="flex gap-2 mb-4">
                  {p.swatch.map((s, idx) => (
                    <div key={idx} className={`flex-1 h-12 rounded-xl ${s}`} aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{p.desc}</p>
                <p className="text-xs text-gray-500">Full PMS range available · Lab dip approval before bulk production</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 6 — OEM — CORPORATE UI ════════ */}
      <section id="section-oem" className="bg-[#F8F9FA] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM &amp; Custom</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Custom Pillowcase Development</h2>
              <p className="text-gray-500 leading-relaxed mb-8">Every specification of your pillowcase programme can be developed to your brand standard — from weave construction through to retail gift packaging and coordinated set development.</p>
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-800 transition-colors">
                Start Your Programme <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OEM_FEATURES.map((f, i) => (
                <motion.div key={f.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="border border-gray-100 rounded-2xl p-6 hover:border-gold hover:shadow-xs transition-all bg-white">
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

      {/* ════════ SECTION 7 — MARKETS — DASHBOARD UI ════════ */}
      <section id="section-markets" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Markets</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Pillowcase Market Applications</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">Pillow covers supply six distinct market segments — each with specific construction, certification and quantity requirements.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8">
            {MARKET_KPIs.map((m, i) => (
              <motion.div key={m.abbr} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-xs transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-1 rounded-full">{m.abbr}</span>
                  <span className="text-xs text-gray-500">{m.demand}%</span>
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-1">{m.name}</h3>
                <p className="text-xs text-pink-600 font-semibold mb-3">{m.geo}</p>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div className="h-full rounded-full bg-pink-400" style={{ width: `${m.demand}%` }} aria-hidden="true" />
                </div>
                <p className="text-xs text-gray-500">{m.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 8 — CERTIFICATIONS — INFOGRAPHIC UI ════════ */}
      <section id="section-certs" className="bg-[#F0F4F8] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Certifications for International Pillowcase Supply</h2>
          <p className="text-gray-500 mb-2 max-w-2xl text-lg font-semibold">10+ certifications supporting EU, UK and US import compliance</p>
          <p className="text-gray-500 mb-10 max-w-2xl text-sm">From organic fibre traceability (GOTS) to chemical safety (OEKO-TEX) and ethical audit (BSCI/SA8000) — the full certification matrix for retail and hospitality buyers.</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 mb-8">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center gap-3 hover:border-pink-200 hover:shadow-md transition-all">
                <div className="w-full h-14 flex items-center justify-center">
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={96} height={52} className="object-contain max-h-12" />
                </div>
                <p className="text-xs font-bold text-navy-900 text-center">{c.name}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 9 — EXPORT — SWISS DESIGN UI ════════ */}
      <section id="section-export" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t-4 border-navy-900 pt-8 mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Export &amp; Packaging</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-100 pb-3">INCOTERMS — PORT OF EXPORT: KARACHI / PORT QASIM</p>
              <div className="flex flex-col gap-0 divide-y divide-gray-100">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="py-6 grid grid-cols-3 gap-4 items-start">
                    <div>
                      <p className="text-3xl font-black text-navy-900">{e.term}</p>
                      <p className="text-xs text-gray-500 mt-1">{e.port}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-bold text-navy-900 mb-1">{e.full}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-100 pb-3">PACKAGING OPTIONS</p>
              <div className="flex flex-col gap-4 mb-8">
                {PACK_OPTIONS.map((p) => (
                  <div key={p.label} className="flex items-center gap-5 py-4 border-b border-gray-50">
                    <span className="text-2xl w-8 shrink-0" aria-hidden="true">{p.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900 text-sm">{p.label}</p>
                      <p className="text-xs text-gray-500">{p.note}</p>
                    </div>
                    <span className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-pink-400" aria-hidden="true" />
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-amber-800 text-sm">
                <strong>Lead times are indicative only</strong> and subject to factory scheduling, material availability and order complexity.
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 10 — SUSTAINABILITY — SCANDINAVIAN UI ════════ */}
      <section id="section-sustainability" className="bg-[#F7FAF8] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#4a7c59] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Sustainable Pillow Cover Sourcing</h2>
          <p className="text-gray-500 mb-12 max-w-2xl">Natural materials, low-impact chemistry and verified labour conditions — sustainability credentials that matter to retail buyers and their end consumers.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-[#d4e8db] hover:border-[#4a7c59] hover:shadow-md transition-all">
                <span className="text-3xl mb-4 block" aria-hidden="true">{s.icon}</span>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
                  <span className="text-xs font-bold text-[#4a7c59] bg-[#e8f4ec] px-2 py-0.5 rounded-full">{s.tag}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════ SECTION 11 — PROCESS — TYPOGRAPHY-DRIVEN UI ════════ */}
      <section id="section-process" className="bg-[#0D1B2A] py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold/70 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">Our Pillow Cover Sourcing Process</h2>
          <div className="flex flex-col gap-0 divide-y divide-white/5">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="relative py-10 grid grid-cols-12 gap-6 items-center">
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-7xl sm:text-9xl font-black leading-none text-white/5 absolute top-1/2 -translate-y-1/2 left-0 select-none" aria-hidden="true">{step.num}</p>
                  <p className="text-xs font-bold text-gold uppercase tracking-widest relative">{step.days}</p>
                </div>
                <div className="col-span-10 sm:col-span-11 relative">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/50 leading-relaxed">{step.desc}</p>
                </div>
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
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={faqOpen === i}>
                  <span className="text-base font-semibold text-navy-900 pr-4">{faq.q}</span>
                  <span className={`text-gold font-bold shrink-0 text-xl transition-transform ${faqOpen === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
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
              <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow">
                <Link prefetch={false} href={card.href} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={card.img} alt={`${card.title} — Pakistan bed linen manufacturer`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-1.5">{card.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-3 transition-all duration-200">{card.cta} →</span>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Source Pillow Covers?</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Construction, size and embellishment confirmed — submit your RFQ and receive factory matches and pricing within 3–5 working days.
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

