"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  staggerContainerVariants,
  viewportOnce,
} from "@/lib/animations";

const numReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.8 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};
import PageHero from "@/components/PageHero";
import { getAllPosts, getFeaturedPost } from "@/lib/knowledge";
import PostCard from "@/components/knowledge/PostCard";
import FeaturedBanner from "@/components/knowledge/FeaturedBanner";
import EmptyState from "@/components/knowledge/EmptyState";
import NewsletterStrip from "@/components/knowledge/NewsletterStrip";
import type { KnowledgeCategory } from "@/types/knowledge";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: ("All" | KnowledgeCategory)[] = [
  "All",
  "Trade Insights",
  "Company Updates",
  "Resources",
];
const PAGE_SIZE = 12;

type SortMode = "newest" | "featured";

// ─── Component ────────────────────────────────────────────────────────────────

export default function KnowledgeHubContent() {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | KnowledgeCategory>("All");
  const [sort, setSort] = useState<SortMode>("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sentinelRef = useRef<HTMLDivElement>(null);

  // ── Filtered + sorted result set ──────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = allPosts;

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sort === "featured") {
      result = result.filter((p) => p.featured);
    } else {
      result = [...result].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return result;
  }, [allPosts, query, category, sort]);

  // Reset visible count when filters change — but keep scroll position stable
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, category, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // ── Infinite scroll — load next page when sentinel enters viewport ─────────
  const loadMore = useCallback(() => {
    setVisibleCount((n) => Math.min(n + PAGE_SIZE, filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) loadMore();
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setSort("newest");
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-knowledge.webp"
        imageAlt="Pakistan textile knowledge hub — sourcing guides and trade insights for international buyers"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
          { label: "Knowledge Hub" },
        ]}
        label="Knowledge Hub"
        title="Trade Insights &"
        titleGold="Sourcing Guides"
        description="Practical knowledge for procurement managers and brand buyers sourcing textiles from Pakistan — fabric specifications, compliance, logistics and industry news."
        pills={["Trade Insights", "Company Updates", "Resources"]}
      />

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden"
          >
            {[
              { val: "53", label: "Articles", delay: 0 },
              { val: "250+", label: "Minutes of Content", delay: 0.08 },
              { val: "3", label: "Categories", delay: 0.16 },
              { val: "Free", label: "Read Online", delay: 0.24 },
            ].map((s) => (
              <motion.div
                key={s.label}
                custom={s.delay}
                variants={numReveal}
                className="bg-white px-6 py-6 text-center"
              >
                <p className="text-3xl font-bold text-navy-900 leading-none mb-1">{s.val}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky search + filter bar ────────────────────────────────────── */}
      <div className="sticky top-32 z-10 bg-white/95 backdrop-blur-xs border-b border-gray-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <label htmlFor="knowledge-search" className="sr-only">Search articles</label>
            <input
              id="knowledge-search"
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg text-navy-900 placeholder-gray-400 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition bg-white"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  category === cat
                    ? "bg-navy-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort toggle */}
          <div className="flex items-center gap-1 ml-auto shrink-0" role="group" aria-label="Sort articles">
            {(["newest", "featured"] as SortMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setSort(mode)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors capitalize ${
                  sort === mode ? "bg-gold text-navy-900" : "text-gray-500 hover:text-navy-900"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured banner — only when no active filter/search */}
          {featuredPost && !query.trim() && category === "All" && (
            <FeaturedBanner post={featuredPost} />
          )}

          {/* Results count when filtering */}
          {(query.trim() || category !== "All") && (
            <p className="text-gray-500 text-sm mb-6">
              {filtered.length} {filtered.length === 1 ? "article" : "articles"}
              {query.trim() && ` for "${query.trim()}"`}
              {category !== "All" && ` in ${category}`}
            </p>
          )}

          {/* Grid or empty state */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState query={query} category={category} onReset={resetFilters} />
              </motion.div>
            ) : (
              <motion.div
                key={`grid-${query}-${category}-${sort}`}
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                viewport={viewportOnce}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visible.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="h-1 mt-8" aria-hidden="true" />

          {/* Loading indicator */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <span className="text-gray-500 text-sm">Loading more…</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <NewsletterStrip />
    </>
  );
}
