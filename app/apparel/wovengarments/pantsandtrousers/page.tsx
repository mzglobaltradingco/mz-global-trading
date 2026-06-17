import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PantsTrousersContent from "./PantsTrousersContent";

export const metadata: Metadata = {
  title: "Pants & Trousers Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom pants and trousers from Pakistan's certified woven factories. Twill, chino, linen, ponte and stretch sateen. 180–280 GSM. OEKO-TEX, BSCI, Sedex. FOB / CIF export.",
  keywords: [
    "pants manufacturer Pakistan",
    "trousers manufacturer Pakistan",
    "chino pants OEM Pakistan",
    "custom trousers supplier",
    "woven pants wholesale Pakistan",
    "twill trousers manufacturer",
    "linen pants supplier Pakistan",
    "formal trousers OEM",
  ],
  alternates: { canonical: "/apparel/wovengarments/pantsandtrousers/" },
  openGraph: {
    title: "Pants & Trousers Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom pants and trousers from Pakistan's certified woven factories. Twill chino, linen, ponte and stretch sateen. 180–280 GSM. OEKO-TEX, BSCI, Sedex available.",
    url: "https://mzglobaltrading.com/apparel/wovengarments/pantsandtrousers/",
    images: [
      {
        url: "/images/og/pants-trousers-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan pants and trousers manufacturer — OEM woven trousers for fashion and corporate brands in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pants & Trousers Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom pants and trousers from Pakistan's certified woven factories. Twill, chino, linen, ponte. 180–280 GSM. OEKO-TEX, BSCI available.",
  },
};

export default function PantsTrousersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Pants & Trousers — Pakistan OEM Sourcing & Export",
            description:
              "Custom pants and trousers sourced from Pakistan's certified woven garment factories. Twill chino, canvas, linen, sateen stretch and ponte constructions. 140–350 GSM. OEKO-TEX, BSCI and Sedex certified.",
            image:
              "https://mzglobaltrading.com/images/og/pants-trousers-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "MZ Global Trading" },
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Apparel",
                  item: "https://mzglobaltrading.com/apparel/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Woven Garments",
                  item: "https://mzglobaltrading.com/apparel/wovengarments/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Pants & Trousers",
                  item: "https://mzglobaltrading.com/apparel/wovengarments/pantsandtrousers/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <PantsTrousersContent />
      </main>
      <Footer />
    </>
  );
}
