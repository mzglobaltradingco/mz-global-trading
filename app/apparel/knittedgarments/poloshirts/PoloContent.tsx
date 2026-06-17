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
    id: "pique",
    name: "Piqué / Polo Knit",
    badge: "Classic",
    gsm: "180–240 GSM",
    hand: "Textured raised surface, structured, breathable",
    best: ["Corporate Programmes", "Golf Brands", "Sports Retail"],
    markets: ["USA", "UK", "EU", "Australia", "Middle East"],
    decorations: ["Embroidery", "Woven Badge / Crest"],
    detail: "Classic polo knit piqué defines the polo shirt construction globally. The interlocked double-faced structure creates a distinctive textured surface that improves air circulation significantly versus flat jersey. Embroidery registers with excellent fidelity on the raised texture — this is why embroidery dominates polo shirt decoration across all markets.",
    spec: "100% combed cotton or cotton/polyester blend. GSM 180–240. Classic honeycomb cell texture. Reactive dyed. OEKO-TEX Standard 100 compliant.",
  },
  {
    id: "mini-pique",
    name: "Mini Piqué (Fine)",
    badge: "Premium",
    gsm: "190–230 GSM",
    hand: "Finer texture, refined appearance, premium positioning",
    best: ["Premium Retail", "Luxury Brands", "High-End Corporate"],
    markets: ["UK", "EU", "USA", "Japan", "South Korea"],
    decorations: ["Embroidery", "Woven Crest"],
    detail: "Mini piqué uses a finer knit structure than classic piqué — the smaller cell size creates a more refined, premium surface texture while retaining all the breathability advantages of standard piqué. A preferred choice for premium and luxury brand polo programmes where refined appearance is a priority.",
    spec: "100% pima cotton or fine combed cotton. GSM 190–230. Fine cell micro-texture. Mercerized finish available.",
  },
  {
    id: "single-jersey",
    name: "Single Jersey",
    badge: "",
    gsm: "170–210 GSM",
    hand: "Smooth face, 4-way stretch, softer hand than piqué",
    best: ["Casual Lifestyle", "Athleisure", "E-Commerce Brands"],
    markets: ["USA", "EU", "Australia"],
    decorations: ["Embroidery", "Screen Print", "Heat Transfer"],
    detail: "Jersey polo shirts are increasingly popular in casual lifestyle and athleisure segments where comfort and softness are prioritised over the structured appearance of piqué. The smooth face accepts all decoration methods and drapes well. Jersey polo is typically positioned as a more casual, fashion-forward alternative to traditional piqué.",
    spec: "100% combed cotton or performance polyester blend. GSM 170–210. 4-way stretch. Moisture wicking finish available.",
  },
  {
    id: "french-terry",
    name: "French Terry (Sport Polo)",
    badge: "Performance",
    gsm: "220–300 GSM",
    hand: "Smooth exterior, looped interior, heavier weight",
    best: ["Sports Brands", "Active Lifestyle", "A/W Programmes"],
    markets: ["USA", "UK", "Canada", "EU"],
    decorations: ["Embroidery", "Screen Print", "Heat Transfer"],
    detail: "French terry polo shirts occupy a performance and casual A/W position. The smooth exterior face maintains a clean appearance for branded programmes while the looped interior delivers warmth and a premium hand-feel. Popular for sports brand casual polo programmes and active lifestyle collections in cooler climates.",
    spec: "100% combed cotton or 80/20 cotton-polyester. GSM 220–300. Anti-pill finish available.",
  },
  {
    id: "waffle-knit",
    name: "Waffle Knit",
    badge: "Seasonal",
    gsm: "180–240 GSM",
    hand: "Grid texture, thermal insulation, structured appearance",
    best: ["Winter Retail", "USA Workwear", "Outdoor Brands"],
    markets: ["USA", "Canada", "UK", "N. Europe"],
    decorations: ["Embroidery"],
    detail: "Waffle knit polo shirts are a cold-weather category staple in North American markets. The grid cell structure delivers the thermal warmth expected in USA workwear and outdoor brand programmes while maintaining the polo shirt silhouette. Embroidery is the strongly preferred decoration — it registers well on the structured textured surface.",
    spec: "100% cotton or cotton-polyester blend. Grid cell depth 3–5 mm. GSM 180–240. Embroidery only recommended.",
  },
];

const FIT_PROFILES = [
  { code: "REG", name: "Regular Fit", ease: "+10–12 cm chest ease", detail: "The universal corporate and workwear specification. Comfortable through the chest, straight side seams. Covers the widest range of body types — the default choice for corporate branded programmes, hospitality staff uniforms and promotional orders.", market: "Corporate, hospitality, USA mainstream, mass retail", gradient: "from-sky-500 to-blue-600" },
  { code: "SLM", name: "Slim Fit", ease: "+6–8 cm chest ease", detail: "Contemporary tailored silhouette. Tapered side seams from chest to hem. The dominant specification for UK and European fashion retail, golf brands and modern corporate programmes where a polished, refined appearance is the primary consideration.", market: "UK, EU fashion retail, golf brands, contemporary corporate", gradient: "from-indigo-500 to-purple-600" },
  { code: "ATH", name: "Athletic Fit", ease: "Wide shoulder, tapered waist", detail: "Engineered for active use — expanded shoulder to accommodate range of motion, tapered waist for visual definition. Standard specification for sports teams, athletic brands and performance polo programmes. Pairs naturally with moisture-wicking jersey and performance piqué constructions.", market: "Sports brands, athletic clubs, gym wear, performance retail", gradient: "from-rose-500 to-pink-600" },
];

