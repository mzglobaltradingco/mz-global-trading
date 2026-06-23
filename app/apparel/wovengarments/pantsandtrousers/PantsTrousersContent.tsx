"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Scroll helpers ───────────────────────────────────────────────────────────

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
  { id: "twill-chino", name: "Twill / Chino", badge: "Most Ordered", gsm: "200–260 GSM", icon: "👖", color: "bg-amber-50 border-amber-100", accent: "text-amber-700", hand: "Smooth diagonal face, structured drape, versatile weight", best: ["Business Casual", "Fashion Retail", "Smart Casual"], markets: ["USA", "UK", "EU", "Australia"], detail: "Twill chino is the anchor construction for woven trouser programmes worldwide. The diagonal twill weave delivers a refined smooth face with structure and recovery. Available in 100% cotton, cotton-stretch (97/3) and cotton-polyester blends for wrinkle resistance.", spec: "100% cotton, 97/3 cotton-elastane, or 65/35 cotton-polyester. GSM 200–260. DWR and wrinkle-resistant finish available." },
  { id: "canvas", name: "Canvas (Heavy)", badge: "", gsm: "260–350 GSM", icon: "🔩", color: "bg-stone-50 border-stone-100", accent: "text-stone-600", hand: "Thick, durable, structured — built for durability", best: ["Work Trousers", "Outdoor", "Utility"], markets: ["USA", "Canada", "Australia", "UK"], detail: "Heavy canvas twill for work, utility and outdoor trouser programmes requiring maximum durability. Compatible with DWR water-repellent finish for outdoor applications.", spec: "100% cotton canvas or cotton-polyester. GSM 260–350. DWR available. Reinforced pocket and stress points optional." },
  { id: "poplin-light", name: "Poplin (Lightweight)", badge: "", gsm: "140–200 GSM", icon: "🌬️", color: "bg-sky-50 border-sky-100", accent: "text-sky-600", hand: "Smooth, fine, lightweight drape — ideal for warm climates", best: ["Summer / Tropical", "Formal Lightweight", "ME / SE Asia"], markets: ["Middle East", "SE Asia", "South America", "Australia"], detail: "Lightweight poplin trousers for warm-climate markets. Used in formal and smart-casual programmes across Middle East, South Asia and tropical markets.", spec: "100% cotton or 65/35 cotton-polyester. GSM 140–200. Wrinkle-resistant finish standard." },
  { id: "linen-blend", name: "Linen / Linen Blend", badge: "", gsm: "160–220 GSM", icon: "🌿", color: "bg-emerald-50 border-emerald-100", accent: "text-emerald-700", hand: "Natural texture, breathable, relaxed drape", best: ["Resort Wear", "Summer Retail", "Lifestyle Brands"], markets: ["EU", "USA", "Australia", "South America"], detail: "Linen trouser programmes for summer retail, resort wear and lifestyle brands. Pure linen for authentic breathability; linen-cotton blend for improved wrinkle stability.", spec: "100% linen or 55/45 linen-cotton. GSM 160–220. Pre-washed garment finish available." },
  { id: "wool-blend", name: "Wool Blend", badge: "Premium", gsm: "220–320 GSM", icon: "🏆", color: "bg-purple-50 border-purple-100", accent: "text-purple-700", hand: "Soft drape, natural insulation, premium formal feel", best: ["Premium Formal", "Autumn / Winter", "Luxury Retail"], markets: ["UK", "EU", "USA premium", "Japan"], detail: "Wool blend (typically 55% wool / 45% polyester) for premium formal trouser programmes. Delivers structured drape associated with tailored menswear.", spec: "55% wool / 45% polyester or 70% wool / 30% polyester. GSM 220–320. Lining available." },
  { id: "sateen-stretch", name: "Sateen Stretch", badge: "", gsm: "200–250 GSM", icon: "✨", color: "bg-teal-50 border-teal-100", accent: "text-teal-700", hand: "Smooth satin-like face, 4-way stretch, excellent recovery", best: ["Contemporary Menswear", "Premium Casual", "Fashion Retail"], markets: ["EU", "UK", "USA contemporary", "South Korea"], detail: "Sateen stretch at the intersection of formal appearance and performance comfort. The satin-weave face provides refinement; spandex delivers stretch comfort.", spec: "92% cotton / 8% spandex. GSM 200–250. 4-way stretch. Formal appearance." },
  { id: "ponte", name: "Ponte (Knit-Look)", badge: "", gsm: "220–280 GSM", icon: "🔄", color: "bg-rose-50 border-rose-100", accent: "text-rose-600", hand: "Structured knit drape — looks woven, feels like knit", best: ["Women's Fashion", "Contemporary", "E-commerce DTC"], markets: ["USA", "UK", "EU women's", "Australia"], detail: "Ponte fabric bridges woven trouser and knit comfort — visual appearance of a structured trouser with the wearing comfort of a knit. Popular in DTC fashion brands.", spec: "Typically 60/35/5 poly-rayon-spandex. GSM 220–280. Stable structure. Elasticated waist available." },
];

