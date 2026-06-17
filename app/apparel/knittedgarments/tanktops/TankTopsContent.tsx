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
    name: "Single Jersey",
    badge: "Most Versatile",
    gsm: "140–180 GSM",
    hand: "Smooth face, natural 4-way stretch, fine texture",
    best: ["Fashion Retail", "Lifestyle Programmes", "Warm-Climate Markets"],
    markets: ["USA", "EU", "Australia", "Middle East"],
    decorations: ["Screen Print", "Embroidery", "DTG", "Heat Transfer"],
    detail: "Single jersey is the workhorse construction for tank tops — it delivers smooth handle, excellent stretch and recovery, and superior print fidelity. Combed cotton versions produce a tighter surface for screen print and DTG programmes. The lightest weights (140–150 GSM) suit tropical and summer markets; 160–180 GSM crosses into year-round fashion retail.",
    spec: "100% combed cotton or cotton-polyester blend. GSM 140–180. Reactive dyed, full PMS range. GOTS and OEKO-TEX options available.",
    icon: "🧵",
    color: "sky",
  },
  {
    id: "rib-1x1",
    name: "Rib (1×1)",
    badge: "Performance Favourite",
    gsm: "160–220 GSM",
    hand: "Strong vertical ribbing, close fit, exceptional stretch recovery",
    best: ["Athletic & Gym", "Women's Athleisure", "Premium Basics"],
    markets: ["USA", "UK", "EU", "Australia"],
    decorations: ["Embroidery", "Screen Print (flat-bed)"],
    detail: "Rib 1×1 is the construction of choice for fitted athletic vests and women's athleisure tanks. The vertical rib structure conforms closely to body contours, providing exceptional stretch and recovery with a premium, structured hand feel. Higher GSM delivers a body-conscious silhouette — the gym wear and boutique fitness market standard.",
    spec: "100% cotton ring-spun or cotton/elastane (5–8%). GSM 160–220. Excellent recovery. Flat-lock seam finish available for next-to-skin comfort.",
    icon: "📏",
    color: "pink",
  },
  {
    id: "mesh-eyelet",
    name: "Mesh / Eyelet",
    badge: "Athletic Ventilation",
    gsm: "130–160 GSM",
    hand: "Open structure, maximum airflow, lightweight drape",
    best: ["Athletic Performance", "Running", "Outdoor Training"],
    markets: ["USA", "Australia", "Middle East", "SE Asia"],
    decorations: ["Heat Transfer", "Sublimation", "Screen Print (specialty ink)"],
    detail: "Mesh and eyelet tank tops are engineered for maximum breathability — the open-cell structure maximises airflow for running, training and high-intensity sport. The lightest construction in the category at 130–160 GSM. Sublimation printing delivers all-over design capability on polyester mesh; heat transfer on cotton variants.",
    spec: "100% polyester or polyester-cotton. GSM 130–160. Moisture-wicking finish standard. Anti-odour treatment available.",
    icon: "🔲",
    color: "sky",
  },
  {
    id: "slub-jersey",
    name: "Slub Jersey",
    badge: "Texture Differentiator",
    gsm: "150–190 GSM",
    hand: "Irregular slub texture — natural, artisan appearance",
    best: ["Boho & Lifestyle Retail", "Premium Basics", "USA Vintage Market"],
    markets: ["USA", "EU", "Australia"],
    decorations: ["Screen Print (soft-hand)", "Embroidery"],
    detail: "Slub jersey uses irregular thick-and-thin yarn to create a distinctive natural texture that reads as artisan and premium without requiring additional finishing. Particularly popular in USA boho lifestyle retail and women's fashion collections. The texture variation adds visual interest to plain colourways — works well in natural and earthy tones.",
    spec: "100% cotton slub or cotton-modal slub. GSM 150–190. Reactive dyed. Enzyme-washed finish for softness. Cannot be garment-dyed.",
    icon: "🌿",
    color: "amber",
  },
  {
    id: "bamboo-jersey",
    name: "Bamboo Jersey",
    badge: "Sustainable Premium",
    gsm: "150–180 GSM",
    hand: "Exceptionally soft, naturally moisture-wicking, temperature-regulating",
    best: ["Sustainable Brands", "Wellness & Yoga", "Premium Athleisure"],
    markets: ["USA", "EU", "UK", "Australia"],
    decorations: ["Screen Print (water-based)", "Embroidery", "Heat Transfer"],
    detail: "Bamboo jersey is the premium sustainable option for tank tops — soft as cashmere, naturally moisture-wicking and temperature-regulating without chemical finishes. Growing demand in sustainable fashion, yoga wear and wellness brands. Bamboo viscose blends (70/30 bamboo-cotton or 95/5 bamboo-spandex) provide stretch and recovery alongside the exceptional softness bamboo is known for.",
    spec: "70% bamboo viscose / 30% combed cotton or 95% bamboo / 5% spandex. GSM 150–180. OEKO-TEX certified processing. Hypoallergenic, no chemical softeners required.",
    icon: "🎋",
    color: "green",
  },
];

