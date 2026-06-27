# MZ Global Trading — Master Project Reference

## Company

- **Name:** MZ Global Trading
- **Owner:** M. Muzammil
- **Business email:** info@mzglobaltrading.com
- **Personal email:** mzglobaltradingco@gmail.com
- **Phone:** +92 300 8256203
- **Address:** Office G20, Ground Floor, Columbus Tower, Main Clifton Road, Karachi 75600, Pakistan
- **Domain:** https://mzglobaltrading.com
- **Business:** Pakistan-based B2B textile sourcing — apparel, home textiles, fabric
- **Customers:** Procurement managers, import directors, brand owners, retail buyers in USA, UK, Canada, Europe, South America, Middle East, Southeast Asia, Australia, East Asia (Japan, South Korea), Russia and CIS
- **NOT targeting:** Pakistan domestic only
- **Facebook:** https://www.facebook.com/mzglobaltradingco/
- **LinkedIn:** https://www.linkedin.com/company/mzglobaltrading

---

## Hard Rules — Never Violate

1. **No "private label" anywhere** — never write "private label" in any copy, description, JSON-LD, meta tag, component, or comment. Use "OEM", "custom development", "custom specifications", or "branded programs". Grep for "private label" before completing any page.

2. **Cloudflare Pages only** — no Netlify references anywhere. Security headers in `public/_headers`. No `netlify.toml`. Build: `npm run build`. Output: `out/`.

3. **WebP for all content images** — product, hero, OG, menu, and card images must be `.webp`. Exception: favicons (`favicon-*.png`, `apple-touch-icon.png`) stay PNG.

4. **SEO targets international buyers only** — USA, Canada, UK, Europe, South America, Middle East, Southeast Asia, Australia, East Asia, Russia/CIS. "Pakistan" appears as manufacturing origin only, never as the target audience.

5. **No scope changes without approval** — never alter navigation structure, page hierarchy, section names, or URL patterns without explicit instruction.

6. **All changes apply to all breakpoints** — every layout or functional change covers desktop, tablet, and mobile. Never make a single-breakpoint change.

7. **No Google Tag Manager — ever** — GTM is permanently banned. Analytics is GA4 only: `gtag/js?id=G-BEG0E64X9E` in `app/layout.tsx`. `gtag/js?id=G-...` = GA4 ✅. `gtm.js?id=GTM-...` = GTM ❌.

---

## Priority Order

1. **SEO** — every page fully optimised before marking complete
2. **Performance** — LCP < 2.5s, CLS < 0.1, INP < 200ms. Lighthouse: Desktop 98+, Mobile 95+ (current baseline ~75 as of 2026-06-26; optimisations in progress)
3. **Accessibility** — WCAG 2.1 AA
4. **Mobile** — functional at 320px minimum; test at 320/375/768/1024/1280px
5. **Security** — no secrets in client code, CSP headers, noopener on external links
6. **Code quality** — server components by default, no TypeScript `any`, no inline styles

---

## Tech Stack

- **Framework:** Next.js 16 App Router — v16.2.9 (current stable; upgrade to v17 est. 2027)
- **Language:** TypeScript strict mode
- **Styling:** Tailwind CSS v4 — `@theme {}` block in `app/globals.css`, no `tailwind.config.ts`
- **Animations:** Framer Motion v12
- **Output:** Static export — `output: "export"` in `next.config.mjs` — no SSR, no API routes
- **Deployment:** Cloudflare Pages
- **Font:** Geist Sans via `localFont` with `display: "swap"`
- **Node:** 24.x · **React:** 19.2.7
- **PostCSS:** `@tailwindcss/postcss` v4 — `postcss.config.mjs` (ESM)
- **Dev server:** `next dev --webpack` (webpack flag required — Turbopack + Tailwind v4 oklch conflict)

---

## Design System

### Colours
```
Navy:      #0D1B2A  (navy-900)  — primary bg, headings on white
Deep navy: #08111f             — sourcing cards gradient, mega menu panel bg
Gold:      #D4A017  (gold)     — accent, CTAs, highlights
```

**Accessible gold on white/light backgrounds:** `text-xs` and `text-sm` gold labels use `#9A6400` (5.0:1 ratio). CSS rule in `app/globals.css` handles this automatically. Inline `text-[10px]` sizes need `text-[#9A6400]` manually.

### Header and Footer — Both White
Header (`MegaMenu`) and footer are `bg-white`. Never change to dark navy — both logos have dark navy text and render correctly only on white.

### Logo Files
| Location | File | Display size |
|---|---|---|
| Header | `/images/logo/mz-global-trading-logo-header.webp` | `w-[160px] md:w-[190px] lg:w-[220px] h-auto` |
| Footer | `/images/logo/Master_Logo.webp` | `w-[180px] md:w-[200px] h-auto` |
| JSON-LD | `/images/logo/Master_Logo.webp` | n/a |

Never use `.png` logo files in `<img>` or `<Image>` tags (except favicons).

### Header Dimensions — All Three Must Match
- Nav div: `h-32` (128px)
- Spacer below header: `<div className="h-32" />`
- Backdrop overlay: `style={{ top: 128 }}`
- RFQ sticky progress bar: `top: 128px`

### Typography
- Headings: Geist Sans bold, `text-navy-900` on white, `text-white` on dark
- Body: `text-gray-600` on white, `text-gray-300` on dark
- Gold label pattern: `text-gold text-xs font-semibold tracking-[0.2em] uppercase`
- Section heading pattern: gold label → `<h2 className="text-3xl sm:text-4xl font-bold text-navy-900">`

### Hero Overlay Standard
Always inline, never Tailwind gradient classes:
```tsx
style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }}
```

---

## URL Pattern

- All internal URLs use trailing slash: `/apparel/`, `/rfq/`, `/hometextile/bathlinen/towels/`
- Never omit the trailing slash on `<Link href>`, `canonical`, `sitemap.xml`, or JSON-LD URLs
- Base URL: `https://mzglobaltrading.com`

---

## Internal Link Targets

| Action | Destination |
|---|---|
| Request a Quote CTA | `/rfq/` |
| Contact | `/contact-us/` |
| Explore Products (secondary CTA) | `/hometextile/bathlinen/towels/` |
| Apparel category | `/apparel/` |
| Home Textiles category | `/hometextile/` |
| Fabric category | `/fabric/` |
| Breadcrumb home | `/` |

External links always: `target="_blank" rel="noopener noreferrer"`

---

## Page File Structure

```
app/section/page-name/
  page.tsx              ← metadata export + MegaMenu + main + Footer + JSON-LD
  PageNameContent.tsx   ← content component — "use client" only if needed
```

### page.tsx Template
```tsx
import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PageNameContent from "./PageNameContent";

export const metadata: Metadata = {
  title: "Page Name | MZ Global Trading",          // ≤60 chars
  description: "130–160 chars, primary keyword front-loaded, for international buyers.",
  keywords: ["keyword1", "keyword2"],
  alternates: {
    canonical: "/section/page-name/",
    languages: {
      "en": "https://mzglobaltrading.com/section/page-name/",
      "x-default": "https://mzglobaltrading.com/section/page-name/",
    },
  },
  openGraph: {
    title: "Page Name | MZ Global Trading",
    description: "OG description up to 200 chars.",
    url: "https://mzglobaltrading.com/section/page-name/",
    images: [{ url: "/images/og/page-name-og.webp", width: 1200, height: 630, alt: "Alt text 80–140 chars" }],
  },
  twitter: { card: "summary_large_image", title: "...", description: "..." },
};

export default function PageNamePage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content"><PageNameContent /></main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Product Name — Pakistan Export",
        description: "...",
        image: "https://mzglobaltrading.com/images/og/page-name-og.webp",
        brand: { "@type": "Brand", name: "MZ Global Trading" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", priceValidUntil: "2027-12-31", url: "https://mzglobaltrading.com/rfq/", seller: { "@type": "Organization", name: "MZ Global Trading" } },
        primaryImageOfPage: { "@type": "ImageObject", contentUrl: "https://mzglobaltrading.com/images/og/page-name-og.webp", name: "Descriptive name" },
        breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
          { "@type": "ListItem", position: 2, name: "Section", item: "https://mzglobaltrading.com/section/" },
          { "@type": "ListItem", position: 3, name: "Page Name", item: "https://mzglobaltrading.com/section/page-name/" },
        ]},
      }) }} />
    </>
  );
}
```

