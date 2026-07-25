#!/usr/bin/env python3
"""
Convert all source PNGs from upload/extracted/ to optimized WebP files in
public/images/<category>/, per IMAGE_INVENTORY.md mapping.

Produces two variants per source:
  - <name>.webp        — full-size, q78 (for hero / large panels)
  - <name>-card.webp   — 600×800 crop, q74 (for card thumbnails)

Also produces a JSON manifest at public/images/manifest.json so the site
can resolve image paths without re-hardcoding everywhere.
"""
import json
import shutil
import subprocess
from pathlib import Path

ROOT = Path("/home/z/my-project")
SRC_DIR = ROOT / "upload" / "extracted"
OUT_DIR = ROOT / "public" / "images"
MANIFEST_PATH = OUT_DIR / "manifest.json"

# (source_filename, category, semantic_name, alt_text)
# alt_text follows DESIGN.md §16.3 — descriptive, not redundant with caption.
MAPPING = [
    ("1783169467885.png",                                "brand",        "oryx-chalkboard",       "A hand-drawn oryx shield motif sketched on a dark chalkboard surface."),
    ("file_00000000027481f88a39def193776b00.png",        "campus",       "arched-corridor",       "A sunlit arched corridor with a leather notebook resting on a stone ledge."),
    ("file_0000000014e881f5a2b9f2afa25be946.png",        "schools",      "administration-01",     "An open notebook with a pen and a smooth stone arranged on a concrete surface."),
    ("file_000000001a0c81f5b075615af499bba5.png",        "programmes",   "student-classroom",     "A student in a beige fleece standing in a sunlit classroom."),
    ("file_000000002a5481f59dd899b9f884795b.png",        "schools",      "digital-01",            "A fountain pen resting on an open notebook near a stack of binders."),
    ("file_00000000368081f59310ab9ee51b174a.png",        "research",     "archival-calipers",     "An archival box with brass calipers and a wax-seal stamp arranged on a surface."),
    ("file_000000003a0481f58007e7989a3f2c75.png",        "schools",      "hospitality-01",        "A service bell and a set of guest keys arranged on a wooden counter."),
    ("file_000000003fe881fd8d8e3fe3220e4256.png",        "schools",      "administration-02",     "A checklist, a rubber stamp, and a secure lockbox on a desk."),
    ("file_0000000045608230868a2d29cb6d0cd7.png",        "partners",     "collaboration",         "Professionals collaborating over documents spread across a wooden table."),
    ("file_0000000051cc81fdbf0f25bcf281caf4.png",        "campus",       "blueprint",             "An architectural blueprint with drafting tools laid out on a desk."),
    ("file_00000000533481f7977b1cd37a9c4940.png",        "brand",        "oryx-dune",             "A lone oryx standing on the crest of a Namibian sand dune."),
    ("file_000000005c9481f58cf198d4e1258500.png",        "campus",       "corridor-windows",      "A sunlit corridor with rhythmic arched windows casting warm light."),
    ("file_0000000069d081fdba815f2a4af137e2.png",        "schools",      "administration-03",     "A modern meeting room with a round table and upholstered chairs."),
    ("file_0000000080ec81f59c4d7b265b0fe278.png",        "programmes",   "clipboards-notebooks",  "A row of clipboards and notebooks arranged on a counter."),
    ("file_0000000096f081f583fa520b33e485e0.png",        "campus",       "student-corridor",      "A student walking down a sunlit institutional corridor."),
    ("file_000000009a8881f587455050e1698d4b.png",        "research",     "leather-books",         "A stack of leather-bound books in warm natural light."),
    ("file_00000000a47081f895d8de3ad614da2a.png",        "schools",      "safety-01",             "An open portfolio with photographs of safety tools and equipment."),
    ("file_00000000cac481f89d47f16186c02847.png",        "schools",      "digital-02",            "A minimalist flat-lay of a laptop and a stationery set on a warm surface."),
    ("file_00000000cc7481f7bc6dcea82025e7bc.png",        "schools",      "digital-03",            "A modern computer lab with laptops arranged on long desks."),
    ("file_00000000ddfc81f8a8eea69a97774e18.png",        "schools",      "administration-04",     "A laptop with a notebook and pen on a wooden desk."),
    ("file_00000000e19c81f790d90ac1babe7a42.png",        "research",     "digital-recorder",      "A digital recorder and two notebooks on a warm-toned surface."),
    ("file_00000000f27081fd8d3050e2fbbaae39.png",        "programmes",   "student-portfolio",     "A student reviewing a printed photo portfolio under warm light."),
    ("file_00000000f2c081f5a6112b6f9c5e0fa8.png",        "campus",       "building-entrance",     "A modern campus building entrance with warm stone and glass facade."),
]


