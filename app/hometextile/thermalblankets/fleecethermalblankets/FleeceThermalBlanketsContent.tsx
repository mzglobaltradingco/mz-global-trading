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
          dark ? "border border-gold/60 text-gold hover:bg-gold hover:text-navy-900" : "border-2 border-gold text-navy-900 hover:bg-gold shadow-sm"
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
    <button onClick={() => scrollToId(sectionId)} className="group self-start inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold transition-colors mt-auto pt-4">
      {label}
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">→</span>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  { id: "polar", name: "Anti-Pill Polar Fleece", badge: "Volume Standard", gsm: "150–300 GSM", desc: "100% polyester knitted fleece with anti-pill finish. Soft, warm, pill-resistant. The retail baseline construction.", colour: "bg-orange-50 border-orange-100", accent: "text-orange-600", markets: ["USA", "UK", "EU", "Canada"] },
  { id: "sherpa", name: "Sherpa / Double-Sided", badge: "Premium", gsm: "300–500 GSM", desc: "Smooth face one side, shearling-textured reverse. Substantial hand feel and warmth. Hotel amenities and premium retail.", colour: "bg-amber-50 border-amber-100", accent: "text-amber-600", markets: ["USA", "UK", "EU", "Australia"] },
  { id: "mink", name: "Mink Touch / Velvet Print", badge: "Promotional", gsm: "200–280 GSM", desc: "Ultra-soft velvet surface accepts sublimation print at photo quality. Promotional merchandise and custom gifting.", colour: "bg-purple-50 border-purple-100", accent: "text-purple-600", markets: ["USA", "Middle East", "EU"] },
  { id: "jacquard", name: "Woven Jacquard Fleece", badge: "Premium Retail", gsm: "250–350 GSM", desc: "Custom woven pattern in the fabric structure — elevated hand, zero print. Premium retail and hospitality programmes.", colour: "bg-teal-50 border-teal-100", accent: "text-teal-600", markets: ["UK", "EU", "Australia", "Japan"] },
];

const GSM_TIERS = [
  { gsm: "150–180", name: "Lightweight / Baby", pct: 25, colour: "bg-sky-300", market: "Infant blankets · Baby retail · Travel throw", season: "Year-round" },
  { gsm: "180–230", name: "Standard Throw / Retail", pct: 70, colour: "bg-amber-400", market: "Supermarkets · Department stores · Online retail", season: "Year-round", featured: true },
  { gsm: "230–280", name: "Premium A/W", pct: 50, colour: "bg-orange-500", market: "Seasonal retail · Gifting · Outdoor brands", season: "Autumn / Winter" },
  { gsm: "280–300+", name: "Heavy / Luxury", pct: 35, colour: "bg-rose-600", market: "Bedding weight · Hotel amenities · Corporate gifts", season: "A/W / Gifting" },
];

const SIZES = [
  { code: "BCT", name: "Baby / Cot", dims: "75 × 100 cm", use: "Infant care, nursery, baby retail products" },
  { code: "THR", name: "Throw / Lap", dims: "125 × 150 cm", use: "Sofa throw, homewares, promotional merchandise" },
  { code: "SGL", name: "Single", dims: "150 × 200 cm", use: "Single bed, student accommodation, retail" },
  { code: "DBL", name: "Double", dims: "200 × 200 cm", use: "Double bed, couples, mainstream retail" },
  { code: "KNG", name: "King", dims: "240 × 220 cm", use: "King bed, premium retail, hotel amenities" },
  { code: "CST", name: "Custom", dims: "To specification", use: "Airline, promotional, branded merchandise sizes" },
];

const DECORATIONS = [
  { method: "Sublimation / All-Over Print", substrates: "Polyester fleece, mink touch", note: "Photographic quality, full-bleed, wash-fast. Promotional merchandise and custom photo blankets.", icon: "🖨️" },
  { method: "Embroidery", substrates: "All constructions", note: "Logo placement at corner, chest or centre. Corporate gifting and hotel amenity programmes.", icon: "🪡" },
  { method: "Jacquard Woven Pattern", substrates: "Woven jacquard only", note: "Pattern woven into the structure — not printed. Premium retail, no print degradation risk.", icon: "🧶" },
  { method: "Plain / Solid Colour", substrates: "All constructions", note: "Piece dyed — full colour range. Most common for retail and institutional programmes.", icon: "🎨" },
];

