import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import CushionCoversContent from "./CushionCoversContent";

export const metadata = buildMetadata({
  title: "Cushion Covers Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan cushion cover manufacturer for wholesale buyers in USA, UK and Europe. Cotton, linen, woven and printed. GOTS, OEKO-TEX certified. FOB/CIF.",
  canonical: "/hometextile/bedlinen/cushioncovers/",
  ogImage: "/images/og/cushion-covers-og.webp",
  ogImageAlt: "Pakistan cushion cover manufacturer — decorative pillow covers for wholesale buyers in USA, UK and Europe",
  keywords: [
    "cushion covers manufacturer Pakistan",
    "decorative pillow covers wholesale",
    "custom cushion covers export",
    "throw pillow covers manufacturer",
    "interior cushion covers supplier Pakistan",
    "cushion covers wholesale UK",
    "pakistan home textile export",
  ],
});

export default function CushionCoversPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <CushionCoversContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What fabric works best for indoor decorative cushion covers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Cotton plain weave for printable retail designs — it accepts reactive print with excellent colour fidelity. Linen or linen-blend for luxury natural lifestyle. Jacquard damask for premium interior or hotel lobbies where woven pattern carries the design. Velvet for seasonal statement pieces and Middle Eastern hospitality.",
                },
              },
              {
                "@type": "Question",
                name: "What size is most commonly ordered for cushion covers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "45×45 cm and 50×50 cm are the most universally ordered sizes for standard throw cushion inserts. 40×40 cm suits smaller accent cushions; 60×60 cm suits floor cushions and large sofa pieces. The 30×50 cm oblong is the standard lumbar size. Include all sizes in your RFQ for a consolidated quote.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order cushion covers with printed designs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. All-over reactive print and screen placement print are both available on cotton constructions. For photographic print quality, sublimation on polyester constructions delivers the most accurate reproduction. Supply your artwork file — we manage colour separation, strike-off approval and print matching before bulk production.",
                },
              },
              {
                "@type": "Question",
                name: "What closure should I specify for retail cushion covers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Concealed zip is the most commercial closure for mainstream retail — clean finish, washable, professional appearance. Button closure adds a design detail and suits artisan or country-style ranges. Envelope overlap suits basic value retail and hospitality bulk supply.",
                },
              },
              {
                "@type": "Question",
                name: "Are cushion covers available in OEKO-TEX certified materials?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. OEKO-TEX Standard 100 certification is available across cotton and linen constructions and is mandatory for EU and UK retail compliance. GOTS-certified organic cotton is available for natural lifestyle programmes. Specify your certification requirement in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What order quantities work for seasonal cushion cover programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Seasonal cushion cover programmes typically involve a structured size and colourway run. Include your target quantity per SKU in your RFQ — we match you with factories experienced in home furnishing seasonal programmes and advise on the most cost-efficient quantity and colourway structure.",
                },
              }
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Cushion Covers",
            description:
              "Custom decorative cushion covers manufactured in Pakistan. Cotton, linen, jacquard and velour constructions. Square and rectangular sizes. Zip, button and envelope closure. OEKO-TEX and GOTS certified.",
            image:
              "https://mzglobaltrading.com/images/hero/hero-cushion-covers.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "MZ Global Trading",
              },
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/hero/hero-cushion-covers.webp",
              name: "Pakistan cushion cover manufacturer — decorative pillow covers for wholesale buyers",
            },
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
                  name: "Bed Linen",
                  item: "https://mzglobaltrading.com/hometextile/bedlinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Cushion Covers",
                  item: "https://mzglobaltrading.com/hometextile/bedlinen/cushioncovers/",
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
