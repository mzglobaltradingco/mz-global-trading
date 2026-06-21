"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CONSTRUCTIONS = [
  {
    name: "Terry Loop",
    tag: "STANDARD",
    gsm: "320–450 gsm",
    desc: "Classic looped pile on both face and back. High absorbency, quick-dry. The most common construction for everyday baby hooded towels — suitable for GOTS organic cotton programmes.",
    properties: ["High absorbency", "Soft loops", "GOTS available"],
    bg: "bg-blue-50 border-blue-200",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    name: "Velour / Sheared Terry",
    tag: "PREMIUM",
    gsm: "400–550 gsm",
    desc: "Terry loops sheared flat on the face for a plush velvet-like surface. Extremely soft against newborn skin. Higher GSM provides better drape and wrap. Ideal for gift sets and premium programmes.",
    properties: ["Plush surface", "Gift-set quality", "Superior softness"],
    bg: "bg-purple-50 border-purple-200",
    tagColor: "bg-purple-100 text-purple-800",
  },
  {
    name: "Zero Twist Terry",
    tag: "ULTRA-SOFT",
    gsm: "350–500 gsm",
    desc: "Untwisted yarn creates a looser loop structure that is exceptionally soft. Highest absorbency-to-weight ratio. Softens further after the first wash — popular for Scandinavian and premium European baby programmes.",
    properties: ["Fastest drying", "Softest texture", "Premium segment"],
    bg: "bg-emerald-50 border-emerald-200",
    tagColor: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "Waffle / Honeycomb",
    tag: "LIGHTWEIGHT",
    gsm: "200–300 gsm",
    desc: "Textured honeycomb weave creates air pockets for lightweight absorbency. Fast-drying. Popular for warm-climate markets and summer baby bath collections where a lighter towel is preferred.",
    properties: ["Fast-drying", "Lightweight", "Summer programmes"],
    bg: "bg-yellow-50 border-yellow-200",
    tagColor: "bg-yellow-100 text-yellow-800",
  },
];

const SIZE_GUIDE = [
  { ageGroup: "Newborn (0–3M)", towelSize: "60×60 cm", hoodSize: "16×16 cm", hoodDepth: "18 cm", weight: "< 4 kg" },
  { ageGroup: "0–6 Months", towelSize: "70×70 cm", hoodSize: "18×18 cm", hoodDepth: "20 cm", weight: "4–8 kg" },
  { ageGroup: "6–12 Months", towelSize: "75×75 cm", hoodSize: "19×19 cm", hoodDepth: "21 cm", weight: "8–11 kg" },
  { ageGroup: "1–2 Years", towelSize: "80×80 cm", hoodSize: "20×20 cm", hoodDepth: "22 cm", weight: "11–14 kg" },
  { ageGroup: "2–4 Years", towelSize: "90×90 cm", hoodSize: "22×22 cm", hoodDepth: "24 cm", weight: "14–18 kg" },
  { ageGroup: "Toddler / Kids", towelSize: "100×100 cm", hoodSize: "24×24 cm", hoodDepth: "26 cm", weight: "18+ kg" },
];

const HOOD_DESIGNS = [
  { animal: "Bunny", ears: "Long upright ears, rounded tips", detail: "Inner ear lining in contrasting colour", icon: "🐰" },
  { animal: "Bear", ears: "Round ears on hood crown", detail: "Can include embroidered nose/face on hood front", icon: "🐻" },
  { animal: "Lion", ears: "Round ears + fringe mane border", detail: "Mane detail in contrast yarn or printed fabric", icon: "🦁" },
  { animal: "Elephant", ears: "Large flat ears on hood sides", detail: "Trunk detail optional on hood front", icon: "🐘" },
  { animal: "Duck / Chick", ears: "Beak peak + small round eyes", detail: "Beak in contrast colour, all OEKO-TEX Class 1", icon: "🐥" },
  { animal: "Fox", ears: "Pointed triangular ears", detail: "White inner ear lining, tail appliqué option", icon: "🦊" },
  { animal: "Plain Hood", ears: "No ear detail", detail: "Clean triangle or square hood — minimal/Scandinavian", icon: "⬜" },
  { animal: "Custom", ears: "Client character design", detail: "Development from buyer artwork file", icon: "✏️" },
];

