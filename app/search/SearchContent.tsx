"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type ResultCategory = "Products" | "Guides" | "Downloads" | "Knowledge Hub" | "Pages";
type ActiveTab = "All" | ResultCategory;

interface SearchResult {
  url: string;
  title: string;
  excerpt: string;
  category: ResultCategory;
}

type Grouped = Record<ResultCategory, SearchResult[]>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function categorise(url: string): ResultCategory {
  if (/\/(apparel|hometextile|fabric)\//.test(url)) return "Products";
  if (url.startsWith("/guides/")) return "Guides";
  if (url.startsWith("/downloads/")) return "Downloads";
  if (url.startsWith("/knowledge/")) return "Knowledge Hub";
  return "Pages";
}

const CATEGORY_ORDER: ResultCategory[] = [
  "Products",
  "Pages",
  "Guides",
  "Downloads",
  "Knowledge Hub",
];

const CAT_META: Record<
  ResultCategory,
  { badge: string; accent: string; cta: string; icon: React.ReactNode }
> = {
  Products: {
    badge: "bg-navy-900 text-white",
    accent: "border-navy-900/20",
    cta: "View Product",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    ),
  },
  Guides: {
    badge: "bg-emerald-600 text-white",
    accent: "border-emerald-200",
    cta: "Read Guide",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  Downloads: {
    badge: "bg-blue-600 text-white",
    accent: "border-blue-200",
    cta: "View & Print",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  "Knowledge Hub": {
    badge: "bg-purple-600 text-white",
    accent: "border-purple-200",
    cta: "Read Article",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  Pages: {
    badge: "bg-gray-500 text-white",
    accent: "border-gray-200",
    cta: "View Page",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
};

// ─── Result Card ─────────────────────────────────────────────────────────────

function ResultCard({ result }: { result: SearchResult }) {
  const meta = CAT_META[result.category];
  return (
    <Link
      href={result.url}
      className={`group flex flex-col gap-3 p-5 bg-white rounded-xl border ${meta.accent} hover:border-gold/40 hover:shadow-md transition-all duration-200`}
    >
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-semibold rounded tracking-wide ${meta.badge}`}>
          {meta.icon}
          {result.category}
        </span>
      </div>
      <h3 className="text-[15px] font-semibold text-navy-900 group-hover:text-gold transition-colors leading-snug line-clamp-2">
        {result.title}
      </h3>
      <p
        className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1 [&_mark]:bg-gold/25 [&_mark]:text-navy-900 [&_mark]:rounded-xs"
        dangerouslySetInnerHTML={{ __html: result.excerpt }}
      />
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold mt-auto">
        {meta.cta}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

// ─── Section (used in "All" tab) ─────────────────────────────────────────────

function CategorySection({
  category,
  results,
  onViewAll,
}: {
  category: ResultCategory;
  results: SearchResult[];
  onViewAll: (cat: ResultCategory) => void;
}) {
  const meta = CAT_META[category];
  const shown = results.slice(0, 3);
  const remaining = results.length - shown.length;
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg tracking-wide shrink-0 ${meta.badge}`}
        >
          {meta.icon}
          {category}
        </span>
        <span className="text-xs font-semibold text-gray-500 shrink-0">
          {results.length} result{results.length !== 1 ? "s" : ""}
        </span>
        <div className="flex-1 h-px bg-gray-200" />
        {remaining > 0 && (
          <button
            onClick={() => onViewAll(category)}
            className="shrink-0 text-xs font-semibold text-gold hover:underline transition-colors"
          >
            View all {results.length} →
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shown.map((r) => (
          <ResultCard key={r.url} result={r} />
        ))}
      </div>
    </section>
  );
}

// ─── Skeleton grid ────────────────────────────────────────────────────────────

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-44 bg-gray-100 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlQuery = searchParams.get("q") || "";

  const [inputQuery, setInputQuery] = useState(urlQuery);
  const [allResults, setAllResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("All");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pf, setPf] = useState<any>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync input when URL query changes (browser back/forward)
  useEffect(() => {
    setInputQuery(urlQuery);
  }, [urlQuery]);

  // Load Pagefind once
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

  const doSearch = useCallback(
    async (q: string) => {
      if (!pf) return;
      if (!q.trim()) {
        setAllResults([]);
        setSearched(false);
        return;
      }
      setLoading(true);
      try {
        const res = await pf.search(q);
        // Load all results (up to 50)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await Promise.all(res.results.slice(0, 50).map((r: any) => r.data()));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped: SearchResult[] = data.map((d: any) => ({
          url: d.url,
          title: d.meta?.title || d.url,
          excerpt: d.excerpt || "",
          category: categorise(d.url),
        }));
        setAllResults(mapped);
        setSearched(true);
      } catch {
        setAllResults([]);
        setSearched(true);
      } finally {
        setLoading(false);
      }
    },
    [pf]
  );

  // Search when pf loads with an existing URL query
  useEffect(() => {
    if (pf && urlQuery) doSearch(urlQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pf]);

  // Debounced live search as user types
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (pf) doSearch(inputQuery);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputQuery, pf, doSearch]);

  // Group results by category
  const grouped: Grouped = {
    Products: [],
    Guides: [],
    Downloads: [],
    "Knowledge Hub": [],
    Pages: [],
  };
  allResults.forEach((r) => grouped[r.category].push(r));

  const populatedCategories = CATEGORY_ORDER.filter((c) => grouped[c].length > 0);

  // Reset active tab if it no longer has results
  useEffect(() => {
    if (activeTab !== "All" && grouped[activeTab as ResultCategory]?.length === 0) {
      setActiveTab("All");
    }
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    router.push(`/search/?q=${encodeURIComponent(inputQuery.trim())}`);
  }

  const displayResults =
    activeTab === "All" ? allResults : grouped[activeTab as ResultCategory] || [];

  return (
    <>
      {/* Hero / search bar */}
      <section className="bg-navy-900 pt-12 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Site Search
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Find What You&rsquo;re Looking For
          </h1>
          <form onSubmit={handleSubmit} className="relative">
            <label htmlFor="search-input" className="sr-only">
              Search products, guides and downloads
            </label>
            <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-xl px-3 sm:px-5 py-3 sm:py-4 shadow-xl">
              <svg
                className="w-5 h-5 text-gray-500 shrink-0"
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
                id="search-input"
                type="search"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Search products, guides…"
                className="flex-1 min-w-0 text-base text-gray-800 placeholder-gray-400 outline-none bg-transparent appearance-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              />
              {inputQuery && (
                <button
                  type="button"
                  onClick={() => setInputQuery("")}
                  aria-label="Clear search"
                  className="shrink-0 text-gray-500 hover:text-gray-600 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                aria-label="Search"
                className="shrink-0 flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2 bg-gold text-navy-900 text-sm font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                <svg
                  className="w-4 h-4 sm:hidden"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results area */}
      <section className="bg-gray-50 min-h-[60vh] px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">

          {/* Loading state */}
          {loading && <SkeletonGrid />}

          {/* Has results */}
          {!loading && searched && allResults.length > 0 && (
            <>
              {/* Result count + tab bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-navy-900">{allResults.length}</span>{" "}
                  result{allResults.length !== 1 ? "s" : ""} for{" "}
                  <span className="font-semibold text-navy-900">&ldquo;{inputQuery}&rdquo;</span>
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  role="tablist"
                  aria-label="Filter results by category"
                >
                  <button
                    role="tab"
                    aria-selected={activeTab === "All"}
                    onClick={() => setActiveTab("All")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeTab === "All"
                        ? "bg-navy-900 text-white"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-navy-900/30 hover:text-navy-900"
                    }`}
                  >
                    All ({allResults.length})
                  </button>
                  {populatedCategories.map((cat) => (
                    <button
                      key={cat}
                      role="tab"
                      aria-selected={activeTab === cat}
                      onClick={() => setActiveTab(cat)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeTab === cat
                          ? "bg-navy-900 text-white"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-navy-900/30 hover:text-navy-900"
                      }`}
                    >
                      {cat} ({grouped[cat].length})
                    </button>
                  ))}
                </div>
              </div>

              {/* All tab — sections with max 3 each */}
              <AnimatePresence mode="wait">
                {activeTab === "All" ? (
                  <motion.div
                    key="all"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-10"
                  >
                    {populatedCategories.map((cat) => (
                      <CategorySection
                        key={cat}
                        category={cat}
                        results={grouped[cat]}
                        onViewAll={(c) => setActiveTab(c)}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {displayResults.map((r) => (
                        <ResultCard key={r.url} result={r} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* No results */}
          {!loading && searched && allResults.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-6">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-navy-900 mb-2">
                No results for &ldquo;{inputQuery}&rdquo;
              </h2>
              <p className="text-gray-500 mb-10">
                Try different keywords or browse our product categories below.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "Apparel", href: "/apparel/" },
                  { label: "Home Textiles", href: "/hometextile/" },
                  { label: "Fabric", href: "/fabric/" },
                  { label: "Guides", href: "/guides/" },
                  { label: "Downloads", href: "/downloads/" },
                  { label: "Knowledge Hub", href: "/knowledge/" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-navy-900 hover:border-gold hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Empty state — no query yet */}
          {!loading && !searched && (
            <div className="text-center py-20 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-base">Type a keyword above to search</p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
