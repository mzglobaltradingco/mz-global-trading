"use client";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  // Round 1 — before first paint: neutralise any CSS smooth-scroll and jump to 0.
  // This covers the majority of navigations where the browser hasn't yet painted.
  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = "";
  }, [pathname]);

  // Round 2 — one rAF after React commits: override any scroll position that
  // Next.js's own post-commit router logic may have applied (e.g. router-cache
  // scroll restoration that runs after useLayoutEffect).
  // behavior:"instant" bypasses css scroll-behavior and cancels ongoing smooth scrolls.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
