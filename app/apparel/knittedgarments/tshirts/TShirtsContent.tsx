"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion-shim";

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
    id: "single-jersey",
    name: "Single Jersey",
    badge: "Most Popular",
    gsm: "160–200 GSM",
    hand: "Smooth face, natural 4-way stretch",
    best: ["Fashion Retail", "E-Commerce", "Streetwear"],
    markets: ["USA", "UK", "EU", "Australia"],
    decorations: ["Screen Print", "DTG", "Embroidery", "Heat Transfer"],
    detail: "Single jersey is the global standard for fashion and promotional t-shirts. Smooth face delivers excellent print registration for screen and DTG. Combed and ring-spun options produce tighter surface texture with superior print fidelity. Available in full PMS colour range. GOTS and OEKO-TEX certified mills.",
    spec: "100% combed cotton or cotton/polyester blend. GSM 160–200. Reactive dyed. Anti-shrink/compacted finish available.",
  },
  {
    id: "interlock",
    name: "Double Jersey / Interlock",
    badge: "Premium",
    gsm: "180–260 GSM",
    hand: "Compact, structured, identical both sides",
    best: ["Premium Basics", "Corporate Programmes", "Retail Brands"],
    markets: ["USA", "UK", "EU", "Canada"],
    decorations: ["Embroidery", "Screen Print", "Heat Transfer"],
    detail: "Interlock knit is structurally denser than single jersey — both faces are smooth, giving it a premium hand-feel. Less prone to curling at edges, making it ideal for retail-ready presentations. A popular choice for premium corporate branded programmes where garment structure matters as much as print quality.",
    spec: "100% combed cotton or pima cotton. GSM 180–260. Double-knit structure. Excellent dimensional stability.",
  },
  {
    id: "pique",
    name: "Piqué",
    badge: "",
    gsm: "180–240 GSM",
    hand: "Textured surface, excellent breathability",
    best: ["Sports Brands", "Corporate Wear", "Golf & Hospitality"],
    markets: ["USA", "UK", "EU", "Middle East", "Australia"],
    decorations: ["Embroidery", "Woven Badge", "Screen Print"],
    detail: "Piqué construction creates a distinctive raised texture through a double-faced knit technique. The textured surface significantly improves air circulation, making it the preferred construction for warm-climate and active-use programmes. Embroidery registers exceptionally well on the structured piqué surface.",
    spec: "100% combed cotton or cotton/polyester blend. GSM 180–240. Available in classic and mini piqué texture.",
  },
  {
    id: "rib-1x1",
    name: "Rib (1×1)",
    badge: "",
    gsm: "200–260 GSM",
    hand: "Vertical ribbing, close fit, excellent recovery",
    best: ["Athleisure", "Premium Basics", "Contemporary Menswear"],
    markets: ["USA", "UK", "EU"],
    decorations: ["Embroidery", "Screen Print"],
    detail: "1×1 rib t-shirts fit closer to the body with natural vertical ribbing and exceptional stretch recovery. Heavier in feel than the GSM suggests due to the compressed knit structure. Increasingly popular in premium basics and athleisure programmes, and for tank tops and sleeveless variants.",
    spec: "100% cotton ring-spun or 95/5 cotton-elastane. GSM 200–260. Flat-lock seam option available.",
  },
  {
    id: "rib-2x2",
    name: "Rib (2×2)",
    badge: "",
    gsm: "220–280 GSM",
    hand: "Wider rib channels, structured, high recovery",
    best: ["Workwear", "Performance Athleisure", "Base Layers"],
    markets: ["USA", "Canada", "UK"],
    decorations: ["Embroidery", "Screen Print (soft-hand)"],
    detail: "2×2 rib delivers wider, more visible ribbing with increased structure and exceptional stretch recovery. This construction is a staple of workwear base layers and performance athleisure in North American markets. The wider rib creates a heavier-feeling fabric at equivalent GSM to 1×1.",
    spec: "100% cotton or 92/8 cotton-elastane. GSM 220–280. Tubular or cut-and-sew available.",
  },
  {
    id: "waffle-knit",
    name: "Waffle Knit",
    badge: "Thermal",
    gsm: "160–220 GSM",
    hand: "Grid cell texture — traps warmth without bulk",
    best: ["Winter Retail", "USA Workwear", "Outdoor Brands"],
    markets: ["USA", "Canada", "UK", "N. Europe"],
    decorations: ["Embroidery", "Screen Print (soft-hand)"],
    detail: "Waffle knit t-shirts are a cold-weather staple in North American retail. The grid cell structure traps insulating air pockets delivering warmth well above what the GSM suggests. Embroidery is the strongly preferred decoration — the structured texture provides firm stitch registration.",
    spec: "100% cotton or cotton-polyester blend. Grid cell depth 3–5 mm. GSM 160–220. Screen print requires soft-hand inks.",
  },
  {
    id: "mesh",
    name: "Mesh / Eyelet",
    badge: "Activewear",
    gsm: "120–160 GSM",
    hand: "Open construction, maximum ventilation",
    best: ["Sports & Activewear", "Gym Brands", "Warm-Climate Markets"],
    markets: ["USA", "Australia", "Middle East", "SE Asia"],
    decorations: ["Sublimation Print", "Heat Transfer"],
    detail: "Mesh and eyelet constructions provide maximum ventilation through open knit structures. Widely used in performance activewear, gym wear and warm-climate casual programmes. Sublimation print delivers excellent all-over colour on polyester-dominant mesh. Not suited for embroidery due to open structure.",
    spec: "100% polyester or polyester/cotton blend. GSM 120–160. Moisture wicking finish available.",
  },
];

