import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BeachTowelsContent from "./BeachTowelsContent";

export const metadata: Metadata = {
  title: "Beach Towel Manufacturer Pakistan | OEM Pool Towels Wholesale",
  description:
    "Source OEM beach and pool towels from Pakistan — velour, fouta, microfiber, 350–500 GSM. Sublimation all-over print. Resort, retail and corporate programmes. OEKO-TEX certified for USA, UK, Europe.",
  keywords: [
    "beach towel manufacturer Pakistan",
    "pool towel OEM Pakistan",
    "velour beach towel wholesale",
    "sublimation beach towel supplier",
    "fouta towel manufacturer Pakistan",
    "resort towel bulk supplier",
    "beach towel export Pakistan",
    "OEM beach towel factory Pakistan",
  ],
  alternates: { canonical: "/hometextile/bathlinen/beachpooltowel/" },
  openGraph: {
    title: "Beach Towel Manufacturer Pakistan | OEM Pool Towels Wholesale | MZ Global Trading",
    description:
      "Pakistan OEM beach and pool towel manufacturer. Velour, fouta, microfiber, 350–500 GSM. Sublimation all-over print. Resort, retail and corporate programmes worldwide.",
    url: "https://mzglobaltrading.com/hometextile/bathlinen/beachpooltowel/",
    images: [
      {
        url: "/images/og/beach-pool-towels-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan beach towel manufacturer — OEM velour and sublimation print pool towels for resorts and retailers worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beach Towel Manufacturer Pakistan | OEM Pool Towels Wholesale | MZ Global Trading",
    description:
      "Pakistan OEM beach and pool towel manufacturer. Velour, fouta, microfiber. Sublimation print. Resort, retail and corporate programmes worldwide.",
  },
};

export default function BeachPoolTowelPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Beach & Pool Towels — OEM Manufacturing Pakistan",
    description:
      "Pakistan OEM beach and pool towel manufacturer. Velour one-sided and both-sided, terry loop, microfiber and fouta/pestemal. 350–500 GSM. Sublimation all-over print, reactive print and yarn-dyed stripe. GOTS and OEKO-TEX certified.",
    image:
      "https://mzglobaltrading.com/images/og/beach-pool-towels-og.webp",
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
        "https://mzglobaltrading.com/images/og/beach-pool-towels-og.webp",
      name: "Pakistan beach towel manufacturer — OEM velour and sublimation print pool towels for resorts and retailers worldwide",
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
          name: "Bath Linen",
          item: "https://mzglobaltrading.com/hometextile/bathlinen/",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Beach & Pool Towels",
          item: "https://mzglobaltrading.com/hometextile/bathlinen/beachpooltowel/",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MegaMenu />
      <main id="main-content">
        <BeachTowelsContent />
      </main>
      <Footer />
    </>
  );
}
