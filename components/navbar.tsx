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
            <Link href="/pricing" className="text-white hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#skills" className="text-white hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#testimonials" className="text-white hover:text-primary transition-colors">
              Testimonials
            </Link>

            {/* Contact Dropdown */}
            <div className="relative">
              <Button
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                data-contact-trigger
              >
                Contact <ChevronDown size={16} />
              </Button>

              {isContactOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Get In Touch</h3>
                    <p className="text-sm text-gray-500">Choose your preferred contact method</p>
                  </div>

                  <div className="py-2">
                    <a
                      href="tel:+19843109533"
                      className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors group"
                      onClick={() => setIsContactOpen(false)}
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <Phone size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Call Now</div>
                        <div className="text-sm text-gray-500">+1 984-310-9533</div>
                      </div>
                    </a>

                    <a
                      href="mailto:support@nextphaseit.org"
                      className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors group"
                      onClick={() => setIsContactOpen(false)}
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Mail size={18} className="text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Send Email</div>
                        <div className="text-sm text-gray-500">support@nextphaseit.org</div>
                      </div>
                    </a>

                    <a
                      href="https://forms.cloud.microsoft/r/5Ad9WuMA3G"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors group"
                      onClick={() => setIsContactOpen(false)}
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <FileText size={18} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Start a Project</div>
                        <div className="text-sm text-gray-500">Fill out our intake form</div>
                      </div>
                    </a>
                  </div>

                  <div className="px-4 py-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center">Available Monday - Friday, 9AM - 6PM EST</p>
                  </div>
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
                href="/pricing"
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
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
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Contact Options:</div>

                <a
                  href="tel:+19843109533"
                  className="flex items-center gap-3 text-white hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="font-medium">Call Now</div>
                    <div className="text-xs text-gray-400">+1 984-310-9533</div>
                  </div>
                </a>

                <a
                  href="mailto:support@nextphaseit.org"
                  className="flex items-center gap-3 text-white hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="font-medium">Send Email</div>
                    <div className="text-xs text-gray-400">support@nextphaseit.org</div>
                  </div>
                </a>

                <a
                  href="https://forms.cloud.microsoft/r/5Ad9WuMA3G"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <FileText size={16} />
                  </div>
                  <div>
                    <div className="font-medium">Start a Project</div>
                    <div className="text-xs text-gray-400">Intake form</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
