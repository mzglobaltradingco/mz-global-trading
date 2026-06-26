"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
