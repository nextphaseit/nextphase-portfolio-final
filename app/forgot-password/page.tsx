"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Password reset for:", email)
    setIsLoading(false)
    setIsSubmitted(true)

    // Here you would typically handle the actual password reset
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <Image
              src="/images/nextphase-logo.png"
              alt="NextPhase IT"
              width={200}
              height={60}
              className="h-16 w-auto mx-auto mb-6"
            />
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
            <p className="text-gray-400 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-8">Didn't receive the email? Check your spam folder or try again.</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="w-full bg-white/5 border-white/20 hover:bg-white/10 text-white"
            >
              Try Different Email
            </Button>
            <Link href="/login">
              <Button className="w-full bg-primary hover:bg-primary/90">Back to Sign In</Button>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Need help?{" "}
              <a href="mailto:support@nextphaseit.org" className="text-primary hover:text-primary/80 transition-colors">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Back to Login Link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Sign In
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/images/nextphase-logo.png"
            alt="NextPhase IT"
            width={200}
            height={60}
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-400">Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {/* Reset Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-base font-medium"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending reset link...
              </div>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        {/* Support Link */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Need help?{" "}
            <a href="mailto:support@nextphaseit.org" className="text-primary hover:text-primary/80 transition-colors">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
