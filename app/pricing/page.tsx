"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Chatbot } from "@/components/chatbot"
import { Check, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

interface PricingTierProps {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  buttonText: string
  buttonLink: string
}

function PricingTier({ name, price, description, features, popular, buttonText, buttonLink }: PricingTierProps) {
  return (
    <div
      className={`relative bg-surface rounded-lg border ${popular ? "border-primary shadow-lg scale-105" : "border-border-color"} p-8 h-full flex flex-col animate-fade-in`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-surface px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <Star size={16} />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-2">{name}</h3>
        <div className="text-4xl font-bold text-primary mb-2">{price}</div>
        <p className="text-text-secondary">{description}</p>
      </div>

      <div className="flex-grow mb-8">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <span className="text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        className={`w-full ${popular ? "bg-primary hover:bg-primary-hover" : ""}`}
        variant={popular ? "default" : "outline"}
        size="lg"
        asChild
      >
        <Link href={buttonLink} className="flex items-center justify-center gap-2">
          {buttonText}
          <ArrowRight size={16} />
        </Link>
      </Button>
    </div>
  )
}

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Starter",
      price: "$299/mo",
      description: "Perfect for small businesses getting started with professional IT",
      features: [
        "Email setup & configuration",
        "Basic Microsoft 365 setup",
        "Monthly system health check",
        "Email support during business hours",
        "Basic security configuration",
        "Up to 5 user accounts",
      ],
      buttonText: "Get Started",
      buttonLink: "/contact",
    },
    {
      name: "Professional",
      price: "$599/mo",
      description: "Comprehensive IT management for growing businesses",
      features: [
        "Everything in Starter",
        "Advanced Microsoft 365 management",
        "Weekly system monitoring",
        "Priority phone & email support",
        "Security audits & compliance",
        "Up to 25 user accounts",
        "Custom workflow automation",
        "Monthly strategy consultation",
      ],
      popular: true,
      buttonText: "Contact Sales",
      buttonLink: "/contact",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large organizations with complex needs",
      features: [
        "Everything in Professional",
        "Unlimited user accounts",
        "24/7 priority support",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security & compliance",
        "On-site support available",
        "Quarterly business reviews",
      ],
      buttonText: "Contact Sales",
      buttonLink: "/contact",
    },
  ]

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-primary-hover text-surface py-20 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Flexible IT solutions for growing businesses
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose Your IT Support Plan</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Professional IT services designed to scale with your business. No hidden fees, transparent pricing, and
              expert support when you need it.
            </p>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <PricingTier key={index} {...tier} />
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-surface py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">Additional Services</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Need something specific? We offer additional services that can be added to any plan or purchased
                separately.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Website Design", price: "From $1,500", description: "Custom website development" },
                { name: "Data Migration", price: "$500-$2,000", description: "Seamless data transfers" },
                { name: "Security Audit", price: "$750", description: "Comprehensive security review" },
                { name: "Training Sessions", price: "$150/hour", description: "Staff training & onboarding" },
              ].map((service, index) => (
                <div key={index} className="bg-background border border-border-color rounded-lg p-6 text-center">
                  <h4 className="font-semibold text-text-primary mb-2">{service.name}</h4>
                  <div className="text-primary font-bold mb-2">{service.price}</div>
                  <p className="text-text-secondary text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Ready to Get Started?</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Every plan includes a free consultation to understand your needs and ensure we're the right fit for your
              business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+19843109533">Call +1 984-310-9533</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-surface border-t border-border-color">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-4">NextPhase IT</h3>
                <p className="text-text-secondary">
                  Professional IT consulting and support services for growing businesses.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-text-secondary hover:text-primary-hover transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="text-text-secondary hover:text-primary-hover transition-colors">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-text-secondary hover:text-primary-hover transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/testimonials"
                      className="text-text-secondary hover:text-primary-hover transition-colors"
                    >
                      Testimonials
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-4">Services</h4>
                <ul className="space-y-2 text-text-secondary">
                  <li>Microsoft 365 Management</li>
                  <li>IT Support & Consulting</li>
                  <li>Security & Compliance</li>
                  <li>Custom Development</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-4">Contact</h4>
                <ul className="space-y-2 text-text-secondary">
                  <li>support@nextphaseit.org</li>
                  <li>+1 984-310-9533</li>
                  <li>Clayton, NC</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border-color mt-12 pt-8 text-center text-text-muted">
              <p>© 2025 NextPhase IT. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <Chatbot />
    </>
  )
}
