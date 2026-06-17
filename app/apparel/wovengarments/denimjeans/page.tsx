import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import DenimJeansContent from "./DenimJeansContent";

export const metadata: Metadata = {
  title: "Denim Jeans Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom denim jeans from Pakistan's certified woven garment factories. Rigid, stretch 98/2, raw and recycled cotton denim. 8–14 oz. OEKO-TEX, GOTS, BSCI. FOB / CIF export.",
  keywords: [
    "denim jeans manufacturer Pakistan",
    "custom denim jeans OEM",
    "stretch denim supplier Pakistan",
    "rigid denim manufacturer",
    "denim jeans wholesale Pakistan",
    "raw denim manufacturer",
    "selvedge denim Pakistan",
    "OEKO-TEX denim jeans",
  ],
  alternates: { canonical: "/apparel/wovengarments/denimjeans/" },
  openGraph: {
    title: "Denim Jeans Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom denim jeans sourced from Pakistan's certified woven garment factories. Rigid, stretch 98/2, raw and recycled cotton denim. 8–14 oz. OEKO-TEX, GOTS available.",
    url: "https://mzglobaltrading.com/apparel/wovengarments/denimjeans/",
    images: [
      {
        url: "/images/og/denim-jeans-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan denim jeans manufacturer — OEM rigid and stretch denim for fashion brands in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Denim Jeans Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom denim jeans from Pakistan's certified factories. Rigid, stretch 98/2, raw and recycled cotton. 8–14 oz. OEKO-TEX, GOTS available.",
  },
};

export default function DenimJeansPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Denim Jeans — Pakistan OEM Sourcing & Export",
            description:
              "Custom denim jeans sourced from Pakistan's certified woven garment factories. Rigid 3×1 twill, stretch 98/2 cotton-elastane, raw and recycled cotton denim. 8–14 oz. Stone wash, acid wash, enzyme wash available.",
            image:
              "https://mzglobaltrading.com/images/og/denim-jeans-og.webp",
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
                  name: "Denim Jeans",
                  item: "https://mzglobaltrading.com/apparel/wovengarments/denimjeans/",
                },
              ],
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/denim-jeans-og.webp",
              name: "Pakistan denim jeans manufacturer — OEM woven denim garments for brands in USA, UK and Europe",
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <DenimJeansContent />
      </main>
      <Footer />
    </>
  );
}
