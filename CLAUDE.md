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

7. **No Google Tag Manager (GTM) — ever** — GTM is permanently banned from this site. Never add `gtm.js`, a `GTM-XXXXXXX` container ID, or a GTM `<noscript>` iframe. Analytics is handled via **direct GA4 (gtag.js)** in `app/layout.tsx` with Measurement ID `G-BEG0E64X9E`. The GA4 script loads from `googletagmanager.com/gtag/js` — this domain is allowed because it delivers the GA4 library, not GTM. Do NOT confuse them: `gtag/js?id=G-...` = GA4 ✅; `gtm.js?id=GTM-...` = GTM ❌.

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

- **Framework:** Next.js 16 App Router — installed version **16.2.9**
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 — `@theme {}` block in `app/globals.css`, no `tailwind.config.ts`
- **Animations:** Framer Motion v12
- **Output:** Static export — `output: "export"` in `next.config.mjs` — no SSR, no API routes, no server actions
- **Deployment:** Cloudflare Pages
- **Font:** Geist Sans via `localFont` with `display: "swap"`
- **Node:** 24.x
- **React:** 19.2.7
- **PostCSS:** `@tailwindcss/postcss` v4 — config in `postcss.config.mjs` (ESM)
- **Dev server:** `next dev --webpack` (webpack flag required — Turbopack + Tailwind v4 oklch colours conflict in some browsers)

### Next.js Version Decision (reviewed 2026-06-22)
- Upgraded from v14.2.35 (EOL Oct 2025) to **v16.2.9** on 2026-06-22
- v16 is current stable — upgrade is complete and verified
- **Next upgrade:** v16 → v17 when it stabilises (est. 2027). Do NOT downgrade to v15.

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
- 3–5 descriptive words maximum — pattern: `pakistan-[product]-manufacturer-[descriptor].webp`
- Current hero/banner file names are acceptable; apply the naming pattern when adding new images

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
2. `git add -A && git commit -m "..." && git push origin main` — push to GitHub
3. Deploy to Cloudflare Pages via Wrangler CLI:
   ```
   npx wrangler pages deploy out --project-name=mz-global-trading
   ```
4. `public/_headers` — Cloudflare applies security headers automatically
5. `public/_redirects` — Cloudflare handles redirects
6. No server-side rendering, no API routes, no server actions

**Wrangler version (confirmed working):** 4.98.0
**Cloudflare project name:** `mz-global-trading`
**Preview URL pattern:** `https://<hash>.mz-global-trading.pages.dev`

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
- XML sitemap (needs update — currently lists 78 pages but site now has 128 URLs)
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

Reasons: new domain needs English authority first, maintenance burden (128 × N languages), quality risk with machine translation for B2B copy, Cloudflare Pages free tier 20,000 file limit would be hit quickly with multilingual pages at this scale.

Revisit after launch when Google Search Console data shows which non-English markets are generating impressions.

If implemented in future: use `app/[locale]/` structure with `next-intl`, professional human translations, `hreflang` per page.

---

## Component Registry

| Component | File | Status | Notes |
|---|---|---|---|
| MegaMenu | `components/MegaMenu.tsx` | Complete | White header, h-32, all product URLs wired, hover preview zone |
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

All product pages are complete. Actual URL count as of 2026-06-23:

| Type | Count |
|---|---|
| Static page.tsx files (non-dynamic) | 82 |
| Knowledge Hub articles `/knowledge/[slug]` | 53 |
| Guide pages `/guides/[slug]` | 77 |
| Downloads `/downloads/[slug]` | 59 |
| **Total unique URLs** | **271** (272 HTML files incl. 404) |

Verified against `out/` directory after build — pagefind indexes 272 files. All dynamic slugs generate correctly.

Static 82 includes: homepage, 3 category pillar pages, 14 cluster pages, 44 product leaf pages, 5 quality/compliance pages, 4 corporate pages, 3 content listing pages (/guides/, /knowledge/, /downloads/), rfq, contact, search, textile-tools-calculator, faqs, careers, privacypolicy, termsofuse, quality-policy, /_not-found, /404.

> File pattern: every page follows `app/section/name/page.tsx` + `NameContent.tsx`

---

## Full Sitemap

> **Source of truth:** `public/sitemap.xml` — needs to be updated to reflect 128 URLs (currently lists only 78). Dynamic slug pages (`/guides/`, `/knowledge/`, `/downloads/`) are not yet in the sitemap.

**Structure:** `/` · `/our-company/` · `/rfq/` · `/contact-us/` · `/qualitycompliance/[page]/` · `/quality-policy/` · `/apparel/[cluster]/[product]/` · `/hometextile/[cluster]/[product]/` · `/hometextile/ihram/` · `/fabric/apparelfabric/` · `/fabric/hometextilefabric/` · `/guides/[slug]/` · `/knowledge/[slug]/` · `/downloads/[slug]/`

### Content Data Files (dynamic slug pages)
| File | Purpose | Count |
|---|---|---|
| `lib/guides-content.ts` | All guide page data — source of truth for `/guides/[slug]` | 30 guides |
| `content/knowledge/*.ts` | One `.ts` file per knowledge post — auto-discovered via webpack `require.context` | 6 posts |
| `lib/downloads-content.ts` | All download entries — source of truth for `/downloads/[slug]` | 12 entries |
| `lib/knowledge.ts` | Helper functions for knowledge posts — reads from `content/knowledge/` | — |

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
  sitemap.xml                ← needs update — currently lists 78 pages, actual count is 128
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

- **hreflang tags:** ✅ DONE — `buildMetadata()` in `lib/metadata.ts` auto-generates `en` + `x-default` on all 82 static pages. Dynamic pages (`/guides/[slug]`, `/knowledge/[slug]`, `/downloads/[slug]`) use `generateMetadata()` which also include hreflang.
- **Missing menu images:** Doctor Surgical Gowns, Shop Towels — awaiting user-supplied WebP files
- **Google Search Console:** After launch, set preferred country to USA
- **Sitemap update:** `public/sitemap.xml` needs to be regenerated to include all 128 URLs including dynamic guide, knowledge, and download pages
- **Next.js upgrade:** Upgrade to v17 when it stabilises (est. 2027) — v16 is current stable

---

## PageSpeed Insights Audit — 2026-06-23

**Audit tool:** Google PSI API v5 (`scripts/pagespeed_audit.py --url <url>`)
**API key location:** project session transcript (key: `AIzaSyD5AdFuKeQvFABN-ttxixrtbYPbtYZgnms`)
**Results saved:** `pagespeed_issues.json`, `pagespeed_results.json`, `pagespeed_issues.csv`

> ⚠️ **Domain note:** `mzglobaltrading.com` still points to the old WordPress/Elementor site (domain not yet migrated). Always run PSI against `https://mz-global-trading.pages.dev/` until migration is complete.

**URL tested:** `https://mz-global-trading.pages.dev/apparel/knittedgarments/tshirts/`

### Scores

| Category | Mobile | Desktop | Target |
|---|---|---|---|
| Performance | 71 ❌ | 93 ✅ | Mobile 95+, Desktop 98+ |
| Accessibility | 96 ✅ | 96 ✅ | 100 |
| SEO | 100 ✅ | 100 ✅ | 100 |
| Best Practices | 96 ⚠️ | 96 ⚠️ | 100 |

### Core Web Vitals

| Metric | Mobile | Desktop | Target |
|---|---|---|---|
| LCP | 6.5s ❌ | 1.6s ⚠️ | < 2.5s |
| FCP | 3.1s ❌ | 0.8s ✅ | < 1.8s |
| CLS | 0 ✅ | 0 ✅ | < 0.1 |
| TBT (INP proxy) | 0ms ✅ | 30ms ✅ | < 200ms |

### Issues — All 9 Unique Findings

| # | Issue | Scope | Mobile | Desktop | Status |
|---|---|---|---|---|---|
| 1 | Unsized logo `<img>` (no `width`/`height`) | Site-wide | ✅ flagged | ✅ flagged | ✅ **Approved — implement** |
| 2 | RSC prefetch 404s (`.txt` RSC payloads) | Site-wide | ✅ flagged | ✅ flagged | ✅ **Approved — implement** (`prefetch={false}`) |
| 3 | GA4 gtag.js blocking render (140ms exec) — **PSI mislabels this as "GTM"** because it loads from googletagmanager.com, but `gtag/js?id=G-BEG0E64X9E` is the GA4 library, NOT Google Tag Manager (`GTM-XXXXXXX`). No GTM container was ever installed. | Site-wide | — | ✅ flagged | ✅ **Approved — implement** (`strategy="lazyOnload"`) |
| 4 | Legacy JS polyfills (~14 KiB) | Site-wide | ✅ flagged | ✅ flagged | ✅ **Approved — implement** (update `browserslist`) |
| 5 | Cert images oversized (1536×1024 → 51×34px display; 233–97 KB wasted each) | Site-wide | — | ✅ flagged | ✅ **Approved — implement** — resize in-place to 280×160px using Pillow; same filenames, no code changes needed |
| 6 | Color contrast failures | Site-wide | ✅ flagged | ✅ flagged | ✅ **Approved — implement** — gold labels on white: `#D4A017` → `#9A6400` (5.0:1); gray subtitle text: `text-gray-400` → `text-gray-500` (`#6B7280`, 4.9:1) |
| 7 | Logo file oversized (695×335px source → ~220px display; 92 KB wasted) | Site-wide | ✅ flagged | ✅ flagged | ✅ **Approved — implement** — resize in-place to 440×212px (2× retina) using Pillow; same filename, no code changes needed |
| 8 | Render-blocking CSS chunks (Next.js splits CSS into two files) | Site-wide | ✅ flagged | ✅ flagged | ✋ **Inherent** — Next.js static CSS chunking; no action available without ejecting build |
| 9 | High main-thread work (6.7s mobile, 8.8s desktop) driven by Framer Motion animations | Site-wide | ✅ flagged | ✅ flagged | ✋ **Inherent** — animation library cost; acceptable given current TBT of 0ms/30ms |

