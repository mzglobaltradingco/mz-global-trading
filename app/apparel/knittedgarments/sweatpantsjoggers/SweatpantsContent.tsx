"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CertificationsStrip from "@/components/CertificationsStrip";

// ─── Scroll helpers ────────────────────────────────────────────────────────────

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
        style={{
          animation: "btt-pulse 2.2s ease-out infinite",
        }}
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
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
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">→</span>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  {
    id: "french-terry",
    name: "French Terry",
    badge: "Most Popular",
    gsm: "300–380 GSM",
    hand: "Smooth face, looped interior — clean silhouette, plush feel",
    best: ["Co-ord Sets", "A/W Retail", "Streetwear"],
    markets: ["USA", "UK", "EU", "Australia"],
    decorations: ["Screen Print", "Embroidery", "Heat Transfer"],
    detail:
      "French terry is the primary construction for premium sweatpants and joggers. The smooth face provides excellent print fidelity for leg graphics, while the looped interior delivers plush warmth without bulk. French terry's natural structure produces a flat, clean silhouette — ideal for tapered and slim-fit programmes. Enzyme-washed and garment-dyed finishes are popular in USA premium streetwear and DTC brands.",
    spec: "100% combed cotton or 80/20 cotton-poly. GSM 300–380. Reactive dyed. Soft-hand and enzyme wash finishes available. GOTS option.",
    suitability: "Premium",
  },
  {
    id: "loop-back-fleece",
    name: "Loop Back Fleece",
    badge: "",
    gsm: "320–400 GSM",
    hand: "Slightly heavier face, dense loop back — structured and durable",
    best: ["Bulk Programmes", "Value Tiers", "Volume Wholesale"],
    markets: ["USA", "Middle East", "South America"],
    decorations: ["Screen Print", "Heat Transfer"],
    detail:
      "Loop back fleece is the workhorse construction for volume sweatpant programmes. Heavier and more structured than French terry, the dense loop back delivers durability and warmth — suited to value-tier retail and bulk wholesale. Screen print ink reception is reliable on the tighter loop back surface. Higher container yield per unit weight compared to brushed fleece.",
    spec: "65/35 poly-cotton or 100% polyester. GSM 320–400. Heat transfer recommended for sharp edges. Anti-pill finish option.",
    suitability: "Value",
  },
  {
    id: "brushed-fleece",
    name: "Brushed Fleece",
    badge: "Premium",
    gsm: "300–380 GSM",
    hand: "Ultra-soft napped face — maximum comfort, premium retail positioning",
    best: ["Premium Retail", "DTC Brands", "Loungewear"],
    markets: ["USA", "Canada", "UK", "N. Europe"],
    decorations: ["Screen Print (soft-hand)", "Embroidery"],
    detail:
      "Brushed fleece produces the most tactilely luxurious sweatpant fabric — the napped face is the standout sensory quality that drives premium retail pricing. Popular in DTC loungewear brands where in-hand feel is a primary purchase driver. Soft-hand inks are essential for screen printing to preserve nap texture. The preferred co-ord set partner construction for brushed hoodies.",
    spec: "100% cotton or 80/20 cotton-poly. GSM 300–380. Soft-hand inks essential for print. Anti-pill finish recommended.",
    suitability: "Premium",
  },
  {
    id: "cotton-spandex",
    name: "Cotton-Spandex",
    badge: "Performance",
    gsm: "240–320 GSM",
    hand: "4-way stretch, performance recovery — athletic and reduced pilling",
    best: ["Athleisure", "Active Wear", "Gym Programmes"],
    markets: ["USA", "Australia", "SE Asia"],
    decorations: ["Sublimation", "Heat Transfer", "Embroidery"],
    detail:
      "Cotton-spandex (95/5 or 92/8) delivers the 4-way stretch essential for athletic and performance-positioned joggers. Lower GSM than fleece constructions, but spandex content provides excellent shape retention and reduces knee-bagging over time. The primary construction for athleisure and gym-wear programmes. Tapered cuts are most common in this construction.",
    spec: "95/5 or 92/8 cotton-spandex. GSM 240–320. Sublimation on poly-spandex only. Anti-pill and moisture-wicking finishes available.",
    suitability: "Performance",
  },
  {
    id: "polar-fleece",
    name: "Polar Fleece",
    badge: "",
    gsm: "200–280 GSM",
    hand: "Anti-pill smooth, lightweight warmth — soft and dry hand",
    best: ["Lightweight A/W", "Casual Programmes", "Warmer Climates"],
    markets: ["Middle East", "SE Asia", "South America"],
    decorations: ["Screen Print", "Embroidery"],
    detail:
      "Polar fleece is the lightest sweatpant construction — delivering warmth without bulk. Anti-pill treatment is standard. Popular in warmer-climate markets requiring light transitional-season items. Polar fleece sweatpants suit mid-range retail programmes where premium construction is not the primary driver. Fast-drying and machine-wash durable.",
    spec: "100% polyester. GSM 200–280. Anti-pill standard. Machine-wash durable. Screen print and embroidery suitable.",
    suitability: "Standard",
  },
];

