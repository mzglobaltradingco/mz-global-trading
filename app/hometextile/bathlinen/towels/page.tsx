import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TowelsContent from "./TowelsContent";

export const metadata: Metadata = {
  title: "Towel Manufacturer Pakistan | Bath Towels Wholesale OEM",
  description:
    "Source OEM bath towels from Pakistan — 6 weave constructions, terry loop to zero twist, OEKO-TEX & GOTS certified. Hotel, retail and hospitality programmes for USA, UK, Europe and worldwide.",
  keywords: [
    "towel manufacturer Pakistan",
    "bath towel wholesale OEM Pakistan",
    "terry towel manufacturer exporter",
    "hotel towels bulk supplier Pakistan",
    "GOTS certified towel manufacturer",
    "custom towels OEM Pakistan USA UK Europe",
    "cotton bath towel supplier",
    "home textile manufacturer Pakistan",
  ],
  alternates: { canonical: "/hometextile/bathlinen/towels/" },
  openGraph: {
    title: "Towel Manufacturer Pakistan | Bath Towels Wholesale OEM | MZ Global Trading",
    description:
      "Pakistan OEM bath towel manufacturer. 6 weave constructions, OEKO-TEX and GOTS certified terry. Hotel, retail and hospitality supply for USA, UK, Europe and Middle East.",
    url: "https://mzglobaltrading.com/hometextile/bathlinen/towels/",
    images: [
      {
        url: "/images/thumbnails/thumb-towels.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan bath towel manufacturer — OEM terry cotton towels for hotels and retailers in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Towel Manufacturer Pakistan | Bath Towels Wholesale OEM | MZ Global Trading",
    description:
      "Pakistan OEM bath towel manufacturer. 6 weave constructions, OEKO-TEX & GOTS certified. Hotel, retail and hospitality supply for USA, UK and Europe.",
  },
};

export default function TowelsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bath Towels — OEM Manufacturing Pakistan",
    description:
      "Pakistan OEM bath towel manufacturer producing terry loop, velour, zero twist, waffle, jacquard and dobby border towels in certified cotton for hotels, retailers and hospitality brands in USA, UK and Europe.",
    image: "https://mzglobaltrading.com/images/thumbnails/thumb-towels.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/thumbnails/thumb-towels.webp",
      name: "Pakistan bath towel manufacturer — OEM terry cotton towels for hotels and retailers in USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
        { "@type": "ListItem", position: 3, name: "Bath Linen", item: "https://mzglobaltrading.com/hometextile/bathlinen/" },
        { "@type": "ListItem", position: 4, name: "Towels", item: "https://mzglobaltrading.com/hometextile/bathlinen/towels/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <TowelsContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