### Implementation — All Fixes Implemented (2026-06-23)

**Fix 1 — Logo width/height** (`components/MegaMenu.tsx`):
```tsx
// Find the logo <img> and add explicit dimensions:
<img
  src="/images/logo/mz-global-trading-logo-header.webp"
  alt="MZ Global Trading"
  width={220}
  height={106}
  className="w-[160px] md:w-[190px] lg:w-[220px] h-auto"
/>
```

**Fix 2 — prefetch={false} on nav links** (`components/MegaMenu.tsx`):
Add `prefetch={false}` to every `<Link>` inside the mega menu nav (breadcrumb links, sub-item links). Eliminates RSC `.txt` 404 console errors on hover.

**Fix 3 — GA4 gtag.js lazyOnload** (`app/layout.tsx`):
The `<Script src="https://www.googletagmanager.com/gtag/js?id=G-BEG0E64X9E">` tag is the **Google Analytics 4** library (GA4 Measurement ID `G-BEG0E64X9E`), NOT Google Tag Manager. PSI mislabeled it as GTM because both share the `googletagmanager.com` CDN domain. Changed strategy to `"lazyOnload"` to stop it blocking render.

**Fix 4 — browserslist** (`package.json`):
```json
"browserslist": [
  "last 2 Chrome versions",
  "last 2 Firefox versions",
  "last 2 Safari versions",
  "last 2 Edge versions"
]
```
Eliminates 14 KiB of polyfills for `Array.at`, `Array.flat`, `Object.fromEntries`, `Object.hasOwn`, `String.trimEnd/trimStart`.

---

## Site-Wide Performance Optimisation — Image Compression (2026-06-23)

All content images compressed using Pillow WebP encoder at optimised quality settings. **Total savings: ~8.7 MB.**

| Folder | Files | Quality | Before | After | Saved |
|---|---|---|---|---|---|
| `public/images/hero/` | 78 | 50 | 9,213 KB | 5,749 KB | 3,464 KB (38%) |
| `public/images/og/` | 80 | 70 | 10,484 KB | 5,898 KB | 4,586 KB (44%) |
| `public/images/cards/` | 3 | 60 | 411 KB | 262 KB | 149 KB (36%) |
| `public/images/menu/` | 67 | 50 | 1,054 KB | 562 KB | 492 KB (47%) |

**Skipped:** `hero-polo-shirts.webp` (already at q50 from prior session); all `-og.webp` files in `public/images/hero/` kept at their OG quality.

**Future images:** When adding new hero images, save at **quality 50**. OG images at **quality 70**. Menu preview images at **quality 50**. Use `method=6` in Pillow for best compression.

---

## Site-Wide Accessibility Improvement — WCAG AA Contrast (2026-06-23)

### CSS global rule — `app/globals.css`
Extended the accessible gold rule to cover both `text-xs` (12px) AND `text-sm` (14px) labels on light/white backgrounds. Both fail WCAG AA at `#D4A017` (2.3:1 on white); `#9A6400` gives 5.0:1.

```css
.text-gold.text-xs,
.text-gold.text-sm {
  color: #9A6400;
}
/* Restore bright gold inside dark navy sections where it already passes */
.bg-navy-900 .text-gold.text-xs,
.bg-navy-900 .text-gold.text-sm,
.bg-navy-950 .text-gold.text-xs,
.bg-navy-950 .text-gold.text-sm { color: #D4A017; }
```

Note: Arbitrary-size classes like `text-[10px]` are NOT matched by this CSS — those require inline `text-[#9A6400]` in the component JSX.

### Per-file contrast rules applied across all product and cluster pages:
- `text-[10px] text-gold` on white/light backgrounds → `text-[10px] text-[#9A6400]`
- `text-gray-500` inside `bg-navy-900` / `bg-navy-950` panels → `text-gray-400`
- `text-gray-500` on `bg-[#f0f0f5]` / `bg-gray-50` → `text-gray-600`
- Coloured step badge backgrounds (bg-gold, bg-sky-500, etc.) with `text-white` → darker `-700` variants
- `text-white/70`, `text-white/60` on medium-tone backgrounds → `text-white`
- `text-navy-900/70` on gold/amber backgrounds → `text-navy-900`
- `text-sky-600` on `bg-sky-50` → `text-sky-700`
- `text-gray-400` on white sections → `text-gray-500`

---

## Content Accuracy Review — Progress Tracker

Full site content audit: 46 leaf pages + 138 KH/guide/download pieces. Validated against authenticated B2B sources. Each cluster logged below with corrections made.

### Cluster 1 — Bath Linen

#### Towels ✅
- Gym Towel size: 50×100 → 70×130 cm (CLAUDE.md documented error now applied to TowelsContent.tsx)
- Bath Sheet size: 90×150 → 90×180 cm (industry standard 35"×70" = 89×178 cm)
- Luxury GSM range: 550–650 → 550–700 (5-star hotel standard is 600–700 per multiple B2B sources)
- FAQ: 5-star GSM "550–650 in zero twist" → "600–700 GSM in ring-spun combed or zero twist"
- Sports/Gym sector: added microfiber note (80% polyester/20% polyamide, standard for gym programmes)
- KH article: 500–600 GSM tier relabelled from "5-star standard" to "Full-service & Upscale Hotels"; 600–700 tier updated to "5-star Hotel Standard & Luxury"; certification table corrected (USA 5-star: 550–600 → 600–700 GSM)
- Guide: GSM table corrected — "5-star hotel & premium retail" tier shifted from 500–600 to 600–750 bracket
- Download: Hand towel size corrected from 50×100 cm (gym towel size) to 40×70 cm; download GSM table "5-star hotel" label corrected to "full-service / upscale hotel"

#### Institutional Towels ✅
- KH article: 5-star GSM "550–600 minimum" → "600–700 minimum" (aligns with Towels correction)
- KH article: dobby border "30–40% longer life" → "measurably extends laundry life" (unverifiable specific figure removed)
- Guide: hospital hand towel size 50×100 cm → 40×70 cm (50×100 is a gym towel size, not a hospital hand towel)
- Download: hand towel 50×100 → 40×70 cm; 5-star hotel bath towel GSM 550–600 → 600–700

#### Bathrobes ✅
- KH article comparison table: velour typical GSM range 280–380 → 280–480 (product page specifies luxury velour at 400–480 GSM; table widened to cover full range)

#### Bath Mats ✅
- Product page: large bath mat 60×100 cm → 60×90 cm (60×100 not a real standard per CLAUDE.md RFQ corrections)
- KH article intro: "600 GSM tufted terry" → "1,000 GSM tufted terry" (600 GSM is below the stated range start of 800 GSM for tufted terry)
- KH article: "1,200–1,400 GSM is standard 5-star hotel specification" → "1,000–1,200 GSM is the standard hotel contract specification; 1,200–1,400 GSM for 5-star and luxury" (aligns with product page GSM_TIERS)

#### Beach & Pool Towels ✅
- Product page: Standard size 75×150 cm → 70×140 cm (corrected per CLAUDE.md RFQ corrections — 75×150 non-standard; 70×140 is global retail standard)

### Cluster 2 — Bed Linen
#### Bedsheets ✅
- Product page BED_SIZES_US: Twin 96×183 cm → 96×190 cm; King 183×203 cm → 193×203 cm (corrected in previous session per CLAUDE.md)

#### Fitted Sheets ✅
- Product page POCKET_DEPTHS: first entry 12"/30 cm "Standard" → 14"/35 cm "Residential Standard" (30 cm too shallow for residential mattresses); second entry 15" → 16" (aligns with CLAUDE.md sequence: 14→16→18→21→25+)
- Product page OEM_MODULES: "12, 15, 18, 21 or 26+" → "14, 16, 18, 21 or 26+" inch pocket depth
- Sibling references across DuvetCoversContent, PillowCoversContent, InstitutionalBeddingContent: "12 to 26" → "14 to 26" inch
- KH article: clean — no corrections needed (uses range descriptions, not minimums)
- Guide: clean — no corrections needed

#### Duvet Covers ✅
- No corrections needed — content accurate

#### Pillow Covers ✅
- Product page SIZES USA: Standard 50×75 cm → 51×66 cm; Queen 50×90 cm → 51×76 cm; King 50×102 cm → 51×91 cm (page was using UK sizes for USA market; corrected to match download reference and guide data)
- Bathrobe KH article (bathrobe-fabric-types.ts): body text velour GSM "typically 280–380" → "typically 280–480 GSM (luxury velour at 400–480 GSM)" to match comparison table already corrected in previous session

