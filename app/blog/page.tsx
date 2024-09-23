import type { Metadata } from "next";
import PostList from "@/components/blog/posts-list";
import getAllPosts from "@/components/blog/get-all-posts";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import IconBar from "@/components/common/icon-bar";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tất cả bài viết - Ranobe",
  };
}

export default async function Home() {
  const posts = await getAllPosts();
  const renderList = [
    {
      title: "Xã Hội Vận Hành Trên Giấy Như Thế Nào?",
      category: "xa-hoi-tren-giay",
      data: posts.filter((post) => post.metadata.author === "Meoki"),
    },
    {
      title: "12 Ngày Light Novel Giáng Sinh",
      category: "12-ngay-giang-sinh",
      data: posts.filter(
        (post) => post.metadata.category === "12 Ngày Giáng Sinh"
      ),
    },
    {
      title: "Kí Sự Giả",
      category: "ki-su-gia",
      data: posts.filter((post) => post.metadata.category === "Kí Sự Giả"),
    },
    {
      title: "Phỏng Vấn",
      category: "phong-van",
      data: posts.filter((post) => post.metadata.category === "Phỏng Vấn"),
    },
  ];
  return (
    <div className="flex flex-col w-full items-center justify-between relative">
      <IconBar />
      <Image
        src="/beams.jpg"
        alt="background image"
        width={1308}
        height={1000}
        className="fixed w-full h-full z-1 opacity-50 dark:invert dark:hidden select-none pointer-events-none"
      />
      <div className="absolute z-[2] select-none pointer-events-none font-jaro w-full text-center overflow-hidden">
        <h1 className="text-[40vw] leading-[30vw] sm:text-[21vw] sm:leading-[17vw] text-[hsl(var(--background))] custom-stroke">
          NAVIRANOBE
        </h1>
        <h1 className="text-[40vw] leading-[33vw] sm:text-[26.3vw] sm:leading-[20vw] sm:mt-[-2vw] text-[hsl(var(--background))] custom-stroke">
          THEMEOKI
        </h1>
      </div>
      <Image
        src="/imouza_all.png"
        alt="imouza image"
        width={500}
        height={500}
        priority
        className="h-auto w-[50vw] relative z-10 translate-y-[7.8vw] sm:w-[30vw] sm:translate-y-[4.6vw] select-none pointer-events-none"
      />
      <div className="relative z-[5]">
        <div className="w-full text-center flex flex-col items-center justify-center">
          <Separator className="mb-8 max-w-[80%] lg:max-w-4xl" />
          <h2 className="text-4xl md:text-6xl font-black">Tất cả bài viết</h2>
          <p className="text-lg lg:text-xl text-center px-4 leading-5 mt-2">
            Tìm đọc tất cả bài viết của chúng tôi ngay bên dưới.
          </p>
          <Separator className="mt-8 max-w-[80%] lg:max-w-4xl" />
        </div>
        {renderList.map((category, index) => (
          <PostList
            key={index}
            data={category.data}
            title={category.title}
            category={category.category}
          />
        ))}
      </div>
    </div>
  );
}
