"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { AuthProvider } from "@/providers/auth-provider"
import {
  Ticket,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Download,
  ExternalLink,
  User,
  Mail,
  Phone,
  Search,
  Eye,
  MessageSquare,
  Calendar,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createSupportTicket } from "@/app/actions/ticket"

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
    // Use your actual SharePoint site URL structure
    shareUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/EdYO-tzeq1JNpWAZatJmO9sBlvrCpgd2o4o7_cICuyYD_w?e=BJhGyj",
    downloadUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/EdYO-tzeq1JNpWAZatJmO9sBlvrCpgd2o4o7_cICuyYD_w?e=BJhGyj&download=1",
    previewUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/EdYO-tzeq1JNpWAZatJmO9sBlvrCpgd2o4o7_cICuyYD_w?e=BJhGyj&action=embedview",
    isAccessible: false, // Will be checked dynamically
  },
  // Add more resources here once you have working SharePoint links
]

// Update the handleOneDriveDownload function to handle SharePoint errors better:

const handleSharePointDownload = async (resource: any) => {
  try {
    // Check if link is accessible first
    const checkResponse = await fetch(resource.shareUrl, {
      method: "HEAD",
      mode: "no-cors",
    }).catch(() => null)

    // Track download attempt
    await fetch("/api/track-download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resourceId: resource.id,
        resourceTitle: resource.title,
        downloadType: "sharepoint",
        success: checkResponse !== null,
      }),
    }).catch(() => {})

    // Open SharePoint download link
    window.open(resource.downloadUrl, "_blank")
  } catch (error) {
    console.error("SharePoint download error:", error)
    // Show user-friendly error message
    alert("Unable to access this resource. Please contact support if this issue persists.")
  }
}

const handleSharePointPreview = (resource: any) => {
  try {
    // Open preview in new tab
    window.open(resource.previewUrl, "_blank")
  } catch (error) {
    console.error("SharePoint preview error:", error)
    // Fallback to share URL
    window.open(resource.shareUrl, "_blank")
  }
}

const getFileIcon = (fileType: string) => {
  switch (fileType.toUpperCase()) {
    case "PDF":
      return "📄"
    case "DOCX":
    case "DOC":
      return "📝"
    case "XLSX":
    case "XLS":
      return "📊"
    case "PPTX":
    case "PPT":
      return "📊"
    default:
      return "📁"
  }
}

