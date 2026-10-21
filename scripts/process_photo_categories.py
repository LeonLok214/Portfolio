from pathlib import Path
from PIL import Image, ImageOps
import json

ROOT = Path(r"Z:\DSH\Portfolio\_incoming\3.摄影作品")
OUT = Path(r"Z:\DSH\Portfolio\public\media\archive\photos")
DATA = Path(r"Z:\DSH\Portfolio\src\data\photos.js")

categories = [
    ("blue", "蓝色系", "Blue", "水、天空与光线", "1.蓝色系"),
    ("green", "绿色系", "Green", "植物与生长的纹理", "2.绿色系"),
    ("portrait", "人像", "Portrait", "人与人之间的距离", "3.人像"),
    ("landscape", "风光", "Landscape", "在路上的风景", "4.风光"),
    ("nature", "花鸟", "Nature", "季节、花鸟与自然细节", "5.花鸟"),
    ("human", "人文", "Human", "日常生活中的普通人", "6.人文"),
]

OUT.mkdir(parents=True, exist_ok=True)
js = ["// 由 scripts/process_photo_categories.py 自动生成", "export const photoCategories = ["]
all_count = 0
for cat_id, title, en, desc, folder_name in categories:
    folder = ROOT / folder_name
    files = sorted(
        p for p in folder.iterdir()
        if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
    )
    cat_out = OUT / cat_id
    cat_out.mkdir(parents=True, exist_ok=True)
    items = []
    for idx, src in enumerate(files, 1):
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            im.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            dest = cat_out / f"{cat_id}-{idx:02d}.jpg"
            im.save(dest, "JPEG", quality=82, optimize=True, progressive=True)
        items.append({
            "index": f"{idx:02d}",
            "title": f"{title} {idx:02d}",
            "src": f"/media/archive/photos/{cat_id}/{cat_id}-{idx:02d}.jpg",
        })
    all_count += len(items)
    js.append("  {")
    js.append(f"    id: {json.dumps(cat_id)},")
    js.append(f"    title: {json.dumps(title, ensure_ascii=False)},")
    js.append(f"    en: {json.dumps(en)},")
    js.append(f"    desc: {json.dumps(desc, ensure_ascii=False)},")
    js.append("    items: [")
    for item in items:
        js.append(
            "      { index: %s, title: %s, src: %s },"
            % (json.dumps(item["index"]), json.dumps(item["title"], ensure_ascii=False), json.dumps(item["src"]))
        )
    js.append("    ],")
    js.append("  },")
    print(f"{cat_id}: {len(items)}")
js.append("];")
js.append("")
DATA.write_text("\n".join(js), encoding="utf-8")
print("total", all_count)
