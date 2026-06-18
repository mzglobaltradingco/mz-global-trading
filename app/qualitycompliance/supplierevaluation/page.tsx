import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import SupplierEvaluationContent from "./SupplierEvaluationContent";

export const metadata: Metadata = {
  title: "Supplier Evaluation | Quality Compliance | MZ Global Trading",
  description:
    "How MZ Global Trading vets every factory before onboarding — a rigorous 4-stage evaluation covering capacity, certifications and compliance standards.",
  keywords: [
    "supplier evaluation textile Pakistan",
    "factory vetting process sourcing",
    "ethical factory audit Pakistan",
    "BSCI factory audit",
    "supplier qualification textile manufacturer",
    "factory onboarding process B2B",
  ],
  alternates: {
    canonical: "/qualitycompliance/supplierevaluation/",
    languages: {
      en: "https://mzglobaltrading.com/qualitycompliance/supplierevaluation/",
      "x-default": "https://mzglobaltrading.com/",
    },
  },
  openGraph: {
    title: "Supplier Evaluation | Quality & Compliance | MZ Global Trading",
    description:
      "Only 1 in 3 factories we review makes it into our network. See our 4-stage supplier evaluation process — capacity audit, compliance review, on-site visit and pilot order.",
    url: "https://mzglobaltrading.com/qualitycompliance/supplierevaluation/",
    images: [
      {
        url: "/images/og/hero-our-process.webp",
        width: 1200,
        height: 630,
        alt: "Supplier evaluation process — factory vetting and compliance audit at MZ Global Trading",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supplier Evaluation | Quality & Compliance | MZ Global Trading",
    description:
      "A 4-stage supplier evaluation — capability, compliance, on-site audit and pilot order — before any factory joins our network.",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/qualitycompliance/supplierevaluation/",
  url: "https://mzglobaltrading.com/qualitycompliance/supplierevaluation/",
  name: "Supplier Evaluation | Quality & Compliance | MZ Global Trading",
  description:
    "Detailed overview of MZ Global Trading's 4-stage factory vetting and supplier evaluation process before onboarding into the sourcing network.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Quality & Compliance" },
      { "@type": "ListItem", position: 3, name: "Supplier Evaluation", item: "https://mzglobaltrading.com/qualitycompliance/supplierevaluation/" },
    ],
  },
};

export default function SupplierEvaluationPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <SupplierEvaluationContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
