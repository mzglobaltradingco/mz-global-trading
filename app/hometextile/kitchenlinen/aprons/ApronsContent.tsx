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
    id: "canvas",
    name: "Canvas",
    badge: "Kitchen Standard",
    gsm: "280–400 GSM",
    hand: "Stiff, structured front — maximum protection, durable under commercial laundering",
    best: ["Commercial Kitchens", "Food Manufacturing", "Industrial Use"],
    markets: ["USA", "UK", "EU", "Australia", "Canada"],
    finishes: ["DWR / Water Repellent", "Stain Repellent", "Anti-bacterial"],
    detail:
      "Heavyweight canvas is the professional kitchen standard — structured, protective and durable through repeated industrial laundering at 60°C. The stiff construction provides effective front protection from heat splatter, grease and food contact. Screen print and embroidery both produce excellent results on canvas, making it the go-to construction for branded chef programmes and restaurant workwear. Available in a full range of solid colours via reactive and pigment dyeing.",
    spec: "100% cotton or 65/35 polyester-cotton canvas. GSM 280–400. DWR and stain repellent available. Industrial laundry compatible. OEKO-TEX Standard 100, BSCI, ISO 9001.",
  },
  {
    id: "denim",
    name: "Denim",
    badge: "Bistro Favourite",
    gsm: "300–380 GSM",
    hand: "Washed indigo finish — fashionable, durable, wears in with character",
    best: ["Bistro & Bar", "Artisan Food Brands", "Front-of-House"],
    markets: ["USA", "UK", "EU", "Australia"],
    finishes: ["Stone Wash", "Enzyme Wash", "Wax Coating (premium)"],
    detail:
      "Denim aprons are the defining aesthetic of the modern artisan foodservice movement — from craft coffee bars to upscale bistros. The indigo-dyed surface develops character with use and laundering, creating an authentic, workwear feel that complements premium food and beverage environments. Embroidery produces particularly striking results on denim — the contrast between thread and fabric gives a high-craft appearance.",
    spec: "100% cotton 3×1 twill denim. GSM 300–380. Stone-washed, enzyme-washed or raw. Wax-coated options available. OEKO-TEX certified.",
  },
  {
    id: "poplin",
    name: "Plain Weave / Poplin",
    badge: "Print Ready",
    gsm: "200–280 GSM",
    hand: "Smooth, lightweight — excellent all-over print base, comfortable extended wear",
    best: ["Corporate Catering", "Promotional", "All-Over Print Programmes"],
    markets: ["USA", "UK", "EU", "Middle East"],
    finishes: ["Anti-bacterial", "Stain Repellent", "Wrinkle Resistant"],
    detail:
      "Plain weave and poplin aprons offer a smooth, uniform surface ideal for full-face screen printing and digital print programmes. Lighter weight than canvas makes them comfortable for extended service shifts. The clean, smooth hand photographs well for branded hospitality programmes. Popular in corporate catering, event catering and promotional contexts where all-over printed artwork is the primary design vehicle.",
    spec: "100% cotton or 65/35 poly-cotton poplin. GSM 200–280. Reactive and screen print compatible. Full PMS colour matching. OEKO-TEX Standard 100.",
  },
  {
    id: "terry",
    name: "Terry",
    badge: "",
    gsm: "300–400 GSM",
    hand: "Looped pile front — absorbent, soft hand, dual-function protection",
    best: ["Pastry Kitchens", "Food Prep", "Front-of-House (premium)"],
    markets: ["Middle East", "USA", "South America"],
    finishes: ["Anti-bacterial", "Enzyme Wash", "Soft Hand Finish"],
    detail:
      "Terry aprons serve dual-function kitchen roles — the looped pile provides moisture absorption alongside protection, making them ideal for pastry, baking and wet food preparation environments. The soft hand is also popular in premium front-of-house service contexts in Middle Eastern markets. Embroidered logos on terry deliver a premium, spa-inspired aesthetic.",
    spec: "100% cotton terry. GSM 300–400. Reactive dyed. Anti-bacterial treatment available. GOTS organic cotton option.",
  },
];

