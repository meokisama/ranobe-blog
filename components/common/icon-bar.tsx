import SearchDrawer from "./search";
import { ModeToggle } from "./toggle";

export default function IconBar() {
  return (
    <div className="fixed z-[49] bottom-2 left-2 flex flex-row gap-1">
      <ModeToggle />
      <SearchDrawer />
    </div>
  );
}
