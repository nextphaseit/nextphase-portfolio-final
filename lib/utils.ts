import type { ClassValue } from "class-variance-authority"

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ")
}
