import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | undefined, formatStr: string = "PPP"): string {
  if (!date) return "";
  try {
    return format(new Date(date), formatStr);
  } catch (error) {
    console.error("Error formatting date:", date, error);
    return "";
  }
}