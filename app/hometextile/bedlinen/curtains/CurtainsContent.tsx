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
    id: "plain-weave",
    name: "Plain Weave",
    gsm: "90–180 GSM",
    character: "Versatile, printable, mainstream retail baseline — accepts both solid dyeing and full-drop printed designs.",
    light: "Partial opacity — room-darkening options with lining",
    best: ["Mass retail", "E-commerce", "Printed collections", "Seasonal programmes"],
    markets: ["USA", "UK", "EU", "Australia"],
    note: "The most widely produced curtain fabric. Low cost, universal suitability, full PMS colour range.",
  },
  {
    id: "jacquard",
    name: "Jacquard Woven",
    gsm: "200–350 GSM",
    character: "Woven pattern intrinsic to the fabric structure — no print. Formal, premium residential and hotel.",
    light: "Moderate room-darkening depending on weight",
    best: ["Premium residential", "Hotel contract", "Traditional décor", "Formal interiors"],
    markets: ["UK", "EU", "Middle East", "USA luxury"],
    note: "Pattern cannot fade or wash out — architectural presence in formal rooms.",
  },
  {
    id: "voile",
    name: "Voile / Sheer",
    gsm: "60–120 GSM",
    character: "Translucent, light-diffusing — designed to layer with blackout panels for dual-function window treatment.",
    light: "Transparent — filters without blocking",
    best: ["Layer panels", "Bedroom privacy", "Dining rooms", "Minimalist interiors"],
    markets: ["UK", "EU", "Australia", "Scandinavia"],
    note: "Usually hung behind primary curtain. Adds softness and privacy without blocking natural light.",
  },
  {
    id: "blackout",
    name: "Blackout / Triple Weave",
    gsm: "250–400 GSM",
    character: "Zero light penetration — woven-in blackout (triple weave) or coating-back. Hotel, nursery and home cinema essential.",
    light: "Zero — complete room darkening",
    best: ["Hotels (all rooms)", "Nurseries", "Home cinema", "Shift workers"],
    markets: ["USA", "UK", "EU", "Middle East hotels"],
    note: "Triple weave is the premium specification — blackout performance maintained after 100+ wash cycles.",
  },
  {
    id: "linen",
    name: "Linen / Linen-Look",
    gsm: "150–250 GSM",
    character: "Natural texture, organic drape, luxury lifestyle. Scandinavian, French country and Mediterranean interior programmes.",
    light: "Soft filtering — warm natural light",
    best: ["Luxury residential", "Interior design brands", "Lifestyle retail", "Eco programmes"],
    markets: ["EU", "USA lifestyle", "Australia", "Scandinavia"],
    note: "Linen-look polyester blends offer the aesthetic at lower cost and greater dimensional stability.",
  },
  {
    id: "velvet",
    name: "Velvet (Polyester)",
    gsm: "350–500 GSM",
    character: "Deep pile, dramatic drape — Winter statements. Premium interior design and hotel public spaces.",
    light: "High room-darkening without lining",
    best: ["Winter retail", "Premium interior", "Hotel bars and lobbies", "Statement spaces"],
    markets: ["UK", "EU", "Middle East", "Russia/CIS"],
    note: "Polyester velvet maintains pile integrity better than cotton velvet across multiple wash cycles.",
  },
];

const HEADING_TYPES = [
  { code: "RP", name: "Rod Pocket", desc: "Simple rod casing sewn directly into the heading — rod threads through the casing. Most affordable. Full-length and café-curtain applications.", market: "Mass retail · Budget-friendly" },
  { code: "EG", name: "Eyelet / Grommet", desc: "Metal rings punched through the heading tape. Contemporary, casual ripple effect. Polypropylene or brass rings. The dominant UK mass-market heading.", market: "Contemporary retail · UK mainstream" },
  { code: "PP", name: "Pinch Pleat", desc: "Heading tape with three-fold pinch pleat hooks. Formal, structured drape — the traditional hotel and premium residential specification.", market: "Hotel contract · Formal residential" },
  { code: "TT", name: "Tab Top", desc: "Fabric loops sewn directly to the heading. Relaxed, artisanal visual language. Slower to open and close versus rod pocket. Popular in rustic and farmhouse styles.", market: "Artisan retail · Farmhouse style" },
  { code: "RT", name: "Ring Top", desc: "Curtain rings attached to the heading — smooth professional glide on tracks and poles. Standard in premium residential and hospitality contract supply.", market: "Premium residential · Hospitality" },
];

