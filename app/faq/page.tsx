"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { ChevronDown } from "lucide-react"
import dynamic from "next/dynamic"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What is included in a security audit?",
    answer: "Our comprehensive security audit includes vulnerability scanning, penetration testing, security policy review, access control assessment, and compliance evaluation. We provide detailed reports with actionable recommendations to strengthen your security posture."
  },
  {
    question: "How quickly can I get IT support?",
    answer: "We offer 24/7 emergency support with response times as quick as 15 minutes for critical issues. For non-urgent matters, we typically respond within 2-4 business hours. Our support team is available through phone, email, and our ticketing system."
  },
  {
    question: "Do I need Microsoft 365 to use your services?",
    answer: "While we are experts in Microsoft 365 and recommend it for most businesses, it's not required to use our services. We support various cloud platforms and can help you choose the best solution for your specific needs."
  },
  {
    question: "Is your service HIPAA compliant?",
    answer: "Yes, our services are designed to meet HIPAA compliance requirements. We implement strict security measures, maintain detailed audit logs, and ensure all data handling follows HIPAA guidelines. We can also help you achieve and maintain HIPAA compliance for your business."
  },
  {
    question: "Can I cancel my plan at any time?",
    answer: "Yes, you can cancel your plan at any time without penalties. We believe in providing flexible solutions that adapt to your business needs. We do require 30 days' notice for cancellation to ensure a smooth transition."
  }
]

// Create a client-only component for the FAQ content
const FAQContent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-lg">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#1E88E5] transition-transform ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
          
          <div
            className={`px-6 transition-all duration-300 ease-in-out ${
              openIndex === index
                ? "max-h-96 opacity-100 py-4"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-[#555555]">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Create a client-only version of the FAQ content
const ClientFAQContent = dynamic(() => Promise.resolve(FAQContent), {
  ssr: false,
})

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
          <ClientFAQContent />
        </div>
      </div>
    </main>
  )
} 