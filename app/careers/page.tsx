import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import CareersContent from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers at MZ Global Trading | Textile Sourcing Jobs",
  description:
    "Build a career in B2B textile sourcing at MZ Global Trading. Roles in sourcing, QC, operations and business development — based in Karachi, Pakistan.",
  keywords: [
    "careers MZ Global Trading",
    "textile sourcing jobs Karachi",
    "jobs in textile industry Pakistan",
    "procurement career Pakistan",
    "textile trade jobs",
    "B2B sourcing careers",
    "international trade jobs Karachi",
  ],
  alternates: {
    canonical: "/careers/",
    languages: {
      en: "https://mzglobaltrading.com/careers/",
      "x-default": "https://mzglobaltrading.com/",
    },
  },
  openGraph: {
    title: "Careers at MZ Global Trading | Textile Sourcing Jobs",
    description:
      "Join the team behind Pakistan's B2B textile sourcing. Explore roles in sourcing, QC, business development and operations at MZ Global Trading.",
    url: "https://mzglobaltrading.com/careers/",
    images: [
      {
        url: "/images/og/hero-careers.webp",
        width: 1200,
        height: 630,
        alt: "Careers at MZ Global Trading — textile sourcing jobs in Karachi, Pakistan",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at MZ Global Trading | Textile Sourcing Jobs",
    description:
      "Join the team behind Pakistan's B2B textile sourcing. Roles in sourcing, QC, business development and operations.",
  },
};

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
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Corporate" },
      { "@type": "ListItem", position: 3, name: "Careers", item: "https://mzglobaltrading.com/careers/" },
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
