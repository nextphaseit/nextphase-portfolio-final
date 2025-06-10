"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowUp, Check } from "lucide-react"
import Image from "next/image"

const PricesPage = () => {
  const supportPackages = [
    {
      title: "Essential IT Support",
      price: 99,
      period: "month",
      description: "Basic IT support for small businesses",
      features: [
        "24/7 Help Desk Support",
        "Remote Technical Support",
        "Basic Network Monitoring",
        "Email Support",
        "Monthly System Updates"
      ],
      cta: "Get Started"
    },
    {
      title: "Security & Compliance",
      price: 149,
      period: "month",
      description: "Enhanced security for growing businesses",
      features: [
        "All Essential Features",
        "Security Monitoring",
        "Compliance Reporting",
        "Data Backup Solutions",
        "Security Training"
      ],
      cta: "Get Started"
    },
    {
      title: "Complete IT Care",
      price: 249,
      period: "month",
      description: "Comprehensive IT management",
      features: [
        "All Security & Compliance Features",
        "Dedicated IT Manager",
        "Strategic IT Planning",
        "Cloud Infrastructure Management",
        "Priority Support"
      ],
      cta: "Get Started"
    }
  ]

  const projectServices = [
    {
      title: "Microsoft 365 Setup",
      price: 299,
      description: "Complete setup and configuration of Microsoft 365 for your business",
      features: ["User Account Setup", "Email Migration", "Security Configuration"]
    },
    {
      title: "Website Creation & Hosting",
      price: 499,
      description: "Professional website development with secure hosting",
      features: ["Custom Design", "Mobile Responsive", "SEO Optimization"]
    },
    {
      title: "Data Migration",
      price: 199,
      description: "Secure transfer of your business data to new systems",
      features: ["Data Backup", "Secure Transfer", "Verification"]
    },
    {
      title: "Security Audit & Report",
      price: 199,
      description: "Comprehensive security assessment of your IT infrastructure",
      features: ["Vulnerability Scan", "Compliance Check", "Detailed Report"]
    },
    {
      title: "Endpoint Management Setup",
      price: 149,
      description: "Configuration of device management and security",
      features: ["Device Enrollment", "Policy Setup", "Security Configuration"]
    }
  ]

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <div className="relative">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#0A4DA1]">
                Affordable IT Solutions for Your Business
              </h1>
              <p className="text-xl text-[#555555]">
                Choose the perfect IT support package for your business needs. All plans include our commitment to excellence and customer satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Support Packages */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Monthly Support Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportPackages.map((pkg, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#0A4DA1]">${pkg.price}</span>
                    <span className="text-[#555555]">/{pkg.period}</span>
                  </div>
                  <p className="text-[#555555] mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-[#0A4DA1]" />
                        <span className="text-[#555555]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white">
                    {pkg.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Services */}
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Project-Based Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-[#0A4DA1]">From ${service.price}</span>
                  </div>
                  <p className="text-[#555555] mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0A4DA1]" />
                        <span className="text-[#555555] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
            <p className="text-xl text-[#555555] mb-8">
              Let's discuss your specific requirements and create a tailored IT solution for your business.
            </p>
            <Button
              size="lg"
              className="bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white px-8 py-6 text-lg"
            >
              Request a Consultation
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0A4DA1] text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
                <p className="text-white/80">
                  Empowering businesses with modern IT solutions and expert support.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-white/80 hover:text-white">Home</a></li>
                  <li><a href="/services" className="text-white/80 hover:text-white">Services</a></li>
                  <li><a href="/prices" className="text-white/80 hover:text-white">Prices</a></li>
                  <li><a href="/about" className="text-white/80 hover:text-white">About</a></li>
                  <li><a href="/contact" className="text-white/80 hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2 text-white/80">
                  <li>+1 984-310-9533</li>
                  <li>adrian.knight@nextphaseit.org</li>
                  <li>Clayton, NC</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-white hover:text-[#1E88E5] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-[#1E88E5] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
              <p>© 2024 NextPhase IT. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-[#0A4DA1] text-white rounded-full shadow-lg hover:bg-[#1E88E5] transition-colors"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>
    </main>
  )
}

export default PricesPage 