"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpVariants, viewportOnce } from "@/lib/animations";
import { formatDate, renderMarkdown, getRelatedPosts } from "@/lib/knowledge";
import ReadingProgress from "@/components/knowledge/ReadingProgress";
import ShareBar from "@/components/ShareBar";
import ContentDisclaimer from "@/components/ContentDisclaimer";
import RelatedPosts from "@/components/knowledge/RelatedPosts";
import type { KnowledgePost } from "@/types/knowledge";

interface ArticleContentProps {
  post: KnowledgePost;
}

export default function ArticleContent({ post }: ArticleContentProps) {
  const related = getRelatedPosts(post.slug, post.category, 3);
  const html = renderMarkdown(post.content);

  return (
    <>
      <ReadingProgress />

      {/* ── Article hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-navy-900 pt-20 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
            <Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link>
            <span aria-hidden="true">›</span>
            <span className="text-gray-500">Resources</span>
            <span aria-hidden="true">›</span>
            <Link prefetch={false} href="/knowledge/" className="hover:text-gold transition-colors">Knowledge Hub</Link>
            <span aria-hidden="true">›</span>
            <span className="text-gold line-clamp-1">{post.category}</span>
          </nav>

          <div className="max-w-3xl">
            <motion.div variants={fadeUpVariants} initial="hidden" animate="visible">
              {/* Category tag */}
              <span className="inline-block px-2.5 py-0.5 bg-gold/15 border border-gold/25 text-gold text-[10px] font-bold tracking-[0.12em] uppercase rounded mb-5">
                {post.category}
              </span>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                {post.title}
              </h1>

              {/* Meta row */}
              <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-gray-500 text-sm mb-6">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime} min read
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Excerpt lead */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed border-l-4 border-gold pl-4 mb-10 italic">
              {post.excerpt}
            </p>

            {/* Article body — styled via Tailwind descendant variants */}
            <div
              className="
                prose-content
                [&_h2]:text-navy-900 [&_h2]:font-bold [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:leading-snug
                [&_h3]:text-navy-900 [&_h3]:font-bold [&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:leading-snug
                [&_p]:text-gray-600 [&_p]:text-base [&_p]:leading-relaxed [&_p]:mb-4
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-5 [&_ul]:space-y-1.5
                [&_li]:text-gray-600 [&_li]:text-base [&_li]:leading-relaxed
                [&_strong]:text-navy-900 [&_strong]:font-semibold
                [&_em]:italic [&_em]:text-gray-700
                [&_code]:bg-gray-100 [&_code]:text-navy-900 [&_code]:text-sm [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono
                [&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-6 [&_blockquote]:text-gray-500 [&_blockquote]:italic [&_blockquote]:bg-gray-50 [&_blockquote]:rounded-r
                [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-yellow-500 [&_a]:transition-colors [&_a]:font-medium
                [&_th]:bg-navy-900 [&_th]:text-white [&_th]:font-semibold [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-sm
                [&_td]:border-b [&_td]:border-gray-100 [&_td]:px-4 [&_td]:py-3 [&_td]:text-gray-600 [&_td]:align-top
                [&_tr:last-child_td]:border-b-0
              "
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </motion.div>

          <ContentDisclaimer className="mt-10" />

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <ShareBar path={`/knowledge/${post.slug}/`} title={post.title} />

            <Link
              href="/knowledge/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Knowledge Hub
            </Link>
          </div>

          {/* Related posts */}
          <RelatedPosts posts={related} />

          {/* CTA */}
          <div className="mt-16 p-8 bg-navy-900 rounded-2xl text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Ready to Source?</p>
            <h2 className="text-white font-bold text-xl sm:text-2xl mb-3">
              Put this knowledge to work.
            </h2>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              Speak with our team about your sourcing requirement. No commitment — just a direct conversation.
            </p>
            <Link
              href="/rfq/"
              className="inline-flex items-center justify-center px-7 py-3 bg-gold text-navy-900 text-sm font-bold rounded hover:bg-yellow-400 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
