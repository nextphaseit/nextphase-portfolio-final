import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CustomAuthProvider } from "@/providers/custom-auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NextPhase IT - Service Desk Portal",
  description: "Professional IT services and support portal for NextPhase IT clients",
  keywords: "IT support, service desk, NextPhase IT, technical support, business IT",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomAuthProvider>{children}</CustomAuthProvider>
      </body>
    </html>
  )
}
