import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-background-600 py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/portal" className="flex items-center">
            <Image src="/logo.png" alt="NextPhase IT" width={40} height={40} className="mr-3" />
            <h1 className="text-xl font-bold text-white">NextPhase IT</h1>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/portal" className="text-white hover:text-accent transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/portal/tickets" className="text-white hover:text-accent transition-colors">
                  Tickets
                </Link>
              </li>
              <li>
                <Link href="/portal/resources" className="text-white hover:text-accent transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/api/auth/logout" className="text-white hover:text-accent transition-colors">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-background-700 py-4 px-6">
        <div className="container mx-auto text-center text-sm text-gray-400">
          © 2023 NextPhase IT. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
