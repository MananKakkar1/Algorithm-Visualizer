import { clsx } from "clsx";

// Simple className helper. We no longer depend on tailwind-merge.
export function cn(...inputs) {
  return clsx(inputs);
}
