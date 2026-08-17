import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatClock(totalSeconds: number) {
  const negative = totalSeconds < 0;
  const abs = Math.abs(totalSeconds);
  const minutes = Math.floor(abs / 60);
  const seconds = abs % 60;
  return `${negative ? "-" : ""}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