const GSM_TIERS = [
  { gsm: "170–190", name: "Light / Jersey", season: "Spring/Summer · Warm Climate", market: "Middle East · SE Asia · Australia · South America", bar: 38, desc: "Single jersey polo. Softer hand-feel, superior drape, suits warmer climates and casual lifestyle positioning. Lower cost per unit than piqué at equivalent GSM.", accent: "#06b6d4" },
  { gsm: "190–220", name: "Standard Piqué", season: "Year-Round", market: "USA · UK · EU · Corporate Global", bar: 82, desc: "The industry-standard GSM range for classic and mini piqué polo shirts. Covers the majority of corporate, hospitality, sports and fashion retail programmes worldwide.", accent: "#D4A017", featured: true },
  { gsm: "220–300", name: "Heavyweight / Performance", season: "Autumn / Winter", market: "USA workwear · Canada · N. Europe", bar: 48, desc: "French terry and heavyweight piqué. Premium hand-feel, thermal properties for cold-climate markets. French terry sport polo sits here — USA and Canadian sports brand programmes.", accent: "#6366f1" },
];

const DECO_METHODS = [
  { code: "EMB", method: "Embroidery", rank: "Primary", best: "Logo marks, crests, brand identity — all constructions", compat: ["All Constructions"], note: "The default choice for polo shirts. Registers with superior fidelity on piqué texture." },
  { code: "WVN", method: "Woven Badge / Crest", rank: "Premium", best: "Heritage brands, sports clubs, golf — premium positioning", compat: ["Piqué", "Mini Piqué"], note: "Highest-prestige decoration for polo programmes. Additional lead time." },
  { code: "SCR", method: "Screen Print", rank: "Secondary", best: "Graphic t-shirt crossover, casual jersey polo, event polo", compat: ["Single Jersey", "French Terry"], note: "Soft-hand inks required. Not recommended for piqué constructions." },
  { code: "HT", method: "Heat Transfer", rank: "Secondary", best: "Clean sport marks, athletic polo, number placement", compat: ["Single Jersey", "French Terry"], note: "Not recommended for piqué or waffle textures." },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Standard / PMS Matched", note: "Full PMS colour range. Lab dip approval before bulk production.", swatches: ["bg-red-400", "bg-blue-500", "bg-emerald-500", "bg-yellow-400", "bg-purple-500"] },
  { name: "Yarn-Dyed", subtitle: "Stripe & Collar Contrast", note: "Contrast collar, cuff and placket options. Higher minimum quantities, longer lead.", swatches: ["bg-slate-700", "bg-red-600", "bg-amber-500", "bg-teal-500", "bg-slate-400"] },
  { name: "Garment Dye", subtitle: "Vintage / Washed Tones", note: "Washed pigment dyeing on combed cotton. Popular in USA premium casual.", swatches: ["bg-stone-300", "bg-stone-400", "bg-stone-500", "bg-stone-600", "bg-slate-500"] },
  { name: "Organic / Low-Impact", subtitle: "GOTS Certified", note: "OEKO-TEX certified chemicals only. No restricted substances.", swatches: ["bg-green-200", "bg-green-400", "bg-emerald-300", "bg-lime-300", "bg-teal-300"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic fibre sourcing and processing — required for organic cotton claims", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — EU/UK import standard", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
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
  { feature: "Fabric Construction", check: "5 constructions", detail: "Piqué, mini piqué, jersey, French terry, waffle knit" },
  { feature: "PMS Colour Matching", check: "Full range", detail: "Lab dip approval before bulk. ISO 105 colour fastness compliance" },
  { feature: "Fit Development", check: "3 standard profiles", detail: "Regular, Slim, Athletic — or custom graded to tech pack" },
  { feature: "Collar & Cuff Specification", check: "Custom", detail: "Rib collar/cuff, woven collar, self-fabric collar options" },
  { feature: "Placket Configuration", check: "Custom", detail: "2, 3 or 4-button. Rib, woven or self-fabric. Button colour spec" },
  { feature: "Decoration (Embroidery)", check: "Primary method", detail: "Managed to buyer artwork. Pre-production strike-off approval" },
  { feature: "Label & Branding", check: "Full package", detail: "Woven neck label, care label, hang tag, size tab — all to brand spec" },
  { feature: "Retail Packaging", check: "All options", detail: "Individual polybag, hanger + polybag, board fold, retail box" },
];

const SECTORS = [
  { name: "Corporate & Staff Uniform", desc: "Branded polo shirts for company staff, field teams and client-facing employees", markets: "USA, UK, EU, Middle East, Australia" },
  { name: "Hospitality & Hotel", desc: "Hotel staff, restaurant and event crew polo programmes — hospitality sector", markets: "USA, UK, EU, Middle East, SE Asia" },
  { name: "Golf & Country Club", desc: "Classic and mini piqué polo shirts for golf brands, clubs and tournament programmes", markets: "USA, UK, EU, Australia, Japan" },
  { name: "Sports & Athletic", desc: "Team sport polo, sports club programmes and performance athleisure polo", markets: "USA, UK, EU, Australia, South America" },
  { name: "Retail Fashion", desc: "Jersey and piqué polo shirts for fashion retail chains and independent boutiques", markets: "USA, UK, EU, East Asia, SE Asia" },
  { name: "Promotional & Events", desc: "Event staff, exhibition crew, trade promotion — cost-effective branded polo", markets: "Worldwide" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Competitive pricing." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight. Buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory. Lowest quoted price." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard export" },
  { icon: "🪝", label: "Hanger + Polybag", note: "Retail-ready" },
  { icon: "🗂️", label: "Board Fold", note: "In-store display" },
  { icon: "🎁", label: "Gift Box", note: "Premium gifting" },
  { icon: "🔒", label: "Vacuum Packed", note: "Space-saving" },
  { icon: "✏️", label: "Custom Pack", note: "Brand brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", color: "bg-gold" },
  { stage: "Sample Production", days: "15–20", color: "bg-sky-500" },
  { stage: "Bulk Production", days: "40–60", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "18–28", color: "bg-teal-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton for all standard piqué and jersey constructions. Fully traceable from farm to finished garment.", tag: "GOTS" },
  { icon: "💧", title: "Water Efficiency", desc: "Enzyme washing replaces stone washing — significantly lower water consumption and zero stone dust waste in finishing.", tag: "Process" },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester blends available for performance polo and athleisure jersey construction programmes.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited factories. Worker welfare, wages and safe conditions independently verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "Reactive dyeing with OEKO-TEX certified chemicals only. No azo dyes, no restricted substances.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags, FSC-certified hangtags and retail boxes available across all polo programmes on request.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Specify construction, GSM, fit, decoration, quantity and delivery date via our RFQ form.", week: "Week 1" },
  { num: "02", title: "Factory Matching", desc: "We shortlist 2–3 certified Pakistan polo shirt factories. Competitive quotation within 3–5 days.", week: "Week 1–2" },
  { num: "03", title: "Sample Production", desc: "Pre-production samples produced to spec. 15–20 days from fabric and spec lock.", week: "Week 3–5" },
  { num: "04", title: "Sample Approval", desc: "Review construction, embroidery, colour, label and fit. Revise as required before PO.", week: "Week 5–7" },
  { num: "05", title: "Bulk Production", desc: "Production commences on confirmed PO. 40–60 days depending on quantity.", week: "Week 7–15" },
  { num: "06", title: "QC & Shipment", desc: "Pre-shipment inspection, packing and vessel loading from Karachi or Port Qasim.", week: "Week 15–16" },
];

const FAQS = [
  { q: "What is the difference between classic piqué and mini piqué polo shirts?", a: "Classic piqué has a larger, more visible cell structure — the traditional polo shirt texture instantly recognisable on corporate and golf programmes. Mini piqué uses a finer knit structure with smaller cells, creating a more refined, premium surface texture while retaining piqué's breathability advantages. Mini piqué is typically positioned as a premium tier option and is popular in high-end corporate and luxury brand polo programmes, especially in UK, EU and East Asian markets." },
  { q: "Why is embroidery the primary decoration for polo shirts?", a: "The raised texture of piqué and mini piqué provides an exceptionally firm base for embroidery stitch registration. Screen printing on piqué requires special techniques to achieve acceptable ink fill across the textured surface — embroidery naturally adapts to the texture and produces a clean, premium result. Woven crests and badges are the secondary premium option for heritage or luxury brand positioning." },
  { q: "Can I specify OEKO-TEX certified polo shirts from Pakistan?", a: "Yes. Pakistan's piqué manufacturing facilities carry OEKO-TEX Standard 100 certification across all standard constructions. This is particularly important for EU buyers where chemical compliance is reviewed at import. Specify OEKO-TEX as a hard requirement in your RFQ — we match you with certified factories only." },
  { q: "What collar and cuff options are available?", a: "Standard polo shirts use a rib-knit collar and cuffs in the same construction as the body. Custom options include woven collar and cuffs (formal positioning), self-fabric collar (jersey polo), and contrast collar/cuff in a different colour (yarn-dyed programmes). Collar and cuff specifications are included in the RFQ specification form." },
  { q: "How do I plan order quantities for a polo shirt programme?", a: "Polo shirt order quantities vary by construction, embroidery complexity, colour count, size distribution and factory scheduling. There is no single universal quantity that applies to all programmes. Include your target quantity per style and colour in your RFQ — we match you with factories whose capacity aligns with your programme and advise on the most cost-efficient quantity structure." },
  { q: "Do you supply polo shirts for hospitality and hotel programmes?", a: "Yes — hospitality is one of the most active polo shirt segments in our supply network. Hotel staff and restaurant crew polo programmes typically require: regular fit piqué in corporate colours, embroidered logo on left chest, board fold or hanger packaging, and phased delivery aligned with seasonal staffing cycles. Specify your deployment timeline in your RFQ." },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PoloContent() {
  const [activeConstruction, setActiveConstruction] = useState("pique");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-polo-shirts.webp" fill alt="Pakistan polo shirt manufacturer — OEM piqué and corporate polo shirts for brands in USA, UK and Europe" className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-navy-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Knitwear Export</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Polo Shirt<br /><span className="text-gold">Manufacturer</span><br />Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading sources OEM polo shirts from Pakistan&rsquo;s certified knitwear factories. Classic piqué, mini piqué, performance jersey and French terry. Corporate, hospitality, golf and sports brand programmes. OEKO-TEX, BSCI certified.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote <span aria-hidden="true">&#8594;</span></Link>
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
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Polo Shirt Sourcing — Piqué Specialist Mills</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Polo Shirt Sourcing Excellence — Corporate, Sports &amp; Hospitality</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">Corporate polo, golf brand, hospitality and sports club programmes — placed with the Pakistan piqué specialists whose production tier, embroidery capability and certification status match your brief. Quotation within 3–5 working days.</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[{ val: "50+", label: "Vetted Factories" }, { val: "35+", label: "Export Markets" }, { val: "10+", label: "Certifications" }, { val: "5", label: "Constructions" }].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
                </div>
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
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-sky-50 border border-sky-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">5 Fabric Constructions</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl px-4 py-3 border border-sky-100 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.gsm}</p>
                    </div>
                    {c.badge && <span className="text-[10px] font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full shrink-0">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-rose-50 border border-rose-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Fits</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">3 Fit Profiles</h3>
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                {FIT_PROFILES.map((f) => (
                  <div key={f.code} className={`bg-gradient-to-r ${f.gradient} rounded-xl p-5 text-white`}>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-8 h-8 rounded-lg bg-white/20 text-white text-xs font-bold flex items-center justify-center">{f.code}</span>
                      <p className="font-bold">{f.name}</p>
                    </div>
                    <p className="text-sm text-white/80 leading-snug">{f.ease}</p>
                    <p className="text-xs text-white/60 mt-1">{f.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-fits" label="Explore Fit Profiles" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-yellow-700 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Tiers</h3>
              <div className="flex flex-col gap-2 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-lg p-2.5 border border-yellow-100">
                    <div className="flex justify-between mb-1"><span className="text-xs font-bold text-navy-900">{t.gsm}</span>{t.featured && <span className="text-[9px] font-semibold text-gold">Popular</span>}</div>
                    <div className="w-full h-1 bg-yellow-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${t.bar}%`, backgroundColor: t.accent }} aria-hidden="true" /></div>
                    <p className="text-[10px] text-yellow-700 mt-1">{t.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View Weight Guide" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🖨️</span>
              <p className="text-green-700 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Embroidery-First</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="bg-white rounded-lg px-3 py-2.5 border border-green-100 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded bg-green-100 text-green-700 text-[9px] font-bold flex items-center justify-center shrink-0">{d.code}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                      <p className="text-[9px] text-green-700 font-semibold">{d.rank}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decoration" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }} className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-2.5 border border-purple-100">
                    <p className="text-xs font-semibold text-navy-900 mb-1.5">{d.name}</p>
                    <div className="flex gap-1.5">{d.swatches.map((s, i) => <div key={i} className={`w-4 h-4 rounded-full ${s}`} aria-hidden="true" />)}</div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colors" label="Explore Colors" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM Programs</h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {OEM_FEATURES.slice(0, 6).map((f) => (
                  <div key={f.feature} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                    <p className="text-xs text-gray-600 leading-snug">{f.feature}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore OEM" />
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-2 bg-[#1a1a2e] border border-[#2a2a4e] rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-purple-400 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-white mt-0.5">6 Industry Sectors</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {SECTORS.map((s, i) => (
                  <div key={s.name} className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-[9px] font-bold text-purple-400 uppercase tracking-wider">0{i + 1}</span>
                    <p className="text-sm font-semibold text-white mt-0.5 leading-tight">{s.name}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollToId("section-markets")} className="self-start inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-yellow-300 transition-colors mt-auto pt-2">View All Sectors <span aria-hidden="true">→</span></button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">10 Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-xl border border-gray-200 flex items-center justify-center p-1.5" style={{ height: 48 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={60} height={36} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-1 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-teal-700 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 border border-teal-100">
                    <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <div><p className="text-xs font-semibold text-navy-900">{e.full}</p><p className="text-[10px] text-gray-400">{e.port}</p></div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
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
                    <span className="text-[10px] font-semibold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full w-fit">{s.tag}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }} className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-orange-200 text-orange-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <div><p className="text-xs font-semibold text-navy-900">{p.title}</p><p className="text-[9px] text-gray-400">{p.week}</p></div>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-1 pl-8">+ 2 more steps</p>
              </div>
              <ExploreBtn sectionId="section-process" label="View Our Process" />
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
              <p className="font-semibold text-navy-900">Polo Shirt Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction selection, embroidery specification and corporate programme guide.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Knitwear Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times, certifications and factory audit overview.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Spec Sheets &amp; Size Charts</p>
              <p className="text-xs text-gray-500 leading-relaxed">Polo shirt spec sheets, size charts and embroidery spec documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Polo Shirts?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Piqué, mini piqué, jersey or French terry — specify construction, GSM, fit and embroidery requirement. Factory match and quotation in 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS — TYPOGRAPHY-DRIVEN UI */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase mb-2">01 / Constructions</p>
            <h2 className="text-6xl sm:text-8xl lg:text-[120px] font-black text-navy-900 leading-none mb-4 tracking-tight">
              5<span className="text-gold">.</span>
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-gray-300 -mt-2 mb-6">Fabric Constructions</p>
            <p className="text-gray-500 max-w-2xl leading-relaxed">Each polo shirt construction has a distinct visual character, hand-feel and market application. Selection starts with your target buyer segment.</p>
          </div>
          <div className="flex flex-wrap gap-3 mb-10">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConstruction(c.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all ${activeConstruction === c.id ? "bg-navy-900 text-white border-navy-900" : "bg-white text-gray-500 border-gray-200 hover:border-navy-900/30"}`}
              >
                {activeConstruction !== c.id && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                  </span>
                )}
                {c.name}
                {c.badge && <span className="ml-2 text-[10px] font-semibold text-gold">— {c.badge}</span>}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeConstruction} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="grid lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 bg-navy-900 rounded-2xl p-8">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-3xl font-black text-white">{ac.name}</h3>
                  {ac.badge && <span className="text-xs font-bold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">{ac.badge}</span>}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">GSM Range</p>
                    <p className="text-2xl font-black text-gold">{ac.gsm}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Hand Feel</p>
                    <p className="text-sm text-white">{ac.hand}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{ac.detail}</p>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Technical Spec</p>
                  <p className="text-sm text-gray-300">{ac.spec}</p>
                </div>
              </div>
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
                  <p className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-3">Best For</p>
                  <div className="flex flex-wrap gap-2">{ac.best.map((b) => <span key={b} className="text-sm bg-white border border-sky-200 text-navy-900 px-3 py-1.5 rounded-lg font-medium">{b}</span>)}</div>
                </div>
                <div className="bg-gold/5 rounded-2xl p-6 border border-gold/20">
                  <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-3">Key Markets</p>
                  <div className="flex flex-wrap gap-2">{ac.markets.map((m) => <span key={m} className="text-sm text-gold bg-gold/10 border border-gold/20 px-3 py-1.5 rounded-lg font-semibold">{m}</span>)}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Decoration Methods</p>
                  <div className="flex flex-col gap-2">{ac.decorations.map((d) => <div key={d} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-navy-900 shrink-0" aria-hidden="true" /><span className="text-sm text-navy-900 font-medium">{d}</span></div>)}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 2 — FITS — CARD-BASED UI */}
      <section id="section-fits" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fit &amp; Sizing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Three Fit Profiles</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Fit selection determines the commercial positioning of your polo programme. Each fit serves a distinct buyer segment with different expectations for cut, comfort and appearance.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {FIT_PROFILES.map((f, i) => (
              <motion.div key={f.code} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className={`bg-gradient-to-br ${f.gradient} p-8 text-white`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-12 h-12 rounded-xl bg-white/20 text-white text-sm font-black flex items-center justify-center">{f.code}</span>
                    <div>
                      <p className="font-black text-lg">{f.name}</p>
                      <p className="text-sm text-white/70">{f.ease}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{f.detail}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Primary Markets</p>
                    <p className="text-sm font-medium text-navy-900">{f.market}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 grid sm:grid-cols-3 gap-8">
            {[["XS–3XL", "Standard size range"], ["US / UK / EU", "Size standards available"], ["Custom", "Graded to your tech pack"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-gold">{val}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 3 — GSM — CINEMATIC UI */}
      <section id="section-gsm" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero/hero-polo-shirts.webp" fill alt="Pakistan polo shirt weight guide — GSM selection for corporate and retail programmes" className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-navy-900/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Guide</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Choosing the Right GSM</h2>
          <p className="text-white/50 mb-14 max-w-2xl leading-relaxed">GSM determines season positioning, hand-feel, decoration receptivity and retail price tier. Standard piqué polo programmes sit at 190–220 GSM.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {GSM_TIERS.map((tier, i) => (
              <motion.div key={tier.gsm} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className={`rounded-2xl p-7 border ${tier.featured ? "bg-white text-navy-900 border-white shadow-2xl" : "bg-white/8 border-white/15 text-white backdrop-blur-sm"}`}>
                {tier.featured && <span className="inline-block mb-3 text-[10px] font-bold bg-gold text-navy-900 px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>}
                <p className="text-4xl font-black mb-1" style={{ color: tier.featured ? "#0D1B2A" : tier.accent }}>{tier.gsm}</p>
                <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${tier.featured ? "text-gray-400" : "text-white/40"}`}>{tier.name}</p>
                <div className={`w-full h-2 rounded-full mb-4 ${tier.featured ? "bg-gray-100" : "bg-white/10"}`}>
                  <div className="h-full rounded-full" style={{ width: `${tier.bar}%`, backgroundColor: tier.accent }} aria-hidden="true" />
                </div>
                <p className={`text-sm font-bold mb-2 ${tier.featured ? "text-navy-900" : "text-white"}`}>{tier.season}</p>
                <p className={`text-sm leading-relaxed mb-3 ${tier.featured ? "text-gray-600" : "text-white/60"}`}>{tier.desc}</p>
                <p className="text-xs font-semibold" style={{ color: tier.accent }}>{tier.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 4 — DECORATION — SOCIAL-FIRST UI */}
      <section id="section-decoration" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Decoration</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Embroidery-First Decoration</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Polo shirt decoration is embroidery-dominated across all market segments. The structured piqué texture provides the ideal base for clean stitch registration.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {DECO_METHODS.map((d, i) => (
              <motion.div key={d.code} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.09 }} className={`rounded-2xl p-7 flex flex-col gap-5 ${i === 0 ? "bg-navy-900 text-white" : "bg-gray-50 border border-gray-100"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${i === 0 ? "bg-gold text-navy-900" : i === 1 ? "bg-navy-900/10 text-navy-900" : "bg-gray-200 text-gray-600"}`}>{d.rank}</span>
                    </div>
                    <h3 className={`text-xl font-bold ${i === 0 ? "text-white" : "text-navy-900"}`}>{d.method}</h3>
                  </div>
                  <span className={`text-2xl font-black ${i === 0 ? "text-gold/30" : "text-gray-100"}`}>{d.code}</span>
                </div>
                <p className={`text-sm leading-relaxed flex-1 ${i === 0 ? "text-gray-300" : "text-gray-600"}`}>{d.best}</p>
                <div>
                  <p className={`text-[10px] font-semibold uppercase tracking-widest mb-2 ${i === 0 ? "text-gray-500" : "text-gray-400"}`}>Compatible With</p>
                  <div className="flex flex-wrap gap-1.5">{d.compat.map((c) => <span key={c} className={`text-[11px] px-2.5 py-1 rounded-full ${i === 0 ? "bg-white/10 text-gray-200" : "bg-gray-100 text-gray-600"}`}>{c}</span>)}</div>
                </div>
                <p className={`text-xs rounded-xl px-4 py-3 border ${i === 0 ? "bg-white/5 border-white/10 text-gray-300" : "bg-amber-50 border-amber-100 text-amber-700"}`}>{d.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[["Left Chest (Primary)", "Standard brand mark placement — 80% of corporate polo programmes use left chest embroidery"], ["Right Chest", "Secondary placement — name, role or co-brand mark. Common in hospitality and sports team programmes"], ["Back Yoke", "Large-format brand name or graphic on upper back. Primarily sports and outdoor brand programmes"]].map(([place, desc]) => (
              <div key={place} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-sm font-bold text-navy-900 mb-2">{place}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 5 — COLOURS — NEUMORPHISM */}
      <section id="section-colors" className="py-20 lg:py-28" style={{ backgroundColor: "#f0f0f5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Programs</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Full PMS Colour Range</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Every polo shirt construction is available in full PMS colour matching. Lab dip submitted for buyer approval before bulk production begins.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div key={d.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl p-6 flex flex-col gap-5" style={{ backgroundColor: "#f0f0f5", boxShadow: "8px 8px 16px #c8c8d0, -8px -8px 16px #ffffff" }}>
                <div className="flex gap-3 flex-wrap">
                  {d.swatches.map((s, idx) => (
                    <div key={idx} className={`w-10 h-10 rounded-full ${s}`} style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.15), -2px -2px 4px rgba(255,255,255,0.8)" }} aria-hidden="true" />
                  ))}
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900">{d.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{d.subtitle}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="rounded-2xl p-8" style={{ backgroundColor: "#f0f0f5", boxShadow: "inset 4px 4px 8px #c8c8d0, inset -4px -4px 8px #ffffff" }}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Sample Colour Palette — Illustrative Only</p>
            <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-2">
              {[["bg-white","#fff"],["bg-gray-100","#f3f4f6"],["bg-gray-300","#d1d5db"],["bg-gray-600","#4b5563"],["bg-navy-900","#0D1B2A"],["bg-black","#000"],["bg-red-700","#b91c1c"],["bg-red-500","#ef4444"],["bg-blue-800","#1e40af"],["bg-blue-500","#3b82f6"],["bg-sky-400","#38bdf8"],["bg-green-700","#15803d"]].map(([cls, hex]) => (
                <div key={hex} className={`h-10 rounded-xl ${cls} border border-black/5`} title={hex} aria-hidden="true" />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Full PMS range available. Navy, white, black and corporate colours are the most frequently ordered polo shirt colours across all market segments.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 6 — OEM — MARKETPLACE UI */}
      <section id="section-oem" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM &amp; Custom</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Complete Custom Development Programs</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Every aspect of your polo shirt programme — from fabric construction to retail packaging — is managed to your brand specification.</p>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="border border-gray-200 rounded-2xl overflow-hidden mb-10 min-w-[480px]">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-widest">
              <div className="px-6 py-3">Feature</div>
              <div className="px-6 py-3">Scope</div>
              <div className="px-6 py-3">Detail</div>
            </div>
            {OEM_FEATURES.map((f, i) => (
              <motion.div key={f.feature} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }} className={`grid grid-cols-3 border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-gold/3 transition-colors`}>
                <div className="px-6 py-4 font-semibold text-navy-900 text-sm">{f.feature}</div>
                <div className="px-6 py-4"><span className="text-xs font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-full">{f.check}</span></div>
                <div className="px-6 py-4 text-sm text-gray-500">{f.detail}</div>
              </motion.div>
            ))}
          </div>
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Start Your Programme</p>
              <p className="text-white font-semibold text-lg">Every specification. Fully managed. Certified factory.</p>
            </div>
            <Link href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap">Request a Quote →</Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 7 — MARKETS — FLAT DESIGN UI */}
      <section id="section-markets" className="bg-[#F7F8FF] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Industry Sectors</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Six Polo Shirt Sectors</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Polo shirts serve the widest market range of any single garment — from corporate programmes to golf brands, hotel staff to sports clubs.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {SECTORS.map((s, i) => {
              const icons = ["🏢", "🏨", "⛳", "⚽", "🛍️", "📣"];
              const colors = ["bg-blue-100 text-blue-700", "bg-amber-100 text-amber-700", "bg-green-100 text-green-700", "bg-red-100 text-red-700", "bg-purple-100 text-purple-700", "bg-teal-100 text-teal-700"];
              return (
                <motion.div key={s.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-2xl ${colors[i]} flex items-center justify-center text-2xl mb-4`} aria-hidden="true">{icons[i]}</div>
                  <h3 className="text-base font-bold text-navy-900 mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                  <p className="text-xs font-semibold text-gold">{s.markets}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 text-center">
            <p className="text-5xl font-black text-gold mb-2">35+</p>
            <p className="text-white font-semibold mb-1">Export Markets Served</p>
            <p className="text-gray-400 text-sm">USA · UK · EU · Middle East · SE Asia · Australia · East Asia · Russia/CIS</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 8 — CERTIFICATIONS — MONOCHROME UI */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase mb-2">Standards &amp; Certifications</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">10 Active Certifications</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Corporate polo shirt programmes entering EU and UK markets face increasing import compliance scrutiny. Every factory in our polo network is pre-screened for active certification status — OEKO-TEX, BSCI and Sedex are the three most frequently specified by corporate buyers in these markets.</p>
          <div className="grid grid-cols-1 gap-0 border-2 border-gray-900 divide-y-2 divide-gray-900">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }} className="flex items-center gap-6 px-8 py-5 hover:bg-gray-50 transition-colors">
                <div className="w-16 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center p-2 shrink-0">
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={56} height={36} className="object-contain w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-bold text-navy-900">{c.full}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${c.tier === "Premium" ? "bg-navy-900 text-gold" : c.tier === "Optional" ? "bg-gray-200 text-gray-600" : "bg-gray-100 text-gray-700"}`}>{c.tier}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{c.desc}</p>
                </div>
                <p className="text-xs font-black text-gray-200 hidden sm:block">{String(i + 1).padStart(2, "0")}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 9 — EXPORT — COLLAGE UI */}
      <section id="section-export" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export &amp; Packaging</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Shipping, Packaging &amp; Indicative Timeline</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Incoterms column */}
            <div className="lg:col-span-1 flex flex-col gap-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Incoterms Available</p>
              {EXPORT_TERMS.map((e, i) => (
                <div key={e.term} className={`rounded-2xl p-5 ${i === 0 ? "bg-navy-900 text-white" : "bg-white border border-gray-200"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-sm font-black ${i === 0 ? "text-gold" : "text-navy-900"}`}>{e.term}</span>
                    <span className={`text-xs ${i === 0 ? "text-gray-300" : "text-gray-500"}`}>{e.full}</span>
                  </div>
                  <p className={`text-xs ${i === 0 ? "text-gray-400" : "text-gray-400"}`}>{e.port}</p>
                  <p className={`text-sm mt-1 leading-snug ${i === 0 ? "text-gray-200" : "text-gray-600"}`}>{e.desc}</p>
                </div>
              ))}
            </div>
            {/* Packaging + Timeline */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Packaging Options</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {PACK_OPTIONS.map((p) => (
                    <div key={p.label} className="bg-white border border-gray-200 rounded-xl p-3 text-center hover:border-gold transition-colors">
                      <span className="text-xl mb-1 block" aria-hidden="true">{p.icon}</span>
                      <p className="text-[10px] font-semibold text-navy-900 leading-tight">{p.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Indicative Timeline</p>
                <div className="space-y-4">
                  {LEAD_STAGES.map((s, i) => (
                    <div key={s.stage} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg ${s.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>{String(i + 1).padStart(2, "0")}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-navy-900">{s.stage}</p>
                          <p className="text-xs font-bold text-gold">{s.days} days</p>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full" aria-hidden="true" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2">
                  <span className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true">⚠</span>
                  <p className="text-xs text-amber-800 leading-relaxed"><strong>Indicative durations only.</strong> Actual timelines vary by construction, quantity and factory scheduling. These are guide durations, not contractual commitments.</p>
                </div>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 10 — SUSTAINABILITY — HERO-CENTERED UI */}
      <section id="section-sustainability" className="bg-navy-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Sustainability</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">Responsible Polo Shirt Sourcing from Certified Pakistan Factories</h2>
          <p className="text-gray-300 text-lg mb-16 max-w-3xl mx-auto leading-relaxed">GOTS organic cotton, OEKO-TEX certified chemicals, BSCI-audited facilities — each sustainability commitment is independently verified, not self-declared. Every polo programme can be specified with any combination of these credentials. State your requirements in the RFQ.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/8 transition-colors">
                <div className="flex items-start justify-between">
                  <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                  <span className="text-[10px] font-bold text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">{s.tag}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 11 — PROCESS — MAXIMALIST UI */}
      <section id="section-process" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Six Steps. Zero Guesswork.</h2>
          <p className="text-gray-500 mb-14 max-w-2xl leading-relaxed">No guesswork, no unexplained delays. Six defined stages — RFQ to shipment — each with a clear deliverable, a responsible party and a documented timeline.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {PROCESS_STEPS.map((p, i) => {
              const bgs = ["bg-gold", "bg-sky-500", "bg-indigo-600", "bg-violet-600", "bg-rose-500", "bg-teal-500"];
              return (
                <motion.div key={p.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="relative overflow-hidden border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-24 h-24 flex items-center justify-center">
                    <span className="text-6xl font-black text-gray-50 select-none">{p.num}</span>
                  </div>
                  <div className="relative z-10">
                    <span className={`inline-flex w-10 h-10 rounded-xl ${bgs[i]} text-white text-xs font-black items-center justify-center mb-4`}>{p.num}</span>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{p.week}</p>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[["50+", "Vetted Factories", "bg-navy-900"], ["95%", "On-Time Delivery", "bg-gold"], ["3–5 days", "Quotation Return", "bg-emerald-600"]].map(([val, label, bg]) => (
              <div key={label} className={`${bg} rounded-2xl p-6 text-center`}>
                <p className={`text-2xl font-black ${bg === "bg-gold" ? "text-navy-900" : "text-white"}`}>{val}</p>
                <p className={`text-xs mt-1 ${bg === "bg-gold" ? "text-navy-900/70" : "text-white/60"}`}>{label}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-12">Frequently Asked Questions</h2>
          <div className="divide-y divide-gray-200">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i} className="w-full flex items-start gap-4 py-6 text-left group">
                  <span className="relative shrink-0 mt-0.5">
                    {faqOpen !== i && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                      </span>
                    )}
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${faqOpen === i ? "border-gold bg-gold text-navy-900" : "border-gray-300 text-gray-400 group-hover:border-gold"}`}>{faqOpen === i ? "−" : "+"}</span>
                  </span>
                  <p className={`font-semibold leading-snug transition-colors ${faqOpen === i ? "text-navy-900" : "text-gray-700 group-hover:text-navy-900"}`}>{faq.q}</p>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                      <p className="pl-10 pb-6 text-gray-600 leading-relaxed">{faq.a}</p>
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
              { name: "Henley Shirts", desc: "Single jersey, waffle knit and French terry henley. Casual and workwear programmes.", href: "/apparel/knittedgarments/henleyshirts/", img: "/images/hero/hero-henley-shirts.webp", alt: "Pakistan henley shirt manufacturer — OEM single jersey and waffle knit henleys for casual and workwear programmes" },
              { name: "Sweatshirts & Hoodies", desc: "French terry, loop back and bonded fleece. 300–420 GSM. Embroidery and print.", href: "/apparel/knittedgarments/sweatshirtshoodies/", img: "/images/hero/hero-sweatshirts-hoodies.webp", alt: "Pakistan sweatshirt and hoodie manufacturer — OEM French terry and fleece hoodies for sportswear and retail brands" },
              { name: "Sweatpants & Joggers", desc: "French terry and brushed fleece. Coordinated set and standalone programmes.", href: "/apparel/knittedgarments/sweatpantsjoggers/", img: "/images/hero/hero-sweatpants-joggers.webp", alt: "Pakistan sweatpants manufacturer — OEM French terry and brushed fleece bottoms for activewear programmes" },
              { name: "Tank Tops", desc: "Single jersey, rib and mesh. Athletic and casual lifestyle programmes.", href: "/apparel/knittedgarments/tanktops/", img: "/images/hero/hero-tank-tops.webp", alt: "Pakistan tank top manufacturer — OEM single jersey, rib and mesh tanks for athletic and lifestyle brands" },
            ].map((p) => (
              <Link href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
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

      {/* FINAL CTA */}
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Source Polo Shirts from Pakistan&rsquo;s Certified Factories</h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">Corporate polo, golf brand, hospitality uniform or sports club programme — submit the spec, receive the factory match and competitive quotation within 3–5 working days. Certification documents included as standard.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote <span aria-hidden="true">→</span></Link>
              <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
