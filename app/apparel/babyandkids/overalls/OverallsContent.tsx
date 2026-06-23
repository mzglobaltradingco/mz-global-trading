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
          dark ? "border border-gold/60 text-gold hover:bg-gold hover:text-navy-900" : "border-2 border-gold text-navy-900 hover:bg-gold shadow-xs"
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
    <button onClick={() => scrollToId(sectionId)} className="group self-start inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold transition-colors mt-auto pt-4">
      {label}
      <span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">→</span>
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  {
    id: "stretch-denim",
    name: "Stretch Denim",
    badge: "Most Popular",
    weight: "7–10 oz",
    note: "98/2 cotton-spandex — comfortable all-day wear for active babies and toddlers",
    best: ["USA Retail", "EU Kids Fashion", "DTC Baby Brands"],
    detail: "Stretch denim (98% cotton / 2% spandex) is the dominant construction for baby and toddler overalls — it delivers the classic denim look with the stretch and recovery needed for diaper changes and crawling. 7–9 oz is the standard weight for infant/toddler; 9–10 oz for older kids. Stone wash and enzyme wash finishes are standard.",
    spec: "98% cotton / 2% spandex denim. 7–10 oz. Stone wash, enzyme wash or raw. Azo-free dyes. OEKO-TEX Class 1 available.",
    icon: "👖",
  },
  {
    id: "rigid-denim",
    name: "Rigid Denim",
    badge: "Classic Look",
    weight: "8–12 oz",
    note: "100% cotton — structured, durable, traditional dungaree look",
    best: ["EU Classic", "UK Heritage", "Premium Kidswear"],
    detail: "Rigid 100% cotton denim produces the traditional structured dungaree look — preferred in EU heritage kidswear and UK premium baby retail. Heavier weights (10–12 oz) are used for older kids (4+). Enzyme and stone wash finishes soften the hand feel. GOTS organic denim available for premium programmes.",
    spec: "100% ring-spun cotton denim. 8–12 oz. Various washes available. GOTS organic cotton option.",
    icon: "🔷",
  },
  {
    id: "canvas",
    name: "Canvas / Twill",
    badge: "Durable Choice",
    weight: "240–340 gsm",
    note: "Heavy cotton — ideal for play overalls and workwear-inspired kids styles",
    best: ["Play Overalls", "Workwear Style Kids", "USA/EU Utility"],
    detail: "Cotton canvas and twill overalls position in the workwear-inspired kids fashion segment — growing in US and EU retail. More structured than denim, canvas overalls have an outdoor, utilitarian aesthetic. Sand and khaki are the leading colourways; earth tones suit the utility-kidswear aesthetic well.",
    spec: "100% cotton canvas or twill. 240–340 GSM. Reactive dyed in utility tones. OEKO-TEX certified available.",
    icon: "🏗️",
  },
  {
    id: "corduroy",
    name: "Corduroy",
    badge: "A/W Premium",
    weight: "200–300 gsm",
    note: "Soft ribbed texture — vintage aesthetic, popular in A/W collections",
    best: ["A/W Kids Collections", "EU/UK Premium", "Vintage Style"],
    detail: "Corduroy overalls are a perennial A/W staple in European kidswear — the ribbed texture and warm hand feel suit the season perfectly. Fine-wale corduroy (8–10 wale) is preferred for baby and toddler sizes; medium-wale for school-age. Earthy tones (mustard, terracotta, forest green, burgundy) drive sales in EU boutique and UK kids retail.",
    spec: "100% cotton corduroy. 200–300 GSM. 8–10 wale (fine) for infant/toddler. Reactive dyed in seasonal palette.",
    icon: "🍂",
  },
  {
    id: "linen-blend",
    name: "Linen / Linen Blend",
    badge: "Summer & Organic",
    weight: "150–220 gsm",
    note: "Breathable, natural linen — ideal for warm-weather collections",
    best: ["Summer Collections", "Organic Brands", "Australia/EU"],
    detail: "Linen and linen-cotton blend overalls are gaining traction in organic baby brands and Australian/EU summer collections. The open weave and natural fibre deliver excellent breathability for warm-weather wear. Typically sold in natural undyed tones or soft pastels. GOTS-certified linen programmes available for organic kidswear brands.",
    spec: "100% linen or 55% linen / 45% cotton blend. 150–220 GSM. Natural or reactive dyed. GOTS certified option.",
    icon: "🌾",
  },
];

