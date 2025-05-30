"use client"

import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const pathname = usePathname()

  // Only use SessionProvider for admin and auth routes
  const needsAuth = pathname?.startsWith("/admin") || pathname?.startsWith("/auth")

  if (needsAuth) {
    return (
      <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
        {children}
      </SessionProvider>
    )
  }

  return <>{children}</>
}
