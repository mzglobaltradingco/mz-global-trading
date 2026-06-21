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
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          aria-hidden="true"
        >
          ↑
        </motion.span>
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
    id: "waffle",
    name: "Waffle / Honeycomb",
    badge: "Most Popular",
    gsm: "150–220 GSM",
    hand: "Raised grid texture — rapid moisture wicking, quick-dry surface",
    best: ["Retail Grocery", "Kitchenware Chains", "Gift Sets"],
    markets: ["USA", "UK", "EU", "Japan", "Australia"],
    deco: ["Yarn-Dyed Stripe", "Border Print", "Embroidery"],
    detail:
      "Waffle weave is the dominant construction for retail kitchen and tea towel programmes globally. The raised grid cell structure creates air pockets that rapidly wick and release moisture — delivering fast drying performance that resonates with retail consumers. The distinctive grid texture also provides strong visual appeal in retail packaging and on-shelf. Available in full PMS colour range via reactive dyeing.",
    spec: "100% combed cotton or cotton/linen blend. GSM 150–220. Reactive dyed. Anti-shrink / compacted finish available. OEKO-TEX Standard 100, GOTS options.",
  },
  {
    id: "huck",
    name: "Huck Weave",
    badge: "Commercial Grade",
    gsm: "180–250 GSM",
    hand: "Pebbled surface with multi-float thread — superior scrub and wipe performance",
    best: ["Foodservice", "Institutional", "Hotel Kitchens"],
    markets: ["USA", "Canada", "UK", "Middle East"],
    deco: ["Plain White", "Colour Border", "Embroidered Logo"],
    detail:
      "Huck weave (also called huckaback) uses a multi-float thread structure to create a slightly pebbled, open-weave surface with exceptional lint-free wiping and scrubbing performance. This is the professional foodservice and institutional standard — widely specified by restaurant groups, hotel kitchens and contract caterers across the USA and UK. Superior durability under repeated industrial laundering at 60–90°C.",
    spec: "100% cotton ring-spun. GSM 180–250. Lint-free surface. Industrial laundry compatible to 90°C. BSCI, Sedex, ISO 9001.",
  },
  {
    id: "plain",
    name: "Plain Weave / Poplin",
    badge: "",
    gsm: "160–200 GSM",
    hand: "Smooth flat surface — excellent print base, crisp hand",
    best: ["Print Programmes", "Corporate Gifting", "Premium Retail"],
    markets: ["USA", "UK", "EU", "Australia"],
    deco: ["Full-Face Reactive Print", "Screen Print", "Embroidery"],
    detail:
      "Plain weave kitchen towels offer a clean, smooth surface that is the optimal base for full-face reactive printing and complex artwork programmes. Ideal for seasonal retail collections, branded promotional programmes and corporate gifting. The crisp hand and precise weave accept PMS-matched prints with excellent fidelity and wash durability when reactive inks are specified.",
    spec: "100% cotton or cotton/linen. GSM 160–200. Reactive print, screen print, digital print compatible. OEKO-TEX certified.",
  },
  {
    id: "terry",
    name: "Terry Loop",
    badge: "",
    gsm: "200–260 GSM",
    hand: "Soft looped pile — absorbent, comfortable hand",
    best: ["Multifunctional Programmes", "Bath/Kitchen Dual Use"],
    markets: ["USA", "UK", "Middle East", "South America"],
    deco: ["Yarn-Dyed Border", "Embroidered Logo", "Jacquard Dobby"],
    detail:
      "Terry loop kitchen towels bridge the gap between kitchen and bath linen — the looped pile delivers soft hand-feel and strong absorbency for dual-function programmes. Popular in Middle Eastern markets and South American retail, where multipurpose textile products are widely preferred. Embroidered logos and jacquard dobby border designs are common in premium retail configurations.",
    spec: "100% cotton or bamboo-cotton. GSM 200–260. Yarn-dyed and embroidery options. GOTS organic cotton available.",
  },
];