const AGE_SIZE_GUIDE = [
  { tag: "NB–3M", group: "Newborn", chest: "40–46 cm", height: "Up to 62 cm", note: "Snap crotch essential; envelope-style bib for easy dressing" },
  { tag: "3–9M", group: "Infant", chest: "46–50 cm", height: "62–74 cm", note: "Adjustable straps critical at this stage — body grows fast" },
  { tag: "9–18M", group: "Baby", chest: "50–54 cm", height: "74–86 cm", note: "Crawler-friendly fit — stretch denim or canvas preferred" },
  { tag: "18M–3Y", group: "Toddler", chest: "54–60 cm", height: "86–100 cm", note: "Wide leg opening for diaper/pull-up changes" },
  { tag: "3–6Y", group: "Pre-School", chest: "60–68 cm", height: "100–122 cm", note: "Standard adjustable strap system; all constructions viable" },
  { tag: "6–12Y", group: "School", chest: "68–82 cm", height: "122–152 cm", note: "Crosses into junior sizing; denim and corduroy most popular" },
];

const GSM_TIERS = [
  { weight: "7–9 oz / 150–200 gsm", name: "Light–Mid Weight", season: "Year-Round Infant", market: "USA · EU · Australia", pct: 70, desc: "Stretch denim, linen. Primary weight for infant and toddler — comfortable all-day wear.", color: "bg-amber-300", featured: false },
  { weight: "9–11 oz / 200–280 gsm", name: "Mid Weight", season: "Year-Round Kids", market: "USA · UK · EU — primary range", pct: 90, desc: "Standard denim, canvas and corduroy. Covers toddler through school-age across all major markets.", color: "bg-gold", featured: true },
  { weight: "11–14 oz / 280–340 gsm", name: "Heavy Weight", season: "A/W Premium", market: "UK · EU · Canada · Nordics", pct: 45, desc: "Heavy rigid denim and canvas for structured A/W kids collections and premium heritage brands.", color: "bg-orange-700", featured: false },
];

const DECO_METHODS = [
  { code: "EMB", method: "Embroidery", best: "Logo, name, character — bib pocket and strap placements", note: "Primary decoration on kids overalls. Clean results on all constructions." },
  { code: "SCR", method: "Screen Print", best: "Graphic motifs on bib front", note: "Water-based inks for OEKO-TEX compliance. Best on canvas and poplin bibs." },
  { code: "APP", method: "Appliqué", best: "Character patches, brand motifs, dimensional designs", note: "Bonded or sewn. Popular in boutique baby and EU premium kids." },
  { code: "LZR", method: "Laser Etch (denim)", best: "Distress effects, pattern etching on denim only", note: "No chemical distressing — laser provides eco-friendly alternative. Denim constructions only." },
];

