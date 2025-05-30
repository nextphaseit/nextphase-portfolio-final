"use client"
import { Clock, CheckCircle, AlertCircle, Pause } from "lucide-react"

export type TicketStatus = "open" | "in-progress" | "resolved" | "closed" | "on-hold"

interface TicketStatusProps {
  status: TicketStatus
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  className?: string
}

const statusConfig = {
  open: {
    label: "Open",
    icon: AlertCircle,
    colors: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    description: "Ticket has been submitted and is awaiting review",
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    colors: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    description: "Our team is actively working on this ticket",
  },
  resolved: {
    label: "Resolved",
    icon: CheckCircle,
    colors: "bg-green-500/20 text-green-400 border-green-500/30",
    description: "Issue has been resolved and is awaiting confirmation",
  },
  closed: {
    label: "Closed",
    icon: CheckCircle,
    colors: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    description: "Ticket has been completed and closed",
  },
  "on-hold": {
    label: "On Hold",
    icon: Pause,
    colors: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    description: "Ticket is temporarily on hold pending additional information",
  },
}

export function TicketStatusBadge({ status, size = "md", showIcon = true, className = "" }: TicketStatusProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  }

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${config.colors} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && <Icon size={iconSizes[size]} />}
      <span>{config.label}</span>
    </div>
  )
}

export function TicketStatusTimeline({
  currentStatus,
  statusHistory,
}: {
  currentStatus: TicketStatus
  statusHistory?: Array<{ status: TicketStatus; timestamp: string; updatedBy?: string }>
}) {
  const statusOrder: TicketStatus[] = ["open", "in-progress", "resolved", "closed"]
  const currentIndex = statusOrder.indexOf(currentStatus)

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-sm">Status Timeline</h4>
      <div className="space-y-3">
        {statusOrder.map((status, index) => {
          const config = statusConfig[status]
          const Icon = config.icon
          const isCompleted = index <= currentIndex
          const isCurrent = index === currentIndex

          return (
            <div key={status} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  isCompleted
                    ? isCurrent
                      ? config.colors.replace("/20", "/30").replace("/30", "/50")
                      : "bg-green-500/20 border-green-500/30 text-green-400"
                    : "bg-gray-500/20 border-gray-500/30 text-gray-500"
                }`}
              >
                <Icon size={14} />
              </div>
              <div className="flex-1">
                <div className={`font-medium text-sm ${isCompleted ? "text-white" : "text-gray-500"}`}>
                  {config.label}
                </div>
                <div className={`text-xs ${isCompleted ? "text-gray-400" : "text-gray-600"}`}>{config.description}</div>
              </div>
              {isCurrent && <div className="text-xs text-primary font-medium">Current</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { statusConfig }
