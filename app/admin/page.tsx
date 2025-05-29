"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { AdminAuthProvider, useAdminAuth, withAdminAuth } from "@/providers/admin-auth-provider"
import { AdminAnalyticsDashboard } from "@/components/admin-analytics-dashboard"
import {
  BarChart3,
  FileText,
  Settings,
  Shield,
  Activity,
  Building,
  Eye,
  CheckCircle,
  Ticket,
  Clock,
  AlertCircle,
  MessageSquare,
  RefreshCwIcon as RefreshIcon,
} from "lucide-react"
import Image from "next/image"
import { AdminReportsModule } from "@/components/admin-reports-module"
import { AdminSettingsModule } from "@/components/admin-settings-module"
import { AdminTenantManagement } from "@/components/admin-tenant-management"
import { AdminAuditModule } from "@/components/admin-audit-module"
import { AdminClientIntakeModule } from "@/components/admin-client-intake-module"

function AdminRealTimeTicketing() {
  const [tickets, setTickets] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    tenant: "all",
    category: "all",
  })
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  useEffect(() => {
    loadTickets()
    // Set up real-time updates (WebSocket simulation)
    const interval = setInterval(loadTickets, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [filters])

  const loadTickets = async () => {
    setIsLoading(true)
    // Simulate API call to SharePoint
    setTimeout(() => {
      const mockTickets = [
        {
          id: "TK-001234",
          title: "Email setup not working on mobile",
          status: "in-progress",
          priority: "high",
          category: "email",
          tenant: "nextphase-it",
          tenantName: "NextPhase IT",
          clientName: "John Smith",
          clientEmail: "john@company.com",
          created: "2024-01-15 10:30:00",
          lastUpdate: "2024-01-15 14:30:00",
          assignedTo: "Sarah Johnson",
          description: "Unable to receive emails on iPhone after recent iOS update.",
          responses: 2,
        },
        {
          id: "TK-001235",
          title: "SharePoint access permission issue",
          status: "open",
          priority: "medium",
          category: "sharepoint",
          tenant: "example-corp",
          tenantName: "Example Corporation",
          clientName: "Jane Doe",
          clientEmail: "jane@example.com",
          created: "2024-01-14 09:15:00",
          lastUpdate: "2024-01-14 09:15:00",
          assignedTo: null,
          description: "New employee cannot access shared documents.",
          responses: 0,
        },
        {
          id: "TK-001236",
          title: "Website contact form not sending",
          status: "resolved",
          priority: "urgent",
          category: "website",
          tenant: "demo-company",
          tenantName: "Demo Company",
          clientName: "Mike Wilson",
          clientEmail: "mike@demo.com",
          created: "2024-01-12 11:00:00",
          lastUpdate: "2024-01-12 15:30:00",
          assignedTo: "David Kim",
          description: "Contact form submissions are not being received.",
          responses: 3,
        },
      ]
      setTickets(mockTickets)
      setIsLoading(false)
    }, 1000)
  }

  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus, lastUpdate: new Date().toISOString() } : ticket,
      ),
    )
  }

  const assignTicket = (ticketId: string, assignee: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, assignedTo: assignee, lastUpdate: new Date().toISOString() } : ticket,
      ),
    )
  }

  const filteredTickets = tickets.filter((ticket) => {
    if (filters.status !== "all" && ticket.status !== filters.status) return false
    if (filters.priority !== "all" && ticket.priority !== filters.priority) return false
    if (filters.tenant !== "all" && ticket.tenant !== filters.tenant) return false
    if (filters.category !== "all" && ticket.category !== filters.category) return false
    return true
  })

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Real-Time Ticketing</h2>
          <p className="text-gray-400">Monitor and manage support tickets across all tenants</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Live Updates</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Ticket className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {tickets.filter((t) => t.status === "open").length}
          </div>
          <div className="text-sm text-gray-400">Open Tickets</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {tickets.filter((t) => t.status === "in-progress").length}
          </div>
          <div className="text-sm text-gray-400">In Progress</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="text-red-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-red-400 mb-1">
            {tickets.filter((t) => t.priority === "urgent").length}
          </div>
          <div className="text-sm text-gray-400">Urgent Priority</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">
            {tickets.filter((t) => t.status === "resolved").length}
          </div>
          <div className="text-sm text-gray-400">Resolved Today</div>
        </CardWrapper>
      </div>

      {/* Filters */}
      <CardWrapper>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tenant</label>
            <select
              value={filters.tenant}
              onChange={(e) => setFilters({ ...filters, tenant: e.target.value })}
              className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="all">All Tenants</option>
              <option value="nextphase-it">NextPhase IT</option>
              <option value="example-corp">Example Corporation</option>
              <option value="demo-company">Demo Company</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="all">All Categories</option>
              <option value="email">Email</option>
              <option value="sharepoint">SharePoint</option>
              <option value="website">Website</option>
              <option value="network">Network</option>
              <option value="security">Security</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button onClick={loadTickets} variant="outline">
              <RefreshIcon size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardWrapper>

      {/* Tickets Table */}
      <CardWrapper>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshIcon className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-gray-400">Loading tickets...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Ticket</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Tenant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Assigned</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{ticket.id}</div>
                      <div className="text-sm text-gray-400 max-w-xs truncate">{ticket.title}</div>
                      <div className="text-xs text-gray-500">{ticket.created}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{ticket.clientName}</div>
                      <div className="text-sm text-gray-400">{ticket.clientEmail}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">{ticket.tenantName}</div>
                      <div className="text-xs text-gray-500">{ticket.tenant}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${priorityColors[ticket.priority as keyof typeof priorityColors]}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={ticket.status}
                        onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                        className={`px-2 py-1 rounded text-xs border ${statusColors[ticket.status as keyof typeof statusColors]} bg-transparent`}
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={ticket.assignedTo || ""}
                        onChange={(e) => assignTicket(ticket.id, e.target.value)}
                        className="px-2 py-1 rounded text-xs bg-black border border-gray-600 text-white"
                      >
                        <option value="">Unassigned</option>
                        <option value="Sarah Johnson">Sarah Johnson</option>
                        <option value="David Kim">David Kim</option>
                        <option value="Alex Rodriguez">Alex Rodriguez</option>
                        <option value="Lisa Wang">Lisa Wang</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedTicket(ticket)}>
                          <Eye size={12} className="mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare size={12} className="mr-1" />
                          {ticket.responses}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardWrapper>
    </div>
  )
}

