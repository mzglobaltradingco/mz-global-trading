"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gold z-[100] origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
