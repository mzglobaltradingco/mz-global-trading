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

const evaluationStages = [
  {
    num: "01",
    title: "Initial Capability Assessment",
    duration: "Week 1–2",
    desc: "A structured questionnaire covering production capacity, equipment, workforce size, current certifications and product categories. Factories that cannot meet minimum threshold criteria on paper do not proceed to the next stage.",
    checks: [
      "Production capacity vs. your target order size",
      "Equipment and machinery inventory",
      "Current certification portfolio",
      "Export history and target markets",
      "Quality management system overview",
    ],
  },
  {
    num: "02",
    title: "Documentation & Compliance Review",
    duration: "Week 2–3",
    desc: "All certification documents, audit reports, lab test results and compliance records are collected and independently verified. We cross-reference expiry dates, scope documents and audit body credentials.",
    checks: [
      "Certification validity and scope verification",
      "Social compliance audit reports (BSCI, Sedex, SA8000)",
      "Quality system manuals and procedures",
      "Restricted substance test reports",
      "Worker wage and hour records (if available)",
    ],
  },
  {
    num: "03",
    title: "On-Site Factory Audit",
    duration: "Week 3–5",
    desc: "Our team conducts a physical audit at the factory — inspecting the production floor, quality control areas, chemical storage, worker facilities and management systems. Worker interviews are conducted separately from management.",
    checks: [
      "Production floor and equipment condition",
      "Sample room and quality control infrastructure",
      "Worker welfare — canteen, restrooms, safety exits",
      "Chemical and material storage compliance",
      "Confidential worker interviews",
    ],
  },
  {
    num: "04",
    title: "Pilot Order & Performance Monitoring",
    duration: "Week 5–10",
    desc: "A small pilot order is placed with intensive monitoring — daily updates, in-line QC inspection and a full pre-shipment inspection. Only factories that pass the pilot with acceptable defect rates and on-time delivery are fully onboarded.",
    checks: [
      "In-line QC inspection at 25% production",
      "Pre-shipment AQL inspection at 80% completion",
      "On-time delivery performance",
      "Communication responsiveness",
      "Defect rate vs. AQL threshold",
    ],
  },
];

const assessmentCriteria = [
  {
    title: "Production Capacity",
    desc: "Factory must demonstrate sufficient capacity for your order volume without compromising quality or requiring excessive overtime.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Certification Status",
    desc: "Current, valid certifications matching your compliance requirements — verified against issuing body records, not self-declared.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Quality Systems",
    desc: "Documented quality management procedures, dedicated QC staff and infrastructure for in-process and final inspection.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "Labour Practices",
    desc: "Compliance with minimum wage, working hours, freedom of association and no forced or child labour — verified through records and worker interviews.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Health & Safety",
    desc: "Safe working environment — fire exits, first aid, PPE provision, chemical handling compliance and no blocked or hazardous conditions on the production floor.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Environmental Compliance",
    desc: "Proper waste and wastewater treatment, restricted substance usage, energy consumption reporting and preference for factories with documented environmental management systems.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Export Experience",
    desc: "Demonstrated experience exporting to your target market — familiarity with documentation requirements, customs procedures and shipping timelines for USA, UK and European destinations.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 17h18M3 17l3-10h12l3 10M3 17l-1 2h20l-1-2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
      </svg>
    ),
  },
  {
    title: "Communication & Responsiveness",
    desc: "Reliable, professional communication in English — responsive to enquiries, proactive on production updates and capable of managing technical specification discussions without ambiguity.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
];

const monitoringItems = [
  { title: "Annual Re-Audit", desc: "Every factory in our active network undergoes a full re-evaluation annually — including documentation review and on-site visit if conditions have changed." },
  { title: "Certification Renewal Tracking", desc: "We track expiry dates for all certifications across the network and alert factories — and buyers — in advance of upcoming renewals." },
  { title: "Order-Level Performance Scoring", desc: "Each completed order generates a performance record — defect rates, on-time delivery and communication scores are tracked cumulatively." },
  { title: "Corrective Action Plans", desc: "Factories that fall below performance thresholds are issued a corrective action plan with a defined remediation timeline." },
  { title: "Probation & Removal", desc: "Factories that fail to remediate documented issues within the corrective action timeline are placed on probation and removed from active sourcing if issues persist." },
];

