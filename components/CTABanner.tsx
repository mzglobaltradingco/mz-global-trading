"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="py-14 sm:py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Ready to Source?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            Looking for a Reliable <br className="hidden sm:block" />
            <span className="text-gold">Sourcing Partner?</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Tell us what you need. Our team will respond within 24 hours with a
            tailored sourcing proposal.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 text-base font-bold rounded hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
          >
            Request a Quote Now →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
