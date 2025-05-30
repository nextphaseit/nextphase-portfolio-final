"use client"

import type React from "react"

import { SessionProvider } from "next-auth/react"
import { ToastProvider } from "@/components/ui/toast"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      // Re-fetch session when window is focused
      refetchOnWindowFocus={true}
    >
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  )
}
