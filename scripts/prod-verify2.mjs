/* Corrected checks: label-based menu trigger + settled lazy images. */
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("https://www.oryxinstitute.org", { waitUntil: "networkidle", timeout: 45000 });

/* 1. menu label in the bar */
const menuLabel = await page.evaluate(() => {
  const l = document.querySelector("label.menu-summary");
  return l ? { text: l.innerText.trim(), inBar: !!l.closest(".header-bar") } : null;
});
console.log("menu label:", JSON.stringify(menuLabel));

/* 2. click it, panel opens with lang + clock */
await page.click("label.menu-summary");
await page.waitForTimeout(700);
const open = await page.evaluate(() => {
  const input = document.getElementById("site-menu-toggle");
  const panel = document.getElementById("site-menu-panel");
  return {
    checked: input?.checked ?? false,
    panelVisible: panel ? getComputedStyle(panel).visibility !== "hidden" && panel.getBoundingClientRect().width > 0 : false,
    bodyText: document.body.innerText,
  };
});
console.log("menu open:", JSON.stringify({ checked: open.checked, panelVisible: open.panelVisible }));
console.log("afrikaans in menu:", /afrikaans/i.test(open.bodyText));
console.log("windhoek in menu:", /windhoek/i.test(open.bodyText));
console.log("lang note:", /both languages/i.test(open.bodyText));
await page.screenshot({ path: "/home/z/oryx-audit/prod-menu-open.png" });

/* 3. close via Escape / close label */
await page.click("label.menu-summary").catch(() => {});
await page.waitForTimeout(500);
const closed = await page.evaluate(() => document.getElementById("site-menu-toggle")?.checked);
console.log("menu closed:", closed === false);

/* 4. lazy images settle: scroll through the page, then re-check every img */
await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const step = () => {
      y += 600;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 120);
      else { window.scrollTo(0, 0); setTimeout(res, 400); }
    };
    step();
  });
});
await page.waitForTimeout(1500);
const imgs = await page.evaluate(() =>
  Array.from(document.querySelectorAll("img")).map((i) => ({
    src: (i.currentSrc || i.src).split("/").pop().slice(0, 70),
    broken: i.complete && i.naturalWidth === 0,
  }))
);
console.log("images:", imgs.length, "broken:", imgs.filter((i) => i.broken).length);
imgs.filter((i) => i.broken).forEach((i) => console.log("  BROKEN:", i.src));

/* 5. search dialog opens */
await page.click(".search-trigger");
await page.waitForTimeout(600);
const searchOpen = await page.evaluate(() => !!document.querySelector("dialog[open], [role='dialog']:not([hidden])"));
console.log("search dialog opens:", searchOpen);
await page.screenshot({ path: "/home/z/oryx-audit/prod-search-open.png" });

console.log("console errors:", errors.length, errors.slice(0, 3));
await browser.close();
