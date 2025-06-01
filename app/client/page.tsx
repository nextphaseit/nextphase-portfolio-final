"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Search, Download, Lock } from "lucide-react"

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState("submit")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Portal
                </Link>
              </Button>
              <Image src="/logo.png" alt="NextPhase IT Logo" width={40} height={40} className="h-10 w-auto" />
              <h1 className="text-xl font-semibold">Client Service Desk</h1>
            </div>
            <Button variant="outline">Sign In</Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: "submit", label: "Submit Ticket" },
              { id: "status", label: "Track Status" },
              { id: "reset", label: "Password Reset" },
              { id: "resources", label: "Resources" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "submit" && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Submit Support Ticket</CardTitle>
              <CardDescription>Describe your issue and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@company.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Issue Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hardware">Hardware Issue</SelectItem>
                    <SelectItem value="software">Software Problem</SelectItem>
                    <SelectItem value="network">Network/Connectivity</SelectItem>
                    <SelectItem value="email">Email Issues</SelectItem>
                    <SelectItem value="access">Access/Permissions</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Please describe your issue in detail..." rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Attach File (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === "status" && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Track Ticket Status</CardTitle>
              <CardDescription>Enter your email or ticket reference number to check status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search">Email or Ticket Number</Label>
                <div className="flex gap-2">
                  <Input id="search" placeholder="Enter email or ticket #12345" className="flex-1" />
                  <Button>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Sample ticket results */}
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">#12345 - Email Setup Issue</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">In Progress</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Submitted on Dec 15, 2024</p>
                  <p className="text-sm">Our team is working on configuring your email settings.</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">#12344 - Software Installation</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Submitted on Dec 14, 2024</p>
                  <p className="text-sm">Software has been successfully installed and configured.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "reset" && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Password Reset Request</CardTitle>
              <CardDescription>Request assistance with password reset or account access.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <Input id="reset-email" type="email" placeholder="your.email@company.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reset-reason">Reason for Reset</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forgot">Forgot Password</SelectItem>
                    <SelectItem value="locked">Account Locked</SelectItem>
                    <SelectItem value="expired">Password Expired</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reset-details">Additional Details</Label>
                <Textarea id="reset-details" placeholder="Please provide any additional information..." rows={3} />
              </div>

              <Button className="w-full" size="lg">
                <Lock className="w-4 h-4 mr-2" />
                Request Password Reset
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === "resources" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Resource Library</h2>
              <p className="text-gray-600">Download guides, documentation, and setup instructions.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Employee Onboarding Guide", type: "PDF", size: "2.4 MB" },
                { title: "Email Setup Instructions", type: "PDF", size: "1.8 MB" },
                { title: "VPN Configuration Guide", type: "PDF", size: "3.1 MB" },
                { title: "Software Installation Guide", type: "PDF", size: "4.2 MB" },
                { title: "Security Best Practices", type: "PDF", size: "2.9 MB" },
                { title: "Troubleshooting Common Issues", type: "PDF", size: "3.7 MB" },
              ].map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{resource.title}</h3>
                        <p className="text-sm text-gray-500">
                          {resource.type} • {resource.size}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
