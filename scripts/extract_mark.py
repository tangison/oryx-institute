"""Find the boundary between wordmark and shield in oryx-logo.png, crop to just the shield."""
from PIL import Image
import numpy as np

im = Image.open('/home/z/my-project/public/oryx-logo.png').convert('RGBA')
arr = np.array(im)
h, w = arr.shape[:2]
print(f"Logo: {w}x{h}")

# Maroon pixels (shield)
rgb = arr[:, :, :3]
alpha = arr[:, :, 3]
r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
maroon_mask = (r > 60) & (r < 200) & (g < 80) & (b < 80) & (alpha > 30)
black_mask = (r < 60) & (g < 60) & (b < 60) & (alpha > 30)

# Per-column counts
maroon_cols = maroon_mask.sum(axis=0)
black_cols = black_mask.sum(axis=0)

print("\nColumn analysis (every 20 cols):")
print(f"{'col':>4} {'maroon':>7} {'black':>6}")
for x in range(0, w, 20):
    print(f"{x:4d} {maroon_cols[x]:7d} {black_cols[x]:6d}")

# Find first column with significant maroon content
maroon_cols_with_content = np.where(maroon_cols > 5)[0]
black_cols_with_content = np.where(black_cols > 5)[0]
print(f"\nMaroon spans cols: {maroon_cols_with_content[0]} to {maroon_cols_with_content[-1]}")
print(f"Black spans cols: {black_cols_with_content[0]} to {black_cols_with_content[-1]}")

# Find the gap between black (wordmark) and maroon (shield)
# Look for a column range where both maroon and black are near zero
boundary_start = None
for x in range(black_cols_with_content[-1], maroon_cols_with_content[0], -1):
    if maroon_cols[x] < 5 and black_cols[x] < 5:
        boundary_start = x
        break
# Actually find the LAST column where black ends, then first col where maroon begins after that
black_end = black_cols_with_content[-1] if len(black_cols_with_content) else 0
# Find first maroon col after black_end
maroon_after_black = maroon_cols_with_content[maroon_cols_with_content > black_end]
maroon_start = maroon_after_black[0] if len(maroon_after_black) else 0
print(f"\nBlack wordmark ends at col: {black_end}")
print(f"Maroon shield starts at col: {maroon_start}")
print(f"Gap: {maroon_start - black_end} px")

# Crop just the shield (maroon portion) with a small margin
margin = 4
crop_left = max(0, maroon_start - margin)
crop_right = min(w, maroon_cols_with_content[-1] + margin + 1)
cropped = im.crop((crop_left, 0, crop_right, h))
# Trim transparent rows top/bottom too
arr_c = np.array(cropped)
alpha_c = arr_c[:, :, 3]
rows_with_content = np.where(alpha_c.max(axis=1) > 30)[0]
top = max(0, rows_with_content[0] - margin)
bot = min(cropped.size[1], rows_with_content[-1] + margin + 1)
cropped = cropped.crop((0, top, cropped.size[0], bot))

out_path = '/home/z/my-project/public/oryx-mark.png'
cropped.save(out_path)
print(f"\nSaved: {out_path} size={cropped.size}")

# Also make a version with the wordmark removed but the shield centered with some left padding for balance
# Actually let's also save a clean version at higher resolution by upscaling slightly
# No - keep it native. Just save the crop.

# Verify by re-analyzing
im2 = Image.open(out_path).convert('RGBA')
arr2 = np.array(im2)
maroon2 = ((arr2[:,:,0] > 60) & (arr2[:,:,0] < 200) & (arr2[:,:,1] < 80) & (arr2[:,:,2] < 80) & (arr2[:,:,3] > 30)).sum()
black2 = ((arr2[:,:,0] < 60) & (arr2[:,:,1] < 60) & (arr2[:,:,2] < 60) & (arr2[:,:,3] > 30)).sum()
print(f"Verify: maroon={maroon2}, black={black2} (black should be ~0)")
