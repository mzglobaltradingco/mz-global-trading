"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    href: "/hometextile/kitchenlinen/kitchentowels/",
    img: "/images/hero/hero-kitchen-towels.webp",
    emoji: "🧺",
    name: "Kitchen Towels",
    tagline: "Waffle, Huck & Terry Weave",
    desc: "Multi-construction kitchen towels for retail, hospitality and food-service procurement. Waffle/honeycomb, huck weave and plain weave options, 150–250 GSM. Yarn-dyed stripe, check and custom print programmes.",
    markets: ["USA", "UK", "EU", "Japan"],
    color: "from-amber-50 to-yellow-50",
    border: "border-amber-200",
    tag: "Retail & Institutional",
  },
  {
    href: "/hometextile/kitchenlinen/barmops/",
    img: "/images/hero/hero-bar-mops.webp",
    emoji: "🍽️",
    name: "Bar Mops",
    tagline: "Heavy Terry — Commercial Grade",
    desc: "High-absorption bar mops for restaurants, commercial kitchens and hotel banqueting operations. Heavy terry loop and huck weave. 400–600 GSM. Available in plain white or colour-border configurations for product identification.",
    markets: ["USA", "Canada", "UK", "Australia"],
    color: "from-sky-50 to-blue-50",
    border: "border-sky-200",
    tag: "Foodservice & Hospitality",
  },
  {
    href: "/hometextile/kitchenlinen/aprons/",
    img: "/images/hero/hero-aprons.webp",
    emoji: "👨‍🍳",
    name: "Aprons",
    tagline: "Canvas, Denim & Terry Constructions",
    desc: "OEM aprons for restaurant chains, hotel F&B operations and branded workwear programmes. Canvas, denim, poplin and terry constructions. Bib and waist styles. Screen print, embroidery and digital decoration.",
    markets: ["USA", "UK", "EU", "Middle East"],
    color: "from-stone-50 to-neutral-50",
    border: "border-stone-200",
    tag: "Corporate & Foodservice",
  },
  {
    href: "/hometextile/kitchenlinen/potholders/",
    img: "/images/hero/hero-pot-holders.webp",
    emoji: "🔥",
    name: "Pot Holders",
    tagline: "Heat-Resistant, Silicone-Lined Options",
    desc: "Insulated pot holders and oven mitts for retail kitchenware, supermarket own-brand and promotional programmes. Terry double-layer, quilted cotton and canvas-with-silicone-lining constructions. Up to 220°C heat rating.",
    markets: ["USA", "UK", "EU", "Australia"],
    color: "from-rose-50 to-pink-50",
    border: "border-rose-200",
    tag: "Retail Kitchenware",
  },
];

const CERTS = [
  { name: "OEKO-TEX", img: "/images/certs/cert-oeko-tex.webp" },
  { name: "GOTS", img: "/images/certs/cert-gots.webp" },
  { name: "BSCI", img: "/images/certs/cert-bsci.webp" },
  { name: "ISO 9001", img: "/images/certs/cert-iso-9001.webp" },
  { name: "Sedex", img: "/images/certs/cert-sedex.webp" },
  { name: "WRAP", img: "/images/certs/cert-wrap.webp" },
  { name: "SA8000", img: "/images/certs/cert-sa8000.webp" },
  { name: "GRS", img: "/images/certs/cert-grs.webp" },
];

const REASONS = [
  {
    num: "01",
    title: "Certified Mill Infrastructure",
    desc: "Pakistan's kitchen linen is produced in OEKO-TEX, BSCI and ISO 9001 certified mills — meeting the audit requirements of major USA, EU and UK retail and foodservice buyers.",
  },
  {
    num: "02",
    title: "Construction Breadth",
    desc: "Waffle, huck weave, plain weave, terry and canvas — covering every kitchen linen end-use from premium retail to heavy commercial foodservice.",
  },
  {
    num: "03",
    title: "Custom Programme Support",
    desc: "OEM specifications for fabric construction, GSM, colourway, decoration placement and retail packaging — all managed against your buyer brief.",
  },
  {
    num: "04",
    title: "Export Competitiveness",
    desc: "FOB Karachi pricing positions Pakistan kitchen linen competitively against Asian alternatives while maintaining the certification compliance required by top-tier buyers.",
  },
  {
    num: "05",
    title: "Verified Factory Network",
    desc: "Our 50+ vetted factory network covers kitchen linen at all tier levels — from promotional to premium retail — with 95% on-time shipment performance.",
  },
  {
    num: "06",
    title: "Sustainable Sourcing",
    desc: "GOTS-certified organic cotton and GRS-certified recycled cotton options for kitchen linen programmes where sustainability credentials are required.",
  },
];

