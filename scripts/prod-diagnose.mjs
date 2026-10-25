/* Focused diagnostic for the two home-page problems. */
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://www.oryxinstitute.org", { waitUntil: "load", timeout: 45000 });
await page.waitForTimeout(1200);

/* offer plates: find the failing one */
const plates = await page.evaluate(() =>
  Array.from(document.querySelectorAll("img")).map((i) => ({
    src: (i.currentSrc || i.src).split("/").pop().slice(0, 90),
    offer: !!i.closest("[class*='offer']"),
    complete: i.complete,
    w: i.naturalWidth,
    loading: i.getAttribute("loading"),
    cls: (i.className || "").slice(0, 60),
  }))
);
console.log("== images on home ==");
plates.forEach((p) => console.log(JSON.stringify(p)));

/* header buttons: what do they actually look like */
const headerBits = await page.evaluate(() => {
  const h = document.querySelector("header");
  if (!h) return "NO HEADER";
  return {
    buttons: Array.from(h.querySelectorAll("button")).map((b) => ({
      text: (b.innerText || "").slice(0, 30),
      aria: b.getAttribute("aria-label"),
      cls: (b.className || "").slice(0, 60),
    })),
    headerCls: h.className.slice(0, 120),
  };
});
console.log("== header ==");
console.log(JSON.stringify(headerBits, null, 1));

/* is there a menu control outside header? */
const anyMenu = await page.evaluate(() =>
  Array.from(document.querySelectorAll("button, [role='button'], a"))
    .filter((el) => /menu|open|nav/i.test(el.getAttribute("aria-label") || "") || /menu/i.test(el.innerText || ""))
    .map((el) => ({ tag: el.tagName, text: (el.innerText || "").slice(0, 20), aria: el.getAttribute("aria-label"), inHeader: !!el.closest("header") }))
);
console.log("== menu-ish controls ==");
console.log(JSON.stringify(anyMenu, null, 1));

await browser.close();
