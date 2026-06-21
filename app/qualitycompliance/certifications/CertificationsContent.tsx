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

const certifications = [
  {
    name: "GOTS",
    fullName: "Global Organic Textile Standard",
    image: "/images/certs/cert-gots.webp",
    alt: "GOTS Global Organic Textile Standard certified",
    covers: "Certifies textiles made from a minimum of 70% organic fibres, with strict social and environmental processing criteria applied at every stage of production.",
    buyerValue: "Required by brands sourcing organic cotton apparel, bed linen or baby products. Widely demanded by European and North American retail buyers.",
    tags: ["Organic Fibres", "Environmental", "Social Compliance"],
  },
  {
    name: "OEKO-TEX",
    fullName: "OEKO-TEX Standard 100",
    image: "/images/certs/cert-oeko-tex.webp",
    alt: "OEKO-TEX Standard 100 certified textile",
    covers: "Tests every component of a finished textile product — including threads, buttons and zips — for harmful substances. Certification classes correspond to the sensitivity of end use (Class 1 for baby items).",
    buyerValue: "Essential for products with direct skin contact — towels, bedding, baby garments. Accepted as the global benchmark for textile safety testing.",
    tags: ["Harmful Substance Testing", "All Classes", "Consumer Safety"],
  },
  {
    name: "BSCI",
    fullName: "Business Social Compliance Initiative",
    image: "/images/certs/cert-bsci.webp",
    alt: "BSCI Business Social Compliance Initiative certified factory",
    covers: "A social compliance audit programme assessing factories against 13 performance areas including workers' rights, fair remuneration, safe working conditions and no child labour.",
    buyerValue: "Mandatory for supply chain compliance in most European markets. A BSCI-audited factory report is commonly required by retail buyers at the RFQ stage.",
    tags: ["Labour Rights", "Working Conditions", "European Standard"],
  },
  {
    name: "Sedex / SMETA",
    fullName: "Supplier Ethical Data Exchange",
    image: "/images/certs/cert-sedex.webp",
    alt: "Sedex SMETA supplier ethical data exchange certified",
    covers: "A shared platform for ethical trade data. SMETA audit covers four pillars — labour standards, health & safety, environment and business ethics.",
    buyerValue: "Preferred by UK and Australian retailers. SMETA audit results are shared across the Sedex platform, reducing duplicative audit burden for verified factories.",
    tags: ["Ethical Trade", "4-Pillar Audit", "UK & Europe"],
  },
  {
    name: "ISO 9001",
    fullName: "ISO 9001 Quality Management System",
    image: "/images/certs/cert-iso-9001.webp",
    alt: "ISO 9001 quality management system certified manufacturer",
    covers: "International standard for quality management systems — certifying documented procedures, process controls, customer focus and a framework for continuous improvement.",
    buyerValue: "Demonstrates systematic quality management rather than ad-hoc inspection. Buyers using ISO 9001 factories reduce quality risk because processes are embedded, not person-dependent.",
    tags: ["Quality Management", "Process Control", "Continuous Improvement"],
  },
  {
    name: "GRS",
    fullName: "Global Recycled Standard",
    image: "/images/certs/cert-grs.webp",
    alt: "GRS Global Recycled Standard certified textile manufacturer",
    covers: "Certifies the recycled content of finished products — minimum 20% for product labelling, 50% for a full GRS claim. Covers the entire supply chain from recycled input to final product.",
    buyerValue: "Required for brands making recycled content claims on packaging or marketing. Growing demand from sustainability-focused buyers across the USA and Europe.",
    tags: ["Recycled Content", "Sustainability", "Chain of Custody"],
  },
  {
    name: "WRAP",
    fullName: "Worldwide Responsible Accredited Production",
    image: "/images/certs/cert-wrap.webp",
    alt: "WRAP Worldwide Responsible Accredited Production certified",
    covers: "A US-focused social compliance certification covering 12 principles including local law compliance, prohibition of forced and child labour, safe working conditions and environmental responsibility.",
    buyerValue: "Widely recognised in the North American market. WRAP-certified factories are commonly required by US importers and retail buyers sourcing from Asia and South Asia.",
    tags: ["Social Compliance", "US Market", "12 Principles"],
  },
  {
    name: "BCI",
    fullName: "Better Cotton Initiative",
    image: "/images/certs/cert-bci.webp",
    alt: "Better Cotton Initiative BCI certified cotton sourcing",
    covers: "A global programme that trains cotton farmers to use water efficiently, care for soil health, preserve natural habitats and apply responsible use of crop protection chemicals.",
    buyerValue: "Not a product label — BCI is a supply chain membership allowing brands to claim sustainable cotton sourcing. Increasingly required in retailer supplier codes of conduct.",
    tags: ["Sustainable Cotton", "Farmer Training", "Supply Chain"],
  },
  {
    name: "SA8000",
    fullName: "Social Accountability 8000",
    image: "/images/certs/cert-sa8000.webp",
    alt: "SA8000 Social Accountability 8000 certified factory Pakistan",
    covers: "One of the world's most rigorous social accountability standards — based on ILO conventions and covering child labour, forced labour, health & safety, freedom of association, discrimination, working hours and fair remuneration.",
    buyerValue: "The most demanding social certification in the textile industry. Factories holding SA8000 are preferred by institutional buyers and brands with publicly committed supply chain transparency.",
    tags: ["Highest Standard", "ILO Conventions", "Worker Rights"],
  },
  {
    name: "Bluesign",
    fullName: "Bluesign System Partner",
    image: "/images/certs/cert-bluesign.webp",
    alt: "Bluesign system partner certified responsible textile manufacturing",
    covers: "A process-focused certification for responsible use of resources — chemicals, energy, water and air — in textile wet processing. Bluesign-certified facilities have the lowest environmental impact in their class.",
    buyerValue: "Increasingly demanded by performance and outdoor brands (sportswear, activewear, outdoor gear). Demonstrates that dyeing and finishing processes meet the highest environmental standards.",
    tags: ["Chemical Safety", "Water & Energy", "Performance Brands"],
  },
];

