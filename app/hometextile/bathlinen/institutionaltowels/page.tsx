import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import InstitutionalTowelsContent from "./InstitutionalTowelsContent";

export const metadata = buildMetadata({
  title: "Institutional Towel Supplier Pakistan | MZ Global Trading",
  description:
    "Pakistan institutional towel manufacturer — 400–550 GSM plain white and dobby border terry for hotels, hospitals and laundry services. Case packs of 120.",
  canonical: "/hometextile/bathlinen/institutionaltowels/",
  ogImage: "/images/og/institutional-towels-og.webp",
  ogImageAlt: "Pakistan institutional towel manufacturer — bulk hotel and healthcare terry supply, 400–550 GSM, case packs of 120",
  keywords: [
    "institutional towel manufacturer Pakistan",
    "bulk hotel towels Pakistan",
    "hotel towel supplier",
    "healthcare towel manufacturer",
    "plain white terry towels wholesale",
    "dobby border institutional towels",
    "terry towel case pack supplier",
    "hospital towels Pakistan",
    "commercial laundry towels supplier",
    "OEM institutional terry",
  ],
});

export default function InstitutionalTowelsPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <InstitutionalTowelsContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Institutional Towels",
            description:
              "Pakistan-manufactured institutional terry towels — 400–550 GSM plain white and dobby border constructions for hotel, healthcare and commercial laundry procurement. Available in face, hand and bath sizes. Case packs of 120 pieces. OEKO-TEX Standard 100 and GOTS certified.",
            image:
              "https://mzglobaltrading.com/images/og/institutional-towels-og.webp",
            brand: {
              "@type": "Brand",
              name: "MZ Global Trading",
            },
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
              contentUrl: "https://mzglobaltrading.com/images/og/institutional-towels-og.webp",
              name: "Pakistan institutional towel manufacturer — bulk hotel and healthcare terry supply",
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
                  name: "Bath Linen",
                  item: "https://mzglobaltrading.com/hometextile/bathlinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Institutional Towels",
                  item: "https://mzglobaltrading.com/hometextile/bathlinen/institutionaltowels/",
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
                name: "What GSM is recommended for institutional towels laundered industrially 200+ times?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For heavy industrial laundry cycles at 85°C+, 420–480 GSM is the preferred institutional specification. This weight provides the balance of absorbency, dimensional stability and cost-per-launder efficiency most demanded by hotel and healthcare procurement. Lower GSM (400–420) is cost-effective for high-turnover operations where replacement frequency is managed by budget. Premium properties at 480–550 GSM carry higher individual cost but reduce guest dissatisfaction from towel quality deterioration.",
                },
              },
              {
                "@type": "Question",
                name: "What is the practical difference between plain white terry and dobby stripe border for hotel or hospital use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Plain white terry is the universal institutional choice — zero department-sorting confusion, compatible with all laundry chemistry including bleach, and lowest procurement cost. Dobby stripe border terry adds a structural woven border in a specified colour, which is the industry-standard method for department identification at scale: room linen vs spa vs pool towels. Large hotel operations and linen rental companies use border colour coding to eliminate mis-sorting in industrial laundry facilities handling thousands of pieces per cycle.",
                },
              },
              {
                "@type": "Question",
                name: "What pack configurations are available and what is the standard institutional case format?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard institutional case pack is 120 pieces per carton — the industry-standard unit for hotel and healthcare procurement and container-load optimisation. Banded dozens (12 pcs) are also available for smaller operations or stock replenishment. Pallet quantities (1,200–2,400 pcs) are provided for large hotel groups and laundry services buying by the full container. Individual piece packing is not standard for institutional orders — carton-only configurations maintain the low per-unit cost that procurement managers require.",
                },
              },
              {
                "@type": "Question",
                name: "Can institutional towels be produced with specific department colour coding for our operation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Dobby border terry is produced with reactive-dyed woven borders in standard institutional colours: navy, green, red, burgundy and grey. Border colours are held to ISO 105 X12 wash-fastness, meaning they maintain identifiability across the full institutional laundry life. Colour selection is confirmed at sample stage before bulk production. Custom colour matching to a specific Pantone reference requires a minimum programme size and longer lead time — include your requirement in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "Do you supply to procurement agents and linen rental companies, not just hotels directly?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. A significant portion of institutional terry supply goes through procurement agents, linen rental companies and hospitality distributors rather than directly to the end property. If you are sourcing on behalf of a hotel group, managing a linen rental fleet, or distributing to multiple hospitality end clients, the programme structure and pricing approach is the same. Include your procurement role in the RFQ so we can structure the quotation appropriately — particularly around volume aggregation across multiple delivery destinations.",
                },
              },
              {
                "@type": "Question",
                name: "What are typical indicative lead times for a first bulk institutional order?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "⚠ All lead times are indicative and subject to mill scheduling, fabric availability and inspection capacity at the time of order. Typical ranges: RFQ to quotation 3–5 working days. Pre-production sample 10–15 days from specification lock. Bulk production 20–35 days from confirmed purchase order and approved sample. Pre-shipment inspection 2–4 days. Sea freight 18–28 days from Karachi to European or US ports. First-time programmes include a sample approval stage before bulk production commencement.",
                },
              }
            ],
          }),
        }}
      />
    </>
  );
}
