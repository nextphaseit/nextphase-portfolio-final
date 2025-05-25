"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Phone, Mail, FileText, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/nextphase-logo.png"
              alt="NextPhase IT"
              width={150}
              height={40}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-white hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#works" className="text-white hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="#skills" className="text-white hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#testimonials" className="text-white hover:text-primary transition-colors">
              Testimonials
            </Link>

            {/* Contact Dropdown */}
            <div className="relative">
              <Button onClick={() => setIsContactOpen(!isContactOpen)} className="flex items-center gap-2">
                Contact <ChevronDown size={16} />
              </Button>

              {isContactOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a
                    href="tel:+19843109533"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsContactOpen(false)}
                  >
                    <Phone size={18} className="text-primary" />
                    <div>
                      <div className="font-medium">Call Now</div>
                      <div className="text-sm text-gray-500">+1 984-310-9533</div>
                    </div>
                  </a>

                  <a
                    href="mailto:support@nextphaseit.org"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsContactOpen(false)}
                  >
                    <Mail size={18} className="text-primary" />
                    <div>
                      <div className="font-medium">Send Email</div>
                      <div className="text-sm text-gray-500">support@nextphaseit.org</div>
                    </div>
                  </a>

                  <a
                    href="https://forms.cloud.microsoft/r/5Ad9WuMA3G"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsContactOpen(false)}
                  >
                    <FileText size={18} className="text-primary" />
                    <div>
                      <div className="font-medium">Get Started</div>
                      <div className="text-sm text-gray-500">Fill out intake form</div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 px-2 pt-2 pb-4">
              <Link
                href="#services"
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="#works"
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#skills"
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Skills
              </Link>
              <Link
                href="#testimonials"
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </Link>

              {/* Mobile Contact Options */}
              <div className="space-y-2 pt-2 border-t border-gray-700">
                <a
                  href="tel:+19843109533"
                  className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone size={18} /> Call Now
                </a>
                <a
                  href="mailto:support@nextphaseit.org"
                  className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Mail size={18} /> Send Email
                </a>
                <a
                  href="https://forms.cloud.microsoft/r/5Ad9WuMA3G"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FileText size={18} /> Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
