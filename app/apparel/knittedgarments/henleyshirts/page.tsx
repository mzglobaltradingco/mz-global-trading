import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import HenleyContent from "./HenleyContent";

export const metadata: Metadata = {
  title: "Henley Shirt Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom henley shirts from Pakistan's certified knitwear factories. Single jersey, waffle knit, rib, French terry. 160–240 GSM. GOTS, OEKO-TEX, BSCI. FOB / CIF export.",
  keywords: [
    "henley shirt manufacturer Pakistan",
    "henley shirts wholesale Pakistan",
    "custom henley shirts OEM",
    "waffle knit henley Pakistan",
    "thermal henley shirt manufacturer",
    "henley shirt supplier Pakistan",
    "bulk henley shirts export",
    "OEKO-TEX henley shirts Pakistan",
    "knitted henley shirt factory",
  ],
  alternates: { canonical: "/apparel/knittedgarments/henleyshirts/" },
  openGraph: {
    title: "Henley Shirt Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom henley shirts sourced from Pakistan's certified knitwear factories. Single jersey, waffle knit, rib, French terry. 160–240 GSM. GOTS, OEKO-TEX available.",
    url: "https://mzglobaltrading.com/apparel/knittedgarments/henleyshirts/",
    images: [
      {
        url: "/images/og/henley-shirts-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan henley shirt manufacturer — OEM henley shirts wholesale for brands in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henley Shirt Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom henley shirts from Pakistan's certified knitwear factories. Single jersey, waffle knit, rib. 160–240 GSM. GOTS, OEKO-TEX available.",
  },
};

export default function HenleyShritsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Henley Shirts — Pakistan OEM Sourcing & Export",
            description:
              "Custom henley shirts sourced from Pakistan's certified knitwear factories. Single jersey, waffle knit, rib and French terry constructions. 160–240 GSM. GOTS and OEKO-TEX available.",
            image:
              "https://mzglobaltrading.com/images/og/henley-shirts-og.webp",
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
                  name: "Knitted Garments",
                  item: "https://mzglobaltrading.com/apparel/knittedgarments/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Henley Shirts",
                  item: "https://mzglobaltrading.com/apparel/knittedgarments/henleyshirts/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <HenleyContent />
      </main>
      <Footer />
    </>
  );
}
