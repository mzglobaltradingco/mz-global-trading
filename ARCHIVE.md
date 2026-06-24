# MZ Global Trading — Historical Archive

> This file contains historical records removed from CLAUDE.md during the 2026-06-24 cleanup. Not needed for daily work, but kept for reference.

---

## PageSpeed Insights Audit — 2026-06-23

**Tool:** Google PSI API v5 (`scripts/pagespeed_audit.py`)
**API key:** `AIzaSyD5AdFuKeQvFABN-ttxixrtbYPbtYZgnms`
**URL tested:** `https://mz-global-trading.pages.dev/apparel/knittedgarments/tshirts/`

### Scores at Audit Time
| Category | Mobile | Desktop |
|---|---|---|
| Performance | 71 | 93 |
| Accessibility | 96 | 96 |
| SEO | 100 | 100 |
| Best Practices | 96 | 96 |

### Core Web Vitals at Audit Time
| Metric | Mobile | Desktop |
|---|---|---|
| LCP | 6.5s | 1.6s |
| FCP | 3.1s | 0.8s |
| CLS | 0 | 0 |
| TBT | 0ms | 30ms |

### All 9 Issues Found and Their Resolutions
1. **Logo unsized `<img>`** → Added `width={220} height={106}` to MegaMenu logo — ✅ Fixed
2. **RSC prefetch 404s** → Added `prefetch={false}` to all MegaMenu nav `<Link>` tags — ✅ Fixed
3. **GA4 blocking render** → Changed `strategy="lazyOnload"` in `app/layout.tsx`. Note: PSI mislabels GA4 as "GTM" because both share `googletagmanager.com` CDN. `gtag/js?id=G-BEG0E64X9E` is GA4, NOT GTM. — ✅ Fixed
4. **Legacy JS polyfills 14 KiB** → Updated `browserslist` in `package.json` to last 2 versions of Chrome/Firefox/Safari/Edge — ✅ Fixed
5. **Cert images oversized** → Resized to 280×160px using Pillow, same filenames — ✅ Fixed
6. **Color contrast failures** → Gold labels on white `#D4A017` → `#9A6400`; gray text `text-gray-400` → `text-gray-500` — ✅ Fixed
7. **Logo file oversized** → Resized header logo to 440×212px (2× retina) using Pillow — ✅ Fixed
8. **Render-blocking CSS chunks** → Inherent to Next.js static export; no action possible — ✋ Accepted
9. **High main-thread work** → Inherent Framer Motion cost; TBT 0ms/30ms is acceptable — ✋ Accepted

---

## Image Compression Run — 2026-06-23

All content images compressed with Pillow WebP encoder. Total savings: ~8.7 MB.

| Folder | Files | Quality | Before | After | Saved |
|---|---|---|---|---|---|
| `public/images/hero/` | 78 | 50 | 9,213 KB | 5,749 KB | 3,464 KB (38%) |
| `public/images/og/` | 80 | 70 | 10,484 KB | 5,898 KB | 4,586 KB (44%) |
| `public/images/cards/` | 3 | 60 | 411 KB | 262 KB | 149 KB (36%) |
| `public/images/menu/` | 67 | 50 | 1,054 KB | 562 KB | 492 KB (47%) |

---

## Content Accuracy Review — Corrections Made (2026-06-24)

All 46 product leaf pages audited. Corrections below are already applied to the codebase.

### Bath Linen
- **Towels:** Gym towel 50×100 → 70×130 cm; Bath sheet 90×150 → 90×180 cm; Luxury GSM 550–650 → 550–700; 5-star GSM "550–650" → "600–700"; KH/Guide/Download GSM tables corrected
- **Institutional Towels:** KH 5-star GSM "550–600 min" → "600–700 min"; dobby border life claim softened; Guide/Download hand towel 50×100 → 40×70 cm
- **Bathrobes:** KH velour GSM "280–380" → "280–480"
- **Bath Mats:** Large mat 60×100 → 60×90 cm; KH tufted terry intro "600 GSM" → "1,000 GSM"; KH 5-star spec corrected to "1,000–1,200 GSM standard hotel / 1,200–1,400 GSM 5-star"
- **Beach & Pool Towels:** Standard size 75×150 → 70×140 cm

### Bed Linen
- **Bedsheets:** Twin 96×183 → 96×190 cm; King 183×203 → 193×203 cm
- **Fitted Sheets:** POCKET_DEPTHS first entry 12"/30 cm → 14"/35 cm; sequence 14→16→18→21→25"+; sibling references in DuvetCovers/PillowCovers/InstitutionalBedding updated
- **Pillow Covers:** USA sizes corrected from UK dimensions: Standard 51×66 cm, Queen 51×76 cm, King 51×91 cm
- **Bathrobe KH article:** Velour body text corrected to 280–480 GSM

