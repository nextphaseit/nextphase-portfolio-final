import type React from "react"
import { cn } from "@/lib/utils"

interface CardWrapperProps {
  children: React.ReactNode
  className?: string
}

export function CardWrapper({ children, className }: CardWrapperProps) {
  return (
    <div
      className={cn("bg-surface border border-color rounded-lg shadow-md p-6 transition-all duration-200", className)}
    >
      {children}
    </div>
  )
}
