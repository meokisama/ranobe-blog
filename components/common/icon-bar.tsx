"use client";

import SearchDrawer from "./search-drawer";
import { ModeToggle } from "./toggle";

// Fixed bottom-left controls: theme toggle + search, floating above the page.
export default function IconBar() {
  return (
    <div className="fixed z-49 bottom-2 left-2 flex flex-row gap-1">
      <ModeToggle />
      <SearchDrawer />
    </div>
  );
}
