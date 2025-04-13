import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import getAllPosts from "@/components/blog/get-all-posts";
import PostList from "@/components/blog/posts-list";
import { CATEGORIES } from "@/constants";

export default async function NewPost() {
  const posts = await getAllPosts();
  const renderList = CATEGORIES.map((item) => ({
    title: item.title,
    category: item.category,
    data: posts.filter(
      (post) => post.metadata.category === item.metadataCategory
    ),
  }));

  return (
    <div className="flex flex-col w-full items-center justify-between my-4 mt-16">
      <div className="w-full text-center flex flex-col items-center justify-center mt-32">
        <Separator className="mb-8 max-w-[80%] lg:max-w-4xl" />
        <h2 className="text-4xl md:text-6xl font-black">Bài viết mới nhất</h2>
        <p className="text-lg lg:text-xl text-center px-4 leading-5 mt-2">
          Những nội dung được đăng tải gần đây nhất, ấn vào nút Xem tất cả bên
          dưới để đọc nhiều hơn.
        </p>
        <Separator className="mt-8 max-w-[80%] lg:max-w-4xl" />
      </div>
      {renderList.map((category, index) => (
        <div key={index} className="flex flex-col items-center justify-between">
          <PostList
            data={
              category.category === "12-ngay-giang-sinh"
                ? category.data.slice(0, 6)
                : category.data.slice(0, 3)
            }
            title={category.title}
            category={category.category}
          />
          <Link href="/blog" target="_blank">
            <Button
              size="lg"
              className="text-lg lg:text-xl py-6 mt-14 cursor-pointer"
            >
              Tất cả bài viết
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
