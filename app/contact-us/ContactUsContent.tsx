"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  company: string;
  email: string;
  subject: string;
  message: string;
  botcheck: boolean;
}

const INITIAL_FORM: FormData = {
  name: "",
  company: "",
  email: "",
  subject: "",
  message: "",
  botcheck: false,
};

const SUBJECTS = [
  "General Enquiry",
  "Product Information",
  "Sampling Request",
  "Logistics & Shipping",
  "Quality & Certifications",
  "Other",
];

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
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-navy-900">
        {label}
        {required && <span className="text-gold ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors";

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactUsContent() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [mapLoaded, setMapLoaded] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.botcheck) return;
    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `[MZ Global Trading Contact] ${formData.subject || "General Enquiry"} — ${formData.name} at ${formData.company}`,
          message: `Company: ${formData.company}\n\n${formData.message}`,
          botcheck: formData.botcheck,
        }),
      });

      const data: { success: boolean } = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData(INITIAL_FORM);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* ── Split section ─────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* ── Left — navy panel ──────────────────────────────────────────── */}
        <div className="lg:w-5/12 bg-navy-900 relative overflow-hidden flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-20 lg:py-28">

          {/* Decorative glows */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold/4 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-gray-500 text-xs mb-10 flex-wrap relative">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span aria-hidden="true">›</span>
            <span className="text-gold">Contact Us</span>
          </nav>

          <div className="relative">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Get In Touch
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Let&apos;s talk about<br />
              <span className="text-gold">your sourcing</span><br />
              requirements.
            </h1>
            <p className="text-gray-400 text-base leading-relaxed mb-12 max-w-sm">
              Our team responds to all enquiries within one business day.
              For formal quotation requests, use our dedicated{" "}
              <Link href="/rfq/" className="text-gold hover:underline">
                RFQ form
              </Link>
              .
            </p>

            {/* Contact details */}
            <ul className="space-y-5 mb-12">
              <li className="flex items-start gap-4">
                <span className="mt-0.5 text-gold flex-shrink-0">
                  <IconEmail />
                </span>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Email</p>
                  <a
                    href="mailto:info@mzglobaltrading.com"
                    className="text-white hover:text-gold transition-colors text-sm font-medium"
                  >
                    info@mzglobaltrading.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 text-gold flex-shrink-0">
                  <IconPhone />
                </span>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Phone / WhatsApp</p>
                  <a
                    href="tel:+923008256203"
                    className="text-white hover:text-gold transition-colors text-sm font-medium"
                  >
                    +92 300 8256203
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 text-gold flex-shrink-0">
                  <IconPin />
                </span>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Office</p>
                  <p className="text-white text-sm font-medium leading-relaxed">
                    Office G20, Ground Floor<br />
                    Columbus Tower, Main Clifton Road<br />
                    Karachi 75600, Pakistan
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 text-gold flex-shrink-0">
                  <IconClock />
                </span>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Business Hours</p>
                  <p className="text-white text-sm font-medium">
                    Monday – Friday<br />
                    9:00 AM – 6:00 PM PKT (UTC +5)
                  </p>
                </div>
              </li>
            </ul>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/mzglobaltradingco/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MZ Global Trading on Facebook"
                className="p-2.5 bg-white/5 hover:bg-gold/20 border border-white/10 rounded-lg transition-colors"
              >
                <Image
                  src="/images/icons/social/icon-social-facebook.svg"
                  alt="Facebook"
                  width={18}
                  height={18}
                />
              </a>
              <a
                href="https://www.linkedin.com/company/mzglobaltrading"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MZ Global Trading on LinkedIn"
                className="p-2.5 bg-white/5 hover:bg-gold/20 border border-white/10 rounded-lg transition-colors"
              >
                <Image
                  src="/images/icons/social/icon-social-linkedin.svg"
                  alt="LinkedIn"
                  width={18}
                  height={18}
                />
              </a>
            </div>
          </div>
        </div>

        {/* ── Right — form panel ─────────────────────────────────────────── */}
        <div className="lg:w-7/12 bg-white flex items-center px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
          <div className="w-full max-w-xl">

            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Send a Message
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
              How can we help?
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Fill in the form below and we&apos;ll get back to you within one business day.
            </p>

            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-navy-900 font-bold text-lg mb-2">Message sent</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Thank you for reaching out. We&apos;ll respond within one business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-gold hover:underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  aria-hidden="true"
                  tabIndex={-1}
                  checked={formData.botcheck}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, botcheck: e.target.checked }))
                  }
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field id="name" label="Full Name" required>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>
                  <Field id="company" label="Company Name" required>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      autoComplete="organization"
                      placeholder="Acme Retail Ltd."
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field id="email" label="Business Email" required>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@acmeretail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>

                <Field id="subject" label="Subject">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="">Select a topic…</option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                <Field id="message" label="Message" required>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your enquiry…"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                {status === "error" && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    Something went wrong. Please try again or email us directly at{" "}
                    <a href="mailto:info@mzglobaltrading.com" className="underline">
                      info@mzglobaltrading.com
                    </a>
                    .
                  </p>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors min-w-[160px]"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      "Send Message →"
                    )}
                  </button>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Need a formal quote?{" "}
                    <Link href="/rfq/" className="text-gold hover:underline">
                      Use the RFQ form →
                    </Link>
                  </p>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>

      {/* ── Map section ───────────────────────────────────────────────────── */}
      <div className="bg-gray-50 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Our Location
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
              Based in Karachi, Pakistan
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Columbus Tower, Main Clifton Road — Pakistan&apos;s leading commercial district.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height: 420 }}>
            {mapLoaded ? (
              <iframe
                src="https://maps.google.com/maps?q=Columbus+Tower+Clifton+Karachi+Pakistan&output=embed&z=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MZ Global Trading office location — Columbus Tower, Clifton, Karachi"
              />
            ) : (
              <div className="w-full h-full bg-navy-900 flex flex-col items-center justify-center gap-5 relative overflow-hidden">
                {/* Subtle dot grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle, #D4A017 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                  aria-hidden="true"
                />
                <div className="relative text-center">
                  <span className="text-gold mb-3 block">
                    <IconMapPin />
                  </span>
                  <p className="text-white font-semibold text-base mb-1">
                    Columbus Tower, Clifton
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    Main Clifton Road, Karachi 75600, Pakistan
                  </p>
                  <button
                    onClick={() => setMapLoaded(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors"
                  >
                    Load Map
                  </button>
                  <p className="text-gray-600 text-xs mt-3">
                    Loads Google Maps — no data shared until clicked
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <a
              href="https://maps.google.com/maps?q=Columbus+Tower+Clifton+Karachi+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline text-sm font-medium"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>

      {/* ── RFQ strip ─────────────────────────────────────────────────────── */}
      <div className="bg-navy-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg">
              Have a specific product in mind?
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Our structured RFQ form covers material specs, certifications, quantities, and
              delivery terms — and gets you a formal quote faster.
            </p>
          </div>
          <Link
            href="/rfq/"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap"
          >
            Request a Quote →
          </Link>
        </div>
      </div>
    </>
  );
}
