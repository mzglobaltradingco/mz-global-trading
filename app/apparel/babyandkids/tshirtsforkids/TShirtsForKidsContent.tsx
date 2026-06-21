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
    id: "single-jersey",
    name: "Single Jersey Combed Cotton",
    badge: "Most Popular",
    gsm: "120–160 GSM",
    hand: "Soft face, light stretch, excellent print fidelity",
    best: ["Fashion Retail", "Graphic Tees", "Basics Programmes"],
    detail: "The primary construction for kids T-shirts worldwide. Combed cotton single jersey delivers a clean, smooth face ideal for water-based screen print and DTG — the two safest decoration methods for children's skin. At 120–140 GSM it is ideal for summer and warm-climate markets; 140–160 GSM works year-round. GOTS and OEKO-TEX Class 1 certification available across the range.",
    spec: "100% combed ring-spun cotton or organic cotton. GSM 120–160. Reactive dyed with azo-free pigments. GOTS and OEKO-TEX Class 1 certified mills available.",
    icon: "🧵",
    color: "green",
  },
  {
    id: "interlock",
    name: "Interlock",
    badge: "Durable Favourite",
    gsm: "150–200 GSM",
    hand: "Firm, stable, two-sided smooth surface, low pilling",
    best: ["Active Kids", "School Uniform", "USA/EU Basics"],
    detail: "Interlock is double-knit construction — two single jersey layers locked together — giving it exceptional durability and dimensional stability. It does not curl at the edges, making it the preferred construction for school uniforms, childrenswear basics and active kids programmes. The heavier weight and firm hand feel position it as a premium option in the kids category.",
    spec: "100% combed cotton or organic cotton interlock. GSM 150–200. Smooth on both sides. Anti-pilling treatment available.",
    icon: "🔗",
    color: "blue",
  },
  {
    id: "rib-1x1",
    name: "Rib (1×1)",
    badge: "Baby Favourite",
    gsm: "140–200 GSM",
    hand: "Vertical rib texture, excellent stretch and recovery",
    best: ["Newborn & Baby", "Bodysuit Necklines", "Tight-Fit Kids"],
    detail: "Rib 1×1 is the preferred construction for newborn and infant T-shirts and bodysuits. The vertical rib structure provides exceptional stretch and recovery — critical for dressing babies without discomfort. Envelope necklines and snap closures integrate naturally with rib. Works across the full age range; heavier rib weights suit older kids' fashion programmes.",
    spec: "100% combed cotton rib. GSM 140–200. Elastane options (95/5) available for performance fit. GOTS certified organic cotton available.",
    icon: "📏",
    color: "purple",
  },
  {
    id: "muslin-gauze",
    name: "Muslin / Double Gauze",
    badge: "Breathable Choice",
    gsm: "90–130 GSM",
    hand: "Open weave, ultra-breathable, softens with every wash",
    best: ["Newborn Summer", "Tropical Markets", "Organic Programmes"],
    detail: "Muslin and double gauze T-shirts are growing rapidly in premium baby markets — US boutique, EU eco retail, Australian organics. The open weave structure maximises airflow for newborns and infants in warm climates. Double gauze (two layers of muslin) provides a gentle body without weight. The fabric softens progressively with washing — a quality appreciated by new parents.",
    spec: "100% organic cotton muslin. GSM 90–130. GOTS certified processing. Typically sold undyed or in natural/pale-dyed tones.",
    icon: "🌬️",
    color: "sky",
  },
  {
    id: "french-terry",
    name: "French Terry (Lightweight)",
    badge: "All-Season Option",
    gsm: "180–240 GSM",
    hand: "Smooth face, looped back interior, mid-weight",
    best: ["Toddler & Pre-School", "A/W Kids Basics", "EU Market"],
    detail: "Lightweight French terry bridges the T-shirt and sweatshirt categories — ideal for autumn/winter kids collections and transitional-season toddler tops. The smooth face accepts screen print and embroidery cleanly; the looped interior provides warmth without bulk. Popular in EU kidswear markets where layering is standard.",
    spec: "100% combed cotton French terry. GSM 180–240. Loop-back interior. GOTS organic cotton available.",
    icon: "🔄",
    color: "amber",
  },
  {
    id: "organic-jersey",
    name: "Organic Cotton Jersey",
    badge: "Eco Premium",
    gsm: "120–180 GSM",
    hand: "Softer than conventional, low-impact dyed, GOTS traceable",
    best: ["Sustainable Brands", "Boutique Retail", "Japan/Germany/Nordics"],
    detail: "GOTS-certified organic cotton jersey is the material of choice for sustainable kidswear brands in Germany, Japan, Scandinavia and USA premium boutique. Fully traceable from certified farm to finished garment. Dyed with GOTS-approved azo-free dyes. The OCS (Organic Content Standard) blended option is available for transition-stage programmes.",
    spec: "100% GOTS certified organic cotton. GSM 120–180. OCS blended option available. No chlorine bleach, no formaldehyde finishes, no azo dyes.",
    icon: "🌿",
    color: "emerald",
  },
];

