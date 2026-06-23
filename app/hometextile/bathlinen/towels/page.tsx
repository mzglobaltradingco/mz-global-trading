import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TowelsContent from "./TowelsContent";

export const metadata = buildMetadata({
  title: "Towel Manufacturer Pakistan | Bath Towels Wholesale OEM",
  description:
    "Source OEM bath towels from Pakistan — 6 weave constructions, terry loop to zero twist, OEKO-TEX & GOTS certified. Custom GSM 400–700. FOB/CIF.",
  canonical: "/hometextile/bathlinen/towels/",
  ogImage: "/images/og/towels-og.webp",
  ogImageAlt: "Pakistan bath towel manufacturer — OEM terry cotton towels for hotels and retailers in USA, UK and Europe",
  keywords: [
    "towel manufacturer Pakistan",
    "bath towel wholesale OEM Pakistan",
    "terry towel manufacturer exporter",
    "hotel towels bulk supplier Pakistan",
    "GOTS certified towel manufacturer",
    "custom towels OEM Pakistan USA UK Europe",
    "cotton bath towel supplier",
    "home textile manufacturer Pakistan",
  ],
});

export default function TowelsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bath Towels — OEM Manufacturing Pakistan",
    description:
      "Pakistan OEM bath towel manufacturer producing terry loop, velour, zero twist, waffle, jacquard and dobby border towels in certified cotton for hotels, retailers and hospitality brands in USA, UK and Europe.",
    image: "https://mzglobaltrading.com/images/og/towels-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/og/towels-og.webp",
      name: "Pakistan bath towel manufacturer — OEM terry cotton towels for hotels and retailers in USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
        { "@type": "ListItem", position: 3, name: "Bath Linen", item: "https://mzglobaltrading.com/hometextile/bathlinen/" },
        { "@type": "ListItem", position: 4, name: "Towels", item: "https://mzglobaltrading.com/hometextile/bathlinen/towels/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <TowelsContent />
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
                name: "What GSM is standard for hotel towels supplied from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Hotel towel programmes typically specify 450–550 GSM in terry loop or dobby border terry construction. This weight delivers the combination of absorbency, durability and hand-feel expected by hotel brands in USA, UK, Europe and the Middle East. Ultra-luxury hotel programmes (5-star and above) often specify 550–650 GSM in zero twist cotton. Specify your exact GSM target in the RFQ — we match you with mills producing precisely that specification.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between terry loop and velour towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Terry loop towels retain the uncut loop pile on both faces — producing maximum water absorbency. Velour (sheared terry) has one or both faces sheared to create a smooth, velvet-like surface with a luxury hand-feel. Velour towels have slightly lower absorbency than terry loop but register print designs (sublimation) with exceptional clarity — making velour the preferred construction for beach towels, branded luxury products and spa collections.",
                },
              },
              {
                "@type": "Question",
                name: "Can towels be embroidered with a hotel logo in Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — hotel logo embroidery on corner or along the short border is one of the most frequently ordered customisations in our supply network. Embroidery is applied after the towel is constructed and dyed. Standard placement is left or right corner. Multi-colour logos require a digitised embroidery file — we can digitise from your vector artwork. Woven labels and fabric patches are also available as decoration alternatives for hotel programmes.",
                },
              },
              {
                "@type": "Question",
                name: "Is OEKO-TEX certification available for Pakistan-made towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. OEKO-TEX Standard 100 certification is widely held by Pakistan's leading towel mills. This certification confirms that no harmful substances are present in the finished product — it is a standard import requirement for UK and EU buyers. GOTS (Global Organic Textile Standard) certification is also available if your programme requires certified organic cotton sourcing. Specify certification requirements as hard filters in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What set compositions are available for retail towel programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard retail set compositions from Pakistan are: 2-piece (bath towel + hand towel), 4-piece (bath towel + hand towel + 2 face towels), 6-piece (2 bath + 2 hand + 2 face) and 8-piece (2 bath + 2 hand + 4 face). Custom set compositions are available — specify the exact combination and packaging requirement in your RFQ. Retail box, ribbon-tied and gift bag packaging are all available.",
                },
              },
              {
                "@type": "Question",
                name: "How do order quantities work for towel programmes from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Towel programme quantities depend on construction, GSM, size range, embroidery complexity, colour count and factory scheduling. There is no single figure that covers all programmes — a hotel institutional programme specifying plain white dobby terry in bulk cartons will differ significantly from a premium retail set in gift boxes. Include your target quantity per style, size and colour in your RFQ and we will advise on the most commercially efficient programme structure.",
                },
              }
            ],
          }),
        }}
      />
    </>
  );
}
