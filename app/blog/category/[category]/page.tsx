import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostList from "@/components/blog/posts-list";
import BlogListShell from "@/components/blog/blog-list-shell";
import { getAllPosts, groupPostsByCategory } from "@/lib/posts";
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

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const posts = await getAllPosts();
  const matchedCategory = groupPostsByCategory(posts).find((item) => item.category === category);
  if (!matchedCategory) {
    notFound();
  }

  return (
    <BlogListShell
      heading="Chuyên Mục"
      description={
        <>
          Tất cả bài viết cho <strong>{matchedCategory.title}</strong>.
        </>
      }
      contentClassName="z-3"
    >
      <PostList
        data={matchedCategory.data}
        title={matchedCategory.title}
        category={matchedCategory.category}
        postsPerPage={12}
        categoryButton={false}
      />
    </BlogListShell>
  );
}
