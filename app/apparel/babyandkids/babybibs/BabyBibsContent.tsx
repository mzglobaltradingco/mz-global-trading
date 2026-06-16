"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BIB_TYPES = [
  {
    type: "Drool / Dribble Bib",
    tag: "TOP SELLER",
    tagColor: "bg-blue-100 text-blue-800",
    fabric: "Terry cotton or interlock",
    gsm: "300–450 gsm (terry) / 160–200 gsm (interlock)",
    backing: "TPU waterproof backing standard",
    desc: "The highest-volume category globally. Large absorbent face panel, waterproof TPU backing to protect clothing. Round or contoured neck fit. Snap or Velcro closure.",
    sizes: "Newborn 23×23 cm · Standard 26×26 cm · Large 30×30 cm",
  },
  {
    type: "Bandana Bib",
    tag: "FASHION TIER",
    tagColor: "bg-pink-100 text-pink-800",
    fabric: "Jersey knit face + fleece or interlock back",
    gsm: "160–200 gsm face / 180–220 gsm back",
    backing: "Fleece or interlock (non-waterproof)",
    desc: "Triangle/diamond silhouette, worn like a bandana scarf. Popular for its fashion appeal and multi-functional drool absorption. Snap or Velcro at nape of neck.",
    sizes: "Standard 25×35 cm · Large 28×40 cm",
  },
  {
    type: "Feeding / Smock Bib",
    tag: "FUNCTIONAL",
    tagColor: "bg-green-100 text-green-800",
    fabric: "Cotton canvas or waterproof nylon",
    gsm: "180–300 gsm",
    backing: "Waterproof coated or uncoated",
    desc: "Full chest-coverage bib for solid food feeding. Pocket at bottom catches falling food. Tie-around or snap/Velcro at neckline. Available in long-sleeve smock version.",
    sizes: "Standard 30×38 cm · Long-sleeve smock · Custom",
  },
  {
    type: "Muslin Bib",
    tag: "GOTS ORGANIC",
    tagColor: "bg-emerald-100 text-emerald-800",
    fabric: "Single layer muslin or double gauze",
    gsm: "90–130 gsm",
    backing: "Unlined (ultra-breathable)",
    desc: "Ultra-soft and breathable. Softens with every wash. Perfect for sensitive newborn skin. Available in GOTS organic cotton double gauze for eco and premium programmes.",
    sizes: "Standard 25×30 cm · Bandana 25×35 cm",
  },
  {
    type: "Silicone Bib",
    tag: "EASY CLEAN",
    tagColor: "bg-gray-100 text-gray-700",
    fabric: "Food-grade silicone (BPA-free)",
    gsm: "N/A — moulded",
    backing: "Rigid scoop pocket",
    desc: "Moulded food-grade BPA-free silicone. Wipe-clean surface. Deep catchall pocket. Popular for solid-food weaning stage. Adjustable snap neck closure. Custom colours.",
    sizes: "Standard scoop size · Custom",
  },
];

const SIZE_GUIDE = [
  { ageGroup: "Newborn 0–3M", neckCirc: "28–31 cm", bibSize: "23×23 cm", bibType: "Round drool, muslin" },
  { ageGroup: "3–6 Months", neckCirc: "31–33 cm", bibSize: "26×26 cm", bibType: "Standard drool, bandana" },
  { ageGroup: "6–9 Months", neckCirc: "33–35 cm", bibSize: "26×26 cm", bibType: "Standard drool, bandana" },
  { ageGroup: "9–12 Months", neckCirc: "35–37 cm", bibSize: "30×30 cm", bibType: "Large drool, feeding bib" },
  { ageGroup: "12–18 Months", neckCirc: "37–39 cm", bibSize: "30×30 cm", bibType: "Large drool, smock" },
  { ageGroup: "18–24 Months", neckCirc: "39–41 cm", bibSize: "30×38 cm", bibType: "Feeding smock, large bandana" },
  { ageGroup: "Toddler 2–3Y", neckCirc: "41–43 cm", bibSize: "Custom", bibType: "Smock, arts & crafts bib" },
];

