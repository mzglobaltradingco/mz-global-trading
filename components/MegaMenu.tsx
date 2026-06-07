"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = { label: string; href: string };
type MegaColumn = { heading: string; links: NavLink[] };
type NavItem = {
  id: string;
  label: string;
  href?: string;
  mega?: {
    image?: string;
    imageAlt?: string;
    columns: MegaColumn[];
  };
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  {
    id: "corporate",
    label: "Corporate",
    mega: {
      columns: [
        {
          heading: "Company",
          links: [
            { label: "About Us", href: "/our-company/" },
            { label: "Why Choose Us", href: "/whychooseus/" },
            { label: "Our Process", href: "/ourprocess/" },
            { label: "Careers", href: "/careers/" },
            { label: "Blogs", href: "/blog/" },
          ],
        },
        {
          heading: "Resources",
          links: [
            { label: "Textile Tools Calculator", href: "/textile-tools-calculator/" },
            { label: "FAQs", href: "/faqs/" },
            { label: "Downloads", href: "/downloads/" },
            { label: "Guides", href: "/guides/" },
          ],
        },
      ],
    },
  },
  {
    id: "apparel",
    label: "Apparel",
    mega: {
      image: "/images/cards/cat-banner-apparel.webp",
      imageAlt: "Apparel Sourcing",
      columns: [
        {
          heading: "Knitted Garments",
          links: [
            { label: "T-Shirts", href: "/apparel/knittedgarments/tshirts/" },
            { label: "Polo Shirts", href: "/apparel/knittedgarments/poloshirts/" },
            { label: "Henley Shirts", href: "/apparel/knittedgarments/henleyshirts/" },
            { label: "Sweatshirts & Hoodies", href: "/apparel/knittedgarments/sweatshirtshoodies/" },
            { label: "Sweatpants & Joggers", href: "/apparel/knittedgarments/sweatpantsjoggers/" },
            { label: "Tank Tops", href: "/apparel/knittedgarments/tanktops/" },
          ],
        },
        {
          heading: "Woven Garments",
          links: [
            { label: "Denim Jeans", href: "/apparel/wovengarments/denimjeans/" },
            { label: "Formal & Casual Shirts", href: "/apparel/wovengarments/formalcasualshirts/" },
            { label: "Pants & Trousers", href: "/apparel/wovengarments/pantsandtrousers/" },
            { label: "Cargo Pants", href: "/apparel/wovengarments/cargopants/" },
            { label: "Shorts", href: "/apparel/wovengarments/shorts/" },
          ],
        },
        {
          heading: "More",
          links: [
            { label: "Baby & Kids", href: "/apparel/babyandkids/" },
            { label: "Workwear Apparel", href: "/apparel/workwearapparel/" },
            { label: "Socks", href: "/apparel/socks/" },
          ],
        },
      ],
    },
  },
  {
    id: "home-textiles",
    label: "Home Textiles",
    mega: {
      image: "/images/cards/cat-banner-home-textiles.webp",
      imageAlt: "Home Textiles",
      columns: [
        {
          heading: "Bath Linen",
          links: [
            { label: "Towels", href: "/hometextile/bathlinen/towels/" },
            { label: "Institutional Towels", href: "/hometextile/bathlinen/institutionaltowels/" },
            { label: "Bathrobes", href: "/hometextile/bathlinen/bathrobes/" },
            { label: "Bath Mats", href: "/hometextile/bathlinen/bathmats/" },
            { label: "Beach & Pool Towels", href: "/hometextile/bathlinen/beachpooltowel/" },
          ],
        },
        {
          heading: "Bed Linen",
          links: [
            { label: "Bedsheets", href: "/hometextile/bedlinen/bedsheets/" },
            { label: "Fitted Sheets", href: "/hometextile/bedlinen/fittedsheets/" },
            { label: "Duvet Covers", href: "/hometextile/bedlinen/duvetcovers/" },
            { label: "Pillow Covers", href: "/hometextile/bedlinen/pillowcovers/" },
            { label: "Cushion Covers", href: "/hometextile/bedlinen/cushioncovers/" },
            { label: "Curtains", href: "/hometextile/bedlinen/curtains/" },
          ],
        },
        {
          heading: "More",
          links: [
            { label: "Kitchen Linen", href: "/hometextile/kitchenlinen/" },
            { label: "Table Linen", href: "/hometextile/tablelinen/" },
            { label: "Thermal Blankets", href: "/hometextile/thermalblankets/" },
            { label: "Hospital Linen", href: "/hometextile/hospitallinen/" },
            { label: "Industrial Linen", href: "/hometextile/industriallinen/" },
            { label: "Ihram", href: "/hometextile/ihram/" },
          ],
        },
      ],
    },
  },
  {
    id: "fabric",
    label: "Fabric",
    mega: {
      image: "/images/cards/cat-banner-fabric.webp",
      imageAlt: "Fabric Sourcing",
      columns: [
        {
          heading: "Fabric Categories",
          links: [
            { label: "Apparel Fabric", href: "/fabric/apparelfabric/" },
            { label: "Home Textile Fabric", href: "/fabric/hometextilefabric/" },
          ],
        },
      ],
    },
  },
  {
    id: "quality",
    label: "Quality & Compliance",
    mega: {
      columns: [
        {
          heading: "Quality & Compliance",
          links: [
            { label: "Quality Policy", href: "/quality-policy/" },
            { label: "Supplier Evaluation", href: "/qualitycompliance/supplierevaluation/" },
            { label: "Quality Control", href: "/qualitycompliance/qualitycontrol/" },
            { label: "Inspection Process", href: "/qualitycompliance/inspectionprocess/" },
            { label: "Certifications", href: "/qualitycompliance/certifications/" },
          ],
        },
      ],
    },
  },
  { id: "contact", label: "Contact Us", href: "/contact-us/" },
];

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(id);
  };

  const startClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const activeItem = navItems.find((n) => n.id === activeMenu);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900 shadow-xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={() => setActiveMenu(null)}>
              <img
                src="/images/logo/Master_Logo.png"
                alt="MZ Global Trading"
                className="w-[150px] md:w-[180px] lg:w-[210px] h-auto"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item.href && !item.mega ? (
                  // Direct link
                  <Link
                    key={item.id}
                    href={item.href}
                    className="px-3 py-2 text-gray-200 hover:text-gold text-sm font-medium transition-colors rounded"
                    onMouseEnter={() => { cancelClose(); setActiveMenu(null); }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  // Mega menu trigger
                  <button
                    key={item.id}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded ${
                      activeMenu === item.id ? "text-gold" : "text-gray-200 hover:text-gold"
                    }`}
                    onMouseEnter={() => openMenu(item.id)}
                    onMouseLeave={startClose}
                  >
                    {item.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === item.id ? "rotate-180 text-gold" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )
              )}

              <Link
                href="/contact-us/"
                className="ml-3 px-5 py-2.5 bg-gold text-navy-900 text-sm font-bold rounded hover:bg-gold-light transition-colors"
                onMouseEnter={() => { cancelClose(); setActiveMenu(null); }}
              >
                Request a Quote
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => { setMobileOpen(!mobileOpen); setMobileExpanded(null); }}
              className="lg:hidden p-2 text-gray-200 hover:text-gold transition-colors"
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
        </nav>

        {/* ── Desktop Mega Panel ── */}
        <AnimatePresence>
          {activeMenu && activeItem?.mega && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="hidden lg:block absolute top-full left-0 right-0 bg-navy-950 border-t border-gold/20 shadow-2xl z-40"
              onMouseEnter={cancelClose}
              onMouseLeave={startClose}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                  {/* Featured image (if available) */}
                  {activeItem.mega.image && (
                    <div className="flex-shrink-0 w-52 rounded-xl overflow-hidden relative self-stretch min-h-[200px]">
                      <Image
                        src={activeItem.mega.image}
                        alt={activeItem.mega.imageAlt ?? ""}
                        fill
                        className="object-cover"
                        sizes="208px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                      <p className="absolute bottom-3 left-3 text-white text-xs font-semibold tracking-wider uppercase">
                        {activeItem.label}
                      </p>
                    </div>
                  )}

                  {/* Columns */}
                  <div
                    className={`flex gap-10 flex-1 ${
                      !activeItem.mega.image ? "justify-start" : ""
                    }`}
                  >
                    {activeItem.mega.columns.map((col) => (
                      <div key={col.heading} className="min-w-[160px]">
                        <p className="text-gold text-[10px] font-bold tracking-[0.18em] uppercase mb-3 border-b border-gold/20 pb-2">
                          {col.heading}
                        </p>
                        <ul className="space-y-1.5">
                          {col.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => setActiveMenu(null)}
                                className="text-gray-300 hover:text-gold text-sm transition-colors flex items-center gap-1.5 group"
                              >
                                <span className="text-gold/40 group-hover:text-gold transition-colors text-xs">›</span>
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden overflow-hidden border-t border-white/10 bg-navy-900 max-h-[80vh] overflow-y-auto"
            >
              <div className="py-3">
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
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            setMobileExpanded(mobileExpanded === item.id ? null : item.id)
                          }
                          className="w-full flex items-center justify-between px-5 py-3 text-gray-200 hover:text-gold text-sm font-medium border-b border-white/5"
                        >
                          {item.label}
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === item.id ? "rotate-180 text-gold" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.id && item.mega && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.18 }}
                              className="overflow-hidden bg-navy-950/60"
                            >
                              {item.mega.columns.map((col) => (
                                <div key={col.heading} className="px-5 py-3 border-b border-white/5">
                                  <p className="text-gold text-[10px] font-bold tracking-[0.15em] uppercase mb-2">
                                    {col.heading}
                                  </p>
                                  <ul className="space-y-2">
                                    {col.links.map((link) => (
                                      <li key={link.href}>
                                        <Link
                                          href={link.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="flex items-center gap-2 text-gray-300 hover:text-gold text-sm transition-colors"
                                        >
                                          <span className="text-gold/40 text-xs">›</span>
                                          {link.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}

                <div className="px-5 pt-4 pb-5">
                  <Link
                    href="/contact-us/"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center px-5 py-3 bg-gold text-navy-900 text-sm font-bold rounded hover:bg-gold-light transition-colors"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer so content clears the fixed header */}
      <div className="h-[60px]" />
    </>
  );
}
