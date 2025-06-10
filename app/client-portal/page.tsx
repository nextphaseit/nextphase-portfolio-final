"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Shield, Settings, Ticket } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: FileText,
    title: "View Invoices and Payments",
    description: "Access your billing history and make secure payments online."
  },
  {
    icon: Shield,
    title: "Access Security Reports",
    description: "Review your security audit reports and compliance documentation."
  },
  {
    icon: Settings,
    title: "Manage Services",
    description: "View and manage your active services and subscriptions."
  },
  {
    icon: Ticket,
    title: "Submit and Track Support Tickets",
    description: "Create and monitor support requests in real-time."
  }
]

export default function ClientPortalPage() {
  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Client Portal
              <span className="ml-3 text-sm font-normal bg-[#1E88E5] text-white px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </h1>
            <p className="text-xl text-[#555555]">
              A secure area for our clients to access resources, documents, and support.
            </p>
          </div>

          <div className="bg-[#F9FAFB] rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              We are working on a secure Client Portal that will allow our customers to:
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <feature.icon className="w-8 h-8 text-[#1E88E5] mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-[#555555]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/">
              <Button
                className="bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white px-8 py-6 text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 