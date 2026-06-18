import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import DownloadsContent from "./DownloadsContent";

export const metadata: Metadata = {
  title: "Downloads | MZ Global Trading",
  description:
    "Free textile trade documents — company profile, AQL tables, inspection checklists, Tech Pack templates and incoterms references. For B2B buyers.",
  keywords: [
    "textile supplier company profile download",
    "AQL inspection checklist download",
    "Tech Pack template garment",
    "textile sourcing documentation",
    "Pakistan manufacturer profile PDF",
  ],
  alternates: {
    canonical: "/downloads/",
    languages: {
      "en": "https://mzglobaltrading.com/downloads/",
      "x-default": "https://mzglobaltrading.com/downloads/",
    },
  },
  openGraph: {
    title: "Resource Downloads | MZ Global Trading",
    description:
      "Company profile, inspection checklists, Tech Pack templates and trade documentation — practical resources for textile buyers.",
    url: "https://mzglobaltrading.com/downloads/",
    images: [
      {
        url: "/images/og/hero-our-process.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading resource downloads — textile buyer documentation and templates",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resource Downloads | MZ Global Trading",
    description:
      "Company profile, AQL checklists, Tech Pack templates and trade guides — read online, print or save as PDF.",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/downloads/",
  url: "https://mzglobaltrading.com/downloads/",
  name: "Downloads | MZ Global Trading",
  description:
    "Downloadable resources for textile buyers — company profile, inspection checklists, Tech Pack templates and trade documentation.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Corporate" },
      { "@type": "ListItem", position: 3, name: "Downloads", item: "https://mzglobaltrading.com/downloads/" },
    ],
  },
};

export default function DownloadsPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <DownloadsContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