const WEIGHT_OPTIONS = [
  { label: "Muslin / Double Gauze", gsm: "90–130 gsm", note: "Ultra-breathable, newborn skin-safe", best: "Newborn programmes, hot climates, gift sets" },
  { label: "Jersey / Interlock", gsm: "160–200 gsm", note: "Soft, stretchy, bandana and drool bibs", best: "Bandana bibs, everyday drool bibs" },
  { label: "Light Terry", gsm: "250–350 gsm", note: "Good absorbency, soft face", best: "Standard drool bibs, basic programmes" },
  { label: "Heavy Terry", gsm: "380–450 gsm", note: "Maximum absorbency, hotel/institutional", best: "Premium drool bibs, teething bibs, USA market" },
];

const DECORATION = [
  { method: "Screen Print (Water-Based)", icon: "🖨️", note: "Azo-free inks, OEKO-TEX Class 1 tested. Front face panel." },
  { method: "Embroidery", icon: "🧵", note: "Raised logo on bandana or drool bib. Pre-washed thread." },
  { method: "Heat Transfer", icon: "🎨", note: "Photographic designs. OEKO-TEX Class 1 tested adhesive." },
  { method: "Woven Label / Patch", icon: "🏷️", note: "Branded label woven into bib panel or strap." },
  { method: "Yarn-Dyed Pattern", icon: "🌈", note: "Stripe or check woven into fabric — no surface ink." },
  { method: "No Decoration", icon: "⬜", note: "Plain colour or natural undyed for basic programmes." },
];

const COLOUR_PALETTE = [
  { name: "Natural Undyed", hex: "#F5F0E6", market: "Eco / GOTS programmes" },
  { name: "Soft White", hex: "#FAFAFA", market: "Institutional / hospital" },
  { name: "Baby Pink", hex: "#FADADD", market: "Global — classic" },
  { name: "Sky Blue", hex: "#B8D4E8", market: "Global — classic" },
  { name: "Butter Yellow", hex: "#FFF3B0", market: "Gender-neutral" },
  { name: "Sage Green", hex: "#B8D8B0", market: "Nordic / eco brands" },
  { name: "Lilac", hex: "#D8CCE8", market: "UK / Europe" },
  { name: "Grey Marl", hex: "#C0C4C8", market: "Modern minimal" },
  { name: "Custom Pantone", hex: "custom", market: "Brand colour match" },
];

const OEM_FEATURES = [
  { title: "Closure Options", body: "Velcro (soft-loop, baby-safe), nickel-free KAM snap, tie-around. Each tested for pull strength and snap detachment resistance per EN 71-1 / CPSC requirements." },
  { title: "Waterproof Backing", body: "TPU (thermoplastic polyurethane) backing is BPA-free, phthalate-free, and OEKO-TEX Class 1 tested. Heat-bonded to face fabric — no separation under repeated washing." },
  { title: "Pocket Construction", body: "Feeding bib scoop pockets are sewn from the same waterproof fabric. Pocket opening maintained by a rigid stiffener insert or fabric stay-stitching." },
  { title: "Label Placement", body: "Care labels placed on strap or nape area — never against skin. All label inks are OEKO-TEX Class 1 tested. Buyer brand label in woven or heat-transfer format." },
  { title: "Pack Formats", body: "Single polybag, 3-pack header card, 5-pack header card, gift box set. Retail-ready UPC labelling and barcode printing available per buyer spec." },
  { title: "Custom Silhouette", body: "Bib shape (round, bandana, contoured) developed from buyer artwork. Neck opening adjusted to buyer size chart. Sample approval before bulk commitment." },
];

const MARKETS = [
  { flag: "🇺🇸", region: "USA", note: "CPSC / ASTM F963-23 — snap detachment, flammability" },
  { flag: "🇬🇧", region: "UK", note: "BS EN 14682 — cord and strap safety" },
  { flag: "🇩🇪", region: "Germany", note: "REACH SVHC + Bluesign eco demand" },
  { flag: "🇸🇪", region: "Scandinavia", note: "GOTS organic mandatory for premium tier" },
  { flag: "🇦🇺", region: "Australia", note: "ACCC product safety — snap strength" },
  { flag: "🇫🇷", region: "France", note: "REACH + NF standard infant safety" },
  { flag: "🇯🇵", region: "Japan", note: "Kanemaku quality standard, Oeko-Tex preferred" },
  { flag: "🇦🇪", region: "GCC / Middle East", note: "Gift-set formats, white and pastel palette" },
];

