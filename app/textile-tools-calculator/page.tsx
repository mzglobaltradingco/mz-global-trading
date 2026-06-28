import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TextileToolsContent from "./TextileToolsContent";

export const metadata = buildMetadata({
  title: "Textile Tools Calculator | MZ Global Trading",
  description:
    "55+ free textile calculators — order costing, GSM, yarn count, AQL inspection, CBM, landed cost and break-even tools for international B2B buyers.",
  canonical: "/textile-tools-calculator/",
  ogImage: "/images/og/textile-tools-calculator-og.webp",
  ogImageAlt: "MZ Global Trading textile tools calculator — free online tools for buyers",
  keywords: [
    "textile calculator online free",
    "GSM calculator textile",
    "fabric consumption calculator",
    "yarn count converter Ne Nm tex denier",
    "AQL defect calculator textile",
    "CBM calculator shipping cartons",
    "landed cost calculator importer",
    "garment costing calculator FOB",
    "SMV calculator garment",
    "fabric booking calculator merchandiser",
  ],
});

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.mzglobaltrading.com/textile-tools-calculator/",
  url: "https://www.mzglobaltrading.com/textile-tools-calculator/",
  name: "Textile Tools Calculator | MZ Global Trading",
  description:
    "55+ free textile calculators for buyers, merchandisers and factory teams — order costing, GSM, yarn count, AQL inspection, CBM, container loading and landed cost.",
  inLanguage: "en",
  isPartOf: { "@id": "https://www.mzglobaltrading.com/#website" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://www.mzglobaltrading.com/images/og/textile-tools-calculator-og.webp",
    name: "MZ Global Trading textile tools calculator — free online tools for B2B textile buyers",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Textile Tools Calculator", item: "https://www.mzglobaltrading.com/textile-tools-calculator/" },
    ],
  },
};

export default function TextileToolsPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <TextileToolsContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
