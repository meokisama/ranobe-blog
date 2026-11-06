import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** 2024-12-10 → 10.12.2024 */
export function formatDate(date: string): string {
  const [y, m, d] = date.split("-");
  return `${d}.${m}.${y}`;
}

/** 2024-12-10 → 10 tháng 12, 2024 */
export function formatDateLong(date: string): string {
  const [y, m, d] = date.split("-");
  return `${Number(d)} tháng ${Number(m)}, ${y}`;
}

export function removeAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

/** Small optimised variant of a local/remote image through the Next image optimiser. */
export function optimized(src: string, width: 384 | 640 | 828 | 1080 = 640, quality = 75): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}
