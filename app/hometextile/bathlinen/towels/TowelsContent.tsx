"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CertificationsStrip from "@/components/CertificationsStrip";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    title: "Bath Towels",
    href: "/hometextile/bathlinen/towels/",
    image: "/images/menu/menu-towels.webp",
    alt: "Pakistan bath towel manufacturer — premium terry cotton bath towels wholesale for hotels and retail buyers in USA UK Europe",
    tag: "400–650 GSM",
    sector: "Hotels · Retailers · Hospitality",
    desc: "Terry loop, velour and zero-twist constructions. Custom GSM, size, colour and border on request.",
    featured: true,
  },
  {
    title: "Institutional Towels",
    href: "/hometextile/bathlinen/institutionaltowels/",
    image: "/images/menu/menu-institutionaltowels.webp",
    alt: "Institutional towel supplier Pakistan — bulk hotel and hospital grade white cotton towels export",
    tag: "400–550 GSM",
    sector: "Hotels · Hospitals · Gyms",
    desc: "Plain white and dobby stripe. Bulk supply, consistent grade.",
    featured: false,
  },
  {
    title: "Bathrobes",
    href: "/hometextile/bathlinen/bathrobes/",
    image: "/images/thumbnails/thumb-bathrobes.webp",
    alt: "Bathrobe manufacturer Pakistan — terry waffle and velour bathrobes wholesale for hotels and spas in USA UK and Europe",
    tag: "350–500 GSM",
    sector: "Hotels · Spas · Retail Brands",
    desc: "Terry, waffle and velour. Shawl, kimono and hooded collar options.",
    featured: false,
  },
  {
    title: "Bath Mats",
    href: "/hometextile/bathlinen/bathmats/",
    image: "/images/menu/menu-bathmats.webp",
    alt: "Bath mat manufacturer Pakistan — tufted and terry bath mats with anti-slip backing wholesale export",
    tag: "800–1,500 GSM",
    sector: "Hotels · Retailers · Hospitality",
    desc: "Tufted, chenille and terry. Anti-slip latex backing. Custom sizes.",
    featured: false,
  },
  {
    title: "Beach & Pool Towels",
    href: "/hometextile/bathlinen/beachpooltowel/",
    image: "/images/menu/menu-beachpooltowels.webp",
    alt: "Beach and pool towel manufacturer Pakistan — velour and sublimation print towels wholesale",
    tag: "350–500 GSM",
    sector: "Resorts · Retailers · Lifestyle Brands",
    desc: "Velour, fouta and microfiber. Sublimation and reactive print available.",
    featured: false,
  },
  {
    title: "Kitchen Towels",
    href: "/hometextile/kitchenlinen/kitchentowels/",
    image: "/images/menu/menu-kitchentowels.webp",
    alt: "Kitchen towel manufacturer Pakistan — waffle and huck weave dish towels wholesale for food service and retail",
    tag: "150–250 GSM",
    sector: "Retailers · Food Service · Hospitality",
    desc: "Waffle, huck and plain weave. Food-safe dyes. Yarn-dyed stripe options.",
    featured: false,
  },
];

const WEAVES = [
  {
    id: "terry",
    name: "Terry Loop",
    gsm: "400–700 GSM",
    best: "Hotel white programme, institutional supply",
    detail:
      "Uncut loops on both faces deliver maximum absorbency. The standard for hotel and hospitality supply worldwide. Available in all weights and sizes.",
  },
  {
    id: "velour",
    name: "Velour / Sheared Terry",
    gsm: "400–650 GSM",
    best: "Premium retail, branded collections",
    detail:
      "One face sheared to a smooth velvet finish. Excellent print surface for sublimation. Preferred by retail brands and spa collections.",
  },
  {
    id: "zerotwist",
    name: "Zero Twist Terry",
    gsm: "300–500 GSM",
    best: "Spa grade, fast-dry performance",
    detail:
      "No twist in the yarn — extremely soft hand feel, fast drying. Lighter than standard terry at equivalent GSM. Growing preference in luxury hospitality.",
  },
  {
    id: "waffle",
    name: "Waffle / Honeycomb",
    gsm: "250–450 GSM",
    best: "Kitchen, face and gym towels",
    detail:
      "Woven cell structure increases surface area for high absorbency at lower GSM. Ideal for kitchen, gym and travel applications.",
  },
  {
    id: "jacquard",
    name: "Jacquard Terry",
    gsm: "450–650 GSM",
    best: "Premium retail, branded programmes",
    detail:
      "Pattern woven directly into the fabric — no print required. Permanent design integrity wash after wash. Preferred for luxury retail programmes.",
  },
  {
    id: "dobby",
    name: "Dobby Border",
    gsm: "400–600 GSM",
    best: "Hospitality, institutional and gifting",
    detail:
      "Decorative woven border on a plain terry body. Classic hospitality appearance. Available as full dobby stripe or border-only construction.",
  },
];

