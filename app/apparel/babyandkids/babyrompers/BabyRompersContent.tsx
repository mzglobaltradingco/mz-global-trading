"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CONSTRUCTIONS = [
  {
    id: "sj",
    name: "Single Jersey Combed Cotton",
    tag: "BEST SELLER",
    tagColor: "bg-green-100 text-green-800",
    gsm: "130–160 gsm",
    desc: "The gold standard for baby bodysuits — buttery soft, 4-way stretch for easy dressing, breathable in warm climates. Most popular for everyday romper programmes.",
    properties: ["Breathable", "4-way stretch", "Washable 60°C"],
  },
  {
    id: "il",
    name: "Interlock",
    tag: "PREMIUM",
    tagColor: "bg-blue-100 text-blue-800",
    gsm: "160–200 gsm",
    desc: "Double-knit construction gives a thick, opaque finish without bulk. Smooth both sides, holds shape through 60+ wash cycles — ideal for premium and gift programmes.",
    properties: ["Double-knit", "Shape-retaining", "Opaque"],
  },
  {
    id: "rib",
    name: "Rib (1×1)",
    tag: "STRETCH",
    tagColor: "bg-purple-100 text-purple-800",
    gsm: "160–180 gsm",
    desc: "High-elasticity knit perfect for envelope necklines and cuff/waistband trims. Accommodates wide size tolerance — a single rib romper can fit two age groups comfortably.",
    properties: ["High stretch", "Envelope necklines", "Multi-season"],
  },
  {
    id: "oc",
    name: "Organic Cotton Jersey",
    tag: "GOTS CERTIFIED",
    tagColor: "bg-emerald-100 text-emerald-800",
    gsm: "120–160 gsm",
    desc: "GOTS chain-of-custody from certified farm to finished garment. Required for eco-retailer listings and Scandinavian/German green-market programmes. Same softness as conventional single jersey.",
    properties: ["GOTS chain-of-custody", "Farm certified", "Eco-retail ready"],
  },
  {
    id: "fr",
    name: "French Terry (Lightweight)",
    tag: "A/W OPTION",
    tagColor: "bg-orange-100 text-orange-800",
    gsm: "220–280 gsm",
    desc: "Loop-back fleece gives light warmth for cool-season romper programmes. Soft looped interior, smooth face for printing. Used for autumn/winter baby bodysuit collections.",
    properties: ["Light insulation", "Print-ready face", "Warm-season option"],
  },
  {
    id: "mg",
    name: "Muslin / Double Gauze",
    tag: "ULTRA-SOFT",
    tagColor: "bg-pink-100 text-pink-800",
    gsm: "90–130 gsm",
    desc: "Two loosely woven gauze layers bonded together — famously soft and breathable. Softens further with each wash. Ideal for newborn rompers and sensitive-skin programmes.",
    properties: ["Ultra-breathable", "Softens with washing", "Sensitive skin"],
  },
];

const AGE_SIZE_GUIDE = [
  { age: "Premature", weight: "< 2.5 kg", height: "< 50 cm", chest: "30–32 cm", bodyLength: "30–35 cm" },
  { age: "Newborn (0–1M)", weight: "2.5–4 kg", height: "50–56 cm", chest: "33–35 cm", bodyLength: "36–42 cm" },
  { age: "0–3 Months", weight: "4–6 kg", height: "56–62 cm", chest: "36–38 cm", bodyLength: "43–48 cm" },
  { age: "3–6 Months", weight: "6–8 kg", height: "62–68 cm", chest: "39–41 cm", bodyLength: "49–54 cm" },
  { age: "6–9 Months", weight: "8–9.5 kg", height: "68–74 cm", chest: "42–44 cm", bodyLength: "55–60 cm" },
  { age: "9–12 Months", weight: "9.5–11 kg", height: "74–80 cm", chest: "45–47 cm", bodyLength: "61–66 cm" },
  { age: "12–18 Months", weight: "11–13 kg", height: "80–86 cm", chest: "48–50 cm", bodyLength: "67–72 cm" },
  { age: "18–24 Months", weight: "13–15 kg", height: "86–92 cm", chest: "51–53 cm", bodyLength: "73–78 cm" },
];

