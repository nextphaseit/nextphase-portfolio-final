export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <a href="/" className="text-2xl font-bold">
              NextPhase IT
            </a>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/services" className="hover:text-gray-300">
                  Services
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-300">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-6">Welcome to NextPhase IT</h1>
          <p className="text-lg">We provide cutting-edge IT solutions to help your business thrive.</p>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2024 NextPhase IT. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="https://portal.nextphaseit.org" className="text-gray-400 hover:text-white transition-colors">
                  Client Portal →
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  )
}
