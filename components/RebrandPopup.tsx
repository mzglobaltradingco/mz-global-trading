"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const STORAGE_KEY = "mz_rebrand_v1";
const DISMISS_MS = 30 * 24 * 60 * 60 * 1000;

function isDismissed(): boolean {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) return false;
    const ts = parseInt(v, 10);
    return !isNaN(ts) && Date.now() - ts < DISMISS_MS;
  } catch {
    return false;
  }
}

function useCountUp(target: number, active: boolean): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    setCount(0);
    let startTime: number | null = null;
    let raf: number;
    const DURATION = 950;
    function tick(ts: number) {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / DURATION, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return count;
}

const FEATURES = [
  "Corporate Rebranding",
  "Modern Website Experience",
  "Expanded Apparel Collection",
  "Expanded Home Textile Collection",
  "Expanded Fabric Library",
  "Interactive Textile Calculators",
  "Smart RFQ Wizard",
  "Technical Downloads",
  "Buying Guides",
  "Product Knowledge Centre",
  "150+ knowledge articles, sourcing guides and technical downloads",
];

const CATEGORIES = [
  {
    icon: "👕",
    title: "Apparel",
    desc: "Knitted, woven, baby & workwear",
    href: "/apparel/",
  },
  {
    icon: "🛏️",
    title: "Home Textiles",
    desc: "Bath, bed, kitchen, table & more",
    href: "/hometextile/",
  },
  {
    icon: "🧵",
    title: "Fabric",
    desc: "Apparel & home textile fabric",
    href: "/fabric/",
  },
];

const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 150, suffix: "+", label: "Knowledge Docs" },
  { value: 3,   suffix: "",   label: "Business Divisions" },
  { value: 24,  suffix: "/7", label: "Website Access" },
  { value: 100, suffix: "%",  label: "Same Ownership" },
];

function StatItem({
  value, suffix, label, active,
}: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-xl sm:text-2xl font-bold tabular-nums leading-none text-gold">
        {count}{suffix}
      </span>
      <span className="text-[10px] leading-tight text-gray-400">{label}</span>
    </div>
  );
}

