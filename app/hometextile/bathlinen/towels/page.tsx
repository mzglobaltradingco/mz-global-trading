import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TowelsContent from "./TowelsContent";

export const metadata: Metadata = {
  title: "Towels Manufacturer & Exporter Pakistan | MZ Global Trading",
  description:
    "Source premium towels from Pakistan — bath, beach, hand, kitchen, institutional & more. 44 towel types, 20+ yarn options, 12 weaving techniques. Request a quote today.",
  keywords: [
    "towels manufacturer Pakistan",
    "bath towels wholesale",
    "beach towels exporter Pakistan",
    "custom towels B2B",
    "terry towels Pakistan",
    "hotel towels supplier Pakistan",
    "cotton towels OEM export",
    "towel manufacturer USA UK Europe",
  ],
  alternates: {
    canonical: "/hometextile/bathlinen/towels/",
    languages: {
      "en": "https://mzglobaltrading.com/hometextile/bathlinen/towels/",
      "x-default": "https://mzglobaltrading.com/",
    },
  },
  openGraph: {
    title: "Towels Manufacturer & Exporter Pakistan | MZ Global Trading",
    description:
      "44 towel types sourced from Pakistan's certified mills. Competitive pricing, custom branding, global shipping to USA, UK and Europe.",
    url: "https://mzglobaltrading.com/hometextile/bathlinen/towels/",
    images: [
      {
        url: "/images/thumbnails/thumb-towels.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan terry cotton towel manufacturer — wholesale bath towels for hotels and retailers in USA, UK and Europe",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Towels Manufacturer & Exporter Pakistan | MZ Global Trading",
    description:
      "44 towel types sourced from Pakistan's certified mills. Competitive pricing, custom branding, global shipping to USA, UK and Europe.",
  },
};

const towelsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://mzglobaltrading.com/hometextile/bathlinen/towels/",
  url: "https://mzglobaltrading.com/hometextile/bathlinen/towels/",
  name: "Towels Manufacturer & Exporter Pakistan | MZ Global Trading",
  description:
    "Source premium towels from Pakistan — bath, beach, hand, kitchen, institutional and more. 44 towel types, 20+ yarn options, 12 weaving techniques.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://mzglobaltrading.com/images/thumbnails/thumb-towels.webp",
    name: "Pakistan terry cotton towel manufacturer — wholesale bath towels for hotels and retailers in USA, UK and Europe",
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

export default function TowelsPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <TowelsContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(towelsSchema) }}
      />
    </>
  );
}
