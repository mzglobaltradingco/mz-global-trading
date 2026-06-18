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
      <button onClick={() => scrollToId("bento-grid")}
        className={`group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 ${dark ? "border border-gold/60 text-gold hover:bg-gold hover:text-navy-900" : "border-2 border-gold text-navy-900 hover:bg-gold shadow-sm"}`}
        style={{ animation: "btt-pulse 2.2s ease-out infinite" }}>
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} aria-hidden="true">↑</motion.span>
        Back to overview
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
  { id: "cotton-plain", name: "100% Cotton Plain Weave", badge: "Institutional Standard", gsm: "120–160 GSM", use: "Hospital wards, aged-care facilities, outpatient departments", detail: "Plain weave cotton remains the definitive construction for reusable hospital patient gowns in most institutional procurement specifications. The open weave structure maximises breathability and patient comfort during extended wear. Bleach-stable for standard hospital laundering — retains dimensional integrity through high-temperature decontamination cycles. Available in white (most common), pale blue and soft print options for children&rsquo;s wards. Standard construction for NHS, EU hospital and government health ministry supply." },
  { id: "tc-plain", name: "TC Poly-Cotton 65/35", badge: "", gsm: "130–180 GSM", use: "High-launder environments, budget-conscious programmes", detail: "The 65/35 poly-cotton blend extends launder cycle life relative to 100% cotton at a lower unit cost — relevant for programmes where patient gown replacement frequency is high. Polyester content reduces post-launder ironing requirements. Slightly reduced breathability versus cotton makes TC less suitable for high-temperature environments. Common in Middle East and budget-tier USA hospital supply programmes." },
  { id: "jersey-knit", name: "Jersey Knit Wrap-Style", badge: "Comfort", gsm: "140–180 GSM", use: "Comfort-priority wards, rehabilitation, aged-care", detail: "Knitted jersey gown with wrap-style open back — designed for ease of patient dressing and clinical access without full gown removal. The knit structure provides inherent stretch and a softer hand feel than woven constructions, relevant for comfort-priority environments including rehabilitation units, palliative care and aged-care facilities. Wrap-front and full-open-back variants available." },
];

const SIZES = [
  { code: "Ped XS/S", range: "Ages 2–5 / Height 90–110 cm", type: "Pediatric" },
  { code: "Ped S/M", range: "Ages 6–10 / Height 110–140 cm", type: "Pediatric" },
  { code: "S/M", range: "Adult — standard hospital population", type: "Adult" },
  { code: "L/XL", range: "Adult — standard larger fit", type: "Adult" },
  { code: "XXL/3XL", range: "Adult bariatric sizing", type: "Adult" },
  { code: "Custom", range: "To your specified dimensions", type: "Bespoke" },
];

const GSM_TIERS = [
  { gsm: "120–140", name: "Standard Lightweight", note: "Most NHS and EU hospital specifications — balanced absorbency and breathability at lowest weight.", highlight: true },
  { gsm: "140–165", name: "Durable Mid-Weight", note: "Extended launder cycle life. Preferred for high-turnover institutions and Middle East supply.", highlight: false },
  { gsm: "165–180", name: "Heavy-Duty Knit", note: "Jersey knit range — inherently heavier due to construction. Comfort-priority gowns.", highlight: false },
];

const OPENINGS = [
  { name: "Open-Back (Overlap)", icon: "👔", desc: "Standard two-tie overlap back — allows clinical access to back and spine without full gown removal. Universal hospital specification." },
  { name: "Full-Open Back", icon: "🩺", desc: "Continuous open back secured by single or double tie. Maximum clinical access. Procedural and surgical ward standard." },
  { name: "Wrap-Front", icon: "🔄", desc: "Jersey knit wrap gown — closes at front. Easier self-dressing for rehabilitation and aged-care patients." },
  { name: "Half-Open / Modesty", icon: "🛡️", desc: "Reduced aperture for modesty preference. Common in Middle East hospital procurement." },
];