const GSM_TIERS = [
  { gsm: "150–170", name: "Lightweight Retail", market: "Promotional, multipacks, grocery own-brand", pct: 35, featured: false, color: "bg-amber-300" },
  { gsm: "170–200", name: "Standard Retail", market: "Grocery retail, kitchenware chains, gift sets — USA, UK, EU", pct: 78, featured: true, color: "bg-gold" },
  { gsm: "200–220", name: "Premium Retail", market: "Upmarket retail, department store, premium gift", pct: 55, featured: false, color: "bg-amber-600" },
  { gsm: "220–250", name: "Commercial Grade", market: "Foodservice, institutional, hotel kitchen supply", pct: 40, featured: false, color: "bg-amber-800" },
];

const SIZES = [
  { code: "SM", name: "Small", dims: "40 × 60 cm", note: "Retail multipacks, promotional" },
  { code: "STD", name: "Standard", dims: "45 × 65 cm", note: "Dominant retail spec — USA, UK, EU" },
  { code: "LG", name: "Large", dims: "50 × 70 cm", note: "Premium retail, hospitality" },
  { code: "CUS", name: "Custom", dims: "To your spec", note: "Institutional programmes" },
];

const DECO_METHODS = [
  { code: "YD", method: "Yarn-Dyed Stripe / Check", best: "Woven-in pattern — superior wash durability, premium visual", compat: ["Waffle", "Plain Weave", "Terry"] },
  { code: "RP", method: "Reactive Print", best: "Full-face photographic or multi-colour artwork", compat: ["Plain Weave"] },
  { code: "SP", method: "Screen Print", best: "Bold limited-colour artwork, brand graphics", compat: ["Plain Weave", "Huck"] },
  { code: "EM", method: "Embroidery", best: "Logo placement — corner, border or hem", compat: ["All Constructions"] },
];

const COLOUR_OPTIONS = [
  { name: "Yarn-Dyed Stripe", note: "Pattern woven into fabric — 2, 3 or 4 colour stripe. Wash-durable." },
  { name: "Yarn-Dyed Check", note: "Gingham or plaid check — available in any 2-colour combination." },
  { name: "Solid Reactive", note: "Full PMS colour range — lab dip approval before bulk." },
  { name: "Full-Face Print", note: "Photographic or complex artwork — plain weave base only." },
];

const OEM_FEATURES = [
  { num: "01", title: "Construction Selection", desc: "Waffle, huck, plain weave or terry specified to your programme requirements." },
  { num: "02", title: "GSM Specification", desc: "150–250 GSM range — exact weight confirmed by fabric swatch and weight test." },
  { num: "03", title: "Yarn-Dyed Colourway", desc: "2–4 colour stripe or check programmes with full PMS colour matching." },
  { num: "04", title: "Custom Sizing", desc: "Non-standard dimensions available for institutional or export-specific programmes." },
  { num: "05", title: "Brand Labels", desc: "Hem labels, hang tags, care labels and woven labels to your specification." },
  { num: "06", title: "Retail Packaging", desc: "Individual polybag, 2-pack banded, 4-pack header card or bulk carton." },
];

