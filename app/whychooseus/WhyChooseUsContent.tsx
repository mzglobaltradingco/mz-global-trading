"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CertificationsStrip from "@/components/CertificationsStrip";
import PageHero from "@/components/PageHero";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  cardVariant,
  viewportOnce,
} from "@/lib/animations";

// ─── Data ─────────────────────────────────────────────────────────────────────

const reasons = [
  {
    number: "01",
    title: "In-House Quality Assurance",
    desc: "Every order is inspected by our dedicated QC team before shipment — checking construction, measurements, colour accuracy and compliance to your specifications. We never release what we wouldn't accept ourselves.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Competitive Factory-Direct Pricing",
    desc: "Direct relationships with 50+ vetted manufacturers mean you receive premium-quality textiles at prices that reflect actual production costs — with no unnecessary intermediary markups.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Ethical & Certified Supply Chain",
    desc: "Every factory in our network holds internationally recognised certifications — GOTS, BSCI, Sedex, SA8000. We only place orders with manufacturers who meet your compliance requirements and our own standards.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Dedicated Account Ownership",
    desc: "You always have a single point of contact who knows your business, your standards and your order history. No call centres, no anonymous agents — one accountable relationship on every order.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "95% On-Time Delivery",
    desc: "We monitor every production milestone — fabric cutting through finishing and packing — with real-time updates and proactive alerts if anything needs attention. Reliability is a metric we track, not a claim we make.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Custom OEM & Branding Programs",
    desc: "From first sample to branded packaging — we manage the full development cycle for custom OEM programs. Whether building a new product or refreshing an existing range, we execute to your specifications.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
];

type RowType = "win" | "partial" | "loss";

const vsManufacturer: {
  feature: string;
  why: string;
  mz: string;
  mzType: RowType;
  them: string;
  themType: RowType;
}[] = [
  {
    feature: "Factory Access",
    why: "One factory limits what you can source.",
    mz: "50+ vetted factories matched to your product, volume and budget",
    mzType: "win",
    them: "Restricted to what that single factory produces",
    themType: "loss",
  },
  {
    feature: "Independent Quality Control",
    why: "A factory inspecting its own work is a conflict of interest.",
    mz: "Our QC team is separate from production — no conflict of interest",
    mzType: "win",
    them: "Self-inspection; factory has a financial incentive to pass orders",
    themType: "loss",
  },
  {
    feature: "Product Range",
    why: "Growing brands need apparel, home textiles and fabric — not one category.",
    mz: "Apparel, home textiles and fabric — one relationship, full range",
    mzType: "win",
    them: "One product category only; new categories require a new vendor",
    themType: "loss",
  },
  {
    feature: "Pricing & Negotiation",
    why: "You need leverage to get fair prices.",
    mz: "We negotiate across competing factories so you receive the best rate",
    mzType: "win",
    them: "Factory quotes its own price — you have no comparative leverage",
    themType: "loss",
  },
  {
    feature: "Compliance Verification",
    why: "Certification claims require independent verification.",
    mz: "Every factory pre-audited; certifications confirmed before placement",
    mzType: "win",
    them: "Certification status varies; verification is your responsibility",
    themType: "partial",
  },
  {
    feature: "Communication & Language",
    why: "Misspecification is the #1 cause of production errors.",
    mz: "Professional B2B interface — full spec clarity, no ambiguity",
    mzType: "win",
    them: "Language barrier common; miscommunication risk is significant",
    themType: "loss",
  },
  {
    feature: "Contingency on Issues",
    why: "Production problems need an alternative, not an apology.",
    mz: "If a factory underperforms, we source an alternative and protect your timeline",
    mzType: "win",
    them: "Locked to one supplier — a production failure becomes your problem",
    themType: "loss",
  },
  {
    feature: "Consolidated Shipments",
    why: "Multiple vendors multiply logistics cost and risk.",
    mz: "Multiple product categories coordinated into a single shipment",
    mzType: "win",
    them: "Multiple vendors mean multiple shipments, documentation sets and risks",
    themType: "loss",
  },
  {
    feature: "Market Intelligence",
    why: "Knowing which factory excels at what saves time and money.",
    mz: "We know which factories perform best for each product type and season",
    mzType: "win",
    them: "No independent guidance — you evaluate blind",
    themType: "loss",
  },
  {
    feature: "Dedicated Account Ownership",
    why: "You need one person who knows your standards, not a rotation of factory sales staff.",
    mz: "One named account manager on every order, every time",
    mzType: "win",
    them: "Factory sales staff serve many clients; your order is rarely a priority",
    themType: "partial",
  },
];

const pakistanStats = [
  {
    label: "Fully Vertical Supply Chain",
    desc: "Raw cotton to finished goods — yarn, fabric, dyeing, cut & sew and export, all within Pakistan's borders.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: "75+ Years of Manufacturing",
    desc: "Pakistan's textile industry has operated continuously since independence in 1947 — 75+ years of unbroken institutional expertise.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "The Manchester of Asia",
    desc: "Faisalabad is home to one of Asia's highest concentrations of textile mills — a globally recognised manufacturing city.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: "Direct Sea Freight Access",
    desc: "Port of Karachi — South Asia's largest commercial port — connects Pakistan directly to the USA, UK and Europe.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 17h18M3 17l3-10h12l3 10M3 17l-1 2h20l-1-2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
      </svg>
    ),
  },
  {
    label: "Cotton-Growing Heartland",
    desc: "Punjab and Sindh provinces are among Asia's most productive cotton-growing regions, giving Pakistan a direct raw material advantage.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      </svg>
    ),
  },
  {
    label: "Compliance-Ready Factories",
    desc: "GOTS · BSCI · SA8000 · OEKO-TEX · ISO 9001 — international certifications are accessible throughout Pakistan's factory network.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const vsAgent: {
  feature: string;
  why: string;
  mz: string;
  mzType: RowType;
  them: string;
  themType: RowType;
}[] = [
  {
    feature: "Factory Vetting",
    why: "An unvetted factory is an uncontrolled risk.",
    mz: "Every factory independently audited before onboarding — capacity, certifications and compliance confirmed",
    mzType: "win",
    them: "Most agents place orders with whoever quotes cheapest — no independent audit conducted",
    themType: "loss",
  },
  {
    feature: "In-House QC Inspection",
    why: "Outsourced QC is not the same as owned QC.",
    mz: "Our dedicated QC team inspects every order independently of the factory, at no extra charge",
    mzType: "win",
    them: "QC is either delegated back to the factory or billed as a separate add-on service",
    themType: "loss",
  },
  {
    feature: "Dedicated Account Manager",
    why: "One contact means accountability. Multiple contacts mean excuses.",
    mz: "One named account manager on every order from enquiry through to delivery",
    mzType: "win",
    them: "Orders are handled by a shared pool; your file changes hands between staff",
    themType: "partial",
  },
  {
    feature: "Real-Time Production Updates",
    why: "Silent sourcing partners surface problems too late to fix.",
    mz: "Proactive milestone updates at every production stage — not just when problems arise",
    mzType: "win",
    them: "Updates are reactive — typically only when the buyer follows up to ask",
    themType: "loss",
  },
  {
    feature: "Compliance Certifications",
    why: "A certification claimed is not a certification verified.",
    mz: "Certifications independently confirmed; full documentation available on request",
    mzType: "win",
    them: "Relies on factory-supplied documents; rarely verified through an independent audit",
    themType: "partial",
  },
  {
    feature: "Custom Branding & Packaging",
    why: "Retail-ready packaging cannot be an afterthought.",
    mz: "OEM branding and retail packaging managed within the same order, no extra scope",
    mzType: "win",
    them: "Usually raised as a separate line item or handed directly to the factory to manage",
    themType: "partial",
  },
  {
    feature: "On-Time Delivery Record",
    why: "Missing a retail window costs more than the value of the order.",
    mz: "Production milestones tracked and flagged proactively; 95% first-inspection pass rate",
    mzType: "win",
    them: "No active timeline management — delays are communicated late or not at all",
    themType: "loss",
  },
];

