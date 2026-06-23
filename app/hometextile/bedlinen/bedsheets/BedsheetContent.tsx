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
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">
        →
      </span>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  {
    id: "percale",
    name: "Percale",
    badge: "Most Popular",
    tcRange: "200–400 TC",
    hand: "Crisp matte surface, cool sleeping, balanced weight",
    best: ["Premium Hotel", "USA Retail", "UK Mainstream"],
    markets: ["USA", "UK", "Canada", "Australia"],
    decorations: ["Embroidered Border", "Plain / Solid", "Printed Stripe", "Monogram"],
    detail:
      "Percale is the benchmark construction for retail bedsheets. The one-over-one-under plain weave delivers a matte, crisp surface that feels cool to the touch — exactly why it dominates premium hotel programmes and direct-to-consumer retail in the USA and UK. Combed cotton percale at 300–400 TC is the most commercially ordered specification. The tight weave provides excellent durability through multiple commercial washes, making it the preferred choice for high-cycle hotel linen programmes.",
    spec: "100% combed cotton or cotton-poly blend. TC 200–400. Reactive dyed. Anti-shrink / compacted finish available. GOTS and OEKO-TEX Standard 100 options.",
  },
  {
    id: "sateen",
    name: "Sateen",
    badge: "Luxury Favourite",
    tcRange: "300–600 TC",
    hand: "Silky smooth sheen, luxurious drape, sumptuous surface",
    best: ["European Premium", "Luxury Hotel", "Gift Market"],
    markets: ["UK", "EU", "Middle East", "Japan"],
    decorations: ["Plain / Solid", "Jacquard Woven", "Embroidered Monogram"],
    detail:
      "Sateen's four-over-one-under weave exposes more thread surface on the face, creating the characteristic silky sheen and smooth drape that defines luxury bedding. Popular in European premium retail and hotel luxury programmes. The lustrous surface requires careful care instructions — sateen is more prone to pilling under heavy institutional use than percale. At 400–600 TC, sateen delivers a premium-price positioning that commands a retail premium.",
    spec: "100% combed or ring-spun cotton. TC 300–600. Reactive dyed or yarn-dyed. Cool wash recommended. Lab dip approval before bulk.",
  },
  {
    id: "jacquard",
    name: "Jacquard Woven",
    badge: "Premium Pattern",
    tcRange: "300–600 TC",
    hand: "Structured woven pattern, weight varies with pattern density",
    best: ["Premium Gifting", "Boutique Hotel", "European Retail"],
    markets: ["EU", "UK", "Middle East", "Japan"],
    decorations: ["Woven Pattern (built-in)", "Embroidered Corner", "Plain hem"],
    detail:
      "Jacquard bedsheets feature patterns woven directly into the fabric structure — the design is not printed or applied. This defines the product as premium and eliminates print-fade over multiple washes. Lead times are longer than plain weaves; pattern programming on the Jacquard loom adds 5–10 days before sampling begins. Jacquard is the defining construction for premium bedding sets and corporate gifting programmes.",
    spec: "100% cotton or cotton-poly. TC 300–600. Jacquard loom woven. Extended lead time. OEKO-TEX certified dyes across all colours.",
  },
  {
    id: "oxford",
    name: "Oxford Weave",
    badge: "",
    tcRange: "200–300 TC",
    hand: "Distinctive basket-weave texture, robust and durable",
    best: ["Institutional / Contract", "Student Accommodation", "Care Facilities"],
    markets: ["UK", "EU", "Australia", "USA Institutional"],
    decorations: ["Plain / Solid", "Embroidered Logo"],
    detail:
      "Oxford weave creates a distinctive basket-weave texture through paired yarns in both warp and weft. Durability and wash-cycle resistance make Oxford the preferred construction for institutional programmes — hotel chains, student accommodation and care facilities where volume, wash tolerance and cost-per-unit are the primary purchase criteria over luxury hand feel.",
    spec: "100% cotton or cotton-poly. TC 200–300. High wash-cycle resistance. ISO 9001 certified production. OEKO-TEX Standard 100 option.",
  },
  {
    id: "flannel",
    name: "Flannel / Brushed Cotton",
    badge: "Winter Specialist",
    tcRange: "150–250 TC (brushed)",
    hand: "Soft napped surface, thermal warmth, matte texture",
    best: ["USA / Canada Winter", "Northern Europe", "Autumn/Winter Retail"],
    markets: ["USA", "Canada", "UK", "N. Europe"],
    decorations: ["Plaid / Tartan Print", "Solid / Plain", "Printed Pattern"],
    detail:
      "Flannel bedsheets are brushed after weaving to raise a soft nap on both surfaces. The thermal retention and soft surface make flannel the premium choice for USA, Canadian and Northern European autumn/winter programmes. For flannel, GSM (150–200 GSM) is more commercially relevant than TC, as the brushing process affects thread count measurement. Machine washable — warm settings maintain nap integrity.",
    spec: "100% cotton or cotton-poly. Brushed nap on both faces. GSM 150–200. Machine washable. OEKO-TEX recommended for all markets.",
  },
  {
    id: "linen",
    name: "Linen / Linen Blend",
    badge: "",
    tcRange: "100–200 TC",
    hand: "Natural texture, moisture-wicking, prestige handle",
    best: ["Premium Natural Lifestyle", "France / Italy / Scandinavia", "Eco-Premium Brands"],
    markets: ["France", "Italy", "Scandinavia", "USA Premium"],
    decorations: ["Plain / Natural", "Embroidered Border", "Stripe (yarn-dyed)"],
    detail:
      "Pure linen and linen-cotton blend bedsheets occupy the premium natural lifestyle segment. The natural texture, exceptional moisture management and longevity with use command premium positioning. European buyers — particularly France, Italy and Scandinavia — drive the strongest demand. A key selling point: linen bedsheets soften and improve with each wash, becoming the buyer's preferred sheet over time.",
    spec: "100% linen or linen-cotton blend. TC 100–200. Natural or enzyme-washed finish. OEKO-TEX and GOTS options available. Longer lead time.",
  },
  {
    id: "microfiber",
    name: "Microfiber / Polyester",
    badge: "Institutional Value",
    tcRange: "N/A — 80–120 GSM",
    hand: "Ultra-soft synthetic surface, wrinkle-resistant, fast-drying",
    best: ["Budget Hospitality", "Institutional Bulk", "SE Asia / Middle East"],
    markets: ["Middle East", "SE Asia", "South America", "USA Institutional"],
    decorations: ["Plain / Solid", "Sublimation Print", "Reactive Print"],
    detail:
      "Microfiber bedsheets are made from ultra-fine polyester filaments — typically 0.5–1.0 denier — that produce an exceptionally soft, smooth surface without the cost of high-TC cotton. Measured in GSM rather than thread count, microfiber at 80–120 GSM delivers the price-per-unit economics that drive purchasing in budget hospitality, care facilities and high-volume institutional programmes across the Middle East, Southeast Asia and South America. Quick-drying and wrinkle-resistant without any ironing. Not compatible with GOTS or organic fibre claims — OEKO-TEX Standard 100 is the applicable certification for chemical safety compliance.",
    spec: "100% polyester microfiber, 80–120 GSM. Solid reactive dye, sublimation print and all-over patterns available. Wrinkle-resistant, quick-dry, colourfast. OEKO-TEX Standard 100 option.",
  },
  {
    id: "jersey",
    name: "Jersey Knit",
    badge: "Stretch Comfort",
    tcRange: "N/A — 150–200 GSM",
    hand: "Stretchy, soft, T-shirt-like feel — relaxed and casual",
    best: ["DTC / E-commerce Brands", "USA Casual Bedding", "Children's Bedding"],
    markets: ["USA", "Canada", "Australia", "UK DTC"],
    decorations: ["Plain / Solid", "All-over Reactive Print", "Yarn-Dyed Stripe"],
    detail:
      "Jersey knit bedsheets are knitted rather than woven — the same construction as a T-shirt fabric. The result is a stretchy, soft sheet with a relaxed, casual hand feel that has built a strong following in the USA, Canadian and Australian DTC bedding market. Measured in GSM rather than thread count. The natural four-way stretch means jersey fitted sheets conform to any mattress profile without bunching, and the fabric recovers after washing without ironing. Particularly well-suited to children's and youth bedding programmes where comfort and ease of use outweigh luxury positioning.",
    spec: "100% cotton jersey or cotton-poly blend. GSM 150–200. Reactive or sublimation print. Machine washable at 40°C. OEKO-TEX Standard 100 option.",
  },
];

