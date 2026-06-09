"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const productLinks = [
  { label: "Apparel", href: "/products/apparel" },
  { label: "Home Textiles", href: "/products/home-textiles" },
  { label: "Towels", href: "/hometextile/bathlinen/towels/" },
  { label: "Fabric", href: "/products/fabric" },
  { label: "Ihrams", href: "/products/ihrams" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Company", href: "/our-company" },
  { label: "Quality & Suppliers", href: "/quality-suppliers" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy-900 shadow-xl" : "bg-navy-900/95"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/logo/Master_Logo.webp"
              alt="MZ Global Trading"
              style={{ width: "220px", height: "auto" }}
              className="w-[160px] md:w-[190px] lg:w-[220px] h-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-200 hover:text-gold text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Products dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-200 hover:text-gold text-sm font-medium transition-colors">
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-navy-800 border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                  >
                    {productLinks.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="block px-4 py-3 text-sm text-gray-200 hover:bg-navy-700 hover:text-gold transition-colors border-b border-white/5 last:border-0"
                      >
                        {p.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className="ml-2 px-5 py-2.5 bg-gold text-navy-900 text-sm font-bold rounded hover:bg-gold-light transition-colors"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
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

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-white/10"
            >
              <div className="py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-gray-200 hover:text-gold text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="px-4 py-1 text-xs text-gray-500 uppercase tracking-wider">Products</div>
                {productLinks.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-8 py-2 text-gray-300 hover:text-gold text-sm"
                  >
                    {p.label}
                  </Link>
                ))}
                <div className="px-4 pt-2 pb-3">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center px-5 py-2.5 bg-gold text-navy-900 text-sm font-bold rounded hover:bg-gold-light transition-colors"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
