"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "@/lib/motion-shim";

const PRODUCTS = [
  {
    name: "Doctor Surgical Gowns",
    href: "/hometextile/hospitallinen/doctorsurgicalgowns/",
    img: "/images/hero/hero-home-textiles.webp",
    desc: "Reusable and disposable surgical gowns in TC 65/35 poly-cotton and 100% cotton. Anti-bacterial, fluid repellent, autoclave-safe finishes. ISO 13485 and EN 13795 compliant.",
    specs: ["TC 65/35 Poly-Cotton", "100% Cotton", "Non-Woven Disposable"],
    market: "Hospitals · Surgical Centres · Medical Distributors",
  },
  {
    name: "Medical Scrubs",
    href: "/hometextile/hospitallinen/medicalscrubs/",
    img: "/images/hero/hero-apparel.webp",
    desc: "Twill poly-cotton and 4-way stretch scrubs for clinical staff. Anti-bacterial, moisture-wicking, fluid-repellent finish. Embroidery and custom colour programmes available.",
    specs: ["Twill TC 65/35", "100% Cotton Twill", "4-Way Stretch"],
    market: "Hospitals · Clinics · Nursing Homes · Dental Practices",
  },
  {
    name: "Patient Gowns",
    href: "/hometextile/hospitallinen/patientgowns/",
    img: "/images/hero/hero-home-textiles.webp",
    desc: "Plain weave cotton and poly-cotton patient gowns for hospital wards and aged-care facilities. Autoclave-compatible. Adult and pediatric sizes with printed options for children's wards.",
    specs: ["100% Cotton Plain Weave", "TC Poly-Cotton", "Jersey Knit Wrap-Style"],
    market: "Hospitals · Aged Care · Outpatient Facilities",
  },
  {
    name: "Surgical Huck Towels",
    href: "/hometextile/hospitallinen/surgicalhucktowels/",
    img: "/images/hero/hero-towels.webp",
    desc: "100% cotton honeycomb huck weave. Pre-washed, lint-free, high absorbency. The defining construction for operating theatre supply. Plain white and blue stripe variants.",
    specs: ["Huck / Honeycomb Weave", "100% Cotton", "Pre-Washed / Lint-Free"],
    market: "Operating Theatres · CSSD · Medical Distributors",
  },
];

const CAPABILITIES = [
  { icon: "🏥", title: "Hospital & Surgical Centre", desc: "Full range of reusable healthcare textiles for institutional procurement programmes." },
  { icon: "🏛️", title: "Government Health Ministry", desc: "Large-volume institutional supply with complete compliance documentation and audit support." },
  { icon: "📦", title: "Medical Distributors", desc: "Bulk export packing in carton or institutional pack formats for distributor supply chains." },
  { icon: "🌍", title: "GPO / IDN Networks", desc: "USA Group Purchasing Organisation and Integrated Delivery Network qualification documentation." },
];

const CERTIFICATIONS = [
  { name: "ISO 13485", desc: "Medical devices quality management — increasingly required for hospital procurement" },
  { name: "ISO 9001", desc: "Quality management systems — universal procurement baseline" },
  { name: "BSCI", desc: "Business Social Compliance Initiative — ethical production audit" },
  { name: "Sedex", desc: "Supply chain ethical data compliance platform" },
  { name: "SA8000", desc: "Highest social compliance standard — independently audited" },
  { name: "OEKO-TEX", desc: "No harmful substances — certified for skin-contact medical textiles" },
];

export default function HospitalLinenContent() {
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-home-textiles.webp"
            fill
            alt="Pakistan hospital linen manufacturer — healthcare-grade surgical gowns, scrubs and medical textiles for global buyers"
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
              <span className="text-gold">Hospital Linen</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Pakistan Medical Textile Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8"
            >
              Hospital Linen
              <br />
              <span className="text-gold">Manufacturer</span>
              <br />
              Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              Healthcare-grade linen sourced from Pakistan&rsquo;s ISO-certified medical textile facilities. Surgical gowns,
              medical scrubs, patient gowns and surgical huck towels. Anti-bacterial, fluid-repellent and sterilizable
              constructions. ISO 9001, ISO 13485, BSCI certified. Export to hospitals, distributors and health ministries worldwide.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Contact a Specialist
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS ANCHOR */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-[#0D1B2A] rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center"
          >
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Hospital Linen Supply — Pakistan</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Medical-Grade Textile Supply with Full Compliance Documentation
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s ISO-certified medical textile facilities supply hospitals, purchasing organisations and
                government health ministries across the USA, UK, EU, Middle East and Australia. Complete certification
                documentation provided with every shipment.
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
            <Link href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit">
              Request a Quote <span aria-hidden="true">&#8594;</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Product Range</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Hospital Linen Categories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-blue-50 border border-blue-100 rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={p.img}
                    fill
                    alt={`Pakistan ${p.name.toLowerCase()} manufacturer — OEM supplier for international buyers`}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-7 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-navy-900">{p.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.specs.map((s) => (
                    <span key={s} className="text-xs bg-white border border-blue-200 text-navy-900 px-3 py-1 rounded-full font-medium">{s}</span>
                  ))}
                </div>
                <p className="text-xs text-blue-700 font-medium">{p.market}</p>
                <Link href={p.href} className="self-start inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-gold hover:text-navy-900 transition-colors text-sm">
                  Explore {p.name} <span aria-hidden="true">&#8594;</span>
                </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Buyer Types</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Who We Supply</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <span className="text-3xl mb-4 block" aria-hidden="true">{c.icon}</span>
                <h3 className="text-base font-bold text-navy-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Healthcare Certifications</h2>
            <p className="text-gray-500 mt-3 max-w-xl text-sm">Full certification documentation provided with every hospital linen shipment. All certifications below are available through our Pakistan medical textile supply network.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}
                className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center"
              >
                <p className="text-sm font-bold text-navy-900 mb-1">{cert.name}</p>
                <p className="text-[11px] text-gray-400 leading-tight">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-snug">
              Request a Quote for Your Hospital Linen Programme
            </h2>
            <p className="text-gray-300 text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Share your product type, construction requirements, certification standards, quantity and destination.
              We match you with certified Pakistan medical textile facilities and return a competitive quote within 3&ndash;5 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">
                Request a Quote <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
