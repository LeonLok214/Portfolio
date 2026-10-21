from pathlib import Path
from PIL import Image
import re
root = Path(r"Z:\DSH\Portfolio")
photo_root = root / "public" / "media" / "archive" / "photos"
thumb_root = photo_root / "thumbs"
for cat in ["blue", "green", "portrait", "landscape", "nature", "human"]:
    src_dir = photo_root / cat
    out_dir = thumb_root / cat
    out_dir.mkdir(parents=True, exist_ok=True)
    for src in sorted(src_dir.glob("*.jpg")):
        with Image.open(src) as im:
            im = im.convert("RGB")
            im.thumbnail((760, 760), Image.Resampling.LANCZOS)
            im.save(out_dir / src.name, "JPEG", quality=78, optimize=True, progressive=True)
    print(cat, len(list(out_dir.glob('*.jpg'))))
photos_js = root / "src" / "data" / "photos.js"
text = photos_js.read_text(encoding="utf-8")
def repl(match):
    path = match.group(1)
    if 'thumb:' in match.group(0):
        return match.group(0)
    parts = path.split('/')
    # /media/archive/photos/<cat>/<file>
    cat = parts[-2]
    file = parts[-1]
    return f'{match.group(0)}, thumb: "/media/archive/photos/thumbs/{cat}/{file}"'
text, n = re.subn(r'src: "(/media/archive/photos/[a-z]+/[^"]+)"', repl, text)
photos_js.write_text(text, encoding="utf-8")
print("thumbs inserted", n)
