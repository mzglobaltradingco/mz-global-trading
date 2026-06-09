"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants, viewportOnce } from "@/lib/animations";

// ─── Sourcing Map Data ────────────────────────────────────────────────────────

const PK = { x: 685, y: 215 }; // Pakistan (source)

// Coordinates: x = (lon + 175) / 350 * 1000 | y = (80 - lat) / 140 * 500
const markets = [
  // North America
  { name: "New York",     x: 289, y: 139, region: "North America", delay: 1.1 },
  { name: "Los Angeles",  x: 163, y: 164, region: "North America", delay: 1.2 },
  { name: "Toronto",      x: 274, y: 129, region: "North America", delay: 1.0 },
  { name: "Chicago",      x: 247, y: 136, region: "North America", delay: 1.15 },
  { name: "Mexico City",  x: 217, y: 218, region: "North America", delay: 1.3 },
  // Europe
  { name: "London",       x: 500, y: 104, region: "Europe", delay: 0.55 },
  { name: "Amsterdam",    x: 514, y: 100, region: "Europe", delay: 0.6  },
  { name: "Paris",        x: 506, y: 111, region: "Europe", delay: 0.65 },
  { name: "Berlin",       x: 537, y:  96, region: "Europe", delay: 0.7  },
  { name: "Brussels",     x: 511, y: 104, region: "Europe", delay: 0.62 },
  { name: "Madrid",       x: 489, y: 143, region: "Europe", delay: 0.75 },
  { name: "Rome",         x: 534, y: 136, region: "Europe", delay: 0.78 },
  { name: "Stockholm",    x: 551, y:  75, region: "Europe", delay: 0.85 },
  { name: "Warsaw",       x: 560, y: 100, region: "Europe", delay: 0.73 },
  { name: "Lisbon",       x: 474, y: 146, region: "Europe", delay: 0.72 },
  { name: "Athens",       x: 568, y: 150, region: "Europe", delay: 0.8  },
  { name: "Zurich",       x: 526, y: 118, region: "Europe", delay: 0.68 },
  // Middle East
  { name: "Dubai",        x: 610, y: 213, region: "Middle East", delay: 0.35 },
  { name: "Riyadh",       x: 588, y: 222, region: "Middle East", delay: 0.38 },
  { name: "Istanbul",     x: 539, y: 163, region: "Middle East", delay: 0.45 },
  { name: "Cairo",        x: 541, y: 193, region: "Middle East", delay: 0.42 },
  { name: "Kuwait",       x: 599, y: 200, region: "Middle East", delay: 0.4  },
  // South America
  { name: "São Paulo",    x: 304, y: 366, region: "South America", delay: 1.5 },
  { name: "Buenos Aires", x: 282, y: 411, region: "South America", delay: 1.6 },
  { name: "Bogotá",       x: 239, y: 278, region: "South America", delay: 1.4 },
  { name: "Santiago",     x: 265, y: 403, region: "South America", delay: 1.55},
  { name: "Lima",         x: 252, y: 330, region: "South America", delay: 1.45},
  // Africa
  { name: "Johannesburg", x: 541, y: 381, region: "Africa", delay: 1.0 },
  { name: "Nairobi",      x: 568, y: 296, region: "Africa", delay: 0.95},
  // Asia Pacific
  { name: "Sydney",       x: 880, y: 405, region: "Asia Pacific", delay: 1.75},
  { name: "Tokyo",        x: 843, y: 175, region: "Asia Pacific", delay: 1.65},
  { name: "Seoul",        x: 813, y: 168, region: "Asia Pacific", delay: 1.7 },
];

const regionColors: Record<string, string> = {
  "North America":  "rgba(212,175,55,0.55)",
  "Europe":         "rgba(212,175,55,0.65)",
  "Middle East":    "rgba(212,175,55,0.80)",
  "South America":  "rgba(212,175,55,0.45)",
  "Africa":         "rgba(212,175,55,0.50)",
  "Asia Pacific":   "rgba(212,175,55,0.45)",
};

function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - 40;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

// ─── Journey Data ─────────────────────────────────────────────────────────────

