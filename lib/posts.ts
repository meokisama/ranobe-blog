import fs from "node:fs";
import path from "node:path";
import { CATEGORIES } from "@/constants";
import type { Post, PostMetadata } from "@/lib/types";

const FALLBACK_METADATA: PostMetadata = {
  title: "Untitled",
  author: "",
  thumbnail: "",
  publishDate: "1970-01-01",
  description: "",
  category: "",
};

// Reads every post's frontmatter (and optional SeriesDetail) at build time by
// importing the compiled MDX modules, then sorts newest-first.
export async function getAllPosts(): Promise<Post[]> {
  const dir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(dir).filter((filename) => filename.endsWith(".mdx") && !filename.startsWith("."));

  const posts = files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    try {
      const { metadata, detail } = require(`@/posts/${filename}`);
      return {
        slug,
        metadata: metadata ?? FALLBACK_METADATA,
        ...(detail && { detail }),
      };
    } catch (error) {
      console.error(`Error loading metadata for file ${filename}:`, error);
      return { slug, metadata: FALLBACK_METADATA };
    }
  });

  posts.sort((a, b) => new Date(b.metadata.publishDate).getTime() - new Date(a.metadata.publishDate).getTime());

  return posts;
}

export type CategoryGroup = {
  title: string;
  category: string;
  data: Post[];
};

// Buckets posts under each configured category (matched by its display name).
export function groupPostsByCategory(posts: Post[]): CategoryGroup[] {
  return CATEGORIES.map((item) => ({
    title: item.title,
    category: item.category,
    data: posts.filter((post) => post.metadata.category === item.metadataCategory),
  }));
}
