"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useToast } from "@/components/ui/toast"

interface TicketUpdate {
  ticketId: string
  status: string
  lastUpdate: string
  newResponses?: number
}

interface UseTicketPollingOptions {
  ticketIds: string[]
  interval?: number
  enabled?: boolean
}

export function useTicketPolling({ ticketIds, interval = 30000, enabled = true }: UseTicketPollingOptions) {
  const [updates, setUpdates] = useState<Record<string, TicketUpdate>>({})
  const [isPolling, setIsPolling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const { addToast } = useToast()
  const lastKnownStatus = useRef<Record<string, string>>({})

  const checkForUpdates = useCallback(async () => {
    if (!enabled || ticketIds.length === 0) return

    try {
      setIsPolling(true)
      setError(null)

      // In a real implementation, this would call your API
      const response = await fetch("/api/tickets/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketIds }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch ticket updates")
      }

      const ticketUpdates: TicketUpdate[] = await response.json()

      const updatesMap: Record<string, TicketUpdate> = {}

      ticketUpdates.forEach((update) => {
        updatesMap[update.ticketId] = update

        // Check if status changed
        const previousStatus = lastKnownStatus.current[update.ticketId]
        if (previousStatus && previousStatus !== update.status) {
          addToast({
            type: "info",
            title: "Ticket Status Updated",
            description: `Ticket #${update.ticketId} status changed to ${update.status}`,
            duration: 8000,
          })
        }

        lastKnownStatus.current[update.ticketId] = update.status
      })

      setUpdates(updatesMap)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      console.error("Ticket polling error:", err)
    } finally {
      setIsPolling(false)
    }
  }, [ticketIds, enabled, addToast])

  const startPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Initial check
    checkForUpdates()

    // Set up interval
    intervalRef.current = setInterval(checkForUpdates, interval)
  }, [checkForUpdates, interval])

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
  }, [])

  useEffect(() => {
    if (enabled && ticketIds.length > 0) {
      startPolling()
    } else {
      stopPolling()
    }

    return stopPolling
  }, [enabled, ticketIds, startPolling, stopPolling])

  return {
    updates,
    isPolling,
    error,
    refresh: checkForUpdates,
    startPolling,
    stopPolling,
  }
}
