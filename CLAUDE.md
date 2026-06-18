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

1. **No "private label" anywhere** — never write "private label" in any copy, description, JSON-LD, meta tag, component, comment, or page. Use "OEM", "custom development", "custom specifications", or "branded programs" instead. MZ Global Trading does NOT offer private label. Grep for "private label" before completing any page.

2. **Cloudflare Pages only** — no Netlify references anywhere in code, config, comments, or documentation. Security headers live in `public/_headers`. No `netlify.toml`. Build command: `npm run build`. Output dir: `out/`.

3. **WebP for all content images** — product images, hero images, OG images, menu images, card images must be `.webp`. Exception: favicons (`favicon-*.png`, `apple-touch-icon.png`) must remain PNG — browsers and iOS require PNG for system icons.

4. **SEO primary targets: USA, Canada, UK, Europe, South America, Middle East, Southeast Asia, Australia, East Asia, Russia/CIS** — all keyword strategy, copy, and metadata must address international procurement buyers in these markets. Never write content targeting Pakistan-domestic buyers. "Pakistan" appears only as the manufacturing origin, never as the target audience.

5. **No scope changes without approval** — never alter navigation structure, page hierarchy, section names, or URL patterns without explicit user instruction.

6. **All changes apply to all platforms** — every layout, visual, or functional change covers desktop, tablet, and mobile without exception. Never make a single-breakpoint change and call it done. The user should never need to say "apply to mobile too."

---

## Priority Order

1. **SEO** — every page fully optimised before marking complete
2. **Performance** — Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms. Lighthouse targets: Desktop 98+, Mobile 95+
3. **Accessibility** — WCAG 2.1 AA
4. **Mobile** — functional at 320px minimum, test at 320/375/768/1024/1280px
5. **Security** — no secrets in client code, CSP headers, noopener on external links
6. **Code quality** — server components by default, no TypeScript `any`, no inline styles

---

## Tech Stack

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom colour config
- **Animations:** Framer Motion
- **Output:** Static export — `output: "export"` in `next.config.ts` — no SSR, no API routes, no server actions
- **Deployment:** Cloudflare Pages
- **Font:** Geist Sans via `localFont` with `display: "swap"`
- **Node:** 24.x

---

## Design System

### Colours
```
Navy:      #0D1B2A  (navy-900)  — primary bg, text headings on white
Deep navy: #08111f             — sourcing cards gradient, mega menu panel bg
Gold:      #D4A017  (gold)     — accent, CTAs, highlights
```

### Header and Footer — Both White
Both the header (MegaMenu) and footer are `bg-white`. This is intentional:
- `mz-global-trading-logo-header.webp` has dark navy text — it renders correctly only on white
- `Master_Logo.webp` in the footer also needs white background
- Never change either back to dark navy without explicit instruction

### Logo Files
| Location | File | Display size |
|---|---|---|
| Header | `/images/logo/mz-global-trading-logo-header.webp` (695×335px) | `w-[160px] md:w-[190px] lg:w-[220px] h-auto` |
| Footer | `/images/logo/Master_Logo.webp` | `w-[180px] md:w-[200px] h-auto` |
| JSON-LD | `/images/logo/Master_Logo.webp` | n/a |

Never use `.png` logo files in `<img>` or `<Image>` tags (except favicons).

### Header Dimensions — All Three Must Match
- Nav div class: `h-32` (128px)
- Spacer below header: `<div className="h-32" />`
- Backdrop overlay top offset: `style={{ top: 128 }}`
- If you change header height, update all three values simultaneously.

### Typography
- Headings: Geist Sans bold, `text-navy-900` on white, `text-white` on dark
- Body: `text-gray-600` on white backgrounds, `text-gray-300` on dark
- Gold label pattern: `text-gold text-xs font-semibold tracking-[0.2em] uppercase`
- Section heading pattern: gold label → h2 bold navy (`text-3xl sm:text-4xl font-bold text-navy-900`)

---

## URL Pattern

- **All internal URLs use trailing slash:** `/apparel/`, `/hometextile/bathlinen/towels/`, `/rfq/`
- **Never omit** the trailing slash on any `<Link href>`, `canonical`, `sitemap.xml`, or JSON-LD URL
- **Base URL:** `https://mzglobaltrading.com`

---

## Internal Link Targets

| Action | Destination |
|---|---|
| Request a Quote CTA | `/rfq/` |
| Contact link | `/contact-us/` |
| Explore Products (secondary CTA) | `/hometextile/bathlinen/towels/` |
| Apparel category | `/apparel/` |
| Home Textiles category | `/hometextile/` |
| Fabric category | `/fabric/` |
| Breadcrumb home | `/` |

## External Links

Always: `target="_blank" rel="noopener noreferrer"`

---

## Page File Structure

Every page follows this two-file pattern:
```
app/section/page-name/
  page.tsx              ← metadata export + layout shell (MegaMenu + main + Footer)
  PageNameContent.tsx   ← content component — add "use client" here if needed
```

### page.tsx Template
```tsx
import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PageNameContent from "./PageNameContent";

export const metadata: Metadata = {
  title: "Page Name | MZ Global Trading",          // ≤60 chars — check length before saving
  description: "130–160 chars for international buyers with primary keyword front-loaded.",
  keywords: ["keyword1", "keyword2"],
  alternates: {
    canonical: "/section/page-name/",              // relative, trailing slash required
    languages: {
      "en": "https://mzglobaltrading.com/section/page-name/",
      "x-default": "https://mzglobaltrading.com/section/page-name/",
    },
  },
  openGraph: {
    title: "Page Name | MZ Global Trading",
    description: "OG description — can be up to 200 chars.",
    url: "https://mzglobaltrading.com/section/page-name/",
    images: [{ url: "/images/og/page-name-og.webp", width: 1200, height: 630, alt: "Alt text 80–140 chars" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Name | MZ Global Trading",
    description: "Twitter description.",
  },
};

export default function PageNamePage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <PageNameContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",                    // swap for CollectionPage / AboutPage etc as needed
            name: "Product Name — Pakistan Export",
            description: "...",
            image: "https://mzglobaltrading.com/images/og/page-name-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "MZ Global Trading" },
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/page-name-og.webp",
              name: "Descriptive image name",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Section", item: "https://mzglobaltrading.com/section/" },
                { "@type": "ListItem", position: 3, name: "Page Name", item: "https://mzglobaltrading.com/section/page-name/" },
              ],
            },
          }),
        }}
      />
      {/* FAQPage schema — add below Product schema if page has an FAQ section */}
      {/*
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Question text?",
                acceptedAnswer: { "@type": "Answer", text: "Answer text." },
              },
            ],
          }),
        }}
      />
      */}
    </>
  );
}
```

---

## Mandatory Checklist — Every Page Before Marking Complete

### SEO
- [ ] Unique `title` — format: `"Specific Page Name | MZ Global Trading"`, **max 60 chars** — count before saving
- [ ] Unique `description` — **130–160 chars**, primary keyword front-loaded, written for international buyers — count before saving
- [ ] `alternates.canonical` — relative URL with trailing slash
- [ ] `alternates.languages` — **both `"en"` and `"x-default"` pointing to absolute URL** — required on every page, not just layout.tsx
- [ ] `openGraph` block: title, description, url (absolute), images array with `.webp` OG image
- [ ] `twitter` block: `card: "summary_large_image"`, title, description
- [ ] **Product/BreadcrumbList JSON-LD** — use page.tsx template; include `primaryImageOfPage`
- [ ] **FAQPage JSON-LD** — add whenever the page has an FAQ section; questions must exactly match on-page FAQ text
- [ ] Single `<h1>` per page containing primary keyword
- [ ] Heading hierarchy h1 → h2 → h3 only — no skips
- [ ] Every `<Image>` has descriptive 80–140 char `alt` text — pattern: `"Pakistan [product] manufacturer — [descriptor] for [buyer type] in [markets]"`
- [ ] `<main id="main-content">` on every page
- [ ] Internal links use `<Link>` from `next/link`
- [ ] No mention of "private label" — grep before completing
- [ ] Run `python scripts/check-page.py app/section/page-name/page.tsx` — zero issues before marking done

### Performance
- [ ] `<Image>` component for ALL content images — `<img>` only for logo in MegaMenu
- [ ] Above-the-fold hero image has `priority` prop
- [ ] Every `<Image>` has appropriate `sizes` prop
- [ ] `"use client"` only on components that need browser APIs, hooks, or event listeners
- [ ] No unused imports
- [ ] Heavy components not needed at first paint use `dynamic()` with `ssr: false`

### Accessibility (WCAG 2.1 AA)
- [ ] Every `<button>` has visible text or `aria-label`
- [ ] Icon-only interactive elements have `aria-label`
- [ ] Decorative SVGs have `aria-hidden="true"`
- [ ] Form inputs always have `<label htmlFor="...">`
- [ ] Link text is descriptive — never "click here"
- [ ] Focus rings visible — never `outline-none` without replacement
- [ ] Touch targets minimum 44×44px on mobile
- [ ] All text on navy-900 meets 4.5:1 contrast minimum

### Mobile
- [ ] Layout functional at 320px — no horizontal scroll
- [ ] Font size minimum `text-sm` (14px) on mobile
- [ ] Test at 320px, 375px, 768px, 1024px, 1280px

### Security
- [ ] No secrets in client-side code
- [ ] External links: `rel="noopener noreferrer"` and `target="_blank"`
- [ ] No `dangerouslySetInnerHTML` with user-supplied content

### Code Quality
- [ ] Server component by default
- [ ] No TypeScript `any`
- [ ] No inline `style={{}}` — Tailwind only (exception: dynamic values like clip-path, flex ratios, animation delays)
- [ ] No commented-out code blocks

---

## Animation System (Framer Motion)

