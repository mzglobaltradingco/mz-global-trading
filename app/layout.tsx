import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PageTransitionWrapper from "./PageTransitionWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mzglobaltrading.com"),
  title: {
    default: "MZ Global Trading | Apparel, Home Textile & Fabric Sourcing",
    template: "%s | MZ Global Trading",
  },
  description:
    "B2B textile sourcing partner for brands and retailers in the USA, UK, Canada, and Europe. Source apparel, home textiles, and fabric from Pakistan's certified manufacturers.",
  keywords: [
    "apparel manufacturer Pakistan",
    "home textile supplier wholesale",
    "towels manufacturer exporter",
    "OEM garment manufacturer",
    "textile sourcing partner USA UK",
    "fabric wholesale supplier Europe",
    "ethical textile manufacturer",
    "B2B textile sourcing",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MZ Global Trading | Apparel, Home Textile & Fabric Sourcing",
    description:
      "B2B textile sourcing partner for brands and retailers in the USA, UK, Canada, and Europe. Certified manufacturers, competitive pricing, global shipping.",
    url: "https://mzglobaltrading.com/",
    siteName: "MZ Global Trading",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og/homepage-og-image.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading — Pakistan Textile Sourcing Partner for Apparel, Home Textiles and Fabric",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MZ Global Trading | Apparel, Home Textile & Fabric Sourcing",
    description:
      "B2B textile sourcing partner for brands and retailers in the USA, UK, Canada, and Europe.",
    images: ["/images/og/homepage-og-image.webp"],
  },
  icons: {
    // Favicons must remain PNG — browsers and iOS require PNG format for system icons
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://mzglobaltrading.com/#organization",
  name: "MZ Global Trading",
  url: "https://mzglobaltrading.com",
  logo: {
    "@type": "ImageObject",
    url: "https://mzglobaltrading.com/images/logo/Master_Logo.webp",
    width: 220,
    height: 60,
  },
  description:
    "Pakistan-based B2B textile sourcing company supplying apparel, home textiles, and fabric to international brands and retailers in North America, South America, UK, and Europe.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PK",
    addressLocality: "Karachi",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "mzglobaltradingco@gmail.com",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.facebook.com/mzglobaltradingco/",
    "https://www.linkedin.com/company/mzglobaltrading",
  ],
  areaServed: [
    // Primary markets
    "US", "CA", "GB",
    "DE", "FR", "NL", "IT", "ES", "BE", "SE", "NO", "DK", "FI",
    "CH", "AT", "PL", "PT", "IE", "CZ", "HU", "RO", "GR",
    // South America
    "BR", "AR", "CL", "CO", "PE", "MX",
  ],
  knowsAbout: [
    "Apparel Manufacturing",
    "Home Textile Sourcing",
    "Fabric Sourcing",
    "OEM Manufacturing",
    "Textile Quality Control",
    "International Textile Export",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="antialiased">
        {/* Skip to main content — keyboard / screen reader navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gold focus:text-navy-900 focus:font-bold focus:rounded focus:outline-none"
        >
          Skip to main content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <PageTransitionWrapper>{children}</PageTransitionWrapper>
      </body>
    </html>
  );
}
