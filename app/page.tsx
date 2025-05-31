"use client"

import { useSession } from "next-auth/react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Services } from "@/components/services"
import { Stats } from "@/components/stats"
import { Testimonials } from "@/components/testimonials"
import { ContactForm } from "@/components/contact-form"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Chatbot } from "@/components/chatbot"
import { ArrowRight, CheckCircle, Star, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </main>
    )
  }

  if (status === "unauthenticated" || status === "authenticated") {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />

          <div className="container mx-auto px-4 pt-32 pb-20 relative">
            <div className="grid grid-cols-1 gap-12 items-center">
              <div className="space-y-8 text-center">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Professional
                    <span className="text-primary block">IT Services</span>
                    for Your Business
                  </h1>
                  <p className="text-xl text-gray-400 leading-relaxed">
                    Comprehensive technology solutions, expert support, and strategic consulting to help your business
                    thrive in the digital age.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                    <Link href="/about">
                      Get Started
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-6 pt-8 justify-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-400" size={20} />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-400" size={20} />
                    <span className="text-sm">5-Star Rated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-blue-400" size={20} />
                    <span className="text-sm">500+ Clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <Services />

        {/* Stats Section */}
        <Stats />

        {/* Projects Section */}
        <Projects />

        {/* Skills Section */}
        <Skills />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Section */}
        <ContactForm />

        {/* Chatbot */}
        <Chatbot />

        {/* Footer */}
        <footer className="bg-card mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
                <p className="text-gray-400 mb-4">
                  Professional IT services and solutions for businesses of all sizes.
                </p>
                <div className="flex space-x-4">{/* Social media links would go here */}</div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/services" className="hover:text-primary transition-colors">
                      IT Support
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="hover:text-primary transition-colors">
                      Cloud Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="hover:text-primary transition-colors">
                      Cybersecurity
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="hover:text-primary transition-colors">
                      Consulting
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/about" className="hover:text-primary transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/testimonials" className="hover:text-primary transition-colors">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-primary transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-primary transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>support@nextphaseit.org</li>
                  <li>(984) 310-9533</li>
                  <li>Charlotte, NC</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 NextPhase IT. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Error: Authentication failed.</p>
    </main>
  )
}
