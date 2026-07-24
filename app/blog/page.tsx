import type { Metadata } from "next";
import PostList from "@/components/blog/posts-list";
import BlogListShell from "@/components/blog/blog-list-shell";
import { getAllPosts, groupPostsByCategory } from "@/lib/posts";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tất cả bài viết - Ranobe",
  };
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const renderList = groupPostsByCategory(posts);

  return (
    <BlogListShell
      heading="Tất cả bài viết"
      description="Tìm đọc tất cả bài viết của chúng tôi ngay bên dưới."
      contentClassName="z-5"
    >
      {renderList.map((category) => (
        <PostList key={category.category} data={category.data} title={category.title} category={category.category} />
      ))}
    </BlogListShell>
  );
}
