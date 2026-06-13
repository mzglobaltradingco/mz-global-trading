"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  viewportOnce,
} from "@/lib/animations";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryId =
  | "all"
  | "ordering"
  | "quality"
  | "certifications"
  | "shipping"
  | "commercial";

interface FAQ {
  id: number;
  category: Exclude<CategoryId, "all">;
  question: string;
  answer: React.ReactNode;
  searchText?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All Questions" },
  { id: "ordering", label: "Sourcing & Orders" },
  { id: "quality", label: "Quality & QC" },
  { id: "certifications", label: "Certifications" },
  { id: "shipping", label: "Shipping & Logistics" },
  { id: "commercial", label: "Pricing & Terms" },
];

const faqs: FAQ[] = [
  // ── Sourcing & Orders ────────────────────────────────────────────────────────
  {
    id: 1,
    category: "ordering",
    question: "What is the minimum order quantity (MOQ)?",
    answer: (
      <>
        MOQ varies from product to product. Normally the MOQ is 2,000 metres per colour per
        design/style. MOQs remain negotiable depending on the product type, and repeat customers
        are given special consideration. Submit your specific requirements through our{" "}
        <Link href="/rfq/" className="text-gold hover:underline font-medium">
          RFQ form
        </Link>{" "}
        and we will confirm the applicable MOQ.
      </>
    ),
    searchText:
      "MOQ varies from product to product. Normally 2,000 metres per colour per design/style. Negotiable depending on product type; repeat customers given special consideration.",
  },
  {
    id: 2,
    category: "ordering",
    question: "How long does the process take from enquiry to shipment?",
    answer: (
      <>
        From RFQ submission to shipment, expect 45–60 days for standard apparel, 45–75 days for
        home textiles and 30–45 days for fabric. Complex apparel such as workwear and formal
        garments requires 60–90 days. These timelines include{" "}
        <Link href="/qualitycompliance/qualitycontrol/" className="text-gold hover:underline font-medium">
          pre-production sample approval
        </Link>
        {" "}(10–21 days), bulk production and{" "}
        <Link href="/qualitycompliance/inspectionprocess/" className="text-gold hover:underline font-medium">
          pre-shipment inspection
        </Link>
        . Lead times run from sample approval — not from order placement. Depending on factory
        workload, timelines may extend to 120 days or more. All timelines discussed are tentative
        and not binding — they depend on production schedules, scope of work, complexity and
        seasonality.
      </>
    ),
    searchText:
      "45–60 days standard apparel, 45–75 days home textiles, 30–45 days fabric. May extend to 120 days or more depending on factory workload. All timelines tentative, not binding.",
  },
  {
    id: 3,
    category: "ordering",
    question: "Do you provide samples before bulk orders?",
    answer: (
      <>
        Yes. Pre-production samples are produced for every new product before bulk production
        begins. Sample charges may apply depending on the product type and complexity, and are
        typically credited against the bulk order value on confirmation. Sample lead times are
        10–21 days depending on product type and complexity. For standard catalogue products,
        reference samples may be available at reduced cost. Request samples
        through the{" "}
        <Link href="/rfq/" className="text-gold hover:underline font-medium">
          RFQ form
        </Link>
        .
      </>
    ),
    searchText:
      "Pre-production samples produced for every new product. Sample charges may apply, typically credited against bulk order. 10–21 days lead time.",
  },
  {
    id: 4,
    category: "ordering",
    question: "Can we consolidate multiple product categories into one shipment?",
    answer:
      "Yes. MZ Global Trading coordinates cross-category consolidated shipments from multiple factories into a single container, reducing per-unit logistics costs. This is common for buyers sourcing apparel, home textiles and fabric simultaneously. MOQ compliance is mandatory for each product in a cross-product consolidated order. Shipment timing is aligned to the longest production lead time across all items in the consolidated order.",
  },
  // ── Quality & QC ─────────────────────────────────────────────────────────────
  {
    id: 5,
    category: "quality",
    question: "What AQL standard do you apply to pre-shipment inspections?",
    answer: (
      <>
        Depending on the agreed scope of work, we apply ISO 2859-1 AQL Level II as standard:
        Critical defects = 0 (zero tolerance), Major defects = AQL 2.5, Minor defects = AQL 4.0.
        Shipments are only released on a PASS result. A
        CONDITIONAL PASS requires the factory to 100% sort affected units before re-inspection. A
        FAIL triggers an immediate hold at the factory&apos;s expense. Learn more on our{" "}
        <Link href="/qualitycompliance/qualitycontrol/" className="text-gold hover:underline font-medium">
          Quality Control page
        </Link>
        .
      </>
    ),
    searchText:
      "ISO 2859-1 AQL Level II: Critical 0, Major 2.5, Minor 4.0. Shipments only released on PASS. FAIL triggers immediate hold at factory expense.",
  },
  {
    id: 6,
    category: "quality",
    question: "Is quality inspection conducted by MZ Global Trading or the factory?",
    answer: (
      <>
        Depending on the agreed scope of work with the buyer, MZ Global Trading charges for
        conducting inspections. However, we ensure the factory&apos;s own quality department checks
        are in place on every order. As standard practice — at no charge — we conduct checks at the
        time of pre-production samples and post-production samples, along with prior to shipment.
        Fully independent third-party inspection through SGS, Intertek or Bureau Veritas can also
        be arranged at additional cost. See our full{" "}
        <Link href="/qualitycompliance/inspectionprocess/" className="text-gold hover:underline font-medium">
          8-stage inspection process
        </Link>
        .
      </>
    ),
    searchText:
      "MZ Global Trading charges for inspections per agreed scope of work. Factory quality department checks in place. Standard practice checks at pre-production samples, post-production samples and prior to shipment. Third-party SGS Intertek Bureau Veritas available.",
  },
  {
    id: 7,
    category: "quality",
    question: "What does the pre-shipment inspection report include?",
    answer: (
      <>
        Every report includes: order reference and inspection date, sample size and AQL methodology,
        defect classification and count (critical/major/minor), measurement results vs
        specification, photographic evidence of all defects, AQL pass/fail determination and
        corrective action requirements. Reports are shared digitally within 24 hours. View the full
        scope on our{" "}
        <Link href="/qualitycompliance/inspectionprocess/" className="text-gold hover:underline font-medium">
          Inspection Process page
        </Link>
        .
      </>
    ),
    searchText:
      "Report includes defect classification count, measurement results, photographic evidence, AQL pass/fail. Shared within 24 hours.",
  },
  {
    id: 8,
    category: "quality",
    question: "What happens if goods fail the pre-shipment inspection?",
    answer:
      "The shipment is held immediately and the buyer is notified the same day. MZ Global Trading escalates to the factory for root cause analysis. The factory bears all rework and re-inspection costs. Progress is monitored by our team and a re-inspection is booked only after the factory confirms corrective actions are complete and verified.",
  },
  // ── Certifications ───────────────────────────────────────────────────────────
  {
    id: 9,
    category: "certifications",
    question: "Which certifications are available across your factory network?",
    answer: (
      <>
        Our factory network covers:{" "}
        <Link href="/qualitycompliance/certifications/" className="text-gold hover:underline font-medium">
          GOTS, OEKO-TEX Standard 100, BSCI, Sedex, ISO 9001, GRS, WRAP, BCI, SA8000 and Bluesign
        </Link>
        . Certification availability varies by factory and product category. Please note: the more
        certified the product, the more direct the impact on its unit cost. Specify your required
        certifications in the{" "}
        <Link href="/rfq/" className="text-gold hover:underline font-medium">
          RFQ form
        </Link>{" "}
        and we will match you with appropriately certified factories.
      </>
    ),
    searchText:
      "Factory network covers GOTS, OEKO-TEX, BSCI, Sedex, ISO 9001, GRS, WRAP, BCI, SA8000 and Bluesign. More certified products increase unit cost. Specify required certifications in RFQ.",
  },
  {
    id: 10,
    category: "certifications",
    question: "What is the difference between GOTS and OEKO-TEX certification?",
    answer: (
      <>
        GOTS certifies the entire supply chain from raw organic cotton farming through processing
        and manufacturing, requiring minimum 95% certified organic fibre content. OEKO-TEX Standard
        100 tests the finished product for harmful substances regardless of whether the input fibre
        is organic. For organic product labelling claims, GOTS is required. For chemical safety
        claims only, OEKO-TEX suffices. Full details on our{" "}
        <Link href="/qualitycompliance/certifications/" className="text-gold hover:underline font-medium">
          Certifications page
        </Link>
        .
      </>
    ),
    searchText:
      "GOTS certifies entire supply chain from organic cotton farming. OEKO-TEX tests finished product for harmful substances. GOTS required for organic labelling claims.",
  },
  {
    id: 11,
    category: "certifications",
    question: "How can I verify that your certifications are current?",
    answer: (
      <>
        All certifications can be independently verified through the issuing bodies: GOTS at
        global-standard.org, OEKO-TEX at oeko-tex.com, BSCI through amfori.org, ISO 9001 through
        the issuing registrar. We provide certificate copies with the formal quotation. View our
        current{" "}
        <Link href="/qualitycompliance/certifications/" className="text-gold hover:underline font-medium">
          certifications overview
        </Link>
        {" "}and encourage independent verification before order placement.
      </>
    ),
    searchText:
      "Verify GOTS at global-standard.org, OEKO-TEX at oeko-tex.com, BSCI through amfori.org. Certificate copies provided with formal quotation.",
  },
  {
    id: 12,
    category: "certifications",
    question: "Do all factories hold the same certifications?",
    answer: (
      <>
        No. Certification coverage varies by factory and product type. Medical and hospital linen
        factories hold ISO 13485 and EN 13795. Baby apparel factories carry OEKO-TEX Class 1 and
        GOTS. Workwear factories hold ISO 9001 and WRAP. We maintain a certification matrix and
        match your compliance requirements to the correct factory. See all available certifications
        on our{" "}
        <Link href="/qualitycompliance/certifications/" className="text-gold hover:underline font-medium">
          Certifications page
        </Link>
        .
      </>
    ),
    searchText:
      "Certification coverage varies by factory. Medical holds ISO 13485, baby apparel OEKO-TEX Class 1 and GOTS, workwear ISO 9001 and WRAP.",
  },
  // ── Shipping & Logistics ──────────────────────────────────────────────────────
  {
    id: 13,
    category: "shipping",
    question: "What incoterms do you offer?",
    answer:
      "The incoterms we confidently offer are FOB, CIF and CFR/CNF. FOB Karachi or FOB Port Qasim is the most common arrangement, giving buyers full visibility of origin costs while using their preferred freight forwarder. For buyers who prefer a landed cost, CIF or CFR to your destination port is available. DDP may be considered for our existing customers, depending on global challenges and risks.",
  },
  {
    id: 14,
    category: "shipping",
    question: "What are the typical production lead times?",
    answer: (
      <>
        Standard apparel: 45–60 days; complex apparel and workwear: 60–90 days; home textiles:
        45–75 days; fabric: 30–45 days. All lead times run from{" "}
        <Link href="/qualitycompliance/qualitycontrol/" className="text-gold hover:underline font-medium">
          pre-production sample approval
        </Link>
        , not from order placement. Rush production for standard products may be available on
        enquiry. Depending on factory workload, lead times may extend to 120 days or more. All
        timelines discussed are tentative and not binding — they depend on production schedules,
        scope of work, complexity and seasonality.
      </>
    ),
    searchText:
      "Standard apparel 45–60 days, complex 60–90 days, home textiles 45–75 days, fabric 30–45 days. May extend to 120 days or more depending on factory workload. All timelines tentative, not binding.",
  },
  {
    id: 15,
    category: "shipping",
    question: "Which ports do shipments depart from?",
    answer:
      "Shipments depart from Port Qasim (primary) or Karachi Port, both in Karachi. These are Pakistan's principal export gateways served by all major global shipping lines. Sea freight transit to major European, UK and US ports typically takes 25–35 days. All export documentation is prepared and verified before departure.",
  },
  {
    id: 16,
    category: "shipping",
    question: "Can we appoint our own third-party inspector?",
    answer: (
      <>
        Yes. Buyers may appoint their preferred inspection agency (SGS, Intertek, Bureau Veritas)
        at their own cost. We coordinate factory access and provide the inspection appointment
        window. We recommend booking inspection at 80–100% production completion. At least 5
        business days&apos; notice is required. See our{" "}
        <Link href="/qualitycompliance/inspectionprocess/" className="text-gold hover:underline font-medium">
          inspection process
        </Link>{" "}
        for full details.
      </>
    ),
    searchText:
      "Buyers may appoint SGS, Intertek, Bureau Veritas at own cost. We coordinate factory access. Minimum 5 business days notice required.",
  },
  // ── Pricing & Terms ───────────────────────────────────────────────────────────
  {
    id: 17,
    category: "commercial",
    question: "What payment terms do you offer?",
    answer: (
      <>
        Standard terms are 30% deposit on order confirmation, 70% balance against copy of bill of
        lading before shipment release. Payment is by bank transfer (T/T) in USD. LC at sight is
        also entertained through reliable banking channels. We do not prefer to work on D/A terms.
        Extended terms may be discussed for established buyers with order history. Submit an{" "}
        <Link href="/rfq/" className="text-gold hover:underline font-medium">
          RFQ
        </Link>{" "}
        to begin the order process.
      </>
    ),
    searchText:
      "30% deposit on confirmation, 70% balance against bill of lading. T/T in USD. LC at sight entertained through reliable banking channels. D/A not preferred. Extended terms for established buyers.",
  },
  {
    id: 18,
    category: "commercial",
    question: "What does the FOB price include?",
    answer: (
      <>
        FOB prices include the factory production cost, local transport to port and export
        documentation (commercial invoice, packing list, bill of lading, certificate of origin).{" "}
        <Link href="/qualitycompliance/qualitycontrol/" className="text-gold hover:underline font-medium">
          QC and inspection services
        </Link>{" "}
        are not included in FOB pricing and are quoted separately per the agreed scope of work.
        Pre-shipment third-party inspection (SGS, Intertek) is also quoted separately. Freight,
        insurance, customs duties and destination import taxes are excluded from FOB pricing.
      </>
    ),
    searchText:
      "FOB includes factory cost, local transport, export documentation. QC and inspection services not included, quoted separately per agreed scope. Freight and duties excluded.",
  },
  {
    id: 19,
    category: "commercial",
    question: "Do unit prices decrease with larger order volumes?",
    answer:
      "Yes — depending on the product type, larger volumes do help decrease the unit price. Volume thresholds differ per product and are confirmed in the formal quotation. Consolidated orders across multiple SKUs may also qualify for volume pricing if the total order value meets the applicable threshold in the quotation.",
  },
  {
    id: 20,
    category: "commercial",
    question: "How long is a formal quotation valid?",
    answer: (
      <>
        Quotation validity is normally 5–7 days — however, please check the validity stated on the
        quotation you receive. Due to global and local resource challenges, validities are
        sometimes tighter; when conditions allow, they can be more flexible as well. We recommend
        confirming your order within the stated validity period to hold the quoted price. Submit a
        new{" "}
        <Link href="/rfq/" className="text-gold hover:underline font-medium">
          RFQ
        </Link>{" "}
        if your requirements change after expiry.
      </>
    ),
    searchText:
      "Quotation validity normally 5–7 days, check the validity stated on your quotation. Sometimes tighter or more flexible depending on global and local resource conditions.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FAQsContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  // Single-open accordion: opening one entry closes any other
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    setOpenId(null);
  }, [activeCategory, searchQuery]);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const counts = useMemo<Record<CategoryId, number>>(() => {
    const c: Record<CategoryId, number> = {
      all: faqs.length,
      ordering: 0,
      quality: 0,
      certifications: 0,
      shipping: 0,
      commercial: 0,
    };
    faqs.forEach((f) => { c[f.category]++; });
    return c;
  }, []);

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCat = activeCategory === "all" || faq.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const textToSearch =
        typeof faq.answer === "string" ? faq.answer : (faq.searchText ?? "");
      const matchesSearch =
        q === "" ||
        faq.question.toLowerCase().includes(q) ||
        textToSearch.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const hasFilters = activeCategory !== "all" || searchQuery !== "";

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-why-choose-us.webp"
        imageAlt="MZ Global Trading frequently asked questions — textile sourcing guidance for international buyers"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Corporate" },
          { label: "FAQs" },
        ]}
        label="Resources"
        title="Frequently Asked"
        titleGold="Questions"
        description="20 questions from procurement managers and import buyers — answered clearly, with links to deeper resources."
        pills={["20 Questions", "5 Categories", "B2B Focused"]}
      />

      {/* ── Search + Layout ───────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-gray-50 min-h-[560px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search bar */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-10 max-w-2xl mx-auto"
          >
            <div className="relative group">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gold transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions…"
                aria-label="Search frequently asked questions"
                className="w-full pl-11 pr-10 py-4 bg-white border border-gray-200 rounded-xl text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>

          <div className="flex gap-10">

            {/* ── Desktop sidebar — sticky wrapper on container, NOT on buttons ──── */}
            <div className="hidden lg:block w-52 flex-shrink-0">
              <div className="sticky top-36">
                <motion.nav
                  variants={staggerContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="flex flex-col gap-1"
                  aria-label="FAQ categories"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-3">
                    Categories
                  </p>
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      variants={staggerItemVariants}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${
                        activeCategory === cat.id
                          ? "bg-navy-900 text-white shadow-sm"
                          : "text-gray-600 hover:bg-white hover:text-navy-900 hover:shadow-sm"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`ml-2 text-xs px-2 py-0.5 rounded-full font-bold ${
                          activeCategory === cat.id
                            ? "bg-gold/20 text-gold"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {counts[cat.id]}
                      </span>
                    </motion.button>
                  ))}
                </motion.nav>
              </div>
            </div>

            {/* ── Main content ────────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Mobile tabs */}
              <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1" role="tablist">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat.id
                        ? "bg-navy-900 text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    {cat.label}
                    <span className="ml-1.5 opacity-60">{counts[cat.id]}</span>
                  </button>
                ))}
              </div>

              {/* Result count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-gray-400">
                  {filtered.length === faqs.length
                    ? `Showing all ${faqs.length} questions`
                    : `${filtered.length} of ${faqs.length} questions`}
                </p>
                {hasFilters && (
                  <button
                    onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                    className="text-xs text-gold font-semibold hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* FAQ List */}
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-navy-900 font-semibold mb-1">No questions found</p>
                  <p className="text-gray-500 text-sm mb-4">Try different keywords or browse all categories.</p>
                  <button
                    onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                    className="text-gold font-semibold text-sm hover:underline"
                  >
                    Show all questions
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((faq, i) => (
                      <motion.div
                        key={faq.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.22, delay: i * 0.025 }}
                        className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all"
                      >
                        <button
                          onClick={() => toggle(faq.id)}
                          className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
                          aria-expanded={openId === faq.id}
                        >
                          <div className="flex items-start gap-4">
                            <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-gray-50 group-hover:bg-gold/10 flex items-center justify-center transition-colors">
                              <span className="text-[10px] font-bold text-gray-400 group-hover:text-gold transition-colors">
                                {String(faq.id).padStart(2, "0")}
                              </span>
                            </span>
                            <span className="font-semibold text-navy-900 text-sm leading-snug">
                              {faq.question}
                            </span>
                          </div>
                          <motion.span
                            animate={{ rotate: openId === faq.id ? 180 : 0 }}
                            transition={{ duration: 0.22 }}
                            className="flex-shrink-0 mt-0.5 text-gray-400 group-hover:text-gold transition-colors"
                            aria-hidden="true"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {openId === faq.id && (
                            <motion.div
                              key="answer"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.26, ease: [0.04, 0.62, 0.23, 0.98] }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-5 pl-16 border-t border-gray-50">
                                <div className="pt-4 text-gray-600 text-sm leading-relaxed">
                                  {faq.answer}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Mandatory inspection-charges notice */}
              <div className="mt-8 bg-amber-50 border-l-4 border-gold rounded-r-xl px-5 py-4">
                <p className="text-amber-800 text-xs sm:text-sm leading-relaxed">
                  <strong>Please note:</strong> all quality inspections are chargeable, except for
                  standard-practice checks conducted at the time of pre-production samples and
                  post-production samples, along with prior to shipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore product categories ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Product Ranges
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
              Explore What We Source
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                label: "Apparel",
                desc: "Knitted and woven garments, baby & kids, workwear and socks — from Pakistan's certified garment factories.",
                href: "/apparel/",
                image: "/images/cards/cat-banner-apparel.webp",
                alt: "Pakistan apparel manufacturer — knitted and woven garments for retail buyers in USA, UK and Europe",
                cta: "Browse Apparel →",
              },
              {
                label: "Home Textiles",
                desc: "Bath linen, bed linen, kitchen and table linen, blankets, hospital and industrial linen.",
                href: "/hometextile/",
                image: "/images/cards/cat-banner-home-textiles.webp",
                alt: "Pakistan home textile manufacturer — towels, bed linen and institutional textiles for international buyers",
                cta: "Browse Home Textiles →",
              },
              {
                label: "Fabric",
                desc: "Knitted, woven and terry fabric by the roll — apparel fabric and home textile fabric.",
                href: "/fabric/",
                image: "/images/cards/cat-banner-fabric.webp",
                alt: "Pakistan fabric manufacturer — knitted and woven fabric rolls for garment and home textile production",
                cta: "Browse Fabric →",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gold hover:shadow-lg transition-all h-full"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" aria-hidden="true" />
                    <p className="absolute bottom-4 left-5 text-white font-bold text-lg">{item.label}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                    <span className="inline-flex items-center text-navy-900 text-sm font-bold group-hover:text-gold transition-colors">
                      {item.cta}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Ready to Source?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start Your Sourcing Enquiry
            </h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
              Submit a structured RFQ and receive a formal quotation within 3–5 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Request a Quote →
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
