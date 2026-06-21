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
        className={`group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 ${dark ? "border border-gold/60 text-gold hover:bg-gold hover:text-navy-900" : "border-2 border-gold text-navy-900 hover:bg-gold shadow-xs"}`}
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  {
    id: "terry",
    name: "Heavy Terry Loop",
    badge: "Volume Standard",
    gsm: "350–450 GSM",
    hand: "Looped pile — maximum oil and grease absorbency",
    best: ["Auto Workshops", "Dealerships", "Grease Applications"],
    detail: "The industry-standard shop towel construction. Looped terry pile creates maximum surface area per square centimetre — drawing and retaining oil, grease, coolant and solvent residues far more effectively than flat-weave equivalents. The pile also provides mechanical scrubbing action against metal surfaces, cylinder walls and engine components.",
    spec: "100% cotton. Looped pile on both faces. GSM 350–450. Bleached white or natural. Anti-shrink finish available.",
  },
  {
    id: "huck",
    name: "Huck Weave",
    badge: "",
    gsm: "300–380 GSM",
    hand: "Multi-thread honeycomb — stable surface, high absorbency",
    best: ["Print Industry", "Food Processing", "General Industrial"],
    detail: "Huck weave provides a structured honeycomb surface that balances absorbency with surface stability — superior to flat weave, without the fibre-snagging risk of terry pile against machined surfaces. Common in print shop cleaning, food processing and precision manufacturing where a non-linting flat-ish surface is preferred.",
    spec: "100% cotton. Huck/honeycomb weave structure. GSM 300–380. Plain bleached white.",
  },
  {
    id: "plain",
    name: "Plain Weave Canvas",
    badge: "",
    gsm: "300–360 GSM",
    hand: "Flat, durable — high tensile strength for abrasive applications",
    best: ["Heavy Machinery", "Abrasive Cleaning", "Technical Wipe"],
    detail: "Where terry pile would catch on metal edges or machined surfaces, canvas-weight plain weave cotton provides a flat, durable wipe. Lower absorbency than terry but higher tensile strength — the choice where mechanical integrity matters more than maximum fluid uptake.",
    spec: "100% cotton plain weave. GSM 300–360. Natural or bleached. Anti-shrink optional.",
  },
];

const GSM_TIERS = [
  { gsm: "300–350", name: "Standard Duty", pct: 40, colour: "bg-slate-300", market: "General workshop, light industrial, food service", note: "Entry-level industrial wiper — adequate for light maintenance tasks" },
  { gsm: "350–400", name: "Heavy Duty", pct: 75, colour: "bg-slate-500", market: "Automotive workshops, dealerships, mechanical service", note: "USA automotive distribution standard — balance of absorbency and cost", featured: true },
  { gsm: "400–450+", name: "Industrial Duty", pct: 55, colour: "bg-slate-700", market: "Heavy machinery, oil field, industrial maintenance", note: "Maximum pile depth — heaviest fluid retention for severe applications" },
];

const SIZES = [
  { code: "STD", name: "Standard", dims: "35 × 35 cm", use: "Auto workshops, standard distribution pack" },
  { code: "LRG", name: "Large", dims: "40 × 50 cm", use: "Heavy equipment, engine work, large component wipe" },
  { code: "ROL", name: "Industrial Roll", dims: "To specification", use: "Roll-dispensing equipment in manufacturing facilities" },
  { code: "CST", name: "Custom", dims: "To specification", use: "Specialist industrial applications, dispensing equipment" },
];

const SECTORS = [
  { abbr: "AUT", name: "Automotive Workshops", detail: "Independent repair shops, franchised service centres, tyre fitters — the largest single segment", market: "USA · Canada · UK" },
  { abbr: "DLR", name: "Auto Dealerships", detail: "New vehicle prep, PDI (pre-delivery inspection), service department", market: "USA · UK · EU" },
  { abbr: "PRN", name: "Print Industry", detail: "Press and roller cleaning — huck weave preferred for non-linting surface", market: "USA · EU · Australia" },
  { abbr: "MFG", name: "Manufacturing", detail: "Machine maintenance, assembly line cleaning, component prep", market: "USA · EU · China" },
  { abbr: "JAN", name: "Janitorial Supply", detail: "Distribution to commercial cleaning, facilities management, buildings", market: "USA · Canada · UK" },
  { abbr: "FPR", name: "Food Processing", detail: "Food-safe cotton cleaning — anti-bacterial finish available", market: "USA · EU · Australia" },
];

