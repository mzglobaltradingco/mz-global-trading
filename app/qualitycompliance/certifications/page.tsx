import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import CertificationsContent from "./CertificationsContent";

export const metadata = buildMetadata({
  title: "Certifications | Quality & Compliance | MZ Global Trading",
  description:
    "MZ Global Trading's factory network holds GOTS, OEKO-TEX, BSCI, ISO 9001, Sedex, GRS, WRAP, BCI, SA8000 and Bluesign certifications for global buyers.",
  canonical: "/qualitycompliance/certifications/",
  ogImage: "/images/og/certifications-og.webp",
  ogImageAlt: "Certified textile factory certifications — GOTS, OEKO-TEX, BSCI and more",
  keywords: [
    "GOTS certified textile manufacturer Pakistan",
    "OEKO-TEX certified fabric supplier",
    "BSCI certified factory Pakistan",
    "ISO 9001 textile manufacturer",
    "Sedex certified supplier Pakistan",
    "SA8000 garment manufacturer",
    "certified textile sourcing Pakistan",
  ],
});

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/qualitycompliance/certifications/",
  url: "https://mzglobaltrading.com/qualitycompliance/certifications/",
  name: "Certifications | Quality & Compliance | MZ Global Trading",
  description:
    "Overview of all international quality and social compliance certifications held across MZ Global Trading's Pakistan factory network.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Quality & Compliance" },
      { "@type": "ListItem", position: 3, name: "Certifications", item: "https://mzglobaltrading.com/qualitycompliance/certifications/" },
    ],
  },
};

export default function CertificationsPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <CertificationsContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
