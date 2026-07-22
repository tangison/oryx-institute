#!/usr/bin/env python3
"""
Inspect two newly supplied visual references for Oryx Institute.
Objective: dimensions, dominant colours, overall cast, luminance, possible subject hints via colour histogram.
Does NOT modify the originals.
"""
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import os, json

FILES = [
    ("reference_A", "/home/z/my-project/upload/file_00000000a2c481fda3f9ff586c4a2fdc.png"),
    ("reference_B", "/home/z/my-project/upload/file_00000000210871f492b750e9ec3b6bf0.png"),
]

def hex_of(c):
    return f"#{int(c[0]):02X}{int(c[1]):02X}{int(c[2]):02X}"

def name_of(c):
    r,g,b = int(c[0]), int(c[1]), int(c[2])
    mx, mn = max(r,g,b), min(r,g,b)
    if mx < 40: return "black"
    if mn > 240: return "white"
    if mx - mn < 18:
        if mx > 220: return "cream"
        if mx > 180: return "sand"
        if mx > 130: return "stone"
        if mx > 80:  return "charcoal"
        return "black"
    # warm / cool
    if r > g + 30 and g > b:
        if r < 130: return "deep maroon"
        if r < 180: return "maroon"
        return "warm red"
    if r > g and r > b and b < 110:
        if r < 140: return "rust"
        return "ochre"
    if r > 200 and 150 < g < 210 and b < 150: return "ochre"
    if b > r and b > g: return "blue"
    if g > r and g > b: return "green"
    return "neutral"

def inspect(path, label):
    img = Image.open(path)
    info = {
        "label": label,
        "filename": os.path.basename(path),
        "format": img.format,
        "mode": img.mode,
        "width": img.width,
        "height": img.height,
        "aspect_ratio": round(img.width / img.height, 3),
        "orientation": "landscape" if img.width > img.height else "portrait",
        "size_kb": round(os.path.getsize(path) / 1024, 1),
        "has_alpha": "A" in img.mode,
    }
    rgb = img.convert("RGB").resize((220,220), Image.LANCZOS)
    arr = np.array(rgb).reshape(-1, 3)
    km = KMeans(n_clusters=8, random_state=42, n_init=10).fit(arr)
    counts = np.bincount(km.labels_)
    order = np.argsort(-counts)
    dom = []
    for i in order:
        c = km.cluster_centers_[i].astype(int)
        dom.append({
            "hex": hex_of(c),
            "rgb": c.tolist(),
            "name": name_of(c),
            "pct": round(counts[i] / len(arr) * 100, 1),
        })
    info["dominant_colors"] = dom
    info["mean_rgb"] = arr.mean(axis=0).astype(int).tolist()
    info["mean_hex"] = hex_of(arr.mean(axis=0).astype(int))
    luminance = (0.2126*arr[:,0] + 0.7152*arr[:,1] + 0.0722*arr[:,2]).mean()
    info["mean_luminance"] = round(float(luminance), 1)  # 0-255
    info["brightness_class"] = ("very_dark" if luminance < 60 else
                                "dark" if luminance < 110 else
                                "mid" if luminance < 170 else
                                "light" if luminance < 220 else "very_light")
    # warm/cool balance
    warm = (arr[:,0].astype(int) - arr[:,2].astype(int)).mean()
    info["warm_cool_balance"] = round(float(warm), 1)  # positive = warm
    return info

results = [inspect(p, l) for l, p in FILES]
print(json.dumps(results, indent=2))
