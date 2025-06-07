import type React from "react"
import { Users, Settings, Zap } from "lucide-react"
import { CardWrapper } from "./ui/card-wrapper"

interface ServiceProps {
  title: string
  description: string
  icon: React.ReactNode
}

function ServiceCard({ title, description, icon }: ServiceProps) {
  return (
    <CardWrapper className="hover:border-primary/40 transition-colors">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
      <p className="text-secondary">{description}</p>
    </CardWrapper>
  )
}

export function Services() {
  return (
    <section className="py-16 bg-background" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">What We Do</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            We help small businesses build secure, modern websites that integrate seamlessly with cloud services and IT
            systems. From custom development to email setup, hosting, and automation — we deliver end-to-end web
            solutions that support growth, efficiency, and peace of mind.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            icon={<Users size={24} />}
            title="Professional & Client-Facing"
            description="We help small businesses modernize their technology with custom websites, secure cloud solutions, and automated workflows. Our goal is to simplify IT so business owners can focus on what they do best."
          />
          <ServiceCard
            icon={<Settings size={24} />}
            title="Technical & Service-Oriented"
            description="We design and implement web-based solutions, manage Microsoft 365 environments, and build automation using Power Platform tools. We ensure each system is secure, efficient, and tailored to client needs."
          />
          <ServiceCard
            icon={<Zap size={24} />}
            title="Marketing-Friendly & Engaging"
            description="We bring business tech to life—whether it's building a sleek website, setting up professional email, or streamlining your day-to-day with automation. If it makes your business run smoother, we make it happen."
          />
        </div>
      </div>
    </section>
  )
}