const SECTORS = [
  { abbr: "GR", name: "Grocery Retail", detail: "Own-brand kitchen towel programmes for major grocery chains", market: "USA · UK · EU" },
  { abbr: "KW", name: "Kitchenware Chains", detail: "Retail kitchenware and homeware brand sourcing", market: "USA · UK · EU · Australia" },
  { abbr: "HT", name: "Hotel & Hospitality", detail: "Hotel kitchen and F&B linen supply programmes", market: "Middle East · USA · UK" },
  { abbr: "FS", name: "Foodservice", detail: "Restaurant groups and commercial kitchen supply", market: "USA · Canada · Australia" },
  { abbr: "CG", name: "Corporate Gifting", detail: "Branded corporate gift and promotional programmes", market: "Worldwide" },
  { abbr: "IN", name: "Institutional", detail: "Hospital catering, school and government supply", market: "USA · UK · Middle East" },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", img: "/images/certs/cert-gots.webp", tier: "Premium" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", img: "/images/certs/cert-oeko-tex.webp", tier: "Standard" },
  { name: "BSCI", full: "Business Social Compliance Initiative", img: "/images/certs/cert-bsci.webp", tier: "Standard" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", img: "/images/certs/cert-sedex.webp", tier: "Standard" },
  { name: "ISO 9001", full: "Quality Management System", img: "/images/certs/cert-iso-9001.webp", tier: "Standard" },
  { name: "GRS", full: "Global Recycled Standard", img: "/images/certs/cert-grs.webp", tier: "Optional" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", img: "/images/certs/cert-wrap.webp", tier: "Standard" },
  { name: "BCI", full: "Better Cotton Initiative", img: "/images/certs/cert-bci.webp", tier: "Optional" },
  { name: "SA8000", full: "Social Accountability International", img: "/images/certs/cert-sa8000.webp", tier: "Premium" },
  { name: "Bluesign", full: "Bluesign Standard", img: "/images/certs/cert-bluesign.webp", tier: "Optional" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange freight; buyer covers marine insurance." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer collects from factory — lowest price, maximum buyer control." },
];

const SUSTAINABILITY = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton across all four constructions.", tag: "GOTS" },
  { icon: "💧", title: "Low-Impact Dyes", desc: "Reactive dyeing with OEKO-TEX certified chemicals only — no restricted substances.", tag: "OEKO-TEX" },
  { icon: "♻️", title: "Recycled Cotton", desc: "GRS-certified recycled cotton blends for programmes with sustainability requirements.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited factories — labour standards verified.", tag: "BSCI / Sedex" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags and FSC-certified paper packaging available.", tag: "Optional" },
  { icon: "🌾", title: "Better Cotton", desc: "BCI membership — improved farming practices and water use reduction.", tag: "BCI" },
];

const PROCESS = [
  { num: "01", short: "RFQ Submission", desc: "Share construction, GSM, size, decoration, quantity, destination and delivery date." },
  { num: "02", short: "Factory Match", desc: "We shortlist 2–3 certified Pakistan factories matching your specification and capacity." },
  { num: "03", short: "Quotation", desc: "Detailed pricing returned within 3–5 working days." },
  { num: "04", short: "Sample Production", desc: "Pre-production samples produced within 15–20 days of specification lock." },
  { num: "05", short: "Bulk Production", desc: "30–50 days from confirmed purchase order and approved sample." },
  { num: "06", short: "QC & Shipment", desc: "Pre-shipment inspection, export packing and vessel loading from Karachi." },
];

const FAQS = [
  {
    q: "What is the difference between waffle weave and huck weave kitchen towels?",
    a: "Waffle weave has a raised grid cell pattern for rapid moisture wicking and retail visual appeal. Huck weave uses a multi-float thread structure for superior lint-free wiping and scrubbing performance — the foodservice and institutional standard. Both are available at 150–250 GSM.",
  },
  {
    q: "What GSM should I specify for a retail kitchen towel programme?",
    a: "For retail programmes targeting USA, UK and EU buyers, 170–200 GSM is the standard specification range. 180 GSM is the most commonly ordered. For commercial or institutional use, 220–250 GSM is recommended for durability under repeated laundering.",
  },
  {
    q: "Can I get OEKO-TEX certified kitchen towels from Pakistan?",
    a: "Yes. OEKO-TEX Standard 100 is readily available across all constructions. GOTS certification is available for organic cotton programmes. BSCI and Sedex audit compliance is standard across our factory network.",
  },
  {
    q: "What decoration options are available for branded kitchen towel programmes?",
    a: "Yarn-dyed stripe and check (woven-in, superior wash durability), full-face reactive print, screen print and embroidery are all available. All methods support lab dip or strike-off approval before bulk production.",
  },
  {
    q: "What standard sizes are available for kitchen towels?",
    a: "Small 40×60 cm, Standard 45×65 cm (dominant retail specification) and Large 50×70 cm. Custom dimensions are available for institutional programmes. ±2 cm manufacturing tolerance applies.",
  },
  {
    q: "How should I order kitchen towels — by piece, pack or dozen?",
    a: "Retail buyers typically order as 2-packs or 4-packs with header card. Foodservice and institutional buyers order in dozens (12 pcs) in bulk cartons. Promotional buyers often require individual polybag packing. We support all packing formats.",
  },
  {
    q: "What is the typical lead time from order to delivery?",
    a: "Indicative lead times: RFQ response 3–5 working days; pre-production samples 15–20 days; bulk production 30–50 days; sea freight from Karachi 18–25 days to USA/UK/EU ports. Allow 90 days minimum from RFQ to in-warehouse receipt for first programmes.",
  },
  {
    q: "Are sustainable or organic cotton kitchen towels available?",
    a: "Yes. GOTS-certified organic cotton kitchen towels are available across all constructions. GRS-certified recycled cotton blends are also available. BCI cotton sourcing applies to conventional cotton across our factory network.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function KitchenTowelsContent() {
  const [activeC, setActiveC] = useState("waffle");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeC) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-kitchen-towels.webp" fill alt="Pakistan kitchen towels manufacturer — waffle, huck weave and terry kitchen towels for retail and hospitality buyers in USA, UK and Europe"
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
              <span className="text-gold">Kitchen Towels</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Kitchen Linen Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Kitchen Towel
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
              MZ Global Trading connects international buyers with
              Pakistan&rsquo;s certified kitchen towel factories. Waffle,
              huck weave, plain weave and terry constructions. 150&ndash;250
              GSM. Yarn-dyed stripe and check. OEKO-TEX, GOTS, BSCI.
              FOB&nbsp;/ CIF export.
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

      {/* STATS ANCHOR */}
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
                Kitchen Towel Supply — Pakistan Mills
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Four Constructions. One Verified Supply Network.
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s kitchen towel output covers every tier from
                entry-level promotional to premium retail. The same certified
                mill infrastructure supplies major USA, EU and UK grocery and
                kitchenware buyers.
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
            <Link
              href="/rfq/"
              className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit"
            >
              Request a Quote <span aria-hidden="true">&#8594;</span>
            </Link>
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
            {/* Bento 1 — Constructions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧶</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-amber-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    {c.badge && <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            {/* Bento 2 — Sizes */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Dimensions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Standard Sizes</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {SIZES.map((s) => (
                  <div key={s.code} className="bg-white rounded-xl px-4 py-3 border border-sky-100 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{s.code}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{s.name}</p>
                      <p className="text-xs text-gold font-semibold mt-0.5">{s.dims}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="View Size Details" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Bento 3 — GSM */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-yellow-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Guide</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-lg p-2.5 border border-yellow-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-navy-900">{t.gsm}</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <div className="w-full h-1.5 bg-yellow-100 rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] text-gray-400 leading-snug">{t.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View GSM Guide" />
            </motion.div>

            {/* Bento 4 — Decoration */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Decoration Methods</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2 border border-purple-50">
                    <span className="w-6 h-6 rounded bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{d.code}</span>
                    <p className="text-xs font-semibold text-navy-900 leading-tight">{d.method}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decoration" />
            </motion.div>

            {/* Bento 5 — Colour */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🌈</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-2 flex-1">
                {COLOUR_OPTIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-lg p-2.5 border border-rose-50">
                    <p className="text-xs font-semibold text-navy-900">{c.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{c.note}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colours" label="Explore Colours" />
            </motion.div>

            {/* Bento 6 — OEM */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
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
            {/* Bento 7 — Sectors */}
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
              <ExploreBtn sectionId="section-markets" label="View All Markets" />
            </motion.div>

            {/* Bento 8 — Certifications */}
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

            {/* Bento 9 — Export */}
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
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bento 10 — Sustainability */}
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

            {/* Bento 11 — Process */}
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

      {/* RESOURCES ROW */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Kitchen Linen Sourcing Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction selection, GSM specification and certification requirements for kitchen towel programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Spec Sheets &amp; Size Charts</p>
              <p className="text-xs text-gray-500 leading-relaxed">Kitchen towel construction spec sheets and standard size chart documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Kitchen Towels?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction and GSM confirmed — RFQ takes 3 minutes. Factory match and quotation within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CONSTRUCTIONS — Minimalist UI */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-3">01 / Fabric Constructions</p>
            <h2 className="text-4xl font-bold text-navy-900 mb-4">Four Constructions. One Expert Supply Network.</h2>
            <div className="w-12 h-0.5 bg-gold mb-4" aria-hidden="true" />
            <p className="text-gray-500 leading-relaxed">
              Construction determines hand-feel, absorbency, decoration compatibility and end-use market. Select the specification that aligns with your programme positioning.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeC === c.id}
                onClick={() => setActiveC(c.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeC === c.id ? "bg-navy-900 text-white border-navy-900" : "bg-white text-gray-500 border-gray-200 hover:border-navy-900/30"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeC}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 border border-gray-100 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-navy-900">{ac.name}</h3>
                  {ac.badge && <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">{ac.badge}</span>}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">GSM Range</p>
                    <p className="text-lg font-bold text-navy-900">{ac.gsm}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Hand Feel</p>
                    <p className="text-sm text-navy-900">{ac.hand}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{ac.detail}</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Technical Specification</p>
                  <p className="text-sm text-gray-600">{ac.spec}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="border border-gray-100 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Best For</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.best.map((b) => <span key={b} className="text-xs text-navy-900 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">{b}</span>)}
                  </div>
                </div>
                <div className="border border-gray-100 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Key Markets</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>)}
                  </div>
                </div>
                <div className="border border-gray-100 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Decoration</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.deco.map((d) => (
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

      {/* SECTION 2 — SIZES — Geometric UI */}
      <section id="section-sizes" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Dimensions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Standard Sizes &amp; Custom Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {SIZES.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 border-2 border-gray-100 hover:border-gold transition-all flex flex-col gap-3"
              >
                <div className="w-14 h-14 rounded-xl bg-navy-900 flex items-center justify-center">
                  <span className="text-gold text-sm font-bold">{s.code}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">{s.name}</h3>
                <p className="text-2xl font-bold text-gold">{s.dims}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{s.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <span className="text-2xl shrink-0" aria-hidden="true">📏</span>
            <div>
              <p className="text-sm font-semibold text-navy-900 mb-1">Custom Dimensions Available</p>
              <p className="text-sm text-gray-600 leading-relaxed">Non-standard sizes are available for institutional, hospitality and export-specific programmes. Include your required dimensions in the RFQ. A ±2 cm manufacturing tolerance applies to all finished sizes. Both centimetre and inch specifications are accepted.</p>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 3 — GSM — Industrial UI */}
      <section id="section-gsm" className="bg-[#1a1a1a] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Classification</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">GSM Weight Guide</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              GSM determines absorbency, durability, retail price positioning and shipping weight. Matching the right GSM to your end-channel is critical for commercial success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {GSM_TIERS.map((t, i) => (
              <motion.div
                key={t.gsm}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`rounded-2xl p-7 border ${t.featured ? "border-gold bg-white/10" : "border-white/10 bg-white/5"}`}
              >
                {t.featured && <span className="inline-block mb-3 text-[10px] font-bold text-navy-900 bg-gold px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>}
                <p className={`text-3xl font-bold mb-1 ${t.featured ? "text-gold" : "text-white"}`}>{t.gsm}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{t.name}</p>
                <div className="mb-4">
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{t.pct}% of orders</p>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{t.market}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Full GSM Range", val: "150–250 GSM" },
              { label: "Most Ordered", val: "180 GSM" },
              { label: "Commercial Min.", val: "220 GSM" },
            ].map((m) => (
              <div key={m.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-gold">{m.val}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 4 — DECORATION — Art Deco UI */}
      <section id="section-decoration" className="bg-[#FAF8F3] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
              <div className="h-px w-16 bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.4em] uppercase">Decoration</span>
              <div className="h-px w-16 bg-gold" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-4">Decoration Methods</h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Every decoration method delivers a different brand statement. Selection depends on construction, artwork complexity and wash-durability requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {DECO_METHODS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex gap-5"
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
          <div className="bg-navy-900 rounded-2xl p-8 text-white grid sm:grid-cols-3 gap-8">
            {[
              ["Hem / Border", "Yarn-dyed stripe or print border — most popular placement for retail kitchen towels"],
              ["Corner Logo", "Embroidered brand mark — hotel supply, corporate gifting and premium retail positioning"],
              ["Full Face Print", "All-over reactive or screen print — seasonal retail collections and promotional programmes"],
            ].map(([place, desc]) => (
              <div key={place}>
                <p className="text-gold text-sm font-bold mb-1">{place}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 5 — COLOURS — Bauhaus UI */}
      <section id="section-colours" className="bg-navy-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Colour Programme</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">Colour<br />as<br />Brand Identity</h2>
              <div className="w-10 h-1 bg-gold mb-8" aria-hidden="true" />
              <p className="text-gray-300 leading-relaxed mb-8">
                For kitchen towel programmes, colour is the primary visual differentiator on-shelf. Yarn-dyed stripe and check programmes are woven-in — delivering consistent, wash-durable colour that printed programmes cannot match across multiple wash cycles.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Lab dip approval is required before all bulk reactive-dyed orders. Yarn-dyed programmes are confirmed via strike-off sample on the correct yarn count and weave structure.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {COLOUR_OPTIONS.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="bg-white/10 border border-white/20 rounded-2xl p-6"
                >
                  <h3 className="text-base font-bold text-white mb-2">{c.name}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{c.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-6 sm:grid-cols-12 gap-2">
            {["bg-red-400","bg-blue-500","bg-green-500","bg-amber-400","bg-purple-500","bg-rose-400","bg-teal-500","bg-orange-400","bg-sky-400","bg-lime-500","bg-slate-400","bg-emerald-500"].map((c, i) => (
              <div key={i} className={`h-8 rounded-lg ${c} opacity-80`} aria-hidden="true" />
            ))}
          </div>
          <p className="text-white/30 text-xs mt-3 text-center">Illustrative swatch palette — full PMS range available</p>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 6 — OEM — Organic UI */}
      <section id="section-oem" className="bg-stone-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">OEM Programme</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Your Specification. Our Factory Network.</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every element of your kitchen towel programme — construction, GSM, colourway, decoration, packaging — is specified to your exact requirements and managed against your buyer brief throughout production.
              </p>
              <Link
                href="/rfq/"
                className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-800 transition-colors"
              >
                Start Your Programme <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OEM_FEATURES.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-gold hover:shadow-sm transition-all"
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

      {/* SECTION 7 — MARKETS — Material Design UI */}
      <section id="section-markets" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Industry Applications</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Who Buys Kitchen Towels</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            Kitchen towels are purchased across retail, foodservice, hospitality and institutional channels — each with distinct construction, certification and packaging requirements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-navy-900 flex items-center justify-center mb-4">
                  <span className="text-gold text-sm font-bold">{s.abbr}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{s.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.detail}</p>
                <p className="text-xs font-semibold text-gold">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* SECTION 8 — CERTIFICATIONS — Neo-Brutalist UI */}
      <section id="section-certs" className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-gold pl-6 mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Quality Certifications</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              Kitchen towel programmes are sourced through factories carrying the exact certifications required by major retail and institutional buyers across all key markets.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-gold/40 transition-all"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0 p-2">
                  <Image src={c.img} alt={c.full} width={56} height={36} className="object-contain w-full h-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-white">{c.name}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${c.tier === "Premium" ? "bg-gold/20 text-gold" : c.tier === "Optional" ? "bg-white/10 text-gray-400" : "bg-green-900/50 text-green-400"}`}>{c.tier}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-snug">{c.full}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 9 — EXPORT — Glassmorphism UI */}
      <section id="section-export" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-blue-950 to-[#0D1B2A]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Export &amp; Logistics</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">
            Kitchen towels ship from Karachi and Port Qasim on FCL and LCL basis. All standard incoterms available.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {EXPORT_TERMS.map((e, i) => (
              <motion.div
                key={e.term}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-gold text-sm font-bold">{e.term}</span>
                </div>
                <h3 className="text-base font-bold text-white">{e.full}</h3>
                <p className="text-xs text-white/50">{e.port}</p>
                <p className="text-sm text-white/70 leading-relaxed flex-1">{e.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 grid sm:grid-cols-3 gap-8">
            {[
              ["18–22 days", "USA / Canada sea freight from Karachi"],
              ["20–26 days", "UK / Northern Europe sea freight"],
              ["8–12 days", "Middle East / UAE sea freight"],
            ].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-gold mb-1">{val}</p>
                <p className="text-sm text-white/60 leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* SECTION 10 — SUSTAINABILITY — Typography-First UI */}
      <section id="section-sustainability" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-4">10 / Ethics &amp; Sustainability</p>
              <h2 className="text-5xl sm:text-6xl font-bold text-navy-900 leading-[1] mb-8">
                Sourced<br />Responsibly.
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-8" aria-hidden="true" />
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
                Sustainability compliance is increasingly a hard requirement in EU, UK and USA retail buying programmes — not an optional add-on. Our kitchen towel supply network is built to meet these demands without compromise.
              </p>
              <blockquote className="border-l-4 border-gold pl-6 text-xl font-medium text-navy-900 italic leading-relaxed">
                &ldquo;OEKO-TEX, GOTS and BSCI certification is standard across our kitchen linen factory network — not a premium tier reserved for select orders.&rdquo;
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
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
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

      {/* SECTION 11 — PROCESS — Layered Card UI */}
      <section id="section-process" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">From RFQ to Delivery</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            A structured, transparent process from specification through to in-warehouse delivery — with a dedicated sourcing contact at every stage.
          </p>
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gold/20 hidden sm:block" aria-hidden="true" />
            <div className="flex flex-col gap-4">
              {PROCESS.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sm:ml-14 hover:border-gold/30 transition-all"
                >
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold flex items-center justify-center hidden sm:flex shrink-0">
                    <span className="text-navy-900 text-xs font-bold">{p.num}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="sm:hidden w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-navy-900 text-xs font-bold">{p.num}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy-900 mb-1">{p.short}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3 items-start">
            <span className="text-amber-500 text-lg shrink-0" aria-hidden="true">⚠️</span>
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Indicative lead times only.</strong> All timelines depend on factory scheduling, material availability and order complexity. Include your required delivery date in the RFQ for a programme-specific timeline.
            </p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-28">
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start Your Kitchen Towel Programme
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Submit your construction, GSM, decoration and quantity requirements. Factory match with certified Pakistan mills returned within 3–5 working days.
            </p>
            <Link
              href="/rfq/"
              className="inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base"
            >
              Request a Quote <span aria-hidden="true">&#8594;</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
