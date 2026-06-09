"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, animate, useScroll, useTransform } from "framer-motion";
import CertificationsStrip from "@/components/CertificationsStrip";

// ── Animated counter ──────────────────────────────────────────────────────────

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return controls.stop;
  }, [inView, to]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  { value: 50,  suffix: "+", label: "Vetted Factories",      desc: "Across Pakistan's textile hubs" },
  { value: 25,  suffix: "+", label: "Export Markets",        desc: "USA, UK, Europe, South America" },
  { value: 10,  suffix: "+", label: "Factory Certifications", desc: "Held across our vetted factory network" },
  { value: 95,  suffix: "%", label: "On-Time Delivery",      desc: "Consistent, trackable performance" },
];

const categories = [
  {
    title: "Apparel",
    alt: "Pakistan apparel manufacturing — knitted and woven garments sourced for international brands and retailers in USA, UK and Europe",
    image: "/images/cards/cat-banner-apparel.webp",
    desc: "Knitted and woven garments for all genders and age groups — T-shirts, hoodies, denim, workwear, baby & kids and more.",
    href: "/apparel/",
  },
  {
    title: "Home Textiles",
    alt: "Pakistan home textile manufacturing — towels, bed linen and bath products exported to USA, UK and European markets",
    image: "/images/cards/cat-banner-home-textiles.webp",
    desc: "Complete bed, bath, kitchen and hospital textile collections from certified mills meeting international quality standards.",
    href: "/hometextile/",
  },
  {
    title: "Fabric",
    alt: "Pakistan textile fabric supplier — knitted and woven fabric for OEM sourcing programs serving global importers",
    image: "/images/cards/cat-banner-fabric.webp",
    desc: "Knitted and woven fabric in every construction — ready for cut & sew or custom OEM programs.",
    href: "/fabric/",
  },
];

const values = [
  {
    title: "Transparency",
    desc: "We communicate openly at every stage — from sourcing options through production updates and shipment tracking. No surprises.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "Quality First",
    desc: "Every order is inspected by our in-house QC team before shipment. International standards are a baseline, not a ceiling.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Ethical Sourcing",
    desc: "We work exclusively with factories certified under GOTS, BSCI, Sedex and SA8000 — committed to fair labour and worker safety.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Reliability",
    desc: "We commit to timelines and follow through on every order. Our 95% on-time delivery rate reflects a process built around accountability.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const glanceItems = [
  { label: "Headquarters",     value: "Karachi, Pakistan" },
  { label: "Categories",       value: "Apparel · Home Textiles · Fabric" },
  { label: "Primary Markets",  value: "USA · UK · Europe · South America" },
  { label: "Certifications",   value: "GOTS · OEKO-TEX · BSCI · ISO 9001 + 6 more" },
  { label: "Languages",        value: "English · Urdu" },
];

// ── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  hover: { y: -6, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

const glanceItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const pillContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.36 } },
};

const pillVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OurCompanyContent() {
  const leadershipRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: leadershipRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <>

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-navy-900 pt-20 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
        {/* Hero image */}
        <Image
          src="/images/hero/hero-about.webp"
          alt="Textile factory floor in Pakistan — MZ Global Trading vetted sourcing network for international buyers in USA, UK and Europe"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlay — keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/75 to-navy-950/50" />
        {/* Gold glow — bottom left */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-gray-500 text-xs mb-8"
          >
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-400">Corporate</span>
            <span>›</span>
            <span className="text-gold">About Us</span>
          </motion.div>

          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            >
              Our Company
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            >
              About{" "}
              <span className="text-gold">MZ Global Trading</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
            >
              Pakistan&apos;s trusted B2B textile sourcing partner — connecting international brands,
              importers, and retailers with certified manufacturers across apparel, home textiles, and fabric.
            </motion.p>
            <motion.div
              variants={pillContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              {["50+ Vetted Factories", "25+ Export Markets", "10+ Factory Certifications"].map((pill) => (
                <motion.span
                  key={pill}
                  variants={pillVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {pill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Who We Are ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* Narrative */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-3"
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Who We Are</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4 leading-tight">
                A Karachi-Based Sourcing Partner Built for International Buyers
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                className="h-0.5 bg-gold mb-6"
              />
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  MZ Global Trading is a Karachi-based B2B textile sourcing company built for
                  international brands, importers, and retailers who demand quality, compliance,
                  and reliability from their supply chain. We operate as the bridge between global
                  buyers and Pakistan&apos;s most capable textile manufacturers — managing every stage
                  of the process from factory identification and sampling through production
                  oversight, quality inspection, and export documentation.
                </p>
                <p>
                  Our sourcing network covers three core categories —{" "}
                  <strong className="text-navy-900">Apparel, Home Textiles, and Fabric</strong> —
                  giving procurement teams across the USA, UK, Europe, and South America a single,
                  accountable partner for their entire textile requirement. Every factory in our
                  network is vetted for quality systems, compliance certifications, and production
                  capacity before we recommend them to any buyer.
                </p>
                <p>
                  We do not act as a passive directory. We take ownership of your sourcing program —
                  communicating proactively, flagging issues before they become problems, and standing
                  behind every order we place on your behalf.
                </p>
              </div>
            </motion.div>

            {/* Company at a Glance */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-2"
            >
              <div className="bg-navy-900 rounded-2xl p-8 lg:sticky lg:top-36">
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                  Company at a Glance
                </p>
                <motion.ul
                  variants={stagger}
                  className="space-y-0"
                >
                  {glanceItems.map((item, i) => (
                    <motion.li
                      key={item.label}
                      variants={glanceItemVariants}
                      className={`py-4 ${i < glanceItems.length - 1 ? "border-b border-white/10" : ""}`}
                    >
                      <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">
                        {item.label}
                      </span>
                      <span className="text-white text-sm font-medium">{item.value}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. Stats ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { type: "spring" as const, stiffness: 350, damping: 22 } }}
                className={`text-center px-6 py-8 ${
                  i < stats.length - 1 ? "border-r border-white/10" : ""
                } ${i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""}`}
              >
                <div className="text-4xl sm:text-5xl font-bold text-gold mb-2 tabular-nums">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-white font-semibold text-sm mb-1">{s.label}</div>
                <div className="text-gray-500 text-xs leading-snug">{s.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. What We Source ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Product Categories
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">What We Source</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.title}
                variants={cardVariants}
                whileHover="hover"
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gold/30 transition-colors cursor-default"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/20 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 text-white font-bold text-xl">{cat.title}</h3>
                </div>
                <div className="p-5 bg-white">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{cat.desc}</p>
                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold hover:gap-3 transition-all duration-200"
                  >
                    Explore {cat.title} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. Mission & Vision ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Purpose</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Our Mission &amp; Vision</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4, transition: { type: "spring" as const, stiffness: 350, damping: 22 } }}
              className="bg-navy-900 rounded-2xl p-8 sm:p-10"
            >
              <div className="w-11 h-11 bg-gold/15 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="w-8 h-0.5 bg-gold/50 mb-6" />
              <h3 className="text-white text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                To make Pakistani textile manufacturing accessible to international buyers through
                transparency, certified quality, and reliable delivery — giving every client a
                sourcing partner they can depend on, order after order.
              </p>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4, transition: { type: "spring" as const, stiffness: 350, damping: 22 } }}
              className="bg-white border border-gray-100 rounded-2xl p-8 sm:p-10"
            >
              <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="w-8 h-0.5 bg-navy-900/20 mb-6" />
              <h3 className="text-navy-900 text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-500 text-base leading-relaxed">
                To become the leading textile sourcing gateway from Pakistan — recognized globally
                for ethical practices, buyer-first service, and consistent quality across every
                category and market we serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Our Values ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Values</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/30 transition-colors group"
              >
                <div className="w-11 h-11 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-5 group-hover:bg-gold/20 transition-colors">
                  {v.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. Leadership ─────────────────────────────────────────────────── */}
      <section ref={leadershipRef} className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">The Person Behind the Work</h2>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-10 items-center max-w-4xl">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{ y: photoY }}
              className="md:col-span-2"
            >
              <div className="relative w-full aspect-[3/4] max-w-[260px] mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/team/Muhammad-Muzammil.webp"
                  alt="Muhammad Muzammil — Founder and CEO of MZ Global Trading"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 260px, 220px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                    <p className="text-white font-bold text-sm">Muhammad Muzammil</p>
                    <p className="text-gold text-xs mt-0.5">Founder &amp; CEO</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="md:col-span-3"
            >
              <div className="w-8 h-0.5 bg-gold mb-6" />
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Muhammad Muzammil founded MZ Global Trading with a clear focus: to create a
                  textile sourcing partner that international buyers could genuinely trust — one
                  that takes ownership rather than simply facilitating transactions.
                </p>
                <p>
                  Backed by deep knowledge of Pakistan&apos;s textile manufacturing ecosystem and
                  strong factory relationships built across the industry, he oversees every client
                  engagement personally — from the first enquiry through final shipment.
                </p>
                <p>
                  His approach is direct and hands-on: buyers always have a clear line of
                  communication to the decision-maker, and every commitment made to a client
                  is a commitment he stands behind.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/muhammadmuzammil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-navy-900 hover:text-gold transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8. Certifications ─────────────────────────────────────────────── */}
      <CertificationsStrip />

      {/* ── 9. CTA ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Get Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Sourcing?</h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              Tell us what you need. Our team responds within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Request a Quote →
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
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
