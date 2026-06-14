"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CertificationsStrip from "@/components/CertificationsStrip";

// ─── Data: what a procurement buyer actually needs to know ─────────────────────

const CONSTRUCTIONS = [
  {
    id: "single-jersey",
    name: "Single Jersey",
    gsm: "140–220 GSM",
    hand: "Smooth, lightweight, drapes well",
    best: "Fashion retail, promotional, everyday wear",
    markets: ["USA", "UK", "EU"],
    share: "~55% of volume",
    detail:
      "The workhorse of the industry. Single-faced knit — smooth exterior, visible loop interior. High colour consistency, cuts cleanly, takes screen and DTG print well. Available in combed, carded or ring-spun cotton.",
    featured: true,
  },
  {
    id: "pique",
    name: "Piqué / Polo Knit",
    gsm: "180–260 GSM",
    hand: "Textured, structured, breathable",
    best: "Corporate programmes, polo shirts, premium retail",
    markets: ["USA", "UK", "EU"],
    share: "~20% of volume",
    detail:
      "Raised waffle-like texture created by a double-knit structure. Holds its shape better than single jersey. Standard for polo shirts. Accepts embroidery cleanly — preferred for corporate and branded programmes.",
    featured: false,
  },
  {
    id: "interlock",
    name: "Double Jersey / Interlock",
    gsm: "180–280 GSM",
    hand: "Stable, smooth both sides, no curl",
    best: "Premium retail, baby and kids, performance wear",
    markets: ["EU", "UK"],
    share: "~10% of volume",
    detail:
      "Two interlocked single jersey layers — result is a fabric that looks and feels the same on both sides. Heavier, more stable, does not curl at edges. Preferred for premium retail and baby garments.",
    featured: false,
  },
  {
    id: "waffle",
    name: "Waffle / Thermal Knit",
    gsm: "160–240 GSM",
    hand: "Textured grid, insulating, structured",
    best: "Henley shirts, thermal base layers, autumn/winter",
    markets: ["USA", "UK"],
    share: "~5% of volume",
    detail:
      "Square honeycomb texture traps air, providing light insulation. Seasonal product — strongest demand September through February. Often used for Henley and long-sleeve styles in autumn/winter ranges.",
    featured: false,
  },
  {
    id: "slub",
    name: "Slub Jersey",
    gsm: "140–180 GSM",
    hand: "Uneven texture, casual, artisanal feel",
    best: "Lifestyle brands, premium casual, organic positioning",
    markets: ["USA", "EU"],
    share: "~5% of volume",
    detail:
      "Irregularly thick-and-thin yarn deliberately introduced into the knit. Each garment has a subtly unique texture — a selling point for lifestyle and premium casual brands. Pairs well with GOTS certified cotton.",
    featured: false,
  },
  {
    id: "mesh",
    name: "Mesh / Eyelet",
    gsm: "100–160 GSM",
    hand: "Open, ventilated, athletic",
    best: "Sportswear, activewear, performance brands",
    markets: ["USA", "UK"],
    share: "~5% of volume",
    detail:
      "Open-knit structure maximises airflow. Primarily polyester or polyester-cotton blend for moisture management. Used in sports, activewear and performance ranges — growing demand in athleisure.",
    featured: false,
  },
];

const SPEC_DIMENSIONS = [
  {
    label: "01  Fabric Construction",
    key: "fabric",
    options: ["Single Jersey", "Piqué", "Interlock", "Waffle", "Slub", "Mesh"],
    note: "Determines hand feel, weight and print method",
  },
  {
    label: "02  GSM (Weight)",
    key: "gsm",
    options: ["140–160 g", "160–180 g", "180–200 g", "200–220 g", "220–260 g"],
    note: "Heavier GSM = better drape, perceived quality, longer life",
  },
  {
    label: "03  Fit Profile",
    key: "fit",
    options: ["Regular / Standard", "Slim Fit", "Oversized", "Athletic", "Women's Cut", "Unisex"],
    note: "Graded to your size chart or standard EU/USA/UK sizing",
  },
  {
    label: "04  Decoration",
    key: "print",
    options: ["Screen Print", "DTG / Digital", "Embroidery", "Heat Transfer", "Sublimation", "None"],
    note: "Method depends on design complexity and run quantity",
  },
  {
    label: "05  Finishing",
    key: "finish",
    options: ["Enzyme Wash", "Soft Hand", "Anti-Shrink", "Stone Wash", "Garment Dye", "None"],
    note: "Post-production treatments that alter hand feel and appearance",
  },
  {
    label: "06  Packaging",
    key: "pack",
    options: ["Individual Polybag", "Hanger + Polybag", "Retail Board Fold", "Flat Export Fold", "Vacuum Pack"],
    note: "Specify per-unit packing and master carton requirements",
  },
];