def run(cmd: list[str]) -> None:
    """Run a command, raise on failure."""
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(
            f"Command failed: {' '.join(cmd)}\nSTDERR: {result.stderr[-500:]}"
        )


def convert(src: Path, dst: Path, quality: int = 78, resize: str | None = None) -> int:
    """Convert a PNG to WebP via ffmpeg (libwebp). Returns byte size of output.

    ffmpeg webp encoding flags:
      -q:v <q>      quality (0-100, higher = better)
      -compression_level 6  max encoder effort
      -loop 0       static image
    """
    cmd = ["ffmpeg", "-y", "-i", str(src)]
    vf = []
    if resize:
        w, h = resize.split(" ")
        # Use lanczos for high-quality downscale, force even dims (libwebp requirement)
        vf.append(f"scale={w}:{h}:force_original_aspect_ratio=decrease")
        vf.append("pad=ceil(iw/2)*2:ceil(ih/2)*2:-1:-1:color=white")
    if vf:
        cmd += ["-vf", ",".join(vf)]
    cmd += [
        "-c:v", "libwebp",
        "-q:v", str(quality),
        "-compression_level", "6",
        "-loop", "0",
        "-an",
        str(dst),
    ]
    run(cmd)
    return dst.stat().st_size


def main() -> None:
    # Ensure category dirs exist
    categories = sorted({m[1] for m in MAPPING})
    for cat in categories:
        (OUT_DIR / cat).mkdir(parents=True, exist_ok=True)

    manifest = {
        "version": 1,
        "generated_at": subprocess.check_output(["date", "-u", "+%Y-%m-%dT%H:%M:%SZ"]).decode().strip(),
        "images": [],
    }

    total_src = 0
    total_full = 0
    total_card = 0

    for src_name, category, semantic, alt in MAPPING:
        src = SRC_DIR / src_name
        if not src.exists():
            print(f"!! MISSING source: {src}")
            continue

        dst_full = OUT_DIR / category / f"{semantic}.webp"
        dst_card = OUT_DIR / category / f"{semantic}-card.webp"

        src_size = src.stat().st_size
        full_size = convert(src, dst_full, quality=78)
        card_size = convert(src, dst_card, quality=74, resize="600 800")

        total_src += src_size
        total_full += full_size
        total_card += card_size

        rel_full = f"/images/{category}/{semantic}.webp"
        rel_card = f"/images/{category}/{semantic}-card.webp"

        manifest["images"].append({
            "semantic": semantic,
            "category": category,
            "alt": alt,
            "full": rel_full,
            "card": rel_card,
            "full_bytes": full_size,
            "card_bytes": card_size,
        })

        print(f"  {category:12s} / {semantic:24s}  src={src_size//1024:4d}K  full={full_size//1024:4d}K  card={card_size//1024:3d}K")

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2))

    print()
    print(f"Source total : {total_src//1024:6d} KB ({total_src/1024/1024:.1f} MB)")
    print(f"Full WebP    : {total_full//1024:6d} KB ({total_full/1024/1024:.1f} MB)  — {(1-total_full/total_src)*100:.0f}% smaller")
    print(f"Card WebP    : {total_card//1024:6d} KB ({total_card/1024/1024:.1f} MB)")
    print(f"Combined     : {(total_full+total_card)//1024:6d} KB")
    print(f"Manifest     : {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
