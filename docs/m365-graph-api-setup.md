# Microsoft 365 Service Health - Graph API Setup

This guide explains how to set up real-time Microsoft 365 service health monitoring using Microsoft Graph API.

## Prerequisites

- Microsoft 365 tenant with admin access
- Azure AD app registration
- Appropriate API permissions

## Step 1: Create Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Fill in the details:
   - **Name**: NextPhase IT Service Health Monitor
   - **Supported account types**: Accounts in this organizational directory only
   - **Redirect URI**: Leave blank for now
5. Click **Register**

## Step 2: Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Choose **Application permissions**
5. Add these permissions:
   - `ServiceHealth.Read.All`
   - `ServiceMessage.Read.All`
6. Click **Grant admin consent**

## Step 3: Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add description: "Service Health API Access"
4. Set expiration (recommended: 24 months)
5. Click **Add**
6. **Copy the secret value immediately** (you won't see it again)

## Step 4: Add Environment Variables

Add these to your `.env.local` file:

\`\`\`env
MICROSOFT_TENANT_ID=your-tenant-id
MICROSOFT_CLIENT_ID=your-app-client-id
MICROSOFT_CLIENT_SECRET=your-client-secret
\`\`\`

## Step 5: Update API Route

Replace the mock data in `/app/api/m365-service-health/route.ts` with real Graph API calls:

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const accessToken = await getAccessToken()
    const serviceHealth = await fetchServiceHealth(accessToken)
    
    return NextResponse.json(serviceHealth)
  } catch (error) {
    console.error('Error fetching M365 service health:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service health data' },
      { status: 500 }
    )
  }
}

async function getAccessToken() {
  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.MICROSOFT_CLIENT_ID!,
        client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    }
  )

  const tokenData = await tokenResponse.json()
  return tokenData.access_token
}

async function fetchServiceHealth(accessToken: string) {
  const response = await fetch(
    'https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/issues',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  )

  return await response.json()
}
\`\`\`

## Step 6: Test the Integration

1. Restart your development server
2. Navigate to the Client Portal
3. Check the Overview tab for live service health data
4. Verify the refresh functionality works

## API Endpoints

- **Service Issues**: `/admin/serviceAnnouncement/issues`
- **Service Messages**: `/admin/serviceAnnouncement/messages`
- **Service Health**: `/admin/serviceAnnouncement/healthOverviews`

## Rate Limits

- Microsoft Graph API has rate limits
- Implement caching to avoid hitting limits
- Consider using webhooks for real-time updates

## Troubleshooting

### Common Issues:

1. **403 Forbidden**: Check API permissions and admin consent
2. **401 Unauthorized**: Verify client secret and tenant ID
3. **Rate Limited**: Implement proper caching and retry logic

### Debug Steps:

1. Test API permissions in Graph Explorer
2. Verify environment variables are loaded
3. Check Azure AD app registration settings
4. Review API response in browser dev tools

## Security Considerations

- Store secrets securely (use Azure Key Vault in production)
- Rotate client secrets regularly
- Monitor API usage and access logs
- Use least privilege principle for permissions

## Production Deployment

For production deployment:

1. Use managed identity instead of client secrets
2. Implement proper error handling and logging
3. Set up monitoring and alerting
4. Consider using Azure Functions for serverless execution
