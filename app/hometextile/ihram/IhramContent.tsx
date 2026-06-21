"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion-shim";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
    id: "plain-weave",
    name: "Plain Weave Cotton",
    badge: "Most Sourced",
    gsm: "150–320 GSM",
    hand: "Crisp, clean drape; stays flat during Tawaf and Sa'i without bunching",
    best: ["Large-scale Hajj Supply", "Institutional Procurement", "Government Ministry Orders"],
    markets: ["Saudi Arabia", "Malaysia", "Indonesia", "UAE"],
    spec: "100% combed cotton, full optical bleach. 150–320 GSM. OEKO-TEX Standard 100. Whiteness ≥90 CIE. Shrinkage ≤3% warp and weft.",
    detail:
      "Plain weave is the primary construction for high-volume Ihram supply programmes. The tight interlacing of warp and weft threads produces a smooth, flat surface that maintains its structure through repeated handling. The crisp drape ensures the Izar wraps and tucks cleanly, while the Rida drapes over the shoulder without excessive fold bulk. Combed and ring-spun options produce tighter surface texture with improved dimensional stability across large production runs.",
  },
  {
    id: "terry-weave",
    name: "Terry Weave Cotton",
    badge: "Soft Hand",
    gsm: "200–350 GSM",
    hand: "Soft, loop-textured surface; higher absorbency than plain weave — suited to warm conditions",
    best: ["Premium Retail", "Gifting Programmes", "Boutique Hajj Operators"],
    markets: ["UAE", "UK", "Saudi Arabia", "Malaysia"],
    spec: "100% cotton terry loop, lightweight, fully bleached. 200–350 GSM. OEKO-TEX Standard 100. No pile shearing — plain terry face maintained.",
    detail:
      "Terry weave Ihram offers a softer hand-feel and higher moisture absorbency than plain weave. The loop structure is breathable and suited to the conditions of the Haram environment. Supplied without shearing or velour finishing to preserve the plain fabric requirement. This construction is the preferred choice for premium hajj package inclusions, retail gift sets and buyers seeking a value-add over standard institutional supply. A standard pair at 45\"×90\" in the 230–305 GSM range weighs 1,200–1,600 g; custom GSM available on request.",
  },
  {
    id: "microfiber",
    name: "Microfiber",
    badge: "Quick-Dry",
    gsm: "180–280 GSM",
    hand: "Ultra-soft, silky surface; rapid moisture evaporation — suited to high-heat, high-humidity conditions",
    best: ["Budget Retail Programmes", "Economy Umrah Packages", "Fast-Turnaround Supply"],
    markets: ["UAE", "Saudi Arabia", "UK", "Indonesia"],
    spec: "80% polyester + 20% polyamide blend, optical white. 180–280 GSM. Quick-dry treated. Supplied as two unstitched panels. Pair weight 700–1,200 g.",
    detail:
      "Microfiber Ihram uses a fine polyester-polyamide blend that delivers rapid moisture management and quick-dry performance — a practical advantage in the high-heat, high-humidity environment of the Haram. The soft, smooth surface is comfortable against skin for extended wear. As a synthetic construction, microfiber Ihram is primarily sourced for budget retail, tour operator economy packages and price-sensitive procurement channels. Pakistan-based manufacturers supply in standard 45\"×90\" sizing with pair weights typically between 700 g and 1,200 g. Note: some scholars specify 100% cotton — buyers should verify requirements with their market.",
  },
  {
    id: "dobby-stripe",
    name: "Dobby Stripe Cotton",
    badge: "Premium Look",
    gsm: "230–320 GSM",
    hand: "Subtle woven stripe texture; structurally identical to plain weave with a fine white-on-white variation",
    best: ["Premium Institutional", "Retail Differentiation", "Branded Set Programmes"],
    markets: ["UK", "EU", "UAE", "Malaysia"],
    spec: "100% cotton with woven dobby stripe, zero dye or colour — white-on-white texture only. 230–320 GSM. OEKO-TEX Standard 100.",
    detail:
      "Dobby stripe Ihram achieves visual distinction without violating the undyed, undecorated requirement. The self-coloured (white-on-white) woven stripe is produced by texture variation in the dobby loom — not by yarn colouring or printing. This construction is used for premium retail programmes and branded set packaging where product-tier distinction is commercially valuable. MZ Global Trading supplies dobby stripe Ihram with zero colorant applied at any stage.",
  },
];

const SIZE_OPTIONS = [
  {
    code: "CHD",
    name: "Kids Pair",
    tag: "Ages 4–10",
    featured: false,
    ridaSize: '30" × 60" (76 × 152 cm)',
    izarSize: '30" × 60" (76 × 152 cm)',
    target: "Young children approx. 4–10 years",
    notes: "Two identical unstitched pieces. Suited to younger pilgrims performing Umrah with family.",
  },
  {
    code: "YTH",
    name: "Youth Pair",
    tag: "Ages 10–16",
    featured: false,
    ridaSize: '40" × 80" (102 × 203 cm)',
    izarSize: '40" × 80" (102 × 203 cm)',
    target: "Older boys and teens approx. 10–16 years",
    notes: "Big-boy sizing used across most wholesale markets for adolescent pilgrims.",
  },
  {
    code: "STD",
    name: "Standard Pair",
    tag: "Most Ordered",
    featured: true,
    ridaSize: '45" × 90" (114 × 229 cm)',
    izarSize: '45" × 90" (114 × 229 cm)',
    target: "Adult male (approx. 160–185 cm height)",
    notes: "The globally dominant wholesale specification. Two identical unstitched panels per pair.",
  },
  {
    code: "LRG",
    name: "Large Pair",
    tag: "Extended",
    featured: false,
    ridaSize: '50" × 100" (127 × 254 cm)',
    izarSize: '50" × 100" (127 × 254 cm)',
    target: "Taller or broader adults (185 cm+)",
    notes: "Extra width and length for full coverage on larger builds.",
  },
];

