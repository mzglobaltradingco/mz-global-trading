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
            : "border-2 border-gold text-navy-900 hover:bg-gold shadow-xs"
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
      <style>{`@keyframes btt-pulse { 0% { box-shadow: 0 0 0 0 rgba(212,160,23,0.45); } 70% { box-shadow: 0 0 0 10px rgba(212,160,23,0); } 100% { box-shadow: 0 0 0 0 rgba(212,160,23,0); } }`}</style>
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

const CONSTRUCTIONS = [
  { id: "damask-jacquard", name: "Cotton Damask / Jacquard", badge: "Fine Dining Standard", gsm: "220–300 GSM", look: "Lustrous woven pattern — self-coloured or jacquard motif", best: "Hotel banqueting, gala dining, formal restaurants", detail: "Damask and jacquard weave table covers are the benchmark of formal hospitality. The pattern is woven into the fabric structure — eliminating any applied decoration that can peel or fade. Reactive dyed to full PMS specification or white optical bleached. Ideal for hotel group programmes requiring consistent presentation across multiple properties." },
  { id: "plain-poplin", name: "Plain Weave / Poplin", badge: "", gsm: "150–200 GSM", look: "Clean, crisp flat surface — press-perfect finish", best: "Restaurants, cafés, corporate dining, everyday F&B", detail: "Plain weave cotton poplin delivers a consistently smooth pressed surface at a practical weight for high-turnover food service environments. Easy to launder and iron; holds colour across repeated washing cycles. Available in the full reactive dye colour range." },
  { id: "satin-weave", name: "Satin Weave", badge: "Events Specialist", gsm: "180–250 GSM", look: "High-sheen draped surface — premium visual presentation", best: "Event rental, weddings, gala receptions, award dinners", detail: "Satin weave table covers deliver the high-sheen lustrous finish used in premium event production. The floating warp structure creates a smooth reflective surface that photographs elegantly. Reactive dyed or discharge printed for coloured programmes. Popular with event rental companies supplying large-format events." },
  { id: "poly-cotton", name: "Poly-Cotton Easy-Care", badge: "Durability Leader", gsm: "200–280 GSM", look: "Matte finish, dimensional stability, press-resistant", best: "Event rental, institutional dining, airline catering", detail: "Poly-cotton blended table covers outperform in high-laundering environments. The polyester component provides dimensional stability — covers return to specification dimensions wash after wash — and reduces ironing time significantly. Specified by event rental operations managing thousands of laundering cycles per year." },
];

const GSM_TIERS = [
  { gsm: "150–180", name: "Lightweight", env: "Café / Quick Service", pct: 30, color: "bg-sky-300", desc: "Fast-drying for high-turnover café and quick service. Lightweight drape ideal for spring/summer settings." },
  { gsm: "200–250", name: "Hospitality Standard", env: "Restaurant / Hotel All-Day Dining", pct: 72, color: "bg-gold", desc: "Industry standard for hotel restaurant and all-day dining. Balances presentation quality with laundering practicality." },
  { gsm: "250–300+", name: "Formal Banquet", env: "Ballroom / Gala / Fine Dining", pct: 55, color: "bg-amber-600", desc: "Heavy-weight damask and jacquard for formal banquet settings. Optimal drape and table coverage for floor-length formats." },
];

const SIZES = [
  { code: "R-4", name: "Rectangular 4-Seat", dim: "132 × 178 cm", drop: "Standard 40 cm drop", use: "Bistro tables, café 4-top" },
  { code: "R-6", name: "Rectangular 6-Seat", dim: "152 × 213 cm", drop: "Standard 40 cm drop", use: "Restaurant 6-seat dining" },
  { code: "R-8", name: "Rectangular 8-Seat", dim: "178 × 274 cm", drop: "Standard 40 cm drop", use: "Banquet tables, boardroom dining" },
  { code: "RD", name: "Round", dim: "152 cm diameter", drop: "Standard 40 cm drop", use: "Hotel banqueting round tables" },
  { code: "SQ", name: "Square", dim: "137 × 137 cm", drop: "Balanced all sides", use: "Café four-top, bar-height tables" },
  { code: "CX", name: "Custom", dim: "To specification", drop: "Custom drop length", use: "All non-standard table formats" },
];

