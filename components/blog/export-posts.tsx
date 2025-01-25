"use server";

import fs from "node:fs";
import path from "node:path";
import getAllPosts from "./get-all-posts";

export async function exportPosts() {
  try {
    const dir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const posts = await getAllPosts();

    await fs.promises.writeFile(
      path.join(dir, "posts.json"),
      JSON.stringify(posts, null, 2)
    );

    return "Posts exported successfully!";
  } catch (error) {
    console.error(error);
    return "Export failed. Check server logs for details.";
  }
}