const FIT_PROFILES = [
  { code: "REG", name: "Regular Fit", ease: "+8–10 cm body ease", market: "Men's casual, lifestyle, USA mainstream retail" },
  { code: "SLM", name: "Slim Fit", ease: "+4–6 cm body ease", market: "Contemporary fashion, menswear basics, UK/EU" },
  { code: "OVR", name: "Oversized / Relaxed", ease: "+16–22 cm body ease", market: "Streetwear, youth fashion, EU contemporary" },
  { code: "ATH", name: "Athletic / Performance", ease: "Compression shoulder, tapered waist", market: "Gym brands, running, performance retail" },
  { code: "WMN", name: "Women's Cut", ease: "Contoured waist, wider hip, shorter hem", market: "Women's athleisure, boutique fitness, global" },
];

const GSM_TIERS = [
  { gsm: "130–150", name: "Ultra-Light", season: "Summer / Warm Climate", market: "SE Asia · Australia · Middle East · South America", pct: 35, featured: false, desc: "The lightest weight in the category. Maximum breathability for mesh and jersey tanks in tropical markets. Mesh constructions sit in this range.", color: "bg-sky-300" },
  { gsm: "150–165", name: "Standard Athletic", season: "Year-Round Performance", market: "USA · UK · EU — primary athleisure range", pct: 80, featured: true, desc: "Industry-standard weight for women's athleisure and men's training tanks. Balanced coverage, soft drape and excellent print fidelity. Covers the majority of programmes.", color: "bg-gold" },
  { gsm: "165–180", name: "Premium / Structured", season: "A/W & Lifestyle", market: "USA fashion retail · EU premium basics", pct: 50, featured: false, desc: "Heavier-weight tank positions itself as a fashion-led layering piece. Rib tanks at this weight deliver structured, close-fit performance for boutique fitness and premium basics.", color: "bg-sky-500" },
];