const FIT_PROFILES = [
  {
    code: "REG",
    name: "Regular Fit",
    rise: "Mid rise, full seat",
    inseam: "Standard full leg",
    waist: "Elastic + drawstring",
    ankle: "Open hem or ribbed cuff",
    market: "USA mainstream retail, workwear casual, wholesale distributors",
  },
  {
    code: "TAP",
    name: "Slim / Tapered",
    rise: "Mid rise, neat seat",
    inseam: "Tapered from knee to ankle",
    waist: "Elastic + drawstring",
    ankle: "Ribbed ankle cuff — standard",
    market: "Fashion retail, UK / EU contemporary, DTC athleisure brands",
  },
  {
    code: "RLX",
    name: "Relaxed / Loose",
    rise: "High rise option, fuller seat",
    inseam: "Full wide leg",
    waist: "Wide elastic + oversized drawstring",
    ankle: "Open wide hem or frayed finish",
    market: "Streetwear, youth fashion, oversized trend — EU, Japan, Global DTC",
  },
];

const GSM_TIERS = [
  {
    gsm: "240–280",
    name: "Performance / Light",
    season: "Year-Round / Transitional",
    market: "Athleisure · SE Asia · Middle East · Australia",
    pct: 35,
    color: "bg-teal-400",
    featured: false,
    icon: "🏃",
    desc: "Performance and athleisure constructions. Cotton-spandex and polar fleece. Lighter, flexible and moisture-managed — suited to warm-climate markets and gym-wear programmes.",
  },
  {
    gsm: "280–340",
    name: "Standard",
    season: "Year-Round",
    market: "USA · UK · EU mainstream retail",
    pct: 70,
    color: "bg-gold",
    featured: true,
    icon: "⚖️",
    desc: "Industry standard for co-ord sets and year-round retail programmes. French terry and brushed fleece in this range cover the majority of international orders.",
  },
  {
    gsm: "340–400+",
    name: "Heavyweight",
    season: "Autumn / Winter",
    market: "USA workwear · Canada · N. Europe",
    pct: 50,
    color: "bg-indigo-500",
    featured: false,
    icon: "🧊",
    desc: "Loop back and brushed fleece programmes for cold-climate markets. Maximum warmth, structured silhouette and durable wash performance.",
  },
];