const WEIGHT_CARDS = [
  {
    range: "90–130 gsm",
    label: "Muslin / Gauze",
    colour: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
    note: "Ultra-breathable. Hot climate, summer collections.",
    uses: ["Newborn rompers", "Tropical markets", "Sensitive skin", "Gift/luxury sets"],
  },
  {
    range: "130–170 gsm",
    label: "Single Jersey",
    colour: "from-green-50 to-emerald-50",
    border: "border-green-200",
    note: "Everyday weight. Spring/summer programmes.",
    uses: ["Year-round basics", "USA / Australia", "Screen print base", "High-volume basics"],
  },
  {
    range: "160–200 gsm",
    label: "Interlock / Rib",
    colour: "from-purple-50 to-violet-50",
    border: "border-purple-200",
    note: "Premium weight. Cool-season or premium tier.",
    uses: ["Gift sets", "Autumn/winter", "Boutique brands", "European retail"],
  },
  {
    range: "220–280 gsm",
    label: "French Terry",
    colour: "from-orange-50 to-amber-50",
    border: "border-orange-200",
    note: "Warm-season insulation.",
    uses: ["A/W collections", "Cooler climates", "Bundled sets", "Scandinavian market"],
  },
];

const DECORATION = [
  {
    method: "Screen Print",
    subtitle: "Water-Based Inks Only",
    icon: "🖨️",
    safetyNote: "Azo-free, phthalate-free, CPSC-compliant",
    positions: ["Front chest — small center", "Front — all-over", "Back — upper"],
    best: "High-volume solid graphics and character prints",
  },
  {
    method: "Digital / DTG Print",
    subtitle: "Full-Colour Photographic",
    icon: "🎨",
    safetyNote: "Water-based reactive inks, OEKO-TEX tested",
    positions: ["Front — all-over", "Front chest — small center"],
    best: "Low-volume, multi-colour, photographic designs",
  },
  {
    method: "Embroidery",
    subtitle: "Raised Texture",
    icon: "🧵",
    safetyNote: "Pre-washed thread, smooth underlay",
    positions: ["Left chest — small logo", "Collar / neckline area", "Snap crotch tab"],
    best: "Logo programmes, premium tier, gifting",
  },
  {
    method: "Appliqué",
    subtitle: "Layered Fabric Detail",
    icon: "⭐",
    safetyNote: "Bonded with baby-safe adhesive, stitched perimeter",
    positions: ["Front chest — center", "Collar area"],
    best: "Character-driven, seasonal, boutique collections",
  },
  {
    method: "No Decoration",
    subtitle: "Plain Bodysuit",
    icon: "⬜",
    safetyNote: "N/A",
    positions: ["N/A"],
    best: "Private-hospital layette, subscription basics, white-label",
  },
];

const COLOUR_OPTIONS = [
  { label: "NICU White", hex: "#FAFAFA", desc: "Institutional, hospital layette" },
  { label: "Organic Ecru", hex: "#F5F0E8", desc: "Undyed GOTS certified" },
  { label: "Blush Rose", hex: "#F9DCE0", desc: "Classic pink, global best-seller" },
  { label: "Soft Butter", hex: "#FFF8DC", desc: "Gender-neutral warm tone" },
  { label: "Sky Blue", hex: "#B8D4E8", desc: "Classic blue, universal demand" },
  { label: "Mint Leaf", hex: "#C8E6C9", desc: "Gender-neutral green tone" },
  { label: "Lavender", hex: "#D4C8E6", desc: "UK and European market favourite" },
  { label: "Storm Grey", hex: "#B0B8C0", desc: "Modern minimal, Scandinavian market" },
  { label: "Charcoal Marl", hex: "#6B7680", desc: "Contemporary, urban baby brands" },
  { label: "Custom Pantone", hex: "custom", desc: "Exact brand colour matching" },
];