const GSM_GUIDE = [
  { gsm: 140, pct: 0, label: "Promotional", sub: "Event/Promo", mkt: "Volume buyers" },
  { gsm: 160, pct: 22, label: "Fashion Lite", sub: "Fast fashion", mkt: "EU, UK retail" },
  { gsm: 180, pct: 42, label: "Retail Standard", sub: "Most common", mkt: "USA, UK, EU" },
  { gsm: 200, pct: 60, label: "Premium Retail", sub: "Mid-market", mkt: "Branded retail" },
  { gsm: 220, pct: 75, label: "Heavyweight", sub: "Streetwear", mkt: "USA streetwear" },
  { gsm: 260, pct: 88, label: "Workwear Grade", sub: "Durable", mkt: "B2B workwear" },
  { gsm: 280, pct: 100, label: "Ultra-Heavy", sub: "Premium basics", mkt: "Luxury basics" },
];

const CERT_MATRIX = [
  {
    cert: "OEKO-TEX Standard 100",
    usa: true,
    uk: true,
    eu: true,
    sustain: false,
    note: "No harmful substances — most requested by retail buyers",
  },
  {
    cert: "GOTS (Organic Cotton)",
    usa: true,
    uk: true,
    eu: true,
    sustain: true,
    note: "Global Organic Textile Standard — certified organic supply chain",
  },
  {
    cert: "BCI (Better Cotton)",
    usa: true,
    uk: true,
    eu: true,
    sustain: true,
    note: "Conventional cotton with responsible farming standards",
  },
  {
    cert: "GRS (Recycled Content)",
    usa: true,
    uk: false,
    eu: true,
    sustain: true,
    note: "Global Recycled Standard — for recycled cotton or poly blend",
  },
  {
    cert: "BSCI (Factory Audit)",
    usa: true,
    uk: true,
    eu: true,
    sustain: false,
    note: "Business Social Compliance Initiative — social audit standard",
  },
  {
    cert: "WRAP (Factory Audit)",
    usa: true,
    uk: false,
    eu: false,
    sustain: false,
    note: "Worldwide Responsible Accredited Production — USA preferred",
  },
];

const OEM_STEPS = [
  {
    num: "01",
    phase: "Specification",
    time: "Day 1",
    buyer: "Submit spec sheet via RFQ: fabric, GSM, fit, decoration, packaging, destination, quantity",
    mz: "Confirm feasibility, suggest alternatives if spec is outside range, return technical sheet",
  },
  {
    num: "02",
    phase: "Sampling",
    time: "Weeks 1–3",
    buyer: "Approve or annotate the sample — fit, colour, print registration, label placement",
    mz: "Develop pre-production sample. Full lab tests (colorfastness, shrinkage, tensile) on request",
  },
  {
    num: "03",
    phase: "Pre-Production",
    time: "Weeks 4–6",
    buyer: "Approve PP sample, release bulk production",
    mz: "PP sample for buyer sign-off. Bulk fabric cut only after written approval",
  },
  {
    num: "04",
    phase: "Bulk Production",
    time: "Weeks 7–14",
    buyer: "Available for mid-line inspection if required",
    mz: "In-line inspection at sewing stage. Final pre-shipment inspection per agreed AQL before packing",
  },
  {
    num: "05",
    phase: "QC & Dispatch",
    time: "Weeks 14–16",
    buyer: "Receive pre-shipment inspection report, approve loading",
    mz: "Pre-shipment inspection report issued. Documents: commercial invoice, packing list, CoO, B/L",
  },
];

