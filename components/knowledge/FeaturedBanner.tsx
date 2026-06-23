"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpVariants, viewportOnce } from "@/lib/animations";
import { formatDate } from "@/lib/knowledge";
import type { KnowledgePost } from "@/types/knowledge";

interface FeaturedBannerProps {
  post: KnowledgePost;
}

export default function FeaturedBanner({ post }: FeaturedBannerProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mb-10"
    >
      <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Featured Article</p>

      <Link prefetch={false} href={`/knowledge/${post.slug}/`} className="block group">
        <article className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800 border border-white/5 hover:border-gold/25 transition-colors">
          {/* Dot-grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
            aria-hidden="true"
          />
          {/* Gold glow */}
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gold/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative p-8 sm:p-10 lg:flex lg:items-center lg:gap-12">
            {/* Text block */}
            <div className="flex-1">
              <span className="inline-block px-2.5 py-0.5 bg-gold/15 border border-gold/25 text-gold text-[10px] font-bold tracking-[0.12em] uppercase rounded mb-4">
                {post.category}
              </span>
              <h2 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl leading-snug mb-3 group-hover:text-gold/90 transition-colors max-w-2xl">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xl mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-6 text-gray-500 text-xs mb-6">
                <span>{post.author}</span>
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime} min read</span>
              </div>
              <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold group-hover:gap-4 transition-all duration-200">
                Read Article →
              </span>
            </div>

            {/* Image panel — shows post thumbnail if available, icon fallback otherwise */}
            <div className="hidden lg:block w-56 h-44 shrink-0 rounded-xl overflow-hidden border border-white/10 relative">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="224px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5">
                  <svg className="w-16 h-16 text-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

