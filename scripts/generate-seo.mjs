#!/usr/bin/env node
/**
 * Writes public/robots.txt and public/sitemap.xml from seo-audit.config.json.
 * lastmod is the last git commit date for the page source, or today when that file is dirty.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const config = JSON.parse(readFileSync(join(root, "seo-audit.config.json"), "utf8"));
const host = String(config.canonicalHost || "").replace(/\/+$/, "");
if (!host) throw new Error("seo-audit.config.json canonicalHost is required");

const publicDir = join(root, "public");
mkdirSync(publicDir, { recursive: true });

function git(args) {
  try {
    return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function sourceFile(urlPath) {
  const trimmed = (urlPath || "/").replace(/\/+$/, "") || "";
  if (!trimmed) return "src/index.html";
  return `${trimmed.replace(/^\//, "")}.html`;
}

function lastmodFor(relPath) {
  const committed = git(["log", "-1", "--format=%cI", "--", relPath]).slice(0, 10);
  const dirty = Boolean(git(["status", "--porcelain", "--", relPath]));
  if (dirty) return new Date().toISOString().slice(0, 10);
  return committed || "";
}

function absoluteUrl(path) {
  if (!path || path === "/") return `${host}/`;
  return path.startsWith("/") ? `${host}${path}` : `${host}/${path}`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const indexable = (config.pages || []).filter((page) => page.type !== "excluded");
const urlBlocks = indexable.map((page) => {
  const loc = absoluteUrl(page.path);
  const lastmod = lastmodFor(sourceFile(page.path));
  const lastmodLine = lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : "";
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmodLine}\n  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks.join("\n")}
</urlset>
`;

const robots = `Sitemap: ${host}/sitemap.xml
`;

writeFileSync(join(publicDir, "sitemap.xml"), sitemap);
writeFileSync(join(publicDir, "robots.txt"), robots);
