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
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} aria-hidden="true">↑</motion.span>
        Back to overview
      </button>
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
    id: "quilted",
    name: "Quilted Cotton",
    badge: "Retail Standard",
    temp: "120–150°C",
    fill: "200–300 GSM cotton wadding, 2–3 layers",
    hand: "Firm, padded — classic hand feel with dimensional quilted pattern",
    best: ["Kitchenware Retail", "Gift Sets", "Branded Programmes"],
    markets: ["USA", "UK", "EU", "Australia"],
    decoration: ["Screen Print", "Embroidery", "Heat Transfer"],
    detail:
      "Quilted cotton is the standard construction for retail kitchen textiles globally — the multi-layer quilted shell with cotton wadding delivers effective heat protection for domestic oven use while providing a premium, textural surface ideal for pattern printing and brand decoration. The quilted grid pattern can be customised — diamond, square, diagonal or custom stitch patterns available. Shell fabric options include plain cotton, printed cotton and dobby weave.",
    spec: "100% cotton outer shell with 200–300 GSM cotton wadding. 2–3 fill layers. Quilted in 4×4 cm or 5×5 cm grid. OEKO-TEX Standard 100. Machine wash 40°C.",
  },
  {
    id: "silicone",
    name: "Silicone-Lined",
    badge: "High Heat",
    temp: "200–220°C",
    fill: "Quilted cotton outer + food-grade silicone inner liner",
    hand: "Firm outer, non-slip silicone grip — EN407 compliant",
    best: ["Commercial Kitchens", "Professional Chef", "Foodservice"],
    markets: ["USA", "Canada", "UK", "EU", "Australia"],
    decoration: ["Embroidery", "Screen Print"],
    detail:
      "Silicone-lined pot holders combine a quilted cotton outer construction with a food-grade silicone inner layer. The silicone provides superior resistance to heat transfer and a non-slip grip surface — eliminating the pot-slip risk of fabric-only designs. The construction is the preferred specification for commercial kitchen and professional chef programmes. Silicone inner is removable on some configurations for independent washing.",
    spec: "100% cotton outer shell. Food-grade silicone inner liner 3–4 mm. Contact heat protection to 200–220°C. Non-slip grip surface. OEKO-TEX outer fabric. Machine wash 40°C outer; hand-wash inner.",
  },
  {
    id: "terry",
    name: "Terry Cotton",
    badge: "Foodservice Grade",
    temp: "100–120°C",
    fill: "Double terry loop, no additional fill required",
    hand: "Soft, absorbent — dual function (heat protection + spill management)",
    best: ["Restaurants", "Catering", "Institutional Kitchens"],
    markets: ["USA", "Middle East", "South America"],
    decoration: ["Embroidery"],
    detail:
      "Terry cotton pot holders use the natural insulating properties of looped pile construction rather than quilted fill — a simpler, lower-cost construction producing effective heat protection for everyday kitchen tasks. Double-faced terry (looped on both sides) provides the best protection and absorbs incidental spills. The construction is durable through repeated commercial laundering and is the preferred specification for foodservice and institutional buyers where function supersedes decoration.",
    spec: "100% cotton double terry. 400–500 GSM. Reactive dyed or bleach-white. Coloured hem binding options. Machine wash 60°C. OEKO-TEX Standard 100.",
  },
  {
    id: "silicone-glove",
    name: "Silicone Glove",
    badge: "Max Protection",
    temp: "230–250°C",
    fill: "Full food-grade silicone body with non-woven inner lining",
    hand: "Rigid non-slip silicone shell — maximum heat isolation",
    best: ["Grilling / BBQ", "Industrial Food Processing", "Premium Kitchenware"],
    markets: ["USA", "Australia", "EU", "Canada"],
    decoration: ["Moulded Logo (silicone)", "Hang Tag Branding"],
    detail:
      "Full silicone oven gloves provide the highest contact heat protection of all constructions — typically rated to 230–250°C. The ergonomic three-dimensional silicone shell envelops the hand and forearm for comprehensive protection. The non-woven inner lining ensures comfortable direct skin contact. Popular in premium kitchenware retail ranges and outdoor BBQ/grilling equipment programmes. Logo moulding is built directly into the silicone tooling.",
    spec: "Food-grade silicone body. Non-woven inner. Contact heat to 230–250°C. Waterproof. Dishwasher safe. Available EN407 certified.",
  },
];

