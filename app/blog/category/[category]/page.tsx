import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostList from "@/components/blog/posts-list";
import { getAllPosts, groupPostsByCategory } from "@/lib/posts";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import IconBar from "@/components/common/icon-bar";
import PageBackground from "@/components/common/page-background";
import StrokeTitle from "@/components/common/stroke-title";
import { CATEGORIES } from "@/constants";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const matchedCategory = CATEGORIES.find((item) => item.category === category);

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
  const matchedCategory = groupPostsByCategory(posts).find((item) => item.category === category);
  if (!matchedCategory) {
    notFound();
  }

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
