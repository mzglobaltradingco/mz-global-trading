import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PageTransitionWrapper from "./PageTransitionWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mzglobaltrading.com"),
  title: "MZ Global Trading | Apparel, Home Textile & Fabric Sourcing",
  description:
    "Your trusted partner in apparel, home textiles, and fabric sourcing. We connect international buyers with Pakistan's best manufacturers.",
  keywords: [
    "textile sourcing",
    "apparel sourcing",
    "home textile",
    "towels manufacturer",
    "Pakistan textile",
    "fabric sourcing",
    "B2B textile",
  ],
  openGraph: {
    title: "MZ Global Trading | Apparel, Home Textile & Fabric Sourcing",
    description:
      "Your trusted partner in apparel, home textiles, and fabric sourcing from Pakistan.",
    url: "https://mzglobaltrading.com",
    siteName: "MZ Global Trading",
    images: [
      {
        url: "/images/og/homepage-og-image.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading",
      },
    ],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32" },
      { url: "/favicon-192.png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="antialiased">
        <PageTransitionWrapper>{children}</PageTransitionWrapper>
      </body>
    </html>
  );
}
