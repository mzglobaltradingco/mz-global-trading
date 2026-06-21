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
        style={{ animation: "btt-pulse 2.2s ease-out infinite" }}
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} aria-hidden="true">↑</motion.span>
        Back to overview
      </button>
      <style>{`@keyframes btt-pulse{0%{box-shadow:0 0 0 0 rgba(212,160,23,.45)}70%{box-shadow:0 0 0 10px rgba(212,160,23,0)}100%{box-shadow:0 0 0 0 rgba(212,160,23,0)}}`}</style>
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

const GSM_TIERS = [
  { gsm: "150–180", name: "Neonatal / Paediatric", market: "Neonatal ICU · Paediatric wards · Infant care", pct: 30, color: "bg-sky-300", note: "Reduced weight — gentle on sensitive infant skin" },
  { gsm: "180–210", name: "Standard Hospital", market: "NHS general wards · Ambulance · Aged care", pct: 65, featured: true, color: "bg-blue-500", note: "NHS procurement standard for general ward use" },
  { gsm: "210–250", name: "High-Duty Institutional", market: "Residential aged care · High-dependency units", pct: 45, color: "bg-indigo-600", note: "Greater body and weight retention for reduced mobility patients" },
];

const SIZES = [
  { code: "COT", name: "Cot / Baby", dims: "75 × 100 cm", use: "Hospital cot, infant ward, neonatal" },
  { code: "PRM", name: "Pram", dims: "70 × 90 cm", use: "Pram, pushchair, transport" },
  { code: "SGL", name: "Single", dims: "150 × 200 cm", use: "Single hospital bed — standard adult ward" },
  { code: "DBL", name: "Double", dims: "180 × 200 cm", use: "Double bed, residential care, retail" },
  { code: "KNG", name: "King", dims: "230 × 220 cm", use: "King bed, bariatric care, retail premium" },
  { code: "CST", name: "Custom", dims: "To specification", use: "Stretcher, trolley, specialist ward dimensions" },
];

const FINISHING = [
  { title: "Anti-Shrink / Compacted", detail: "Residual shrinkage <3% across repeated 60–90°C industrial laundry cycles. Mandatory specification for all clinical programmes.", priority: "Clinical Standard" },
  { title: "OEKO-TEX Standard 100", detail: "No harmful substances in the finished product. Tested per OEKO-TEX annex 6 — required by many hospital procurement policies.", priority: "Required" },
  { title: "Plain (Bleached White)", detail: "Clinical white — standard for hygiene protocol clarity. Bleached to ≥88 CIE whiteness. No decorative elements permitted in clinical supply.", priority: "Standard" },
  { title: "Yarn-Dyed Pattern", detail: "Available for retail and residential care variants where visual differentiation is required. Not supplied to acute hospital programmes.", priority: "Retail Variant" },
];

