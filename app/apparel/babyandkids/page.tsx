import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BabyAndKidsContent from "./BabyAndKidsContent";

export const metadata = buildMetadata({
  title: "Baby & Kids Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan baby and kids clothing manufacturer — t-shirts, rompers, overalls, bibs, swaddle muslin and hooded towels. GOTS, OEKO-TEX Class 1. Safe for newborns. Export worldwide.",
  canonical: "/apparel/babyandkids/",
  ogImage: "/images/og/baby-and-kids-og.webp",
  ogImageAlt: "Pakistan baby and kids clothing manufacturer — GOTS certified rompers, bibs and swaddle muslin for international brands",
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
});

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
              contentUrl: "https://mzglobaltrading.com/images/og/baby-and-kids-og.webp",
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
