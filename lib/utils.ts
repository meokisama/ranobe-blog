import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats a post's publishDate as "dd MMMM, yyyy" in Vietnamese (e.g. 24 tháng 7, 2026).
export function formatPostDate(date: string | Date) {
  return format(new Date(date), "dd MMMM, yyyy", { locale: vi })
}