const DECO_METHODS = [
  { code: "SCR", method: "Screen Print", best: "Brand graphics, multi-colour, fashion programmes", compat: ["Single Jersey", "Slub Jersey", "Bamboo Jersey"], note: "Soft-hand inks recommended for bamboo jersey" },
  { code: "EMB", method: "Embroidery", best: "Logo marks, chest and strap placement", compat: ["Single Jersey", "Rib (1×1)", "Bamboo Jersey"], note: "Tight stabiliser required for stretch constructions" },
  { code: "DTG", method: "Digital / DTG Print", best: "Photo-quality imagery, short runs — jersey only", compat: ["Single Jersey"], note: "Not suitable for mesh or slub jersey" },
  { code: "SUB", method: "Sublimation / Heat Transfer", best: "All-over print, performance mesh, athletic branding", compat: ["Mesh / Eyelet", "Single Jersey (poly)"], note: "Best on polyester and poly-blend constructions" },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Standard / PMS Matched", note: "Full PMS colour range. Lab dip approval before bulk. ISO 105 X12 tolerance maintained.", swatches: ["bg-red-400", "bg-sky-500", "bg-emerald-500", "bg-yellow-400", "bg-pink-400"] },
  { name: "Garment Dye", subtitle: "Vintage / Washed Tones", note: "Popular in USA premium streetwear and DTC brands. Compatible with single jersey and slub.", swatches: ["bg-stone-300", "bg-stone-400", "bg-stone-500", "bg-rose-300", "bg-slate-400"] },
  { name: "Organic / Low-Impact", subtitle: "GOTS Certified", note: "OEKO-TEX certified chemicals only. No azo dyes. Required for bamboo jersey programmes.", swatches: ["bg-green-200", "bg-teal-300", "bg-lime-300", "bg-emerald-300", "bg-green-400"] },
  { name: "Heather / Mélange", subtitle: "Blended Yarns", note: "Multi-fibre blends producing soft heathered tones. Popular in USA athletic basics and performance retail.", swatches: ["bg-gray-300", "bg-gray-400", "bg-slate-300", "bg-zinc-400", "bg-stone-300"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic fibre sourcing and processing — required for bamboo and organic cotton claims", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — EU/UK import compliance standard for next-to-skin garments", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — labour standards and worker welfare verified", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data sharing platform", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control certification", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled content verification — relevant for polyester mesh programmes", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance certification", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Improved cotton farming practices — single jersey and rib programmes", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "The most demanding social certification — worker rights, wages and conditions independently audited", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency across the textile supply chain", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Neckline & Strap Engineering", desc: "Scoop neck, racerback, standard tank, spaghetti strap or wide strap — custom neckline and strap specification to your design." },
  { num: "02", title: "Custom Fabric & GSM", desc: "Specify construction, fibre blend and GSM. Bamboo, recycled polyester, organic cotton — sourced to your sustainability specification." },
  { num: "03", title: "PMS Colour Programme", desc: "Full PMS colour matching with lab dip approval before bulk. ISO 105 X12 colour fastness maintained across the full production run." },
  { num: "04", title: "Brand Label & Packaging", desc: "Woven neck labels, care labels, hang tags, hem labels, QR code labels — all produced to your brand specification." },
  { num: "05", title: "Decoration Programme", desc: "Screen print, embroidery, DTG, sublimation and heat transfer managed to your approved artwork and brand guidelines." },
  { num: "06", title: "Retail & E-commerce Packaging", desc: "Polybag, board fold, hanger, retail box, 2-pack and 3-pack configurations — tailored to your fulfilment requirement." },
];

const SECTORS = [
  { abbr: "WA", name: "Women's Athleisure", detail: "Boutique fitness, yoga, Pilates and lifestyle brands in USA, UK and EU — primary growth market for tank tops", market: "USA · UK · EU" },
  { abbr: "MT", name: "Men's Training", detail: "Athletic tanks for gym, running and performance retail", market: "USA · Australia · EU" },
  { abbr: "FR", name: "Fashion Retail", detail: "Lifestyle and casual-wear chains and DTC brands requiring OEM production at volume", market: "USA · UK · EU" },
  { abbr: "SB", name: "Sustainable Brands", detail: "Bamboo and organic cotton tank programmes for eco-conscious retail and DTC labels", market: "EU · USA · Australia" },
  { abbr: "WS", name: "Wholesale Distributors", detail: "Multi-brand distributors supplying regional retail networks with tank top basics", market: "USA · EU · Middle East" },
  { abbr: "CG", name: "Corporate & Event", detail: "Branded event tanks, staff uniforms and gifting programmes for corporate buyers", market: "Worldwide" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance. Price includes delivery to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight. Buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory gate. Lowest quoted price, highest buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard bulk export" },
  { icon: "🪝", label: "Hanger + Polybag", note: "Retail-ready" },
  { icon: "🗂️", label: "Board Fold", note: "In-store presentation" },
  { icon: "📦", label: "2-Pack / 3-Pack", note: "Value multi-packs" },
  { icon: "🎁", label: "Retail Gift Box", note: "Premium gifting" },
  { icon: "✏️", label: "Custom Packaging", note: "To your brand brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory shortlist, pricing and availability confirmed", color: "bg-gold" },
  { stage: "Sample Production", days: "14–18", desc: "Pre-production samples to construction and colour specification", color: "bg-sky-500" },
  { stage: "Bulk Production", days: "40–60", desc: "From confirmed PO and approved sample", color: "bg-indigo-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection before vessel loading", color: "bg-purple-500" },
  { stage: "Sea Freight", days: "18–28", desc: "FCL/LCL from Karachi or Port Qasim", color: "bg-teal-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🎋", title: "Bamboo Jersey Option", desc: "Bamboo viscose jersey offers natural moisture management and temperature regulation without chemical finishes. OEKO-TEX certified processing.", tag: "OEKO-TEX" },
  { icon: "🌱", title: "Organic Cotton Programmes", desc: "GOTS-certified organic cotton available across single jersey and rib constructions. Fully traceable from farm to finished garment.", tag: "GOTS" },
  { icon: "💧", title: "Low-Water Dyeing", desc: "Enzyme washing and reactive dyeing processes reduce water consumption versus conventional stone washing. OEKO-TEX certified chemicals only.", tag: "Process" },
  { icon: "♻️", title: "Recycled Polyester Mesh", desc: "GRS-certified recycled polyester available for mesh and performance tank top programmes. Post-consumer PET bottle feedstock.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Factory Audits", desc: "BSCI, Sedex and SA8000 audited factories across our knitwear network. Worker welfare, fair wages and safe conditions verified.", tag: "BSCI / Sedex" },
  { icon: "📦", title: "Sustainable Packaging", desc: "Recycled polybags, FSC-certified paper hangtags and unbleached tissue available on request for any sustainable programme.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction, GSM, neckline, fit, decoration, quantity and destination via our RFQ form. The more detail, the more accurate our factory shortlist." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We match your tank top programme to 2–3 Pakistan knitwear factories with verified construction capability, certification profile and production capacity. Quotation within 3–5 working days." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Pre-production samples produced to your construction, fit, colour and decoration specification. 14–18 days from spec confirmation and fabric approval." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review construction, fit, colour, decoration, label and packaging. Revise as required — no bulk production commences until your sample is approved." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Fabric cutting and production commences from confirmed purchase order. Duration depends on construction, decoration complexity and quantity." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection, packing verification and loading. FCL or LCL from Karachi or Port Qasim. Documentation package included." },
];

const FAQS = [
  {
    q: "What is the difference between bamboo jersey and single jersey for tank tops?",
    a: "Bamboo jersey (typically 70% bamboo viscose / 30% cotton or 95% bamboo / 5% spandex) is significantly softer, naturally moisture-wicking and temperature-regulating without any chemical finish. Single jersey is the conventional cotton standard — excellent for print programmes and suited to a broader price range. Bamboo positions as premium or sustainable; single jersey covers the mainstream to premium spectrum. Both can be OEKO-TEX certified.",
  },
  {
    q: "What GSM is right for a women's athleisure tank versus a performance athletic vest?",
    a: "Women's athleisure tanks in rib or single jersey typically sit in the 160–180 GSM range — enough weight for coverage and structure without heaviness. Performance athletic and running vests tend to be lighter: 130–155 GSM in mesh or single jersey for maximum breathability. If the programme bridges both (lifestyle and active), 155–165 GSM single jersey is a reliable centre point.",
  },
  {
    q: "Do you offer racerback and scoop-neck cuts alongside standard straight necklines?",
    a: "Yes. Neckline and strap configurations are fully customisable: standard tank strap width, narrow spaghetti strap, racerback, wide Y-back, scoop neck and square neck are all available. Racerback patterns require additional pattern-making and cutting operations — factor this into your sampling timeline. We can work from your provided tech pack or develop patterns from reference samples.",
  },
  {
    q: "Can tank tops be produced as part of a matched set with shorts or leggings?",
    a: "Yes. Matched co-ord sets (tank + shorts, tank + leggings, tank + biker short) are a common programme structure for athleisure buyers. Fabric matching across pieces requires coordinating construction, dye lot and GSM across the full set. We manage this across our factory network — specify the full set composition in your RFQ so we can confirm factory capability across all pieces.",
  },
  {
    q: "What print and decoration options work best for tank tops?",
    a: "For cotton and cotton-blend tanks: screen print (front chest or full front), embroidery (logo mark, chest placement), DTG (small runs, photo-quality imagery on single jersey). For polyester mesh and performance tanks: sublimation (all-over print) and heat transfer are preferred. Embroidery requires stabiliser backing on stretch constructions — inform your decorator of the fabric type.",
  },
  {
    q: "What are typical indicative lead times from sample approval to shipment?",
    a: "As a general indicative guide: sample production 14–18 days from spec lock; bulk production 40–60 days from PO confirmation; pre-shipment QC 3–5 days. These timelines are indicative and vary with construction complexity, colour count, decoration method, quantity and factory scheduling. Your confirmed quotation will include a programme-specific timeline.",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function TankTopsContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip">

      {/* ════════════════════════════════════════════════════════════════════════
          HERO — image overlay
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-tank-tops.webp"
            fill
            alt="Pakistan tank top manufacturer — OEM single jersey, rib and bamboo jersey athletic vests for USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/92 via-navy-900/75 to-navy-900/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Lightweight Knitwear
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Tank Top
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl"
            >
              MZ Global Trading connects athleisure brands, retailers and performance labels with Pakistan&rsquo;s certified knitwear factories. Single jersey, rib, mesh, slub and bamboo jersey. 130&ndash;180 GSM. Racerback, scoop neck, standard and spaghetti strap configurations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true"
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
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Tank Top Supply — Pakistan Athleisure Knitwear</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">The Lightest Category. Full Production Depth.</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                At 130–180 GSM, tank tops are the lightest knitwear category Pakistan&rsquo;s certified mills produce — and among the most specification-sensitive. Bamboo jersey, performance mesh, organic cotton rib: each construction requires matched dyeing, finishing and decoration capability. We source to the exact specification, not the nearest available.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "5", label: "Fabric Constructions" },
                { val: "130–180", label: "GSM Range" },
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1: Constructions + Fits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <h3 className="text-xl font-bold text-navy-900">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-sky-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.gsm}</p>
                    <p className="text-xs text-sky-600 mt-1 leading-tight">{c.best[0]}</p>
                    {c.badge && <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-pink-50 border border-pink-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">👗</span>
                <div>
                  <p className="text-pink-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fit Profiles &amp; Necklines</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {FIT_PROFILES.map((f) => (
                  <div key={f.code} className="bg-white rounded-xl px-4 py-3 border border-pink-100 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-pink-100 text-pink-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{f.code}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{f.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{f.ease}</p>
                      <p className="text-xs text-pink-600 mt-0.5">{f.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-fits" label="Explore Fit Profiles" />
            </motion.div>
          </div>

          {/* Row 2: GSM + Decoration + Colours + OEM */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">⚖️</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">GSM Weight Guide</h3>
              <div className="flex flex-col gap-2 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.gsm} className="flex items-center gap-2">
                    <div className={`h-2 rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                    <span className="text-xs text-gray-500 whitespace-nowrap">{t.gsm}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="GSM Details" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
              className="bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🎨</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Decoration Methods</h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {DECO_METHODS.map((d) => (
                  <div key={d.code} className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-fuchsia-100 text-fuchsia-700 text-[10px] font-bold flex items-center justify-center shrink-0">{d.code}</span>
                    <span className="text-xs font-medium text-navy-900">{d.method}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="Decoration Guide" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-100 border border-gray-200 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🎨</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Colour &amp; Dye Options</h3>
              <div className="grid grid-cols-5 gap-1 flex-1">
                {DYE_OPTIONS.flatMap((d) => d.swatches).slice(0, 10).map((sw, i) => (
                  <div key={i} className={`${sw} rounded-md aspect-square`} />
                ))}
              </div>
              <ExploreBtn sectionId="section-colours" label="Colour Programme" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-6 flex flex-col min-h-[220px]"
            >
              <span className="text-2xl mb-3" aria-hidden="true">🏭</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">OEM Capabilities</h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {OEM_FEATURES.slice(0, 4).map((f) => (
                  <div key={f.num} className="flex items-start gap-2">
                    <span className="text-gold font-bold text-xs shrink-0">{f.num}</span>
                    <p className="text-xs text-gray-600 leading-tight">{f.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="OEM Details" />
            </motion.div>
          </div>

          {/* Row 3: Markets + Certifications + Export */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="md:col-span-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col gap-4 min-h-[260px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Buyer Sectors</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {SECTORS.slice(0, 4).map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-indigo-100">
                    <p className="text-[10px] font-bold text-indigo-600">{s.abbr}</p>
                    <p className="text-xs font-semibold text-navy-900 leading-tight">{s.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{s.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="All Sectors" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
              className="md:col-span-2 bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-4 min-h-[260px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 flex-1 content-start">
                {CERTIFICATIONS.slice(0, 6).map((c) => (
                  <div key={c.name} className="bg-white rounded-xl border border-amber-100 flex items-center justify-center p-2" style={{ height: 52 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={72} height={40} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="All Certifications" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col gap-4 min-h-[260px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🚢</span>
                <div>
                  <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
                  <h3 className="text-base font-bold text-navy-900 mt-0.5">Export Terms</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-orange-100">
                    <span className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {e.term}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{e.full}</p>
                      <p className="text-[10px] text-gray-400">{e.port}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-export" label="Export Details" />
            </motion.div>
          </div>

          {/* Row 4: Sustainability + Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="md:col-span-1 bg-lime-50 border border-lime-100 rounded-2xl p-6 flex flex-col gap-4 min-h-[260px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌿</span>
                <div>
                  <p className="text-lime-700 text-xs font-semibold tracking-[0.2em] uppercase">Ethics</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Sustainability</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {SUSTAINABILITY_ITEMS.slice(0, 3).map((s) => (
                  <div key={s.title} className="bg-white rounded-xl px-3 py-2.5 border border-lime-100 flex items-center gap-2.5">
                    <span className="text-base shrink-0" aria-hidden="true">{s.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-navy-900 leading-tight">{s.title}</p>
                      <span className="text-[10px] font-semibold text-lime-700 bg-lime-100 px-1.5 py-0.5 rounded-full">{s.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="Sustainability" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 min-h-[260px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">⚙️</span>
                <div>
                  <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Sourcing Process</h3>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 flex-1">
                {PROCESS_STEPS.map((p) => (
                  <div key={p.num} className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col gap-1">
                    <p className="text-xl font-black text-gray-200 leading-none">{p.num}</p>
                    <p className="text-xs font-bold text-navy-900">{p.short}</p>
                    <p className="text-[10px] text-gray-400 leading-tight">{p.desc.slice(0, 48)}…</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-process" label="Full Process" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          RESOURCES ROW
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "📚", label: "Knowledge Hub", sub: "Pakistan knitwear export guides", href: "/knowledge/" },
              { icon: "📖", label: "Sourcing Guides", sub: "Fabric, certification and spec guides", href: "/guides/" },
              { icon: "📥", label: "Downloads", sub: "Spec sheets and certification docs", href: "/downloads/" },
              { icon: "📋", label: "Quick Start", sub: "Construction, GSM, fit and neckline — RFQ takes 3 minutes.", href: "/rfq/" },
            ].map((r) => (
              <Link key={r.label} href={r.href} className="group bg-white border border-gray-100 hover:border-gold rounded-2xl p-5 flex items-start gap-4 hover:shadow-sm transition-all">
                <span className="text-2xl shrink-0" aria-hidden="true">{r.icon}</span>
                <div>
                  <p className="font-bold text-navy-900 group-hover:text-gold transition-colors text-sm">{r.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{r.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — CONSTRUCTIONS (Product Showcase UI + Card Layout)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">01 — Fabric</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Tank Top Fabric Constructions from Pakistan</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Five distinct knit constructions spanning performance mesh to sustainable bamboo jersey — each engineered for a different end-use and market. Select the construction that matches your programme weight, handle and certification requirement.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div key={c.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gold hover:shadow-lg transition-all"
              >
                <div className="h-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-teal-500" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {c.badge && <span className="inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full mb-2">{c.badge}</span>}
                      <h3 className="text-xl font-bold text-navy-900">{c.name}</h3>
                      <p className="text-sm text-sky-600 mt-1">{c.gsm}</p>
                    </div>
                    <span className="text-3xl" aria-hidden="true">{c.icon}</span>
                  </div>
                  <p className="text-xs text-gray-500 italic mb-4">{c.hand}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.detail}</p>
                  <div className="bg-sky-50 rounded-xl p-3 mb-3">
                    <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-1">Spec Summary</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{c.spec}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.best.map((b) => (
                      <span key={b} className="text-[10px] bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — FITS (Social-First UI + Tile Layout)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-fits" className="bg-pink-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">02 — Fit &amp; Neckline</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Fit Profiles and Neckline Options for Tank Tops</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">From women&rsquo;s contoured cut to men&rsquo;s relaxed fit — every profile is a distinct pattern and grade. Neckline configurations (racerback, scoop, spaghetti strap, wide strap) are specified at tech-pack stage alongside the fit profile.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {FIT_PROFILES.map((f, i) => (
              <motion.div key={f.code}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-5 border-2 border-pink-100 hover:border-pink-400 transition-all hover:shadow-md text-center"
              >
                <p className="text-3xl font-black text-pink-400 mb-2">{f.code}</p>
                <p className="font-bold text-navy-900 text-sm">{f.name}</p>
                <p className="text-xs text-gray-400 mt-1">{f.ease}</p>
                <p className="text-xs text-pink-600 mt-2 leading-tight">{f.market}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-pink-100">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Neckline &amp; Strap Options</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Standard Tank Strap", "Spaghetti Strap", "Wide Shoulder Strap", "Racerback / Y-Back", "Scoop Neck", "Square Neck", "V-Neck Tank", "Custom to Tech Pack"].map((n) => (
                <div key={n} className="bg-pink-50 rounded-xl px-3 py-2.5 text-xs font-medium text-navy-900 text-center border border-pink-100">{n}</div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 italic">⚠ Neckline and strap configurations are defined at tech-pack stage. Non-standard configurations require additional sampling.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — GSM (Dashboard UI + KPI Dashboard)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-gsm" className="bg-slate-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">03 — Weight</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">GSM Weight Guide for Tank Top Programmes</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">At 130–180 GSM, tank tops occupy the lightest band of the knitwear category. Weight selection determines construction options, end-use positioning, seasonal fit and price point — it is the first specification decision for any tank top programme.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {GSM_TIERS.map((t, i) => (
              <motion.div key={t.gsm}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-8 relative overflow-hidden ${t.featured ? "bg-[#0D1B2A] text-white" : "bg-white border border-slate-200"}`}
              >
                {t.featured && <div className="absolute top-3 right-3 text-[10px] bg-gold text-navy-900 font-bold px-2.5 py-1 rounded-full">Most Common</div>}
                <p className={`text-4xl font-black mb-2 ${t.featured ? "text-gold" : "text-navy-900"}`}>{t.gsm}</p>
                <p className={`text-lg font-bold mb-1 ${t.featured ? "text-white" : "text-navy-900"}`}>{t.name}</p>
                <p className={`text-sm mb-4 ${t.featured ? "text-gray-300" : "text-gray-500"}`}>{t.season}</p>
                <div className="h-2 bg-gray-700/30 rounded-full mb-4">
                  <div className={`h-2 rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                </div>
                <p className={`text-xs leading-relaxed ${t.featured ? "text-gray-300" : "text-gray-500"}`}>{t.desc}</p>
                <p className={`text-xs font-semibold mt-3 ${t.featured ? "text-gold" : "text-sky-600"}`}>{t.market}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800">
            <span className="font-bold">⚠ Indicative guide only.</span> Final GSM specification is confirmed at sampling stage. Exact GSM may vary ±5% depending on construction, yarn count and finishing method. Your quotation will include factory-confirmed GSM tolerance.
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — DECORATION (Maximalist UI + Infographic)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-decoration" className="bg-fuchsia-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">04 — Decoration</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Print, Embroidery and Decoration for Tank Tops</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Decoration method selection depends on fabric construction, print scale, colour count and run size. Tank tops present unique considerations: stretch constructions require specialist techniques, and the garment&rsquo;s lighter weight demands lower-impact application methods.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DECO_METHODS.map((d, i) => (
              <motion.div key={d.code}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-fuchsia-100 hover:border-fuchsia-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-fuchsia-100 text-fuchsia-700 font-black text-sm flex items-center justify-center shrink-0">{d.code}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-900 text-lg mb-1">{d.method}</h3>
                    <p className="text-sm text-gray-600 mb-3">{d.best}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {d.compat.map((c) => <span key={c} className="text-[10px] bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 px-2 py-0.5 rounded-full">{c}</span>)}
                    </div>
                    <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">⚠ {d.note}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-2xl p-6 border border-fuchsia-100">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Placement Options</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Front chest — left", "Front chest — centre", "Front — full chest", "Back — upper", "Back — full", "All-over (sublimation)", "Strap / shoulder", "No decoration"].map((p) => (
                <div key={p} className="bg-fuchsia-50 rounded-xl px-3 py-2.5 text-xs font-medium text-navy-900 text-center border border-fuchsia-100">{p}</div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOURS (Monochrome UI + Swatch Grid)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-colours" className="bg-gray-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">05 — Colour</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Colour Programme &amp; Dye Options for Tank Tops</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">Full PMS colour matching available for reactive-dyed programmes. Garment dye for vintage and premium DTC positioning. Organic and low-impact dye certification for sustainable programmes. Heather mélange for performance and athletic collections.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div key={d.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{d.name}</h3>
                    <p className="text-gray-400 text-sm mt-0.5">{d.subtitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2 mb-4">
                  {d.swatches.map((sw, j) => (
                    <div key={j} className={`${sw} rounded-lg aspect-square`} />
                  ))}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-teal-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">06 — OEM</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">OEM Tank Top Capabilities for International Brands</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">End-to-end OEM production management — from custom neckline pattern development through certified fabric sourcing, decoration and retail packaging. MZ Global Trading manages each stage with verified Pakistan knitwear factories.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {OEM_FEATURES.map((f, i) => (
                <motion.div key={f.num}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-5 border border-teal-100 flex items-start gap-4"
                >
                  <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-black text-sm flex items-center justify-center shrink-0">{f.num}</span>
                  <div>
                    <h3 className="font-bold text-navy-900">{f.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-teal-100 flex flex-col">
              <div className="bg-[#0D1B2A] px-6 py-4">
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Decoration × Construction Compatibility</p>
                <p className="text-white text-sm mt-1">Which decoration methods work with each tank top fabric</p>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full min-w-[520px] text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-4 py-3 text-left font-bold text-gray-500 uppercase tracking-wider w-[28%]">Construction</th>
                      <th className="px-3 py-3 text-center font-bold text-gray-500 uppercase tracking-wider">Screen Print</th>
                      <th className="px-3 py-3 text-center font-bold text-gray-500 uppercase tracking-wider">Embroidery</th>
                      <th className="px-3 py-3 text-center font-bold text-gray-500 uppercase tracking-wider">DTG</th>
                      <th className="px-3 py-3 text-center font-bold text-gray-500 uppercase tracking-wider">Sublimation</th>
                      <th className="px-3 py-3 text-center font-bold text-gray-500 uppercase tracking-wider">Heat Transfer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        fabric: "Single Jersey",
                        cols: [
                          { label: "✓ Best", cls: "text-emerald-700 font-bold" },
                          { label: "✓", cls: "text-emerald-600 font-semibold" },
                          { label: "✓", cls: "text-emerald-600 font-semibold" },
                          { label: "✓ (poly blend)", cls: "text-amber-600 font-medium" },
                          { label: "✓", cls: "text-emerald-600 font-semibold" },
                        ],
                      },
                      {
                        fabric: "Rib (1×1)",
                        cols: [
                          { label: "✓ (flat-bed)", cls: "text-amber-600 font-medium" },
                          { label: "✓ Best", cls: "text-emerald-700 font-bold" },
                          { label: "✗", cls: "text-red-400 font-medium" },
                          { label: "✗", cls: "text-red-400 font-medium" },
                          { label: "✓", cls: "text-emerald-600 font-semibold" },
                        ],
                      },
                      {
                        fabric: "Mesh / Eyelet",
                        cols: [
                          { label: "✗", cls: "text-red-400 font-medium" },
                          { label: "✗", cls: "text-red-400 font-medium" },
                          { label: "✗", cls: "text-red-400 font-medium" },
                          { label: "✓ Best (poly)", cls: "text-emerald-700 font-bold" },
                          { label: "✓", cls: "text-emerald-600 font-semibold" },
                        ],
                      },
                      {
                        fabric: "Slub Jersey",
                        cols: [
                          { label: "✓ (soft-hand)", cls: "text-amber-600 font-medium" },
                          { label: "✓", cls: "text-emerald-600 font-semibold" },
                          { label: "✗", cls: "text-red-400 font-medium" },
                          { label: "✗", cls: "text-red-400 font-medium" },
                          { label: "✓", cls: "text-emerald-600 font-semibold" },
                        ],
                      },
                      {
                        fabric: "Bamboo Jersey",
                        cols: [
                          { label: "✓ (water-based)", cls: "text-amber-600 font-medium" },
                          { label: "✓", cls: "text-emerald-600 font-semibold" },
                          { label: "✗", cls: "text-red-400 font-medium" },
                          { label: "✗", cls: "text-red-400 font-medium" },
                          { label: "✓", cls: "text-emerald-600 font-semibold" },
                        ],
                      },
                    ].map((r, i) => (
                      <tr key={r.fabric} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-4 py-3 font-semibold text-navy-900">{r.fabric}</td>
                        {r.cols.map((c, j) => (
                          <td key={j} className={`px-3 py-3 text-center ${c.cls}`}>{c.label}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-4 bg-teal-50 border-t border-teal-100 flex flex-wrap gap-4 text-xs text-gray-600">
                <span><span className="font-bold text-emerald-700">✓ Best</span> — Optimal result for this construction</span>
                <span><span className="font-bold text-amber-600">✓ (note)</span> — Works with specific technique or ink type</span>
                <span><span className="font-bold text-red-400">✗</span> — Not recommended (poor adhesion or distortion)</span>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKETS (Card-Based UI + Region Cards)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-indigo-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">07 — Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Tank Top Buyer Sectors &amp; Export Markets Served</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Tank tops ship from Pakistan to athleisure buyers, fitness brands, fashion retailers and corporate clients across 35+ countries. Women&rsquo;s athleisure is the primary growth sector — the single largest category driver in the USA, UK and Australian markets.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {SECTORS.map((s, i) => (
              <motion.div key={s.abbr}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-indigo-100 hover:border-gold hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center">{s.abbr}</span>
                  <h3 className="font-bold text-navy-900">{s.name}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{s.detail}</p>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{s.market}</span>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#0D1B2A] rounded-2xl p-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Primary Export Destinations</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { region: "North America", markets: "USA, Canada", note: "Women's athleisure, men's training, DTC brands" },
                { region: "Europe", markets: "UK, DE, FR, NL, SE, AU", note: "Sustainable programmes, organic cotton, bamboo" },
                { region: "Asia-Pacific", markets: "AU, NZ, SG, JP, KR", note: "Performance and lifestyle, premium basics" },
                { region: "Middle East", markets: "AE, SA, QA, KW", note: "Cotton basics, corporate and event branding" },
              ].map((r) => (
                <div key={r.region} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white font-bold text-sm mb-1">{r.region}</p>
                  <p className="text-gold text-xs mb-2">{r.markets}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{r.note}</p>
                </div>
              ))}
            </div>
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS (Skeuomorphic UI + Badge Grid)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-amber-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">08 — Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Certifications for Tank Top OEM Programmes</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">OEKO-TEX Standard 100 is the minimum certification for any tank top programme — next-to-skin garments are scrutinised for chemical safety. GOTS is required for organic cotton and bamboo claims. Certification documentation is included with every shipment.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={c.name}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl p-5 border-2 border-amber-100 hover:border-gold transition-all flex flex-col items-center text-center"
              >
                <div className="relative w-14 h-10 mb-3">
                  <Image src={c.img} alt={`${c.full} certification`} fill className="object-contain" sizes="56px" />
                </div>
                <p className="font-bold text-navy-900 text-sm mb-1">{c.name}</p>
                <p className="text-[10px] text-gray-400 leading-tight">{c.desc}</p>
                <span className={`mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${c.tier === "Premium" ? "bg-gold/20 text-gold" : c.tier === "Optional" ? "bg-gray-100 text-gray-500" : "bg-teal-100 text-teal-700"}`}>{c.tier}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — EXPORT & PACKAGING (Editorial UI + Timeline)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">09 — Logistics</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Export Terms and Packaging for Tank Top Orders</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Tank tops ship FCL or LCL from Karachi and Port Qasim to all major global ports. FOB is the most common incoterm for buyers with established freight relationships. Packaging options range from bulk polybag to retail-ready hanger and gift box configurations.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Incoterms Available</p>
              <div className="space-y-4">
                {EXPORT_TERMS.map((e, i) => (
                  <motion.div key={e.term}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                      <p className="font-black text-navy-900 text-sm">{e.term}</p>
                    </div>
                    <div className="border-l-2 border-gray-100 pl-4 flex-1">
                      <p className="font-bold text-navy-900">{e.full}</p>
                      <p className="text-xs text-gold mt-0.5">{e.port}</p>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{e.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Indicative Programme Timeline</p>
              <div className="space-y-4">
                {LEAD_STAGES.map((s, i) => (
                  <motion.div key={s.stage}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center text-white font-bold text-sm`}>{i + 1}</div>
                      {i < LEAD_STAGES.length - 1 && <div className="w-px h-6 bg-gray-200 mt-1" />}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="flex items-baseline justify-between">
                        <p className="font-bold text-navy-900">{s.stage}</p>
                        <p className="text-xs text-gold font-bold">{s.days} days</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
                ⚠ All timelines are indicative. Confirmed programme schedules are provided in your quotation document.
              </div>

              <div className="mt-8">
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Packaging Options</p>
                <div className="grid grid-cols-2 gap-3">
                  {PACK_OPTIONS.map((p) => (
                    <div key={p.label} className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 flex items-center gap-3">
                      <span className="text-xl" aria-hidden="true">{p.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-navy-900">{p.label}</p>
                        <p className="text-[10px] text-gray-400">{p.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY (Flat Design UI + Bullet List)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-lime-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">10 — Sustainability</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Sustainable Tank Top Programmes — Bamboo, Organic Cotton, Recycled Mesh</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Tank tops are a next-to-skin garment — sustainable material sourcing and certified chemical-free processing are not optional for most EU and UK retail programmes. MZ Global Trading sources bamboo jersey, organic cotton rib and recycled polyester mesh from independently certified Pakistan factories.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-lime-100 flex items-start gap-4"
              >
                <span className="text-3xl shrink-0" aria-hidden="true">{s.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-navy-900">{s.title}</h3>
                    <span className="text-[9px] font-bold bg-lime-100 text-lime-700 px-2 py-0.5 rounded-full">{s.tag}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — PROCESS (Swiss Design UI + Numbered Flow)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">11 — Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">How Tank Top Sourcing Works — RFQ to Shipment</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Six defined stages with a clear deliverable at each step. No ambiguity on who does what. No production commences until samples are approved and a purchase order is confirmed in writing.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div key={p.num}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-l-4 border-gold pl-6 py-2"
              >
                <p className="text-6xl font-black text-gray-100 leading-none select-none">{p.num}</p>
                <p className="text-xs font-semibold text-gold tracking-[0.15em] uppercase mt-1">{p.short}</p>
                <h3 className="text-xl font-bold text-navy-900 mt-1 mb-3">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Tank Top Sourcing — Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="group w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={faqOpen === i}
                >
                  <span className="font-semibold text-navy-900 pr-4 text-sm sm:text-base leading-snug">{f.q}</span>
                  <span className="relative shrink-0 mt-0.5">
                    {faqOpen !== i && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                      </span>
                    )}
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${faqOpen === i ? "border-gold bg-gold text-navy-900" : "border-gray-200 text-gray-400 group-hover:border-gold"}`}>
                      {faqOpen === i ? "−" : "+"}
                    </span>
                  </span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }} className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SAME-TIER PAGE BOXES
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
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
              { name: "Sweatshirts & Hoodies", desc: "French terry, loop back and bonded fleece. 300–420 GSM. Embroidery and print.", href: "/apparel/knittedgarments/sweatshirtshoodies/", img: "/images/hero/hero-sweatshirts-hoodies.webp", alt: "Pakistan sweatshirt and hoodie manufacturer — OEM French terry and fleece hoodies for sportswear and retail brands" },
              { name: "Sweatpants & Joggers", desc: "French terry and brushed fleece. Coordinated set and standalone programmes.", href: "/apparel/knittedgarments/sweatpantsjoggers/", img: "/images/hero/hero-sweatpants-joggers.webp", alt: "Pakistan sweatpants manufacturer — OEM French terry and brushed fleece bottoms for activewear programmes" },
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
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Start Your Programme</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Women&rsquo;s athleisure, men&rsquo;s training, lifestyle casual —<br className="hidden sm:block" />
              <span className="text-gold"> tank tops built to your specification.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Single jersey, bamboo, rib or mesh, any neckline, any placement. Lightweight programmes built for performance retail and athleisure brands. Submit the RFQ; receive a certified Pakistan knitwear mill match within 3–5 working days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-bold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
