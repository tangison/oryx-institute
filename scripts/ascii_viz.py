"""Visualize the shield and primary logo as ASCII art to understand structure."""
from PIL import Image
import numpy as np

def ascii_viz(path, cols=80):
    im = Image.open(path).convert('RGBA')
    # Downscale to cols wide preserving aspect
    w, h = im.size
    rows = int((h / w) * cols * 0.5)  # 0.5 because chars are taller than wide
    im2 = im.resize((cols, rows))
    arr = np.array(im2)
    print(f"\n=== {path} ({w}x{h}) -> {cols}x{rows} ascii ===")
    for y in range(rows):
        line = []
        for x in range(cols):
            r, g, b, a = arr[y, x]
            if a < 30:
                line.append(' ')
            elif r > 60 and r < 200 and g < 80 and b < 80:
                line.append('#')  # maroon
            elif r > 200 and g > 200 and b > 200:
                line.append('.')  # white
            elif r < 60 and g < 60 and b < 60:
                line.append('@')  # black
            else:
                line.append('-')  # other
        print(''.join(line))

ascii_viz('/home/z/my-project/public/oryx-shield.png', 80)
ascii_viz('/home/z/my-project/public/oryx-logo.png', 100)
