"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: "/images/icons/whyus/icon-quality-assurance.svg",
    title: "Quality Assurance",
    desc: "Every order goes through rigorous quality checks by our in-house QC team before shipment.",
  },
  {
    icon: "/images/icons/whyus/icon-pricing.svg",
    title: "Competitive Pricing",
    desc: "Direct factory relationships let us deliver premium products at the most competitive prices.",
  },
  {
    icon: "/images/icons/whyus/icon-ethical-sourcing.svg",
    title: "Ethical Sourcing",
    desc: "We partner exclusively with GOTS, BSCI, and Sedex-certified factories committed to fair labor.",
  },
  {
    icon: "/images/icons/whyus/icon-strong-network.svg",
    title: "Strong Network",
    desc: "500+ vetted factories across Pakistan give you access to every product category under one roof.",
  },
  {
    icon: "/images/icons/whyus/icon-timely-delivery.svg",
    title: "Timely Delivery",
    desc: "95% on-time delivery rate backed by real-time production tracking and proactive communication.",
  },
  {
    icon: "/images/icons/whyus/icon-custom-solutions.svg",
    title: "Custom Solutions",
    desc: "From custom specifications to branded packaging — we tailor every sourcing program to your exact business needs.",
  },
];

const headingVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const headingItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  hover: { y: -6, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

const iconVariants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 400, damping: 18, delay: 0.22 } },
};

export default function WhyUs() {
  return (
    <section className="py-16 sm:py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-12"
        >
          <motion.p variants={headingItemVariants} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Why Work With Us
          </motion.p>
          <motion.h2 variants={headingItemVariants} className="text-3xl sm:text-4xl font-bold text-white">
            Built on Trust, Driven by Quality
          </motion.h2>
          <motion.p variants={headingItemVariants} className="text-gray-400 text-base mt-3 max-w-2xl mx-auto">
            We&apos;ve spent over a decade building the systems, relationships, and expertise that international buyers demand.
          </motion.p>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              variants={cardVariants}
              whileHover="hover"
              className="bg-navy-800/60 border border-white/5 rounded-xl p-6 hover:border-gold/30 transition-colors group cursor-default"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  variants={iconVariants}
                  className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors"
                >
                  <Image src={r.icon} alt={r.title} width={28} height={28} />
                </motion.div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1.5">{r.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
