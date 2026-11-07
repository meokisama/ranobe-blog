import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0] ? new Date(posts[0].date) : new Date();

  return [
    { url: SITE.url, lastModified: latest, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/blog`, lastModified: latest, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/blog/category`, lastModified: latest, changeFrequency: "monthly", priority: 0.6 },
    ...CATEGORIES.map((c) => ({
      url: `${SITE.url}/blog/category/${c.slug}`,
      lastModified: latest,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
