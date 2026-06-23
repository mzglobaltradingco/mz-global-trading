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
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">
        →
      </span>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  {
    id: "rigid-twill",
    name: "3×1 Twill — Rigid",
    badge: "Industry Classic",
    oz: "11–14 oz",
    hand: "Crisp, structured, develops vintage fade over wear",
    best: ["Workwear", "Premium Fashion", "Selvedge Programmes"],
    markets: ["USA", "UK", "Japan", "Germany"],
    decorations: ["Stone Wash", "Laser Etch", "Woven Patch"],
    detail:
      "Rigid 3×1 twill is the foundational denim construction — 100% ring-spun cotton, zero elastane. Fades naturally over time, developing unique wear patterns valued by premium and collector denim buyers. The industry standard for workwear programmes and selvedge-adjacent production.",
    spec: "100% ring-spun cotton. 11–14 oz. Warp-faced 3×1 diagonal twill. Available selvedge and open-end. Stone wash, enzyme wash or raw/unwashed finish.",
  },
  {
    id: "stretch-98-2",
    name: "Stretch 98/2 Cotton-Elastane",
    badge: "Best Seller",
    oz: "11–12 oz",
    hand: "Smooth 4-way stretch, excellent comfort, maintained structure",
    best: ["Fashion Retail", "Casual Wear", "Women's Denim"],
    markets: ["USA", "EU", "UK", "Australia"],
    decorations: ["Laser Etch", "Enzyme Wash", "Acid Wash"],
    detail:
      "The dominant commercial denim construction — 2% elastane delivers natural comfort stretch with full structure recovery. Ideal for slim and skinny silhouettes in men's and women's programmes. Broad wash compatibility and excellent registration for laser etching.",
    spec: "98% cotton, 2% elastane. 11–12 oz. Warp-faced 3×1 twill. 4-way stretch. Compatible with all standard wash recipes.",
  },
  {
    id: "stretch-95-5",
    name: "Stretch 95/5 Cotton-Lycra",
    badge: "",
    oz: "10–11 oz",
    hand: "Maximum stretch, athletic feel, strong recovery",
    best: ["Performance Denim", "Athleisure", "Women's Active"],
    markets: ["USA", "Canada", "UK", "EU"],
    decorations: ["Laser Etch", "No Wash / Light Wash"],
    detail:
      "5% Lycra/elastane content delivers superior stretch and snap-back recovery. Lighter weight positions this construction at the performance and athleisure intersection — denim that moves with the body. Popular in women's skinny and men's slim athletic cuts.",
    spec: "95% cotton, 5% Lycra/elastane. 10–11 oz. Lightweight for athleisure positioning. High recovery rate. Reactive enzyme wash recommended.",
  },
  {
    id: "raw-dry",
    name: "Raw / Dry Denim",
    badge: "Premium",
    oz: "12–14 oz",
    hand: "Stiff initially — softens with wear to develop unique personal fade",
    best: ["Premium Menswear", "Heritage Brands", "Japan Export"],
    markets: ["USA", "Japan", "Germany", "UK"],
    decorations: ["Minimal — woven selvedge ID only"],
    detail:
      "Raw denim is sold unwashed — the fade develops uniquely for each wearer over 6–12 months of regular wear. Highly valued by premium and collector denim buyers. Selvedge-ID weave at the inseam is a hallmark of quality. Dry indigo dye provides maximum fade potential.",
    spec: "100% ring-spun cotton, 12–14 oz. Sanforized or unsanforized options. Sold dry/unwashed. Optional selvedge weave. Rigid 3×1 twill.",
  },
  {
    id: "recycled-cotton",
    name: "Recycled Cotton Denim",
    badge: "Sustainable",
    oz: "10–13 oz",
    hand: "Comparable to virgin cotton with GRS-certified recycled content",
    best: ["Sustainable Brands", "EU Market", "B Corp Brands"],
    markets: ["EU", "UK", "Germany", "Netherlands"],
    decorations: ["Stone Wash", "Laser Etch", "Enzyme Wash"],
    detail:
      "GRS-certified pre-consumer recycled cotton content. Comparable weight, stretch and hand-feel to virgin cotton variants. EU buyers increasingly mandate recycled content across apparel categories — this construction supports product-level recycled fibre claims.",
    spec: "GRS certified. Min 30% pre-consumer recycled cotton. Available in stretch and rigid variants. Standard wash compatible.",
  },
];

