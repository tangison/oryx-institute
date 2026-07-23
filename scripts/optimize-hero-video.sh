#!/usr/bin/env bash
# Optimize the oryx hero loop video for web.
# Source: upload/VID-20260723-WA1548.mp4 (512x768, 5.21s, 2.1 Mbps, no audio)
# Outputs:
#   public/hero/oryx-loop.mp4   — H.264, web-optimized, faststart
#   public/hero/oryx-loop.webm  — VP9, smaller for supporting browsers
#   public/hero/oryx-loop-poster.jpg — first-frame poster for instant paint
set -euo pipefail

SRC="/home/z/my-project/upload/VID-20260723-WA1548.mp4"
OUT_DIR="/home/z/my-project/public/hero"
mkdir -p "$OUT_DIR"

# --- H.264 (universal support) ---
# -crf 24: visually transparent for this content, big size win
# -preset slow: better compression efficiency
# -pix_fmt yuv420p: max compatibility
# -movflags +faststart: moov atom first, instant playback
# -an: drop audio (none in source, but be explicit)
# -vf "scale=512:768": lock native resolution (no upscaling)
ffmpeg -y -i "$SRC" \
  -an \
  -vf "scale=512:768:flags=lanczos" \
  -c:v libx264 \
  -profile:v high \
  -level 4.0 \
  -crf 24 \
  -preset slow \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "$OUT_DIR/oryx-loop.mp4"

# --- WebM / VP9 (Chromium/Firefox, ~30% smaller) ---
# -crf 32 with vp9 is roughly equivalent to x264 crf 24 visually
# -b:v 0 lets CRF mode work properly
# -row-mt 1 speeds up encoding on multi-core
ffmpeg -y -i "$SRC" \
  -an \
  -vf "scale=512:768:flags=lanczos" \
  -c:v libvpx-vp9 \
  -crf 32 \
  -b:v 0 \
  -row-mt 1 \
  -tile-columns 0 \
  -pix_fmt yuv420p \
  "$OUT_DIR/oryx-loop.webm"

# --- Poster frame (first frame, JPEG q80) ---
ffmpeg -y -i "$SRC" \
  -frames:v 1 \
  -q:v 4 \
  "$OUT_DIR/oryx-loop-poster.jpg"

echo "---"
echo "Output sizes:"
ls -la "$OUT_DIR/"
