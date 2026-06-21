import Link from "next/link";
import Image from "next/image";

const apparel = [
  { label: "T-Shirts",              href: "/apparel/knittedgarments/tshirts/" },
  { label: "Polo Shirts",           href: "/apparel/knittedgarments/poloshirts/" },
  { label: "Sweatshirts & Hoodies", href: "/apparel/knittedgarments/sweatshirtshoodies/" },
  { label: "Denim Jeans",           href: "/apparel/wovengarments/denimjeans/" },
  { label: "Formal & Casual Shirts",href: "/apparel/wovengarments/formalcasualshirts/" },
  { label: "Baby & Kids",           href: "/apparel/babyandkids/" },
  { label: "Workwear",              href: "/apparel/workwearapparel/" },
  { label: "Socks",                 href: "/apparel/socks/" },
];

const homeTextiles = [
  { label: "Towels",            href: "/hometextile/bathlinen/towels/" },
  { label: "Bathrobes",         href: "/hometextile/bathlinen/bathrobes/" },
  { label: "Bed Linen",         href: "/hometextile/bedlinen/" },
  { label: "Kitchen Linen",     href: "/hometextile/kitchenlinen/" },
  { label: "Hospital Linen",    href: "/hometextile/hospitallinen/" },
  { label: "Thermal Blankets",  href: "/hometextile/thermalblankets/" },
  { label: "Ihram",             href: "/hometextile/ihram/" },
];

const fabric = [
  { label: "Apparel Fabric",      href: "/fabric/apparelfabric/" },
  { label: "Home Textile Fabric", href: "/fabric/hometextilefabric/" },
];

const company = [
  { label: "About Us",             href: "/our-company/" },
  { label: "Why Choose Us",        href: "/whychooseus/" },
  { label: "Our Process",          href: "/ourprocess/" },
  { label: "Quality & Compliance", href: "/qualitycompliance/certifications/" },
  { label: "Careers",              href: "/careers/" },
];

const support = [
  { label: "Contact Us",    href: "/contact-us/" },
  { label: "Knowledge Hub", href: "/knowledge/" },
  { label: "FAQs",          href: "/faqs/" },
  { label: "Downloads",     href: "/downloads/" },
  { label: "Guides",        href: "/guides/" },
];

const certifications = ["GOTS", "OEKO-TEX", "BSCI", "ISO 9001", "Sedex", "GRS", "SA8000", "WRAP"];

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200" data-pagefind-ignore>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/">
              <Image
                src="/images/logo/Master_Logo.webp"
                alt="MZ Global Trading"
                width={1180}
                height={568}
                className="w-[180px] md:w-[200px] h-auto mb-5"
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              Trusted B2B textile sourcing partner for brands and retailers in the USA, UK, Canada, Europe, and South America.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/mzglobaltradingco/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 bg-gray-100 hover:bg-gold/20 rounded transition-colors"
              >
                <Image src="/images/icons/social/icon-social-facebook.svg" alt="Facebook" width={18} height={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/mzglobaltrading"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 bg-gray-100 hover:bg-gold/20 rounded transition-colors"
              >
                <Image src="/images/icons/social/icon-social-linkedin.svg" alt="LinkedIn" width={18} height={18} />
              </a>
            </div>
          </div>

          {/* Col 2 — Apparel */}
          <div>
            <h3 className="text-navy-900 font-semibold text-sm mb-4 uppercase tracking-wider">Apparel</h3>
            <ul className="space-y-2.5">
              {apparel.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-gold text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Home Textiles + Fabric */}
          <div>
            <h3 className="text-navy-900 font-semibold text-sm mb-4 uppercase tracking-wider">Home Textiles</h3>
            <ul className="space-y-2.5">
              {homeTextiles.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-gold text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-gray-100">
              <h3 className="text-navy-900 font-semibold text-sm mb-3 uppercase tracking-wider">Fabric</h3>
              <ul className="space-y-2.5">
                {fabric.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-gray-600 hover:text-gold text-sm transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 4 — Company */}
          <div>
            <h3 className="text-navy-900 font-semibold text-sm mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-gold text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Support & Contact */}
          <div>
            <h3 className="text-navy-900 font-semibold text-sm mb-4 uppercase tracking-wider">Support</h3>
            <Link
              href="/rfq/"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold text-navy-900 text-xs font-bold rounded hover:bg-yellow-400 transition-colors mb-4"
            >
              Request a Quote →
            </Link>
            <ul className="space-y-2.5">
              {support.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-gold text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-gray-100">
              <h3 className="text-navy-900 font-semibold text-sm mb-3 uppercase tracking-wider">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:info@mzglobaltrading.com" className="text-gray-600 hover:text-gold transition-colors break-all">
                    info@mzglobaltrading.com
                  </a>
                </li>
                <li>
                  <a href="tel:+923008256203" className="text-gray-600 hover:text-gold transition-colors">
                    +92 300 8256203
                  </a>
                </li>
                <li className="text-gray-500 text-xs leading-relaxed pt-1">
                  Office G20, Ground Floor<br />
                  Columbus Tower, Clifton<br />
                  Karachi 75600, Pakistan
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p className="shrink-0">© {new Date().getFullYear()} MZ Global Trading. All rights reserved.</p>
          <p className="text-center hidden md:block">{certifications.join(" · ")}</p>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/privacypolicy/" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/termsofuse/" className="hover:text-gold transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