function AdminPortalContent() {
  const { adminUser, logout, hasPermission } = useAdminAuth()
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "reports" | "settings" | "tenants" | "audit" | "intake" | "tickets"
  >("dashboard")

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Shield size={64} className="mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
          <p className="text-gray-400">Please log in to access the Admin Portal.</p>
        </div>
      </div>
    )
  }

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
        {/* Header */}
        <header className="bg-card border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/nextphase-logo.png"
                  alt="NextPhase IT"
                  width={150}
                  height={45}
                  className="h-10 w-auto"
                />
                <div className="hidden md:block">
                  <h1 className="text-xl font-bold text-red-400">Admin Portal</h1>
                  <p className="text-sm text-gray-400">NextPhase IT Administrative Console</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-medium">{adminUser.name}</div>
                  <div className="text-sm text-gray-400">{adminUser.role.replace("_", " ")}</div>
                </div>
                <Image
                  src={adminUser.picture || "/placeholder.svg?height=40&width=40&text=" + adminUser.name.charAt(0)}
                  alt={adminUser.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <Button onClick={logout} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-gray-900 border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex space-x-1 overflow-x-auto py-2">
              {[
                { id: "dashboard", label: "Analytics", icon: <BarChart3 size={16} />, permission: "analytics.view" },
                { id: "tickets", label: "Live Tickets", icon: <Ticket size={16} />, permission: "tickets.view" },
                { id: "reports", label: "Reports", icon: <FileText size={16} />, permission: "reports.view" },
                { id: "tenants", label: "Tenants", icon: <Building size={16} />, permission: "tenants.view" },
                { id: "settings", label: "Settings", icon: <Settings size={16} />, permission: "settings.manage" },
                { id: "audit", label: "Audit Log", icon: <Activity size={16} />, permission: "audit.view" },
                { id: "intake", label: "Client Intake", icon: <FileText size={16} />, permission: "intake.view" },
              ]
                .filter((tab) => hasPermission(tab.permission.split(".")[0], tab.permission.split(".")[1]))
                .map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-red-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {activeTab === "dashboard" && <AdminAnalyticsDashboard />}
          {activeTab === "tickets" && <AdminRealTimeTicketing />}
          {activeTab === "reports" && <AdminReportsModule />}
          {activeTab === "settings" && <AdminSettingsModule />}
          {activeTab === "tenants" && <AdminTenantManagement />}
          {activeTab === "audit" && <AdminAuditModule />}
          {activeTab === "intake" && <AdminClientIntakeModule />}
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-gray-800 mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-400">© 2024 NextPhase IT. All rights reserved.</p>
                <p className="text-sm text-gray-500">Administrative Portal - Restricted Access</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>User: {adminUser.email}</span>
                <span>Role: {adminUser.role.replace("_", " ")}</span>
                <span>Last Login: {adminUser.lastLogin}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

const ProtectedAdminPortal = withAdminAuth(AdminPortalContent)

export default function AdminPortalPage() {
  return (
    <AdminAuthProvider>
      <ProtectedAdminPortal />
    </AdminAuthProvider>
  )
}
