import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TankTopsContent from "./TankTopsContent";

export const metadata: Metadata = {
  title: "Tank Top Manufacturer Pakistan | OEM Athletic Vests Wholesale",
  description:
    "Source OEM tank tops from Pakistan — single jersey, rib, mesh, slub and bamboo jersey. 130–180 GSM. Women's athleisure and performance programmes. GOTS and OEKO-TEX certified mills for USA, UK, Europe.",
  keywords: [
    "tank top manufacturer Pakistan",
    "athletic vest OEM Pakistan",
    "bamboo jersey tank top wholesale",
    "women athleisure tank top supplier",
    "mesh tank top manufacturer Pakistan",
    "rib tank top OEM export",
    "performance vest wholesale Pakistan",
    "GOTS certified tank top manufacturer",
  ],
  alternates: { canonical: "/apparel/knittedgarments/tanktops/" },
  openGraph: {
    title: "Tank Top Manufacturer Pakistan | OEM Athletic Vests Wholesale | MZ Global Trading",
    description:
      "Pakistan OEM tank top manufacturer. Single jersey, rib, mesh and bamboo jersey. 130–180 GSM. Women's athleisure and performance programmes. GOTS and OEKO-TEX certified for USA, UK, Europe.",
    url: "https://mzglobaltrading.com/apparel/knittedgarments/tanktops/",
    images: [
      {
        url: "/images/menu/menu-tanktops.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan tank top manufacturer — OEM single jersey, rib and bamboo jersey athletic vests for USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tank Top Manufacturer Pakistan | OEM Athletic Vests Wholesale | MZ Global Trading",
    description:
      "Pakistan OEM tank top manufacturer. Single jersey, rib, mesh, slub and bamboo jersey. 130–180 GSM. Athleisure and performance programmes for USA, UK and Europe.",
  },
};

export default function TankTopsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Tank Tops — OEM Athleisure and Performance Manufacturing Pakistan",
    description:
      "Pakistan OEM tank top manufacturer producing single jersey, rib, mesh, slub and bamboo jersey athletic vests and athleisure tank tops. 130–180 GSM. Women's athleisure, men's training and lifestyle programmes for USA, UK, Europe and worldwide.",
    image: "https://mzglobaltrading.com/images/menu/menu-tanktops.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/menu/menu-tanktops.webp",
      name: "Pakistan tank top manufacturer — OEM single jersey, rib and bamboo jersey athletic vests for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Knitted Garments", item: "https://mzglobaltrading.com/apparel/knittedgarments/" },
        { "@type": "ListItem", position: 4, name: "Tank Tops", item: "https://mzglobaltrading.com/apparel/knittedgarments/tanktops/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <TankTopsContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
