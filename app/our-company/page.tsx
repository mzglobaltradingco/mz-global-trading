import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import OurCompanyContent from "./OurCompanyContent";

export const metadata = buildMetadata({
  title: "About Us | MZ Global Trading",
  description:
    "MZ Global Trading — Pakistan B2B textile sourcing partner for brands in USA, UK and Europe. 50+ vetted factories, 10+ certifications, 35+ markets.",
  canonical: "/our-company/",
  ogImage: "/images/og/homepage-og-image.webp",
  ogImageAlt: "About MZ Global Trading — Pakistan Textile Sourcing Company",
  keywords: [
    "about MZ Global Trading",
    "Pakistan textile sourcing company",
    "B2B textile supplier Pakistan",
    "textile sourcing partner Karachi",
    "certified textile manufacturer Pakistan",
    "apparel home textiles fabric sourcing Pakistan",
    "textile exporter Pakistan USA UK Europe",
  ],
});

export default function OurCompanyPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <OurCompanyContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "url": "https://www.mzglobaltrading.com/our-company/",
            "name": "About MZ Global Trading",
            "description":
              "MZ Global Trading is a Karachi-based B2B textile sourcing company connecting international brands, importers and retailers with certified Pakistani manufacturers across apparel, home textiles and fabric.",
            "inLanguage": "en",
            "mainEntity": { "@id": "https://www.mzglobaltrading.com/#organization" },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "contentUrl": "https://www.mzglobaltrading.com/images/hero/hero-about.webp",
              "name": "Textile factory floor in Pakistan — MZ Global Trading vetted sourcing network",
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About Us",
                  "item": "https://www.mzglobaltrading.com/our-company/",
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
