"use client"
import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { CardWrapper } from "./ui/card-wrapper"
import Image from "next/image"

interface TestimonialProps {
  name: string
  company: string
  content: string
  rating: number
  image?: string
}

function TestimonialCard({ name, company, content, rating, image }: TestimonialProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <CardWrapper
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className={`${i < rating ? "text-accent fill-accent" : "text-gray-300"}`} />
        ))}
      </div>

      <blockquote className="text-secondary mb-6 italic leading-relaxed">"{content}"</blockquote>

      <div className="flex items-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
          {image ? (
            <Image src={image || "/placeholder.svg"} alt={name} width={48} height={48} className="rounded-full" />
          ) : (
            <span className="text-primary font-semibold text-lg">{name.charAt(0)}</span>
          )}
        </div>
        <div>
          <div className="font-semibold text-primary">{name}</div>
          <div className="text-sm text-secondary">{company}</div>
        </div>
      </div>
    </CardWrapper>
  )
}

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Johnson Marketing",
      content:
        "NextPhase IT transformed our outdated systems into a modern, efficient operation. Their expertise in Microsoft 365 migration was invaluable.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      company: "Chen Consulting",
      content:
        "Professional, reliable, and always available when we need support. They've become an essential part of our business operations.",
      rating: 5,
    },
    {
      name: "Lisa Rodriguez",
      company: "Rodriguez Law Firm",
      content:
        "The security audit and compliance setup gave us peace of mind. We now meet all HIPAA requirements thanks to their thorough work.",
      rating: 5,
    },
    {
      name: "David Kim",
      company: "Kim Architecture",
      content:
        "Our new website and email system work flawlessly. The team was patient with our questions and delivered exactly what we needed.",
      rating: 5,
    },
    {
      name: "Jennifer Walsh",
      company: "Walsh Accounting",
      content:
        "Excellent communication throughout the project. They explained everything clearly and delivered on time and within budget.",
      rating: 5,
    },
    {
      name: "Robert Taylor",
      company: "Taylor Construction",
      content:
        "The workflow automation they set up has saved us hours each week. Highly recommend their Power Platform expertise.",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 bg-background" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">Trusted by Businesses Across Industries</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            See what our clients say about working with NextPhase IT to transform their technology infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
