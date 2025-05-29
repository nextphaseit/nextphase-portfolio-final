"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Services } from "@/components/services"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Testimonials } from "@/components/testimonials"
import { ContactForm } from "@/components/contact-form"
import { Stats } from "@/components/stats"
import { Chatbot } from "@/components/chatbot"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Ticket, FileText, Phone, Mail } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Business with
                <span className="text-primary block">NextPhase IT</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Empowering small businesses with enterprise-level technology solutions. From web development to cloud
                infrastructure, we deliver secure, scalable, and efficient IT solutions that drive growth.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-black font-semibold">
                  <Link href="/portal" className="flex items-center gap-2">
                    <Ticket size={20} />
                    Submit a Ticket
                    <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary text-primary hover:bg-primary hover:text-black"
                >
                  <Link href="/about#new-client-form" className="flex items-center gap-2">
                    <FileText size={20} />
                    New Client Form
                  </Link>
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <a
                  href="tel:+19843109533"
                  className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                >
                  <Phone size={16} />
                  (984) 310-9533
                </a>
                <a
                  href="mailto:info@nextphaseit.org"
                  className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                >
                  <Mail size={16} />
                  info@nextphaseit.org
                </a>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/nextphase-logo.png"
                alt="NextPhase IT"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <Stats />
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </div>
          <Services />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <Skills />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="container mx-auto px-4">
          <Projects />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              Don't just take our word for it. Here's what our clients have to say about their experiences.
            </p>
            <Button variant="outline" asChild>
              <Link href="/testimonials" className="flex items-center gap-2">
                View All Testimonials
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </main>
  )
}