const CERTIFICATIONS = [
  { name: "OEKO-TEX Class 1", note: "Strictest tier — tests 100+ substances at infant-mouthing exposure limits. Mandatory for EU baby product listings.", tier: "ESSENTIAL" },
  { name: "GOTS", note: "Full organic chain-of-custody from certified cotton farm to finished bib. Required for eco-retail programmes.", tier: "ESSENTIAL" },
  { name: "BSCI", note: "European buyer social compliance requirement.", tier: "STANDARD" },
  { name: "Sedex / SMETA", note: "Ethical audit transparency for UK and global brands.", tier: "STANDARD" },
  { name: "ISO 9001", note: "Factory-level quality management documentation.", tier: "STANDARD" },
  { name: "WRAP", note: "12-principle humanitarian production standard, US market.", tier: "STANDARD" },
  { name: "BCI", note: "Better Cotton Initiative — verified conventional cotton improvement.", tier: "OPTIONAL" },
];

const EXPORT_SPECS = [
  { label: "Lead Time (New)", value: "60–75 days" },
  { label: "Lead Time (Repeat)", value: "40–50 days" },
  { label: "Sample Time", value: "10–12 days" },
  { label: "Incoterms", value: "FOB, CIF, CFR, EXW" },
  { label: "Packing", value: "Single poly · 3-pack header · 5-pack header · Gift box" },
  { label: "Port", value: "Port Qasim · Karachi" },
];

const SUSTAINABILITY = [
  { icon: "🌱", title: "GOTS Organic Cotton", body: "Certified farm to finished bib. No GMO, no synthetic pesticides. Full chain-of-custody documentation." },
  { icon: "🔬", title: "OEKO-TEX Class 1 Chemistry", body: "All face and backing fabrics, inks, dyes and adhesives tested at infant-mouthing exposure limits." },
  { icon: "🚫", title: "BPA-Free TPU Backing", body: "All waterproof liners are phthalate-free, BPA-free and OEKO-TEX Class 1 certified. No PVC vinyl." },
  { icon: "🧵", title: "Pre-Washed Thread", body: "All embroidery and sewing threads pre-washed and tested for heavy metal dyes — no colour bleeding on newborn skin." },
  { icon: "♻️", title: "Recycled Packaging", body: "Inner poly bags available in 30% recycled polyethylene. Header cards printed on FSC-certified board." },
  { icon: "💧", title: "Low-Impact Dyeing", body: "OEKO-TEX-approved reactive dyes with closed-loop water treatment in partner mills." },
];

const PROCESS = [
  { n: 1, title: "Material Selection", body: "Face fabric, backing material and closure hardware selected per buyer brief and target market chemical requirements." },
  { n: 2, title: "Closure Safety Test", body: "Snap detachment resistance and Velcro peel strength tested to EN 71-1 / CPSC limits before sampling." },
  { n: 3, title: "Proto Sample", body: "Bib silhouette, neck opening and closure placement confirmed on pre-production sample before bulk cut." },
  { n: 4, title: "Chemistry Signoff", body: "All dyes, inks and TPU backing batch-tested to OEKO-TEX Class 1 limits before bulk production." },
  { n: 5, title: "Bulk Production", body: "In-line inspection at 30% and 70% completion. TPU bonding integrity, snap strength and absorbency tested per lot." },
  { n: 6, title: "Final Audit & Pack", body: "100% closure check. Packed to buyer spec — single poly, multi-pack or gift box. Pre-shipment inspection available." },
];

