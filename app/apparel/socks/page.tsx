import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import SocksContent from "./SocksContent";

export const metadata: Metadata = {
  title: "Socks Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan socks manufacturer — 7 knit structures from plain to compression. Athletic, fashion and institutional programmes. GOTS, OEKO-TEX, BSCI certified. FOB / CIF export to USA, UK, Europe.",
  keywords: [
    "socks manufacturer Pakistan",
    "wholesale socks supplier Pakistan",
    "OEM socks manufacturer",
    "athletic socks Pakistan",
    "compression socks manufacturer Pakistan",
    "fashion socks wholesale",
    "knitted socks exporter Pakistan",
    "bulk socks supplier",
    "GOTS certified socks Pakistan",
  ],
  alternates: { canonical: "/apparel/socks/" },
  openGraph: {
    title: "Socks Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan socks manufacturer — 7 knit structures from plain liner to compression. Athletic, fashion and institutional programmes. GOTS, OEKO-TEX certified.",
    url: "https://mzglobaltrading.com/apparel/socks/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan socks manufacturer — knitted performance and fashion socks for wholesale buyers in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Socks Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan socks manufacturer — 7 knit structures, athletic to compression. GOTS, OEKO-TEX certified. FOB / CIF export worldwide.",
  },
};

export default function SocksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Socks — Pakistan OEM Manufacturing & Export",
            description:
              "Knitted performance, athletic, compression and fashion socks manufactured in Pakistan. 7 knit structures covering liner to heavy cushion. GOTS and OEKO-TEX available.",
            image:
              "https://mzglobaltrading.com/images/hero/hero-apparel.webp",
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
                "https://mzglobaltrading.com/images/hero/hero-apparel.webp",
              name: "Pakistan socks manufacturer — knitted performance and fashion socks",
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
                  name: "Socks",
                  item: "https://mzglobaltrading.com/apparel/socks/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <SocksContent />
      </main>
      <Footer />
    </>
  );
}
