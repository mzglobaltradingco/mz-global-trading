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
          boxShadow: dark
            ? "0 0 0 0 rgba(212,160,23,0.4)"
            : "0 0 0 0 rgba(212,160,23,0.3)",
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

const TERRY_CONSTRUCTIONS = [
  {
    id: "terry-loop",
    name: "Terry Loop",
    badge: "Industry Standard",
    gsm: "350–700 GSM",
    pile: "Uncut loop pile on both faces",
    absorbency: "Highest — recommended for all bath programmes",
    best: ["Bath Towels", "Hand Towels", "Institutional Supply", "Face Cloths"],
    markets: ["USA", "UK", "EU", "Middle East", "Australia"],
    finishing: ["Soft Hand / Silicone", "Anti-Bacterial", "Anti-Shrink"],
    detail:
      "Terry loop is the global benchmark for bath linen fabric. Uncut loop pile on both faces delivers maximum absorbency and a familiar textured surface. The loop structure creates the characteristic soft, springy hand associated with quality towelling. Available in 100% ring-spun combed cotton, or cotton/polyester blends for institutional programmes requiring faster drying times. GSM range 350–700 covers economy institutional through luxury hotel grade.",
    spec: "100% ring-spun combed cotton or cotton/polyester blend. Pile height 4–12 mm. Reactive dyed or bleached white. Both-sided loop pile. GOTS and OEKO-TEX Standard 100 options available.",
  },
  {
    id: "velour",
    name: "Velour / Sheared Terry",
    badge: "Premium Finish",
    gsm: "380–650 GSM",
    pile: "Sheared face — velvet-smooth surface; loop back",
    absorbency: "Good — slightly lower than loop due to pile shearing",
    best: ["Premium Bath Towels", "Beach Towels", "Promotional Towels", "Hotel Premium Tier"],
    markets: ["USA", "EU", "Japan", "Middle East", "Australia"],
    finishing: ["Velour / Shearing Finish", "Soft Hand / Silicone", "Anti-Bacterial"],
    detail:
      "Velour terry is produced by shearing one face of terry loop fabric, creating a smooth velvet-like surface while retaining the looped back for absorbency. The sheared face provides a premium visual appearance and is sublimation print compatible — enabling photo-quality all-over print for promotional and beach towels. Demand is highest in USA premium retail, European gift programmes and Middle East hospitality where visual presentation commands a premium.",
    spec: "100% combed cotton. GSM 380–650. Sheared face, loop back. Sublimation print compatible on face. Reactive dyed or printed. OEKO-TEX Standard 100 available.",
  },
  {
    id: "zero-twist",
    name: "Zero Twist",
    badge: "Ultra-Soft",
    gsm: "350–550 GSM",
    pile: "Untwisted yarn pile — maximum fibre surface exposure",
    absorbency: "Very High — untwisted fibres absorb moisture faster",
    best: ["Luxury Hotel Towels", "Premium Retail", "Spa Grade", "Gift Programmes"],
    markets: ["USA", "UK", "EU", "Japan", "Korea"],
    finishing: ["Soft Hand / Silicone", "Anti-Shrink"],
    detail:
      "Zero twist terry uses cotton yarn with no twist in the pile yarn, maximising individual fibre surface area for faster moisture absorption and an exceptionally soft hand. The fabric requires a silicone or polyvinyl alcohol (PVA) size treatment during production to hold the yarn together before first wash — buyers should note the fabric softens significantly after the first launder cycle. Zero twist commands a premium over standard terry and is positioned in luxury hotel, spa and gift segments.",
    spec: "100% zero-twist ring-spun cotton. GSM 350–550. Pile height 8–14 mm. Requires silicone or PVA size; softens after first wash. OEKO-TEX Standard 100 and GOTS available.",
  },
  {
    id: "microfiber-terry",
    name: "Microfiber Terry",
    badge: "Quick-Dry",
    gsm: "200–400 GSM",
    pile: "Ultra-fine split-filament pile — smooth, dense, extremely rapid moisture transfer",
    absorbency: "Very High — ultra-fine fibres provide 2–3x faster drying than cotton terry at same GSM",
    best: ["Sports & Gym Towels", "Travel Towels", "Hair Towels", "Promotional Towels", "Quick-Dry Hotel Linen"],
    markets: ["USA", "EU", "Japan", "Australia", "Middle East"],
    finishing: ["Moisture Wicking", "Quick-Dry Treatment", "Anti-Bacterial", "Soft Hand / Silicone"],
    detail:
      "Microfiber terry is produced from ultra-fine polyester or polyamide-polyester split-filament yarns (typically 80/20 polyamide/polyester). The split filament structure creates a surface area far greater per unit weight than cotton terry, enabling rapid moisture absorption and exceptionally fast drying — 2–3 times faster than comparable GSM cotton terry. Pakistan's major home textile mills — Bari Textile Mills, ACME Mills and Faisalabad terry specialists — produce microfiber terry for sports, gym, travel, hair and promotional towel programmes. Roll widths 44\" and 58–60\" standard. GSM 200–350 covers travel and promotional; 350–400 GSM positions in sports and salon hair towels.",
    spec: "100% polyester microfiber or 80/20 polyamide/polyester split-filament. GSM 200–400. Ultra-fine filament pile. Quick-dry treated. Disperse or sublimation print compatible on polyester face. OEKO-TEX Standard 100 available.",
  },
  {
    id: "waffle-terry",
    name: "Waffle / Honeycomb",
    badge: "",
    gsm: "180–350 GSM",
    pile: "Woven honeycomb cell structure — dimensional texture, no loop pile",
    absorbency: "Good — honeycomb cell structure provides efficient moisture transport",
    best: ["Waffle Towels", "Bathrobes", "Spa Towels", "Kitchen Linen", "Lightweight Travel Towels"],
    markets: ["USA", "UK", "EU", "Australia", "Japan"],
    finishing: ["Soft Hand / Silicone", "Anti-Shrink", "Wrinkle Resistant"],
    detail:
      "Waffle terry uses a honeycomb weave pattern producing a three-dimensional cell structure visible on both faces. Unlike loop pile terry, waffle construction has no pile — the texture comes from the geometry of the weave itself. The cell structure provides large surface area for moisture absorption with a lightweight, fast-drying result. Waffle is the standard construction for waffle-style bathrobes, lightweight spa towels and premium kitchen linen. Its lighter weight (vs. loop terry at same GSM specification) makes it popular for travel and wellness programmes. Pakistan's composite mills produce waffle terry primarily for USA and EU spa and wellness brands.",
    spec: "100% cotton or cotton/polyester blend. GSM 180–350. Woven honeycomb cell — no pile yarn. Reactive dyed. OEKO-TEX Standard 100 available.",
  },
  {
    id: "dobby-terry",
    name: "Dobby Stripe Terry",
    badge: "Hotel Premium",
    gsm: "350–600 GSM",
    pile: "Full loop terry body with woven dobby stripe border at each end",
    absorbency: "High — loop pile body retains full absorbency; dobby stripe is decorative only",
    best: ["Hotel Programme Towels", "Premium Retail Sets", "Branded Gift Programmes", "Hospitality Supply"],
    markets: ["USA", "EU", "Middle East", "Japan", "Australia"],
    finishing: ["Yarn-Dyed Border", "Soft Hand / Silicone", "Anti-Shrink", "Anti-Bacterial (hotel grade)"],
    detail:
      "Dobby stripe terry combines a full loop terry body (maintaining complete absorbency) with a woven dobby border — typically 2–6 cm wide at each end — produced by a dobby attachment that creates the border stripe within the weave rather than by printing. The border can be a single colour, multi-colour stripe, satin-finish stripe or textured dobby pattern. This construction positions strongly in hotel supply programmes, premium branded towel sets and gift collections where a design detail adds perceived value. Pakistan's established terry weaving industry — centred in Faisalabad and Karachi — supplies dobby border terry to global hotel chains and retail buyers in USA, EU and Middle East.",
    spec: "100% ring-spun combed cotton. GSM 350–600. Terry loop body + woven dobby border (2–6 cm). Yarn-dyed border; reactive dyed or bleached body. GOTS and OEKO-TEX Standard 100 available.",
  },
  {
    id: "bamboo-terry",
    name: "Bamboo-Cotton Terry",
    badge: "Eco Premium",
    gsm: "300–550 GSM",
    pile: "Bamboo viscose / cotton blend loop pile — silky soft, naturally anti-bacterial",
    absorbency: "Very High — bamboo viscose enhances moisture take-up beyond standard cotton",
    best: ["Premium Spa Towels", "Luxury Retail Programmes", "Baby Bath Towels", "Eco-Branded Lines"],
    markets: ["USA", "UK", "EU", "Australia", "Japan"],
    finishing: ["Soft Hand / Silicone", "Natural Anti-Bacterial", "OEKO-TEX Class 1"],
    detail:
      "Bamboo-cotton terry blends bamboo-derived viscose (most common ratio: 70% bamboo / 30% cotton, though 50/50 is also produced) with ring-spun cotton. The bamboo viscose contributes natural silky softness, enhanced moisture absorption and inherent anti-bacterial properties from the bamboo source material. Pakistan's certified mills produce bamboo-cotton terry for premium hotel supply, spa and wellness programmes and eco-branded retail collections in USA, UK, EU and Australian markets. OEKO-TEX Standard 100 Class 1 certification is standard; GOTS certification is available for programmes requiring full organic chain-of-custody from bamboo cultivation through weaving and finishing.",
    spec: "70/30 bamboo viscose / cotton or 50/50. GSM 300–550. Loop terry. Reactive dyed. OEKO-TEX Standard 100 Class 1 and GOTS options. Natural anti-bacterial — no chemical treatment required.",
  },
];

