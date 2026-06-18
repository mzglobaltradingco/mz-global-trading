import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TableLinenContent from "./TableLinenContent";

export const metadata: Metadata = {
  title: "Table Linen Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan table linen manufacturer for hotels, restaurants and events. Cotton damask, jacquard, satin weave table covers. Custom dimensions. OEKO-TEX, BSCI certified.",
  keywords: [
    "table linen manufacturer Pakistan",
    "table covers wholesale Pakistan",
    "hotel table linen supplier",
    "damask tablecloth manufacturer Pakistan",
    "restaurant linen supplier Pakistan",
    "table linen export Pakistan",
    "banquet linen manufacturer",
    "OEKO-TEX table linen Pakistan",
  ],
  alternates: {
    canonical: "/hometextile/tablelinen/",
    languages: {
      en: "https://mzglobaltrading.com/hometextile/tablelinen/",
      "x-default": "https://mzglobaltrading.com/hometextile/tablelinen/",
    },
  },
  openGraph: {
    title: "Table Linen Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan-sourced table linen for hospitality, events and food service. Cotton damask, jacquard, satin weave, poly-cotton. Custom dimensions and branding. OEKO-TEX, BSCI certified export.",
    url: "https://mzglobaltrading.com/hometextile/tablelinen/",
    images: [
      {
        url: "/images/og/hero-home-textiles.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan table linen manufacturer — hotel and banquet table covers for hospitality buyers worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Table Linen Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan table linen — cotton damask, jacquard, satin weave. Hotels, restaurants, events. Custom dimensions. OEKO-TEX, BSCI certified export.",
  },
};

export default function TableLinenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://mzglobaltrading.com/hometextile/tablelinen/",
            name: "Table Linen Manufacturer Pakistan | MZ Global Trading",
            description:
              "Pakistan-manufactured table linen for hotels, restaurants and event companies. Cotton damask, jacquard and satin weave constructions. Custom dimensions. OEKO-TEX and BSCI certified.",
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
                  name: "Home Textiles",
                  item: "https://mzglobaltrading.com/hometextile/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Table Linen",
                  item: "https://mzglobaltrading.com/hometextile/tablelinen/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <TableLinenContent />
      </main>
      <Footer />
    </>
  );
}