const DECORATION = [
  { method: "Embroidery", placement: "Hood front, corner, or chest area", note: "Pre-washed thread, OEKO-TEX Class 1. No sharp backing on newborn skin — underside lined with soft tear-away." },
  { method: "Appliqué", placement: "Hood face — animal character, floral", note: "Fabric appliqué bonded and stitched. All adhesive materials OEKO-TEX Class 1." },
  { method: "Woven Label", placement: "Inner neckline or corner loop", note: "Brand label in woven jacquard or heat-transfer format to buyer specification." },
  { method: "Printed Corner Tag", placement: "Towel corner loop", note: "Care and brand information on heat-transfer or woven label. Ink OEKO-TEX Class 1." },
  { method: "No Decoration", placement: "Plain towel + plain hood", note: "Minimal/Scandinavian style programmes. GOTS label only." },
];

const GSM_TIERS = [
  { range: "200–300", label: "Waffle / Lightweight", note: "Fast-drying, summer programmes, warm markets. Softer on newborn skin in hot climates." },
  { range: "320–400", label: "Standard Terry Loop", note: "Everyday volume programmes. Balanced absorbency and softness. Most ordered weight tier." },
  { range: "400–500", label: "Premium Velour", note: "Gift sets, premium retail, boutique brands. Plush face, heavy drape." },
  { range: "500–600", label: "Ultra-Plush Terry", note: "Maximum absorbency and luxury feel. Hotel gifting, premium baby brands." },
];

const CERTIFICATIONS = [
  { name: "GOTS", tier: "ESSENTIAL", note: "Full organic chain-of-custody — certified cotton farm through finished towel. Required for eco-retail and Scandinavian/German market programmes." },
  { name: "OEKO-TEX Class 1", tier: "ESSENTIAL", note: "Strictest testing tier. Accounts for skin contact and mouthing exposure. Includes all yarns, dyes, finishes and embroidery threads." },
  { name: "BSCI", tier: "STANDARD", note: "European buyer social compliance audit requirement." },
  { name: "Sedex / SMETA", tier: "STANDARD", note: "Ethical supply chain audit transparency for UK and global brands." },
  { name: "ISO 9001", tier: "STANDARD", note: "Factory quality management system documentation." },
  { name: "WRAP", tier: "STANDARD", note: "12-principle humanitarian production standard for USA market buyers." },
  { name: "BCI", tier: "OPTIONAL", note: "Better Cotton Initiative — verified environmental improvement for conventional cotton inputs." },
];

const MARKETS = [
  { flag: "🇺🇸", region: "USA & Canada", tier: "High Volume", note: "CPSC guidelines, OEKO-TEX preferred. Gift sets and registry items." },
  { flag: "🇬🇧", region: "UK", tier: "Premium", note: "BS 4074 terry standard. GOTS organic demand growing." },
  { flag: "🇩🇪", region: "Germany", tier: "Eco-Tier", note: "GOTS mandatory for organic listings. Strict azo-dye enforcement." },
  { flag: "🇸🇪", region: "Scandinavia", tier: "Eco-Tier", note: "GOTS and OEKO-TEX Class 1 expected across all channels." },
  { flag: "🇦🇺", region: "Australia & NZ", tier: "Growing", note: "OEKO-TEX preferred. Gift and registry programmes." },
  { flag: "🇫🇷", region: "France", tier: "Premium", note: "OEKO-TEX and GOTS. Boutique baby brand sourcing." },
  { flag: "🇯🇵", region: "Japan", tier: "Quality Focus", note: "High quality standard — Kanemaku testing, OEKO-TEX." },
  { flag: "🇦🇪", region: "GCC / Middle East", tier: "Gift Sets", note: "Premium gift set programmes. White and pastel palette." },
];

const EXPORT_SPECS = [
  { label: "Lead Time — New Development", value: "60–75 days" },
  { label: "Lead Time — Repeat Order", value: "45–55 days" },
  { label: "Sample Lead Time", value: "12–15 days" },
  { label: "Incoterms", value: "FOB, CIF, CFR, EXW" },
  { label: "Packing", value: "Individual poly bag · Gift box · Ribbon-wrapped · Bulk carton" },
  { label: "Labels", value: "Brand care label, size label, GOTS / OEKO-TEX certification tag" },
  { label: "Port of Shipment", value: "Port Qasim · Karachi" },
  { label: "Inspection", value: "In-house inline + 3rd-party pre-shipment available" },
];

