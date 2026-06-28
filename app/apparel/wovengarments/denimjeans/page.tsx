import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import DenimJeansContent from "./DenimJeansContent";

export const metadata = buildMetadata({
  title: "Denim Jeans Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom denim jeans from Pakistan's certified woven garment factories. Rigid, stretch 98/2, raw and recycled cotton denim. 8–14 oz.",
  canonical: "/apparel/wovengarments/denimjeans/",
  ogImage: "/images/og/denim-jeans-og.webp",
  ogImageAlt: "Pakistan denim jeans manufacturer — OEM rigid and stretch denim for fashion brands in USA, UK and Europe",
  keywords: [
    "denim jeans manufacturer Pakistan",
    "custom denim jeans OEM",
    "stretch denim supplier Pakistan",
    "rigid denim manufacturer",
    "denim jeans wholesale Pakistan",
    "raw denim manufacturer",
    "selvedge denim Pakistan",
    "OEKO-TEX denim jeans",
  ],
});

export default function DenimJeansPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Denim Jeans — Pakistan OEM Sourcing & Export",
            description:
              "Custom denim jeans sourced from Pakistan's certified woven garment factories. Rigid 3×1 twill, stretch 98/2 cotton-elastane, raw and recycled cotton denim. 8–14 oz. Stone wash, acid wash, enzyme wash available.",
            image:
              "https://www.mzglobaltrading.com/images/og/denim-jeans-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
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
                  name: "Denim Jeans",
                  item: "https://www.mzglobaltrading.com/apparel/wovengarments/denimjeans/",
                },
              ],
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://www.mzglobaltrading.com/images/og/denim-jeans-og.webp",
              name: "Pakistan denim jeans manufacturer — OEM woven denim garments for brands in USA, UK and Europe",
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
                name: "What is the difference between rigid and stretch denim for OEM programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Rigid 3×1 twill denim (100% cotton, zero elastane) produces a classic stiff hand that softens and fades with wear — valued in workwear, heritage and selvedge programmes. Stretch denim (98/2 or 95/5 cotton-elastane) delivers immediate comfort with maintained structure — the dominant commercial construction for fashion retail. Your choice depends on target market positioning: rigid for premium/heritage or workwear, stretch for fashion and contemporary lifestyle programmes.",
                },
              },
              {
                "@type": "Question",
                name: "Which oz weight should I order for USA retail denim programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For year-round USA retail, 11–12 oz is the commercial standard — this weight covers both rigid and stretch 98/2 constructions and is compatible with the widest range of wash techniques. Lightweight 8–10 oz suits summer or warm-climate programmes (SE Asia, South America, Middle East). Heavyweight 13–14+ oz is required for workwear, raw denim and selvedge-adjacent programmes targeting USA trade and premium markets.",
                },
              },
              {
                "@type": "Question",
                name: "Can I get GOTS or OEKO-TEX certified denim jeans from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Pakistan's certified denim mills carry OEKO-TEX Standard 100 across all standard constructions — EU and UK buyers should specify this as a hard requirement. GOTS-certified organic cotton denim is available on 100% organic rigid and stretch constructions. GRS certification is available for recycled cotton denim variants. Specify your required certification in your RFQ and we match you with factories carrying that standard.",
                },
              },
              {
                "@type": "Question",
                name: "What wash techniques are available for denim jeans programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Six commercial wash techniques are available: stone wash (classic fade), acid wash (cloud bleach pattern), sand/blast wash (dry matte fade), enzyme wash (bio-softening without fade), raw/no wash (unwashed, premium positioning), and overdye/tinted wash (colour cast for non-indigo fashion positioning). Laser etching is available for sustainable distress effects — whisker lines, chevrons and honeycomb abrasion patterns without water-intensive manual processes.",
                },
              },
              {
                "@type": "Question",
                name: "How do I specify denim hardware for an OEM programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Hardware — buttons, rivets, zip pulls — can be branded with your logo, brand initial or custom design. Specify your preferred metal finish (gunmetal, antique brass, polished nickel, oxidised copper), logo/text, size and quantity in your RFQ. Hardware branding is executed via engraving, debossing or logo stamping. Lead times for custom hardware are factored into the overall production schedule.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order selvedge denim jeans from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Selvedge denim — woven on shuttle looms producing a self-finished inseam edge — is available through Pakistan's specialist denim mills. The selvedge ID can be produced in your house colour for brand identification. Selvedge denim is positioned as premium: it commands higher unit costs than open-end constructions but targets buyers willing to pay for heritage quality. This construction is popular in USA collector markets, Japan and premium European menswear.",
                },
              }
            ],
          }),  
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <DenimJeansContent />
      </main>
      <Footer />
    </>
  );
}
