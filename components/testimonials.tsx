import { CardWrapper } from "./ui/card-wrapper"
import Image from "next/image"
import { Quote } from "lucide-react"

interface TestimonialProps {
  content: string
  author: string
  position: string
  image: string
  title: string
}

function TestimonialCard({ content, author, position, image, title }: TestimonialProps) {
  return (
    <CardWrapper>
      <Quote className="text-primary mb-4 h-8 w-8" />
      <h4 className="font-semibold text-primary mb-2">{title}</h4>
      <p className="text-gray-400 mb-6">{content}</p>
      <div className="flex items-center gap-4">
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
        </div>
      </div>
    </CardWrapper>
  )
}

export function Testimonials() {
  const testimonials = [
    {
      author: "Lucien R.",
      position: "Owner, Lu's Kitchen",
      image: "/images/lucien.jpg",
      title: "IT Consulting Service",
      content:
        "NextPhase IT completely transformed our tech infrastructure. From email migration to securing our data with compliance in mind, Adrian and his team were responsive, knowledgeable, and truly professional. As a small business owner, I now feel confident knowing our systems are protected and efficient.",
    },
    {
      author: "Alexis A.",
      position: "Business Owner",
      image: "/images/about-img.png",
      title: "Website & Automation Setup",
      content:
        "I needed a booking website with integrated payments and automated emails. NextPhase IT delivered exactly what I envisioned—clean design, seamless user experience, and everything works like clockwork. I highly recommend their services to any business needing tech done right.",
    },
  ]

  return (
    <section className="py-16" id="testimonials">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say about their experiences working with us.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  )
}