const FIBERS = [
  { name: "Combed Cotton", market: "Hospitality · Retail", detail: "Highest volume — premium absorbency and softness at competitive price." },
  { name: "Egyptian Cotton", market: "Luxury Retail", detail: "Long-staple extra-fine fibre — ultra-soft hand feel for premium positioning." },
  { name: "Organic Cotton", market: "Sustainable Brands", detail: "GOTS certified — satisfies environmental sourcing mandates." },
  { name: "Zero Twist Cotton", market: "Spa · Premium Hotel", detail: "Untwisted yarn — extraordinary softness, fast-drying performance." },
  { name: "Bamboo Blend", market: "Wellness · Retail", detail: "Naturally antibacterial — growing demand in wellness and eco retail." },
  { name: "Recycled Cotton", market: "Sustainability Programmes", detail: "GRS certified — satisfies circularity commitments and compliance requirements." },
  { name: "Turkish Cotton", market: "European Market", detail: "High absorbency with classic appeal — strong demand in UK and European retail." },
  { name: "Microfiber", market: "Gym · Sports · Travel", detail: "Rapid-dry performance grade — sports, gym and travel towel applications." },
];

const GSM_POINTS = [
  { gsm: 300, pct: 0, label: "Kitchen & Dish", sub: "Lightweight" },
  { gsm: 380, pct: 20, label: "Beach & Pool", sub: "Print grade" },
  { gsm: 450, pct: 37.5, label: "Hand Towels", sub: "Retail standard" },
  { gsm: 500, pct: 50, label: "Bath Towels", sub: "Hotel programme" },
  { gsm: 580, pct: 70, label: "Spa & Luxury", sub: "Premium grade" },
  { gsm: 650, pct: 87.5, label: "Bath Sheets", sub: "Ultra-plush" },
  { gsm: 700, pct: 100, label: "Institutional", sub: "Heavy-duty" },
];

const SECTORS = [
  {
    name: "Hotels & Resorts",
    desc: "White programme bath linen, branded bathrobes and spa towels delivered to your volume, branding and quality specification.",
  },
  {
    name: "Healthcare",
    desc: "Hospital-grade huck towels, patient linen and surgical textiles meeting ISO and healthcare procurement standards.",
  },
  {
    name: "Retail & E-Commerce",
    desc: "Branded bath collections, gift sets and custom colour ranges for department stores and online retail brands.",
  },
  {
    name: "Gyms & Wellness",
    desc: "Fast-dry gym towels, pool towels and spa robes for wellness chains, leisure facilities and fitness brands.",
  },
  {
    name: "Food Service",
    desc: "Waffle and huck weave kitchen towels for restaurant groups, catering companies and food retailers.",
  },
  {
    name: "Government & Institutional",
    desc: "Bulk supply programmes for military, correctional, healthcare and government procurement departments.",
  },
];

const CUSTOMISATION = [
  {
    heading: "Dyeing",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    items: ["Reactive dyeing", "Vat dyeing", "Yarn dyeing", "Piece dyeing", "Solid & multi-tone"],
  },
  {
    heading: "Printing & Design",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    items: ["Digital / sublimation print", "Screen printing", "Rotary printing", "Embroidery", "Jacquard woven", "Custom dobby border"],
  },
  {
    heading: "Packaging",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    items: ["Individual polybag", "Rolled & banded", "Retail gift box", "Custom branded sleeve", "Bulk carton / pallet"],
  },
];

