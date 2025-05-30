import { Navbar } from "@/components/navbar"
import { Services } from "@/components/services"
import { Stats } from "@/components/stats"
import { Projects } from "@/components/projects"
import { Testimonials } from "@/components/testimonials"
import { ContactForm } from "@/components/contact-form"
import { Chatbot } from "@/components/chatbot"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ticket, UserPlus } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 py-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Transform Your Business with <span className="text-primary">NextPhase IT</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Empowering small businesses with enterprise-level technology solutions. From web development to cloud
              infrastructure, we deliver secure, scalable, and efficient IT solutions that drive growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/portal" className="flex items-center gap-2">
                  <Ticket size={20} />
                  Submit a Ticket
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about#new-client-form" className="flex items-center gap-2">
                  <UserPlus size={20} />
                  New Client Form
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>(984) 310-8533</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✉️</span>
                <span>info@nextphaseit.org</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/nextphase-logo.png"
              alt="NextPhase IT Logo"
              width={600}
              height={400}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services />

      {/* Stats Section */}
      <Stats />

      {/* Projects Section */}
      <Projects />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <ContactForm />

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
