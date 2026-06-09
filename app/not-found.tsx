"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ── Left — white, large logo ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="flex-1 bg-white flex items-center justify-center px-10 py-20 md:py-0"
      >
        <Link href="/" aria-label="MZ Global Trading — Return to homepage">
          <Image
            src="/images/logo/logo-dark.png"
            alt="MZ Global Trading — Pakistan Textile Sourcing Partner"
            width={520}
            height={148}
            className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] h-auto"
            priority
          />
        </Link>
      </motion.div>

      {/* ── Gold separator ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ scaleY: 0, scaleX: 0 }}
        animate={{ scaleY: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        className="h-1.5 md:h-auto md:w-1.5 bg-gold flex-shrink-0 origin-center"
      />

      {/* ── Right — dark navy, 404 + buttons ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
        className="flex-1 bg-navy-950 flex items-center justify-center px-10 py-20 md:py-0 relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="relative text-center">

          {/* 404 digits */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6 select-none" aria-hidden="true">
            {["4", "0", "4"].map((digit, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.45 + i * 0.1, ease: "easeOut" }}
                className="text-[100px] sm:text-[130px] lg:text-[160px] font-bold leading-none text-transparent"
                style={{ WebkitTextStroke: "2px rgba(212,175,55,0.55)" }}
              >
                {digit}
              </motion.span>
            ))}
          </div>

          {/* Gold divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 52 }}
            transition={{ duration: 0.5, delay: 0.78, ease: "easeOut" }}
            className="h-px bg-gold mx-auto mb-5"
          />

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.86 }}
            className="text-white text-xl sm:text-2xl font-bold mb-2"
          >
            Page Not Found
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.96 }}
            className="text-gray-500 text-sm leading-relaxed max-w-[260px] mx-auto mb-9"
          >
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.05 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center px-7 py-3 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/10"
            >
              ← Return to Home
            </Link>
            <Link
              href="/contact-us/"
              className="inline-flex items-center justify-center px-7 py-3 border border-white/20 text-white text-sm font-semibold rounded hover:border-gold hover:text-gold transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>

        </div>
      </motion.div>

    </div>
  );
}
