"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import {
  MultiTenantAuthProvider,
  useMultiTenantAuth,
  withMultiTenantAuth,
} from "@/providers/multi-tenant-auth-provider"
import { M365ServiceHealth } from "@/components/m365-service-health"
import { MultiTenantAccountManagement } from "@/components/multi-tenant-account-management"
import {
  Ticket,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Eye,
  MessageSquare,
  Calendar,
  Building,
  Plus,
  Download,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ToastProvider } from "@/components/ui/toast"
import { TicketStatusBadge, TicketStatusTimeline } from "@/components/ticket-status"
import { AdminTicketControls } from "@/components/admin-ticket-controls"
import { useTicketPolling } from "@/hooks/use-ticket-polling"

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

// SharePoint/OneDrive Resources Configuration - UPDATE THESE WITH YOUR REAL URLS
const sharePointResources = [
  {
    id: "1",
    title: "Microsoft 365 User Guide",
    type: "PDF",
    size: "2.3 MB",
    updated: "Jan 10, 2024",
    description: "Complete guide for using Microsoft 365 applications",
    category: "guides",
    shareUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_1?e=YOUR_SHARE_KEY_1",
    downloadUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_1?e=YOUR_SHARE_KEY_1&download=1",
    previewUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_1?e=YOUR_SHARE_KEY_1&action=embedview",
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
    shareUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_2?e=YOUR_SHARE_KEY_2",
    downloadUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_2?e=YOUR_SHARE_KEY_2&download=1",
    previewUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_2?e=YOUR_SHARE_KEY_2&action=embedview",
    isAccessible: true,
  },
  {
    id: "3",
    title: "Security Best Practices",
    type: "PDF",
    size: "1.8 MB",
    updated: "Jan 5, 2024",
    description: "Essential security practices for small businesses",
    category: "policies",
    shareUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_3?e=YOUR_SHARE_KEY_3",
    downloadUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_3?e=YOUR_SHARE_KEY_3&download=1",
    previewUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_3?e=YOUR_SHARE_KEY_3&action=embedview",
    isAccessible: true,
  },
  {
    id: "4",
    title: "Network Troubleshooting Guide",
    type: "PDF",
    size: "3.2 MB",
    updated: "Jan 3, 2024",
    description: "Common network issues and solutions",
    category: "troubleshooting",
    shareUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_4?e=YOUR_SHARE_KEY_4",
    downloadUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_4?e=YOUR_SHARE_KEY_4&download=1",
    previewUrl:
      "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_4?e=YOUR_SHARE_KEY_4&action=embedview",
    isAccessible: true,
  },
  {
    id: "5",
    title: "Backup & Recovery Procedures",
    type: "DOCX",
    size: "2.7 MB",
    updated: "Dec 28, 2023",
    description: "Data backup and disaster recovery procedures",
    category: "policies",
    shareUrl:
      "https://nextphaseit968-my.sharepoint.com/:w:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_5?e=YOUR_SHARE_KEY_5",
    downloadUrl:
      "https://nextphaseit968-my.sharepoint.com/:w:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_5?e=YOUR_SHARE_KEY_5&download=1",
    previewUrl:
      "https://nextphaseit968-my.sharepoint.com/:w:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_5?e=YOUR_SHARE_KEY_5&action=embedview",
    isAccessible: true,
  },
  {
    id: "6",
    title: "IT Request Form Template",
    type: "XLSX",
    size: "156 KB",
    updated: "Dec 20, 2023",
    description: "Template for submitting IT service requests",
    category: "templates",
    shareUrl:
      "https://nextphaseit968-my.sharepoint.com/:x:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_6?e=YOUR_SHARE_KEY_6",
    downloadUrl:
      "https://nextphaseit968-my.sharepoint.com/:x:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_6?e=YOUR_SHARE_KEY_6&download=1",
    previewUrl:
      "https://nextphaseit968-my.sharepoint.com/:x:/g/personal/adrian_knight_nextphaseit_org/YOUR_FILE_ID_6?e=YOUR_SHARE_KEY_6&action=embedview",
    isAccessible: true,
  },
]

// Update the handleOneDriveDownload function to handle SharePoint errors better:

const handleSharePointDownload = async (resource: any) => {
  try {
    const button = document.activeElement as HTMLButtonElement
    if (button) {
      button.disabled = true
      button.textContent = "Downloading..."
    }

    await fetch("/api/track-download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resourceId: resource.id,
        resourceTitle: resource.title,
        downloadType: "sharepoint",
        url: resource.downloadUrl,
      }),
    }).catch(() => {})

    const downloadWindow = window.open(resource.downloadUrl, "_blank")

    if (!downloadWindow) {
      alert("Popup blocked! Please allow popups for this site and try again.")
      return
    }

    setTimeout(() => {
      if (button) {
        button.disabled = false
        button.innerHTML = "<svg>...</svg> Download"
      }
    }, 2000)
  } catch (error) {
    console.error("SharePoint download error:", error)
    alert(`Unable to download "${resource.title}". Please contact support if this issue persists.`)
  }
}

