import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthor } from "@/constants";

// Author avatar resolved from a post's author name (username or nickname).
// Shared by the post detail page, post cards and search results.
export default function AuthorAvatar({ name, className, fallback = "CN" }: { name?: string; className?: string; fallback?: string }) {
  return (
    <Avatar className={className}>
      <AvatarImage src={`/${getAuthor(name)?.avatar}`} />
      <AvatarFallback>
        <span className="font-bold">{fallback}</span>
      </AvatarFallback>
    </Avatar>
  );
}
