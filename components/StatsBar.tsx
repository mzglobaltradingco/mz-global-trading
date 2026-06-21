"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
  viewportOnce,
  useCountUp,
} from "@/lib/animations";

const stats = [
  {
    icon: "/images/icons/stats/icon-sourcing-experience.svg",
    value: "10+",
    label: "Certifications",
  },
  {
    icon: "/images/icons/stats/icon-global-quality.svg",
    value: "25+",
    label: "Countries Served",
  },
  {
    icon: "/images/icons/stats/icon-trusted-factories.svg",
    value: "50+",
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

function StatCounter({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const num = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const { count, ref } = useCountUp(num);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsBar() {
  return (
    <section className="bg-navy-900 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItemVariants}
              className="flex flex-col items-center text-center gap-3"
            >
              <Image src={stat.icon} alt={stat.label} width={40} height={40} />
              <div>
                <p className="text-gold text-2xl sm:text-3xl font-bold">
                  <StatCounter value={stat.value} />
                </p>
                <p className="text-gray-300 text-xs sm:text-sm mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
