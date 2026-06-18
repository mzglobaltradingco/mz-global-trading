import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import KnowledgeHubContent from "./KnowledgeHubContent";

export const metadata: Metadata = {
  title: "Knowledge Hub | MZ Global Trading",
  description:
    "Trade guides, sourcing insights and company updates from MZ Global Trading — practical knowledge for procurement managers and textile buyers in USA, UK.",
  keywords: [
    "textile sourcing guide",
    "Pakistan textile export",
    "fabric specification guide",
    "GSM fabric weight",
    "Incoterms textile",
    "pre-shipment inspection",
    "textile tech pack",
  ],
  alternates: {
    canonical: "/knowledge/",
    languages: {
      "en": "https://mzglobaltrading.com/knowledge/",
      "x-default": "https://mzglobaltrading.com/knowledge/",
    },
  },
  openGraph: {
    title: "Knowledge Hub | MZ Global Trading",
    description:
      "Trade guides, sourcing insights and company updates from MZ Global Trading — practical knowledge for procurement managers and textile buyers in USA, UK, Europe and Canada.",
    url: "https://mzglobaltrading.com/knowledge/",
    images: [
      {
        url: "/images/og/hero-about.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading Knowledge Hub — textile sourcing guides and trade insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Hub | MZ Global Trading",
    description:
      "Trade guides, sourcing insights and company updates from MZ Global Trading — practical knowledge for procurement managers and textile buyers.",
  },
};

const knowledgeSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://mzglobaltrading.com/knowledge/",
  url: "https://mzglobaltrading.com/knowledge/",
  name: "Knowledge Hub | MZ Global Trading",
  description:
    "Trade guides, sourcing insights and company updates from MZ Global Trading — practical knowledge for procurement managers and textile buyers in USA, UK, Europe and Canada.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Resources" },
      { "@type": "ListItem", position: 3, name: "Knowledge Hub", item: "https://mzglobaltrading.com/knowledge/" },
    ],
  },
};

export default function KnowledgePage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <KnowledgeHubContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(knowledgeSchema) }}
      />
    </>
  );
}
