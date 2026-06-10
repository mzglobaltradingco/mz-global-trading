"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  image: string;
  imageAlt: string;
  breadcrumbs: BreadcrumbItem[];
  label: string;
  title: string;
  titleGold?: string;
  description: string;
  pills?: string[];
}

const pillContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.36 } },
};

const pillVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function PageHero({
  image,
  imageAlt,
  breadcrumbs,
  label,
  title,
  titleGold,
  description,
  pills,
}: PageHeroProps) {
  return (
    <section className="relative bg-navy-900 min-h-[360px] sm:min-h-[460px] pt-14 pb-16 sm:pt-16 sm:pb-20 overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/75 to-navy-950/50"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap"
        >
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">›</span>}
                {!isLast && crumb.href ? (
                  <Link href={crumb.href} className="hover:text-gold transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-gold" : "text-gray-400"}>
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </motion.nav>

        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            {label}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
          >
            {title}
            {titleGold && (
              <>
                {" "}
                <span className="text-gold">{titleGold}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
          >
            {description}
          </motion.p>

          {pills && pills.length > 0 && (
            <motion.div
              variants={pillContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              {pills.map((pill) => (
                <motion.span
                  key={pill}
                  variants={pillVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                  {pill}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
