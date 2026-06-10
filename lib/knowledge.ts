/* CONTENT: drop a new .ts file in /content/knowledge/ to publish — no other changes needed */

import type { KnowledgePost, KnowledgeCategory } from "@/types/knowledge";

// ─── Auto-discover post modules via webpack require.context ───────────────────
// @ts-expect-error — webpack API; works in Next.js 14 (webpack 5, non-Turbopack mode)
const ctx = require.context("../content/knowledge", false, /\.ts$/);
export const posts: KnowledgePost[] = (ctx.keys() as string[])
  .map((key) => (ctx(key) as { default: KnowledgePost }).default)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getAllPosts(): KnowledgePost[] {
  return posts;
}

export function getPostBySlug(slug: string): KnowledgePost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): KnowledgePost | undefined {
  return posts.find((p) => p.featured);
}

export function getRelatedPosts(
  currentSlug: string,
  category: KnowledgeCategory,
  max = 3
): KnowledgePost[] {
  return posts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, max);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Markdown Renderer ────────────────────────────────────────────────────────
// Handles: h2, h3, bold, italic, inline code, blockquote, unordered lists, paragraphs

function inlineStyles(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

export function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inUl = false;

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (inUl) { out.push("</ul>"); inUl = false; }
      out.push(`<h3>${inlineStyles(line.slice(4))}</h3>`);
    } else if (line.startsWith("## ")) {
      if (inUl) { out.push("</ul>"); inUl = false; }
      out.push(`<h2>${inlineStyles(line.slice(3))}</h2>`);
    } else if (line.startsWith("> ")) {
      if (inUl) { out.push("</ul>"); inUl = false; }
      out.push(`<blockquote>${inlineStyles(line.slice(2))}</blockquote>`);
    } else if (line.startsWith("- ")) {
      if (!inUl) { out.push("<ul>"); inUl = true; }
      out.push(`<li>${inlineStyles(line.slice(2))}</li>`);
    } else if (line.trim() === "") {
      if (inUl) { out.push("</ul>"); inUl = false; }
    } else {
      if (inUl) { out.push("</ul>"); inUl = false; }
      out.push(`<p>${inlineStyles(line)}</p>`);
    }
  }

  if (inUl) out.push("</ul>");
  return out.join("\n");
}
