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
            : "border-2 border-gold text-navy-900 hover:bg-gold shadow-xs"
        }`}
        style={{
          boxShadow: dark
            ? "0 0 0 0 rgba(212,160,23,0.4)"
            : "0 0 0 0 rgba(212,160,23,0.3)",
          animation: "btt-pulse 2.2s ease-out infinite",
        }}
      >
        {/* Pulsing dot */}
        <span
          className="relative flex h-2 w-2 shrink-0"
          aria-hidden="true"
        >
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          aria-hidden="true"
        >
          ↑
        </motion.span>
        Move back to top
      </button>
      <style>{`
        @keyframes btt-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(212,160,23,0.45); }
          70%  { box-shadow: 0 0 0 10px rgba(212,160,23,0); }
          100% { box-shadow: 0 0 0 0 rgba(212,160,23,0); }
        }
      `}</style>
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
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">
        →
      </span>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  {
    id: "single-jersey",
    name: "Single Jersey",
    badge: "Most Popular",
    gsm: "160–200 GSM",
    hand: "Smooth face, natural 4-way stretch, fine texture",
    best: ["Fashion Retail", "Streetwear", "Warm-Climate Markets"],
    markets: ["USA", "EU", "Australia", "Middle East"],
    decorations: ["Screen Print", "Embroidery", "DTG", "Heat Transfer"],
    detail:
      "Single jersey is the industry-standard construction for casual and fashion henleys. The smooth face provides excellent print registration for screen printing and DTG, while the natural 4-way stretch gives comfortable wear. Combed and ring-spun options produce tighter surface texture with improved print fidelity. Available in full PMS-matched colour range with reactive dyeing.",
    spec: "100% combed cotton or cotton/polyester blend. GSM 160–200. Reactive dyed. Anti-shrink / compacted finish available. GOTS and OEKO-TEX Standard 100 options.",
  },
  {
    id: "waffle-knit",
    name: "Waffle Knit",
    badge: "Winter Specialist",
    gsm: "180–240 GSM",
    hand: "Distinctive grid texture — traps warmth without bulk",
    best: ["Winter Retail", "USA Workwear", "Outdoor Brands"],
    markets: ["USA", "Canada", "UK", "N. Europe"],
    decorations: ["Embroidery", "Screen Print (soft-hand)"],
    detail:
      "Waffle knit defines the classic American thermal henley. The grid cell structure traps insulating air pockets delivering warmth at lower GSM than flat constructions. Embroidery is the preferred decoration — the structured texture provides a firm base for stitch registration. Screen printing requires soft-hand inks at reduced squeegee pressure to preserve cell definition.",
    spec: "100% cotton or cotton-polyester blend. Grid cell depth 3–5 mm. GSM 180–240. Embroidery recommended; screen print with soft-hand inks only.",
  },
  {
    id: "rib-1x1",
    name: "Rib (1×1)",
    badge: "",
    gsm: "200–260 GSM",
    hand: "Strong vertical ribbing, close fit, excellent stretch recovery",
    best: ["Athletic & Performance", "Contemporary Menswear", "Premium Basics"],
    markets: ["USA", "UK", "EU"],
    decorations: ["Embroidery", "Screen Print"],
    detail:
      "1×1 rib knit henleys fit closer to the body with natural vertical ribbing and exceptional stretch and recovery. Higher GSM provides a premium, structured feel — heavier in hand than the GSM suggests due to the compressed knit structure. Increasingly popular in contemporary menswear premium basics and athletic leisure programmes.",
    spec: "100% cotton ring-spun or cotton/elastane (5%). GSM 200–260. Excellent recovery. Flat-lock seam option available.",
  },
  {
    id: "french-terry",
    name: "French Terry",
    badge: "",
    gsm: "240–320 GSM",
    hand: "Smooth exterior, looped interior — heavier seasonal layering",
    best: ["A/W Retail", "Premium Basics", "Layering Collections"],
    markets: ["USA", "UK", "EU"],
    decorations: ["Screen Print", "Embroidery", "Heat Transfer"],
    detail:
      "French terry henley shirts occupy a heavier seasonal position — A/W collection staples or year-round basics in colder climates. The smooth exterior face provides a refined appearance equivalent to jersey, while the looped interior adds insulation and a plush premium feel. Enzyme-washed and garment-dyed finishes are popular in USA premium streetwear.",
    spec: "100% combed cotton or 80/20 cotton-polyester. GSM 240–320. Enzyme wash and garment dye finishes available. Anti-pill finish option.",
  },
];

const FIT_PROFILES = [
  { code: "REG", name: "Regular Fit", ease: "+10–12 cm chest ease", market: "Menswear retail, workwear, USA mainstream" },
  { code: "SLM", name: "Slim Fit", ease: "+6–8 cm chest ease", market: "Fashion retail, contemporary menswear, UK/EU" },
  { code: "OVR", name: "Oversized / Relaxed", ease: "+18–24 cm chest ease", market: "Streetwear, youth fashion, EU contemporary" },
  { code: "ATH", name: "Athletic", ease: "Wide shoulder, tapered waist", market: "Gym brands, athleisure, performance retail" },
];

const GSM_TIERS = [
  {
    gsm: "160–170",
    name: "Lightweight",
    season: "Spring / Summer",
    market: "SE Asia · Australia · Middle East · South America",
    pct: 30,
    featured: false,
    desc: "Ideal for spring/summer and warm-climate markets. Lighter drape, faster drying. Most commonly ordered in single jersey construction.",
    color: "bg-sky-300",
  },
  {
    gsm: "170–200",
    name: "Standard",
    season: "Year-Round",
    market: "USA · UK · EU retail baseline",
    pct: 75,
    featured: true,
    desc: "Industry standard for year-round retail programmes. Balances weight, drape and decoration receptivity. Covers the majority of orders across all markets.",
    color: "bg-gold",
  },
  {
    gsm: "200–240+",
    name: "Heavyweight",
    season: "Autumn / Winter",
    market: "USA workwear · Canada · N. Europe",
    pct: 50,
    featured: false,
    desc: "Waffle knit and rib at this weight deliver thermal warmth. Required for USA workwear underlayers, Canadian cold-climate markets and Northern European winter retail.",
    color: "bg-sky-500",
  },
];

const DECO_METHODS = [
  { code: "SCR", method: "Screen Print", best: "Multi-colour graphics, brand artwork, fashion programmes", compat: ["Single Jersey", "French Terry"], note: "Soft-hand inks required for waffle knit" },
  { code: "EMB", method: "Embroidery", best: "Logo marks, chest and sleeve placement — all constructions", compat: ["All Constructions"], note: "Recommended default for waffle knit" },
  { code: "DTG", method: "Digital / DTG", best: "Photo-quality imagery, small runs — single jersey only", compat: ["Single Jersey"], note: "Not suitable for textured constructions" },
  { code: "HT", method: "Heat Transfer", best: "Clean edges, sport and athleisure — jersey and rib", compat: ["Single Jersey", "Rib (1×1)"], note: "Not recommended for waffle knit" },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Standard / PMS Matched", note: "Full PMS colour range. Lab dip approval before bulk production.", swatches: ["bg-red-400", "bg-blue-500", "bg-emerald-500", "bg-yellow-400", "bg-purple-500"] },
  { name: "Yarn-Dyed", subtitle: "Stripe & Colour-Block", note: "Contrast placket designs available. Higher minimum quantities, longer lead times.", swatches: ["bg-slate-700", "bg-red-600", "bg-amber-500", "bg-teal-500", "bg-slate-400"] },
  { name: "Garment Dye", subtitle: "Vintage / Washed Tones", note: "Popular in USA premium streetwear. Organic cotton compatible.", swatches: ["bg-stone-300", "bg-stone-400", "bg-stone-500", "bg-stone-600", "bg-slate-500"] },
  { name: "Organic / Low-Impact", subtitle: "GOTS Certified", note: "OEKO-TEX certified chemicals only. No harmful substances.", swatches: ["bg-green-200", "bg-green-400", "bg-emerald-300", "bg-lime-300", "bg-teal-300"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic fibre sourcing and processing — required for organic cotton claims", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances in finished product — EU/UK import standard", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — labour standards and worker welfare verified", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data sharing platform", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control certification", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled content verification for polyester blend programmes", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance certification", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Improved cotton farming practices and sustainability metrics", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "The most demanding social certification — worker rights, wages and safe conditions independently audited", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency across the entire textile supply chain", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Custom Fabric Construction", desc: "Specify construction, GSM, fibre blend — sourced to exact specification from certified Pakistan factories." },
  { num: "02", title: "PMS Colour Programme", desc: "Lab dip sampling for buyer approval before bulk. ISO 105 X12 tolerance maintained across production run." },
  { num: "03", title: "Placket Configuration", desc: "Rib-knit, woven, or self-fabric placket in 2, 3 or 4-button configurations. Custom button colour and size." },
  { num: "04", title: "Label & Packaging", desc: "Woven neck labels, care labels, hang tags, hem labels — all to your brand specification." },
  { num: "05", title: "Decoration Programme", desc: "Screen print, embroidery, DTG and heat transfer managed to your approved artwork and brand guidelines." },
  { num: "06", title: "Retail Packaging", desc: "Polybag, board fold, hanger, gift box — tailored to your retail and e-commerce fulfilment requirements." },
];

const SECTORS = [
  { abbr: "FA", name: "Fashion Retail", detail: "USA, UK, EU chains and independent brands seeking OEM production", market: "USA · UK · EU" },
  { abbr: "EC", name: "E-commerce / DTC", detail: "Direct-to-consumer brands and online-first retailers", market: "Global" },
  { abbr: "OA", name: "Outdoor / Adventure", detail: "Thermal and technical layering programmes for outdoor brands", market: "USA · Canada · N. EU" },
  { abbr: "CG", name: "Corporate Gifting", detail: "Branded corporate apparel, staff uniforms and gifting programmes", market: "Worldwide" },
  { abbr: "AT", name: "Athletic & Gym", detail: "Athleisure and performance retail — rib and jersey henley variants", market: "USA · UK · Australia" },
  { abbr: "WS", name: "Wholesale Dist.", detail: "Multi-brand wholesale distributors supplying regional retail networks", market: "USA · EU · Middle East" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading only." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance. Price includes delivery to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight to your port. Buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all inland and ocean logistics from factory gate. Lowest quoted price, highest buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard bulk export" },
  { icon: "🪝", label: "Hanger + Polybag", note: "Retail-ready on arrival" },
  { icon: "🗂️", label: "Board Fold (Retail)", note: "In-store presentation" },
  { icon: "🎁", label: "Gift Box", note: "Premium / gifting packs" },
  { icon: "🔒", label: "Vacuum Packed", note: "Space-efficient shipping" },
  { icon: "✏️", label: "Custom Packaging", note: "To your brand brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory shortlist, pricing and availability confirmed", color: "bg-gold" },
  { stage: "Sample Production", days: "15–20", desc: "Pre-production samples produced to specification", color: "bg-blue-500" },
  { stage: "Bulk Production", days: "45–70", desc: "From confirmed PO and approved sample", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection before vessel loading", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "20–30", desc: "FCL/LCL from Karachi or Port Qasim", color: "bg-teal-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton across all four constructions. Fully traceable from farm to finished garment.", tag: "GOTS" },
  { icon: "💧", title: "Water Efficiency", desc: "Enzyme washing replaces stone washing — significantly lower water consumption and zero stone dust waste.", tag: "Process" },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester blends available on request for performance and blended programmes.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited factories. Worker welfare, safety and fair wage compliance verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "Reactive dyeing with OEKO-TEX certified chemicals only. No azo dyes, no restricted substances.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags, FSC-certified paper hangtags and boxes available on request for any programme.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction, GSM, fit, decoration, quantity, destination and target delivery date via our RFQ form." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We evaluate and shortlist 2–3 Pakistan factories whose certifications, construction specialisation and capacity match your henley programme. Pricing within 3–5 days." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Pre-production samples produced to your specification. 15–20 days from spec lock and fabric approval." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review construction, colour, decoration, label and fit. Revise as required before purchase order placement." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Fabric cut, production commences. Duration depends on construction, quantity and factory scheduling." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection, packing and loading. FCL or LCL from Karachi or Port Qasim." },
];

const FAQS = [
  { q: "What GSM should I order for a retail henley shirt?", a: "For year-round retail programmes, 170–200 GSM is the industry standard. Lighter 160–170 GSM suits spring/summer and warmer-climate markets — SE Asia, Australia, Middle East. For thermal or winter programmes targeting USA, Canada and Northern Europe, 200–240 GSM in waffle knit or rib delivers the expected warmth-to-weight ratio." },
  { q: "What distinguishes a henley from a crew neck in production terms?", a: "A henley requires a placket panel at the front neckline — typically 15–20 cm — with 2–4 buttons. This adds a cutting and sewing operation versus a standard crew neck. Plackets can be rib-knit, woven, or self-fabric matching the body construction." },
  { q: "Can I get OEKO-TEX certified henley shirts from Pakistan?", a: "Yes. Pakistan's major knitwear factories carry OEKO-TEX Standard 100 across all standard constructions. GOTS certification is available for 100% organic cotton variants. For EU and UK buyers where chemical compliance is scrutinised at import, we recommend specifying OEKO-TEX as a hard requirement in your RFQ." },
  { q: "How do I plan my order quantity for a henley programme?", a: "Order quantities vary significantly depending on fabric construction, colour programme, factory scheduling and seasonal demand — there is no single universal figure. The best approach is to include your target quantity in your RFQ. We match you with factories whose capacity aligns with your programme size and can advise on the most cost-efficient quantity structure." },
  { q: "Which construction is best for a thermal or winter programme?", a: "Waffle knit is the primary construction for thermal programmes. The grid cell structure traps air, providing warmth without bulk — this is the classic US workwear thermal layer. Rib (1×1) is the secondary option: closer fit with natural stretch and recovery. French terry at 240–280 GSM bridges casual and performance positioning." },
  { q: "What decorations work on waffle knit henley shirts?", a: "Embroidery works best — the structured texture provides a firm base for stitch registration. Screen printing is possible with soft-hand inks and reduced squeegee pressure. Heat transfer vinyl is not recommended. DTG is not suitable for waffle constructions." },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function HenleyContent() {
  const [activeConstruction, setActiveConstruction] = useState("single-jersey");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* ════════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-henley-shirts.webp"
            fill
            alt="Pakistan henley shirt manufacturer — OEM knitted henley shirts for brands in USA, UK and Europe"
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
              <Link href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/apparel/knittedgarments/" className="hover:text-gold transition-colors">Knitted Garments</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Henley Shirts</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Knitwear Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Henley Shirt
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
              MZ Global Trading connects international brands with
              Pakistan&rsquo;s certified knitwear factories. Single jersey,
              waffle knit, rib and French terry henley shirts. 160&ndash;320
              GSM. GOTS, OEKO-TEX, BSCI certified. FOB / CIF export.
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

      {/* ════════════════════════════════════════════════════════════════════════
          STATS ANCHOR — full-width horizontal card
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            {/* Left: label + heading + description */}
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Henley Shirt Supply — Pakistan Knitwear
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Henley Shirt Sourcing Excellence You Can Trust
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s midweight knitwear output runs through the same certified mill infrastructure that supplies leading US and European brands. Henley shirt programmes — any construction, any GSM, any certification — placed directly with verified factories.
              </p>
            </div>
            {/* Right: stats row */}
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
            {/* CTA */}
            <Link
              href="/rfq/"
              className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit"
            >
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
            <p className="text-gray-500 mt-3 max-w-lg text-sm">
              Click any card to jump to the full detailed section.
            </p>
          </div>

          {/* ── ROW 1: 2 bentos (large, equal) — Constructions + Fits ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* Bento 1 — Fabric Constructions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Technical</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-indigo-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.gsm}</p>
                    <p className="text-xs text-indigo-600 mt-1 leading-tight">{c.best[0]}</p>
                    {c.badge && (
                      <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                        {c.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            {/* Bento 2 — Fit Profiles */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fit Profiles &amp; Sizing</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {FIT_PROFILES.map((f) => (
                  <div key={f.code} className="bg-white rounded-xl px-4 py-3 border border-amber-100 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {f.code}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{f.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{f.ease}</p>
                      <p className="text-xs text-amber-600 mt-0.5">{f.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-fits" label="Explore Fit Profiles" />
            </motion.div>
          </div>

          {/* ── ROW 2: 4 bentos (compact, equal) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            {/* Bento 3 — GSM Weight Guide */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Selection</h3>
              <div className="flex flex-col gap-3 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-xl p-3 border border-sky-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-navy-900">{t.gsm}</span>
                      {t.featured && (
                        <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>
                      )}
                    </div>
                    <div className="w-full h-1.5 bg-sky-100 rounded-full overflow-hidden mb-1.5">
                      <div
                        className={`h-full rounded-full ${t.color}`}
                        style={{ width: `${t.pct}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-[10px] font-semibold text-sky-600">{t.season}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{t.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View Weight Guide" />
            </motion.div>

            {/* Bento 4 — Decoration Methods */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🖨️</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Decoration Methods</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-purple-50">
                    <span className="w-6 h-6 rounded bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {d.code}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{d.compat.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decorations" />
            </motion.div>

            {/* Bento 5 — Colour Programs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-3 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-3 border border-rose-50">
                    <p className="text-xs font-semibold text-navy-900 mb-1.5">{d.name}</p>
                    <div className="flex gap-1.5 mb-1">
                      {d.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${s}`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-500">{d.subtitle}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colors" label="Explore Colors" />
            </motion.div>

            {/* Bento 6 — OEM & Custom */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM &amp; Custom Programs</h3>
              <div className="flex flex-col gap-2 flex-1">
                {OEM_FEATURES.slice(0, 5).map((f) => (
                  <div key={f.num} className="flex items-start gap-2">
                    <span className="text-gold text-xs font-bold mt-0.5 shrink-0">{f.num}</span>
                    <p className="text-xs text-gray-600 leading-snug">{f.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore OEM" />
            </motion.div>
          </div>

          {/* ── ROW 3: 3 bentos (5-col: 2+2+1) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

            {/* Bento 7 — Industry Applications */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-xs font-bold text-teal-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Markets" />
            </motion.div>

            {/* Bento 8 — Certifications (with logos) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Quality Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div
                    key={c.name}
                    className="bg-white rounded-xl border border-green-100 flex items-center justify-center p-2"
                    style={{ height: 56 }}
                  >
                    <Image
                      src={c.img}
                      alt={`${c.name} — ${c.full}`}
                      width={72}
                      height={44}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            {/* Bento 9 — Export & Logistics */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-orange-100">
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {e.term}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{e.full}</p>
                      <p className="text-[10px] text-gray-500">{e.port}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* ── ROW 4: 2 bentos (3-col: 2+1) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Bento 10 — Sustainability */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌿</span>
                <div>
                  <p className="text-lime-700 text-xs font-semibold tracking-[0.2em] uppercase">Ethics</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Sustainable Sourcing</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {SUSTAINABILITY_ITEMS.map((s) => (
                  <div key={s.title} className="bg-white rounded-xl p-3 border border-lime-100 flex flex-col gap-1">
                    <span className="text-base" aria-hidden="true">{s.icon}</span>
                    <p className="text-sm font-semibold text-navy-900">{s.title}</p>
                    <span className="text-[10px] font-semibold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full w-fit">
                      {s.tag}
                    </span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            {/* Bento 11 — Sourcing Process */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-fuchsia-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-fuchsia-200 text-fuchsia-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {p.num}
                    </span>
                    <p className="text-xs font-semibold text-navy-900">{p.short}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-500 mt-1 pl-8">+ 2 more steps</p>
              </div>
              <ExploreBtn sectionId="section-process" label="View Our Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          ROW 5 — RESOURCES
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Explore Our Guides &amp; Resources
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/henley-shirt-construction-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Henley Shirt Construction Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Placket styles, button options and fabric weight guide for international buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link href="/guides/sourcing-henley-shirts-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Sourcing Henley Shirts Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">OEM, seasonal collections, lead times and certification requirements.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guide →</span>
            </Link>
            <Link href="/downloads/henley-shirt-measurement-sheet/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Henley Shirt Measurement Sheet</p>
              <p className="text-xs text-gray-500 leading-relaxed">Size chart and measurement template for henley shirt sourcing.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Template →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Henley Shirts?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, GSM and fit confirmed — RFQ takes 3 minutes. Factory match and quotation returned within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — FABRIC CONSTRUCTIONS — TECHNICAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-[#080E1A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-12">
            <div className="w-px h-16 bg-gold/40 mt-1 hidden sm:block" aria-hidden="true" />
            <div>
              <p className="font-mono text-gold/70 text-xs tracking-[0.3em] uppercase mb-2">
                [TECHNICAL SPECIFICATION — KNITTED CONSTRUCTIONS]
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Fabric Constructions</h2>
              <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
                Every henley shirt specification starts with fabric construction. Each build has distinct hand-feel, GSM range, market positioning and decoration compatibility.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeConstruction === c.id}
                onClick={() => setActiveConstruction(c.id)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeConstruction === c.id
                    ? "bg-gold text-navy-900 border-gold"
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-gold/40"
                }`}
              >
                {activeConstruction !== c.id && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                  </span>
                )}
                {c.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeConstruction}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-white">{ac.name}</h3>
                  {ac.badge && (
                    <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
                      {ac.badge}
                    </span>
                  )}
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
                    {ac.best.map((b) => (
                      <span key={b} className="text-xs text-white bg-white/10 px-3 py-1 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">KEY_MARKETS[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => (
                      <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">DECORATION[ ]</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.decorations.map((d) => (
                      <div key={d} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-300">{d}</span>
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

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — FIT PROFILES — EDITORIAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-fits" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-4">
                No. 02 / Fit &amp; Sizing
              </p>
              <h2 className="text-5xl sm:text-6xl font-bold text-navy-900 leading-[1] mb-8">
                Four<br />Silhouettes
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-8" aria-hidden="true" />
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
                Fit selection is the single most important commercial decision in a henley programme. Each silhouette targets a distinct market position and buyer demographic.
              </p>
              <blockquote className="border-l-4 border-gold pl-6 text-xl font-medium text-navy-900 italic leading-relaxed">
                &ldquo;The same 180 GSM single jersey henley sells as workwear in Regular Fit and as premium streetwear in Oversized — construction stays the same, silhouette changes the story.&rdquo;
              </blockquote>
            </div>
            <div className="flex flex-col gap-0 divide-y divide-gray-100">
              {FIT_PROFILES.map((f, i) => (
                <motion.div
                  key={f.code}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="py-6 flex gap-6 items-start"
                >
                  <div className="shrink-0 text-right w-14">
                    <p className="text-5xl font-bold leading-none text-gray-100">0{i + 1}</p>
                    <p className="text-xs font-bold text-gold mt-1">{f.code}</p>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-navy-900 mb-1">{f.name}</h3>
                    <p className="text-sm text-gold font-semibold mb-2">{f.ease}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.market}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-3 gap-8 text-center">
            {[["XS–3XL", "Standard size range"], ["US / UK / EU", "Size standards available"], ["Custom", "Size spec on request"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-3xl font-bold text-navy-900">{val}</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — GSM WEIGHT GUIDE — DASHBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-gsm" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Guide</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Choosing the Right GSM</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            GSM determines season positioning, drape, decoration receptivity and retail price tier.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "GSM Range", val: "160–320", sub: "Full construction range" },
              { label: "Most Ordered", val: "170–200", sub: "Standard year-round" },
              { label: "Thermal Min.", val: "200 GSM", sub: "For winter positioning" },
              { label: "Constructions", val: "4", sub: "Jersey to French terry" },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-navy-900">{m.val}</p>
                <p className="text-xs text-gray-500 mt-1">{m.sub}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {GSM_TIERS.map((tier) => (
              <div key={tier.gsm} className={`bg-white rounded-2xl p-7 border-2 ${tier.featured ? "border-gold shadow-lg" : "border-gray-100 shadow-xs"}`}>
                {tier.featured && (
                  <span className="inline-block mb-3 text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Ordered
                  </span>
                )}
                <p className={`text-3xl font-bold mb-1 ${tier.featured ? "text-gold" : "text-navy-900"}`}>{tier.gsm}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{tier.name}</p>
                <p className="text-sm font-semibold text-navy-900 mb-3">{tier.season}</p>
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${tier.featured ? "bg-gold" : "bg-navy-900/30"}`}
                      style={{ width: `${tier.pct}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{tier.pct}% of orders</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tier.desc}</p>
                <p className="text-xs text-gold font-semibold mt-3">{tier.market}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — DECORATION — MOODBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-decoration" className="bg-[#FAF9F7] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Decoration</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Decoration Methods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DECO_METHODS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                style={{ transform: `rotate(${["-1deg", "0.8deg", "-0.6deg", "1.1deg"][i]})` }}
                className="bg-white rounded-2xl p-7 shadow-md border border-gray-100 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">{d.code}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">{d.method}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{d.best}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Compatible with</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.compat.map((c) => (
                      <span key={c} className="text-[11px] bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                  {d.note}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 bg-navy-900 rounded-2xl p-8 text-white grid sm:grid-cols-3 gap-8">
            {[
              ["Chest Placement", "Primary placement — left chest or centre chest logo"],
              ["Sleeve Placement", "Left or right sleeve — brand mark or sport stripe"],
              ["Back Placement", "Full back, upper back or nape — large-format artwork"],
            ].map(([place, desc]) => (
              <div key={place}>
                <p className="text-gold text-sm font-bold mb-1">{place}</p>
                <p className="text-gray-300 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOURS — GRADIENT UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-colors" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-[#0D1B2A]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Colour Programs</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">
            Every standard construction is available in full PMS colour matching. Lab dip approval is submitted before bulk production begins.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-2">
                  {d.swatches.map((s, idx) => (
                    <div key={idx} className={`w-7 h-7 rounded-full border-2 border-white/20 ${s}`} aria-hidden="true" />
                  ))}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{d.name}</h3>
                  <p className="text-xs text-white/50 mt-0.5">{d.subtitle}</p>
                </div>
                <p className="text-sm text-white/70 leading-relaxed flex-1">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
            {["bg-red-500","bg-blue-600","bg-emerald-500","bg-amber-400","bg-purple-600","bg-rose-500","bg-teal-500","bg-indigo-500","bg-orange-500","bg-sky-400","bg-lime-500","bg-slate-600"].map((c, i) => (
              <div key={i} className={`h-10 rounded-xl ${c} opacity-90`} aria-hidden="true" />
            ))}
          </div>
          <p className="text-white/40 text-xs mt-3 text-center">
            Illustrative palette — full PMS range available via reactive dyeing
          </p>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM & CUSTOMISATION — CORPORATE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM &amp; Custom</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Custom Development Programs</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every aspect of your henley shirt programme can be specified to your brand requirements. From fabric construction through to retail packaging, we manage to your specification.
              </p>
              <Link
                href="/rfq/"
                className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-800 transition-colors"
              >
                Start Your Programme <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OEM_FEATURES.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="border border-gray-100 rounded-2xl p-6 hover:border-gold hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">
                      {f.num}
                    </span>
                    <h3 className="text-sm font-bold text-navy-900">{f.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKETS — ISOMETRIC UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-slate-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Markets</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Industry Applications</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            Henley shirts are ordered across fashion, workwear, outdoor and corporate segments. Each sector has distinct specification requirements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                whileHover={{ scale: 1.03, rotateX: -4, rotateY: 4 }}
                style={{ transformStyle: "preserve-3d" }}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-7 flex flex-col gap-4 cursor-default"
              >
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gold/20 border border-gold/30 flex items-center justify-center">
                    <span className="text-gold text-lg font-bold">{s.abbr}</span>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-700 px-2.5 py-1 rounded-full">{s.market}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{s.name}</h3>
                  <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{s.detail}</p>
                </div>
                <div className="w-8 h-0.5 bg-gold/40 mt-auto" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[["USA / Canada", "Primary Market"], ["UK / Europe", "Key Market"], ["Middle East", "Growing Market"], ["Australia / Asia", "Emerging Market"]].map(([region, tier]) => (
              <div key={region} className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
                <p className="text-white font-semibold text-sm">{region}</p>
                <p className="text-gold text-xs mt-1">{tier}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS — INFOGRAPHIC UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Certifications Available</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Pakistan&rsquo;s certified knitwear factories carry internationally recognised certifications. Specify your required standard in your RFQ.
          </p>
          <div className="bg-navy-900 rounded-2xl p-8 mb-8 flex flex-col sm:flex-row gap-8 items-center">
            <div className="text-center sm:text-left shrink-0">
              <p className="text-6xl font-bold text-gold">10+</p>
              <p className="text-white text-sm mt-1">Certifications Available</p>
            </div>
            <div className="w-px h-16 bg-white/10 hidden sm:block" aria-hidden="true" />
            <p className="text-gray-300 text-sm leading-relaxed">
              GOTS for organic cotton, OEKO-TEX Standard 100 for chemical compliance, BSCI and Sedex for social responsibility, ISO 9001 for quality systems. Specify required certifications in your RFQ — factory matching is aligned to your compliance needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border border-gray-100 rounded-2xl p-6 flex flex-col gap-3 hover:border-gold hover:shadow-xs transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  {/* Cert logo */}
                  <div
                    className="rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center p-2 shrink-0"
                    style={{ width: 72, height: 52 }}
                  >
                    <Image
                      src={c.img}
                      alt={`${c.name} — ${c.full}`}
                      width={64}
                      height={44}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                    c.tier === "Premium" ? "bg-gold/15 text-gold" : c.tier === "Optional" ? "bg-gray-100 text-gray-500" : "bg-green-50 text-green-700"
                  }`}>
                    {c.tier}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-navy-900">{c.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{c.full}</p>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — EXPORT & PACKAGING — DATA VISUALIZATION UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export &amp; Packaging</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Export Terms &amp; Packaging</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Choose the export Incoterm that matches your logistics setup. Packaging is specified per programme to meet your retail or distribution requirements.
          </p>

          {/* Export terms */}
          <h3 className="text-lg font-bold text-navy-900 mb-4">Export Incoterms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {EXPORT_TERMS.map((e, i) => (
              <motion.div
                key={e.term}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center shrink-0">
                    <span className="text-gold text-sm font-bold">{e.term}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{e.term}</p>
                    <p className="text-xs text-gray-500">{e.full}</p>
                  </div>
                </div>
                <p className="text-xs text-gold font-semibold">📍 {e.port}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Packaging options */}
          <h3 className="text-lg font-bold text-navy-900 mb-4">Packaging Options</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {PACK_OPTIONS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col items-center gap-2 text-center"
              >
                <span className="text-2xl" aria-hidden="true">{p.icon}</span>
                <p className="text-xs font-semibold text-navy-900 leading-snug">{p.label}</p>
                <p className="text-[10px] text-gray-500">{p.note}</p>
              </motion.div>
            ))}
          </div>

          {/* Indicative timeline — with prominent disclaimer */}
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <h3 className="text-lg font-bold text-navy-900">Indicative Programme Timeline</h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full w-fit">
              <span aria-hidden="true">ℹ️</span>
              Guide only — actual timelines vary
            </span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800 leading-relaxed">
            <strong>Important:</strong> The durations shown below are indicative guides based on typical programmes. Actual timelines depend on factory scheduling, fabric sourcing availability, number of sample iterations, seasonal demand and your chosen Incoterm. Share your target delivery date in your RFQ for a specific assessment.
          </div>
          <div className="flex flex-col gap-3">
            {LEAD_STAGES.map((stage, i) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl ${stage.color} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy-900">{stage.stage}</p>
                  <p className="text-xs text-gray-500">{stage.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-navy-900">{stage.days}</p>
                  <p className="text-xs text-gray-500">days (guide)</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-5 bg-gray-100 border border-gray-200 rounded-xl p-4 text-sm text-gray-500">
            Indicative total programme duration: approximately 90–130 days from RFQ to departure port. Add sea freight time for your destination. These figures are for planning purposes only and are not a contractual commitment.
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — SCANDINAVIAN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-[#F8FAF7] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-[#4a7c59]">
              Ethics &amp; Environment
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-5 leading-[1.1]">
              Sustainable<br />Sourcing
            </h2>
            <div className="w-12 h-0.5 bg-[#4a7c59] mb-6" aria-hidden="true" />
            <p className="text-gray-500 text-lg leading-loose">
              International buyers increasingly require verifiable sustainability credentials. Every programme can be specified to your environmental and ethical standards.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {SUSTAINABILITY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-2xl border-2 border-[#4a7c59]/20 flex items-center justify-center bg-white">
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-navy-900">{item.title}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#4a7c59]/10 text-[#4a7c59]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-loose">{item.desc}</p>
                </div>
                <div className="w-8 h-px bg-[#4a7c59]/30" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
          <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <Link
              href="/rfq/"
              className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors bg-[#4a7c59] hover:bg-[#3d6b4a]"
            >
              Request Certified Programme <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/qualitycompliance/certifications/"
              className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 text-navy-900 hover:border-navy-900 transition-colors"
            >
              View All Certifications
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — SOURCING PROCESS — SWISS DESIGN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t-4 border-navy-900 pt-8 mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-gray-500 mb-2">
                MZ Global Trading — Sourcing Programme
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy-900">Our Process</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Six structured steps from specification to shipment.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-6 items-start p-7 border-b border-gray-100 last:border-b-0"
              >
                <div className="shrink-0">
                  <p className="text-6xl font-bold leading-none text-gray-100">{step.num}</p>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-navy-900" aria-hidden="true" />
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">{step.short}</p>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 border-t-2 border-gold pt-8 flex flex-col sm:flex-row gap-5">
            <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-800 transition-colors">
              Begin Your Programme — Step 01 <span aria-hidden="true">→</span>
            </Link>
            <Link href="/ourprocess/" className="inline-flex items-center gap-2 border border-gray-200 text-navy-900 font-semibold px-8 py-4 rounded-xl hover:border-navy-900 transition-colors">
              View Full Process Detail
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Henley Shirt FAQ</h2>
          <div className="divide-y divide-gray-200">
            {FAQS.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full text-left py-5 flex justify-between items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  aria-expanded={faqOpen === i}
                >
                  <span className="font-semibold text-navy-900 text-[15px] leading-snug">{item.q}</span>
                  <span className="relative shrink-0 mt-0.5">
                    {faqOpen !== i && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                      </span>
                    )}
                    <motion.span
                      animate={{ rotate: faqOpen === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gold text-xl font-light select-none inline-block"
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-gray-600 leading-relaxed text-[15px]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAME-TIER PAGES */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Knitted Garments</p>
            <h2 className="text-2xl font-bold text-navy-900">More Knitted Garments</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: "T-Shirts", desc: "Seven constructions — 160 to 280 GSM. Single jersey, interlock, piqué, rib, waffle, mesh.", href: "/apparel/knittedgarments/tshirts/", img: "/images/hero/hero-t-shirts.webp", alt: "Pakistan t-shirt manufacturer — OEM single jersey and piqué tees for retail and fashion brands in USA, UK and Europe" },
              { name: "Polo Shirts", desc: "Classic piqué, mini piqué and jersey polo. Corporate, golf and hospitality programmes.", href: "/apparel/knittedgarments/poloshirts/", img: "/images/hero/hero-polo-shirts.webp", alt: "Pakistan polo shirt manufacturer — OEM piqué and performance polo for corporate and sports brands worldwide" },
              { name: "Sweatshirts & Hoodies", desc: "French terry, loop back and bonded fleece. 300–420 GSM. Embroidery and print.", href: "/apparel/knittedgarments/sweatshirtshoodies/", img: "/images/hero/hero-sweatshirts-hoodies.webp", alt: "Pakistan sweatshirt and hoodie manufacturer — OEM French terry and fleece hoodies for sportswear and retail brands" },
              { name: "Sweatpants & Joggers", desc: "French terry and brushed fleece. Coordinated set and standalone programmes.", href: "/apparel/knittedgarments/sweatpantsjoggers/", img: "/images/hero/hero-sweatpants-joggers.webp", alt: "Pakistan sweatpants manufacturer — OEM French terry and brushed fleece bottoms for activewear programmes" },
              { name: "Tank Tops", desc: "Single jersey, rib and mesh. Athletic and casual lifestyle programmes.", href: "/apparel/knittedgarments/tanktops/", img: "/images/hero/hero-tank-tops.webp", alt: "Pakistan tank top manufacturer — OEM single jersey, rib and mesh tanks for athletic and lifestyle brands" },
            ].map((p) => (
              <Link href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image src={p.img} alt={p.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
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

      {/* ════════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Start Your Programme</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-snug">
              Ready to Source Henley Shirts<br />from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Henley shirt sourcing from Pakistan&rsquo;s certified knitwear mills. Waffle knit, French terry, single jersey, rib — any construction, any GSM. Submit the spec; we coordinate the factory match, sampling and bulk production to your timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-9 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-9 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