const journeySteps = [
  {
    num: "01",
    title: "You Brief Us on Your Requirements",
    body: "Every sourcing program starts with a detailed briefing. We collect your product specifications, target pricing, volume, compliance certifications required, preferred markets and timeline. The more context you give us, the better we match.",
    highlights: [
      "Product specs & construction",
      "Target FOB or landed price",
      "Required certifications (GOTS, BSCI, etc.)",
      "Volume and MOQ",
      "Delivery timeline",
      "Custom branding requirements",
    ],
    flip: false,
  },
  {
    num: "02",
    title: "We Match You to the Right Factory",
    body: "From our network of 50+ vetted factories across Pakistan's textile hubs — Karachi, Lahore, Faisalabad and Sialkot — we identify the 2–3 best matches based on your exact requirements. We share factory profiles, certifications, production capacity and past work for your approval before anything moves forward.",
    highlights: [
      "50+ vetted factories",
      "Certified: GOTS, BSCI, Sedex, SA8000",
      "Audited annually",
      "Matched by product & capacity",
      "No undisclosed substitutions",
      "Approval required before production",
    ],
    flip: true,
  },
  {
    num: "03",
    title: "We Manage Production End to End",
    body: "Once a factory is approved and samples signed off, we take ownership of the entire production run. Our team conducts in-line QC at key milestones and a full pre-shipment inspection before any goods are released. You receive updates at every stage — not just when there's a problem.",
    highlights: [
      "In-line QC at cutting & sewing",
      "Final pre-shipment inspection",
      "Measurement & construction audit",
      "Colour accuracy verification",
      "95% pass rate on first inspection",
      "Real-time production updates",
    ],
    flip: false,
  },
  {
    num: "04",
    title: "We Export and Support Delivery",
    body: "We handle all export documentation, compliance certificates and shipment booking. Whether FCL or LCL, sea or air — we coordinate with freight forwarders and provide real-time tracking until your goods arrive. After delivery, we remain your point of contact for any follow-up.",
    highlights: [
      "Full export documentation",
      "Compliance certificates included",
      "FCL & LCL consolidation",
      "Sea & air freight coordination",
      "Real-time shipment tracking",
      "Post-delivery support",
    ],
    flip: true,
  },
];

// ─── Supply Chain Stages ──────────────────────────────────────────────────────