const FIT_PROFILES = [
  { code: "REG", name: "Regular Fit", ease: "Straight from hip to hem — classic cut", market: "USA mass-market, workwear, mid-market fashion retail worldwide" },
  { code: "SLM", name: "Slim Fit", ease: "Tapered thigh and leg from hip to ankle", market: "Contemporary fashion, UK/EU mainstream, USA modern menswear" },
  { code: "RLX", name: "Relaxed / Straight", ease: "Generous thigh, straight leg — comfortable without being baggy", market: "Casual retail, linen programmes, USA mainstream casual" },
  { code: "TPR", name: "Tapered", ease: "Full thigh, narrowed ankle — clean athletic profile", market: "Premium menswear, Japan-influenced fashion, EU contemporary" },
  { code: "ATH", name: "Athletic / Performance", ease: "Wide thigh, shaped waist with stretch fabrication", market: "Performance lifestyle, stretch sateen programmes, DTC online brands" },
];

const GSM_TIERS = [
  { gsm: "140–180", name: "Lightweight", season: "Summer / Tropical", market: "Middle East · SE Asia · South America · Summer retail", pct: 30, featured: false, desc: "Poplin and linen constructions deliver breathability and casual drape for warm-climate and summer markets.", color: "bg-amber-300" },
  { gsm: "200–260", name: "Standard / Commercial", season: "Year-Round", market: "USA · UK · EU retail baseline · Australia", pct: 78, featured: true, desc: "Twill chino at this weight is the commercial backbone of every woven trouser programme — structured, versatile and compatible with all decoration and finish techniques.", color: "bg-gold" },
  { gsm: "260–350", name: "Heavyweight / Premium", season: "Autumn / Winter / Work", market: "USA workwear · UK / EU formal · Canada", pct: 40, featured: false, desc: "Canvas, wool blend and heavy twill for A/W collections, premium formal and utility/workwear programmes requiring superior durability.", color: "bg-orange-600" },
];

