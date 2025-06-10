"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LogoEasterEgg } from "@/components/LogoEasterEgg"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm' : 
      isHomePage ? 'bg-transparent' : 'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <LogoEasterEgg>
              <Image
                src="/images/nextphase-logo.png"
                alt="NextPhase IT"
                width={150}
                height={40}
                className="h-12 w-auto"
              />
            </LogoEasterEgg>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={`${isScrolled || !isHomePage ? 'text-[#222222]' : 'text-white'} hover:text-[#1E88E5] transition-colors font-medium`}>
              Home
            </Link>
            <Link href="/services" className={`${isScrolled || !isHomePage ? 'text-[#222222]' : 'text-white'} hover:text-[#1E88E5] transition-colors font-medium`}>
              Services
            </Link>
            <Link href="/success-stories" className={`${isScrolled || !isHomePage ? 'text-[#222222]' : 'text-white'} hover:text-[#1E88E5] transition-colors font-medium`}>
              Success Stories
            </Link>
            <Link href="/about" className={`${isScrolled || !isHomePage ? 'text-[#222222]' : 'text-white'} hover:text-[#1E88E5] transition-colors font-medium`}>
              About
            </Link>
            <Link href="/contact" className={`${isScrolled || !isHomePage ? 'text-[#222222]' : 'text-white'} hover:text-[#1E88E5] transition-colors font-medium`}>
              Contact
            </Link>
            <Link href="/client-portal" className={`${isScrolled || !isHomePage ? 'text-[#222222]' : 'text-white'} hover:text-[#1E88E5] transition-colors font-medium`}>
              Client Portal
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 ${isScrolled || !isHomePage ? 'text-[#222222]' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`fixed inset-0 bg-white z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="text-2xl font-bold text-[#1E88E5]">
                  NextPhase IT
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#222222] hover:text-[#1E88E5] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-4">
                <Link
                  href="/"
                  className="block py-2 text-[#222222] hover:text-[#1E88E5] transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="block py-2 text-[#222222] hover:text-[#1E88E5] transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/success-stories"
                  className="block py-2 text-[#222222] hover:text-[#1E88E5] transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Success Stories
                </Link>
                <Link
                  href="/about"
                  className="block py-2 text-[#222222] hover:text-[#1E88E5] transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block py-2 text-[#222222] hover:text-[#1E88E5] transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/client-portal"
                  className="block py-2 text-[#222222] hover:text-[#1E88E5] transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Client Portal
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
