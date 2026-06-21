"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion-shim";

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
    id: "single-muslin",
    name: "Single Layer Muslin",
    badge: "Summer Essential",
    gsm: "90–110 GSM",
    weave: "Plain open weave — lightweight, maximum airflow",
    hand: "Delicate, airy, gets softer with every wash",
    best: ["Tropical Markets", "Warm Climate", "Summer Baby Ranges"],
    detail: "Single layer muslin is the lightest swaddle construction — an open plain weave of fine cotton yarn that allows maximum air circulation around the baby. Standard weight is 90–110 GSM, making it ideal for warm climates, summer collections and tropical markets. It softens progressively with each wash — a quality that parents in boutique organic markets specifically seek and trust.",
    spec: "100% organic cotton single muslin. GSM 90–110. GOTS certified processing. Typically sold natural/undyed or in pale reactive-dyed tones.",
    icon: "🌬️",
  },
  {
    id: "double-gauze",
    name: "Double Gauze (Double Muslin)",
    badge: "Most Popular",
    gsm: "110–130 GSM",
    weave: "Two muslin layers bonded at intervals — body with breathability",
    hand: "Soft drape, gentle body, wraps around baby naturally",
    best: ["Premium Baby Brands", "EU Organic", "USA Boutique"],
    detail: "Double gauze — two layers of muslin bonded at intervals — is the industry-standard swaddle construction in premium baby markets globally. It adds gentle body and warmth while maintaining breathability. The double layer structure makes it more durable than single muslin and the natural drape wraps perfectly around newborns. Growing strongly in US DTC, EU organic retail and Japan.",
    spec: "100% organic cotton double gauze. GSM 110–130. GOTS certified. Woven at fine gauge for softness. Reactive or low-impact dyed.",
    icon: "🧸",
  },
  {
    id: "jersey-knit",
    name: "Jersey Knit Swaddle",
    badge: "Stretch Favourite",
    gsm: "120–150 GSM",
    weave: "Single jersey knit — 4-way stretch for easy swaddling",
    hand: "Stretchy, forgiving, wraps without re-securing",
    best: ["USA Mainstream", "UK Baby Retail", "Value Programmes"],
    detail: "Jersey knit swaddles are popular in mainstream US and UK baby retail for the simple reason that stretch makes swaddling easier for new parents. The 4-way stretch of single jersey allows the swaddle to wrap naturally without needing to be re-secured. Available in 100% cotton or cotton-spandex blends. More affordable than double gauze and well-suited to multi-pack value sets.",
    spec: "100% combed cotton jersey or 95/5 cotton-spandex. GSM 120–150. OEKO-TEX Class 1. Reactive dyed, full PMS range.",
    icon: "🔄",
  },
  {
    id: "bamboo-muslin",
    name: "Bamboo Muslin",
    badge: "Ultra-Soft Premium",
    gsm: "100–130 GSM",
    weave: "Open plain weave in bamboo viscose — naturally thermoregulating",
    hand: "Exceptionally soft, temperature-regulating, hypoallergenic",
    best: ["Luxury Baby Brands", "USA/EU Premium", "Sensitive Skin"],
    detail: "Bamboo muslin blends (typically 70% bamboo viscose / 30% organic cotton) are the premium tier of the swaddle category — exceptionally soft, naturally hypoallergenic and temperature-regulating without chemical finishes. Growing demand in USA luxury baby DTC, EU premium boutique and Japanese baby retail. OEKO-TEX Class 1 certified processing mandatory for this construction.",
    spec: "70% bamboo viscose / 30% organic cotton. GSM 100–130. OEKO-TEX Class 1. No chemical softeners required — natural softness.",
    icon: "🎋",
  },
];

const SIZE_GUIDE = [
  { size: "100×100 cm", label: "Compact Swaddle", use: "Newborn wrap, facecloth, small blanket", market: "EU / Compact formats" },
  { size: "120×120 cm", label: "Standard Swaddle", use: "Universal newborn to 3 months swaddle — industry standard", market: "USA · UK · EU · Australia" },
  { size: "120×150 cm", label: "Extended Swaddle", use: "Suitable from newborn through 6–9 months", market: "USA · Canada · Middle East" },
  { size: "47\"×47\" (119×119)", label: "US Standard", use: "Dominant US retail size — typically in 3-pack sets", market: "USA — primary retail size" },
  { size: "50\"×50\" (127×127)", label: "US Large", use: "Premium US DTC and boutique size", market: "USA boutique / DTC" },
  { size: "Custom", label: "To Specification", use: "Any size to buyer specification — min order applies", market: "All markets" },
];

