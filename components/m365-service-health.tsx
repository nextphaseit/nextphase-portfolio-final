"use client"

import { useState, useEffect } from "react"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, AlertCircle, ExternalLink, RefreshCw, Settings } from "lucide-react"

interface ServiceHealthItem {
  id: string
  title: string
  service: string
  status:
    | "investigating"
    | "service-degradation"
    | "service-interruption"
    | "restoring-service"
    | "resolved"
    | "advisory"
  description: string
  startTime: string
  lastUpdated: string
  impactedFeatures?: string[]
  classification: "incident" | "advisory"
  severity: "high" | "medium" | "low"
}

interface M365ServiceHealthProps {
  className?: string
  maxItems?: number
  showHeader?: boolean
}

const getStatusConfig = (status: ServiceHealthItem["status"]) => {
  switch (status) {
    case "investigating":
      return {
        color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        icon: <AlertTriangle size={16} />,
        label: "Investigating",
      }
    case "service-degradation":
      return {
        color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        icon: <AlertCircle size={16} />,
        label: "Service Degradation",
      }
    case "service-interruption":
      return {
        color: "bg-red-500/20 text-red-400 border-red-500/30",
        icon: <AlertCircle size={16} />,
        label: "Service Interruption",
      }
    case "restoring-service":
      return {
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        icon: <Clock size={16} />,
        label: "Restoring Service",
      }
    case "resolved":
      return {
        color: "bg-green-500/20 text-green-400 border-green-500/30",
        icon: <CheckCircle size={16} />,
        label: "Resolved",
      }
    case "advisory":
      return {
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        icon: <AlertCircle size={16} />,
        label: "Advisory",
      }
    default:
      return {
        color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        icon: <AlertCircle size={16} />,
        label: "Unknown",
      }
  }
}

