import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ContactUsContent from "./ContactUsContent";

export const metadata: Metadata = {
  title: "Contact Us | MZ Global Trading",
  description:
    "Contact MZ Global Trading — Pakistan's B2B textile sourcing partner for brands and retailers in USA, UK, Canada, Europe and South America.",
  keywords: ["contact MZ Global Trading", "textile sourcing enquiry", "Pakistan textile supplier contact"],
  alternates: {
    canonical: "/contact-us/",
    languages: {
      "en": "https://mzglobaltrading.com/contact-us/",
      "x-default": "https://mzglobaltrading.com/contact-us/",
    },
  },
  openGraph: {
    title: "Contact Us | MZ Global Trading",
    description:
      "Reach out to MZ Global Trading — Pakistan's trusted B2B textile sourcing partner. We respond to all enquiries within one business day.",
    url: "https://mzglobaltrading.com/contact-us/",
    images: [
      {
        url: "/images/og/contact-us-og.webp",
        width: 1200,
        height: 630,
        alt: "Contact MZ Global Trading — Pakistan B2B Textile Sourcing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | MZ Global Trading",
    description:
      "Reach out to MZ Global Trading — Pakistan's trusted B2B textile sourcing partner. Response within one business day.",
  },
};

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
            "url": "https://mzglobaltrading.com/contact-us/",
            "name": "Contact MZ Global Trading",
            "description":
              "Contact page for MZ Global Trading — B2B textile sourcing enquiries for international buyers in USA, UK, Canada, Europe and South America.",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Contact Us",
                  "item": "https://mzglobaltrading.com/contact-us/",
                },
              ],
            },
            "mainEntity": {
              "@type": "Organization",
              "@id": "https://mzglobaltrading.com/#organization",
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
