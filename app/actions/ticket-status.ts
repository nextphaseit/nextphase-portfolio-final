"use server"

import { Resend } from "resend"

interface StatusUpdateData {
  ticketId: string
  newStatus: string
  updatedBy: string
  notes?: string
  isInternal?: boolean
}

// Trigger Power Automate workflow for status updates
async function triggerStatusUpdateWorkflow(updateData: StatusUpdateData) {
  try {
    const webhookUrl = process.env.POWER_AUTOMATE_WEBHOOK_URL

    if (!webhookUrl) {
      console.log("Power Automate webhook URL not configured")
      return { success: false, message: "Workflow not configured" }
    }

    const payload = {
      action: "status_update",
      ticketId: updateData.ticketId,
      newStatus: updateData.newStatus,
      updatedBy: updateData.updatedBy,
      notes: updateData.notes,
      isInternal: updateData.isInternal,
      timestamp: new Date().toISOString(),
    }

    console.log("Triggering status update workflow:", payload)

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      console.log("Status update workflow triggered successfully")
      return { success: true, message: "Status updated in SharePoint" }
    } else {
      console.error("Failed to trigger status update workflow:", response.status)
      return { success: false, message: "Failed to update SharePoint" }
    }
  } catch (error) {
    console.error("Error triggering status update workflow:", error)
    return { success: false, message: "Workflow error" }
  }
}

// Send status update notification email
async function sendStatusUpdateNotification(updateData: StatusUpdateData) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log("Email service not configured")
      return
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Don't send email for internal notes
    if (updateData.isInternal) {
      return
    }

    const statusMessages = {
      open: "Your ticket has been reopened and is awaiting review.",
      "in-progress": "Our team has started working on your ticket.",
      resolved: "Your issue has been resolved. Please review and confirm.",
      closed: "Your ticket has been completed and closed.",
      "on-hold": "Your ticket is temporarily on hold pending additional information.",
    }

    const message =
      statusMessages[updateData.newStatus as keyof typeof statusMessages] ||
      `Your ticket status has been updated to ${updateData.newStatus}.`

    await resend.emails.send({
      from: "NextPhase IT Support <support@nextphaseit.org>",
      to: ["client@example.com"], // This would come from ticket data
      subject: `Ticket #${updateData.ticketId} Status Update`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Ticket Status Update</h2>
          <p>Your support ticket #${updateData.ticketId} has been updated:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>New Status:</strong> ${updateData.newStatus.toUpperCase()}</p>
            <p>${message}</p>
            ${updateData.notes ? `<p><strong>Notes:</strong> ${updateData.notes}</p>` : ""}
          </div>
          <p>You can view the full details in your <a href="https://nextphaseit.org/portal">client portal</a>.</p>
          <p>Best regards,<br>NextPhase IT Support Team</p>
        </div>
      `,
    })

    console.log("Status update notification sent")
  } catch (error) {
    console.error("Failed to send status update notification:", error)
  }
}

export async function updateTicketStatusWithWorkflow(
  ticketId: string,
  newStatus: string,
  updatedBy = "System",
  notes?: string,
  isInternal = false,
) {
  try {
    console.log(`Updating ticket ${ticketId} status to ${newStatus}`)

    const updateData: StatusUpdateData = {
      ticketId,
      newStatus,
      updatedBy,
      notes,
      isInternal,
    }

    // Trigger Power Automate workflow
    const workflowResult = await triggerStatusUpdateWorkflow(updateData)

    // Send notification email (if not internal)
    if (!isInternal) {
      await sendStatusUpdateNotification(updateData)
    }

    // Log the update
    console.log("Ticket status update completed:", {
      ticketId,
      newStatus,
      updatedBy,
      workflowSuccess: workflowResult.success,
      timestamp: new Date().toISOString(),
    })

    return {
      success: true,
      message: `Ticket ${ticketId} status updated to ${newStatus}`,
      workflowResult,
    }
  } catch (error) {
    console.error("Error updating ticket status:", error)
    return {
      success: false,
      message: "Failed to update ticket status",
    }
  }
}
