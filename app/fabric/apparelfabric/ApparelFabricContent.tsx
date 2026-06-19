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

const KNIT_CONSTRUCTIONS = [
  {
    id: "single-jersey",
    name: "Single Jersey",
    badge: "Most Popular",
    gsm: "120–200 GSM",
    hand: "Smooth face, natural 4-way stretch, fine surface texture",
    best: ["T-Shirts", "Underwear", "Casual Tops", "Sportswear"],
    markets: ["USA", "EU", "Australia", "Middle East"],
    finishing: ["Soft Hand / Silicone", "Anti-Shrink / Compacted", "Moisture Wicking"],
    detail:
      "Single jersey is the most widely used knit construction for apparel fabric worldwide. The smooth face provides excellent registration for printed garments, while natural 4-way stretch delivers comfortable wear across casual, athletic and fashion categories. Available in combed or ring-spun cotton for tighter surface texture with improved appearance. GSM range of 120–200 covers everything from lightweight summer T-shirts to midweight layering pieces.",
    spec: "100% combed cotton or cotton/polyester blend. Ring-spun or open-end options. Reactive dyed. Anti-shrink compacted finish available. GOTS and OEKO-TEX Standard 100 certified options.",
  },
  {
    id: "interlock",
    name: "Double Jersey / Interlock",
    badge: "",
    gsm: "160–280 GSM",
    hand: "Smooth both sides, stable structure, minimal curl",
    best: ["Polo Shirts", "Corporate Apparel", "Activewear", "Baby Garments"],
    markets: ["USA", "EU", "Japan", "Australia"],
    finishing: ["Soft Hand / Silicone", "Anti-Shrink", "Enzyme Treatment"],
    detail:
      "Interlock is a double-knit construction where two single jersey fabrics are knitted together, producing a smooth, stable fabric on both sides. The interlocked structure eliminates the curl typical of single jersey and provides a heavier, more structured hand. Higher production complexity is reflected in the premium positioning — interlock is commonly specified for polo shirts, quality corporate wear and premium baby garments where dimensional stability is critical.",
    spec: "100% cotton or cotton/elastane. GSM 160–280. Both sides smooth. Anti-shrink recommended. OEKO-TEX Standard 100 available.",
  },
  {
    id: "pique",
    name: "Piqué",
    badge: "Polo Specialist",
    gsm: "180–260 GSM",
    hand: "Textured waffle face, structured body, premium feel",
    best: ["Polo Shirts", "Workwear", "Corporate Apparel", "Golf Wear"],
    markets: ["USA", "UK", "Middle East", "South America"],
    finishing: ["Moisture Wicking", "Anti-Shrink", "Soft Hand"],
    detail:
      "Piqué knit is defined by its distinctive textured face structure — small raised cells across the fabric surface. This construction provides a more structured, premium feel compared to single jersey, making it the industry standard for polo shirts and corporate apparel. Mini piqué (finer cell structure) is specified for high-end fashion polo programmes, while standard piqué suits corporate and workwear. The textured surface also provides excellent stitch registration for embroidery.",
    spec: "100% cotton piqué or cotton/polyester blend. GSM 180–260. Textured face. Embroidery recommended. OEKO-TEX available.",
  },
  {
    id: "rib-1x1",
    name: "Rib (1×1)",
    badge: "",
    gsm: "180–280 GSM",
    hand: "Strong vertical ribbing, close fit, excellent stretch recovery",
    best: ["Fitted Tops", "Cuffs & Neckbands", "Henley Shirts", "Athletic"],
    markets: ["USA", "EU", "Korea", "Japan"],
    finishing: ["Anti-Shrink", "Soft Hand", "Enzyme Treatment"],
    detail:
      "1×1 rib is a classic knit construction with alternating knit and purl columns producing strong vertical ribbing with exceptional stretch and recovery. Used as body fabric for close-fitting tops, henleys and athletic garments, and widely used as trim fabric for cuffs and neckbands on sweatshirts and T-shirts. Higher GSM delivers a premium, structured hand. The close-fitting nature makes it particularly popular for contemporary menswear basics and fitness apparel.",
    spec: "100% cotton ring-spun or cotton/elastane (5%). GSM 180–280. Excellent recovery. Flat-lock seam option.",
  },
  {
    id: "rib-2x2",
    name: "Rib (2×2)",
    badge: "",
    gsm: "200–320 GSM",
    hand: "Wider rib channels, pronounced texture, strong recovery",
    best: ["Sweaters", "Thermal Underwear", "Cuffs & Waistbands", "Fashion"],
    markets: ["USA", "Canada", "N. Europe", "UK"],
    finishing: ["Anti-Shrink", "Soft Hand / Silicone", "Peached"],
    detail:
      "2×2 rib has twice-wide rib channels compared to 1×1, creating a more pronounced, visible texture with a slightly heavier hand. The construction delivers strong stretch and recovery with a more casual, relaxed aesthetic than 1×1 rib. Widely used for sweater bodies, waistbands, cuffs and ribbed hem treatments. Popular in USA cold-climate markets for heavyweight thermal programs and Canadian outdoor apparel brands.",
    spec: "100% cotton or cotton/polyester blend. GSM 200–320. Wider channels. Anti-shrink finish recommended.",
  },
  {
    id: "french-terry",
    name: "French Terry",
    badge: "Sweatshirt Standard",
    gsm: "240–380 GSM",
    hand: "Looped back, smooth face, soft interior, substantial weight",
    best: ["Sweatshirts", "Hoodies", "Joggers", "Casual Jackets"],
    markets: ["USA", "EU", "Australia", "Canada"],
    finishing: ["Soft Hand / Silicone", "Anti-Pill", "Enzyme Treatment", "Garment Dye"],
    detail:
      "French terry is the standard construction for sweatshirts and hoodies — smooth face on the outside with uncut loops on the reverse providing warmth and moisture absorption. The combination of smooth exterior (good for print and embroidery) and looped interior (comfort and warmth) makes it the most versatile mid-weight knit for casual apparel. Available from 240 GSM for lightweight sweatshirts up to 380 GSM for heavyweight premium hoodies.",
    spec: "100% cotton or cotton/polyester blend. GSM 240–380. Smooth face, looped back. Reactive or pigment dyed. GOTS available.",
  },
  {
    id: "fleece",
    name: "Fleece / Brushed Back",
    badge: "Winter Specialist",
    gsm: "280–450 GSM",
    hand: "Brushed interior, insulating warmth, heavy weight",
    best: ["Hoodies", "Fleece Jackets", "Winter Tops", "Athletic Outerwear"],
    markets: ["USA", "Canada", "N. Europe", "Russia/CIS"],
    finishing: ["Anti-Pill", "Brushed Interior", "Anti-Static", "Soft Hand"],
    detail:
      "Brushed fleece is produced by raising the loop back of French terry through brushing, creating a dense, insulating pile on the interior. The brushed surface traps more air than unbrished loops, significantly increasing warmth without proportional weight increase. Anti-pill finishing is critical to prevent the brushed surface from balling in wear — this should be specified as a hard requirement. Weights from 280 GSM for lightweight performance fleece to 450 GSM for premium outdoor garments.",
    spec: "100% polyester or cotton/polyester blend. GSM 280–450. Brushed interior. Anti-pill finishing required. GRS recycled options available.",
  },
  {
    id: "waffle",
    name: "Waffle Knit",
    badge: "",
    gsm: "160–280 GSM",
    hand: "Grid cell structure, air-trapping warmth, textured both sides",
    best: ["Thermal Henleys", "Workwear Layers", "Casual Tops", "Outdoor Brands"],
    markets: ["USA", "Canada", "UK", "N. Europe"],
    finishing: ["Soft Hand / Silicone", "Anti-Shrink", "Enzyme Treatment"],
    detail:
      "Waffle knit is defined by its characteristic square grid cell structure which creates insulating air pockets for warmth without bulk. The grid texture is visible on both sides, providing a distinctive aesthetic that is particularly associated with American workwear and thermal layering programmes. Embroidery is the preferred decoration method — the structured cell surface provides a firm base for stitch registration. Screen printing requires soft-hand inks.",
    spec: "100% cotton or cotton/polyester. Grid cell depth 3–5 mm. GSM 160–280. Embroidery recommended.",
  },
  {
    id: "pointelle",
    name: "Pointelle",
    badge: "",
    gsm: "120–180 GSM",
    hand: "Open decorative holes, feminine texture, lightweight",
    best: ["Women's Fashion", "Lingerie", "Baby Garments", "Luxury Basics"],
    markets: ["EU", "Japan", "Korea", "USA (women's)"],
    finishing: ["Soft Hand / Silicone", "Anti-Shrink", "Enzyme Treatment"],
    detail:
      "Pointelle is a delicate open-knit construction where selected stitches are deliberately dropped to create a regular pattern of small holes across the fabric surface. The lacy, feminine texture is associated with high-end women's fashion, luxury basics and baby garments. Higher cotton quality (combed, ring-spun) is recommended for pointelle to maintain hole definition and prevent distortion. Common in premium EU and Japanese fashion programmes requiring delicate texture alongside cotton's natural breathability.",
    spec: "100% combed cotton or cotton/modal blend. GSM 120–180. Open hole pattern. Soft hand finish recommended.",
  },
  {
    id: "microfiber",
    name: "Microfiber",
    badge: "Performance",
    gsm: "80–160 GSM",
    hand: "Ultra-smooth, silky, lightweight — exceptional moisture transfer and quick-dry",
    best: ["Sportswear", "Activewear", "Performance Tees", "Dry-Fit Polo", "Swimwear Lining"],
    markets: ["USA", "EU", "Australia", "Middle East", "Japan"],
    finishing: ["Moisture Wicking", "Quick-Dry", "Anti-Static", "Anti-Odor / Antimicrobial"],
    detail:
      "Microfiber knit is produced from ultra-fine filament polyester (0.5–1 denier per filament) or polyamide-polyester split-filament blends. The extremely fine fibre diameter creates a dense, smooth surface with outstanding moisture management and quick-dry performance. Pakistan is a verified exporter of microfiber fabric — Bari Textile Mills, ACME Mills and Faisalabad-based export facilities supply microfiber in single jersey and interlock constructions. Colour vibrancy on disperse-dyed microfiber is outstanding, making it the standard for sublimation sportswear programmes. GSM range 80–160 covers lightweight dry-fit tees through midweight performance tops.",
    spec: "100% polyester microfiber or 80/20 polyamide/polyester split-filament. GSM 80–160. Ultra-fine filament (0.5–1 dpf). Moisture wicking and quick-dry finish standard. Sublimation print compatible (polyester base). OEKO-TEX Standard 100 available.",
  },
  {
    id: "slub-jersey",
    name: "Slub Jersey",
    badge: "",
    gsm: "140–220 GSM",
    hand: "Irregular textured surface — casual, vintage, artisanal character; unique per roll",
    best: ["Fashion Tees", "Premium Casual Tops", "Vintage-Wash Collections", "Summer Wear"],
    markets: ["USA", "EU", "Japan", "Australia", "Canada"],
    finishing: ["Soft Hand / Silicone", "Enzyme Wash", "Garment Dye", "Anti-Shrink"],
    detail:
      "Slub jersey uses yarn with intentional thick-and-thin variations in the spinning process, producing an irregular textured surface that replicates artisanal or vintage fabric aesthetics — mechanically achieved with no printing. Pakistan's knitwear facilities produce slub jersey in combed and ring-spun cotton. Slub pattern intensity is customisable to buyer specifications. Garment dyeing enhances tonal depth of the irregular slub. Popular for premium casual brands, vintage-wash programmes and fashion tees where natural surface variation is a commercial differentiator.",
    spec: "100% cotton slub or cotton/viscose slub blend. GSM 140–220. Irregular yarn slub — pattern intensity to specification. Garment dye and enzyme wash compatible. OEKO-TEX Standard 100 available.",
  },
  {
    id: "cvc-poly-cotton",
    name: "CVC / Poly-Cotton",
    badge: "Cost-Efficient",
    gsm: "130–240 GSM",
    hand: "Slightly firmer than 100% cotton — crease-resistant, dimensionally stable, faster-drying",
    best: ["Uniform T-Shirts", "Workwear Tops", "Budget Corporate Wear", "Promotional Tees", "Institutional Supply"],
    markets: ["USA", "EU", "Middle East", "South America", "Southeast Asia"],
    finishing: ["Anti-Shrink / Compacted", "Anti-Static", "Moisture Wicking"],
    detail:
      "CVC (Chief Value Cotton — 60/40 or 65/35 cotton/polyester) and poly-cotton (50/50) knits are produced at scale across Pakistan's spinning and knitting sector. Blended yarn production is well established in Faisalabad and Karachi. The polyester component reduces cost, improves dimensional stability, significantly reduces residual shrinkage and accelerates drying time compared to 100% cotton. This is the most common construction for uniform programmes, institutional workwear, promotional apparel and bulk corporate wear. Reactive dyeing standard; discharge printing available for bright whites.",
    spec: "60/40 or 65/35 cotton/polyester (CVC), or 50/50 poly-cotton. GSM 130–240. Single jersey or interlock. Reactive or discharge dyed. Anti-shrink finish recommended. OEKO-TEX Standard 100 available.",
  },
  {
    id: "cotton-modal",
    name: "Cotton-Modal",
    badge: "Luxury Basics",
    gsm: "130–200 GSM",
    hand: "Exceptionally soft drape — smoother and lighter than 100% cotton at same GSM",
    best: ["Premium T-Shirts", "Luxury Basics", "Underwear", "Sleepwear", "Women's Tops"],
    markets: ["EU", "USA", "Japan", "Korea", "UK"],
    finishing: ["Soft Hand / Silicone", "Anti-Shrink", "Enzyme Treatment"],
    detail:
      "Cotton-modal blends combine cotton (50–70%) with modal — a semi-synthetic fibre from beech wood pulp — producing a fabric significantly softer than 100% cotton with improved drape and natural lustre. Modal fibres are 50% more absorbent than cotton and resist shrinkage better. Pakistan sources modal fibre and blends with domestic cotton in certified knitwear facilities, primarily for export to EU and USA premium brands. Positioned for brands commanding a premium quality tier in basics, underwear and loungewear programmes.",
    spec: "50/50, 60/40 or 70/30 cotton/modal. GSM 130–200. Single jersey or interlock. Reactive dyed. Soft hand finish recommended. OEKO-TEX Standard 100 available.",
  },
];

