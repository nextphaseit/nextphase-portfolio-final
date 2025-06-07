"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Chatbot } from "@/components/chatbot"
import { Quote, Star, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TestimonialProps {
  content: string
  author: string
  position: string
  company: string
  image: string
  rating: number
}

function TestimonialCard({ content, author, position, company, image, rating }: TestimonialProps) {
  return (
    <div className="bg-surface border border-border-color rounded-lg p-8 h-full flex flex-col animate-fade-in shadow-sm hover:shadow-md transition-shadow">
      <Quote className="text-primary mb-4 h-8 w-8" />

      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className={i < rating ? "text-accent fill-current" : "text-text-muted"} />
        ))}
        <span className="text-sm text-text-muted ml-2">({rating}/5)</span>
      </div>

      <p className="text-text-secondary mb-6 flex-grow italic leading-relaxed">"{content}"</p>

      <div className="flex items-center gap-4 mt-auto">
        <Image
          src={image || "/placeholder.svg?height=48&width=48&text=Client"}
          alt={author}
          width={48}
          height={48}
          className="rounded-full object-cover border-2 border-border-color"
        />
        <div>
          <h4 className="font-semibold text-text-primary">{author}</h4>
          <p className="text-sm text-text-secondary">{position}</p>
          <p className="text-sm text-primary font-medium">{company}</p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsPage() {
  const testimonials = [
    {
      author: "Lucien R.",
      position: "Owner",
      company: "Lu's Kitchen",
      image: "/images/lucien.jpg",
      rating: 5,
      content:
        "NextPhase IT completely transformed our tech infrastructure. From email migration to securing our data with compliance in mind, Adrian and his team were responsive, knowledgeable, and truly professional.",
    },
    {
      author: "Alexis A.",
      position: "Founder",
      company: "All about IT",
      image: "/images/about-img.png",
      rating: 5,
      content:
        "I needed a booking website with integrated payments and automated emails. NextPhase IT delivered exactly what I envisioned—clean design, seamless user experience, and everything works like clockwork.",
    },
    
    },
  ]

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-primary-hover text-surface py-20 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="bg-surface/20 border-surface/30 text-surface hover:bg-surface hover:text-primary"
              >
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Back to Home
                </Link>
              </Button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Businesses Across Industries</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Don't just take our word for it. Here's what our clients have to say about their experiences working with
              NextPhase IT.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">50+</div>
                <div className="text-blue-100">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">99%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-accent fill-current" />
                  ))}
                </div>
                <div className="text-blue-100">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-surface py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-12 text-center">
              <h2 className="text-3xl font-bold text-text-primary mb-4">Ready to Join Our Success Stories?</h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Experience the NextPhase IT difference. Let's discuss how we can help transform your business with
                cutting-edge technology solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Get Started Today</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
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
