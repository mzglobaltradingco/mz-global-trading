import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import HoodiesContent from "./HoodiesContent";

export const metadata: Metadata = {
  title: "Sweatshirt & Hoodie Manufacturer Pakistan | OEM Fleece",
  description:
    "Source OEM sweatshirts and hoodies from Pakistan — French terry, loop-back fleece, brushed fleece, 300–420 GSM. GOTS and OEKO-TEX certified. Sportswear, streetwear and corporate programmes for USA, UK, Europe.",
  keywords: [
    "sweatshirt manufacturer Pakistan",
    "hoodie manufacturer Pakistan",
    "OEM hoodie fleece manufacturer",
    "French terry hoodie wholesale",
    "brushed fleece sweatshirt Pakistan",
    "hoodie factory Pakistan USA UK",
    "custom sweatshirt OEM Pakistan",
    "Pakistan fleece garment exporter",
  ],
  alternates: { canonical: "/apparel/knittedgarments/sweatshirtshoodies/" },
  openGraph: {
    title: "Sweatshirt & Hoodie Manufacturer Pakistan | OEM Fleece | MZ Global Trading",
    description:
      "Pakistan OEM sweatshirt and hoodie manufacturer. French terry, loop-back fleece, brushed fleece, 300–420 GSM. GOTS and OEKO-TEX certified. Sportswear, streetwear and corporate programmes.",
    url: "https://mzglobaltrading.com/apparel/knittedgarments/sweatshirtshoodies/",
    images: [
      {
        url: "/images/og/sweatshirts-hoodies-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan sweatshirt and hoodie manufacturer — OEM French terry and fleece hoodies for sportswear and retail brands worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweatshirt & Hoodie Manufacturer Pakistan | OEM Fleece | MZ Global Trading",
    description:
      "Pakistan OEM sweatshirt and hoodie manufacturer. French terry, loop-back fleece, brushed fleece, 300–420 GSM. GOTS and OEKO-TEX certified.",
  },
};

export default function SweatshirtsHoodiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sweatshirts & Hoodies — OEM Manufacturing Pakistan",
    description:
      "Pakistan OEM sweatshirt and hoodie manufacturer producing French terry, loop-back fleece, brushed fleece, polar fleece and bonded fleece mid-layer garments for sportswear, streetwear and corporate programmes in USA, UK and Europe.",
    image: "https://mzglobaltrading.com/images/og/sweatshirts-hoodies-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/og/sweatshirts-hoodies-og.webp",
      name: "Pakistan sweatshirt and hoodie manufacturer — OEM French terry and fleece hoodies for sportswear and retail brands worldwide",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Knitted Garments", item: "https://mzglobaltrading.com/apparel/knittedgarments/" },
        { "@type": "ListItem", position: 4, name: "Sweatshirts & Hoodies", item: "https://mzglobaltrading.com/apparel/knittedgarments/sweatshirtshoodies/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <HoodiesContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
