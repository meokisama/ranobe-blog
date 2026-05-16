"use client";

import { useEffect, useState } from "react";
import SearchDrawer from "./search-drawer";
import { ModeToggle } from "./toggle";

export default function IconBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed z-49 bottom-2 left-2 flex flex-row gap-1">
      <ModeToggle />
      <SearchDrawer />
    </div>
  );
}
