"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    name: "T-Shirts",
    slug: "tshirts",
    img: "/images/hero/hero-t-shirts.webp",
    desc: "Single jersey, pique and slub jersey constructions. 160–220 GSM. Retail, promotional and corporate programmes.",
    spec: "160–220 GSM · Single Jersey · Pique",
    badge: "High Volume",
    color: "bg-indigo-50 border-indigo-100",
    accent: "text-indigo-600",
  },
  {
    name: "Polo Shirts",
    slug: "poloshirts",
    img: "/images/hero/hero-polo-shirts.webp",
    desc: "Pique polo and stretch performance constructions. Rib collar and cuffs. Corporate, sport and retail programmes.",
    spec: "180–240 GSM · Pique · Performance",
    badge: "Corporate Favourite",
    color: "bg-amber-50 border-amber-100",
    accent: "text-amber-600",
  },
  {
    name: "Henley Shirts",
    slug: "henleyshirts",
    img: "/images/hero/hero-henley-shirts.webp",
    desc: "Single jersey, waffle knit, rib and French terry. 2–4 button placket. Fashion retail and workwear.",
    spec: "160–320 GSM · 4 Constructions",
    badge: "",
    color: "bg-blue-50 border-blue-100",
    accent: "text-blue-600",
  },
  {
    name: "Sweatshirts & Hoodies",
    slug: "sweatshirtshoodies",
    img: "/images/hero/hero-sweatshirts-hoodies.webp",
    desc: "Loop back fleece, French terry and brushed 3-end fleece. Pullover, zip-front and half-zip options.",
    spec: "280–450 GSM · French Terry · Fleece",
    badge: "A/W Leader",
    color: "bg-purple-50 border-purple-100",
    accent: "text-purple-600",
  },
  {
    name: "Sweatpants & Joggers",
    slug: "sweatpantsjoggers",
    img: "/images/hero/hero-sweatpants-joggers.webp",
    desc: "Loop back and French terry bottoms with elasticated waistband. Regular, slim and athletic fits.",
    spec: "280–380 GSM · Loop Back · French Terry",
    badge: "",
    color: "bg-teal-50 border-teal-100",
    accent: "text-teal-600",
  },
  {
    name: "Tank Tops",
    slug: "tanktops",
    img: "/images/hero/hero-tank-tops.webp",
    desc: "Single jersey, rib and athletic mesh constructions. Racerback, Y-back and standard silhouettes.",
    spec: "140–200 GSM · Jersey · Rib · Mesh",
    badge: "",
    color: "bg-rose-50 border-rose-100",
    accent: "text-rose-600",
  },
];

const CAPABILITIES = [
  { icon: "🧵", title: "Construction Range", desc: "Single jersey to heavyweight fleece — 6 base constructions, unlimited GSM specifications across the full 140–450 GSM range." },
  { icon: "🎨", title: "Colour Programme", desc: "Reactive dye, yarn-dyed and garment-dyed finishes. PMS-matched lab dips before bulk production on every programme." },
  { icon: "✂️", title: "OEM Development", desc: "Fit grading, placket options, custom trim packages and label development managed to your brand specifications." },
  { icon: "📦", title: "Retail Packaging", desc: "Polybag, hanger, board fold and gift box — all packing formats available for direct-to-retail and e-commerce fulfilment." },
  { icon: "🔬", title: "Quality Assurance", desc: "Pre-shipment inspection, wash testing and dimensional stability verification on every bulk order." },
  { icon: "🌱", title: "Sustainability", desc: "GOTS organic cotton, GRS recycled polyester blends and BCI Better Cotton available across all constructions." },
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

export default function KnittedGarmentsContent() {
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-apparel.webp"
            fill
            alt="Pakistan knitted garments manufacturer — OEM knitwear supplier for brands in USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/78" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            >
              Pakistan Knitwear Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.07] mb-6"
            >
              Knitted Garments
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
              MZ Global Trading sources T-shirts, polo shirts, henley shirts,
              sweatshirts, hoodies, joggers and tank tops from Pakistan&rsquo;s
              certified knitwear mills. GOTS, OEKO-TEX, BSCI. FOB / CIF
              export to USA, UK, EU and beyond.
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
                Pakistan Knitwear Supply
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Six Knitted Garment Categories. One Sourcing Partner.
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s knitwear export infrastructure spans Karachi,
                Lahore and Faisalabad — certified mills supplying the same
                international brands that buy from Bangladesh and Turkey. Direct
                factory access, competitive pricing, full certification coverage.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "6", label: "Product Categories" },
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
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Knitted Garment Categories</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">
              Each category page covers constructions, GSM ranges, size options, decoration methods, OEM development and export terms in full detail.
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
                  href={`/apparel/knittedgarments/${p.slug}/`}
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">What We Manage for You</h2>
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
      <section className="bg-white py-14 lg:py-18">
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
            Ready to Source Knitted Garments from Pakistan?
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Share your construction, GSM, certification requirements and target quantity. We match you with the right factory within 3–5 days.
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
