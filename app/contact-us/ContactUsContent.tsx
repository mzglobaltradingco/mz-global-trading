"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { PhoneInputField, validatePhone } from "@/components/PhoneInputField";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "sent";

interface ContactForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL: ContactForm = {
  name: "", company: "", email: "", phone: "", subject: "", message: "",
};

const SUBJECTS = [
  "General Enquiry",
  "Product Information",
  "Sampling Request",
  "Logistics & Shipping",
  "Quality & Certifications",
  "Other",
];

const RECIPIENT = "info@mzglobaltrading.com";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ic = (err?: string) =>
  `w-full px-4 py-3 border rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors bg-white ${
    err
      ? "border-red-400 focus:ring-red-300/40 focus:border-red-400"
      : "border-gray-200 focus:ring-gold/40 focus:border-gold"
  }`;

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconEmail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  id, label, required, error, children,
}: {
  id: string; label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-navy-900">
        {label}
        {required && <span className="text-gold ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1" role="alert">
          <span aria-hidden="true">↑</span> {error}
        </p>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactUsContent() {
  const [formData, setFormData] = useState<ContactForm>(INITIAL);
  const [phoneCountry, setPhoneCountry] = useState("us");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [mapLoaded, setMapLoaded] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!formData.name.trim())
      e.name = "Full name is required";
    if (!formData.company.trim())
      e.company = "Company name is required";
    if (!formData.email.trim())
      e.email = "Business email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      e.email = "Enter a valid email address";
    const phoneErr = validatePhone(formData.phone, phoneCountry);
    if (phoneErr) e.phone = phoneErr;
    if (!formData.message.trim())
      e.message = "Please describe your enquiry";
    setErrors(e);
    const firstKey = Object.keys(e)[0];
    if (firstKey) {
      setTimeout(() => {
        const el = document.getElementById(firstKey);
        if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.focus(); }
      }, 50);
    }
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(
      `[MZ Global Trading] ${formData.subject || "General Enquiry"} — ${formData.name} at ${formData.company}`
    );
    const body = encodeURIComponent(
      [
        `From:    ${formData.name}`,
        `Company: ${formData.company}`,
        `Email:   ${formData.email}`,
        `Mobile:  ${formData.phone}`,
        `Subject: ${formData.subject || "General Enquiry"}`,
        "",
        "Message:",
        "--------",
        formData.message,
        "",
        "--------",
        "Sent via mzglobaltrading.com/contact-us/",
      ].join("\n")
    );

    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-contact-us.webp"
        imageAlt="MZ Global Trading office — contact our B2B textile sourcing team in Karachi, Pakistan"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        label="Get In Touch"
        title="Contact"
        titleGold="Us"
        description="Reach our sourcing team for product enquiries, supplier information, or general questions. We respond to all email enquiries within one business day."
        pills={["Reply Within 1 Business Day", "B2B Enquiries Only", "Karachi, Pakistan"]}
      />

      {/* ── Contact + Form ────────────────────────────────────────────────── */}
      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-16 items-start">

            {/* ── Left — contact details ──────────────────────────────────── */}
            <div className="lg:col-span-2 mb-12 lg:mb-0">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                  Contact Details
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 text-gold flex-shrink-0"><IconEmail /></span>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Email</p>
                      <a href="mailto:info@mzglobaltrading.com"
                        className="text-navy-900 hover:text-gold transition-colors text-sm font-medium">
                        info@mzglobaltrading.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 text-gold flex-shrink-0"><IconPhone /></span>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Phone</p>
                      <a href="tel:+923008256203"
                        className="text-navy-900 hover:text-gold transition-colors text-sm font-medium">
                        +92 300 8256203
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 text-gold flex-shrink-0"><IconPin /></span>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Office</p>
                      <p className="text-navy-900 text-sm font-medium leading-relaxed">
                        Office G20, Ground Floor<br />
                        Columbus Tower, Main Clifton Road<br />
                        Karachi 75600, Pakistan
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 text-gold flex-shrink-0"><IconClock /></span>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Business Hours</p>
                      <p className="text-navy-900 text-sm font-medium leading-relaxed">
                        Monday – Friday<br />
                        9:00 AM – 6:00 PM PKT (UTC +5)
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="border-t border-gray-200 mt-8 pt-6 flex items-center gap-3">
                  <a href="https://www.facebook.com/mzglobaltradingco/" target="_blank"
                    rel="noopener noreferrer" aria-label="MZ Global Trading on Facebook"
                    className="p-2.5 bg-white hover:bg-gold/10 border border-gray-200 rounded-lg transition-colors">
                    <Image src="/images/icons/social/icon-social-facebook.svg" alt="Facebook" width={18} height={18} />
                  </a>
                  <a href="https://www.linkedin.com/company/mzglobaltrading" target="_blank"
                    rel="noopener noreferrer" aria-label="MZ Global Trading on LinkedIn"
                    className="p-2.5 bg-white hover:bg-gold/10 border border-gray-200 rounded-lg transition-colors">
                    <Image src="/images/icons/social/icon-social-linkedin.svg" alt="LinkedIn" width={18} height={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right — form ───────────────────────────────────────────── */}
            <div className="lg:col-span-3">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Send a Message
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
                How can we help?
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Fill in the form and click <strong>Send Message</strong> — your default email app will open with everything pre-filled. Review and send to reach us.
              </p>

              {status === "sent" ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-navy-900 font-bold text-lg mb-2">Email client opened</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Your message is pre-filled in your email app. Review and click <strong>Send</strong> to reach us.
                  </p>
                  <p className="text-gray-500 text-xs mb-6">
                    Email did not open?{" "}
                    <a href="mailto:info@mzglobaltrading.com" className="text-gold hover:underline font-medium">
                      Email us directly
                    </a>{" "}
                    or{" "}
                    <button type="button" onClick={() => { setStatus("idle"); setFormData(INITIAL); }}
                      className="text-gold hover:underline font-medium">
                      try again
                    </button>
                    .
                  </p>
                  <button type="button" onClick={() => { setStatus("idle"); setFormData(INITIAL); }}
                    className="text-sm text-gold hover:underline font-medium">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field id="name" label="Full Name" required error={errors.name}>
                      <input id="name" name="name" type="text" required autoComplete="name"
                        aria-invalid={!!errors.name}
                        placeholder="Jane Smith" value={formData.name}
                        onChange={handleChange} className={ic(errors.name)} />
                    </Field>
                    <Field id="company" label="Company Name" required error={errors.company}>
                      <input id="company" name="company" type="text" required autoComplete="organization"
                        aria-invalid={!!errors.company}
                        placeholder="Acme Retail Ltd." value={formData.company}
                        onChange={handleChange} className={ic(errors.company)} />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field id="email" label="Business Email" required error={errors.email}>
                      <input id="email" name="email" type="email" required autoComplete="email"
                        aria-invalid={!!errors.email}
                        placeholder="jane@acmeretail.com" value={formData.email}
                        onChange={handleChange} className={ic(errors.email)} />
                    </Field>
                    <PhoneInputField
                      id="phone"
                      label="Mobile Number"
                      required
                      value={formData.phone}
                      countryIso2={phoneCountry}
                      onChange={(e164, iso2) => {
                        setFormData((prev) => ({ ...prev, phone: e164 }));
                        setPhoneCountry(iso2);
                      }}
                      error={errors.phone}
                      onClearError={() =>
                        setErrors((prev) => ({ ...prev, phone: "" }))
                      }
                    />
                  </div>

                  <Field id="subject" label="Subject">
                    <select id="subject" name="subject" value={formData.subject}
                      onChange={handleChange} className={ic()}>
                      <option value="">Select a topic…</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>

                  <Field id="message" label="Message" required error={errors.message}>
                    <textarea id="message" name="message" required rows={5}
                      aria-invalid={!!errors.message}
                      placeholder="Tell us about your enquiry…" value={formData.message}
                      onChange={handleChange} className={`${ic(errors.message)} resize-none`} />
                  </Field>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                    <button type="submit"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      Send Message
                    </button>
                    <p className="text-gray-500 text-sm leading-relaxed animate-pulse">
                      Need a formal quote?{" "}
                      <Link href="/rfq/" className="text-gold font-bold hover:underline">
                        Use the RFQ form →
                      </Link>
                    </p>
                  </div>
                  <p className="text-gray-400 text-xs pt-1">
                    By submitting this form you agree that MZ Global Trading may use your details to respond to your enquiry.{" "}
                    <Link href="/privacypolicy/" className="underline underline-offset-2 hover:text-gold transition-colors">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── Map section ───────────────────────────────────────────────────── */}
      <div className="bg-gray-50 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Our Location</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Based in Karachi, Pakistan</h2>
            <p className="text-gray-500 text-sm mt-2">
              Columbus Tower, Main Clifton Road — Pakistan&apos;s leading commercial district.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height: 420 }}>
            {mapLoaded ? (
              <iframe
                src="https://maps.google.com/maps?q=Columbus+Tower+Clifton+Karachi+Pakistan&output=embed&z=15"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MZ Global Trading office location — Columbus Tower, Clifton, Karachi"
              />
            ) : (
              <div className="w-full h-full bg-navy-900 flex flex-col items-center justify-center gap-5 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle, #D4A017 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                  aria-hidden="true"
                />
                <div className="relative text-center">
                  <span className="text-gold mb-3 block"><IconMapPin /></span>
                  <p className="text-white font-semibold text-base mb-1">Columbus Tower, Clifton</p>
                  <p className="text-gray-400 text-sm mb-6">Main Clifton Road, Karachi 75600, Pakistan</p>
                  <button onClick={() => setMapLoaded(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors">
                    Load Map
                  </button>
                  <p className="text-gray-600 text-xs mt-3">Loads Google Maps — no data shared until clicked</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <a href="https://maps.google.com/maps?q=Columbus+Tower+Clifton+Karachi+Pakistan"
              target="_blank" rel="noopener noreferrer"
              className="text-gold hover:underline text-sm font-medium">
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>

      {/* ── RFQ strip ─────────────────────────────────────────────────────── */}
      <div className="bg-navy-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg">Have a specific product in mind?</p>
            <p className="text-gray-400 text-sm mt-1">
              Our structured RFQ form covers material specs, certifications, quantities, and delivery terms — and gets you a formal quote faster.
            </p>
          </div>
          <Link href="/rfq/"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap">
            Request a Quote →
          </Link>
        </div>
      </div>
    </>
  );
}
