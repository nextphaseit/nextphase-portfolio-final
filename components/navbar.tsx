import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl">
          NextPhase IT
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/services" className="text-gray-300 hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">
            Contact
          </Link>
          <Link href="/portal/client-login" className="text-gray-300 hover:text-primary transition-colors">
            Service Desk Portal
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