const RELATED = [
  {
    title: "Polo Shirts",
    href: "/apparel/knittedgarments/poloshirts/",
    image: "/images/menu/polo.webp",
    alt: "Pakistan polo shirt manufacturer — pique cotton polo shirts OEM wholesale for corporate and retail brands in USA UK and Europe",
    tag: "180–260 GSM",
  },
  {
    title: "Henley Shirts",
    href: "/apparel/knittedgarments/henleyshirts/",
    image: "/images/menu/menu-henleyshirts.webp",
    alt: "Pakistan henley shirt manufacturer — single jersey and waffle knit henley shirts wholesale export",
    tag: "160–220 GSM",
  },
  {
    title: "Sweatshirts & Hoodies",
    href: "/apparel/knittedgarments/sweatshirtshoodies/",
    image: "/images/thumbnails/thumb-hoodies-sweatshirts.webp",
    alt: "Pakistan sweatshirt and hoodie manufacturer — french terry and fleece hoodies OEM wholesale for brands in USA UK and Europe",
    tag: "300–420 GSM",
  },
  {
    title: "Tank Tops",
    href: "/apparel/knittedgarments/tanktops/",
    image: "/images/menu/menu-tanktops.webp",
    alt: "Pakistan tank top manufacturer — single jersey and rib knit tank tops OEM wholesale export",
    tag: "130–180 GSM",
  },
];

