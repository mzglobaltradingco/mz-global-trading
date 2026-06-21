"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const COOKIE_KEY = "mz_cookie_consent";
const COOKIE_DAYS = 365;

function writeCookie(value: string) {
  const exp = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();
  document.cookie = `${COOKIE_KEY}=${value}; expires=${exp}; path=/; SameSite=Lax`;
}

function readCookie(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY}=([^;]*)`));
  return m ? m[1] : null;
}

function applyConsent(analyticsGranted: boolean) {
  if (typeof window === "undefined") return;
  const state = analyticsGranted ? "granted" : "denied";
  window.gtag?.("consent", "update", { analytics_storage: state });
  window.dataLayer?.push({ event: "cookie_consent_update", analytics_storage: state });
}

export default function CookieConsent() {
  const [visible, setVisible]     = useState(false);
  const [panel, setPanel]         = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const saved = readCookie();
    if (saved) {
      applyConsent(saved === "all");
    } else {
      const t = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  function acceptAll() {
    writeCookie("all");
    applyConsent(true);
    setVisible(false);
  }

  function savePreferences() {
    writeCookie(analytics ? "all" : "essential");
    applyConsent(analytics);
    setVisible(false);
    setPanel(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(13,27,42,0.08)]"
    >
      {/* ── Preferences panel ─────────────────────────────────────────────────── */}
      {panel && (
        <div className="border-b border-gray-100 bg-gray-50 px-4 sm:px-8 py-5">
          <div className="max-w-4xl mx-auto">
            <p className="text-navy-900 font-bold text-sm mb-4">Manage Cookie Preferences</p>
            <div className="space-y-3 mb-5">

              {/* Essential — always on, non-interactive */}
              <div className="flex items-start sm:items-center justify-between gap-4 bg-white rounded-xl border border-gray-200 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-navy-900 text-sm font-semibold">Essential Cookies</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                    Required for the site to function correctly. Cannot be disabled.
                  </p>
                </div>
                <div
                  aria-label="Essential cookies: always active"
                  className="shrink-0 w-10 h-6 rounded-full bg-navy-900 flex items-center justify-end pr-1 opacity-50 cursor-not-allowed"
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </div>
              </div>

              {/* Analytics — toggleable */}
              <div className="flex items-start sm:items-center justify-between gap-4 bg-white rounded-xl border border-gray-200 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-navy-900 text-sm font-semibold">Analytics Cookies</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                    Google Analytics — helps us understand how visitors use the site so we can improve it.
                    No personal data is shared or sold.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  onClick={() => setAnalytics((v) => !v)}
                  aria-label={`Analytics cookies ${analytics ? "on" : "off"}`}
                  className={`shrink-0 w-10 h-6 rounded-full transition-colors duration-200 flex items-center ${
                    analytics ? "bg-gold justify-end pr-1" : "bg-gray-200 justify-start pl-1"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={savePreferences}
                className="px-6 py-2.5 bg-navy-900 text-white text-sm font-bold rounded-lg hover:bg-navy-800 transition-colors"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={() => setPanel(false)}
                className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main banner row ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed flex-1">
          We use cookies to analyse site traffic and improve your experience. See our{" "}
          <Link
            href="/privacypolicy/"
            className="text-navy-900 font-semibold underline underline-offset-2 hover:text-gold transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setPanel((v) => !v)}
            className="text-gray-400 text-xs font-medium hover:text-navy-900 transition-colors underline underline-offset-2 whitespace-nowrap"
          >
            {panel ? "Hide Preferences" : "Manage Preferences"}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="px-5 py-2.5 bg-gold text-navy-900 text-sm font-bold rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap shadow-xs shadow-gold/20"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
