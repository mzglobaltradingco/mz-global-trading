"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    name: "Bedsheets",
    slug: "bedsheets",
    img: "/images/hero/hero-bedsheets.webp",
    desc: "Percale and sateen constructions in 200–800 TC. Cotton, cotton-polyester and microfiber. All standard international sizes.",
    spec: "200–800 TC · Percale · Sateen · Microfiber",
    badge: "Highest Volume",
    color: "bg-sky-50 border-sky-100",
    accent: "text-sky-700",
  },
  {
    name: "Fitted Sheets",
    slug: "fittedsheets",
    img: "/images/hero/hero-fitted-sheets.webp",
    desc: "Deep pocket options (25–40 cm) in percale and sateen. All-around elastic and split-corner options for hospitality.",
    spec: "200–600 TC · Deep Pocket · All-Around Elastic",
    badge: "Hotel Spec",
    color: "bg-indigo-50 border-indigo-100",
    accent: "text-indigo-700",
  },
  {
    name: "Duvet Covers",
    slug: "duvetcovers",
    img: "/images/hero/hero-duvet-covers.webp",
    desc: "Button, snap, zip and tie closure duvet covers. Percale, sateen and microfiber. Retail and hospitality programmes.",
    spec: "200–600 TC · 4 Closure Types",
    badge: "",
    color: "bg-violet-50 border-violet-100",
    accent: "text-violet-700",
  },
  {
    name: "Pillow Covers",
    slug: "pillowcovers",
    img: "/images/hero/hero-pillow-covers.webp",
    desc: "Standard, Oxford and envelope styles in all thread counts. Coordinated to bedsheet and duvet cover programmes.",
    spec: "200–800 TC · Standard · Oxford · Envelope",
    badge: "",
    color: "bg-amber-50 border-amber-100",
    accent: "text-amber-700",
  },
  {
    name: "Cushion Covers",
    slug: "cushioncovers",
    img: "/images/hero/hero-cushion-covers.webp",
    desc: "Decorative cushion covers in jacquard, embroidered, printed and woven constructions. Hospitality and retail.",
    spec: "Jacquard · Embroidered · Printed",
    badge: "Decorative Range",
    color: "bg-rose-50 border-rose-100",
    accent: "text-rose-700",
  },
  {
    name: "Curtains",
    slug: "curtains",
    img: "/images/hero/hero-curtains.webp",
    desc: "Eyelet, pencil pleat and pinch pleat curtains in blackout, sheer and semi-sheer weights. Hospitality and retail.",
    spec: "Blackout · Sheer · Eyelet · Pencil Pleat",
    badge: "",
    color: "bg-teal-50 border-teal-100",
    accent: "text-teal-700",
  },
  {
    name: "Institutional Bedding",
    slug: "institutionalbedding",
    img: "/images/hero/hero-institutional-bedding.webp",
    desc: "ISO-grade flat sheets, fitted sheets and pillow covers for hospitals, hotels and government facilities. White, plain.",
    spec: "Plain White · Durable Press · ISO Grade",
    badge: "Institutional",
    color: "bg-gray-50 border-gray-200",
    accent: "text-gray-700",
  },
];

const CAPABILITIES = [
  { icon: "📊", title: "Thread Count Mastery", desc: "200 TC entry-level to 800 TC luxury programmes — percale and sateen weave structures in cotton, cotton-poly and full microfiber construction, all verifiable by third-party thread count testing." },
  { icon: "🎨", title: "Colour & Design", desc: "Solid reactive piece-dyed, yarn-dyed stripe, jacquard woven pattern and digital printed designs. Full PMS colour matching with lab dip approval before bulk." },
  { icon: "📐", title: "Size Flexibility", desc: "UK, US, EU and Australian size standards all available. Custom dimensions for hospitality and institutional programmes without minimum quantity surcharges." },
  { icon: "🏨", title: "Hospitality Supply Chain", desc: "Hotel chain procurement — matching product specification across multiple properties for consistent guestroom presentation. Coordinated bed linen sets available as a full programme." },
  { icon: "🌿", title: "GOTS Organic Range", desc: "GOTS-certified organic cotton bed linen for eco-branded retail and hospitality programmes. OEKO-TEX Standard 100 as standard across all constructions." },
  { icon: "🔬", title: "Dimensional Stability", desc: "ISO 6330 shrinkage testing, pilling resistance and colour fastness verified before shipment. Hospitality-grade bed linen must survive institutional laundry cycles — we verify this." },
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

export default function BedLinenContent() {
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-bed-linen.webp"
            fill
            alt="Pakistan bed linen manufacturer — bedsheets, duvet covers and fitted sheets for hotels and retailers worldwide"
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
              <span className="text-gold">Bed Linen</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            >
              Pakistan Bed Linen Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.07] mb-6"
            >
              Bed Linen
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
              Bedsheets, fitted sheets, duvet covers, pillow covers, cushion covers,
              curtains and institutional bedding — sourced from Pakistan&rsquo;s
              certified woven mills. Percale 200–800 TC, sateen, microfiber.
              OEKO-TEX, GOTS, BSCI. FOB / CIF export worldwide.
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
            className="bg-navy-900 rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Pakistan Bed Linen Supply
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                200 TC to 800 TC — Full Thread Count Range
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s woven textile mills produce bed linen across the
                complete quality spectrum — from durable press institutional
                bedding to luxury sateen programmes. Coordinated sets, custom
                dimensions and OEM development all managed through one
                sourcing partner.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "7", label: "Product Categories" },
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

      {/* PRODUCTS GRID */}
      <section id="products" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Product Range</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Bed Linen Product Categories</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">
              Each category page details thread count options, construction specifications, closure types, size ranges, certifications and full export terms.
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
                  href={`/hometextile/bedlinen/${p.slug}/`}
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Woven Textile Expertise</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Bed Linen Sourcing Capabilities</h2>
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
            <p className="text-gray-500 mt-2 text-sm max-w-lg">Specify required certifications in your RFQ — we match you with factories that hold them.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CERTS.map((c) => (
              <div key={c.name} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-bold text-navy-900 text-sm">{c.name}</p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">{c.full}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Start Your Programme</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Ready to Source Bed Linen from Pakistan?
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Share your thread count requirement, construction, size range, certification needs and programme quantity. Factory match within 3–5 days.
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

