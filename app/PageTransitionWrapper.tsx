"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageTransitionConfig } from "@/lib/animations";

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div key={pathname} {...pageTransitionConfig}>
      {children}
    </motion.div>
  );
}