const WOVEN_OPTIONS = [
  {
    id: "percale",
    name: "Percale",
    category: "Woven",
    tc: "200–400 TC",
    gsm: "100–200 GSM",
    hand: "Crisp, cool, matte surface — lightweight and breathable",
    best: ["Bedsheets", "Pillowcases", "Duvet Covers"],
    markets: ["USA", "UK", "EU", "Australia"],
    detail:
      "Percale is a plain weave fabric with at least one thread count above 200, producing a crisp, cool and durable surface. The balanced plain weave construction delivers excellent durability compared to sateen, making percale the preferred choice for commercial and hotel bedding where longevity under industrial laundering is required. Thread count 200–300 suits institutional programmes; 300–400 TC targets premium retail.",
    spec: "100% cotton, cotton/polyester or linen/cotton blend. Plain weave. TC 200–400. Reactive dyed. OEKO-TEX and GOTS options.",
  },
  {
    id: "sateen",
    name: "Sateen",
    category: "Woven",
    tc: "300–800 TC",
    gsm: "120–250 GSM",
    hand: "Smooth, lustrous, silky surface — inherently soft",
    best: ["Premium Bedsheets", "Duvet Covers", "Luxury Hotel Bedding"],
    markets: ["USA", "EU", "Japan", "Korea", "Middle East"],
    detail:
      "Sateen uses a 4-over-1-under weave that floats more threads on the fabric surface, producing the characteristic lustrous, smooth hand. Inherently softer than percale at equivalent thread count, sateen commands a visual premium. Higher TC sateen (600–800) is used in luxury retail and hotel bedding programmes. Single-ply specification is important — multi-ply inflated TC counts should be specified as single-ply equivalent.",
    spec: "100% combed cotton. Sateen weave. TC 300–800 (specify ply). Reactive dyed or printed. OEKO-TEX Standard 100 and GOTS options.",
  },
  {
    id: "oxford",
    name: "Oxford Weave",
    category: "Woven",
    tc: "N/A",
    gsm: "100–160 GSM",
    hand: "Basket-weave texture, slightly heavier than poplin, durable",
    best: ["Shirt Fabric", "Uniform Fabric", "Light Home Textile"],
    markets: ["USA", "UK", "EU"],
    detail:
      "Oxford weave uses a 2-over-2-under basket weave to produce a slightly textured surface heavier than plain weave. It is a versatile textile used primarily in formal and casual shirt fabric but is also found in light home textile applications including pillowcases and table linen at the economy end of the market.",
    spec: "100% cotton or cotton/polyester. GSM 100–160. Plain basket weave (2×2). Reactive dyed. OEKO-TEX Standard 100 available.",
  },
  {
    id: "flannel",
    name: "Flannel (Brushed)",
    category: "Woven",
    tc: "N/A",
    gsm: "160–280 GSM",
    hand: "Soft brushed both sides — warm, velvety, winter-appropriate",
    best: ["Winter Bedsheets", "Duvet Covers", "Sleepwear Fabric"],
    markets: ["USA", "Canada", "UK", "N. Europe"],
    detail:
      "Flannel is a plain or twill weave fabric that has been brushed on both sides to raise the fibres, creating a soft, warm surface. The brushing process increases insulation value, making flannel bedding the preferred choice for cold-climate markets — USA, Canada and Northern Europe. Demand peaks in Q3–Q4 for retail and in continuous supply for institutional care homes and senior living facilities.",
    spec: "100% cotton or cotton/polyester. GSM 160–280. Plain or twill base. Both-sided brushing. Reactive dyed. OEKO-TEX Standard 100 available.",
  },
  {
    id: "jacquard",
    name: "Jacquard",
    category: "Woven",
    tc: "N/A",
    gsm: "160–400 GSM",
    hand: "Complex woven pattern (damask, brocade, dobby) — premium appearance",
    best: ["Luxury Bedding", "Table Linen", "Decorative Cushion Covers", "Hotel Bedding"],
    markets: ["EU", "Middle East", "Japan", "USA Luxury"],
    detail:
      "Jacquard fabric is woven on a jacquard loom that individually controls warp threads to create complex, multi-colour or textured patterns in the fabric structure itself. Unlike printed fabric, jacquard patterns are permanent, colour-fast and not subject to print registration issues. Damask and brocade patterns are standard for hotel and restaurant table linen; dobby stripe and geometric patterns are common in premium bedding.",
    spec: "100% cotton, cotton/polyester or linen/cotton blend. Complex woven pattern. GSM 160–400. Reactive or yarn-dyed. OEKO-TEX Standard 100 available.",
  },
  {
    id: "plain-weave",
    name: "Plain Weave",
    category: "Woven",
    tc: "N/A",
    gsm: "80–200 GSM",
    hand: "Balanced simple construction — clean base for printing or dyeing",
    best: ["Print Base Fabric", "Kitchen Linen", "Low-TC Bedding Base", "Institutional"],
    markets: ["Global"],
    detail:
      "Plain weave is the simplest interlacing pattern, with each weft thread passing alternately over and under each warp thread. The balanced structure produces a durable, even-surfaced fabric that serves as an excellent base for reactive printing, embroidery and other surface decoration. Used across all home textile categories from kitchen towel cloth to budget bedding fabric.",
    spec: "100% cotton or cotton/polyester blend. GSM 80–200. Plain interlacing. Reactive dyed or printed. OEKO-TEX Standard 100 available.",
  },
  {
    id: "twill",
    name: "Twill",
    category: "Woven",
    tc: "N/A",
    gsm: "160–320 GSM",
    hand: "Diagonal weave surface — smooth, drapeable, durable",
    best: ["Duvet Covers", "Curtain Fabric", "Heavy Bedding", "Upholstery Base"],
    markets: ["USA", "EU", "UK", "Middle East"],
    detail:
      "Twill weave creates a distinctive diagonal rib pattern on the fabric surface, producing a drapeable, smooth-faced fabric with better durability than plain weave at equivalent weight. Used in heavier bedding fabrics where more body is required — duvet covers, heavy pillowcases and curtain fabric. The diagonal structure also provides good tear resistance, useful in upholstery applications.",
    spec: "100% cotton, cotton/polyester or linen blend. GSM 160–320. 2/2 or 3/1 twill. Reactive dyed. OEKO-TEX Standard 100 available.",
  },
  {
    id: "interlock-ht",
    name: "Interlock (HT)",
    category: "Knitted",
    tc: "N/A",
    gsm: "180–280 GSM",
    hand: "Smooth both sides, stable, minimal stretch compared to jersey",
    best: ["Fitted Sheets", "Pillowcases", "Jersey Bedding"],
    markets: ["USA", "EU", "Australia"],
    detail:
      "Interlock knit for home textile applications is heavier than apparel interlock, providing the dimensional stability needed for bedding that undergoes regular industrial laundering. The smooth, matte surface on both faces is comfortable against skin and machines cleanly in hotel laundry programmes. Used for fitted sheets, stretch pillowcases and jersey-style bedding sets popular in casual and children's bedding.",
    spec: "100% combed cotton or cotton/elastane. GSM 180–280. Smooth both sides. Reactive dyed. OEKO-TEX Standard 100 and GOTS options.",
  },
  {
    id: "jersey-ht",
    name: "Jersey (HT)",
    category: "Knitted",
    tc: "N/A",
    gsm: "140–200 GSM",
    hand: "4-way stretch, soft drape — T-shirt-like hand for bedding",
    best: ["Fitted Sheets", "Pillowcases", "Children's Bedding"],
    markets: ["USA", "EU", "Australia"],
    detail:
      "Jersey knit bedding fabric has gained significant market share in the USA and EU, driven by consumer preference for soft, T-shirt-like comfort in bedding. The 4-way stretch property makes jersey ideal for fitted sheets that maintain a wrinkle-free appearance on the mattress without the stiffness of woven fabric. Children's bedding in jersey is a growing category, particularly in character-print programmes using reactive or digital printing.",
    spec: "100% combed cotton or cotton/elastane (5–8%). GSM 140–200. Single jersey. Reactive dyed or printed. OEKO-TEX Standard 100 and GOTS options.",
  },
  {
    id: "microfiber-woven",
    name: "Microfiber (Woven)",
    category: "Woven",
    tc: "N/A",
    gsm: "60–130 GSM",
    hand: "Ultra-smooth, silky, pill-resistant — excellent print surface and quick-dry performance",
    best: ["Premium Bedsheets", "Pillowcases", "Duvet Covers", "Quick-Dry Hotel Linen"],
    markets: ["USA", "EU", "Middle East", "Australia", "Japan"],
    detail:
      "Microfiber woven bedding uses ultra-fine polyester filament yarns (1.0 denier or below) in plain or sateen weave. The fine filament diameter produces a remarkably smooth, silky hand without the care requirements of natural fibre. Quick-dry, colour-vivid and wrinkle-resistant without chemical finishing. Pakistan's woven textile mills produce microfiber bedding fabric for export to USA and EU bedding manufacturers, primarily in sateen weave for premium positioning. The disperse-dyed polyester surface achieves excellent colour vibrancy and is sublimation print compatible for all-over print bedding programmes.",
    spec: "100% polyester microfiber. GSM 60–130. Plain or sateen weave. Ultra-fine filament (<1 denier). Disperse dyed or sublimation printed. OEKO-TEX Standard 100 available.",
  },
  {
    id: "bamboo-cotton-woven",
    name: "Bamboo-Cotton (Woven)",
    category: "Woven",
    tc: "200–400 TC equivalent",
    gsm: "100–200 GSM",
    hand: "Silky, soft drape — slightly cool to touch with subtle natural sheen",
    best: ["Premium Bedsheets", "Duvet Covers", "Eco Bedding Programmes", "Luxury Retail"],
    markets: ["USA", "UK", "EU", "Australia", "Japan"],
    detail:
      "Bamboo-cotton woven bedding fabric uses bamboo-derived viscose blended with cotton in sateen or plain weave. The bamboo viscose contributes natural sheen, an exceptionally soft hand and inherent breathability. The most common blend for bedding is 70/30 bamboo/cotton or 50/50. Pakistan's certified mills produce bamboo-cotton bedding fabric for eco-conscious brands in USA, UK and EU. OEKO-TEX Standard 100 is standard certification; GOTS certification is available for programmes requiring organic processing chain-of-custody for the bamboo viscose and cotton components.",
    spec: "70/30 bamboo viscose / cotton or 50/50. Sateen or plain weave. GSM 100–200. Reactive dyed. OEKO-TEX Standard 100 and GOTS options available.",
  },
  {
    id: "linen-cotton-woven",
    name: "Linen-Cotton (Woven)",
    category: "Woven",
    tc: "N/A",
    gsm: "140–250 GSM",
    hand: "Crisp, textured, naturally cool — improves in hand with each wash",
    best: ["Table Linen", "Tablecloths", "Kitchen Linen", "Premium Bedding", "Summer Duvet Covers"],
    markets: ["EU", "USA", "Australia", "Japan", "UK"],
    detail:
      "Linen-cotton woven fabric combines flax (linen) with cotton — typically 55/45 or 60/40 linen/cotton — for table linen, premium kitchen linen and warm-climate bedding. Pure linen is the most prestigious but linen-cotton blends offer better dimensional stability, reduced shrinkage and easier care while retaining the characteristic linen breathability and texture. Pakistan's woven mills import flax yarns and blend with domestic cotton for export. The construction is specified for table covers, kitchen linen and summer bedding programmes in EU and Australian markets.",
    spec: "55/45 or 60/40 linen/cotton or 100% linen. GSM 140–250. Plain or twill weave. Reactive dyed. OEKO-TEX Standard 100 available.",
  },
];

