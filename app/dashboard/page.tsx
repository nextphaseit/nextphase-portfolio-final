"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { AuthProvider, useAuth, withAuth } from "@/lib/auth"
import { User, Mail, Calendar, Settings, LogOut, FileText, MessageSquare, Clock } from "lucide-react"
import Image from "next/image"

function DashboardContent() {
  const { user, logout } = useAuth()

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

        {/* Dashboard Header */}
        <section className="container mx-auto px-4 pt-32 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.given_name || user?.name || "Client"}!</h1>
              <p className="text-gray-400">Manage your NextPhase IT services and projects</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-3">
                <Image
                  src={user?.picture || "/placeholder.svg?height=40&width=40&text=DC"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="text-sm">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-gray-400">{user?.email}</div>
                </div>
              </div>
              <Button variant="outline" onClick={logout}>
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <CardWrapper className="text-center hover:border-primary/40 transition-colors cursor-pointer">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Support Tickets</h3>
              <p className="text-gray-400 text-sm mb-4">View and create support requests</p>
              <Button size="sm" className="w-full">
                View Tickets
              </Button>
            </CardWrapper>

            <CardWrapper className="text-center hover:border-primary/40 transition-colors cursor-pointer">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Project Status</h3>
              <p className="text-gray-400 text-sm mb-4">Track your ongoing projects</p>
              <Button size="sm" className="w-full">
                View Projects
              </Button>
            </CardWrapper>

            <CardWrapper className="text-center hover:border-primary/40 transition-colors cursor-pointer">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Schedule Meeting</h3>
              <p className="text-gray-400 text-sm mb-4">Book a consultation call</p>
              <Button size="sm" className="w-full" asChild>
                <a href="https://forms.cloud.microsoft/r/5Ad9WuMA3G" target="_blank" rel="noopener noreferrer">
                  Schedule Now
                </a>
              </Button>
            </CardWrapper>

            <CardWrapper className="text-center hover:border-primary/40 transition-colors cursor-pointer">
              <Settings className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Account Settings</h3>
              <p className="text-gray-400 text-sm mb-4">Manage your account preferences</p>
              <Button size="sm" className="w-full">
                Settings
              </Button>
            </CardWrapper>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CardWrapper>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="text-primary" size={24} />
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Welcome to NextPhase IT!</p>
                    <p className="text-sm text-gray-400">Your account has been created successfully.</p>
                    <p className="text-xs text-gray-500 mt-1">Just now</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Initial consultation scheduled</p>
                    <p className="text-sm text-gray-400">We'll be in touch within 24 hours to discuss your needs.</p>
                    <p className="text-xs text-gray-500 mt-1">Today</p>
                  </div>
                </div>
              </div>
            </CardWrapper>

            <CardWrapper>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User className="text-primary" size={24} />
                Account Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Name</span>
                  <span>{user?.name || "Not provided"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Email</span>
                  <span>{user?.email || "Not provided"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Account Type</span>
                  <span className="text-primary">Client Portal</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Member Since</span>
                  <span>Today</span>
                </div>
              </div>
            </CardWrapper>
          </div>
        </section>

        {/* Contact Support */}
        <section className="container mx-auto px-4 pb-16">
          <CardWrapper className="text-center bg-primary/10">
            <h2 className="text-2xl font-bold mb-4">Need Assistance?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Our support team is here to help you with any questions or technical issues you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:support@nextphaseit.org">
                  <Mail size={16} className="mr-2" />
                  Email Support
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+19843109533">Call +1 984-310-9533</a>
              </Button>
            </div>
          </CardWrapper>
        </section>
      </div>
    </main>
  )
}

const ProtectedDashboard = withAuth(DashboardContent)

export default function DashboardPage() {
  return (
    <AuthProvider>
      <ProtectedDashboard />
    </AuthProvider>
  )
}
