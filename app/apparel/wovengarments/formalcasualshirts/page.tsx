import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import FormalShirtsContent from "./FormalShirtsContent";

export const metadata: Metadata = {
  title: "Formal Casual Shirts Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom formal and casual shirts from Pakistan's certified woven factories. Poplin, Oxford, twill, linen, chambray. 80–200 GSM. GOTS, OEKO-TEX, BSCI. FOB / CIF export.",
  keywords: [
    "formal shirts manufacturer Pakistan",
    "casual shirts supplier Pakistan",
    "poplin shirts OEM Pakistan",
    "oxford shirt manufacturer",
    "custom dress shirts Pakistan",
    "linen shirts wholesale",
    "corporate shirts manufacturer Pakistan",
    "woven shirts export Pakistan",
  ],
  alternates: { canonical: "/apparel/wovengarments/formalcasualshirts/" },
  openGraph: {
    title: "Formal Casual Shirts Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom formal and casual shirts from Pakistan's certified woven factories. Poplin, Oxford, twill, linen, chambray. 80–200 GSM. GOTS, OEKO-TEX available.",
    url: "https://mzglobaltrading.com/apparel/wovengarments/formalcasualshirts/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan formal and casual shirts manufacturer — OEM woven shirts for corporate and fashion brands in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formal Casual Shirts Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom formal and casual shirts from Pakistan's certified woven factories. Poplin, Oxford, twill, linen, chambray. 80–200 GSM. GOTS, OEKO-TEX available.",
  },
};

export default function FormalCasualShirtsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Formal & Casual Shirts — Pakistan OEM Sourcing & Export",
            description:
              "Custom formal and casual shirts sourced from Pakistan's certified woven garment factories. Poplin, Oxford weave, twill, linen, chambray, end-on-end, dobby and seersucker. 80–200 GSM. GOTS and OEKO-TEX available.",
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
                  name: "Formal & Casual Shirts",
                  item: "https://mzglobaltrading.com/apparel/wovengarments/formalcasualshirts/",
                },
              ],
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/hero/hero-apparel.webp",
              name: "Pakistan formal and casual shirts manufacturer — OEM woven shirts for brands in USA, UK and Europe",
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <FormalShirtsContent />
      </main>
      <Footer />
    </>
  );
}
