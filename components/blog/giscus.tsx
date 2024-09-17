"use client";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function GiscusComments() {
  const repo = process.env.NEXT_PUBLIC_COMMENTS_REPO as `${string}/${string}`;
  const repoId = process.env.NEXT_PUBLIC_COMMENTS_REPO_ID as string;
  const category = process.env.NEXT_PUBLIC_COMMENTS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_COMMENTS_CATEGORY_ID;

  const { resolvedTheme: currentTheme } = useTheme();

  return (
    <Giscus
      id="comments"
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="og:title"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={currentTheme}
      lang="vi"
      loading="lazy"
    />
  );
}
