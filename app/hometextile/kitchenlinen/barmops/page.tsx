import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BarMopsContent from "./BarMopsContent";

export const metadata = buildMetadata({
  title: "Bar Mops Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan bar mops manufacturer: heavy terry and huck weave. 400–600 GSM commercial grade. OEKO-TEX, BSCI. Bulk export to USA, UK, Canada, Middle East, Australia.",
  canonical: "/hometextile/kitchenlinen/barmops/",
  ogImage: "/images/og/bar-mops-og.webp",
  ogImageAlt: "Pakistan bar mops manufacturer — heavy terry and huck weave commercial bar mops for restaurant and foodservice buyers in USA, UK and Canada",
  keywords: [
    "bar mops manufacturer Pakistan",
    "bar mops wholesale Pakistan",
    "commercial kitchen cloths supplier Pakistan",
    "heavy terry bar mops Pakistan",
    "restaurant bar mops supplier",
    "foodservice cloths manufacturer Pakistan",
    "bulk bar mops export Pakistan",
    "huck weave bar mops supplier",
    "institutional kitchen cloths Pakistan",
  ],
});

export default function BarMopsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Bar Mops — Commercial Grade Pakistan Manufacturer",
            description:
              "Commercial-grade bar mops sourced from Pakistan's certified textile mills. Heavy terry loop and huck weave constructions. 400–600 GSM. Anti-bacterial treatment standard. OEKO-TEX, BSCI, ISO 9001. Bulk export to USA, UK, Canada, Middle East and worldwide.",
            image:
              "https://mzglobaltrading.com/images/og/bar-mops-og.webp",
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
                "https://mzglobaltrading.com/images/og/bar-mops-og.webp",
              name: "Pakistan bar mops manufacturer — commercial-grade heavy terry bar mops for restaurant and foodservice buyers",
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
                  name: "Kitchen Linen",
                  item: "https://mzglobaltrading.com/hometextile/kitchenlinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Bar Mops",
                  item: "https://mzglobaltrading.com/hometextile/kitchenlinen/barmops/",
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
                name: "What is the standard GSM for commercial bar mops?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The standard commercial specification is 500 GSM — this is the weight at which heavy terry bar mops deliver the combination of absorbency, durability and spill-control performance required by restaurant and commercial kitchen buyers. Bar mops at 400–450 GSM are suitable for lighter-duty applications like front-of-house service stations and bar counters. At 550–600 GSM, they are the heavy-duty specification for high-volume commercial kitchens and institutional laundry programmes where multiple daily wash cycles are standard.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between a bar mop and a kitchen towel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bar mops are a heavy commercial product — typically 400–600 GSM, square-cut at 35×60 cm or 35×65 cm, made from heavy terry loop or huck weave cotton. They are designed exclusively for professional foodservice use: spill control, surface wiping, equipment cleaning and station prep in commercial kitchens, bars and restaurants. Kitchen towels are a consumer retail product — typically 150–250 GSM, more decorative, and sold through grocery and kitchenware channels. Bar mops are sold by the dozen or case (144 pcs) to commercial buyers, not as individual retail items.",
                },
              },
              {
                "@type": "Question",
                name: "What ordering units are standard for bar mops?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bar mops are sold in dozens (12 pieces) or cases (144 pieces = 12 dozen). Dozen packs are the standard ordering unit for commercial buyers purchasing through foodservice distributors. Cases are used for bulk direct-from-factory purchasing by large restaurant groups, institutional buyers and wholesale distributors. Pricing is quoted per piece, per dozen, or per case depending on buyer preference. All configurations are available — include your preferred ordering unit in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "Are white bar mops or coloured border bar mops more common commercially?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Plain white is the dominant specification for commercial foodservice and institutional buyers in the USA — white bar mops are standard across the restaurant, bar and hotel industry. Coloured border bar mops (typically a single colour stripe running along the short edge) are used for product differentiation and zoning — different border colours to designate towels for different areas of a kitchen (food prep vs cleaning vs equipment). Coloured borders are more common in UK and European markets.",
                },
              },
              {
                "@type": "Question",
                name: "What certifications are required for bar mops in the USA foodservice market?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For USA foodservice and institutional buyers, the primary certification requirements are OEKO-TEX Standard 100 (chemical safety compliance, no harmful substances) and ISO 9001 (consistent production quality). BSCI or Sedex audit compliance is increasingly required by larger restaurant chains and institutional buyers with formal supplier qualification programmes. For buyers using GOTS-certified organic cotton specifications — a growing requirement in premium foodservice programmes — GOTS-certified bar mop supply is available through our organic cotton mill partnerships.",
                },
              },
              {
                "@type": "Question",
                name: "What industrial laundry temperatures can Pakistan bar mops withstand?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our heavy terry and huck weave bar mops are produced to withstand repeated industrial laundering at 60°C standard and 90°C with appropriate detergent formulations. This covers the vast majority of commercial kitchen and institutional laundry programmes. Colour fastness at 90°C is confirmed with coloured border bar mops — ISO 105-C06 wash test at 60°C minimum. Chlorine bleach resistance is available as a specified finishing treatment for institutional programmes requiring periodic sanitising wash cycles.",
                },
              },
              {
                "@type": "Question",
                name: "Can bar mops be supplied with anti-bacterial treatment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Anti-bacterial treatment is standard on our commercial bar mop supply — applied as a durable finish that maintains effectiveness through multiple wash cycles. The treatment is compliant with OEKO-TEX Standard 100 restrictions — no harmful biocides. For programmes where anti-bacterial claims need to be substantiated to EU or FDA standards, we can arrange independent testing documentation prior to shipment.",
                },
              },
              {
                "@type": "Question",
                name: "What is the typical lead time and minimum programme size for bar mops?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bar mops are ordered in larger quantities than retail kitchen towels due to the commercial purchasing model. Bulk production lead times are indicative at 25–40 days from confirmed purchase order. Sea freight from Karachi adds 18–25 days to USA/Canada and 20–26 days to UK/EU ports. Programme size requirements vary by construction and colourway — plain white bar mops in standard specifications support smaller minimum quantities, while custom coloured border programmes require larger order sizes. Include your target quantity in the RFQ for a programme-specific assessment.",
                },
              },
            ],
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <BarMopsContent />
      </main>
      <Footer />
    </>
  );
}
