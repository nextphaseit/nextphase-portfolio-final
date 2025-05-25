"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { ChevronDown, ChevronUp, Phone, Mail, MessageCircle, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-primary/20 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-card hover:bg-primary/5 transition-colors flex items-center justify-between"
      >
        <h3 className="font-semibold text-white">{question}</h3>
        {isOpen ? <ChevronUp className="text-primary" size={20} /> : <ChevronDown className="text-primary" size={20} />}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-card/50 border-t border-primary/10">
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  )
}

interface FAQSectionProps {
  title: string
  faqs: { question: string; answer: string }[]
  openItems: number[]
  onToggle: (index: number) => void
  startIndex: number
}

function FAQSection({ title, faqs, openItems, onToggle, startIndex }: FAQSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-primary mb-6">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openItems.includes(startIndex + index)}
            onToggle={() => onToggle(startIndex + index)}
          />
        ))}
      </div>
    </div>
  )
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  const faqSections = [
    {
      title: "Services & Support",
      faqs: [
        {
          question: "What services do you offer?",
          answer:
            "We offer IT consulting, website creation, Microsoft 365 setup, email migration, cybersecurity audits, cloud storage solutions, and business automation.",
        },
        {
          question: "Do you offer on-site or remote support?",
          answer:
            "We provide both, depending on your location and service tier. Most IT support and consulting can be done securely online.",
        },
        {
          question: "Can I schedule a consultation?",
          answer: "Yes! Use our online booking form on nextphaseit.org or call (984) 310-9533.",
        },
      ],
    },
    {
      title: "Getting Started as a New Client",
      faqs: [
        {
          question: "How do I start working with NextPhase IT?",
          answer:
            "Start by filling out our Client Intake Form to share your business needs. We'll schedule an onboarding call and outline a customized IT support plan.",
        },
        {
          question: "What is included in the onboarding process?",
          answer:
            "Onboarding includes service discovery, systems audit (if applicable), account setup, access management, and a tailored support roadmap.",
        },
        {
          question: "Do I need to sign any contracts?",
          answer:
            "Yes. All clients must review and sign a service agreement and, if handling sensitive data, a HIPAA Business Associate Agreement (BAA).",
        },
      ],
    },
    {
      title: "Accounts & Access",
      faqs: [
        {
          question: "How do I access my Microsoft 365 tenant or SharePoint site?",
          answer:
            'You\'ll receive a welcome email with your credentials and access link. For additional help, see our "Microsoft 365 Onboarding Guide" in the Knowledge Base.',
        },
        {
          question: "Can you manage my domain, DNS, and email setup?",
          answer:
            "Absolutely. We specialize in full Microsoft 365 email and domain configuration, including IONOS, GoDaddy, and Cloudflare.",
        },
      ],
    },
    {
      title: "Billing & Payments",
      faqs: [
        {
          question: "How do I pay for services?",
          answer:
            "We accept payments via invoice (ACH, credit/debit card), Stripe, or recurring billing based on your service plan.",
        },
        {
          question: "Do you charge hourly or flat rates?",
          answer:
            "We offer both. Standard hourly rate is $95/hr. Most clients prefer flat-rate packages for predictable monthly costs.",
        },
      ],
    },
    {
      title: "Security & Compliance",
      faqs: [
        {
          question: "Is your service HIPAA compliant?",
          answer:
            "Yes. For healthcare clients, we implement and maintain HIPAA-compliant systems including secure messaging, audit logging, and encryption.",
        },
        {
          question: "Do you perform security assessments?",
          answer: "Yes. We offer security audits with a detailed compliance report and remediation plan.",
        },
      ],
    },
    {
      title: "Website & Branding Services",
      faqs: [
        {
          question: "Can you build my website?",
          answer:
            "Yes. We offer professional website development with built-in booking, contact forms, analytics, and mobile responsiveness.",
        },
        {
          question: "Will I be able to update my site after it's built?",
          answer: "Yes. We offer training or a monthly maintenance plan to handle updates for you.",
        },
      ],
    },
    {
      title: "Technical Support",
      faqs: [
        {
          question: "How do I request support?",
          answer:
            "You can submit a support ticket via our support portal, email support@nextphaseit.org, or call (984) 310-9533.",
        },
        {
          question: "What are your support hours?",
          answer: "Monday–Friday, 9:00 AM – 6:00 PM EST. Emergency support is available 24/7 for premium clients.",
        },
      ],
    },
  ]

  let currentIndex = 0

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Background Logo */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <Image
            src="/images/nextphase-logo.png"
            alt=""
            width={800}
            height={600}
            className="w-auto h-96 object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-primary">Commonly Asked</span> Questions
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
              Find answers to the most frequently asked questions about our services, support, and how we can help your
              business succeed with technology.
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {faqSections.map((section, sectionIndex) => {
              const startIndex = currentIndex
              currentIndex += section.faqs.length
              return (
                <FAQSection
                  key={sectionIndex}
                  title={section.title}
                  faqs={section.faqs}
                  openItems={openItems}
                  onToggle={toggleItem}
                  startIndex={startIndex}
                />
              )
            })}
          </div>
        </section>

        {/* Need More Help Section */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg p-8 border border-primary/20">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">📎 Need More Help?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-gray-400 text-sm">Available on our website</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a href="mailto:support@nextphaseit.org" className="text-primary text-sm hover:underline">
                    support@nextphaseit.org
                  </a>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <a href="tel:+19843109533" className="text-primary text-sm hover:underline">
                    (984) 310-9533
                  </a>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ExternalLink className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">Client Portal</h3>
                  <p className="text-gray-400 text-sm">login.nextphaseit.org</p>
                  <p className="text-xs text-gray-500 mt-1">(Coming Soon)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
                <p className="text-gray-400">
                  NextPhase IT is a technology consulting company dedicated to helping small businesses thrive through
                  smart, scalable solutions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/#services" className="hover:text-primary transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/#works" className="hover:text-primary transition-colors">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-primary transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-primary transition-colors">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/#skills" className="hover:text-primary transition-colors">
                      Skills
                    </Link>
                  </li>
                  <li>
                    <Link href="/#testimonials" className="hover:text-primary transition-colors">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="/#contact" className="hover:text-primary transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Technical Support & Training</li>
                  <li>Workflow Automation</li>
                  <li>Custom Web Development</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>support@nextphaseit.org</li>
                  <li>+1 984-310-9533</li>
                  <li>Clayton, NC</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>© 2024 NextPhase IT. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </main>
  )
}
