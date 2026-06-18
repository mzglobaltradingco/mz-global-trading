"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Scroll helpers ────────────────────────────────────────────────────────────

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
    id: "percale",
    name: "Percale",
    badge: "Hotel Standard",
    tcRange: "200–400 TC",
    elasticResponse: "Excellent — tight weave holds elastic securely, minimal stretch distortion",
    best: ["Premium Hotel", "USA / UK Retail", "Healthcare"],
    markets: ["USA", "UK", "Australia", "Canada"],
    careNotes: ["Machine washable 60°C", "Tumble dry low", "Maintains size after 100+ washes"],
    detail:
      "Percale is the hotel industry's first choice for fitted sheets. The tight one-over-one-under plain weave anchors elastic effectively — sheets stay snug through commercial laundering cycles without loosening at the pocket corners. Combed cotton percale at 300 TC is the most commercially ordered hotel specification, combining durability, hand feel and cost efficiency.",
    spec: "100% combed cotton or cotton-poly blend. TC 200–400. All-around elastic. Anti-shrink finish available. ISO 9001 certified production.",
  },
  {
    id: "sateen",
    name: "Sateen",
    badge: "Luxury Choice",
    tcRange: "300–600 TC",
    elasticResponse: "Good — requires reinforced pocket hem stitching to prevent pilling at elasticated corners",
    best: ["Premium Retail", "Luxury Hotel", "Gift Sets"],
    markets: ["EU", "UK", "Middle East", "Japan"],
    careNotes: ["Machine washable 40°C", "Tumble dry low or line dry", "Iron on reverse for sheen preservation"],
    detail:
      "Sateen fitted sheets combine the silky surface feel buyers associate with premium bedding with the practicality of elasticated corner-fit. The four-over-one-under weave requires reinforced pocket hem stitching — the higher exposed thread count at the elastic zone can be prone to pilling under heavy institutional use. For retail and boutique hotel programmes, sateen fitted sheets command a premium price point.",
    spec: "100% ring-spun combed cotton. TC 300–600. Reinforced pocket hem. All-around elastic. Cool wash recommended. Lab dip approval before bulk.",
  },
  {
    id: "oxford",
    name: "Oxford Weave",
    badge: "",
    tcRange: "200–300 TC",
    elasticResponse: "Excellent — basket weave structure provides a stable base for institutional-grade elastic",
    best: ["Institutional / Contract", "Healthcare", "Student Accommodation"],
    markets: ["UK", "EU", "Australia", "USA Healthcare"],
    careNotes: ["Machine washable 90°C (institutional)", "Tumble dry high", "High wash-cycle tolerance"],
    detail:
      "Oxford weave fitted sheets are specified for institutional programmes requiring maximum wash-cycle durability. The basket weave structure — paired yarns in both warp and weft — distributes wash stress more evenly than plain weave, reducing fabric degradation at the high-stress elasticated pocket corners. The preferred construction for healthcare, care facilities and student accommodation.",
    spec: "100% cotton or cotton-poly TC. 200–300 TC. Institutional-grade elastic. 90°C wash tolerance. ISO 9001 certified. High volume available.",
  },
  {
    id: "jersey",
    name: "Jersey Knit",
    badge: "Stretch Specialist",
    tcRange: "160–200 TC (knit)",
    elasticResponse: "Superior — knit construction provides natural 4-way stretch, fitting irregular mattress sizes",
    best: ["Casual / Lifestyle Retail", "Airbnb / Short-Let", "USA Mass Market"],
    markets: ["USA", "Canada", "Australia", "SE Asia"],
    careNotes: ["Machine washable 40°C", "Tumble dry medium", "Avoid bleach — affects stretch recovery"],
    detail:
      "Jersey knit fitted sheets use a stretch knit construction that conforms to any mattress shape — particularly useful for buyers serving consumers with non-standard or oversized mattresses. The natural 4-way stretch eliminates corner-lifting that affects woven fitted sheets on pillow-top or thick mattresses. Popular in the USA casual bedding and Airbnb/short-let accommodation market.",
    spec: "100% combed cotton or cotton-spandex (5%). Knit construction. Natural 4-way stretch. All-around elastic. OEKO-TEX certified options available.",
  },
  {
    id: "flannel",
    name: "Flannel / Brushed",
    badge: "Winter Programme",
    tcRange: "150–200 GSM (brushed)",
    elasticResponse: "Good — elastic holds well; deeper pocket typically required to accommodate mattress + topper for winter use",
    best: ["USA / Canada Winter", "Northern Europe", "Cosy Lifestyle Brands"],
    markets: ["USA", "Canada", "UK", "N. Europe"],
    careNotes: ["Machine washable 40°C warm", "Tumble dry low — maintains nap", "Avoid high heat — reduces nap softness"],
    detail:
      "Flannel fitted sheets pair the warmth and soft napped surface of brushed cotton with the convenience of elasticated corner-fit. Winter bedding programmes in the USA, Canada and Northern Europe rely on flannel fitted sheets as a core seasonal SKU. Deep pocket specification (18–21 inches) is standard for flannel, as winter mattresses often have thick toppers.",
    spec: "100% cotton brushed nap. GSM 150–200. All-around elastic. Deep pocket preferred (18\"–21\"). Machine washable warm.",
  },
];

