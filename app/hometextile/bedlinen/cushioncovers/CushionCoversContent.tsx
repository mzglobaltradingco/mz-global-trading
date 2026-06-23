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
  { name: "Cotton Damask / Jacquard", mood: "Formal · Structured · Woven pattern, no print", market: "Hotel lobbies · Premium gifting · EU luxury retail", rotate: "-1.5deg", color: "bg-amber-50" },
  { name: "Plain Weave / Poplin", mood: "Versatile · Printable · Mainstream retail baseline", market: "USA · UK · Mass retail · E-commerce", rotate: "1deg", color: "bg-sky-50" },
  { name: "Linen / Linen-Look", mood: "Natural texture · Organic feel · Luxury lifestyle", market: "EU premium décor · USA lifestyle brands · Australia", rotate: "-0.5deg", color: "bg-lime-50" },
  { name: "Velvet (Polyester)", mood: "Deep pile · Rich tactile quality · Statement piece", market: "Interior design · Seasonal retail · Middle East", rotate: "1.2deg", color: "bg-purple-50" },
  { name: "Canvas (Heavy Cotton)", mood: "Structured · Durable · Outdoor/casual utility", market: "USA outdoor · Casual home · Workwear-adjacent interior", rotate: "-0.8deg", color: "bg-slate-50" },
  { name: "Jersey Knit", mood: "Soft stretch · Casual comfort · Child-safe materials", market: "Children&apos;s rooms · Casual home · Scandinavia", rotate: "0.6deg", color: "bg-rose-50" },
];

const CLOSURES = [
  {
    id: "zip",
    code: "ZIP",
    name: "Concealed Zip",
    spec: "Hidden zip along bottom seam — no visible hardware",
    opening: "Full width opening",
    hardware: "Nylon coil or metal zip, auto-lock pull",
    washDurability: "Excellent — hardware rated 50+ wash cycles",
    bestFor: "Interior design · Premium retail · Hotel housekeeping",
    detail: "Concealed zip is the dominant closure for decorative cushion covers across global retail. The zip sits flush within the seam allowance with no visible hardware on the decorative face. Available in nylon coil (lighter fabrics) or metal chain (heavier jacquard and canvas). Auto-lock pull prevents accidental opening.",
  },
  {
    id: "button",
    code: "BTN",
    name: "Button / Press-Stud",
    spec: "1–3 buttons on overlapping placket — visible design element",
    opening: "Full placket width",
    hardware: "Cotton-covered buttons, shell buttons, or press-studs",
    washDurability: "Good — buttons require periodic inspection",
    bestFor: "Artisan retail · Farmhouse style · Traditional décor",
    detail: "Button closure doubles as a design feature — shell buttons, covered buttons and press-studs all offer distinct visual languages. Popular in farmhouse, country and artisan home furnishing programmes. Placket can be topstitched for a structured retail finish.",
  },
  {
    id: "envelope",
    code: "ENV",
    name: "Envelope (Fabric Overlap)",
    spec: "Overlapping fabric panels — no hardware required",
    opening: "Centre overlap, 10–15 cm per side",
    hardware: "None — self-fabric overlap only",
    washDurability: "Excellent — no hardware to corrode or break",
    bestFor: "Value retail · Basic programmes · Easy care",
    detail: "Envelope closure eliminates all hardware — the back panels overlap by 10–15 cm on each side, securing the insert without zips or buttons. Simplest construction, lowest cost, easiest to wash and replace. Best suited to value retail, hospitality bulk supply and basic home programmes.",
  },
];

const SIZES = [
  { size: "40 × 40 cm", label: "Small Accent", market: "Accent cushions · Chair throws · Bedhead styling", aspect: "aspect-square w-16 h-16" },
  { size: "45 × 45 cm", label: "Standard Throw", market: "Most common EU/UK retail size · Sofa cushions", aspect: "aspect-square w-20 h-20" },
  { size: "50 × 50 cm", label: "Large Throw", market: "USA standard · Large sofa · Floor cushions", aspect: "aspect-square w-24 h-24" },
  { size: "60 × 60 cm", label: "Floor / Statement", market: "Floor cushions · Oversized statement pieces", aspect: "aspect-square w-28 h-28" },
  { size: "30 × 50 cm", label: "Oblong / Lumbar", market: "Lumbar support · Bolster styling · Decorative accent", aspect: "w-32 h-20" },
  { size: "Custom", label: "Any dimension", market: "Specify width × height in your RFQ", aspect: "w-20 h-14 border-dashed" },
];