const AGE_SIZE_GUIDE = [
  { group: "Newborn", ages: "Premature – 0–3 months", chest: "40–46 cm", height: "Up to 56 cm", note: "Envelope neckline essential; snap closures preferred", tag: "NB", color: "bg-rose-100 text-rose-700" },
  { group: "Infant", ages: "3–12 months", chest: "46–50 cm", height: "56–80 cm", note: "Rib or envelope neck; avoid buttons — choking hazard", tag: "3M–12M", color: "bg-orange-100 text-orange-700" },
  { group: "Baby", ages: "12–24 months", chest: "50–54 cm", height: "80–92 cm", note: "Standard crew neck viable from 12M; cotton stretch preferred", tag: "1–2Y", color: "bg-amber-100 text-amber-700" },
  { group: "Toddler", ages: "2–4 years", chest: "54–60 cm", height: "92–110 cm", note: "All necklines viable; crew neck most popular", tag: "2–4Y", color: "bg-yellow-100 text-yellow-700" },
  { group: "Pre-School", ages: "4–6 years", chest: "60–65 cm", height: "110–122 cm", note: "Full range of constructions and decoration methods", tag: "4–6Y", color: "bg-lime-100 text-lime-700" },
  { group: "School Age", ages: "6–8 years", chest: "65–70 cm", height: "122–134 cm", note: "School uniform and sport programmes common", tag: "6–8Y", color: "bg-green-100 text-green-700" },
  { group: "Older Kids", ages: "8–12 years", chest: "70–80 cm", height: "134–152 cm", note: "Crosses into junior/youth adult sizing", tag: "8–12Y", color: "bg-teal-100 text-teal-700" },
];

const GSM_TIERS = [
  { gsm: "90–130", name: "Ultra-Light", season: "Summer / Newborn", market: "Tropical · Middle East · Australia · USA Summer", pct: 30, desc: "Muslin and gauze constructions. Maximum breathability for newborns and warm-climate infant programmes.", color: "bg-sky-300", featured: false },
  { gsm: "130–160", name: "Standard Kids", season: "Year-Round", market: "USA · UK · EU — primary kids range", pct: 85, desc: "Single jersey combed cotton. The industry standard weight for kids T-shirts across all major markets. Covers newborn through 12 years.", color: "bg-gold", featured: true },
  { gsm: "160–200", name: "Structured / A/W", season: "Autumn / Winter", market: "EU · UK · Canada · Nordics", pct: 55, desc: "Interlock and French terry. More body and warmth for autumn/winter kids collections and school uniform programmes.", color: "bg-green-500", featured: false },
];

const DECO_METHODS = [
  { code: "SCR", method: "Screen Print (water-based)", best: "Graphic tees, brand marks, fashion programmes", note: "Water-based inks only — solvent inks not acceptable for OEKO-TEX Class 1" },
  { code: "DTG", method: "Digital / DTG Print", best: "Photo-quality imagery, short runs, personalised", note: "Water-based reactive inks — safe for baby skin. Single jersey only." },
  { code: "EMB", method: "Embroidery", best: "Logo marks, brand name, chest placement on older kids", note: "Avoid embroidery on newborn/infant — seam irritation risk. Suitable 2 years+" },
  { code: "APP", method: "Appliqué", best: "Dimensional motifs, character graphics, premium kids", note: "Bonded or sewn — ensure no sharp edges. Water-based bonding adhesives only." },
];

