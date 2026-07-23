"""Analyze the oryx shield to find where the symbol ends and wordmark begins."""
from PIL import Image
import numpy as np

im = Image.open('/home/z/my-project/public/oryx-shield.png').convert('RGBA')
arr = np.array(im)
print(f"Image: {im.size} {im.mode}")
print(f"Shape: {arr.shape}")

# Maroon is roughly #721220 -> RGB (114, 18, 32). Find pixels close to maroon.
rgb = arr[:, :, :3]
alpha = arr[:, :, 3]
# Maroon-ish pixels: red dominant, low green, low blue, red > 60
r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
maroon_mask = (r > 60) & (r < 200) & (g < 80) & (b < 80) & (alpha > 30)
print(f"Total maroon pixels: {maroon_mask.sum()}")

# Per-row maroon pixel count
row_counts = maroon_mask.sum(axis=1)
# Find rows where there's content
nonzero_rows = np.where(row_counts > 0)[0]
print(f"First maroon row: {nonzero_rows[0]}, last maroon row: {nonzero_rows[-1]}")
print(f"Total height: {arr.shape[0]}")

# Print row counts every 20 rows to find the gap
print("\nRow maroon density (every 10 rows):")
for y in range(0, arr.shape[0], 10):
    bar = '#' * min(60, row_counts[y] // 5)
    print(f"  y={y:3d}: {row_counts[y]:4d} {bar}")

# Find the largest gap (likely between symbol and wordmark)
print("\nLooking for vertical gaps (rows with 0 maroon between content rows):")
in_gap = False
gap_start = 0
gaps = []
for y in range(nonzero_rows[0], nonzero_rows[-1] + 1):
    if row_counts[y] == 0:
        if not in_gap:
            gap_start = y
            in_gap = True
    else:
        if in_gap:
            gap_end = y
            gap_len = gap_end - gap_start
            if gap_len >= 3:
                gaps.append((gap_start, gap_end, gap_len))
            in_gap = False
gaps.sort(key=lambda x: -x[2])
print("Top 10 gaps (start, end, length):")
for g in gaps[:10]:
    print(f"  {g}")