### Spring Presets
```tsx
// Mega menu panel entrance
panelVariants: { stiffness: 280, damping: 26, staggerChildren: 0.07 }

// Category rows in mega menu
rowVariants: { stiffness: 340, damping: 28 }

// Sub-items in mega menu
itemVariants: { stiffness: 420, damping: 32 }

// Left brand panel in mega menu
leftPanelVariants: { stiffness: 300, damping: 26 }

// Preview zone crossfade in mega menu
previewZoneVariants: { stiffness: 300, damping: 26 }
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

### Accordion — SourcingCapabilities (CSS flex, not Framer)
```tsx
// Width transition: CSS flex ratio
style={{ flex: isActive ? 3 : 1, transition: "flex 0.55s cubic-bezier(0.34, 1.15, 0.64, 1)" }}

// Image scale
style={{ transform: isActive ? "scale(1.06)" : "scale(1)", transition: "transform 0.6s ease-out" }}

// Content reveal (Framer)
contentVariants: {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.08, when: "beforeChildren", staggerChildren: 0.05 } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.12 } },
}
itemVariants: {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.18 } },
}
```

### Hero Combined Slide — Diagonal Panel Entrance
```tsx
// Left panel
initial={{ x: -60, scale: 1, opacity: 0 }} → spring stiffness:240 damping:28 delay:0

// Middle panel
initial={{ x: 0, scale: 1.07, opacity: 0 }} → spring delay:0.15

// Right panel
initial={{ x: 60, scale: 1, opacity: 0 }} → spring delay:0.3

// Panel labels
initial={{ opacity: 0, y: 14 }} → transition: duration:0.4 delay: (panel.delay + 0.38)
```

### Rules
- `"use client"` only on components that need browser APIs, hooks, or event listeners
- Always wrap conditionally rendered animated elements in `<AnimatePresence>`
- All `whileInView` animations use `viewport={{ once: true }}`
- `AnimatePresence mode="wait"` for slide transitions

---

## JSON-LD Patterns

**Global (layout.tsx only):** Organization schema — do NOT repeat on pages.

**Product category page:**
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "url": "https://mzglobaltrading.com/section/",
  "name": "Category Name | MZ Global Trading",
  "description": "...",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mzglobaltrading.com/" },
      { "@type": "ListItem", "position": 2, "name": "Category", "item": "https://mzglobaltrading.com/section/" },
    ],
  },
}) }} />
```

**Individual product page:**
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "...",
  "image": "https://mzglobaltrading.com/images/products/...",
  "brand": { "@type": "Brand", "name": "MZ Global Trading" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "MZ Global Trading" },
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mzglobaltrading.com/" },
      { "@type": "ListItem", "position": 2, "name": "Section", "item": "https://mzglobaltrading.com/section/" },
      { "@type": "ListItem", "position": 3, "name": "Product", "item": "https://mzglobaltrading.com/section/product/" },
    ],
  },
}) }} />
```

**Corporate/about page:**
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "url": "https://mzglobaltrading.com/our-company/",
  "name": "About MZ Global Trading",
  "mainEntity": { "@id": "https://mzglobaltrading.com/#organization" },
}) }} />
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
| SourcingCapabilities card | `<Image>` | `"(max-width: 1280px) 50vw, 40vw"` |
| OG images | Static file | 1200×630px `.webp` |

- All content images: `.webp` format only
- Favicons: remain PNG — required by browsers/iOS
- Menu images in `/public/images/menu/` — naming: `menu-[product-name].webp`

### Alt Text Rules (Google-confirmed best practice)

**Content images (heroes, product cards, banners):**
- Length: **80–140 characters** — enough detail without overwhelming
- Front-load the primary keyword: "Pakistan towel manufacturer —..." not "...manufacturer in Pakistan"
- Describe WHY the image exists on the page, not just what it shows
- Include manufacturing origin (Pakistan) + product type + target market (USA, UK, Europe) where natural
- Pattern: `"Pakistan [product] manufacturer — [descriptor] for [buyer type] in [markets]"`
- Never keyword-stuff: "towel Pakistan wholesale export B2B manufacturer" is spam

**Functional/icon images (process icons, stat icons, why-us icons):**
- Use the element's title/label as alt — e.g., "Quality Assurance", "Requirement Analysis"
- These describe the icon's PURPOSE, not visual appearance

**Decorative images (background patterns, ornamental borders):**
- Use `alt=""` (empty string) — tells screen readers to skip
- NEVER omit the `alt` attribute entirely

**Logos:**
- Header/footer logos: `alt="MZ Global Trading"` — brand name only, correct
- Certification logos: Full certification name + purpose, e.g., "GOTS Global Organic Textile Standard certified"

### File Naming (Google-confirmed ranking signal)
- Use **hyphens**, never underscores: `pakistan-towel-manufacturer.webp` ✓ / `pakistan_towel_manufacturer.webp` ✗
- 3–5 descriptive words maximum
- Current file names are acceptable. Recommended upgrade names (apply when replacing images):
  - `hero-apparel.webp` → `pakistan-apparel-manufacturer-garments-wholesale.webp`
  - `hero-home-textiles.webp` → `pakistan-home-textile-manufacturer-towels-bed-linen.webp`
  - `hero-fabric.webp` → `pakistan-textile-fabric-manufacturer-knitted-woven.webp`
  - `hero-about.webp` → `pakistan-textile-factory-mz-global-trading-sourcing.webp`
  - `cat-banner-apparel.webp` → `pakistan-apparel-manufacturing-garments-export.webp`
  - `cat-banner-home-textiles.webp` → `pakistan-home-textile-towels-linen-export.webp`
  - `cat-banner-fabric.webp` → `pakistan-fabric-manufacturer-knitted-woven-export.webp`

### Image Sitemap (Google-confirmed, `public/sitemap.xml`)
- Namespace: `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"` (added to `<urlset>`)
- Only `<image:loc>` is required — all other image sitemap tags (`<image:title>`, `<image:caption>`, `<image:geo_location>`) have been **deprecated by Google since May 2022**
- Add `<image:image><image:loc>URL</image:loc></image:image>` for every hero and key content image on built pages
- Built pages already have image entries: homepage (6 images), About Us (5 images), Towels (1 image)

### `primaryImageOfPage` JSON-LD (schema.org)
Every page with a hero image should include `primaryImageOfPage` in its JSON-LD:
```tsx
"primaryImageOfPage": {
  "@type": "ImageObject",
  "contentUrl": "https://mzglobaltrading.com/images/hero/hero-[page].webp",
  "name": "Descriptive name for the image",
}
```
Already added to: homepage (WebPage schema), About Us (AboutPage schema).

### CertificationsStrip Image Containers
Fixed `140×80px` containers per cert — `style={{ width: 140, height: 80 }}` with `className="object-contain w-full h-full"`. Never use `w-auto` on cert images; aspect ratio variation causes uneven spacing.

---

## Copy Standards

- **Audience:** procurement managers, brand owners, retail buyers in USA, UK, Canada, Europe, South America
- **Tone:** professional, direct, B2B — not consumer-facing
- **Never use:** "private label", "dropshipping", "low MOQ" as selling points
- **Use instead:** "OEM", "custom development", "bulk orders", "international shipping", "certified manufacturers"
- **Pakistan:** appears as manufacturing origin only — "manufactured in Pakistan's certified factories"
- **CTA destinations:** `Request a Quote` → `/rfq/` · `Contact` → `/contact-us/`
- **Explore Products** → `/hometextile/bathlinen/towels/`

---

## Deployment Workflow

1. `npm run build` — generates static export in `/out/`
2. Deploy `/out/` folder to Cloudflare Pages
3. `public/_headers` — Cloudflare applies security headers automatically
4. `public/_redirects` — Cloudflare handles redirects
5. No server-side rendering, no API routes, no server actions

### Cloudflare Pages Config
- Build command: `npm run build`
- Output directory: `out/`
- Node version: 20+

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

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## SEO Strategy

### Geographic Targeting
- **Primary:** USA, Canada, UK, all of Europe (EU + non-EU), South America (BR, AR, CL, CO, PE, MX), Middle East (AE, SA, QA, KW, BH, OM, EG, TR, JO), Southeast Asia (SG, MY, TH, ID, PH, VN), Australia, New Zealand, East Asia (JP, KR), Russia and CIS (RU, KZ, UA, UZ, AZ, GE)
- **Do not target:** Pakistan domestic only
- **Mechanism:** `areaServed: "Worldwide"` in Organization JSON-LD, meta descriptions referencing international buyers, English-language content

### `areaServed` Countries (Organization JSON-LD in layout.tsx)
Currently set to `"Worldwide"` — covers all target markets. Country-level breakdown for reference:
North America: US, CA | Europe: GB, DE, FR, NL, IT, ES, BE, SE, NO, DK, FI, CH, AT, PL, PT, IE, CZ, HU, RO, GR | South America: BR, AR, CL, CO, PE, MX | Middle East: AE, SA, QA, KW, BH, OM, EG, TR, JO | SE Asia: SG, MY, TH, ID, PH, VN | Oceania: AU, NZ | East Asia: JP, KR | Russia/CIS: RU, KZ, UA, UZ, AZ, GE

### Keyword Tiers
**Tier 1 — Category level:**
"apparel manufacturer Pakistan", "home textile supplier Pakistan", "towels manufacturer exporter", "OEM garment manufacturer"

**Tier 2 — Sub-category level:**
"bath towels wholesale supplier", "hotel towels bulk order", "bed linen wholesale UK", "custom polo shirts manufacturer"

**Tier 3 — Product level / high conversion:**
"GOTS certified towel manufacturer Pakistan", "terry cloth towels minimum order", "hospital scrubs manufacturer Pakistan"