const DYE_OPTIONS = [
  { name: "Azo-Free Reactive Dye", subtitle: "Standard / PMS Matched", note: "Full PMS colour range. Azo-free mandatory for OEKO-TEX Class 1 compliance. Lab dip approval before bulk.", swatches: ["bg-rose-300", "bg-sky-400", "bg-green-400", "bg-yellow-300", "bg-purple-300"] },
  { name: "Organic / Low-Impact Dye", subtitle: "GOTS Certified", note: "GOTS-approved dyes only. No formaldehyde, no heavy metals. Required for organic cotton programmes.", swatches: ["bg-green-200", "bg-teal-200", "bg-lime-200", "bg-emerald-300", "bg-stone-200"] },
  { name: "Pastel / Baby Palette", subtitle: "Soft Tones — Market Favourite", note: "Baby pink, sky blue, mint, cream, lavender — reactive dyed to pastel spec. Most popular for infant/toddler retail.", swatches: ["bg-rose-100", "bg-sky-100", "bg-green-100", "bg-purple-100", "bg-yellow-100"] },
  { name: "Undyed / Natural", subtitle: "Unbleached Raw Cotton", note: "Natural ecru/cream tones. Popular in sustainable and organic baby ranges. No dye processing — lowest environmental load.", swatches: ["bg-stone-100", "bg-stone-200", "bg-amber-100", "bg-yellow-50", "bg-white border border-gray-200"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic cotton traceability from farm to garment. Mandatory for 'organic' claims in EU, USA and UK retail", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100 — Class 1", desc: "Class 1 is the strictest category — designed specifically for baby and infant products (skin contact, mouthing)", tier: "Essential", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — labour standards and worker welfare verified", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data sharing platform", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control certification", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance certification", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Responsible cotton farming practices — water and pesticide reduction", tier: "Optional", img: "/images/certs/cert-bci.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Full-Spectrum Sizing", desc: "Graded patterns from premature/newborn through 12 years — US, UK and EU sizing standards. Custom grading available to your size chart." },
  { num: "02", title: "Baby-Safe Construction", desc: "Envelope necklines, snap closures, tagless neck printing and flat-seam stitching available for infant and newborn programmes. No sharp trims." },
  { num: "03", title: "Certified Organic Programmes", desc: "GOTS-certified organic cotton with full chain-of-custody documentation. OEKO-TEX Class 1 testing on baby and infant products." },
  { num: "04", title: "Water-Based Decoration Only", desc: "Screen print, DTG and appliqué executed with water-based, azo-free inks and adhesives only. No solvent inks permitted on baby products." },
  { num: "05", title: "Multi-Pack Configurations", desc: "2-pack, 3-pack, 5-pack and 6-pack configurations with retail-ready header cards, gift boxes and hanger bags — common in US and EU baby retail." },
  { num: "06", title: "Custom Label & Brand Development", desc: "Tagless printing, woven neck labels, care labels, hang tags and QR codes to your specification. All label text verified for compliance languages." },
];

const SECTORS = [
  { abbr: "BR", name: "Baby Boutiques", detail: "Premium baby and kidswear boutiques requiring certified organic programmes with story-led branding", market: "USA · EU · Australia · Japan" },
  { abbr: "KR", name: "Kids Retail Chains", detail: "Multi-SKU programmes for high-street and chain stores: graphics tees, basics packs, seasonal collections", market: "USA · UK · EU · Canada" },
  { abbr: "EB", name: "E-Commerce Brands", detail: "DTC kids brands and Shopify sellers sourcing OEM T-shirts with custom labels and fulfilment-ready packaging", market: "USA · UK · EU · Australia" },
  { abbr: "SU", name: "School Uniform", detail: "Plain cotton T-shirts in school colours with embroidered or printed crests — interlock and pique preferred", market: "UK · Middle East · SE Asia" },
  { abbr: "WD", name: "Wholesale Distributors", detail: "Multi-brand distributors supplying regional baby and kidswear retail with OEM basics packs", market: "USA · EU · Middle East" },
  { abbr: "PR", name: "Premium Organic", detail: "Certified organic, GOTS-traceable programmes for eco-conscious brands — Germany, Nordics, Japan, Australia", market: "EU · Japan · Australia" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight. Buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory gate. Lowest quoted price, highest buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard bulk export" },
  { icon: "🎁", label: "Gift Box", note: "Premium retail / gifting" },
  { icon: "📋", label: "3-Pack (header card)", note: "US & EU baby retail" },
  { icon: "📦", label: "6-Pack Set", note: "Value multi-pack" },
  { icon: "🪝", label: "Retail Hanger Bag", note: "Boutique display" },
  { icon: "✏️", label: "Custom Pack", note: "To your brand brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory shortlist, pricing and certification confirmation", color: "bg-gold" },
  { stage: "Sample Production", days: "14–18", desc: "Pre-production samples to construction, size and decoration spec", color: "bg-green-500" },
  { stage: "Bulk Production", days: "35–55", desc: "From confirmed PO and approved sample", color: "bg-teal-500" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection — OEKO-TEX test report included", color: "bg-blue-500" },
  { stage: "Sea Freight", days: "18–28", desc: "FCL/LCL from Karachi or Port Qasim", color: "bg-indigo-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "GOTS Organic Cotton", desc: "GOTS-certified organic cotton from farm to finished garment. Fully traceable, no synthetic pesticides, GOTS-approved dyes only.", tag: "GOTS" },
  { icon: "🧪", title: "OEKO-TEX Class 1 Testing", desc: "The strictest chemical safety standard — 100+ harmful substances tested, including those safe for baby skin and mouthing exposure.", tag: "OEKO-TEX" },
  { icon: "💧", title: "Azo-Free Dyeing", desc: "All kids garments dyed with azo-free reactive dyes. No heavy metals, no formaldehyde, no chlorine bleach — compliant with EU REACH.", tag: "REACH" },
  { icon: "♻️", title: "BCI Better Cotton", desc: "Conventional cotton programmes source from BCI-enrolled farms — improved water use, reduced pesticide application.", tag: "BCI" },
  { icon: "🏭", title: "Audited Factory Network", desc: "BSCI and Sedex audited factories. Worker welfare, fair wages and safe production conditions independently verified.", tag: "BSCI" },
  { icon: "📦", title: "Eco Packaging Options", desc: "Recycled polybags, FSC-certified paper header cards, unbleached tissue and soy-ink printing available for organic programme packaging.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction, size range, decoration, quantity and certification requirements. Include target market — EU/USA/Japan requirements differ for baby safety." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We match your programme to 2–3 certified Pakistan knitwear factories with GOTS/OEKO-TEX Class 1 capability and children's production experience." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Pre-production samples — envelope necklines, size spec, decoration and label — reviewed before bulk approval. 14–18 days from spec lock." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review construction, fit, label, decoration and packaging. OEKO-TEX test report issued if required. No bulk until sample is approved." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Certified factory produces to confirmed PO. QC inline checks and end-of-line inspections. Full production documentation maintained." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection, packing verification and loading. Full documentation: B/L, C/O, test reports, packing list and GOTS certificates if applicable." },
];

const FAQS = [
  {
    q: "What is OEKO-TEX Class 1 and why does it matter for baby T-shirts?",
    a: "OEKO-TEX Standard 100 has four product classes based on skin contact risk. Class 1 is the most stringent — it applies to products intended for babies and toddlers under 3 years, including clothing that may be put in the mouth. It tests for 100+ harmful substances at tighter thresholds than adult clothing classes. For any T-shirt worn by infants, Class 1 certification is the international safety benchmark expected by EU, USA and Australian retailers.",
  },
  {
    q: "What is the difference between GOTS and OEKO-TEX for kids apparel?",
    a: "GOTS (Global Organic Textile Standard) covers the entire supply chain — from certified organic fibre farming through processing and manufacturing. It ensures the cotton is grown without synthetic pesticides and processed with GOTS-approved chemicals. OEKO-TEX Standard 100 tests the finished product for harmful substance limits, regardless of whether the fibre is organic. They serve different purposes and can both be applied: GOTS certifies the process and fibre origin; OEKO-TEX Class 1 certifies the finished garment's chemical safety.",
  },
  {
    q: "What neckline constructions do you offer for newborn and infant T-shirts?",
    a: "Envelope necklines are standard for newborn and infant sizes — they expand sideways for easy dressing without pulling over a baby's head. Snap closures at the shoulder are an alternative. For toddlers aged 2 years and above, standard crew necks and V-necks are practical. We can produce tagless neck printing to eliminate the irritation of neck labels — important for sensitive baby skin. All neckline and closure specifications are developed from your tech pack or reference samples.",
  },
  {
    q: "Can kids T-shirts be ordered as multi-pack sets with retail-ready packaging?",
    a: "Yes. 2-pack, 3-pack, 5-pack and 6-pack configurations are common in US and EU baby retail — typically with a retail header card (branded) or clear polybag with a printed insert. Gift box packaging is also available for premium baby gifting programmes. We manage the pack configuration, header card artwork production and labelling to your specification. Confirm your pack format in the RFQ.",
  },
  {
    q: "What are the typical construction GSM ranges for babies versus older children?",
    a: "For newborn and infant (0–12 months), 120–150 GSM single jersey or muslin gauze is preferred for warmth-climate markets; rib 140–180 GSM for temperate climates. Toddler to pre-school (1–6 years): 140–170 GSM single jersey or interlock covers year-round. School age (6–12 years): 150–180 GSM interlock or French terry for durability. Organic muslin (90–120 GSM) is available for premium summer programmes across all infant ages.",
  },
  {
    q: "What are typical indicative lead times from sample approval to shipment?",
    a: "As an indicative guide: sample production 14–18 days from spec lock; bulk production 35–55 days from confirmed PO; pre-shipment inspection 3–5 days; sea freight 18–28 days from Karachi. OEKO-TEX test reports add 5–10 days if required as part of the shipment documentation. All timelines are indicative and depend on construction complexity, size range, decoration and factory scheduling. Your confirmed quotation includes a programme-specific timeline.",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function TShirtsForKidsContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip">

      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-t-shirts-for-kids.webp"
            fill
            alt="Pakistan kids T-shirt manufacturer — OEM organic cotton and combed jersey children's tees for USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-2xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/apparel/babyandkids/" className="hover:text-gold transition-colors">Baby & Kids</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">T-Shirts for Kids</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Baby &amp; Kids Apparel
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Kids T-Shirts
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl"
            >
              MZ Global Trading connects children&rsquo;s brands, retailers and baby boutiques with Pakistan&rsquo;s GOTS and OEKO-TEX Class&nbsp;1 certified knitwear factories. Organic cotton, combed jersey, interlock, muslin gauze. Newborn through 12 years.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">→</span>
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true"
        >
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ══ STATS ANCHOR ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Baby &amp; Kids T-Shirts — Pakistan Certified Knitwear</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Safety Certified. Fully Traceable. Newborn to 12 Years.</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Kids T-shirts demand more than adult garments — OEKO-TEX Class&nbsp;1, azo-free inks, envelope necklines for infants, GOTS traceability for organic programmes. Pakistan&rsquo;s certified knitwear factories produce to the exact specification international children&rsquo;s buyers require.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "6", label: "Fabric Constructions" },
                { val: "0–12", label: "Years Size Range" },
                { val: "50+", label: "Vetted Factories" },
                { val: "10+", label: "Certifications" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
            <Link href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit">
              Request a Quote <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ BENTO GRID ══════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
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
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3 border border-green-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    {c.badge && <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📏</span>
                <div>
                  <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Age &amp; Size Guide</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {AGE_SIZE_GUIDE.map((a) => (
                  <div key={a.group} className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${a.color}`}>{a.tag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-navy-900">{a.group}</p>
                      <p className="text-xs text-gray-400 truncate">{a.ages}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap hidden sm:block">{a.chest}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="Full Size Guide" />
            </motion.div>
          </div>

          {/* Row 2: GSM + Decoration + Colours + OEM */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">⚖️</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">GSM Weight Guide</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-navy-900">{t.gsm}</span>
                      <span className="text-gray-400">{t.name}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="GSM Details" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🎨</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Decoration Methods</h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{d.code}</span>
                    <span className="text-xs font-medium text-navy-900 leading-tight">{d.method}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Decoration Guide" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🌈</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Colour &amp; Dye</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name}>
                    <p className="text-xs font-semibold text-navy-900">{d.name}</p>
                    <div className="flex gap-1 mt-1">
                      {d.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${s}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colours" label="Colour Options" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🏭</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">OEM Capabilities</h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {OEM_FEATURES.slice(0, 4).map((f) => (
                  <div key={f.num} className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-gold mt-0.5">{f.num}</span>
                    <span className="text-xs font-medium text-navy-900">{f.title}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="OEM Details" />
            </motion.div>
          </div>

          {/* Row 3: Markets + Certifications + Export */}
          <div className="grid grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="col-span-5 lg:col-span-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🌍</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Export Markets</h3>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0">{s.abbr}</span>
                    <span className="text-xs font-medium text-navy-900">{s.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="Market Detail" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.07 }}
              className="col-span-5 lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🏅</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Certifications</h3>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">{c.name}</span>
                    {c.tier === "Essential" && <span className="text-[10px] text-gold">★</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="col-span-5 lg:col-span-1 bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🚢</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Export</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((t) => (
                  <div key={t.term} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">{t.term}</span>
                    <span className="text-xs text-gray-500 truncate">{t.port}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="Export Detail" />
            </motion.div>
          </div>

          {/* Row 4: Sustainability + Process */}
          <div className="grid grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="col-span-3 lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🌱</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Sustainability &amp; Safety</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {SUSTAINABILITY_ITEMS.map((s) => (
                  <div key={s.title} className="flex items-start gap-2">
                    <span className="text-lg" aria-hidden="true">{s.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{s.title}</p>
                      <span className="text-[10px] text-lime-700 font-medium">{s.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="Sustainability Detail" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-3 lg:col-span-1 bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col min-h-[200px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">⚙️</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.map((p) => (
                  <div key={p.num} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-200 text-sky-800 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <span className="text-xs font-medium text-navy-900">{p.short}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-process" label="Full Process" />
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
              <p className="font-semibold text-navy-900">Kids T-Shirt Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction guide, GSM selection and OEKO-TEX requirements for children&apos;s apparel programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Baby &amp; Kids Apparel Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, age-based sizing, certification requirements and compliance for kids garments.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Kids Apparel Spec Sheets &amp; Size Charts</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction specs, size grade charts for kids clothing and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Kids T-Shirts?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, age sizing, decoration and certification requirements. Factory match in 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 1 — CONSTRUCTIONS (Scandinavian UI + Tile Layout) ══════════ */}
      <section id="section-constructions" className="bg-[#F5F7F2] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Fabric Constructions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Kids T-Shirt Fabric Guide</h2>
            <p className="text-gray-600 max-w-2xl">Six constructions — from ultra-light muslin gauze for newborns to durable interlock for school-age programmes. All certified to OEKO-TEX Class 1 or GOTS where specified.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl" aria-hidden="true">{c.icon}</span>
                  {c.badge && (
                    <span className="text-[10px] font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-full">{c.badge}</span>
                  )}
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-1">{c.name}</h3>
                <p className="text-xs font-semibold text-green-600 mb-3">{c.gsm}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{c.detail}</p>
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Best for</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.best.map((b) => (
                      <span key={b} className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <p className="text-[10px] text-gray-400 leading-relaxed">{c.spec}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 2 — AGE & SIZE GUIDE (Infographic UI + Timeline) ══════════ */}
      <section id="section-sizes" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Size Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Age &amp; Size Guide — Newborn to 12 Years</h2>
            <p className="text-gray-600 max-w-2xl">Graded patterns from premature/newborn through 12 years. US, UK and EU size standards. Custom grading to your size chart on request.</p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute left-[120px] top-4 bottom-4 w-0.5 bg-blue-100" aria-hidden="true" />
            <div className="flex flex-col gap-4">
              {AGE_SIZE_GUIDE.map((a, i) => (
                <motion.div
                  key={a.group}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start"
                >
                  <div className="lg:w-[120px] shrink-0 flex lg:flex-col lg:items-end gap-2 lg:gap-1">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${a.color}`}>{a.tag}</span>
                    <span className="text-xs font-bold text-navy-900">{a.group}</span>
                  </div>
                  <div className="relative lg:pl-8 flex-1">
                    <div className="hidden lg:block absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-blue-300 bg-white" aria-hidden="true" />
                    <div className="bg-blue-50 rounded-xl p-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Age Range</p>
                        <p className="text-sm font-semibold text-navy-900 mt-0.5">{a.ages}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Chest</p>
                        <p className="text-sm font-semibold text-navy-900 mt-0.5">{a.chest}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Height</p>
                        <p className="text-sm font-semibold text-navy-900 mt-0.5">{a.height}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Notes</p>
                        <p className="text-xs text-gray-600 mt-0.5 leading-tight">{a.note}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-blue-50 rounded-xl p-5 flex gap-3 items-start">
            <span className="text-xl shrink-0" aria-hidden="true">ℹ️</span>
            <p className="text-xs text-gray-600 leading-relaxed">Sizing above is indicative and based on average body measurements. Final graded size charts are developed from your tech pack or confirmed size standard (US/UK/EU). Custom grading for non-standard age breaks available on request.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 3 — GSM WEIGHT (Card-Based UI + Card Layout) ══════════════ */}
      <section id="section-gsm" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Weight Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">GSM Weight Guide for Kids T-Shirts</h2>
            <p className="text-gray-600 max-w-2xl">Weight choice depends on target age group, market climate and season. Pakistan certified mills produce across the full range — 90 to 200 GSM.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GSM_TIERS.map((t, i) => (
              <motion.div
                key={t.gsm}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-7 relative overflow-hidden ${t.featured ? "bg-[#0D1B2A] text-white" : "bg-white border border-gray-100 shadow-sm"}`}
              >
                {t.featured && <div className="absolute top-4 right-4 text-[10px] font-bold text-navy-900 bg-gold px-2.5 py-1 rounded-full">Primary Range</div>}
                <div className="text-3xl font-bold mb-1" style={{ color: t.featured ? "#D4A017" : "#0D1B2A" }}>{t.gsm}</div>
                <div className={`text-lg font-bold mb-2 ${t.featured ? "text-white" : "text-navy-900"}`}>{t.name}</div>
                <div className={`text-xs font-semibold mb-4 ${t.featured ? "text-gold/80" : "text-purple-600"}`}>{t.season}</div>
                <p className={`text-sm leading-relaxed mb-4 ${t.featured ? "text-gray-300" : "text-gray-600"}`}>{t.desc}</p>
                <div className={`border-t pt-4 ${t.featured ? "border-white/10" : "border-gray-100"}`}>
                  <p className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${t.featured ? "text-gray-400" : "text-gray-400"}`}>Primary Markets</p>
                  <p className={`text-xs ${t.featured ? "text-gray-300" : "text-gray-600"}`}>{t.market}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 4 — DECORATION (Collage UI + Tile Layout) ════════════════ */}
      <section id="section-decoration" className="bg-[#FFFBF5] py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Decoration &amp; Print</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Safe Decoration Methods for Kids T-Shirts</h2>
            <p className="text-gray-600 max-w-2xl">All decoration on baby and kids products uses water-based, azo-free inks and adhesives only. No solvent inks. No PVC plastisol on OEKO-TEX Class 1 programmes.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DECO_METHODS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 20, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-rose-50"
              >
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 text-sm font-bold flex items-center justify-center shrink-0">{d.code}</span>
                  <div>
                    <h3 className="text-base font-bold text-navy-900 mb-1">{d.method}</h3>
                    <p className="text-xs text-gray-500 mb-3">{d.best}</p>
                    <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-3">
                      <span className="text-amber-500 text-sm shrink-0">⚠️</span>
                      <p className="text-xs text-amber-800 leading-relaxed">{d.note}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-green-50 rounded-xl p-5 flex gap-3 items-start border border-green-100">
            <span className="text-xl shrink-0" aria-hidden="true">✅</span>
            <div>
              <p className="text-sm font-bold text-navy-900 mb-1">Safety Commitment</p>
              <p className="text-xs text-gray-600 leading-relaxed">All decoration on baby and infant products is executed with OEKO-TEX Class 1 compliant materials only. Water-based inks, azo-free pigments and formaldehyde-free bonding adhesives are standard. Pre-production test reports available on request.</p>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 5 — COLOURS (Gradient UI + Swatch Grid) ══════════════════ */}
      <section id="section-colours" className="py-16 lg:py-24" style={{ background: "linear-gradient(135deg, #1a0533 0%, #0a1a3a 50%, #003333 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Colour Programmes</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Colour &amp; Dye Options</h2>
            <p className="text-gray-300 max-w-2xl">Full PMS colour matching with lab dip approval. Azo-free reactive dyes across all programmes. Baby pastel palettes and GOTS-certified organic dye options.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-base font-bold text-white mb-1">{d.name}</h3>
                <p className="text-xs text-gold/80 mb-4">{d.subtitle}</p>
                <div className="flex gap-2.5 mb-4">
                  {d.swatches.map((s, si) => (
                    <div key={si} className={`w-10 h-10 rounded-xl shadow-sm ${s}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-xs text-gray-300 leading-relaxed">
              <span className="text-gold font-semibold">Colour Matching Process:</span> Lab dip submitted for approval before bulk dyeing. ISO 105 X12 colour fastness standard maintained. Full PMS library matched to reactive dye capabilities. Pantone reference or physical fabric swatch required for lab dip submission.
            </p>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 6 — OEM (Swiss Design UI + Numbered List) ════════════════ */}
      <section id="section-oem" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">OEM Development</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6 leading-tight">Custom Kids T-Shirt Development</h2>
              <div className="w-16 h-0.5 bg-gold mb-8" />
              <p className="text-gray-600 leading-relaxed mb-6">
                MZ Global Trading manages the full OEM development cycle for kids T-shirt programmes — from fabric specification and grading through decoration, labelling and retail-ready packaging. Baby-safe construction and certification requirements built into every stage.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you&rsquo;re launching a boutique organic baby range or sourcing a 50-SKU school uniform programme, our factory network is matched to your specification, not the nearest available production slot.
              </p>
            </motion.div>
            <div className="flex flex-col gap-5">
              {OEM_FEATURES.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex gap-5 items-start"
                >
                  <span className="text-4xl font-bold text-gold/20 shrink-0 w-12 leading-none">{f.num}</span>
                  <div>
                    <h3 className="text-sm font-bold text-navy-900 mb-1">{f.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 7 — MARKETS (Dark Mode UI + Region Cards) ════════════════ */}
      <section id="section-markets" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Export Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Kids Apparel Export Markets</h2>
            <p className="text-gray-400 max-w-2xl">Serving children&rsquo;s brands, baby boutiques and wholesale distributors across 35+ markets. Certification requirements vary by market — GOTS and OEKO-TEX Class 1 demanded in EU, Japan and premium USA.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-xl bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">{s.abbr}</span>
                  <h3 className="text-sm font-bold text-white">{s.name}</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{s.detail}</p>
                <p className="text-[10px] text-gold/70 font-semibold">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { val: "35+", label: "Export Markets" },
              { val: "50+", label: "Vetted Factories" },
              { val: "95%", label: "On-Time Delivery" },
            ].map((stat) => (
              <div key={stat.label} className="text-center border border-white/10 rounded-xl p-5">
                <p className="text-3xl font-bold text-gold">{stat.val}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 8 — CERTIFICATIONS (Glassmorphism + Logo Grid) ═══════════ */}
      <section id="section-certs" className="py-16 lg:py-24" style={{ background: "linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 50%, #f3e5f5 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Certifications for Kids Apparel</h2>
            <p className="text-gray-600 max-w-2xl">Baby and children&rsquo;s products face the strictest compliance requirements globally. OEKO-TEX Class 1 and GOTS are non-negotiable for premium and EU markets.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="backdrop-blur-md bg-white/60 border border-white/70 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 relative shrink-0">
                    <Image src={c.img} fill alt={c.full} className="object-contain" sizes="40px" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{c.name}</p>
                    {c.tier === "Essential" && (
                      <span className="text-[10px] font-bold text-white bg-teal-600 px-2 py-0.5 rounded-full">Class 1</span>
                    )}
                    {c.tier === "Premium" && (
                      <span className="text-[10px] font-bold text-gold bg-gold/15 px-2 py-0.5 rounded-full">{c.tier}</span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 9 — EXPORT & PACKAGING (Grid UI + Table) ════════════════ */}
      <section id="section-export" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Logistics &amp; Packaging</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Export Terms &amp; Packaging Options</h2>
            <p className="text-gray-600 max-w-2xl">FOB Karachi is standard for most buyers. Multi-pack configurations and retail-ready packaging managed to your specification.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-navy-900 mb-4">Incoterms Available</h3>
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Term</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Port / Point</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {EXPORT_TERMS.map((t) => (
                      <tr key={t.term}>
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold text-navy-900 bg-amber-50 px-2 py-0.5 rounded">{t.term}</span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs font-semibold text-navy-900">{t.full}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <p className="text-xs text-gray-500">{t.port}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-navy-900 mb-4">Packaging Options</h3>
              <div className="grid grid-cols-2 gap-3">
                {PACK_OPTIONS.map((p) => (
                  <div key={p.label} className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                    <span className="text-xl" aria-hidden="true">{p.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{p.label}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{p.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-xs font-bold text-navy-900 mb-1">Lead Times (indicative)</p>
                <div className="flex flex-col gap-1.5 mt-2">
                  {LEAD_STAGES.map((l) => (
                    <div key={l.stage} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${l.color}`} />
                      <span className="text-xs text-gray-700 flex-1">{l.stage}</span>
                      <span className="text-xs font-semibold text-navy-900 whitespace-nowrap">{l.days} days</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-amber-700 mt-3 italic">All lead times are indicative. Confirmed programme timelines provided with quotation.</p>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 10 — SUSTAINABILITY (Moodboard UI + Bullet List) ══════════ */}
      <section id="section-sustainability" className="bg-[#F0F7EE] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Safety &amp; Sustainability</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Safe. Certified. Responsible.</h2>
            <p className="text-gray-600 max-w-2xl">Kids apparel demands the highest standards — OEKO-TEX Class 1 for chemical safety, GOTS for organic traceability, azo-free dyes throughout. Every programme is built on verified compliance.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="text-3xl mb-3" aria-hidden="true">{s.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-bold text-navy-900">{s.title}</h3>
                </div>
                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{s.tag}</span>
                <p className="text-xs text-gray-500 leading-relaxed mt-3">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 11 — PROCESS (Material Design + Workflow) ════════════════ */}
      <section id="section-process" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Sourcing Process — Kids T-Shirts</h2>
            <p className="text-gray-600 max-w-2xl">From RFQ to shipment, we manage factory selection, sampling, production QC and export logistics — with baby-safe certification requirements built into every stage.</p>
          </motion.div>
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-100" aria-hidden="true" />
            <div className="flex flex-col gap-8">
              {PROCESS_STEPS.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`flex flex-col lg:flex-row gap-6 lg:gap-12 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className={`flex-1 ${i % 2 === 1 ? "lg:text-right" : ""}`}>
                    <div className={`inline-flex items-center gap-3 mb-3 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                      <span className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 text-sm font-bold flex items-center justify-center shadow-sm">{p.num}</span>
                      <h3 className="text-base font-bold text-navy-900">{p.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="hidden lg:flex w-8 shrink-0 justify-center">
                    <div className="w-4 h-4 rounded-full bg-sky-500 border-2 border-white shadow-md mt-2" />
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Common Questions</p>
            <h2 className="text-3xl font-bold text-navy-900">Frequently Asked Questions</h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  aria-expanded={faqOpen === i}
                >
                  <span className="text-sm font-semibold text-navy-900 leading-snug">{f.q}</span>
                  <motion.span
                    animate={{ rotate: faqOpen === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gold text-xl font-light shrink-0"
                    aria-hidden="true"
                  >+</motion.span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">{f.a}</p>
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
              { name: "Swaddle Muslin Fabric", desc: "Single muslin, double gauze and bamboo blends. GOTS and OEKO-TEX Class 1 certified.", href: "/apparel/babyandkids/swaddlemuslinfabric/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan swaddle muslin manufacturer — OEM organic cotton muslin fabric for baby brands worldwide" },
              { name: "Overalls", desc: "Infant denim, canvas and corduroy overalls with snap hardware and OEKO-TEX compliance.", href: "/apparel/babyandkids/overalls/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby overalls manufacturer — OEM infant denim and canvas overalls for kids brands worldwide" },
              { name: "Baby Rompers", desc: "Short and long-sleeve rompers in organic cotton jersey. Snap crotch and envelope neck options.", href: "/apparel/babyandkids/babyrompers/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby romper manufacturer — OEM organic cotton infant rompers for baby boutiques worldwide" },
              { name: "Baby Bibs", desc: "Terry, velour and silicone bib constructions for newborn to toddler programmes.", href: "/apparel/babyandkids/babybibs/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby bib manufacturer — OEM terry and silicone bibs for infant product brands worldwide" },
              { name: "Baby Hooded Towels", desc: "OEKO-TEX terry hooded towels for infants and toddlers. Embroidery and appliqué options.", href: "/apparel/babyandkids/babyhoodedtowels/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby hooded towel manufacturer — OEM OEKO-TEX terry hooded towels for infant brands worldwide" },
            ].filter(p => !p.href.includes("tshirtsforkids")).map((p) => (
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

      {/* ══ FINAL CTA ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0D1B2A] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Start Your Programme</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Source Kids T-Shirts?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Share your construction, size range, decoration, quantity and certification requirements. We&rsquo;ll match your programme to the right certified Pakistan factory and respond within 3–5 working days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
