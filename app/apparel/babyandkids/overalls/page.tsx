import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import OverallsContent from "./OverallsContent";

export const metadata: Metadata = {
  title: "Baby & Kids Overalls Manufacturer Pakistan | OEM Dungarees",
  description:
    "Pakistan OEM baby and kids overalls — denim, canvas and corduroy dungarees from 0–12 years. GOTS & OEKO-TEX certified. Adjustable straps, snap crotch. Bulk sourcing for USA, UK and Europe.",
  keywords: [
    "baby overalls manufacturer Pakistan",
    "kids dungarees OEM Pakistan",
    "denim overalls wholesale Pakistan",
    "children overalls supplier Pakistan",
    "GOTS certified baby overalls",
    "canvas dungarees OEM export",
    "infant overalls manufacturer Pakistan",
    "toddler dungarees bulk order",
  ],
  alternates: { canonical: "/apparel/babyandkids/overalls/" },
  openGraph: {
    title: "Baby & Kids Overalls Manufacturer Pakistan | OEM Dungarees | MZ Global Trading",
    description:
      "Pakistan OEM baby and kids overalls — denim, canvas and corduroy. 0–12 years, adjustable straps, snap crotch. GOTS certified. Bulk sourcing for USA, UK and Europe.",
    url: "https://mzglobaltrading.com/apparel/babyandkids/overalls/",
    images: [
      {
        url: "/images/menu/menu-overalls.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan baby and kids overalls manufacturer — OEM denim and canvas dungarees for USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby & Kids Overalls Manufacturer Pakistan | OEM Dungarees | MZ Global Trading",
    description:
      "Pakistan OEM baby and kids overalls — denim, canvas, corduroy. 0–12 years. Bulk sourcing for USA, UK and Europe.",
  },
};

export default function OverallsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Baby & Kids Overalls — OEM Dungarees Manufacturing Pakistan",
    description:
      "Pakistan OEM baby and kids overalls manufacturer producing denim, canvas and corduroy dungarees from newborn to 12 years. Adjustable straps, snap crotch for diaper access, GOTS and OEKO-TEX Class 1 certified mills. Bulk programmes for USA, UK, Europe and worldwide.",
    image: "https://mzglobaltrading.com/images/menu/menu-overalls.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/menu/menu-overalls.webp",
      name: "Pakistan baby and kids overalls manufacturer — OEM denim and canvas dungarees for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/" },
        { "@type": "ListItem", position: 4, name: "Overalls", item: "https://mzglobaltrading.com/apparel/babyandkids/overalls/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <OverallsContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
