/**
 * Round screenshots: the Corner Spa page (desktop hero, scrolled state
 * with the widgets visible, mobile). From the repo root:
 *   node scripts/shots-round.mjs [baseURL]
 */
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3117";
const browser = await chromium.launch();

const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`${base}/corner-spa`, { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
await p.screenshot({ path: "/tmp/render/corner-hero.png" });
await p.evaluate(() => window.scrollTo(0, 2200));
await p.waitForTimeout(1200);
await p.screenshot({ path: "/tmp/render/corner-scrolled.png" });

const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(`${base}/corner-spa`, { waitUntil: "networkidle" });
await m.waitForTimeout(1500);
await m.screenshot({ path: "/tmp/render/corner-mobile.png" });

await browser.close();
console.log("shots done");