function TicketCard({ ticket, onViewDetails }: { ticket: TicketProps; onViewDetails: (ticket: TicketProps) => void }) {
  const statusColors = {
    open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    resolved: "bg-green-500/20 text-green-400 border-green-500/30",
    closed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  const priorityColors = {
    low: "text-green-400",
    medium: "text-yellow-400",
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
          <h3 className="font-semibold">#{ticket.id}</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${statusColors[ticket.status]}`}>
          {statusIcons[ticket.status]}
          {ticket.status.replace("-", " ")}
        </div>
      </div>

      <h4 className="font-medium mb-2">{ticket.title}</h4>
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{ticket.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span className={priorityColors[ticket.priority]}>{ticket.priority.toUpperCase()} Priority</span>
        <span>Updated {ticket.lastUpdate}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
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

function TicketDetailsModal({ ticket, onClose }: { ticket: TicketProps | null; onClose: () => void }) {
  const [newResponse, setNewResponse] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!ticket) return null

  const statusColors = {
    open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    resolved: "bg-green-500/20 text-green-400 border-green-500/30",
    closed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  const priorityColors = {
    low: "bg-green-500/20 text-green-400 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    urgent: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newResponse.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setNewResponse("")
      setIsSubmitting(false)
      // In a real app, you'd update the ticket responses here
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden border border-primary/20">
        {/* Header */}
        <div className="bg-primary/10 p-6 border-b border-primary/20">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">Ticket #{ticket.id}</h2>
                <div className={`px-3 py-1 rounded-full text-sm border ${statusColors[ticket.status]}`}>
                  {ticket.status.replace("-", " ")}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm border ${priorityColors[ticket.priority]}`}>
                  {ticket.priority.toUpperCase()}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{ticket.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Created: {ticket.created}</span>
                <span>Last Updated: {ticket.lastUpdate}</span>
                {ticket.clientEmail && <span>Contact: {ticket.clientEmail}</span>}
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[60vh]">
          {/* Original Description */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText size={16} className="text-primary" />
              Original Request
            </h4>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <p className="whitespace-pre-wrap">{ticket.description}</p>
            </div>
          </div>

          {/* Responses/Updates */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare size={16} className="text-primary" />
              Updates & Responses
            </h4>
            <div className="space-y-4">
              {ticket.responses && ticket.responses.length > 0 ? (
                ticket.responses.map((response) => (
                  <div
                    key={response.id}
                    className={`p-4 rounded-lg border ${
                      response.isStaff ? "bg-primary/10 border-primary/20 ml-4" : "bg-gray-800/50 border-gray-700 mr-4"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            response.isStaff ? "bg-primary text-white" : "bg-gray-600 text-gray-200"
                          }`}
                        >
                          {response.isStaff ? "S" : "C"}
                        </div>
                        <span className="font-medium">{response.author}</span>
                        {response.isStaff && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Staff</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{response.timestamp}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{response.message}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <MessageSquare size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No updates yet. Our team will respond soon!</p>
                </div>
              )}
            </div>
          </div>

          {/* Add Response Form */}
          {ticket.status !== "closed" && (
            <div>
              <h4 className="font-semibold mb-3">Add a Response</h4>
              <form onSubmit={handleSubmitResponse} className="space-y-4">
                <textarea
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  placeholder="Add additional information, ask questions, or provide updates..."
                  rows={4}
                  className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary resize-vertical"
                />
                <div className="flex gap-3">
                  <Button type="submit" disabled={isSubmitting || !newResponse.trim()}>
                    {isSubmitting ? "Sending..." : "Send Response"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setNewResponse("")}>
                    Clear
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-800/50 p-4 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" asChild>
              <a href={`mailto:support@nextphaseit.org?subject=Re: Ticket #${ticket.id} - ${ticket.title}`}>
                <Mail size={14} className="mr-2" />
                Email Support
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href="tel:+19843109533">
                <Phone size={14} className="mr-2" />
                Call Support
              </a>
            </Button>
          </div>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}

function AlertCard({ alert }: { alert: any }) {
  const statusColors = {
    scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    active: "bg-red-500/20 text-red-400 border-red-500/30",
    resolved: "bg-green-500/20 text-green-400 border-green-500/30",
  }

  const severityColors = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  }

  const typeIcons = {
    outage: <AlertCircle size={20} />,
    alert: <Clock size={20} />,
    resolved: <CheckCircle size={20} />,
  }

  return (
    <CardWrapper className="hover:border-primary/40 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-primary">{typeIcons[alert.type]}</div>
          <h3 className="font-semibold">{alert.title}</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs border ${statusColors[alert.status]}`}>{alert.status}</div>
      </div>

      <p className="text-gray-400 text-sm mb-3">{alert.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span className={severityColors[alert.severity]}>{alert.severity.toUpperCase()} Severity</span>
        <span>Posted {alert.posted}</span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Start:</span>
          <span>{alert.startTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">End:</span>
          <span>{alert.endTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Services:</span>
          <span>{alert.affectedServices.join(", ")}</span>
        </div>
      </div>
    </CardWrapper>
  )
}

// Resource categories for filtering
const resourceCategories = {
  all: "All Resources",
  guides: "User Guides",
  policies: "Policies & Procedures",
  templates: "Templates & Forms",
  troubleshooting: "Troubleshooting",
}

function ClientPortalContent() {
  const [activeTab, setActiveTab] = useState<"overview" | "tickets" | "resources">("overview")
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<TicketProps | null>(null)
  const [ticketFilter, setTicketFilter] = useState<"all" | "open" | "in-progress" | "resolved" | "closed">("all")
  const [ticketSearch, setTicketSearch] = useState("")
  const [ticketSort, setTicketSort] = useState<"newest" | "oldest" | "priority">("newest")

  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false)
  const [ticketResult, setTicketResult] = useState<{ success: boolean; message: string; ticketNumber?: string } | null>(
    null,
  )

  const [resourceFilter, setResourceFilter] = useState<string>("all")
  const [resourceSearch, setResourceSearch] = useState("")

  // Sample data - in production, this would come from your backend
  const tickets: TicketProps[] = [
    {
      id: "TK-001234",
      title: "Email setup not working on mobile",
      status: "in-progress",
      priority: "high",
      created: "2024-01-15",
      lastUpdate: "2 hours ago",
      description:
        "Unable to receive emails on iPhone after recent iOS update. Desktop email works fine. I've tried restarting the phone and checking settings but nothing seems to work.",
      clientEmail: "john@company.com",
      responses: [
        {
          id: "1",
          message:
            "Thank you for contacting support. We've received your ticket and our technical team is investigating the iOS email issue.",
          author: "Sarah Johnson",
          timestamp: "2024-01-15 10:30 AM",
          isStaff: true,
        },
        {
          id: "2",
          message:
            "I've tried the basic troubleshooting steps but still having issues. The problem started after updating to iOS 17.2.",
          author: "John Smith",
          timestamp: "2024-01-15 2:15 PM",
          isStaff: false,
        },
        {
          id: "3",
          message:
            "We've identified the issue with iOS 17.2 and Exchange settings. Please try the following steps:\n\n1. Go to Settings > Mail > Accounts\n2. Select your work email account\n3. Tap 'Advanced'\n4. Change SSL to 'On' if it's off\n5. Restart your device\n\nLet us know if this resolves the issue.",
          author: "Mike Chen",
          timestamp: "2024-01-15 4:45 PM",
          isStaff: true,
        },
      ],
    },
    {
      id: "TK-001235",
      title: "SharePoint access permission issue",
      status: "open",
      priority: "medium",
      created: "2024-01-14",
      lastUpdate: "1 day ago",
      description:
        "New employee cannot access shared documents in SharePoint site. Getting 'Access Denied' error when trying to open files.",
      clientEmail: "hr@company.com",
      responses: [
        {
          id: "1",
          message:
            "We've received your SharePoint access request. Our team is reviewing the permissions and will update you shortly.",
          author: "Alex Rodriguez",
          timestamp: "2024-01-14 9:15 AM",
          isStaff: true,
        },
      ],
    },
    {
      id: "TK-001236",
      title: "Website contact form not sending",
      status: "resolved",
      priority: "urgent",
      created: "2024-01-12",
      lastUpdate: "3 days ago",
      description:
        "Contact form submissions are not being received. Customers reporting issues when trying to submit inquiries through the website.",
      clientEmail: "admin@company.com",
      responses: [
        {
          id: "1",
          message:
            "This is marked as urgent. Our development team is investigating the contact form issue immediately.",
          author: "David Kim",
          timestamp: "2024-01-12 11:00 AM",
          isStaff: true,
        },
        {
          id: "2",
          message:
            "We've identified and fixed the issue. The contact form was missing proper SMTP configuration. All forms are now working correctly and we've tested multiple submissions.",
          author: "David Kim",
          timestamp: "2024-01-12 2:30 PM",
          isStaff: true,
        },
        {
          id: "3",
          message: "Confirmed working! Thank you for the quick resolution.",
          author: "Admin User",
          timestamp: "2024-01-12 3:00 PM",
          isStaff: false,
        },
      ],
    },
    {
      id: "TK-001237",
      title: "Microsoft 365 license activation",
      status: "closed",
      priority: "low",
      created: "2024-01-10",
      lastUpdate: "5 days ago",
      description: "Need help activating Microsoft 365 licenses for 3 new employees.",
      clientEmail: "it@company.com",
      responses: [
        {
          id: "1",
          message:
            "We've processed the license activation for all 3 employees. They should receive activation emails within the next hour.",
          author: "Lisa Wang",
          timestamp: "2024-01-10 1:15 PM",
          isStaff: true,
        },
      ],
    },
  ]

  const alerts = [
    {
      id: "ALERT-001",
      type: "outage",
      title: "Email Server Maintenance",
      status: "scheduled",
      severity: "medium",
      description: "Scheduled maintenance on email servers. Brief interruptions may occur.",
      startTime: "Jan 28, 2024 2:00 AM EST",
      endTime: "Jan 28, 2024 4:00 AM EST",
      affectedServices: ["Email", "Calendar"],
      posted: "2 hours ago",
    },
    {
      id: "ALERT-002",
      type: "alert",
      title: "Security Update Available",
      status: "active",
      severity: "low",
      description:
        "New security updates are available for Windows systems. Please install at your earliest convenience.",
      startTime: "Jan 25, 2024",
      endTime: "Ongoing",
      affectedServices: ["Windows Updates"],
      posted: "3 days ago",
    },
    {
      id: "ALERT-003",
      type: "resolved",
      title: "SharePoint Access Issues",
      status: "resolved",
      severity: "high",
      description: "SharePoint access issues have been resolved. All services are now functioning normally.",
      startTime: "Jan 24, 2024 10:00 AM EST",
      endTime: "Jan 24, 2024 11:30 AM EST",
      affectedServices: ["SharePoint", "OneDrive"],
      posted: "4 days ago",
    },
  ]

  // Filter resources based on search and category
  const filteredResources = sharePointResources.filter((resource) => {
    if (resourceFilter !== "all" && resource.category !== resourceFilter) return false
    if (
      resourceSearch &&
      !resource.title.toLowerCase().includes(resourceSearch.toLowerCase()) &&
      !resource.description.toLowerCase().includes(resourceSearch.toLowerCase())
    )
      return false
    return true
  })

  // Filter and sort tickets
  const filteredTickets = tickets
    .filter((ticket) => {
      if (ticketFilter !== "all" && ticket.status !== ticketFilter) return false
      if (
        ticketSearch &&
        !ticket.title.toLowerCase().includes(ticketSearch.toLowerCase()) &&
        !ticket.id.toLowerCase().includes(ticketSearch.toLowerCase())
      )
        return false
      return true
    })
    .sort((a, b) => {
      switch (ticketSort) {
        case "oldest":
          return new Date(a.created).getTime() - new Date(b.created).getTime()
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        default: // newest
          return new Date(b.created).getTime() - new Date(a.created).getTime()
      }
    })

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

        {/* Header */}
        <section className="container mx-auto px-4 pt-32 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Client Portal</h1>
              <p className="text-gray-400">Manage your projects, support tickets, and resources</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Button onClick={() => setShowNewTicket(true)} className="bg-primary hover:bg-primary/90">
                <Plus size={16} className="mr-2" />
                New Ticket
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-card/50 rounded-lg p-1 mb-8">
            {[
              { id: "overview", label: "Overview", icon: <User size={16} /> },
              { id: "tickets", label: "Support Tickets", icon: <Ticket size={16} /> },
              { id: "resources", label: "Resources", icon: <FileText size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                {tab.label}
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
                  <div className="text-sm text-gray-400">Open Tickets</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="text-purple-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {alerts.filter((a) => a.status === "active").length}
                  </div>
                  <div className="text-sm text-gray-400">Active Alerts</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="text-yellow-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">2-4</div>
                  <div className="text-sm text-gray-400">Hours Avg Response</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="text-purple-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">98%</div>
                  <div className="text-sm text-gray-400">Satisfaction Rate</div>
                </CardWrapper>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Ticket className="text-primary" size={24} />
                    Recent Tickets
                  </h2>
                  <div className="space-y-4">
                    {tickets.slice(0, 3).map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket} onViewDetails={setSelectedTicket} />
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="text-primary" size={24} />
                    IT Alerts & Outages
                  </h2>
                  <div className="space-y-4">
                    {alerts.slice(0, 3).map((alert) => (
                      <AlertCard key={alert.id} alert={alert} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tickets Tab */}
          {activeTab === "tickets" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">Support Tickets</h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  {/* Search */}
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tickets..."
                      value={ticketSearch}
                      onChange={(e) => setTicketSearch(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-black border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary w-full sm:w-64"
                    />
                  </div>

                  {/* Filter */}
                  <select
                    value={ticketFilter}
                    onChange={(e) => setTicketFilter(e.target.value as any)}
                    className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>

                  {/* Sort */}
                  <select
                    value={ticketSort}
                    onChange={(e) => setTicketSort(e.target.value as any)}
                    className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="priority">By Priority</option>
                  </select>

                  <Button onClick={() => setShowNewTicket(true)} className="bg-primary hover:bg-primary/90">
                    <Plus size={16} className="mr-2" />
                    New Ticket
                  </Button>
                </div>
              </div>

              {/* Tickets Grid */}
              {filteredTickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} onViewDetails={setSelectedTicket} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Ticket size={64} className="mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
                  <p className="text-gray-400 mb-6">
                    {ticketSearch || ticketFilter !== "all"
                      ? "Try adjusting your search or filter criteria."
                      : "You haven't created any support tickets yet."}
                  </p>
                  <Button onClick={() => setShowNewTicket(true)} className="bg-primary hover:bg-primary/90">
                    <Plus size={16} className="mr-2" />
                    Create Your First Ticket
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">Resources & Documentation</h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  {/* Search */}
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search resources..."
                      value={resourceSearch}
                      onChange={(e) => setResourceSearch(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-black border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary w-full sm:w-64"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={resourceFilter}
                    onChange={(e) => setResourceFilter(e.target.value)}
                    className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    {Object.entries(resourceCategories).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Resources Grid */}
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <CardWrapper key={resource.id} className="hover:border-primary/40 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{getFileIcon(resource.type)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold">{resource.title}</h3>
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{resource.type}</span>
                          </div>
                          <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <span>{resource.size}</span>
                            <span>Updated {resource.updated}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSharePointDownload(resource)}
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          <Download size={14} className="mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleSharePointPreview(resource)}>
                          <ExternalLink size={14} className="mr-1" />
                          Preview
                        </Button>
                      </div>

                      {/* OneDrive Integration Badge */}
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                            <span className="text-white text-xs font-bold">O</span>
                          </div>
                          <span>Hosted on OneDrive</span>
                        </div>
                      </div>
                    </CardWrapper>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText size={64} className="mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                  <p className="text-gray-400 mb-6">
                    {resourceSearch || resourceFilter !== "all"
                      ? "Try adjusting your search or filter criteria."
                      : "Resources are being updated. Please check back soon."}
                  </p>
                  <Button
                    onClick={() => {
                      setResourceSearch("")
                      setResourceFilter("all")
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* SharePoint Integration Info */}
              <div className="mt-8">
                <CardWrapper className="bg-blue-500/10 border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">SP</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-400 mb-2">SharePoint Integration</h3>
                      <p className="text-gray-400 text-sm mb-3">
                        All resources are securely hosted on Microsoft SharePoint. You can download files directly or
                        preview them in your browser.
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>✓ Enterprise security</span>
                        <span>✓ Version controlled</span>
                        <span>✓ Access controlled</span>
                        <span>✓ Audit trail</span>
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              </div>
            </div>
          )}
        </section>

        {/* Ticket Details Modal */}
        <TicketDetailsModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />

        {/* New Ticket Modal */}
        {showNewTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-lg p-6 w-full max-w-md border border-primary/20">
              <h3 className="text-xl font-bold mb-4">Submit New Ticket</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setIsSubmittingTicket(true)
                  setTicketResult(null)

                  const formData = new FormData(e.currentTarget)
                  const result = await createSupportTicket({
                    subject: formData.get("subject") as string,
                    priority: formData.get("priority") as "low" | "medium" | "high" | "urgent",
                    description: formData.get("description") as string,
                    clientName: formData.get("clientName") as string,
                    clientEmail: formData.get("clientEmail") as string,
                    source: "portal",
                  })

                  setTicketResult(result)
                  setIsSubmittingTicket(false)

                  if (result.success) {
                    // Reset form
                    e.currentTarget.reset()
                    // Close modal after 3 seconds
                    setTimeout(() => {
                      setShowNewTicket(false)
                      setTicketResult(null)
                    }, 3000)
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      name="clientName"
                      type="text"
                      required
                      className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      name="clientEmail"
                      type="email"
                      required
                      className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="subject"
                    type="text"
                    required
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                    placeholder="Brief description of the issue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    name="priority"
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="low">🟢 Low - General question</option>
                    <option value="medium">🟡 Medium - Standard issue</option>
                    <option value="high">🟠 High - Important issue</option>
                    <option value="urgent">🔴 Urgent - Business critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    required
                    className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary resize-vertical"
                    placeholder="Detailed description of the issue..."
                  />
                </div>

                {/* Result Message */}
                {ticketResult && (
                  <div
                    className={`p-4 rounded-lg border ${
                      ticketResult.success
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}
                  >
                    <p className="text-sm font-medium">{ticketResult.message}</p>
                    {ticketResult.success && ticketResult.ticketNumber && (
                      <p className="text-xs mt-1 opacity-80">Ticket #{ticketResult.ticketNumber}</p>
                    )}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={isSubmittingTicket} className="flex-1 bg-primary hover:bg-primary/90">
                    {isSubmittingTicket ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Ticket...
                      </div>
                    ) : (
                      "Submit Ticket"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewTicket(false)}
                    className="flex-1"
                    disabled={isSubmittingTicket}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section className="container mx-auto px-4 pb-16">
          <CardWrapper className="text-center bg-primary/10">
            <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              For urgent issues or if you prefer to speak directly with our team, don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:+19843109533">
                  <Phone size={16} className="mr-2" />
                  Call +1 984-310-9533
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:support@nextphaseit.org">
                  <Mail size={16} className="mr-2" />
                  Email Support
                </a>
              </Button>
            </div>
          </CardWrapper>
        </section>

        {/* Footer */}
        <footer className="bg-card mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
                <p className="text-gray-400">
                  Your trusted technology partner for business growth and digital transformation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Portal</h4>
                <ul className="space-y-2 text-gray-400">
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
                    <button onClick={() => setActiveTab("resources")} className="hover:text-primary transition-colors">
                      Resources
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/faq" className="hover:text-primary transition-colors">
                      FAQ
                    </Link>
                  </li>
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
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>support@nextphaseit.org</li>
                  <li>+1 984-310-9533</li>
                  <li>Clayton, NC</li>
                  <li>Mon-Fri 9AM-6PM EST</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>© 2024 NextPhase IT. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default function ClientPortalPage() {
  return (
    <AuthProvider>
      <ClientPortalContent />
    </AuthProvider>
  )
}
