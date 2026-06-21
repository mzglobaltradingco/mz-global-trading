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
      <button onClick={() => scrollToId("bento-grid")}
        className={`group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 ${dark ? "border border-gold/60 text-gold hover:bg-gold hover:text-navy-900" : "border-2 border-gold text-navy-900 hover:bg-gold shadow-sm"}`}
        style={{ animation: "btt-pulse 2.2s ease-out infinite" }}>
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
    <button onClick={() => scrollToId(sectionId)} className="group self-start inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold transition-colors mt-auto pt-4">
      {label}
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">→</span>
    </button>
  );
}

const CONSTRUCTIONS = [
  { id: "knit-terry", name: "Knitted Terry Stretch", badge: "Professional Standard", gsm: "300–400 GSM", hand: "Stretch-conform to any fender profile, non-scratch loop surface", desc: "The professional-grade fender cover construction. Stretch knit adapts to any vehicle profile — compact to SUV — without gaps. Non-scratch terry loops protect paintwork across the full contact area. No ravel at edges. Service life is superior to woven alternatives in high-frequency professional use.", spec: "100% cotton knitted terry. Stretch: 2-way or 4-way depending on spec. GSM 300–400. Non-scratch loop surface on both faces.", colour: "bg-blue-50 border-blue-200", accent: "text-blue-600" },
  { id: "woven-terry", name: "Woven Terry", badge: "", gsm: "300–380 GSM", hand: "Stable lay, non-stretch, consistent pile density", desc: "Stable woven construction for mechanics who prefer a flat-lay cover that does not shift position. Non-scratch loop surface maintained. The non-stretch characteristic is preferred in some body shop applications where cover positioning must remain fixed.", spec: "100% cotton woven terry. Non-stretch. GSM 300–380. Hemmed edge. Non-scratch loop both faces.", colour: "bg-sky-50 border-sky-200", accent: "text-sky-600" },
  { id: "chenille", name: "Chenille", badge: "Premium", gsm: "350–450 GSM", hand: "Ultra-soft velvet surface — maximum paint protection for luxury vehicles", desc: "The premium fender cover for luxury and collector vehicle care. Chenille pile is the softest surface in automotive textile protection — no fibre hardness risk. Required specification by high-end detailing businesses and luxury dealership service departments.", spec: "100% cotton chenille pile. GSM 350–450. Ultra-soft surface. No abrasive contact possible.", colour: "bg-purple-50 border-purple-200", accent: "text-purple-600" },
  { id: "microfiber", name: "Microfiber Non-Scratch", badge: "", gsm: "300–350 GSM", hand: "Ultra-fine split-filament fibre — zero-scratch guarantee on delicate finishes", desc: "Split-filament microfiber delivers zero-scratch contact for finishes where even the softest cotton loop presents a risk. Common in ceramic coating application, paint correction and exotic vehicle care. Lightweight at equivalent protection level.", spec: "100% polyester microfiber split-filament. GSM 300–350. Zero-scratch certified. Lightweight.", colour: "bg-teal-50 border-teal-200", accent: "text-teal-600" },
];

const SIZES = [
  { code: "SM", name: "Small", dims: "28 × 45 cm", use: "Compact and city cars where standard would overhang" },
  { code: "STD", name: "Standard", dims: "35 × 55 cm", use: "Universal — covers most passenger vehicles and SUVs" },
  { code: "LRG", name: "Large", dims: "45 × 65 cm", use: "Full-size SUVs, trucks, commercial vehicles" },
  { code: "CST", name: "Custom", dims: "To specification", use: "Fleet operators, specialist vehicles, proprietary equipment" },
];

const APPLICATIONS = [
  { sector: "Auto Dealerships", use: "New vehicle PDI (pre-delivery inspection), service department daily use, branded customer-facing coverage", pack: "2-pack pair", markets: "USA · UK · EU · Middle East" },
  { sector: "Body Shops", use: "Panel repair protection, spray booth preparation, alignment and suspension work", pack: "4-pack set", markets: "USA · UK · EU · Australia" },
  { sector: "Car Washes", use: "Post-wash detailing coverage while wiping adjacent panels — prevents cross-contamination", pack: "Bulk loose", markets: "USA · Middle East" },
  { sector: "Professional Detailing", use: "Ceramic coating, paint correction, machine polishing — chenille or microfiber construction specified", pack: "2-pack or 4-pack", markets: "USA · UK · Australia · Japan" },
  { sector: "Automotive Retail", use: "Sold as aftermarket accessory to enthusiasts and independent mechanics", pack: "Retail polybag", markets: "USA · UK · EU" },
  { sector: "Fleet Operators", use: "Large vehicle fleets — custom sizing to specific fleet vehicle types", pack: "Custom", markets: "Middle East · EU · Australia" },
];

