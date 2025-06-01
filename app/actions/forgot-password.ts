"use server"

import { Resend } from "resend"
import { PasswordResetEmail } from "@/components/emails/password-reset-email"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPasswordResetEmail(email: string) {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Invalid email format",
      }
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return {
        success: false,
        error: "Email service is not configured",
      }
    }

    // Send the email
    const { data, error } = await resend.emails.send({
      from: "NextPhase IT Support <support@nextphaseit.org>",
      to: [email],
      subject: "Password Reset Instructions - NextPhase IT Admin Portal",
      react: PasswordResetEmail({ userEmail: email }),
    })

    if (error) {
      console.error("Failed to send email:", error)
      return {
        success: false,
        error: "Failed to send email. Please try again later.",
      }
    }

    console.log("Password reset email sent successfully:", data)
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("Error in sendPasswordResetEmail:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
