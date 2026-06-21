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
  { id: "poplin", name: "Poplin", badge: "Most Popular", gsm: "80–120 GSM", hand: "Crisp, smooth face, fine texture, natural drape", best: ["Formal Shirts", "Corporate Uniforms", "Hospitality"], markets: ["USA", "UK", "EU", "Middle East"], decorations: ["Embroidery", "Monogram", "Screen Print"], detail: "Poplin is the premier formal shirt fabric — a fine plain weave with a smooth, lustrous face and crisp drape. Combed and mercerised options deliver enhanced sheen and colour depth. The most widely ordered construction for corporate uniforms, hospitality programmes and formal menswear collections worldwide. Available in 100% cotton and cotton-polyester (65/35) for easy-care performance.", spec: "100% cotton combed or 65/35 cotton-polyester. GSM 80–120. Available mercerised. Wrinkle-resistant finish available. OEKO-TEX Standard 100 and GOTS options." },
  { id: "oxford", name: "Oxford Weave", badge: "", gsm: "130–180 GSM", hand: "Basket weave texture, casual-formal feel, durable", best: ["Smart-Casual", "Brand Casual", "Outdoor Brands"], markets: ["USA", "UK", "Canada", "Australia"], decorations: ["Embroidery", "Screen Print", "Woven Badge"], detail: "Oxford weave produces a distinctive basket-pattern texture that positions the shirt between formal and casual — ideal for smart-casual and brand casual programmes. Heavier than poplin, it drapes with more structure and is exceptionally durable for repeat laundering. Button-down collar is most common; classic spread collar also available.", spec: "100% cotton or cotton-polyester blend. GSM 130–180. Basket weave. Available in solid, yarn-dyed stripe and check. Standard and button-down collar." },
  { id: "twill", name: "Twill", badge: "Premium", gsm: "90–130 GSM", hand: "Diagonal weave, smooth lustrous surface, premium drape", best: ["Premium Formal", "Fashion Shirts", "Luxury Retail"], markets: ["UK", "EU", "USA", "Japan"], decorations: ["Embroidery", "Monogram"], detail: "Twill weave creates a distinct diagonal rib on the fabric face, producing a lustrous, smooth surface with premium drape. Preferred by luxury and premium menswear brands for its visual refinement. Compatible with fine thread counts (140/2) for ultra-premium positioning. Pairs exceptionally with French cuff and spread collar configurations.", spec: "100% combed cotton. GSM 90–130. Diagonal twill weave. Available 2×1 and 3×1 twill. Thread count 80/2 to 140/2 available." },
  { id: "linen", name: "Linen / Linen-Cotton", badge: "", gsm: "120–200 GSM", hand: "Natural texture, crisp when new, relaxes with wear, breathable", best: ["Summer Retail", "Resort Wear", "Tropical Markets"], markets: ["EU", "USA", "Australia", "Middle East"], decorations: ["Embroidery", "No decoration"], detail: "Linen and linen-cotton blends are essential for spring-summer and warm-climate markets. The natural fibre delivers exceptional breathability and a relaxed aesthetic valued in resort, lifestyle and casual programmes. Available in pure linen (100%) and blended constructions (55/45 linen-cotton) for improved stability and wrinkle resistance.", spec: "100% linen or 55/45 linen-cotton. GSM 120–200. Natural, off-white and dyed options. Pre-washed garment finish available." },
  { id: "chambray", name: "Chambray", badge: "", gsm: "100–150 GSM", hand: "Soft denim-like surface, casual drape, comfortable hand", best: ["Smart-Casual", "Lifestyle Brands", "E-commerce DTC"], markets: ["USA", "UK", "Australia", "EU"], decorations: ["Embroidery", "Screen Print"], detail: "Chambray mimics the aesthetic of lightweight denim with a plain weave structure — a warp thread in one colour and a white weft creates the characteristic heathered appearance. Positioned in smart-casual and lifestyle brand collections. Exceptionally popular in USA e-commerce and DTC brand programmes.", spec: "100% cotton. GSM 100–150. Warp-dyed, white weft plain weave. Enzyme wash for softened hand available." },
  { id: "end-on-end", name: "End-on-End", badge: "", gsm: "100–130 GSM", hand: "Fine two-colour weave, subtle sheen, premium formal positioning", best: ["Premium Formal", "Luxury Menswear", "Premium Retail"], markets: ["UK", "EU", "Japan", "USA"], decorations: ["Embroidery", "Monogram only"], detail: "End-on-end is woven with alternating coloured and white yarns in a plain weave, creating a micro-patterned two-tone effect visible only up close. The resulting fabric has a refined formal appearance and subtle lustre — positioned at premium formal and luxury menswear price points.", spec: "100% combed cotton. GSM 100–130. Two-tone yarn weave. Available in blue/white, grey/white, black/white, burgundy/white." },
  { id: "dobby", name: "Dobby Weave", badge: "", gsm: "100–180 GSM", hand: "Self-patterned texture with geometric motifs woven in", best: ["Fashion Retail", "Seasonal Collections", "Premium Casual"], markets: ["EU", "UK", "USA", "Middle East"], decorations: ["Embroidery (minimal)"], detail: "Dobby weave creates self-patterned texture through controlled yarn lifting — geometric, floral or abstract motifs woven into the fabric structure rather than printed. Adds visual interest without pattern-matching complexity. Popular in fashion retail seasonal programmes.", spec: "100% cotton or cotton-polyester. GSM 100–180. Jacquard dobby motif. Available in self-colour and contrast-colour motifs." },
  { id: "seersucker", name: "Seersucker", badge: "Summer", gsm: "90–140 GSM", hand: "Puckered crinkle surface, keeps fabric off skin, maximises airflow", best: ["Summer Fashion", "Tropical Markets", "Resort Collections"], markets: ["USA", "Australia", "Middle East", "SE Asia"], decorations: ["Embroidery only"], detail: "Seersucker's characteristic puckered surface is created by weaving some yarns under higher tension than others, producing alternating smooth and gathered stripes. The crinkle texture keeps the fabric away from the skin, maximising airflow — ideal for summer, tropical and resort markets.", spec: "100% cotton. GSM 90–140. Stripe puckered weave. Classic 0.5–1 cm stripe or custom width available." },
];

