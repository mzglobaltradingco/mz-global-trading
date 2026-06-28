import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import KnittedGarmentsContent from "./KnittedGarmentsContent";

export const metadata = buildMetadata({
  title: "Knitted Garments Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan knitted garment manufacturer — T-shirts, polo shirts, henley shirts, sweatshirts, hoodies, joggers and tank tops. GOTS, OEKO-TEX certified. FOB/CIF export to USA, UK, EU.",
  canonical: "/apparel/knittedgarments/",
  ogImage: "/images/og/knitted-garments-og.webp",
  ogImageAlt: "Pakistan knitted garments manufacturer — knitwear OEM supplier for brands in USA, UK and Europe",
  keywords: [
    "knitted garments manufacturer Pakistan",
    "knitwear manufacturer Pakistan",
    "t-shirt manufacturer Pakistan",
    "polo shirt manufacturer Pakistan",
    "sweatshirt manufacturer Pakistan export",
    "hoodie manufacturer Pakistan",
    "OEM knitwear Pakistan",
    "jersey garment manufacturer Pakistan",
    "GOTS certified knitwear Pakistan",
  ],
});

export default function KnittedGarmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://www.mzglobaltrading.com/apparel/knittedgarments/",
            name: "Knitted Garments Manufacturer Pakistan | MZ Global Trading",
            description:
              "Pakistan knitwear manufacturer supplying T-shirts, polo shirts, henley shirts, sweatshirts, hoodies, joggers and tank tops to international brands and retailers. GOTS, OEKO-TEX, BSCI certified. FOB/CIF export.",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://www.mzglobaltrading.com/images/og/knitted-garments-og.webp",
              name: "Pakistan knitted garments manufacturer — knitwear OEM supplier for brands in USA, UK and Europe",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Apparel", item: "https://www.mzglobaltrading.com/apparel/" },
                { "@type": "ListItem", position: 3, name: "Knitted Garments", item: "https://www.mzglobaltrading.com/apparel/knittedgarments/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <KnittedGarmentsContent />
      </main>
      <Footer />
    </>
  );
}
