"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { AuthProvider } from "@/providers/auth-provider"
import {
  Ticket,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  Settings,
  BarChart3,
  Users,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Archive,
} from "lucide-react"
import Image from "next/image"

interface AdminTicket {
  id: string
  title: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  created: string
  lastUpdate: string
  description: string
  clientName: string
  clientEmail: string
  assignedTo?: string
  source: "portal" | "chatbot" | "email" | "phone"
  responses: TicketResponse[]
  tags: string[]
}

interface TicketResponse {
  id: string
  message: string
  author: string
  timestamp: string
  isStaff: boolean
  isInternal?: boolean
}

interface AdminStats {
  totalTickets: number
  openTickets: number
  inProgressTickets: number
  resolvedToday: number
  avgResponseTime: string
  customerSatisfaction: number
}

function AdminTicketCard({
  ticket,
  onViewDetails,
  onStatusChange,
  onAssign,
}: {
  ticket: AdminTicket
  onViewDetails: (ticket: AdminTicket) => void
  onStatusChange: (ticketId: string, status: AdminTicket["status"]) => void
  onAssign: (ticketId: string, assignee: string) => void
}) {
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
    urgent: "text-red-400 animate-pulse",
  }

  const sourceIcons = {
    portal: "🌐",
    chatbot: "🤖",
    email: "📧",
    phone: "📞",
  }

  return (
    <CardWrapper className="hover:border-primary/40 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Ticket className="text-primary" size={20} />
          <h3 className="font-semibold">#{ticket.id}</h3>
          <span className="text-xs">{sourceIcons[ticket.source]}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-2 py-1 rounded-full text-xs border ${statusColors[ticket.status]}`}>
            {ticket.status.replace("-", " ")}
          </div>
          <Button size="sm" variant="ghost" onClick={() => onViewDetails(ticket)} className="p-1 h-auto">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </div>

      <h4 className="font-medium mb-2">{ticket.title}</h4>
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{ticket.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span className={priorityColors[ticket.priority]}>{ticket.priority.toUpperCase()} Priority</span>
        <span>Updated {ticket.lastUpdate}</span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <User size={12} />
          <span>{ticket.clientName}</span>
        </div>
        <div className="flex items-center gap-2">
          {ticket.assignedTo ? (
            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">{ticket.assignedTo}</span>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAssign(ticket.id, "current-user")}
              className="text-xs h-6 px-2"
            >
              Assign to me
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <Button size="sm" onClick={() => onViewDetails(ticket)} className="flex-1 bg-primary hover:bg-primary/90">
          <Eye size={12} className="mr-1" />
          View
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onStatusChange(ticket.id, ticket.status === "open" ? "in-progress" : "resolved")}
          className="flex-1"
        >
          {ticket.status === "open" ? "Start" : "Resolve"}
        </Button>
      </div>
    </CardWrapper>
  )
}

function AdminTicketDetailsModal({
  ticket,
  onClose,
  onStatusChange,
  onAddResponse,
}: {
  ticket: AdminTicket | null
  onClose: () => void
  onStatusChange: (ticketId: string, status: AdminTicket["status"]) => void
  onAddResponse: (ticketId: string, message: string, isInternal: boolean) => void
}) {
  const [newResponse, setNewResponse] = useState("")
  const [isInternal, setIsInternal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!ticket) return null

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newResponse.trim()) return

    setIsSubmitting(true)
    await onAddResponse(ticket.id, newResponse, isInternal)
    setNewResponse("")
    setIsSubmitting(false)
  }

  const statusColors = {
    open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    resolved: "bg-green-500/20 text-green-400 border-green-500/30",
    closed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden border border-primary/20">
        {/* Header */}
        <div className="bg-primary/10 p-6 border-b border-primary/20">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">Admin - Ticket #{ticket.id}</h2>
                <div className={`px-3 py-1 rounded-full text-sm border ${statusColors[ticket.status]}`}>
                  {ticket.status.replace("-", " ")}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{ticket.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Client: {ticket.clientName}</span>
                <span>Email: {ticket.clientEmail}</span>
                <span>Source: {ticket.source}</span>
                <span>Created: {ticket.created}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={ticket.status}
                onChange={(e) => onStatusChange(ticket.id, e.target.value as AdminTicket["status"])}
                className="bg-black border border-primary/20 rounded px-3 py-1 text-sm"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
                ✕
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[60vh]">
            {/* Original Description */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Original Request</h4>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <p className="whitespace-pre-wrap">{ticket.description}</p>
              </div>
            </div>

            {/* Responses */}
            <div className="space-y-4">
              <h4 className="font-semibold">Conversation History</h4>
              {ticket.responses.map((response) => (
                <div
                  key={response.id}
                  className={`p-4 rounded-lg border ${
                    response.isInternal
                      ? "bg-purple-500/10 border-purple-500/20 ml-8"
                      : response.isStaff
                        ? "bg-primary/10 border-primary/20 ml-4"
                        : "bg-gray-800/50 border-gray-700 mr-4"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{response.author}</span>
                      {response.isInternal && (
                        <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                          Internal Note
                        </span>
                      )}
                      {response.isStaff && !response.isInternal && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Staff</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{response.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{response.message}</p>
                </div>
              ))}
            </div>

            {/* Add Response Form */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Add Response</h4>
              <form onSubmit={handleSubmitResponse} className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isInternal}
                      onChange={(e) => setIsInternal(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Internal note (not visible to client)</span>
                  </label>
                </div>
                <textarea
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  placeholder={isInternal ? "Add internal note..." : "Respond to client..."}
                  rows={4}
                  className="w-full bg-black border border-primary/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary resize-vertical"
                />
                <div className="flex gap-3">
                  <Button type="submit" disabled={isSubmitting || !newResponse.trim()}>
                    {isSubmitting ? "Sending..." : isInternal ? "Add Note" : "Send Response"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <a href={`mailto:${ticket.clientEmail}?subject=Re: Support Ticket #${ticket.id} - ${ticket.title}`}>
                      <Mail size={14} className="mr-2" />
                      Email Client
                    </a>
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-gray-800/30 p-6 border-l border-gray-700">
            <h4 className="font-semibold mb-4">Ticket Actions</h4>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Edit size={16} className="mr-2" />
                Edit Ticket
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Archive size={16} className="mr-2" />
                Archive
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-4">Client Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Name:</span>
                  <p>{ticket.clientName}</p>
                </div>
                <div>
                  <span className="text-gray-400">Email:</span>
                  <p>{ticket.clientEmail}</p>
                </div>
                <div>
                  <span className="text-gray-400">Priority:</span>
                  <p className="capitalize">{ticket.priority}</p>
                </div>
                <div>
                  <span className="text-gray-400">Source:</span>
                  <p className="capitalize">{ticket.source}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <Button size="sm" className="w-full" asChild>
                  <a href={`mailto:${ticket.clientEmail}`}>
                    <Mail size={14} className="mr-2" />
                    Email Client
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="tel:+19843109533">
                    <Phone size={14} className="mr-2" />
                    Call Client
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminPortalContent() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "tickets" | "analytics" | "settings">("dashboard")
  const [tickets, setTickets] = useState<AdminTicket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<AdminTicket | null>(null)
  const [ticketFilter, setTicketFilter] = useState<"all" | "open" | "in-progress" | "resolved" | "closed">("all")
  const [ticketSearch, setTicketSearch] = useState("")
  const [assigneeFilter, setAssigneeFilter] = useState<"all" | "assigned" | "unassigned">("all")

  // Sample admin stats
  const stats: AdminStats = {
    totalTickets: 156,
    openTickets: 23,
    inProgressTickets: 12,
    resolvedToday: 8,
    avgResponseTime: "2.3 hours",
    customerSatisfaction: 98,
  }

  // Sample tickets data
  useEffect(() => {
    const sampleTickets: AdminTicket[] = [
      {
        id: "TK-001234",
        title: "Email setup not working on mobile",
        status: "in-progress",
        priority: "high",
        created: "2024-01-15",
        lastUpdate: "2 hours ago",
        description: "Unable to receive emails on iPhone after recent iOS update. Desktop email works fine.",
        clientName: "John Smith",
        clientEmail: "john@company.com",
        assignedTo: "Sarah Johnson",
        source: "portal",
        tags: ["email", "mobile", "ios"],
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
            message: "Checking with Apple support team about known iOS 17.2 issues with Exchange.",
            author: "Sarah Johnson",
            timestamp: "2024-01-15 3:00 PM",
            isStaff: true,
            isInternal: true,
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
        description: "New employee cannot access shared documents in SharePoint site.",
        clientName: "HR Department",
        clientEmail: "hr@company.com",
        source: "email",
        tags: ["sharepoint", "permissions"],
        responses: [],
      },
      {
        id: "TK-001236",
        title: "Website contact form not sending",
        status: "resolved",
        priority: "urgent",
        created: "2024-01-12",
        lastUpdate: "3 days ago",
        description: "Contact form submissions are not being received.",
        clientName: "Admin User",
        clientEmail: "admin@company.com",
        assignedTo: "Mike Chen",
        source: "chatbot",
        tags: ["website", "forms", "urgent"],
        responses: [
          {
            id: "1",
            message: "This is marked as urgent. Our development team is investigating immediately.",
            author: "Mike Chen",
            timestamp: "2024-01-12 11:00 AM",
            isStaff: true,
          },
          {
            id: "2",
            message: "Issue resolved. SMTP configuration was missing.",
            author: "Mike Chen",
            timestamp: "2024-01-12 2:30 PM",
            isStaff: true,
          },
        ],
      },
    ]
    setTickets(sampleTickets)
  }, [])

  // Real-time ticket updates (simulated)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new tickets coming in
      const newTicketChance = Math.random()
      if (newTicketChance > 0.95) {
        // 5% chance every 5 seconds
        const newTicket: AdminTicket = {
          id: `TK-${Date.now().toString().slice(-6)}`,
          title: "New support request",
          status: "open",
          priority: "medium",
          created: new Date().toLocaleDateString(),
          lastUpdate: "Just now",
          description: "A new support ticket has been submitted.",
          clientName: "New Client",
          clientEmail: "client@example.com",
          source: "portal",
          tags: ["new"],
          responses: [],
        }
        setTickets((prev) => [newTicket, ...prev])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleStatusChange = (ticketId: string, status: AdminTicket["status"]) => {
    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === ticketId ? { ...ticket, status, lastUpdate: "Just now" } : ticket)),
    )
  }

  const handleAssign = (ticketId: string, assignee: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, assignedTo: assignee, lastUpdate: "Just now" } : ticket,
      ),
    )
  }

  const handleAddResponse = async (ticketId: string, message: string, isInternal: boolean) => {
    const newResponse: TicketResponse = {
      id: Date.now().toString(),
      message,
      author: "Current Admin",
      timestamp: new Date().toLocaleString(),
      isStaff: true,
      isInternal,
    }

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              responses: [...ticket.responses, newResponse],
              lastUpdate: "Just now",
            }
          : ticket,
      ),
    )
  }

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    if (ticketFilter !== "all" && ticket.status !== ticketFilter) return false
    if (assigneeFilter === "assigned" && !ticket.assignedTo) return false
    if (assigneeFilter === "unassigned" && ticket.assignedTo) return false
    if (
      ticketSearch &&
      !ticket.title.toLowerCase().includes(ticketSearch.toLowerCase()) &&
      !ticket.id.toLowerCase().includes(ticketSearch.toLowerCase()) &&
      !ticket.clientName.toLowerCase().includes(ticketSearch.toLowerCase())
    )
      return false
    return true
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
              <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
              <p className="text-gray-400">Manage support tickets and monitor system performance</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="text-sm text-gray-400">Last updated: {new Date().toLocaleTimeString()}</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-card/50 rounded-lg p-1 mb-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: <BarChart3 size={16} /> },
              { id: "tickets", label: "Tickets", icon: <Ticket size={16} /> },
              { id: "analytics", label: "Analytics", icon: <TrendingUp size={16} /> },
              { id: "settings", label: "Settings", icon: <Settings size={16} /> },
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
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Ticket className="text-blue-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">{stats.totalTickets}</div>
                  <div className="text-sm text-gray-400">Total Tickets</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="text-red-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-red-400 mb-1">{stats.openTickets}</div>
                  <div className="text-sm text-gray-400">Open Tickets</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="text-yellow-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.inProgressTickets}</div>
                  <div className="text-sm text-gray-400">In Progress</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="text-green-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-green-400 mb-1">{stats.resolvedToday}</div>
                  <div className="text-sm text-gray-400">Resolved Today</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="text-purple-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">{stats.avgResponseTime}</div>
                  <div className="text-sm text-gray-400">Avg Response</div>
                </CardWrapper>

                <CardWrapper className="text-center">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="text-pink-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-pink-400 mb-1">{stats.customerSatisfaction}%</div>
                  <div className="text-sm text-gray-400">Satisfaction</div>
                </CardWrapper>
              </div>

              {/* Recent Tickets */}
              <div>
                <h2 className="text-xl font-bold mb-4">Recent Tickets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tickets.slice(0, 6).map((ticket) => (
                    <AdminTicketCard
                      key={ticket.id}
                      ticket={ticket}
                      onViewDetails={setSelectedTicket}
                      onStatusChange={handleStatusChange}
                      onAssign={handleAssign}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tickets Tab */}
          {activeTab === "tickets" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">All Support Tickets</h2>
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

                  {/* Filters */}
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

                  <select
                    value={assigneeFilter}
                    onChange={(e) => setAssigneeFilter(e.target.value as any)}
                    className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    <option value="all">All Assignments</option>
                    <option value="assigned">Assigned</option>
                    <option value="unassigned">Unassigned</option>
                  </select>
                </div>
              </div>

              {/* Tickets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTickets.map((ticket) => (
                  <AdminTicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onViewDetails={setSelectedTicket}
                    onStatusChange={handleStatusChange}
                    onAssign={handleAssign}
                  />
                ))}
              </div>

              {filteredTickets.length === 0 && (
                <div className="text-center py-12">
                  <Ticket size={64} className="mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
                  <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="text-center py-12">
              <BarChart3 size={64} className="mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-400">Detailed analytics and reporting features coming soon.</p>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="text-center py-12">
              <Settings size={64} className="mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold mb-2">Admin Settings</h3>
              <p className="text-gray-400">Configuration and settings panel coming soon.</p>
            </div>
          )}
        </section>

        {/* Ticket Details Modal */}
        <AdminTicketDetailsModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onStatusChange={handleStatusChange}
          onAddResponse={handleAddResponse}
        />
      </div>
    </main>
  )
}

export default function AdminPortalPage() {
  return (
    <AuthProvider>
      <AdminPortalContent />
    </AuthProvider>
  )
}
