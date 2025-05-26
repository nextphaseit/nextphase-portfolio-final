"use server"

import { Resend } from "resend"

interface AdminTicketUpdate {
  ticketId: string
  status?: "open" | "in-progress" | "resolved" | "closed"
  assignedTo?: string
  response?: string
  isInternal?: boolean
}

export async function updateTicketStatus(ticketId: string, status: string) {
  try {
    // In a real application, this would update your database
    console.log(`Updating ticket ${ticketId} status to ${status}`)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      message: `Ticket ${ticketId} status updated to ${status}`,
    }
  } catch (error) {
    console.error("Error updating ticket status:", error)
    return {
      success: false,
      message: "Failed to update ticket status",
    }
  }
}

export async function assignTicket(ticketId: string, assignee: string) {
  try {
    console.log(`Assigning ticket ${ticketId} to ${assignee}`)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      message: `Ticket ${ticketId} assigned to ${assignee}`,
    }
  } catch (error) {
    console.error("Error assigning ticket:", error)
    return {
      success: false,
      message: "Failed to assign ticket",
    }
  }
}

export async function addTicketResponse(ticketId: string, message: string, isInternal = false) {
  try {
    console.log(`Adding response to ticket ${ticketId}`)

    // In a real application, this would:
    // 1. Save the response to your database
    // 2. Send email notification to client (if not internal)
    // 3. Update ticket status if needed

    if (!isInternal && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)

      // Send email notification to client
      await resend.emails.send({
        from: "NextPhase IT Support <support@nextphaseit.org>",
        to: ["client@example.com"], // This would come from the ticket data
        subject: `Update on Support Ticket #${ticketId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Support Ticket Update</h2>
            <p>We have an update on your support ticket #${ticketId}:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            <p>You can view the full conversation and respond in your <a href="https://nextphaseit.org/portal">client portal</a>.</p>
            <p>Best regards,<br>NextPhase IT Support Team</p>
          </div>
        `,
      })
    }

    return {
      success: true,
      message: "Response added successfully",
    }
  } catch (error) {
    console.error("Error adding ticket response:", error)
    return {
      success: false,
      message: "Failed to add response",
    }
  }
}
