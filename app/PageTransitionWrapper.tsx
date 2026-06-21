"use client";

import { motion } from "@/lib/motion-shim";
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
