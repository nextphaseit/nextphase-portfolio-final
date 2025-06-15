"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowUp } from "lucide-react"
import Image from "next/image"
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaGlobe,
  FaEnvelope,
  FaMicrosoft,
  FaDatabase,
  FaShieldAlt,
  FaRobot,
  FaHeadset,
} from 'react-icons/fa';

const services = [
  {
    icon: <FaGlobe className="h-8 w-8 text-accent" />,
    title: 'Website Creation & Hosting',
    description: 'Professional website design and reliable hosting solutions tailored to your business needs.',
  },
  {
    icon: <FaEnvelope className="h-8 w-8 text-accent" />,
    title: 'Business Email & Domain Setup',
    description: 'Professional email setup with your business domain and comprehensive email management.',
  },
  {
    icon: <FaMicrosoft className="h-8 w-8 text-accent" />,
    title: 'Microsoft 365 + SharePoint Consulting',
    description: 'Expert setup and optimization of Microsoft 365 and SharePoint for your business.',
  },
  {
    icon: <FaRobot className="h-8 w-8 text-accent" />,
    title: 'Workflow Automation',
    description: 'Streamline your business processes with Power Automate and Zapier integrations.',
  },
  {
    icon: <FaDatabase className="h-8 w-8 text-accent" />,
    title: 'Data Migration Services',
    description: 'Seamless data transfer and migration between systems with minimal downtime.',
  },
  {
    icon: <FaShieldAlt className="h-8 w-8 text-accent" />,
    title: 'HIPAA Security & Compliance Support',
    description: 'Ensure your business meets healthcare industry security and compliance requirements.',
  },
  {
    icon: <FaHeadset className="h-8 w-8 text-accent" />,
    title: 'IT Support Desk',
    description: 'Comprehensive IT support available remotely or onsite to keep your business running smoothly.',
  },
];

function ServiceCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        href="/contact"
        className="text-accent hover:text-accent/90 font-medium inline-flex items-center"
      >
        Learn More
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </motion.div>
  );
}

const Services = () => {
  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <div className="relative">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#0A4DA1]">
                Our Services
              </h1>
              <p className="text-xl text-[#555555]">
                Comprehensive IT solutions tailored to your business needs
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#F9FAFB]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your IT infrastructure?</h2>
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

export default Services 