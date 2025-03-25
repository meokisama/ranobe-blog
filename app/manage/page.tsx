import type { Metadata } from "next";
import PostExportButton from "@/components/blog/export-button";
import Custom404 from "../not-found";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Quản Trị - Ranobe",
  };
}

export default function ManagePage() {
  return process.env.NODE_ENV === "development" ? (
    <div className="flex justify-center items-center h-screen">
      <PostExportButton />
    </div>
  ) : (
    <Custom404 />
  );
}
