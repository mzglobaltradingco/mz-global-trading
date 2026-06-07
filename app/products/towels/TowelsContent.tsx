"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const towelCategories = [
  {
    id: "bath",
    title: "Bath Towels",
    desc: "GSM 400–700 | 27\"×52\" to 30\"×58\" (USA) | 100% cotton & blends",
    icon: "🛁",
  },
  {
    id: "beach",
    title: "Beach & Pool Towels",
    desc: "GSM 300–500 | 30\"×60\" to 40\"×70\" | Reactive & digital prints",
    icon: "🏖️",
  },
  {
    id: "hand",
    title: "Hand Towels",
    desc: "GSM 400–550 | 16\"×30\" to 18\"×30\" | Dobby borders available",
    icon: "✋",
  },
  {
    id: "kitchen",
    title: "Kitchen & Dish Towels",
    desc: "100% cotton or linen | Waffle & huck weave | Food-safe dyes",
    icon: "🍳",
  },
  {
    id: "institutional",
    title: "Institutional Towels",
    desc: "Hotel, hospital & gym grade | Bulk supply | Custom branding",
    icon: "🏨",
  },
  {
    id: "surgical",
    title: "Surgical & Huck Towels",
    desc: "Medical-grade cotton | OEKO-TEX certified | Sterilization-safe",
    icon: "🏥",
  },
  {
    id: "bath-mats",
    title: "Bath Mats & Rugs",
    desc: "Tufted & terry | Non-slip backing | Custom sizes & shapes",
    icon: "🟫",
  },
  {
    id: "face",
    title: "Face & Hair Towels",
    desc: "Ultra-soft GSM 300–500 | Microfiber & bamboo options available",
    icon: "💆",
  },
];

const materials = [
  { name: "Combed Cotton", desc: "Premium absorbency and softness" },
  { name: "Egyptian Cotton", desc: "Longest fibers, ultra-luxurious feel" },
  { name: "Organic Cotton", desc: "GOTS certified, eco-conscious" },
  { name: "Zero Twist Cotton", desc: "Lightweight, fast-drying" },
  { name: "Bamboo Cotton", desc: "Naturally antibacterial, silky" },
  { name: "Turkish Cotton", desc: "High absorbency, classic heritage" },
  { name: "Microfiber", desc: "Rapid drying, gym & sports grade" },
  { name: "Recycled Cotton", desc: "GRS certified sustainable fiber" },
];

const weaves = [
  "Terry Weave", "Waffle Weave", "Jacquard", "Dobby Border",
  "Plain Weave", "Twill Weave", "Herringbone", "Honeycomb",
  "Houndstooth", "Rib Weave", "Pique", "Checkered",
];

const specs = [
  { label: "GSM Range", value: "300 – 700 GSM" },
  { label: "Yarn Count", value: "10s to 20s" },
  { label: "Yarn Types", value: "20+ options" },
  { label: "Weaving Methods", value: "12 techniques" },
  { label: "Towel Types", value: "44 varieties" },
  { label: "Size Standards", value: "USA · EU · UK · Custom" },
];

const certBadges = [
  { src: "/images/certs/cert-oeko-tex.webp", alt: "OEKO-TEX Standard 100" },
  { src: "/images/certs/cert-gots.webp", alt: "GOTS" },
  { src: "/images/certs/cert-bsci.webp", alt: "BSCI" },
  { src: "/images/certs/cert-iso-9001.webp", alt: "ISO 9001" },
  { src: "/images/certs/cert-sedex.webp", alt: "Sedex" },
  { src: "/images/certs/cert-global-recycled-standard.webp", alt: "GRS" },
];

