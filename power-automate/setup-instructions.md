# Power Automate Setup Instructions

## Prerequisites
- Microsoft 365 account with Power Automate access
- SharePoint Online site
- Teams (optional, for notifications)

## Step 1: Create SharePoint List

1. Go to your SharePoint site
2. Create a new list called "Support Tickets"
3. Add the following columns:

| Column Name | Type | Required | Description |
|-------------|------|----------|-------------|
| TicketNumber | Single line of text | Yes | Unique ticket identifier |
| Subject | Single line of text | Yes | Ticket subject |
| Priority | Choice (Low, Medium, High, Urgent) | Yes | Ticket priority |
| Status | Choice (Open, In Progress, Resolved, Closed) | Yes | Current status |
| Description | Multiple lines of text | Yes | Detailed description |
| ClientName | Single line of text | No | Client name |
| ClientEmail | Single line of text | No | Client email |
| Source | Choice (Portal, Chatbot, Email, Phone) | Yes | Ticket source |
| AssignedTo | Person or Group | No | Assigned team member |
| CreatedDate | Date and time | Yes | Creation timestamp |
| LastUpdated | Date and time | Yes | Last update timestamp |

## Step 2: Import Power Automate Flow

1. Go to Power Automate (flow.microsoft.com)
2. Click "My flows" → "Import" → "Import Package (Legacy)"
3. Upload the `ticket-workflow.zip` file
4. Configure connections:
   - SharePoint connection
   - Office 365 Outlook connection
   - Teams connection (optional)

## Step 3: Configure Webhook

1. In the imported flow, find the "When a HTTP request is received" trigger
2. Copy the HTTP POST URL
3. Add this URL as the `POWER_AUTOMATE_WEBHOOK_URL` environment variable in Vercel

## Step 4: Test the Integration

1. Submit a test ticket through the portal or chatbot
2. Verify the ticket appears in SharePoint
3. Check that email notifications are sent
4. Confirm Teams notifications (if configured)

## Webhook Payload Structure

The webhook sends the following JSON structure:

\`\`\`json
{
  "ticketNumber": "TK-123456",
  "subject": "Email setup issue",
  "priority": "high",
  "description": "Detailed description of the issue",
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "source": "portal",
  "created": "2024-01-15T10:30:00.000Z"
}
\`\`\`

## Environment Variables Required

Make sure these are configured in your Vercel project:

- `RESEND_API_KEY` - For email notifications
- `POWER_AUTOMATE_WEBHOOK_URL` - For SharePoint integration

## Troubleshooting

### Common Issues:

1. **Webhook not triggering**
   - Verify the URL is correct
   - Check Power Automate run history
   - Ensure the flow is turned on

2. **SharePoint permissions**
   - Verify the flow has write access to the SharePoint list
   - Check column names match exactly

3. **Email notifications not sending**
   - Verify Resend API key is valid
   - Check email addresses are correct
   - Review error logs in Vercel

### Testing Steps:

1. Create a test ticket through the portal
2. Check Vercel function logs
3. Verify Power Automate run history
4. Confirm SharePoint list entry
5. Check email delivery

## Support

For additional help with Power Automate setup:
- Contact NextPhase IT support
- Review Microsoft Power Automate documentation
- Check the flow run history for error details
