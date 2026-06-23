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
    id: "french-terry",
    name: "French Terry",
    badge: "Best Seller",
    gsm: "300–400 GSM",
    hand: "Smooth face, looped interior — warmth without bulk",
    best: ["Premium Streetwear", "Fashion Retail", "Corporate Gifting"],
    markets: ["USA", "UK", "EU", "Australia"],
    decorations: ["Screen Print", "Embroidery", "Heat Transfer", "Sublimation"],
    detail:
      "French terry is the definitive construction for premium hoodies and crewneck sweatshirts. The smooth exterior face delivers sharp print registration and a refined retail appearance, while the looped cotton interior provides insulation and a plush hand-feel. At 340–380 GSM — the industry sweet-spot — it drapes cleanly, holds shape through laundering and accepts all major decoration methods. Enzyme-washed and garment-dyed finishes are in high demand for USA premium streetwear programmes.",
    spec: "100% combed cotton or 80/20 cotton-polyester. GSM 300–400. Enzyme wash and garment dye finishes available. Anti-shrink / compacted finish standard. GOTS certified cotton option.",
  },
  {
    id: "loop-back-fleece",
    name: "Loop Back Fleece",
    badge: "",
    gsm: "300–380 GSM",
    hand: "Unraised loop interior — firm, structured feel",
    best: ["Athletic", "Team Sportswear", "Performance Brands"],
    markets: ["USA", "Canada", "UK", "Middle East"],
    decorations: ["Screen Print", "Embroidery", "Heat Transfer"],
    detail:
      "Loop back fleece retains the unraised loop structure on the interior, giving a firmer, more structured hand compared to brushed variants. This makes it the preferred construction for team sportswear and athletic programmes where shape retention matters more than softness. Excellent print substrate — the tight face construction provides clear ink laydown for multi-colour athletic artwork.",
    spec: "80/20 cotton-polyester or 100% cotton. GSM 300–380. Unraised loop back interior. Anti-shrink / compacted finish. ISO 105 X12 wash-fastness compliance.",
  },
  {
    id: "brushed-fleece",
    name: "Brushed Fleece (3-end)",
    badge: "Winter Specialist",
    gsm: "340–420 GSM",
    hand: "Raised, ultra-soft nap — maximum warmth",
    best: ["Winter Retail", "Cold-Climate Markets", "Premium Basics"],
    markets: ["USA", "Canada", "N. Europe", "Russia/CIS"],
    decorations: ["Embroidery", "Screen Print (soft-hand)"],
    detail:
      "3-end brushed fleece is the heaviest and warmest fleece construction — the three-yarn structure creates greater density, and the brushed nap dramatically increases insulation and softness. Required for cold-climate markets: USA Great Plains and Northeast, Canada, Northern Europe and Russia/CIS. Embroidery is the preferred decoration; screen printing requires soft-hand inks at lower pressure to avoid crushing the nap.",
    spec: "3-end construction. 80/20 or 65/35 cotton-polyester. GSM 340–420. Machine-brushed nap finish. Anti-pill treatment recommended for retail programmes.",
  },
  {
    id: "polar-fleece",
    name: "Polar Fleece",
    badge: "",
    gsm: "200–300 GSM",
    hand: "100% polyester, pill-resistant, quick-dry",
    best: ["Outdoor & Adventure", "Performance Retail", "GRS Programmes"],
    markets: ["USA", "Canada", "Australia", "N. Europe"],
    decorations: ["Embroidery", "Heat Transfer"],
    detail:
      "Polar fleece is 100% polyester — lightweight, pill-resistant and quick-drying. It is the construction of choice for outdoor and adventure brands where moisture management and packability matter. GRS-certified recycled polyester variants are available, making this the default fleece for sustainability programmes. Sublimation printing is possible on lighter GSM polar fleece.",
    spec: "100% polyester, GRS recycled option available. GSM 200–300. Anti-pill finish standard. Moisture-wicking. Suitable for sublimation (light GSM only).",
  },
  {
    id: "air-layer",
    name: "Air Layer / Space Dye",
    badge: "Contemporary",
    gsm: "280–340 GSM",
    hand: "Spacer structure, dimensional texture — modern aesthetic",
    best: ["Contemporary Fashion", "EU Premium", "Athleisure"],
    markets: ["EU", "UK", "USA Premium"],
    decorations: ["Embroidery", "Minimal Screen Print"],
    detail:
      "Air layer and space dye constructions have grown rapidly in contemporary European fashion. The spacer structure creates a dimensional texture that reads as premium and modern. Space dye yarn produces an irregular heathered colour effect that is unique to each garment — popular in EU and UK premium basics and athleisure brands. Minimal decoration recommended to let the fabric's texture speak.",
    spec: "Cotton-polyester spacer or space dye yarn. GSM 280–340. No compacting — texture must be preserved. Embroidery preferred.",
  },
  {
    id: "bonded-fleece",
    name: "Bonded Fleece",
    badge: "Performance",
    gsm: "300–380 GSM",
    hand: "Laminated outer shell + fleece lining — structured, weather-ready",
    best: ["Performance Outerwear", "Outdoor Brands", "Corporate Jackets"],
    markets: ["USA", "Canada", "N. Europe"],
    decorations: ["Embroidery", "Woven Badge"],
    detail:
      "Bonded fleece laminates a woven or knitted outer shell to a polar fleece lining — producing a structured mid-layer jacket with light wind resistance and insulation. It occupies the outerwear end of the fleece spectrum, suitable for performance brands, outdoor retailers and corporate jacket programmes. DWR (durable water repellent) finish available on the outer shell.",
    spec: "Woven shell bonded to polar fleece lining. GSM 300–380 combined. DWR outer finish available. Embroidery preferred — heat transfer not recommended on bonded construction.",
  },
];