const ENQUIRY_CHECKLIST = [
  { item: "Fabric type and fibre composition", eg: "e.g. 100% combed cotton single jersey" },
  { item: "Target GSM", eg: "e.g. 180 g/m²" },
  { item: "Fit and size range", eg: "e.g. regular fit, XS–2XL, USA sizing" },
  { item: "Colour count and colour references", eg: "e.g. 6 colours, Pantone references provided" },
  { item: "Decoration method and placement", eg: "e.g. screen print front chest, 3 colours" },
  { item: "Quantity per colour / per style", eg: "e.g. 500 pcs per colour, 3,000 pcs total" },
  { item: "Required delivery date and destination port", eg: "e.g. FOB Karachi by 15 Nov, port Los Angeles" },
  { item: "Certification requirements", eg: "e.g. OEKO-TEX certificate required" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function ConstructionAccordion() {
  const [active, setActive] = useState("single-jersey");

  const current = CONSTRUCTIONS.find((c) => c.id === active)!;

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-0 rounded-2xl overflow-hidden border border-white/10">
      {/* Left — list */}
      <div className="bg-navy-950 border-r border-white/8">
        {CONSTRUCTIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`w-full text-left px-5 py-4 border-b border-white/5 transition-all duration-150 ${
              active === c.id
                ? "bg-gold/10 border-l-2 border-l-gold"
                : "hover:bg-white/5 border-l-2 border-l-transparent"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className={`font-semibold text-sm ${active === c.id ? "text-white" : "text-gray-400"}`}>
                  {c.name}
                </p>
                <p className="text-[11px] text-gray-600 mt-0.5">{c.gsm}</p>
              </div>
              {c.featured && (
                <span className="text-[9px] font-bold tracking-widest text-gold uppercase bg-gold/10 rounded px-1.5 py-0.5 flex-shrink-0">
                  Most Ordered
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Right — detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-[#08111f] p-7 lg:p-10"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2">{current.share}</p>
              <h3 className="text-white font-bold text-2xl">{current.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{current.hand}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {current.markets.map((m) => (
                <span key={m} className="px-2.5 py-1 bg-white/8 border border-white/12 text-gray-300 text-[11px] font-medium rounded-full">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">{current.detail}</p>

          <div className="flex flex-wrap gap-5 pt-5 border-t border-white/8">
            <div>
              <p className="text-gray-500 text-[11px] uppercase tracking-wider mb-1">Weight Range</p>
              <p className="text-white font-bold text-lg">{current.gsm}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[11px] uppercase tracking-wider mb-1">Best Application</p>
              <p className="text-white font-semibold text-sm">{current.best}</p>
            </div>
          </div>

          <Link
            href="/rfq/"
            className="inline-flex items-center gap-2 mt-6 text-xs font-bold text-gold hover:underline"
          >
            Specify this construction in your RFQ →
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function GsmRuler() {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="min-w-[640px] px-8">
        <div className="relative h-14 mb-1">
          {GSM_GUIDE.map((p) => (
            <div
              key={p.gsm}
              className="absolute -translate-x-1/2 text-center"
              style={{ left: `${p.pct}%` }}
            >
              <p className="text-gold font-bold text-sm tabular-nums leading-tight">{p.gsm}</p>
              <p className="text-gray-400 text-[10px] mt-0.5">{p.sub}</p>
            </div>
          ))}
        </div>

        <div className="relative h-3 rounded-full bg-gradient-to-r from-sky-200 via-gold/50 to-gold">
          {GSM_GUIDE.map((p) => (
            <div
              key={p.gsm}
              className="absolute top-0 h-full w-px bg-white/20"
              style={{ left: `${p.pct}%` }}
            />
          ))}
          {GSM_GUIDE.map((p) => (
            <div
              key={`d-${p.gsm}`}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-gold shadow"
              style={{ left: `${p.pct}%` }}
            />
          ))}
        </div>

        <div className="relative h-12 mt-1.5">
          {GSM_GUIDE.map((p) => (
            <div
              key={`l-${p.gsm}`}
              className="absolute -translate-x-1/2 text-center"
              style={{ left: `${p.pct}%` }}
            >
              <p className="text-navy-900 font-semibold text-[11px] whitespace-nowrap">{p.label}</p>
              <p className="text-gray-400 text-[10px] whitespace-nowrap">{p.mkt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ filled }: { filled: boolean }) {
  if (!filled) {
    return <span className="w-5 h-5 rounded-full border border-white/15 inline-block" />;
  }
  return (
    <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 inline-flex items-center justify-center flex-shrink-0">
      <svg className="w-3 h-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function TShirtsContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[520px] overflow-hidden">
        <Image
          src="/images/thumbnails/thumb-tshirts.webp"
          alt="Pakistan t-shirt manufacturer — OEM cotton t-shirt production facility for brands and retailers in USA UK and Europe"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/30" />

        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-xl"
            >
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-gray-500 text-xs mb-5">
                <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
                <span aria-hidden="true">/</span>
                <Link href="/apparel/knittedgarments/" className="hover:text-gold transition-colors">Knitted Garments</Link>
                <span aria-hidden="true">/</span>
                <span className="text-gold">T-Shirts</span>
              </nav>

              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Knitted Garments</p>

              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
                T-Shirt Manufacturer<br />
                <span className="text-gray-300 font-normal text-3xl sm:text-4xl">Pakistan — OEM &amp; Wholesale</span>
              </h1>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                Custom-constructed cotton t-shirts for brands, retailers and promotional buyers in the USA, UK and Europe. AQL-inspected, certified, shipped FOB or CIF.
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2 mb-7">
                {["OEKO-TEX Certified", "GOTS Available", "Pre-shipment Inspection", "FOB / CIF"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 border border-white/15 text-white text-[11px] font-medium rounded-full backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/rfq/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors"
                >
                  Request a Quote
                </Link>
                <a
                  href="#construction"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white text-sm rounded hover:border-gold hover:text-gold transition-colors"
                >
                  View Constructions
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom stat strip overlaid on hero */}
        <div className="absolute bottom-0 left-0 right-0 bg-navy-950 border-t border-white/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {(
                [
                  { v: "140–280 GSM", l: "Weight Range" },
                  { v: "6 Constructions", l: "Fabric Types" },
                  { v: "USA · EU · UK", l: "Size Standards" },
                  { v: "Screen · DTG · Emb", l: "Decoration" },
                ] as { v: string; l: string }[]
              ).map((s, i) => (
                <div
                  key={s.l}
                  className={[
                    "px-3 sm:px-6 py-3 text-center border-white/8",
                    i % 2 !== 0 ? "border-l" : "",
                    i >= 2 ? "border-t sm:border-t-0" : "",
                    i > 0 ? "sm:border-l" : "",
                  ].join(" ")}
                >
                  <p className="text-gold font-bold text-xs sm:text-sm truncate">{s.v}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5 truncate">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 1: What Buyers Actually Specify ────────────────────────
          The "supplier qualification" hook — structured around the 6 decisions
          a procurement manager has to make before they can place an order.
      */}
      <section className="py-16 sm:py-20 bg-navy-900" id="specification">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Before You Enquire</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-md">
                The Six Decisions That Define Your Order
              </h2>
              <p className="text-gray-400 text-sm max-w-xs lg:text-right">
                A precise specification means an accurate quote. These are the six variables we need from every buyer.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {SPEC_DIMENSIONS.map((dim, i) => (
              <motion.div
                key={dim.key}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden hover:border-gold/30 transition-colors duration-200 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5">
                  {/* Dimension label */}
                  <div className="sm:w-52 flex-shrink-0">
                    <p className="text-gold font-bold text-sm font-mono">{dim.label}</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">{dim.note}</p>
                  </div>

                  {/* Option pills */}
                  <div className="flex-1 flex flex-wrap gap-2">
                    {dim.options.map((opt) => (
                      <span
                        key={opt}
                        className="px-3 py-1.5 bg-white/6 border border-white/10 text-gray-300 text-xs rounded-lg group-hover:border-white/20 transition-colors"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
            <Link
              href="/rfq/"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors"
            >
              Open RFQ Wizard — We Walk You Through Each Step
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 2: Construction Deep Dive ───────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#060e18]" id="construction">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Fabric Construction</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Six Constructions We Manufacture
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl">
              Choosing the right construction is the single highest-impact decision in a t-shirt order. Select a construction to see detailed guidance.
            </p>
          </div>

          <ConstructionAccordion />

          <div className="mt-10 p-6 bg-gold/5 border border-gold/20 rounded-2xl flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm mb-1">Not sure which construction is right?</p>
              <p className="text-gray-400 text-xs">Tell us your end-use, market and price point — we will recommend a construction and provide a sample for evaluation.</p>
            </div>
            <Link
              href="/contact-us/"
              className="flex-shrink-0 inline-flex items-center justify-center px-5 py-2.5 border border-gold/40 text-gold text-sm font-semibold rounded hover:bg-gold hover:text-navy-900 transition-colors"
            >
              Ask a Technician
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 3: GSM Weight Guide ──────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Weight Reference</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">T-Shirt GSM Guide</h2>
            <p className="text-gray-500 text-sm mt-2">
              GSM (grams per square metre) is the primary weight specification. Higher GSM = heavier hand feel, better drape, perceived premium quality. Lower GSM = lighter, faster-drying, lower cost per unit.
            </p>
          </div>
          <GsmRuler />

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { range: "140–160 g", use: "Promotional & Event", note: "Price-sensitive volume. High run quantities." },
              { range: "160–185 g", use: "Fashion & Fast Retail", note: "Standard EU and UK fashion retail weight." },
              { range: "185–220 g", use: "Premium Retail", note: "USA mid-market and UK premium basics standard." },
              { range: "220–280 g", use: "Workwear & Streetwear", note: "Heavy feel. Structured. Streetwear and workwear." },
            ].map((row) => (
              <div key={row.range} className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-gold font-bold text-sm mb-1">{row.range}</p>
                <p className="text-navy-900 font-semibold text-xs mb-1.5">{row.use}</p>
                <p className="text-gray-400 text-[11px] leading-relaxed">{row.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Certification × Market Matrix ─────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-16 lg:items-start">
          <div className="lg:flex-1 min-w-0">
          <div className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Certifications by Market</h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl">
              Which certificates matter depends on your destination market and sourcing policy. This matrix shows what we hold and what each market typically demands.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/8 border-b border-white/10">
                  <th className="text-left px-6 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider w-56">Certificate</th>
                  <th className="text-center px-4 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider">USA</th>
                  <th className="text-center px-4 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider">UK</th>
                  <th className="text-center px-4 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider">EU</th>
                  <th className="text-center px-4 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider">Sustainability</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider">What It Covers</th>
                </tr>
              </thead>
              <tbody>
                {CERT_MATRIX.map((row, i) => (
                  <motion.tr
                    key={row.cert}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"}`}
                  >
                    <td className="px-6 py-4 text-white font-semibold text-sm">{row.cert}</td>
                    <td className="px-4 py-4 text-center"><CheckIcon filled={row.usa} /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon filled={row.uk} /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon filled={row.eu} /></td>
                    <td className="px-4 py-4 text-center"><CheckIcon filled={row.sustain} /></td>
                    <td className="px-6 py-4 text-gray-400 text-xs leading-relaxed max-w-xs">{row.note}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked */}
          <div className="sm:hidden space-y-3">
            {CERT_MATRIX.map((row, i) => (
              <motion.div
                key={row.cert}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/[0.06] border border-white/10 rounded-xl p-4"
              >
                <p className="text-white font-semibold text-sm mb-2">{row.cert}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {row.usa && <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">USA</span>}
                  {row.uk && <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">UK</span>}
                  {row.eu && <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">EU</span>}
                  {row.sustain && <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">Sustainability</span>}
                </div>
                <p className="text-gray-400 text-xs">{row.note}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-gray-500 text-xs mt-5">
            Certification requirements on your order confirmed in writing before production. All test reports available on request.
          </p>
          </div>{/* end lg:flex-1 */}

          {/* Right: decorative certifications image — desktop only, no text on it */}
          <div className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
            <div className="relative h-[420px] rounded-2xl overflow-hidden">
              <Image
                src="/images/menu/menu-certifications.webp"
                alt=""
                fill
                className="object-cover"
                sizes="288px"
                aria-hidden="true"
              />
            </div>
          </div>

          </div>{/* end lg:flex */}
        </div>
      </section>

      {/* ── Section 5: OEM Programme — Buyer Perspective ─────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM Programme</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 max-w-md">
                From Your Spec to Delivered Order — What Happens When
              </h2>
              <p className="text-gray-500 text-sm max-w-xs lg:text-right">
                Total lead time 12–16 weeks for a standard first order. Repeat orders are faster.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {OEM_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="grid sm:grid-cols-[130px_1fr_1fr] gap-0 rounded-2xl overflow-hidden border border-gray-100 hover:border-gold/30 hover:shadow-md transition-all duration-200"
              >
                {/* Number + phase */}
                <div className="bg-navy-900 flex flex-row sm:flex-col items-start sm:items-start justify-between sm:justify-start gap-3 px-5 py-4 sm:p-5 sm:w-[130px] sm:flex-shrink-0">
                  <span className="text-gold font-black text-xl font-mono leading-none">{step.num}</span>
                  <div className="sm:mt-2">
                    <p className="text-white font-bold text-sm sm:text-xs">{step.phase}</p>
                    <p className="text-gray-400 text-[11px]">{step.time}</p>
                  </div>
                </div>

                {/* Buyer column */}
                <div className="bg-gray-50 px-6 py-5 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">You (Buyer)</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{step.buyer}</p>
                </div>

                {/* MZ column */}
                <div className="bg-white px-6 py-5 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2">MZ Global Trading</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.mz}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: How to Enquire ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Get a Quote</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
                What to Include in Your Enquiry
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-7">
                The more precise your brief, the faster and more accurate our response. A complete specification avoids back-and-forth delays and gets you a firm quotation within 24–48 hours.
              </p>

              <div className="space-y-3">
                {ENQUIRY_CHECKLIST.map((item, i) => (
                  <motion.div
                    key={item.item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy-900 text-gold text-[10px] font-black flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-navy-900 font-semibold text-sm">{item.item}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.eg}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="lg:sticky lg:top-40">
              <div className="bg-navy-900 rounded-2xl p-8">
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Start Now</p>
                <h3 className="text-white font-bold text-2xl mb-4">
                  Our RFQ Wizard Covers Every Specification
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  The wizard walks you through every decision — fabric, weight, fit, decoration, packaging, logistics and certification. Takes 5–8 minutes. A structured brief ensures we respond with an accurate quote, not an estimate.
                </p>

                <div className="space-y-3 mb-7">
                  {[
                    "Fabric construction and fibre options",
                    "GSM weight selector with guidance",
                    "Print method and placement fields",
                    "Packaging and labelling specification",
                    "Destination port, incoterm and delivery date",
                    "Certification requirements",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-gray-300 text-xs">
                      <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>

                <Link
                  href="/rfq/"
                  className="block w-full text-center px-6 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors"
                >
                  Open RFQ Wizard →
                </Link>

                <p className="text-gray-600 text-xs text-center mt-4">
                  Or email directly:{" "}
                  <a href="mailto:info@mzglobaltrading.com" className="text-gold hover:underline">
                    info@mzglobaltrading.com
                  </a>
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Section 7: Related Products ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Knitted Garments</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">More From This Category</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {RELATED.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="h-52 sm:h-64"
              >
                <Link
                  href={r.href}
                  className="group flex flex-col w-full h-full rounded-2xl overflow-hidden"
                >
                  <div className="relative flex-1 min-h-0 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="bg-navy-900 px-4 py-3 flex-shrink-0">
                    <p className="text-white font-semibold text-sm leading-snug">{r.title}</p>
                    <p className="text-gold text-xs mt-1">{r.tag}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/apparel/knittedgarments/"
              className="inline-flex items-center gap-2 text-navy-900 font-semibold text-sm hover:text-gold transition-colors"
            >
              View All Knitted Garments
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <CertificationsStrip />
    </>
  );
}
