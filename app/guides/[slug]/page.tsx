import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ShareBar from "@/components/ShareBar";
import ContentDisclaimer from "@/components/ContentDisclaimer";
import { GUIDES, getGuide, type ContentBlock } from "@/lib/guides-content";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = `https://mzglobaltrading.com/guides/${guide.slug}/`;
  return {
    title: guide.seoTitle,
    description: guide.seoDescription ?? guide.description,
    keywords: guide.keywords,
    alternates: {
      canonical: `/guides/${guide.slug}/`,
      languages: {
        en: `https://mzglobaltrading.com/guides/${guide.slug}/`,
        "x-default": `https://mzglobaltrading.com/guides/${guide.slug}/`,
      },
    },
    openGraph: {
      title: `${guide.seoTitle} | MZ Global Trading`,
      description: guide.seoDescription ?? guide.description,
      url,
      type: "article",
      images: [
        {
          url: "/images/og/hero-knowledge.webp",
          width: 1200,
          height: 630,
          alt: `${guide.title} — textile sourcing guide by MZ Global Trading`,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.seoTitle} | MZ Global Trading`,
      description: guide.seoDescription ?? guide.description,
    },
  };
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mt-12 mb-5 leading-tight">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="text-xl font-bold text-navy-900 mt-8 mb-3 leading-tight">{block.text}</h3>;
    case "p":
      return <p className="text-gray-600 text-base leading-relaxed mb-5 [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-yellow-500 [&_a]:transition-colors [&_a]:font-medium" dangerouslySetInnerHTML={{ __html: block.text }} />;
    case "ul":
      return (
        <ul className="space-y-3 mb-6">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-gray-600 text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-3 mb-6 list-none counter-reset-none">
          {block.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3.5">
              <span className="shrink-0 w-6 h-6 rounded-full bg-navy-900 text-gold text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-gray-600 text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
          <table className="w-full text-sm border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-navy-900">
                {block.headers.map((h) => (
                  <th key={h} className="text-left text-white font-semibold px-4 py-3 text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-3 align-top ${ci === 0 ? "font-semibold text-navy-900" : "text-gray-600"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <div className="bg-gold/5 border-l-4 border-gold rounded-r-xl px-6 py-5 mb-6">
          <p className="text-navy-900 text-base leading-relaxed">{block.text}</p>
        </div>
      );
    case "seealso":
      return (
        <div className="border border-gray-200 rounded-2xl p-6 mb-8 bg-gray-50">
          <p className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {block.title ?? "Related Products & Pages"}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {block.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-3 bg-white rounded-xl border border-gray-100 hover:border-gold hover:shadow-sm transition-all p-4"
              >
                <span className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                <span>
                  <span className="block text-navy-900 font-semibold text-sm group-hover:text-gold transition-colors leading-snug">
                    {link.text}
                  </span>
                  {link.description && (
                    <span className="block text-gray-500 text-xs mt-0.5 leading-snug">{link.description}</span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        </div>
      );
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const url = `https://mzglobaltrading.com/guides/${guide.slug}/`;
  const related = guide.related.map((s) => getGuide(s)).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    headline: guide.title,
    description: guide.description,
    url,
    inLanguage: "en",
    datePublished: guide.datePublished,
    dateModified: guide.datePublished,
    author: { "@id": "https://mzglobaltrading.com/#organization" },
    publisher: { "@id": "https://mzglobaltrading.com/#organization" },
    mainEntityOfPage: { "@id": url },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/og/hero-knowledge.webp",
      name: `${guide.title} — textile sourcing guide by MZ Global Trading`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://mzglobaltrading.com/guides/" },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        {/* ── Article header ──────────────────────────────────────────────────── */}
        <section className="bg-navy-900 pt-12 pb-14 sm:pt-16 sm:pb-18">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <li><Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link prefetch={false} href="/guides/" className="hover:text-gold transition-colors">Guides</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-gray-500" aria-current="page">Guide {guide.num}</li>
              </ol>
            </nav>
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-gold/15 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full">
                {guide.category}
              </span>
              <span className="text-gray-500 text-xs">{guide.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-5">
              {guide.title}
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">{guide.description}</p>
          </div>
        </section>

        {/* ── Article body ────────────────────────────────────────────────────── */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {guide.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            <ContentDisclaimer className="mt-10" />

            {/* Share + back link */}
            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <ShareBar path={`/guides/${guide.slug}/`} title={guide.title} label="Share this guide" />
              <Link
                href="/guides/"
                className="inline-flex items-center gap-2 text-navy-900 text-sm font-bold hover:text-gold transition-colors shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                All Sourcing Guides
              </Link>
            </div>
          </div>
        </article>

        {/* ── Related guides ──────────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-14 sm:py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Keep Reading</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-8">Related Guides</h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r!.slug}
                    href={`/guides/${r!.slug}/`}
                    className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-gold hover:shadow-lg transition-all flex flex-col"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                      {r!.category} · {r!.readTime}
                    </span>
                    <span className="text-navy-900 font-bold text-sm leading-snug group-hover:text-gold transition-colors flex-1">
                      {r!.title}
                    </span>
                    <span className="mt-4 text-gold text-xs font-bold">Read guide →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ─────────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-navy-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Apply the Knowledge</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Source from Pakistan?</h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto mb-8">
              Submit a structured RFQ and receive a formal quotation within 3–5 business days — with factory
              selection, certifications and inspection built in.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Request a Quote →
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </>
  );
}
