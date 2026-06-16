import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BabyRompersContent from "./BabyRompersContent";

export const metadata: Metadata = {
  title: "Baby Rompers Manufacturer Pakistan | OEM Infant Bodysuits",
  description:
    "Pakistan OEM baby rompers and bodysuits — GOTS & OEKO-TEX Class 1 certified organic cotton. Snap crotch, envelope neckline. Newborn to 24 months. Bulk sourcing for USA, UK, Europe and global baby brands.",
  keywords: [
    "baby rompers manufacturer Pakistan",
    "infant bodysuits OEM Pakistan",
    "baby onesie wholesale Pakistan",
    "GOTS certified baby rompers",
    "OEKO-TEX Class 1 baby bodysuits",
    "organic cotton baby rompers bulk",
    "newborn romper supplier Pakistan",
    "baby bodysuit OEM export",
  ],
  alternates: { canonical: "/apparel/babyandkids/babyrompers/" },
  openGraph: {
    title: "Baby Rompers Manufacturer Pakistan | OEM Infant Bodysuits | MZ Global Trading",
    description:
      "Pakistan OEM baby rompers — GOTS & OEKO-TEX Class 1 certified organic cotton. Snap crotch, envelope neckline. Newborn to 24 months. Bulk sourcing for USA, UK and Europe.",
    url: "https://mzglobaltrading.com/apparel/babyandkids/babyrompers/",
    images: [
      {
        url: "/images/menu/menu-babyrompers.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan baby rompers manufacturer — OEM organic cotton infant bodysuits for USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Rompers Manufacturer Pakistan | OEM Infant Bodysuits | MZ Global Trading",
    description:
      "Pakistan OEM baby rompers — GOTS & OEKO-TEX Class 1 organic cotton. Newborn to 24 months. Bulk for USA, UK and Europe.",
  },
};

export default function BabyRompersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Baby Rompers — OEM Infant Bodysuit Manufacturing Pakistan",
    description:
      "Pakistan OEM baby romper and bodysuit manufacturer. GOTS and OEKO-TEX Class 1 certified organic cotton and combed jersey. Snap crotch and envelope necklines. Newborn to 24 months. Bulk programmes for USA, UK, Europe and worldwide.",
    image: "https://mzglobaltrading.com/images/menu/menu-babyrompers.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/menu/menu-babyrompers.webp",
      name: "Pakistan baby rompers manufacturer — OEM organic cotton infant bodysuits for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/" },
        { "@type": "ListItem", position: 4, name: "Baby Rompers", item: "https://mzglobaltrading.com/apparel/babyandkids/babyrompers/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <BabyRompersContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
