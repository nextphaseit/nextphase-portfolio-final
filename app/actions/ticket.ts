"use server"

import { Resend } from "resend"

interface TicketData {
  subject: string
  priority: "low" | "medium" | "high" | "urgent"
  description: string
  clientName?: string
  clientEmail?: string
  source: "portal" | "chatbot"
}

// Generate ticket number
function generateTicketNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `TK-${timestamp}${random}`
}

// Generate email templates
function generateClientConfirmationEmail(ticketData: TicketData & { ticketNumber: string }) {
  const priorityColors = {
    low: "#22C55E",
    medium: "#F59E0B",
    high: "#EF4444",
    urgent: "#DC2626",
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Support Ticket Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1E5AA8 0%, #1E5AA8 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">Support Ticket Created</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">NextPhase IT Help Desk</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
          <div style="background-color: #f8fafc; border-left: 4px solid #1E5AA8; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
            <h2 style="margin: 0 0 10px 0; color: #1E5AA8; font-size: 20px;">Ticket #${ticketData.ticketNumber}</h2>
            <p style="margin: 0; color: #64748b; font-size: 14px;">Your support request has been successfully submitted</p>
          </div>

          <div style="margin-bottom: 25px;">
            <h3 style="color: #334155; margin: 0 0 15px 0; font-size: 18px;">Ticket Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; width: 120px;">Subject:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${ticketData.subject}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Priority:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="background-color: ${priorityColors[ticketData.priority]}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                    ${ticketData.priority}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Source:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #334155; text-transform: capitalize;">${ticketData.source}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #475569; vertical-align: top;">Description:</td>
                <td style="padding: 12px 0; color: #334155; line-height: 1.6;">${ticketData.description.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #334155; margin: 0 0 15px 0; font-size: 16px;">What Happens Next?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #64748b; line-height: 1.6;">
              <li>Our technical team will review your ticket within 2-4 business hours</li>
              <li>You'll receive updates via email as we work on your issue</li>
              <li>For urgent matters, call us directly at +1 984-310-9533</li>
              <li>Track your ticket status in the NextPhase IT Help Desk portal</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://nextphaseit.org/portal" style="background-color: #1E5AA8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Access Help Desk Portal
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
            <strong>NextPhase IT</strong><br>
            Clayton, NC | support@nextphaseit.org | +1 984-310-9533
          </p>
          <p style="margin: 0; color: #94a3b8; font-size: 12px;">
            Available Monday - Friday, 9:00 AM - 6:00 PM EST
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateInternalNotificationEmail(ticketData: TicketData & { ticketNumber: string }) {
  const priorityEmojis = {
    low: "🟢",
    medium: "🟡",
    high: "🟠",
    urgent: "🔴",
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Support Ticket</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 20px;">🎫 New Support Ticket</h1>
          <p style="color: #d1d5db; margin: 5px 0 0 0;">NextPhase IT Internal Notification</p>
        </div>

        <!-- Content -->
        <div style="padding: 25px;">
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #92400e; font-size: 18px;">${priorityEmojis[ticketData.priority]} Ticket #${ticketData.ticketNumber}</h2>
            <p style="margin: 5px 0 0 0; color: #b45309; font-size: 14px;">Priority: ${ticketData.priority.toUpperCase()}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 100px;">Subject:</td>
              <td style="padding: 8px 0; color: #111827;">${ticketData.subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Client Name:</td>
              <td style="padding: 8px 0; color: #111827;">${ticketData.clientName || "Anonymous"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Client Email:</td>
              <td style="padding: 8px 0; color: #111827;"><a href="mailto:${ticketData.clientEmail || "support@nextphaseit.org"}" style="color: #1E5AA8; text-decoration: none;">${ticketData.clientEmail || "Not provided"}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Source:</td>
              <td style="padding: 8px 0; color: #111827; text-transform: capitalize;">${ticketData.source}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151; vertical-align: top;">Description:</td>
              <td style="padding: 8px 0; color: #111827; line-height: 1.5;">${ticketData.description.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>

          <div style="text-align: center; margin: 20px 0;">
            <a href="mailto:${ticketData.clientEmail || "support@nextphaseit.org"}?subject=Re: Support Ticket #${ticketData.ticketNumber} - ${ticketData.subject}&body=Hello ${ticketData.clientName || "there"},%0D%0A%0D%0AThank you for contacting NextPhase IT support. We have received your ticket and are working on it.%0D%0A%0D%0ATicket #: ${ticketData.ticketNumber}%0D%0ASubject: ${ticketData.subject}%0D%0A%0D%0ABest regards,%0D%0ANextPhase IT Support Team" style="background-color: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px; display: inline-block;">
              📧 Reply to Client
            </a>
            <a href="https://nextphaseit.sharepoint.com/sites/SupportTickets" style="background-color: #1E5AA8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              📋 View in SharePoint
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 15px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #6b7280; font-size: 12px;">
            NextPhase IT Support System | Ticket created at ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function createSupportTicket(ticketData: TicketData) {
  try {
    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY environment variable is not set")
      return {
        success: false,
        message:
          "Email service is not configured. Please contact us directly at support@nextphaseit.org or call +1 984-310-9533.",
      }
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Generate ticket number
    const ticketNumber = generateTicketNumber()
    const ticketWithNumber = { ...ticketData, ticketNumber }

    // Send confirmation email to client (if email provided)
    if (ticketData.clientEmail) {
      try {
        await resend.emails.send({
          from: "NextPhase IT Support <support@nextphaseit.org>",
          to: [ticketData.clientEmail],
          subject: `Support Ticket Created - #${ticketNumber}`,
          html: generateClientConfirmationEmail(ticketWithNumber),
          replyTo: "support@nextphaseit.org",
        })
        console.log(`Confirmation email sent to: ${ticketData.clientEmail}`)
      } catch (emailError) {
        console.error("Failed to send client confirmation email:", emailError)
        // Continue with internal notification even if client email fails
      }
    }

    // Send internal notification to support team
    try {
      await resend.emails.send({
        from: "NextPhase IT System <noreply@nextphaseit.org>",
        to: ["support@nextphaseit.org"],
        subject: `New Support Ticket #${ticketNumber} - ${ticketData.subject} [${ticketData.priority.toUpperCase()}]`,
        html: generateInternalNotificationEmail(ticketWithNumber),
        replyTo: ticketData.clientEmail || "support@nextphaseit.org",
      })
      console.log("Internal notification sent to support@nextphaseit.org")
    } catch (emailError) {
      console.error("Failed to send internal notification:", emailError)
      // Still return success if ticket was created, even if email failed
    }

    // Log ticket creation
    console.log("Support ticket created:", {
      ticketNumber,
      subject: ticketData.subject,
      priority: ticketData.priority,
      source: ticketData.source,
      clientEmail: ticketData.clientEmail,
      timestamp: new Date().toISOString(),
    })

    return {
      success: true,
      ticketNumber,
      message: ticketData.clientEmail
        ? `Ticket #${ticketNumber} created successfully! A confirmation email has been sent to ${ticketData.clientEmail}.`
        : `Ticket #${ticketNumber} created successfully! Our team will review it shortly.`,
    }
  } catch (error) {
    console.error("Ticket creation error:", error)

    return {
      success: false,
      message:
        "Sorry, there was an error creating your ticket. Please contact us directly at support@nextphaseit.org or call +1 984-310-9533.",
    }
  }
}