const GSM_TERRY = [
  { range: "200–300 GSM", label: "Microfiber / Travel", tier: "Quick-Dry", market: "Microfiber terry — sports, travel, promotional, hair towels", pct: 25, color: "bg-sky-400", popular: false },
  { range: "300–400 GSM", label: "Economy / Budget", tier: "Institutional", market: "Gym, food service, budget hospitality, beach & pool", pct: 42, color: "bg-amber-300", popular: false },
  { range: "400–500 GSM", label: "Standard Retail", tier: "Mid-grade", market: "Most bath towel retail programmes — USA, UK, EU", pct: 62, color: "bg-amber-500", popular: true },
  { range: "500–600 GSM", label: "Premium Hotel Grade", tier: "Premium", market: "4–5 star hotel supply, quality branded retail", pct: 80, color: "bg-amber-600", popular: false },
  { range: "600–800+ GSM", label: "Luxury / Ultra-Premium", tier: "Luxury", market: "Spa, luxury hotel gifting, flagship retail programmes", pct: 100, color: "bg-amber-800", popular: false },
];

const TC_TIERS = [
  { range: "200–300 TC", label: "Entry / Institutional", market: "Budget retail, hospitality economy grade, student accommodation", pct: 30, color: "bg-sky-300", popular: false },
  { range: "300–400 TC", label: "Standard Retail", market: "Most popular segment — USA, UK, EU retail", pct: 55, color: "bg-sky-500", popular: true },
  { range: "400–600 TC", label: "Premium Retail", market: "Premium branded bedding, 4-star hotel programmes", pct: 80, color: "bg-sky-700", popular: false },
  { range: "600–800+ TC", label: "Luxury / Ultra-Premium", market: "Luxury hotel chains, gift programmes, flagship retail", pct: 100, color: "bg-sky-900", popular: false },
];

const FINISHING_TREATMENTS = [
  { name: "Soft Hand / Silicone", icon: "✋", desc: "Reduces surface friction, improves drape and softness. Standard on terry loop, zero twist and bamboo-cotton.", badge: "Standard" },
  { name: "Anti-Bacterial", icon: "🛡️", desc: "Silver-ion technology or natural antimicrobial agents. Hospital linen, healthcare, institutional and sports towel programmes.", badge: "Healthcare" },
  { name: "Anti-Shrink", icon: "📐", desc: "Pre-shrunk finishing. Residual shrinkage ≤3% warp and weft after 5 wash cycles per ISO 6330.", badge: "Performance" },
  { name: "Velour / Shearing", icon: "✂️", desc: "Pile shearing on one face of terry — velvet-smooth premium surface. Enables sublimation printing on towel face.", badge: "Premium" },
  { name: "Quick-Dry Treatment", icon: "⚡", desc: "Hydrophilic finish accelerates moisture release from fabric — standard for microfiber terry and sports towel programmes.", badge: "Performance" },
  { name: "Moisture Wicking", icon: "💧", desc: "Hydrophilic treatment draws moisture away from skin — performance claim supported with ISO 20743 test report.", badge: "Performance" },
  { name: "Wrinkle Resistant", icon: "🧹", desc: "Cross-linking chemistry reduces crease recovery angle — easy-care for woven bedding, table linen and duvet covers.", badge: "Easy Care" },
  { name: "Flame Retardant (FR)", icon: "🔥", desc: "Phosphorus-based FR treatment meeting BS 5867 / EN 13501. Required for contract hospitality and institutional programmes in UK and EU.", badge: "Compliance" },
  { name: "Chlorine Resistant", icon: "🏊", desc: "Colour-fast treatment for pool and beach towels exposed to chlorinated water — prevents colour bleeding and fabric degradation.", badge: "Outdoor" },
  { name: "Zero-Twist (PVA Size)", icon: "🌀", desc: "Temporary PVA or silicone size holds untwisted pile during production — washes out after first launder cycle; fabric softens dramatically.", badge: "Luxury" },
];

