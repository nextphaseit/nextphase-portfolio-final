"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Download, RefreshCw, Activity, Filter } from "lucide-react"
import { getAuditLog, type AuditLogEntry } from "@/lib/admin-auth"

export default function AdminAuditModule() {
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    action: "all",
    resource: "all",
    userId: "all",
    dateRange: "7d",
  })

  useEffect(() => {
    loadAuditLog()
  }, [filters])

  const loadAuditLog = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const data = getAuditLog()
      setAuditLog(data)
      setIsLoading(false)
    }, 1000)
  }

  const exportAuditLog = () => {
    const filename = `audit-log-${new Date().toISOString().split("T")[0]}.csv`
    console.log(`Exporting audit log: ${filename}`)
    alert(`Audit log "${filename}" would be downloaded`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Audit Log</h2>
          <p className="text-gray-400">Track all administrative actions and changes</p>
        </div>
        <Button onClick={exportAuditLog} variant="outline">
          <Download size={16} className="mr-2" />
          Export Log
        </Button>
      </div>

      {/* Filters */}
      <CardWrapper>
        <div className="flex items-center gap-3 mb-4">
          <Filter className="text-primary" size={20} />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Action</label>
            <select
              value={filters.action}
              onChange={(e) => setFilters({ ...filters, action: e.target.value })}
              className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="all">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="VIEW">View</option>
              <option value="EXPORT">Export</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Resource</label>
            <select
              value={filters.resource}
              onChange={(e) => setFilters({ ...filters, resource: e.target.value })}
              className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="all">All Resources</option>
              <option value="tenant_settings">Tenant Settings</option>
              <option value="user_account">User Accounts</option>
              <option value="analytics_report">Analytics Reports</option>
              <option value="notification_settings">Notifications</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Time Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button onClick={loadAuditLog} variant="outline">
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardWrapper>

      {/* Audit Log Table */}
      <CardWrapper>
        <div className="flex items-center gap-3 mb-4">
          <Activity className="text-primary" size={20} />
          <h3 className="text-lg font-semibold">Audit Entries</h3>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-gray-400">Loading audit log...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Timestamp</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Action</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Resource</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Details</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-sm">{entry.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{entry.userName}</div>
                      <div className="text-sm text-gray-400">{entry.userId}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          entry.action === "CREATE"
                            ? "bg-green-500/20 text-green-400"
                            : entry.action === "UPDATE"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : entry.action === "DELETE"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {entry.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{entry.resource}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 max-w-xs truncate">{entry.details}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{entry.ipAddress}</td>
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
