"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    href: "/hometextile/thermalblankets/cellularthermalblanket/",
    img: "/images/hero/hero-cellular-thermal-blanket.webp",
    title: "Cellular Thermal Blanket",
    subtitle: "100% Cotton Open-Cell Weave",
    desc: "The clinical-grade standard for NHS and global hospital procurement. Open honeycomb weave breathes, resists moisture build-up and withstands repeated 60–90°C laundering. OEKO-TEX, GOTS, ISO 9001.",
    gsm: "150–250 GSM",
    badge: "NHS Standard",
    badgeColor: "bg-blue-100 text-blue-700",
    sectors: ["Hospital", "Neonatal", "Aged Care", "Emergency Services"],
    color: "from-blue-50 to-sky-50",
    border: "border-blue-100",
    accent: "text-blue-600",
    icon: "🏥",
  },
  {
    href: "/hometextile/thermalblankets/fleecethermalblankets/",
    img: "/images/hero/hero-fleece-thermal-blankets.webp",
    title: "Fleece Thermal Blankets",
    subtitle: "Anti-Pill Polar Fleece & Variants",
    desc: "High-volume retail, promotional and institutional blanket programmes. Anti-pill polar fleece, sherpa double-sided and jacquard woven options. GRS recycled polyester available. OEKO-TEX, BSCI, WRAP.",
    gsm: "150–300 GSM",
    badge: "Retail & Promotional",
    badgeColor: "bg-amber-100 text-amber-700",
    sectors: ["Retail", "Corporate Promo", "Airlines", "Emergency Mgmt"],
    color: "from-amber-50 to-orange-50",
    border: "border-amber-100",
    accent: "text-amber-600",
    icon: "🛍️",
  },
];

const CAPABILITIES = [
  { icon: "🏭", title: "50+ Vetted Factories", desc: "Pakistan's specialist blanket mills — cellular weave and fleece construction under one sourcing umbrella." },
  { icon: "🌍", title: "35+ Export Markets", desc: "Active programmes to UK, USA, Canada, EU, Australia, Middle East and Southeast Asia." },
  { icon: "📋", title: "10+ Certifications", desc: "OEKO-TEX, GOTS, GRS, BSCI, ISO 9001, WRAP, Sedex and more across our supply network." },
  { icon: "⚡", title: "95% On-Time Delivery", desc: "Consistent programme scheduling across both cellular and fleece product lines." },
];

export default function ThermalBlanketsContent() {
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-thermal-blankets.webp"
            fill
            alt="Pakistan thermal blanket manufacturer — cotton cellular and polar fleece blankets for hospitals and retail buyers worldwide"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Thermal Blankets</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            >
              Pakistan Home Textile Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6"
            >
              Thermal Blankets
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl"
            >
              Two distinct product lines — cotton cellular blankets for clinical environments and polar fleece blankets for retail and promotional programmes. Both sourced from Pakistan&rsquo;s certified mills.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base"
              >
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCT TYPES */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Two Product Lines</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Clinical-Grade &amp; Retail Blanket Programmes</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm leading-relaxed">
              Cellular and fleece blankets serve different supply chains. Select the construction that matches your procurement specification.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.href}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                <Link href={p.href} className={`group block bg-gradient-to-br ${p.color} border ${p.border} rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={p.img}
                      fill
                      alt={`Pakistan ${p.title.toLowerCase()} manufacturer — OEM supplier for international buyers`}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8 flex flex-col gap-5 flex-1">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl" aria-hidden="true">{p.icon}</span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-navy-900 group-hover:text-gold transition-colors">{p.title}</h3>
                          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${p.badgeColor}`}>{p.badge}</span>
                        </div>
                        <p className={`text-xs font-semibold ${p.accent} mb-2`}>{p.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.sectors.map((s) => (
                        <span key={s} className="bg-white/70 text-navy-900 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-white/50">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-xs text-gray-500 font-medium">{p.gsm}</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-gold transition-colors">
                        View Full Spec →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Capability</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Why Buyers Source Blankets Through MZ Global Trading</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <span className="text-2xl mb-3 block" aria-hidden="true">{c.icon}</span>
                <h3 className="text-base font-bold text-navy-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D1B2A] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Start Your Blanket Programme</p>
          <h2 className="text-3xl font-bold text-white mb-5">Ready to Source Thermal Blankets from Pakistan?</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-8">
            Submit your specification — construction type, GSM, size, certification requirements and destination — and receive a detailed quotation within 3–5 business days.
          </p>
          <Link
            href="/rfq/"
            className="inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base"
          >
            Request a Quote <span aria-hidden="true">&#8594;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
