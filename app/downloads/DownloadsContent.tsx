"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  viewportOnce,
} from "@/lib/animations";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocCategory = "all" | "company" | "quality" | "technical" | "trade";
type DocKind = "Reference" | "Checklist" | "Template" | "Policy";

interface DocumentCard {
  id: number;
  slug: string;
  category: Exclude<DocCategory, "all">;
  kind: DocKind;
  title: string;
  description: string;
  length: string;
  popular?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const docCategories: { id: DocCategory; label: string }[] = [
  { id: "all", label: "All Documents" },
  { id: "company", label: "Company" },
  { id: "quality", label: "Quality & Compliance" },
  { id: "technical", label: "Technical" },
  { id: "trade", label: "Shipping & Trade" },
];

const documents: DocumentCard[] = [
  {
    id: 1,
    slug: "company-profile",
    category: "company",
    kind: "Reference",
    title: "Company Profile",
    description: "Full company overview — sourcing capabilities, product categories, certifications, process and contact details. Share with stakeholders before placing an order.",
    length: "5 min read",
    popular: true,
  },
  {
    id: 2,
    slug: "factory-network-overview",
    category: "company",
    kind: "Reference",
    title: "Factory Network Overview",
    description: "How our vetted factory network is structured — product specialisations by cluster, certification coverage and the five-step qualification process.",
    length: "4 min read",
  },
  {
    id: 3,
    slug: "sustainable-sourcing-policy",
    category: "company",
    kind: "Policy",
    title: "Sustainable Sourcing Policy",
    description: "Our documented commitments on environmental responsibility, ethical labour standards and restricted substance compliance across the supply chain.",
    length: "4 min read",
  },
  {
    id: 4,
    slug: "pre-shipment-inspection-checklist",
    category: "quality",
    kind: "Checklist",
    title: "Pre-Shipment Inspection Checklist",
    description: "Comprehensive AQL Level II pre-shipment checklist covering workmanship, measurements, colour, packing and documentation — for buyers and QC teams.",
    length: "40+ check items",
    popular: true,
  },
  {
    id: 5,
    slug: "aql-reference-table",
    category: "quality",
    kind: "Reference",
    title: "AQL Level II Reference Table",
    description: "ISO 2859-1 sampling table — sample sizes, acceptance and rejection numbers by lot size for Critical (0), Major (2.5) and Minor (4.0) defect classes.",
    length: "Full sampling table",
  },
  {
    id: 6,
    slug: "supplier-evaluation-matrix",
    category: "quality",
    kind: "Reference",
    title: "Supplier Evaluation Criteria Matrix",
    description: "The full scoring matrix used during factory onboarding — production capability, certifications, quality systems and social compliance, with scoring bands.",
    length: "3 min read",
  },
  {
    id: 7,
    slug: "restricted-substances-list",
    category: "quality",
    kind: "Reference",
    title: "Restricted Substances List (RSL)",
    description: "Reference list of prohibited and restricted chemical groups in compliance with REACH, CPSIA, OEKO-TEX and market regulations for the USA, EU and UK.",
    length: "13 substance groups",
  },
  {
    id: 8,
    slug: "tech-pack-template-apparel",
    category: "technical",
    kind: "Template",
    title: "Tech Pack Template — Apparel",
    description: "Structured, printable Tech Pack template for apparel — BOM, measurement chart with tolerances, construction, artwork, colourways, packing and QC requirements.",
    length: "9 sections",
    popular: true,
  },
  {
    id: 9,
    slug: "tech-pack-template-home-textiles",
    category: "technical",
    kind: "Template",
    title: "Tech Pack Template — Home Textiles",
    description: "Printable Tech Pack template for home textiles — fabric and weave spec, size tables, decoration, colourways, finishing, set composition and packing.",
    length: "8 sections",
  },
  {
    id: 10,
    slug: "gsm-thread-count-reference",
    category: "technical",
    kind: "Reference",
    title: "GSM & Thread Count Reference Guide",
    description: "Quick-reference charts mapping GSM and thread count ranges to product applications — apparel, home textiles and bed linen — with verification methods.",
    length: "4 reference tables",
  },
  {
    id: 11,
    slug: "incoterms-quick-reference",
    category: "trade",
    kind: "Reference",
    title: "Incoterms 2020 Quick Reference",
    description: "EXW, FOB, CFR and CIF at a glance — responsibility matrix, risk transfer points, selection guide and the naming rules that prevent disputes.",
    length: "3 reference tables",
  },
  {
    id: 12,
    slug: "export-documentation-checklist",
    category: "trade",
    kind: "Checklist",
    title: "Export Documentation Checklist",
    description: "Every document a shipment needs and what to verify on each — commercial set, origin preferences, compliance certificates and pre-arrival actions.",
    length: "25+ check items",
  },
];

const kindStyles: Record<DocKind, { pill: string; icon: string }> = {
  Reference: { pill: "bg-blue-50 text-blue-700 border border-blue-100", icon: "bg-blue-100 text-blue-700" },
  Checklist: { pill: "bg-emerald-50 text-emerald-700 border border-emerald-100", icon: "bg-emerald-100 text-emerald-700" },
  Template: { pill: "bg-amber-50 text-amber-700 border border-amber-100", icon: "bg-amber-100 text-amber-700" },
  Policy: { pill: "bg-violet-50 text-violet-700 border border-violet-100", icon: "bg-violet-100 text-violet-700" },
};

function KindIcon({ kind, className }: { kind: DocKind; className?: string }) {
  switch (kind) {
    case "Checklist":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    case "Template":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      );
    case "Policy":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DownloadsContent() {
  const [activeCategory, setActiveCategory] = useState<DocCategory>("all");

  const filtered = documents.filter(
    (d) => activeCategory === "all" || d.category === activeCategory
  );

  const popularDocs = documents.filter((d) => d.popular);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-our-process.webp"
        imageAlt="MZ Global Trading document library — inspection checklists, templates and trade references for textile buyers"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Corporate" },
          { label: "Downloads" },
        ]}
        label="Resources"
        title="Document"
        titleGold="Library"
        description="Inspection checklists, Tech Pack templates, AQL tables and trade references — read online, then print or save any document as a branded PDF."
        pills={["12 Documents", "4 Categories", "Print or Save as PDF"]}
      />

