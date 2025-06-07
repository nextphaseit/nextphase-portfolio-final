"use client"
import { useEffect, useState } from "react"

interface StatItemProps {
  number: string
  label: string
  delay?: number
}

function StatItem({ number, label, delay = 0 }: StatItemProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{number}</div>
      <div className="text-secondary text-sm md:text-base">{label}</div>
    </div>
  )
}

export function Stats() {
  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">Trusted by Businesses</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            We've helped dozens of small businesses transform their technology infrastructure and achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem number="50+" label="Happy Clients" delay={100} />
          <StatItem number="99%" label="Client Satisfaction" delay={200} />
          <StatItem number="24/7" label="Support Available" delay={300} />
          <StatItem number="5★" label="Average Rating" delay={400} />
        </div>
      </div>
    </section>
  )
}
