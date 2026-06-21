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
  { id: "tc-twill", name: "Twill TC 65/35 Poly-Cotton", badge: "Most Ordered", gsm: "150–190 GSM", use: "Hospital wards, surgical teams, nursing staff", detail: "The dominant specification for institutional scrubs globally. Twill weave delivers greater durability than plain weave through a diagonal interlace structure — critical for garments worn through long shifts and repeated industrial laundering. The 65% polyester component maintains shape and colour through hundreds of wash cycles; the 35% cotton provides the breathability essential for staff comfort in clinical environments. Reactive dyed in the full PMS colour range." },
  { id: "cotton-twill", name: "100% Cotton Twill", badge: "", gsm: "160–200 GSM", use: "Natural fibre preference markets, summer programmes", detail: "Pure cotton twill for buyers whose procurement specifications mandate natural fibre content. Greater breathability and softer hand than TC blends — preferred in warmer climates and for staff with skin sensitivity to synthetic fibres. Requires more care in industrial laundering to maintain dimensional stability; anti-shrink compacted finish is standard on all cotton twill orders." },
  { id: "stretch", name: "4-Way Stretch Poly/Spandex", badge: "Performance", gsm: "180–220 GSM", use: "Surgical suites, procedural rooms, high-mobility roles", detail: "Poly-spandex blend with 4-way mechanical stretch for scrubs requiring unrestricted movement in surgical and procedural roles. The elastane content provides recovery — garments return to original dimensions after flexion. Inherent moisture management from the synthetic fibre composition. Available in a more limited colour range compared to TC options." },
];

const FIT_OPTIONS = [
  { code: "REG", name: "Regular Fit", ease: "Standard comfort ease — fit for mixed hospital populations", market: "Most institutional programmes" },
  { code: "SLM", name: "Slim / Modern Fit", ease: "Reduced ease for contemporary tailored appearance", market: "Private hospitals, specialist clinics" },
  { code: "RLX", name: "Relaxed Fit", ease: "Generous ease for unrestricted movement", market: "Surgical suites, physical therapy" },
];

const SIZES = [
  { code: "XS–3XL", type: "Standard", note: "Full size range inclusive" },
  { code: "Pet XS–2XL", type: "Petite", note: "Shortened inseam and torso" },
  { code: "Tall XS–2XL", type: "Tall", note: "Extended inseam and torso" },
  { code: "Custom", type: "Bespoke", note: "To your specified measurements" },
];

const GSM_DATA = [
  { gsm: "150–165", name: "Lightweight Clinical", season: "Warm climates / summer", pct: 40, color: "bg-sky-300", desc: "Fast-drying for high-temperature clinical environments. Standard in Middle East and Southeast Asia hospital programmes." },
  { gsm: "165–185", name: "Standard Institutional", season: "Year-round — global standard", pct: 78, color: "bg-teal-500", desc: "The institutional benchmark. Durable through industrial laundering, holds colour and shape across 200+ wash cycles." },
  { gsm: "185–220", name: "Performance / Stretch", season: "Surgical & procedural", pct: 52, color: "bg-indigo-500", desc: "Heavier weight stretch constructions for surgical suites and high-mobility procedural roles." },
];

const FINISHES = [
  { name: "Anti-Bacterial", icon: "🦠", desc: "Surface bacterial inhibition — relevant for infection-controlled wards and isolation environments. OEKO-TEX certified chemistry." },
  { name: "Fluid Repellent", icon: "💧", desc: "DWR hydrophobic finish resisting liquid splash on fabric surface. Essential for clinical environments with fluid exposure risk." },
  { name: "Anti-Static", icon: "⚡", desc: "Prevents static accumulation on synthetic fibre surfaces in operating theatre environments." },
  { name: "Moisture Wicking", icon: "🌬️", desc: "Draws moisture away from skin surface. Inherent in stretch poly-spandex; applied finish available for TC variants." },
  { name: "Sterilisable", icon: "🔬", desc: "Finishing chemistry confirmed compatible with autoclave sterilisation cycles at 121°C and 134°C." },
  { name: "Anti-Shrink", icon: "📐", desc: "Compacted pre-shrinking ensures delivered dimensions are post-launder stable. Standard on all cotton twill programmes." },
];