      {/* ── Intro ─────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                How It Works
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-4 leading-tight">
                Every Document, Instantly — No Email Required
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Each document opens as a full page on this site — checklists, reference tables and
                fill-in templates included. Open any document and use{" "}
                <strong className="text-navy-900">Print / Save as PDF</strong> to get a branded,
                watermarked copy for your records, your QC team or your stakeholders.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                All documents are free to use. Need something product-specific — a size chart, a
                compliance summary for your market, a custom checklist? Ask us via the contact page
                and we&apos;ll prepare it.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { num: "12", label: "Documents", sub: "Across 4 categories" },
                { num: "0", label: "Wait Time", sub: "Read instantly online" },
                { num: "PDF", label: "Print Ready", sub: "Branded & watermarked" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={staggerItemVariants}
                  className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"
                >
                  <p className="text-2xl font-bold text-navy-900 leading-none mb-1">{s.num}</p>
                  <p className="text-gold text-[9px] font-bold uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-gray-500 text-xs leading-snug">{s.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Popular section ───────────────────────────────────────────────────── */}
      <section className="py-10 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-white font-bold text-sm flex-shrink-0">Most Used:</p>
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-wrap gap-3"
            >
              {popularDocs.map((doc) => (
                <motion.div key={doc.id} variants={staggerItemVariants}>
                  <Link
                    href={`/downloads/${doc.slug}/`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-xs font-medium transition-colors"
                  >
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${kindStyles[doc.kind].icon}`}
                    >
                      <KindIcon kind={doc.kind} className="w-3.5 h-3.5" />
                    </span>
                    {doc.title}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Document library ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category filter */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-10 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter documents by category"
          >
            {docCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-navy-900 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-navy-900 hover:text-navy-900"
                }`}
              >
                {cat.label}
                <span className={`ml-2 text-xs ${activeCategory === cat.id ? "text-gold" : "text-gray-400"}`}>
                  {cat.id === "all"
                    ? documents.length
                    : documents.filter((d) => d.category === cat.id).length}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Cards grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-md transition-all flex flex-col"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${kindStyles[doc.kind].icon}`}
                      >
                        <KindIcon kind={doc.kind} className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        {doc.popular && (
                          <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-wider rounded-full">
                            Popular
                          </span>
                        )}
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${kindStyles[doc.kind].pill}`}>
                          {doc.kind}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-navy-900 font-bold text-base mb-2 leading-snug group-hover:text-gold transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">
                      {doc.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <span className="text-gray-400 text-xs">{doc.length}</span>
                      <Link
                        href={`/downloads/${doc.slug}/`}
                        className="inline-flex items-center gap-1.5 text-navy-900 text-xs font-bold hover:text-gold transition-colors group/btn"
                        aria-label={`View and print ${doc.title}`}
                      >
                        View &amp; Print
                        <svg
                          className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
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
              Need Something Specific?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Request a Custom Document
            </h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
              Size charts, market-specific compliance summaries, custom QC checklists — tell us what
              your team needs and we&apos;ll prepare it for your program.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Contact Us →
              </Link>
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                Submit an RFQ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
