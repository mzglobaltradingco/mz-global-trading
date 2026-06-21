"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUpVariants, viewportOnce } from "@/lib/animations";

const FEED_URL = "https://mzglobaltrading.com/rss.xml";

export default function NewsletterStrip() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(FEED_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <section className="py-16 sm:py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl mx-auto text-center"
        >
          {/* RSS icon */}
          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-5">
            <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
            </svg>
          </div>

          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Stay Updated</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Subscribe via RSS
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Get new articles the moment they publish — no email required. Paste the feed URL into any RSS reader: Feedly, Apple News, Outlook, or your browser.
          </p>

          {/* Feed URL + copy */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md mx-auto mb-6">
            <div className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-sm font-mono text-left truncate select-all">
              {FEED_URL}
            </div>
            <button
              onClick={handleCopy}
              aria-label={copied ? "Feed URL copied" : "Copy feed URL"}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gold text-navy-900 text-sm font-bold rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap flex-shrink-0"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy URL
                </>
              )}
            </button>
          </div>

          {/* Direct link */}
          <a
            href={FEED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 text-xs hover:text-gray-300 transition-colors underline underline-offset-2"
          >
            Open raw feed
          </a>
        </motion.div>
      </div>
    </section>
  );
}
