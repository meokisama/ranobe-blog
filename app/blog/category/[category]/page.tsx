import type { Metadata } from "next";
import { ModeToggle } from "@/components/common/toggle";
import PostList from "@/components/blog/posts-list";
import getAllPosts from "@/components/blog/get-all-posts";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const { category } = params;
  const renderList = [
    {
      title: "Xã Hội Vận Hành Trên Giấy Như Thế Nào?",
      category: "xa-hoi-tren-giay",
      description:
        "Khám phá cách xã hội vận hành qua những câu chuyện, bối cảnh, chi tiết, nội dung được gửi gắm qua những trang giấy.",
    },
    {
      title: "12 Ngày Light Novel Giáng Sinh",
      category: "12-ngay-giang-sinh",
      description:
        "Loạt bài viết review light novel đặc biệt đếm ngược 12 ngày tới Giáng Sinh.",
    },
    {
      title: "Kí Sự Giả",
      category: "ki-su-gia",
      description: "Những câu chuyện chưa kể vì chưa kịp kể.",
    },
    {
      title: "Phỏng Vấn",
      category: "phong-van",
      description: "Phỏng vấn các nhà xuất bản light novel Việt Nam.",
    },
  ];

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

export default async function Home({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

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

  const matchedCategory = renderList.find((item) => item.category === category);
  if (!matchedCategory) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen w-full px-4 text-xl lg:text-2xl font-bold bg-[#111827] text-white absolute z-30">
        <p>Không tìm thấy bài viết cho chuyên mục: {category}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-between my-4 relative">
      <ModeToggle />
      <Image
        src="/beams.jpg"
        alt="background image"
        width={1308}
        height={1000}
        className="fixed w-full h-full -z-[100] opacity-50 dark:invert dark:hidden"
      />
      <div className="absolute -z-10 font-jaro font-normal w-full text-center overflow-hidden">
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
        className="h-auto w-[50vw] translate-y-[7.8vw] sm:w-[30vw] sm:translate-y-[4.6vw] select-none pointer-events-none"
      />
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
      />
    </div>
  );
}
