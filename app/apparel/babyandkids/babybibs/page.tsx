import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BabyBibsContent from "./BabyBibsContent";

export const metadata: Metadata = {
  title: "Baby Bibs Manufacturer Pakistan | OEM Drool & Feeding Bibs",
  description:
    "Pakistan OEM baby bibs — terry, muslin and bandana drool bibs with TPU waterproof backing. GOTS & OEKO-TEX Class 1 certified. Velcro or snap closure. Bulk sourcing for USA, UK and Europe.",
  keywords: [
    "baby bibs manufacturer Pakistan",
    "drool bibs OEM Pakistan",
    "bandana bibs wholesale Pakistan",
    "OEKO-TEX Class 1 baby bibs",
    "GOTS certified baby bibs",
    "terry bib supplier Pakistan",
    "feeding bibs OEM export",
    "waterproof baby bibs bulk",
  ],
  alternates: { canonical: "/apparel/babyandkids/babybibs/" },
  openGraph: {
    title: "Baby Bibs Manufacturer Pakistan | OEM Drool & Feeding Bibs | MZ Global Trading",
    description:
      "Pakistan OEM baby bibs — terry, muslin and bandana drool bibs. GOTS & OEKO-TEX Class 1 certified. TPU waterproof backing option. Bulk sourcing for USA, UK and Europe.",
    url: "https://mzglobaltrading.com/apparel/babyandkids/babybibs/",
    images: [
      {
        url: "/images/menu/menu-babybibs.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan baby bibs manufacturer — OEM terry and muslin drool bibs for USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Bibs Manufacturer Pakistan | OEM Drool & Feeding Bibs | MZ Global Trading",
    description:
      "Pakistan OEM baby bibs — terry, muslin, bandana styles. OEKO-TEX Class 1. Bulk for USA, UK and Europe.",
  },
};

export default function BabyBibsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Baby Bibs — OEM Drool and Feeding Bib Manufacturing Pakistan",
    description:
      "Pakistan OEM baby bibs manufacturer producing terry, muslin, interlock and bandana drool bibs. GOTS and OEKO-TEX Class 1 certified. Velcro and snap closures. TPU waterproof backing available. Bulk programmes for USA, UK, Europe and global baby brands.",
    image: "https://mzglobaltrading.com/images/menu/menu-babybibs.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/menu/menu-babybibs.webp",
      name: "Pakistan baby bibs manufacturer — OEM terry and muslin drool bibs for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/" },
        { "@type": "ListItem", position: 4, name: "Baby Bibs", item: "https://mzglobaltrading.com/apparel/babyandkids/babybibs/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <BabyBibsContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
