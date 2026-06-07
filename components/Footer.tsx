import Image from "next/image";
import Link from "next/link";

const products = [
  { label: "Apparel", href: "/products/apparel" },
  { label: "Home Textiles", href: "/products/home-textiles" },
  { label: "Towels", href: "/products/towels" },
  { label: "Fabric", href: "/products/fabric" },
  { label: "Ihrams", href: "/products/ihrams" },
];

const company = [
  { label: "Our Company", href: "/our-company" },
  { label: "Quality & Suppliers", href: "/quality-suppliers" },
  { label: "Contact Us", href: "/contact" },
];

const certifications = ["GOTS", "OEKO-TEX", "BSCI", "ISO 9001", "Sedex", "GRS"];

export default function Footer() {
  return (
    <footer className="bg-[#060E18] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo/logo-light.png"
              alt="MZ Global Trading"
              width={400}
              height={120}
              className="h-[120px] w-auto mb-4"
            />
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Your trusted sourcing partner for apparel, home textiles, and fabric. Connecting international buyers with Pakistan&apos;s finest manufacturers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 bg-navy-800 hover:bg-gold/20 rounded transition-colors"
              >
                <Image src="/images/icons/social/icon-social-facebook.svg" alt="Facebook" width={18} height={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 bg-navy-800 hover:bg-gold/20 rounded transition-colors"
              >
                <Image src="/images/icons/social/icon-social-linkedin.svg" alt="LinkedIn" width={18} height={18} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Products</h3>
            <ul className="space-y-2">
              {products.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-gray-400 hover:text-gold text-sm transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-gray-400 hover:text-gold text-sm transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-gray-500 text-xs">Certifications: {certifications.join(", ")}</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <p className="text-gray-500 text-xs uppercase mb-0.5">Pakistan</p>
                <p>Office G20, Columbus Tower</p>
                <p>Karachi 75600</p>
                <a href="tel:+923008256203" className="hover:text-gold transition-colors">+92 300 8256203</a>
              </li>
              <li>
                <p className="text-gray-500 text-xs uppercase mb-0.5">United States</p>
                <p>1178 Broadway, 3rd Floor</p>
                <p>#1308, New York, NY 10001</p>
                <a href="tel:+13322827138" className="hover:text-gold transition-colors">+1 332 2827138</a>
              </li>
              <li>
                <a href="mailto:info@mzglobaltrading.com" className="hover:text-gold transition-colors">
                  info@mzglobaltrading.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} MZ Global Trading. All rights reserved.</p>
          <p>Pakistan&apos;s Premier Textile Sourcing Partner</p>
        </div>
      </div>
    </footer>
  );
}
