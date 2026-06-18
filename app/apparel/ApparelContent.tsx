"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CLUSTERS = [
  {
    name: "Knitted Garments",
    slug: "knittedgarments",
    href: "/apparel/knittedgarments/",
    img: "/images/hero/hero-t-shirts.webp",
    desc: "T-shirts, polo shirts, henley shirts, sweatshirts, hoodies, joggers and tank tops. Single jersey to 450 GSM fleece. 6 product categories.",
    spec: "140–450 GSM · 6 Categories",
    badge: "Highest Volume",
    color: "bg-indigo-50 border-indigo-100",
    accent: "text-indigo-600",
  },
  {
    name: "Woven Garments",
    slug: "wovengarments",
    href: "/apparel/wovengarments/",
    img: "/images/hero/hero-denim-jeans.webp",
    desc: "Denim jeans, formal and casual shirts, pants and trousers, cargo pants and shorts. From 8 oz denim to 420 GSM canvas. 5 product categories.",
    spec: "8–14 oz Denim · 5 Categories",
    badge: "",
    color: "bg-blue-50 border-blue-100",
    accent: "text-blue-700",
  },
  {
    name: "Baby & Kids",
    slug: "babyandkids",
    href: "/apparel/babyandkids/",
    img: "/images/hero/hero-t-shirts.webp",
    desc: "GOTS organic baby and kids garments — t-shirts, overalls, rompers, bibs, hooded towels and swaddle muslin. OEKO-TEX Class 1. 6 product categories.",
    spec: "GOTS Organic · 6 Categories",
    badge: "GOTS Certified",
    color: "bg-pink-50 border-pink-100",
    accent: "text-pink-600",
  },
  {
    name: "Workwear Apparel",
    slug: "workwearapparel",
    href: "/apparel/workwearapparel/",
    img: "/images/hero/hero-apparel.webp",
    desc: "Hi-vis vests, boiler suits, chef uniforms, protective workwear and corporate uniforms. Canvas, ripstop and poly-cotton constructions. BSCI certified supply chain.",
    spec: "Protective · Hi-Vis · Uniforms",
    badge: "Industrial",
    color: "bg-amber-50 border-amber-100",
    accent: "text-amber-700",
  },
  {
    name: "Socks",
    slug: "socks",
    href: "/apparel/socks/",
    img: "/images/hero/hero-apparel.webp",
    desc: "Crew, ankle, athletic, compression and diabetic socks. Cotton, bamboo, wool and technical fibre constructions. Custom branding and retail packaging.",
    spec: "Cotton · Bamboo · Technical",
    badge: "",
    color: "bg-teal-50 border-teal-100",
    accent: "text-teal-600",
  },
];

const CAPABILITIES = [
  { icon: "🏭", title: "Mill-Direct Access", desc: "Pakistan's knitwear and woven apparel mills in Karachi, Lahore and Faisalabad — certified to the same standards as factories supplying major global brands." },
  { icon: "🎨", title: "OEM Development", desc: "Full fit development, pattern grading, PMS colour matching, lab dip approval and trim management — all coordinated against your brand brief." },
  { icon: "🌱", title: "Sustainability Options", desc: "GOTS organic cotton, GRS recycled polyester, BCI Better Cotton and Bluesign chemical compliance across all apparel categories." },
  { icon: "✅", title: "Full Certification Stack", desc: "GOTS, OEKO-TEX, BSCI, Sedex, ISO 9001, WRAP, SA8000 — specify certifications in your RFQ and we match factories accordingly." },
  { icon: "📦", title: "Retail-Ready Packing", desc: "Polybag, hanger, box, header card — packing formats designed to your planogram specifications for retail and e-commerce distribution." },
  { icon: "🔬", title: "Pre-Shipment Testing", desc: "Dimensional stability, colour fastness, pilling resistance and wash testing verified before shipment on every programme." },
];

const CERTS = [
  { name: "GOTS", full: "Global Organic Textile Standard" },
  { name: "OEKO-TEX", full: "Standard 100 — no harmful substances" },
  { name: "BSCI", full: "Business Social Compliance Initiative" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange" },
  { name: "ISO 9001", full: "Quality Management System" },
  { name: "GRS", full: "Global Recycled Standard" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production" },
  { name: "SA8000", full: "Social Accountability International" },
];

export default function ApparelContent() {
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-apparel.webp"
            fill
            alt="Pakistan apparel manufacturer — OEM garment sourcing partner for brands in USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/78" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
            <motion.nav
              aria-label="Breadcrumb"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-gray-400 text-xs mb-6 flex-wrap"
            >
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">›</span>
              <span className="text-gold">Apparel</span>
            </motion.nav>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            >
              Pakistan Apparel Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.07] mb-6"
            >
              Apparel
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl"
            >
              Knitted garments, woven garments, baby &amp; kids, workwear and socks —
              sourced from Pakistan&rsquo;s certified apparel factories. GOTS, OEKO-TEX,
              BSCI, WRAP. FOB / CIF export to USA, UK, EU, Middle East and beyond.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base"
              >
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Categories
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Pakistan Apparel Supply
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Five Categories. One Verified Supply Network.
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s apparel export infrastructure covers the full garment spectrum
                — knitwear to denim, baby garments to heavy workwear. Certified factories,
                competitive pricing, full documentation for retail and institutional buyers worldwide.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "5", label: "Product Categories" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/rfq/"
              className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit"
            >
              Request a Quote <span aria-hidden="true">&#8594;</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section id="categories" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Product Range</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Apparel Categories</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">
              Each category page covers constructions, weight ranges, OEM development, decoration options, certifications and full export terms.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLUSTERS.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <Link
                  href={c.href}
                  className={`group block border rounded-2xl overflow-hidden h-full transition-all hover:shadow-md hover:-translate-y-0.5 ${c.color}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={c.img}
                      fill
                      alt={`Pakistan ${c.name.toLowerCase()} manufacturer — OEM supplier for international buyers`}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-navy-900 group-hover:text-gold transition-colors">{c.name}</h3>
                      {c.badge && (
                        <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full shrink-0 ml-2">
                          {c.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.desc}</p>
                    <p className={`text-xs font-semibold ${c.accent} mb-4`}>{c.spec}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-900 group-hover:text-gold transition-colors">
                      Explore {c.name}
                      <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                    </span>
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">End-to-End Apparel Sourcing</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <span className="text-2xl mb-4 block" aria-hidden="true">{c.icon}</span>
                <h3 className="text-base font-bold text-navy-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Compliance</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Certifications Available</h2>
            <p className="text-gray-400 mt-2 text-sm max-w-lg">Specify required certifications in your RFQ — we match you with factories that hold them.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CERTS.map((c) => (
              <div key={c.name} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-bold text-navy-900 text-sm">{c.name}</p>
                <p className="text-xs text-gray-400 mt-1 leading-tight">{c.full}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D1B2A] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Start Your Programme</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Ready to Source Apparel from Pakistan?
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Select your product category and share your construction, certification requirements and target quantity. We match you with the right factory within 3–5 days.
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