const WOVEN_CONSTRUCTIONS = [
  {
    id: "plain-weave",
    name: "Plain Weave",
    gsm: "60–160 GSM",
    structure: "Each weft thread passes over and under alternate warp threads — the simplest interlacing pattern, producing a flat, stable, breathable fabric.",
    applications: ["Formal Shirts", "Blouses", "Lining Fabric", "Poplin & Lawn"],
    markets: ["USA", "EU", "Middle East"],
    detail: "Plain weave is the most widely used woven construction for shirting fabrics. The tight interlacing produces a smooth, stable cloth that accepts reactive printing and dyeing reliably. Poplin is a plain weave shirting standard — tightly woven with a fine rib in the weft. Lawn is a lightweight plain weave for blouses and formal wear.",
  },
  {
    id: "twill",
    name: "Twill",
    gsm: "160–320 GSM",
    structure: "Weft threads pass over two or more warp threads in a step pattern, producing diagonal lines on the fabric face.",
    applications: ["Trousers & Chinos", "Jackets", "Workwear", "Casual Shirts"],
    markets: ["USA", "EU", "Middle East", "Australia"],
    detail: "Twill weave produces a more durable, heavier fabric than plain weave at the same GSM. The diagonal structure increases resistance to tearing and abrasion, making twill the standard for trousers, chinos, workwear and outerwear fabric. Chino cloth is a 3×1 twill in cotton or cotton/poly. Canvas weight twill (200–320 GSM) is used for workwear jackets and industrial apparel.",
  },
  {
    id: "satin",
    name: "Satin",
    gsm: "80–200 GSM",
    structure: "Warp threads float over multiple weft threads creating a smooth, reflective face with minimal interlacing points.",
    applications: ["Formal Shirts", "Dress Shirts", "Luxury Linings", "Blouses"],
    markets: ["EU", "Japan", "Korea", "Middle East"],
    detail: "Satin weave produces the smoothest, most lustrous surface of any woven construction. The long warp floats reduce interlacing points, resulting in a silky hand and high sheen. Used for premium dress shirts, luxury shirting programmes and lining fabrics. Cotton satin (sateen) provides a subtle sheen without the high gloss of polyester satin.",
  },
  {
    id: "oxford",
    name: "Oxford",
    gsm: "100–180 GSM",
    structure: "Modified plain weave where two warp threads interlace with a single thick weft, producing a slight texture and basket weave effect.",
    applications: ["Formal Shirts", "Casual Button-Downs", "Oxford Cloth Shirts"],
    markets: ["USA", "UK", "EU"],
    detail: "Oxford cloth is a classic shirting construction with a distinctive matte surface and slight basket weave texture. The construction is more casual than poplin or satin, positioning it for button-down casual shirts, business casual and collegiate programmes. Royal Oxford (finer yarn, tighter construction) bridges the gap between Oxford and formal shirting.",
  },
  {
    id: "canvas",
    name: "Canvas",
    gsm: "280–450 GSM",
    structure: "Heavy plain or twill weave with thick yarns producing a rigid, durable, high-strength fabric.",
    applications: ["Workwear Jackets", "Bags", "Industrial Apparel", "Outdoor Gear"],
    markets: ["USA", "EU", "Australia", "Canada"],
    detail: "Canvas is a heavy-weight woven fabric used for structural apparel — workwear jackets, tool aprons, bags and industrial garments. The dense construction provides high abrasion resistance and structural rigidity. DWR (durable water repellent) finishing is commonly applied for workwear and outdoor applications. Available in 100% cotton or cotton/polyester canvas.",
  },
  {
    id: "poplin",
    name: "Poplin",
    gsm: "80–140 GSM",
    structure: "Fine plain weave with a slight horizontal rib produced by a heavier weft yarn — crisp, smooth and lightweight.",
    applications: ["Formal Shirts", "Dress Blouses", "Corporate Shirts"],
    markets: ["USA", "EU", "Middle East", "Australia"],
    detail: "Poplin is the primary shirting fabric for formal and corporate programmes. The fine, crisp hand and smooth surface provide a professional appearance. Easy-care (wrinkle resistant) finishing is widely applied for corporate shirting. Stretch poplin (2–5% elastane) adds comfort for business dress programmes without compromising the formal appearance.",
  },
  {
    id: "denim",
    name: "Denim",
    gsm: "200–450 GSM (8–14 oz)",
    structure: "3×1 twill weave, typically with indigo-dyed warp and undyed weft — the standard jeans construction.",
    applications: ["Jeans", "Denim Jackets", "Denim Shirts", "Casual Workwear"],
    markets: ["USA", "EU", "Brazil", "Japan"],
    detail: "Denim is a 3×1 twill weave traditionally using ring-spun cotton indigo-dyed warp with natural weft. Standard weights range from 8 oz (light summer denim) to 14 oz (premium heavyweight). Stretch denim (1–3% elastane) is widely specified for fashion jeans. Selvedge denim (narrow-loom construction with finished self-edge) commands a premium for Japanese and artisan programmes.",
  },
  {
    id: "jacquard",
    name: "Jacquard",
    gsm: "200–400 GSM",
    structure: "Computer-controlled warp threads create intricate woven patterns directly in the fabric construction.",
    applications: ["Luxury Shirts", "Designer Fabric", "Home Textile Fabric", "Formal Wear"],
    markets: ["EU", "Japan", "Middle East", "Korea"],
    detail: "Jacquard weave uses a Jacquard loom where individual warp threads are controlled independently, allowing complex patterns and textures to be woven directly into the fabric rather than printed. The intricate construction creates a high-value fabric suitable for luxury shirting, designer programmes and premium home textile applications. Pattern complexity drives production cost significantly.",
  },
  {
    id: "chambray",
    name: "Chambray",
    gsm: "100–160 GSM",
    structure: "Plain weave with coloured warp (typically blue) and white weft, producing a subtle, heathered appearance.",
    applications: ["Casual Shirts", "Workwear Shirts", "Dresses", "Lightweight Jackets"],
    markets: ["USA", "EU", "Australia"],
    detail: "Chambray is a plain weave fabric with a distinctive heathered appearance from the contrast between dyed warp and natural weft yarns. Often compared to denim in aesthetic but significantly lighter in weight, making it suitable for warm-climate casual shirting. The construction provides a relaxed, casual positioning between formal shirting and denim — popular in USA summer casual and Australian resort wear programmes.",
  },
  {
    id: "dobby",
    name: "Dobby",
    gsm: "100–220 GSM",
    structure: "Mechanical dobby attachment creates small, geometric repeat patterns directly in the weave construction.",
    applications: ["Textured Casual Shirts", "Fashion Shirts", "Premium Casual"],
    markets: ["USA", "EU", "Australia", "Japan"],
    detail: "Dobby weave uses a dobby mechanism to control groups of warp threads, creating small geometric patterns, stripes or textures woven directly into the fabric. This adds visual interest and texture compared to plain weave at a moderate cost premium. End-on-end (alternating light/dark yarns) is a common dobby variation producing a fine salt-and-pepper texture popular for quality casual shirting.",
  },
  {
    id: "ripstop",
    name: "Ripstop",
    gsm: "90–250 GSM",
    structure: "Plain or twill base weave reinforced with thicker interlocking threads at regular intervals — visible as a grid pattern, prevents tear propagation.",
    applications: ["Cargo Pants", "Workwear Jackets", "Outdoor Apparel", "Tactical Gear", "Shorts"],
    markets: ["USA", "EU", "Australia", "Canada", "Middle East"],
    detail: "Ripstop weave integrates a grid of heavier reinforcing threads at regular intervals, producing the characteristic square grid pattern on the surface. This structure prevents any tear from spreading — the reinforcing thread acts as a barrier. Available in nylon, polyester, cotton, poly-cotton (TC) blends and stretch variants. Pakistan's woven mills supply ripstop for cargo pants, tactical workwear, outdoor jackets and military-style apparel. DWR (Durable Water Repellent) finishing is standard for outdoor applications. Lightweight nylon ripstop (90–120 GSM) suits linings and packable outerwear; heavy cotton ripstop (200–250 GSM) suits durable cargo pants.",
  },
  {
    id: "linen-blend",
    name: "Linen / Linen Blend",
    gsm: "120–260 GSM",
    structure: "Natural bast fibre weave — plain or twill interlacing — with natural irregular surface texture from the flax fibre.",
    applications: ["Summer Shirts", "Resort Wear", "Dresses", "Wide-Leg Trousers", "Luxury Casual"],
    markets: ["EU", "Australia", "USA (summer)", "Japan", "Middle East"],
    detail: "Linen fabric from pure or blended flax fibre delivers natural breathability, a distinctive crisp-then-softening hand and surface texture from bast fibre irregularity. Pure linen (100% flax) is premium. Linen-cotton and linen-viscose blends are more accessible price points with better dimensional stability. Pakistan's woven mills produce linen-blend fabric from imported flax yarns blended with domestic cotton, positioned for warm-climate and resort wear programmes. Nishat Mills' finishing plant processes linen blends for export. The construction is specified for summer and warm-climate programmes in EU, Australian and USA market buyers.",
  },
  {
    id: "seersucker",
    name: "Seersucker",
    gsm: "100–180 GSM",
    structure: "Plain weave with alternating puckered and flat stripe sections — produced by varying warp tension during weaving.",
    applications: ["Summer Suits", "Warm-Climate Shirts", "Casual Dresses", "Resort Wear"],
    markets: ["USA", "Australia", "EU", "Middle East"],
    detail: "Seersucker is produced by holding some warp threads at different tension to others during weaving, creating alternating puckered and flat stripes across the fabric width. The puckered areas lift the fabric off the skin, creating air channels that improve breathability in hot climates. No ironing required — the puckered texture is the finished appearance. Primarily produced in cotton or cotton/polyester, in narrow stripe (3–5 mm) or wide stripe (10–15 mm) patterns. Pakistan's Gul Ahmed and similar composite mills produce seersucker fabric for USA and Australian summer programmes.",
  },
];

