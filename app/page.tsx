"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Phone, Mail, MapPin, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { FC, useState } from "react"
import { FreeResources } from "@/components/free-resources"
import Link from "next/link"
import { event } from '@/lib/gtag'

const Home: FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const testimonials = [
    {
      text: "NextPhase IT has been excellent for our website hosting and security consults.",
      author: "Inner Clarity INC"
    },
    // Add more testimonials as needed
  ]

  const handleBookingClick = () => {
    event({
      action: 'book_consultation_click',
      category: 'Engagement',
      label: 'Book Consultation Button',
    })
  }

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      {/* Content */}
      <div className="relative">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0A4DA1] to-[#1E88E5] text-white pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Modern IT Solutions for Your Business
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Empowering small businesses with cloud, security, and IT expertise.
              </p>
              <Link href="/book" onClick={handleBookingClick}>
                <Button
                  size="lg"
                  className="bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white px-8 py-6 text-lg"
                >
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-16 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-center mb-12">Trusted By</h2>
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-70">
              <Image src="/images/macla-logo.png" alt="MACLA" width={120} height={40} className="h-8 w-auto" />
              <Image src="/images/inner-clarity-logo.png" alt="Inner Clarity INC" width={120} height={40} className="h-8 w-auto" />
              <Image src="/images/strokes-of-faith-logo.png" alt="Strokes of Faith" width={120} height={40} className="h-8 w-auto" />
              <Image src="/images/vtxp-logo.png" alt="VTXP" width={120} height={40} className="h-8 w-auto" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cloud Solutions */}
              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#0A4DA1]/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#0A4DA1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Cloud Solutions</h3>
                <p className="text-[#555555] mb-6">Modernize your cloud infrastructure.</p>
                <a href="#" className="text-[#1E88E5] hover:text-[#0A4DA1] font-medium">Learn More →</a>
              </div>

              {/* Security Audits */}
              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#0A4DA1]/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#0A4DA1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Security Audits</h3>
                <p className="text-[#555555] mb-6">Protect your data with thorough assessments.</p>
                <a href="#" className="text-[#1E88E5] hover:text-[#0A4DA1] font-medium">Learn More →</a>
              </div>

              {/* IT Support */}
              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#0A4DA1]/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#0A4DA1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">IT Support</h3>
                <p className="text-[#555555] mb-6">Reliable tech assistance for your business.</p>
                <a href="#" className="text-[#1E88E5] hover:text-[#0A4DA1] font-medium">Learn More →</a>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="text-center">
                  <p className="text-xl text-[#555555] mb-6">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <p className="font-semibold">— {testimonials[currentTestimonial].author}</p>
                </div>
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
                >
                  <ChevronLeft className="w-6 h-6 text-[#0A4DA1]" />
                </button>
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
                >
                  <ChevronRight className="w-6 h-6 text-[#0A4DA1]" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Free Resources Section */}
        <FreeResources />

        {/* CTA Banner */}
        <section className="py-16 bg-gradient-to-r from-[#F9FAFB] to-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to elevate your IT?</h2>
            <Button
              size="lg"
              className="bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white px-8 py-6 text-lg"
            >
              Schedule a Consultation
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0A4DA1] text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
                <p className="text-white/80 mb-6">
                  Empowering businesses with modern IT solutions and expert support.
                </p>
                <Link href="/book" onClick={handleBookingClick}>
                  <Button
                    size="lg"
                    className="bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white"
                  >
                    Book a Consultation
                  </Button>
                </Link>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-white/80 hover:text-white">Home</a></li>
                  <li><a href="/services" className="text-white/80 hover:text-white">Services</a></li>
                  <li><a href="/success-stories" className="text-white/80 hover:text-white">Success Stories</a></li>
                  <li><a href="/about" className="text-white/80 hover:text-white">About</a></li>
                  <li><a href="/contact" className="text-white/80 hover:text-white">Contact</a></li>
                  <li><a href="#resources" className="text-white/80 hover:text-white">Free Resources</a></li>
                  <li><a href="/faq" className="text-white/80 hover:text-white">FAQ</a></li>
                  <li><a href="/client-portal" className="text-white/80 hover:text-white">Client Portal</a></li>
                  <li><a href="/legal" className="text-white/80 hover:text-white">Legal</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>+1 984-310-9533</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>adrian.knight@nextphaseit.org</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Clayton, NC</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-white hover:text-[#1E88E5] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-[#1E88E5] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
              <p>© 2024 NextPhase IT. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-[#0A4DA1] text-white rounded-full shadow-lg hover:bg-[#1E88E5] transition-colors"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>
    </main>
  )
}

export default Home
