import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-1", className)} {...props} />;
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" className={cn("cursor-pointer", className)} {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
  return (
    <Button asChild variant={isActive ? "outline" : "ghost"} size={size} className={cn("font-semibold", className)}>
      <a aria-current={isActive ? "page" : undefined} data-slot="pagination-link" data-active={isActive} {...props} />
    </Button>
  );
}

function PaginationPrevious({ className, text = "Trước", ...props }: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink aria-label="Go to previous page" size="default" className={cn("gap-1 pl-2.5 text-lg", className)} {...props}>
      <ChevronLeftIcon className="h-4 w-4 mt-1" />
      <span>{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, text = "Sau", ...props }: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5 text-lg", className)} {...props}>
      <span>{text}</span>
      <ChevronRightIcon className="h-4 w-4 mt-1" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span aria-hidden data-slot="pagination-ellipsis" className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
      <MoreHorizontalIcon className="h-4 w-4 mt-1" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
