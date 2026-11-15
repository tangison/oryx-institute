#!/usr/bin/env node

/**
 * Current public-surface smoke checks. Run against a local production
 * server with BASE=http://localhost:3000 node scripts/fix-verify.mjs.
 */

const BASE = (process.env.BASE || "http://localhost:3000").replace(/\/$/, "");
const current = [
  "/",
  "/af",
  "/links",
  "/af/links",
  "/status",
  "/af/status",
  "/research",
  "/practice",
  "/ventures",
  "/register",
  "/about",
  "/contact",
  "/faq",
  "/apply",
  "/sitemap.xml",
  "/md",
  "/md/status",
];
const retired = [
  "/resources",
  "/resources/nda-template",
  "/af/resources",
  "/about/staff",
  "/practice/safety-officer-course",
  "/apply/owners-desk",
];

let failures = 0;
function check(name, pass, detail = "") {
  console.log(`${pass ? "PASS" : "FAIL"} ${name}${detail ? `: ${detail}` : ""}`);
  if (!pass) failures += 1;
}

for (const path of current) {
  const response = await fetch(`${BASE}${path}`, { redirect: "manual" });
  check(`${path} is available`, response.status === 200, String(response.status));
}

for (const path of retired) {
  const response = await fetch(`${BASE}${path}`, { redirect: "manual" });
  check(
    `${path} is retired`,
    response.status === 410 && response.headers.get("x-robots-tag") === "noindex, nofollow",
    `${response.status}; ${response.headers.get("x-robots-tag") ?? "no robots header"}`
  );
}

const [links, status, contact, sitemap] = await Promise.all([
  fetch(`${BASE}/links`).then((response) => response.text()),
  fetch(`${BASE}/status`).then((response) => response.text()),
  fetch(`${BASE}/contact`).then((response) => response.text()),
  fetch(`${BASE}/sitemap.xml`).then((response) => response.text()),
]);

for (const value of [
  "info@oryxinstitute.org",
  "+264836764338",
  "P.O. Box 1662, Windhoek, Namibia",
  "oryx-links-qr.svg",
  "https://www.threads.com/@oryx_institute?igshid=NTc4MTIwNjQ2YQ==",
  "Official Oryx channel",
  "No official Business Profile is claimed.",
]) {
  check(`Link Hub includes ${value}`, links.includes(value));
}
check(
  "Link Hub does not claim a Maps profile is indexing",
  !links.includes("Temporary map search while the new profile is indexed")
);
check(
  "Contact states the approved NTA-registration status",
  contact.includes("working toward NTA training-provider registration") &&
    contact.includes("not registered or accredited")
);
check(
  "Contact does not conflate NTA registration and NQA accreditation",
  !contact.includes("Pursuing accreditation with the NQA and the NTA")
);
for (const value of [
  "Status as at",
  "2026-11-13",
]) {
  check(`Status includes ${value}`, status.includes(value));
}
for (const value of [
  "https://www.nta.com.na/registration-tp/",
  "https://namqa.org/",
  "https://tangison.com/",
]) {
  check(`Status links ${value}`, status.includes(value));
}
check(
  "Sitemap omits retired routes",
  !/resources|about\/staff|safety-officer|apply\/(?:owners|market|business|it|rapid|safety)/.test(sitemap)
);

if (failures) process.exit(1);
console.log("All public-surface smoke checks passed.");
