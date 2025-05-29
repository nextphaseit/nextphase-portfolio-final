import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-white font-bold text-xl">
          NextPhase IT
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/#about" className="text-gray-300 hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/#services" className="text-gray-300 hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="/#contact" className="text-gray-300 hover:text-primary transition-colors">
            Contact
          </Link>
          <Link
            href="/portal"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Service Desk Portal
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Link
            href="/portal"
            className="bg-primary text-white px-3 py-2 rounded text-sm hover:bg-primary/90 transition-colors"
          >
            Portal
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
