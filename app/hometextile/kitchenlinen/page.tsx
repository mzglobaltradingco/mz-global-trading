import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import KitchenLinenContent from "./KitchenLinenContent";

export const metadata: Metadata = {
  title: "Kitchen Linen Supplier Pakistan | MZ Global Trading",
  description:
    "Pakistan kitchen linen manufacturer: kitchen towels, bar mops, aprons and pot holders. OEKO-TEX, BSCI, ISO 9001 certified. FOB export to USA, UK, EU, Middle East.",
  keywords: [
    "kitchen linen manufacturer Pakistan",
    "kitchen linen supplier Pakistan",
    "kitchen towels wholesale Pakistan",
    "bar mops manufacturer Pakistan",
    "aprons supplier Pakistan",
    "pot holders manufacturer Pakistan",
    "commercial kitchen linen Pakistan",
    "F&B linen wholesale Pakistan",
    "hospitality kitchen textiles supplier",
  ],
  alternates: {
    canonical: "/hometextile/kitchenlinen/",
    languages: {
      en: "https://mzglobaltrading.com/hometextile/kitchenlinen/",
      "x-default": "https://mzglobaltrading.com/hometextile/kitchenlinen/",
    },
  },
  openGraph: {
    title: "Kitchen Linen Supplier Pakistan | MZ Global Trading",
    description:
      "Kitchen towels, bar mops, aprons and pot holders sourced from Pakistan's certified textile mills. OEKO-TEX, BSCI, ISO 9001. FOB / CIF export to USA, UK, EU and worldwide.",
    url: "https://mzglobaltrading.com/hometextile/kitchenlinen/",
    images: [
      {
        url: "/images/og/hero-home-textiles.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan kitchen linen manufacturer — kitchen towels, bar mops, aprons and pot holders for F&B and hospitality buyers worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen Linen Supplier Pakistan | MZ Global Trading",
    description:
      "Kitchen towels, bar mops, aprons and pot holders from Pakistan's certified textile mills. OEKO-TEX, BSCI, ISO 9001. Export to USA, UK, EU and worldwide.",
  },
};

export default function KitchenLinenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://mzglobaltrading.com/hometextile/kitchenlinen/",
            name: "Kitchen Linen Supplier Pakistan | MZ Global Trading",
            description:
              "Kitchen towels, bar mops, aprons and pot holders sourced from Pakistan's certified textile mills. OEKO-TEX, BSCI, ISO 9001 certified. FOB export to USA, UK, EU and worldwide.",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/og/hero-home-textiles.webp",
              name: "Pakistan kitchen linen manufacturer — F&B and hospitality textile supply",
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
                  name: "Home Textiles",
                  item: "https://mzglobaltrading.com/hometextile/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Kitchen Linen",
                  item: "https://mzglobaltrading.com/hometextile/kitchenlinen/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <KitchenLinenContent />
      </main>
      <Footer />
    </>
  );
}