#### Cushion Covers ✅
- No corrections needed

#### Curtains ✅
- No corrections needed

### Cluster 3 — Hospital Linen
#### Doctor Surgical Gowns ✅
- No corrections needed — constructions, GSM, AAMI/EN 13795 standards, autoclave temperatures all accurate

#### Medical Scrubs ✅
- No corrections needed — GSM tiers, construction options, colour programme accurate

#### Patient Gowns ✅
- No corrections needed — minor GSM range variation (KH 100–160 vs page 120–180) is contextual: KH covers woven only; page includes jersey knit gowns

#### Surgical Huck Towels ✅
- No corrections needed — product page (180–280 GSM, standard 220 GSM) and KH (130–180 GSM standard) represent premium vs. general clinical tiers respectively

### Cluster 4 — Kitchen Linen ✅
#### Kitchen Towels ✅ — No corrections needed
#### Bar Mops ✅ — No corrections needed
#### Aprons ✅ — No corrections needed
#### Pot Holders ✅ — No corrections needed

### Cluster 5 — Table Linen ✅
#### Table Covers ✅ — No corrections needed

### Cluster 6 — Thermal Blankets ✅
#### Cellular Thermal Blanket ✅ — No corrections needed
#### Fleece Thermal Blankets ✅ — No corrections needed

### Cluster 7 — Industrial Linen ✅
#### Shop Towels ✅ — No corrections needed
#### Fender Covers ✅ — No corrections needed

### Cluster 8 — Ihram ✅
#### Ihram ✅ — No corrections needed (warp-knit construction confirmed as accurate per user correction in prior session)

### Cluster 9 — Knitted Garments ✅
#### T-Shirts ✅ — No corrections needed (product page and KH/guide/download all consistent)
#### Polo Shirts ✅ — No corrections needed
#### Henley Shirts ✅ — No corrections needed
#### Sweatshirts & Hoodies ✅ — Guide corrected: `lib/guides-content.ts` hoodie-sweatshirt-sourcing-pakistan — French terry 260–380 → 300–400 GSM; brushed fleece 280–380 → 340–420 GSM (both paragraph text and table rows); aligns with HoodiesContent.tsx GSM_TIERS
#### Sweatpants & Joggers ✅ — No corrections needed
#### Tank Tops ✅ — No corrections needed

### Cluster 10 — Woven Garments ✅
#### Denim Jeans ✅ — No corrections needed (denim-weight-guide.ts uses correct 1 oz = 33.9 GSM constant)
#### Formal & Casual Shirts ✅ — No corrections needed
#### Pants & Trousers ✅ — No corrections needed
#### Cargo Pants ✅ — No corrections needed
#### Shorts ✅ — KH article corrected: `content/knowledge/shorts-fabric-guide.ts` — chino GSM 220–280 → 200–260; linen GSM 180–240 → 160–200 (both inline text and summary table); inline commentary bounds also updated from "Below 220/above 280" → "Below 200/above 260"; aligns with ShortsContent.tsx GSM_TIERS

### Cluster 11 — Baby & Kids ✅
#### T-Shirts for Kids ✅ — No corrections needed
#### Swaddle Muslin Fabric ✅ — Two files corrected:
  - `content/knowledge/muslin-swaddle-fabric-guide.ts`: double gauze GSM table 140–160 → 110–130 (lightweight), 160–200 → 130–160 (standard); swaddle sizing 70×70 cm → 100×100 cm (70×70 is a muslin square, not a swaddle blanket)
  - `lib/guides-content.ts` sourcing-swaddle-muslin-pakistan: double gauze 140–200 → 110–160 GSM; bamboo ratio 50/50 → 70/30 (per SwaddleMuslinContent.tsx); sizing 70×70/120×120 → 100×100/120×120/47"×47"
#### Overalls ✅ — Product page corrected: `app/apparel/babyandkids/overalls/OverallsContent.tsx` GSM_TIERS oz/GSM conversions — 7–9 oz ~150–200 → ~240–305 gsm; 9–11 oz ~200–280 → ~305–375 gsm; 11–14 oz ~280–340 → ~375–475 gsm (conversion: 1 oz = 33.9 GSM; previous values were ~40% too low)
#### Baby Rompers ✅ — No corrections needed
#### Baby Bibs ✅ — No corrections needed
#### Baby Hooded Towels ✅ — No corrections needed

### Cluster 12 — Workwear Apparel ✅
#### Workwear Apparel ✅ — No corrections needed (canvas 280–400, GSM tiers, FR standards all accurate)

### Cluster 13 — Socks ✅
#### Socks ✅ — No corrections needed (gauge, compression class definitions 15–21/23–32/34–46 mmHg all accurate)

### Cluster 14 — Fabric ✅
#### Apparel Fabric ✅ — KH article corrected: `content/knowledge/apparel-fabric-types-guide.ts`:
  - Single jersey 120–220 → 120–200 GSM (bullet and table row); aligns with ApparelFabricContent.tsx
  - Interlock 180–280 → 160–280 GSM (bullet); aligns with ApparelFabricContent.tsx lower bound of 160
  - French terry 240–320 → 260–400 GSM (bullet and table row); 240 GSM too light for sweatshirt terry; aligns with corrected hoodie guide range
  - Denim oz/GSM 280–490 → 271–475 gsm (table row); correct conversion: 8oz × 33.9 = 271 GSM; 14oz × 33.9 = 475 GSM
#### Home Textile Fabric ✅ — Two files corrected:
  - `content/knowledge/home-textile-fabric-guide.ts`: terry upper bound 800 → 700 GSM (text tiers and table row); HomeTextileFabricContent.tsx and TowelsContent.tsx both cap at 700 GSM; 700–800 "luxury spa" tier removed
  - `lib/guides-content.ts` sourcing-home-textile-fabric-pakistan: terry table row 300–800 → 300–700 GSM

---

## Known Bugs Fixed — Do Not Repeat

These bugs were each reported multiple times. Understand the root cause so they are never introduced again.

---

### BUG 1 — Baby & Kids Cluster Page: Wrong Box Images
**File:** `app/apparel/babyandkids/BabyAndKidsContent.tsx`
**Root cause:** The `PRODUCTS` array at the top of the file had generic placeholder images (`hero-apparel.webp`, `hero-home-textiles.webp`, `hero-towels.webp`) instead of each product's dedicated hero image.
**Fix:** Each entry in `PRODUCTS[]` must use the product's own dedicated hero image:
```
T-Shirts for Kids     → /images/hero/hero-t-shirts-for-kids.webp
Swaddle Muslin Fabric → /images/hero/hero-swaddle-muslin-fabric.webp
Overalls              → /images/hero/hero-overalls.webp
Baby Rompers          → /images/hero/hero-baby-rompers.webp
Baby Bibs             → /images/hero/hero-baby-bibs.webp
Baby Hooded Towels    → /images/hero/hero-baby-hooded-towels.webp
```
**Key lesson:** When updating product card images on cluster pages, fix the `PRODUCTS[]` / `CLUSTERS[]` data array in the cluster's own `*Content.tsx` file — NOT just the same-tier sibling cards on leaf pages. These are separate data structures in separate files.

---

### BUG 2 — Quality Policy Hero Image Wrong
**File:** `app/quality-policy/QualityPolicyContent.tsx`
**Root cause:** PageHero `image=` prop was pointing to `hero-why-choose-us.webp` instead of `hero-quality-policy.webp`.
**Fix:** Always verify `image=` prop on `<PageHero>` matches the page-specific hero image.
**Key lesson:** When uploading a new hero image for a page, always grep for the `<PageHero image="...">` prop in that page's Content.tsx and update it explicitly.

---

### BUG 3 — Quality Policy Page is NOT under /qualitycompliance/
**Correct location:** `app/quality-policy/page.tsx` (hyphenated, top-level)
**Wrong assumption:** `app/qualitycompliance/qualitypolicy/` — this directory does NOT exist.
**URL:** `/quality-policy/` (not `/qualitycompliance/qualitypolicy/`)
**Key lesson:** Quality Policy is a standalone top-level page, not nested under `/qualitycompliance/`. The other 4 quality pages (quality control, inspection process, supplier evaluation, certifications) ARE under `/qualitycompliance/`.

---

### BUG 4 — Hero Gradient Direction Wrong on Some Pages
**Affected pages (fixed):** Baby Rompers, Baby Bibs, Baby Hooded Towels
**Root cause:** Used Tailwind `bg-gradient-to-t` (top-to-bottom) instead of the standard inline left-to-right gradient style.
**Correct standard:**
```tsx
style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }}
```
**Key lesson:** Never use Tailwind gradient classes for hero overlays. Always use the inline `style=` with the exact rgba values above. The standard is documented in PageHero.tsx and in the Hero Overlay Standard section of this file.

---

