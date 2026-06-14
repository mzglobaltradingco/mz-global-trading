import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TShirtsContent from "./TShirtsContent";

export const metadata: Metadata = {
  title: "T-Shirt Manufacturer Pakistan — OEM & Wholesale Supply",
  description:
    "Pakistan OEM t-shirt manufacturer supplying brands, retailers and promotional buyers in the USA, UK and Europe. Custom construction, certified cotton, AQL-inspected bulk orders.",
  keywords: [
    "t-shirt manufacturer Pakistan",
    "custom t-shirt wholesale manufacturer",
    "OEM t-shirt manufacturer",
    "cotton t-shirt bulk supplier",
    "GOTS certified t-shirt manufacturer",
    "t-shirt exporter Pakistan USA UK",
    "branded t-shirt programme Pakistan",
    "knitted garment manufacturer Pakistan",
  ],
  alternates: { canonical: "/apparel/knittedgarments/tshirts/" },
  openGraph: {
    title: "T-Shirt Manufacturer Pakistan — OEM & Wholesale Supply | MZ Global Trading",
    description:
      "OEM t-shirt manufacturer in Pakistan for brands and retailers in the USA, UK and Europe. Custom construction, certified cotton, AQL-inspected bulk orders.",
    url: "https://mzglobaltrading.com/apparel/knittedgarments/tshirts/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan t-shirt manufacturer — custom OEM cotton t-shirts wholesale for brands in USA and UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "T-Shirt Manufacturer Pakistan — OEM & Wholesale Supply | MZ Global Trading",
    description:
      "OEM t-shirt manufacturer in Pakistan for brands and retailers in the USA, UK and Europe. Certified cotton, AQL-inspected bulk.",
  },
};

export default function TShirtsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Custom T-Shirts — OEM Manufacturing",
    description:
      "Pakistan OEM t-shirt manufacturer producing single jersey, pique, interlock and waffle knit t-shirts in certified cotton for brands and retailers in the USA, UK and Europe.",
    image: "https://mzglobaltrading.com/images/thumbnails/thumb-tshirts.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Knitted Garments", item: "https://mzglobaltrading.com/apparel/knittedgarments/" },
        { "@type": "ListItem", position: 4, name: "T-Shirts", item: "https://mzglobaltrading.com/apparel/knittedgarments/tshirts/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TShirtsContent />
      </main>
      <Footer />
    </>
  );
}
