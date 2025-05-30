import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NextPhase IT - Transform Your Business",
  description:
    "Empowering small businesses with enterprise-level technology solutions. From web development to cloud infrastructure, we deliver secure, scalable, and efficient IT solutions that drive growth.",
  keywords: "IT services, web development, cloud infrastructure, business technology, NextPhase IT",
  authors: [{ name: "NextPhase IT" }],
  openGraph: {
    title: "NextPhase IT - Transform Your Business",
    description: "Empowering small businesses with enterprise-level technology solutions.",
    url: "https://nextphaseit.org",
    siteName: "NextPhase IT",
    type: "website",
  },
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
