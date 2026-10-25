/* Correct motion probes for the scrollcraft engine. */
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

/* engine file ships */
const engine = await page.request.get("https://www.oryxinstitute.org/scrollcraft/scrollcraft.js");
console.log("engine js:", engine.status(), (await engine.text()).length, "bytes");

await page.goto("https://www.oryxinstitute.org", { waitUntil: "networkidle", timeout: 45000 });
const before = await page.evaluate(() => ({
  scInHooks: document.querySelectorAll("[data-sc-in]").length,
  scReady: document.documentElement.classList.contains("sc-ready"),
  engineLoaded: !!window.ScrollCraft,
}));
console.log("before interaction:", JSON.stringify(before));

/* interact: scroll fires the arm */
await page.mouse.wheel(0, 800);
await page.waitForTimeout(1200);
const after = await page.evaluate(() => ({
  scReady: document.documentElement.classList.contains("sc-ready"),
  engineLoaded: !!window.ScrollCraft,
  scInApplied: document.querySelectorAll(".sc-in").length,
  scInstant: document.querySelectorAll(".sc-instant").length,
}));
console.log("after scroll:", JSON.stringify(after));

/* keep scrolling: reveals keep applying deeper down the page */
await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 800;
    const step = () => {
      y += 500;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 150);
      else res();
    };
    step();
  });
});
await page.waitForTimeout(800);
const deep = await page.evaluate(() => ({
  scInApplied: document.querySelectorAll(".sc-in").length,
  totalHooks: document.querySelectorAll("[data-sc-in]").length,
}));
console.log("after deep scroll:", JSON.stringify(deep));

/* another route: engine survives navigation via teardown+remount */
await page.goto("https://www.oryxinstitute.org/programmes", { waitUntil: "networkidle" });
await page.mouse.wheel(0, 600);
await page.waitForTimeout(1000);
const programmes = await page.evaluate(() => ({
  scReady: document.documentElement.classList.contains("sc-ready"),
  scInApplied: document.querySelectorAll(".sc-in").length,
}));
console.log("programmes:", JSON.stringify(programmes));

/* AF route motion too */
await page.goto("https://www.oryxinstitute.org/af", { waitUntil: "networkidle" });
await page.mouse.wheel(0, 600);
await page.waitForTimeout(1000);
const afMotion = await page.evaluate(() => ({
  scReady: document.documentElement.classList.contains("sc-ready"),
  scInApplied: document.querySelectorAll(".sc-in").length,
}));
console.log("af:", JSON.stringify(afMotion));

/* reduced motion: nothing hidden */
const rm = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--x") || "n/a");
console.log("console errors:", errors.length, errors.slice(0, 2));
await browser.close();
