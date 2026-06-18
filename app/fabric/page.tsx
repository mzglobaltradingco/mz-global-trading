import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import FabricContent from "./FabricContent";

export const metadata: Metadata = {
  title: "Fabric Supplier Pakistan | MZ Global Trading",
  description: "Pakistan fabric supplier — apparel fabric and home textile fabric sourced from certified mills. Woven, knitted, sustainable and specialty constructions. FOB export worldwide.",
  keywords: ["fabric supplier Pakistan", "apparel fabric Pakistan", "home textile fabric Pakistan", "OEM fabric sourcing", "certified fabric manufacturer"],
  alternates: {
    canonical: "/fabric/",
    languages: {
      "en": "https://mzglobaltrading.com/fabric/",
      "x-default": "https://mzglobaltrading.com/fabric/",
    },
  },
  openGraph: {
    title: "Fabric Supplier Pakistan | MZ Global Trading",
    description: "Pakistan fabric sourcing — apparel and home textile fabric from certified mills. Woven, knitted, sustainable constructions. Export worldwide.",
    url: "https://mzglobaltrading.com/fabric/",
    images: [{ url: "/images/og/fabric-og.webp", width: 1200, height: 630, alt: "Pakistan fabric supplier — apparel and home textile fabric for international buyers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabric Supplier Pakistan | MZ Global Trading",
    description: "Pakistan fabric sourcing — apparel and home textile fabric from certified mills. Export worldwide.",
  },
};

export default function FabricPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <FabricContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "url": "https://mzglobaltrading.com/fabric/",
            "name": "Fabric Supplier Pakistan | MZ Global Trading",
            "description": "Pakistan fabric supplier — apparel fabric and home textile fabric sourced from certified mills. Woven, knitted, sustainable and specialty constructions.",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mzglobaltrading.com/" },
                { "@type": "ListItem", "position": 2, "name": "Fabric", "item": "https://mzglobaltrading.com/fabric/" },
              ],
            },
          }),
        }}
      />
    </>
  );
}
