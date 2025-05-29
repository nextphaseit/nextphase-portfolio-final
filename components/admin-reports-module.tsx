"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { BarChart3, Download, Calendar, RefreshCw, FileText, TrendingUp, Users, Clock } from "lucide-react"

export default function AdminReportsModule() {
  const [reportType, setReportType] = useState<"analytics" | "tickets" | "users" | "audit">("analytics")
  const [dateRange, setDateRange] = useState({ start: "2024-01-01", end: "2024-01-31" })
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock data for the bar chart
  const ticketsByCategory = [
    { category: "Email", count: 45, color: "bg-blue-500" },
    { category: "SharePoint", count: 32, color: "bg-green-500" },
    { category: "Network", count: 28, color: "bg-yellow-500" },
    { category: "Security", count: 15, color: "bg-red-500" },
    { category: "Website", count: 12, color: "bg-purple-500" },
    { category: "Other", count: 8, color: "bg-gray-500" },
  ]

  // Mock data for recent tickets
  const recentTickets = [
    {
      id: "TK-001234",
      title: "Email setup not working on mobile",
      client: "John Smith",
      tenant: "NextPhase IT",
      status: "In Progress",
      priority: "High",
      created: "2024-01-15",
      resolved: null,
    },
    {
      id: "TK-001233",
      title: "SharePoint permission issue",
      client: "Jane Doe",
      tenant: "Example Corp",
      status: "Resolved",
      priority: "Medium",
      created: "2024-01-14",
      resolved: "2024-01-14",
    },
    {
      id: "TK-001232",
      title: "Website contact form not working",
      client: "Mike Wilson",
      tenant: "Demo Company",
      status: "Resolved",
      priority: "Urgent",
      created: "2024-01-12",
      resolved: "2024-01-12",
    },
    {
      id: "TK-001231",
      title: "Network connectivity issues",
      client: "Sarah Johnson",
      tenant: "NextPhase IT",
      status: "Open",
      priority: "High",
      created: "2024-01-11",
      resolved: null,
    },
    {
      id: "TK-001230",
      title: "Password reset request",
      client: "David Kim",
      tenant: "Example Corp",
      status: "Resolved",
      priority: "Low",
      created: "2024-01-10",
      resolved: "2024-01-10",
    },
  ]

  const generateReport = async (format: "csv" | "pdf") => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      const filename = `${reportType}-report-${dateRange.start}-to-${dateRange.end}.${format}`
      console.log(`Generating ${format.toUpperCase()} report: ${filename}`)
      alert(`${format.toUpperCase()} report "${filename}" would be downloaded`)
      setIsGenerating(false)
    }, 2000)
  }

  const scheduleReport = () => {
    alert("Report scheduling feature would open a configuration modal")
  }

  const maxCount = Math.max(...ticketsByCategory.map((item) => item.count))

  const statusColors = {
    Open: "bg-blue-500/20 text-blue-400",
    "In Progress": "bg-yellow-500/20 text-yellow-400",
    Resolved: "bg-green-500/20 text-green-400",
    Closed: "bg-gray-500/20 text-gray-400",
  }

  const priorityColors = {
    Low: "text-green-400",
    Medium: "text-yellow-400",
    High: "text-orange-400",
    Urgent: "text-red-400",
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Reports & Analytics</h2>
          <p className="text-gray-400">Generate and schedule comprehensive reports</p>
        </div>
      </div>

      {/* Report Configuration */}
      <CardWrapper>
        <h3 className="text-lg font-semibold mb-4">Report Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="analytics">Analytics Summary</option>
              <option value="tickets">Ticket Details</option>
              <option value="users">User Activity</option>
              <option value="audit">Audit Log</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-end">
            <Button onClick={scheduleReport} variant="outline" className="w-full">
              <Calendar size={16} className="mr-2" />
              Schedule
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => generateReport("csv")}
            disabled={isGenerating}
            className="bg-primary hover:bg-primary/90"
          >
            {isGenerating ? (
              <RefreshCw size={16} className="mr-2 animate-spin" />
            ) : (
              <Download size={16} className="mr-2" />
            )}
            Export CSV
          </Button>
          <Button onClick={() => generateReport("pdf")} disabled={isGenerating} variant="outline">
            {isGenerating ? (
              <RefreshCw size={16} className="mr-2 animate-spin" />
            ) : (
              <Download size={16} className="mr-2" />
            )}
            Export PDF
          </Button>
        </div>
      </CardWrapper>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-1">140</div>
          <div className="text-sm text-gray-400">Total Tickets</div>
          <div className="text-xs text-green-400 mt-1">
            <TrendingUp size={12} className="inline mr-1" />
            +12% from last month
          </div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">85%</div>
          <div className="text-sm text-gray-400">Resolution Rate</div>
          <div className="text-xs text-green-400 mt-1">
            <TrendingUp size={12} className="inline mr-1" />
            +5% from last month
          </div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-yellow-400 mb-1">2.4h</div>
          <div className="text-sm text-gray-400">Avg Response Time</div>
          <div className="text-xs text-red-400 mt-1">
            <TrendingUp size={12} className="inline mr-1 rotate-180" />
            -15% from last month
          </div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-purple-400 mb-1">4.8</div>
          <div className="text-sm text-gray-400">Customer Rating</div>
          <div className="text-xs text-green-400 mt-1">
            <TrendingUp size={12} className="inline mr-1" />
            +0.2 from last month
          </div>
        </CardWrapper>
      </div>

      {/* Tickets by Category Bar Chart */}
      <CardWrapper>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Tickets by Category</h3>
          <div className="text-sm text-gray-400">Last 30 days</div>
        </div>

        <div className="space-y-4">
          {ticketsByCategory.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-20 text-sm text-gray-300 text-right">{item.category}</div>
              <div className="flex-1 bg-gray-800 rounded-full h-6 relative overflow-hidden">
                <div
                  className={`h-full ${item.color} transition-all duration-500 ease-out`}
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {item.count} tickets
                </div>
              </div>
              <div className="w-12 text-sm text-gray-400 text-right">{item.count}</div>
            </div>
          ))}
        </div>
      </CardWrapper>

      {/* Recent Ticket Summary Table */}
      <CardWrapper>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Ticket Summary</h3>
          <Button variant="outline" size="sm">
            <FileText size={14} className="mr-2" />
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-400">Ticket ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Client</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Tenant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Priority</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Created</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Resolved</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map((ticket, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <div className="font-mono text-sm text-primary">{ticket.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium max-w-xs truncate">{ticket.title}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">{ticket.client}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-400">{ticket.tenant}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${priorityColors[ticket.priority as keyof typeof priorityColors]}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${statusColors[ticket.status as keyof typeof statusColors]}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-400">{ticket.created}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-400">{ticket.resolved || "-"}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardWrapper>

      {/* Recent Reports */}
      <CardWrapper>
        <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            {
              name: "Monthly Analytics Report - January 2024",
              type: "Analytics",
              generated: "2024-01-28 14:30:00",
              size: "2.3 MB",
              format: "PDF",
            },
            {
              name: "Ticket Summary - Q4 2023",
              type: "Tickets",
              generated: "2024-01-15 09:15:00",
              size: "1.8 MB",
              format: "CSV",
            },
            {
              name: "User Activity Report - December 2023",
              type: "Users",
              generated: "2024-01-01 16:45:00",
              size: "945 KB",
              format: "PDF",
            },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="text-primary" size={20} />
                <div>
                  <div className="font-medium">{report.name}</div>
                  <div className="text-sm text-gray-400">
                    {report.type} • {report.generated} • {report.size}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{report.format}</span>
                <Button size="sm" variant="outline">
                  <Download size={14} className="mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardWrapper>
    </div>
  )
}
