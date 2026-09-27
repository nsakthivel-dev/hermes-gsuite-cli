import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).parent.resolve()
DIST = ROOT / "dist"

print("--- Building HERMES GSuite CLI Static Bundle ---")

# 1. Clean previous dist
if DIST.exists():
    shutil.rmtree(DIST)
DIST.mkdir(parents=True, exist_ok=True)
print("[OK] Created clean dist/ directory")

# 2. Files and Directories to copy
items_to_copy = [
    "index.html",
    "privacy.html",
    "terms.html",
    "security.html",
    "docs.html",
    "support.html",
    "robots.txt",
    "sitemap.xml",
    "vercel.json",
    "assets",
    "privacy",
    "terms",
    "security",
    "docs",
    "support",
]

for item in items_to_copy:
    src = ROOT / item
    dest = DIST / item
    if src.is_file():
        shutil.copy2(src, dest)
        print(f"  Copied file: {item}")
    elif src.is_dir():
        shutil.copytree(src, dest)
        print(f"  Copied directory: {item}")

# 3. Create zip bundle for backup or distribution
zip_path = ROOT / "dist.zip"
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in DIST.rglob("*"):
        if file.is_file():
            arcname = file.relative_to(DIST)
            zipf.write(file, arcname)

print(f"[OK] Created zip bundle: {zip_path.name} ({zip_path.stat().st_size // 1024} KB)")
print("--- Build Complete! ---")