const FIT_PROFILES = [
  { code: "SLM", name: "Slim Fit", ease: "Fitted thigh, tapered leg, mid-rise", market: "Contemporary fashion, UK/EU mainstream, USA modern menswear" },
  { code: "REG", name: "Regular / Straight Leg", ease: "Classic straight from hip to hem", market: "USA mass-market, workwear, traditional menswear worldwide" },
  { code: "RLX", name: "Relaxed / Baggy", ease: "Wide thigh and leg, low-mid rise", market: "Streetwear, youth fashion, current USA/EU trend silhouette" },
  { code: "SKN", name: "Skinny", ease: "Fitted throughout, high or mid rise", market: "Women's fashion, contemporary menswear, EU slim silhouette" },
  { code: "BTK", name: "Bootcut", ease: "Slight flare from knee, traditional rise", market: "USA mainstream, country/western, older demographic retail" },
  { code: "TPR", name: "Tapered", ease: "Full thigh, narrowed ankle — athletic taper", market: "Modern athletic, premium menswear, Japan-influenced fashion" },
];

const OZ_TIERS = [
  {
    oz: "8–10 oz",
    name: "Lightweight",
    season: "Spring / Summer",
    market: "SE Asia · South America · Middle East · Tropical Markets",
    pct: 30,
    featured: false,
    desc: "Ideal for warm-climate markets and fashion-forward spring/summer programmes. Lighter drape, faster drying. Primarily in stretch 95/5 for comfort-led programmes.",
    color: "bg-amber-300",
  },
  {
    oz: "11–12 oz",
    name: "Standard",
    season: "Year-Round",
    market: "USA · UK · EU retail baseline · Australia",
    pct: 75,
    featured: true,
    desc: "The commercial standard for year-round retail denim programmes. Covers the majority of rigid, stretch 98/2 and recycled cotton orders across all major markets.",
    color: "bg-gold",
  },
  {
    oz: "13–14+ oz",
    name: "Heavyweight",
    season: "Autumn / Winter / Workwear",
    market: "USA workwear · Canada · Raw denim · Japan heritage",
    pct: 40,
    featured: false,
    desc: "Raw, rigid and selvedge denim at this weight delivers structure and durability. Required for USA workwear, Canadian cold-climate markets and premium/heritage programmes.",
    color: "bg-stone-600",
  },
];

const WASH_EFFECTS = [
  { code: "STN", name: "Stone Wash", intensity: 55, desc: "Pumice stones abrade the surface to create classic mid-tone fade — the industry standard wash since the 1980s. Compatible with all constructions." },
  { code: "ACD", name: "Acid Wash", intensity: 90, desc: "Bleach-soaked pumice stones create cloud-pattern bleach effects. Vintage, grunge and retro fashion positioning. Popular in USA streetwear programmes." },
  { code: "SND", name: "Sand / Blast Wash", intensity: 70, desc: "Sand abrasion creates dry, matte surface with localised fade. Laser sand effect achieves same result without environmental concerns of sand blasting." },
  { code: "ENZ", name: "Enzyme Wash", intensity: 25, desc: "Bio-enzyme wash softens the hand without significant colour change. Maintains rich indigo depth while removing harshness — premium feel, natural appearance." },
  { code: "RAW", name: "Raw / No Wash", intensity: 0, desc: "Sold unwashed — fade develops uniquely per wearer over months of wear. Premium, collector and heritage denim positioning. High value per unit." },
  { code: "OVD", name: "Overdye / Tinted", intensity: 45, desc: "Colour cast applied over a washed base — creates fashion-forward non-indigo denim. Black overdye, khaki tint, grey cast for trend-led programmes." },
];

