"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData) {
  // Get form data
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Basic validation
  if (!firstName || !lastName || !email || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  try {
    // Professional email template for business notification
    const businessEmailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1E5AA8; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">NextPhase IT - New Contact Form Submission</h1>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #1E5AA8; margin-top: 0;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <a href="mailto:${email}" style="color: #1E5AA8;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Submitted:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          
          <h3 style="color: #1E5AA8; margin-top: 30px;">Message:</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #1E5AA8; margin: 10px 0;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #e8f4f8; border-radius: 5px;">
            <p style="margin: 0; color: #666;">
              <strong>Next Steps:</strong><br>
              • Reply to this email to respond directly to ${firstName}<br>
              • Add to CRM/follow-up system<br>
              • Expected response time: Within 24 hours
            </p>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">NextPhase IT | Clayton, NC | support@nextphaseit.org | +1 984-310-9533</p>
        </div>
      </div>
    `

    // Customer confirmation email template
    const customerEmailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1E5AA8; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Thank You for Contacting NextPhase IT</h1>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <p>Hi ${firstName},</p>
          
          <p>Thank you for reaching out to NextPhase IT! We've received your message and will get back to you within 24 hours.</p>
          
          <div style="background: white; padding: 15px; border-left: 4px solid #1E5AA8; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1E5AA8;">Your Message:</h3>
            <p style="margin-bottom: 0;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Call us directly at <strong>+1 984-310-9533</strong></li>
            <li>Check out our <a href="https://nextphaseit.org/pricing" style="color: #1E5AA8;">pricing page</a></li>
            <li>Fill out our <a href="https://forms.cloud.microsoft/r/5Ad9WuMA3G" style="color: #1E5AA8;">detailed intake form</a></li>
          </ul>
          
          <p>Best regards,<br>
          <strong>Adrian Knight</strong><br>
          NextPhase IT<br>
          Clayton, NC</p>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">NextPhase IT | Clayton, NC | support@nextphaseit.org | +1 984-310-9533</p>
        </div>
      </div>
    `

    // Send notification email to business
    await resend.emails.send({
      from: "NextPhase IT Contact Form <noreply@nextphaseit.org>",
      to: "support@nextphaseit.org",
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: businessEmailTemplate,
      replyTo: email,
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Adrian Knight - NextPhase IT <noreply@nextphaseit.org>",
      to: email,
      subject: "Thank you for contacting NextPhase IT - We'll be in touch soon!",
      html: customerEmailTemplate,
    })

    // Log successful submission
    console.log("Contact Form Submission Sent via Resend:", {
      firstName,
      lastName,
      email,
      message: message.substring(0, 100) + "...",
      timestamp: new Date().toISOString(),
    })

    return {
      success: true,
      message: `Thank you ${firstName}! Your message has been sent successfully. We'll get back to you within 24 hours at ${email}. You should also receive a confirmation email shortly.`,
    }
  } catch (error) {
    console.error("Contact form error:", error)

    // Fallback: Log the submission even if email fails
    console.log("Contact Form Submission (Email Failed):", {
      firstName,
      lastName,
      email,
      message,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    })

    return {
      success: false,
      message: `Sorry ${firstName}, there was an error sending your message. Please contact us directly at support@nextphaseit.org or call +1 984-310-9533.`,
    }
  }
}
