import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import WovenGarmentsContent from "./WovenGarmentsContent";

export const metadata = buildMetadata({
  title: "Woven Garments Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan woven garment manufacturer — denim jeans, formal shirts, trousers, cargo pants and shorts. Denim, twill, poplin, canvas constructions. GOTS, OEKO-TEX. FOB/CIF export.",
  canonical: "/apparel/wovengarments/",
  ogImage: "/images/og/woven-garments-og.webp",
  ogImageAlt: "Pakistan woven garments manufacturer — denim jeans, shirts and trousers OEM supplier for international brands",
  keywords: [
    "woven garments manufacturer Pakistan",
    "denim jeans manufacturer Pakistan",
    "formal shirts manufacturer Pakistan",
    "trousers manufacturer Pakistan export",
    "cargo pants manufacturer Pakistan",
    "woven apparel manufacturer Pakistan",
    "OEM woven garments Pakistan",
    "BSCI certified woven garments",
  ],
});

export default function WovenGarmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://www.mzglobaltrading.com/apparel/wovengarments/",
            name: "Woven Garments Manufacturer Pakistan | MZ Global Trading",
            description:
              "Pakistan woven garment manufacturer supplying denim jeans, formal & casual shirts, pants & trousers, cargo pants and shorts to international brands. GOTS, OEKO-TEX, BSCI certified. FOB/CIF export.",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://www.mzglobaltrading.com/images/og/woven-garments-og.webp",
              name: "Pakistan woven garments manufacturer — denim jeans, shirts and trousers OEM supplier for international brands",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Apparel", item: "https://www.mzglobaltrading.com/apparel/" },
                { "@type": "ListItem", position: 3, name: "Woven Garments", item: "https://www.mzglobaltrading.com/apparel/wovengarments/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <WovenGarmentsContent />
      </main>
      <Footer />
    </>
  );
}