const FINISHING = [
  { title: "Anti-Pill Treatment", desc: "Standard on all polar fleece — resists surface pilling through repeated wash cycles. Extends usable product life.", tag: "Standard" },
  { title: "Anti-Static", desc: "Reduces static charge build-up — relevant for dry climates and winter retail environments.", tag: "Optional" },
  { title: "Flame Retardant (FR)", desc: "Available for airline, emergency services and institutional programmes. Specify regulatory standard (BS 5867, NFPA 701) at RFQ stage.", tag: "Institutional" },
  { title: "Hypoallergenic", desc: "Low-allergen polyester fibre specification — suitable for baby products and allergy-sensitive retail.", tag: "Optional" },
  { title: "Ultra-Soft Brushed", desc: "Additional brushing pass produces a plusher, softer surface — premium retail positioning.", tag: "Premium" },
];

const CERTIFICATIONS = [
  { name: "OEKO-TEX", full: "Standard 100", desc: "No harmful substances — EU/UK import requirement", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled polyester content trace — ESG and sustainability claims", tier: "Recycled", img: "/images/certs/cert-grs.webp" },
  { name: "BSCI", full: "Business Social Compliance", desc: "Ethical production audit — labour and worker welfare", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "ISO 9001", full: "Quality Management", desc: "Consistent production quality and documented process control", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "WRAP", full: "Responsible Accredited Production", desc: "12-principle manufacturing compliance for apparel/textile export", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
];

const SECTORS = [
  { abbr: "RTL", name: "Retail Chains", detail: "Supermarkets, department stores, homewares, online retail", market: "USA · UK · EU" },
  { abbr: "PRO", name: "Promotional Merch", detail: "Corporate promotional merchandise, event giveaways, branded blankets", market: "Global" },
  { abbr: "AIR", name: "Airlines", detail: "In-flight blanket supply — FR treated, compact packing, airline spec", market: "Middle East · EU · Asia" },
  { abbr: "EMG", name: "Emergency Mgmt", detail: "Disaster response, civil protection stockpiles, first responder kits", market: "USA · Australia · EU" },
  { abbr: "HOT", name: "Hotel Amenities", detail: "Guest room throw, lounge blanket, branded hospitality programme", market: "Middle East · EU · USA" },
  { abbr: "BAB", name: "Baby Retail", detail: "Infant and nursery product retailers — lightweight hypoallergenic", market: "USA · UK · Australia" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Price at port of loading. Standard for buyers with established freight arrangements." },
  { term: "CIF", full: "Cost Insurance Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance. Price covers goods to your nominated port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange freight to your port. Buyer arranges own insurance from port of origin." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Lowest quoted price. Buyer manages all inland and ocean logistics from factory." },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Construction, GSM, decoration and certification matching", colour: "bg-gold" },
  { stage: "Artwork / Sample", days: "12–18", desc: "Pre-production sample and print artwork approval", colour: "bg-orange-500" },
  { stage: "Bulk Production", days: "35–55", desc: "From confirmed purchase order and approved sample", colour: "bg-amber-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment check — weight, anti-pill, print registration", colour: "bg-purple-500" },
  { stage: "Sea Freight", days: "8–35", desc: "18–30 days to USA, 8–14 days to UK, 20–35 days to Australia", colour: "bg-teal-500" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Specify construction, GSM, size, decoration method (plain, print, embroidery), certification requirements and destination." },
  { num: "02", title: "Factory Matching", desc: "We shortlist 2–3 certified fleece mills with the relevant construction capability and certification stack. Pricing in 3–5 days." },
  { num: "03", title: "Sample & Artwork", desc: "Pre-production sample produced to specification. Print artwork proofed and approved before bulk run." },
  { num: "04", title: "Sample Approval", desc: "Review construction, GSM, colour, print registration and anti-pill finish before purchase order placement." },
  { num: "05", title: "Bulk Production", desc: "Approved sample locked. Production commences. Anti-pill treatment applied inline. QC monitoring throughout." },
  { num: "06", title: "Pre-Shipment QC", desc: "Weight per m², GSM measurement, anti-pill test, colour fastness and quantity audit before vessel loading." },
];

const SUSTAINABILITY = [
  { icon: "♻️", title: "GRS Recycled Polyester", desc: "Post-consumer recycled PET content available — from PET bottles to blanket fibre. GRS certified trace.", tag: "GRS" },
  { icon: "🌱", title: "Lower Virgin Polymer", desc: "Recycled content programmes directly reduce new polymer production and associated carbon output.", tag: "Carbon" },
  { icon: "⚖️", title: "BSCI Ethical Audit", desc: "Factory social compliance audited — worker welfare, safety and fair wage standards verified.", tag: "BSCI" },
  { icon: "🧪", title: "OEKO-TEX Assured", desc: "No harmful substances across all standard constructions — consumer-safe across all markets.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Minimal Packaging", desc: "Polybag only or vacuum pack for space-efficient bulk shipping — reducing packaging material and container volume.", tag: "Packaging" },
  { icon: "⏳", title: "Anti-Pill Durability", desc: "Anti-pill treatment extends product lifespan — fewer replacement cycles, less aggregate consumption.", tag: "Longevity" },
];

const FAQS = [
  { q: "What is the difference between anti-pill polar fleece and standard fleece?", a: "Anti-pill treatment resists the formation of fibre balls on the surface after washing. Standard fleece pills quickly, degrading product appearance. Anti-pill is standard specification for retail and any programme with multiple wash cycles." },
  { q: "Is GRS-certified recycled polyester fleece available?", a: "Yes. GRS certified recycled polyester is available — traceable from post-consumer PET through fibre, yarn, fabric and finished blanket. Performance is equivalent to virgin polyester at the same GSM." },
  { q: "Can all-over sublimation print be applied to fleece blankets?", a: "All-over sublimation printing is available on polyester fleece and mink touch/velvet constructions. Vibrant, wash-fast, photographic quality. 100% cotton constructions cannot accept sublimation — reactive printing applies to cotton." },
  { q: "What GSM is recommended for retail fleece programmes?", a: "200 GSM anti-pill polar fleece is the volume standard for mainstream retail. 250–280 GSM for premium A/W. 300 GSM for luxury bedding weight. Baby programmes typically specify 150–180 GSM." },
  { q: "Can fleece blankets be produced with Flame Retardant treatment?", a: "Yes. FR treatment is available for airline, emergency management and institutional programmes. Specify the regulatory standard required (BS 5867, NFPA 701) at RFQ stage as it affects factory selection and cost." },
  { q: "What sizes are available for retail fleece programmes?", a: "Baby/Cot 75×100 cm, Throw 125×150 cm, Single 150×200 cm, Double 200×200 cm, King 240×220 cm. Custom sizes for airline, promotional and branded merchandise are available." },
  { q: "Are embroidered logo fleece blankets available for corporate programmes?", a: "Yes. Embroidered logo placement is available on all constructions. We manage digitisation and placement approval. Corporate gifting programmes can combine embroidery with retail box or zippered carry bag presentation." },
  { q: "What is the indicative lead time for fleece blanket programmes?", a: "RFQ response 3–5 days. Sample and artwork 12–18 days. Bulk production 35–55 days from confirmed PO. Sea freight adds 18–30 days to USA, 8–14 days to UK. Plan 90–100 days for seasonal retail programmes. All timelines are indicative only." },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function FleeceThermalBlanketsContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [activeConstruction, setActiveConstruction] = useState("polar");
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">

      {/* ══ HERO ══ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-fleece-thermal-blankets.webp" fill alt="Pakistan fleece thermal blanket manufacturer — anti-pill polar fleece and sherpa blankets for retail and promotional buyers worldwide" className="object-cover" priority sizes="100vw" />
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
              <span className="text-gold">Fleece Thermal Blankets</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Home Textile Export</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Fleece Thermal<br /><span className="text-gold">Blankets</span><br />Manufacturer
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading sources anti-pill polar fleece, sherpa double-sided and jacquard woven thermal blankets from Pakistan&rsquo;s certified mills. Retail, promotional, airline and institutional programmes. 150&ndash;300 GSM. GRS recycled polyester, OEKO-TEX, BSCI certified.
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

      {/* ══ STATS ══ */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Fleece Blanket Supply — Pakistan</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Warm, Soft, Specification-Driven</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s fleece mills supply major retail chains and promotional merchandise buyers globally. Anti-pill polar fleece to 300 GSM sherpa double-sided — the full construction range in one sourcing programme.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "4", label: "Constructions" },
                { val: "10+", label: "Certifications" },
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
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Fleece Blankets — All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1 — 2 large bentos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bento 1 — Constructions (interactive) */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧶</span>
                <div>
                  <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">4 Fleece Types</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {CONSTRUCTIONS.map((c) => (
                  <button key={c.id} onClick={() => setActiveConstruction(c.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${activeConstruction === c.id ? "bg-navy-900 text-white border-navy-900" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}>
                    {c.name.split(" ")[0]}
                  </button>
                ))}
              </div>
              <div className={`bg-white rounded-xl p-4 border flex-1 ${ac.colour}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-navy-900">{ac.name}</p>
                  {ac.badge && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white ${ac.accent}`}>{ac.badge}</span>}
                </div>
                <p className="text-xs text-gray-500 mb-2">{ac.gsm}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{ac.desc}</p>
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore All Constructions" />
            </motion.div>

            {/* Bento 2 — GSM */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">⚖️</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight Guide</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">GSM by Retail Tier</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-xl p-3.5 border border-amber-100">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-bold text-navy-900">{t.gsm} GSM</span>
                      {t.featured && <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full">Retail Standard</span>}
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

          {/* Row 2 — 4 compact bentos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Print &amp; Finish</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {DECORATIONS.map((d) => (
                  <div key={d.method} className="flex items-start gap-2">
                    <span className="text-sm" aria-hidden="true">{d.icon}</span>
                    <span className="text-xs text-gray-600 leading-tight">{d.method.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Decoration Detail" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Finishing</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Treatment Options</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {FINISHING.slice(0, 4).map((f) => (
                  <div key={f.title} className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${f.tag === "Standard" ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-500"}`}>{f.tag}</span>
                    <span className="text-xs text-gray-600 truncate">{f.title.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-finishing" label="All Finishes" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-emerald-600 text-xs font-semibold tracking-[0.2em] uppercase">Certifications</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Standards</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                {["OEKO-TEX", "GRS", "BSCI", "ISO 9001", "WRAP"].map((c) => (
                  <span key={c} className="bg-white text-navy-900 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-100">{c}</span>
                ))}
              </div>
              <ExploreBtn sectionId="section-certifications" label="Cert Detail" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Size Range</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {SIZES.slice(0, 5).map((s) => (
                  <div key={s.code} className="flex items-center gap-2">
                    <span className="w-8 h-5 bg-sky-100 text-sky-700 rounded text-[9px] font-bold flex items-center justify-center shrink-0">{s.code}</span>
                    <span className="text-xs text-gray-500">{s.dims}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="Full Size Guide" />
            </motion.div>
          </div>

          {/* Row 3 — 3 bentos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Who Buys</p>
                <h3 className="text-lg font-bold text-navy-900 mt-0.5">Market Sectors</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {SECTORS.slice(0, 4).map((s) => (
                  <div key={s.abbr} className="flex items-center gap-2">
                    <span className="w-8 h-5 bg-rose-100 text-rose-700 rounded text-[9px] font-bold flex items-center justify-center shrink-0">{s.abbr}</span>
                    <span className="text-xs text-gray-600">{s.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sectors" label="All Sectors" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Sustainability</p>
                <h3 className="text-lg font-bold text-navy-900 mt-0.5">Green Credentials</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {SUSTAINABILITY.slice(0, 4).map((s) => (
                  <div key={s.title} className="flex items-center gap-2">
                    <span aria-hidden="true">{s.icon}</span>
                    <span className="text-xs text-gray-600 leading-tight">{s.title}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="Sustainability" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-yellow-600 text-xs font-semibold tracking-[0.2em] uppercase">Timeline</p>
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

          {/* Row 4 — 2 bentos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🚀</span>
                <div>
                  <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
                  <h3 className="text-xl font-bold text-white mt-0.5">Incoterms Available</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {EXPORT_TERMS.map((t) => (
                  <div key={t.term} className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                    <p className="text-gold font-bold text-sm">{t.term}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{t.full}</p>
                    <p className="text-gray-500 text-[10px] mt-1">{t.port}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="Export Terms" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-orange-100 to-amber-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📋</span>
                <div>
                  <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Sourcing Steps</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-200 text-orange-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{p.num}</span>
                    <p className="text-xs text-gray-700 font-semibold leading-tight">{p.title}</p>
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
              <p className="font-semibold text-navy-900">Fleece Blanket Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction selection, GSM tiers, market positioning and sustainability options for retail and institutional buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Home Textile Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times and certification requirements for fleece blanket export.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Spec Sheets &amp; Construction Swatches</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fleece blanket spec sheets, construction comparison and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Fleece Blankets?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, GSM, size and quantity. RFQ to factory quotation: 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS (Material Design) */}
      <section id="section-constructions" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Four Fleece Constructions</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg leading-relaxed">Different constructions serve different retail positions, price points and buyer profiles.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-gradient-to-br ${c.colour} rounded-2xl p-7 border`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-bold text-navy-900">{c.name}</h3>
                  {c.badge && <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white ${c.accent} shrink-0`}>{c.badge}</span>}
                </div>
                <p className="text-sm font-semibold text-gray-500 mb-3">{c.gsm}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.markets.map((m) => (
                    <span key={m} className="bg-white/70 text-navy-900 text-[10px] font-medium px-2 py-0.5 rounded border border-white/50">{m}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 2 — GSM (Flat Design) */}
      <section id="section-gsm" className="bg-orange-50 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">GSM by Retail Tier</h2>
            <p className="text-gray-500 mt-3 text-sm">From lightweight baby blankets to luxury bedding-weight fleece.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GSM_TIERS.map((t, i) => (
              <motion.div key={t.gsm} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className={`bg-white rounded-2xl p-7 border ${t.featured ? "border-gold shadow-md" : "border-gray-100"}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-2xl font-bold text-navy-900">{t.gsm} GSM</span>
                    {t.featured && <span className="ml-3 text-[10px] font-bold text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">Standard</span>}
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 shrink-0">{t.season}</span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-3">{t.name}</p>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${t.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className={`h-full ${t.colour} rounded-full`} />
                </div>
                <p className="text-xs text-gray-500">{t.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 3 — SIZES (Neumorphic) */}
      <section id="section-sizes" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sizing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Size Programme</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SIZES.map((s, i) => (
              <motion.div key={s.code} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-gray-200" style={{ boxShadow: "6px 6px 12px #e0e0e0, -6px -6px 12px #ffffff" }}>
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center mb-3">{s.code}</div>
                <p className="text-sm font-bold text-navy-900">{s.name}</p>
                <p className="text-xs font-mono text-sky-600 mt-1">{s.dims}</p>
                <p className="text-xs text-gray-400 mt-2 leading-tight">{s.use}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-5 text-center">±2 cm manufacturing tolerance. Custom dimensions available — specify in RFQ.</p>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 4 — DECORATION (Glassmorphism) */}
      <section id="section-decoration" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Decoration Methods</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Print, Embroidery &amp; Pattern</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DECORATIONS.map((d, i) => (
              <motion.div key={d.method} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-2xl p-7 border border-white/10" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-2xl" aria-hidden="true">{d.icon}</span>
                  <h3 className="text-base font-bold text-white">{d.method}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3"><span className="text-gold font-semibold">Substrates: </span>{d.substrates}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 5 — FINISHING (Neo-Brutalist) */}
      <section id="section-finishing" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Finishing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Treatment Options</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FINISHING.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="border-2 border-navy-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-navy-900">{f.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${f.tag === "Standard" ? "bg-navy-900 text-white" : f.tag === "Institutional" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                    {f.tag}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 6 — CERTIFICATIONS (Memphis style - colourful, layered) */}
      <section id="section-certifications" className="bg-amber-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Certifications</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Standards &amp; Compliance</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div key={cert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-amber-100 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div style={{ width: 56, height: 40 }} className="flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <Image src={cert.img} alt={cert.name} width={56} height={40} className="object-contain" sizes="56px" />
                  </div>
                  <div>
                    <p className="font-bold text-navy-900 text-sm">{cert.name}</p>
                    <p className="text-amber-600 text-xs">{cert.full}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{cert.desc}</p>
                <span className={`self-start text-[10px] font-bold px-2.5 py-0.5 rounded-full ${cert.tier === "Recycled" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{cert.tier}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 7 — SECTORS */}
      <section id="section-sectors" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Market Sectors</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Who Buys Fleece Blankets</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div key={s.abbr} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 bg-rose-100 text-rose-700 rounded-xl text-xs font-bold flex items-center justify-center shrink-0">{s.abbr}</span>
                  <h3 className="text-base font-bold text-navy-900">{s.name}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.detail}</p>
                <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">{s.market}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 8 — EXPORT TERMS */}
      <section id="section-export" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Incoterms &amp; Shipping</h2>
            <p className="text-gray-400 mt-3 text-sm">All programmes ship from Karachi or Port Qasim, Pakistan.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {EXPORT_TERMS.map((t, i) => (
              <motion.div key={t.term} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl font-black text-gold">{t.term}</span>
                  <span className="text-xs text-gray-400">{t.full}</span>
                </div>
                <p className="text-xs text-amber-400 mb-2">{t.port}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 9 — PROCESS */}
      <section id="section-process" className="bg-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">The Sourcing Process</h2>
          </motion.div>
          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-6 pb-10 relative">
                {i < PROCESS_STEPS.length - 1 && <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-100" aria-hidden="true" />}
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center shrink-0 z-10">{step.num}</div>
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

      {/* SECTION 10 — SUSTAINABILITY */}
      <section id="section-sustainability" className="bg-green-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Environmental &amp; Recycled Options</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUSTAINABILITY.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-green-100">
                <span className="text-2xl mb-3 block" aria-hidden="true">{s.icon}</span>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                  <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{s.tag}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 11 — LEAD TIMES */}
      <section id="section-leadtimes" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-4">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Timeline</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Indicative Lead Times</h2>
          </motion.div>
          <div className="mb-8 bg-amber-500/15 border border-amber-500/30 rounded-xl px-5 py-3">
            <p className="text-amber-400 text-xs font-semibold">⚠ All timelines are indicative only. For seasonal retail programmes, plan minimum 90–100 days from order placement to store. Subject to factory scheduling and material availability.</p>
          </div>
          <div className="space-y-4">
            {LEAD_STAGES.map((stage, i) => (
              <motion.div key={stage.stage} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className={`w-10 h-10 rounded-lg ${stage.colour} flex items-center justify-center shrink-0`}>
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Thermal Blankets</p>
            <h2 className="text-2xl font-bold text-navy-900">More Thermal Blanket Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Cellular Thermal Blanket", desc: "100% cotton cellular weave blanket. NHS, hospital and institutional programmes.", href: "/hometextile/thermalblankets/cellularthermalblanket/", img: "/images/hero/hero-cellular-thermal-blanket.webp", alt: "Pakistan cellular thermal blanket manufacturer — OEM cotton cellular blankets for NHS and hospital buyers worldwide" },
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

      {/* FINAL CTA */}
      <section className="bg-[#0D1B2A] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Get a Quote</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Source Fleece Blankets from Pakistan</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Share your construction type, GSM, size, decoration requirements, certifications and destination. Detailed quotation within 3–5 business days.
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
