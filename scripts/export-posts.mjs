// Generates data/posts.json — the search index consumed by SearchDrawer.
// Runs automatically before `next dev` / `next build` (see package.json).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const POSTS_DIR = path.join(ROOT, "posts");
const OUT_FILE = path.join(ROOT, "public", "posts.json");

function removeAccents(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, "A")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, "E")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[ÌÍỊỈĨ]/g, "I")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, "O")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, "U")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/[ỲÝỴỶỸ]/g, "Y")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// Extract the literal object that follows `export const <name> =` using
// brace-balancing, respecting strings. Returns the source slice or null.
function extractObjectLiteral(src, name) {
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
      if (depth === 0) return src.slice(braceStart, i + 1);
    }
  }
  return null;
}

function parseObject(literal) {
  // Posts are authored by the repo owner — trusted input, safe to eval.
  return new Function(`return (${literal});`)();
}

// Strip MDX scaffolding to leave just searchable prose.
function extractContent(src) {
  let body = src;
  body = body.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, "");
  body = body.replace(/^export\s+const\s+\w+\s*=\s*\{[\s\S]*?\n\};?\s*$/gm, "");
  body = body.replace(/<!--[\s\S]*?-->/g, "");
  body = body.replace(/```[\s\S]*?```/g, "");
  body = body.replace(/`[^`\n]+`/g, "");
  body = body.replace(/!\[[^\]]*\]\([^)]+\)/g, "");
  body = body.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  body = body.replace(/<[A-Za-z][\w.]*[^>]*\/>/g, "");
  body = body.replace(/<\/?[A-Za-z][\w.]*[^>]*>/g, "");
  body = body.replace(/^\s*>\s?/gm, "");
  body = body.replace(/^#{1,6}\s+/gm, "");
  body = body.replace(/^[-*_]{3,}\s*$/gm, "");
  body = body.replace(/(\*\*|__|~~)([\s\S]+?)\1/g, "$2");
  body = body.replace(/(?<![\w*])(\*|_)(?!\s)([^*_\n]+?)(?<!\s)\1(?![\w*])/g, "$2");
  body = body.replace(/\s+/g, " ").trim();
  return body;
}

function normalizeMetadata(m) {
  return {
    title: removeAccents(m.title || ""),
    author: removeAccents(m.author || ""),
    description: removeAccents(m.description || ""),
    category: removeAccents(m.category || ""),
  };
}

function normalizeDetail(d) {
  return {
    ...d,
    jp: removeAccents(d.jp || ""),
    vn: removeAccents(d.vn || ""),
    romaji: removeAccents(d.romaji || ""),
    publisher: removeAccents(d.publisher || ""),
    author: removeAccents(d.author || ""),
    illustrator: removeAccents(d.illustrator || ""),
    category: removeAccents(d.category || ""),
    safety: removeAccents(d.safety || ""),
  };
}

function readPost(filename) {
  const src = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const slug = filename.replace(/\.mdx$/, "");

  let metadata = { title: "Untitled", publishDate: "1970-01-01" };
  const metaLiteral = extractObjectLiteral(src, "metadata");
  if (metaLiteral) {
    try {
      metadata = parseObject(metaLiteral);
    } catch (err) {
      console.error(`[export-posts] Failed to parse metadata in ${filename}:`, err.message);
    }
  } else {
    console.warn(`[export-posts] No metadata export found in ${filename}`);
  }

  let detail = null;
  const detailLiteral = extractObjectLiteral(src, "detail");
  if (detailLiteral) {
    try {
      detail = parseObject(detailLiteral);
    } catch (err) {
      console.error(`[export-posts] Failed to parse detail in ${filename}:`, err.message);
    }
  }

  const content = extractContent(src);

  return {
    slug,
    metadata,
    ...(detail && { detail }),
    normalizedMetadata: normalizeMetadata(metadata),
    ...(detail && { normalizedDetail: normalizeDetail(detail) }),
    normalizedContent: removeAccents(content),
  };
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`[export-posts] posts/ directory not found at ${POSTS_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("."));

  const posts = files
    .map(readPost)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishDate).getTime() -
        new Date(a.metadata.publishDate).getTime()
    );

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2));

  console.log(`[export-posts] Wrote ${posts.length} posts to ${path.relative(ROOT, OUT_FILE)}`);
}

main();
