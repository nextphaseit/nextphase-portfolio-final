import type React from "react"
import "./globals.css"
import { NextAuthProvider } from "@/providers/auth-provider"

export const metadata = {
  title: "NextPhase IT",
  description: "IT Solutions for Small Businesses",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