### Content Pillar Architecture
```
PILLAR  (/apparel/,  /hometextile/,  /fabric/)
  ↓
CLUSTER (/apparel/knittedgarments/,  /hometextile/bathlinen/)
  ↓
LEAF    (/apparel/knittedgarments/tshirts/,  /hometextile/bathlinen/towels/)
```

### Content Build Sequence
1. Authority foundation: Homepage, About Us, Why Choose Us, Quality & Compliance
2. High-volume pillar pages: /apparel/, /hometextile/, /fabric/
3. High-intent cluster pages
4. Individual product leaf pages

### Technical SEO (Implemented)
- Canonical URLs on every page
- XML sitemap (78 pages, correct priorities)
- robots.txt
- Organization JSON-LD with social profiles and areaServed
- Twitter card + OpenGraph on all pages
- font-display: swap
- Security headers via Cloudflare
- Skip-to-content link

### Technical SEO (Pending)
- hreflang: add `<link rel="alternate" hreflang="en" href="...">` and `hreflang="x-default"` to layout.tsx
- Google Search Console: after launch, set preferred country to USA

### Sitemap Priorities
- Homepage: 1.0
- Category pages (/apparel/, /hometextile/, etc.): 0.9
- RFQ page: 0.9
- Product/section pages: 0.8
- Corporate pages: 0.7
- Legal pages: 0.3

---

## Multi-language Decision

**Decision: Do not implement i18n at this time.**

Reasons: new domain needs English authority first, maintenance burden (78 × N languages), quality risk with machine translation for B2B copy, Cloudflare Pages free tier 20,000 file limit would be approached with 6+ languages.

Revisit after launch when Google Search Console data shows which non-English markets are generating impressions.

If implemented in future: use `app/[locale]/` structure with `next-intl`, professional human translations, `hreflang` per page.

---

## Component Registry

| Component | File | Status | Notes |
|---|---|---|---|
| MegaMenu | `components/MegaMenu.tsx` | Complete | White header, h-32, all 78 URLs wired, hover preview zone |
| Footer | `components/Footer.tsx` | Complete | White, 5-column, certifications in bottom bar |
| Hero | `components/Hero.tsx` | Complete | 4 slides: combined + apparel + home textiles + fabric |
| SourcingCapabilities | `components/SourcingCapabilities.tsx` | Complete | Accordion desktop, stacked mobile |
| CertificationsStrip | `components/CertificationsStrip.tsx` | Complete | Marquee, fixed 140×80px containers |
| CTABanner | `components/CTABanner.tsx` | Complete | Compact centred, navy bg, gold CTA |
| WhyUs | `components/WhyUs.tsx` | Complete | "private label" removed |
| StatsBar | `components/StatsBar.tsx` | Exists | — |
| ProcessSteps | `components/ProcessSteps.tsx` | Exists | — |

### MegaMenu Architecture
- Left panel: content-aware brand panel (heading, bullets, CTA) — changes per nav item hover
- Centre: CategoryRow[] with sub-items as horizontal flex-wrap
- Right: preview zone — `AnimatePresence` crossfade on sub-item hover using `currentImg` state
- Mobile: 3-level spring accordion
- Spring values: panelVariants stiffness:280 damping:26, rowVariants stiffness:340, itemVariants stiffness:420

### Footer Architecture (5 Columns)
| Col | Content |
|---|---|
| 1 | Brand: `Master_Logo.webp`, description, Facebook + LinkedIn social icons |
| 2 | Apparel: 8 product links |
| 3 | Home Textiles (7 links) + divider + Fabric (2 links) |
| 4 | Company: 6 links |
| 5 | Support: gold RFQ button + 4 support links + divider + Contact (email, phone, address) |
| Bottom bar | Copyright + certifications (8, `hidden md:block`) + Privacy Policy · Terms of Use |

### Hero Architecture (4 Slides, 5s interval)
| Slide | ID | Background |
|---|---|---|
| 0 | combined | Parallelogram panels (desktop) / horizontal strips (mobile) — all 3 category images |
| 1 | apparel | `hero-apparel.webp` full-width with gradient |
| 2 | home-textiles | `hero-home-textiles.webp` full-width with gradient |
| 3 | fabric | `hero-fabric.webp` full-width with gradient |

Combined slide panel labels use frosted pill `bg-navy-950/60 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3` — this prevents text from blending into light-coloured imagery.

---

## Pages Built

### Phase 1 — Authority Foundation (Complete ✓)
| Page | File |
|---|---|
| Homepage | `app/page.tsx` |
| About Us | `app/our-company/page.tsx` |
| Why Choose Us | `app/whychooseus/page.tsx` |
| Our Process | `app/ourprocess/page.tsx` |
| Quality Policy | `app/quality-policy/page.tsx` |
| Certifications | `app/qualitycompliance/certifications/page.tsx` |
| Supplier Evaluation | `app/qualitycompliance/supplierevaluation/page.tsx` |
| Quality Control | `app/qualitycompliance/qualitycontrol/page.tsx` |
| Inspection Process | `app/qualitycompliance/inspectionprocess/page.tsx` |
| Careers | `app/careers/page.tsx` |
| FAQs | `app/faqs/page.tsx` |
| Downloads | `app/downloads/page.tsx` |
| Guides | `app/guides/page.tsx` |
| Textile Tools Calculator | `app/textile-tools-calculator/page.tsx` |
| Knowledge Hub | `app/knowledge/page.tsx` |
| Contact Us | `app/contact-us/page.tsx` |
| RFQ | `app/rfq/page.tsx` |
| Privacy Policy | `app/privacypolicy/page.tsx` |
| Terms of Use | `app/termsofuse/page.tsx` |
| Search | `app/search/page.tsx` |

### Phase 1 — First Product Leaf (Complete ✓)
| Page | File |
|---|---|
| Towels | `app/hometextile/bathlinen/towels/page.tsx` |

### Phase 2 — Pillar Pages (Next)
| Page | File | Status |
|---|---|---|
| Apparel | `app/apparel/page.tsx` | Pending |
| Home Textiles | `app/hometextile/page.tsx` | Pending |
| Fabric | `app/fabric/page.tsx` | Pending |

### Phase 3 — Cluster Pages (After Pillars)
/apparel/knittedgarments/, /apparel/wovengarments/, /apparel/babyandkids/
/hometextile/bathlinen/, /hometextile/bedlinen/, /hometextile/kitchenlinen/
/hometextile/tablelinen/, /hometextile/thermalblankets/, /hometextile/hospitallinen/, /hometextile/industriallinen/

