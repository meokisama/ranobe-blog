import type { Metadata } from "next";
import { ModeToggle } from "@/components/common/toggle";
import PostList from "@/components/blog/posts-list";
import getAllPosts from "@/components/blog/get-all-posts";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tất cả bài viết - Ranobe",
  };
}

export default async function Home() {
  const posts = await getAllPosts();
  const meokiPosts = posts.filter((post) => post.metadata.author === "Meoki");
  const htlPosts = posts.filter(
    (post) => post.metadata.author === "NaviRanobe"
  );
  return (
    <div className="flex flex-col w-full items-center justify-between my-4">
      <ModeToggle />
      <h2 className="text-4xl md:text-6xl font-black">Tất cả bài viết</h2>
      <p className="text-lg lg:text-xl text-center px-4 leading-5 mt-2">
        Tìm đọc tất cả bài viết của chúng tôi ngay bên dưới.
      </p>
      <PostList
        data={meokiPosts}
        title="Xã Hội Vận Hành Trên Giấy Như Thế Nào?"
      />
      <PostList data={htlPosts} title="12 Ngày Light Novel Giáng Sinh" />
    </div>
  );
}
