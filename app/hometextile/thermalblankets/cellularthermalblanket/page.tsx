import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import CellularThermalBlanketContent from "./CellularThermalBlanketContent";

export const metadata = buildMetadata({
  title: "Cellular Thermal Blanket Manufacturer Pakistan | MZ Global",
  description:
    "Pakistan cellular thermal blanket manufacturer supplying 100% cotton open-cell weave blankets for hospitals, NHS, neonatal and aged-care. OEKO-TEX, GOTS, ISO 9001. Export worldwide.",
  canonical: "/hometextile/thermalblankets/cellularthermalblanket/",
  ogImage: "/images/og/cellular-thermal-blanket-og.webp",
  ogImageAlt: "Pakistan cellular thermal blanket manufacturer — cotton open-cell weave blankets for hospitals and NHS procurement worldwide",
  keywords: [
    "cellular thermal blanket manufacturer Pakistan",
    "hospital blankets supplier Pakistan",
    "NHS blankets Pakistan",
    "cotton cellular blanket wholesale",
    "open cell weave blanket manufacturer",
    "institutional blankets Pakistan",
    "OEKO-TEX hospital blankets",
    "neonatal blankets supplier",
    "bulk cellular blankets export",
  ],
});

export default function CellularThermalBlanketPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Cellular Thermal Blanket — Pakistan Cotton Manufacturing",
            description:
              "100% cotton cellular thermal blankets with open-cell honeycomb weave. Clinical-grade breathability. 150–250 GSM. Anti-shrink finish for hospital laundry. OEKO-TEX Standard 100, GOTS, ISO 9001. Supplied to NHS, hospitals, neonatal units and aged-care globally.",
            image: "https://mzglobaltrading.com/images/og/cellular-thermal-blanket-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/cellular-thermal-blanket-og.webp",
              name: "Pakistan cellular thermal blanket manufacturer — cotton open-cell weave hospital blankets",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
                { "@type": "ListItem", position: 3, name: "Thermal Blankets", item: "https://mzglobaltrading.com/hometextile/thermalblankets/" },
                { "@type": "ListItem", position: 4, name: "Cellular Thermal Blanket", item: "https://mzglobaltrading.com/hometextile/thermalblankets/cellularthermalblanket/" },
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
                name: "What makes a cellular blanket different from a standard woven blanket?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The defining feature of a cellular blanket is its open honeycomb weave structure. Unlike solid-weave blankets, the cellular construction incorporates a deliberate grid of openings — each 'cell' traps a pocket of insulating warm air while the open channels allow moisture vapour to escape. This breathability is critical in clinical environments where patients may be heat-sensitive, post-surgical, or have compromised skin. A standard woven blanket at equivalent GSM would retain moisture and create a warmer, less breathable microclimate against the skin. Cotton cellular blankets at 200 GSM are the NHS procurement standard for general ward use precisely because of this breathable-yet-warming combination.",
                },
              },
              {
                "@type": "Question",
                name: "What GSM is standard for NHS and hospital procurement?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "200 GSM is the predominant specification for general ward use in NHS and equivalent national health systems. This weight provides adequate warmth for ward temperatures (typically 18–22°C) without overheating patients. Neonatal and paediatric units often specify 150–180 GSM for reduced weight and gentler hand against sensitive infant skin. Ambulance and emergency services typically use 200–220 GSM for patient transport. Residential aged-care facilities may specify 220–250 GSM for patients with reduced mobility and lower metabolic rate. All weights are available through our certified supply network.",
                },
              },
              {
                "@type": "Question",
                name: "Can cellular blankets withstand hospital laundry temperatures?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — anti-shrink finish is a standard specification on all cellular blankets supplied for clinical environments. Hospital laundry protocols in the UK typically require washing at 65–71°C for thermal disinfection (HTM 01-04 compliance) or 90°C for certain high-risk applications. Our cellular blankets are tested against ISO 6330 wash cycle protocols at 60°C and 90°C. Anti-shrink compacting treatment limits residual shrinkage to less than 3% over multiple industrial wash cycles. Buyers should confirm specific wash temperature requirements in their RFQ — if 90°C cycles are specified, the factory will adjust the anti-shrink treatment programme accordingly.",
                },
              },
              {
                "@type": "Question",
                name: "Are GOTS-certified organic cotton cellular blankets available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. GOTS-certified (Global Organic Textile Standard) organic cotton cellular blankets are available for buyers with sustainability commitments or those supplying to programmes where organic certification is required. GOTS covers the entire supply chain from raw organic cotton farming through spinning, weaving, finishing and packing. This certification is increasingly requested by hospital trusts with published sustainability policies and by retail buyers supplying to eco-conscious consumers. Lead times for GOTS-certified production are typically 5–10 days longer than conventional programmes due to dedicated organic cotton sourcing and segregated production runs.",
                },
              },
              {
                "@type": "Question",
                name: "What sizes are available and can custom dimensions be supplied?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard sizes cover the full care environment range: Cot/Baby 75×100 cm, Pram 70×90 cm, Single 150×200 cm, Double 180×200 cm, and King 230×220 cm. A ±2 cm manufacturing tolerance applies. Custom dimensions are available for institutional programmes — ambulance stretcher sizes, hospital trolley sizes, specialist neonatal dimensions and custom widths for non-standard bed frames. Include your exact dimensions in the RFQ and we will confirm feasibility and any minimum quantity implications.",
                },
              },
              {
                "@type": "Question",
                name: "What packing formats are available for bulk hospital orders?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For bulk hospital and institutional orders, the standard packing is individual polybag per blanket, then 12 or 24 pieces per export carton. Dozen pack (12 pcs banded) is available for efficient distribution within hospital linen rooms. Retail programmes can use zippered carry bag or retail box presentation. Plain unbranded bulk carton is standard for government and institutional procurement. We can also supply with basic care label only or with buyer-branded labels — include label requirements in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "Which certifications does MZ Global Trading carry for hospital blanket supply?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "OEKO-TEX Standard 100 is maintained across all cellular blanket supply — confirming the absence of harmful substances in the finished product, which is increasingly required by hospital procurement policies. ISO 9001 Quality Management System certification ensures consistent production quality and documented process control. GOTS is available for organic cotton variants. BSCI and Sedex ethical audit compliance is available for buyers whose procurement policies include supply chain social standards. Documentation packages including test reports (shrinkage, tensile strength, whiteness) can be provided per shipment.",
                },
              },
              {
                "@type": "Question",
                name: "What is the indicative lead time from order placement?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lead times are indicative and subject to order volume, factory capacity and material availability. As a general guide: RFQ response and quotation in 3–5 business days; sample production 12–18 days from specification confirmation; bulk production 30–50 days from purchase order placement. Sea freight transit adds 8–35 days depending on destination: 8–14 days to UK, 18–25 days to Australia, 20–30 days to Canada. For NHS tenders and government procurement with fixed delivery windows, we strongly recommend engaging at least 90 days before the required delivery date. All timelines are indicative only.",
                },
              },
            ],
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <CellularThermalBlanketContent />
      </main>
      <Footer />
    </>
  );
}
