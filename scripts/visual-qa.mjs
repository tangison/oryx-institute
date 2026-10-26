/**
 * Visual QA: screenshots of every page plus the pinned states
 * (engines cross-fade, practice peak scrim, close CTA scrim).
 */
import { chromium } from "playwright";
import fs from "fs";

const BASE = "http://localhost:3117";
const OUT = "/home/z/oryx-audit";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function shots(viewport, tag, isMobile = false) {
  const ctx = await browser.newContext({ viewport, hasTouch: isMobile, isMobile });
  const page = await ctx.newPage();

  // Homepage pinned states
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.mouse.wheel(0, 200);
  await page.waitForTimeout(1000);

  const pins = await page.$$eval('[data-sc-act="pin"]', (acts) =>
    acts.map((a) => {
      const r = a.getBoundingClientRect();
      return { top: r.top + window.scrollY, h: r.height };
    })
  );

  // hero
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/fix-${tag}-hero.png` });

  // engines pin: 50% (row 2 cross-faded)
  await page.evaluate((y) => window.scrollTo(0, y), pins[0].top + pins[0].h * 0.5);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/fix-${tag}-engines-mid.png` });

  // engines pin: 90% (row 3)
  await page.evaluate((y) => window.scrollTo(0, y), pins[0].top + pins[0].h * 0.88);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/fix-${tag}-engines-end.png` });

  // practice peak: 40% (scrim arrived)
  await page.evaluate((y) => window.scrollTo(0, y), pins[1].top + pins[1].h * 0.35);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/fix-${tag}-practice-peak.png` });

  // offers section
  const offersY = await page.$eval("#what-runs", (el) => el.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y - 60), offersY);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/fix-${tag}-offers.png` });

  // close CTA: 30%
  await page.evaluate((y) => window.scrollTo(0, y), pins[2].top + pins[2].h * 0.3);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/fix-${tag}-close.png` });

  // footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/fix-${tag}-footer.png` });

  await ctx.close();
}

await shots({ width: 1440, height: 900 }, "desktop");

// full-page shots of every route (desktop)
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
for (const r of ["/", "/practice", "/register", "/ventures", "/about", "/research", "/contact", "/faq", "/apply", "/resources", "/legal/privacy"]) {
  await page.goto(BASE + r, { waitUntil: "load" });
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const name = r === "/" ? "home" : r.replaceAll("/", "-").replace(/^-/, "");
  await page.screenshot({ path: `${OUT}/fix-page-${name}.png`, fullPage: true });
  console.log("shot", r);
}
await ctx.close();

// mobile homepage states
await shots({ width: 390, height: 844 }, "mobile", true);

await browser.close();
console.log("done ->", OUT);
