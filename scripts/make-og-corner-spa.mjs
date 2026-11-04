/**
 * The Corner Spa OG plate: 1200x630, the venture's sand ground, the
 * brand serif. Rendered with the site's own font files so the plate
 * matches the site byte for byte in spirit. Run from the repo root:
 *   node scripts/make-og-corner-spa.mjs
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: "Radley";
    src: url("file://${root}/src/fonts/radley-latin-400-normal.woff2") format("woff2");
    font-weight: 400;
  }
  @font-face {
    font-family: "Inter";
    src: url("file://${root}/src/fonts/inter-latin-400-normal.woff2") format("woff2");
    font-weight: 400;
  }
  @font-face {
    font-family: "Inter";
    src: url("file://${root}/src/fonts/inter-latin-600-normal.woff2") format("woff2");
    font-weight: 600;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    background: #D8C6A8;
    color: #181713;
    font-family: "Inter", Arial, sans-serif;
    position: relative;
  }
  .frame {
    position: absolute; inset: 28px;
    border: 1px solid rgba(24, 23, 19, 0.28);
  }
  .inner {
    position: absolute; inset: 28px;
    display: flex; flex-direction: column;
    justify-content: center;
    padding: 0 64px;
  }
  .eyebrow {
    font-size: 21px; font-weight: 600; letter-spacing: 0.22em;
    color: rgba(24, 23, 19, 0.62); text-transform: uppercase;
  }
  h1 {
    font-family: "Radley", Georgia, serif; font-weight: 400;
    font-size: 132px; line-height: 1.02; margin-top: 26px;
    letter-spacing: -0.01em;
  }
  .line {
    margin-top: 30px; font-size: 27px; line-height: 1.45;
    color: rgba(24, 23, 19, 0.78); max-width: 30ch;
  }
  .url {
    position: absolute; left: 92px; bottom: 64px;
    font-size: 19px; font-weight: 600; letter-spacing: 0.02em;
    color: rgba(24, 23, 19, 0.66);
  }
  .counter {
    position: absolute; right: 92px; bottom: 64px;
    font-size: 19px; color: rgba(24, 23, 19, 0.66);
  }
</style>
</head>
<body>
  <div class="frame" aria-hidden="true"></div>
  <div class="inner">
    <p class="eyebrow">Oryx Institute · Ventures · The first</p>
    <h1>Corner Spa</h1>
    <p class="line">With Mendozer — wellness and service operations, Windhoek.</p>
  </div>
  <p class="url">oryxinstitute.org/corner-spa</p>
  <p class="counter">spa.mendozer.com</p>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, "public/brand/og/corner-spa.png") });
await browser.close();
console.log("og written: public/brand/og/corner-spa.png");
