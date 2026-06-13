"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type QuickResult = {
  url: string;
  title: string;
  excerpt: string;
  category: string;
};

function categorise(url: string): string {
  if (/\/(apparel|hometextile|fabric)\//.test(url)) return "Products";
  if (url.startsWith("/guides/")) return "Guides";
  if (url.startsWith("/downloads/")) return "Downloads";
  if (url.startsWith("/knowledge/")) return "Knowledge Hub";
  return "Pages";
}

const BADGE: Record<string, string> = {
  Products: "bg-navy-900/8 text-navy-900",
  Guides: "bg-emerald-50 text-emerald-700",
  Downloads: "bg-blue-50 text-blue-700",
  "Knowledge Hub": "bg-purple-50 text-purple-700",
  Pages: "bg-gray-100 text-gray-600",
};

const PRIORITY_ORDER = ["Products", "Pages", "Guides", "Downloads", "Knowledge Hub"];

const QUICK_SEARCHES = ["Towels", "T-Shirts", "Bedsheets", "GOTS certified", "Sourcing guide"];

export default function SearchWidget({ onOpen }: { onOpen?: () => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<QuickResult[]>([]);
  const [total, setTotal] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pf, setPf] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error — runtime file; webpackIgnore keeps webpack from resolving it at build
        const mod = await import(/* webpackIgnore: true */ "/_pagefind/pagefind.js");
        await mod.init();
        setPf(mod);
      } catch {
        // Not available before first build — silently ignore
      }
    })();
  }, []);

  useEffect(() => {
    if (open) {
      onOpen?.();
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery("");
      setResults([]);
      setTotal(0);
    }
  }, [open, onOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onMouse(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onMouse);
    return () => document.removeEventListener("mousedown", onMouse);
  }, [open]);

  const doSearch = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (q: string) => {
      if (!pf || !q.trim()) {
        setResults([]);
        setTotal(0);
        return;
      }
      try {
        const res = await pf.search(q);
        setTotal(res.results.length);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await Promise.all(res.results.slice(0, 10).map((r: any) => r.data()));
        // Group by category, max 2 per category
        const grouped: Record<string, QuickResult[]> = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const d of data) {
          const cat = categorise(d.url);
          if (!grouped[cat]) grouped[cat] = [];
          if (grouped[cat].length < 2) {
            grouped[cat].push({
              url: d.url,
              title: d.meta?.title || d.url,
              excerpt: d.excerpt || "",
              category: cat,
            });
          }
        }
        // Emit in priority order: Products → Pages → Guides → Downloads → Knowledge Hub
        const sorted: QuickResult[] = [];
        for (const cat of PRIORITY_ORDER) {
          if (grouped[cat]) sorted.push(...grouped[cat]);
        }
        setResults(sorted);
      } catch {
        setResults([]);
      }
    },
    [pf]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 280);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search/?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Search"
        aria-expanded={open}
        className={`p-2 rounded transition-colors duration-150 ${
          open ? "text-gold" : "text-gray-600 hover:text-gold"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Site search"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="absolute right-0 top-full mt-3 w-[400px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            {/* Input row */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-b border-gray-100"
            >
              <svg
                className="w-4 h-4 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, guides, downloads…"
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </form>

            {/* Results or empty state */}
            {query.trim() ? (
              results.length > 0 ? (
                <>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                    {results.map((r) => (
                      <Link
                        key={r.url}
                        href={r.url}
                        onClick={() => setOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <span
                          className={`flex-shrink-0 mt-0.5 px-1.5 py-0.5 text-[10px] font-semibold rounded tracking-wide whitespace-nowrap ${
                            BADGE[r.category] ?? BADGE.Pages
                          }`}
                        >
                          {r.category}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-gray-900 group-hover:text-gold transition-colors truncate">
                            {r.title}
                          </p>
                          <p
                            className="text-xs text-gray-500 mt-0.5 line-clamp-1 [&_mark]:bg-gold/25 [&_mark]:text-navy-900 [&_mark]:rounded-sm"
                            dangerouslySetInnerHTML={{ __html: r.excerpt }}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                    <Link
                      href={`/search/?q=${encodeURIComponent(query.trim())}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between text-sm font-semibold text-navy-900 hover:text-gold transition-colors"
                    >
                      <span>
                        See all {total} result{total !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
                      </span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm font-medium text-gray-700">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try a different keyword or browse the menu
                  </p>
                </div>
              )
            ) : (
              <div className="px-4 py-4">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em] mb-3">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_SEARCHES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="px-3 py-1.5 text-xs text-gray-700 bg-gray-100 hover:bg-gold/10 hover:text-gold rounded-full transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
