from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import numpy as np

SRC = Path(r"Z:\DSH\Portfolio\_incoming\5.成就")
OUT = Path(r"Z:\DSH\Portfolio\public\media\achievements")
OUT.mkdir(parents=True, exist_ok=True)

FONT_REG = r"C:\Windows\Fonts\msyh.ttc"
FONT_BOLD = r"C:\Windows\Fonts\msyhbd.ttc"
FONT_SERIF = r"C:\Windows\Fonts\simsun.ttc"


def font(size, bold=False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size)


# 1) Rural practice award — rotate upright, crop to certificate, keep color.
rural = ImageOps.exif_transpose(Image.open(SRC / "三下乡社会实践一等奖.jpg")).convert("RGB")
rural = rural.rotate(90, expand=True)
rural = rural.crop((120, 50, 1850, 1010))
rural.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
rural.save(OUT / "rural-award.jpg", "JPEG", quality=88, optimize=True, progressive=True)
print("rural", rural.size)

# 2) English drama certificate — title detail only. Names and other people's
# personal information are intentionally not included in the public crop.
english = ImageOps.exif_transpose(Image.open(SRC / "英语课本剧大赛三等奖.jpg")).convert("RGB")
english = english.rotate(90, expand=True)
detail = english.crop((250, 150, 1480, 560))
detail.thumbnail((1400, 600), Image.Resampling.LANCZOS)
canvas = Image.new("RGB", (1600, 900), "#e9e5da")
draw = ImageDraw.Draw(canvas)
draw.text((72, 66), "CERTIFICATE DETAIL / 2024", font=font(20), fill="#777b70")
detail_x = (1600 - detail.width) // 2
detail_y = 170
canvas.paste(detail, (detail_x, detail_y))
draw.text((72, 760), "英语课本剧大赛 · 优胜奖", font=font(34, True), fill="#191a16")
draw.text((72, 815), "其他个人信息已隐藏 / PRIVACY REDACTED", font=font(17), fill="#777b70")
canvas.save(OUT / "english-award.jpg", "JPEG", quality=88, optimize=True, progressive=True)
print("english", detail.size)

# 3) Project approval — use only the project-name/type cells from the official
# list, no student names or student numbers, and compose a clean proof excerpt.
project = Image.open(SRC / "校级项目立项.png").convert("RGB")
arr = np.array(project)
mask = (arr[:, :, 0] > 220) & (arr[:, :, 1] > 220) & (arr[:, :, 2] < 140)
ys, xs = np.where(mask)
y0, y1 = int(ys.min()), int(ys.max())
row = project.crop((0, max(0, y0 - 4), 925, min(project.height, y1 + 5)))
row = row.resize((1500, int(row.height * 1500 / row.width)), Image.Resampling.LANCZOS)

canvas = Image.new("RGB", (1600, 900), "#efebe2")
draw = ImageDraw.Draw(canvas)
draw.text((72, 62), "PROJECT APPROVAL / 2025", font=font(19), fill="#5c711f")
draw.text((72, 115), "校级大学生创新创业训练项目", font=font(53, True), fill="#151612")
draw.text((72, 192), "大学生创业卷入与创业学习关系研究", font=font(30), fill="#33362f")
draw.line((72, 255, 1528, 255), fill="#c8c3b7", width=2)
draw.text((72, 292), "项目类型", font=font(17), fill="#777b70")
draw.text((220, 286), "创新训练项目", font=font(27), fill="#20211c")
draw.text((72, 345), "项目成员", font=font(17), fill="#777b70")
draw.text((220, 338), "梁天乐", font=font(27), fill="#20211c")
draw.text((72, 398), "证明来源", font=font(17), fill="#777b70")
draw.text((220, 392), "广东技术师范大学 2025 年校级项目公示清单", font=font(24), fill="#20211c")

strip_y = 470
canvas.paste(row, (72, strip_y))
draw.rectangle((72, strip_y, 72 + row.width, strip_y + row.height), outline="#c8c3b7", width=2)
draw.text((72, strip_y + row.height + 16), "公示清单摘录 / 个人信息已隐藏", font=font(17), fill="#777b70")

# stamp
stamp = (1320, 690)
draw.ellipse((stamp[0], stamp[1], stamp[0] + 170, stamp[1] + 170), outline="#5c711f", width=2)
draw.text((stamp[0] + 35, stamp[1] + 52), "2025", font=font(25, True), fill="#5c711f")
draw.text((stamp[0] + 25, stamp[1] + 91), "PROJECT", font=font(14), fill="#5c711f")

canvas.save(OUT / "project-approval.jpg", "JPEG", quality=88, optimize=True, progressive=True)
print("project", row.size)
