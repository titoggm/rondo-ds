import { clsx, type ClassValue } from "clsx"

/**
 * Merge class names. With CSS Modules each variant maps to a single module
 * class, so clsx (conditional join) is all we need — no Tailwind class
 * conflict resolution.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
