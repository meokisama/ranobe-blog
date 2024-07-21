import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { ModeToggle } from "@/components/common/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";

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

type PostListProps = {
  posts: Post[];
  title: string;
};

const PostList: React.FC<PostListProps> = ({ posts, title }) => (
  <div className="w-full space-y-4 max-w-7xl px-4 lg:px-12 mt-20">
    <h1>{title}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <div className="p-4 flex flex-col h-full justify-start rounded-xl shadow-lg dark:bg-[#212121] dark:shadow-[0_0_10px_rgba(0,0,0,0.6)]">
            <div className="w-full max-h-[50%] rounded-xl shadow-lg overflow-hidden">
              <Image
                src={`/posts/${post.metadata.thumbnail}`}
                alt="post thumbnail"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl leading lg:leading-6 lg:text-2xl font-bold mt-6 mb-4 line-clamp-2">
              {post.metadata.title}
            </h2>
            <div className="flex flex-row gap-2 justify-start items-center mb-2">
              <Avatar>
                <AvatarImage
                  src={
                    post.metadata.author === "NaviRanobe"
                      ? "/naviranobe.jpg"
                      : "/themeoki.jpg"
                  }
                />
                <AvatarFallback>
                  <span className="font-bold">CN</span>
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg leading-5 lg:text-xl lg:leading-6 font-bold">
                  {post.metadata.author}
                </p>
                <p>
                  {format(
                    new Date(post.metadata.publishDate),
                    "dd MMMM, yyyy",
                    { locale: vi }
                  )}
                </p>
              </div>
            </div>
            <p className="text-lg leading-5 lg:text-xl lg:leading-6 line-clamp-3">
              {post.metadata.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default async function Home() {
  const posts = await getAllPosts();
  const meokiPosts = posts.filter(
    (post) => post.metadata.category === "Xã Hội Trên Giấy"
  );
  const htlPosts = posts.filter(
    (post) => post.metadata.category !== "Xã Hội Trên Giấy"
  );

  return (
    <div className="flex flex-col w-full items-center justify-between my-4">
      <ModeToggle />
      <h2 className="text-4xl md:text-6xl font-black">Tất cả bài viết</h2>
      <p className="text-lg text-center px-4 leading-5">
        Welcome to the blog! Here you will find a collection of articles and
        posts.
      </p>
      <PostList posts={meokiPosts} title="Xã Hội Trên Giấy" />
      <PostList posts={htlPosts} title="12 Ngày Giáng Sinh" />
    </div>
  );
}