const FINISHING = [
  { title: "Oil-Absorbent Treatment", desc: "Enhances hydrocarbon absorption — modifies fibre surface to attract oil-based fluids. Improves performance in automotive and industrial lubrication applications.", tag: "Performance" },
  { title: "Anti-Bacterial", desc: "Food-safe finish for food processing environments where bacterial contamination risk must be controlled. Not required for standard automotive applications.", tag: "Food-Safe" },
  { title: "Anti-Shrink", desc: "Compacting treatment to reduce dimensional change in industrial laundering. Standard recommendation for reusable programmes.", tag: "Laundry" },
  { title: "Plain Bleached White", desc: "Standard finish — clean white for visual cleanliness indication and product differentiation. No dye or finish additive in base spec.", tag: "Standard" },
];

const PACK_OPTIONS = [
  { icon: "🔟", label: "Dozen (12 pcs) Banded", note: "USA automotive distribution standard" },
  { icon: "5️⃣0️⃣", label: "50-Pack Bulk", note: "Wholesale and janitorial supply channels" },
  { icon: "📦", label: "200-Pack Bulk Carton", note: "High-volume programmatic supply" },
  { icon: "✏️", label: "Custom Pack Format", note: "To your distribution requirement — specify in RFQ" },
];

const CERTIFICATIONS = [
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and documented process control", img: "/images/certs/cert-iso-9001.webp" },
  { name: "BSCI", full: "Business Social Compliance", desc: "Ethical audit — labour standards, worker welfare", img: "/images/certs/cert-bsci.webp" },
  { name: "WRAP", full: "Responsible Accredited Production", desc: "12-principle manufacturing compliance — apparel/textile export", img: "/images/certs/cert-wrap.webp" },
  { name: "OEKO-TEX", full: "Standard 100", desc: "Chemical safety — no harmful substances in finished textile", img: "/images/certs/cert-oeko-tex.webp" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Price at port of loading. Standard for distributors with freight arrangements." },
  { term: "CIF", full: "Cost Insurance Freight", port: "Destination port", desc: "We arrange ocean freight and insurance. Price covers delivery to your port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange freight to your port. Buyer arranges own insurance." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics. Lowest price, highest buyer responsibility." },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Construction, GSM, colour and pack format specification", colour: "bg-gold" },
  { stage: "Sample Production", days: "10–15", desc: "Pre-production sample to your GSM and construction spec", colour: "bg-slate-500" },
  { stage: "Bulk Production", days: "30–45", desc: "From confirmed purchase order. Volume product — predictable scheduling.", colour: "bg-slate-700" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment weight, dimension and quantity audit", colour: "bg-purple-500" },
  { stage: "Sea Freight", days: "8–30", desc: "18–30 days to USA East/West coast, 8–14 days to UK", colour: "bg-teal-500" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Specify construction (terry, huck, plain), GSM, size, colour (white or stripe), quantity and destination." },
  { num: "02", title: "Factory Matching", desc: "We shortlist certified mills with the relevant heavy industrial cotton construction capacity. Pricing in 3–5 days." },
  { num: "03", title: "Sample Production", desc: "Pre-production sample produced to your GSM and construction specification. 10–15 days from spec lock." },
  { num: "04", title: "Sample Approval", desc: "Review weight, construction, absorbency and colour before purchase order placement." },
  { num: "05", title: "Bulk Production", desc: "Production commences. Shop towels are a volume category — factory scheduling is well-established." },
  { num: "06", title: "QC & Shipment", desc: "Pre-shipment GSM measurement, quantity audit and packing verification before vessel loading from Karachi." },
];

const FAQS = [
  { q: "What is the difference between shop towels, shop rags and industrial wipers?", a: "Largely interchangeable in the USA — 'shop towels' and 'shop rags' dominate automotive distribution; 'industrial wiper' is more common in manufacturing procurement. In UK and Australia the same product is typically called 'cleaning cloth' or 'cotton rag.' The construction is the same regardless of terminology." },
  { q: "What construction is most suitable for oil and grease absorption?", a: "Heavy terry loop is the primary choice for oil and grease — the looped pile creates maximum surface area drawing and retaining hydrocarbons. Huck weave is preferred where a stable flat surface is needed (print industry, precision machining). Plain weave is strongest tensile — used where mechanical integrity matters more than fluid uptake." },
  { q: "Can shop towels be supplied with oil-absorbent treatment?", a: "Yes. Oil-absorbent treatment modifies the fibre surface to attract hydrocarbon fluids — improving oil and grease uptake beyond baseline cotton performance. Anti-bacterial treatment is also available for food processing applications." },
  { q: "What is the standard pack size for bulk automotive distribution?", a: "Dozen (12 pcs) banded is the dominant USA automotive distribution format. For wholesale supply chain buyers, 50-pack or 200-pack bulk carton reduces per-unit packaging cost. Specify your distribution format in the RFQ." },
  { q: "Are blue and white stripe shop towels available?", a: "Yes. Blue and white stripe is yarn-dyed and a widely recognised USA distribution variant — useful for colour-coding different fluid applications. Plain white is the dominant specification and lowest cost option." },
  { q: "Which certifications apply to industrial shop towels?", a: "ISO 9001 is standard. BSCI ethical audit applies to the supply network. WRAP compliance is available for buyers with manufacturing ethics requirements. OEKO-TEX Standard 100 is available where chemical safety documentation is required — relevant for food processing applications." },
  { q: "Can custom sizes be supplied for specialist industrial applications?", a: "Yes. Standard sizes are 35×35 cm and 40×50 cm. Custom dimensions for heavy machinery, precision manufacturing or dispensing equipment are available. Custom sizes typically require higher minimum quantities — specify in RFQ." },
  { q: "What is the indicative lead time for bulk shop towel orders?", a: "RFQ response 3–5 days. Sample 10–15 days. Bulk production 30–45 days from confirmed PO. Sea freight 18–30 days to USA, 8–14 days to UK. Advance purchasing 60–75 days before required delivery recommended for distributors with seasonal peaks. All timelines are indicative only." },
];

export default function ShopTowelsContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [activeConstruction, setActiveConstruction] = useState("terry");
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-shop-towels.webp" fill alt="Pakistan shop towel manufacturer — heavy cotton terry and huck weave shop rags for automotive workshops and industrial buyers worldwide" className="object-cover" priority sizes="100vw" />
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
              <span className="text-gold">Shop Towels</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Industrial Textile Export</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Shop Towels<br /><span className="text-gold">Manufacturer</span><br />Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading sources heavy cotton terry and huck weave shop towels from Pakistan&rsquo;s certified industrial mills. 300&ndash;450 GSM. Oil and grease absorbent. Bulk programmes for USA automotive distribution, industrial supply chains and janitorial procurement.
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
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Shop Towel Supply — Pakistan</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Heavy-Duty Industrial Cotton. High-Volume Supply.</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s industrial cotton mills produce shop towels to the specifications demanded by USA automotive distribution — the world&rsquo;s largest shop towel market. Terry, huck and canvas constructions across the full GSM range.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "3", label: "Constructions" },
                { val: "300–450", label: "GSM Range" },
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
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Shop Towels — All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏭</span>
                <div>
                  <p className="text-slate-400 text-xs font-semibold tracking-[0.2em] uppercase">Industrial</p>
                  <h3 className="text-xl font-bold text-white mt-0.5">Constructions</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {CONSTRUCTIONS.map((c) => (
                  <button key={c.id} onClick={() => setActiveConstruction(c.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${activeConstruction === c.id ? "bg-gold text-navy-900 border-gold" : "bg-white/10 text-gray-300 border-white/20 hover:border-gold/50"}`}>
                    {c.name.split(" ")[0]} {c.name.split(" ")[1]}
                  </button>
                ))}
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-white">{ac.name}</p>
                  {ac.badge && <span className="text-[10px] font-bold text-gold bg-gold/20 px-2 py-0.5 rounded-full">{ac.badge}</span>}
                </div>
                <p className="text-xs text-slate-400 mb-2">{ac.gsm} · {ac.hand}</p>
                <p className="text-xs text-gray-300 leading-relaxed">{ac.detail.slice(0, 200)}...</p>
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore All Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">⚖️</span>
                <div>
                  <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight Guide</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">GSM by Application</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className={`bg-white rounded-xl p-3.5 border ${t.featured ? "border-gold" : "border-slate-100"}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-bold text-navy-900">{t.gsm} GSM</span>
                      {t.featured && <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full">Auto Standard</span>}
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full ${t.colour} rounded-full`} style={{ width: `${t.pct}%` }} />
                    </div>
                    <p className="text-xs text-gray-500">{t.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="Full Weight Guide" />
            </motion.div>
          </div>

          {/* Row 2 — 4 compact */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-gray-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizes</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Dimensions</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {SIZES.map((s) => (
                  <div key={s.code} className="flex items-center gap-2">
                    <span className="w-8 h-5 bg-gray-200 text-gray-700 rounded text-[9px] font-bold flex items-center justify-center shrink-0">{s.code}</span>
                    <span className="text-xs text-gray-600">{s.dims}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="Size Guide" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Packing</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Pack Options</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {PACK_OPTIONS.map((p) => (
                  <div key={p.label} className="flex items-start gap-2">
                    <span className="text-gold text-xs mt-0.5">✓</span>
                    <span className="text-xs text-gray-600 leading-tight">{p.label}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-packing" label="Packing Detail" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-emerald-600 text-xs font-semibold tracking-[0.2em] uppercase">Certifications</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Quality Marks</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                {["ISO 9001", "BSCI", "WRAP", "OEKO-TEX"].map((c) => (
                  <span key={c} className="bg-white text-navy-900 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-100">{c}</span>
                ))}
              </div>
              <ExploreBtn sectionId="section-certifications" label="Cert Detail" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Sectors</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Who Buys</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {SECTORS.slice(0, 4).map((s) => (
                  <div key={s.abbr} className="flex items-center gap-2">
                    <span className="w-8 h-5 bg-blue-100 text-blue-700 rounded text-[9px] font-bold flex items-center justify-center shrink-0">{s.abbr}</span>
                    <span className="text-xs text-gray-600 truncate">{s.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sectors" label="All Sectors" />
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Finishing</p>
                <h3 className="text-lg font-bold text-navy-900 mt-0.5">Treatments</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {FINISHING.map((f) => (
                  <div key={f.title} className="flex items-start gap-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${f.tag === "Performance" ? "bg-gold/20 text-gold" : "bg-gray-100 text-gray-500"} shrink-0`}>{f.tag}</span>
                    <span className="text-xs text-gray-600 leading-tight">{f.title}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-finishing" label="Finishing Detail" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
                <h3 className="text-lg font-bold text-navy-900 mt-0.5">Incoterms</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((t) => (
                  <div key={t.term} className="flex items-center gap-2">
                    <span className="w-10 text-center font-bold text-sm text-teal-700 bg-teal-100 rounded px-1 py-0.5">{t.term}</span>
                    <span className="text-xs text-gray-600">{t.full}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="Export Terms" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
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
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div>
                <p className="text-slate-400 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
                <h3 className="text-xl font-bold text-white mt-0.5">Sourcing Steps</h3>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{p.num}</span>
                    <p className="text-xs text-gray-300 font-semibold">{p.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-process" label="Full Process" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gold/8 border border-gold/20 rounded-2xl p-7 flex flex-col gap-5 min-h-[260px]" style={{ background: "rgba(212,160,23,0.06)" }}>
              <div>
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">USA Market</p>
                <h3 className="text-xl font-bold text-navy-900 mt-0.5">Why Shop Towels Matter</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                Shop towels are a high-frequency, repeat-order category in USA automotive distribution. Every auto service centre, dealership and mechanical workshop uses them daily. Pakistan&rsquo;s industrial cotton infrastructure — the same mills that supply major international brands — produces the construction and weight specification the US market demands, at competitive FOB pricing.
              </p>
              <Link href="/rfq/" className="self-start inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold transition-colors">
                Request a Programme Quote <span aria-hidden="true">→</span>
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
              <p className="font-semibold text-navy-900">Shop Towel Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction comparison, GSM selection and packing formats for industrial and distributor programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Industrial Textile Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times and certification requirements for industrial linen export.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Spec Sheets &amp; Packing Formats</p>
              <p className="text-xs text-gray-500 leading-relaxed">Shop towel spec sheets, construction comparison and packing format documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Shop Towels?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, GSM, quantity and packing format. RFQ to factory quotation: 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS (Industrial) */}
      <section id="section-constructions" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Three Industrial Constructions</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg leading-relaxed">Different fluid types and applications require different cotton constructions. Match the construction to the task.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-lg font-bold text-navy-900">{c.name}</h3>
                  {c.badge && <span className="text-[10px] font-bold text-gold bg-gold/10 px-2.5 py-0.5 rounded-full shrink-0">{c.badge}</span>}
                </div>
                <p className="text-xs font-mono text-slate-500 mb-3">{c.gsm}</p>
                <p className="text-sm text-gray-500 mb-4 font-medium">{c.hand}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.detail}</p>
                <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-3">{c.spec}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {c.best.map((b) => (
                    <span key={b} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded">{b}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 2 — GSM (Command Center) */}
      <section id="section-gsm" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Specification</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">GSM by Application Duty</h2>
            <p className="text-gray-400 mt-3 text-sm">Match weight to application severity — heavier GSM means more pile, more absorbency, higher cost.</p>
          </motion.div>
          <div className="space-y-4">
            {GSM_TIERS.map((t, i) => (
              <motion.div key={t.gsm} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white/5 border rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-5 ${t.featured ? "border-gold/40" : "border-white/10"}`}>
                <div className="sm:w-48 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg">{t.gsm} GSM</span>
                    {t.featured && <span className="text-[10px] font-bold text-gold bg-gold/20 px-2 py-0.5 rounded-full">Standard</span>}
                  </div>
                  <p className="text-slate-400 text-sm">{t.name}</p>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${t.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full ${t.colour} rounded-full`} />
                  </div>
                  <p className="text-gray-400 text-xs">{t.market}</p>
                </div>
                <p className="text-gray-500 text-xs max-w-xs leading-relaxed">{t.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 3 — SIZES (Scientific) */}
      <section id="section-sizes" className="bg-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <p className="text-gray-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Size Matrix</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Dimension Specification</h2>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-5 py-3 rounded-tl-xl text-xs font-semibold uppercase tracking-wide">Code</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide">Dimensions</th>
                  <th className="text-left px-5 py-3 rounded-tr-xl text-xs font-semibold uppercase tracking-wide">Application</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((s, i) => (
                  <tr key={s.code} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-5 py-4 font-mono font-bold text-slate-700">{s.code}</td>
                    <td className="px-5 py-4 font-semibold text-navy-900">{s.name}</td>
                    <td className="px-5 py-4 font-mono text-gold">{s.dims}</td>
                    <td className="px-5 py-4 text-gray-500">{s.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-xs mt-4">±2 cm manufacturing tolerance. Custom dimensions and industrial roll configurations available on request.</p>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 4 — SECTORS (Military/Tactical) */}
      <section id="section-sectors" className="bg-slate-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Market Intelligence</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Sector Breakdown</h2>
            <p className="text-slate-400 mt-3 text-sm max-w-lg">Shop towels serve multiple industrial procurement channels. The USA automotive distribution network is the primary volume sector globally.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div key={s.abbr} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 bg-gold/20 text-gold rounded-lg text-xs font-bold flex items-center justify-center shrink-0">{s.abbr}</span>
                  <h3 className="text-sm font-bold text-white">{s.name}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">{s.detail}</p>
                <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">{s.market}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 5 — FINISHING (Bauhaus) */}
      <section id="section-finishing" className="bg-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Finishing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Treatment Options</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FINISHING.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 items-start p-6 border border-gray-100 rounded-xl bg-gray-50">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${f.tag === "Performance" ? "bg-gold/20 text-gold" : f.tag === "Standard" ? "bg-navy-900 text-white" : "bg-gray-200 text-gray-600"}`}>
                  {f.tag.slice(0, 3).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 6 — PACKING (Geometric) */}
      <section id="section-packing" className="bg-amber-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Packing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Pack Options for Distribution</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PACK_OPTIONS.map((p, i) => (
              <motion.div key={p.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-amber-100">
                <span className="text-2xl mb-4 block" aria-hidden="true">{p.icon}</span>
                <h3 className="text-sm font-bold text-navy-900 mb-1">{p.label}</h3>
                <p className="text-xs text-gray-500">{p.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 7 — CERTIFICATIONS (Minimalist) */}
      <section id="section-certifications" className="bg-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-emerald-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Certifications</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Quality &amp; Compliance</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div key={cert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 items-start border-b border-gray-100 pb-6">
                <div style={{ width: 56, height: 40 }} className="flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                  <Image src={cert.img} alt={cert.name} width={56} height={40} className="object-contain" sizes="56px" />
                </div>
                <div>
                  <p className="text-base font-bold text-navy-900">{cert.name} <span className="text-sm font-normal text-gray-400">— {cert.full}</span></p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 8 — EXPORT TERMS (Typography-First) */}
      <section id="section-export" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Incoterms &amp; Shipping</h2>
            <p className="text-gray-400 mt-3 text-sm">All programmes ship from Karachi or Port Qasim, Pakistan.</p>
          </motion.div>
          <div className="space-y-4">
            {EXPORT_TERMS.map((t, i) => (
              <motion.div key={t.term} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col sm:flex-row sm:items-start gap-5 bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="sm:w-24 shrink-0">
                  <p className="text-2xl font-black text-gold">{t.term}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.full}</p>
                </div>
                <div>
                  <p className="text-xs text-gold/70 mb-1 font-semibold">{t.port}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 9 — PROCESS (Art Deco) */}
      <section id="section-process" className="bg-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Sourcing Process</p>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">How It Works</h2>
          </motion.div>
          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-6 pb-10 relative">
                {i < PROCESS_STEPS.length - 1 && <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-100" aria-hidden="true" />}
                <div className="w-10 h-10 rounded-full border-2 border-gold text-gold text-sm font-bold flex items-center justify-center shrink-0 z-10 bg-white">{step.num}</div>
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

      {/* SECTION 10 — MARKETS (Neo-Brutalist) */}
      <section id="section-markets" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Geography</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Primary Export Markets</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { market: "USA", role: "Primary Volume", note: "Largest global shop towel market by far. Automotive distribution, janitorial supply, industrial." },
              { market: "Canada", role: "Strong Growth", note: "Close to USA distribution patterns. French-language packaging available." },
              { market: "UK", role: "Secondary", note: "Same product called 'cotton rags' or 'cleaning cloths' in UK distribution channels." },
              { market: "Australia", role: "Active Market", note: "Automotive aftermarket strong. Similar industrial profile to USA at smaller scale." },
              { market: "EU", role: "Fragmented", note: "Germany, Netherlands — strong industrial and automotive sectors." },
              { market: "Middle East", role: "Growing", note: "UAE, Saudi — large vehicle parks and automotive sector procurement." },
              { market: "SE Asia", role: "Emerging", note: "Manufacturing growth driving industrial textile demand." },
              { market: "Other", role: "On Request", note: "All markets served. Include destination in RFQ for freight estimate." },
            ].map((m, i) => (
              <motion.div key={m.market} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border-2 border-navy-900 rounded-xl p-4">
                <p className="text-lg font-black text-navy-900">{m.market}</p>
                <p className="text-[10px] font-bold text-gold uppercase mb-2">{m.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{m.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 11 — LEAD TIMES (Luxury) */}
      <section id="section-leadtimes" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-4">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Timeline</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Indicative Lead Times</h2>
          </motion.div>
          <div className="mb-8 bg-amber-500/15 border border-amber-500/30 rounded-xl px-5 py-3">
            <p className="text-amber-400 text-xs font-semibold">⚠ All timelines are indicative only. Subject to order volume, factory scheduling and material availability.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEAD_STAGES.map((stage, i) => (
              <motion.div key={stage.stage} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
                <div className={`w-10 h-10 rounded-xl ${stage.colour} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-white font-bold text-sm">{stage.stage}</p>
                <p className="text-gold font-mono font-bold text-xl">{stage.days} <span className="text-xs text-gray-400 font-normal">days indicative</span></p>
                <p className="text-gray-400 text-xs leading-relaxed">{stage.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
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
              { name: "Fender Covers", desc: "Cotton and poly-cotton fender covers for automotive detailing and mechanic shops.", href: "/hometextile/industriallinen/fendercovers/", img: "/images/hero/hero-fender-covers.webp", alt: "Pakistan fender covers manufacturer — OEM cotton and poly-cotton automotive fender covers for car dealers" },
              { name: "Hospital Linen", desc: "Surgical gowns, medical scrubs, patient gowns and huck towels. ISO certified.", href: "/hometextile/hospitallinen/", img: "/images/hero/hero-hospital-linen.webp", alt: "Pakistan hospital linen manufacturer — OEM surgical gowns and medical scrubs for healthcare buyers worldwide" },
              { name: "Thermal Blankets", desc: "Cellular cotton and fleece thermal blankets for NHS, care homes and institutions.", href: "/hometextile/thermalblankets/", img: "/images/hero/hero-thermal-blankets.webp", alt: "Pakistan thermal blankets manufacturer — OEM cellular and fleece blankets for NHS and institutional buyers" },
            ].map((p) => (
              <Link href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Source Shop Towels from Pakistan</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Share your construction type, GSM, size, colour, quantity and destination. Receive a detailed programme quotation within 3–5 business days.
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
