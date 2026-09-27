import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).parent.resolve()
DIST = ROOT / "dist"

print("--- Building HERMES GSuite CLI for Netlify ---")

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

# 3. Create Netlify _redirects file
redirects_content = """# Netlify Redirects & Clean URL rewrites for HERMES GSuite CLI
/privacy/             /privacy/index.html            200
/privacy              /privacy/index.html            200
/terms/                /terms/index.html              200
/terms                /terms/index.html              200
/security/             /security/index.html           200
/security             /security/index.html           200
/docs/                 /docs/index.html               200
/docs                 /docs/index.html               200
/docs/installation/   /docs/installation/index.html  200
/docs/installation    /docs/installation/index.html  200
/docs/authentication/ /docs/authentication/index.html 200
/docs/authentication  /docs/authentication/index.html 200
/docs/commands/       /docs/commands/index.html      200
/docs/commands        /docs/commands/index.html      200
/docs/ai/             /docs/ai/index.html            200
/docs/ai              /docs/ai/index.html            200
/docs/caching/        /docs/caching/index.html       200
/docs/caching         /docs/caching/index.html       200
/support/              /support/index.html            200
/support              /support/index.html            200
"""

(DIST / "_redirects").write_text(redirects_content.strip() + "\n", encoding="utf-8")
print("[OK] Created Netlify _redirects file")

# 4. Create Netlify _headers file for security & performance
headers_content = """/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable
"""

(DIST / "_headers").write_text(headers_content.strip() + "\n", encoding="utf-8")
print("[OK] Created Netlify _headers file")

# 5. Create netlify.toml at project root & inside dist
netlify_toml = """[build]
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
"""
(ROOT / "netlify.toml").write_text(netlify_toml.strip() + "\n", encoding="utf-8")
(DIST / "netlify.toml").write_text(netlify_toml.strip() + "\n", encoding="utf-8")
print("[OK] Created netlify.toml")

# 6. Create zip bundle for direct drag-and-drop on app.netlify.com/drop
zip_path = ROOT / "dist.zip"
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in DIST.rglob("*"):
        if file.is_file():
            arcname = file.relative_to(DIST)
            zipf.write(file, arcname)

print(f"[OK] Created zip bundle for drag-and-drop: {zip_path.name} ({zip_path.stat().st_size // 1024} KB)")
print("--- Build Complete! ---")
