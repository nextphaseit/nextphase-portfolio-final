# Setting Up Power Automate for Client Intake Forms

This guide explains how to set up a Power Automate flow that automatically processes Microsoft Forms submissions, generates PDFs, and stores them in SharePoint.

## Prerequisites

1. Microsoft 365 account with Power Automate access
2. Microsoft Forms form created for client intake
3. SharePoint site with a "Client Intake Forms" document library

## Step 1: Create a new Power Automate flow

1. Go to [Power Automate](https://flow.microsoft.com)
2. Click "Create" > "Automated cloud flow"
3. Name your flow "Client Intake Form Processor"
4. Select the trigger "When a new response is submitted" (Microsoft Forms)
5. Click "Create"

## Step 2: Configure the Microsoft Forms trigger

1. In the trigger, select your Client Intake Form from the dropdown
2. Add a "Get response details" action
   - Form ID: Select your form
   - Response ID: Use the dynamic content from the trigger

## Step 3: Parse form data

1. Add a "Initialize variable" action
   - Name: formData
   - Type: Object
   - Value: Parse the response details (use dynamic content)

2. Add another "Initialize variable" action
   - Name: fileName
   - Type: String
   - Value: `ClientIntake_@{formatDateTime(utcNow(), 'yyyyMMdd_HHmmss')}_@{outputs('Get_response_details')?['responder']}`

## Step 4: Generate PDF from form data

1. Add an "HTTP" action to call a PDF generation service
   - Method: POST
   - URI: Your PDF generation endpoint (e.g., Azure Function or third-party service)
   - Headers: Content-Type: application/json
   - Body: 
     \`\`\`json
     {
       "formData": @{variables('formData')},
       "template": "client-intake"
     }
     \`\`\`

2. Add a "Create file" action (SharePoint)
   - Site Address: Your SharePoint site URL
   - Folder Path: /sites/NextPhaseIT/Shared Documents/Client Intake Forms
   - File Name: `@{variables('fileName')}.pdf`
   - File Content: Body from the HTTP response

## Step 5: Send confirmation email with PDF

1. Add a "Send an email (V2)" action (Office 365 Outlook)
   - To: Use the email from the form response
   - Subject: Thank you for your interest in NextPhase IT
   - Body:
     \`\`\`html
     <p>Dear @{outputs('Get_response_details')?['r1234567']},</p>
     <p>Thank you for your interest in NextPhase IT. We have received your contact form submission.</p>
     <p>Our team will review your information and contact you within 24 hours to discuss your specific needs.</p>
     <p>For your records, we've attached a PDF copy of your submission.</p>
     <p>Best regards,<br>NextPhase IT Team</p>
     \`\`\`
   - Attachments: Add the PDF file from SharePoint

## Step 6: Notify internal team

1. Add another "Send an email (V2)" action
   - To: support@nextphaseit.org
   - Subject: New Client Intake Form: @{outputs('Get_response_details')?['r1234567']}
   - Body: Include all form fields and a link to the SharePoint file
   - Attachments: Add the PDF file from SharePoint

## Step 7: Save and test your flow

1. Click "Save"
2. Click "Test" to test your flow with a sample form submission
3. Verify that:
   - PDF is generated correctly
   - File is saved to SharePoint
   - Emails are sent to both the client and internal team

## Troubleshooting

- Check flow run history for any errors
- Verify SharePoint permissions
- Ensure PDF generation service is working correctly
- Check email delivery settings

For additional help, contact the NextPhase IT development team.