const SIZING = [
  { type: "Face Towel", usa: "12\" × 12\"", eu: "30 × 30 cm", uk: "12\" × 12\"" },
  { type: "Hand Towel", usa: "16\" × 30\"", eu: "50 × 100 cm", uk: "16\" × 30\"" },
  { type: "Bath Towel", usa: "27\" × 52\" – 30\" × 58\"", eu: "70 × 140 cm", uk: "27\" × 52\" – 30\" × 60\"" },
  { type: "Bath Sheet", usa: "35\" × 60\" – 40\" × 70\"", eu: "90 × 150 cm", uk: "35\" × 60\"" },
  { type: "Beach Towel", usa: "30\" × 60\" – 40\" × 70\"", eu: "75 × 150 – 100 × 200 cm", uk: "30\" × 60\"" },
  { type: "Gym Towel", usa: "20\" × 40\"", eu: "50 × 100 cm", uk: "20\" × 40\"" },
];

const STATS = [
  { value: "300–700", label: "GSM Range" },
  { value: "8+", label: "Fibre Types" },
  { value: "6", label: "Weave Structures" },
  { value: "44", label: "Towel Varieties" },
  { value: "USA · EU · UK", label: "Size Standards" },
  { value: "GOTS · OEKO-TEX", label: "Top Certifications" },
];

// ─── GSM Ruler ───────────────────────────────────────────────────────────────