const DYE_METHODS = [
  { name: "Reactive Dyeing", code: "RD", desc: "Primary method for cotton terry and wovens. Wide colour gamut, good wash fastness Grade 4–5. OEKO-TEX certified chemistry available.", applicable: "Terry loop, woven bedding, kitchen linen" },
  { name: "Vat Dyeing", code: "VD", desc: "Exceptional wash and light fastness — preferred for institutional programmes where industrial laundering at 60–90°C is routine.", applicable: "Terry, institutional towels, hospital linen" },
  { name: "Yarn-Dyed", code: "YD", desc: "Colour applied to yarn before weaving. Required for dobby stripe towels, check kitchen linen, striped bedding and woven jacquard patterns.", applicable: "Dobby terry, striped towels, jacquard bedding" },
  { name: "Greige (Undyed)", code: "GR", desc: "Undyed fabric for customer's own dyeing programme or commission dyeing. Available in all constructions.", applicable: "All constructions" },
  { name: "Optical White / Bleached", code: "OW", desc: "Full bleach with optical brightening — ≥85 CIE whiteness. Standard for institutional towels, hospital linen and Ihram fabric.", applicable: "Terry, institutional, hospital linen" },
  { name: "Disperse Dyeing", code: "DD", desc: "Synthetic microfiber terry and woven. Outstanding colour vibrancy and full sublimation compatibility for promotional and sports towel programmes.", applicable: "Microfiber terry, polyester-base fabric" },
];

const OEM_FEATURES = [
  { num: "01", title: "Custom GSM specification", desc: "Any weight within terry 300–800 gsm or woven 80–400 gsm. Production feasibility confirmed at inquiry stage." },
  { num: "02", title: "Custom thread count", desc: "Bedding fabric TC to programme specification. Single-ply TC standards supplied and documented." },
  { num: "03", title: "Custom pile height", desc: "Terry pile height 5–15 mm. Pile specification confirmed with pile weight and GSM relationship." },
  { num: "04", title: "Custom width", desc: "Standard widths 30\" / 44\" / 58-60\" / 72\". Non-standard widths available on request with minimum quantity." },
  { num: "05", title: "Custom fibre blend", desc: "Cotton/polyester, cotton/bamboo, cotton/viscose blends. Blend ratio to specification." },
  { num: "06", title: "Lab dip & shade card", desc: "Colour matching within 2–3 working days. Tolerance ΔE ≤1.5 CIELAB. Physical shade cards issued for buyer approval." },
];

const MARKET_SEGMENTS = [
  {
    title: "Towel Manufacturers",
    flag: "🏭",
    regions: "Bangladesh, Vietnam, China, Turkey",
    desc: "Terry loop, velour and zero twist fabric in volume. Consistent pile weight, width tolerance and whiteness grade are critical for downstream cut-and-sew efficiency. Full roll inspection to 4-point system with AQL 2.5 available.",
  },
  {
    title: "Bedding Manufacturers",
    flag: "🛏️",
    regions: "USA, UK, EU, Australia, Japan",
    desc: "Percale, sateen and jacquard fabric. Thread count accuracy, colour consistency and finish quality are the primary qualification criteria. Buyers specify single-ply TC — we supply documentation to that standard.",
  },
  {
    title: "Hospitality Procurement",
    flag: "🏨",
    regions: "UAE, Saudi Arabia, Singapore, UK, Europe",
    desc: "Hotel-grade terry loop, institutional white. FR-treated fabric for UK/EU contract compliance. Continuous bulk supply with certification documentation for group-level procurement programmes.",
  },
  {
    title: "Healthcare & Medical Linen",
    flag: "🏥",
    regions: "USA, UK, EU, Australia",
    desc: "Anti-bacterial and FR-finished fabric for hospital laundry. Autoclave-safe construction options. ISO 9001 and ISO 13485 mill certification available for healthcare procurement compliance.",
  },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", img: "/images/certs/cert-gots.webp", desc: "Organic cotton fibre traceability from farm to finished fabric roll. Required by leading EU and US sustainable bedding brands." },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", img: "/images/certs/cert-oeko-tex.webp", desc: "Tests for over 100 harmful substances. Class 1 available for baby and healthcare applications. Preferred by EU and UK import compliance teams." },
  { name: "BSCI", full: "Business Social Compliance Initiative", img: "/images/certs/cert-bsci.webp", desc: "Social audit framework covering labour rights, working conditions and factory management. Required by major European retailers." },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", img: "/images/certs/cert-sedex.webp", desc: "SMETA ethical audit sharing platform. Widely used by UK and Australian supermarket and department store buyers." },
  { name: "ISO 9001", full: "ISO 9001 Quality Management", img: "/images/certs/cert-iso-9001.webp", desc: "Quality management system certification. Required for government, institutional and B2B procurement contracts." },
  { name: "GRS", full: "Global Recycled Standard", img: "/images/certs/cert-grs.webp", desc: "Certifies recycled content in polyester and blended fabric rolls. Required for programmes with a recycled fibre sustainability claim." },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", img: "/images/certs/cert-wrap.webp", desc: "Factory compliance with legal requirements and humane working conditions. North American buyer requirement for many fabric programmes." },
  { name: "BCI", full: "Better Cotton Initiative", img: "/images/certs/cert-bci.webp", desc: "Supports improved cotton farming practices. Applicable to terry and woven cotton fabric programmes with a BCI sourcing commitment." },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", desc: "GOTS-certified organic cotton available across all terry and woven constructions. Farm-to-roll traceability.", tag: "GOTS" },
  { icon: "♻️", title: "Recycled Fibres", desc: "GRS-certified recycled polyester and cotton blend options for terry and woven blended programmes.", tag: "GRS" },
  { icon: "💧", title: "Water Conservation", desc: "Enzyme washing replaces conventional stone washing — significantly reduced water consumption and effluent load.", tag: "Process" },
  { icon: "⚗️", title: "Chemical Safety", desc: "OEKO-TEX Standard 100 certified dyestuffs and auxiliaries. No restricted substances, no azo dyes.", tag: "OEKO-TEX" },
  { icon: "⚖️", title: "Ethical Audits", desc: "BSCI, Sedex and SA8000 audited mills. Worker welfare, fair wages and factory safety independently verified.", tag: "BSCI / Sedex" },
  { icon: "📦", title: "Eco Packaging", desc: "Recycled polybag roll wrapping, FSC-certified paper cores and documentation available for programmes with packaging sustainability requirements.", tag: "Optional" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit Specification", short: "Specification", desc: "Share fabric category (terry/woven/knit/microfiber), construction, GSM or TC, pile height, width, finishing treatment, quantity and target delivery via the RFQ form." },
  { num: "02", title: "Mill Matching & Pricing", short: "Mill Match", desc: "We evaluate 2–3 certified mills whose construction specialisation, quality standards, certifications and export capacity match your programme. Indicative pricing and lead time within 3–5 working days." },
  { num: "03", title: "Lab Sample", short: "Sampling", desc: "3–5m fabric sample per construction: terry within 10–14 working days; woven within 12–15 working days; jacquard 15–20 days. GSM certificate, whiteness grade (terry), width confirmation and colour chip issued." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Buyer confirms GSM, pile weight, width, hand-feel, colour (ΔE ≤1.5) and finish. Lab dip adjustments or pile height revisions if required before purchase order." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Terry loop / velour: 20–30 working days. Zero twist / bamboo-cotton: 25–35 days. Woven bedding (percale, sateen): 25–40 days. Jacquard with custom pattern: add 10–15 days for loom programming. Microfiber terry: 15–25 days. All timelines indicative and subject to mill scheduling." },
  { num: "06", title: "Pre-Shipment Inspection", short: "QC", desc: "GSM, pile height, width, colour and defect inspection per 4-point system AQL 2.5. Whiteness grade report for terry. Inspection report issued. Polythene-wrapped rolls on paper or plastic tube cores." },
  { num: "07", title: "Export & Freight", short: "Export", desc: "FOB from Karachi or Port Qasim. Sea freight: USA 22–28 days, UK 20–26 days, EU 18–24 days, UAE 7–12 days, Australia 18–22 days. Air freight for urgent samples 3–5 days to any major market." },
];

