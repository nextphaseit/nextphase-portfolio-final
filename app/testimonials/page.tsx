"use client"

import { Navbar } from "@/components/navbar"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Quote, Star, ArrowLeft } from "lucide-react"

interface TestimonialProps {
  content: string
  author: string
  position: string
  company: string
  image: string
  title: string
  rating: number
  projectType: string
}

function TestimonialCard({ content, author, position, company, image, title, rating, projectType }: TestimonialProps) {
  return (
    <CardWrapper className="h-full">
      <div className="flex flex-col h-full">
        <Quote className="text-primary mb-4 h-8 w-8" />

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-current" : "text-gray-600"} />
          ))}
          <span className="text-sm text-gray-400 ml-2">({rating}/5)</span>
        </div>

        <h4 className="font-semibold text-primary mb-2">{title}</h4>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full mb-4 self-start">{projectType}</span>

        <p className="text-gray-400 mb-6 flex-grow italic">"{content}"</p>

        <div className="flex items-center gap-4 mt-auto">
          <Image
            src={image || "/placeholder.svg"}
            alt={author}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold">{author}</h4>
            <p className="text-sm text-gray-400">{position}</p>
            <p className="text-sm text-primary">{company}</p>
          </div>
        </div>
      </div>
    </CardWrapper>
  )
}

export default function TestimonialsPage() {
  const testimonials = [
    {
      author: "Lucien R.",
      position: "Owner",
      company: "Lu's Kitchen",
      image: "/images/lucien.jpg",
      title: "Complete IT Infrastructure Overhaul",
      projectType: "IT Consulting & Security",
      rating: 5,
      content:
        "NextPhase IT completely transformed our tech infrastructure. From email migration to securing our data with compliance in mind, Adrian and his team were responsive, knowledgeable, and truly professional. As a small business owner, I now feel confident knowing our systems are protected and efficient. The ongoing support has been exceptional.",
    },
    {
      author: "Trey Sanders.",
      position: "Founder",
      company: "All about IT",
      image: "/images/about-img.png",
      title: "Custom Booking Website with Automation",
      projectType: "Web Development & Automation",
      rating: 5,
      content:
        "I needed a booking website with integrated payments and automated emails. NextPhase IT delivered exactly what I envisioned—clean design, seamless user experience, and everything works like clockwork. The automated booking confirmations and payment processing have saved me countless hours. I highly recommend their services to any business needing tech done right.",
    },
    {
      author: "Michael Chen",
      position: "IT Director",
      company: "Coastal Manufacturing",
      image: "/placeholder.svg?height=48&width=48&text=MC",
      title: "Microsoft 365 Migration & Training",
      projectType: "Cloud Migration & Training",
      rating: 5,
      content:
        "Our migration from on-premises Exchange to Microsoft 365 was seamless thanks to NextPhase IT. They handled everything from planning to execution, and provided comprehensive training for our 50+ employees. Zero downtime during the transition, and the ongoing support has been fantastic. Our productivity has increased significantly.",
    },
    {
      author: "Sarah Johnson",
      position: "Practice Manager",
      company: "Johnson Medical Group",
      image: "/placeholder.svg?height=48&width=48&text=SJ",
      title: "HIPAA-Compliant IT Infrastructure",
      projectType: "Healthcare IT & Compliance",
      rating: 5,
      content:
        "As a medical practice, HIPAA compliance is critical. NextPhase IT implemented a complete security overhaul including encrypted communications, secure file sharing, and staff training. Their attention to healthcare regulations and ongoing monitoring gives us peace of mind. Highly professional and knowledgeable team.",
    },
    {
      author: "David Rodriguez",
      position: "CEO",
      company: "Rodriguez Construction",
      image: "/placeholder.svg?height=48&width=48&text=DR",
      title: "Field Management System Integration",
      projectType: "Custom Software & Mobile Solutions",
      rating: 4,
      content:
        "NextPhase IT developed a custom field management system that connects our office with job sites in real-time. Project tracking, time management, and client communications are now streamlined. The mobile app works perfectly even in areas with poor connectivity. Great ROI on this investment.",
    },
    {
      author: "Lisa Thompson",
      position: "Marketing Director",
      company: "Thompson & Associates",
      image: "/placeholder.svg?height=48&width=48&text=LT",
      title: "Website Redesign & SEO Optimization",
      projectType: "Web Design & Digital Marketing",
      rating: 5,
      content:
        "Our new website not only looks amazing but has dramatically improved our online presence. NextPhase IT's approach to SEO and user experience design resulted in a 300% increase in qualified leads within the first quarter. The content management system is intuitive and the ongoing support is excellent.",
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <section className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </Button>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Client <span className="text-primary">Testimonials</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Don't just take our word for it. Here's what our clients have to say about their experiences working with
            NextPhase IT.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <CardWrapper className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <div className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Experience the NextPhase IT difference. Let's discuss how we can help transform your business with
                cutting-edge technology solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/about#new-client-form">Get Started Today</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary text-primary hover:bg-primary hover:text-black"
                >
                  <Link href="/#contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </CardWrapper>
        </section>
      </div>
    </main>
  )
}
