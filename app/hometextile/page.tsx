import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import HometextileContent from "./HometextileContent";

export const metadata: Metadata = {
  title: "Home Textiles Manufacturer Pakistan | MZ Global Trading",
  description: "Pakistan home textiles manufacturer — bath linen, bed linen, kitchen, table, thermal, hospital and industrial linen. OEKO-TEX, GOTS, BSCI. FOB export worldwide.",
  keywords: ["home textiles manufacturer Pakistan", "towels supplier Pakistan", "bed linen Pakistan export", "hospital linen manufacturer", "OEM home textiles"],
  alternates: {
    canonical: "/hometextile/",
    languages: {
      "en": "https://mzglobaltrading.com/hometextile/",
      "x-default": "https://mzglobaltrading.com/hometextile/",
    },
  },
  openGraph: {
    title: "Home Textiles Manufacturer Pakistan | MZ Global Trading",
    description: "Pakistan home textiles sourcing — bath linen, bed linen, kitchen, table, thermal, hospital and industrial linen. OEKO-TEX, GOTS. Export worldwide.",
    url: "https://mzglobaltrading.com/hometextile/",
    images: [{ url: "/images/og/home-textile-category-og.webp", width: 1200, height: 630, alt: "Pakistan home textiles manufacturer — towels, bed linen and home textile OEM for international buyers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Textiles Manufacturer Pakistan | MZ Global Trading",
    description: "Pakistan home textiles sourcing — bath linen, bed linen, kitchen, hospital and industrial linen. OEKO-TEX, GOTS. Export worldwide.",
  },
};

export default function HometextilePage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <HometextileContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "url": "https://mzglobaltrading.com/hometextile/",
            "name": "Home Textiles Manufacturer Pakistan | MZ Global Trading",
            "description": "Pakistan home textiles manufacturer — bath linen, bed linen, kitchen, table, thermal, hospital and industrial linen. OEKO-TEX, GOTS, BSCI certified.",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mzglobaltrading.com/" },
                { "@type": "ListItem", "position": 2, "name": "Home Textiles", "item": "https://mzglobaltrading.com/hometextile/" },
              ],
            },
          }),
        }}
      />
    </>
  );
}
