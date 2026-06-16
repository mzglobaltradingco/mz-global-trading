import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BabyHoodedTowelsContent from "./BabyHoodedTowelsContent";

export const metadata: Metadata = {
  title: "Baby Hooded Towels Manufacturer Pakistan | OEM Infant Bath Towels",
  description:
    "Pakistan OEM baby hooded towels — GOTS organic and OEKO-TEX Class 1 certified terry and velour. Animal hood styles, custom embroidery. Newborn to kids 4Y. Bulk sourcing for USA, UK and Europe.",
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
  alternates: { canonical: "/apparel/babyandkids/babyhoodedtowels/" },
  openGraph: {
    title: "Baby Hooded Towels Manufacturer Pakistan | OEM Infant Bath Towels | MZ Global Trading",
    description:
      "Pakistan OEM baby hooded towels — GOTS organic terry and velour. Animal hood styles, custom embroidery. Newborn to 4Y. Bulk sourcing for USA, UK and Europe.",
    url: "https://mzglobaltrading.com/apparel/babyandkids/babyhoodedtowels/",
    images: [
      {
        url: "/images/menu/menu-babyhoodedtowels.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan baby hooded towels manufacturer — OEM organic cotton terry hooded bath towels for USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Hooded Towels Manufacturer Pakistan | OEM Infant Bath Towels | MZ Global Trading",
    description:
      "Pakistan OEM baby hooded towels — organic terry and velour, animal hoods. Bulk for USA, UK and Europe.",
  },
};

export default function BabyHoodedTowelsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Baby Hooded Towels — OEM Infant Bath Towel Manufacturing Pakistan",
    description:
      "Pakistan OEM baby hooded towel manufacturer. GOTS certified organic cotton terry and velour. Newborn to kids 4Y. Animal hood designs, custom embroidery. OEKO-TEX Class 1 certified mills. Bulk programmes for USA, UK, Europe and global baby brands.",
    image: "https://mzglobaltrading.com/images/menu/menu-babyhoodedtowels.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/menu/menu-babyhoodedtowels.webp",
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
    </>
  );
}
