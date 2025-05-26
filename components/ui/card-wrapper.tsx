import type React from "react"

interface CardWrapperProps {
  children: React.ReactNode
  className?: string
}

export function CardWrapper({ children, className = "" }: CardWrapperProps) {
  const baseClasses = "bg-card rounded-lg p-6 border border-primary/20"
  const combinedClasses = `${baseClasses} ${className}`.trim()

  return <div className={combinedClasses}>{children}</div>
}
