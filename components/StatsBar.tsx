"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  {
    icon: "/images/icons/stats/icon-sourcing-experience.svg",
    value: "15+",
    label: "Years Experience",
  },
  {
    icon: "/images/icons/stats/icon-global-quality.svg",
    value: "30+",
    label: "Countries Served",
  },
  {
    icon: "/images/icons/stats/icon-trusted-factories.svg",
    value: "500+",
    label: "Trusted Factories",
  },
  {
    icon: "/images/icons/stats/icon-on-time-delivery.svg",
    value: "95%",
    label: "On-Time Delivery",
  },
  {
    icon: "/images/icons/stats/icon-competitive-pricing.svg",
    value: "100%",
    label: "Quality Certified",
  },
];

export default function StatsBar() {
  return (
    <section className="bg-navy-900 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <Image src={stat.icon} alt={stat.label} width={40} height={40} />
              <div>
                <p className="text-gold text-2xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-gray-300 text-xs sm:text-sm mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
