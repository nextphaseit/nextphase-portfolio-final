import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { ChatBotWidget } from '@/components/chat-bot-widget'
import { Toaster } from 'sonner'
import { AnimatedFooter } from "@/components/AnimatedFooter"
import { LogoEasterEgg } from "@/components/LogoEasterEgg"
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'NextPhase IT - Empowering Small Businesses Through Smart IT',
  description: 'Professional IT services for small businesses including website design, email setup, Microsoft 365 consulting, and more.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <ChatBotWidget />
        <Toaster position="top-center" />
        <AnimatedFooter />
      </body>
    </html>
  )
}
