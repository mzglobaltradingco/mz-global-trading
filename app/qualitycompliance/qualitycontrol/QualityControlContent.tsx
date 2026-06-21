"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

type PhaseId = "pre-production" | "in-line" | "pre-shipment";

const phases: { id: PhaseId; num: string; title: string; timing: string; desc: string; checks: string[] }[] = [
  {
    id: "pre-production",
    num: "01",
    title: "Pre-Production",
    timing: "Before bulk cutting begins",
    desc: "Quality control starts before any fabric is cut. We verify that all materials, approved samples and production specifications are aligned and signed off — eliminating errors before they can be replicated across the full production run.",
    checks: [
      "Bulk fabric vs. approved lab dip colour matching",
      "Fabric composition and GSM verification against spec",
      "Trim, thread and accessory approval",
      "Pre-production sample measurement audit",
      "Tech Pack and cut ticket review",
      "Factory production plan review for capacity alignment",
      "Shrinkage and wash test sign-off (where applicable)",
    ],
  },
  {
    id: "in-line",
    num: "02",
    title: "In-Line Inspection",
    timing: "At 20–30% production completion",
    desc: "An in-line inspection is conducted when approximately 20–30% of the production run is complete. At this stage, issues can still be corrected across the remaining 70–80% of the order — making this the most cost-effective point to identify and resolve defects.",
    checks: [
      "Workmanship quality — stitching, seams, finishing",
      "Measurements vs. approved size specifications",
      "Print, embroidery or embellishment alignment",
      "Colour consistency across the production batch",
      "Label and packaging specification compliance",
      "Production rate vs. delivery timeline",
      "Assembly defect classification and corrective action",
    ],
  },
  {
    id: "pre-shipment",
    num: "03",
    title: "Pre-Shipment Inspection",
    timing: "At 80%+ completion — before container loading",
    desc: "The final gate. A comprehensive AQL Level II inspection is conducted on a statistically representative sample of the finished goods. The shipment is not released until it passes. Photographic evidence and a written inspection report are provided for every order.",
    checks: [
      "AQL Level II sampling per ISO 2859-1",
      "Critical, major and minor defect classification",
      "Full measurement audit against size specifications",
      "Colour and appearance vs. approved bulk sample",
      "Packing, labelling and barcode verification",
      "Quantity count and carton marking inspection",
      "Written inspection report with photographic evidence",
    ],
  },
];

const aqlTable = [
  { level: "0", defect: "Critical", description: "Safety hazard, legal violation or brand-damaging defect", acceptance: "0 defects accepted" },
  { level: "2.5", defect: "Major", description: "Defect that would cause a retail buyer to reject the product or return it", acceptance: "Acceptance Number per AQL table" },
  { level: "4.0", defect: "Minor", description: "Defect that is noticeable but unlikely to cause a return or complaint", acceptance: "Acceptance Number per AQL table" },
];

const inspectionItems = [
  { category: "Construction", items: ["Stitch density (SPI)", "Seam strength and type", "Thread ends and loose threads", "Symmetry and assembly alignment"] },
  { category: "Measurements", items: ["All points of measure vs. approved spec", "Size label accuracy", "Tolerance adherence (±1.5cm standard)"] },
  { category: "Appearance", items: ["Colour matching vs. approved bulk", "Print / embroidery registration", "Fabric surface — pills, holes, runs"] },
  { category: "Finishing", items: ["Washing, pressing, folding as specified", "Tags, labels and care instructions", "Special finishes — silicone, DWR, anti-bacterial"] },
  { category: "Packing", items: ["Individual packaging per buyer spec", "Carton quantity and configuration", "Shipping marks and barcode scan"] },
  { category: "Documentation", items: ["Certification documents present", "Test reports attached (if required)", "Packing list vs. physical count"] },
];

