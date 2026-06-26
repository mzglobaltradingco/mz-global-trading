import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import GuidesContent from "./GuidesContent";

export const metadata = buildMetadata({
  title: "Sourcing Guides | MZ Global Trading",
  description:
    "In-depth sourcing guides for textile buyers — AQL, incoterms, Tech Pack writing and GSM selection. Covers apparel, home textiles and fabric sourcing.",
  canonical: "/guides/",
  ogImage: "/images/og/hero-knowledge.webp",
  ogImageAlt: "MZ Global Trading sourcing guides — in-depth textile buyer resources",
  keywords: [
    "textile sourcing guide",
    "AQL inspection guide buyer",
    "how to source from Pakistan",
    "textile certification guide GOTS OEKO-TEX",
    "incoterms textile importer",
    "Tech Pack template guide",
  ],
});

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/guides/",
  url: "https://mzglobaltrading.com/guides/",
  name: "Textile Sourcing Guides | MZ Global Trading",
  description:
    "Comprehensive sourcing guides for international textile buyers — covering quality inspection, certifications, incoterms and supply chain management.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://mzglobaltrading.com/images/og/hero-knowledge.webp",
    name: "MZ Global Trading sourcing guides — in-depth textile buyer resources and trade guides",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://mzglobaltrading.com/guides/" },
    ],
  },
};

export default function GuidesPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <GuidesContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
