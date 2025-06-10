import { motion, useMotionValue, useTransform } from "framer-motion"
import { Cloud, Shield, Headphones } from "lucide-react"
import React from "react"

const services = [
  {
    icon: <Cloud className="w-8 h-8 text-[#1E88E5]" />,
    title: "Cloud Solutions",
    description: "Modernize your cloud infrastructure with secure, scalable solutions.",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#1E88E5]" />,
    title: "Security Audits",
    description: "Protect your data and business with thorough security assessments.",
  },
  {
    icon: <Headphones className="w-8 h-8 text-[#1E88E5]" />,
    title: "IT Support",
    description: "Reliable tech assistance and support for your business needs.",
  },
]

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [12, -12])
  const rotateY = useTransform(x, [-50, 50], [-12, 12])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    x.set(px - rect.width / 2)
    y.set(py - rect.height / 2)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-[#1E88E5]"
      style={{ rotateX, rotateY, perspective: 600 }}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(30,136,229,0.12)" }}
      whileFocus={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(30,136,229,0.12)" }}
    >
      <motion.div
        className="mb-4"
        whileHover={{ scale: 1.15 }}
        whileFocus={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-bold mb-2 text-[#1E88E5]">{title}</h3>
      <p className="text-[#555555] text-sm">{description}</p>
    </motion.div>
  )
}

export function ServicesSection() {
  return (
    <section className="py-20 bg-white" aria-labelledby="services-heading">
      <div className="container mx-auto px-4">
        <h2 id="services-heading" className="text-4xl font-bold text-center mb-12 text-[#1E88E5]">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
} 