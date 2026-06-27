import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BabyRompersContent from "./BabyRompersContent";

export const metadata = buildMetadata({
  title: "Baby Rompers Manufacturer Pakistan | OEM Infant Bodysuits",
  description:
    "Pakistan OEM baby rompers and bodysuits — GOTS & OEKO-TEX Class 1 certified organic cotton. Snap crotch, envelope neckline. Newborn to 24 months.",
  canonical: "/apparel/babyandkids/babyrompers/",
  ogImage: "/images/og/baby-rompers-og.webp",
  ogImageAlt: "Pakistan baby rompers manufacturer — OEM organic cotton infant bodysuits for USA, UK and Europe",
  keywords: [
    "baby rompers manufacturer Pakistan",
    "infant bodysuits OEM Pakistan",
    "baby onesie wholesale Pakistan",
    "GOTS certified baby rompers",
    "OEKO-TEX Class 1 baby bodysuits",
    "organic cotton baby rompers bulk",
    "newborn romper supplier Pakistan",
    "baby bodysuit OEM export",
  ],
});

export default function BabyRompersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Baby Rompers — OEM Infant Bodysuit Manufacturing Pakistan",
    description:
      "Pakistan OEM baby romper and bodysuit manufacturer. GOTS and OEKO-TEX Class 1 certified organic cotton and combed jersey. Snap crotch and envelope necklines. Newborn to 24 months. Bulk programmes for USA, UK, Europe and worldwide.",
    image: "https://mzglobaltrading.com/images/og/baby-rompers-og.webp",
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
      contentUrl: "https://mzglobaltrading.com/images/og/baby-rompers-og.webp",
      name: "Pakistan baby rompers manufacturer — OEM organic cotton infant bodysuits for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/" },
        { "@type": "ListItem", position: 4, name: "Baby Rompers", item: "https://mzglobaltrading.com/apparel/babyandkids/babyrompers/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <BabyRompersContent />
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
                name: "What snap type do you use on baby rompers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We use 4-part KAM-style nickel-free resin snaps as standard. Metal snaps (copper-nickel alloy, nickel-free plated) are available for premium programmes. All snaps meet EN 71-3 toy-grade heavy-metal limits and are tested for pull strength (minimum 30 N). Velcro or hook-and-eye closures available on request.",
                },
              },
              {
                "@type": "Question",
                name: "Can you produce envelope necklines on all constructions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Envelope/cross-over neckline construction is standard on our jersey and interlock rompers and available on rib and muslin constructions. This neckline style allows the garment to be pulled downward (rather than over the head) during diaper changes — a key feature for newborn and preemie sizing.",
                },
              },
              {
                "@type": "Question",
                name: "What is OEKO-TEX Class 1 and why does it matter for rompers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "OEKO-TEX Standard 100 has four product classes. Class 1 is the most stringent — it applies to garments that come into direct skin contact and are likely to be mouthed by infants under 36 months. It tests for 100+ harmful substances including pesticides, heavy metals, formaldehyde and AZO dyes at baby-specific limit values (typically 10× stricter than adult clothing limits). All our baby romper programmes are sourced from Class 1 certified mills.",
                },
              },
              {
                "@type": "Question",
                name: "Can you produce GOTS-certified organic cotton rompers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We source from GOTS-certified mills where organic cotton is certified from the farm stage, processed with GOTS-approved chemicals, and documented through a full chain-of-custody audit. GOTS certification is a requirement for many European eco-retailers and Scandinavian department store programmes. GOTS certificates are included with shipment documentation.",
                },
              },
              {
                "@type": "Question",
                name: "What sleeve styles are available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We produce short sleeve, long sleeve and sleeveless (tank) bodysuit rompers. Raglan sleeve construction is also available for a wider armhole that makes dressing easier. Sleeve length can be specified per size group — for example, short sleeve in summer sizes and long sleeve in winter sizes within the same programme.",
                },
              },
              {
                "@type": "Question",
                name: "Do you produce footie / footed rompers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Footed rompers (sleepsuits with attached feet) are available in single jersey, interlock and French terry. Foot construction uses a separate panel cut to match the body fabric. Anti-slip grippers on the foot sole are available for 6M+ sizes. Footed rompers are typically 10–12 days additional development time due to pattern complexity.",
                },
              }
            ],
          }),
        }}
      />
    </>
  );
}
