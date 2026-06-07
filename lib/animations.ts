"use client";

import type { Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Fade up on scroll — use with whileInView + variants on any section
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Stagger container — wrap a grid/list with this, items use staggerItemVariants
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// Stagger item — applied to each card / box inside a stagger container
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Floating loop — apply to hero decorative elements with animate="animate"
export const floatVariants: Variants = {
  animate: {
    y: [0, -14, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

// Page transition — consumed by PageTransitionWrapper in layout.tsx
export const pageTransitionConfig = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, ease: "easeOut" },
} as const;

// Shared viewport config — once: true so animation fires once when 15% visible
export const viewportOnce = { once: true, amount: 0.15 } as const;

// GSAP counter hook — attach ref to the <span> that displays the number.
// Animation starts when that element scrolls into view.
export function useCountUp(end: number, duration = 2) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const obj = { value: 0 };
          gsap.to(obj, {
            value: end,
            duration,
            ease: "power2.out",
            onUpdate: () => setCount(Math.round(obj.value)),
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}
