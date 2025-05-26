import Link from "next/link"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/portal", label: "Client Portal" },
  { href: "/admin", label: "Admin Portal" },
]

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-bold">
          My App
        </Link>
        <div className="flex space-x-4">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-gray-300 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
