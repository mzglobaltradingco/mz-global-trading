import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import InspectionProcessContent from "./InspectionProcessContent";

export const metadata = buildMetadata({
  title: "Inspection Process | Quality Compliance | MZ Global Trading",
  description:
    "Step-by-step inspection process at MZ Global Trading — material receipt to container loading. AQL sampling, inline checks and pre-shipment inspection.",
  canonical: "/qualitycompliance/inspectionprocess/",
  ogImage: "/images/og/inspection-process-og.webp",
  ogImageAlt: "Textile inspection process — step-by-step shipment verification at MZ Global Trading",
  keywords: [
    "pre-shipment inspection process Pakistan",
    "textile inspection stages",
    "garment inspection checklist",
    "container loading inspection textiles",
    "third party inspection textile Pakistan",
    "AQL inspection apparel supplier",
  ],
});

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.mzglobaltrading.com/qualitycompliance/inspectionprocess/",
  url: "https://www.mzglobaltrading.com/qualitycompliance/inspectionprocess/",
  name: "Inspection Process | Quality & Compliance | MZ Global Trading",
  description:
    "Detailed 8-stage inspection process at MZ Global Trading — from initial material receipt through final container loading supervision before export.",
  inLanguage: "en",
  isPartOf: { "@id": "https://www.mzglobaltrading.com/#website" },
  about: { "@id": "https://www.mzglobaltrading.com/#organization" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://www.mzglobaltrading.com/images/og/inspection-process-og.webp",
    name: "Textile inspection process — step-by-step shipment verification at MZ Global Trading",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Inspection Process", item: "https://www.mzglobaltrading.com/qualitycompliance/inspectionprocess/" },
    ],
  },
};

export default function InspectionProcessPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <InspectionProcessContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
