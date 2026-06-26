import type { Variants } from "framer-motion";

// Shared viewport config — fires once when 15% is visible
export const viewportOnce = { once: true, amount: 0.15 } as const;

// Fade up on scroll
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
// Legacy alias
export const fadeUpVariants = fadeUpVariant;

// Stagger container — wrap grids/lists; children use staggerItemVariants
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};
// Legacy alias
export const staggerContainerVariants = staggerContainer;

// Stagger item
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Card variant — fade up + slight initial rotation, snaps flat on entry
export const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30, rotate: -3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Hero text — staggered slide-up per line/word
export const heroTextVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Page transition — used by PageTransitionWrapper
export const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, ease: "easeOut" },
} as const;
// Legacy alias
export const pageTransitionConfig = pageTransition;

// Scale on hover — use as whileHover prop: whileHover={scaleOnHover}
export const scaleOnHover = {
  scale: 1.03,
  boxShadow: "0 0 20px 4px rgba(212,160,23,0.22)",
  transition: { duration: 0.2 },
};

// Floating loop — hero decorative elements
export const floatVariants: Variants = {
  animate: {
    y: [0, -14, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

// Counter variant — for number count-up sections
export const counterVariant: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

