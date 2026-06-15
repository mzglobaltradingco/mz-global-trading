import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import HoodiesContent from "./HoodiesContent";

export const metadata: Metadata = {
  title: "Sweatshirt & Hoodie Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom hoodies and sweatshirts from Pakistan's certified fleece garment factories. French terry, brushed fleece, loop back fleece. 300–420 GSM. GOTS, OEKO-TEX, BSCI. FOB / CIF export.",
  keywords: [
    "sweatshirt manufacturer Pakistan",
    "hoodie manufacturer Pakistan",
    "custom hoodies wholesale Pakistan",
    "French terry hoodie Pakistan",
    "OEM sweatshirt Pakistan",
    "fleece hoodie manufacturer",
    "branded hoodies Pakistan",
    "bulk hoodie order",
    "GOTS certified hoodie Pakistan",
  ],
  alternates: { canonical: "/apparel/knittedgarments/sweatshirtshoodies/" },
  openGraph: {
    title: "Sweatshirt & Hoodie Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom-constructed hoodies and sweatshirts sourced from Pakistan's certified fleece factories. 300–420 GSM. GOTS, OEKO-TEX available. FOB / CIF.",
    url: "https://mzglobaltrading.com/apparel/knittedgarments/sweatshirtshoodies/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan sweatshirt and hoodie manufacturing — OEM hoodies wholesale for brands in USA UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweatshirt & Hoodie Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom hoodies and sweatshirts from Pakistan's certified fleece factories. 300–420 GSM. GOTS, OEKO-TEX available.",
  },
};

export default function SweatshirtsHoodiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Sweatshirts & Hoodies — Pakistan OEM Sourcing & Export",
            description:
              "Custom hoodies and sweatshirts sourced from Pakistan's certified fleece garment factories. French terry, brushed fleece and loop back fleece constructions. 300–420 GSM. GOTS and OEKO-TEX available.",
            image:
              "https://mzglobaltrading.com/images/thumbnails/thumb-hoodies-sweatshirts.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "MZ Global Trading" },
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
                { "@type": "ListItem", position: 3, name: "Knitted Garments", item: "https://mzglobaltrading.com/apparel/knittedgarments/" },
                { "@type": "ListItem", position: 4, name: "Sweatshirts & Hoodies", item: "https://mzglobaltrading.com/apparel/knittedgarments/sweatshirtshoodies/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <HoodiesContent />
      </main>
      <Footer />
    </>
  );
}