const GSM_TIERS = [
  { gsm: "90–110", name: "Ultra-Light", season: "Warm Climate / Summer", market: "Tropical · Middle East · Australia · SE Asia", pct: 30, desc: "Single muslin — maximum airflow. Ideal for newborns in hot climates. Highest breathability, lightest drape.", color: "bg-sky-300", featured: false },
  { gsm: "110–130", name: "Standard Premium", season: "Year-Round", market: "USA · UK · EU — primary range", pct: 85, desc: "Double gauze and bamboo muslin. Industry standard for premium baby brands. Perfect balance of body, softness and breathability.", color: "bg-gold", featured: true },
  { gsm: "130–160", name: "Structured Warm", season: "A/W / Cool Climate", market: "Canada · Nordics · Northern EU", pct: 50, desc: "Jersey knit swaddles. More body and warmth for cooler climates and autumn/winter baby collections.", color: "bg-indigo-400", featured: false },
];

const DECO_METHODS = [
  { code: "WBP", method: "Water-Based Screen Print", best: "Geometric patterns, brand marks, edge prints", note: "Water-based reactive inks only. Azo-free mandatory for OEKO-TEX Class 1." },
  { code: "DTG", method: "Digital / DTG Print", best: "Illustrated designs, small-run personalised prints", note: "Safe water-based inks. Single or double gauze. No heat curing solvents." },
  { code: "YDD", method: "Yarn-Dyed Pattern", best: "Woven-in stripes, checks, grid patterns — no print ink needed", note: "Cleanest option for organic programmes — pattern created in the weave, not printed." },
  { code: "PLN", method: "Plain / Undyed", best: "Natural ecru, white — premium organic ranges", note: "Most popular in German/Scandinavian organic baby. No dye processing — lowest footprint." },
];

