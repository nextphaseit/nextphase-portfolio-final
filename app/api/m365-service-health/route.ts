import { type NextRequest, NextResponse } from "next/server"

// This would typically use Microsoft Graph API with proper authentication
// For now, we'll return static data that matches the real API structure

const mockM365ServiceHealth = [
  {
    id: "MO123456",
    title: "Some users may be unable to access Exchange Online",
    service: "Exchange Online",
    status: "investigating",
    description:
      "We're investigating reports that some users may be unable to access Exchange Online mailboxes. Users may experience delays in email delivery or inability to connect to their mailbox.",
    startTime: "2024-01-26T14:30:00Z",
    lastUpdated: "2024-01-26T15:45:00Z",
    impactedFeatures: ["Email access", "Outlook Web App", "Mobile email"],
    classification: "incident",
    severity: "high",
  },
  {
    id: "MO123457",
    title: "SharePoint Online performance issues",
    service: "SharePoint Online",
    status: "service-degradation",
    description:
      "Users may experience slow performance when accessing SharePoint Online sites and OneDrive for Business. File uploads and downloads may take longer than expected.",
    startTime: "2024-01-26T13:15:00Z",
    lastUpdated: "2024-01-26T15:30:00Z",
    impactedFeatures: ["Site access", "File operations", "OneDrive sync"],
    classification: "incident",
    severity: "medium",
  },
  {
    id: "MO123458",
    title: "Microsoft Teams - Planned maintenance",
    service: "Microsoft Teams",
    status: "advisory",
    description:
      "Scheduled maintenance for Microsoft Teams infrastructure. Users may experience brief interruptions in service during the maintenance window.",
    startTime: "2024-01-27T02:00:00Z",
    lastUpdated: "2024-01-26T12:00:00Z",
    impactedFeatures: ["Chat", "Meetings", "File sharing"],
    classification: "advisory",
    severity: "low",
  },
]

export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you would:
    // 1. Authenticate with Microsoft Graph API using app registration
    // 2. Fetch from: https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/issues
    // 3. Transform the data to match your interface

    // For now, return mock data
    const response = {
      value: mockM365ServiceHealth,
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#admin/serviceAnnouncement/issues",
      "@odata.count": mockM365ServiceHealth.length,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching M365 service health:", error)
    return NextResponse.json({ error: "Failed to fetch service health data" }, { status: 500 })
  }
}

// Example of how to implement real Microsoft Graph API call:
/*
async function fetchRealM365ServiceHealth() {
  const clientId = process.env.MICROSOFT_CLIENT_ID
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET
  const tenantId = process.env.MICROSOFT_TENANT_ID

  // Get access token
  const tokenResponse = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  })

  const tokenData = await tokenResponse.json()
  const accessToken = tokenData.access_token

  // Fetch service health
  const healthResponse = await fetch('https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/issues', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  return await healthResponse.json()
}
*/