### JSON-LD Type by Page
| Page type | `@type` |
|---|---|
| Product leaf page | `Product` |
| Category / cluster page | `CollectionPage` |
| About / corporate page | `AboutPage` |
| Global (layout.tsx only) | `Organization` — do NOT repeat on pages |

Always include `primaryImageOfPage` on any page with a hero image. Add `FAQPage` schema below `Product` schema when page has an FAQ section.

---

## Mandatory Checklist — Every Page Before Marking Complete

### SEO
- [ ] `title` ≤60 chars — `"Specific Page Name | MZ Global Trading"`
- [ ] `description` 130–160 chars, primary keyword front-loaded
- [ ] `alternates.canonical` — relative URL with trailing slash
- [ ] `alternates.languages` — both `"en"` and `"x-default"` pointing to absolute URL
- [ ] `openGraph` block with `.webp` OG image
- [ ] `twitter` block with `card: "summary_large_image"`
- [ ] JSON-LD with `primaryImageOfPage`
- [ ] FAQPage JSON-LD if page has FAQ section
- [ ] Single `<h1>` containing primary keyword; h1 → h2 → h3 only, no skips
- [ ] Every `<Image>` has descriptive 80–140 char alt text
- [ ] `<main id="main-content">` present
- [ ] No "private label" — grep before completing
- [ ] Run `python scripts/check-page.py app/section/page-name/page.tsx`

### Performance
- [ ] `<Image>` for all content images — `<img>` only for logo in MegaMenu
- [ ] Above-the-fold hero has `priority` prop
- [ ] Every `<Image>` has `sizes` prop
- [ ] `"use client"` only where browser APIs / hooks / event listeners required
- [ ] No unused imports

### Accessibility (WCAG 2.1 AA)
- [ ] Every `<button>` has visible text or `aria-label`
- [ ] Decorative SVGs have `aria-hidden="true"`
- [ ] Form inputs have `<label htmlFor="...">`
- [ ] Link text is descriptive — never "click here"
- [ ] Focus rings visible — never bare `outline-none`
- [ ] Touch targets ≥ 44×44px on mobile

### Mobile
- [ ] Functional at 320px — no horizontal scroll
- [ ] Minimum `text-sm` (14px) on mobile

### Code Quality
- [ ] Server component by default
- [ ] No TypeScript `any`
- [ ] No inline `style={{}}` — Tailwind only (exception: dynamic clip-path, flex ratios, animation delays, hero overlays)
- [ ] No commented-out code blocks

---

## Animation System (Framer Motion)

### Spring Presets
```tsx
panelVariants:      { stiffness: 280, damping: 26, staggerChildren: 0.07 }  // mega menu panel
rowVariants:        { stiffness: 340, damping: 28 }                          // category rows
itemVariants:       { stiffness: 420, damping: 32 }                          // sub-items
leftPanelVariants:  { stiffness: 300, damping: 26 }                          // left brand panel
previewZoneVariants:{ stiffness: 300, damping: 26 }                          // preview crossfade
```

### Standard Scroll-Triggered Entrance
```tsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: i * 0.1 }}
```

### Card Hover
```tsx
whileHover={{ scale: 1.02 }}
transition={{ type: "spring", stiffness: 400, damping: 25 }}
```

### SourcingCapabilities Accordion (CSS flex, not Framer)
```tsx
style={{ flex: isActive ? 3 : 1, transition: "flex 0.55s cubic-bezier(0.34, 1.15, 0.64, 1)" }}
style={{ transform: isActive ? "scale(1.06)" : "scale(1)", transition: "transform 0.6s ease-out" }}
```

### Hero Combined Slide — Diagonal Panels
```tsx
// Left:   initial={{ x: -60, opacity: 0 }} spring stiffness:240 damping:28 delay:0
// Middle: initial={{ x: 0, scale: 1.07, opacity: 0 }} spring delay:0.15
// Right:  initial={{ x: 60, opacity: 0 }} spring delay:0.3
// Labels: initial={{ opacity: 0, y: 14 }} duration:0.4 delay:(panel.delay + 0.38)
```

### Rules
- Always wrap conditionally rendered animated elements in `<AnimatePresence>`
- All `whileInView` use `viewport={{ once: true }}`
- `AnimatePresence mode="wait"` for slide transitions

---

## JSON-LD Patterns

**Category page:**
```tsx
{ "@context": "https://schema.org", "@type": "CollectionPage", "url": "https://mzglobaltrading.com/section/", "name": "...", "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [...] } }
```

**Product page:**
```tsx
{ "@context": "https://schema.org", "@type": "Product", "name": "...", "image": "...", "brand": { "@type": "Brand", "name": "MZ Global Trading" }, "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "priceValidUntil": "2027-12-31", "url": "https://mzglobaltrading.com/rfq/", "seller": { "@type": "Organization", "name": "MZ Global Trading" } }, "breadcrumb": {...} }
```

**Corporate/about page:**
```tsx
{ "@context": "https://schema.org", "@type": "AboutPage", "url": "https://mzglobaltrading.com/our-company/", "name": "About MZ Global Trading", "mainEntity": { "@id": "https://mzglobaltrading.com/#organization" } }
```

---

## Image Standards

| Context | Component | `sizes` prop |
|---|---|---|
| Hero / full-width | `<Image priority>` | `"100vw"` |
| Half-width content | `<Image>` | `"(max-width: 768px) 100vw, 50vw"` |
| 3-column card grid | `<Image>` | `"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` |
| Menu preview zone | `<Image>` | `"200px"` |
| Diagonal hero panel | `<Image>` | `"34vw"` |
| SourcingCapabilities | `<Image>` | `"(max-width: 1280px) 50vw, 40vw"` |
| OG images | Static file | 1200×630px `.webp` |

### WebP Quality Standards (new images)
- Hero images: quality **50**, `method=6`
- OG images: quality **70**, `method=6`
- Menu preview images: quality **50**, `method=6`

### Alt Text Rules
- **Content images:** 80–140 chars. Pattern: `"Pakistan [product] manufacturer — [descriptor] for [buyer type] in [markets]"`. Front-load primary keyword.
- **Functional/icon images:** Use the element's label as alt (e.g. "Quality Assurance").
- **Decorative images:** `alt=""` — never omit the attribute entirely.
- **Logos:** `alt="MZ Global Trading"`.

### File Naming
- Hyphens, never underscores: `pakistan-towel-manufacturer.webp` ✓
- Pattern: `pakistan-[product]-manufacturer-[descriptor].webp`

### Image Sitemap
- Namespace: `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`
- Only `<image:loc>` required — title/caption/geo_location tags deprecated by Google (May 2022)

### CertificationsStrip Containers
Fixed `140×80px` per cert: `style={{ width: 140, height: 80 }}` + `className="object-contain w-full h-full"`. Never `w-auto`.

---

## Copy Standards

- **Audience:** Procurement managers, brand owners, retail buyers in USA, UK, Canada, Europe, South America
- **Tone:** Professional, direct, B2B — not consumer-facing
- **Forbidden:** "private label", "dropshipping", "low MOQ"
- **Use instead:** "OEM", "custom development", "bulk orders", "certified manufacturers"
- **Pakistan:** manufacturing origin only — "manufactured in Pakistan's certified factories"
- **Validated stats (owner-verified — never alter):** 50+ factories, 35+ export markets, 10+ certifications

---

## Deployment Workflow

```bash
npm run build                                                          # 1. build
git add ... && git commit -m "..." && git push origin main             # 2. push
npx wrangler pages deploy out --project-name=mz-global-trading        # 3. deploy
```

- **Wrangler:** 4.98.0 · **Cloudflare project:** `mz-global-trading`
- **Preview URL:** `https://<hash>.mz-global-trading.pages.dev`
- Domain `mzglobaltrading.com` is live on Cloudflare Pages — test PSI against `https://mzglobaltrading.com/`

