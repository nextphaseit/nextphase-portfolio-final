"use client"

import { Navbar } from "@/components/navbar"
import { Shield, FileText, CheckCircle } from "lucide-react"

const sections = [
  {
    icon: Shield,
    title: "Privacy Policy",
    content: [
      "NextPhase IT is committed to protecting your privacy and ensuring the security of your personal information. We collect and use customer information only for the purpose of providing and improving our services.",
      "We do not sell, trade, or otherwise transfer your personal information to third parties. Your data is protected using industry-standard security practices, including encryption and secure data storage.",
      "We collect information that you provide directly to us, such as contact information and service preferences. This information is used to:",
      [
        "Provide and maintain our services",
        "Improve and personalize your experience",
        "Communicate with you about our services",
        "Ensure the security of our systems"
      ],
      "We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction."
    ]
  },
  {
    icon: FileText,
    title: "Terms of Service",
    content: [
      "By accessing and using this website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.",
      "All services provided by NextPhase IT are subject to separate service agreements or contracts. These Terms of Service govern only your use of this website.",
      "Limitation of Liability:",
      [
        "NextPhase IT shall not be liable for any indirect, incidental, special, consequential, or punitive damages",
        "Our liability is limited to the amount paid for the specific service giving rise to the claim",
        "We are not responsible for any loss of data or business interruption"
      ],
      "Content Restrictions:",
      [
        "All content on this website is the property of NextPhase IT and is protected by copyright laws",
        "You may not reproduce, distribute, or use our content without express written permission",
        "Unauthorized use of our content may result in legal action"
      ]
    ]
  },
  {
    icon: CheckCircle,
    title: "HIPAA Compliance Notice",
    content: [
      "NextPhase IT provides HIPAA-compliant services to covered entities and business associates. We understand the importance of protecting sensitive healthcare information and maintaining compliance with HIPAA regulations.",
      "Important Notice:",
      [
        "Full HIPAA compliance requires proper configuration and customer cooperation",
        "A signed Business Associate Agreement (BAA) is required for HIPAA services",
        "We implement appropriate safeguards to protect PHI (Protected Health Information)",
        "Regular security assessments and updates are performed to maintain compliance"
      ],
      "Our HIPAA-compliant services include:",
      [
        "Secure data storage and transmission",
        "Access controls and authentication",
        "Audit logging and monitoring",
        "Data backup and recovery procedures"
      ],
      "To ensure HIPAA compliance, we require all clients using our HIPAA services to:",
      [
        "Sign a Business Associate Agreement",
        "Implement appropriate security measures on their end",
        "Report any security incidents or breaches",
        "Maintain proper access controls"
      ]
    ]
  }
]

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Legal Information</h1>
          
          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={index} className="bg-[#F9FAFB] rounded-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <section.icon className="w-8 h-8 text-[#1E88E5]" />
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {Array.isArray(item) ? (
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          {item.map((listItem, listIndex) => (
                            <li key={listIndex} className="text-[#555555]">
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[#555555]">{item}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 