const FINISHING = [
  { title: "Non-Scratch Surface", desc: "The defining functional specification. Loop construction ensures no abrasive fibre edge contacts the vehicle finish. Standard on all constructions.", tag: "Core Feature" },
  { title: "Logo Embroidery", desc: "Company name, logo and service department designation at corner or centre placement. Artwork digitisation managed by MZ Global Trading.", tag: "Branding" },
  { title: "Oil & Solvent Resistance", desc: "Barrier coating prevents penetration of brake fluid, solvent cleaners and aggressive fluids. Enables safe reuse in body shop environments.", tag: "Optional" },
  { title: "Anti-Shrink", desc: "Dimensional stability through repeated washing. Essential for professional environments where covers are laundered between uses.", tag: "Optional" },
];

const PACK_OPTIONS = [
  { icon: "2️⃣", label: "2-Pack (Pair)", note: "Both front fenders — the standard professional format" },
  { icon: "4️⃣", label: "4-Pack (Set)", note: "Full body shop protection — front and rear fenders" },
  { icon: "📦", label: "Bulk Carton", note: "Distributor wholesale supply — loose in export carton" },
  { icon: "🛍️", label: "Retail Polybag", note: "Aftermarket accessory retail — branded bag available" },
  { icon: "✏️", label: "Custom Pack", note: "Fleet operators and OEM programmes — to brief" },
];

