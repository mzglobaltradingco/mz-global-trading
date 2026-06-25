import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import MedicalScrubsContent from "./MedicalScrubsContent";

export const metadata = buildMetadata({
  title: "Medical Scrubs Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan medical scrubs manufacturer for hospitals, clinics and nursing homes. Twill poly-cotton, 4-way stretch. Anti-bacterial, moisture wicking. ISO 13485, BSCI, Sedex.",
  canonical: "/hometextile/hospitallinen/medicalscrubs/",
  ogImage: "/images/og/medical-scrubs-og.webp",
  ogImageAlt: "Pakistan medical scrubs manufacturer — custom hospital scrubs for healthcare buyers in USA, UK and worldwide",
  keywords: [
    "medical scrubs manufacturer Pakistan",
    "hospital scrubs supplier Pakistan",
    "nursing scrubs wholesale Pakistan",
    "TC poly-cotton scrubs Pakistan",
    "4-way stretch scrubs manufacturer",
    "custom scrubs OEM Pakistan",
    "scrubs wholesale export Pakistan",
    "ISO 13485 scrubs Pakistan",
    "clinic uniform supplier Pakistan",
  ],
});

export default function MedicalScrubsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Medical Scrubs — Pakistan Healthcare Textile Export",
            description:
              "Custom medical scrubs manufactured in Pakistan's certified healthcare textile facilities. Twill TC 65/35 poly-cotton, 100% cotton twill, 4-way stretch. Anti-bacterial, fluid repellent, moisture wicking. ISO 13485, BSCI, Sedex certified. FOB / CIF export.",
            image:
              "https://mzglobaltrading.com/images/og/medical-scrubs-og.webp",
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
                "https://mzglobaltrading.com/images/og/medical-scrubs-og.webp",
              name: "Pakistan medical scrubs manufacturer — custom hospital scrubs for healthcare buyers worldwide",
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
                  name: "Medical Scrubs",
                  item: "https://mzglobaltrading.com/hometextile/hospitallinen/medicalscrubs/",
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
                name: "What fabric construction is used for medical scrubs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The primary construction for medical scrubs is twill weave TC 65/35 poly-cotton at 150–190 GSM. Twill weave provides a stronger diagonal structure than plain weave, delivering durability across the repeated industrial laundering typical in healthcare environments. The 65% polyester content maintains shape and resists wrinkling; the 35% cotton component provides breathability for staff wearing scrubs across long shifts. For markets with preference for natural fibres, 100% cotton twill is available at similar GSM. 4-way stretch poly-spandex construction is available for surgical and procedural roles requiring unrestricted movement.",
                },
              },
              {
                "@type": "Question",
                name: "What sizes and fits are available for hospital scrubs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We supply scrubs in XS through 3XL in standard fit. Petite sizing (XS–2XL) is available with shortened inseam and reduced torso length for shorter staff. Tall sizing (XS–2XL) extends inseam and torso for taller individuals. Fit options include Regular Fit (standard comfort allowance), Slim or Modern Fit (reduced ease for a tailored appearance), and Relaxed Fit (generous ease for freedom of movement). For institutional procurement, include a size ratio breakdown in your RFQ — we can produce mixed-size orders from a single purchase order.",
                },
              },
              {
                "@type": "Question",
                name: "Can I get embroidered logos or names on scrubs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Embroidery is the standard decoration method for medical scrubs — placed on the left chest, right chest, or both. Hospital logos, department names and individual staff names are all embroiderable. Thread colour is matched to your brand specification. Embroidery withstands industrial laundering and repeated sterilisation cycles without degradation. Heat transfer labelling is also available for name/department identification on individual garments where embroidery is not specified.",
                },
              },
              {
                "@type": "Question",
                name: "What performance finishes are applied to medical scrubs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard performance finishes include: anti-bacterial treatment (inhibits surface bacterial growth — relevant to infection control environments); fluid repellent finish (DWR coating providing initial resistance to liquid splash and staining); anti-static treatment (reduces static charge in clinical environments); moisture wicking treatment (draws perspiration away from skin surface for comfort during extended wear). For 4-way stretch poly-spandex constructions, the synthetic fibre content provides inherent moisture management. All finishing chemicals are OEKO-TEX certified.",
                },
              },
              {
                "@type": "Question",
                name: "Which certifications apply to medical scrub supply from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ISO 13485 (Medical Devices Quality Management System) is available for buyers whose procurement specifications require it — increasingly standard for NHS supply chain and EU hospital purchasing. ISO 9001 covers general quality management. BSCI, Sedex and SA8000 audit compliance covers ethical production and labour standards — required by many NHS and EU hospital group procurement policies. OEKO-TEX Standard 100 certifies the absence of harmful substances in the finished garment. We provide full certification documentation with every shipment.",
                },
              },
              {
                "@type": "Question",
                name: "What colour range is available for medical scrubs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Medical scrubs are produced in the full reactive dye PMS colour range. Standard healthcare colours — navy, ceil blue, hunter green, burgundy, charcoal, black and white — are maintained in production inventory and available at shorter lead times. Custom PMS-matched colours for brand-specific programmes require lab dip sampling and approval before bulk production. For programmes requiring consistent colour identification across departments (e.g., blue for nursing, green for surgical, grey for administration), we supply each department colour under a unified purchase order.",
                },
              },
              {
                "@type": "Question",
                name: "Do you supply scrubs for dental, veterinary and specialist clinics?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Dental practices, veterinary clinics, physiotherapy and specialist outpatient clinics are established buyers of Pakistan-sourced scrubs. These sectors typically specify lighter constructions (150–175 GSM) in clinic-specific colours with embroidered practice logos. Veterinary scrubs may specify additional performance requirements such as reinforced knee panels or extended length for floor-level procedures. Include your sector-specific requirements in the RFQ and we will source appropriately.",
                },
              },
              {
                "@type": "Question",
                name: "What is the typical lead time for a hospital scrubs programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lead times are indicative and vary by construction, decoration, order volume and factory capacity. As a general guide: sample production takes 14–20 days from fabric and colour approval; bulk production typically takes 35–55 days from purchase order placement. For programmes requiring embroidery, add 5–8 production days. For new colour programmes requiring lab dip approval, allow 7–10 days before sample production commences. Sea freight adds 20–35 days depending on destination. NHS and institutional tenders with fixed delivery windows should allow a minimum of 90 days from RFQ to delivery.",
                },
              },
            ],
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <MedicalScrubsContent />
      </main>
      <Footer />
    </>
  );
}
