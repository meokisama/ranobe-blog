import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import IconBar from "@/components/common/icon-bar";
import PageBackground from "@/components/common/page-background";
import StrokeTitle from "@/components/common/stroke-title";
import { cn } from "@/lib/utils";

type BlogListShellProps = {
  heading: string;
  description: React.ReactNode;
  // Extra classes for the content wrapper (e.g. its stacking context: "z-5", "z-3").
  contentClassName?: string;
  children: React.ReactNode;
};

// Shared chrome for the blog listing pages (all posts + single category): the
// IconBar/StrokeTitle/PageBackground trio, the imouza mascot, and the centered
// heading block. Pages supply their own title, description, and post list.
export default function BlogListShell({ heading, description, contentClassName, children }: BlogListShellProps) {
  return (
    <div className="flex flex-col w-full items-center justify-between relative">
      <IconBar />
      <PageBackground />
      <StrokeTitle />
      <Image
        src="/imouza_all.png"
        alt="imouza image"
        width={548}
        height={792}
        priority
        className="h-auto w-[50vw] relative z-10 translate-y-[7.8vw] sm:w-[30vw] sm:translate-y-[4.6vw] select-none pointer-events-none"
      />
      <div className={cn("relative", contentClassName)}>
        <div className="w-full text-center flex flex-col items-center justify-center">
          <Separator className="mb-8 max-w-[80%] lg:max-w-4xl" />
          <h2 className="text-4xl md:text-6xl font-black">{heading}</h2>
          <p className="text-lg lg:text-xl text-center px-4 leading-5 mt-2">{description}</p>
          <Separator className="mt-8 max-w-[80%] lg:max-w-4xl" />
        </div>
        {children}
      </div>
    </div>
  );
}
