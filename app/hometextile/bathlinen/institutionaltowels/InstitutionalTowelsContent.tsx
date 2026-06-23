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
            : "border-2 border-gold text-navy-900 hover:bg-gold shadow-xs"
        }`}
        style={{
          animation: "btt-pulse 2.2s ease-out infinite",
        }}
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
        <style>{`
          @keyframes btt-pulse {
            0%   { box-shadow: 0 0 0 0 rgba(212,160,23,0.45); }
            70%  { box-shadow: 0 0 0 10px rgba(212,160,23,0); }
            100% { box-shadow: 0 0 0 0 rgba(212,160,23,0); }
          }
        `}</style>
      </button>
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
    id: "terry-loop",
    name: "Terry Loop",
    badge: "Most Common",
    gsm: "400–500 GSM",
    absorbency: "High — looped pile locks moisture on contact",
    durability: "200+ industrial wash cycles at 85°C",
    bestFor: ["Hospital Procurement", "Hotel Laundry", "Bulk Hospitality"],
    markets: ["USA", "UK", "EU", "Middle East", "Australia"],
    sizes: ["Face 30×30 cm", "Hand 40×70 cm", "Bath 70×140 cm"],
    detail:
      "Terry loop is the industry standard for institutional procurement. The uncut loop pile delivers maximum absorbency per GSM, withstands repeat industrial washing at high temperatures and maintains dimensional stability across hundreds of laundry cycles. Plain white terry is the universal institutional specification — compatible with all hospital-grade laundry chemistry.",
    spec: "100% ring-spun cotton. GSM 400–500. Industrial wash certified to 85°C. Anti-shrink / compacted finish standard. OEKO-TEX Standard 100 available.",
  },
  {
    id: "dobby-border",
    name: "Dobby Border Terry",
    badge: "Department ID",
    gsm: "420–550 GSM",
    absorbency: "High terry body — woven dobby border for identification",
    durability: "150+ industrial wash cycles — border colour-fast",
    bestFor: ["Department Coding", "Branded Hotels", "Tier Differentiation"],
    markets: ["USA", "UK", "EU", "Middle East"],
    sizes: ["Face 30×30 cm", "Hand 40×70 cm", "Bath 70×140 cm"],
    detail:
      "Dobby border terry retains full terry loop absorbency while adding a woven structural border — the standard method for department colour coding in large hotel and healthcare operations. Coloured borders identify towel categories (guest room vs spa vs pool), reducing mis-sorting in industrial laundry at scale. Border colour fastness is maintained to institutional wash standards.",
    spec: "100% cotton terry body with woven dobby border. GSM 420–550. Reactive-dyed border to ISO 105 X12 wash-fastness standard. Border colours: navy, green, red, burgundy, grey. OEKO-TEX available.",
  },
];

const SIZE_SPECS = [
  { size: "Face Towel", dims: "30×30 cm", weight: "36–45 g", gsm: "400–500 GSM", use: "Facial care — healthcare, spa, airline" },
  { size: "Hand Towel", dims: "40×70 cm", weight: "112–154 g", gsm: "400–550 GSM", use: "Bathroom hand drying — hotel rooms, washrooms" },
  { size: "Bath Towel", dims: "70×140 cm", weight: "392–539 g", gsm: "400–550 GSM", use: "Primary guest and patient bath towel" },
  { size: "Custom", dims: "To specification", weight: "Per GSM × area", gsm: "400–550 GSM", use: "Non-standard formats for specialist applications" },
];

const GSM_TIERS = [
  { gsm: "400–420", name: "Economy Institutional", use: "Budget hospitality, laundry cost reduction", pct: 40, color: "bg-slate-400", note: "Lower per-unit cost. Suitable for high-turnover operations." },
  { gsm: "420–480", name: "Standard Institutional", use: "Hotels 3–4★, hospitals, commercial laundry", pct: 70, color: "bg-gold", note: "Industry standard for most institutional programmes. Preferred weight range.", featured: true },
  { gsm: "480–550", name: "Premium Institutional", use: "Hotels 4–5★, luxury spa, executive healthcare", pct: 55, color: "bg-teal-500", note: "Premium hand-feel with institutional durability. Higher per-unit cost." },
];

const BORDER_OPTIONS = [
  { name: "Plain White", code: "WHT", use: "Universal — all sectors", note: "Zero sorting confusion. Preferred in healthcare.", swatch: "bg-white border-2 border-gray-200" },
  { name: "Navy Border", code: "NVY", use: "Guest rooms vs staff ID", note: "Most popular border colour for hotel tier differentiation.", swatch: "bg-navy-900" },
  { name: "Green Border", code: "GRN", use: "Healthcare / clinical areas", note: "Standard clinical colour code in UK NHS and EU healthcare.", swatch: "bg-emerald-600" },
  { name: "Red Border", code: "RED", use: "Pool / gym / spa towels", note: "Clear visual separation from room linen in hotel operations.", swatch: "bg-red-600" },
  { name: "Burgundy Border", code: "BRG", use: "Luxury tier — spa / premium rooms", note: "Popular with 5-star brands for premium tier identification.", swatch: "bg-red-900" },
  { name: "Grey Border", code: "GRY", use: "Neutral department coding", note: "Contemporary institutional look. Hides minor soiling.", swatch: "bg-gray-500" },
];

const PACK_TIERS = [
  { label: "By the Piece", qty: "1 pc", width: "100%", icon: "🏨", note: "Individual institutional use — rarely ordered this way" },
  { label: "By the Dozen", qty: "12 pcs banded", width: "82%", icon: "📦", note: "Minimum practical procurement unit for small hotels" },
  { label: "By the Case", qty: "120 pcs bulk", width: "64%", icon: "🗃️", note: "Standard institutional case pack — optimal shipping density" },
  { label: "By the Pallet", qty: "1,200–2,400 pcs", width: "45%", icon: "🚢", note: "Container-load procurement for large hotel groups and laundry chains" },
];

const OEM_COMPARISON = [
  { feature: "Construction", standard: "Terry loop", custom: "Terry loop or dobby border", bulk: "Both options" },
  { feature: "GSM", standard: "400–480", custom: "400–550 to spec", bulk: "Agreed specification" },
  { feature: "Colour", standard: "Plain white", custom: "White + border colour", bulk: "Plain white standard" },
  { feature: "Pack unit", standard: "Case (120 pcs)", custom: "Dozen or case", bulk: "Pallet / FCL" },
  { feature: "Label / tag", standard: "Generic care label", custom: "Branded woven label", bulk: "Generic or branded" },
  { feature: "Lead time*", standard: "20–30 days", custom: "35–50 days", bulk: "45–60 days" },
];

const SECTORS = [
  { abbr: "HT", name: "Hotels & Resorts", detail: "3–5★ properties, hotel groups, hospitality chains — room linen and spa supply", market: "USA · UK · EU · Middle East" },
  { abbr: "HC", name: "Healthcare", detail: "Hospitals, clinics, nursing homes — plain white terry to NHS and healthcare standards", market: "UK · EU · Australia" },
  { abbr: "LS", name: "Laundry Services", detail: "Commercial linen rental and laundry companies supplying hotels and healthcare", market: "USA · EU · Middle East" },
  { abbr: "CR", name: "Cruise Lines", detail: "Large volume case procurement for passenger cabin and spa operations", market: "Global" },
  { abbr: "SP", name: "Spa & Wellness", detail: "Day spas, resort wellness centres — premium institutional grades", market: "USA · UK · EU · Middle East" },
  { abbr: "AG", name: "Procurement Agents", detail: "Sourcing agents and import distributors serving institutional end buyers", market: "Worldwide" },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic cotton option — traceable from farm to finished institutional towel", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — required for EU import and healthcare procurement", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — standard for large hospitality group procurement", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health and safety data sharing for institutional buyers", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality — required for healthcare and NHS procurement", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "Manufacturing ethics compliance — 12-principle certification", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "Most rigorous social standard — worker rights, wages and conditions", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for institutional buyers with established freight forwarders." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "Freight and marine insurance arranged. Price delivered to your nominated port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight. Buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory. Lowest quoted price, maximum buyer control." },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Construction, GSM, size mix, pack format and volume confirmed with mill", color: "bg-gold" },
  { stage: "Sample / Swatch", days: "10–15", desc: "Pre-production sample or approved swatch dispatched for approval", color: "bg-slate-600" },
  { stage: "Bulk Production", days: "20–35", desc: "From confirmed purchase order and approved sample — institutional orders", color: "bg-teal-600" },
  { stage: "QC & Inspection", days: "2–4", desc: "Pre-shipment inspection: GSM, dimensional, wash-fastness verification", color: "bg-blue-600" },
  { stage: "Sea Freight", days: "18–28", desc: "FCL/LCL from Karachi or Port Qasim to destination port", color: "bg-indigo-600" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton Option", desc: "GOTS-certified organic cotton available for all institutional constructions — traceable from Pakistan farm to finished case pack.", tag: "GOTS" },
  { icon: "💧", title: "Water Reduction", desc: "Enzyme-based finishing replaces conventional processes — measurably lower water consumption per kilogram of terry processed.", tag: "Process" },
  { icon: "🏭", title: "Audited Factories", desc: "BSCI, Sedex and SA8000 audited mill partners. Worker welfare, safety and fair wage compliance independently verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Dyeing", desc: "Reactive dyes with OEKO-TEX certified chemistry only. ISO 105 X12 colour fastness maintained across industrial wash cycles.", tag: "OEKO-TEX" },
  { icon: "♻️", title: "Recyclable Packaging", desc: "Institutional case packs shipped in recyclable corrugated cartons. FSC-certified packaging available on request.", tag: "Packaging" },
  { icon: "📋", title: "Documentation Supplied", desc: "Full certification documentation — test reports, audit certificates, origin declarations — included with every shipment.", tag: "Compliance" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction, GSM, size mix, border requirement, pack format, volume and destination via our RFQ form." },
  { num: "02", title: "Mill Matching", short: "Sourcing", desc: "We evaluate and shortlist certified Pakistan terry mills whose GSM range, construction capability and export volume match your institutional programme. Quotation within 3–5 working days." },
  { num: "03", title: "Sample Approval", short: "Sampling", desc: "Pre-production sample or swatch produced and dispatched for dimensional, weight and colour-fastness verification. 10–15 days from spec lock." },
  { num: "04", title: "Purchase Order", short: "Confirmation", desc: "Review quotation, confirm specifications and pack format. Purchase order placed to lock mill capacity." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Full institutional batch produced. Independent pre-shipment inspection covers GSM, dimensions and wash-fastness before vessel loading." },
  { num: "06", title: "Export & Delivery", short: "Export", desc: "Case-packed or pallet-loaded. FCL or LCL from Karachi. Full certification documentation included with every shipment." },
];

const FAQS = [
  { q: "What GSM is recommended for institutional towels laundered industrially 200+ times?", a: "For heavy industrial laundry cycles at 85°C+, 420–480 GSM is the preferred institutional specification. This weight provides the balance of absorbency, dimensional stability and cost-per-launder efficiency most demanded by hotel and healthcare procurement. Lower GSM (400–420) is cost-effective for high-turnover operations where replacement frequency is managed by budget. Premium properties at 480–550 GSM carry higher individual cost but reduce guest dissatisfaction from towel quality deterioration." },
  { q: "What is the practical difference between plain white terry and dobby stripe border for hotel or hospital use?", a: "Plain white terry is the universal institutional choice — zero department-sorting confusion, compatible with all laundry chemistry including bleach, and lowest procurement cost. Dobby stripe border terry adds a structural woven border in a specified colour, which is the industry-standard method for department identification at scale: room linen vs spa vs pool towels. Large hotel operations and linen rental companies use border colour coding to eliminate mis-sorting in industrial laundry facilities handling thousands of pieces per cycle." },
  { q: "What pack configurations are available and what is the standard institutional case format?", a: "Standard institutional case pack is 120 pieces per carton — the industry-standard unit for hotel and healthcare procurement and container-load optimisation. Banded dozens (12 pcs) are also available for smaller operations or stock replenishment. Pallet quantities (1,200–2,400 pcs) are provided for large hotel groups and laundry services buying by the full container. Individual piece packing is not standard for institutional orders — carton-only configurations maintain the low per-unit cost that procurement managers require." },
  { q: "Can institutional towels be produced with specific department colour coding for our operation?", a: "Yes. Dobby border terry is produced with reactive-dyed woven borders in standard institutional colours: navy, green, red, burgundy and grey. Border colours are held to ISO 105 X12 wash-fastness, meaning they maintain identifiability across the full institutional laundry life. Colour selection is confirmed at sample stage before bulk production. Custom colour matching to a specific Pantone reference requires a minimum programme size and longer lead time — include your requirement in the RFQ." },
  { q: "Do you supply to procurement agents and linen rental companies, not just hotels directly?", a: "Yes. A significant portion of institutional terry supply goes through procurement agents, linen rental companies and hospitality distributors rather than directly to the end property. If you are sourcing on behalf of a hotel group, managing a linen rental fleet, or distributing to multiple hospitality end clients, the programme structure and pricing approach is the same. Include your procurement role in the RFQ so we can structure the quotation appropriately — particularly around volume aggregation across multiple delivery destinations." },
  { q: "What are typical indicative lead times for a first bulk institutional order?", a: "⚠ All lead times are indicative and subject to mill scheduling, fabric availability and inspection capacity at the time of order. Typical ranges: RFQ to quotation 3–5 working days. Pre-production sample 10–15 days from specification lock. Bulk production 20–35 days from confirmed purchase order and approved sample. Pre-shipment inspection 2–4 days. Sea freight 18–28 days from Karachi to European or US ports. First-time programmes include a sample approval stage before bulk production commencement." },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function InstitutionalTowelsContent() {
  const [activeConstruction, setActiveConstruction] = useState("terry-loop");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-institutional-towels.webp"
            fill
            alt="Pakistan institutional towel manufacturer — bulk hotel and healthcare terry supply for USA, UK and Europe"
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
              <Link prefetch={false} href="/hometextile/bathlinen/" className="hover:text-gold transition-colors">Bath Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Institutional Towels</span>
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
              Institutional
              <br />
              Towel <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              Bulk hotel and healthcare terry supply from Pakistan&rsquo;s certified mills.
              400&ndash;550 GSM plain white and dobby border terry. Supply by the case
              or by the container. OEKO-TEX and GOTS certified for USA, UK, Europe and worldwide.
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
                onClick={() => scrollToId("bento-grid")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Specifications
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

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS ANCHOR
      ═══════════════════════════════════════════════════════════════════════ */}
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
                Pakistan Towel Export — Institutional Volume Supply
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Built for Industrial Procurement, Not Retail Display
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Institutional terry is a procurement category, not a retail one. Cost-per-launder lifecycle, batch
                consistency and case-pack efficiency define this specification — and Pakistan&rsquo;s certified terry
                mills are built to deliver exactly that.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "400–550", label: "GSM Terry Range" },
                { val: "120", label: "Pcs per Case Pack" },
                { val: "35+", label: "Export Markets" },
                { val: "95%", label: "On-Time Delivery" },
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

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN BENTO GRID
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Specifications</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1: Constructions + Size Range */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏭</span>
                <div>
                  <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Construction</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Terry Constructions</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-4 border border-slate-200 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-600 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {c.id === "terry-loop" ? "TL" : "DB"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                        {c.badge && (
                          <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{c.gsm}</p>
                      <p className="text-xs text-slate-600 mt-0.5 leading-snug">{c.bestFor[0]}</p>
                    </div>
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
              className="bg-gray-50 border border-gray-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📏</span>
                <div>
                  <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase">Dimensions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Standard Size Range</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {SIZE_SPECS.map((s) => (
                  <div key={s.size} className="bg-white rounded-xl px-4 py-3 border border-gray-200 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {s.size.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{s.size}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.dims} · {s.gsm}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-snug">{s.use}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="View Size Details" />
            </motion.div>
          </div>

          {/* Row 2: 4 compact bentos */}
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
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Grades</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-xl p-3 border border-amber-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-navy-900">{t.gsm}</span>
                      {t.featured && (
                        <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Standard</span>
                      )}
                    </div>
                    <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: t.pct + "%" }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] text-gray-500 leading-snug">{t.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View GSM Guide" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Border Colour Coding</h3>
              <div className="flex flex-col gap-2 flex-1">
                {BORDER_OPTIONS.slice(0, 4).map((b) => (
                  <div key={b.code} className="flex items-center gap-2.5 bg-gray-50 rounded-lg px-3 py-2">
                    <div className={`w-5 h-5 rounded-full ${b.swatch} shrink-0`} aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{b.name}</p>
                      <p className="text-[10px] text-gray-500">{b.use}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-border" label="View All Options" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">📦</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Volume</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Pack Configurations</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PACK_TIERS.map((t) => (
                  <div key={t.label} className="bg-white rounded-lg px-3 py-2 border border-sky-100">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs" aria-hidden="true">{t.icon}</span>
                      <p className="text-xs font-semibold text-navy-900">{t.label}</p>
                    </div>
                    <p className="text-[10px] text-sky-600 font-medium">{t.qty}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-packing" label="View Pack Details" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM &amp; Volume</h3>
              <div className="flex flex-col gap-2 flex-1">
                {OEM_COMPARISON.slice(0, 4).map((r) => (
                  <div key={r.feature} className="flex items-start gap-2">
                    <span className="text-gold text-xs font-bold mt-0.5 shrink-0">▸</span>
                    <p className="text-xs text-gray-600 leading-snug"><span className="font-semibold text-navy-900">{r.feature}:</span> {r.custom}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore OEM" />
            </motion.div>
          </div>

          {/* Row 3: 5-col 2+2+1 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Sectors</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-blue-100">
                    <p className="text-xs font-bold text-blue-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Sectors" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-purple-50 border border-purple-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Quality Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-white/80 backdrop-blur-xs rounded-xl border border-purple-100 flex items-center justify-center p-2" style={{ height: 56 }}>
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
                      <p className="text-[10px] text-gray-500">{e.port}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* Row 4: 3-col 2+1 */}
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
              className="lg:col-span-1 bg-gray-50 border border-gray-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
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

      {/* ═══════════════════════════════════════════════════════════════════════
          RESOURCES ROW
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link prefetch={false} href="/knowledge/institutional-towel-standards/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Institutional Towel Standards: Healthcare, Hospitality & Gym Requirements</p>
              <p className="text-xs text-gray-500 leading-relaxed">GSM thresholds, laundry durability standards and OEKO-TEX requirements by sector — hospital, hotel and gym.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link prefetch={false} href="/guides/bulk-institutional-towel-sourcing/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Bulk Institutional Towel Sourcing: MOQ, Lead Times & Compliance</p>
              <p className="text-xs text-gray-500 leading-relaxed">MOQ, blanket order structure, OEKO-TEX and BSCI compliance, and Pakistan mill lead times for hospital and hotel buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Guide →</span>
            </Link>
            <Link prefetch={false} href="/downloads/institutional-towel-tech-pack/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Institutional Towel Tech Pack Template</p>
              <p className="text-xs text-gray-500 leading-relaxed">GSM, laundry performance, certification, packing and logistics fields — complete and attach to your RFQ.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Template →</span>
            </Link>
            <Link prefetch={false} href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Institutional Towels?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, GSM and case quantity confirmed — RFQ takes 3 minutes. Mill match and pricing within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — CONSTRUCTIONS — INDUSTRIAL UI + SCORECARD
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-slate-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-12">
            <div className="w-1 h-16 bg-gold shrink-0 mt-1" aria-hidden="true" />
            <div>
              <p className="font-mono text-gold/70 text-xs tracking-[0.3em] uppercase mb-2">
                [INDUSTRIAL SPECIFICATION — TERRY CONSTRUCTIONS]
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Institutional Terry Constructions</h2>
              <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">
                Two constructions cover all institutional requirements. Selection is driven by procurement objective — cost-per-launder efficiency or department identification.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConstruction(c.id)}
                aria-pressed={activeConstruction === c.id}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeConstruction === c.id
                    ? "bg-gold text-navy-900 border-gold"
                    : "bg-white/5 text-slate-300 border-white/10 hover:border-gold/40"
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
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-white">{ac.name}</h3>
                  {ac.badge && (
                    <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">{ac.badge}</span>
                  )}
                </div>
                {/* Scorecard rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { label: "GSM RANGE", val: ac.gsm },
                    { label: "ABSORBENCY", val: ac.absorbency },
                    { label: "DURABILITY", val: ac.durability },
                  ].map((row) => (
                    <div key={row.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">{row.label}</p>
                      <p className="text-sm text-white font-medium">{row.val}</p>
                    </div>
                  ))}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">AVAILABLE SIZES</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ac.sizes.map((s) => (
                        <span key={s} className="text-[11px] text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{ac.detail}</p>
                <div className="border border-white/10 rounded-xl p-4 mt-5">
                  <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">TECHNICAL_SPEC</p>
                  <p className="text-sm text-slate-300">{ac.spec}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3">BEST_FOR[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.bestFor.map((b) => (
                      <span key={b} className="text-xs text-white bg-white/10 px-3 py-1 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3">KEY_MARKETS[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => (
                      <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — SIZE RANGE — TECHNICAL UI + TABLE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-sizes" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-4">No. 02 / Dimensions</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-4 leading-tight">
              Standard Institutional<br />Size Specifications
            </h2>
            <div className="w-12 h-1 bg-gold mb-6" aria-hidden="true" />
            <p className="text-gray-500 leading-relaxed max-w-2xl">
              All sizes produced to standard institutional dimensions. Custom formats available — include target dimensions and GSM in your RFQ.
            </p>
          </div>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[540px]">
              <div className="grid grid-cols-5 bg-navy-900 rounded-t-2xl px-5 py-3 text-xs font-bold text-white uppercase tracking-widest">
                <span>Size</span>
                <span>Dimensions</span>
                <span>Approx Weight</span>
                <span>GSM Range</span>
                <span>Primary Use</span>
              </div>
              {SIZE_SPECS.map((s, i) => (
                <div
                  key={s.size}
                  className={`grid grid-cols-5 px-5 py-4 text-sm border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <span className="font-semibold text-navy-900">{s.size}</span>
                  <span className="text-gray-700 font-mono">{s.dims}</span>
                  <span className="text-gray-600">{s.weight}</span>
                  <span className="text-gold font-semibold">{s.gsm}</span>
                  <span className="text-gray-500 text-xs">{s.use}</span>
                </div>
              ))}
              <div className="bg-gray-50 rounded-b-2xl px-5 py-3 border border-t-0 border-gray-100">
                <p className="text-xs text-gray-500">All weights are indicative — actual weight varies ±5% per production batch. Custom dimensions available on request.</p>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — GSM WEIGHT — DASHBOARD UI + BAR CHART
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-gsm" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Selection</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">GSM Weight Grades for Institutional Procurement</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {GSM_TIERS.map((t, i) => (
              <motion.div
                key={t.gsm}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className={`rounded-2xl p-8 border ${t.featured ? "bg-navy-900 border-gold/30 ring-1 ring-gold/20" : "bg-white border-gray-200"}`}
              >
                {t.featured && (
                  <span className="inline-block text-[10px] font-semibold text-gold bg-gold/15 border border-gold/30 px-3 py-1 rounded-full mb-4">
                    Industry Standard
                  </span>
                )}
                <p className={`text-4xl font-bold mb-1 ${t.featured ? "text-gold" : "text-navy-900"}`}>{t.gsm}</p>
                <p className={`text-sm font-semibold mb-4 ${t.featured ? "text-white" : "text-navy-900"}`}>{t.name}</p>
                <div className={`w-full h-2 rounded-full mb-4 ${t.featured ? "bg-white/10" : "bg-gray-100"}`}>
                  <div className={`h-full rounded-full ${t.color}`} style={{ width: t.pct + "%" }} aria-hidden="true" />
                </div>
                <p className={`text-xs mb-3 font-medium ${t.featured ? "text-gold/80" : "text-gray-500"}`}>{t.use}</p>
                <p className={`text-sm leading-relaxed ${t.featured ? "text-gray-300" : "text-gray-500"}`}>{t.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — BORDER / COLOUR — MINIMAL UI + TILE LAYOUT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-border" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-300 mb-5">No. 04 / Colour Programme</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-5 leading-tight">Border Colour Coding for Department Identification</h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Plain white is the universal institutional default. Dobby border terry adds a structural woven colour stripe — the industry-standard method for separating room linen from spa, pool and clinical stocks in large laundry operations.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BORDER_OPTIONS.map((b) => (
              <motion.div
                key={b.code}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-3 items-center text-center p-5 rounded-2xl border border-gray-100 hover:border-gray-300 transition-colors"
              >
                <div className={`w-12 h-12 rounded-full ${b.swatch}`} aria-hidden="true" />
                <div>
                  <p className="text-xs font-mono text-gray-500 tracking-widest">{b.code}</p>
                  <p className="text-sm font-semibold text-navy-900 mt-0.5">{b.name}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{b.use}</p>
                </div>
                <p className="text-[10px] text-gray-500 leading-snug">{b.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — PACK CONFIGURATIONS — INFOGRAPHIC UI + FUNNEL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-packing" className="bg-sky-950 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Volume Procurement</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Pack Configurations — From Single Piece to Full Container</h2>
          <p className="text-sky-300 mb-12 max-w-2xl text-sm leading-relaxed">
            Institutional procurement is structured by volume unit — not individual piece. The case pack (120 pcs) is the standard procurement unit optimised for container shipping density and laundry handling efficiency.
          </p>
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            {PACK_TIERS.map((tier, i) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ marginLeft: `${i * 32}px`, marginRight: `${i * 32}px` }}
                className="bg-white/10 border border-white/20 rounded-2xl p-5 flex items-center gap-5"
              >
                <span className="text-3xl shrink-0" aria-hidden="true">{tier.icon}</span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <p className="text-white font-bold text-base">{tier.label}</p>
                    <p className="text-gold font-semibold text-sm">{tier.qty}</p>
                  </div>
                  <p className="text-sky-300 text-xs mt-1 leading-snug">{tier.note}</p>
                </div>
                {i === 2 && (
                  <span className="shrink-0 text-[10px] font-bold text-gold bg-gold/15 border border-gold/30 px-2.5 py-1 rounded-full">Standard</span>
                )}
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM / VOLUME — CORPORATE UI + COMPARISON TABLE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-teal-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM &amp; Volume</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Custom Institutional Specifications Comparison</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Standard institutional orders use white terry in established specifications. Custom OEM programmes allow branded labels, specific GSM targets and bulk container arrangements tailored to group procurement.
          </p>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[520px]">
              <div className="grid grid-cols-4 bg-navy-900 text-white rounded-t-2xl overflow-hidden">
                <div className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Specification</div>
                <div className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-center">Standard</div>
                <div className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-center bg-gold/20 text-gold">Custom OEM</div>
                <div className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-center">Container Bulk</div>
              </div>
              {OEM_COMPARISON.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-4 border-b border-teal-100 ${i % 2 === 0 ? "bg-white" : "bg-teal-50/50"}`}
                >
                  <div className="px-5 py-4 text-sm font-semibold text-navy-900">{row.feature}</div>
                  <div className="px-5 py-4 text-sm text-gray-600 text-center">{row.standard}</div>
                  <div className="px-5 py-4 text-sm text-navy-900 font-medium text-center bg-gold/5">{row.custom}</div>
                  <div className="px-5 py-4 text-sm text-gray-600 text-center">{row.bulk}</div>
                </div>
              ))}
              <div className="bg-teal-50 rounded-b-2xl px-5 py-3">
                <p className="text-xs text-gray-500">⚠ Lead times are indicative. Custom OEM programmes include a sample approval stage before bulk production commencement.</p>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKETS / SECTORS — GRID UI + SECTOR TILES
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-blue-950 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Industry Applications</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Institutional Terry Export Markets &amp; Buyer Sectors</h2>
          <p className="text-blue-300 text-sm mb-10 max-w-2xl leading-relaxed">
            Institutional towel programmes are placed by hotel groups, healthcare procurement offices, linen rental companies and hospitality distributors across 35+ export markets.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-white/10 text-gold font-bold text-xs flex items-center justify-center">{s.abbr}</span>
                  <p className="font-bold text-white">{s.name}</p>
                </div>
                <p className="text-blue-200 text-sm leading-relaxed mb-3">{s.detail}</p>
                <p className="text-[11px] font-semibold text-gold/70">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS — GLASSMORPHISM + LOGO GRID
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-gradient-to-br from-purple-950 via-indigo-950 to-navy-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Compliance</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Institutional Towel Quality Certifications</h2>
          <p className="text-purple-300 text-sm mb-12 max-w-2xl leading-relaxed">
            Certifications are purchase-condition documentation for institutional buyers — not marketing assets. Every certification available through our mill network includes active documentation to include with procurement records.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col gap-4"
              >
                <div className="bg-white rounded-xl p-3 flex items-center justify-center" style={{ height: 64 }}>
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={96} height={52} className="object-contain w-full h-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="font-bold text-white text-sm">{c.name}</p>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${c.tier === "Premium" ? "bg-gold/20 text-gold" : c.tier === "Optional" ? "bg-white/10 text-white/60" : "bg-purple-400/20 text-purple-300"}`}>
                      {c.tier}
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-200 leading-snug">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <CertificationsStrip />
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 9 — EXPORT & LOGISTICS — DATA VISUALIZATION UI + TIMELINE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-orange-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export &amp; Logistics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Indicative Lead Time &amp; Export Terms</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-6">Indicative Programme Timeline</h3>
              <div className="relative">
                {LEAD_STAGES.map((stage, i) => (
                  <motion.div
                    key={stage.stage}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-5 mb-6 last:mb-0"
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${stage.color} shrink-0 mt-1`} aria-hidden="true" />
                      {i < LEAD_STAGES.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-1" aria-hidden="true" />}
                    </div>
                    <div className="pb-6 last:pb-0 flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <p className="font-semibold text-navy-900 text-sm">{stage.stage}</p>
                        <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{stage.days} days</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{stage.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs text-amber-700 leading-relaxed">
                  ⚠ All lead times are indicative and subject to mill scheduling, fabric availability and inspection capacity at time of order.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-6">Export Terms Available</h3>
              <div className="flex flex-col gap-4">
                {EXPORT_TERMS.map((e, i) => (
                  <motion.div
                    key={e.term}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-5 border border-orange-100 flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center shrink-0">{e.term}</div>
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{e.full}</p>
                      <p className="text-xs text-orange-500 mt-0.5">{e.port}</p>
                      <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{e.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — SCANDINAVIAN UI + BULLET LIST
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-[#F8FAF7] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#4a7c59] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Responsible Sourcing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Sustainability in Institutional Terry Production</h2>
          <p className="text-gray-500 max-w-2xl mb-12 leading-relaxed">
            Institutional procurement programmes increasingly require sustainability documentation alongside product specifications. Our certified mill network can provide GOTS, OEKO-TEX and recycled-content documentation to support your ESG reporting.
          </p>
          <div className="flex flex-col gap-5 max-w-3xl">
            {SUSTAINABILITY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-5 items-start"
              >
                <div className="w-10 h-10 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] flex items-center justify-center text-lg shrink-0 mt-0.5" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <h3 className="font-semibold text-navy-900 text-base">{item.title}</h3>
                    <span className="text-[10px] font-semibold text-[#4a7c59] bg-[#4a7c59]/10 px-2.5 py-0.5 rounded-full">{item.tag}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-loose">{item.desc}</p>
                </div>
                <div className="w-8 h-px bg-[#4a7c59]/30 mt-4 shrink-0" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
          <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <Link prefetch={false} href="/rfq/" className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors bg-[#4a7c59] hover:bg-[#3d6b4a]">
              Request Certified Programme <span aria-hidden="true">→</span>
            </Link>
            <Link prefetch={false} href="/qualitycompliance/certifications/" className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 text-navy-900 hover:border-navy-900 transition-colors">
              View All Certifications
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 11 — PROCESS — SWISS DESIGN UI + NUMBERED FLOW
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t-4 border-navy-900 pt-8 mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-gray-500 mb-2">
                MZ Global Trading — Institutional Sourcing Programme
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy-900">Our Process</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Six structured steps from case specification to shipment.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
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

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Institutional Towel FAQ</h2>
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

      {/* SAME-TIER PAGES */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Bath Linen</p>
            <h2 className="text-2xl font-bold text-navy-900">More Bath Linen</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Towels", desc: "Six constructions — terry loop to zero twist. 450–600 GSM. Hotel and retail programmes.", href: "/hometextile/bathlinen/towels/", img: "/images/hero/hero-towels.webp", alt: "Pakistan bath towel manufacturer — OEM terry cotton towels for hotels and retailers in USA, UK and Europe" },
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

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════════════ */}
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
              Ready to Source Institutional Towels<br />from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Hotel chain, hospital procurement, commercial laundry service — institutional terry built for industrial wash cycles, not retail display. Plain white or dobby stripe, by the case or by the container. Submit the RFQ; receive a certified Pakistan terry mill match with volume pricing within 3&ndash;5 working days.
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

