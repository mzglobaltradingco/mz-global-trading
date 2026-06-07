"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import StatsBar from "@/components/StatsBar";
import CertificationsStrip from "@/components/CertificationsStrip";
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants, viewportOnce } from "@/lib/animations";

const reasons = [
  {
    title: "Quality Assurance",
    desc: "Every order goes through rigorous in-house quality checks before shipment. We don't ship what we wouldn't buy ourselves.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Competitive Pricing",
    desc: "Direct factory relationships with 500+ certified manufacturers mean you get premium quality at the most competitive prices — no unnecessary markups.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Ethical Sourcing",
    desc: "We work exclusively with GOTS, BSCI, Sedex and SA8000 certified factories committed to fair wages, safe working conditions and sustainable practices.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Strong Factory Network",
    desc: "500+ vetted factories across Pakistan's major textile hubs give you access to every product category under one trusted roof.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "On-Time Delivery",
    desc: "95% on-time delivery rate backed by real-time production tracking, milestone reporting and proactive communication throughout every order.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Custom Solutions",
    desc: "From private label development to custom packaging and branded programs — we tailor every sourcing solution to your exact business needs.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
];

export default function WhyChooseUsContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-5">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>›</span>
              <span>Corporate</span>
              <span>›</span>
              <span className="text-gold">Why Choose Us</span>
            </div>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Why Choose Us</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Why Choose MZ Global Trading
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              We don&apos;t just source products — we deliver confidence, quality and reliability on every order.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1 — Intro */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">The Difference</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              The MZ Global Trading Difference
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              In a market full of sourcing agents and trading companies, MZ Global Trading stands apart through one
              simple principle — we treat every buyer&apos;s business as our own. From your first enquiry to final delivery,
              we are accountable at every step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — 6 Reasons */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reasons.map((r) => (
              <motion.div
                key={r.title}
                variants={staggerItemVariants}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:border-gold/30 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center mb-4 text-gold group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                  {r.icon}
                </div>
                <h3 className="text-navy-900 font-bold text-base mb-2">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3 — Stats */}
      <StatsBar />

      {/* Section 4 — Certifications */}
      <CertificationsStrip />

      {/* Section 5 — CTA */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Ready to Partner?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Let&apos;s Work Together</h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              Tell us your sourcing requirements and we&apos;ll respond with a tailored proposal within 24 hours.
            </p>
            <Link
              href="/contact-us/"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
            >
              Request a Quote →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