function GsmRuler() {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="min-w-[640px] px-8">
        {/* Labels above */}
        <div className="relative h-12 mb-1">
          {GSM_POINTS.map((p) => (
            <div
              key={p.gsm}
              className="absolute -translate-x-1/2 text-center"
              style={{ left: `${p.pct}%` }}
            >
              <p className="text-gold font-bold text-sm tabular-nums">{p.gsm}</p>
              <p className="text-gray-400 text-[10px] leading-tight">{p.sub}</p>
            </div>
          ))}
        </div>

        {/* Gradient bar */}
        <div className="relative h-2.5 rounded-full bg-gradient-to-r from-blue-200 via-gold/60 to-gold">
          {GSM_POINTS.map((p) => (
            <div
              key={p.gsm}
              className="absolute top-0 bottom-0 w-px bg-navy-900/25"
              style={{ left: `${p.pct}%` }}
            />
          ))}
          {GSM_POINTS.map((p) => (
            <div
              key={`dot-${p.gsm}`}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-gold shadow-sm"
              style={{ left: `${p.pct}%` }}
            />
          ))}
        </div>

        {/* Labels below */}
        <div className="relative h-10 mt-1">
          {GSM_POINTS.map((p) => (
            <div
              key={`lbl-${p.gsm}`}
              className="absolute -translate-x-1/2 text-center"
              style={{ left: `${p.pct}%` }}
            >
              <p className="text-navy-900 font-medium text-[11px] whitespace-nowrap">{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Weave Accordion ─────────────────────────────────────────────────────────

function WeaveAccordion() {
  const [active, setActive] = useState(WEAVES[0].id);

  return (
    <div className="space-y-2">
      {WEAVES.map((w, i) => {
        const isOpen = active === w.id;
        return (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
              isOpen ? "border-gold/50 bg-white/8" : "border-white/10 bg-white/5"
            }`}
          >
            <button
              onClick={() => setActive(isOpen ? "" : w.id)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className={`text-xs font-bold tabular-nums transition-colors ${isOpen ? "text-gold" : "text-white/30"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className={`font-semibold text-sm transition-colors ${isOpen ? "text-white" : "text-gray-300"}`}>{w.name}</p>
                  <p className="text-gray-500 text-xs truncate">{w.best}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="hidden sm:block text-[10px] font-semibold text-gold/70 tracking-wide">{w.gsm}</span>
                <motion.svg
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${isOpen ? "text-gold" : "text-white/30"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </motion.svg>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 pt-1 border-t border-white/8">
                    <p className="text-gray-300 text-sm leading-relaxed">{w.detail}</p>
                    <Link
                      href="/rfq/"
                      className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-gold hover:underline"
                    >
                      Request this construction →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TowelsContent() {
  const featured = CATEGORIES.find((c) => c.featured)!;
  const secondary = CATEGORIES.filter((c) => !c.featured);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[480px] overflow-hidden">
        <Image
          src="/images/thumbnails/thumb-towels.webp"
          alt="Pakistan terry cotton towel manufacturer — premium bath towels for hotels and retail buyers in USA, UK and Europe"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/30" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-gray-400 text-xs mb-5">
                <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
                <span aria-hidden="true">/</span>
                <Link href="/hometextile/bathlinen/" className="hover:text-gold transition-colors">Bath Linen</Link>
                <span aria-hidden="true">/</span>
                <span className="text-gold">Towels</span>
              </nav>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Bath Linen</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Towels Manufacturer<br className="hidden sm:block" /> &amp; Exporter
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                Pakistan-made towels for hotels, retailers and healthcare buyers worldwide. Custom construction, certified fibres, consistent quality order to order.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/rfq/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors"
                >
                  Request a Quote
                </Link>
                <a
                  href="#range"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white text-sm rounded hover:border-gold hover:text-gold transition-colors"
                >
                  Explore Range
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <section className="bg-navy-900 py-5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="text-center py-2"
              >
                <p className="text-gold font-bold text-base leading-tight">{s.value}</p>
                <p className="text-gray-400 text-[11px] mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bento Product Range ───────────────────────────────────────────── */}
      <section id="range" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">What We Supply</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Bath Linen Range</h2>
              <p className="text-gray-500 text-sm max-w-xs">
                Six product lines. Every procurement category covered.
              </p>
            </div>
          </div>

          {/* Bento grid — desktop: featured 2×2 + 4 cells + 1 wide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:grid-rows-[220px_220px_200px]">

            {/* Featured — Bath Towels: 2 cols × 2 rows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sm:col-span-2 lg:col-span-2 lg:row-span-2 sm:h-72 lg:h-full"
            >
              <Link
                href={featured.href}
                className="group relative block w-full h-full min-h-[300px] lg:min-h-0 rounded-2xl overflow-hidden"
              >
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                  priority
                />
                {/* Top badge — sits directly on image, has own bg */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-gold text-navy-900 text-[10px] font-bold rounded-full tracking-wide uppercase">
                    Featured
                  </span>
                </div>

                {/* Solid bottom panel — no gradient, guaranteed readable */}
                <div className="absolute bottom-0 left-0 right-0 bg-navy-950 px-6 sm:px-8 py-5 z-10">
                  <p className="text-gold text-[10px] font-semibold tracking-[0.18em] uppercase mb-2">{featured.sector}</p>
                  <h3 className="text-white font-bold text-2xl sm:text-3xl mb-2">{featured.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-sm">{featured.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs font-medium">{featured.tag}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gold group-hover:gap-3 transition-all duration-200">
                      View Specifications
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Secondary cards — 4 single cells, split layout */}
            {secondary.slice(0, 4).map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="h-52 lg:h-full"
              >
                <Link
                  href={cat.href}
                  className="group flex flex-col w-full h-full rounded-2xl overflow-hidden"
                >
                  <div className="relative flex-1 min-h-0 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="bg-navy-900 px-4 py-3 flex-shrink-0">
                    <p className="text-gold text-[9px] font-semibold tracking-[0.15em] uppercase mb-1">{cat.sector}</p>
                    <p className="text-white font-bold text-sm">{cat.title}</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">{cat.tag}</p>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Last cell — Kitchen Towels: full width on bottom row (lg: 1 col) */}
            <motion.div
              key={secondary[4].title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.32 }}
              className="sm:col-span-2 lg:col-span-1 h-52 lg:h-full"
            >
              <Link
                href={secondary[4].href}
                className="group flex flex-col w-full h-full rounded-2xl overflow-hidden"
              >
                <div className="relative flex-1 min-h-0 overflow-hidden">
                  <Image
                    src={secondary[4].image}
                    alt={secondary[4].alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="bg-navy-900 px-4 py-3 flex-shrink-0">
                  <p className="text-gold text-[9px] font-semibold tracking-[0.15em] uppercase mb-1">{secondary[4].sector}</p>
                  <p className="text-white font-bold text-sm">{secondary[4].title}</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">{secondary[4].tag}</p>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Sectors ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Sectors Served</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Who Sources From Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white/[0.07] border border-white/15 rounded-2xl p-6 hover:bg-white/[0.12] hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-8 h-px bg-gold mb-4" />
                <h3 className="text-white font-semibold text-base mb-2">{s.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GSM Visual Guide ─────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Specification Guide</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">GSM Weight Reference</h2>
            <p className="text-gray-500 text-sm mt-2">Weight in grams per square metre — the primary quality specification for towels.</p>
          </div>
          <GsmRuler />
        </div>
      </section>

      {/* ── Material & Weave ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Construction</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Material &amp; Weave Options</h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl">
              Every fibre type and weave structure your procurement specifications require — all available from a single source.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Fibre Types — editorial grid */}
            <div>
              <h3 className="text-xs font-semibold text-white/40 tracking-[0.18em] uppercase mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-gold flex-shrink-0" />
                Fibre Types
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {FIBERS.map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="group bg-white/5 border border-white/8 rounded-xl p-4 hover:border-gold/40 hover:bg-white/8 transition-all duration-200 cursor-default"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-white font-semibold text-sm">{f.name}</p>
                    </div>
                    <p className="text-gold text-[10px] font-medium tracking-wide mb-1.5">{f.market}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{f.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Weave Accordion */}
            <div>
              <h3 className="text-xs font-semibold text-white/40 tracking-[0.18em] uppercase mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-gold flex-shrink-0" />
                Weave Structures
              </h3>
              <WeaveAccordion />
            </div>

          </div>
        </div>
      </section>

      {/* ── Customisation ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM Programmes</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Dyeing, Printing &amp; Packaging</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-xl">
              Full customisation from yarn through to packaged unit — one source, every specification.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {CUSTOMISATION.map((col, i) => (
              <motion.div
                key={col.heading}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-gray-50 rounded-2xl p-7 border border-gray-100 overflow-hidden group hover:border-gold/30 hover:shadow-md transition-all duration-300"
              >
                {/* Background number */}
                <span className="absolute top-4 right-5 text-7xl font-black text-gray-100 leading-none select-none group-hover:text-gold/8 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-navy-900 text-gold flex items-center justify-center mb-5">
                    {col.icon}
                  </div>
                  <h3 className="text-navy-900 font-bold text-lg mb-5">{col.heading}</h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-gray-600 text-sm">
                        <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Size Standards ───────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">International Standards</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Size Standards by Market</h2>
            <p className="text-gray-500 text-sm mt-2">Custom sizes manufactured to your specification on request.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="text-left px-5 py-4 font-semibold">Towel Type</th>
                  <th className="text-center px-5 py-4 font-semibold">USA</th>
                  <th className="text-center px-5 py-4 font-semibold">Europe</th>
                  <th className="text-center px-5 py-4 font-semibold">UK</th>
                </tr>
              </thead>
              <tbody>
                {SIZING.map((row, i) => (
                  <tr key={row.type} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-5 py-3.5 font-medium text-navy-900">{row.type}</td>
                    <td className="px-5 py-3.5 text-center text-gray-600">{row.usa}</td>
                    <td className="px-5 py-3.5 text-center text-gray-600">{row.eu}</td>
                    <td className="px-5 py-3.5 text-center text-gray-600">{row.uk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CertificationsStrip />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Start Sourcing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Source Towels From Pakistan?
            </h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
              Share your specifications — construction, GSM, size, quantity and destination — and we will respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors"
              >
                Request a Quote
              </Link>
              <Link
                href="/hometextile/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                Explore Home Textiles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
