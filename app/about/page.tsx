"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowUp, Shield, Lightbulb, Users } from "lucide-react"
import Image from "next/image"
import { motion } from 'framer-motion'

const values = [
  {
    title: 'Reliability',
    description: 'We deliver consistent, dependable service you can count on.',
  },
  {
    title: 'Innovation',
    description: 'We stay ahead of technology trends to provide cutting-edge solutions.',
  },
  {
    title: 'Partnership',
    description: 'We work closely with you to understand and meet your business needs.',
  },
  {
    title: 'Excellence',
    description: 'We maintain the highest standards in everything we do.',
  },
]

const About = () => {
  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <div className="relative">
        <Navbar />
        
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About NextPhase IT</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Empowering small businesses with innovative IT solutions since 2020
              </p>
            </motion.div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Meet Our Founder</h2>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Adrian Knight</h3>
                  <p className="text-gray-600">IT Consultant & Business Technology Expert</p>
                  <p className="text-gray-600">
                    With over a decade of experience in IT consulting and business technology,
                    Adrian founded NextPhase IT to help small businesses leverage technology
                    for growth and success. His passion for innovation and commitment to
                    client success drives our company's mission.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative h-[400px] rounded-lg overflow-hidden"
              >
                <Image
                  src="/images/founder.jpg"
                  alt="Adrian Knight - Founder of NextPhase IT"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 mb-8">
                To empower small businesses with technology solutions that drive growth,
                efficiency, and success in the digital age.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-primary text-center mb-12"
            >
              Our Values
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Background Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Our Background</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    NextPhase IT was founded in 2020 with a clear vision: to provide
                    small businesses with enterprise-level IT solutions at affordable
                    prices. We recognized that many small businesses were struggling
                    to keep up with technology demands while managing their core
                    operations.
                  </p>
                  <p>
                    Today, we're proud to serve businesses across North Carolina,
                    helping them leverage technology to streamline operations,
                    enhance security, and drive growth. Our team of certified
                    professionals brings together decades of combined experience
                    in IT consulting, web development, and business automation.
                  </p>
                  <p>
                    We're committed to staying at the forefront of technology
                    trends and best practices, ensuring our clients always have
                    access to the most effective and efficient solutions for
                    their business needs.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-24 text-right font-semibold text-[#0A4DA1]">2024</div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">Expanding Services</h3>
                    <p className="text-[#555555]">Launching new cloud and security solutions</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-right font-semibold text-[#0A4DA1]">2023</div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">Growth & Innovation</h3>
                    <p className="text-[#555555]">Expanded team and service offerings</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-right font-semibold text-[#0A4DA1]">2022</div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">Company Founded</h3>
                    <p className="text-[#555555]">NextPhase IT established in Clayton, NC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#F9FAFB]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Partner with NextPhase IT today</h2>
            <Button
              size="lg"
              className="bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white px-8 py-6 text-lg"
            >
              Get Started
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

export default About 