const STYLES = [
  { code: "SQ", name: "Square Pot Holder", dims: "18×18 cm – 22×22 cm", use: "Universal kitchen use — the standard retail format. Pairs sold in sets.", icon: "🟥" },
  { code: "MG", name: "Standard Mitt / Gauntlet", dims: "28–32 cm length", use: "Single mitt fits either hand. Most common retail and foodservice format.", icon: "🧤" },
  { code: "DG", name: "Double Gauntlet", dims: "38–45 cm length", use: "Extended forearm protection — commercial kitchen and professional specification.", icon: "🦺" },
  { code: "SG", name: "Silicone Glove", dims: "To spec", use: "Full silicone body. BBQ, grilling and premium kitchenware programmes.", icon: "🔥" },
];

const HEAT_RATINGS = [
  { rating: "EN 407", name: "European Heat Protection", desc: "Six-parameter heat protection standard. Required for EU retail claims.", level: 3 },
  { rating: "ASTM F1060", name: "US Contact Heat", desc: "US standard for conductive heat protection in gloves and mitts.", level: 3 },
  { rating: "120–150°C", name: "Quilted Cotton Range", desc: "Standard domestic oven use. Suitable for retail kitchenware programmes.", level: 1 },
  { rating: "200–220°C", name: "Silicone-Lined Range", desc: "Commercial kitchen and professional chef specification.", level: 2 },
  { rating: "230–250°C", name: "Full Silicone Range", desc: "Maximum protection. Grilling, BBQ and industrial food processing.", level: 3 },
];

const DECORATION = [
  { method: "Screen Print", desc: "Bold pattern and brand artwork on quilted face. Best on plain cotton shell.", compat: "Quilted Cotton, Terry" },
  { method: "Embroidery", desc: "Logo mark on cuff, face or binding tape. All constructions.", compat: "All Constructions" },
  { method: "Heat Transfer", desc: "Photo-quality print on smooth cotton shell. Foil and metallic options.", compat: "Quilted Cotton" },
  { method: "Moulded Silicone", desc: "Logo embedded in silicone tooling. Permanent, no fading.", compat: "Full Silicone Glove" },
];

const FILL_SPECS = [
  { layer: "Outer Shell", spec: "100% cotton — plain, printed or dobby weave", gsm: "150–220 GSM" },
  { layer: "Fill Layer 1", spec: "Cotton wadding — primary insulation", gsm: "200–300 GSM" },
  { layer: "Fill Layer 2", spec: "Cotton wadding — secondary insulation (multi-layer)", gsm: "200–300 GSM" },
  { layer: "Silicone Liner", spec: "Food-grade silicone — high-heat option", gsm: "3–4 mm" },
  { layer: "Inner Lining", spec: "100% cotton lining — skin-contact comfort", gsm: "150–180 GSM" },
  { layer: "Binding", spec: "Cotton bias tape — coloured or matching shell", gsm: "Standard" },
];

const OEM_FEATURES = [
  { num: "01", title: "Construction Selection", desc: "Quilted cotton, silicone-lined, terry or full silicone to end-use specification." },
  { num: "02", title: "Style & Size", desc: "Square pot holder, standard mitt, double gauntlet or custom dimensions." },
  { num: "03", title: "Shell Pattern", desc: "Plain, printed or dobby weave outer. Quilting grid and stitch pattern customisable." },
  { num: "04", title: "Decoration", desc: "Screen print, embroidery or heat transfer — artwork approval before bulk." },
  { num: "05", title: "Colour Programme", desc: "Solid, printed or coordinated colour sets to match kitchen linen range." },
  { num: "06", title: "Retail Packaging", desc: "Hang tag, polybag, header card, pair-packed or gift boxed — to your specification." },
];