const TC_TIERS = [
  { tc: "200–300", name: "Entry", season: "Institutional / Contract", market: "Hotel chains · Student accommodation", pct: 35, featured: false, desc: "Durable, cost-efficient. High wash-cycle tolerance. Preferred for high-volume institutional programmes where longevity per wash cycle is the primary metric.", color: "bg-emerald-300" },
  { tc: "300–400", name: "Standard", season: "Mainstream Retail / Hotel", market: "USA · UK · Australia · Middle East", pct: 68, featured: true, desc: "The industry standard for retail bedsheets. Balances hand feel, durability and price point. Covers the majority of wholesale orders across all retail markets.", color: "bg-gold" },
  { tc: "400–500", name: "Premium", season: "Premium Retail / Boutique", market: "EU · UK Premium · Japan", pct: 82, featured: false, desc: "Noticeably softer hand feel. Sateen construction at 400–500 TC delivers the smooth, cool drape associated with premium hotel bedding collections.", color: "bg-teal-500" },
  { tc: "500+", name: "Luxury", season: "Gifting / Luxury Hotel", market: "Luxury hospitality · Gift retail · Japan · Middle East", pct: 92, featured: false, desc: "Silky, prestige bedding for luxury hotel programmes and retail gifting. Jacquard and sateen at 500+ TC command premium retail price positioning.", color: "bg-sky-500" },
];

const BED_SIZES_US = [
  { name: "Twin / Single", dim: "96 × 183 cm", note: "39″ × 72″ — studio / single" },
  { name: "Full / Double", dim: "137 × 190 cm", note: "54″ × 75″ — small double" },
  { name: "Queen", dim: "152 × 203 cm", note: "60″ × 80″ — most ordered US size" },
  { name: "King", dim: "183 × 203 cm", note: "76″ × 80″ — premium US bedding" },
  { name: "Cal King", dim: "183 × 213 cm", note: "72″ × 84″ — California King" },
];

