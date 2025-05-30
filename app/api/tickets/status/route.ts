"use server"

import { type NextRequest, NextResponse } from "next/server"

// Mock data - in production, this would query your database/SharePoint
const mockTicketData = {
  "TK-001234": {
    status: "in-progress",
    lastUpdate: "2024-01-15T14:30:00Z",
    newResponses: 1,
  },
  "TK-001235": {
    status: "resolved",
    lastUpdate: "2024-01-15T13:45:00Z",
    newResponses: 0,
  },
  "TK-001236": {
    status: "closed",
    lastUpdate: "2024-01-14T16:20:00Z",
    newResponses: 0,
  },
}

export async function POST(request: NextRequest) {
  try {
    const { ticketIds } = await request.json()

    if (!Array.isArray(ticketIds)) {
      return NextResponse.json({ error: "ticketIds must be an array" }, { status: 400 })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In production, you would:
    // 1. Query your database for ticket updates
    // 2. Check SharePoint list for status changes
    // 3. Return real-time data

    const updates = ticketIds.map((ticketId) => ({
      ticketId,
      status: mockTicketData[ticketId]?.status || "open",
      lastUpdate: mockTicketData[ticketId]?.lastUpdate || new Date().toISOString(),
      newResponses: mockTicketData[ticketId]?.newResponses || 0,
    }))

    return NextResponse.json(updates)
  } catch (error) {
    console.error("Error fetching ticket status:", error)
    return NextResponse.json({ error: "Failed to fetch ticket status" }, { status: 500 })
  }
}
