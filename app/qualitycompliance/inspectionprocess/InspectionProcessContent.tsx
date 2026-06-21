"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "@/lib/motion-shim";
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

const inspectionSteps = [
  {
    num: "01",
    title: "Order Specification Lock",
    timing: "Before production begins",
    category: "Pre-Production",
    desc: "The buyer-approved Tech Pack, measurement specifications, material standards and packaging requirements are documented and distributed to the factory. No bulk production begins without written confirmation that all specifications are received and understood.",
    who: "Account Manager + QC Team",
    output: "Signed Tech Pack acknowledgement from factory",
  },
  {
    num: "02",
    title: "Pre-Production Sample Sign-Off",
    timing: "Before bulk cutting",
    category: "Pre-Production",
    desc: "A pre-production sample is produced and submitted for approval before bulk fabric is cut. Measurements, construction, material and finishing are verified against the approved specification. Bulk production does not begin until the buyer signs off the pre-production sample.",
    who: "QC Team + Buyer Approval",
    output: "Written sample approval with measurement report",
  },
  {
    num: "03",
    title: "Fabric & Material Inspection",
    timing: "On material receipt at factory",
    category: "Pre-Production",
    desc: "Bulk fabric and trims are inspected against the approved lab dip and specification before cutting begins. GSM, composition, colour consistency and shrinkage are verified. Fabric that does not meet the standard is rejected before it enters production.",
    who: "QC Team (on-site at factory)",
    output: "Fabric inspection record with GSM and colour sign-off",
  },
  {
    num: "04",
    title: "In-Line Inspection",
    timing: "At 20–30% production completion",
    category: "In Production",
    desc: "When 20–30% of the order is complete, our QC inspector visits the factory floor. Items are checked for workmanship, measurements, colour consistency and construction. Issues identified at this stage can still be corrected across the remaining production run.",
    who: "Independent QC Inspector",
    output: "In-line inspection report with defect log and corrective actions",
  },
  {
    num: "05",
    title: "Pre-Shipment AQL Inspection",
    timing: "At 80–100% production completion",
    category: "Pre-Shipment",
    desc: "A comprehensive AQL Level II inspection conducted on a statistically representative sample drawn from the finished and packed goods. Critical, major and minor defects are classified and counted against the AQL acceptance threshold. The shipment is only released if the result is PASS.",
    who: "Independent QC Inspector",
    output: "Full inspection report with defect photos, AQL result and pass/fail determination",
  },
  {
    num: "06",
    title: "Packing & Labelling Verification",
    timing: "During pre-shipment inspection",
    category: "Pre-Shipment",
    desc: "All carton markings, individual packaging, barcodes, country of origin labels and care labels are verified against the buyer's packaging specification. Quantity counts are confirmed against the packing list. Barcode scans are verified where applicable.",
    who: "QC Inspector",
    output: "Packing verification checklist included in inspection report",
  },
  {
    num: "07",
    title: "Container Loading Supervision",
    timing: "On loading day",
    category: "Export",
    desc: "Where required, our team supervises container stuffing at the factory. We verify that only inspected and approved cartons are loaded, that the container is sealed correctly and that the seal number is documented. Discrepancies between the packing list and physical count are flagged before the container leaves the factory.",
    who: "QC Inspector or Logistics Coordinator",
    output: "Container seal number, loading photos and final count confirmation",
  },
  {
    num: "08",
    title: "Export Documentation Review",
    timing: "Before shipment departure",
    category: "Export",
    desc: "All export documentation — commercial invoice, packing list, bill of lading, certificate of origin and any required compliance documents — is reviewed for accuracy before the shipment departs. Errors in export documents cause customs delays that cannot be undone after departure.",
    who: "Account Manager",
    output: "Document set confirmed and shared with buyer",
  },
];

const categoryColors: Record<string, string> = {
  "Pre-Production": "bg-blue-100 text-blue-700",
  "In Production": "bg-amber-100 text-amber-700",
  "Pre-Shipment": "bg-purple-100 text-purple-700",
  "Export": "bg-green-100 text-green-700",
};

