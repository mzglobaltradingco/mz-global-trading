import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import KnittedGarmentsContent from "./KnittedGarmentsContent";

export const metadata: Metadata = {
  title: "Knitted Garments Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan knitted garment manufacturer — T-shirts, polo shirts, henley shirts, sweatshirts, hoodies, joggers and tank tops. GOTS, OEKO-TEX certified. FOB/CIF export to USA, UK, EU.",
  keywords: [
    "knitted garments manufacturer Pakistan",
    "knitwear manufacturer Pakistan",
    "t-shirt manufacturer Pakistan",
    "polo shirt manufacturer Pakistan",
    "sweatshirt manufacturer Pakistan export",
    "hoodie manufacturer Pakistan",
    "OEM knitwear Pakistan",
    "jersey garment manufacturer Pakistan",
    "GOTS certified knitwear Pakistan",
  ],
  alternates: {
    canonical: "/apparel/knittedgarments/",
    languages: {
      en: "https://mzglobaltrading.com/apparel/knittedgarments/",
      "x-default": "https://mzglobaltrading.com/apparel/knittedgarments/",
    },
  },
  openGraph: {
    title: "Knitted Garments Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan knitwear manufacturer supplying T-shirts, polo shirts, henley shirts, sweatshirts, hoodies, joggers and tank tops. Single jersey, rib, waffle, French terry constructions. 140–350 GSM. GOTS, OEKO-TEX, BSCI. FOB/CIF export worldwide.",
    url: "https://mzglobaltrading.com/apparel/knittedgarments/",
    images: [
      {
        url: "/images/og/knitted-garments-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan knitted garments manufacturer — knitwear OEM supplier for brands in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Knitted Garments Manufacturer Pakistan | MZ Global Trading",
    description:
      "T-shirts, polo shirts, sweatshirts, hoodies, henley shirts, joggers and tank tops from Pakistan's certified knitwear mills. GOTS, OEKO-TEX. FOB/CIF worldwide.",
  },
};

export default function KnittedGarmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://mzglobaltrading.com/apparel/knittedgarments/",
            name: "Knitted Garments Manufacturer Pakistan | MZ Global Trading",
            description:
              "Pakistan knitwear manufacturer supplying T-shirts, polo shirts, henley shirts, sweatshirts, hoodies, joggers and tank tops to international brands and retailers. GOTS, OEKO-TEX, BSCI certified. FOB/CIF export.",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/knitted-garments-og.webp",
              name: "Pakistan knitted garments manufacturer — knitwear OEM supplier for brands in USA, UK and Europe",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
                { "@type": "ListItem", position: 3, name: "Knitted Garments", item: "https://mzglobaltrading.com/apparel/knittedgarments/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <KnittedGarmentsContent />
      </main>
      <Footer />
    </>
  );
}
