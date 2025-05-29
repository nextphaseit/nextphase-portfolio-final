"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Shield, AlertCircle, Building } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MultiTenantAuthProvider, useMultiTenantAuth } from "@/providers/multi-tenant-auth-provider"
import { getTenantByEmail } from "@/lib/tenant-config"

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const [error, setError] = useState("")
  const [resetMessage, setResetMessage] = useState("")

  const { login, loginWithMicrosoft, resetPassword, isLoading, isAuthenticated } = useMultiTenantAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/portal")
    }

    // Check for OAuth errors
    const oauthError = searchParams.get("error")
    if (oauthError) {
      switch (oauthError) {
        case "oauth_failed":
          setError("Microsoft authentication failed. Please try again.")
          break
        case "unauthorized_domain":
          setError("Access denied. Your organization is not authorized to use this portal.")
          break
        case "token_failed":
          setError("Authentication token error. Please try again.")
          break
        case "profile_failed":
          setError("Unable to retrieve profile information. Please try again.")
          break
        case "callback_failed":
          setError("Authentication callback failed. Please try again.")
          break
        default:
          setError("Authentication error occurred. Please try again.")
      }
    }
  }, [isAuthenticated, router, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const result = await login(formData.email, formData.password)

    if (result.success) {
      router.push("/portal")
    } else {
      setError(result.error || "Login failed")
    }
  }

  const handleMicrosoftLogin = async () => {
    setError("")
    const success = await loginWithMicrosoft()
    if (!success) {
      setError("Microsoft authentication failed. Please try again.")
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setResetMessage("")

    const result = await resetPassword(forgotPasswordEmail)
    if (result.success) {
      setResetMessage(result.message)
      setShowForgotPassword(false)
      setForgotPasswordEmail("")
    } else {
      setError(result.message)
    }
  }

  // Get tenant info for branding
  const tenantConfig = formData.email ? getTenantByEmail(formData.email) : null

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
              src={tenantConfig?.branding.logo || "/images/nextphase-logo.png"}
              alt={tenantConfig?.branding.companyName || "Service Desk Portal"}
              width={200}
              height={60}
              className="h-16 w-auto mx-auto mb-4"
            />
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="text-primary" size={24} />
              <h1 className="text-2xl font-bold text-white">Service Desk Portal</h1>
            </div>
            <p className="text-gray-400">
              {tenantConfig ? `${tenantConfig.branding.companyName} Access` : "Secure Business Access"}
            </p>
          </div>

          {/* Tenant Detection */}
          {formData.email && tenantConfig && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <Building className="text-primary" size={20} />
                <div>
                  <h3 className="text-primary font-semibold">{tenantConfig.branding.companyName}</h3>
                  <p className="text-sm text-gray-300">Organization detected</p>
                </div>
              </div>
            </div>
          )}

          {/* Access Notice */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <h3 className="text-primary font-semibold mb-2">
              <Shield className="inline mr-2" size={16} />
              Multi-Tenant Authentication
            </h3>
            <p className="text-sm text-gray-300">
              This portal supports multiple organizations. Enter your business email to continue.
            </p>
          </div>

          {!showForgotPassword ? (
            <>
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

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-red-400" size={16} />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {resetMessage && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="text-green-400" size={16} />
                    <p className="text-green-400 text-sm">{resetMessage}</p>
                  </div>
                </div>
              )}

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
                      placeholder="your.name@company.com"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
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
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </button>
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
            </>
          ) : (
            /* Forgot Password Form */
            <div>
              <h2 className="text-xl font-bold mb-4">Reset Password</h2>
              <p className="text-gray-400 mb-6">
                Enter your business email address and we'll send you instructions to reset your password.
              </p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-red-400" size={16} />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="reset-email"
                      type="email"
                      required
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-card border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="your.name@company.com"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90">
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForgotPassword(false)
                      setError("")
                      setForgotPasswordEmail("")
                    }}
                    className="flex-1"
                  >
                    Back to Login
                  </Button>
                </div>
              </form>
            </div>
          )}

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
              src={tenantConfig?.branding.logo || "/images/nextphase-logo.png"}
              alt={tenantConfig?.branding.companyName || "Service Desk Portal"}
              width={300}
              height={90}
              className="h-20 w-auto mx-auto mb-6 filter brightness-0 invert"
            />
          </div>

          <h2 className="text-3xl font-bold mb-4">Multi-Tenant Service Portal</h2>
          <p className="text-lg opacity-90 mb-8">
            Secure access for multiple organizations with tenant-specific branding, settings, and data isolation.
          </p>

          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Multi-tenant authentication</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Organization-specific branding</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Secure data segregation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Admin override capabilities</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <MultiTenantAuthProvider>
      <LoginContent />
    </MultiTenantAuthProvider>
  )
}