const supplyChainStages = [
  {
    num: "01",
    title: "Raw Material",
    detail: "Cotton, yarn & fabric from certified mills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Spinning & Weaving",
    detail: "Yarn production & fabric construction",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Dyeing & Printing",
    detail: "Reactive, vat, digital & screen printing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2a5 5 0 015 5c0 4-5 11-5 11S7 11 7 7a5 5 0 015-5z" /><circle cx="12" cy="7" r="1.5" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Cut & Sew",
    detail: "Precision cutting, stitching & finishing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="6" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "QC & Testing",
    detail: "In-line + pre-shipment inspection",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Packaging",
    detail: "Branded, retail-ready or bulk packing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    num: "07",
    title: "Export",
    detail: "FCL/LCL · Sea & air · Global delivery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 17h18M3 17l3-10h12l3 10M3 17l-1 2h20l-1-2" /><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
      </svg>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowWeSourceContent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mapRef, offset: ["start end", "end start"] });
  const mapY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <>

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-navy-900 pt-20 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-gold/4 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-16 w-72 h-72 bg-navy-800/60 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-gray-500 text-xs mb-8"
          >
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gold">How We Source</span>
          </motion.div>

          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            >
              The Sourcing Process
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            >
              From Pakistan.{" "}
              <span className="text-gold">To Everywhere.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
            >
              We connect international buyers in 25+ countries with Pakistan&apos;s most capable
              textile manufacturers — managing every step from factory matching through
              production, QC and delivery to your door.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex flex-wrap gap-3"
            >
              {["50+ Vetted Factories", "25+ Export Markets", "End-to-End Managed"].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Sourcing Network Map ───────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-navy-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Global Reach</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Our Sourcing Network</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Pakistan is our manufacturing base. Your business is our destination — in 25+ countries across every major market.
            </p>
          </motion.div>

          {/* Map container */}
          <motion.div
            ref={mapRef}
            style={{ y: mapY, aspectRatio: "2/1" }}
            className="relative w-full rounded-2xl overflow-hidden border border-white/5"
          >
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full bg-[#050d1a]"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Subtle grid */}
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="1000" height="500" fill="url(#grid)" />

              {/* Connection lines (curved bezier) */}
              {markets.map((m) => (
                <motion.path
                  key={`line-${m.name}`}
                  d={curvePath(PK.x, PK.y, m.x, m.y)}
                  stroke={regionColors[m.region]}
                  strokeWidth={0.8}
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: m.delay, ease: "easeInOut" }}
                />
              ))}

              {/* Market dots */}
              {markets.map((m) => (
                <motion.g
                  key={`dot-${m.name}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: m.delay + 1.4 }}
                >
                  <circle cx={m.x} cy={m.y} r={3} fill="rgba(255,255,255,0.8)" />
                  <text
                    x={m.x}
                    y={m.y - 6}
                    textAnchor="middle"
                    fontSize="7"
                    fill="rgba(255,255,255,0.55)"
                    fontFamily="sans-serif"
                  >
                    {m.name}
                  </text>
                </motion.g>
              ))}

              {/* Pakistan — pulsing source dot */}
              <motion.circle
                cx={PK.x} cy={PK.y} r={14}
                fill="rgba(212,175,55,0.12)"
                animate={{ r: [14, 24, 14], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx={PK.x} cy={PK.y} r={7}
                fill="rgba(212,175,55,0.25)"
                animate={{ r: [7, 12, 7], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              />
              <circle cx={PK.x} cy={PK.y} r={5} fill="#d4af37" />
              <text
                x={PK.x}
                y={PK.y - 12}
                textAnchor="middle"
                fontSize="8"
                fill="#d4af37"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                PAKISTAN
              </text>

              {/* Region labels */}
              {[
                { label: "North America", x: 200, y: 55 },
                { label: "Europe", x: 515, y: 55 },
                { label: "Middle East", x: 570, y: 165 },
                { label: "South America", x: 245, y: 455 },
                { label: "Africa", x: 530, y: 455 },
                { label: "Asia Pacific", x: 840, y: 55 },
              ].map((r) => (
                <motion.text
                  key={r.label}
                  x={r.x} y={r.y}
                  textAnchor="middle"
                  fontSize="9"
                  fill="rgba(212,175,55,0.3)"
                  fontFamily="sans-serif"
                  letterSpacing="2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {r.label.toUpperCase()}
                </motion.text>
              ))}
            </svg>

            {/* Market count badge */}
            <div className="absolute bottom-4 right-4 bg-navy-900/90 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-right">
              <p className="text-gold font-bold text-xl leading-none">25+</p>
              <p className="text-gray-400 text-xs mt-0.5">Export Markets</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. End-to-End Journey (Zig-Zag) ──────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">End to End</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Your Sourcing Journey</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              We manage every step — from the first conversation to the delivery at your warehouse.
            </p>
          </motion.div>

          <div className="space-y-24">
            {journeySteps.map((step, i) => (
              <div
                key={step.num}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${step.flip ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Text side */}
                <motion.div
                  initial={{ opacity: 0, x: step.flip ? 32 : -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={step.flip ? "lg:order-2" : ""}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl font-bold text-gray-100 leading-none select-none">{step.num}</span>
                    <div className="w-8 h-px bg-gold/40" />
                    <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Step {i + 1}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-4 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">{step.body}</p>
                </motion.div>

                {/* Visual side — highlights card */}
                <motion.div
                  initial={{ opacity: 0, x: step.flip ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className={`bg-navy-900 rounded-2xl p-8 ${step.flip ? "lg:order-1" : ""}`}
                >
                  <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                    What This Covers
                  </p>
                  <ul className="space-y-3">
                    {step.highlights.map((h, hi) => (
                      <motion.li
                        key={h}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.35, delay: 0.2 + hi * 0.07 }}
                        className="flex items-center gap-3 text-sm text-gray-300"
                      >
                        <span className="w-5 h-5 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Supply Chain Stages ────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Supply Chain</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">From Raw Material to Your Door</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
              Every order passes through a structured, monitored production pipeline — from raw fibre to packaged goods.
            </p>
          </motion.div>

          {/* Desktop: horizontal chain */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="hidden lg:flex items-stretch gap-0 rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
          >
            {supplyChainStages.map((stage, i) => (
              <motion.div
                key={stage.num}
                variants={staggerItemVariants}
                className="flex-1 group relative bg-white hover:bg-navy-900 transition-colors duration-300 p-6 flex flex-col items-center text-center border-r border-gray-100 last:border-0"
              >
                {/* Arrow connector */}
                {i < supplyChainStages.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-4 h-4 rotate-45 border-t-2 border-r-2 border-gray-200 bg-white group-hover:border-gold/40 group-hover:bg-navy-900 transition-colors" />
                )}
                <div className="w-11 h-11 rounded-xl bg-navy-900 flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                  {stage.icon}
                </div>
                <span className="text-gold text-xs font-bold mb-1 group-hover:text-gold/80">{stage.num}</span>
                <h3 className="text-navy-900 font-bold text-sm mb-1.5 group-hover:text-white transition-colors">{stage.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-400 transition-colors">{stage.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: vertical list */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:hidden relative pl-10"
          >
            <div className="absolute top-2 bottom-2 left-[18px] w-px border-l-2 border-dashed border-gold/20" />
            <div className="space-y-6">
              {supplyChainStages.map((stage) => (
                <motion.div
                  key={stage.num}
                  variants={staggerItemVariants}
                  className="flex items-start gap-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-gold flex-shrink-0 -ml-10 relative z-10">
                    {stage.icon}
                  </div>
                  <div>
                    <p className="text-gold text-xs font-bold mb-0.5">{stage.num}</p>
                    <h3 className="text-navy-900 font-bold text-sm mb-1">{stage.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{stage.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. CTA ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Start Today</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Source From Pakistan?
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              Tell us what you need. We&apos;ll respond within 24 hours with a factory recommendation and pricing overview.
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
