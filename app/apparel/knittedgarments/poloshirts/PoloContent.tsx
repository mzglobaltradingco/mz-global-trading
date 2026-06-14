import Image from "next/image";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────

const CONSTRUCTIONS = [
  {
    name: "Classic Piqué",
    sub: "Standard / Lacoste Stitch",
    gsm: "180–240",
    hand: "Structured, textured face — the classic polo look",
    best: ["Corporate Uniforms", "Golf", "Retail"],
    dec: "Embroidery — left chest or back",
    badge: "~60% of orders",
    note: "Industry default. Holds collar shape through 50+ commercial wash cycles.",
  },
  {
    name: "Mini Piqué",
    sub: "Fine Gauge / Luxury Stitch",
    gsm: "170–210",
    hand: "Finer texture, sharper edge and drape",
    best: ["Premium Corporate", "Hospitality", "Fashion Retail"],
    dec: "Embroidery, woven badge or crest",
    badge: "",
    note: "Finer stitch produces a crisper garment edge — preferred for boardroom and hotel staff uniforms.",
  },
  {
    name: "Single Jersey",
    sub: "Soft Knit / Casual Construction",
    gsm: "160–200",
    hand: "Smooth, soft — T-shirt-like hand feel",
    best: ["Fashion Brands", "Casual Retail", "Promotional"],
    dec: "Embroidery, screen print, DTG",
    badge: "",
    note: "Lower construction cost and wider decoration compatibility — suits fashion-first and promotional buyers.",
  },
  {
    name: "Performance",
    sub: "Moisture-Wicking / Technical",
    gsm: "140–180",
    hand: "Lightweight, quick-dry surface",
    best: ["Sports Brands", "Golf", "Outdoor"],
    dec: "Sublimation print, embroidery",
    badge: "",
    note: "Poly or poly-cotton with mechanical moisture management. UPF-rated options available.",
  },
];

const BUYER_TABLE = [
  {
    type: "Corporate Procurement",
    range: "500–10,000 pcs",
    priority: "Logo consistency, wash durability (50+ cycles), colourway accuracy across departments",
    spec: "220 GSM piqué · left-chest embroidery · 3+ colourways",
  },
  {
    type: "Hospitality Groups",
    range: "200–5,000 pcs",
    priority: "Staff comfort, industrial laundry resistance, consistent fit across all departments",
    spec: "200 GSM piqué · anti-shrink finish · solid colours",
  },
  {
    type: "Sports & Golf Brands",
    range: "300–8,000 pcs",
    priority: "Moisture management, stretch option, UPF rating, branded performance story",
    spec: "160–180 GSM performance · sublimation or embroidery · technical fit",
  },
  {
    type: "Promotional Agencies",
    range: "100–3,000 pcs",
    priority: "Unit cost, fast turnaround, minimum decoration setup, basic colourway choice",
    spec: "180 GSM piqué · screen print or left-chest embroidery",
  },
];

const CUSTOM_COLS = [
  {
    heading: "Logo & Branding",
    items: [
      "Left chest embroidery — 7–9 cm logo (standard placement)",
      "Right chest secondary brand",
      "Back centre large-format print",
      "Sleeve tab or embroidered crest",
      "Woven badge / woven label option",
      "Branded neck tape inside collar",
    ],
  },
  {
    heading: "Collar & Placket",
    items: [
      "Single-tip collar (classic corporate)",
      "Double-tip contrast tipping stripe",
      "2-button or 3-button placket",
      "Tape-reinforced inner neck seam",
      "Knit-rib collar variant — sport style",
      "Self-fabric or contrast-colour placket",
    ],
  },
  {
    heading: "Finishing Options",
    items: [
      "Anti-shrink / compacted finish",
      "Silicone soft-hand treatment",
      "Moisture-wicking chemical treatment",
      "Anti-pilling treatment",
      "Enzyme wash — sport or casual effect",
      "Care label print at inner neck",
    ],
  },
];

const CERT_BADGES = [
  {
    img: "/images/certs/cert-oeko-tex.webp",
    name: "OEKO-TEX Standard 100",
    note: "Harmful substance testing — USA, EU and UK buyer standard",
  },
  {
    img: "/images/certs/cert-gots.webp",
    name: "GOTS",
    note: "Global Organic Textile Standard — organic cotton supply chain",
  },
  {
    img: "/images/certs/cert-bsci.webp",
    name: "BSCI",
    note: "Factory social compliance audit — European retail requirement",
  },
  {
    img: "/images/certs/cert-iso-9001.webp",
    name: "ISO 9001",
    note: "Quality management system — consistent factory standards",
  },
  {
    img: "/images/certs/cert-bci.webp",
    name: "BCI",
    note: "Better Cotton Initiative — responsible cotton sourcing",
  },
  {
    img: "/images/certs/cert-wrap.webp",
    name: "WRAP",
    note: "Worldwide Responsible Accredited Production",
  },
];

