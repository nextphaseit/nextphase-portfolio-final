import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { ChatBotWidget } from '@/components/chat-bot-widget'
import { Toaster } from 'sonner'
import { AnimatedFooter } from "@/components/AnimatedFooter"
import { LogoEasterEgg } from "@/components/LogoEasterEgg"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextPhase IT - Modern IT Solutions for Your Business',
  description: 'Empowering small businesses with cloud, security, and IT expertise. Get reliable tech support and modern solutions for your business needs.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="relative">
          {children}
          <ChatBotWidget />
        </div>
        <Toaster position="top-center" />
        <AnimatedFooter />
      </body>
    </html>
  )
}
