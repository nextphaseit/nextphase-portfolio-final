"use client"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { M365ServiceHealth } from "@/components/m365-service-health"
import { MultiTenantAccountManagement } from "@/components/multi-tenant-account-management"
import { useCustomAuth } from "@/providers/custom-auth-provider"
import {
  Ticket,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Eye,
  Calendar,
  Building,
  Plus,
  Download,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TicketProps {
  id: string
  title: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  created: string
  lastUpdate: string
  description: string
  clientEmail?: string
  responses?: TicketResponse[]
}

interface TicketResponse {
  id: string
  message: string
  author: string
  timestamp: string
  isStaff: boolean
}

// SharePoint/OneDrive Resources Configuration
const sharePointResources = [
  {
    id: "1",
    title: "Microsoft 365 User Guide",
    type: "PDF",
    size: "2.3 MB",
    updated: "Jan 10, 2024",
    description: "Complete guide for using Microsoft 365 applications",
    category: "guides",
    shareUrl: "#",
    downloadUrl: "#",
    previewUrl: "#",
    isAccessible: true,
  },
  {
    id: "2",
    title: "Email Setup Instructions",
    type: "PDF",
    size: "1.1 MB",
    updated: "Jan 8, 2024",
    description: "Step-by-step email configuration for all devices",
    category: "guides",
    shareUrl: "#",
    downloadUrl: "#",
    previewUrl: "#",
    isAccessible: true,
  },
]

function TicketCard({ ticket, onViewDetails }: { ticket: TicketProps; onViewDetails: (ticket: TicketProps) => void }) {
  const statusColors = {
    open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "in-progress": "bg-accent/20 text-accent border-accent/30",
    resolved: "bg-green-500/20 text-green-400 border-green-500/30",
    closed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  const priorityColors = {
    low: "text-green-400",
    medium: "text-accent",
    high: "text-orange-400",
    urgent: "text-red-400",
  }

  const statusIcons = {
    open: <AlertCircle size={16} />,
    "in-progress": <Clock size={16} />,
    resolved: <CheckCircle size={16} />,
    closed: <CheckCircle size={16} />,
  }

  return (
    <CardWrapper
      className="hover:border-primary/40 transition-colors cursor-pointer"
      onClick={() => onViewDetails(ticket)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Ticket className="text-primary" size={20} />
          <h3 className="font-semibold text-primary">#{ticket.id}</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${statusColors[ticket.status]}`}>
          {statusIcons[ticket.status]}
          {ticket.status.replace("-", " ")}
        </div>
      </div>

      <h4 className="font-medium mb-2 text-primary">{ticket.title}</h4>
      <p className="text-secondary text-sm mb-3 line-clamp-2">{ticket.description}</p>

      <div className="flex items-center justify-between text-xs text-muted mb-3">
        <span className={priorityColors[ticket.priority]}>{ticket.priority.toUpperCase()} Priority</span>
        <span>Updated {ticket.lastUpdate}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted">
          <Calendar size={12} />
          <span>Created {ticket.created}</span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation()
            onViewDetails(ticket)
          }}
        >
          <Eye size={12} className="mr-1" />
          View Details
        </Button>
      </div>
    </CardWrapper>
  )
}

function ServiceDeskPortalContent() {
  const { user, isLoading, isAuthenticated } = useCustomAuth()
  const [activeTab, setActiveTab] = useState<"overview" | "tickets" | "resources" | "account">("overview")
  const [selectedTicket, setSelectedTicket] = useState<TicketProps | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Sample data
  const tickets: TicketProps[] = [
    {
      id: "TK-001234",
      title: "Email setup not working on mobile",
      status: "in-progress",
      priority: "high",
      created: "2024-01-15",
      lastUpdate: "2 hours ago",
      description: "Unable to receive emails on iPhone after recent iOS update. Desktop email works fine.",
      clientEmail: user?.email || "",
      responses: [
        {
          id: "1",
          message:
            "Thank you for contacting support. We've received your ticket and our technical team is investigating the iOS email issue.",
          author: "Sarah Johnson",
          timestamp: "2024-01-15 10:30 AM",
          isStaff: true,
        },
      ],
    },
  ]

  // Loading state
  if (isLoading || !isClient) {
    return (
      <div className="min-h-screen bg-background text-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-primary flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="mx-auto mb-4 text-muted" />
          <h3 className="text-xl font-semibold mb-2 text-primary">Authentication Required</h3>
          <p className="text-secondary mb-6">Please log in to access the Service Desk Portal.</p>
          <Link href="/auth/login">
            <Button className="bg-primary hover:bg-primary-hover text-surface">Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background text-primary relative">
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

        {/* Header */}
        <section className="container mx-auto px-4 pt-32 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Building className="text-primary" size={24} />
                <h1 className="text-3xl font-bold text-primary">NextPhase IT Service Desk</h1>
              </div>
              <p className="text-secondary">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="text-right">
                <div className="text-sm text-secondary">{user?.role === "admin" ? "Administrator" : "User"}</div>
                <div className="text-sm text-primary">{user?.email}</div>
              </div>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/auth/login")}>
                Sign Out
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap space-x-1 bg-surface/50 rounded-lg p-1 mb-8 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: <CheckCircle size={16} /> },
              { id: "tickets", label: "Support Tickets", icon: <Ticket size={16} /> },
              { id: "resources", label: "Resources", icon: <FileText size={16} /> },
              { id: "account", label: "Account", icon: <User size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-surface shadow-lg"
                    : "text-secondary hover:text-primary hover:bg-surface/20"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        <section className="container mx-auto px-4 pb-16">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Ticket className="text-blue-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {tickets.filter((t) => t.status !== "closed").length}
                  </div>
                  <div className="text-sm text-secondary">Open Tickets</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="text-purple-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">0</div>
                  <div className="text-sm text-secondary">Active Alerts</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="text-accent" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-accent mb-1">2-4</div>
                  <div className="text-sm text-secondary">Hours Avg Response</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="text-purple-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">98%</div>
                  <div className="text-sm text-secondary">Satisfaction Rate</div>
                </CardWrapper>
              </div>

              {/* Microsoft 365 Service Health */}
              <div>
                <M365ServiceHealth maxItems={3} />
              </div>

              {/* Welcome Message */}
              <CardWrapper className="bg-primary/10 border-primary/20">
                <div className="flex items-start gap-4">
                  <Image
                    src={user?.picture || "/placeholder.svg?height=60&width=60&text=" + (user?.name?.charAt(0) || "U")}
                    alt={user?.name || "User"}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Welcome to NextPhase IT Service Desk</h3>
                    <p className="text-secondary mb-4">
                      You're logged in as {user?.name} ({user?.role || "user"}). This portal provides secure access to
                      support tickets, resources, and account management.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">nextphaseit.org</span>
                      <span className="text-xs bg-surface text-secondary px-2 py-1 rounded">
                        {user?.authMethod || "Custom Auth"}
                      </span>
                      {user?.role === "admin" && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Administrator</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardWrapper>
            </div>
          )}

          {/* Tickets Tab */}
          {activeTab === "tickets" && (
            <div className="space-y-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-primary">Support Tickets</h2>
                  <p className="text-secondary">Manage your support requests and track their progress</p>
                </div>
                <Button className="bg-primary hover:bg-primary-hover text-surface">
                  <Plus size={16} className="mr-2" />
                  New Ticket
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} onViewDetails={setSelectedTicket} />
                ))}
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-primary">Knowledge Base & Resources</h2>
                <p className="text-secondary">Access guides, documentation, and helpful resources</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sharePointResources.map((resource) => (
                  <CardWrapper key={resource.id} className="hover:border-primary/40 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📄</span>
                        <div>
                          <h3 className="font-semibold text-primary">{resource.title}</h3>
                          <p className="text-sm text-secondary">
                            {resource.type} • {resource.size}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-secondary text-sm mb-4">{resource.description}</p>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary-hover text-surface">
                        <Download size={12} className="mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye size={12} className="mr-1" />
                        Preview
                      </Button>
                    </div>
                  </CardWrapper>
                ))}
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <div>
              <MultiTenantAccountManagement />
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="bg-surface mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary">NextPhase IT</h3>
                <p className="text-secondary">
                  Secure service desk portal with enterprise-level security and data protection.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-primary">Portal</h4>
                <ul className="space-y-2 text-secondary">
                  <li>
                    <button onClick={() => setActiveTab("overview")} className="hover:text-primary transition-colors">
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab("tickets")} className="hover:text-primary transition-colors">
                      Support Tickets
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab("account")} className="hover:text-primary transition-colors">
                      Account Management
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-primary">Support</h4>
                <ul className="space-y-2 text-secondary">
                  <li>
                    <a href="mailto:support@nextphaseit.org" className="hover:text-primary transition-colors">
                      Email Support
                    </a>
                  </li>
                  <li>
                    <a href="tel:+19843109533" className="hover:text-primary transition-colors">
                      Phone Support
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-primary">Organization</h4>
                <ul className="space-y-2 text-secondary">
                  <li>nextphaseit.org</li>
                  <li>Secure Portal</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-12 pt-8 text-center text-secondary">
              <p>© 2024 NextPhase IT. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default function ServiceDeskPortalPage() {
  return <ServiceDeskPortalContent />
}
