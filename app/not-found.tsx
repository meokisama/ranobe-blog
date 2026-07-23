import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="fixed top-0 z-30 flex h-screen w-full flex-col items-center justify-center gap-4 px-4 text-center bg-background text-foreground">
      <p className="text-xl lg:text-2xl font-bold">Rất tiếc! Trang bạn tìm đã lên đường phiêu lưu và có lẽ không quay lại nữa. 💀</p>
      <Link href="/">
        <Button className="text-lg cursor-pointer">Về trang chủ</Button>
      </Link>
    </div>
  );
}
