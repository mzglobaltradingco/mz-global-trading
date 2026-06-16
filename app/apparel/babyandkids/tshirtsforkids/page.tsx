import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TShirtsForKidsContent from "./TShirtsForKidsContent";

export const metadata: Metadata = {
  title: "Kids T-Shirts Manufacturer Pakistan | OEM Children's Apparel",
  description:
    "Pakistan OEM kids T-shirts — GOTS & OEKO-TEX Class 1 certified organic cotton and combed jersey. Age 0–12 years, baby-safe inks. Bulk sourcing for USA, UK, Europe and global retailers.",
  keywords: [
    "kids t-shirts manufacturer Pakistan",
    "children t-shirts wholesale Pakistan",
    "OEM baby t-shirts Pakistan",
    "GOTS certified kids apparel",
    "OEKO-TEX Class 1 children t-shirts",
    "organic cotton kids t-shirts bulk",
    "toddler t-shirts supplier Pakistan",
    "infant t-shirts OEM export",
  ],
  alternates: { canonical: "/apparel/babyandkids/tshirtsforkids/" },
  openGraph: {
    title: "Kids T-Shirts Manufacturer Pakistan | OEM Children's Apparel | MZ Global Trading",
    description:
      "Pakistan OEM kids T-shirts — GOTS & OEKO-TEX Class 1 certified. Organic cotton, combed jersey, muslin. Age 0–12 years. Bulk sourcing for USA, UK, Europe and global retailers.",
    url: "https://mzglobaltrading.com/apparel/babyandkids/tshirtsforkids/",
    images: [
      {
        url: "/images/menu/menu-tshirtsforkids.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan kids T-shirt manufacturer — OEM organic cotton and combed jersey children's tees for USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kids T-Shirts Manufacturer Pakistan | OEM Children's Apparel | MZ Global Trading",
    description:
      "Pakistan OEM kids T-shirts — GOTS & OEKO-TEX Class 1 certified organic cotton. Age 0–12. Bulk sourcing for USA, UK and Europe.",
  },
};

export default function TShirtsForKidsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Kids T-Shirts — OEM Children's Apparel Manufacturing Pakistan",
    description:
      "Pakistan OEM kids T-shirt manufacturer producing organic cotton and combed jersey children's tees in sizes from premature to 12 years. GOTS and OEKO-TEX Class 1 certified mills. Baby-safe water-based inks and hypoallergenic finishes. Bulk programmes for USA, UK, Europe and worldwide.",
    image: "https://mzglobaltrading.com/images/menu/menu-tshirtsforkids.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/menu/menu-tshirtsforkids.webp",
      name: "Pakistan kids T-shirt manufacturer — OEM organic cotton and combed jersey children's tees for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/" },
        { "@type": "ListItem", position: 4, name: "T-Shirts for Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/tshirtsforkids/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <TShirtsForKidsContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