const handleSharePointPreview = (resource: any) => {
  try {
    window.open(resource.previewUrl, "_blank")
  } catch (error) {
    console.error("SharePoint preview error:", error)
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
  const { user } = useMultiTenantAuth()
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

          {/* Status Timeline */}
          <div className="mb-6">
            <TicketStatusTimeline
              currentStatus={ticket.status}
              statusHistory={[
                { status: "open", timestamp: ticket.created, updatedBy: "System" },
                { status: ticket.status, timestamp: ticket.lastUpdate, updatedBy: "Support Team" },
              ]}
            />
          </div>

          {/* Admin Controls (if user is admin) */}
          {user?.role === "admin" && (
            <div className="mb-6">
              <AdminTicketControls
                ticketId={ticket.id}
                currentStatus={ticket.status}
                onStatusChange={(newStatus) => {
                  // Update local state
                  //setSelectedTicket(prev => prev ? {...prev, status: newStatus} : null)
                  // Refresh polling data
                  //refresh()
                }}
              />
            </div>
          )}

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

function ServiceDeskPortalContent() {
  const { user, currentTenant, logout } = useMultiTenantAuth()
  const [activeTab, setActiveTab] = useState<"overview" | "tickets" | "resources" | "account">("overview")
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

  // Add real-time polling for ticket updates
  const tickets: TicketProps[] = [
    {
      id: "TK-001234",
      title: "Email setup not working on mobile",
      status: "in-progress",
      priority: "high",
      created: "2024-01-15",
      lastUpdate: "2 hours ago",
      description: "Unable to receive emails on iPhone after recent iOS update. Desktop email works fine.",
      clientEmail: user?.email,
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

  const ticketIds = tickets.map((t) => t.id)
  const {
    updates,
    isPolling,
    error: pollingError,
    refresh,
  } = useTicketPolling({
    ticketIds,
    interval: 30000,
    enabled: activeTab === "tickets" || activeTab === "overview",
  })

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

  if (!user || !currentTenant) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
          <p className="text-gray-400 mb-6">Please log in to access the Service Desk Portal.</p>
          <Link href="/auth/login">
            <Button className="bg-primary hover:bg-primary/90">Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ToastProvider>
      <main
        className="min-h-screen bg-black text-white relative"
        style={
          {
            "--primary": currentTenant.branding.primaryColor,
            "--secondary": currentTenant.branding.secondaryColor,
          } as React.CSSProperties
        }
      >
        {/* Background Logo */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
            <Image
              src={currentTenant.branding.logo || "/placeholder.svg"}
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
                  <h1 className="text-3xl font-bold">{currentTenant.branding.companyName} Service Desk</h1>
                </div>
                <p className="text-gray-400">Welcome back, {user.name}</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="text-right">
                  <div className="text-sm text-gray-400">{user.role === "admin" ? "Administrator" : "User"}</div>
                  <div className="text-sm text-primary">{user.email}</div>
                </div>
                <Button onClick={logout} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap space-x-1 bg-card/50 rounded-lg p-1 mb-8 overflow-x-auto">
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
                      ? "bg-primary text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
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

                {/* Microsoft 365 Service Health */}
                <div>
                  <M365ServiceHealth maxItems={3} />
                </div>

                {/* Welcome Message */}
                <CardWrapper className="bg-primary/10 border-primary/20">
                  <div className="flex items-start gap-4">
                    <Image
                      src={user.picture || "/placeholder.svg?height=60&width=60&text=" + user.name.charAt(0)}
                      alt={user.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        Welcome to {currentTenant.branding.companyName} Service Desk
                      </h3>
                      <p className="text-gray-400 mb-4">
                        You're logged in as {user.name} ({user.role}). This portal provides secure access to support
                        tickets, resources, and account management for {currentTenant.branding.companyName}.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                          {currentTenant.domain}
                        </span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {user.authMethod === "azure" ? "Microsoft 365" : "Local Auth"}
                        </span>
                        {user.role === "admin" && (
                          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Administrator</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <div>
                <MultiTenantAccountManagement />
              </div>
            )}

            {/* Tickets Tab */}
            {activeTab === "tickets" && (
              <div className="space-y-8">
                {/* Header with New Ticket Button */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Support Tickets</h2>
                    <p className="text-gray-400">Manage your support requests and track their progress</p>
                  </div>
                  <Button onClick={() => setShowNewTicket(true)} className="bg-primary hover:bg-primary/90">
                    <Plus size={16} className="mr-2" />
                    New Ticket
                  </Button>
                </div>

                {/* Filters and Search */}
                <CardWrapper>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <select
                        value={ticketFilter}
                        onChange={(e) => setTicketFilter(e.target.value as any)}
                        className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                      >
                        <option value="all">All Tickets</option>
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                      <select
                        value={ticketSort}
                        onChange={(e) => setTicketSort(e.target.value as any)}
                        className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="priority">Priority</option>
                      </select>
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                      <input
                        type="text"
                        value={ticketSearch}
                        onChange={(e) => setTicketSearch(e.target.value)}
                        placeholder="Search tickets..."
                        className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </CardWrapper>

                {/* Tickets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => {
                      const realtimeUpdate = updates[ticket.id]
                      const currentStatus = realtimeUpdate?.status || ticket.status
                      const lastUpdate = realtimeUpdate?.lastUpdate || ticket.lastUpdate

                      return (
                        <CardWrapper
                          key={ticket.id}
                          className="hover:border-primary/40 transition-colors cursor-pointer"
                          onClick={() => setSelectedTicket({ ...ticket, status: currentStatus, lastUpdate })}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Ticket className="text-primary" size={20} />
                              <h3 className="font-semibold">#{ticket.id}</h3>
                              {isPolling && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
                            </div>
                            <TicketStatusBadge status={currentStatus} />
                          </div>

                          <h4 className="font-medium mb-2">{ticket.title}</h4>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{ticket.description}</p>

                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span className={priorityColors[ticket.priority]}>
                              {ticket.priority.toUpperCase()} Priority
                            </span>
                            <span>Updated {lastUpdate}</span>
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
                                setSelectedTicket({ ...ticket, status: currentStatus, lastUpdate })
                              }}
                            >
                              <Eye size={12} className="mr-1" />
                              View Details
                            </Button>
                          </div>
                        </CardWrapper>
                      )
                    })
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <Ticket size={64} className="mx-auto mb-4 text-gray-600" />
                      <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
                      <p className="text-gray-400 mb-6">
                        {ticketFilter === "all"
                          ? "You haven't submitted any tickets yet."
                          : `No tickets with status "${ticketFilter}" found.`}
                      </p>
                      <Button onClick={() => setShowNewTicket(true)} className="bg-primary hover:bg-primary/90">
                        Submit Your First Ticket
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === "resources" && (
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">Knowledge Base & Resources</h2>
                  <p className="text-gray-400">Access guides, documentation, and helpful resources</p>
                </div>

                {/* Search and Filter */}
                <CardWrapper>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
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

                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Search Resources</label>
                      <input
                        type="text"
                        value={resourceSearch}
                        onChange={(e) => setResourceSearch(e.target.value)}
                        placeholder="Search guides, documents..."
                        className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </CardWrapper>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <CardWrapper key={resource.id} className="hover:border-primary/40 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getFileIcon(resource.type)}</span>
                          <div>
                            <h3 className="font-semibold">{resource.title}</h3>
                            <p className="text-sm text-gray-400">
                              {resource.type} • {resource.size}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            resource.isAccessible ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {resource.isAccessible ? "Available" : "Restricted"}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm mb-4">{resource.description}</p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>Updated {resource.updated}</span>
                        <span className="capitalize">{resource.category}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSharePointDownload(resource)}
                          disabled={!resource.isAccessible}
                          className="flex-1"
                        >
                          <Download size={12} className="mr-1" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSharePointPreview(resource)}
                          disabled={!resource.isAccessible}
                        >
                          <Eye size={12} className="mr-1" />
                          Preview
                        </Button>
                      </div>
                    </CardWrapper>
                  ))}
                </div>
              </div>
            )}

            {/* New Ticket Modal */}
            {showNewTicket && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-card rounded-lg w-full max-w-2xl border border-primary/20">
                  <div className="bg-primary/10 p-6 border-b border-primary/20">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Submit New Ticket</h2>
                      <Button variant="ghost" onClick={() => setShowNewTicket(false)}>
                        ✕
                      </Button>
                    </div>
                  </div>

                  <form className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                      <input
                        type="text"
                        required
                        placeholder="Brief description of your issue"
                        className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                        <select className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                        <select className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
                          <option value="email">Email Issues</option>
                          <option value="network">Network Problems</option>
                          <option value="software">Software Support</option>
                          <option value="hardware">Hardware Issues</option>
                          <option value="security">Security Concerns</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Please provide detailed information about your issue, including any error messages and steps you've already tried..."
                        className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary resize-vertical"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        Submit Ticket
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowNewTicket(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Ticket Details Modal */}
            <TicketDetailsModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />

            {/* Other tabs would be implemented similarly with tenant-specific data */}
          </section>

          {/* Footer */}
          <footer className="bg-card mt-20">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">{currentTenant.branding.companyName}</h3>
                  <p className="text-gray-400">
                    Secure multi-tenant service desk portal with organization-specific branding and data isolation.
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
                      <button onClick={() => setActiveTab("account")} className="hover:text-primary transition-colors">
                        Account Management
                      </button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-gray-400">
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
                  <h4 className="font-semibold mb-4">Organization</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>{currentTenant.domain}</li>
                    <li>Tenant ID: {currentTenant.id}</li>
                    <li>Multi-Tenant Portal</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>© 2024 {currentTenant.branding.companyName}. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </ToastProvider>
  )
}

const ProtectedServiceDeskPortal = withMultiTenantAuth(ServiceDeskPortalContent)

export default function ServiceDeskPortalPage() {
  return (
    <MultiTenantAuthProvider>
      <ProtectedServiceDeskPortal />
    </MultiTenantAuthProvider>
  )
}