const DYE_OPTIONS = [
  { name: "Indigo / Dark Wash Denim", subtitle: "Classic Denim Tones", note: "Indigo warp denim, stone-washed to mid and dark wash. Primary colourway for USA and EU kidswear denim.", swatches: ["bg-indigo-900", "bg-indigo-700", "bg-indigo-500", "bg-blue-400", "bg-slate-500"] },
  { name: "Utility / Earth Tones", subtitle: "Canvas & Corduroy Palette", note: "Khaki, sand, forest green, terracotta, burgundy — leading colours in workwear-inspired kids and A/W corduroy.", swatches: ["bg-amber-700", "bg-stone-500", "bg-green-700", "bg-red-800", "bg-yellow-600"] },
  { name: "Seasonal / Fashion Pastels", subtitle: "S/S Kids Collections", note: "Dusty pink, sky blue, mint, lilac, cream — common in spring/summer EU and Australian kids retail.", swatches: ["bg-rose-200", "bg-sky-200", "bg-green-200", "bg-purple-200", "bg-yellow-100"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic cotton denim and linen traceability — required for organic claims in EU and USA", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100 — Class 1", desc: "Strictest chemical safety standard — applies to all baby and infant overalls", tier: "Essential", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Ethical production audit — labour standards verified", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Labour, health, safety and environment data sharing", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Consistent production quality and process control", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle manufacturing compliance", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Responsible cotton farming for conventional denim programmes", tier: "Optional", img: "/images/certs/cert-bci.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Snap Crotch & Diaper-Access Design", desc: "Snap closures at crotch seam standard on infant and toddler sizes. Wide leg opening options for older toddler pull-up access." },
  { num: "02", title: "Adjustable Strap System", desc: "Button, metal clip or elastic-loop adjustable strap systems — quick adjustment as baby grows. Custom hardware to your design." },
  { num: "03", title: "Bib Pocket Development", desc: "Patch pocket, kangaroo pocket and double-bib pocket configurations. Embroidery or appliqué development on bib to your artwork." },
  { num: "04", title: "Full Age Grading", desc: "Graded patterns from newborn through 12 years in US, UK and EU sizing. Custom grading to your size chart on request." },
  { num: "05", title: "Wash Development", desc: "Stone wash, enzyme wash, sand wash, raw and overdye finishes — matched to your seasonal brief and pantone swatch." },
  { num: "06", title: "Label & Packaging", desc: "Woven labels, care labels, hang tags and retail-ready packaging — polybag, hanger or gift box — to your brand specification." },
];

const SECTORS = [
  { abbr: "KB", name: "Kids Boutiques", detail: "Premium denim and corduroy overalls for independent baby boutiques and premium kids retail in EU and USA", market: "EU · USA · Australia" },
  { abbr: "MC", name: "Mass & Chain", detail: "Multi-pack canvas and stretch denim overalls for high-street and mass-market kids retailers", market: "USA · UK · EU" },
  { abbr: "DT", name: "DTC Baby Brands", detail: "Custom-branded overalls for direct-to-consumer Shopify and Amazon kids brands", market: "USA · UK · EU" },
  { abbr: "WD", name: "Wholesale Distributors", detail: "Multi-SKU overalls programmes for regional kids clothing distributors", market: "USA · EU · Middle East" },
  { abbr: "SU", name: "School Uniform", detail: "Canvas and denim dungarees for school uniform programmes, particularly UK and Middle East", market: "UK · Middle East" },
  { abbr: "OB", name: "Organic Brands", detail: "GOTS linen and organic cotton overalls for eco-conscious baby and kids brands in EU, Japan and Australia", market: "EU · Japan · Australia" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Most common for buyers with their own freight forwarder." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange ocean freight and marine insurance." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight; buyer arranges insurance." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory gate." },
];

const PACK_OPTIONS = [
  { icon: "📦", label: "Individual Polybag", note: "Standard bulk" },
  { icon: "🪝", label: "Hanger + Polybag", note: "Retail-ready" },
  { icon: "🎁", label: "Gift Box", note: "Premium / gifting" },
  { icon: "📋", label: "2-Pack Set", note: "Value retail format" },
  { icon: "🏷️", label: "Header Card Pack", note: "EU & US retail" },
  { icon: "✏️", label: "Custom Pack", note: "To your brief" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Factory shortlist, pricing and certification confirmation", color: "bg-gold" },
  { stage: "Sample Production", days: "14–21", desc: "Overalls samples — construction, wash, hardware and decoration", color: "bg-orange-500" },
  { stage: "Bulk Production", days: "40–60", desc: "From confirmed PO and approved sample", color: "bg-amber-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pre-shipment inspection including hardware and snap testing", color: "bg-blue-500" },
  { stage: "Sea Freight", days: "18–28", desc: "FCL/LCL from Karachi or Port Qasim", color: "bg-indigo-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "GOTS Organic Denim", desc: "GOTS-certified organic cotton denim for eco-conscious overalls brands. Full traceability from farm to finished garment.", tag: "GOTS" },
  { icon: "🧪", title: "OEKO-TEX Class 1", desc: "Mandatory for all infant and baby overalls — 100+ substance test at the strictest baby-specific thresholds.", tag: "OEKO-TEX" },
  { icon: "💧", title: "Eco Wash Processes", desc: "Enzyme wash replaces pumice stone — 60% less water. Laser distress replaces chemical spray. Both reduce environmental load significantly.", tag: "Process" },
  { icon: "♻️", title: "BCI Better Cotton", desc: "Conventional denim programmes source from BCI-enrolled farms — improved water use and reduced pesticide application.", tag: "BCI" },
  { icon: "🏭", title: "Audited Factory Network", desc: "BSCI and Sedex audited denim and woven garment factories. Fair wages, safe conditions independently verified.", tag: "BSCI" },
  { icon: "🔩", title: "Lead-Free Hardware", desc: "All metal buttons, snaps and clips tested to OEKO-TEX Class 1 heavy metal limits — no lead, no nickel release above threshold.", tag: "Hardware" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "RFQ", desc: "Share construction, wash, size range, hardware, decoration, quantity and target market. Denim wash briefs benefit from reference swatches." },
  { num: "02", title: "Factory Matching", short: "Shortlist", desc: "We match to 2–3 Pakistan denim and woven garment factories with certified baby production capability and OEKO-TEX testing." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Overalls sample — construction, wash development, snap hardware, embroidery/appliqué and size. 14–21 days from spec lock." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review construction, wash tone, fit, hardware and decoration. Wash approval is a critical step — denim results vary between dye lots." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Production with inline QC checks on seams, snaps and hardware. Full size-range inspection before packing." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pre-shipment inspection includes snap and button pull-test. Full export documentation including GOTS TCs and test reports if required." },
];

const FAQS = [
  {
    q: "What are the essential design features for infant and baby overalls?",
    a: "Snap crotch closure is non-negotiable for infant and toddler sizes (0–3 years) — it allows diaper changes without undressing the baby. Adjustable shoulder straps (button, clip or elastic loop) accommodate rapid growth. Wide leg openings help for pull-up access in older toddlers. Envelope-style or wide bib necklines allow the garment to be put on over the head without the baby's arms in — standard for newborn and infant sizes. All hardware (snaps, buttons, clips) must be OEKO-TEX tested for heavy metal limits.",
  },
  {
    q: "What denim weight is right for baby overalls versus older children?",
    a: "For infant and toddler sizes (0–3 years): 7–9 oz stretch denim (98/2 cotton-spandex) is preferred — stretch provides comfort during crawling and diaper changes. For pre-school and school-age (3–12 years): 9–12 oz rigid denim or stretch denim works well. Heavier weights (10–12 oz) are typically restricted to older kids (6+) where the additional structure is practical rather than restricting. Corduroy (8–10 wale) and canvas (240–280 GSM) are good alternatives to denim for infant and toddler — they are softer and easier to move in.",
  },
  {
    q: "Can overalls be produced in organic cotton or linen for eco-conscious brands?",
    a: "Yes. GOTS-certified organic cotton denim is available for both stretch and rigid constructions — full chain-of-custody documentation from certified farm through weaving and garment production. GOTS-certified organic linen and linen-cotton blends are available for summer and warm-weather overalls programmes. For any 'organic' claim on product labelling or retailer compliance, GOTS certification at the garment level is required — not just organic fibre content.",
  },
  {
    q: "What wash treatments are available for denim overalls?",
    a: "Standard washes: stone wash (medium-dark to light blue), enzyme wash (softer hand, subtle fade), sand wash (even fade, smooth surface), overdye (coloured over indigo for fashion tones). Eco alternatives: enzyme wash replaces pumice stone reducing water consumption; laser distress creates fading and whiskering effects without chemical spray. Raw/unwashed is available for darker indigo and rigid denim programmes. Wash approval is always required before bulk — denim wash results vary between fabric lots and water chemistry.",
  },
  {
    q: "What are typical indicative lead times for overalls from sample approval to shipment?",
    a: "As an indicative guide: sample production 14–21 days from spec lock (denim wash development adds time versus non-washed constructions); bulk production 40–60 days from confirmed PO; pre-shipment QC 3–5 days including hardware pull-test; sea freight 18–28 days from Karachi. GOTS transaction certificates add 3–5 days to documentation. All timelines are indicative and depend on construction, wash complexity, embroidery/appliqué and quantity.",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function OverallsContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip">

      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-overalls.webp" fill alt="Pakistan baby and kids overalls manufacturer — OEM denim and canvas dungarees for USA, UK and Europe" className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-2xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/apparel/babyandkids/" className="hover:text-gold transition-colors">Baby & Kids</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Overalls</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Baby &amp; Kids Apparel</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Baby &amp; Kids
              <br /><span className="text-gold">Overalls</span>
              <br />Manufacturer Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
              MZ Global Trading connects children&rsquo;s brands and retailers with Pakistan&rsquo;s certified denim and woven garment factories. Stretch denim, rigid denim, canvas, corduroy and linen. Newborn through 12 years. Snap crotch. Adjustable straps.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote <span aria-hidden="true">→</span></Link>
              <button onClick={() => scrollToId("bento-grid")} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">Explore Product Guide</button>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Baby &amp; Kids Overalls — Pakistan Denim &amp; Woven</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Five Constructions. Newborn to 12 Years.</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">Baby overalls combine denim construction quality with infant-specific design details — snap crotch, adjustable straps, wide leg openings. Pakistan&rsquo;s woven garment factories produce to the exact hardware and safety specification required for baby and kids retail worldwide.</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[{ val: "5", label: "Constructions" }, { val: "0–12", label: "Years Range" }, { val: "50+", label: "Vetted Factories" }, { val: "10+", label: "Certifications" }].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
            <Link prefetch={false} href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit">Request a Quote <span aria-hidden="true">→</span></Link>
          </motion.div>
        </div>
      </section>

      {/* ══ BENTO GRID ══════════════════════════════════════════════════════════ */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">👖</span>
                <div>
                  <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Fabrics</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3 border border-indigo-100">
                    <span className="text-lg" aria-hidden="true">{c.icon}</span>
                    <p className="text-xs font-bold text-navy-900 mt-1">{c.name}</p>
                    <p className="text-[10px] text-gray-500">{c.weight}</p>
                    {c.badge && <span className="mt-1 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{c.badge}</span>}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-constructions" label="Explore Constructions" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📏</span>
                <div>
                  <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Age &amp; Size Guide</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 flex-1">
                {AGE_SIZE_GUIDE.map((a) => (
                  <div key={a.tag} className="flex items-center gap-3 bg-white rounded-xl px-3 py-2 border border-orange-100">
                    <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full whitespace-nowrap">{a.tag}</span>
                    <span className="text-xs font-semibold text-navy-900">{a.group}</span>
                    <span className="text-[10px] text-gray-500 ml-auto">{a.chest}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="Full Size Guide" />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { icon: "⚖️", title: "Weight Guide", bg: "bg-amber-50", border: "border-amber-100", section: "section-gsm", items: GSM_TIERS.map(t => <div key={t.weight} className="mt-1"><p className="text-[10px] font-bold text-navy-900">{t.name}</p><div className="h-1.5 bg-gray-100 rounded-full mt-1"><div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} /></div></div>) },
              { icon: "🎨", title: "Decoration", bg: "bg-rose-50", border: "border-rose-100", section: "section-decoration", items: DECO_METHODS.map(d => <div key={d.code} className="flex gap-2 mt-1.5 items-center"><span className="text-[10px] font-bold text-rose-600 w-8">{d.code}</span><span className="text-xs text-navy-900">{d.method}</span></div>) },
              { icon: "🎨", title: "Colour Palette", bg: "bg-yellow-50", border: "border-yellow-100", section: "section-colours", items: DYE_OPTIONS.map(d => <div key={d.name} className="mt-2"><p className="text-[10px] text-gray-500">{d.subtitle}</p><div className="flex gap-1 mt-0.5">{d.swatches.slice(0,4).map((s,i) => <div key={i} className={`w-4 h-4 rounded-full ${s}`} />)}</div></div>) },
              { icon: "🏭", title: "OEM Features", bg: "bg-slate-50", border: "border-slate-200", section: "section-oem", items: OEM_FEATURES.slice(0,4).map(f => <div key={f.num} className="flex gap-2 mt-1.5 items-start"><span className="text-[10px] font-bold text-gold">{f.num}</span><span className="text-xs text-navy-900">{f.title}</span></div>) },
            ].map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className={`${card.bg} border ${card.border} rounded-2xl p-6 flex flex-col min-h-[220px]`}>
                <span className="text-2xl mb-2" aria-hidden="true">{card.icon}</span>
                <h3 className="text-sm font-bold text-navy-900 mb-1">{card.title}</h3>
                <div className="flex-1">{card.items}</div>
                <ExploreBtn sectionId={card.section} label="Detail" />
              </motion.div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-5 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="col-span-5 lg:col-span-2 bg-violet-50 border border-violet-100 rounded-2xl p-6 flex flex-col min-h-[200px]">
              <span className="text-2xl mb-3" aria-hidden="true">🌍</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Export Markets</h3>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.abbr} className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-violet-100 text-violet-700 text-[10px] font-bold flex items-center justify-center shrink-0">{s.abbr}</span>
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
                {CERTIFICATIONS.map((c) => <div key={c.name} className="flex items-center gap-2"><span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">{c.name}</span>{c.tier === "Essential" && <span className="text-[10px] text-gold">★</span>}</div>)}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }} className="col-span-5 lg:col-span-1 bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col min-h-[200px]">
              <span className="text-2xl mb-3" aria-hidden="true">🚢</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Export</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((t) => <div key={t.term} className="flex items-center gap-2"><span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">{t.term}</span><span className="text-xs text-gray-500 truncate">{t.port}</span></div>)}
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
                {SUSTAINABILITY_ITEMS.map((s) => <div key={s.title} className="flex items-start gap-2"><span className="text-lg" aria-hidden="true">{s.icon}</span><div><p className="text-xs font-semibold text-navy-900">{s.title}</p><span className="text-[10px] text-green-700 font-medium">{s.tag}</span></div></div>)}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="Sustainability" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="col-span-3 lg:col-span-1 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col min-h-[180px]">
              <span className="text-2xl mb-3" aria-hidden="true">⚙️</span>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.map((p) => <div key={p.num} className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-800 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span><span className="text-xs font-medium text-navy-900">{p.short}</span></div>)}
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
            <Link prefetch={false} href="/knowledge/baby-overalls-construction-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Baby Overalls Construction Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Snaps, adjustable straps and fabric safety requirements for procurement managers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link prefetch={false} href="/guides/sourcing-baby-overalls-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Sourcing Baby Overalls Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">OEKO-TEX certified fabric, custom sizing and certification for international buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guide →</span>
            </Link>
            <Link prefetch={false} href="/downloads/baby-overalls-size-spec-template/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Baby Overalls Size &amp; Spec Template</p>
              <p className="text-xs text-gray-500 leading-relaxed">Size and specification template for baby overalls sourcing.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Template →</span>
            </Link>
            <Link prefetch={false} href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Baby Overalls?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify construction, size range, decoration and quantity. Factory match and quotation in 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 1 — CONSTRUCTIONS (Brutalist UI + Scorecard) ═══════════════ */}
      <section id="section-constructions" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="border-l-8 border-gold pl-5 mb-8">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Constructions</p>
              <h2 className="text-4xl font-black text-white">FIVE CONSTRUCTIONS</h2>
              <p className="text-gray-300 mt-2 max-w-xl">Denim. Canvas. Corduroy. Linen. Each with infant-specific design requirements built in.</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONSTRUCTIONS.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl" aria-hidden="true">{c.icon}</span>
                  {c.badge && <span className="text-[10px] font-black text-navy-900 bg-gold px-2 py-1 rounded">{c.badge.toUpperCase()}</span>}
                </div>
                <h3 className="text-base font-black text-white mb-1">{c.name}</h3>
                <p className="text-gold text-xs font-bold mb-3">{c.weight}</p>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">{c.detail}</p>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-[10px] text-gray-500">{c.spec}</p>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {c.best.map((b) => <span key={b} className="text-[10px] border border-white/20 text-gray-300 px-2 py-0.5 rounded">{b}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 2 — SIZES (Card-Based UI + Card Layout) ══════════════════ */}
      <section id="section-sizes" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Size Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Age &amp; Size Guide — Overalls</h2>
            <p className="text-gray-600 max-w-2xl">From snap-crotch newborn dungarees to older children&rsquo;s casual denim — graded patterns for every age group.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AGE_SIZE_GUIDE.map((a, i) => (
              <motion.div key={a.tag} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }} className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
                <span className="inline-block text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full mb-3">{a.tag}</span>
                <h3 className="text-base font-bold text-navy-900 mb-2">{a.group}</h3>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div><p className="text-[10px] text-gray-500 uppercase tracking-wider">Chest</p><p className="text-sm font-bold text-navy-900">{a.chest}</p></div>
                  <div><p className="text-[10px] text-gray-500 uppercase tracking-wider">Height</p><p className="text-sm font-bold text-navy-900">{a.height}</p></div>
                </div>
                <p className="text-xs text-gray-600 leading-tight">{a.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 3 — WEIGHT (Material Design + Table) ════════════════════ */}
      <section id="section-gsm" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Weight Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Fabric Weight Guide</h2>
            <p className="text-gray-600 max-w-2xl">Weight choice impacts comfort, durability and positioning. Stretch denim at 7–9 oz is the infant standard; heavier constructions suit older kids and premium A/W programmes.</p>
          </motion.div>
          <div className="space-y-4">
            {GSM_TIERS.map((t, i) => (
              <motion.div key={t.weight} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start ${t.featured ? "bg-[#0D1B2A] border border-gold/30" : "bg-white border border-gray-100 shadow-xs"}`}
              >
                <div className="shrink-0">
                  <div className={`text-2xl font-bold ${t.featured ? "text-gold" : "text-navy-900"}`}>{t.weight}</div>
                  <div className={`text-sm font-semibold mt-0.5 ${t.featured ? "text-white" : "text-navy-900"}`}>{t.name}</div>
                  {t.featured && <span className="text-[10px] font-bold text-navy-900 bg-gold px-2 py-0.5 rounded-full mt-1 inline-block">Primary Range</span>}
                </div>
                <div className="flex-1">
                  <p className={`text-sm leading-relaxed ${t.featured ? "text-gray-300" : "text-gray-600"}`}>{t.desc}</p>
                </div>
                <div className={`shrink-0 text-right ${t.featured ? "text-gray-500" : "text-gray-500"}`}>
                  <p className="text-xs font-semibold">{t.season}</p>
                  <p className="text-xs mt-1">{t.market}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 4 — DECORATION (Retail UI + Card Layout) ════════════════ */}
      <section id="section-decoration" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <p className="text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Decoration</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Decoration Methods</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DECO_METHODS.map((d, i) => (
              <motion.div key={d.code} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }} className="border border-gray-100 rounded-2xl p-6 hover:border-gold/30 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold flex items-center justify-center">{d.code}</span>
                  <h3 className="text-sm font-bold text-navy-900">{d.method}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-3">{d.best}</p>
                <div className="bg-amber-50 rounded-lg p-3 flex gap-2">
                  <span className="text-amber-500 text-sm shrink-0">ℹ️</span>
                  <p className="text-xs text-amber-800">{d.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 5 — COLOURS (Moodboard UI + Tile Layout) ════════════════ */}
      <section id="section-colours" className="bg-[#FAFAF8] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Colour Palette</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Colour &amp; Wash Programmes</h2>
            <p className="text-gray-600 max-w-2xl">Indigo denim washes dominate the category; canvas and corduroy bring utility earth tones and seasonal pastels.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DYE_OPTIONS.map((d, i) => (
              <motion.div key={d.name} initial={{ opacity: 0, y: 20, rotate: i === 1 ? -0.5 : 0.5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100">
                <h3 className="text-sm font-bold text-navy-900 mb-1">{d.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{d.subtitle}</p>
                <div className="flex gap-3 mb-4">
                  {d.swatches.map((s, si) => <div key={si} className={`w-10 h-10 rounded-lg shadow-xs ${s}`} />)}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 6 — OEM (Modular UI + Card Grid) ════════════════════════ */}
      <section id="section-oem" className="bg-[#0D1B2A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM Development</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Custom Overalls Development</h2>
            <p className="text-gray-500 max-w-2xl">From snap hardware specification and wash development through graded size ranges and retail packaging — full OEM management for baby and kids overalls programmes.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OEM_FEATURES.map((f, i) => (
              <motion.div key={f.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <span className="text-2xl font-bold text-gold/30">{f.num}</span>
                <h3 className="text-sm font-bold text-white mt-2 mb-2">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 7 — MARKETS (Split-Screen UI + Cards) ════════════════════ */}
      <section id="section-markets" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-100 shadow-xs">
            <div className="bg-[#0D1B2A] p-10 lg:p-14">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Export Markets</p>
              <h2 className="text-3xl font-bold text-white mb-4">Global Overalls Markets</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">Serving kids boutiques, retail chains and wholesale distributors across 35+ markets. EU premium demands GOTS and OEKO-TEX Class 1; USA mass retail prioritises price and delivery reliability.</p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[{ val: "35+", label: "Markets" }, { val: "50+", label: "Factories" }, { val: "95%", label: "On-Time" }].map(s => (
                  <div key={s.label} className="text-center border border-white/10 rounded-xl p-4">
                    <p className="text-2xl font-bold text-gold">{s.val}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-10 lg:p-14">
              <div className="grid grid-cols-1 gap-4">
                {SECTORS.map((s, i) => (
                  <motion.div key={s.abbr} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex gap-3 items-start">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">{s.abbr}</span>
                    <div>
                      <p className="text-sm font-bold text-navy-900">{s.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.detail}</p>
                      <p className="text-[10px] text-gold mt-0.5">{s.market}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 8 — CERTIFICATIONS (Grid UI + Logo Grid) ════════════════ */}
      <section id="section-certs" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Certifications</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 text-center">
                <div className="w-12 h-12 relative mx-auto mb-3">
                  <Image src={c.img} fill alt={c.full} className="object-contain" sizes="48px" />
                </div>
                <p className="text-sm font-bold text-navy-900">{c.name}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${c.tier === "Essential" ? "bg-teal-100 text-teal-700" : c.tier === "Premium" ? "bg-gold/15 text-gold" : "bg-gray-100 text-gray-500"}`}>{c.tier === "Essential" ? "Class 1" : c.tier}</span>
                <p className="text-[10px] text-gray-500 leading-tight mt-2">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 9 — EXPORT (Bento UI + Table) ════════════════════════════ */}
      <section id="section-export" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Logistics</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Export Terms &amp; Packaging</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-sm">
                <thead><tr className="bg-[#0D1B2A]">{["Term", "Full Name", "Point"].map(h => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {EXPORT_TERMS.map((t) => (
                    <tr key={t.term}>
                      <td className="px-4 py-3"><span className="text-xs font-bold text-navy-900 bg-amber-50 px-2 py-0.5 rounded">{t.term}</span></td>
                      <td className="px-4 py-3"><p className="text-xs font-semibold text-navy-900">{t.full}</p><p className="text-xs text-gray-500">{t.desc}</p></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{t.port}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-amber-50 border-t border-amber-100 p-4">
                <p className="text-xs font-bold text-navy-900 mb-2">Indicative Lead Times</p>
                {LEAD_STAGES.map((l) => (
                  <div key={l.stage} className="flex items-center gap-3 mt-1.5">
                    <div className={`w-2 h-2 rounded-full ${l.color} shrink-0`} />
                    <span className="text-xs text-gray-700 flex-1">{l.stage}</span>
                    <span className="text-xs font-bold text-navy-900">{l.days} days</span>
                  </div>
                ))}
                <p className="text-[10px] text-amber-700 italic mt-3">All lead times indicative. Confirmed timelines provided with quotation.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PACK_OPTIONS.map((p) => (
                <div key={p.label} className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <span className="text-xl" aria-hidden="true">{p.icon}</span>
                  <p className="text-xs font-semibold text-navy-900 mt-2">{p.label}</p>
                  <p className="text-[10px] text-gray-500">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 10 — SUSTAINABILITY (Flat Design UI + List) ══════════════ */}
      <section id="section-sustainability" className="bg-green-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Sustainability</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Responsible Kids Overalls</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="bg-white rounded-2xl p-5 flex gap-4 items-start shadow-xs">
                <span className="text-3xl shrink-0" aria-hidden="true">{s.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1"><h3 className="text-sm font-bold text-navy-900">{s.title}</h3></div>
                  <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{s.tag}</span>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 11 — PROCESS (Cinematic UI + Steps) ════════════════════ */}
      <section id="section-process" className="bg-[#080E1A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Sourcing Process</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">From RFQ to shipment — wash development, OEKO-TEX testing and snap hardware verification built into every stage.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden">
                <span className="absolute top-4 right-4 text-7xl font-black text-white/5 leading-none select-none">{p.num}</span>
                <div className="relative z-10">
                  <span className="w-8 h-8 rounded-full bg-gold text-navy-900 text-xs font-bold flex items-center justify-center mb-4">{p.num}</span>
                  <h3 className="text-sm font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
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
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
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
              { name: "T-Shirts for Kids", desc: "Combed cotton jersey for infants and children. Screen print, appliqué and embroidery programmes.", href: "/apparel/babyandkids/tshirtsforkids/", img: "/images/hero/hero-t-shirts-for-kids.webp", alt: "Pakistan kids t-shirt manufacturer — OEM combed cotton children's apparel for baby boutiques worldwide" },
              { name: "Swaddle Muslin Fabric", desc: "Single muslin, double gauze and bamboo blends. GOTS and OEKO-TEX Class 1 certified.", href: "/apparel/babyandkids/swaddlemuslinfabric/", img: "/images/hero/hero-swaddle-muslin-fabric.webp", alt: "Pakistan swaddle muslin manufacturer — OEM organic cotton muslin fabric for baby brands worldwide" },
              { name: "Baby Rompers", desc: "Short and long-sleeve rompers in organic cotton jersey. Snap crotch and envelope neck options.", href: "/apparel/babyandkids/babyrompers/", img: "/images/hero/hero-baby-rompers.webp", alt: "Pakistan baby romper manufacturer — OEM organic cotton infant rompers for baby boutiques worldwide" },
              { name: "Baby Bibs", desc: "Terry, velour and silicone bib constructions for newborn to toddler programmes.", href: "/apparel/babyandkids/babybibs/", img: "/images/hero/hero-baby-bibs.webp", alt: "Pakistan baby bib manufacturer — OEM terry and silicone bibs for infant product brands worldwide" },
              { name: "Baby Hooded Towels", desc: "OEKO-TEX terry hooded towels for infants and toddlers. Embroidery and appliqué options.", href: "/apparel/babyandkids/babyhoodedtowels/", img: "/images/hero/hero-baby-hooded-towels.webp", alt: "Pakistan baby hooded towel manufacturer — OEM OEKO-TEX terry hooded towels for infant brands worldwide" },
            ].filter(p => !p.href.includes("overalls")).map((p) => (
              <Link prefetch={false} href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Source Kids Overalls?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">Share your construction, size range, wash, hardware and certification requirements. We&rsquo;ll match your programme to the right certified Pakistan factory within 3–5 working days.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote <span aria-hidden="true">→</span></Link>
              <Link prefetch={false} href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

