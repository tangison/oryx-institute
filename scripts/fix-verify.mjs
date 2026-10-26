/**
 * Oryx Institute · production-fix verification gate.
 *
 * Runs against the local production build (next start) and checks
 * every item in the fix brief's verification gate:
 *
 *   1.  Every rendered nav + footer link resolves (no 404s).
 *   2.  /practice, /register, /legal/privacy, /legal/terms 200;
 *       /bulletin, /privacy, /terms redirect correctly.
 *   3.  /apply mailto assembly: fills the four fields, clicks, reads
 *       the prepared anchor href.
 *   4.  All ?for= deep links preselect the right option (EN + AF).
 *   5.  Offer rows: hairline only, no images, correct hrefs.
 *   6.  Homepage k-image act order: k01 k02 k03 k06 k05 k08 k07 k10.
 *   7.  GSAP ScrollTrigger loads; pins, hero parallax and reveals
 *       work on desktop; reduced motion disables everything.
 *   8.  Mobile: pins shorten, parallax reduced, no overflow.
 *   9.  Em-dash grep across all rendered routes: zero.
 *   10. Register prints "Date to be confirmed"; resources prints real
 *       counts; footer has no partner/studio outgoing links; socials
 *       are text links with correct URLs and target/rel.
 */

import { chromium } from "playwright";
import fs from "fs";

const BASE = process.env.BASE || "http://localhost:3117";
const OUT = "/home/z/oryx-audit";

let pass = 0, fail = 0;
const failures = [];
function check(name, ok, detail = "") {
  if (ok) { pass++; console.log(`  ok  ${name}`); }
  else { fail++; failures.push(`${name} ${detail}`); console.log(`FAIL  ${name} ${detail}`); }
}