const SUSTAINABILITY = [
  { title: "GOTS Organic Cotton", body: "Certified from the cotton farm through the finished hooded towel. Full chain-of-custody documentation included with shipment." },
  { title: "OEKO-TEX Class 1 Yarns", body: "All terry yarns tested at infant-mouthing limits. No formaldehyde, no heavy metals, no AZO dyes. Applies to body yarn and hood yarn separately." },
  { title: "Baby-Safe Dyes", body: "Low-impact reactive dyes with closed-loop water treatment at certified Pakistan mills. Colourfastness tested to ISO 105-C06 at 60°C." },
  { title: "OEKO-TEX Class 1 Embroidery", body: "All embroidery threads tested to Class 1 limits including nickel content in metal threads. No thread backing material against skin." },
  { title: "Soft-Touch Finishing", body: "Baby-safe silicone-free softener or enzyme wash. No formaldehyde-based softeners or permanent-press finishes." },
  { title: "Recycled Packaging", body: "Poly bags available in 30% recycled PE. Gift boxes produced from FSC-certified board. Tissue paper acid-free." },
];

const PROCESS = [
  { n: 1, title: "Fabric & Yarn Certification", body: "Terry yarn GSM, colourfastness and OEKO-TEX Class 1 test reports confirmed before weaving. GOTS mill certificate verified." },
  { n: 2, title: "Hood Pattern Development", body: "Hood size graded per towel size. Ear construction developed from buyer artwork or standard animal library. Sample hood approved." },
  { n: 3, title: "Decoration Signoff", body: "Embroidery thread and any appliqué adhesive tested to OEKO-TEX Class 1 limits. Colour approval on embroidered sample." },
  { n: 4, title: "Bulk Weaving & Cutting", body: "Terry body woven at GSM ±5%. Hood and ear panels cut to approved patterns. All fabrics from certified batches." },
  { n: 5, title: "Inline Quality Check", body: "Seam strength, hood attachment, ear security and embroidery adhesion checked at 30% and 70% production completion." },
  { n: 6, title: "Final Audit & Packing", body: "100% visual inspection. Packed to buyer spec — individual poly, gift box or gift-wrap. GOTS / OEKO-TEX certificates included." },
];

const FAQS = [
  {
    q: "How is the hood attached to the towel body?",
    a: "The hood is typically sewn into the corner of the towel with a double-stitched overlock seam — the same weight construction as the towel body. This creates the strongest attachment point. Some premium programmes use a mitered corner construction where the hood panel is integrated into the towel corner rather than applied on top, for a cleaner finish and better durability through repeated washing.",
  },
  {
    q: "How do you ensure the ear details are safe for newborns?",
    a: "Ear constructions are assessed for three safety criteria: (1) no choking hazard — stuffed ear panels use polyester fill certified to OEKO-TEX Class 2+, not loose fibres; (2) no sharp edges — all ear tips are rounded and seam-finished; (3) attachment strength — ear seams tested to 30N pull strength. Appliqué ear decorations are stitched all-around perimeter, not just glued. All embroidery thread OEKO-TEX Class 1.",
  },
  {
    q: "What is the difference between OEKO-TEX Class 1 and standard OEKO-TEX for towels?",
    a: "Standard OEKO-TEX 100 has four product classes. Class 1 is specifically for products used by infants and children under 3 years. It applies stricter limits for pH, formaldehyde, heavy metals and colorfast substances because babies have thinner skin and may mouth the product. For a baby hooded towel, Class 1 applies to the terry body, hood, ear fabric, embroidery threads and any sew-in labels. Standard adult towels typically use Class 2 certification.",
  },
  {
    q: "Can you produce GOTS organic cotton hooded towels?",
    a: "Yes. We source from GOTS-certified mills where cotton is certified from the farm stage. GOTS certification covers not only the fibre but also the processing chemicals, dyes and social conditions at the factory. GOTS certification is increasingly required by Scandinavian, German and eco-focused UK and US baby retailers. Certificates issued per order and included with shipment documentation.",
  },
  {
    q: "What custom animal hood designs can you produce?",
    a: "We maintain a standard library of 7 animal hoods — bunny, bear, lion, elephant, duck/chick, fox and plain. Custom character designs are developed from buyer artwork files (AI, EPS or high-resolution PDF). Development includes a proto sample for hood shape, ear placement and embroidery proof before bulk commitment. Character designs that include embroidered facial features (eyes, nose) use OEKO-TEX Class 1 threads with smooth backing so no stitching touches skin.",
  },
  {
    q: "What GSM do you recommend for a premium baby hooded towel gift set?",
    a: "For premium gift programmes targeting USA, UK and European markets, we recommend 400–500 gsm velour (sheared terry) construction. This weight provides excellent absorbency, a plush feel and good drape when wrapped around a baby. It photographs well for e-commerce and holds gift folding without requiring stiff packaging. For Scandinavian eco-programmes, 380–450 gsm zero-twist terry in GOTS organic cotton is the preferred combination.",
  },
];

