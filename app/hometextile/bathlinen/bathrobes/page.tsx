import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BathrobesContent from "./BathrobesContent";

export const metadata: Metadata = {
  title: "Bathrobe Manufacturer Pakistan | Hotel & Spa OEM Terry Robes",
  description:
    "Source OEM bathrobes from Pakistan — shawl collar, kimono and hooded in terry, velour and waffle. 350–500 GSM. Hotel, spa and resort programmes. OEKO-TEX & GOTS certified. FOB/CIF export.",
  keywords: [
    "bathrobe manufacturer Pakistan",
    "hotel bathrobe OEM Pakistan",
    "terry bathrobe wholesale supplier",
    "spa bathrobe manufacturer Pakistan",
    "velour bathrobe OEM export",
    "shawl collar bathrobe manufacturer",
    "OEKO-TEX bathrobe Pakistan",
    "custom bathrobe hotel programme",
    "resort bathrobe supplier Pakistan",
  ],
  alternates: { canonical: "/hometextile/bathlinen/bathrobes/" },
  openGraph: {
    title: "Bathrobe Manufacturer Pakistan | Hotel & Spa OEM Terry Robes | MZ Global Trading",
    description:
      "Pakistan OEM bathrobe manufacturer. Shawl collar, kimono and hooded styles in terry loop, velour and waffle. 350–500 GSM. Hotel, spa and resort programmes.",
    url: "https://mzglobaltrading.com/hometextile/bathlinen/bathrobes/",
    images: [
      {
        url: "/images/menu/menu-bathrobes.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan bathrobe manufacturer — OEM terry and velour bathrobes for hotels and spas in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bathrobe Manufacturer Pakistan | Hotel & Spa OEM Terry Robes | MZ Global Trading",
    description:
      "Pakistan OEM bathrobe manufacturer. Shawl collar, kimono and hooded in terry, velour and waffle. 350–500 GSM. Hotel, spa and resort programmes.",
  },
};

export default function BathrobesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bathrobes — OEM Hotel & Spa Manufacturing Pakistan",
    description:
      "Pakistan OEM bathrobe manufacturer producing shawl collar, kimono and hooded styles in terry loop, velour, waffle and microfleece. 350–500 GSM. OEKO-TEX and GOTS certified for hotel, spa and resort programmes in USA, UK and Europe.",
    image: "https://mzglobaltrading.com/images/menu/menu-bathrobes.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/menu/menu-bathrobes.webp",
      name: "Pakistan bathrobe manufacturer — OEM terry and velour bathrobes for hotels and spas in USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
        { "@type": "ListItem", position: 3, name: "Bath Linen", item: "https://mzglobaltrading.com/hometextile/bathlinen/" },
        { "@type": "ListItem", position: 4, name: "Bathrobes", item: "https://mzglobaltrading.com/hometextile/bathlinen/bathrobes/" },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MegaMenu />
      <main id="main-content">
        <BathrobesContent />
      </main>
      <Footer />
    </>
  );
}
