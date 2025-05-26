"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { AuthProvider, useAuth, withAuth } from "@/lib/auth"
import {
  User,
  Settings,
  LogOut,
  FileText,
  MessageSquare,
  Clock,
  ExternalLink,
  Users,
  BarChart3,
  Shield,
  Video,
} from "lucide-react"
import Image from "next/image"

function DashboardContent() {
  const { user, logout, isAdmin } = useAuth()

  const microsoftApps = [
    {
      name: "SharePoint - Support Tickets",
      description: "Manage client support requests and track resolution status",
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      url: "https://nextphaseit.sharepoint.com/sites/SupportTickets",
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    },
    {
      name: "SharePoint - Project Status",
      description: "Track ongoing client projects and deliverables",
      icon: <FileText className="w-8 h-8 text-green-600" />,
      url: "https://nextphaseit.sharepoint.com/sites/ProjectManagement",
      color: "bg-green-50 hover:bg-green-100 border-green-200",
    },
    {
      name: "Microsoft Forms - Client Intake",
      description: "Review new client submissions and intake forms",
      icon: <User className="w-8 h-8 text-purple-600" />,
      url: "https://forms.office.com/r/5Ad9WuMA3G",
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
    },
    {
      name: "Teams - Internal Communication",
      description: "Team chat, meetings, and collaboration",
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      url: "https://teams.microsoft.com",
      color: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200",
    },
    {
      name: "Zoom - Client Meetings",
      description: "Schedule and manage client consultation calls",
      icon: <Video className="w-8 h-8 text-blue-500" />,
      url: "https://zoom.us/signin",
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    },
  ]

  const adminApps = [
    {
      name: "Microsoft Admin Center",
      description: "Manage user accounts, licenses, and organization settings",
      icon: <Settings className="w-8 h-8 text-red-600" />,
      url: "https://admin.microsoft.com",
      color: "bg-red-50 hover:bg-red-100 border-red-200",
    },
    {
      name: "Azure Active Directory",
      description: "User management, security, and access controls",
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      url: "https://aad.portal.azure.com",
      color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
    },
    {
      name: "Power Platform Admin",
      description: "Manage Power Apps, Power Automate, and environments",
      icon: <BarChart3 className="w-8 h-8 text-yellow-600" />,
      url: "https://admin.powerplatform.microsoft.com",
      color: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
    },
  ]

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
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {user?.given_name || user?.name}!
                <span className="text-primary ml-2">{user?.role === "admin" ? "👑 Admin" : "👤 Staff"}</span>
              </h1>
              <p className="text-gray-400">NextPhase IT Operations Portal - {user?.department}</p>
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

        {/* Microsoft Applications */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText className="text-primary" size={28} />
            Client Management Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {microsoftApps.map((app, index) => (
              <a
                key={index}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 rounded-lg border-2 transition-all duration-200 ${app.color}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{app.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      {app.name}
                      <ExternalLink size={16} className="text-gray-500" />
                    </h3>
                    <p className="text-gray-600 text-sm">{app.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Admin-Only Section */}
          {isAdmin && (
            <>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="text-red-500" size={28} />
                Administrative Tools
                <span className="text-sm bg-red-500/20 text-red-400 px-2 py-1 rounded">Admin Only</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {adminApps.map((app, index) => (
                  <a
                    key={index}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-6 rounded-lg border-2 transition-all duration-200 ${app.color}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">{app.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          {app.name}
                          <ExternalLink size={16} className="text-gray-500" />
                        </h3>
                        <p className="text-gray-600 text-sm">{app.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}

          {/* Quick Stats */}
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
                    <p className="font-medium">New support ticket submitted</p>
                    <p className="text-sm text-gray-400">Client: TechStart Solutions - Email migration issue</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Project milestone completed</p>
                    <p className="text-sm text-gray-400">Healthcare Partners - SharePoint deployment finished</p>
                    <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Client meeting scheduled</p>
                    <p className="text-sm text-gray-400">New client consultation - Tomorrow 2:00 PM</p>
                    <p className="text-xs text-gray-500 mt-1">Today</p>
                  </div>
                </div>
              </div>
            </CardWrapper>

            <CardWrapper>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="text-primary" size={24} />
                System Status
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Open Support Tickets</span>
                  <span className="text-yellow-400 font-semibold">3 Active</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Active Projects</span>
                  <span className="text-green-400 font-semibold">7 In Progress</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Microsoft 365 Status</span>
                  <span className="text-green-400 font-semibold">✅ Operational</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">SharePoint Sites</span>
                  <span className="text-green-400 font-semibold">✅ Online</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Teams Integration</span>
                  <span className="text-green-400 font-semibold">✅ Connected</span>
                </div>
              </div>
            </CardWrapper>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="container mx-auto px-4 pb-16">
          <CardWrapper className="text-center bg-primary/10">
            <h2 className="text-2xl font-bold mb-4">Need to Access Something Else?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              All Microsoft applications are integrated with your NextPhase IT account. Click any tool above to access
              it directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://office.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-2" />
                  Microsoft 365 Home
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:adrian.knight@nextphaseit.org">Contact IT Support</a>
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