const DESIGN_OPTIONS = [
  { name: "All-Over Print", method: "Sublimation / Reactive", best: "Photographic, geometric, pattern-dense designs", note: "Sublimation on polyester; reactive on cotton", icon: "🖼️" },
  { name: "Jacquard Woven", method: "Structural weave", best: "Formal, premium — pattern is woven into fabric", note: "No print; pattern determined at weave stage", icon: "🧵" },
  { name: "Embroidered Panel", method: "Machine embroidery", best: "Logo marks, monograms, floral motifs", note: "Stitch count determines density; structured fabrics preferred", icon: "🪡" },
  { name: "Yarn-Dyed Stripe", method: "Colour woven in", best: "Classic ticking stripe, awning, coastal", note: "Depth of colour exceeds printed stripe", icon: "🎨" },
  { name: "Screen Print (Placement)", method: "Flat-bed screen", best: "Graphic placement, large artwork, limited palette", note: "Soft-hand inks for cotton; plastisol for heavy coverage", icon: "📐" },
  { name: "Plain / Solid", method: "Reactive or vat dye", best: "Classic hotel, minimalist décor, coordinate sets", note: "Full PMS range — lab dip before bulk production", icon: "⬜" },
];

const COLOUR_PALETTES = [
  { season: "Spring / Summer", desc: "Light pastels, fresh botanicals, coastal whites", swatches: ["bg-sky-200", "bg-green-200", "bg-rose-200", "bg-yellow-200", "bg-teal-200"], note: "Reactive dyed — PMS matched" },
  { season: "Autumn / Winter", desc: "Rich ochres, deep jewel tones, warm burgundy", swatches: ["bg-amber-600", "bg-red-800", "bg-emerald-800", "bg-purple-800", "bg-stone-600"], note: "Vat and reactive dye — seasonal colourways" },
  { season: "Neutral All-Season", desc: "Greiges, soft whites, warm linens, slate greys", swatches: ["bg-stone-100", "bg-stone-200", "bg-stone-300", "bg-slate-300", "bg-zinc-400"], note: "Perennial bestsellers — always in production" },
  { season: "Bold Statement", desc: "Electric brights, high-contrast, trend-forward", swatches: ["bg-orange-500", "bg-fuchsia-600", "bg-cyan-500", "bg-yellow-400", "bg-violet-700"], note: "Seasonal colourway — lab dip approval required" },
];

const OEM_MODULES = [
  { num: "01", title: "Construction & Fabric Selection", desc: "Specify fabric type, GSM, fibre blend — sourced from certified Pakistan mills to your exact requirement." },
  { num: "02", title: "Print & Pattern Development", desc: "Your artwork, print placement and colour separations managed by our in-house team. Lab strike-off before bulk." },
  { num: "03", title: "Size & Shape Specification", desc: "Standard square and oblong sizes, or custom dimensions with your seam allowance and construction notes." },
  { num: "04", title: "Label & Brand Programme", desc: "Woven care labels, brand neck labels, swing tags and wash instruction labels — all to your brand specification." },
  { num: "05", title: "Retail & E-commerce Packaging", desc: "Polybag, retail box, pair-pack, display band — tailored to your fulfilment method and retail channel." },
];

const SECTORS = [
  { abbr: "ID", name: "Interior Design Brands", detail: "USA · EU design brands sourcing OEM seasonal collections", market: "USA · EU" },
  { abbr: "HR", name: "Home Retail Chains", detail: "UK, USA and Australian home retailers — programme buying", market: "UK · USA · Australia" },
  { abbr: "EC", name: "E-commerce / DTC", detail: "Direct-to-consumer and online-first home brands", market: "Global" },
  { abbr: "HH", name: "Hotel / Hospitality", detail: "Branded cushion covers for lobbies, rooms and F&B spaces", market: "Middle East · EU · USA" },
  { abbr: "GT", name: "Seasonal / Gift Trade", detail: "Seasonal gifting, Christmas and holiday home collections", market: "Worldwide" },
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
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight; buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all inland and ocean logistics. Lowest price, highest buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard bulk export" },
  { icon: "🎁", label: "Retail Box", note: "Single or pair-pack" },
  { icon: "👥", label: "Pair-Pack", note: "Two covers per set" },
  { icon: "🏷️", label: "Display Band", note: "Retail shelf-ready" },
  { icon: "📦", label: "Bulk Carton", note: "No individual packing" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton for all cotton constructions — fully traceable supply chain." },
  { icon: "💧", title: "Water Efficiency", desc: "Enzyme wash and low-liquor dyeing reduce water consumption versus conventional reactive dyeing." },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester available for velour and printed polyester constructions." },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited factories. Worker welfare and fair wage compliance verified." },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "Reactive dyeing with OEKO-TEX certified chemicals only. No azo dyes or restricted substances." },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags and FSC-certified paper packaging available for retail and e-commerce programmes." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Share construction, size, closure type, design intent, quantity and target delivery via our RFQ form." },
  { num: "02", title: "Factory Matching", desc: "We shortlist 2–3 Pakistan factories specialising in home furnishing. Pricing within 3–5 working days." },
  { num: "03", title: "Sample Production", desc: "Pre-production samples produced to your construction, print and size specification. 15–20 days from spec lock." },
  { num: "04", title: "Sample Approval", desc: "Review construction, print quality, colour, closure and label. Revise as needed before purchase order." },
  { num: "05", title: "Bulk Production", desc: "Full production commences on PO placement. Duration depends on quantity, print complexity and factory scheduling." },
  { num: "06", title: "QC & Shipment", desc: "Pre-shipment inspection, carton packing and FCL/LCL loading from Karachi or Port Qasim." },
];

const FAQS = [
  { q: "What fabric works best for indoor decorative cushion covers?", a: "Cotton plain weave for printable retail designs — it accepts reactive print with excellent colour fidelity. Linen or linen-blend for luxury natural lifestyle. Jacquard damask for premium interior or hotel lobbies where woven pattern carries the design. Velvet for seasonal statement pieces and Middle Eastern hospitality." },
  { q: "What size is most commonly ordered for cushion covers?", a: "45×45 cm and 50×50 cm are the most universally ordered sizes for standard throw cushion inserts. 40×40 cm suits smaller accent cushions; 60×60 cm suits floor cushions and large sofa pieces. The 30×50 cm oblong is the standard lumbar size. Include all sizes in your RFQ for a consolidated quote." },
  { q: "Can I order cushion covers with printed designs?", a: "Yes. All-over reactive print and screen placement print are both available on cotton constructions. For photographic print quality, sublimation on polyester constructions delivers the most accurate reproduction. Supply your artwork file — we manage colour separation, strike-off approval and print matching before bulk production." },
  { q: "What closure should I specify for retail cushion covers?", a: "Concealed zip is the most commercial closure for mainstream retail — clean finish, washable, professional appearance. Button closure adds a design detail and suits artisan or country-style ranges. Envelope overlap suits basic value retail and hospitality bulk supply." },
  { q: "Are cushion covers available in OEKO-TEX certified materials?", a: "Yes. OEKO-TEX Standard 100 certification is available across cotton and linen constructions and is mandatory for EU and UK retail compliance. GOTS-certified organic cotton is available for natural lifestyle programmes. Specify your certification requirement in your RFQ." },
  { q: "What order quantities work for seasonal cushion cover programmes?", a: "Seasonal cushion cover programmes typically involve a structured size and colourway run. Include your target quantity per SKU in your RFQ — we match you with factories experienced in home furnishing seasonal programmes and advise on the most cost-efficient quantity and colourway structure." },
];

const PAGE_SIBLINGS = [
  { title: "Bedsheets", desc: "Custom cotton percale and sateen bedsheets for wholesale buyers.", href: "/hometextile/bedlinen/bedsheets/", img: "/images/hero/hero-bedsheets.webp", alt: "Pakistan bedsheet manufacturer" },
  { title: "Fitted Sheets", desc: "Elasticated fitted sheets with precision pocket depth engineering.", href: "/hometextile/bedlinen/fittedsheets/", img: "/images/hero/hero-fitted-sheets.webp", alt: "Pakistan fitted sheet manufacturer" },
  { title: "Duvet Covers", desc: "Button, zip and envelope duvet covers in percale and jacquard.", href: "/hometextile/bedlinen/duvetcovers/", img: "/images/hero/hero-duvet-covers.webp", alt: "Pakistan duvet cover manufacturer" },
  { title: "Pillow Covers", desc: "Oxford and plain pillowcases in cotton, sateen and linen.", href: "/hometextile/bedlinen/pillowcovers/", img: "/images/hero/hero-pillow-covers.webp", alt: "Pakistan pillow cover manufacturer" },
  { title: "Curtains", desc: "Blackout, sheer and jacquard curtains with all heading types.", href: "/hometextile/bedlinen/curtains/", img: "/images/hero/hero-curtains.webp", alt: "Pakistan curtain manufacturer" },
  { title: "Institutional Bedding", desc: "Commercial-grade bedding for hotels, hospitals and airlines.", href: "/hometextile/bedlinen/institutionalbedding/", img: "/images/hero/hero-institutional-bedding.webp", alt: "Pakistan institutional bedding manufacturer" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function CushionCoversContent() {
  const [activeConstruction, setActiveConstruction] = useState("zip");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CLOSURES.find((c) => c.id === activeConstruction) ?? CLOSURES[0];

  return (
    <div className="overflow-x-clip">

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-cushion-covers.webp"
            fill
            alt="Pakistan cushion cover manufacturer — decorative pillow covers for wholesale buyers in USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/bedlinen/" className="hover:text-gold transition-colors">Bed Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Cushion Covers</span>
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
              Cushion Cover
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
              MZ Global Trading sources decorative and functional cushion covers from Pakistan&rsquo;s certified textile factories. Cotton, linen, jacquard and velour constructions. Square and rectangular sizes. Zip, button and envelope closure. OEKO-TEX and GOTS certified. FOB / CIF export.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">→</span>
              </Link>
              <button
                onClick={() => scrollToId("bento-grid")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Cushion Cover Guide
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

      {/* ═══════ STATS ANCHOR ═══════ */}
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
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Cushion Cover Supply — Pakistan Home Textiles</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Decorative Cushion Covers from Pakistan&rsquo;s Certified Factories
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Interior brands, home retailers and hospitality buyers in the USA, UK and Europe source cushion covers for visual appeal, tactile quality and wash durability. Pakistan&rsquo;s certified factories deliver across all standard sizes and construction types.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "5", label: "Standard Sizes" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
            <Link href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit">
              Request a Quote <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════ BENTO GRID ═══════ */}
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
              className="bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏗️</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Construction</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-xs font-semibold text-navy-900 leading-tight">{c.name}</p>
                    <p className="text-[10px] text-teal-600 mt-1 leading-snug">{c.market.split(" · ")[0]}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-cyan-50 border border-cyan-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🔒</span>
                <div>
                  <p className="text-cyan-600 text-xs font-semibold tracking-[0.2em] uppercase">Closure</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Closure Systems</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {CLOSURES.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl px-4 py-3 border border-cyan-100 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-cyan-100 text-cyan-700 text-xs font-bold flex items-center justify-center shrink-0">{c.code}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-snug">{c.spec}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-closures" label="Explore Closures" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">📐</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Size Standards</h3>
              <div className="flex flex-col gap-2 flex-1">
                {SIZES.map((s) => (
                  <div key={s.size} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" aria-hidden="true" />
                    <p className="text-xs font-semibold text-navy-900">{s.size}</p>
                    <p className="text-[10px] text-sky-500 ml-auto">{s.label}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="View Sizes" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Design</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Pattern &amp; Print</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DESIGN_OPTIONS.slice(0, 5).map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <span className="text-sm" aria-hidden="true">{d.icon}</span>
                    <p className="text-xs font-semibold text-navy-900">{d.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-design" label="Explore Design" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🌈</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-3 flex-1">
                {COLOUR_PALETTES.map((p) => (
                  <div key={p.season} className="bg-white rounded-xl p-2.5 border border-rose-50">
                    <p className="text-[10px] font-semibold text-navy-900 mb-1.5">{p.season}</p>
                    <div className="flex gap-1">
                      {p.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${s}`} aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colours" label="Explore Colours" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM &amp; Custom</h3>
              <div className="flex flex-col gap-2 flex-1">
                {OEM_MODULES.map((m) => (
                  <div key={m.num} className="flex items-start gap-2">
                    <span className="text-gold text-xs font-bold mt-0.5 shrink-0">{m.num}</span>
                    <p className="text-xs text-gray-600 leading-snug">{m.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore OEM" />
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-indigo-100">
                    <p className="text-xs font-bold text-indigo-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Markets" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
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
              className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
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
              className="lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[220px]">
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
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-purple-50 border border-purple-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[220px]">
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
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

      {/* ═══════ RESOURCES ROW ═══════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/cushion-cover-filling-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Cushion Cover Filling &amp; Construction</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fabric types, closure options, print techniques and filling compatibility — what retail buyers need to know before specifying.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link href="/guides/decorative-cushion-cover-sourcing/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Decorative Cushion Cover Sourcing</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fabric selection, reactive digital vs. rotary screen print, seasonal planning and MOQ structure for retail and hospitality programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Guide →</span>
            </Link>
            <Link href="/downloads/cushion-cover-artwork-brief-template/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Cushion Cover Artwork Brief</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fill-in artwork brief template covering fabric, print technique, closure, size range table and certification fields.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Download →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Cushion Covers?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, size and closure confirmed — RFQ takes 3 minutes. Factory match within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 1 — CONSTRUCTIONS — MOODBOARD UI ═══════ */}
      <section id="section-constructions" className="bg-[#FAF9F7] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Construction</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Cushion Cover Fabric Constructions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ transform: `rotate(${c.rotate})` }}
                className={`${c.color} rounded-2xl p-7 shadow-md border border-white flex flex-col gap-4`}
              >
                <h3 className="text-lg font-bold text-navy-900">{c.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 italic">&ldquo;{c.mood}&rdquo;</p>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Best for</p>
                  <p className="text-xs text-navy-900 font-semibold">{c.market}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ SECTION 2 — CLOSURES — TECHNICAL UI ═══════ */}
      <section id="section-closures" className="bg-[#080E1A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-12">
            <div className="w-px h-16 bg-gold/40 mt-1 hidden sm:block" aria-hidden="true" />
            <div>
              <p className="font-mono text-gold/70 text-xs tracking-[0.3em] uppercase mb-2">[TECHNICAL SPECIFICATION — CLOSURE ENGINEERING]</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Cushion Cover Closure Engineering</h2>
              <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
                Closure type determines functional performance, visual finish and wash durability. Each system has distinct specifications and fabric compatibility requirements.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {CLOSURES.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeConstruction === c.id}
                onClick={() => setActiveConstruction(c.id)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeConstruction === c.id
                    ? "bg-gold text-navy-900 border-gold"
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-gold/40"
                }`}
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
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-2xl font-bold text-white">{ac.name}</h3>
                  <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">{ac.code}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">OPENING_WIDTH</p>
                    <p className="text-sm font-bold text-gold">{ac.opening}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">HARDWARE_SPEC</p>
                    <p className="text-sm text-white">{ac.hardware}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{ac.detail}</p>
                <div className="border border-white/10 rounded-xl p-4">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">WASH_DURABILITY</p>
                  <p className="text-sm text-gray-300">{ac.washDurability}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">SPEC_OVERVIEW</p>
                  <p className="text-sm text-gray-300">{ac.spec}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">BEST_FOR[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.bestFor.split(" · ").map((b) => (
                      <span key={b} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════ SECTION 3 — SIZES — BENTO UI ═══════ */}
      <section id="section-sizes" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sizing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Cushion Cover Size Standards</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Standard sizes ship with universal fill compatibility. Custom dimensions available — specify in your RFQ with seam allowance requirement.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SIZES.map((s, i) => (
              <motion.div
                key={s.size}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="bg-teal-50 border border-teal-100 rounded-2xl p-5 flex flex-col gap-3 items-center text-center"
              >
                <div className={`bg-teal-200/60 rounded-lg ${i < 4 ? `w-${8 + i * 4} h-${8 + i * 4}` : i === 4 ? "w-16 h-10" : "w-12 h-8 border-2 border-dashed border-teal-400 bg-transparent"}`} aria-hidden="true" style={{ width: `${Math.min(32 + i * 8, 64)}px`, height: `${i === 4 ? 40 : i === 5 ? 32 : Math.min(32 + i * 8, 64)}px` }} />
                <p className="text-sm font-bold text-navy-900">{s.size}</p>
                <p className="text-xs font-semibold text-teal-600">{s.label}</p>
                <p className="text-[10px] text-gray-500 leading-snug">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ SECTION 4 — DESIGN — MAXIMALIST UI ═══════ */}
      <section id="section-design" className="bg-[#FFF5E6] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Design</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Pattern &amp; Print Options for Cushion Covers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DESIGN_OPTIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white border-2 border-amber-200 rounded-2xl p-7 flex flex-col gap-3 hover:border-gold hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">{d.icon}</span>
                  <h3 className="text-lg font-bold text-navy-900">{d.name}</h3>
                </div>
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">{d.method}</p>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{d.best}</p>
                <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
                  <p className="text-xs text-amber-800">{d.note}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Market fit</p>
                  <p className="text-xs text-navy-900 font-semibold">{d.best.split(".")[0]}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ SECTION 5 — COLOURS — GRADIENT UI ═══════ */}
      <section id="section-colours" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-cyan-900 to-[#0D1B2A]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Colour Programs for Cushion Covers</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">
            Every construction supports full PMS colour matching. Seasonal palettes sourced to trend direction. Lab dip approval before bulk production.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {COLOUR_PALETTES.map((p, i) => (
              <motion.div
                key={p.season}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-2">
                  {p.swatches.map((s, idx) => (
                    <div key={idx} className={`w-7 h-7 rounded-full border-2 border-white/20 ${s}`} aria-hidden="true" />
                  ))}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{p.season}</h3>
                  <p className="text-xs text-white/50 mt-0.5">{p.note}</p>
                </div>
                <p className="text-sm text-white/70 leading-relaxed flex-1">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center">Illustrative palettes — full PMS range available via reactive dyeing. Lab dip approval before bulk.</p>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════ SECTION 6 — OEM — MODULAR UI ═══════ */}
      <section id="section-oem" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM &amp; Custom</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Custom Cushion Cover Development</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every module of your cushion cover programme can be specified to your brand requirements — from fabric construction through to retail-ready packaging. We coordinate the entire development pipeline.
              </p>
              <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-800 transition-colors">
                Start Your Programme <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4">
              {OEM_MODULES.map((m, i) => (
                <motion.div
                  key={m.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-gold hover:shadow-xs transition-all flex items-start gap-4"
                >
                  <span className="w-10 h-10 rounded-xl bg-gold/10 text-gold text-sm font-bold flex items-center justify-center shrink-0">{m.num}</span>
                  <div>
                    <h3 className="text-sm font-bold text-navy-900 mb-1">{m.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ SECTION 7 — MARKETS — CINEMATIC UI ═══════ */}
      <section id="section-markets" className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Markets</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Cushion Cover Market Sectors</h2>
          <p className="text-white/50 mb-12 max-w-2xl leading-relaxed">
            Decorative cushion covers serve a range of commercial channels, each with distinct specification, branding and volume requirements.
          </p>
          <div className="space-y-4">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 border border-white/10 rounded-2xl px-6 py-5 hover:border-gold/40 transition-colors group"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 text-gold text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                  {s.abbr}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{s.name}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{s.detail}</p>
                </div>
                <span className="text-xs font-semibold text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full whitespace-nowrap">{s.market}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════ SECTION 8 — CERTIFICATIONS — GLASSMORPHISM ═══════ */}
      <section id="section-certs" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-800 to-teal-900" aria-hidden="true" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Quality Certifications for Cushion Covers</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">
            Our certified factory network holds 10 international standard certifications across chemical safety, social compliance and organic fibre programmes.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-5 flex flex-col items-center gap-3 hover:bg-white/20 transition-colors"
              >
                <div className="w-full h-12 flex items-center justify-center">
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={80} height={48} className="object-contain max-h-12" />
                </div>
                <p className="text-white text-xs font-bold text-center">{c.name}</p>
                <p className="text-white/50 text-[10px] text-center leading-snug">{c.full}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════ SECTION 9 — EXPORT — DARK MODE UI ═══════ */}
      <section id="section-export" className="bg-[#111827] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-teal-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Export Terms &amp; Packaging</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            Cushion covers ship from Karachi or Port Qasim under internationally recognised Incoterms. Packaging options range from individual polybag to retail-ready presentation.
          </p>
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-teal-400 text-xs font-semibold tracking-wider uppercase mb-4">Incoterms</p>
              <div className="flex flex-col gap-3">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-teal-500/40 transition-colors">
                    <span className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 text-sm font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <div>
                      <p className="text-white font-semibold">{e.full}</p>
                      <p className="text-teal-400 text-xs mt-0.5">{e.port}</p>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-teal-400 text-xs font-semibold tracking-wider uppercase mb-4">Packaging Options</p>
              <div className="flex flex-col gap-3 mb-6">
                {PACK_OPTIONS.map((p) => (
                  <div key={p.label} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5">
                    <span className="text-xl" aria-hidden="true">{p.icon}</span>
                    <div>
                      <p className="text-white text-sm font-semibold">{p.label}</p>
                      <p className="text-gray-500 text-xs">{p.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-900/30 border border-amber-500/30 rounded-xl px-5 py-4">
                <p className="text-amber-400 text-xs font-semibold mb-1">⚠ Lead Time Notice</p>
                <p className="text-amber-200/80 text-xs leading-relaxed">Lead times are indicative only and subject to factory scheduling, material availability and order complexity.</p>
              </div>
            </div>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════ SECTION 10 — SUSTAINABILITY — FLAT DESIGN UI ═══════ */}
      <section id="section-sustainability" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Ethics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Sustainable Cushion Cover Sourcing</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Sustainability standards for home furnishings are tightening in the EU, UK and USA. Our sourcing network is aligned with the certifications your buyers require.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-colors"
              >
                <span className="text-2xl shrink-0" aria-hidden="true">{s.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-navy-900 mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ SECTION 11 — PROCESS — CARD-BASED UI ═══════ */}
      <section id="section-process" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">How We Source Your Cushion Cover Programme</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            From RFQ submission to shipment — a transparent, stage-managed process with clear communication at every step.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-3 hover:border-gold hover:shadow-xs transition-all"
              >
                <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">{p.num}</span>
                <h3 className="text-base font-bold text-navy-900">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 flex items-start gap-3">
            <span className="text-amber-500 text-lg shrink-0" aria-hidden="true">⚠</span>
            <p className="text-amber-800 text-sm leading-relaxed">Lead times are indicative only and subject to factory scheduling, material availability and order complexity.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2 text-center">Common Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10 text-center">Cushion Cover FAQs</h2>
          <div className="flex flex-col divide-y divide-gray-100">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                  aria-expanded={faqOpen === i}
                >
                  <span className="text-base font-semibold text-navy-900 leading-snug">{faq.q}</span>
                  <span className={`shrink-0 w-6 h-6 rounded-full border-2 border-gold flex items-center justify-center text-gold text-sm font-bold transition-transform ${faqOpen === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
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
                      <p className="text-gray-500 text-sm leading-relaxed pt-4">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PAGE BOXES — SAME MENU LEVEL ═══════ */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Bed Linen Collection</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore More Bed Linen Products</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAGE_SIBLINGS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow"
              >
                <Link href={card.href} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={card.img} alt={card.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-1.5">{card.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                      Explore {card.title} →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Get Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Source Cushion Covers?</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
              Construction, size, closure and design confirmed — our RFQ takes 3 minutes. Factory match and quotation returned within 3–5 working days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:border-gold hover:text-gold transition-colors text-base">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