export default function KitchenLinenContent() {
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-kitchen-linen.webp"
            fill
            alt="Pakistan kitchen linen manufacturer — kitchen towels, bar mops, aprons and pot holders for hospitality and retail buyers worldwide"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Kitchen Linen</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Kitchen Linen Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Kitchen Linen
              <br />
              <span className="text-gold">Supplier</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              Kitchen towels, bar mops, aprons and pot holders sourced from
              Pakistan&rsquo;s certified textile mills. OEKO-TEX, BSCI and ISO
              9001 compliant. FOB&nbsp;/ CIF export to USA, UK, EU, Middle East
              and worldwide.
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
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base"
              >
                Contact Our Team
              </Link>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-navy-900 rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Kitchen Linen Supply — Pakistan
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Four Product Categories. One Verified Supply Network.
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Kitchen towels, bar mops, aprons and pot holders — all sourced
                through the same certified Pakistan mill infrastructure used by
                major US, European and Middle East buyers.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "4", label: "Product Categories" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight whitespace-nowrap">{s.label}</p>
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

      {/* PRODUCT CARDS */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Kitchen Linen Range
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              Explore the Full Product Range
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl text-sm leading-relaxed">
              Each category has dedicated sourcing expertise, certified factory
              partnerships and OEM customisation support — from construction
              specification through to retail-ready packaging.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={p.href}
                  className={`group flex flex-col bg-gradient-to-br ${p.color} border ${p.border} rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full`}
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
                  <div className="p-7 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" aria-hidden="true">{p.emoji}</span>
                      <div>
                        <span className="text-xs font-semibold text-gold uppercase tracking-[0.15em]">
                          {p.tag}
                        </span>
                        <h3 className="text-xl font-bold text-navy-900 mt-0.5">{p.name}</h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                    {p.tagline}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{p.desc}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {p.markets.map((m) => (
                        <span
                          key={m}
                          className="text-[11px] font-semibold text-navy-900 bg-white/60 border border-white/80 px-2.5 py-1 rounded-full"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-navy-900 group-hover:text-gold transition-colors whitespace-nowrap ml-3">
                      View Details →
                    </span>
                  </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PAKISTAN */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Sourcing Advantage
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              Why Source Kitchen Linen from Pakistan
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-xs transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">
                    {r.num}
                  </span>
                  <h3 className="text-sm font-bold text-navy-900">{r.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Standards</p>
              <h2 className="text-3xl font-bold text-navy-900">Quality Certifications</h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xl">
                Kitchen linen programmes are sourced through factories carrying the certifications required by major retail and foodservice buyers globally.
              </p>
            </div>
            <Link
              href="/qualitycompliance/certifications/"
              className="text-sm font-semibold text-navy-900 hover:text-gold transition-colors whitespace-nowrap"
            >
              View all certifications →
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {CERTS.map((c) => (
              <div
                key={c.name}
                className="bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center p-3"
                style={{ height: 72 }}
              >
                <Image
                  src={c.img}
                  alt={c.name}
                  width={80}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy-900 py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Ready to Source
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start Your Kitchen Linen Programme
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Submit your specifications — product type, construction, quantity
              and destination — and receive a factory match with pricing within
              3–5 working days.
            </p>
            <Link
              href="/rfq/"
              className="inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base"
            >
              Request a Quote <span aria-hidden="true">&#8594;</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

