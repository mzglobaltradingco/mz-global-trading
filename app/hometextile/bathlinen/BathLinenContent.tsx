"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    name: "Towels",
    slug: "towels",
    img: "/images/hero/hero-towels.webp",
    desc: "Terry loop bath towels in 300–900 GSM. Velour, zero-twist and waffle options. Hotel, retail and promotional programmes.",
    spec: "300–900 GSM · Terry · Velour · Zero-Twist",
    badge: "Highest Volume",
    color: "bg-sky-50 border-sky-100",
    accent: "text-sky-700",
  },
  {
    name: "Institutional Towels",
    slug: "institutionaltowels",
    img: "/images/hero/hero-institutional-towels.webp",
    desc: "300–550 GSM plain and dobby-border towels for healthcare, hospitality and government procurement.",
    spec: "300–550 GSM · Plain White · Dobby Border",
    badge: "Institutional Grade",
    color: "bg-slate-50 border-slate-200",
    accent: "text-slate-700",
  },
  {
    name: "Bathrobes",
    slug: "bathrobes",
    img: "/images/hero/hero-bathrobes.webp",
    desc: "Shawl collar, kimono and hooded styles in terry loop and velour. 300–600 GSM. Hotel and spa programmes.",
    spec: "300–600 GSM · Shawl · Kimono · Hooded",
    badge: "Hotel Specialist",
    color: "bg-amber-50 border-amber-100",
    accent: "text-amber-700",
  },
  {
    name: "Bath Mats",
    slug: "bathmats",
    img: "/images/hero/hero-bath-mats.webp",
    desc: "Woven terry, tufted and memory foam-backed options. Anti-slip rubber or latex backing. 800–1800 GSM.",
    spec: "800–1800 GSM · Anti-Slip · Multiple Constructions",
    badge: "",
    color: "bg-teal-50 border-teal-100",
    accent: "text-teal-700",
  },
  {
    name: "Beach & Pool Towels",
    slug: "beachpooltowel",
    img: "/images/hero/hero-beach-pool-towels.webp",
    desc: "Velour-faced reactive-printed and yarn-dyed beach towels. Jacquard and dobby constructions. 300–500 GSM.",
    spec: "300–500 GSM · Velour · Reactive Print",
    badge: "S/S Specialist",
    color: "bg-orange-50 border-orange-100",
    accent: "text-orange-700",
  },
];

const CAPABILITIES = [
  { icon: "🏭", title: "Dedicated Terry Mills", desc: "Pakistan houses one of the world's largest terry weaving infrastructures — purpose-built looms, not converted facilities. Faisalabad and Karachi mills supply leading US and European towel brands." },
  { icon: "🎨", title: "Yarn-Dyed & Printed", desc: "Full-spectrum yarn-dyed stripe and dobby programmes, reactive and pigment printed beach towels, and solid piece-dyed bath linen — all from a single supply chain." },
  { icon: "⚖️", title: "GSM Precision", desc: "GSM tolerance held to ±5% across bulk production. Lab-verified before shipment against buyer-approved samples — consistent weight batch to batch." },
  { icon: "🌱", title: "Organic & Sustainable", desc: "GOTS organic cotton, BCI Better Cotton and GRS recycled fibre programmes available. Zero-twist and microfiber eco-construction options on request." },
  { icon: "🔬", title: "Pre-Shipment Testing", desc: "Colour fastness, shrinkage, tensile strength and pile loss testing as standard. SGS, Bureau Veritas and Intertek third-party inspection available." },
  { icon: "📦", title: "All Packing Formats", desc: "Individual polybag, band-pack, box-pack, header card and retail hanger — packing to your retail planogram specifications." },
];

const CERTS = [
  { name: "OEKO-TEX", full: "Standard 100 — no harmful substances" },
  { name: "GOTS", full: "Global Organic Textile Standard" },
  { name: "BSCI", full: "Business Social Compliance Initiative" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange" },
  { name: "ISO 9001", full: "Quality Management System" },
  { name: "BCI", full: "Better Cotton Initiative" },
  { name: "GRS", full: "Global Recycled Standard" },
  { name: "SA8000", full: "Social Accountability International" },
];

export default function BathLinenContent() {
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-home-textiles.webp"
            fill
            alt="Pakistan bath linen manufacturer — towels, bathrobes and bath mats supplier for hotels and retailers worldwide"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/76" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            >
              Pakistan Bath Textile Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.07] mb-6"
            >
              Bath Linen
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
              Towels, institutional towels, bathrobes, bath mats and beach &amp; pool
              towels — sourced from Pakistan&rsquo;s certified terry mills. Terry
              loop, velour, zero-twist and waffle constructions. OEKO-TEX,
              GOTS, BSCI. FOB / CIF export worldwide.
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
                href="#products"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Explore Products
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
                Pakistan Bath Textile Supply
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Pakistan&rsquo;s Terry Capacity Serves Global Demand
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan is one of the world&rsquo;s top three terry towel exporters,
                with Faisalabad and Karachi mills supplying major US, UK and
                European retailers directly. The same infrastructure that
                serves global brands is accessible to you — with full
                certification coverage.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "95%", label: "On-Time Delivery" },
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

      {/* PRODUCTS GRID */}
      <section id="products" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Product Range</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Bath Linen Product Categories</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">
              Each category page covers construction options, GSM ranges, size specifications, decoration methods, certifications and full export terms.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <Link
                  href={`/hometextile/bathlinen/${p.slug}/`}
                  className={`group block border rounded-2xl overflow-hidden h-full transition-all hover:shadow-md hover:-translate-y-0.5 ${p.color}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={p.img}
                      fill
                      alt={`Pakistan ${p.name.toLowerCase()} manufacturer — OEM supplier for international buyers`}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-navy-900 group-hover:text-gold transition-colors">{p.name}</h3>
                      {p.badge && (
                        <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full shrink-0 ml-2">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                    <p className={`text-xs font-semibold ${p.accent} mb-4`}>{p.spec}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-900 group-hover:text-gold transition-colors">
                      Explore {p.name}
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Terry Textile Expertise</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Bath Linen Sourcing Capabilities</h2>
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
            <p className="text-gray-400 mt-2 text-sm max-w-lg">Specify required certifications in your RFQ — matched factories hold all listed certifications.</p>
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
            Ready to Source Bath Linen from Pakistan?
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Share your product type, GSM requirement, construction preference, certification needs and programme quantity. Factory match within 3–5 days.
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
