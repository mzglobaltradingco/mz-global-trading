#!/usr/bin/env python3
"""
check-page.py — SEO pre-flight checker for new page.tsx files.

Usage:
  python scripts/check-page.py app/section/page-name/page.tsx
  python scripts/check-page.py app/section/page-name/   (scans entire dir)
"""

import sys, re, os, glob

def check(path):
    if os.path.isdir(path):
        pages = glob.glob(path.rstrip('/\\') + '/page.tsx')
        if not pages:
            print('No page.tsx found in', path)
            return
        path = pages[0]

    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        raw = f.read()

    issues = []
    warnings = []

    # ── Title ──────────────────────────────────────────────────────────────
    title_m = re.search(r'title:\s*["\'](.+?)["\']', raw)
    if not title_m:
        issues.append('MISSING title')
    else:
        t = title_m.group(1)
        if len(t) > 60:
            issues.append(f'title too long ({len(t)} chars, max 60): {t}')
        if 'MZ Global Trading' not in t:
            warnings.append('title missing "MZ Global Trading"')

    # ── Description ────────────────────────────────────────────────────────
    desc_m = re.search(r'description:\s*\n?\s*["\'](.+?)["\']', raw, re.DOTALL)
    if not desc_m:
        issues.append('MISSING description')
    else:
        d = re.sub(r'\s+', ' ', desc_m.group(1)).strip()
        if len(d) < 130:
            issues.append(f'description too short ({len(d)} chars, min 130): {d[:60]}...')
        elif len(d) > 160:
            issues.append(f'description too long ({len(d)} chars, max 160): {d[:60]}...')

    # ── Canonical ──────────────────────────────────────────────────────────
    if 'canonical:' not in raw:
        issues.append('MISSING canonical')
    else:
        canon_m = re.search(r'canonical:\s*["\'](.+?)["\']', raw)
        if canon_m and not canon_m.group(1).endswith('/'):
            issues.append(f'canonical missing trailing slash: {canon_m.group(1)}')

    # ── hreflang ───────────────────────────────────────────────────────────
    if '"en":' not in raw and "'en':" not in raw:
        issues.append('MISSING hreflang (languages block with "en" and "x-default")')
    if 'x-default' not in raw:
        issues.append('MISSING hreflang x-default')

    # ── OpenGraph ──────────────────────────────────────────────────────────
    if 'openGraph:' not in raw:
        issues.append('MISSING openGraph block')
    else:
        if 'og/' not in raw and 'openGraph' in raw:
            warnings.append('openGraph image may be missing (no /images/og/ path found)')

    # ── Twitter card ───────────────────────────────────────────────────────
    if 'twitter:' not in raw:
        issues.append('MISSING twitter card block')
    if 'summary_large_image' not in raw:
        issues.append('twitter card type must be summary_large_image')

    # ── JSON-LD ────────────────────────────────────────────────────────────
    if 'application/ld+json' not in raw:
        issues.append('MISSING JSON-LD schema script tag')
    if 'FAQPage' not in raw:
        warnings.append('No FAQPage schema — add if page has an FAQ section')
    if 'BreadcrumbList' not in raw:
        warnings.append('No BreadcrumbList in schema — recommended for product/section pages')

    # ── Private label ──────────────────────────────────────────────────────
    if re.search(r'private\s+label', raw, re.IGNORECASE):
        issues.append('FORBIDDEN: "private label" found — replace with OEM/custom specifications')

    # ── main id ────────────────────────────────────────────────────────────
    if 'id="main-content"' not in raw:
        issues.append('MISSING id="main-content" on <main>')

    # ── MegaMenu + Footer ──────────────────────────────────────────────────
    if 'MegaMenu' not in raw:
        issues.append('MISSING MegaMenu import/usage')
    if 'Footer' not in raw:
        issues.append('MISSING Footer import/usage')

    # ── Print results ──────────────────────────────────────────────────────
    print(f'\nChecking: {path}')
    print('-' * 60)
    if not issues and not warnings:
        print('ALL CHECKS PASSED')
    else:
        if issues:
            print(f'ISSUES ({len(issues)} -- must fix before publishing):')
            for i in issues:
                print(f'  [X] {i}')
        if warnings:
            print(f'WARNINGS ({len(warnings)} -- review):')
            for w in warnings:
                print(f'  [!] {w}')
    print()
    return len(issues)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python scripts/check-page.py <path-to-page.tsx-or-dir>')
        sys.exit(1)
    total = 0
    for arg in sys.argv[1:]:
        result = check(arg)
        if result:
            total += result
    sys.exit(1 if total else 0)
