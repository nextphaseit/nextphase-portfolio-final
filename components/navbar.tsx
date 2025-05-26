"use client"

import Link from "next/link"

const navLinks = [
  { href: "/#services", label: "About" },
  { href: "/#works", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#skills", label: "Skills" },
  { href: "/faq", label: "FAQ" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/portal", label: "Client Portal" },
  { href: "/admin", label: "Admin Portal" },
]

export function Navbar() {
  const isAuthenticated = true // Replace with actual authentication logic
  const isAdmin = true // Replace with actual admin check logic
  const setIsOpen = (value: boolean) => {
    console.log("setIsOpen called with", value)
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-bold">
          My App
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/#services" className="text-white hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/#works" className="text-white hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="/pricing" className="text-white hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/#skills" className="text-white hover:text-primary transition-colors">
            Skills
          </Link>
          <Link href="/faq" className="text-white hover:text-primary transition-colors">
            FAQ
          </Link>
          <Link href="/#testimonials" className="text-white hover:text-primary transition-colors">
            Testimonials
          </Link>
          <Link href="/portal" className="text-white hover:text-primary transition-colors">
            Client Portal
          </Link>
          {isAuthenticated && isAdmin && (
            <Link href="/admin" className="text-white hover:text-primary transition-colors">
              Admin Portal
            </Link>
          )}
        </div>
        {/* Mobile Navigation - Add your mobile navigation code here if needed */}
        <Link
          href="/portal"
          className="text-white hover:text-primary transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Client Portal
        </Link>
        {isAuthenticated && isAdmin && (
          <Link
            href="/admin"
            className="text-white hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Admin Portal
          </Link>
        )}
      </div>
    </nav>
  )
}