### Active Redirects (`public/_redirects`)
```
https://www.mzglobaltrading.com/* https://mzglobaltrading.com/:splat 301
```
Only one redirect — www → non-www canonical. No others.

### Security Headers (`public/_headers`)
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400
```

---

## SEO Strategy

### Geographic Targets
USA, Canada, UK, Europe (EU + non-EU), South America (BR, AR, CL, CO, PE, MX), Middle East (AE, SA, QA, KW, BH, OM, EG, TR, JO), Southeast Asia (SG, MY, TH, ID, PH, VN), Australia, New Zealand, East Asia (JP, KR), Russia/CIS (RU, KZ, UA, UZ, AZ, GE). `areaServed: "Worldwide"` in Organization JSON-LD.

### Keyword Tiers
- **Tier 1:** "apparel manufacturer Pakistan", "home textile supplier Pakistan", "towels manufacturer exporter", "OEM garment manufacturer"
- **Tier 2:** "bath towels wholesale supplier", "hotel towels bulk order", "bed linen wholesale UK", "custom polo shirts manufacturer"
- **Tier 3:** "GOTS certified towel manufacturer Pakistan", "terry cloth towels minimum order", "hospital scrubs manufacturer Pakistan"

### Content Architecture
```
PILLAR  (/apparel/, /hometextile/, /fabric/)
  CLUSTER (/apparel/knittedgarments/, /hometextile/bathlinen/)
    LEAF (/apparel/knittedgarments/tshirts/, /hometextile/bathlinen/towels/)