const DECO_METHODS = [
  {
    code: "SCR",
    method: "Screen Print",
    placement: "Left thigh, right thigh, full leg",
    note: "Soft-hand inks required for brushed fleece",
    compat: ["French Terry", "Loop Back", "Polar Fleece"],
    icon: "🖨️",
  },
  {
    code: "EMB",
    method: "Embroidery",
    placement: "Waistband, back hip, pocket flap",
    note: "French terry provides the best base for stitch registration",
    compat: ["French Terry", "Brushed Fleece"],
    icon: "🧵",
  },
  {
    code: "SUB",
    method: "Sublimation Print",
    placement: "All-over, full leg, side panel",
    note: "Polyester or poly-spandex fabric required",
    compat: ["Cotton-Spandex (poly)", "Polar Fleece (poly)"],
    icon: "🎨",
  },
  {
    code: "HT",
    method: "Heat Transfer",
    placement: "Logo mark, thigh graphic, waistband text",
    note: "Sharp edges — suitable for all constructions",
    compat: ["All Constructions"],
    icon: "🔥",
  },
  {
    code: "STR",
    method: "Side Stripe / Taping",
    placement: "Side seam — waist to cuff",
    note: "Woven or knitted tape — bespoke widths available",
    compat: ["French Terry", "Loop Back", "Brushed Fleece"],
    icon: "📏",
  },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Standard / PMS Matched", note: "Full PMS range. Lab dip approval before bulk.", swatches: ["bg-red-400", "bg-blue-500", "bg-emerald-500", "bg-yellow-400", "bg-purple-500"] },
  { name: "Yarn-Dyed", subtitle: "Stripe & Panel", note: "Side stripe colour-block programmes. Longer lead times.", swatches: ["bg-slate-700", "bg-red-600", "bg-amber-500", "bg-teal-500", "bg-slate-400"] },
  { name: "Garment Dye", subtitle: "Vintage / Washed Tones", note: "Enzyme or pigment wash — popular in USA streetwear.", swatches: ["bg-stone-300", "bg-stone-400", "bg-stone-500", "bg-stone-600", "bg-slate-500"] },
  { name: "Organic / Low-Impact", subtitle: "GOTS Certified", note: "OEKO-TEX certified process. No restricted substances.", swatches: ["bg-green-200", "bg-green-400", "bg-emerald-300", "bg-lime-300", "bg-teal-300"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic fibre sourcing and processing for cotton programmes", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — EU/UK import compliance", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Labour standards and worker welfare audit", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment platform", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled polyester content verification", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Improved cotton farming and sustainability metrics", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "Demanding social certification — worker rights, wages and conditions audited", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency across the supply chain", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Co-ord Set GSM Matching", desc: "Exact GSM and dye lot matching between sweatshirt or hoodie top and sweatpants bottom — essential for a complete co-ord programme." },
  { num: "02", title: "Waistband Construction", desc: "Elastic-only, elastic + drawstring, or wide waistband with full branding placement — all specifications and rib GSM available." },
  { num: "03", title: "Pocket Configuration", desc: "Side slash pockets, back hip pocket, patch pocket, or no pocket — functional and aesthetic specifications accepted." },
  { num: "04", title: "Ankle & Cuff Options", desc: "Ribbed ankle cuff, open hem, tapered hem, or frayed finish — cuff rib GSM and stretch percentage specified separately." },
  { num: "05", title: "Label & Branding Placement", desc: "Woven waistband label, woven cuff tab, embroidered waistband logo, silicone heat transfer — all to your brand specification." },
  { num: "06", title: "Set Retail Packaging", desc: "Individual polybag (folded), co-ord set poly pack (top + bottom together), retail hanger, or bulk export carton." },
];

const SECTORS = [
  { abbr: "AL", name: "Athleisure", detail: "Co-ord set programmes for active and casual lifestyle brands", market: "USA · UK · Australia" },
  { abbr: "FA", name: "Fashion Retail", detail: "Seasonal streetwear and contemporary menswear / womenswear", market: "USA · EU · UK" },
  { abbr: "SL", name: "Sportswear", detail: "Performance bottoms in cotton-spandex for gym and sport brands", market: "USA · EU · Middle East" },
  { abbr: "DT", name: "DTC / E-commerce", detail: "Direct-to-consumer loungewear and lifestyle brands building co-ord sets", market: "Global" },
  { abbr: "WS", name: "Wholesale Dist.", detail: "Bulk volume sweatpants for multi-brand wholesale distributors", market: "USA · EU · South America" },
  { abbr: "HO", name: "Hospitality", detail: "Branded loungewear for hotel amenity and spa retail programmes", market: "Middle East · EU · USA" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight. Buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory gate. Lowest price, highest buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag (Folded)", note: "Standard bulk export" },
  { icon: "👗", label: "Co-ord Set Poly Pack", note: "Top + bottom together" },
  { icon: "🪝", label: "Hanger + Polybag", note: "Retail-ready on arrival" },
  { icon: "📦", label: "Flat Fold — Bulk Export", note: "Maximum container efficiency" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory shortlist, pricing and co-ord capability confirmed", color: "bg-gold" },
  { stage: "Sample Production", days: "15–20", desc: "Pre-production samples — top and bottom sampled together for sets", color: "bg-blue-500" },
  { stage: "Bulk Production", days: "45–70", desc: "From confirmed PO and approved sample", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection with set matching verification", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "20–30", desc: "FCL / LCL from Karachi or Port Qasim", color: "bg-teal-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton across all terry and fleece constructions. Traceable from farm to finished garment.", tag: "GOTS" },
  { icon: "💧", title: "Water Efficiency", desc: "Enzyme washing replaces stone washing — lower water consumption and zero stone dust waste.", tag: "Process" },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester blends available for loop back and polar fleece programmes.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited factories. Worker welfare, safety and fair wages independently verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "Reactive dyeing with OEKO-TEX certified chemicals only. No azo dyes, no restricted substances.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags, FSC-certified paper hangtags and boxes available on request for any programme.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction, GSM, fit, decoration, co-ord set requirements, quantity, destination and delivery date via our RFQ form." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We match your sweatpants programme with certified Pakistan knitwear factories whose fleece and terry construction capacity aligns with your specification — co-ord set capability confirmed before pricing is issued." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Pre-production samples produced to specification in 15–20 days. For co-ord sets, top and bottom sampled together for GSM and dye lot approval." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review construction, fit, decoration, waistband spec and set composition. Revise as required before purchase order placement." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Fabric cut, production commences. Co-ord set top and bottom are scheduled together. Duration depends on quantity and construction." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection with set matching verification. Packing and loading. FCL or LCL from Karachi or Port Qasim." },
];

const FAQS = [
  {
    q: "Can you produce matching sweatpants to go with a sweatshirt or hoodie order (co-ord sets)?",
    a: "Yes — co-ord set production is a core capability. We match top and bottom on construction, GSM, dye lot and colour standard so the set presents uniformly. For co-ord programmes, we specify matching rib GSM for waistband and cuffs and confirm colour approval on both pieces simultaneously. Top and bottom can be sampled together with a single lab dip approval stage.",
  },
  {
    q: "What is the difference between French terry and brushed fleece for sweatpants?",
    a: "French terry has a smooth face and looped interior — it produces a clean, flat silhouette and is the most versatile co-ord set construction. Brushed fleece has the interior loops brushed into a napped surface — the result is a softer, more luxurious hand feel that commands premium retail pricing. Brushed fleece requires soft-hand inks for screen printing; French terry accepts standard inks. For most co-ord programmes, French terry is the practical choice; brushed fleece is preferred when in-hand tactile quality is a primary purchase driver.",
  },
  {
    q: "What waistband and drawstring specifications are available?",
    a: "We offer elastic-only waistbands, elastic plus drawstring, and wide logo-placement waistbands. Waistband rib weight (GSM) can be specified separately from the body construction — higher rib GSM provides more structure and holds branding better. Drawstring material options include cotton cord, polyester cord, flat woven tape and custom colour-matched cord. Drawstring exit holes can be eyelets, seam openings or fabric loops.",
  },
  {
    q: "What decoration options work on sweatpants — leg print, waistband embroidery?",
    a: "Screen print on the thigh or leg is the most common decoration — left thigh, right thigh or full-leg placement. Soft-hand inks are required for brushed fleece to preserve the nap. Embroidery on the waistband or back hip is popular for logo placement — French terry provides the best stitch base. Heat transfer suits sharp logo marks. Side stripe taping in a contrasting colour is available as a structural decoration — woven or knitted tape to custom width.",
  },
  {
    q: "Do you offer cotton-spandex joggers for performance or athleisure programmes?",
    a: "Yes. Cotton-spandex (95/5 or 92/8) is available for performance and athleisure-positioned joggers. The 4-way stretch provides athletic recovery and reduces knee-bagging over time. Available in tapered and slim fits. Sublimation printing is possible on polyester-spandex variants. Moisture-wicking finish is an option. Typically 240–320 GSM — lighter than fleece constructions but with the stretch performance athleisure programmes require.",
  },
  {
    q: "What are typical indicative lead times for a co-ord set programme?",
    a: "⚠️ All timelines below are indicative only and vary with construction, quantity, factory scheduling and sample revision cycles. RFQ to factory quotation: 3–5 working days. Pre-production sampling (top + bottom together): 15–20 working days from spec lock. Bulk production: 45–70 working days from confirmed purchase order and sample approval. Ocean freight: 20–30 days from Karachi to major destination ports. Total indicative schedule from RFQ to goods at destination: approximately 90–120 working days.",
  },
];

// ─── Main component ────────────────────────────────────────────────────────────

export default function SweatpantsContent() {
  const [activeConstruction, setActiveConstruction] = useState("french-terry");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-sweatpants-joggers.webp"
            fill
            alt="Pakistan sweatpants and jogger manufacturer — OEM French terry and fleece bottoms for activewear brands in USA, UK and Europe"
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
              <span className="text-gold">Sweatpants & Joggers</span>
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
              Sweatpants &amp;<br />
              <span className="text-gold">Jogger</span>
              <br />
              Manufacturer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              MZ Global Trading sources OEM sweatpants and joggers from
              Pakistan&rsquo;s certified knitwear mills. French terry, brushed
              fleece and cotton-spandex. Tapered, relaxed and athletic cuts.
              Co-ord top-and-bottom set programmes for USA, UK, Europe and
              worldwide.
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
                onClick={() => scrollToId("section-constructions")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Constructions
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

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS ANCHOR
      ═══════════════════════════════════════════════════════════════════════ */}
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
                Sweatpants &amp; Jogger Supply — Co-ord Set Programmes
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Co-ord Set Sourcing — Bottoms Built to Match
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s certified knitwear mills produce complete co-ord programmes: top and bottom matched on construction, GSM and dye lot. Fleece bottoms across five constructions — placed directly with verified factories at scale.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "5", label: "Constructions" },
                { val: "280–400", label: "GSM Range" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
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

      {/* ═══════════════════════════════════════════════════════════════════════
          CERTIFICATIONS STRIP
      ═══════════════════════════════════════════════════════════════════════ */}
      <CertificationsStrip />

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN BENTO GRID  id="bento-grid"
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* ROW 1: Constructions + Fit Profiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧶</span>
                <div>
                  <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase">Technical</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-slate-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    <p className="text-xs text-slate-600 mt-1 leading-tight">{c.best[0]}</p>
                    {c.badge && (
                      <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>
                    )}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase">Silhouette</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fit Profiles &amp; Silhouettes</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {FIT_PROFILES.map((f) => (
                  <div
                    key={f.code}
                    className="bg-white rounded-xl px-4 py-3 border border-gray-200"
                    style={{ boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.06), inset -2px -2px 5px rgba(255,255,255,0.9)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center shrink-0">{f.code}</span>
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{f.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{f.waist}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-fits" label="Explore Fit Profiles" />
            </motion.div>
          </div>

          {/* ROW 2: GSM + Decoration + Colours + OEM */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Tiers</h3>
              <div className="flex flex-col gap-3 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-xl p-3 border border-amber-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg" aria-hidden="true">{t.icon}</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <p className="text-xs font-bold text-navy-900">{t.gsm}</p>
                    <p className="text-[10px] font-semibold text-amber-600 mt-0.5">{t.season}</p>
                    <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden mt-1.5">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View Weight Guide" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Decoration Options</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-rose-50">
                    <span className="text-base shrink-0" aria-hidden="true">{d.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{d.placement}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decorations" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programmes</h3>
              <div className="flex flex-col gap-3 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-3 border border-purple-50">
                    <p className="text-xs font-semibold text-navy-900 mb-1.5">{d.name}</p>
                    <div className="flex gap-1.5 mb-1">
                      {d.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${s}`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400">{d.subtitle}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colors" label="Explore Colours" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM &amp; Custom Programmes</h3>
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

          {/* ROW 3: Markets + Certifications + Export */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

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
                    <p className="text-xs text-gray-400 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Markets" />
            </motion.div>

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
                  <div key={c.name} className="bg-white rounded-xl border border-green-100 flex items-center justify-center p-2" style={{ height: 56 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={72} height={44} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

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
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{e.full}</p>
                      <p className="text-[10px] text-gray-400">{e.port}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* ROW 4: Sustainability + Process */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

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
                    <span className="text-[10px] font-semibold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full w-fit">{s.tag}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-navy-900 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-white">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <p className="text-xs font-semibold text-white">{p.short}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-1 pl-8">+ 2 more steps</p>
              </div>
              <ExploreBtn sectionId="section-process" label="View Our Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          RESOURCES ROW
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Sweatpants &amp; Fleece Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction guide, GSM selection and co-ord set programme planning for international buyers.</p>
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
              <p className="text-xs text-gray-500 leading-relaxed">Construction spec sheets, standard size charts and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Sweatpants?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, GSM, fit and quantity — RFQ takes 3 minutes. Factory match within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — CONSTRUCTIONS — TECHNICAL UI — COMPARISON TABLE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-[#080E1A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-12">
            <div className="w-px h-16 bg-gold/40 mt-1 hidden sm:block" aria-hidden="true" />
            <div>
              <p className="font-mono text-gold/70 text-xs tracking-[0.3em] uppercase mb-2">
                [TECHNICAL SPECIFICATION — FLEECE CONSTRUCTIONS]
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Five Sweatpants Constructions</h2>
              <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">
                Each fleece construction positions differently across retail, performance and co-ord programmes. Select the active construction to review full technical specifications.
              </p>
            </div>
          </div>

          {/* Tab selectors */}
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

          {/* Active construction detail — shown first so the click change is immediately visible */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeConstruction}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid lg:grid-cols-3 gap-6 mb-10"
            >
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-white">{ac.name}</h3>
                  {ac.badge && (
                    <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">{ac.badge}</span>
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

          {/* Comparison table — reference overview below the detail panel */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mt-10">
            <p className="text-gold/70 font-mono text-[10px] tracking-[0.3em] uppercase mb-3">[CONSTRUCTION OVERVIEW — ALL FIVE]</p>
            <div className="min-w-[600px]">
              <div className="grid grid-cols-5 bg-white/5 border border-white/10 rounded-t-2xl text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest px-4 py-3 gap-2">
                <span>Construction</span>
                <span>GSM Range</span>
                <span>Hand Feel</span>
                <span>Programme Fit</span>
                <span>Suitability</span>
              </div>
              {CONSTRUCTIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConstruction(c.id)}
                  className={`w-full grid grid-cols-5 gap-2 px-4 py-4 border-b border-white/5 text-left transition-all ${
                    activeConstruction === c.id ? "bg-gold/10 border-l-2 border-l-gold" : "hover:bg-white/5"
                  }`}
                >
                  <span className={`text-sm font-semibold ${activeConstruction === c.id ? "text-gold" : "text-white"}`}>
                    {c.name}
                    {c.badge && <span className="ml-2 text-[10px] text-gold/70">★</span>}
                  </span>
                  <span className="text-sm text-gray-300">{c.gsm}</span>
                  <span className="text-xs text-gray-400 leading-snug">{c.hand.split(" — ")[0]}</span>
                  <span className="text-xs text-gray-400">{c.best[0]}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${
                    c.suitability === "Premium" ? "text-gold bg-gold/15" :
                    c.suitability === "Performance" ? "text-blue-400 bg-blue-400/15" :
                    c.suitability === "Value" ? "text-green-400 bg-green-400/15" :
                    "text-gray-400 bg-white/10"
                  }`}>{c.suitability}</span>
                </button>
              ))}
            </div>
          </div>

          <BackToTop dark />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — FIT PROFILES — NEUMORPHISM — CARD LAYOUT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-fits" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Silhouette</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Sweatpants Fit Profiles &amp; Sizing</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            Three silhouettes — Regular, Tapered and Relaxed — each targeting a distinct market position. Waistband, inseam and ankle finish can be specified independently across all constructions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {FIT_PROFILES.map((f, i) => (
              <motion.div
                key={f.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-gray-100 rounded-2xl p-7"
                style={{ boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.08), inset -4px -4px 8px rgba(255,255,255,0.95)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4"
                  style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.12), -3px -3px 6px rgba(255,255,255,0.9)" }}
                >
                  <span className="text-lg font-bold text-navy-900">{f.code}</span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">{f.name}</h3>
                <div className="flex flex-col gap-2.5">
                  {[
                    ["Rise", f.rise],
                    ["Inseam", f.inseam],
                    ["Waistband", f.waist],
                    ["Ankle Finish", f.ankle],
                  ].map(([label, val]) => (
                    <div key={label} className="bg-white/60 rounded-xl px-4 py-2.5"
                      style={{ boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.06), inset -2px -2px 4px rgba(255,255,255,0.8)" }}
                    >
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                      <p className="text-sm text-navy-900 font-medium mt-0.5">{val}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gold font-semibold mt-4 leading-relaxed">{f.market}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-7 border border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
            style={{ boxShadow: "4px 4px 8px rgba(0,0,0,0.06), -4px -4px 8px rgba(255,255,255,0.9)" }}
          >
            {[
              ["XS–3XL", "Size Range"],
              ["US / UK / EU", "Standards Available"],
              ["Custom", "Size Spec On Request"],
              ["Co-ord Match", "Top &amp; Bottom Together"],
            ].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-navy-900" dangerouslySetInnerHTML={{ __html: val }} />
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider" dangerouslySetInnerHTML={{ __html: label }} />
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — GSM WEIGHT — INFOGRAPHIC UI — HISTOGRAM
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-gsm" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Guide</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Sweatpants GSM — Choosing the Right Weight
          </h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            GSM determines season positioning, thermal performance, decoration receptivity and retail price tier. The 280–340 GSM band covers the majority of international orders.
          </p>

          {/* Infographic histogram */}
          <div className="flex items-end justify-center gap-6 sm:gap-10 mb-12 px-4" aria-label="GSM distribution chart">
            {GSM_TIERS.map((tier, i) => (
              <motion.div
                key={tier.gsm}
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                style={{ transformOrigin: "bottom" }}
                className="flex flex-col items-center gap-3 flex-1 max-w-[200px]"
              >
                <div className="flex flex-col items-center gap-2 w-full">
                  <p className={`text-3xl font-bold ${tier.featured ? "text-gold" : "text-navy-900"}`}>{tier.pct}%</p>
                  <p className="text-xs text-gray-400">of orders</p>
                </div>
                <div
                  className={`w-full rounded-t-2xl ${tier.color} relative`}
                  style={{ height: `${(tier.pct / 70) * 180}px`, minHeight: 60 }}
                >
                  <div className="absolute top-3 left-0 right-0 flex justify-center">
                    <span className="text-2xl" aria-hidden="true">{tier.icon}</span>
                  </div>
                  {tier.featured && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="text-[10px] font-bold text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded-full">Most Ordered</span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-navy-900">{tier.gsm}</p>
                  <p className="text-xs text-gray-500 font-medium">{tier.name}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{tier.season}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {GSM_TIERS.map((tier) => (
              <div key={tier.gsm} className={`rounded-2xl p-7 border-2 ${tier.featured ? "border-gold shadow-lg bg-gold/5" : "border-gray-100 bg-gray-50"}`}>
                {tier.featured && (
                  <span className="inline-block mb-3 text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Ordered
                  </span>
                )}
                <p className={`text-3xl font-bold mb-1 ${tier.featured ? "text-gold" : "text-navy-900"}`}>{tier.gsm}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{tier.name}</p>
                <p className="text-sm font-semibold text-navy-900 mb-3">{tier.season}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{tier.desc}</p>
                <p className="text-xs text-gold font-semibold">{tier.market}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — DECORATION — MOODBOARD UI — TILE LAYOUT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-decoration" className="bg-rose-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Decoration</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Sweatpants Decoration Methods &amp; Placement
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl leading-relaxed">
            From leg graphics to waistband branding — five decoration routes, each suited to specific constructions and placement zones.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DECO_METHODS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                    <span className="text-2xl" aria-hidden="true">{d.icon}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">{d.code}</span>
                    <h3 className="text-base font-bold text-navy-900 mt-0.5">{d.method}</h3>
                  </div>
                </div>
                <div className="bg-rose-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Placement</p>
                  <p className="text-sm text-navy-900">{d.placement}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Compatible with</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.compat.map((c) => (
                      <span key={c} className="text-[11px] bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">{d.note}</p>
              </motion.div>
            ))}
            {/* Last tile — CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="bg-navy-900 rounded-2xl p-6 border border-navy-900 shadow-sm flex flex-col gap-4 justify-between"
            >
              <div>
                <span className="text-3xl" aria-hidden="true">✏️</span>
                <h3 className="text-xl font-bold text-white mt-3 mb-2">Custom Decoration Brief</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Have a specific placement or technique not listed? Share your brief in the RFQ and our sourcing team will confirm feasibility with the factory.
                </p>
              </div>
              <Link
                href="/rfq/"
                className="inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-5 py-3 rounded-xl hover:bg-yellow-400 transition-colors w-fit"
              >
                Submit Brief <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOURS — GRADIENT UI — SWATCH GRID
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-colors" className="bg-gradient-to-br from-[#1a0a3b] via-[#2d1060] to-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Programmes</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sweatpants Dye Options &amp; Colour Standards
          </h2>
          <p className="text-purple-200 mb-12 max-w-2xl leading-relaxed">
            Full PMS-matched colour range across all fleece and terry constructions. Lab dip approval before bulk production on every colour-critical programme.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-bold text-white">{d.name}</p>
                    <p className="text-xs text-purple-300 mt-0.5">{d.subtitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-1.5 mb-4">
                  {d.swatches.map((s, j) => (
                    <div key={j} className={`h-7 rounded-lg ${s}`} aria-hidden="true" />
                  ))}
                  {/* Additional neutral swatches */}
                  {["bg-white", "bg-gray-200", "bg-gray-400", "bg-gray-600", "bg-black", "bg-navy-900"].map((s, j) => (
                    <div key={`neutral-${j}`} className={`h-7 rounded-lg ${s} border border-white/10`} aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xs text-purple-200 leading-relaxed">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-7 grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
            {[
              ["Full PMS", "Matched colours available"],
              ["Lab Dip", "Approval before bulk"],
              ["ISO 105 X12", "Colour fastness standard"],
              ["Co-ord Match", "Top &amp; bottom dye lot aligned"],
            ].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-gold" dangerouslySetInnerHTML={{ __html: val }} />
                <p className="text-xs text-purple-200 mt-1" dangerouslySetInnerHTML={{ __html: label }} />
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM — CORPORATE UI — NUMBERED LIST
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-sky-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM Capability</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
                Custom Sweatpants &amp; Co-ord Programme Specifications
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                MZ Global Trading coordinates the full OEM specification for your sweatpants programme — from waistband engineering and pocket configuration to co-ord set GSM matching and retail packaging. Every detail specified before factory order placement.
              </p>
              <Link
                href="/rfq/"
                className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-sky-900 transition-colors"
              >
                Start Your Programme <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="flex flex-col gap-0 divide-y divide-sky-100 bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm">
              {OEM_FEATURES.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex gap-5 p-6"
                >
                  <span className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 text-sm font-bold flex items-center justify-center shrink-0">{f.num}</span>
                  <div>
                    <p className="font-bold text-navy-900 mb-1">{f.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKETS — GRID UI — REGION TILES
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-[#0D2B2B] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-teal-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Global Reach</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            International Sweatpants Export Markets
          </h2>
          <p className="text-teal-200 mb-12 max-w-2xl leading-relaxed">
            Pakistan&rsquo;s knitwear mills supply sweatpants and co-ord sets to 35+ markets. Buyers in USA, UK, Europe and Australia account for the majority of volume; Middle East and SE Asia are the fastest-growing categories.
          </p>

          {/* Equal region tiles — Grid UI */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
            {[
              { region: "USA / Canada", emoji: "🇺🇸", detail: "Largest market — athleisure, DTC, streetwear" },
              { region: "UK / Ireland", emoji: "🇬🇧", detail: "Fashion retail, sportswear, premium basics" },
              { region: "EU (All)", emoji: "🇪🇺", detail: "OEKO-TEX required — fashion and sport retail" },
              { region: "Middle East", emoji: "🌙", detail: "Hospitality loungewear, luxury retail" },
              { region: "SE Asia", emoji: "🌏", detail: "Athleisure growth — Singapore, Malaysia, Vietnam" },
              { region: "Australia / NZ", emoji: "🦘", detail: "Athleisure, activewear and lifestyle brands" },
              { region: "South America", emoji: "🌎", detail: "Value-tier volume — Brazil, Argentina, Colombia" },
              { region: "Japan / S. Korea", emoji: "🗾", detail: "Premium quality focus — design-led programmes" },
              { region: "Russia / CIS", emoji: "🧊", detail: "Heavy fleece — cold-climate heavy-weight demand" },
              { region: "South Africa", emoji: "🌍", detail: "Activewear and sportswear retail" },
              { region: "India", emoji: "🇮🇳", detail: "Sportswear and athleisure wholesale" },
              { region: "Global DTC", emoji: "📦", detail: "E-commerce brands shipping worldwide" },
            ].map((r) => (
              <div key={r.region} className="bg-white/10 border border-white/15 rounded-xl p-4 flex flex-col gap-2 hover:bg-white/15 transition-colors">
                <span className="text-2xl" aria-hidden="true">{r.emoji}</span>
                <p className="text-xs font-bold text-white">{r.region}</p>
                <p className="text-[10px] text-teal-300 leading-snug">{r.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white/10 border border-white/15 rounded-2xl p-6"
              >
                <span className="inline-block text-xs font-bold text-teal-400 bg-teal-400/15 px-3 py-1 rounded-full mb-3">{s.abbr}</span>
                <h3 className="text-base font-bold text-white mb-1">{s.name}</h3>
                <p className="text-sm text-teal-200 leading-relaxed mb-2">{s.detail}</p>
                <p className="text-xs text-gold font-semibold">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS — INFOGRAPHIC UI — LOGO GRID + STAT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
            <div className="lg:col-span-1">
              <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Standards</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
                10+ Certifications Across Our Sweatpants Factory Network
              </h2>
              <div className="flex flex-col gap-4">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
                  <p className="text-5xl font-bold text-green-600 mb-1">10+</p>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Factory Certifications</p>
                </div>
                <div className="bg-navy-900 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-gold mb-1">35+</p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Export Markets</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {CERTIFICATIONS.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className={`bg-gray-50 border rounded-2xl p-5 flex flex-col gap-3 ${c.tier === "Premium" ? "border-gold/40" : "border-gray-100"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div style={{ width: 80, height: 44 }}>
                        <Image src={c.img} alt={`${c.name} certification — ${c.full}`} width={80} height={44} className="object-contain w-full h-full" />
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        c.tier === "Premium" ? "text-gold bg-gold/10" :
                        c.tier === "Optional" ? "text-gray-400 bg-gray-100" :
                        "text-green-600 bg-green-50"
                      }`}>{c.tier}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy-900">{c.name}</p>
                      <p className="text-xs text-gray-500 leading-snug mt-0.5">{c.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">Important — Active Certification</p>
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              Certifications listed reflect the documented scope held across our vetted Pakistan factory network. For EU and UK buyers, OEKO-TEX Standard 100 and GOTS certifications are actively available as a specification requirement — not a premium add-on. Request current certificates in your RFQ and we will provide them with the factory quotation.
            </p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 9 — EXPORT & PACKAGING — DATA VIZ UI — TABLE + TIMELINE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-orange-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export &amp; Logistics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">
            Incoterms, Packaging &amp; Lead Times for Sweatpants Orders
          </h2>

          {/* Incoterms table */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-12">
            <div className="border border-orange-100 rounded-2xl overflow-hidden min-w-[540px]">
              <div className="grid grid-cols-4 bg-navy-900 text-xs font-bold text-gray-300 uppercase tracking-wider px-5 py-4 gap-4">
                <span>Incoterm</span>
                <span>Full Name</span>
                <span>Port</span>
                <span>Buyer Responsibility</span>
              </div>
              {EXPORT_TERMS.map((e, i) => (
                <div key={e.term} className={`grid grid-cols-4 gap-4 px-5 py-4 border-b border-orange-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-orange-50/50"}`}>
                  <span className="text-sm font-bold text-gold">{e.term}</span>
                  <span className="text-sm text-navy-900">{e.full}</span>
                  <span className="text-sm text-gray-500">{e.port}</span>
                  <span className="text-xs text-gray-500 leading-snug">{e.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Packaging options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {PACK_OPTIONS.map((p) => (
              <div key={p.label} className="bg-white rounded-xl p-5 border border-orange-100 text-center">
                <span className="text-2xl block mb-2" aria-hidden="true">{p.icon}</span>
                <p className="text-xs font-semibold text-navy-900 leading-snug">{p.label}</p>
                <p className="text-[10px] text-gray-400 mt-1">{p.note}</p>
              </div>
            ))}
          </div>

          {/* Lead time timeline */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Indicative Lead Times</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 mb-6 flex items-start gap-3">
              <span className="text-amber-600 text-base shrink-0" aria-hidden="true">⚠️</span>
              <p className="text-xs text-amber-800 leading-relaxed">
                All timelines are indicative only. Actual lead times vary with construction, order quantity, factory scheduling, sample revision cycles and shipping route. Confirm schedule at RFQ stage.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-0">
              {LEAD_STAGES.map((stage, i) => (
                <div key={stage.stage} className="flex-1 relative">
                  <div className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 p-4">
                    <div className={`w-10 h-10 rounded-full ${stage.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{i + 1}</div>
                    <div className="sm:text-center">
                      <p className="text-xs font-bold text-navy-900">{stage.stage}</p>
                      <p className="text-lg font-bold text-gold">{stage.days}</p>
                      <p className="text-[10px] text-gray-400 hidden sm:block">{stage.desc}</p>
                    </div>
                  </div>
                  {i < LEAD_STAGES.length - 1 && (
                    <div className="hidden sm:block absolute top-8 -right-2 w-4 h-px bg-gray-300 z-10" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Working days shown. Sea freight duration varies by destination port.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — SCANDINAVIAN UI — ICON + BULLET LIST
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-[#F8FAF7] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#4a7c59] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Sustainable Sourcing</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
                Responsible Fleece &amp; Terry Sourcing from Pakistan
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Sustainability credentials for sweatpants programmes are independently verified — not self-declared. GOTS and OEKO-TEX certificates are active documentation held by our factory network, available to buyers as hard purchase requirements, not optional upgrades.
              </p>
              <div className="flex gap-4">
                <div className="bg-[#e8f0e8] rounded-2xl px-6 py-5 text-center flex-1">
                  <p className="text-3xl font-bold text-[#4a7c59]">GOTS</p>
                  <p className="text-xs text-gray-500 mt-1">Organic cotton certified</p>
                </div>
                <div className="bg-[#e8f0e8] rounded-2xl px-6 py-5 text-center flex-1">
                  <p className="text-3xl font-bold text-[#4a7c59]">GRS</p>
                  <p className="text-xs text-gray-500 mt-1">Recycled content verified</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {SUSTAINABILITY_ITEMS.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex gap-4 items-start bg-white rounded-2xl p-5 border border-[#dde8dd]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#f0f7f0] flex items-center justify-center shrink-0">
                    <span className="text-xl" aria-hidden="true">{s.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-navy-900">{s.title}</p>
                      <span className="text-[10px] font-semibold text-[#4a7c59] bg-[#e8f0e8] px-2 py-0.5 rounded-full">{s.tag}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 11 — PROCESS — SWISS DESIGN UI — NUMBERED PROCESS FLOW
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-white py-20 lg:py-28 border-t-4 border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-16">
            <div>
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-gray-300 mb-4">SOURCING PROCESS</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 leading-[1.05]">
                RFQ to<br />Shipment —<br />
                <span className="text-gold">Six Stages.</span>
              </h2>
            </div>
            <div className="hidden lg:block w-px bg-gray-200 self-stretch ml-8" aria-hidden="true" />
            <div className="hidden lg:flex flex-col justify-center pl-8">
              <p className="text-gray-500 max-w-sm leading-relaxed text-sm">
                Each stage has a defined deliverable and a clear handoff between MZ Global Trading and the buyer. The co-ord programme track runs top and bottom in parallel from Sample Production onwards.
              </p>
            </div>
          </div>
          <div className="border-t-2 border-gray-100">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{step.short}</p>
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

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">
            Sweatpants &amp; Jogger Sourcing FAQ
          </h2>
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
              { name: "Henley Shirts", desc: "Four constructions — single jersey to waffle knit. Casual and workwear programmes.", href: "/apparel/knittedgarments/henleyshirts/", img: "/images/hero/hero-henley-shirts.webp", alt: "Pakistan henley shirt manufacturer — OEM single jersey and waffle knit henleys for casual and workwear programmes" },
              { name: "Sweatshirts & Hoodies", desc: "French terry, loop back and bonded fleece. 300–420 GSM. Embroidery and print.", href: "/apparel/knittedgarments/sweatshirtshoodies/", img: "/images/hero/hero-sweatshirts-hoodies.webp", alt: "Pakistan sweatshirt and hoodie manufacturer — OEM French terry and fleece hoodies for sportswear and retail brands" },
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

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════════════ */}
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
              Ready to Source Sweatpants<br />&amp; Joggers from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Standalone jogger or full co-ord programme — French terry, brushed fleece or performance stretch, tapered or relaxed, with matching waistband specification. Submit the RFQ; receive a certified Pakistan knitwear mill match within 3–5 working days, with set pricing across top and bottom.
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