### Hospital Linen — No corrections (all data accurate)
### Kitchen Linen — No corrections
### Table Linen — No corrections

### Thermal Blankets
- **Cellular Blanket KH:** GSM table 150–220/220–300/300–380 → 150–180/180–210/210–250; hospital single 120×150 → 150×200 cm; double 150×200 → 180×200 cm; cot/infant 100×120 → 75×100 cm
- **Cellular Blanket Guide:** Same GSM and size corrections

### Industrial Linen — No corrections
### Ihram — No corrections (warp-knit confirmed accurate)

### Knitted Garments
- **Sweatshirts & Hoodies:** Guide French terry 260–380 → 300–400 GSM; brushed fleece 280–380 → 340–420 GSM

### Woven Garments
- **Shorts:** KH chino GSM 220–280 → 200–260; linen GSM 180–240 → 160–200

### Baby & Kids
- **Swaddle Muslin:** KH double gauze GSM 140–160/160–200 → 110–130/130–160; swaddle size 70×70 → 100×100 cm; Guide sizing corrected; bamboo ratio 50/50 → 70/30
- **Overalls:** GSM_TIERS oz/GSM conversions corrected (were ~40% too low; 1 oz = 33.9 GSM)

### Workwear Apparel — No corrections
### Socks — No corrections

### Fabric
- **Apparel Fabric KH:** Single jersey 120–220 → 120–200; interlock 180–280 → 160–280; French terry 240–320 → 260–400; denim oz/GSM 280–490 → 271–475
- **Home Textile Fabric KH + Guide:** Terry upper bound 800 → 700 GSM; "luxury spa" 700–800 tier removed

---

## Content Build Plan — Per-Product Slug Index

All 46/46 complete. Slugs listed for reference.

### Bath Linen
| Product | KH slug | Guide slug | Download slug |
|---|---|---|---|
| Towels | `terry-towel-gsm-guide` | `how-to-source-towels-pakistan` | `towel-specification-sheet` |
| Institutional Towels | `institutional-towel-standards` | `bulk-institutional-towel-sourcing` | `institutional-towel-tech-pack` |
| Bathrobes | `bathrobe-fabric-types` | `hotel-bathrobe-sourcing-guide` | `bathrobe-customisation-checklist` |
| Bath Mats | `bath-mat-construction-guide` | `sourcing-bath-mats-pakistan` | `bath-mat-size-weight-reference` |
| Beach & Pool Towels | `beach-towel-print-techniques` | `beach-pool-towel-sourcing-guide` | `beach-towel-artwork-spec-template` |

### Bed Linen
| Product | KH slug | Guide slug | Download slug |
|---|---|---|---|
| Bedsheets | `bedsheet-thread-count-guide` | `sourcing-bedsheets-pakistan` | `bedsheet-size-chart-international` |
| Fitted Sheets | `fitted-sheet-pocket-depth-guide` | `hotel-fitted-sheet-sourcing` | `fitted-sheet-measurement-template` |
| Duvet Covers | `duvet-cover-closure-types` | `sourcing-duvet-covers-pakistan` | `duvet-cover-spec-order-sheet` |
| Pillow Covers | `pillow-cover-fabric-guide` | `custom-pillow-cover-sourcing` | `pillow-cover-size-reference` |
| Cushion Covers | `cushion-cover-filling-guide` | `decorative-cushion-cover-sourcing` | `cushion-cover-artwork-brief-template` |
| Curtains | `curtain-fabric-guide` | `sourcing-curtains-pakistan` | `curtain-measurement-order-template` |

### Knitted Garments
| Product | KH slug | Guide slug | Download slug |
|---|---|---|---|
| T-Shirts | `tshirt-fabric-weight-guide` | `custom-tshirt-sourcing-pakistan` | `tshirt-size-spec-template` |
| Polo Shirts | `polo-shirt-pique-guide` | `polo-shirt-sourcing-pakistan` | `polo-shirt-spec-template` |
| Henley Shirts | `henley-shirt-construction-guide` | `sourcing-henley-shirts-pakistan` | `henley-shirt-measurement-sheet` |
| Sweatshirts & Hoodies | `fleece-fabric-guide` | `hoodie-sweatshirt-sourcing-pakistan` | `hoodie-spec-template` |
| Sweatpants & Joggers | `jogger-waistband-guide` | `sourcing-joggers-sweatpants-pakistan` | `jogger-size-spec-template` |
| Tank Tops | `tank-top-fabric-guide` | `tank-top-sourcing-pakistan` | `tank-top-measurement-template` |