const FINISHES = [
  { name: "Anti-Bacterial", code: "AB", desc: "Reduces surface bacterial load — OEKO-TEX certified chemistry for skin-contact clinical garments. Relevant for isolation ward gowns." },
  { name: "Fluid Repellent", code: "FR", desc: "Hydrophobic DWR finish on outer surface. Limits absorbency of liquid splash — common in procedural ward specifications." },
  { name: "Autoclave Safe", code: "AS", desc: "Fabric finishing chemistry confirmed compatible with autoclave sterilisation at 121°C and 134°C for reusable gown programmes." },
  { name: "Plain (No Treatment)", code: "NT", desc: "Untreated natural cotton — the most common specification. Maximum breathability and comfort. Standard institutional supply." },
];

const DECORATION = [
  { name: "Plain White / Solid Colour", use: "Universal adult ward standard", market: "USA · UK · EU · Australia" },
  { name: "Printed Juvenile Patterns", use: "Children&rsquo;s wards — reduces patient anxiety", market: "Pediatric hospitals worldwide" },
  { name: "Hospital Logo / Embroidery", use: "Institutional identity branding", market: "Premium private hospital programmes" },
  { name: "Custom Pattern (Woven / Print)", use: "Distinctive ward design identity", market: "Private hospitals · Specialist facilities" },
];

const CERTIFICATIONS = [
  { name: "ISO 9001", desc: "Quality management — universal institutional procurement baseline" },
  { name: "ISO 13485", desc: "Medical device QMS — increasingly specified in hospital tender documents" },
  { name: "BSCI", desc: "Ethical production audit — NHS supply chain standard" },
  { name: "Sedex", desc: "Ethical supply chain data compliance" },
  { name: "OEKO-TEX", desc: "No restricted substances — for skin-contact patient garments" },
  { name: "SA8000", desc: "Highest social compliance standard" },
];

const SECTORS = [
  { name: "Hospital Acute Wards", detail: "Standard adult patient gown procurement for acute and general hospital wards", market: "USA · UK · EU · Australia" },
  { name: "Children&rsquo;s Hospitals", detail: "Pediatric sizing with printed juvenile patterns for children&rsquo;s wards and pediatric departments", market: "USA · UK · EU · Australia" },
  { name: "Aged-Care Facilities", detail: "Comfort-priority jersey wrap gowns for residential aged-care environments", market: "USA · UK · Australia · EU" },
  { name: "Government Health Ministries", detail: "Large-volume national health system gown supply with full tender documentation", market: "Middle East · Africa · SE Asia" },
  { name: "Medical Distributors", detail: "Bulk export for regional medical supply distributors supplying hospitals", market: "USA · EU · Middle East" },
  { name: "Outpatient & Day Surgery", detail: "Procedural gowns for outpatient and day surgery centres requiring disposable or reusable supply", market: "USA · UK · EU · Canada" },
];

const PACKING = [
  { name: "Individually Polybag", note: "Per garment — ward stock standard" },
  { name: "Ward Pack (10 pcs)", note: "Pre-counted ward supply packs" },
  { name: "Dozen-Bundle (12 pcs)", note: "Standard distributor supply unit" },
  { name: "Bulk Carton by Size", note: "Mixed-size cartons labelled for ward distribution" },
  { name: "Sterile Pack (with add-on)", note: "Individual sterile barrier pack — add-on cost" },
];

const PROCESS_STEPS = [
  { num: "01", title: "RFQ Submission", desc: "Specify construction, GSM, opening style, size range, decoration, certifications and target destination." },
  { num: "02", title: "Factory Shortlist", desc: "We match 2–3 certified Pakistan healthcare textile facilities to your specification and compliance requirements." },
  { num: "03", title: "Fabric & Colour Approval", desc: "Fabric swatches and colour samples. White and standard colours at shorter approval lead times." },
  { num: "04", title: "Garment Sample", desc: "Physical garment sample produced in approved fabric and opening style. 14–18 days from approvals." },
  { num: "05", title: "Bulk Production", desc: "From purchase order and sample approval. Duration depends on quantity and decoration complexity." },
  { num: "06", title: "QC, Documentation & Export", desc: "Pre-shipment inspection, certification documentation assembly, packing by size, vessel loading." },
];

