// One-off migration: convert posts from JS-export MDX to Keystatic-friendly MDX.
//
//   export const metadata = {...}   ->  YAML frontmatter
//   export const detail = {...}     ->  <SeriesDetail jp="..." ... /> props (in body)
//   import SeriesDetail ...          ->  removed (registered globally in mdx-components)
//   <SeriesDetail detail={detail}/> ->  <SeriesDetail jp="..." ... />  (same position)
//
// Git is the safety net — inspect `git diff` before committing, revert with `git checkout` if needed.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const POSTS_DIR = path.join(ROOT, "posts");

const META_KEYS = ["title", "author", "thumbnail", "publishDate", "description", "category"];
const DETAIL_KEYS = [
  "jp",
  "vn",
  "romaji",
  "publisher",
  "author",
  "illustrator",
  "release",
  "category",
  "volume",
  "en_trans",
  "en_trans_url",
  "vi_trans",
  "vi_trans_url",
  "safety",
];

// Locate `export const <name> = { ... }` and return {start, end} indices spanning
// the whole statement (through the closing brace + optional semicolon), respecting strings.
function findExportSpan(src, name) {
  const anchor = new RegExp(`export\\s+const\\s+${name}\\s*=`);
  const match = anchor.exec(src);
  if (!match) return null;

  const braceStart = src.indexOf("{", match.index + match[0].length);
  if (braceStart === -1) return null;

  let depth = 0;
  let inStr = null;
  for (let i = braceStart; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") {
        i++;
        continue;
      }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = c;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        let end = i + 1;
        if (src[end] === ";") end++;
        return { start: match.index, end, literal: src.slice(braceStart, i + 1) };
      }
    }
  }
  return null;
}

function parseObject(literal) {
  return new Function(`return (${literal});`)();
}

// YAML double-quoted scalar — safe for any string (unicode, colons, quotes...).
function yamlStr(s) {
  return (
    '"' +
    String(s ?? "")
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\r?\n/g, "\\n") +
    '"'
  );
}

function buildFrontmatter(meta) {
  const lines = META_KEYS.filter((k) => meta[k] !== undefined).map((k) => `${k}: ${yamlStr(meta[k])}`);
  return `---\n${lines.join("\n")}\n---\n`;
}

// JSX attribute string value. No ASCII double-quotes exist in the data (verified),
// but escape defensively so the emitted tag is always valid.
function jsxAttr(s) {
  return String(s ?? "").replace(/"/g, "&quot;");
}

function buildSeriesDetailTag(detail) {
  const attrs = DETAIL_KEYS.filter((k) => detail[k] !== undefined && detail[k] !== "")
    .map((k) => `${k}="${jsxAttr(detail[k])}"`)
    .join(" ");
  return `<SeriesDetail ${attrs} />`;
}

function migrateFile(filename) {
  const filePath = path.join(POSTS_DIR, filename);
  const src = fs.readFileSync(filePath, "utf8");

  if (src.startsWith("---")) {
    return { filename, status: "skipped (already frontmatter)" };
  }

  const metaSpan = findExportSpan(src, "metadata");
  if (!metaSpan) {
    return { filename, status: "ERROR: no metadata export" };
  }
  const metadata = parseObject(metaSpan.literal);

  const detailSpan = findExportSpan(src, "detail");
  const detail = detailSpan ? parseObject(detailSpan.literal) : null;

  // Remove the export statements (remove detail first so metadata index stays valid).
  let body = src;
  const spans = [metaSpan, detailSpan].filter(Boolean).sort((a, b) => b.start - a.start);
  for (const span of spans) {
    body = body.slice(0, span.start) + body.slice(span.end);
  }

  // Remove the per-file SeriesDetail import (now global).
  body = body.replace(/^import\s+SeriesDetail\s+from\s+["'][^"']+["'];?\s*$/m, "");

  // Swap the JSX usage for flat props, in place.
  if (detail) {
    const tag = buildSeriesDetailTag(detail);
    if (/<SeriesDetail\b[^>]*\/>/.test(body)) {
      body = body.replace(/<SeriesDetail\b[^>]*\/>/, tag);
    } else {
      // Fallback: no tag in body — append after the first paragraph break.
      body = body.replace(/\n\n/, `\n\n${tag}\n\n`);
    }
  }

  // Tidy leading whitespace left by removed imports/exports.
  body = body.replace(/^\s+/, "");

  const out = buildFrontmatter(metadata) + "\n" + body.replace(/\s+$/, "") + "\n";
  fs.writeFileSync(filePath, out, "utf8");

  return { filename, status: detail ? "ok (+detail)" : "ok" };
}

function main() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") && !f.startsWith("."));
  const results = files.map(migrateFile);

  const ok = results.filter((r) => r.status.startsWith("ok")).length;
  const skipped = results.filter((r) => r.status.startsWith("skipped")).length;
  const errors = results.filter((r) => r.status.startsWith("ERROR"));

  for (const r of results) console.log(`  ${r.status.padEnd(28)} ${r.filename}`);
  console.log(`\n[migrate-posts] ${ok} migrated, ${skipped} skipped, ${errors.length} errors of ${files.length}`);
  if (errors.length) process.exit(1);
}

main();