const BED_SIZES_UK = [
  { name: "Single", dim: "90 × 190 cm", note: "3ft — standard UK single" },
  { name: "Small Double", dim: "120 × 190 cm", note: "4ft — small / guest bed" },
  { name: "Double", dim: "135 × 190 cm", note: "4′6″ — most ordered UK size" },
  { name: "King", dim: "150 × 200 cm", note: "5ft — UK king standard" },
  { name: "Super King", dim: "180 × 200 cm", note: "6ft — premium UK bedding" },
];

const BED_SIZES_EU = [
  { name: "EU Single", dim: "140 × 200 cm", note: "Standard EU single bed" },
  { name: "EU Double", dim: "200 × 200 cm", note: "Standard EU double / queen" },
  { name: "EU King", dim: "200 × 220 cm", note: "EU king — common in Germany" },
  { name: "EU Super King", dim: "240 × 220 cm", note: "Super king — Scandinavia" },
  { name: "Custom", dim: "Any dimension", note: "Confirm mattress dimensions before ordering" },
];

const EMBELLISHMENTS = [
  { code: "PL", name: "Plain / Solid", best: "Maximum versatility — all constructions and markets", market: "Hotel · Institutional · Retail", note: "Most commercially ordered — PMS colour matched" },
  { code: "EB", name: "Embroidered Border / Hem", best: "Classic luxury — percale and sateen", market: "Premium hotel · UK/EU retail · Gifting", note: "Thread colour and stitch type to specification" },
  { code: "JW", name: "Jacquard Woven Pattern", best: "Premium woven-in design — no print fade", market: "European premium · Gifting · Boutique hotel", note: "Pattern programmed on Jacquard loom — extended lead time" },
  { code: "PS", name: "Printed Border / Stripe", best: "Retail mid-market — yarn-dyed or reactive print", market: "USA retail · EU mainstream · Australia", note: "Yarn-dyed stripes for wash fastness; reactive print for photographic precision" },
  { code: "AR", name: "All-over Reactive Print", best: "Fashion bedding — photographic patterns", market: "EU fashion · DTC · E-commerce", note: "Percale and sateen base only — not suitable for jacquard" },
  { code: "MG", name: "Monogram / Initial", best: "Personalized — luxury gifting and premium hotel", market: "USA gifting · UK boutique hotel · Luxury retail", note: "Placement: hem, corner or centre; thread colour to specification" },
];

const DYE_OPTIONS = [
  { name: "Reactive Dye", subtitle: "Standard / PMS Matched", note: "Full PMS colour range. Lab dip approval submitted before bulk production begins. ISO 105 C10 colour fastness maintained.", swatches: ["bg-red-400", "bg-blue-500", "bg-emerald-500", "bg-yellow-400", "bg-purple-500"] },
  { name: "Yarn-Dyed", subtitle: "Woven Stripe & Check", note: "Colour woven into yarn before weaving — superior wash fastness versus printing. Minimum quantities higher, lead times longer.", swatches: ["bg-slate-700", "bg-red-600", "bg-amber-500", "bg-teal-500", "bg-slate-400"] },
  { name: "Vat Dye", subtitle: "Deep Saturation / Institutional", note: "Exceptional colour fastness through repeated commercial washing at high temperatures. Preferred for hotel and institutional programmes.", swatches: ["bg-navy-900", "bg-blue-700", "bg-emerald-700", "bg-red-700", "bg-stone-600"] },
  { name: "Organic / Low-Impact", subtitle: "GOTS Certified", note: "OEKO-TEX certified chemicals only. No azo dyes, no restricted substances. Required for EU eco-label and organic product claims.", swatches: ["bg-green-200", "bg-green-400", "bg-emerald-300", "bg-lime-300", "bg-teal-300"] },
];

const OEM_FEATURES = [
  { num: "01", title: "Custom Thread Count Specification", desc: "Specify TC, yarn count, ply and fibre blend — sourced to exact specification from certified Pakistan weaving mills." },
  { num: "02", title: "PMS Colour Matching & Lab Dip Approval", desc: "Lab dip sampling before bulk. ISO 105 X12 tolerance maintained. Full PMS colour range via reactive dyeing." },
  { num: "03", title: "Construction & Weave Selection", desc: "Percale, sateen, jacquard, oxford, flannel or linen blend — sourced from the certified factory specialising in your construction." },
  { num: "04", title: "Size Chart & Measurement Standards", desc: "US, UK, EU and custom sizes available. Confirm mattress dimensions before locking size specs. All-market size sets on request." },
  { num: "05", title: "Label & Branding Programme", desc: "Woven neck labels, care labels, hang tags and bed-pocket labels — all to your brand specification and language requirements." },
  { num: "06", title: "Retail & Institutional Packaging", desc: "Polybag, retail box, zippered pouch, vacuum pack, institutional bulk — tailored to your retail channel and e-commerce fulfilment needs." },
];

