import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import InspectionProcessContent from "./InspectionProcessContent";

export const metadata: Metadata = {
  title: "Inspection Process | Quality Compliance | MZ Global Trading",
  description:
    "Step-by-step inspection process at MZ Global Trading — material receipt to container loading. AQL sampling, inline checks and pre-shipment inspection.",
  keywords: [
    "pre-shipment inspection process Pakistan",
    "textile inspection stages",
    "garment inspection checklist",
    "container loading inspection textiles",
    "third party inspection textile Pakistan",
    "AQL inspection apparel supplier",
  ],
  alternates: {
    canonical: "/qualitycompliance/inspectionprocess/",
    languages: {
      en: "https://mzglobaltrading.com/qualitycompliance/inspectionprocess/",
      "x-default": "https://mzglobaltrading.com/",
    },
  },
  openGraph: {
    title: "Inspection Process | Quality & Compliance | MZ Global Trading",
    description:
      "From fabric inspection to container loading — our 8-stage inspection process ensures every shipment matches your approved specifications before it leaves Pakistan.",
    url: "https://mzglobaltrading.com/qualitycompliance/inspectionprocess/",
    images: [
      {
        url: "/images/og/hero-our-process.webp",
        width: 1200,
        height: 630,
        alt: "Textile inspection process — step-by-step shipment verification at MZ Global Trading",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspection Process | Quality & Compliance | MZ Global Trading",
    description:
      "8-stage inspection process — from fabric receipt to container loading — on every shipment from Pakistan.",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/qualitycompliance/inspectionprocess/",
  url: "https://mzglobaltrading.com/qualitycompliance/inspectionprocess/",
  name: "Inspection Process | Quality & Compliance | MZ Global Trading",
  description:
    "Detailed 8-stage inspection process at MZ Global Trading — from initial material receipt through final container loading supervision before export.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Quality & Compliance" },
      { "@type": "ListItem", position: 3, name: "Inspection Process", item: "https://mzglobaltrading.com/qualitycompliance/inspectionprocess/" },
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