const issueResolution = [
  {
    title: "Defect Found — Sortable",
    desc: "If defects fall within a correctable category (loose threads, minor pressing, label alignment), the factory must 100% inspect and repack affected units before re-inspection is booked.",
    outcome: "Re-inspection within 48 hours",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-100",
  },
  {
    title: "Defect Found — Production Issue",
    desc: "If defects indicate a production process failure (consistent measurement deviation, wrong construction), the issue is escalated to factory management with a root cause analysis required before release.",
    outcome: "Corrective action plan + buyer notification",
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-100",
  },
  {
    title: "Inspection Failed",
    desc: "If the AQL threshold is exceeded and defects are not sortable, the shipment is held. The buyer is notified immediately with a full defect report. The factory bears all costs of re-work, re-inspection and resulting delays.",
    outcome: "Hold + buyer escalation + factory accountability",
    color: "text-red-600",
    bg: "bg-red-50 border-red-100",
  },
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
    title: "Supplier Evaluation",
    desc: "How we vet and onboard every factory through our 4-stage evaluation process before placing your first order.",
    image: "/images/hero/hero-supplier-evaluation.webp",
    alt: "Factory supplier evaluation process — MZ Global Trading vetting criteria",
    href: "/qualitycompliance/supplierevaluation/",
    cta: "Our Evaluation Process",
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

export default function QualityControlContent() {
  const [activePhase, setActivePhase] = useState<PhaseId>("pre-production");

  return (
    <>

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-quality-control.webp"
        imageAlt="Quality control inspection process — independent QC team checking textiles before shipment from Pakistan"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Quality & Compliance" },
          { label: "Quality Control" },
        ]}
        label="Quality & Compliance"
        title="Quality"
        titleGold="Control"
        description="Three independent inspection phases on every order — pre-production, in-line and pre-shipment. Our QC team operates separately from the production factory to eliminate conflicts of interest."
        pills={["AQL Level II", "Independent QC Team", "95% First-Pass Rate"]}
      />

      {/* ── 2. Intro ──────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Why Independent QC Matters
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-5 leading-tight">
                A Factory Inspecting Its Own Work Is a Conflict of Interest
              </h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  When a factory inspects its own production, it has a financial incentive to pass the
                  order and ship on time. This structural conflict is the primary reason that factory
                  self-inspection is not reliable quality assurance.
                </p>
                <p>
                  Our quality control team is employed by MZ Global Trading — not by the production
                  factory. They have no financial relationship with the factory and no incentive to
                  pass an order that should fail. Their job is to protect your order, not the
                  factory&apos;s shipment schedule.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-3"
            >
              {[
                { icon: "✓", label: "Independent from production factory", detail: "No financial relationship with the factory" },
                { icon: "✓", label: "Three-phase inspection on every order", detail: "Pre-production, in-line and pre-shipment" },
                { icon: "✓", label: "Written report with photographic evidence", detail: "Provided for every pre-shipment inspection" },
                { icon: "✓", label: "AQL Level II standard", detail: "ISO 2859-1 sampling methodology" },
                { icon: "✓", label: "Defects classified by severity", detail: "Critical, major and minor — zero tolerance on critical" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={staggerItemVariants}
                  className="flex items-start gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-navy-900 font-semibold text-sm">{item.label}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Three Phases — tabbed ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Three-Phase QC
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              When We Inspect and What We Check
            </h2>
          </motion.div>

          {/* Phase tab selector */}
          <div className="flex flex-col sm:flex-row bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`flex-1 flex flex-col items-center py-4 px-3 text-center transition-colors duration-200 ${
                  activePhase === phase.id
                    ? "bg-navy-900 text-white"
                    : "text-gray-500 hover:text-navy-900 hover:bg-gray-50"
                }`}
              >
                <span className={`text-2xl font-bold leading-none mb-1 ${activePhase === phase.id ? "text-gold" : "text-gray-200"}`}>
                  {phase.num}
                </span>
                <span className={`font-bold text-sm ${activePhase === phase.id ? "text-white" : "text-navy-900"}`}>
                  {phase.title}
                </span>
                <span className="text-[10px] mt-0.5 leading-tight text-gray-400">
                  {phase.timing}
                </span>
              </button>
            ))}
          </div>

          {/* Phase content */}
          <AnimatePresence mode="wait">
            {phases.map((phase) =>
              phase.id === activePhase ? (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl border border-gray-100 p-7 sm:p-9"
                >
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{phase.desc}</p>
                  <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
                    What We Check at This Stage
                  </p>
                  <div className="grid sm:grid-cols-2 gap-y-2.5 gap-x-8">
                    {phase.checks.map((check) => (
                      <div key={check} className="flex items-start gap-3">
                        <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                        </span>
                        <span className="text-gray-600 text-sm leading-relaxed">{check}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── 4. AQL Standard ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Our Standard
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              AQL Defect Classification
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              We apply ISO 2859-1 AQL Level II across all pre-shipment inspections.
              Defects are classified by severity and assessed against the statistical acceptance number for the order size.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
          >
            <div className="grid grid-cols-3 bg-navy-900 px-6 py-4">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest">AQL Level</p>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest">Defect Type</p>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest">Acceptance</p>
            </div>
            {aqlTable.map((row, i) => (
              <div
                key={row.defect}
                className={`grid grid-cols-3 px-6 py-5 border-b border-gray-100 last:border-0 items-start gap-4 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
              >
                <div>
                  <p className="text-navy-900 font-bold text-base">{row.level}</p>
                </div>
                <div>
                  <p className="text-navy-900 font-bold text-sm mb-1">{row.defect}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{row.description}</p>
                </div>
                <div>
                  <p className={`font-semibold text-sm ${row.level === "0" ? "text-red-500" : "text-navy-900"}`}>
                    {row.acceptance}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-gray-400 text-xs mt-4 text-center"
          >
            Custom AQL thresholds can be agreed at the RFQ stage for buyers with stricter compliance requirements.
          </motion.p>
        </div>
      </section>

      {/* ── 5. Inspection Checklist Grid ─────────────────────────────────────── */}
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
              Pre-Shipment Checklist
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              What Every Inspection Covers
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {inspectionItems.map((group) => (
              <motion.div
                key={group.category}
                variants={staggerItemVariants}
                className="bg-white rounded-xl border border-gray-100 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
                  </div>
                  <h3 className="text-navy-900 font-bold text-sm">{group.category}</h3>
                </div>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1 flex-shrink-0 w-3.5 h-3.5 rounded-full bg-gold/15 flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-gold" aria-hidden="true" />
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

      {/* ── 6. Issue Resolution ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              When Issues Arise
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              How We Respond to Defects
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Every defect scenario has a defined response. Buyers are never left without information — the protocol below is followed consistently across all orders.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-3 gap-5"
          >
            {issueResolution.map((res) => (
              <motion.div
                key={res.title}
                variants={staggerItemVariants}
                className={`rounded-2xl border p-6 ${res.bg}`}
              >
                <h3 className={`font-bold text-base mb-3 ${res.color}`}>{res.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{res.desc}</p>
                <div className="bg-white rounded-lg px-4 py-3">
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Outcome</p>
                  <p className="text-navy-900 font-semibold text-sm">{res.outcome}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. Explore Quality & Compliance ──────────────────────────────────── */}
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

      {/* ── 8. Certifications ────────────────────────────────────────────────── */}
      <CertificationsStrip />

      {/* ── 9. CTA ───────────────────────────────────────────────────────────── */}
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
              Zero-Compromise Quality
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Source With Independent QC on Every Order
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              Pre-production sign-off, in-line inspection and a full AQL pre-shipment report — included on every
              order, not billed as an add-on.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Request a Quote →
              </Link>
              <Link
                href="/qualitycompliance/inspectionprocess/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                View Inspection Process
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
