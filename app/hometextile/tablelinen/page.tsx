import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TableLinenContent from "./TableLinenContent";

export const metadata = buildMetadata({
  title: "Table Linen Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan table linen manufacturer for hotels, restaurants and events. Cotton damask, jacquard, satin weave table covers. Custom dimensions. OEKO-TEX, BSCI certified.",
  canonical: "/hometextile/tablelinen/",
  ogImage: "/images/og/table-linen-og.webp",
  ogImageAlt: "Pakistan table linen manufacturer — hotel and banquet table covers for hospitality buyers worldwide",
  keywords: [
    "table linen manufacturer Pakistan",
    "table covers wholesale Pakistan",
    "hotel table linen supplier",
    "damask tablecloth manufacturer Pakistan",
    "restaurant linen supplier Pakistan",
    "table linen export Pakistan",
    "banquet linen manufacturer",
    "OEKO-TEX table linen Pakistan",
  ],
});

export default function TableLinenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://mzglobaltrading.com/hometextile/tablelinen/",
            name: "Table Linen Manufacturer Pakistan | MZ Global Trading",
            description:
              "Pakistan-manufactured table linen for hotels, restaurants and event companies. Cotton damask, jacquard and satin weave constructions. Custom dimensions. OEKO-TEX and BSCI certified.",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Home Textiles",
                  item: "https://mzglobaltrading.com/hometextile/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Table Linen",
                  item: "https://mzglobaltrading.com/hometextile/tablelinen/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <TableLinenContent />
      </main>
      <Footer />
    </>
  );
}
