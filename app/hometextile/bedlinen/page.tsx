import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BedLinenContent from "./BedLinenContent";

export const metadata = buildMetadata({
  title: "Bed Linen Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan bed linen manufacturer — bedsheets, fitted sheets, duvet covers, pillow covers, cushion covers, curtains and institutional bedding. Percale, sateen, microfiber. OEKO-TEX certified.",
  canonical: "/hometextile/bedlinen/",
  ogImage: "/images/og/bed-linen-og.webp",
  ogImageAlt: "Pakistan bed linen manufacturer — bedsheets, duvet covers and fitted sheets for hotels and retailers worldwide",
  keywords: [
    "bed linen manufacturer Pakistan",
    "bedsheet manufacturer Pakistan",
    "duvet cover manufacturer Pakistan",
    "fitted sheet manufacturer Pakistan export",
    "pillow cover manufacturer Pakistan",
    "hotel bedding manufacturer Pakistan",
    "percale bedding manufacturer Pakistan",
    "sateen bedding supplier Pakistan",
    "OEKO-TEX bed linen Pakistan",
  ],
});

export default function BedLinenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://mzglobaltrading.com/hometextile/bedlinen/",
            name: "Bed Linen Manufacturer Pakistan | MZ Global Trading",
            description:
              "Pakistan bed linen manufacturer supplying bedsheets, fitted sheets, duvet covers, pillow covers, cushion covers, curtains and institutional bedding. Percale, sateen, microfiber constructions. OEKO-TEX, GOTS, BSCI certified. FOB/CIF export.",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/bed-linen-og.webp",
              name: "Pakistan bed linen manufacturer — bedsheets, duvet covers and fitted sheets for hotels and retailers worldwide",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
                { "@type": "ListItem", position: 3, name: "Bed Linen", item: "https://mzglobaltrading.com/hometextile/bedlinen/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <BedLinenContent />
      </main>
      <Footer />
    </>
  );
}