const BRIEF_ITEMS = [
  { n: "01", label: "Construction & GSM", eg: "e.g. 200 GSM piqué, cotton-polyester blend" },
  { n: "02", label: "Colourways", eg: "e.g. Navy, White — Pantone references preferred" },
  { n: "03", label: "Size Range & Ratio", eg: "e.g. XS–3XL, size ratio per colourway" },
  { n: "04", label: "Total Quantity", eg: "Pieces per SKU and total across all SKUs" },
  { n: "05", label: "Logo File", eg: "Vector .AI or .EPS — required for embroidery digitising" },
  { n: "06", label: "Delivery Date", eg: "Required date ex-factory or at destination port" },
  { n: "07", label: "Port & Incoterm", eg: "e.g. FOB Karachi · CIF Los Angeles · DDP Hamburg" },
  { n: "08", label: "Certifications", eg: "e.g. OEKO-TEX, GOTS, BSCI — if required by buyer" },
];

const RELATED = [
  {
    title: "Henley Shirts",
    tag: "Knitted Garments",
    href: "/apparel/knittedgarments/henleyshirts/",
    image: "/images/menu/menu-henleyshirts.webp",
    alt: "Henley shirt manufacturer Pakistan — OEM cotton henley shirts wholesale for brands in USA and UK",
  },
  {
    title: "Formal & Casual Shirts",
    tag: "Woven Garments",
    href: "/apparel/wovengarments/formalcasualshirts/",
    image: "/images/menu/menu-formalshirts.webp",
    alt: "Formal shirt manufacturer Pakistan — woven poplin and twill shirts OEM wholesale for buyers in USA and Europe",
  },
  {
    title: "Sweatshirts & Hoodies",
    tag: "Knitted Garments",
    href: "/apparel/knittedgarments/sweatshirtshoodies/",
    image: "/images/menu/menu-sweatshirtshoodies.webp",
    alt: "Sweatshirt manufacturer Pakistan — OEM hoodies and crewneck sweatshirts wholesale for brands in USA and UK",
  },
  {
    title: "Workwear Apparel",
    tag: "Workwear",
    href: "/apparel/workwearapparel/",
    image: "/images/menu/menu-workwear.webp",
    alt: "Workwear manufacturer Pakistan — OEM hi-vis and industrial workwear polo shirts wholesale",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PoloContent() {
  return (
    <>
      {/* ── Hero — Hard Split ─────────────────────────────────────────────── */}
      <section className="relative min-h-[600px] lg:min-h-[640px] flex flex-col lg:flex-row">
        {/* Mobile / tablet: image as background with solid overlay */}
        <div className="absolute inset-0 lg:hidden" aria-hidden="true">
          <Image
            src="/images/hero/hero-apparel.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-navy-950/93" />
        </div>

        {/* Left panel — all text, solid on desktop */}
        <div className="relative z-10 lg:w-[55%] lg:bg-navy-950 flex items-center py-20 lg:py-24 px-6 sm:px-10 lg:px-12 xl:px-20">
          <div className="max-w-xl w-full">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-gray-500 text-xs mb-5">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">/</span>
              <Link href="/apparel/knittedgarments/" className="hover:text-gold transition-colors">Knitted Garments</Link>
              <span aria-hidden="true">/</span>
              <span className="text-gold">Polo Shirts</span>
            </nav>

            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Knitted Garments</p>

            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Polo Shirt Manufacturer<br />
              <span className="text-gray-400 font-normal text-3xl sm:text-4xl">Pakistan — OEM &amp; Corporate</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Piqué and performance polo shirts made in Pakistan&apos;s certified factories — for corporate uniform programmes, hospitality groups and sports brands in the USA, UK and Europe.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-6 py-3 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors"
              >
                Request a Quote
              </Link>
              <a
                href="#construction"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/25 text-white text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                View Constructions
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {["140–240 GSM", "4 Constructions", "OEKO-TEX · GOTS · BSCI", "FOB / CIF"].map((t) => (
                <span key={t} className="px-3 py-1 border border-white/15 text-gray-400 text-[11px] font-medium rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — image, desktop only, zero text on it */}
        <div className="hidden lg:block lg:w-[45%] relative">
          <Image
            src="/images/hero/hero-apparel.webp"
            alt="Pakistan polo shirt manufacturer — OEM piqué and performance polo shirts for corporate buyers and sports brands in USA, UK and Europe"
            fill
            className="object-cover"
            sizes="45vw"
            priority
          />
        </div>
      </section>

      {/* ── Buyer Profiles ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Who Orders From Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Four Buyer Profiles</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-2xl">
              Corporate buyers, hotels, sports brands and promotional agencies all order polo shirts — but each profile has different priorities. We&apos;ve structured our sourcing programme around all four.
            </p>
          </div>

          {/* Desktop: reference table */}
          <div className="hidden sm:block rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-[1fr_160px_1fr_1fr] bg-gray-50 border-b border-gray-100 px-6 py-3 gap-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Buyer Type</p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Typical Order</p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">What They Prioritise</p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Standard Spec</p>
            </div>
            {BUYER_TABLE.map((row, i) => (
              <div
                key={row.type}
                className={`grid grid-cols-[1fr_160px_1fr_1fr] px-6 py-5 gap-6 border-b border-gray-50 last:border-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <p className="font-bold text-navy-900 text-sm">{row.type}</p>
                <p className="text-gold font-bold text-sm">{row.range}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{row.priority}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{row.spec}</p>
              </div>
            ))}
          </div>

          {/* Mobile: stacked cards */}
          <div className="sm:hidden space-y-4">
            {BUYER_TABLE.map((row) => (
              <div key={row.type} className="border border-gray-100 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="font-bold text-navy-900 text-sm">{row.type}</p>
                  <span className="text-gold font-bold text-xs whitespace-nowrap flex-shrink-0">{row.range}</span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-2">{row.priority}</p>
                <p className="text-gray-400 text-[11px] leading-relaxed border-t border-gray-50 pt-2 mt-2">{row.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Construction Tiers ────────────────────────────────────────────── */}
      <section id="construction" className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-10 mb-12">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Fabric Construction</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Four Polo Constructions</h2>
              <p className="text-gray-400 text-sm mt-3 max-w-xl">
                Most corporate buyers specify classic piqué. The right construction depends on your end use, budget and decoration method. All four available from a single factory network.
              </p>
            </div>
            {/* Decorative polo image — desktop accent */}
            <div className="hidden sm:block flex-shrink-0 w-24 h-28 relative rounded-xl overflow-hidden mt-1">
              <Image
                src="/images/menu/menu-poloshirts.webp"
                alt="OEM polo shirt Pakistan — piqué construction"
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONSTRUCTIONS.map((c) => (
              <div
                key={c.name}
                className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:border-gold/35 hover:bg-white/8 transition-all duration-200 flex flex-col"
              >
                {c.badge ? (
                  <span className="self-start mb-3 px-2.5 py-1 bg-gold text-navy-900 text-[9px] font-bold rounded-full uppercase tracking-wide">
                    {c.badge}
                  </span>
                ) : (
                  <div className="mb-3 h-[26px]" />
                )}

                <h3 className="text-white font-bold text-lg leading-tight mb-0.5">{c.name}</h3>
                <p className="text-gray-500 text-[11px] mb-5">{c.sub}</p>

                <div className="mb-4">
                  <span className="text-4xl font-black text-white tabular-nums">{c.gsm}</span>
                  <span className="text-gray-500 text-xs ml-1.5">GSM</span>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed mb-5">{c.hand}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {c.best.map((b) => (
                    <span key={b} className="px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold text-[10px] font-medium rounded">
                      {b}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <p className="text-[10px] text-gray-600 uppercase tracking-wide mb-1">Decoration</p>
                  <p className="text-gray-300 text-xs">{c.dec}</p>
                </div>

                <p className="mt-4 text-gray-500 text-[11px] leading-relaxed italic">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customisation ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Customisation</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Your Brand, Built In</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-2xl">
              Every element — logo placement, collar construction, finishing treatment — is agreed and confirmed at pre-production sample stage. No surprises in the bulk order.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16">
            {CUSTOM_COLS.map((col) => (
              <div key={col.heading}>
                <div className="w-8 h-px bg-gold mb-5" />
                <h3 className="text-navy-900 font-bold text-base mb-6">{col.heading}</h3>
                <ul className="space-y-3.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                      <span className="text-gray-600 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications — Split (cert badges left, image right) ────────── */}
      <section className="py-16 sm:py-20 bg-navy-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-16 lg:items-start">

            {/* Left: cert content */}
            <div className="lg:flex-1 min-w-0">
              <div className="mb-10">
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Quality &amp; Compliance</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Certifications We Hold</h2>
                <p className="text-gray-400 text-sm mt-3 max-w-lg">
                  Our manufacturing partners hold the certifications most commonly required by corporate buyers and retailers in the USA, UK and Europe.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CERT_BADGES.map((cert) => (
                  <div
                    key={cert.name}
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
                  </div>
                ))}
              </div>
            </div>

            {/* Right: decorative image — desktop only, zero text on it */}
            <div className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
              <div className="relative h-[420px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/menu/menu-certifications.webp"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="288px"
                  aria-hidden="true"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── RFQ Brief ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Getting Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Eight Things to Have Ready</h2>
            <p className="text-gray-500 text-sm mt-3">
              Assemble these before filling in your RFQ brief. With all eight details confirmed, we return a formal quotation within 48 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {BRIEF_ITEMS.map((item) => (
              <div
                key={item.n}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gold/40 hover:shadow-sm transition-all duration-200"
              >
                <p className="text-gold text-2xl font-black leading-none mb-3">{item.n}</p>
                <p className="text-navy-900 font-semibold text-sm mb-1.5">{item.label}</p>
                <p className="text-gray-400 text-[11px] leading-snug">{item.eg}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/rfq/"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-base rounded hover:bg-yellow-400 transition-colors"
            >
              Submit Your Polo Shirt Brief
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related Products ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">More from Apparel</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Also Available</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATED.map((r) => (
              <Link
                key={r.title}
                href={r.href}
                className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 hover:border-gold/40 transition-colors duration-200"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="bg-navy-900 px-4 py-3 flex-shrink-0">
                  <p className="text-white font-semibold text-sm leading-snug">{r.title}</p>
                  <p className="text-gold text-xs mt-1">{r.tag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
