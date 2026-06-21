"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "@/lib/motion-shim";

const CLUSTERS = [
  {
    name: "Bath Linen",
    slug: "bathlinen",
    href: "/hometextile/bathlinen/",
    img: "/images/hero/hero-towels.webp",
    desc: "Towels, institutional towels, bathrobes, bath mats and beach & pool towels. Terry loop, velour, zero-twist. 300–900 GSM. 5 product categories.",
    spec: "300–900 GSM · 5 Categories",
    badge: "Highest Volume",
    color: "bg-sky-50 border-sky-100",
    accent: "text-sky-700",
  },
  {
    name: "Bed Linen",
    slug: "bedlinen",
    href: "/hometextile/bedlinen/",
    img: "/images/hero/hero-bedsheets.webp",
    desc: "Bedsheets, fitted sheets, duvet covers, pillow covers, cushion covers, curtains and institutional bedding. Percale 200–800 TC. 7 product categories.",
    spec: "200–800 TC · 7 Categories",
    badge: "Hotel Specialist",
    color: "bg-indigo-50 border-indigo-100",
    accent: "text-indigo-700",
  },
  {
    name: "Kitchen Linen",
    slug: "kitchenlinen",
    href: "/hometextile/kitchenlinen/",
    img: "/images/hero/hero-home-textiles.webp",
    desc: "Kitchen towels, bar mops, aprons and pot holders. Waffle, huck weave and terry constructions. Retail, hospitality and food-service programmes.",
    spec: "150–600 GSM · 4 Categories",
    badge: "",
    color: "bg-amber-50 border-amber-100",
    accent: "text-amber-700",
  },
  {
    name: "Table Linen",
    slug: "tablelinen",
    href: "/hometextile/tablelinen/",
    img: "/images/hero/hero-home-textiles.webp",
    desc: "Table covers in cotton damask, jacquard, satin weave and poly-cotton. Custom dimensions for hotels, restaurants, event companies and airlines.",
    spec: "Damask · Jacquard · Custom Dimensions",
    badge: "Hospitality",
    color: "bg-rose-50 border-rose-100",
    accent: "text-rose-700",
  },
  {
    name: "Thermal Blankets",
    slug: "thermalblankets",
    href: "/hometextile/thermalblankets/",
    img: "/images/hero/hero-home-textiles.webp",
    desc: "Cellular cotton thermal blankets for hospitals and clinical settings. Anti-pill polar fleece blankets for retail and promotional programmes. 2 product categories.",
    spec: "150–300 GSM · 2 Categories",
    badge: "NHS Standard",
    color: "bg-blue-50 border-blue-100",
    accent: "text-blue-700",
  },
  {
    name: "Hospital Linen",
    slug: "hospitallinen",
    href: "/hometextile/hospitallinen/",
    img: "/images/hero/hero-home-textiles.webp",
    desc: "Surgical gowns, medical scrubs, patient gowns and surgical huck towels. Anti-bacterial, fluid-repellent constructions. ISO 9001, ISO 13485, BSCI. 4 product categories.",
    spec: "ISO 13485 · 4 Categories",
    badge: "Medical Grade",
    color: "bg-teal-50 border-teal-100",
    accent: "text-teal-700",
  },
  {
    name: "Industrial Linen",
    slug: "industriallinen",
    href: "/hometextile/industriallinen/",
    img: "/images/hero/hero-home-textiles.webp",
    desc: "Shop towels for automotive and industrial maintenance. Fender covers for vehicle care professionals. Heavy cotton terry and knitted constructions. ISO 9001, BSCI.",
    spec: "300–450 GSM · 2 Categories",
    badge: "USA Market",
    color: "bg-slate-50 border-slate-200",
    accent: "text-slate-700",
  },
  {
    name: "Ihram",
    slug: "ihram",
    href: "/hometextile/ihram/",
    img: "/images/hero/hero-home-textiles.webp",
    desc: "100% white cotton Ihram for Hajj and Umrah pilgrimage. Unstitched towelling fabric in 300–500 GSM. Specific to Saudi Arabia and global Muslim market.",
    spec: "300–500 GSM · 100% Cotton",
    badge: "Hajj & Umrah",
    color: "bg-emerald-50 border-emerald-100",
    accent: "text-emerald-700",
  },
];

const CAPABILITIES = [
  { icon: "🏭", title: "Terry Mill Infrastructure", desc: "Pakistan is one of the world's top three terry towel exporters — Faisalabad and Karachi mills supply major US, UK and European retailers directly." },
  { icon: "📊", title: "Thread Count Range", desc: "200 TC entry-level to 800 TC luxury bed linen. GSM tolerance ±5% across all terry products, verified by third-party testing." },
  { icon: "🎨", title: "Colour & Design", desc: "Reactive piece-dyed, yarn-dyed stripe, jacquard and digital printed designs. Full PMS matching with lab dip approval before bulk production." },
  { icon: "🌱", title: "Sustainable Options", desc: "GOTS organic cotton, GRS recycled fibre, BCI Better Cotton and OEKO-TEX certified across all home textile categories." },
  { icon: "🏨", title: "Hospitality Supply", desc: "Coordinated hotel programmes — matching product specification across multiple properties for consistent guestroom and F&B presentation." },
  { icon: "🔬", title: "Pre-Shipment Testing", desc: "ISO 6330 shrinkage, colour fastness, pilling resistance and tensile strength verified. SGS, Bureau Veritas and Intertek inspection available." },
];

const CERTS = [
  { name: "OEKO-TEX", full: "Standard 100 — no harmful substances" },
  { name: "GOTS", full: "Global Organic Textile Standard" },
  { name: "BSCI", full: "Business Social Compliance Initiative" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange" },
  { name: "ISO 9001", full: "Quality Management System" },
  { name: "GRS", full: "Global Recycled Standard" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production" },
  { name: "SA8000", full: "Social Accountability International" },
];

export default function HometextileContent() {
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-home-textiles.webp"
            fill
            alt="Pakistan home textiles manufacturer — towels, bed linen and home textile OEM supplier for international buyers worldwide"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
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
              <span className="text-gold">Home Textiles</span>
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
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.07] mb-6"
            >
              Home Textiles
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
              Bath linen, bed linen, kitchen, table, thermal, hospital and industrial
              linen — sourced from Pakistan&rsquo;s certified terry and woven mills.
              OEKO-TEX, GOTS, BSCI. FOB / CIF export to USA, UK, EU and beyond.
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
                Pakistan Home Textile Supply
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Eight Categories. One Sourcing Partner.
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s terry and woven textile infrastructure is one of the
                largest in the world — certified mills supplying the same international
                hotel groups, retailers and healthcare buyers that source from global
                leaders. Direct factory access through one verified partner.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "8", label: "Product Categories" },
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
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Home Textile Categories</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">
              Each category page covers construction options, GSM ranges, certifications, OEM customisation and full export terms.
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
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Home Textile Sourcing Expertise</h2>
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
            Ready to Source Home Textiles from Pakistan?
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Select your product category and share your construction, certification requirements and programme quantity. Factory match within 3–5 days.
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
