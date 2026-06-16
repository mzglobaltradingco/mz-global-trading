import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import SwaddleMuslinContent from "./SwaddleMuslinContent";

export const metadata: Metadata = {
  title: "Swaddle Muslin Fabric Manufacturer Pakistan | OEM Baby Wraps",
  description:
    "Pakistan OEM swaddle muslin wraps — GOTS certified organic cotton double gauze. 120×120 cm and custom sizes. Baby-safe azo-free dyes. Bulk sourcing for USA, UK, Europe and global baby brands.",
  keywords: [
    "swaddle muslin manufacturer Pakistan",
    "muslin swaddle wrap wholesale Pakistan",
    "GOTS organic muslin baby wrap",
    "double gauze swaddle blanket OEM",
    "organic cotton muslin baby wholesale",
    "baby swaddle blanket supplier Pakistan",
    "muslin wrap OEM export Pakistan",
    "OEKO-TEX Class 1 swaddle muslin",
  ],
  alternates: { canonical: "/apparel/babyandkids/swaddlemuslinfabric/" },
  openGraph: {
    title: "Swaddle Muslin Fabric Manufacturer Pakistan | OEM Baby Wraps | MZ Global Trading",
    description:
      "Pakistan OEM swaddle muslin — GOTS certified organic cotton double gauze. 120×120 cm and custom sizes. Baby-safe. Bulk sourcing for USA, UK and Europe.",
    url: "https://mzglobaltrading.com/apparel/babyandkids/swaddlemuslinfabric/",
    images: [
      {
        url: "/images/menu/menu-swaddlemuslinfabric.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan swaddle muslin manufacturer — GOTS organic cotton double gauze baby wraps for USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swaddle Muslin Fabric Manufacturer Pakistan | OEM Baby Wraps | MZ Global Trading",
    description:
      "Pakistan OEM swaddle muslin — GOTS organic cotton double gauze. Custom sizes. Bulk sourcing for USA, UK and Europe.",
  },
};

export default function SwaddleMuslinPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Swaddle Muslin Wraps — OEM Baby Textile Manufacturing Pakistan",
    description:
      "Pakistan OEM swaddle muslin wrap manufacturer producing GOTS certified organic cotton muslin and double gauze baby wraps. 90–130 GSM, 120×120 cm standard. OEKO-TEX Class 1 certified mills. Baby-safe azo-free dyes. Bulk programmes for USA, UK, Europe and worldwide baby brands.",
    image: "https://mzglobaltrading.com/images/menu/menu-swaddlemuslinfabric.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/menu/menu-swaddlemuslinfabric.webp",
      name: "Pakistan swaddle muslin manufacturer — GOTS organic cotton double gauze baby wraps for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/" },
        { "@type": "ListItem", position: 4, name: "Swaddle Muslin Fabric", item: "https://mzglobaltrading.com/apparel/babyandkids/swaddlemuslinfabric/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <SwaddleMuslinContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
