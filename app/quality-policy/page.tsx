import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import QualityPolicyContent from "./QualityPolicyContent";

export const metadata: Metadata = {
  title: "Quality Policy | MZ Global Trading",
  description:
    "MZ Global Trading's formal quality policy — our documented commitment to international standards, pre-shipment inspection and certified factory sourcing for buyers in USA, UK and Europe.",
  keywords: [
    "textile quality policy",
    "quality assurance Pakistan manufacturer",
    "certified textile sourcing",
    "pre-shipment inspection Pakistan",
    "quality management textile supplier",
    "ISO 9001 textile manufacturer Pakistan",
  ],
  alternates: {
    canonical: "/quality-policy/",
    languages: {
      en: "https://mzglobaltrading.com/quality-policy/",
      "x-default": "https://mzglobaltrading.com/",
    },
  },
  openGraph: {
    title: "Quality Policy | MZ Global Trading",
    description:
      "Our documented commitment to international quality standards — pre-shipment inspection, certified factories and measurable quality metrics for global textile buyers.",
    url: "https://mzglobaltrading.com/quality-policy/",
    images: [
      {
        url: "/images/og/hero-why-choose-us.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading quality policy — certified textile sourcing from Pakistan",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quality Policy | MZ Global Trading",
    description:
      "Pre-shipment inspection, 10+ certifications and documented QC practices — our quality commitments in writing.",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/quality-policy/",
  url: "https://mzglobaltrading.com/quality-policy/",
  name: "Quality Policy | MZ Global Trading",
  description:
    "MZ Global Trading's formal quality policy covering factory certification requirements, in-house QC inspection standards and pre-shipment verification procedures.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Quality & Compliance" },
      { "@type": "ListItem", position: 3, name: "Quality Policy", item: "https://mzglobaltrading.com/quality-policy/" },
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