const DECO_METHODS = [
  { code: "LZR", method: "Laser Etch", best: "Whisker lines, chevrons, honeycomb abrasion — any distress pattern precisely replicated at scale", compat: ["Stretch 98/2", "Stretch 95/5", "Rigid Twill"], note: "Most sustainable alternative to manual sand blasting — no harmful silica dust" },
  { code: "EMB", method: "Embroidery", best: "Back pocket art, waistband selvedge, label and brand mark on rigid and stretch constructions", compat: ["All Constructions"], note: "300–1200 stitch density depending on design complexity and placement" },
  { code: "WPT", method: "Woven / PU Patch", best: "Branded back waistband patch — leather-look PU or woven cotton in custom shape and print", compat: ["All Constructions"], note: "PU patch is vegan; cotton/woven patch meets GOTS requirements" },
  { code: "HWD", method: "Hardware Branding", best: "Branded buttons, rivets and zip pulls — custom engrave, deboss or logo stamp in any metal finish", compat: ["All Constructions"], note: "Gunmetal, antique brass, polished nickel, oxidised copper all available" },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic fibre sourcing and processing — required for organic cotton denim claims", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances in finished product — EU/UK import standard for denim", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — labour standards and worker welfare in denim factories", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data sharing across the supply chain", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control across all denim constructions", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled content verification — essential for recycled cotton denim programmes", tier: "Premium", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance — widely required by USA retail buyers", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Improved cotton farming practices and sustainability metrics at fibre level", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "Most rigorous social certification — worker rights, wages and safe conditions audited", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency across the entire textile supply chain", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Wash Recipe Specification", desc: "Partner with our certified wash houses — stone, acid, enzyme, bleach, overdye and laser. Wash master submitted before bulk for your approval.", accent: "border-indigo-500" },
  { num: "02", title: "Custom Selvedge ID", desc: "Woven selvedge identity stripe with your house colour, brand initial or custom ID. Produced on shuttle looms for authentic selvedge construction.", accent: "border-gold" },
  { num: "03", title: "Hardware Programme", desc: "Branded buttons, rivets and zip pulls in custom metal finishes — gunmetal, antique brass, nickel. Engraved, debossed or logo-stamped to your spec.", accent: "border-teal-500" },
  { num: "04", title: "Fit Block Grading", desc: "Your fit block developed and graded across your full size spec. Fit samples produced per silhouette before bulk commences.", accent: "border-orange-500" },
  { num: "05", title: "Custom Label Stack", desc: "Back pocket patch, main label, care label, hang tag — full branded label stack to your artwork and specification.", accent: "border-green-500" },
  { num: "06", title: "Pocket & Construction Config", desc: "Coin pocket, cargo add-ons, faux pocket or custom pocket arrangement. Any construction detail specified to your technical pack.", accent: "border-purple-500" },
];

