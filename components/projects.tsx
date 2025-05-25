import type React from "react"
import { CardWrapper } from "./ui/card-wrapper"
import { Globe, Mail, CalendarCheck, CloudUpload, ShieldCheck, Workflow } from "lucide-react"

interface ServiceProps {
  title: string
  description: string
  icon: React.ReactNode
}

function ServiceCard({ title, description, icon }: ServiceProps) {
  return (
    <CardWrapper className="overflow-hidden group">
      <div className="text-primary mb-4 flex justify-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2 text-center">{title}</h3>
      <p className="text-gray-400 text-sm text-center">{description}</p>
    </CardWrapper>
  )
}

export function Projects() {
  const services = [
    {
      title: "Business Website Development & Hosting",
      description: "Custom, responsive websites hosted and maintained for performance and security.",
      icon: <Globe size={32} />,
    },
    {
      title: "Professional Email & Domain Setup",
      description: "Business email configuration with secure hosting, DNS setup, and Microsoft 365.",
      icon: <Mail size={32} />,
    },
    {
      title: "Client Portal & Booking Systems",
      description: "Secure portals for appointments, uploads, payments, and client communication.",
      icon: <CalendarCheck size={32} />,
    },
    {
      title: "IT Infrastructure & Cloud Migrations",
      description: "Seamless migration to Microsoft 365 and SharePoint for remote-friendly operations.",
      icon: <CloudUpload size={32} />,
    },
    {
      title: "Data Security Audits & Compliance Consulting",
      description: "Comprehensive audits for HIPAA, GDPR, and business-grade data protection.",
      icon: <ShieldCheck size={32} />,
    },
    {
      title: "Custom Power Apps & Workflow Automation",
      description: "Streamlined automation using Power Apps and Power Automate for daily tasks.",
      icon: <Workflow size={32} />,
    },
  ]

  return (
    <section className="py-16" id="works">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Services</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Comprehensive IT solutions designed to help small businesses thrive in the digital landscape. From web
          development to cloud migrations, I provide end-to-end technology services.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  )
}
