import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ApparelContent from "./ApparelContent";

export const metadata: Metadata = {
  title: "Apparel Manufacturer Pakistan | MZ Global Trading",
  description: "Pakistan OEM apparel manufacturer — knitted garments, woven garments, baby & kids, workwear and socks. GOTS, OEKO-TEX, BSCI certified. FOB export to USA, UK, EU.",
  keywords: ["apparel manufacturer Pakistan", "OEM garment manufacturer", "knitwear Pakistan", "woven garments Pakistan", "workwear manufacturer Pakistan"],
  alternates: {
    canonical: "/apparel/",
    languages: {
      "en": "https://mzglobaltrading.com/apparel/",
      "x-default": "https://mzglobaltrading.com/apparel/",
    },
  },
  openGraph: {
    title: "Apparel Manufacturer Pakistan | MZ Global Trading",
    description: "Pakistan OEM apparel sourcing — knitted garments, woven garments, baby & kids, workwear and socks. GOTS, OEKO-TEX, BSCI. Export worldwide.",
    url: "https://mzglobaltrading.com/apparel/",
    images: [{ url: "/images/og/apparel-og.webp", width: 1200, height: 630, alt: "Pakistan apparel manufacturer — OEM garment sourcing for brands in USA, UK and Europe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apparel Manufacturer Pakistan | MZ Global Trading",
    description: "Pakistan OEM apparel sourcing — knitted garments, woven garments, baby & kids, workwear and socks. Certified. Export worldwide.",
  },
};

export default function ApparelPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <ApparelContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "url": "https://mzglobaltrading.com/apparel/",
            "name": "Apparel Manufacturer Pakistan | MZ Global Trading",
            "description": "Pakistan OEM apparel manufacturer — knitted garments, woven garments, baby & kids, workwear and socks. GOTS, OEKO-TEX, BSCI certified.",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mzglobaltrading.com/" },
                { "@type": "ListItem", "position": 2, "name": "Apparel", "item": "https://mzglobaltrading.com/apparel/" },
              ],
            },
          }),
        }}
      />
    </>
  );
}
