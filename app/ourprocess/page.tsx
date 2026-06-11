import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import OurProcessContent from "./OurProcessContent";

export const metadata: Metadata = {
  title: "Our Process | MZ Global Trading",
  description:
    "See how MZ Global Trading sources textiles from Pakistan to 25+ countries — factory matching, production oversight, QC inspection and global export.",
  keywords: [
    "textile sourcing process Pakistan",
    "how textile sourcing works",
    "Pakistan factory sourcing",
    "B2B textile supply chain",
    "textile export Pakistan USA UK Europe",
  ],
  alternates: {
    canonical: "/ourprocess/",
    languages: {
      "en": "https://mzglobaltrading.com/ourprocess/",
      "x-default": "https://mzglobaltrading.com/",
    },
  },
  openGraph: {
    title: "Our Process | MZ Global Trading",
    description:
      "Factory matching, production oversight, QC inspection and global export — the MZ Global Trading sourcing process.",
    url: "https://mzglobaltrading.com/ourprocess/",
    images: [
      {
        url: "/images/og/homepage-og-image.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading sourcing network — Pakistan to USA, UK and Europe",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Process | MZ Global Trading",
    description:
      "Factory matching, production oversight, QC and global export from Pakistan.",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/ourprocess/",
  url: "https://mzglobaltrading.com/ourprocess/",
  name: "Our Process | MZ Global Trading",
  description:
    "The MZ Global Trading sourcing process — factory matching, production oversight, QC inspection and export to 25+ countries.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Corporate" },
      { "@type": "ListItem", position: 3, name: "Our Process", item: "https://mzglobaltrading.com/ourprocess/" },
    ],
  },
};

export default function OurProcessPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <OurProcessContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
