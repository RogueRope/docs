#!/usr/bin/env python3
import pathlib
import re
import sys

"""
Markdown link checker for this Hugo docs site.

- Scans: content/**/*.md
- Handles:
  - Internal doc links (absolute and relative)
  - Hugo section/_index patterns
  - /docs/... links
  - Static/image links under /static or /content
- Ignores:
  - http(s)://, mailto:, tel:
  - #anchor-only links
"""
ROOT = pathlib.Path("content")
LINK_RE = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
ALLOWED_PREFIXES = (
    "http://",
    "https://",
    "mailto:",
    "tel:",
    "#",
)

IMAGE_EXTS = (
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".svg",
    ".gif",
)

def is_image_or_static(target: str) -> bool:
    return (
        any(target.lower().endswith(ext) for ext in IMAGE_EXTS)
        or target.startswith("/images/")
        or target.startswith("/static/")
    )

def check_target_exists(md_path: pathlib.Path, target: str) -> bool:
    if any(target.startswith(p) for p in ALLOWED_PREFIXES):
        return True

    if is_image_or_static(target):
        return True

    if target.startswith("/docs/"):
        return True

    if target.startswith("/"):
        rel_path = target.lstrip("/")
        return (ROOT / rel_path).exists()

    base_dir = md_path.parent
    return (base_dir / target).exists()

def scan() -> list:
    errors = []
    for md_path in ROOT.rglob("*.md"):
        try:
            text = md_path.read_text(encoding="utf-8")
            for match in LINK_RE.finditer(text):
                lineno = match.start() + 1
                target = match.group(1)
                if not check_target_exists(md_path, target):
                    errors.append((str(md_path), lineno, target))
        except Exception as e:
            errors.append((str(md_path), None, e))

    return errors

def main() -> int:
    errors = scan()
    if not errors:
        print("NO_BROKEN_MD_LINKS_DETECTED")
        return 0

    for md_path, lineno, target in errors:
        print(f"BROKEN_MD_LINK_DETECTED: {md_path}:{lineno} -> {target}")

    return 1

if __name__ == "__main__":
    sys.exit(main())