const FIT_PROFILES = [
  { code: "CLS", name: "Regular / Classic", ease: "+14–18 cm chest ease", market: "Corporate uniforms, USA mass-market, traditional menswear retail" },
  { code: "SLM", name: "Slim Fit", ease: "+8–12 cm chest ease", market: "Fashion retail, contemporary menswear, UK/EU mainstream" },
  { code: "RLX", name: "Relaxed", ease: "+20+ cm chest ease", market: "Casual lifestyle, linen programmes, resort and summer retail" },
  { code: "ATH", name: "Athletic / Trim", ease: "Wide shoulder, shaped waist suppression", market: "Premium menswear, gym-adjacent casual, USA DTC brands" },
];

const GSM_TIERS = [
  { gsm: "80–100", name: "Fine / Lightweight", season: "Spring / Summer / Formal", market: "Formal retail · Middle East · Tropical", pct: 40, featured: false, desc: "Fine poplin, end-on-end and seersucker deliver premium drape and maximum breathability — ideal for formal and warm-climate markets.", color: "bg-sky-300" },
  { gsm: "100–140", name: "Standard", season: "Year-Round", market: "USA · UK · EU · Australia baseline", pct: 80, featured: true, desc: "The commercial standard for year-round formal and casual shirt programmes. Covers poplin, oxford, chambray, twill and dobby constructions across all major markets.", color: "bg-gold" },
  { gsm: "140–200", name: "Heavyweight / Seasonal", season: "Autumn / Winter / Linen", market: "Linen programmes · Oxford · Winter collections", pct: 35, featured: false, desc: "Heavier oxford weave, linen and dobby for A/W collections and linen programmes. More structured drape and premium hand feel.", color: "bg-blue-500" },
];

