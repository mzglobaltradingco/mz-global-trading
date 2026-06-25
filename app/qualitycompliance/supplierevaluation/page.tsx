import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import SupplierEvaluationContent from "./SupplierEvaluationContent";

export const metadata = buildMetadata({
  title: "Supplier Evaluation | Quality Compliance | MZ Global Trading",
  description:
    "How MZ Global Trading vets every factory before onboarding — a rigorous 4-stage evaluation covering capacity, certifications and compliance standards.",
  canonical: "/qualitycompliance/supplierevaluation/",
  ogImage: "/images/og/supplier-evaluation-og.webp",
  ogImageAlt: "Supplier evaluation process — factory vetting and compliance audit at MZ Global Trading",
  keywords: [
    "supplier evaluation textile Pakistan",
    "factory vetting process sourcing",
    "ethical factory audit Pakistan",
    "BSCI factory audit",
    "supplier qualification textile manufacturer",
    "factory onboarding process B2B",
  ],
});

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
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://mzglobaltrading.com/images/og/supplier-evaluation-og.webp",
    name: "Supplier evaluation process — factory vetting and compliance audit at MZ Global Trading",
  },
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