const DIMENSIONS = [
  { size: "90 × 137 cm", name: "Short / Sill-length", market: "Café curtains · Kitchens · Bathrooms" },
  { size: "90 × 183 cm", name: "Standard Drop", market: "Standard UK residential · Mass retail baseline" },
  { size: "90 × 228 cm", name: "Full Floor-length", market: "Living rooms · Bedrooms · UK/EU premium" },
  { size: "90 × 274 cm", name: "Extra Long", market: "High-ceiling rooms · Luxury residential" },
  { size: "137 × 183 cm", name: "Wide Standard", market: "Wide windows · Bay windows · Double-width" },
  { size: "137 × 274 cm", name: "Wide Extra Long", market: "Feature walls · Grand rooms · Contract supply" },
  { size: "Custom", name: "Any width × drop", market: "Specify exact dimension in RFQ" },
];

const DESIGN_OPTIONS = [
  { name: "Printed Pattern (Full Drop)", code: "PRT", method: "Reactive / Digital", best: "All-over photo, geometric or botanical — covers entire panel face", note: "Most popular for retail collections. Digital print enables small runs." },
  { name: "Jacquard Woven", code: "JQD", method: "Structural weave", best: "Woven-in pattern — premium, no fade risk, structural integrity", note: "No printing process — pattern is part of the woven construction." },
  { name: "Embroidered Panel", code: "EMB", method: "Machine embroidery", best: "Floral motifs, border embroidery, monogram — placement decoration", note: "Best on heavier plain weave or linen. Adds significant cost but high perceived value." },
  { name: "Plain / Solid", code: "PLN", method: "Reactive or vat dye", best: "Classic hotel specification. Minimalist décor. Coordinate sets.", note: "Full PMS range available. Lab dip before bulk. Most time-efficient." },
  { name: "Stripe / Check (Woven)", code: "STR", method: "Yarn-dyed", best: "Classic ticking stripe, awning, country check", note: "Colour depth exceeds printed stripe. Longer lead time than plain." },
  { name: "Abstract Digital Print", code: "DIG", method: "Digital inkjet", best: "Trend-forward, art-inspired, seasonal collections", note: "Enables unlimited repeat sizes — ideal for designer collaborations." },
];

const COLOUR_RANGES = [
  { name: "Neutral Whites & Ivories", hex: "#F5F0E8", desc: "Ivory, cream, linen-white, warm white — universal hotel and residential", swatches: ["bg-stone-50", "bg-stone-100", "bg-yellow-50", "bg-orange-50"] },
  { name: "Grey Tones & Charcoals", hex: "#6B7280", desc: "Light silver, warm grey, slate, anthracite — contemporary minimalist", swatches: ["bg-gray-200", "bg-gray-400", "bg-slate-500", "bg-gray-700"] },
  { name: "Navy & Deep Blues", hex: "#1e3a5f", desc: "Navy, petrol, midnight — classic formal and hotel specification", swatches: ["bg-blue-200", "bg-blue-500", "bg-blue-800", "bg-navy-900"] },
  { name: "Natural Linens & Stones", hex: "#A9917A", desc: "Sand, camel, terracotta, mushroom — lifestyle and biophilic programmes", swatches: ["bg-stone-200", "bg-stone-300", "bg-amber-200", "bg-orange-200"] },
  { name: "Full Custom PMS Range", hex: "#D4A017", desc: "Any PMS colour — reactive dyeing with lab dip approval before bulk", swatches: ["bg-red-400", "bg-emerald-500", "bg-purple-600", "bg-gold"] },
];