const POCKET_DEPTHS = [
  { depth: '12"', cm: "30 cm", name: "Standard", mattress: "Standard mattress 18–23 cm thick", elastic: "1.5 cm standard elastic", market: "Budget retail · Basic hotel · Standard mattresses", featured: false },
  { depth: '15"', cm: "38 cm", name: "Mid-Depth", mattress: "Mid-depth mattress + thin memory topper", elastic: "2 cm reinforced elastic", market: "Mainstream retail · Mid-range hotel", featured: false },
  { depth: '18"', cm: "46 cm", name: "Deep Pocket", mattress: "Deep mattress 25–30 cm + memory foam", elastic: "2 cm all-around elastic", market: "Premium hotel · Memory foam retail · USA mainstream", featured: true },
  { depth: '21"', cm: "53 cm", name: "Extra Deep", mattress: "Extra-deep mattress + pillow-top topper", elastic: "2.5 cm reinforced all-around", market: "Luxury hotel · Platform beds · Premium lifestyle retail", featured: false },
  { depth: '26"+', cm: "66 cm+", name: "Ultra Deep", mattress: "Dual mattress / thick pillow-top / RV beds", elastic: "2.5 cm heavy-duty elastic", market: "Specialist deep-pocket retail · Luxury hospitality", featured: false },
];

const TC_TIERS = [
  { tc: "200–300", name: "Institutional", desc: "High wash-cycle durability. Cotton-poly blend recommended. Healthcare and hotel chains.", market: "Hotel · Healthcare · Institutional", pct: 38 },
  { tc: "300–400", name: "Retail Standard", desc: "The most commercially ordered range for retail fitted sheets. Balances hand feel and price.", market: "USA · UK · Australia retail", pct: 72, featured: true },
  { tc: "400–500+", name: "Premium", desc: "Premium sateen or high-grade percale. Noticeably softer hand feel. Luxury hotel and premium retail.", market: "EU · UK premium · Japan", pct: 88 },
];

const DECO_METHODS = [
  { code: "PL", name: "Plain / Solid", rotation: "-1.2deg", best: "Maximum versatility — all constructions and markets. PMS colour matched to your specification.", note: "Most commercially ordered — lab dip approval before bulk" },
  { code: "MG", name: "Corner Monogram", rotation: "0.8deg", best: "Premium hotel and luxury retail — embroidered initials or logo at the top hem corner.", note: "Thread colour, font and size to your specification" },
  { code: "DS", name: "Dobby / Jacquard Stripe", rotation: "-0.5deg", best: "Woven-in textured border or stripe. No print, no fade. Premium retail and boutique hotel.", note: "Extended lead time — pattern programmed on Jacquard loom" },
  { code: "PB", name: "Printed Border", rotation: "1deg", best: "Reactive or yarn-dyed stripe at hem. Retail mid-market — adds visual interest at low cost.", note: "Reactive print for photographic borders; yarn-dyed for wash fastness" },
  { code: "AR", name: "All-over Print", rotation: "-0.7deg", best: "Fashion bedding programmes — full face reactive or digital print. Percale and sateen only.", note: "Not recommended for jacquard or flannel constructions" },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Standard / Full PMS", note: "Full PMS colour range. Lab dip approval before bulk. ISO 105 C10 colour fastness.", pct: 65 },
  { name: "Yarn-Dyed", subtitle: "Woven Stripe / Check", note: "Colour woven in — superior wash fastness. Higher minimum quantities, longer lead time.", pct: 15 },
  { name: "Vat Dye", subtitle: "Deep Saturation / Institutional", note: "Best colour fastness at high wash temperatures. Recommended for hotel and healthcare programmes.", pct: 12 },
  { name: "GOTS Organic", subtitle: "Low-Impact / Eco", note: "GOTS certified chemicals only. Required for EU organic product claims.", pct: 8 },
];