```

### Sitemap Priorities
- Homepage: 1.0 · Category pages: 0.9 · RFQ: 0.9 · Product pages: 0.8 · Corporate: 0.7 · Legal: 0.3

### hreflang
`buildMetadata()` in `lib/metadata.ts` auto-generates `en` + `x-default` on all 82 static pages. Dynamic pages (`/guides/[slug]`, `/knowledge/[slug]`, `/downloads/[slug]`) use `generateMetadata()` which also include hreflang.

### Multi-language
**Decision: No i18n.** English authority first. Revisit after launch using Google Search Console data.

---

## Component Registry

| Component | File | Notes |
|---|---|---|
| MegaMenu | `components/MegaMenu.tsx` | White, h-32, all URLs wired, hover preview zone, `prefetch={false}` on all nav links |
| Footer | `components/Footer.tsx` | White, 5-column |
| Hero | `components/Hero.tsx` | 4 slides, 5s interval |
| SourcingCapabilities | `components/SourcingCapabilities.tsx` | Accordion desktop, stacked mobile |
| CertificationsStrip | `components/CertificationsStrip.tsx` | Marquee, fixed 140×80px containers |
| CTABanner | `components/CTABanner.tsx` | Compact centred, navy bg, gold CTA |

### MegaMenu Architecture
- Left panel: content-aware brand panel — changes per nav item hover
- Centre: `CategoryRow[]` with sub-items as horizontal flex-wrap
- Right: preview zone — `AnimatePresence` crossfade on sub-item hover via `currentImg` state
- Mobile: 3-level spring accordion

### Footer Architecture (5 Columns)
| Col | Content |
|---|---|
| 1 | `Master_Logo.webp`, description, Facebook + LinkedIn |
| 2 | Apparel: 8 product links |
| 3 | Home Textiles (7) + Fabric (2) |
| 4 | Company: 6 links |
| 5 | Gold RFQ button + support links + Contact (email, phone, address) |
| Bottom bar | Copyright + 8 certifications (`hidden md:block`) + Privacy · Terms |

### Hero Architecture (4 Slides)
| Slide | ID | Background |
|---|---|---|
| 0 | combined | Parallelogram panels (desktop) / strips (mobile) — all 3 category images |
| 1 | apparel | `hero-apparel.webp` full-width + gradient |
| 2 | home-textiles | `hero-home-textiles.webp` full-width + gradient |
| 3 | fabric | `hero-fabric.webp` full-width + gradient |

Combined slide labels: `bg-navy-950/60 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3`

---

## Pages Built — Current Status (2026-06-23)

| Type | Count |
|---|---|
| Static page.tsx files | 80 |
| Knowledge Hub `/knowledge/[slug]` | 53 |
| Guide pages `/guides/[slug]` | 77 |
| Downloads `/downloads/[slug]` | 59 |
| **Total unique URLs** | **269** (268 in sitemap — `/search/` correctly excluded) |

Pagefind indexes 269 files. All dynamic slugs generate correctly.

### Static page.tsx breakdown (82 total)

**Product leaf pages (46)** — audit Track B
All apparel, home textile, fabric leaf pages listed in Content Audit section.

**Cluster / pillar pages (13)** — audit Track A
Bath Linen · Bed Linen · Kitchen Linen · Table Linen · Thermal Blankets · Hospital Linen · Industrial Linen · Knitted Garments · Woven Garments · Baby & Kids · Apparel pillar · Home Textile pillar · Fabric pillar

**Non-product static pages (21) — NOT in audit scope**

| Category | Pages |
|---|---|
| Corporate | `/` (Homepage) · `/our-company/` · `/whychooseus/` · `/ourprocess/` · `/careers/` |
| Transactional | `/rfq/` · `/contact-us/` |
| Quality & Compliance | `/quality-policy/` · `/qualitycompliance/certifications/` · `/qualitycompliance/inspectionprocess/` · `/qualitycompliance/qualitycontrol/` · `/qualitycompliance/supplierevaluation/` |
| Utility | `/faqs/` · `/textile-tools-calculator/` · `/search/` |
| Legal | `/privacypolicy/` · `/termsofuse/` |
| Content hub indexes | `/knowledge/` · `/guides/` · `/downloads/` |
| Orphan | `/hometextile/bedlinen/institutionalbedding/` (not in nav) |

**Dynamic slug routes (2 page.tsx files, 189 URLs)**
`app/knowledge/[slug]/page.tsx` (53) · `app/guides/[slug]/page.tsx` (77) · `app/downloads/[slug]/page.tsx` (59)

---

## URL Structure & Navigation

### URL Patterns
`/` · `/our-company/` · `/rfq/` · `/contact-us/` · `/qualitycompliance/[page]/` · `/quality-policy/` · `/apparel/[cluster]/[product]/` · `/hometextile/[cluster]/[product]/` · `/hometextile/ihram/` · `/fabric/apparelfabric/` · `/fabric/hometextilefabric/` · `/guides/[slug]/` · `/knowledge/[slug]/` · `/downloads/[slug]/`

**Quality Policy** is at `/quality-policy/` (top-level, hyphenated). The other 4 quality pages are under `/qualitycompliance/`.

### Content Data Files
| File | Purpose |
|---|---|
| `lib/guides-content.ts` | All guide data — source of truth for `/guides/[slug]` |
| `content/knowledge/*.ts` | One `.ts` per KH post — auto-discovered via `getAllPosts()` |
| `lib/downloads-content.ts` | All download entries — source of truth for `/downloads/[slug]` |
| `lib/knowledge.ts` | Helper functions for KH posts |

### Mega Menu Navigation Order
1. Home → `/`
2. Corporate (mega)
3. Apparel (mega)
4. Home Textiles (mega)
5. Fabric (mega)
6. Quality & Compliance (mega)
7. Contact Us → `/contact-us/`

### Corporate Rows
- Company: About Us, Why Choose Us, Our Process, Careers, Blogs
- Resources: Textile Tools Calculator, FAQs, Downloads, Guides
- Legal: Privacy Policy, Terms of Use

### Apparel Rows
- Knitted Garments: T-Shirts, Polo Shirts, Henley Shirts, Sweatshirts & Hoodies, Sweatpants & Joggers, Tank Tops
- Woven Garments: Denim Jeans, Formal & Casual Shirts, Pants & Trousers, Cargo Pants, Shorts
- Baby & Kids: T-Shirts for Kids, Swaddle Muslin Fabric, Overalls, Baby Rompers, Baby Bibs, Baby Hooded Towels
- Workwear Apparel (link only) · Socks (link only)

### Home Textiles Rows
- Bath Linen: Towels, Institutional Towels, Bathrobes, Bath Mats, Beach & Pool Towels
- Bed Linen: Bedsheets, Fitted Sheets, Duvet Covers, Pillow Covers, Cushion Covers, Curtains
- Kitchen Linen: Kitchen Towels, Bar Mops, Aprons, Pot Holders
- Table Linen: Table Covers
- Thermal Blankets: Cellular Thermal Blanket, Fleece Thermal Blankets
- Hospital Linen: Doctor Surgical Gowns, Medical Scrubs, Patient Gowns, Surgical Huck Towels
- Industrial Linen: Shop Towels, Fender Covers
- Ihram (link only)

### Fabric Rows
- Apparel Fabric `/fabric/apparelfabric/` · Home Textile Fabric `/fabric/hometextilefabric/`

### Quality & Compliance Rows
- Quality Policy, Supplier Evaluation, Quality Control, Inspection Process, Certifications

---

## Certifications

**CertificationsStrip marquee (10):** OEKO-TEX, GOTS, BSCI, Sedex, ISO 9001, GRS, WRAP, BCI, SA8000, Bluesign

**Footer bottom bar (8):** GOTS · OEKO-TEX · BSCI · ISO 9001 · Sedex · GRS · SA8000 · WRAP

Cert images: `/public/images/certs/cert-[name].webp`

---

## Public Assets Structure

```
public/
  _headers · _redirects · robots.txt · sitemap.xml
  favicon-32.png · favicon-192.png · apple-touch-icon.png   ← PNG required
  images/
    logo/
      Master_Logo.webp                      ← Footer
      mz-global-trading-logo-header.webp    ← Header
    hero/   ← hero-[slug].webp
    og/     ← [slug]-og.webp  (1200×630px)
    cards/  ← cat-banner-[category].webp
    menu/   ← menu-[product-name].webp
    certs/  ← cert-[name].webp
    thumbnails/
    team/   ← Muhammad-Muzammil.webp
    icons/social/ ← icon-social-facebook.svg, icon-social-linkedin.svg
```

**Missing menu images (awaiting user):** `menu-doctorsurgicalgowns.webp` · `menu-shoptowels.webp`

---

## Known Pending Items

- **Missing menu images:** Doctor Surgical Gowns, Shop Towels — awaiting user-supplied WebP files
- **Google Search Console:** After domain migration, set preferred country to USA
- **Sitemap:** `public/sitemap.xml` needs regeneration to include all 271 URLs (dynamic guide/knowledge/download pages not yet listed)
- **Next.js upgrade:** v16 → v17 when stable (est. 2027)

---

## Known Bugs — Do Not Repeat

### BUG 1 — Cluster page product cards use wrong images
`PRODUCTS[]` / `CLUSTERS[]` in cluster `*Content.tsx` files must each use the product's dedicated hero image, not generic category images. Fix the data array in the cluster file, not just leaf pages.

Baby & Kids correct image mapping:
```
T-Shirts for Kids     → /images/hero/hero-t-shirts-for-kids.webp
Swaddle Muslin Fabric → /images/hero/hero-swaddle-muslin-fabric.webp
Overalls              → /images/hero/hero-overalls.webp
Baby Rompers          → /images/hero/hero-baby-rompers.webp
Baby Bibs             → /images/hero/hero-baby-bibs.webp
Baby Hooded Towels    → /images/hero/hero-baby-hooded-towels.webp
```

### BUG 2 — PageHero `image=` prop not updated after new hero upload
Always grep for `<PageHero image="...">` in the page's `Content.tsx` and update it explicitly when uploading a new hero image.

### BUG 3 — Quality Policy page location
`/quality-policy/` is at `app/quality-policy/page.tsx` (top-level, hyphenated). It does NOT exist under `/qualitycompliance/`. The other 4 quality pages ARE under `/qualitycompliance/`.

### BUG 4 — Hero overlay gradient direction
Never use Tailwind gradient classes for hero overlays. Always use the inline `style=` standard (see Design System → Hero Overlay Standard).

### BUG 5 — Duplicate breadcrumbs
When rewriting a hero section that adds breadcrumbs inside it, always search the file for any existing standalone `<nav aria-label="Breadcrumb">` below the hero and remove it.

### BUG 6 — Card not fully clickable
`<Link>` must always be the outermost element on a card. Never wrap a card in `<div>` or `<motion.div>` with `<Link>` inside.

```tsx
// Correct pattern:
<Link href={p.href} className="group relative rounded-2xl overflow-hidden ...">
  <div className="relative h-64 overflow-hidden">
    <Image ... />
    <div className="absolute inset-0 ..." />
  </div>
  <div className="absolute bottom-0 left-0 right-0 p-5">...</div>
</Link>
```

### BUG 7 — New hero image upload checklist
When uploading a new hero image:
1. `public/images/hero/hero-[slug].webp`
2. `public/images/og/[slug]-og.webp`
3. Update `<Image src=...>` in `*Content.tsx`
4. Update `openGraph.images[0].url` in `page.tsx`
5. Update JSON-LD `image:` in `page.tsx`
6. Update JSON-LD `primaryImageOfPage.contentUrl` in `page.tsx`
7. Update `img:` in sibling cards on other pages that link here

### BUG 8 — ScrollToTop requires dual-pass
Single `useLayoutEffect` is insufficient — Next.js post-commit scroll restoration overrides it. Must add a `useEffect` + `requestAnimationFrame` pass with `behavior: "instant"`.

---

## RFQ Wizard

### File Locations
| File | Purpose |
|---|---|
| `app/rfq/page.tsx` | Metadata, JSON-LD, page shell |
| `app/rfq/RFQContent.tsx` | Full wizard UI — `"use client"` |
| `lib/rfq-product-options.ts` | All product-specific dropdown data — single source of truth |

### Wizard Structure — 4 Steps
```
STEP 1 — Product Requirements
  Category → Product Type → [all product specs]
  Certifications (multi-select + "Other" free text)

STEP 2 — Commercial & Logistics
  Quantity + Unit · Target Price (USD) · Delivery Date · Destination Country
  Incoterm · Port of Destination (CIF/CFR only) · Logistics Notes

STEP 3 — Your Details
  Full Name · Company · Email · Phone · Country (all mandatory)
  How Did You Hear About Us (optional)

STEP 4 — Review & Submit
  Full summary with edit buttons · Submit opens mailto
```

- Single page, no URL changes between steps
- Back button at top AND bottom of each step
- Sticky progress bar: `position: fixed`, `top: 128px`, `z-40`, `h-[48px]`; gold = done, navy = active, gray = pending
- localStorage autosave key: `"rfq_wizard_draft_v4"` — save on every change (debounced 500ms), clear on submit
- Validation blocks progression; scroll to first error
- Certifications "Other" option value is `"Other (specify below)"` — not just `"Other"`

### Field Validation Rules
| Field | Rule |
|---|---|
| Quantity | Numeric, at least one digit |
| Email | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Phone | ≥7 digits after stripping non-numeric |
| Delivery Date | Must be future date |
| Dropdowns | `""` placeholder not accepted |
| Target Price | If provided, must contain at least one digit |

### Conditional Field Flags (`lib/rfq-product-options.ts`)
| Flag | Effect |
|---|---|
| `isIhram` | Forces white-only colour, hides decoration fields |
| `isMedical` | Shows sterilisation options |
| `isFabricRoll` | Roll packing; `printType` = Fabric State/Dye Method; `fabricState` = Pattern/Colour Type |
| `showBorderField` | Terry products and bed linen |
| `showPocketDepth` | Fitted sheets only |
| `showClosureType` | Duvet covers, pillow/cushion covers |
| `showCollarType` | Bathrobes only |
| `showHeatingRating` | Pot holders only |
| `showBackingType` | Bath mats only |
| `showHeadingType` / `showLiningType` | Curtains only |
| `showPileHeight` | Towels, Institutional Towels, Bathrobes, Bath Mats |
| `showBeltType` | Bathrobes — belt/tie type + loop placement |
| `showRobePockets` | Bathrobes — pocket options |
| `showCuffStyle` | Bathrobes — cuff style |
| `showWeightUnit` | Denim jeans, woven garments — oz/yd², GSM, lb/yd² |
| `showFabricTypeSelector` | Bed linen — woven vs knit fabric type |

**Never add free-text pile height** — dropdown tiers are deliberately limited.

### Pile Height Tiers
| Product | Options |
|---|---|
| Towels | 8–10 mm · 10–13 mm · 13–16 mm · 16+ mm |
| Institutional Towels | 8–10 mm · 10–13 mm · 13–16 mm |
| Bathrobes | 4–6 mm · 8–10 mm · 12–15 mm |
| Bath Mats | 8–10 mm · 10–13 mm · 13–16 mm · 16–20 mm |

### Locked Data Values (do not revert)
| Field | Correct value |
|---|---|
| Beach towel standard | 70×140 cm |
| Beach towel USA | 76×152 cm |
| Beach towel round | Ø150 cm |
| Bath mat large | 60×90 cm |
| Bath mat XL | 70×110 cm |
| Sports/Gym towel | 70×130 cm |
| Bed linen Twin | 96×190 cm |
| Bed linen King | 193×203 cm |
| Bed linen construction | "Poplin (fine plain weave)" — not "Oxford Weave" |
| Fitted sheet pocket start | 14" / 35 cm (residential standard) |
| Fitted sheet sequence | 14" → 16" → 18" → 21" → 25"+ |
| Bathrobe first size option | "One Size (hotel standard — fits most adults)" |

### Email Body Format
```
══════════════════════════════════════════════════
  RFQ SUBMISSION — MZ GLOBAL TRADING
  Source: mzglobaltrading.com/rfq/
  Submitted: [date]
══════════════════════════════════════════════════

[1]  CONTACT DETAILS
[2]  PRODUCT REQUIREMENTS & SPECIFICATIONS
[3]  COMMERCIAL & LOGISTICS
[4]  ADDITIONAL NOTES (if present)

══════════════════════════════════════════════════
  Buyer confirms agreement to Terms of Use
  at: mzglobaltrading.com/termsofuse/
══════════════════════════════════════════════════
```

### "How Did You Hear About Us" Options
Google Search · LinkedIn · Trade Show / Exhibition · Referral from a Contact · Social Media (Facebook / Instagram) · Industry Directory · Other

---

## Content Creation Standards

### Three Content Types
| Type | Location | Link syntax | Auto-discovered? |
|---|---|---|---|
| KH Article | `content/knowledge/[slug].ts` | `[anchor text](/url/)` markdown | ✅ `getAllPosts()` finds all `.ts` files |
| Guide | `lib/guides-content.ts` — add to `GUIDES` array | `<a href="/url/">anchor</a>` in `{ type: "p" }` blocks | ❌ Must add card to `GuidesContent.tsx` |
| Download | `lib/downloads-content.ts` — add to `DOWNLOAD_DOCS` array | None (fill-in templates) | ❌ Must add card to `DownloadsContent.tsx` |

### Content Quality Rules
- Target: procurement managers with 10+ years experience — B2B, specific numbers, no vague claims
- Every KH article: 3–5+ inline links spread across sections (not just intro/outro); link to product page + 2+ related pages + `/rfq/`
- Every Guide: same link density; must end with `{ type: "seealso", ... }` listing 4–6 related pages
- Certification mentions: OEKO-TEX (EU/UK/USA retail), GOTS (organic), BSCI/Sedex/WRAP (social), ISO 9001 (universal)
- KH article dates: stagger — no two articles in same batch share the same date

### Pre-Write Checklist
Before writing any content piece:
1. **KH:** Auto-discovered — no listing update needed
2. **Guide:** Add card to `GuidesContent.tsx` `guides[]` array; update hero stats and category counts
3. **Download:** Add card to `DownloadsContent.tsx` `documents[]` array; update hero pills and stats
4. **After all 3 pieces:** Update product page bento from generic links to specific slugs
5. **Verify:** `npm run build` must pass with zero errors

### Bento Standard Template (all 4 boxes required)
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
  {/* Box 1 — KH (white) */}
  <Link href="/knowledge/[slug]/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
    <span className="text-2xl" aria-hidden="true">📚</span>
    <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
    <p className="font-semibold text-navy-900">Article Title</p>
    <p className="text-xs text-gray-500 leading-relaxed">Short description.</p>
    <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
  </Link>
  {/* Box 2 — Guide (white) */}
  <Link href="/guides/[slug]/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
    <span className="text-2xl" aria-hidden="true">📄</span>
    <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
    ...
  </Link>
  {/* Box 3 — Download (white) */}
  <Link href="/downloads/[slug]/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
    <span className="text-2xl" aria-hidden="true">⬇️</span>
    <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
    ...
  </Link>
  {/* Box 4 — RFQ (navy) */}
  <Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
    <span className="text-2xl" aria-hidden="true">✉️</span>
    <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
    <p className="font-semibold text-white">Ready to Source [Product]?</p>
    <p className="text-xs text-gray-300 leading-relaxed">...</p>
    <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
  </Link>
