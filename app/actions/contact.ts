"use server"

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
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Send email using fetch to a simple email API
    const emailData = {
      to: "support@nextphaseit.org",
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
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
      `,
      replyTo: email,
    }

    // For now, we'll use a simple email service API
    // You can replace this with your preferred email service
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: "your_service_id", // You'll need to set this up
        template_id: "your_template_id", // You'll need to set this up
        user_id: "your_user_id", // You'll need to set this up
        template_params: {
          to_email: "support@nextphaseit.org",
          from_name: `${firstName} ${lastName}`,
          from_email: email,
          subject: `New Contact Form Submission from ${firstName} ${lastName}`,
          message: message,
          reply_to: email,
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    // Log successful submission
    console.log("Contact Form Submission Sent:", {
      firstName,
      lastName,
      email,
      message: message.substring(0, 100) + "...",
      timestamp: new Date().toISOString(),
    })

    return {
      success: true,
      message: `Thank you ${firstName}! Your message has been sent successfully. We'll get back to you within 24 hours at ${email}.`,
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