const COLOUR_PROGRAMME = [
  { name: "Ceil Blue", use: "Standard nursing — USA hospitals", swatch: "bg-sky-300" },
  { name: "Hunter Green", use: "Surgical suites", swatch: "bg-green-700" },
  { name: "Navy", use: "Administration, senior nursing", swatch: "bg-blue-900" },
  { name: "Burgundy", use: "Department colour coding", swatch: "bg-rose-800" },
  { name: "Charcoal", use: "Contemporary private hospitals", swatch: "bg-gray-600" },
  { name: "White", use: "Laboratory, pharmacy", swatch: "bg-white border-2 border-gray-200" },
  { name: "Black", use: "Clinical aesthetic programmes", swatch: "bg-gray-900" },
  { name: "Custom PMS", use: "Brand-specific programmes", swatch: "bg-gold" },
];

const CERTIFICATIONS = [
  { name: "ISO 13485", full: "Medical Devices QMS", tier: "Premium", desc: "Increasingly required for NHS and EU hospital procurement specifications." },
  { name: "ISO 9001", full: "Quality Management", tier: "Standard", desc: "Universal procurement baseline across all markets." },
  { name: "BSCI", full: "Business Social Compliance", tier: "Standard", desc: "Ethical production audit — NHS supply chain standard." },
  { name: "Sedex", full: "Ethical Data Exchange", tier: "Standard", desc: "Supply chain transparency platform compliance." },
  { name: "SA8000", full: "Social Accountability", tier: "Premium", desc: "Maximum social compliance — independently audited." },
  { name: "OEKO-TEX", full: "Standard 100", tier: "Standard", desc: "No restricted substances — for skin-contact clinical garments." },
];

