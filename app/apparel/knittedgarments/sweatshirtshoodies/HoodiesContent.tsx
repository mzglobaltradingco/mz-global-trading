"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import CertificationsStrip from "@/components/CertificationsStrip";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Construction {
  id: string;
  name: string;
  badge: string;
  gsm: string;
  hand: string;
  best: string[];
  markets: string[];
  decorations: string[];
  detail: string;
  spec: string;
}

interface GsmTier {
  gsm: string;
  name: string;
  market: string;
  buyers: string;
  sub: string;
  featured: boolean;
}

interface FitProfile {
  code: string;
  name: string;
  ease: string;
  sleeve: string;
  market: string;
  description: string;
}

interface DecorationMethod {
  code: string;
  method: string;
  best: string;
  markets: string[];
  min: string;
  detail: string;
}

interface BuyerProfile {
  initial: string;
  type: string;
  order: string;
  priority: string;
  spec: string;
}

interface OemStep {
  num: string;
  phase: string;
  time: string;
  buyer: string;
  mz: string;
}

interface CertBadge {
  img: string;
  name: string;
  note: string;
}

interface RelatedProduct {
  title: string;
  tag: string;
  href: string;
  image: string;
  alt: string;
}

interface Stat {
  label: string;
  value: number | string;
  animate: boolean;
  suffix: string;
}

