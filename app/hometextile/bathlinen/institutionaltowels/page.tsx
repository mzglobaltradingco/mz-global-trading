import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import InstitutionalTowelsContent from "./InstitutionalTowelsContent";

export const metadata: Metadata = {
  title: "Institutional Towel Manufacturer Pakistan | Bulk Hotel & Healthcare Terry Supply",
  description:
    "Pakistan institutional towel manufacturer — 400–550 GSM plain white and dobby border terry for hotels, hospitals and laundry services. Case packs of 120. OEKO-TEX, GOTS, ISO 9001 certified. Supply to USA, UK, Europe and worldwide.",
  keywords: [
    "institutional towel manufacturer Pakistan",
    "bulk hotel towels Pakistan",
    "hotel towel supplier",
    "healthcare towel manufacturer",
    "plain white terry towels wholesale",
    "dobby border institutional towels",
    "terry towel case pack supplier",
    "hospital towels Pakistan",
    "commercial laundry towels supplier",
    "OEM institutional terry",
  ],
  alternates: { canonical: "/hometextile/bathlinen/institutionaltowels/" },
  openGraph: {
    title: "Institutional Towel Manufacturer Pakistan | Bulk Hotel & Healthcare Terry Supply",
    description:
      "Pakistan institutional towel manufacturer — 400–550 GSM plain white and dobby border terry for hotels, hospitals and commercial laundry. Case packs of 120. OEKO-TEX and GOTS certified.",
    url: "https://mzglobaltrading.com/hometextile/bathlinen/institutionaltowels/",
    images: [
      {
        url: "/images/og/institutional-towels-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan institutional towel manufacturer — bulk hotel and healthcare terry supply, 400–550 GSM, case packs of 120",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Institutional Towel Manufacturer Pakistan | Bulk Hotel & Healthcare Terry",
    description:
      "Bulk hotel and healthcare terry from Pakistan — 400–550 GSM plain white and dobby border terry. Case packs of 120. OEKO-TEX, GOTS, ISO 9001 certified.",
  },
};

export default function InstitutionalTowelsPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Institutional Towels",
              description:
                "Pakistan-manufactured institutional terry towels — 400–550 GSM plain white and dobby border constructions for hotel, healthcare and commercial laundry procurement. Available in face, hand and bath sizes. Case packs of 120 pieces. OEKO-TEX Standard 100 and GOTS certified.",
              image:
                "https://mzglobaltrading.com/images/og/institutional-towels-og.webp",
              brand: {
                "@type": "Brand",
                name: "MZ Global Trading",
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                seller: {
                  "@type": "Organization",
                  name: "MZ Global Trading",
                },
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
                    name: "Bath Linen",
                    item: "https://mzglobaltrading.com/hometextile/bathlinen/",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Institutional Towels",
                    item: "https://mzglobaltrading.com/hometextile/bathlinen/institutionaltowels/",
                  },
                ],
              },
            }),
          }}
        />
        <InstitutionalTowelsContent />
      </main>
      <Footer />
    </>
  );
}