const DECO_METHODS = [
  { code: "EMB", method: "Embroidery", best: "Back pocket art, waistband badge and brand marks across all woven constructions", compat: ["Twill / Chino", "Canvas", "Poplin"], note: "Flat-bed embroidery preferred over hoop for trouser programmes" },
  { code: "WPT", method: "Woven / Patch Label", best: "Branded waistband patch, back label and leather-look patch on any construction", compat: ["All Constructions"], note: "PU leather-look patch is vegan; woven cotton patch for GOTS programmes" },
  { code: "NOD", method: "No Exterior Decoration", best: "Formal and premium programmes where clean finish is the brand statement", compat: ["All Constructions"], note: "Label programme (waistband label, care label) serves as the sole branded element" },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Solid / PMS Matched", note: "Full PMS range — navy, khaki, charcoal, olive, black, stone. Lab dip approval before bulk.", swatches: ["bg-blue-900", "bg-amber-700", "bg-gray-600", "bg-green-800", "bg-stone-400", "bg-gray-900"] },
  { name: "Yarn-Dyed", subtitle: "Stripe & Check", note: "Woven-in stripes and checks for linen and lightweight constructions. Popular in resort and casual programmes.", swatches: ["bg-white", "bg-blue-900", "bg-amber-600", "bg-gray-300", "bg-green-700"] },
  { name: "Piece-Dyed", subtitle: "Uniform Solid", note: "Even colour across full production run. Standard for corporate uniform and workwear trouser programmes.", swatches: ["bg-gray-700", "bg-slate-800", "bg-stone-500", "bg-amber-800", "bg-neutral-600"] },
  { name: "Over-Dyed / Enzyme", subtitle: "Softened / Vintage Tone", note: "Enzyme wash for linen programmes — relaxed hand and softened colour. Popular for casual and resort retail.", swatches: ["bg-stone-300", "bg-amber-200", "bg-neutral-300", "bg-slate-300", "bg-stone-400"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic fibre sourcing and processing for organic cotton trouser programmes", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — EU/UK import compliance for woven trousers", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — labour standards at factory level verified", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, safety and environment data sharing for supply chain transparency", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent quality systems and process control across trouser production", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled content verification for polyester blend trouser programmes", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance for Pakistan woven garment factories", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Sustainable cotton farming practices across the trouser supply chain", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "Independent audit of worker rights, wages and safe conditions", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency in finishing and dyeing processes", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Fabric Construction to Specification", desc: "Any of seven woven constructions sourced to your exact GSM, fibre content and weave specification from Pakistan's certified woven garment mills.", color: "border-amber-400" },
  { num: "02", title: "Waistband & Closure Specification", desc: "Flat front, single pleat, double pleat, elasticated waist, partial elastic — any waistband configuration built to your pattern and interlining spec.", color: "border-teal-400" },
  { num: "03", title: "Pocket Configuration", desc: "Side seam, angled side, cargo, back welt (single or double), coin pocket — any pocket arrangement per your technical pack.", color: "border-emerald-400" },
  { num: "04", title: "Performance Finish Programme", desc: "Wrinkle-resistant (DP/WRFP), DWR water repellent, soil release, anti-static — apply the right finish for your market and end use.", color: "border-orange-400" },
  { num: "05", title: "Label & Brand Programme", desc: "Waistband main label, care label, hang tag, size label — full branded label stack developed to your artwork and specification.", color: "border-purple-400" },
  { num: "06", title: "Retail & Logistics Packaging", desc: "Hanger and polybag, board fold, retail box or flat fold bulk — packaging specified to your retail or distribution requirements.", color: "border-blue-400" },
];

const SECTORS = [
  { abbr: "BZ", name: "Business / Corporate", detail: "Office trouser programmes, corporate uniform and smart-casual wear", market: "USA · UK · EU · Middle East" },
  { abbr: "FA", name: "Fashion Retail", detail: "Seasonal trouser collections — slim, tapered and wide-leg silhouettes", market: "USA · UK · EU · Australia" },
  { abbr: "RS", name: "Resort & Lifestyle", detail: "Linen and lightweight trousers for coastal, holiday and resort brands", market: "EU · USA · Australia · Middle East" },
  { abbr: "EC", name: "E-commerce / DTC", detail: "Online-first fashion brands with woven trouser programmes", market: "Global" },
  { abbr: "WK", name: "Workwear", detail: "Canvas and twill work trousers for trade and industrial sectors", market: "USA · Canada · Australia · UK" },
  { abbr: "WS", name: "Wholesale Distribution", detail: "Multi-brand distributors supplying retailers and catalogues globally", market: "USA · EU · Middle East" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading only." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight to your port. Buyer arranges own marine insurance." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory gate. Lowest quoted price, highest buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "👖", label: "Hanger + Polybag", note: "Retail-ready on arrival" },
  { icon: "📦", label: "Flat Fold (export)", note: "Volume-optimised bulk" },
  { icon: "🗂️", label: "Board Fold (retail)", note: "In-store presentation" },
  { icon: "🎁", label: "Retail Box", note: "Premium / gift programmes" },
  { icon: "💼", label: "Zippered Pouch", note: "Premium wardrobe pack" },
  { icon: "✏️", label: "Custom Packaging", note: "To your brand brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory shortlist, construction and finish confirmed with pricing", color: "bg-gold" },
  { stage: "Sample Production", days: "15–20", desc: "Sewn sample with all trim, pocket and finish to specification", color: "bg-amber-500" },
  { stage: "Bulk Production", days: "40–65", desc: "From confirmed PO and approved pre-production sample", color: "bg-orange-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Measurement audit, count check and packaging verification", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "18–28", desc: "FCL/LCL from Karachi or Port Qasim to destination port", color: "bg-teal-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton twill and chino available. Full chain of custody from certified organic farms to finished trouser.", tag: "GOTS" },
  { icon: "💧", title: "DWR Without PFCs", desc: "Non-fluorinated DWR water-repellent finishes available — same performance without PFAS chemical concerns for EU REACH compliance.", tag: "Process" },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester available for cotton-polyester blend chino and workwear trouser programmes.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 certified factories only. Labour standards, fair wages and safe working conditions independently verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Chemistry", desc: "OEKO-TEX Standard 100 certified dyes and finishes. No restricted azo dyes, heavy metals or harmful sizing agents.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags, FSC-certified hangtags and tissue available on request for sustainable brand packaging specifications.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction, GSM, fit, waistband style, pocket configuration, finish, quantity, destination and target delivery date." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We shortlist 2–3 certified Pakistan woven trouser factories aligned to your construction and certification requirements. Pricing in 3–5 working days." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Pre-production sample sewn with all pocket, trim and finish details. 15–20 days from specification lock." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review fit, construction, finish and labelling. Revise as required before purchase order placement." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Fabric cut and sewn. Duration depends on construction complexity, finishing requirements and factory scheduling." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Measurement audit, pocket and seam inspection, packing verification. FCL or LCL from Karachi or Port Qasim." },
];