const GSM_TIERS = [
  { range: "80–130 GSM", label: "Light", pct: 20, color: "bg-sky-400", garments: "Formal shirts, blouses, shirting fabric, lining", width: "44\"–60\"" },
  { range: "130–200 GSM", label: "Medium-Light", pct: 42, color: "bg-blue-500", garments: "T-shirts, polo shirts, casual tops, women's wear", width: "58\"–72\"" },
  { range: "200–280 GSM", label: "Medium", pct: 62, color: "bg-indigo-500", garments: "Trousers, chinos, sweatshirts, structured jackets", width: "58\"–72\"", featured: true },
  { range: "280–380 GSM", label: "Medium-Heavy", pct: 80, color: "bg-violet-600", garments: "Heavy fleece, canvas shirts, denim, workwear", width: "44\"–60\"" },
  { range: "380–450 GSM", label: "Heavy", pct: 100, color: "bg-purple-700", garments: "Technical canvas, industrial workwear, heavy denim", width: "44\"–58\"" },
];

const FINISHING_OPTIONS = [
  { code: "SH", name: "Soft Hand / Silicone", desc: "Reduces surface friction, improves drape for knits and wovens", color: "bg-sky-100 text-sky-700", applies: "All apparel fabrics" },
  { code: "AP", name: "Anti-Pill", desc: "Prevents pilling on fleece, knits and wool blends in wear", color: "bg-blue-100 text-blue-700", applies: "Sweatshirts, hoodies, sweatpants, fleece fabrics" },
  { code: "AS", name: "Anti-Shrink / Compacted", desc: "Pre-shrunk finishing, residual shrinkage <3% per ISO 6330", color: "bg-indigo-100 text-indigo-700", applies: "All knitted garments — T-shirts, polo, jersey, knitwear" },
  { code: "EZ", name: "Enzyme / Bio-Finish", desc: "Bio-polishing removes surface fibres for smoother, cleaner hand", color: "bg-violet-100 text-violet-700", applies: "Cotton jerseys, woven shirts, denim" },
  { code: "PS", name: "Peached / Sueded", desc: "Micro-sanding raises short fibres for velvety, soft surface texture", color: "bg-purple-100 text-purple-700", applies: "Casual shirts, trousers, outerwear, chinos" },
  { code: "BR", name: "Brushed", desc: "Mechanical brushing raises fleece back fibres for improved insulation", color: "bg-fuchsia-100 text-fuchsia-700", applies: "Sweatshirts, hoodies, sweatpants — brushed fleece back" },
  { code: "MW", name: "Moisture Wicking", desc: "Hydrophilic treatment for performance fabrics — moisture transport away from skin", color: "bg-teal-100 text-teal-700", applies: "Activewear, polo shirts, sports T-shirts, performance knits" },
  { code: "MC", name: "Mercerized", desc: "Caustic soda treatment swells cotton fibres — increased lustre and dye uptake", color: "bg-emerald-100 text-emerald-700", applies: "Formal & dress shirts, polo shirts, premium cotton wovens" },
  { code: "WR", name: "Wrinkle Resistant", desc: "Cross-linking agents reduce crease angle recovery for easy-care programmes", color: "bg-green-100 text-green-700", applies: "Formal shirts, casual shirts, trousers, chinos, woven fabrics" },
  { code: "AN", name: "Anti-Static", desc: "Conductive fibre treatment prevents static charge build-up in synthetic blends", color: "bg-lime-100 text-lime-700", applies: "Workwear, uniforms, synthetic & poly-blend fabrics" },
  { code: "AO", name: "Anti-Odor / Antimicrobial", desc: "Silver-ion or zinc pyrithione treatment inhibits bacterial growth and odour formation", color: "bg-cyan-100 text-cyan-700", applies: "Activewear, socks, sports garments, workwear" },
  { code: "DW", name: "DWR / Water Repellent", desc: "C6 fluorocarbon-free DWR treatment causes water to bead and roll off — tested to EN 14360", color: "bg-blue-100 text-blue-700", applies: "Workwear jackets, cargo pants, shorts, outdoor apparel" },
  { code: "FR", name: "Flame Retardant (FR)", desc: "Phosphorus-based FR treatment to BS EN ISO 15025 / NFPA 2112 for industrial and protective programmes", color: "bg-red-100 text-red-700", applies: "Workwear only — not applicable to general apparel" },
];

