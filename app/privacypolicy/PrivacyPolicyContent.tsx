"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

// ─── Section map ──────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "who-we-are",              label: "1. Who We Are" },
  { id: "data-collected",          label: "2. Data We Collect" },
  { id: "how-we-use",              label: "3. How We Use Data" },
  { id: "data-sharing",            label: "4. Data Sharing" },
  { id: "international-transfers", label: "5. International Transfers" },
  { id: "data-retention",          label: "6. Data Retention" },
  { id: "your-rights",             label: "7. Your Rights" },
  { id: "cookies",                 label: "8. Cookies" },
  { id: "contact",                 label: "9. Contact & Requests" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="py-9 border-t border-gray-100 scroll-mt-44"
    >
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

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-navy-900/4 border border-navy-900/8 rounded-xl p-5 text-gray-600 text-sm leading-relaxed">
      {children}
    </div>
  );
}

function RightsTable({
  rows,
}: {
  rows: { right: string; description: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 mt-4">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-4 py-3 text-navy-900 font-semibold w-1/3">
              Right
            </th>
            <th className="text-left px-4 py-3 text-navy-900 font-semibold">
              What it means
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.right}
              className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
            >
              <td className="px-4 py-3 text-navy-900 font-medium align-top">
                {row.right}
              </td>
              <td className="px-4 py-3 text-gray-600 align-top">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PrivacyPolicyContent() {
  const [activeSection, setActiveSection] = useState("who-we-are");

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
        image="/images/hero/hero-about.webp"
        imageAlt="MZ Global Trading privacy policy — data protection for international textile sourcing buyers in USA, UK and Europe"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
        label="Legal"
        title="Privacy"
        titleGold="Policy"
        description="We take the protection of your personal data seriously. This policy explains what we collect, how we use it, and the rights you hold as an individual."
        pills={["GDPR Compliant", "CCPA Aware", "Last Updated June 2026"]}
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
              <nav aria-label="Policy sections">
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
                  This Privacy Policy applies to all personal data processed by MZ Global Trading
                  through this website and our B2B textile sourcing services. We recommend reviewing
                  this policy periodically. Material changes will be notified by updating the date above.
                </p>
              </div>

              {/* ── Section 1 ─────────────────────────────────────────────── */}
              <PolicySection id="who-we-are" title="1. Who We Are">
                <p>
                  MZ Global Trading is a B2B textile sourcing company based in Karachi, Pakistan.
                  We connect international brands, importers, and retailers with certified textile
                  manufacturers across apparel, home textiles, and fabric.
                </p>
                <p>
                  For the purposes of applicable data protection legislation, MZ Global Trading is
                  the data controller in respect of personal data collected through this website and
                  our services.
                </p>
                <InfoBox>
                  <p className="font-semibold text-navy-900 mb-2">Controller contact details</p>
                  <p>
                    <strong>MZ Global Trading</strong><br />
                    Office G20, Ground Floor, Columbus Tower<br />
                    Main Clifton Road, Karachi 75600, Pakistan<br />
                    <Link
                      href="mailto:info@mzglobaltrading.com"
                      className="text-gold hover:underline"
                    >
                      info@mzglobaltrading.com
                    </Link>
                    <br />
                    +92 300 8256203
                  </p>
                </InfoBox>
              </PolicySection>

              {/* ── Section 2 ─────────────────────────────────────────────── */}
              <PolicySection id="data-collected" title="2. Data We Collect">
                <p>
                  We only collect personal data that is necessary for the purposes described in this policy.
                </p>

                <SubHeading>Data you provide directly</SubHeading>
                <p>When you submit a Request for Quotation or contact us through our website, we collect:</p>
                <BulletList items={[
                  "Full name and job title",
                  "Company name and website",
                  "Business email address",
                  "Business telephone number",
                  "Country and shipping destination",
                  "Product requirements (fabric type, construction, GSM, dimensions, certifications needed)",
                  "Order quantities and target price range",
                  "Preferred incoterm and delivery timeline",
                  "Any additional information you choose to include in your message",
                ]} />

                <SubHeading>Data collected automatically</SubHeading>
                <p>
                  When you visit our website, our hosting provider (Cloudflare) may collect standard
                  server log data including:
                </p>
                <BulletList items={[
                  "IP address (used for security and abuse prevention)",
                  "Browser type and version",
                  "Pages requested and date/time of access",
                  "HTTP status codes and response sizes",
                ]} />
                <p>
                  This data is processed by Cloudflare under their own privacy policy and is used
                  for network security, DDoS mitigation, and service delivery. MZ Global Trading
                  does not operate independent website analytics.
                </p>

                <SubHeading>Data from communications</SubHeading>
                <p>
                  Any personal data you include in email or other correspondence with us is collected
                  and retained as part of that communication record.
                </p>
              </PolicySection>

              {/* ── Section 3 ─────────────────────────────────────────────── */}
              <PolicySection id="how-we-use" title="3. How We Use Your Data">
                <p>We use the personal data we collect for the following purposes:</p>

                <div className="overflow-x-auto rounded-xl border border-gray-100 mt-2">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-navy-900 font-semibold w-2/5">Purpose</th>
                        <th className="text-left px-4 py-3 text-navy-900 font-semibold">Legal basis (GDPR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          purpose: "Responding to RFQ submissions and enquiries",
                          basis: "Contractual necessity — steps taken at your request prior to entering a contract",
                        },
                        {
                          purpose: "Matching your requirements with appropriate factory partners",
                          basis: "Contractual necessity / Legitimate interests — operating our core sourcing service",
                        },
                        {
                          purpose: "Sending quotations, samples, and production updates",
                          basis: "Contractual necessity",
                        },
                        {
                          purpose: "Maintaining records of transactions and correspondence",
                          basis: "Legal obligation / Legitimate interests — business record-keeping",
                        },
                        {
                          purpose: "Improving our website and services",
                          basis: "Legitimate interests — ensuring our services remain relevant and effective",
                        },
                        {
                          purpose: "Sending relevant product or trade updates (where you have opted in)",
                          basis: "Consent — you may withdraw at any time",
                        },
                        {
                          purpose: "Compliance with legal and regulatory obligations",
                          basis: "Legal obligation",
                        },
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                          <td className="px-4 py-3 text-gray-700 align-top">{row.purpose}</td>
                          <td className="px-4 py-3 text-gray-600 align-top">{row.basis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-gray-500 mt-3">
                  We do not use your personal data for automated decision-making or profiling.
                </p>
              </PolicySection>

              {/* ── Section 4 ─────────────────────────────────────────────── */}
              <PolicySection id="data-sharing" title="4. Data Sharing">
                <p>
                  <strong className="text-navy-900">We do not sell, rent, or trade your personal data to third parties.</strong>{" "}
                  We share data only in the limited circumstances described below.
                </p>

                <SubHeading>Factory partners</SubHeading>
                <p>
                  To obtain competitive quotations on your behalf, we share relevant product and
                  technical specifications with vetted factory partners in our network. We share
                  only the product and commercial requirements necessary for quoting — not your
                  personal contact details — unless you have explicitly authorised direct contact.
                </p>

                <SubHeading>Service providers</SubHeading>
                <p>
                  We use a small number of trusted service providers to operate our business:
                </p>
                <BulletList items={[
                  "Cloudflare, Inc. — website hosting, content delivery, and security (USA)",
                  "Google Workspace — business email and document management (USA)",
                  "WhatsApp / standard email — client communications where applicable",
                ]} />
                <p>
                  These providers process data only on our instructions and are bound by appropriate
                  data processing agreements.
                </p>

                <SubHeading>Legal and regulatory disclosure</SubHeading>
                <p>
                  We may disclose personal data where required by applicable law, court order, or
                  governmental authority, or to protect the rights, property, or safety of MZ Global
                  Trading, our clients, or others.
                </p>

                <SubHeading>Business transfers</SubHeading>
                <p>
                  In the event of a merger, acquisition, or sale of business assets, personal data
                  may be transferred as part of that transaction. We will notify affected individuals
                  prior to any such transfer.
                </p>
              </PolicySection>

              {/* ── Section 5 ─────────────────────────────────────────────── */}
              <PolicySection id="international-transfers" title="5. International Data Transfers">
                <p>
                  MZ Global Trading is based in Pakistan. When you interact with us, your personal
                  data is processed and stored in Pakistan.
                </p>
                <p>
                  Pakistan is not currently designated as a country with an adequate level of data
                  protection by the European Commission or the UK Information Commissioner&apos;s Office
                  (ICO). However, we implement the following safeguards when receiving data from
                  the EEA, UK, or other regulated jurisdictions:
                </p>
                <BulletList items={[
                  "We apply the data minimisation principle — collecting only what is necessary",
                  "Data is stored on secured, access-controlled systems",
                  "Where we share data with EEA- or UK-based service providers, we rely on EU Standard Contractual Clauses (SCCs) or UK International Data Transfer Agreements (IDTAs)",
                  "We are committed to honouring your rights regardless of where your data is processed",
                ]} />
                <p>
                  If you have questions about the safeguards applicable to your specific situation,
                  please contact us at{" "}
                  <Link
                    href="mailto:info@mzglobaltrading.com"
                    className="text-gold hover:underline"
                  >
                    info@mzglobaltrading.com
                  </Link>
                  .
                </p>
              </PolicySection>

              {/* ── Section 6 ─────────────────────────────────────────────── */}
              <PolicySection id="data-retention" title="6. Data Retention">
                <p>
                  We retain personal data only for as long as necessary to fulfil the purpose for
                  which it was collected, or as required by applicable law.
                </p>

                <div className="overflow-x-auto rounded-xl border border-gray-100 mt-4">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-navy-900 font-semibold w-2/5">Data type</th>
                        <th className="text-left px-4 py-3 text-navy-900 font-semibold">Retention period</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { type: "RFQ and enquiry records (no order placed)", period: "2 years from last contact" },
                        { type: "Order and contract records", period: "7 years from contract end (statutory accounting requirement)" },
                        { type: "Email correspondence", period: "3 years from last interaction, unless part of a contract record" },
                        { type: "Cloudflare server logs", period: "Managed by Cloudflare; typically up to 30 days" },
                        { type: "Marketing opt-in records", period: "Until you withdraw consent, plus 1 year for compliance evidence" },
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                          <td className="px-4 py-3 text-gray-700 align-top">{row.type}</td>
                          <td className="px-4 py-3 text-gray-600 align-top">{row.period}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p>
                  When data is no longer required, it is securely deleted or anonymised so that
                  it can no longer be associated with an individual.
                </p>
              </PolicySection>

              {/* ── Section 7 ─────────────────────────────────────────────── */}
              <PolicySection id="your-rights" title="7. Your Rights">

                <SubHeading>Rights under GDPR (EEA and UK residents)</SubHeading>
                <p>
                  If you are located in the European Economic Area or the United Kingdom, you have
                  the following rights under the General Data Protection Regulation (GDPR) and the
                  UK GDPR respectively:
                </p>
                <RightsTable rows={[
                  { right: "Access", description: "Request a copy of the personal data we hold about you." },
                  { right: "Rectification", description: "Ask us to correct inaccurate or incomplete data." },
                  { right: "Erasure", description: "Request deletion of your personal data where there is no compelling reason to continue processing it." },
                  { right: "Restriction", description: "Ask us to pause processing while a dispute is resolved." },
                  { right: "Portability", description: "Receive your data in a structured, machine-readable format where processing is based on consent or contract." },
                  { right: "Object", description: "Object to processing based on legitimate interests, including direct marketing." },
                  { right: "Withdraw consent", description: "Where processing is based on consent, withdraw it at any time without affecting prior processing." },
                ]} />
                <p>
                  You also have the right to lodge a complaint with your local supervisory authority.
                  In the EU this is your national Data Protection Authority (DPA); in the UK this
                  is the Information Commissioner&apos;s Office (ICO) at{" "}
                  <a
                    href="https://ico.org.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    ico.org.uk
                  </a>
                  .
                </p>

                <SubHeading>Rights under CCPA (California, USA residents)</SubHeading>
                <p>
                  If you are a California resident, the California Consumer Privacy Act (CCPA)
                  grants you additional rights:
                </p>
                <RightsTable rows={[
                  { right: "Right to Know", description: "Request disclosure of the categories and specific pieces of personal information we have collected about you, the purposes for collection, and the categories of third parties with whom it is shared." },
                  { right: "Right to Delete", description: "Request deletion of personal information we have collected from you, subject to certain exceptions." },
                  { right: "Right to Opt-Out", description: "Opt out of the sale of personal information. We do not sell personal information." },
                  { right: "Right to Non-Discrimination", description: "We will not discriminate against you for exercising any of your CCPA rights." },
                ]} />
                <p>
                  To submit a CCPA request, contact us at{" "}
                  <Link href="mailto:info@mzglobaltrading.com" className="text-gold hover:underline">
                    info@mzglobaltrading.com
                  </Link>{" "}
                  with the subject line &ldquo;CCPA Request&rdquo;. We will respond within 45 days.
                </p>

                <SubHeading>Other jurisdictions</SubHeading>
                <p>
                  Regardless of your location, you may contact us at any time to access, correct,
                  or request deletion of your personal data, or to ask questions about how we process
                  it. We will respond to all reasonable requests within 30 days.
                </p>
              </PolicySection>

              {/* ── Section 8 ─────────────────────────────────────────────── */}
              <PolicySection id="cookies" title="8. Cookies &amp; Tracking">
                <p>
                  Our website is a statically generated site served via Cloudflare Pages.
                  We do not use advertising cookies, behavioural tracking cookies, or third-party
                  marketing scripts.
                </p>

                <SubHeading>Cloudflare cookies</SubHeading>
                <p>
                  Cloudflare sets a limited number of technical cookies to deliver the website
                  securely and efficiently. These are strictly necessary and do not require consent
                  under applicable ePrivacy rules. They include:
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-100 mt-2">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-navy-900 font-semibold">Cookie</th>
                        <th className="text-left px-4 py-3 text-navy-900 font-semibold">Purpose</th>
                        <th className="text-left px-4 py-3 text-navy-900 font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "__cf_bm", purpose: "Bot management and DDoS mitigation", duration: "30 minutes" },
                        { name: "cf_clearance", purpose: "Browser challenge verification (security)", duration: "Session" },
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                          <td className="px-4 py-3 font-mono text-navy-900 text-xs align-top">{row.name}</td>
                          <td className="px-4 py-3 text-gray-600 align-top">{row.purpose}</td>
                          <td className="px-4 py-3 text-gray-600 align-top whitespace-nowrap">{row.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <SubHeading>No analytics or marketing tracking</SubHeading>
                <p>
                  We do not use Google Analytics, Meta Pixel, LinkedIn Insight Tag, or any other
                  third-party analytics or advertising technology on this website. No cross-site
                  tracking takes place.
                </p>

                <SubHeading>Social media links</SubHeading>
                <p>
                  Our website contains links to our Facebook and LinkedIn profiles. Clicking these
                  links takes you to a third-party platform governed by that platform&apos;s own privacy
                  policy. We recommend reviewing their policies before interacting.
                </p>
              </PolicySection>

              {/* ── Section 9 ─────────────────────────────────────────────── */}
              <PolicySection id="contact" title="9. Contact &amp; Data Requests">
                <p>
                  To exercise any of your rights, request access to your data, report a data
                  protection concern, or ask any question about this policy, please contact us:
                </p>

                <InfoBox>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-navy-900 mb-1">By email</p>
                      <Link
                        href="mailto:info@mzglobaltrading.com"
                        className="text-gold hover:underline text-sm"
                      >
                        info@mzglobaltrading.com
                      </Link>
                      <p className="text-gray-500 text-xs mt-1">
                        Please use subject line: <em>&ldquo;Data Request — [your name]&rdquo;</em>
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900 mb-1">By post</p>
                      <p className="text-sm text-gray-600">
                        MZ Global Trading<br />
                        Office G20, Columbus Tower<br />
                        Main Clifton Road<br />
                        Karachi 75600, Pakistan
                      </p>
                    </div>
                  </div>
                </InfoBox>

                <SubHeading>Response times</SubHeading>
                <BulletList items={[
                  "General enquiries: within 5 business days",
                  "GDPR rights requests: within 30 days (extendable to 90 days for complex requests with notice)",
                  "CCPA rights requests: within 45 days (extendable by a further 45 days with notice)",
                  "Data breach notifications: within 72 hours where required by law",
                ]} />

                <SubHeading>Supervisory authorities</SubHeading>
                <p>
                  If you are not satisfied with our response, you have the right to lodge a complaint
                  with your local data protection authority:
                </p>
                <BulletList items={[
                  "EU residents: your national Data Protection Authority (DPA)",
                  "UK residents: the Information Commissioner's Office (ICO) — ico.org.uk",
                  "California residents: the California Privacy Protection Agency (CPPA) — cppa.ca.gov",
                ]} />

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-400">
                    This policy was last reviewed and updated on <strong className="text-gray-500">1 June 2026</strong>.
                    Previous versions are available on request.
                    This policy does not create or modify any contractual relationship between you
                    and MZ Global Trading.
                  </p>
                </div>
              </PolicySection>

            </div>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