const FAQS = [
  { q: "What is the standard patient gown construction for NHS hospitals?", a: "NHS supply chain predominantly specifies 100% cotton plain weave at 120–140 GSM for reusable patient gowns. The plain weave construction provides the breathability required for patient comfort during extended wear in hospital wards. Bleach-stable natural cotton withstands NHS-standard high-temperature industrial laundering (60°C or 71°C) and repeated decontamination cycles without significant dimensional change. Open-back with two-tie overlap is the standard NHS aperture specification." },
  { q: "What sizes are available for pediatric patient gowns?", a: "We supply pediatric patient gowns in two standard size ranges: Pediatric XS/S (ages 2–5, approximately 90–110 cm height) and Pediatric S/M (ages 6–10, approximately 110–140 cm height). Pediatric gowns are available in printed juvenile patterns to reduce patient anxiety in children&rsquo;s wards — a common specification for paediatric hospital procurement. Custom pediatric dimensions to your specified height/weight range can be accommodated with a sample review step." },
  { q: "Can patient gowns be supplied with printed patterns?", a: "Yes. Printed juvenile patterns are a standard option for pediatric ward supply — vibrant prints on 100% cotton plain weave in popular children&rsquo;s motifs (animals, geometric, abstract). Adult gown printing is less common but available for private hospital identity programmes. Custom artwork printing requires print approval before bulk production. Plain white and solid colours are the standard specification for adult ward supply in institutional programmes." },
  { q: "Are patient gowns autoclave-compatible?", a: "Autoclave compatibility depends on fabric construction and finishing. 100% cotton plain weave gowns without performance finish treatment are generally autoclave-compatible at 121°C and 134°C standard cycles — cotton fibres tolerate autoclaving better than synthetic blends. TC poly-cotton gowns may experience dimensional distortion at high autoclave temperatures. Where autoclave sterilisation is a firm procurement requirement, specify this in the RFQ and we will confirm the exact construction and finishing parameters for the required sterilisation cycle." },
  { q: "What is the difference between open-back and wrap-front patient gowns?", a: "Open-back gowns — the institutional standard — allow clinical access to a patient&rsquo;s back, spine and posterior for examination, procedures and wound care without full gown removal. Open-back with two-tie overlap is the most common configuration. Full-open-back gowns extend the aperture for maximum procedural access. Wrap-front jersey knit gowns are designed differently: they close at the front, provide stretch and softer fabric contact, and are used in rehabilitation, physiotherapy and aged-care environments where ease of self-dressing is more important than posterior clinical access." },
  { q: "Do patient gowns require specific certifications for hospital procurement?", a: "Certification requirements vary by market and hospital procurement standard. ISO 9001 quality management is the universal baseline. BSCI ethical audit is standard for NHS supply chain. Sedex compliance is required by most major NHS procurement frameworks. ISO 13485 (medical device QMS) is increasingly specified in formal hospital tender documents, particularly in the EU and for large NHS framework agreements. OEKO-TEX Standard 100 is specified for skin-contact patient garments in many EU hospital procurement specifications." },
  { q: "Can patient gowns be supplied with hospital logos?", a: "Yes — embroidery is the preferred identification method. Hospital logo embroidery on the chest pocket or neckband is available. For large institutional programmes, embroidery at point of manufacture is typically more cost-effective than post-delivery decoration. Embroidery withstands industrial laundering and standard decontamination cycles. For programmes where individual ward or unit identification is required (rather than a hospital logo), woven label or embroidered text is the standard approach." },
  { q: "What is the indicative lead time for a patient gown programme?", a: "Lead times are indicative and depend on construction, print complexity and order volume. Typical sequence: fabric and colour approval 7–10 days; garment sample 14–18 days from approvals; bulk production 30–50 days from purchase order for plain gowns, longer for printed or embroidered programmes. Sea freight adds 18–30 days to most destinations. Government health ministry tenders with fixed delivery windows should allow a minimum of 80 days from RFQ to delivery at destination port." },
];