const ROUTES = [
  "/", "/programmes", "/research", "/practice", "/ventures", "/register",
  "/schools", "/resources", "/tools", "/news", "/apply", "/contact",
  "/about", "/brand", "/faq", "/legal/privacy", "/legal/terms",
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  /* ---------- 1 + 2: routes and redirects ---------- */
  console.log("\n[1] routes resolve");
  for (const r of ROUTES) {
    const res = await fetch(BASE + r, { redirect: "manual" });
    check(`GET ${r}`, res.status === 200, `status ${res.status}`);
  }
  console.log("\n[2] redirects");
  for (const [src, want] of [
    ["/bulletin", "/resources#bulletin"],
    ["/privacy", "/legal/privacy"],
    ["/terms", "/legal/terms"],
    ["/af/bulletin", "/af/resources#bulletin"],
    ["/af/privacy", "/af/legal/privacy"],
  ]) {
    const res = await fetch(BASE + src, { redirect: "manual" });
    const loc = res.headers.get("location") || "";
    check(`${src} -> ${want}`, res.status === 308 && loc === want, `status ${res.status} loc ${loc}`);
  }

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  /* ---------- every rendered link resolves ---------- */
  console.log("\n[3] every rendered link resolves (home, practice, ventures, about, resources)");
  for (const route of ["/", "/practice", "/ventures", "/about", "/resources"]) {
    await page.goto(BASE + route, { waitUntil: "load" });
    const hrefs = await page.$$eval("a[href]", (as) =>
      as.map((a) => a.getAttribute("href")).filter((h) => h && h.startsWith("/"))
    );
    const unique = [...new Set(hrefs.map((h) => h.split("#")[0]))];
    for (const h of unique) {
      const res = await fetch(BASE + h, { redirect: "manual" });
      check(`link ${route} -> ${h}`, res.status < 400, `status ${res.status}`);
    }
  }

  /* ---------- 5 + 6: homepage structure ---------- */
  console.log("\n[4] homepage structure");
  await page.goto(BASE + "/", { waitUntil: "load" });
  const kinfolk = await page.$$eval("img", (imgs) =>
    imgs.map((i) => decodeURIComponent(i.getAttribute("src") || "")).filter((s) => s.includes("/images/kinfolk/"))
  );
  const want = ["k01", "k02", "k03", "k06", "k05", "k08", "k07", "k10"];
  const got = kinfolk.map((s) => s.match(/k\d+/)?.[0]);
  check("k-image act order", JSON.stringify(got) === JSON.stringify(want), JSON.stringify(got));

  const offerImgs = await page.$$eval(".offer img", (imgs) => imgs.length);
  check("offer rows carry no images", offerImgs === 0, `${offerImgs} imgs`);
  const cutoutRefs = await page.$$eval("img", (imgs) =>
    imgs.filter((i) => /cutout_|landscape_/.test(i.getAttribute("src") || "")).length
  );
  check("no cutout/landscape references", cutoutRefs === 0);

  const offerHrefs = await page.$$eval(".offer .offer-cta", (as) =>
    as.map((a) => a.getAttribute("href"))
  );
  const wantHrefs = [
    "/apply?for=owners-desk", "/apply?for=business-administration", "/apply?for=it",
    "/apply?for=market-rd", "/apply?for=rapid-response", "/resources",
  ];
  check("offer CTA deep links", JSON.stringify(offerHrefs) === JSON.stringify(wantHrefs), JSON.stringify(offerHrefs));

  const heroSee = await page.$eval('a[href="#what-runs"]', (a) => !!a).catch(() => false);
  check("hero anchor CTA present", heroSee);
  const heroApply = await page.$eval('.hero a[href="/apply"]', (a) => !!a).catch(() => false);
  check("hero apply CTA present", heroApply);

  const registerText = await page.textContent(".ledger");
  check("register prints Date to be confirmed", registerText.includes("Date to be confirmed"));
  check("register has real dates", registerText.includes("25 Oct 2026") && registerText.includes("18 Oct 2026"), registerText.slice(0, 120));
  check("no Undated concatenation", !registerText.includes("Undateddate"));

  /* ---------- 10: footer ---------- */
  console.log("\n[5] footer");
  const footerHtml = await page.$eval(".site-footer", (f) => f.outerHTML);
  check("no mendozer link", !footerHtml.includes("mendozer.com"));
  check("no tangison.com link", !footerHtml.includes("tangison.com"));
  check("no studio.tangison link", !footerHtml.includes("studio.tangison.com"));
  check("built-by credit present", footerHtml.includes("Built by Tangison"));
  const socials = await page.$$eval(".foot-social a", (as) =>
    as.map((a) => ({ text: a.textContent.trim(), href: a.getAttribute("href"), target: a.getAttribute("target"), rel: a.getAttribute("rel") }))
  );
  check("three social links", socials.length === 3, JSON.stringify(socials));
  const ig = socials.find((s) => s.text === "Instagram");
  const fb = socials.find((s) => s.text === "Facebook");
  const li = socials.find((s) => s.text === "LinkedIn");
  check("Instagram URL+tab", ig && ig.href === "https://instagram.com/oryx_institute" && ig.target === "_blank" && /noopener/.test(ig.rel || ""), JSON.stringify(ig));
  check("Facebook URL+tab", fb && fb.href === "https://facebook.com/oryxinstitute" && fb.target === "_blank" && /noopener/.test(fb.rel || ""));
  check("LinkedIn URL+tab", li && li.href === "https://www.linkedin.com/company/oryx-polytechnic-institute/" && li.target === "_blank" && /noopener/.test(li.rel || ""));
  const footPlace = await page.$eval(".foot-place", (p) => p.textContent).catch(() => "");
  check("WINDHOEK · EST. 2026 in footer", /windhoek/i.test(footPlace) && /2026/.test(footPlace), footPlace);

  /* ---------- GSAP motion ---------- */
  console.log("\n[6] GSAP ScrollTrigger, desktop");
  await page.goto(BASE + "/", { waitUntil: "load" });
  // arm the engine (poll: on real networks the dynamic import takes longer)
  await page.mouse.wheel(0, 200);
  await page.waitForFunction(() => document.documentElement.classList.contains("sc-ready"), { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(400);
  const gsapInfo = await page.evaluate(async () => {
    const spacers = document.querySelectorAll(".pin-spacer").length;
    const stages = document.querySelectorAll('[data-sc-act="pin"] [data-sc-stage]').length;
    const ready = document.documentElement.classList.contains("sc-ready");
    /* Real evidence: fetch every loaded chunk and look for GSAP's
       own signature strings inside the code. */
    let chunkUrls = performance.getEntriesByType("resource")
      .map((r) => r.name).filter((n) => /static\/(immutable\/)?chunks\/.*\.js/.test(n));
    if (chunkUrls.length === 0) {
      /* Some contexts clear resource timing; fall back to the
         document's own script tags. */
      chunkUrls = [...document.querySelectorAll("script[src]")]
        .map((s) => s.src).filter((n) => /static\/(immutable\/)?chunks\/.*\.js/.test(n));
    }
    let gsapInChunk = false;
    for (const c of chunkUrls.slice(0, 60)) {
      try {
        const txt = await (await fetch(c)).text();
        if (/ScrollTrigger/.test(txt) && /gsap/.test(txt)) { gsapInChunk = true; break; }
      } catch {}
    }
    return { spacers, stages, ready, gsapInChunk, chunkCount: chunkUrls.length };
  });
  check("sc-ready armed", gsapInfo.ready);
  check("GSAP ScrollTrigger in loaded chunks", gsapInfo.gsapInChunk, JSON.stringify(gsapInfo));
  check("three pinned stages", gsapInfo.stages === 3, `${gsapInfo.stages}`);
  check("pin-spacers created", gsapInfo.spacers >= 3, `${gsapInfo.spacers}`);

  // hero parallax transforms
  const heroY = await page.evaluate(() => {
    const el = document.querySelector(".hero-media");
    return el ? getComputedStyle(el).transform : "none";
  });
  check("hero parallax transform active", heroY !== "none", heroY);

  // scroll through the engines pin and watch the rows cross-fade
  const engines = await page.evaluate(() => {
    const act = document.querySelector('[data-sc-act="pin"]');
    const r = act.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  });
  await page.evaluate((y) => window.scrollTo(0, y), engines.top + engines.height * 0.55);
  await page.waitForTimeout(400);
  const midRow = await page.$$eval('[data-sc-row]', (rows) =>
    rows.map((r) => getComputedStyle(r).opacity)
  );
  check("engines cross-fade mid-pin", parseFloat(midRow[0]) < 0.3 && parseFloat(midRow[1]) > 0.7, JSON.stringify(midRow));
  await page.evaluate((y) => window.scrollTo(0, y), engines.top + engines.height * 0.9);
  await page.waitForTimeout(400);
  const endRow = await page.$$eval('[data-sc-row]', (rows) =>
    rows.map((r) => getComputedStyle(r).opacity)
  );
  check("third engine visible at pin end", parseFloat(endRow[2]) > 0.7, JSON.stringify(endRow));

  // reveal classes applied after scroll
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(900);
  const revealInfo = await page.$$eval("[data-sc-in]", (els) => ({
    total: els.length,
    revealed: els.filter((e) => e.classList.contains("sc-in")).length,
    missing: els.filter((e) => !e.classList.contains("sc-in")).map((e) => e.className.slice(0, 60)),
  }));
  check("fade+rise reveals applied", revealInfo.revealed >= revealInfo.total - 1, JSON.stringify(revealInfo));

  await page.screenshot({ path: `${OUT}/fix-home-full.png`, fullPage: true });

  /* ---------- apply form ---------- */
  console.log("\n[7] apply mailto + deep links");
  for (const [url, wantSel] of [
    ["/apply?for=owners-desk", "Owner's Desk"],
    ["/apply?for=business-administration", "Business Administration"],
    ["/apply?for=it", "IT & Related Fields"],
    ["/apply?for=market-rd", "Market R&D"],
    ["/apply?for=rapid-response", "Rapid Response Training"],
  ]) {
    await page.goto(BASE + url, { waitUntil: "load" });
    await page.waitForTimeout(250);
    const val = await page.$eval("#af-discipline", (s) => s.value);
    check(`preselect ${url}`, val === wantSel, `got "${val}"`);
  }
  await page.goto(BASE + "/af/apply?for=it", { waitUntil: "load" });
  await page.waitForTimeout(250);
  const afVal = await page.$eval("#af-discipline", (s) => s.value);
  check("preselect AF /it", afVal.includes("IT"), afVal);

  // mailto assembly
  await page.goto(BASE + "/apply", { waitUntil: "load" });
  await page.fill("#af-name", "Test Applicant");
  await page.fill("#af-contact", "test@example.com");
  await page.selectOption("#af-discipline", "Owner's Desk");
  await page.fill("#af-message", "Hello from the audit.");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(300);
  const mailto = await page.$eval('a[data-mailto="prepared"]', (a) => a.getAttribute("href")).catch(() => null);
  check("mailto prepared", !!mailto, "no anchor");
  if (mailto) {
    check("mailto addressed to office", mailto.startsWith("mailto:info@oryxinstitute.org?"), mailto.slice(0, 40));
    const params = new URLSearchParams(mailto.split("?")[1]);
    const subject = params.get("subject") || "";
    const body = params.get("body") || "";
    check("mailto subject built", subject.includes("Test Applicant") && subject.includes("Owner's Desk"), subject);
    check("mailto body has all fields", body.includes("Test Applicant") && body.includes("test@example.com") && body.includes("Owner's Desk") && body.includes("Hello from the audit."), body.replace(/\n/g, " | "));
  }

  /* ---------- resources counts ---------- */
  console.log("\n[8] resources");
  await page.goto(BASE + "/resources", { waitUntil: "load" });
  const counts = await page.$$eval("#directory .meta.tnum, #directory p.meta", (els) => els.map((e) => e.textContent.trim()));
  const countsText = counts.join(" ");
  check("real course count printed", /4\s*courses/.test(countsText), countsText);
  check("real template count printed", /7\s*templates/.test(countsText), countsText);
  check("no zero-counter", !/0\s*courses|0\s*templates/.test(countsText), countsText);

  /* ---------- mobile ---------- */
  console.log("\n[9] mobile 390px");
  const mob = await ctx.browser().newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const mp = await mob.newPage();
  await mp.goto(BASE + "/", { waitUntil: "load" });
  await mp.mouse.wheel(0, 200);
  await mp.waitForFunction(() => document.documentElement.classList.contains("sc-ready"), { timeout: 15000 }).catch(() => {});
  await mp.waitForTimeout(400);
  const mobInfo = await mp.evaluate(() => {
    const act = document.querySelector('[data-sc-act="pin"]');
    const r = act.getBoundingClientRect();
    return {
      spacers: document.querySelectorAll(".pin-spacer").length,
      pinHeight: r.height,
      vh: window.innerHeight,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroTransform: getComputedStyle(document.querySelector(".hero-media")).transform,
    };
  });
  check("mobile pins exist", mobInfo.spacers >= 3, `${mobInfo.spacers}`);
  check("mobile pin shortened", mobInfo.pinHeight < mobInfo.vh * 4.6, `${mobInfo.pinHeight / mobInfo.vh}vh`);
  check("mobile no horizontal overflow", mobInfo.overflow <= 0, `${mobInfo.overflow}px`);
  check("mobile hero parallax active", mobInfo.heroTransform !== "none");
  await mp.screenshot({ path: `${OUT}/fix-home-mobile.png`, fullPage: true });
  await mob.close();

  /* ---------- reduced motion ---------- */
  console.log("\n[10] reduced motion");
  const rm = await ctx.browser().newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const rp = await rm.newPage();
  await rp.goto(BASE + "/", { waitUntil: "load" });
  await rp.mouse.wheel(0, 500);
  await rp.waitForTimeout(600);
  const rmInfo = await rp.evaluate(() => ({
    ready: document.documentElement.classList.contains("sc-ready"),
    spacers: document.querySelectorAll(".pin-spacer").length,
    heroTransform: getComputedStyle(document.querySelector(".hero-media")).transform,
    visible: (() => {
      const scrim = document.querySelector("[data-sc-scrim]");
      return scrim ? getComputedStyle(scrim).opacity : "1";
    })(),
    rowsVisible: [...document.querySelectorAll("[data-sc-row]")].every((r) => getComputedStyle(r).opacity === "1"),
  }));
  check("no sc-ready under reduced motion", !rmInfo.ready);
  check("no pins under reduced motion", rmInfo.spacers === 0, `${rmInfo.spacers}`);
  check("no parallax under reduced motion", rmInfo.heroTransform === "none");
  check("peak copy visible immediately", rmInfo.visible === "1", rmInfo.visible);
  check("all engine rows visible", rmInfo.rowsVisible);
  await rm.close();

  /* ---------- em dashes + ALL-CAPS audit across routes ---------- */
  console.log("\n[11] copy audit across routes");
  const capsAllowed = /^(WINDHOEK|EST\.?|BULLETIN|NO\.?|OCTOBER|DATE|TO|BE|CONFIRMED|DATUM|MOET|NOG|BEVESTIG|WORD|PRACTICE|TEACHING|RESEARCH|FREE|COURSE|TEMPLATE|PRIVACY|TERMS|BRAND|REGISTER|CONTACT|ABOUT|FAQ|SCHOOL|RESOURCES|NEWS|APPLY|PROGRAMMES|TOOLS|VENTURES|HELP|SEARCH|MENU|CLOSE|SKRYF|IN|KIESLYS|GIDS|HULPBRONNE|GEREEDSKAP|ONDERNEMINGS|NAVORSING|PROGRAMME|PRAKTYK|SOEK|TOEMAak|INSTITUUT|·|—)+$/i;
  for (const r of ROUTES.concat(["/af", "/af/practice", "/af/register"])) {
    const res = await fetch(BASE + r);
    const html = await res.text();
    const body = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
    const emdash = (body.match(/—/g) || []).length;
    check(`no em dash ${r}`, emdash === 0, `${emdash}`);
  }
  // uppercase-eyebrow scan on the homepage: no ALL-CAPS <p> except allowed
  const capsHits = await page.$$eval("p, span, li", (els) =>
    els.filter((e) => {
      const t = (e.textContent || "").trim();
      if (t.length < 4 || t.length > 40) return false;
      if (!/^[A-Z0-9 ·&/']+$/.test(t)) return false;
      if (e.closest(".offer") || e.closest(".ledger") || e.closest(".foot-place") || e.closest(".hero-tag") || e.closest(".caption")) return false;
      return /\s/.test(t);
    }).map((e) => t_short(e))
  );
  function t_short(e) { return e.textContent.trim().slice(0, 40); }
  check("no stray ALL-CAPS labels on home", capsHits.length === 0, JSON.stringify(capsHits));

  check("no console errors", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));

  await ctx.close();
  await browser.close();

  console.log(`\n========== ${pass} passed, ${fail} failed ==========`);
  if (failures.length) { console.log("FAILURES:"); failures.forEach((f) => console.log(" -", f)); process.exit(1); }
})().catch((e) => { console.error(e); process.exit(1); });