const OEM_STEPS = [
  { n: "01", title: "Fabric Approval", body: "Mill certifications, GSM, shrinkage and colourfastness test reports submitted before production starts." },
  { n: "02", title: "Safety Pre-compliance", body: "All accessories (snaps, threads, labels) sourced from CPSC / EN 14682 compliant suppliers. No sharp edges, no choking-hazard parts." },
  { n: "03", title: "Fit Sample Review", body: "Pre-production samples across all sizes sent for buyer sign-off. Snap functionality and neckline stretch tested." },
  { n: "04", title: "Ink & Dye Signoff", body: "All decoration inks and fabric dyes batch-tested to OEKO-TEX Class 1 limits before bulk run." },
  { n: "05", title: "In-Line Quality Checks", body: "Inline inspections at 30% and 70% production. Snap strength, seam integrity and print adhesion tested per lot." },
  { n: "06", title: "Final Audit & Dispatch", body: "Third-party pre-shipment inspection available. Packed to buyer spec — individual poly, gift box or 3-pack sets." },
];

const MARKETS = [
  { region: "USA & Canada", note: "CPSC 16 CFR compliant", flag: "🇺🇸" },
  { region: "United Kingdom", note: "BS EN 14682 safety standard", flag: "🇬🇧" },
  { region: "European Union", note: "REACH SVHC compliant", flag: "🇪🇺" },
  { region: "Australia & NZ", note: "AS/NZS 1221 compliant", flag: "🇦🇺" },
  { region: "Scandinavia", note: "Organic/GOTS premium demand", flag: "🇸🇪" },
  { region: "Middle East & GCC", note: "Layettes, gift sets, premium brands", flag: "🇦🇪" },
  { region: "East Asia (JP / KR)", note: "High-quality knit demand", flag: "🇯🇵" },
  { region: "South America", note: "Value-tier jersey, large volume", flag: "🌎" },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", tier: "ESSENTIAL", note: "Full organic chain-of-custody. Mandatory for eco-retail and Scandinavian/German markets.", bg: "bg-green-50 border-green-200" },
  { name: "OEKO-TEX Class 1", full: "Standard 100 — Baby / Infant", tier: "ESSENTIAL", note: "Strictest tier — tests for 100+ harmful substances including pesticides, AZO dyes and formaldehyde.", bg: "bg-blue-50 border-blue-200" },
  { name: "BSCI", full: "Business Social Compliance Initiative", tier: "STANDARD", note: "European buyer requirement for social compliance auditing.", bg: "bg-gray-50 border-gray-200" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", tier: "STANDARD", note: "SMETA audit transparency for UK and global brands.", bg: "bg-gray-50 border-gray-200" },
  { name: "ISO 9001", full: "Quality Management System", tier: "STANDARD", note: "Factory-level process consistency and quality documentation.", bg: "bg-gray-50 border-gray-200" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", tier: "STANDARD", note: "12-principle humanitarian production standard, US market.", bg: "bg-gray-50 border-gray-200" },
  { name: "BCI", full: "Better Cotton Initiative", tier: "OPTIONAL", note: "Conventional cotton with verified environmental and social improvement practices.", bg: "bg-yellow-50 border-yellow-200" },
];

const EXPORT_DATA = [
  { label: "Lead Time — Repeat Order", value: "45–55 days" },
  { label: "Lead Time — New Development", value: "60–75 days" },
  { label: "Sample Lead Time", value: "10–15 days" },
  { label: "Incoterms Available", value: "FOB, CIF, CFR, EXW" },
  { label: "Packing Options", value: "Individual poly · Gift box · 2-pack · 3-pack · 6-pack set" },
  { label: "Labelling", value: "Brand care label, size label, hang tag — buyer spec" },
  { label: "Port of Shipment", value: "Port Qasim · Karachi" },
  { label: "Inspection", value: "In-house inline + 3rd party pre-shipment available" },
];

const SUSTAINABILITY = [
  { title: "GOTS-Certified Organic Cotton", body: "Certified farm to finished garment — traceable through every production stage. No GMO seeds, no synthetic pesticides." },
  { title: "Water-Based Inks Only", body: "All screen print and digital inks are water-based and azo-free. Zero PVC plastisol on baby garments." },
  { title: "Baby-Safe Enzyme Wash", body: "Biological enzyme softening replaces conventional silicone softeners. Pre-washed for dimensional stability." },
  { title: "OEKO-TEX Class 1 Dyeing", body: "All fabric dyes tested to Class 1 limits — the strictest tier, accounting for mouthing behaviour in infants under 3 years." },
  { title: "Lead-Free Hardware", body: "All snap closures and eyelets are nickel-free and meet CPSC / EN 71-3 toy-grade heavy-metal limits." },
  { title: "Recycled Packaging Option", body: "Inner poly bags available in 30% recycled polyethylene. Outer cartons are FSC-certified corrugated board." },
];

const PROCESS = [
  { step: 1, title: "Brief & Fabric Selection", body: "Buyer shares season brief, target market certifications and budget. Fabric constructions and certifications confirmed." },
  { step: 2, title: "Safety Pre-Compliance", body: "All snaps, threads, dyes and inks validated against target market chemical requirements (CPSC, REACH, EN 14682) before sampling." },
  { step: 3, title: "Proto & Fit Sample", body: "Initial sample with snap placement, neckline and size grading reviewed. Buyer signs off before bulk." },
  { step: 4, title: "Bulk Production", body: "Inline inspections at 30% and 70% production completion. Snap strength, colourfastness and print adhesion tested per lot." },
  { step: 5, title: "Final QC & Packing", body: "100% snap closure check. Packed to buyer spec — single poly, gift box or multi-pack sets. All labels and hangtags applied." },
  { step: 6, title: "Shipment & Documentation", body: "Pre-shipment inspection available. Full export documentation including GOTS / OEKO-TEX certificates shipped with cargo." },
];

const FAQS = [
  {
    q: "What snap type do you use on baby rompers?",
    a: "We use 4-part KAM-style nickel-free resin snaps as standard. Metal snaps (copper-nickel alloy, nickel-free plated) are available for premium programmes. All snaps meet EN 71-3 toy-grade heavy-metal limits and are tested for pull strength (minimum 30 N). Velcro or hook-and-eye closures available on request.",
  },
  {
    q: "Can you produce envelope necklines on all constructions?",
    a: "Yes. Envelope/cross-over neckline construction is standard on our jersey and interlock rompers and available on rib and muslin constructions. This neckline style allows the garment to be pulled downward (rather than over the head) during diaper changes — a key feature for newborn and preemie sizing.",
  },
  {
    q: "What is OEKO-TEX Class 1 and why does it matter for rompers?",
    a: "OEKO-TEX Standard 100 has four product classes. Class 1 is the most stringent — it applies to garments that come into direct skin contact and are likely to be mouthed by infants under 36 months. It tests for 100+ harmful substances including pesticides, heavy metals, formaldehyde and AZO dyes at baby-specific limit values (typically 10× stricter than adult clothing limits). All our baby romper programmes are sourced from Class 1 certified mills.",
  },
  {
    q: "Can you produce GOTS-certified organic cotton rompers?",
    a: "Yes. We source from GOTS-certified mills where organic cotton is certified from the farm stage, processed with GOTS-approved chemicals, and documented through a full chain-of-custody audit. GOTS certification is a requirement for many European eco-retailers and Scandinavian department store programmes. GOTS certificates are included with shipment documentation.",
  },
  {
    q: "What sleeve styles are available?",
    a: "We produce short sleeve, long sleeve and sleeveless (tank) bodysuit rompers. Raglan sleeve construction is also available for a wider armhole that makes dressing easier. Sleeve length can be specified per size group — for example, short sleeve in summer sizes and long sleeve in winter sizes within the same programme.",
  },
  {
    q: "Do you produce footie / footed rompers?",
    a: "Yes. Footed rompers (sleepsuits with attached feet) are available in single jersey, interlock and French terry. Foot construction uses a separate panel cut to match the body fabric. Anti-slip grippers on the foot sole are available for 6M+ sizes. Footed rompers are typically 10–12 days additional development time due to pattern complexity.",
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

export default function BabyRompersContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[540px] md:min-h-[620px] flex items-end overflow-hidden bg-[#0D1B2A]">
        <Image
          src="/images/hero/hero-apparel.webp"
          alt="Pakistan baby rompers manufacturer — OEM organic cotton infant bodysuits and snap-crotch rompers for USA, UK and Europe"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Baby & Kids Apparel · OEM Manufacturing · Pakistan
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Baby Rompers<br className="hidden sm:block" /> Manufacturer
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
              Snap-crotch bodysuits and infant rompers in GOTS organic cotton and OEKO-TEX Class 1 certified fabrics. Newborn to 24 months. OEM bulk programmes for USA, UK, Europe and global baby brands.
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

      {/* Stats anchor */}
      <section className="bg-[#0D1B2A] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "6", u: "Fabric Constructions", s: "Jersey to muslin" },
            { v: "8", u: "Age/Size Groups", s: "Preemie to 24M" },
            { v: "OEKO-TEX", u: "Class 1 Certified", s: "Strictest baby tier" },
            { v: "95%", u: "On-Time Delivery", s: "Across all programmes" },
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
          <li className="text-[#0D1B2A] font-medium">Baby Rompers</li>
        </ol>
      </nav>

      {/* Bento Grid */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1: Constructions + Age Size Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Fabrics</p>
                  <h3 className="text-xl font-bold text-[#0D1B2A] mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3 border border-green-100">
                    <p className="text-sm font-semibold text-[#0D1B2A]">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    {c.tag && <span className="mt-1.5 inline-block text-[10px] font-semibold text-[#D4A017] bg-[#D4A017]/10 px-2 py-0.5 rounded-full">{c.tag}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn label="Explore Constructions" targetId="s1-constructions" />
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
              <div className="flex flex-col gap-1.5 flex-1">
                {AGE_SIZE_GUIDE.map((a) => (
                  <div key={a.age} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#0D1B2A]">{a.age}</p>
                      <p className="text-xs text-gray-400 truncate">{a.weight} · {a.height}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap hidden sm:block">{a.chest}</span>
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
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">GSM Weight Guide</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {WEIGHT_CARDS.map((t) => (
                  <div key={t.range}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-[#0D1B2A]">{t.range}</span>
                      <span className="text-gray-400 truncate ml-1">{t.label}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn label="GSM Details" targetId="s3-weight" />
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
              className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🌈</span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Colour Options</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-2 flex-1">
                {COLOUR_OPTIONS.slice(0, 8).map((c) => (
                  <div key={c.label} className="flex items-center gap-1.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-gray-200 shrink-0"
                      style={{ backgroundColor: c.hex === "custom" ? undefined : c.hex }}
                      aria-label={c.label}
                    >
                      {c.hex === "custom" && <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200" />}
                    </div>
                    <span className="text-[10px] text-gray-500">{c.label}</span>
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
                {OEM_STEPS.map((s) => (
                  <div key={s.n} className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-[#D4A017] mt-0.5 shrink-0">{s.n}</span>
                    <span className="text-xs font-medium text-[#0D1B2A] leading-tight">{s.title}</span>
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
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">Export</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_DATA.slice(0, 4).map((t) => (
                  <div key={t.label}>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">{t.label}</p>
                    <p className="text-xs font-semibold text-[#0D1B2A]">{t.value}</p>
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
                  <div key={p.step} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-200 text-sky-800 text-[10px] font-bold flex items-center justify-center shrink-0">{p.step}</span>
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
              <p className="font-semibold text-navy-900">Baby Romper Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction guide for organic cotton jersey rompers, OEKO-TEX Class 1 compliance and pack format options.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Baby Apparel Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, OEKO-TEX and GOTS requirements for baby and infant apparel programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Romper Spec Sheets &amp; Size Charts</p>
              <p className="text-xs text-gray-500 leading-relaxed">Infant romper construction specs, size grade charts and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Baby Rompers?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, size range, certifications and pack format. Factory match and quotation in 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* S1 — Constructions: Social-First UI + Card grid */}
      <section id="s1-constructions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fabric Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">6 Knit Options for Every Romper Brief</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-sm leading-relaxed">All constructions available in conventional combed cotton or GOTS-certified organic. Fabric certifications provided on request.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-[#0D1B2A] text-base leading-tight pr-2">{c.name}</h3>
                  <span className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${c.tagColor}`}>{c.tag}</span>
                </div>
                <p className="text-[#D4A017] font-semibold text-sm mb-2">{c.gsm}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.properties.map((p) => (
                    <span key={p} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{p}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S2 — Age/Size Guide: Dashboard UI */}
      <section id="s2-size" className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Age / Size Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Preemie to 24 Months — 8 Size Groups</h2>
            <p className="text-gray-400 mt-3 max-w-2xl text-sm">Standard sizes listed. Custom grading available with buyer-supplied size specification sheets.</p>
          </motion.div>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-gray-300 uppercase text-xs tracking-wider">
                  <th className="px-4 py-3 text-left">Age Group</th>
                  <th className="px-4 py-3 text-left">Weight</th>
                  <th className="px-4 py-3 text-left">Height</th>
                  <th className="px-4 py-3 text-left">Chest</th>
                  <th className="px-4 py-3 text-left">Body Length</th>
                </tr>
              </thead>
              <tbody>
                {AGE_SIZE_GUIDE.map((row, i) => (
                  <tr key={row.age} className={`border-t border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                    <td className="px-4 py-3 text-white font-medium">{row.age}</td>
                    <td className="px-4 py-3 text-gray-300">{row.weight}</td>
                    <td className="px-4 py-3 text-gray-300">{row.height}</td>
                    <td className="px-4 py-3 text-gray-300">{row.chest}</td>
                    <td className="px-4 py-3 text-[#D4A017] font-medium">{row.bodyLength}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-xs mt-4">All measurements are body measurements in cm. Finished garment measurements will include ease allowances per construction type.</p>
          <BackToTop dark />
        </div>
      </section>

      {/* S3 — GSM / Weight: Infographic UI */}
      <section id="s3-weight" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fabric Weight</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Weight Guide — Matching GSM to Programme</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WEIGHT_CARDS.map((w, i) => (
              <motion.div
                key={w.range}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${w.colour} border ${w.border} rounded-2xl p-6`}
              >
                <p className="text-2xl font-bold text-[#0D1B2A] mb-1">{w.range}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{w.label}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{w.note}</p>
                <ul className="space-y-1">
                  {w.uses.map((u) => (
                    <li key={u} className="text-xs text-gray-600 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                      {u}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S4 — Decoration: Marketplace UI */}
      <section id="s4-decoration" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Decoration Methods</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Baby-Safe Printing & Embellishment</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-2xl">All inks and dyes are water-based and tested to OEKO-TEX Class 1 limits. No solvent inks, no PVC plastisol on any baby garment.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DECORATION.map((d, i) => (
              <motion.div
                key={d.method}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="border border-gray-200 rounded-2xl p-6 hover:border-[#D4A017] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{d.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#0D1B2A] text-sm">{d.method}</h3>
                    <p className="text-gray-500 text-xs">{d.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                  <p className="text-green-700 text-xs font-medium">{d.safetyNote}</p>
                </div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Positions</p>
                <p className="text-gray-600 text-xs mb-3">{d.positions.join(" · ")}</p>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Best For</p>
                <p className="text-gray-600 text-xs">{d.best}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S5 — Colours: Hero-Centered UI */}
      <section id="s5-colours" className="py-20 bg-gradient-to-br from-[#FFF9F5] via-[#F8F0F8] to-[#F0F5FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Palette</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Soft Baby Tones & Neutral Collections</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-xl mx-auto">Standard palette shown. Pantone matching available for brand-specific colours. All dyes OEKO-TEX Class 1 certified — azo-free and formaldehyde-free.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {COLOUR_OPTIONS.map((col, i) => (
              <motion.div
                key={col.label}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: col.hex === "custom" ? "conic-gradient(red, orange, yellow, green, blue, indigo, violet, red)" : col.hex }}
                  aria-label={col.label}
                >
                  {col.hex === "custom" && (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200" />
                  )}
                </div>
                <p className="text-xs font-semibold text-[#0D1B2A] text-center leading-tight">{col.label}</p>
                <p className="text-xs text-gray-500 text-center leading-tight">{col.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S6 — OEM: Corporate UI + horizontal numbered steps */}
      <section id="s6-oem" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM Development</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">From Brief to Certified Bulk — 6 Stages</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-2xl">Every baby romper programme goes through chemical pre-compliance and safety validation before a single garment is cut.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OEM_STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex gap-5"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#D4A017] flex items-center justify-center text-[#0D1B2A] font-bold text-lg">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-bold text-[#0D1B2A] mb-1">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S7 — Markets: Gradient UI */}
      <section id="s7-markets" className="py-20 bg-gradient-to-br from-[#0D1B2A] via-[#1a2f4a] to-[#0a2518]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Supplying Baby Brands in 35+ Countries</h2>
            <p className="text-gray-400 mt-3 text-sm max-w-2xl">Each market has specific chemical regulatory requirements for infant clothing. Our compliance team keeps certifications current for all active markets.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MARKETS.map((m, i) => (
              <motion.div
                key={m.region}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl mb-3">{m.flag}</div>
                <h3 className="font-bold text-white text-sm mb-1">{m.region}</h3>
                <p className="text-gray-400 text-xs">{m.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* S8 — Certifications: Technical UI */}
      <section id="s8-certifications" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality & Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">7 Baby-Relevant Certifications</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-2xl">OEKO-TEX Class 1 and GOTS are mandatory. BSCI, Sedex, ISO 9001, WRAP and BCI available from partner factories based on buyer requirements.</p>
          </motion.div>
          <div className="space-y-3">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5 rounded-2xl border ${cert.bg}`}
              >
                <div className="shrink-0 sm:w-40">
                  <p className="font-bold text-[#0D1B2A]">{cert.name}</p>
                  <p className="text-xs text-gray-500">{cert.full}</p>
                </div>
                <div className="shrink-0">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cert.tier === "ESSENTIAL" ? "bg-[#0D1B2A] text-white" : cert.tier === "STANDARD" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {cert.tier}
                  </span>
                </div>
                <p className="text-gray-600 text-sm flex-1">{cert.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S9 — Export: Typography-Driven UI */}
      <section id="s9-export" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export & Lead Times</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Logistics & Packing Specifications</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
            {EXPORT_DATA.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-white px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider sm:w-48 shrink-0">{row.label}</p>
                <p className="font-medium text-[#0D1B2A]">{row.value}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S10 — Sustainability: Scandinavian UI */}
      <section id="s10-sustainability" className="py-20 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A]">Safe from Soil to Seam</h2>
            <p className="text-gray-600 mt-3 text-sm max-w-2xl">Every baby romper programme is built around child safety — organic inputs, baby-safe chemistries and transparent certification chains.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUSTAINABILITY.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="w-8 h-1 bg-[#D4A017] mb-4 rounded-full" />
                <h3 className="font-bold text-[#0D1B2A] mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* S11 — Process: Collage UI */}
      <section id="s11-process" className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Production Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">6-Stage Safety-First Workflow</h2>
            <p className="text-gray-400 mt-3 text-sm max-w-xl mx-auto">From fabric certification to final pre-shipment audit — every baby romper programme follows a documented safety protocol.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-7 overflow-hidden"
              >
                <span className="absolute top-4 right-5 text-6xl font-black text-white/5 select-none leading-none">{p.step}</span>
                <p className="text-[#D4A017] text-xs font-semibold tracking-widest uppercase mb-3">Step {p.step}</p>
                <h3 className="font-bold text-white text-lg mb-3 relative z-10">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{p.body}</p>
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
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
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
              { name: "Baby Bibs", desc: "Terry, velour and silicone bib constructions for newborn to toddler programmes.", href: "/apparel/babyandkids/babybibs/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby bib manufacturer — OEM terry and silicone bibs for infant product brands worldwide" },
              { name: "Baby Hooded Towels", desc: "OEKO-TEX terry hooded towels for infants and toddlers. Embroidery and appliqué options.", href: "/apparel/babyandkids/babyhoodedtowels/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby hooded towel manufacturer — OEM OEKO-TEX terry hooded towels for infant brands worldwide" },
            ].filter(p => !p.href.includes("babyrompers")).map((p) => (
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
            <p className="text-[#D4A017] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Source Baby Rompers</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              Ready to Source OEM<br className="hidden sm:block" /> Baby Rompers from Pakistan?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Share your programme brief — size range, certifications, pack format and target market. We will respond with factory certifications and indicative timelines within one business day.
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
