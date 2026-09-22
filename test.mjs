import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = here;
const html = await readFile(join(here, "index.html"), "utf8");
const css = await readFile(join(here, "styles.css"), "utf8");
const js = await readFile(join(here, "app.js"), "utf8");
const wordmark = await readFile(join(root, "assets/brand/orlyva-wordmark.png"));

const assertions = [
  [html.includes("Every order, beautifully managed."), "tagline is present"],
  [html.includes("https://app.orlyva.co/auth/sign-up"), "signup CTA targets seller app"],
  [html.includes("https://app.orlyva.co/auth/sign-in"), "signin CTA targets seller app"],
  [html.includes("/assets/orlyva-wordmark.png"), "official wordmark is referenced"],
  [html.includes("/assets/lyva-logo.png"), "official LYVA image is referenced"],
  [!/(Stage\s+\d|STAGE\s+\d|ATELIER LEDGER|STUDY\s+[A-Z])/i.test(html), "internal build labels are absent"],
  [!/(coming soon|later ORLYVA phase)/i.test(html), "roadmap placeholders are absent"],
  [!/(paypal|maya|airwallex|shopee|lazada|tiktok)/i.test(html), "pending provider claims are absent"],
  [css.includes("@media (prefers-reduced-motion: reduce)"), "reduced-motion CSS is present"],
  [js.includes("IntersectionObserver"), "soft reveal behavior is progressive"],
  [createHash("sha256").update(wordmark).digest("hex") === "6c7dc27a36cb64032cf78de0bdf055b459503154e67c948776c6ced7f503fc0d", "wordmark hash is canonical"],
];

let failed = 0;
for (const [condition, message] of assertions) {
  if (!condition) {
    failed += 1;
    console.error("FAIL:", message);
  } else {
    console.log("PASS:", message);
  }
}

if (failed) process.exit(1);
console.log(`Marketing source contract: ${assertions.length}/${assertions.length} PASS`);
