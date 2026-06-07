"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: "apparel",
    image: "/images/hero/hero-apparel.webp",
    category: "APPAREL SOURCING",
    tagline: "T-Shirts · Hoodies · Denim · Workwear",
  },
  {
    id: "home-textiles",
    image: "/images/hero/hero-home-textiles.webp",
    category: "HOME TEXTILES",
    tagline: "Towels · Bed Linen · Bathrobes · Bath Mats",
  },
  {
    id: "fabric",
    image: "/images/hero/hero-fabric.webp",
    category: "FABRIC EXPORTS",
    tagline: "Knitted · Woven · Denim · Specialty Fabrics",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.category}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
              <span className="text-gold">Apparel, Home Textiles</span>
              {" "}and Fabric Sourcing
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
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-gold-light transition-colors"
              >
                Request a Quote
              </Link>
              <Link
                href="/products/towels"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
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