const GSM_TIERS = [
  {
    range: "135–220 GSM",
    pairWeight: "700–1,150 g / pair",
    label: "Lightweight",
    season: "Summer Hajj / Gulf Climate",
    desc: "Optimal for peak summer Hajj when temperatures in Makkah exceed 40°C. Maximum breathability and quick-dry performance.",
    pct: 32,
    color: "bg-sky-400",
    featured: false,
  },
  {
    range: "230–305 GSM",
    pairWeight: "1,200–1,600 g / pair",
    label: "Standard",
    season: "Year-Round — Most Ordered",
    desc: "Primary procurement tier. Balances breathability, structural stability and durability. The dominant wholesale specification for Hajj operator bulk supply.",
    pct: 70,
    color: "bg-stone-500",
    featured: true,
  },
  {
    range: "320–420 GSM",
    pairWeight: "1,650–2,200 g / pair",
    label: "Heavyweight",
    season: "Winter Umrah / Northern Markets",
    desc: "For winter Umrah and northern-climate Muslim communities. Additional fabric body and warmth without compromising drape compliance.",
    pct: 95,
    color: "bg-navy-900",
    featured: false,
  },
];

const PURITY_STANDARDS = [
  { standard: "Whiteness Degree", value: "≥90 CIE", note: "Measured per ISO 2469. Batch-to-batch tolerance ±3 CIE." },
  { standard: "Optical Brightener", value: "Permitted (OEKO-TEX)", note: "Only OEKO-TEX Standard 100 compliant brightening agents used." },
  { standard: "Shrinkage (Warp & Weft)", value: "≤3% after 5 washes", note: "Tested per ISO 6330 at 40°C laundering." },
  { standard: "Tensile Strength", value: "Per ISO 13934-1", note: "Minimum warp/weft breaking force compliance documented." },
  { standard: "Chemical Safety", value: "OEKO-TEX Standard 100", note: "No azo dyes, no restricted substances. Class 1 available." },
  { standard: "Fabric Form", value: "Unstitched panels", note: "Supplied as two separate unstitched pieces per Islamic jurisprudence." },
];

const BULK_BUYERS = [
  {
    num: "01",
    title: "Hajj & Umrah Operators",
    desc: "Government-licenced tour operators procuring Ihram sets for pilgrim groups. Supply from 100 to 10,000+ pair quantities. Pair packing and bulk carton configurations available.",
    icon: "🕌",
  },
  {
    num: "02",
    title: "Government & Ministry Supply",
    desc: "Ministry of Hajj and religious affairs procurement. Institutional specifications with ISO 9001 documentation, test reports and compliance certificates provided.",
    icon: "🏛️",
  },
  {
    num: "03",
    title: "Islamic Retail Distributors",
    desc: "Retail poly pack with custom header card available. Full OEM documentation. Suitable for Islamic bookshops, hajj supply retailers and online distributors worldwide.",
    icon: "🛍️",
  },
  {
    num: "04",
    title: "Hotels & Accommodation",
    desc: "Makkah and Madinah hotel properties supplying Ihram sets for guests. Custom labelling options available for premium hospitality programmes.",
    icon: "🏨",
  },
];

const MARKET_DATA = [
  { flag: "🇸🇦", region: "Saudi Arabia", buyers: "Hajj operators, Ministry of Hajj", cert: "ISO 9001", desc: "Largest single market for Ihram procurement globally. Government and private hajj tour operators are the primary buyers." },
  { flag: "🇦🇪", region: "UAE", buyers: "Retailers, Umrah travel agencies", cert: "OEKO-TEX", desc: "Growing demand from premium retail and Umrah package operators across the Emirates." },
  { flag: "🇲🇾", region: "Malaysia", buyers: "Tabung Haji, national retailers", cert: "BSCI", desc: "Malaysia's national hajj authority (Lembaga Tabung Haji) is a significant institutional buyer." },
  { flag: "🇮🇩", region: "Indonesia", buyers: "Government hajj programme, wholesalers", cert: "GOTS / OEKO-TEX", desc: "World's largest Muslim population. Government hajj quota procurement is the primary channel." },
  { flag: "🇬🇧", region: "UK", buyers: "Islamic retail, community organisations", cert: "OEKO-TEX", desc: "UK-based hajj operators and Islamic retail shops serving the 3.9 million Muslim community." },
  { flag: "🌍", region: "Global Diaspora", buyers: "Online Islamic retailers, community groups", cert: "ISO 9001", desc: "Worldwide Muslim diaspora in USA, Canada, Europe, Australia and Southeast Asia." },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", img: "/images/certs/cert-gots.webp", desc: "Certifies organic cotton Ihram from fibre to finished product. Required for organic-designated programmes." },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", img: "/images/certs/cert-oeko-tex.webp", desc: "Every component tested for harmful substances. Class 1 (direct skin contact) applicable for Ihram supply." },
  { name: "BSCI", full: "Business Social Compliance Initiative", img: "/images/certs/cert-bsci.webp", desc: "Factory-level social audit covering worker rights, safety and fair wages. Required by European buyers." },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", img: "/images/certs/cert-sedex.webp", desc: "Ethical supply chain transparency platform. Enables buyer access to factory audit data and corrective actions." },
  { name: "ISO 9001", full: "ISO 9001 Quality Management", img: "/images/certs/cert-iso-9001.webp", desc: "Quality management system certification required for government ministry and institutional procurement tenders." },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", img: "/images/certs/cert-wrap.webp", desc: "Independent certification for lawful, humane and ethical manufacturing practices." },
  { name: "BCI", full: "Better Cotton Initiative", img: "/images/certs/cert-bci.webp", desc: "Promotes sustainable cotton farming through measurable improvements in water, soil and farmer livelihoods." },
];

