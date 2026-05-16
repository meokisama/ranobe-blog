import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import SearchFunction from "./search-function";

export default function SearchDrawer() {
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-10 px-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-md dark:shadow-[0_3px_10px_rgba(0,0,0,0.6)]"
        >
          <MagnifyingGlassIcon className="h-[1.1rem] w-[1.1rem]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="focus-visible:ring-0 focus-visible:ring-offset-0">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <SearchFunction />
      </DrawerContent>
    </Drawer>
  );
}
