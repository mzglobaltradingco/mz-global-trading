import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import WorkwearContent from "./WorkwearContent";

export const metadata = buildMetadata({
  title: "Workwear Apparel Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom workwear apparel from Pakistan's certified factories. Canvas, ripstop, FR cotton and hi-vis. 240–400 GSM. ISO 9001, BSCI, Sedex certified.",
  canonical: "/apparel/workwearapparel/",
  ogImage: "/images/og/workwear-apparel-og.webp",
  ogImageAlt: "Pakistan workwear apparel manufacturer — OEM safety workwear and uniforms for industrial and trade sectors worldwide",
  keywords: [
    "workwear manufacturer Pakistan",
    "safety workwear supplier Pakistan",
    "FR clothing manufacturer",
    "hi-vis workwear OEM Pakistan",
    "custom work uniforms Pakistan",
    "industrial clothing manufacturer",
    "trade workwear wholesale Pakistan",
    "workwear apparel export",
  ],
});

export default function WorkwearApparelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Workwear Apparel — Pakistan OEM Sourcing & Export",
            description:
              "Custom workwear apparel sourced from Pakistan's certified factories. Canvas, ripstop TC poly-cotton, FR cotton, hi-vis and denim constructions. 240–400 GSM. ISO 9001, BSCI, Sedex certified.",
            image:
              "https://mzglobaltrading.com/images/og/workwear-apparel-og.webp",
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
                  name: "Workwear Apparel",
                  item: "https://mzglobaltrading.com/apparel/workwearapparel/",
                },
              ],
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/og/workwear-apparel-og.webp",
              name: "Pakistan workwear apparel manufacturer — OEM safety workwear for industrial and trade sectors",
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
                name: "Can you supply FR-rated workwear that meets EN ISO 11612 and NFPA 2112?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Our factory network includes facilities experienced in FR cotton garments with durable or inherent FR treatment. We supply test reports confirming flame spread, char length and afterflame duration per EN ISO 11612 / NFPA 2112. FR protection is validated on bulk fabric before production begins.",
                },
              },
              {
                "@type": "Question",
                name: "What hi-vis visibility classes can you manufacture to?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We manufacture garments meeting EN ISO 20471 Class 2 and Class 3 using fluorescent polyester background fabric with silver retroreflective tape sewn at mandatory minimum widths and positions. Class 1 accessories are also available. Test certification from accredited labs is provided.",
                },
              },
              {
                "@type": "Question",
                name: "Is individual employee name or number embroidery available for fleet orders?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. For fleet programmes, individual personalisation — employee name, number, or job title — is embroidered at the left chest or right chest. Each garment is bagged individually with the employee's details on the polybag. Sorting and packing lists are provided for distribution.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer anti-static finishing for electrical-hazard environments?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Anti-static finishing is available on canvas and ripstop fabrics. The treatment meets EN 1149-3 (charge decay) requirements suitable for garment use in ATEX environments. Anti-static properties are validated after 50 wash cycles.",
                },
              },
              {
                "@type": "Question",
                name: "What is the process for a repeat annual fleet order?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "After the first production run, we retain your colour lab dip reference, approved trim spec, and factory file. Annual repeat orders are processed against that file, ensuring consistent colour and quality. Minimum lead time for repeat orders is shorter than first production as pre-production sampling is condensed.",
                },
              },
              {
                "@type": "Question",
                name: "Can you produce workwear in custom corporate colours with precise Pantone matching?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We work to target Pantone / RAL references with lab dip approval before bulk dyeing. Corporate colour programmes with consistent colour across multiple garment types (jackets, trousers, shirts) are matched within ΔE 1.0 tolerance. Colour consistency is confirmed on bulk fabric pre-cut.",
                },
              }
            ],
          }),  
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <WorkwearContent />
      </main>
      <Footer />
    </>
  );
}
