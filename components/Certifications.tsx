"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const certs = [
  { src: "/images/certs/cert-sedex.webp", alt: "Sedex" },
  { src: "/images/certs/cert-bsci.webp", alt: "BSCI" },
  { src: "/images/certs/cert-iso-9001.webp", alt: "ISO 9001" },
  { src: "/images/certs/cert-oeko-tex.webp", alt: "OEKO-TEX Standard 100" },
  { src: "/images/certs/cert-gots.webp", alt: "GOTS" },
  { src: "/images/certs/cert-global-recycled-standard.webp", alt: "Global Recycled Standard" },
];

export default function Certifications() {
  return (
    <section className="py-12 sm:py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-8">
          Our Factories Are Certified By
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8 items-center">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.alt}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center justify-center"
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                width={100}
                height={60}
                className="object-contain max-h-14 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