const SECTORS = [
  { name: "Hospitals & Health Systems", detail: "Institutional bulk procurement — NHS, GPO, IDN and direct hospital supply", market: "USA · UK · Canada · Australia · EU" },
  { name: "Clinics & Outpatient Centres", detail: "Smaller volume programmes — dental, physiotherapy, specialist practice", market: "Worldwide" },
  { name: "Nursing & Aged-Care Homes", detail: "Colour-coded staff uniform programmes for residential care", market: "USA · UK · Australia · EU" },
  { name: "Medical Wholesale Distributors", detail: "Bulk export for regional distributor networks", market: "USA · EU · Middle East · SE Asia" },
  { name: "Veterinary Clinics", detail: "Scrubs for veterinary surgical and clinical teams — often specifying reinforced construction", market: "USA · UK · Australia" },
  { name: "Dental Practices", detail: "Branded practice colour and embroidered logo programmes for dental teams", market: "USA · UK · EU · Middle East" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Specify construction (TC / cotton / stretch), GSM, fit, colour programme, size breakdown, decoration and certification requirements." },
  { num: "02", title: "Factory Matching", desc: "We shortlist 2–3 Pakistan healthcare textile facilities with the required certifications and construction expertise." },
  { num: "03", title: "Colour Lab Dip", desc: "PMS-matched lab dips produced for colour approval. Institutional standard colours at shorter lead time." },
  { num: "04", title: "Sample Production", desc: "Garment samples in approved fabric and colour, 14–20 days from fabric and colour approval." },
  { num: "05", title: "Bulk Production", desc: "From purchase order and sample approval. Duration varies with quantity and decoration complexity." },
  { num: "06", title: "QC & Export", desc: "Pre-shipment inspection, packing by size and colour, compliance documentation, vessel loading." },
];

const FAQS = [
  { q: "What is the most commonly ordered scrub construction for hospital programmes?", a: "Twill weave TC 65/35 poly-cotton at 165–180 GSM is the dominant specification across institutional scrub programmes globally. The twill structure provides greater durability than plain weave through the diagonal interlace — important for garments surviving daily industrial laundering. The TC blend ensures colour retention and shape stability across 200+ wash cycles, which is the practical requirement for institutional scrub programmes where garments are worn daily." },
  { q: "Can I get scrubs in our hospital brand colour?", a: "Yes. Scrubs are reactive dyed to full PMS specification. For a new brand colour, we produce 3–5 lab dip shade options bracketing your target PMS for approval before bulk production. Institutional standard colours — ceil blue, hunter green, navy, charcoal, burgundy, black and white — are maintained in production inventory and available at shorter lead times. For multi-department programmes requiring different colours by department, we manage each department colour under a unified purchase order." },
  { q: "Are embroidered logos or staff names available on scrubs?", a: "Yes. Embroidery is the standard decoration for medical scrubs — left chest or right chest placement with thread colour to your specification. Hospital logos, department names, individual staff names and job titles are all embroiderable. Embroidery withstands industrial laundering and autoclave sterilisation cycles without degradation. For large NHS or hospital group programmes with individual staff name embroidery, we manage the decoration database as part of the programme." },
  { q: "What certifications do NHS and EU hospital procurement require?", a: "NHS supply chain typically requires BSCI ethical production audit and ISO 9001 quality management as minimum standards, with ISO 13485 increasingly specified in framework agreements. Sedex compliance is standard for most NHS procurement. For EU hospital groups, OEKO-TEX Standard 100 is frequently specified for skin-contact garments. SA8000 is the highest social compliance standard — available for buyers with stringent ethical procurement requirements." },
  { q: "What sizes and fits are available?", a: "We supply scrubs in XS through 3XL in standard fit. Petite sizing (shortened inseam and torso, XS–2XL) and Tall sizing (extended proportions, XS–2XL) are available for programmes serving diverse staff. Fit options include Regular, Slim/Modern and Relaxed. For institutional programmes, include your size ratio breakdown in the RFQ — mixed-size orders are produced within a single purchase order." },
  { q: "Do you supply scrubs for dental and veterinary practices?", a: "Yes. Dental and veterinary practices are established buyers of Pakistan-sourced scrubs. Practice-specific programmes typically specify branded colour, embroidered practice logo on left chest and lightweight construction (150–175 GSM) for comfort in room-temperature clinical environments. Veterinary scrubs may specify reinforced construction or extended torso/sleeve length for procedure-specific requirements — include these in your RFQ." },
  { q: "What is the difference between regular and 4-way stretch scrubs?", a: "Regular TC twill scrubs are woven fabric with fixed dimensions — they fit well with standard comfort ease but do not stretch with movement. 4-way stretch poly-spandex scrubs include elastane content that allows the fabric to extend in all directions and recover, providing unrestricted movement for surgical and procedural roles where bending, reaching and kneeling require greater range of motion. Stretch scrubs have a narrower colour range and typically cost more per unit due to spandex content." },
  { q: "What is the indicative lead time for a hospital scrubs programme?", a: "Lead times are indicative and depend on construction, colour programme, decoration and order volume. As a general guide: lab dip colour approval takes 7–10 days; sample production 14–20 days from fabric and colour approval; embroidery setup adds 3–5 days; bulk production takes 35–55 days from purchase order. Sea freight adds 20–35 days to destination. NHS and institutional tenders with fixed delivery windows should allow a minimum of 90 days from RFQ to delivery." },
];

export default function MedicalScrubsContent() {
  const [activeConst, setActiveConst] = useState("tc-twill");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConst) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-medical-scrubs.webp" fill alt="Pakistan medical scrubs manufacturer — custom hospital scrubs for healthcare buyers in USA, UK and worldwide" className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/hospitallinen/" className="hover:text-gold transition-colors">Hospital Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Medical Scrubs</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Healthcare Textile Export</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Medical Scrubs<br /><span className="text-gold">Manufacturer</span><br />Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading sources medical scrubs from Pakistan&rsquo;s certified healthcare textile facilities. Twill TC 65/35, 100% cotton twill and 4-way stretch poly-spandex. Anti-bacterial, moisture-wicking, fluid-repellent. ISO 13485, BSCI, Sedex certified. Custom colour and embroidery programmes. Export to hospitals, clinics and distributors worldwide.
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
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Medical Scrubs Supply — Pakistan</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Clinical Staff Uniform Programmes at Scale</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">Pakistan&rsquo;s certified healthcare textile facilities supply NHS trusts, US hospital systems, Middle East hospitals and global medical distributors with institutional scrub programmes. Custom colour, custom logo, full certification compliance.</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[{ val: "50+", label: "Vetted Factories" }, { val: "35+", label: "Export Markets" }, { val: "10+", label: "Certifications" }, { val: "3", label: "Constructions" }].map((s) => (
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
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3"><span className="text-2xl" aria-hidden="true">🧵</span><div><p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Bauhaus</p><h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3></div></div>
              <div className="flex flex-col gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-teal-100 flex items-start gap-3">
                    <div className="flex-1"><p className="text-sm font-semibold text-navy-900">{c.name}</p><p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p></div>
                    {c.badge && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full shrink-0 mt-0.5">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-sky-50 border border-sky-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3"><span className="text-2xl" aria-hidden="true">🎨</span><div><p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour Programme</p><h3 className="text-xl font-bold text-navy-900 mt-0.5">Standard Colour Range</h3></div></div>
              <div className="grid grid-cols-4 gap-2 flex-1">
                {COLOUR_PROGRAMME.slice(0, 8).map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-1.5">
                    <div className={`w-10 h-10 rounded-xl ${c.swatch} shadow-sm`} />
                    <p className="text-[10px] text-gray-500 text-center leading-tight">{c.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colour" label="View Colour Programme" />
            </motion.div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Garment Fit</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Fit Options</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {FIT_OPTIONS.map(f => (
                  <div key={f.code} className="flex items-start gap-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 shrink-0 mt-0.5">{f.code}</span>
                    <span className="text-xs text-gray-600 leading-tight">{f.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-fits" label="Fit Guide" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.07 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">GSM Ranges</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {GSM_DATA.map(g => (
                  <div key={g.gsm} className="flex items-start gap-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 shrink-0 mt-0.5">{g.gsm}</span>
                    <span className="text-xs text-gray-600 leading-tight">{g.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="GSM Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.14 }}
              className="bg-red-50 border border-red-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-red-600 text-xs font-semibold tracking-[0.2em] uppercase">Performance</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Finishes</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {FINISHES.slice(0, 4).map(f => (
                  <div key={f.name} className="flex items-start gap-2">
                    <span className="text-base leading-none mt-0.5" aria-hidden="true">{f.icon}</span>
                    <span className="text-xs text-gray-600 leading-tight">{f.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-finishes" label="All Finishes" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.21 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Branding</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Decoration</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {[
                  { method: "Embroidery (left chest)", note: "Hospital logo, dept name, staff name" },
                  { method: "Heat Transfer Print", note: "Name badges, department IDs" },
                  { method: "Screen Print", note: "Large-format back prints" },
                  { method: "Plain (no decoration)", note: "Colour only — institutional default" },
                ].map(d => (
                  <div key={d.method} className="flex items-start gap-2">
                    <span className="text-indigo-400 text-xs mt-0.5">✓</span>
                    <span className="text-xs text-gray-600 leading-tight">{d.method}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Decoration Options" />
            </motion.div>
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Compliance</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Certifications</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-lg px-2 py-1 border border-green-100">
                    <p className="text-[10px] font-bold text-navy-900">{c.name}</p>
                    <p className="text-[9px] text-gray-400">{c.full}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certifications" label="Cert Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Buyer Sectors</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.name} className="flex items-start gap-2">
                    <span className="text-orange-400 text-xs mt-0.5 shrink-0">▶</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900 leading-tight">{s.name}</p>
                      <p className="text-[10px] text-gray-400">{s.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sectors" label="Sector Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.16 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Logistics</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Pack & Export</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { label: "Individual Polybag", note: "Per garment — standard" },
                  { label: "6-Piece Bundle", note: "Institutional supply pack" },
                  { label: "12-Pack Carton", note: "Hospital stock unit" },
                  { label: "Bulk Carton", note: "Mixed size distribution" },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">✓</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900 leading-tight">{p.label}</p>
                      <p className="text-[10px] text-gray-400">{p.note}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-1.5 flex-wrap mt-1">
                  {["FOB", "CIF", "CFR", "EXW"].map((t) => (
                    <span key={t} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              </div>
              <ExploreBtn sectionId="section-export" label="Export Terms" />
            </motion.div>
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🎨</span>
                <div>
                  <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">OEM Programme</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Colour & Custom Programme</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 flex-1 content-start">
                {COLOUR_PROGRAMME.map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 border border-rose-100">
                    <span className={`w-3 h-3 rounded-full ${c.swatch} shrink-0`} aria-hidden="true" />
                    <span className="text-[11px] font-semibold text-navy-900">{c.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="OEM Detail" />
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
                    <span className="w-6 h-6 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
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
            <Link href="/knowledge/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Medical Scrubs Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction comparison, colour programme, fit options and certification requirements for institutional buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Healthcare Textile Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times, NHS certification requirements and factory audit overview.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Spec Sheets &amp; Colour Cards</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction spec sheets, colour programme swatches and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Medical Scrubs?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, colour programme, fit and embroidery. RFQ to factory quotation: 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS (Bauhaus) */}
      <section id="section-constructions" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fabric Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Three Constructions for Clinical Environments</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-2xl">Construction determines durability, breathability, movement range and lifecycle cost per wash. Select based on role, environment and procurement specification.</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {CONSTRUCTIONS.map((c) => (
                <button key={c.id} onClick={() => setActiveConst(c.id)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${activeConst === c.id ? "bg-teal-600 text-white border-teal-600" : "bg-white text-navy-900 border-gray-200 hover:border-teal-400"}`}>{c.name}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={ac.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="bg-teal-50 border border-teal-100 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4"><h3 className="text-xl font-bold text-navy-900">{ac.name}</h3>{ac.badge && <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">{ac.badge}</span>}</div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Weight</p><p className="font-semibold text-navy-900 text-sm">{ac.gsm}</p></div>
                    <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Primary Use</p><p className="font-semibold text-navy-900 text-sm">{ac.use}</p></div>
                  </div>
                </div>
                <div><p className="text-sm text-gray-600 leading-relaxed">{ac.detail}</p></div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 2 — FIT (Scientific) */}
      <section id="section-fits" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fit Options</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Fit Profiles &amp; Size Range</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {FIT_OPTIONS.map((f, i) => (
                <motion.div key={f.code} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 text-xs font-bold flex items-center justify-center shrink-0">{f.code}</span>
                    <p className="font-bold text-navy-900">{f.name}</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{f.ease}</p>
                  <p className="text-xs text-teal-600 font-medium">{f.market}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-navy-900 mb-4">Available Size Ranges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {SIZES.map((s) => (
                  <div key={s.code} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="font-bold text-navy-900 text-sm">{s.code}</p>
                    <p className="text-xs text-teal-600 font-medium">{s.type}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 3 — GSM (Industrial) */}
      <section id="section-gsm" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Reference</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">GSM Weight Guide</h2>
            <div className="space-y-5">
              {GSM_DATA.map((tier, i) => (
                <motion.div key={tier.gsm} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className={`border-l-4 rounded-r-2xl p-6 bg-gray-50 ${tier.pct > 65 ? "border-l-teal-500" : "border-l-gray-300"}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-navy-900 shrink-0">{tier.gsm} GSM</span>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900">{tier.name}</p>
                      <p className="text-xs text-gray-400">{tier.season}</p>
                    </div>
                    {tier.pct > 65 && <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full shrink-0">Institutional Standard</span>}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className={`${tier.color} h-2 rounded-full`} style={{ width: `${tier.pct}%` }} />
                  </div>
                  <p className="text-sm text-gray-500">{tier.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 4 — COLOUR (Art Deco) */}
      <section id="section-colour" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Programme</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Clinical Colour Range</h2>
            <p className="text-gray-500 text-sm mb-10 max-w-2xl">Reactive dyed to full PMS specification. Standard clinical colours maintained in inventory for shorter lead times. Multi-department programmes manage each colour under a unified purchase order.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
              {COLOUR_PROGRAMME.map((c, i) => (
                <motion.div key={c.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }} className="flex flex-col items-center gap-2">
                  <div className={`w-14 h-14 rounded-2xl ${c.swatch} shadow-md`} />
                  <p className="text-xs font-semibold text-navy-900 text-center leading-tight">{c.name}</p>
                  <p className="text-[10px] text-gray-400 text-center leading-tight">{c.use}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-navy-900 mb-2">Multi-Department Colour Coding</h3>
              <p className="text-sm text-gray-500">Hospitals managing colour-coded departments — for example, blue for nursing, green for surgical, grey for administration — can place a single purchase order specifying each department colour and quantity ratio. Lab dip approval for new colours adds 7–10 days. Standard clinical colours (ceil blue, hunter green, navy, charcoal, burgundy) are available at standard lead times without additional sampling.</p>
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 5 — FINISHES (Minimalist) */}
      <section id="section-finishes" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Performance Finishing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Finishing Treatments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FINISHES.map((f, i) => (
                <motion.div key={f.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                  <span className="text-2xl mb-3 block" aria-hidden="true">{f.icon}</span>
                  <h3 className="font-bold text-navy-900 mb-2">{f.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 6 — DECORATION (Organic) */}
      <section id="section-decoration" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Identification</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Decoration &amp; Identification Options</h2>
            <p className="text-gray-500 text-sm mb-10 max-w-xl">Embroidery is the preferred identification method for institutional scrubs — it survives industrial laundering and sterilisation cycles without degradation.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Hospital Logo Embroidery", placement: "Left chest (most common) or right chest", note: "Thread colour matched to your brand specification. Autoclave-safe. Typically 3–8 cm logo placement.", icon: "🏥" },
                { title: "Department Name Embroidery", placement: "Left chest or sleeve band", note: "Text embroidery identifying department, ward or unit. Standardised across full programme order.", icon: "🏷️" },
                { title: "Individual Staff Name", placement: "Right chest or above logo", note: "Individual name text. Managed via decoration database for large programmes. Lead time applies.", icon: "👤" },
                { title: "No Decoration", placement: "Plain garment", note: "Standard for programmes where colour alone provides identification, or where decoration adds weight.", icon: "⚪" },
              ].map((d, i) => (
                <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 flex gap-4">
                  <span className="text-2xl shrink-0" aria-hidden="true">{d.icon}</span>
                  <div>
                    <h3 className="font-bold text-navy-900 mb-1">{d.title}</h3>
                    <p className="text-xs text-teal-600 font-medium mb-2">{d.placement}</p>
                    <p className="text-sm text-gray-500">{d.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 7 — CERTIFICATIONS (Luxury) */}
      <section id="section-certifications" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Certifications &amp; Standards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div key={cert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="border border-gold/20 rounded-2xl p-6 bg-white/5">
                  <div className="flex items-start justify-between mb-3">
                    <div><p className="text-gold font-bold text-xl">{cert.name}</p><p className="text-xs text-gray-400">{cert.full}</p></div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 ${cert.tier === "Premium" ? "text-gold bg-gold/20" : "text-green-400 bg-green-400/10"}`}>{cert.tier}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 8 — SECTORS (Material Design) */}
      <section id="section-sectors" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Target Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Buyer Sectors &amp; Markets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SECTORS.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-gray-50 rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-navy-900 mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{s.detail}</p>
                  <p className="text-xs font-semibold text-teal-600">{s.market}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 9 — EXPORT & PACKING (Layered Card) */}
      <section id="section-export" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Trade & Packing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Export Terms &amp; Packing Options</h2>
            <div className="relative space-y-4 mb-10">
              {[
                { label: "FOB Karachi / Port Qasim", desc: "Goods at port of loading — buyer arranges ocean freight and insurance. Most common for buyers with established logistics." },
                { label: "CIF Destination Port", desc: "We arrange ocean freight and marine insurance to your nominated port." },
                { label: "CFR Destination Port", desc: "We arrange ocean freight. Buyer arranges own insurance cover." },
                { label: "EXW Factory Gate", desc: "Buyer manages all logistics from factory gate — lowest quoted price." },
              ].map((t, i) => (
                <motion.div key={t.label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4" style={{ marginLeft: `${i * 12}px` }}>
                  <span className="w-8 h-8 rounded-lg bg-navy-900 text-gold text-xs font-bold flex items-center justify-center shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div><p className="font-bold text-navy-900 mb-1">{t.label}</p><p className="text-sm text-gray-500">{t.desc}</p></div>
                </motion.div>
              ))}
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-navy-900 mb-4">Packing Options</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Individual Polybag", note: "Per garment — standard institutional" },
                  { label: "Sets (Top + Bottom)", note: "Matched scrub sets in sealed polybag" },
                  { label: "Bulk Carton by Size", note: "Institution or distributor supply — size-labelled cartons" },
                ].map((p) => (
                  <div key={p.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="font-semibold text-navy-900 text-sm">{p.label}</p>
                    <p className="text-xs text-gray-400 mt-1">{p.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 10 — OEM (Typography-First) */}
      <section id="section-oem" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Custom Development</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">OEM Programme Scope</h2>
            <p className="text-gray-500 text-sm mb-10 max-w-2xl">Every element of a scrubs programme is configurable. Construction, colour, fit, size range, decoration and packing — all developed to brief.</p>
            <div className="space-y-3">
              {[
                { title: "Construction & GSM Specification", desc: "TC ratio, fibre count, GSM and fabric construction — specified to your exact procurement standard or clinical requirement." },
                { title: "Branded Colour Programme", desc: "Full PMS colour range. Lab dip approval before bulk. Multi-department colour coding managed in a single purchase order." },
                { title: "Embroidered Identification", desc: "Hospital logo, department name, staff names — decoration database managed for large programmes with individual name embroidery." },
                { title: "Fit & Size Customisation", desc: "Regular, Slim, Relaxed and custom fit configurations. Standard, Petite and Tall size ranges in any combination." },
                { title: "Certification Package Assembly", desc: "ISO 13485, BSCI, Sedex, OEKO-TEX — documentation assembled to match your tender requirements before PO placement." },
                { title: "Custom Packing Format", desc: "Individual polybag, set packing, bulk carton by size and colour — configured to your distribution and institutional requirements." },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-5 p-5 border-b border-gray-100 last:border-b-0">
                  <span className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div><p className="font-bold text-navy-900 mb-1">{item.title}</p><p className="text-sm text-gray-500">{item.desc}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 11 — PROCESS (Skeuomorphic) */}
      <section id="section-process" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">From RFQ to Delivery</h2>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 flex items-start gap-3">
              <span className="text-amber-500 text-lg shrink-0" aria-hidden="true">⚠</span>
              <p className="text-sm text-amber-800">All lead times are <strong>indicative only</strong>. Actual timelines depend on construction, colour programme, decoration complexity and order volume.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.06)" }}>
                  <p className="text-4xl font-black text-gray-100 mb-3">{step.num}</p>
                  <h3 className="font-bold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
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

      {/* ═══ SAME-TIER PAGES ═══ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Hospital Linen</p>
            <h2 className="text-2xl font-bold text-navy-900">More Hospital Linen Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Doctor Surgical Gowns", desc: "Level 2 and Level 4 surgical gowns. Sterile and non-sterile programme options.", href: "/hometextile/hospitallinen/doctorsurgicalgowns/", img: "/images/hero/hero-doctor-surgical-gowns.webp", alt: "Pakistan surgical gowns manufacturer — OEM Level 2 and Level 4 disposable and reusable surgical gowns" },
              { name: "Patient Gowns", desc: "Cotton and poly-cotton patient gowns. Open-back and snap fastening options.", href: "/hometextile/hospitallinen/patientgowns/", img: "/images/hero/hero-patient-gowns.webp", alt: "Pakistan patient gowns manufacturer — OEM cotton and poly-cotton hospital gowns for healthcare buyers" },
              { name: "Surgical Huck Towels", desc: "Cotton huck towels for surgical and clinical use. Bulk medical supply programmes.", href: "/hometextile/hospitallinen/surgicalhucktowels/", img: "/images/hero/hero-surgical-huck-towels.webp", alt: "Pakistan surgical huck towels manufacturer — OEM cotton huck towels for hospital and clinic buyers worldwide" },
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
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-snug">Source Medical Scrubs from Pakistan&rsquo;s Certified Facilities</h2>
            <p className="text-gray-300 text-base mb-10 max-w-xl mx-auto leading-relaxed">Share your construction, colour programme, fit preference, size distribution and certification requirements. We identify the right certified Pakistan facility and return pricing with full compliance documentation within 3&ndash;5 business days.</p>
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
