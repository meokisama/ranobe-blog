import type { Metadata } from "next";
import PageTitle from "@/components/blog/page-title";
import { ChapterList } from "@/components/home/chapters";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chuyên mục",
  description: "Các chuyên mục bài viết trên Ranobe.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageTitle
        eyebrow="Chuyên mục"
        jp="目次"
        title="Mục lục"
        description={`${CATEGORIES.length} chương, mỗi chương một cách nhìn khác nhau về light novel.`}
      />
      <section className="gutter">
        <div className="border-t border-line">
          <ChapterList posts={getAllPosts()} />
        </div>
      </section>
    </>
  );
}
