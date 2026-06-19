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

const KNIT_STRUCTURES = [
  { id: "plain-knit", name: "Plain Knit (Smooth)", badge: "Most Ordered", icon: "🧦", color: "bg-indigo-50 border-indigo-100", accent: "text-indigo-700", tag: "Everyday / Dress", desc: "The workhorse knit structure — smooth all-over construction used in dress, liner, casual and corporate sock programmes. Accepts yarn-dyed colour and knitted-in patterns." },
  { id: "rib-cuff", name: "Rib Cuff + Plain Foot", badge: "", icon: "🔁", color: "bg-violet-50 border-violet-100", accent: "text-violet-700", tag: "Casual / Crew", desc: "Elasticated rib cuff for sock retention paired with a smooth plain knit foot. Standard for crew and mid-calf casual and athletic programmes." },
  { id: "terry-sole", name: "Terry Sole Cushion", badge: "", icon: "🛡️", color: "bg-blue-50 border-blue-100", accent: "text-blue-700", tag: "Sport / Work", desc: "Terry loop on the sole only — targeted cushioning underfoot without extra weight on the cuff and leg. Popular in running, hiking and work sock programmes." },
  { id: "full-terry", name: "Full Terry Cushion", badge: "", icon: "🏔️", color: "bg-sky-50 border-sky-100", accent: "text-sky-700", tag: "Winter / Hiking", desc: "All-over terry loop construction for maximum cushioning and insulation. Suited to winter, outdoor and heavy-duty work sock programmes." },
  { id: "jacquard", name: "Jacquard / Pattern Knit", badge: "Popular Fashion", icon: "🎨", color: "bg-pink-50 border-pink-100", accent: "text-pink-700", tag: "Fashion / Gift", desc: "Complex multi-colour patterns knitted directly into the fabric structure. No print, no embellishment — the pattern is structural. Popular in fashion, gift and branded retail." },
  { id: "mesh-eyelet", name: "Mesh / Open Knit", badge: "", icon: "💨", color: "bg-teal-50 border-teal-100", accent: "text-teal-700", tag: "Athletic / Ventilated", desc: "Open-weave construction with ventilation zones for maximum airflow during activity. Used in running, cycling and performance sport sock programmes." },
  { id: "compression", name: "Compression Knit", badge: "Medical / Sport", icon: "⚡", color: "bg-rose-50 border-rose-100", accent: "text-rose-700", tag: "Medical / Recovery", desc: "Graduated compression from ankle to calf. mmHg rating engineered to specification. Used in medical, travel comfort and sport recovery programmes." },
];

const SIZE_RANGES = [
  { code: "WS", range: "EU 35–38 / UK 2–5 / US Women 5–8", use: "Women's programme" },
  { code: "MM", range: "EU 39–42 / UK 6–8 / US Men 6–9", use: "Men's standard" },
  { code: "ML", range: "EU 43–46 / UK 9–11 / US Men 10–13", use: "Men's large" },
  { code: "XL", range: "EU 47–50 / UK 12–14 / US Men 14+", use: "XL / extended" },
  { code: "KS", range: "Kids EU 22–27 / UK 4–10", use: "Junior / smaller" },
  { code: "KM", range: "Kids EU 28–34 / UK 10–2", use: "Older kids" },
  { code: "OS", range: "One Size (EU 38–44)", use: "Unisex / gift" },
  { code: "CX", range: "Custom size range", use: "Bespoke spec" },
];

const DENIER_TIERS = [
  { label: "Fine / Liner", denier: "< 100D", desc: "Lightweight dress and liner socks for formal, hotel amenity and airline programmes", pct: 35, featured: false, color: "bg-indigo-300" },
  { label: "Standard", denier: "100–200D", desc: "The commercial baseline for casual, fashion and everyday performance sock programmes", pct: 80, featured: true, color: "bg-gold" },
  { label: "Heavy / Cushion", denier: "200D+", desc: "Heavy work, hiking and full-terry construction socks for maximum durability and cushioning", pct: 45, featured: false, color: "bg-orange-600" },
];

const DESIGN_METHODS = [
  { code: "JCQ", method: "Knitted-in Jacquard", best: "Multi-colour woven patterns — logos, motifs, stripes and geometric patterns built into the fabric structure", compat: ["Plain Knit", "Rib Cuff", "Jacquard Knit"], note: "No fading, no peeling — pattern is structural and permanent" },
  { code: "ITS", method: "Intarsia (Multi-colour Blocks)", best: "Distinct colour blocks without floats on the reverse — cleaner back for premium programmes", compat: ["Plain Knit", "Jacquard Knit"], note: "Premium finish — used in high-end branded and gift sock programmes" },
  { code: "SBL", method: "All-Over Sublimation", best: "Photographic quality full-sock print — any image, any colour range on white or light base", compat: ["Plain Knit (polyester base)"], note: "100% polyester base required. Not available on cotton or cotton-blend socks" },
  { code: "PLN", method: "Plain / No Design", best: "Solid colour socks — PMS matched, clean finish. Label and ankle band are the sole branded element", compat: ["All Structures"], note: "Best combined with branded ankle band or custom label programme" },
];

