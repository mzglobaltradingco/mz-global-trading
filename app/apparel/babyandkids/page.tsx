import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BabyAndKidsContent from "./BabyAndKidsContent";

export const metadata: Metadata = {
  title: "Baby & Kids Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan baby and kids clothing manufacturer — t-shirts, rompers, overalls, bibs, swaddle muslin and hooded towels. GOTS, OEKO-TEX Class 1. Safe for newborns. Export worldwide.",
  keywords: [
    "baby clothing manufacturer Pakistan",
    "kids apparel manufacturer Pakistan",
    "baby rompers manufacturer Pakistan",
    "swaddle muslin manufacturer Pakistan",
    "GOTS baby clothing Pakistan",
    "OEKO-TEX baby apparel Pakistan",
    "organic baby clothing manufacturer",
    "baby bibs manufacturer Pakistan export",
  ],
  alternates: {
    canonical: "/apparel/babyandkids/",
    languages: {
      en: "https://mzglobaltrading.com/apparel/babyandkids/",
      "x-default": "https://mzglobaltrading.com/apparel/babyandkids/",
    },
  },
  openGraph: {
    title: "Baby & Kids Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan baby & kids manufacturer supplying t-shirts, rompers, overalls, bibs, swaddle muslin fabric and hooded towels. GOTS organic, OEKO-TEX Standard 100 Class 1 — safe for newborn skin. Single jersey, interlock, muslin gauze constructions. FOB/CIF export to USA, UK, EU, Australia.",
    url: "https://mzglobaltrading.com/apparel/babyandkids/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan baby and kids clothing manufacturer — GOTS certified rompers, bibs and swaddle muslin for international brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby & Kids Manufacturer Pakistan | MZ Global Trading",
    description:
      "Baby rompers, t-shirts, overalls, bibs, swaddle muslin and hooded towels from Pakistan's GOTS-certified factories. OEKO-TEX Class 1 safe for newborns. FOB/CIF export.",
  },
};

export default function BabyAndKidsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://mzglobaltrading.com/apparel/babyandkids/",
            name: "Baby & Kids Manufacturer Pakistan | MZ Global Trading",
            description:
              "Pakistan baby and kids manufacturer supplying t-shirts, rompers, overalls, bibs, swaddle muslin and hooded towels. GOTS certified, OEKO-TEX Standard 100 Class 1. Safe for newborn skin. FOB/CIF export worldwide.",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/hero-apparel.webp",
              name: "Pakistan baby and kids clothing manufacturer — GOTS certified rompers, bibs and swaddle muslin for international brands",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
                { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <BabyAndKidsContent />
      </main>
      <Footer />
    </>
  );
}
