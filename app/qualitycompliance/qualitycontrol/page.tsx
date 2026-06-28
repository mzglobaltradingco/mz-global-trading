import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import QualityControlContent from "./QualityControlContent";

export const metadata = buildMetadata({
  title: "Quality Control | Quality & Compliance | MZ Global Trading",
  description:
    "MZ Global Trading's end-to-end quality control process — pre-production checks, in-line inspections and AQL pre-shipment inspections by an independent QC.",
  canonical: "/qualitycompliance/qualitycontrol/",
  ogImage: "/images/og/quality-control-og.webp",
  ogImageAlt: "Quality control inspection process — textile QC team at MZ Global Trading",
  keywords: [
    "textile quality control Pakistan",
    "pre-shipment inspection textiles",
    "AQL inspection textile manufacturer",
    "in-line quality control garments",
    "independent QC inspection Pakistan",
    "quality assurance apparel sourcing",
  ],
});

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.mzglobaltrading.com/qualitycompliance/qualitycontrol/",
  url: "https://www.mzglobaltrading.com/qualitycompliance/qualitycontrol/",
  name: "Quality Control | Quality & Compliance | MZ Global Trading",
  description:
    "Comprehensive quality control framework covering pre-production, in-line and pre-shipment AQL inspections conducted by MZ Global Trading's independent QC team.",
  inLanguage: "en",
  isPartOf: { "@id": "https://www.mzglobaltrading.com/#website" },
  about: { "@id": "https://www.mzglobaltrading.com/#organization" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://www.mzglobaltrading.com/images/og/quality-control-og.webp",
    name: "Quality control inspection process — AQL pre-shipment textile inspection at MZ Global Trading",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Quality Control", item: "https://www.mzglobaltrading.com/qualitycompliance/qualitycontrol/" },
    ],
  },
};

export default function QualityControlPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <QualityControlContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