const DYE_METHODS = [
  { name: "Reactive Dyeing", icon: "💧", desc: "Cotton knits and wovens. Wide colour gamut, good wash fastness (Grade 4+). PMS / Pantone TPX matching.", best: "Cotton shirting, T-shirt fabric, jersey", swatches: ["bg-red-400", "bg-blue-500", "bg-green-500", "bg-yellow-400", "bg-purple-500"] },
  { name: "Vat Dyeing", icon: "🏭", desc: "Cotton wovens. Exceptional wash and light fastness for workwear and industrial programmes.", best: "Workwear twill, canvas, denim", swatches: ["bg-navy-900", "bg-gray-700", "bg-blue-800", "bg-green-800"] },
  { name: "Pigment Dyeing", icon: "🎨", desc: "Piece dyeing. Vintage/faded aesthetic. Softer hand with appropriate pigment-fixing process.", best: "Casual jerseys, vintage-wash garments", swatches: ["bg-orange-400", "bg-amber-500", "bg-yellow-600", "bg-stone-500"] },
  { name: "Yarn-Dyed", icon: "🧵", desc: "Fibres or yarns dyed before weaving/knitting. Enables stripes, checks and multi-colour patterns.", best: "Oxford shirts, chambray, check shirting", swatches: ["bg-sky-400", "bg-white", "bg-navy-900", "bg-red-500"] },
  { name: "Disperse Dyeing", icon: "⚡", desc: "Synthetic microfiber and polyester. Brilliant colour vibrancy and full sublimation print compatibility for performance fabrics.", best: "Microfiber jersey, polyester sportswear, sublimation programmes", swatches: ["bg-pink-500", "bg-cyan-400", "bg-lime-400", "bg-orange-500"] },
  { name: "Greige (Undyed)", icon: "🌾", desc: "Natural undyed fabric for buyer's own dyeing programme. Consistent base quality for reliable results.", best: "Customer-dyed programmes", swatches: ["bg-stone-200", "bg-stone-300", "bg-stone-400"] },
];

const OEM_FEATURES = [
  { num: "01", title: "Custom GSM Specification", desc: "Any weight within construction capability — exact GSM to your technical pack." },
  { num: "02", title: "Custom Width", desc: "Standard (44\"/58\"/72\"/90\") and non-standard widths available on request." },
  { num: "03", title: "Custom Blend", desc: "Cotton/polyester/elastane/viscose ratios configured to your performance requirements." },
  { num: "04", title: "Custom Finish", desc: "Full finishing specification including treatment, hand-feel target and test method." },
  { num: "05", title: "Lab Dip Service", desc: "Colour matching against PMS / Pantone TPX or supplied swatch within 2–3 working days." },
  { num: "06", title: "Swatch Service", desc: "Sample cards and swatch books produced for buyer approval before bulk order." },
];

const MARKET_SEGMENTS = [
  { abbr: "GM", name: "Garment Manufacturers", market: "USA / EU / Bangladesh / Vietnam", desc: "Single jersey, twill and poplin in volume. Consistent GSM and width tolerance critical. FOB Karachi pricing." },
  { abbr: "SA", name: "Sportswear & Activewear", market: "USA / EU / Australia / Middle East", desc: "Microfiber, moisture-wicking knits, 4-way stretch. Anti-odour and quick-dry finish. OEKO-TEX required." },
  { abbr: "WW", name: "Workwear Suppliers", market: "USA / EU / Middle East / Australia", desc: "Canvas, ripstop, FR cotton, hi-vis polyester and CVC blends. ISO 13688 and EN certification requirements." },
  { abbr: "FL", name: "Fashion & Luxury Brands", market: "EU / Japan / Korea / USA", desc: "Satin, jacquard, dobby, slub jersey, linen blend. Colour accuracy ΔE ≤1.5. Finish and hand-feel primary." },
  { abbr: "PC", name: "Promotional & Corporate", market: "Global", desc: "Pique, CVC, single jersey, poplin twill. Volume and lot-to-lot consistency across seasonal programmes." },
  { abbr: "IN", name: "Institutional & Uniforms", market: "Middle East / EU / South America", desc: "CVC / poly-cotton, FR-treated fabric, anti-static. Bulk pricing with colour consistency for repeat orders." },
];

const CERTIFICATIONS = [
  { name: "GOTS", full: "Global Organic Textile Standard", img: "/images/certs/cert-gots.webp", desc: "Organic fibre and process certification for natural textiles." },
  { name: "OEKO-TEX", full: "OEKO-TEX Standard 100", img: "/images/certs/cert-oeko-tex.webp", desc: "Harmful substance testing — safe for skin contact." },
  { name: "BSCI", full: "Business Social Compliance Initiative", img: "/images/certs/cert-bsci.webp", desc: "Supply chain social compliance audit standard." },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", img: "/images/certs/cert-sedex.webp", desc: "Ethical trading and supply chain transparency." },
  { name: "ISO 9001", full: "ISO 9001 Quality Management", img: "/images/certs/cert-iso-9001.webp", desc: "Quality management system certification." },
  { name: "GRS", full: "Global Recycled Standard", img: "/images/certs/cert-grs.webp", desc: "Recycled content verification and chain of custody." },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", img: "/images/certs/cert-wrap.webp", desc: "Independent factory certification for ethical production." },
  { name: "BCI", full: "Better Cotton Initiative", img: "/images/certs/cert-bci.webp", desc: "Sustainable cotton farming standards." },
];

