import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TShirtsContent from "./TShirtsContent";

export const metadata: Metadata = {
  title: "T-Shirt Manufacturer Pakistan | OEM & Wholesale",
  description:
    "Source custom t-shirts from Pakistan — 7 fabric constructions, GOTS & OEKO-TEX certified cotton, full PMS colour matching. OEM programmes for brands in USA, UK, Europe and worldwide.",
  keywords: [
    "t-shirt manufacturer Pakistan",
    "custom t-shirt OEM manufacturer",
    "cotton t-shirt wholesale supplier",
    "GOTS certified t-shirt manufacturer",
    "t-shirt exporter Pakistan USA UK Europe",
    "single jersey t-shirt manufacturer",
    "knitted garment manufacturer Pakistan",
    "bulk t-shirt sourcing Pakistan",
  ],
  alternates: { canonical: "/apparel/knittedgarments/tshirts/" },
  openGraph: {
    title: "T-Shirt Manufacturer Pakistan | OEM & Wholesale | MZ Global Trading",
    description:
      "OEM t-shirt manufacturer in Pakistan. 7 fabric constructions, GOTS & OEKO-TEX certified cotton, full PMS colour. Supplying brands in USA, UK and Europe.",
    url: "https://mzglobaltrading.com/apparel/knittedgarments/tshirts/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan t-shirt manufacturer — OEM cotton t-shirts wholesale for brands in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "T-Shirt Manufacturer Pakistan | OEM & Wholesale | MZ Global Trading",
    description:
      "OEM t-shirt manufacturer in Pakistan. 7 fabric constructions, certified cotton, full PMS colour. USA, UK and Europe supply.",
  },
};

export default function TShirtsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "T-Shirts — OEM Manufacturing Pakistan",
    description:
      "Pakistan OEM t-shirt manufacturer producing single jersey, pique, interlock, rib, waffle knit and mesh t-shirts in certified cotton for brands and retailers in USA, UK and Europe.",
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
      name: "Pakistan t-shirt manufacturer — OEM cotton t-shirts for brands in USA, UK and Europe",
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
        <TShirtsContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