const OEM_MODULES = [
  { num: "01", title: "Elastic Specification", desc: "Width, tension and type — standard (1.5 cm), reinforced (2 cm), heavy-duty (2.5 cm). All-around or corner-only elastic." },
  { num: "02", title: "Pocket Depth Customisation", desc: "12, 15, 18, 21 or 26+ inch pocket depth to match your mattress range. Custom depth on request with confirmed mattress dimension." },
  { num: "03", title: "TC & Construction", desc: "Thread count, weave type, fibre blend and yarn quality all specified to your brief. Ring-spun combed cotton options available." },
  { num: "04", title: "Corner Pocket Configuration", desc: "Mitered corners vs. box corners; elastic at corners vs. all-around. Configuration selected to match your mattress type and market." },
  { num: "05", title: "Label Programme", desc: "Woven care labels in market language (EN / DE / FR / AR etc.), neck label, hang tag and bed-pocket ID to your brand spec." },
  { num: "06", title: "Retail Packaging", desc: "Polybag, zippered pouch, retail box (single or set), vacuum pack or institutional bulk. Tailored to your retail channel." },
];

const SECTORS = [
  { abbr: "HT", name: "Hotels & Resorts", detail: "Hotel chains requiring certified fitted sheets in standard and deep-pocket specifications, white or colour programmes", market: "USA · UAE · UK · Australia" },
  { abbr: "PR", name: "Premium Retail", detail: "High-street and premium online bedding retailers sourcing percale and sateen fitted sheet programmes", market: "UK · EU · USA · Japan" },
  { abbr: "HC", name: "Healthcare", detail: "Hospitals and care facilities requiring Oxford weave or cotton-poly fitted sheets with 90°C wash tolerance", market: "USA · UK · Europe" },
  { abbr: "EC", name: "E-commerce / DTC", detail: "Direct-to-consumer bedding brands and subscription box services", market: "Global" },
  { abbr: "HD", name: "Hospitality Distribution", detail: "Wholesale distributors supplying hotel groups, furnished apartments and serviced accommodation", market: "Middle East · SE Asia" },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic fibre — required for organic cotton fitted sheet claims", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — EU and UK bedding import standard", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production and labour standards audit", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data sharing", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled content verification for polyester blend programmes", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance certification", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Improved cotton farming practices and sustainability", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "Worker rights, wages and safe conditions — highest social standard", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency across supply chain", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Price covers goods to port of loading. Buyer's freight forwarder handles onward logistics." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight to your port. Buyer arranges own marine insurance." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory gate. Lowest quoted price, highest buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard export" },
  { icon: "🎁", label: "Retail Box (single)", note: "In-store display" },
  { icon: "📮", label: "Retail Box (set)", note: "Coordinated bed sets" },
  { icon: "🔒", label: "Zippered Pouch", note: "Premium retail" },
  { icon: "🏭", label: "Bulk / Institutional", note: "Hotel linen supply" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", color: "bg-gold" },
  { stage: "Sample Production", days: "15–20", color: "bg-violet-500" },
  { stage: "Bulk Production", days: "45–70", color: "bg-purple-600" },
  { stage: "QC & Inspection", days: "3–5", color: "bg-slate-500" },
  { stage: "Sea Freight", days: "20–30", color: "bg-indigo-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton fitted sheets available across percale and sateen constructions. Traceable fibre sourcing." },
  { icon: "💧", title: "Water Efficiency", desc: "Enzyme finishing replaces stone washing — substantially lower water use and zero stone dust waste in production." },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester available for blended institutional programmes where pure-cotton is not required." },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited factories. Worker welfare, wages and safe conditions independently verified." },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "Reactive dyeing with OEKO-TEX certified chemicals. No azo dyes, no restricted substances in any finished sheet." },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags, FSC-certified paper packaging and biodegradable options available on request." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", desc: "Share construction, thread count, pocket depth, size, quantity and delivery target via our RFQ form." },
  { num: "02", title: "Factory Matching", desc: "We shortlist 2–3 certified Pakistan mills whose construction and elastic specialisation align with your programme. Pricing in 3–5 days." },
  { num: "03", title: "Sample Production", desc: "Pre-production samples including elastic quality, pocket depth and corner-fit confirmation. 15–20 days from spec lock." },
  { num: "04", title: "Sample Approval", desc: "Review corner-fit, pocket depth, elastic tension, colour accuracy and label placement. Revise before purchase order." },
  { num: "05", title: "Bulk Production", desc: "Full cutting and sewing commences from confirmed PO. Duration depends on construction, quantity and factory scheduling." },
  { num: "06", title: "QC & Shipment", desc: "Pre-shipment inspection including pocket depth measurement, elastic tension test and colour confirmation. FCL/LCL from Karachi." },
];

