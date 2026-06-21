"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import SearchWidget from "./SearchWidget";

// Desktop panel — dynamically imported so Framer Motion only loads on desktop
const MegaMenuPanel = dynamic(() => import("./MegaMenuPanel"), { ssr: false, loading: () => null });

// ─── Types ────────────────────────────────────────────────────────────────────

type SubItem = { label: string; href: string; img: string; imgAlt: string };

type CategoryRow = {
  heading: string;
  href?: string;
  img: string;
  imgAlt: string;
  items?: SubItem[];
};

type PanelContent = {
  heading: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
};

type NavItem = {
  id: string;
  label: string;
  href?: string;
  mega?: {
    panel: PanelContent;
    defaultImg: string;
    rows: CategoryRow[];
  };
};

// ─── Nav Data ─────────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },

  {
    id: "corporate",
    label: "Corporate",
    mega: {
      panel: {
        heading: "Building Trust, Delivering Excellence",
        bullets: [
          "Global B2B textile sourcing",
          "Transparent, ethical supply chain",
          "Certified manufacturing partners",
          "Dedicated account management",
        ],
        ctaLabel: "About MZ Global",
        ctaHref: "/our-company/",
      },
      defaultImg: "/images/menu/menu-aboutus.webp",
      rows: [
        {
          heading: "Company",
          img: "/images/menu/menu-aboutus.webp",
          imgAlt: "MZ Global Trading company — B2B textile sourcing partner for international buyers",
          items: [
            { label: "About Us",       href: "/our-company/",   img: "/images/menu/menu-aboutus.webp",       imgAlt: "MZ Global Trading — Pakistan B2B textile sourcing company for brands in USA, UK and Europe" },
            { label: "Why Choose Us",  href: "/whychooseus/",   img: "/images/menu/menu-whychooseus.webp",   imgAlt: "Why source with MZ Global Trading — certified factories, QC and on-time delivery guarantee" },
            { label: "Our Process",    href: "/ourprocess/",    img: "/images/menu/menu-ourprocess.webp",    imgAlt: "MZ Global Trading sourcing process — factory selection, sampling, QC and shipment" },
            { label: "Careers",        href: "/careers/",       img: "/images/menu/menu-careers.webp",       imgAlt: "Careers at MZ Global Trading — join Pakistan's trusted B2B textile sourcing team" },
          ],
        },
        {
          heading: "Resources",
          img: "/images/menu/menu-calculator.webp",
          imgAlt: "Textile sourcing resources and tools from MZ Global Trading",
          items: [
            { label: "Textile Tools Calculator", href: "/textile-tools-calculator/", img: "/images/menu/menu-calculator.webp",   imgAlt: "Textile tools calculator — GSM, yardage and production cost estimator for buyers" },
            { label: "Knowledge Hub", href: "/knowledge/",   img: "/images/menu/menu-blog.webp",          imgAlt: "Textile sourcing insights and trade guides by MZ Global Trading — knowledge hub for international buyers" },
            { label: "FAQs",       href: "/faqs/",       img: "/images/menu/menu-faqs.webp",       imgAlt: "Frequently asked questions about textile sourcing from Pakistan — MZ Global Trading" },
            { label: "Downloads",  href: "/downloads/",  img: "/images/menu/menu-downloads.webp",  imgAlt: "Textile sourcing downloads — specifications, certificates and guides from MZ Global Trading" },
            { label: "Guides",     href: "/guides/",     img: "/images/menu/menu-guides.webp",     imgAlt: "Textile sourcing guides — how to source apparel and home textiles from Pakistan" },
          ],
        },
        {
          heading: "Legal",
          img: "/images/menu/menu-privacypolicy.webp",
          imgAlt: "MZ Global Trading legal policies — privacy and terms of use",
          items: [
            { label: "Privacy Policy", href: "/privacypolicy/", img: "/images/menu/menu-privacypolicy.webp", imgAlt: "MZ Global Trading privacy policy — data protection for international buyers" },
            { label: "Terms of Use",   href: "/termsofuse/",    img: "/images/menu/menu-termsofuse.webp",    imgAlt: "MZ Global Trading terms of use and service agreement for international buyers" },
          ],
        },
      ],
    },
  },

  {
    id: "apparel",
    label: "Apparel",
    mega: {
      panel: {
        heading: "Premium Apparel Manufacturing",
        bullets: [
          "Custom OEM development & sampling",
          "Knitted & woven garment specialists",
          "Baby, kids & workwear ranges",
          "Full sampling & quality control",
        ],
        ctaLabel: "Explore Apparel",
        ctaHref: "/apparel/",
      },
      defaultImg: "/images/menu/menu-tshirts.webp",
      rows: [
        {
          heading: "Knitted Garments",
          href: "/apparel/knittedgarments/",
          img: "/images/menu/menu-tshirts.webp",
          imgAlt: "Pakistan knitted garment manufacturers — T-shirts, hoodies and activewear wholesale",
          items: [
            { label: "T-Shirts",               href: "/apparel/knittedgarments/tshirts/",           img: "/images/menu/menu-tshirts.webp",             imgAlt: "Pakistan custom T-shirt manufacturer — wholesale cotton tees for brands in USA, UK and Europe" },
            { label: "Polo Shirts",            href: "/apparel/knittedgarments/poloshirts/",         img: "/images/menu/menu-poloshirts.webp",           imgAlt: "Pakistan polo shirt manufacturer — custom OEM cotton polos for wholesale buyers in USA" },
            { label: "Henley Shirts",          href: "/apparel/knittedgarments/henleyshirts/",       img: "/images/menu/menu-henleyshirts.webp",         imgAlt: "Pakistan henley shirt manufacturer — wholesale knitted henleys for brands in USA and UK" },
            { label: "Sweatshirts & Hoodies",  href: "/apparel/knittedgarments/sweatshirtshoodies/", img: "/images/menu/menu-sweatshirtshoodies.webp",   imgAlt: "Pakistan sweatshirt manufacturer — custom hoodies and crewnecks for wholesale buyers" },
            { label: "Sweatpants & Joggers",   href: "/apparel/knittedgarments/sweatpantsjoggers/",  img: "/images/menu/menu-sweatpantsjoggers.webp",    imgAlt: "Pakistan jogger manufacturer — custom knitted sweatpants and joggers wholesale" },
            { label: "Tank Tops",              href: "/apparel/knittedgarments/tanktops/",           img: "/images/menu/menu-tanktops.webp",             imgAlt: "Pakistan tank top manufacturer — custom singlets and vests for wholesale export" },
          ],
        },
        {
          heading: "Woven Garments",
          href: "/apparel/wovengarments/",
          img: "/images/menu/menu-denimjeans.webp",
          imgAlt: "Pakistan woven garment manufacturers — denim jeans, shirts and trousers wholesale",
          items: [
            { label: "Denim Jeans",             href: "/apparel/wovengarments/denimjeans/",          img: "/images/menu/menu-denimjeans.webp",           imgAlt: "Pakistan denim jeans manufacturer — custom OEM denim wholesale for buyers in USA and Europe" },
            { label: "Formal & Casual Shirts",  href: "/apparel/wovengarments/formalcasualshirts/",  img: "/images/menu/menu-formalshirts.webp",         imgAlt: "Pakistan shirt manufacturer — custom formal and casual woven shirts wholesale" },
            { label: "Pants & Trousers",        href: "/apparel/wovengarments/pantsandtrousers/",    img: "/images/menu/menu-pantsandtrousers.webp",     imgAlt: "Pakistan trousers manufacturer — custom woven pants and bottoms for wholesale export" },
            { label: "Cargo Pants",             href: "/apparel/wovengarments/cargopants/",          img: "/images/menu/menu-cargopants.webp",           imgAlt: "Pakistan cargo pants manufacturer — custom utility and tactical pants wholesale" },
            { label: "Shorts",                  href: "/apparel/wovengarments/shorts/",              img: "/images/menu/menu-shorts.webp",               imgAlt: "Pakistan shorts manufacturer — custom woven and knitted shorts for wholesale export" },
          ],
        },
        {
          heading: "Baby & Kids",
          href: "/apparel/babyandkids/",
          img: "/images/menu/menu-babyandkids.webp",
          imgAlt: "Pakistan baby and kids apparel manufacturers — children's garments wholesale export",
          items: [
            { label: "T-Shirts for Kids",     href: "/apparel/babyandkids/tshirtsforkids/",      img: "/images/menu/menu-tshirtsforkids.webp",      imgAlt: "Pakistan kids T-shirt manufacturer — custom children's tees for wholesale export" },
            { label: "Swaddle Muslin Fabric", href: "/apparel/babyandkids/swaddlemuslinfabric/", img: "/images/menu/menu-swaddlemuslinfabric.webp", imgAlt: "Pakistan muslin fabric manufacturer — organic cotton swaddle blankets wholesale" },
            { label: "Overalls",              href: "/apparel/babyandkids/overalls/",            img: "/images/menu/menu-overalls.webp",            imgAlt: "Pakistan baby overalls manufacturer — custom infant and toddler coveralls wholesale" },
            { label: "Baby Rompers",          href: "/apparel/babyandkids/babyrompers/",         img: "/images/menu/menu-babyrompers.webp",         imgAlt: "Pakistan baby romper manufacturer — custom infant one-piece bodysuits wholesale" },
            { label: "Baby Bibs",             href: "/apparel/babyandkids/babybibs/",            img: "/images/menu/menu-babybibs.webp",            imgAlt: "Pakistan baby bib manufacturer — custom drool bibs and bandana bibs wholesale" },
            { label: "Baby Hooded Towels",    href: "/apparel/babyandkids/babyhoodedtowels/",    img: "/images/menu/menu-babyhoodedtowels.webp",    imgAlt: "Pakistan baby hooded towel manufacturer — soft infant bath towels wholesale" },
          ],
        },
        {
          heading: "Workwear Apparel",
          href: "/apparel/workwearapparel/",
          img: "/images/menu/menu-workwear.webp",
          imgAlt: "Pakistan workwear manufacturer — custom uniforms and safety apparel wholesale",
        },
        {
          heading: "Socks",
          href: "/apparel/socks/",
          img: "/images/menu/menu-socks.webp",
          imgAlt: "Pakistan socks manufacturer — custom cotton and knitted socks wholesale export",
        },
      ],
    },
  },

  {
    id: "home-textiles",
    label: "Home Textiles",
    mega: {
      panel: {
        heading: "Complete Home Textile Solutions",
        bullets: [
          "Bath, bed & kitchen linen",
          "Hospital & industrial linen",
          "Thermal & specialty blankets",
          "Custom branding & packaging",
        ],
        ctaLabel: "Explore Home Textiles",
        ctaHref: "/hometextile/",
      },
      defaultImg: "/images/menu/menu-towels.webp",
      rows: [
        {
          heading: "Bath Linen",
          href: "/hometextile/bathlinen/",
          img: "/images/menu/menu-towels.webp",
          imgAlt: "Pakistan bath linen manufacturer — towels, bathrobes and bath mats wholesale export",
          items: [
            { label: "Towels",               href: "/hometextile/bathlinen/towels/",              img: "/images/menu/menu-towels.webp",                  imgAlt: "Pakistan terry towel manufacturer — wholesale cotton bath towels for USA, UK and Europe" },
            { label: "Institutional Towels", href: "/hometextile/bathlinen/institutionaltowels/", img: "/images/menu/menu-institutionaltowels.webp",     imgAlt: "Pakistan institutional towel manufacturer — hotel and hospital towels wholesale export" },
            { label: "Bathrobes",            href: "/hometextile/bathlinen/bathrobes/",           img: "/images/menu/menu-bathrobes.webp",               imgAlt: "Pakistan bathrobe manufacturer — custom terry and waffle bathrobes wholesale export" },
            { label: "Bath Mats",            href: "/hometextile/bathlinen/bathmats/",            img: "/images/menu/menu-bathmats.webp",                imgAlt: "Pakistan bath mat manufacturer — custom tufted bath and shower mats wholesale" },
            { label: "Beach & Pool Towels",  href: "/hometextile/bathlinen/beachpooltowel/",      img: "/images/menu/menu-beachpooltowels.webp",         imgAlt: "Pakistan beach towel manufacturer — custom velour and terry pool towels wholesale" },
          ],
        },
        {
          heading: "Bed Linen",
          href: "/hometextile/bedlinen/",
          img: "/images/menu/menu-bedsheets.webp",
          imgAlt: "Pakistan bed linen manufacturer — bedsheets, duvet covers and pillowcases wholesale",
          items: [
            { label: "Bedsheets",             href: "/hometextile/bedlinen/bedsheets/",           img: "/images/menu/menu-bedsheets.webp",            imgAlt: "Pakistan bedsheet manufacturer — custom cotton percale and sateen sheets wholesale" },
            { label: "Fitted Sheets",         href: "/hometextile/bedlinen/fittedsheets/",        img: "/images/menu/menu-fittedsheets.webp",         imgAlt: "Pakistan fitted sheet manufacturer — custom elastic bedding sets for wholesale buyers" },
            { label: "Duvet Covers",          href: "/hometextile/bedlinen/duvetcovers/",         img: "/images/menu/menu-duvetcovers.webp",          imgAlt: "Pakistan duvet cover manufacturer — custom comforter covers for wholesale in Europe" },
            { label: "Pillow Covers",         href: "/hometextile/bedlinen/pillowcovers/",        img: "/images/menu/menu-pillowcovers.webp",         imgAlt: "Pakistan pillow cover manufacturer — custom cotton and satin pillowcases wholesale" },
            { label: "Cushion Covers",        href: "/hometextile/bedlinen/cushioncovers/",       img: "/images/menu/menu-cushioncovers.webp",        imgAlt: "Pakistan cushion cover manufacturer — custom decorative pillow covers wholesale" },
            { label: "Curtains",              href: "/hometextile/bedlinen/curtains/",            img: "/images/menu/menu-curtains.webp",             imgAlt: "Pakistan curtain manufacturer — custom woven and printed curtains wholesale export" },
            { label: "Institutional Bedding", href: "/hometextile/bedlinen/institutionalbedding/", img: "/images/menu/menu-institutionaltowels.webp", imgAlt: "Pakistan institutional bedding manufacturer — hotel and hospital bed linen wholesale" },
          ],
        },
        {
          heading: "Kitchen Linen",
          href: "/hometextile/kitchenlinen/",
          img: "/images/menu/menu-kitchenlinen.webp",
          imgAlt: "Pakistan kitchen linen manufacturer — dish towels, aprons and bar mops wholesale",
          items: [
            { label: "Kitchen Towels", href: "/hometextile/kitchenlinen/kitchentowels/", img: "/images/menu/menu-kitchentowels.webp", imgAlt: "Pakistan kitchen towel manufacturer — custom cotton dish and tea towels wholesale" },
            { label: "Bar Mops",       href: "/hometextile/kitchenlinen/barmops/",       img: "/images/menu/menu-barmops.webp",       imgAlt: "Pakistan bar mop manufacturer — commercial cotton bar mops for wholesale buyers" },
            { label: "Aprons",         href: "/hometextile/kitchenlinen/aprons/",        img: "/images/menu/menu-aprons.webp",        imgAlt: "Pakistan apron manufacturer — custom kitchen and chef aprons wholesale export" },
            { label: "Pot Holders",    href: "/hometextile/kitchenlinen/potholders/",    img: "/images/menu/menu-potholders.webp",    imgAlt: "Pakistan pot holder manufacturer — custom heat-resistant kitchen mitts wholesale" },
          ],
        },
        {
          heading: "Table Linen",
          href: "/hometextile/tablelinen/",
          img: "/images/menu/menu-tablelinen.webp",
          imgAlt: "Pakistan table linen manufacturer — tablecloths and table covers wholesale export",
          items: [
            { label: "Table Covers", href: "/hometextile/tablelinen/tablecovers/", img: "/images/menu/menu-tablelinen.webp", imgAlt: "Pakistan tablecloth manufacturer — custom cotton and linen table covers wholesale" },
          ],
        },
        {
          heading: "Thermal Blankets",
          href: "/hometextile/thermalblankets/",
          img: "/images/menu/menu-thermalblankets.webp",
          imgAlt: "Pakistan thermal blanket manufacturer — cellular and fleece blankets wholesale",
          items: [
            { label: "Cellular Thermal Blanket", href: "/hometextile/thermalblankets/cellularthermalblanket/", img: "/images/menu/menu-cellularthermalblanket.webp", imgAlt: "Pakistan cellular blanket manufacturer — open weave cotton thermal blankets wholesale" },
            { label: "Fleece Thermal Blankets",  href: "/hometextile/thermalblankets/fleecethermalblankets/",  img: "/images/menu/menu-thermalblankets.webp",        imgAlt: "Pakistan fleece blanket manufacturer — soft thermal blankets for healthcare wholesale" },
          ],
        },
        {
          heading: "Hospital Linen",
          href: "/hometextile/hospitallinen/",
          img: "/images/menu/menu-hospitallinen.webp",
          imgAlt: "Pakistan hospital linen manufacturer — surgical gowns, scrubs and medical textiles",
          items: [
            { label: "Doctor Surgical Gowns", href: "/hometextile/hospitallinen/doctorsurgicalgowns/", img: "/images/menu/menu-doctorsurgicalgowns.webp", imgAlt: "Pakistan surgical gown manufacturer — medical-grade doctors gowns for hospital buyers" },
            { label: "Medical Scrubs",        href: "/hometextile/hospitallinen/medicalscrubs/",       img: "/images/menu/menu-medicalscrubs.webp",       imgAlt: "Pakistan medical scrub manufacturer — custom healthcare uniforms wholesale export" },
            { label: "Patient Gowns",         href: "/hometextile/hospitallinen/patientgowns/",        img: "/images/menu/menu-patientgowns.webp",        imgAlt: "Pakistan patient gown manufacturer — hospital gowns for healthcare buyers wholesale" },
            { label: "Surgical Huck Towels",  href: "/hometextile/hospitallinen/surgicalhucktowels/",  img: "/images/menu/menu-surgicalhucktowels.webp",  imgAlt: "Pakistan surgical towel manufacturer — medical huckaback towels for hospital buyers" },
          ],
        },
        {
          heading: "Industrial Linen",
          href: "/hometextile/industriallinen/",
          img: "/images/menu/menu-industriallinen.webp",
          imgAlt: "Pakistan industrial linen manufacturer — shop towels and automotive covers wholesale",
          items: [
            { label: "Shop Towels",   href: "/hometextile/industriallinen/shoptowels/",   img: "/images/menu/menu-industriallinen.webp", imgAlt: "Pakistan shop towel manufacturer — industrial work rags and shop cloths wholesale" },
            { label: "Fender Covers", href: "/hometextile/industriallinen/fendercovers/", img: "/images/menu/menu-fendercovers.webp",    imgAlt: "Pakistan fender cover manufacturer — automotive textile covers for wholesale buyers" },
          ],
        },
        {
          heading: "Ihram",
          href: "/hometextile/ihram/",
          img: "/images/menu/menu-ihram.webp",
          imgAlt: "Pakistan ihram manufacturer — hajj and umrah textile sets wholesale export",
        },
      ],
    },
  },

  {
    id: "fabric",
    label: "Fabric",
    mega: {
      panel: {
        heading: "Quality Fabric Sourcing",
        bullets: [
          "Apparel & home textile fabric",
          "Custom GSM & yarn composition",
          "Woven & knitted constructions",
          "Small MOQ, fast sampling",
        ],
        ctaLabel: "Explore Fabric",
        ctaHref: "/fabric/",
      },
      defaultImg: "/images/menu/menu-apparelfabric.webp",
      rows: [
        {
          heading: "Fabric",
          href: "/fabric/",
          img: "/images/menu/menu-apparelfabric.webp",
          imgAlt: "Pakistan textile fabric supplier — apparel and home textile fabric wholesale export",
          items: [
            { label: "Apparel Fabric",      href: "/fabric/apparelfabric/",     img: "/images/menu/menu-apparelfabric.webp",     imgAlt: "Pakistan apparel fabric supplier — knitted and woven fabric for garment manufacturers" },
            { label: "Home Textile Fabric", href: "/fabric/hometextilefabric/", img: "/images/menu/menu-hometextilefabric.webp", imgAlt: "Pakistan home textile fabric — terry, woven and specialty fabric for mills" },
          ],
        },
      ],
    },
  },

  {
    id: "quality",
    label: "Quality & Compliance",
    mega: {
      panel: {
        heading: "Quality You Can Rely On",
        bullets: [
          "Pre-certified manufacturing partners",
          "In-house & third-party inspection",
          "Full compliance documentation",
          "Traceable ethical supply chain",
        ],
        ctaLabel: "View Our Standards",
        ctaHref: "/quality-policy/",
      },
      defaultImg: "/images/menu/menu-qualitypolicy.webp",
      rows: [
        {
          heading: "Compliance",
          img: "/images/menu/menu-qualitypolicy.webp",
          imgAlt: "MZ Global Trading quality compliance — certified factory audit and inspection standards",
          items: [
            { label: "Quality Policy",      href: "/quality-policy/",                       img: "/images/menu/menu-qualitypolicy.webp",      imgAlt: "MZ Global Trading quality policy — certified textile standards for international buyers" },
            { label: "Supplier Evaluation", href: "/qualitycompliance/supplierevaluation/", img: "/images/menu/menu-supplierevaluation.webp", imgAlt: "Textile supplier evaluation process — factory vetting criteria at MZ Global Trading" },
            { label: "Quality Control",     href: "/qualitycompliance/qualitycontrol/",     img: "/images/menu/menu-qualitycontrol.webp",     imgAlt: "Textile quality control — in-house QC inspection for international wholesale buyers" },
            { label: "Inspection Process",  href: "/qualitycompliance/inspectionprocess/",  img: "/images/menu/menu-inspectionprocess.webp",  imgAlt: "Textile inspection process — pre-shipment quality checks at Pakistan factories" },
            { label: "Certifications",      href: "/qualitycompliance/certifications/",     img: "/images/menu/menu-certifications.webp",     imgAlt: "Textile factory certifications — GOTS BSCI OEKO-TEX certified manufacturing Pakistan" },
          ],
        },
      ],
    },
  },

  { id: "contact", label: "Contact Us", href: "/contact-us/" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ img: string; label: string; alt: string } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileRowExpanded, setMobileRowExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (id !== activeMenu) setPreview(null);
    setActiveMenu(id);
  };
  const startClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 280);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const closeAll = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeAll(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeItem = navItems.find((n) => n.id === activeMenu);
  const currentImg = preview?.img ?? activeItem?.mega?.defaultImg ?? "";
  const currentLabel = preview?.label ?? "";
  const currentAlt = preview?.alt ?? activeItem?.mega?.panel.heading ?? "MZ Global Trading";

  return (
    <>
      {/* Backdrop — CSS opacity transition, no Framer Motion, never on mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 hidden lg:block transition-opacity duration-200 ${
          activeMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 128 }}
        onMouseEnter={startClose}
        onClick={closeAll}
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100" data-pagefind-ignore>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-32">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={closeAll}>
              <img
                src="/images/logo/mz-global-trading-logo-header.webp"
                alt="MZ Global Trading"
                className="w-[160px] md:w-[190px] lg:w-[220px] h-auto"
                fetchPriority="low"
              />
            </Link>

            {/* Desktop nav — hidden on mobile, so hover events never fire on mobile */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) =>
                item.href && !item.mega ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="px-3 py-2 text-gray-700 hover:text-gold text-sm font-medium transition-colors rounded"
                    onMouseEnter={() => { cancelClose(); setActiveMenu(null); }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded ${
                      activeMenu === item.id ? "text-gold" : "text-gray-700 hover:text-gold"
                    }`}
                    onMouseEnter={() => openMenu(item.id)}
                    onMouseLeave={startClose}
                  >
                    {item.label}
                    {/* CSS rotate — no Framer Motion */}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMenu === item.id ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )
              )}

              <SearchWidget onOpen={closeAll} />

              <Link
                href="/rfq/"
                className="ml-2 px-5 py-2 bg-gold text-navy-900 text-sm font-bold rounded hover:bg-yellow-400 transition-colors"
                onMouseEnter={() => { cancelClose(); setActiveMenu(null); }}
              >
                Request a Quote
              </Link>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-1 lg:hidden">
              <Link
                href="/search/"
                aria-label="Search"
                className="p-2 text-gray-700 hover:text-gold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(!mobileOpen);
                  setMobileExpanded(null);
                  setMobileRowExpanded(null);
                }}
                className="p-2 text-gray-700 hover:text-gold transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* ── Desktop Mega Panel — Framer Motion lives here, loaded lazily ── */}
        {activeMenu && activeItem?.mega && (
          <MegaMenuPanel
            key={activeMenu}
            activeItem={{ mega: activeItem.mega }}
            currentImg={currentImg}
            currentLabel={currentLabel}
            currentAlt={currentAlt}
            onClose={closeAll}
            onMouseEnter={cancelClose}
            onMouseLeave={startClose}
            onPreview={(img, label, alt) => setPreview({ img, label, alt })}
            onRowHover={(img, heading, alt) => setPreview({ img, label: heading, alt })}
          />
        )}

        {/* ── Mobile Drawer — CSS grid transition, zero Framer Motion ── */}
        <div
          className={`lg:hidden border-t border-white/10 bg-navy-900 grid transition-[grid-template-rows] duration-200 ease-out ${
            mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="py-2">
                {navItems.map((item) => (
                  <div key={item.id}>
                    {item.href && !item.mega ? (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-5 py-3 text-gray-200 hover:text-gold text-sm font-medium border-b border-white/5"
                      >
                        {item.label}
                      </Link>
                    ) : item.mega ? (
                      <>
                        <button
                          onClick={() => {
                            setMobileExpanded(mobileExpanded === item.id ? null : item.id);
                            setMobileRowExpanded(null);
                          }}
                          className="w-full flex items-center justify-between px-5 py-3 text-gray-200 hover:text-gold text-sm font-medium border-b border-white/5"
                        >
                          {item.label}
                          <svg
                            className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                              mobileExpanded === item.id ? "rotate-180" : "rotate-0"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Category accordion — CSS grid transition */}
                        <div
                          className={`bg-[#08111f] grid transition-[grid-template-rows] duration-200 ease-out ${
                            mobileExpanded === item.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            {item.mega.rows.map((row) => {
                              const rowKey = `${item.id}-${row.heading}`;
                              const hasItems = row.items && row.items.length > 0;

                              return (
                                <div key={row.heading} className="border-b border-white/5 last:border-0">
                                  {hasItems ? (
                                    <>
                                      <button
                                        onClick={() =>
                                          setMobileRowExpanded(mobileRowExpanded === rowKey ? null : rowKey)
                                        }
                                        className="w-full flex items-center justify-between px-5 py-2.5"
                                      >
                                        <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold/70">
                                          {row.heading}
                                        </span>
                                        <svg
                                          className={`w-3.5 h-3.5 text-gold/60 flex-shrink-0 transition-transform duration-150 ${
                                            mobileRowExpanded === rowKey ? "rotate-180" : "rotate-0"
                                          }`}
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </button>

                                      {/* Row sub-items accordion — CSS grid transition */}
                                      <div
                                        className={`grid transition-[grid-template-rows] duration-150 ${
                                          mobileRowExpanded === rowKey ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                        }`}
                                      >
                                        <div className="overflow-hidden px-5 pb-3">
                                          {row.items!.map((subItem) => (
                                            <Link
                                              key={subItem.href}
                                              href={subItem.href}
                                              onClick={() => setMobileOpen(false)}
                                              className="block py-1.5 pl-3 text-[13px] text-gray-300 hover:text-gold border-l border-gold/20 hover:border-gold/50 transition-colors"
                                            >
                                              {subItem.label}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    row.href && (
                                      <Link
                                        href={row.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-between px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] uppercase text-gold/70 hover:text-gold transition-colors"
                                      >
                                        {row.heading}
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                      </Link>
                                    )
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                ))}

                <div className="px-5 pt-3 pb-5">
                  <Link
                    href="/rfq/"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center px-5 py-3 bg-gold text-navy-900 text-sm font-bold rounded hover:bg-yellow-400 transition-colors"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Fixed header spacer */}
      <div className="h-32" />
    </>
  );
}