const OEM_FEATURES = [
  { num: "01", title: "Fabric & Construction Selection", desc: "Plain weave through to jacquard and velvet — sourced from certified Pakistan weaving mills to your weight and weave specification." },
  { num: "02", title: "Heading Tape Specification", desc: "Rod pocket, eyelet, pinch pleat, tab top or ring top — all heading tapes sourced and applied to your nominated specification." },
  { num: "03", title: "Drop & Width Customisation", desc: "Standard dimensions or custom width × drop. Seam allowance and hem depth to your specification." },
  { num: "04", title: "Print & Pattern Development", desc: "Your artwork, colour separations and print placement managed. Digital and screen print. Strike-off approval before bulk production." },
  { num: "05", title: "Lining Programme", desc: "Unlined, lined (block lining), interlined and blackout-lined — all four options available per SKU within the same programme." },
  { num: "06", title: "Contract & Retail Packaging", desc: "Individual polybag per panel, retail box (pair-pack), tied roll — all options for trade, retail and direct-to-consumer channels." },
];

const MARKET_SECTORS = [
  { abbr: "RR", name: "Residential Retail", detail: "USA, UK, EU and Australian home retailers — programme buying for seasonal collections", share: 45, color: "bg-blue-500" },
  { abbr: "HC", name: "Hotel / Hospitality Contract", detail: "New hotel openings and refurbishments — blackout and pinch pleat dominant specification", share: 25, color: "bg-gold" },
  { abbr: "EC", name: "E-commerce / DTC", detail: "Direct-to-consumer curtain brands — digital print and standard sizing", share: 15, color: "bg-teal-500" },
  { abbr: "ID", name: "Interior Design Trade", detail: "USA and EU interior designers sourcing custom specification panels", share: 10, color: "bg-purple-500" },
  { abbr: "PD", name: "Property Development", detail: "BTR/BTL residential development — FF&E contract supply at scale", share: 5, color: "bg-orange-400" },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", img: "/images/certs/cert-bluesign.webp" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight; buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all inland and ocean logistics. Lowest price, highest buyer responsibility." },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", tag: "GOTS", desc: "GOTS-certified organic cotton for plain weave and linen constructions — fully traceable from farm to finished panel." },
  { icon: "♻️", title: "Recycled Polyester", tag: "GRS", desc: "GRS-certified recycled polyester for velvet and blackout triple weave — circular material with full chain-of-custody." },
  { icon: "💧", title: "Water Efficiency", tag: "Process", desc: "Low-liquor dyeing and enzyme finishing reduce water consumption per metre versus conventional reactive dyeing." },
  { icon: "⚖️", title: "Ethical Audits", tag: "BSCI / Sedex", desc: "BSCI, Sedex and SA8000 audited weaving and finishing mills. Worker welfare and fair wage compliance verified." },
  { icon: "🎨", title: "Low-Impact Dyes", tag: "OEKO-TEX", desc: "Reactive and vat dyeing with OEKO-TEX certified chemicals only. No azo dyes, no restricted substances." },
  { icon: "📦", title: "Eco Packaging", tag: "Optional", desc: "Recycled polybags and FSC-certified retail packaging available for all retail and contract programmes." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Share construction, heading type, drop, width, design intent, quantity and destination via our RFQ form." },
  { num: "02", title: "Factory Matching", desc: "We shortlist 2–3 Pakistan weaving and finishing mills specialising in your curtain category. Pricing within 3–5 working days." },
  { num: "03", title: "Sample Production", desc: "Pre-production panels produced to your specification — construction, heading, print and lining. 15–20 days from spec lock." },
  { num: "04", title: "Sample Approval", desc: "Review panel weight, drape, heading tape, print quality and lining finish. Revise before purchase order placement." },
  { num: "05", title: "Bulk Production", desc: "Full production commences on PO. FR treatment and embroidered panels require additional lead time — specified in quotation." },
  { num: "06", title: "QC & Shipment", desc: "Pre-shipment inspection, polybag or roll packing, carton loading — FCL or LCL from Karachi or Port Qasim." },
];

