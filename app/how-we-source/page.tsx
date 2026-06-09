import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import HowWeSourceContent from "./HowWeSourceContent";

export const metadata: Metadata = {
  title: "How We Source | MZ Global Trading",
  description:
    "See how MZ Global Trading sources textiles from Pakistan to 25+ countries — factory matching, production oversight, QC inspection and global export.",
  keywords: [
    "textile sourcing process Pakistan",
    "how textile sourcing works",
    "Pakistan factory sourcing",
    "B2B textile supply chain",
    "textile export Pakistan USA UK Europe",
  ],
  alternates: {
    canonical: "/how-we-source/",
    languages: {
      "en": "https://mzglobaltrading.com/how-we-source/",
      "x-default": "https://mzglobaltrading.com/",
    },
  },
  openGraph: {
    title: "How We Source | MZ Global Trading",
    description:
      "Factory matching, production oversight, QC inspection and global export — the MZ Global Trading sourcing process.",
    url: "https://mzglobaltrading.com/how-we-source/",
    images: [
      {
        url: "/images/og/homepage-og-image.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading sourcing network — Pakistan to USA, UK and Europe",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Source | MZ Global Trading",
    description:
      "Factory matching, production oversight, QC and global export from Pakistan.",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/how-we-source/",
  url: "https://mzglobaltrading.com/how-we-source/",
  name: "How We Source | MZ Global Trading",
  description:
    "The MZ Global Trading sourcing process — factory matching, production oversight, QC inspection and export to 25+ countries.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "How We Source", item: "https://mzglobaltrading.com/how-we-source/" },
    ],
  },
};

export default function HowWeSourcePage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <HowWeSourceContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
