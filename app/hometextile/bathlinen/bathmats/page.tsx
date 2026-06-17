import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BathMatsContent from "./BathMatsContent";

export const metadata: Metadata = {
  title: "Bath Mat Manufacturer Pakistan | OEM Anti-Slip Hotel Bath Mats",
  description:
    "Source OEM bath mats from Pakistan — tufted terry, chenille and memory foam, 800–1500 GSM, latex and rubber spray anti-slip backing. Hotel, healthcare and retail programmes for USA, UK, Europe.",
  keywords: [
    "bath mat manufacturer Pakistan",
    "anti-slip bath mat OEM Pakistan",
    "hotel bath mat supplier Pakistan",
    "tufted bath mat wholesale",
    "chenille bath mat manufacturer",
    "bath mat bulk supplier Pakistan",
    "custom bath mats OEM export",
    "OEKO-TEX bath mat manufacturer",
  ],
  alternates: { canonical: "/hometextile/bathlinen/bathmats/" },
  openGraph: {
    title: "Bath Mat Manufacturer Pakistan | OEM Anti-Slip Hotel Bath Mats | MZ Global Trading",
    description:
      "Pakistan OEM bath mat manufacturer. Tufted terry, chenille, memory foam. 800–1500 GSM. Anti-slip latex and rubber backing. Hotel, healthcare and retail programmes for USA, UK, Europe.",
    url: "https://mzglobaltrading.com/hometextile/bathlinen/bathmats/",
    images: [
      {
        url: "/images/og/bath-mats-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan bath mat manufacturer — OEM anti-slip tufted and chenille bath mats for hotels and retailers worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bath Mat Manufacturer Pakistan | OEM Anti-Slip Hotel Bath Mats | MZ Global Trading",
    description:
      "Pakistan OEM bath mat manufacturer. Tufted terry, chenille, memory foam. 800–1500 GSM. Anti-slip backing. Hotel, healthcare and retail programmes worldwide.",
  },
};

export default function BathMatsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bath Mats — OEM Anti-Slip Manufacturing Pakistan",
    description:
      "Pakistan OEM bath mat manufacturer producing tufted terry, chenille, memory foam and microfiber bath mats with latex and rubber spray anti-slip backing. 800–1500 GSM. Hotel, healthcare and retail programmes for USA, UK, Europe and worldwide.",
    image: "https://mzglobaltrading.com/images/og/bath-mats-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/og/bath-mats-og.webp",
      name: "Pakistan bath mat manufacturer — OEM anti-slip tufted and chenille bath mats for hotels and retailers worldwide",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
        { "@type": "ListItem", position: 3, name: "Bath Linen", item: "https://mzglobaltrading.com/hometextile/bathlinen/" },
        { "@type": "ListItem", position: 4, name: "Bath Mats", item: "https://mzglobaltrading.com/hometextile/bathlinen/bathmats/" },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MegaMenu />
      <main id="main-content">
        <BathMatsContent />
      </main>
      <Footer />
    </>
  );
}
