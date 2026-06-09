"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "apparel",
    title: "Apparel",
    alt: "Pakistan apparel manufacturer — T-shirts, hoodies, denim and workwear garments for international brands and retailers",
    image: "/images/cards/cat-banner-apparel.webp",
    description:
      "From basic tees to premium outerwear — knitted and woven garments for all genders and age groups.",
    products: ["T-Shirts & Polos", "Hoodies & Sweatshirts", "Denim & Trousers", "Workwear & Uniforms", "Baby & Kids"],
    href: "/apparel/",
  },
  {
    id: "home-textiles",
    title: "Home Textiles",
    alt: "Pakistan home textile manufacturer — towels, bed linen, bathrobes and kitchen linen exported to USA, UK and Europe",
    image: "/images/cards/cat-banner-home-textiles.webp",
    description:
      "Complete bed, bath and kitchen collections sourced from certified mills with international quality standards.",
    products: ["Towels & Bath Mats", "Bedsheet Sets", "Duvet Covers", "Bathrobes", "Kitchen & Table Linen"],
    href: "/hometextile/",
  },
  {
    id: "fabric",
    title: "Fabric",
    alt: "Pakistan textile fabric supplier — knitted and woven fabric for OEM sourcing programs serving global importers",
    image: "/images/cards/cat-banner-fabric.webp",
    description:
      "Knitted and woven fabric in every construction — ready for cut & sew or custom OEM programs.",
    products: ["Single Jersey", "Interlock & Rib", "Denim Fabric", "Woven Shirting", "Specialty Knits"],
    href: "/fabric/",
  },
];

const contentVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      delay: 0.08,
      when: "beforeChildren" as const,
      staggerChildren: 0.05,
    },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.18 } },
};

export default function SourcingCapabilities() {
  const [active, setActive] = useState("apparel");

  return (
    <section id="sourcing-capabilities" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            What We Source
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
            Our Sourcing Capabilities
          </h2>
        </motion.div>

        {/* ── Mobile: stacked cards ───────────────────────────────────── */}
        <div className="flex flex-col gap-4 md:hidden">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden h-72"
            >
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08111f] via-[#08111f]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl font-bold mb-1">{cat.title}</h3>
                <p className="text-gray-300 text-xs leading-relaxed mb-3">{cat.description}</p>
                <Link
                  href={cat.href}
                  className="inline-flex items-center gap-1 text-gold text-xs font-semibold"
                >
                  Explore {cat.title} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Desktop: horizontal accordion ──────────────────────────── */}
        <div className="hidden md:flex gap-3 h-[500px]">
          {categories.map((cat) => {
            const isActive = active === cat.id;
            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActive(cat.id)}
                onClick={() => setActive(cat.id)}
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  flex: isActive ? 3 : 1,
                  minWidth: 0,
                  transition: "flex 0.55s cubic-bezier(0.34, 1.15, 0.64, 1)",
                }}
              >
                {/* Image — subtle scale on active */}
                <div
                  className="absolute inset-0"
                  style={{
                    transform: isActive ? "scale(1.06)" : "scale(1)",
                    transition: "transform 0.6s ease-out",
                  }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 50vw, 40vw"
                  />
                </div>

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(8,17,31,0.97) 0%, rgba(8,17,31,0.48) 55%, rgba(8,17,31,0.06) 100%)"
                      : "linear-gradient(to top, rgba(8,17,31,0.92) 0%, rgba(8,17,31,0.6) 100%)",
                  }}
                />

                {/* Card content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">

                  {/* Title — always visible, size shifts */}
                  <h3
                    className="text-white font-bold leading-tight"
                    style={{
                      fontSize: isActive ? "1.5rem" : "1rem",
                      transition: "font-size 0.4s ease",
                    }}
                  >
                    {cat.title}
                  </h3>

                  {/* Expanded content */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={cat.id}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <p className="text-gray-300 text-sm leading-relaxed mt-2 mb-4">
                          {cat.description}
                        </p>
                        <ul className="space-y-1.5 mb-5">
                          {cat.products.map((p) => (
                            <motion.li
                              key={p}
                              variants={itemVariants}
                              className="text-gray-300 text-xs flex items-center gap-2"
                            >
                              <span className="text-gold text-sm leading-none">›</span>
                              {p}
                            </motion.li>
                          ))}
                        </ul>
                        <Link
                          href={cat.href}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold hover:gap-3 transition-all duration-200"
                        >
                          Explore {cat.title} →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gold accent on compressed cards */}
                  {!isActive && (
                    <div className="mt-2 h-0.5 w-6 bg-gold/70 rounded-full" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
