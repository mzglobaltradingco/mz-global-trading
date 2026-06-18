import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import GuidesContent from "./GuidesContent";

export const metadata: Metadata = {
  title: "Sourcing Guides | MZ Global Trading",
  description:
    "In-depth sourcing guides for textile buyers — AQL, incoterms, Tech Pack writing and GSM selection. Covers apparel, home textiles and fabric sourcing.",
  keywords: [
    "textile sourcing guide",
    "AQL inspection guide buyer",
    "how to source from Pakistan",
    "textile certification guide GOTS OEKO-TEX",
    "incoterms textile importer",
    "Tech Pack template guide",
  ],
  alternates: {
    canonical: "/guides/",
    languages: {
      "en": "https://mzglobaltrading.com/guides/",
      "x-default": "https://mzglobaltrading.com/guides/",
    },
  },
  openGraph: {
    title: "Textile Sourcing Guides | MZ Global Trading",
    description:
      "Eight comprehensive guides covering AQL, incoterms, certifications, Tech Packs and sourcing strategy for textile buyers in the USA, UK and Europe.",
    url: "https://mzglobaltrading.com/guides/",
    images: [
      {
        url: "/images/og/hero-knowledge.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading sourcing guides — in-depth textile buyer resources",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Textile Sourcing Guides | MZ Global Trading",
    description:
      "AQL inspection, incoterms, certifications, Tech Packs and sourcing strategy — eight guides for textile importers.",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/guides/",
  url: "https://mzglobaltrading.com/guides/",
  name: "Textile Sourcing Guides | MZ Global Trading",
  description:
    "Comprehensive sourcing guides for international textile buyers — covering quality inspection, certifications, incoterms and supply chain management.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Corporate" },
      { "@type": "ListItem", position: 3, name: "Guides", item: "https://mzglobaltrading.com/guides/" },
    ],
  },
};

export default function GuidesPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <GuidesContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
