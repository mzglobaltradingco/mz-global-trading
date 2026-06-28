import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import QualityPolicyContent from "./QualityPolicyContent";

export const metadata = buildMetadata({
  title: "Quality Policy | MZ Global Trading",
  description:
    "MZ Global Trading's quality policy — AQL-based inspection, GOTS, OEKO-TEX and ISO 9001 certified production. Covering apparel, home textiles and fabric.",
  canonical: "/quality-policy/",
  ogImage: "/images/og/hero-why-choose-us.webp",
  ogImageAlt: "MZ Global Trading quality policy — certified textile sourcing from Pakistan",
  keywords: [
    "textile quality policy",
    "quality assurance Pakistan manufacturer",
    "certified textile sourcing",
    "pre-shipment inspection Pakistan",
    "quality management textile supplier",
    "ISO 9001 textile manufacturer Pakistan",
  ],
});

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.mzglobaltrading.com/quality-policy/",
  url: "https://www.mzglobaltrading.com/quality-policy/",
  name: "Quality Policy | MZ Global Trading",
  description:
    "MZ Global Trading's formal quality policy covering factory certification requirements, in-house QC inspection standards and pre-shipment verification procedures.",
  inLanguage: "en",
  isPartOf: { "@id": "https://www.mzglobaltrading.com/#website" },
  about: { "@id": "https://www.mzglobaltrading.com/#organization" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://www.mzglobaltrading.com/images/og/hero-why-choose-us.webp",
    name: "MZ Global Trading quality policy — AQL-based inspection and certified textile sourcing from Pakistan",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Quality Policy", item: "https://www.mzglobaltrading.com/quality-policy/" },
    ],
  },
};

export default function QualityPolicyPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <QualityPolicyContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
