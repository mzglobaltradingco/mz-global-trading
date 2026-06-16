import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ShortsContent from "./ShortsContent";

export const metadata: Metadata = {
  title: "Shorts Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom shorts from Pakistan's certified factories. Chino twill, ripstop, linen blend, athletic jersey and nylon swim constructions. 160–280 GSM. OEKO-TEX, BSCI. FOB/CIF export worldwide.",
  keywords: [
    "shorts manufacturer Pakistan",
    "custom shorts OEM Pakistan",
    "chino shorts supplier Pakistan",
    "athletic shorts manufacturer",
    "swim shorts manufacturer Pakistan",
    "ripstop shorts wholesale",
    "linen shorts manufacturer Pakistan",
  ],
  alternates: { canonical: "/apparel/wovengarments/shorts/" },
  openGraph: {
    title: "Shorts Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom shorts from Pakistan's certified woven and knit factories. Chino, ripstop, linen blend, athletic jersey and nylon swim. OEKO-TEX, BSCI available.",
    url: "https://mzglobaltrading.com/apparel/wovengarments/shorts/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan shorts manufacturer — OEM chino, ripstop and athletic shorts for wholesale buyers worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shorts Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom shorts sourced from Pakistan's certified woven and knit factories. Chino, ripstop, linen blend, athletic jersey. OEKO-TEX, BSCI available.",
  },
};

export default function ShortsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Shorts — Pakistan OEM Sourcing & Export",
            description:
              "Custom shorts sourced from Pakistan's certified factories. Seven construction types: chino twill, ripstop, canvas, linen blend, single jersey, French terry and nylon swim. 160–280 GSM. OEKO-TEX and BSCI available.",
            image: "https://mzglobaltrading.com/images/hero/hero-apparel.webp",
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
                  name: "Shorts",
                  item: "https://mzglobaltrading.com/apparel/wovengarments/shorts/",
                },
              ],
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/hero/hero-apparel.webp",
              name: "Pakistan shorts manufacturer — chino, ripstop and athletic shorts for wholesale buyers",
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <ShortsContent />
      </main>
      <Footer />
    </>
  );
}