const SECTORS = [
  { abbr: "DF", name: "Denim-First Fashion", detail: "USA, UK and EU denim labels with OEM denim programmes and seasonal collection cadence", market: "USA · UK · EU" },
  { abbr: "FS", name: "Fast Fashion Retail", detail: "High-volume seasonal collections requiring rapid wash and style turnaround across multiple fits", market: "Global" },
  { abbr: "PR", name: "Premium Menswear", detail: "Raw, selvedge and heritage denim with premium price positioning and collector appeal", market: "USA · Japan · Germany" },
  { abbr: "SW", name: "Streetwear Brands", detail: "Washed, distressed and vintage-style denim for youth and trend markets across USA and EU", market: "USA · UK · EU · Korea" },
  { abbr: "UN", name: "Uniforms & Workwear", detail: "Rigid denim work programmes — construction, trade and industrial sector requirements", market: "USA · Canada · Australia" },
  { abbr: "WS", name: "Wholesale Distributors", detail: "Multi-brand distributors supplying regional retail networks at volume across multiple categories", market: "USA · EU · Middle East" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading only." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance. Price includes delivery to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight to your port. Buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all inland and ocean logistics from factory gate. Lowest quoted price, highest buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "👖", label: "Individual Polybag (folded)", note: "Standard bulk export" },
  { icon: "🪝", label: "Hanger + Polybag", note: "Retail-ready on arrival" },
  { icon: "🗂️", label: "Board Fold (retail)", note: "In-store presentation" },
  { icon: "📦", label: "Flat Fold (export)", note: "Volume-optimised bulk" },
  { icon: "🎁", label: "Gift Box", note: "Premium / gifting packs" },
  { icon: "✏️", label: "Custom Packaging", note: "To your brand brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory shortlist, wash recipe and pricing confirmed", color: "bg-gold" },
  { stage: "Sample Production", days: "15–20", desc: "Pre-production samples with wash executed to specification", color: "bg-blue-500" },
  { stage: "Bulk Production & Wash", days: "45–70", desc: "Cutting, sewing and wash house execution", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Shade band, measurement and count audit pre-shipment", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "18–28", desc: "FCL/LCL from Karachi or Port Qasim", color: "bg-teal-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "♻️", title: "Recycled Cotton", desc: "GRS-certified recycled cotton denim available — pre-consumer recycled content with verified chain of custody.", tag: "GRS" },
  { icon: "💧", title: "Water Reduction", desc: "Laser etching replaces water-intensive manual distressing — significant water reduction versus traditional hand-sanding methods.", tag: "Process" },
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified 100% organic cotton denim available for premium and certified brand programmes.", tag: "GOTS" },
  { icon: "⚖️", title: "Ethical Production", desc: "BSCI, Sedex and SA8000 audited denim factories. Fair wages, safe conditions and worker welfare independently verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Clean Chemistry", desc: "OEKO-TEX certified dye and finish chemicals. No restricted azo dyes, no heavy metals in wash formulations.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags, FSC-certified hang tags and boxes available for sustainable brand packaging programmes.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction, oz weight, wash finish, fit silhouette, hardware, size range, destination and target delivery date." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We shortlist 2–3 Pakistan denim factories certified for your required wash and construction. Pricing returned within 3–5 working days." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Pre-production samples produced with your wash recipe executed. 15–20 days from specification lock and fabric approval." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review construction, wash shade, fit, hardware and labelling. Revise as required before purchase order placement." },
  { num: "05", title: "Bulk Production & Wash", short: "Production", desc: "Fabric cut, sewn and washed at certified wash houses. Duration depends on construction, quantity and wash complexity." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Shade band testing, measurement audit, packing verification. FCL or LCL from Karachi or Port Qasim." },
];

const FAQS = [
  {
    q: "What is the difference between rigid and stretch denim for OEM programmes?",
    a: "Rigid 3×1 twill denim (100% cotton, zero elastane) produces a classic stiff hand that softens and fades with wear — valued in workwear, heritage and selvedge programmes. Stretch denim (98/2 or 95/5 cotton-elastane) delivers immediate comfort with maintained structure — the dominant commercial construction for fashion retail. Your choice depends on target market positioning: rigid for premium/heritage or workwear, stretch for fashion and contemporary lifestyle programmes.",
  },
  {
    q: "Which oz weight should I order for USA retail denim programmes?",
    a: "For year-round USA retail, 11–12 oz is the commercial standard — this weight covers both rigid and stretch 98/2 constructions and is compatible with the widest range of wash techniques. Lightweight 8–10 oz suits summer or warm-climate programmes (SE Asia, South America, Middle East). Heavyweight 13–14+ oz is required for workwear, raw denim and selvedge-adjacent programmes targeting USA trade and premium markets.",
  },
  {
    q: "Can I get GOTS or OEKO-TEX certified denim jeans from Pakistan?",
    a: "Yes. Pakistan's certified denim mills carry OEKO-TEX Standard 100 across all standard constructions — EU and UK buyers should specify this as a hard requirement. GOTS-certified organic cotton denim is available on 100% organic rigid and stretch constructions. GRS certification is available for recycled cotton denim variants. Specify your required certification in your RFQ and we match you with factories carrying that standard.",
  },
  {
    q: "What wash techniques are available for denim jeans programmes?",
    a: "Six commercial wash techniques are available: stone wash (classic fade), acid wash (cloud bleach pattern), sand/blast wash (dry matte fade), enzyme wash (bio-softening without fade), raw/no wash (unwashed, premium positioning), and overdye/tinted wash (colour cast for non-indigo fashion positioning). Laser etching is available for sustainable distress effects — whisker lines, chevrons and honeycomb abrasion patterns without water-intensive manual processes.",
  },
  {
    q: "How do I specify denim hardware for an OEM programme?",
    a: "Hardware — buttons, rivets, zip pulls — can be branded with your logo, brand initial or custom design. Specify your preferred metal finish (gunmetal, antique brass, polished nickel, oxidised copper), logo/text, size and quantity in your RFQ. Hardware branding is executed via engraving, debossing or logo stamping. Lead times for custom hardware are factored into the overall production schedule.",
  },
  {
    q: "Can I order selvedge denim jeans from Pakistan?",
    a: "Yes. Selvedge denim — woven on shuttle looms producing a self-finished inseam edge — is available through Pakistan's specialist denim mills. The selvedge ID can be produced in your house colour for brand identification. Selvedge denim is positioned as premium: it commands higher unit costs than open-end constructions but targets buyers willing to pay for heritage quality. This construction is popular in USA collector markets, Japan and premium European menswear.",
  },
];

// ─── Main component ────────────────────────────────────────────────────────────

export default function DenimJeansContent() {
  const [activeConstruction, setActiveConstruction] = useState("rigid-twill");
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
            src="/images/hero/hero-denim-jeans.webp"
            fill
            alt="Pakistan denim jeans manufacturer — OEM rigid and stretch denim jeans for fashion brands in USA, UK and Europe"
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
              <span className="text-gold">Denim Jeans</span>
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
              Denim Jeans
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
              MZ Global Trading connects international brands with Pakistan&rsquo;s
              certified denim factories. Rigid 3&times;1 twill, stretch 98/2
              cotton-elastane, raw and recycled cotton denim. 8&ndash;14 oz. Stone
              wash, acid wash, enzyme wash. GOTS, OEKO-TEX, BSCI. FOB / CIF export.
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
                Denim Jeans Supply — Pakistan Woven Garment
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Denim Sourcing Precision Across Every Wash
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s denim mills supply major USA and European brands.
                Every construction — rigid, stretch, raw or recycled — placed with
                certified factories. Wash recipes executed in-house at verified wash units.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "6", label: "Wash Techniques" },
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
          MAIN BENTO GRID
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* ROW 1: 2 bentos — Constructions + Fits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-stone-50 border border-stone-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-stone-600 text-xs font-semibold tracking-[0.2em] uppercase">Woven</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Denim Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-stone-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.oz}</p>
                    <p className="text-xs text-stone-600 mt-1 leading-tight">{c.best[0]}</p>
                    {c.badge && (
                      <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                        {c.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fit Profiles &amp; Sizing</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {FIT_PROFILES.map((f) => (
                  <div key={f.code} className="bg-white rounded-xl px-4 py-3 border border-amber-100 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {f.code}
                    </span>
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

          {/* ROW 2: 4 bentos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-neutral-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Oz Weight Guide</h3>
              <div className="flex flex-col gap-3 flex-1">
                {OZ_TIERS.map((t) => (
                  <div key={t.oz} className="bg-white rounded-xl p-3 border border-neutral-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-navy-900">{t.oz}</span>
                      {t.featured && (
                        <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>
                      )}
                    </div>
                    <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] font-semibold text-neutral-600">{t.season}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{t.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-weight" label="View Weight Guide" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Decoration Methods</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-orange-50">
                    <span className="w-6 h-6 rounded bg-orange-100 text-orange-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {d.code}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{d.compat[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decorations" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🌊</span>
              <p className="text-zinc-600 text-xs font-semibold tracking-[0.2em] uppercase">Wash</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Wash Effects</h3>
              <div className="flex flex-col gap-2 flex-1">
                {WASH_EFFECTS.map((w) => (
                  <div key={w.code} className="flex items-center gap-2">
                    <span className="w-7 h-5 rounded bg-zinc-100 text-zinc-700 text-[9px] font-bold flex items-center justify-center shrink-0">
                      {w.code}
                    </span>
                    <p className="text-xs font-semibold text-navy-900">{w.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-wash" label="View Wash Palette" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
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

          {/* ROW 3: 3 bentos (5-col: 2+2+1) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
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
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-xs font-bold text-teal-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Markets" />
            </motion.div>

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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-amber-700 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-amber-100">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center shrink-0">
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

          {/* ROW 4: 2 bentos (3-col: 2+1) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-rose-50 border border-rose-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 text-[10px] font-bold flex items-center justify-center shrink-0">
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
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Explore Our Guides &amp; Resources
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/denim-weight-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Denim Weight Guide: 6oz to 14oz</p>
              <p className="text-xs text-gray-500 leading-relaxed">How denim weight affects wash options, construction and market positioning.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link href="/guides/sourcing-denim-jeans-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Denim Jeans Sourcing Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Wash types, fits, certification and lead times for international buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guide →</span>
            </Link>
            <Link href="/downloads/denim-jeans-spec-template/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Denim Jeans Spec Template</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fill-in specification template for denim jeans sourcing from Pakistan.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Template →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Denim Jeans?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, oz and wash confirmed — RFQ takes 3 minutes. Factory match and quotation within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — CONSTRUCTIONS — INDUSTRIAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" style={{ backgroundColor: "#1C1208" }} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-12">
            <div className="w-px h-16 bg-amber-500/40 mt-1 hidden sm:block" aria-hidden="true" />
            <div>
              <p className="font-mono text-amber-500/70 text-xs tracking-[0.3em] uppercase mb-2">
                [WOVEN SPECIFICATION — DENIM CONSTRUCTIONS]
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Denim Constructions</h2>
              <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">
                Every denim jeans programme starts with fabric construction. Each build has distinct oz range, hand-feel, fade character and wash compatibility.
              </p>
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
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-amber-500/40"
                }`}
              >
                {activeConstruction !== c.id && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                  </span>
                )}
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
                    <span className="text-xs font-semibold text-amber-400 bg-amber-400/15 px-3 py-1 rounded-full border border-amber-400/30">
                      {ac.badge}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">OZ_WEIGHT</p>
                    <p className="text-lg font-bold text-gold">{ac.oz}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">HAND_FEEL</p>
                    <p className="text-sm text-white">{ac.hand}</p>
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
                    {ac.best.map((b) => (
                      <span key={b} className="text-xs text-white bg-white/10 px-3 py-1 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">KEY_MARKETS[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => (
                      <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">WASH_COMPAT[ ]</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.decorations.map((d) => (
                      <div key={d} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
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
          SECTION 2 — FIT PROFILES — SPLIT-SCREEN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-fits" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl shadow-xl">
            <div className="bg-navy-900 p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-4">No. 02 / Fit &amp; Sizing</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.05] mb-6">
                Six<br />Silhouettes
              </h2>
              <div className="w-14 h-0.5 bg-gold mb-6" aria-hidden="true" />
              <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-xs">
                Denim fit determines market positioning entirely. Each silhouette addresses a distinct buyer demographic and retail channel.
              </p>
              <blockquote className="border-l-4 border-gold pl-5 text-base font-medium text-gray-300 italic leading-relaxed">
                &ldquo;The same 11 oz stretch denim sells as premium slim-fit to EU buyers and relaxed-leg streetwear to USA labels — construction stays constant, silhouette changes the market.&rdquo;
              </blockquote>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center pt-8 border-t border-white/10">
                {[["Waist 24–42\"", "Size range"], ["US / UK / EU", "Standards"], ["Custom", "On request"]].map(([val, label]) => (
                  <div key={label}>
                    <p className="text-lg font-bold text-gold">{val}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white flex flex-col divide-y divide-gray-100">
              {FIT_PROFILES.map((f, i) => (
                <motion.div
                  key={f.code}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex gap-4 items-start px-8 py-5"
                >
                  <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {f.code}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-navy-900">{f.name}</h3>
                    <p className="text-xs text-gold font-semibold mt-0.5">{f.ease}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{f.market}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — OZ WEIGHT GUIDE — BRUTALIST UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-weight" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b-4 border-black pb-6 mb-12">
            <p className="text-xs font-black tracking-[0.4em] uppercase text-gray-400 mb-3">Weight Specification</p>
            <h2 className="text-5xl sm:text-6xl font-black text-black leading-none">Fabric Weight<br />Guide</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-black">
            {OZ_TIERS.map((t, i) => (
              <div
                key={t.oz}
                className={`p-8 flex flex-col gap-4 ${i < OZ_TIERS.length - 1 ? "border-b-2 sm:border-b-0 sm:border-r-2 border-black" : ""} ${t.featured ? "bg-gold/10" : ""}`}
              >
                <div>
                  {t.featured && (
                    <span className="inline-block mb-3 text-[10px] font-black text-black bg-gold px-3 py-1 uppercase tracking-widest">
                      Most Ordered
                    </span>
                  )}
                  <p className={`text-5xl font-black leading-none mb-1 ${t.featured ? "text-black" : "text-gray-800"}`}>{t.oz}</p>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">{t.name}</p>
                </div>
                <div className="border-t-2 border-black pt-4">
                  <p className="text-sm font-bold text-black mb-1">{t.season}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{t.market}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { val: "8–14 oz", label: "Full oz range" },
              { val: "11–12 oz", label: "Commercial standard" },
              { val: "5", label: "Constructions available" },
              { val: "6", label: "Wash techniques" },
            ].map((m) => (
              <div key={m.label} className="border-2 border-black p-5">
                <p className="text-2xl font-black text-black">{m.val}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — DECORATION METHODS — FLAT DESIGN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-decoration" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Decoration</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Decoration &amp; Wash Methods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {DECO_METHODS.map((d, i) => {
              const bgColors = ["bg-amber-100", "bg-stone-100", "bg-orange-100", "bg-zinc-100"];
              const codeColors = ["bg-amber-600", "bg-stone-600", "bg-orange-600", "bg-zinc-600"];
              return (
                <motion.div
                  key={d.code}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`${bgColors[i]} rounded-2xl p-7 flex flex-col gap-4`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`${codeColors[i]} text-white text-xs font-bold w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                      {d.code}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-navy-900">{d.method}</h3>
                      <p className="text-xs text-gray-600 mt-0.5">Compatible: {d.compat.join(" · ")}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{d.best}</p>
                  <p className="text-xs text-gray-600 bg-white/60 rounded-xl px-4 py-2.5">
                    {d.note}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 text-white grid sm:grid-cols-3 gap-8">
            {[
              ["Back Pocket", "Primary brand placement — embroidery, patch or laser pattern on back denim pocket"],
              ["Waistband", "Woven or PU patch label, selvedge ID stripe, hidden brand tape inside waistband"],
              ["Hardware", "Branded buttons, rivets and zip pulls — metal finish matched to brand colour code"],
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
          SECTION 5 — WASH EFFECTS — MONOCHROME UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-wash" style={{ backgroundColor: "#0A0A0A" }} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Finish Palette</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Wash Effects &amp; Finish Palette</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">
            Six commercial wash techniques — each creating a distinct indigo depth, surface texture and market positioning. Specify your target aesthetic in your RFQ.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WASH_EFFECTS.map((w, i) => (
              <motion.div
                key={w.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gold text-xs font-bold font-mono tracking-widest">{w.code}</span>
                  <span className="text-gray-500 text-[10px]">Fade intensity</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gray-300"
                    style={{ width: `${w.intensity === 0 ? 4 : w.intensity}%` }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{w.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 p-6 border border-white/10 rounded-2xl">
            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-3">Indigo depth spectrum (illustrative)</p>
            <div className="flex gap-2">
              {["bg-blue-950", "bg-blue-900", "bg-blue-800", "bg-blue-700", "bg-blue-600", "bg-blue-500", "bg-blue-400", "bg-blue-300", "bg-blue-200", "bg-blue-100", "bg-gray-200", "bg-gray-100"].map((c, i) => (
                <div key={i} className={`flex-1 h-10 rounded-lg ${c} opacity-90`} aria-hidden="true" />
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-3">
              Dark indigo (raw/no wash) → light (acid/bleach wash) — full spectrum achievable across all rigid and stretch constructions
            </p>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM & CUSTOM — MATERIAL DESIGN
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM &amp; Custom</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">OEM &amp; Custom Development</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every detail of your denim jeans programme — from wash recipe through to custom hardware — can be specified to your brand brief. We manage to your technical pack.
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
                  className={`bg-white rounded-2xl p-6 shadow-md border-t-4 ${f.accent} hover:shadow-lg hover:ring-2 hover:ring-gold/20 transition-all`}
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
          SECTION 7 — MARKETS — DARK MODE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-slate-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Markets</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Industry Applications</h2>
          <p className="text-gray-400 mb-12 max-w-2xl leading-relaxed">
            Denim jeans programmes span fashion, workwear, heritage and streetwear segments. Each sector has distinct construction, wash and specification requirements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-slate-800 border border-slate-700 hover:border-gold/50 rounded-2xl p-7 flex flex-col gap-4 transition-colors cursor-default"
              >
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gold/20 border border-gold/30 flex items-center justify-center">
                    <span className="text-gold text-lg font-bold">{s.abbr}</span>
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
            {[["USA / Canada", "Primary Market"], ["UK / Europe", "Key Market"], ["Japan / Korea", "Heritage Market"], ["Australia / Middle East", "Growing Market"]].map(([region, tier]) => (
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
          SECTION 8 — CERTIFICATIONS — GRID UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality Standards</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Quality Certifications</h2>
              <p className="text-gray-500 mt-3 max-w-xl leading-relaxed">
                Specify your required certification standard in your RFQ — factory matching is aligned to your compliance requirements.
              </p>
            </div>
            <div className="shrink-0 text-center sm:text-right">
              <p className="text-6xl font-bold text-gold">10+</p>
              <p className="text-sm text-gray-500 mt-1">Certifications in Network</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="bg-white border border-gray-100 hover:border-gold rounded-2xl p-5 flex flex-col items-center gap-3 text-center transition-colors"
                style={{ minHeight: 140 }}
              >
                <div className="w-16 h-12 flex items-center justify-center">
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={64} height={44} className="object-contain w-full h-full" />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy-900">{c.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{c.full}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — EXPORT & PACKAGING — MODULAR UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export &amp; Packaging</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Export Terms &amp; Packaging</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Choose the Incoterm that matches your logistics setup. Packaging is specified per programme to meet your retail or distribution requirements.
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
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center">
                  <span className="text-gold text-sm font-bold">{e.term}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-navy-900">{e.term}</p>
                  <p className="text-xs text-gray-400">{e.full}</p>
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
                className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col items-center gap-2 text-center shadow-xs"
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
            <strong>Important:</strong> The durations below are indicative guides based on typical programmes. Actual timelines depend on factory scheduling, wash complexity, fabric sourcing, number of sample iterations, seasonal demand and chosen Incoterm. Share your target delivery date in your RFQ for a specific assessment.
          </div>
          <div className="flex flex-col gap-3">
            {LEAD_STAGES.map((stage, i) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-xs"
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
            Indicative total programme duration: approximately 90–130 days from RFQ to departure port, excluding sea freight. These figures are for planning purposes only and are not a contractual commitment.
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — MINIMAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-gold">Ethics &amp; Environment</p>
            <h2 className="text-4xl sm:text-5xl font-light text-navy-900 mb-5 leading-[1.15]">
              Sustainable<br />Denim Sourcing
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-6" aria-hidden="true" />
            <p className="text-gray-500 text-lg leading-loose">
              Denim production carries significant environmental impact. Every programme can be structured to reduce water use, chemical exposure and labour risk through certified supply chain choices.
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
                className="flex items-start gap-6 py-7"
              >
                <span className="text-2xl shrink-0 mt-1" aria-hidden="true">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold text-navy-900">{item.title}</h3>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
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

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — SOURCING PROCESS — CARD-BASED UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Programme Roadmap</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Our Sourcing Process</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Six structured steps from specification to shipment. Each step managed by MZ Global Trading — you submit the spec, we coordinate factory, wash house and logistics.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 shadow-xs hover:shadow-lg transition-shadow flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <span className="text-gold text-sm font-bold">{step.num}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{step.short}</p>
                  <h3 className="text-lg font-bold text-navy-900">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
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

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Denim Jeans FAQ</h2>
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
          MORE WOVEN GARMENTS
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Woven Garments</p>
            <h2 className="text-2xl font-bold text-navy-900">More Woven Garments</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Formal & Casual Shirts", desc: "Poplin, oxford, twill and linen. Corporate, fashion and hospitality programmes.", href: "/apparel/wovengarments/formalcasualshirts/", img: "/images/hero/hero-formal-casual-shirts.webp", alt: "Pakistan formal and casual shirt manufacturer — OEM poplin, oxford and twill shirts for corporate and fashion brands worldwide" },
              { name: "Pants & Trousers", desc: "Twill, chino and stretch ponte. Business-casual to formal tailored programmes.", href: "/apparel/wovengarments/pantsandtrousers/", img: "/images/hero/hero-pants-trousers.webp", alt: "Pakistan pants and trousers manufacturer — OEM twill, chino and stretch tailored trousers for fashion and workwear brands" },
              { name: "Cargo Pants", desc: "Ripstop, canvas and stretch ripstop. Tactical, outdoor and workwear programmes.", href: "/apparel/wovengarments/cargopants/", img: "/images/hero/hero-cargo-pants.webp", alt: "Pakistan cargo pants manufacturer — OEM ripstop and canvas cargo trousers for outdoor and tactical brands worldwide" },
              { name: "Shorts", desc: "Chino, canvas, linen and ripstop. Casual, athletic and resort wear programmes.", href: "/apparel/wovengarments/shorts/", img: "/images/hero/hero-shorts.webp", alt: "Pakistan shorts manufacturer — OEM chino, canvas and linen shorts for casual, athletic and resort wear brands" },
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
              Ready to Source Denim Jeans<br />from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Denim jeans from Pakistan&rsquo;s certified woven garment mills. Rigid, stretch, raw and recycled cotton — any construction, any wash. Submit the spec; we coordinate factory matching, sampling and bulk production to your timeline.
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