const FAQS = [
  { q: "What GSM is standard for business casual chino trousers?", a: "For year-round business casual chino programmes, 220–260 GSM twill is the commercial standard. This weight delivers the structured drape expected in office and smart-casual environments. For warmer climates (Middle East, SE Asia) or summer collections, lightweight poplin at 140–180 GSM is the correct alternative — providing adequate structure without excess warmth. Heavy canvas at 260–350 GSM is reserved for workwear and outdoor programmes." },
  { q: "What is the difference between twill chino and canvas for trouser programmes?", a: "Twill chino (200–260 GSM) is the fashion and business-casual construction — smooth face, refined drape, suitable for embroidery and woven patch decoration. Canvas (260–350 GSM) is a heavier, more rugged variant used specifically in workwear, utility and outdoor trouser programmes where durability and abrasion resistance take priority over refined aesthetics. Both share the diagonal twill weave but differ significantly in weight, hand and end-use application." },
  { q: "Can I get stretch trousers from Pakistan?", a: "Yes. Cotton-elastane (97/3 or 95/5) chino stretch and sateen stretch (92/8 cotton-spandex) are both available. Stretch chinos are the most commercially popular variant in contemporary menswear and women's fashion. Ponte fabric (typically 60/35/5 poly-rayon-spandex) is also available for women's and DTC programmes that prioritise wearing comfort without sacrificing formal appearance." },
  { q: "What finishes are available for outdoor or work trouser programmes?", a: "DWR (durable water repellent) is the primary finish — available in fluorinated (C6 based) and non-fluorinated (PFAS-free) formulations. Soil release for easy cleaning is standard in workwear. Anti-static finish is available for industrial environments. Reinforced knee and seat panels are available on canvas constructions. All finishes are compatible with OEKO-TEX Standard 100 certification." },
  { q: "What order quantities are typical for custom trouser programmes?", a: "Order quantities for custom woven trouser programmes vary significantly depending on construction, number of sizes, colour programme and factory capacity. There is no single universal minimum — include your target quantity, number of colours and size range in your RFQ and we match you with factories whose capacity and production economics align with your programme size." },
  { q: "Can I order linen trousers for spring/summer retail from Pakistan?", a: "Yes. Pure linen (100%) and linen-cotton blend (55/45) trouser programmes are available. Linen at 160–200 GSM is ideal for spring/summer resort, coastal and lifestyle brand programmes. Pre-washed garment finish is available for reduced wrinkling and softer drape on arrival — popular for buyers who want the relaxed linen aesthetic from the first wear." },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function PantsTrousersContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-pants-trousers.webp"
            fill
            alt="Pakistan pants and trousers manufacturer — OEM woven trousers for fashion and corporate brands in USA, UK and Europe"
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
              <Link href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/apparel/wovengarments/" className="hover:text-gold transition-colors">Woven Garments</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Pants & Trousers</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Woven Garment Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Pants &amp; Trousers
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
              MZ Global Trading sources custom trousers from Pakistan&rsquo;s
              certified woven garment factories. Twill chinos, formal wool blends,
              linen, ponte and stretch sateen. 140&ndash;350 GSM. Wrinkle-resistant
              and DWR finishes. OEKO-TEX, BSCI, Sedex certified. FOB / CIF export.
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

      {/* ══ STATS ANCHOR ═════════════════════════════════════════════════════ */}
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
                Pants &amp; Trousers — Pakistan Woven Garment
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Trouser Sourcing Across Seven Fabric Constructions
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                From slim-cut formal trousers to relaxed linen wide-leg — Pakistan&rsquo;s
                woven garment sector covers every construction and every market. Certified
                factories, verified quality, consistent delivery.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "7", label: "Fabric Options" },
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

      {/* ══ BENTO GRID ═══════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1: 2 large equal bentos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bento 1 — Constructions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-amber-700 text-xs font-semibold tracking-[0.2em] uppercase">Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {CONSTRUCTIONS.slice(0, 4).map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3 border border-amber-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    {c.badge && <span className="mt-1 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <p className="text-xs text-amber-700 font-medium">+ 3 more constructions</p>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            {/* Bento 2 — Fits */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-emerald-700 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fit Profiles &amp; Sizing</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {FIT_PROFILES.map((f) => (
                  <div key={f.code} className="bg-white rounded-xl px-4 py-3 border border-emerald-100 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{f.code}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{f.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{f.ease}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-fits" label="Explore Fit Profiles" />
            </motion.div>
          </div>

          {/* Row 2: 4 compact bentos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Bento 3 — Weight */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Guide</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-xl p-3 border border-orange-100">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-bold text-navy-900">{t.gsm}</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <div className="w-full h-1.5 bg-orange-100 rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] font-semibold text-orange-600">{t.season}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View Weight Guide" />
            </motion.div>

            {/* Bento 4 — Decoration */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-stone-50 border border-stone-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🖊️</span>
              <p className="text-stone-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Decoration Methods</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-stone-100">
                    <span className="w-6 h-6 rounded bg-stone-200 text-stone-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{d.code}</span>
                    <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="View Decoration" />
            </motion.div>

            {/* Bento 5 — Colours */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-teal-700 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-3 border border-teal-50">
                    <p className="text-xs font-semibold text-navy-900 mb-1.5">{d.name}</p>
                    <div className="flex gap-1.5">
                      {d.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${s}`} aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colors" label="Explore Colours" />
            </motion.div>

            {/* Bento 6 — OEM */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-yellow-700 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM &amp; Custom Programs</h3>
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

          {/* Row 3: 5-col: 2+2+1 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            {/* Bento 7 — Markets */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-cyan-50 border border-cyan-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-cyan-700 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-cyan-100">
                    <p className="text-xs font-bold text-cyan-700">{s.abbr}</p>
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
              className="lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-lime-700 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Quality Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-xl border border-lime-100 flex items-center justify-center p-2" style={{ height: 56 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={72} height={44} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            {/* Bento 9 — Export */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-blue-100">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
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

          {/* Row 4: 3-col 2+1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bento 10 — Sustainability */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌿</span>
                <div>
                  <p className="text-green-700 text-xs font-semibold tracking-[0.2em] uppercase">Ethics</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Sustainable Sourcing</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {SUSTAINABILITY_ITEMS.map((s) => (
                  <div key={s.title} className="bg-white rounded-xl p-3 border border-green-100 flex flex-col gap-1">
                    <span className="text-base" aria-hidden="true">{s.icon}</span>
                    <p className="text-sm font-semibold text-navy-900">{s.title}</p>
                    <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full w-fit">{s.tag}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            {/* Bento 11 — Process */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-purple-50 border border-purple-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.short}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-1 pl-8">+ 2 more steps</p>
              </div>
              <ExploreBtn sectionId="section-process" label="View Our Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ RESOURCES ROW ════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/trouser-fabric-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Trouser Fabric Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Chino, twill, stretch and linen — fabric selection by formality, season and market.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link href="/guides/pants-trousers-sourcing-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Pants &amp; Trousers Sourcing Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fabric, fit, construction and certification for international buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guide →</span>
            </Link>
            <Link href="/downloads/trouser-measurement-template/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Trouser Measurement Template</p>
              <p className="text-xs text-gray-500 leading-relaxed">Measurement and grading template for pants and trouser sourcing.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Template →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Trousers?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction and fit confirmed — RFQ takes 3 minutes. Factory match and quotation returned within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 1 — CONSTRUCTIONS — BENTO UI ════════════════════════════ */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Seven Constructions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Fabric Constructions</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Every trouser programme begins with fabric construction. Each of seven woven builds has a distinct hand, weight range, market position and finish compatibility.
          </p>
          {/* Bento-within-bento: most-ordered spans 2 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className={`${c.color} border rounded-2xl p-6 flex flex-col gap-3 ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{c.icon}</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-navy-900">{c.name}</h3>
                    {c.badge && (
                      <span className="text-[10px] font-semibold text-gold bg-gold/15 px-2.5 py-0.5 rounded-full border border-gold/30">{c.badge}</span>
                    )}
                  </div>
                </div>
                <p className={`text-xs font-semibold ${c.accent}`}>{c.gsm}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{c.hand}</p>
                {i === 0 && <p className="text-sm text-gray-500 leading-relaxed">{c.detail}</p>}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {c.best.map((b) => (
                    <span key={b} className="text-xs bg-white/70 border border-white text-gray-600 px-2.5 py-0.5 rounded-full">{b}</span>
                  ))}
                </div>
                {i === 0 && (
                  <div className="border border-white/60 rounded-xl p-3 bg-white/40 mt-1">
                    <p className="text-xs text-gray-500">{c.spec}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 2 — FIT PROFILES — ISOMETRIC UI ══════════════════════════ */}
      <section id="section-fits" className="bg-slate-800 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Fit &amp; Sizing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Fit Profiles &amp; Sizing</h2>
          <p className="text-gray-400 mb-12 max-w-2xl leading-relaxed">
            Silhouette is the primary commercial decision in a trouser programme. Each fit profile targets a distinct market position, buyer demographic and end-use segment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
            {FIT_PROFILES.map((f, i) => (
              <motion.div
                key={f.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                whileHover={{ scale: 1.04, rotateX: -5, rotateY: 6 }}
                style={{ transformStyle: "preserve-3d" }}
                className="bg-slate-700 border border-slate-600 rounded-2xl p-7 flex flex-col gap-4 cursor-default"
              >
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gold/20 border border-gold/30 flex items-center justify-center">
                    <span className="text-gold text-lg font-bold">{f.code}</span>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-600 px-2.5 py-1 rounded-full">{`0${i + 1}`}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{f.name}</h3>
                  <p className="text-sm text-gold font-semibold mb-2">{f.ease}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.market}</p>
                </div>
                <div className="w-8 h-0.5 bg-gold/40 mt-auto" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[["Waist 28–42\"", "Size range"], ["US / UK / EU", "Standards available"], ["Custom", "Spec on request"]].map(([val, label]) => (
              <div key={label} className="bg-slate-700 border border-slate-600 rounded-xl p-4 text-center">
                <p className="text-white font-semibold">{val}</p>
                <p className="text-gold text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 3 — WEIGHT GUIDE — INFOGRAPHIC UI ════════════════════════ */}
      <section id="section-gsm" className="bg-amber-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber-700 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Guide</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Weight Selection Guide</h2>
          <p className="text-gray-600 mb-10 max-w-2xl leading-relaxed">
            GSM determines structural drape, seasonal positioning and finish compatibility. Use this guide to match fabric weight to your target market.
          </p>

          {/* Infographic weight spectrum bar */}
          <div className="bg-white rounded-2xl p-6 mb-10 border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4">Fabric Weight Spectrum — 140 to 350 GSM</p>
            <div className="relative h-8 rounded-full overflow-hidden bg-gradient-to-r from-amber-200 via-gold to-orange-600">
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <span className="text-xs font-bold text-navy-900">140 GSM</span>
                <span className="text-xs font-bold text-white">200 GSM</span>
                <span className="text-xs font-bold text-white">350 GSM</span>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-500">
              <span>Lightweight / Tropical</span>
              <span>Standard / Commercial</span>
              <span>Heavyweight / Premium</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {GSM_TIERS.map((tier) => (
              <div key={tier.gsm} className={`bg-white rounded-2xl p-7 border-2 ${tier.featured ? "border-gold shadow-lg" : "border-amber-100 shadow-xs"}`}>
                {tier.featured && (
                  <span className="inline-block mb-3 text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>
                )}
                <p className={`text-3xl font-bold mb-1 ${tier.featured ? "text-gold" : "text-navy-900"}`}>{tier.gsm}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{tier.name}</p>
                <p className="text-sm font-semibold text-navy-900 mb-3">{tier.season}</p>
                <div className="mb-4">
                  <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${tier.color}`} style={{ width: `${tier.pct}%` }} aria-hidden="true" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{tier.pct}% of orders</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tier.desc}</p>
                <p className="text-xs text-amber-700 font-semibold mt-3">{tier.market}</p>
              </div>
            ))}
          </div>

          {/* Weight recommendation matrix */}
          <div className="bg-white rounded-2xl overflow-hidden border border-amber-100">
            <div className="bg-amber-700 px-6 py-3">
              <p className="text-white text-sm font-bold">Weight Recommendation by Market</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-amber-50">
                    <th className="text-left px-5 py-3 font-semibold text-navy-900 text-xs uppercase tracking-wider">Market / Use Case</th>
                    <th className="text-left px-5 py-3 font-semibold text-navy-900 text-xs uppercase tracking-wider">Recommended GSM</th>
                    <th className="text-left px-5 py-3 font-semibold text-navy-900 text-xs uppercase tracking-wider">Construction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {[
                    ["USA / UK / EU Retail", "220–260 GSM", "Twill Chino"],
                    ["Middle East / Tropical", "140–180 GSM", "Poplin Lightweight"],
                    ["Summer / Resort", "160–200 GSM", "Linen / Linen Blend"],
                    ["A/W Premium", "260–320 GSM", "Wool Blend"],
                    ["Workwear / Utility", "260–350 GSM", "Canvas Heavy"],
                    ["Contemporary / DTC", "200–250 GSM", "Sateen Stretch / Ponte"],
                  ].map(([market, gsm, construction]) => (
                    <tr key={market} className="hover:bg-amber-50/50">
                      <td className="px-5 py-3 font-medium text-navy-900">{market}</td>
                      <td className="px-5 py-3 text-gold font-semibold">{gsm}</td>
                      <td className="px-5 py-3 text-gray-500">{construction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 4 — DECORATION — SWISS DESIGN UI ════════════════════════ */}
      <section id="section-decoration" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 items-start mb-12">
            <div className="w-1 bg-red-600 self-stretch shrink-0" aria-hidden="true" style={{ minHeight: 80 }} />
            <div>
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-2">MZ Global Trading — Trouser Decoration</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy-900">Decoration<br />Methods</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gray-200 rounded-2xl overflow-hidden mb-10">
            {DECO_METHODS.map((d, i) => (
              <div key={d.code} className={`p-8 flex flex-col gap-4 ${i < DECO_METHODS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-gray-200" : ""}`}>
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 bg-navy-900 text-gold font-bold text-sm flex items-center justify-center rounded-xs shrink-0">{d.code}</span>
                  <h3 className="text-xl font-bold text-navy-900">{d.method}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{d.best}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Compatible with</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.compat.map((c) => (
                      <span key={c} className="text-xs border border-gray-200 text-gray-600 px-2.5 py-1 rounded">{c}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded border border-amber-100">{d.note}</p>
              </div>
            ))}
          </div>
          {/* Placement matrix */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-navy-900 px-6 py-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
              <p className="text-white text-sm font-bold uppercase tracking-wider">Placement Reference</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-5 py-3 font-semibold text-navy-900 text-xs uppercase tracking-wider">Method</th>
                    <th className="text-center px-4 py-3 font-semibold text-navy-900 text-xs uppercase tracking-wider">Waistband</th>
                    <th className="text-center px-4 py-3 font-semibold text-navy-900 text-xs uppercase tracking-wider">Back Pocket</th>
                    <th className="text-center px-4 py-3 font-semibold text-navy-900 text-xs uppercase tracking-wider">Leg / Hip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Embroidery", "✓", "✓", "✓"],
                    ["Woven / Patch Label", "✓", "✓", "—"],
                    ["No Decoration", "Label only", "Label only", "—"],
                  ].map(([method, ...cells]) => (
                    <tr key={method} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-navy-900">{method}</td>
                      {cells.map((cell, ci) => (
                        <td key={ci} className={`text-center px-4 py-3 text-sm ${cell === "✓" ? "text-green-600 font-bold" : "text-gray-400"}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 5 — COLOURS — GRADIENT UI (TEAL) ════════════════════════ */}
      <section id="section-colors" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-emerald-900 to-[#0D1B2A]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Colour Programs</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">
            Every construction is available in full PMS colour matching. Lab dip approval is submitted before bulk production begins.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-2">
                  {d.swatches.map((s, idx) => (
                    <div key={idx} className={`w-7 h-7 rounded-full border-2 border-white/20 ${s}`} aria-hidden="true" />
                  ))}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{d.name}</h3>
                  <p className="text-xs text-white/50 mt-0.5">{d.subtitle}</p>
                </div>
                <p className="text-sm text-white/70 leading-relaxed flex-1">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
            {["bg-blue-900","bg-gray-600","bg-amber-700","bg-green-800","bg-stone-400","bg-black","bg-red-700","bg-slate-700","bg-neutral-500","bg-teal-800","bg-orange-700","bg-white"].map((c, i) => (
              <div key={i} className={`h-10 rounded-xl ${c} opacity-90 border border-white/10`} aria-hidden="true" />
            ))}
          </div>
          <p className="text-white/40 text-xs mt-3 text-center">Illustrative trouser colour palette — full PMS range available via reactive dyeing</p>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 6 — OEM — MARKETPLACE UI ════════════════════════════════ */}
      <section id="section-oem" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-900 rounded-2xl px-8 py-6 mb-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">OEM &amp; Custom</p>
              <h2 className="text-2xl font-bold text-white">Custom Development Programs</h2>
            </div>
            <Link href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors text-sm w-fit">
              Start Your Programme <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="text-gray-500 leading-relaxed mb-10 max-w-2xl">
            Every aspect of your trouser programme can be specified to your brand requirements. From fabric construction through to retail packaging, we manage to your specification.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OEM_FEATURES.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`bg-white rounded-2xl p-6 shadow-xs border-l-4 ${f.color} flex flex-col gap-3`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-navy-900 text-gold text-xs font-bold flex items-center justify-center shrink-0">{f.num}</span>
                  <h3 className="text-sm font-bold text-navy-900">{f.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 7 — MARKETS — DARK MODE UI ══════════════════════════════ */}
      <section id="section-markets" className="bg-gray-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Markets</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Industry Applications</h2>
          <p className="text-gray-400 mb-12 max-w-2xl leading-relaxed">
            Trouser programmes span business, fashion, resort, workwear and DTC segments. Each sector demands a different construction, weight and finish profile.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-gray-800 border border-gray-700 hover:border-teal-500/50 rounded-2xl p-7 flex flex-col gap-4 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full">{s.abbr}</span>
                  <span className="text-xs text-gray-500">{s.market}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{s.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.detail}</p>
                </div>
                <div className="w-8 h-0.5 bg-teal-400/30 mt-auto" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[["USA / Canada", "Primary"], ["UK / Europe", "Key"], ["Middle East", "Growing"], ["Australia / Asia", "Emerging"]].map(([region, tier]) => (
              <div key={region} className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
                <p className="text-white font-semibold text-sm">{region}</p>
                <p className="text-teal-400 text-xs mt-1">{tier}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 8 — CERTIFICATIONS — CARD-BASED UI ═══════════════════════ */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Certifications Available</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Pakistan&rsquo;s certified woven garment factories carry internationally recognised standards. Specify your required certification in your RFQ for aligned factory matching.
          </p>
          <div className="bg-navy-900 rounded-2xl p-8 mb-8 flex flex-col sm:flex-row gap-8 items-center">
            <div className="text-center sm:text-left shrink-0">
              <p className="text-6xl font-bold text-gold">10+</p>
              <p className="text-white text-sm mt-1">Certifications Available</p>
            </div>
            <div className="w-px h-16 bg-white/10 hidden sm:block" aria-hidden="true" />
            <p className="text-gray-300 text-sm leading-relaxed">
              OEKO-TEX Standard 100 and GOTS for chemical and organic fibre compliance. BSCI and Sedex for social responsibility. ISO 9001 for quality management. GRS for recycled content. SA8000 for the highest level of labour standards verification. Specify your required standards in your RFQ.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 hover:border-gold hover:shadow-xs transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center p-2 shrink-0" style={{ width: 64, height: 46 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={56} height={38} className="object-contain w-full h-full" />
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${c.tier === "Premium" ? "bg-gold/15 text-gold" : c.tier === "Optional" ? "bg-gray-100 text-gray-500" : "bg-green-50 text-green-700"}`}>{c.tier}</span>
                </div>
                <h3 className="text-sm font-bold text-navy-900">{c.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 9 — EXPORT & PACKAGING — MODULAR UI ══════════════════════ */}
      <section id="section-export" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export &amp; Packaging</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Export Terms &amp; Packaging</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Choose the Incoterm that aligns with your logistics setup. Packaging is specified per programme to your retail or distribution requirements.
          </p>
          <h3 className="text-lg font-bold text-navy-900 mb-4">Export Incoterms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {EXPORT_TERMS.map((e, i) => (
              <motion.div
                key={e.term}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center shrink-0">
                    <span className="text-gold text-sm font-bold">{e.term}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{e.term}</p>
                    <p className="text-xs text-gray-400">{e.full}</p>
                  </div>
                </div>
                <p className="text-xs text-gold font-semibold">📍 {e.port}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
          <h3 className="text-lg font-bold text-navy-900 mb-4">Packaging Options</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {PACK_OPTIONS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col items-center gap-2 text-center"
              >
                <span className="text-2xl" aria-hidden="true">{p.icon}</span>
                <p className="text-xs font-semibold text-navy-900 leading-snug">{p.label}</p>
                <p className="text-[10px] text-gray-400">{p.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <h3 className="text-lg font-bold text-navy-900">Indicative Programme Timeline</h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full w-fit">
              <span aria-hidden="true">ℹ️</span> Guide only — actual timelines vary
            </span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800 leading-relaxed">
            <strong>Important:</strong> The durations shown below are indicative guides based on typical programmes. Actual timelines depend on factory scheduling, fabric sourcing availability, number of sample iterations, seasonal demand and your chosen Incoterm. Share your target delivery date in your RFQ for a specific assessment.
          </div>
          <div className="flex flex-col gap-3">
            {LEAD_STAGES.map((stage, i) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl ${stage.color} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy-900">{stage.stage}</p>
                  <p className="text-xs text-gray-400">{stage.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-navy-900">{stage.days}</p>
                  <p className="text-xs text-gray-400">days (guide)</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-5 bg-gray-100 border border-gray-200 rounded-xl p-4 text-sm text-gray-500">
            Indicative total programme duration: approximately 80–120 days from RFQ to departure port. Add sea freight time for your destination. These figures are for planning purposes only and are not a contractual commitment.
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 10 — SUSTAINABILITY — MINIMAL UI ═════════════════════════ */}
      <section id="section-sustainability" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-gray-400">Ethics &amp; Environment</p>
            <h2 className="text-4xl sm:text-5xl font-light text-navy-900 mb-5 leading-[1.1]">
              Sustainable<br />Trouser Sourcing
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-6" aria-hidden="true" />
            <p className="text-gray-500 text-lg leading-loose">
              Every trouser programme can be aligned to your sustainability requirements — from organic cotton certification to non-fluorinated water-repellent finishes.
            </p>
          </div>
          <div className="flex flex-col divide-y divide-gray-100">
            {SUSTAINABILITY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start"
              >
                <div className="sm:col-span-1 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                </div>
                <div className="sm:col-span-3 flex items-start gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-navy-900">{item.title}</h3>
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{item.tag}</span>
                  </div>
                </div>
                <div className="sm:col-span-8">
                  <p className="text-gray-500 text-sm leading-loose">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-navy-800 transition-colors">
              Request Certified Programme <span aria-hidden="true">→</span>
            </Link>
            <Link href="/qualitycompliance/certifications/" className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 text-navy-900 hover:border-navy-900 transition-colors">
              View All Certifications
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 11 — PROCESS — MATERIAL DESIGN ═══════════════════════════ */}
      <section id="section-process" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Programme</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Our Sourcing Process</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Six structured steps from specification to shipment. Clear accountability at each stage.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-7 flex flex-col gap-4 hover:shadow-lg transition-shadow"
                style={{ boxShadow: `0 ${(i + 1) * 2}px ${(i + 1) * 6}px -2px rgba(0,0,0,0.08)` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
                  <span className="text-2xl font-bold text-amber-600">{step.num}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-navy-900" aria-hidden="true" />
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{step.short}</p>
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-5">
            <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-800 transition-colors">
              Begin Your Programme — Step 01 <span aria-hidden="true">→</span>
            </Link>
            <Link href="/ourprocess/" className="inline-flex items-center gap-2 border border-gray-200 text-navy-900 font-semibold px-8 py-4 rounded-xl hover:border-navy-900 transition-colors">
              View Full Process Detail
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Pants &amp; Trousers FAQ</h2>
          <div className="divide-y divide-gray-200">
            {FAQS.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full text-left py-5 flex justify-between items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  aria-expanded={faqOpen === i}
                >
                  <span className="font-semibold text-navy-900 text-[15px] leading-snug">{item.q}</span>
                  <span className="relative shrink-0 mt-0.5">
                    {faqOpen !== i && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                      </span>
                    )}
                    <motion.span
                      animate={{ rotate: faqOpen === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gold text-xl font-light select-none inline-block"
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </span>
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
                      <p className="pb-6 text-gray-600 leading-relaxed text-[15px]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SAME-TIER NAVIGATION ══════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Woven Garments</p>
            <h2 className="text-2xl font-bold text-navy-900">More Woven Garments</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Denim Jeans", desc: "Rigid, stretch 98/2, raw and recycled cotton denim. Stone, acid and enzyme wash.", href: "/apparel/wovengarments/denimjeans/", img: "/images/hero/hero-denim-jeans.webp", alt: "Pakistan denim jeans manufacturer — OEM rigid and stretch denim for fashion brands in USA, UK and Europe" },
              { name: "Formal & Casual Shirts", desc: "Poplin, oxford, twill and linen. Corporate, fashion and hospitality programmes.", href: "/apparel/wovengarments/formalcasualshirts/", img: "/images/hero/hero-formal-casual-shirts.webp", alt: "Pakistan formal and casual shirts manufacturer — OEM woven shirts for corporate and fashion brands worldwide" },
              { name: "Cargo Pants", desc: "Ripstop, canvas and stretch ripstop. Tactical, outdoor and trade workwear.", href: "/apparel/wovengarments/cargopants/", img: "/images/hero/hero-cargo-pants.webp", alt: "Pakistan cargo pants manufacturer — OEM ripstop and canvas cargo for tactical and outdoor brands" },
              { name: "Shorts", desc: "Chino, canvas, linen and nylon. Casual, athletic and resort wear programmes.", href: "/apparel/wovengarments/shorts/", img: "/images/hero/hero-shorts.webp", alt: "Pakistan shorts manufacturer — OEM chino, canvas and linen shorts for casual and resort brands" },
            ].map((p) => (
              <Link href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow">
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

      {/* ══ FINAL CTA ════════════════════════════════════════════════════════ */}
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Start Your Programme</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-snug">
              Ready to Source Pants &amp; Trousers<br />from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Woven trouser programmes from Pakistan&rsquo;s certified factories. Twill chino,
              canvas, linen, sateen stretch or ponte — any construction, any finish. Submit
              your specification and we handle factory matching, sampling and bulk production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-9 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-9 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
