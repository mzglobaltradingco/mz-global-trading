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
            : "border-2 border-gold text-navy-900 hover:bg-gold shadow-sm"
        }`}
        style={{
          animation: "btt-pulse 2.2s ease-out infinite",
        }}
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
  {
    id: "terry-loop",
    name: "Terry Loop",
    badge: "Hotel Standard",
    gsm: "380–450 GSM",
    hand: "Looped pile on both sides — maximum absorbency, classic hotel weight",
    best: ["5-Star Hotels", "City Properties", "Healthcare Spas"],
    markets: ["USA", "UK", "EU", "Middle East"],
    decorations: ["Embroidery", "Woven Patch"],
    detail:
      "Terry loop is the foundational construction for hotel bathrobes globally. Both surfaces carry uncut terry pile, delivering superior absorbency essential for post-shower and poolside use. At 380–450 GSM, the hand is substantial — guests perceive weight as quality. Combed Egyptian or Turkish cotton options produce the softer, more lustrous surface demanded by 5-star programmes.",
    spec: "100% combed cotton or Egyptian cotton. GSM 380–450. Double-loop construction. Reactive dyed or white. OEKO-TEX and GOTS options available.",
  },
  {
    id: "velour",
    name: "Velour / Sheared Terry",
    badge: "Luxury",
    gsm: "400–480 GSM",
    hand: "Velvet-smooth face, looped back — plush visual premium, hotel gift retail",
    best: ["Luxury Hotels", "Spa Gift Retail", "Premium Hospitality"],
    markets: ["USA", "UK", "EU", "Gulf"],
    decorations: ["Embroidery", "Woven Crest", "Heat Transfer"],
    detail:
      "Velour bathrobes are produced by shearing the terry pile on the face side to create a smooth velvet-like surface while retaining the absorbent loop backing. The result is a visually premium finish that photographs exceptionally well — critical for hotel amenity marketing and retail gift packaging. Preferred by luxury brands where visual impact outweighs raw absorbency.",
    spec: "100% combed cotton. Face sheared to velvet finish. Back looped for absorbency. GSM 400–480. Embroidery registration excellent on smooth face surface.",
  },
  {
    id: "waffle",
    name: "Waffle / Honeycomb",
    badge: "Spa Favourite",
    gsm: "300–380 GSM",
    hand: "Grid-textured surface — lightweight, fast-drying, spa and boutique hotel aesthetic",
    best: ["Boutique Hotels", "Spa Facilities", "Wellness Centres"],
    markets: ["EU", "UK", "USA", "Australia"],
    decorations: ["Embroidery", "Heat Transfer Label"],
    detail:
      "Waffle weave delivers a distinctive honeycomb texture that has become the signature look of boutique hotels and wellness spas. The open grid structure promotes rapid air circulation and fast drying — practical for facilities with high linen turnaround. At 300–380 GSM it is significantly lighter than terry, making it popular in warm-climate resorts and summer spa collections.",
    spec: "100% cotton or cotton-linen blend. Honeycomb cell weave, open grid structure. GSM 300–380. Faster drying than terry loop. Ideal for warm-climate spa environments.",
  },
  {
    id: "kimono-flat",
    name: "Kimono Flat Weave",
    badge: "Resort & Travel",
    gsm: "200–280 GSM",
    hand: "Lightweight flat woven — resort wrap, travel amenity, yoga and wellness retail",
    best: ["Beach Resorts", "Travel Retail", "Wellness Brands"],
    markets: ["Southeast Asia", "Middle East", "Australia", "USA"],
    decorations: ["Screen Print", "Embroidery", "Sublimation Print"],
    detail:
      "Kimono flat weave bathrobes are woven rather than knitted, producing a lightweight, breathable drape suited to tropical and beach resort environments. The silhouette takes inspiration from Japanese loungewear aesthetics — an open front wrap with wide sleeves and a tie waist. Popular as resort amenities, retreat gift items and airline business-class amenity kits.",
    spec: "100% cotton or cotton-bamboo blend. Plain or dobby weave. GSM 200–280. Folds compactly for travel packaging. Screen print and sublimation available on flat woven face.",
  },
  {
    id: "microfleece",
    name: "Microfleece / Coral Fleece",
    badge: "Value Hospitality",
    gsm: "280–350 GSM",
    hand: "Ultra-soft polyester pile — immediate warmth, soft hand, budget hospitality",
    best: ["Mid-Scale Hotels", "Holiday Rental", "Budget Hospitality"],
    markets: ["Eastern Europe", "South America", "Southeast Asia", "Russia/CIS"],
    decorations: ["Embroidery", "Heat Transfer"],
    detail:
      "Microfleece and coral fleece bathrobes offer exceptional softness at a more accessible price point than cotton terry. The polyester pile construction delivers instant warmth and dries extremely quickly — operationally advantageous for high-turnover hospitality properties. Increasingly popular in Airbnb premium properties and holiday rental programmes where guest experience matters but margin pressure is high.",
    spec: "100% polyester microfleece or coral fleece. GSM 280–350. Machine washable, quick-dry. Pilling resistance varies by fibre grade — specify anti-pill finish for commercial laundering environments.",
  },
];

const COLLAR_STYLES = [
  {
    code: "SHL",
    name: "Shawl Collar",
    market: "City hotels, 5-star international chains, branded hotel gift retail",
    desc: "The shawl collar is the defining silhouette of the classic hotel bathrobe — wide, overlapping lapels that frame the chest and create a secure, wrapping warmth. It reads as formal hospitality, communicating quality to the guest the moment they encounter it. Standard for major international hotel chains in USA, UK, Europe and the Gulf. Embroidery is placed on the left chest below the lapel fold.",
    note: "Industry default — 75% of hotel volume",
  },
  {
    code: "KIM",
    name: "Kimono Collar",
    market: "Boutique hotels, spa and wellness facilities, yoga retreats, beach resorts",
    desc: "The kimono collar is an open V-neckline with no structured lapel — clean, minimalist and contemporary. It aligns with the boutique hotel and spa aesthetic that has grown significantly since 2015. The front opening is wider, making it feel more relaxed and less formal than shawl. Popular in Japanese-inspired wellness facilities and European boutique properties seeking to differentiate from standard chain hotel aesthetics.",
    note: "Growing — boutique and wellness segment",
  },
  {
    code: "HOD",
    name: "Hooded",
    market: "Pool and beach resorts, children's resort programmes, active wellness facilities",
    desc: "The hooded bathrobe adds an integral hood for post-pool and post-beach use — practical warmth for outdoor transitions. Children's resort programmes almost universally specify hooded styles. In adult programmes, the hood communicates resort and leisure positioning. Construction requires additional labour in the hood attachment seam — factored into unit costing. Popular in Middle East and Caribbean resort properties.",
    note: "Pool, beach and resort specialist",
  },
];

const GSM_TIERS = [
  {
    gsm: "200–280",
    name: "Lightweight",
    context: "Resort & Travel",
    market: "Beach Resorts · Travel Retail · Southeast Asia · Middle East",
    pct: 30,
    featured: false,
    desc: "Kimono flat weave and lightweight waffle at this range. Compact for travel packaging, breathable for tropical environments. Not suitable for cold-climate hotel programmes.",
    color: "bg-sky-300",
  },
  {
    gsm: "300–400",
    name: "Mid-Weight",
    context: "Spa & Boutique",
    market: "Boutique Hotels · Spa · Waffle · Mid-Scale Hospitality",
    pct: 65,
    featured: true,
    desc: "The standard range for boutique hotel and spa programmes. Waffle and fleece constructions fall here — balanced between weight, drape and fast drying. Majority of programme volume ordered in this tier.",
    color: "bg-gold",
  },
  {
    gsm: "400–480+",
    name: "Luxury Weight",
    context: "5-Star Hotel & Premium Spa",
    market: "5-Star Chains · Luxury Spa · Gulf · USA Premium",
    pct: 50,
    featured: false,
    desc: "Terry loop and velour at luxury weights. The substantial hand is the primary quality signal for 5-star programmes — guests equate weight with quality. Higher absorbency and longer per-launder durability at commercial laundering cycles.",
    color: "bg-sky-500",
  },
];

const DECO_METHODS = [
  {
    code: "EMB",
    method: "Embroidery",
    best: "Hotel logos, crests and monograms — the primary decoration standard for hospitality",
    compat: ["Terry Loop", "Velour", "Waffle"],
    note: "Left chest is the industry-standard placement. Pocket embroidery available simultaneously.",
  },
  {
    code: "WPT",
    method: "Woven Patch / Crest",
    best: "Heritage hotel brands and resorts requiring a woven badge with fine detail",
    compat: ["All constructions"],
    note: "Woven badge is sewn onto the chest. Higher minimum orders for badge production.",
  },
  {
    code: "HTL",
    method: "Heat Transfer Label",
    best: "Clean, flat branding on flat weave and fleece — limited raised texture",
    compat: ["Kimono Flat Weave", "Microfleece"],
    note: "Not recommended for terry loop — pile surface reduces adhesion quality.",
  },
  {
    code: "NOD",
    method: "No Decoration",
    best: "White goods programmes, laundry-managed hospitality, plain institutional supply",
    compat: ["All constructions"],
    note: "Plain white terry loop is the standard for institutional hospitality volume supply.",
  },
];

const DYE_OPTIONS = [
  { name: "Hotel White", subtitle: "Institutional Standard", note: "Optical white across all constructions. Standard for hotel programmes — communicates hygiene and cleanliness to guests.", swatches: ["bg-gray-50", "bg-white", "bg-gray-100", "bg-gray-200", "bg-stone-50"] },
  { name: "Solid Colour", subtitle: "Resort Brand Palette", note: "Full PMS colour matching for resort branding programmes. Lab dip approval before bulk production. Popular for beach resort and spa identity programmes.", swatches: ["bg-teal-400", "bg-rose-400", "bg-indigo-400", "bg-amber-400", "bg-emerald-400"] },
  { name: "Heather / Mélange", subtitle: "Boutique Aesthetic", note: "Mélange yarn produces a contemporary, slightly textured tonal effect. Associated with boutique hotel and wellness brand positioning.", swatches: ["bg-gray-300", "bg-blue-200", "bg-stone-300", "bg-slate-300", "bg-zinc-300"] },
  { name: "Yarn-Dyed Stripe", subtitle: "Resort & Spa Identity", note: "Contrasting stripe at chest panel or hem provides a distinctive resort identity marker without full print cost. Available on terry and flat weave.", swatches: ["bg-navy-900", "bg-gold", "bg-teal-600", "bg-rose-600", "bg-white"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic cotton sourcing and processing certification — required for hotels marketing organic guest amenities", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances in finished bathrobe — EU and UK import compliance standard", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — labour standards and worker welfare verified across supply chain", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data sharing for hospitality procurement transparency", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control — required by major hotel chain procurement", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled polyester content verification — relevant for microfleece programmes", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance certification", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "The most rigorous social certification — independently audited worker rights, wages and safe conditions", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency in textile processing — relevant for dyeing operations", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Construction & Weight Specification", desc: "Terry loop, velour, waffle, kimono or fleece — any construction sourced to your GSM and quality specification from certified Pakistan terry mills." },
  { num: "02", title: "Collar and Silhouette Engineering", desc: "Shawl, kimono or hooded collar specified to your exact dimensions. Placket, tie belt and pocket configuration to your design brief." },
  { num: "03", title: "Hotel Logo Embroidery", desc: "Logo embroidery on left chest and pocket as standard. Thread colour matched to your brand guidelines. Multiple placement combinations available." },
  { num: "04", title: "PMS Colour Programme", desc: "White, solid colour, mélange or stripe — full PMS range via reactive dyeing with lab dip approval before bulk production begins." },
  { num: "05", title: "Branded Packaging", desc: "Polybag and hanger, retail box, cloth gift bag or non-woven pouch — to your brand specification for hotel amenity or retail gift programmes." },
  { num: "06", title: "Size Programme Management", desc: "XS/S through XL/XXL or custom size grading. One-size-fits-most options for standardised hotel room programmes." },
];

const SECTORS = [
  { abbr: "LXH", name: "Luxury Hotels", detail: "5-star international chains requiring branded shawl collar terry with embroidery and luxury packaging", market: "USA · Gulf · EU · UK" },
  { abbr: "SPA", name: "Spa & Wellness", detail: "Boutique spa and wellness centres preferring waffle or kimono styles aligned to wellness aesthetics", market: "EU · UK · Australia" },
  { abbr: "RST", name: "Resort & Pool", detail: "Hooded velour and waffle for beach resort and pool-side programmes in warm climates", market: "Middle East · SE Asia · Caribbean" },
  { abbr: "RET", name: "Retail Gift", detail: "Retail gift programmes requiring premium packaging — retail box, ribbon-wrapped or gift-bag presentation", market: "USA · UK · Global E-commerce" },
  { abbr: "MSH", name: "Mid-Scale Hospitality", detail: "Hotel chains and serviced apartments requiring volume supply at competitive pricing", market: "Worldwide" },
  { abbr: "WSL", name: "Wholesale & Distribution", detail: "Multi-brand hospitality distributors supplying hotel groups and independent properties", market: "USA · EU · Middle East" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading only." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance. Price includes delivery to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight to your port. Buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all inland and ocean logistics from factory gate. Lowest quoted price, highest buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "🛍️", label: "Individual Polybag + Hanger", note: "Standard hospitality bulk" },
  { icon: "📦", label: "Retail Box", note: "Gift and retail presentation" },
  { icon: "🎁", label: "Cloth / Non-Woven Gift Bag", note: "Premium spa and resort" },
  { icon: "📋", label: "Bulk Folded", note: "Institutional linen supply" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Mill shortlist, pricing and construction confirmation", color: "bg-gold" },
  { stage: "Sample Production", days: "18–25", desc: "Pre-production samples with embroidery setup and approval", color: "bg-rose-500" },
  { stage: "Bulk Production", days: "50–75", desc: "From confirmed PO and approved embroidered sample", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection before vessel loading", color: "bg-teal-600" },
  { stage: "Sea Freight", days: "20–30", desc: "FCL/LCL from Karachi or Port Qasim", color: "bg-slate-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton across terry loop, velour and waffle constructions. Fully traceable to certified farms.", tag: "GOTS" },
  { icon: "💧", title: "Water Efficiency", desc: "Enzyme washing processes replace conventional stone washing — lower water consumption and zero stone dust waste in production.", tag: "Process" },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester available for microfleece programmes targeting sustainability-conscious hotel procurement.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited mills. Worker welfare, fair wages and safe working conditions independently verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "OEKO-TEX certified reactive dyeing only. No azo dyes, no restricted substances — meeting EU and UK chemical import standards.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags, FSC-certified boxes and natural cotton gift bags available on request for any hotel or retail programme.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Specify construction, GSM, collar style, logo embroidery, size programme, quantity, destination and target delivery date via our RFQ form." },
  { num: "02", title: "Mill Matching", short: "Shortlisting", desc: "We evaluate Pakistan's certified terry mills against your construction and certification requirements — 2–3 shortlisted mills with pricing returned in 3–5 working days." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Pre-production samples produced to your specification including embroidery registration. Typically 18–25 days from spec lock and fabric confirmation." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Evaluate construction weight, collar drape, embroidery placement, colour match and packaging. Revise before purchase order placement." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Fabric cut, embroidery run and full construction. Duration governed by order volume, construction complexity and factory scheduling." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection, packing verification and loading. FCL or LCL from Karachi or Port Qasim under your chosen Incoterm." },
];

const FAQS = [
  {
    q: "What is the difference between shawl collar, kimono collar and hooded bathrobes for hotel use?",
    a: "Shawl collar is the standard hotel industry silhouette — wide overlapping lapels that wrap securely and communicate premium quality. It dominates 5-star and city hotel programmes worldwide. Kimono collar is an open V-neckline without structured lapels — cleaner, more minimal and aligned to boutique hotel and spa aesthetics. Hooded adds an integral hood for post-pool and post-beach use, standard in resort and children's programmes. All three collar styles are available across terry loop, velour and waffle constructions.",
  },
  {
    q: "What GSM range is appropriate for a 5-star hotel versus a mid-scale hospitality programme?",
    a: "5-star hotel programmes typically specify 400–480 GSM terry loop or velour — the substantial weight is the primary quality signal guests experience. Mid-scale and budget hospitality programmes generally specify 300–380 GSM — either waffle weave or mid-weight terry, which balances cost, laundry durability and acceptable guest experience. Microfleece at 280–350 GSM is an option for price-sensitive programmes. For any programme, share your target price band in your RFQ and we will match you with the appropriate construction and mill.",
  },
  {
    q: "Can you embroider hotel logos and crests on the chest and pocket simultaneously?",
    a: "Yes. Embroidery on the left chest (below the lapel fold) and on the chest pocket simultaneously is standard in hospitality programmes. Both positions are set up in the same embroidery run. Thread colours are matched to your brand guidelines — typically pantone-matched for hotel brand standards. Woven badge or crest is an alternative if your logo has fine detail that requires a woven medium rather than stitch count.",
  },
  {
    q: "What packaging options are available for a retail gift-box bathrobe launch?",
    a: "Retail gift programmes can be packaged in a rigid retail box, a cloth drawstring gift bag, a non-woven zipper pouch, or an individual polybag with hanger for rack presentation. Branded sleeve, ribbon and tissue options are available within the packaging brief. Share your retail packaging concept in your RFQ — we manage the packaging specification alongside the bathrobe programme.",
  },
  {
    q: "Do velour bathrobes require different care instructions from terry loop for commercial hotel laundry?",
    a: "Yes. Velour's sheared face surface is more susceptible to abrasion in commercial tumble drying — lower heat settings and reduced mechanical action are recommended to maintain the smooth pile surface over multiple laundering cycles. Terry loop is more robust in industrial laundering. For hotel programmes with high daily laundry turnover, terry loop at 400+ GSM generally delivers better lifecycle cost than velour. Specify your laundry cycle frequency in your RFQ so the mill can recommend the appropriate construction grade.",
  },
  {
    q: "What are typical indicative lead times for a custom bathrobe programme with embroidery?",
    a: "Indicative timelines for a custom embroidered bathrobe programme: RFQ to quotation 3–5 days, pre-production sample with embroidery 18–25 days from spec confirmation, bulk production 50–75 days from approved sample and PO, pre-shipment inspection 3–5 days, sea freight 20–30 days to most destinations. Total indicative programme duration from RFQ to departure port is approximately 95–135 days. These are planning guides — actual timelines depend on factory scheduling, sample iteration rounds and seasonal demand.",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function BathrobesContent() {
  const [activeConstruction, setActiveConstruction] = useState("terry-loop");
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
            src="/images/hero/hero-bathrobes.webp"
            fill
            alt="Pakistan bathrobe manufacturer — OEM terry and velour hotel bathrobes for spa and resort programmes in USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/78" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/bathlinen/" className="hover:text-gold transition-colors">Bath Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Bathrobes</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Hotel & Spa Linen Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Bathrobe
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
              MZ Global Trading connects hotel procurement directors, spa buyers and resort managers
              with Pakistan&rsquo;s certified terry mills. Shawl collar, kimono and hooded styles in
              terry loop, velour and waffle. 350&ndash;500 GSM. OEKO-TEX and GOTS certified.
              FOB&nbsp;/&nbsp;CIF export.
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
                onClick={() => scrollToId("section-constructions")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Constructions
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
                Bathrobe Sourcing — Pakistan Terry Mill Access
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                The Bathrobe Is the Room&rsquo;s Most Visible Brand Statement
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s terry mill infrastructure produces bathrobes for international hotel chains and luxury spa brands across 35+ markets. Collar construction, embroidery placement and GSM selection — all specified directly with certified mills.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "5", label: "Construction Types" },
                { val: "3", label: "Collar Styles" },
                { val: "50+", label: "Vetted Factories" },
                { val: "10+", label: "Factory Certifications" },
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
          MAIN BENTO GRID  id="bento-grid"
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Bathrobe Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1: Constructions + Collar Styles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* Bento 1 — Constructions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0D1128] border border-indigo-900/40 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🛁</span>
                <div>
                  <h3 className="text-xl font-bold text-white mt-0.5">Bathrobe Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.slice(0, 4).map((c) => (
                  <div key={c.id} className="bg-white/8 rounded-xl p-3.5 border border-white/10">
                    <p className="text-sm font-semibold text-white">{c.name}</p>
                    <p className="text-xs text-indigo-300 mt-0.5">{c.gsm}</p>
                    {c.badge && (
                      <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/15 px-2 py-0.5 rounded-full">
                        {c.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            {/* Bento 2 — Collar Styles */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">👗</span>
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Collar Styles</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {COLLAR_STYLES.map((c) => (
                  <div key={c.code} className="bg-white rounded-xl px-4 py-3 border border-rose-100 flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {c.code}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                      <p className="text-xs text-rose-600 mt-0.5 font-medium">{c.note}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-snug">{c.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-collar" label="Explore Collar Styles" />
            </motion.div>
          </div>

          {/* Row 2: 4 bentos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            {/* Bento 3 — GSM */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-amber-700 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Guide</h3>
              <div className="flex flex-col gap-3 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-xl p-3 border border-amber-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-navy-900">{t.gsm}</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Most Ordered</span>}
                    </div>
                    <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] font-semibold text-amber-700">{t.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{t.context}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View Weight Guide" />
            </motion.div>

            {/* Bento 4 — Decoration */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🪡</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Embroidery</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Logo & Decoration</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-purple-50">
                    <span className="w-6 h-6 rounded bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {d.code}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{d.compat.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decoration" />
            </motion.div>

            {/* Bento 5 — Colour */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-navy-900 border border-navy-900 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-white leading-tight">Colour Programmes</h3>
              <div className="flex flex-col gap-3 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white/8 rounded-xl p-3 border border-white/10">
                    <p className="text-xs font-semibold text-white mb-1.5">{d.name}</p>
                    <div className="flex gap-1.5">
                      {d.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full border border-white/20 ${s}`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{d.subtitle}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colors" label="View Colour Options" />
            </motion.div>

            {/* Bento 6 — OEM */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏨</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Hotel Programmes</h3>
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

          {/* Row 3: Markets + Certs + Export */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

            {/* Bento 7 — Markets */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-teal-700 text-xs font-semibold tracking-[0.2em] uppercase">Sectors</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Hospitality Sectors</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-xs font-bold text-teal-700">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Sectors" />
            </motion.div>

            {/* Bento 8 — Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-green-700 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
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

            {/* Bento 9 — Export */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-slate-50 border border-slate-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-slate-100">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {e.term}
                    </span>
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

          {/* Row 4: Sustainability + Process */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Bento 10 — Sustainability */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌿</span>
                <div>
                  <p className="text-lime-700 text-xs font-semibold tracking-[0.2em] uppercase">Ethics</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Sustainable Sourcing</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {SUSTAINABILITY_ITEMS.map((s) => (
                  <div key={s.title} className="bg-white rounded-xl p-3 border border-lime-100 flex flex-col gap-1">
                    <span className="text-base" aria-hidden="true">{s.icon}</span>
                    <p className="text-sm font-semibold text-navy-900">{s.title}</p>
                    <span className="text-[10px] font-semibold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full w-fit">{s.tag}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            {/* Bento 11 — Sourcing Process */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-fuchsia-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-fuchsia-200 text-fuchsia-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {p.num}
                    </span>
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
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Bathrobe Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction selection, GSM guidance and collar style decisions for hotel procurement buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Terry Mill Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times, certification requirements and hospitality procurement overview.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Bathrobe Spec Sheets</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction spec sheets, size programmes and certification documentation for hotel procurement.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Bathrobes?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, GSM, collar style and embroidery confirmed — RFQ takes 3 minutes. Mill match returned within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — CONSTRUCTIONS — CINEMATIC UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-[#07040F] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold/70 text-xs tracking-[0.4em] uppercase font-semibold mb-3">
              — Construction Selection Guide —
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.05] mb-4">
              Five Bathrobe Constructions<br />
              <span className="text-gold">for Every Hospitality Tier</span>
            </h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              Construction choice determines hand-feel, absorbency, laundry durability, visual positioning and cost. Each has a defined role in the hospitality specification hierarchy.
            </p>
          </div>

          {/* Construction selector tabs */}
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeConstruction === c.id}
                onClick={() => setActiveConstruction(c.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeConstruction === c.id
                    ? "bg-gold text-navy-900 border-gold"
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-gold/40"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeConstruction}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-3xl font-bold text-white">{ac.name}</h3>
                  {ac.badge && (
                    <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
                      {ac.badge}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-1">GSM_RANGE</p>
                    <p className="text-xl font-bold text-gold">{ac.gsm}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-1">HAND_FEEL</p>
                    <p className="text-sm text-white leading-snug">{ac.hand}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{ac.detail}</p>
                <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-2">TECHNICAL_SPEC</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{ac.spec}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-3">BEST_FOR[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.best.map((b) => (
                      <span key={b} className="text-xs text-white bg-white/10 px-3 py-1 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-3">KEY_MARKETS[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => (
                      <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-3">DECORATION[ ]</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.decorations.map((d) => (
                      <div key={d} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-300">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — COLLAR STYLES — EDITORIAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-collar" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-4">
                No. 02 / Collar Engineering
              </p>
              <h2 className="text-5xl sm:text-6xl font-bold text-navy-900 leading-[1] mb-8">
                Three<br />Collar<br />Silhouettes
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-8" aria-hidden="true" />
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
                Collar selection defines the bathrobe&rsquo;s market position before a guest reads a single brand tag. Shawl reads formal luxury. Kimono reads contemporary wellness. Hooded reads active resort.
              </p>
              <blockquote className="border-l-4 border-gold pl-6 text-xl font-medium text-navy-900 italic leading-relaxed">
                &ldquo;The collar style tells the guest which category of hospitality they are in — it is a positioning statement stitched into the seam.&rdquo;
              </blockquote>
            </div>
            <div className="flex flex-col gap-0 divide-y divide-gray-100">
              {COLLAR_STYLES.map((c, i) => (
                <motion.div
                  key={c.code}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="py-8 flex gap-6 items-start"
                >
                  <div className="shrink-0 text-right w-14">
                    <p className="text-5xl font-bold leading-none text-gray-100">0{i + 1}</p>
                    <p className="text-xs font-bold text-gold mt-1">{c.code}</p>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-navy-900 mb-1">{c.name}</h3>
                    <p className="text-sm text-rose-600 font-semibold mb-3">{c.note}</p>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{c.desc}</p>
                    <p className="text-xs text-gray-400 italic">{c.market}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-3 gap-8 text-center">
            {[["XS/S to XL/XXL", "Standard size programme"], ["One Size", "Fits most option available"], ["Custom", "Size grading on request"]].map(([val, label]) => (
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
          SECTION 3 — GSM WEIGHT — DASHBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-gsm" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Specification</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">GSM Weight — Hospitality Positioning Guide</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            GSM directly signals quality tier to the guest. Hotel procurement buyers at 5-star properties specify heavier constructions as a deliberate brand investment.
          </p>

          {/* KPI Tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: "GSM Range", val: "200–480+", sub: "Lightweight to luxury terry" },
              { label: "5-Star Standard", val: "400–480", sub: "Terry loop or velour" },
              { label: "Spa Standard", val: "300–380", sub: "Waffle or mid-weight terry" },
              { label: "Constructions", val: "5", sub: "Terry to microfleece" },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-navy-900">{m.val}</p>
                <p className="text-xs text-gray-500 mt-1">{m.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {GSM_TIERS.map((tier) => (
              <div key={tier.gsm} className={`bg-white rounded-2xl p-7 border-2 ${tier.featured ? "border-gold shadow-lg" : "border-gray-100 shadow-sm"}`}>
                {tier.featured && (
                  <span className="inline-block mb-3 text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Ordered
                  </span>
                )}
                <p className={`text-3xl font-bold mb-1 ${tier.featured ? "text-gold" : "text-navy-900"}`}>{tier.gsm} GSM</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{tier.name}</p>
                <p className="text-sm font-semibold text-navy-900 mb-3">{tier.context}</p>
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${tier.featured ? "bg-gold" : "bg-navy-900/30"}`} style={{ width: `${tier.pct}%` }} aria-hidden="true" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tier.desc}</p>
                <p className="text-xs text-gold font-semibold mt-3">{tier.market}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — DECORATION & EMBROIDERY — MOODBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-decoration" className="bg-[#FBF9F5] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Branding & Decoration</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Hotel Logo Embroidery &amp; Decoration Methods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DECO_METHODS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                style={{ transform: `rotate(${["-1deg", "0.7deg", "-0.5deg", "1deg"][i]})` }}
                className="bg-white rounded-2xl p-7 shadow-md border border-gray-100 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">{d.code}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">{d.method}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{d.best}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Compatible with</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.compat.map((c) => (
                      <span key={c} className="text-[11px] bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 bg-navy-900 rounded-2xl p-8 text-white grid sm:grid-cols-3 gap-8">
            {[
              ["Left Chest", "Standard hotel placement — below lapel fold, above pocket"],
              ["Chest Pocket", "Secondary placement — simultaneous with chest logo, same run"],
              ["Back Center", "Large-format resort and spa identity programmes"],
            ].map(([place, desc]) => (
              <div key={place}>
                <p className="text-gold text-sm font-bold mb-1">{place}</p>
                <p className="text-gray-300 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOURS — GRADIENT UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-colors" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-navy-900 to-[#0D1B2A]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Colour Programmes for Hotel &amp; Resort Bathrobe</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">
            Hotel white is the institutional standard. Resort programmes increasingly use branded palette colour to extend property identity into the guest bathroom experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col gap-4"
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
          <div className="mt-10 grid grid-cols-4 sm:grid-cols-8 gap-2">
            {["bg-gray-50","bg-teal-400","bg-rose-400","bg-indigo-500","bg-amber-400","bg-emerald-500","bg-sky-400","bg-stone-300"].map((c, i) => (
              <div key={i} className={`h-10 rounded-xl ${c} opacity-85`} aria-hidden="true" />
            ))}
          </div>
          <p className="text-white/40 text-xs mt-3 text-center">
            Illustrative palette — full PMS range available via reactive dyeing. Lab dip approval before bulk production.
          </p>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM / HOTEL PROGRAMMES — CORPORATE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM &amp; Custom</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Hotel Bathrobe Programme Development</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every element of your hotel bathrobe programme — construction, collar, embroidery, colour, size programme and packaging — is specified to your brand requirements and managed through to bulk production.
              </p>
              <Link
                href="/rfq/"
                className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-800 transition-colors"
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
                  className="border border-gray-100 rounded-2xl p-6 hover:border-gold hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">
                      {f.num}
                    </span>
                    <h3 className="text-sm font-bold text-navy-900">{f.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKETS — ISOMETRIC UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-slate-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Hospitality Sectors</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Bathrobe Buyers by Hospitality Sector</h2>
          <p className="text-gray-400 mb-12 max-w-2xl leading-relaxed">
            Bathrobe programmes span luxury hotel chains, independent boutique properties, spa facilities, resort amenity suppliers and retail gift buyers. Each sector specifies differently.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                whileHover={{ scale: 1.03, rotateX: -4, rotateY: 4 }}
                style={{ transformStyle: "preserve-3d" }}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-7 flex flex-col gap-4 cursor-default"
              >
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gold/20 border border-gold/30 flex items-center justify-center">
                    <span className="text-gold text-base font-bold">{s.abbr}</span>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-700 px-2.5 py-1 rounded-full">{s.market}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{s.name}</h3>
                  <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{s.detail}</p>
                </div>
                <div className="w-8 h-0.5 bg-gold/40 mt-auto" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[["USA / Canada", "Primary Market"], ["UK / Europe", "Key Market"], ["Gulf / Middle East", "Growing Market"], ["SE Asia / Australia", "Resort Market"]].map(([region, tier]) => (
              <div key={region} className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
                <p className="text-white font-semibold text-sm">{region}</p>
                <p className="text-gold text-xs mt-1">{tier}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS — INFOGRAPHIC UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Certifications for Hotel Bathrobe Procurement</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Hotel procurement departments increasingly require documentation at purchase. Active certification documentation from certified Pakistan terry mills is available on request.
          </p>
          <div className="bg-navy-900 rounded-2xl p-8 mb-8 flex flex-col sm:flex-row gap-8 items-center">
            <div className="text-center sm:text-left shrink-0">
              <p className="text-6xl font-bold text-gold">10+</p>
              <p className="text-white text-sm mt-1">Active Certifications</p>
            </div>
            <div className="w-px h-16 bg-white/10 hidden sm:block" aria-hidden="true" />
            <p className="text-gray-300 text-sm leading-relaxed">
              OEKO-TEX Standard 100 and GOTS are the priority certifications for hotel buyers in USA, UK and EU markets. BSCI, Sedex and SA8000 address ethical procurement requirements increasingly mandated by major hotel chain supplier codes of conduct. Specify required certifications in your RFQ — mill matching is aligned to your compliance programme.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border border-gray-100 rounded-2xl p-6 flex flex-col gap-3 hover:border-gold hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center p-2 shrink-0" style={{ width: 72, height: 52 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={64} height={44} className="object-contain w-full h-full" />
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${c.tier === "Premium" ? "bg-gold/15 text-gold" : c.tier === "Optional" ? "bg-gray-100 text-gray-500" : "bg-green-50 text-green-700"}`}>
                    {c.tier}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-navy-900">{c.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{c.full}</p>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{c.desc}</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Export Terms &amp; Bathrobe Packaging Options</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Choose the Incoterm that matches your logistics arrangements. Packaging is specified per programme — from institutional polybag bulk to luxury retail gift box.
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
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-3"
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

          <h3 className="text-lg font-bold text-navy-900 mb-4">Bathrobe Packaging Options</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {PACK_OPTIONS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
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
              <span aria-hidden="true">ℹ️</span>
              Guide only — actual timelines vary
            </span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800 leading-relaxed">
            <strong>Important:</strong> The durations below are indicative planning guides. Actual timelines depend on factory scheduling, embroidery setup complexity, number of sample iterations, seasonal demand and chosen Incoterm. Share your target delivery date in your RFQ for a programme-specific assessment.
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
            Indicative total programme duration: approximately 95–135 days from RFQ to departure port. Add sea freight time for your destination. These figures are for planning purposes only and are not a contractual commitment.
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — SCANDINAVIAN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-[#F8FAF7] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-[#4a7c59]">
              Ethics &amp; Environment
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-5 leading-[1.1]">
              Sustainable<br />Terry Sourcing
            </h2>
            <div className="w-12 h-0.5 bg-[#4a7c59] mb-6" aria-hidden="true" />
            <p className="text-gray-500 text-lg leading-loose">
              Hotel procurement departments and spa brands operate under growing sustainability mandates. Every bathrobe programme can be specified to verifiable environmental and ethical standards.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {SUSTAINABILITY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-2xl border-2 border-[#4a7c59]/20 flex items-center justify-center bg-white">
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-navy-900">{item.title}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#4a7c59]/10 text-[#4a7c59]">{item.tag}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-loose">{item.desc}</p>
                </div>
                <div className="w-8 h-px bg-[#4a7c59]/30" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
          <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <Link href="/rfq/" className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors bg-[#4a7c59] hover:bg-[#3d6b4a]">
              Request Certified Bathrobe Programme <span aria-hidden="true">→</span>
            </Link>
            <Link href="/qualitycompliance/certifications/" className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 text-navy-900 hover:border-navy-900 transition-colors">
              View All Certifications
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — PROCESS — SWISS DESIGN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t-4 border-navy-900 pt-8 mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-2">
                MZ Global Trading — Bathrobe Sourcing Programme
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy-900">Our Process</h2>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Six structured stages from hotel bathrobe specification to shipment at destination port.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-6 items-start p-7 border-b border-gray-100 last:border-b-0"
              >
                <div className="shrink-0">
                  <p className="text-6xl font-bold leading-none text-gray-100">{step.num}</p>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-navy-900" aria-hidden="true" />
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{step.short}</p>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 border-t-2 border-gold pt-8 flex flex-col sm:flex-row gap-5">
            <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-800 transition-colors">
              Begin Your Bathrobe Programme — Step 01 <span aria-hidden="true">→</span>
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
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Hotel Buyer Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Bathrobe Sourcing FAQ</h2>
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
          SAME-TIER PAGES — Bath Linen
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Bath Linen</p>
            <h2 className="text-2xl font-bold text-navy-900">More Bath Linen</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Towels", desc: "Six constructions — terry loop to zero twist. 450–600 GSM. Hotel and retail programmes.", href: "/hometextile/bathlinen/towels/", img: "/images/hero/hero-towels.webp", alt: "Pakistan bath towel manufacturer — OEM terry cotton towels for hotels and retailers in USA, UK and Europe" },
              { name: "Institutional Towels", desc: "Plain white terry and dobby border stripe. Hotel, hospital and hospitality bulk supply.", href: "/hometextile/bathlinen/institutionaltowels/", img: "/images/hero/hero-institutional-towels.webp", alt: "Pakistan institutional towel manufacturer — plain white and dobby border terry for hotel and healthcare bulk supply" },
              { name: "Bath Mats", desc: "Tufted terry, chenille and memory foam. Anti-slip backing, custom sizing.", href: "/hometextile/bathlinen/bathmats/", img: "/images/hero/hero-bath-mats.webp", alt: "Pakistan bath mat manufacturer — OEM tufted and chenille bath mats with anti-slip backing for hotel and retail" },
              { name: "Beach & Pool Towels", desc: "Velour, fouta and microfiber. Sublimation and reactive print. Resort programmes.", href: "/hometextile/bathlinen/beachpooltowel/", img: "/images/hero/hero-beach-pool-towels.webp", alt: "Pakistan beach and pool towel manufacturer — OEM velour and sublimation print towels for resort programmes" },
            ].map((p) => (
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
              Ready to Source Bathrobes<br />from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Shawl collar terry for city hotels, kimono waffle for boutique spas, hooded velour for resort pools — any construction, any collar, hotel logo embroidered to specification. Submit the RFQ; receive a certified Pakistan terry mill match with sample costing within 3&ndash;5 working days.
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
