# Email Service Setup Instructions

## Option 1: EmailJS (Easiest - Free Tier Available)

1. **Sign up at [EmailJS](https://www.emailjs.com/)**
2. **Create a new service** (Gmail, Outlook, etc.)
3. **Create an email template**
4. **Get your credentials:**
   - Service ID
   - Template ID  
   - User ID (Public Key)
5. **Update the contact.ts file** with your credentials

## Option 2: Resend (Recommended for Production)

1. **Sign up at [Resend](https://resend.com/)**
2. **Verify your domain** (nextphaseit.org)
3. **Get your API key**
4. **Install Resend:** `npm install resend`
5. **Replace the fetch call** with Resend API

\`\`\`typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'contact@nextphaseit.org',
  to: 'support@nextphaseit.org',
  subject: `New Contact Form Submission from ${firstName} ${lastName}`,
  html: emailTemplate,
  replyTo: email,
})
\`\`\`

## Option 3: SendGrid

1. **Sign up at [SendGrid](https://sendgrid.com/)**
2. **Get your API key**
3. **Install SendGrid:** `npm install @sendgrid/mail`
4. **Replace the fetch call** with SendGrid API

## Environment Variables Needed

Add to your `.env.local` file:

\`\`\`
# For EmailJS
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id  
EMAILJS_USER_ID=your_user_id

# For Resend
RESEND_API_KEY=your_resend_api_key

# For SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
\`\`\`

## Current Status

The form is set up with EmailJS structure but needs your credentials to work.
The email template is professionally designed and includes all form data.
