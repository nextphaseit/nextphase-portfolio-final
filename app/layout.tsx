import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Chatbot } from "@/components/chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NextPhase IT - Professional IT Services & Solutions",
  description:
    "Comprehensive technology solutions, expert support, and strategic consulting to help your business thrive in the digital age.",
  keywords: "IT services, technology consulting, cloud solutions, cybersecurity, business technology",
  authors: [{ name: "NextPhase IT" }],
  openGraph: {
    title: "NextPhase IT - Professional IT Services & Solutions",
    description:
      "Comprehensive technology solutions, expert support, and strategic consulting to help your business thrive in the digital age.",
    url: "https://nextphaseit.org",
    siteName: "NextPhase IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextPhase IT - Professional IT Services & Solutions",
    description:
      "Comprehensive technology solutions, expert support, and strategic consulting to help your business thrive in the digital age.",
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
        {children}
        {/* Chatbot - will be hidden on auth pages via component logic */}
        <Chatbot />
      </body>
    </html>
  )
}
