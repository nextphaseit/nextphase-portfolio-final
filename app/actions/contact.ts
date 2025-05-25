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

    // Here you would typically send an email using a service like Resend, SendGrid, or Nodemailer
    // For now, we'll simulate a successful submission

    console.log("Contact Form Submission:", {
      firstName,
      lastName,
      email,
      message,
      timestamp: new Date().toISOString(),
    })

    return {
      success: true,
      message: `Thank you ${firstName}! Your message has been sent successfully. We'll get back to you within 24 hours at ${email}.`,
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      message:
        "Sorry, there was an error sending your message. Please try again or contact us directly at support@nextphaseit.org.",
    }
  }
}