</div>
```

---

## Content Build Status — All 46 Products Complete

| Cluster | Products | KH | Guide | Download | Bento |
|---|---|---|---|---|---|
| Bath Linen | 5 | 5/5 | 5/5 | 5/5 | 5/5 |
| Bed Linen | 6 | 6/6 | 6/6 | 6/6 | 6/6 |
| Knitted Garments | 6 | 6/6 | 6/6 | 6/6 | 6/6 |
| Woven Garments | 5 | 5/5 | 5/5 | 5/5 | 5/5 |
| Baby & Kids | 6 | 6/6 | 6/6 | 6/6 | 6/6 |
| Kitchen Linen | 4 | 4/4 | 4/4 | 4/4 | 4/4 |
| Table Linen | 1 | 1/1 | 1/1 | 1/1 | 1/1 |
| Thermal Blankets | 2 | 2/2 | 2/2 | 2/2 | 2/2 |
| Hospital Linen | 4 | 4/4 | 4/4 | 4/4 | 4/4 |
| Industrial Linen | 2 | 2/2 | 2/2 | 2/2 | 2/2 |
| Ihram | 1 | 1/1 | 1/1 | 1/1 | 1/1 |
| Fabric | 2 | 2/2 | 2/2 | 2/2 | 2/2 |
| Workwear Apparel | 1 | 1/1 | 1/1 | 1/1 | 1/1 |
| Socks | 1 | 1/1 | 1/1 | 1/1 | 1/1 |
| **TOTAL** | **46** | **46/46** | **46/46** | **46/46** | **46/46** |

---

## Content Audit — Session 1 (COMPLETE)

All 46 leaf product pages audited. Files saved to `C:\Users\Asus\Desktop\Content Audit\` (01 through 46). Session 1 is closed.

---

## Content Audit Redo — Active Task (Session 2)

### What changed from Session 1
1. **95% On-Time Delivery** — owner-approved stat. Do NOT flag as unvalidated in any file.
2. **Cotton/Polyester composition rules** — Pakistan cannot produce polyester-dominant C/P blends. Specifically NOT achievable from Pakistan: 55P/45C, 58P/42C, 60P/40C (approx). Do not recommend these compositions. Achievable from Pakistan: 100% cotton, 65C/35P, 60C/40P (CVC), 70C/30P, 80C/20P, 50/50, and standard T/C shirting 65P/35C. When auditing, flag any content that lists or recommends polyester-dominant non-standard blends as achievable.
3. **Microfiber** — 80% polyester / 20% polyamide microfiber is NOT manufactured in Pakistan (primarily China/India). Flag any claim that Pakistan sources or manufactures microfiber as inaccurate. Microfiber can be referenced as "available on request via sourcing partners" but not as a Pakistan-manufactured product.

### Scope
**Two tracks, both saved to `C:\Users\Asus\Desktop\Content Audit\redo\`:**
- **Track A — Cluster/Pillar page audits (13 new files):** Full session 1 format audit of all cluster and pillar pages. These were excluded from Session 1.
- **Track B — Leaf page redos (46 files):** Re-audit all 46 leaf pages with corrected C/P + microfiber rules and 95% delivery approved.

**Execution order:** By cluster — audit the cluster page first (Track A), then all its leaf pages (Track B), then CLOSE that cluster. Repeat for each cluster.

### Cluster Execution Order & Status
| # | Cluster/Pillar | Cluster file | Leaf pages | Status |
|---|---|---|---|---|
| A | Bath Linen | `cluster-01-bathlinen.md` | 01–05 (Towels, Inst.Towels, Bathrobes, Bath Mats, Beach/Pool) | ✅ CLOSED |
| B | Bed Linen | `cluster-02-bedlinen.md` | 06–11 (Bedsheets, Fitted, Duvet, Pillow, Cushion, Curtains) | ⬜ PENDING |
| C | Kitchen Linen | `cluster-03-kitchenlinen.md` | 12–15 (Kitchen Towels, Bar Mops, Aprons, Pot Holders) | ⬜ PENDING |
| D | Table Linen | `cluster-04-tablelinen.md` | 16 (Table Covers) | ⬜ PENDING |
| E | Thermal Blankets | `cluster-05-thermalblankets.md` | 17–18 (Cellular, Fleece) | ⬜ PENDING |
| F | Hospital Linen | `cluster-06-hospitallinen.md` | 19–22 (Gowns, Scrubs, Patient Gowns, Huck Towels) | ⬜ PENDING |
| G | Industrial Linen | `cluster-07-industriallinen.md` | 23–24 (Shop Towels, Fender Covers) | ⬜ PENDING |
| H | Ihram (standalone) | — | 25 (Ihram) | ⬜ PENDING |
| I | Home Textile Pillar | `cluster-08-hometextile.md` | — | ⬜ PENDING |
| J | Knitted Garments | `cluster-09-knittedgarments.md` | 26–31 (T-Shirts, Polo, Henley, Sweatshirts, Sweatpants, Tank Tops) | ⬜ PENDING |
| K | Woven Garments | `cluster-10-wovengarments.md` | 32–36 (Denim, Formal, Pants, Cargo, Shorts) | ⬜ PENDING |
| L | Baby & Kids | `cluster-11-babykids.md` | 37–42 (Kids Tees, Swaddle, Overalls, Rompers, Bibs, Hooded Towels) | ⬜ PENDING |
| M | Workwear (standalone) | — | 43 (Workwear Apparel) | ⬜ PENDING |
| N | Socks (standalone) | — | 44 (Socks) | ⬜ PENDING |
| O | Apparel Pillar | `cluster-12-apparel.md` | — | ⬜ PENDING |
| P | Fabric Pillar | `cluster-13-fabric.md` | 45–46 (Apparel Fabric, Home Textile Fabric) | ⬜ PENDING |

### Current Progress
**Cluster A — Bath Linen:** ✅ CLOSED (cluster-01-bathlinen.md + leaf pages 01–05 complete)
**Cluster B — Bed Linen:** 🟡 IN PROGRESS — cluster-02-bedlinen.md complete
**Last completed file:** `06-bedsheets-audit.md`
**Currently working on:** `07-fittedsheets-audit.md`
**Remaining Cluster B leaf pages:** 08-duvetcovers, 09-pillowcovers, 10-cushioncovers, 11-curtains

### Output Rules
- Save to: `C:\Users\Asus\Desktop\Content Audit\redo\`
- Cluster files named: `cluster-[##]-[slug].md`
- Leaf files named: `[##]-[slug]-audit.md` (same numbering as Session 1)
- Severity tags: Critical / Major / Minor on every finding
- Do NOT flag 95% On-Time Delivery as an issue — owner-approved
- Do NOT recommend polyester-dominant C/P blends (55P/45C, 58P/42C, 60P/40C) as achievable from Pakistan
- Do NOT treat microfiber as a Pakistan-manufactured product
- Do NOT present audit findings in chat — chat is for progress updates only
- Update this CLAUDE.md section (Current Progress) before starting each new file

### Methodology (same as Session 1)
1. Read page.tsx + Content.tsx (local code)
2. Cross-reference KH article, Guide, Download for the product
3. Compare against related/sibling pages
4. Identify: missing content, inaccuracies, SEO gaps, internal linking gaps, composition errors, consistency issues
5. Apply Session 2 corrections above throughout

### Page List (46 pages)
| # | Product | URL |
|---|---|---|
| 1 | T-Shirts | /apparel/knittedgarments/tshirts/ |
| 2 | Polo Shirts | /apparel/knittedgarments/poloshirts/ |
| 3 | Henley Shirts | /apparel/knittedgarments/henleyshirts/ |
| 4 | Sweatshirts & Hoodies | /apparel/knittedgarments/sweatshirtshoodies/ |
| 5 | Sweatpants & Joggers | /apparel/knittedgarments/sweatpantsjoggers/ |
| 6 | Tank Tops | /apparel/knittedgarments/tanktops/ |
| 7 | Denim Jeans | /apparel/wovengarments/denimjeans/ |
| 8 | Formal & Casual Shirts | /apparel/wovengarments/formalcasualshirts/ |
| 9 | Pants & Trousers | /apparel/wovengarments/pantsandtrousers/ |
| 10 | Cargo Pants | /apparel/wovengarments/cargopants/ |
| 11 | Shorts | /apparel/wovengarments/shorts/ |
| 12 | T-Shirts for Kids | /apparel/babyandkids/tshirtsforkids/ |
| 13 | Swaddle Muslin Fabric | /apparel/babyandkids/swaddlemuslinfabric/ |
| 14 | Overalls | /apparel/babyandkids/overalls/ |
| 15 | Baby Rompers | /apparel/babyandkids/babyrompers/ |
| 16 | Baby Bibs | /apparel/babyandkids/babybibs/ |
| 17 | Baby Hooded Towels | /apparel/babyandkids/babyhoodedtowels/ |
| 18 | Workwear Apparel | /apparel/workwearapparel/ |
| 19 | Socks | /apparel/socks/ |
| 20 | Towels | /hometextile/bathlinen/towels/ |
| 21 | Institutional Towels | /hometextile/bathlinen/institutionaltowels/ |
| 22 | Bathrobes | /hometextile/bathlinen/bathrobes/ |
| 23 | Bath Mats | /hometextile/bathlinen/bathmats/ |
| 24 | Beach & Pool Towels | /hometextile/bathlinen/beachpooltowel/ |
| 25 | Bedsheets | /hometextile/bedlinen/bedsheets/ |
| 26 | Fitted Sheets | /hometextile/bedlinen/fittedsheets/ |
| 27 | Duvet Covers | /hometextile/bedlinen/duvetcovers/ |
| 28 | Pillow Covers | /hometextile/bedlinen/pillowcovers/ |
| 29 | Cushion Covers | /hometextile/bedlinen/cushioncovers/ |
| 30 | Curtains | /hometextile/bedlinen/curtains/ |
| 31 | Kitchen Towels | /hometextile/kitchenlinen/kitchentowels/ |
| 32 | Bar Mops | /hometextile/kitchenlinen/barmops/ |
| 33 | Aprons | /hometextile/kitchenlinen/aprons/ |
| 34 | Pot Holders | /hometextile/kitchenlinen/potholders/ |
| 35 | Table Covers | /hometextile/tablelinen/tablecovers/ |
| 36 | Cellular Thermal Blanket | /hometextile/thermalblankets/cellularthermalblanket/ |
| 37 | Fleece Thermal Blankets | /hometextile/thermalblankets/fleecethermalblankets/ |
| 38 | Doctor Surgical Gowns | /hometextile/hospitallinen/doctorsurgicalgowns/ |
| 39 | Medical Scrubs | /hometextile/hospitallinen/medicalscrubs/ |
| 40 | Patient Gowns | /hometextile/hospitallinen/patientgowns/ |
| 41 | Surgical Huck Towels | /hometextile/hospitallinen/surgicalhucktowels/ |
| 42 | Shop Towels | /hometextile/industriallinen/shoptowels/ |
| 43 | Fender Covers | /hometextile/industriallinen/fendercovers/ |
| 44 | Ihram | /hometextile/ihram/ |
| 45 | Apparel Fabric | /fabric/apparelfabric/ |
| 46 | Home Textile Fabric | /fabric/hometextilefabric/ |

---

## SEO Technical Audit — Pending Fixes (Session 3)

**Status: HOLD — do not implement until explicitly instructed.**
**Rule: Discuss strategy and get approval before any code changes in this section.**

Audit conducted 2026-06-27. Source: SEObility link/heading reports + manual code audit of all 268 pages.

---

### Fix 1 (HIGH): Problematic page titles

#### 1a. Static pages — titles too long or too short

| File | Current title | Problem | Proposed fix |
|---|---|---|---|
| `app/page.tsx` | `MZ Global Trading \| Pakistan Textile Sourcing — Apparel, Home Textiles & Fabric` | 79 chars — too long | `Pakistan Textile Sourcing — Apparel, Home Textiles \| MZ Global Trading` (71)… discuss |
| `app/downloads/page.tsx` | `Downloads \| MZ Global Trading` | 29 chars — too vague | `Textile Sourcing Downloads \| MZ Global Trading` (48) |
| `app/faqs/page.tsx` | `FAQs \| MZ Global Trading` | 24 chars — too vague | `Textile Sourcing FAQs \| MZ Global Trading` (42) |
| `app/our-company/page.tsx` | `About Us \| MZ Global Trading` | 28 chars — no keywords | `About MZ Global Trading — Pakistan Textile Sourcing` (51) |
| `app/search/page.tsx` | `Search \| MZ Global Trading` | 26 chars — too vague | `Search Products \| MZ Global Trading` (36) |

#### 1b. Guide seoTitle values — too long (>60 chars)

File: `lib/guides-content.ts`. These guides have a separate `seoTitle` field so fixing it does NOT affect display titles or H1s — safe to fix.

| Slug | Current seoTitle (chars) | Proposed |
|---|---|---|
| `textile-product-lifecycle-design-technical-development` | 65 | `Textile Lifecycle Phase 2: Design & Development` (49) |
| `textile-product-lifecycle-supplier-factory-selection` | 63 | `Textile Lifecycle Phase 4: Supplier Selection` (47) |
| `textile-product-lifecycle-costing-moq-negotiation` | 61 | `Textile Lifecycle Phase 5: Costing & Negotiation` (50) |
| `textile-product-lifecycle-manufacturing-production` | 61 | `Textile Lifecycle Phase 7: Manufacturing` (41) |
| `textile-product-lifecycle-quality-control-compliance` | 63 | `Textile Lifecycle Phase 8: QC & Compliance` (44) |
| `textile-product-lifecycle-end-of-life-circular-economy` | 66 | `Textile Lifecycle Phase 12: Circular Economy` (46) |
| `sourcing-best-practices-supplier-evaluation-factory-selection` | 64 | `Sourcing Best Practices: Supplier Evaluation` (46) |
| `sourcing-bath-mats-pakistan` | 70 | `Sourcing Bath Mats from Pakistan` (33) |
| `sourcing-bedsheets-pakistan` | 69 | `Sourcing Bedsheets from Pakistan` (33) |
| `hotel-fitted-sheet-sourcing` | 79 | `Hotel Fitted Sheet Sourcing Guide` (34) |
| `sourcing-duvet-covers-pakistan` | 74 | `Sourcing Duvet Covers from Pakistan` (36) |
| `custom-pillow-cover-sourcing` | 72 | `Custom Pillow Cover Sourcing from Pakistan` (43) |
| `decorative-cushion-cover-sourcing` | 70 | `Decorative Cushion Cover Sourcing` (34) |
| `sourcing-curtains-pakistan` | 70 | `Sourcing Curtains from Pakistan` (32) |
| `sourcing-institutional-bedding-pakistan` | 74 | `Institutional Bedding Sourcing from Pakistan` (45) |
| `sourcing-kitchen-towels-pakistan` | 71 | `Sourcing Kitchen Towels from Pakistan` (38) |
| `sourcing-bar-mops-pakistan` | 74 | `Sourcing Bar Mops from Pakistan` (32) |
| `sourcing-aprons-pakistan` | 76 | `Sourcing Aprons from Pakistan` (30) |
| `sourcing-pot-holders-pakistan` | 73 | `Sourcing Pot Holders from Pakistan` (35) |
| `sourcing-table-covers-pakistan` | 76 | `Sourcing Table Covers from Pakistan` (36) |
| `sourcing-cellular-blankets-pakistan` | 80 | `Sourcing Cellular Blankets from Pakistan` (41) |
| `sourcing-fleece-blankets-pakistan` | 80 | `Sourcing Fleece Blankets from Pakistan` (39) |
| `sourcing-surgical-gowns-pakistan` | 76 | `Sourcing Surgical Gowns from Pakistan` (38) |
| `sourcing-medical-scrubs-pakistan` | 74 | `Sourcing Medical Scrubs from Pakistan` (38) |
| `sourcing-patient-gowns-pakistan` | 80 | `Sourcing Patient Gowns from Pakistan` (37) |
| `sourcing-huck-towels-pakistan` | 78 | `Sourcing Surgical Huck Towels from Pakistan` (44) |
| `sourcing-shop-towels-pakistan` | 73 | `Sourcing Industrial Shop Towels Pakistan` (41) |
| `sourcing-fender-covers-pakistan` | 72 | `Sourcing Fender Covers from Pakistan` (37) |
| `sourcing-ihram-pakistan` | 74 | `Sourcing Ihram from Pakistan` (29) |

**Guides with seoTitle too short (<30 chars):**

| Slug | Current (chars) | Proposed |
|---|---|---|
| `incoterms-for-textile-buyers` | 28 | `Incoterms Guide for Textile Buyers` (35) |
| `how-to-write-a-tech-pack` | 24 | `How to Write a Textile Tech Pack` (33) |
| `gsm-fabric-weight-guide` | 23 | `GSM & Fabric Weight Guide for Buyers` (37) |
| `sourcing-shorts-pakistan` | 29 | `Sourcing Shorts from Pakistan` (30) |
| `sourcing-socks-pakistan` | 28 | `Sourcing Socks from Pakistan` (29) |

**Guides with seoDescription missing:**

| Slug | Fix |
|---|---|
| `sourcing-apparel-fabric-pakistan` | Add seoDescription from guide description field |
| `sourcing-home-textile-fabric-pakistan` | Add seoDescription from guide description field |

#### 1c. Knowledge Hub article titles

**Decision: DO NOT change.** All 53 KH article titles exceed 60 chars when combined with `| MZ Global Trading`, but they are keyword-rich descriptive titles. Google truncates SERP display but indexes the full title. Shortening them would reduce keyword coverage. Leave unchanged.

---

### Fix 2 (HIGH): H1 headings too short

Pages using `<PageHero>` where the H1 is too generic to carry keyword value. Fix is in the `title` prop of `<PageHero>` inside each `*Content.tsx` file.

| File | Current H1 | Proposed H1 |
|---|---|---|
| `app/contact-us/ContactUsContent.tsx` | `Contact Us` | `Contact MZ Global Trading — Textile Sourcing` |
| `app/qualitycompliance/qualitycontrol/QualityControlContent.tsx` | `Quality Control` | `Quality Control — Pakistan Textile Factories` |
| `app/downloads/DownloadsContent.tsx` | `Document Library` | `Textile Sourcing Templates & Documents` |
| `app/quality-policy/QualityPolicyContent.tsx` | `Our Quality Policy` | `Quality Policy — MZ Global Trading` |
| `app/qualitycompliance/inspectionprocess/InspectionProcessContent.tsx` | `Inspection Process` | `Textile Inspection Process — Pakistan Factories` |
| `app/qualitycompliance/supplierevaluation/SupplierEvaluationContent.tsx` | `Supplier Evaluation` | `Supplier Evaluation — Pakistan Textile Factories` |
| `app/our-company/OurCompanyContent.tsx` | `About MZ Global Trading` | `About MZ Global Trading — Pakistan Textile Sourcing` |
| `app/textile-tools-calculator/TextileToolsContent.tsx` | `Textile Tools Calculator` | `Textile Tools Calculator — GSM, Weights & Sizes` |

**Leave as-is (no H1 change needed):** Privacy Policy, Terms of Use, RFQ (`Start Your Sourcing Request`), FAQs (`Frequently Asked Questions`), Careers — these are legal/utility pages.

---

### Fix 3 (MEDIUM): Multiple H1 on textile tools calculator

**File:** `app/textile-tools-calculator/TextileToolsContent.tsx`

**Problem:** Page has two H1s:
1. From `<PageHero>`: `Textile Tools Calculator` (correct — keep)
2. Inline inside active tool panel: `<h1 className="text-2xl font-bold text-navy-900">{toolName}</h1>` at approx. line 11340

**Fix:** Change inline `<h1>` to `<h2>` — one character change, no visual impact (same Tailwind classes apply).

---

### Fix 4 (MEDIUM): Meta descriptions too long

**Target range: 130–155 chars.**

#### 4a. Static page.tsx files — desc too long (>160 chars)

| File | Current length | Action |
|---|---|---|
| `app/apparel/page.tsx` | 161 | Trim by 1–5 words |
| `app/apparel/babyandkids/page.tsx` | 176 | Rewrite to 140–155 |
| `app/apparel/knittedgarments/page.tsx` | 179 | Rewrite to 140–155 |
| `app/apparel/wovengarments/page.tsx` | 175 | Rewrite to 140–155 |
| `app/fabric/page.tsx` | 174 | Rewrite to 140–155 |
| `app/hometextile/bathlinen/page.tsx` | 189 | Rewrite to 140–155 |
| `app/hometextile/bedlinen/page.tsx` | 189 | Rewrite to 140–155 |
| `app/hometextile/hospitallinen/page.tsx` | 164 | Trim |
| `app/hometextile/hospitallinen/medicalscrubs/page.tsx` | 170 | Trim |
| `app/hometextile/hospitallinen/patientgowns/page.tsx` | 166 | Trim |
| `app/hometextile/hospitallinen/surgicalhucktowels/page.tsx` | 164 | Trim |
| `app/hometextile/industriallinen/page.tsx` | 183 | Rewrite |
| `app/hometextile/industriallinen/fendercovers/page.tsx` | 197 | Rewrite |
| `app/hometextile/industriallinen/shoptowels/page.tsx` | 207 | Rewrite |
| `app/hometextile/kitchenlinen/page.tsx` | 162 | Trim |
| `app/hometextile/kitchenlinen/aprons/page.tsx` | 162 | Trim |
| `app/hometextile/kitchenlinen/barmops/page.tsx` | 161 | Trim |
| `app/hometextile/kitchenlinen/kitchentowels/page.tsx` | 166 | Trim |
| `app/hometextile/kitchenlinen/potholders/page.tsx` | 165 | Trim |
| `app/hometextile/tablelinen/page.tsx` | 165 | Trim |
| `app/hometextile/tablelinen/tablecovers/page.tsx` | 166 | Trim |
| `app/hometextile/thermalblankets/page.tsx` | 170 | Trim |
| `app/hometextile/thermalblankets/cellularthermalblanket/page.tsx` | 181 | Rewrite |
| `app/hometextile/thermalblankets/fleecethermalblankets/page.tsx` | 188 | Rewrite |

**Static pages — desc too short (<130 chars):**

| File | Current length | Action |
|---|---|---|
| `app/apparel/knittedgarments/henleyshirts/page.tsx` | 41 | Expand significantly |
| `app/apparel/knittedgarments/tanktops/page.tsx` | 105 | Expand |
| `app/apparel/workwearapparel/page.tsx` | 44 | Expand significantly |
| `app/apparel/wovengarments/cargopants/page.tsx` | 39 | Expand significantly |
| `app/apparel/wovengarments/denimjeans/page.tsx` | 39 | Expand significantly |
| `app/apparel/wovengarments/formalcasualshirts/page.tsx` | 52 | Expand |
| `app/apparel/wovengarments/pantsandtrousers/page.tsx` | 46 | Expand |
| `app/apparel/wovengarments/shorts/page.tsx` | 34 | Expand significantly |
| `app/contact-us/page.tsx` | 36 | Expand |
| `app/quality-policy/page.tsx` | 17 | Expand significantly |
| `app/qualitycompliance/certifications/page.tsx` | 17 | Expand significantly |
| `app/qualitycompliance/qualitycontrol/page.tsx` | 17 | Expand significantly |
| `app/rfq/page.tsx` | 97 | Expand |
| `app/search/page.tsx` | 24 | Expand |

#### 4b. Guide seoDescription — too long (47 of 77 guides)

File: `lib/guides-content.ts`. Fix directly in data file. Guides most severely over-length:
- `sourcing-pot-holders-pakistan`: 268 chars
- `sourcing-bar-mops-pakistan`: 225 chars
- `sourcing-kitchen-towels-pakistan`: 230 chars
- `sourcing-cellular-blankets-pakistan`: 268 chars
- `sourcing-fleece-blankets-pakistan`: 286 chars
- `sourcing-surgical-gowns-pakistan`: 290 chars
- Full list: all 47 guides where `seoDescription` > 160 chars (identified in audit)

#### 4c. Download descriptions — too long (45 of 59 downloads)

File: `lib/downloads-content.ts`. Fix directly in data file. Same pattern — descriptions run 173–290 chars.

#### 4d. Knowledge Hub article excerpts — too long (all 53)

**Approach (to confirm):** Modify `generateMetadata` in `app/knowledge/[slug]/page.tsx` to truncate the excerpt at the last sentence boundary before 155 chars. This is a 5-line change in one file — no article content files touched. The full excerpt is still used for listing cards.

---

### Fix 5 (LOW): Heading hierarchy problems

**Audit status:** Not yet fully audited. Product leaf pages confirmed to use correct `motion.h1 → h2 → h3` hierarchy. Cluster and corporate pages need per-file verification.

**Files to audit:**
- All 13 cluster/pillar `*Content.tsx` files
- Corporate pages: `OurCompanyContent.tsx`, `WhyChooseUsContent.tsx`, `OurProcessContent.tsx`, `CareersContent.tsx`
- Quality pages: all 4 under `qualitycompliance/`
- Legal pages: `PrivacyPolicyContent.tsx`, `TermsOfUseContent.tsx`
- Hub index pages: `KnowledgeHubContent.tsx`, `GuidesContent.tsx`, `DownloadsContent.tsx`

**Known issue:** `app/knowledge/[slug]/ArticleContent.tsx` — H1 is `{post.title}` which renders the full article title correctly. Hierarchy inside article body (markdown rendered via `renderMarkdown()`) should be verified to start at `##` (H2) not `#` (would create second H1).

---

### Standard Procedure — Future Pages (all 5 cases)

When creating any new page, enforce before marking complete:

| Element | Rule |
|---|---|
| `<title>` tag | ≤60 chars. Format: `Specific Keyword Page \| MZ Global Trading`. No word repetition. Never just `"Downloads"` or `"FAQs"` alone. |
| `description` | 130–155 chars. Front-load primary keyword. Must be a complete sentence. |
| `<h1>` | One per page. Minimum 25 chars. Must contain the primary keyword for the page. Not just a proper noun or generic label. |
| Heading hierarchy | H1 → H2 → H3 only. Never skip levels. Never use H1 inside a component if PageHero already provides one. |
| Knowledge Hub excerpts | Keep full excerpt for listing cards. In `generateMetadata`, excerpt will be auto-truncated to last sentence before 155 chars (once Fix 4d is applied). |
| Guides | `seoTitle` ≤40 chars (total ≤60 with suffix). `seoDescription` 130–155 chars. Both required fields. |
| Downloads | `title` ≤40 chars (metadata appends `\| MZ Global Trading`). `description` 130–155 chars. |