const reportSections = [
  { title: "Order Reference & Date", desc: "Factory name, order number, buyer reference, inspection date and QC inspector name." },
  { title: "Sample Size & Methodology", desc: "AQL level applied, sample size drawn, inspection standard (ISO 2859-1)." },
  { title: "Defect Summary", desc: "Count of critical, major and minor defects found — broken down by defect type." },
  { title: "Measurement Report", desc: "Measurements taken across the sample set — actual vs. specification with pass/fail per size." },
  { title: "Photographic Evidence", desc: "Photos of all defects identified, packing configuration, labels and any non-conformances." },
  { title: "AQL Result", desc: "PASS or FAIL determination with the acceptance number and actual defect count recorded." },
  { title: "Corrective Action Requirements", desc: "Where a conditional PASS or FAIL is issued, required corrective actions are documented with timeline." },
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
    image: "/images/menu/menu-certifications.webp",
    alt: "International textile certifications — certified factory network at MZ Global Trading",
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
    desc: "Three-phase independent QC on every order — pre-production, in-line and AQL pre-shipment inspection.",
    image: "/images/menu/menu-qualitycontrol.webp",
    alt: "Quality control inspection — independent QC process at MZ Global Trading",
    href: "/qualitycompliance/qualitycontrol/",
    cta: "Our QC Process",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function InspectionProcessContent() {
  return (
    <>

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-our-process.webp"
        imageAlt="Textile inspection process — step-by-step shipment verification before export from Pakistan"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Quality & Compliance" },
          { label: "Inspection Process" },
        ]}
        label="Quality & Compliance"
        title="Inspection"
        titleGold="Process"
        description="Eight stages from specification lock to container loading supervision. Every shipment is verified against your approved specifications before it leaves Pakistan."
        pills={["8-Stage Process", "AQL Level II", "Written Reports + Photos"]}
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
                The Principle
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-5 leading-tight">
                Problems Found at Origin Cost a Fraction of Problems Found at Destination
              </h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  The cost of fixing a defect before shipment is a fraction of what it costs after the
                  container has arrived at your warehouse — or after it has been distributed to retail.
                  Rework, re-shipment, returns, chargebacks and brand damage all compound the original
                  production error into something far more expensive.
                </p>
                <p>
                  Our inspection process is designed to find problems at the earliest possible stage —
                  before they are replicated across the production run, before they are packed into
                  cartons and before they are loaded onto a container.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { val: "8", label: "Inspection Stages", desc: "Spec lock to container loading" },
                { val: "3", label: "Independent Interventions", desc: "Pre-production, in-line, pre-shipment" },
                { val: "100%", label: "Written Reports", desc: "Every pre-shipment inspection documented" },
                { val: "AQL II", label: "Sampling Standard", desc: "ISO 2859-1 methodology" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={staggerItemVariants}
                  className="bg-gray-50 rounded-xl p-5 text-center border border-gray-100"
                >
                  <p className="text-2xl font-bold text-navy-900 leading-none mb-1">{s.val}</p>
                  <p className="text-gold text-[10px] font-semibold uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. 8-Step Process ─────────────────────────────────────────────────── */}
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
              Stage by Stage
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              8 Inspection Stages
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Every stage is documented. Every result is shared with the buyer. No stage is skipped.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[43px] top-10 bottom-10 w-px border-l-2 border-dashed border-gold/20 hidden sm:block" />

            <div className="space-y-5">
              {inspectionSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="relative flex gap-6"
                >
                  <div className="flex-shrink-0 relative z-10 w-[88px] flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 rounded-full bg-navy-900 flex items-center justify-center border-2 border-navy-800">
                      <span className="text-gold font-bold text-sm">{step.num}</span>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${categoryColors[step.category]}`}>
                      {step.category}
                    </span>
                  </div>

                  <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 hover:border-gold/30 hover:shadow-sm transition-all duration-200 mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <h3 className="text-navy-900 font-bold text-base">{step.title}</h3>
                      <span className="flex-shrink-0 text-gray-400 text-xs bg-gray-50 px-2.5 py-1 rounded-full">{step.timing}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.desc}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Conducted By</p>
                        <p className="text-navy-900 text-sm font-medium">{step.who}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Output</p>
                        <p className="text-navy-900 text-sm font-medium">{step.output}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Inspection Report ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Full Transparency
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-5 leading-tight">
                What Every Inspection Report Contains
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Every pre-shipment inspection generates a written report shared with the buyer before
                the shipment is released. The report is self-contained — a buyer reading it without prior
                context can verify the quality outcome independently.
              </p>
              <div className="bg-navy-900 rounded-xl p-6">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Report Formats Provided</p>
                <ul className="space-y-2.5">
                  {["PDF inspection report (printable, archivable)", "Photographic evidence pack (ZIP file)", "Defect log spreadsheet (sortable by type/severity)", "Measurement report (Excel format)"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                      </span>
                      <span className="text-gray-300 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-3"
            >
              {reportSections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-navy-900 flex items-center justify-center mt-0.5">
                    <span className="text-gold text-[10px] font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <p className="text-navy-900 font-semibold text-sm">{section.title}</p>
                    <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{section.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Pass / Fail Outcomes ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Inspection Outcomes
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
              Pass, Conditional Pass or Fail — Never Ambiguous
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-3 gap-5"
          >
            {[
              {
                result: "PASS",
                pill: "bg-green-600 text-white",
                bg: "bg-green-50 border border-green-100",
                desc: "Defect count is within the AQL acceptance number for both major and minor categories. No critical defects found.",
                next: "Shipment is released. Container loading may proceed.",
              },
              {
                result: "CONDITIONAL PASS",
                pill: "bg-amber-500 text-white",
                bg: "bg-amber-50 border border-amber-100",
                desc: "Minor sortable defects found above the threshold. The factory must 100% sort and repack affected units before release.",
                next: "Buyer is notified. Re-inspection booked within 48 hours.",
              },
              {
                result: "FAIL",
                pill: "bg-red-600 text-white",
                bg: "bg-red-50 border border-red-100",
                desc: "Major or critical defect count exceeds AQL threshold, or critical defects are found. Shipment is held immediately.",
                next: "Buyer escalation. Root cause analysis required. Factory bears rework costs.",
              },
            ].map((outcome) => (
              <motion.div
                key={outcome.result}
                variants={staggerItemVariants}
                className={`rounded-2xl p-6 ${outcome.bg}`}
              >
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4 ${outcome.pill}`}>
                  {outcome.result}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{outcome.desc}</p>
                <div className="bg-white rounded-lg px-4 py-3">
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">What Happens Next</p>
                  <p className="text-navy-900 font-semibold text-sm">{outcome.next}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. Explore Quality & Compliance ──────────────────────────────────── */}
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
              Source With Confidence
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Every Shipment Inspected Before It Leaves Pakistan
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              An 8-stage inspection process and a written report on every order — included as standard,
              not billed as an optional extra.
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
                Our QC Process
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
