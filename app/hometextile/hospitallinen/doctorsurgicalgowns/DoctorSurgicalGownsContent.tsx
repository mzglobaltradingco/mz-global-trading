"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 160, behavior: "smooth" });
}

function BackToTop({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex justify-center mt-16">
      <button
        onClick={() => scrollToId("bento-grid")}
        className={`group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 ${dark ? "border border-gold/60 text-gold hover:bg-gold hover:text-navy-900" : "border-2 border-gold text-navy-900 hover:bg-gold shadow-xs"}`}
        style={{ animation: "btt-pulse 2.2s ease-out infinite" }}
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} aria-hidden="true">↑</motion.span>
        Move back to top
      </button>
      <style>{`@keyframes btt-pulse{0%{box-shadow:0 0 0 0 rgba(212,160,23,0.45)}70%{box-shadow:0 0 0 10px rgba(212,160,23,0)}100%{box-shadow:0 0 0 0 rgba(212,160,23,0)}}`}</style>
    </div>
  );
}

function ExploreBtn({ sectionId, label }: { sectionId: string; label: string }) {
  return (
    <button onClick={() => scrollToId(sectionId)} className="group self-start inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold transition-colors mt-auto pt-4">
      {label}<span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">→</span>
    </button>
  );
}

const CONSTRUCTIONS = [
  { id: "tc-reusable", name: "TC 65/35 Poly-Cotton (Reusable)", badge: "Industry Standard", gsm: "130–160 GSM", desc: "Plain weave TC 65/35 is the primary specification for institutional reusable surgical gowns. The polyester content ensures dimensional stability through repeated industrial laundering and autoclaving; the cotton component provides breathability for extended surgical use. Anti-bacterial and fluid-repellent finishes applied using OEKO-TEX certified chemistry. Maintains specification dimensions across 100+ industrial wash cycles.", best: "Hospitals, Surgical Centres, Procurement Agencies" },
  { id: "cotton-reusable", name: "100% Cotton Plain Weave (Reusable)", badge: "", gsm: "120–150 GSM", desc: "Specified where synthetic-free requirements apply — particularly in markets with specific procurement standards mandating natural fibre construction. Lighter and more breathable than TC variants; requires more careful laundering to maintain dimensional stability. Compatible with all standard finishing treatments including anti-bacterial and sterilisation-safe chemistry.", best: "Markets requiring natural fibre compliance" },
  { id: "nonwoven-disposable", name: "Non-Woven Polypropylene (Disposable)", badge: "Single Use", gsm: "35–60 GSM", desc: "SMS (Spunbond-Meltblown-Spunbond) or PP non-woven construction for single-use disposable surgical gown programmes. Inherent fluid barrier properties without applied finishing. Supplied individually sealed in sterile packaging. Appropriate for programmes prioritising elimination of cross-contamination risk over reuse economics.", best: "High-risk procedures, infection control protocols" },
];

const SIZES = [
  { code: "XS", note: "Chest ≤86 cm" }, { code: "S", note: "Chest 86–91 cm" },
  { code: "M", note: "Chest 91–97 cm" }, { code: "L", note: "Chest 97–102 cm" },
  { code: "XL", note: "Chest 102–107 cm" }, { code: "XXL", note: "Chest 107–117 cm" },
  { code: "3XL", note: "Chest 117–127 cm" }, { code: "Custom", note: "To specification" },
];

const FINISHES = [
  { name: "Anti-Bacterial", tag: "Infection Control", desc: "Inhibits bacterial growth on fabric surface. Applied using silver-ion or quaternary ammonium chemistry — OEKO-TEX certified. Maintains efficacy across 50+ industrial wash cycles." },
  { name: "Fluid / Blood Repellent", tag: "Barrier Protection", desc: "DWR-based hydrophobic finish providing resistance to liquid penetration on non-critical zones. Critical for front-of-gown panels in moderate-splash procedures." },
  { name: "Anti-Static", tag: "Theatre Safety", desc: "Prevents static charge accumulation in operating theatre environments where flammable anaesthetic gases may be present. Applied to poly-cotton constructions." },
  { name: "Autoclave Safe / Sterilisable", tag: "Sterilisation Cycle", desc: "All finishing chemistry confirmed compatible with standard autoclave sterilisation at 121°C (15 PSI) and 134°C (30 PSI). Durability across sterilisation cycles confirmed pre-production." },
];

