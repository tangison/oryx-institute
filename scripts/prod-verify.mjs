/* Production verification pass for oryxinstitute.org
   Rounds covered: floating header on hero, language in menu,
   offer plates, imagery, console errors, overflow at 3 viewports. */
import { chromium } from "playwright";

const BASE = "https://www.oryxinstitute.org";
const routes = [
  "", "about", "apply", "brand", "contact", "faq", "news",
  "programmes", "research", "resources", "schools", "tools", "ventures",
];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const problems = [];
const notes = [];
let checks = 0;
const ok = (cond, label) => {
  checks++;
  if (!cond) problems.push(label);
};

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  for (const r of routes) {
    const url = `${BASE}/${r}`.replace(/\/$/, "") || BASE + "/";
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    } catch {
      // networkidle can hang on long sliders; fall back to load
      await page.goto(url, { waitUntil: "load", timeout: 45000 });
    }
    await page.waitForTimeout(700);

    const tag = `${vp.name} /${r}`;

    /* 1. zero console errors */
    ok(errors.length === 0, `${tag}: console errors ${JSON.stringify(errors.slice(0, 2))}`);
    errors.length = 0;

    /* 2. no horizontal overflow */
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(overflow <= 0, `${tag}: horizontal overflow ${overflow}px`);

    if (r === "") {
      /* 3. header flush at the top edge */
      const barTop = await page.evaluate(() => Math.round(document.querySelector("header")?.getBoundingClientRect().top ?? -999));
      ok(barTop === 0, `${tag}: header top ${barTop}px, must be 0`);

      /* 4. hero field runs behind the bar (bar overlaps hero container) */
      const heroRect = await page.evaluate(() => {
        const h = document.querySelector("main section, main [class*='hero'], main > *");
        return h ? h.getBoundingClientRect().top : null;
      });
      ok(heroRect !== null && heroRect <= 0, `${tag}: hero top ${heroRect}px, must reach y<=0 behind bar`);

      /* 5. language toggle NOT in the bar */
      const barText = await page.evaluate(() => document.querySelector("header")?.innerText ?? "");
      ok(!/afrikaans|english/i.test(barText), `${tag}: language words found in bar: ${barText.slice(0, 60)}`);

      /* 6. offer plates render and load */
      const plates = await page.evaluate(() =>
        Array.from(document.querySelectorAll("img")).filter((i) => i.closest("[class*='offer']"))
      );
      ok(plates.length >= 6, `${tag}: offer plates found ${plates.length}, need >=6`);
      const platesLoaded = plates.every((i) => i.complete && i.naturalWidth > 0);
      ok(platesLoaded, `${tag}: an offer plate failed to load`);

      /* screenshots for the record */
      await page.screenshot({ path: `/home/z/oryx-audit/prod-home-${vp.name}.png`, fullPage: false });

      /* 7. menu opens: language switch + clock inside */
      const menuBtn = page.locator("header button", { hasText: /menu/i }).first();
      if (await menuBtn.count()) {
        await menuBtn.click();
        await page.waitForTimeout(600);
        const menuText = await page.evaluate(() => document.body.innerText);
        ok(/afrikaans/i.test(menuText), `${tag}: menu lacks Afrikaans switch`);
        ok(/windhoek/i.test(menuText), `${tag}: menu lacks Windhoek clock`);
        await page.screenshot({ path: `/home/z/oryx-audit/prod-menu-${vp.name}.png` });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(400);
      } else {
        ok(false, `${tag}: no menu button found`);
      }
    }

    /* 8. all images load on every route */
    const badImgs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img"))
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.getAttribute("src")?.slice(0, 80))
    );
    ok(badImgs.length === 0, `${tag}: broken images ${JSON.stringify(badImgs.slice(0, 3))}`);
  }
  await ctx.close();
}

/* 9. desktop-only: search affordance in the bar */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "load" });
  const searchBtn = page.locator("header button[aria-label*='earch' i], header [class*='search']").first();
  ok(await searchBtn.count() > 0, "desktop: no search affordance in bar");
  if (await searchBtn.count()) {
    await searchBtn.click().catch(() => {});
    await page.waitForTimeout(500);
    await page.screenshot({ path: "/home/z/oryx-audit/prod-search.png" });
  }
  await ctx.close();
}

await browser.close();
console.log(`CHECKS: ${checks}, PROBLEMS: ${problems.length}`);
problems.forEach((p) => console.log("  ✗ " + p));
if (!problems.length) console.log("  all green");
