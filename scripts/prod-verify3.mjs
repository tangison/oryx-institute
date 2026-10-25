/* AF route + motion layer on production. */
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

/* AF home */
await page.goto("https://www.oryxinstitute.org/af", { waitUntil: "networkidle", timeout: 45000 });
const af = await page.evaluate(() => ({
  htmlLang: document.documentElement.lang,
  h1: document.querySelector("h1")?.innerText?.slice(0, 70),
  barWords: document.querySelector("header")?.innerText?.replace(/\s+/g, " ").slice(0, 120),
}));
console.log("AF:", JSON.stringify(af, null, 1));
await page.screenshot({ path: "/home/z/oryx-audit/prod-home-af.png" });

/* motion layer on EN home */
await page.goto("https://www.oryxinstitute.org", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(1000);
const motion = await page.evaluate(() => ({
  lenis: typeof window.__lenis !== "undefined" || document.documentElement.classList.contains("lenis"),
  revealHooks: document.querySelectorAll("[data-reveal],[data-reveal-group],[data-parallax]").length,
  splitTitles: document.querySelectorAll(".hero-word, [class*='split']").length,
  horizontalTracks: document.querySelectorAll("[class*='hs-'], [data-horizontal]").length,
  gsapGlobal: typeof window.gsap !== "undefined",
}));
console.log("motion:", JSON.stringify(motion));

/* scroll fires: ScrollTrigger moves a pinned track */
const before = await page.evaluate(() => window.scrollY);
await page.mouse.wheel(0, 1200);
await page.waitForTimeout(900);
const after = await page.evaluate(() => window.scrollY);
console.log("scroll moved:", before, "->", after, "(lenis driving:", after > before, ")");

console.log("console errors:", errors.length);
await browser.close();
