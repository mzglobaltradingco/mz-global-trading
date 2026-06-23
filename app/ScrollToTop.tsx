"use client";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

// Module-level flags set by popstate before React re-renders.
// popstate fires on browser back/forward; link clicks do not trigger it.
let shouldRestore = false;
let restoreY = 0;

export default function ScrollToTop() {
  const pathname = usePathname();

  // Detect browser back/forward: read saved position for the destination URL.
  useEffect(() => {
    const onPopState = () => {
      const saved = sessionStorage.getItem(`scroll:${window.location.pathname}`);
      shouldRestore = saved !== null;
      restoreY = saved ? parseInt(saved, 10) : 0;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Save scroll position as the user scrolls (debounced 150ms).
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const save = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        sessionStorage.setItem(`scroll:${pathname}`, String(window.scrollY));
      }, 150);
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", save);
    };
  }, [pathname]);

  // Before first paint: restore saved position (back nav) or jump to top (forward nav).
  useLayoutEffect(() => {
    if (shouldRestore) {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, restoreY);
      document.documentElement.style.scrollBehavior = "";
    } else {
      history.scrollRestoration = "manual";
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = "";
    }
  }, [pathname]);

  // After paint: forward nav gets a second reset pass to beat Next.js's own
  // post-commit scroll restoration. Back nav skips this so the restore isn't overridden.
  useEffect(() => {
    if (shouldRestore) {
      shouldRestore = false;
      return;
    }
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
