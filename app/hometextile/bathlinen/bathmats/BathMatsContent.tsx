"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            : "border-2 border-gold text-navy-900 hover:bg-gold shadow-sm"
        }`}
        style={{ animation: "btt-pulse 2.2s ease-out infinite" }}
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} aria-hidden="true">↑</motion.span>
        Move back to top
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

const CONSTRUCTIONS = [
  {
    id: "terry-tufted",
    name: "Terry Loop (Tufted)",
    badge: "Industry Standard",
    gsm: "800–1200 GSM",
    backing: "Latex or rubber spray",
    pile: "Cotton terry loops, cut pile or looped face",
    best: ["Hotel & Hospitality", "Institutional Contract", "Retail Basics"],
    markets: ["USA", "EU", "UK", "Middle East"],
    washCycles: "200+ industrial wash cycles at 85°C",
    detail: "Tufted terry loop is the dominant construction for hotel bath mats — the production process punches cotton loops into a base fabric, creating uniform pile density and consistent absorbency. The heavy tufted base provides robust performance across repeated industrial laundering cycles. Latex backing is standard for hotel programmes; rubber spray for cost-sensitive institutional contracts.",
    spec: "100% cotton face pile, woven base. GSM 800–1200. Latex anti-slip backing standard. ISO 105 X12 colour fastness.",
    icon: "🔲",
  },
  {
    id: "chenille-tufted",
    name: "Chenille Tufted",
    badge: "Retail Premium",
    gsm: "1000–1400 GSM",
    backing: "Latex backing (anti-slip)",
    pile: "Chenille yarn — ultra-soft, plush surface",
    best: ["Retail Premium", "Luxury Hospitality", "Boutique Hotels"],
    markets: ["USA", "UK", "EU", "Australia"],
    washCycles: "100–150 domestic wash cycles",
    detail: "Chenille tufted bath mats are the retail premium standard — the velvety chenille pile delivers a visually luxurious appearance and an exceptionally soft underfoot feel. Higher weight range (1000–1400 GSM) due to the denser pile structure. Primarily positioned for retail floor programmes, boutique hotel procurement and premium brand development. Less resistant to industrial laundering than terry tufted.",
    spec: "Chenille yarn face pile, woven base. GSM 1000–1400. Anti-slip latex backing. Reactive or vat dyed.",
    icon: "🪶",
  },
  {
    id: "memory-foam",
    name: "Memory Foam + Terry Cover",
    badge: "Comfort Segment",
    gsm: "1200–1500 GSM",
    backing: "Non-slip bottom fabric (molded)",
    pile: "Viscoelastic foam core, terry-covered face",
    best: ["Premium Retail", "Consumer Comfort", "DTC Brands"],
    markets: ["USA", "Canada", "EU", "Australia"],
    washCycles: "50–80 domestic wash cycles (cover washable)",
    detail: "Memory foam bath mats combine a viscoelastic foam core with a removable or bonded terry cover. The foam conforms to foot shape providing a spa-like experience — the premium comfort segment of the category. Construction requires a separate cover-lamination or stitching process. The market is primarily DTC, premium retail and the growing consumer wellness sector.",
    spec: "Viscoelastic foam core, bonded or attached terry face. Total GSM 1200–1500. Non-slip base fabric. Cover washable at 40°C.",
    icon: "🛏️",
  },
  {
    id: "microfiber-tufted",
    name: "Microfiber Tufted",
    badge: "Fast-Dry Option",
    gsm: "900–1100 GSM",
    backing: "Latex or rubber spray",
    pile: "Microfiber pile — rapid moisture absorption",
    best: ["Gym & Spa", "Retail Value", "Fast-Dry Programmes"],
    markets: ["USA", "EU", "SE Asia", "Australia"],
    washCycles: "100–120 cycles at 60°C",
    detail: "Microfiber tufted bath mats absorb moisture approximately 30% faster than equivalent GSM cotton terry — a performance benefit that drives demand in gym, spa and quick-dry retail segments. The split microfiber structure also dries significantly faster than cotton pile, reducing mould risk in high-humidity environments. A cost-effective alternative to cotton terry for volume-driven retail programmes.",
    spec: "80% polyester / 20% polyamide microfiber pile. GSM 900–1100. Anti-slip backing. Machine washable at 60°C.",
    icon: "💧",
  },
  {
    id: "waffle-weave",
    name: "Waffle Weave",
    badge: "Design Differentiator",
    gsm: "800–1000 GSM",
    backing: "Latex backing optional",
    pile: "Textured waffle grid — woven, not tufted",
    best: ["Design-Led Retail", "Spa & Wellness", "Lifestyle Brands"],
    markets: ["EU", "USA", "UK", "Australia"],
    washCycles: "150+ cycles — excellent durability",
    detail: "Waffle weave bath mats offer a distinctive textured grid appearance versus the uniform pile of tufted constructions. The interlocking waffle structure has excellent durability and maintains its visual character across many laundering cycles — a strong advantage for design-led retail and spa programmes where aesthetics are a differentiator. Available with or without latex backing.",
    spec: "100% cotton waffle weave. GSM 800–1000. Optional latex backing. Reactive dyed or yarn-dyed.",
    icon: "🧇",
  },
];

const GSM_TIERS = [
  { gsm: "800–1000", name: "Standard Commercial", use: "Institutional, value retail", pct: 50, featured: false, col: "bg-sky-300", note: "Terry loop and waffle weave sit in this band. Suitable for high-cycle institutional washing programmes — hotels, hospitals, laundry services." },
  { gsm: "1000–1200", name: "Hotel Contract", use: "4- and 5-star hospitality", pct: 80, featured: true, col: "bg-gold", note: "The dominant weight band for hotel bath mat contracts. High-density tufted terry or chenille at this weight withstands 200+ industrial wash cycles without significant pile loss." },
  { gsm: "1200–1500", name: "Premium Retail", use: "Memory foam, luxury chenille", pct: 55, featured: false, col: "bg-purple-400", note: "Memory foam programmes and luxury chenille sit here. Positioned as retail premium — the visual and tactile cue that justifies a higher price point." },
];

const BACKING_OPTIONS = [
  {
    type: "Latex Anti-Slip",
    icon: "🏥",
    safety: "EN 13893 slip-resistance",
    best: "Hotel, healthcare, institutional contract",
    durability: "Excellent — maintains grip through 150+ industrial washes",
    note: "Standard for any programme where slip risk creates liability. ASTM F462 and EN 13893 testing available on request.",
    color: "sky",
  },
  {
    type: "Rubber Spray Backing",
    icon: "🔧",
    safety: "Functional anti-slip",
    best: "Value retail, export volume programmes",
    durability: "Good — 80–100 domestic wash cycles",
    note: "Lower cost than latex. Adequate for domestic retail programmes. Not recommended for contract hospitality or healthcare.",
    color: "amber",
  },
  {
    type: "No Backing",
    icon: "🧶",
    safety: "Non-slip placement dependent on flooring",
    best: "Design-led retail, spa display, waffle weave",
    durability: "N/A — fabric construction only",
    note: "Suitable where the buyer adds their own anti-slip pad or for display bath mats. Waffle weave is frequently sold without backing.",
    color: "gray",
  },
];

const SIZES = [
  { size: "40×60 cm", name: "Small / Compact", use: "Pedestal mats, toilet area, compact en-suites", market: "EU residential retail" },
  { size: "50×80 cm", name: "Standard Bath Mat", use: "Single basin, standard en-suite bath area", market: "USA, EU, UK — primary hotel specification" },
  { size: "60×100 cm", name: "Large / Double Basin", use: "Twin basin bathrooms, large en-suites, walk-in shower", market: "5-star hotel contracts, luxury residential" },
  { size: "Custom", name: "Custom to Specification", use: "Bespoke sizes for hotel fit-out, healthcare dimensions", market: "Contract projects worldwide" },
];

const PATTERN_OPTIONS = [
  { code: "PL", name: "Plain / Solid Colour", note: "Hotel contract standard — single reactive-dyed colour across full face", compat: ["Terry Tufted", "Chenille", "Microfiber", "Waffle"] },
  { code: "DT", name: "Dobby / Jacquard Border", note: "Tonal woven border defining the mat edge — popular in hospitality", compat: ["Terry Tufted", "Waffle"] },
  { code: "YD", name: "Yarn-Dyed Stripe", note: "Multi-colour stripe woven into the face pile using yarn-dyed yarns", compat: ["Waffle Weave"] },
  { code: "TP", name: "Tufted Pattern (All-Over)", note: "Custom pattern tufted into the face — colour blocks, geometric, logo", compat: ["Terry Tufted", "Chenille", "Microfiber"] },
  { code: "EM", name: "Embroidered Detail", note: "Logo, monogram or motif embroidered onto the pile face", compat: ["Terry Tufted", "Chenille"] },
  { code: "PR", name: "Printed Design", note: "Reactive or screen-printed design on finished bath mat face", compat: ["Microfiber"] },
];

const CERTIFICATIONS = [
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — EU/UK import compliance for next-to-skin products", tier: "Essential" },
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic cotton sourcing and processing for sustainable bath mat programmes", tier: "Premium" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Labour standards and worker welfare audit — EU retailer requirement", tier: "Standard" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment reporting platform", tier: "Standard" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality, process documentation and audit trail", tier: "Standard" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled polyester verification for microfiber programmes", tier: "Optional" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance certification", tier: "Standard" },
  { name: "SA8000", full: "Social Accountability International", desc: "Rigorous independent social audit — worker rights, wages, conditions", tier: "Premium" },
];

const HOTEL_SECTORS = [
  { abbr: "4H", name: "4-Star Hotels", spec: "50×80 cm, 1000–1200 GSM terry, latex backing", note: "Primary institutional volume buyer. Specification-driven tenders, 2–3 year supply contracts." },
  { abbr: "5H", name: "5-Star & Luxury", spec: "60×100 cm, 1200+ GSM chenille, branded", note: "Premium chenille or waffle weave. Embroidered property logo. Higher margin, lower volume." },
  { abbr: "HC", name: "Healthcare", spec: "50×80 cm anti-slip, EN 13893 certified backing", note: "Safety-critical specification — latex backing with documented slip-resistance certification. Autoclave-safe options." },
  { abbr: "SP", name: "Spa & Wellness", spec: "Waffle weave, design-led, custom colour", note: "Aesthetic and experiential focus. Waffle weave and custom tufted patterns for branded environments." },
  { abbr: "RT", name: "Retail Programmes", spec: "All constructions, retail packaging", note: "Mass market to premium. Brand owners and licensees requiring OEM production and retail-ready presentation." },
  { abbr: "DT", name: "DTC & E-commerce", spec: "Memory foam, chenille, premium presentation", note: "Growing channel, premium positioning. Packaging quality and unboxing experience are specification items." },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with established freight relationships. Buyer arranges sea freight from Pakistan port." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance. Commonly requested by buyers in Europe and Australia." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange sea freight; buyer provides own insurance. Common for buyers with preferred marine cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer manages all logistics. Lowest quoted price, highest logistics responsibility on the buyer." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard bulk export" },
  { icon: "🛍️", label: "Retail Header Card", note: "Retail peg display" },
  { icon: "📦", label: "Retail Box", note: "Flat or gift-style" },
  { icon: "🎁", label: "Set Pack (Mat + Toilet Mat)", note: "2-piece bathroom set" },
  { icon: "🧻", label: "Rolled & Banded", note: "Hospitality supply format" },
  { icon: "✏️", label: "Custom Packaging", note: "To your brand brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Construction, GSM, backing type, size and volume confirmed; factory shortlist generated", color: "bg-gold" },
  { stage: "Sample Production", days: "14–21", desc: "Pre-production samples to construction, colour and backing specification", color: "bg-sky-500" },
  { stage: "Backing Approval", days: "3–5", desc: "Anti-slip performance confirmed — backing type and adhesion validated", color: "bg-amber-500" },
  { stage: "Bulk Production", days: "45–60", desc: "From confirmed PO and approved sample", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection, weight and dimension verification before loading", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "18–28", desc: "FCL/LCL from Karachi or Port Qasim to destination port", color: "bg-teal-500" },
];

const FAQS = [
  {
    q: "What is the difference between latex and rubber spray anti-slip backing for hotel bath mats?",
    a: "Latex backing is a continuous vulcanised layer — it maintains grip performance across 150+ industrial wash cycles at 85°C, making it the specification standard for hotel and healthcare contracts where slip risk creates liability. Rubber spray backing is a cost-effective alternative suited to domestic retail programmes — adequate for 80–100 wash cycles but degradation is faster under industrial laundering conditions. For any programme where buyer liability or duty-of-care applies, latex is the required specification.",
  },
  {
    q: "What GSM is right for a hotel bath mat that will go through industrial laundering?",
    a: "Hotel contract bath mats are typically specified at 1000–1200 GSM in tufted terry. This weight band balances pile density (for absorbency and appearance), structural integrity under repeated industrial washing at 85°C, and cost-per-cycle economics. Mats below 800 GSM tend to show pile loss after 100–150 washes. Above 1200 GSM, drying time increases, adding cost to laundry operations. 1000–1200 GSM is the industry sweet spot for 4- and 5-star hotel contracts.",
  },
  {
    q: "Can bath mats be produced as a coordinated set with a toilet mat or pedestal mat?",
    a: "Yes. Two-piece bathroom sets (bath mat + toilet mat / pedestal mat) are a standard programme structure for retail and hospitality buyers. Both pieces are produced from the same fabric lot to ensure colour consistency. Set dimensions are specified independently — typically 50×80 cm bath mat paired with a 40×60 cm or 45×45 cm pedestal/toilet mat. Retail set packaging (gift box or polybag multi-pack) is available alongside individual unit packing.",
  },
  {
    q: "What is the correct bath mat specification for healthcare facilities?",
    a: "Healthcare bath mat specifications prioritise verifiable slip resistance (EN 13893 or ASTM F462 certification for the backing), infection control (OEKO-TEX certified chemicals, no antimicrobial residues banned under EU biocide regulations) and laundering robustness (rated for repeated high-temperature cycles). Latex backing is mandatory for healthcare applications. Plain white or institutional colour — no decorative pile patterns. Tufted terry loop at 1000–1200 GSM is the standard healthcare specification.",
  },
  {
    q: "Are custom sizes available, and what are the lead time implications?",
    a: "Custom sizes are available — the most common custom requests are from hotel fit-out projects (bespoke dimensions matching bathroom layouts), healthcare facilities (to clear door clearances and wet-room drainage configurations) and luxury residential programmes. Custom sizing adds 5–7 days to the sampling timeline due to custom cutting and pattern setup. There is no additional unit cost beyond sampling setup for quantities above a programme-viable volume. Specify custom dimensions precisely in the RFQ including any corner cutout requirements.",
  },
  {
    q: "What are typical indicative lead times from sample approval to shipment?",
    a: "As an indicative guide: sample production 14–21 days from specification lock; backing approval 3–5 days; bulk production 45–60 days from confirmed PO; pre-shipment QC 3–5 days. These timelines are indicative and vary with construction complexity, custom dimensions, pattern requirements, quantity and factory scheduling. Bath mat programmes have a longer sampling cycle than lighter knitwear because backing adhesion and pile density require physical testing before bulk approval. Your confirmed quotation will include a programme-specific production schedule.",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function BathMatsContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip">

      {/* ════════════════════════════════════════════════════════════════════════
          HERO — image overlay
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/menu/menu-bathmats.webp"
            fill
            alt="Pakistan bath mat manufacturer — OEM anti-slip tufted and chenille bath mats for hotels and retailers worldwide"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Bath Linen — Safety-First Specification
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Bath Mat
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl"
            >
              MZ Global Trading sources bath mats from Pakistan&rsquo;s certified factories — tufted terry, chenille, memory foam, microfiber and waffle weave. 800–1500 GSM. Latex and rubber spray anti-slip backing verified to EN 13893. Hotel contracts, healthcare, retail and DTC programmes.
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true"
        >
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          STATS ANCHOR
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Bath Mat Supply — Safety Specification Matters</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Anti-Slip Performance is a Liability Issue, Not a Preference.</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Bath mats are a safety-critical purchase for hotels, healthcare facilities and residential retail. Slip and fall incidents in bathroom environments carry documented legal liability. The specification of anti-slip backing — latex type, rubber spray or none — is not an aesthetic choice; it is a duty-of-care decision. We source bath mats to the correct safety standard for the end environment, with documentation to match.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "5", label: "Construction Types" },
                { val: "800–1500", label: "GSM Weight Range" },
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

      {/* ════════════════════════════════════════════════════════════════════════
          MAIN BENTO GRID  id="bento-grid"
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1: Constructions + Anti-Slip Backing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🔲</span>
                <div>
                  <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase">Technical</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Construction Types</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3 border border-slate-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    {c.badge && <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏥</span>
                <div>
                  <p className="text-gray-600 text-xs font-semibold tracking-[0.2em] uppercase">Minimal</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Anti-Slip Backing Guide</h3>
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                {BACKING_OPTIONS.map((b) => (
                  <div key={b.type} className="bg-white rounded-xl px-4 py-3.5 border border-gray-100 flex items-start gap-3">
                    <span className="text-xl shrink-0" aria-hidden="true">{b.icon}</span>
                    <div>
                      <p className="font-bold text-navy-900 text-sm">{b.type}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{b.safety}</p>
                      <p className="text-xs text-sky-600 mt-0.5">{b.best}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-backing" label="Backing Types" />
            </motion.div>
          </div>

          {/* Row 2: GSM + Design + Sizes + Certifications */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">⚖️</span>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-1">Infographic</p>
              <h3 className="text-lg font-bold text-navy-900 mb-3">GSM Weight Tiers</h3>
              <div className="flex flex-col gap-2 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="flex items-center gap-2">
                    <div className={`h-2 rounded-full ${t.col}`} style={{ width: `${t.pct}%` }} />
                    <span className="text-[10px] text-gray-500 whitespace-nowrap">{t.gsm}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="GSM Guide" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🖼️</span>
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-1">Industrial</p>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Design &amp; Pattern</h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {PATTERN_OPTIONS.map((p) => (
                  <div key={p.code} className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center shrink-0">{p.code}</span>
                    <span className="text-xs font-medium text-navy-900">{p.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-design" label="Design Options" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">📐</span>
              <p className="text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-1">Moodboard</p>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Standard Sizes</h3>
              <div className="flex flex-col gap-2 flex-1">
                {SIZES.map((s) => (
                  <div key={s.size} className="flex items-start gap-2">
                    <span className="font-bold text-navy-900 text-xs shrink-0">{s.size}</span>
                    <span className="text-xs text-gray-400 leading-tight">{s.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="Size Guide" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🏅</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase mb-1">Corporate</p>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Certifications</h3>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {CERTIFICATIONS.slice(0, 4).map((c) => (
                  <div key={c.name} className="bg-white rounded-xl border-2 border-sky-100 flex items-center justify-center p-2 aspect-square">
                    <p className="text-[10px] font-bold text-navy-900 text-center leading-tight">{c.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="All Certifications" />
            </motion.div>
          </div>

          {/* Row 3: Hotel Sectors + Export + Packaging */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="md:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🏨</span>
              <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase mb-1">Grid</p>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Buyer Sectors</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-1">
                {HOTEL_SECTORS.slice(0, 4).map((s) => (
                  <div key={s.abbr} className="bg-white rounded-lg p-2.5 border border-teal-100">
                    <p className="text-[10px] font-bold text-teal-600">{s.abbr}</p>
                    <p className="text-xs font-semibold text-navy-900 leading-tight">{s.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sectors" label="All Sectors" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🔬</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase mb-1">Glassmorphism</p>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Packaging Options</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PACK_OPTIONS.slice(0, 4).map((p) => (
                  <div key={p.label} className="flex items-center gap-2">
                    <span aria-hidden="true">{p.icon}</span>
                    <span className="text-xs text-navy-900 font-medium">{p.label}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="Packaging Details" />
            </motion.div>
          </div>

          {/* Row 4: Data Visualization + Process */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">📊</span>
              <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase mb-1">Data Visualization</p>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Cost-per-Wash Lifecycle</h3>
              <div className="flex flex-col gap-3 flex-1">
                {[
                  { label: "Terry Tufted (Latex)", cycles: 200, bar: "w-full" },
                  { label: "Microfiber Tufted", cycles: 110, bar: "w-[55%]" },
                  { label: "Chenille (Latex)", cycles: 130, bar: "w-[65%]" },
                  { label: "Rubber Spray", cycles: 90, bar: "w-[45%]" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-500 w-28 shrink-0 leading-tight">{r.label}</span>
                    <div className="flex-1 bg-white rounded-full h-2">
                      <div className={`${r.bar} bg-orange-400 h-2 rounded-full`} />
                    </div>
                    <span className="text-[10px] text-gray-400 shrink-0">{r.cycles}+</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-3">Indicative wash cycle resistance. Actual performance varies with laundering conditions.</p>
              <ExploreBtn sectionId="section-constructions" label="Construction Details" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-lime-50 border border-lime-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">⚙️</span>
              <p className="text-lime-600 text-xs font-semibold tracking-[0.2em] uppercase mb-1">Flat Design</p>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Programme Timeline</h3>
              <div className="flex flex-col gap-2 flex-1">
                {LEAD_STAGES.slice(0, 4).map((s, i) => (
                  <div key={s.stage} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full ${s.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>{i + 1}</span>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-navy-900">{s.stage}</span>
                      <span className="text-[10px] text-gold ml-2">{s.days} days</span>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-process" label="Full Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          RESOURCES ROW
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "📚", label: "Knowledge Hub", sub: "Pakistan home textile export guides", href: "/knowledge/" },
              { icon: "📖", label: "Sourcing Guides", sub: "Construction, certification and spec guides", href: "/guides/" },
              { icon: "📥", label: "Downloads", sub: "Specification sheets and testing documentation", href: "/downloads/" },
              { icon: "📋", label: "Quick Start", sub: "Construction, GSM, backing, size — RFQ takes 3 minutes.", href: "/rfq/" },
            ].map((r) => (
              <Link key={r.label} href={r.href} className="group bg-white border border-gray-100 hover:border-gold rounded-2xl p-5 flex items-start gap-4 hover:shadow-sm transition-all">
                <span className="text-2xl shrink-0" aria-hidden="true">{r.icon}</span>
                <div>
                  <p className="font-bold text-navy-900 group-hover:text-gold transition-colors text-sm">{r.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{r.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — CONSTRUCTIONS (Technical UI + Full Specs)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">01 — Construction</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Bath Mat Construction Types from Pakistan</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Five construction categories serving distinct market segments — from institutional contract terry loop to retail-premium memory foam. Construction selection drives GSM, backing compatibility, cost-per-cycle performance and buyer positioning.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div key={c.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gold hover:shadow-lg transition-all"
              >
                <div className="h-1.5 bg-gradient-to-r from-slate-400 via-slate-500 to-gray-500" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {c.badge && <span className="inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full mb-2">{c.badge}</span>}
                      <h3 className="text-xl font-bold text-navy-900">{c.name}</h3>
                      <p className="text-sm text-sky-600 mt-1">{c.gsm}</p>
                    </div>
                    <span className="text-3xl" aria-hidden="true">{c.icon}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Backing</p>
                      <p className="text-xs text-gray-600">{c.backing}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Wash Cycles</p>
                      <p className="text-xs text-gray-600">{c.washCycles}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.detail}</p>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Specification</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{c.spec}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {c.best.map((b) => (
                      <span key={b} className="text-[10px] bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — BACKING (Minimal UI + Comparison)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-backing" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">02 — Safety Backing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Anti-Slip Backing Guide — Specification by End Environment</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">The backing specification is the most consequential decision in bath mat procurement for commercial environments. Choosing the wrong backing type for the end environment — particularly in hotel, healthcare and aged-care applications — creates documented liability risk. This guide maps backing types to end-use environments.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {BACKING_OPTIONS.map((b, i) => (
              <motion.div key={b.type}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-8 border-2 ${b.color === "sky" ? "bg-sky-50 border-sky-200" : b.color === "amber" ? "bg-amber-50 border-amber-200" : "bg-white border-gray-200"}`}
              >
                <span className="text-4xl mb-4 block" aria-hidden="true">{b.icon}</span>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{b.type}</h3>
                <div className="space-y-3 mt-4">
                  {[
                    { label: "Safety Standard", val: b.safety },
                    { label: "Best For", val: b.best },
                    { label: "Durability", val: b.durability },
                  ].map((r) => (
                    <div key={r.label}>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{r.label}</p>
                      <p className="text-sm text-gray-700 mt-0.5">{r.val}</p>
                    </div>
                  ))}
                </div>
                <div className={`mt-4 rounded-xl px-4 py-3 text-xs leading-relaxed ${b.color === "sky" ? "bg-sky-100 text-sky-800" : b.color === "amber" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-600"}`}>
                  {b.note}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4">
            <p className="text-sm font-bold text-red-800 mb-1">⚠ Hotel &amp; Healthcare Programmes: Latex Backing Only</p>
            <p className="text-sm text-red-700">Any programme where the bath mat will be used in a commercial wet environment with liability exposure — hotel, care home, hospital — must specify latex anti-slip backing. Rubber spray backing is not an acceptable substitute for these environments. EN 13893 and ASTM F462 testing documentation available on request for contract programmes.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — GSM (Infographic UI + Weight Guide)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-gsm" className="bg-amber-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">03 — Weight</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">GSM Guide — Specifying Bath Mat Weight for Cost-Per-Wash Efficiency</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Bath mat GSM is not just a quality signal — it is a direct input to laundry operating costs. A heavier mat takes longer to dry, consuming more energy per cycle. The 1000–1200 GSM band is the industry optimum for institutional programmes where drying time and wash cycle frequency both feed operating costs.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {GSM_TIERS.map((t, i) => (
              <motion.div key={t.gsm}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-8 relative overflow-hidden ${t.featured ? "bg-[#0D1B2A] text-white" : "bg-white border border-amber-200"}`}
              >
                {t.featured && <div className="absolute top-3 right-3 text-[10px] bg-gold text-navy-900 font-bold px-2.5 py-1 rounded-full">Hotel Contract Standard</div>}
                <p className={`text-4xl font-black mb-2 ${t.featured ? "text-gold" : "text-navy-900"}`}>{t.gsm} GSM</p>
                <p className={`text-lg font-bold mb-1 ${t.featured ? "text-white" : "text-navy-900"}`}>{t.name}</p>
                <p className={`text-sm mb-4 ${t.featured ? "text-gray-300" : "text-gray-500"}`}>{t.use}</p>
                <div className={`h-2 ${t.featured ? "bg-gray-700" : "bg-amber-100"} rounded-full mb-4`}>
                  <div className={`h-2 rounded-full ${t.col}`} style={{ width: `${t.pct}%` }} />
                </div>
                <p className={`text-xs leading-relaxed ${t.featured ? "text-gray-300" : "text-gray-600"}`}>{t.note}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-amber-200">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Cost-Per-Wash Calculation Inputs</p>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="min-w-[480px]">
                <div className="grid grid-cols-4 bg-amber-50 border-b border-amber-100 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-t-xl overflow-hidden">
                  <div className="px-4 py-3">GSM Range</div>
                  <div className="px-4 py-3">Drying Time</div>
                  <div className="px-4 py-3">Cycle Resistance</div>
                  <div className="px-4 py-3">Best Channel</div>
                </div>
                {[
                  { gsm: "800–1000", dry: "Shorter", cycles: "150–200+", channel: "Volume institutional" },
                  { gsm: "1000–1200", dry: "Standard", cycles: "200+", channel: "Hotel contract" },
                  { gsm: "1200–1500", dry: "Longer", cycles: "50–150", channel: "Premium retail / DTC" },
                ].map((r, i) => (
                  <div key={r.gsm} className={`grid grid-cols-4 border-b border-amber-50 text-sm ${i % 2 === 0 ? "bg-white" : "bg-amber-50/40"}`}>
                    <div className="px-4 py-3 font-semibold text-navy-900 text-xs">{r.gsm} GSM</div>
                    <div className="px-4 py-3 text-xs text-gray-600">{r.dry}</div>
                    <div className="px-4 py-3 text-xs text-amber-700 font-medium">{r.cycles}</div>
                    <div className="px-4 py-3 text-xs text-gray-600">{r.channel}</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 italic">⚠ Indicative values. Actual drying time and cycle resistance depend on construction, pile density and laundering conditions.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — DESIGN (Industrial UI + Pattern Guide)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-design" className="bg-gray-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">04 — Design</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Pattern, Colour and Decoration Options for Bath Mats</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">Bath mat design is constrained by construction — you cannot screen print onto terry loop pile, and sublimation requires flat polyester faces. Each pattern and decoration method has a defined compatibility list. Specify construction and pattern together, not independently.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {PATTERN_OPTIONS.map((p, i) => (
              <motion.div key={p.code}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-700 text-gray-300 font-black text-sm flex items-center justify-center shrink-0">{p.code}</div>
                  <h3 className="font-bold text-white mt-1.5">{p.name}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{p.note}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.compat.map((c) => <span key={c} className="text-[10px] bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{c}</span>)}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Standard Colour Programme</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { palette: "Hotel White / Ivory", swatches: ["bg-white", "bg-stone-100", "bg-amber-50", "bg-neutral-100"] },
                { palette: "Neutral Earth Tones", swatches: ["bg-stone-300", "bg-stone-400", "bg-amber-200", "bg-neutral-400"] },
                { palette: "Spa Blues & Greens", swatches: ["bg-sky-200", "bg-teal-300", "bg-cyan-200", "bg-emerald-200"] },
                { palette: "Custom PMS Match", swatches: ["bg-gray-300", "bg-gray-400", "bg-gray-500", "bg-gray-600"] },
              ].map((col) => (
                <div key={col.palette}>
                  <p className="text-xs text-gray-400 mb-2">{col.palette}</p>
                  <div className="grid grid-cols-4 gap-1">
                    {col.swatches.map((s, j) => (
                      <div key={j} className={`${s} rounded-md aspect-square border border-gray-600`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">Full PMS colour matching with lab dip approval before bulk production. ISO 105 X12 colour fastness maintained.</p>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — SIZES (Moodboard UI + Table)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sizes" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">05 — Sizes</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Bath Mat Standard Sizes and Custom Dimensions</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Three standard sizes cover the vast majority of institutional and retail programmes. Custom dimensions are available — most commonly for hotel fit-out contracts where the bathroom layout specifies exact mat coverage. Custom sizes add 5–7 days to sampling but no unit cost premium at volume.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {SIZES.map((s, i) => (
              <motion.div key={s.size}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-rose-50 border-2 border-rose-100 hover:border-gold rounded-2xl p-6 flex flex-col transition-all hover:shadow-md"
              >
                <p className="text-3xl font-black text-navy-900">{s.size}</p>
                <p className="text-lg font-bold text-rose-600 mt-1 mb-3">{s.name}</p>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{s.use}</p>
                <p className="text-xs text-gray-400 mt-4">{s.market}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Set Composition Options</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Single bath mat", "2-piece set (bath + toilet mat)", "3-piece set (bath + 2 pedestal)", "Custom hotel set specification"].map((s) => (
                <div key={s} className="bg-white rounded-xl px-3 py-3 text-xs font-medium text-navy-900 text-center border border-rose-100">{s}</div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — BUYER SECTORS (Corporate UI + Grid)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sectors" className="bg-teal-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">06 — Sectors</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Bath Mat Buyer Sectors &amp; International Markets</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Bath mats from Pakistan serve a wide procurement spectrum — hotel chains sourcing institutional contracts through to DTC brands developing premium retail programmes. Each sector has distinct construction, backing, safety documentation and packaging requirements.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {HOTEL_SECTORS.map((s, i) => (
              <motion.div key={s.abbr}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-teal-100 hover:border-gold hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-black text-sm flex items-center justify-center">{s.abbr}</span>
                  <h3 className="font-bold text-navy-900">{s.name}</h3>
                </div>
                <p className="text-xs text-gold font-semibold mb-2">{s.spec}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{s.note}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#0D1B2A] rounded-2xl p-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Export Destinations — 35+ Markets</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { region: "North America", markets: "USA, Canada", note: "Hotel chains, retail programmes, DTC brands" },
                { region: "Europe", markets: "UK, DE, FR, NL, SE, AT", note: "Hotel contract, sustainable retail, OEKO-TEX compliance" },
                { region: "Middle East", markets: "AE, SA, QA, KW", note: "Luxury hospitality, hotel fit-out contracts" },
                { region: "Asia-Pacific", markets: "AU, NZ, SG, JP", note: "Premium retail, hotel contract, spa programmes" },
              ].map((r) => (
                <div key={r.region} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white font-bold text-sm mb-1">{r.region}</p>
                  <p className="text-gold text-xs mb-2">{r.markets}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{r.note}</p>
                </div>
              ))}
            </div>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — CERTIFICATIONS (Glassmorphism UI + Badge Grid)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-sky-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">07 — Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Certifications for Bath Mat Procurement Programmes</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">OEKO-TEX Standard 100 is the minimum certification for any bath mat programme entering EU or UK retail channels — it verifies the absence of harmful substances in a product with direct skin contact. Hotel contract programmes in Europe typically require BSCI or Sedex in addition to OEKO-TEX for ethical sourcing compliance.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={c.name}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-sky-200 hover:border-gold transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-navy-900 text-sm">{c.name}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${c.tier === "Essential" ? "bg-red-100 text-red-700" : c.tier === "Premium" ? "bg-gold/20 text-gold" : c.tier === "Optional" ? "bg-gray-100 text-gray-500" : "bg-teal-100 text-teal-700"}`}>{c.tier}</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-sky-100">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Certification by Programme Type</p>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="min-w-[480px]">
                <div className="grid grid-cols-4 bg-sky-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-sky-100">
                  <div className="px-4 py-3">Programme</div>
                  <div className="px-4 py-3">Required</div>
                  <div className="px-4 py-3">Recommended</div>
                  <div className="px-4 py-3">Optional</div>
                </div>
                {[
                  { prog: "Hotel Contract (EU/UK)", req: "OEKO-TEX, BSCI", rec: "Sedex, ISO 9001", opt: "GOTS, SA8000" },
                  { prog: "Healthcare", req: "OEKO-TEX, ISO 9001", rec: "BSCI, Sedex", opt: "SA8000" },
                  { prog: "Retail (EU/UK)", req: "OEKO-TEX", rec: "BSCI, WRAP", opt: "GOTS, GRS" },
                  { prog: "USA Retail", req: "WRAP or BSCI", rec: "OEKO-TEX, Sedex", opt: "SA8000, GRS" },
                ].map((r, i) => (
                  <div key={r.prog} className={`grid grid-cols-4 border-b border-sky-50 text-xs ${i % 2 === 0 ? "bg-white" : "bg-sky-50/40"}`}>
                    <div className="px-4 py-3 font-semibold text-navy-900">{r.prog}</div>
                    <div className="px-4 py-3 text-red-600 font-medium">{r.req}</div>
                    <div className="px-4 py-3 text-sky-600">{r.rec}</div>
                    <div className="px-4 py-3 text-gray-400">{r.opt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 8 — EXPORT & PACKAGING (Data Visualization UI)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-purple-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">08 — Logistics</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Export Terms and Packaging for Bath Mat Programmes</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Bath mats ship FCL or LCL from Karachi and Port Qasim. High GSM and bulk volume makes FCL the most cost-effective freight structure for hotel contract programmes. Packaging is specified at the programme level — hotel contract (bulk/dozen band), retail (polybag/box), DTC (premium unboxing specification).</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Incoterms Available</p>
              <div className="space-y-4">
                {EXPORT_TERMS.map((e, i) => (
                  <motion.div key={e.term}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                      <p className="font-black text-navy-900 text-sm">{e.term}</p>
                    </div>
                    <div className="border-l-2 border-purple-100 pl-4 flex-1">
                      <p className="font-bold text-navy-900">{e.full}</p>
                      <p className="text-xs text-gold mt-0.5">{e.port}</p>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{e.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Packaging by Channel</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { channel: "Hotel Contract", spec: "Dozen (12 pcs) banded or case bulk packing. No individual packaging.", icon: "🏨" },
                  { channel: "Healthcare Contract", spec: "Case bulk (24–50 pcs). Document pack with certification copies.", icon: "🏥" },
                  { channel: "Retail Programmes", spec: "Individual polybag or header card. Optional retail box.", icon: "🛍️" },
                  { channel: "DTC / E-commerce", spec: "Premium retail box, tissue wrap, branded ribbon band.", icon: "📦" },
                ].map((c) => (
                  <div key={c.channel} className="bg-white rounded-2xl p-5 border border-purple-100">
                    <span className="text-2xl mb-2 block" aria-hidden="true">{c.icon}</span>
                    <p className="font-bold text-navy-900 text-sm mb-2">{c.channel}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{c.spec}</p>
                  </div>
                ))}
              </div>

              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Indicative Programme Timeline</p>
              <div className="space-y-3">
                {LEAD_STAGES.map((s, i) => (
                  <motion.div key={s.stage}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5`}>{i + 1}</div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <p className="font-semibold text-navy-900 text-sm">{s.stage}</p>
                        <p className="text-xs text-gold font-bold">{s.days} days</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-tight">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
                ⚠ All timelines are indicative. Bath mat programmes include a backing approval stage not present in lighter knitwear. Your confirmed quotation will include a programme-specific schedule.
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — LIFECYCLE & SUSTAINABILITY (Flat Design UI)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">09 — Lifecycle</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Sustainable Bath Mat Programmes and Lifecycle Sourcing</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Institutional buyers increasingly specify bath mats using total lifecycle cost rather than unit price. A higher-GSM terry tufted mat at a higher unit price may deliver lower cost-per-cycle than a lighter mat that requires replacement after 80 washes. We can model lifecycle cost comparisons across construction options for large-scale hotel and healthcare contracts.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🌱", title: "GOTS Organic Cotton", tag: "GOTS", desc: "GOTS-certified organic cotton available for terry loop and waffle weave constructions. Fully traceable from farm to finished bath mat. Required for organic cotton retail claims." },
              { icon: "💧", title: "Low-Impact Dyeing", tag: "OEKO-TEX", desc: "Reactive dyeing with OEKO-TEX certified chemicals. No azo dyes or restricted substances. EU REACH compliance for all colour programmes." },
              { icon: "♻️", title: "Recycled Polyester Microfiber", tag: "GRS", desc: "GRS-certified recycled polyester available for microfiber tufted bath mat programmes. Post-consumer PET bottle feedstock verified by independent certification body." },
              { icon: "⚖️", title: "Ethical Factory Audits", tag: "BSCI / Sedex", desc: "BSCI and Sedex audited factories across Pakistan home textile supply network. Worker welfare, fair wages, working hours and health and safety independently verified." },
              { icon: "📊", title: "Lifecycle Cost Modelling", tag: "Institutional", desc: "For hotel and healthcare contracts: we provide construction-specific wash cycle resistance data, enabling total cost-of-ownership analysis before final specification is set." },
              { icon: "📦", title: "Sustainable Packaging", tag: "Optional", desc: "Recycled polybags, FSC-certified paper header cards and unbleached tissue wrap available for retail and DTC programmes on request." },
            ].map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-start gap-4"
              >
                <span className="text-3xl shrink-0" aria-hidden="true">{s.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-navy-900">{s.title}</h3>
                    <span className="text-[9px] font-bold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">{s.tag}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — PROCESS (Swiss Design UI + Numbered Flow)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">10 — Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Bath Mat Sourcing Process — RFQ to Shipment</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Bath mat programmes include a backing approval stage that lighter textiles do not require — anti-slip performance must be physically verified before bulk production. Six defined stages with clear deliverables. No ambiguity on approval gates.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEAD_STAGES.map((s, i) => (
              <motion.div key={s.stage}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-l-4 border-gold pl-6 py-2"
              >
                <p className="text-6xl font-black text-gray-100 leading-none select-none">{`0${i + 1}`}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs font-semibold text-gold tracking-[0.15em] uppercase">{s.days} days</p>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mt-1 mb-3">{s.stage}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — OEM CAPABILITIES (Corporate UI + Feature Grid)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">11 — OEM</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">OEM Bath Mat Capabilities for Hotel, Healthcare and Retail</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Full OEM programme management — from custom specification development through certified Pakistan production, safety-documentation and retail or institutional packaging. MZ Global Trading manages the specification-to-shipment process across our verified Pakistan home textile factory network.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: "01", title: "Custom Size & Shape", desc: "Standard or bespoke dimensions specified to your bathroom layout. Corner cutout, contoured edge and runner formats available." },
              { num: "02", title: "Construction to Specification", desc: "Terry tufted, chenille, memory foam, microfiber or waffle weave — selected to match your performance, cost-per-cycle and aesthetic requirements." },
              { num: "03", title: "Backing Selection & Safety Documentation", desc: "Latex or rubber spray backing specified for the end environment. EN 13893 and ASTM F462 test reports available for contract programmes." },
              { num: "04", title: "Custom Colour & Pattern Programme", desc: "Full PMS colour matching with lab dip approval. Tufted pattern, yarn-dyed, embroidery or print to your brand brief." },
              { num: "05", title: "Brand Label & Certification Documentation", desc: "Woven labels, care labels, hang tags. Full certification documentation package included with each shipment." },
              { num: "06", title: "Packaging for Every Channel", desc: "Bulk case (institutional), polybag or header card (retail), gift box with ribbon (DTC premium). Customised to your fulfilment requirement." },
            ].map((f, i) => (
              <motion.div key={f.num}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex items-start gap-4"
              >
                <span className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 font-black text-sm flex items-center justify-center shrink-0">{f.num}</span>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Bath Mat Sourcing — Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="group w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={faqOpen === i}
                >
                  <span className="font-semibold text-navy-900 pr-4 text-sm sm:text-base leading-snug">{f.q}</span>
                  <span className="relative shrink-0 mt-0.5">
                    {faqOpen !== i && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                      </span>
                    )}
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${faqOpen === i ? "border-gold bg-gold text-navy-900" : "border-gray-200 text-gray-400 group-hover:border-gold"}`}>
                      {faqOpen === i ? "−" : "+"}
                    </span>
                  </span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }} className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SAME-TIER PAGE BOXES
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Bath Linen</p>
            <h2 className="text-2xl font-bold text-navy-900">More Bath Linen Products</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Towels", desc: "Terry loop, velour, zero twist, waffle and jacquard. 450–600 GSM. Bath, hand and gym towels.", href: "/hometextile/bathlinen/towels/", img: "/images/menu/menu-towels.webp", alt: "Pakistan towel manufacturer — OEM terry and velour bath towels for hotels and retailers in USA, UK and Europe" },
              { name: "Institutional Towels", desc: "Hotel and healthcare terry. White dobby border. 400–550 GSM. Case and bulk supply.", href: "/hometextile/bathlinen/institutionaltowels/", img: "/images/menu/menu-institutionaltowels.webp", alt: "Pakistan institutional towel manufacturer — OEM hotel and healthcare terry towels for contract supply" },
              { name: "Bathrobes", desc: "Terry loop, velour, waffle and microfleece. Shawl, kimono and hooded collars.", href: "/hometextile/bathlinen/bathrobes/", img: "/images/menu/menu-bathrobes.webp", alt: "Pakistan bathrobe manufacturer — OEM terry and velour bathrobes for hotels and retail brands worldwide" },
              { name: "Beach & Pool Towels", desc: "Velour, fouta and sublimation print. 350–500 GSM. All-over print and yarn-dyed stripe.", href: "/hometextile/bathlinen/beachpooltowel/", img: "/images/menu/menu-beachpooltowel.webp", alt: "Pakistan beach towel manufacturer — OEM velour and fouta beach towels for retail and resort brands" },
            ].map((p) => (
              <Link href={p.href} key={p.name} className="group bg-white border border-gray-100 hover:border-gold rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-all">
                <div className="relative h-36 overflow-hidden">
                  <Image src={p.img} alt={p.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                </div>
                <div className="p-4 flex flex-col gap-1.5 flex-1">
                  <p className="font-bold text-navy-900 group-hover:text-gold transition-colors text-sm leading-tight">{p.name}</p>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{p.desc}</p>
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-gold transition-colors mt-1">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Start Your Programme</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Hotel contract, healthcare facility, retail floor —<br className="hidden sm:block" />
              <span className="text-gold"> anti-slip backing specified to your safety requirement.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Tufted terry, chenille or memory foam, 800–1500 GSM, latex or rubber spray backing. Programmes verified to EN 13893 for institutional buyers. Submit the RFQ; receive a certified Pakistan home textile mill match within 3–5 working days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-bold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
