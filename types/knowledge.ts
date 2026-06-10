export type KnowledgeCategory =
  | "Trade Insights"
  | "Company Updates"
  | "Resources";

export interface KnowledgePost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: KnowledgeCategory;
  tags: string[];
  readTime: number; // minutes
  date: string;     // ISO date string e.g. "2025-11-15"
  author: string;
  featured: boolean;
  content: string;  // markdown string
  image?: string;   // /knowledge/[slug].webp — falls back to gradient card if absent
}