const CERTIFICATIONS_DATA = [
  { name: "ISO 13485", desc: "Medical devices QMS — required for hospital procurement in EU and increasingly USA", tier: "Premium" },
  { name: "EN 13795", desc: "EU surgical drapes and gowns standard — liquid barrier and microbial performance", tier: "Premium" },
  { name: "ISO 9001", desc: "General quality management systems certification", tier: "Standard" },
  { name: "BSCI", desc: "Business Social Compliance — ethical production audit", tier: "Standard" },
  { name: "Sedex", desc: "Supply chain ethical data exchange compliance", tier: "Standard" },
  { name: "SA8000", desc: "Maximum social compliance — independently audited", tier: "Premium" },
  { name: "WRAP", desc: "12-principle responsible manufacturing compliance", tier: "Standard" },
  { name: "OEKO-TEX", desc: "No harmful substances — certified for medical-use textiles", tier: "Standard" },
];

const DECORATION = [
  { method: "Embroidered Logo", placement: "Left chest / back yoke", note: "Survives autoclave sterilisation without degradation — preferred for institutional programmes" },
  { method: "Heat Transfer Label", placement: "Chest / sleeve", note: "For name or department identification on individual garments" },
  { method: "No Decoration", placement: "Plain garment", note: "Standard for government ministry and neutral institutional procurement" },
];

const PACKING = [
  { label: "Individual Polybag", note: "Standard institutional supply — sealed, individually folded" },
  { label: "5-Pack Institutional", note: "5 gowns per poly-wrapped pack, carton of 6 packs" },
  { label: "12-Pack Carton", note: "12 gowns per carton — standard hospital stock quantity" },
  { label: "Sterile Individual Wrap", note: "Individually sealed sterile packaging for disposable programmes" },
  { label: "Bulk Carton", note: "Mixed sizes per carton for large institutional orders" },
];

const EXPORT_TERMS = [
  { term: "FOB", desc: "Karachi / Port Qasim. Most common for buyers with established freight arrangements." },
  { term: "CIF", desc: "Cost, Insurance & Freight to destination port. We arrange ocean freight and insurance." },
  { term: "CFR", desc: "Cost & Freight to destination. Buyer arranges own marine insurance." },
  { term: "EXW", desc: "Ex-Works factory gate. Buyer manages all logistics from factory." },
];

