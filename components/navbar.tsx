"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-surface shadow-lg fixed w-full top-0 z-50 border-b border-border-color">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <Link
            href="/"
            className="text-text-primary font-bold text-xl hover:text-primary-hover transition-colors"
            onClick={closeMenu}
          >
            NextPhase IT
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-text-secondary hover:text-primary-hover transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-text-secondary hover:text-primary-hover transition-colors font-medium">
              About
            </Link>
            <Link
              href="/#services"
              className="text-text-secondary hover:text-primary-hover transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="text-text-secondary hover:text-primary-hover transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/testimonials"
              className="text-text-secondary hover:text-primary-hover transition-colors font-medium"
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className="text-text-secondary hover:text-primary-hover transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-text-primary hover:text-primary-hover transition-colors p-2"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-surface border-t border-border-color">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-text-secondary hover:text-primary-hover hover:bg-background rounded-md transition-colors font-medium"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-text-secondary hover:text-primary-hover hover:bg-background rounded-md transition-colors font-medium"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href="/#services"
                className="block px-3 py-2 text-text-secondary hover:text-primary-hover hover:bg-background rounded-md transition-colors font-medium"
                onClick={closeMenu}
              >
                Services
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-text-secondary hover:text-primary-hover hover:bg-background rounded-md transition-colors font-medium"
                onClick={closeMenu}
              >
                Pricing
              </Link>
              <Link
                href="/testimonials"
                className="block px-3 py-2 text-text-secondary hover:text-primary-hover hover:bg-background rounded-md transition-colors font-medium"
                onClick={closeMenu}
              >
                Testimonials
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-text-secondary hover:text-primary-hover hover:bg-background rounded-md transition-colors font-medium"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
