import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PoloContent from "./PoloContent";

export const metadata: Metadata = {
  title: "Polo Shirt Manufacturer Pakistan | OEM & Corporate",
  description:
    "Source OEM polo shirts from Pakistan — piqué, performance and classic polo constructions. OEKO-TEX certified. Corporate, sports and hospitality programmes for USA, UK and Europe.",
  keywords: [
    "polo shirt manufacturer Pakistan",
    "OEM polo shirt manufacturer",
    "pique polo shirt manufacturer Pakistan",
    "corporate polo shirt supplier",
    "polo shirt bulk wholesale Pakistan",
    "polo shirt exporter USA UK Europe",
    "embroidered polo shirt manufacturer Pakistan",
    "knitted garment manufacturer Pakistan",
  ],
  alternates: { canonical: "/apparel/knittedgarments/poloshirts/" },
  openGraph: {
    title: "Polo Shirt Manufacturer Pakistan | OEM & Corporate | MZ Global Trading",
    description:
      "OEM polo shirt manufacturer in Pakistan. Piqué, performance and sport polo constructions. OEKO-TEX certified. Corporate, hospitality and sports brands in USA, UK and Europe.",
    url: "https://mzglobaltrading.com/apparel/knittedgarments/poloshirts/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan polo shirt manufacturer — OEM piqué polo shirts for corporate and sports brands in USA and UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polo Shirt Manufacturer Pakistan | OEM & Corporate | MZ Global Trading",
    description:
      "OEM polo shirt manufacturer in Pakistan. Piqué and performance, OEKO-TEX certified, for corporate buyers in USA, UK and Europe.",
  },
};

export default function PoloShirtsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Polo Shirts — OEM Manufacturing Pakistan",
    description:
      "Pakistan OEM polo shirt manufacturer producing classic piqué, mini piqué, jersey and performance polo shirts for corporate buyers, hospitality groups and sports brands in USA, UK and Europe.",
    image: "https://mzglobaltrading.com/images/og/hero-apparel.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/og/hero-apparel.webp",
      name: "Pakistan polo shirt manufacturer — OEM piqué polo shirts for corporate and sports brands",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Knitted Garments", item: "https://mzglobaltrading.com/apparel/knittedgarments/" },
        { "@type": "ListItem", position: 4, name: "Polo Shirts", item: "https://mzglobaltrading.com/apparel/knittedgarments/poloshirts/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <PoloContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
