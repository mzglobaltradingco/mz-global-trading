import os

BASE = r"C:\Users\Asus\Desktop\mz-global-trading"


def make_nav(crumbs):
    parts = []
    for i, (label, href) in enumerate(crumbs):
        is_last = (i == len(crumbs) - 1)
        if i > 0:
            parts.append('              <span aria-hidden="true">&#x203A;</span>')
        if is_last:
            parts.append(f'              <span className="text-gold">{label}</span>')
        else:
            parts.append(
                f'              <Link href="{href}" className="hover:text-gold transition-colors">{label}</Link>'
            )
    inner = "\n".join(parts)
    return (
        '            <motion.nav aria-label="Breadcrumb" '
        'initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} '
        'transition={{ duration: 0.4 }} '
        'className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">\n'
        + inner
        + "\n            </motion.nav>\n"
    )


FILES = {
    # Baby hooded towels (typo fix)
    "app/apparel/babyandkids/babyhoodedtowels/BabyHoodedTowelsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Baby & Kids", "/apparel/babyandkids/"), ("Baby Hooded Towels", None)
    ]),
    # Apparel pillar
    "app/apparel/ApparelContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", None)
    ]),
    # Hometextile pillar
    "app/hometextile/HometextileContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", None)
    ]),
    # Hometextile cluster pages missed in first run
    "app/hometextile/tablelinen/TableLinenContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Table Linen", None)
    ]),
    "app/hometextile/thermalblankets/ThermalBlanketsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Thermal Blankets", None)
    ]),
    "app/hometextile/hospitallinen/HospitalLinenContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Hospital Linen", None)
    ]),
    "app/hometextile/industriallinen/IndustrialLinenContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Industrial Linen", None)
    ]),
    # Hometextile leaf pages missed in first run
    "app/hometextile/tablelinen/tablecovers/TableCoversContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Table Linen", "/hometextile/tablelinen/"), ("Table Covers", None)
    ]),
    "app/hometextile/thermalblankets/cellularthermalblanket/CellularThermalBlanketContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Thermal Blankets", "/hometextile/thermalblankets/"), ("Cellular Thermal Blanket", None)
    ]),
    "app/hometextile/thermalblankets/fleecethermalblankets/FleeceThermalBlanketsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Thermal Blankets", "/hometextile/thermalblankets/"), ("Fleece Thermal Blankets", None)
    ]),
    "app/hometextile/hospitallinen/doctorsurgicalgowns/DoctorSurgicalGownsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Hospital Linen", "/hometextile/hospitallinen/"), ("Doctor Surgical Gowns", None)
    ]),
    "app/hometextile/hospitallinen/medicalscrubs/MedicalScrubsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Hospital Linen", "/hometextile/hospitallinen/"), ("Medical Scrubs", None)
    ]),
    "app/hometextile/hospitallinen/patientgowns/PatientGownsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Hospital Linen", "/hometextile/hospitallinen/"), ("Patient Gowns", None)
    ]),
    "app/hometextile/hospitallinen/surgicalhucktowels/SurgicalHuckTowelsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Hospital Linen", "/hometextile/hospitallinen/"), ("Surgical Huck Towels", None)
    ]),
    "app/hometextile/industriallinen/shoptowels/ShopTowelsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Industrial Linen", "/hometextile/industriallinen/"), ("Shop Towels", None)
    ]),
    "app/hometextile/industriallinen/fendercovers/FenderCoversContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Industrial Linen", "/hometextile/industriallinen/"), ("Fender Covers", None)
    ]),
    "app/hometextile/bedlinen/institutionalbedding/InstitutionalBeddingContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bed Linen", "/hometextile/bedlinen/"), ("Institutional Bedding", None)
    ]),
}

edited = []
skipped = []

for rel_path, nav_html in FILES.items():
    full_path = os.path.join(BASE, rel_path.replace("/", os.sep))
    if not os.path.exists(full_path):
        skipped.append(f"MISSING: {rel_path}")
        continue

    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    if 'aria-label="Breadcrumb"' in content:
        skipped.append(f"ALREADY HAS BREADCRUMB: {rel_path}")
        continue

    idx = content.find('className="text-gold text-xs font-semibold tracking')
    if idx == -1:
        idx = content.find("className='text-gold text-xs font-semibold tracking")

    if idx == -1:
        skipped.append(f"NO ANCHOR FOUND: {rel_path}")
        continue

    search_from = max(0, idx - 600)
    segment = content[search_from:idx + 100]
    mp_pos = segment.rfind("<motion.p")
    if mp_pos == -1:
        skipped.append(f"NO motion.p FOUND: {rel_path}")
        continue

    abs_mp_pos = search_from + mp_pos
    new_content = content[:abs_mp_pos] + nav_html + content[abs_mp_pos:]

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    edited.append(rel_path)

print(f"EDITED {len(edited)} files:")
for p in edited:
    print(f"  + {p}")
if skipped:
    print(f"\nSKIPPED {len(skipped)}:")
    for p in skipped:
        print(f"  - {p}")