const FAQS = [
  {
    q: "What pocket depth should I specify for hotel fitted sheets?",
    a: "Hotels typically specify 15–18 inch pocket depth to accommodate a variety of mattress depths and thin toppers. Deep-pocket at 21 inches covers luxury pillow-top mattresses and premium memory foam. If your hotel client has a specific mattress specification, always confirm the exact mattress height before locking pocket depth — a 1-inch shortfall means sheets will not stay tucked.",
  },
  {
    q: "What's the difference between all-around elastic and corner pockets?",
    a: "All-around elastic runs along the full perimeter of the fitted sheet — the international standard for retail and premium hotel. The elastic grips all four sides and corners, preventing sheet displacement during sleep or when making the bed. Corner pocket elastic (elastic only at the four corners) is simpler to manufacture but shifts under active use — it is not recommended for hotel programmes or consumers who move frequently in sleep.",
  },
  {
    q: "Can I order matching flat sheets and pillow covers with my fitted sheets?",
    a: "Yes. Coordinated bed sets — fitted sheet, flat sheet, and pillow covers — are our primary offering for retail and hotel programmes. Specify all components in a single RFQ. We source from the same certified factory to ensure consistent thread count, construction, colour match and finishing across the complete set. Coordinated sets also typically benefit from better factory scheduling.",
  },
  {
    q: "Are GOTS-certified fitted sheets available from Pakistan?",
    a: "Yes. GOTS-certified organic cotton fitted sheets are available in percale and sateen constructions. For EU and UK buyers making organic product claims on packaging, GOTS certification on the factory and the fibre supply chain is mandatory — non-GOTS cotton cannot legally carry an organic claim in these markets. Specify GOTS as a hard requirement in your RFQ.",
  },
  {
    q: "How do I specify size standards for US and UK programmes simultaneously?",
    a: "Include both size charts in your RFQ. US Queen (152×203 cm with 18-inch pocket) and UK King (150×200 cm) are dimensionally similar but require separate cutting patterns and elastic lengths. We recommend confirming actual mattress dimensions from your end customer before locking specs — nominal US and UK sizes can vary slightly between mattress manufacturers.",
  },
  {
    q: "What thread count is standard for hospital fitted sheets?",
    a: "Hospital and healthcare fitted sheets are typically specified at 200–280 TC in a durable cotton-poly blend — prioritising wash durability over luxury hand feel. The key performance metric is wash-cycle tolerance (100+ cycles at 60–90°C minimum), not thread count. Oxford weave at 220–260 TC in 65/35 cotton-poly is the most common healthcare specification in the UK and EU.",
  },
];

const PAGE_BOXES = [
  { title: "Bedsheets", desc: "Custom flat bedsheets in percale, sateen, jacquard and oxford weave. 200–600 TC range.", image: "/images/menu/menu-bedsheets.webp", alt: "Pakistan bedsheet manufacturer — wholesale percale and sateen flat sheets", href: "/hometextile/bedlinen/bedsheets/", cta: "Explore Bedsheets" },
  { title: "Duvet Covers", desc: "Custom comforter covers in percale and sateen. Button, zip and envelope closure options.", image: "/images/menu/menu-duvetcovers.webp", alt: "Pakistan duvet cover manufacturer — custom comforter covers wholesale", href: "/hometextile/bedlinen/duvetcovers/", cta: "Explore Duvet Covers" },
  { title: "Pillow Covers", desc: "Cotton and linen pillowcases in standard, queen and oxford flange styles.", image: "/images/menu/menu-pillowcovers.webp", alt: "Pakistan pillow cover manufacturer — custom pillowcases wholesale", href: "/hometextile/bedlinen/pillowcovers/", cta: "Explore Pillow Covers" },
  { title: "Cushion Covers", desc: "Decorative cushion covers in woven and embroidered styles for home furnishing markets.", image: "/images/menu/menu-cushioncovers.webp", alt: "Pakistan cushion cover manufacturer — decorative throw pillow covers wholesale", href: "/hometextile/bedlinen/cushioncovers/", cta: "Explore Cushion Covers" },
  { title: "Curtains", desc: "Woven, jacquard and blackout curtains with choice of heading type and lining.", image: "/images/menu/menu-curtains.webp", alt: "Pakistan curtain manufacturer — custom woven and blackout curtains wholesale", href: "/hometextile/bedlinen/curtains/", cta: "Explore Curtains" },
  { title: "Institutional Bedding", desc: "Commercial-grade bedding sets for hotels, hospitals and airlines rated for 200+ wash cycles.", image: "/images/menu/menu-institutionaltowels.webp", alt: "Pakistan institutional bedding manufacturer — hotel and hospital linen wholesale", href: "/hometextile/bedlinen/institutionalbedding/", cta: "Explore Institutional Bedding" },
];

