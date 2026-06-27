import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import SweatpantsContent from "./SweatpantsContent";

export const metadata = buildMetadata({
  title: "Sweatpants Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source OEM sweatpants and joggers from Pakistan — French terry, brushed fleece, cotton-spandex. Co-ordinated set programmes. OEKO-TEX certified.",
  canonical: "/apparel/knittedgarments/sweatpantsjoggers/",
  ogImage: "/images/og/sweatpants-joggers-og.webp",
  ogImageAlt: "Pakistan sweatpants and jogger manufacturer — OEM French terry and fleece bottoms for activewear programmes worldwide",
  keywords: [
    "sweatpants manufacturer Pakistan",
    "jogger pants OEM Pakistan",
    "fleece bottoms wholesale Pakistan",
    "co-ord set manufacturer Pakistan",
    "French terry sweatpants manufacturer",
    "brushed fleece joggers OEM",
    "athletic bottoms supplier Pakistan",
    "activewear manufacturer Pakistan export",
  ],
});

export default function SweatpantsJoggersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Sweatpants & Joggers — Pakistan OEM Sourcing & Export",
            description:
              "Pakistan OEM sweatpants and jogger manufacturer producing French terry, loop back fleece, brushed fleece, cotton-spandex and polar fleece bottoms. Co-ord set capability. GOTS and OEKO-TEX certified mills for USA, UK, Europe and worldwide.",
            image:
              "https://mzglobaltrading.com/images/og/sweatpants-joggers-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/og/sweatpants-joggers-og.webp",
              name: "Pakistan sweatpants and jogger manufacturer — OEM French terry and fleece bottoms for activewear programmes worldwide",
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
                  name: "Apparel",
                  item: "https://mzglobaltrading.com/apparel/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Knitted Garments",
                  item: "https://mzglobaltrading.com/apparel/knittedgarments/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Sweatpants & Joggers",
                  item: "https://mzglobaltrading.com/apparel/knittedgarments/sweatpantsjoggers/",
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
                name: "Can you produce matching sweatpants to go with a sweatshirt or hoodie order (co-ord sets)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — co-ord set production is a core capability. We match top and bottom on construction, GSM, dye lot and colour standard so the set presents uniformly. For co-ord programmes, we specify matching rib GSM for waistband and cuffs and confirm colour approval on both pieces simultaneously. Top and bottom can be sampled together with a single lab dip approval stage.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between French terry and brushed fleece for sweatpants?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "French terry has a smooth face and looped interior — it produces a clean, flat silhouette and is the most versatile co-ord set construction. Brushed fleece has the interior loops brushed into a napped surface — the result is a softer, more luxurious hand feel that commands premium retail pricing. Brushed fleece requires soft-hand inks for screen printing; French terry accepts standard inks. For most co-ord programmes, French terry is the practical choice; brushed fleece is preferred when in-hand tactile quality is a primary purchase driver.",
                },
              },
              {
                "@type": "Question",
                name: "What waistband and drawstring specifications are available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We offer elastic-only waistbands, elastic plus drawstring, and wide logo-placement waistbands. Waistband rib weight (GSM) can be specified separately from the body construction — higher rib GSM provides more structure and holds branding better. Drawstring material options include cotton cord, polyester cord, flat woven tape and custom colour-matched cord. Drawstring exit holes can be eyelets, seam openings or fabric loops.",
                },
              },
              {
                "@type": "Question",
                name: "What decoration options work on sweatpants — leg print, waistband embroidery?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Screen print on the thigh or leg is the most common decoration — left thigh, right thigh or full-leg placement. Soft-hand inks are required for brushed fleece to preserve the nap. Embroidery on the waistband or back hip is popular for logo placement — French terry provides the best stitch base. Heat transfer suits sharp logo marks. Side stripe taping in a contrasting colour is available as a structural decoration — woven or knitted tape to custom width.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer cotton-spandex joggers for performance or athleisure programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Cotton-spandex (95/5 or 92/8) is available for performance and athleisure-positioned joggers. The 4-way stretch provides athletic recovery and reduces knee-bagging over time. Available in tapered and slim fits. Sublimation printing is possible on polyester-spandex variants. Moisture-wicking finish is an option. Typically 240–320 GSM — lighter than fleece constructions but with the stretch performance athleisure programmes require.",
                },
              },
              {
                "@type": "Question",
                name: "What are typical indicative lead times for a co-ord set programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "⚠️ All timelines below are indicative only and vary with construction, quantity, factory scheduling and sample revision cycles. RFQ to factory quotation: 3–5 working days. Pre-production sampling (top + bottom together): 15–20 working days from spec lock. Bulk production: 45–70 working days from confirmed purchase order and sample approval. Ocean freight: 20–30 days from Karachi to major destination ports. Total indicative schedule from RFQ to goods at destination: approximately 90–120 working days.",
                },
              }
            ],
          }),  
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <SweatpantsContent />
      </main>
      <Footer />
    </>
  );
}