const FAQS = [
  {
    q: "What GSM is appropriate for hotel-grade bath towels?",
    a: "Standard hotel-grade bath towel fabric runs at 400–550 GSM. At 400–480 GSM, fabric delivers a good weight-to-drying-time ratio suitable for 3-star and mid-tier hotel programmes where laundry frequency is high. At 500–550 GSM, the fabric qualifies for 4–5 star hotel positioning — the increased pile weight gives a noticeably denser hand. Ultra-premium spa and luxury hotel programmes typically specify 600+ GSM zero twist or velour terry. For reference, 450 GSM terry is currently the most ordered tier across the USA and European hotel supply market. Please note that GSM alone does not determine quality — cotton grade, combing process and pile height are equally important factors and should be specified alongside GSM in your procurement brief.",
  },
  {
    q: "What is the difference between terry loop and velour terry fabric?",
    a: "Terry loop fabric has uncut looped pile on both faces, giving the characteristic textured surface of a standard bath towel. Absorbency is highest in this construction because the looped pile maximises fibre surface area in contact with water. Velour terry is produced by shearing one face of terry loop fabric, creating a smooth, velvet-like surface on the front while retaining looped pile on the back. Velour has slightly lower absorbency per GSM than loop due to the cutting of the pile, but it is sublimation print compatible, which makes it preferred for beach towels, promotional towels and premium retail where visual presentation is the priority. For standard hotel towel programmes, terry loop is the specification; for beach and promotional programmes, velour is typically specified.",
  },
  {
    q: "How does thread count affect bedding fabric quality?",
    a: "Thread count is the number of warp and weft threads per square inch. It is a useful indicator of fabric fineness but is frequently misrepresented in retail marketing. A 400 TC single-ply percale made from long-staple combed cotton is a superior product to a 600 TC multi-ply construction using short-staple yarn — the multi-ply count doubles or triples the thread count by counting each twisted ply separately, inflating the number without improving quality. We supply fabrics with single-ply thread counts and issue technical data sheets confirming ply count, yarn count and fibre specification alongside the TC figure. For international buyers evaluating fabric for institutional or hotel programmes, we recommend specifying both TC and yarn count (Ne) to avoid ambiguity.",
  },
  {
    q: "Can I order home textile fabric with anti-bacterial finishing?",
    a: "Yes. Anti-bacterial finishing is available on terry loop, institutional terry and woven bedding fabric. The treatment uses silver-ion technology or natural antimicrobial agents depending on the end application and certification requirements. For healthcare and hospital linen programmes, silver-ion anti-bacterial finish is standard, and we can supply mills with ISO 13485 certification where required. For retail programmes making anti-bacterial claims, the treatment must be tested to ISO 20743 or ASTM E2149 and documentation provided. Anti-bacterial finishing adds 7–15% to fabric cost depending on the treatment type and fabric weight. Please specify the end application and required test standard in your RFQ so we can match you with the appropriate mill.",
  },
  {
    q: "What roll lengths, widths and roll weights are available for terry fabric?",
    a: "Standard terry loop fabric rolls are available in 50m, 100m and 150m lengths; 200m rolls on request for high-volume programmes. Roll weight depends on fabric width and GSM: a 44\" (112cm) wide, 450 GSM terry roll of 100m weighs approximately 50 kg; a 60\" (152cm) wide roll at the same GSM weighs approximately 68 kg — a useful reference for freight and container planning. Width options for terry fabric: 30\" / 76cm (face cloth and hand towel cutting), 44\" / 112cm (bath towel), 58–60\" / 147–152cm (bath sheet and large format cutting), 72\" / 183cm (wide-format bath sheet programmes with minimal waste). Non-standard widths available with minimum quantity. For bedding fabric (percale, sateen, jacquard), standard widths are 58–60\" / 147–152cm and 90\" / 228cm for bed-width cutting. Roll cores are paper tube or plastic tube — specify in your RFQ if required for your cutting line.",
  },
  {
    q: "What certifications are available for home textile fabric from Pakistan?",
    a: "The following certifications are available from Pakistan's certified home textile mills: GOTS (Global Organic Textile Standard) for organic cotton programmes; OEKO-TEX Standard 100 for chemical safety (Class 1 for baby and healthcare applications); BSCI and Sedex for social compliance; ISO 9001 for quality management systems; GRS (Global Recycled Standard) for recycled fibre blends; WRAP for factory compliance; and BCI (Better Cotton Initiative) for cotton farming sustainability. Not all mills hold all certifications — we match buyers with mills whose certification profile meets the programme requirements. Please specify the certifications required as hard requirements in your RFQ.",
  },
  {
    q: "What is the lead time for home textile fabric from Pakistan?",
    a: "Lead times depend on construction, quantity and mill scheduling at time of order. As reliable planning guidance: lab samples (3–5m) are produced within 10–15 working days from specification confirmation. Bulk production timelines from purchase order: terry loop (standard cotton) at 5,000–20,000 metres runs 20–30 working days; velour terry and zero twist run 25–35 working days due to additional finishing steps; microfiber terry 15–25 working days; woven bedding (percale, sateen) 25–40 working days; jacquard bedding fabric with custom pattern requires an additional 10–15 working days for loom programming before production begins; bamboo-cotton terry 25–35 working days. Sea freight from Karachi: USA 22–28 days, UK 20–26 days, EU 18–24 days, UAE 7–12 days, Australia 18–22 days. All figures are indicative only and subject to factory scheduling, material availability and order complexity.",
  },
  {
    q: "Is microfiber terry fabric available from Pakistan and what are its advantages?",
    a: "Yes. Microfiber terry fabric is produced by Pakistan's major home textile mills, including Bari Textile Mills, ACME Mills and Faisalabad terry specialists. The fabric uses ultra-fine polyester (or 80/20 polyamide/polyester split-filament) yarns typically below 1 denier per filament. The split-filament pile structure creates a surface area per unit weight significantly greater than cotton, enabling 2–3x faster moisture absorption and drying compared to equivalent GSM cotton terry. GSM range 200–400: 200–300 GSM serves travel, promotional and salon hair towel programmes; 350–400 GSM is used in sports and gym towel programmes. Disperse dyeing delivers outstanding colour vibrancy; the polyester construction is compatible with all-over sublimation printing for branded promotional programmes. OEKO-TEX Standard 100 certification is available. Lead time for bulk microfiber terry: 15–25 working days from purchase order.",
  },
  {
    q: "Can I order jacquard fabric with a custom woven pattern?",
    a: "Yes. Custom jacquard patterns are available — we work with mills that operate dobby and jacquard looms capable of producing custom geometric, damask, floral and stripe patterns to buyer artwork. The process requires: buyer-supplied artwork or pattern specification, a loom programming fee (varies by pattern complexity), a minimum sample length of 20–50m to verify pattern registration and colour, and buyer approval before bulk production. Custom jacquard is appropriate for branded hotel bedding programmes, premium retail collections and table linen programmes where a unique woven pattern differentiates the product. Standard jacquard patterns (damask, herringbone, satin stripe) are available from stock designs without additional programming cost.",
  },
  {
    q: "What is zero twist terry fabric and when should I specify it?",
    a: "Zero twist terry uses cotton yarn with zero twist in the pile yarn — the pile fibres lie flat rather than being twisted together. This maximises the individual fibre surface area exposed to water, producing faster absorption and an exceptionally soft hand compared to conventional twisted yarn terry. The trade-off is structural: untwisted yarn is fragile during weaving and finishing, requiring a temporary PVA or silicone size that washes out after the first launder cycle. After the first wash, the fabric softens significantly and the zero-twist characteristic is fully realised. Specify zero twist for luxury hotel programmes, spa towelling and premium retail gifting where softness and absorbency are the primary selling attributes. It commands a 20–35% price premium over standard ring-spun terry at equivalent GSM.",
  },
];

