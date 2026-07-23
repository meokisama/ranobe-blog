// Shared domain types for blog posts. Post frontmatter is authored in Keystatic
// (see keystatic.config.ts) and the SeriesDetail block carries the light-novel
// metadata rendered by components/mdx/series-detail.tsx.

export interface PostMetadata {
  title: string;
  author: string;
  thumbnail: string;
  publishDate: string;
  description: string;
  category: string;
}

export interface SeriesDetail {
  jp: string;
  vn: string;
  romaji: string;
  publisher: string;
  author: string;
  illustrator: string;
  release: string;
  category: string;
  volume: string;
  en_trans: string;
  en_trans_url: string;
  vi_trans: string;
  vi_trans_url: string;
  safety: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  detail?: SeriesDetail;
}
