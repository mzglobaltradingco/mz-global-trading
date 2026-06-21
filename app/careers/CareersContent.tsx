"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "@/lib/motion-shim";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  viewportOnce,
} from "@/lib/animations";
import PageHero from "@/components/PageHero";

// ─── Data ─────────────────────────────────────────────────────────────────────

const whyJoin = [
  {
    title: "Work at the Heart of Global Trade",
    desc: "Every order we place ships to buyers in the USA, UK, Europe and Canada. You will be part of a supply chain that moves goods across continents — from Pakistan's factories to international shelves.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Grow With a Young Business",
    desc: "We are an early-stage company with real ambition. There are no rigid hierarchies and no bureaucratic delays — just direct contribution to a business that is actively scaling. Your impact is visible and immediate.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Learn the Full Supply Chain",
    desc: "From factory-floor vetting to freight documentation, from compliance auditing to international buyer communication — working here means genuine cross-functional exposure across the entire textile trade cycle.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Direct Mentorship & Ownership",
    desc: "You will work closely with experienced leadership — not filtered through layers of middle management. We invest in people who want to own their role and contribute meaningfully to what we are building.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const values = [
  {
    num: "01",
    title: "Accountability",
    desc: "We do what we say. When we commit to a timeline, a quality standard or an outcome — we deliver it. Every role at MZ Global Trading carries real ownership over real results.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Precision",
    desc: "Textile trade is a business where details matter — a wrong measurement, a missed certification, a misread specification can cost an order. We are deliberate, thorough and precise in everything we do.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Long-Term Thinking",
    desc: "We build relationships — with buyers, with factories, and with the people who work here. We are not optimising for the next order; we are building a company that operates with integrity for decades.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const careerAreas = [
  {
    area: "Sourcing & Procurement",
    desc: "Factory identification, product matching, vendor management and order coordination across Pakistan's textile manufacturing hubs.",
    tags: ["Factory Relations", "Vendor Evaluation", "Product Sourcing"],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    area: "Quality Control & Compliance",
    desc: "Pre-production, in-line and pre-shipment inspections, certification verification, and compliance documentation for international markets.",
    tags: ["QC Inspections", "Certifications", "Compliance"],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    area: "Business Development",
    desc: "Identifying and developing relationships with international buyers, procurement managers and retail brands across North America, Europe and South America.",
    tags: ["International Sales", "Client Relations", "Export Markets"],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    area: "Logistics & Operations",
    desc: "Export documentation, freight coordination, shipment tracking and customs compliance from Pakistan ports to international destinations.",
    tags: ["Export Docs", "Freight", "Logistics"],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 17h18M3 17l3-10h12l3 10M3 17l-1 2h20l-1-2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
      </svg>
    ),
  },
  {
    area: "Finance & Administration",
    desc: "Order accounting, international invoicing, payment tracking, documentation management and internal operational support.",
    tags: ["Accounting", "Trade Finance", "Documentation"],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    area: "Marketing & Digital",
    desc: "Content strategy, SEO, digital presence and brand communication for an international B2B audience across the USA, UK, Europe and beyond.",
    tags: ["B2B Content", "SEO", "International Markets"],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
];

const hiringSteps = [
  {
    num: "01",
    title: "CV Review",
    desc: "We review every application — speculative or otherwise. If your background aligns with a current or anticipated need, we will be in touch within 5 business days.",
  },
  {
    num: "02",
    title: "Initial Conversation",
    desc: "A 20–30 minute introductory call to understand your background, interests and expectations — and for you to learn more about who we are and how we work.",
  },
  {
    num: "03",
    title: "Role Assessment",
    desc: "A structured discussion or short practical exercise relevant to the role — designed to understand how you think and approach problems, not to test obscure knowledge.",
  },
  {
    num: "04",
    title: "Offer & Onboarding",
    desc: "If it is the right match for both sides, we move quickly to an offer. Onboarding is hands-on from day one — you will be contributing to live work within your first week.",
  },
];

const faqItems = [
  {
    q: "Are there any open positions right now?",
    a: "We do not have active vacancies at this time. However, we review speculative applications and keep strong candidates on file for when suitable roles arise. If you are genuinely interested in working with us, we encourage you to submit your CV — we will reach out when there is a relevant opening.",
  },
  {
    q: "Can I submit my CV even if there are no listed vacancies?",
    a: "Absolutely. We actively welcome speculative applications — especially from candidates with backgrounds in sourcing, quality control and business development. Submit your details and a brief note about the area you are interested in, and we will keep your CV on file for when a relevant role opens.",
  },
  {
    q: "What is the typical hiring timeline once a role is open?",
    a: "We aim to move quickly. From initial application to offer, our process typically takes 2–3 weeks. We respect candidates' time and communicate clearly at each stage — including if the decision does not go in your favour.",
  },
  {
    q: "Where is the office and will I need to be on-site?",
    a: "Our office is at Office G20, Ground Floor, Columbus Tower, Main Clifton Road, Karachi 75600, Pakistan. Most roles are office-based or involve field activity across Karachi and occasional travel to manufacturing hubs in Faisalabad, Lahore and Sialkot.",
  },
  {
    q: "What qualities do you look for in candidates?",
    a: "We look for people who are thorough, direct and genuinely interested in the textile trade. Prior experience in sourcing, manufacturing, export or international trade is valued — but attitude and work ethic matter as much as credentials. If you take quality seriously and want to build something, we want to hear from you.",
  },
  {
    q: "I have experience in textile manufacturing, not sourcing. Is that relevant?",
    a: "Yes — manufacturing experience is directly applicable to quality control, factory evaluation and sourcing roles. We work closely with factories and an understanding of production processes is genuinely valued. We are happy to discuss how your background could translate into a role with us.",
  },
];

const areaOptions = [
  "Sourcing & Procurement",
  "Quality Control & Compliance",
  "Business Development",
  "Logistics & Operations",
  "Finance & Administration",
  "Marketing & Digital",
  "Other",
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CareersContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    background: "",
    source: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Careers Application — ${formData.area || "General"} — ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\nArea of Interest: ${formData.area || "Not specified"}\n\nBackground:\n${formData.background}\n\nHow they heard about us: ${formData.source || "Not provided"}`
    );
    window.location.href = `mailto:info@mzglobaltrading.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <>

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-careers.webp"
        imageAlt="MZ Global Trading office — build a career in Pakistan's B2B textile sourcing industry"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Corporate" },
          { label: "Careers" },
        ]}
        label="Work With Us"
        title="Build a Career in"
        titleGold="Global Textile Trade"
        description="We are a growing B2B textile sourcing company based in Karachi, connecting international buyers in the USA, UK, and Europe with Pakistan's certified manufacturers. We look for people who take quality seriously, own their work, and want to grow with us."
        pills={["Karachi, Pakistan", "Growing Team", "B2B Textile Sourcing"]}
      />

      {/* ── 2. Why Join ──────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">The Opportunity</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Why Join MZ Global Trading</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
              We are building something with real ambition. If you want your work to matter, this is where to do it.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyJoin.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItemVariants}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold/30 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-navy-900 flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-navy-900 font-bold text-base mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. Culture & Values ──────────────────────────────────────────────── */}
      <section
        className="py-20 sm:py-24"
        style={{ background: "linear-gradient(to bottom, #0D1B2A, #0a1520)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-14"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">What We Stand For</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Our Culture & Values</h2>
            <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
              Three principles guide everything we do — from how we source to how we hire.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-3 gap-6"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={staggerItemVariants}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-gold/30 hover:bg-white/8 transition-colors group"
              >
                <div className="flex items-start gap-4 mb-5">
                  <span className="text-4xl font-bold text-white/5 leading-none select-none flex-shrink-0" aria-hidden="true">
                    {v.num}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy-900 transition-colors flex-shrink-0">
                    {v.icon}
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. Career Areas ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Areas of Work</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Where You Could Fit</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
              We hire across six functional areas. Each plays a critical role in how we source, deliver and grow.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {careerAreas.map((item) => (
              <motion.div
                key={item.area}
                variants={staggerItemVariants}
                className="rounded-2xl border border-gray-100 p-6 hover:border-gold/30 hover:shadow-md transition-all group bg-white"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-navy-900 font-bold text-base mb-2">{item.area}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2.5 py-1 bg-gray-50 border border-gray-100 rounded text-gray-400 text-xs group-hover:border-gold/20 group-hover:text-navy-900/60 transition-colors"
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

      {/* ── 5. Current Open Positions ────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-gray-50" id="open-positions">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Open Roles</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Current Opportunities</h2>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 sm:p-14 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-navy-900/5 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-navy-900/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-navy-900 font-bold text-xl mb-3">No Open Positions at This Time</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto mb-8">
              We do not have active vacancies right now. That said, we are always interested in hearing from
              talented people who are serious about textile trade and international sourcing. Submit your CV
              below and we will be in touch when a suitable role opens.
            </p>
            <a
              href="#submit-cv"
              className="inline-flex items-center justify-center px-7 py-3 bg-navy-900 text-white text-sm font-semibold rounded hover:bg-navy-800 transition-colors"
            >
              Submit Your CV →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 6. Resume Submission Form ────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white" id="submit-cv">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Speculative Applications</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Submit Your CV</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
              No active role? Fill in the form below. Clicking{" "}
              <strong className="text-navy-900 font-semibold">Send Application</strong> will open your email client
              with your details pre-filled — attach your CV before sending.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-10 sm:p-14 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-navy-900 font-bold text-xl mb-3">Your Email Client Has Opened</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto mb-6">
                  Your application details have been pre-filled. Please attach your CV and send the email to
                  complete your application. We will be in touch when a relevant role arises.
                </p>
                <p className="text-gray-400 text-xs">
                  Sending to{" "}
                  <a
                    href="mailto:info@mzglobaltrading.com"
                    className="text-gold hover:underline"
                  >
                    info@mzglobaltrading.com
                  </a>
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-7 sm:p-10 space-y-6"
              >
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="careers-name"
                      className="block text-navy-900 text-sm font-semibold mb-2"
                    >
                      Full Name <span className="text-gold" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="careers-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-navy-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/10 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="careers-email"
                      className="block text-navy-900 text-sm font-semibold mb-2"
                    >
                      Email Address <span className="text-gold" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="careers-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-navy-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/10 transition"
                    />
                  </div>
                </div>

                {/* Phone + Area of Interest */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="careers-phone"
                      className="block text-navy-900 text-sm font-semibold mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="careers-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+92 300 0000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-navy-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/10 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="careers-area"
                      className="block text-navy-900 text-sm font-semibold mb-2"
                    >
                      Area of Interest <span className="text-gold" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="careers-area"
                        required
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/10 transition appearance-none cursor-pointer ${formData.area ? "text-navy-900" : "text-gray-400"}`}
                      >
                        <option value="" disabled>Select an area</option>
                        {areaOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background */}
                <div>
                  <label
                    htmlFor="careers-background"
                    className="block text-navy-900 text-sm font-semibold mb-2"
                  >
                    Your Background <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="careers-background"
                    required
                    rows={5}
                    placeholder="Briefly describe your experience, skills and what you are looking for in a role..."
                    value={formData.background}
                    onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-navy-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/10 transition resize-none"
                  />
                </div>

                {/* How did you hear */}
                <div>
                  <label
                    htmlFor="careers-source"
                    className="block text-navy-900 text-sm font-semibold mb-2"
                  >
                    How Did You Hear About Us?
                  </label>
                  <input
                    id="careers-source"
                    type="text"
                    placeholder="LinkedIn, Google, referral, etc."
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-navy-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/10 transition"
                  />
                </div>

                <p className="text-gray-400 text-xs border-t border-gray-100 pt-5">
                  You will be prompted to attach your CV when your email client opens. Accepted formats: PDF, Word (.docx).
                  {" "}Application details are used solely to process your candidacy and retained for up to 12 months.{" "}
                  <Link href="/privacypolicy/" className="underline underline-offset-2 hover:text-gold transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold text-navy-900 text-sm font-bold rounded hover:bg-yellow-400 transition-colors shadow-sm shadow-gold/20"
                >
                  Send Application via Email →
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── 7. Hiring Process ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">What to Expect</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">The Hiring Process</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
              We are transparent about how we hire — no mystery stages, no unnecessary delays.
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
            {hiringSteps.map((step, i) => (
              <div key={step.num} className="flex items-start flex-1">
                <motion.div
                  variants={staggerItemVariants}
                  className="flex flex-col items-center text-center flex-shrink-0 w-full group"
                >
                  <div className="w-14 h-14 rounded-full bg-navy-900 border-2 border-navy-800 flex items-center justify-center mb-5 group-hover:border-gold transition-colors duration-300">
                    <span className="text-gold font-bold text-sm">{step.num}</span>
                  </div>
                  <h3 className="text-navy-900 font-bold text-sm mb-2 px-2">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed px-2">{step.desc}</p>
                </motion.div>
                {i < hiringSteps.length - 1 && (
                  <div className="flex-shrink-0 w-8 mt-[26px]">
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
            <div className="absolute top-5 bottom-5 left-5 w-px border-l-2 border-dashed border-gold/20" aria-hidden="true" />
            <div className="space-y-8">
              {hiringSteps.map((step) => (
                <motion.div
                  key={step.num}
                  variants={staggerItemVariants}
                  className="flex items-start gap-5"
                >
                  <div className="w-10 h-10 rounded-full bg-navy-900 border-2 border-navy-800 flex items-center justify-center flex-shrink-0 relative z-10">
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

      {/* ── 8. FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
          >
            {faqItems.map((item, i) => (
              <motion.div key={i} variants={staggerItemVariants}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors group"
                  aria-expanded={openFaq === i}
                >
                  <span
                    className={`font-semibold text-sm sm:text-base pr-4 transition-colors ${
                      openFaq === i ? "text-gold" : "text-navy-900"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openFaq === i
                        ? "bg-gold text-navy-900"
                        : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Interested?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Think You&apos;d Be a Good Fit?
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              We are always interested in meeting people who take their work seriously.
              Submit your CV or reach out directly — we will respond within 5 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#submit-cv"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Submit Your CV →
              </a>
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
