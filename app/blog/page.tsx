import type { Metadata } from "next";
import PostList from "@/components/blog/posts-list";
import { getAllPosts, groupPostsByCategory } from "@/lib/posts";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import IconBar from "@/components/common/icon-bar";
import PageBackground from "@/components/common/page-background";
import StrokeTitle from "@/components/common/stroke-title";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tất cả bài viết - Ranobe",
  };
}

export default async function Home() {
  const posts = await getAllPosts();
  const renderList = groupPostsByCategory(posts);

  return (
    <div className="flex flex-col w-full items-center justify-between relative">
      <IconBar />
      <PageBackground />
      <StrokeTitle />
      <Image
        src="/imouza_all.png"
        alt="imouza image"
        width={548}
        height={792}
        priority
        className="h-auto w-[50vw] relative z-10 translate-y-[7.8vw] sm:w-[30vw] sm:translate-y-[4.6vw] select-none pointer-events-none"
      />
      <div className="relative z-5">
        <div className="w-full text-center flex flex-col items-center justify-center">
          <Separator className="mb-8 max-w-[80%] lg:max-w-4xl" />
          <h2 className="text-4xl md:text-6xl font-black">Tất cả bài viết</h2>
          <p className="text-lg lg:text-xl text-center px-4 leading-5 mt-2">Tìm đọc tất cả bài viết của chúng tôi ngay bên dưới.</p>
          <Separator className="mt-8 max-w-[80%] lg:max-w-4xl" />
        </div>
        {renderList.map((category) => (
          <PostList key={category.category} data={category.data} title={category.title} category={category.category} />
        ))}
      </div>
    </div>
  );
}
