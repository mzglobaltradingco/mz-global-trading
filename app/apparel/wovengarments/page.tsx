import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import WovenGarmentsContent from "./WovenGarmentsContent";

export const metadata: Metadata = {
  title: "Woven Garments Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan woven garment manufacturer — denim jeans, formal shirts, trousers, cargo pants and shorts. Denim, twill, poplin, canvas constructions. GOTS, OEKO-TEX. FOB/CIF export.",
  keywords: [
    "woven garments manufacturer Pakistan",
    "denim jeans manufacturer Pakistan",
    "formal shirts manufacturer Pakistan",
    "trousers manufacturer Pakistan export",
    "cargo pants manufacturer Pakistan",
    "woven apparel manufacturer Pakistan",
    "OEM woven garments Pakistan",
    "BSCI certified woven garments",
  ],
  alternates: {
    canonical: "/apparel/wovengarments/",
    languages: {
      en: "https://mzglobaltrading.com/apparel/wovengarments/",
      "x-default": "https://mzglobaltrading.com/apparel/wovengarments/",
    },
  },
  openGraph: {
    title: "Woven Garments Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan woven garment manufacturer — denim jeans, formal & casual shirts, pants & trousers, cargo pants and shorts. Denim, twill, poplin, canvas, Oxford weave. GOTS, OEKO-TEX, BSCI certified. FOB/CIF export to USA, UK, EU, Middle East.",
    url: "https://mzglobaltrading.com/apparel/wovengarments/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan woven garments manufacturer — denim jeans, shirts and trousers OEM supplier for international brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Woven Garments Manufacturer Pakistan | MZ Global Trading",
    description:
      "Denim jeans, formal shirts, trousers, cargo pants and shorts from Pakistan's certified woven garment factories. GOTS, OEKO-TEX, BSCI. FOB/CIF worldwide.",
  },
};

export default function WovenGarmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://mzglobaltrading.com/apparel/wovengarments/",
            name: "Woven Garments Manufacturer Pakistan | MZ Global Trading",
            description:
              "Pakistan woven garment manufacturer supplying denim jeans, formal & casual shirts, pants & trousers, cargo pants and shorts to international brands. GOTS, OEKO-TEX, BSCI certified. FOB/CIF export.",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/hero-apparel.webp",
              name: "Pakistan woven garments manufacturer — denim jeans, shirts and trousers OEM supplier for international brands",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
                { "@type": "ListItem", position: 3, name: "Woven Garments", item: "https://mzglobaltrading.com/apparel/wovengarments/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <WovenGarmentsContent />
      </main>
      <Footer />
    </>
  );
}
