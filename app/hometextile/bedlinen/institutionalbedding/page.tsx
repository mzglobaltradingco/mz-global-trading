import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import InstitutionalBeddingContent from "./InstitutionalBeddingContent";

export const metadata = buildMetadata({
  title: "Institutional Bedding Supplier Pakistan | MZ Global Trading",
  description:
    "Pakistan institutional bedding manufacturer for hotels, hospitals and airlines in USA, UK and Europe. Rated 200+ wash cycles. FOB/CIF export.",
  canonical: "/hometextile/bedlinen/institutionalbedding/",
  ogImage: "/images/og/institutional-bedding-og.webp",
  ogImageAlt: "Pakistan institutional bedding manufacturer — commercial-grade bedsheets and bed linen for hotels and hospitals",
  keywords: [
    "institutional bedding manufacturer Pakistan",
    "hotel bedding wholesale Pakistan",
    "hospital bedding supplier",
    "commercial bedding export Pakistan",
    "bulk bedding supplier USA UK",
    "contract bedding manufacturer Pakistan",
    "institutional linen Pakistan",
    "hotel bedsheets bulk order",
    "commercial grade bed linen supplier",
  ],
});

export default function InstitutionalBeddingPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <InstitutionalBeddingContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Institutional Bedding",
            description:
              "Commercial-grade institutional bedding manufactured in Pakistan's certified mills. Engineered for 100–200 industrial wash cycles at 60–90°C. Suitable for hotels, hospitals, airlines and student accommodation worldwide.",
            image:
              "https://www.mzglobaltrading.com/images/og/institutional-bedding-og.webp",
            brand: {
              "@type": "Brand",
              name: "MZ Global Trading",
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://www.mzglobaltrading.com/images/og/institutional-bedding-og.webp",
              name: "Pakistan institutional bedding manufacturer — commercial-grade bed linen for hotels, hospitals and airlines",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Home Textiles",
                  item: "https://www.mzglobaltrading.com/hometextile/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Bed Linen",
                  item: "https://www.mzglobaltrading.com/hometextile/bedlinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Institutional Bedding",
                  item: "https://www.mzglobaltrading.com/hometextile/bedlinen/institutionalbedding/",
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
                name: "What thread count specification is standard for hotel bedding?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The commercial hotel standard sits at 200–260 TC in 65/35 cotton-poly percale or oxford weave. This range balances wash durability (100–200 commercial cycles at 70°C), acceptable hand feel and competitive pricing. Premium hotel groups may specify 280–300 TC for superior-category rooms. Budget hotels and student accommodation typically specify 200–220 TC.",
                },
              },
              {
                "@type": "Question",
                name: "Can institutional bedding be produced in custom colourways?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. White is the default institutional specification for hospitals and airlines, but hotels and student accommodation programmes frequently specify light pastels, branded colours or colour-coded systems. PMS-matched reactive dyeing is standard across all constructions. Lab dip approval is included before bulk production.",
                },
              },
              {
                "@type": "Question",
                name: "What wash cycle rating should I specify for hospital bedding?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Hospital linen in the UK NHS standard requires bedding to withstand 100–200 cycles at 60–90°C without significant dimensional change or loss of colour fastness. Cotton-poly blends (65/35) outperform 100% cotton at sustained high-temperature wash cycles. For intensive healthcare use, we recommend specifying minimum 150 cycles at 70°C as part of the tender requirement.",
                },
              },
              {
                "@type": "Question",
                name: "Can you supply matching complete bed sets (sheets + pillow covers + duvet covers)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — this is our primary offering for hotel programmes. Coordinate sets sourced from the same factory ensure consistent thread count, colour match and construction across the complete set. Request all components in a single RFQ — single-source supply simplifies procurement and ensures set consistency from delivery to delivery.",
                },
              },
              {
                "@type": "Question",
                name: "What documentation is provided for tender compliance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Each shipment comes with: commercial invoice, packing list, certificate of origin (Form E or GSP as required), test reports (wash fastness, dimensional stability, pilling resistance), factory certification copies (ISO 9001, OEKO-TEX etc.) and pre-shipment inspection report. Specific documentation formats for government tender compliance can be confirmed before order.",
                },
              },
              {
                "@type": "Question",
                name: "Is there a difference between institutional and retail bedding from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The core difference is engineering priority: institutional bedding is optimised for wash-cycle durability, dimensional stability and procurement compliance. Retail bedding prioritises hand feel, visual presentation and packaging. Institutional grades use heavier needle-gauge stitching, wider hems, reinforced seams and poly-cotton blends rated for commercial laundry. Retail products use finer finishing and premium packaging inappropriate for laundry-scale operations.",
                },
              }
            ],
          }),  
        }}
      />
    </>
  );
}
