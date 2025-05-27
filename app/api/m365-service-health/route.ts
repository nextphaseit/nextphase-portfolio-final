import { type NextRequest, NextResponse } from "next/server"

interface GraphTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

interface GraphServiceIssue {
  id: string
  title: string
  service: string
  status: string
  classification: string
  severity: string
  startDateTime: string
  lastModifiedDateTime: string
  posts: Array<{
    description: { content: string }
    createdDateTime: string
  }>
  impactDescription?: string
}

// Transform Microsoft Graph API response to our format
function transformGraphResponse(graphIssues: GraphServiceIssue[]) {
  return graphIssues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    service: issue.service,
    status: mapGraphStatus(issue.status),
    description: issue.posts?.[0]?.description?.content || issue.impactDescription || "No description available",
    startTime: issue.startDateTime,
    lastUpdated: issue.lastModifiedDateTime,
    impactedFeatures: extractImpactedFeatures(issue.impactDescription || ""),
    classification: issue.classification?.toLowerCase() === "advisory" ? "advisory" : "incident",
    severity: mapGraphSeverity(issue.severity),
  }))
}

function mapGraphStatus(graphStatus: string): string {
  const statusMap: Record<string, string> = {
    investigating: "investigating",
    serviceRestored: "resolved",
    serviceDegradation: "service-degradation",
    serviceInterruption: "service-interruption",
    restoringService: "restoring-service",
    advisory: "advisory",
  }
  return statusMap[graphStatus] || "investigating"
}

function mapGraphSeverity(graphSeverity: string): "high" | "medium" | "low" {
  const severityMap: Record<string, "high" | "medium" | "low"> = {
    high: "high",
    medium: "medium",
    low: "low",
    critical: "high",
    warning: "medium",
    information: "low",
  }
  return severityMap[graphSeverity?.toLowerCase()] || "medium"
}

function extractImpactedFeatures(description: string): string[] {
  // Simple extraction of features from description
  const features: string[] = []
  const commonFeatures = [
    "Email access",
    "Outlook Web App",
    "Mobile email",
    "Calendar",
    "SharePoint Online",
    "OneDrive",
    "File operations",
    "Site access",
    "Microsoft Teams",
    "Chat",
    "Meetings",
    "File sharing",
    "Calls",
    "Power Platform",
    "Power BI",
    "Power Apps",
    "Power Automate",
  ]

  commonFeatures.forEach((feature) => {
    if (description.toLowerCase().includes(feature.toLowerCase())) {
      features.push(feature)
    }
  })

  return features.length > 0 ? features : ["General functionality"]
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.MICROSOFT_CLIENT_ID
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET
  const tenantId = process.env.MICROSOFT_TENANT_ID

  if (!clientId || !clientSecret || !tenantId) {
    throw new Error("Missing Microsoft Graph API credentials. Please check environment variables.")
  }

  // Log for debugging (without exposing secrets)
  console.log("Attempting to get access token...")
  console.log("Client ID:", clientId?.substring(0, 8) + "...")
  console.log("Tenant ID:", tenantId?.substring(0, 8) + "...")
  console.log("Client Secret length:", clientSecret?.length)

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  })

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })

    const responseText = await response.text()

    if (!response.ok) {
      console.error("Token request failed:", response.status, responseText)
      throw new Error(`Failed to get access token: ${responseText}`)
    }

    const tokenData: GraphTokenResponse = JSON.parse(responseText)
    console.log("Successfully obtained access token")
    return tokenData.access_token
  } catch (error) {
    console.error("Error in getAccessToken:", error)
    throw error
  }
}

async function fetchServiceHealth(accessToken: string) {
  const graphUrl = "https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/issues"

  const response = await fetch(graphUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to fetch service health: ${error}`)
  }

  return await response.json()
}

// Fallback data in case API fails
const fallbackData = [
  {
    id: "FALLBACK_001",
    title: "Service health data temporarily unavailable",
    service: "Microsoft Graph API",
    status: "advisory",
    description:
      "Unable to fetch real-time service health data. Please check the Microsoft 365 Admin Center for the latest updates.",
    startTime: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    impactedFeatures: ["Service health monitoring"],
    classification: "advisory",
    severity: "low",
  },
]

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching Microsoft 365 service health...")

    // Get access token
    const accessToken = await getAccessToken()
    console.log("Successfully obtained access token")

    // Fetch service health data
    const graphResponse = await fetchServiceHealth(accessToken)
    console.log(`Fetched ${graphResponse.value?.length || 0} service health items`)

    // Transform the data
    const transformedData = transformGraphResponse(graphResponse.value || [])

    // Filter to show only active issues (not resolved)
    const activeIssues = transformedData.filter((issue) => issue.status !== "resolved")

    const response = {
      value: activeIssues,
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#admin/serviceAnnouncement/issues",
      "@odata.count": activeIssues.length,
      lastFetched: new Date().toISOString(),
      source: "microsoft-graph-api",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching M365 service health:", error)

    // Determine if this is an authentication error
    const isAuthError = error instanceof Error && error.message.includes("invalid_client")

    // Return fallback data with detailed error information
    const response = {
      value: fallbackData,
      error: isAuthError
        ? "Authentication failed - please check Microsoft Graph API credentials"
        : "Failed to fetch real-time data",
      fallback: true,
      lastFetched: new Date().toISOString(),
      source: "fallback-data",
      errorDetails: error instanceof Error ? error.message : "Unknown error",
    }

    return NextResponse.json(response, { status: 200 }) // Return 200 with fallback data
  }
}

// Health check endpoint
export async function POST(request: NextRequest) {
  try {
    const accessToken = await getAccessToken()
    return NextResponse.json({
      status: "healthy",
      message: "Microsoft Graph API connection successful",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to Microsoft Graph API",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
