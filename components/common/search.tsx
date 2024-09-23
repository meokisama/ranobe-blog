import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function SearchDrawer() {
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-10 px-0 focus-visible:border-none shadow-md"
        >
          <MagnifyingGlassIcon className="h-[1.1rem] w-[1.1rem]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full p-10">
          <p className="text-center text-lg lg:text-xl mb-8 leading-4">
            Nuôi hai bé ở đây giữ chỗ chứ chưa làm~
          </p>
          <Image
            src="/post_chibi.png"
            alt="makeine chibi"
            width={300}
            height={300}
            className="block mx-auto"
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
