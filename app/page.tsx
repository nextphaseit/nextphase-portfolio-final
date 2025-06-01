import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, Shield, Users, ArrowRight, Phone, Mail, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="NextPhase IT Logo" width={120} height={120} className="h-20 w-auto" priority />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">NextPhase IT Help Desk Portal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional IT support and service management for NextPhase IT employees
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg glow-on-hover"
          >
            <Link href="/client" className="flex items-center gap-2">
              Service Desk Portal
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg glow-on-hover"
          >
            <Link href="/admin" className="flex items-center gap-2">
              Admin Portal
              <Shield className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-semibold">Support Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-4">
                Submit tickets, track requests, and get help from our IT support team.
              </CardDescription>
              <Button asChild variant="outline" className="w-full">
                <Link href="/client" className="flex items-center justify-center gap-2">
                  Submit Ticket
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl font-semibold">Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-4">
                Manage tickets, users, and system settings. Authentication required.
              </CardDescription>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin" className="flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-semibold">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-4">Need immediate assistance?</CardDescription>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">(984) 310-9533</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@nextphaseit.org</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri 8AM-6PM EST</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Access Information */}
        <div className="text-center text-gray-600 space-y-2">
          <p className="text-lg">Access professional portals with your NextPhase IT Microsoft account</p>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">admin@nextphaseit.org</span> → Admin Portal
            </p>
            <p>
              <span className="font-medium">support@nextphaseit.org</span> → Support Portal
            </p>
            <p>
              <span className="font-medium">Other @nextphaseit.org</span> → General Portal
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 NextPhase IT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