const FIT_PROFILES = [
  { code: "REG", name: "Regular / Standard", ease: "+10–12 cm chest ease", detail: "The default specification for mainstream menswear retail, workwear programmes and USA promotional orders. Comfortable through the chest and shoulders with straight side seams.", market: "USA mainstream, workwear, mass retail", color: "bg-emerald-500" },
  { code: "SLM", name: "Slim Fit", ease: "+6–8 cm chest ease", detail: "Contemporary fitted silhouette. Tapered side seams from chest to hem. Dominant specification for UK and European fashion retail where fitted styles are the norm.", market: "UK, EU fashion retail, contemporary menswear", color: "bg-blue-500" },
  { code: "OVR", name: "Oversized / Relaxed", ease: "+18–24 cm chest ease", detail: "Dropped shoulders, wide body, extended length hem. The defining silhouette of contemporary streetwear and youth fashion. Increasingly standard in EU and Asian streetwear brands.", market: "Streetwear, youth fashion, EU contemporary", color: "bg-purple-500" },
  { code: "ATH", name: "Athletic / Performance", ease: "Wide shoulder, tapered waist", detail: "Engineered for movement — wide shoulder to accommodate muscle mass, tapered waist for visual definition. Common in gym brands and athleisure programmes on both sides of the Atlantic.", market: "Gym brands, athleisure, USA, UK, Australia", color: "bg-rose-500" },
  { code: "WCT", name: "Women's Cut", ease: "Reduced shoulder, waist shaping", detail: "Shorter sleeve, narrower shoulder and waist-shaped side seams for a fitted feminine silhouette. Essential specification for women's fashion retail and gender-separated brand programmes.", market: "Women's fashion retail, brand programmes worldwide", color: "bg-amber-500" },
  { code: "UNI", name: "Unisex", ease: "Standardised for all genders", detail: "A single size specification covering both male and female wearers. Increasingly adopted by brands pursuing gender-neutral positioning. Unisex typically runs 1–2 sizes smaller than traditional men's sizing.", market: "Brand programmes, corporate, gender-neutral retail", color: "bg-teal-500" },
];

const GSM_TIERS = [
  { gsm: "120–160", name: "Lightweight / Active", season: "Year-Round Active & Warm Climate", market: "SE Asia · Australia · Middle East · South America", pct: 35, desc: "Mesh and eyelet constructions. Maximum ventilation for activewear and warm-climate casual. Lightweight jersey and performance fabrics for sport and gym programmes.", color: "bg-emerald-400" },
  { gsm: "160–200", name: "Standard", season: "Year-Round Retail", market: "USA · UK · EU · Global baseline", pct: 80, desc: "The industry standard — single jersey and piqué at this weight cover the majority of global fashion retail and promotional programmes. Balanced drape, decoration receptivity and price.", color: "bg-gold", featured: true },
  { gsm: "200–280", name: "Heavyweight / Structured", season: "Autumn / Winter & Technical", market: "USA workwear · Canada · N. Europe · Premium", pct: 45, desc: "Interlock, rib (1×1, 2×2) and waffle knit at this weight deliver structural rigidity, premium hand-feel and thermal properties. Favoured by premium brands and cold-climate markets.", color: "bg-indigo-500" },
];

