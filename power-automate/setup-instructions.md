# Power Automate Workflow Setup Instructions

## Overview
This Power Automate workflow automatically processes new support tickets by:
1. Creating entries in SharePoint
2. Sending Teams notifications
3. Emailing the support team
4. Sending SMS for urgent tickets

## Prerequisites
- Microsoft 365 subscription with Power Automate
- SharePoint site for ticket management
- Teams workspace for notifications
- Twilio account for SMS (optional)

## Setup Steps

### 1. Create SharePoint List
1. Go to your SharePoint site: `https://nextphaseit.sharepoint.com/sites/SupportTickets`
2. Create a new list called "Support Tickets"
3. Add the following columns:
   - Title (Single line of text) - Default
   - TicketNumber (Single line of text)
   - Priority (Choice: Low, Medium, High, Urgent)
   - Status (Choice: Open, In Progress, Resolved, Closed)
   - Description (Multiple lines of text)
   - ClientName (Single line of text)
   - ClientEmail (Single line of text)
   - Source (Choice: Portal, Chatbot, Email, Phone)
   - Created (Date and time)
   - LastUpdated (Date and time)
   - AssignedTo (Person or Group)

### 2. Import Power Automate Flow
1. Go to Power Automate (flow.microsoft.com)
2. Click "My flows" → "Import" → "Import Package (Legacy)"
3. Upload the `ticket-workflow.json` file
4. Configure connections:
   - SharePoint Online
   - Microsoft Teams
   - Office 365 Outlook
   - Twilio (optional for SMS)

### 3. Configure Connections
1. **SharePoint**: Connect to your SharePoint site
2. **Teams**: Select your team and support channel
3. **Outlook**: Use your support email account
4. **Twilio**: Add your Twilio credentials (optional)

### 4. Update Webhook URL
1. Copy the HTTP trigger URL from your Power Automate flow
2. Update your ticket creation function to call this webhook

### 5. Test the Workflow
1. Create a test ticket through your portal
2. Verify the ticket appears in SharePoint
3. Check Teams for notification
4. Confirm email was sent to support team

## Webhook Integration

Add this to your `createSupportTicket` function:

\`\`\`typescript
// After successful ticket creation, trigger Power Automate
if (result.success) {
  try {
    await fetch('YOUR_POWER_AUTOMATE_WEBHOOK_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticketNumber: result.ticketNumber,
        subject: ticketData.subject,
        priority: ticketData.priority,
        description: ticketData.description,
        clientName: ticketData.clientName,
        clientEmail: ticketData.clientEmail,
        source: ticketData.source,
        created: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error('Failed to trigger Power Automate:', error)
  }
}
\`\`\`

## Customization Options

### Priority-Based Routing
- Urgent tickets → Immediate SMS + Teams ping
- High tickets → Teams notification + email
- Medium/Low → Email only

### Auto-Assignment Rules
Add conditions to automatically assign tickets based on:
- Keywords in description
- Client email domain
- Ticket source
- Time of day

### SLA Tracking
Add actions to:
- Set due dates based on priority
- Send reminders for overdue tickets
- Escalate unresponded tickets

## Monitoring and Maintenance

### Flow Analytics
- Monitor run history in Power Automate
- Set up alerts for failed runs
- Review performance metrics

### SharePoint Views
Create custom views for:
- Open tickets by priority
- Tickets by assigned person
- Overdue tickets
- Client ticket history

### Teams Integration
- Pin important ticket notifications
- Create dedicated channels for different priorities
- Set up @mentions for urgent tickets

## Security Considerations

1. **Access Control**: Limit SharePoint list access to support team
2. **Data Privacy**: Ensure client data is handled according to privacy policies
3. **Webhook Security**: Use authentication tokens for webhook calls
4. **Audit Trail**: Enable SharePoint versioning for ticket changes

## Troubleshooting

### Common Issues
1. **Connection Failures**: Refresh expired connections
2. **Permission Errors**: Verify SharePoint permissions
3. **Missing Notifications**: Check Teams channel settings
4. **Email Delivery**: Verify Outlook connection and spam filters

### Error Handling
The workflow includes error handling for:
- SharePoint connection issues
- Teams notification failures
- Email delivery problems
- Invalid ticket data

## Next Steps

1. Set up the SharePoint list structure
2. Import and configure the Power Automate flow
3. Test with sample tickets
4. Train support team on new workflow
5. Monitor and optimize based on usage
