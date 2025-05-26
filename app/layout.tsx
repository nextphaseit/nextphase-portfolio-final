import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NextPhase IT - Web & IT Solutions Consultant",
  description:
    "NextPhase IT helps small businesses build secure, modern websites that integrate seamlessly with cloud services and IT systems. Professional web development, cloud migrations, and IT consulting in Clayton, NC.",
  keywords:
    "web development, IT consulting, cloud migration, Microsoft 365, NextPhase IT, Clayton NC, small business technology",
  authors: [{ name: "Adrian Knight", url: "https://nextphaseit.org" }],
  creator: "NextPhase IT",
  publisher: "NextPhase IT",
  robots: "index, follow",
  openGraph: {
    title: "NextPhase IT - Web & IT Solutions Consultant",
    description:
      "Professional web development and IT consulting services for small businesses. Custom websites, cloud migrations, and automation solutions.",
    url: "https://nextphaseit.org",
    siteName: "NextPhase IT",
    type: "website",
    images: [
      {
        url: "/images/nextphase-logo.png",
        width: 1200,
        height: 630,
        alt: "NextPhase IT Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextPhase IT - Web & IT Solutions Consultant",
    description: "Professional web development and IT consulting services for small businesses.",
    images: ["/images/nextphase-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#1E5AA8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
