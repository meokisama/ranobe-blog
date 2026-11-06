import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CATEGORIES, getCategoryByName } from "@/lib/site";

export interface SeriesDetail {
  jp: string;
  vn: string;
  romaji: string;
  publisher: string;
  author: string;
  illustrator: string;
  release: string;
  category: string;
  volume: string;
  en_trans: string;
  en_trans_url: string;
  vi_trans: string;
  vi_trans_url: string;
  safety: string;
}

export interface Post {
  slug: string;
  /** Full title as authored, e.g. "[Giáng sinh 2024] Ai đã sát hại anh hùng?" */
  fullTitle: string;
  /** Title without the leading [bracket] tag. */
  title: string;
  /** The leading [bracket] tag, if any. */
  kicker: string;
  author: string;
  thumbnail: string;
  date: string;
  description: string;
  category: string;
  categorySlug: string;
  readingMinutes: number;
  jp: string;
  romaji: string;
}

const POSTS_DIR = path.join(process.cwd(), "posts");

export function splitTitle(full: string): { kicker: string; title: string } {
  const m = /^\[(.+?)\]\s*(.+)$/.exec(full);
  return m ? { kicker: m[1], title: m[2] } : { kicker: "", title: full };
}

function attr(body: string, name: string): string {
  const tag = /<SeriesDetail\b([^>]*)\/>/.exec(body);
  if (!tag) return "";
  const m = new RegExp(`\\b${name}="([^"]*)"`).exec(tag[1]);
  return m ? m[1].replace(/&quot;/g, '"') : "";
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("."))
    .map((f) => f.replace(/\.mdx$/, ""));
}

let cache: Post[] | null = null;

/** Every post's metadata, newest first. Read straight from frontmatter. */
export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const posts = getPostSlugs().map((slug): Post => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    const fullTitle = String(data.title ?? "Untitled");
    const words = content
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;

    return {
      slug,
      fullTitle,
      ...splitTitle(fullTitle),
      author: String(data.author ?? ""),
      thumbnail: String(data.thumbnail ?? ""),
      date: String(data.publishDate ?? "1970-01-01"),
      description: String(data.description ?? ""),
      category: String(data.category ?? ""),
      categorySlug: getCategoryByName(data.category)?.slug ?? "",
      readingMinutes: Math.max(1, Math.round(words / 230)),
      jp: attr(content, "jp"),
      romaji: attr(content, "romaji"),
    };
  });

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date) || a.slug.localeCompare(b.slug));
  cache = posts;
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getCategoryCounts(): Record<string, number> {
  const posts = getAllPosts();
  return Object.fromEntries(CATEGORIES.map((c) => [c.slug, posts.filter((p) => p.categorySlug === c.slug).length]));
}
