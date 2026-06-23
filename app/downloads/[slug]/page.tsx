import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ShareBar from "@/components/ShareBar";
import ContentDisclaimer from "@/components/ContentDisclaimer";
import PrintButton from "./PrintButton";
import { DOWNLOAD_DOCS, getDownloadDoc, type DocBlock } from "@/lib/downloads-content";

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DOWNLOAD_DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDownloadDoc(slug);
  if (!doc) return {};
  const url = `https://mzglobaltrading.com/downloads/${doc.slug}/`;
  return {
    title: doc.title,
    description: doc.description,
    keywords: doc.keywords,
    alternates: {
      canonical: `/downloads/${doc.slug}/`,
      languages: {
        en: `https://mzglobaltrading.com/downloads/${doc.slug}/`,
        "x-default": `https://mzglobaltrading.com/downloads/${doc.slug}/`,
      },
    },
    openGraph: {
      title: `${doc.title} | MZ Global Trading`,
      description: doc.description,
      url,
      images: [
        {
          url: "/images/og/hero-our-process.webp",
          width: 1200,
          height: 630,
          alt: `${doc.title} — free textile trade document by MZ Global Trading`,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${doc.title} | MZ Global Trading`,
      description: doc.description,
    },
  };
}

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mt-10 mb-4 pb-2 border-b-2 border-gold/40 leading-tight break-after-avoid">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="text-lg font-bold text-navy-900 mt-7 mb-3">{block.text}</h3>;
    case "p":
      return <p className="text-gray-600 text-[15px] leading-relaxed mb-4">{block.text}</p>;
    case "ul":
      return (
        <ul className="space-y-2.5 mb-5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-gray-600 text-[15px] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2.5 mb-5">
          {block.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3">
              <span className="shrink-0 w-5.5 h-5.5 min-w-[22px] min-h-[22px] rounded-full bg-navy-900 text-gold text-[11px] font-bold flex items-center justify-center mt-0.5 print:bg-transparent print:border print:border-navy-900 print:text-navy-900">
                {i + 1}
              </span>
              <span className="text-gray-600 text-[15px] leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto mb-5 rounded-lg border border-gray-200">
          <table className="w-full text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-navy-900/20">
                {block.headers.map((h, i) => (
                  <th key={`${h}-${i}`} className="text-left text-navy-900 font-bold px-3.5 py-2.5 text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-gray-100 last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-3.5 py-2.5 align-top ${ci === 0 ? "font-semibold text-navy-900" : "text-gray-600"} ${cell === "" ? "min-w-[64px]" : ""}`}>
                      {cell || " "}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "check":
      return (
        <div className="mb-5">
          {block.title && <p className="font-bold text-navy-900 text-sm mb-3">{block.title}</p>}
          <ul className="space-y-2.5">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-0.5 shrink-0 w-[18px] h-[18px] rounded border-2 border-navy-900/40"
                  aria-hidden="true"
                />
                <span className="text-gray-600 text-[15px] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "fields":
      return (
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-6">
          {block.items.map((fl) => (
            <div key={fl.label}>
              <p className="text-navy-900 text-sm font-semibold mb-1">{fl.label}</p>
              <div className="border-b border-gray-300 h-6" aria-hidden="true" />
              {fl.hint && <p className="text-gray-500 text-xs mt-1 italic">{fl.hint}</p>}
            </div>
          ))}
        </div>
      );
    case "note":
      return (
        <div className="bg-gold/5 border-l-4 border-gold rounded-r-lg px-5 py-4 mb-5 print:bg-transparent">
          <p className="text-navy-900 text-sm leading-relaxed">{block.text}</p>
        </div>
      );
  }
}

export default async function DownloadDocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getDownloadDoc(slug);
  if (!doc) notFound();
  const url = `https://mzglobaltrading.com/downloads/${doc.slug}/`;
  const siblings = DOWNLOAD_DOCS.filter((d) => d.slug !== doc.slug && d.category === doc.category).slice(0, 3);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: `${doc.title} | MZ Global Trading`,
    description: doc.description,
    inLanguage: "en",
    isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Downloads", item: "https://mzglobaltrading.com/downloads/" },
        { "@type": "ListItem", position: 3, name: doc.title, item: url },
      ],
    },
  };

  return (
    <>
      <div className="print:hidden">
        <MegaMenu />
      </div>

      {/* Print watermark — position:fixed repeats on every printed page */}
      <div
        className="hidden print:flex fixed inset-0 items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="-rotate-[30deg] opacity-[0.07] flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo/Master_Logo.webp" alt="" className="w-[380px] h-auto" />
          <p className="text-navy-900 font-black text-3xl tracking-[0.3em] uppercase whitespace-nowrap">
            MZ Global Trading
          </p>
        </div>
      </div>

      <main id="main-content" className="bg-gray-100 print:bg-white">
        {/* ── Toolbar (screen only) ───────────────────────────────────────────── */}
        <div className="print:hidden bg-navy-900 py-5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <li><Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link prefetch={false} href="/downloads/" className="hover:text-gold transition-colors">Downloads</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-gray-500" aria-current="page">{doc.title}</li>
              </ol>
            </nav>
            <PrintButton />
          </div>
        </div>

        {/* ── Document sheet ──────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-10 print:py-0 print:px-0 print:max-w-none">
          <article className="bg-white sm:rounded-2xl sm:shadow-xl print:shadow-none px-5 py-8 sm:px-12 sm:py-12 print:px-0 print:py-0">

            {/* Letterhead */}
            <header className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b-2 border-navy-900 mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo/Master_Logo.webp" alt="MZ Global Trading" className="w-[170px] h-auto" />
              <div className="text-right text-xs text-gray-500 leading-relaxed">
                <p className="font-bold text-navy-900">MZ Global Trading</p>
                <p>Columbus Tower, Main Clifton Road</p>
                <p>Karachi 75600, Pakistan</p>
                <p>info@mzglobaltrading.com · +92 300 8256203</p>
                <p className="text-gold font-semibold">mzglobaltrading.com</p>
              </div>
            </header>

            {/* Title block */}
            <div className="mb-8">
              <p className="text-gold text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
                {doc.kind} Document
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 leading-tight mb-2">{doc.title}</h1>
              <p className="text-gray-500 text-sm">{doc.subtitle}</p>
            </div>

            {/* Body */}
            <div className="relative">
              {doc.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

            <ContentDisclaimer
              className="mt-10 print:bg-transparent"
              text="This document is provided for general information only and does not constitute legal, customs or compliance advice. Figures reflect common trade practice and are indicative — always verify against your buyer specification, applicable regulations and your destination market."
            />

            {/* Document footer */}
            <footer className="mt-6 pt-5 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-500">
              <p>© {new Date().getFullYear()} MZ Global Trading — Karachi, Pakistan. Free to use with attribution.</p>
              <p className="font-semibold text-gray-500">mzglobaltrading.com/downloads/</p>
            </footer>
          </article>

          {/* Bottom actions (screen only) */}
          <div className="print:hidden flex flex-wrap items-center justify-between gap-4 px-5 sm:px-0 py-8">
            <Link
              href="/downloads/"
              className="inline-flex items-center gap-2 text-navy-900 text-sm font-bold hover:text-gold transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              All Documents
            </Link>
            <PrintButton />
          </div>

          {/* Share (screen only) */}
          <div className="print:hidden px-5 sm:px-0 pb-8">
            <ShareBar path={`/downloads/${doc.slug}/`} title={`${doc.title} — free textile trade document`} label="Share this document" />
          </div>

          {/* Related documents (screen only) */}
          {siblings.length > 0 && (
            <div className="print:hidden px-5 sm:px-0 pb-12">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Related Documents</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/downloads/${s.slug}/`}
                    className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-gold hover:shadow-md transition-all"
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">{s.kind}</span>
                    <span className="block text-navy-900 font-bold text-sm leading-snug group-hover:text-gold transition-colors">
                      {s.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
    </>
  );
}
