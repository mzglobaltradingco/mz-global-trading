"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import StatsBar from "@/components/StatsBar";
import CertificationsStrip from "@/components/CertificationsStrip";
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants, viewportOnce } from "@/lib/animations";

const values = [
  {
    title: "Trust",
    desc: "We build long-term relationships based on transparency and honesty.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Quality",
    desc: "Every product meets international standards before it leaves the factory.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Delivery",
    desc: "We commit to timelines and follow through — every single order.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Ethics",
    desc: "We work exclusively with factories that uphold fair labor and safe working conditions.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const subPages = [
  { label: "Why Choose Us", href: "/whychooseus/", desc: "What sets us apart from other sourcing agents" },
  { label: "Our Process", href: "/ourprocess/", desc: "End-to-end sourcing from brief to delivery" },
  { label: "Careers", href: "/careers/", desc: "Join our growing sourcing team" },
  { label: "Blog", href: "/blog/", desc: "Industry insights and textile sourcing guides" },
  { label: "FAQ", href: "/faqs/", desc: "Common questions answered" },
  { label: "Downloads", href: "/downloads/", desc: "Brochures, spec sheets and resources" },
  { label: "Guides", href: "/guides/", desc: "Step-by-step sourcing guides" },
];

export default function OurCompanyContent() {
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
              <span className="text-gold">About Us</span>
            </div>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Our Company</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              About MZ Global Trading
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Pakistan&apos;s trusted textile sourcing partner for international buyers, brands and retailers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1 — Who We Are */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Who We Are</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
                A Karachi-Based Global Sourcing Company
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                MZ Global Trading is a Karachi-based textile sourcing company serving international buyers across 30+ countries.
                We specialize in connecting importers, brands, and retailers with Pakistan&apos;s most reliable and certified
                textile manufacturers — delivering quality products on time, every time. We operate across three core
                categories: <strong>Apparel, Home Textiles, and Fabric</strong> — giving our clients a single, trusted
                point of contact for all their sourcing needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 — Mission & Vision */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 gap-8"
          >
            <motion.div variants={staggerItemVariants} className="bg-navy-800/60 border border-white/10 rounded-xl p-8">
              <div className="w-10 h-10 bg-gold/15 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                To be the most trusted textile sourcing partner for international buyers — delivering quality products,
                ethical manufacturing, and reliable service from Pakistan to the world.
              </p>
            </motion.div>
            <motion.div variants={staggerItemVariants} className="bg-navy-800/60 border border-white/10 rounded-xl p-8">
              <div className="w-10 h-10 bg-gold/15 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                To become the leading textile sourcing gateway from Pakistan — recognized globally for transparency,
                quality compliance, and long-term buyer relationships across every product category we serve.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 — What We Do */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">What We Do</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              We Manage Your Complete Sourcing Cycle
            </h2>
            <ul className="space-y-3 max-w-2xl">
              {[
                "Source apparel, home textiles, and fabric from certified Pakistani manufacturers",
                "Match your product specifications with the right factory from our vetted network",
                "Oversee sampling, production, quality inspection, and export documentation",
                "Serve buyers across USA, Europe, UK, Middle East, Australia and 30+ countries",
                "Deliver every order under one roof — no middlemen, direct factory relationships",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="mt-1 w-5 h-5 bg-gold/15 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gold text-xs">✓</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Section 4 — Our Values */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Our Values</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">What We Stand For</h2>
          </div>
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={staggerItemVariants}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-gold/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center mb-4 text-gold">
                  {v.icon}
                </div>
                <h3 className="text-navy-900 font-bold text-base mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 5 — Leadership */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Leadership &amp; Direction</h2>
          </motion.div>
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col sm:flex-row gap-8 items-start max-w-3xl"
          >
            <div className="flex-shrink-0 w-40 h-40 rounded-2xl overflow-hidden bg-navy-900 relative">
              <Image
                src="/images/team/Muhammad-Muzammil.png"
                alt="Muhammad Muzammil — CEO"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-navy-900 font-bold text-xl mb-1">Muhammad Muzammil</h3>
              <p className="text-gold text-sm font-medium mb-4">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Muhammad Muzammil founded MZ Global Trading with a clear mission — to make Pakistani textile
                manufacturing accessible to international buyers with full transparency, certified quality, and
                reliable delivery. With deep roots in Pakistan&apos;s textile industry and strong relationships across
                the supply chain, he leads every client engagement with a hands-on approach.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6 — Office */}
      <section className="py-12 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="w-10 h-10 bg-gold/15 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Our Office</p>
              <p className="text-white text-sm">
                Office G20, Ground Floor, Columbus Tower, Main Clifton Road, Karachi 75600, Pakistan
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 7 — Stats */}
      <StatsBar />

      {/* Section 8 — Certifications */}
      <CertificationsStrip />

      {/* Section 9 — Sub-page boxes */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Explore More</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">More From MZ Global Trading</h2>
          </motion.div>
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {subPages.map((page) => (
              <motion.div key={page.href} variants={staggerItemVariants}>
                <Link
                  href={page.href}
                  className="block bg-white rounded-xl p-5 border border-gray-100 hover:border-gold/40 hover:shadow-md transition-all group"
                >
                  <h3 className="text-navy-900 font-semibold text-sm mb-1.5 group-hover:text-gold transition-colors">
                    {page.label}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{page.desc}</p>
                  <span className="mt-3 inline-block text-gold text-xs font-semibold group-hover:gap-2 transition-all">
                    Learn more →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 10 — CTA */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Get Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Sourcing?</h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              Tell us what you need and our team will respond within 24 hours.
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