const FAQS = [
  {
    q: "What backing material do you use for waterproof bibs?",
    a: "Standard is TPU (thermoplastic polyurethane) — BPA-free, phthalate-free, and OEKO-TEX Class 1 certified. TPU is heat-bonded to the face fabric without adhesive chemicals. It withstands 60°C machine washing without delamination. PVC vinyl backing is available on request but not recommended — most European and North American retailers now require PVC-free alternatives.",
  },
  {
    q: "Velcro or snap closure — which do you recommend?",
    a: "Both are standard. Velcro (hook-and-loop) is easier for carers to use with one hand but can pick up lint and loses grip after 40–50 washes. KAM-style resin snaps are more durable (100+ cycles) and are preferred for programmes targeting USA market where snap detachment testing (CPSC) is required. We recommend snaps for drool bibs and Velcro for quick-release feeding bibs. Mixed options available within the same programme.",
  },
  {
    q: "Can I order both drool bibs and bandana bibs in the same production run?",
    a: "Yes. Multi-style programmes are common — typically branded baby gift sets containing one bandana bib and one drool bib. We can batch both styles in the same production run if fabrics and closures align. Lead time is based on the longest style in the programme.",
  },
  {
    q: "What is the minimum neck opening clearance for safety compliance?",
    a: "Per EN 14682 (UK/EU) and equivalent CPSC guidance, neck openings must be either fully closed (no loop > 150mm) or fully open (> 360mm circumference). Our standard bibs use adjustable snap or Velcro closures that meet both EU and US requirements. Fixed tie-around closures are not recommended for retail sale and are only produced for institutional/restaurant programmes.",
  },
  {
    q: "Do you produce silicone bibs?",
    a: "Yes — food-grade BPA-free silicone bibs with rigid catchall scoop pockets. Silicone bibs are custom-moulded and have longer development tooling lead times (30–40 days for tooling + 45–55 days production). Available in solid colours and two-tone. All silicone compounds comply with FDA 21 CFR 177.2600 and EU Regulation 10/2011 for food contact materials.",
  },
];

