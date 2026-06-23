"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
import { formatDate } from "@/lib/knowledge";
import type { KnowledgePost, KnowledgeCategory } from "@/types/knowledge";

// ─── Category metadata ────────────────────────────────────────────────────────

const categoryMeta: Record<KnowledgeCategory, { pill: string; icon: React.ReactNode }> = {
  "Trade Insights": {
    pill: "bg-gold/10 text-gold border-gold/20",
    icon: (
      <svg className="w-7 h-7 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  "Company Updates": {
    pill: "bg-navy-900/5 text-navy-900 border-navy-900/10",
    icon: (
      <svg className="w-7 h-7 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  "Resources": {
    pill: "bg-gray-100 text-gray-600 border-gray-200",
    icon: (
      <svg className="w-7 h-7 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

interface PostCardProps {
  post: KnowledgePost;
}

export default function PostCard({ post }: PostCardProps) {
  const meta = categoryMeta[post.category];
  const [imgError, setImgError] = useState(false);
  const showImage = !!post.image && !imgError;

  return (
    <motion.article
      variants={staggerItemVariants}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gold/30 hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Thumbnail — full link so right-click → open in new tab goes to article */}
      <Link href={`/knowledge/${post.slug}/`} className="block relative h-44 overflow-hidden" tabIndex={-1} aria-hidden="true">
        {showImage ? (
          <Image
            src={post.image!}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}
              aria-hidden="true"
            />
            {meta.icon}
          </div>
        )}
        {post.featured && (
          <span className="absolute top-3 right-3 px-2 py-0.5 bg-gold text-navy-900 text-[10px] font-bold tracking-[0.12em] uppercase rounded z-10">
            Featured
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <span className={`inline-block self-start px-2.5 py-0.5 text-[10px] font-bold tracking-[0.12em] uppercase rounded border mb-3 ${meta.pill}`}>
          {post.category}
        </span>

        <Link href={`/knowledge/${post.slug}/`} className="block mb-2">
          <h3 className="text-navy-900 font-bold text-base leading-snug line-clamp-2 group-hover:text-gold transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="text-gray-500 text-xs">{formatDate(post.date)}</span>
          <span className="text-gray-500 text-xs">{post.readTime} min read</span>
        </div>
      </div>
    </motion.article>
  );
}