const STYLES = [
  { code: "BIB", name: "Bib Apron", dims: "60 × 90 cm", use: "Back-of-house: chefs, line cooks, bakers, food prep", icon: "👨‍🍳" },
  { code: "WST", name: "Waist Apron", dims: "60 × 40 cm", use: "Front-of-house: servers, baristas, retail counter", icon: "🍷" },
  { code: "CUS", name: "Custom Style", dims: "To your spec", use: "Non-standard cuts, lengths and pocket configurations", icon: "✏️" },
];

const DECORATION = [
  { code: "SP", method: "Screen Print", best: "Bold, multi-colour brand artwork — chest, bib and lower placement", compat: ["Canvas", "Poplin", "Denim"] },
  { code: "EM", method: "Embroidery", best: "Logo mark — chest, bib centre, strap, cuff placement — all constructions", compat: ["All Constructions"] },
  { code: "DP", method: "Digital Print", best: "Photo-quality or complex artwork — poplin and light canvas", compat: ["Poplin", "Light Canvas"] },
  { code: "HT", method: "Heat Transfer", best: "Sport-style, foil finish, athletic programmes", compat: ["Poplin", "Canvas"] },
];

const GSM_TIERS = [
  { gsm: "200–280", name: "Lightweight", construction: "Poplin / Plain Weave", use: "Promotional, corporate catering, print programmes", pct: 40, color: "bg-amber-300" },
  { gsm: "280–340", name: "Mid-Weight", construction: "Canvas / Light Denim", use: "Bistro, restaurant, branded F&B programmes", pct: 65, color: "bg-amber-500" },
  { gsm: "340–400", name: "Heavyweight", construction: "Canvas Heavy / Denim", use: "Commercial kitchens, heavy-duty workwear", pct: 85, color: "bg-gold", popular: true },
];

const FINISHES = [
  { name: "DWR / Water Repellent", desc: "Creates water and oil-shedding surface. Fluorocarbon-free options available.", tag: "OEKO-TEX Compliant" },
  { name: "Stain Repellent", desc: "Protects surface from food and beverage stains in active kitchen environments.", tag: "Kitchen Grade" },
  { name: "Anti-bacterial", desc: "Reduces bacterial growth on fabric surface — durable through multiple laundry cycles.", tag: "Foodservice" },
  { name: "Stone / Enzyme Wash", desc: "Pre-washed finish for denim and canvas — softened hand, broken-in appearance.", tag: "Aesthetic" },
  { name: "Wrinkle Resistant", desc: "Maintains professional appearance through shift use — poplin and light canvas.", tag: "Presentation" },
];

const OEM_FEATURES = [
  { num: "01", title: "Construction Choice", desc: "Canvas, denim, poplin or terry — to your end-use specification and aesthetic brief." },
  { num: "02", title: "Cut & Style", desc: "Bib, waist or custom cut. Pocket configuration to your specification." },
  { num: "03", title: "Decoration", desc: "Screen print, embroidery, digital print — artwork approval before bulk production." },
  { num: "04", title: "Colour Matching", desc: "Full PMS colour matching for solid grounds. Denim wash specifications confirmed via sample." },
  { num: "05", title: "Labels & Branding", desc: "Woven neck labels, care labels, hang tags — all to your brand specification." },
  { num: "06", title: "Finishing & Packaging", desc: "DWR, stain repellent, anti-bacterial treatment. Individual polybag or hanger pack." },
];