const getSeverityColor = (severity: ServiceHealthItem["severity"]) => {
  switch (severity) {
    case "high":
      return "text-red-400"
    case "medium":
      return "text-yellow-400"
    case "low":
      return "text-green-400"
    default:
      return "text-gray-400"
  }
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`
  } else {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
}

export function M365ServiceHealth({ className = "", maxItems = 5, showHeader = true }: M365ServiceHealthProps) {
  const [serviceHealth, setServiceHealth] = useState<ServiceHealthItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  // Fetch service health data
  const fetchServiceHealth = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Fetching M365 service health from API...")
      const response = await fetch("/api/m365-service-health")

      if (response.ok) {
        const data = await response.json()

        if (data.fallback) {
          if (
            data.permissionError ||
            data.errorDetails?.includes("403") ||
            data.errorDetails?.includes("UnknownError")
          ) {
            setError("Microsoft Graph API permissions need to be configured for real-time data")
          } else if (data.errorDetails?.includes("invalid_client")) {
            setError("Microsoft Graph API authentication failed - please check credentials")
          } else {
            setError("Using demonstration data - real-time data temporarily unavailable")
          }
        }

        setServiceHealth(data.value || [])
        setIsDemo(data.source === "demo-data")
        console.log(`Loaded ${data.value?.length || 0} service health items (source: ${data.source})`)
      } else {
        throw new Error(`API returned ${response.status}`)
      }

      setLastRefresh(new Date())
    } catch (err) {
      console.error("Error fetching service health:", err)
      setError("Microsoft Graph API permissions need configuration - showing demo data")

      // Set demo data when there's an error
      setServiceHealth([
        {
          id: "DEMO_001",
          title: "Service health monitoring active",
          service: "Microsoft Graph API",
          status: "advisory",
          description:
            "Service health monitoring is active and ready to display real-time Microsoft 365 service status. Currently showing demonstration data while API permissions are being configured.",
          startTime: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          impactedFeatures: ["Service health monitoring"],
          classification: "advisory",
          severity: "low",
        },
      ])
      setIsDemo(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial load and periodic refresh
  useEffect(() => {
    fetchServiceHealth()

    // Refresh every 5 minutes
    const interval = setInterval(fetchServiceHealth, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  // Filter and limit items
  const displayItems = serviceHealth
    .filter((item) => item.status !== "resolved") // Hide resolved items by default
    .slice(0, maxItems)

  const activeIncidents = serviceHealth.filter(
    (item) => item.classification === "incident" && item.status !== "resolved",
  ).length

  const advisories = serviceHealth.filter(
    (item) => item.classification === "advisory" && item.status !== "resolved",
  ).length

  return (
    <div className={className}>
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">Microsoft 365 Service Health</h2>
            <div className="flex items-center gap-2 text-sm">
              {isDemo && <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">Demo Mode</span>}
              {activeIncidents > 0 && (
                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                  {activeIncidents} Active Issue{activeIncidents !== 1 ? "s" : ""}
                </span>
              )}
              {advisories > 0 && (
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                  {advisories} Advisor{advisories !== 1 ? "ies" : "y"}
                </span>
              )}
              {activeIncidents === 0 && advisories === 0 && !isDemo && (
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                  All Services Operational
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Last updated: {formatTimestamp(lastRefresh.toISOString())}</span>
            <Button size="sm" variant="ghost" onClick={fetchServiceHealth} disabled={isLoading} className="h-8 w-8 p-0">
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-yellow-400" />
            <p className="text-yellow-400 text-sm">{error}</p>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            <p>The Microsoft Graph API requires specific permissions to access service health data.</p>
            <p>Contact your administrator to configure the necessary API permissions.</p>
          </div>
          <div className="mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open("/debug/graph", "_blank")}
              className="text-xs mr-2"
            >
              <Settings size={12} className="mr-1" />
              Check API Setup
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                window.open(
                  "https://docs.microsoft.com/en-us/graph/permissions-reference#servicehealth-permissions",
                  "_blank",
                )
              }
              className="text-xs"
            >
              <ExternalLink size={12} className="mr-1" />
              View Required Permissions
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {displayItems.length === 0 ? (
          <CardWrapper className="text-center py-8 bg-green-500/5 border-green-500/20">
            <CheckCircle size={48} className="mx-auto mb-3 text-green-400" />
            <h3 className="font-semibold text-green-400 mb-2">All Services Operational</h3>
            <p className="text-gray-400 text-sm">No current issues or advisories for Microsoft 365 services.</p>
          </CardWrapper>
        ) : (
          displayItems.map((item) => {
            const statusConfig = getStatusConfig(item.status)
            const severityColor = getSeverityColor(item.severity)

            return (
              <CardWrapper key={item.id} className="hover:border-primary/40 transition-colors">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-primary">{statusConfig.icon}</div>
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-400">{item.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs border ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                    <span className={`text-xs font-medium ${severityColor}`}>{item.severity.toUpperCase()}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">{item.description}</p>

                {/* Impacted Features */}
                {item.impactedFeatures && item.impactedFeatures.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Impacted features:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.impactedFeatures.map((feature, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-700">
                  <div className="flex items-center gap-4">
                    <span>ID: {item.id}</span>
                    <span>Started: {formatTimestamp(item.startTime)}</span>
                    <span>Updated: {formatTimestamp(item.lastUpdated)}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs"
                    onClick={() =>
                      window.open(
                        `https://admin.microsoft.com/Adminportal/Home#/servicehealth/:/alerts/${item.id}`,
                        "_blank",
                      )
                    }
                  >
                    <ExternalLink size={12} className="mr-1" />
                    View Details
                  </Button>
                </div>
              </CardWrapper>
            )
          })
        )}
      </div>

      {/* View All Link */}
      <div className="mt-4 text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open("https://admin.microsoft.com/Adminportal/Home#/servicehealth", "_blank")}
        >
          <ExternalLink size={14} className="mr-2" />
          View Microsoft 365 Admin Center
        </Button>
      </div>
    </div>
  )
}
