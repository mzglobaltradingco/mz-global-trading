import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import WhyChooseUsContent from "./WhyChooseUsContent";

export const metadata: Metadata = {
  title: "Why Choose MZ Global Trading | Textile Sourcing Partner",
  description:
    "Discover why international buyers choose MZ Global Trading — certified factories, competitive pricing, ethical sourcing, 95% on-time delivery, and custom solutions.",
  openGraph: {
    title: "Why Choose MZ Global Trading | Textile Sourcing Partner",
    description: "Quality assurance, ethical sourcing, 500+ certified factories, and 95% on-time delivery.",
    url: "https://mzglobaltrading.com/whychooseus/",
  },
};

export default function WhyChooseUsPage() {
  return (
    <>
      <MegaMenu />
      <main>
        <WhyChooseUsContent />
      </main>
      <Footer />
    </>
  );
}