### BUG 5 — Duplicate Breadcrumbs on Some Pages
**Affected pages (fixed):** Baby Rompers, Baby Bibs, Baby Hooded Towels
**Root cause:** When the hero section was rewritten to fix the gradient, the old standalone `<nav aria-label="Breadcrumb">` breadcrumb below the hero was not removed, leaving two breadcrumbs.
**Key lesson:** When rewriting a hero section that adds breadcrumbs inside it, always search the file for any existing standalone breadcrumb `<nav>` below the hero and remove it.

---

### BUG 6 — Page Box Cards Not Fully Clickable
**Root cause:** Some cards used `<motion.div>` as outer wrapper with `<Link className="block">` inside, placing the text overlay `div` outside the Link's rendered height.
**Correct pattern — `<Link>` must always be the outermost element:**
```tsx
<Link href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
  <div className="relative h-64 overflow-hidden">
    <Image src={p.img} alt={p.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="..." />
    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
  </div>
  <div className="absolute bottom-0 left-0 right-0 p-5">
    <p className="font-bold text-white text-sm leading-tight mb-1">{p.name}</p>
    <p className="text-gray-300 text-xs leading-relaxed mb-2">{p.desc}</p>
    <span className="text-xs font-semibold text-gold transition-all duration-200">View →</span>
  </div>
</Link>
```
**Key lesson:** `<Link>` must be the outermost element on every card. Never wrap a card in `<div>` or `<motion.div>` with Link inside — the card won't be fully clickable on the text area.

---

### BUG 7 — Hero Images on Leaf Pages Not Updated When New Files Uploaded
**Root cause:** When new hero images were uploaded (e.g. `hero-baby-bibs.webp`), the `<Image src=...>` prop in the leaf page's Content.tsx still pointed to the old generic image (e.g. `hero-apparel.webp`). The upload alone is not enough.
**Fix checklist when uploading a new hero image for a page:**
1. Copy file to `public/images/hero/hero-[slug].webp`
2. Copy file to `public/images/og/[slug]-og.webp` (same image, OG naming)
3. Update `<Image src=...>` in the page's `*Content.tsx`
4. Update `openGraph.images[0].url` in `page.tsx`
5. Update JSON-LD `image:` in `page.tsx`
6. Update JSON-LD `primaryImageOfPage.contentUrl` in `page.tsx`
7. Update `img:` in any same-tier sibling cards on OTHER pages that link to this page

---

### BUG 8 — Same-Tier Sibling Sections Missing on Cluster Pages
**Root cause:** When leaf pages were built, the cluster page's own product card array (`PRODUCTS[]`) was never updated to use dedicated hero images — only generic category images were used as placeholders.
**Key lesson:** Every cluster page's `PRODUCTS[]` / product grid array must be audited when dedicated hero images are added for that cluster's leaf pages. Check `img:` or `image:` values in the cluster Content.tsx, not just the leaf pages.

---

## RFQ Wizard — Architecture & Product Data Reference

**Status:** Approved for build. Research finalised 2026-06-11.

### File Locations
| File | Purpose |
|---|---|
| `app/rfq/page.tsx` | Metadata, JSON-LD, page shell |
| `app/rfq/RFQContent.tsx` | Full wizard UI — `"use client"` |
| `lib/rfq-product-options.ts` | All product-specific dropdown data (single source of truth) |

`lib/` is at the project root alongside `app/`. This is the standard Next.js location for non-component library code.

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

> Full `ProductOptions` interface and `PRODUCT_OPTIONS` record are defined in `lib/rfq-product-options.ts` — read that file directly. Key conditional flags (not obvious from field names):

| Flag | Effect |
|---|---|
| `isIhram` | Forces white-only colour, hides decoration fields |
| `isMedical` | Shows sterilisation options |
| `isFabricRoll` | Shows roll packing instead of unit packing |
| `showBorderField` | Terry products and bed linen only |
| `showPocketDepth` | Fitted sheets only |
| `showClosureType` | Duvet covers, pillow/cushion covers |
| `showCollarType` | Bathrobes only |
| `showHeatingRating` | Pot holders only |
| `showBackingType` | Bath mats only |
| `showHeadingType` / `showLiningType` | Curtains only |
| `showPileHeight` | Towels, Institutional Towels, Bathrobes, Bath Mats — dropdown for pile height in mm tiers |

**`showPileHeight` — wiring:**
- `ProductOptions`: `showPileHeight?: boolean; pileHeightOptions?: string[]`
- `ProductSpec`: `pileHeight: string`
- Rendered inside "Yarn Specification — Pile & Ground" `SpecSection`, shown only when `shouldShowPileGround && opts.showPileHeight`
- Included in email body (PILE YARN SPECIFICATION block) and Review step
- **Never add a free-text pile height override** — the dropdown tiers are deliberately limited to prevent buyers specifying non-manufacturable values

**Pile height tiers by product:**

| Product | Options |
|---|---|
| Towels | 8–10 mm (light/budget), 10–13 mm (standard retail), 13–16 mm (hotel premium), 16+ mm (luxury/spa) |
| Institutional Towels | 8–10 mm (airline/healthcare), 10–13 mm (hotel standard), 13–16 mm (premium hotel) |
| Bathrobes | 4–6 mm (velour/sheared), 8–10 mm (standard terry), 12–15 mm (luxury terry) |
| Bath Mats | 8–10 mm (600–800 GSM), 10–13 mm (800–1,000 GSM), 13–16 mm (1,000–1,400 GSM), 16–20 mm (1,400+ GSM luxury) |

---

### RFQ Wizard — Data Accuracy Decisions (verified 2026-06-24)

All values below were cross-referenced against `lib/downloads-content.ts` spec sheet templates. **Do not revert these — the previous values were wrong.**

**Sizes (corrected to spec sheet standards):**
- Beach towel standard: **70×140 cm** (was 75×150 — non-standard)
- Beach towel USA-format: **76×152 cm** (added — distinct US retail standard)
- Beach towel round: **Ø150 cm** (added)
- Bath mat large: **60×90 cm** (was 60×100 — not a real standard)
- Bath mat XL: **70×110 cm** (added — 4-star/5-star hotel standard)
- Bath mat pedestal: **45×45 cm** (added — UK retail standard)
- Bath mat bath runner: **50×160 cm** (added — spa/resort)
- Sports/Gym towel: **70×130 cm** (was 50×100 — 50×100 is a hand towel, not a gym towel)
- Bed linen Twin: **96×190 cm** (was 96×183 — mattress is 190 cm long, not 183)
- Bed linen King: **193×203 cm** (was 183×203 — King mattress is 193 cm wide, not 183)

**Construction (corrected terminology):**
- Bed linen: **"Poplin (fine plain weave)"** replaces "Oxford Weave" — Oxford weave is a shirt fabric term; Poplin is the correct bed linen term
- Bathrobe sizes: **"One Size (hotel standard — fits most adults)"** added as first option; S/M/L/XL/XXL listed individually — hotels universally buy one-size robes; the old XS/S merged pairs were unusual for B2B procurement

**Backing options — Bath Mats (expanded to 4 industry-standard types):**
- SBR latex (standard anti-slip)
- Natural rubber latex (premium, very high anti-slip)
- TPR thermoplastic rubber (high durability, washes above 60°C) — **was missing**; most durable commercial option
- PVC spray (budget, REACH check required)
- None

**Institutional Towels design options (expanded from 2 to 5):**
Previous: "Plain white" / "White with dobby stripe border" only
Now: Plain white / Plain ecru / Solid colour (Pantone) / White with dobby border stripe / With embroidered logo — reflects actual hotel and gym buyer needs

**Finishing options — corrections:**
- Towels: **removed "Zero Twist effect"** — Zero Twist is a yarn/construction type set in the construction dropdown, not a post-production finish. Listing it as a finish was technically wrong and would confuse experienced buyers.
- Beach towels: chlorine resistance label changed to **"Chlorine-Resistant (pool programme — ISO 105-E03)"** — makes the standard explicit; critical for pool programmes

**Fitted sheet pocket depths (corrected):**
- Replaced `12" / 30 cm` with **`14" / 35 cm (residential standard)`** — 30 cm is too shallow for any standard residential mattress (20–25 cm deep + 4–6 cm grip = minimum 26–31 cm needed; industry standard starts at 14")
- Full sequence: 14" → 16" → 18" (deep) → 21" (extra deep) → 25"+ (super deep)

**Constants in `app/rfq/RFQContent.tsx` (updated):**
- `YARN_TYPES`: added **"Zero Twist"** — referenced in towel construction options but was missing from the yarn type selector
- `STITCH_TYPES`: added **"Lock Stitch (standard seam)"** as first option — most fundamental stitch in woven garment manufacturing; was entirely absent
- `NUMBER_OF_COLORS`: added **"White / undyed (no colour specification)"** as first option — institutional buyers ordering white hotel stock had no correct answer

---

### Complete Product Options Reference

> **Source of truth:** `lib/rfq-product-options.ts` — all product-specific dropdowns, construction options, finishing options, size ranges, unit-of-measure, and flags (isIhram, isMedical, isFabricRoll, etc.) live there. Read that file directly rather than maintaining a duplicate listing here.

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

---

## Content Creation Standards — Core Objective (Always Apply)

**Primary objective:** Every piece of content (KH article, Guide, Download) must deliver two things simultaneously:
1. **Excellent international SEO** — target procurement managers, import directors and brand owners in USA, Canada, UK, Europe (all), South America, Middle East, Southeast Asia, Australia, East Asia, Russia/CIS. Front-load primary keywords. Use keyword-rich internal anchor text.
2. **Real business value to the reader** — the content must genuinely help a buyer make a sourcing decision. No filler. No vague claims. Facts, specifications, tables, comparisons, and actionable guidance.

**Internal linking rules (SEO):**
- Every KH article links to: (a) its product page with exact-match anchor text, (b) related product pages, (c) `/rfq/` with "Request a Quote" CTA at the end
- Every Guide links to: its product page, related guides, and `/rfq/`
- Every Download links to: its product page and `/rfq/`
- Anchor text must use SEO keywords — NEVER "click here", "read more", "this page"
- Link text examples: "Pakistan bath towel manufacturer", "source towels from Pakistan", "hotel towel specification"

**Certification mentions:** Always mention which certifications apply to the product's target markets (OEKO-TEX for EU/UK/USA retail; GOTS for organic claims; BSCI/Sedex/WRAP for social compliance; ISO 9001 universally)

**Copy tone:** Professional, direct, B2B. Reader is a procurement manager with 10+ years experience. No consumer-friendly simplification. Specific numbers, not vague claims.

---

## Content Build Pillars — Rules & Pre-Write Checklist

Every KH article, Guide, and Download must deliver two things simultaneously: (1) excellent international SEO targeting procurement managers in USA, Canada, UK, Europe, South America, Middle East, SE Asia, Australia, East Asia, Russia/CIS; and (2) real business value — facts, specifications, tables, comparisons, and actionable guidance a buyer can act on.

### The Three Content Types

| Type | Location | SEO link syntax | Auto-discovered? |
|---|---|---|---|
| KH Article | `content/knowledge/[slug].ts` | `[anchor text](/url/)` markdown | ✅ Yes — `getAllPosts()` finds all `.ts` files |
| Guide | `lib/guides-content.ts` — add to `GUIDES` array | `<a href="/url/">anchor text</a>` HTML in `{ type: "p" }` blocks | ❌ No — must add card to `GuidesContent.tsx` hardcoded array |
| Download | `lib/downloads-content.ts` — add to `DOWNLOAD_DOCS` array | n/a (no inline links in downloads) | ❌ No — must add card to `DownloadsContent.tsx` hardcoded array |

### Inline Link Rules — Non-Negotiable

**KH articles** use markdown syntax: `[anchor text](/url/)`
- Links must appear throughout the body — in every major section (h3 subsection, bullet explanations, table footnotes, closing paragraph)
- Minimum 3–5 inline links per article body, spread across sections — NOT just in the intro and outro
- Every article must link to: (a) its product page, (b) 2+ related product pages, (c) `/rfq/`
- Use SEO keyword anchor text — never "click here", "read more", "this page"

**Guides** use raw HTML syntax in `{ type: "p", text: "..." }` blocks:
- `{ type: "p", text: "...text with <a href=\"/url/\">SEO anchor text</a> more text..." }`
- The guide renderer uses `dangerouslySetInnerHTML` on `"p"` blocks — this is safe because all content is hardcoded in TypeScript, never user-supplied
- Links must appear throughout the body — in every step, sub-section or specification paragraph
- Minimum 3–5 inline links per guide body section, spread across sections — NOT just in the intro and outro
- Every guide must also end with a `{ type: "seealso", ... }` block listing 4–6 related product pages and guides
- Every guide must link to: its product page, 2+ related product pages, and `/rfq/`

**Downloads** do NOT have inline HTML links — they are fill-in templates and reference sheets. No links required in blocks.

### Pre-Write Checklist — Run BEFORE Writing Any Content

Before writing a KH article, Guide, or Download for a product, verify:

1. **KH listing** — `app/knowledge/KnowledgeHubContent.tsx` is dynamic (uses `getAllPosts()`) — no action needed; new files auto-appear
2. **Guides listing** — `app/guides/GuidesContent.tsx` is hardcoded. You MUST:
   - Add the guide card object to the `guides[]` array in this file
   - Add the correct `catId` — use an existing category or add a new one to both the `type` union and `guideCategories[]` array
   - Update the hero `description`, `pills`, stats bar `val`, and h2 heading to reflect the new count
   - Remove any "upcoming" mention of this guide from the "More coming" section
3. **Downloads listing** — `app/downloads/DownloadsContent.tsx` is hardcoded. You MUST:
   - Add the download card object to the `documents[]` array in this file
   - Update hero `pills` (`"N Documents"`) and stats box `num` value to reflect the new count
4. **Bento on product page** — after all 3 content pieces are created, update the product page's `*Content.tsx` bento grid from generic links (`/knowledge/`, `/guides/`, `/downloads/`) to specific slug links with real titles
5. **Verify build passes** — `npm run build` must complete with zero errors before marking any cluster done

### Content Piece Template Reminders

- **KH date**: stagger — no two articles in the same batch share the same date
- **Guide `seealso` block**: always the last block; lists 4–6 related product pages + related guides
- **4-box bento** on product page: KH (white) · Guide (white) · Download (white) · RFQ (navy). All 4 boxes required. Template in Bento Standard Template section above.

---

## Content Build Plan — Knowledge Hub, Guides & Downloads Per Product

**Goal:** Every product leaf page gets 1 KH article + 1 Guide + 1 Download with specific, SEO-optimised content. After creating all three pieces, update the bento grid on the product page to show real titles and direct slug links instead of generic `/knowledge/`, `/guides/`, `/downloads/`.

**Status key:** ⬜ Not started · 🔄 In progress · ✅ Complete

### Rules for every content piece
1. KH articles go in `content/knowledge/[slug].ts` — add slug to `content/knowledge/` (auto-discovered)
2. Guides go in `lib/guides-content.ts` — add entry to the `GUIDES` array
3. Downloads go in `lib/downloads-content.ts` — add entry to the `DOWNLOADS` array
4. After all 3 pieces created for a product → update that product's `*Content.tsx` bento grid with specific titles and slugs
5. Each content piece must internally link back to its product page AND to 2+ related product pages using SEO keywords as anchor text
6. **KH articles**: links use `[keyword text](url)` markdown syntax — `renderMarkdown()` in `lib/knowledge.ts` handles it
7. **Guides**: links use raw HTML `<a href="...">keyword anchor</a>` directly in `{ type: "p", text: "..." }` blocks — the guide renderer uses `dangerouslySetInnerHTML` on `"p"` blocks (safe: all content hardcoded in TS)
8. **Each guide must also end with a `{ type: "seealso", ... }` block** listing 4–6 related product pages and guides
9. Keyword strategy: content piece targets long-tail variants of the product page's primary keyword
10. Dates: stagger over 18 months — no two KH articles or guides in same batch should share a date

### Bento Standard Template — ALL 4 BOXES REQUIRED
Every product page must have exactly 4 resource boxes in the RESOURCES section. Standard class: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5`.
```tsx
{/* Box 1 — Knowledge Hub (white card) */}
<Link href="/knowledge/[slug]/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
  <span className="text-2xl" aria-hidden="true">📚</span>
  <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
  <p className="font-semibold text-navy-900">Article Title</p>
  <p className="text-xs text-gray-500 leading-relaxed">Short description.</p>
  <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
</Link>
{/* Box 2 — Guide (white card) */}
<Link href="/guides/[slug]/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
  <span className="text-2xl" aria-hidden="true">📄</span>
  <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
  ...
</Link>
{/* Box 3 — Download (white card) */}
<Link href="/downloads/[slug]/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
  <span className="text-2xl" aria-hidden="true">⬇️</span>
  <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
  ...
</Link>
{/* Box 4 — RFQ (navy background) */}
<Link href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
  <span className="text-2xl" aria-hidden="true">✉️</span>
  <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
  <p className="font-semibold text-white">Ready to Source [Product]?</p>
  <p className="text-xs text-gray-300 leading-relaxed">...</p>
  <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
</Link>
```
Pages without specific content yet: KH box links to `/knowledge/`, Guide to `/guides/`, Download to `/downloads/`.

---

### CLUSTER 1 — Bath Linen (`/hometextile/bathlinen/`) ✅ COMPLETE

#### Towels (`/hometextile/bathlinen/towels/`)
- ✅ KH article: `terry-towel-gsm-guide` (date: 2025-11-20)
- ✅ Guide: `how-to-source-towels-pakistan` (date: 2025-12-10)
- ✅ Download: `towel-specification-sheet`
- ✅ Bento: 4-box standard layout with specific slugs

#### Institutional Towels (`/hometextile/bathlinen/institutionaltowels/`)
- ✅ KH article: `institutional-towel-standards` (date: 2026-01-14)
- ✅ Guide: `bulk-institutional-towel-sourcing` (date: 2026-01-28)
- ✅ Download: `institutional-towel-tech-pack`
- ✅ Bento: 4-box standard layout with specific slugs

#### Bathrobes (`/hometextile/bathlinen/bathrobes/`)
- ✅ KH article: `bathrobe-fabric-types` (date: 2026-02-18)
- ✅ Guide: `hotel-bathrobe-sourcing-guide` (date: 2026-03-04)
- ✅ Download: `bathrobe-customisation-checklist`
- ✅ Bento: 4-box standard layout with specific slugs

#### Bath Mats (`/hometextile/bathlinen/bathmats/`)
- ✅ KH article: `bath-mat-construction-guide` (date: 2026-03-25)
- ✅ Guide: `sourcing-bath-mats-pakistan` (date: 2026-04-15)
- ✅ Download: `bath-mat-size-weight-reference`
- ✅ Bento: 4-box standard layout with specific slugs

#### Beach & Pool Towels (`/hometextile/bathlinen/beachpooltowel/`)
- ✅ KH article: `beach-towel-print-techniques` (date: 2026-05-06)
- ✅ Guide: `beach-pool-towel-sourcing-guide` (date: 2026-05-22)
- ✅ Download: `beach-towel-artwork-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

---

### CLUSTER 2 — Bed Linen (`/hometextile/bedlinen/`) ✅ COMPLETE

#### Bedsheets (`/hometextile/bedlinen/bedsheets/`)
- ✅ KH article: `bedsheet-thread-count-guide` (date: 2025-10-08)
- ✅ Guide: `sourcing-bedsheets-pakistan` (date: 2025-10-20)
- ✅ Download: `bedsheet-size-chart-international`
- ✅ Bento: 4-box standard layout with specific slugs

#### Fitted Sheets (`/hometextile/bedlinen/fittedsheets/`)
- ✅ KH article: `fitted-sheet-pocket-depth-guide` (date: 2025-11-03)
- ✅ Guide: `hotel-fitted-sheet-sourcing` (date: 2025-11-18)
- ✅ Download: `fitted-sheet-measurement-template`
- ✅ Bento: 4-box standard layout with specific slugs

#### Duvet Covers (`/hometextile/bedlinen/duvetcovers/`)
- ✅ KH article: `duvet-cover-closure-types` (date: 2025-12-02)
- ✅ Guide: `sourcing-duvet-covers-pakistan` (date: 2025-12-15)
- ✅ Download: `duvet-cover-spec-order-sheet`
- ✅ Bento: 4-box standard layout with specific slugs

#### Pillow Covers (`/hometextile/bedlinen/pillowcovers/`)
- ✅ KH article: `pillow-cover-fabric-guide` (date: 2026-01-07)
- ✅ Guide: `custom-pillow-cover-sourcing` (date: 2026-01-15)
- ✅ Download: `pillow-cover-size-reference`
- ✅ Bento: 4-box standard layout with specific slugs

#### Cushion Covers (`/hometextile/bedlinen/cushioncovers/`)
- ✅ KH article: `cushion-cover-filling-guide` (date: 2026-02-03)
- ✅ Guide: `decorative-cushion-cover-sourcing` (date: 2026-02-17)
- ✅ Download: `cushion-cover-artwork-brief-template`
- ✅ Bento: 4-box standard layout with specific slugs

#### Curtains (`/hometextile/bedlinen/curtains/`)
- ✅ KH article: `curtain-fabric-guide` (date: 2026-03-04)
- ✅ Guide: `sourcing-curtains-pakistan` (date: 2026-03-17)
- ✅ Download: `curtain-measurement-order-template`
- ✅ Bento: 4-box standard layout with specific slugs

---

### CLUSTER 3 — Knitted Garments (`/apparel/knittedgarments/`)

#### T-Shirts (`/apparel/knittedgarments/tshirts/`)
- ⬜ KH article: slug `tshirt-fabric-weight-guide` — "T-Shirt Fabric Weight Guide: 130gsm to 280gsm for Fashion, Workwear & Promo"
- ⬜ Guide: slug `custom-tshirt-sourcing-pakistan` — "Custom T-Shirt Sourcing from Pakistan: Fabric, Fit & Decoration Options"
- ⬜ Download: slug `tshirt-size-spec-template` — "T-Shirt Size Spec & Measurement Template (S–5XL)"
- ⬜ Bento update on `app/apparel/knittedgarments/tshirts/TshirtsContent.tsx`

#### Polo Shirts (`/apparel/knittedgarments/poloshirts/`)
- ⬜ KH article: slug `polo-shirt-pique-guide` — "Polo Shirt Piqué Fabric Guide: Single, Double & Waffle Weaves for B2B Buyers"
- ⬜ Guide: slug `polo-shirt-sourcing-pakistan` — "Polo Shirt Sourcing from Pakistan: Collar Types, Placket Options & Branding"
- ⬜ Download: slug `polo-shirt-spec-template` — "Polo Shirt Specification Template"
- ⬜ Bento update on `app/apparel/knittedgarments/poloshirts/PoloShirtsContent.tsx`

#### Henley Shirts (`/apparel/knittedgarments/henleyshirts/`)
- ⬜ KH article: slug `henley-shirt-construction-guide` — "Henley Shirt Construction Guide: Placket Styles, Fabric & Button Options"
- ⬜ Guide: slug `sourcing-henley-shirts-pakistan` — "Sourcing Henley Shirts from Pakistan: OEM, Seasonal Collections & Lead Times"
- ⬜ Download: slug `henley-shirt-measurement-sheet` — "Henley Shirt Measurement Sheet"
- ⬜ Bento update on `app/apparel/knittedgarments/henleyshirts/HenleyShirtsContent.tsx`

#### Sweatshirts & Hoodies (`/apparel/knittedgarments/sweatshirtshoodies/`)
- ⬜ KH article: slug `fleece-fabric-guide` — "Fleece Fabric Guide: Polar, French Terry & Brushed Fleece for Buyers"
- ⬜ Guide: slug `hoodie-sweatshirt-sourcing-pakistan` — "Hoodie & Sweatshirt Sourcing from Pakistan: GSM, Lining & Custom Print Options"
- ⬜ Download: slug `hoodie-spec-template` — "Hoodie & Sweatshirt Specification Template"
- ⬜ Bento update on `app/apparel/knittedgarments/sweatshirtshoodies/SweatshirtsHoodiesContent.tsx`

#### Sweatpants & Joggers (`/apparel/knittedgarments/sweatpantsjoggers/`)
- ⬜ KH article: slug `jogger-waistband-guide` — "Jogger & Sweatpant Waistband Guide: Drawstring, Elastic & Rib Trim Options"
- ⬜ Guide: slug `sourcing-joggers-sweatpants-pakistan` — "Sourcing Joggers & Sweatpants from Pakistan: Fabric, Fit & OEM Options"
- ⬜ Download: slug `jogger-size-spec-template` — "Jogger & Sweatpant Size Specification Template"
- ⬜ Bento update on `app/apparel/knittedgarments/sweatpantsjoggers/SweatpantsJoggersContent.tsx`

#### Tank Tops (`/apparel/knittedgarments/tanktops/`)
- ⬜ KH article: slug `tank-top-fabric-guide` — "Tank Top Fabric Guide: Cotton Jersey, Rib & Performance Fabrics for B2B"
- ⬜ Guide: slug `tank-top-sourcing-pakistan` — "Sourcing Tank Tops from Pakistan: Fabric Options, Sizing & Custom Branding"
- ⬜ Download: slug `tank-top-measurement-template` — "Tank Top Measurement Template"
- ⬜ Bento update on `app/apparel/knittedgarments/tanktops/TankTopsContent.tsx`

---

### CLUSTER 4 — Woven Garments (`/apparel/woven/`)

#### Denim Jeans (`/apparel/woven/denimjeans/`)
- ⬜ KH article: slug `denim-weight-guide` — "Denim Weight Guide: 6oz to 14oz — What Buyers Need to Know"
- ⬜ Guide: slug `sourcing-denim-jeans-pakistan` — "Sourcing Denim Jeans from Pakistan: Wash Types, Fits & Certification"
- ⬜ Download: slug `denim-jeans-spec-template` — "Denim Jeans Specification Template"
- ⬜ Bento update on `app/apparel/woven/denimjeans/DenimJeansContent.tsx`

#### Formal & Casual Shirts (`/apparel/woven/formalcasualshirts/`)
- ⬜ KH article: slug `dress-shirt-fabric-guide` — "Dress Shirt Fabric Guide: Poplin, Oxford, Twill & End-on-End for B2B"
- ⬜ Guide: slug `formal-casual-shirt-sourcing-pakistan` — "Formal & Casual Shirt Sourcing from Pakistan: Collar Styles, Fabric & MOQ"
- ⬜ Download: slug `shirt-spec-grading-template` — "Shirt Specification & Grading Template"
- ⬜ Bento update on `app/apparel/woven/formalcasualshirts/FormalCasualShirtsContent.tsx`

#### Pants & Trousers (`/apparel/woven/pantstrousers/`)
- ⬜ KH article: slug `trouser-fabric-guide` — "Trouser Fabric Guide: Chino, Twill, Stretch & Linen for International Buyers"
- ⬜ Guide: slug `pants-trousers-sourcing-pakistan` — "Pants & Trousers Sourcing from Pakistan: Fabric, Fit & Construction"
- ⬜ Download: slug `trouser-measurement-template` — "Trouser Measurement & Grading Template"
- ⬜ Bento update on `app/apparel/woven/pantstrousers/PantsTrousersContent.tsx`

#### Cargo Pants (`/apparel/woven/cargopants/`)
- ⬜ KH article: slug `cargo-pants-construction-guide` — "Cargo Pants Construction Guide: Pocket Placement, Fabric & Durability Standards"
- ⬜ Guide: slug `sourcing-cargo-pants-pakistan` — "Sourcing Cargo Pants from Pakistan: Workwear Grade, Fabric & Custom Options"
- ⬜ Download: slug `cargo-pants-spec-template` — "Cargo Pants Specification Template"
- ⬜ Bento update on `app/apparel/woven/cargopants/CargoPantsContent.tsx`

#### Shorts (`/apparel/woven/shorts/`)
- ⬜ KH article: slug `shorts-fabric-guide` — "Shorts Fabric Guide: Chino, Linen, Swim & Active for B2B Buyers"
- ⬜ Guide: slug `sourcing-shorts-pakistan` — "Sourcing Shorts from Pakistan: Inseam Lengths, Fabric & Custom Branding"
- ⬜ Download: slug `shorts-size-spec-template` — "Shorts Size Specification Template"
- ⬜ Bento update on `app/apparel/woven/shorts/ShortsContent.tsx`

---

### CLUSTER 5 — Baby & Kids (`/apparel/babyandkids/`)

#### T-Shirts for Kids (`/apparel/babyandkids/kidsshirts/`)
- ⬜ KH article: slug `kids-apparel-safety-standards` — "Kids Apparel Safety Standards: GOTS, OEKO-TEX & Age-Appropriate Requirements"
- ⬜ Guide: slug `kids-tshirt-sourcing-pakistan` — "Kids T-Shirt Sourcing from Pakistan: Fabric Safety, Sizing & Compliance"
- ⬜ Download: slug `kids-size-chart-template` — "Kids Apparel Size Chart (3M–14Y, US/EU/UK)"
- ⬜ Bento update on `app/apparel/babyandkids/kidsshirts/KidsShirtsContent.tsx`

#### Swaddle Muslin Fabric (`/apparel/babyandkids/swaddlemuslin/`)
- ⬜ KH article: slug `muslin-swaddle-fabric-guide` — "Muslin Swaddle Fabric Guide: GSM, Weave & Safety Certifications for Baby Products"
- ⬜ Guide: slug `sourcing-swaddle-muslin-pakistan` — "Sourcing Swaddle Muslin Fabric from Pakistan: GOTS Certification & Custom Print"
- ⬜ Download: slug `swaddle-blanket-spec-template` — "Swaddle Blanket Specification Template"
- ⬜ Bento update on `app/apparel/babyandkids/swaddlemuslin/SwaddleMuslinContent.tsx`

#### Overalls (`/apparel/babyandkids/overalls/`)
- ⬜ KH article: slug `baby-overalls-construction-guide` — "Baby Overalls Construction Guide: Snaps, Adjustable Straps & Fabric Safety"
- ⬜ Guide: slug `sourcing-baby-overalls-pakistan` — "Sourcing Baby Overalls from Pakistan: OEKO-TEX Certified Fabric & Custom Sizing"
- ⬜ Download: slug `baby-overalls-size-spec-template` — "Baby Overalls Size & Specification Template"
- ⬜ Bento update on `app/apparel/babyandkids/overalls/OverallsContent.tsx`

#### Baby Rompers (`/apparel/babyandkids/babyrompers/`)
- ⬜ KH article: slug `baby-romper-fabric-guide` — "Baby Romper Fabric Guide: Rib Knit, Interlock & Muslin for Infant Wear"
- ⬜ Guide: slug `sourcing-baby-rompers-pakistan` — "Sourcing Baby Rompers from Pakistan: Snap Closures, Sizing & Safety Standards"
- ⬜ Download: slug `baby-romper-spec-template` — "Baby Romper Specification Template"
- ⬜ Bento update on `app/apparel/babyandkids/babyrompers/BabyRompersContent.tsx`

#### Baby Bibs (`/apparel/babyandkids/babybibs/`)
- ⬜ KH article: slug `baby-bib-construction-guide` — "Baby Bib Construction Guide: Drool, Feeding & Bandana Styles for Buyers"
- ⬜ Guide: slug `sourcing-baby-bibs-pakistan` — "Sourcing Baby Bibs from Pakistan: Absorbency, Closure Types & Custom Print"
- ⬜ Download: slug `baby-bib-spec-template` — "Baby Bib Specification Template"
- ⬜ Bento update on `app/apparel/babyandkids/babybibs/BabyBibsContent.tsx`

#### Baby Hooded Towels (`/apparel/babyandkids/babyhooded/`)
- ⬜ KH article: slug `baby-hooded-towel-guide` — "Baby Hooded Towel Guide: GSM, Hood Styles & OEKO-TEX Safety for Infant Use"
- ⬜ Guide: slug `sourcing-baby-hooded-towels-pakistan` — "Sourcing Baby Hooded Towels from Pakistan: Certified Fabric & Custom Embroidery"
- ⬜ Download: slug `baby-hooded-towel-spec-template` — "Baby Hooded Towel Specification Template"
- ⬜ Bento update on `app/apparel/babyandkids/babyhooded/BabyHoodedContent.tsx`

---

### CLUSTER 6 — Kitchen Linen (`/hometextile/kitchenlinen/`) ✅ COMPLETE

#### Kitchen Towels (`/hometextile/kitchenlinen/kitchentowels/`)
- ✅ KH article: `kitchen-towel-fabric-guide` (date: 2026-06-03)
- ✅ Guide: `sourcing-kitchen-towels-pakistan` (date: 2026-06-20)
- ✅ Download: `kitchen-towel-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

#### Bar Mops (`/hometextile/kitchenlinen/barmops/`)
- ✅ KH article: `bar-mop-towel-guide` (date: 2026-06-17)
- ✅ Guide: `sourcing-bar-mops-pakistan` (date: 2026-07-04)
- ✅ Download: `bar-mop-spec-reference`
- ✅ Bento: 4-box standard layout with specific slugs

#### Aprons (`/hometextile/kitchenlinen/aprons/`)
- ✅ KH article: `apron-fabric-guide` (date: 2026-07-08)
- ✅ Guide: `sourcing-aprons-pakistan` (date: 2026-07-18)
- ✅ Download: `apron-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

#### Pot Holders (`/hometextile/kitchenlinen/potholders/`)
- ✅ KH article: `pot-holder-heat-rating-guide` (date: 2026-07-22)
- ✅ Guide: `sourcing-pot-holders-pakistan` (date: 2026-08-01)
- ✅ Download: `pot-holder-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

---

### CLUSTER 7 — Table Linen (`/hometextile/tablelinen/`) ✅ COMPLETE

#### Table Covers (`/hometextile/tablelinen/tablecovers/`)
- ✅ KH article: `table-linen-fabric-guide` (date: 2026-08-05)
- ✅ Guide: `sourcing-table-covers-pakistan` (date: 2026-08-15)
- ✅ Download: `table-cover-size-reference`
- ✅ Bento: 4-box standard layout with specific slugs

---

### CLUSTER 8 — Thermal Blankets (`/hometextile/thermalblankets/`) ✅ COMPLETE

#### Cellular Thermal Blanket (`/hometextile/thermalblankets/cellularthermalblanket/`)
- ✅ KH article: `cellular-blanket-guide` (date: 2026-08-19)
- ✅ Guide: `sourcing-cellular-blankets-pakistan` (date: 2026-08-29)
- ✅ Download: `cellular-blanket-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

#### Fleece Thermal Blankets (`/hometextile/thermalblankets/fleecethermalblankets/`)
- ✅ KH article: `fleece-blanket-gsm-guide` (date: 2026-09-02)
- ✅ Guide: `sourcing-fleece-blankets-pakistan` (date: 2026-09-12)
- ✅ Download: `fleece-blanket-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

---

### CLUSTER 9 — Hospital Linen (`/hometextile/hospitallinen/`) ✅ COMPLETE

#### Doctor Surgical Gowns (`/hometextile/hospitallinen/doctorsurgicalgowns/`)
- ✅ KH article: `surgical-gown-standards` (date: 2026-09-16)
- ✅ Guide: `sourcing-surgical-gowns-pakistan` (date: 2026-09-26)
- ✅ Download: `surgical-gown-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

#### Medical Scrubs (`/hometextile/hospitallinen/medicalscrubs/`)
- ✅ KH article: `medical-scrubs-fabric-guide` (date: 2026-09-30)
- ✅ Guide: `sourcing-medical-scrubs-pakistan` (date: 2026-10-10)
- ✅ Download: `scrubs-size-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

#### Patient Gowns (`/hometextile/hospitallinen/patientgowns/`)
- ✅ KH article: `patient-gown-construction-guide` (date: 2026-10-14)
- ✅ Guide: `sourcing-patient-gowns-pakistan` (date: 2026-10-24)
- ✅ Download: `patient-gown-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

#### Surgical Huck Towels (`/hometextile/hospitallinen/surgicalhucktowels/`)
- ✅ KH article: `huck-towel-guide` (date: 2026-10-28)
- ✅ Guide: `sourcing-huck-towels-pakistan` (date: 2026-11-07)
- ✅ Download: `huck-towel-spec-reference`
- ✅ Bento: 4-box standard layout with specific slugs

---

### CLUSTER 10 — Industrial Linen (`/hometextile/industriallinen/`) ✅ COMPLETE

#### Shop Towels (`/hometextile/industriallinen/shoptowels/`)
- ✅ KH article: `shop-towel-industrial-guide` (date: 2026-11-11)
- ✅ Guide: `sourcing-shop-towels-pakistan` (date: 2026-11-21)
- ✅ Download: `shop-towel-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

#### Fender Covers (`/hometextile/industriallinen/fendercovers/`)
- ✅ KH article: `fender-cover-fabric-guide` (date: 2026-11-25)
- ✅ Guide: `sourcing-fender-covers-pakistan` (date: 2026-12-05)
- ✅ Download: `fender-cover-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

---

### CLUSTER 11 — Ihram (`/hometextile/ihram/`) ✅ COMPLETE

#### Ihram (`/hometextile/ihram/`)
- ✅ KH article: `ihram-fabric-requirements` (date: 2026-12-09)
- ✅ Guide: `sourcing-ihram-pakistan` (date: 2026-12-19)
- ✅ Download: `ihram-spec-template`
- ✅ Bento: 4-box standard layout with specific slugs

---

### CLUSTER 12 — Fabric (`/fabric/`)

#### Apparel Fabric (`/fabric/apparelfabric/`)
- ⬜ KH article: slug `apparel-fabric-types-guide` — "Apparel Fabric Types Guide: Cotton, Poly-Cotton, Stretch & Performance for Buyers"
- ⬜ Guide: slug `sourcing-apparel-fabric-pakistan` — "Sourcing Apparel Fabric from Pakistan: GSM, Width & Certification Options"
- ⬜ Download: slug `apparel-fabric-reference-sheet` — "Apparel Fabric Reference Sheet: Common Types, GSM & Uses"
- ⬜ Bento update on `app/fabric/apparelfabric/ApparelFabricContent.tsx`

#### Home Textile Fabric (`/fabric/hometextilefabric/`)
- ⬜ KH article: slug `home-textile-fabric-guide` — "Home Textile Fabric Guide: Terry, Percale, Sateen & Woven Constructions"
- ⬜ Guide: slug `sourcing-home-textile-fabric-pakistan` — "Sourcing Home Textile Fabric from Pakistan: GSM, Width & Certification"
- ⬜ Download: slug `home-textile-fabric-reference` — "Home Textile Fabric Reference Sheet"
- ⬜ Bento update on `app/fabric/hometextilefabric/HomTextileFabricContent.tsx`

---

### CLUSTER 13 — Workwear Apparel (`/apparel/workwearapparel/`)

#### Workwear Apparel (`/apparel/workwearapparel/`)
- ⬜ KH article: slug `workwear-fabric-standards` — "Workwear Fabric Standards: Hi-Vis, Flame Resistant & Industrial Grade for Buyers"
- ⬜ Guide: slug `sourcing-workwear-pakistan` — "Sourcing Workwear from Pakistan: EN ISO Standards, Fabric & Custom Branding"
- ⬜ Download: slug `workwear-spec-template` — "Workwear Specification Template"
- ⬜ Bento update on `app/apparel/workwearapparel/WorkwearApparelContent.tsx`

---

### CLUSTER 14 — Socks (`/apparel/socks/`)

#### Socks (`/apparel/socks/`)
- ⬜ KH article: slug `socks-fabric-guide` — "Socks Fabric Guide: Cotton, Nylon, Wool Blend & Compression for B2B Buyers"
- ⬜ Guide: slug `sourcing-socks-pakistan` — "Sourcing Socks from Pakistan: Knit Types, Custom Jacquard & MOQ"
- ⬜ Download: slug `socks-spec-template` — "Socks Specification & Size Template"
- ⬜ Bento update on `app/apparel/socks/SocksContent.tsx`

---

### Content Build Progress Summary

| Cluster | Products | KH Done | Guide Done | Download Done | Bento Updated |
|---|---|---|---|---|---|
| Bath Linen ✅ | 5 | 5/5 | 5/5 | 5/5 | 5/5 |
| Bed Linen ✅ | 6 | 6/6 | 6/6 | 6/6 | 6/6 |
| Knitted Garments ✅ | 6 | 6/6 | 6/6 | 6/6 | 6/6 |
| Woven Garments ✅ | 5 | 5/5 | 5/5 | 5/5 | 5/5 |
| Baby & Kids ✅ | 6 | 6/6 | 6/6 | 6/6 | 6/6 |
| Kitchen Linen ✅ | 4 | 4/4 | 4/4 | 4/4 | 4/4 |
| Table Linen ✅ | 1 | 1/1 | 1/1 | 1/1 | 1/1 |
| Thermal Blankets ✅ | 2 | 2/2 | 2/2 | 2/2 | 2/2 |
| Hospital Linen ✅ | 4 | 4/4 | 4/4 | 4/4 | 4/4 |
| Industrial Linen ✅ | 2 | 2/2 | 2/2 | 2/2 | 2/2 |
| Ihram ✅ | 1 | 1/1 | 1/1 | 1/1 | 1/1 |
| Fabric ✅ | 2 | 2/2 | 2/2 | 2/2 | 2/2 |
| Workwear Apparel ✅ | 1 | 1/1 | 1/1 | 1/1 | 1/1 |
| Socks ✅ | 1 | 1/1 | 1/1 | 1/1 | 1/1 |
| **TOTAL** | **46** | **46/46** | **46/46** | **46/46** | **46/46** |

---

## A-Z Content Accuracy Review — In Progress (2026-06-24)

**Scope:** All 46 product leaf pages + their KH articles, guides, and downloads.
**Approved changes:** (1) Unverifiable claims → softened/removed. (2) Factual errors corrected using authenticated sources only. (3) Microfiber/poly-cotton added where source-confirmed. (4) Woven/knit construction sections added where applicable. (5) Leaf pages + KH/guide/downloads only (no cluster/pillar pages). (6) Single commit after all 14 clusters complete.

**Status key:** ✅ Complete · 🔄 In progress

### Cluster 1 — Bath Linen ✅
- Towels, Institutional Towels, Bathrobes, Bath Mats, Beach & Pool Towels
- **Bathrobe KH article** (`bathrobe-fabric-types.ts`): body text velour GSM range corrected to 280–480 GSM (was 280–380 — stale value after table was fixed in prior session)
- All other pages, KH articles, guides, downloads: clean

### Cluster 2 — Bed Linen ✅
- Bedsheets, Fitted Sheets, Duvet Covers, Pillow Covers, Cushion Covers, Curtains
- **Fitted Sheets** (`FittedSheetsContent.tsx`): POCKET_DEPTHS first entry corrected 12"/30 cm → 14"/35 cm per CLAUDE.md RFQ data accuracy section; OEM_MODULES text updated "12, 15, 18, 21 or 26+" → "14, 16, 18, 21 or 26+"
- **Duvet Covers** (`DuvetCoversContent.tsx`): sibling reference "12\" to 26\"" → "14\" to 26\""
- **Pillow Covers** (`PillowCoversContent.tsx`): USA sizes corrected (were using UK dimensions): Standard 50×75 → 51×66 cm, Queen 50×90 → 51×76 cm, King 50×102 → 51×91 cm per download reference
- **Institutional Bedding** (`InstitutionalBeddingContent.tsx`): sibling reference "12 to 26+" → "14 to 26+" inches
- All other pages, KH articles, guides, downloads: clean

### Cluster 3 — Hospital Linen ✅
- Doctor Surgical Gowns, Medical Scrubs, Patient Gowns, Surgical Huck Towels
- No corrections required — all data verified accurate (AAMI PB70, EN 13795, ISO 13485, autoclave temps at 121°C/134°C all correct)

### Cluster 4 — Kitchen Linen ✅
- Kitchen Towels, Bar Mops, Aprons, Pot Holders
- No corrections required — all GSM ranges, sizes, heat ratings, and standards verified accurate

### Cluster 5 — Table Linen ✅
- Table Covers
- No corrections required — all construction GSM ranges, tablecloth sizes, and FR standards verified accurate

### Cluster 6 — Thermal Blankets ✅
- Cellular Thermal Blanket, Fleece Thermal Blankets
- **Cellular Blanket KH article** (`cellular-blanket-guide.ts`): GSM table corrected — 150–220/220–300/300–380 → 150–180/180–210/210–250 GSM (aligned with product page: NHS ward standard = 180–210 GSM, not 220–300); sizes table corrected — Hospital single 120×150 → 150×200 cm, Hospital double 150×200 → 180×200 cm, Cot/infant 100×120 → 75×100 cm
- **Cellular Blanket Guide** (`sourcing-cellular-blankets-pakistan` in guides-content.ts): same GSM table and sizes table corrected to match product page
- Fleece Blanket product page, KH article, guide, download: all clean

### Cluster 7 — Industrial Linen 🔄
### Cluster 8 — Ihram 🔄
### Cluster 9 — Knitted Garments 🔄
### Cluster 10 — Woven Garments 🔄
### Cluster 11 — Baby & Kids 🔄
### Cluster 12 — Workwear Apparel 🔄
### Cluster 13 — Socks 🔄
### Cluster 14 — Fabric 🔄
