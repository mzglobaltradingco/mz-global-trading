import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import CurtainsContent from "./CurtainsContent";

export const metadata = buildMetadata({
  title: "Curtains Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan curtain manufacturer for wholesale buyers and interior brands in USA, UK and Europe. Custom blackout, sheer, lined and jacquard curtains.",
  canonical: "/hometextile/bedlinen/curtains/",
  ogImage: "/images/og/curtains-og.webp",
  ogImageAlt: "Pakistan curtain manufacturer — blackout and jacquard curtains for wholesale buyers in USA, UK and Europe",
  keywords: [
    "curtains manufacturer Pakistan",
    "blackout curtains wholesale Pakistan",
    "custom curtains export",
    "jacquard curtains manufacturer",
    "window treatments supplier Pakistan",
    "wholesale curtains UK Europe",
    "curtain panels manufacturer Pakistan",
  ],
});

export default function CurtainsPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <CurtainsContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Curtains",
            description:
              "Custom curtains manufactured in Pakistan. Plain weave, voile, jacquard, blackout and linen constructions. Rod pocket, eyelet, pinch pleat, tab-top and ring-top heading styles. Unlined, lined and blackout-lined. OEKO-TEX certified.",
            image:
              "https://mzglobaltrading.com/images/hero/hero-curtains.webp",
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
                "https://mzglobaltrading.com/images/hero/hero-curtains.webp",
              name: "Pakistan curtain manufacturer — blackout and jacquard curtains for wholesale buyers",
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
                  name: "Bed Linen",
                  item: "https://mzglobaltrading.com/hometextile/bedlinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Curtains",
                  item: "https://mzglobaltrading.com/hometextile/bedlinen/curtains/",
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
                name: "What fabric should I specify for blackout curtains?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Triple weave blackout (woven-in blackout, no coating peeling) is the premium specification — blackout performance is maintained after 100+ wash cycles with no delamination risk. Blackout coating on plain weave is the cost-effective alternative; both achieve zero light penetration. For hotel contract supply, triple weave is strongly recommended for longevity and housekeeping durability.",
                },
              },
              {
                "@type": "Question",
                name: "What heading type is most popular for UK retail curtains?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Eyelet/grommet heading is the most popular for contemporary UK mass-market retail — clean, casual, easy to hang on any pole. Pinch pleat remains the standard for formal rooms and hotel contract supply. Rod pocket suits budget-friendly retail. Tab top suits artisan and farmhouse-style programmes.",
                },
              },
              {
                "@type": "Question",
                name: "What are standard curtain drop dimensions for UK and EU markets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "UK: 90 cm drop (sill-length), 137 cm (below sill), 183 cm (full length to floor), 228 cm (extra long). EU: similar metric dimensions — custom drop ordering is more common in EU than UK. USA: 84\", 96\" and 108\" drops are standard. For hotel contract, exact floor-to-ceiling drop is always specified per room type.",
                },
              },
              {
                "@type": "Question",
                name: "Can you supply FR (flame retardant) certified curtains?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Flame retardant treatment to BS 5867 (UK), EN 13773 (EU) and NFPA 701 (USA) is available. FR certification is mandatory for all hotel and commercial/contract supply in the UK and EU. Specify FR requirement in your RFQ — FR treatment adds 7–10 working days to production lead time.",
                },
              },
              {
                "@type": "Question",
                name: "Are OEKO-TEX certified curtain fabrics available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. OEKO-TEX Standard 100 is available across plain weave, jacquard and linen constructions and covers chemical compliance for EU and UK retail import. Note: blackout coatings applied to the reverse have a separate compliance pathway — confirm with your compliance team which standard applies to your specific application.",
                },
              },
              {
                "@type": "Question",
                name: "What order quantities work for a curtain programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Curtain programmes vary significantly — from a single-room hotel refurbishment to multi-property FF&E contract supply. Include the number of panels, sizes, heading type and any FR or lining requirement in your RFQ. We match you with factories experienced in both retail programme runs and large-scale contract supply.",
                },
              }
            ],
          }),
        }}
      />
    </>
  );
}