interface EnquiryItem {
  n: string;
  label: string;
  eg: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS: Construction[] = [
  {
    id: "french-terry",
    name: "French Terry",
    badge: "~45% of volume",
    gsm: "300–400 GSM",
    hand: "Smooth exterior face, soft looped interior",
    best: ["Street & Fashion", "Casual Retail", "Premium Basics"],
    markets: ["USA", "UK", "EU", "AUS"],
    decorations: ["Screen Print", "Embroidery", "Heat Transfer", "DTG"],
    detail:
      "The industry standard for premium hoodies and crewnecks. Single-faced knit with smooth exterior and uncut loops on the interior. Available in ring-spun and combed cotton. Wide GSM range covers spring layers through winter staples. Accepts all major decoration methods — screen print fidelity is exceptional. Combed cotton variant produces the cleanest print registration. Enzyme-washed, garment-dyed and compacted finishes all available.",
    spec:
      "Combed cotton 100% or 80/20 cotton-polyester. Loop height 2–4mm. Available in ring-spun, open-end and slub variants.",
  },
  {
    id: "loop-back-fleece",
    name: "Loop Back Fleece",
    badge: "",
    gsm: "280–380 GSM",
    hand: "Compact exterior, un-brushed loop interior — structured, shape-retaining",
    best: ["Sports Brands", "Athletic Retail", "Performance Lines"],
    markets: ["USA", "UK"],
    decorations: ["Screen Print", "Embroidery", "Sublimation"],
    detail:
      "Loop back fleece has a tight, smooth exterior and un-brushed loop interior. More structured than French terry — holds garment shape through repeated commercial washing cycles. Preferred for athletic and performance-positioned hoodies where shape retention and silhouette consistency matter more than plush softness. Compatible with sublimation on polyester-blend variants.",
    spec:
      "80% cotton / 20% polyester standard. Anti-pill and anti-static finishes available. Suitable for sublimation on 65%+ polyester versions.",
  },
  {
    id: "brushed-fleece",
    name: "Brushed Fleece",
    badge: "Premium Pick",
    gsm: "320–420 GSM",
    hand: "Mechanically brushed interior — the densest, softest pile",
    best: ["Luxury Basics", "Premium Retail", "USA Streetwear"],
    markets: ["USA", "EU", "UK"],
    decorations: ["Embroidery", "Screen Print", "Woven Badge"],
    detail:
      "Three-end brushed fleece — the construction buyers associate with premium heavyweight hoodies. Interior loops are mechanically brushed to a dense 3–5mm pile. Significantly heavier feel per GSM than French terry. Growing demand in USA streetwear and premium basics segments at 380–420 GSM. GOTS certified cotton available — a growing requirement from EU sustainability mandates.",
    spec:
      "3-end fleece. Ring-spun combed cotton preferred. Brushed to 3–5mm pile. GOTS certified cotton option. Compacted finish for anti-shrink.",
  },
  {
    id: "polar-fleece",
    name: "Polar Fleece",
    badge: "",
    gsm: "150–300 GSM",
    hand: "Lightweight, pill-resistant, technical feel",
    best: ["Outdoor Brands", "Sports Retail", "Corporate Gifting"],
    markets: ["USA", "EU", "AUS"],
    decorations: ["Embroidery", "Heat Transfer"],
    detail:
      "100% polyester anti-pill polar fleece. Significantly lighter than cotton fleece at equivalent warmth retention. Washable without shape loss over extended commercial laundry cycles. Strong in corporate gifting, outdoor brands and sports retail. GRS certified recycled polyester variant available — important for buyers with sustainability commitments. Accepts embroidery and heat transfer cleanly.",
    spec:
      "100% polyester. Anti-pill standard. GRS certified recycled polyester available. UPF-rated options. Full-zip, quarter-zip and vest styles.",
  },
  {
    id: "air-layer",
    name: "Air Layer / Space Dye",
    badge: "",
    gsm: "250–350 GSM",
    hand: "Structured, breathable, visible yarn dimension",
    best: ["Fashion Brands", "Contemporary Retail", "Athleisure"],
    markets: ["EU", "UK", "USA"],
    decorations: ["Screen Print", "DTG", "Heat Transfer"],
    detail:
      "Air layer knit creates visible texture through its open construction — lighter and more breathable than solid fleece while maintaining structure. Space dye variants introduce multi-colour pre-dyed yarn for a deliberately irregular, fashion-forward aesthetic. Popular in contemporary and premium fashion retail. Cannot be garment-dyed after construction due to yarn pre-colouring.",
    spec:
      "Cotton or cotton-polyester blend. Open knit construction. Space dye: multi-colour pre-dyed yarn. Cannot be garment-dyed post-construction.",
  },
  {
    id: "bonded-fleece",
    name: "Bonded Fleece",
    badge: "",
    gsm: "300–450 GSM",
    hand: "Two-layer laminate — no seam show-through, technical drape",
    best: ["Outerwear Brands", "Technical Apparel"],
    markets: ["USA", "EU"],
    decorations: ["Embroidery", "Woven Badge"],
    detail:
      "An outer shell fabric bonded to a polar fleece backing — eliminates interior seam show-through and creates a technical, outerwear-grade appearance. More complex construction with higher unit cost, but commands premium retail positioning. Preferred for full-zip styles and structured layering pieces. Windproof options with membrane bonding available.",
    spec:
      "Outer: woven nylon or polyester shell. Inner: anti-pill polar fleece. Bonded with breathable adhesive. Windproof membrane options.",
  },
];

const GSM_TIERS: GsmTier[] = [
  {
    gsm: "280–300",
    name: "Performance",
    market: "Athletic / Summer",
    buyers: "Sports brands, gym, activewear",
    sub: "Lightest category. Fast-drying. Best for athletic and performance layering.",
    featured: false,
  },
  {
    gsm: "300–340",
    name: "Everyday",
    market: "Fashion / Casual",
    buyers: "Fast fashion, mass-market",
    sub: "EU and UK fast fashion standard. Competitive price point, all decoration methods.",
    featured: false,
  },
  {
    gsm: "340–380",
    name: "Premium Retail",
    market: "Year-Round",
    buyers: "Premium casual, branded retail",
    sub: "Most-ordered tier globally. Substantial hand feel. USA mid-market standard.",
    featured: true,
  },
  {
    gsm: "380–420",
    name: "Heavyweight",
    market: "USA Streetwear",
    buyers: "Streetwear, premium basics",
    sub: "The defining weight of American streetwear. Structured and warm. Drop-culture standard.",
    featured: false,
  },
  {
    gsm: "420+",
    name: "Ultra-Heavy",
    market: "Luxury / Structured",
    buyers: "Luxury basics, sculpted streetwear",
    sub: "Premium pricing tier. Exceptional drape weight. Sculpted silhouette.",
    featured: false,
  },
];

const FIT_PROFILES: FitProfile[] = [
  {
    code: "RF",
    name: "Regular Fit",
    ease: "+5–8 cm",
    sleeve: "Set-in sleeve",
    market: "Corporate · Hospitality · Mass Market",
    description:
      "Straight cut from chest to hem. Standard sleeve pitch. Industry default for corporate uniform programmes and promotional buyers.",
  },
  {
    code: "SF",
    name: "Slim Fit",
    ease: "+2–4 cm",
    sleeve: "Set-in, high armhole",
    market: "Contemporary Retail · Premium Brands",
    description:
      "Reduced ease across chest and waist. Tapered body. Mid-market and premium fashion brands shipping to EU, UK and USA.",
  },
  {
    code: "OS",
    name: "Oversized",
    ease: "+12–20 cm",
    sleeve: "Dropped shoulder 3–7 cm",
    market: "Streetwear · USA Brands · Drop Culture",
    description:
      "Significantly dropped shoulder. Extended body length. Wide sleeve opening. The defining aesthetic of USA premium streetwear and drop-culture labels.",
  },
  {
    code: "AT",
    name: "Athletic",
    ease: "+3–5 cm",
    sleeve: "Raglan or set-in",
    market: "Sports Brands · Gym · Activewear",
    description:
      "Engineered for freedom of movement. Articulated armhole, slightly tapered waist. Loop back fleece or air layer construction preferred.",
  },
];

const DECORATION_METHODS: DecorationMethod[] = [
  {
    code: "SP",
    method: "Screen Print",
    best: "Bold graphics, 1–6 colour, high volume",
    markets: ["USA", "UK", "EU"],
    min: "300 pcs",
    detail:
      "PVC-free water-based inks standard. Plastisol on request. Per-unit cost drops sharply with volume. Best for clean, high-contrast artwork with defined colour separations.",
  },
  {
    code: "EM",
    method: "Embroidery",
    best: "Logo, crest, chest badge — premium",
    markets: ["USA", "UK", "EU"],
    min: "100 pcs",
    detail:
      "Digitised to specification. Standard left chest 7–9 cm. Metallic thread available. Wash-tested to 50+ cycles. Preferred for corporate uniform programmes and premium retail.",
  },
  {
    code: "DG",
    method: "DTG / Digital",
    best: "Photographic, short-run, multi-colour",
    markets: ["USA", "EU"],
    min: "50 pcs",
    detail:
      "Direct-to-garment. No screen setup cost — ideal for complex artwork at low quantities. Best results on 100% cotton French terry. Soft hand feel after printing.",
  },
  {
    code: "HT",
    method: "Heat Transfer",
    best: "Logo, neck label, multiple placements",
    markets: ["USA", "UK", "EU"],
    min: "50 pcs",
    detail:
      "Film printed and heat-pressed onto the garment. Excellent for neck labels, sleeve prints and multi-placement brand markings. Economical for programmes requiring 3+ placement positions.",
  },
  {
    code: "SB",
    method: "Sublimation",
    best: "All-over print, polyester blends",
    markets: ["USA", "EU"],
    min: "100 pcs",
    detail:
      "Full-garment dye-sublimation. Requires 65%+ polyester. Unlimited colour palette with zero print setup cost. Used for all-over print sports hoodies and performance collections.",
  },
  {
    code: "AP",
    method: "Appliqué",
    best: "Dimensional texture, patches, streetwear",
    markets: ["USA", "EU", "UK"],
    min: "200 pcs",
    detail:
      "Fabric cut and stitched to garment face for a 3D dimensional effect. Common in USA streetwear and premium casual. Frequently combined with embroidery for mixed-technique execution.",
  },
];

const BUYER_PROFILES: BuyerProfile[] = [
  {
    initial: "S",
    type: "Street & Fashion Brands",
    order: "300–8,000 pcs",
    priority:
      "Weight, cut, colourway and graphic placement — the design is the product. Heavyweight brushed fleece and oversized fit are non-negotiable.",
    spec: "380–420 GSM brushed fleece · oversized · full-chest screen print",
  },
  {
    initial: "C",
    type: "Corporate Uniform Buyers",
    order: "200–5,000 pcs",
    priority:
      "Logo durability across 50+ wash cycles, colour consistency across departments, and on-time delivery to a programmed schedule.",
    spec: "340 GSM French terry · regular fit · left-chest embroidery",
  },
  {
    initial: "A",
    type: "Sports & Athletic Brands",
    order: "500–10,000 pcs",
    priority:
      "Fabric performance, moisture management, consistent graded sizing across colour runs, and sublimation print fidelity on polyester constructions.",
    spec: "280–320 GSM loop back fleece · athletic fit · sublimation or embroidery",
  },
  {
    initial: "B",
    type: "Branded Retail Programmes",
    order: "100–3,000 pcs",
    priority:
      "Seasonal colourways on reasonable quantities, quick sampling turnaround, and retail-ready individual packaging that protects the brand presentation.",
    spec: "300–360 GSM French terry · slim or regular fit · DTG or heat transfer",
  },
];

const OEM_STEPS: OemStep[] = [
  {
    num: "01",
    phase: "Brief Submission",
    time: "Day 1",
    buyer: "Submit construction, GSM, fit, decoration, packaging and quantity via the RFQ wizard.",
    mz: "Technical feasibility review within 24 hours. Alternatives suggested if specification is outside production range.",
  },
  {
    num: "02",
    phase: "Costing & Approval",
    time: "Days 2–5",
    buyer: "Review formal quotation. Approve price, lead time and sample terms in writing.",
    mz: "Issue formal quotation with per-unit cost, sample cost and production timeline. Tech pack confirmed.",
  },
  {
    num: "03",
    phase: "Sample Development",
    time: "Weeks 1–3",
    buyer: "Review fit, fabric, colour and decoration. Annotate and return with corrections or approval.",
    mz: "Pre-production sample developed. Lab tests on colorfastness, shrinkage and tensile available on request.",
  },
  {
    num: "04",
    phase: "Pre-Production",
    time: "Weeks 4–6",
    buyer: "Approve PP sample and release bulk production in writing. No bulk cut without this approval.",
    mz: "PP sample issued for buyer sign-off. Bulk fabric cut only after written approval is received.",
  },
  {
    num: "05",
    phase: "Bulk & QC",
    time: "Weeks 7–16",
    buyer: "Receive in-line inspection report. Approve pre-shipment loading and documents.",
    mz: "In-line inspection at sewing stage. Pre-shipment AQL inspection. Documents: CI, PL, CoO, B/L issued.",
  },
];

const CERT_BADGES: CertBadge[] = [
  { img: "/images/certs/cert-gots.webp", name: "GOTS", note: "Global Organic Textile Standard — organic cotton supply chain" },
  { img: "/images/certs/cert-oeko-tex.webp", name: "OEKO-TEX Standard 100", note: "Harmful substance testing — USA, EU and UK retail requirement" },
  { img: "/images/certs/cert-bsci.webp", name: "BSCI", note: "Business Social Compliance Initiative — European retail social audit" },
  { img: "/images/certs/cert-grs.webp", name: "GRS", note: "Global Recycled Standard — for recycled polyester polar fleece" },
  { img: "/images/certs/cert-iso-9001.webp", name: "ISO 9001", note: "Quality management system — consistent factory standards" },
  { img: "/images/certs/cert-wrap.webp", name: "WRAP", note: "Worldwide Responsible Accredited Production — USA preferred" },
  { img: "/images/certs/cert-bci.webp", name: "BCI", note: "Better Cotton Initiative — responsible cotton sourcing standard" },
  { img: "/images/certs/cert-sa8000.webp", name: "SA8000", note: "Social Accountability Standard — labour rights certification" },
];

const RELATED: RelatedProduct[] = [
  {
    title: "T-Shirts",
    tag: "Knitted Garments",
    href: "/apparel/knittedgarments/tshirts/",
    image: "/images/menu/menu-tshirts.webp",
    alt: "Pakistan t-shirt manufacturer — OEM cotton t-shirts wholesale for brands in USA UK and Europe",
  },
  {
    title: "Polo Shirts",
    tag: "Knitted Garments",
    href: "/apparel/knittedgarments/poloshirts/",
    image: "/images/menu/menu-poloshirts.webp",
    alt: "Pakistan polo shirt manufacturer — piqué and performance polo shirts OEM wholesale",
  },
  {
    title: "Sweatpants & Joggers",
    tag: "Knitted Garments",
    href: "/apparel/knittedgarments/sweatpantsjoggers/",
    image: "/images/menu/menu-sweatpantsjoggers.webp",
    alt: "Pakistan sweatpants and joggers manufacturer — OEM French terry joggers wholesale",
  },
  {
    title: "Tank Tops",
    tag: "Knitted Garments",
    href: "/apparel/knittedgarments/tanktops/",
    image: "/images/menu/menu-tanktops.webp",
    alt: "Pakistan tank top manufacturer — single jersey and rib knit tank tops OEM wholesale",
  },
];

const STATS: Stat[] = [
  { label: "Fabric Constructions", value: 6, animate: true, suffix: "" },
  { label: "GSM Range", value: "300–420", animate: false, suffix: "" },
  { label: "Decoration Methods", value: 6, animate: true, suffix: "" },
  { label: "Max Lead Time", value: 16, animate: true, suffix: " wks" },
  { label: "Size Standards", value: "USA · UK · EU", animate: false, suffix: "" },
  { label: "Certifications Available", value: 8, animate: true, suffix: "+" },
];

const ENQUIRY_CHECKLIST: EnquiryItem[] = [
  { n: "01", label: "Fabric Construction & Composition", eg: "e.g. French terry, 100% combed cotton, 360 GSM" },
  { n: "02", label: "GSM Weight Range", eg: "e.g. 340–380 GSM — confirm target weight range" },
  { n: "03", label: "Fit Profile & Size Range", eg: "e.g. oversized, dropped shoulder, XS–3XL USA sizing" },
  { n: "04", label: "Colourways & Pantone References", eg: "e.g. 4 colours, Pantone 19-4024 TPX (navy)" },
  { n: "05", label: "Decoration Method & Placement", eg: "e.g. screen print front chest 30×30 cm, 3-colour" },
  { n: "06", label: "Quantity Per Style / Per Colour", eg: "e.g. 500 pcs per colour, 3 colours = 1,500 pcs total" },
  { n: "07", label: "Packaging Requirement", eg: "e.g. individual polybag, hanger + polybag, retail box" },
  { n: "08", label: "Port, Incoterm & Delivery Date", eg: "e.g. FOB Karachi by 15 Nov, or CIF Los Angeles" },
];

const RFQ_COVERS = [
  "Fabric construction and fibre composition guide",
  "GSM weight selector with market context",
  "Fit profile and size range fields",
  "Decoration method, placement and artwork upload",
  "Finishing treatment options",
  "Individual and master carton packaging spec",
  "Destination port, incoterm and delivery date",
  "Certification requirements by target market",
];

const SOURCE_POINTS = [
  "GOTS and OEKO-TEX certified factory network",
  "AQL pre-shipment inspection on every bulk order",
  "FOB, CIF and DDP shipping to all major markets",
  "12–16 week lead time from specification to delivery",
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useCountUp(to: number, duration = 1.4) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return { value, ref };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AnimatedStat({ to, suffix, duration = 1.4 }: { to: number; suffix: string; duration?: number }) {
  const { value, ref } = useCountUp(to, duration);
  return (
    <div ref={ref} className="text-gold font-bold text-xl sm:text-2xl tabular-nums">
      {value}{suffix}
    </div>
  );
}

function ConstructionShowcase() {
  const [active, setActive] = useState("french-terry");
  const current = CONSTRUCTIONS.find((c) => c.id === active)!;

  return (
    <div className="grid lg:grid-cols-[260px_1fr] rounded-2xl overflow-hidden border border-white/8">
      <div className="bg-[#04090f] lg:border-r border-white/8" role="tablist" aria-label="Fabric constructions">
        {CONSTRUCTIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            role="tab"
            aria-selected={active === c.id}
            className={`w-full text-left px-5 py-4 border-b border-white/5 transition-all duration-150 border-l-2 ${
              active === c.id
                ? "border-l-gold bg-gold/10"
                : "border-l-transparent hover:bg-white/5"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className={`font-semibold text-sm ${active === c.id ? "text-white" : "text-gray-400"}`}>
                  {c.name}
                </p>
                <p className="text-[11px] text-gray-600 mt-0.5">{c.gsm}</p>
              </div>
              {c.badge && (
                <span className="text-[9px] font-bold tracking-widest text-gold uppercase bg-gold/10 rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5">
                  {c.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          role="tabpanel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-[#08111f] p-6 lg:p-8"
        >
          <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden mb-6">
            <Image
              src="/images/menu/menu-sweatshirtshoodies.webp"
              alt={`${current.name} sweatshirt construction — Pakistan fleece garment sourcing for brands in USA, UK and Europe`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08111f] via-transparent to-transparent" />
          </div>

          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              {current.badge && (
                <span className="inline-block text-[10px] font-bold text-gold bg-gold/10 border border-gold/20 rounded px-2 py-0.5 mb-2">
                  {current.badge}
                </span>
              )}
              <h3 className="text-white font-bold text-2xl">{current.name}</h3>
              <p className="text-gray-400 text-sm italic mt-1">{current.hand}</p>
            </div>
            <span className="px-3 py-1 bg-gold/15 border border-gold/30 text-gold text-xs font-bold rounded-full">
              {current.gsm}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {current.best.map((b) => (
              <span key={b} className="px-2.5 py-1 border border-gold/30 text-gold text-[10px] font-medium rounded">
                {b}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {current.decorations.map((d) => (
              <span key={d} className="px-2.5 py-1 bg-white/5 border border-white/10 text-gray-400 text-[10px] font-medium rounded">
                {d}
              </span>
            ))}
          </div>

          <div className="border-t border-white/8 pt-5 mb-4">
            <p className="text-gray-300 text-sm leading-relaxed">{current.detail}</p>
          </div>

          <div className="p-3 bg-white/3 rounded-lg border border-white/5 mb-5">
            <p className="text-gray-500 text-[11px] leading-relaxed">
              <span className="text-gray-400 font-semibold">Spec note: </span>
              {current.spec}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-1.5">
              {current.markets.map((m) => (
                <span key={m} className="px-2.5 py-1 bg-white/8 border border-white/12 text-gray-300 text-[11px] font-medium rounded-full">
                  {m}
                </span>
              ))}
            </div>
            <Link href="/rfq/" className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:underline ml-auto">
              Specify this construction in your RFQ →
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ParallaxBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <div ref={ref} className="relative h-[55vh] min-h-[400px] overflow-hidden">
      <motion.div className="absolute inset-[-10%]" style={{ y: imgY }}>
        <Image
          src="/images/hero/hero-apparel.webp"
          alt="Pakistan certified apparel factories — sweatshirt and hoodie OEM sourcing for international brands and retailers"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-navy-950/55" />
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          <p className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight">
            &ldquo;Every stitch, weight, colour and logo — to your specification.&rdquo;
          </p>
          <cite className="not-italic text-gold text-xs font-semibold tracking-[0.2em] uppercase mt-5 block">
            MZ Global Trading — Pakistan
          </cite>
        </motion.blockquote>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HoodiesContent() {
  const heroLine1 = ["Sweatshirts", "&", "Hoodies"];
  const heroLine2 = ["Manufacturing", "—", "Pakistan"];

  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[680px] max-h-[900px] overflow-hidden">
        <Image
          src="/images/thumbnails/thumb-hoodies-sweatshirts.webp"
          alt="Pakistan sweatshirt and hoodie manufacturing — OEM fleece hoodies for brands and retailers in USA, UK and Europe"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-gray-500 text-xs">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">/</span>
              <Link href="/apparel/knittedgarments/" className="hover:text-gold transition-colors">Knitted Garments</Link>
              <span aria-hidden="true">/</span>
              <span className="text-gold">Sweatshirts &amp; Hoodies</span>
            </nav>
          </div>

          <div className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                >
                  Knitted Garments — Pakistan
                </motion.p>

                <h1 className="font-black leading-none mb-2">
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-x-4 text-5xl sm:text-6xl lg:text-7xl">
                      {heroLine1.map((word, i) => (
                        <motion.span
                          key={word}
                          className="inline-block text-white"
                          initial={{ y: "110%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 28,
                            delay: 0.3 + i * 0.08,
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-hidden mt-2">
                    <div className="flex flex-wrap gap-x-3 text-3xl sm:text-4xl lg:text-5xl">
                      {heroLine2.map((word, i) => (
                        <motion.span
                          key={word}
                          className="inline-block text-gray-300 font-normal"
                          initial={{ y: "110%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 28,
                            delay: 0.54 + i * 0.08,
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mt-5"
                >
                  MZ Global Trading connects international brands and retailers directly with Pakistan&apos;s
                  certified sweatshirt and hoodie factories — French terry, brushed fleece and loop back
                  fleece, 300–420 GSM, AQL-inspected and shipped FOB or CIF.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="flex flex-wrap gap-2 mb-7"
                >
                  {["GOTS Available", "OEKO-TEX Certified", "Pre-Shipment Inspection", "FOB · CIF · DDP"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 border border-white/15 text-white text-[11px] font-medium rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="flex flex-wrap gap-3"
                >
                  <Link
                    href="/rfq/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors"
                  >
                    Request a Quote
                  </Link>
                  <a
                    href="#construction"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white text-sm rounded hover:border-gold hover:text-gold transition-colors"
                  >
                    Explore Constructions ↓
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gold via-gold/40 to-transparent origin-left"
        />
      </section>

      {/* ── 2. Stats Strip ───────────────────────────────────────────────────── */}
      <section className="bg-navy-900 py-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="text-center py-3 px-2"
              >
                {stat.animate && typeof stat.value === "number" ? (
                  <AnimatedStat to={stat.value} suffix={stat.suffix} />
                ) : (
                  <p className="text-gold font-bold text-xl sm:text-2xl tabular-nums">
                    {stat.value}{stat.suffix}
                  </p>
                )}
                <p className="text-gray-400 text-[11px] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Source Intro ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="w-12 h-1 bg-gold mb-7" />
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 italic leading-tight">
                &ldquo;Pakistan&apos;s certified fleece factories. Your brand specification. Our sourcing
                expertise.&rdquo;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.1 }}
            >
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                MZ Global Trading is a Pakistan-based B2B textile sourcing company. We do not operate a
                factory — we operate access to them. Our network of certified fleece garment manufacturers
                covers every construction, weight and decoration method your programme requires, under a
                single accountable sourcing relationship.
              </p>
              <ul className="space-y-3">
                {SOURCE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/rfq/"
                  className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 border-b-2 border-gold pb-0.5 hover:text-gold transition-colors"
                >
                  Start your sourcing enquiry
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. Construction Showcase ─────────────────────────────────────────── */}
      <section id="construction" className="py-16 sm:py-20 bg-[#060e18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Fabric Construction</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Six Constructions We Source</h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl">
              Construction choice determines hand feel, weight, decoration compatibility and retail positioning.
              Select each construction to see detailed guidance and specification notes.
            </p>
          </motion.div>

          <ConstructionShowcase />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 p-5 bg-gold/5 border border-gold/20 rounded-2xl flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
          >
            <div>
              <p className="text-white font-semibold text-sm mb-1">Not sure which construction is right for your range?</p>
              <p className="text-gray-400 text-xs max-w-lg">
                Tell us your end-use, target market, retail price point and decoration requirement — we will recommend a construction and provide a development sample for evaluation.
              </p>
            </div>
            <Link
              href="/contact-us/"
              className="flex-shrink-0 inline-flex items-center justify-center px-5 py-2.5 border border-gold/40 text-gold text-sm font-semibold rounded hover:bg-gold hover:text-navy-900 transition-colors"
            >
              Ask a Technician
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 5. GSM Weight Cards ──────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Specification Reference</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">GSM Weight Guide</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">
              GSM (grams per square metre) is the primary weight specification for sweatshirts and hoodies.
              Higher GSM means heavier hand feel, stronger perceived quality, and higher retail price point.
            </p>
          </motion.div>

          <div className="sm:hidden flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory">
            {GSM_TIERS.map((tier, i) => (
              <motion.div
                key={tier.gsm}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`flex-shrink-0 w-[220px] snap-start rounded-2xl p-5 border ${
                  tier.featured
                    ? "border-gold bg-gold/5"
                    : "border-gray-200 bg-white"
                }`}
              >
                {tier.featured && (
                  <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 rounded px-2 py-0.5 mb-3">
                    Most Ordered
                  </span>
                )}
                <p className="text-gold font-black text-2xl mb-1">{tier.gsm}</p>
                <p className="text-navy-900 font-bold text-sm mb-0.5">{tier.name}</p>
                <p className="text-gray-400 text-[11px] mb-3">{tier.buyers}</p>
                <div className="h-px bg-gray-100 mb-3" />
                <p className="text-gray-500 text-[11px] leading-relaxed">{tier.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-3">
            {GSM_TIERS.map((tier, i) => (
              <motion.div
                key={tier.gsm}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className={`rounded-2xl p-5 border transition-all duration-200 cursor-default ${
                  tier.featured
                    ? "border-gold bg-gold/5 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gold/40 hover:shadow-sm"
                }`}
              >
                {tier.featured && (
                  <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 rounded px-2 py-0.5 mb-3">
                    Most Ordered
                  </span>
                )}
                <p className="text-gold font-black text-2xl mb-1">{tier.gsm}</p>
                <p className="text-navy-900 font-bold text-sm mb-0.5">{tier.name}</p>
                <p className="text-gray-400 text-[11px] mb-1">{tier.market}</p>
                <p className="text-gray-400 text-[11px] mb-3">{tier.buyers}</p>
                <div className="h-px bg-gray-100 mb-3" />
                <p className="text-gray-500 text-[11px] leading-relaxed">{tier.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Fit Profiles ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Cut & Construction</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Four Fit Profiles</h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl">
              Fit is graded to your size chart or to standard USA, EU or UK sizing. All four profiles available
              across all six fabric constructions. Specify at RFQ stage.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FIT_PROFILES.map((fit, i) => (
              <motion.div
                key={fit.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 26, delay: i * 0.07 }}
                className="relative bg-white/5 border border-white/8 rounded-2xl p-6 overflow-hidden hover:border-gold/30 transition-colors duration-200"
              >
                <span
                  className="absolute -top-3 -right-2 text-8xl font-black text-white/5 leading-none select-none"
                  aria-hidden="true"
                >
                  {fit.code}
                </span>
                <div className="relative z-10">
                  <p className="text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">
                    {fit.market}
                  </p>
                  <h3 className="text-white font-bold text-xl mb-1">{fit.name}</h3>
                  <p className="text-gray-500 text-xs mb-4">
                    {fit.ease} ease · {fit.sleeve}
                  </p>
                  <div className="h-px bg-white/8 mb-4" />
                  <p className="text-gray-300 text-sm leading-relaxed">{fit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Decoration Methods ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#060e18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Branding & Print</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Decoration &amp; Printing</h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl">
              Six decoration methods available from our factory network. Method selection depends on artwork
              complexity, colour count, fabric construction and run quantity. All methods confirmed at sample stage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DECORATION_METHODS.map((dec, i) => (
              <motion.div
                key={dec.method}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 26, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="relative bg-white/5 border border-white/8 rounded-2xl p-6 overflow-hidden group hover:border-gold/30 transition-all duration-200"
              >
                <span
                  className="absolute -top-4 -right-2 text-8xl font-black text-white/4 leading-none select-none"
                  aria-hidden="true"
                >
                  {dec.code}
                </span>
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-lg mb-2">{dec.method}</h3>
                  <div className="mb-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">Best for: </span>
                    <span className="text-gold text-xs font-medium">{dec.best}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {dec.markets.map((m) => (
                      <span
                        key={m}
                        className="text-[10px] text-gray-400 bg-white/5 border border-white/8 rounded px-1.5 py-0.5"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs mb-3">Minimum: {dec.min}</p>
                  <div className="h-px bg-white/5 mb-3" />
                  <p className="text-gray-400 text-[11px] leading-relaxed">{dec.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Buyer Profiles ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Who Sources From Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Four Buyer Profiles</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-2xl">
              Streetwear labels, corporate buyers, sports brands and retail programmes all source hoodies and
              sweatshirts through MZ Global Trading — each with different priorities, volumes and specification
              requirements.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUYER_PROFILES.map((profile, i) => (
              <motion.div
                key={profile.type}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 26, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="relative bg-white rounded-2xl border border-gray-100 p-6 overflow-hidden hover:border-gold/40 hover:shadow-md transition-all duration-200 cursor-default"
              >
                <span
                  className="absolute -top-4 -right-2 text-9xl font-black text-gray-50 leading-none select-none"
                  aria-hidden="true"
                >
                  {profile.initial}
                </span>
                <div className="relative z-10">
                  <p className="text-gold font-bold text-xl mb-1">{profile.order}</p>
                  <h3 className="text-navy-900 font-bold text-base mb-3">{profile.type}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{profile.priority}</p>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Standard Spec</p>
                    <p className="text-navy-900 text-xs font-medium leading-relaxed">{profile.spec}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Parallax Editorial Break ──────────────────────────────────────── */}
      <ParallaxBreak />

      {/* ── 10. OEM Process Timeline ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">OEM Programme</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 max-w-md">
                From Your Brief to Delivered Order
              </h2>
              <p className="text-gray-500 text-sm max-w-xs lg:text-right">
                Total lead time 12–16 weeks for a first order. Repeat orders are faster with approved specs on file.
              </p>
            </div>
          </motion.div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:block relative mb-2">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              className="absolute top-5 left-[5%] right-[5%] h-px bg-gradient-to-r from-gold/50 via-gold/30 to-gold/10 origin-left"
            />
            <div className="grid grid-cols-5 gap-4">
              {OEM_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-gold text-gold font-black text-xs font-mono flex items-center justify-center mb-4 shadow-sm">
                    {step.num}
                  </div>
                  <p className="font-bold text-navy-900 text-sm mb-0.5">{step.phase}</p>
                  <p className="text-gold text-[11px] font-semibold mb-4">{step.time}</p>
                  <div className="w-full text-left bg-white rounded-xl border border-gray-100 p-3 space-y-2.5">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">You</p>
                      <p className="text-gray-600 text-[11px] leading-relaxed">{step.buyer}</p>
                    </div>
                    <div className="h-px bg-gray-50" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gold mb-1">MZ Global Trading</p>
                      <p className="text-gray-500 text-[11px] leading-relaxed">{step.mz}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical */}
          <div className="lg:hidden space-y-0">
            {OEM_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="grid grid-cols-[48px_1fr] gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-gold text-gold font-black text-xs font-mono flex items-center justify-center flex-shrink-0 shadow-sm">
                    {step.num}
                  </div>
                  {i < OEM_STEPS.length - 1 && (
                    <div className="flex-1 w-px bg-gray-200 my-1" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-bold text-navy-900 text-sm mb-0.5">{step.phase}</p>
                  <p className="text-gold text-[11px] font-semibold mb-3">{step.time}</p>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">You</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.buyer}</p>
                    </div>
                    <div className="h-px bg-gray-50" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gold mb-1">MZ Global Trading</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.mz}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Certifications ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Quality &amp; Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Certifications We Source Against</h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl">
              Our factory network holds the certifications most commonly required by corporate buyers, sports
              brands and retailers in the USA, UK and Europe. Certification requirements are confirmed in writing
              before production. All test reports available on request.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CERT_BADGES.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-xl p-4 hover:border-gold/25 transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-16 h-10 relative">
                  <Image
                    src={cert.img}
                    alt={cert.name}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm">{cert.name}</p>
                  <p className="text-gray-500 text-[11px] leading-snug mt-0.5">{cert.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. Enquiry + RFQ CTA ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Get a Quote</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
                8 Things to Have Ready
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-7">
                The more precise your brief, the faster and more accurate our response. A complete specification
                avoids back-and-forth and gets you a formal quotation within 24–48 hours.
              </p>
              <div className="space-y-3">
                {ENQUIRY_CHECKLIST.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gold/30 transition-colors duration-200"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy-900 text-gold text-[10px] font-black flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-navy-900 font-semibold text-sm">{item.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.eg}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-40">
              <div className="bg-navy-900 rounded-2xl p-8">
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Start Now</p>
                <h3 className="text-white font-bold text-2xl mb-4">
                  Our RFQ Wizard Covers Every Specification
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  The wizard walks you through every decision — construction, GSM, fit, decoration, finishing,
                  packaging and logistics. Takes 5–8 minutes. A structured brief means we respond with an
                  accurate quotation, not an estimate.
                </p>
                <div className="space-y-3 mb-7">
                  {RFQ_COVERS.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-gray-300 text-xs">
                      <svg
                        className="w-3.5 h-3.5 text-gold flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/rfq/"
                  className="block w-full text-center px-6 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors"
                >
                  Open RFQ Wizard →
                </Link>
                <p className="text-gray-600 text-xs text-center mt-4">
                  Or email directly:{" "}
                  <a href="mailto:info@mzglobaltrading.com" className="text-gold hover:underline">
                    info@mzglobaltrading.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. Related Products ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Knitted Garments</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">More From This Category</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {RELATED.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="h-52 sm:h-64"
              >
                <Link
                  href={r.href}
                  className="group flex flex-col w-full h-full rounded-2xl overflow-hidden border border-gray-100 hover:border-gold/40 transition-colors duration-200"
                >
                  <div className="relative flex-1 min-h-0 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="bg-navy-900 px-4 py-3 flex-shrink-0">
                    <p className="text-white font-semibold text-sm leading-snug">{r.title}</p>
                    <p className="text-gold text-xs mt-1">{r.tag}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/apparel/knittedgarments/"
              className="inline-flex items-center gap-2 text-navy-900 font-semibold text-sm hover:text-gold transition-colors"
            >
              View All Knitted Garments
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 14. Certifications Strip ─────────────────────────────────────────── */}
      <CertificationsStrip />
    </>
  );
}