const FINISHES = [
  { name: "Wrinkle Resistant", tag: "Press Efficiency", desc: "Reduces ironing time after laundering — valuable for high-turnover operations with daily linen changeovers. Applied using non-formaldehyde resin chemistry." },
  { name: "Water & Stain Repellent", tag: "Service Protection", desc: "DWR-based barrier provides initial resistance to liquid spills. Reduces immediate staining during service. Degrades gradually with washing — commercial re-treatment available." },
  { name: "Soft Hand", tag: "Handle Quality", desc: "Silicone-based finish applied to achieve the premium soft handle expected in fine dining and luxury hotel programmes." },
  { name: "Anti-Shrink / Compacted", tag: "Dimensional Stability", desc: "Pre-shrinking ensures delivered dimensions match specification after laundering. Critical for custom-dimensioned programmes where table coverage consistency is specified." },
];

const DECORATION_OPTIONS = [
  { method: "Jacquard Woven Pattern", compatibility: "Damask / Jacquard constructions", note: "Pattern woven into fabric structure — most durable, no applied layer", use: "Hotel crests, geometric repeats, brand motifs" },
  { method: "Embroidered Logo / Monogram", compatibility: "All constructions", note: "Corner or edge placement. Survives industrial laundering without degradation", use: "Hotel logo, restaurant monogram, corporate identity" },
  { method: "Reactive Printing", compatibility: "Plain weave, poly-cotton", note: "All-over or border print. Full PMS colour range. Colourfast to ISO 105 C06", use: "Contemporary bistro, seasonal themes, branded events" },
  { method: "Plain / No Decoration", compatibility: "All constructions", note: "Clean presentation — most common for fine dining where linen colour is the design", use: "White damask, ivory satin, coloured poplin programmes" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Buyer arranges ocean freight from port of loading. Preferred by buyers with established freight forwarder relationships." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight to destination. Buyer arranges their own marine insurance." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer collects from factory and manages all logistics. Lowest quoted price, maximum buyer control." },
];

const SECTORS = [
  { abbr: "HB", name: "Hotel Banqueting", detail: "International hotel groups — multi-property programmes with standardised specification", market: "Worldwide" },
  { abbr: "RS", name: "Restaurant Groups", detail: "Independent and chain restaurants — seasonal and year-round programmes", market: "USA · UK · EU" },
  { abbr: "EV", name: "Event Rental", detail: "Event linen rental companies — high laundering cycle, large inventory requirements", market: "USA · UK · EU · Australia" },
  { abbr: "WD", name: "Wedding Industry", detail: "Wedding planners, venue stylists — custom colour and custom size programmes", market: "USA · Middle East · EU" },
  { abbr: "AL", name: "Airline Catering", detail: "In-flight and lounge service — precision dimensions to aircraft configuration", market: "UAE · UK · EU · SE Asia" },
  { abbr: "CD", name: "Corporate Dining", detail: "Executive dining rooms and corporate event spaces — branded linen programmes", market: "Worldwide" },
];

const CERTIFICATIONS = [
  { name: "OEKO-TEX", full: "Standard 100", desc: "No harmful substances — required by EU hotel groups", tier: "Standard" },
  { name: "BSCI", full: "Business Social Compliance", desc: "Ethical production audit — labour and worker welfare", tier: "Standard" },
  { name: "ISO 9001", full: "Quality Management", desc: "Consistent production quality and process control", tier: "Standard" },
  { name: "GOTS", full: "Global Organic Textile", desc: "Organic cotton sourcing — for premium green programmes", tier: "Optional" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Supply chain transparency platform compliance", tier: "Optional" },
  { name: "SA8000", full: "Social Accountability", desc: "Maximum social compliance — independently audited", tier: "Premium" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Share construction, dimensions, GSM, colour, decoration, quantity, destination and delivery date via our RFQ form." },
  { num: "02", title: "Factory Shortlisting", desc: "We evaluate 2–3 certified Pakistan weaving mills whose construction capability and capacity match your programme. Pricing within 3–5 business days." },
  { num: "03", title: "Sample Production", desc: "Pre-production samples produced to specification. 10–15 days from spec confirmation and fabric approval." },
  { num: "04", title: "Sample Approval", desc: "Review construction, colour, dimensions, decoration and finish before purchase order placement." },
  { num: "05", title: "Bulk Production", desc: "Cut and weave commences. Duration depends on construction complexity and programme volume." },
  { num: "06", title: "QC & Shipment", desc: "Pre-shipment inspection, finishing, packing and loading. FCL or LCL from Karachi or Port Qasim." },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", color: "bg-gold" },
  { stage: "Sample Production", days: "10–15", color: "bg-amber-500" },
  { stage: "Sample Approval", days: "5–10", color: "bg-blue-500" },
  { stage: "Bulk Production", days: "30–50", color: "bg-indigo-600" },
  { stage: "QC & Packing", days: "3–5", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "20–35", color: "bg-teal-500" },
];

const PACK_OPTIONS = [
  { label: "Individual Polybag", note: "Standard export pack" },
  { label: "Retail Box", note: "Gifting and retail-ready" },
  { label: "Zippered Pouch", note: "Storage and resale packs" },
  { label: "Bulk Carton", note: "Hotel / institution supply" },
];

const FAQS = [
  {
    q: "What fabric construction should I specify for a hotel banqueting programme?",
    a: "For formal hotel banqueting, cotton damask or jacquard weave at 220–280 GSM is the industry standard. The woven pattern provides visual distinction without applied decoration, and survives industrial laundering without degradation. For floor-length banquet presentation, specify a 76 cm drop (floor from standard 76 cm table height) in your custom dimension requirement.",
  },
  {
    q: "Can you produce table covers in our exact custom dimensions?",
    a: "Yes. Custom dimensions are standard practice for hospitality linen procurement. Include your required cut dimensions and drop length in the RFQ. Our standard manufacturing tolerance is ±2 cm on finished post-wash dimensions. For programmes spanning multiple table sizes, we can produce the full range within a single purchase order.",
  },
  {
    q: "What GSM is appropriate for event rental operations?",
    a: "Event rental operations typically specify 220–280 GSM poly-cotton for durability across hundreds of laundering cycles annually. The polyester content maintains dimensional stability and reduces ironing time — critical for rental operations turning over large inventory volumes. Satin weave at 200–250 GSM is the second most common specification for premium event rental programmes targeting weddings and gala events.",
  },
  {
    q: "Is wrinkle-resistant finish permanent?",
    a: "Wrinkle-resistant finish applied during manufacturing is durable but not permanent — it degrades gradually with repeated industrial laundering and high-temperature pressing. A typical performance life is 50–80 industrial wash cycles before noticeable reduction. Commercial laundry operators can re-treat fabric at intervals. For maximum laundering durability, poly-cotton construction provides inherent wrinkle resistance from the polyester fibre content without reliance on applied finish.",
  },
  {
    q: "What certifications do you supply for hotel group procurement?",
    a: "OEKO-TEX Standard 100 is standard across our table linen supply network — certifying the absence of restricted harmful substances, as required by EU hotel group procurement specifications. BSCI ethical production audit covers labour and worker welfare standards. ISO 9001 covers quality management systems. For hotel groups with organic commitments, GOTS certification is available on cotton programmes.",
  },
  {
    q: "Can you produce branded table covers with our hotel logo?",
    a: "Yes. Embroidered logos and monograms are available on all constructions — corner or edge placement with thread colour matched to your brand specification. For damask and jacquard constructions, logos or crests can be woven directly into the fabric repeat — the most durable branding method available. Reactive-printed designs are available on plain weave and poly-cotton constructions for more elaborate graphic programmes.",
  },
  {
    q: "Do you supply airline catering table and tray covers?",
    a: "Yes. Airline tray covers and seat-back table covers are produced to exact cut dimensions determined by aircraft configuration (typically A320, B737, A380 or widebody specifications). We can match existing airline specifications or develop new dimensions from your provided measurements. All chemistry and construction specifications are reviewed for compliance with airline procurement requirements prior to sampling.",
  },
  {
    q: "What is the indicative lead time from RFQ to delivery?",
    a: "Lead times are indicative and depend on construction, decoration, quantity and factory capacity. As a general guide: RFQ and pricing take 3–5 business days; sample production 10–15 days; bulk production 30–50 days from purchase order. For jacquard programmes with custom woven patterns, add 10–15 days for loom setup. Sea freight adds 20–35 days depending on destination. For hotel pre-opening programmes with fixed dates, we recommend 90 days from RFQ to delivery.",
  },
];

export default function TableCoversContent() {
  const [activeConstruction, setActiveConstruction] = useState("damask-jacquard");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-table-covers.webp" fill alt="Pakistan table cover manufacturer — custom damask and jacquard tablecloths for hotels, restaurants and events worldwide"
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
              <Link href="/hometextile/tablelinen/" className="hover:text-gold transition-colors">Table Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Table Covers</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Table Linen Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Table Cover
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              MZ Global Trading sources table covers from Pakistan&rsquo;s certified weaving mills. Cotton damask,
              jacquard, satin weave and poly-cotton easy-care. Custom rectangular, round and square dimensions.
              OEKO-TEX, BSCI certified. FOB / CIF export to hotels, restaurants and event companies worldwide.
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
                Request a Quote
                <span aria-hidden="true">&#8594;</span>
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

      {/* ═══════════════ STATS ANCHOR ═══════════════ */}
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
                Table Cover Supply — Pakistan Weaving
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Hospitality Linen Sourcing You Can Rely On
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s certified linen weaving mills supply international hotel groups, event companies
                and restaurant chains. Table cover programmes — any construction, any dimension, any certification —
                matched directly to verified factories.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "4", label: "Constructions" },
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

      {/* ═══════════════ BENTO GRID ═══════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bento 1 — Constructions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Luxury</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-amber-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.gsm}</p>
                    {c.badge && <span className="mt-1 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            {/* Bento 2 — Sizes */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Dimensions &amp; Sizes</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {SIZES.slice(0, 4).map((s) => (
                  <div key={s.code} className="bg-white rounded-xl px-4 py-2.5 border border-rose-100 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center justify-center shrink-0">{s.code}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.dim}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="Explore All Sizes" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">GSM Tiers</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {GSM_TIERS.map(g => (
                  <div key={g.gsm} className="flex items-start gap-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 shrink-0 mt-0.5">{g.gsm}</span>
                    <span className="text-xs text-gray-600 leading-tight">{g.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="GSM Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.07 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">PMS Range</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                {["White", "Ivory", "Navy", "Burgundy", "Black", "Sage", "Champagne", "Custom PMS"].map(c => (
                  <span key={c} className="bg-white text-navy-900 text-[10px] font-semibold px-2 py-0.5 rounded border border-purple-100">{c}</span>
                ))}
              </div>
              <ExploreBtn sectionId="section-colour" label="Colour Programme" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.14 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Treatment</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Finishes</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {FINISHES.map(f => (
                  <div key={f.name} className="flex items-start gap-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-700 shrink-0 mt-0.5 leading-tight">{f.tag.split(" ")[0]}</span>
                    <span className="text-xs text-gray-600 leading-tight">{f.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-finishes" label="Finish Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.21 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Branding</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Decoration</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {DECORATION_OPTIONS.map(d => (
                  <div key={d.method} className="flex items-start gap-2">
                    <span className="text-indigo-400 text-xs mt-0.5">✓</span>
                    <span className="text-xs text-gray-600 leading-tight">{d.method}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Decoration Detail" />
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Sectors We Supply</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="flex items-center gap-2">
                    <span className="w-8 text-center text-[9px] font-bold bg-green-100 text-green-700 rounded px-1 py-0.5">{s.abbr}</span>
                    <span className="text-xs text-gray-700 font-medium">{s.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sectors" label="Sector Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Compliance</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Certifications</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <span key={c.name} className="bg-white text-navy-900 text-[10px] font-semibold px-2 py-0.5 rounded border border-amber-100">{c.name}</span>
                ))}
              </div>
              <ExploreBtn sectionId="section-certifications" label="Cert Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.16 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Logistics</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Packing & Export</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((t) => (
                  <div key={t.term} className="flex items-center gap-2">
                    <span className="w-10 text-center font-bold text-xs text-orange-700 bg-orange-100 rounded px-1 py-0.5">{t.term}</span>
                    <span className="text-xs text-gray-600">{t.full}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-packing" label="Packing Options" />
            </motion.div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">⚙️</span>
                <div>
                  <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">OEM Programme</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Custom Specification</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {[
                  { title: "Custom Dimensions", note: "Any table size + drop length" },
                  { title: "Bespoke Colour", note: "Full PMS reactive dye range" },
                  { title: "Logo Embroidery", note: "Hotel crest or brand monogram" },
                  { title: "Certification Pack", note: "OEKO-TEX · ISO · BSCI · GOTS" },
                ].map((f) => (
                  <div key={f.title} className="bg-white rounded-xl p-3 border border-slate-100">
                    <p className="text-xs font-semibold text-navy-900 leading-tight">{f.title}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{f.note}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="OEM Programme" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">⏱️</span>
                <div>
                  <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Timeline</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Lead Times & Process</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {LEAD_STAGES.map((s, i) => (
                  <div key={s.stage} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full ${s.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-navy-900">{s.stage}</p>
                      <p className="text-[10px] text-gray-500">{s.days} days</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-process" label="Full Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ RESOURCES ROW ═══════════════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/table-linen-fabric-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Table Linen Fabric Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Damask, poly-cotton, linen and jacquard — construction, laundry performance and application comparison.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link href="/guides/sourcing-table-covers-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Sourcing Table Covers from Pakistan</p>
              <p className="text-xs text-gray-500 leading-relaxed">Hospitality grade, fire retardancy standards, sizes and custom programmes — step-by-step guide.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Guide →</span>
            </Link>
            <Link href="/downloads/table-cover-size-reference/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Table Cover Size Reference Chart</p>
              <p className="text-xs text-gray-500 leading-relaxed">Standard sizes for round, rectangular and banquet table covers — USA, UK/EU and Middle East formats.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Reference →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Table Covers?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, GSM, dimensions and decoration. RFQ to factory quotation: 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 1 — CONSTRUCTIONS (Luxury style) ═══════════════ */}
      <section id="section-constructions" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fabric Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Four Constructions for Every Setting</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-10">
              Construction selection determines presentation quality, laundering performance and cost-per-cycle. Select the construction matched to your service environment and laundering frequency.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {CONSTRUCTIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConstruction(c.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    activeConstruction === c.id
                      ? "bg-gold text-navy-900 border-gold"
                      : "bg-white text-navy-900 border-gray-200 hover:border-gold"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={ac.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-amber-50 border border-amber-100 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-navy-900">{ac.name}</h3>
                    {ac.badge && <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">{ac.badge}</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Weight</p><p className="font-semibold text-navy-900 text-sm">{ac.gsm}</p></div>
                    <div><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Best For</p><p className="font-semibold text-navy-900 text-sm">{ac.best}</p></div>
                  </div>
                  <p className="text-sm text-gray-500 italic border-l-2 border-amber-300 pl-4 mb-4">{ac.look}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed">{ac.detail}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════ SECTION 2 — GSM GUIDE (Minimalist) ═══════════════ */}
      <section id="section-gsm" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Reference</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">GSM Selection Guide</h2>
            <div className="space-y-6">
              {GSM_TIERS.map((tier, i) => (
                <motion.div
                  key={tier.gsm}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className={`bg-white rounded-2xl p-6 border border-gray-100 ${tier.pct > 60 ? "border-l-4 border-l-gold" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="shrink-0">
                      <span className="text-2xl font-bold text-navy-900">{tier.gsm}</span>
                      <span className="text-sm text-gray-500 ml-1">GSM</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900">{tier.name}</p>
                      <p className="text-xs text-gray-500">{tier.env}</p>
                    </div>
                    {tier.pct > 60 && <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full shrink-0">Industry Standard</span>}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                    <div className={`${tier.color} h-2 rounded-full transition-all`} style={{ width: `${tier.pct}%` }} />
                  </div>
                  <p className="text-sm text-gray-500">{tier.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════ SECTION 3 — SIZES (Art Deco) ═══════════════ */}
      <section id="section-sizes" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Dimensions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Standard &amp; Custom Sizes</h2>
            <p className="text-gray-500 text-sm mb-10 max-w-xl">All standard sizes are supplied with a 40 cm drop. Custom dimensions — including extended floor-length drop for banquet presentation — are produced to specification with ±2 cm tolerance on finished post-wash dimensions.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SIZES.map((s, i) => (
                <motion.div
                  key={s.code}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`rounded-2xl p-6 border ${s.code === "CX" ? "border-gold bg-gold/5" : "border-gray-100 bg-gray-50"}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-lg bg-[#0D1B2A] text-gold text-xs font-bold flex items-center justify-center shrink-0">{s.code}</span>
                    <p className="font-bold text-navy-900">{s.name}</p>
                  </div>
                  <p className="text-sm font-mono text-navy-900 mb-1">{s.dim}</p>
                  <p className="text-xs text-gray-500 mb-2">{s.drop}</p>
                  <p className="text-xs text-gray-500 italic">{s.use}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════ SECTION 4 — FINISHES (Material Design) ═══════════════ */}
      <section id="section-finishes" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Surface Treatments</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Finishing Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FINISHES.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-navy-900">{f.name}</h3>
                    <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full shrink-0 ml-2">{f.tag}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════ SECTION 5 — COLOUR (Geometric) ═══════════════ */}
      <section id="section-colour" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Programme</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Full PMS Colour Range</h2>
            <p className="text-gray-500 text-sm mb-10 max-w-2xl">Table covers are reactive dyed to full PMS specification. Lab dip samples produced for buyer approval before bulk production. Hospitality standard colours — white, ivory, navy, burgundy, black, sage, champagne — available at reduced lead times.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
              {[
                { color: "bg-white border-2 border-gray-200", name: "White" },
                { color: "bg-amber-50", name: "Ivory" },
                { color: "bg-stone-200", name: "Champagne" },
                { color: "bg-sage-200 bg-green-100", name: "Sage" },
                { color: "bg-slate-600", name: "Navy" },
                { color: "bg-rose-800", name: "Burgundy" },
                { color: "bg-gray-900", name: "Black" },
                { color: "bg-yellow-400", name: "Custom PMS" },
              ].map((sw) => (
                <div key={sw.name} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl ${sw.color} shadow-xs`} />
                  <p className="text-[11px] text-gray-500 text-center leading-tight">{sw.name}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-navy-900 mb-2">Lab Dip Approval Process</h3>
              <p className="text-sm text-gray-500">New PMS colours require lab dip sampling before bulk production. We produce 3–5 shade options bracketing the target PMS, submit for buyer approval, then proceed to bulk with the approved shade. ISO 105 X12 colour fastness tolerance is maintained across the production run. Yarn-dyed programmes (for stripe or colour-block table covers) have longer sampling lead times due to dye lot setup requirements.</p>
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════ SECTION 6 — DECORATION (Bauhaus) ═══════════════ */}
      <section id="section-decoration" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Branding Options</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Decoration Methods</h2>
            <div className="grid grid-cols-1 gap-4">
              {DECORATION_OPTIONS.map((d, i) => (
                <motion.div
                  key={d.method}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Method</p>
                    <p className="font-bold text-navy-900">{d.method}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Compatibility</p>
                    <p className="text-sm text-navy-900">{d.compatibility}</p>
                    <p className="text-xs text-teal-600 mt-1">{d.note}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Typical Use</p>
                    <p className="text-sm text-gray-500">{d.use}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════ SECTION 7 — SECTORS (Organic) ═══════════════ */}
      <section id="section-sectors" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Sectors</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Who We Supply</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SECTORS.map((s, i) => (
                <motion.div
                  key={s.abbr}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-green-50 border border-green-100 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-full bg-green-100 text-green-800 text-xs font-bold flex items-center justify-center shrink-0">{s.abbr}</span>
                    <p className="font-bold text-navy-900">{s.name}</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{s.detail}</p>
                  <p className="text-xs font-semibold text-green-700">{s.market}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════ SECTION 8 — CERTIFICATIONS (Command Center) ═══════════════ */}
      <section id="section-certifications" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality Standards</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Certifications &amp; Compliance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="border border-white/10 rounded-2xl p-6 bg-white/5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gold font-bold text-lg">{cert.name}</p>
                      <p className="text-xs text-gray-500">{cert.full}</p>
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                      cert.tier === "Premium" ? "text-gold bg-gold/20" : cert.tier === "Standard" ? "text-green-400 bg-green-400/10" : "text-gray-500 bg-white/5"
                    }`}>{cert.tier}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════════════ SECTION 9 — PACKING (Layered Card) ═══════════════ */}
      <section id="section-packing" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Packing Options</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Pack Formats for Every Channel</h2>
            <div className="relative">
              <div className="space-y-4">
                {PACK_OPTIONS.map((p, i) => (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex items-center gap-5"
                    style={{ marginLeft: `${i * 16}px` }}
                  >
                    <span className="w-10 h-10 rounded-xl bg-[#0D1B2A] text-gold text-xs font-bold flex items-center justify-center shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-bold text-navy-900">{p.label}</p>
                      <p className="text-xs text-gray-500">{p.note}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════ SECTION 10 — EXPORT TERMS (Industrial) ═══════════════ */}
      <section id="section-export" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Trade Terms</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Export &amp; Incoterm Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {EXPORT_TERMS.map((t, i) => (
                <motion.div
                  key={t.term}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-white border-l-4 border-l-navy-900 border border-gray-100 rounded-r-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl font-black text-navy-900">{t.term}</span>
                    <span className="text-xs text-gray-500">{t.full}</span>
                  </div>
                  <p className="text-xs text-gold font-medium mb-2">{t.port}</p>
                  <p className="text-sm text-gray-500">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════ SECTION 11 — OEM & CUSTOM (Scientific) ═══════════════ */}
      <section id="section-oem" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Custom Development</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">OEM Programme Capabilities</h2>
            <p className="text-gray-500 text-sm mb-10 max-w-2xl">Every element of a table cover programme is configurable to buyer specification. Construction, weight, dimensions, colour, decoration, finish and packing — all developed to brief before bulk production commences.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { num: "01", title: "Custom Dimensions", desc: "Any rectangular, round or square size with custom drop length. Pre-shrunk and supplied to post-wash stable dimensions." },
                { num: "02", title: "PMS Colour Matching", desc: "Lab dip sampling to full PMS specification before bulk. ISO 105 X12 fastness maintained across production run." },
                { num: "03", title: "Woven Branding", desc: "Hotel crests and motifs woven directly into damask and jacquard structure — no applied decoration." },
                { num: "04", title: "Embroidery Programme", desc: "Logo or monogram at corner, edge or centre. Thread colour to brand specification." },
                { num: "05", title: "Custom Finishes", desc: "Wrinkle resistant, stain repellent or combined treatment to specification and laundering frequency." },
                { num: "06", title: "Retail Packing", desc: "Poly pack, retail box, zippered pouch or institutional carton — configured to your distribution channel." },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6"
                >
                  <p className="text-3xl font-black text-gray-100 mb-3">{item.num}</p>
                  <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════ SECTION 12 — PROCESS (Typography-First) ═══════════════ */}
      <section id="section-process" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">From RFQ to Delivery</h2>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-10 flex items-start gap-3">
              <span className="text-amber-500 text-lg shrink-0" aria-hidden="true">⚠</span>
              <p className="text-sm text-amber-800">All lead times below are <strong>indicative only</strong> and subject to construction, programme size, factory scheduling and material availability. Confirm exact timelines with your sourcing specialist.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6"
                >
                  <p className="text-4xl font-black text-gray-100 mb-3">{step.num}</p>
                  <h3 className="font-bold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-navy-900 mb-4">Indicative Timeline Breakdown</h3>
              <div className="space-y-3">
                {LEAD_STAGES.map((stage) => (
                  <div key={stage.stage} className="flex items-center gap-4">
                    <div className={`${stage.color} rounded-full h-2.5 shrink-0`} style={{ width: `${Math.min(parseInt(stage.days) * 2, 120)}px` }} />
                    <p className="text-sm text-navy-900 font-medium shrink-0">{stage.stage}</p>
                    <p className="text-xs text-gray-500 ml-auto shrink-0">{stage.days} days</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section id="section-faq" className="bg-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="border border-gray-100 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    aria-expanded={faqOpen === i}
                  >
                    <span className="font-semibold text-navy-900 pr-4">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: faqOpen === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gold text-xl shrink-0"
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Home Textile Range</p>
            <h2 className="text-2xl font-bold text-navy-900">More Home Textile Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Kitchen Linen", desc: "Kitchen towels, bar mops, aprons and pot holders for commercial and retail buyers.", href: "/hometextile/kitchenlinen/", img: "/images/hero/hero-kitchen-linen.webp", alt: "Pakistan kitchen linen manufacturer — OEM kitchen towels, bar mops and aprons for hospitality buyers" },
              { name: "Bath Linen", desc: "Towels, bathrobes, bath mats and beach towels. GOTS and OEKO-TEX certified.", href: "/hometextile/bathlinen/", img: "/images/hero/hero-bath-linen.webp", alt: "Pakistan bath linen manufacturer — OEM GOTS certified towels and bathrobes for international buyers" },
              { name: "Bed Linen", desc: "Bedsheets, duvet covers, pillow covers and curtains in any thread count.", href: "/hometextile/bedlinen/", img: "/images/hero/hero-bed-linen.webp", alt: "Pakistan bed linen manufacturer — OEM bedsheets and duvet covers for hotel and retail buyers worldwide" },
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

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-snug">
              Source Table Covers from Pakistan&rsquo;s Certified Mills
            </h2>
            <p className="text-gray-300 text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Share your construction, dimensions, colour, quantity and required delivery. We identify the right
              certified Pakistan weaving mill and return a competitive quote within 3&ndash;5 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base"
              >
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
