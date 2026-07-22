#!/usr/bin/env python3
"""
Compute WCAG 2.2 contrast ratios for all Oryx Institute brand colour pairings.
Verified colours are extracted from supplied assets only - no invented values.
"""
import json

# All colours below are verified from supplied assets by inspect_assets.py and inspect_references.py.
COLOURS = {
    "oryx_maroon":  (114, 18,  32),   # verified from primary logo + shield + reference B
    "deep_maroon":  (74,  35,  27),   # verified from reference A
    "cream":        (252, 251, 249),  # verified from reference B
    "sand":         (211, 194, 177),  # verified from reference A
    "stone":        (191, 166, 143),  # verified from reference A
    "earth":        (130, 102, 78),   # verified from reference A
    "ink_black":    (15,  14,  13),   # verified from reference B
    "warm_white":   (234, 220, 205),  # verified from reference A (cream variant)
}

def srgb_to_linear(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

def luminance(rgb):
    r, g, b = rgb
    return 0.2126 * srgb_to_linear(r) + 0.7152 * srgb_to_linear(g) + 0.0722 * srgb_to_linear(b)

def contrast(rgb1, rgb2):
    l1, l2 = luminance(rgb1), luminance(rgb2)
    if l1 < l2: l1, l2 = l2, l1
    return (l1 + 0.05) / (l2 + 0.05)

def grade(ratio, large=False):
    # WCAG 2.2 thresholds
    aa_normal = 4.5
    aaa_normal = 7.0
    aa_large = 3.0
    aaa_large = 4.5
    if large:
        if ratio >= aaa_large: return "AAA (large)"
        if ratio >= aa_large:  return "AA (large)"
        return "FAIL (large)"
    else:
        if ratio >= aaa_normal: return "AAA"
        if ratio >= aa_normal:  return "AA"
        return "FAIL"

def hex_of(rgb):
    return f"#{rgb[0]:02X}{rgb[1]:02X}{rgb[2]:02X}"

# Pairings relevant to the site
pairings = [
    # (foreground, background, use_case, is_large_text)
    ("ink_black",   "cream",       "Body text on light surfaces",            False),
    ("ink_black",   "warm_white",  "Body text on warm cream panels",         False),
    ("ink_black",   "sand",        "Body text on sand panels",               False),
    ("ink_black",   "stone",       "Body text on stone surfaces",            False),
    ("oryx_maroon", "cream",       "Maroon headlines on cream",              True),
    ("oryx_maroon", "warm_white",  "Maroon headlines on warm cream",         True),
    ("oryx_maroon", "cream",       "Maroon small text on cream",             False),
    ("oryx_maroon", "white",       "Maroon on pure white",                   False),
    ("deep_maroon", "cream",       "Deep maroon on cream",                   False),
    ("cream",       "oryx_maroon", "Cream text on maroon surface",           False),
    ("cream",       "deep_maroon", "Cream text on deep maroon surface",      False),
    ("warm_white",  "oryx_maroon", "Warm white text on maroon",              False),
    ("warm_white",  "deep_maroon", "Warm white text on deep maroon",         False),
    ("white",       "oryx_maroon", "White text on maroon button",            False),
    ("white",       "deep_maroon", "White text on deep maroon button",       False),
    ("ink_black",   "oryx_maroon", "Black text on maroon (do not use)",      False),
    ("oryx_maroon", "sand",        "Maroon on sand",                         False),
    ("oryx_maroon", "stone",       "Maroon on stone",                        False),
    ("earth",       "cream",       "Earth accent text on cream",             False),
    ("ink_black",   "earth",       "Black on earth surface",                 False),
]

# Add a synthetic pure white if used
COLOURS["white"] = (255, 255, 255)

results = []
for fg_name, bg_name, use, large in pairings:
    fg = COLOURS[fg_name]
    bg = COLOURS[bg_name]
    r = contrast(fg, bg)
    results.append({
        "use_case": use,
        "foreground": fg_name,
        "fg_hex": hex_of(fg),
        "background": bg_name,
        "bg_hex": hex_of(bg),
        "contrast_ratio": round(r, 2),
        "wcag_grade": grade(r, large),
        "text_size": "large (>=18pt or >=14pt bold)" if large else "normal",
        "approved_for_use": "FAIL" not in grade(r, large),
    })

print(json.dumps(results, indent=2))

# Also produce a clean summary table for embedding in BRAND.md
print("\n\n=== BRAND.md TABLE ===\n")
print("| Use case | Foreground | Background | Ratio | Grade | Size |")
print("|---|---|---|---|---|---|")
for r in results:
    print(f"| {r['use_case']} | {r['fg_hex']} ({r['foreground']}) | {r['bg_hex']} ({r['background']}) | {r['contrast_ratio']}:1 | {r['wcag_grade']} | {r['text_size']} |")
