"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import PageHero from "@/components/PageHero";
import {
  fadeUpVariants,
  staggerContainerVariants,
  viewportOnce,
} from "@/lib/animations";

// ─── Local animation variants (new, site-unique) ──────────────────────────────

const numReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.8 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── Types ────────────────────────────────────────────────────────────────────

type GuideCategory = "all" | "sourcing" | "quality" | "compliance" | "logistics" | "technical";

const guideCategories: { id: GuideCategory; label: string }[] = [
  { id: "all", label: "All Guides" },
  { id: "sourcing", label: "Sourcing" },
  { id: "quality", label: "Quality" },
  { id: "compliance", label: "Compliance" },
  { id: "logistics", label: "Logistics" },
  { id: "technical", label: "Technical" },
];

interface Guide {
  num: string;
  slug: string;
  catId: GuideCategory;
  featured?: boolean;
  category: string;
  categoryPill: string;
  accentBar: string;
  title: string;
  description: string;
  topics: string[];
  readTime: string;
  wide?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const guides: Guide[] = [
  {
    num: "01",
    slug: "pakistan-textile-sourcing-guide",
    catId: "sourcing",
    featured: true,
    category: "Sourcing Strategy",
    categoryPill: "bg-blue-50 text-blue-700 border border-blue-200",
    accentBar: "bg-gold",
    title: "The Complete Buyer's Guide to Sourcing Textiles from Pakistan",
    description:
      "Everything a procurement manager needs to evaluate Pakistan as a sourcing destination — factory selection, certifications, quality control, logistics and payment terms.",
    topics: ["Why Pakistan — advantages vs. alternatives", "The 4-stage ordering process", "Logistics, payment terms and risk management"],
    readTime: "18 min read",
    wide: true,
  },
  {
    num: "02",
    slug: "aql-pre-shipment-inspection",
    catId: "quality",
    category: "Quality",
    categoryPill: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    accentBar: "bg-emerald-400",
    title: "Understanding AQL: Pre-Shipment Inspection for Importers",
    description:
      "ISO 2859-1 AQL Level II explained in plain language — sample sizes, defect classifications, acceptance numbers and what a PASS and FAIL means for your shipment release.",
    topics: ["Critical vs Major vs Minor defects", "Sample size calculation by lot size", "How to read an inspection report"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "03",
    slug: "textile-certifications-explained",
    catId: "compliance",
    category: "Compliance",
    categoryPill: "bg-violet-50 text-violet-700 border border-violet-200",
    accentBar: "bg-violet-400",
    title: "GOTS, OEKO-TEX, BSCI and ISO 9001 Explained",
    description:
      "The key certifications that matter for textile buyers — what each covers, how to verify them and which you need for your market.",
    topics: ["Certification scope and what it verifies", "How to verify certificates independently", "Which certification suits your product"],
    readTime: "10 min read",
    wide: false,
  },
  {
    num: "04",
    slug: "incoterms-for-textile-buyers",
    catId: "logistics",
    category: "Logistics",
    categoryPill: "bg-amber-50 text-amber-700 border border-amber-200",
    accentBar: "bg-amber-400",
    title: "Incoterms 2020: EXW, FOB, CIF and CFR for Textile Buyers",
    description:
      "Visual walkthrough of the four incoterms most used in textile trade — cost split, risk transfer and the correct use case for each.",
    topics: ["Cost and risk responsibility per term", "Why FOB is preferred for textile orders", "Common errors first-time importers make"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "05",
    slug: "how-to-write-a-tech-pack",
    catId: "technical",
    category: "Technical",
    categoryPill: "bg-slate-100 text-slate-700 border border-slate-200",
    accentBar: "bg-slate-500",
    title: "How to Write a Tech Pack for Garment and Home Textile Manufacturing",
    description:
      "Step-by-step structure for a factory-ready Tech Pack — BOM, measurements, construction spec, print placement, finishing and packaging.",
    topics: ["Bill of materials and fabric spec", "Measurement tolerances by garment type", "Artwork and print placement standards"],
    readTime: "12 min read",
    wide: false,
  },
  {
    num: "06",
    slug: "gsm-fabric-weight-guide",
    catId: "technical",
    category: "Technical",
    categoryPill: "bg-slate-100 text-slate-700 border border-slate-200",
    accentBar: "bg-slate-500",
    title: "GSM Reference Guide: Choosing the Right Fabric Weight",
    description:
      "Quick-reference chart mapping GSM ranges to product applications — apparel, home textiles and fabric — with end-use recommendations.",
    topics: ["GSM ranges by product type", "How GSM affects cost and drape", "Thread count vs GSM for bed linen"],
    readTime: "6 min read",
    wide: false,
  },
  {
    num: "07",
    slug: "pakistan-vs-bangladesh-vs-china",
    catId: "sourcing",
    category: "Sourcing",
    categoryPill: "bg-blue-50 text-blue-700 border border-blue-200",
    accentBar: "bg-blue-400",
    title: "Pakistan vs Bangladesh vs China: Textile Sourcing Compared",
    description:
      "Objective comparison across cost, lead time, certification availability, MOQ and product specialisation — with a decision matrix for buyers.",
    topics: ["Cost comparison by category (2025)", "Certification depth comparison", "Product specialisation by country"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "08",
    slug: "first-shipment-checklist",
    catId: "sourcing",
    category: "Sourcing",
    categoryPill: "bg-blue-50 text-blue-700 border border-blue-200",
    accentBar: "bg-blue-400",
    title: "First Shipment Checklist: Step-by-Step for New Importers",
    description:
      "A complete pre-shipment preparation checklist for buyers placing their first bulk order — from Tech Pack sign-off to container seal confirmation.",
    topics: ["Pre-production sample approval checklist", "Inspection scheduling and timing", "Export document verification before shipment"],
    readTime: "5 min read",
    wide: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GuidesContent() {
  const [activeCategory, setActiveCategory] = useState<GuideCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = guides.filter((g) => {
    const matchesCat = activeCategory === "all" || g.catId === activeCategory;
    const term = searchTerm.trim().toLowerCase();
    const matchesTerm =
      !term ||
      g.title.toLowerCase().includes(term) ||
      g.description.toLowerCase().includes(term) ||
      g.topics.some((t) => t.toLowerCase().includes(term));
    return matchesCat && matchesTerm;
  });

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-knowledge.webp"
        imageAlt="MZ Global Trading textile sourcing guides — in-depth reference guides for international buyers"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Corporate" },
          { label: "Guides" },
        ]}
        label="Resources"
        title="Sourcing"
        titleGold="Guides"
        description="Eight comprehensive reference guides — AQL inspection, certifications, incoterms, Tech Packs and Pakistan sourcing strategy. Free to read online."
        pills={["8 Guides", "Free to Read Online", "B2B Reference Quality"]}
      />

      {/* ── Stats bar ─────────────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden"
          >
            {[
              { val: "8", label: "Guides", delay: 0 },
              { val: "70+", label: "Minutes of Content", delay: 0.08 },
              { val: "5", label: "Topic Areas", delay: 0.16 },
              { val: "Free", label: "Read Online", delay: 0.24 },
            ].map((s) => (
              <motion.div
                key={s.label}
                custom={s.delay}
                variants={numReveal}
                className="bg-white px-6 py-6 text-center"
              >
                <p className="text-3xl font-bold text-navy-900 leading-none mb-1">{s.val}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Bento grid ────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px flex-1 max-w-[60px] bg-gold" />
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
                Guide Library
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              All 8 Sourcing Guides
            </h2>

            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="flex flex-wrap gap-2 flex-1" role="group" aria-label="Filter guides by category">
                {guideCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeCategory === cat.id
                        ? "bg-navy-900 text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-navy-900 hover:text-navy-900"
                    }`}
                  >
                    {cat.label}
                    <span className={`ml-2 text-xs ${activeCategory === cat.id ? "text-gold" : "text-gray-400"}`}>
                      {cat.id === "all" ? guides.length : guides.filter((g) => g.catId === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
              <div className="w-full lg:w-72 flex-shrink-0">
                <label htmlFor="guide-search" className="sr-only">Search guides</label>
                <div className="relative">
                  <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    id="guide-search"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search AQL, GSM, incoterms..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento grid — 3 cols desktop, filterable */}
          <motion.div layout className="grid lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
            {filtered.map((guide, i) => (
              <motion.article
                key={guide.num}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: (i % 3) * 0.06 }}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 340, damping: 24 } }}
                className={`group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-lg transition-shadow flex flex-col ${
                  guide.wide ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                {/* Accent bar top */}
                <motion.div
                  className={`h-1 w-full ${guide.accentBar}`}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 + (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${guide.categoryPill}`}>
                        {guide.category}
                      </span>
                      {guide.featured && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20">
                          Featured
                        </span>
                      )}
                    </span>
                    <span className="text-gray-400 text-xs flex-shrink-0">{guide.readTime}</span>
                  </div>

                  <div className={`flex ${guide.wide ? "lg:flex-row lg:gap-8 lg:items-start" : "flex-col"} flex-1`}>
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 + (i % 3) * 0.08 }}
                          className="text-3xl font-bold text-gray-200 group-hover:text-gold/30 leading-none flex-shrink-0 transition-colors duration-300 select-none"
                          aria-hidden="true"
                        >
                          {guide.num}
                        </motion.span>
                        <h3 className="text-navy-900 font-bold text-[15px] leading-snug group-hover:text-gold transition-colors">
                          {guide.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3">{guide.description}</p>
                    </div>

                    <div className={`flex-shrink-0 ${guide.wide ? "lg:w-64" : ""}`}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        What You&apos;ll Learn
                      </p>
                      <ul className="space-y-1.5 mb-3">
                        {guide.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-2.5">
                            <span className="mt-1 flex-shrink-0 w-3.5 h-3.5 rounded-full bg-gray-100 group-hover:bg-gold/15 flex items-center justify-center transition-colors">
                              <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-gold transition-colors" aria-hidden="true" />
                            </span>
                            <span className="text-gray-500 text-xs leading-snug">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto pt-3 border-t border-gray-50">
                    <Link
                      href={`/guides/${guide.slug}/`}
                      className="inline-flex items-center gap-1.5 text-navy-900 text-xs font-bold hover:text-gold transition-colors group/link"
                      aria-label={`Read ${guide.title}`}
                    >
                      Read Guide
                      <svg
                        className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform"
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
              </motion.article>
            ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="border border-dashed border-gray-200 rounded-2xl px-6 py-12 text-center">
              <p className="text-gray-400 text-sm">No guide matches that search — try a different term or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── More coming ───────────────────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col sm:flex-row sm:items-center gap-5"
          >
            <div className="flex-1">
              <p className="text-navy-900 font-bold text-sm mb-1">More guides in development</p>
              <p className="text-gray-500 text-sm">
                Upcoming: Towel Sourcing Guide, Hospital Linen Compliance, Sustainable Fibre Selection, Denim Washing Guide.
              </p>
            </div>
            <Link
              href="/contact-us/"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
            >
              Request a Specific Topic
            </Link>
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
              Apply the Knowledge
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Place Your First Order?
            </h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
              Submit a structured RFQ and receive a formal quotation within 3–5 business days — with factory selection, certifications and inspection built in.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Request a Quote →
              </Link>
              <Link
                href="/faqs/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                Read FAQs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
