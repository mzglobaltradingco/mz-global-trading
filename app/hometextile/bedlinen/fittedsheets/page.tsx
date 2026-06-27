import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import FittedSheetsContent from "./FittedSheetsContent";

export const metadata = buildMetadata({
  title: "Fitted Sheets Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan fitted sheet manufacturer for wholesale buyers in USA, UK and Europe. Percale, sateen, pocket depths to 26 inch. GOTS, OEKO-TEX certified. FOB/CIF.",
  canonical: "/hometextile/bedlinen/fittedsheets/",
  ogImage: "/images/og/fitted-sheets-og.webp",
  ogImageAlt: "Pakistan fitted sheet manufacturer — elasticated deep pocket sheets for hotel and retail buyers",
  keywords: [
    "fitted sheets manufacturer Pakistan",
    "elasticated bedsheets wholesale",
    "deep pocket fitted sheets supplier",
    "hotel fitted sheets Pakistan",
    "custom fitted sheets export",
    "percale fitted sheets manufacturer",
  ],
});

export default function FittedSheetsPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <FittedSheetsContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Fitted Sheets — Pakistan Bed Linen Export",
            description:
              "Wholesale fitted sheets manufactured in Pakistan. Percale, sateen and jersey knit constructions. Pocket depths 12–26 inches. All-around elastic. GOTS, OEKO-TEX, BSCI certified. FOB/CIF export.",
            image:
              "https://mzglobaltrading.com/images/hero/hero-fitted-sheets.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              priceValidUntil: "2027-12-31",
              url: "https://mzglobaltrading.com/rfq/",
              seller: {
                "@type": "Organization",
                name: "MZ Global Trading",
              },
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/hero/hero-fitted-sheets.webp",
              name: "Pakistan fitted sheet manufacturer — elasticated percale and sateen sheets wholesale export",
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
                  name: "Fitted Sheets",
                  item: "https://mzglobaltrading.com/hometextile/bedlinen/fittedsheets/",
                },
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What pocket depth should I specify for hotel fitted sheets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Hotels typically specify 15–18 inch pocket depth to accommodate a variety of mattress depths and thin toppers. Deep-pocket at 21 inches covers luxury pillow-top mattresses and premium memory foam. If your hotel client has a specific mattress specification, always confirm the exact mattress height before locking pocket depth — a 1-inch shortfall means sheets will not stay tucked.",
                },
              },
              {
                "@type": "Question",
                name: "What's the difference between all-around elastic and corner pockets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All-around elastic runs along the full perimeter of the fitted sheet — the international standard for retail and premium hotel. The elastic grips all four sides and corners, preventing sheet displacement during sleep or when making the bed. Corner pocket elastic (elastic only at the four corners) is simpler to manufacture but shifts under active use — it is not recommended for hotel programmes or consumers who move frequently in sleep.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order matching flat sheets and pillow covers with my fitted sheets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Coordinated bed sets — fitted sheet, flat sheet, and pillow covers — are our primary offering for retail and hotel programmes. Specify all components in a single RFQ. We source from the same certified factory to ensure consistent thread count, construction, colour match and finishing across the complete set. Coordinated sets also typically benefit from better factory scheduling.",
                },
              },
              {
                "@type": "Question",
                name: "Are GOTS-certified fitted sheets available from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. GOTS-certified organic cotton fitted sheets are available in percale and sateen constructions. For EU and UK buyers making organic product claims on packaging, GOTS certification on the factory and the fibre supply chain is mandatory — non-GOTS cotton cannot legally carry an organic claim in these markets. Specify GOTS as a hard requirement in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "How do I specify size standards for US and UK programmes simultaneously?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Include both size charts in your RFQ. US Queen (152×203 cm with 18-inch pocket) and UK King (150×200 cm) are dimensionally similar but require separate cutting patterns and elastic lengths. We recommend confirming actual mattress dimensions from your end customer before locking specs — nominal US and UK sizes can vary slightly between mattress manufacturers.",
                },
              },
              {
                "@type": "Question",
                name: "What thread count is standard for hospital fitted sheets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Hospital and healthcare fitted sheets are typically specified at 200–280 TC in a durable cotton-poly blend — prioritising wash durability over luxury hand feel. The key performance metric is wash-cycle tolerance (100+ cycles at 60–90°C minimum), not thread count. Oxford weave at 220–260 TC in 65/35 cotton-poly is the most common healthcare specification in the UK and EU.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