const FIT_PROFILES = [
  { code: "REG", name: "Regular Fit", ease: "+12–14 cm chest ease", market: "Menswear retail, team sportswear, USA mainstream" },
  { code: "SLM", name: "Slim Fit", ease: "+8–10 cm chest ease", market: "Fashion retail, contemporary menswear, UK/EU" },
  { code: "OVR", name: "Oversized / Relaxed", ease: "+20–28 cm chest ease", market: "Streetwear, youth fashion, EU and global DTC" },
  { code: "ATH", name: "Athletic Fit", ease: "Wide shoulder, tapered body", market: "Athletic brands, gym retail, performance programmes" },
];

const GSM_TIERS = [
  {
    gsm: "300–320",
    name: "Lightweight Fleece",
    season: "Spring / Autumn",
    market: "SE Asia · Australia · South America",
    pct: 45,
    featured: false,
    desc: "Lighter fleece for transitional seasons and warmer markets. Polar fleece and loop-back variants at this weight.",
    color: "bg-sky-400",
  },
  {
    gsm: "320–380",
    name: "Standard Fleece",
    season: "Year-Round",
    market: "USA · UK · EU retail baseline",
    pct: 90,
    featured: true,
    desc: "The commercial sweet-spot for hoodies and sweatshirts. French terry at 340–360 GSM covers the majority of retail orders.",
    color: "bg-gold",
  },
  {
    gsm: "380–420+",
    name: "Heavyweight Fleece",
    season: "Autumn / Winter",
    market: "USA · Canada · N. Europe · Russia",
    pct: 60,
    featured: false,
    desc: "3-end brushed fleece and bonded constructions for cold-climate markets. Maximum warmth and structure.",
    color: "bg-amber-600",
  },
];

