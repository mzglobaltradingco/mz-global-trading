import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import WorkwearContent from "./WorkwearContent";

export const metadata: Metadata = {
  title: "Workwear Apparel Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom workwear apparel from Pakistan's certified factories. Canvas, ripstop, FR cotton and hi-vis. 240–400 GSM. ISO 9001, BSCI, Sedex certified. FOB / CIF export.",
  keywords: [
    "workwear manufacturer Pakistan",
    "safety workwear supplier Pakistan",
    "FR clothing manufacturer",
    "hi-vis workwear OEM Pakistan",
    "custom work uniforms Pakistan",
    "industrial clothing manufacturer",
    "trade workwear wholesale Pakistan",
    "workwear apparel export",
  ],
  alternates: { canonical: "/apparel/workwearapparel/" },
  openGraph: {
    title: "Workwear Apparel Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom workwear from Pakistan's certified factories. Canvas, ripstop, FR cotton and hi-vis. 240–400 GSM. ISO 9001, BSCI, Sedex certified.",
    url: "https://mzglobaltrading.com/apparel/workwearapparel/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan workwear apparel manufacturer — OEM safety workwear and uniforms for industrial and trade sectors worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Workwear Apparel Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom workwear from Pakistan's certified factories. Canvas, ripstop, FR cotton, hi-vis. ISO 9001, BSCI, Sedex. FOB / CIF export.",
  },
};

export default function WorkwearApparelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Workwear Apparel — Pakistan OEM Sourcing & Export",
            description:
              "Custom workwear apparel sourced from Pakistan's certified factories. Canvas, ripstop TC poly-cotton, FR cotton, hi-vis and denim constructions. 240–400 GSM. ISO 9001, BSCI, Sedex certified.",
            image:
              "https://mzglobaltrading.com/images/hero/hero-apparel.webp",
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
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Apparel",
                  item: "https://mzglobaltrading.com/apparel/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Workwear Apparel",
                  item: "https://mzglobaltrading.com/apparel/workwearapparel/",
                },
              ],
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/hero/hero-apparel.webp",
              name: "Pakistan workwear apparel manufacturer — OEM safety workwear for industrial and trade sectors",
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <WorkwearContent />
      </main>
      <Footer />
    </>
  );
}
