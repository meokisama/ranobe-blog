import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { ModeToggle } from "@/components/common/toggle";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tất cả bài viết - Ranobe",
  };
}

type Post = {
  slug: string;
  metadata: PostMetadata;
};

interface PostMetadata {
  title: string;
  publishDate: string;
  [key: string]: any;
}

async function getAllPosts(): Promise<Post[]> {
  const dir = path.join(process.cwd(), "content", "blogs");
  const files = fs.readdirSync(dir);

  const posts = files
    .filter(
      (filename) => filename.endsWith(".mdx") && !filename.startsWith(".")
    )
    .map((filename) => {
      try {
        const { metadata } = require(`@/content/blogs/${filename}`);
        return {
          slug: filename.replace(".mdx", ""),
          metadata: metadata || {
            title: "Untitled",
            publishDate: "1970-01-01",
          },
        };
      } catch (error) {
        console.error(`Error loading metadata for file ${filename}:`, error);
        return {
          slug: filename.replace(".mdx", ""),
          metadata: { title: "Untitled", publishDate: "1970-01-01" },
        };
      }
    });

  // Sort posts by publishDate in descending order
  posts.sort(
    (a, b) =>
      new Date(b.metadata.publishDate).getTime() -
      new Date(a.metadata.publishDate).getTime()
  );

  return posts;
}

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col w-full items-center justify-between">
      <ModeToggle />
      <h2 className="text-5xl sm:text-6xl font-black">Tất cả bài viết</h2>
      <p className="text-lg">
        Welcome to the blog! Here you will find a collection of articles and
        posts.
      </p>
      <div className="w-full space-y-4 max-w-7xl px-12 mt-20">
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="p-4 rounded-xl shadow-md dark:bg-[#212121] dark:shadow-[0_0_10px_rgba(0,0,0,0.6)]"
            >
              <Link
                className="flex flex-col h-full justify-between"
                href={`/blog/${post.slug}`}
              >
                <h2 className="text-2xl font-bold mb-4">
                  {post.metadata.title}
                </h2>
                <p className="lg:text-xl">{post.metadata.description}</p>
                <p className="text-right">{post.metadata.publishDate}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