const SECTORS = [
  { abbr: "KW", name: "Kitchenware Retail", detail: "Branded pot holder sets and oven mitt ranges for kitchenware and homeware retailers", market: "USA · UK · EU · Australia" },
  { abbr: "GS", name: "Gift & Seasonal", detail: "Coordinated gift sets — pot holders, kitchen towels and aprons in matched packaging", market: "USA · UK · Canada" },
  { abbr: "FS", name: "Foodservice / Institutional", detail: "Terry and silicone-lined programmes for restaurant groups and institutional buyers", market: "USA · Middle East" },
  { abbr: "HB", name: "Homeware Brands", detail: "Own-brand kitchen linen ranges for department stores and online retailers", market: "USA · UK · EU" },
  { abbr: "WS", name: "Wholesale / Dist.", detail: "Bulk pack programmes for wholesale distributors and foodservice supply chains", market: "USA · Canada · Australia" },
  { abbr: "PR", name: "Premium / Gifting", detail: "Premium silicone-lined sets in coordinated gift boxes for corporate gifting", market: "UK · EU · Middle East" },
];

const CERTIFICATIONS = [
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", img: "/images/certs/cert-oeko-tex.webp", tier: "Standard" },
  { name: "GOTS", full: "Global Organic Textile Standard", img: "/images/certs/cert-gots.webp", tier: "Premium" },
  { name: "BSCI", full: "Business Social Compliance Initiative", img: "/images/certs/cert-bsci.webp", tier: "Standard" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", img: "/images/certs/cert-sedex.webp", tier: "Standard" },
  { name: "ISO 9001", full: "Quality Management System", img: "/images/certs/cert-iso-9001.webp", tier: "Standard" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", img: "/images/certs/cert-wrap.webp", tier: "Standard" },
  { name: "GRS", full: "Global Recycled Standard", img: "/images/certs/cert-grs.webp", tier: "Optional" },
  { name: "SA8000", full: "Social Accountability International", img: "/images/certs/cert-sa8000.webp", tier: "Premium" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim" },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port" },
  { term: "CFR", full: "Cost & Freight", port: "Destination port" },
  { term: "EXW", full: "Ex-Works", port: "Factory gate" },
];

const QUALITY_SPECS = [
  { test: "Contact Heat Resistance", standard: "EN 407 / ASTM F1060", result: "120–250°C (construction dependent)" },
  { test: "Colour Fastness — Washing", standard: "ISO 105-C06", result: "Grade 4+ at 40°C" },
  { test: "Colour Fastness — Rubbing", standard: "ISO 105-X12", result: "Grade 4 dry / Grade 3 wet" },
  { test: "Quilting Durability", standard: "Internal QC + visual inspection", result: "No delamination after 20 wash cycles" },
  { test: "Dimensional Stability", standard: "ISO 7771", result: "±3% shrinkage at 40°C wash" },
  { test: "pH Value", standard: "ISO 3071", result: "4.5–7.5 (skin-safe range)" },
];

const SUSTAINABILITY = [
  { icon: "🌱", title: "Organic Cotton Fill", desc: "GOTS-certified organic cotton wadding available across quilted programmes.", tag: "GOTS" },
  { icon: "💧", title: "Low-Water Dyeing", desc: "Reactive dyeing with OEKO-TEX certified chemistry — restricted azo-free.", tag: "OEKO-TEX" },
  { icon: "⚖️", title: "Ethical Production", desc: "BSCI and Sedex audited factories. Worker welfare independently verified.", tag: "BSCI / Sedex" },
  { icon: "📦", title: "Minimal Packaging", desc: "Recycled polybags and FSC-certified hang tag paper on request.", tag: "Optional" },
  { icon: "🔄", title: "Recycled Fill", desc: "GRS-certified recycled cotton fill option for programmes with recycled content requirements.", tag: "GRS" },
  { icon: "🌿", title: "BCI Cotton", desc: "Better Cotton Initiative programme cotton available for non-organic sustainable sourcing.", tag: "BCI" },
];

const PROCESS = [
  { num: "01", short: "RFQ Submission", desc: "Construction, style, size, fill specification, decoration, quantity and delivery date." },
  { num: "02", short: "Factory Shortlist", desc: "Certified kitchen linen factories with pot holder OEM experience matched to specification." },
  { num: "03", short: "Material Confirmation", desc: "Shell fabric, fill, silicone liner (if applicable) and binding colour confirmed." },
  { num: "04", short: "Pre-Production Sample", desc: "15–25 days from specification lock — decoration sample included for approval." },
  { num: "05", short: "Bulk Production", desc: "30–50 days from confirmed PO and approved sample." },
  { num: "06", short: "QC & Shipment", desc: "Pre-shipment inspection, heat protection spot-testing, export loading Karachi." },
];

const FAQS = [
  {
    q: "What constructions are available for OEM pot holders and oven mitts?",
    a: "Three primary constructions: quilted cotton (retail standard, 120–150°C protection), silicone-lined quilted (commercial kitchen specification, 200–220°C) and terry cotton (foodservice grade, dual-function heat and spill management). Full silicone glove is also available for grilling and high-heat applications to 230–250°C.",
  },
  {
    q: "What heat ratings are available and what do they mean?",
    a: "EN407 (European) and ASTM F1060 (US) are the primary heat protection standards. Quilted cotton provides protection to 120–150°C (domestic oven standard). Silicone-lined construction raises this to 200–220°C (professional kitchen standard). Full silicone gloves reach 230–250°C. EN407 testing certification is required for EU retail packaging heat protection claims.",
  },
  {
    q: "What styles of pot holders and oven mitts can be produced?",
    a: "Four standard styles: square pot holder (18–22 cm), standard mitt/gauntlet (28–32 cm length), double gauntlet (38–45 cm — forearm protection for commercial kitchens), and full silicone glove. All are available in custom sizes and configurations.",
  },
  {
    q: "Can pot holders be printed or embroidered with brand artwork?",
    a: "Yes. Screen printing on the quilted face, embroidery on face or cuff, and heat transfer are all available. Full silicone gloves use logo moulding embedded in the silicone tooling. Hang tags, woven labels and custom retail packaging complete the branded programme.",
  },
  {
    q: "What certifications should I require for pot holders in the EU or US market?",
    a: "EU buyers: OEKO-TEX Standard 100 (chemical safety), EN407 (if making heat protection claims), BSCI or Sedex (social compliance), GOTS for organic. US buyers: OEKO-TEX Standard 100 and ASTM F1060 (if making heat protection claims for commercial use). ISO 9001 covers production quality for both markets.",
  },
  {
    q: "What filling materials are used in quilted pot holders?",
    a: "Quilted pot holders use cotton wadding as the primary insulating fill — 200–300 GSM per layer, 2–3 layers for standard retail specification. The quilted construction locks wadding in place preventing bunching. Silicone-lined versions supplement the wadding with a food-grade silicone inner. GOTS organic and GRS recycled cotton fill options are available.",
  },
  {
    q: "Are pot holders machine washable?",
    a: "Yes. Quilted cotton and terry pot holders are machine washable at 40°C. Colour fastness meets ISO 105-C06 at 40°C as standard. Silicone-lined outer fabric is machine washable at 40°C; silicone inner is hand-wash recommended. Full silicone gloves are dishwasher safe.",
  },
  {
    q: "Can pot holders be sourced as part of a coordinated kitchen linen set?",
    a: "Yes. Pot holders are frequently sourced as part of a coordinated kitchen linen programme alongside kitchen towels, bar mops and aprons in matching construction, colour and decoration. A consolidated programme RFQ through MZ Global Trading allows batched production and simplified certification documentation across all kitchen linen items.",
  },
];

export default function PotHoldersContent() {
  const [activeC, setActiveC] = useState("quilted");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeC) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-home-textiles.webp"
            fill
            alt="Pakistan pot holders manufacturer — quilted cotton and silicone oven mitts for kitchenware retail and foodservice buyers in USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/kitchenlinen/" className="hover:text-gold transition-colors">Kitchen Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Pot Holders</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Kitchen Linen Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Pot Holders
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              OEM pot holders and oven mitts sourced from Pakistan&rsquo;s
              certified factories. Quilted cotton, silicone-lined and terry
              constructions. Square, mitt and gauntlet styles. EN407 heat
              ratings. OEKO-TEX, BSCI. Export to USA, UK, EU and worldwide.
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
                Explore Specifications
              </button>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Pot Holders — OEM Pakistan</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Four Constructions. Retail to Commercial Grade.
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s certified kitchen textile factories produce pot holder programmes across retail, gift and foodservice specifications — OEKO-TEX standard, EN407 heat ratings available, coordinated kitchen linen sets.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "4", label: "Constructions" },
                { val: "10+", label: "Certifications" },
                { val: "35+", label: "Export Markets" },
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">All Pot Holder Specifications</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full specification section below.</p>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-red-50 border border-red-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🔥</span>
                <div>
                  <p className="text-red-600 text-xs font-semibold tracking-[0.2em] uppercase">Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-red-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Max {c.temp}</p>
                    {c.badge && <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧤</span>
                <div>
                  <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Styles</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Product Styles</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {STYLES.map((s) => (
                  <div key={s.code} className="bg-white rounded-xl px-4 py-3.5 border border-orange-100 flex items-start gap-3">
                    <span className="text-xl shrink-0" aria-hidden="true">{s.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-navy-900">{s.name}</p>
                        <span className="text-xs font-semibold text-gold">{s.dims}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{s.use}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-styles" label="View All Styles" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🌡️</span>
              <p className="text-yellow-600 text-xs font-semibold tracking-[0.2em] uppercase">Heat Ratings</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Heat Protection Standards</h3>
              <div className="flex flex-col gap-2 flex-1">
                {HEAT_RATINGS.slice(0, 4).map((r) => (
                  <div key={r.rating} className="bg-white rounded-lg p-2 border border-yellow-100">
                    <p className="text-xs font-bold text-navy-900">{r.rating}</p>
                    <p className="text-[10px] text-gray-400 leading-snug">{r.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-heat" label="View Heat Ratings" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-violet-50 border border-violet-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-violet-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Brand Decoration</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECORATION.map((d) => (
                  <div key={d.method} className="bg-white rounded-lg px-3 py-2 border border-violet-50">
                    <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                    <p className="text-[10px] text-gray-400">{d.compat}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decoration" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🔬</span>
              <p className="text-emerald-600 text-xs font-semibold tracking-[0.2em] uppercase">Quality</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Quality Standards</h3>
              <div className="flex flex-col gap-2 flex-1">
                {QUALITY_SPECS.slice(0, 4).map((q) => (
                  <div key={q.test} className="bg-white rounded-lg p-2 border border-emerald-50">
                    <p className="text-xs font-semibold text-navy-900">{q.test}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">{q.standard}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-quality" label="View Quality Specs" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM Programme</h3>
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
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-cyan-50 border border-cyan-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-cyan-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Buyer Sectors</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-cyan-100">
                    <p className="text-xs font-bold text-cyan-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Sectors" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-xl border border-green-100 flex items-center justify-center p-2" style={{ height: 56 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={72} height={44} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-indigo-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export Terms</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-indigo-100">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{e.full}</p>
                      <p className="text-[10px] text-gray-400">{e.port}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export" />
            </motion.div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[230px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌿</span>
                <div>
                  <p className="text-lime-700 text-xs font-semibold tracking-[0.2em] uppercase">Ethics</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Sustainable Sourcing</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {SUSTAINABILITY.map((s) => (
                  <div key={s.title} className="bg-white rounded-xl p-3 border border-lime-100 flex flex-col gap-1">
                    <span className="text-base" aria-hidden="true">{s.icon}</span>
                    <p className="text-sm font-semibold text-navy-900">{s.title}</p>
                    <span className="text-[10px] font-semibold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full w-fit">{s.tag}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[230px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-fuchsia-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-fuchsia-200 text-fuchsia-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.short}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-1 pl-8">+ 2 more steps</p>
              </div>
              <ExploreBtn sectionId="section-process" label="View Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Kitchen Linen Construction Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction selection, heat ratings and certification requirements for kitchen linen programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Pot Holder Specification Templates</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction spec sheets, fill layer diagrams and OEM programme templates for pot holder buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, style and quantity confirmed — RFQ takes 3 minutes.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS — Scientific UI */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">01 / Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Fabric Constructions</h2>
            <p className="text-gray-500 max-w-2xl leading-relaxed">Each construction is matched to a distinct heat protection requirement and end-use environment — from retail kitchenware to commercial professional kitchen.</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeC === c.id}
                onClick={() => setActiveC(c.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeC === c.id ? "bg-navy-900 text-white border-navy-900" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-navy-900/40"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeC}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-navy-900">{ac.name}</h3>
                  {ac.badge && <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">{ac.badge}</span>}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Max Temperature</p>
                    <p className="text-lg font-bold text-red-600">{ac.temp}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Fill / Construction</p>
                    <p className="text-sm text-navy-900 font-medium">{ac.fill}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{ac.detail}</p>
                <div className="bg-navy-900 rounded-xl p-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Technical Specification</p>
                  <p className="text-sm text-gray-200 font-mono leading-relaxed">{ac.spec}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Best For</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.best.map((b) => <span key={b} className="text-xs text-navy-900 bg-white border border-gray-200 px-3 py-1 rounded-full">{b}</span>)}
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Key Markets</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>)}
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Decoration Options</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.decoration.map((d) => (
                      <div key={d} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-600">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 2 — STYLES — Bauhaus UI */}
      <section id="section-styles" className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-1">
              <div className="w-6 h-1 bg-gold mb-4" aria-hidden="true" />
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Geometry First</p>
              <h2 className="text-3xl font-bold text-white leading-tight">Product Styles</h2>
            </div>
            <div className="lg:col-span-3">
              <p className="text-gray-300 leading-relaxed">
                Four distinct silhouettes — each optimised for a different hand-protection role, from casual domestic use to professional commercial kitchen applications.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STYLES.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                className="border border-white/10 rounded-xl p-7 flex gap-5 items-start"
              >
                <div className="w-12 h-12 border-2 border-gold flex items-center justify-center shrink-0">
                  <span className="text-gold text-xs font-bold">{s.code}</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-3 flex-wrap mb-2">
                    <h3 className="text-base font-bold text-white">{s.name}</h3>
                    <span className="text-gold text-sm font-semibold">{s.dims}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.use}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 3 — HEAT RATINGS — Command Center UI */}
      <section id="section-heat" className="bg-[#0A0F1E] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Heat Protection</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Heat Rating Standards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HEAT_RATINGS.map((r, i) => (
              <motion.div
                key={r.rating}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 font-mono"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${r.level === 3 ? "bg-red-400" : r.level === 2 ? "bg-amber-400" : "bg-green-400"}`} aria-hidden="true" />
                  <span className="text-gold text-sm font-bold">{r.rating}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{r.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 4 — DECORATION — Retro/Vintage UI */}
      <section id="section-decoration" className="bg-[#F5F0E8] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block border-2 border-navy-900 px-6 py-2 mb-6">
              <p className="text-navy-900 text-xs font-semibold tracking-[0.4em] uppercase">Pot Holder Decoration</p>
            </div>
            <h2 className="text-4xl font-bold text-navy-900 mb-4">Brand Decoration Methods</h2>
            <div className="flex items-center justify-center gap-4" aria-hidden="true">
              <div className="h-px w-16 bg-navy-900/30" />
              <span className="text-navy-900/30">✦</span>
              <div className="h-px w-16 bg-navy-900/30" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {DECORATION.map((d, i) => (
              <motion.div
                key={d.method}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                className="bg-white border-2 border-navy-900/20 rounded-none p-7"
              >
                <h3 className="text-lg font-bold text-navy-900 mb-3">{d.method}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{d.desc}</p>
                <p className="text-xs font-semibold text-navy-900/60 uppercase tracking-widest">Compatible: {d.compat}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-navy-900 p-8 grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Retail-Ready Packaging</p>
              <p className="text-gray-300 text-sm leading-relaxed">Hang tags, woven labels, poly header bags and gift boxes — complete retail programme.</p>
            </div>
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Artwork Service</p>
              <p className="text-gray-300 text-sm leading-relaxed">Digital artwork review and production sample approval before bulk — no surprises at shipment.</p>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 5 — QUALITY — Brutalist UI */}
      <section id="section-quality" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-4 border-navy-900 rounded-none p-8 mb-12 inline-block">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">05 / Quality</p>
            <h2 className="text-3xl font-bold text-navy-900">Quality Test Standards</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-4 border-navy-900">
                  <th className="text-left py-4 pr-6 font-bold text-navy-900 text-xs uppercase tracking-wider">Test Parameter</th>
                  <th className="text-left py-4 pr-6 font-bold text-navy-900 text-xs uppercase tracking-wider">Standard</th>
                  <th className="text-left py-4 font-bold text-navy-900 text-xs uppercase tracking-wider">Result / Threshold</th>
                </tr>
              </thead>
              <tbody>
                {QUALITY_SPECS.map((q, i) => (
                  <tr key={q.test} className={`border-b-2 border-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="py-4 pr-6 font-semibold text-navy-900">{q.test}</td>
                    <td className="py-4 pr-6">
                      <span className="text-xs font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/30">{q.standard}</span>
                    </td>
                    <td className="py-4 text-gray-600">{q.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 6 — FILL SPECS — Layered Card UI */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Construction Detail</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Layer-by-Layer Construction</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Pot holders are multi-layer products — understanding the layer specification helps buyers align heat protection requirements with construction cost.</p>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gold/30" aria-hidden="true" />
            {FILL_SPECS.map((f, i) => (
              <motion.div
                key={f.layer}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative mb-5 last:mb-0"
              >
                <div className="absolute -left-5 top-4 w-4 h-4 rounded-full bg-gold border-4 border-white" aria-hidden="true" />
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm grid sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Layer {i + 1}</p>
                    <h3 className="text-base font-bold text-navy-900">{f.layer}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{f.spec}</p>
                  <div className="sm:text-right">
                    <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full">{f.gsm}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 7 — OEM — Neumorphic UI */}
      <section id="section-oem" className="py-20 lg:py-28" style={{ background: "#E8E8EC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM Programme</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Custom Pot Holder Programme</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Every element of your branded pot holder and oven mitt programme is specified to your requirements — construction, style, decoration and retail packaging.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OEM_FEATURES.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl p-7"
                style={{ background: "#E8E8EC", boxShadow: "8px 8px 16px #c8c8cc, -8px -8px 16px #ffffff" }}
              >
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ background: "#E8E8EC", boxShadow: "4px 4px 8px #c8c8cc, -4px -4px 8px #ffffff" }}>
                  <span className="text-gold text-sm font-bold">{f.num}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-800 transition-colors">
              Start Your Programme <span aria-hidden="true">→</span>
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 8 — MARKETS — Flat Design UI */}
      <section id="section-markets" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Sectors</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Who Buys Pot Holders</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Pot holders and oven mitts are purchased across retail kitchenware, gift, foodservice and institutional channels — each sector with distinct specification requirements.</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-navy-900 text-xs font-bold">{s.abbr}</span>
                </div>
                <h3 className="text-sm font-bold text-navy-900 mb-1">{s.name}</h3>
                <p className="text-xs text-gray-500 leading-snug mb-2">{s.detail}</p>
                <p className="text-xs font-semibold text-gold">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 9 — CERTIFICATIONS — Glassmorphism UI */}
      <section id="section-certs" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-[#0D1B2A]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Quality Certifications</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">Factory certifications covering chemical safety, social compliance, quality management and organic credentials — meeting the qualification requirements of major retail buyers worldwide.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex flex-col gap-3"
              >
                <div className="w-full h-12 bg-white/90 rounded-xl flex items-center justify-center p-2">
                  <Image src={c.img} alt={c.full} width={64} height={40} className="object-contain w-full h-full" />
                </div>
                <p className="text-sm font-bold text-white">{c.name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold w-fit ${c.tier === "Premium" ? "bg-gold/20 text-gold" : c.tier === "Optional" ? "bg-white/10 text-gray-400" : "bg-green-900/50 text-green-400"}`}>{c.tier}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 10 — EXPORT — Aurora/Gradient Mesh UI */}
      <section id="section-export" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-navy-900" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-400/10 blur-[120px]" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Export &amp; Logistics</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">Pot holders ship from Karachi and Port Qasim on FCL and LCL terms. Consolidated shipments with other kitchen linen items available.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {EXPORT_TERMS.map((e, i) => (
              <motion.div
                key={e.term}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center mb-3">
                  <span className="text-gold text-sm font-bold">{e.term}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{e.full}</h3>
                <p className="text-xs text-white/50">{e.port}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { val: "18–25 days", label: "USA / Canada", flag: "🇺🇸🇨🇦" },
              { val: "20–26 days", label: "UK / Europe", flag: "🇬🇧🇪🇺" },
              { val: "8–14 days", label: "Middle East", flag: "🌍" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <p className="text-3xl mb-2" aria-hidden="true">{item.flag}</p>
                <p className="text-2xl font-bold text-white">{item.val}</p>
                <p className="text-sm text-teal-300 mt-1">{item.label}</p>
                <p className="text-xs text-white/40 mt-0.5">Sea freight from Karachi</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 11 — SUSTAINABILITY + PROCESS — Organic UI */}
      <section id="section-sustainability" className="bg-[#F7F4EF] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-8">Responsible Sourcing</h2>
              <div className="grid grid-cols-2 gap-4">
                {SUSTAINABILITY.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="bg-white rounded-2xl p-5 shadow-sm"
                    style={{ borderRadius: "20px" }}
                  >
                    <span className="text-xl" aria-hidden="true">{s.icon}</span>
                    <h3 className="text-sm font-bold text-navy-900 mt-2 mb-1">{s.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-2">{s.desc}</p>
                    <span className="text-[10px] font-semibold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full">{s.tag}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div id="section-process">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Process</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-8">Sourcing Process</h2>
              <div className="flex flex-col gap-4">
                {PROCESS.map((p, i) => (
                  <motion.div
                    key={p.num}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start"
                    style={{ borderRadius: "20px" }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shrink-0">
                      <span className="text-navy-900 text-sm font-bold">{p.num}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy-900 mb-1">{p.short}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 border-2 border-amber-400 rounded-2xl p-4 flex gap-3 items-start">
                <span className="text-amber-500 text-base shrink-0" aria-hidden="true">⚠️</span>
                <p className="text-amber-800 text-xs leading-relaxed">
                  <strong>Indicative lead times only.</strong> Actual timelines depend on order size, construction complexity and factory scheduling. Include your required delivery date in the RFQ.
                </p>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-28 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-12">Frequently Asked Questions</h2>
          <div className="flex flex-col divide-y divide-gray-100">
            {FAQS.map((f, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                  aria-expanded={faqOpen === i}
                >
                  <span className="text-base font-semibold text-navy-900 leading-snug">{f.q}</span>
                  <span className={`text-gold font-bold text-xl shrink-0 transition-transform ${faqOpen === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-500 text-sm leading-relaxed pt-4">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0D1B2A] py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Source Pot Holders from Pakistan</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Specify construction, style, heat rating, decoration and quantity. Factory match and competitive quotation within 3–5 working days. Coordinated kitchen linen programme RFQs welcome.
            </p>
            <Link href="/rfq/" className="inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
              Request a Quote <span aria-hidden="true">&#8594;</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