const SECTORS = [
  { abbr: "RS", name: "Restaurant Chains", detail: "Branded workwear programmes for multi-site restaurant operators", market: "USA · UK · EU" },
  { abbr: "HT", name: "Hotel F&B", detail: "Kitchen and front-of-house apron supply for hotel food & beverage departments", market: "Middle East · USA · EU" },
  { abbr: "CU", name: "Corporate Uniform", detail: "Staff uniform programmes for corporate catering and facilities management", market: "UK · EU · Australia" },
  { abbr: "PR", name: "Promotional", detail: "Branded promotional aprons for kitchenware retail and FMCG brands", market: "USA · UK · EU" },
  { abbr: "WS", name: "Wholesale / Dist.", detail: "Wholesale programmes for foodservice distributors and uniform suppliers", market: "USA · Canada · Australia" },
  { abbr: "RT", name: "Retail Kitchenware", detail: "Own-brand apron ranges for kitchenware and homeware retailers", market: "USA · UK · EU · Australia" },
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

const SUSTAINABILITY = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton across canvas and poplin constructions.", tag: "GOTS" },
  { icon: "💧", title: "Low-Impact Dyes", desc: "Reactive dyeing with OEKO-TEX certified chemicals — no restricted azo dyes.", tag: "OEKO-TEX" },
  { icon: "🔄", title: "Enzyme Wash", desc: "Enzyme washing replaces stone washing — lower water use, no stone dust waste.", tag: "Process" },
  { icon: "⚖️", title: "Ethical Factories", desc: "BSCI, Sedex and SA8000 audited production — worker welfare verified.", tag: "BSCI / Sedex" },
  { icon: "🌿", title: "FC-Free DWR", desc: "Fluorocarbon-free DWR treatments available — meets EU PFAS restrictions.", tag: "EU Compliant" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags and FSC-certified paper packaging on request.", tag: "Optional" },
];

const PROCESS = [
  { num: "01", short: "RFQ Submission", desc: "Construction, style, GSM, decoration, pocket spec, quantity and delivery date." },
  { num: "02", short: "Factory Match", desc: "Certified Pakistan factories with apron OEM expertise and matching capacity shortlisted." },
  { num: "03", short: "Artwork Review", desc: "Decoration artwork reviewed and file preparation confirmed for production." },
  { num: "04", short: "Sample Production", desc: "20–30 days from specification lock — includes decoration approval sample." },
  { num: "05", short: "Bulk Production", desc: "35–55 days from confirmed purchase order and approved sample." },
  { num: "06", short: "QC & Shipment", desc: "Pre-shipment inspection, decoration and finish check, export loading from Karachi." },
];

const FAQS = [
  {
    q: "What construction should I specify for a chef or commercial kitchen apron programme?",
    a: "Heavyweight canvas (280–400 GSM) is the commercial kitchen standard — structured, protective and durable under repeated industrial laundering. Denim is the bistro and front-of-house choice. Terry is ideal for pastry and wet food preparation.",
  },
  {
    q: "What decoration methods are available for branded restaurant apron programmes?",
    a: "Screen printing for bold brand artwork on canvas and denim; embroidery for logo placement on all constructions; digital print for complex artwork on poplin; heat transfer for foil and sport-style finishes.",
  },
  {
    q: "What is the difference between a bib apron and a waist apron?",
    a: "Bib aprons (60×90 cm) cover chest and lower body — for back-of-house kitchen staff. Waist aprons (60×40 cm) cover waist to mid-thigh — for front-of-house servers and baristas. Both styles are available in all constructions.",
  },
  {
    q: "Can I order custom aprons with DWR or stain-repellent finishing?",
    a: "Yes. DWR and stain-repellent finishing is available on canvas and denim. Fluorocarbon-free (FC-free) formulations meet EU PFAS restrictions. Anti-bacterial treatment is also available for kitchen and foodservice programmes.",
  },
  {
    q: "What certifications should I require for EU or UK apron sourcing?",
    a: "OEKO-TEX Standard 100 for chemical safety; BSCI or Sedex for social compliance; GOTS for organic cotton. ISO 9001 for production quality. These cover the standard requirements of EU and UK retail and restaurant buyers.",
  },
  {
    q: "Are pockets available on OEM apron programmes?",
    a: "Yes. Single, double, kangaroo-style, side-seam and breast pocket configurations are all available. Pocket depth, width and reinforcement stitching can be fully specified. Triple-stitched reinforcement recommended for professional kitchen tool use.",
  },
  {
    q: "What is the typical lead time for custom branded apron programmes?",
    a: "Indicative: pre-production samples with artwork approval 20–30 days; bulk production 35–55 days from confirmed PO; sea freight from Karachi 18–25 days. Allow 90 days minimum from RFQ to in-warehouse receipt.",
  },
  {
    q: "Can aprons be supplied as part of a complete F&B uniform programme?",
    a: "Yes. MZ Global Trading sources across all F&B workwear categories — aprons, chef jackets, kitchen trousers and service wear. A consolidated programme RFQ simplifies procurement and ensures consistent certification coverage.",
  },
];

export default function ApronsContent() {
  const [activeC, setActiveC] = useState("canvas");
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
            alt="Pakistan aprons manufacturer — canvas, denim and terry aprons for restaurant, hospitality and corporate buyers in USA, UK and Europe"
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
              <Link href="/hometextile/kitchenlinen/" className="hover:text-gold transition-colors">Kitchen Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Aprons</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan F&amp;B Workwear Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Aprons
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              OEM aprons sourced from Pakistan&rsquo;s certified textile mills.
              Canvas, denim, terry and poplin constructions. Bib and waist
              styles. Screen print and embroidery decoration. OEKO-TEX, BSCI.
              FOB&nbsp;/ CIF export to USA, UK, EU and worldwide.
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
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Apron Sourcing — Pakistan OEM</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Four Constructions. Unlimited Brand Possibilities.
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s certified workwear factories produce apron programmes to brand specification — from single-site restaurant operators to multi-national F&amp;B chains. OEKO-TEX and BSCI compliance across all programmes.
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
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">All Apron Specifications</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to explore the full specification section.</p>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-stone-50 border border-stone-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-stone-600 text-xs font-semibold tracking-[0.2em] uppercase">Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-stone-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    {c.badge && <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">👨‍🍳</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Styles</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Apron Styles</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {STYLES.map((s) => (
                  <div key={s.code} className="bg-white rounded-xl px-4 py-3.5 border border-amber-100 flex items-start gap-3">
                    <span className="text-2xl shrink-0" aria-hidden="true">{s.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-navy-900">{s.name}</p>
                        <span className="text-xs font-semibold text-gold">{s.dims}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{s.use}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-styles" label="View Apron Styles" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-yellow-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Guide</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-lg p-2.5 border border-yellow-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-navy-900">{t.gsm}</span>
                      {t.popular && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <div className="w-full h-1.5 bg-yellow-100 rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] text-gray-400 leading-snug">{t.construction}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View GSM Guide" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Decoration Methods</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECORATION.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2 border border-purple-50">
                    <span className="w-6 h-6 rounded bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{d.code}</span>
                    <p className="text-xs font-semibold text-navy-900 leading-tight">{d.method}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decoration" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">✨</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Finishing</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Available Finishes</h3>
              <div className="flex flex-col gap-2 flex-1">
                {FINISHES.slice(0, 4).map((f) => (
                  <div key={f.name} className="bg-white rounded-lg p-2.5 border border-rose-50">
                    <p className="text-xs font-semibold text-navy-900">{f.name}</p>
                    <span className="text-[10px] text-rose-600 font-semibold">{f.tag}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-finishes" label="View Finishes" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
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
              className="lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Sectors</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-xs font-bold text-teal-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Sectors" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
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
              className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export Terms</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-orange-100">
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
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
              className="lg:col-span-1 bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
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
              <p className="font-semibold text-navy-900">Apron Sourcing &amp; Construction Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction selection, decoration methods and certification requirements for apron programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Apron Specification Templates</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction spec sheets and OEM programme templates for branded apron buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Aprons?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, style, decoration and quantity confirmed — RFQ takes 3 minutes.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS — Geometric UI */}
      <section id="section-constructions" className="bg-navy-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Four Constructions, Four Use Cases</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">Each construction serves a distinct end-use — matching material properties to operational requirements and aesthetic positioning.</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeC === c.id}
                onClick={() => setActiveC(c.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeC === c.id ? "bg-gold text-navy-900 border-gold" : "bg-white/5 text-gray-300 border-white/10 hover:border-gold/40"
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
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-white">{ac.name}</h3>
                  {ac.badge && <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">{ac.badge}</span>}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">GSM Range</p>
                    <p className="text-lg font-bold text-gold">{ac.gsm}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Hand Feel</p>
                    <p className="text-sm text-white">{ac.hand}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{ac.detail}</p>
                <div className="border border-white/10 rounded-xl p-4">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Technical Specification</p>
                  <p className="text-sm text-gray-300">{ac.spec}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Best For</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.best.map((b) => <span key={b} className="text-xs text-white bg-white/10 px-3 py-1 rounded-full">{b}</span>)}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Key Markets</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>)}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Available Finishes</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.finishes.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-300">{f}</span>
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

      {/* SECTION 2 — STYLES — Art Deco UI */}
      <section id="section-styles" className="bg-[#1A1409] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
              <div className="h-px w-16 bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.4em] uppercase">Style Guide</span>
              <div className="h-px w-16 bg-gold" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Apron Styles</h2>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              Two standard silhouettes — each serving a distinct operational role. Both available in all four constructions and all decoration methods.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {STYLES.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-gold/30 rounded-2xl p-8 flex flex-col gap-4 text-center"
              >
                <span className="text-4xl mx-auto" aria-hidden="true">{s.icon}</span>
                <div className="w-8 h-px bg-gold mx-auto" aria-hidden="true" />
                <h3 className="text-xl font-bold text-white">{s.name}</h3>
                <p className="text-gold text-lg font-bold">{s.dims}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{s.use}</p>
              </motion.div>
            ))}
          </div>
          <div className="border border-gold/20 rounded-2xl p-8 grid sm:grid-cols-3 gap-8">
            {[
              ["Pocket Options", "Single, double, kangaroo, side-seam and breast pocket — all customisable"],
              ["Strap Options", "Neck loop, adjustable neck strap, cross-back (no neck) — any configuration"],
              ["Custom Cut", "Non-standard lengths, widths and pocket placements for institutional programmes"],
            ].map(([label, desc]) => (
              <div key={label}>
                <p className="text-gold text-sm font-bold mb-2">{label}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 3 — GSM — Industrial UI */}
      <section id="section-gsm" className="bg-[#111827] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Classification</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">GSM Weight Guide</h2>
          <p className="text-gray-400 mb-12 max-w-2xl leading-relaxed">GSM determines durability, protection level, decoration receptivity and commercial pricing tier.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {GSM_TIERS.map((t, i) => (
              <motion.div
                key={t.gsm}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`rounded-2xl p-7 border ${t.popular ? "border-gold bg-white/10" : "border-white/10 bg-white/5"}`}
              >
                {t.popular && <span className="inline-block mb-3 text-[10px] font-bold text-navy-900 bg-gold px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>}
                <p className={`text-3xl font-bold mb-1 ${t.popular ? "text-gold" : "text-white"}`}>{t.gsm}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{t.name}</p>
                <p className="text-sm text-gray-300 mb-4">{t.construction}</p>
                <div className="mb-4">
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{t.use}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 4 — DECORATION — Organic UI */}
      <section id="section-decoration" className="bg-[#F7F4EF] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Decoration</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Decoration Methods</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            Brand identity in foodservice is increasingly expressed through decorated aprons. Method selection depends on artwork complexity, construction and wash-durability requirements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {DECORATION.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 flex gap-5"
                style={{ borderRadius: "24px" }}
              >
                <div className="w-12 h-12 rounded-2xl bg-navy-900 flex items-center justify-center shrink-0">
                  <span className="text-gold text-xs font-bold">{d.code}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{d.method}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{d.best}</p>
                  <p className="text-xs text-gray-400">Compatible: {d.compat.join(", ")}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-navy-900 rounded-3xl p-8 text-white grid sm:grid-cols-3 gap-8">
            {[
              ["Chest / Bib", "Primary brand placement — logo mark, brand name, café or restaurant identity"],
              ["Pocket Area", "Secondary placement — small logo mark, tagline or icon motif"],
              ["Strap / Waistband", "Brand mark on cross-back straps or waistband — subtle premium positioning"],
            ].map(([place, desc]) => (
              <div key={place}>
                <p className="text-gold text-sm font-bold mb-2">{place}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 5 — FINISHES — Minimalist UI */}
      <section id="section-finishes" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-3">05 / Applied Finishes</p>
            <h2 className="text-4xl font-bold text-navy-900 mb-4">Performance Finishing Options</h2>
            <div className="w-12 h-0.5 bg-gold mb-4" aria-hidden="true" />
            <p className="text-gray-500 leading-relaxed">Performance finishes extend the functional life of apron programmes and meet the hygiene and safety standards of commercial kitchen environments.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FINISHES.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border border-gray-100 rounded-2xl p-6 hover:border-gold hover:shadow-sm transition-all"
              >
                <h3 className="text-base font-bold text-navy-900 mb-2">{f.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{f.desc}</p>
                <span className="text-[11px] font-semibold text-navy-900 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">{f.tag}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 6 — OEM — Memphis UI */}
      <section id="section-oem" className="bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM Programme</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Custom Apron Specification</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 border-2 border-navy-900 shadow-md">
                <p className="text-gray-500 leading-relaxed mb-6">Every aspect of your branded apron programme is specified to your requirements — from fabric construction and GSM through to pocket configuration, decoration and retail packaging.</p>
                <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-800 transition-colors">
                  Start Your Programme <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OEM_FEATURES.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-navy-900 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">{f.num}</span>
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

      {/* SECTION 7 — MARKETS — Bauhaus UI */}
      <section id="section-markets" className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-1">
              <div className="w-6 h-6 bg-gold rounded-full mb-4" aria-hidden="true" />
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Form Follows Function</p>
              <h2 className="text-3xl font-bold text-white leading-tight">Who Buys Aprons</h2>
            </div>
            <div className="lg:col-span-3">
              <p className="text-gray-300 leading-relaxed">
                Branded apron programmes are purchased across the full F&amp;B and workwear spectrum — from independent restaurants to multi-national hospitality chains. Each sector has distinct construction, decoration and compliance requirements.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="border border-white/10 rounded-xl p-5"
              >
                <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-gold text-xs font-bold">{s.abbr}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{s.name}</h3>
                <p className="text-xs text-gray-400 leading-snug mb-2">{s.detail}</p>
                <p className="text-xs font-semibold text-gold">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 8 — CERTIFICATIONS — Glassmorphism UI */}
      <section id="section-certs" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-[#0D1B2A]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-400/10 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Quality Certifications</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">Factory-level certifications that meet the qualification requirements of major retail and foodservice buyers across all target markets.</p>
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

      {/* SECTION 9 — EXPORT — Material Design UI */}
      <section id="section-export" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Export &amp; Logistics</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Aprons ship from Karachi and Port Qasim on FCL and LCL terms. All standard incoterms available. Full export documentation as standard.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {EXPORT_TERMS.map((e, i) => (
              <motion.div
                key={e.term}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center mb-3">
                  <span className="text-gold text-sm font-bold">{e.term}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-1">{e.full}</h3>
                <p className="text-xs text-gray-500">{e.port}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 grid sm:grid-cols-3 gap-8">
            {[
              { val: "18–25 days", label: "USA / Canada", sub: "Sea freight from Karachi" },
              { val: "20–26 days", label: "UK / Europe", sub: "Sea freight from Karachi" },
              { val: "8–14 days", label: "Middle East", sub: "Sea freight from Karachi" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-3xl font-bold text-navy-900">{item.val}</p>
                <p className="text-sm font-semibold text-gold mt-1">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 10 — SUSTAINABILITY — Typography-First UI */}
      <section id="section-sustainability" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-4">10 / Sustainability</p>
              <h2 className="text-5xl font-bold text-navy-900 leading-[1] mb-8">
                Certified.<br />Compliant.<br />Responsible.
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-8" aria-hidden="true" />
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
                EU and UK buyers increasingly require demonstrable sustainability credentials — not just from their direct supplier but through the full supply chain. Our Pakistan apron factories carry the certifications to satisfy these requirements.
              </p>
              <blockquote className="border-l-4 border-gold pl-6 text-xl font-medium text-navy-900 italic leading-relaxed">
                &ldquo;OEKO-TEX Standard 100, BSCI and ISO 9001 are standard across our apron factory network — not premium add-ons available only at higher quantities.&rdquo;
              </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {SUSTAINABILITY.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100"
                >
                  <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                  <h3 className="text-base font-bold text-navy-900 mt-3 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                  <span className="text-[11px] font-semibold text-lime-700 bg-lime-100 px-2.5 py-1 rounded-full">{s.tag}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 11 — PROCESS — Neo-Brutalist UI */}
      <section id="section-process" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-4 border-navy-900 rounded-none p-8 mb-10 inline-block">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Sourcing Process</p>
            <h2 className="text-3xl font-bold text-navy-900">From RFQ to Delivery</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="border-2 border-navy-900 rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 bg-gold flex items-center justify-center">
                  <span className="text-navy-900 text-sm font-bold">{p.num}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900">{p.short}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 border-2 border-amber-400 rounded-2xl p-5 flex gap-3 items-start">
            <span className="text-amber-500 text-lg shrink-0" aria-hidden="true">⚠️</span>
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Indicative lead times only.</strong> All timelines depend on factory scheduling, decoration complexity, material availability and order size. Include your required delivery date in the RFQ.
            </p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 lg:py-28">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Start Your Apron Programme</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Specify construction, style, decoration and quantity. Factory match with certified Pakistan OEM factories and detailed quotation within 3–5 working days.
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
