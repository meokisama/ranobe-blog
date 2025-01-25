"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { exportPosts } from "./export-posts";

export default function PostExportButton() {
  const [status, setStatus] = useState<string | null>(null);
  const isProduction = process.env.NODE_ENV === "production";
  return (
    <div>
      <Button
        onClick={async () => {
          const result = await exportPosts();
          setStatus(result);
        }}
      >
        Export Posts to JSON
      </Button>
      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </div>
  );
}
