import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import HoodiesContent from "./HoodiesContent";

export const metadata = buildMetadata({
  title: "Sweatshirt & Hoodie Manufacturer Pakistan | OEM Fleece",
  description:
    "Source OEM sweatshirts and hoodies from Pakistan — French terry, loop-back fleece, brushed fleece, 300–420 GSM. GOTS and OEKO-TEX certified.",
  canonical: "/apparel/knittedgarments/sweatshirtshoodies/",
  ogImage: "/images/og/sweatshirts-hoodies-og.webp",
  ogImageAlt: "Pakistan sweatshirt and hoodie manufacturer — OEM French terry and fleece hoodies for sportswear and retail brands worldwide",
  keywords: [
    "sweatshirt manufacturer Pakistan",
    "hoodie manufacturer Pakistan",
    "OEM hoodie fleece manufacturer",
    "French terry hoodie wholesale",
    "brushed fleece sweatshirt Pakistan",
    "hoodie factory Pakistan USA UK",
    "custom sweatshirt OEM Pakistan",
    "Pakistan fleece garment exporter",
  ],
});

export default function SweatshirtsHoodiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sweatshirts & Hoodies — OEM Manufacturing Pakistan",
    description:
      "Pakistan OEM sweatshirt and hoodie manufacturer producing French terry, loop-back fleece, brushed fleece, polar fleece and bonded fleece mid-layer garments for sportswear, streetwear and corporate programmes in USA, UK and Europe.",
    image: "https://mzglobaltrading.com/images/og/sweatshirts-hoodies-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
      url: "https://mzglobaltrading.com/rfq/",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/og/sweatshirts-hoodies-og.webp",
      name: "Pakistan sweatshirt and hoodie manufacturer — OEM French terry and fleece hoodies for sportswear and retail brands worldwide",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Knitted Garments", item: "https://mzglobaltrading.com/apparel/knittedgarments/" },
        { "@type": "ListItem", position: 4, name: "Sweatshirts & Hoodies", item: "https://mzglobaltrading.com/apparel/knittedgarments/sweatshirtshoodies/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <HoodiesContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the difference between French terry and loop-back fleece?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "French terry has a smooth exterior face with an uncut looped interior — it delivers a refined appearance suitable for premium retail and fashion programmes. Loop-back fleece also has an uncut looped interior but is typically woven with a slightly different structure giving a firmer, more athletic hand-feel. French terry is the commercial default for fashion hoodies; loop-back is preferred for team sportswear and athletic programmes. Neither is raised or brushed — that is brushed fleece (see below).",
                },
              },
              {
                "@type": "Question",
                name: "What GSM do you recommend for a retail hoodie programme targeting USA and UK markets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For mainstream USA and UK retail hoodies, 340–360 GSM French terry is the industry standard. This weight delivers the hand-feel customers expect at mid-market price points, drapes cleanly and holds shape through repeated laundering. Heavier 380–420 GSM brushed fleece is better suited to premium positioning or cold-climate markets (US Northeast, Canada, Northern Europe). Lighter 300–320 GSM is suitable for transitional season or year-round programmes in warmer regions.",
                },
              },
              {
                "@type": "Question",
                name: "Can you produce matching sweatshirt and sweatpants co-ord sets from the same production run?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — co-ord set production from the same fabric lot is a standard programme. Fabric from the same dye lot ensures colour consistency between tops and bottoms. Co-ord sets are available as matched SKUs with individual polybag, gift box or combined set packaging. Sweatpants specifications are managed separately — your RFQ can request both items together.",
                },
              },
              {
                "@type": "Question",
                name: "Which decoration method works best on heavyweight brushed fleece hoodies?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Embroidery is the clear first choice for brushed fleece. The raised nap provides a firm base for stitch registration and the embroidery thread complements the texture beautifully. Screen printing requires soft-hand or discharge inks applied at lower squeegee pressure to avoid crushing the nap — additional print passes may be needed for coverage. Heat transfer vinyl is not recommended on brushed or raised fleece. For performance fleece, sublimation is only suitable on light-GSM polar fleece (100% polyester).",
                },
              },
              {
                "@type": "Question",
                name: "Do your fleece fabrics meet anti-pill requirements for European retail buyers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Anti-pill finish is standard specification on brushed fleece and polar fleece programmes targeting European retail. The treatment reduces surface fibre shedding and pilling under friction — compliance is tested to EN ISO 12945-2 (Martindale method) or equivalent. OEKO-TEX Standard 100 certification covers chemical compliance of the anti-pill treatment itself, which is required for EU and UK import.",
                },
              },
              {
                "@type": "Question",
                name: "What are indicative lead times from approved sample to shipment for a hoodie programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "⚠ All timelines are indicative and subject to construction complexity, order quantities, factory scheduling and seasonal demand. As a general guide: bulk production runs 45–70 days from confirmed PO and approved pre-production sample; sea freight from Karachi adds 20–30 days to European and US ports depending on routing. Total end-to-end from RFQ to destination port is typically 90–130 days. Plan lead times with your sourcing team before committing to retail sell-in dates.",
                },
              }
            ],
          }),  
        }}
      />
    </>
  );
}