const COLOUR_PROFILES = [
  { type: "Solid / Yarn-Dyed", note: "Full PMS range across all knit structures. Lab dip approval before bulk. Navy, white, black, grey, red and custom PMS all available.", swatches: ["bg-navy-900", "bg-white border border-gray-200", "bg-gray-800", "bg-gray-400", "bg-red-600", "bg-blue-500"] },
  { type: "Stripe (Yarn-Dyed)", note: "Horizontal, vertical or diagonal stripes knitted in during production. Stripe width and colour count specified per programme.", swatches: ["bg-white border border-gray-200", "bg-navy-900", "bg-red-600", "bg-gold", "bg-gray-300"] },
  { type: "Jacquard Pattern", note: "Full colour jacquard — any motif, any repeat. Woven into the structure of the sock. No ink, no transfer.", swatches: ["bg-indigo-700", "bg-pink-500", "bg-yellow-400", "bg-emerald-500", "bg-red-500", "bg-white border border-gray-200"] },
  { type: "Sublimation Full Print", note: "All-over photographic or vector print. Requires white polyester base. Unlimited colour range, edge-to-edge coverage.", swatches: ["bg-pink-400", "bg-purple-500", "bg-blue-400", "bg-orange-400", "bg-green-400", "bg-yellow-300"] },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", desc: "Organic cotton hosiery programmes — full fibre-to-finished-product chain of custody", tier: "Premium", img: "/images/certs/cert-gots.webp" },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", desc: "No harmful substances — standard requirement for EU/UK sock import programmes", tier: "Standard", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "BSCI", full: "Business Social Compliance Initiative", desc: "Labour standards audit for European hosiery buyers", tier: "Standard", img: "/images/certs/cert-bsci.webp" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", desc: "Supply chain transparency for major retail and brand buyers", tier: "Standard", img: "/images/certs/cert-sedex.webp" },
  { name: "ISO 9001", full: "Quality Management System", desc: "Process control and quality systems for consistent large-run sock production", tier: "Standard", img: "/images/certs/cert-iso-9001.webp" },
  { name: "GRS", full: "Global Recycled Standard", desc: "Recycled polyester content verification for eco sock programmes", tier: "Optional", img: "/images/certs/cert-grs.webp" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", desc: "12-principle compliance for Pakistan hosiery factories", tier: "Standard", img: "/images/certs/cert-wrap.webp" },
  { name: "BCI", full: "Better Cotton Initiative", desc: "Sustainable cotton sourcing in the hosiery supply chain", tier: "Optional", img: "/images/certs/cert-bci.webp" },
  { name: "SA8000", full: "Social Accountability International", desc: "Highest-level social audit — worker rights and fair wages verified", tier: "Premium", img: "/images/certs/cert-sa8000.webp" },
  { name: "Bluesign", full: "Bluesign Standard", desc: "Chemical safety in the dyeing and finishing of sock fabrics", tier: "Optional", img: "/images/certs/cert-bluesign.webp" },
];

const OEM_FEATURES = [
  { num: "01", title: "Knit Structure Selection", desc: "All 7 knit structures — from fine plain liner to graduated compression — developed to your end-use specification.", color: "border-indigo-300" },
  { num: "02", title: "Yarn Specification", desc: "Combed cotton, organic cotton, merino wool, bamboo, recycled polyester and blends. Denier and twist per your performance brief.", color: "border-violet-300" },
  { num: "03", title: "Pattern & Logo Programme", desc: "Knitted-in jacquard logo, intarsia block, stripe or sublimation — your brand is engineered into the sock construction, not applied on top.", color: "border-blue-300" },
  { num: "04", title: "Compression Specification", desc: "Graduated compression programmes (10–40 mmHg) engineered to your medical or sport recovery specification with test reporting available.", color: "border-teal-300" },
  { num: "05", title: "Ankle Band & Label", desc: "Branded ankle band (sock header), printed care label, woven label or hang tag — full label programme developed to your artwork.", color: "border-pink-300" },
  { num: "06", title: "Retail Packaging Configuration", desc: "Ankle band pair, 2-pair header card, 3-pair header card, 3 / 6 / 12 / 24-pair polybag, or bulk bale — any pack configuration.", color: "border-rose-300" },
];

const SECTORS = [
  { abbr: "ATH", name: "Athletic / Sport", detail: "Running, hiking, cycling and gym socks — cushioned, ventilated and moisture-wicking", market: "USA · UK · EU · Australia" },
  { abbr: "FSH", name: "Fashion Retail", detail: "Seasonal pattern and novelty socks — jacquard, intarsia and sublimation programmes", market: "UK · EU · USA · Japan" },
  { abbr: "BRN", name: "Branded / Corporate", detail: "Branded executive and promotional sock programmes — logo embedded in knit structure", market: "Global" },
  { abbr: "MED", name: "Medical / Compression", detail: "Graduated compression for medical, travel and recovery programmes (10–40 mmHg)", market: "USA · EU · Middle East · Australia" },
  { abbr: "HTL", name: "Hotel & Amenity", detail: "Soft fine plain liner and cotton socks for hotel amenity and accommodation kits", market: "Middle East · EU · USA · Asia" },
  { abbr: "WSL", name: "Wholesale / Multi-brand", detail: "High-volume plain and basic fashion socks for distributors and multi-label retailers", market: "USA · Canada · EU · Australia" },
];

const EXPORT_TERMS = [
  { term: "FOB", full: "Free On Board", port: "Karachi / Port Qasim", desc: "Price covers goods to port of loading. Buyer arranges freight and insurance." },
  { term: "CIF", full: "Cost, Insurance & Freight", port: "Destination port", desc: "We arrange freight and marine insurance to your nominated destination port." },
  { term: "CFR", full: "Cost & Freight", port: "Destination port", desc: "We arrange ocean freight. Buyer arranges own marine insurance." },
  { term: "EXW", full: "Ex-Works", port: "Factory gate", desc: "Buyer arranges all logistics from factory gate. Lowest price point." },
];

const PACK_OPTIONS = [
  { icon: "🎀", label: "Ankle Band (pair)", note: "Standard sock retail" },
  { icon: "🗂️", label: "Header Card 2-pair", note: "Small gift format" },
  { icon: "📎", label: "Header Card 3-pair", note: "Value multi-pack" },
  { icon: "📦", label: "Polybag 3-pair", note: "Casual pack" },
  { icon: "📦", label: "Polybag 6-pair", note: "Family / fleet pack" },
  { icon: "🏭", label: "Polybag 12–24 pair", note: "Trade / institution" },
];

const LEAD_STAGES = [
  { stage: "RFQ & Quotation", days: "3–5", desc: "Knit structure, yarn, pattern and pack confirmed with factory pricing", color: "bg-indigo-500" },
  { stage: "Sample Production", days: "10–18", desc: "Knitted sample pair(s) to specification — pattern, denier and size confirmed", color: "bg-violet-500" },
  { stage: "Bulk Production", days: "30–55", desc: "From confirmed PO and approved knit sample — duration varies with jacquard complexity", color: "bg-blue-600" },
  { stage: "QC & Inspection", days: "3–5", desc: "Pair count, size check, pattern accuracy and packaging audit", color: "bg-teal-500" },
  { stage: "Sea Freight", days: "18–28", desc: "FCL/LCL from Karachi or Port Qasim to destination port", color: "bg-pink-500" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton hosiery — full chain-of-custody from certified farm to finished pair. No synthetic pesticides in the fibre supply chain.", tag: "GOTS" },
  { icon: "♻️", title: "Recycled Polyester", desc: "GRS-certified recycled polyester for performance and sublimation sock programmes. Post-consumer plastic converted to performance hosiery yarn.", tag: "GRS" },
  { icon: "💚", title: "Bamboo Fibre Option", desc: "Bamboo viscose blends available for naturally antibacterial, soft-hand hosiery programmes targeting premium natural fibre buyers.", tag: "Natural" },
  { icon: "⚖️", title: "SA8000 Labour Audit", desc: "Pakistan hosiery factories holding SA8000 certification — independently audited for fair wages, worker rights and safe conditions.", tag: "SA8000" },
  { icon: "🔬", title: "OEKO-TEX Class 1", desc: "OEKO-TEX Standard 100 Class 1 available for baby and children's socks — the most stringent chemical safety tier for products with high skin contact.", tag: "OEKO-TEX" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled or FSC-certified header cards, recycled polybag options and plastic-free pair packaging available for buyers operating under packaging ESG commitments.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit RFQ", short: "Specification", desc: "Share knit structure, yarn blend, denier, size range, pattern brief, compression requirement (if applicable), pack format and target quantity." },
  { num: "02", title: "Factory Matching", short: "Shortlisting", desc: "We match 2–3 certified Pakistan hosiery factories to your knit structure, yarn and certification requirements. Pricing in 3–5 working days." },
  { num: "03", title: "Sample Production", short: "Sampling", desc: "Knitted sample pairs produced to your pattern, structure and size specification. 10–18 days from specification lock." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Review knit quality, pattern accuracy, yarn blend, denier hand and size before purchase order placement." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Full knitting run with pattern, colour and pair count per purchase order. Jacquard programmes take longer than plain." },
  { num: "06", title: "QC & Shipment", short: "Export", desc: "Pair count audit, size range check, pattern accuracy verification and pack configuration confirmed before loading at Karachi or Port Qasim." },
];

const FAQS = [
  { q: "What knit structures are available for socks from Pakistan?", a: "Pakistan's hosiery sector produces all seven major knit structures: plain knit (smooth, everyday), rib cuff + plain foot (casual and crew), terry sole cushion (sport and work), full terry cushion (heavy-duty and winter), jacquard / pattern knit (fashion and branded), mesh / open knit (ventilated athletic), and compression knit (medical and recovery). Include your intended end use and performance requirement in your RFQ for correct structure matching." },
  { q: "What is the difference between jacquard and sublimation for patterned socks?", a: "Jacquard knitting builds the pattern into the fabric structure using coloured yarns — the pattern is permanent, does not fade and has no feel difference on the sock surface. Sublimation is a dye-transfer print applied to a finished white polyester-base sock — it delivers photographic image quality and unlimited colour range but requires 100% polyester as the base fabric. Cotton and cotton-blend socks cannot receive sublimation print. For branded or gift programmes where pattern longevity and hand feel are priorities, jacquard is typically preferred. For photographic or complex artwork, sublimation is the correct choice." },
  { q: "Can compression socks be manufactured in Pakistan?", a: "Yes. Graduated compression socks (10–40 mmHg) are available from Pakistan's certified hosiery factories. Compression programmes require specific needle count and yarn tension specification — include your target mmHg rating, size range (typically shoe size or calf circumference) and compression class in your RFQ. Test reporting and compression curve documentation are available on request for medical-grade programmes." },
  { q: "What fibre options are available for hosiery from Pakistan?", a: "Combed cotton, organic cotton (GOTS certified), cotton-polyester blends, bamboo viscose, merino wool blend, recycled polyester (GRS certified) and nylon blend for reinforced heels and toes. Fibre selection depends on knit structure, performance requirements and target market positioning. Organic cotton and recycled polyester programmes require corresponding factory certification — specify in your RFQ." },
  { q: "What order quantities are typical for sock programmes?", a: "Sock programme quantities vary considerably by knit complexity and pack format — plain bulk programmes run differently to complex jacquard or compression programmes. Include your target quantity, size breakdown, number of colour/pattern options and pack configuration in your RFQ and we match you with factories whose equipment and production economics align with your programme size." },
  { q: "What retail packaging options are available for socks?", a: "All standard hosiery retail pack formats are available: ankle band (single pair, the most common retail format), header card in 2-pair and 3-pair configurations, polybag in 3-pair, 6-pair, 12-pair and 24-pair counts, and bulk bale without individual packing for institutional and trade programmes. Ankle band and header card artwork is submitted for approval before bulk production." },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function SocksContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-apparel.webp"
            fill
            alt="Pakistan socks manufacturer — OEM plain, jacquard and compression socks for fashion and sport brands in USA, UK and Europe"
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
              <span className="text-gold">Socks</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Hosiery Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Socks
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
              MZ Global Trading sources custom socks from Pakistan&rsquo;s certified
              hosiery factories. Seven knit structures from plain liner to graduated
              compression. Jacquard patterns, sublimation print, organic cotton.
              OEKO-TEX, BSCI, WRAP certified. FOB Karachi.
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
      <section className="bg-indigo-950 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Socks — Pakistan Hosiery
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Seven Knit Structures. Every Sock Programme.
              </h2>
              <p className="text-indigo-200 text-sm leading-relaxed max-w-xl">
                From fine plain liner to medical-grade compression — Pakistan&rsquo;s certified
                hosiery factories span the full knit structure range. Jacquard patterns,
                organic cotton, bamboo blends and recycled polyester all available.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "7", label: "Knit Structures" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-indigo-300 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
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

          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bento 1 — Knit Structures */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧦</span>
                <div>
                  <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Knit Structures</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">7 Knit Structures</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {KNIT_STRUCTURES.slice(0, 4).map((s) => (
                  <div key={s.id} className="bg-white rounded-xl p-3 border border-indigo-100">
                    <div className="flex items-start gap-1.5">
                      <span className="text-base" aria-hidden="true">{s.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-navy-900 leading-tight">{s.name}</p>
                        <span className="inline-block text-[10px] font-medium text-indigo-600 mt-0.5">{s.tag}</span>
                      </div>
                    </div>
                    {s.badge && <span className="mt-1 inline-block text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{s.badge}</span>}
                  </div>
                ))}
              </div>
              <p className="text-xs text-indigo-600 font-medium">+ 3 more structures</p>
              <ExploreBtn sectionId="section-constructions" label="Explore Knit Structures" />
            </motion.div>

            {/* Bento 2 — Sizes */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-violet-50 border border-violet-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">📐</span>
                <div>
                  <p className="text-violet-600 text-xs font-semibold tracking-[0.2em] uppercase">Sizing</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Shoe Size Ranges</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {SIZE_RANGES.slice(0, 5).map((s) => (
                  <div key={s.code} className="bg-white rounded-xl px-4 py-2.5 border border-violet-100 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 text-[10px] font-bold flex items-center justify-center shrink-0">{s.code}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{s.range}</p>
                      <p className="text-[10px] text-gray-400">{s.use}</p>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-violet-600 font-medium pl-11">+ 3 more size ranges</p>
              </div>
              <ExploreBtn sectionId="section-fits" label="Explore Sizes" />
            </motion.div>
          </div>

          {/* Row 2: 4 compact */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Bento 3 — Denier */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🪡</span>
              <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Denier Guide</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {DENIER_TIERS.map((t) => (
                  <div key={t.label} className="bg-white rounded-xl p-3 border border-blue-100">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-bold text-navy-900">{t.denier}</span>
                      {t.featured && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] font-semibold text-blue-600">{t.label}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="View Denier Guide" />
            </motion.div>

            {/* Bento 4 — Design */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-pink-50 border border-pink-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-pink-600 text-xs font-semibold tracking-[0.2em] uppercase">Design</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Pattern &amp; Design</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DESIGN_METHODS.map((d) => (
                  <div key={d.code} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2.5 border border-pink-100">
                    <span className="w-6 h-6 rounded bg-pink-100 text-pink-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{d.code}</span>
                    <p className="text-xs font-semibold text-navy-900 leading-snug">{d.method}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-decoration" label="View Design Methods" />
            </motion.div>

            {/* Bento 5 — Colours */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🌈</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour Options</h3>
              <div className="flex flex-col gap-2 flex-1">
                {COLOUR_PROFILES.map((c) => (
                  <div key={c.type} className="bg-white rounded-xl p-2.5 border border-rose-100">
                    <p className="text-xs font-semibold text-navy-900 mb-1.5">{c.type}</p>
                    <div className="flex gap-1.5">
                      {c.swatches.map((s, i) => (
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
              className="bg-teal-50 border border-teal-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏷️</span>
              <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">OEM &amp; Custom</h3>
              <div className="flex flex-col gap-2 flex-1">
                {OEM_FEATURES.slice(0, 5).map((f) => (
                  <div key={f.num} className="flex items-start gap-2">
                    <span className="text-indigo-600 text-xs font-bold mt-0.5 shrink-0">{f.num}</span>
                    <p className="text-xs text-gray-600 leading-snug">{f.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore OEM" />
            </motion.div>
          </div>

          {/* Row 3: 5-col 2+2+1 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            {/* Bento 7 — Markets */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-purple-50 border border-purple-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <div>
                  <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Programme Types</h3>
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
              <ExploreBtn sectionId="section-markets" label="View All Sectors" />
            </motion.div>

            {/* Bento 8 — Certs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-emerald-50 border border-emerald-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-emerald-700 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Quality Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="bg-white rounded-xl border border-emerald-100 flex items-center justify-center p-2" style={{ height: 56 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={72} height={44} className="object-contain w-full h-full" />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            {/* Bento 9 — Export */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-sky-50 border border-sky-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <p className="text-sky-700 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Export &amp; Logistics</h3>
              <div className="flex flex-col gap-2 flex-1">
                {EXPORT_TERMS.map((e) => (
                  <div key={e.term} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-sky-100">
                    <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 text-[10px] font-bold flex items-center justify-center shrink-0">{e.term}</span>
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
              className="lg:col-span-1 bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0">{p.num}</span>
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
      <section className="bg-indigo-950 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/" className="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-gold hover:bg-white/10 transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-white">Hosiery Buying Guide</p>
              <p className="text-xs text-indigo-200 leading-relaxed">Knit structure selection, denier guide and market positioning for international sock buyers.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-gold hover:bg-white/10 transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-white">Pakistan Hosiery Export Guide</p>
              <p className="text-xs text-indigo-200 leading-relaxed">Sourcing process, yarn options, certification requirements and factory audit overview.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-gold hover:bg-white/10 transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-white">Size Charts &amp; Spec Sheets</p>
              <p className="text-xs text-indigo-200 leading-relaxed">Shoe size range charts, compression mmHg reference and certification documentation.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-gold rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-navy-900 uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-navy-900">Ready to Source Socks?</p>
              <p className="text-xs text-navy-900/70 leading-relaxed">Structure and yarn confirmed — RFQ takes 3 minutes. Factory match and pricing in 3–5 working days.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-navy-700 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 1 — KNIT STRUCTURES — RETAIL UI ══════════════════════════ */}
      <section id="section-constructions" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Seven Structures</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Knit Structures</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Knit structure is the primary specification decision in a sock programme. It determines cushioning, compression, ventilation, pattern capability and end-use application.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {KNIT_STRUCTURES.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                className={`${s.color} border rounded-2xl p-6 flex flex-col gap-3 cursor-default ${i === 0 ? "sm:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.accent} bg-white/60 border border-white`}>{s.tag}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900">{s.name}</h3>
                  {s.badge && (
                    <span className="inline-block mt-1 text-[10px] font-semibold text-gold bg-gold/15 px-2.5 py-0.5 rounded-full border border-gold/25">{s.badge}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          {/* Structure × use-case matrix */}
          <div className="mt-12 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <div className="bg-indigo-700 px-6 py-3">
              <p className="text-white text-sm font-bold">Knit Structure × End-Use Guide</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-5 py-3 font-semibold text-navy-900 text-xs uppercase tracking-wider">Structure</th>
                    <th className="text-center px-3 py-3 font-semibold text-navy-900 text-xs">Dress/Liner</th>
                    <th className="text-center px-3 py-3 font-semibold text-navy-900 text-xs">Athletic</th>
                    <th className="text-center px-3 py-3 font-semibold text-navy-900 text-xs">Fashion</th>
                    <th className="text-center px-3 py-3 font-semibold text-navy-900 text-xs">Medical</th>
                    <th className="text-center px-3 py-3 font-semibold text-navy-900 text-xs">Work</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Plain Knit", "✓✓", "✓", "✓", "—", "✓"],
                    ["Rib Cuff + Plain Foot", "—", "✓", "✓✓", "—", "✓"],
                    ["Terry Sole Cushion", "—", "✓✓", "—", "—", "✓✓"],
                    ["Full Terry Cushion", "—", "✓", "—", "—", "✓✓"],
                    ["Jacquard / Pattern Knit", "—", "—", "✓✓", "—", "—"],
                    ["Mesh / Open Knit", "—", "✓✓", "✓", "—", "—"],
                    ["Compression Knit", "—", "✓", "—", "✓✓", "—"],
                  ].map(([struct, ...cells]) => (
                    <tr key={struct} className="hover:bg-indigo-50/30">
                      <td className="px-5 py-3 font-medium text-navy-900">{struct}</td>
                      {cells.map((cell, ci) => (
                        <td key={ci} className={`text-center px-3 py-3 text-sm ${cell === "✓✓" ? "text-indigo-600 font-bold" : cell === "✓" ? "text-green-600" : "text-gray-300"}`}>{cell}</td>
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

      {/* ══ SECTION 2 — SIZES — TYPOGRAPHY-DRIVEN UI ═════════════════════════ */}
      <section id="section-fits" className="bg-indigo-950 py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Shoe Size Ranges</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">All Shoe Sizes Available</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {SIZE_RANGES.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-center gap-4 py-4 border-b border-white/10 last:border-0"
              >
                <span className="text-5xl sm:text-6xl font-black text-white/10 leading-none shrink-0 w-16 text-right">{i + 1}</span>
                <div>
                  <p className="text-sm font-bold text-gold">{s.code}</p>
                  <p className="text-lg font-bold text-white leading-snug">{s.range}</p>
                  <p className="text-xs text-indigo-300 mt-0.5">{s.use}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[["EU / UK / US", "Size standards"], ["Compression", "By calf circumference"], ["Custom", "Bespoke spec"]].map(([val, label]) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-white font-bold">{val}</p>
                <p className="text-gold text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 3 — DENIER — NEUMORPHISM ════════════════════════════════ */}
      <section id="section-gsm" className="bg-gray-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Guide</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Denier Weight Guide</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Unlike woven garments measured in GSM, hosiery weight is expressed in denier — the thickness and density of the yarn. Denier selection drives the sock&rsquo;s hand, durability and end-use position.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
            {DENIER_TIERS.map((tier, i) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl p-8 flex flex-col gap-4 relative"
                style={{
                  background: "#e0e5ec",
                  boxShadow: tier.featured
                    ? "8px 8px 16px #b8bec8, -8px -8px 16px #f8fbff, inset 0 0 0 2px rgba(212,160,23,0.4)"
                    : "8px 8px 16px #b8bec8, -8px -8px 16px #f8fbff",
                }}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-6 text-[10px] font-bold text-gold bg-navy-900 px-3 py-1 rounded-full uppercase tracking-wider">Most Ordered</span>
                )}
                <p className={`text-3xl font-bold ${tier.featured ? "text-gold" : "text-navy-900"}`}>{tier.denier}</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{tier.label}</p>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#c8cdd6", boxShadow: "inset 2px 2px 4px #b8bec8, inset -2px -2px 4px #f8fbff" }}>
                  <div className={`h-full rounded-full ${tier.color}`} style={{ width: `${tier.pct}%` }} aria-hidden="true" />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tier.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Denier by Application</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ["Dress / Liner Socks", "< 100D", "Smooth fine hand for formal and hotel programmes"],
                ["Athletic Running", "100–150D", "Lightweight breathable with targeted cushioning zones"],
                ["Casual / Fashion", "150–200D", "Commercial baseline — durable, accepts patterns"],
                ["Work / Hiking Cushion", "200D+", "Heavy full-terry for maximum durability and impact absorption"],
              ].map(([app, d, note]) => (
                <div key={app} className="rounded-xl p-4" style={{ background: "#e0e5ec", boxShadow: "4px 4px 8px #b8bec8, -4px -4px 8px #f8fbff" }}>
                  <p className="text-sm font-bold text-navy-900">{app}</p>
                  <p className="text-lg font-black text-indigo-600 mt-1">{d}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{note}</p>
                </div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 4 — DESIGN — SOCIAL-FIRST UI ════════════════════════════ */}
      <section id="section-decoration" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Pattern &amp; Design</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Design Methods</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Sock design is built into the fabric — not applied to it. Each method has different base fabric requirements, colour range and durability characteristics.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {DESIGN_METHODS.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border border-gray-100 rounded-2xl p-7 flex flex-col gap-4 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center">{d.code}</span>
                    <h3 className="text-base font-bold text-navy-900">{d.method}</h3>
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{d.best}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Works with</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.compat.map((c) => (
                      <span key={c} className="text-xs border border-indigo-100 text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 px-3 py-2 rounded-lg">{d.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 5 — COLOURS — CINEMATIC UI ══════════════════════════════ */}
      <section id="section-colors" className="relative bg-gray-900 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-500 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-violet-400 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Colour Options</h2>
          <p className="text-gray-400 mb-12 max-w-2xl leading-relaxed">
            Every colour programme from plain PMS-matched solids to full sublimation photographic prints. Lab dip approval before bulk production on all programmes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COLOUR_PROFILES.map((c, i) => (
              <motion.div
                key={c.type}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-2">
                  {c.swatches.map((s, idx) => (
                    <div key={idx} className={`w-8 h-8 rounded-full border-2 border-white/20 ${s}`} aria-hidden="true" />
                  ))}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{c.type}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">{c.note}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 6 — OEM — PRODUCT SHOWCASE UI ════════════════════════════ */}
      <section id="section-oem" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Custom Development</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">OEM &amp; Custom Programmes</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Every specification in a sock programme is open to customisation — from yarn composition and knit density to ankle band artwork and retail pack configuration.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OEM_FEATURES.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`bg-white rounded-2xl p-7 flex flex-col gap-4 border-2 ${f.color} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 text-base font-bold flex items-center justify-center shrink-0">{f.num}</div>
                  <h3 className="text-sm font-bold text-navy-900 leading-snug">{f.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link href="/rfq/" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-navy-800 transition-colors">
              Specify Your Programme <span aria-hidden="true">→</span>
            </Link>
            <Link href="/ourprocess/" className="inline-flex items-center gap-2 border border-gray-200 text-navy-900 font-semibold px-7 py-3.5 rounded-xl hover:border-navy-900 transition-colors">
              View Sourcing Process
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 7 — MARKETS — COLLAGE UI ════════════════════════════════ */}
      <section id="section-markets" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Markets</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Programme Types &amp; Sectors</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Pakistan hosiery factories supply every major sock programme type — from athletic performance to medical compression to hotel amenity kits.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white border border-gray-100 rounded-2xl p-7 flex flex-col gap-3 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-bold flex items-center justify-center">{s.abbr}</div>
                <h3 className="text-lg font-bold text-navy-900">{s.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{s.detail}</p>
                <p className="text-xs font-semibold text-gold">{s.market}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 8 — CERTIFICATIONS — SKEUOMORPHIC UI ════════════════════ */}
      <section id="section-certs" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quality Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Certifications Available</h2>
          <p className="text-gray-500 mb-10 max-w-2xl leading-relaxed">
            Pakistan&rsquo;s hosiery factories carry all major international quality, social and environmental certifications. Specify your required standards in your RFQ.
          </p>
          <div className="bg-gradient-to-br from-gold/10 to-amber-50 rounded-3xl p-8 mb-10 border border-gold/20">
            <div className="text-center mb-6">
              <p className="text-5xl font-black text-gold">10+</p>
              <p className="text-navy-900 font-bold text-lg mt-1">Certifications Available</p>
              <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">Specify your required certification in your RFQ for matched factory selection</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {CERTIFICATIONS.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="bg-white rounded-2xl flex flex-col items-center gap-2 p-4 border border-amber-100 hover:border-gold hover:shadow-sm transition-all"
                  style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex items-center justify-center" style={{ width: 64, height: 44 }}>
                    <Image src={c.img} alt={`${c.name} — ${c.full}`} width={56} height={38} className="object-contain w-full h-full" />
                  </div>
                  <p className="text-xs font-bold text-navy-900 text-center">{c.name}</p>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${c.tier === "Premium" ? "bg-gold/20 text-gold" : c.tier === "Optional" ? "bg-gray-100 text-gray-500" : "bg-green-50 text-green-700"}`}>{c.tier}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { cert: "OEKO-TEX Class 1", note: "Required for children's and baby sock programmes — highest-tier skin-contact chemical safety" },
              { cert: "GOTS", note: "Organic cotton hosiery — full chain of custody from farm to finished pair verified" },
              { cert: "SA8000", note: "Highest social audit standard — independently verified fair wages and worker rights" },
            ].map((item) => (
              <div key={item.cert} className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <p className="font-bold text-navy-900 text-sm mb-2">{item.cert}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 9 — EXPORT — MAXIMALIST UI ══════════════════════════════ */}
      <section id="section-export" className="bg-indigo-950 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Logistics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Export Terms &amp; Packaging</h2>
          <p className="text-indigo-200 mb-10 max-w-2xl leading-relaxed">
            Competitive Incoterms from Karachi and Port Qasim. All standard hosiery retail pack configurations available.
          </p>

          <h3 className="text-lg font-bold text-white mb-4">Incoterms Available</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {EXPORT_TERMS.map((e, i) => (
              <motion.div
                key={e.term}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center shrink-0">
                    <span className="text-navy-900 text-sm font-black">{e.term}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{e.term}</p>
                    <p className="text-xs text-indigo-300">{e.full}</p>
                  </div>
                </div>
                <p className="text-xs text-gold font-semibold">📍 {e.port}</p>
                <p className="text-sm text-indigo-200 leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-white mb-4">Packaging Configurations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {PACK_OPTIONS.map((p) => (
              <div key={p.label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                <span className="text-2xl" aria-hidden="true">{p.icon}</span>
                <p className="text-xs font-semibold text-white leading-snug">{p.label}</p>
                <p className="text-[10px] text-indigo-300">{p.note}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-white mb-3">Indicative Programme Timeline</h3>
          <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 mb-6 text-sm text-amber-200 leading-relaxed">
            <strong className="text-amber-400">Important:</strong> All durations are indicative guides for planning purposes only. Jacquard complexity, yarn sourcing lead times and sample iteration count significantly affect actual timelines. Include your delivery date in your RFQ for a specific assessment.
          </div>
          <div className="flex flex-col gap-3">
            {LEAD_STAGES.map((stage, i) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl ${stage.color} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{stage.stage}</p>
                  <p className="text-xs text-indigo-300">{stage.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-gold">{stage.days}</p>
                  <p className="text-xs text-indigo-400">days (guide)</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-5 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-indigo-300">
            Indicative total programme duration: approximately 65–110 days from RFQ to departure port. Jacquard and compression programmes will take longer. Add sea freight time for your destination.
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ══ SECTION 10 — SUSTAINABILITY — EDITORIAL UI ═══════════════════════ */}
      <section id="section-sustainability" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-gray-400">Ethics &amp; Environment</p>
            <h2 className="text-4xl sm:text-5xl font-light text-navy-900 mb-5 leading-[1.1]">
              Sustainable<br />Hosiery Sourcing
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-6" aria-hidden="true" />
            <p className="text-gray-500 text-lg leading-loose">
              Pakistan&rsquo;s certified hosiery factories support organic cotton, recycled polyester, bamboo fibre and the full spectrum of social compliance standards — from OEKO-TEX Class 1 for baby socks to SA8000 for labour rights.
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
                <div className="sm:col-span-1">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                </div>
                <div className="sm:col-span-3">
                  <h3 className="text-base font-semibold text-navy-900">{item.title}</h3>
                  <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{item.tag}</span>
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
            <Link href="/qualitycompliance/certifications/" className="inline-flex items-center gap-2 border border-gray-200 text-navy-900 font-semibold px-7 py-3.5 rounded-xl hover:border-navy-900 transition-colors">
              View All Certifications
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ SECTION 11 — PROCESS — HERO-CENTERED UI ══════════════════════════ */}
      <section id="section-process" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">How We Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Sourcing Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="bg-indigo-700 px-6 py-4 flex items-center gap-3">
                  <span className="text-white/40 text-4xl font-black leading-none">{step.num}</span>
                  <div>
                    <p className="text-white font-bold text-sm">{step.title}</p>
                    <p className="text-indigo-200 text-xs">{step.short}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/rfq/" className="inline-flex items-center gap-2 bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-800 transition-colors">
              Begin Step 01 — Submit RFQ <span aria-hidden="true">→</span>
            </Link>
            <Link href="/ourprocess/" className="inline-flex items-center gap-2 border border-gray-200 text-navy-900 font-semibold px-8 py-4 rounded-xl hover:border-navy-900 transition-colors">
              View Full Process Detail
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Socks FAQ</h2>
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

      {/* ══ FINAL CTA ════════════════════════════════════════════════════════ */}
      <section className="bg-indigo-950 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Start Your Programme</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-snug">
              Ready to Source Socks<br />from Pakistan?
            </h2>
            <p className="text-indigo-200 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              All seven knit structures. Organic cotton, recycled polyester, bamboo, merino
              and nylon blends. Jacquard, intarsia, sublimation and plain programmes.
              Pakistan&rsquo;s certified hosiery factories. FOB Karachi.
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
