"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    name: "Denim Jeans",
    slug: "denimjeans",
    img: "/images/hero/hero-denim-jeans.webp",
    desc: "3×1 twill denim in 8–14 oz weights. Rigid, stretch (elastane) and sustainable selvedge options. All washes and treatments.",
    spec: "8–14 oz Denim · Rigid & Stretch",
    badge: "High Demand",
    color: "bg-blue-50 border-blue-100",
    accent: "text-blue-700",
  },
  {
    name: "Formal & Casual Shirts",
    slug: "formalcasualshirts",
    img: "/images/hero/hero-formal-casual-shirts.webp",
    desc: "Poplin, Oxford weave, end-on-end and twill shirting. Dress, classic and slim fit silhouettes for retail and corporate.",
    spec: "100–160 GSM · Poplin · Oxford",
    badge: "",
    color: "bg-indigo-50 border-indigo-100",
    accent: "text-indigo-600",
  },
  {
    name: "Pants & Trousers",
    slug: "pantsandtrousers",
    img: "/images/hero/hero-pants-trousers.webp",
    desc: "Chino twill, canvas and ponte constructions. Flat-front and pleated options. Retail, workwear and corporate programmes.",
    spec: "200–320 GSM · Twill · Canvas",
    badge: "",
    color: "bg-amber-50 border-amber-100",
    accent: "text-amber-700",
  },
  {
    name: "Cargo Pants",
    slug: "cargopants",
    img: "/images/hero/hero-cargo-pants.webp",
    desc: "Heavy canvas and ripstop constructions with multi-pocket configurations. Workwear, tactical and outdoor market applications.",
    spec: "280–420 GSM · Canvas · Ripstop",
    badge: "Workwear Leader",
    color: "bg-stone-50 border-stone-200",
    accent: "text-stone-700",
  },
  {
    name: "Shorts",
    slug: "shorts",
    img: "/images/hero/hero-shorts.webp",
    desc: "Chino, cargo, swim and athletic woven shorts. Multiple inseam lengths and closure options for seasonal programmes.",
    spec: "160–300 GSM · Chino · Canvas",
    badge: "S/S Favourite",
    color: "bg-teal-50 border-teal-100",
    accent: "text-teal-700",
  },
];

const CAPABILITIES = [
  { icon: "🏭", title: "Dedicated Woven Mills", desc: "Purpose-built woven apparel facilities in Karachi and Lahore — not converted knitwear plants. Correct equipment for denim, shirting and canvas work." },
  { icon: "🎯", title: "Wash & Treatment", desc: "Enzymatic stone wash, acid wash, sandblasting alternatives, ozone wash and resin treatment for denim and casual programmes." },
  { icon: "🔩", title: "Trim Management", desc: "Buttons, zippers (YKK and equivalent), labels, rivets, patches and hardware all sourced and managed to your specification." },
  { icon: "📐", title: "Fit Development", desc: "Pattern grading across XS–3XL with spec sheet development, fit samples and full size set review before bulk commitment." },
  { icon: "✅", title: "Audit Compliance", desc: "BSCI, Sedex and SA8000 factory audits. Full social compliance documentation available for all supplier partners." },
  { icon: "🌿", title: "Sustainable Options", desc: "GOTS organic cotton, GRS recycled denim, BCI Better Cotton and Bluesign chemical compliance available on request." },
];

const CERTS = [
  { name: "GOTS", full: "Global Organic Textile Standard" },
  { name: "OEKO-TEX", full: "Standard 100 — chemical safety" },
  { name: "BSCI", full: "Business Social Compliance Initiative" },
  { name: "Sedex", full: "Supplier Ethical Data Exchange" },
  { name: "ISO 9001", full: "Quality Management System" },
  { name: "GRS", full: "Global Recycled Standard" },
  { name: "Bluesign", full: "Chemical process sustainability" },
  { name: "SA8000", full: "Social Accountability International" },
];

export default function WovenGarmentsContent() {
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-apparel.webp"
            fill
            alt="Pakistan woven garments manufacturer — denim, shirts and trousers OEM supplier for brands in USA, UK and Europe"
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/78" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link href="/apparel/" className="hover:text-gold transition-colors">Apparel</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Woven Garments</span>
            </motion.nav>
<motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            >
              Pakistan Woven Apparel Export
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.07] mb-6"
            >
              Woven Garments
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
              Denim jeans, formal and casual shirts, trousers, cargo pants and
              shorts — sourced from Pakistan&rsquo;s specialist woven apparel
              factories. GOTS, OEKO-TEX, BSCI certified. FOB / CIF export
              to USA, UK, EU, Middle East and beyond.
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
                Woven Apparel Supply — Pakistan
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                From Denim to Dress Shirts — One Supply Chain
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Pakistan&rsquo;s woven apparel sector operates across purpose-built
                mills with dedicated denim lines, shirting capacity and heavy
                canvas production. Full certification stack available across
                all five woven garment categories.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[
                { val: "50+", label: "Vetted Factories" },
                { val: "35+", label: "Export Markets" },
                { val: "10+", label: "Certifications" },
                { val: "5", label: "Product Types" },
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
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Woven Garment Categories</h2>
            <p className="text-gray-400 mt-3 max-w-lg text-sm">
              Each category page covers fabric constructions, weight ranges, wash and treatment options, fit development, certifications and full export terms.
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
                  href={`/apparel/wovengarments/${p.slug}/`}
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Woven Apparel Expertise</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">End-to-End Woven Garment Sourcing</h2>
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
            <p className="text-gray-400 mt-2 text-sm max-w-lg">Specify required certifications in your RFQ and we match you with certified factories.</p>
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
            Ready to Source Woven Garments from Pakistan?
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Share your fabric construction, weight, wash treatment, certification requirements and target quantity. We shortlist matched factories within 3–5 days.
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