export default function PatientGownsContent() {
  const [activeConst, setActiveConst] = useState("cotton-plain");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConst) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-home-textiles.webp" fill alt="Pakistan patient gowns manufacturer — hospital gowns for NHS, EU and global healthcare buyers in bulk" className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-navy-900/78" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Healthcare Textile Export</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Patient Gowns<br /><span className="text-gold">Manufacturer</span><br />Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading sources hospital patient gowns from Pakistan&rsquo;s certified healthcare textile mills. Plain weave cotton, TC poly-cotton and jersey knit wrap-style. Adult, bariatric and pediatric sizing. Open-back, full-open and wrap configurations. Anti-bacterial, autoclave-safe and fluid-repellent finish options. ISO 9001, BSCI, Sedex certified.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote<span aria-hidden="true">&#8594;</span></Link>
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
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Patient Gowns Supply — Pakistan</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Hospital Patient Gown Programmes at Institutional Scale</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">Pakistan&rsquo;s certified healthcare textile facilities supply NHS trusts, US hospital groups, Middle East government health ministries and global medical distributors. Full certification documentation provided with every shipment.</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[{ val: "50+", label: "Vetted Factories" }, { val: "35+", label: "Export Markets" }, { val: "10+", label: "Certifications" }, { val: "6", label: "Size Variants" }].map((s) => (
                <div key={s.label} className="text-center"><p className="text-3xl font-bold text-gold">{s.val}</p><p className="text-xs text-gray-400 mt-1 leading-tight whitespace-nowrap">{s.label}</p></div>
              ))}
            </div>
            <Link href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit">Request a Quote <span aria-hidden="true">&#8594;</span></Link>
          </motion.div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Everything on Patient Gowns</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the detailed section.</p>
          </div>
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3"><span className="text-2xl" aria-hidden="true">🧵</span><div><p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Flat Design</p><h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3></div></div>
              <div className="flex flex-col gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-blue-100 flex items-start gap-3">
                    <div className="flex-1"><p className="text-sm font-semibold text-navy-900">{c.name}</p><p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p></div>
                    {c.badge && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full shrink-0 mt-0.5">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-purple-50 border border-purple-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3"><span className="text-2xl" aria-hidden="true">📐</span><div><p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizes</p><h3 className="text-xl font-bold text-navy-900 mt-0.5">Adult &amp; Pediatric Sizes</h3></div></div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {SIZES.map((s) => (
                  <div key={s.code} className={`bg-white rounded-xl p-3 border ${s.type === "Pediatric" ? "border-purple-200" : s.type === "Adult" ? "border-blue-100" : "border-gold/30"}`}>
                    <p className="text-sm font-bold text-navy-900">{s.code}</p>
                    <p className={`text-[10px] font-medium mt-0.5 ${s.type === "Pediatric" ? "text-purple-600" : s.type === "Adult" ? "text-blue-600" : "text-gold"}`}>{s.type}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{s.range}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="View Full Size Range" />
            </motion.div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { icon: "⚖️", label: "GSM Weight", sub: "120–180 GSM range", sid: "section-gsm", color: "bg-slate-50 border-slate-100" },
              { icon: "🚪", label: "Opening Styles", sub: "Open-back · Wrap-front · Full-open", sid: "section-openings", color: "bg-rose-50 border-rose-100" },
              { icon: "⚗️", label: "Performance Finishes", sub: "Autoclave · Anti-bacterial · Fluid repellent", sid: "section-finishes", color: "bg-green-50 border-green-100" },
              { icon: "🎨", label: "Decoration Options", sub: "Plain · Printed · Embroidered", sid: "section-decoration", color: "bg-amber-50 border-amber-100" },
            ].map((b, i) => (
              <motion.div key={b.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className={`${b.color} border rounded-2xl p-5 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => scrollToId(b.sid)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && scrollToId(b.sid)}>
                <span className="text-2xl" aria-hidden="true">{b.icon}</span>
                <p className="text-sm font-bold text-navy-900">{b.label}</p>
                <p className="text-xs text-gray-400">{b.sub}</p>
              </motion.div>
            ))}
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { icon: "🏅", label: "Certifications", sub: "ISO 9001 · BSCI · Sedex · OEKO-TEX", sid: "section-certifications", color: "bg-teal-50 border-teal-100" },
              { icon: "🏥", label: "Buyer Sectors", sub: "Hospitals · Aged care · Distributors", sid: "section-sectors", color: "bg-indigo-50 border-indigo-100" },
              { icon: "📦", label: "Pack Options", sub: "Individual · Ward pack · Bulk carton", sid: "section-packing", color: "bg-orange-50 border-orange-100" },
            ].map((b, i) => (
              <motion.div key={b.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`${b.color} border rounded-2xl p-6 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => scrollToId(b.sid)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && scrollToId(b.sid)}>
                <span className="text-2xl" aria-hidden="true">{b.icon}</span>
                <p className="text-sm font-bold text-navy-900">{b.label}</p>
                <p className="text-xs text-gray-400">{b.sub}</p>
              </motion.div>
            ))}
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { icon: "⚙️", label: "OEM Custom Programme", sub: "Construction, size, decoration — all configurable", sid: "section-oem", color: "bg-cyan-50 border-cyan-100" },
              { icon: "🔄", label: "Sourcing Process", sub: "RFQ to delivered shipment", sid: "section-process", color: "bg-gray-50 border-gray-100" },
            ].map((b, i) => (
              <motion.div key={b.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`${b.color} border rounded-2xl p-6 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => scrollToId(b.sid)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && scrollToId(b.sid)}>
                <span className="text-2xl" aria-hidden="true">{b.icon}</span>
                <p className="text-sm font-bold text-navy-900">{b.label}</p>
                <p className="text-xs text-gray-400">{b.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "👘", title: "Request Garment Samples", desc: "Evaluate gown construction, opening style and sizing before purchase order." },
              { icon: "🖨️", title: "Request Print Samples", desc: "Assess juvenile print options and colourways for pediatric ward supply." },
              { icon: "💬", title: "Speak with a Specialist", desc: "Consultation on construction choice, certifications and programme scope." },
            ].map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-3">
                <span className="text-2xl" aria-hidden="true">{r.icon}</span>
                <h3 className="text-base font-bold text-navy-900">{r.title}</h3>
                <p className="text-sm text-gray-500 flex-1">{r.desc}</p>
                <Link href="/rfq/" className="self-start text-sm font-semibold text-gold hover:underline">Request Now →</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S1 — CONSTRUCTIONS (Geometric) */}
      <section id="section-constructions" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fabric Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Three Gown Constructions</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-2xl">Construction affects breathability, launder durability, sterilisation compatibility and patient comfort. Select on the basis of clinical environment and procurement specification.</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {CONSTRUCTIONS.map((c) => (
                <button key={c.id} onClick={() => setActiveConst(c.id)} className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${activeConst === c.id ? "bg-navy-900 text-white border-navy-900" : "bg-white text-navy-900 border-gray-200 hover:border-navy-900"}`}>{c.name}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={ac.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="bg-blue-50 rounded-2xl p-8 border border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4"><h3 className="text-xl font-bold text-navy-900">{ac.name}</h3>{ac.badge && <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">{ac.badge}</span>}</div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">GSM Range</p><p className="font-semibold text-navy-900 text-sm">{ac.gsm}</p></div>
                    <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Primary Application</p><p className="font-semibold text-navy-900 text-sm">{ac.use}</p></div>
                  </div>
                </div>
                <div><p className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: ac.detail }} /></div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S2 — SIZES (Art Deco-inspired) */}
      <section id="section-sizes" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Size Range</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Adult, Bariatric &amp; Pediatric Sizing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {SIZES.map((s, i) => (
                <motion.div key={s.code} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className={`rounded-2xl p-6 border ${s.type === "Pediatric" ? "bg-purple-50 border-purple-100" : s.type === "Adult" ? "bg-blue-50 border-blue-100" : "bg-gold/5 border-gold/20"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xl font-black text-navy-900">{s.code}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.type === "Pediatric" ? "text-purple-700 bg-purple-100" : s.type === "Adult" ? "text-blue-700 bg-blue-100" : "text-gold bg-gold/20"}`}>{s.type}</span>
                  </div>
                  <p className="text-sm text-gray-600">{s.range}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <p className="text-sm text-gray-500">Size ratio breakdowns (e.g. 40% S/M, 40% L/XL, 20% XXL/3XL) are accommodated within a single purchase order. Include your size distribution in the RFQ to receive a complete quote across the full size range without separate purchase orders per size.</p>
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S3 — GSM (Memphis-inspired) */}
      <section id="section-gsm" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Reference</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">GSM Weight Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {GSM_TIERS.map((tier, i) => (
                <motion.div key={tier.gsm} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className={`rounded-2xl p-6 border-2 ${tier.highlight ? "border-navy-900 bg-navy-900 text-white" : "border-gray-100 bg-gray-50"}`}>
                  <p className={`text-3xl font-black mb-2 ${tier.highlight ? "text-gold" : "text-navy-900"}`}>{tier.gsm}</p>
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${tier.highlight ? "text-gold/80" : "text-gray-400"}`}>GSM</p>
                  <p className={`font-bold mb-3 ${tier.highlight ? "text-white" : "text-navy-900"}`}>{tier.name}</p>
                  {tier.highlight && <span className="inline-block text-[10px] font-semibold bg-gold/20 text-gold px-2 py-0.5 rounded-full mb-3">NHS / EU Standard</span>}
                  <p className={`text-sm leading-relaxed ${tier.highlight ? "text-gray-300" : "text-gray-500"}`}>{tier.note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S4 — OPENINGS (Retro/Vintage) */}
      <section id="section-openings" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Gown Configuration</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Opening Style Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {OPENINGS.map((o, i) => (
                <motion.div key={o.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4">
                  <span className="text-3xl shrink-0" aria-hidden="true">{o.icon}</span>
                  <div>
                    <h3 className="font-bold text-navy-900 mb-2">{o.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{o.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S5 — FINISHES (Neumorphic) */}
      <section id="section-finishes" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Performance Finishing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Fabric Finishing Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FINISHES.map((f, i) => (
                <motion.div key={f.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-gray-50 rounded-2xl p-6" style={{ boxShadow: "6px 6px 12px rgba(0,0,0,0.06), -4px -4px 8px rgba(255,255,255,0.9)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-white text-navy-900 text-sm font-black flex items-center justify-center shrink-0" style={{ boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.1)" }}>{f.code}</span>
                    <h3 className="font-bold text-navy-900">{f.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S6 — DECORATION (Organic) */}
      <section id="section-decoration" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Visual Design</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Decoration &amp; Appearance Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {DECORATION.map((d, i) => (
                <motion.div key={d.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6">
                  <h3 className="font-bold text-navy-900 mb-2" dangerouslySetInnerHTML={{ __html: d.name }} />
                  <p className="text-xs text-blue-600 font-semibold mb-2" dangerouslySetInnerHTML={{ __html: d.use }} />
                  <p className="text-xs text-gray-400">{d.market}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S7 — CERTIFICATIONS (dark) */}
      <section id="section-certifications" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Certifications &amp; Standards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div key={cert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="border border-white/10 rounded-2xl p-6 bg-white/5">
                  <p className="text-gold font-bold text-xl mb-1">{cert.name}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop dark />
        </div>
      </section>

      {/* S8 — SECTORS (Material) */}
      <section id="section-sectors" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Target Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Buyer Sectors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SECTORS.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-gray-50 rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-navy-900 mb-2" dangerouslySetInnerHTML={{ __html: s.name }} />
                  <p className="text-sm text-gray-500 mb-3" dangerouslySetInnerHTML={{ __html: s.detail }} />
                  <p className="text-xs font-semibold text-blue-600">{s.market}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S9 — PACKING (Layered Card) */}
      <section id="section-packing" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Packing & Trade</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Packing Options</h2>
            <div className="relative">
              {PACKING.map((p, i) => (
                <motion.div key={p.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex gap-4" style={{ marginLeft: `${i * 16}px`, boxShadow: `0 ${2 + i * 2}px ${8 + i * 4}px rgba(0,0,0,${0.03 + i * 0.01})` }}>
                  <span className="w-8 h-8 rounded-lg bg-navy-900 text-gold text-xs font-bold flex items-center justify-center shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div><p className="font-bold text-navy-900">{p.name}</p><p className="text-sm text-gray-500 mt-0.5">{p.note}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S10 — OEM (Bauhaus) */}
      <section id="section-oem" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Custom Development</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">OEM Programme Scope</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { n: "01", title: "Construction Choice", desc: "Cotton plain weave, TC blend, jersey knit — select the construction that matches your clinical environment and launder specification." },
                { n: "02", title: "GSM & Weight", desc: "Specify the fabric weight from 120 to 180 GSM based on your ward type and climate zone." },
                { n: "03", title: "Opening Configuration", desc: "Open-back overlap, full-open-back, wrap-front jersey — each configuration developed to an exact clinical brief." },
                { n: "04", title: "Size Programme", desc: "Adult S/M through XXL/3XL, pediatric XS/S and S/M, custom dimensions — any combination in a single purchase order." },
                { n: "05", title: "Decoration & Print", desc: "Plain institutional white, solid colour, juvenile prints for children&rsquo;s wards, or hospital logo embroidery — all developed pre-bulk." },
                { n: "06", title: "Certification Package", desc: "ISO 9001, ISO 13485, BSCI, Sedex documentation assembled to match your specific tender or procurement framework requirements." },
              ].map((item, i) => (
                <motion.div key={item.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-gray-50 border-t-4 border-t-navy-900 rounded-xl p-5">
                  <p className="text-3xl font-black text-gray-100 mb-2">{item.n}</p>
                  <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S11 — PROCESS (Scientific) */}
      <section id="section-process" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Six-Step Sourcing Sequence</h2>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 flex items-start gap-3">
              <span className="text-amber-500 text-lg shrink-0" aria-hidden="true">⚠</span>
              <p className="text-sm text-amber-800">All lead times are <strong>indicative only</strong>. Actual timelines depend on construction, print complexity and order volume.</p>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 hidden md:block" aria-hidden="true" />
              <div className="space-y-4">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div key={step.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="md:pl-20 relative">
                    <div className="hidden md:flex absolute left-0 top-4 w-16 h-16 rounded-full bg-white border-2 border-gray-200 items-center justify-center text-navy-900 font-black text-lg shrink-0">{step.num}</div>
                    <div className="bg-white rounded-2xl p-5 border border-gray-100">
                      <p className="font-bold text-navy-900 mb-1">{step.title}</p>
                      <p className="text-sm text-gray-500">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          <BackToTop />
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

      {/* FINAL CTA */}
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-snug">Source Hospital Patient Gowns from Pakistan&rsquo;s Certified Facilities</h2>
            <p className="text-gray-300 text-base mb-10 max-w-xl mx-auto leading-relaxed">Share your construction choice, opening style, size range and programme volume. We match you with certified Pakistan healthcare textile facilities and return competitive pricing with full compliance documentation within 3&ndash;5 business days.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote <span aria-hidden="true">&#8594;</span></Link>
              <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
