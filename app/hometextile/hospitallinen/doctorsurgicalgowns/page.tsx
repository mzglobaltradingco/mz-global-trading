import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import DoctorSurgicalGownsContent from "./DoctorSurgicalGownsContent";

export const metadata = buildMetadata({
  title: "Surgical Gowns Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan surgical gown manufacturer — TC poly-cotton and 100% cotton reusable surgical gowns. Anti-bacterial, fluid repellent. ISO 13485, BSCI certified export.",
  canonical: "/hometextile/hospitallinen/doctorsurgicalgowns/",
  ogImage: "/images/og/doctor-surgical-gowns-og.webp",
  ogImageAlt: "Pakistan surgical gown manufacturer — reusable TC poly-cotton and cotton surgical gowns for hospitals and medical distributors worldwide",
  keywords: [
    "surgical gowns manufacturer Pakistan",
    "doctor gowns supplier Pakistan",
    "reusable surgical gowns Pakistan",
    "medical gowns wholesale Pakistan",
    "TC poly-cotton surgical gown",
    "ISO 13485 surgical gown Pakistan",
    "hospital gown manufacturer Pakistan",
    "bulk surgical gowns export",
    "EN 13795 surgical gown supplier",
  ],
});

export default function DoctorSurgicalGownsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Doctor Surgical Gowns — Pakistan Medical Textile Export",
            description:
              "Reusable surgical gowns manufactured in Pakistan's ISO-certified medical textile facilities. TC 65/35 poly-cotton and 100% cotton plain weave. Anti-bacterial, fluid repellent, autoclave safe. ISO 13485, BSCI, EN 13795 compliant. FOB / CIF export.",
            image:
              "https://mzglobaltrading.com/images/og/doctor-surgical-gowns-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/og/doctor-surgical-gowns-og.webp",
              name: "Pakistan surgical gown manufacturer — reusable TC poly-cotton surgical gowns for hospitals worldwide",
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
                  name: "Doctor Surgical Gowns",
                  item: "https://mzglobaltrading.com/hometextile/hospitallinen/doctorsurgicalgowns/",
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
                name: "What fabric constructions are used for reusable surgical gowns?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The primary construction for reusable surgical gowns is plain weave TC 65/35 poly-cotton at 140–160 GSM. The polyester content provides dimensional stability through repeated industrial laundering and autoclaving, while the cotton component ensures breathability and comfort for surgical staff. 100% cotton plain weave is specified where synthetic-free requirements apply — typically in markets with specific procurement standards. Reinforced critical zones (front panel, sleeve) use laminated or higher-GSM barrier fabric for fluid resistance in high-splash procedures. Non-woven polypropylene disposable gowns are also available for single-use programmes.",
                },
              },
              {
                "@type": "Question",
                name: "What certifications are required for surgical gown procurement?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For hospital and surgical centre procurement in EU markets, EN 13795 (Surgical Drapes, Gowns and Clean Air Suits) is the applicable standard — covering liquid barrier performance, microbial penetration resistance and tensile strength under wet conditions. ISO 13485 (Medical Devices Quality Management) is increasingly required by procurement agencies and health ministries as a process quality standard. ISO 9001 covers general quality management. For ethical supply chain compliance, BSCI, Sedex and SA8000 are the standard audit frameworks. We can provide full documentation including factory audit reports, CE marking documentation and product test reports.",
                },
              },
              {
                "@type": "Question",
                name: "Can logos be added to surgical gowns?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Embroidered logos are the standard decoration for institutional surgical gowns — typically placed on the left chest pocket or back yoke. Embroidery provides permanent identification that survives autoclave sterilisation cycles without degradation. Heat transfer labels are also available for hospitals requiring staff name or department identification. For government ministry procurement where neutral presentation is standard, plain ungarnished gowns are supplied without any applied decoration.",
                },
              },
              {
                "@type": "Question",
                name: "What sizes are available for surgical gowns?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We supply surgical gowns from XS through 3XL in reusable constructions, with custom sizing available for programmes requiring specific measurements. Disposable non-woven gowns are typically supplied in one-size or L/XL formats. For institutional procurement, size ratios are specified in the purchase order — a common distribution for hospital bulk orders is XS: 5%, S: 15%, M: 35%, L: 30%, XL: 10%, XXL+: 5%, though your programme requirements may differ. Include your required size breakdown in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What finishing treatments are applied to surgical gowns?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard finishing treatments for surgical gowns include: anti-bacterial finish (inhibits bacterial growth on fabric surface — relevant for reusable gowns in surgical environments); fluid/blood repellent finish (DWR-based barrier reducing liquid penetration on non-critical zones); anti-static finish (prevents static charge buildup in operating theatre environments with flammable gases). All finishes are applied using OEKO-TEX certified chemicals. For autoclave-compatible gowns, finish durability across repeated high-temperature sterilisation cycles is confirmed by test before bulk production.",
                },
              },
              {
                "@type": "Question",
                name: "How are surgical gowns packed for institutional supply?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bulk institutional supply: gowns are individually folded in sealed polybags and packed in cartons of 12 or 24 units by size. For sterile single-use disposable gowns: individually wrapped in sterile packaging with peel-open seal. For government ministry or hospital procurement requiring specific packing configurations, we accommodate custom pack quantities and labelling requirements. Carton marking includes item description, construction specification, size, quantity and country of origin as standard.",
                },
              },
              {
                "@type": "Question",
                name: "What is the indicative lead time for surgical gown orders?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lead times are indicative and subject to factory scheduling and order volume. As a general guide: sample production takes 12–18 days from specification and fabric approval; bulk production typically takes 35–55 days from purchase order placement. For orders requiring EN 13795 testing documentation, allow 10–15 additional days for third-party laboratory testing before shipment. Sea freight adds 20–35 days to destination. Government health ministry and institutional procurement programmes should allow a minimum of 90–120 days from RFQ to delivery.",
                },
              },
              {
                "@type": "Question",
                name: "Are surgical gowns from Pakistan accepted in EU and US hospital procurement?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pakistan's medical textile manufacturing base has supplied EU and US hospital procurement programmes for over two decades. For EU procurement, EN 13795 test reports and ISO 13485 certification are the primary compliance requirements — both available through our supply network. For US hospital purchasing organisations (GPOs) and IDNs, ISO 9001 and BSCI are the typical minimum requirements, with ISO 13485 increasingly specified in larger programme contracts. We provide full compliance documentation packages with every shipment.",
                },
              },
            ],
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <DoctorSurgicalGownsContent />
      </main>
      <Footer />
    </>
  );
}
