import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import HospitalLinenContent from "./HospitalLinenContent";

export const metadata = buildMetadata({
  title: "Hospital Linen Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan hospital linen manufacturer — surgical gowns, medical scrubs, patient gowns and huck towels. ISO 9001, ISO 13485, BSCI certified healthcare textile export.",
  canonical: "/hometextile/hospitallinen/",
  ogImage: "/images/og/hospital-linen-og.webp",
  ogImageAlt: "Pakistan hospital linen manufacturer — healthcare-grade surgical gowns, scrubs and medical textiles for global buyers",
  keywords: [
    "hospital linen manufacturer Pakistan",
    "medical linen supplier Pakistan",
    "surgical gowns manufacturer Pakistan",
    "medical scrubs supplier Pakistan",
    "healthcare textile Pakistan",
    "hospital textile export Pakistan",
    "ISO 13485 medical linen Pakistan",
    "BSCI hospital linen supplier",
  ],
});

export default function HospitalLinenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://www.mzglobaltrading.com/hometextile/hospitallinen/",
            name: "Hospital Linen Manufacturer Pakistan | MZ Global Trading",
            description:
              "Healthcare-grade linen manufactured in Pakistan's ISO-certified facilities. Surgical gowns, medical scrubs, patient gowns and surgical huck towels. Anti-bacterial, fluid-repellent, sterilizable finishes. ISO 9001, ISO 13485, BSCI certified.",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://www.mzglobaltrading.com/images/og/hospital-linen-og.webp",
              name: "Pakistan hospital linen manufacturer — healthcare-grade surgical gowns, scrubs and medical textiles for global buyers",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Home Textiles",
                  item: "https://www.mzglobaltrading.com/hometextile/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Hospital Linen",
                  item: "https://www.mzglobaltrading.com/hometextile/hospitallinen/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <HospitalLinenContent />
      </main>
      <Footer />
    </>
  );
}
