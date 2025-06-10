"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

const Contact = () => {
  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <div className="relative">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#0A4DA1]">
                Get in Touch
              </h1>
              <p className="text-xl text-[#555555]">
                We're here to help with your IT needs
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Details */}
                <div className="space-y-8">
                  <div className="bg-white rounded-lg p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <Phone className="w-6 h-6 text-[#0A4DA1] mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Phone</h3>
                          <p className="text-[#555555]">+1 984-310-9533</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Mail className="w-6 h-6 text-[#0A4DA1] mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <p className="text-[#555555]">adrian.knight@nextphaseit.org</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-[#0A4DA1] mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Address</h3>
                          <p className="text-[#555555]">Clayton, NC</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="bg-white rounded-lg p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
                    <div className="flex gap-6">
                      <a href="#" className="text-[#0A4DA1] hover:text-[#1E88E5] transition-colors">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-[#0A4DA1] hover:text-[#1E88E5] transition-colors">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">Location</h2>
                  <div className="aspect-video relative rounded-lg overflow-hidden grayscale">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206852.72156983668!2d-78.4738763!3d35.6513763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5a2f9f51e0f7%3A0x6790b6528a11f0ad!2sClayton%2C%20NC!5e0!3m2!1sen!2sus!4v1647881234567!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0A4DA1] text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
                <p className="text-white/80">
                  Empowering businesses with modern IT solutions and expert support.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-white/80 hover:text-white">Home</a></li>
                  <li><a href="/services" className="text-white/80 hover:text-white">Services</a></li>
                  <li><a href="/about" className="text-white/80 hover:text-white">About</a></li>
                  <li><a href="/contact" className="text-white/80 hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2 text-white/80">
                  <li>+1 984-310-9533</li>
                  <li>adrian.knight@nextphaseit.org</li>
                  <li>Clayton, NC</li>
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

export default Contact 