import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  image: string;
  imageAlt: string;
  breadcrumbs: BreadcrumbItem[];
  label: string;
  title: string;
  titleGold?: string;
  description: string;
  pills?: string[];
}

export default function PageHero({
  image,
  imageAlt,
  breadcrumbs,
  label,
  title,
  titleGold,
  description,
  pills,
}: PageHeroProps) {
  return (
    <section className="relative bg-navy-900 min-h-[360px] sm:min-h-[460px] pt-14 pb-16 sm:pt-16 sm:pb-20 overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="hero-fade-up flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap"
          style={{ "--fy": "10px", "--dur": "0.4s", "--delay": "0ms" } as CSSProperties}
        >
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">›</span>}
                {!isLast && crumb.href ? (
                  <Link href={crumb.href} className="hover:text-gold transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-gold" : "text-gray-400"}>
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>

        <div className="max-w-3xl">
          <p
            className="hero-fade-up text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ "--fy": "14px", "--dur": "0.4s", "--delay": "80ms" } as CSSProperties}
          >
            {label}
          </p>

          <h1
            className="hero-fade-up text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            style={{ "--fy": "20px", "--dur": "0.5s", "--delay": "160ms" } as CSSProperties}
          >
            {title}
            {titleGold && (
              <>
                {" "}
                <span className="text-gold">{titleGold}</span>
              </>
            )}
          </h1>

          <p
            className="hero-fade-up text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
            style={{ "--fy": "16px", "--dur": "0.5s", "--delay": "260ms" } as CSSProperties}
          >
            {description}
          </p>

          {pills && pills.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {pills.map((pill, i) => (
                <span
                  key={pill}
                  className="hero-fade-up inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                  style={{ "--fy": "10px", "--dur": "0.35s", "--delay": `${360 + i * 100}ms` } as CSSProperties}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                  {pill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
