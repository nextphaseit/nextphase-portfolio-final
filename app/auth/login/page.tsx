"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Shield, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CustomAuthProvider, useCustomAuth } from "@/providers/custom-auth-provider"

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const { login, loginWithMicrosoft, isLoading, isAuthenticated, error } = useCustomAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/portal")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await login(formData.email, formData.password)

    if (result.success) {
      router.push("/portal")
    }
  }

  const handleMicrosoftLogin = async () => {
    await loginWithMicrosoft()
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
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
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="text-primary" size={24} />
              <h1 className="text-2xl font-bold text-white">Service Desk Portal</h1>
            </div>
            <p className="text-gray-400">Secure Business Access</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red-400" size={16} />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Microsoft Login Button */}
          <div className="mb-6">
            <Button
              onClick={handleMicrosoftLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium mb-4"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
                  </svg>
                  Sign in with Microsoft 365
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-gray-400">Or sign in with email</span>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Business Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="your.name@nextphaseit.org"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-card border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="h-4 w-4 text-primary bg-card border-primary/20 rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-300">
                Keep me signed in
              </label>
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
                  Signing in...
                </div>
              ) : (
                <>
                  <Shield size={16} className="mr-2" />
                  Access Portal
                </>
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <h3 className="text-sm font-semibold text-primary mb-2">Demo Credentials</h3>
            <div className="text-xs text-gray-300 space-y-1">
              <div>Admin: adrian.knight@nextphaseit.org / admin123</div>
              <div>Staff: staff@nextphaseit.org / staff123</div>
            </div>
          </div>

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

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-primary/80 items-center justify-center p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-1/2 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-md">
          <div className="mb-8">
            <Image
              src="/images/nextphase-logo.png"
              alt="NextPhase IT"
              width={300}
              height={90}
              className="h-20 w-auto mx-auto mb-6 filter brightness-0 invert"
            />
          </div>

          <h2 className="text-3xl font-bold mb-4">Custom Microsoft OAuth</h2>
          <p className="text-lg opacity-90 mb-8">
            Secure authentication using Microsoft Graph API with custom implementation for better control and
            reliability.
          </p>

          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Microsoft Graph API integration</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>PKCE security implementation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Token refresh handling</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Domain-based authorization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <CustomAuthProvider>
      <LoginContent />
    </CustomAuthProvider>
  )
}
