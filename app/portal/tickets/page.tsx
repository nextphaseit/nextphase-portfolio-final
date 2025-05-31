"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Mock ticket data
const mockTickets = [
  {
    id: "TK-1001",
    subject: "Email configuration issue",
    category: "technical",
    status: "in-progress",
    created: "2023-05-15T10:30:00Z",
    updated: "2023-05-16T14:22:00Z",
  },
  {
    id: "TK-1002",
    subject: "Password reset request",
    category: "account",
    status: "completed",
    created: "2023-05-12T08:45:00Z",
    updated: "2023-05-12T11:20:00Z",
  },
  {
    id: "TK-1003",
    subject: "Billing inquiry",
    category: "billing",
    status: "open",
    created: "2023-05-17T16:10:00Z",
    updated: "2023-05-17T16:10:00Z",
  },
  {
    id: "TK-1004",
    subject: "VPN connection problem",
    category: "technical",
    status: "closed",
    created: "2023-05-10T09:15:00Z",
    updated: "2023-05-11T15:30:00Z",
  },
  {
    id: "TK-1005",
    subject: "Software license request",
    category: "other",
    status: "open",
    created: "2023-05-16T11:20:00Z",
    updated: "2023-05-16T11:20:00Z",
  },
]

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showSuccess, setShowSuccess] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccess(true)
      const timer = setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "open":
        return "status-badge status-open"
      case "in-progress":
        return "status-badge status-in-progress"
      case "completed":
        return "status-badge status-completed"
      case "closed":
        return "status-badge status-closed"
      default:
        return "status-badge"
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Tickets</h1>
        <Link href="/portal/tickets/new" className="btn-primary">
          New Ticket
        </Link>
      </div>

      {showSuccess && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded-lg mb-6">
          Ticket submitted successfully! Our team will review it shortly.
        </div>
      )}

      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="search" className="sr-only">
              Search tickets
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                placeholder="Search by ticket ID or subject"
              />
            </div>
          </div>

          <div className="w-full md:w-48">
            <label htmlFor="status" className="sr-only">
              Filter by status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        {filteredTickets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-background-400">
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Ticket ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Subject</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Created</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Last Updated</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-background-400 hover:bg-background-500">
                    <td className="py-3 px-4 text-primary">{ticket.id}</td>
                    <td className="py-3 px-4">{ticket.subject}</td>
                    <td className="py-3 px-4">
                      <span className={getStatusBadgeClass(ticket.status)}>{getStatusLabel(ticket.status)}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{formatDate(ticket.created)}</td>
                    <td className="py-3 px-4 text-gray-400">{formatDate(ticket.updated)}</td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/portal/tickets/${ticket.id}`} className="text-primary hover:text-primary-400">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-300">No tickets found</h3>
            <p className="mt-1 text-gray-400">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "You haven't submitted any tickets yet."}
            </p>
            <div className="mt-6">
              <Link href="/portal/tickets/new" className="btn-primary">
                Submit New Ticket
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
