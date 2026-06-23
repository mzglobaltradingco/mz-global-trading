"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CLUSTERS = [
  {
    name: "Apparel Fabric",
    slug: "apparelfabric",
    href: "/fabric/apparelfabric/",
    img: "/images/hero/hero-apparel-fabric.webp",
    desc: "Woven and knitted apparel fabric — denim, shirting, twill, canvas, interlock, jersey and performance blends. GOTS, OEKO-TEX, Bluesign certified. Custom specifications.",
    spec: "Woven & Knit · Custom Construction",
    badge: "Full Range",
    color: "bg-indigo-50 border-indigo-100",
    accent: "text-indigo-700",
  },
  {
    name: "Home Textile Fabric",
    slug: "hometextilefabric",
    href: "/fabric/hometextilefabric/",
    img: "/images/hero/hero-home-textile-fabric.webp",
    desc: "Terry, percale, sateen, muslin and blanket fabric by the metre. All GSM and thread count ranges. OEKO-TEX, GOTS, BCI. Suitable for cut-and-make and in-house production programmes.",
    spec: "Terry · Percale · Sateen · Muslin",
    badge: "Mill-Direct",
    color: "bg-teal-50 border-teal-100",
    accent: "text-teal-700",
  },
];

const CAPABILITIES = [
  { icon: "📐", title: "Custom Construction", desc: "Specify yarn count, weave structure, GSM, width and composition — sourced to your exact technical specification from Pakistan's certified mills." },
  { icon: "🌱", title: "Sustainable Fibre", desc: "GOTS organic cotton, GRS recycled polyester, BCI Better Cotton, Bluesign chemical-compliant dyeing and TENCEL fibre options across all fabric categories." },
  { icon: "🎨", title: "Colour Programme", desc: "Greige, yarn-dyed and piece-dyed fabric. Reactive dye, vat dye and pigment options. PMS-matched lab dips before bulk production." },
  { icon: "✅", title: "Quality Verification", desc: "4-point fabric inspection system, shrinkage testing, colour fastness, tensile strength and width tolerance verified on every shipment." },
  { icon: "📦", title: "Flexible Supply", desc: "Roll-form export with full testing documentation. Suitable for brands with in-house CMT operations or cut-and-make factory networks." },
  { icon: "🔬", title: "Technical Support", desc: "Fabric construction consultation, weight optimisation and alternative fibre recommendations — our technical team available to advise on specification." },
];

const CERTS = [
  { name: "OEKO-TEX", full: "Standard 100 — no harmful substances" },
  { name: "GOTS", full: "Global Organic Textile Standard" },
  { name: "GRS", full: "Global Recycled Standard" },
  { name: "Bluesign", full: "Chemical process sustainability" },
  { name: "BCI", full: "Better Cotton Initiative" },
  { name: "BSCI", full: "Business Social Compliance Initiative" },
  { name: "ISO 9001", full: "Quality Management System" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange" },
];

export default function FabricContent() {
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-fabric-category.webp"
            fill
            alt="Pakistan fabric supplier — apparel and home textile fabric from certified mills for international buyers"
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
              className="flex items-center gap-2 text-gray-500 text-xs mb-6 flex-wrap"
            >
              <Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">›</span>
              <span className="text-gold">Fabric</span>
            </motion.nav>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            >
              Pakistan Fabric Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.07] mb-6"
            >
              Fabric
              <br />
              <span className="text-gold">Supplier</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl"
            >
              Apparel fabric and home textile fabric sourced from Pakistan&rsquo;s certified
              mills — woven, knitted and specialty constructions across all fibre types.
              GOTS, OEKO-TEX, Bluesign. FOB export in roll form worldwide.
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
                Pakistan Fabric Supply
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Mill-Direct Fabric. Two Categories. Full Certification.
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s mill infrastructure produces both apparel and home textile fabric
                at scale — with the same certification stack required by leading international
                brands. Custom constructions, certified fibre options and full testing documentation
                on every order.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Mills" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "95%", label: "On-Time Delivery" },
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

      {/* CATEGORIES GRID */}
      <section id="categories" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Product Range</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Fabric Categories</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">
              Each category page covers construction types, fibre options, certification availability, minimum quantities and full export terms.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CLUSTERS.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <Link
                  href={c.href}
                  className={`group block border rounded-2xl overflow-hidden h-full transition-all hover:shadow-md hover:-translate-y-0.5 ${c.color}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={c.img}
                      fill
                      alt={`Pakistan ${c.name.toLowerCase()} supplier — OEM fabric for international buyers`}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-navy-900 group-hover:text-gold transition-colors">{c.name}</h3>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Fabric Sourcing Expertise</h2>
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
            <p className="text-gray-500 mt-2 text-sm max-w-lg">Specify required certifications in your RFQ — we match you with mills that hold them.</p>
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
      <section className="bg-[#0D1B2A] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Start Your Fabric Programme</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Ready to Source Fabric from Pakistan?
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Share your fabric construction, fibre specification, GSM, width, certification requirements and quantity. Mill match within 3–5 days.
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