const SECTORS = [
  { name: "Hospitals & Surgical Centres", detail: "Direct institutional procurement — full certification documentation, size ratio breakdown", market: "USA · UK · EU · Middle East · Australia" },
  { name: "Medical Supply Distributors", detail: "Wholesale bulk export — GPO/IDN qualification documentation", market: "USA · Canada · EU · Australia" },
  { name: "Government Health Ministries", detail: "Tender procurement — EN 13795 test reports, ISO 13485 certification packages", market: "Middle East · SE Asia · Africa" },
  { name: "Procurement Agencies", detail: "Multi-facility procurement and aggregation programmes", market: "Worldwide" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Share construction (TC / cotton / disposable), GSM, size breakdown, finish, certification requirements, quantity and destination." },
  { num: "02", title: "Factory Evaluation", desc: "We shortlist ISO-certified Pakistan facilities with confirmed medical textile experience and required certifications. Pricing in 3–5 days." },
  { num: "03", title: "Sample & Testing", desc: "Pre-production samples produced. EN 13795 or ISO test reports arranged through SGS, BV or Intertek as required." },
  { num: "04", title: "Sample Approval", desc: "Review construction, sizing, decoration, finish and compliance documentation before purchase order." },
  { num: "05", title: "Bulk Production", desc: "Production commences from PO and approved sample. Duration depends on volume and construction." },
  { num: "06", title: "QC & Export", desc: "Pre-shipment inspection, packing by size, loading. Full compliance documentation package provided." },
];

const FAQS = [
  { q: "What is the primary fabric construction for institutional surgical gowns?", a: "TC 65/35 poly-cotton plain weave at 140–160 GSM is the dominant specification for institutional reusable surgical gowns. The polyester content ensures shape retention and dimensional stability through repeated industrial laundering and autoclave sterilisation. The cotton component provides essential breathability for surgical staff wearing gowns across extended procedures. Anti-bacterial and fluid repellent finishes are applied using OEKO-TEX certified chemistry." },
  { q: "Which certifications are required for EU hospital procurement?", a: "For EU surgical gown procurement, EN 13795 (Surgical Drapes, Gowns and Clean Air Suits) is the applicable performance standard, covering liquid barrier performance, microbial penetration resistance and tensile strength. ISO 13485 (Medical Devices Quality Management System) is increasingly required as a process quality standard. BSCI or Sedex ethical audit compliance is standard for EU hospital groups. We provide all certification documentation and third-party test reports." },
  { q: "Can logos be embroidered on surgical gowns?", a: "Yes. Embroidery is the preferred decoration method — typically placed on the left chest or back yoke. Embroidered identification survives autoclave sterilisation without degradation. Thread colour is matched to your institutional specification. For government ministry supply where plain presentation is standard, ungarnished gowns are supplied without decoration." },
  { q: "What size breakdown should I specify for a hospital programme?", a: "A typical institutional distribution for general surgical departments: XS 5%, S 15%, M 35%, L 30%, XL 10%, XXL+ 5%. This varies significantly by staff demographics and region. We accommodate any size ratio breakdown within a single purchase order. Specify your required distribution in the RFQ and we will confirm production feasibility." },
  { q: "Are autoclave-safe surgical gowns available from Pakistan?", a: "Yes. TC poly-cotton and 100% cotton surgical gowns are manufactured to be compatible with standard autoclave sterilisation at 121°C (15 PSI) and 134°C (30 PSI). All finishing chemistry is confirmed sterilisation-cycle compatible before bulk production, and durability across sterilisation cycles is validated through pre-production testing." },
  { q: "What is the difference between reusable and disposable surgical gowns?", a: "Reusable gowns are woven TC poly-cotton or cotton constructions designed for repeated laundering and sterilisation — typically 100+ cycles before replacement. Lifecycle cost per use is lower than disposable when amortised across cycles. Disposable non-woven gowns are single-use polypropylene or SMS construction — inherent fluid barrier without applied finish, supplied individually sealed sterile. Disposables eliminate cross-contamination risk and laundry operations but have higher per-use cost and environmental impact." },
  { q: "What documentation is provided with each shipment?", a: "Standard shipment documentation includes: commercial invoice, packing list, certificate of origin, test reports (as specified — EN 13795, ISO 13485), factory audit reports (BSCI, Sedex, ISO), OEKO-TEX certificate. For government and ministry procurement, additional documentation (quality declaration, material certification, shade cards) is provided as required by tender specification." },
  { q: "What is the indicative lead time for surgical gown orders?", a: "Lead times are indicative and subject to construction, programme volume and factory capacity. As a general guide: sample production takes 12–18 days from specification and fabric approval; third-party testing (EN 13795) adds 10–15 days; bulk production takes 35–55 days from purchase order. For orders requiring sterile individual packing, add 5–8 days. Sea freight adds 20–35 days. Government and ministry programmes should allow 90–120 days from RFQ to delivery." },
];

export default function DoctorSurgicalGownsContent() {
  const [activeConst, setActiveConst] = useState("tc-reusable");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConst) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-doctor-surgical-gowns.webp" fill alt="Pakistan surgical gown manufacturer — reusable TC poly-cotton and cotton surgical gowns for hospitals and medical distributors worldwide" className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/hometextile/hospitallinen/" className="hover:text-gold transition-colors">Hospital Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Doctor Surgical Gowns</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Medical Textile Export</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Surgical Gown<br /><span className="text-gold">Manufacturer</span><br />Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading sources surgical gowns from Pakistan&rsquo;s ISO-certified medical textile facilities. TC 65/35 poly-cotton and 100% cotton reusable gowns. Anti-bacterial, fluid repellent, autoclave safe. ISO 13485, EN 13795, BSCI certified. Export to hospitals, distributors and health ministries worldwide.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote<span aria-hidden="true">&#8594;</span></Link>
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
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Surgical Gown Supply — Pakistan</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Compliant Surgical Gowns for Institutional Procurement</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">Pakistan&rsquo;s ISO-certified medical textile facilities meet EN 13795 and ISO 13485 performance standards required by EU and USA hospital procurement. Complete compliance documentation with every shipment.</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[{ val: "50+", label: "Vetted Factories" }, { val: "35+", label: "Export Markets" }, { val: "10+", label: "Certifications" }, { val: "3", label: "Constructions" }].map((s) => (
                <div key={s.label} className="text-center"><p className="text-3xl font-bold text-gold">{s.val}</p><p className="text-xs text-gray-500 mt-1 leading-tight whitespace-nowrap">{s.label}</p></div>
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
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3"><span className="text-2xl" aria-hidden="true">🧪</span><div><p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Military/Tactical</p><h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3></div></div>
              <div className="flex flex-col gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-blue-100 flex items-center gap-3">
                    <div className="flex-1"><p className="text-sm font-semibold text-navy-900">{c.name}</p><p className="text-xs text-gray-500">{c.gsm}</p></div>
                    {c.badge && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full shrink-0">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-slate-50 border border-slate-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3"><span className="text-2xl" aria-hidden="true">📏</span><div><p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p><h3 className="text-xl font-bold text-navy-900 mt-0.5">Size Range</h3></div></div>
              <div className="grid grid-cols-4 gap-2 flex-1">
                {SIZES.map((s) => (
                  <div key={s.code} className="bg-white rounded-xl p-3 border border-slate-100 text-center">
                    <p className="text-sm font-bold text-navy-900">{s.code}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{s.note}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="View All Sizes" />
            </motion.div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-red-50 border border-red-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-red-600 text-xs font-semibold tracking-[0.2em] uppercase">Performance</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Finishing</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {FINISHES.map(f => (
                  <div key={f.name} className="flex items-start gap-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700 shrink-0 mt-0.5">{f.tag.split(" ")[0]}</span>
                    <span className="text-xs text-gray-600 leading-tight">{f.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-finishes" label="Finishing Details" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.07 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Compliance</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Certifications</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                {CERTIFICATIONS_DATA.slice(0, 5).map(c => (
                  <span key={c.name} className="bg-white text-navy-900 text-[10px] font-semibold px-2 py-0.5 rounded border border-green-100">{c.name}</span>
                ))}
              </div>
              <ExploreBtn sectionId="section-certifications" label="Cert Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.14 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Branding</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Decoration</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {DECORATION.map(d => (
                  <div key={d.method} className="flex items-start gap-2">
                    <span className="text-gold text-xs mt-0.5">✓</span>
                    <span className="text-xs text-gray-600 leading-tight">{d.method}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Decoration Options" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.21 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Packing</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Pack Formats</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {PACKING.slice(0, 4).map(p => (
                  <div key={p.label} className="flex items-start gap-2">
                    <span className="text-amber-500 text-xs mt-0.5">•</span>
                    <span className="text-xs text-gray-600 leading-tight">{p.label}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-packing" label="Packing Detail" />
            </motion.div>
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Buyer Sectors</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.name} className="flex items-start gap-2">
                    <span className="text-teal-400 text-xs mt-0.5 shrink-0">▶</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900 leading-tight">{s.name}</p>
                      <p className="text-[10px] text-gray-500">{s.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sectors" label="Sector Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Logistics</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Export Terms</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((t) => (
                  <div key={t.term} className="flex items-start gap-2">
                    <span className="w-10 text-center font-bold text-xs text-orange-700 bg-orange-100 rounded px-1 py-0.5 shrink-0">{t.term}</span>
                    <p className="text-xs text-gray-600 leading-tight">{t.desc}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="Export Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.16 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom Programme</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">OEM Programme</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1 content-start">
                {[
                  { title: "Reusable or Disposable", note: "TC / Cotton / Non-woven" },
                  { title: "Custom Finishing", note: "Anti-bacterial · Fluid repellent" },
                  { title: "Logo Embroidery", note: "Chest or yoke placement" },
                  { title: "Sterile Packing", note: "Individual sealed option" },
                ].map((f) => (
                  <div key={f.title} className="bg-white rounded-lg p-2.5 border border-indigo-100">
                    <p className="text-[11px] font-semibold text-navy-900 leading-tight">{f.title}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{f.note}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="OEM Detail" />
            </motion.div>
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📋</span>
                <div>
                  <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Compliance</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Compliance Documentation</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {CERTIFICATIONS_DATA.slice(0, 5).map((c) => (
                  <div key={c.name} className="flex items-start gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${c.tier === "Premium" ? "bg-rose-100 text-rose-700" : "bg-white text-gray-500 border border-rose-100"}`}>{c.tier}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{c.name}</p>
                      <p className="text-[10px] text-gray-500 leading-tight">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-compliance" label="Compliance Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}
              className="bg-cyan-50 border border-cyan-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🔄</span>
                <div>
                  <p className="text-cyan-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Sourcing Process</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {PROCESS_STEPS.map((s, i) => (
                  <div key={s.num} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-xs font-semibold text-navy-900 leading-tight">{s.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-process" label="Full Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link prefetch={false} href="/knowledge/surgical-gown-standards/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Surgical Gown Standards: AAMI Level 1–4, SMS & Woven Fabric</p>
              <p className="text-xs text-gray-500 leading-relaxed">AAMI PB70 protection levels, fabric constructions, sterilisation compatibility and EN 13795 EU standard.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link prefetch={false} href="/guides/sourcing-surgical-gowns-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Sourcing Surgical Gowns from Pakistan: AAMI Levels, SMS & Woven Construction</p>
              <p className="text-xs text-gray-500 leading-relaxed">Step-by-step sourcing guide — protection level selection, sterilisation compatibility, size distribution and certification.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Guide →</span>
            </Link>
            <Link prefetch={false} href="/downloads/surgical-gown-spec-template/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Surgical Gown Specification Template</p>
              <p className="text-xs text-gray-500 leading-relaxed">Document AAMI level, fabric type, sterilisation method, size distribution and certification before submitting your RFQ.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Template →</span>
            </Link>
            <Link prefetch={false} href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Surgical Gowns?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, finish, certification and quantity. RFQ to factory quotation: 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS (Military/Tactical) */}
      <section id="section-constructions" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fabric Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Reusable &amp; Disposable Construction Options</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-2xl">Construction determines barrier performance, comfort, sterilisation compatibility and lifecycle cost. Select based on procedure type, institutional laundering capacity and procurement compliance requirements.</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {CONSTRUCTIONS.map((c) => (
                <button key={c.id} onClick={() => setActiveConst(c.id)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${activeConst === c.id ? "bg-navy-900 text-white border-navy-900" : "bg-white text-navy-900 border-gray-200 hover:border-navy-900"}`}>{c.name}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={ac.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="bg-blue-50 border border-blue-100 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-navy-900">{ac.name}</h3>
                    {ac.badge && <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">{ac.badge}</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Weight</p><p className="font-semibold text-navy-900 text-sm">{ac.gsm}</p></div>
                    <div><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Best For</p><p className="font-semibold text-navy-900 text-sm">{ac.best}</p></div>
                  </div>
                </div>
                <div><p className="text-sm text-gray-600 leading-relaxed">{ac.desc}</p></div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 2 — SIZES (Neo-Brutalist) */}
      <section id="section-sizes" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Available Sizes</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">XS to 3XL — Custom Available</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xl">Reusable gowns are available in XS through 3XL. For institutional orders, specify your size breakdown ratio in the RFQ. Mixed-size orders are produced within a single purchase order. Disposable gowns typically supplied in L/XL one-size or custom-specified formats.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
              {SIZES.map((s, i) => (
                <motion.div key={s.code} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}
                  className={`rounded-2xl p-4 border-2 text-center ${s.code === "Custom" ? "border-gold bg-gold/5" : "border-gray-200 bg-white"}`}>
                  <p className="text-lg font-black text-navy-900">{s.code}</p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-tight">{s.note}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h3 className="font-bold text-navy-900 mb-2">Typical Size Distribution for Hospital Procurement</h3>
              <p className="text-sm text-gray-500 mb-4">Indicative distribution for general surgical departments. Adjust based on your facility&rsquo;s staff demographics and fit preferences.</p>
              <div className="flex flex-wrap gap-3">
                {[{ code: "XS", pct: "5%" }, { code: "S", pct: "15%" }, { code: "M", pct: "35%" }, { code: "L", pct: "30%" }, { code: "XL", pct: "10%" }, { code: "XXL+", pct: "5%" }].map((s) => (
                  <div key={s.code} className="bg-white border border-blue-100 rounded-xl px-4 py-2 text-center">
                    <p className="text-sm font-bold text-navy-900">{s.code}</p>
                    <p className="text-xs text-gold font-semibold">{s.pct}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 3 — FINISHES (Flat Design) */}
      <section id="section-finishes" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Performance Finishing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Finishing Treatments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FINISHES.map((f, i) => (
                <motion.div key={f.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-red-50 border border-red-100 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-navy-900">{f.name}</h3>
                    <span className="text-[11px] font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full shrink-0 ml-2">{f.tag}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 4 — CERTIFICATIONS (Glassmorphism) */}
      <section id="section-certifications" className="bg-[#0D1B2A] py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #D4A017 0%, transparent 60%), radial-gradient(circle at 70% 20%, #1e40af 0%, transparent 50%)" }} aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Compliance Standards</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Certifications &amp; Standards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CERTIFICATIONS_DATA.map((cert, i) => (
                <motion.div key={cert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur-xs">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-gold">{cert.name}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${cert.tier === "Premium" ? "text-gold bg-gold/20" : "text-green-400 bg-green-400/10"}`}>{cert.tier}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 5 — DECORATION (Brutalist) */}
      <section id="section-decoration" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Identification</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Decoration &amp; Labelling Options</h2>
            <div className="space-y-4">
              {DECORATION.map((d, i) => (
                <motion.div key={d.method} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="border-2 border-navy-900 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Method</p><p className="font-bold text-navy-900 text-lg">{d.method}</p></div>
                  <div><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Placement</p><p className="text-sm font-medium text-navy-900">{d.placement}</p></div>
                  <div><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Note</p><p className="text-sm text-gray-500">{d.note}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 6 — PACKING (Neumorphic) */}
      <section id="section-packing" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Pack Formats</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Packing Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PACKING.map((p, i) => (
                <motion.div key={p.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: "4px 4px 10px rgba(0,0,0,0.06), -2px -2px 6px rgba(255,255,255,0.8)" }}>
                  <p className="text-3xl font-black text-gray-100 mb-3">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-bold text-navy-900 mb-1">{p.label}</h3>
                  <p className="text-sm text-gray-500">{p.note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 7 — SECTORS (Memphis) */}
      <section id="section-sectors" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Target Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Buyer Sectors &amp; Markets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SECTORS.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="rounded-2xl p-6 border-2 border-dashed border-navy-900/20 bg-gradient-to-br from-blue-50 to-white">
                  <h3 className="font-bold text-navy-900 text-lg mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{s.detail}</p>
                  <p className="text-xs font-semibold text-gold">{s.market}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 8 — EXPORT TERMS (Retro/Vintage) */}
      <section id="section-export" className="bg-amber-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Trade Terms</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Export Incoterm Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {EXPORT_TERMS.map((t, i) => (
                <motion.div key={t.term} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-white border border-amber-100 rounded-2xl p-6">
                  <p className="text-3xl font-black text-navy-900 mb-2">{t.term}</p>
                  <p className="text-sm text-gray-500">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 9 — COMPLIANCE DOCUMENTATION (Aurora/Gradient Mesh) */}
      <section id="section-compliance" className="bg-[#0D1B2A] py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(135deg, rgba(212,160,23,0.05) 0%, transparent 50%, rgba(30,64,175,0.08) 100%)" }} aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Documentation</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Compliance Documentation Package</h2>
            <p className="text-gray-300 text-sm mb-10 max-w-2xl">Full documentation provided with every shipment. For government ministry and hospital procurement tenders, documentation packages are assembled prior to purchase order placement upon request.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Commercial Invoice & Packing List", desc: "Standard export documentation detailing item, specification, quantity, size breakdown and value." },
                { title: "Certificate of Origin", desc: "Certified Pakistan origin documentation for customs purposes." },
                { title: "ISO 13485 Certificate", desc: "Medical devices quality management system certification — factory level." },
                { title: "EN 13795 Test Report", desc: "Third-party laboratory test report (SGS / BV / Intertek) for barrier performance and microbial resistance." },
                { title: "Factory Audit Reports", desc: "BSCI, Sedex, SA8000 audit reports confirming ethical production compliance." },
                { title: "OEKO-TEX Certificate", desc: "Certification confirming absence of restricted substances in finished product." },
              ].map((doc, i) => (
                <motion.div key={doc.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="font-semibold text-white mb-2 text-sm">{doc.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{doc.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 10 — OEM PROGRAMME (Geometric) */}
      <section id="section-oem" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Custom Development</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">OEM Programme Scope</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { shape: "rounded-tl-none", title: "Construction Specification", desc: "TC ratio, cotton count, GSM, plain weave — specified to your procurement standard." },
                { shape: "rounded-tr-none", title: "Custom Sizing", desc: "Standard or custom gown lengths, sleeve lengths and wrap configurations." },
                { shape: "", title: "Colour Programme", desc: "Full reactive dye PMS range or institutional standard colours — white, blue, green, beige." },
                { shape: "", title: "Certification Package", desc: "ISO 13485, EN 13795, BSCI, Sedex — assembled to match your tender requirements." },
                { shape: "rounded-bl-none", title: "Embroidered Identification", desc: "Hospital logo, department name, individual staff name — autoclave-safe embroidery." },
                { shape: "rounded-br-none", title: "Custom Packing Format", desc: "Institutional carton, sterile individual wrap, size-labelled polybag — to your distribution spec." },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className={`bg-gray-50 border border-gray-100 rounded-2xl ${item.shape} p-6`}>
                  <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 11 — PROCESS (Code/Terminal) */}
      <section id="section-process" className="bg-gray-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">From RFQ to Certified Delivery</h2>
            <div className="bg-amber-900/30 border border-amber-600/30 rounded-2xl p-4 mb-8 flex items-start gap-3">
              <span className="text-amber-400 text-lg shrink-0" aria-hidden="true">⚠</span>
              <p className="text-sm text-amber-200">All lead times below are <strong>indicative only</strong> and depend on construction, certification testing requirements, order volume and factory scheduling.</p>
            </div>
            <div className="font-mono text-sm space-y-0">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div key={step.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="border border-green-900/50 rounded-none first:rounded-t-2xl last:rounded-b-2xl bg-black/30 p-5 border-b-0 last:border-b">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-green-400">$</span>
                    <span className="text-green-400 font-bold">step_{step.num}</span>
                    <span className="text-gray-500">{"// " + step.title}</span>
                  </div>
                  <p className="text-gray-300 pl-4">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop dark />
        </div>
      </section>

      {/* FAQ */}
      <section id="section-faq" className="bg-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors" aria-expanded={faqOpen === i}>
                    <span className="font-semibold text-navy-900 pr-4">{faq.q}</span>
                    <motion.span animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-gold text-xl shrink-0" aria-hidden="true">+</motion.span>
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SAME-TIER PAGES ═══ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Hospital Linen</p>
            <h2 className="text-2xl font-bold text-navy-900">More Hospital Linen Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Medical Scrubs", desc: "Four-way stretch and cotton-poly scrubs. NHS, private hospital and clinic programmes.", href: "/hometextile/hospitallinen/medicalscrubs/", img: "/images/hero/hero-medical-scrubs.webp", alt: "Pakistan medical scrubs manufacturer — OEM stretch and cotton-poly scrubs for NHS and hospital buyers" },
              { name: "Patient Gowns", desc: "Cotton and poly-cotton patient gowns. Open-back and snap fastening options.", href: "/hometextile/hospitallinen/patientgowns/", img: "/images/hero/hero-patient-gowns.webp", alt: "Pakistan patient gowns manufacturer — OEM cotton and poly-cotton hospital gowns for healthcare buyers" },
              { name: "Surgical Huck Towels", desc: "Cotton huck towels for surgical and clinical use. Bulk medical supply programmes.", href: "/hometextile/hospitallinen/surgicalhucktowels/", img: "/images/hero/hero-surgical-huck-towels.webp", alt: "Pakistan surgical huck towels manufacturer — OEM cotton huck towels for hospital and clinic buyers worldwide" },
            ].map((p) => (
              <Link prefetch={false} href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow">
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

      {/* FINAL CTA */}
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-snug">Source Compliant Surgical Gowns from Pakistan</h2>
            <p className="text-gray-300 text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Submit your construction requirements, certification standards, size distribution and destination. We identify the right ISO-certified Pakistan facility and return a competitive quote with full compliance documentation within 3&ndash;5 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote <span aria-hidden="true">&#8594;</span></Link>
              <Link prefetch={false} href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