const accessSteps = [
  {
    num: "01",
    title: "Specify Your Requirements",
    desc: "Include certification requirements in your RFQ — specify the standard, scope (product or facility) and whether a current certificate or full audit report is required.",
  },
  {
    num: "02",
    title: "Factory Matching",
    desc: "We shortlist factories whose current certifications match your compliance requirements. Certification status is verified before any factory is recommended.",
  },
  {
    num: "03",
    title: "Documentation Provided",
    desc: "Current certificates, audit reports and scope documents are provided at the pre-production stage. Additional documentation is available on request.",
  },
  {
    num: "04",
    title: "Renewal Monitoring",
    desc: "We track certification renewal dates across the network. If a certificate lapses before or during your order, you are notified immediately with alternative factory options.",
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
    title: "Supplier Evaluation",
    desc: "How we vet and onboard every factory through our 4-stage evaluation process before placing your first order.",
    image: "/images/hero/hero-supplier-evaluation.webp",
    alt: "Factory supplier evaluation process — MZ Global Trading vetting criteria",
    href: "/qualitycompliance/supplierevaluation/",
    cta: "Our Evaluation Process",
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

export default function CertificationsContent() {
  return (
    <>

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-certifications.webp"
        imageAlt="Certified textile factory network — GOTS, OEKO-TEX, BSCI and ISO 9001 certified manufacturers in Pakistan"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Quality & Compliance" },
          { label: "Certifications" },
        ]}
        label="Quality & Compliance"
        title="International"
        titleGold="Certifications"
        description="Every factory in our network is independently certified to internationally recognised standards. Certification documentation is available on request at the pre-production stage."
        pills={["GOTS Certified", "OEKO-TEX", "BSCI & Sedex", "SA8000", "ISO 9001"]}
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
                Why Certifications Matter
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-5 leading-tight">
                Compliance You Can Verify — Not Just Claim
              </h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  A certification claim without documentation is not compliance — it is a liability.
                  International buyers importing into USA, UK and Europe face increasing regulatory
                  and corporate due diligence requirements that demand verified, audited proof of
                  supply chain standards.
                </p>
                <p>
                  Every factory in the MZ Global Trading network holds current, independently audited
                  certifications covering quality management, social accountability, environmental
                  standards and product safety. We match your compliance requirements to the right
                  factory before production begins — never after.
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
                { label: "10+", desc: "Certifications available" },
                { label: "50+", desc: "Vetted certified factories" },
                { label: "100%", desc: "Documentation on request" },
                { label: "Annual", desc: "Renewal monitoring" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={staggerItemVariants}
                  className="bg-gray-50 rounded-xl p-5 text-center border border-gray-100"
                >
                  <p className="text-3xl font-bold text-navy-900">{s.label}</p>
                  <p className="text-gray-500 text-sm mt-1">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Certifications Grid ───────────────────────────────────────────── */}
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
              Our Certification Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              10 International Standards
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 gap-6"
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-gold/30 hover:shadow-md transition-all duration-200"
              >
                {/* Header row */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="shrink-0 bg-white border border-gray-100 rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ width: 100, height: 60 }}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.alt}
                      width={96}
                      height={56}
                      className="object-contain w-full h-full"
                      sizes="100px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-navy-900 font-bold text-base leading-tight">{cert.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-snug">{cert.fullName}</p>
                  </div>
                </div>

                {/* Covers */}
                <div className="mb-3">
                  <p className="text-gold text-[10px] font-semibold uppercase tracking-widest mb-1.5">What It Certifies</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{cert.covers}</p>
                </div>

                {/* Buyer value */}
                <div className="mb-4">
                  <p className="text-gold text-[10px] font-semibold uppercase tracking-widest mb-1.5">Why Buyers Require It</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{cert.buyerValue}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 bg-navy-900/5 text-navy-900 text-[10px] font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. How to Access Docs ─────────────────────────────────────────────── */}
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
              Documentation
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              How to Request Certification Documents
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Certification documentation is provided at the pre-production stage as standard — no additional process required.
            </p>
          </motion.div>

          {/* Desktop: horizontal stepper */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="hidden md:flex items-start gap-0 mb-12"
          >
            {accessSteps.map((step, i) => (
              <div key={step.num} className="flex items-start flex-1">
                <motion.div
                  variants={staggerItemVariants}
                  className="flex flex-col items-center text-center shrink-0 w-full group"
                >
                  <div className="w-14 h-14 rounded-full bg-navy-900 border-2 border-navy-800 flex items-center justify-center mb-5 group-hover:border-gold transition-colors duration-300">
                    <span className="text-gold font-bold text-sm">{step.num}</span>
                  </div>
                  <h3 className="text-navy-900 font-bold text-sm mb-2 px-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed px-2">{step.desc}</p>
                </motion.div>
                {i < accessSteps.length - 1 && (
                  <div className="shrink-0 w-8 mt-[26px]">
                    <div className="border-t-2 border-dashed border-gold/25 w-full" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Mobile: vertical stepper */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:hidden relative mb-10"
          >
            <div className="absolute top-5 bottom-5 left-5 w-px border-l-2 border-dashed border-gold/20" />
            <div className="space-y-8">
              {accessSteps.map((step) => (
                <motion.div key={step.num} variants={staggerItemVariants} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-navy-900 border-2 border-navy-800 flex items-center justify-center shrink-0 relative z-10">
                    <span className="text-gold font-bold text-xs">{step.num}</span>
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-navy-900 font-bold text-sm mb-1">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-navy-900 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Need compliance documentation before submitting an RFQ?</p>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                Contact us with the certification standards your supply chain requires and we will confirm
                which factories hold current, valid certifications for your product category.
              </p>
            </div>
            <Link
              href="/contact-us/"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors"
            >
              Contact Us →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 5. Explore Quality & Compliance ──────────────────────────────────── */}
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

      {/* ── 6. Certifications Strip ──────────────────────────────────────────── */}
      <CertificationsStrip />

      {/* ── 7. CTA ───────────────────────────────────────────────────────────── */}
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
              Ready to Source From Certified Factories?
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              Tell us your product requirements and compliance standards — we will match you with the right
              certified factory from our network.
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
