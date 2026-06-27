import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TShirtsContent from "./TShirtsContent";

export const metadata = buildMetadata({
  title: "T-Shirt Manufacturer Pakistan | OEM & Wholesale",
  description:
    "Source custom T-shirts from Pakistan — 7 fabric constructions, GOTS & OEKO-TEX certified cotton, full PMS colour matching. FOB/CIF export.",
  canonical: "/apparel/knittedgarments/tshirts/",
  ogImage: "/images/og/t-shirts-og.webp",
  ogImageAlt: "Pakistan t-shirt manufacturer — OEM cotton t-shirts wholesale for brands in USA, UK and Europe",
  keywords: [
    "t-shirt manufacturer Pakistan",
    "custom t-shirt OEM manufacturer",
    "cotton t-shirt wholesale supplier",
    "GOTS certified t-shirt manufacturer",
    "t-shirt exporter Pakistan USA UK Europe",
    "single jersey t-shirt manufacturer",
    "knitted garment manufacturer Pakistan",
    "bulk t-shirt sourcing Pakistan",
  ],
});

export default function TShirtsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "T-Shirts — OEM Manufacturing Pakistan",
    description:
      "Pakistan OEM t-shirt manufacturer producing single jersey, pique, interlock, rib, waffle knit and mesh t-shirts in certified cotton for brands and retailers in USA, UK and Europe.",
    image: "https://mzglobaltrading.com/images/og/t-shirts-og.webp",
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
      contentUrl: "https://mzglobaltrading.com/images/og/t-shirts-og.webp",
      name: "Pakistan t-shirt manufacturer — OEM cotton t-shirts for brands in USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Knitted Garments", item: "https://mzglobaltrading.com/apparel/knittedgarments/" },
        { "@type": "ListItem", position: 4, name: "T-Shirts", item: "https://mzglobaltrading.com/apparel/knittedgarments/tshirts/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <TShirtsContent />
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
                name: "What fabric construction should I specify for a basic fashion t-shirt?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Single jersey 160–180 GSM combed cotton is the global default for fashion t-shirts. Ring-spun combed single jersey at this weight delivers the smoothest hand-feel, best print fidelity and most competitive price. For a premium retail positioning, 180–200 GSM combed cotton or interlock provides a more structured feel and a heavier drape.",
                },
              },
              {
                "@type": "Question",
                name: "Can I get GOTS certified organic cotton t-shirts from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Pakistan has GOTS-certified mills for single jersey, interlock and piqué constructions. Organic cotton t-shirts carry a price premium of approximately 15–25% over conventional cotton. Specify GOTS as a hard requirement in your RFQ — we match you with certified factories only.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between screen print and DTG for t-shirts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Screen print uses physical mesh screens and is cost-effective for large quantities with limited colours (typically up to 6–8). DTG is digital inkjet printing — ideal for photo-quality, full-colour imagery and small runs, but requires 100% cotton or high-cotton single jersey for best ink adhesion. Above 300 pieces with up to 6 colours, screen print typically wins on cost.",
                },
              },
              {
                "@type": "Question",
                name: "How do I plan my order quantity for a t-shirt programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Order quantities vary by construction, colour count, size ratio and decoration method. There is no universal minimum. The best approach is to include your target quantity per style and colour in your RFQ. We match you with factories whose scheduling and capacity align with your programme, and advise on the most efficient quantity structure per specification.",
                },
              },
              {
                "@type": "Question",
                name: "Which construction is best for sublimation printing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sublimation requires polyester content of at least 80% to achieve vibrant, durable colour. Mesh / eyelet in a polyester or polyester-cotton blend is the best match — the open construction and polyester fibre combination delivers maximum colour saturation and ventilation. Sublimation is not suitable for cotton-dominant constructions.",
                },
              },
              {
                "@type": "Question",
                name: "What size standards are available for Pakistan-manufactured t-shirts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We can produce to US (S/M/L/XL/2XL/3XL), UK, EU and custom graded specifications. All garments are graded from a buyer-approved counter sample or tech pack. US sizing is the default — specify UK or EU grading explicitly in your RFQ if required.",
                },
              }
            ],
          }),
        }}
      />
    </>
  );
}