const DYE_OPTIONS = [
  { name: "Undyed / Natural Ecru", subtitle: "No Dye — Lowest Impact", note: "Natural cotton colour. No dyeing process. Preferred by Nordic and German organic baby brands.", swatches: ["bg-stone-100", "bg-amber-50", "bg-yellow-50", "bg-white border border-gray-200", "bg-stone-50"] },
  { name: "Low-Impact Reactive Dye", subtitle: "GOTS Certified Colours", note: "GOTS-approved azo-free reactive dyes. Soft pastel and muted natural tones most popular for baby.", swatches: ["bg-rose-100", "bg-sky-100", "bg-green-100", "bg-purple-100", "bg-yellow-100"] },
  { name: "Yarn-Dyed (Woven-In)", subtitle: "Pattern Without Print", note: "Colour applied to yarn before weaving — creates organic stripes and grid patterns without printing ink on the finished product.", swatches: ["bg-slate-200", "bg-rose-200", "bg-sky-200", "bg-green-200", "bg-amber-200"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Full organic chain-of-custody from farm to finished product. Mandatory for 'organic cotton' claims.", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100 — Class 1", desc: "Class 1 (baby/infant): strictest chemical safety threshold. Tested for 100+ harmful substances.", tier: "Essential", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — labour standards and worker welfare verified", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data sharing platform", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control certification", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance certification", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Responsible cotton farming practices for non-organic programmes", tier: "Optional", img: "/images/certs/cert-bci.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Custom Size Development", desc: "Any size to buyer specification — US, UK and EU standard formats or fully custom dimensions. Graded seam and hem spec to your tech pack." },
  { num: "02", title: "GOTS Organic Certification", desc: "Full GOTS-certified organic cotton chain-of-custody documentation. Transaction certificates issued at each stage from fibre to finished product." },
  { num: "03", title: "Print Development", desc: "Water-based screen print and DTG with GOTS-approved inks. Yarn-dyed patterns developed at the weave stage — no printing ink on finished product." },
  { num: "04", title: "Multi-Pack Configurations", desc: "2-pack, 3-pack, 5-pack sets with retail header cards or gift box packaging. Common formats in US and EU baby retail." },
  { num: "05", title: "Custom Labelling", desc: "Tagless printing, woven neck labels (if applicable), care labels and hang tags to your specification and compliance language requirements." },
  { num: "06", title: "Gift & Premium Packaging", desc: "Gift boxes, linen pouches, organza bags and custom printed inserts for premium baby gifting programmes and DTC brands." },
];

const SECTORS = [
  { abbr: "BB", name: "Baby Boutiques", detail: "Organic muslin and bamboo gauze for premium independent baby boutiques in USA, EU and Australia", market: "USA · EU · Australia · Japan" },
  { abbr: "BD", name: "Baby DTC Brands", detail: "Custom-branded swaddle packs for direct-to-consumer Shopify and Amazon baby brands", market: "USA · UK · EU · Canada" },
  { abbr: "KR", name: "Kids Retail Chains", detail: "Multi-pack swaddle sets in standard formats for mass and mid-market baby retail", market: "USA · UK · Middle East" },
  { abbr: "HG", name: "Hospital & Gift", detail: "Plain white or soft-tone muslin swaddles for hospital gifting programmes and maternal gifting", market: "USA · UK · Middle East" },
  { abbr: "WD", name: "Wholesale Distributors", detail: "Multi-brand distributors supplying regional baby boutiques and pharmacy chains", market: "USA · EU · Middle East" },
  { abbr: "EB", name: "Eco Brands", detail: "GOTS-certified organic programmes for environmentally-conscious baby brands — Germany, Nordics", market: "EU · Australia · Japan" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to nominated port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight; buyer arranges marine insurance." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer manages all logistics from factory gate. Lowest price." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Folded bulk export" },
  { icon: "🎁", label: "Gift Box", note: "Premium retail / gifting" },
  { icon: "📋", label: "3-Pack Header Card", note: "US & EU baby retail" },
  { icon: "👝", label: "Linen / Muslin Pouch", note: "Premium DTC packaging" },
  { icon: "🎀", label: "Organza Gift Bag", note: "Luxury baby gifting" },
  { icon: "✏️", label: "Custom Pack", note: "To your brand brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory shortlist, pricing and GOTS certification confirmation", color: "bg-gold" },
  { stage: "Sample Production", days: "14–18", desc: "Swaddle samples to size, weight and print specification", color: "bg-green-500" },
  { stage: "Bulk Production", days: "30–50", desc: "From confirmed PO and approved sample", color: "bg-teal-500" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection and OEKO-TEX test report", color: "bg-blue-500" },
  { stage: "Sea Freight", days: "18–28", desc: "FCL/LCL from Karachi or Port Qasim", color: "bg-indigo-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "GOTS Organic Cotton", desc: "Full chain-of-custody from certified organic farm to finished swaddle. No synthetic pesticides, GOTS-approved dyes only.", tag: "GOTS" },
  { icon: "🧪", title: "OEKO-TEX Class 1", desc: "Strictest chemical safety test — all 100+ harmful substances tested at infant thresholds. Mandatory for newborn products.", tag: "OEKO-TEX" },
  { icon: "💧", title: "Low-Impact & Undyed Options", desc: "Natural undyed and yarn-dyed options require no dye processing — lowest water and chemical footprint in the category.", tag: "Low-Impact" },
  { icon: "♻️", title: "Responsible Cotton Sourcing", desc: "BCI Better Cotton for conventional programmes. Full GOTS traceability for organic. No GMO cotton in organic supply chain.", tag: "BCI / GOTS" },
  { icon: "🏭", title: "Audited Factory Network", desc: "BSCI and Sedex audited knitwear and woven fabric factories. Worker welfare independently verified.", tag: "BSCI" },
  { icon: "📦", title: "Sustainable Packaging", desc: "Recycled polybags, FSC paper boxes and soy-ink printing. Linen pouches replacing plastic bags for premium DTC orders.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction (muslin/double gauze/bamboo), size, quantity, print or undyed spec, certification requirements and target market." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We match to 2–3 GOTS/OEKO-TEX Class 1 certified Pakistan factories with muslin and gauze weaving capability." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Swaddle samples to size, construction and print spec. Washed and softness-tested before submission. 14–18 days from spec lock." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review construction, size, hand feel, print/colour and packaging. OEKO-TEX test report submitted if required. No bulk until approved." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "GOTS-certified production with inline quality checks. Full documentation: transaction certificates, test reports, packing list." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection. FCL/LCL from Karachi. GOTS transaction certificates, B/L, C/O, test reports included in documentation package." },
];

const FAQS = [
  {
    q: "What is the difference between single muslin and double gauze for swaddles?",
    a: "Single muslin is one open-weave layer — lightest (90–110 GSM), maximum airflow, ideal for warm climates and summer. Double gauze (double muslin) is two muslin layers bonded at intervals — adds gentle body and drape, still breathable, 110–130 GSM. Double gauze is the premium standard in US boutique, EU organic and Japan baby retail. Single muslin suits warm-climate markets and value programmes.",
  },
  {
    q: "Do you offer GOTS certified organic cotton for swaddle muslin programmes?",
    a: "Yes. GOTS-certified organic cotton is available across all muslin and double gauze constructions. We source from GOTS-certified mills and can provide transaction certificates at each supply chain stage. GOTS certification covers the full chain: certified farm → spinning → weaving → dyeing → finishing → garment. For 'organic' claims on product labels or retailer compliance requirements, GOTS certification is required — not just organic fibre content.",
  },
  {
    q: "What print options are available and which are safest for newborn swaddles?",
    a: "The safest print options for newborn swaddles: (1) Undyed / natural — no dye processing at all; (2) Yarn-dyed patterns — colour applied to yarn before weaving, no ink on the finished product; (3) Water-based screen print or DTG with GOTS-approved azo-free inks. All print on OEKO-TEX Class 1 products uses water-based reactive inks only — no plastisol PVC, no solvent inks. We recommend pre-production test reports for any print applied to infant products.",
  },
  {
    q: "What are standard swaddle sizes and which format is most popular for US retail?",
    a: "US retail standard is 47\"×47\" (approximately 120×120 cm) — this is the dominant format in multi-pack sets sold via US baby chains and DTC brands. 50\"×50\" (127×127 cm) is a premium US boutique size. EU markets more commonly use 120×120 cm (metric equivalent). The 3-pack or 5-pack is the dominant US retail pack format with a printed header card. We produce any size to your specification.",
  },
  {
    q: "What are typical indicative lead times for swaddle muslin programmes?",
    a: "As an indicative guide: sample production 14–18 days from spec lock; bulk production 30–50 days from confirmed PO (shorter than garments — no cutting and sewing complexity); pre-shipment QC 3–5 days; sea freight 18–28 days. GOTS transaction certificates add 3–5 days to documentation. OEKO-TEX test reports 5–10 days if required. All timelines are indicative and depend on construction, print complexity, quantity and factory scheduling.",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function SwaddleMuslinContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip">

      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-apparel.webp"
            fill
            alt="Pakistan swaddle muslin manufacturer — GOTS organic cotton double gauze baby wraps for USA, UK and Europe"
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
              <span className="text-gold">Swaddle Muslin Fabric</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Pakistan Baby Textiles
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Swaddle Muslin
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
              MZ Global Trading connects baby brands, boutiques and wholesale distributors with Pakistan&rsquo;s GOTS and OEKO-TEX Class&nbsp;1 certified muslin factories. Organic cotton, bamboo muslin, double gauze. Newborn safe. Custom sizes and multi-pack sets.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">→</span>
              </Link>
              <button onClick={() => scrollToId("bento-grid")} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Explore Product Guide
              </button>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ══ STATS ANCHOR ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Swaddle Muslin — Pakistan Certified Textile</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Organic. Certified. Newborn Safe.</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Swaddle muslin is the most safety-sensitive category in baby textiles — OEKO-TEX Class&nbsp;1 and GOTS certification are the non-negotiable standard for EU, USA premium and Japan markets. Pakistan&rsquo;s certified muslin factories deliver to these exact requirements at volume.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "4", label: "Constructions" },
                { val: "90–160", label: "GSM Range" },
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

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-stone-50 border border-stone-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌿</span>
                <div>
                  <p className="text-stone-500 text-xs font-semibold tracking-[0.2em] uppercase">Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Muslin Constructions</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3 border border-stone-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    </div>
                    {c.badge && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full whitespace-nowrap">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-sky-50 border border-sky-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Standard Sizes</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {SIZE_GUIDE.map((s) => (
                  <div key={s.size} className="flex items-start gap-3 bg-white rounded-xl p-2.5 border border-sky-100">
                    <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-1 rounded whitespace-nowrap">{s.size}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-navy-900">{s.label}</p>
                      <p className="text-[10px] text-gray-400 truncate">{s.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="Size Guide" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { icon: "⚖️", title: "GSM Guide", bg: "bg-purple-50", border: "border-purple-100", section: "section-gsm", content: GSM_TIERS.map(t => <div key={t.gsm} className="flex items-center gap-2 mt-1"><div className={`h-1.5 rounded-full ${t.color}`} style={{ width: `${t.pct * 0.7}%` }} /><span className="text-[10px] text-gray-500">{t.gsm}</span></div>) },
              { icon: "🎨", title: "Print Options", bg: "bg-rose-50", border: "border-rose-100", section: "section-decoration", content: DECO_METHODS.map(d => <div key={d.code} className="flex gap-2 mt-1.5"><span className="text-[10px] font-bold text-rose-600 w-8 shrink-0">{d.code}</span><span className="text-xs text-navy-900">{d.method}</span></div>) },
              { icon: "🌈", title: "Colour Options", bg: "bg-yellow-50", border: "border-yellow-100", section: "section-colours", content: DYE_OPTIONS.map(d => <div key={d.name} className="mt-1.5"><p className="text-[10px] text-gray-500">{d.subtitle}</p><div className="flex gap-1 mt-0.5">{d.swatches.slice(0,4).map((s,i) => <div key={i} className={`w-3 h-3 rounded-full ${s}`} />)}</div></div>) },
              { icon: "🏭", title: "OEM Capabilities", bg: "bg-slate-50", border: "border-slate-200", section: "section-oem", content: OEM_FEATURES.slice(0,4).map(f => <div key={f.num} className="flex gap-2 mt-1.5"><span className="text-[10px] font-bold text-gold">{f.num}</span><span className="text-xs text-navy-900">{f.title}</span></div>) },
            ].map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className={`${card.bg} border ${card.border} rounded-2xl p-6 flex flex-col min-h-[220px]`}>
                <span className="text-2xl mb-2" aria-hidden="true">{card.icon}</span>
                <h3 className="text-sm font-bold text-navy-900 mb-2">{card.title}</h3>
                <div className="flex-1">{card.content}</div>
                <ExploreBtn sectionId={card.section} label="Detail" />
              </motion.div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="col-span-5 lg:col-span-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col min-h-[200px]">
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

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.07 }} className="col-span-5 lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-6 flex flex-col min-h-[200px]">
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

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }} className="col-span-5 lg:col-span-1 bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col min-h-[200px]">
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

          {/* Row 4 */}
          <div className="grid grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="col-span-3 lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col min-h-[180px]">
              <span className="text-2xl mb-3" aria-hidden="true">🌱</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Sustainability &amp; Safety</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {SUSTAINABILITY_ITEMS.map((s) => (
                  <div key={s.title} className="flex items-start gap-2">
                    <span className="text-lg" aria-hidden="true">{s.icon}</span>
                    <div><p className="text-xs font-semibold text-navy-900">{s.title}</p><span className="text-[10px] text-green-700 font-medium">{s.tag}</span></div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="Sustainability Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="col-span-3 lg:col-span-1 bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col min-h-[180px]">
              <span className="text-2xl mb-3" aria-hidden="true">⚙️</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.map((p) => (
                  <div key={p.num} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
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
              <p className="font-semibold text-navy-900">Muslin &amp; Baby Textile Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction guide for single and double gauze, GOTS compliance and market positioning for baby retailers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Organic Baby Textiles Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, OEKO-TEX Class 1 and GOTS documentation for baby programme development.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Muslin Spec Sheets &amp; Size Charts</p>
              <p className="text-xs text-gray-500 leading-relaxed">Swaddle construction specs, size grade charts and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Swaddle Muslin?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, size range, print and certification requirements. Factory match and quotation in 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 1 — CONSTRUCTIONS (Typography-Driven UI + Text Paragraph) ══ */}
      <section id="section-constructions" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
            <p className="text-stone-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Constructions</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-4 leading-tight">Muslin Constructions <span className="text-gold">—</span> Four Tiers</h2>
            <p className="text-gray-600 max-w-2xl text-lg">From ultra-light single muslin to premium bamboo gauze. Every construction OEKO-TEX Class 1 certified or GOTS traceable.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="border-l-4 border-gold pl-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-2xl" aria-hidden="true">{c.icon}</span>
                    <h3 className="text-xl font-bold text-navy-900 mt-2">{c.name}</h3>
                    <p className="text-sm text-gold font-semibold mt-0.5">{c.gsm} · {c.weave}</p>
                  </div>
                  {c.badge && <span className="text-[10px] font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-full shrink-0 ml-4">{c.badge}</span>}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.detail}</p>
                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Spec</p>
                  <p className="text-xs text-gray-600">{c.spec}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.best.map((b) => (
                    <span key={b} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full">{b}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 2 — SIZES (Grid UI + Table) ════════════════════════════════ */}
      <section id="section-sizes" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Size Reference</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Standard Swaddle Sizes</h2>
            <p className="text-gray-600 max-w-2xl">US 47″×47″ dominates retail; EU uses 120×120 cm. Custom sizes to any specification.</p>
          </motion.div>
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0D1B2A]">
                  {["Size", "Format", "Primary Use", "Key Market"].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-300 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SIZE_GUIDE.map((s, i) => (
                  <motion.tr key={s.size} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="hover:bg-sky-50 transition-colors">
                    <td className="px-5 py-4"><span className="text-sm font-bold text-navy-900">{s.size}</span></td>
                    <td className="px-5 py-4"><span className="text-xs font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">{s.label}</span></td>
                    <td className="px-5 py-4 text-xs text-gray-600">{s.use}</td>
                    <td className="px-5 py-4 text-xs text-gray-500">{s.market}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 3 — GSM (Infographic UI + Layered Visual) ════════════════ */}
      <section id="section-gsm" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Weight Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">GSM Weight Guide</h2>
            <p className="text-gray-400 max-w-2xl">Lighter is not always better for swaddles — the right weight depends on target climate, age group and market expectations.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GSM_TIERS.map((t, i) => (
              <motion.div key={t.gsm} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-7 ${t.featured ? "bg-gold" : "bg-white/5 border border-white/10"}`}
              >
                <div className={`text-4xl font-bold mb-2 ${t.featured ? "text-navy-900" : "text-gold"}`}>{t.gsm}</div>
                <div className={`text-lg font-bold mb-1 ${t.featured ? "text-navy-900" : "text-white"}`}>{t.name}</div>
                <div className={`text-xs font-semibold mb-4 ${t.featured ? "text-navy-900/70" : "text-gold/70"}`}>{t.season}</div>
                <p className={`text-sm leading-relaxed mb-4 ${t.featured ? "text-navy-900/80" : "text-gray-300"}`}>{t.desc}</p>
                <p className={`text-[10px] font-semibold ${t.featured ? "text-navy-900/60" : "text-gray-400"}`}>{t.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 4 — DECORATION (Minimal UI + Bullet List) ════════════════ */}
      <section id="section-decoration" className="bg-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Print &amp; Decoration</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Safe Print Methods for Swaddle Muslin</h2>
            <p className="text-gray-600 max-w-xl">All printing uses water-based azo-free inks or yarn-dyed processes only. No solvent inks permitted on newborn products.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DECO_METHODS.map((d, i) => (
              <motion.div key={d.code} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }} className="flex gap-5">
                <span className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold text-navy-900 flex items-center justify-center shrink-0">{d.code}</span>
                <div>
                  <h3 className="text-base font-bold text-navy-900 mb-1">{d.method}</h3>
                  <p className="text-xs text-gray-500 mb-2">{d.best}</p>
                  <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 leading-relaxed">{d.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 5 — COLOURS (Monochrome UI + Swatch Grid) ════════════════ */}
      <section id="section-colours" className="bg-stone-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-stone-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Colour Programmes</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Natural Tones. Safe Colours.</h2>
            <p className="text-gray-600 max-w-2xl">Swaddle muslin colour palettes lean towards naturals and soft pastels — undyed ecru, GOTS-certified pale tones and yarn-dyed patterns.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div key={d.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-navy-900 mb-1">{d.name}</h3>
                <p className="text-xs text-stone-500 mb-4">{d.subtitle}</p>
                <div className="flex gap-3 mb-4">
                  {d.swatches.map((s, si) => (
                    <div key={si} className={`w-12 h-12 rounded-xl shadow-sm ${s}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 6 — OEM (Corporate UI + Numbered List) ══════════════════ */}
      <section id="section-oem" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">OEM Development</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6 leading-tight">Custom Swaddle Development</h2>
              <div className="w-16 h-0.5 bg-gold mb-8" />
              <p className="text-gray-600 leading-relaxed mb-6">From custom size grading and print artwork through GOTS documentation and retail-ready packaging, MZ Global Trading manages the full development cycle for swaddle muslin programmes.</p>
              <p className="text-gray-600 leading-relaxed">Our factory network holds GOTS and OEKO-TEX Class 1 certification — the two requirements demanded by premium baby retailers in EU, USA and Japan. Certification documentation available for every bulk shipment.</p>
            </motion.div>
            <div className="flex flex-col gap-5">
              {OEM_FEATURES.map((f, i) => (
                <motion.div key={f.num} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }} className="flex gap-5 items-start border-b border-gray-50 pb-5">
                  <span className="text-3xl font-bold text-gold/25 shrink-0 w-10 leading-none">{f.num}</span>
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

      {/* ══ SECTION 7 — MARKETS (Isometric UI + Region Cards) ════════════════ */}
      <section id="section-markets" className="bg-slate-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Export Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Global Baby Market Coverage</h2>
            <p className="text-gray-400 max-w-2xl">Serving baby boutiques, DTC brands and distributors across 35+ markets. GOTS and OEKO-TEX Class 1 documentation available for all premium market requirements.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTORS.map((s, i) => (
              <motion.div key={s.abbr} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-gold/15 text-gold text-xs font-bold flex items-center justify-center">{s.abbr}</span>
                  <h3 className="text-sm font-bold text-white">{s.name}</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{s.detail}</p>
                <p className="text-[10px] text-gold/70 font-semibold">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[{ val: "35+", label: "Export Markets" }, { val: "50+", label: "Vetted Factories" }, { val: "95%", label: "On-Time Delivery" }].map((stat) => (
              <div key={stat.label} className="text-center border border-white/10 rounded-xl p-5">
                <p className="text-3xl font-bold text-gold">{stat.val}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 8 — CERTIFICATIONS (Skeuomorphic UI + Badge Grid) ════════ */}
      <section id="section-certs" className="bg-[#F8F6F0] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Certifications — Baby Textile Standards</h2>
            <p className="text-gray-600 max-w-2xl">OEKO-TEX Class 1 and GOTS are the two non-negotiable certifications for premium baby muslin programmes worldwide.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] border border-stone-100"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 relative shrink-0 bg-gray-50 rounded-xl p-1">
                    <Image src={c.img} fill alt={c.full} className="object-contain p-1" sizes="48px" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{c.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.tier === "Essential" ? "bg-teal-100 text-teal-700" : c.tier === "Premium" ? "bg-gold/15 text-gold" : "bg-gray-100 text-gray-500"}`}>{c.tier === "Essential" ? "Class 1 Baby" : c.tier}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 9 — EXPORT (Editorial UI + Timeline) ═════════════════════ */}
      <section id="section-export" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Logistics</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Export Terms &amp; Lead Times</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm font-bold text-navy-900 mb-5">Incoterms</h3>
              <div className="space-y-3">
                {EXPORT_TERMS.map((t, i) => (
                  <motion.div key={t.term} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex gap-4">
                    <span className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">{t.term}</span>
                    <div>
                      <p className="text-sm font-bold text-navy-900">{t.full}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                      <p className="text-xs text-amber-600 mt-0.5">{t.port}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="text-sm font-bold text-navy-900 mb-4">Packaging Options</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {PACK_OPTIONS.map((p) => (
                    <div key={p.label} className="bg-amber-50 rounded-xl p-3 flex items-start gap-2.5">
                      <span className="text-lg" aria-hidden="true">{p.icon}</span>
                      <div><p className="text-xs font-semibold text-navy-900">{p.label}</p><p className="text-[10px] text-gray-500">{p.note}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-navy-900 mb-5">Indicative Lead Times</h3>
              <div className="relative pl-8">
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-amber-100" aria-hidden="true" />
                {LEAD_STAGES.map((l, i) => (
                  <motion.div key={l.stage} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative mb-6">
                    <div className={`absolute -left-5 top-1.5 w-3 h-3 rounded-full ${l.color}`} />
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-navy-900">{l.stage}</p>
                        <span className="text-sm font-bold text-gold">{l.days} days</span>
                      </div>
                      <p className="text-xs text-gray-500">{l.desc}</p>
                    </div>
                  </motion.div>
                ))}
                <p className="text-[10px] text-amber-600 italic pl-0">All lead times are indicative. Confirmed timelines provided with quotation.</p>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 10 — SUSTAINABILITY (Swiss Design UI + Matrix) ══════════ */}
      <section id="section-sustainability" className="bg-[#F2F7F2] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Safety &amp; Sustainability</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Built for Baby. Certified for Planet.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200 rounded-2xl overflow-hidden">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="p-6 border-b border-r border-gray-200 bg-white last:border-b-0"
              >
                <div className="text-3xl mb-3" aria-hidden="true">{s.icon}</div>
                <h3 className="text-sm font-bold text-navy-900 mb-1">{s.title}</h3>
                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{s.tag}</span>
                <p className="text-xs text-gray-600 leading-relaxed mt-3">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 11 — PROCESS (Flat Design UI + Process Flow) ════════════ */}
      <section id="section-process" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-stone-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Sourcing Process</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="relative text-center p-5">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] border-l-gray-200 translate-x-full z-10" aria-hidden="true" />
                )}
                <div className="w-12 h-12 rounded-2xl bg-stone-100 text-navy-900 text-lg font-bold flex items-center justify-center mx-auto mb-3">{p.num}</div>
                <p className="text-xs font-bold text-navy-900 mb-1">{p.title}</p>
                <p className="text-[10px] text-gray-400 leading-tight">{p.desc.slice(0, 60)}…</p>
              </motion.div>
            ))}
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
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4" onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}>
                  <span className="text-sm font-semibold text-navy-900 leading-snug">{f.q}</span>
                  <motion.span animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-gold text-xl font-light shrink-0" aria-hidden="true">+</motion.span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
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
              { name: "T-Shirts for Kids", desc: "Combed cotton jersey for infants and children. Screen print, appliqué and embroidery programmes.", href: "/apparel/babyandkids/tshirtsforkids/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan kids t-shirt manufacturer — OEM combed cotton children's apparel for baby boutiques worldwide" },
              { name: "Overalls", desc: "Infant denim, canvas and corduroy overalls with snap hardware and OEKO-TEX compliance.", href: "/apparel/babyandkids/overalls/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby overalls manufacturer — OEM infant denim and canvas overalls for kids brands worldwide" },
              { name: "Baby Rompers", desc: "Short and long-sleeve rompers in organic cotton jersey. Snap crotch and envelope neck options.", href: "/apparel/babyandkids/babyrompers/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby romper manufacturer — OEM organic cotton infant rompers for baby boutiques worldwide" },
              { name: "Baby Bibs", desc: "Terry, velour and silicone bib constructions for newborn to toddler programmes.", href: "/apparel/babyandkids/babybibs/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby bib manufacturer — OEM terry and silicone bibs for infant product brands worldwide" },
              { name: "Baby Hooded Towels", desc: "OEKO-TEX terry hooded towels for infants and toddlers. Embroidery and appliqué options.", href: "/apparel/babyandkids/babyhoodedtowels/", img: "/images/hero/hero-apparel.webp", alt: "Pakistan baby hooded towel manufacturer — OEM OEKO-TEX terry hooded towels for infant brands worldwide" },
            ].filter(p => !p.href.includes("swaddlemuslinfabric")).map((p) => (
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Source Swaddle Muslin?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Share your construction, size, print spec, quantity and certification requirements. We&rsquo;ll match your programme to the right GOTS-certified Pakistan factory within 3–5 working days.
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