const DECO_METHODS = [
  { code: "EMB", method: "Embroidery", best: "Logo marks, monograms and brand marks on chest, cuff and collar — all constructions", compat: ["All Constructions"], note: "Fine-thread embroidery (40/2 thread) recommended for poplin and lightweight constructions" },
  { code: "WVB", method: "Woven Badge / Crest", best: "Heritage branding, sports club badges, hotel and hospitality crests", compat: ["Oxford Weave", "Twill", "Poplin"], note: "Sits well on structured constructions — not recommended for fine seersucker" },
  { code: "SCR", method: "Screen Print", best: "Bold graphics and branding on oxford and casual constructions", compat: ["Oxford Weave", "Chambray", "Linen"], note: "Soft-hand inks only for woven constructions. Not recommended for poplin formal shirts." },
  { code: "NOD", method: "No Decoration", best: "Formal programmes where clean finish is preferred — poplin, twill, end-on-end", compat: ["All Constructions"], note: "Label programme (neck, care, hem labels) available as sole branded element" },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Standard / PMS Matched", note: "Full PMS colour matching across all constructions. Lab dip approval before bulk.", swatches: ["bg-white", "bg-blue-600", "bg-gray-800", "bg-red-600", "bg-sky-400"] },
  { name: "Yarn-Dyed", subtitle: "Stripe & Check", note: "Woven-in stripe and check patterns with colour-matched yarns. Popular for Oxford and chambray.", swatches: ["bg-blue-800", "bg-white", "bg-red-700", "bg-slate-700", "bg-gray-300"] },
  { name: "Piece-Dyed Solid", subtitle: "Even All-Over Colour", note: "Uniform solid colour across full yardage. Standard for corporate uniform programmes.", swatches: ["bg-sky-700", "bg-gray-600", "bg-white", "bg-stone-400", "bg-slate-800"] },
  { name: "Pigment / Enzyme Washed", subtitle: "Vintage / Softened Tone", note: "Enzyme wash produces slightly lived-in look. Popular in chambray and linen programmes.", swatches: ["bg-blue-200", "bg-stone-300", "bg-amber-100", "bg-gray-200", "bg-slate-300"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic fibre sourcing and processing for organic cotton shirt programmes", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — EU/UK import compliance standard for woven shirts", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — labour standards verified at factory level", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, safety and environment data sharing for supply chain transparency", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent quality systems and process control across production", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled content verification for blended and recycled fibre programmes", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance for woven garment factories", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Sustainable cotton farming practices across the supply chain", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "Most demanding social certification — wages, rights and worker conditions audited", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency across the textile supply chain", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Fabric Construction to Spec", desc: "Poplin, oxford, twill, linen — any construction sourced to your exact weight, fibre content and thread count from verified Pakistan woven mills." },
  { num: "02", title: "Collar & Cuff Configuration", desc: "Spread, button-down, mandarin, point, tab collar — any configuration built to your pattern. French cuff, single cuff, round cuff all available." },
  { num: "03", title: "Placket Options", desc: "Standard, bib, hidden, contrast placket — full range built to your technical specification with matched button and interlining spec." },
  { num: "04", title: "Monogram & Embroidery Programme", desc: "Fine-thread monogram on chest, cuff or collar executed to your thread colour, font and placement. 300–1800 stitch count depending on programme." },
  { num: "05", title: "Full Label Programme", desc: "Main label, collar band, hem label, care label — full branded label stack developed to your artwork file and specification." },
  { num: "06", title: "Retail Packaging to Brief", desc: "Board fold with pin, hanger and polybag, premium gift box — any packaging specification matched to your retail or e-commerce fulfilment needs." },
];

const SECTORS = [
  { abbr: "CO", name: "Corporate Workwear", detail: "Staff uniforms, corporate gifting, formal programmes across offices and hospitality", market: "USA · UK · EU · Middle East", color: "bg-blue-600" },
  { abbr: "HS", name: "Hospitality & Hotel", detail: "Front-of-house, service staff and branded uniform programmes for hotel and F&B groups", market: "Middle East · EU · USA · Asia", color: "bg-sky-600" },
  { abbr: "FA", name: "Fashion Retail", detail: "Seasonal collections, woven shirt programmes, OEM branded formal and casual lines", market: "USA · UK · EU · Australia", color: "bg-violet-600" },
  { abbr: "EC", name: "E-commerce / DTC", detail: "Direct-to-consumer brands and online-first menswear labels with branded shirt programmes", market: "Global", color: "bg-indigo-600" },
  { abbr: "MN", name: "Premium Menswear", detail: "Fine poplin, twill and end-on-end for premium retail and luxury buyer programmes", market: "UK · EU · Japan · USA", color: "bg-slate-700" },
  { abbr: "WS", name: "Wholesale Distribution", detail: "Multi-brand wholesale distributors supplying regional retail networks globally", market: "USA · EU · Middle East", color: "bg-teal-600" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading only." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance. Price includes delivery to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight to your port. Buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all inland and ocean logistics from factory gate. Lowest quoted price, highest buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "👔", label: "Board Fold + Pin", note: "Standard retail presentation" },
  { icon: "🪝", label: "Hanger + Polybag", note: "Retail-ready on arrival" },
  { icon: "🎁", label: "Premium Gift Box", note: "Luxury / gifting programmes" },
  { icon: "📦", label: "Flat Fold (bulk export)", note: "Volume-optimised shipping" },
  { icon: "🛍️", label: "Retail Polybag", note: "E-commerce / DTC packs" },
  { icon: "✏️", label: "Custom Packaging", note: "To your brand brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory shortlist, fabric sourcing and pricing confirmed", color: "bg-gold" },
  { stage: "Fabric Approval", days: "5–10", desc: "Lab dip or swatch approval before cutting commences", color: "bg-blue-500" },
  { stage: "Sample Production", days: "15–20", desc: "Sewn sample with all trim and decoration to specification", color: "bg-indigo-600" },
  { stage: "Bulk Production", days: "40–60", desc: "From confirmed PO and approved pre-production sample", color: "bg-purple-500" },
  { stage: "QC & Sea Freight", days: "25–35", desc: "Pre-shipment inspection + FCL/LCL from Karachi", color: "bg-teal-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton available across poplin, twill and lightweight woven constructions for formal shirt programmes.", tag: "GOTS" },
  { icon: "💧", title: "Water Efficiency", desc: "Easy-care finishes eliminate repeat washing in QC testing — reducing water use. Enzyme processing available for natural hand softening.", tag: "Process" },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester blends available for easy-care and performance shirt programmes at competitive pricing.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited woven garment factories. Worker welfare, wages and safe conditions verified independently.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "Reactive and fibre-reactive dyeing with OEKO-TEX certified chemicals only. Pigment dyeing for enzyme-washed programmes uses certified dye systems.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Sustainable Packaging", desc: "Recycled polybags, FSC-certified boxes and tissue available for any programme specification on request.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share fabric construction, GSM, collar style, fit, decoration type, quantity, destination and target delivery date via our RFQ form." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We shortlist 2–3 certified Pakistan woven shirt factories aligned to your construction and certification requirements. Pricing within 3–5 working days." },
  { num: "03", title: "Fabric Approval", short: "Fabric", desc: "Lab dip or fabric swatch submitted for colour and hand approval before cutting begins. 5–10 days from specification lock." },
  { num: "04", title: "Sample Production", short: "Sampling", desc: "Pre-production sample sewn with all trim, collar, cuff and decoration. 15–20 days from fabric approval." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Fabric cut and sewn. Duration depends on construction, decoration complexity and factory scheduling." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Measurement audit, count verification, packaging check. FCL or LCL from Karachi or Port Qasim." },
];

const FAQS = [
  { q: "Which shirt construction should I choose for a corporate uniform programme?", a: "Poplin (80–120 GSM) in a cotton-polyester 65/35 or 60/40 blend is the industry standard for corporate uniform programmes. The polyester content delivers wrinkle resistance and easy-care performance — critical for staff uniforms worn daily. Mercerised cotton poplin elevates the appearance for premium hospitality. For summer or Middle East climates, lightweight poplin (80–100 GSM) is strongly recommended." },
  { q: "Can I get wrinkle-resistant or easy-care woven shirts from Pakistan?", a: "Yes. Wrinkle-resistant (non-iron) finishes are available on poplin, oxford and twill constructions using DP (durable press) or WRFP (wrinkle-free performance) resin treatments. Cotton-polyester blend constructions (65/35 or 60/40) deliver comparable easy-care performance without chemical treatment — preferred for programmes where buyers avoid resin-treated fabrics. Both options are OEKO-TEX Standard 100 compatible." },
  { q: "What collar configurations can be produced for OEM shirt programmes?", a: "All standard and custom collar configurations are available: spread, semi-spread, classic point, button-down, tab, mandarin (band) and hidden button-down. French cuff (double cuff) and barrel (single button) cuffs are standard. Custom collar stand heights, collar spread widths and interlining specifications can be provided in your technical pack. The collar is a key brand differentiation point and can be developed to your own patterns." },
  { q: "What GSM is right for linen shirts for warm-climate markets?", a: "For summer and tropical markets (Middle East, SE Asia, Australia, South America), 120–150 GSM linen or linen-cotton blend is the optimal range. Pure linen at this weight delivers breathability and the characteristic relaxed linen aesthetic. The linen-cotton blend (55/45 linen-cotton) at 130–160 GSM provides improved dimensional stability and reduced wrinkling — preferred for programmes where buyers want the linen aesthetic with better laundering performance." },
  { q: "How does formal shirt decoration differ from casual shirt programmes?", a: "Formal shirts (poplin, twill, end-on-end) typically use fine embroidery or monogramming as the sole decoration — logo on left chest, monogram at collar or cuff. Screen printing is not used on formal constructions. Casual shirt programmes (oxford, chambray, linen) are more flexible — embroidery, woven badge and screen print (soft-hand inks) are all appropriate. The construction dictates the decoration range." },
  { q: "Can I order a shirt programme requiring GOTS certification from Pakistan?", a: "Yes. Pakistan's certified organic textile mills produce GOTS-certified poplin, twill and lightweight woven constructions. For EU buyers sourcing organic cotton formal shirts, specify GOTS as a hard requirement in your RFQ — we match you with factories carrying active GOTS certification. GOTS certified programmes require organic cotton throughout the supply chain including dyeing and finishing chemicals." },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function FormalShirtsContent() {
  const [activeConstruction, setActiveConstruction] = useState("poplin");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const ac = CONSTRUCTIONS.find((c) => c.id === activeConstruction) ?? CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">

      {/* ════════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-formal-casual-shirts.webp"
            fill
            alt="Pakistan formal and casual shirts manufacturer — OEM woven shirts for corporate and fashion brands in USA, UK and Europe"
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
              <span className="text-gold">Formal & Casual Shirts</span>
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
              Formal &amp; Casual
              <br />
              <span className="text-gold">Shirts</span>
              <br />
              Manufacturer Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              MZ Global Trading connects international brands with Pakistan&rsquo;s
              certified woven shirt factories. Poplin, Oxford weave, twill, linen,
              chambray and dobby. 80&ndash;200 GSM. Wrinkle-resistant and easy-care
              finishes. GOTS, OEKO-TEX, BSCI. FOB / CIF export.
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

      {/* ════════════════════════════════════════════════════════════════════════
          STATS ANCHOR
      ════════════════════════════════════════════════════════════════════════ */}
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
                Formal &amp; Casual Shirts — Pakistan Woven Garment
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Shirt Sourcing Expertise Across Eight Fabric Constructions
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s established woven garment industry supplies boardroom-to-weekend
                shirt programmes across all major retail markets. From fine poplin formal shirts
                to linen casual — any construction, any collar, any certification.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "8", label: "Fabric Options" },
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

      {/* ════════════════════════════════════════════════════════════════════════
          BENTO GRID  id="bento-grid"
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* ROW 1: 2 bentos equal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Fabrics</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {CONSTRUCTIONS.slice(0, 6).map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3 border border-blue-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    {c.badge && (
                      <span className="mt-1 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>
                    )}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-violet-50 border border-violet-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-violet-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fit Profiles &amp; Sizing</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {FIT_PROFILES.map((f) => (
                  <div key={f.code} className="bg-white rounded-xl px-4 py-3 border border-violet-100 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{f.code}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{f.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{f.ease}</p>
                      <p className="text-xs text-violet-600 mt-0.5 leading-snug">{f.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-fits" label="Explore Fit Profiles" />
            </motion.div>
          </div>

          {/* ROW 2: 4 bentos compact */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Guide</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-xl p-3 border border-sky-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-navy-900">{t.gsm}</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <div className="w-full h-1.5 bg-sky-100 rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] text-gray-400 leading-snug">{t.season}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View Weight Guide" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🖊️</span>
              <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Decoration Methods</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2 border border-indigo-50">
                    <span className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{d.code}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{d.compat.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decorations" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-cyan-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-3 border border-cyan-50">
                    <p className="text-xs font-semibold text-navy-900 mb-1">{d.name}</p>
                    <div className="flex gap-1.5">
                      {d.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full border border-gray-200 ${s}`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{d.subtitle}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colors" label="Explore Colors" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-slate-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
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

          {/* ROW 3: 5-col (2+2+1) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-purple-50 border border-purple-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-purple-100">
                    <p className="text-xs font-bold text-purple-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Markets" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Quality Certifications</h3>
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

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-teal-100">
                    <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
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

          {/* ROW 4: 3-col (2+1) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-emerald-50 border border-emerald-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌿</span>
                <div>
                  <p className="text-emerald-700 text-xs font-semibold tracking-[0.2em] uppercase">Ethics</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Sustainable Sourcing</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {SUSTAINABILITY_ITEMS.map((s) => (
                  <div key={s.title} className="bg-white rounded-xl p-3 border border-emerald-100 flex flex-col gap-1">
                    <span className="text-base" aria-hidden="true">{s.icon}</span>
                    <p className="text-sm font-semibold text-navy-900">{s.title}</p>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full w-fit">{s.tag}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-fuchsia-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-fuchsia-200 text-fuchsia-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
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

      {/* ════════════════════════════════════════════════════════════════════════
          RESOURCES ROW
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Woven Shirt Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction guide, fabric selection and collar specifications for international buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Woven Garment Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times, certification requirements and fabric approval overview.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Spec Sheets &amp; Size Charts</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction spec sheets, collar measurement charts and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Formal Shirts?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, GSM and collar style confirmed — RFQ takes 3 minutes. Factory match and quotation within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — CONSTRUCTIONS — PRODUCT SHOWCASE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Product Showcase</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Fabric Constructions</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">Eight distinct woven constructions covering formal, casual and seasonal programmes. Each fabric delivers a different hand-feel, market positioning and decoration suitability.</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeConstruction === c.id}
                onClick={() => setActiveConstruction(c.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                  activeConstruction === c.id
                    ? "bg-navy-900 text-white border-navy-900"
                    : "bg-blue-50 text-navy-900 border-blue-100 hover:border-blue-300"
                }`}
              >
                {c.name}
                {c.badge && <span className="ml-2 text-[10px] font-bold text-gold">★</span>}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeConstruction}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 border border-gray-100 rounded-2xl p-8 shadow-xs">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-navy-900">{ac.name}</h3>
                  {ac.badge && (
                    <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">{ac.badge}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-1">GSM Range</p>
                    <p className="text-lg font-bold text-navy-900">{ac.gsm}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-1">Hand Feel</p>
                    <p className="text-sm text-navy-900">{ac.hand}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{ac.detail}</p>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Technical Specification</p>
                  <p className="text-sm text-gray-600">{ac.spec}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="border border-gray-100 rounded-2xl p-6 shadow-xs">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Best For</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.best.map((b) => <span key={b} className="text-xs text-navy-900 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">{b}</span>)}
                  </div>
                </div>
                <div className="border border-gray-100 rounded-2xl p-6 shadow-xs">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Key Markets</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>)}
                  </div>
                </div>
                <div className="border border-gray-100 rounded-2xl p-6 shadow-xs">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Decoration</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.decorations.map((d) => (
                      <div key={d} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" aria-hidden="true" />
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

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — FIT PROFILES — TYPOGRAPHY-DRIVEN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-fits" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3">Fit &amp; Sizing</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900">Fit Profiles &amp; Sizing</h2>
            <div className="w-16 h-0.5 bg-gold mt-4" aria-hidden="true" />
          </div>
          <div className="space-y-0 divide-y divide-gray-200">
            {FIT_PROFILES.map((f, i) => (
              <motion.div
                key={f.code}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative py-8 flex gap-6 items-start overflow-hidden"
              >
                <div className="absolute left-0 top-0 select-none pointer-events-none" aria-hidden="true">
                  <span className="text-[120px] font-bold leading-none text-gray-100">0{i + 1}</span>
                </div>
                <div className="relative z-10 pl-4 flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pt-4">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-2">{f.name}</h3>
                    <p className="text-gold font-semibold text-base">{f.ease}</p>
                    <p className="text-gray-500 text-sm mt-1 max-w-lg">{f.market}</p>
                  </div>
                  <span className="shrink-0 self-start bg-violet-100 text-violet-700 text-sm font-bold px-4 py-2 rounded-xl">{f.code}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-gray-200 grid grid-cols-3 gap-8 text-center">
            {[["S / M / L / XL / XXL", "Standard collar sizes"], ["US / UK / EU", "Size standards available"], ["Custom", "Pattern grading on request"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-navy-900">{val}</p>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — WEIGHT GUIDE — DASHBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-gsm" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Guide</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Fabric Weight Selection</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">GSM determines seasonality, drape quality, decoration receptivity and market price tier across all eight constructions.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Full GSM Range", val: "80–200", sub: "Across all 8 constructions" },
              { label: "Most Ordered", val: "100–140", sub: "Year-round commercial" },
              { label: "Formal Minimum", val: "80 GSM", sub: "Fine poplin / end-on-end" },
              { label: "Linen Maximum", val: "200 GSM", sub: "Heavyweight summer linen" },
            ].map((m) => (
              <div key={m.label} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-navy-900">{m.val}</p>
                <p className="text-xs text-gray-500 mt-1">{m.sub}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {GSM_TIERS.map((tier) => (
              <div key={tier.gsm} className={`bg-white rounded-2xl p-7 border-2 ${tier.featured ? "border-gold shadow-lg" : "border-gray-100 shadow-xs"}`}>
                {tier.featured && (
                  <span className="inline-block mb-3 text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>
                )}
                <p className={`text-3xl font-bold mb-1 ${tier.featured ? "text-gold" : "text-navy-900"}`}>{tier.gsm}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{tier.name}</p>
                <p className="text-sm font-semibold text-navy-900 mb-3">{tier.season}</p>
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${tier.featured ? "bg-gold" : "bg-navy-900/30"}`} style={{ width: `${tier.pct}%` }} aria-hidden="true" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{tier.pct}% of orders</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tier.desc}</p>
                <p className="text-xs text-gold font-semibold mt-3">{tier.market}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 overflow-x-auto">
            <p className="text-sm font-bold text-navy-900 mb-4">Construction × Weight Reference</p>
            <table className="w-full text-xs min-w-[480px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 text-gray-400 font-semibold">Construction</th>
                  <th className="text-center py-2 px-2 text-gray-400 font-semibold">GSM Range</th>
                  <th className="text-left py-2 pl-4 text-gray-400 font-semibold">Primary Season</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {CONSTRUCTIONS.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2.5 pr-4 font-semibold text-navy-900">{c.name}</td>
                    <td className="py-2.5 px-2 text-center text-gold font-bold">{c.gsm}</td>
                    <td className="py-2.5 pl-4 text-gray-500">{c.best[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — DECORATION — NEUMORPHISM UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-decoration" className="py-20 lg:py-28" style={{ background: "#e8ecf0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Decoration</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Decoration Methods</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Formal shirt programmes typically use fine embroidery or monogramming. Casual constructions support a broader decoration range — each method suited to specific fabric types.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DECO_METHODS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl p-7 flex flex-col gap-4"
                style={{ background: "#e8ecf0", boxShadow: "8px 8px 16px #c5c9cc, -8px -8px 16px #ffffff" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: "#e8ecf0", boxShadow: "4px 4px 8px #c5c9cc, -4px -4px 8px #ffffff" }}
                  >
                    <span className="text-navy-900 font-bold text-sm">{d.code}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-900">{d.method}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{d.best}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Compatible Constructions</p>
                  <div className="flex flex-wrap gap-2">
                    {d.compat.map((c) => (
                      <span key={c} className="text-xs bg-white text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full shadow-xs">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl px-4 py-3 text-xs text-indigo-700 bg-indigo-50 border border-indigo-100">{d.note}</div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOUR PROGRAMS — GLASSMORPHISM UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-colors" className="relative py-20 lg:py-28 overflow-hidden bg-navy-900">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-violet-500/15 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Colour Programs</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">Full PMS colour matching across all eight constructions. Lab dip approval is submitted for buyer sign-off before bulk fabric is dyed or cut.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-2">
                  {d.swatches.map((s, idx) => (
                    <div key={idx} className={`w-7 h-7 rounded-full border-2 border-white/20 shadow-xs ${s}`} aria-hidden="true" />
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
            {["bg-white","bg-sky-200","bg-blue-400","bg-blue-700","bg-navy-900","bg-slate-600","bg-gray-400","bg-stone-300","bg-red-700","bg-rose-400","bg-amber-200","bg-emerald-600"].map((c, i) => (
              <div key={i} className={`h-10 rounded-xl ${c} border border-white/10 opacity-90`} aria-hidden="true" />
            ))}
          </div>
          <p className="text-white/40 text-xs mt-3 text-center">Illustrative palette — full PMS range available. Formal shirt staples: white, blue, ecru, light grey, pale pink, lavender</p>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM & CUSTOM — CINEMATIC UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="py-20 lg:py-28" style={{ background: "#0a0a1a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM &amp; Custom</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Custom Development Programs</h2>
              <p className="text-gray-400 leading-relaxed mb-8">Every aspect of your shirt programme — from fabric construction through to retail packaging — can be developed to your brand specification. We manage the detail so you manage the brand.</p>
              <Link
                href="/rfq/"
                className="inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors"
              >
                Start Your Programme <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OEM_FEATURES.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="border border-gold/20 rounded-2xl p-6 hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,160,23,0.1)] transition-all"
                  style={{ background: "#0f0f28" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">{f.num}</span>
                    <h3 className="text-sm font-bold text-white">{f.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKETS — RETAIL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Markets</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Industry Applications</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Formal and casual shirts are sourced across corporate, hospitality, fashion and wholesale channels. Each sector has distinct fabric, collar and certification requirements.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-md hover:border-gold/30 transition-all"
              >
                <div className={`${s.color} px-6 py-4 flex items-center gap-3`}>
                  <span className="text-2xl font-bold text-white">{s.abbr}</span>
                  <h3 className="text-base font-bold text-white">{s.name}</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{s.detail}</p>
                  <span className="text-xs font-semibold text-gold">{s.market}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[["USA / Canada", "Primary Market"], ["UK / Europe", "Key Market"], ["Middle East", "Major Market"], ["Asia / Oceania", "Growth Market"]].map(([region, tier]) => (
              <div key={region} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-xs">
                <p className="text-navy-900 font-semibold text-sm">{region}</p>
                <p className="text-gold text-xs mt-1">{tier}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS — BENTO UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Certifications Available</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Pakistan&rsquo;s certified woven garment factories carry internationally recognised standards. Specify required certifications in your RFQ — factory matching is aligned to your compliance needs.</p>

          {/* Hero stat */}
          <div className="bg-navy-900 rounded-2xl p-8 mb-6 flex flex-col sm:flex-row gap-6 items-center">
            <div className="text-center sm:text-left shrink-0">
              <p className="text-6xl font-bold text-gold">10+</p>
              <p className="text-white text-sm mt-1">Certifications Available</p>
            </div>
            <div className="w-px h-16 bg-white/10 hidden sm:block" aria-hidden="true" />
            <p className="text-gray-300 text-sm leading-relaxed">GOTS for organic cotton programmes, OEKO-TEX Standard 100 for chemical compliance at EU/UK borders, BSCI and Sedex for social responsibility auditing, ISO 9001 for quality process control. Specify your required standard in your RFQ.</p>
          </div>

          {/* Key certs — large bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {CERTIFICATIONS.slice(0, 2).map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-2 border-gold/20 bg-gold/5 rounded-2xl p-6 flex gap-4"
              >
                <div className="rounded-xl border border-gray-100 bg-white flex items-center justify-center p-2 shrink-0" style={{ width: 80, height: 60 }}>
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={72} height={52} className="object-contain w-full h-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-navy-900">{c.name}</h3>
                    <span className="text-[10px] font-semibold text-gold bg-gold/15 px-2 py-0.5 rounded-full">{c.tier}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{c.full}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Standard certs — 4-col */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {CERTIFICATIONS.slice(2, 6).map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 hover:border-gold hover:shadow-xs transition-all"
              >
                <div className="rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center p-2" style={{ height: 52 }}>
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={64} height={44} className="object-contain w-full h-full" />
                </div>
                <h3 className="text-sm font-bold text-navy-900">{c.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed flex-1">{c.desc}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${c.tier === "Standard" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{c.tier}</span>
              </motion.div>
            ))}
          </div>

          {/* Optional certs — 4-col */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CERTIFICATIONS.slice(6).map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 hover:border-gold hover:shadow-xs transition-all"
              >
                <div className="rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center p-2" style={{ height: 52 }}>
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={64} height={44} className="object-contain w-full h-full" />
                </div>
                <h3 className="text-sm font-bold text-navy-900">{c.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed flex-1">{c.desc}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${c.tier === "Premium" ? "bg-gold/15 text-gold" : c.tier === "Standard" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{c.tier}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — EXPORT & PACKAGING — DATA VISUALIZATION UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export &amp; Packaging</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Export Terms &amp; Packaging</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Four Incoterm options from Karachi and Port Qasim. Packaging is specified per programme to match your retail, hospitality or e-commerce requirements.</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {EXPORT_TERMS.map((e, i) => (
              <motion.div
                key={e.term}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center">
                  <span className="text-gold text-sm font-bold">{e.term}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-navy-900">{e.term}</p>
                  <p className="text-xs text-gray-400">{e.full}</p>
                </div>
                <p className="text-xs text-gold font-semibold">📍 {e.port}</p>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{e.desc}</p>
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
            <strong>Important:</strong> The durations shown are indicative guides. Actual timelines depend on factory scheduling, fabric sourcing, number of sample iterations, seasonal demand and your chosen Incoterm. Include your target delivery date in your RFQ for a specific assessment.
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
            Indicative total programme duration: approximately 90–130 days from RFQ to departure port. Add sea freight time for your destination. These figures are for planning purposes only and are not a contractual commitment.
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — MOODBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="py-20 lg:py-28" style={{ background: "#FAF9F7" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-emerald-700">Ethics &amp; Environment</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-5 leading-[1.1]">Sustainable Shirt Sourcing</h2>
            <div className="w-12 h-0.5 bg-emerald-600 mb-6" aria-hidden="true" />
            <p className="text-gray-500 text-lg leading-loose">Corporate buyers and fashion brands increasingly require verifiable sustainability credentials with their woven shirt programmes. Every programme can be certified to your environmental and ethical standards.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUSTAINABILITY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 shadow-md flex flex-col gap-4"
                style={{ transform: `rotate(${["-0.8deg", "0.6deg", "-0.5deg", "0.9deg", "-0.7deg", "0.5deg"][i]})` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-navy-900">{item.title}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 shrink-0">{item.tag}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <Link href="/rfq/" className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors bg-emerald-700 hover:bg-emerald-800">
              Request Certified Programme <span aria-hidden="true">→</span>
            </Link>
            <Link href="/qualitycompliance/certifications/" className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 text-navy-900 hover:border-navy-900 transition-colors">
              View All Certifications
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — PROCESS — SOCIAL-FIRST UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Our Sourcing Process</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">Six structured steps from specification to shipment — transparent, tracked and managed throughout.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-xs hover:shadow-md hover:border-gold/20 transition-all flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center shrink-0">
                    <span className="text-gold text-sm font-bold">{step.num}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{step.short}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Formal &amp; Casual Shirts FAQ</h2>
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

      {/* ════════════════════════════════════════════════════════════════════════
          SAME-TIER NAVIGATION
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Woven Garments</p>
            <h2 className="text-2xl font-bold text-navy-900">More Woven Garments</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Denim Jeans", desc: "Rigid 3×1 twill, stretch 98/2, raw and recycled cotton. Stone, acid and enzyme wash.", href: "/apparel/wovengarments/denimjeans/", img: "/images/hero/hero-denim-jeans.webp", alt: "Pakistan denim jeans manufacturer — OEM rigid and stretch denim for fashion brands in USA, UK and Europe" },
              { name: "Pants & Trousers", desc: "Twill, chino, linen and ponte. Business-casual to formal tailored trouser programmes.", href: "/apparel/wovengarments/pantsandtrousers/", img: "/images/hero/hero-pants-trousers.webp", alt: "Pakistan pants and trousers manufacturer — OEM chino and twill trousers for retail brands in USA and Europe" },
              { name: "Cargo Pants", desc: "Ripstop, canvas and stretch ripstop. Tactical, outdoor and trade workwear programmes.", href: "/apparel/wovengarments/cargopants/", img: "/images/hero/hero-cargo-pants.webp", alt: "Pakistan cargo pants manufacturer — OEM ripstop and canvas cargo trousers for outdoor and workwear brands" },
              { name: "Shorts", desc: "Chino, canvas, linen and nylon. Casual, athletic and resort wear programmes.", href: "/apparel/wovengarments/shorts/", img: "/images/hero/hero-shorts.webp", alt: "Pakistan shorts manufacturer — OEM chino and linen shorts for casual and resort wear brands worldwide" },
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

      {/* ════════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════════ */}
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
              Ready to Source Formal &amp; Casual Shirts<br />from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Woven shirt programmes from Pakistan&rsquo;s certified factories. Poplin, oxford, twill, linen — any construction, any collar, any certification. Submit the specification; we coordinate factory matching, fabric approval, sampling and bulk production to your timeline.
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
