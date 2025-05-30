# Real-Time Ticket System Documentation

## Overview
The enhanced support ticket system provides real-time status updates, admin controls, and seamless integration with Power Automate and SharePoint.

## Features

### 1. Real-Time Status Updates
- **Polling Mechanism**: Checks for updates every 30 seconds
- **Visual Indicators**: Pulsing green dot shows active polling
- **Toast Notifications**: Users receive notifications when ticket status changes
- **Automatic Refresh**: UI updates automatically without page reload

### 2. Enhanced Status Display
- **Color-Coded Badges**: Visual status indicators with consistent colors
- **Status Timeline**: Shows progression through ticket lifecycle
- **Status Descriptions**: Clear explanations of what each status means

### 3. Admin Controls
- **Status Management**: Admins can change ticket status with dropdown/buttons
- **Assignment Control**: Assign tickets to team members
- **Internal Notes**: Add notes visible only to staff
- **Quick Actions**: One-click status changes for common actions

### 4. Power Automate Integration
- **Status Updates**: Triggers workflow when status changes
- **SharePoint Sync**: Updates SharePoint list items automatically
- **Email Notifications**: Sends notifications to clients and team
- **Teams Integration**: Posts updates to Microsoft Teams channels

## Technical Implementation

### Components
- `TicketStatusBadge`: Displays status with color coding
- `TicketStatusTimeline`: Shows status progression
- `AdminTicketControls`: Admin interface for ticket management
- `useTicketPolling`: Hook for real-time updates
- `ToastProvider`: Notification system

### API Endpoints
- `POST /api/tickets/status`: Polling endpoint for status updates
- Server actions for status updates and Power Automate integration

### Error Handling
- Retry mechanisms for failed API calls
- Graceful degradation when polling fails
- User feedback for all operations
- Rollback on failed status updates

## Configuration

### Environment Variables
\`\`\`env
POWER_AUTOMATE_WEBHOOK_URL=https://prod-xx.eastus.logic.azure.com/...
RESEND_API_KEY=re_xxxxxxxxx
\`\`\`

### Power Automate Setup
1. Create status update workflow using provided JSON
2. Configure SharePoint connections
3. Set up Teams and email notifications
4. Update webhook URL in environment variables

### SharePoint List Structure
Required columns:
- TicketNumber (Single line of text)
- Status (Choice: Open, In Progress, Resolved, Closed, On Hold)
- LastUpdated (Date and Time)
- UpdatedBy (Single line of text)
- StatusHistory (Multiple lines of text)

## Usage

### For Users
1. View real-time status updates in portal
2. Receive notifications when status changes
3. Track ticket progression through timeline
4. Add responses and additional information

### For Admins
1. Change ticket status using admin controls
2. Assign tickets to team members
3. Add internal notes for team communication
4. Use quick actions for common status changes

## Monitoring and Troubleshooting

### Polling Status
- Green pulsing dot indicates active polling
- Error messages shown in toast notifications
- Manual refresh button available

### Power Automate Monitoring
- Check workflow run history in Power Automate
- Monitor SharePoint list for updates
- Verify email delivery in Resend dashboard

### Common Issues
1. **Polling Fails**: Check API endpoint and network connectivity
2. **Status Not Updating**: Verify Power Automate workflow is running
3. **Notifications Not Sent**: Check Resend API key and email configuration
4. **SharePoint Sync Issues**: Verify SharePoint permissions and list structure

## Performance Considerations
- Polling interval optimized for balance between real-time updates and server load
- Efficient API queries to minimize bandwidth usage
- Client-side caching to reduce redundant requests
- Graceful handling of network interruptions
\`\`\`

This enhanced ticket system provides a comprehensive real-time experience with proper error handling, admin controls, and seamless integration with your existing Power Automate and SharePoint infrastructure. The system is fully responsive and maintains consistency with your existing design system.
