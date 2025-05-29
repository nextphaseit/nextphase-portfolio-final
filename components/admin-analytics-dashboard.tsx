"use client"
import { useState, useEffect } from "react"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  Users,
  Ticket,
  Clock,
  Download,
  RefreshCw,
  Building,
  AlertCircle,
  Activity,
} from "lucide-react"
import { getTenantAnalytics, type TenantAnalytics } from "@/lib/admin-auth"

interface AnalyticsFilters {
  timeRange: "7d" | "30d" | "90d" | "1y"
  tenantId: string | "all"
  category: string | "all"
}

export function AdminAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<TenantAnalytics[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<AnalyticsFilters>({
    timeRange: "30d",
    tenantId: "all",
    category: "all",
  })

  useEffect(() => {
    loadAnalytics()
  }, [filters])

  const loadAnalytics = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const data = getTenantAnalytics()
      setAnalytics(data)
      setIsLoading(false)
    }, 1000)
  }

  const exportReport = async (format: "csv" | "pdf") => {
    // Simulate export
    const filename = `analytics-report-${new Date().toISOString().split("T")[0]}.${format}`
    console.log(`Exporting ${format.toUpperCase()} report: ${filename}`)

    // In a real implementation, this would trigger a download
    alert(`${format.toUpperCase()} report "${filename}" would be downloaded`)
  }

  // Calculate aggregate statistics
  const totalStats = analytics.reduce(
    (acc, tenant) => ({
      totalUsers: acc.totalUsers + tenant.activeUsers,
      totalTickets: acc.totalTickets + tenant.totalTickets,
      openTickets: acc.openTickets + tenant.openTickets,
      resolvedTickets: acc.resolvedTickets + tenant.resolvedTickets,
      avgResolutionTime: (acc.avgResolutionTime * acc.tenantCount + tenant.avgResolutionTime) / (acc.tenantCount + 1),
      tenantCount: acc.tenantCount + 1,
    }),
    {
      totalUsers: 0,
      totalTickets: 0,
      openTickets: 0,
      resolvedTickets: 0,
      avgResolutionTime: 0,
      tenantCount: 0,
    },
  )

  // Get top support categories across all tenants
  const allCategories = analytics.flatMap((tenant) => tenant.supportCategories)
  const categoryTotals = allCategories.reduce(
    (acc, category) => {
      acc[category.category] = (acc[category.category] || 0) + category.count
      return acc
    },
    {} as Record<string, number>,
  )

  const topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-400">Loading analytics data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400">Multi-tenant performance metrics and insights</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Time Range Filter */}
          <select
            value={filters.timeRange}
            onChange={(e) => setFilters({ ...filters, timeRange: e.target.value as any })}
            className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>

          {/* Tenant Filter */}
          <select
            value={filters.tenantId}
            onChange={(e) => setFilters({ ...filters, tenantId: e.target.value })}
            className="px-3 py-2 bg-black border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Tenants</option>
            {analytics.map((tenant) => (
              <option key={tenant.tenantId} value={tenant.tenantId}>
                {tenant.tenantName}
              </option>
            ))}
          </select>

          {/* Export Buttons */}
          <Button onClick={() => exportReport("csv")} variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => exportReport("pdf")} variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export PDF
          </Button>

          {/* Refresh Button */}
          <Button onClick={loadAnalytics} variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Building className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-1">{analytics.length}</div>
          <div className="text-sm text-gray-400">Active Tenants</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">{totalStats.totalUsers}</div>
          <div className="text-sm text-gray-400">Total Users</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Ticket className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-purple-400 mb-1">{totalStats.totalTickets}</div>
          <div className="text-sm text-gray-400">Total Tickets</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-yellow-400 mb-1">{totalStats.openTickets}</div>
          <div className="text-sm text-gray-400">Open Tickets</div>
        </CardWrapper>

        <CardWrapper className="text-center">
          <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="text-orange-400" size={24} />
          </div>
          <div className="text-2xl font-bold text-orange-400 mb-1">{totalStats.avgResolutionTime.toFixed(1)}h</div>
          <div className="text-sm text-gray-400">Avg Resolution</div>
        </CardWrapper>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Support Categories */}
        <CardWrapper>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Top Support Categories</h3>
            <BarChart3 className="text-primary" size={20} />
          </div>
          <div className="space-y-3">
            {topCategories.map(([category, count], index) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-xs font-bold text-primary">
                    {index + 1}
                  </div>
                  <span className="font-medium">{category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${(count / Math.max(...topCategories.map(([, c]) => c))) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardWrapper>

        {/* Tenant Performance */}
        <CardWrapper>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Tenant Performance</h3>
            <TrendingUp className="text-primary" size={20} />
          </div>
          <div className="space-y-3">
            {analytics
              .sort((a, b) => a.avgResolutionTime - b.avgResolutionTime)
              .slice(0, 5)
              .map((tenant) => (
                <div key={tenant.tenantId} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="font-medium">{tenant.tenantName}</div>
                    <div className="text-sm text-gray-400">{tenant.domain}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{tenant.avgResolutionTime.toFixed(1)}h avg</div>
                    <div className="text-xs text-gray-400">{tenant.openTickets} open</div>
                  </div>
                </div>
              ))}
          </div>
        </CardWrapper>
      </div>

      {/* Detailed Tenant Table */}
      <CardWrapper>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tenant Details</h3>
          <Activity className="text-primary" size={20} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-400">Tenant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Users</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Total Tickets</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Open</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Resolved</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Avg Resolution</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((tenant) => (
                <tr key={tenant.tenantId} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{tenant.tenantName}</div>
                      <div className="text-sm text-gray-400">{tenant.domain}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{tenant.activeUsers}</td>
                  <td className="py-3 px-4">{tenant.totalTickets}</td>
                  <td className="py-3 px-4">
                    <span className="text-yellow-400">{tenant.openTickets}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-green-400">{tenant.resolvedTickets}</span>
                  </td>
                  <td className="py-3 px-4">{tenant.avgResolutionTime.toFixed(1)}h</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{tenant.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardWrapper>
    </div>
  )
}
