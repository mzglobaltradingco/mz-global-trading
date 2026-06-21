"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import CertificationsStrip from "@/components/CertificationsStrip";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  cardVariant,
  viewportOnce,
} from "@/lib/animations";

// ─── Data ─────────────────────────────────────────────────────────────────────

const objectives = [
  {
    num: "01",
    title: "Certified Factory Network",
    desc: "Every factory in our sourcing network must hold relevant international certifications before placement of any order. We verify certification status independently — not through self-declaration.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Specification Conformance",
    desc: "Orders are manufactured against documented specifications agreed with the buyer. Deviations from approved specifications must be corrected — or expressly approved by the buyer — before production proceeds.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Independent Quality Inspection",
    desc: "Our QC team operates independently of the production factory. This separation reduces the conflict of interest inherent in factory self-inspection and supports objective, documented results.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Documented Quality Records",
    desc: "Every inspection generates a written report — defect classifications, measurement results, AQL outcomes and photographic evidence. Records are shared with buyers on request and retained for audit purposes.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Ethical & Social Compliance",
    desc: "Quality extends beyond product. Every factory must meet minimum standards for worker rights, fair wages, safe conditions and environmental responsibility — independently audited and documented.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Continuous Improvement",
    desc: "Quality performance data from completed orders — pass rates, defect categories, inspection outcomes — is reviewed periodically. Factories with sustained performance issues are subject to re-evaluation or removal.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const metrics = [
  { value: "AQL 2.5", label: "Standard Inspection Basis", sub: "ISO 2859-1 Level II, unless buyer specifies otherwise" },
  { value: "50+", label: "Vetted Factories", sub: "Evaluated before first order placement" },
  { value: "10+", label: "International Certifications", sub: "Available across the factory network" },
];

const commitmentAreas = [
  {
    title: "Product Quality",
    items: [
      "Specifications documented before production begins",
      "Pre-production sample approval mandatory",
      "AQL Level II as the standard pre-shipment inspection basis",
      "Measurement tolerance adherence verified",
      "Colour and material conformance against approved lab dips",
    ],
  },
  {
    title: "Supply Chain Ethics",
    items: [
      "No child labour — ILO core conventions required of all suppliers",
      "Minimum wage compliance verified annually",
      "Safe working conditions independently audited",
      "Forced overtime and excessive working hours prohibited",
      "Freedom of association respected",
    ],
  },
  {
    title: "Environmental Responsibility",
    items: [
      "Preference for GOTS, GRS and Bluesign certified factories",
      "Wastewater treatment compliance verified",
      "Restricted Substance List (RSL) adherence monitored",
      "Sustainable cotton sourcing through BCI network",
      "Packaging material waste reduction targets",
    ],
  },
];

const qcHubCards = [
  {
    title: "Certifications",
    desc: "All 10 international certifications available across our factory network — GOTS, OEKO-TEX, BSCI, ISO 9001 and more.",
    image: "/images/menu/menu-certifications.webp",
    alt: "International textile certifications — GOTS, OEKO-TEX, BSCI and ISO 9001 certified factories",
    href: "/qualitycompliance/certifications/",
    cta: "View All Certifications",
  },
  {
    title: "Supplier Evaluation",
    desc: "How we vet and onboard every factory through our 4-stage evaluation process before placing your first order.",
    image: "/images/menu/menu-supplierevaluation.webp",
    alt: "Factory supplier evaluation process — MZ Global Trading vetting criteria",
    href: "/qualitycompliance/supplierevaluation/",
    cta: "Our Evaluation Process",
  },
  {
    title: "Quality Control",
    desc: "Three-phase QC — pre-production, in-line and AQL pre-shipment inspection — applied per the agreed order scope.",
    image: "/images/menu/menu-qualitycontrol.webp",
    alt: "Quality control inspection — independent QC process at MZ Global Trading",
    href: "/qualitycompliance/qualitycontrol/",
    cta: "Our QC Process",
  },
  {
    title: "Inspection Process",
    desc: "Eight stages from specification lock to container loading — shipments verified before they leave Pakistan.",
    image: "/images/menu/menu-inspectionprocess.webp",
    alt: "Textile inspection process — step by step shipment verification at MZ Global Trading",
    href: "/qualitycompliance/inspectionprocess/",
    cta: "See Each Stage",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function QualityPolicyContent() {
  return (
    <>

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-why-choose-us.webp"
        imageAlt="Pakistan textile factory quality inspection — MZ Global Trading quality policy commitment"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Quality & Compliance" },
          { label: "Quality Policy" },
        ]}
        label="Quality & Compliance"
        title="Our Quality"
        titleGold="Policy"
        description="A documented commitment to product standards, ethical sourcing and structured inspection — applied across the orders we manage."
        pills={["Documented QC Practices", "AQL-Based Inspections", "Vetted Factory Network"]}
      />

      {/* ── 2. Policy Statement ───────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-center">
              Policy Statement
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 text-center mb-8">
              Our Commitment in Writing
            </h2>

            <div className="relative bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10">
              <div className="absolute top-6 left-6 w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <blockquote className="mt-4">
                <p className="text-navy-900 text-base sm:text-lg leading-relaxed font-medium mb-5">
                  At MZ Global Trading, we are committed to supporting our customers with textile sourcing
                  solutions that align with their agreed product specifications, documented quality standards
                  and commercial requirements.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                  We work with a network of vetted manufacturing partners and apply supplier evaluation,
                  production follow-up, quality monitoring and documentation practices appropriate to each
                  product category and order. Our objective is to help customers reduce sourcing risk, improve
                  transparency and maintain consistency throughout the order process.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                  We encourage responsible manufacturing practices and give preference to suppliers that
                  demonstrate commitment to quality management, ethical business conduct and continuous
                  improvement.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                  Quality considerations are integrated into our sourcing approach — from supplier selection
                  through production coordination and order execution. The level and scope of quality activities
                  is defined per order, based on the product, the customer&apos;s instructions and the services
                  agreed in writing.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  MZ Global Trading remains committed to building long-term relationships based on
                  professionalism, transparency, reliability and continuous improvement.
                </p>
              </blockquote>

              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-navy-900 font-bold text-sm">Muhammad Muzammil</p>
                  <p className="text-gray-500 text-xs mt-0.5">Founder & CEO, MZ Global Trading</p>
                  <p className="text-gray-400 text-xs mt-0.5">Karachi, Pakistan</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-navy-900 rounded-lg w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-white text-xs font-semibold">Policy Status: Active</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Quality Metrics ────────────────────────────────────────────────── */}
      <section className="py-10 bg-navy-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden"
          >
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                variants={staggerItemVariants}
                className="bg-navy-900 px-8 py-8 text-center"
              >
                <p className="text-5xl font-bold text-gold leading-none mb-2">{m.value}</p>
                <p className="text-white font-semibold text-sm mb-1">{m.label}</p>
                <p className="text-gray-500 text-xs">{m.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. Quality Objectives ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              How We Deliver It
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              6 Quality Objectives
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              These objectives underpin every sourcing decision, factory relationship and shipment we manage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {objectives.map((obj, i) => (
              <motion.div
                key={obj.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white p-7 group hover:bg-navy-900 transition-colors duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 flex flex-col items-center gap-3">
                    <span className="text-4xl font-bold text-gray-100 leading-none group-hover:text-white/10 transition-colors select-none">
                      {obj.num}
                    </span>
                    <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                      {obj.icon}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-navy-900 font-bold text-base mb-2 group-hover:text-white transition-colors">
                      {obj.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                      {obj.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Commitment Areas — 3 column detail ─────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Scope of Commitment
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              What Our Quality Policy Covers
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-3 gap-6"
          >
            {commitmentAreas.map((area) => (
              <motion.div
                key={area.title}
                variants={staggerItemVariants}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-navy-900 font-bold text-lg mb-4">{area.title}</h3>
                <ul className="space-y-3">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                      </span>
                      <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. Explore Quality & Compliance ──────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Quality & Compliance
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              Explore Quality &amp; Compliance
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 gap-6"
          >
            {qcHubCards.map((card) => (
              <motion.div
                key={card.title}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <Link href={card.href} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-1.5">{card.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                      {card.cta} →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. Certifications ────────────────────────────────────────────────── */}
      <CertificationsStrip />

      {/* ── 8. CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Ready to Source?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start an Order With Quality Assurance Built In
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              Orders placed through MZ Global Trading are managed under this quality policy — from factory
              selection to pre-shipment sign-off.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Request a Quote →
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
