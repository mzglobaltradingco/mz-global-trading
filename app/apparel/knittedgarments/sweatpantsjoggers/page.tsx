import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import SweatpantsContent from "./SweatpantsContent";

export const metadata: Metadata = {
  title: "Sweatpants & Jogger Manufacturer Pakistan | OEM Fleece Bottoms",
  description:
    "Source OEM sweatpants and joggers from Pakistan — French terry, brushed fleece, cotton-spandex. Co-ord set programmes. GOTS and OEKO-TEX certified mills for USA, UK, Europe and worldwide.",
  keywords: [
    "sweatpants manufacturer Pakistan",
    "jogger pants OEM Pakistan",
    "fleece bottoms wholesale Pakistan",
    "co-ord set manufacturer Pakistan",
    "French terry sweatpants manufacturer",
    "brushed fleece joggers OEM",
    "athletic bottoms supplier Pakistan",
    "activewear manufacturer Pakistan export",
  ],
  alternates: { canonical: "/apparel/knittedgarments/sweatpantsjoggers/" },
  openGraph: {
    title: "Sweatpants & Jogger Manufacturer Pakistan | OEM Fleece Bottoms | MZ Global Trading",
    description:
      "Pakistan OEM sweatpants and jogger manufacturer. French terry, brushed fleece, cotton-spandex. Co-ord set programmes. GOTS, OEKO-TEX certified for USA, UK, Europe.",
    url: "https://mzglobaltrading.com/apparel/knittedgarments/sweatpantsjoggers/",
    images: [
      {
        url: "/images/og/sweatpants-joggers-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan sweatpants and jogger manufacturer — OEM French terry and fleece bottoms for activewear programmes worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweatpants & Jogger Manufacturer Pakistan | OEM Fleece Bottoms | MZ Global Trading",
    description:
      "Pakistan OEM sweatpants and jogger manufacturer. French terry, brushed fleece, cotton-spandex. Co-ord set programmes. GOTS, OEKO-TEX certified.",
  },
};

export default function SweatpantsJoggersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Sweatpants & Joggers — Pakistan OEM Sourcing & Export",
            description:
              "Pakistan OEM sweatpants and jogger manufacturer producing French terry, loop back fleece, brushed fleece, cotton-spandex and polar fleece bottoms. Co-ord set capability. GOTS and OEKO-TEX certified mills for USA, UK, Europe and worldwide.",
            image:
              "https://mzglobaltrading.com/images/og/sweatpants-joggers-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "MZ Global Trading" },
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/og/sweatpants-joggers-og.webp",
              name: "Pakistan sweatpants and jogger manufacturer — OEM French terry and fleece bottoms for activewear programmes worldwide",
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
                  name: "Sweatpants & Joggers",
                  item: "https://mzglobaltrading.com/apparel/knittedgarments/sweatpantsjoggers/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <SweatpantsContent />
      </main>
      <Footer />
    </>
  );
}
