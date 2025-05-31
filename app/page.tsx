import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background-600 py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="NextPhase IT" width={40} height={40} className="mr-3" />
            <h1 className="text-xl font-bold text-white">NextPhase IT</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/login" className="text-white hover:text-accent transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center bg-gradient-to-b from-background to-background-700">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Welcome to </span>
            <span className="text-primary">NextPhase IT</span>
            <span className="text-white"> Service Desk</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Submit and track support tickets, access resources, and get the help you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login" className="btn-primary text-center">
              Client Login
            </Link>
            <Link href="/admin/login" className="btn-outline text-center">
              Admin Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-700 py-6 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image src="/logo.png" alt="NextPhase IT" width={30} height={30} className="mr-2" />
              <span className="text-sm text-gray-300">© 2023 NextPhase IT. All rights reserved.</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-sm text-gray-300 hover:text-accent">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-300 hover:text-accent">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-gray-300 hover:text-accent">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
