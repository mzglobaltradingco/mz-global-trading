import type { Metadata } from "next";
import { Suspense } from "react";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import SearchContent from "./SearchContent";

export const metadata: Metadata = {
  title: "Search | MZ Global Trading",
  description:
    "Search MZ Global Trading's full product range, sourcing guides, downloads and knowledge hub articles. Apparel, home textiles and fabric for B2B buyers.",
  robots: { index: false, follow: true },
};

function SearchSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="bg-navy-900 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="h-4 w-24 bg-white/10 rounded mb-4 animate-pulse" />
          <div className="h-10 w-80 bg-white/10 rounded mb-6 animate-pulse" />
          <div className="h-14 bg-white/10 rounded-xl animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <Suspense fallback={<SearchSkeleton />}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
