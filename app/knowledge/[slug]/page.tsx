import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/knowledge";
import ArticleContent from "./ArticleContent";

// ─── Static params — required for output: "export" ───────────────────────────

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// ─── Per-article metadata ─────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found | MZ Global Trading" };

  const imageUrl = post.image
    ? `https://mzglobaltrading.com${post.image}`
    : "https://mzglobaltrading.com/images/og/hero-about.webp";

  return {
    title: `${post.title} | MZ Global Trading`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/knowledge/${post.slug}/` },
    openGraph: {
      title: `${post.title} | MZ Global Trading`,
      description: post.excerpt,
      url: `https://mzglobaltrading.com/knowledge/${post.slug}/`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | MZ Global Trading`,
      description: post.excerpt,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <ArticleContent post={post} />
      </main>
      <Footer />
    </>
  );
}
