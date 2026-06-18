import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BathLinenContent from "./BathLinenContent";

export const metadata: Metadata = {
  title: "Bath Linen Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan bath linen manufacturer — towels, institutional towels, bathrobes, bath mats, beach and pool towels. Terry loop, velour, zero-twist constructions. OEKO-TEX, GOTS. Export worldwide.",
  keywords: [
    "bath linen manufacturer Pakistan",
    "towel manufacturer Pakistan",
    "bathrobe manufacturer Pakistan",
    "bath mat manufacturer Pakistan",
    "beach towel manufacturer Pakistan",
    "institutional towel supplier Pakistan",
    "terry towel manufacturer Pakistan export",
    "OEKO-TEX towel manufacturer Pakistan",
    "GOTS certified bath linen Pakistan",
  ],
  alternates: {
    canonical: "/hometextile/bathlinen/",
    languages: {
      en: "https://mzglobaltrading.com/hometextile/bathlinen/",
      "x-default": "https://mzglobaltrading.com/hometextile/bathlinen/",
    },
  },
  openGraph: {
    title: "Bath Linen Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan bath linen manufacturer supplying towels, institutional towels, bathrobes, bath mats and beach & pool towels. Terry loop, velour, zero-twist, waffle constructions. 300–900 GSM. OEKO-TEX, GOTS, BSCI, ISO 9001 certified. FOB/CIF export to USA, UK, EU, Middle East.",
    url: "https://mzglobaltrading.com/hometextile/bathlinen/",
    images: [
      {
        url: "/images/og/hero-home-textiles.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan bath linen manufacturer — towels, bathrobes and bath mats supplier for hotels and retailers worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bath Linen Manufacturer Pakistan | MZ Global Trading",
    description:
      "Towels, institutional towels, bathrobes, bath mats and beach towels from Pakistan's certified terry mills. OEKO-TEX, GOTS, BSCI. FOB/CIF export worldwide.",
  },
};

export default function BathLinenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://mzglobaltrading.com/hometextile/bathlinen/",
            name: "Bath Linen Manufacturer Pakistan | MZ Global Trading",
            description:
              "Pakistan bath linen manufacturer supplying towels, institutional towels, bathrobes, bath mats and beach & pool towels. OEKO-TEX, GOTS, BSCI, ISO 9001 certified. FOB/CIF export.",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/hero-home-textiles.webp",
              name: "Pakistan bath linen manufacturer — towels, bathrobes and bath mats supplier for hotels and retailers worldwide",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
                { "@type": "ListItem", position: 3, name: "Bath Linen", item: "https://mzglobaltrading.com/hometextile/bathlinen/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <BathLinenContent />
      </main>
      <Footer />
    </>
  );
}
