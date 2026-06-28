import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import IndustrialLinenContent from "./IndustrialLinenContent";

export const metadata = buildMetadata({
  title: "Industrial Linen Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan industrial linen manufacturer — heavy-duty shop towels for automotive workshops and terry fender covers for auto dealerships. ISO 9001, BSCI certified. Export to USA, UK, EU.",
  canonical: "/hometextile/industriallinen/",
  ogImage: "/images/og/industrial-linen-og.webp",
  ogImageAlt: "Pakistan industrial linen manufacturer — shop towels and automotive fender covers for workshops worldwide",
  keywords: [
    "industrial linen manufacturer Pakistan",
    "shop towels manufacturer Pakistan",
    "fender covers manufacturer Pakistan",
    "automotive shop rags Pakistan",
    "heavy duty industrial towels Pakistan",
    "bulk shop towels export",
    "automotive textile manufacturer Pakistan",
  ],
});

export default function IndustrialLinenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://www.mzglobaltrading.com/hometextile/industriallinen/",
            name: "Industrial Linen | MZ Global Trading",
            description:
              "Heavy-duty industrial textile products for automotive and commercial use — shop towels and automotive fender covers manufactured in Pakistan's certified mills.",
            image: "https://www.mzglobaltrading.com/images/og/industrial-linen-og.webp",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://www.mzglobaltrading.com/images/og/industrial-linen-og.webp",
              name: "Pakistan industrial linen manufacturer — shop towels and fender covers worldwide",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://www.mzglobaltrading.com/hometextile/" },
                { "@type": "ListItem", position: 3, name: "Industrial Linen", item: "https://www.mzglobaltrading.com/hometextile/industriallinen/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <IndustrialLinenContent />
      </main>
      <Footer />
    </>
  );
}