### Phase 4 — Product Leaf Pages (54 remaining)
All remaining sitemap URLs under /apparel/*/* and /hometextile/*/* and /fabric/*/

---

## Full Sitemap (78 Pages)

```
/

/our-company/
/whychooseus/
/ourprocess/
/careers/
/blog/
/textile-tools-calculator/
/faqs/
/downloads/
/guides/
/privacypolicy/
/termsofuse/
/contact-us/
/rfq/

/quality-policy/
/qualitycompliance/certifications/
/qualitycompliance/supplierevaluation/
/qualitycompliance/qualitycontrol/
/qualitycompliance/inspectionprocess/

/apparel/
/apparel/knittedgarments/
/apparel/knittedgarments/tshirts/
/apparel/knittedgarments/poloshirts/
/apparel/knittedgarments/henleyshirts/
/apparel/knittedgarments/sweatshirtshoodies/
/apparel/knittedgarments/sweatpantsjoggers/
/apparel/knittedgarments/tanktops/
/apparel/wovengarments/
/apparel/wovengarments/denimjeans/
/apparel/wovengarments/formalcasualshirts/
/apparel/wovengarments/pantsandtrousers/
/apparel/wovengarments/cargopants/
/apparel/wovengarments/shorts/
/apparel/babyandkids/
/apparel/babyandkids/tshirtsforkids/
/apparel/babyandkids/swaddlemuslinfabric/
/apparel/babyandkids/overalls/
/apparel/babyandkids/babyrompers/
/apparel/babyandkids/babybibs/
/apparel/babyandkids/babyhoodedtowels/
/apparel/workwearapparel/
/apparel/socks/

/hometextile/
/hometextile/bathlinen/
/hometextile/bathlinen/towels/
/hometextile/bathlinen/institutionaltowels/
/hometextile/bathlinen/bathrobes/
/hometextile/bathlinen/bathmats/
/hometextile/bathlinen/beachpooltowel/
/hometextile/bedlinen/
/hometextile/bedlinen/bedsheets/
/hometextile/bedlinen/fittedsheets/
/hometextile/bedlinen/duvetcovers/
/hometextile/bedlinen/pillowcovers/
/hometextile/bedlinen/cushioncovers/
/hometextile/bedlinen/curtains/
/hometextile/kitchenlinen/
/hometextile/kitchenlinen/kitchentowels/
/hometextile/kitchenlinen/barmops/
/hometextile/kitchenlinen/aprons/
/hometextile/kitchenlinen/potholders/
/hometextile/tablelinen/
/hometextile/tablelinen/tablecovers/
/hometextile/thermalblankets/
/hometextile/thermalblankets/cellularthermalblanket/
/hometextile/thermalblankets/fleecethermalblankets/
/hometextile/hospitallinen/
/hometextile/hospitallinen/doctorsurgicalgowns/
/hometextile/hospitallinen/medicalscrubs/
/hometextile/hospitallinen/patientgowns/
/hometextile/hospitallinen/surgicalhucktowels/
/hometextile/industriallinen/
/hometextile/industriallinen/shoptowels/
/hometextile/industriallinen/fendercovers/
/hometextile/ihram/

/fabric/
/fabric/apparelfabric/
/fabric/hometextilefabric/
```

---

## Mega Menu Structure

### Navigation Order
1. **Home** → `/`
2. **Corporate** (mega) — left panel: company overview CTA
3. **Apparel** (mega) — left panel: apparel sourcing pitch
4. **Home Textiles** (mega) — left panel: home textiles pitch
5. **Fabric** (mega) — left panel: fabric sourcing pitch
6. **Quality & Compliance** (mega) — left panel: quality overview
7. **Contact Us** → `/contact-us/`

### Corporate Rows
- **Company:** About Us `/our-company/`, Why Choose Us `/whychooseus/`, Our Process `/ourprocess/`, Careers `/careers/`, Blogs `/blog/`
- **Resources:** Textile Tools Calculator, FAQs `/faqs/`, Downloads `/downloads/`, Guides `/guides/`
- **Legal:** Privacy Policy `/privacypolicy/`, Terms of Use `/termsofuse/`

### Apparel Rows
- **Knitted Garments:** T-Shirts, Polo Shirts, Henley Shirts, Sweatshirts & Hoodies, Sweatpants & Joggers, Tank Tops
- **Woven Garments:** Denim Jeans, Formal & Casual Shirts, Pants & Trousers, Cargo Pants, Shorts
- **Baby & Kids:** T-Shirts for Kids, Swaddle Muslin Fabric, Overalls, Baby Rompers, Baby Bibs, Baby Hooded Towels
- **Workwear Apparel** (link only) → `/apparel/workwearapparel/`
- **Socks** (link only) → `/apparel/socks/`

### Home Textiles Rows
- **Bath Linen:** Towels, Institutional Towels, Bathrobes, Bath Mats, Beach & Pool Towels
- **Bed Linen:** Bedsheets, Fitted Sheets, Duvet Covers, Pillow Covers, Cushion Covers, Curtains
- **Kitchen Linen:** Kitchen Towels, Bar Mops, Aprons, Pot Holders
- **Table Linen:** Table Covers
- **Thermal Blankets:** Cellular Thermal Blanket, Fleece Thermal Blankets
- **Hospital Linen:** Doctor Surgical Gowns, Medical Scrubs, Patient Gowns, Surgical Huck Towels
- **Industrial Linen:** Shop Towels, Fender Covers
- **Ihram** (link only) → `/hometextile/ihram/`

### Fabric Rows
- **Fabric:** Apparel Fabric `/fabric/apparelfabric/`, Home Textile Fabric `/fabric/hometextilefabric/`

### Quality & Compliance Rows
- **Compliance:** Quality Policy, Supplier Evaluation, Quality Control, Inspection Process, Certifications

---

## Certifications

**Displayed in CertificationsStrip marquee (10):**
OEKO-TEX, GOTS, BSCI, Sedex, ISO 9001, GRS, WRAP, BCI, SA8000, Bluesign

**Displayed in Footer bottom bar (8):**
GOTS · OEKO-TEX · BSCI · ISO 9001 · Sedex · GRS · SA8000 · WRAP

Cert images: `/public/images/certs/cert-[name].webp`

---

## Public Assets Structure

```
public/
  _headers                   ← Cloudflare security headers
  _redirects                 ← Cloudflare URL redirects
  robots.txt
  sitemap.xml                ← 78 pages, correct priorities
  favicon-32.png             ← PNG required
  favicon-192.png            ← PNG required
  apple-touch-icon.png       ← PNG required
  images/
    logo/
      Master_Logo.webp                       ← Footer logo
      mz-global-trading-logo-header.webp     ← Header logo (695×335px)
    hero/
      hero-apparel.webp
      hero-home-textiles.webp
      hero-fabric.webp
    cards/
      cat-banner-apparel.webp
      cat-banner-home-textiles.webp
      cat-banner-fabric.webp
    menu/                    ← All mega menu preview images (menu-[name].webp)
    certs/                   ← Certification badge images (cert-[name].webp)
    og/                      ← OG images, 1200×630px .webp
    thumbnails/              ← Product thumbnail images
    team/
      Muhammad-Muzammil.webp
    icons/
      social/
        icon-social-facebook.svg
        icon-social-linkedin.svg
```

### Missing Menu Images (Awaiting User)
- `menu-doctorsurgicalgowns.webp` — Doctor Surgical Gowns currently uses parent Hospital Linen image
- `menu-shoptowels.webp` — Shop Towels currently uses parent Industrial Linen image

---

## Known Pending Items

- **hreflang tags:** Add `<link rel="alternate" hreflang="en">` and `hreflang="x-default"` to `app/layout.tsx`
- **Missing menu images:** Doctor Surgical Gowns, Shop Towels — awaiting user-supplied WebP files
- **Google Search Console:** After launch, set preferred country to USA
- **Remaining pages:** All sitemap pages except the 4 built so far
- **Build sequence:** Pillar pages first (/apparel/, /hometextile/, /fabric/, /rfq/, /contact-us/), then clusters, then product leaves

---

## RFQ Wizard — Architecture & Product Data Reference

**Status:** Approved for build. Research finalised 2026-06-11.

### File Locations
| File | Purpose |
|---|---|
| `app/rfq/page.tsx` | Metadata, JSON-LD, page shell |
| `app/rfq/RFQContent.tsx` | Full wizard UI — `"use client"` |
| `lib/rfq-product-options.ts` | All product-specific dropdown data (single source of truth) |

`lib/` is at the project root alongside `app/`. This is the standard Next.js 14 location for non-component library code.

---

### Wizard Structure — 4 Steps (approved 2026-06-11)

Previous wizard had 5 steps. **Rebuilt as 4 steps:**

```
STEP 1 — Product Requirements
  Product Category → Product Type → [All specs for that product]
  Certifications (product-aware multi-select + "Other" free text)

STEP 2 — Commercial & Logistics
  Quantity (numeric) + Unit of Measure (product-specific dropdown)
  Target Price (USD) · Delivery Date · Destination Country
  Incoterm · Port of Destination (conditional: CIF or CFR only)
  Additional Logistics Notes

STEP 3 — Your Details
  Full Name · Company · Email · Phone · Country (all mandatory)
  How Did You Hear About Us (optional dropdown)

STEP 4 — Review & Submit
  Full summary with edit buttons per section
  Submit opens mailto
```

**Key structural rules:**
- Single page, no URL changes between steps
- Back button at top AND bottom of each step
- Sticky progress bar: fixed, `top: 128px` (below 128px header), `h-[48px]`, colorful (gold = done, navy = active, gray = pending)
- Autosave: `localStorage` between steps so browser refresh does not lose data
- Validation before advancing — no progression on mandatory field errors
- Remove the text "Review your full submission on the next step before your email client opens." entirely
- `FinishCheckboxes` component for multi-select finishes (same visual pattern as Certifications grid)

---

### Field Validation Rules
| Field | Validation |
|---|---|
| Quantity | Numeric only — must contain at least one digit |
| Email | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Phone | Digits only ≥ 7 after stripping non-numeric |
| Delivery Date | Must be future date |
| Dropdowns | Placeholder value (`""`) not accepted as valid selection |
| Mandatory fields | Block progression; scroll to first error |
| Target Price | If provided, must contain at least one digit |

---

### Sticky Progress Bar Spec
- `position: fixed`, `top: 128px` (header is h-32 = 128px)
- `z-index` above page content, below MegaMenu (MegaMenu is `z-50`, bar is `z-40`)
- Height: `48px` total
- Background: white with bottom border `border-gray-100`
- Steps: number pill + label (md+) / number only (mobile)
- Colors: completed = `bg-gold text-navy-900`, active = `bg-navy-900 text-white`, pending = `bg-gray-100 text-gray-400`
- Connector line: gold when completed, gray when pending
- Shadow: `shadow-sm`

---

### Data File Architecture (`lib/rfq-product-options.ts`)

Exported types and objects:
```ts
// Keyed by exact productType string (matches dropdown values)
export type ProductKey = string;

export interface ProductOptions {
  constructionLabel: string;        // "Fabric Type" | "Knit Structure" | "Weave / Structure"
  constructionOptions: string[];
  weightLabel: string;              // "GSM" | "Weight (oz)" | "Thread Count" | "Weight / Denier"
  weightPlaceholder: string;
  sizeLabel: string;                // "Size Range" | "Shoe Size Range" | "Age / Size Range" | "Waist / Inseam Range" | "Standard Size"
  sizeOptions: string[];
  showFitType: boolean;
  fitOptions: string[];
  showSizeStandard: boolean;
  designLabel: string;              // "Print Type" | "Design / Pattern" | "Design"
  printTypeOptions: string[];
  printPlacementLabel: string;      // "Placement" | "Design Placement"
  printPlacementOptions: string[];
  finishingOptions: string[];       // Used for multi-select FinishCheckboxes
  individualPackOptions: string[];
  setCompositionOptions: string[];
  unitOfMeasure: string[];
  certifications: string[];
  // Special flags
  isIhram?: boolean;                // Forces white-only color, no decoration
  isMedical?: boolean;              // Shows sterilization options
  isFabricRoll?: boolean;           // Shows roll packing instead of unit packing
  showBorderField?: boolean;        // Terry products and bed linen only
  showPocketDepth?: boolean;        // Fitted sheets only
  showClosureType?: boolean;        // Duvet covers, pillow/cushion covers
  showCollarType?: boolean;         // Bathrobes only
  showHeatingRating?: boolean;      // Pot holders only
  showBackingType?: boolean;        // Bath mats only
  showHeadingType?: boolean;        // Curtains only
  showLiningType?: boolean;         // Curtains only
}

export const PRODUCT_OPTIONS: Record<ProductKey, ProductOptions>
```

---

### Complete Product Options Reference

#### APPAREL

##### T-Shirts
```
constructionLabel: "Fabric Type"
constructionOptions: Single Jersey | Double Jersey / Interlock | Pique |
  Rib (1×1) | Rib (2×2) | Waffle Knit | Mesh / Eyelet
weightLabel: "GSM"
weightPlaceholder: "e.g. 160 gsm, 180–200 gsm"
sizeLabel: "Size Range"
sizeOptions: XS–XL | XS–2XL | XS–3XL | XXS–3XL | S–XXL |
  Women's XS–XL | Youth S/M/L | Custom
showFitType: true
fitOptions: Regular / Standard | Slim Fit | Oversized / Relaxed |
  Athletic / Performance | Women's Cut | Unisex
showSizeStandard: true
designLabel: "Print Type"
printTypeOptions: Screen Print | Digital / DTG Print | Embroidery |
  Heat Transfer | Sublimation Print | Appliqué | Rubber / Puff Print | No decoration
printPlacementOptions: Front chest — left | Front chest — center |
  Front — full chest | Back — upper | Back — full |
  Left sleeve | Right sleeve | All-over | No decoration
finishingOptions: Soft hand / Silicone | Anti-shrink / Compacted |
  Enzyme wash | Stone wash | Garment dye | Peached / Sueded |
  Moisture Wicking | Anti-pill | No special finish
individualPackOptions: Individual polybag | Hanger + polybag |
  Board fold (retail) | Folded flat (export) | Vacuum packed | No individual packaging
unitOfMeasure: Pieces | Dozens | Sets
certifications: GOTS | OEKO-TEX | BSCI | Sedex | ISO 9001 | GRS | WRAP | BCI | SA8000 | Bluesign
```

##### Polo Shirts
```
constructionOptions: Pique / Polo Knit | Mini Pique (fine) | Single Jersey |
  French Terry (sport polo) | Waffle Knit
weightPlaceholder: "e.g. 200 gsm, 180–240 gsm"
sizeOptions: XS–XL | XS–3XL | S–XXL | Custom
fitOptions: Regular Fit | Slim Fit | Athletic Fit
printTypeOptions: Embroidery (primary) | Woven badge / crest |
  Screen Print | Heat Transfer | No decoration
printPlacementOptions: Left chest (logo) | Right chest | Back yoke |
  Left sleeve | Right sleeve | No decoration
finishingOptions: Soft hand / Silicone | Anti-shrink / Compacted |
  Moisture Wicking | Anti-pill | Enzyme wash | No special finish
unitOfMeasure: Pieces | Dozens
```

##### Henley Shirts
```
constructionOptions: Single Jersey | Waffle Knit (thermal) |
  Rib (1×1) | French Terry (heavyweight)
weightPlaceholder: "e.g. 170 gsm, 160–200 gsm"
sizeOptions: XS–XL | XS–3XL | S–XXL | Custom
fitOptions: Regular Fit | Slim Fit | Oversized / Relaxed | Athletic
printTypeOptions: Screen Print | Digital / DTG Print | Embroidery | Heat Transfer | No decoration
printPlacementOptions: Front chest — left | Front chest — center |
  Back — upper | Left sleeve | No decoration
finishingOptions: Soft hand / Silicone | Anti-shrink / Compacted |
  Enzyme wash | Peached / Sueded | No special finish
unitOfMeasure: Pieces | Dozens
```

##### Sweatshirts & Hoodies
```
constructionOptions: French Terry (300–400 gsm) | Loop Back Fleece |
  Brushed Fleece (3-end) | Polar Fleece | Air Layer / Space Dye | Bonded Fleece
weightPlaceholder: "e.g. 340 gsm, 300–420 gsm"
sizeOptions: XS–XL | XS–2XL | XS–3XL | S–XXL | Plus sizes | Custom
fitOptions: Regular Fit | Slim Fit | Oversized / Relaxed | Athletic
printTypeOptions: Screen Print | Digital / DTG Print | Embroidery |
  Heat Transfer | Sublimation | Appliqué | No decoration
printPlacementOptions: Front chest — center | Front — full chest |
  Back — upper | Back — full | Hood panel |
  Left sleeve | Right sleeve | All-over | No decoration
finishingOptions: Soft hand / Silicone | Anti-pill | Anti-shrink / Compacted |
  Enzyme wash | Stone wash | Garment dye | Brushed interior |
  Water Repellent (shell) | No special finish
unitOfMeasure: Pieces | Sets (top + bottom) | Dozens
```

##### Sweatpants & Joggers
```
constructionOptions: French Terry (300–380 gsm) | Loop Back Fleece |
  Brushed Fleece | Cotton-Spandex (performance) | Polar Fleece
weightPlaceholder: "e.g. 320 gsm, 280–400 gsm"
sizeOptions: XS–XL | XS–2XL | XS–3XL | S–XXL | Custom
fitOptions: Regular Fit | Slim / Tapered | Relaxed / Loose
printPlacementOptions: Left thigh | Right thigh | Waistband |
  Side stripe / taping | Back hip | No decoration
finishingOptions: Soft hand / Silicone | Anti-pill | Anti-shrink |
  Enzyme wash | Stone wash | No special finish
unitOfMeasure: Pieces | Sets (top + bottom) | Dozens
```

##### Tank Tops
```
constructionOptions: Single Jersey | Rib (1×1) |
  Mesh / Eyelet (athletic) | Slub Jersey | Bamboo Jersey
weightPlaceholder: "e.g. 150 gsm, 130–180 gsm"
sizeOptions: XS–XL | XS–3XL | S–XXL | Custom
fitOptions: Regular Fit | Slim Fit | Oversized / Relaxed | Athletic / Performance | Women's Cut
printPlacementOptions: Front chest — left | Front chest — center |
  Front — full | Back — upper | Back — full | All-over | No decoration
finishingOptions: Soft hand / Silicone | Moisture Wicking | Anti-shrink |
  Enzyme wash | No special finish
unitOfMeasure: Pieces | Dozens
```

##### Denim Jeans
```
constructionOptions: 3×1 Twill Denim — Rigid | Stretch Denim (98/2 Cotton/Spandex) |
  Stretch Denim (95/5) | Raw / Dry Denim | Selvedge Denim | Recycled Cotton Denim
weightLabel: "Weight (oz)"
weightPlaceholder: "e.g. 11 oz, 12 oz, 14 oz"
sizeLabel: "Waist / Inseam Range"
sizeOptions: Waist 28–36" / Inseam 28–34" | Waist 28–40" extended |
  Waist 28–42" plus | Women's Waist 24–34" | Custom
showFitType: true
fitOptions: Slim Fit | Regular / Straight Leg | Relaxed / Baggy |
  Skinny | Bootcut | Tapered
showSizeStandard: false
printTypeOptions: Laser etch (fading effects) | Embroidery |
  Rubber / Woven patch label | No decoration
printPlacementOptions: Back pocket embroidery |
  Waistband patch / leather label | Selvedge ID (woven) | No decoration
finishingOptions: Stone Wash | Acid Wash | Sand Wash / Sand Blast |
  Enzyme Wash | Raw / No Wash | Overdye / Tinted | Bleach Wash | Distressed | Garment Dye
individualPackOptions: Individual polybag (folded) | Hanger + polybag |
  Folded on board (retail) | Flat fold (bulk export)
unitOfMeasure: Pieces | Dozens
```

##### Formal & Casual Shirts
```
constructionOptions: Poplin | Oxford Weave | Twill | Linen / Linen-Cotton Blend |
  Chambray | End-on-End | Dobby Weave | Seersucker
weightPlaceholder: "e.g. 100 gsm, 80–130 gsm"
sizeOptions: S / M / L / XL / XXL | XS–3XL | Collar 14"–18" (US) | EU 38–46 | Custom
fitOptions: Regular / Classic | Slim Fit | Relaxed | Athletic / Trim
printTypeOptions: Embroidery (logo/monogram) | Woven badge | Screen Print | No decoration
printPlacementOptions: Left chest — embroidery | Right chest |
  Collar / cuff monogram | Back yoke | No decoration
finishingOptions: Wrinkle Resistant / Easy Care | Soil Release | Soft hand finish |
  Anti-shrink | Anti-static | Mercerized | No special finish
individualPackOptions: Individual polybag (board fold) | Hanger + polybag |
  Retail box (gift/premium) | Flat fold
unitOfMeasure: Pieces | Dozens
```

##### Pants & Trousers
```
constructionOptions: Twill / Chino | Canvas (heavy) | Poplin (lightweight) |
  Linen / Linen Blend | Wool Blend | Sateen Stretch | Ponte (knit-look)
weightPlaceholder: "e.g. 220 gsm, 180–280 gsm"
sizeLabel: "Waist / Inseam Range"
sizeOptions: Waist 28–38" standard inseam | Waist 28–42" extended |
  S / M / L / XL / XXL | Custom
fitOptions: Regular Fit | Slim Fit | Relaxed / Straight | Tapered | Athletic / Performance
printPlacementOptions: Back pocket embroidery | Waistband label / patch | No decoration
finishingOptions: Wrinkle Resistant | DWR / Water Repellent | Soil Release |
  Anti-shrink | Soft hand finish | No special finish
unitOfMeasure: Pieces | Dozens
```

##### Cargo Pants
```
constructionOptions: Ripstop | Canvas | Heavy Twill |
  TC Poly-Cotton | Nylon / Poly Canvas | Stretch Ripstop
weightPlaceholder: "e.g. 240 gsm, 200–300 gsm"
sizeLabel: "Waist / Inseam Range"
sizeOptions: Waist 28–40" standard inseam | S / M / L / XL / XXL / 3XL | Custom
fitOptions: Regular Fit | Relaxed Fit | Slim / Tactical
showSizeStandard: false
printTypeOptions: Embroidery | No decoration
printPlacementOptions: Pocket embroidery | No decoration
finishingOptions: DWR / Water Repellent | Anti-static | Soil Release |
  Anti-shrink | No special finish
individualPackOptions: Individual polybag (folded) | Hanger + polybag | Flat fold (export)
unitOfMeasure: Pieces | Dozens
```

##### Shorts
```
constructionOptions: Single Jersey (athletic) | French Terry (casual) |
  Twill / Chino | Canvas | Ripstop (cargo) | Linen Blend | Nylon (swim)
weightPlaceholder: "e.g. 200 gsm, 160–280 gsm"
sizeOptions: XS–XL | XS–3XL | Waist 28–38" / Inseam 5"–11" |
  S / M / L / XL / XXL | Custom
fitOptions: Regular Fit | Slim Fit | Relaxed / Loose | Athletic / Performance
printPlacementOptions: Left leg / thigh | Right leg / thigh |
  Front center (below waistband) | Back (hip) | All-over | No decoration
finishingOptions: Soft hand / Silicone | Moisture Wicking | DWR / Water Repellent |
  Anti-shrink | Enzyme wash | No special finish
unitOfMeasure: Pieces | Dozens | Sets
```

##### Baby & Kids Apparel
```
constructionOptions: Single Jersey Combed Cotton | Interlock | Rib (1×1) |
  Muslin / Double Gauze | French Terry (lightweight) | Fleece | Organic Cotton Jersey
weightPlaceholder: "e.g. 150 gsm, 120–200 gsm"
sizeLabel: "Age / Size Range"
sizeOptions: Premature (<2.5 kg) | 0–3 months | 3–6 months | 6–9 months |
  9–12 months | 12–18 months | 18–24 months | 2 years | 3 years | 4 years |
  5–6 years | 6–8 years | 8–10 years | 8–12 years | Custom
showFitType: false   ← HIDDEN — not applicable
showSizeStandard: false   ← HIDDEN — age-based sizing
printTypeOptions: Screen Print (water-based) | Digital / DTG |
  Embroidery | Appliqué | No decoration
printPlacementOptions: Front chest — small center | Front — all-over |
  Back — upper | Sleeve (small) | No decoration
finishingOptions: Soft hand / Baby-safe silicone | Hypoallergenic |
  Anti-shrink / Pre-washed | Enzyme wash (baby-safe) |
  OEKO-TEX compliant finish | No special finish
individualPackOptions: Individual polybag | Gift box | 3-pack set |
  6-pack set | Retail hanger bag
unitOfMeasure: Pieces | Sets | Dozens
certifications: GOTS | OEKO-TEX (Class 1) | BSCI | Sedex | ISO 9001 | WRAP | BCI
```

##### Workwear Apparel
```
constructionOptions: Canvas (heavy: 280–400 gsm) | Ripstop Poly-Cotton TC |
  Twill (durable) | FR (Flame Retardant) Cotton | Hi-Vis Polyester / Fluorescent | Denim
weightPlaceholder: "e.g. 300 gsm, 240–400 gsm"
sizeOptions: XS–XL | XS–3XL | XS–5XL | S / M / L / XL / XXL / 3XL |
  Custom (provide size chart)
fitOptions: Regular Fit | Loose / Relaxed (safety) | Slim (modern workwear)
printPlacementOptions: Left chest embroidery | Right chest |
  Back (large format — company name) | Sleeve | Reflective tape placement | No decoration
finishingOptions: FR (Flame Retardant) | DWR / Water Repellent | Anti-static |
  Hi-Vis retroreflective | Anti-bacterial | Stain Repellent | No special finish
individualPackOptions: Individual polybag | Hanger + polybag |
  Bulk export (no individual packaging)
unitOfMeasure: Pieces | Sets | Dozens
certifications: ISO 9001 | BSCI | WRAP | SA8000 | Sedex | EN ISO 13688 | No certification required
```

##### Socks
```
constructionLabel: "Knit Structure"   ← RENAMED from "Fabric Type"
constructionOptions: Plain Knit (smooth all-over) | Rib Cuff + Plain Foot |
  Terry Sole Cushion | Full Terry Cushion (all-over) | Jacquard / Pattern Knit |
  Mesh / Open Knit (ventilated) | Compression Knit
weightLabel: "Weight / Denier"   ← RENAMED
weightPlaceholder: "e.g. 200 denier, N/A"
sizeLabel: "Shoe Size Range"   ← RENAMED
sizeOptions: EU 35–38 / UK 2–5 / US Women 5–8 | EU 39–42 / UK 6–8 / US Men 6–9 |
  EU 43–46 / UK 9–11 / US Men 10–13 | EU 47–50 / UK 12–14 / US Men 14+ |
  Kids EU 22–27 / UK 4–10 | Kids EU 28–34 / UK 10–2 |
  One Size Fits Most (EU 38–44) | Custom size range
showFitType: false   ← HIDDEN
showSizeStandard: false   ← HIDDEN
designLabel: "Design / Pattern"   ← RENAMED
printTypeOptions: Knitted-in Jacquard pattern | Intarsia (multi-color blocks) |
  All-over print (sublimation) | Plain / No design
printPlacementOptions: Ankle / cuff area | Leg (knitted-in pattern) |
  Heel & toe contrast color | Custom knitted logo | Full sock (all-over) | Plain / No placement
finishingOptions: Anti-odor / Antimicrobial | Moisture Wicking |
  Cushioned Sole (extra terry) | Arch Compression / Support |
  Anti-static | Thermal / Heat-trapping | No special finish
individualPackOptions: Ankle band (pair) | Header card — 2-pair |
  Header card — 3-pair | Polybag — 3-pair | Polybag — 6-pair |
  Polybag — 12-pair | Polybag — 24-pair | Bulk (no individual packing)
unitOfMeasure: Pairs | Dozens (pairs) | Packs
```

---

#### HOME TEXTILES

##### Towels (Bath Towels)
```
constructionLabel: "Weave / Structure"
constructionOptions: Terry Loop | Velour / Sheared Terry | Zero Twist Terry |
  Waffle / Honeycomb | Jacquard Terry | Dobby Border Terry
weightPlaceholder: "e.g. 500 gsm, 450–600 gsm"
sizeLabel: "Standard Size"
sizeOptions: Face Towel 30×30 cm | Guest Towel 30×50 cm | Hand Towel 40×70 cm |
  Bath Towel 70×140 cm | Bath Sheet 90×150 cm | Gym Towel 50×100 cm | Custom
showFitType: false
showSizeStandard: false
showBorderField: true
designLabel: "Design"
printTypeOptions: Dobby / Jacquard woven border | Plain hem (no border) | Satin border |
  Embroidered corner | Sublimation printed face | No decoration
printPlacementOptions: Border (full length) | Corner (embroidery / woven label) |
  Face (sublimation print) | No decoration
finishingOptions: Soft hand / Silicone finish | Anti-bacterial |
  Zero Twist effect | Velour shearing | No special finish
individualPackOptions: Individual polybag | Rolled & banded | Retail box (single) |
  Gift box (set) | Wrapped with ribbon / band | Bulk (12 pcs per carton)
setCompositionOptions: Single piece | 2-piece set | 4-piece set |
  6-piece set | 8-piece set | Custom set
unitOfMeasure: Pieces | Sets | Dozens
```

##### Institutional Towels
```
constructionOptions: Terry Loop | Dobby Border Terry
weightPlaceholder: "e.g. 480 gsm, 400–550 gsm"
sizeOptions: Face Towel 30×30 cm | Hand Towel 40×70 cm |
  Bath Towel 70×140 cm | Custom
printTypeOptions: Plain white | White with dobby stripe border
printPlacementOptions: (not applicable — plain only)
finishingOptions: Soft hand / Silicone finish | Anti-bacterial | No special finish
individualPackOptions: Dozen (12 pcs) banded | Case (120 pcs) bulk |
  Bulk / no individual packing
unitOfMeasure: Pieces | Dozens | Cases (120 pcs)
```

##### Bathrobes
```
constructionOptions: Terry Loop | Velour / Sheared Terry | Waffle / Honeycomb |
  Kimono Flat Weave | Microfleece / Coral Fleece
weightPlaceholder: "e.g. 400 gsm, 350–500 gsm"
sizeOptions: XS/S (fits 32–36") | M/L (fits 38–42") | XL/XXL (fits 44–50") |
  One Size Fits Most | Custom
showCollarType: true
collarOptions: Shawl collar | Kimono collar | Hooded
printTypeOptions: Embroidery | Woven patch / crest | Heat transfer label | No decoration
printPlacementOptions: Left chest (logo embroidery) | Back center |
  Pocket embroidery | No decoration
finishingOptions: Soft hand / Silicone finish | Anti-bacterial | Velour shearing | No special finish
individualPackOptions: Individual polybag + hanger | Retail box |
  Cloth / non-woven gift bag | Bulk folded
unitOfMeasure: Pieces | Dozens
```

##### Bath Mats
```
constructionOptions: Terry Loop (tufted) | Chenille Tufted |
  Memory Foam + Terry Cover | Microfiber Tufted | Waffle Weave
weightPlaceholder: "e.g. 1000 gsm, 800–1500 gsm"
sizeOptions: Small 40×60 cm | Standard 50×80 cm | Large 60×100 cm | Custom
showBackingType: true
backingOptions: Latex backing (anti-slip) | Rubber spray backing | No backing
printTypeOptions: Tufted pattern (woven in) | Printed design | Plain / no decoration
printPlacementOptions: (pattern is woven-in or one-sided face print)
finishingOptions: Anti-slip backing (latex) | Anti-slip backing (rubber spray) |
  Soft hand finish | Anti-bacterial | No special finish
individualPackOptions: Individual polybag | Retail header card | Retail box | Bulk
unitOfMeasure: Pieces | Sets (mat + toilet mat) | Dozens
```

##### Beach & Pool Towels
```
constructionOptions: Velour (one-sided) / Terry back | Velour (both sides) |
  Terry Loop | Microfiber | Fouta / Pestemal (flat woven)
weightPlaceholder: "e.g. 420 gsm, 350–500 gsm"
sizeOptions: Standard 75×150 cm | Large 90×170 cm | Oversized 100×180 cm |
  Kids 60×120 cm | Custom
printTypeOptions: Sublimation print (all-over photographic) |
  Reactive print (geometric) | Jacquard woven | Yarn-dyed stripe | No decoration
printPlacementOptions: All-over (sublimation/reactive) |
  Woven stripe / border | No decoration
finishingOptions: Chlorine / Salt Resistant | Color Fast treatment |
  Soft hand finish | No special finish
individualPackOptions: Individual polybag | Retail roll (paper band) |
  Branded bag | Retail box | Bulk
unitOfMeasure: Pieces | Dozens
```

##### Bedsheets
```
constructionLabel: "Weave / Construction"
constructionOptions: Percale (200–400 TC) | Sateen (300–600 TC) |
  Oxford Weave | Flannel / Brushed Cotton | Jersey Knit (stretch) |
  Jacquard | Dobby Stripe | Linen / Linen Blend
weightLabel: "Thread Count (TC)"   ← RENAMED
weightPlaceholder: "e.g. 300 TC, 400 TC, 600 TC"
sizeOptions: Twin/Single 96×183 cm | Full/Double 137×190 cm | Queen 152×203 cm |
  King 183×203 cm | Cal King 183×213 cm | EU Single 140×200 cm |
  EU Double 200×200 cm | EU King 240×220 cm | Custom
showFitType: false
showSizeStandard: false
printTypeOptions: Embroidered border / hem | All-over reactive print |
  Jacquard woven pattern | Printed border / stripe | Plain / solid | No decoration
printPlacementOptions: Embroidered border | All-over | Printed border / stripe |
  No decoration
finishingOptions: Wrinkle Resistant / Easy Care | Moisture Wicking |
  Anti-bacterial | Hypoallergenic | Soft hand finish | No special finish
individualPackOptions: Individual polybag | Retail box (single) | Retail box (set) |
  Zippered pouch | Vacuum packed | Bulk
unitOfMeasure: Pieces | Sets
```

##### Fitted Sheets
```
— Same as Bedsheets PLUS —
showPocketDepth: true
pocketDepthOptions: 12" / 30 cm | 15" / 38 cm | 18" / 46 cm |
  21" / 53 cm | Deep pocket 26"+
```

##### Duvet Covers
```
— Same construction/finishing as Bedsheets PLUS —
sizeOptions: UK Single 135×200 cm | UK Double 200×200 cm | UK King 225×220 cm |
  US Twin 172×218 cm | US Full/Queen 203×228 cm | US King 259×228 cm |
  EU 135×200 | EU 200×200 | EU 200×220 | Custom
showClosureType: true
closureOptions: Button | Zip / Concealed zip | Envelope (overlapping) | Snap / Popper
```

##### Pillow Covers
```
— Same construction/finishing as Bedsheets PLUS —
sizeOptions: Standard 50×75 cm | Queen 50×90 cm | Euro/Square 65×65 cm |
  Oxford 50×75 cm + 5 cm flange | Custom
showClosureType: true
closureOptions: Button | Zip | Open-end | Envelope
```

##### Cushion Covers
```
— Same construction/finishing as Bedsheets PLUS heavier décor fabrics —
sizeOptions: 40×40 cm | 45×45 cm | 50×50 cm | 60×60 cm | Oblong 30×50 cm | Custom
showClosureType: true
closureOptions: Zip | Button | Envelope
```

##### Curtains
```
constructionOptions: Plain Weave | Jacquard | Voile / Sheer |
  Blackout Woven (coated) | Twill | Linen / Linen-Look | Velvet (polyester)
weightPlaceholder: "e.g. 120 gsm (sheer), 280 gsm (blackout)"
sizeOptions: 90×137 cm (short) | 90×183 cm (standard) | 90×274 cm (extra long) |
  137×183 cm | 137×274 cm | Custom width & drop
showHeadingType: true
headingOptions: Rod pocket | Eyelet / Grommet | Pinch pleat | Tab top | Ring top
showLiningType: true
liningOptions: Unlined | Lined | Interlined / Blackout lined
printTypeOptions: Printed pattern (full drop) | Embroidered panel |
  Jacquard woven | Plain / no decoration
printPlacementOptions: Full drop | Panel | Border | No decoration
finishingOptions: Blackout coating | Thermal / Insulating |
  Fire Retardant (FR) | Anti-UV | No special finish
individualPackOptions: Individual polybag (per panel) | Retail box (pair) | Tied roll | Bulk
unitOfMeasure: Panels | Pairs | Sets
```

##### Kitchen Towels
```
constructionOptions: Waffle / Honeycomb (primary) | Huck Weave |
  Plain Weave | Terry Loop | Dobby Weave
weightPlaceholder: "e.g. 180 gsm, 150–250 gsm"
sizeOptions: Small 40×60 cm | Standard 45×65 cm | Large 50×70 cm | Custom
printTypeOptions: Yarn-dyed stripe / check | Full face reactive print |
  Embroidery | No decoration
printPlacementOptions: Full face | Border | Yarn-dyed pattern | Corner embroidery | No decoration
finishingOptions: Anti-bacterial | Stain Repellent | Anti-grease |
  Enzyme wash | No special finish
individualPackOptions: Individual polybag | 2-pack banded | 4-pack banded |
  Header card (2–3 pack) | Bulk
unitOfMeasure: Pieces | Packs | Dozens
```

##### Bar Mops
```
constructionOptions: Heavy Terry Loop | Huck Weave
weightPlaceholder: "e.g. 500 gsm, 400–600 gsm"
sizeOptions: Standard 35×60 cm | Heavy 35×65 cm | Custom
printTypeOptions: Plain white | White with colored border
finishingOptions: Anti-bacterial | No special finish
individualPackOptions: Dozen (12 pcs) banded | 24-pack banded |
  Case (144 pcs) | Bulk
unitOfMeasure: Pieces | Dozens | Cases (144 pcs)
```

##### Aprons
```
constructionOptions: Canvas (heavy: 280–400 gsm) | Plain Weave / Poplin |
  Denim | Terry (chef/kitchen) | Ripstop | Waxed Cotton
weightPlaceholder: "e.g. 300 gsm, 200–400 gsm"
sizeOptions: Bib: 60×90 cm | Waist: 60×40 cm | Custom
printTypeOptions: Screen print | Digital print | Embroidery | Heat transfer | No decoration
printPlacementOptions: Front chest / bib | Lower bib | Pocket area |
  All-over print | No decoration
finishingOptions: DWR / Water Repellent | Stain Repellent | Anti-bacterial | No special finish
individualPackOptions: Individual polybag | Retail hanger bag | Header card | Bulk
unitOfMeasure: Pieces | Dozens
```

##### Pot Holders
```
constructionOptions: Terry Double-layer (insulated) | Quilted Cotton (multi-layer) |
  Waffle Weave + batting | Canvas + silicone lining
weightLabel: "Heat Rating"   ← RENAMED (GSM not relevant)
weightPlaceholder: "e.g. Up to 180°C, Up to 200°C"
sizeOptions: Square 18×18 cm | Standard 20×20 cm | Oven Mitt (17×28 cm) | Custom
showHeatingRating: true
heatingOptions: Up to 150°C | Up to 180°C | Up to 200°C | Up to 220°C (silicone lined)
printTypeOptions: Reactive / screen print (face) | Embroidered motif | No decoration
printPlacementOptions: One-side face print | Embroidered motif | No decoration
finishingOptions: Heat Resistant lining (FR batting) | Non-slip surface (silicone dots) |
  No special finish
individualPackOptions: 2-pack banded (pair) | Blister card (2-pack) |
  Header card (single) | Bulk
unitOfMeasure: Pieces | Pairs (2-pack) | Sets
```

##### Table Covers
```
constructionOptions: Cotton Damask / Jacquard (formal) | Plain Weave / Poplin |
  Satin Weave | Dobby / Waffle | Linen / Linen-Look | Poly-Cotton (easy care)
weightPlaceholder: "e.g. 250 gsm, 150–350 gsm"
sizeOptions: Rectangular 132×178 cm (4-seat) | Rectangular 152×213 cm (6-seat) |
  Rectangular 178×274 cm (8-seat) | Round 152 cm dia. | Square 137×137 cm | Custom
printTypeOptions: Embroidered hem / border | Woven jacquard (all-over) |
  Printed design | Plain / no decoration
finishingOptions: Wrinkle Resistant | Water / Stain Repellent | Soft finish | No special finish
individualPackOptions: Individual polybag | Retail box | Zippered pouch | Bulk
unitOfMeasure: Pieces | Sets
```

##### Cellular Thermal Blanket
```
constructionOptions: Cellular / Open-Cell Weave (100% Cotton — only option)
weightPlaceholder: "e.g. 200 gsm, 150–250 gsm"
sizeOptions: Cot / Baby 75×100 cm | Pram 70×90 cm | Single 150×200 cm |
  Double 180×200 cm | King 230×220 cm | Custom
printTypeOptions: Plain | Basic yarn-dyed pattern
finishingOptions: Anti-shrink | No special finish
individualPackOptions: Individual polybag | Retail box | Zippered carry bag |
  Dozen pack (institutional) | Bulk
unitOfMeasure: Pieces | Dozens
```

##### Fleece Thermal Blankets
```
constructionOptions: Anti-Pill Polar Fleece (100% Polyester — primary) |
  Sherpa Fleece (double-sided) | Mink Touch / Velvet print | Woven Jacquard
weightPlaceholder: "e.g. 200 gsm, 150–300 gsm"
sizeOptions: Baby / Cot 75×100 cm | Throw 125×150 cm | Single 150×200 cm |
  Double 200×200 cm | King 240×220 cm | Custom
printTypeOptions: Sublimation / reactive print (all-over) | Embroidered corner |
  Jacquard woven | Plain / no decoration
finishingOptions: Anti-pill | Anti-static | Flame Retardant (FR) (institutional) |
  Hypoallergenic | Ultra-soft brushed | No special finish
individualPackOptions: Individual polybag | Retail box | Zippered carry bag |
  Vacuum packed | Bulk folded
unitOfMeasure: Pieces | Dozens
```

##### Doctor Surgical Gowns
```
constructionOptions: Plain Weave TC 65/35 Poly-Cotton (reusable — primary) |
  Plain Weave 100% Cotton | Non-Woven polypropylene (disposable)
weightPlaceholder: "e.g. 150 gsm, 120–200 gsm"
sizeOptions: XS | S | M | L | XL | XXL | 3XL | One Size (disposable) | Custom
showFitType: false
printTypeOptions: Embroidered logo (chest) | Heat transfer logo | No decoration
printPlacementOptions: Left chest | Back center | No decoration
finishingOptions: Anti-bacterial | Fluid / Blood Repellent | Anti-static |
  Sterilizable / Autoclave Safe | No special finish
individualPackOptions: Individual polybag | Institutional pack (5 pcs) |
  Institutional pack (12 pcs) | Individually wrapped (sterile) | Bulk
isMedical: true
unitOfMeasure: Pieces | Sets (5-pack) | Cases (12-pack)
certifications: ISO 9001 | ISO 13485 | BSCI | Sedex | WRAP | SA8000 | EN 13795 | No certification
```

##### Medical Scrubs
```
constructionOptions: Twill 65/35 TC Poly-Cotton (primary) |
  100% Cotton Twill | 4-Way Stretch (Poly/Spandex)
weightPlaceholder: "e.g. 175 gsm, 150–220 gsm"
sizeOptions: XS–3XL | Petite XS–2XL | Tall XS–2XL | Custom
fitOptions: Regular Fit | Slim / Modern Fit | Relaxed Fit
printTypeOptions: Embroidery (logo / name) | Heat transfer | No decoration
printPlacementOptions: Left chest | Right chest | No decoration
finishingOptions: Anti-bacterial | Fluid Repellent | Anti-static |
  Moisture Wicking | Sterilizable | No special finish
isMedical: true
unitOfMeasure: Pieces | Sets (top + bottom) | Cases
certifications: ISO 9001 | ISO 13485 | BSCI | Sedex | WRAP | SA8000 | No certification
```

##### Patient Gowns
```
constructionOptions: Plain Weave 100% Cotton (primary) |
  TC Poly-Cotton 65/35 | Jersey Knit (wrap-style)
weightPlaceholder: "e.g. 130 gsm, 120–180 gsm"
sizeOptions: Pediatric XS/S | S/M | L/XL | XXL/3XL | One Size | Custom
showFitType: false
printTypeOptions: Plain (standard) | Printed pattern (pediatric / decorative)
finishingOptions: Anti-bacterial | Fluid Repellent | Sterilizable / Autoclave Safe |
  No special finish
isMedical: true
unitOfMeasure: Pieces | Sets | Cases
```

##### Surgical Huck Towels
```
constructionOptions: Huck / Honeycomb Weave 100% Cotton (only option)
weightPlaceholder: "e.g. 220 gsm, 180–280 gsm"
sizeOptions: Standard 40×75 cm | Large 45×100 cm | Custom
printTypeOptions: Plain white | Blue stripe (absorbent side marker)
finishingOptions: Pre-washed / Shrink Resistant | No special finish
isMedical: true
individualPackOptions: Dozen (12 pcs) banded | 24-pack | 50-pack bulk | Bulk carton
unitOfMeasure: Pieces | Dozens | Gross (144 pcs)
```

##### Shop Towels
```
constructionOptions: Heavy Cotton Terry Loop | Huck Weave |
  Plain Weave (canvas-weight)
weightPlaceholder: "e.g. 380 gsm, 300–450 gsm"
sizeOptions: Standard 35×35 cm | Large 40×50 cm | Industrial roll | Custom
printTypeOptions: Plain white | Blue and white stripe
finishingOptions: Oil Absorbent treatment | Anti-bacterial | No special finish
individualPackOptions: Dozen (12 pcs) banded | 50-pack bulk | 200-pack bulk | Bulk carton
unitOfMeasure: Pieces | Dozens | Cases
```

##### Fender Covers
```
constructionOptions: Knitted Terry (stretchy — primary) | Woven Terry |
  Chenille | Microfiber (non-scratch)
weightPlaceholder: "e.g. 350 gsm"
sizeOptions: Small 28×45 cm | Standard 35×55 cm | Large 45×65 cm | Custom
printTypeOptions: Plain | Company logo embroidery
finishingOptions: Non-scratch surface | Oil & solvent resistant | No special finish
individualPackOptions: 2-pack (pair) | 4-pack | Bulk
unitOfMeasure: Pieces | Pairs | Sets
```

##### Ihram
```
isIhram: true   ← Forces white-only, no decoration, no blends
constructionOptions: Plain Weave 100% White Cotton (primary) |
  Terry Weave (lightweight cotton) | Dobby stripe cotton
weightPlaceholder: "e.g. 250 gsm, 200–350 gsm"
sizeOptions: Standard pair (90×150 cm each) | Small pair (80×140 cm) |
  Large pair (100×170 cm) | Custom
showFitType: false
printTypeOptions: Plain — no decoration (religious requirement)
finishingOptions: Soft hand / Silicone finish | Anti-shrink | No special finish
individualPackOptions: Pair pack (2 pieces — top + bottom) |
  Individual piece | Retail poly pack (pair) | Bulk
unitOfMeasure: Pairs (2-piece sets) | Pieces
```

---

#### FABRIC

##### Apparel Fabric
```
isFabricRoll: true
fabricCategoryOptions: Knitted | Woven | Non-woven
knitTypeOptions: Single Jersey | Double Jersey | Interlock | Pique |
  Rib (1×1) | Rib (2×2) | French Terry | Fleece / Brushed Back | Waffle | Pointelle
wovenTypeOptions: Plain Weave | Twill | Satin | Oxford | Canvas |
  Poplin | Denim | Jacquard | Chambray | Dobby
weightPlaceholder: "e.g. 160 gsm, 80–450 gsm"
fabricWidthOptions: 44" / 112 cm | 58–60" / 147–152 cm | 72" / 183 cm |
  90" / 228 cm | Custom
finishingOptions: Soft hand / Silicone | Anti-pill | Anti-shrink / Compacted |
  Enzyme treatment / Bio-finish | Peached / Sueded | Brushed |
  Moisture Wicking | Mercerized | Wrinkle Resistant | Anti-static | No special finish
rollLengthOptions: 50m per roll | 100m per roll | 150m per roll |
  200m per roll | Custom / To be confirmed
rollCoreOptions: Paper tube core | Plastic tube core | No core / Bulk roll | To be confirmed
unitOfMeasure: Meters | Kg | Rolls
```

##### Home Textile Fabric
```
isFabricRoll: true
fabricCategoryOptions: Woven | Terry | Knitted
wovenTypeOptions: Percale | Sateen | Oxford | Flannel | Jacquard | Plain Weave | Twill
terryTypeOptions: Terry Loop | Velour (sheared) | Zero Twist
knitTypeOptions: Interlock | Jersey
weightLabel: "GSM / Thread Count"
weightPlaceholder: "e.g. 500 gsm (terry), 300 TC (bed linen fabric)"
finishingOptions: Soft hand / Silicone | Anti-bacterial | Anti-shrink |
  Velour / Shearing finish | Moisture Wicking | Wrinkle Resistant |
  Flame Retardant (FR) | No special finish
unitOfMeasure: Meters | Kg | Rolls
```

---

### Certifications — "How Did You Hear About Us" Options
```
Google Search
LinkedIn
Trade Show / Exhibition
Referral from a Contact
Social Media (Facebook / Instagram)
Industry Directory
Other
```

---

### Multi-Select Finish Field — Implementation Rules
- Field name: `fabricFinish: string[]` (apparel), `htFinish: string[]` (home textile), `fabricFinishType: string[]` (fabric)
- UI: Checkbox grid — same visual pattern as Certifications (border-gold when checked, bg-gold/5)
- Email body: `.join(", ")` before inserting into body string
- Review step: `.join(", ")` for display
- When `productType` changes → reset finish array to `[]`
- When `category` changes → reset all spec fields including finish arrays

---

### localStorage Autosave — Implementation Rules
- Key: `"rfq_wizard_draft"`
- Save on every field change (debounced 500ms)
- Load on component mount (before INITIAL state)
- Clear on successful submit (after mailto opens)
- Clear when user explicitly clicks "Start Over" (if present)
- Do NOT save sensitive info warning — all data is typed by user intentionally

---

### Email Body Format (unchanged from prior implementation)
```
══════════════════════════════════════════════════════════════
  RFQ SUBMISSION — MZ GLOBAL TRADING
  Source:     mzglobaltrading.com/rfq/
  Submitted:  [date at time timezone]
══════════════════════════════════════════════════════════════

[1]  CONTACT DETAILS
──────────────────────────────────────────────────────────────
  Name: ...
  Job Title: ...
  ...

[2]  PRODUCT REQUIREMENTS & SPECIFICATIONS
──────────────────────────────────────────────────────────────
  Category: ...
  Product Type: ...
  [all spec sub-blocks]

[3]  COMMERCIAL & LOGISTICS
──────────────────────────────────────────────────────────────
  Quantity: ...
  Unit: ...
  Target Price: USD X.XX per unit
  Destination: ...
  Incoterm: ...
  [Port if CIF/CFR]
  Required Delivery: ...

══════════════════════════════════════════════════════════════
  The buyer confirms they have read and agreed to the Terms of Use
  at: mzglobaltrading.com/termsofuse/
══════════════════════════════════════════════════════════════
```

Section numbers shift from old 5-step: contact = [1], product+specs = [2], logistics = [3], notes = [4] if present.
