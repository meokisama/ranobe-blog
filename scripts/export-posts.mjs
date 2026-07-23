// Generates public/posts.json — the search index consumed by SearchFunction.
// Runs automatically before `next dev` / `next build` (see package.json).
//
// Posts are Keystatic-authored MDX: YAML frontmatter (metadata) + a body that
// may contain a <SeriesDetail .../> block carrying the light-novel detail fields.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { removeAccents } from "../lib/remove-accents.mjs";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const POSTS_DIR = path.join(ROOT, "posts");
const OUT_FILE = path.join(ROOT, "public", "posts.json");

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

// Pull the <SeriesDetail .../> attributes out of the body, if present.
function extractDetail(body) {
  const tag = /<SeriesDetail\b([^>]*)\/>/.exec(body);
  if (!tag) return null;
  const detail = {};
  const attrRe = /(\w+)="([^"]*)"/g;
  let m;
  while ((m = attrRe.exec(tag[1])) !== null) {
    detail[m[1]] = m[2].replace(/&quot;/g, '"');
  }
  // Ensure every known key exists (empty ones were omitted during authoring).
  for (const k of DETAIL_KEYS) if (!(k in detail)) detail[k] = "";
  return detail;
}

// Strip MDX/markdown scaffolding to leave just searchable prose.
function extractContent(src) {
  let body = src;
  body = body.replace(/<SeriesDetail\b[^>]*\/>/g, "");
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
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const slug = filename.replace(/\.mdx$/, "");

  const { data: metadata, content: body } = matter(raw);
  if (!metadata || !metadata.title) {
    console.warn(`[export-posts] Missing/empty frontmatter in ${filename}`);
  }

  const detail = extractDetail(body);
  const content = extractContent(body);

  return {
    slug,
    metadata,
    ...(detail && { detail }),
    normalizedMetadata: normalizeMetadata(metadata || {}),
    ...(detail && { normalizedDetail: normalizeDetail(detail) }),
    normalizedContent: removeAccents(content),
  };
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`[export-posts] posts/ directory not found at ${POSTS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") && !f.startsWith("."));

  const posts = files.map(readPost).sort((a, b) => new Date(b.metadata.publishDate).getTime() - new Date(a.metadata.publishDate).getTime());

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2));

  console.log(`[export-posts] Wrote ${posts.length} posts to ${path.relative(ROOT, OUT_FILE)}`);
}

main();
