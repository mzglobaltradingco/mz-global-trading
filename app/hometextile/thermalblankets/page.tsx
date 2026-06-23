import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ThermalBlanketsContent from "./ThermalBlanketsContent";

export const metadata = buildMetadata({
  title: "Thermal Blankets Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan thermal blanket manufacturer — cotton cellular blankets for hospitals and polar fleece blankets for retail. OEKO-TEX, ISO 9001, BSCI certified. Export worldwide.",
  canonical: "/hometextile/thermalblankets/",
  ogImage: "/images/og/thermal-blankets-og.webp",
  ogImageAlt: "Pakistan thermal blanket manufacturer — cellular and fleece blankets for hospitals and retail buyers worldwide",
  keywords: [
    "thermal blankets manufacturer Pakistan",
    "cellular blanket supplier Pakistan",
    "fleece thermal blankets wholesale",
    "hospital blankets Pakistan",
    "institutional blankets manufacturer",
    "polar fleece blankets export Pakistan",
    "OEKO-TEX blankets Pakistan",
    "bulk thermal blankets supplier",
  ],
});

export default function ThermalBlanketsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://mzglobaltrading.com/hometextile/thermalblankets/",
            name: "Thermal Blankets | MZ Global Trading",
            description:
              "Cotton cellular blankets for clinical and institutional environments. Polar fleece thermal blankets for retail and promotional programmes. Pakistan-manufactured, OEKO-TEX certified.",
            image: "https://mzglobaltrading.com/images/og/thermal-blankets-og.webp",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/thermal-blankets-og.webp",
              name: "Pakistan thermal blanket manufacturer — cellular and fleece blankets worldwide",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
                { "@type": "ListItem", position: 3, name: "Thermal Blankets", item: "https://mzglobaltrading.com/hometextile/thermalblankets/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <ThermalBlanketsContent />
      </main>
      <Footer />
    </>
  );
}
