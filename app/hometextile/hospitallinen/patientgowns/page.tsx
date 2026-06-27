import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PatientGownsContent from "./PatientGownsContent";

export const metadata = buildMetadata({
  title: "Patient Gowns Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan patient gown manufacturer for hospitals and aged care. Cotton and poly-cotton constructions. Anti-bacterial, autoclave safe. ISO 9001, BSCI certified export.",
  canonical: "/hometextile/hospitallinen/patientgowns/",
  ogImage: "/images/og/patient-gowns-og.webp",
  ogImageAlt: "Pakistan patient gown manufacturer — cotton and poly-cotton hospital patient gowns for healthcare buyers worldwide",
  keywords: [
    "patient gowns manufacturer Pakistan",
    "hospital gown supplier Pakistan",
    "patient gown wholesale Pakistan",
    "cotton patient gown manufacturer",
    "hospital gown export Pakistan",
    "aged care gown supplier",
    "pediatric hospital gown manufacturer",
    "ISO 9001 patient gown Pakistan",
    "institutional patient gown supply",
  ],
});

export default function PatientGownsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Patient Gowns — Pakistan Healthcare Textile Export",
            description:
              "Patient gowns manufactured in Pakistan's ISO-certified healthcare textile facilities. 100% cotton and TC poly-cotton plain weave, jersey knit wrap-style. Anti-bacterial, autoclave safe. Adult and pediatric sizes. ISO 9001, BSCI, Sedex certified. FOB / CIF export.",
            image:
              "https://mzglobaltrading.com/images/og/patient-gowns-og.webp",
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
                "https://mzglobaltrading.com/images/og/patient-gowns-og.webp",
              name: "Pakistan patient gown manufacturer — cotton hospital patient gowns for healthcare buyers worldwide",
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
                  name: "Hospital Linen",
                  item: "https://mzglobaltrading.com/hometextile/hospitallinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Patient Gowns",
                  item: "https://mzglobaltrading.com/hometextile/hospitallinen/patientgowns/",
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
                name: "What fabric construction is standard for patient gowns?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Plain weave 100% cotton at 120–150 GSM is the primary construction for patient gowns — prioritising breathability, softness against skin and autoclave sterilisation compatibility. Cotton also provides good absorbency, which matters for patient comfort during extended wear. TC 65/35 poly-cotton plain weave at similar GSM is specified where dimensional stability and reduced ironing time after laundering are priorities — common in high-turnover NHS and institutional environments. Jersey knit construction in wrap-style gown formats is increasingly used in aged-care and rehabilitation settings where patient dignity and ease of dressing are primary considerations.",
                },
              },
              {
                "@type": "Question",
                name: "Are pediatric patient gowns available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Pediatric gowns are available in sizes XS/S (for children aged approximately 2–6) and S/M (aged approximately 6–12). Pediatric programmes often specify printed fabric patterns — cartoon characters, geometric or nature-themed prints — to reduce anxiety in young patients. Printed designs use reactive or pigment printing on the fabric before cutting, maintaining the OEKO-TEX certified chemical standard throughout. Construction and finishing specifications are identical to adult gowns — the key difference is scale and optional printed surface pattern.",
                },
              },
              {
                "@type": "Question",
                name: "What finishing treatments are applied to patient gowns?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard finishing for patient gowns includes anti-bacterial treatment (inhibits surface bacterial growth — relevant in infection-controlled ward environments) and pre-washing for shrinkage stabilisation before delivery. Fluid repellent finish is available for isolation gown applications where splash protection is required. Autoclave-safe compatibility is maintained across all finishing chemistry — we confirm finish durability through sterilisation cycle testing before bulk production. All finishing chemicals are applied using OEKO-TEX certified inputs only.",
                },
              },
              {
                "@type": "Question",
                name: "What sizes do you supply for adult patient gowns?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Adult patient gowns are supplied in S/M (standard), L/XL (large) and XXL/3XL (bariatric). One-size formats are also available for programmes seeking simplified inventory management. For aged-care and rehabilitation facilities with specific patient mobility requirements, wrap-style jersey knit gowns can be produced to custom lengths and opening configurations. Include your size distribution in the RFQ — we accommodate mixed-size orders within a single purchase order.",
                },
              },
              {
                "@type": "Question",
                name: "Are patient gowns from Pakistan autoclave sterilisation compatible?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Cotton and TC poly-cotton plain weave patient gowns are autoclave compatible at standard sterilisation temperatures (121°C at 15 PSI or 134°C at 30 PSI). Fabric shrinkage is controlled through pre-washing and compacted finish before delivery — gowns are delivered in their post-shrink dimensions. All trims including ties, snap fasteners and bias binding are specified to be autoclave safe. We confirm autoclave compatibility through pre-production testing on all new programmes.",
                },
              },
              {
                "@type": "Question",
                name: "What certifications apply to patient gown supply?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ISO 9001 Quality Management System covers production process quality across our patient gown supply network. BSCI and Sedex audit compliance addresses ethical production and labour standards — standard requirements for NHS supply chain, EU hospital group procurement and Australian hospital purchasing. SA8000 is available for buyers with stringent social compliance requirements. OEKO-TEX Standard 100 certifies the absence of restricted substances in the finished product — important for gowns worn directly against patient skin. Documentation for all certifications is provided with shipment.",
                },
              },
              {
                "@type": "Question",
                name: "How are patient gowns packed for hospital supply?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bulk hospital supply: individual polybag per gown, packed in cartons by size. Standard carton quantity is 12 or 24 units per size. For aged-care or outpatient facilities requiring pack-and-distribute formats, individual polybag packing with sticker labelling by size is supplied. For programmes requiring sterile individual packing for isolation or procedural use, gowns can be individually wrapped in sterile sealed packaging. Carton marking includes item description, construction, size, quantity and country of origin.",
                },
              },
              {
                "@type": "Question",
                name: "What is the lead time for patient gown orders?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lead times are indicative and subject to order volume and factory scheduling. As a general guide: samples take 10–15 days from specification confirmation; bulk production takes 30–45 days from purchase order for plain gowns, 40–55 days for printed pediatric programmes (additional printing setup time). Sea freight adds 20–35 days to destination. For NHS and government health tender programmes, we recommend a minimum 75–90 days from RFQ to delivery at destination to accommodate sampling, approval and production comfortably.",
                },
              },
            ],
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <PatientGownsContent />
      </main>
      <Footer />
    </>
  );
}
