import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NextPhase IT - Enterprise Technology Solutions",
  description:
    "Empowering small businesses with enterprise-level technology solutions. From web development to cloud infrastructure, we deliver secure, scalable, and efficient IT solutions that drive growth.",
  keywords: "IT solutions, web development, cloud infrastructure, business technology, NextPhase IT",
  authors: [{ name: "NextPhase IT" }],
  openGraph: {
    title: "NextPhase IT - Enterprise Technology Solutions",
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
        <Providers>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Chatbot />
        </Providers>
      </body>
    </html>
  )
}
