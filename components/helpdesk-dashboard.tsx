"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Filter,
  Clock,
  AlertCircle,
  User,
  Calendar,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
} from "lucide-react"

// Mock data for demonstration
const mockTickets = [
  {
    id: "TKT-001",
    title: "Email server not responding",
    description: "Users unable to send/receive emails since this morning",
    status: "Open",
    priority: "High",
    category: "IT",
    assignedTo: "Adrian Knight",
    createdBy: "John Doe",
    createdDate: "2024-01-15T09:00:00Z",
    lastUpdated: "2024-01-15T09:00:00Z",
    comments: 3,
    attachments: 1,
  },
  {
    id: "TKT-002",
    title: "Invoice payment issue",
    description: "Customer unable to process payment for invoice #12345",
    status: "In Progress",
    priority: "Medium",
    category: "Billing",
    assignedTo: "Sarah Wilson",
    createdBy: "Jane Smith",
    createdDate: "2024-01-14T14:30:00Z",
    lastUpdated: "2024-01-15T08:45:00Z",
    comments: 5,
    attachments: 0,
  },
  {
    id: "TKT-003",
    title: "Password reset request",
    description: "User needs password reset for domain account",
    status: "Closed",
    priority: "Low",
    category: "IT",
    assignedTo: "Mike Johnson",
    createdBy: "Bob Brown",
    createdDate: "2024-01-13T11:15:00Z",
    lastUpdated: "2024-01-14T16:20:00Z",
    comments: 2,
    attachments: 0,
  },
]

const statusColors = {
  Open: "bg-red-500",
  "In Progress": "bg-yellow-500",
  Closed: "bg-green-500",
}

const priorityColors = {
  Low: "bg-blue-500",
  Medium: "bg-orange-500",
  High: "bg-red-500",
}

export default function HelpdeskDashboard() {
  const [tickets, setTickets] = useState(mockTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [showNewTicketForm, setShowNewTicketForm] = useState(false)

  // Calculate ticket statistics
  const ticketStats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "Open").length,
    inProgress: tickets.filter((t) => t.status === "In Progress").length,
    closed: tickets.filter((t) => t.status === "Closed").length,
    highPriority: tickets.filter((t) => t.priority === "High").length,
  }

  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Help Desk</h1>
          <p className="text-gray-400">Manage support tickets and customer requests</p>
        </div>
        <Button onClick={() => setShowNewTicketForm(true)} className="flex items-center gap-2">
          <Plus size={16} />
          New Ticket
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ticketStats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{ticketStats.open}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{ticketStats.inProgress}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Closed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{ticketStats.closed}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{ticketStats.highPriority}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40 bg-gray-800 border-gray-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-40 bg-gray-800 border-gray-600">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter size={20} />
            Tickets ({filteredTickets.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="border-b border-gray-700 last:border-b-0 p-4 hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-gray-400">{ticket.id}</span>
                      <Badge className={`${statusColors[ticket.status as keyof typeof statusColors]} text-white`}>
                        {ticket.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${priorityColors[ticket.priority as keyof typeof priorityColors]} text-white border-0`}
                      >
                        {ticket.priority}
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {ticket.category}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-white">{ticket.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{ticket.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        <span>Assigned to {ticket.assignedTo}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Created {formatDate(ticket.createdDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>Updated {formatDate(ticket.lastUpdated)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {ticket.comments > 0 && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <MessageSquare size={14} />
                        <span className="text-xs">{ticket.comments}</span>
                      </div>
                    )}
                    {ticket.attachments > 0 && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <Paperclip size={14} />
                        <span className="text-xs">{ticket.attachments}</span>
                      </div>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTickets.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p>No tickets found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Ticket Form Modal Placeholder */}
      {showNewTicketForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-gray-900 border-gray-700 w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>Create New Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">New ticket form will be implemented here.</p>
              <Button onClick={() => setShowNewTicketForm(false)} variant="outline">
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
