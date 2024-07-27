import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
  const dir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(dir);

  const posts = files
    .filter(
      (filename) => filename.endsWith(".mdx") && !filename.startsWith(".")
    )
    .map((filename) => {
      try {
        const { metadata } = require(`@/posts/${filename}`);
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
  <div className="w-full space-y-4 max-w-7xl px-4 lg:px-12 mt-10 lg:mt-20">
    <h1 className="p-4 my-10 border-s-4 border-red-400 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-700 dark:text-white">
      {title}
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.slice(0, 6).map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <div className="p-4 flex flex-col sm:h-full justify-start rounded-xl bg-[#fbfbfb] dark:bg-[#212121] shadow-lg dark:shadow-[0_0_10px_rgba(0,0,0,0.6)] group hover:-translate-y-2 hover:shadow-xl transition ease-linear border">
            <div className="w-full h-[50%] rounded-xl shadow-lg overflow-hidden">
              <Image
                src={`/posts/${post.metadata.thumbnail}`}
                alt="post thumbnail"
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition ease-linear"
              />
            </div>
            <h2 className="text-xl leading-5 lg:leading-6 lg:text-2xl font-bold mt-6 mb-4 pb-[2px] line-clamp-2">
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
            <p className="text-lg leading-5 lg:text-xl lg:leading-6 line-clamp-3 mt-2">
              {post.metadata.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default async function NewPost() {
  const posts = await getAllPosts();
  const meokiPosts = posts.filter((post) => post.metadata.author === "Meoki");
  const htlPosts = posts.filter(
    (post) => post.metadata.author === "NaviRanobe"
  );

  return (
    <div className="flex flex-col w-full items-center justify-between my-4 mt-16">
      <div className="bg-[hsl(var(--background))] w-full text-center flex flex-col items-center justify-center mt-32">
        <Separator className="mb-8 max-w-[80%] lg:max-w-4xl" />
        <h2 className="text-4xl md:text-6xl font-black">Bài viết mới nhất</h2>
        <p className="text-lg lg:text-xl text-center px-4 leading-5 mt-2">
          Những nội dung được đăng tải gần đây nhất, ấn vào nút Xem tất cả bên
          dưới để đọc nhiều hơn.
        </p>
        <Separator className="mt-8 max-w-[80%] lg:max-w-4xl" />
      </div>
      <PostList
        posts={meokiPosts}
        title="Xã Hội Vận Hành Trên Giấy Như Thế Nào?"
      />
      <Link href="/blog">
        <Button size="lg" className="text-lg lg:text-xl py-6 mt-14">
          Tất cả bài viết
        </Button>
      </Link>
      <PostList posts={htlPosts} title="12 Ngày Light Novel Giáng Sinh" />
      <Link href="/blog">
        <Button size="lg" className="text-lg lg:text-xl py-6 mt-14">
          Tất cả bài viết
        </Button>
      </Link>
    </div>
  );
}
