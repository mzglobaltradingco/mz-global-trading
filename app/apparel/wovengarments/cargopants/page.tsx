import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import CargoPantsContent from "./CargoPantsContent";

export const metadata: Metadata = {
  title: "Cargo Pants Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom cargo pants from Pakistan's certified woven factories. Ripstop, canvas, TC poly-cotton and stretch ripstop. 200–300 GSM. OEKO-TEX, BSCI. FOB / CIF export.",
  keywords: [
    "cargo pants manufacturer Pakistan",
    "cargo trousers supplier Pakistan",
    "ripstop cargo pants OEM",
    "custom cargo pants wholesale",
    "tactical pants manufacturer Pakistan",
    "canvas cargo pants export",
    "outdoor pants manufacturer Pakistan",
  ],
  alternates: { canonical: "/apparel/wovengarments/cargopants/" },
  openGraph: {
    title: "Cargo Pants Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom cargo pants sourced from Pakistan's certified woven factories. Ripstop, canvas, TC poly-cotton and stretch ripstop. 200–300 GSM. OEKO-TEX, BSCI available.",
    url: "https://mzglobaltrading.com/apparel/wovengarments/cargopants/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan cargo pants manufacturer — OEM ripstop and canvas cargo for outdoor, tactical and workwear brands worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cargo Pants Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom cargo pants from Pakistan's certified woven factories. Ripstop, canvas, TC poly-cotton, stretch ripstop. OEKO-TEX, BSCI available.",
  },
};

export default function CargoPantsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Cargo Pants — Pakistan OEM Sourcing & Export",
            description:
              "Custom cargo pants sourced from Pakistan's certified woven factories. Ripstop, canvas, TC poly-cotton, stretch ripstop and FR cotton constructions. 200–300 GSM. OEKO-TEX and BSCI available.",
            image:
              "https://mzglobaltrading.com/images/hero/hero-apparel.webp",
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
                  name: "Cargo Pants",
                  item: "https://mzglobaltrading.com/apparel/wovengarments/cargopants/",
                },
              ],
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/hero/hero-apparel.webp",
              name: "Pakistan cargo pants manufacturer — ripstop and canvas cargo for outdoor and workwear brands",
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <CargoPantsContent />
      </main>
      <Footer />
    </>
  );
}
