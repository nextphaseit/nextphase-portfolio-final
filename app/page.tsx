"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Phone, Mail, MapPin, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { FC, useState } from "react"
import { FreeResources } from "@/components/free-resources"
import Link from "next/link"
import { event } from '@/lib/gtag'
import { motion } from 'framer-motion'
import { FaServer, FaLaptopCode, FaRobot } from 'react-icons/fa'
import { FiCheckCircle } from 'react-icons/fi'

const Home: FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const testimonials = [
    {
      text: "NextPhase IT has been excellent for our website hosting and security consults.",
      author: "Inner Clarity INC"
    },
    // Add more testimonials as needed
  ]

  const handleBookingClick = () => {
    event({
      action: 'book_consultation_click',
      category: 'Engagement',
      label: 'Book Consultation Button',
    })
  }

  const services = [
    {
      icon: <FaServer className="h-8 w-8" />,
      title: 'IT Support',
      description: '24/7 technical support and maintenance for your business infrastructure.',
    },
    {
      icon: <FaLaptopCode className="h-8 w-8" />,
      title: 'Website Design',
      description: 'Custom website development tailored to your business needs.',
    },
    {
      icon: <FaRobot className="h-8 w-8" />,
      title: 'Business Automation',
      description: 'Streamline operations with Microsoft 365 and Power Automate solutions.',
    },
  ]

  const whyChooseUs = [
    'Reliable 24/7 Support',
    'Fast Response Times',
    'Affordable Solutions',
    'Expert Team',
    'Proven Track Record',
    'Customized Approach',
  ]

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      {/* Content */}
      <div className="relative">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0A4DA1] to-[#1E88E5] text-white pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Empowering Small Businesses Through Smart IT
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Professional IT solutions tailored to your business needs
              </p>
              <Link href="/services" onClick={handleBookingClick}>
                <Button
                  size="lg"
                  className="bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white px-8 py-6 text-lg"
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-16 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-center mb-12">Trusted By</h2>
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-70">
              <Image src="/images/macla-logo.png" alt="MACLA" width={120} height={40} className="h-8 w-auto" />
              <Image src="/images/inner-clarity-logo.png" alt="Inner Clarity INC" width={120} height={40} className="h-8 w-auto" />
              <Image src="/images/strokes-of-faith-logo.png" alt="Strokes of Faith" width={120} height={40} className="h-8 w-auto" />
              <Image src="/images/vtxp-logo.png" alt="VTXP" width={120} height={40} className="h-8 w-auto" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-accent mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-[#555555] mb-6">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <FiCheckCircle className="h-6 w-6 text-accent" />
                  <span className="text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="text-center">
                  <p className="text-xl text-[#555555] mb-6">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <p className="font-semibold">— {testimonials[currentTestimonial].author}</p>
                </div>
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
                >
                  <ChevronLeft className="w-6 h-6 text-[#0A4DA1]" />
                </button>
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
                >
                  <ChevronRight className="w-6 h-6 text-[#0A4DA1]" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Free Resources Section */}
        <FreeResources />

        {/* CTA Banner */}
        <section className="py-16 bg-gradient-to-r from-[#F9FAFB] to-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <Button
              size="lg"
              className="bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white px-8 py-6 text-lg"
            >
              Book a Free Discovery Call
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0A4DA1] text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
                <p className="text-white/80 mb-6">
                  Empowering businesses with modern IT solutions and expert support.
                </p>
                <Link href="/book" onClick={handleBookingClick}>
                  <Button
                    size="lg"
                    className="bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white"
                  >
                    Book a Consultation
                  </Button>
                </Link>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-white/80 hover:text-white">Home</a></li>
                  <li><a href="/services" className="text-white/80 hover:text-white">Services</a></li>
                  <li><a href="/success-stories" className="text-white/80 hover:text-white">Success Stories</a></li>
                  <li><a href="/about" className="text-white/80 hover:text-white">About</a></li>
                  <li><a href="/contact" className="text-white/80 hover:text-white">Contact</a></li>
                  <li><a href="#resources" className="text-white/80 hover:text-white">Free Resources</a></li>
                  <li><a href="/faq" className="text-white/80 hover:text-white">FAQ</a></li>
                  <li><a href="/client-portal" className="text-white/80 hover:text-white">Client Portal</a></li>
                  <li><a href="/legal" className="text-white/80 hover:text-white">Legal</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>+1 984-310-9533</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>adrian.knight@nextphaseit.org</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Clayton, NC</span>
                  </li>
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

export default Home
