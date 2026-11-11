import type { Metadata } from "next";
import Archive from "@/components/blog/archive";
import PageTitle from "@/components/blog/page-title";
import { getAllPosts, getCategoryCounts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Thư viện",
  description: "Toàn bộ bài viết review, phân tích light novel trên Ranobe.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageTitle
        eyebrow="Thư viện"
        jp="書庫"
        title="Tất cả bài viết"
        count={posts.length}
        description="Mọi thứ từng được viết trên Ranobe, xếp theo thời gian — từ review từng tập truyện tới những bài phân tích dài hơi."
      />
      <Archive posts={posts} counts={getCategoryCounts()} />
    </>
  );
}
