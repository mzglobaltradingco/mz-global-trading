import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PantsTrousersContent from "./PantsTrousersContent";

export const metadata = buildMetadata({
  title: "Pants & Trousers Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom pants and trousers from Pakistan's certified woven factories. Twill, chino, linen, ponte and stretch sateen. 180–280 GSM.",
  canonical: "/apparel/wovengarments/pantsandtrousers/",
  ogImage: "/images/og/pants-trousers-og.webp",
  ogImageAlt: "Pakistan pants and trousers manufacturer — OEM woven trousers for fashion and corporate brands in USA, UK and Europe",
  keywords: [
    "pants manufacturer Pakistan",
    "trousers manufacturer Pakistan",
    "chino pants OEM Pakistan",
    "custom trousers supplier",
    "woven pants wholesale Pakistan",
    "twill trousers manufacturer",
    "linen pants supplier Pakistan",
    "formal trousers OEM",
  ],
});

export default function PantsTrousersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Pants & Trousers — Pakistan OEM Sourcing & Export",
            description:
              "Custom pants and trousers sourced from Pakistan's certified woven garment factories. Twill chino, canvas, linen, sateen stretch and ponte constructions. 140–350 GSM. OEKO-TEX, BSCI and Sedex certified.",
            image:
              "https://www.mzglobaltrading.com/images/og/pants-trousers-og.webp",
            provider: { "@id": "https://www.mzglobaltrading.com/#organization" },
            serviceType: "Textile Sourcing",
            areaServed: "Worldwide",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://www.mzglobaltrading.com/images/og/pants-trousers-og.webp",
              name: "Pakistan pants and trousers manufacturer — OEM woven trousers for fashion and corporate brands in USA, UK and Europe",
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
                  name: "Apparel",
                  item: "https://www.mzglobaltrading.com/apparel/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Woven Garments",
                  item: "https://www.mzglobaltrading.com/apparel/wovengarments/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Pants & Trousers",
                  item: "https://www.mzglobaltrading.com/apparel/wovengarments/pantsandtrousers/",
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
                name: "What GSM is standard for business casual chino trousers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For year-round business casual chino programmes, 220–260 GSM twill is the commercial standard. This weight delivers the structured drape expected in office and smart-casual environments. For warmer climates (Middle East, SE Asia) or summer collections, lightweight poplin at 140–180 GSM is the correct alternative — providing adequate structure without excess warmth. Heavy canvas at 260–350 GSM is reserved for workwear and outdoor programmes.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between twill chino and canvas for trouser programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Twill chino (200–260 GSM) is the fashion and business-casual construction — smooth face, refined drape, suitable for embroidery and woven patch decoration. Canvas (260–350 GSM) is a heavier, more rugged variant used specifically in workwear, utility and outdoor trouser programmes where durability and abrasion resistance take priority over refined aesthetics. Both share the diagonal twill weave but differ significantly in weight, hand and end-use application.",
                },
              },
              {
                "@type": "Question",
                name: "Can I get stretch trousers from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Cotton-elastane (97/3 or 95/5) chino stretch and sateen stretch (92/8 cotton-spandex) are both available. Stretch chinos are the most commercially popular variant in contemporary menswear and women's fashion. Ponte fabric (typically 60/35/5 poly-rayon-spandex) is also available for women's and DTC programmes that prioritise wearing comfort without sacrificing formal appearance.",
                },
              },
              {
                "@type": "Question",
                name: "What finishes are available for outdoor or work trouser programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DWR (durable water repellent) is the primary finish — available in fluorinated (C6 based) and non-fluorinated (PFAS-free) formulations. Soil release for easy cleaning is standard in workwear. Anti-static finish is available for industrial environments. Reinforced knee and seat panels are available on canvas constructions. All finishes are compatible with OEKO-TEX Standard 100 certification.",
                },
              },
              {
                "@type": "Question",
                name: "What order quantities are typical for custom trouser programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Order quantities for custom woven trouser programmes vary significantly depending on construction, number of sizes, colour programme and factory capacity. There is no single universal minimum — include your target quantity, number of colours and size range in your RFQ and we match you with factories whose capacity and production economics align with your programme size.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order linen trousers for spring/summer retail from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Pure linen (100%) and linen-cotton blend (55/45) trouser programmes are available. Linen at 160–200 GSM is ideal for spring/summer resort, coastal and lifestyle brand programmes. Pre-washed garment finish is available for reduced wrinkling and softer drape on arrival — popular for buyers who want the relaxed linen aesthetic from the first wear.",
                },
              }
            ],
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <PantsTrousersContent />
      </main>
      <Footer />
    </>
  );
}
