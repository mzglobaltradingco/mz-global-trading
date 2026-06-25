import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import HometextileContent from "./HometextileContent";

export const metadata = buildMetadata({
  title: "Home Textiles Manufacturer Pakistan | MZ Global Trading",
  description: "Pakistan home textiles manufacturer — bath linen, bed linen, kitchen, table, thermal, hospital and industrial linen. OEKO-TEX, GOTS, BSCI. FOB export worldwide.",
  canonical: "/hometextile/",
  ogImage: "/images/og/home-textile-category-og.webp",
  ogImageAlt: "Pakistan home textiles manufacturer — towels, bed linen and home textile OEM for international buyers",
  keywords: ["home textiles manufacturer Pakistan", "towels supplier Pakistan", "bed linen Pakistan export", "hospital linen manufacturer", "OEM home textiles"],
});

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
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "contentUrl": "https://mzglobaltrading.com/images/og/home-textile-category-og.webp",
              "name": "Pakistan home textiles manufacturer — towels, bed linen and home textile OEM for international buyers",
            },
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
