import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ContactUsContent from "./ContactUsContent";

export const metadata = buildMetadata({
  title: "Contact Us | MZ Global Trading",
  description:
    "Contact MZ Global Trading — Pakistan's B2B textile sourcing partner for brands and retailers in USA, UK, Canada, Europe and South America.",
  canonical: "/contact-us/",
  ogImage: "/images/og/contact-us-og.webp",
  ogImageAlt: "Contact MZ Global Trading — Pakistan B2B Textile Sourcing",
  keywords: ["contact MZ Global Trading", "textile sourcing enquiry", "Pakistan textile supplier contact"],
});

export default function ContactUsPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <ContactUsContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "url": "https://www.mzglobaltrading.com/contact-us/",
            "name": "Contact MZ Global Trading",
            "description":
              "Contact page for MZ Global Trading — B2B textile sourcing enquiries for international buyers in USA, UK, Canada, Europe and South America.",
            "primaryImageOfPage": {
              "@type": "ImageObject",
              contentUrl: "https://www.mzglobaltrading.com/images/og/contact-us-og.webp",
              name: "Contact MZ Global Trading — Pakistan B2B textile sourcing partner",
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
                  "name": "Contact Us",
                  "item": "https://www.mzglobaltrading.com/contact-us/",
                },
              ],
            },
            "mainEntity": {
              "@type": "Organization",
              "@id": "https://www.mzglobaltrading.com/#organization",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+92-300-8256203",
                "email": "info@mzglobaltrading.com",
                "contactType": "sales",
                "availableLanguage": "English",
                "areaServed": ["US", "CA", "GB", "DE", "FR", "NL", "IT", "ES", "BR", "AR"],
              },
            },
          }),
        }}
      />
    </>
  );
}
