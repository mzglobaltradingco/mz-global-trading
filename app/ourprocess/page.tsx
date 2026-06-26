import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import OurProcessContent from "./OurProcessContent";

export const metadata = buildMetadata({
  title: "Our Process | MZ Global Trading",
  description:
    "See how MZ Global Trading sources textiles from Pakistan to 35+ countries — factory matching, production oversight, QC inspection and global export.",
  canonical: "/ourprocess/",
  ogImage: "/images/og/homepage-og-image.webp",
  ogImageAlt: "MZ Global Trading sourcing network — Pakistan to USA, UK and Europe",
  keywords: [
    "textile sourcing process Pakistan",
    "how textile sourcing works",
    "Pakistan factory sourcing",
    "B2B textile supply chain",
    "textile export Pakistan USA UK Europe",
  ],
});

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/ourprocess/",
  url: "https://mzglobaltrading.com/ourprocess/",
  name: "Our Process | MZ Global Trading",
  description:
    "The MZ Global Trading sourcing process — factory matching, production oversight, QC inspection and export to 35+ countries.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://mzglobaltrading.com/images/og/homepage-og-image.webp",
    name: "MZ Global Trading sourcing process — Pakistan textile supply to USA, UK and Europe",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Our Process", item: "https://mzglobaltrading.com/ourprocess/" },
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