export default function RebrandPopup() {
  const [visible, setVisible] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const dontShowRef = useRef(false);

  useEffect(() => { dontShowRef.current = dontShow; }, [dontShow]);

  useEffect(() => { setVisible(!isDismissed()); }, []);

  useEffect(() => {
    if (!visible) { setStatsActive(false); return; }
    const t = setTimeout(() => setStatsActive(true), 2100);
    return () => clearTimeout(t);
  }, [visible]);

  function dismiss() {
    if (dontShowRef.current) {
      try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch { /* ignore */ }
    }
    setVisible(false);
  }

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Corporate rebranding announcement"
            className="fixed inset-x-3 top-1/2 z-[9999] mx-auto max-w-2xl -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.08 }}
          >
            <div
              className="relative overflow-y-auto rounded-2xl"
              style={{
                background: "linear-gradient(160deg, #0D1B2A 0%, #08111f 100%)",
                maxHeight: "calc(100dvh - 48px)",
              }}
            >
              {/* Textile grid pattern */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(212,160,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.05) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
                aria-hidden="true"
              />

              {/* Gold shimmer bar */}
              <div
                className="h-[3px] w-full shrink-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #D4A017 25%, #f5d060 50%, #D4A017 75%, transparent 100%)",
                }}
              />

              {/* Close */}
              <button
                onClick={dismiss}
                aria-label="Close announcement"
                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="relative px-5 pb-8 pt-7 sm:px-9 sm:pb-9 sm:pt-9">

                {/* ── Header ── */}
                <motion.div
                  className="mb-7 text-center"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.45 }}
                >
                  <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">
                    🚀 Corporate Announcement
                  </p>
                  <h2 className="text-lg font-bold text-white sm:text-2xl">
                    Welcome to Our New Brand Identity
                  </h2>
                </motion.div>

                {/* ── Logo Transition ── */}
                <motion.div
                  className="mb-7 flex items-center justify-center gap-4 sm:gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  {/* Old logo */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex h-16 w-24 items-center justify-center rounded-xl border border-white/10 bg-white/10 p-2.5 sm:h-[72px] sm:w-[124px]">
                      <Image
                        src="/images/logo/logo-old.png"
                        alt="Previous MZ Global Trading logo — prior identity"
                        width={100}
                        height={64}
                        className="max-h-full max-w-full object-contain grayscale brightness-75"
                      />
                    </div>
                    <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-gray-500">
                      Previous
                    </span>
                  </div>

                  {/* Animated arrow */}
                  <div className="flex shrink-0 items-center">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="h-px w-4 sm:w-6"
                        style={{ background: "#D4A017" }}
                        animate={{ opacity: [0.12, 1, 0.12] }}
                        transition={{
                          duration: 1.1, delay: i * 0.22,
                          repeat: Infinity, ease: "easeInOut",
                        }}
                      />
                    ))}
                    <motion.svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#D4A017" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </motion.svg>
                  </div>

                  {/* New logo */}
                  <div className="flex flex-col items-center gap-1.5">
                    <motion.div
                      className="flex h-16 w-24 items-center justify-center rounded-xl bg-white p-2.5 sm:h-[72px] sm:w-[124px]"
                      animate={{
                        boxShadow: [
                          "0 0 0 0px rgba(212,160,23,0)",
                          "0 0 0 5px rgba(212,160,23,0.32)",
                          "0 0 0 0px rgba(212,160,23,0)",
                        ],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                    >
                      <Image
                        src="/images/logo/mz-global-trading-logo-header.webp"
                        alt="New MZ Global Trading logo — updated brand identity"
                        width={106}
                        height={66}
                        className="object-contain"
                      />
                    </motion.div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold">
                      New Identity
                    </span>
                  </div>
                </motion.div>

                {/* ── Tagline ── */}
                <motion.div
                  className="mb-6 text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <p className="text-sm font-semibold text-white">
                    Same Company &bull; Same Ownership &bull; Same Commitment
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Trusted textile sourcing partner — same expertise, stronger identity, better platform
                  </p>
                </motion.div>

                {/* ── Divider ── */}
                <motion.div
                  className="mb-6 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.58 }}
                />

                {/* ── Body copy ── */}
                <motion.p
                  className="mb-5 text-sm leading-relaxed text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.63, duration: 0.4 }}
                >
                  We are pleased to introduce our new corporate identity together with a completely
                  redesigned website built to better serve international buyers, importers, wholesalers
                  and brands worldwide.
                </motion.p>

                {/* ── Category boxes ── */}
                <div className="mb-6 grid grid-cols-3 gap-2.5">
                  {CATEGORIES.map((cat, i) => (
                    <motion.div
                      key={cat.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.70 + i * 0.1, duration: 0.35, ease: "easeOut" }}
                    >
                      <Link
                        href={cat.href}
                        onClick={dismiss}
                        className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-all hover:border-gold/40 hover:bg-white/[0.08]"
                      >
                        <span className="text-xl sm:text-2xl" aria-hidden="true">{cat.icon}</span>
                        <p className="text-xs font-bold text-white">{cat.title}</p>
                        <p className="text-[10px] leading-tight text-gray-400">{cat.desc}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* ── What's New label ── */}
                <motion.p
                  className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-gold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  What&apos;s New
                </motion.p>

                {/* ── Feature list — staggered slide from left ── */}
                <ul className="mb-6 grid grid-cols-1 gap-x-6 gap-y-[7px] sm:grid-cols-2">
                  {FEATURES.map((f, i) => (
                    <motion.li
                      key={f}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.05 + i * 0.09, duration: 0.3, ease: "easeOut" }}
                    >
                      <span
                        className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gold text-[7px] font-black text-navy-900"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className="text-sm leading-snug text-gray-200">{f}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* ── Stats counters ── */}
                <motion.div
                  className="mb-5 grid grid-cols-4 gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 }}
                >
                  {STATS.map(s => (
                    <StatItem key={s.label} {...s} active={statsActive} />
                  ))}
                </motion.div>

                {/* ── Closing copy ── */}
                <motion.p
                  className="mb-5 text-center text-xs italic leading-relaxed text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  Everything you trusted remains the same — only our identity and digital experience
                  have evolved to serve you better.
                </motion.p>

                {/* ── Premium tagline ── */}
                <motion.div
                  className="mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.3 }}
                >
                  <p className="text-sm font-semibold text-white">
                    New Identity.&nbsp; Proven Experience.&nbsp;{" "}
                    <span className="text-gold">Trusted Textile Sourcing.</span>
                  </p>
                  <div
                    className="mx-auto mt-2 h-px w-52"
                    style={{ background: "linear-gradient(90deg, transparent, #D4A017, transparent)" }}
                  />
                </motion.div>

                {/* ── CTAs ── */}
                <motion.div
                  className="mb-5 flex flex-wrap items-center justify-center gap-3"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4 }}
                >
                  <Link
                    href="/our-company/"
                    onClick={dismiss}
                    className="inline-flex items-center rounded-lg bg-gold px-6 py-2.5 text-sm font-bold text-navy-900 transition-colors hover:bg-yellow-400"
                  >
                    Explore What&apos;s New
                  </Link>
                  <button
                    onClick={dismiss}
                    className="inline-flex items-center rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-gray-300 transition-colors hover:border-white/40 hover:text-white"
                  >
                    Continue to Website
                  </button>
                </motion.div>

                {/* ── Don't show again ── */}
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  <label className="group flex cursor-pointer select-none items-center gap-2">
                    <input
                      type="checkbox"
                      checked={dontShow}
                      onChange={e => setDontShow(e.target.checked)}
                      className="h-3.5 w-3.5 cursor-pointer rounded accent-[#D4A017]"
                    />
                    <span className="text-[11px] text-gray-500 transition-colors group-hover:text-gray-400">
                      Don&apos;t show this announcement again
                    </span>
                  </label>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