const DECO_METHODS = [
  { code: "SCR", method: "Screen Print", best: "Multi-colour graphics, brand artwork, fashion programmes", compat: ["Single Jersey", "Piqué", "Interlock"], note: "Soft-hand inks for textured constructions" },
  { code: "DTG", method: "Digital / DTG", best: "Photo-quality imagery, small runs, personalisation", compat: ["Single Jersey", "Interlock"], note: "Not suitable for textured or open constructions" },
  { code: "EMB", method: "Embroidery", best: "Logo marks, premium branding — all constructions", compat: ["All Constructions"], note: "Best on piqué and interlock surfaces" },
  { code: "HT", method: "Heat Transfer", best: "Clean edges, sport & athleisure detail", compat: ["Single Jersey", "Rib"], note: "Not recommended for mesh or waffle" },
  { code: "SUB", method: "Sublimation Print", best: "All-over photographic, performance fabrics", compat: ["Mesh / Eyelet", "Polyester Blends"], note: "Polyester content ≥ 80% required" },
  { code: "APL", method: "Appliqué", best: "Fabric patches, raised detail, streetwear", compat: ["Single Jersey", "Interlock"], note: "Additional lead time for patch cutting" },
  { code: "RPF", method: "Rubber / Puff Print", best: "3D raised effect, streetwear and sport", compat: ["Single Jersey", "Piqué"], note: "Specialist ink — higher cost, minimum run applies" },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Standard / PMS Matched", note: "Full PMS colour range. Lab dip approval before bulk production.", swatches: ["bg-red-400", "bg-blue-500", "bg-emerald-500", "bg-yellow-400", "bg-purple-500"] },
  { name: "Yarn-Dyed", subtitle: "Stripe & Colour-Block", note: "Contrast panel designs. Higher minimum quantities, longer lead times.", swatches: ["bg-slate-700", "bg-red-600", "bg-amber-500", "bg-teal-500", "bg-slate-400"] },
  { name: "Garment Dye", subtitle: "Vintage / Washed Tones", note: "Popular in USA premium streetwear. Organic cotton compatible.", swatches: ["bg-stone-300", "bg-stone-400", "bg-stone-500", "bg-stone-600", "bg-slate-500"] },
  { name: "Organic / Low-Impact", subtitle: "GOTS Certified", note: "OEKO-TEX certified chemicals only. No harmful substances.", swatches: ["bg-green-200", "bg-green-400", "bg-emerald-300", "bg-lime-300", "bg-teal-300"] },
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
  { num: "01", title: "Fabric & Construction Spec", desc: "Choose from 7 constructions. Specify fibre blend, GSM, yarn count and combing specification. Sourced to exact spec from certified Pakistan factories." },
  { num: "02", title: "PMS Colour Matching", desc: "Full PMS range across all reactive-dyed constructions. Lab dip submitted for buyer approval before bulk. ISO 105 X12 colour fastness maintained." },
  { num: "03", title: "Fit & Size Development", desc: "Six standard fit profiles — Regular, Slim, Oversized, Athletic, Women's Cut, Unisex. Custom graded size ranges from XS to 5XL to your spec." },
  { num: "04", title: "Decoration Management", desc: "Seven decoration methods available. Artwork managed to your brand guidelines — from approved artwork files through to pre-production strike-off approval." },
  { num: "05", title: "Label & Branding Package", desc: "Woven neck labels, care labels, hem labels, hang tags, size tabs — all produced to your brand specification and season requirements." },
  { num: "06", title: "Retail-Ready Packaging", desc: "Polybag, board fold, hanger + polybag, retail box, vacuum packing — tailored to your retail, e-commerce or wholesale fulfilment needs." },
];

const SECTORS = [
  { abbr: "FR", name: "Fashion Retail", detail: "USA, UK, EU chains and independent brands seeking OEM production", market: "USA · UK · EU", color: "border-emerald-500" },
  { abbr: "EC", name: "E-Commerce / DTC", detail: "Direct-to-consumer and online-first retailers requiring flexible packaging", market: "Global", color: "border-blue-500" },
  { abbr: "CR", name: "Corporate & Promotional", detail: "Branded staff uniforms, corporate gifting and promotional programmes", market: "Worldwide", color: "border-purple-500" },
  { abbr: "AT", name: "Athletic & Gym", detail: "Gymwear, athleisure and performance retail across all markets", market: "USA · UK · Australia", color: "border-rose-500" },
  { abbr: "SW", name: "Streetwear & Youth", detail: "Oversized and contemporary streetwear brands, youth fashion", market: "EU · USA · East Asia", color: "border-amber-500" },
  { abbr: "WS", name: "Wholesale Distribution", detail: "Multi-brand wholesale distributors supplying regional retail networks", market: "USA · EU · Middle East", color: "border-teal-500" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight to your port. Buyer arranges own marine insurance." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all inland and ocean logistics from factory gate. Lowest quoted price." },
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
  { stage: "Sample Production", days: "15–20", desc: "Pre-production samples to specification", color: "bg-blue-500" },
  { stage: "Bulk Production", days: "45–65", desc: "From confirmed PO and approved sample", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection before vessel loading", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "20–30", desc: "FCL/LCL from Karachi or Port Qasim", color: "bg-teal-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton available across all standard constructions. Fully traceable from farm to finished garment.", tag: "GOTS" },
  { icon: "💧", title: "Water Efficiency", desc: "Enzyme washing replaces stone washing — significantly lower water consumption and zero stone dust waste.", tag: "Process" },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester blends available on request for performance and blended construction programmes.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited factories. Worker welfare, safety and fair wage compliance independently verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "Reactive dyeing with OEKO-TEX certified chemicals only. No azo dyes, no restricted substances in finished garment.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags, FSC-certified paper hangtags and retail boxes available on request for any programme size.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction, GSM, fit, decoration, quantity and target delivery via our RFQ form." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "Knitwear factories shortlisted by construction capability, GSM range and certification status. Competitive pricing in 3–5 working days." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Pre-production samples produced to your specification. 15–20 days from spec lock and fabric approval." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review construction, colour, decoration, label and fit. Revise as required before purchase order." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Fabric cut, production commences. Duration depends on construction, quantity and factory scheduling." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection, packing and loading. FCL or LCL from Karachi or Port Qasim." },
];