const FAQS = [
  { q: "What fabric should I specify for blackout curtains?", a: "Triple weave blackout (woven-in blackout, no coating peeling) is the premium specification — blackout performance is maintained after 100+ wash cycles with no delamination risk. Blackout coating on plain weave is the cost-effective alternative; both achieve zero light penetration. For hotel contract supply, triple weave is strongly recommended for longevity and housekeeping durability." },
  { q: "What heading type is most popular for UK retail curtains?", a: "Eyelet/grommet heading is the most popular for contemporary UK mass-market retail — clean, casual, easy to hang on any pole. Pinch pleat remains the standard for formal rooms and hotel contract supply. Rod pocket suits budget-friendly retail. Tab top suits artisan and farmhouse-style programmes." },
  { q: "What are standard curtain drop dimensions for UK and EU markets?", a: "UK: 90 cm drop (sill-length), 137 cm (below sill), 183 cm (full length to floor), 228 cm (extra long). EU: similar metric dimensions — custom drop ordering is more common in EU than UK. USA: 84\", 96\" and 108\" drops are standard. For hotel contract, exact floor-to-ceiling drop is always specified per room type." },
  { q: "Can you supply FR (flame retardant) certified curtains?", a: "Yes. Flame retardant treatment to BS 5867 (UK), EN 13773 (EU) and NFPA 701 (USA) is available. FR certification is mandatory for all hotel and commercial/contract supply in the UK and EU. Specify FR requirement in your RFQ — FR treatment adds 7–10 working days to production lead time." },
  { q: "Are OEKO-TEX certified curtain fabrics available?", a: "Yes. OEKO-TEX Standard 100 is available across plain weave, jacquard and linen constructions and covers chemical compliance for EU and UK retail import. Note: blackout coatings applied to the reverse have a separate compliance pathway — confirm with your compliance team which standard applies to your specific application." },
  { q: "What order quantities work for a curtain programme?", a: "Curtain programmes vary significantly — from a single-room hotel refurbishment to multi-property FF&E contract supply. Include the number of panels, sizes, heading type and any FR or lining requirement in your RFQ. We match you with factories experienced in both retail programme runs and large-scale contract supply." },
];