function ExploreBtn({ label, targetId }: { label: string; targetId: string }) {
  return (
    <button
      onClick={() => scrollToId(targetId)}
      className="group self-start inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold transition-colors mt-auto pt-4"
    >
      {label}
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">
        →
      </span>
    </button>
  );
}

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
          dark ? "border border-gold/60 text-gold hover:bg-gold hover:text-navy-900" : "border-2 border-gold text-navy-900 hover:bg-gold shadow-sm"
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

export default function BabyHoodedTowelsContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[540px] md:min-h-[620px] flex items-end overflow-hidden bg-[#0D1B2A]">
        <Image
          src="/images/hero/hero-apparel.webp"
          alt="Pakistan baby hooded towels manufacturer — OEM organic cotton terry hooded bath towels for USA, UK and Europe"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Baby & Kids Apparel · OEM Manufacturing · Pakistan
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Baby Hooded Towels<br className="hidden sm:block" /> Manufacturer
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
              Soft terry and velour hooded bath towels for infants — animal hood designs, custom embroidery, GOTS certified organic cotton and OEKO-TEX Class 1. Newborn to kids 4 years. OEM bulk programmes for USA, UK, Europe and global baby brands.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/rfq/"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D4A017] text-[#0D1B2A] font-bold rounded-full hover:bg-[#b8891a] transition-colors"
              >
                Request a Quote
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <ExploreBtn label="View Specifications" targetId="bento-grid" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#0D1B2A] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "4", u: "Terry Constructions", s: "Loop to zero-twist" },
            { v: "6", u: "Size Groups", s: "Newborn to 4Y" },
            { v: "8", u: "Hood Designs", s: "Animal + custom" },
            { v: "OEKO-TEX", u: "Class 1 Certified", s: "Every component" },
          ].map((s) => (
            <div key={s.u}>
              <p className="text-3xl font-bold text-[#D4A017]">{s.v}</p>
              <p className="text-white font-semibold text-sm mt-0.5">{s.u}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-[#D4A017] transition-colors">Home</Link></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><Link href="/apparel/" className="hover:text-[#D4A017] transition-colors">Apparel</Link></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><Link href="/apparel/babyandkids/" className="hover:text-[#D4A017] transition-colors">Baby & Kids</Link></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li className="text-[#0D1B2A] font-medium">Baby Hooded Towels</li>
        </ol>
      </nav>

      {/* ══ BENTO GRID ══════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1: Constructions + Size Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧶</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Terry Constructions</p>
                  <h3 className="text-xl font-bold text-[#0D1B2A] mt-0.5">4 Fabric Options</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-xl p-3 border border-teal-100">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#0D1B2A]">{c.name}</p>
                      {c.tag && <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.tagColor}`}>{c.tag}</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn label="Explore Constructions" targetId="s1-constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-[#0D1B2A] mt-0.5">Age &amp; Size Guide</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {SIZE_GUIDE.map((a) => (
                  <div key={a.ageGroup} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#0D1B2A]">{a.ageGroup}</p>
                      <p className="text-xs text-gray-400">{a.towelSize}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap hidden sm:block">Hood {a.hoodDepth}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn label="Full Size Guide" targetId="s2-size" />
            </motion.div>
          </div>

          {/* Row 2: GSM Tiers + Hood Designs + Colours + OEM */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">⚖️</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">GSM Weight Guide</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.range}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-[#0D1B2A] truncate mr-1">{t.label}</span>
                      <span className="text-gray-400 whitespace-nowrap">{t.range} gsm</span>
                    </div>
                    <div className="h-1.5 bg-amber-100 rounded-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn label="Weight Details" targetId="s3-weight" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🐰</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Hood Designs</h3>
              <div className="flex flex-wrap gap-2 flex-1 content-start">
                {HOOD_DESIGNS.map((d) => (
                  <div key={d.animal} className="flex items-center gap-1.5 bg-white rounded-lg px-2 py-1 border border-orange-100">
                    <span className="text-sm">{d.icon}</span>
                    <span className="text-[10px] font-medium text-[#0D1B2A]">{d.animal}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn label="Hood Gallery" targetId="s4-decoration" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-pink-50 border border-pink-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🌈</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Colour Range</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-2 flex-1">
                {[
                  { name: "Natural White", hex: "#FAFAF7" },
                  { name: "Soft Pink", hex: "#FADADD" },
                  { name: "Sky Blue", hex: "#B8D4E8" },
                  { name: "Mint", hex: "#B8D8CC" },
                  { name: "Butter Yellow", hex: "#FFF3B0" },
                  { name: "Lavender", hex: "#D8CCE8" },
                  { name: "Sage", hex: "#B8C8B8" },
                  { name: "Warm Grey", hex: "#D0D0CC" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-200 shrink-0" style={{ backgroundColor: c.hex }} aria-label={c.name} />
                    <span className="text-[10px] text-gray-500">{c.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn label="Colour Options" targetId="s5-colours" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🏭</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">OEM Programme</h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {[
                  "Custom animal hood characters",
                  "Embroidery & appliqué on hood",
                  "GOTS organic cotton available",
                  "Gift box & ribbon packing",
                  "OEKO-TEX Class 1 all components",
                  "Newborn to 4 years size range",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-[#D4A017] mt-0.5 shrink-0">→</span>
                    <span className="text-xs font-medium text-[#0D1B2A] leading-tight">{f}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn label="OEM Details" targetId="s6-oem" />
            </motion.div>
          </div>

          {/* Row 3: Markets + Certifications + Export */}
          <div className="grid grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="col-span-5 lg:col-span-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🌍</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Export Markets</h3>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {MARKETS.map((m) => (
                  <div key={m.region} className="flex items-center gap-2">
                    <span className="text-sm shrink-0">{m.flag}</span>
                    <span className="text-xs font-medium text-[#0D1B2A] truncate">{m.region}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn label="Market Detail" targetId="s7-markets" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.07 }}
              className="col-span-5 lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🏅</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Certifications</h3>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${c.tier === "ESSENTIAL" ? "text-teal-700 bg-teal-100" : "text-gray-500 bg-gray-100"}`}>{c.name}</span>
                    {c.tier === "ESSENTIAL" && <span className="text-[10px] text-[#D4A017]">★</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn label="View Certifications" targetId="s8-certifications" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="col-span-5 lg:col-span-1 bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🚢</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Export Details</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_SPECS.slice(0, 4).map((s) => (
                  <div key={s.label}>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">{s.label.replace(" — New Development", "").replace(" — Repeat Order", " — Repeat")}</p>
                    <p className="text-xs font-semibold text-[#0D1B2A]">{s.value}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn label="Export Detail" targetId="s9-export" />
            </motion.div>
          </div>

          {/* Row 4: Sustainability + Process */}
          <div className="grid grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="col-span-3 lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🌱</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Sustainability &amp; Safety</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {SUSTAINABILITY.map((s) => (
                  <div key={s.title}>
                    <p className="text-xs font-semibold text-[#0D1B2A]">{s.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn label="Sustainability Detail" targetId="s10-sustainability" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-3 lg:col-span-1 bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">⚙️</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS.map((p) => (
                  <div key={p.n} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-200 text-sky-800 text-[10px] font-bold flex items-center justify-center shrink-0">{p.n}</span>
                    <span className="text-xs font-medium text-[#0D1B2A]">{p.title}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn label="Full Process" targetId="s11-process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ RESOURCES ════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Baby Hooded Towel Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Terry construction guide, GSM selection, OEKO-TEX Class 1 requirements and embroidery options for hooded towels.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Baby Textile Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, OEKO-TEX and GOTS requirements for baby linen and towel programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Hooded Towel Spec Sheets</p>
              <p className="text-xs text-gray-500 leading-relaxed">Baby hooded towel construction specs, GSM options and OEKO-TEX certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Baby Hooded Towels?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify GSM range, hood design, certifications and pack format. Factory match in 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* S1 — Constructions: Neumorphism + card layout */}
      <section id="s1-constructions" className="py-20 bg-[#F0F2F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Terry Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">4 Fabric Options — Soft to Ultra-Plush</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl">All constructions available in GOTS certified organic cotton or conventional combed cotton. OEKO-TEX Class 1 standard across all options.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#F0F2F5] rounded-2xl p-6 shadow-[5px_5px_15px_#d1d4d8,-5px_-5px_15px_#ffffff]"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-[#0D1B2A] text-lg">{c.name}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.tagColor}`}>{c.tag}</span>
                </div>
                <p className="text-[#D4A017] font-bold text-sm mb-2">{c.gsm}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {c.properties.map((p) => (
                    <span key={p} className="text-xs bg-white text-gray-600 px-3 py-1 rounded-full shadow-sm">{p}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S2 — Size Guide: Infographic UI + table */}
      <section id="s2-size" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Age / Size Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Towel & Hood Sizes by Age Group</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-2xl">Hood depth is proportioned to towel size. Custom hood depth adjustments available with buyer size specification.</p>
          </motion.div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0D1B2A] text-white text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">Age Group</th>
                  <th className="px-5 py-3 text-left">Towel Size</th>
                  <th className="px-5 py-3 text-left">Hood Size</th>
                  <th className="px-5 py-3 text-left">Hood Depth</th>
                  <th className="px-5 py-3 text-left">Baby Weight</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row, i) => (
                  <tr key={row.ageGroup} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-5 py-3 font-medium text-[#0D1B2A]">{row.ageGroup}</td>
                    <td className="px-5 py-3 text-[#D4A017] font-semibold">{row.towelSize}</td>
                    <td className="px-5 py-3 text-gray-600">{row.hoodSize}</td>
                    <td className="px-5 py-3 text-gray-600">{row.hoodDepth}</td>
                    <td className="px-5 py-3 text-gray-500">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S3 — GSM: Product Showcase UI — dark bg, feature cards */}
      <section id="s3-weight" className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">GSM / Weight</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Choosing the Right Weight</h2>
            <p className="text-gray-400 mt-3 text-sm max-w-xl mx-auto">From lightweight waffle for warm markets to ultra-plush velour for premium gift programmes.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GSM_TIERS.map((g, i) => (
              <motion.div
                key={g.range}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <p className="text-3xl font-black text-[#D4A017] mb-2">{g.range}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{g.label}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{g.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* S4 — Hood Designs + Decoration: Marketplace UI */}
      <section id="s4-decoration" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Hood Designs & Decoration</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Animal Hoods & Custom Embellishment</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-2xl">Standard library of 8 hood designs. Custom character development from buyer artwork. All embroidery OEKO-TEX Class 1.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {HOOD_DESIGNS.map((h, i) => (
              <motion.div
                key={h.animal}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-gray-50 rounded-2xl p-5 text-center hover:bg-[#D4A017]/10 hover:border-[#D4A017] border border-transparent transition-colors"
              >
                <span className="text-4xl mb-3 block">{h.icon}</span>
                <h3 className="font-bold text-[#0D1B2A] text-sm mb-1">{h.animal}</h3>
                <p className="text-gray-500 text-xs">{h.ears}</p>
                <p className="text-gray-400 text-xs mt-1">{h.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#0D1B2A] uppercase tracking-wider mb-3">Decoration Methods</p>
            {DECORATION.map((d, i) => (
              <motion.div
                key={d.method}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex flex-col sm:flex-row gap-4 p-5 bg-gray-50 rounded-2xl"
              >
                <div className="sm:w-48 shrink-0">
                  <h4 className="font-bold text-[#0D1B2A] text-sm">{d.method}</h4>
                  <p className="text-[#D4A017] text-xs mt-0.5">{d.placement}</p>
                </div>
                <p className="text-gray-600 text-sm">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S5 — Colours: Flat Design UI */}
      <section id="s5-colours" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Options</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Standard Palette & Custom Matching</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-xl">OEKO-TEX Class 1 reactive dyes. Towel body and hood can be produced in matching or contrasting colours. Pantone matching available.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "White / Ecru", hex: "#FAF8F4", note: "GOTS / institutional" },
              { name: "Soft Blush", hex: "#F9DCE0", note: "Classic pink" },
              { name: "Sky Blue", hex: "#B8D4E8", note: "Classic blue" },
              { name: "Mint", hex: "#C8E6C9", note: "Gender-neutral" },
              { name: "Butter", hex: "#FFF8DC", note: "Warm neutral" },
              { name: "Lavender", hex: "#D4C8E6", note: "UK / Europe" },
              { name: "Stone Grey", hex: "#C8C8C8", note: "Minimal / Nordic" },
              { name: "Sage", hex: "#B8D0B0", note: "Eco / natural" },
              { name: "Cream", hex: "#F5F0E0", note: "Undyed organic" },
              { name: "Charcoal", hex: "#606870", note: "Contemporary" },
              { name: "Dusty Rose", hex: "#E8C4C0", note: "Gift sets" },
              { name: "Custom Pantone", hex: "custom", note: "Brand colour" },
            ].map((col, i) => (
              <motion.div
                key={col.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-full aspect-square rounded-xl border border-gray-200 shadow-sm"
                  style={{ backgroundColor: col.hex === "custom" ? undefined : col.hex }}
                  aria-label={col.name}
                >
                  {col.hex === "custom" && <div className="w-full h-full rounded-xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200" />}
                </div>
                <p className="text-xs font-semibold text-[#0D1B2A] text-center leading-tight">{col.name}</p>
                <p className="text-xs text-gray-400 text-center">{col.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S6 — OEM: Typography-Driven UI */}
      <section id="s6-oem" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM Programme</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A] leading-tight">
              Full-Service Baby Towel<br />Development
            </h2>
            <div className="w-16 h-1 bg-[#D4A017] mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Custom Hood Silhouette", body: "Hood shape, ear design and embroidery motifs developed from buyer artwork. Pattern graded across all sizes. Proto sample for approval before bulk." },
              { title: "GOTS Organic Programmes", body: "Full GOTS chain-of-custody from certified farm through finished towel. Certificates issued per production order. Required for eco-retail and Scandinavian markets." },
              { title: "Gift Set Coordination", body: "Hooded towel matched with wash cloth and bib in same fabric batch for colour consistency. Gift box, tissue paper and ribbon-wrap packing to buyer specification." },
              { title: "Multi-Market Compliance", body: "OEKO-TEX Class 1 test reports for all components — terry yarn, dyes, embroidery thread and labels. Documentation prepared per target market requirements." },
              { title: "Ear Safety Engineering", body: "All ear constructions tested for pull strength and no choking-hazard components. Ear fill (where applicable) is OEKO-TEX certified polyester, not loose fibre." },
              { title: "Brand Labelling & Packaging", body: "Brand woven label, hang tag, care label and GOTS / OEKO-TEX certification tag applied per buyer specification. Retail barcode printing available." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex gap-5"
              >
                <div className="shrink-0 w-1 bg-[#D4A017] rounded-full mt-1" />
                <div>
                  <h3 className="font-bold text-[#0D1B2A] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S7 — Markets: Retail UI + region cards */}
      <section id="s7-markets" className="py-20 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Supplying Baby Brands in 35+ Countries</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MARKETS.map((m, i) => (
              <motion.div
                key={m.region}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{m.flag}</span>
                  <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{m.tier}</span>
                </div>
                <h3 className="font-bold text-[#0D1B2A] mb-1">{m.region}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{m.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S8 — Certifications: Modular UI dark bg */}
      <section id="s8-certifications" className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Certifications</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">7 Baby-Relevant Certifications Available</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-white">{cert.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 ${cert.tier === "ESSENTIAL" ? "bg-[#D4A017] text-[#0D1B2A]" : cert.tier === "STANDARD" ? "bg-white/20 text-white" : "bg-yellow-900/40 text-yellow-300"}`}>
                    {cert.tier}
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{cert.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* S9 — Export: Industrial UI + spec list */}
      <section id="s9-export" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export & Logistics</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Lead Times & Shipping Specifications</h2>
          </motion.div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {EXPORT_SPECS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 px-6 py-4 ${i !== 0 ? "border-t border-gray-100" : ""}`}
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider sm:w-56 shrink-0">{s.label}</p>
                <p className="font-semibold text-[#0D1B2A]">{s.value}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S10 — Sustainability: Dashboard UI */}
      <section id="s10-sustainability" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Safe at Every Fibre</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-xl">OEKO-TEX Class 1 applies to every component — not just the terry fabric. Hood, ears, embroidery thread, labels and all finishing chemicals are included in certification scope.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUSTAINABILITY.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
              >
                <h3 className="font-bold text-[#0D1B2A] mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4A017] shrink-0" />
                  {s.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S11 — Process: Hero-Centered UI + large type steps */}
      <section id="s11-process" className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Production Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">How We Build Your Programme</h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">From yarn certification to gift-wrapped shipment — a documented 6-stage workflow for every baby hooded towel order.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <div className="text-[80px] font-black text-white/[0.04] leading-none absolute -top-3 -left-2 select-none">{p.n}</div>
                <div className="relative z-10 pt-6 pl-2">
                  <div className="w-10 h-10 rounded-full bg-[#D4A017] flex items-center justify-center text-[#0D1B2A] font-bold text-sm mb-3">
                    {p.n}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">FAQ</p>
            <h2 className="text-3xl font-bold text-[#0D1B2A]">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 bg-gray-50 rounded-2xl text-left hover:bg-gray-100 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-[#0D1B2A] text-sm">{faq.q}</span>
                  <svg className={`w-5 h-5 text-[#D4A017] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 py-4 text-gray-600 text-sm leading-relaxed bg-white border border-gray-100 rounded-b-2xl -mt-1">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SAME-TIER PAGES ══════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Baby &amp; Kids Apparel</p>
            <h2 className="text-2xl font-bold text-navy-900">More Baby &amp; Kids Products</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "T-Shirts for Kids", desc: "Combed cotton jersey for infants and children. Screen print, appliqué and embroidery programmes.", href: "/apparel/babyandkids/tshirtsforkids/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan kids t-shirt manufacturer — OEM combed cotton children's apparel for baby boutiques worldwide" },
              { name: "Swaddle Muslin Fabric", desc: "Single muslin, double gauze and bamboo blends. GOTS and OEKO-TEX Class 1 certified.", href: "/apparel/babyandkids/swaddlemuslinfabric/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan swaddle muslin manufacturer — OEM organic cotton muslin fabric for baby brands worldwide" },
              { name: "Overalls", desc: "Infant denim, canvas and corduroy overalls with snap hardware and OEKO-TEX compliance.", href: "/apparel/babyandkids/overalls/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby overalls manufacturer — OEM infant denim and canvas overalls for kids brands worldwide" },
              { name: "Baby Rompers", desc: "Short and long-sleeve rompers in organic cotton jersey. Snap crotch and envelope neck options.", href: "/apparel/babyandkids/babyrompers/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby romper manufacturer — OEM organic cotton infant rompers for baby boutiques worldwide" },
              { name: "Baby Bibs", desc: "Terry, velour and silicone bib constructions for newborn to toddler programmes.", href: "/apparel/babyandkids/babybibs/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby bib manufacturer — OEM terry and silicone bibs for infant product brands worldwide" },
            ].filter(p => !p.href.includes("babyhoodedtowels")).map((p) => (
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

      {/* Final CTA */}
      <section className="py-20 bg-[#0D1B2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Source Baby Hooded Towels</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              Ready to Source OEM Baby<br className="hidden sm:block" /> Hooded Towels from Pakistan?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Share your hood design, GSM range, target market certifications and pack format. We will respond with factory certifications and indicative timelines within one business day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/rfq/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4A017] text-[#0D1B2A] font-bold rounded-full text-lg hover:bg-[#b8891a] transition-colors"
              >
                Request a Quote
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
