// Dependency-free guard checks. Run: npm run check
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const errors = [];
const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    if (["node_modules", ".git", "_site", "source"].includes(name)) continue;
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};
const files = walk(root);
const rel = (p) => p.slice(root.length + 1);

// 1. No TODO markers in published content
for (const f of ["index.html", "404.html", ...files.filter((x) => rel(x).startsWith("content/")).map(rel)]) {
  if (/TODO\(/.test(readFileSync(join(root, f), "utf8"))) errors.push(`TODO marker in ${f}`);
}
// 2. No inline scripts (except JSON-LD), no inline styles / handlers
const html = readFileSync(join(root, "index.html"), "utf8");
for (const m of html.matchAll(/<script(?![^>]*(src=|type="application\/ld\+json"))[^>]*>/g)) errors.push(`inline script: ${m[0]}`);
if (/\sstyle="/.test(html)) errors.push("inline style attribute in index.html");
if (/\son[a-z]+="/.test(html)) errors.push("inline event handler in index.html");
// 3. Local href/src targets exist
for (const m of html.matchAll(/(?:href|src)="([^"#:_][^"#:]*)"/g)) {
  if (!existsSync(join(root, m[1]))) errors.push(`missing file: ${m[1]}`);
}
// 4. Anchors resolve
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const m of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(m[1])) errors.push(`missing anchor #${m[1]}`);
// 5. JSON valid
for (const f of files.filter((x) => x.endsWith(".json") || x.endsWith(".webmanifest"))) {
  try { JSON.parse(readFileSync(f, "utf8")); } catch { errors.push(`invalid JSON: ${rel(f)}`); }
}
// 6. Identity documents must not be published or tracked-looking inside web dirs
for (const f of files.map(rel)) {
  if (/^(assets|css|js|content)\//.test(f) && /id-card|nid/i.test(f)) errors.push(`identity document inside web dir: ${f}`);
}
// 7. No console.log in js/
for (const f of files.filter((x) => rel(x).startsWith("js/"))) {
  if (/console\.log/.test(readFileSync(f, "utf8"))) errors.push(`console.log in ${rel(f)}`);
}

if (errors.length) { console.error(errors.map((e) => `✗ ${e}`).join("\n")); process.exit(1); }
console.log(`✓ all checks passed (${files.length} files scanned)`);
