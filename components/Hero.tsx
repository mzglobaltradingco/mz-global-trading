"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const panels = [
  {
    id: "apparel",
    image: "/images/hero/hero-apparel.webp",
    label: "Apparel",
    alt: "Pakistan apparel manufacturer — T-shirts, hoodies and garments sourced for international brands and retailers",
    tagline: "T-Shirts · Hoodies · Denim",
    href: "/apparel/",
    clip: "polygon(0 0, 38% 0, 33% 100%, 0 100%)",
    initialX: -60,
    initialScale: 1,
    delay: 0,
    labelLeft: "17%",
    labelTransform: undefined as string | undefined,
  },
  {
    id: "home-textiles",
    image: "/images/hero/hero-home-textiles.webp",
    label: "Home Textiles",
    alt: "Pakistan home textile manufacturer — towels, bed linen and bath products exported to USA, UK and Europe",
    tagline: "Towels · Bed Linen · Bathrobes",
    href: "/hometextile/",
    clip: "polygon(38% 0, 69% 0, 64% 100%, 33% 100%)",
    initialX: 0,
    initialScale: 1.07,
    delay: 0.15,
    labelLeft: "51%",
    labelTransform: "translateX(-50%)" as string | undefined,
  },
  {
    id: "fabric",
    image: "/images/hero/hero-fabric.webp",
    label: "Fabric",
    alt: "Pakistan textile fabric manufacturer — knitted and woven fabric supplied to global OEM sourcing programs",
    tagline: "Knitted · Woven · Denim",
    href: "/fabric/",
    clip: "polygon(69% 0, 100% 0, 100% 100%, 64% 100%)",
    initialX: 60,
    initialScale: 1,
    delay: 0.3,
    labelLeft: "82%",
    labelTransform: "translateX(-50%)" as string | undefined,
  },
];

type SlideData = {
  id: string;
  category: string;
  tagline: string;
  image?: string;
  imageAlt?: string;
  exploreHref: string;
  exploreLabel: string;
};

const slides: SlideData[] = [
  {
    id: "combined",
    category: "APPAREL · HOME TEXTILES · FABRIC",
    tagline: "Complete Textile Sourcing — One Partner",
    exploreHref: "#sourcing-capabilities",
    exploreLabel: "Explore Products",
  },
  {
    id: "apparel",
    image: "/images/hero/hero-apparel.webp",
    imageAlt: "Pakistan apparel sourcing — T-shirts, hoodies and garments manufactured for international brands and retailers in USA and Europe",
    category: "APPAREL SOURCING",
    tagline: "T-Shirts · Hoodies · Denim · Workwear",
    exploreHref: "/apparel/",
    exploreLabel: "Explore Apparel",
  },
  {
    id: "home-textiles",
    image: "/images/hero/hero-home-textiles.webp",
    imageAlt: "Pakistan home textile sourcing — towels, bed linen and bathrobes exported to USA, UK and European markets",
    category: "HOME TEXTILES",
    tagline: "Towels · Bed Linen · Bathrobes · Bath Mats",
    exploreHref: "/hometextile/",
    exploreLabel: "Explore Home Textiles",
  },
  {
    id: "fabric",
    image: "/images/hero/hero-fabric.webp",
    imageAlt: "Pakistan textile fabric sourcing — knitted and woven fabric for OEM programs serving global importers",
    category: "FABRIC EXPORTS",
    tagline: "Knitted · Woven · Denim · Specialty Fabrics",
    exploreHref: "/fabric/",
    exploreLabel: "Explore Fabric",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];
  const isCombined = slide.id === "combined";

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">

      {/* ── Backgrounds ───────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">

        {isCombined ? (

          /* Combined slide backgrounds */
          <motion.div
            key="combined-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            {/* Mobile: 3 equal horizontal strips */}
            <div className="absolute inset-0 flex flex-col md:hidden">
              {panels.map((p) => (
                <div key={p.id} className="relative flex-1 overflow-hidden">
                  <Image src={p.image} alt={p.alt} fill className="object-cover" sizes="100vw" />
                  <div className="absolute inset-0 bg-navy-950/60" />
                  <div className="absolute inset-0 flex items-center px-6">
                    <div>
                      <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5">
                        {p.label}
                      </p>
                      <p className="text-white/70 text-xs">{p.tagline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: diagonal parallelogram panels */}
            <div className="absolute inset-0 hidden md:block">
              {panels.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: p.initialX, scale: p.initialScale, opacity: 0 }}
                  animate={{ x: 0, scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 28,
                    delay: p.delay,
                  }}
                  className="absolute inset-0"
                  style={{ clipPath: p.clip }}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    className="object-cover"
                    sizes="34vw"
                  />
                  {/* Per-panel gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/50 to-navy-950/30" />
                </motion.div>
              ))}

              {/* Left-side text backdrop — darkens apparel panel area where content text sits */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/30 to-transparent pointer-events-none" />

              {/* Subtle gold dividers at panel boundaries */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent"
                  style={{ left: "35.5%" }}
                />
                <div
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent"
                  style={{ left: "66.5%" }}
                />
              </div>
            </div>
          </motion.div>

        ) : (

          /* Individual slide background */
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image!}
              alt={slide.imageAlt ?? slide.category}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-transparent" />
          </motion.div>

        )}
      </AnimatePresence>

      {/* ── Content overlay ───────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {isCombined ? (

            /* Combined slide content */
            <motion.div
              key="combined-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="max-w-sm"
            >
              <p className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-3">
                Complete Textile Sourcing
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Your Trusted Partner in{" "}
                <span className="text-gold">Apparel</span>
                {", "}
                <span className="text-gold">Home Textiles</span>
                {" & "}
                <span className="text-gold">Fabric</span>
                {" Sourcing"}
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-7">
                Apparel, Home Textiles and Fabric — certified manufacturers,
                one sourcing partner, delivered on time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/rfq/"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors"
                >
                  Request a Quote
                </Link>
                <Link
                  href={slide.exploreHref}
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
                >
                  {slide.exploreLabel}
                </Link>
              </div>
            </motion.div>

          ) : (

            /* Individual slide content */
            <div className="max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`cat-${slide.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="text-gold font-semibold text-sm tracking-[0.2em] uppercase mb-3"
                >
                  {slide.category}
                </motion.p>
              </AnimatePresence>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Your Trusted Partner in{" "}
                <span className={slide.id === "apparel" ? "text-gold" : "text-white"}>Apparel</span>
                {", "}
                <span className={slide.id === "home-textiles" ? "text-gold" : "text-white"}>Home Textiles</span>
                {" and "}
                <span className={slide.id === "fabric" ? "text-gold" : "text-white"}>Fabric</span>
                {" Sourcing"}
              </h1>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`tag-${slide.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-gray-300 text-sm tracking-wider mb-6"
                >
                  {slide.tagline}
                </motion.p>
              </AnimatePresence>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                We help importers, brands, and retailers source the best quality
                products from Pakistan&apos;s most reliable manufacturers — on time, every time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/rfq/"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors"
                >
                  Request a Quote
                </Link>
                <Link
                  href={slide.exploreHref}
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
                >
                  {slide.exploreLabel}
                </Link>
              </div>
            </div>

          )}
        </div>
      </div>

      {/* ── Slide indicators ──────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-gold" : "w-4 bg-white/40"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