const EXPORT_PACKING = [
  { code: "PP", name: "Pair Pack", desc: "Rida + Izar in a single sealed polybag. Standard for retail and hajj operator distribution." },
  { code: "IP", name: "Individual Piece", desc: "Single Rida or Izar packed separately. For institutional programmes requiring individual distribution." },
  { code: "RP", name: "Retail Poly Pack", desc: "Header card with poly bag. Custom branding for retail programmes." },
  { code: "BC", name: "Bulk Carton", desc: "24 or 48 pairs per export carton. Optimised for FCL/LCL sea freight." },
];

const SEA_FREIGHT = [
  { dest: "Saudi Arabia", days: "12–18 days" },
  { dest: "UAE", days: "8–12 days" },
  { dest: "Malaysia", days: "12–16 days" },
  { dest: "Indonesia", days: "14–20 days" },
  { dest: "UK", days: "20–28 days" },
  { dest: "USA", days: "28–35 days" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", tag: "GOTS", desc: "GOTS-certified 100% organic cotton Ihram available. Fully traceable from certified farm to final pack." },
  { icon: "💧", title: "Water Efficiency", tag: "Process", desc: "Enzyme scouring reduces water consumption versus conventional kier bleaching. No discharge of restricted substances." },
  { icon: "⚗️", title: "Chemical Safety", tag: "OEKO-TEX", desc: "All processing chemicals comply with OEKO-TEX Standard 100. No azo dyes, no restricted substances." },
  { icon: "⚖️", title: "Ethical Audits", tag: "BSCI / Sedex", desc: "BSCI and Sedex audited factories. Worker welfare, safety and fair wages verified and documented." },
  { icon: "🌿", title: "Natural Fibres", tag: "100% Cotton", desc: "100% cotton construction throughout — fully biodegradable. No synthetic fibre blends in Ihram supply." },
  { icon: "📦", title: "Eco Packaging", tag: "Optional", desc: "Recycled polybags and FSC-certified paper header cards available for retail programmes on request." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit Specification", short: "Specification", desc: "Share construction, GSM, size mix, quantity and destination port via the RFQ form." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "2–3 certified cotton weaving mills evaluated based on construction, certification and capacity. Pricing within 3–5 working days." },
  { num: "03", title: "Pre-production Sample", short: "Sampling", desc: "Sample pair produced to specification in 10–15 days. Whiteness grade, dimensions and construction confirmed before bulk approval." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Buyer reviews whiteness, dimensions and construction. Revisions completed before purchase order placement." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Bulk weaving, optical bleaching and finishing. Timeline based on quantity and factory scheduling." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection, packing and export from Karachi or Port Qasim. Full documentation package issued." },
];

const FAQS = [
  {
    q: "What makes an Ihram Shariah-compliant in terms of fabric construction?",
    a: "Shariah requires Ihram to be unstitched (not sewn into a garment), undyed (white or unbleached natural cotton only) and free from all decoration — no embroidery, print, pattern or ornamentation. MZ Global Trading supplies Ihram as two separate unstitched fabric panels: the Rida (upper body drape) and the Izar (lower body wrap). Both are woven, optically bleached to ≥90 CIE whiteness, and supplied without any coloured thread, dye or applied decoration. The Dobby Stripe option uses a white-on-white woven texture variation — not a colour stripe — to maintain compliance. Our manufacturing processes are specifically designed to preserve these requirements throughout every production stage.",
  },
  {
    q: "What GSM is suitable for pilgrims travelling to Saudi Arabia in summer?",
    a: "For summer Hajj and Umrah in Saudi Arabia, where ambient temperatures in Makkah and Madinah regularly exceed 40°C, we recommend the 135–220 GSM lightweight range in plain weave or lightweight terry construction. At this weight, a standard 45\"×90\" pair weighs approximately 700–1,150 g — light enough for extended outdoor wear in peak heat. For year-round programmes, 230–305 GSM is the standard procurement tier — a 45\"×90\" pair weighs 1,200–1,600 g and is the dominant wholesale specification for Hajj operators. For winter Umrah or northern-climate communities, 320–420 GSM is appropriate — pair weight reaches 1,650–2,200 g for maximum warmth and fabric body. Custom GSM specifications outside these ranges are available on request.",
  },
  {
    q: "Can you supply Ihram sets with our company branding on the packaging?",
    a: "Yes. Branding is permitted on the packaging — the religious restriction applies to the Ihram fabric itself, not to the container. We offer retail poly packs with custom header card printing, allowing hajj operators, hotels and Islamic retailers to include their logo, contact information and product description. Custom poly bags with printed graphics are also available for premium programmes. The Ihram fabric inside remains fully compliant: white, unstitched, undecorated. For government ministry or institutional procurement where a neutral or ministry-branded presentation is required, we supply in plain pair pack or unbranded bulk carton with standard documentation.",
  },
  {
    q: "What is the standard size for an Ihram pair and do you offer custom sizing?",
    a: "The standard adult Ihram is 45\" × 90\" per piece (114 × 229 cm), the dominant wholesale specification globally. We offer four size options: Kids pair at 30\" × 60\" (76 × 152 cm) for children aged approximately 4–10; Youth pair at 40\" × 80\" (102 × 203 cm) for older boys and teens aged approximately 10–16; Standard pair at 45\" × 90\" (114 × 229 cm) for adult males; and Large pair at 50\" × 100\" (127 × 254 cm) for taller or broader adults above 185 cm. All dimensions refer to each individual unstitched panel — every set comprises two identical pieces (Rida + Izar). A ±2 cm manufacturing tolerance applies. Custom dimensions are available for institutional programmes — include required piece dimensions in the RFQ.",
  },
  {
    q: "Which certifications are required for government ministry procurement?",
    a: "Government ministry and institutional procurement typically requires ISO 9001 Quality Management System certification as the minimum, alongside full test reports for whiteness (CIE), shrinkage (ISO 6330) and tensile strength (ISO 13934-1). For markets where chemical safety compliance is scrutinised — particularly Malaysia, Indonesia and European markets — OEKO-TEX Standard 100 Class 1 is frequently required in procurement specifications. BSCI or Sedex audit compliance is increasingly asked for by government buyers who include supply chain ethical standards in their tender criteria. We can provide documentation for ISO 9001, OEKO-TEX, BSCI and Sedex across our Ihram supply network.",
  },
  {
    q: "How is whiteness grade tested and documented for Ihram fabric?",
    a: "Whiteness is measured using a spectrophotometer calibrated to ISO 2469 standards. Our target specification is ≥90 CIE whiteness with a batch-to-batch tolerance of ±3 CIE units to ensure consistency across shipments. Each bulk shipment is accompanied by a whiteness test report issued by the manufacturing facility, with shade cards provided as a physical reference. For institutional or government procurement where independent third-party testing is required, we can arrange testing through SGS, Bureau Veritas or Intertek prior to shipment. Shade cards are issued with each shipment to allow the buyer to verify colour consistency on arrival.",
  },
  {
    q: "What packing format is used for bulk hajj operator orders?",
    a: "Bulk hajj operator orders are typically packed in export cartons of 24 or 48 pairs per carton, depending on size and GSM. Within each carton, Ihram sets are individually folded in sealed polybags (pair pack format: Rida + Izar together). This allows easy individual distribution to pilgrims at the operator's premises or during Hajj orientation sessions. Cartons are marked with standard export information: item description, quantity, size, weight, country of origin and shipping marks. For mixed-size orders, each size can be packed in separately marked cartons or combined with clear inner bundle separation.",
  },
  {
    q: "What is the typical lead time from order placement to delivery?",
    a: "Lead times depend on quantity, construction and current factory capacity. As a general guide: sample production takes 10–15 days from specification confirmation; bulk production typically takes 25–45 days from purchase order placement depending on order volume. Sea freight transit adds 8–35 days depending on destination: 8–12 days to UAE, 12–18 days to Saudi Arabia, 12–16 days to Malaysia, 20–28 days to the UK. For large Hajj season orders, we strongly recommend placing orders a minimum of 90 days before the required delivery date. Lead times are indicative only and subject to factory scheduling, material availability and order complexity.",
  },
  {
    q: "Is organic cotton Ihram available and which certifications apply?",
    a: "Yes. GOTS-certified (Global Organic Textile Standard) organic cotton Ihram is available. GOTS certification covers the entire supply chain from organic farming through spinning, weaving, bleaching and packing — ensuring the organic claim is fully substantiated and auditable. Organic cotton Ihram is primarily sourced for premium retail programmes, gift sets and buyers whose commitments require certified organic textile inputs. In addition to GOTS, OEKO-TEX Standard 100 Class 1 applies to all Ihram supply — organic and conventional — ensuring the absence of harmful substances regardless of cotton origin.",
  },
];

const PAGE_BOXES = [
  {
    title: "Bath Linen",
    desc: "Towels, bathrobes, bath mats and beach towels from Pakistan's certified mills.",
    href: "/hometextile/bathlinen/",
    image: "/images/menu/menu-towels.webp",
    alt: "Pakistan bath linen manufacturer — hotel and retail towels and bathrobes for USA, UK and Europe",
    cta: "View Bath Linen",
  },
  {
    title: "Bed Linen",
    desc: "Bedsheets, duvet covers, pillow covers and cushion covers. Six weave constructions.",
    href: "/hometextile/bedlinen/",
    image: "/images/menu/menu-bedsheets.webp",
    alt: "Pakistan bed linen manufacturer — hotel bedsheets and duvet covers for brands in USA, UK and Europe",
    cta: "View Bed Linen",
  },
  {
    title: "Kitchen Linen",
    desc: "Kitchen towels, bar mops, aprons and pot holders from Pakistan's certified factories.",
    href: "/hometextile/kitchenlinen/",
    image: "/images/menu/menu-kitchenlinen.webp",
    alt: "Pakistan kitchen linen manufacturer — wholesale kitchen towels and aprons for retail and food service",
    cta: "View Kitchen Linen",
  },
  {
    title: "Table Linen",
    desc: "Table covers and table linen for hospitality, events and retail buyers.",
    href: "/hometextile/tablelinen/",
    image: "/images/menu/menu-tablelinen.webp",
    alt: "Pakistan table linen manufacturer — custom table covers for hospitality and event buyers worldwide",
    cta: "View Table Linen",
  },
  {
    title: "Thermal Blankets",
    desc: "Cellular and fleece thermal blankets. Hospital, retail and institutional grades.",
    href: "/hometextile/thermalblankets/",
    image: "/images/menu/menu-thermalblankets.webp",
    alt: "Pakistan thermal blanket manufacturer — cellular and fleece blankets for healthcare and retail buyers",
    cta: "View Thermal Blankets",
  },
  {
    title: "Hospital Linen",
    desc: "Surgical gowns, medical scrubs, patient gowns and huck towels.",
    href: "/hometextile/hospitallinen/",
    image: "/images/menu/menu-hospitallinen.webp",
    alt: "Pakistan hospital linen manufacturer — surgical gowns, medical scrubs and patient gowns for healthcare buyers",
    cta: "View Hospital Linen",
  },
  {
    title: "Industrial Linen",
    desc: "Shop towels and fender covers for automotive and industrial buyers.",
    href: "/hometextile/industriallinen/",
    image: "/images/menu/menu-industriallinen.webp",
    alt: "Pakistan industrial linen manufacturer — shop towels and fender covers for automotive and industrial buyers",
    cta: "View Industrial Linen",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IhramContent() {
  const [activeConstruction, setActiveConstruction] = useState("plain-weave");
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
            src="/images/hero/hero-home-textiles.webp"
            fill
            alt="Pakistan ihram manufacturer — plain white cotton ihram sets for Hajj and Umrah pilgrims worldwide"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-white/60 flex-wrap">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/hometextile/" className="hover:text-white transition-colors">Home Textiles</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white/90">Ihram</li>
              </ol>
            </nav>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Home Textile Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Ihram Sets
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
              MZ Global Trading sources plain white cotton Ihram sets from
              Pakistan&rsquo;s certified weaving mills. Plain weave, terry and dobby
              stripe constructions. 200&ndash;350 GSM. GOTS, OEKO-TEX Standard 100.
              Export to Saudi Arabia, UAE, Malaysia and worldwide.
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
                Ihram Supply — Pakistan Weaving Mills
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Plain White Ihram — Sourced with Precision and Respect
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s certified cotton weaving mills supply Ihram sets that meet both Shariah requirements and international procurement standards. Unstitched, undyed, undecorated — every pair manufactured to ≥90 CIE whiteness with full OEKO-TEX compliance.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "3", label: "Weave Types" },
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

          {/* Row 1 — 2 large bentos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-stone-50 border border-stone-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🕌</span>
                <div>
                  <p className="text-stone-600 text-xs font-semibold tracking-[0.2em] uppercase">Construction</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-stone-200">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    <p className="text-xs text-stone-600 mt-1 leading-tight">{c.best[0]}</p>
                    {c.badge && (
                      <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>
                    )}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Ihram Set Dimensions</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {SIZE_OPTIONS.map((s) => (
                  <div key={s.code} className={`rounded-xl px-4 py-2.5 border flex items-start gap-3 ${s.featured ? "bg-navy-900 border-navy-700" : "bg-white border-gray-200"}`}>
                    <span className={`w-8 h-8 rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${s.featured ? "bg-gold/20 text-gold" : "bg-gray-100 text-gray-600"}`}>{s.code}</span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-xs font-semibold ${s.featured ? "text-white" : "text-navy-900"}`}>{s.name}</p>
                        {s.tag && <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${s.featured ? "text-navy-900 bg-gold" : "text-gold bg-gold/10"}`}>{s.tag}</span>}
                      </div>
                      <p className={`text-[10px] mt-0.5 ${s.featured ? "text-gray-300" : "text-gray-500"}`}>Each piece: {s.ridaSize}</p>
                      <p className={`text-[10px] mt-0.5 leading-snug ${s.featured ? "text-gray-400" : "text-gray-400"}`}>{s.target}</p>
                    </div>
                  </div>
                ))}
                <p className="text-[10px] text-gray-400 mt-1 pl-1">+ Custom dimensions available on request</p>
              </div>
              <ExploreBtn sectionId="section-dimensions" label="View Dimensions" />
            </motion.div>
          </div>

          {/* Row 2 — 4 equal bentos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Guide</h3>
              <div className="flex flex-col gap-3 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.range} className="bg-white rounded-xl p-3 border border-blue-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-navy-900">{t.range}</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] font-semibold text-blue-600">{t.label}</p>
                    <p className="text-[10px] font-medium text-amber-700 mt-0.5">{t.pairWeight}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{t.season}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-weight" label="View Weight Guide" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">✅</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Quality</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Purity Standards</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PURITY_STANDARDS.slice(0, 4).map((p) => (
                  <div key={p.standard} className="bg-white rounded-lg px-3 py-2 border border-rose-50">
                    <p className="text-xs font-semibold text-navy-900">{p.standard}</p>
                    <p className="text-[10px] text-rose-600 font-medium mt-0.5">{p.value}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-purity" label="View Standards" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⬜</span>
              <p className="text-zinc-500 text-xs font-semibold tracking-[0.2em] uppercase">Specification</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">White Specification</h3>
              <div className="flex flex-col gap-3 flex-1">
                <div className="bg-white rounded-xl p-3 border border-zinc-200">
                  <p className="text-xs font-semibold text-navy-900 mb-1">Whiteness Target</p>
                  <p className="text-2xl font-bold text-navy-900">≥90 CIE</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Batch tolerance ±3 CIE units</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-zinc-200">
                  <p className="text-xs font-semibold text-navy-900 mb-1">Process</p>
                  <p className="text-xs text-gray-600 leading-snug">Full optical bleach — kier bleached and optically brightened</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-zinc-200">
                  <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wide">Zero colorant guarantee</p>
                </div>
              </div>
              <ExploreBtn sectionId="section-white-spec" label="View White Spec" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏢</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Programmes</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Bulk Supply Programmes</h3>
              <div className="flex flex-col gap-2 flex-1">
                {BULK_BUYERS.map((b) => (
                  <div key={b.num} className="flex items-start gap-2">
                    <span className="text-gold text-xs font-bold mt-0.5 shrink-0">{b.num}</span>
                    <p className="text-xs text-gray-600 leading-snug">{b.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-bulk" label="View Programmes" />
            </motion.div>
          </div>

          {/* Row 3 — 5-col: 2+2+1 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Market Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {MARKET_DATA.map((m) => (
                  <div key={m.region} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-lg leading-none">{m.flag}</p>
                    <p className="text-xs font-bold text-teal-600 mt-1">{m.region}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{m.buyers.split(",")[0]}</p>
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
              className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Packing</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_PACKING.map((e) => (
                  <div key={e.code} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-orange-100">
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center shrink-0">{e.code}</span>
                    <p className="text-xs font-semibold text-navy-900">{e.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* Row 4 — 3-col: 2+1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
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
              <p className="font-semibold text-navy-900">Ihram Sourcing &amp; Hajj Procurement Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction guide, whiteness standards and procurement frameworks for hajj operators and government buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Textile Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times, certification requirements and factory audit overview for international buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Spec Sheets &amp; Certification Docs</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction spec sheets, whiteness test methodology and certification documentation for procurement tenders.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Ihram Sets?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, GSM and size confirmed — RFQ takes 3 minutes. Factory match and quotation returned within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — FABRIC CONSTRUCTIONS — TECHNICAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-[#080E1A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-12">
            <div className="w-px h-16 bg-gold/40 mt-1 hidden sm:block" aria-hidden="true" />
            <div>
              <p className="font-mono text-gold/70 text-xs tracking-[0.3em] uppercase mb-2">[TECHNICAL SPECIFICATION — WEAVE CONSTRUCTIONS]</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Fabric Constructions</h2>
              <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">
                Every Ihram sourcing programme begins with construction selection. Each weave type has distinct hand-feel, GSM range, absorbency properties and procurement positioning — all within the unstitched, undyed, undecorated requirement of the Shariah specification.
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
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-gold/40"
                }`}
              >
                {activeConstruction !== c.id && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
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
                    <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">{ac.badge}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">GSM_RANGE</p>
                    <p className="text-lg font-bold text-gold">{ac.gsm}</p>
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
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">COMPLIANCE</p>
                  <p className="text-sm text-gray-300">Unstitched, undyed and free of all decoration per Islamic jurisprudence. Whiteness ≥90 CIE. OEKO-TEX Standard 100.</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 bg-amber-900/20 border border-amber-700/40 rounded-xl px-5 py-4">
            <p className="text-amber-400 text-xs leading-relaxed">
              <span className="font-semibold">Note:</span> Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
            </p>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — WEIGHT & GSM GUIDE — DASHBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-weight" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Weight Selection</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">GSM Weight Guide</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Ihram GSM selection depends on climate, season of pilgrimage and end-use application. The gauge below shows the relationship between weight, breathability and warmth.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {GSM_TIERS.map((t, i) => (
              <motion.div
                key={t.range}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-6 border ${t.featured ? "bg-navy-900 border-navy-700" : "bg-gray-50 border-gray-200"}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-bold ${t.featured ? "text-gold" : "text-navy-900"}`}>{t.range}</span>
                  {t.featured && <span className="text-xs font-semibold text-navy-900 bg-gold px-2.5 py-1 rounded-full">Most Ordered</span>}
                </div>
                <div className={`w-full h-2 rounded-full mb-4 ${t.featured ? "bg-white/10" : "bg-gray-200"}`}>
                  <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                </div>
                <p className={`text-sm font-bold mb-1 ${t.featured ? "text-white" : "text-navy-900"}`}>{t.label}</p>
                <p className={`text-xs font-semibold mb-1 ${t.featured ? "text-amber-400" : "text-amber-700"}`}>{t.pairWeight}</p>
                <p className={`text-xs font-semibold mb-2 ${t.featured ? "text-gold" : "text-gray-500"}`}>{t.season}</p>
                <p className={`text-sm leading-relaxed ${t.featured ? "text-gray-300" : "text-gray-600"}`}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
              <p className="text-sm font-bold text-navy-900">GSM vs. Weave Type — Procurement Reference</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Weight Tier</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Pair Weight</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Plain Weave</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Terry Weave</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Dobby Stripe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 font-semibold text-navy-900">Lightweight 135–220 gsm</td>
                    <td className="px-6 py-4 text-amber-700 font-medium text-xs">700–1,150 g / pair</td>
                    <td className="px-6 py-4 text-gray-600">✓ Available</td>
                    <td className="px-6 py-4 text-gray-600">✓ Available (primary)</td>
                    <td className="px-6 py-4 text-gray-400">— Not standard</td>
                  </tr>
                  <tr className="bg-gold/5">
                    <td className="px-6 py-4 font-semibold text-navy-900">Standard 230–305 gsm <span className="text-[10px] text-gold font-bold ml-2">★ MOST ORDERED</span></td>
                    <td className="px-6 py-4 text-amber-700 font-medium text-xs">1,200–1,600 g / pair</td>
                    <td className="px-6 py-4 text-gray-600">✓ Available (primary)</td>
                    <td className="px-6 py-4 text-gray-600">✓ Available</td>
                    <td className="px-6 py-4 text-gray-600">✓ Available</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-navy-900">Heavyweight 320–420 gsm</td>
                    <td className="px-6 py-4 text-amber-700 font-medium text-xs">1,650–2,200 g / pair</td>
                    <td className="px-6 py-4 text-gray-600">✓ Available</td>
                    <td className="px-6 py-4 text-gray-400">— Not standard</td>
                    <td className="px-6 py-4 text-gray-600">✓ Available</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-navy-900">Custom GSM</td>
                    <td className="px-6 py-4 text-amber-700 font-medium text-xs">On request</td>
                    <td className="px-6 py-4 text-gray-600">✓ Available</td>
                    <td className="px-6 py-4 text-gray-600">✓ Available</td>
                    <td className="px-6 py-4 text-gray-600">✓ Available</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — DIMENSIONS & SIZES — GRID UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-dimensions" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Sizing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Ihram Set Dimensions</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Each Ihram set comprises two identical unstitched panels: the Rida (upper body) and the Izar (lower body). All dimensions carry a ±2 cm manufacturing tolerance. Custom sizing is available on request.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {SIZE_OPTIONS.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`rounded-2xl p-5 border ${s.featured ? "bg-navy-900 border-navy-700" : "bg-white border-gray-200"}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-3xl font-black leading-none ${s.featured ? "text-gold/30" : "text-gray-100"}`}>{s.code}</span>
                  {s.tag && (
                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${s.featured ? "text-navy-900 bg-gold" : "text-gold bg-gold/10"}`}>{s.tag}</span>
                  )}
                </div>
                <h3 className={`text-base font-bold mb-3 ${s.featured ? "text-white" : "text-navy-900"}`}>{s.name}</h3>
                <div className={`rounded-xl p-3 mb-3 ${s.featured ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-200"}`}>
                  <p className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${s.featured ? "text-gray-400" : "text-gray-500"}`}>Each piece</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className={`text-[9px] ${s.featured ? "text-gray-500" : "text-gray-400"}`}>Rida</p>
                      <p className={`text-sm font-bold ${s.featured ? "text-gold" : "text-navy-900"}`}>{s.ridaSize}</p>
                    </div>
                    <div>
                      <p className={`text-[9px] ${s.featured ? "text-gray-500" : "text-gray-400"}`}>Izar</p>
                      <p className={`text-sm font-bold ${s.featured ? "text-gold" : "text-navy-900"}`}>{s.izarSize}</p>
                    </div>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed mb-2 ${s.featured ? "text-gray-300" : "text-gray-600"}`}>{s.target}</p>
                <p className={`text-[10px] leading-relaxed ${s.featured ? "text-gray-400" : "text-gray-500"}`}>{s.notes}</p>
                <p className={`text-[10px] mt-2 ${s.featured ? "text-gray-500" : "text-gray-400"}`}>Tolerance: ±2 cm</p>
              </motion.div>
            ))}
          </div>
          {/* Custom sizing banner */}
          <div className="bg-[#0D1B2A] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Bespoke Sizing</p>
              <h3 className="text-base font-bold text-white mb-1">Custom Dimensions Available</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Non-standard dimensions — extra-wide, extra-long or specific institutional specifications — produced to your requirements. Include the required piece dimensions in your RFQ and we confirm feasibility and pricing within 3–5 working days.
              </p>
            </div>
            <Link
              href="/rfq/"
              className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              Request Custom Size →
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — PURITY & QUALITY STANDARDS — SWISS DESIGN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-purity" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Standards</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Purity &amp; Quality Standards</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ihram fabric procurement is subject to both religious compliance and international quality standards. These two frameworks are fully compatible — OEKO-TEX Standard 100 and Shariah fabric requirements align on the prohibition of harmful chemicals and dye substances.
              </p>
              <div className="bg-stone-50 border-l-4 border-stone-400 pl-5 py-4 pr-4 rounded-r-xl">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>Religious Compliance:</strong> Ihram must be unstitched, undyed and free of all decoration per Islamic jurisprudence. Our manufacturing process preserves these requirements throughout production.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-navy-900 px-6 py-4">
                  <p className="text-white font-bold text-sm tracking-wide uppercase">Quality &amp; Compliance Standards — Ihram Fabric</p>
                </div>
                {PURITY_STANDARDS.map((p, i) => (
                  <motion.div
                    key={p.standard}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className={`grid grid-cols-5 px-6 py-5 border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                  >
                    <div className="col-span-2">
                      <p className="text-sm font-semibold text-navy-900">{p.standard}</p>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className="text-sm font-bold text-gold bg-gold/10 px-3 py-1 rounded-full inline-block">{p.value}</span>
                    </div>
                    <div className="col-span-2 pl-4">
                      <p className="text-xs text-gray-500 leading-relaxed">{p.note}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — WHITE SPECIFICATION — MONOCHROME UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-white-spec" className="bg-neutral-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-neutral-500">White Specification</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-12">The White Standard</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-black text-white rounded-2xl p-8"
            >
              <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">WHITENESS_TARGET</p>
              <p className="text-7xl font-black text-white leading-none mb-2">≥90</p>
              <p className="text-2xl font-bold text-white/60 mb-6">CIE units</p>
              <p className="text-white/70 text-sm leading-relaxed">Measured per ISO 2469. Industry-standard spectrophotometric measurement. Batch-to-batch tolerance ±3 CIE units.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col gap-5"
            >
              <div>
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-2">BLEACHING_PROCESS</p>
                <p className="font-bold text-neutral-900 text-lg mb-2">Full Optical Bleach</p>
                <p className="text-neutral-600 text-sm leading-relaxed">Cotton is pre-scoured, kier bleached at high temperature and optically brightened to achieve the target whiteness. All bleaching agents comply with OEKO-TEX Standard 100.</p>
              </div>
              <div className="border-t border-neutral-100 pt-5">
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-2">SHADE_CONSISTENCY</p>
                <p className="text-neutral-600 text-sm leading-relaxed">Shade cards issued with each bulk shipment for visual reference and buyer verification on arrival.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-neutral-900 text-white rounded-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4">ZERO_COLORANT_GUARANTEE</p>
                <p className="text-3xl font-bold text-white mb-4">Zero Dye.<br />Zero Print.<br />Zero Colour.</p>
                <p className="text-neutral-400 text-sm leading-relaxed">No colorant, reactive dye or pigment is applied at any stage of production. The white-on-white dobby stripe is a loom texture variation only — no colour applied.</p>
              </div>
              <div className="mt-6 border-t border-neutral-700 pt-5">
                <p className="text-neutral-500 text-xs">Compliance verified per OEKO-TEX Standard 100 test protocol. Certificate available on request.</p>
              </div>
            </motion.div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — BULK SUPPLY & PROGRAMMES — CORPORATE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-bulk" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Supply Programmes</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Bulk Supply &amp; Hajj Operator Programmes</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              MZ Global Trading coordinates Ihram supply for four distinct buyer categories. Each has different quantity requirements, certification priorities and packaging specifications.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {BULK_BUYERS.map((b, i) => (
              <motion.div
                key={b.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-7"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl font-black text-gray-200 leading-none">{b.num}</span>
                  <div>
                    <span className="text-2xl" aria-hidden="true">{b.icon}</span>
                    <h3 className="text-lg font-bold text-navy-900 mt-1">{b.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKET APPLICATIONS — ISOMETRIC UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Global Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Market Applications</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Ihram procurement occurs across every market with a significant Muslim population. Primary buyers vary by market: government-licenced hajj operators, national hajj authorities, Islamic retailers and diaspora community distributors.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MARKET_DATA.map((m, i) => (
              <motion.div
                key={m.region}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
                style={{
                  transform: "perspective(800px) rotateX(1deg)",
                  transformOrigin: "bottom center",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl" aria-hidden="true">{m.flag}</span>
                  <div>
                    <p className="font-bold text-navy-900">{m.region}</p>
                    <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{m.cert}</span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-500 mb-2">{m.buyers}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS — INFOGRAPHIC UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Quality Assurance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Quality Certifications</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Every Ihram supply programme can be matched with the certification profile required by your procurement specification — from GOTS organic certification to government tender-grade ISO 9001.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex items-center gap-6 bg-gray-50 rounded-2xl p-5 border border-gray-200"
              >
                <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center shrink-0" style={{ width: 100, height: 64 }}>
                  <Image src={c.img} alt={`${c.name} — ${c.full}`} width={80} height={50} className="object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-bold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.full}</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — EXPORT & PACKAGING — MATERIAL DESIGN (DARK)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Logistics</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Export &amp; Packaging</h2>
            <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">
              Packaging, incoterms and sea freight transit times for Ihram export from Pakistan.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">Packing Options</p>
              <div className="flex flex-col gap-3">
                {EXPORT_PACKING.map((e) => (
                  <div key={e.code} className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg shadow-black/20">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-9 h-9 rounded-lg bg-gold/20 text-gold text-xs font-bold flex items-center justify-center shrink-0">{e.code}</span>
                      <p className="font-semibold text-white">{e.name}</p>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">Incoterms Available</p>
              <div className="flex flex-col gap-3">
                {[
                  { term: "FOB", desc: "FOB Karachi or Port Qasim. Buyer arranges freight and insurance from Pakistani port." },
                  { term: "CIF", desc: "Cost, Insurance and Freight to destination port. MZ Global Trading arranges shipment." },
                  { term: "CFR", desc: "Cost and Freight. MZ Global Trading arranges freight; buyer arranges insurance." },
                ].map((inc) => (
                  <div key={inc.term} className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg shadow-black/20">
                    <p className="text-lg font-bold text-gold mb-1">{inc.term}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{inc.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">Sea Freight Transit</p>
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg shadow-black/20">
                {SEA_FREIGHT.map((s, i) => (
                  <div key={s.dest} className={`flex items-center justify-between px-5 py-3.5 ${i < SEA_FREIGHT.length - 1 ? "border-b border-white/10" : ""}`}>
                    <p className="text-white font-medium text-sm">{s.dest}</p>
                    <p className="text-gold font-bold text-sm">{s.days}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-amber-900/20 border border-amber-700/40 rounded-xl px-5 py-4">
            <p className="text-amber-400 text-xs leading-relaxed">
              <span className="font-semibold">Note:</span> Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
            </p>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — SCANDINAVIAN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Ethics &amp; Environment</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Sustainable Sourcing</h2>
            <p className="text-gray-500 leading-relaxed">
              Ihram is a sacred garment — and responsible sourcing is an extension of that intention. Our Ihram supply uses certified natural fibres, chemical-safe finishing and ethically audited factories throughout the production chain.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 flex flex-col gap-4"
              >
                <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                <div>
                  <p className="font-bold text-navy-900 mb-1.5">{s.title}</p>
                  <span className="text-xs font-semibold text-lime-700 bg-lime-100 px-2.5 py-1 rounded-full inline-block mb-3">{s.tag}</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — SOURCING PROCESS — TYPOGRAPHY-DRIVEN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">How We Work</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Sourcing Process</h2>
            <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">
              From specification to delivery — a structured six-step process designed for procurement managers, hajj operators and government buyers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden"
              >
                <span
                  className="absolute -right-4 -bottom-6 text-[7rem] font-black text-white/5 leading-none select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {p.num}
                </span>
                <p className="text-gold font-bold text-sm mb-3">{p.num}</p>
                <h3 className="text-lg font-bold text-white mb-3 relative z-10">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-amber-900/20 border border-amber-700/40 rounded-xl px-5 py-4">
            <p className="text-amber-400 text-xs leading-relaxed">
              <span className="font-semibold">Note:</span> Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
            </p>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Ihram Sourcing FAQ</h2>
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
          PAGE BOXES — HOME TEXTILE RANGE
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Explore Home Textile Range</p>
            <h2 className="text-2xl font-bold text-navy-900">More Home Textile Products</h2>
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
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-1.5">{card.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-3 transition-all duration-200">
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
              Ready to Source Ihram Sets<br />from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Ihram sets sourced from Pakistan&rsquo;s certified cotton weaving mills. Plain weave, terry and dobby stripe constructions. &#8805;90 CIE whiteness, OEKO-TEX Standard 100. Submit your specification &mdash; factory match and pricing returned within 3&ndash;5 working days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-9 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base"
              >
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-9 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
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
