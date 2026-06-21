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
            : "border-2 border-gold text-navy-900 hover:bg-gold shadow-sm"
        }`}
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} aria-hidden="true">↑</motion.span>
        Back to overview
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
    id: "heavy-terry",
    name: "Heavy Terry Loop",
    badge: "Commercial Standard",
    gsm: "450–600 GSM",
    hand: "Dense looped pile — maximum spill absorption, fast wicking",
    best: ["Restaurant Kitchens", "Hotel Banqueting", "Bars & Food Service"],
    markets: ["USA", "Canada", "UK", "Australia", "Middle East"],
    features: ["High absorbency", "Durable under 90°C wash", "Anti-bacterial treatment", "Lint-free option"],
    detail:
      "Heavy terry loop is the dominant construction for commercial bar mops across the USA and Canada. The dense looped pile delivers maximum spill absorption — critical in high-volume restaurant and bar environments where fast, repeated use is standard. At 500 GSM, a single bar mop absorbs substantially more liquid than lightweight alternatives, reducing the number of cloths needed per station and lowering per-service cost over time.",
    spec: "100% ring-spun cotton. GSM 450–600. Industrial laundry compatible to 90°C. Anti-bacterial treatment standard. OEKO-TEX Standard 100, BSCI, ISO 9001.",
  },
  {
    id: "huck-weave",
    name: "Huck Weave",
    badge: "Institutional Grade",
    gsm: "400–500 GSM",
    hand: "Pebbled multi-float surface — lint-free wipe, excellent scrub performance",
    best: ["Hospital Kitchens", "Contract Catering", "School Cafeterias"],
    markets: ["USA", "UK", "Canada", "EU"],
    features: ["Lint-free surface", "Superior wiping performance", "Flat profile", "Easy stack and count"],
    detail:
      "Huck weave bar mops (also called 'cloths' in UK markets) use a multi-float thread construction to create a flat, pebbled surface with excellent lint-free wiping performance. The flat profile allows precise stacking and counting — an important operational advantage in high-turnover institutional environments. Widely specified by contract caterers, hospital food service and school catering operations across the UK and EU.",
    spec: "100% cotton ring-spun. GSM 400–500. Lint-free surface. Compatible with chlorine bleach at specified concentrations. BSCI, Sedex, ISO 9001.",
  },
];

const GSM_TIERS = [
  { gsm: "400–450", name: "Light Commercial", use: "Bar counters, front-of-house service stations", pct: 30, color: "bg-sky-300" },
  { gsm: "450–500", name: "Standard Commercial", use: "Restaurants, café kitchens — moderate volume", pct: 60, color: "bg-amber-400" },
  { gsm: "500–550", name: "Heavy Commercial", use: "High-volume restaurant and hotel kitchen supply", pct: 85, color: "bg-gold", popular: true },
  { gsm: "550–600", name: "Institutional Heavy", use: "Industrial kitchen, institutional laundry programmes", pct: 45, color: "bg-amber-700" },
];

const SIZES = [
  { code: "STD", dims: "35 × 60 cm", name: "Standard", note: "Dominant commercial specification — USA, UK, Canada" },
  { code: "HVY", dims: "35 × 65 cm", name: "Heavy Duty", note: "Extended wipe coverage — hotel banqueting and high-volume kitchens" },
  { code: "CUS", dims: "Custom", name: "Custom", note: "To your institutional specification" },
];

const COLOUR_OPTIONS = [
  { name: "Plain White", note: "US foodservice standard — dominant specification across restaurant and bar industry. Easy bleach sanitising.", popular: true },
  { name: "White + Colour Border", note: "Single colour stripe on short edge — used for zoning (food prep vs cleaning vs equipment areas).", popular: false },
  { name: "Custom Border Colour", note: "Specify any colour border — PMS-matched for colour-coded kitchen zoning programmes.", popular: false },
];

const PACKING = [
  { format: "Dozen (12 pcs)", note: "Standard ordering unit for foodservice distributors", icon: "📦" },
  { format: "24-Pack Banded", note: "Two dozen banded together for wholesale efficiency", icon: "🗃️" },
  { format: "Case (144 pcs)", note: "12 dozen per carton — bulk institutional procurement", icon: "📫" },
  { format: "Bulk Carton", note: "Loose packed in export carton — agreed quantity per box", icon: "📤" },
];

const OEM_FEATURES = [
  { num: "01", title: "Construction Selection", desc: "Heavy terry or huck weave — specified to your application and laundry programme." },
  { num: "02", title: "GSM Specification", desc: "400–600 GSM range confirmed by fabric weight test and absorbency specification." },
  { num: "03", title: "Colour / Border Programme", desc: "Plain white, single border, or colour-coded multi-SKU programmes for kitchen zoning." },
  { num: "04", title: "Anti-Bacterial Treatment", desc: "Standard on commercial supply — OEKO-TEX compliant biocide-free formulation." },
  { num: "05", title: "Ordering Unit", desc: "Dozen, case (144 pcs) or bulk carton — to your distribution and warehouse requirements." },
  { num: "06", title: "Documentation", desc: "Full export documentation, test reports, OEKO-TEX and BSCI certificates on request." },
];

const SECTORS = [
  { abbr: "RS", name: "Restaurants & Bars", detail: "Commercial kitchen supply — plain white 500 GSM standard", market: "USA · Canada · UK" },
  { abbr: "HT", name: "Hotel Banqueting", detail: "High-volume banqueting and F&B linen supply", market: "Middle East · USA · EU" },
  { abbr: "CC", name: "Contract Catering", detail: "Institutional supply to contract caterers and facilities management", market: "UK · EU · Australia" },
  { abbr: "HC", name: "Hospital Catering", detail: "Hospital kitchen and medical food service supply", market: "USA · UK · EU" },
  { abbr: "SC", name: "School Cafeterias", detail: "Educational institution catering linen supply", market: "USA · UK · Canada" },
  { abbr: "WD", name: "Wholesale Distributors", detail: "Foodservice distributor programmes supplying multi-site operators", market: "USA · UK · Australia" },
];

const CERTIFICATIONS = [
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", img: "/images/certs/cert-oeko-tex.webp", tier: "Standard" },
  { name: "BSCI", full: "Business Social Compliance Initiative", img: "/images/certs/cert-bsci.webp", tier: "Standard" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", img: "/images/certs/cert-sedex.webp", tier: "Standard" },
  { name: "ISO 9001", full: "Quality Management System", img: "/images/certs/cert-iso-9001.webp", tier: "Standard" },
  { name: "GOTS", full: "Global Organic Textile Standard", img: "/images/certs/cert-gots.webp", tier: "Premium" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", img: "/images/certs/cert-wrap.webp", tier: "Standard" },
  { name: "SA8000", full: "Social Accountability International", img: "/images/certs/cert-sa8000.webp", tier: "Premium" },
  { name: "GRS", full: "Global Recycled Standard", img: "/images/certs/cert-grs.webp", tier: "Optional" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim" },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port" },
  { term: "CFR", full: "Cost & Freight", port: "Destination port" },
  { term: "EXW", full: "Ex-Works", port: "Factory gate" },
];

const QUALITY_SPECS = [
  { spec: "Absorbency", method: "ISO 9073-6", value: "≥400% by weight for 500 GSM terry" },
  { spec: "Wash Durability", method: "ISO 6330", value: "30 wash cycles at 60°C — max 3% dimensional change" },
  { spec: "Colour Fastness", method: "ISO 105-C06", value: "Grade ≥4 (colour) and ≥3 (staining) for border colours" },
  { spec: "Whiteness (plain)", method: "ISO 2469", value: "≥80 CIE whiteness for plain white specification" },
  { spec: "Chemical Safety", method: "OEKO-TEX Std 100", value: "No restricted substances — all colorants and finishes" },
  { spec: "Anti-Bacterial", method: "AATCC TM100", value: "≥99% reduction after 24h — standard on commercial supply" },
];

const PROCESS = [
  { num: "01", short: "RFQ Submission", desc: "Construction, GSM, colour, quantity, ordering unit and destination." },
  { num: "02", short: "Factory Match", desc: "Certified Pakistan mills specialising in commercial foodservice supply shortlisted." },
  { num: "03", short: "Quotation", desc: "Per-piece, per-dozen and per-case pricing within 3–5 working days." },
  { num: "04", short: "Sample Production", desc: "Pre-production samples with absorbency and wash-durability confirmation." },
  { num: "05", short: "Bulk Production", desc: "25–40 days from confirmed purchase order." },
  { num: "06", short: "QC & Export", desc: "Pre-shipment inspection, export documentation and loading from Karachi." },
];

const FAQS = [
  {
    q: "What is the standard GSM for commercial bar mops?",
    a: "The commercial standard is 500 GSM — delivering the absorbency and durability required for high-volume restaurant and kitchen use. 400–450 GSM suits lighter-duty bar counter applications; 550–600 GSM is for heavy institutional programmes requiring multiple daily laundry cycles.",
  },
  {
    q: "What is the difference between a bar mop and a kitchen towel?",
    a: "Bar mops are heavy commercial cloths — 400–600 GSM, square-cut, sold by the dozen or case to commercial buyers. Kitchen towels are consumer retail products at 150–250 GSM with decorative designs. Bar mops are for professional foodservice use only.",
  },
  {
    q: "What ordering units are standard for bar mops?",
    a: "Dozens (12 pcs) and cases (144 pcs = 12 dozen) are standard. Dozen packs suit distributors; cases suit direct institutional procurement. All configurations are available — specify your preferred unit in the RFQ.",
  },
  {
    q: "Are white or colour border bar mops more common commercially?",
    a: "Plain white is dominant in the USA foodservice market. Colour border bar mops are used for kitchen zoning — different border colours designating towels for different areas. More common in UK and European markets.",
  },
  {
    q: "What certifications are required for USA foodservice bar mops?",
    a: "OEKO-TEX Standard 100 and ISO 9001 are the primary requirements. BSCI or Sedex audit compliance is increasingly required by larger restaurant chains. GOTS is available for organic cotton programmes.",
  },
  {
    q: "What laundry temperatures can Pakistan bar mops withstand?",
    a: "Our heavy terry and huck weave bar mops withstand repeated industrial laundering at 60°C standard and 90°C with appropriate detergents. Chlorine bleach resistance is available as a specified finishing treatment.",
  },
  {
    q: "Can bar mops be supplied with anti-bacterial treatment?",
    a: "Yes. Anti-bacterial treatment is standard on commercial bar mop supply — OEKO-TEX compliant, effective through multiple wash cycles. Independent testing documentation available for EU and FDA-compliant claim substantiation.",
  },
  {
    q: "What is the typical lead time for bulk bar mop orders?",
    a: "Indicative: bulk production 25–40 days from confirmed purchase order; sea freight from Karachi adds 18–25 days to USA/Canada. Allow 75 days minimum from RFQ to in-warehouse receipt for first programmes.",
  },
];

export default function BarMopsContent() {
  const [activeC, setActiveC] = useState("heavy-terry");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeC) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-bar-mops.webp" fill alt="Pakistan bar mops manufacturer — heavy terry and huck weave commercial bar mops for restaurant and foodservice buyers in USA, UK and Canada"
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
              <Link href="/hometextile/kitchenlinen/" className="hover:text-gold transition-colors">Kitchen Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Bar Mops</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Commercial Kitchen Linen
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Bar Mops
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              Commercial-grade bar mops sourced from Pakistan&rsquo;s certified
              textile mills. Heavy terry loop and huck weave. 400&ndash;600 GSM.
              Anti-bacterial treatment standard. OEKO-TEX, BSCI. Bulk export to
              USA, UK, Canada and worldwide.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Commercial Bar Mop Supply — Pakistan</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Heavy-Duty Commercial Supply at Export Scale
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s commercial textile sector supplies bar mops to
                US restaurant groups, UK contract caterers and Middle East hotel
                chains through the same certified mill infrastructure. 95% on-time
                performance across bulk programmes.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "95%", label: "On-Time Delivery" },
                { val: "2", label: "Constructions" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
            <Link href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit">
              Request a Quote <span aria-hidden="true">&#8594;</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Complete Bar Mop Specification</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any section to jump to full specification details.</p>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏭</span>
                <div>
                  <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-4 border border-sky-100">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-navy-900">{c.name}</p>
                      <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full shrink-0">{c.badge}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{c.gsm}</p>
                    <p className="text-xs text-sky-600 mt-1 leading-tight">{c.hand}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🔬</span>
                <div>
                  <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Quality</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Quality Specifications</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {QUALITY_SPECS.slice(0, 4).map((q) => (
                  <div key={q.spec} className="bg-white rounded-xl px-4 py-3 border border-indigo-100">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-navy-900">{q.spec}</p>
                      <span className="text-[10px] text-indigo-600 font-semibold shrink-0">{q.method}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{q.value}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-quality" label="View Quality Specs" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Range</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-lg p-2.5 border border-amber-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-navy-900">{t.gsm}</span>
                      {t.popular && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Standard</span>}
                    </div>
                    <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] text-gray-400 leading-snug">{t.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View GSM Guide" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">📐</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Standard Sizes</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {SIZES.map((s) => (
                  <div key={s.code} className="bg-white rounded-xl px-3 py-3 border border-slate-100">
                    <p className="text-xs font-bold text-navy-900">{s.name}</p>
                    <p className="text-sm font-bold text-gold mt-0.5">{s.dims}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{s.note}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="View Sizes" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-stone-50 border border-stone-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-stone-500 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Options</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {COLOUR_OPTIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-lg p-2.5 border border-stone-100">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs font-semibold text-navy-900">{c.name}</p>
                      {c.popular && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <p className="text-[10px] text-gray-400 leading-snug">{c.note}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colour" label="Explore Colours" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">📦</span>
              <p className="text-emerald-600 text-xs font-semibold tracking-[0.2em] uppercase">Packing</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Order Formats</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PACKING.map((p) => (
                  <div key={p.format} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-emerald-50">
                    <span className="text-base shrink-0" aria-hidden="true">{p.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{p.format}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{p.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-packing" label="View Packing" />
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🍽️</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Sectors</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-xs font-bold text-teal-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View Markets" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Certifications</h3>
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
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export Terms</h3>
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
              <ExploreBtn sectionId="section-export" label="View Export" />
            </motion.div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏷️</span>
                <div>
                  <p className="text-lime-700 text-xs font-semibold tracking-[0.2em] uppercase">OEM</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Custom Specifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {OEM_FEATURES.map((f) => (
                  <div key={f.num} className="bg-white rounded-xl p-3 border border-lime-100 flex flex-col gap-1">
                    <span className="text-gold text-xs font-bold">{f.num}</span>
                    <p className="text-sm font-semibold text-navy-900">{f.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore OEM" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-fuchsia-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-fuchsia-200 text-fuchsia-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.short}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-1 pl-8">+ 2 more steps</p>
              </div>
              <ExploreBtn sectionId="section-process" label="View Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Commercial Bar Mop Sourcing Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">GSM selection, construction guide and certification requirements for foodservice bar mop programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Bar Mop Spec Sheets</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction and absorbency specification sheets for commercial programme buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Bar Mops?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, GSM, quantity and ordering unit — RFQ takes 3 minutes.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS — Command Center UI */}
      <section id="section-constructions" className="bg-[#0A0F1E] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" aria-hidden="true" />
            <p className="font-mono text-gold text-xs tracking-[0.3em] uppercase">CONSTRUCTION SPEC — COMMERCIAL GRADE</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 ml-5">Fabric Constructions</h2>
          <p className="text-gray-400 mb-10 max-w-2xl leading-relaxed ml-5">
            Two proven commercial constructions — each optimised for a specific foodservice application and laundry specification.
          </p>
          <div className="flex flex-wrap gap-2 mb-8 ml-5" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeC === c.id}
                onClick={() => setActiveC(c.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeC === c.id ? "bg-gold text-navy-900 border-gold" : "bg-white/5 text-gray-300 border-white/10 hover:border-gold/40"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeC}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              className="grid lg:grid-cols-3 gap-6 ml-5"
            >
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-white">{ac.name}</h3>
                  <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">{ac.badge}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">GSM_RANGE</p>
                    <p className="text-lg font-bold text-gold">{ac.gsm}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">HAND_FEEL</p>
                    <p className="text-sm text-white">{ac.hand}</p>
                  </div>
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
                    {ac.best.map((b) => <span key={b} className="text-xs text-white bg-white/10 px-3 py-1 rounded-full">{b}</span>)}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">KEY_MARKETS[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>)}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">FEATURES[ ]</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-300">{f}</span>
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

      {/* SECTION 2 — QUALITY SPECS — Scientific UI */}
      <section id="section-quality" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Technical Quality Specifications</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            All commercial bar mop programmes are produced to verified quality specifications — independently testable at any accredited textile laboratory.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">Test Parameter</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">Test Method</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">Specification</th>
                </tr>
              </thead>
              <tbody>
                {QUALITY_SPECS.map((q, i) => (
                  <tr key={q.spec} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 text-sm font-semibold text-navy-900">{q.spec}</td>
                    <td className="px-6 py-4 text-xs font-mono text-indigo-600">{q.method}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{q.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-3 items-start">
            <span className="text-blue-500 text-lg shrink-0" aria-hidden="true">ℹ️</span>
            <p className="text-blue-800 text-sm leading-relaxed">Independent pre-shipment testing through SGS, Bureau Veritas or Intertek is available on request for all bulk commercial programmes.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 3 — GSM — Brutalist UI */}
      <section id="section-gsm" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-4 border-navy-900 rounded-none p-8 mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Guide</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900">GSM Determines Performance</h2>
            <p className="text-gray-500 mt-3 max-w-2xl">
              Bar mop GSM is a direct proxy for absorbency capacity and commercial durability. Match weight to your laundry frequency and operational intensity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-navy-900">
            {GSM_TIERS.map((t, i) => (
              <div key={t.gsm} className={`p-7 flex flex-col gap-3 ${i < 3 ? "border-r-2 border-navy-900" : ""} ${t.popular ? "bg-gold/5" : "bg-white"}`}>
                {t.popular && <span className="text-[10px] font-bold text-navy-900 bg-gold px-2 py-1 rounded uppercase tracking-wider w-fit">Commercial Standard</span>}
                <p className="text-3xl font-bold text-navy-900">{t.gsm}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.name}</p>
                <div className="mt-auto">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                  </div>
                  <p className="text-xs text-gray-500">{t.use}</p>
                </div>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 4 — SIZES — Memphis UI */}
      <section id="section-sizes" className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Dimensions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Standard Sizes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SIZES.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, rotate: [-2, 1, -1][i] }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md border-2 border-navy-900 flex flex-col gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-navy-900 flex items-center justify-center">
                  <span className="text-gold text-sm font-bold">{s.code}</span>
                </div>
                <h3 className="text-xl font-bold text-navy-900">{s.name}</h3>
                <p className="text-3xl font-bold text-gold">{s.dims}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{s.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-white rounded-2xl border-2 border-navy-900 p-6">
            <p className="text-sm font-semibold text-navy-900 mb-2">Manufacturing Tolerance</p>
            <p className="text-sm text-gray-500">±2 cm applies to all finished dimensions. Both centimetre and inch specifications accepted. Custom sizes available for institutional programmes — include required dimensions in RFQ.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 5 — COLOUR — Neumorphic UI */}
      <section id="section-colour" className="bg-[#E8E8EC] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2d3d] mb-10">Colour Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {COLOUR_OPTIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl p-7 flex flex-col gap-3"
                style={{ background: "#E8E8EC", boxShadow: "6px 6px 12px #c8c8cc, -6px -6px 12px #ffffff" }}
              >
                {c.popular && <span className="text-[10px] font-bold text-navy-900 bg-gold px-3 py-1 rounded-full uppercase tracking-wider w-fit">Industry Standard</span>}
                <h3 className="text-lg font-bold text-[#2d2d3d]">{c.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl p-6" style={{ background: "#E8E8EC", boxShadow: "6px 6px 12px #c8c8cc, -6px -6px 12px #ffffff" }}>
            <p className="text-sm font-semibold text-[#2d2d3d] mb-2">Colour Fastness Standard</p>
            <p className="text-sm text-gray-500 leading-relaxed">All coloured border bar mops are tested to ISO 105-C06 at 60°C minimum — Grade ≥4 colour change and Grade ≥3 staining. Chlorine bleach compatibility testing available for programmes requiring periodic sanitising wash cycles.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 6 — PACKING — Military/Tactical UI */}
      <section id="section-packing" className="bg-[#1C2B1C] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="font-mono text-green-400 text-xs tracking-[0.3em] uppercase mb-2">&#x25B6; ORDER FORMATS // COMMERCIAL DISTRIBUTION</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Packing &amp; Order Formats</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">Commercial bar mop distribution requires specific packing configurations for efficient handling, storage and distribution.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PACKING.map((p, i) => (
              <motion.div
                key={p.format}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border border-green-900/50 bg-white/5 rounded-xl p-6 flex items-start gap-4"
              >
                <span className="text-3xl" aria-hidden="true">{p.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{p.format}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 border border-green-900/50 bg-white/5 rounded-xl p-6">
            <p className="font-mono text-green-400 text-xs tracking-[0.2em] uppercase mb-3">&#x25B6; EXPORT PACKING STANDARD</p>
            <p className="text-gray-300 text-sm leading-relaxed">All bar mops are packed in standard export cartons with full markings: description, quantity, gross/net weight, country of origin, shipping marks. Pallet options available for FCL shipments. Custom carton labelling to your distribution requirements on request.</p>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 7 — OEM — Luxury UI */}
      <section id="section-oem" className="bg-[#FAF8F4] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gold" aria-hidden="true" />
                <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Custom Programme</p>
              </div>
              <h2 className="text-4xl font-bold text-navy-900 mb-6 leading-tight">Your Specification,<br />Precisely Sourced.</h2>
              <p className="text-gray-500 leading-relaxed mb-8 text-lg">
                Commercial bar mop programmes demand exacting specifications — construction, GSM, colour, anti-bacterial treatment, absorbency standard and documentation. We source to your exact brief, not a catalogue standard.
              </p>
              <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-800 transition-colors">
                Start Your Programme <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {OEM_FEATURES.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                    <span className="text-gold text-xs font-bold">{f.num}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-navy-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 8 — MARKETS — Flat Design UI */}
      <section id="section-markets" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Applications</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Who Buys Bar Mops</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Bar mops are a commercial staple across the global foodservice and hospitality supply chain — from single-site restaurants to multi-national contract caterers.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-2"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center mb-2">
                  <span className="text-gold text-xs font-bold">{s.abbr}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900">{s.name}</h3>
                <p className="text-xs text-gray-500 leading-snug">{s.detail}</p>
                <p className="text-xs font-semibold text-gold mt-auto">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 9 — CERTIFICATIONS — Retro/Vintage UI */}
      <section id="section-certs" className="bg-[#F5F0E8] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-4 mb-4" aria-hidden="true">
              <div className="h-px w-20 bg-[#8B7355]" />
              <span className="text-[#8B7355] text-xs font-semibold tracking-[0.4em] uppercase">Quality Assurance</span>
              <div className="h-px w-20 bg-[#8B7355]" />
            </div>
            <h2 className="text-4xl font-bold text-[#2C2416] mb-4">Certifications &amp; Standards</h2>
            <p className="text-[#6B5B45] max-w-xl mx-auto leading-relaxed">Certificates that institutional and commercial buyers require across all key export markets.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white border-2 border-[#D4C4A0] rounded-2xl p-5 flex flex-col items-center gap-3 text-center"
              >
                <div className="w-full h-14 flex items-center justify-center">
                  <Image src={c.img} alt={c.full} width={72} height={44} className="object-contain" />
                </div>
                <p className="text-sm font-bold text-[#2C2416]">{c.name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${c.tier === "Premium" ? "bg-gold/20 text-amber-800" : c.tier === "Optional" ? "bg-gray-100 text-gray-500" : "bg-green-100 text-green-800"}`}>{c.tier}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 10 — EXPORT — Aurora UI */}
      <section id="section-export" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-[#0D1B2A]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Export &amp; Logistics</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">Commercial bar mops ship FCL and LCL from Karachi and Port Qasim. All major incoterms available. Full export documentation standard.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {EXPORT_TERMS.map((e, i) => (
              <motion.div
                key={e.term}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex flex-col gap-2"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                  <span className="text-gold text-sm font-bold">{e.term}</span>
                </div>
                <p className="text-sm font-bold text-white">{e.full}</p>
                <p className="text-xs text-white/50">{e.port}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { val: "18–25 days", label: "USA / Canada sea freight" },
              { val: "20–26 days", label: "UK / Europe sea freight" },
              { val: "8–12 days", label: "Middle East sea freight" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
                <p className="text-2xl font-bold text-gold mb-1">{item.val}</p>
                <p className="text-sm text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 11 — PROCESS — Code/Terminal UI */}
      <section id="section-process" className="bg-[#0D1117] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-green-400 text-xs tracking-[0.2em] mb-2"># sourcing_process.sh</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">From RFQ to Delivery</h2>
          <p className="text-gray-400 mb-12 max-w-2xl leading-relaxed">A transparent, sequenced process from specification through to vessel loading.</p>
          <div className="flex flex-col gap-3">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 flex items-start gap-4 font-mono"
              >
                <span className="text-green-400 text-sm shrink-0">{p.num}</span>
                <span className="text-yellow-400 text-sm shrink-0">./run</span>
                <div>
                  <span className="text-white text-sm font-bold">{p.short}</span>
                  <p className="text-gray-400 text-xs mt-1 font-sans">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-amber-900/20 border border-amber-700/30 rounded-xl p-5">
            <p className="font-mono text-amber-400 text-xs tracking-[0.2em] mb-2"># NOTICE</p>
            <p className="text-amber-200/80 text-sm leading-relaxed font-sans">All lead times are indicative only — subject to factory scheduling, material availability and order complexity. Request a programme-specific timeline in your RFQ.</p>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-12">Frequently Asked Questions</h2>
          <div className="flex flex-col divide-y divide-gray-100">
            {FAQS.map((f, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                  aria-expanded={faqOpen === i}
                >
                  <span className="text-base font-semibold text-navy-900 leading-snug">{f.q}</span>
                  <span className={`text-gold font-bold text-xl shrink-0 transition-transform ${faqOpen === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-500 text-sm leading-relaxed pt-4">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0D1B2A] py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Start Your Bar Mop Programme</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Specify construction, GSM, colour, quantity and ordering unit. Factory match with certified Pakistan mills and pricing within 3–5 working days.
            </p>
            <Link href="/rfq/" className="inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
              Request a Quote <span aria-hidden="true">&#8594;</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
