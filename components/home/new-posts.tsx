import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import getAllPosts from "@/components/blog/get-all-posts";
import PostList from "@/components/blog/posts-list";

export default async function NewPost() {
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
            data={category.data.slice(0, 3)}
            title={category.title}
            category={category.category}
          />
          <Link href="/blog">
            <Button size="lg" className="text-lg lg:text-xl py-6 mt-14">
              Tất cả bài viết
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
