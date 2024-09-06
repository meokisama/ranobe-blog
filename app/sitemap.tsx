import getAllPosts from "@/components/blog/get-all-posts";
import { MetadataRoute } from "next";

const categoryList = [
  "xa-hoi-tren-giay",
  "12-ngay-giang-sinh",
  "ki-su-gia",
  "phong-van",
];

const generateBlogPostsSitemapObjects = async () => {
  const posts = await getAllPosts();

  const updatedPosts = posts.map((post) => ({
    ...post,
    updatedAt: new Date(post.metadata.publishDate),
  }));

  return updatedPosts;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://ranobe.vn",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://ranobe.vn/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...categoryList.map((category) => ({
      url: `https://ranobe.vn/category/${category}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...(await generateBlogPostsSitemapObjects()).map((o) => ({
      url: `https://ranobe.vn/blog/${o.slug}`,
      lastModified: o.updatedAt,
      changeFrequency: "weekly" as "weekly",
      priority: 1,
    })),
  ];
}
