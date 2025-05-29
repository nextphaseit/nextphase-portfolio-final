"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQItem = ({ question, answer }: { question: string; answer: string | React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="text-blue-600">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="prose max-w-none text-gray-700">{answer}</div>
        </div>
      )}
    </div>
  )
}

const FAQSection = ({
  title,
  items,
}: { title: string; items: { question: string; answer: string | React.ReactNode }[] }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">{title}</h2>
      <div>
        {items.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  )
}

const FAQPage = () => {
  const generalFAQs = [
    {
      question: "What is the Service Desk Portal?",
      answer:
        "The Service Desk Portal is your central hub for accessing IT support, submitting requests, tracking tickets, and finding helpful resources.",
    },
    {
      question: "How do I access the Service Desk Portal?",
      answer:
        "You can access the Service Desk Portal by visiting our website and clicking on the 'Service Desk Portal' link in the navigation menu, or by going directly to the portal URL provided by your IT department.",
    },
    {
      question: "What kind of support can I get through the Service Desk Portal?",
      answer:
        "Through the Service Desk Portal, you can submit support tickets, request new software, report issues, track the status of your existing tickets, and access our knowledge base for self-help resources.",
    },
    {
      question: "How do I create a new support ticket?",
      answer:
        "To create a new support ticket, log into the Service Desk Portal, navigate to the 'Tickets' tab, and click on the 'Create New Ticket' button. Fill out the required information and submit your request.",
    },
  ]

  const technicalFAQs = [
    {
      question: "I'm having trouble logging in. What should I do?",
      answer:
        "Please ensure you are using the correct username and password. If you are still having trouble, click on the 'Forgot Password' link on the login page or contact the NextPhase IT Help Desk directly.",
    },
    {
      question: "My internet is not working. What should I do?",
      answer: (
        <div>
          <p>Please try the following steps:</p>
          <ol className="list-decimal list-inside ml-4 mt-2">
            <li>Restart your computer</li>
            <li>Restart your modem and router (unplug for 30 seconds, then plug back in)</li>
            <li>Check if other devices can connect to the internet</li>
            <li>
              If the problem persists, submit a support ticket through the Service Desk Portal using another device
            </li>
          </ol>
        </div>
      ),
    },
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password through the 'Forgot Password' link on the Service Desk Portal login page. Follow the instructions sent to your registered email address to create a new password.",
    },
    {
      question: "How can I track the status of my ticket?",
      answer:
        "You can track the status of your ticket by logging into the Service Desk Portal and navigating to the 'Tickets' tab. Here you'll see all your submitted tickets and their current status.",
    },
  ]

  const accountFAQs = [
    {
      question: "How do I update my profile information?",
      answer:
        "To update your profile information, log into the Service Desk Portal, click on your profile icon in the top right corner, and select 'Profile Settings'. From there, you can update your contact information and preferences.",
    },
    {
      question: "Can I change my notification preferences?",
      answer:
        "Yes, you can customize your notification preferences in your profile settings. You can choose to receive notifications via email, SMS, or within the portal for different types of updates.",
    },
    {
      question: "What should I do if I notice suspicious activity on my account?",
      answer:
        "If you notice any suspicious activity on your account, immediately change your password and contact the NextPhase IT Help Desk to report the issue. They will help secure your account and investigate the activity.",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about the Service Desk Portal and IT support
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 mb-12">
            <FAQSection title="General Questions" items={generalFAQs} />
            <FAQSection title="Technical Support" items={technicalFAQs} />
            <FAQSection title="Account Management" items={accountFAQs} />

            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Help?</h2>
              <p className="text-gray-700 mb-4">
                If you couldn't find the answer you were looking for, please don't hesitate to contact our support team.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium text-gray-900 mb-2">Contact Support</h3>
                  <p className="text-gray-600">Email: support@nextphaseit.com</p>
                  <p className="text-gray-600">Phone: 555-123-4567</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium text-gray-900 mb-2">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Weekend Support: 9:00 AM - 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQPage
