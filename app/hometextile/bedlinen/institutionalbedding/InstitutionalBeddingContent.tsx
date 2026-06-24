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
            ? "border border-gold/60 text-[#D4A017] hover:bg-gold hover:text-navy-900"
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
        >↑</motion.span>
        Move back to top
      </button>
      <style>{`@keyframes btt-pulse{0%{box-shadow:0 0 0 0 rgba(212,160,23,0.45)}70%{box-shadow:0 0 0 10px rgba(212,160,23,0)}100%{box-shadow:0 0 0 0 rgba(212,160,23,0)}}`}</style>
    </div>
  );
}

function ExploreBtn({ sectionId, label }: { sectionId: string; label: string }) {
  return (
    <button onClick={() => scrollToId(sectionId)}
      className="group self-start inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold transition-colors mt-auto pt-4">
      {label}<span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">→</span>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCT_TYPES = [
  {
    id: "bedsheets",
    name: "Institutional Flat Sheets",
    construction: "Percale or Oxford Weave 65/35 cotton-poly",
    tc: "200–300 TC",
    washRating: "200+ cycles @ 70°C",
    elastic: "N/A",
    sectors: ["Hotels", "Healthcare", "Hospitals"],
    sizes: ["Single", "Double", "Queen", "King (custom)"],
    spec: "65/35 poly-cotton percale or oxford weave, 200–260 TC. Double-needle stitched hem for wash durability. White and natural. 200+ commercial wash cycles at 70°C.",
  },
  {
    id: "fittedsheets",
    name: "Institutional Fitted Sheets",
    construction: "Oxford Weave or Percale 65/35 cotton-poly",
    tc: "200–280 TC",
    washRating: "150+ cycles @ 70°C",
    elastic: "All-around reinforced elastic",
    sectors: ["Hotels", "Healthcare", "Student Accommodation"],
    sizes: ["Single 90×190 cm", "Double 135×190 cm", "Queen 150×200 cm"],
    spec: "Reinforced all-around elastic (2 cm). Oxford weave for best wash-cycle elastic durability. 18-inch deep pocket standard for hotel mattresses.",
  },
  {
    id: "pillowcovers",
    name: "Institutional Pillow Covers",
    construction: "Percale 65/35 cotton-poly",
    tc: "200–260 TC",
    washRating: "200+ cycles @ 70°C",
    elastic: "Envelope or zip closure",
    sectors: ["Hotels", "Hospitals", "Airlines"],
    sizes: ["Standard 50×75 cm", "King 50×90 cm"],
    spec: "Envelope closure for easy changing. Full envelope overlap (15 cm minimum) to prevent pillow exposure. Colour-fast reactive dye.",
  },
  {
    id: "duvet",
    name: "Institutional Duvet Covers",
    construction: "Percale or plain weave 65/35 cotton-poly",
    tc: "200–260 TC",
    washRating: "100+ cycles @ 60°C",
    elastic: "Button or envelope closure",
    sectors: ["Hotels", "Student Accommodation", "Guesthouses"],
    sizes: ["Single 135×200 cm", "Double 200×200 cm", "King 220×220 cm"],
    spec: "Button closure for institutional housekeeping efficiency. Corner tie loops. Colour-fast white or pastel. 100+ wash cycles at 60°C.",
  },
];

const WASH_PERFORMANCE = [
  { cycles: "50", label: "Consumer retail baseline", color: "bg-gray-200", width: 20 },
  { cycles: "75", label: "Mid-market hospitality standard", color: "bg-sky-300", width: 35 },
  { cycles: "100", label: "Premium hotel / budget contract", color: "bg-blue-400", width: 50 },
  { cycles: "150", label: "Contract hospitality — our specification", color: "bg-indigo-700", width: 65, highlight: true },
  { cycles: "200+", label: "Healthcare / institutional — our top specification", color: "bg-[#9A6400]", width: 100, highlight: true },
];

const SECTORS = [
  {
    id: "hotel",
    name: "Hotels & Hospitality",
    detail: "Hotel bedding programmes from limited-service to 5-star. White and pastel collections, coordinate sets, deep-pocket fitted sheets for pillow-top mattresses. We regularly supply for both small boutique hotels and large hotel group tenders.",
    specs: ["200–300 TC percale or cotton-poly", "White or PMS colour", "Deep-pocket fitted sheets", "Coordinate sets (sheet + pillow cover)"],
    markets: "USA · UK · UAE · Australia",
    color: "border-blue-200 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    id: "healthcare",
    name: "Healthcare & Hospitals",
    detail: "Healthcare bedding engineered for 60–90°C wash tolerance, fluid repellent finishes and maximum colour fastness. Our sourcing team identifies factories with ISO 13485 or ISO 9001 healthcare textile experience.",
    specs: ["Oxford weave or plain weave cotton-poly", "60–90°C wash tolerance", "Fluid repellent finish available", "OEKO-TEX certified chemicals"],
    markets: "UK · EU · USA · Middle East",
    color: "border-green-200 bg-green-50",
    badge: "bg-green-100 text-green-700",
  },
  {
    id: "airline",
    name: "Airlines & Inflight",
    detail: "Airline bedding requires certified weight control, consistent dimensions and flame retardant finishes. Our factories supply aircraft bedding including flat sheets, pillow covers and duvet covers to airline specifications.",
    specs: ["Consistent weight ±5g tolerance", "FR finish available", "Compact packaging for galley carts", "Batch certification per delivery"],
    markets: "Gulf carriers · European airlines · Asian carriers",
    color: "border-purple-200 bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    id: "student",
    name: "Student Accommodation",
    detail: "Universities and student residence operators in the UK, USA and Australia require durable bedding in standardised single-bed sizes. Budget-grade cotton-poly percale at 200–220 TC is the most commercially ordered specification.",
    specs: ["Single bed (90×190 cm) fitted sheets", "Budget cotton-poly 200–220 TC", "Colour-coded by floor / block available", "Bulk institutional packaging"],
    markets: "UK · USA · Australia · Canada",
    color: "border-orange-200 bg-orange-50",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    id: "prison",
    name: "Government & Correctional",
    detail: "Government contracts and correctional facility bedding require strict compliance with procurement standards. We can supply certified cotton-poly bedding to government specification tenders in the UK, USA and Australia.",
    specs: ["100% cotton or cotton-poly options", "Audit-ready factory documentation", "Bulk packing per tender specification", "ISO 9001 certified"],
    markets: "UK · USA · Australia · EU",
    color: "border-slate-200 bg-slate-50",
    badge: "bg-slate-100 text-slate-700",
  },
];

const FIBRE_BLENDS = [
  { blend: "100% Cotton", note: "Superior feel and breathability. Preferred for premium hotel and healthcare applications where natural fibre is specified.", washTolerance: "60°C sustained", sustainability: "BCI / GOTS options", pct: 35 },
  { blend: "65/35 Cotton-Poly", note: "The dominant institutional specification. Poly enhances dimensional stability, reduces ironing time and extends wash-cycle life.", washTolerance: "70–90°C", sustainability: "GRS for poly content", pct: 55, featured: true },
  { blend: "50/50 Cotton-Poly", note: "Balanced blend — slightly softer feel than 65/35 at comparable durability. Used in mid-market hotel programmes.", washTolerance: "70°C", sustainability: "GRS options", pct: 10 },
];

const CLOSURES = [
  { type: "Envelope Overlap", icon: "◻", best: "Flat sheets, pillow covers", note: "15 cm overlap minimum. No hardware — fastest institutional housekeeping. Most common hotel specification." },
  { type: "Button Closure", icon: "⊙", best: "Duvet covers", note: "3–5 buttons per cover. Button colour matched or contrast. Institutional choice for duvet covers." },
  { type: "Concealed Zip", icon: "⋮", best: "Premium duvet covers", note: "Side or bottom zip. Preferred for luxury hotel duvet programmes. Higher unit cost than button." },
  { type: "Colour Coding", icon: "◈", best: "Large institutions (hospitals, universities)", note: "Different colourways for bed sizes or wards. Prevents mis-matching in high-volume laundry operations." },
];

const CERTIFICATIONS = [
  { name: "ISO 9001", full: "Quality Management", desc: "Quality management system — required by most hotel and healthcare procurement teams", tier: "Required", img: "/images/certs/cert-iso-9001.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — EU and UK healthcare import requirement", tier: "Required", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance", desc: "Social compliance audit — required by major hotel groups and retailers", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data", desc: "Labour, health and safety data sharing platform", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "GOTS", full: "Global Organic Textile", desc: "Organic cotton programmes — EU and USA organic certification requirement", tier: "Optional", img: "/images/certs/cert-gots.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled polyester content verification — for cotton-poly blends", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Production", desc: "12-principle manufacturing compliance", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "SA8000", full: "Social Accountability", desc: "Highest social audit standard — worker rights and wages", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Sustainable cotton farming practices", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Price covers goods to port. Buyer&rsquo;s freight forwarder handles onward shipping — most common for large institutional orders." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange freight and marine insurance to your destination port. Quoted price is door-to-port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "Ocean freight arranged by us. Marine insurance arranged by buyer." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics. Lowest quoted price, maximum buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Bulk Carton", detail: "Standard institutional: 12 pcs / carton for sheets, 24 pcs for pillow covers. Master carton barcoding available.", note: "Most common" },
  { icon: "🔢", label: "Dozen Banded", detail: "Polybag banded in dozens (12 pcs). Hotel and hospital housekeeping standard.", note: "Hotel standard" },
  { icon: "🏷️", label: "Colour-Coded Polybag", detail: "Colour-coded polybags by bed size or ward. Simplifies sorting in large laundry operations.", note: "Large institutions" },
  { icon: "📋", label: "Delivery Note Pack", detail: "Factory-sealed carton with delivery note, inspection report and certification copies per shipment.", note: "Tender compliance" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", color: "bg-[#9A6400]" },
  { stage: "Sample / Pre-Production", days: "10–15", color: "bg-blue-700" },
  { stage: "Bulk Production", days: "40–60", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", color: "bg-slate-600" },
  { stage: "Sea Freight to Destination", days: "20–30", color: "bg-teal-700" },
];

const SUSTAINABILITY = [
  { icon: "♻️", title: "Recycled Poly Blend", desc: "GRS-certified recycled polyester replaces virgin poly in 65/35 blends. Carbon intensity reduced without affecting wash durability." },
  { icon: "🌱", title: "BCI Better Cotton", desc: "BCI-certified cotton available for institutional programmes where natural fibre is specified. Traceable to farm level." },
  { icon: "💧", title: "Low-Water Processing", desc: "Reactive and vat dyeing with closed-loop water treatment at our partner mills. Effluent treatment certified." },
  { icon: "⚖️", title: "BSCI & SA8000 Audited", desc: "Social compliance independently audited. Worker welfare, wages and safe conditions verified on every factory in our network." },
  { icon: "📦", title: "Bulk Packaging Efficiency", desc: "Institutional bulk packaging uses up to 70% less plastic than retail pack. No single-use gift boxes in institutional supply." },
  { icon: "🔋", title: "Energy Certification", desc: "Selected mills carry ISO 50001 energy management certification. Energy use per kg fabric tracked and reported." },
];

const PROCESS_STEPS = [
  { num: "01", title: "RFQ Submission", desc: "Complete our RFQ with product type, fibre blend, TC, size specification, quantity per SKU and delivery target. Institutional orders may include a tender reference." },
  { num: "02", title: "Factory Shortlist", desc: "We match your specification to 2–3 certified mills with institutional bedding experience. Factories pre-vetted for wash-cycle tolerance documentation and certification stack." },
  { num: "03", title: "Sample Production", desc: "Pre-production samples including wash test reports (number of cycles, dimensional change after washing, colour fastness measurement). Typically 10–15 working days." },
  { num: "04", title: "Approval & Purchase Order", desc: "Review samples, confirm spec, approve lab dip colours. Issue purchase order. Factory schedule confirmed within 48 hours." },
  { num: "05", title: "Bulk Production & QC", desc: "Full quantity produced to approved specification. In-line and pre-shipment quality checks including 100% dimensional inspection and defect rate below AQL 2.5." },
  { num: "06", title: "Shipment & Documentation", desc: "FCL or LCL from Karachi. Full documentation: packing list, commercial invoice, certificate of origin, test reports and certification copies per shipment." },
];

const FAQS = [
  {
    q: "What thread count specification is standard for hotel bedding?",
    a: "The commercial hotel standard sits at 200–260 TC in 65/35 cotton-poly percale or oxford weave. This range balances wash durability (100–200 commercial cycles at 70°C), acceptable hand feel and competitive pricing. Premium hotel groups may specify 280–300 TC for superior-category rooms. Budget hotels and student accommodation typically specify 200–220 TC.",
  },
  {
    q: "Can institutional bedding be produced in custom colourways?",
    a: "Yes. White is the default institutional specification for hospitals and airlines, but hotels and student accommodation programmes frequently specify light pastels, branded colours or colour-coded systems. PMS-matched reactive dyeing is standard across all constructions. Lab dip approval is included before bulk production.",
  },
  {
    q: "What wash cycle rating should I specify for hospital bedding?",
    a: "Hospital linen in the UK NHS standard requires bedding to withstand 100–200 cycles at 60–90°C without significant dimensional change or loss of colour fastness. Cotton-poly blends (65/35) outperform 100% cotton at sustained high-temperature wash cycles. For intensive healthcare use, we recommend specifying minimum 150 cycles at 70°C as part of the tender requirement.",
  },
  {
    q: "Can you supply matching complete bed sets (sheets + pillow covers + duvet covers)?",
    a: "Yes — this is our primary offering for hotel programmes. Coordinate sets sourced from the same factory ensure consistent thread count, colour match and construction across the complete set. Request all components in a single RFQ — single-source supply simplifies procurement and ensures set consistency from delivery to delivery.",
  },
  {
    q: "What documentation is provided for tender compliance?",
    a: "Each shipment comes with: commercial invoice, packing list, certificate of origin (Form E or GSP as required), test reports (wash fastness, dimensional stability, pilling resistance), factory certification copies (ISO 9001, OEKO-TEX etc.) and pre-shipment inspection report. Specific documentation formats for government tender compliance can be confirmed before order.",
  },
  {
    q: "Is there a difference between institutional and retail bedding from Pakistan?",
    a: "The core difference is engineering priority: institutional bedding is optimised for wash-cycle durability, dimensional stability and procurement compliance. Retail bedding prioritises hand feel, visual presentation and packaging. Institutional grades use heavier needle-gauge stitching, wider hems, reinforced seams and poly-cotton blends rated for commercial laundry. Retail products use finer finishing and premium packaging inappropriate for laundry-scale operations.",
  },
];

const PAGE_BOXES = [
  { title: "Bedsheets", desc: "Custom flat bedsheets in percale, sateen, jacquard and oxford weave. 200–600 TC for retail and contract programmes.", image: "/images/hero/hero-bedsheets.webp", alt: "Pakistan bedsheet manufacturer — wholesale cotton percale and sateen flat sheets", href: "/hometextile/bedlinen/bedsheets/", cta: "Explore Bedsheets" },
  { title: "Fitted Sheets", desc: "Elasticated fitted sheets with pocket depths from 14 to 26+ inches. Percale and sateen. Hotel and retail specification.", image: "/images/hero/hero-fitted-sheets.webp", alt: "Pakistan fitted sheet manufacturer — deep pocket elasticated sheets wholesale", href: "/hometextile/bedlinen/fittedsheets/", cta: "Explore Fitted Sheets" },
  { title: "Duvet Covers", desc: "Custom comforter covers in percale and sateen. Button, zip and envelope closure options for retail and hotel.", image: "/images/hero/hero-duvet-covers.webp", alt: "Pakistan duvet cover manufacturer — custom comforter covers wholesale export", href: "/hometextile/bedlinen/duvetcovers/", cta: "Explore Duvet Covers" },
  { title: "Pillow Covers", desc: "Cotton and linen pillowcases in standard, queen and oxford flange styles. Retail and institutional specifications.", image: "/images/hero/hero-pillow-covers.webp", alt: "Pakistan pillow cover manufacturer — custom pillowcases wholesale export", href: "/hometextile/bedlinen/pillowcovers/", cta: "Explore Pillow Covers" },
  { title: "Cushion Covers", desc: "Decorative cushion covers in woven, embroidered and printed styles for home furnishing and hospitality markets.", image: "/images/hero/hero-cushion-covers.webp", alt: "Pakistan cushion cover manufacturer — decorative throw pillow covers wholesale", href: "/hometextile/bedlinen/cushioncovers/", cta: "Explore Cushion Covers" },
  { title: "Curtains", desc: "Woven, jacquard and blackout curtains with heading and lining options. Hospitality and retail.", image: "/images/hero/hero-curtains.webp", alt: "Pakistan curtain manufacturer — custom woven and blackout curtains wholesale", href: "/hometextile/bedlinen/curtains/", cta: "Explore Curtains" },
];

// ─── Main component ────────────────────────────────────────────────────────────

export default function InstitutionalBeddingContent() {
  const [activeProduct, setActiveProduct] = useState("bedsheets");
  const [activeSector, setActiveSector] = useState("hotel");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const ap = PRODUCT_TYPES.find((p) => p.id === activeProduct) ?? PRODUCT_TYPES[0];
  const as_ = SECTORS.find((s) => s.id === activeSector) ?? SECTORS[0];

  return (
    <div className="overflow-x-clip">

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-institutional-bedding.webp"
            fill
            alt="Pakistan institutional bedding manufacturer — commercial-grade bedsheets and bed linen for hotels, hospitals and student accommodation in USA, UK and Europe"
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
              <span className="text-gold">Institutional Bedding</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Institutional Bedding Export</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Institutional<br />Bedding<br />
              <span className="text-gold">Manufacturer</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading sources commercial-grade institutional bedding from Pakistan&rsquo;s
              certified mills. Engineered for 100–200 commercial wash cycles at 70–90&deg;C.
              Hotels, hospitals, airlines and student accommodation. ISO 9001, OEKO-TEX certified.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link prefetch={false} href="/rfq/"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <button onClick={() => scrollToId("bento-grid")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Explore Product Guide
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

      {/* ════════════════════════════════════════════════════════════════════
          STATS ANCHOR
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-navy-900 rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Institutional Bedding Supply — Pakistan</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Contract-Grade Bedding from Pakistan&rsquo;s Certified Mills</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">Institutional bedding occupies a distinct engineering tier from retail — wash-cycle durability, dimensional stability and compliance documentation are the primary procurement criteria. Our sourcing partners operate with decades of contract bedding experience.</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "200+", label: "Wash Cycles" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
            <Link prefetch={false} href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit">
              Request a Quote <span aria-hidden="true">&#8594;</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          BENTO GRID
      ════════════════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Institutional Bedding — Full Specification</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">Click any card to navigate to the full detailed section.</p>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-3 bg-navy-900 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏨</span>
                <div>
                  <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Product Range</p>
                  <h3 className="text-xl font-bold text-white mt-0.5">Institutional Bedding Products</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {PRODUCT_TYPES.map((p) => (
                  <div key={p.id} className="bg-white/8 border border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5">
                    <p className="text-sm font-semibold text-white">{p.name}</p>
                    <p className="text-xs text-gold/70">{p.tc}</p>
                    <p className="text-xs text-gray-500">{p.washRating}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.sectors.slice(0, 2).map((s) => (
                        <span key={s} className="text-[10px] font-semibold text-gray-300 bg-white/10 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-products" label="Explore Product Range" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📊</span>
                <div>
                  <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Performance</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Wash Cycle Ratings</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {WASH_PERFORMANCE.map((w) => (
                  <div key={w.cycles} className={`rounded-xl px-3.5 py-2.5 flex items-center gap-3 ${w.highlight ? "bg-navy-900" : "bg-white border border-indigo-100"}`}>
                    <span className={`text-sm font-black w-14 shrink-0 ${w.highlight ? "text-gold" : "text-gray-300"}`}>{w.cycles}</span>
                    <div className="flex-1">
                      <div className="w-full h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${w.color}`} style={{ width: `${w.width}%` }} aria-hidden="true" />
                      </div>
                    </div>
                    <p className={`text-[10px] leading-tight w-28 shrink-0 ${w.highlight ? "text-gray-300" : "text-gray-500"}`}>{w.label}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-performance" label="View Wash Performance" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[250px]">
              <span className="text-2xl" aria-hidden="true">🧶</span>
              <p className="text-emerald-600 text-xs font-semibold tracking-[0.2em] uppercase">Fibre</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Fibre Blends</h3>
              <div className="flex flex-col gap-2 flex-1">
                {FIBRE_BLENDS.map((f) => (
                  <div key={f.blend} className={`bg-white rounded-xl p-3 border ${f.featured ? "border-gold" : "border-emerald-50"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-navy-900">{f.blend}</p>
                      {f.featured && <span className="text-[10px] text-gold">Most used</span>}
                    </div>
                    <p className="text-[10px] text-emerald-600">{f.washTolerance}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-fibre" label="View Fibre Options" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[250px]">
              <span className="text-2xl" aria-hidden="true">🔒</span>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Closure</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Closure Types</h3>
              <div className="flex flex-col gap-2 flex-1">
                {CLOSURES.map((c) => (
                  <div key={c.type} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-amber-50">
                    <span className="text-amber-500 text-sm shrink-0 mt-0.5" aria-hidden="true">{c.icon}</span>
                    <p className="text-xs font-semibold text-navy-900">{c.type}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-closure" label="Explore Closures" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[250px]">
              <span className="text-2xl" aria-hidden="true">🏅</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Certifications</h3>
              <div className="grid grid-cols-5 gap-1.5 flex-1 content-start">
                {CERTIFICATIONS.slice(0, 10).map((c) => (
                  <div key={c.name} className="bg-white rounded-lg border border-sky-100 flex items-center justify-center p-1" style={{ height: 36 }}>
                    <Image src={c.img} alt={c.name} width={50} height={28} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[250px]">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export Terms</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-slate-100">
                    <span className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <p className="text-xs font-semibold text-navy-900">{e.full}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏥</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Sectors</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Institutional Sectors Served</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 flex-1">
                {SECTORS.map((s) => (
                  <span key={s.id} className={`px-4 py-2 rounded-xl text-xs font-semibold border ${s.badge}`}>{s.name}</span>
                ))}
              </div>
              <ExploreBtn sectionId="section-sectors" label="Explore Sector Details" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
              <span className="text-2xl" aria-hidden="true">🌿</span>
              <p className="text-lime-700 text-xs font-semibold tracking-[0.2em] uppercase">Ethics</p>
              <h3 className="text-xl font-bold text-navy-900">Sustainable Supply</h3>
              <div className="flex flex-col gap-2 flex-1">
                {SUSTAINABILITY.slice(0, 4).map((s) => (
                  <div key={s.title} className="flex items-center gap-2.5">
                    <span className="text-base" aria-hidden="true">{s.icon}</span>
                    <p className="text-xs font-semibold text-navy-900">{s.title}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-500 pl-7">+ 2 more sustainability standards</p>
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          RESOURCES ROW
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Institutional Bedding Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link prefetch={false} href="/knowledge/institutional-bedding-spec-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Institutional Bedding Specification Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Thread count by sector, wash-cycle durability standards and certification requirements for hotel, hospital and airline programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link prefetch={false} href="/guides/sourcing-institutional-bedding-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Sourcing Institutional Bedding from Pakistan</p>
              <p className="text-xs text-gray-500 leading-relaxed">7-step guide covering laundry standard, TC selection, fibre blend, certification and packing for hotel, hospital and airline programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Guide →</span>
            </Link>
            <Link prefetch={false} href="/downloads/institutional-bedding-spec-template/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Institutional Bedding Spec Template</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fill-in form covering laundry standard, thread count, size range, certification and performance test requirements for tender submissions.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Download →</span>
            </Link>
            <Link prefetch={false} href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Get Started</p>
              <p className="font-semibold text-white">Ready to Source Institutional Bedding?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Product type, TC, quantity and delivery date — submit your RFQ and receive factory shortlist with indicative pricing in 3–5 days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 — PRODUCT RANGE — DASHBOARD UI
      ════════════════════════════════════════════════════════════════════ */}
      <section id="section-products" className="bg-navy-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Product Range</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Institutional Bedding Product Types</h2>
          <div className="flex flex-wrap gap-2 mb-6" role="tablist">
            {PRODUCT_TYPES.map((p) => (
              <button key={p.id} role="tab" aria-selected={activeProduct === p.id}
                onClick={() => setActiveProduct(p.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeProduct === p.id ? "bg-gold text-navy-900 border-gold" : "bg-white/5 text-gray-300 border-white/10 hover:border-gold/40"
                }`}>
                {p.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeProduct} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{ap.name}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "CONSTRUCTION", val: ap.construction },
                    { label: "THREAD COUNT", val: ap.tc },
                    { label: "WASH RATING", val: ap.washRating },
                    { label: "ELASTIC", val: ap.elastic },
                  ].map((row) => (
                    <div key={row.label} className="bg-white/5 rounded-xl p-4">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{row.label}</p>
                      <p className="text-sm font-semibold text-white">{row.val}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white/5 rounded-xl p-5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">FULL SPECIFICATION</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{ap.spec}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">AVAILABLE SIZES</p>
                  <div className="flex flex-wrap gap-2">
                    {ap.sizes.map((s) => <span key={s} className="text-xs text-white bg-white/10 px-3 py-1 rounded-full">{s}</span>)}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">TARGET SECTORS</p>
                  <div className="flex flex-wrap gap-2">
                    {ap.sectors.map((s) => <span key={s} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{s}</span>)}
                  </div>
                </div>
                <div className="bg-gold rounded-2xl p-6">
                  <p className="text-navy-900 font-bold mb-2 text-sm">Request This Product</p>
                  <p className="text-navy-900/70 text-xs mb-4">Include product type, TC, size and quantity in your RFQ for a factory-specific quotation.</p>
                  <Link prefetch={false} href="/rfq/" className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:underline">Request a Quote →</Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — WASH PERFORMANCE — DATA VISUALISATION UI
      ════════════════════════════════════════════════════════════════════ */}
      <section id="section-performance" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Performance Data</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Wash Cycle Performance: Why Institutional Grade Matters</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Consumer bedding is typically tested to 50 wash cycles. Institutional bedding is engineered and tested to 100–200 commercial wash cycles at 60–90&deg;C. The construction, fibre blend and finishing are fundamentally different engineering decisions.</p>
          <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Wash Cycle Benchmark Comparison</p>
              <div className="flex flex-col gap-4">
                {WASH_PERFORMANCE.map((w) => (
                  <div key={w.cycles} className={`rounded-2xl p-5 border-2 ${w.highlight ? "border-gold bg-gold/5" : "border-gray-100 bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <p className={`text-xl font-bold ${w.highlight ? "text-navy-900" : "text-gray-500"}`}>{w.cycles} Cycles</p>
                      {w.highlight && <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full">Our Specification</span>}
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div className={`h-full rounded-full ${w.color} transition-all duration-700`} style={{ width: `${w.width}%` }} aria-hidden="true" />
                    </div>
                    <p className={`text-xs ${w.highlight ? "text-gray-600" : "text-gray-500"}`}>{w.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Construction Factors for Wash Durability</p>
              <div className="flex flex-col gap-4">
                {[
                  { factor: "Fibre Blend", detail: "65/35 cotton-poly provides greater dimensional stability than 100% cotton under repeated commercial wash heat. Poly binds moisture, preventing shrinkage." },
                  { factor: "Needle Gauge & Stitch Density", detail: "Heavy gauge double-needle stitching (4 mm stitch length minimum) on hems prevents seam separation after 100+ cycles." },
                  { factor: "Dye Class", detail: "Vat dye is the highest wash-fastness option — ISO 105 C10 Grade 4–5 colour fastness after 200 cycles at 70°C. Reactive dye is acceptable to 100 cycles." },
                  { factor: "Finishing Chemistry", detail: "OEKO-TEX certified finishing chemicals prevent residue build-up in commercial laundry equipment. Anti-shrink treatment locks fibre dimensions." },
                  { factor: "Elastic Specification", detail: "Institutional fitted sheets use 2 cm all-around reinforced elastic — standard 1.5 cm elastic degrades at high-temperature commercial cycles." },
                ].map((f, i) => (
                  <motion.div key={f.factor} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="border border-gray-100 rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-navy-900 mb-1.5">{f.factor}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — SECTORS — CORPORATE SWITCHER UI
      ════════════════════════════════════════════════════════════════════ */}
      <section id="section-sectors" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Market Sectors</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Sectors We Supply</h2>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {SECTORS.map((s) => (
              <button key={s.id} role="tab" aria-selected={activeSector === s.id}
                onClick={() => setActiveSector(s.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  activeSector === s.id ? "bg-navy-900 text-white border-navy-900 shadow-xs" : "bg-white text-gray-600 border-gray-200 hover:border-navy-900/40"
                }`}>
                {s.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeSector} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              className={`rounded-2xl border-2 p-8 lg:p-10 ${as_.color}`}>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">{as_.name}</h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-6">{as_.detail}</p>
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Key Markets</p>
                    <p className="text-sm font-semibold text-navy-900">{as_.markets}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Standard Specifications for This Sector</p>
                  <div className="flex flex-col gap-3">
                    {as_.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                        <div className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                        <p className="text-sm text-gray-600">{spec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 — FIBRE BLENDS — MATERIAL DESIGN UI
      ════════════════════════════════════════════════════════════════════ */}
      <section id="section-fibre" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fibre Specification</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Fibre Blends for Institutional Bedding</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {FIBRE_BLENDS.map((f, i) => (
              <motion.div key={f.blend} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className={`rounded-2xl overflow-hidden shadow-xs border-2 ${f.featured ? "border-gold" : "border-gray-100"}`}>
                <div className={`h-2 ${f.featured ? "bg-gold" : "bg-gray-100"}`} aria-hidden="true" />
                <div className="p-7">
                  {f.featured && <span className="inline-block mb-3 text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>}
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
                    <p className="text-emerald-700 font-black text-lg">{f.pct}%</p>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{f.blend}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{f.note}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Wash Tolerance</p>
                      <p className="text-xs font-bold text-navy-900">{f.washTolerance}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Sustainability</p>
                      <p className="text-xs font-bold text-navy-900">{f.sustainability}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 — CLOSURE & HOUSEKEEPING — ISOMETRIC UI
      ════════════════════════════════════════════════════════════════════ */}
      <section id="section-closure" className="bg-[#F5F5F0] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Housekeeping Specification</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Closures &amp; Housekeeping Efficiency</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Institutional bedding closures are selected for housekeeping team efficiency, not retail presentation. A hotel turning 200 rooms per day saves minutes per room across thousands of bed changes.</p>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {CLOSURES.map((c, i) => (
              <motion.div key={c.type} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-xs">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold flex items-center justify-center text-xl shrink-0">{c.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900">{c.type}</h3>
                    <p className="text-xs text-gold font-semibold mt-0.5">{c.best}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{c.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-navy-900 rounded-2xl p-8">
            <h3 className="text-gold font-bold mb-2">Colour-Coding Systems</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">Large institutions (hospitals, university residences) frequently specify colour-coded bedding by ward, floor or bed size. Colour differentiation dramatically reduces mis-sorting in industrial laundry operations. All constructions available in 4–8 colour variants per order — specify colour-code system in your RFQ.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 6 — CERTIFICATIONS — MONOCHROME UI
      ════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-[#111] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Certifications for Institutional Procurement</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Institutional procurement requires documented certification — hotel chains, NHS trusts, government and airline procurement processes all specify minimum certification requirements in tenders.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-gold/30 transition-all">
                <div className="h-10 flex items-center justify-center">
                  <Image src={c.img} alt={`${c.name} certification`} width={72} height={40} className="object-contain max-h-10 grayscale hover:grayscale-0 transition-all" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{c.name}</h3>
                  <p className="text-[10px] text-white/40 mt-0.5 leading-snug">{c.full}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${c.tier === "Required" ? "bg-gold/20 text-gold" : c.tier === "Premium" ? "bg-blue-400/20 text-blue-300" : c.tier === "Standard" ? "bg-green-400/20 text-green-400" : "bg-white/10 text-white/40"}`}>
                  {c.tier}
                </span>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 7 — EXPORT & PACKAGING — SWISS DESIGN UI
      ════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="w-8 h-1 bg-gold mb-5" aria-hidden="true" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-3">Export Terms</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Export &amp; Logistics</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">Karachi is Pakistan&rsquo;s primary export port for institutional linen — well-connected via regular shipping lines to the USA, UK, EU, Middle East and Australia. We handle FCL and LCL shipments with full documentation for customs clearance and tender compliance.</p>
              <div className="flex flex-col gap-3">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-start gap-4 border-b border-gray-100 pb-4">
                    <span className="w-12 h-12 rounded-xl bg-navy-900 text-gold text-xs font-black flex items-center justify-center shrink-0">{e.term}</span>
                    <div>
                      <p className="text-sm font-bold text-navy-900">{e.full}</p>
                      <p className="text-xs text-gold mt-0.5">{e.port}</p>
                      <p className="text-xs text-gray-500 mt-1.5 leading-relaxed" dangerouslySetInnerHTML={{ __html: e.desc }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="w-8 h-1 bg-gray-200 mb-5" aria-hidden="true" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-3">Packaging</p>
              <h3 className="text-xl font-bold text-navy-900 mb-6">Institutional Packaging Options</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {PACK_OPTIONS.map((p) => (
                  <div key={p.label} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <span className="text-2xl mb-3 block" aria-hidden="true">{p.icon}</span>
                    <p className="text-sm font-bold text-navy-900 mb-1">{p.label}</p>
                    <p className="text-xs text-gold font-semibold mb-2">{p.note}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{p.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-4">Indicative Lead Time (Institutional Orders)</p>
              <div className="flex flex-col gap-2">
                {LEAD_STAGES.map((s) => (
                  <div key={s.stage} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <div className={`w-3 h-3 rounded-full shrink-0 ${s.color}`} aria-hidden="true" />
                    <p className="text-sm text-navy-900 flex-1">{s.stage}</p>
                    <span className="text-xs font-bold text-gray-500 shrink-0">{s.days} days</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <p className="text-xs text-amber-800">Lead times are indicative only and subject to factory scheduling, material availability and order complexity.</p>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 8 — SUSTAINABILITY — SCANDINAVIAN UI
      ════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-[#F9FAF8] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Responsible Supply</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Sustainable Institutional Sourcing</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Government and institutional procurement increasingly requires evidence of environmental and social responsibility. Our factories and sourcing process are built to meet these standards.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUSTAINABILITY.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 flex flex-col gap-4 border border-gray-100">
                <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 9 — OEM — GRID UI
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Custom Programmes</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">OEM &amp; Branded Institutional Bedding</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Hotel groups, healthcare networks and accommodation operators can source branded institutional bedding — woven labels, embroidered logos and branded packaging programmes all available.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: "01", title: "Branded Woven Labels", desc: "Custom woven care labels in English and destination-market languages. Hotel brand name, washing instructions and origin label." },
              { num: "02", title: "Embroidered Logo", desc: "Embroidered hotel or institution logo on flat sheets (hem), pillow covers (corner) and duvet covers (bottom corner). Thread count and placement to spec." },
              { num: "03", title: "Colour Programme", desc: "Matched colour programmes across sheets, pillow covers and duvet covers. Lab dip approval before bulk. Consistent across repeat orders." },
              { num: "04", title: "Bespoke Size Specification", desc: "Custom mattress dimensions outside of standard US/UK/EU sizing are accommodated. Confirm mattress dimensions and pocket depth in RFQ." },
              { num: "05", title: "Branded Institutional Packaging", desc: "Branded polybag or carton labels. QR code linking to product specs for procurement records. Master carton with delivery reference." },
              { num: "06", title: "Staggered Delivery Programme", desc: "Large institutional contracts can be delivered in scheduled tranches — factory holds production slots across the delivery programme period." },
            ].map((m, i) => (
              <motion.div key={m.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-2 border-gray-100 rounded-2xl p-7 hover:border-gold hover:shadow-xs transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 text-sm font-black flex items-center justify-center shrink-0">{m.num}</div>
                  <h3 className="text-sm font-bold text-navy-900">{m.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 10 — PROCESS — INFOGRAPHIC UI
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">How We Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Institutional Bedding Sourcing Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 text-8xl font-black text-gray-50 leading-none select-none" aria-hidden="true">{p.num}</div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-navy-900 text-gold text-sm font-black flex items-center justify-center mb-4">{p.num}</div>
                  <h3 className="text-base font-bold text-navy-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
            <p className="text-xs text-amber-800">Lead times and process timings are indicative. Institutional and tender orders may require additional time for documentation review and sample approval. Confirm all timelines before purchase order.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 11 — MARKETS — BRUTALIST UI
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export Markets</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Institutional Bedding Export Markets</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10 rounded-2xl overflow-hidden">
            {[
              { region: "USA & Canada", detail: "Hotel groups, healthcare systems, university accommodation and GSA government supply. OEKO-TEX and GOTS certification preferred.", icon: "🇺🇸" },
              { region: "UK & Europe", detail: "NHS and European healthcare. Hotel groups (IHG, Marriott, Hilton suppliers). BSCI and SA8000 required for major buyers.", icon: "🇬🇧" },
              { region: "Middle East", detail: "5-star hotel programmes across UAE, KSA, Qatar. Airline inflight bedding for Gulf carriers. White programme dominates.", icon: "🌍" },
              { region: "Australia & SE Asia", detail: "Student accommodation growth driven by university expansion. Healthcare linen for hospital networks.", icon: "🌏" },
            ].map((m, i) => (
              <motion.div key={m.region} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-7 border-r border-b border-white/10 last:border-r-0 hover:bg-white/5 transition-all">
                <span className="text-3xl mb-4 block" aria-hidden="true">{m.icon}</span>
                <h3 className="text-base font-bold text-white mb-2">{m.region}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{m.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { val: "50+", label: "Certified Factory Partners" },
              { val: "35+", label: "Countries Served" },
              { val: "95%", label: "On-Time Shipment Rate" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-gold">{s.val}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Institutional Bedding — Frequently Asked Questions</h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full text-left px-7 py-5 flex items-start justify-between gap-4" aria-expanded={faqOpen === i}>
                  <span className="text-sm font-semibold text-navy-900 leading-relaxed">{f.q}</span>
                  <span className={`text-gold font-bold text-xl shrink-0 transition-transform duration-200 ${faqOpen === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="px-7 pb-6 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PAGE BOXES — SIBLING BED LINEN PAGES
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Explore Bed Linen Range</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">More Bed Linen Products</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAGE_BOXES.map((card) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow">
                <Link prefetch={false} href={card.href} className="block">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={card.image} alt={card.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg mb-1">{card.title}</h3>
                    <p className="text-gray-300 text-xs leading-relaxed mb-2">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold group-hover:gap-3 transition-all duration-200">{card.cta} →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-navy-900 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Get Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Source Institutional Bedding?</h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto mb-8">Share your product type, TC specification, quantity and required wash-cycle rating — we respond with factory matches and indicative pricing within 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link prefetch={false} href="/rfq/"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-bold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20">
                Request a Quote <span aria-hidden="true">→</span>
              </Link>
              <Link prefetch={false} href="/contact-us/"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:border-gold hover:text-gold transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