export default function TowelsContent() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image
          src="/images/thumbnails/thumb-towels.webp"
          alt="Towels by MZ Global Trading"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-gray-300 text-xs mb-4">
                <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                <span>›</span>
                <span className="text-gold">Towels</span>
              </div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                Home Textiles
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
                Towels
              </h1>
              <p className="text-gray-300 text-base sm:text-lg max-w-lg">
                44 towel types. 20+ yarn options. 12 weaving techniques. Certified factories. Global shipping.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-gold-light transition-colors"
                >
                  Request a Quote
                </Link>
                <a
                  href="#categories"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white text-sm rounded hover:border-gold hover:text-gold transition-colors"
                >
                  View Categories ↓
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Specs Bar */}
      <section className="bg-navy-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {specs.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="text-center"
              >
                <p className="text-gold font-bold text-lg">{s.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Towel Categories */}
      <section id="categories" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">What We Supply</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Towel Categories</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              From luxury hotel collections to industrial-grade institutional towels — we source every type at scale.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {towelCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:border-gold/40 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="text-navy-900 font-semibold text-base mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Raw Materials</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                20+ Yarn Types, <br />Every Fiber You Need
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                We work with mills offering the full spectrum of cotton varieties and specialty fibers — from everyday combed cotton to ultra-premium Egyptian and organic options.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {materials.map((m) => (
                  <div key={m.name} className="flex items-start gap-3">
                    <span className="text-gold mt-0.5">›</span>
                    <div>
                      <p className="text-white text-sm font-medium">{m.name}</p>
                      <p className="text-gray-400 text-xs">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Weaving Techniques</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {weaves.map((w) => (
                  <div
                    key={w}
                    className="bg-navy-800/60 border border-white/10 rounded-lg px-4 py-3 text-center hover:border-gold/40 transition-colors"
                  >
                    <p className="text-white text-xs font-medium">{w}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dyeing & Printing */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Customization</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Dyeing, Printing & Packaging</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Dyeing Methods",
                items: ["Reactive Dyeing", "Vat Dyeing", "Pigment Dyeing", "Yarn Dyeing", "Piece Dyeing", "Solid Dyeing"],
              },
              {
                title: "Printing Techniques",
                items: ["Digital Printing", "Screen Printing", "Rotary Printing", "Heat Transfer", "Embroidery", "Jacquard Weave"],
              },
              {
                title: "Packaging Options",
                items: ["Individual Poly Bags", "Cardboard Boxes", "Cartons & Pallets", "Shrink Wrapping", "Custom Branded", "Retail-Ready Sets"],
              },
            ].map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-navy-900 font-semibold text-base mb-4">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Standards */}
      <section className="py-14 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">International Standards</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Size Standards by Region</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="text-left px-4 py-3 rounded-tl-lg">Towel Type</th>
                  <th className="text-center px-4 py-3">USA</th>
                  <th className="text-center px-4 py-3">Europe</th>
                  <th className="text-center px-4 py-3 rounded-tr-lg">UK</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Bath Towel", usa: "27\"×52\" – 30\"×58\"", eu: "70×140 – 80×160 cm", uk: "27\"×52\" – 30\"×60\"" },
                  { type: "Hand Towel", usa: "16\"×30\" – 18\"×30\"", eu: "50×100 cm", uk: "16\"×30\" – 18\"×30\"" },
                  { type: "Face Cloth", usa: "12\"×12\" – 13\"×13\"", eu: "30×30 – 33×33 cm", uk: "12\"×12\" – 13\"×13\"" },
                  { type: "Beach Towel", usa: "30\"×60\" – 40\"×70\"", eu: "70×140 – 100×200 cm", uk: "30\"×60\" – 40\"×70\"" },
                  { type: "Bath Sheet", usa: "35\"×60\" – 40\"×70\"", eu: "90×150 – 100×180 cm", uk: "35\"×60\" – 40\"×70\"" },
                ].map((row, i) => (
                  <tr key={row.type} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-3 font-medium text-navy-900">{row.type}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{row.usa}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{row.eu}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{row.uk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-gray-400 text-xs mt-2 text-center">Custom sizes available on request.</p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-8">
            Certified Factories & Compliance Standards
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center">
            {certBadges.map((cert, i) => (
              <motion.div
                key={cert.alt}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
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

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Get a Quote</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Source Premium Towels?
            </h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
              Share your specifications and we&apos;ll send you a competitive quote within 24 hours.
              No minimums too large or too small.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-gold-light transition-colors"
              >
                Request a Quote →
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