const PAGE_BOXES = [
  {
    title: "Apparel Fabric",
    desc: "Knitted and woven fabric for garment manufacturers. Single jersey to heavy canvas, 80–450 GSM.",
    href: "/fabric/apparelfabric/",
    image: "/images/menu/menu-apparelfabric.webp",
    alt: "Pakistan apparel fabric supplier — knitted and woven fabric for garment manufacturers worldwide",
    cta: "Explore Apparel Fabric",
  },
  {
    title: "Bath Linen",
    desc: "Finished towels, bathrobes, bath mats and beach towels from Pakistan's certified terry mills.",
    href: "/hometextile/bathlinen/",
    image: "/images/menu/menu-towels.webp",
    alt: "Pakistan bath linen manufacturer — hotel and retail towels and bathrobes for USA, UK and Europe",
    cta: "Explore Bath Linen",
  },
  {
    title: "Bed Linen",
    desc: "Finished bedsheets, duvet covers and pillow covers. Six weave constructions.",
    href: "/hometextile/bedlinen/",
    image: "/images/menu/menu-bedsheets.webp",
    alt: "Pakistan bed linen manufacturer — hotel bedsheets and duvet covers for brands in USA, UK and Europe",
    cta: "Explore Bed Linen",
  },
  {
    title: "Kitchen Linen",
    desc: "Finished kitchen towels, bar mops and aprons from Pakistan's certified factories.",
    href: "/hometextile/kitchenlinen/",
    image: "/images/menu/menu-kitchenlinen.webp",
    alt: "Pakistan kitchen linen manufacturer — wholesale kitchen towels and aprons for retail and food service",
    cta: "Explore Kitchen Linen",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function HomeTextileFabricContent() {
  const [activeTerry, setActiveTerry] = useState("terry-loop");
  const [activeWoven, setActiveWoven] = useState("percale");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const at = TERRY_CONSTRUCTIONS.find((c) => c.id === activeTerry) ?? TERRY_CONSTRUCTIONS[0];
  const aw = WOVEN_OPTIONS.find((o) => o.id === activeWoven) ?? WOVEN_OPTIONS[0];

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
            alt="Pakistan home textile fabric manufacturer — terry and woven fabric for towel and bedding manufacturers worldwide"
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
              Pakistan Home Textile Fabric Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Home Textile
              <br />
              <span className="text-gold">Fabric</span>
              <br />
              Manufacturer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              MZ Global Trading connects towel and bedding manufacturers with
              Pakistan&rsquo;s certified home textile mills. Terry loop, velour,
              zero twist, percale, sateen and jacquard fabric rolls. GSM
              300&ndash;800 (terry) and TC 200&ndash;800 (woven). GOTS, OEKO-TEX,
              BSCI certified. FOB / CIF export.
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
                Request a Quote
                <span aria-hidden="true">&#8594;</span>
              </Link>
              <button
                onClick={() => scrollToId("bento-grid")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Fabric Guide
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
                Home Textile Fabric Supply — Pakistan Mills
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Home Textile Fabric Sourcing Excellence You Can Trust
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s home textile mills supply the same certified fabric that
                underpins towel and bedding programmes at leading USA and European brands.
                Terry, woven and knit home textile fabric — any construction, any GSM,
                any certification — sourced directly from verified mills.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "3", label: "Fabric Categories" },
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Fabric Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore All Aspects</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">Click any card to jump to the full detailed section.</p>
          </div>

          {/* Row 1: Terry Constructions + Woven & Knit Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* Bento 1 — Terry Fabric Constructions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧶</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Terry</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Terry Fabric Constructions</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {TERRY_CONSTRUCTIONS.map((t) => (
                  <div key={t.id} className="bg-white rounded-xl p-3.5 border border-amber-100">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                      {t.badge && (
                        <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{t.badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-amber-600 font-medium">{t.gsm}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-snug">{t.pile}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-terry" label="Explore Terry Constructions" />
            </motion.div>

            {/* Bento 2 — Woven & Knit Options */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🪡</span>
                <div>
                  <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">Woven &amp; Knit</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Woven &amp; Knit Options</h3>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 flex-1">
                {WOVEN_OPTIONS.map((o) => (
                  <div key={o.id} className="bg-white rounded-xl p-2.5 border border-orange-100">
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full mb-1 inline-block ${o.category === "Knitted" ? "bg-orange-100 text-orange-700" : "bg-amber-100 text-amber-700"}`}>
                      {o.category}
                    </span>
                    <p className="text-xs font-semibold text-navy-900 leading-tight">{o.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{o.tc !== "N/A" ? o.tc : o.gsm}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-woven" label="Explore Woven & Knit" />
            </motion.div>
          </div>

          {/* Row 2: 4 compact bentos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            {/* Bento 3 — GSM & TC Guide */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">📊</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM &amp; Thread Count</h3>
              <div className="flex flex-col gap-2 flex-1">
                {GSM_TERRY.slice(0, 3).map((t) => (
                  <div key={t.range} className="bg-white rounded-lg p-2.5 border border-sky-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-navy-900">{t.range}</span>
                      {t.popular && <span className="text-[9px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <div className="w-full h-1 bg-sky-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] text-sky-600 font-semibold mt-1">{t.label}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-weight" label="View Weight Guide" />
            </motion.div>

            {/* Bento 4 — Finishing Treatments */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚗️</span>
              <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Finishing</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Finishing Treatments</h3>
              <div className="flex flex-col gap-2 flex-1">
                {FINISHING_TREATMENTS.slice(0, 5).map((f) => (
                  <div key={f.name} className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 border border-green-50">
                    <span className="text-sm shrink-0" aria-hidden="true">{f.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900 leading-tight">{f.name}</p>
                      <span className="text-[9px] font-semibold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full">{f.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-finishing" label="Explore Finishing" />
            </motion.div>

            {/* Bento 5 — Colour & Dye */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🎨</span>
              <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Colour</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Colour &amp; Dye Programs</h3>
              <div className="flex flex-col gap-2 flex-1">
                {DYE_METHODS.map((d) => (
                  <div key={d.code} className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 border border-rose-50">
                    <span className="w-6 h-6 rounded bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {d.code}
                    </span>
                    <p className="text-xs font-semibold text-navy-900">{d.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colour" label="Explore Colour" />
            </motion.div>

            {/* Bento 6 — Custom Development */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🔧</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Custom Fabric Development</h3>
              <div className="flex flex-col gap-2 flex-1">
                {OEM_FEATURES.slice(0, 5).map((f) => (
                  <div key={f.num} className="flex items-start gap-2">
                    <span className="text-gold text-xs font-bold mt-0.5 shrink-0">{f.num}</span>
                    <p className="text-xs text-gray-600 leading-snug">{f.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore Custom Dev" />
            </motion.div>
          </div>

          {/* Row 3: 5-col (2+2+1) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

            {/* Bento 7 — Market Applications */}
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
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Market Applications</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                {MARKET_SEGMENTS.map((m) => (
                  <div key={m.title} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-lg mb-0.5" aria-hidden="true">{m.flag}</p>
                    <p className="text-xs font-bold text-navy-900">{m.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{m.regions}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-markets" label="View All Markets" />
            </motion.div>

            {/* Bento 8 — Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-emerald-50 border border-emerald-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🏅</span>
                <div>
                  <p className="text-emerald-600 text-xs font-semibold tracking-[0.2em] uppercase">Standards</p>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">Quality Certifications</h3>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 flex-1 content-start">
                {CERTIFICATIONS.map((c) => (
                  <div
                    key={c.name}
                    className="bg-white rounded-xl border border-emerald-100 flex items-center justify-center p-2"
                    style={{ height: 56 }}
                  >
                    <Image
                      src={c.img}
                      alt={`${c.name} — ${c.full}`}
                      width={72}
                      height={44}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certs" label="View Certifications" />
            </motion.div>

            {/* Bento 9 — Roll Specs & Export */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-yellow-50 border border-yellow-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">📦</span>
              <p className="text-yellow-600 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Roll Specs &amp; Export</h3>
              <div className="flex flex-col gap-2 flex-1">
                {["50m / roll", "100m / roll", "150m / roll", "200m / roll"].map((r) => (
                  <div key={r} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-yellow-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                    <p className="text-xs font-semibold text-navy-900">{r}</p>
                  </div>
                ))}
                <div className="flex flex-wrap gap-1 mt-1">
                  {["FOB", "CIF", "CFR"].map((t) => (
                    <span key={t} className="text-[10px] font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              <ExploreBtn sectionId="section-export" label="View Roll Specs" />
            </motion.div>
          </div>

          {/* Row 4: 3-col (2+1) */}
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
              className="lg:col-span-1 bg-purple-50 border border-purple-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0">
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
            <Link href="/knowledge/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Home Textile Fabric Sourcing Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Terry construction guide, GSM selection, TC accuracy and mill certification overview for international buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Home Textile Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times, certification requirements and mill audit overview for home textile fabric buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Fabric Spec Sheets &amp; GSM Charts</p>
              <p className="text-xs text-gray-500 leading-relaxed">Terry GSM range charts, woven fabric spec sheets and certification documentation for procurement teams.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Home Textile Fabric?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Fabric category, GSM and construction confirmed — RFQ takes 3 minutes. Mill match and quotation returned within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — TERRY FABRIC CONSTRUCTIONS — BRUTALIST UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-terry" className="bg-white py-20 lg:py-28 border-t-4 border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="font-black text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-4">
              TERRY FABRIC / PAKISTAN TEXTILE MILLS / GSM 300–800
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-900 leading-[0.95] mb-6 uppercase tracking-tight">
              Terry Fabric<br />Constructions
            </h2>
            <p className="text-gray-600 max-w-2xl text-base leading-relaxed">
              Three distinct terry constructions for bath linen programmes ranging from institutional supply to luxury hotel and spa. Each construction has a unique pile structure, absorbency profile and market positioning.
            </p>
          </div>

          {/* Terry tab selector */}
          <div className="flex flex-wrap gap-3 mb-10" role="tablist">
            {TERRY_CONSTRUCTIONS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTerry === t.id}
                onClick={() => setActiveTerry(t.id)}
                className={`px-6 py-3 text-sm font-black uppercase tracking-wider border-2 transition-all ${
                  activeTerry === t.id
                    ? "bg-navy-900 border-navy-900 text-white"
                    : "bg-white border-gray-900 text-navy-900 hover:bg-gray-50"
                }`}
              >
                {t.name}
                {t.badge && <span className="ml-2 text-[10px] font-semibold text-gold">[{t.badge}]</span>}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTerry}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid lg:grid-cols-3 gap-0 border-2 border-navy-900"
            >
              {/* Main detail */}
              <div className="lg:col-span-2 p-8 border-r-0 lg:border-r-2 border-navy-900 border-b-2 lg:border-b-0">
                <h3 className="text-2xl font-black text-navy-900 uppercase mb-6">{at.name}</h3>
                <div className="grid grid-cols-2 gap-0 mb-6 border-2 border-navy-900">
                  <div className="p-4 border-r-2 border-navy-900">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">GSM RANGE</p>
                    <p className="text-xl font-black text-gold">{at.gsm}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">ABSORBENCY</p>
                    <p className="text-sm font-bold text-navy-900">{at.absorbency}</p>
                  </div>
                </div>
                <div className="border-2 border-navy-900 p-4 mb-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">PILE STRUCTURE</p>
                  <p className="text-sm font-bold text-navy-900">{at.pile}</p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{at.detail}</p>
                <div className="border-2 border-navy-900 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">TECHNICAL SPEC</p>
                  <p className="text-sm text-gray-700">{at.spec}</p>
                </div>
              </div>
              {/* Side details */}
              <div className="flex flex-col divide-y-2 divide-navy-900">
                <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">BEST FOR</p>
                  <div className="flex flex-wrap gap-2">
                    {at.best.map((b) => (
                      <span key={b} className="text-xs font-semibold text-navy-900 border border-gray-900 px-2 py-1">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">KEY MARKETS</p>
                  <div className="flex flex-wrap gap-2">
                    {at.markets.map((m) => (
                      <span key={m} className="text-xs font-bold text-gold border border-gold px-2 py-1">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">FINISHING</p>
                  <div className="flex flex-col gap-1.5">
                    {at.finishing.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-navy-900 shrink-0" aria-hidden="true" />
                        <span className="text-xs font-semibold text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4">
            <p className="text-xs text-amber-800 font-medium">
              Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
            </p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — WOVEN & KNIT OPTIONS — PRODUCT SHOWCASE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-woven" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Woven &amp; Knit</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Woven &amp; Knit Fabric Options</h2>
            <p className="text-gray-400 mt-3 max-w-2xl text-sm leading-relaxed">
              Seven woven constructions and two knit options covering every bedding, linen and home textile programme. Select a fabric type to view full technical details.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-4 lg:gap-6 lg:items-start">
            {/* Detail panel — mobile: first so changes are immediately visible; desktop: right 3/4 */}
            <div className="lg:order-2 lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWoven}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.22 }}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
                >
                  <div className="flex items-center gap-3 flex-wrap mb-6">
                    <h3 className="text-2xl font-bold text-navy-900">{aw.name}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${aw.category === "Knitted" ? "bg-orange-100 text-orange-700" : "bg-amber-100 text-amber-700"}`}>
                      {aw.category}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Thread Count</p>
                      <p className="text-lg font-bold text-gold">{aw.tc}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">GSM Range</p>
                      <p className="text-base font-bold text-navy-900">{aw.gsm}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 sm:col-span-1 col-span-2">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Hand Feel</p>
                      <p className="text-xs text-navy-900 font-medium">{aw.hand}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{aw.detail}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Best For</p>
                      <div className="flex flex-wrap gap-1.5">
                        {aw.best.map((b) => (
                          <span key={b} className="text-xs bg-gray-100 text-navy-900 px-2.5 py-1 rounded-full font-medium">{b}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Key Markets</p>
                      <div className="flex flex-wrap gap-1.5">
                        {aw.markets.map((m) => (
                          <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full font-medium">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Technical Spec</p>
                    <p className="text-sm text-gray-600">{aw.spec}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Selector — mobile: below panel with internal scroll; desktop: left 1/4 with internal scroll */}
            <div className="lg:order-1 lg:col-span-1 flex flex-col gap-1.5 max-h-[260px] lg:max-h-[480px] overflow-y-auto pr-1">
              {WOVEN_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setActiveWoven(o.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold border transition-all flex items-center gap-2 shrink-0 ${
                    activeWoven === o.id
                      ? "bg-navy-900 text-white border-navy-900"
                      : "bg-white text-navy-900 border-gray-200 hover:border-gold/60"
                  }`}
                >
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${activeWoven === o.id ? "bg-white/10 text-white" : o.category === "Knitted" ? "bg-orange-100 text-orange-700" : "bg-amber-100 text-amber-700"}`}>
                    {o.category.slice(0, 4)}
                  </span>
                  {o.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4">
            <p className="text-xs text-amber-800 font-medium">
              Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
            </p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — GSM & TC GUIDE — DATA VISUALIZATION UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-weight" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Reference</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">GSM &amp; Thread Count Guide</h2>
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed mb-12">
            Two independent weight systems — GSM for terry fabric and Thread Count for woven bedding. Understanding both is critical for accurate procurement specification.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Terry GSM panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" aria-hidden="true">🧶</span>
                <div>
                  <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase">Terry Fabric</p>
                  <h3 className="text-xl font-bold text-navy-900">GSM Weight Scale</h3>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {GSM_TERRY.map((t) => (
                  <div key={t.range} className="relative">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-navy-900">{t.range}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{t.label}</span>
                        {t.popular && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">Most Requested</span>}
                      </div>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${t.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className={`h-full rounded-full ${t.color}`}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{t.market}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Woven TC panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" aria-hidden="true">🛏️</span>
                <div>
                  <p className="text-sky-600 text-xs font-semibold tracking-widest uppercase">Woven Bedding Fabric</p>
                  <h3 className="text-xl font-bold text-navy-900">Thread Count Scale</h3>
                </div>
              </div>
              <div className="flex flex-col gap-4 mb-6">
                {TC_TIERS.map((t) => (
                  <div key={t.range} className="relative">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-navy-900">{t.range}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{t.label}</span>
                        {t.popular && <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">Most Requested</span>}
                      </div>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${t.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className={`h-full rounded-full ${t.color}`}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{t.market}</p>
                  </div>
                ))}
              </div>
              <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                <p className="text-xs font-semibold text-sky-800 mb-1">TC Accuracy Note</p>
                <p className="text-xs text-sky-700 leading-relaxed">
                  Thread count alone does not determine quality. A 400 TC single-ply percale outperforms 800 TC multi-ply in durability. We supply single-ply TC documentation with all woven bedding fabric.
                </p>
              </div>
            </motion.div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — FINISHING TREATMENTS — RETAIL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-finishing" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Surface & Performance</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Finishing Treatments</h2>
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed mb-12">
            Finishing treatments are applied after weaving or knitting to enhance performance characteristics, appearance or compliance. Each treatment is specified and tested independently.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {FINISHING_TREATMENTS.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden="true">{f.icon}</span>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                    f.badge === "Healthcare" ? "bg-red-100 text-red-700" :
                    f.badge === "Performance" ? "bg-blue-100 text-blue-700" :
                    f.badge === "Premium" ? "bg-purple-100 text-purple-700" :
                    f.badge === "Compliance" ? "bg-orange-100 text-orange-700" :
                    f.badge === "Easy Care" ? "bg-green-100 text-green-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>{f.badge}</span>
                </div>
                <h3 className="font-bold text-navy-900 text-sm leading-snug">{f.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOUR & DYE PROGRAMS — NEUMORPHISM
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-colour" className="py-20 lg:py-28" style={{ backgroundColor: "#e8e8e8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Dyeing &amp; Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Colour &amp; Dye Programs</h2>
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed mb-12">
            Five dyeing methods covering the full range of home textile colour requirements — from full PMS-matched solid colours to institutional white. Colour tolerance ΔE ≤1.5 CIELAB.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DYE_METHODS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-6 flex flex-col gap-3"
                style={{ backgroundColor: "#e8e8e8", boxShadow: "8px 8px 16px #c8c8c8, -8px -8px 16px #ffffff" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-navy-900"
                    style={{ backgroundColor: "#e8e8e8", boxShadow: "inset 4px 4px 8px #c8c8c8, inset -4px -4px 8px #ffffff" }}
                  >
                    {d.code}
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm">{d.name}</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed flex-1">{d.desc}</p>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Applicable To</p>
                  <p className="text-xs text-navy-900 font-medium">{d.applicable}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: "#e8e8e8", boxShadow: "8px 8px 16px #c8c8c8, -8px -8px 16px #ffffff" }}>
            <p className="text-sm font-semibold text-navy-900 mb-1">Colour Matching Standard</p>
            <p className="text-sm text-gray-600">Pantone TPX / PMS / custom lab dip. Physical shade card issued for buyer approval before bulk production. Tolerance ΔE ≤1.5 CIELAB under D65 illuminant.</p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — CUSTOM FABRIC DEVELOPMENT — CORPORATE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM &amp; Custom</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Custom Fabric Development</h2>
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed mb-12">
            Beyond standard constructions — custom specifications developed to buyer requirements. Each custom element is confirmed at inquiry stage before production commitment.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OEM_FEATURES.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-100 flex flex-col gap-4"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-gold/20 leading-none select-none">{f.num}</span>
                  <div>
                    <h3 className="font-bold text-navy-900 text-base leading-snug">{f.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 bg-navy-900 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Start a Custom Programme</p>
              <h3 className="text-xl font-bold text-white mb-2">Specify Your Fabric Requirements</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Custom fabric development begins with your RFQ. Include fabric category, construction, GSM or TC, width, finishing and quantity — our team evaluates production feasibility and returns pricing within 3–5 working days.
              </p>
            </div>
            <Link
              href="/rfq/"
              className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-7 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm whitespace-nowrap"
            >
              Submit Fabric RFQ <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKET APPLICATIONS — EDITORIAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Who Buys</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-12">Market Applications</h2>
          <div className="flex flex-col divide-y divide-gray-200">
            {MARKET_SEGMENTS.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="py-10 grid lg:grid-cols-3 gap-6 items-start"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl" aria-hidden="true">{m.flag}</span>
                  <div>
                    <p className="text-2xl font-bold text-navy-900 leading-tight">{m.title}</p>
                    <p className="text-sm text-gold font-semibold mt-1">{m.regions}</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-gray-600 text-base leading-relaxed">{m.desc}</p>
                </div>
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
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-12">Quality Certifications</h2>
          <div className="flex flex-col gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="grid sm:grid-cols-5 gap-6 items-center bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <div className="sm:col-span-1 flex justify-center sm:justify-start">
                  <div className="w-[120px] h-[70px] bg-white rounded-xl border border-gray-200 flex items-center justify-center p-3 shrink-0">
                    <Image
                      src={c.img}
                      alt={`${c.name} — ${c.full}`}
                      width={90}
                      height={56}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-navy-900 text-base">{c.name}</h3>
                    <span className="text-xs text-gray-400 font-medium hidden sm:block">— {c.full}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — ROLL SPECS & EXPORT — SWISS DESIGN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Logistics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-12">Roll Specifications &amp; Export</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Roll specs table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-navy-900 px-6 py-4">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest">Roll Specifications</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-3 px-6 py-3 bg-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Parameter</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Terry Fabric</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Woven Fabric</p>
                </div>
                {[
                  { param: "Roll Length", terry: "50 / 100 / 150m", woven: "50 / 100 / 150m" },
                  { param: "Extended Length", terry: "200m on request", woven: "200m on request" },
                  { param: "Standard Width", terry: "30\" / 44\" / 58–60\" / 72\"", woven: "58–60\" / 90\"" },
                  { param: "Core", terry: "Paper or plastic tube", woven: "Paper or plastic tube" },
                  { param: "Packing", terry: "Polybag wrapped roll", woven: "Polybag wrapped roll" },
                  { param: "GSM Tolerance", terry: "±5% of specification", woven: "±5% of specification" },
                  { param: "Width Tolerance", terry: "±1% of specified width", woven: "±1% of specified width" },
                ].map((r) => (
                  <div key={r.param} className="grid grid-cols-3 px-6 py-3">
                    <p className="text-xs font-semibold text-navy-900">{r.param}</p>
                    <p className="text-xs text-gray-600">{r.terry}</p>
                    <p className="text-xs text-gray-600">{r.woven}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Export terms */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-navy-900 mb-4">Incoterms &amp; Export</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { term: "FOB", title: "Free On Board", desc: "Karachi or Port Qasim — buyer arranges freight and insurance from port of origin." },
                    { term: "CIF", title: "Cost, Insurance & Freight", desc: "Seller arranges sea freight and insurance to buyer's destination port." },
                    { term: "CFR", title: "Cost & Freight", desc: "Seller arranges sea freight to destination port; buyer arranges insurance." },
                  ].map((t) => (
                    <div key={t.term} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <span className="w-10 h-10 rounded-lg bg-navy-900 text-gold text-xs font-black flex items-center justify-center shrink-0">{t.term}</span>
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{t.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-navy-900 mb-4">Sea Freight Lead Times</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { dest: "USA (East Coast)", days: "22–26 days" },
                    { dest: "USA (West Coast)", days: "24–28 days" },
                    { dest: "UK / N. Europe", days: "18–24 days" },
                    { dest: "Middle East", days: "8–12 days" },
                    { dest: "SE Asia", days: "10–16 days" },
                    { dest: "Australia", days: "16–22 days" },
                  ].map((d) => (
                    <div key={d.dest} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm text-navy-900">{d.dest}</span>
                      <span className="text-sm font-bold text-gold">{d.days}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4">
            <p className="text-xs text-amber-800 font-medium">
              Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
            </p>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABLE SOURCING — SCANDINAVIAN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Ethics &amp; Environment</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Sustainable Sourcing</h2>
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed mb-14">
            Responsible sourcing across the full supply chain — from cotton field to fabric roll. Six sustainability commitments independently certified.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-3"
              >
                <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
                <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{s.desc}</p>
                <span className="text-xs font-semibold text-lime-700 bg-lime-100 px-3 py-1 rounded-full w-fit">{s.tag}</span>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — SOURCING PROCESS — GRID UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Sourcing Process</h2>
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed mb-12">
            From initial specification to roll delivery — a structured six-step process designed for international fabric buyers placing cross-border orders from Pakistan.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-gold hover:shadow-md transition-all relative overflow-hidden"
              >
                <span className="absolute -top-3 -right-2 text-8xl font-black text-gray-100 select-none leading-none" aria-hidden="true">
                  {p.num}
                </span>
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center">
                    <span className="text-gold text-xs font-black">{p.num}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 text-base">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4">
            <p className="text-xs text-amber-800 font-medium">
              Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
            </p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Home Textile Fabric FAQ</h2>
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
          PAGE BOXES — RELATED PRODUCTS
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Explore Related Products</p>
            <h2 className="text-2xl font-bold text-navy-900">Related Fabric &amp; Home Textiles</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAGE_BOXES.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-base leading-tight mb-1">{card.title}</h3>
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
              Ready to Source Home Textile<br />Fabric from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Terry loop, velour, zero twist and woven home textile fabric from Pakistan&rsquo;s certified mills. GSM 300&ndash;800 for terry, Thread Count 200&ndash;800 for woven. GOTS, OEKO-TEX, GRS certified options. Submit your specification &mdash; mill match and quotation within 3&ndash;5 working days.
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
