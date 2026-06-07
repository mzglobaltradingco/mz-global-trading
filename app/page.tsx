import MegaMenu from "@/components/MegaMenu";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import SourcingCapabilities from "@/components/SourcingCapabilities";
import WhyUs from "@/components/WhyUs";
import ProcessSteps from "@/components/ProcessSteps";
import CertificationsStrip from "@/components/CertificationsStrip";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <MegaMenu />
      <main>
        <Hero />
        <StatsBar />
        <SourcingCapabilities />
        <WhyUs />
        <ProcessSteps />
        <CertificationsStrip />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
