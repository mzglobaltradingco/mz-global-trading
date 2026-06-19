import os
import re

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
    "app/apparel/knittedgarments/KnittedGarmentsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Knitted Garments", None)
    ]),
    "app/apparel/wovengarments/WovenGarmentsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Woven Garments", None)
    ]),
    "app/apparel/babyandkids/BabyAndKidsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Baby & Kids", None)
    ]),
    "app/apparel/knittedgarments/henleyshirts/HenleyContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Knitted Garments", "/apparel/knittedgarments/"), ("Henley Shirts", None)
    ]),
    "app/apparel/knittedgarments/poloshirts/PoloContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Knitted Garments", "/apparel/knittedgarments/"), ("Polo Shirts", None)
    ]),
    "app/apparel/knittedgarments/sweatshirtshoodies/HoodiesContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Knitted Garments", "/apparel/knittedgarments/"), ("Sweatshirts & Hoodies", None)
    ]),
    "app/apparel/knittedgarments/sweatpantsjoggers/SweatpantsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Knitted Garments", "/apparel/knittedgarments/"), ("Sweatpants & Joggers", None)
    ]),
    "app/apparel/knittedgarments/tanktops/TankTopsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Knitted Garments", "/apparel/knittedgarments/"), ("Tank Tops", None)
    ]),
    "app/apparel/socks/SocksContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Socks", None)
    ]),
    "app/apparel/workwearapparel/WorkwearContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Workwear Apparel", None)
    ]),
    "app/apparel/wovengarments/denimjeans/DenimJeansContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Woven Garments", "/apparel/wovengarments/"), ("Denim Jeans", None)
    ]),
    "app/apparel/wovengarments/formalcasualshirts/FormalShirtsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Woven Garments", "/apparel/wovengarments/"), ("Formal & Casual Shirts", None)
    ]),
    "app/apparel/wovengarments/pantsandtrousers/PantsTrousersContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Woven Garments", "/apparel/wovengarments/"), ("Pants & Trousers", None)
    ]),
    "app/apparel/wovengarments/cargopants/CargoPantsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Woven Garments", "/apparel/wovengarments/"), ("Cargo Pants", None)
    ]),
    "app/apparel/wovengarments/shorts/ShortsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Woven Garments", "/apparel/wovengarments/"), ("Shorts", None)
    ]),
    "app/apparel/babyandkids/overalls/OverallsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Baby & Kids", "/apparel/babyandkids/"), ("Overalls", None)
    ]),
    "app/apparel/babyandkids/swaddlemuslinfabric/SwaddleMuslinContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Baby & Kids", "/apparel/babyandkids/"), ("Swaddle Muslin Fabric", None)
    ]),
    "app/apparel/babyandkids/tshirtsforkids/TShirtsForKidsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Baby & Kids", "/apparel/babyandkids/"), ("T-Shirts for Kids", None)
    ]),
    "app/apparel/babyandkids/babyrompers/BabyRompersContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Baby & Kids", "/apparel/babyandkids/"), ("Baby Rompers", None)
    ]),
    "app/apparel/babyandkids/babybibs/BabyBibsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Baby & Kids", "/apparel/babyandkids/"), ("Baby Bibs", None)
    ]),
    "app/apparel/babyandkids/babyhooodedtowels/BabyHoodedTowelsContent.tsx": make_nav([
        ("Home", "/"), ("Apparel", "/apparel/"), ("Baby & Kids", "/apparel/babyandkids/"), ("Baby Hooded Towels", None)
    ]),
    "app/hometextile/bathlinen/BathLinenContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bath Linen", None)
    ]),
    "app/hometextile/bedlinen/BedLinenContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bed Linen", None)
    ]),
    "app/hometextile/kitchenlinen/KitchenLinenContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Kitchen Linen", None)
    ]),
    "app/hometextile/bathlinen/towels/TowelsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bath Linen", "/hometextile/bathlinen/"), ("Towels", None)
    ]),
    "app/hometextile/bathlinen/institutionaltowels/InstitutionalTowelsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bath Linen", "/hometextile/bathlinen/"), ("Institutional Towels", None)
    ]),
    "app/hometextile/bathlinen/bathrobes/BathrobesContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bath Linen", "/hometextile/bathlinen/"), ("Bathrobes", None)
    ]),
    "app/hometextile/bathlinen/bathmats/BathMatsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bath Linen", "/hometextile/bathlinen/"), ("Bath Mats", None)
    ]),
    "app/hometextile/bathlinen/beachpooltowel/BeachTowelsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bath Linen", "/hometextile/bathlinen/"), ("Beach & Pool Towels", None)
    ]),
    "app/hometextile/bedlinen/bedsheets/BedsheetContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bed Linen", "/hometextile/bedlinen/"), ("Bedsheets", None)
    ]),
    "app/hometextile/bedlinen/fittedsheets/FittedSheetsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bed Linen", "/hometextile/bedlinen/"), ("Fitted Sheets", None)
    ]),
    "app/hometextile/bedlinen/duvetcovers/DuvetCoversContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bed Linen", "/hometextile/bedlinen/"), ("Duvet Covers", None)
    ]),
    "app/hometextile/bedlinen/pillowcovers/PillowCoversContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bed Linen", "/hometextile/bedlinen/"), ("Pillow Covers", None)
    ]),
    "app/hometextile/bedlinen/cushioncovers/CushionCoversContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bed Linen", "/hometextile/bedlinen/"), ("Cushion Covers", None)
    ]),
    "app/hometextile/bedlinen/curtains/CurtainsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Bed Linen", "/hometextile/bedlinen/"), ("Curtains", None)
    ]),
    "app/hometextile/kitchenlinen/kitchentowels/KitchenTowelsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Kitchen Linen", "/hometextile/kitchenlinen/"), ("Kitchen Towels", None)
    ]),
    "app/hometextile/kitchenlinen/barmops/BarMopsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Kitchen Linen", "/hometextile/kitchenlinen/"), ("Bar Mops", None)
    ]),
    "app/hometextile/kitchenlinen/aprons/ApronsContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Kitchen Linen", "/hometextile/kitchenlinen/"), ("Aprons", None)
    ]),
    "app/hometextile/kitchenlinen/potholders/PotHoldersContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Kitchen Linen", "/hometextile/kitchenlinen/"), ("Pot Holders", None)
    ]),
    "app/hometextile/ihram/IhramContent.tsx": make_nav([
        ("Home", "/"), ("Home Textiles", "/hometextile/"), ("Ihram", None)
    ]),
    "app/fabric/apparelfabric/ApparelFabricContent.tsx": make_nav([
        ("Home", "/"), ("Fabric", "/fabric/"), ("Apparel Fabric", None)
    ]),
    "app/fabric/hometextilefabric/HomeTextileFabricContent.tsx": make_nav([
        ("Home", "/"), ("Fabric", "/fabric/"), ("Home Textile Fabric", None)
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