function ExploreBtn({ label, targetId }: { label: string; targetId: string }) {
  return (
    <button
      onClick={() => {
        const el = document.getElementById(targetId);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 160, behavior: "smooth" });
      }}
      className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4A017] text-[#0D1B2A] font-semibold rounded-full hover:bg-[#b8891a] transition-colors"
    >
      {label}
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

function BackToTop({ dark }: { dark?: boolean }) {
  return (
    <div className="flex justify-center pt-6">
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-11 h-11 rounded-full bg-[#D4A017] text-[#0D1B2A] flex items-center justify-center shadow-md hover:bg-[#b8891a] transition-colors"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </div>
  );
}

export default function BabyBibsContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[540px] md:min-h-[620px] flex items-end overflow-hidden bg-[#0D1B2A]">
        <Image
          src="/images/menu/menu-babybibs.webp"
          alt="Pakistan baby bibs manufacturer — OEM terry and muslin drool bibs with waterproof backing for USA, UK and Europe"
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
              Baby Bibs<br className="hidden sm:block" /> Manufacturer
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
              Drool bibs, bandana bibs and feeding smocks in GOTS organic cotton and OEKO-TEX Class 1 certified terry and muslin. TPU waterproof backing, snap or Velcro closures. Bulk OEM programmes for USA, UK, Europe and global baby brands.
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
            { v: "5", u: "Bib Types", s: "Drool to silicone" },
            { v: "7", u: "Age Groups", s: "Newborn to 3Y" },
            { v: "OEKO-TEX", u: "Class 1 Certified", s: "Infant mouthing standard" },
            { v: "35+", u: "Export Markets", s: "Global supply" },
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
          <li className="text-[#0D1B2A] font-medium">Baby Bibs</li>
        </ol>
      </nav>

      {/* Bento Grid */}
      <section id="bento-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#0D1B2A] rounded-2xl p-8 text-white"
          >
            <p className="text-[#D4A017] text-xs font-semibold tracking-widest uppercase mb-2">What We Produce</p>
            <h2 className="text-2xl font-bold mb-4">OEM Baby Bibs — 5 Types, Full Range</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Drool bibs, bandana bibs, feeding smocks, muslin bibs and silicone bibs produced for international baby brands. GOTS certified organic cotton and OEKO-TEX Class 1 certified terry and interlock. BPA-free TPU waterproof backing, baby-safe closures and water-based decoration methods throughout.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-yellow-50 rounded-2xl p-8"
          >
            <p className="text-yellow-700 text-xs font-semibold tracking-widest uppercase mb-2">Key Construction Features</p>
            <h2 className="text-2xl font-bold text-[#0D1B2A] mb-4">Safety-First Build Details</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                "TPU waterproof backing — BPA-free, OEKO-TEX Class 1",
                "Nickel-free snap or soft-loop Velcro closure",
                "Flat overlock seams — no rubbing on neck skin",
                "Absorbent terry face — up to 450 gsm available",
                "Adjustable neck closure — 2-position snap option",
                "Scoop pocket on feeding bibs — waterproof material",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Backing", value: "TPU Waterproof", sub: "BPA-free, OEKO-TEX Class 1", icon: "💧" },
            { label: "Closure", value: "Snap or Velcro", sub: "EN 71-1 / CPSC tested", icon: "🔘" },
            { label: "Absorbency", value: "Up to 450 gsm", sub: "Heavy terry option", icon: "🧽" },
            { label: "Safety", value: "Class 1 Certified", sub: "Mouthing-safe chemistries", icon: "✅" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{item.label}</p>
              <p className="font-bold text-[#0D1B2A] text-sm">{item.value}</p>
              <p className="text-gray-400 text-xs mt-1">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2 bg-blue-50 rounded-2xl p-7">
            <p className="text-blue-700 text-xs font-semibold tracking-widest uppercase mb-2">Bib Types</p>
            <h3 className="text-xl font-bold text-[#0D1B2A] mb-3">5 Silhouettes Available</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Drool, bandana, feeding smock, muslin and silicone. Custom silhouette development from buyer artwork.
            </p>
            <ExploreBtn label="View All Types" targetId="s1-constructions" />
          </div>
          <div className="md:col-span-2 bg-emerald-50 rounded-2xl p-7">
            <p className="text-emerald-700 text-xs font-semibold tracking-widest uppercase mb-2">Certifications</p>
            <h3 className="text-xl font-bold text-[#0D1B2A] mb-3">GOTS · OEKO-TEX Class 1 · 5 more</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              7 baby-relevant certifications available. All bibs produced at OEKO-TEX Class 1 certified mills as standard.
            </p>
            <ExploreBtn label="Certifications" targetId="s8-certifications" />
          </div>
          <div className="md:col-span-1 bg-[#0D1B2A] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <p className="text-[#D4A017] text-4xl font-bold">50+</p>
            <p className="text-white text-sm font-semibold mt-1">Partner Factories</p>
            <p className="text-gray-400 text-xs mt-2">Pakistan certified</p>
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-[#D4A017]/10 rounded-2xl p-7">
            <p className="text-[#D4A017] text-xs font-semibold tracking-widest uppercase mb-2">Sustainability</p>
            <h3 className="text-xl font-bold text-[#0D1B2A] mb-3">BPA-Free · No PVC · Organic Options</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              All waterproof backings are TPU, not PVC. All dyes and inks OEKO-TEX Class 1 tested at infant-mouthing limits. GOTS organic cotton programmes available for eco and Scandinavian market buyers.
            </p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <p className="text-[#D4A017] text-xs font-semibold tracking-widest uppercase mb-1">Start Your Order</p>
              <p className="text-white text-lg font-bold leading-snug mb-3">Request OEM baby bib samples</p>
            </div>
            <Link
              href="/rfq/"
              className="block text-center py-3 px-4 bg-[#D4A017] text-[#0D1B2A] font-bold rounded-xl hover:bg-[#b8891a] transition-colors text-sm"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Resources row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Baby Rompers", href: "/apparel/babyandkids/babyrompers/", icon: "👶" },
            { label: "Swaddle Muslin", href: "/apparel/babyandkids/swaddlemuslinfabric/", icon: "🌿" },
            { label: "Baby Hooded Towels", href: "/apparel/babyandkids/babyhoodedtowels/", icon: "🏊" },
            { label: "T-Shirts for Kids", href: "/apparel/babyandkids/tshirtsforkids/", icon: "👕" },
          ].map((r) => (
            <Link key={r.href} href={r.href} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-[#D4A017]/10 transition-colors text-sm font-medium text-[#0D1B2A]">
              <span>{r.icon}</span>{r.label}
            </Link>
          ))}
        </div>
      </section>

      {/* S1 — Bib Types: Editorial UI */}
      <section id="s1-constructions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Bib Types</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">5 Bib Styles — Full OEM Range</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-sm">All types produced in OEKO-TEX Class 1 certified fabrics. GOTS organic cotton available across all styles.</p>
          </motion.div>
          <div className="space-y-5">
            {BIB_TYPES.map((b, i) => (
              <motion.div
                key={b.type}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-5 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="md:col-span-1">
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${b.tagColor}`}>{b.tag}</span>
                  <h3 className="font-bold text-[#0D1B2A] text-lg">{b.type}</h3>
                  <p className="text-xs text-gray-500 mt-1">{b.fabric}</p>
                  <p className="text-[#D4A017] font-semibold text-xs mt-1">{b.gsm}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
                <div className="md:col-span-1 space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Backing</p>
                    <p className="text-xs text-gray-600">{b.backing}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Standard Sizes</p>
                    <p className="text-xs text-gray-600">{b.sizes}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center"><BackToTop /></div>
        </div>
      </section>

      {/* S2 — Size Guide: Flat Design UI + Table */}
      <section id="s2-size" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Age / Size Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Bib Sizing by Age & Neck Circumference</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-2xl">Standard neck opening accommodates the listed circumference range. Adjustable snap closure adds 2–3 cm fit range per position.</p>
          </motion.div>
          <div className="bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0D1B2A] text-white text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">Age Group</th>
                  <th className="px-5 py-3 text-left">Neck Circumference</th>
                  <th className="px-5 py-3 text-left">Bib Size</th>
                  <th className="px-5 py-3 text-left">Best Bib Type</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row, i) => (
                  <tr key={row.ageGroup} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-blue-50/40"}`}>
                    <td className="px-5 py-3 font-medium text-[#0D1B2A]">{row.ageGroup}</td>
                    <td className="px-5 py-3 text-gray-600">{row.neckCirc}</td>
                    <td className="px-5 py-3 text-[#D4A017] font-semibold">{row.bibSize}</td>
                    <td className="px-5 py-3 text-gray-600">{row.bibType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-xs mt-4">Custom bib sizes developed from buyer artwork. Size specification sheet required for custom programmes.</p>
          <div className="mt-8 text-center"><BackToTop /></div>
        </div>
      </section>

      {/* S3 — Weight Options: Card-Based UI */}
      <section id="s3-weight" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fabric Weight</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Weight Options — Absorbency vs Softness</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WEIGHT_OPTIONS.map((w, i) => (
              <motion.div
                key={w.label}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#D4A017] transition-all"
              >
                <p className="text-2xl font-bold text-[#D4A017] mb-1">{w.gsm}</p>
                <h3 className="font-bold text-[#0D1B2A] mb-2 text-sm">{w.label}</h3>
                <p className="text-gray-500 text-xs mb-3">{w.note}</p>
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Best for</p>
                  <p className="text-xs text-gray-600">{w.best}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center"><BackToTop /></div>
        </div>
      </section>

      {/* S4 — Decoration: Scandinavian UI + minimal list */}
      <section id="s4-decoration" className="py-20 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Decoration</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Baby-Safe Print & Embellishment Methods</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-xl">All inks, adhesives and embroidery threads tested to OEKO-TEX Class 1 limits. No PVC plastisol, no solvent inks.</p>
          </motion.div>
          <div className="max-w-3xl space-y-4">
            {DECORATION.map((d, i) => (
              <motion.div
                key={d.method}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100"
              >
                <span className="text-2xl shrink-0">{d.icon}</span>
                <div>
                  <h3 className="font-bold text-[#0D1B2A] text-sm">{d.method}</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{d.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center"><BackToTop /></div>
        </div>
      </section>

      {/* S5 — Colours: Moodboard UI + swatch tile */}
      <section id="s5-colours" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Palette</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Soft Hues for Every Baby Programme</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-xl">OEKO-TEX Class 1 certified azo-free reactive dyes. Custom Pantone matching available.</p>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-9 gap-4">
            {COLOUR_PALETTE.map((col, i) => (
              <motion.div
                key={col.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-full aspect-square rounded-xl border border-gray-100 shadow-sm"
                  style={{ backgroundColor: col.hex === "custom" ? undefined : col.hex }}
                  aria-label={col.name}
                >
                  {col.hex === "custom" && <div className="w-full h-full rounded-xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200" />}
                </div>
                <p className="text-xs font-semibold text-[#0D1B2A] text-center leading-tight">{col.name}</p>
                <p className="text-xs text-gray-400 text-center leading-tight hidden sm:block">{col.market}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center"><BackToTop /></div>
        </div>
      </section>

      {/* S6 — OEM: Isometric-style card grid (dark bg) */}
      <section id="s6-oem" className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Custom Development — Full Service</h2>
            <p className="text-gray-400 mt-3 text-sm max-w-xl">From closure safety testing to custom silhouette development — every OEM detail managed in-programme.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OEM_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <h3 className="font-bold text-[#D4A017] mb-2">{f.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center"><BackToTop dark /></div>
        </div>
      </section>

      {/* S7 — Markets: Grid UI + table */}
      <section id="s7-markets" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Regulatory Compliance by Market</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-2xl">Baby product regulations vary significantly by market. Our compliance team tracks requirements for all active export destinations.</p>
          </motion.div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0D1B2A] text-white text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 text-left w-12" />
                  <th className="px-5 py-3 text-left">Market</th>
                  <th className="px-5 py-3 text-left">Primary Regulatory Requirement</th>
                </tr>
              </thead>
              <tbody>
                {MARKETS.map((m, i) => (
                  <tr key={m.region} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-5 py-3 text-xl">{m.flag}</td>
                    <td className="px-5 py-3 font-semibold text-[#0D1B2A]">{m.region}</td>
                    <td className="px-5 py-3 text-gray-600">{m.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center"><BackToTop /></div>
        </div>
      </section>

      {/* S8 — Certifications: Glassmorphism + badge grid */}
      <section id="s8-certifications" className="py-20 bg-gradient-to-br from-[#e8f5e9] via-[#e3f2fd] to-[#f3e5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality & Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">7 Baby-Relevant Certifications</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="backdrop-blur-sm bg-white/70 border border-white/60 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-[#0D1B2A]">{cert.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 ${cert.tier === "ESSENTIAL" ? "bg-[#0D1B2A] text-white" : cert.tier === "STANDARD" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {cert.tier}
                  </span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{cert.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center"><BackToTop /></div>
        </div>
      </section>

      {/* S9 — Export: Corporate UI + 2-col grid */}
      <section id="s9-export" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export & Logistics</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Lead Times & Packing</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPORT_SPECS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <p className="text-xs font-semibold text-[#D4A017] uppercase tracking-wider mb-2">{s.label}</p>
                <p className="font-bold text-[#0D1B2A] text-lg">{s.value}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center"><BackToTop /></div>
        </div>
      </section>

      {/* S10 — Sustainability: Data Visualization UI */}
      <section id="s10-sustainability" className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Mouthing-Safe from Farm to Shelf</h2>
            <p className="text-gray-400 mt-3 text-sm max-w-xl">OEKO-TEX Class 1 treats infants as the most vulnerable consumer group — assuming fabric and accessories will be mouthed. Every material in our bib programmes is tested to that standard.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUSTAINABILITY.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <span className="text-3xl shrink-0">{s.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center"><BackToTop dark /></div>
        </div>
      </section>

      {/* S11 — Process: Swiss Design UI + numbered rules */}
      <section id="s11-process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Production Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">6-Stage Safety-Validated Workflow</h2>
            <div className="w-16 h-1 bg-[#D4A017] mt-4 rounded-full" />
          </motion.div>
          <div className="space-y-6 max-w-4xl">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex gap-8 items-start border-b border-gray-100 pb-6 last:border-0 last:pb-0"
              >
                <div className="shrink-0 text-right w-8">
                  <span className="text-2xl font-black text-gray-200">{String(p.n).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#0D1B2A] text-lg mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center"><BackToTop /></div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
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
                  className="w-full flex items-center justify-between gap-4 p-5 bg-white rounded-2xl text-left hover:bg-gray-100 transition-colors border border-gray-100"
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
                      <div className="px-5 py-4 text-gray-600 text-sm leading-relaxed bg-white border border-t-0 border-gray-100 rounded-b-2xl">
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

      {/* Final CTA */}
      <section className="py-20 bg-[#0D1B2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Source Baby Bibs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              Ready to Source OEM<br className="hidden sm:block" /> Baby Bibs from Pakistan?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Share your bib type, target market certifications, closure preference and pack format. We will respond with factory certifications and indicative pricing within one business day.
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
