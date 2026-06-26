"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageTransitionConfig } from "@/lib/animations";

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return <>{children}</>;

  return (
    <motion.div key={pathname} {...pageTransitionConfig}>
      {children}
    </motion.div>
  );
}