const processSteps = [
  { num: "01", title: "Submit Requirements",  desc: "Share specs, quantity, target price and compliance needs."                   },
  { num: "02", title: "Factory Matching",      desc: "We shortlist 2–3 vetted factories best suited to your order."               },
  { num: "03", title: "Sample & Approve",      desc: "Pre-production samples shipped for your sign-off before bulk begins."       },
  { num: "04", title: "Production & QC",       desc: "Bulk production with milestone updates and in-line quality inspections."    },
  { num: "05", title: "Export & Deliver",      desc: "Full documentation, compliance checks and real-time shipment tracking."    },
];

const hubCards = [
  {
    title: "About Us",
    desc: "Learn who we are, how MZ Global Trading was founded, and the team behind every order.",
    image: "/images/menu/menu-aboutus.webp",
    alt: "About MZ Global Trading — Pakistan textile sourcing company founded by Muhammad Muzammil",
    href: "/our-company/",
    cta: "Our Story",
  },
  {
    title: "Our Process",
    desc: "Step-by-step: how we match factories, manage production, inspect quality and handle export.",
    image: "/images/menu/menu-ourprocess.webp",
    alt: "MZ Global Trading sourcing process — factory matching, QC inspection and export documentation",
    href: "/ourprocess/",
    cta: "See How It Works",
  },
  {
    title: "Knowledge Hub",
    desc: "Trade guides, sourcing insights and compliance resources for international textile buyers.",
    image: "/images/menu/menu-blog.webp",
    alt: "MZ Global Trading Knowledge Hub — textile sourcing guides and trade insights for international buyers",
    href: "/knowledge/",
    cta: "Visit Knowledge Hub",
  },
  {
    title: "Careers",
    desc: "Join a team dedicated to connecting global buyers with Pakistan's best textile manufacturers.",
    image: "/images/menu/menu-careers.webp",
    alt: "Careers at MZ Global Trading — textile sourcing jobs in Karachi Pakistan",
    href: "/careers/",
    cta: "View Open Roles",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhyChooseUsContent() {
  const [activeTab, setActiveTab] = useState<"manufacturer" | "agent">("manufacturer");

  return (
    <>

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-why-choose-us.webp"
        imageAlt="Pakistan textile factory quality inspection — MZ Global Trading sourcing partner"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Corporate" },
          { label: "Why Choose Us" },
        ]}
        label="Why Choose Us"
        title="Why Choose"
        titleGold="MZ Global Trading"
        description="In a market of sourcing agents and trading companies, the difference is accountability. We treat every order as if our own business depends on it."
        pills={["50+ Vetted Factories", "95% On-Time Delivery", "10+ Certifications"]}
      />

      {/* ── 2. Bento Grid — at-a-glance proof points ─────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">At a Glance</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">What We Deliver</h2>
          </motion.div>

          {/* Bento grid — col/row spans only, no inline gridTemplateAreas */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >

            {/* Main flagship card — 2×2 on lg only */}
            <motion.div
              variants={staggerItemVariants}
              className="rounded-2xl bg-navy-900 p-8 flex flex-col justify-between min-h-[260px] lg:col-span-2 lg:row-span-2"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 6l9-4 9 4v6c0 5.25-4.05 9.74-9 11C7.05 21.74 3 17.25 3 12V6z" />
                  </svg>
                </div>
                <h3 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-3">
                  The Sourcing Partner<br />That Owns the Outcome
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  From factory selection to pre-shipment inspection — every stage is managed,
                  documented and delivered to your standard. Not an order-placer. An accountable partner.
                </p>
              </div>
              <Link
                href="/rfq/"
                className="inline-flex items-center gap-2 mt-8 text-gold text-sm font-semibold hover:text-yellow-300 transition-colors"
              >
                Request a Quote →
              </Link>
            </motion.div>

            {/* Stat 1 — 50+ Factories */}
            <motion.div
              variants={staggerItemVariants}
              className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col justify-between"
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Factory Network</p>
              <div>
                <p className="text-5xl font-bold text-navy-900 leading-none mt-3">50+</p>
                <p className="text-gray-500 text-sm mt-1">Vetted manufacturers across Pakistan&apos;s textile hubs</p>
              </div>
            </motion.div>

            {/* Stat 2 — 95% OTD */}
            <motion.div
              variants={staggerItemVariants}
              className="rounded-2xl bg-gold p-6 flex flex-col justify-between"
            >
              <p className="text-navy-900/70 text-xs font-semibold tracking-[0.2em] uppercase">On-Time Delivery</p>
              <div>
                <p className="text-5xl font-bold text-navy-900 leading-none mt-3">95%</p>
                <p className="text-navy-900/70 text-sm mt-1">Pass rate on first pre-shipment inspection</p>
              </div>
            </motion.div>

            {/* Feature 1 — Ethical Chain */}
            <motion.div
              variants={staggerItemVariants}
              className="rounded-2xl bg-white border border-gray-100 p-6 group hover:bg-navy-900 transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-navy-900 group-hover:bg-gold/10 flex items-center justify-center mb-4 transition-colors">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-navy-900 group-hover:text-white font-bold text-base mb-1.5 transition-colors">Certified Ethical Chain</h3>
              <p className="text-gray-500 group-hover:text-gray-500 text-sm leading-relaxed transition-colors">
                GOTS, BSCI, Sedex, SA8000 — every factory meets your compliance requirements before we place an order.
              </p>
            </motion.div>

            {/* Feature 2 — Custom OEM */}
            <motion.div
              variants={staggerItemVariants}
              className="rounded-2xl bg-white border border-gray-100 p-6 group hover:bg-navy-900 transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-navy-900 group-hover:bg-gold/10 flex items-center justify-center mb-4 transition-colors">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-navy-900 group-hover:text-white font-bold text-base mb-1.5 transition-colors">Custom OEM Programs</h3>
              <p className="text-gray-500 group-hover:text-gray-500 text-sm leading-relaxed transition-colors">
                First sample to branded packaging — we manage the full development cycle to your exact specifications.
              </p>
            </motion.div>

            {/* Stat 3 — Certifications */}
            <motion.div
              variants={staggerItemVariants}
              className="rounded-2xl bg-navy-900 p-6 flex flex-col justify-between"
            >
              <p className="text-gold/70 text-xs font-semibold tracking-[0.2em] uppercase">Certifications</p>
              <div>
                <p className="text-5xl font-bold text-white leading-none mt-3">10+</p>
                <p className="text-gray-500 text-sm mt-1">International quality &amp; compliance standards recognised</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── 3. Head to Head Comparison (tabbed) ──────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Head to Head</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4 leading-tight">
              How MZ Global Trading Compares
            </h2>
            <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
              Whether you are considering going directly to a manufacturer or working through another
              sourcing agent — here is what the comparison looks like across the full sourcing lifecycle.
            </p>
          </motion.div>

          {/* ── Tab toggles — high-contrast, impossible to miss ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex justify-center mb-4"
          >
            <div className="flex flex-col sm:flex-row w-full sm:w-auto bg-navy-900 rounded-xl p-1.5 gap-1.5 shadow-lg">
              <button
                onClick={() => setActiveTab("manufacturer")}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                  activeTab === "manufacturer"
                    ? "bg-gold text-navy-900 shadow-md"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                vs. Direct Manufacturer
              </button>
              <button
                onClick={() => setActiveTab("agent")}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                  activeTab === "agent"
                    ? "bg-gold text-navy-900 shadow-md"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                vs. Sourcing Agent
              </button>
            </div>
          </motion.div>

          {/* Active tab subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-center text-gray-500 text-sm mb-8"
            >
              {activeTab === "manufacturer"
                ? "Buying direct from a factory sounds simpler — until the first production problem."
                : "Not all sourcing agents are equal. Here is what separates active management from passive order-forwarding."}
            </motion.p>
          </AnimatePresence>

          {/* ── Desktop column headers (hidden on mobile) ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`header-${activeTab}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="hidden sm:grid sm:grid-cols-[1fr_1fr_1fr] gap-x-3 mb-0"
            >
              <div className="px-4 py-3">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">Criteria</p>
              </div>
              {/* MZ Global header */}
              <div className="bg-navy-900 rounded-t-xl px-5 py-4 flex flex-col items-center text-center relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy-900 text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full whitespace-nowrap">
                  Recommended
                </span>
                <p className="text-gold font-bold text-base mt-1">MZ Global Trading</p>
                <p className="text-gray-500 text-xs mt-0.5">Sourcing Partner</p>
              </div>
              {/* Competitor header */}
              <div className="bg-gray-100 rounded-t-xl px-5 py-4 flex flex-col items-center text-center">
                <p className="text-gray-600 font-semibold text-base mt-1">
                  {activeTab === "manufacturer" ? "Direct Manufacturer" : "Standard Sourcing Agent"}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {activeTab === "manufacturer" ? "Single Factory" : "Order Forwarder"}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Comparison rows ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`rows-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl sm:rounded-t-none overflow-hidden border border-gray-200 shadow-xs"
            >
              {(activeTab === "manufacturer" ? vsManufacturer : vsAgent).map((row, i) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: i * 0.04 }}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} border-b border-gray-200 last:border-0`}
                >

                  {/* ── Mobile layout: stacked card ── */}
                  <div className="sm:hidden">
                    {/* Feature header */}
                    <div className="px-4 pt-4 pb-3 border-b border-gray-100">
                      <p className="text-navy-900 font-bold text-base">{row.feature}</p>
                      <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{row.why}</p>
                    </div>
                    {/* MZ Global row */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-navy-900/[0.02]">
                      <p className="text-gold text-[11px] font-bold uppercase tracking-widest mb-2">MZ Global Trading</p>
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <p className="text-navy-900 text-sm leading-relaxed font-medium">{row.mz}</p>
                      </div>
                    </div>
                    {/* Competitor row */}
                    <div className="px-4 py-3">
                      <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-2">
                        {activeTab === "manufacturer" ? "Direct Manufacturer" : "Sourcing Agent"}
                      </p>
                      <div className="flex items-start gap-2.5">
                        {row.themType !== "win" ? (
                          <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                            <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        ) : null}
                        <p className="text-sm leading-relaxed text-gray-500">{row.them}</p>
                      </div>
                    </div>
                  </div>

                  {/* ── Desktop layout: 3-column grid ── */}
                  <div className="hidden sm:grid sm:grid-cols-[1fr_1fr_1fr] sm:gap-x-0 items-stretch">
                    {/* Feature + why */}
                    <div className="py-5 px-5">
                      <p className="text-navy-900 font-bold text-sm">{row.feature}</p>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">{row.why}</p>
                    </div>

                    {/* MZ Global cell */}
                    <div className="py-5 px-5 flex items-start gap-3 bg-navy-900/[0.03] border-l border-navy-900/8">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <p className="text-navy-900 text-sm leading-relaxed font-medium">{row.mz}</p>
                    </div>

                    {/* Competitor cell */}
                    <div className="py-5 px-5 flex items-start gap-3 border-l border-gray-200">
                      {row.themType !== "win" && (
                        <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                          <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                      <p className="text-sm leading-relaxed text-gray-500">{row.them}</p>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer nudge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-navy-900 rounded-xl px-6 py-5"
          >
            <p className="text-gray-300 text-sm text-center sm:text-left">
              Ready to source with full accountability — from Pakistan to your warehouse?
            </p>
            <Link
              href="/rfq/"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-md shadow-gold/20"
            >
              Request a Quote →
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── 4. 6 Core Reasons — mosaic numbered grid ─────────────────────────── */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Our Commitment</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">6 Reasons Buyers Choose Us</h2>
          </motion.div>

          {/* Mosaic grid — 1px gap creates a seamless tile effect */}
          <div className="grid md:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-xs">
            {reasons.map((r, i) => (
              <motion.div
                key={r.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white p-7 group hover:bg-navy-900 transition-colors duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 flex flex-col items-center gap-3">
                    <span className="text-4xl font-bold text-gray-100 leading-none group-hover:text-white/10 transition-colors select-none">
                      {r.number}
                    </span>
                    <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                      {r.icon}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-navy-900 font-bold text-base mb-2 group-hover:text-white transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-500 transition-colors">
                      {r.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Why Pakistan — narrative + stat tiles ─────────────────────────── */}
      <section className="py-20 sm:py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* Narrative */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="lg:col-span-2"
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Why Pakistan</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
                The World Buys From Pakistan. Here&apos;s Why.
              </h2>
              <div className="w-8 h-0.5 bg-gold/50 mb-6" />
              <div className="space-y-4 text-gray-500 text-base leading-relaxed">
                <p>
                  Pakistan&apos;s textile industry isn&apos;t a hidden gem — it supplies some of the world&apos;s
                  largest retail brands, hospitality chains and institutional buyers. With a fully
                  vertical supply chain from cotton farm to finished export, manufacturing hubs in
                  Faisalabad, Karachi, Lahore and Sialkot, and direct sea access through Port of
                  Karachi, Pakistan offers a combination of raw material access, skilled labour and
                  competitive cost that few sourcing destinations can match.
                </p>
                <p>
                  The question isn&apos;t whether to source from Pakistan — it&apos;s who to source through.
                  MZ Global Trading gives international buyers direct access to this ecosystem with
                  the vetting, compliance and accountability layer that turns a capable industry
                  into a reliable supply chain for your business.
                </p>
              </div>
            </motion.div>

            {/* Stat tiles */}
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {pakistanStats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={staggerItemVariants}
                  className="bg-navy-800/50 rounded-xl p-4 hover:bg-navy-800 transition-colors group border border-white/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-3 group-hover:bg-gold/20 transition-colors">
                    {s.icon}
                  </div>
                  <p className="text-white font-bold text-sm mb-1.5 leading-snug">{s.label}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 6. How We Work — horizontal process flow ─────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">The Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">How We Work With You</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
              A clear, accountable process from first enquiry to delivery at your door.
            </p>
          </motion.div>

          {/* Desktop: horizontal stepper */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="hidden md:flex items-start gap-0"
          >
            {processSteps.map((step, i) => (
              <div key={step.num} className="flex items-start flex-1">
                <motion.div
                  variants={staggerItemVariants}
                  className="flex flex-col items-center text-center shrink-0 w-full group"
                >
                  <div className="w-14 h-14 rounded-full bg-navy-900 border-2 border-navy-800 flex items-center justify-center mb-5 group-hover:border-gold transition-colors duration-300">
                    <span className="text-gold font-bold text-sm">{step.num}</span>
                  </div>
                  <h3 className="text-navy-900 font-bold text-sm mb-2 px-2">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed px-2">{step.desc}</p>
                </motion.div>

                {/* Connector — shown between steps only */}
                {i < processSteps.length - 1 && (
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
            className="md:hidden relative"
          >
            {/* Vertical line */}
            <div className="absolute top-5 bottom-5 left-5 w-px border-l-2 border-dashed border-gold/20" />

            <div className="space-y-8">
              {processSteps.map((step) => (
                <motion.div
                  key={step.num}
                  variants={staggerItemVariants}
                  className="flex items-start gap-5"
                >
                  <div className="w-10 h-10 rounded-full bg-navy-900 border-2 border-navy-800 flex items-center justify-center shrink-0 relative z-10">
                    <span className="text-gold font-bold text-xs">{step.num}</span>
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-navy-900 font-bold text-sm mb-1">{step.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 7. Explore More ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Learn More
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore Our Company</h2>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 gap-6"
          >
            {hubCards.map((card) => (
              <motion.div
                key={card.title}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow"
              >
                <Link prefetch={false} href={card.href} className="block">
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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Ready to Partner?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Let&apos;s Work Together</h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto mb-8">
              Tell us your sourcing requirements and we&apos;ll respond with a tailored proposal within 24 hours.
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

