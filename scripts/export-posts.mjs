// Generates public/posts.json, the search palette's full-text index. Runs before `next dev` and `next build`.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = path.join(ROOT, "posts");
const OUT_FILE = path.join(ROOT, "public", "posts.json");

const norm = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

function detailText(body) {
  const tag = /<SeriesDetail\b([^>]*)\/>/.exec(body);
  if (!tag) return "";
  const out = [];
  const re = /(\w+)="([^"]*)"/g;
  let m;
  while ((m = re.exec(tag[1])) !== null) {
    if (!m[1].endsWith("_url")) out.push(m[2]);
  }
  return out.join(" ");
}

function plainText(src) {
  return src
    .replace(/<SeriesDetail\b[^>]*\/>/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<\/?[A-Za-z][^>]*>/g, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/[#*_~`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") && !f.startsWith("."));

const posts = files
  .map((filename) => {
    const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, filename), "utf8"));
    return {
      slug: filename.replace(/\.mdx$/, ""),
      title: data.title ?? "",
      category: data.category ?? "",
      date: data.publishDate ?? "",
      thumbnail: data.thumbnail ?? "",
      // Search haystacks, accent-stripped and lower-cased.
      t: norm(data.title),
      d: norm(`${data.description ?? ""} ${data.author ?? ""} ${data.category ?? ""} ${detailText(content)}`),
      c: norm(plainText(content)),
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(OUT_FILE, JSON.stringify(posts));
console.log(`[export-posts] Wrote ${posts.length} posts to ${path.relative(ROOT, OUT_FILE)}`);
