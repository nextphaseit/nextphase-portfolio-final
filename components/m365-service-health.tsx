"use client"

import { useState, useEffect } from "react"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, AlertCircle, ExternalLink, RefreshCw } from "lucide-react"

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

// Static fallback data for Microsoft 365 service health
const staticServiceHealth: ServiceHealthItem[] = [
  {
    id: "MO123456",
    title: "Some users may be unable to access Exchange Online",
    service: "Exchange Online",
    status: "investigating",
    description:
      "We're investigating reports that some users may be unable to access Exchange Online mailboxes. Users may experience delays in email delivery or inability to connect to their mailbox.",
    startTime: "2024-01-26T14:30:00Z",
    lastUpdated: "2024-01-26T15:45:00Z",
    impactedFeatures: ["Email access", "Outlook Web App", "Mobile email"],
    classification: "incident",
    severity: "high",
  },
  {
    id: "MO123457",
    title: "SharePoint Online performance issues",
    service: "SharePoint Online",
    status: "service-degradation",
    description:
      "Users may experience slow performance when accessing SharePoint Online sites and OneDrive for Business. File uploads and downloads may take longer than expected.",
    startTime: "2024-01-26T13:15:00Z",
    lastUpdated: "2024-01-26T15:30:00Z",
    impactedFeatures: ["Site access", "File operations", "OneDrive sync"],
    classification: "incident",
    severity: "medium",
  },
  {
    id: "MO123458",
    title: "Microsoft Teams - Planned maintenance",
    service: "Microsoft Teams",
    status: "advisory",
    description:
      "Scheduled maintenance for Microsoft Teams infrastructure. Users may experience brief interruptions in service during the maintenance window.",
    startTime: "2024-01-27T02:00:00Z",
    lastUpdated: "2024-01-26T12:00:00Z",
    impactedFeatures: ["Chat", "Meetings", "File sharing"],
    classification: "advisory",
    severity: "low",
  },
]

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
  const [serviceHealth, setServiceHealth] = useState<ServiceHealthItem[]>(staticServiceHealth)
  const [isLoading, setIsLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [error, setError] = useState<string | null>(null)

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
          setError("Using fallback data - real-time data temporarily unavailable")
        }

        setServiceHealth(data.value || [])
        console.log(`Loaded ${data.value?.length || 0} service health items`)
      } else {
        throw new Error(`API returned ${response.status}`)
      }

      setLastRefresh(new Date())
    } catch (err) {
      console.error("Error fetching service health:", err)
      setError("Unable to fetch service health data")
      // Use static data as fallback
      setServiceHealth(staticServiceHealth)
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
              {activeIncidents === 0 && advisories === 0 && (
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
          <p className="text-yellow-400 text-sm">{error}</p>
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
      {serviceHealth.length > maxItems && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("https://admin.microsoft.com/Adminportal/Home#/servicehealth", "_blank")}
          >
            <ExternalLink size={14} className="mr-2" />
            View All Service Health Issues
          </Button>
        </div>
      )}
    </div>
  )
}
