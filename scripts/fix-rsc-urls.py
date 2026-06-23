"""
Post-build script: copy RSC __PAGE__.txt files to dot-notation paths.

Next.js 16 static export places RSC payloads at:
  out/<page>/__next.<page>/__PAGE__.txt   (directory structure, slash-separated)

But the client-side router requests them at:
  /<page>/__next.<page-with-dots>.__PAGE__.txt  (dot-separated)

This script creates a flat copy at the expected URL path so Cloudflare Pages
can serve them, eliminating the 404 console errors that drop Best Practices.
"""

import shutil
from pathlib import Path

out_dir = Path("out")
created = 0
skipped = 0

for page_txt in sorted(out_dir.rglob("__PAGE__.txt")):
    parts = page_txt.parts
    next_idx = next((i for i, p in enumerate(parts) if p.startswith("__next.")), None)
    if next_idx is None:
        skipped += 1
        continue

    page_dir = Path(*parts[:next_idx])
    next_parts = parts[next_idx:-1]  # everything between __next.* dir and __PAGE__.txt
    dot_name = ".".join(next_parts) + ".__PAGE__.txt"
    target = page_dir / dot_name

    if not target.exists():
        shutil.copy2(page_txt, target)
        created += 1
        print(f"  + {target.relative_to(out_dir)}")

print(f"\nDone: {created} dot-notation RSC files created, {skipped} skipped.")