const PAGE_SIBLINGS = [
  { title: "Bedsheets", desc: "Custom cotton percale and sateen bedsheets for wholesale buyers.", href: "/hometextile/bedlinen/bedsheets/", img: "/images/hero/hero-bedsheets.webp", alt: "Pakistan bedsheet manufacturer" },
  { title: "Fitted Sheets", desc: "Elasticated fitted sheets with precision pocket depth engineering.", href: "/hometextile/bedlinen/fittedsheets/", img: "/images/hero/hero-fitted-sheets.webp", alt: "Pakistan fitted sheet manufacturer" },
  { title: "Duvet Covers", desc: "Button, zip and envelope duvet covers in percale and jacquard.", href: "/hometextile/bedlinen/duvetcovers/", img: "/images/hero/hero-duvet-covers.webp", alt: "Pakistan duvet cover manufacturer" },
  { title: "Pillow Covers", desc: "Oxford and plain pillowcases in cotton, sateen and linen.", href: "/hometextile/bedlinen/pillowcovers/", img: "/images/hero/hero-pillow-covers.webp", alt: "Pakistan pillow cover manufacturer" },
  { title: "Cushion Covers", desc: "Decorative cushion covers in cotton, linen, jacquard and velour.", href: "/hometextile/bedlinen/cushioncovers/", img: "/images/hero/hero-cushion-covers.webp", alt: "Pakistan cushion cover manufacturer" },
  { title: "Institutional Bedding", desc: "Commercial-grade bedding for hotels, hospitals and airlines.", href: "/hometextile/bedlinen/institutionalbedding/", img: "/images/hero/hero-institutional-bedding.webp", alt: "Pakistan institutional bedding manufacturer" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function CurtainsContent() {
  const [activeConstruction, setActiveConstruction] = useState("plain-weave");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-curtains.webp"
            fill
            alt="Pakistan curtain manufacturer — blackout and jacquard curtains for wholesale buyers in USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/hometextile/bedlinen/" className="hover:text-gold transition-colors">Bed Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Curtains</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Home Textile Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Curtain
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
              MZ Global Trading sources premium curtains from Pakistan&rsquo;s certified weaving mills. Plain weave, voile, jacquard and blackout constructions. Rod pocket, eyelet, pinch pleat and tab-top headings. Unlined, lined and blackout-lined options. OEKO-TEX certified. FOB / CIF export.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">→</span>
              </Link>
              <button
                onClick={() => scrollToId("bento-grid")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Curtain Guide
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

      {/* ═══════ STATS ANCHOR ═══════ */}
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
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Curtain Manufacturing — Pakistan Home Textiles</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Pakistan Curtains: From Construction to Complete Window Solution
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Curtain buyers need precision in fabric weight, weave structure, heading tape specification and panel drop. Pakistan&rsquo;s certified weaving and finishing mills produce to international retail and contract specification across all standard dimensions and heading types.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "5", label: "Heading Styles" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
            <Link prefetch={false} href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit">
              Request a Quote <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════ BENTO GRID ═══════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏗️</span>
                <div>
                  <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase">Construction</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3 border border-slate-100">
                    <p className="text-xs font-semibold text-navy-900">{c.name}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{c.gsm}</p>
                    <p className="text-[10px] text-slate-500 mt-1 leading-snug">{c.light}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🔧</span>
                <div>
                  <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Heading</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Heading Types</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {HEADING_TYPES.map((h) => (
                  <div key={h.code} className="bg-white rounded-xl px-4 py-3 border border-blue-100 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{h.code}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{h.name}</p>
                      <p className="text-[10px] text-blue-500 mt-0.5">{h.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-headings" label="Explore Heading Types" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">📐</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Drop</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Drop &amp; Width</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DIMENSIONS.slice(0, 5).map((d) => (
                  <div key={d.size} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" aria-hidden="true" />
                    <p className="text-xs font-semibold text-navy-900">{d.size}</p>
                  </div>
                ))}
                <p className="text-xs text-sky-500 pl-3.5">+ Custom</p>
              </div>
              <ExploreBtn sectionId="section-dimensions" label="View Dimensions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-violet-50 border border-violet-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🖼️</span>
              <p className="text-violet-600 text-xs font-semibold tracking-[0.2em] uppercase">Design</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Pattern Options</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DESIGN_OPTIONS.slice(0, 5).map((d) => (
                  <div key={d.code} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-violet-100 text-violet-600 text-[9px] font-bold flex items-center justify-center shrink-0">{d.code}</span>
                    <p className="text-xs font-semibold text-navy-900">{d.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-design" label="Explore Design" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-3 flex-1">
                {COLOUR_RANGES.slice(0, 4).map((c) => (
                  <div key={c.name} className="bg-white rounded-xl p-2.5 border border-rose-50">
                    <p className="text-[10px] font-semibold text-navy-900 mb-1.5">{c.name}</p>
                    <div className="flex gap-1">
                      {c.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${s}`} aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colours" label="Explore Colours" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM Development</h3>
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
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Market Applications</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {MARKET_SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-teal-100">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-teal-600">{s.abbr}</span>
                      <p className="text-sm font-semibold text-navy-900 flex-1">{s.name}</p>
                      <span className="text-xs font-bold text-gold">{s.share}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.share}%` }} aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Markets" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
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

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[260px]">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-orange-100">
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <p className="text-xs font-semibold text-navy-900">{e.full}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[220px]">
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

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[220px]">
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.title}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-500 mt-1 pl-8">+ 2 more steps</p>
              </div>
              <ExploreBtn sectionId="section-process" label="View Our Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ RESOURCES ROW ═══════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link prefetch={false} href="/knowledge/curtain-fabric-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Curtain Fabric Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Blackout, sheer, linen blend and velvet fabrics explained — heading types, lining options and certification for retail and contract buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link prefetch={false} href="/guides/sourcing-curtains-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Sourcing Curtains from Pakistan</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fabric, lining and custom heading types — 6-step sourcing guide for retail and hotel contract curtain programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Guide →</span>
            </Link>
            <Link prefetch={false} href="/downloads/curtain-measurement-order-template/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Curtain Measurement &amp; Order Template</p>
              <p className="text-xs text-gray-500 leading-relaxed">Complete spec form — fabric, blackout, heading type, eyelet spec, drop and width table, fire retardancy and certification fields.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Download →</span>
            </Link>
            <Link prefetch={false} href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Curtains?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, heading and drop confirmed — RFQ takes 3 minutes. Factory match within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 1 — CONSTRUCTIONS — EDITORIAL UI ═══════ */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-12">
            <div className="w-px h-16 bg-gold/40 mt-1 hidden sm:block" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-4">No. 01 / Fabric</p>
              <h2 className="text-5xl sm:text-6xl font-bold text-navy-900 leading-[1] mb-8">
                Six<br />Constructions
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-8" aria-hidden="true" />
              <blockquote className="border-l-4 border-gold pl-6 text-xl font-medium text-navy-900 italic leading-relaxed max-w-lg">
                &ldquo;The curtain is the largest soft furnishing in any room — the construction, heading and drop specification collectively defines whether the curtain hangs like art or fabric.&rdquo;
              </blockquote>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeConstruction === c.id}
                onClick={() => setActiveConstruction(c.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeConstruction === c.id
                    ? "bg-navy-900 text-white border-navy-900"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-navy-900/40"
                }`}
              >
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
              <div className="lg:col-span-2 border border-gray-100 rounded-2xl p-8 shadow-xs">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-navy-900">{ac.name}</h3>
                  <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">{ac.gsm}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Light Performance</p>
                    <p className="text-sm font-semibold text-navy-900">{ac.light}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">GSM Range</p>
                    <p className="text-sm font-bold text-gold">{ac.gsm}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{ac.character}</p>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-amber-700 mb-1">Specification Note</p>
                  <p className="text-sm text-amber-800">{ac.note}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="border border-gray-100 rounded-2xl p-6 shadow-xs">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Best For</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.best.map((b) => (
                      <span key={b} className="text-xs text-navy-900 bg-gray-100 px-3 py-1 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="border border-gray-100 rounded-2xl p-6 shadow-xs">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Markets</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => (
                      <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ SECTION 2 — HEADING TYPES — TYPOGRAPHY-DRIVEN UI ═══════ */}
      <section id="section-headings" className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Heading</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Curtain Heading Styles</h2>
          <div className="flex flex-col divide-y divide-white/10">
            {HEADING_TYPES.map((h, i) => (
              <motion.div
                key={h.code}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="py-8 flex flex-col sm:flex-row sm:items-start gap-6"
              >
                <div className="shrink-0">
                  <p className="text-6xl sm:text-8xl font-black text-white/8 leading-none">{String(i + 1).padStart(2, "0")}</p>
                  <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mt-1">{h.code}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight tracking-tight">{h.name.toUpperCase()}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3 max-w-lg">{h.desc}</p>
                  <span className="inline-block text-xs font-semibold text-gold/80 bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{h.market}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════ SECTION 3 — DIMENSIONS — ISOMETRIC UI ═══════ */}
      <section id="section-dimensions" className="bg-slate-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Drop &amp; Width</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Curtain Drop &amp; Width Standards</h2>
          <p className="text-white/50 mb-10 max-w-2xl leading-relaxed">
            Standard curtain dimensions available off-plan. Custom width and drop specified per room type — standard for hotel contract supply.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {DIMENSIONS.map((d, i) => (
              <motion.div
                key={d.size}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition-colors group"
              >
                <div className="flex items-end gap-3 mb-4">
                  <div
                    className="bg-white/20 rounded-xs group-hover:bg-gold/30 transition-colors"
                    style={{
                      width: d.size === "Custom" ? 40 : Math.round(parseInt(d.size.split("×")[0]) / 3.5),
                      height: d.size === "Custom" ? 40 : Math.round(parseInt(d.size.split("×")[1]) / 7),
                      minWidth: 24,
                      minHeight: 24,
                    }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">{d.size}</p>
                    <p className="text-gold text-xs font-semibold">{d.name}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{d.market}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4 items-start">
            <span className="text-gold text-lg shrink-0" aria-hidden="true">📏</span>
            <div>
              <p className="text-white text-sm font-semibold mb-1">Hotel Contract Specification</p>
              <p className="text-gray-500 text-sm leading-relaxed">Hotel room curtains are always specified to exact floor-to-ceiling drop per room type. Include architectural drawings or room specifications in your RFQ for contract supply.</p>
            </div>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════ SECTION 4 — DESIGN — COLLAGE UI ═══════ */}
      <section id="section-design" className="bg-[#1C1C1E] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Design</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Pattern &amp; Print Options for Curtains</h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {DESIGN_OPTIONS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="break-inside-avoid bg-white/8 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 hover:border-gold/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">{d.code}</span>
                  <h3 className="text-white font-bold text-base leading-tight">{d.name}</h3>
                </div>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">{d.method}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{d.best}</p>
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                  <p className="text-gray-500 text-xs leading-relaxed">{d.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ═══════ SECTION 5 — COLOURS — MONOCHROME UI ═══════ */}
      <section id="section-colours" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Colour Programs for Curtains</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Curtain colour specification is more constrained than bedding — blackout-backed panels have a reduced reactive dye colour range versus unlined constructions. Full PMS available on unlined and lined plain weave.
          </p>
          <div className="flex flex-col divide-y divide-gray-100">
            {COLOUR_RANGES.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="py-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex gap-2 shrink-0">
                  {c.swatches.map((s, idx) => (
                    <div key={idx} className={`w-10 h-10 rounded-full border-2 border-gray-100 ${s}`} aria-hidden="true" />
                  ))}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-navy-900">{c.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{c.desc}</p>
                </div>
                <p className="text-xs text-gray-500 shrink-0 sm:text-right">{i === 4 ? "Lab dip approval required" : "Available in stock colours"}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl px-6 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold text-navy-900">Blackout-backed curtains:</span> Coating applied to the reverse limits available reactive dye colours versus unlined panels. Confirm colour range availability for your specific construction in your RFQ.
            </p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ SECTION 6 — OEM — CORPORATE UI ═══════ */}
      <section id="section-oem" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM &amp; Custom</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Custom Curtain Development</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every specification element — from fabric construction through to FR treatment, lining and retail packaging — is managed to your programme requirements. Retail, contract and e-commerce channels all accommodated.
              </p>
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-800 transition-colors">
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
                  className="border border-gray-100 rounded-2xl p-6 hover:border-gold hover:shadow-xs transition-all bg-white"
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

      {/* ═══════ SECTION 7 — MARKETS — DATA VISUALIZATION UI ═══════ */}
      <section id="section-markets" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Markets</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Curtain Market Applications</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Curtains serve a wide range of commercial channels — from fast fashion home retail to long-cycle hotel contract. Specification requirements differ significantly by channel.
          </p>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              {MARKET_SECTORS.map((s, i) => (
                <motion.div
                  key={s.abbr}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="border border-gray-100 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-gray-50 text-xs font-bold text-gray-600 flex items-center justify-center shrink-0">{s.abbr}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-bold text-navy-900">{s.name}</h3>
                        <span className="text-xs font-bold text-gold">{s.share}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.share}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className={`h-full rounded-full ${s.color}`}
                          aria-label={`${s.share}% market share`}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 pl-13">{s.detail}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Demand by Channel</h3>
              <div className="space-y-4">
                {MARKET_SECTORS.map((s) => (
                  <div key={s.abbr} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${s.color} shrink-0`} aria-hidden="true" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-navy-900">{s.name}</span>
                        <span className="text-xs text-gray-500">{s.share}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.share}%` }} aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-6">Indicative demand distribution — actual split varies by season and market.</p>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ SECTION 8 — CERTIFICATIONS — INFOGRAPHIC UI ═══════ */}
      <section id="section-certs" className="bg-[#F0F4F8] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Certifications for Curtain Export</h2>
          <p className="text-gray-500 mb-3 max-w-2xl leading-relaxed">
            Our factory network holds 10 international certifications covering chemical safety, social compliance and organic fibre sourcing — the standards required by EU, UK and USA retail and contract buyers.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-10">
            <p className="text-blue-800 text-sm leading-relaxed">
              <span className="font-semibold">FR-specific compliance:</span> For flame retardant curtains, additionally specify <span className="font-semibold">BS 5867</span> (UK), <span className="font-semibold">EN 13773</span> (EU) or <span className="font-semibold">NFPA 701</span> (USA) in your RFQ.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-gold hover:shadow-xs transition-all"
              >
                <div className="w-full h-12 flex items-center justify-center">
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={80} height={48} className="object-contain max-h-12" />
                </div>
                <p className="text-navy-900 text-xs font-bold text-center">{c.name}</p>
                <p className="text-gray-500 text-[10px] text-center leading-snug">{c.full}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ SECTION 9 — EXPORT — SWISS DESIGN UI ═══════ */}
      <section id="section-export" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t-4 border-navy-900 pt-8 mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Export &amp; Packaging for Curtains</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="border-t border-gray-200 pt-8 mb-8">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">Incoterms</p>
                <div className="flex flex-col gap-0 divide-y divide-gray-100">
                  {EXPORT_TERMS.map((e) => (
                    <div key={e.term} className="py-5 flex items-start gap-6">
                      <div className="shrink-0 w-16">
                        <p className="text-2xl font-bold text-navy-900">{e.term}</p>
                        <p className="text-xs text-gray-500">{e.port}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{e.full}</p>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{e.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="border-t border-gray-200 pt-8 mb-8">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">Packaging Options</p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Individual polybag per panel", note: "Standard retail and wholesale" },
                    { label: "Retail box (pair-pack)", note: "Two panels per box — retail presentation" },
                    { label: "Tied roll (per panel)", note: "Compact, no crease — contract supply" },
                    { label: "Bulk per carton (no individual)", note: "Wholesale distribution — lowest packaging cost" },
                  ].map((p) => (
                    <div key={p.label} className="flex items-start gap-4 py-3 border-b border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{p.label}</p>
                        <p className="text-xs text-gray-500">{p.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Lead Time Note</p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
                  <p className="text-amber-800 text-sm leading-relaxed">Lead times are indicative only and subject to factory scheduling, material availability and order complexity. FR treatment or embroidery on curtain panels typically adds 7–10 working days.</p>
                </div>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ SECTION 10 — SUSTAINABILITY — SCANDINAVIAN UI ═══════ */}
      <section id="section-sustainability" className="bg-[#F7FAF8] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lime-700 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Sustainable Curtain Sourcing</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            EU textile sustainability regulations are advancing rapidly. Our factory network is aligned with the standards international buyers increasingly require as part of their procurement policy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-3 hover:border-lime-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                  <span className="text-xs font-semibold text-lime-700 bg-lime-100 px-2.5 py-1 rounded-full">{s.tag}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-xl" aria-hidden="true">♻️</span>
            <div>
              <h3 className="text-sm font-bold text-navy-900 mb-1">Recycled Polyester for Blackout Constructions</h3>
              <p className="text-sm text-gray-500 leading-relaxed">GRS-certified recycled polyester is available for blackout triple weave and velvet constructions — enabling circular material use for heavy curtain specifications without compromising performance.</p>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ SECTION 11 — PROCESS — GRID UI ═══════ */}
      <section id="section-process" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">How We Source Your Curtain Programme</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Curtain programmes require precise specification at every stage — from heading tape and lining type through to FR compliance and panel packaging. Our process manages every detail.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-3 hover:border-gold hover:shadow-xs transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-slate-100 text-navy-900 text-sm font-bold flex items-center justify-center shrink-0">{p.num}</span>
                  <h3 className="text-base font-bold text-navy-900">{p.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 flex items-start gap-3">
            <span className="text-amber-500 text-lg shrink-0" aria-hidden="true">⚠</span>
            <p className="text-amber-800 text-sm leading-relaxed">Lead times are indicative only and subject to factory scheduling, material availability and order complexity. FR-treated panels, embroidered panels and lined programmes require additional lead time.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2 text-center">Common Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10 text-center">Curtain FAQs</h2>
          <div className="flex flex-col divide-y divide-gray-100">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                  aria-expanded={faqOpen === i}
                >
                  <span className="text-base font-semibold text-navy-900 leading-snug">{faq.q}</span>
                  <span className={`shrink-0 w-6 h-6 rounded-full border-2 border-gold flex items-center justify-center text-gold text-sm font-bold transition-transform ${faqOpen === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
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
                      <p className="text-gray-500 text-sm leading-relaxed pt-4">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PAGE BOXES — SAME MENU LEVEL ═══════ */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Bed Linen Collection</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore More Bed Linen Products</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAGE_SIBLINGS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow"
              >
                <Link prefetch={false} href={card.href} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={card.img} alt={card.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-1.5">{card.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                      Explore {card.title} →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Get Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Source Curtains?</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
              Construction, heading type and drop confirmed — our RFQ takes 3 minutes. Factory match and quotation returned within 3–5 working days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">→</span>
              </Link>
              <Link prefetch={false} href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:border-gold hover:text-gold transition-colors text-base">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

