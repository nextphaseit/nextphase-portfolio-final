"use client"

import { Button } from "@/components/ui/button"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Testimonials } from "@/components/testimonials"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { AuthProvider } from "@/providers/auth-provider"
import { Phone, Mail, MessageCircle, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <AuthProvider>
      <main className="min-h-screen bg-black text-white relative">
        {/* Background Logo */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
            <Image
              src="/images/nextphase-logo.png"
              alt=""
              width={800}
              height={600}
              className="w-auto h-96 object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          {/* Hero Section */}
          <section className="container mx-auto px-4 pt-32 pb-20">
            <div className="grid grid-cols-1 gap-12 items-center">
              <div className="text-center">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  <span className="block text-primary">Web & IT Solutions Consultant.</span>
                </h1>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  I serve as a Web & IT Solutions Consultant, for NextPhase IT helping small businesses build secure,
                  scalable websites integrated with modern cloud tools.
                </p>
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    asChild
                    className="bg-primary hover:bg-primary/90 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-black transition-all duration-300"
                  >
                    <a href="https://forms.cloud.microsoft/r/5Ad9WuMA3G" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <Stats />
          </section>

          {/* Other Sections */}
          <div className="container mx-auto px-4">
            <Services />
            <Projects />
            <Skills />
            <Testimonials />

            {/* Contact Section */}
            <section className="py-16" id="contact">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Let's Get In Touch</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Have a project in mind or want to discuss potential opportunities? We're here to help.
                  </p>
                </div>

                {/* Need More Help Section */}
                <div className="max-w-4xl mx-auto">
                  <div className="bg-card rounded-lg p-8 border border-primary/20">
                    <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                      <MessageCircle className="text-primary" size={24} />
                      Need More Help?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <MessageCircle className="text-primary" size={24} />
                        </div>
                        <h3 className="font-semibold mb-2">Live Chat</h3>
                        <p className="text-gray-400 text-sm">Available on our website</p>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Mail className="text-primary" size={24} />
                        </div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <a href="mailto:support@nextphaseit.org" className="text-primary text-sm hover:underline">
                          support@nextphaseit.org
                        </a>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Phone className="text-primary" size={24} />
                        </div>
                        <h3 className="font-semibold mb-2">Phone</h3>
                        <a href="tel:+19843109533" className="text-primary text-sm hover:underline">
                          (984) 310-9533
                        </a>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <ExternalLink className="text-primary" size={24} />
                        </div>
                        <h3 className="font-semibold mb-2">NextPhase IT Help Desk</h3>
                        <Link href="/portal" className="text-primary text-sm hover:underline">
                          Access Help Desk
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="bg-card mt-20">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
                  <p className="text-gray-400">
                    NextPhase IT is a technology consulting company dedicated to helping small businesses thrive through
                    smart, scalable solutions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <Link href="/#services" className="hover:text-primary transition-colors">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/#works" className="hover:text-primary transition-colors">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing" className="hover:text-primary transition-colors">
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="hover:text-primary transition-colors">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="/#skills" className="hover:text-primary transition-colors">
                        Skills
                      </Link>
                    </li>
                    <li>
                      <Link href="/#testimonials" className="hover:text-primary transition-colors">
                        Testimonials
                      </Link>
                    </li>
                    <li>
                      <Link href="/#contact" className="hover:text-primary transition-colors">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/login" className="hover:text-primary transition-colors">
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Services</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>Technical Support & Training</li>
                    <li>Workflow Automation</li>
                    <li>Custom Web Development</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Contact Us</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>support@nextphaseit.org</li>
                    <li>+1 984-310-9533</li>
                    <li>Clayton, NC</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>© 2024 NextPhase IT. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>

        {/* Chatbot */}
        <Chatbot />
      </main>
    </AuthProvider>
  )
}