const ROLL_SPECS = [
  { label: "50 m / roll", use: "Sampling & development runs", note: "≈ 5–25 kg/roll (GSM-dependent)" },
  { label: "100 m / roll", use: "Standard woven cut programmes", note: "≈ 10–50 kg/roll (GSM-dependent)" },
  { label: "150 m / roll", use: "Bulk shirting / woven fabric", note: "≈ 15–70 kg/roll (GSM-dependent)" },
  { label: "200 m / roll", use: "High-volume woven orders", note: "≈ 20–90 kg/roll (GSM-dependent)" },
  { label: "Per kg (knit)", use: "Knitted jersey / fleece sold by weight", note: "Standard for all knit constructions" },
  { label: "Tube or Open-Width", use: "Knit packing format — specify in RFQ", note: "Open-width standard for cutting efficiency" },
  { label: "Custom", use: "Non-standard lengths or core specs", note: "Confirm at RFQ stage" },
];

const EXPORT_TERMS = [
  { term: "FOB", desc: "FOB Karachi or Port Qasim — standard export term" },
  { term: "CIF", desc: "Cost, Insurance, Freight to destination port" },
  { term: "CFR", desc: "Cost and Freight, buyer arranges insurance" },
];

const SUSTAINABILITY_ITEMS = [
  { icon: "🌱", title: "Organic Cotton", tag: "GOTS", desc: "GOTS-certified organic cotton available across all major knit and woven constructions." },
  { icon: "♻️", title: "Recycled Fibres", tag: "GRS", desc: "GRS-certified recycled polyester for performance knits and fleece constructions." },
  { icon: "💧", title: "Water Efficiency", tag: "Process", desc: "Enzyme washing replaces stone washing — lower water and zero stone dust waste." },
  { icon: "🧪", title: "OEKO-TEX Chemicals", tag: "OEKO-TEX", desc: "Reactive dyeing with certified chemicals only. No azo dyes, no restricted substances." },
  { icon: "⚖️", title: "Ethical Audits", tag: "BSCI / Sedex", desc: "BSCI and Sedex audited mills with verified worker welfare and safety compliance." },
  { icon: "📦", title: "Eco Packaging", tag: "Optional", desc: "Recycled polybag roll wrapping and FSC-certified paper labels on request." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit Specification", short: "Specification", desc: "Share fabric construction, GSM, width, fibre blend, finishing, quantity, destination and target delivery via our RFQ form. The more complete your spec, the faster the mill match." },
  { num: "02", title: "Mill Matching & Pricing", short: "Shortlisting", desc: "We evaluate and shortlist 2–3 certified Pakistan mills whose construction specialisation, certifications and export capacity match your programme. Indicative pricing returned within 3–5 working days." },
  { num: "03", title: "Lab Sample", short: "Sampling", desc: "3–5 metre lab sample produced per construction. GSM test report, width confirmation and colour chip issued. Typical lab sample lead time: 10–15 working days from specification lock." },
  { num: "04", title: "Sample Approval", short: "Approval", desc: "Buyer reviews GSM accuracy, colour ΔE (target ≤1.5), finishing hand-feel and width. Lab dip adjustments if required. Repeat sample if critical spec changes." },
  { num: "05", title: "Bulk Production", short: "Production", desc: "Production commences on purchase order. Knit constructions (jersey, fleece, piqué): 20–30 working days. Woven constructions (twill, shirting, denim): 25–40 working days. GOTS organic programmes add 5–10 days for organic fibre sourcing. All timelines indicative and subject to mill scheduling." },
  { num: "06", title: "Pre-Shipment Inspection", short: "QC", desc: "GSM, width, colour and defect inspection per 4-point system (woven) or equivalent (knit). Inspection report issued. Roll packing in polythene-wrapped rolls on paper or plastic cores." },
  { num: "07", title: "Export & Freight", short: "Export", desc: "FOB from Karachi or Port Qasim. Sea freight transit: USA 22–28 days, UK 20–26 days, EU 18–24 days, UAE 7–12 days. Air freight available for urgent sample shipments." },
];

const FAQS = [
  {
    q: "What is the minimum quantity for ordering apparel fabric from Pakistan?",
    a: "Minimum quantities vary by fabric construction, GSM and colour programme — there is no single universal figure. Knitted fabric programmes (single jersey, French terry, fleece) typically have higher minimum roll quantities than woven shirting due to machine setup requirements. The most effective approach is to include your target quantity in your RFQ submission. We match you with mills whose capacity and production minimums align with your programme size and advise on the most cost-efficient structure. Buyers with smaller initial programmes are often accommodated through combined orders across similar constructions.",
  },
  {
    q: "What knit constructions are available in organic cotton?",
    a: "GOTS-certified organic cotton is available across all major knit constructions including single jersey, interlock, French terry and piqué. The key requirement is that the entire supply chain — from raw fibre to finished fabric — holds GOTS certification, which Pakistan's certified mills can provide. Organic cotton is ring-spun rather than open-end for better quality. GSM ranges are equivalent to conventional cotton. OEKO-TEX Standard 100 certified options (harmless substance test, not organic) are available more broadly across all constructions. Specify your certification requirement in your RFQ to ensure the correct mill is selected.",
  },
  {
    q: "How is GSM measured and what tolerance is acceptable?",
    a: "GSM (grams per square metre) is measured per ISO 3801 by weighing a standard circular sample cut from the fabric roll. Industry standard GSM tolerance is ±5% of the specified target — so a 200 GSM fabric would be accepted between 190 and 210 GSM. For performance programmes where weight directly affects functionality (moisture management, insulation, drape), tighter tolerance of ±3% can be specified in the technical pack. Pre-shipment test reports include GSM measurements from multiple points across the roll width and length to ensure consistency throughout the bulk.",
  },
  {
    q: "Can I order fabric in a custom GSM outside your standard range?",
    a: "Yes, custom GSM specifications are available within the structural capability of each construction. Single jersey can be produced from approximately 100 GSM up to 280 GSM by adjusting yarn count and loop structure. French terry ranges from 220 to 420 GSM depending on loop density. Woven constructions are adjusted through yarn count and weave density. Custom GSM specifications require a lab sample approval stage before bulk production to confirm the construction achieves the target weight consistently. Include your exact GSM target in your RFQ along with any hand-feel or performance requirements.",
  },
  {
    q: "What is the typical lead time for apparel fabric from Pakistan?",
    a: "Lead times vary by construction, finishing complexity and mill scheduling. As a reliable planning guide: lab samples (3–5m) take 10–15 working days from specification lock; knit bulk production (single jersey, fleece, piqué) takes 20–30 working days from purchase order; woven bulk production (shirting, twill, denim, canvas) takes 25–40 working days. GOTS organic programmes require 5–10 additional days for certified organic fibre sourcing. Custom finishes (FR, DWR, mercerized) add 5–7 days. Sea freight from Karachi: USA 22–28 days, UK 20–26 days, EU 18–24 days, UAE 7–12 days, Australia 18–22 days. Air freight for urgent samples typically 3–5 days to any major market. All figures are indicative only and subject to factory scheduling and material availability at time of order.",
  },
  {
    q: "Is microfiber fabric available from Pakistani mills?",
    a: "Yes. Pakistan is a verified exporter of microfiber fabric. Bari Textile Mills (Karachi), ACME Mills and Faisalabad-based export facilities produce microfiber in single jersey and interlock constructions for international sportswear brands. Pakistan's strong polyester yarn spinning base supports microfiber production at competitive price points. Standard constructions are 100% polyester microfiber (0.5–1 dpf) and 80/20 polyamide/polyester split-filament, GSM 80–160. Disperse dyeing delivers outstanding colour vibrancy, and the construction is fully sublimation print compatible for all-over print sportswear programmes. OEKO-TEX Standard 100 certification is available. Lead time for microfiber knit: 15–25 working days from specification approval.",
  },
  {
    q: "How are rolls inspected before shipment?",
    a: "Pre-shipment fabric inspection follows the 4-point system (per ASTM D5430) for woven fabric and A-grade equivalent visual inspection for knitted fabric. Inspection points include: GSM measurement at start, middle and end of rolls; width measurement at multiple points; colour consistency check against approved lab dip; shade sorting across roll batches to ensure garment-to-garment consistency; surface defect check (holes, broken ends, oil marks, knots) with acceptable defect point count per 100 linear metres. A pre-shipment inspection report is issued with every bulk shipment. Third-party inspection (SGS, Bureau Veritas, Intertek) can be arranged on buyer's account if required.",
  },
  {
    q: "Which certifications are available for apparel fabric from Pakistan?",
    a: "Pakistan's certified textile mills carry a range of third-party certifications relevant to apparel fabric export. OEKO-TEX Standard 100 is widely available across knit and woven constructions — certifies no harmful substances. GOTS (Global Organic Textile Standard) is available for organic cotton programmes from certified mills with organic fibre sourcing. GRS (Global Recycled Standard) is available for recycled polyester and recycled cotton constructions. BSCI, Sedex and ISO 9001 cover social compliance and quality management at the mill level. For EU buyers, REACH compliance documentation is available. Specify your certification requirements in your RFQ so we can match you with appropriately certified mills.",
  },
  {
    q: "What is the roll length and width tolerance?",
    a: "Standard roll lengths are 50m, 100m, 150m and 200m per roll, with custom lengths available on request. Roll length tolerance is typically ±2% — a 100m roll will be between 98m and 102m. Width tolerance for woven fabric is ±1.5 cm of the nominal width after finishing. Knitted fabric width tolerance is ±2 cm (knit fabric has slight dimensional variability due to construction). Fabric is measured and documented on the roll ticket attached to each roll. Width consistency is particularly important for automated cutting — specify tight tolerance in your technical pack if required for automated garment manufacturing.",
  },
  {
    q: "Can I order greige fabric for my own dyeing programme?",
    a: "Yes, greige (undyed) fabric is available for buyers who operate their own dyeing facilities or prefer to outsource dyeing locally. Greige fabric provides a consistent, clean base for reliable results in your dyeing programme. Important considerations: greige fabric should be scoured (cleaned) before dyeing to remove spinning oils and sizing agents — this can be specified in the greige finishing requirements. For knitted greige, specify whether the fabric should be in tube or open-width form, and the target scoured weight. Standard certifications (OEKO-TEX, GOTS for organic greige) remain available. Greige orders typically have shorter lead times than dyed programmes.",
  },
];

const PAGE_BOXES = [
  {
    title: "Home Textile Fabric",
    desc: "Terry, woven and knit fabric for towels, bedding and home textile manufacturers.",
    href: "/fabric/hometextilefabric/",
    image: "/images/menu/menu-hometextilefabric.webp",
    alt: "Pakistan home textile fabric supplier — terry and woven fabric for towel and bedding manufacturers",
    cta: "View Home Textile Fabric",
  },
  {
    title: "Knitted Garments",
    desc: "T-shirts, polo shirts, sweatshirts and more from Pakistan's certified knitwear factories.",
    href: "/apparel/knittedgarments/",
    image: "/images/menu/menu-tshirts.webp",
    alt: "Pakistan knitted garment manufacturer — OEM t-shirts, polo shirts and knitwear for brands worldwide",
    cta: "View Knitted Garments",
  },
  {
    title: "Woven Garments",
    desc: "Denim jeans, formal shirts, trousers and cargo pants. OEM woven garment sourcing.",
    href: "/apparel/wovengarments/",
    image: "/images/menu/menu-denimjeans.webp",
    alt: "Pakistan woven garment manufacturer — OEM denim jeans and formal shirts for brands in USA, UK and Europe",
    cta: "View Woven Garments",
  },
  {
    title: "Workwear Apparel",
    desc: "Canvas, ripstop and FR workwear. Safety compliance for industrial programmes.",
    href: "/apparel/workwearapparel/",
    image: "/images/menu/menu-workwear.webp",
    alt: "Pakistan workwear manufacturer — OEM industrial and safety workwear for brands worldwide",
    cta: "View Workwear",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function ApparelFabricContent() {
  const [activeKnit, setActiveKnit] = useState("single-jersey");
  const [activeWoven, setActiveWoven] = useState("plain-weave");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const ak = KNIT_CONSTRUCTIONS.find((c) => c.id === activeKnit) ?? KNIT_CONSTRUCTIONS[0];
  const aw = WOVEN_CONSTRUCTIONS.find((c) => c.id === activeWoven) ?? WOVEN_CONSTRUCTIONS[0];

  return (
    <div className="overflow-x-clip">
      {/* ════════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-fabric.webp"
            fill
            alt="Pakistan apparel fabric manufacturer — knitted and woven fabric rolls for garment manufacturers in USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/fabric/" className="hover:text-gold transition-colors">Fabric</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Apparel Fabric</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Textile Fabric Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Apparel Fabric
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
              MZ Global Trading sources knitted and woven apparel fabric from
              Pakistan&rsquo;s certified textile mills. Single jersey, French
              terry, fleece, piqué, denim, twill, canvas and more. 80&ndash;450
              GSM. GOTS, OEKO-TEX, BSCI certified. FOB / CIF export.
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
                Apparel Fabric Supply — Pakistan Textile Mills
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Apparel Fabric Sourcing You Can Build On
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s textile mill infrastructure produces knitted and woven fabric across the full GSM range for international garment manufacturers, sportswear brands and fashion labels. Consistent construction, certified quality and reliable export from Karachi to every major market.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "20+", label: "Fabric Structures" },
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

          {/* Row 1: 2 bentos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* Bento 1 — Knit Constructions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧶</span>
                <div>
                  <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Knitted</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Knit Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 flex-1">
                {KNIT_CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3 border border-indigo-100">
                    <p className="text-xs font-semibold text-navy-900 leading-tight">{c.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{c.gsm}</p>
                    {c.badge && (
                      <span className="mt-1 inline-block text-[9px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">
                        {c.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-knit" label="Explore Knit Constructions" />
            </motion.div>

            {/* Bento 2 — Woven Constructions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-violet-50 border border-violet-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🧵</span>
                <div>
                  <p className="text-violet-600 text-xs font-semibold tracking-[0.2em] uppercase">Woven</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Woven Fabric Constructions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 flex-1">
                {WOVEN_CONSTRUCTIONS.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-3 border border-violet-100">
                    <p className="text-xs font-semibold text-navy-900 leading-tight">{c.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{c.gsm}</p>
                    <p className="text-[10px] text-violet-600 mt-0.5 leading-tight line-clamp-1">{c.applications[0]}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-woven" label="Explore Woven Constructions" />
            </motion.div>
          </div>

          {/* Row 2: 4 bentos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            {/* Bento 3 — GSM Weight */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">⚖️</span>
              <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">GSM Weight Guide</h3>
              <div className="flex flex-col gap-2.5 flex-1">
                {GSM_TIERS.map((t) => (
                  <div key={t.range} className="bg-white rounded-xl p-2.5 border border-sky-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-navy-900">{t.range}</span>
                      {t.featured && (
                        <span className="text-[9px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">Popular</span>
                      )}
                    </div>
                    <div className="w-full h-1.5 bg-sky-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} aria-hidden="true" />
                    </div>
                    <p className="text-[9px] text-gray-400 mt-1 leading-snug">{t.label}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-weight" label="View Weight Guide" />
            </motion.div>

            {/* Bento 4 — Finishing */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">✨</span>
              <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Finishing</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Finishing Treatments</h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {FINISHING_OPTIONS.map((f) => (
                  <div key={f.code} className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 border border-purple-50">
                    <span className={`w-6 h-6 rounded text-[9px] font-bold flex items-center justify-center shrink-0 ${f.color}`}>
                      {f.code}
                    </span>
                    <p className="text-[10px] font-semibold text-navy-900 leading-tight">{f.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-finishing" label="Explore Treatments" />
            </motion.div>

            {/* Bento 5 — Colour Programs */}
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
              <div className="flex flex-col gap-2.5 flex-1">
                {DYE_METHODS.map((d) => (
                  <div key={d.name} className="bg-white rounded-xl p-2.5 border border-rose-50">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-sm" aria-hidden="true">{d.icon}</span>
                      <p className="text-[10px] font-semibold text-navy-900">{d.name}</p>
                    </div>
                    <div className="flex gap-1">
                      {d.swatches.map((s, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${s} border border-white`} aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-colour" label="Explore Colours" />
            </motion.div>

            {/* Bento 6 — OEM */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3 min-h-[280px]"
            >
              <span className="text-2xl" aria-hidden="true">🏗️</span>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Custom</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Custom Development</h3>
              <div className="flex flex-col gap-2 flex-1">
                {OEM_FEATURES.map((f) => (
                  <div key={f.num} className="flex items-start gap-2">
                    <span className="text-gold text-xs font-bold mt-0.5 shrink-0">{f.num}</span>
                    <p className="text-xs text-gray-600 leading-snug">{f.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Explore OEM" />
            </motion.div>
          </div>

          {/* Row 3: 5-col */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

            {/* Bento 7 — Markets */}
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
                {MARKET_SEGMENTS.map((s) => (
                  <div key={s.abbr} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-xs font-bold text-teal-600">{s.abbr}</p>
                    <p className="text-sm font-semibold text-navy-900 mt-0.5 leading-tight">{s.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{s.market}</p>
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
                  <div
                    key={c.name}
                    className="bg-white rounded-xl border border-green-100 flex items-center justify-center p-2"
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
              className="lg:col-span-1 bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[270px]"
            >
              <span className="text-2xl" aria-hidden="true">📦</span>
              <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">Export</p>
              <h3 className="text-base font-bold text-navy-900 leading-tight">Roll Specs &amp; Export</h3>
              <div className="flex flex-col gap-2 flex-1">
                {ROLL_SPECS.map((r) => (
                  <div key={r.label} className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 border border-orange-100">
                    <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{r.label}</p>
                      <p className="text-[10px] text-gray-400">{r.use}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {EXPORT_TERMS.map((e) => (
                    <span key={e.term} className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                      {e.term}
                    </span>
                  ))}
                </div>
              </div>
              <ExploreBtn sectionId="section-export" label="View Export Details" />
            </motion.div>
          </div>

          {/* Row 4: 3-col */}
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
                    <span className="text-[10px] font-semibold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full w-fit">
                      {s.tag}
                    </span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sustainability" label="View Sustainability" />
            </motion.div>

            {/* Bento 11 — Process */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-1 bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[240px]"
            >
              <span className="text-2xl" aria-hidden="true">🔄</span>
              <p className="text-fuchsia-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
              <h3 className="text-xl font-bold text-navy-900">Our Sourcing Process</h3>
              <div className="flex flex-col gap-2 flex-1">
                {PROCESS_STEPS.slice(0, 4).map((p) => (
                  <div key={p.num} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-fuchsia-200 text-fuchsia-700 text-[10px] font-bold flex items-center justify-center shrink-0">
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
            Fabric Guides &amp; Resources
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/knowledge/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Apparel Fabric Sourcing Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction selection, GSM guide and certification overview for international fabric buyers.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Explore Hub →</span>
            </Link>
            <Link href="/guides/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Guides</p>
              <p className="font-semibold text-navy-900">Pakistan Textile Fabric Export Guide</p>
              <p className="text-xs text-gray-500 leading-relaxed">Sourcing process, lead times, mill certification requirements and inspection standards.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">View Guides →</span>
            </Link>
            <Link href="/downloads/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Fabric Spec Sheets &amp; Swatch Cards</p>
              <p className="text-xs text-gray-500 leading-relaxed">Construction spec sheets, GSM reference cards and certification documentation.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Downloads →</span>
            </Link>
            <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Apparel Fabric?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Construction, GSM and width confirmed — submit your fabric specification for mill matching and quotation within 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — KNIT FABRIC CONSTRUCTIONS — TECHNICAL UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-knit" className="bg-[#080E1A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-12">
            <div className="w-px h-16 bg-gold/40 mt-1 hidden sm:block" aria-hidden="true" />
            <div>
              <p className="font-mono text-gold/70 text-xs tracking-[0.3em] uppercase mb-2">
                [TECHNICAL SPECIFICATION — KNIT CONSTRUCTIONS]
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Knit Fabric Constructions</h2>
              <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">
                Pakistan&rsquo;s certified knitwear mills produce the full range of knit constructions — single jersey to heavy fleece — for garment manufacturers, sportswear brands and fashion labels worldwide.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {KNIT_CONSTRUCTIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeKnit === c.id}
                onClick={() => setActiveKnit(c.id)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeKnit === c.id
                    ? "bg-gold text-navy-900 border-gold"
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-gold/40"
                }`}
              >
                {activeKnit !== c.id && (
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
              key={activeKnit}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <h3 className="text-2xl font-bold text-white">{ak.name}</h3>
                  {ak.badge && (
                    <span className="text-xs font-semibold text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
                      {ak.badge}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">GSM_RANGE</p>
                    <p className="text-lg font-bold text-gold">{ak.gsm}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">HAND_FEEL</p>
                    <p className="text-sm text-white">{ak.hand}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{ak.detail}</p>
                <div className="border border-white/10 rounded-xl p-4">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">TECHNICAL_SPEC</p>
                  <p className="text-sm text-gray-300">{ak.spec}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">BEST_FOR[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ak.best.map((b) => (
                      <span key={b} className="text-xs text-white bg-white/10 px-3 py-1 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">KEY_MARKETS[ ]</p>
                  <div className="flex flex-wrap gap-2">
                    {ak.markets.map((m) => (
                      <span key={m} className="text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">FINISHING[ ]</p>
                  <div className="flex flex-col gap-1.5">
                    {ak.finishing.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-300">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <p className="text-amber-400/80 text-xs mt-8 leading-relaxed">
            ⚠ Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
          </p>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — WOVEN FABRIC CONSTRUCTIONS — SPLIT-SCREEN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-woven" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Woven</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Woven Fabric Constructions</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed mb-12">
            From lightweight plain weave shirting to heavyweight canvas for workwear, Pakistan&rsquo;s woven mills produce the full spectrum of apparel fabric constructions for international garment programmes.
          </p>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
            {/* Detail panel — mobile: first so changes are immediately visible; desktop: right 2/3 */}
            <div className="lg:order-2 lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWoven}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
                >
                  <div className="flex items-center gap-3 flex-wrap mb-6">
                    <h3 className="text-2xl font-bold text-navy-900">{aw.name}</h3>
                    <span className="text-sm font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">{aw.gsm}</span>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-200 mb-5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Weave Structure</p>
                    <p className="text-sm text-navy-900 leading-relaxed">{aw.structure}</p>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{aw.detail}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Applications</p>
                      <div className="flex flex-col gap-1.5">
                        {aw.applications.map((a) => (
                          <div key={a} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-navy-900 shrink-0" aria-hidden="true" />
                            <span className="text-sm text-navy-900">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Key Markets</p>
                      <div className="flex flex-wrap gap-2">
                        {aw.markets.map((m) => (
                          <span key={m} className="text-xs font-semibold text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Type selector — mobile: below panel with internal scroll; desktop: left 1/3 with internal scroll */}
            <div className="lg:order-1 flex flex-col gap-2 max-h-[260px] lg:max-h-[520px] overflow-y-auto pr-1">
              {WOVEN_CONSTRUCTIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveWoven(c.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all text-sm font-semibold shrink-0 ${
                    activeWoven === c.id
                      ? "bg-navy-900 text-white border-navy-900"
                      : "bg-gray-50 text-navy-900 border-gray-200 hover:border-gold"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {c.name}
                    {activeWoven === c.id && <span className="text-gold text-xs" aria-hidden="true">→</span>}
                  </span>
                  <span className="text-xs font-normal mt-0.5 block opacity-60">{c.gsm}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="text-amber-600/80 text-xs mt-8 leading-relaxed">
            ⚠ Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
          </p>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — GSM & WEIGHT GUIDE — DASHBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-weight" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Specification</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">GSM &amp; Weight Guide</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed mb-12">
            Fabric weight directly determines garment application, seasonal positioning and price point. Pakistan&rsquo;s mills cover the full GSM range from lightweight shirting to heavyweight industrial canvas.
          </p>
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {GSM_TIERS.map((t, i) => (
              <motion.div
                key={t.range}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-navy-900">{t.range}</span>
                    {t.featured && (
                      <span className="ml-3 text-xs font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">Most Popular</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-400">{t.label}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className={`h-full rounded-full ${t.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${t.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm text-gray-600">{t.garments}</p>
                <p className="text-xs text-gray-400 mt-1">Typical width: {t.width}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-navy-900 mb-5">Standard Fabric Widths</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Width</th>
                    <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Metric</th>
                    <th className="text-left py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">Typical Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { w: "44\"", m: "112 cm", use: "Woven shirting, speciality fabric" },
                    { w: "58\"–60\"", m: "147–152 cm", use: "Knitted fabric, denim, twill, canvas — most common width" },
                    { w: "72\"", m: "183 cm", use: "Wide knit for tubular or open-width jersey programmes" },
                    { w: "90\"", m: "228 cm", use: "Extra-wide for cutting efficiency in high-volume programmes" },
                    { w: "Custom", m: "As specified", use: "Non-standard widths available on request" },
                  ].map((row) => (
                    <tr key={row.w}>
                      <td className="py-3 pr-4 font-semibold text-navy-900">{row.w}</td>
                      <td className="py-3 pr-4 text-gray-500">{row.m}</td>
                      <td className="py-3 text-gray-600">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — FINISHING TREATMENTS — MOODBOARD UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-finishing" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Treatments</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Finishing Treatments</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed mb-12">
            Finishing transforms base fabric into a market-ready product. Each treatment is applied post-dyeing to engineer specific performance, hand-feel or appearance characteristics for your programme.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FINISHING_OPTIONS.map((f, i) => (
              <motion.div
                key={f.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-xl text-sm font-bold flex items-center justify-center shrink-0 ${f.color}`}>
                    {f.code}
                  </span>
                  <h3 className="font-bold text-navy-900 text-base leading-tight">{f.name}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                <p className="text-xs text-gray-400 font-medium border-t border-gray-200 pt-2">Applies to: {f.applies}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — COLOUR & DYE PROGRAMS — GRADIENT UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-colour" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Colour</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Colour &amp; Dye Programs</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed mb-12">
            Colour accuracy is critical for brand programmes. Pakistan&rsquo;s certified mills support the full range of dye methods with PMS / Pantone TPX matching and ΔE ≤1.5 CIELAB tolerance.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {DYE_METHODS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{d.icon}</span>
                  <h3 className="font-bold text-navy-900 text-base">{d.name}</h3>
                </div>
                <div className="flex gap-1.5">
                  {d.swatches.map((s, j) => (
                    <div key={j} className={`w-5 h-5 rounded-full ${s} border border-white shadow-sm`} aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{d.desc}</p>
                <p className="text-xs text-gray-400 font-medium">Best for: {d.best}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-navy-900 text-lg mb-3">Colour Matching Standards</h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { std: "PMS / Pantone TPX", desc: "Industry-standard colour reference for fashion and apparel." },
                { std: "Lab Dip", desc: "Custom colour matching against buyer-supplied swatch. 2–3 working days for approval." },
                { std: "Tolerance ΔE ≤1.5", desc: "CIELAB colour difference tolerance. Tighter tolerance available on request." },
              ].map((item) => (
                <div key={item.std} className="flex flex-col gap-1.5">
                  <p className="text-sm font-bold text-navy-900">{item.std}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — CUSTOM FABRIC DEVELOPMENT — MODULAR UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-oem" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">OEM</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Custom Fabric Development</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed mb-12">
            Every fabric parameter — construction, GSM, width, blend, finish, colour — can be specified to your technical pack. Pakistan&rsquo;s mills work to buyer-supplied specifications for custom fabric programmes.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OEM_FEATURES.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-7 flex flex-col gap-3"
              >
                <span className="text-3xl font-bold text-gold/40">{f.num}</span>
                <h3 className="font-bold text-navy-900 text-base">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/rfq/"
              className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-800 transition-colors"
            >
              Submit Fabric Specification <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 7 — MARKET APPLICATIONS — CINEMATIC UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-markets" className="bg-[#080E1A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyers</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Market Applications</h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed mb-12">
            Apparel fabric from Pakistan&rsquo;s certified mills serves garment manufacturers, sportswear brands, fashion labels and workwear suppliers across all major export markets.
          </p>
          <div className="flex flex-col gap-4">
            {MARKET_SEGMENTS.map((s, i) => (
              <motion.div
                key={s.abbr}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold font-bold text-lg flex items-center justify-center shrink-0">
                  {s.abbr}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white text-lg">{s.name}</p>
                  <p className="text-gold text-xs font-semibold mt-0.5">{s.market}</p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS — GLASSMORPHISM
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-certs" className="bg-gradient-to-br from-navy-900 to-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Quality Certifications</h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed mb-12">
            Pakistan&rsquo;s certified textile mills carry internationally recognised certifications. Specify your requirement in your RFQ for precise mill matching.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div
                  className="bg-white rounded-xl flex items-center justify-center"
                  style={{ height: 64 }}
                >
                  <Image
                    src={c.img}
                    alt={`${c.name} — ${c.full}`}
                    width={96}
                    height={56}
                    className="object-contain w-full h-full p-2"
                  />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{c.name}</p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 9 — ROLL SPECS & EXPORT — DARK MODE UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-export" className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Packing &amp; Export</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Roll Specifications &amp; Export Packing</h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed mb-12">
            Fabric rolls are packed to international standards for sea freight from Karachi or Port Qasim to all major global destinations.
          </p>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Roll specs */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Roll Specifications</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Roll Length Options</p>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLL_SPECS.map((r) => (
                      <div key={r.label} className="flex items-center gap-2.5 bg-white/5 rounded-xl px-3 py-2.5 border border-white/5">
                        <span className="w-2 h-2 rounded-full bg-gold shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-xs font-semibold text-white">{r.label}</p>
                          <p className="text-[10px] text-gray-500">{r.use}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Roll Core Options</p>
                  <div className="flex flex-col gap-1.5">
                    {["Paper tube core", "Plastic tube core", "No core / Bulk roll", "To be confirmed"].map((opt) => (
                      <div key={opt} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" aria-hidden="true" />
                        <span className="text-sm text-gray-300">{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Unit of Measure</p>
                  <div className="flex gap-2">
                    {["Meters", "Kg", "Rolls"].map((uom) => (
                      <span key={uom} className="text-xs font-semibold text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{uom}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Export terms */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Export Terms &amp; Transit Times</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Incoterms</p>
                  <div className="flex flex-col gap-2">
                    {EXPORT_TERMS.map((e) => (
                      <div key={e.term} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                        <span className="w-12 h-8 rounded-lg bg-gold/20 text-gold text-xs font-bold flex items-center justify-center shrink-0">
                          {e.term}
                        </span>
                        <p className="text-sm text-gray-300">{e.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Sea Freight Transit (from Karachi)</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { dest: "USA (East Coast)", days: "22–28 days" },
                      { dest: "UK", days: "20–26 days" },
                      { dest: "EU (North Sea ports)", days: "18–24 days" },
                      { dest: "Australia", days: "18–22 days" },
                      { dest: "Middle East", days: "5–10 days" },
                    ].map((r) => (
                      <div key={r.dest} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <span className="text-sm text-gray-300">{r.dest}</span>
                        <span className="text-sm font-semibold text-gold">{r.days}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-gray-500">FCL and LCL available. Air freight for urgent sample consignments.</p>
              </div>
            </div>
          </div>
          <p className="text-amber-400/80 text-xs mt-8 leading-relaxed">
            ⚠ Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
          </p>
          <BackToTop dark />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — SUSTAINABLE SOURCING — FLAT DESIGN UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sustainability</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Sustainable Fabric Sourcing</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed mb-12">
            Sustainable sourcing options are available across knit and woven fabric programmes. Each initiative is backed by independent certification — not internal claims.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUSTAINABILITY_ITEMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex flex-col gap-3"
              >
                <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                <h3 className="font-bold text-navy-900 text-base">{s.title}</h3>
                <span className="text-xs font-semibold text-lime-700 bg-lime-100 px-2.5 py-0.5 rounded-full w-fit">{s.tag}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — SOURCING PROCESS — CARD-BASED UI
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="section-process" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Sourcing Process</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed mb-12">
            From fabric specification to roll delivery — a clear six-stage process designed for international buyers sourcing fabric from Pakistan.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-100 flex flex-col gap-3 relative overflow-hidden"
              >
                <span className="absolute top-4 right-4 text-5xl font-bold text-gray-100 select-none" aria-hidden="true">
                  {p.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-navy-900 text-white text-sm font-bold flex items-center justify-center shrink-0 relative z-10">
                  {p.num}
                </div>
                <h3 className="font-bold text-navy-900 text-base relative z-10">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed relative z-10">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-amber-600/80 text-xs mt-8 leading-relaxed">
            ⚠ Lead times are indicative only and subject to factory scheduling, material availability and order complexity.
          </p>
          <BackToTop />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Apparel Fabric FAQ</h2>
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

      {/* PAGE BOXES */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Explore Related Products</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Related Fabric &amp; Apparel</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              Ready to Source Apparel Fabric<br />from Pakistan?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Knitted and woven apparel fabric from Pakistan&rsquo;s certified mills. Single jersey to heavy canvas, 80&ndash;450 GSM. GOTS, OEKO-TEX, GRS certified options. Submit your specification &mdash; mill match and quotation within 3&ndash;5 working days.
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
