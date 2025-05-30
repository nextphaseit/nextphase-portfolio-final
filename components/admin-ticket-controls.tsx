"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TicketStatusBadge, type TicketStatus } from "@/components/ticket-status"
import { useToast } from "@/components/ui/toast"
import { updateTicketStatus, assignTicket, addTicketResponse } from "@/app/actions/admin-ticket"
import { User, MessageSquare, Clock, CheckCircle, AlertCircle, Loader2, Save } from "lucide-react"

interface AdminTicketControlsProps {
  ticketId: string
  currentStatus: TicketStatus
  assignedTo?: string
  onStatusChange?: (newStatus: TicketStatus) => void
  onAssignmentChange?: (assignee: string) => void
  className?: string
}

const statusTransitions: Record<TicketStatus, TicketStatus[]> = {
  open: ["in-progress", "on-hold", "closed"],
  "in-progress": ["resolved", "on-hold", "open"],
  resolved: ["closed", "in-progress"],
  closed: ["open"],
  "on-hold": ["open", "in-progress"],
}

const teamMembers = [
  { id: "unassigned", name: "Unassigned", email: "" },
  { id: "sarah.johnson", name: "Sarah Johnson", email: "sarah@nextphaseit.org" },
  { id: "alex.rodriguez", name: "Alex Rodriguez", email: "alex@nextphaseit.org" },
  { id: "david.kim", name: "David Kim", email: "david@nextphaseit.org" },
  { id: "lisa.wang", name: "Lisa Wang", email: "lisa@nextphaseit.org" },
]

export function AdminTicketControls({
  ticketId,
  currentStatus,
  assignedTo = "unassigned",
  onStatusChange,
  onAssignmentChange,
  className = "",
}: AdminTicketControlsProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>(currentStatus)
  const [selectedAssignee, setSelectedAssignee] = useState(assignedTo)
  const [internalNote, setInternalNote] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const { addToast } = useToast()

  const handleStatusUpdate = async () => {
    if (selectedStatus === currentStatus) return

    setIsUpdating(true)
    try {
      const result = await updateTicketStatus(ticketId, selectedStatus)

      if (result.success) {
        addToast({
          type: "success",
          title: "Status Updated",
          description: result.message,
        })
        onStatusChange?.(selectedStatus)
      } else {
        addToast({
          type: "error",
          title: "Update Failed",
          description: result.message,
        })
        setSelectedStatus(currentStatus) // Revert
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Update Failed",
        description: "An unexpected error occurred",
      })
      setSelectedStatus(currentStatus) // Revert
    } finally {
      setIsUpdating(false)
    }
  }

  const handleAssignmentUpdate = async () => {
    if (selectedAssignee === assignedTo) return

    setIsUpdating(true)
    try {
      const assigneeName = teamMembers.find((m) => m.id === selectedAssignee)?.name || "Unassigned"
      const result = await assignTicket(ticketId, assigneeName)

      if (result.success) {
        addToast({
          type: "success",
          title: "Assignment Updated",
          description: result.message,
        })
        onAssignmentChange?.(selectedAssignee)
      } else {
        addToast({
          type: "error",
          title: "Assignment Failed",
          description: result.message,
        })
        setSelectedAssignee(assignedTo) // Revert
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Assignment Failed",
        description: "An unexpected error occurred",
      })
      setSelectedAssignee(assignedTo) // Revert
    } finally {
      setIsUpdating(false)
    }
  }

  const handleAddInternalNote = async () => {
    if (!internalNote.trim()) return

    setIsAddingNote(true)
    try {
      const result = await addTicketResponse(ticketId, internalNote, true)

      if (result.success) {
        addToast({
          type: "success",
          title: "Internal Note Added",
          description: "Note has been added to the ticket",
        })
        setInternalNote("")
      } else {
        addToast({
          type: "error",
          title: "Failed to Add Note",
          description: result.message,
        })
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Failed to Add Note",
        description: "An unexpected error occurred",
      })
    } finally {
      setIsAddingNote(false)
    }
  }

  const availableStatuses = statusTransitions[currentStatus] || []

  return (
    <div className={`space-y-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="text-orange-400" size={20} />
        <h3 className="text-lg font-semibold">Admin Controls</h3>
      </div>

      {/* Current Status Display */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Current Status</label>
          <TicketStatusBadge status={currentStatus} size="lg" />
        </div>

        {/* Status Change */}
        {availableStatuses.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Change Status To</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {availableStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`transition-all ${selectedStatus === status ? "ring-2 ring-primary" : "hover:scale-105"}`}
                  disabled={isUpdating}
                >
                  <TicketStatusBadge status={status} />
                </button>
              ))}
            </div>
            {selectedStatus !== currentStatus && (
              <Button
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={14} />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2" size={14} />
                    Update Status
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Assignment */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">Assigned To</label>
        <div className="flex items-center gap-3">
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            disabled={isUpdating}
            className="flex-1 px-3 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
          {selectedAssignee !== assignedTo && (
            <Button onClick={handleAssignmentUpdate} disabled={isUpdating} size="sm" variant="outline">
              {isUpdating ? <Loader2 className="animate-spin" size={14} /> : <User size={14} />}
            </Button>
          )}
        </div>
      </div>

      {/* Internal Notes */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">Add Internal Note</label>
        <textarea
          value={internalNote}
          onChange={(e) => setInternalNote(e.target.value)}
          placeholder="Add internal notes that won't be visible to the client..."
          rows={3}
          className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary resize-vertical"
        />
        <Button
          onClick={handleAddInternalNote}
          disabled={isAddingNote || !internalNote.trim()}
          size="sm"
          variant="outline"
        >
          {isAddingNote ? (
            <>
              <Loader2 className="animate-spin mr-2" size={14} />
              Adding...
            </>
          ) : (
            <>
              <MessageSquare className="mr-2" size={14} />
              Add Internal Note
            </>
          )}
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-gray-700">
        <label className="block text-sm font-medium text-gray-300 mb-3">Quick Actions</label>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedStatus("in-progress")}
            size="sm"
            variant="outline"
            disabled={currentStatus === "in-progress"}
          >
            <Clock className="mr-1" size={12} />
            Start Work
          </Button>
          <Button
            onClick={() => setSelectedStatus("resolved")}
            size="sm"
            variant="outline"
            disabled={currentStatus === "resolved" || currentStatus === "closed"}
          >
            <CheckCircle className="mr-1" size={12} />
            Mark Resolved
          </Button>
          <Button
            onClick={() => setSelectedStatus("on-hold")}
            size="sm"
            variant="outline"
            disabled={currentStatus === "on-hold"}
          >
            <AlertCircle className="mr-1" size={12} />
            Put On Hold
          </Button>
        </div>
      </div>
    </div>
  )
}