const FAQS = [
  { q: "What fabric construction should I specify for a basic fashion t-shirt?", a: "Single jersey 160–180 GSM combed cotton is the global default for fashion t-shirts. Ring-spun combed single jersey at this weight delivers the smoothest hand-feel, best print fidelity and most competitive price. For a premium retail positioning, 180–200 GSM combed cotton or interlock provides a more structured feel and a heavier drape." },
  { q: "Can I get GOTS certified organic cotton t-shirts from Pakistan?", a: "Yes. Pakistan has GOTS-certified mills for single jersey, interlock and piqué constructions. Organic cotton t-shirts carry a price premium of approximately 15–25% over conventional cotton. Specify GOTS as a hard requirement in your RFQ — we match you with certified factories only." },
  { q: "What is the difference between screen print and DTG for t-shirts?", a: "Screen print uses physical mesh screens and is cost-effective for large quantities with limited colours (typically up to 6–8). DTG is digital inkjet printing — ideal for photo-quality, full-colour imagery and small runs, but requires 100% cotton or high-cotton single jersey for best ink adhesion. Above 300 pieces with up to 6 colours, screen print typically wins on cost." },
  { q: "How do I plan my order quantity for a t-shirt programme?", a: "Order quantities vary by construction, colour count, size ratio and decoration method. There is no universal minimum. The best approach is to include your target quantity per style and colour in your RFQ. We match you with factories whose scheduling and capacity align with your programme, and advise on the most efficient quantity structure per specification." },
  { q: "Which construction is best for sublimation printing?", a: "Sublimation requires polyester content of at least 80% to achieve vibrant, durable colour. Mesh / eyelet in a polyester or polyester-cotton blend is the best match — the open construction and polyester fibre combination delivers maximum colour saturation and ventilation. Sublimation is not suitable for cotton-dominant constructions." },
  { q: "What size standards are available for Pakistan-manufactured t-shirts?", a: "We can produce to US (S/M/L/XL/2XL/3XL), UK, EU and custom graded specifications. All garments are graded from a buyer-approved counter sample or tech pack. US sizing is the default — specify UK or EU grading explicitly in your RFQ if required." },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function TShirtsContent() {
  const [activeConstruction, setActiveConstruction] = useState("single-jersey");
  const [activeFit, setActiveFit] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-t-shirts.webp" fill alt="Pakistan t-shirt manufacturer — OEM cotton t-shirts for brands and retailers in USA, UK and Europe" className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
            <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">›</span>
              <Link href="/apparel/knittedgarments/" className="hover:text-gold transition-colors">Knitted Garments</Link>
              <span aria-hidden="true">›</span>
              <span className="text-gold">T-Shirts</span>
            </motion.nav>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Knitwear Export</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              T-Shirt<br /><span className="text-gold">Manufacturer</span><br />Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading connects international brands with Pakistan&rsquo;s certified knitwear factories. Single jersey, piqué, interlock, rib, waffle knit and mesh t-shirts. GOTS, OEKO-TEX, BSCI certified. FOB / CIF export to USA, UK and Europe.
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
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">T-Shirt Sourcing — Pakistan Knitwear Mills</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">T-Shirt Sourcing Excellence — 7 Constructions, Worldwide Delivery</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">Single jersey, interlock, piqué and specialty constructions produced in Pakistan&rsquo;s certified knitwear belt. T-shirt programmes — any GSM band, any decoration method, any certification — placed with verified factories and managed from spec to shipment.</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[{ val: "50+", label: "Vetted Factories" }, { val: "35+", label: "Export Markets" }, { val: "10+", label: "Certifications" }, { val: "7", label: "Constructions" }].map((s) => (
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
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-emerald-700 text-xs font-semibold tracking-[0.2em] uppercase">Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">7 Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3 border border-emerald-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    {c.badge && <span className="mt-1 inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Fits</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">6 Fit Profiles</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {FIT_PROFILES.map((f) => (
                  <div key={f.code} className="bg-white rounded-xl px-4 py-2.5 border border-orange-100 flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg ${f.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>{f.code}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{f.name}</p>
                      <p className="text-xs text-gray-400">{f.ease}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-fits" label="Explore Fit Profiles" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-zinc-100 border border-zinc-200 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-zinc-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Tiers</h3>
              <div className="flex flex-col gap-2 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-lg p-2.5 border border-zinc-200">
                    <div className="flex justify-between mb-1"><span className="text-xs font-bold text-navy-900">{t.gsm}</span>{t.featured && <span className="text-[9px] font-semibold text-gold">Popular</span>}</div>
                    <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden"><div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" /></div>
                    <p className="text-[10px] text-zinc-500 mt-1">{t.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View Weight Guide" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="bg-pink-50 border border-pink-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🖨️</span>
              <p className="text-pink-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">7 Print Methods</h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 border border-pink-50">
                    <span className="w-6 h-6 rounded bg-pink-100 text-pink-700 text-[9px] font-bold flex items-center justify-center shrink-0">{d.code}</span>
                    <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decoration" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }} className="bg-violet-50 border border-violet-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-violet-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-2.5 border border-violet-100">
                    <p className="text-xs font-semibold text-navy-900 mb-1">{d.name}</p>
                    <div className="flex gap-1.5">{d.swatches.map((s, i) => <div key={i} className={`w-4 h-4 rounded-full ${s}`} aria-hidden="true" />)}</div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colors" label="Explore Colors" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }} className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-cyan-700 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM Programs</h3>
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

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-2 bg-[#1e293b] border border-slate-700 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-slate-400 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-white mt-0.5">6 Industry Sectors</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className={`bg-white/5 rounded-xl p-3 border-l-2 ${s.color}`}>
                    <p className="text-xs font-bold text-white/50">{s.abbr}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{s.name}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollToId("section-markets")} className="self-start inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-yellow-300 transition-colors mt-auto pt-2">View All Markets <span aria-hidden="true">→</span></button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-2 bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-amber-700 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">10 Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-xl border border-amber-100 flex items-center justify-center p-2" style={{ height: 52 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={72} height={40} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-1 bg-sky-50 border border-sky-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 border border-sky-100">
                    <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <div><p className="text-xs font-semibold text-navy-900">{e.full}</p><p className="text-[10px] text-gray-400">{e.port}</p></div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-2 bg-stone-50 border border-stone-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌿</span>
                <div>
                  <p className="text-stone-600 text-xs font-semibold tracking-[0.2em] uppercase">Ethics</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Sustainable Sourcing</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {SUSTAINABILITY_ITEMS.map((s) => (
                  <div key={s.title} className="bg-white rounded-xl p-3 border border-stone-200 flex flex-col gap-1">
                    <span className="text-base" aria-hidden="true">{s.icon}</span>
                    <p className="text-sm font-semibold text-navy-900">{s.title}</p>
                    <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full w-fit">{s.tag}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }} className="lg:col-span-1 bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.short}</p>
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
              <p className="font-semibold text-navy-900">T-Shirt Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction guide, GSM selection and market positioning for international buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Knitwear Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times, certification requirements and factory audit overview.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Spec Sheets &amp; Size Charts</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction spec sheets, size charts and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source T-Shirts?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, GSM, fit and print method. RFQ to factory quotation: 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS — MINIMAL UI (expandable spec list) */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase mb-4">01 / Fabric Constructions</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-6">Seven Constructions</h2>
            <div className="w-12 h-0.5 bg-gold mb-6" aria-hidden="true" />
            <p className="text-gray-500 leading-relaxed">Each construction delivers a distinct hand-feel, weight range, market position and decoration profile. Select the construction that matches your programme requirements.</p>
          </div>
          <div className="border-t-2 border-navy-900 divide-y divide-gray-100">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <button
                  onClick={() => setActiveConstruction(activeConstruction === c.id ? "" : c.id)}
                  aria-expanded={activeConstruction === c.id}
                  className={`w-full flex items-start gap-6 py-6 text-left transition-colors group ${activeConstruction === c.id ? "bg-gray-50" : "hover:bg-gray-50/60"}`}
                >
                  <span className="w-8 shrink-0 text-xs font-mono text-gray-300 pt-0.5">0{i + 1}</span>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                    <div>
                      <p className="text-lg font-semibold text-navy-900">{c.name}</p>
                      {c.badge && <span className="mt-1 inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">{c.badge}</span>}
                    </div>
                    <p className="text-sm text-gray-400">{c.gsm}</p>
                    <p className="text-sm text-gray-500 hidden sm:block">{c.best.join(" · ")}</p>
                  </div>
                  <span className="relative shrink-0">
                    {activeConstruction !== c.id && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                      </span>
                    )}
                    <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-all ${activeConstruction === c.id ? "border-gold bg-gold text-navy-900" : "border-gray-200 text-gray-400"}`} aria-hidden="true">{activeConstruction === c.id ? "−" : "+"}</span>
                  </span>
                </button>
                <AnimatePresence>
                  {activeConstruction === c.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="pl-14 pb-8 pr-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2">
                            <p className="text-gray-600 leading-relaxed mb-6">{c.detail}</p>
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Technical Specification</p>
                              <p className="text-sm text-gray-700">{c.spec}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Hand Feel</p>
                              <p className="text-sm text-navy-900">{c.hand}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Key Markets</p>
                              <div className="flex flex-wrap gap-1.5">{c.markets.map((m) => <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">{m}</span>)}</div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Decoration Options</p>
                              <div className="flex flex-wrap gap-1.5">{c.decorations.map((d) => <span key={d} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{d}</span>)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 2 — FITS — SPLIT-SCREEN UI */}
      <section id="section-fits" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fit &amp; Sizing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Six Fit Profiles for Six Market Positions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <div className="bg-[#0D1B2A] divide-y divide-white/10">
              {FIT_PROFILES.map((f, i) => (
                <button key={f.code} onClick={() => setActiveFit(i)} className={`w-full flex items-center gap-5 px-8 py-5 text-left transition-all ${activeFit === i ? "bg-white/10" : "hover:bg-white/5"}`}>
                  <span className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{f.code}</span>
                  <div className="flex-1">
                    <p className={`font-semibold transition-colors ${activeFit === i ? "text-white" : "text-gray-300"}`}>{f.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{f.ease}</p>
                  </div>
                  {activeFit === i && <span className="w-2 h-2 rounded-full bg-gold shrink-0" aria-hidden="true" />}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeFit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }} className="bg-white p-10 flex flex-col justify-center gap-6">
                <div>
                  <span className={`inline-flex w-12 h-12 rounded-xl ${FIT_PROFILES[activeFit].color} text-white text-sm font-bold items-center justify-center mb-4`} aria-hidden="true">{FIT_PROFILES[activeFit].code}</span>
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">{FIT_PROFILES[activeFit].name}</h3>
                  <p className="text-gold font-semibold text-sm mb-4">{FIT_PROFILES[activeFit].ease}</p>
                </div>
                <p className="text-gray-600 leading-relaxed">{FIT_PROFILES[activeFit].detail}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Primary Market</p>
                  <p className="text-sm text-navy-900 font-medium">{FIT_PROFILES[activeFit].market}</p>
                </div>
                <ul className="space-y-2">
                  {["XS–3XL standard size range", "US / UK / EU size standards available", "Custom graded spec on request"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 3 — GSM — BRUTALIST UI */}
      <section id="section-gsm" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-4 border-navy-900 p-8 mb-12">
            <p className="text-xs font-black tracking-[0.4em] uppercase text-gray-400 mb-2">WEIGHT SELECTION GUIDE</p>
            <h2 className="text-5xl sm:text-7xl font-black text-navy-900 leading-none">GSM</h2>
            <p className="text-sm text-gray-600 mt-4 max-w-xl leading-relaxed">GSM determines season positioning, decoration receptivity, drape and retail price tier. Select your weight before specifying construction.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-4 border-navy-900 mb-12">
            {GSM_TIERS.map((tier, i) => (
              <div key={tier.gsm} className={`p-8 ${i < 2 ? "border-b-4 sm:border-b-0 sm:border-r-4 border-navy-900" : ""} ${tier.featured ? "bg-navy-900 text-white" : "bg-white"}`}>
                {tier.featured && <span className="inline-block mb-3 text-[10px] font-black tracking-[0.3em] uppercase bg-gold text-navy-900 px-3 py-1">MOST ORDERED</span>}
                <p className={`text-4xl font-black mb-1 ${tier.featured ? "text-gold" : "text-navy-900"}`}>{tier.gsm}</p>
                <p className={`text-xs font-black tracking-[0.2em] uppercase mb-4 ${tier.featured ? "text-gray-300" : "text-gray-400"}`}>{tier.name}</p>
                <div className={`w-full h-3 mb-4 ${tier.featured ? "bg-white/20" : "bg-gray-200"}`}>
                  <div className={`h-full ${tier.featured ? "bg-gold" : "bg-navy-900"}`} style={{ width: `${tier.pct}%` }} aria-hidden="true" />
                </div>
                <p className={`text-sm font-bold mb-2 ${tier.featured ? "text-white" : "text-navy-900"}`}>{tier.season}</p>
                <p className={`text-sm leading-relaxed mb-3 ${tier.featured ? "text-gray-300" : "text-gray-600"}`}>{tier.desc}</p>
                <p className={`text-xs font-semibold ${tier.featured ? "text-gold" : "text-emerald-600"}`}>{tier.market}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-4 border-navy-900">
            {[["120 GSM", "Minimum — mesh/eyelet"], ["160 GSM", "Lightweight standard"], ["200 GSM", "Thermal threshold"], ["280 GSM", "Maximum — rib/waffle"]].map(([val, label], i) => (
              <div key={val} className={`p-6 ${i < 3 ? "border-r-4 border-navy-900" : ""}`}>
                <p className="text-2xl font-black text-navy-900">{val}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 4 — DECORATION — RETAIL UI */}
      <section id="section-decoration" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Decoration</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Seven Print &amp; Decoration Methods</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">From mass-market screen printing to premium puff embroidery — each method serves a distinct programme type, price tier and construction.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
            {DECO_METHODS.map((d, i) => (
              <motion.div key={d.code} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-gold transition-all">
                <div className="h-1.5 bg-navy-900" aria-hidden="true" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-navy-900 text-gold text-xs font-bold flex items-center justify-center shrink-0">{d.code}</span>
                    <h3 className="font-bold text-navy-900">{d.method}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{d.best}</p>
                  <div className="mb-3">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Compatible with</p>
                    <div className="flex flex-wrap gap-1">{d.compat.map((c) => <span key={c} className="text-[11px] bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{c}</span>)}</div>
                  </div>
                  <p className="text-[11px] text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">{d.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 grid sm:grid-cols-3 gap-8">
            {[["Left Chest", "Primary brand mark — logo, crest or embroidery"], ["Full Front / Back", "Fashion graphics, large-format artwork, campaign prints"], ["Sleeve / Hem", "Secondary brand mark, sport stripe, seasonal detail"]].map(([place, desc]) => (
              <div key={place}><p className="text-gold text-sm font-bold mb-1">{place}</p><p className="text-gray-300 text-sm">{desc}</p></div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 5 — COLOURS — GLASSMORPHISM */}
      <section id="section-colors" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-navy-900 to-[#1a0a2e]" aria-hidden="true" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold/8 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet-500/15 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Programs</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Full PMS Colour Range</h2>
          <p className="text-white/50 mb-12 max-w-2xl leading-relaxed">Every standard construction is available in full PMS colour matching. Lab dip approval submitted before bulk production. ISO 105 colour fastness compliance across all programmes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div key={d.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-6 flex flex-col gap-5 hover:bg-white/12 transition-colors">
                <div className="flex gap-2.5 flex-wrap">{d.swatches.map((s, idx) => <div key={idx} className={`w-8 h-8 rounded-full border-2 border-white/10 ${s}`} aria-hidden="true" />)}</div>
                <div>
                  <h3 className="text-base font-bold text-white">{d.name}</h3>
                  <p className="text-xs text-white/40 mt-0.5">{d.subtitle}</p>
                </div>
                <p className="text-sm text-white/65 leading-relaxed flex-1">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-2">
            {["bg-red-500","bg-rose-400","bg-orange-500","bg-amber-400","bg-yellow-400","bg-lime-400","bg-green-500","bg-emerald-500","bg-teal-500","bg-cyan-500","bg-sky-500","bg-blue-600","bg-indigo-600","bg-violet-600","bg-purple-600","bg-fuchsia-600","bg-pink-500","bg-slate-400","bg-gray-500","bg-stone-400","bg-zinc-600","bg-neutral-700","bg-slate-800","bg-black"].slice(0, 12).map((c, i) => (
              <div key={i} className={`h-8 sm:h-10 rounded-lg ${c} opacity-85`} aria-hidden="true" />
            ))}
          </div>
          <p className="text-white/30 text-xs mt-3 text-center">Illustrative palette — full PMS range available via reactive dyeing</p>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 6 — OEM — MATERIAL DESIGN */}
      <section id="section-oem" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM &amp; Custom</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Custom Development Programs</h2>
              <p className="text-gray-500 leading-relaxed mb-8">Every aspect of your t-shirt programme — fabric, fit, colour, decoration, label, packaging — can be specified to your brand requirements.</p>
              <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/20">Start Your Programme <span aria-hidden="true">→</span></Link>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OEM_FEATURES.map((f, i) => (
                <motion.div key={f.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="bg-white rounded-2xl p-6 shadow-md shadow-gray-200/80 hover:shadow-lg transition-all border-b-2 border-transparent hover:border-gold">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-xl bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">{f.num}</span>
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

      {/* SECTION 7 — MARKETS — DARK MODE UI */}
      <section id="section-markets" className="bg-[#0a0a0a] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Industry Sectors</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Who Buys Pakistan T-Shirts</h2>
              <p className="text-white/40 leading-relaxed">T-shirts are ordered across fashion, corporate, athletic and promotional segments. Each sector has distinct construction, fit and decoration requirements.</p>
            </div>
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="text-center">
                <p className="text-7xl sm:text-9xl font-black text-white/8 leading-none select-none">35+</p>
                <p className="text-sm font-semibold text-gold -mt-4">Export Markets Served</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTORS.map((s, i) => (
              <motion.div key={s.abbr} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className={`border-l-4 ${s.color} bg-white/5 rounded-r-2xl p-6 hover:bg-white/8 transition-colors`}>
                <p className="text-xs font-bold text-white/30 mb-1">{s.abbr}</p>
                <h3 className="text-lg font-bold text-white mb-2">{s.name}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-3">{s.detail}</p>
                <span className="inline-block text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">{s.market}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 8 — CERTIFICATIONS — PRODUCT SHOWCASE UI */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Certifications</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">10 Active Certifications</h2>
              <p className="text-gray-500 mt-3 max-w-xl leading-relaxed">Our factory network holds every certification demanded by USA, UK and European buyers. All sourced from independently audited facilities.</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-5xl font-black text-navy-900">10<span className="text-gold">+</span></p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Active Certifications</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="flex items-start gap-5 p-6 border border-gray-100 rounded-2xl hover:border-gold hover:shadow-md transition-all group">
                <div className="w-16 h-16 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0 p-2 group-hover:border-gold/30 transition-colors">
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={56} height={48} className="object-contain w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-navy-900">{c.full}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.tier === "Premium" ? "bg-gold/10 text-gold" : c.tier === "Optional" ? "bg-gray-100 text-gray-500" : "bg-emerald-50 text-emerald-700"}`}>{c.tier}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 9 — EXPORT — GRID UI */}
      <section id="section-export" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export &amp; Packaging</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Incoterms, Packaging &amp; Indicative Timeline</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Incoterms Available</p>
              <div className="grid grid-cols-2 gap-3">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gold transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-10 h-10 rounded-lg bg-navy-900 text-gold text-xs font-bold flex items-center justify-center">{e.term}</span>
                      <p className="text-xs font-semibold text-navy-900 leading-tight">{e.full}</p>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{e.port}</p>
                    <p className="text-xs text-gray-600 leading-snug">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Packaging Options</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PACK_OPTIONS.map((p) => (
                  <div key={p.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-gold transition-colors">
                    <span className="text-2xl mb-2 block" aria-hidden="true">{p.icon}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{p.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Indicative Production &amp; Delivery Timeline</p>
            <div className="flex flex-col sm:flex-row gap-0">
              {LEAD_STAGES.map((s, i) => (
                <div key={s.stage} className={`flex-1 ${i < LEAD_STAGES.length - 1 ? "border-b-2 sm:border-b-0 sm:border-r-2 border-gray-100 pb-4 sm:pb-0 sm:pr-4 mb-4 sm:mb-0 sm:mr-4" : ""}`}>
                  <div className={`w-8 h-8 rounded-lg ${s.color} text-white text-[10px] font-bold flex items-center justify-center mb-3`}>{String(i + 1).padStart(2, "0")}</div>
                  <p className="text-sm font-bold text-navy-900 mb-1">{s.stage}</p>
                  <p className="text-xs font-semibold text-gold mb-1">{s.days} days</p>
                  <p className="text-xs text-gray-500 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
              <span className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true">⚠</span>
              <p className="text-xs text-amber-800 leading-relaxed"><strong>Indicative durations only.</strong> Actual timelines depend on construction, quantity, factory scheduling and freight routing. These figures are guide durations, not contractual commitments.</p>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 10 — SUSTAINABILITY — MODULAR UI */}
      <section id="section-sustainability" className="bg-[#F6FAF6] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-700 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Responsible T-Shirt Sourcing</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Our sustainability programme covers the full supply chain — from organic fibre sourcing through to eco packaging. Each pillar is independently certified or verifiable.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white border border-emerald-100 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md hover:border-emerald-200 transition-all">
                <div className="flex items-start justify-between">
                  <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">{s.tag}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 bg-navy-900 rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability on Demand</p>
              <p className="text-white font-semibold">Specify sustainability requirements in your RFQ — we match you with certified factories that meet your programme needs.</p>
            </div>
            <Link href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap">Request a Quote →</Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 11 — PROCESS — INDUSTRIAL UI */}
      <section id="section-process" className="bg-[#1a1a1a] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">From RFQ to Delivery</h2>
          <p className="text-white/40 mb-16 max-w-xl leading-relaxed">A systematic, managed process from initial specification through to door delivery — designed to remove risk from international sourcing.</p>
          <div className="hidden lg:flex items-start gap-0 mb-16">
            {PROCESS_STEPS.map((p, i) => (
              <div key={p.num} className="flex-1 relative">
                <div className="flex items-center">
                  <div className={`w-12 h-12 flex items-center justify-center text-sm font-black shrink-0 ${i % 2 === 0 ? "bg-gold text-navy-900" : "bg-white/10 text-gold border border-white/20"}`}>{p.num}</div>
                  {i < PROCESS_STEPS.length - 1 && <div className="flex-1 h-0.5 bg-white/20" aria-hidden="true" />}
                </div>
                <div className="mt-4 pr-4">
                  <p className="text-white font-bold mb-1">{p.title}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex lg:hidden flex-col gap-0 mb-12 border-l-2 border-white/10 pl-8 ml-6">
            {PROCESS_STEPS.map((p, i) => (
              <div key={p.num} className="relative pb-8 last:pb-0">
                <div className={`absolute -left-11 w-8 h-8 flex items-center justify-center text-xs font-black ${i % 2 === 0 ? "bg-gold text-navy-900" : "bg-white/10 text-gold border border-white/20"}`}>{p.num}</div>
                <h3 className="font-bold text-white mb-1">{p.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[["50+", "Vetted Factories"], ["95%", "On-Time Delivery"], ["3–5 days", "Quotation Turnaround"]].map(([val, label]) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <p className="text-2xl font-black text-gold">{val}</p>
                <p className="text-xs text-white/40 mt-1">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-12">Frequently Asked Questions</h2>
          <div className="divide-y divide-gray-100">
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
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${faqOpen === i ? "border-gold bg-gold text-navy-900" : "border-gray-200 text-gray-400 group-hover:border-gold"}`}>{faqOpen === i ? "−" : "+"}</span>
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
              { name: "Polo Shirts", desc: "Classic piqué, mini piqué and jersey polo. Corporate, golf and hospitality programmes.", href: "/apparel/knittedgarments/poloshirts/", img: "/images/hero/hero-polo-shirts.webp", alt: "Pakistan polo shirt manufacturer — OEM piqué and performance polo for corporate and sports brands worldwide" },
              { name: "Henley Shirts", desc: "Four constructions — single jersey to waffle knit. Casual and performance programmes.", href: "/apparel/knittedgarments/henleyshirts/", img: "/images/hero/hero-henley-shirts.webp", alt: "Pakistan henley shirt manufacturer — OEM single jersey and waffle knit henleys for casual and workwear programmes" },
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Source T-Shirts from Pakistan&rsquo;s Certified Factories</h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">Casual lifestyle, activewear, corporate uniform or promotional — t-shirt programmes of any construction and volume sourced from Pakistan&rsquo;s certified knitwear factories. Submit the spec and receive a factory match with quotation within 3–5 working days.</p>
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
