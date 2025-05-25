"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { submitContactForm } from "@/app/actions/contact"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setResult(null)

    try {
      const response = await submitContactForm(formData)
      setResult(response)

      // Reset form if successful
      if (response.success) {
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="firstName"
          placeholder="First Name *"
          required
          className="bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name *"
          required
          className="bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email Address *"
        required
        className="bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
      <textarea
        name="message"
        placeholder="Your Message *"
        rows={6}
        required
        className="bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-vertical"
      />

      {/* Result Message */}
      {result && (
        <div
          className={`p-4 rounded-lg border ${
            result.success ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <p className="text-sm font-medium">{result.message}</p>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending Message...
          </div>
        ) : (
          "Send Message"
        )}
      </Button>

      <p className="text-xs text-gray-400 text-center">* Required fields. We'll respond within 24 hours.</p>
    </form>
  )
}