### Woven Garments
| Product | KH slug | Guide slug | Download slug |
|---|---|---|---|
| Denim Jeans | `denim-weight-guide` | `sourcing-denim-jeans-pakistan` | `denim-jeans-spec-template` |
| Formal & Casual Shirts | `dress-shirt-fabric-guide` | `formal-casual-shirt-sourcing-pakistan` | `shirt-spec-grading-template` |
| Pants & Trousers | `trouser-fabric-guide` | `pants-trousers-sourcing-pakistan` | `trouser-measurement-template` |
| Cargo Pants | `cargo-pants-construction-guide` | `sourcing-cargo-pants-pakistan` | `cargo-pants-spec-template` |
| Shorts | `shorts-fabric-guide` | `sourcing-shorts-pakistan` | `shorts-size-spec-template` |

### Baby & Kids
| Product | KH slug | Guide slug | Download slug |
|---|---|---|---|
| T-Shirts for Kids | `kids-apparel-safety-standards` | `kids-tshirt-sourcing-pakistan` | `kids-size-chart-template` |
| Swaddle Muslin | `muslin-swaddle-fabric-guide` | `sourcing-swaddle-muslin-pakistan` | `swaddle-blanket-spec-template` |
| Overalls | `baby-overalls-construction-guide` | `sourcing-baby-overalls-pakistan` | `baby-overalls-size-spec-template` |
| Baby Rompers | `baby-romper-fabric-guide` | `sourcing-baby-rompers-pakistan` | `baby-romper-spec-template` |
| Baby Bibs | `baby-bib-construction-guide` | `sourcing-baby-bibs-pakistan` | `baby-bib-spec-template` |
| Baby Hooded Towels | `baby-hooded-towel-guide` | `sourcing-baby-hooded-towels-pakistan` | `baby-hooded-towel-spec-template` |

### Kitchen Linen
| Product | KH slug | Guide slug | Download slug |
|---|---|---|---|
| Kitchen Towels | `kitchen-towel-fabric-guide` | `sourcing-kitchen-towels-pakistan` | `kitchen-towel-spec-template` |
| Bar Mops | `bar-mop-towel-guide` | `sourcing-bar-mops-pakistan` | `bar-mop-spec-reference` |
| Aprons | `apron-fabric-guide` | `sourcing-aprons-pakistan` | `apron-spec-template` |
| Pot Holders | `pot-holder-heat-rating-guide` | `sourcing-pot-holders-pakistan` | `pot-holder-spec-template` |

### Other Clusters
| Product | KH slug | Guide slug | Download slug |
|---|---|---|---|
| Table Covers | `table-linen-fabric-guide` | `sourcing-table-covers-pakistan` | `table-cover-size-reference` |
| Cellular Thermal Blanket | `cellular-blanket-guide` | `sourcing-cellular-blankets-pakistan` | `cellular-blanket-spec-template` |
| Fleece Thermal Blankets | `fleece-blanket-gsm-guide` | `sourcing-fleece-blankets-pakistan` | `fleece-blanket-spec-template` |
| Doctor Surgical Gowns | `surgical-gown-standards` | `sourcing-surgical-gowns-pakistan` | `surgical-gown-spec-template` |
| Medical Scrubs | `medical-scrubs-fabric-guide` | `sourcing-medical-scrubs-pakistan` | `scrubs-size-spec-template` |
| Patient Gowns | `patient-gown-construction-guide` | `sourcing-patient-gowns-pakistan` | `patient-gown-spec-template` |
| Surgical Huck Towels | `huck-towel-guide` | `sourcing-huck-towels-pakistan` | `huck-towel-spec-reference` |
| Shop Towels | `shop-towel-industrial-guide` | `sourcing-shop-towels-pakistan` | `shop-towel-spec-template` |
| Fender Covers | `fender-cover-fabric-guide` | `sourcing-fender-covers-pakistan` | `fender-cover-spec-template` |
| Ihram | `ihram-fabric-requirements` | `sourcing-ihram-pakistan` | `ihram-spec-template` |
| Apparel Fabric | `apparel-fabric-types-guide` | `sourcing-apparel-fabric-pakistan` | `apparel-fabric-reference-sheet` |
| Home Textile Fabric | `home-textile-fabric-guide` | `sourcing-home-textile-fabric-pakistan` | `home-textile-fabric-reference` |
| Workwear Apparel | `workwear-fabric-standards` | `sourcing-workwear-pakistan` | `workwear-spec-template` |
| Socks | `socks-fabric-guide` | `sourcing-socks-pakistan` | `socks-spec-template` |

---

## Removed Redirect — 2026-06-24

`/how-we-source/ → /ourprocess/` was removed from `public/_redirects`. Grep confirmed zero internal or external references to `/how-we-source/` anywhere in the codebase.

---

## Tech Stack History

- Upgraded from Next.js v14.2.35 (EOL Oct 2025) to v16.2.9 on 2026-06-22
- v14 was EOL; v16 is current stable
- Do NOT downgrade to v15 — upgrade path is v16 → v17 when v17 stabilises (est. 2027)