const SECTORS = [
  { abbr: "HT", name: "Hotel / Hospitality", detail: "Hotel chains, resorts and serviced apartments requiring certified linen programmes", market: "USA · UAE · UK · Australia" },
  { abbr: "EC", name: "E-commerce / DTC", detail: "Direct-to-consumer bedding brands and online-first retailers", market: "Global" },
  { abbr: "RT", name: "Retail Chains", detail: "Department stores, home furnishing chains and independent bedding retailers", market: "USA · EU · Australia" },
  { abbr: "HE", name: "Healthcare", detail: "Hospitals, care facilities and medical institutions requiring durable certified linen", market: "USA · UK · Europe" },
  { abbr: "WT", name: "Wholesale / Trade", detail: "Import distributors supplying regional retail networks with volume bedding", market: "Middle East · SE Asia · S. America" },
  { abbr: "PR", name: "Premium / Luxury", detail: "Luxury bedding brands, gifting programmes and boutique hotel collections", market: "USA · UK · EU · Japan" },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic fibre sourcing and processing — required for organic cotton bedding claims", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — EU and UK import standard for bedding", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — labour standards and worker welfare verified", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data sharing platform", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control certification", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled content verification for polyester blend programmes", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance certification", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Improved cotton farming practices and sustainability metrics", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "Worker rights, wages and safe conditions independently audited", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety and resource efficiency across the textile supply chain", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder. Price covers goods to port of loading only." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance. Price includes delivery to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight to your port. Buyer arranges own marine insurance cover." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all inland and ocean logistics from factory gate. Lowest quoted price, highest buyer responsibility." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard bulk export" },
  { icon: "🎁", label: "Retail Box (single sheet)", note: "In-store presentation" },
  { icon: "📮", label: "Retail Box (set)", note: "Coordinated set packaging" },
  { icon: "🔒", label: "Zippered Pouch", note: "Premium retail presentation" },
  { icon: "💨", label: "Vacuum Packed", note: "Space-efficient shipping" },
  { icon: "🏭", label: "Bulk / Institutional", note: "Dozen-pack or case" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory shortlist, pricing and availability confirmed", color: "bg-gold" },
  { stage: "Sample Production", days: "15–20", desc: "Pre-production samples produced to specification", color: "bg-emerald-500" },
  { stage: "Bulk Production", days: "45–70", desc: "From confirmed PO and approved sample", color: "bg-teal-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection before vessel loading", color: "bg-sky-500" },
  { stage: "Sea Freight", days: "20–30", desc: "FCL/LCL from Karachi or Port Qasim", color: "bg-indigo-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton across all constructions. Fully traceable from farm to finished bedsheet.", tag: "GOTS" },
  { icon: "💧", title: "Water Efficiency", desc: "Enzyme finishing replaces stone washing — significantly lower water consumption and zero stone dust waste.", tag: "Process" },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester blends available for institutional and performance bedding programmes.", tag: "GRS" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited factories. Worker welfare, safety and fair wage compliance independently verified.", tag: "BSCI / Sedex" },
  { icon: "🎨", title: "Low-Impact Dyes", desc: "Reactive dyeing with OEKO-TEX certified chemicals only. No azo dyes, no restricted substances in any finished bedsheet.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybags, FSC-certified paper boxes and biodegradable packaging available on request.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share construction, TC, size, decoration, quantity and target delivery date via our RFQ form. The more detail, the faster we respond." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We evaluate and shortlist 2–3 certified Pakistan weaving mills whose construction specialisation and capacity align with your bedsheet programme. Pricing in 3–5 days." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Pre-production samples produced to your specification. 15–20 days from spec lock and fabric approval. Jacquard patterns allow additional lead time." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review construction, thread count feel, colour accuracy and label placement. Revise as required before purchase order placement." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Fabric weaving, dyeing and cut-and-sew commences from confirmed PO. Duration depends on construction, TC, quantity and factory scheduling." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection, packing and loading to your incoterm. FCL or LCL from Karachi or Port Qasim to your nominated port." },
];

const FAQS = [
  {
    q: "What thread count should I order for retail bedsheets?",
    a: "For mainstream retail programmes, 300–400 TC percale is the industry standard — it balances hand feel, durability and price point. For premium retail, 400–600 TC sateen delivers the smooth, silky surface associated with luxury bedding. A key buyer note: thread count above 400 does not automatically mean softer — yarn quality (combed vs carded cotton, ring-spun vs open-end) matters more than the raw TC number.",
  },
  {
    q: "What's the difference between percale and sateen bedsheets?",
    a: "Percale uses a one-over-one-under plain weave — the result is a crisp, matte surface that feels cool to the touch and stays crisp after washing. Sateen uses a four-over-one-under weave — more thread surface is exposed, creating a silky sheen and smooth drape. Percale is the dominant construction for USA hotel programmes and UK mainstream retail. Sateen dominates European premium retail and luxury hotel collections.",
  },
  {
    q: "Can you supply both UK and US standard bed sizes?",
    a: "Yes. All standard sizes are available: US (Twin through Cal King), UK (Single through Super King), European (EU Single 140×200cm through EU Super King 240×220cm), and custom dimensions. We recommend confirming your actual mattress dimensions before locking cut specs — UK and EU nominal sizes can vary slightly between markets.",
  },
  {
    q: "Are your Pakistan bedsheets OEKO-TEX certified?",
    a: "Yes. OEKO-TEX Standard 100 is available across all standard constructions. GOTS certification is available for 100% organic cotton variants. For EU and UK buyers where chemical compliance is scrutinised at import — particularly for bedding in contact with skin — we recommend specifying OEKO-TEX as a hard requirement in your RFQ.",
  },
  {
    q: "What order quantities work for custom bedsheet programmes?",
    a: "Order quantities vary significantly depending on fabric construction, colour programme, factory scheduling and seasonal demand. There is no single universal figure. The best approach is to include your target quantity in your RFQ. We match you with factories whose production capacity aligns with your programme size, and can advise on the most cost-efficient quantity structure for your specific construction and colour combination.",
  },
  {
    q: "How long does a custom bedsheet sample take?",
    a: "15–20 days from specification lock and fabric approval for percale and sateen. Jacquard patterns require loom programming before sampling begins — allow an additional 5–10 days. For colour-critical programmes, lab dip approval should be completed before sampling commences to avoid rework.",
  },
  {
    q: "Can you source microfiber bedsheets for budget hospitality programmes?",
    a: "Yes. Microfiber (100% polyester) bedsheets at 80–120 GSM are available for budget hospitality, institutional and high-volume programmes. Microfiber is measured in GSM rather than thread count, dries faster than cotton and requires no ironing — making it the preferred specification for high-turnover hotel programmes in the Middle East, Southeast Asia and South America. Note that microfiber is not eligible for GOTS or organic cotton certification; OEKO-TEX Standard 100 applies for chemical safety compliance.",
  },
  {
    q: "What is the difference between woven and knitted bedsheets?",
    a: "Woven bedsheets (percale, sateen, jacquard, oxford, flannel, linen) are made on looms by interlacing warp and weft threads — the result is a structured, dimensionally stable fabric measured in thread count. Knitted bedsheets (jersey knit) are made by interlocking yarn loops — the same process as T-shirt fabric — producing a stretchy, soft sheet measured in GSM. Woven constructions dominate hotel and retail programmes for their durability and crispness. Jersey knit is preferred in DTC casual bedding and children's ranges for its stretch, softness and ease of use.",
  },
];

const PAGE_BOXES = [
  { title: "Fitted Sheets", desc: "Elasticated fitted sheets in percale and sateen. Pocket depths to 26 inches for all mattress types.", image: "/images/hero/hero-fitted-sheets.webp", alt: "Pakistan fitted sheet manufacturer — deep pocket elasticated sheets for hotels and retail", href: "/hometextile/bedlinen/fittedsheets/", cta: "Explore Fitted Sheets" },
  { title: "Duvet Covers", desc: "Custom duvet covers in percale, sateen and jacquard. Button, zip and envelope closure options.", image: "/images/hero/hero-duvet-covers.webp", alt: "Pakistan duvet cover manufacturer — custom comforter covers for wholesale export", href: "/hometextile/bedlinen/duvetcovers/", cta: "Explore Duvet Covers" },
  { title: "Pillow Covers", desc: "Cotton and linen pillowcases in standard and oxford flange styles with multiple closure options.", image: "/images/hero/hero-pillow-covers.webp", alt: "Pakistan pillow cover manufacturer — custom pillowcases for wholesale buyers", href: "/hometextile/bedlinen/pillowcovers/", cta: "Explore Pillow Covers" },
  { title: "Cushion Covers", desc: "Decorative cushion covers in woven, printed and embroidered styles for home furnishing buyers.", image: "/images/hero/hero-cushion-covers.webp", alt: "Pakistan cushion cover manufacturer — decorative throw pillow covers wholesale", href: "/hometextile/bedlinen/cushioncovers/", cta: "Explore Cushion Covers" },
  { title: "Curtains", desc: "Custom woven, jacquard and blackout curtains with choice of heading type and lining options.", image: "/images/hero/hero-curtains.webp", alt: "Pakistan curtain manufacturer — custom woven and blackout curtains wholesale export", href: "/hometextile/bedlinen/curtains/", cta: "Explore Curtains" },
  { title: "Institutional Bedding", desc: "Commercial-grade bedding sets for hotels, hospitals and airlines rated for 200+ wash cycles.", image: "/images/hero/hero-institutional-bedding.webp", alt: "Pakistan institutional bedding manufacturer — hotel and hospital linen sets wholesale", href: "/hometextile/bedlinen/institutionalbedding/", cta: "Explore Institutional Bedding" },
];

// ─── Main component ────────────────────────────────────────────────────────────

export default function BedsheetContent() {
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
            src="/images/hero/hero-bedsheets.webp"
            fill
            alt="Pakistan bedsheet manufacturer — wholesale cotton percale and sateen bedsheets for USA, UK and Europe"
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
              <Link href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/bedlinen/" className="hover:text-gold transition-colors">Bed Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Bedsheets</span>
            </motion.nav>
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
              Bedsheet
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
              MZ Global Trading connects international brands with Pakistan&rsquo;s
              certified mills. Cotton percale, sateen, jacquard, oxford, flannel
              and linen bedsheets — plus microfiber and jersey knit.
              200&ndash;600 TC. GOTS, OEKO-TEX, BSCI certified. FOB / CIF export.
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
                Bedsheet Supply — Pakistan Home Textiles
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Pakistan Bedsheet Sourcing — Complete Range, Certified Factories
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s certified mills supply the full bedsheet material range —
                from percale, sateen and jacquard through to microfiber and jersey knit.
                Every construction available in custom sizes, colours and packaging for
                USA, UK, Europe, Middle East and Southeast Asia buyers.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "8", label: "Constructions" },
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
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-emerald-600 text-xs font-semibold tracking-[0.2em] uppercase">Construction</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Weave Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3.5 border border-emerald-100">
                    <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.tcRange}</p>
                    <p className="text-xs text-emerald-600 mt-1 leading-tight">{c.best[0]}</p>
                    {c.badge && (
                      <span className="mt-1.5 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>
                    )}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📏</span>
                <div>
                  <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Thread Count</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Thread Count Selection</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {TC_TIERS.map((t) => (
                  <div key={t.tc} className="bg-white rounded-xl p-3 border border-teal-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-navy-900">{t.tc} TC</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Most Ordered</span>}
                    </div>
                    <div className="w-full h-1.5 bg-teal-100 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] font-semibold text-teal-600">{t.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{t.market}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-tc" label="View Thread Count Guide" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">📐</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Size Guide</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Bed Size Standards</h3>
              <div className="flex flex-col gap-2 flex-1">
                {[...BED_SIZES_US.slice(0, 2), ...BED_SIZES_UK.slice(2, 4)].map((s) => (
                  <div key={s.name} className="bg-white rounded-lg px-3 py-2 border border-sky-100">
                    <p className="text-xs font-semibold text-navy-900">{s.name}</p>
                    <p className="text-[10px] text-gray-400">{s.dim}</p>
                  </div>
                ))}
                <p className="text-[10px] text-sky-600 font-semibold mt-1">US · UK · EU all available</p>
              </div>
              <ExploreBtn sectionId="section-sizes" label="View All Sizes" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Design</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Embellishment Options</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EMBELLISHMENTS.map((e) => (
                  <div key={e.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-amber-50">
                    <span className="w-6 h-6 rounded bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{e.code}</span>
                    <p className="text-xs font-semibold text-navy-900">{e.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-embellishments" label="Explore Designs" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]">
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Programs</h3>
              <div className="flex flex-col gap-3 flex-1">
                {DYE_OPTIONS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-3 border border-rose-50">
                    <p className="text-xs font-semibold text-navy-900 mb-1.5">{d.name}</p>
                    <div className="flex gap-1.5">
                      {d.swatches.map((s, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${s}`} aria-hidden="true" />
                      ))}
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

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Industry Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-indigo-100">
                    <p className="text-xs font-bold text-indigo-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5">{s.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.market}</p>
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
                    <span className="text-[10px] font-semibold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full w-fit">{s.tag}</span>
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
            <Link href="/knowledge/bedsheet-thread-count-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Thread Count Guide for Bedsheets</p>
              <p className="text-xs text-gray-500 leading-relaxed">What 200 to 1000TC means for buyers — percale vs. sateen comparison table across all market tiers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link href="/guides/sourcing-bedsheets-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Sourcing Bedsheets from Pakistan</p>
              <p className="text-xs text-gray-500 leading-relaxed">8-step process from RFQ to delivery — fabric options, certifications and lead times for USA, UK, EU and Middle East buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Guide →</span>
            </Link>
            <Link href="/downloads/bedsheet-size-chart-international/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">International Bedsheet Size Chart</p>
              <p className="text-xs text-gray-500 leading-relaxed">Finished flat sheet dimensions across UK, USA, EU, Middle East and Australia — for use with RFQ submissions and Tech Packs.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Download →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Bedsheets?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction and TC confirmed — RFQ takes 3 minutes. Factory match and quotation returned within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — WEAVE CONSTRUCTIONS — BRUTALIST UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-constructions" className="bg-[#1A0A00] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-gold pl-6 mb-12">
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-2">
              ◼ WEAVE CONSTRUCTION DATABASE
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Fabric Weave Constructions</h2>
            <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">
              Bedsheets fall into two categories: <span className="text-white font-semibold">woven</span> (percale, sateen, jacquard, oxford, flannel, linen — structured, stable, measured in TC) and <span className="text-white font-semibold">knitted</span> (jersey knit — stretchy, casual, measured in GSM). Microfiber is a woven polyester construction also measured in GSM. Each structure has a distinct hand feel, market positioning and washing durability.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mb-8" role="tablist">
            {CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeConstruction === c.id}
                onClick={() => setActiveConstruction(c.id)}
                className={`px-5 py-2.5 rounded-none text-sm font-black uppercase border-2 transition-all ${
                  activeConstruction === c.id
                    ? "bg-gold text-navy-900 border-gold"
                    : "bg-transparent text-gray-300 border-white/20 hover:border-gold/60"
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
              <div className="lg:col-span-2 border-2 border-white/10 rounded-none p-8">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-black text-white uppercase">{ac.name}</h3>
                  {ac.badge && (
                    <span className="text-xs font-black text-gold border-2 border-gold px-3 py-1 uppercase tracking-widest">{ac.badge}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border border-white/10 p-4">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">TC_RANGE</p>
                    <p className="text-2xl font-black text-gold">{ac.tcRange}</p>
                  </div>
                  <div className="border border-white/10 p-4">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">HAND_FEEL</p>
                    <p className="text-sm text-white font-semibold">{ac.hand}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{ac.detail}</p>
                <div className="border border-white/10 p-4">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">TECHNICAL_SPEC</p>
                  <p className="text-sm text-gray-300">{ac.spec}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="border border-white/10 p-6">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">BEST_FOR[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.best.map((b) => <span key={b} className="text-xs text-white border border-white/20 px-3 py-1">{b}</span>)}
                  </div>
                </div>
                <div className="border border-white/10 p-6">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">KEY_MARKETS[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ac.markets.map((m) => <span key={m} className="text-xs text-gold border border-gold/30 px-3 py-1">{m}</span>)}
                  </div>
                </div>
                <div className="border border-white/10 p-6">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">DECORATION[ ]</p>
                  <div className="flex flex-col gap-1.5">
                    {ac.decorations.map((d) => (
                      <div key={d} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold" aria-hidden="true" />
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
          SECTION 2 — THREAD COUNT — SPLIT-SCREEN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-tc" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-xs">
            {/* Left panel — dark navy */}
            <div className="bg-[#0D1B2A] p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Thread Count</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                Understanding Thread Count for Retail Bedsheets
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Thread count (TC) measures the number of threads per square inch — warp plus weft. Higher TC means more threads packed into the same area, which generally produces a finer, smoother hand feel. However, TC alone does not determine quality.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Yarn quality matters more than raw TC. A 200 TC sheet made from ring-spun combed cotton will outperform a 400 TC sheet made from multi-ply twisted yarns inflating the TC number artificially. For international buyers, specifying the yarn quality alongside TC is critical to receiving what the market expects.
              </p>
              <div className="border border-gold/30 rounded-xl p-4 bg-gold/5 mb-4">
                <p className="text-gold text-xs font-bold uppercase tracking-wider mb-2">Buyer Note</p>
                <p className="text-gray-300 text-xs leading-relaxed">Higher TC does not always mean softer. Request yarn specification (ring-spun / open-end, combed / carded, single / multi-ply) alongside TC when evaluating supplier quotes.</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                <p className="text-white text-xs font-bold uppercase tracking-wider mb-2">GSM vs Thread Count</p>
                <p className="text-gray-400 text-xs leading-relaxed">Microfiber and jersey knit bedsheets are measured in GSM (grams per square metre), not thread count. TC applies only to woven constructions. Specify GSM when requesting quotes for microfiber or jersey programmes.</p>
              </div>
            </div>
            {/* Right panel — white */}
            <div className="bg-white p-10 lg:p-14">
              <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-6">TC Tiers — Commercial Reference</p>
              <div className="flex flex-col gap-5">
                {TC_TIERS.map((t) => (
                  <div key={t.tc} className={`rounded-2xl p-6 border-2 ${t.featured ? "border-gold shadow-lg" : "border-gray-100"}`}>
                    {t.featured && <span className="inline-block mb-2 text-[10px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>}
                    <div className="flex items-baseline gap-3 mb-2">
                      <p className={`text-2xl font-bold ${t.featured ? "text-gold" : "text-navy-900"}`}>{t.tc} TC</p>
                      <p className="text-xs font-semibold text-gray-400 uppercase">{t.name}</p>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                      <div className={`h-full rounded-full ${t.featured ? "bg-gold" : "bg-navy-900/30"}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
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
          SECTION 3 — BED SIZE STANDARDS — GRID UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sizes" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Size Guide</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">International Bed Size Standards</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">All standard US, UK and EU bed sizes available. Custom dimensions on request — confirm mattress dimensions before locking specifications.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { market: "🇺🇸 United States / Canada", sizes: BED_SIZES_US, color: "border-blue-200 bg-blue-50", badge: "bg-blue-100 text-blue-700", heading: "text-blue-700" },
              { market: "🇬🇧 United Kingdom / Australia", sizes: BED_SIZES_UK, color: "border-red-200 bg-red-50", badge: "bg-red-100 text-red-700", heading: "text-red-700" },
              { market: "🇪🇺 Europe", sizes: BED_SIZES_EU, color: "border-indigo-200 bg-indigo-50", badge: "bg-indigo-100 text-indigo-700", heading: "text-indigo-700" },
            ].map((col) => (
              <div key={col.market} className={`rounded-2xl border-2 ${col.color} p-6`}>
                <h3 className={`text-sm font-bold ${col.heading} mb-4`}>{col.market}</h3>
                <div className="flex flex-col gap-3">
                  {col.sizes.map((s) => (
                    <div key={s.name} className="bg-white rounded-xl p-4 border border-white shadow-xs">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold text-navy-900">{s.name}</p>
                        <span className={`text-[10px] font-bold ${col.badge} px-2 py-0.5 rounded-full whitespace-nowrap`}>{s.dim}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{s.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-navy-900 rounded-2xl p-6 text-center">
            <p className="text-white text-sm font-semibold mb-1">Custom Sizes Available</p>
            <p className="text-gray-300 text-xs">Provide your exact dimensions in the RFQ — all non-standard cuts supported.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — EMBELLISHMENT — RETAIL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-embellishments" className="bg-[#F8F6F2] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Design</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Design &amp; Embellishment Options</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">From plain solids to woven jacquard — the right embellishment positions your bedsheet at the correct retail price tier and market segment.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EMBELLISHMENTS.map((e, i) => (
              <motion.div
                key={e.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center shrink-0">
                  <span className="text-gold text-xs font-bold">{e.code}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">{e.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{e.best}</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Best Market</p>
                  <p className="text-xs text-navy-900 font-semibold">{e.market}</p>
                </div>
                <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">{e.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOURS — GRADIENT UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-colors" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-[#0D3B2A] to-[#0D1B2A]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Colour Programs for Custom Bedsheets</h2>
          <p className="text-white/60 mb-12 max-w-2xl leading-relaxed">Every construction is available in full PMS colour matching. Lab dip approval is submitted before bulk production begins. ISO 105 X12 colour fastness maintained.</p>
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
            {["bg-white","bg-stone-100","bg-stone-300","bg-sky-200","bg-blue-300","bg-indigo-400","bg-emerald-400","bg-teal-400","bg-amber-300","bg-rose-300","bg-slate-700","bg-slate-900"].map((c, i) => (
              <div key={i} className={`h-10 rounded-xl ${c} opacity-90 border border-white/10`} aria-hidden="true" />
            ))}
          </div>
          <p className="text-white/40 text-xs mt-3 text-center">Illustrative bedsheet palette — full PMS range available via reactive dyeing</p>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — OEM — CORPORATE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM &amp; Custom</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Custom Bedsheet Development Programs</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every aspect of your bedsheet programme — from thread count and weave to size chart, colour, label and retail packaging — can be specified to your brand requirements. We manage to your exact specification.
              </p>
              <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-800 transition-colors">
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
                  className="border border-gray-100 rounded-2xl p-6 hover:border-gold hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">{f.num}</span>
                    <h3 className="text-sm font-bold text-navy-900">{f.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
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
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Market Applications</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Bedsheet Market Sectors &amp; Applications</h2>
          <p className="text-gray-400 mb-10 max-w-2xl leading-relaxed">Pakistan bedsheets serve every major B2B bedding segment — from institutional hotel programmes to premium DTC brands.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-3 hover:border-gold/40 hover:bg-white/8 transition-all cursor-default"
              >
                <span className="w-12 h-12 rounded-xl bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">{s.abbr}</span>
                <h3 className="text-lg font-bold text-white">{s.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">{s.detail}</p>
                <p className="text-xs font-semibold text-gold">{s.market}</p>
              </motion.div>
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
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Standards</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Quality &amp; Compliance Certifications</h2>
              <div className="bg-navy-900 rounded-2xl p-8 text-center mb-6">
                <p className="text-6xl font-black text-gold">10+</p>
                <p className="text-white text-sm font-semibold mt-2">Active certifications across our factory network</p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">Our verified factory network holds the certifications that international retailers, hotel chains and import compliance teams require. Specify your required certification in your RFQ.</p>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4">
                {CERTIFICATIONS.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-center gap-5 p-4 rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-xs transition-all"
                  >
                    <div className="w-16 h-10 shrink-0 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                      <Image src={c.img} alt={`${c.name} certification logo`} width={56} height={32} className="object-contain w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-navy-900">{c.name}</h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.tier === "Premium" ? "bg-gold/15 text-gold" : c.tier === "Standard" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{c.tier}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{c.full}</p>
                      <p className="text-xs text-gray-500 leading-relaxed mt-1">{c.desc}</p>
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
          SECTION 9 — EXPORT & PACKAGING — SWISS DESIGN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-12">
            <div className="w-16 h-px bg-navy-900 mt-4 hidden sm:block" aria-hidden="true" />
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Export Terms</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Export &amp; Packaging Options</h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-12">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">Incoterms — Bedsheet Export</p>
              <div className="flex flex-col gap-0 divide-y divide-gray-100">
                {EXPORT_TERMS.map((e, i) => (
                  <div key={e.term} className="py-5 flex gap-6 items-start">
                    <div className="shrink-0 w-14 text-right">
                      <p className="text-3xl font-black text-gray-100 leading-none">0{i + 1}</p>
                      <p className="text-xs font-bold text-gold mt-1">{e.term}</p>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-bold text-navy-900 mb-1">{e.full}</h3>
                      <p className="text-xs text-gold font-semibold mb-1">{e.port}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">Packaging Options</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {PACK_OPTIONS.map((p) => (
                  <div key={p.label} className="bg-white rounded-xl p-4 border border-gray-100 flex items-start gap-3">
                    <span className="text-xl" aria-hidden="true">{p.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{p.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-3">Lead Time Overview (Indicative)</p>
              <div className="flex flex-col gap-2">
                {LEAD_STAGES.map((s) => (
                  <div key={s.stage} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.color}`} aria-hidden="true" />
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-navy-900">{s.stage}</p>
                      <span className="text-xs font-bold text-gray-500 shrink-0">{s.days} days</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <p className="text-xs text-amber-800 leading-relaxed">Lead times are indicative only and subject to factory scheduling, material availability and order complexity.</p>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABILITY — SCANDINAVIAN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="py-20 lg:py-28" style={{ backgroundColor: "#F7FAF8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: "#4a7c59" }}>Ethics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Sustainable Bedsheet Sourcing</h2>
          <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">Responsible sourcing is built into our factory selection criteria. Every certification requirement, material claim and ethical standard can be specified in your RFQ.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className="bg-white rounded-2xl p-7 border border-green-100 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: "#e6f4ec", color: "#4a7c59" }}>{s.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#5a6672" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — PROCESS — CARD-BASED UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">How We Source Your Bedsheet Programme</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">A structured, transparent sourcing process from initial RFQ through factory selection, sampling, production and export.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="border-2 border-gray-100 rounded-2xl p-7 hover:border-gold hover:shadow-xs transition-all flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-navy-900 text-gold text-sm font-bold flex items-center justify-center shrink-0">{p.num}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{p.short}</p>
                    <h3 className="text-base font-bold text-navy-900">{p.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
            <p className="text-xs text-amber-800 leading-relaxed">Lead times are indicative only and subject to factory scheduling, material availability and order complexity. Jacquard construction programmes require additional lead time for loom programming.</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Bedsheet Sourcing — Frequently Asked Questions</h2>
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
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow"
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Source Custom Bedsheets?</h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              Share your construction, thread count and size requirements — our team responds within 24 hours with factory matches and indicative pricing.
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
