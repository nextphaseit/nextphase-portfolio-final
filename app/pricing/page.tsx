"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Chatbot } from "@/components/chatbot"
import { AuthProvider } from "@/providers/auth-provider"
import { Cloud, Mail, Globe, Database, Shield, Headphones, Workflow, Users, Star, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ServiceCardProps {
  title: string
  pricing: string
  description: string
  icon: React.ReactNode
  features?: string[]
  popular?: boolean
}

function ServiceCard({ title, pricing, description, icon, features, popular }: ServiceCardProps) {
  return (
    <CardWrapper className={`relative ${popular ? "border-accent border-2" : ""}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star size={14} />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="text-2xl font-bold text-primary mb-2">{pricing}</div>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      {features && (
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Check size={16} className="text-accent flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      )}

      <Button className="w-full" asChild>
        <a href="https://forms.cloud.microsoft/r/5Ad9WuMA3G" target="_blank" rel="noopener noreferrer">
          Get Quote
        </a>
      </Button>
    </CardWrapper>
  )
}

function PricingContent() {
  const services = [
    {
      title: "Microsoft 365 Setup & Support",
      pricing: "$250-$500",
      description: "One-time setup + $50-$100/mo per user for ongoing support",
      icon: <Cloud size={32} />,
      features: [
        "Complete M365 environment setup",
        "User account configuration",
        "Security settings optimization",
        "Ongoing monthly support included",
      ],
    },
    {
      title: "Domain & Email Setup",
      pricing: "$100-$250",
      description: "Professional email and domain configuration",
      icon: <Mail size={32} />,
      features: ["Custom domain registration", "Professional email setup", "DNS configuration", "Email client setup"],
    },
    {
      title: "Website Design & Hosting",
      pricing: "$750-$2,000+",
      description: "Custom websites + $25-$75/mo for hosting & updates",
      icon: <Globe size={32} />,
      features: [
        "Responsive website design",
        "SEO optimization",
        "Content management system",
        "Monthly hosting & updates",
      ],
    },
    {
      title: "Data Migration Services",
      pricing: "$300-$1,000",
      description: "Seamless data migration (e.g., G Suite to M365)",
      icon: <Database size={32} />,
      features: [
        "Complete data assessment",
        "Zero-downtime migration",
        "Data integrity verification",
        "Post-migration support",
      ],
    },
    {
      title: "Security & Compliance Audit",
      pricing: "$500-$2,000",
      description: "Comprehensive security audits including HIPAA compliance",
      icon: <Shield size={32} />,
      features: [
        "Full security assessment",
        "HIPAA/GDPR compliance review",
        "Vulnerability identification",
        "Remediation recommendations",
      ],
    },
    {
      title: "Remote Support & IT Retainer",
      pricing: "$100-$200/hr",
      description: "Flexible support plans: $250-$750/month retainer options",
      icon: <Headphones size={32} />,
      features: [
        "Priority technical support",
        "Remote troubleshooting",
        "Preventive maintenance",
        "Monthly system health checks",
      ],
    },
    {
      title: "SharePoint & Power Automate",
      pricing: "$500-$1,500",
      description: "Custom automation and collaboration solutions",
      icon: <Workflow size={32} />,
      features: [
        "Custom SharePoint sites",
        "Workflow automation",
        "Power Apps development",
        "Integration with existing systems",
      ],
    },
    {
      title: "IT Onboarding for Teams",
      pricing: "$250-$500",
      description: "Per employee comprehensive IT setup and training",
      icon: <Users size={32} />,
      features: [
        "Individual user setup",
        "Software installation & configuration",
        "Security training",
        "Documentation & guides",
      ],
    },
  ]

  return (
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
        <section className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-primary">Transparent</span> Pricing
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
              Professional IT services with clear, competitive pricing. No hidden fees, no surprises. Choose the
              services that fit your business needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://forms.cloud.microsoft/r/5Ad9WuMA3G" target="_blank" rel="noopener noreferrer">
                  Get Custom Quote
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  // Scroll to top and trigger contact dropdown
                  window.scrollTo({ top: 0, behavior: "smooth" })
                  // Small delay to ensure we're at the top, then trigger contact menu
                  setTimeout(() => {
                    const contactButton = document.querySelector("[data-contact-trigger]")
                    if (contactButton) {
                      contactButton.click()
                    }
                  }, 500)
                }}
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Bundle */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <CardWrapper className="border-accent border-2 bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Star size={16} />
                  Bundle Deal
                </div>
                <h2 className="text-3xl font-bold mb-4">Startup IT Kit</h2>
                <div className="text-4xl font-bold text-accent mb-4">$999</div>
                <p className="text-gray-300 text-lg">Complete IT foundation for new businesses - Save over $300!</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Mail className="text-accent mx-auto mb-2" size={24} />
                  <h4 className="font-semibold mb-1">Professional Email</h4>
                  <p className="text-sm text-gray-400">Custom domain & email setup</p>
                </div>
                <div className="text-center">
                  <Globe className="text-accent mx-auto mb-2" size={24} />
                  <h4 className="font-semibold mb-1">Business Website</h4>
                  <p className="text-sm text-gray-400">Professional website design</p>
                </div>
                <div className="text-center">
                  <Cloud className="text-accent mx-auto mb-2" size={24} />
                  <h4 className="font-semibold mb-1">Microsoft 365</h4>
                  <p className="text-sm text-gray-400">Complete cloud setup</p>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                  <a href="https://forms.cloud.microsoft/r/5Ad9WuMA3G" target="_blank" rel="noopener noreferrer">
                    Get Startup Kit
                  </a>
                </Button>
              </div>
            </CardWrapper>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 pb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Individual Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose specific services that meet your business needs. All pricing is transparent and includes
              consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 pb-16">
          <CardWrapper className="text-center bg-primary/10">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Every project begins with a free consultation to understand your needs and provide accurate pricing. No
              obligation, just honest advice about what's best for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://forms.cloud.microsoft/r/5Ad9WuMA3G" target="_blank" rel="noopener noreferrer">
                  Start Your Project
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+19843109533">Call +1 984-310-9533</a>
              </Button>
            </div>
          </CardWrapper>
        </section>

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
  )
}

export default function PricingPage() {
  return (
    <AuthProvider>
      <PricingContent />
    </AuthProvider>
  )
}
