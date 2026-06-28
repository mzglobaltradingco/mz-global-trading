import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import DownloadsContent from "./DownloadsContent";

export const metadata = buildMetadata({
  title: "Downloads | MZ Global Trading",
  description:
    "Free textile trade documents — company profile, AQL tables, inspection checklists, Tech Pack templates and incoterms references. For B2B buyers.",
  canonical: "/downloads/",
  ogImage: "/images/og/hero-our-process.webp",
  ogImageAlt: "MZ Global Trading resource downloads — textile buyer documentation and templates",
  keywords: [
    "textile supplier company profile download",
    "AQL inspection checklist download",
    "Tech Pack template garment",
    "textile sourcing documentation",
    "Pakistan manufacturer profile PDF",
  ],
});

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.mzglobaltrading.com/downloads/",
  url: "https://www.mzglobaltrading.com/downloads/",
  name: "Downloads | MZ Global Trading",
  description:
    "Downloadable resources for textile buyers — company profile, inspection checklists, Tech Pack templates and trade documentation.",
  inLanguage: "en",
  isPartOf: { "@id": "https://www.mzglobaltrading.com/#website" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://www.mzglobaltrading.com/images/og/hero-our-process.webp",
    name: "MZ Global Trading resource downloads — textile buyer documentation and sourcing templates",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Downloads", item: "https://www.mzglobaltrading.com/downloads/" },
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
