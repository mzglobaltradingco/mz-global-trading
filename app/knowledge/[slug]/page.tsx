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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found | MZ Global Trading" };

  const imageUrl = post.image
    ? `https://mzglobaltrading.com${post.image}`
    : "https://mzglobaltrading.com/images/og/hero-about.webp";

  return {
    title: `${post.title} | MZ Global Trading`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `/knowledge/${post.slug}/`,
      languages: {
        en: `https://mzglobaltrading.com/knowledge/${post.slug}/`,
        "x-default": `https://mzglobaltrading.com/knowledge/${post.slug}/`,
      },
    },
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const imageUrl = post.image
    ? `https://mzglobaltrading.com${post.image}`
    : "https://mzglobaltrading.com/images/og/hero-about.webp";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://mzglobaltrading.com/knowledge/${post.slug}/`,
    url: `https://mzglobaltrading.com/knowledge/${post.slug}/`,
    headline: post.title,
    description: post.excerpt,
    inLanguage: "en",
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
    author: { "@id": "https://mzglobaltrading.com/#organization" },
    publisher: { "@id": "https://mzglobaltrading.com/#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Resources" },
        { "@type": "ListItem", position: 3, name: "Knowledge Hub", item: "https://mzglobaltrading.com/knowledge/" },
        { "@type": "ListItem", position: 4, name: post.title, item: `https://mzglobaltrading.com/knowledge/${post.slug}/` },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <ArticleContent post={post} />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