const qcHubCards = [
  {
    title: "Quality Policy",
    desc: "Our documented commitment to product standards, ethical sourcing and independent inspection on every order.",
    image: "/images/menu/menu-qualitypolicy.webp",
    alt: "MZ Global Trading quality policy — certified textile sourcing from Pakistan",
    href: "/quality-policy/",
    cta: "Read Our Policy",
  },
  {
    title: "Certifications",
    desc: "All 10 international certifications available across our factory network — GOTS, OEKO-TEX, BSCI, ISO 9001 and more.",
    image: "/images/hero/hero-certifications.webp",
    alt: "International textile certifications — certified factory network at MZ Global Trading",
    href: "/qualitycompliance/certifications/",
    cta: "View All Certifications",
  },
  {
    title: "Quality Control",
    desc: "Three-phase independent QC on every order — pre-production, in-line and AQL pre-shipment inspection.",
    image: "/images/hero/hero-quality-control.webp",
    alt: "Quality control inspection — independent QC process at MZ Global Trading",
    href: "/qualitycompliance/qualitycontrol/",
    cta: "Our QC Process",
  },
  {
    title: "Inspection Process",
    desc: "Eight stages from specification lock to container loading — every shipment verified before it leaves Pakistan.",
    image: "/images/hero/hero-inspection-process.webp",
    alt: "Textile inspection process — step by step shipment verification at MZ Global Trading",
    href: "/qualitycompliance/inspectionprocess/",
    cta: "See Each Stage",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SupplierEvaluationContent() {
  return (
    <>

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-supplier-evaluation.webp"
        imageAlt="Factory evaluation and supplier vetting process — MZ Global Trading quality compliance Pakistan"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Quality & Compliance" },
          { label: "Supplier Evaluation" },
        ]}
        label="Quality & Compliance"
        title="Supplier"
        titleGold="Evaluation"
        description="Only factories that pass our 4-stage evaluation process are placed in our sourcing network. Rigorous vetting protects your supply chain before a single order is placed."
        pills={["4-Stage Process", "On-Site Audits", "Pilot Order Required"]}
      />

      {/* ── 2. Intro Stat Banner ─────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-3 gap-6"
          >
            {[
              { val: "~33%", label: "Factory Acceptance Rate", desc: "Only 1 in 3 factories reviewed makes it into the network" },
              { val: "4", label: "Evaluation Stages", desc: "From capability questionnaire to full pilot order" },
              { val: "50+", label: "Active Factory Partners", desc: "All independently audited and actively monitored" },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={staggerItemVariants}
                className="text-center bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <p className="text-4xl font-bold text-navy-900 leading-none mb-2">{s.val}</p>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">{s.label}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. 4-Stage Evaluation ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              The Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              Our 4-Stage Evaluation Framework
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Every factory must pass all four stages in sequence. There are no shortcuts and no
              waivers — even for factories with long-standing relationships.
            </p>
          </motion.div>

          <div className="space-y-5">
            {evaluationStages.map((stage, i) => (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="bg-navy-900 px-6 py-6 sm:py-8 flex sm:flex-col items-center justify-start sm:justify-center gap-3 sm:gap-2 sm:min-w-[120px] sm:text-center">
                    <span className="text-3xl sm:text-4xl font-bold text-gold leading-none">{stage.num}</span>
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest leading-tight">{stage.duration}</span>
                  </div>
                  <div className="p-6 sm:p-8 flex-1">
                    <h3 className="text-navy-900 font-bold text-lg mb-2">{stage.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{stage.desc}</p>
                    <div className="grid sm:grid-cols-2 gap-y-2 gap-x-6">
                      {stage.checks.map((check) => (
                        <div key={check} className="flex items-start gap-2.5">
                          <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                          </span>
                          <span className="text-gray-600 text-sm leading-relaxed">{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Assessment Criteria ───────────────────────────────────────────── */}
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
              What We Assess
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              8 Core Evaluation Criteria
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Every criterion is scored independently. Failure on any single criterion at the audit stage results
              in rejection — partial compliance is not accepted.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {assessmentCriteria.map((crit) => (
              <motion.div
                key={crit.title}
                variants={staggerItemVariants}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-gold/30 hover:shadow-xs transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                  {crit.icon}
                </div>
                <h3 className="text-navy-900 font-bold text-sm mb-2">{crit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{crit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. Ongoing Monitoring ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="lg:col-span-2"
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                After Onboarding
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                Ongoing Factory Monitoring
              </h2>
              <div className="w-8 h-0.5 bg-gold/50 mb-5" />
              <p className="text-gray-500 text-sm leading-relaxed">
                Passing the evaluation is the entry point — not a lifetime guarantee. Every factory in our
                active network is subject to ongoing performance monitoring and periodic re-evaluation to
                ensure standards are maintained across every order we place.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="lg:col-span-3 space-y-4"
            >
              {monitoringItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-4 bg-navy-800/50 rounded-xl p-5 border border-white/5"
                >
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow"
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
              Your Supply Chain
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Source From a Pre-Vetted Factory Network
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto mb-8">
              Every factory we recommend has been independently evaluated against 8 criteria across 4 stages.
              You get a thoroughly vetted supply chain without running your own audit programme.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Request a Quote →
              </Link>
              <Link
                href="/qualitycompliance/qualitycontrol/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                See Our QC Process
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
