import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import IndustrialLinenContent from "./IndustrialLinenContent";

export const metadata: Metadata = {
  title: "Industrial Linen Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan industrial linen manufacturer — heavy-duty shop towels for automotive workshops and terry fender covers for auto dealerships. ISO 9001, BSCI certified. Export to USA, UK, EU.",
  keywords: [
    "industrial linen manufacturer Pakistan",
    "shop towels manufacturer Pakistan",
    "fender covers manufacturer Pakistan",
    "automotive shop rags Pakistan",
    "heavy duty industrial towels Pakistan",
    "bulk shop towels export",
    "automotive textile manufacturer Pakistan",
  ],
  alternates: {
    canonical: "/hometextile/industriallinen/",
    languages: {
      en: "https://mzglobaltrading.com/hometextile/industriallinen/",
      "x-default": "https://mzglobaltrading.com/hometextile/industriallinen/",
    },
  },
  openGraph: {
    title: "Industrial Linen Manufacturer Pakistan | MZ Global Trading",
    description:
      "Heavy-duty shop towels and automotive fender covers sourced from Pakistan. High-absorbency terry, huck weave and knitted terry stretch constructions. ISO 9001, BSCI. Export to USA, UK, EU, Australia.",
    url: "https://mzglobaltrading.com/hometextile/industriallinen/",
    images: [
      {
        url: "/images/og/industrial-linen-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan industrial linen manufacturer — shop towels and automotive fender covers for workshops worldwide",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Linen Manufacturer Pakistan | MZ Global Trading",
    description:
      "Shop towels and fender covers from Pakistan. Heavy cotton terry and knitted stretch constructions. ISO 9001, BSCI. Export to USA, UK, EU.",
  },
};

export default function IndustrialLinenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://mzglobaltrading.com/hometextile/industriallinen/",
            name: "Industrial Linen | MZ Global Trading",
            description:
              "Heavy-duty industrial textile products for automotive and commercial use — shop towels and automotive fender covers manufactured in Pakistan's certified mills.",
            image: "https://mzglobaltrading.com/images/og/industrial-linen-og.webp",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/industrial-linen-og.webp",
              name: "Pakistan industrial linen manufacturer — shop towels and fender covers worldwide",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
                { "@type": "ListItem", position: 3, name: "Industrial Linen", item: "https://mzglobaltrading.com/hometextile/industriallinen/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <IndustrialLinenContent />
      </main>
      <Footer />
    </>
  );
}
