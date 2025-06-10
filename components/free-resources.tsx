"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export const FreeResources = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Log the submission (you can replace this with actual API call)
      console.log("Form submitted:", formData)
      
      // Show success message
      toast.success("Thank you! Your guide is downloading...")
      
      // Trigger PDF download
      const link = document.createElement('a')
      link.href = '/resources/5-it-mistakes-guide.pdf'
      link.download = '5-IT-Mistakes-Small-Businesses-Make.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setIsSubmitted(true)
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return null
  }

  return (
    <section id="resources" className="py-20 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-4">
              Free Resource: 5 IT Mistakes Small Businesses Make
            </h2>
            <p className="text-[#555555] text-center mb-8">
              Download this quick guide to learn how to protect your business.
            </p>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white py-6 text-lg"
                >
                  Download Free Guide
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#1E88E5] mb-4">Thank You!</h3>
                <p className="text-[#555555]">
                  Your guide is downloading. Check your email for additional resources.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 