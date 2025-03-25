import type { Metadata } from "next";
import PostList from "@/components/blog/posts-list";
import getAllPosts from "@/components/blog/get-all-posts";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import IconBar from "@/components/common/icon-bar";
import { CATEGORIES } from "@/constants";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const renderList = CATEGORIES;

  const matchedCategory = renderList.find((item) => item.category === category);

  if (matchedCategory) {
    return {
      title: matchedCategory.title + " - Ranobe",
      description: matchedCategory.description,
    };
  }

  return {
    title: "Chuyên mục không tồn tại - Ranobe",
    description: "Không tìm thấy chuyên mục tương ứng.",
  };
}

export default async function Home({ params }: Props) {
  const { category } = await params;

  const posts = await getAllPosts();
  const renderList = CATEGORIES.map((item) => ({
    title: item.title,
    category: item.category,
    data: posts.filter(
      (post) => post.metadata.category === item.metadataCategory
    ),
  }));

  const matchedCategory = renderList.find((item) => item.category === category);
  if (!matchedCategory) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen w-full px-4 text-xl lg:text-2xl font-bold bg-[#111827] text-white absolute z-30">
        <p>Không tìm thấy bài viết cho chuyên mục: {category}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-between relative">
      <IconBar />
      <Image
        src="/sneaker.webp"
        alt="background image"
        width={1308}
        height={1000}
        className="fixed w-full h-auto z-1 dark:invert dark:hidden select-none pointer-events-none"
      />
      <Image
        src="/beams.jpg"
        alt="background image"
        width={1308}
        height={1000}
        className="fixed w-full h-full z-1 opacity-50 dark:invert dark:hidden select-none pointer-events-none"
      />
      <div className="absolute z-2 font-jaro select-none pointer-events-none w-full text-center overflow-hidden backdrop-blur-sm">
        <h1 className="text-[40vw] leading-[30vw] sm:text-[21vw] sm:leading-[17vw] text-[var(--background)] custom-stroke">
          NAVIRANOBE
        </h1>
        <h1 className="text-[40vw] leading-[33vw] sm:text-[26.3vw] sm:leading-[20vw] sm:mt-[-2vw] text-[var(--background)] custom-stroke">
          THEMEOKI
        </h1>
      </div>
      <Image
        src="/imouza_all.png"
        alt="imouza image"
        width={548}
        height={792}
        priority
        className="h-auto w-[50vw] relative z-10 translate-y-[7.8vw] sm:w-[30vw] sm:translate-y-[4.6vw] select-none pointer-events-none"
      />
      <div className="relative z-3">
        <div className="w-full text-center flex flex-col items-center justify-center">
          <Separator className="mb-8 max-w-[80%] lg:max-w-4xl" />
          <h2 className="text-4xl md:text-6xl font-black">Chuyên Mục</h2>
          <p className="text-lg lg:text-xl text-center px-4 leading-5 mt-2">
            Tất cả bài viết cho <strong>{matchedCategory.title}</strong>.
          </p>
          <Separator className="mt-8 max-w-[80%] lg:max-w-4xl" />
        </div>
        <PostList
          data={matchedCategory.data}
          title={matchedCategory.title}
          category={matchedCategory.category}
          postsPerPage={12}
          categoryButton={false}
        />
      </div>
    </div>
  );
}
