import fs from "node:fs";
import path from "node:path";

type Post = {
  slug: string;
  metadata: PostMetadata;
};

interface PostMetadata {
  title: string;
  publishDate: string;
  [key: string]: any;
}

export default async function getAllPosts(): Promise<Post[]> {
  const dir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(dir);

  const posts = files
    .filter((filename) => filename.endsWith(".mdx") && !filename.startsWith("."))
    .map((filename) => {
      try {
        const { metadata, detail } = require(`@/posts/${filename}`);
        return {
          slug: filename.replace(".mdx", ""),
          metadata: metadata || {
            title: "Untitled",
            publishDate: "1970-01-01",
          },
          ...(detail && { detail }),
        };
      } catch (error) {
        console.error(`Error loading metadata for file ${filename}:`, error);
        return {
          slug: filename.replace(".mdx", ""),
          metadata: { title: "Untitled", publishDate: "1970-01-01" },
        };
      }
    });

  posts.sort((a, b) => new Date(b.metadata.publishDate).getTime() - new Date(a.metadata.publishDate).getTime());

  return posts;
}
