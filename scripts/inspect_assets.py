#!/usr/bin/env python3
"""
Oryx Institute - supplied asset inspection.
Objective only: dimensions, format, mode, alpha, dominant colours, maroon extraction.
Does NOT modify any asset. Does NOT generate any derivative image.
"""
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import os
import json

UPLOAD = "/home/z/my-project/upload"
FILES = [
    ("primary_logo", "file_000000003d9471f4b2b8767331585476-removebg-preview.png"),
    ("shield_icon",  "oryx_symbol.png"),
]

def rgb_to_hex(c):
    return f"#{c[0]:02X}{c[1]:02X}{c[2]:02X}"

def nearest_name(c):
    r, g, b = int(c[0]), int(c[1]), int(c[2])
    # crude classifier
    mx, mn = max(r, g, b), min(r, g, b)
    if mx < 40:    return "black"
    if mn > 235:   return "white"
    if mx - mn < 18 and mx > 200: return "cream"
    if mx - mn < 18 and 180 < mx < 230: return "sand"
    if mx - mn < 18 and 120 < mx < 180: return "stone"
    if r > g and g > b and r < 180 and b < 100 and r - b > 40:
        if r < 110: return "deep maroon"
        if r < 150: return "maroon"
        return "warm red"
    if r > g and r > b and g < 130 and b < 130:
        return "rust"
    if r > 200 and 150 < g < 200 and b < 130:
        return "ochre"
    return "neutral"

def inspect(path, label):
    img = Image.open(path)
    info = {
        "label": label,
        "path": path,
        "filename": os.path.basename(path),
        "format": img.format,
        "mode": img.mode,
        "size_bytes": os.path.getsize(path),
        "size_kb": round(os.path.getsize(path) / 1024, 1),
        "width": img.width,
        "height": img.height,
        "aspect_ratio": round(img.width / img.height, 3),
        "orientation": "landscape" if img.width > img.height else ("portrait" if img.width < img.height else "square"),
        "has_alpha": "A" in img.mode or "transparency" in img.info,
    }

    rgba = img.convert("RGBA").resize((160, 160), Image.LANCZOS)
    arr = np.array(rgba)

    if info["has_alpha"]:
        mask = arr[:, :, 3] > 200
        opaque_pct = round(mask.mean() * 100, 1)
        info["opaque_pixel_pct"] = opaque_pct
        info["transparent_pixel_pct"] = round(100 - opaque_pct, 1)
        pixels = arr[:, :, :3][mask].reshape(-1, 3)
    else:
        pixels = arr[:, :, :3].reshape(-1, 3)

    if len(pixels) > 0:
        k = min(10, len(pixels))
        km = KMeans(n_clusters=k, random_state=42, n_init=10)
        km.fit(pixels)
        counts = np.bincount(km.labels_)
        order = np.argsort(-counts)
        dom = []
        for i in order:
            c = km.cluster_centers_[i].astype(int)
            dom.append({
                "hex": rgb_to_hex(c),
                "rgb": c.tolist(),
                "name": nearest_name(c),
                "pct": round(counts[i] / len(pixels) * 100, 1),
            })
        info["dominant_colors"] = dom

        # Maroon / brand-red candidates: low-mid lightness, red-dominant
        maroon_candidates = []
        for i in order:
            c = km.cluster_centers_[i].astype(int)
            r, g, b = c
            if r > g + 25 and g > b and r < 200 and b < 110:
                maroon_candidates.append({
                    "hex": rgb_to_hex(c),
                    "rgb": c.tolist(),
                    "name": nearest_name(c),
                    "pct_of_opaque": round(counts[i] / len(pixels) * 100, 1),
                })
        info["brand_maroon_candidates"] = maroon_candidates

        # Mean colour of opaque pixels (overall cast)
        info["mean_opaque_rgb"] = pixels.mean(axis=0).astype(int).tolist()
        info["mean_opaque_hex"] = rgb_to_hex(pixels.mean(axis=0).astype(int))
    else:
        info["note"] = "Image is fully transparent or has no opaque pixels."

    return info

results = []
for label, fname in FILES:
    p = os.path.join(UPLOAD, fname)
    if os.path.exists(p):
        results.append(inspect(p, label))
    else:
        results.append({"label": label, "path": p, "error": "missing"})

print(json.dumps(results, indent=2))
