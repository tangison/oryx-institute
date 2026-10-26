/**
 * LCP diagnostic: emulate Lighthouse mobile conditions (slow 4G,
 * 4x CPU) and report the LCP element and the resource timings that
 * feed it.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3117";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 412, height: 823 } });
const page = await ctx.newPage();

const cdp = await ctx.newCDPSession(page);
// Lighthouse mobile: slow 4G (1.6 Mbps down, 750 Kbps up, 150ms RTT)
await cdp.send("Network.enable");
await cdp.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
});
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

await page.goto(BASE + "/", { waitUntil: "load" });

const diag = await page.evaluate(
  () =>
    new Promise((resolve) => {
      let lcp = null;
      const po = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length) lcp = entries[entries.length - 1];
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });
      setTimeout(() => {
        const res = performance.getEntriesByType("resource")
          .filter((r) => /image|font|_next\/image/.test(r.name))
          .sort((a, b) => b.duration - a.duration)
          .slice(0, 10)
          .map((r) => ({
            ms: Math.round(r.duration),
            size: r.transferSize,
            start: Math.round(r.startTime),
            url: r.name.replace(location.origin, "").slice(0, 90),
          }));
        let el = null;
        if (lcp?.element) {
          const cs = getComputedStyle(lcp.element);
          el = {
            tag: lcp.element.tagName + "." + String(lcp.element.className).slice(0, 40),
            size: Math.round(lcp.size),
            url: lcp.url?.replace(location.origin, "").slice(0, 100),
          };
        }
        resolve({ lcpMs: Math.round(lcp?.startTime ?? 0), el, res });
      }, 4500);
    })
);

console.log("LCP:", diag.lcpMs + "ms");
console.log("LCP element:", JSON.stringify(diag.el));
console.log("slowest resources:");
diag.res.forEach((r) => console.log(`  ${r.ms}ms ${r.size}B @${r.start}ms ${r.url}`));

await browser.close();
