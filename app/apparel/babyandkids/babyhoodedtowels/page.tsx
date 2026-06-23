import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BabyHoodedTowelsContent from "./BabyHoodedTowelsContent";

export const metadata = buildMetadata({
  title: "Baby Hooded Towels Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan OEM baby hooded towels — GOTS organic and OEKO-TEX Class 1 certified terry and velour. Animal hood styles, custom embroidery. Newborn to kids 4Y.",
  canonical: "/apparel/babyandkids/babyhoodedtowels/",
  ogImage: "/images/og/baby-hooded-towels-og.webp",
  ogImageAlt: "Pakistan baby hooded towels manufacturer — OEM organic cotton terry hooded bath towels for USA, UK and Europe",
  keywords: [
    "baby hooded towels manufacturer Pakistan",
    "infant hooded bath towels OEM",
    "baby hooded towel wholesale Pakistan",
    "GOTS certified baby bath towels",
    "OEKO-TEX Class 1 hooded towels",
    "organic cotton baby towels Pakistan",
    "animal hooded towel OEM export",
    "newborn hooded towel bulk order",
  ],
});

export default function BabyHoodedTowelsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Baby Hooded Towels — OEM Infant Bath Towel Manufacturing Pakistan",
    description:
      "Pakistan OEM baby hooded towel manufacturer. GOTS certified organic cotton terry and velour. Newborn to kids 4Y. Animal hood designs, custom embroidery. OEKO-TEX Class 1 certified mills. Bulk programmes for USA, UK, Europe and global baby brands.",
    image: "https://mzglobaltrading.com/images/og/baby-hooded-towels-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/og/baby-hooded-towels-og.webp",
      name: "Pakistan baby hooded towels manufacturer — OEM organic cotton terry hooded bath towels for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/" },
        { "@type": "ListItem", position: 4, name: "Baby Hooded Towels", item: "https://mzglobaltrading.com/apparel/babyandkids/babyhoodedtowels/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <BabyHoodedTowelsContent />
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
                name: "How is the hood attached to the towel body?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The hood is typically sewn into the corner of the towel with a double-stitched overlock seam — the same weight construction as the towel body. This creates the strongest attachment point. Some premium programmes use a mitered corner construction where the hood panel is integrated into the towel corner rather than applied on top, for a cleaner finish and better durability through repeated washing.",
                },
              },
              {
                "@type": "Question",
                name: "How do you ensure the ear details are safe for newborns?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ear constructions are assessed for three safety criteria: (1) no choking hazard — stuffed ear panels use polyester fill certified to OEKO-TEX Class 2+, not loose fibres; (2) no sharp edges — all ear tips are rounded and seam-finished; (3) attachment strength — ear seams tested to 30N pull strength. Appliqué ear decorations are stitched all-around perimeter, not just glued. All embroidery thread OEKO-TEX Class 1.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between OEKO-TEX Class 1 and standard OEKO-TEX for towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard OEKO-TEX 100 has four product classes. Class 1 is specifically for products used by infants and children under 3 years. It applies stricter limits for pH, formaldehyde, heavy metals and colorfast substances because babies have thinner skin and may mouth the product. For a baby hooded towel, Class 1 applies to the terry body, hood, ear fabric, embroidery threads and any sew-in labels. Standard adult towels typically use Class 2 certification.",
                },
              },
              {
                "@type": "Question",
                name: "Can you produce GOTS organic cotton hooded towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We source from GOTS-certified mills where cotton is certified from the farm stage. GOTS certification covers not only the fibre but also the processing chemicals, dyes and social conditions at the factory. GOTS certification is increasingly required by Scandinavian, German and eco-focused UK and US baby retailers. Certificates issued per order and included with shipment documentation.",
                },
              },
              {
                "@type": "Question",
                name: "What custom animal hood designs can you produce?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We maintain a standard library of 7 animal hoods — bunny, bear, lion, elephant, duck/chick, fox and plain. Custom character designs are developed from buyer artwork files (AI, EPS or high-resolution PDF). Development includes a proto sample for hood shape, ear placement and embroidery proof before bulk commitment. Character designs that include embroidered facial features (eyes, nose) use OEKO-TEX Class 1 threads with smooth backing so no stitching touches skin.",
                },
              },
              {
                "@type": "Question",
                name: "What GSM do you recommend for a premium baby hooded towel gift set?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For premium gift programmes targeting USA, UK and European markets, we recommend 400–500 gsm velour (sheared terry) construction. This weight provides excellent absorbency, a plush feel and good drape when wrapped around a baby. It photographs well for e-commerce and holds gift folding without requiring stiff packaging. For Scandinavian eco-programmes, 380–450 gsm zero-twist terry in GOTS organic cotton is the preferred combination.",
                },
              }
            ],
          }),
        }}
      />
    </>
  );
}
