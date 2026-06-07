"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    id: "apparel",
    title: "Apparel",
    image: "/images/cards/cat-banner-apparel.webp",
    description:
      "From basic tees to premium outerwear — we source knitted and woven garments for all genders and age groups.",
    products: ["T-Shirts & Polos", "Hoodies & Sweatshirts", "Denim & Trousers", "Workwear & Uniforms", "Medical Scrubs"],
    href: "/products/apparel",
  },
  {
    id: "home-textiles",
    title: "Home Textiles",
    image: "/images/cards/cat-banner-home-textiles.webp",
    description:
      "Complete bed and bath collections sourced from certified mills with international quality standards.",
    products: ["Towels & Bath Mats", "Bedsheet Sets", "Duvet Covers", "Bathrobes", "Pillow Covers"],
    href: "/products/home-textiles",
  },
  {
    id: "fabric",
    title: "Fabric",
    image: "/images/cards/cat-banner-fabric.webp",
    description:
      "Knitted and woven fabric in every construction — ready for your cut & sew or private label programs.",
    products: ["Single Jersey", "Interlock & Rib", "Denim Fabric", "Woven Shirting", "Specialty Knits"],
    href: "/products/fabric",
  },
];

export default function SourcingCapabilities() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            What We Source
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
            Our Sourcing Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/40 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-2xl font-bold mb-1">{cat.title}</h3>
                <p className="text-gray-300 text-xs mb-3 leading-relaxed">{cat.description}</p>
                <ul className="space-y-0.5 mb-4">
                  {cat.products.map((p) => (
                    <li key={p} className="text-gray-300 text-xs flex items-center gap-1.5">
                      <span className="text-gold">›</span> {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={cat.href}
                  className="inline-flex items-center gap-1 text-gold text-xs font-semibold hover:gap-2 transition-all"
                >
                  Explore {cat.title} <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
