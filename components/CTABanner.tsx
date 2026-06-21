import Link from "next/link";
import AnimateInView from "./AnimateInView";

export default function CTABanner() {
  return (
    <section className="py-12 sm:py-16 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateInView className="text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Ready to Source?
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
            Looking for a Reliable{" "}
            <span className="text-gold">Sourcing Partner?</span>
          </h2>
          <Link
            href="/rfq/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold text-navy-900 text-sm font-bold rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
          >
            Request a Quote →
          </Link>
        </AnimateInView>
      </div>
    </section>
  );
}
