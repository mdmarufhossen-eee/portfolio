"""One-off image pipeline: portrait sizes (EXIF stripped), OG card, icons. Run: python3 scripts/images.py"""
from PIL import Image, ImageDraw, ImageFont
import glob

src = Image.open("assets/img/source/maruf-image.jpeg").convert("RGB")
w, h = src.size
for tw in (320, 477):
    th = round(h * tw / w)
    im = src.resize((tw, th), Image.LANCZOS) if tw != w else src.copy()
    im.save(f"assets/img/maruf-{tw}.webp", "WEBP", quality=82, method=6)
    im.save(f"assets/img/maruf-{tw}.jpg", "JPEG", quality=84, optimize=True, progressive=True)

def font(size, bold=True):
    for p in glob.glob("/usr/share/fonts/**/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/**/DejaVuSans.ttf", recursive=True):
        return ImageFont.truetype(p, size)
    return ImageFont.load_default()

BG, TEAL, TEXT, MUTED = (11, 18, 32), (45, 212, 191), (230, 234, 242), (163, 174, 194)
og = Image.new("RGB", (1200, 630), BG)
d = ImageDraw.Draw(og)
d.rectangle([0, 0, 12, 630], fill=TEAL)
ph = 470
pw = round(w * ph / h)
photo = src.resize((pw, ph), Image.LANCZOS)
mask = Image.new("L", (pw, ph), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, pw, ph], 28, fill=255)
og.paste(photo, (1200 - pw - 80, 80), mask)
d.text((80, 150), "EEE STUDENT · FUTURE ENGINEER", font=font(26), fill=(165, 180, 252))
d.text((80, 200), "Md. Maruf Hossen", font=font(62), fill=TEXT)
d.text((80, 290), "Engineering Ideas Into Reality.", font=font(34), fill=TEAL)
d.text((80, 370), "B.Sc. in Electrical & Electronic Engineering", font=font(26, False), fill=MUTED)
d.text((80, 410), "Jamalpur Science & Technology University", font=font(26, False), fill=MUTED)
og.save("assets/img/og-1200x630.jpg", "JPEG", quality=88, optimize=True)

def icon(size):
    im = Image.new("RGB", (size, size), BG)
    dd = ImageDraw.Draw(im)
    dd.rounded_rectangle([0, 0, size - 1, size - 1], size // 5, fill=BG)
    f = font(int(size * 0.46))
    t = "MH"
    bb = dd.textbbox((0, 0), t, font=f)
    dd.text(((size - (bb[2] - bb[0])) / 2 - bb[0], (size - (bb[3] - bb[1])) / 2 - bb[1]), t, font=f, fill=TEAL)
    return im
for s, n in ((180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
    icon(s).save(f"assets/icons/{n}")
icon(64).save("assets/icons/favicon.ico", sizes=[(32, 32), (16, 16)])