const DECO_METHODS = [
  { code: "SCR", method: "Screen Print", best: "Multi-colour graphics, fashion programmes — all face constructions", compat: ["French Terry", "Loop Back Fleece"], note: "Soft-hand inks for brushed fleece" },
  { code: "EMB", method: "Embroidery", best: "Logo marks, chest and sleeve placement — all constructions including bonded", compat: ["All Constructions"], note: "Best default for bonded and brushed fleece" },
  { code: "HT", method: "Heat Transfer", best: "Athletic numbers and text — French terry and loop back only", compat: ["French Terry", "Loop Back"], note: "Not for brushed or bonded fleece" },
  { code: "SUB", method: "Sublimation", best: "All-over photographic graphics — polar fleece light GSM only", compat: ["Polar Fleece (light)"], note: "Not suitable for cotton constructions" },
  { code: "APP", method: "Appliqué", best: "Dimensional logo patches and collegiate graphics", compat: ["French Terry", "Loop Back"], note: "Woven or felt patch bonded and stitched" },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Standard / PMS Matched", note: "Full PMS colour range. Lab dip approval before bulk.", swatches: ["bg-navy-900", "bg-blue-600", "bg-red-500", "bg-emerald-600", "bg-stone-700"] },
  { name: "Garment Dye", subtitle: "Vintage / Washed Tones", note: "Popular USA streetwear. Enzyme washed. Organic cotton compatible.", swatches: ["bg-stone-300", "bg-stone-400", "bg-stone-500", "bg-stone-600", "bg-slate-500"] },
  { name: "Space Dye / Heather", subtitle: "Multi-Tone Yarn Effect", note: "Unique per garment. EU and UK contemporary demand growing.", swatches: ["bg-slate-400", "bg-slate-500", "bg-indigo-300", "bg-gray-400", "bg-zinc-500"] },
  { name: "Organic / Low-Impact", subtitle: "GOTS Certified", note: "OEKO-TEX certified process chemicals. No restricted substances.", swatches: ["bg-green-200", "bg-green-400", "bg-lime-300", "bg-teal-300", "bg-emerald-300"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic fibre sourcing and processing — required for organic cotton claims", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — standard EU/UK import requirement", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Labour standards and worker welfare independently audited", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data sharing", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled content verification — essential for polar fleece GRS programmes", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Improved cotton farming and sustainability metrics", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "Most demanding social certification — worker rights and conditions", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency in textile supply chain", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Fleece Construction to Spec", desc: "French terry, loop-back, brushed fleece or bonded — sourced from certified Pakistan mills to exact GSM and blend specification." },
  { num: "02", title: "Hood & Cuff Engineering", desc: "Single or double-lined hoods, adjustable drawcords, ribbed cuffs and waistbands — all custom engineered to your brief." },
  { num: "03", title: "Pocket Configuration", desc: "Kangaroo pocket, front zip pockets, side seam pockets — any configuration produced to your pattern and specification." },
  { num: "04", title: "Zip & Hardware", desc: "YKK or equivalent zips, metal grommets, drawcord ends — hardware spec and colour matched to your brand guidelines." },
  { num: "05", title: "Label & Brand Identity", desc: "Woven neck labels, care labels, hem labels, hang tags — fully customised to your brand identity." },
  { num: "06", title: "Retail & Set Packaging", desc: "Individual polybag, hanger pack, gift box, co-ord set pack (hoodie + sweatpants) — tailored to your retail fulfilment." },
];

const SECTORS = [
  { abbr: "SW", name: "Streetwear", detail: "USA, UK, EU and global DTC streetwear brands — French terry and garment dye specialist", market: "USA · UK · EU" },
  { abbr: "AT", name: "Athletic & Sport", detail: "Team sportswear, gym retail and performance brands — loop-back and bonded fleece", market: "USA · Canada · Australia" },
  { abbr: "CG", name: "Corporate Gifting", detail: "Branded corporate fleece — embroidered logo programmes for staff and client gifting", market: "Worldwide" },
  { abbr: "OD", name: "Outdoor & Adventure", detail: "Polar fleece and bonded mid-layers for outdoor and adventure retail", market: "USA · Canada · N. EU" },
  { abbr: "PR", name: "Premium Basics", detail: "Direct-to-consumer premium basics brands targeting higher price points", market: "USA · EU · Australia" },
  { abbr: "UF", name: "Uniform & Workwear", detail: "Staff uniform hoodies and corporate workwear fleece programmes", market: "Global" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight to your port. Buyer arranges own marine insurance." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory gate. Lowest quoted price." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard bulk export" },
  { icon: "🪝", label: "Hanger + Polybag", note: "Retail-ready on arrival" },
  { icon: "👕", label: "Co-ord Set Pack", note: "Hoodie + sweatpants together" },
  { icon: "🎁", label: "Gift Box", note: "Premium / corporate gifting" },
  { icon: "🔒", label: "Vacuum Packed", note: "Space-efficient shipping" },
  { icon: "✏️", label: "Custom Packaging", note: "To your brand brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Mill shortlist, fleece construction pricing and availability confirmed", color: "bg-gold" },
  { stage: "Sample Production", days: "15–25", desc: "Pre-production samples to specification including hood and cuff engineering", color: "bg-blue-500" },
  { stage: "Bulk Production", days: "45–70", desc: "From confirmed PO and approved pre-production sample", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection before vessel loading", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "20–30", desc: "FCL/LCL from Karachi or Port Qasim", color: "bg-teal-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton French terry and loop-back fleece. Traceable from farm to finished garment.", tag: "GOTS" },
  { icon: "♻️", title: "Recycled Polyester", desc: "GRS-certified recycled polyester for polar fleece programmes. rPET from post-consumer plastic bottles.", tag: "GRS" },
  { icon: "💧", title: "Water Efficiency", desc: "Enzyme washing reduces water consumption versus conventional stone washing processes.", tag: "Process" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 factory audits. Worker welfare, safety and fair wage compliance verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "Reactive and fibre-reactive dyeing with OEKO-TEX certified chemicals. No azo dyes, no restricted substances.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags and FSC-certified paper hangtags available on request for any programme.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share fleece construction, GSM, hood/pocket configuration, decoration, size range, quantity and destination via our RFQ form." },
  { num: "02", title: "Mill Matching", short: "Matching", desc: "We shortlist 2–3 Pakistan fleece mills whose construction capability, certifications and capacity align with your programme requirements. Pricing within 3–5 days." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Pre-production samples including hood construction, cuff and waistband engineered to specification. 15–25 days from spec lock." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review construction, weight, decoration, label, zip hardware and fit. Revise before purchase order placement." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Fabric cut and production commences. Duration depends on construction, quantity and factory scheduling." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection, packing and loading. FCL or LCL from Karachi or Port Qasim." },
];

const FAQS = [
  {
    q: "What is the difference between French terry and loop-back fleece?",
    a: "French terry has a smooth exterior face with an uncut looped interior — it delivers a refined appearance suitable for premium retail and fashion programmes. Loop-back fleece also has an uncut looped interior but is typically woven with a slightly different structure giving a firmer, more athletic hand-feel. French terry is the commercial default for fashion hoodies; loop-back is preferred for team sportswear and athletic programmes. Neither is raised or brushed — that is brushed fleece (see below).",
  },
  {
    q: "What GSM do you recommend for a retail hoodie programme targeting USA and UK markets?",
    a: "For mainstream USA and UK retail hoodies, 340–360 GSM French terry is the industry standard. This weight delivers the hand-feel customers expect at mid-market price points, drapes cleanly and holds shape through repeated laundering. Heavier 380–420 GSM brushed fleece is better suited to premium positioning or cold-climate markets (US Northeast, Canada, Northern Europe). Lighter 300–320 GSM is suitable for transitional season or year-round programmes in warmer regions.",
  },
  {
    q: "Can you produce matching sweatshirt and sweatpants co-ord sets from the same production run?",
    a: "Yes — co-ord set production from the same fabric lot is a standard programme. Fabric from the same dye lot ensures colour consistency between tops and bottoms. Co-ord sets are available as matched SKUs with individual polybag, gift box or combined set packaging. Sweatpants specifications are managed separately — your RFQ can request both items together.",
  },
  {
    q: "Which decoration method works best on heavyweight brushed fleece hoodies?",
    a: "Embroidery is the clear first choice for brushed fleece. The raised nap provides a firm base for stitch registration and the embroidery thread complements the texture beautifully. Screen printing requires soft-hand or discharge inks applied at lower squeegee pressure to avoid crushing the nap — additional print passes may be needed for coverage. Heat transfer vinyl is not recommended on brushed or raised fleece. For performance fleece, sublimation is only suitable on light-GSM polar fleece (100% polyester).",
  },
  {
    q: "Do your fleece fabrics meet anti-pill requirements for European retail buyers?",
    a: "Yes. Anti-pill finish is standard specification on brushed fleece and polar fleece programmes targeting European retail. The treatment reduces surface fibre shedding and pilling under friction — compliance is tested to EN ISO 12945-2 (Martindale method) or equivalent. OEKO-TEX Standard 100 certification covers chemical compliance of the anti-pill treatment itself, which is required for EU and UK import.",
  },
  {
    q: "What are indicative lead times from approved sample to shipment for a hoodie programme?",
    a: "⚠ All timelines are indicative and subject to construction complexity, order quantities, factory scheduling and seasonal demand. As a general guide: bulk production runs 45–70 days from confirmed PO and approved pre-production sample; sea freight from Karachi adds 20–30 days to European and US ports depending on routing. Total end-to-end from RFQ to destination port is typically 90–130 days. Plan lead times with your sourcing team before committing to retail sell-in dates.",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function HoodiesContent() {
  const [activeConstruction, setActiveConstruction] = useState("french-terry");
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
            src="/images/hero/hero-sweatshirts-hoodies.webp"
            fill
            alt="Pakistan sweatshirt and hoodie manufacturer — OEM French terry and fleece hoodies for sportswear and retail brands in USA, UK and Europe"
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
              <Link href="/apparel/knittedgarments/" className="hover:text-gold transition-colors">Knitted Garments</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Sweatshirts & Hoodies</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Mid-Layer Knitwear Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Sweatshirt &amp; Hoodie
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
              MZ Global Trading connects international brands with Pakistan&rsquo;s certified
              fleece mills. French terry, loop-back fleece, brushed fleece and bonded fleece
              constructions. 300&ndash;420 GSM. GOTS, OEKO-TEX and GRS certified. FOB&nbsp;/ CIF export.
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
                Sweatshirt &amp; Hoodie Supply — Pakistan Fleece Knitwear
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Mid-Layer Fleece Engineering from Certified Pakistan Mills
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Six distinct fleece and terry constructions — from 300 GSM loop-back to 420 GSM 3-end brushed fleece —
                sourced through MZ Global Trading&rsquo;s vetted Pakistan factory network. Every programme matched to the
                right mill, the right construction and the right certification.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "6", label: "Fleece & Terry Constructions" },
                { val: "300–420", label: "GSM Range" },
                { val: "50+", label: "Vetted Factories" },
                { val: "95%", label: "On-Time Delivery" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
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
            <p className="text-gray-500 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1: Constructions + Fit Profiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Constructions</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fleece &amp; Terry Builds</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-amber-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.gsm}</p>
                    <p className="text-xs text-amber-600 mt-1 leading-tight">{c.best[0]}</p>
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
              className="bg-rose-50 border border-rose-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fit Profiles &amp; Sizing</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {FIT_PROFILES.map((f) => (
                  <div key={f.code} className="bg-white rounded-xl px-4 py-3 border border-rose-100 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {f.code}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{f.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{f.ease}</p>
                      <p className="text-xs text-rose-600 mt-0.5">{f.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-fits" label="Explore Fit Profiles" />
            </motion.div>
          </div>

          {/* Row 2: GSM + Decoration + Colours + OEM */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Selection</h3>
              <div className="flex flex-col gap-3 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="bg-white rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-navy-900">{t.gsm}</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] font-semibold text-slate-500">{t.season}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{t.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View Weight Guide" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🖨️</span>
              <p className="text-fuchsia-600 text-xs font-semibold tracking-[0.2em] uppercase">Decoration</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Decoration Methods</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-fuchsia-50">
                    <span className="w-6 h-6 rounded bg-fuchsia-100 text-fuchsia-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {d.code}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{d.method}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{d.compat.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Explore Decorations" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-indigo-950 border border-indigo-900 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-white leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-3 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <p className="text-xs font-semibold text-white mb-1.5">{d.name}</p>
                    <div className="flex gap-1.5 mb-1">
                      {d.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${s}`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-500">{d.subtitle}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollToId("section-colors")}
                className="self-start inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-yellow-300 transition-colors mt-auto pt-4"
              >
                Explore Colors <span aria-hidden="true">→</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
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

          {/* Row 3: Markets + Certifications + Export */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-sky-50 border border-sky-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-sky-100">
                    <p className="text-xs font-bold text-sky-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Markets" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-purple-50 border border-purple-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Quality Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-xl border border-purple-100 flex items-center justify-center p-2" style={{ height: 56 }}>
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
                      <p className="text-[10px] text-gray-500">{e.port}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* Row 4: Sustainability + Process */}
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
              className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-orange-200 text-orange-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
                    <p className="text-xs font-semibold text-navy-900">{p.short}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-500 mt-1 pl-8">+ 2 more steps</p>
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
            <Link href="/knowledge/fleece-fabric-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Fleece Fabric Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Polar, French terry and brushed fleece — GSM, fibre and construction guide for buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link href="/guides/hoodie-sweatshirt-sourcing-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Hoodie &amp; Sweatshirt Sourcing Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">GSM, lining, custom print options and certification for international buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guide →</span>
            </Link>
            <Link href="/downloads/hoodie-spec-template/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Hoodie &amp; Sweatshirt Spec Template</p>
              <p className="text-xs text-gray-500 leading-relaxed">Fill-in specification covering construction, GSM, pockets, lining and certifications.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Template →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Sweatshirts &amp; Hoodies?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, GSM and decoration — RFQ takes 3 minutes. Mill match returned within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — CONSTRUCTIONS — BRUTALIST UI + SCORECARD
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-navy-900 pl-6 mb-12">
            <p className="font-mono text-[11px] text-gray-500 uppercase tracking-[0.25em] mb-2">FABRIC CONSTRUCTION SCORECARDS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Sweatshirt &amp; Hoodie Fleece Constructions</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Six distinct fleece and terry builds for Pakistan OEM production — each with different weight range, market position and decoration compatibility.
            </p>
          </div>

          {/* Construction tabs */}
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeConstruction === c.id}
                onClick={() => setActiveConstruction(c.id)}
                className={`relative px-5 py-2.5 rounded-none text-sm font-bold border-2 transition-all uppercase tracking-wider ${
                  activeConstruction === c.id
                    ? "bg-navy-900 text-gold border-navy-900 shadow-[4px_4px_0_#D4A017]"
                    : "bg-white text-navy-900 border-navy-900 hover:shadow-[4px_4px_0_#0D1B2A]"
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
              className="grid lg:grid-cols-3 gap-0 border-2 border-navy-900 shadow-[6px_6px_0_#0D1B2A]"
            >
              <div className="lg:col-span-2 p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-navy-900">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-navy-900 uppercase tracking-wide">{ac.name}</h3>
                  {ac.badge && (
                    <span className="text-xs font-bold text-white bg-navy-900 px-3 py-1 uppercase tracking-widest">{ac.badge}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-0 mb-6 border border-navy-900">
                  <div className="p-4 border-r border-navy-900">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">GSM RANGE</p>
                    <p className="text-2xl font-bold text-gold">{ac.gsm}</p>
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">HAND FEEL</p>
                    <p className="text-sm text-navy-900 font-medium">{ac.hand}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{ac.detail}</p>
                <div className="border-2 border-navy-900 p-4 bg-amber-50">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">TECHNICAL SPECIFICATION</p>
                  <p className="text-sm text-gray-700">{ac.spec}</p>
                </div>
              </div>
              <div className="flex flex-col divide-y-2 divide-navy-900">
                <div className="p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">BEST FOR</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.best.map((b) => (
                      <div key={b} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold shrink-0" aria-hidden="true" />
                        <span className="text-sm font-semibold text-navy-900">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">KEY MARKETS</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => (
                      <span key={m} className="text-xs font-bold text-navy-900 border-2 border-navy-900 px-2 py-1">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">DECORATION</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.decorations.map((d) => (
                      <div key={d} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
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
          SECTION 2 — FIT PROFILES — RETAIL UI + CARD LAYOUT
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-fits" className="bg-rose-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sweatshirt &amp; Hoodie Sizing</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Fit Profiles for Every Market</h2>
              <p className="text-gray-500 mt-3 max-w-xl leading-relaxed">
                Each fit silhouette targets a distinct buyer demographic — selecting the right fit is as critical as the fleece construction itself.
              </p>
            </div>
            <div className="flex gap-6 shrink-0 text-center">
              {[["XS–3XL", "Standard range"], ["Plus sizes", "Available"], ["Custom", "Spec on request"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-lg font-bold text-navy-900">{v}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FIT_PROFILES.map((f, i) => (
              <motion.div
                key={f.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border-2 border-rose-100 hover:border-rose-300 hover:shadow-lg transition-all flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 text-sm font-bold flex items-center justify-center">{f.code}</div>
                <div>
                  <p className="text-lg font-bold text-navy-900">{f.name}</p>
                  <p className="text-sm font-semibold text-rose-600 mt-1">{f.ease}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{f.market}</p>
                <div className="pt-3 border-t border-rose-100">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Size Standards</p>
                  <p className="text-xs text-navy-900 font-semibold mt-1">US / UK / EU</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — GSM WEIGHT GUIDE — MINIMAL UI + BAR CHART
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-gsm" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Weight Selection — Sweatshirts &amp; Hoodies</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Choosing GSM for Your Fleece Programme</h2>
            <p className="text-gray-500 leading-relaxed">
              GSM determines season positioning, warmth rating, decoration compatibility and retail price tier. The range is wide — 300 GSM to 420+ GSM — and construction choice is as important as the number.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {[
              { label: "GSM Range", val: "300–420+", sub: "Full construction range" },
              { label: "Most Ordered", val: "340–360", sub: "French terry, year-round" },
              { label: "Heavyweight Min.", val: "380 GSM", sub: "Brushed fleece, cold climate" },
              { label: "Constructions", val: "6", sub: "Terry to bonded fleece" },
            ].map((m) => (
              <div key={m.label} className="border border-gray-100 rounded-2xl p-5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{m.label}</p>
                <p className="text-2xl font-bold text-navy-900">{m.val}</p>
                <p className="text-xs text-gray-500 mt-1">{m.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {GSM_TIERS.map((tier) => (
              <div key={tier.gsm} className={`border-l-4 pl-6 ${tier.featured ? "border-gold" : "border-gray-200"}`}>
                {tier.featured && (
                  <span className="inline-block mb-3 text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>
                )}
                <p className={`text-3xl font-bold mb-1 ${tier.featured ? "text-gold" : "text-navy-900"}`}>{tier.gsm}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{tier.name}</p>
                <p className="text-sm font-semibold text-navy-900 mb-3">{tier.season}</p>
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${tier.featured ? "bg-gold" : "bg-gray-300"}`} style={{ width: `${tier.pct}%` }} aria-hidden="true" />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">{tier.market}</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — DECORATION — COLLAGE UI + TILE LAYOUT
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-decoration" className="bg-fuchsia-50 py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-fuchsia-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sweatshirt &amp; Hoodie Decoration</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Decoration Methods for Fleece Garments</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Fleece construction determines which decoration methods are technically viable. Match your artwork type and brand brief to the right technique.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DECO_METHODS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 16, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-fuchsia-100 shadow-xs hover:shadow-md transition-all"
                style={{ transform: `rotate(${i % 3 === 0 ? "-0.5deg" : i % 3 === 1 ? "0.5deg" : "0deg"})` }}
              >
                <div className="w-10 h-10 rounded-xl bg-fuchsia-100 text-fuchsia-700 text-sm font-bold flex items-center justify-center mb-4">
                  {d.code}
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-2">{d.method}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{d.best}</p>
                <div className="border-t border-fuchsia-100 pt-3">
                  <p className="text-[10px] font-semibold text-fuchsia-600 uppercase tracking-wider mb-1">Compatible With</p>
                  <p className="text-xs text-gray-600">{d.compat.join(" · ")}</p>
                  <p className="text-[10px] text-amber-600 mt-2 font-medium">⚠ {d.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOURS — DARK MODE UI + SWATCH GRID
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-colors" className="bg-indigo-950 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour &amp; Dye Programs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Fleece Colour &amp; Dye Programme Options</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Full PMS-matched reactive dyeing, vintage garment dye, contemporary space dye and GOTS-certified organic low-impact options. Lab dip approval before bulk production.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {DYE_OPTIONS.map((d) => (
              <div key={d.name} className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                <p className="text-gold font-bold text-base mb-1">{d.name}</p>
                <p className="text-xs text-gray-500 mb-4">{d.subtitle}</p>
                <div className="flex gap-3 mb-4">
                  {d.swatches.map((s, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${s} border-2 border-white/20`} aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{d.note}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Standard Colour Range</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
              {[
                "bg-white", "bg-gray-100", "bg-stone-200", "bg-stone-400",
                "bg-gray-500", "bg-slate-700", "bg-navy-900", "bg-black",
                "bg-red-600", "bg-rose-500", "bg-orange-500", "bg-amber-400",
                "bg-yellow-300", "bg-lime-400", "bg-green-600", "bg-emerald-500",
                "bg-teal-500", "bg-cyan-400", "bg-sky-500", "bg-blue-600",
                "bg-indigo-600", "bg-violet-600", "bg-purple-600", "bg-fuchsia-500",
              ].map((c, i) => (
                <div key={i} className={`${c} rounded-lg aspect-square border border-white/10`} aria-hidden="true" />
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-3">Full PMS-matched reactive dyeing — lab dip approval required before bulk production.</p>
          </div>
          <div className="flex justify-center mt-16">
            <button
              onClick={() => scrollToId("bento-grid")}
              className="group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold border border-gold/60 text-gold hover:bg-gold hover:text-navy-900 transition-all duration-300"
              style={{ animation: "btt-pulse 2.2s ease-out infinite" }}
            >
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} aria-hidden="true">↑</motion.span>
              Move back to top
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM — MATERIAL DESIGN + COMPARISON TABLE
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM Custom Development</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">OEM &amp; Custom Sweatshirt Programme Services</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Every element of your sweatshirt or hoodie programme engineered to specification — from fleece construction and hood design through to zip hardware, labelling and retail packaging.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {OEM_FEATURES.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 text-sm font-bold flex items-center justify-center mb-4">
                  {f.num}
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Comparison table: OEM tiers */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[520px]">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Programme Comparison</p>
              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="p-4">Feature</div>
                  <div className="p-4 text-center">Standard</div>
                  <div className="p-4 text-center bg-gold/10">Premium</div>
                  <div className="p-4 text-center">Full Custom</div>
                </div>
                {[
                  ["Fleece construction", "3 options", "6 options", "Bespoke spec"],
                  ["Hood & cuff engineering", "Standard", "Custom pattern", "Fully bespoke"],
                  ["Decoration", "Embroidery / screen", "All methods", "All + special FX"],
                  ["Zipper & hardware", "Standard", "Branded", "Fully custom"],
                  ["Label & hangtag", "Care label", "Brand woven label", "Full brand pack"],
                  ["Packaging", "Polybag", "Hanger + polybag", "Custom retail pack"],
                ].map(([feat, std, prem, full]) => (
                  <div key={feat} className="grid grid-cols-4 border-b border-gray-100 last:border-0 text-sm">
                    <div className="p-4 font-medium text-navy-900">{feat}</div>
                    <div className="p-4 text-center text-gray-500">{std}</div>
                    <div className="p-4 text-center bg-gold/5 font-semibold text-navy-900">{prem}</div>
                    <div className="p-4 text-center text-gray-500">{full}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKETS — TYPOGRAPHY-DRIVEN UI + REGION CARDS
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-sky-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Global Markets</p>
            <h2 className="text-5xl sm:text-6xl font-bold text-navy-900 leading-[1.0] mb-6">
              Hoodie &amp; Sweatshirt<br />
              <span className="text-gold">Export Markets</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
              Pakistan&rsquo;s mid-layer knitwear reaches buyers across six continents. French terry dominates
              fashion and streetwear markets; brushed fleece moves into cold-climate destinations; polar fleece
              powers outdoor and performance brands.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-sky-100 hover:border-gold hover:shadow-md transition-all"
              >
                <p className="text-4xl font-bold text-sky-100 mb-2" aria-hidden="true">{s.abbr}</p>
                <h3 className="text-lg font-bold text-navy-900 mb-2 -mt-4">{s.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.detail}</p>
                <p className="text-xs font-semibold text-sky-600 border-t border-sky-50 pt-3">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-8 border border-sky-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">Key Export Destinations</p>
            <div className="flex flex-wrap gap-3">
              {["USA", "Canada", "UK", "Germany", "France", "Netherlands", "Sweden", "Norway", "Australia", "UAE", "Saudi Arabia", "Japan", "South Korea", "Brazil", "South Africa"].map((m) => (
                <span key={m} className="text-sm font-semibold text-navy-900 bg-sky-50 border border-sky-100 px-4 py-2 rounded-full hover:border-gold transition-colors">
                  {m}
                </span>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS — GLASSMORPHISM + DONUT CHART (CSS)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-purple-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality &amp; Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Fleece Garment Certifications &amp; Standards</h2>
            <p className="text-gray-300 mt-3 max-w-2xl leading-relaxed">
              Every certification actively maintained and production documentation supplied as standard. OEKO-TEX and GOTS are independently verified — not self-declared.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((c) => (
                <div key={c.name} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors flex gap-4 items-start">
                  <div className="bg-white rounded-xl p-2 shrink-0" style={{ width: 64, height: 40 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={56} height={32} className="object-contain w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-white font-bold text-sm">{c.name}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.tier === "Premium" ? "bg-gold text-navy-900" : c.tier === "Optional" ? "bg-white/20 text-gray-300" : "bg-white/30 text-white"}`}>
                        {c.tier}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Certification Mix</p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Standard (mandatory)", count: 5, color: "bg-gold" },
                    { label: "Premium (buyer-specified)", count: 2, color: "bg-purple-300" },
                    { label: "Optional (on request)", count: 3, color: "bg-white/30" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs text-gray-300 mb-1">
                        <span>{item.label}</span>
                        <span className="font-bold text-white">{item.count}</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.count / 10) * 100}%` }} aria-hidden="true" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex-1">
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">10+ Certifications</p>
                <p className="text-white text-lg font-bold mb-3">All documentation supplied as standard</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  Certificate copies, audit reports and test results provided with every shipment. Active certifications, not expired documents.
                </p>
                <Link
                  href="/qualitycompliance/certifications/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-yellow-300 transition-colors"
                >
                  View full compliance page <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <button
              onClick={() => scrollToId("bento-grid")}
              className="group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold border border-gold/60 text-gold hover:bg-gold hover:text-navy-900 transition-all duration-300"
              style={{ animation: "btt-pulse 2.2s ease-out infinite" }}
            >
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} aria-hidden="true">↑</motion.span>
              Move back to top
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — EXPORT & PACKAGING — INDUSTRIAL UI + TIMELINE
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-teal-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-teal-300 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export &amp; Packaging</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Fleece Export Terms &amp; Packaging Options</h2>
            <p className="text-gray-300 mt-3 max-w-2xl leading-relaxed">
              FOB Karachi is the standard export term — buyers nominate their freight forwarder and control ocean freight. CIF and CFR available for buyers who prefer landed cost pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
            <div>
              <p className="text-teal-300 text-xs font-semibold tracking-[0.2em] uppercase mb-5">Incoterms</p>
              <div className="flex flex-col gap-4">
                {EXPORT_TERMS.map((e, i) => (
                  <motion.div
                    key={e.term}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex gap-4 items-start bg-white/10 border border-white/10 rounded-xl p-5"
                  >
                    <span className="w-12 h-12 rounded-xl bg-teal-700 text-teal-200 text-sm font-bold flex items-center justify-center shrink-0">{e.term}</span>
                    <div>
                      <p className="text-white font-bold">{e.full}</p>
                      <p className="text-teal-300 text-xs mt-0.5 mb-2">{e.port}</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{e.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-teal-300 text-xs font-semibold tracking-[0.2em] uppercase mb-5">Packing Options</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {PACK_OPTIONS.map((p) => (
                  <div key={p.label} className="bg-white/10 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-xl" aria-hidden="true">{p.icon}</span>
                    <div>
                      <p className="text-white text-sm font-semibold">{p.label}</p>
                      <p className="text-teal-300 text-xs">{p.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="text-teal-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Indicative Lead Time Timeline</p>
                <div className="flex flex-col gap-3">
                  {LEAD_STAGES.map((s) => (
                    <div key={s.stage} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${s.color}`} aria-hidden="true" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-white text-xs font-semibold">{s.stage}</p>
                          <p className="text-teal-300 text-xs font-bold">{s.days} days</p>
                        </div>
                        <p className="text-gray-500 text-[10px] mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-amber-900/40 border border-amber-700/40 rounded-lg">
                  <p className="text-amber-300 text-xs">⚠ All timelines are indicative. Actual durations depend on construction complexity, order quantities and factory scheduling.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => scrollToId("bento-grid")}
              className="group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold border border-gold/60 text-gold hover:bg-gold hover:text-navy-900 transition-all duration-300"
              style={{ animation: "btt-pulse 2.2s ease-out infinite" }}
            >
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} aria-hidden="true">↑</motion.span>
              Move back to top
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — FLAT DESIGN UI + BULLET LIST
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-lime-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-lime-700 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainable Fleece Sourcing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Sustainability in Sweatshirt &amp; Hoodie Production</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              GOTS organic cotton French terry, GRS-certified recycled polyester polar fleece and OEKO-TEX independently verified chemical compliance — all available on request.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-lime-100 flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-lime-100 flex items-center justify-center text-2xl" aria-hidden="true">
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">{s.title}</h3>
                  <span className="text-[10px] font-semibold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full">{s.tag}</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-1.5 shrink-0" aria-hidden="true" />
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — PROCESS — MODULAR UI + WORKFLOW DIAGRAM
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-orange-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Pakistan Fleece Sourcing Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">How the Sourcing Process Works</h2>
            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Six defined stages from RFQ submission to shipment. Each stage has a clear deliverable and documented output — no ambiguity, no black boxes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-orange-100 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 text-sm font-bold flex items-center justify-center shrink-0">{p.num}</span>
                  <div className="h-px flex-1 bg-orange-100" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-navy-900">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{p.desc}</p>
                <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider">{p.short}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
            <span className="text-amber-500 text-lg shrink-0" aria-hidden="true">⚠</span>
            <p className="text-sm text-amber-700 leading-relaxed">
              All lead times shown are indicative. Actual durations depend on construction complexity, order quantities, factory scheduling and seasonal demand peaks. Confirm precise timelines with your sourcing contact before committing to retail sell-in dates.
            </p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Sweatshirt &amp; Hoodie Sourcing FAQ</h2>
          </div>
          <div className="flex flex-col divide-y divide-gray-100">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-start gap-4 text-left group"
                  aria-expanded={faqOpen === i}
                >
                  <span className="relative shrink-0 mt-0.5">
                    {faqOpen !== i && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                      </span>
                    )}
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${faqOpen === i ? "border-gold bg-gold text-navy-900" : "border-gray-300 text-gray-500 group-hover:border-gold"}`}>
                      {faqOpen === i ? "−" : "+"}
                    </span>
                  </span>
                  <span className="font-semibold text-navy-900 group-hover:text-gold transition-colors text-sm sm:text-base">
                    {faq.q}
                  </span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-500 text-sm leading-relaxed mt-4 pl-10">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SAME-TIER PAGE BOXES
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 lg:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Knitted Garments</p>
            <h2 className="text-2xl font-bold text-navy-900">More Knitted Garments</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: "T-Shirts", desc: "Seven constructions — 160 to 280 GSM. Single jersey, interlock, piqué, rib, waffle, mesh.", href: "/apparel/knittedgarments/tshirts/", img: "/images/hero/hero-t-shirts.webp", alt: "Pakistan t-shirt manufacturer — OEM single jersey and piqué tees for retail and fashion brands in USA, UK and Europe" },
              { name: "Polo Shirts", desc: "Classic piqué, mini piqué and jersey polo. Corporate, golf and hospitality programmes.", href: "/apparel/knittedgarments/poloshirts/", img: "/images/hero/hero-polo-shirts.webp", alt: "Pakistan polo shirt manufacturer — OEM piqué and performance polo for corporate and sports brands worldwide" },
              { name: "Henley Shirts", desc: "Four constructions — single jersey to waffle knit. Casual and workwear programmes.", href: "/apparel/knittedgarments/henleyshirts/", img: "/images/hero/hero-henley-shirts.webp", alt: "Pakistan henley shirt manufacturer — OEM single jersey and waffle knit henleys for casual and workwear programmes" },
              { name: "Sweatpants & Joggers", desc: "French terry and brushed fleece. Coordinated set and standalone programmes.", href: "/apparel/knittedgarments/sweatpantsjoggers/", img: "/images/hero/hero-sweatpants-joggers.webp", alt: "Pakistan sweatpants manufacturer — OEM French terry and brushed fleece bottoms for activewear programmes" },
              { name: "Tank Tops", desc: "Single jersey, rib and mesh. Athletic and casual lifestyle programmes.", href: "/apparel/knittedgarments/tanktops/", img: "/images/hero/hero-tank-tops.webp", alt: "Pakistan tank top manufacturer — OEM single jersey, rib and mesh tanks for athletic and lifestyle brands" },
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
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Source Sweatshirts &amp; Hoodies from Pakistan</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Ready to Start Your Fleece Programme?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              French terry crews, pullover hoodies, zip-front hoodies — any fleece construction, any GSM, any decoration.
              Streetwear, corporate gifting, sportswear, performance mid-layer. Submit the RFQ; receive a certified
              Pakistan fleece mill match with costed quotation within 3–5 working days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base"
              >
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
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
