import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Check if email is from authorized domain
    const domain = email.split("@")[1]
    if (domain !== "nextphaseit.org") {
      return NextResponse.json({ error: "Unauthorized domain" }, { status: 401 })
    }

    // Microsoft Exchange authentication using environment variables
    const exchangeEmail = process.env.EXCHANGE_EMAIL
    const exchangePassword = process.env.EXCHANGE_PASSWORD

    if (!exchangeEmail || !exchangePassword) {
      return NextResponse.json({ error: "Exchange configuration missing" }, { status: 500 })
    }

    // For production, you would use Microsoft Graph API or Exchange Web Services
    // This is a simplified example using basic auth validation
    if (email === exchangeEmail && password === exchangePassword) {
      // In a real implementation, you would:
      // 1. Use Microsoft Graph API to authenticate
      // 2. Get user profile information
      // 3. Validate against your organization's directory

      const userData = {
        id: email.split("@")[0],
        displayName: "Adrian Knight", // This would come from Exchange/Graph API
        givenName: "Adrian",
        email: email,
        department: "IT Operations",
        // photo: "base64_photo_data" // Would come from Graph API
      }

      return NextResponse.json(userData)
    }

    // If not the main admin, you could implement additional logic here
    // to validate other staff members against Exchange directory

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Exchange auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