const CERTIFICATIONS = [
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality — standard automotive supply requirement", img: "/images/certs/cert-iso-9001.webp" },
  { name: "BSCI", full: "Business Social Compliance", desc: "Ethical production audit — dealership group supplier compliance codes", img: "/images/certs/cert-bsci.webp" },
  { name: "OEKO-TEX", full: "Standard 100", desc: "No harmful substances — EU/UK automotive retail import", img: "/images/certs/cert-oeko-tex.webp" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Price at port of loading. Standard for distributors with freight arrangements." },
  { term: "CIF", full: "Cost Insurance Freight", port: "Destination port", desc: "We arrange freight and insurance to your nominated port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange freight. Buyer arranges own insurance from origin." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Lowest price. Buyer manages all inland and ocean logistics." },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Construction, size, logo/branding and pack format specification", colour: "bg-gold" },
  { stage: "Sample & Artwork", days: "12–18", desc: "Pre-production sample and embroidery artwork placement approval", colour: "bg-blue-500" },
  { stage: "Bulk Production", days: "30–50", desc: "From confirmed purchase order and approved sample", colour: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Dimension, construction and embroidery quality audit", colour: "bg-purple-500" },
  { stage: "Sea Freight", days: "8–35", desc: "18–30 days to USA, 8–14 days to UK, 20–35 days to Australia", colour: "bg-teal-500" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Specify construction (knitted stretch, woven, chenille, microfiber), GSM, size, logo requirements and pack format." },
  { num: "02", title: "Factory Matching", desc: "We shortlist 2–3 certified mills with the relevant knitted terry or specialist construction capability." },
  { num: "03", title: "Sample & Artwork", desc: "Pre-production sample produced. Logo artwork digitised and placement approved before bulk run." },
  { num: "04", title: "Sample Approval", desc: "Confirm construction, GSM, stretch conformability, non-scratch test and embroidery placement." },
  { num: "05", title: "Bulk Production", desc: "Confirmed PO. Non-scratch surface specification maintained through production. Inline QC at embroidery stage." },
  { num: "06", title: "Pre-Shipment QC", desc: "Dimension audit, weight per m², non-scratch surface check and quantity verification before loading." },
];

const FAQS = [
  { q: "What makes knitted terry stretch the best construction for fender covers?", a: "Stretch knit conforms to any fender profile without gaps. Terry loops are non-scratch. Knitted structure doesn't ravel at edges. All three advantages over woven alternatives in professional use." },
  { q: "Can fender covers be supplied with embroidered company logo?", a: "Yes. Logo embroidery at corner or centre placement on all constructions. We manage digitisation and placement approval. Include artwork file (AI or EPS) in the RFQ." },
  { q: "What GSM is standard for professional automotive use?", a: "350 GSM knitted terry stretch is the professional standard — sufficient pile density for paintwork cushioning with the stretch conformability that defines the construction. 300 GSM for lighter-duty; 400 GSM for heavy body shop use." },
  { q: "What is the standard size and can custom dimensions be supplied?", a: "Standard is 35×55 cm — universal fit for compact cars through to most SUVs. Small (28×45 cm) for compact cars; Large (45×65 cm) for full-size SUVs and trucks. Custom dimensions available for fleet operators." },
  { q: "How are fender covers packed for dealership supply?", a: "2-pack (pair) is the standard professional format — one for each front fender. 4-pack (set) for body shops. Bulk carton for distributor wholesale. Branded retail polybag for aftermarket retail." },
  { q: "Are oil and solvent resistant fender covers available?", a: "Yes. Barrier coating finish prevents penetration of brake fluid and solvent cleaners — enables safe reuse in body shop environments. Optional finishing specification — include in RFQ if chemical exposure is likely." },
  { q: "Which certifications apply to automotive fender covers?", a: "ISO 9001 is standard for automotive supply. BSCI ethical audit is available for dealership groups with supplier compliance requirements. OEKO-TEX Standard 100 for EU/UK import markets." },
  { q: "What is the indicative lead time for fender cover orders?", a: "RFQ response 3–5 days. Sample and artwork 12–18 days. Bulk production 30–50 days from PO. Sea freight 18–30 days to USA, 8–14 days to UK. Plan 60–75 days ahead for programmatic dealership supply. All timelines are indicative only." },
];

export default function FenderCoversContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [activeConstruction, setActiveConstruction] = useState("knit-terry");
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-fender-covers.webp" fill alt="Pakistan fender cover manufacturer — knitted terry stretch non-scratch automotive fender covers for dealerships and body shops worldwide" className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/industriallinen/" className="hover:text-gold transition-colors">Industrial Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Fender Covers</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Automotive Textile Export</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Fender Covers<br /><span className="text-gold">Manufacturer</span><br />Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading sources precision automotive fender covers from Pakistan&rsquo;s certified textile mills. Knitted terry stretch, woven terry, chenille and microfiber constructions. Non-scratch surface. 300&ndash;400 GSM. Logo embroidery available for dealership branded programmes.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <button onClick={() => scrollToId("bento-grid")} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Explore Product Guide
              </button>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Fender Cover Supply — Pakistan</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Precision Automotive Protection. Professional Grade.</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s certified textile mills produce fender covers to automotive professional specifications — knitted terry stretch conforming to every vehicle profile, non-scratch loop surface protecting every finish. Dealership and body shop programmes supplied worldwide.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "4", label: "Constructions" },
                { val: "35+", label: "Export Markets" },
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

      {/* BENTO GRID */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Fender Covers — All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className={`${ac.colour} border rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🚗</span>
                <div>
                  <p className={`${ac.accent} text-xs font-semibold tracking-[0.2em] uppercase`}>Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">4 Automotive Grades</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {CONSTRUCTIONS.map((c) => (
                  <button key={c.id} onClick={() => setActiveConstruction(c.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${activeConstruction === c.id ? "bg-navy-900 text-white border-navy-900" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}>
                    {c.name.split(" ")[0]}
                  </button>
                ))}
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-navy-900">{ac.name}</p>
                  {ac.badge && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold/15 text-gold`}>{ac.badge}</span>}
                </div>
                <p className="text-xs text-gray-400 mb-2">{ac.gsm}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{ac.desc.slice(0, 200)}...</p>
              </div>
              <ExploreBtn sectionId="section-constructions" label="All Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Size Programme</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {SIZES.map((s) => (
                  <div key={s.code} className="bg-white rounded-xl px-4 py-3 border border-slate-100 flex items-start gap-3">
                    <span className="w-10 h-8 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">{s.code}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{s.name} — <span className="font-mono text-blue-600">{s.dims}</span></p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.use}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="Size Detail" />
            </motion.div>
          </div>

          {/* Row 2 — 4 compact */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Applications</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Who Uses</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {APPLICATIONS.slice(0, 4).map((a) => (
                  <div key={a.sector} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-xs text-gray-600 truncate">{a.sector}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-applications" label="Applications" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Finishing</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Options</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {FINISHING.map((f) => (
                  <div key={f.title} className="flex items-start gap-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${f.tag === "Core Feature" ? "bg-gold/20 text-gold" : "bg-gray-100 text-gray-500"}`}>{f.tag.slice(0, 3)}</span>
                    <span className="text-xs text-gray-600 leading-tight">{f.title}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-finishing" label="Finishing Detail" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-emerald-600 text-xs font-semibold tracking-[0.2em] uppercase">Packing</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Formats</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {PACK_OPTIONS.slice(0, 4).map((p) => (
                  <div key={p.label} className="flex items-center gap-2">
                    <span className="text-sm" aria-hidden="true">{p.icon}</span>
                    <span className="text-xs text-gray-600 truncate">{p.label}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-packing" label="Packing Detail" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Certifications</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Standards</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                {["ISO 9001", "BSCI", "OEKO-TEX"].map((c) => (
                  <span key={c} className="bg-white text-navy-900 text-[10px] font-semibold px-2 py-0.5 rounded border border-teal-100">{c}</span>
                ))}
              </div>
              <ExploreBtn sectionId="section-certifications" label="Cert Detail" />
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-[#0D1B2A] border border-white/10 rounded-2xl p-6 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
                <h3 className="text-lg font-bold text-white mt-0.5">Incoterms</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((t) => (
                  <div key={t.term} className="flex items-center gap-2">
                    <span className="w-10 text-center font-bold text-sm text-gold bg-gold/15 rounded px-1 py-0.5">{t.term}</span>
                    <span className="text-xs text-gray-400">{t.full}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="Export Terms" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Timeline</p>
                <h3 className="text-lg font-bold text-navy-900 mt-0.5">Lead Times</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {LEAD_STAGES.slice(0, 4).map((s) => (
                  <div key={s.stage} className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">{s.stage}</span>
                    <span className="text-xs font-bold text-navy-900">{s.days}d</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-leadtimes" label="Full Timeline" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
                <h3 className="text-lg font-bold text-navy-900 mt-0.5">Sourcing Steps</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2">
                    <span className="w-6 h-5 bg-blue-100 text-blue-700 rounded text-[9px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <span className="text-xs text-gray-600 truncate">{p.title}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-process" label="Full Process" />
            </motion.div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div>
                <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Why Non-Scratch</p>
                <h3 className="text-xl font-bold text-navy-900 mt-0.5">Paint Protection Science</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                Every scratch in vehicle paintwork during servicing represents a warranty claim, a dissatisfied customer and a rework cost. The loop surface of terry knit ensures soft cotton contacts the finish — never a hard fibre edge. The stretch conformability of knitted construction eliminates coverage gaps where exposed metal could contact paint. Both properties working together deliver genuine paint protection, not just soft fabric.
              </p>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0D1B2A] border border-white/10 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div>
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Branding Programme</p>
                <h3 className="text-xl font-bold text-white mt-0.5">Dealership OEM Covers</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed flex-1">
                Branded fender covers with your dealership or workshop logo are a professional service bay visible to every customer. Available in 2-pack or 4-pack format with embroidered name, logo and service designation. Standard knitted terry stretch construction — professional grade, branded to your specification.
              </p>
              <Link href="/rfq/" className="self-start inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-yellow-400 transition-colors">
                Request OEM Quote <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Fender Cover Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction grades, protection levels and programme sizing for automotive workshop supply.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Industrial Textile Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times and certification requirements for automotive protection textile export.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Spec Sheets &amp; Construction Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fender cover spec sheets, protection grade comparison and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Fender Covers?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction grade, quantity and packing format. RFQ to factory quotation: 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS (Material Design) */}
      <section id="section-constructions" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Four Automotive Protection Grades</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg leading-relaxed">From professional workshop standard to luxury vehicle care — each construction addresses a distinct level of paint protection requirement.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${c.colour} rounded-2xl p-7 border`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-bold text-navy-900">{c.name}</h3>
                  {c.badge && <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gold/15 text-gold shrink-0`}>{c.badge}</span>}
                </div>
                <p className={`text-xs font-semibold ${c.accent} mb-2`}>{c.gsm}</p>
                <p className="text-sm text-gray-500 italic mb-3">{c.hand}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.desc}</p>
                <p className="text-xs text-gray-400 leading-relaxed border-t border-white/50 pt-3">{c.spec}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 2 — SIZES (Flat Design) */}
      <section id="section-sizes" className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Size Programme</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Dimensions &amp; Coverage</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SIZES.map((s, i) => (
              <motion.div key={s.code} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-slate-200 flex gap-5 items-start">
                <div className="w-14 h-14 rounded-xl bg-slate-900 text-white text-sm font-bold flex items-center justify-center shrink-0">{s.code}</div>
                <div>
                  <h3 className="text-base font-bold text-navy-900">{s.name}</h3>
                  <p className="text-xl font-mono font-bold text-blue-600 mt-1">{s.dims}</p>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{s.use}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-5 text-center">±2 cm manufacturing tolerance. Custom dimensions available — include vehicle type and application in RFQ.</p>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 3 — APPLICATIONS (Organic) */}
      <section id="section-applications" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Applications</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Who Uses Fender Covers</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {APPLICATIONS.map((a, i) => (
              <motion.div key={a.sector} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <h3 className="text-base font-bold text-navy-900 mb-3">{a.sector}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{a.use}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">Pack: {a.pack}</span>
                  <span className="text-[10px] font-semibold text-navy-900 bg-white px-2.5 py-1 rounded-full border border-amber-100">{a.markets}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 4 — FINISHING (Memphis) */}
      <section id="section-finishing" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Finishing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Options &amp; Treatments</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FINISHING.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white">{f.title}</h3>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${f.tag === "Core Feature" ? "bg-gold/20 text-gold" : "bg-white/10 text-gray-400"}`}>{f.tag}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 5 — PACKING (Glassmorphism) */}
      <section id="section-packing" className="bg-gradient-to-br from-blue-50 to-sky-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Packing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Pack Formats</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PACK_OPTIONS.map((p, i) => (
              <motion.div key={p.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl p-6 border border-blue-200/50 flex items-start gap-4" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)" }}>
                <span className="text-2xl" aria-hidden="true">{p.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-navy-900">{p.label}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{p.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 6 — CERTIFICATIONS (Neumorphic) */}
      <section id="section-certifications" className="bg-gray-100 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Certifications</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Standards &amp; Compliance</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div key={cert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: "#e8edf1", boxShadow: "6px 6px 12px #c8cdd0, -6px -6px 12px #ffffff" }}>
                <div style={{ width: 56, height: 40 }} className="flex items-center justify-center bg-white rounded-lg overflow-hidden border border-white">
                  <Image src={cert.img} alt={cert.name} width={56} height={40} className="object-contain" sizes="56px" />
                </div>
                <div>
                  <p className="text-base font-bold text-navy-900">{cert.name}</p>
                  <p className="text-teal-600 text-xs">{cert.full}</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 7 — MARKETS (Aurora/Gradient Mesh) */}
      <section id="section-markets" className="bg-gradient-to-br from-navy-900 via-blue-900 to-indigo-900 py-16 lg:py-24" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1a3557 50%, #0d2b4e 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Key Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Geographic Reach</h2>
            <p className="text-gray-400 mt-3 text-sm">Export programmes active across all major automotive markets.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { market: "USA", note: "Dealership groups, body shop chains, aftermarket retail. Primary volume." },
              { market: "UK", note: "Dealership network, independent bodyshop supply." },
              { market: "Germany", note: "Automotive-dense EU market. Premium brand service centres." },
              { market: "Netherlands", note: "Import/export hub; major automotive distributor base." },
              { market: "Australia", note: "Strong automotive aftermarket. Active dealership sector." },
              { market: "Canada", note: "Similar to USA distribution patterns. French label available." },
              { market: "UAE", note: "High-density vehicle market. Luxury vehicle detailing sector." },
              { market: "Saudi Arabia", note: "Large vehicle park. Dealership and fleet operator supply." },
            ].map((m, i) => (
              <motion.div key={m.market} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-gold font-bold text-sm">{m.market}</p>
                <p className="text-gray-300 text-xs mt-1 leading-relaxed">{m.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 8 — EXPORT TERMS (Retro/Vintage) */}
      <section id="section-export" className="bg-amber-50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-amber-700 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Shipping Terms</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Export &amp; Incoterms</h2>
            <p className="text-gray-500 mt-3 text-sm">All programmes ship from Karachi or Port Qasim, Pakistan.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {EXPORT_TERMS.map((t, i) => (
              <motion.div key={t.term} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border-2 border-amber-200">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-2xl font-black text-navy-900 font-mono">{t.term}</span>
                  <span className="text-sm text-amber-700 font-semibold">{t.full}</span>
                </div>
                <p className="text-xs text-amber-600 font-semibold mb-2">{t.port}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 9 — PROCESS (Skeuomorphic) */}
      <section id="section-process" className="bg-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">How We Source for You</h2>
          </motion.div>
          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-6 pb-10 relative">
                {i < PROCESS_STEPS.length - 1 && <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-100" aria-hidden="true" />}
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0 z-10">{step.num}</div>
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

      {/* SECTION 10 — LEAD TIMES (Brutalist) */}
      <section id="section-leadtimes" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-4">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Timeline</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Indicative Lead Times</h2>
          </motion.div>
          <div className="mb-8 bg-amber-500/15 border border-amber-500/30 rounded-xl px-5 py-3">
            <p className="text-amber-400 text-xs font-semibold">⚠ All timelines are indicative only. Subject to order volume, factory scheduling and material availability.</p>
          </div>
          <div className="space-y-4">
            {LEAD_STAGES.map((stage, i) => (
              <motion.div key={stage.stage} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }}
                className="border-2 border-white/20 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className={`w-10 h-10 rounded-lg ${stage.colour} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">{stage.stage}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{stage.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-gold font-mono font-bold">{stage.days} days</p>
                  <p className="text-gray-500 text-[10px]">indicative</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 11 — OEM BRANDING (Layered Card) */}
      <section id="section-oem" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM Programme</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Branded Dealership Programme</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="space-y-4">
              {[
                { num: "01", title: "Logo Digitisation", desc: "We convert your artwork (AI, EPS, PDF) to embroidery-ready stitch file. Placement previewed before production approval." },
                { num: "02", title: "Construction Choice", desc: "Knitted terry stretch for standard servicing, chenille for luxury vehicle programmes. Both available with logo embroidery." },
                { num: "03", title: "Pack & Presentation", desc: "2-pack or 4-pack in branded polybag. Dealership name on packaging. Ready for counter display or service kit inclusion." },
                { num: "04", title: "Programme Management", desc: "Repeat order scheduling, stock management and direct dealership group supply. Consistent quality across all batches." },
              ].map((f, i) => (
                <motion.div key={f.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex gap-4 p-5 bg-gray-50 border border-gray-100 rounded-xl">
                  <span className="text-2xl font-black text-gray-200 shrink-0">{f.num}</span>
                  <div>
                    <h3 className="text-base font-bold text-navy-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col gap-6">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Why Branded Fender Covers</p>
              <p className="text-white text-lg font-bold leading-snug">Your brand is visible in the service bay, in front of every customer who walks in.</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Branded fender covers are a low-cost, high-visibility touchpoint. Every customer who sees their vehicle protected by your logo-embroidered cover associates professionalism and care with your service department. They are not just tool protection — they are your brand message delivered where it matters most: at point of service.
              </p>
              <Link href="/rfq/" className="self-start inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm">
                Request Branded Programme Quote <span aria-hidden="true">&#8594;</span>
              </Link>
            </motion.div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">FAQ</p>
            <h2 className="text-3xl font-bold text-navy-900">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left" aria-expanded={faqOpen === i}>
                  <span className="text-sm font-semibold text-navy-900 leading-relaxed">{faq.q}</span>
                  <span className={`text-gold text-lg font-bold shrink-0 transition-transform duration-200 ${faqOpen === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Industrial Linen</p>
            <h2 className="text-2xl font-bold text-navy-900">More Industrial Linen Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Shop Towels", desc: "Heavy-duty cotton shop towels for automotive, industrial and mechanical workshops.", href: "/hometextile/industriallinen/shoptowels/", img: "/images/hero/hero-shop-towels.webp", alt: "Pakistan shop towels manufacturer — OEM heavy-duty cotton shop towels for automotive and industrial buyers" },
              { name: "Hospital Linen", desc: "Surgical gowns, medical scrubs, patient gowns and huck towels. ISO certified.", href: "/hometextile/hospitallinen/", img: "/images/hero/hero-hospital-linen.webp", alt: "Pakistan hospital linen manufacturer — OEM surgical gowns and medical scrubs for healthcare buyers worldwide" },
              { name: "Thermal Blankets", desc: "Cellular cotton and fleece thermal blankets for NHS, care homes and institutions.", href: "/hometextile/thermalblankets/", img: "/images/hero/hero-thermal-blankets.webp", alt: "Pakistan thermal blankets manufacturer — OEM cellular and fleece blankets for NHS and institutional buyers" },
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

      {/* FINAL CTA */}
      <section className="bg-[#0D1B2A] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Get a Quote</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Source Fender Covers from Pakistan</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Share your construction preference, size, branding requirements, quantity and destination. Detailed programme quotation within 3–5 business days.
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
