"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    name: "T-Shirts for Kids",
    slug: "tshirtsforkids",
    img: "/images/hero/hero-t-shirts-for-kids.webp",
    desc: "Soft combed cotton single jersey. Crew neck and V-neck. Sizes 0–12 years. GOTS organic option. Safe for sensitive skin.",
    spec: "140–180 GSM · Combed Jersey · 0–12 yrs",
    badge: "Best Seller",
    color: "bg-pink-50 border-pink-100",
    accent: "text-pink-600",
  },
  {
    name: "Swaddle Muslin Fabric",
    slug: "swaddlemuslinfabric",
    img: "/images/hero/hero-swaddle-muslin-fabric.webp",
    desc: "4-layer muslin gauze in 100% GOTS organic cotton. Pre-washed, ultra-soft. Swaddle blankets, wraps and bedding.",
    spec: "100–140 GSM · 4-Layer Muslin · GOTS",
    badge: "GOTS Certified",
    color: "bg-green-50 border-green-100",
    accent: "text-green-700",
  },
  {
    name: "Overalls",
    slug: "overalls",
    img: "/images/hero/hero-overalls.webp",
    desc: "100% cotton interlock and rib. Snap closures for easy nappy changes. Sizes 0–24 months and 2–6 years.",
    spec: "180–220 GSM · Interlock · Snap Closure",
    badge: "",
    color: "bg-amber-50 border-amber-100",
    accent: "text-amber-700",
  },
  {
    name: "Baby Rompers",
    slug: "babyrompers",
    img: "/images/hero/hero-baby-rompers.webp",
    desc: "Envelope neck, kimono wrap and snap-front styles. Interlock and jersey constructions. 0–24 months.",
    spec: "160–200 GSM · Jersey · Interlock",
    badge: "Retail Favourite",
    color: "bg-purple-50 border-purple-100",
    accent: "text-purple-700",
  },
  {
    name: "Baby Bibs",
    slug: "babybibs",
    img: "/images/hero/hero-baby-bibs.webp",
    desc: "Terry-backed cotton bibs in snap and tie closures. Drool, feeding and bandana styles. Embroidery and print options.",
    spec: "200–280 GSM · Terry Backed · Cotton",
    badge: "",
    color: "bg-sky-50 border-sky-100",
    accent: "text-sky-700",
  },
  {
    name: "Baby Hooded Towels",
    slug: "babyhoodedtowels",
    img: "/images/hero/hero-baby-hooded-towels.webp",
    desc: "Premium terry loop with woven hood panel. 300–500 GSM. Reactive print, embroidery and plain options. Newborn to 4 years.",
    spec: "300–500 GSM · Terry · Hood Panel",
    badge: "",
    color: "bg-orange-50 border-orange-100",
    accent: "text-orange-700",
  },
];

const CAPABILITIES = [
  { icon: "🌿", title: "GOTS Organic Throughout", desc: "Full GOTS supply chain from certified organic cotton farming through spinning, knitting, dyeing and packing — every link documented and auditable." },
  { icon: "🧪", title: "OEKO-TEX Class 1", desc: "OEKO-TEX Standard 100 Class 1 is the strictest classification — mandatory for articles that come into contact with newborn skin. All baby items held to this standard." },
  { icon: "👶", title: "Safety-First Construction", desc: "No loose trims, covered snap closures, flat-lock seaming and no dye transfer — baby garment construction standards applied at specification stage, not as an afterthought." },
  { icon: "🎨", title: "Low-Impact Dyeing", desc: "OEKO-TEX certified reactive dyes only. No azo dyes, no restricted substances, no heavy metals. Full dyestuff traceability available." },
  { icon: "📦", title: "Retail-Ready Packaging", desc: "Gift boxes, polybag with header card, fold-pack and e-commerce poly pack formats — all designed to meet the premium presentation requirements of babywear retail." },
  { icon: "📋", title: "Regulatory Documentation", desc: "EN 71 safety compliance documentation, Prop 65 guidance and CPSC small parts confirmation available for USA and EU market entry requirements." },
];

const CERTS = [
  { name: "GOTS", full: "Global Organic Textile Standard — full chain", badge: "Critical for baby" },
  { name: "OEKO-TEX", full: "Standard 100 Class 1 — newborn safe", badge: "Critical for baby" },
  { name: "BSCI", full: "Business Social Compliance Initiative", badge: "" },
  { name: "ISO 9001", full: "Quality Management System", badge: "" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange", badge: "" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", badge: "" },
  { name: "SA8000", full: "Social Accountability International", badge: "" },
  { name: "GRS", full: "Global Recycled Standard", badge: "" },
];

export default function BabyAndKidsContent() {
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-baby-and-kids.webp"
            fill
            alt="Pakistan baby and kids clothing manufacturer — GOTS certified rompers, bibs and swaddle muslin for brands worldwide"
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
              <Link href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Baby & Kids</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            >
              Pakistan Baby &amp; Kids Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.07] mb-6"
            >
              Baby &amp; Kids
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
              GOTS-certified baby garments sourced from Pakistan&rsquo;s specialist
              facilities. T-shirts, rompers, overalls, bibs, swaddle muslin and
              hooded towels — OEKO-TEX Standard 100 Class 1, safe for
              newborn skin. Export to USA, UK, EU, Australia and beyond.
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
                Baby &amp; Kids Textile Supply
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                Certified Safe — From Farm to Shelf
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s GOTS-certified facilities operate under the strictest
                organic and chemical safety standards in global textiles. Every
                baby garment is produced, dyed and packed under protocols that
                meet OEKO-TEX Class 1 — the standard for articles touching
                newborn skin.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "GOTS", label: "Organic Certified" },
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
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Baby &amp; Kids Product Categories</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">
              Each category page covers construction options, certification requirements, size ranges, decoration methods, packing formats and full export terms.
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
                  href={`/apparel/babyandkids/${p.slug}/`}
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Baby Textile Standards</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Why Buyers Choose Pakistan for Baby &amp; Kids</h2>
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Baby Textile Compliance</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Certifications — Specify in Your RFQ</h2>
            <p className="text-gray-400 mt-2 text-sm max-w-lg">GOTS and OEKO-TEX Class 1 are the primary mandatory certifications for baby textile buyers in USA, UK and EU markets.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CERTS.map((c) => (
              <div key={c.name} className={`rounded-xl p-4 border ${c.badge ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-100"}`}>
                <p className="font-bold text-navy-900 text-sm">{c.name}</p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">{c.full}</p>
                {c.badge && (
                  <span className="mt-2 inline-block text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    {c.badge}
                  </span>
                )}
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
            Ready to Source Baby &amp; Kids Textiles from Pakistan?
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Share your product type, GOTS/OEKO-TEX requirements, size range, decoration brief and programme quantity. We match you with the right certified factory within 3–5 days.
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
