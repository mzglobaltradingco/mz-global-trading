import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TextileToolsContent from "./TextileToolsContent";

export const metadata: Metadata = {
  title: "Textile Tools Calculator | MZ Global Trading",
  description:
    "55+ free textile calculators — order costing, GSM, yarn count, AQL inspection, CBM, landed cost and break-even tools for buyers, merchandisers and factory teams.",
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
  alternates: { canonical: "/textile-tools-calculator/" },
  openGraph: {
    title: "Textile Tools Calculator | MZ Global Trading",
    description:
      "55+ free calculators for costing, GSM, yarn, QA, packing and shipment planning — built for textile buyers and every factory desk.",
    url: "https://mzglobaltrading.com/textile-tools-calculator/",
    images: [
      {
        url: "/images/og/hero-why-choose-us.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading textile tools calculator — free online tools for buyers",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Textile Tools Calculator | MZ Global Trading",
    description:
      "Order costing, GSM, AQL, CBM, landed cost and 50+ more free textile calculators for buyers and factory teams.",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/textile-tools-calculator/",
  url: "https://mzglobaltrading.com/textile-tools-calculator/",
  name: "Textile Tools Calculator | MZ Global Trading",
  description:
    "55+ free textile calculators for buyers, merchandisers and factory teams — order costing, GSM, yarn count, AQL inspection, CBM, container loading and landed cost.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Corporate" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Textile Tools Calculator",
        item: "https://mzglobaltrading.com/textile-tools-calculator/",
      },
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