// ─── Main component ────────────────────────────────────────────────────────────

export default function FittedSheetsContent() {
  const [activeConstruction, setActiveConstruction] = useState("percale");
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
            src="/images/hero/hero-fitted-sheets.webp"
            fill
            alt="Pakistan fitted sheet manufacturer — deep pocket elasticated sheets for hotel and retail buyers in USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Bed Linen Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Fitted Sheet
              <br />
              Manufacturer
              <br />
              <span className="text-gold">Pakistan</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              MZ Global Trading sources precision-engineered fitted sheets from
              Pakistan&rsquo;s certified weaving mills. All-around elastic, deep-pocket
              options to 26 inches, percale and sateen constructions. GOTS,
              OEKO-TEX certified. FOB / CIF export.
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
                Explore Fitted Sheet Guide
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
                Fitted Sheet Supply — Pakistan Bed Linen
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Precision-Engineered Fitted Sheets from Pakistan
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Fitted sheets demand more engineering precision than flat sheets — pocket depth, elastic specification and corner-fit accuracy define quality. Pakistan&rsquo;s certified weaving mills deliver to international hotel and retail specifications.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "5", label: "Pocket Depth Options" },
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
          BENTO GRID
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-violet-50 border border-violet-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-violet-600 text-xs font-semibold tracking-[0.2em] uppercase">Construction</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Weave Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-violet-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.tcRange}</p>
                    <p className="text-xs text-violet-600 mt-1 leading-tight">{c.best[0]}</p>
                    {c.badge && <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Precision</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Pocket Depth Options</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {POCKET_DEPTHS.map((p) => (
                  <div key={p.depth} className={`rounded-xl px-4 py-3 border flex items-center gap-3 ${p.featured ? "bg-purple-100 border-purple-200" : "bg-white border-purple-100"}`}>
                    <span className={`text-lg font-black shrink-0 ${p.featured ? "text-purple-700" : "text-gray-300"}`}>{p.depth}</span>
                    <div>
                      <p className={`text-xs font-semibold ${p.featured ? "text-purple-700" : "text-navy-900"}`}>{p.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{p.mattress}</p>
                    </div>
                    {p.featured && <span className="ml-auto text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full shrink-0">Most Popular</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-pocket-depth" label="Explore Pocket Depths" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Thread Count</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">TC Weight Guide</h3>
              <div className="flex flex-col gap-3 flex-1">
                {TC_TIERS.map((t) => (
                  <div key={t.tc} className={`bg-white rounded-xl p-3 border ${t.featured ? "border-gold" : "border-sky-100"}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-navy-900">{t.tc} TC</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Standard</span>}
                    </div>
                    <div className="w-full h-1.5 bg-sky-100 rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full ${t.featured ? "bg-gold" : "bg-sky-400"}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] text-gray-400 leading-snug">{t.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-tc" label="View TC Guide" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">✨</span>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Design</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Embellishment Styles</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-amber-50">
                    <span className="w-6 h-6 rounded bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{d.code}</span>
                    <p className="text-xs font-semibold text-navy-900">{d.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-design" label="Explore Designs" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-3 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-3 border border-rose-50">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-semibold text-navy-900">{d.name}</p>
                      <span className="text-[10px] text-gray-400">{d.pct}%</span>
                    </div>
                    <div className="w-full h-1 bg-rose-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-400 rounded-full" style={{ width: `${d.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{d.subtitle}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colors" label="Explore Colors" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM Development</h3>
              <div className="flex flex-col gap-2 flex-1">
                {OEM_MODULES.slice(0, 5).map((f) => (
                  <div key={f.num} className="flex items-start gap-2">
                    <span className="text-gold text-xs font-bold mt-0.5 shrink-0">{f.num}</span>
                    <p className="text-xs text-gray-600 leading-snug">{f.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore OEM" />
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-teal-100 flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center shrink-0">{s.abbr}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{s.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Markets" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Quality Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-xl border border-green-100 flex items-center justify-center p-1.5" style={{ height: 48 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={60} height={36} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-orange-100">
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
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

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-lime-50 border border-lime-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
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
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]">
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-fuchsia-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-fuchsia-200 text-fuchsia-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.title}</p>
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
              <p className="font-semibold text-navy-900">Fitted Sheet Buying Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Pocket depth, elastic specification and size standards for international hotel and retail fitted sheet buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Bed Linen Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, certification requirements, lead times and factory overview for bed linen programmes.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Fitted Sheet Spec Sheets &amp; Size Charts</p>
              <p className="text-xs text-gray-500 leading-relaxed">Pocket depth specs, US/UK/EU size charts, elastic specifications and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Fitted Sheets?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, pocket depth and size confirmed — RFQ takes 3 minutes. Factory match and quotation in 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — CONSTRUCTIONS — TECHNICAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-[#080E1A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-12">
            <div className="w-px h-16 bg-gold/40 mt-1 hidden sm:block" aria-hidden="true" />
            <div>
              <p className="font-mono text-gold/70 text-xs tracking-[0.3em] uppercase mb-2">[TECHNICAL SPECIFICATION — FITTED SHEET CONSTRUCTIONS]</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Fabric Constructions for Fitted Sheets</h2>
              <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">Construction choice determines elastic performance, pocket-fit accuracy, wash durability and market positioning. Each fabric behaves differently when paired with the elasticated pocket format.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeConstruction === c.id}
                onClick={() => setActiveConstruction(c.id)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
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
                  <h3 className="text-2xl font-bold text-white">{ac.name}</h3>
                  {ac.badge && (
                    <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">{ac.badge}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">TC_RANGE</p>
                    <p className="text-lg font-bold text-gold">{ac.tcRange}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">ELASTIC_RESPONSE</p>
                    <p className="text-sm text-white">{ac.elasticResponse}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{ac.detail}</p>
                <div className="border border-white/10 rounded-xl p-4">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">TECHNICAL_SPEC</p>
                  <p className="text-sm text-gray-300">{ac.spec}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">BEST_FOR[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.best.map((b) => <span key={b} className="text-xs text-white bg-white/10 px-3 py-1 rounded-full">{b}</span>)}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">KEY_MARKETS[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>)}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">CARE_NOTES[ ]</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.careNotes.map((n) => (
                      <div key={n} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-300">{n}</span>
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
          SECTION 2 — POCKET DEPTH — TYPOGRAPHY-DRIVEN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-pocket-depth" className="bg-[#FAF9F7] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Precision Specification</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Pocket Depth: The Critical Fitted Sheet Specification</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Pocket depth is the measurement from the top edge of the fitted sheet to the bottom of the pocket corner. Under-specify and the sheet will not stay tucked. Always confirm mattress height before locking depth.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {POCKET_DEPTHS.map((p) => (
              <motion.div
                key={p.depth}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className={`rounded-2xl p-8 border-2 flex flex-col gap-4 ${p.featured ? "bg-navy-900 border-gold shadow-xl" : "bg-white border-gray-100"}`}
              >
                {p.featured && <span className="text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full w-fit uppercase tracking-wider">Most Ordered</span>}
                <div>
                  <p className={`text-6xl sm:text-7xl font-black leading-none ${p.featured ? "text-gold" : "text-gray-100"}`}>{p.depth}</p>
                  <p className={`text-sm font-semibold mt-1 ${p.featured ? "text-white" : "text-gray-400"}`}>{p.cm}</p>
                </div>
                <h3 className={`text-xl font-bold ${p.featured ? "text-white" : "text-navy-900"}`}>{p.name}</h3>
                <p className={`text-sm leading-relaxed flex-1 ${p.featured ? "text-gray-300" : "text-gray-500"}`}>{p.mattress}</p>
                <div className={`border-t pt-3 ${p.featured ? "border-white/10" : "border-gray-100"}`}>
                  <p className={`text-xs font-semibold ${p.featured ? "text-gold/80" : "text-gray-400"}`}>{p.elastic}</p>
                  <p className={`text-xs mt-1 ${p.featured ? "text-gray-400" : "text-gray-400"}`}>{p.market}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-gold font-bold mb-2">All-Around Elastic vs. Corner-Only</h3>
              <p className="text-gray-300 text-sm leading-relaxed">All-around elastic runs along the full perimeter — the hotel and premium retail standard. Corner pockets (elastic at corners only) are cheaper but shift under use. For hotel programmes, always specify all-around elastic.</p>
            </div>
            <div>
              <h3 className="text-gold font-bold mb-2">Elastic Width Specification</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Standard elastic: 1.5 cm. Reinforced (deep pocket): 2 cm. Heavy-duty (ultra-deep / institutional): 2.5 cm. Elastic width should increase with pocket depth to maintain tension through washing cycles.</p>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — THREAD COUNT — SPLIT-SCREEN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-tc" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-[#0D1B2A] p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Thread Count</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">TC Selection for Fitted Sheets</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">For fitted sheets, thread count interacts with the elasticated pocket format in specific ways. Tighter weaves (higher TC percale) anchor elastic more securely and maintain pocket shape through commercial wash cycles. Sateen at equivalent TC provides a smoother surface feel but requires reinforced pocket stitching.</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">Institutional programmes (hotels, healthcare) typically specify 200–280 TC cotton-poly for durability and wash economy. Retail programmes target 300–400 TC for the hand feel buyers expect from retail bedding.</p>
              <div className="bg-gold/10 border border-gold/30 rounded-xl p-4">
                <p className="text-gold text-xs font-bold uppercase tracking-wider mb-1">Key Buyer Insight</p>
                <p className="text-gray-300 text-xs leading-relaxed">Specify yarn quality (ring-spun/open-end, combed/carded) alongside TC. Ring-spun combed cotton at 300 TC outperforms open-end carded cotton at 500 TC in both hand feel and wash durability.</p>
              </div>
            </div>
            <div className="bg-white p-10 lg:p-14">
              <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-6">TC Tiers — Fitted Sheet Reference</p>
              <div className="flex flex-col gap-5">
                {TC_TIERS.map((t) => (
                  <div key={t.tc} className={`rounded-2xl p-6 border-2 ${t.featured ? "border-gold shadow-lg" : "border-gray-100"}`}>
                    {t.featured && <span className="inline-block mb-2 text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>}
                    <div className="flex items-baseline gap-3 mb-2">
                      <p className={`text-2xl font-bold ${t.featured ? "text-gold" : "text-navy-900"}`}>{t.tc} TC</p>
                      <p className="text-xs font-semibold text-gray-400 uppercase">{t.name}</p>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                      <div className={`h-full rounded-full ${t.featured ? "bg-gold" : "bg-violet-400"}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{t.market}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — DESIGN — MOODBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-design" className="bg-[#FAF9F7] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Design</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Design Styles for Fitted Sheets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DECO_METHODS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                style={{ transform: `rotate(${d.rotation})` }}
                className="bg-white rounded-2xl p-7 shadow-md border border-gray-100 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center shrink-0">
                  <span className="text-gold text-xs font-bold">{d.code}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">{d.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{d.best}</p>
                <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOURS — NEUMORPHISM
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-colors" className="py-20 lg:py-28" style={{ backgroundColor: "#e8e8e8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour Programs</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Colour Programs for Fitted Sheets</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Every construction is available in full PMS colour matching. Lab dip approval submitted before bulk production. Colour fastness to ISO 105 standards.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-2xl p-7 flex flex-col gap-4"
                style={{
                  background: "#e8e8e8",
                  boxShadow: "8px 8px 20px #c8c8c8, -8px -8px 20px #ffffff",
                }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-navy-900"
                  style={{ background: "#e8e8e8", boxShadow: "inset 4px 4px 10px #c8c8c8, inset -4px -4px 10px #ffffff" }}
                >
                  {d.pct}%
                </div>
                <h3 className="text-base font-bold text-navy-900">{d.name}</h3>
                <p className="text-xs text-gray-500 font-semibold">{d.subtitle}</p>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: "#e8e8e8", boxShadow: "8px 8px 20px #c8c8c8, -8px -8px 20px #ffffff" }}>
            <p className="text-navy-900 font-semibold mb-2">Custom Colour Matching</p>
            <p className="text-gray-500 text-sm">Provide your PMS reference or physical swatch. Lab dip produced and approved before bulk production begins.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM — MODULAR UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM &amp; Custom</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Custom Fitted Sheet Development</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Every component of your fitted sheet programme can be specified — from elastic type to pocket depth, from yarn quality to retail packaging. Build your specification module by module.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {OEM_MODULES.map((m, i) => (
              <motion.div
                key={m.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-2 border-gray-100 rounded-2xl p-7 hover:border-gold hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center shrink-0">{m.num}</div>
                  <h3 className="text-sm font-bold text-navy-900">{m.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div>
              <p className="text-white font-bold text-lg mb-1">Build Your Fitted Sheet Specification</p>
              <p className="text-gray-300 text-sm">Submit your requirements — we respond with factory matches and indicative pricing within 3–5 working days.</p>
            </div>
            <Link href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors">
              Request a Quote <span aria-hidden="true">→</span>
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKETS — CINEMATIC UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Market Sectors</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Fitted Sheet Market Sectors</h2>
          <div className="flex flex-col gap-5">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-white/10 rounded-2xl p-7 flex flex-col sm:flex-row gap-6 items-start hover:border-gold/30 transition-all"
              >
                <div className="shrink-0">
                  <span className="w-14 h-14 rounded-2xl bg-white/5 text-gold text-sm font-black flex items-center justify-center">{s.abbr}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{s.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.detail}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs font-semibold text-gold">{s.market}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS — GLASSMORPHISM
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/5 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Certifications &amp; Compliance Standards</h2>
          <p className="text-white/60 mb-10 max-w-2xl leading-relaxed">Our factory network carries the certifications that international hotel chains, retailers and import compliance teams require. Specify your required certification in your RFQ.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex flex-col gap-3 hover:bg-white/15 transition-all"
              >
                <div className="h-10 flex items-center justify-center">
                  <Image src={c.img} alt={`${c.name} certification`} width={72} height={40} className="object-contain max-h-10" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{c.name}</h3>
                  <p className="text-[10px] text-white/50 mt-0.5 leading-snug">{c.full}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${c.tier === "Premium" ? "bg-gold/20 text-gold" : c.tier === "Standard" ? "bg-green-400/20 text-green-300" : "bg-white/10 text-white/50"}`}>{c.tier}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — EXPORT & PACKAGING — DARK MODE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-[#111827] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export Terms</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Export &amp; Packaging for Fitted Sheets</h2>
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Incoterms</p>
              <div className="flex flex-col gap-4">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-cyan-400/30 transition-all">
                    <span className="w-12 h-12 rounded-xl bg-cyan-400/10 text-cyan-400 text-sm font-black flex items-center justify-center shrink-0">{e.term}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{e.full}</h3>
                      <p className="text-xs text-cyan-400 mt-0.5">{e.port}</p>
                      <p className="text-sm text-gray-400 mt-2 leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Packaging Options</p>
              <div className="grid grid-cols-1 gap-3 mb-8">
                {PACK_OPTIONS.map((p) => (
                  <div key={p.label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <span className="text-xl" aria-hidden="true">{p.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{p.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Lead Time Overview</p>
              <div className="flex flex-col gap-2">
                {LEAD_STAGES.map((s) => (
                  <div key={s.stage} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.color}`} aria-hidden="true" />
                    <p className="text-sm text-white flex-1">{s.stage}</p>
                    <span className="text-xs font-bold text-gray-400">{s.days} days</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-amber-900/20 border border-amber-500/30 rounded-xl px-4 py-3">
                <p className="text-xs text-amber-300 leading-relaxed">Lead times are indicative only and subject to factory scheduling, material availability and order complexity.</p>
              </div>
            </div>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — FLAT DESIGN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Ethics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Sustainable Fitted Sheet Sourcing</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">Every certification and sustainability standard can be specified in your RFQ. Responsible sourcing is part of factory selection, not a checkbox after the fact.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-gray-100 bg-gray-50"
              >
                <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                <p className="text-sm font-bold text-navy-900">{s.title}</p>
                <p className="text-xs text-gray-500 leading-snug">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — PROCESS — EDITORIAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-[#F5F5F0] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-4">No. 06 / Sourcing Process</p>
          <h2 className="text-5xl sm:text-6xl font-bold text-navy-900 leading-[1] mb-8">
            Six<br />Steps
          </h2>
          <div className="w-16 h-0.5 bg-gold mb-10" aria-hidden="true" />
          <div className="flex flex-col gap-0 divide-y divide-gray-200">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="py-7 flex gap-8 items-start"
              >
                <div className="shrink-0 text-right w-20">
                  <p className="text-6xl font-bold leading-none text-gray-100">{p.num}</p>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
            <p className="text-xs text-amber-800 leading-relaxed">Lead times are indicative only and subject to factory scheduling, material availability and order complexity.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Fitted Sheet Sourcing — Frequently Asked Questions</h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full text-left px-7 py-5 flex items-start justify-between gap-4"
                  aria-expanded={faqOpen === i}
                >
                  <span className="text-sm font-semibold text-navy-900 leading-relaxed">{f.q}</span>
                  <span className={`text-gold font-bold text-xl shrink-0 transition-transform duration-200 ${faqOpen === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-6 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          PAGE BOXES — SIBLING BED LINEN PAGES
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Explore Bed Linen Range</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">More Bed Linen Products</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAGE_BOXES.map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <Link href={card.href} className="block">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg mb-1">{card.title}</h3>
                    <p className="text-gray-300 text-xs leading-relaxed mb-2">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold group-hover:gap-3 transition-all duration-200">
                      {card.cta} →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-navy-900 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Get Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Source Custom Fitted Sheets?</h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              Share your construction, pocket depth, size and quantity requirements — our team responds within 24 hours with factory matches and indicative pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-bold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Request a Quote <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:border-gold hover:text-gold transition-colors"
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
