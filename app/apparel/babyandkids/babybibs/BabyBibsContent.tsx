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
          dark ? "border border-gold/60 text-gold hover:bg-gold hover:text-navy-900" : "border-2 border-gold text-navy-900 hover:bg-gold shadow-xs"
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

export default function BabyBibsContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
            {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-baby-bibs.webp" fill alt="Pakistan baby bibs manufacturer — OEM terry and muslin drool bibs with waterproof backing for USA, UK and Europe" className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-2xl">
            <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/apparel/babyandkids/" className="hover:text-gold transition-colors">Baby &amp; Kids</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Baby Bibs</span>
            </motion.nav>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Baby &amp; Kids Apparel</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Baby &amp; Kids
              <br /><span className="text-gold">Bibs</span>
              <br />Manufacturer Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
              Drool bibs, bandana bibs and feeding smocks in GOTS organic cotton and OEKO-TEX Class 1 certified terry and muslin. TPU waterproof backing, snap or Velcro closures. Bulk OEM programmes for USA, UK, Europe and global baby brands.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote <span aria-hidden="true">&#x2192;</span></Link>
              <button onClick={() => scrollToId("bento-grid")} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">Explore Product Guide</button>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
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
              <p className="text-gray-500 text-xs mt-0.5">{s.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ BENTO GRID ══════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Explore All Aspects</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1: Bib Types + Size Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-yellow-50 border border-yellow-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🍼</span>
                <div>
                  <p className="text-yellow-600 text-xs font-semibold tracking-[0.2em] uppercase">Bib Types</p>
                  <h3 className="text-xl font-bold text-[#0D1B2A] mt-0.5">5 Bib Silhouettes</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {BIB_TYPES.map((b) => (
                  <div key={b.type} className="bg-white rounded-xl p-3 border border-yellow-100">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#0D1B2A]">{b.type}</p>
                      {b.tag && <span className="shrink-0 text-[10px] font-semibold text-[#D4A017] bg-[#D4A017]/10 px-2 py-0.5 rounded-full">{b.tag}</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{b.gsm}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn label="Explore Bib Types" targetId="s1-constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📏</span>
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
                      <p className="text-xs text-gray-500 truncate">{a.bibType}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap hidden sm:block">{a.bibSize}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn label="Full Size Guide" targetId="s2-size" />
            </motion.div>
          </div>

          {/* Row 2: Weight + Decoration + Colours + OEM */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">⚖️</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Weight Guide</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {WEIGHT_OPTIONS.map((t) => (
                  <div key={t.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-[#0D1B2A] truncate mr-1">{t.label}</span>
                      <span className="text-gray-500 whitespace-nowrap">{t.gsm}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn label="Weight Details" targetId="s3-weight" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🎨</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Decoration Methods</h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {DECORATION.map((d) => (
                  <div key={d.method} className="flex items-start gap-2">
                    <span className="text-base shrink-0 mt-0.5">{d.icon}</span>
                    <span className="text-xs font-medium text-[#0D1B2A] leading-tight">{d.method}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn label="Decoration Guide" targetId="s4-decoration" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-pink-50 border border-pink-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🌈</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Colour Options</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-2 flex-1">
                {COLOUR_PALETTE.map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-gray-200 shrink-0"
                      style={{ backgroundColor: c.hex !== "custom" ? c.hex : undefined }}
                      aria-label={c.name}
                    >
                      {c.hex === "custom" && <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200" />}
                    </div>
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
                {OEM_FEATURES.map((f) => (
                  <div key={f.title} className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-[#D4A017] mt-0.5 shrink-0">→</span>
                    <span className="text-xs font-medium text-[#0D1B2A] leading-tight">{f.title}</span>
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
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">{s.label}</p>
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
                  <div key={s.title} className="flex items-start gap-1.5">
                    <span className="text-sm shrink-0 mt-0.5" aria-hidden="true">{s.icon}</span>
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
            <Link prefetch={false} href="/knowledge/baby-bib-construction-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Baby Bib Construction Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Drool, feeding and bandana bib styles — absorbency, closures and safety.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link prefetch={false} href="/guides/sourcing-baby-bibs-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Sourcing Baby Bibs Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Absorbency, closure types, custom print and certification for buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guide →</span>
            </Link>
            <Link prefetch={false} href="/downloads/baby-bib-spec-template/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Baby Bib Spec Template</p>
              <p className="text-xs text-gray-500 leading-relaxed">Specification template for baby bib sourcing from Pakistan.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Template →</span>
            </Link>
            <Link prefetch={false} href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Baby Bibs?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify bib type, size range, certifications and pack format. Factory match and quotation in 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
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
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Backing</p>
                    <p className="text-xs text-gray-600">{b.backing}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Standard Sizes</p>
                    <p className="text-xs text-gray-600">{b.sizes}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
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
          <div className="bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-xs">
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
          <BackToTop />
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
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#D4A017] transition-all"
              >
                <p className="text-2xl font-bold text-[#D4A017] mb-1">{w.gsm}</p>
                <h3 className="font-bold text-[#0D1B2A] mb-2 text-sm">{w.label}</h3>
                <p className="text-gray-500 text-xs mb-3">{w.note}</p>
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Best for</p>
                  <p className="text-xs text-gray-600">{w.best}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
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
          <BackToTop />
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
                  className="w-full aspect-square rounded-xl border border-gray-100 shadow-xs"
                  style={{ backgroundColor: col.hex === "custom" ? undefined : col.hex }}
                  aria-label={col.name}
                >
                  {col.hex === "custom" && <div className="w-full h-full rounded-xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200" />}
                </div>
                <p className="text-xs font-semibold text-[#0D1B2A] text-center leading-tight">{col.name}</p>
                <p className="text-xs text-gray-500 text-center leading-tight hidden sm:block">{col.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S6 — OEM: Isometric-style card grid (dark bg) */}
      <section id="s6-oem" className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Custom Development — Full Service</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl">From closure safety testing to custom silhouette development — every OEM detail managed in-programme.</p>
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
          <BackToTop dark />
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
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
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
          <BackToTop />
        </div>
      </section>

      {/* S8 — Certifications: Glassmorphism + badge grid */}
      <section id="s8-certifications" className="py-20 bg-gradient-to-br from-[#e8f5e9] via-[#e3f2fd] to-[#f3e5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality & Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">7 Baby-Relevant Certifications</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="backdrop-blur-xs bg-white/70 border border-white/60 rounded-2xl p-6 shadow-xs"
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
          <BackToTop />
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
          <BackToTop />
        </div>
      </section>

      {/* S10 — Sustainability: Data Visualization UI */}
      <section id="s10-sustainability" className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Mouthing-Safe from Farm to Shelf</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl">OEKO-TEX Class 1 treats infants as the most vulnerable consumer group — assuming fabric and accessories will be mouthed. Every material in our bib programmes is tested to that standard.</p>
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
                  <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
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
          <BackToTop />
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

      {/* ══ SAME-TIER PAGES ══════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Baby &amp; Kids Apparel</p>
            <h2 className="text-2xl font-bold text-navy-900">More Baby &amp; Kids Products</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "T-Shirts for Kids", desc: "Combed cotton jersey for infants and children. Screen print, appliqué and embroidery programmes.", href: "/apparel/babyandkids/tshirtsforkids/", img: "/images/hero/hero-t-shirts-for-kids.webp", alt: "Pakistan kids t-shirt manufacturer — OEM combed cotton children's apparel for baby boutiques worldwide" },
              { name: "Swaddle Muslin Fabric", desc: "Single muslin, double gauze and bamboo blends. GOTS and OEKO-TEX Class 1 certified.", href: "/apparel/babyandkids/swaddlemuslinfabric/", img: "/images/hero/hero-swaddle-muslin-fabric.webp", alt: "Pakistan swaddle muslin manufacturer — OEM organic cotton muslin fabric for baby brands worldwide" },
              { name: "Overalls", desc: "Infant denim, canvas and corduroy overalls with snap hardware and OEKO-TEX compliance.", href: "/apparel/babyandkids/overalls/", img: "/images/hero/hero-overalls.webp", alt: "Pakistan baby overalls manufacturer — OEM infant denim and canvas overalls for kids brands worldwide" },
              { name: "Baby Rompers", desc: "Short and long-sleeve rompers in organic cotton jersey. Snap crotch and envelope neck options.", href: "/apparel/babyandkids/babyrompers/", img: "/images/hero/hero-baby-rompers.webp", alt: "Pakistan baby romper manufacturer — OEM organic cotton infant rompers for baby boutiques worldwide" },
              { name: "Baby Hooded Towels", desc: "OEKO-TEX terry hooded towels for infants and toddlers. Embroidery and appliqué options.", href: "/apparel/babyandkids/babyhoodedtowels/", img: "/images/hero/hero-baby-hooded-towels.webp", alt: "Pakistan baby hooded towel manufacturer — OEM OEKO-TEX terry hooded towels for infant brands worldwide" },
            ].filter(p => !p.href.includes("babybibs")).map((p) => (
              <Link prefetch={false} href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow">
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

