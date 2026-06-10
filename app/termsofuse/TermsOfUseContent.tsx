"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

// ─── Section map ──────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "acceptance",          label: "1. Acceptance" },
  { id: "about-scope",         label: "2. About & Scope" },
  { id: "permitted-use",       label: "3. Permitted Use" },
  { id: "intellectual-property", label: "4. Intellectual Property" },
  { id: "rfq-submissions",     label: "5. RFQ Submissions" },
  { id: "no-warranties",       label: "6. No Warranties" },
  { id: "liability",           label: "7. Liability" },
  { id: "third-party-links",   label: "8. Third-Party Links" },
  { id: "governing-law",       label: "9. Governing Law" },
  { id: "changes-contact",     label: "10. Changes & Contact" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TermsSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-9 border-t border-gray-100 scroll-mt-44">
      <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-5 leading-snug">
        {title}
      </h2>
      <div className="space-y-4 text-gray-600 text-base leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-navy-900 font-semibold text-base mt-7 mb-2 leading-snug">
      {children}
    </h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function InfoBox({
  variant = "default",
  children,
}: {
  variant?: "default" | "warning";
  children: React.ReactNode;
}) {
  const base = "rounded-xl p-5 text-sm leading-relaxed";
  const styles =
    variant === "warning"
      ? `${base} bg-gold/8 border border-gold/25`
      : `${base} bg-navy-900/4 border border-navy-900/8`;
  return <div className={styles}>{children}</div>;
}

// ─── Use table ────────────────────────────────────────────────────────────────

const PERMITTED = [
  "Browse product and service information for commercial sourcing purposes",
  "Submit RFQ forms to request pricing and availability information",
  "Contact us via the enquiry form or published contact details",
  "Share links to pages on this website for legitimate business purposes",
  "Download any documents or resources we explicitly make available",
];

const PROHIBITED = [
  "Automated scraping, crawling, or indexing of content beyond standard search engine indexing",
  "Reproducing, republishing, or redistributing any website content without written permission",
  "Misrepresenting your identity, company, or purchasing authority when submitting enquiries",
  "Submitting false, speculative, or fraudulent RFQs with no genuine sourcing intent",
  "Attempting to gain unauthorised access to any part of this website or its infrastructure",
  "Reverse-engineering our factory or supplier relationships from publicly visible information",
  "Using this website in any way that violates applicable law in your jurisdiction",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TermsOfUseContent() {
  const [activeSection, setActiveSection] = useState("acceptance");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-15% 0px -75% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 160;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <>
      <PageHero
        image="/images/hero/hero-terms-of-use.webp"
        imageAlt="Professional business agreement — MZ Global Trading terms of use for international B2B textile sourcing"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Use" },
        ]}
        label="Legal"
        title="Terms of"
        titleGold="Use"
        description="The terms that govern your use of this website and your engagement with MZ Global Trading's sourcing services. Please read before submitting an enquiry."
        pills={["Effective June 2026", "Governing Law: Pakistan", "B2B Services Only"]}
      />

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-16 items-start">

            {/* ── Sticky sidebar ──────────────────────────────────────────── */}
            <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-44 self-start">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
                Contents
              </p>
              <nav aria-label="Terms sections">
                <ul className="space-y-0.5">
                  {SECTIONS.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollTo(id)}
                        className={`text-left w-full text-sm py-1.5 pl-3 border-l-2 transition-colors duration-150 ${
                          activeSection === id
                            ? "border-gold text-gold font-semibold"
                            : "border-gray-200 text-gray-500 hover:text-navy-900 hover:border-gray-400"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* ── Main content ─────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Effective date notice */}
              <div className="bg-gold/8 border border-gold/20 rounded-xl px-5 py-4 mb-2">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-navy-900">Effective date: 1 June 2026.</strong>{" "}
                  These Terms of Use govern your access to and use of the MZ Global Trading
                  website at{" "}
                  <Link href="/" className="text-gold hover:underline">
                    mzglobaltrading.com
                  </Link>{" "}
                  and any related services. By accessing this website you agree to be bound by
                  these terms. If you do not agree, please discontinue use immediately.
                </p>
              </div>

              {/* ── Section 1 ─────────────────────────────────────────────── */}
              <TermsSection id="acceptance" title="1. Acceptance of Terms">
                <p>
                  These Terms of Use (&ldquo;Terms&rdquo;) constitute a legally binding agreement
                  between you (&ldquo;you&rdquo; or &ldquo;User&rdquo;) and MZ Global Trading
                  (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a B2B textile
                  sourcing company registered and operating in Karachi, Pakistan.
                </p>
                <p>
                  By accessing or using this website — including browsing product information,
                  submitting a Request for Quotation (RFQ), or making contact through any form on
                  this site — you confirm that:
                </p>
                <BulletList items={[
                  "You are at least 18 years of age",
                  "You are acting on behalf of a registered business entity with authority to bind that entity",
                  "You have read, understood, and agree to these Terms in full",
                  "These Terms form the basis of your relationship with MZ Global Trading for all website interactions",
                ]} />
                <p>
                  These Terms apply to all visitors and users of this website, regardless of
                  geographic location. They are to be read alongside our{" "}
                  <Link href="/privacypolicy/" className="text-gold hover:underline">
                    Privacy Policy
                  </Link>
                  , which forms part of this agreement.
                </p>
              </TermsSection>

              {/* ── Section 2 ─────────────────────────────────────────────── */}
              <TermsSection id="about-scope" title="2. About MZ Global Trading & Scope">
                <p>
                  MZ Global Trading is a B2B textile sourcing intermediary based in Karachi,
                  Pakistan. We connect international brands, importers, and retailers with
                  certified textile manufacturers across apparel, home textiles, and fabric.
                </p>
                <p>
                  This website serves exclusively as a commercial information and enquiry platform
                  for business buyers. It is not:
                </p>
                <BulletList items={[
                  "An e-commerce or direct-to-consumer retail platform",
                  "A marketplace or exchange where third-party sellers list products",
                  "A platform for consumers purchasing goods for personal use",
                  "A binding catalogue — all product specifications, certifications, and availability are subject to confirmation",
                ]} />
                <InfoBox>
                  <p className="text-gray-700">
                    <strong className="text-navy-900">B2B use only.</strong> These Terms are
                    written for business-to-business interactions. Consumer protection legislation
                    in your jurisdiction may not apply to transactions or interactions conducted
                    on a business-to-business basis. If you are accessing this site as a private
                    individual rather than a business representative, please{" "}
                    <Link href="/contact-us/" className="text-gold hover:underline">
                      contact us
                    </Link>{" "}
                    before submitting any enquiry.
                  </p>
                </InfoBox>
              </TermsSection>

              {/* ── Section 3 ─────────────────────────────────────────────── */}
              <TermsSection id="permitted-use" title="3. Permitted & Prohibited Use">
                <p>
                  You may use this website only for lawful purposes and in accordance with these
                  Terms. The following summarises what is and is not permitted.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="rounded-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2.5">
                      <p className="text-navy-900 font-semibold text-sm">Permitted</p>
                    </div>
                    <ul className="divide-y divide-gray-50">
                      {PERMITTED.map((item) => (
                        <li key={item} className="px-4 py-3 text-sm text-gray-600 flex gap-2.5">
                          <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2.5">
                      <p className="text-navy-900 font-semibold text-sm">Prohibited</p>
                    </div>
                    <ul className="divide-y divide-gray-50">
                      {PROHIBITED.map((item) => (
                        <li key={item} className="px-4 py-3 text-sm text-gray-600 flex gap-2.5">
                          <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">✕</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p>
                  Violation of these use restrictions may result in immediate termination of your
                  access to this website and, where applicable, legal action. We reserve the right
                  to block access without prior notice.
                </p>
              </TermsSection>

              {/* ── Section 4 ─────────────────────────────────────────────── */}
              <TermsSection id="intellectual-property" title="4. Intellectual Property">
                <p>
                  All content on this website — including but not limited to text, product
                  descriptions, sourcing guides, photography, illustrations, logos, brand assets,
                  and website design — is the exclusive property of MZ Global Trading or its
                  licensors and is protected by applicable intellectual property laws.
                </p>

                <SubHeading>What you may not do</SubHeading>
                <BulletList items={[
                  "Copy, reproduce, or republish any content from this website without our prior written consent",
                  "Use our brand name, logos, or trademarks in any marketing, promotional, or commercial material",
                  "Claim authorship of or present our content as your own",
                  "Create derivative works based on our product descriptions, guides, or photography",
                  "Use our content to train machine learning models or populate competing databases",
                ]} />

                <SubHeading>Limited permission</SubHeading>
                <p>
                  You may print or save a single copy of individual pages for your own internal
                  business reference, provided you do not modify the content and retain all
                  copyright notices. This permission does not extend to systematic reproduction
                  or commercial redistribution.
                </p>
                <p>
                  To request permission to reproduce any content, contact us at{" "}
                  <Link href="mailto:info@mzglobaltrading.com" className="text-gold hover:underline">
                    info@mzglobaltrading.com
                  </Link>
                  .
                </p>
              </TermsSection>

              {/* ── Section 5 ─────────────────────────────────────────────── */}
              <TermsSection id="rfq-submissions" title="5. RFQ Submissions & Quotations">
                <InfoBox variant="warning">
                  <p className="text-navy-900 font-semibold mb-1">
                    An RFQ submission is not a binding contract.
                  </p>
                  <p className="text-gray-700">
                    Submitting a Request for Quotation through this website, receiving a quotation
                    from MZ Global Trading, or any email exchange regarding pricing, samples, or
                    availability does not constitute a binding commercial agreement. No contract
                    exists between you and MZ Global Trading until a formal purchase order issued
                    by you has been received and explicitly accepted by us in writing.
                  </p>
                </InfoBox>

                <SubHeading>Nature of quotations</SubHeading>
                <p>
                  All quotations, pricing indications, and product specifications provided by MZ
                  Global Trading are:
                </p>
                <BulletList items={[
                  "Estimates based on information available at the time of quoting",
                  "Subject to change based on raw material costs, currency fluctuation, factory capacity, and order volume",
                  "Valid only for the period explicitly stated in the quotation document",
                  "Dependent on final confirmation of full technical specifications (GSM, construction, certifications, labelling)",
                ]} />

                <SubHeading>Your responsibilities when submitting an RFQ</SubHeading>
                <p>
                  By submitting an RFQ you confirm that you are a legitimate business buyer with a
                  genuine sourcing requirement. You agree not to submit speculative, fictitious, or
                  competitive-intelligence-gathering enquiries. We reserve the right to decline any
                  RFQ without explanation.
                </p>

                <SubHeading>Import compliance</SubHeading>
                <p>
                  You are solely responsible for ensuring that any goods sourced through MZ Global
                  Trading comply with all import regulations, duties, licensing requirements,
                  product standards, labelling laws, and restricted goods rules applicable in your
                  destination country. MZ Global Trading provides sourcing facilitation only and
                  accepts no liability for your failure to comply with destination-country
                  regulations.
                </p>
              </TermsSection>

              {/* ── Section 6 ─────────────────────────────────────────────── */}
              <TermsSection id="no-warranties" title="6. No Warranties">
                <p>
                  This website and all information contained within it are provided on an
                  &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranty of
                  any kind, express or implied.
                </p>
                <p>To the fullest extent permitted by applicable law, we disclaim:</p>
                <BulletList items={[
                  "Any implied warranty of merchantability, fitness for a particular purpose, or non-infringement",
                  "Any warranty that the website will be uninterrupted, error-free, or free from viruses or other harmful components",
                  "Any warranty as to the accuracy, completeness, or currency of product specifications, certifications, or pricing information on this website",
                  "Any warranty that factory certifications listed are current — you must request up-to-date certification documentation directly",
                  "Any warranty as to the outcome of any sourcing engagement, including delivery timelines and production quality",
                ]} />
                <p>
                  We make reasonable efforts to keep content accurate and up to date, but the
                  textile and manufacturing industries are subject to rapid change. Always request
                  current documentation before placing any order.
                </p>
              </TermsSection>

              {/* ── Section 7 ─────────────────────────────────────────────── */}
              <TermsSection id="liability" title="7. Limitation of Liability">
                <SubHeading>Cap on liability</SubHeading>
                <p>
                  To the maximum extent permitted by applicable law, the total aggregate liability
                  of MZ Global Trading to you arising out of or in connection with your use of
                  this website or our services — whether in contract, tort (including negligence),
                  breach of statutory duty, or otherwise — shall not exceed the greater of:
                </p>
                <BulletList items={[
                  "The total fees actually paid by you to MZ Global Trading in the twelve (12) months immediately preceding the event giving rise to the claim, or",
                  "USD 500 (five hundred United States dollars)",
                ]} />

                <SubHeading>Exclusion of consequential loss</SubHeading>
                <p>
                  In no event shall MZ Global Trading be liable for any indirect, incidental,
                  special, punitive, or consequential damages — including but not limited to loss
                  of profits, loss of revenue, loss of business opportunity, loss of goodwill,
                  production delays, or supply chain disruption — even if we have been advised
                  of the possibility of such damages.
                </p>

                <SubHeading>Exceptions</SubHeading>
                <p>
                  Nothing in these Terms limits or excludes liability for:
                </p>
                <BulletList items={[
                  "Death or personal injury caused by our negligence",
                  "Fraud or fraudulent misrepresentation",
                  "Any liability that cannot be excluded or limited under applicable mandatory law",
                ]} />

                <SubHeading>Indemnification</SubHeading>
                <p>
                  You agree to indemnify, defend, and hold harmless MZ Global Trading and its
                  officers, employees, and agents from and against any claims, damages, losses,
                  and expenses (including reasonable legal fees) arising from: (a) your use of
                  this website in breach of these Terms; (b) your violation of any applicable
                  law or regulation; (c) your failure to comply with import, customs, or product
                  compliance requirements in your destination country.
                </p>
              </TermsSection>

              {/* ── Section 8 ─────────────────────────────────────────────── */}
              <TermsSection id="third-party-links" title="8. Third-Party Links">
                <p>
                  This website contains links to external platforms and services, including our
                  social media profiles on Facebook and LinkedIn, and may reference third-party
                  certification bodies, logistics providers, or industry resources.
                </p>
                <p>
                  These links are provided for your convenience only. MZ Global Trading:
                </p>
                <BulletList items={[
                  "Does not control, endorse, or take responsibility for the content, privacy practices, or accuracy of any third-party website",
                  "Makes no warranty that external links will be functional or that linked sites are free from errors or malicious content",
                  "Is not liable for any loss or damage arising from your use of any third-party website",
                ]} />
                <p>
                  You access any third-party website at your own risk. We recommend reviewing
                  the terms and privacy policies of any external site before interacting with it.
                </p>
              </TermsSection>

              {/* ── Section 9 ─────────────────────────────────────────────── */}
              <TermsSection id="governing-law" title="9. Governing Law & Disputes">
                <InfoBox>
                  <p className="text-gray-700">
                    <strong className="text-navy-900">Governing law:</strong> These Terms are
                    governed by and construed in accordance with the laws of the Islamic Republic
                    of Pakistan. Any dispute arising from or in connection with these Terms or your
                    use of this website shall be subject to the exclusive jurisdiction of the courts
                    of Karachi, Pakistan.
                  </p>
                </InfoBox>

                <SubHeading>Acknowledgement by international users</SubHeading>
                <p>
                  By using this website, international users — including those located in the
                  United States, United Kingdom, European Union, Canada, and South America —
                  acknowledge and accept that:
                </p>
                <BulletList items={[
                  "Pakistani law governs these Terms and any dispute arising from them",
                  "Any legal proceedings must be commenced in the courts of Karachi, Pakistan",
                  "You waive any objection to the jurisdiction or venue of Karachi courts on grounds of inconvenience or otherwise",
                  "Enforcement of any judgment may be subject to applicable international enforcement conventions",
                ]} />

                <SubHeading>Dispute resolution</SubHeading>
                <p>
                  Before initiating formal legal proceedings, both parties agree to attempt to
                  resolve any dispute through good-faith negotiation for a period of not less than
                  thirty (30) days from the date written notice of the dispute is provided. This
                  requirement does not prevent either party from seeking urgent injunctive relief
                  from a court of competent jurisdiction where necessary.
                </p>

                <SubHeading>Severability</SubHeading>
                <p>
                  If any provision of these Terms is found by a court of competent jurisdiction
                  to be invalid, unlawful, or unenforceable, that provision shall be deemed
                  modified to the minimum extent necessary to make it valid and enforceable. The
                  remaining provisions of these Terms shall continue in full force and effect.
                </p>
              </TermsSection>

              {/* ── Section 10 ────────────────────────────────────────────── */}
              <TermsSection id="changes-contact" title="10. Changes to Terms & Contact">
                <SubHeading>Updates to these Terms</SubHeading>
                <p>
                  We reserve the right to modify these Terms at any time. When we make material
                  changes, we will update the effective date at the top of this page. Your
                  continued use of this website after any change constitutes your acceptance of
                  the revised Terms.
                </p>
                <p>
                  We recommend reviewing this page periodically. If you do not agree to any
                  revised Terms, you should discontinue use of this website.
                </p>

                <SubHeading>Entire agreement</SubHeading>
                <p>
                  These Terms, together with our{" "}
                  <Link href="/privacypolicy/" className="text-gold hover:underline">
                    Privacy Policy
                  </Link>
                  , constitute the entire agreement between you and MZ Global Trading with
                  respect to your use of this website and supersede all prior communications
                  and proposals. They do not govern individual commercial transactions, which
                  are subject to separate purchase order terms agreed at the time of order.
                </p>

                <SubHeading>Contact us</SubHeading>
                <div className="bg-navy-900/4 border border-navy-900/8 rounded-xl p-5 text-sm text-gray-600 leading-relaxed">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-navy-900 mb-1">By email</p>
                      <Link
                        href="mailto:info@mzglobaltrading.com"
                        className="text-gold hover:underline"
                      >
                        info@mzglobaltrading.com
                      </Link>
                      <p className="text-gray-500 text-xs mt-1">
                        Subject: <em>Terms of Use — [your query]</em>
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900 mb-1">By post</p>
                      <p>
                        MZ Global Trading<br />
                        Office G20, Columbus Tower<br />
                        Main Clifton Road<br />
                        Karachi 75600, Pakistan
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-400">
                    These Terms were last reviewed and updated on{" "}
                    <strong className="text-gray-500">1 June 2026</strong>. Previous versions
                    are available on request. These Terms do not create or imply any employment,
                    partnership, agency, or joint venture relationship between the parties.
                  </p>
                </div>
              </TermsSection>

            </div>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
