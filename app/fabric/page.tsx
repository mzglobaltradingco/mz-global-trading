import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import FabricContent from "./FabricContent";

export const metadata = buildMetadata({
  title: "Fabric Supplier Pakistan | MZ Global Trading",
  description: "Pakistan fabric supplier — apparel fabric and home textile fabric sourced from certified mills. Woven, knitted, sustainable and specialty constructions. FOB export worldwide.",
  canonical: "/fabric/",
  ogImage: "/images/og/fabric-category-og.webp",
  ogImageAlt: "Pakistan fabric supplier — apparel and home textile fabric for international buyers",
  keywords: ["fabric supplier Pakistan", "apparel fabric Pakistan", "home textile fabric Pakistan", "OEM fabric sourcing", "certified fabric manufacturer"],
});

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
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "contentUrl": "https://mzglobaltrading.com/images/og/fabric-category-og.webp",
              "name": "Pakistan fabric supplier — apparel and home textile fabric for international buyers",
            },
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
