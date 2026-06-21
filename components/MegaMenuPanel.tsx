"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type SubItem = { label: string; href: string; img: string; imgAlt: string };

type CategoryRow = {
  heading: string;
  href?: string;
  img: string;
  imgAlt: string;
  items?: SubItem[];
};

export interface ActiveMegaItem {
  mega: {
    panel: { heading: string; bullets: string[]; ctaLabel: string; ctaHref: string };
    rows: CategoryRow[];
  };
}

interface Props {
  activeItem: ActiveMegaItem;
  currentImg: string;
  currentLabel: string;
  currentAlt: string;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onPreview: (img: string, label: string, alt: string) => void;
  onRowHover: (img: string, heading: string, alt: string) => void;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const panelVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 26,
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

const leftPanelVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 26 },
  },
};

const rowsContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.055 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 340,
      damping: 28,
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 420, damping: 32 },
  },
};

const previewZoneVariants = {
  hidden: { opacity: 0, x: 14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 26 },
  },
};

// ─── Sub-item link ─────────────────────────────────────────────────────────────

function SubItemLink({
  item,
  onClose,
  onHover,
}: {
  item: SubItem;
  onClose: () => void;
  onHover: (img: string, label: string, alt: string) => void;
}) {
  return (
    <motion.div variants={itemVariants} className="flex-shrink-0">
      <Link
        href={item.href}
        onClick={onClose}
        onMouseEnter={() => onHover(item.img, item.label, item.imgAlt)}
        className="relative group inline-flex items-center px-3 py-1.5 text-[13px] text-gray-300 hover:text-gold rounded transition-colors duration-150"
      >
        {item.label}
        <span className="absolute bottom-0.5 left-3 right-3 h-px bg-gold/70 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200 ease-out" />
      </Link>
    </motion.div>
  );
}

// ─── Panel ────────────────────────────────────────────────────────────────────

export default function MegaMenuPanel({
  activeItem,
  currentImg,
  currentLabel,
  currentAlt,
  onClose,
  onMouseEnter,
  onMouseLeave,
  onPreview,
  onRowHover,
}: Props) {
  const { panel, rows } = activeItem.mega;

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      className="hidden lg:block absolute top-full left-0 right-0 bg-[#08111f] border-t border-gold/20 shadow-2xl z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex gap-8">

        {/* ① Left brand panel */}
        <motion.div
          variants={leftPanelVariants}
          className="flex-shrink-0 w-52 xl:w-60 border-r border-white/10 pr-8 flex flex-col"
        >
          <p className="text-gold text-[10px] font-bold tracking-[0.18em] uppercase mb-3">
            MZ Global Trading
          </p>
          <h3 className="text-white text-[14px] font-semibold leading-snug mb-4">
            {panel.heading}
          </h3>
          <ul className="space-y-2.5 mb-6 flex-1">
            {panel.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span className="mt-[5px] flex-shrink-0 w-1 h-1 rounded-full bg-gold" />
                <span className="text-gray-400 text-[12px] leading-snug">{b}</span>
              </li>
            ))}
          </ul>
          <Link
            href={panel.ctaHref}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 self-start px-4 py-2 bg-gold text-navy-900 text-[12px] font-bold rounded hover:bg-yellow-400 transition-colors"
          >
            {panel.ctaLabel}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* ② Category rows */}
        <motion.div
          variants={rowsContainerVariants}
          className="flex-1 min-w-0 divide-y divide-white/[0.06]"
        >
          {rows.map((row) => (
            <motion.div
              key={row.heading}
              variants={rowVariants}
              className="flex items-start gap-4 py-2.5 first:pt-0 last:pb-0"
              onMouseEnter={() => onRowHover(row.img, row.heading, row.imgAlt)}
            >
              <div className="flex-shrink-0 w-36 xl:w-40 pt-1">
                {row.href ? (
                  <Link
                    href={row.href}
                    onClick={onClose}
                    className="group inline-flex items-center gap-1 text-[10.5px] font-bold tracking-[0.14em] uppercase text-gold/75 hover:text-gold transition-colors duration-150"
                  >
                    {row.heading}
                    <svg
                      className="w-2.5 h-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-gold/75">
                    {row.heading}
                  </span>
                )}
              </div>

              {row.items && row.items.length > 0 ? (
                <div className="flex flex-wrap flex-1 min-w-0">
                  {row.items.map((item) => (
                    <SubItemLink
                      key={item.href}
                      item={item}
                      onClose={onClose}
                      onHover={onPreview}
                    />
                  ))}
                </div>
              ) : (
                row.href && (
                  <motion.div variants={itemVariants} className="pt-1">
                    <Link
                      href={row.href}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-[13px] text-gray-400 hover:text-gold transition-colors duration-150"
                    >
                      View All
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                )
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* ③ Preview zone */}
        <motion.div
          variants={previewZoneVariants}
          className="flex-shrink-0 w-44 xl:w-52 border-l border-white/10 pl-8 flex flex-col gap-3"
        >
          <div className="relative w-full rounded-lg overflow-hidden bg-navy-800" style={{ aspectRatio: "4/3" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {currentImg && (
                  <Image
                    src={currentImg}
                    alt={currentAlt}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </div>

          <div className="min-h-[2rem]">
            <AnimatePresence mode="wait">
              {currentLabel && (
                <motion.p
                  key={currentLabel}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-[12px] text-gray-300 font-medium text-center leading-snug"
                >
                  {currentLabel}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Link
            href={panel.ctaHref}
            onClick={onClose}
            className="mt-auto text-[11px] text-gold/60 hover:text-gold text-center transition-colors duration-150"
          >
            View Full Range →
          </Link>
        </motion.div>

      </div>
    </motion.div>
  );
}
