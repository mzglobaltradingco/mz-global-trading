import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import CareersContent from "./CareersContent";

export const metadata = buildMetadata({
  title: "Careers at MZ Global Trading | Textile Sourcing Jobs",
  description:
    "Build a career in B2B textile sourcing at MZ Global Trading. Roles in sourcing, QC, operations and business development — based in Karachi, Pakistan.",
  canonical: "/careers/",
  ogImage: "/images/og/hero-careers.webp",
  ogImageAlt: "Careers at MZ Global Trading — textile sourcing jobs in Karachi, Pakistan",
  keywords: [
    "careers MZ Global Trading",
    "textile sourcing jobs Karachi",
    "jobs in textile industry Pakistan",
    "procurement career Pakistan",
    "textile trade jobs",
    "B2B sourcing careers",
    "international trade jobs Karachi",
  ],
});

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/careers/",
  url: "https://mzglobaltrading.com/careers/",
  name: "Careers at MZ Global Trading | Textile Sourcing Jobs",
  description:
    "Explore career opportunities at MZ Global Trading — Pakistan's B2B textile sourcing company connecting international buyers with certified manufacturers.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://mzglobaltrading.com/images/og/hero-careers.webp",
    name: "Careers at MZ Global Trading — textile sourcing jobs in Karachi, Pakistan",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Careers", item: "https://mzglobaltrading.com/careers/" },
    ],
  },
};

export default function CareersPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <CareersContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
