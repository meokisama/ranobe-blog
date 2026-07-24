"use client";

import { useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import Fuse from "fuse.js";
import { removeAccents } from "@/lib/remove-accents.mjs";
import type { Post } from "@/lib/types";

// posts.json entries are Posts augmented with pre-normalized (accent-stripped)
// fields that Fuse searches against — see scripts/export-posts.mjs.
const options = {
  keys: [
    { name: "normalizedMetadata.title", weight: 1.0 },
    { name: "normalizedMetadata.author", weight: 0.3 },
    { name: "normalizedMetadata.description", weight: 0.4 },
    { name: "normalizedMetadata.category", weight: 0.3 },
    { name: "normalizedDetail.jp", weight: 0.8 },
    { name: "normalizedDetail.vn", weight: 0.8 },
    { name: "normalizedDetail.romaji", weight: 0.8 },
    { name: "normalizedDetail.publisher", weight: 0.5 },
    { name: "normalizedDetail.author", weight: 0.5 },
    { name: "normalizedDetail.illustrator", weight: 0.5 },
    { name: "normalizedDetail.category", weight: 0.2 },
    { name: "normalizedDetail.safety", weight: 0.1 },
    { name: "normalizedContent", weight: 0.2 },
  ],
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

// Lazily fetches posts.json once and builds the Fuse index, shared across all
// hook consumers. Resets on failure so a later mount can retry.
let fusePromise: Promise<Fuse<Post>> | null = null;

function getFuse() {
  if (!fusePromise) {
    fusePromise = fetch("/posts.json")
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load posts.json: ${r.status}`);
        return r.json() as Promise<Post[]>;
      })
      .then((items) => new Fuse(items, options))
      .catch((err) => {
        fusePromise = null;
        throw err;
      });
  }
  return fusePromise;
}

type UsePostSearch = {
  query: string;
  results: Post[];
  loading: boolean;
  error: string | null;
  search: (q: string) => void;
};

// Owns the accent-insensitive, debounced post search: loads the Fuse index on
// mount and exposes the current query/results/status plus a `search` setter.
export function usePostSearch(): UsePostSearch {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fuseRef = useRef<Fuse<Post> | null>(null);

  const runSearch = (q: string) => {
    const f = fuseRef.current;
    if (!f || q.trim() === "") {
      setResults([]);
      return;
    }
    setResults(f.search(removeAccents(q)).map((r) => r.item));
  };

  const debouncedSearchRef = useRef(debounce((q: string) => runSearch(q), 300));

  useEffect(() => {
    let cancelled = false;
    getFuse()
      .then((instance) => {
        if (cancelled) return;
        fuseRef.current = instance;
        setLoading(false);
        if (query.trim()) runSearch(query);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) {
          setLoading(false);
          setError("Không tải được dữ liệu tìm kiếm. Thử tải lại trang.");
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = (q: string) => {
    setQuery(q);
    debouncedSearchRef.current(q);
  };

  return { query, results, loading, error, search };
}
