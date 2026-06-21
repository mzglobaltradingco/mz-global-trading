"use client";

import { useRef, useEffect, useState } from "react";
import type { ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;   // ms
  y?: number;       // initial translateY px — pass 0 for fade-only
  duration?: number; // ms
}

export default function AnimateInView({
  children,
  className = "",
  delay = 0,
  y = 24,
  duration = 500,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        {
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : `translateY(${y}px)`,
          transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
          transitionDelay: `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
