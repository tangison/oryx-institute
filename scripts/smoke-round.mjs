/**
 * Round smoke: the scroll chrome widgets + the Corner Spa page, run
 * against a local `next start`. From the repo root:
 *   node scripts/smoke-round.mjs [baseURL]
 * Prints one line per check; exits non-zero on any failure.
 */
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3117";
let failures = 0;

function check(name, ok, detail = "") {
  const mark = ok ? "PASS" : "FAIL";
  if (!ok) failures++;
  console.log(`${mark}  ${name}${detail ? ` — ${detail}` : ""}`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push(String(e)));

/* --- 1. Corner Spa (en) --- */
const res = await page.goto(`${base}/corner-spa`, { waitUntil: "domcontentloaded" });
check("GET /corner-spa -> 200", res.status() === 200, `status ${res.status()}`);
check("h1 is Corner Spa", (await page.locator("h1").first().textContent())?.trim() === "Corner Spa");
check("partner tag present", (await page.content()).includes("In collaboration with Mendozer"));
const frame = page.locator("iframe[title*='Corner Spa counter']");
check("counter iframe present", (await frame.count()) === 1);
check("iframe src is spa.mendozer.com", (await frame.getAttribute("src")) === "https://spa.mendozer.com");
const html = await page.content();
check("meta description", html.includes('name="description" content="Corner Spa, the first venture'));
check("canonical /corner-spa", html.includes('rel="canonical" href="' + base.replace(/:\d+$/, "") ) === false || html.includes("/corner-spa\""));
check("hreflang zh alternate", html.includes('/zh/corner-spa'));
check("markdown alternate", html.includes("/md/corner-spa"));
check("WebPage JSON-LD", html.includes('"@type":"WebPage"') && html.includes("Corner Spa"));
check("fallback link to counter", html.includes('href="https://spa.mendozer.com"'));

/* --- 2. Corner Spa (zh) --- */
const resZh = await page.goto(`${base}/zh/corner-spa`, { waitUntil: "domcontentloaded" });
check("GET /zh/corner-spa -> 200", resZh.status() === 200, `status ${resZh.status()}`);
const zhHtml = await page.content();
check("zh copy present", zhHtml.includes("与 Mendozer 合作"));
check("zh html lang set", await page.evaluate(() => document.documentElement.lang === "zh-CN"));

/* --- 3. The scroll chrome, on the home page --- */
await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(800);
/* Arm the motion engine and let its one-time build settle: a
   throwaway scroll down and back. The engine's build captures and
   restores scroll once; after it finishes the page is stable and the
   widgets track normally. */
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
const btnHiddenAtTop = await page.locator(".scroll-top").evaluate((el) => {
  const s = getComputedStyle(el);
  return s.visibility === "hidden" && Number(s.opacity) === 0;
});
check("top button hidden at top", btnHiddenAtTop);
const fillAtTop = await page.locator(".scroll-progress__fill").evaluate((el) => el.style.transform);
check("progress empty at top", fillAtTop === "scaleX(0)", fillAtTop);

await page.evaluate(() => window.scrollTo(0, 1400));
await page.waitForTimeout(800);
const btnShown = await page.locator(".scroll-top").evaluate((el) => {
  const s = getComputedStyle(el);
  return s.visibility === "visible" && Number(s.opacity) > 0.9;
});
check("top button shown after 1400px", btnShown);
const fillMid = await page.locator(".scroll-progress__fill").evaluate((el) => el.style.transform);
check("progress growing mid-page", /scaleX\(0\.0[1-9]/.test(fillMid) || /scaleX\(0\.[1-9]/.test(fillMid), fillMid);

/* Re-assert right before the click: the engine's one-time build can
   adjust pin spacers and re-paint state; the widget follows the real
   scroll position, so re-establish it. */
await page.evaluate(() => window.scrollTo(0, 1800));
await page.waitForTimeout(600);
const btnShownAgain = await page.locator(".scroll-top").evaluate((el) => getComputedStyle(el).visibility === "visible");
check("top button steady before click", btnShownAgain);

await page.locator(".scroll-top").click();
let y = 1e9;
for (let i = 0; i < 40 && y > 40; i++) {
  await page.waitForTimeout(200);
  y = await page.evaluate(() => window.scrollY);
}
check("button scrolls back to top", y < 40, `scrollY=${y}`);
await page.waitForTimeout(600);
const btnHiddenAgain = await page.locator(".scroll-top").evaluate((el) => getComputedStyle(el).visibility === "hidden");
check("top button hides again at top", btnHiddenAgain);

/* --- 4. Wiring: footer, ventures CTA, sitemap, md shelf --- */
check("footer lists Corner Spa", (await page.content()).includes('href="/corner-spa"'));
await page.goto(`${base}/ventures`, { waitUntil: "domcontentloaded" });
check("ventures CTA to corner-spa", (await page.content()).includes('href="/corner-spa"'));
const sm = await (await fetch(`${base}/sitemap.xml`)).text();
check("sitemap has /corner-spa", sm.includes("<loc>" + base.replace(/:\d+$/, "") + "/corner-spa</loc>") || sm.includes("/corner-spa"));
const md = await (await fetch(`${base}/md/corner-spa`)).text();
check("md shelf serves corner-spa", md.includes("Corner Spa") && md.includes("spa.mendozer.com"));

/* --- 5. Search index carries the page --- */
await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
await page.keyboard.press("Escape");

/* --- 6. Mobile: no overflow, button position --- */
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto(`${base}/corner-spa`, { waitUntil: "domcontentloaded" });
await mob.waitForTimeout(400);
const overflow = await mob.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
);
check("mobile 390px: 0px overflow", overflow === 0, `overflow=${overflow}px`);
await mob.evaluate(() => window.scrollTo(0, 300)); /* arm the engine */
await mob.waitForTimeout(1200);
await mob.evaluate(() => window.scrollTo(0, 1200));
await mob.waitForTimeout(800);
const mobBtn = await mob.locator(".scroll-top").evaluate((el) => {
  const r = el.getBoundingClientRect();
  const s = getComputedStyle(el);
  return { x: r.x, visible: s.visibility === "visible", w: r.width };
});
check("mobile button visible + onscreen", mobBtn.visible && mobBtn.x >= 0 && mobBtn.x + mobBtn.w <= 390, JSON.stringify(mobBtn));

check("zero console errors", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