const CERTIFICATIONS = [
  { name: "OEKO-TEX", full: "Standard 100", desc: "Harmful substance testing — EU/UK hospital procurement", tier: "Required", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic cotton from farm through weaving and packing", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Documented process control and consistent production quality", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "BSCI", full: "Business Social Compliance", desc: "Ethical production audit — labour standards, worker welfare", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data platform", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
];

const SECTORS = [
  { abbr: "NHS", name: "NHS & Health Systems", detail: "General wards, A&E, surgical recovery, outpatient", market: "UK · Canada · Australia" },
  { abbr: "NEO", name: "Neonatal & Paediatric", detail: "NICU, paediatric wards, maternity, infant transport", market: "Worldwide" },
  { abbr: "AGE", name: "Aged Care", detail: "Residential aged care, high-dependency, dementia units", market: "UK · Australia · Canada" },
  { abbr: "EMG", name: "Emergency Services", detail: "Ambulance, first responder, disaster response procurement", market: "UK · Australia · USA" },
  { abbr: "LAU", name: "Laundry Supply", detail: "Institutional linen rental and laundry service companies", market: "Europe · Middle East" },
  { abbr: "RTL", name: "Retail Baby", detail: "Baby product retailers, gift sets, organic cotton programmes", market: "USA · UK · EU" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Price at port of loading. Buyer arranges freight and insurance from Karachi." },
  { term: "CIF", full: "Cost Insurance Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange freight to your port. Buyer provides own insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory. Lowest price, highest buyer responsibility." },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory evaluation, construction matching and pricing", color: "bg-gold" },
  { stage: "Sample Production", days: "12–18", desc: "Pre-production sample to your GSM, size and anti-shrink spec", color: "bg-blue-500" },
  { stage: "Bulk Production", days: "30–50", desc: "From confirmed purchase order and approved sample", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection — shrinkage, weight, whiteness", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "8–35", desc: "FCL/LCL from Karachi — 8–14 days UK, 18–25 days Australia", color: "bg-teal-500" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Specify GSM, size, certification requirements (OEKO-TEX, GOTS), quantity, destination and delivery date." },
  { num: "02", title: "Factory Matching", desc: "We shortlist 2–3 certified mills with cellular weave capability and the required certification stack." },
  { num: "03", title: "Sample Production", desc: "Pre-production sample produced to your GSM and anti-shrink specification. 12–18 days from spec lock." },
  { num: "04", title: "Sample Approval", desc: "Review construction, weight, whiteness, wash test results. Approve before bulk purchase order placement." },
  { num: "05", title: "Bulk Production", desc: "Production commences from confirmed PO. QC inline monitoring at key production stages." },
  { num: "06", title: "Pre-Shipment QC", desc: "Shrinkage test, weight per m², whiteness check and quantity audit before vessel loading from Karachi." },
];

const OEM_FEATURES = [
  { num: "01", title: "GSM Specification", desc: "Any weight from 150–250 GSM specified to your procurement standard — neonatal, ward or high-dependency." },
  { num: "02", title: "Custom Dimensions", desc: "Stretcher sizes, trolley sizes, non-standard widths and specialist ward dimensions confirmed at quotation." },
  { num: "03", title: "Anti-Shrink Programme", desc: "Compacting treatment calibrated to your laundry temperature protocol — 60°C, 71°C or 90°C wash cycles." },
  { num: "04", title: "Certification Documentation", desc: "OEKO-TEX test certificates, ISO 9001 records, shrinkage test reports and shade cards per shipment." },
  { num: "05", title: "Whiteness Grading", desc: "Spectrophotometric whiteness measurement with CIE values documented. Batch-to-batch tolerance maintained." },
  { num: "06", title: "Institutional Packing", desc: "Dozen pack (12 pcs banded), polybag, bulk carton or zippered carry bag — to your distribution format." },
];

const SUSTAINABILITY = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton — traceable from farm to finished blanket, no synthetic inputs.", tag: "GOTS" },
  { icon: "💧", title: "Reduced Water", desc: "Cellular weave construction requires less water in finishing than dense woven equivalents.", tag: "Process" },
  { icon: "♻️", title: "Durable Life", desc: "Anti-shrink treatment extends service life through repeated industrial laundering — less frequent replacement.", tag: "Longevity" },
  { icon: "⚖️", title: "Ethical Factories", desc: "BSCI and Sedex audited supply network — worker welfare, safe conditions and fair wages.", tag: "BSCI / Sedex" },
  { icon: "🧪", title: "Chemical Safety", desc: "OEKO-TEX Standard 100 confirmed — no harmful substances at any production stage.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Minimal Packaging", desc: "Plain carton institutional packing available — reduces packaging waste in hospital linen systems.", tag: "Optional" },
];

const FAQS = [
  { q: "What makes a cellular blanket different from a standard woven blanket?", a: "The open honeycomb weave incorporates a deliberate grid of openings — each 'cell' traps insulating air while allowing moisture vapour to escape. This breathability is critical for clinical patients who may be heat-sensitive or post-surgical. At equivalent GSM, a cellular blanket breathes where a solid weave retains moisture." },
  { q: "What GSM is standard for NHS procurement?", a: "200 GSM is the predominant ward specification. Neonatal units typically use 150–180 GSM for reduced weight against sensitive skin. Ambulance services use 200–220 GSM. Residential aged care may specify 220–250 GSM. All weights are available through our certified supply network." },
  { q: "Can cellular blankets withstand 90°C hospital laundry cycles?", a: "Yes. Anti-shrink compacting treatment limits residual shrinkage to less than 3% across repeated industrial cycles. Buyers should confirm specific temperature requirements in their RFQ — if 90°C is specified, the factory adjusts the anti-shrink programme accordingly." },
  { q: "Are GOTS-certified organic cotton cellular blankets available?", a: "Yes. GOTS-certified organic cotton cellular blankets are available for sustainability programmes or buyers requiring certified organic inputs. Lead times are typically 5–10 days longer due to dedicated organic cotton sourcing and segregated production runs." },
  { q: "What packing format is standard for NHS and hospital bulk orders?", a: "Individual polybag per blanket, then 12 or 24 pieces per export carton, is standard. Dozen pack (12 pcs banded) suits hospital linen room distribution. Plain unbranded bulk carton is standard for government procurement." },
  { q: "Can custom dimensions be supplied for specialist ward equipment?", a: "Yes — ambulance stretcher sizes, hospital trolley widths, bariatric dimensions and non-standard formats are available. Include exact dimensions in the RFQ and we confirm feasibility and any minimum quantity implications." },
  { q: "Which certifications are required for government health sector procurement?", a: "ISO 9001 is typically the minimum requirement, alongside test reports for shrinkage (ISO 6330), tensile strength (ISO 13934-1) and whiteness. OEKO-TEX Standard 100 is increasingly required. BSCI or Sedex is asked for by buyers whose procurement policies include social standards." },
  { q: "What is the indicative lead time for bulk hospital orders?", a: "RFQ response in 3–5 business days. Sample production 12–18 days from spec confirmation. Bulk production 30–50 days from purchase order placement. Sea freight adds 8–14 days to UK, 18–25 days to Australia, 20–30 days to Canada. All timelines are indicative and subject to factory scheduling." },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CellularThermalBlanketContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip">

      {/* ══ HERO ══ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-cellular-thermal-blanket.webp" fill alt="Pakistan cellular thermal blanket manufacturer — cotton open-cell weave blankets for hospitals and NHS procurement worldwide"
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
              <Link href="/hometextile/thermalblankets/" className="hover:text-gold transition-colors">Thermal Blankets</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Cellular Thermal Blanket</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Pakistan Home Textile Export
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Cellular Thermal<br />
              <span className="text-gold">Blanket</span><br />
              Manufacturer
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading sources 100% cotton cellular blankets from Pakistan&rsquo;s certified weaving mills. Open honeycomb construction — breathable, hospital laundry rated, OEKO-TEX and GOTS certified. Supplying NHS procurement, neonatal units and aged-care programmes worldwide.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <button onClick={() => scrollToId("bento-grid")} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
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

      {/* ══ STATS ANCHOR ══ */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Cellular Blanket Supply — Pakistan Weaving</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                The Clinical Standard in Cotton Cellular Blankets
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s certified weaving mills produce cellular blankets to NHS and global hospital procurement specifications. Open-cell cotton construction — not fleece, not solid weave — the clinically correct choice for patient care environments.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Mills" },
                { val: "35+", label: "Export Markets" },
                { val: "150–250", label: "GSM Range" },
                { val: "95%", label: "On-Time Delivery" },
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

      {/* ══ BENTO GRID ══ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Cellular Blanket — All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1 — 2 large bentos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🔬</span>
                <div>
                  <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Scientific</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Cellular Construction</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">Open honeycomb weave — each cell traps a warm air pocket while moisture escapes through the open channels. The functional inverse of solid weave: equal warmth, superior breathability.</p>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {[
                  { label: "Weave Type", val: "Open-Cell Honeycomb" },
                  { label: "Fibre", val: "100% Cotton" },
                  { label: "Cell Depth", val: "3–5 mm" },
                  { label: "Breathability", val: "Clinical Grade" },
                ].map((r) => (
                  <div key={r.label} className="bg-white rounded-xl p-3 border border-blue-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">{r.label}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{r.val}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-construction" label="Construction Science" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📊</span>
                <div>
                  <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight Guide</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">GSM by Clinical Setting</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-xl p-3.5 border border-indigo-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-navy-900">{t.gsm} GSM</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${t.featured ? "bg-gold/15 text-gold" : "bg-gray-100 text-gray-500"}`}>
                        {t.name}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.pct}%` }} />
                    </div>
                    <p className="text-xs text-gray-500">{t.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="Full Weight Guide" />
            </motion.div>
          </div>

          {/* Row 2 — 4 compact bentos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[220px]">
              <div>
                <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Size Programme</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {SIZES.slice(0, 4).map((s) => (
                  <div key={s.code} className="flex items-center gap-2">
                    <span className="w-8 h-6 bg-sky-100 rounded text-sky-700 text-[10px] font-bold flex items-center justify-center shrink-0">{s.code}</span>
                    <span className="text-xs text-gray-600 truncate">{s.dims}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="All Sizes" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[220px]">
              <div>
                <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase">Finishing</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Clinical Specs</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {FINISHING.slice(0, 3).map((f) => (
                  <div key={f.title} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                    <span className="text-xs text-gray-600 leading-tight">{f.title}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-finishing" label="Full Specs" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[220px]">
              <div>
                <p className="text-emerald-600 text-xs font-semibold tracking-[0.2em] uppercase">Certifications</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Quality Marks</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                {["OEKO-TEX", "GOTS", "ISO 9001", "BSCI", "Sedex"].map((c) => (
                  <span key={c} className="bg-white text-navy-900 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-100">{c}</span>
                ))}
              </div>
              <ExploreBtn sectionId="section-certifications" label="Certification Detail" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[220px]">
              <div>
                <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Packing</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Pack Options</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {["Individual polybag", "Dozen pack (12 pcs)", "Retail box", "Zippered carry bag", "Bulk carton"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <span className="text-gold text-xs">✓</span>
                    <span className="text-xs text-gray-600">{p}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-packing" label="Packing Guide" />
            </motion.div>
          </div>

          {/* Row 3 — 3 bentos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[220px]">
              <div>
                <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Sectors</p>
                <h3 className="text-lg font-bold text-navy-900 mt-0.5">Who Buys Cellular</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {SECTORS.slice(0, 4).map((s) => (
                  <div key={s.abbr} className="flex items-start gap-2">
                    <span className="w-8 h-6 bg-purple-100 rounded text-purple-700 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{s.abbr}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{s.name}</p>
                      <p className="text-[10px] text-gray-400">{s.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sectors" label="All Sectors" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[220px]">
              <div>
                <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
                <h3 className="text-lg font-bold text-navy-900 mt-0.5">Incoterms</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((t) => (
                  <div key={t.term} className="flex items-center gap-3">
                    <span className="w-10 text-center font-bold text-sm text-teal-700 bg-teal-100 rounded px-1 py-0.5">{t.term}</span>
                    <span className="text-xs text-gray-600">{t.full}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="Export Terms" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[220px]">
              <div>
                <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Sustainability</p>
                <h3 className="text-lg font-bold text-navy-900 mt-0.5">Environmental Commitments</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {SUSTAINABILITY.slice(0, 4).map((s) => (
                  <div key={s.title} className="flex items-start gap-2">
                    <span className="text-sm" aria-hidden="true">{s.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{s.title}</p>
                      <span className="text-[10px] text-green-600">{s.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="Sustainability" />
            </motion.div>
          </div>

          {/* Row 4 — 2 bentos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">⏱️</span>
                <div>
                  <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Timeline</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Indicative Lead Times</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {LEAD_STAGES.map((s, i) => (
                  <div key={s.stage} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full ${s.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-navy-900">{s.stage}</p>
                      <p className="text-[10px] text-gray-400">{s.days} days</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-leadtimes" label="Full Timeline" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏗️</span>
                <div>
                  <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">OEM Programme</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Custom Specification</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {OEM_FEATURES.slice(0, 4).map((f) => (
                  <div key={f.num} className="bg-white rounded-xl p-3 border border-rose-100">
                    <p className="text-[10px] text-rose-400 font-bold">{f.num}</p>
                    <p className="text-xs font-semibold text-navy-900 mt-0.5 leading-tight">{f.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="OEM Programme" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ RESOURCES ROW ══ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Cellular Blanket Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction overview, GSM selection and healthcare compliance requirements for institutional buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Home Textile Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times and certification requirements for thermal blanket export.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Spec Sheets &amp; Test Reports</p>
              <p className="text-xs text-gray-500 leading-relaxed">Cellular blanket spec sheets, fire retardancy test reports and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Cellular Blankets?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify GSM, size, quantity and certification requirements. RFQ to factory quotation: 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 1 — CONSTRUCTION SCIENCE (Scientific) ══ */}
      <section id="section-construction" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Construction Science</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">The Open-Cell Cellular Weave</h2>
            <p className="text-gray-500 mt-3 max-w-xl text-sm leading-relaxed">
              One construction. Engineered for clinical performance.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-navy-900 mb-4">Cellular / Open-Cell Honeycomb Weave</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { metric: "Fibre", val: "100% Cotton" },
                    { metric: "GSM Range", val: "150–250" },
                    { metric: "Cell Depth", val: "3–5 mm" },
                    { metric: "Weave Pattern", val: "Honeycomb Open-Cell" },
                    { metric: "Shrinkage", val: "<3% (anti-shrink)" },
                    { metric: "Whiteness", val: "≥88 CIE" },
                  ].map((m) => (
                    <div key={m.metric} className="bg-white rounded-xl p-3.5 border border-blue-100">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">{m.metric}</p>
                      <p className="text-sm font-bold text-navy-900 mt-0.5">{m.val}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The cellular weave is the <em>only</em> construction offered for this product. It is not a design choice — it is the functional specification that defines the product category. The open honeycomb cell structure delivers breathability that no solid-woven blanket construction can replicate at equivalent weight.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col gap-6">
              {[
                { title: "Air-Trapping Cell Structure", desc: "Each hexagonal or square cell creates a sealed pocket of still air — air is the insulating medium. Unlike a thick fleece where polymer fibres do the work, cellular cotton uses geometry to achieve warmth." },
                { title: "Moisture Vapour Transmission", desc: "The open channels between cells allow moisture vapour to pass through the blanket structure. This prevents condensation build-up against the skin — critical for post-surgical, neonatal and mobility-restricted patients." },
                { title: "Cotton Breathability Base", desc: "Cotton's natural hydrophilic properties complement the open structure: the fibre absorbs and transfers moisture rather than repelling it. The combination of open-cell geometry and cotton's natural behaviour produces the clinical standard in patient bedding." },
                { title: "Laundry Performance", desc: "The woven structure — not a knit or non-woven — maintains dimensional integrity through repeated thermal disinfection cycles. Anti-shrink compacting ensures the cell structure does not close or distort at hospital laundry temperatures." },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="border-l-2 border-blue-300 pl-5">
                  <h3 className="text-base font-bold text-navy-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 2 — GSM WEIGHT GUIDE (Minimalist) ══ */}
      <section id="section-gsm" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12">
            <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">GSM by Clinical Setting</h2>
            <p className="text-gray-400 mt-3 text-sm">Select the weight that matches your patient population and environment specification.</p>
          </motion.div>
          <div className="space-y-6">
            {GSM_TIERS.map((tier, i) => (
              <motion.div key={tier.gsm} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white rounded-2xl p-8 border ${tier.featured ? "border-gold shadow-md" : "border-gray-100"}`}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-bold text-navy-900">{tier.gsm} GSM</span>
                      {tier.featured && <span className="bg-gold/15 text-gold text-[11px] font-bold px-2.5 py-0.5 rounded-full">NHS Standard</span>}
                    </div>
                    <p className="text-base font-semibold text-gray-600">{tier.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">Procurement share</p>
                    <p className="text-2xl font-bold text-navy-900">{tier.pct}%</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${tier.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                    className={`h-full ${tier.color} rounded-full`} />
                </div>
                <p className="text-sm text-gray-500 mb-3">{tier.market}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{tier.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 3 — SIZE PROGRAMME (Military/Tactical) ══ */}
      <section id="section-sizes" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Size Matrix</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Blanket Size Programme</h2>
            <p className="text-gray-400 mt-3 text-sm">Standard and custom dimensions for all care environments.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SIZES.map((s, i) => (
              <motion.div key={s.code} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-lg bg-gold/20 text-gold text-xs font-bold flex items-center justify-center shrink-0">{s.code}</span>
                  <div>
                    <p className="text-sm font-bold text-white">{s.name}</p>
                    <p className="text-gold text-sm font-mono">{s.dims}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{s.use}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-6 text-center">±2 cm manufacturing tolerance on all dimensions. Custom dimensions available — include specifications in RFQ.</p>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 4 — CLINICAL PERFORMANCE / FINISHING (Industrial) ══ */}
      <section id="section-finishing" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12">
            <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Clinical Performance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Finishing Specifications</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FINISHING.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-7">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-base font-bold text-navy-900">{f.title}</h3>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded border shrink-0 ${f.priority === "Clinical Standard" || f.priority === "Required" ? "border-blue-300 text-blue-700 bg-blue-50" : "border-gray-200 text-gray-500 bg-white"}`}>
                    {f.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{f.detail}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 5 — PACKING (Bauhaus) ══ */}
      <section id="section-packing" className="bg-amber-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12">
            <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Packing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Pack Options</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "📦", label: "Individual Polybag", note: "Standard institutional export pack per blanket" },
              { icon: "🔢", label: "Dozen Pack (12 pcs)", note: "Banded units — efficient hospital linen room distribution" },
              { icon: "🛍️", label: "Retail Box", note: "Consumer-facing retail programmes and gift sets" },
              { icon: "🤐", label: "Zippered Carry Bag", note: "Baby and personal care retail — premium presentation" },
              { icon: "📫", label: "Bulk Carton", note: "Government and institutional procurement — unmarked export carton" },
              { icon: "✏️", label: "Custom Label", note: "Buyer-branded labels — include requirements in RFQ" },
            ].map((p, i) => (
              <motion.div key={p.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white rounded-xl p-5 border border-amber-100 flex items-start gap-4">
                <span className="text-2xl" aria-hidden="true">{p.icon}</span>
                <div>
                  <p className="text-sm font-bold text-navy-900">{p.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{p.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 6 — CERTIFICATIONS (Luxury) ══ */}
      <section id="section-certifications" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Certifications</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Quality &amp; Compliance Marks</h2>
            <p className="text-gray-400 mt-3 text-sm max-w-lg">The certification stack required by NHS, hospital and government procurement programmes globally.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div key={cert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div style={{ width: 56, height: 40 }} className="flex items-center justify-center bg-white/10 rounded-lg overflow-hidden shrink-0">
                    <Image src={cert.img} alt={cert.name} width={56} height={40} className="object-contain" sizes="56px" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{cert.name}</p>
                    <p className="text-gold text-xs">{cert.full}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{cert.desc}</p>
                <span className={`self-start text-[10px] font-bold px-2.5 py-0.5 rounded-full ${cert.tier === "Required" || cert.tier === "Premium" ? "bg-gold/20 text-gold" : "bg-white/10 text-gray-400"}`}>
                  {cert.tier}
                </span>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 7 — MARKET SECTORS (Geometric) ══ */}
      <section id="section-sectors" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12">
            <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Who Buys</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Market Sectors</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div key={s.abbr} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-full" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 bg-purple-100 text-purple-700 rounded-xl text-xs font-bold flex items-center justify-center shrink-0">{s.abbr}</span>
                    <h3 className="text-base font-bold text-navy-900">{s.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.detail}</p>
                  <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">{s.market}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 8 — EXPORT TERMS (Art Deco) ══ */}
      <section id="section-export" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Export Terms</p>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Incoterms &amp; Shipping</h2>
            <p className="text-gray-500 mt-3 text-sm">All programmes ship from Karachi or Port Qasim, Pakistan.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {EXPORT_TERMS.map((t, i) => (
              <motion.div key={t.term} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold rounded-l-xl" />
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl font-black text-navy-900">{t.term}</span>
                    <span className="text-xs text-gray-400">{t.full}</span>
                  </div>
                  <p className="text-xs text-gold font-semibold mb-2">{t.port}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 9 — SOURCING PROCESS (Typography-First) ══ */}
      <section id="section-process" className="bg-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12">
            <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">The Sourcing Process</h2>
          </motion.div>
          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-6 pb-10 relative">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-100" aria-hidden="true" />
                )}
                <div className="w-10 h-10 rounded-full bg-navy-900 text-gold text-sm font-bold flex items-center justify-center shrink-0 z-10">{step.num}</div>
                <div className="pt-1">
                  <h3 className="text-base font-bold text-navy-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 10 — SUSTAINABILITY (Organic) ══ */}
      <section id="section-sustainability" className="bg-green-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12">
            <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Environmental &amp; Ethical Commitments</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg leading-relaxed">Cotton cellular blankets are inherently lower-impact than synthetic alternatives — and we take that further.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUSTAINABILITY.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-green-100">
                <span className="text-2xl mb-3 block" aria-hidden="true">{s.icon}</span>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                  <span className="text-[10px] font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{s.tag}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 11 — LEAD TIMES (Command Center) ══ */}
      <section id="section-leadtimes" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-4">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Timeline</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Indicative Lead Times</h2>
          </motion.div>
          <div className="mb-8 bg-amber-500/15 border border-amber-500/30 rounded-xl px-5 py-3">
            <p className="text-amber-400 text-xs font-semibold">⚠ All timelines are indicative only and subject to order volume, factory scheduling and material availability. For NHS tenders and government procurement, engage minimum 90 days before required delivery date.</p>
          </div>
          <div className="space-y-4">
            {LEAD_STAGES.map((stage, i) => (
              <motion.div key={stage.stage} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className={`w-10 h-10 rounded-lg ${stage.color} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">{stage.stage}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{stage.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-gold font-mono font-bold text-sm">{stage.days} days</p>
                  <p className="text-gray-500 text-[10px]">indicative</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION OEM ══ */}
      <section id="section-oem" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12">
            <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Custom Specification</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">OEM Programme</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg leading-relaxed">Every specification element is configurable to your procurement standard or retail brief.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OEM_FEATURES.map((f, i) => (
              <motion.div key={f.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <p className="text-3xl font-black text-gray-200 mb-2">{f.num}</p>
                <h3 className="text-base font-bold text-navy-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">FAQ</p>
            <h2 className="text-3xl font-bold text-navy-900">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={faqOpen === i}
                >
                  <span className="text-sm font-semibold text-navy-900 leading-relaxed">{faq.q}</span>
                  <span className={`text-gold text-lg font-bold shrink-0 transition-transform duration-200 ${faqOpen === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="overflow-hidden">
                      <p className="text-sm text-gray-500 leading-relaxed px-6 pb-6">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SAME-TIER PAGES ═══ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Thermal Blankets</p>
            <h2 className="text-2xl font-bold text-navy-900">More Thermal Blanket Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Fleece Thermal Blankets", desc: "Anti-pill polyester fleece. Healthcare, institutional and retail blanket programmes.", href: "/hometextile/thermalblankets/fleecethermalblankets/", img: "/images/hero/hero-fleece-thermal-blankets.webp", alt: "Pakistan fleece thermal blankets manufacturer — OEM anti-pill polyester blankets for healthcare and retail buyers" },
              { name: "Hospital Linen", desc: "Surgical gowns, medical scrubs, patient gowns and huck towels. ISO certified.", href: "/hometextile/hospitallinen/", img: "/images/hero/hero-hospital-linen.webp", alt: "Pakistan hospital linen manufacturer — OEM surgical gowns and medical scrubs for healthcare buyers worldwide" },
              { name: "Industrial Linen", desc: "Shop towels and fender covers for automotive, maintenance and industrial buyers.", href: "/hometextile/industriallinen/", img: "/images/hero/hero-industrial-linen.webp", alt: "Pakistan industrial linen manufacturer — OEM shop towels and fender covers for automotive buyers worldwide" },
            ].map((p) => (
              <Link href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image src={p.img} alt={p.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
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

      {/* ══ FINAL CTA ══ */}
      <section className="bg-[#0D1B2A] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Get a Quote</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Source Cellular Blankets from Pakistan</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Share your GSM requirement, size specification, certification requirements and destination. We provide a detailed quotation within 3–5 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
              Request a Quote <span aria-hidden="true">&#8594;</span>
            </Link>
            <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
