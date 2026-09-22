import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = here;
const dist = join(here, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "assets"), { recursive: true });

for (const file of ["index.html", "styles.css", "app.js", "robots.txt", "sitemap.xml"]) {
  await cp(join(here, file), join(dist, file));
}

for (const [source, target] of [
  ["assets/brand/orlyva-wordmark.png", "orlyva-wordmark.png"],
  ["assets/brand/lyva-logo.png", "lyva-logo.png"],
  ["assets/brand/phase11-entry-a-editorial.png", "editorial-study.png"],
]) {
  await cp(join(root, source), join(dist, "assets", target));
}

console.log("ORLYVA marketing build ready:", dist);
