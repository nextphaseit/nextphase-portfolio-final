import { Html, Head, Body, Container, Section, Img, Heading, Text, Button, Hr, Link } from "@react-email/components"

interface PasswordResetEmailProps {
  userEmail: string
}

export function PasswordResetEmail({ userEmail }: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src="https://nextphaseit.org/images/nextphase-logo.png"
              width="60"
              height="60"
              alt="NextPhase IT Logo"
              style={logo}
            />
            <Heading style={h1}>NextPhase IT</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h2}>Password Reset Request</Heading>

            <Text style={text}>Hello,</Text>

            <Text style={text}>
              We received a request to reset the password for your Microsoft account associated with{" "}
              <strong>{userEmail}</strong>.
            </Text>

            <Text style={text}>
              Since NextPhase IT uses Microsoft authentication, you'll need to reset your password directly through
              Microsoft's secure portal.
            </Text>

            {/* Reset Button */}
            <Section style={buttonContainer}>
              <Button
                style={button}
                href="https://support.microsoft.com/en-us/account-billing/change-your-microsoft-account-password-fdde885b-86da-2965-69fd-4871309ef1f1"
              >
                Reset Microsoft Password
              </Button>
            </Section>

            {/* Step-by-step Instructions */}
            <Section style={instructionsSection}>
              <Heading style={h3}>Step-by-Step Instructions:</Heading>

              <Text style={stepText}>
                <strong>1. Visit the Reset Page</strong>
                <br />
                Click the button above or visit the Microsoft password reset page directly.
              </Text>

              <Text style={stepText}>
                <strong>2. Enter Your Microsoft Account Email</strong>
                <br />
                Use the same email address: <strong>{userEmail}</strong>
              </Text>

              <Text style={stepText}>
                <strong>3. Follow Verification Steps</strong>
                <br />
                Microsoft will guide you through their security verification process.
              </Text>

              <Text style={stepText}>
                <strong>4. Create Your New Password</strong>
                <br />
                Choose a strong, unique password for your Microsoft account.
              </Text>

              <Text style={stepText}>
                <strong>5. Return to NextPhase IT Portal</strong>
                <br />
                Once reset, you can sign in to the admin portal with your new password.
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Support Information */}
            <Section style={supportSection}>
              <Text style={supportText}>
                <strong>Need Additional Help?</strong>
              </Text>
              <Text style={supportText}>If you continue to experience issues, please contact our support team:</Text>
              <Text style={supportText}>
                📧 Email:{" "}
                <Link href="mailto:support@nextphaseit.org" style={link}>
                  support@nextphaseit.org
                </Link>
                <br />📞 Phone:{" "}
                <Link href="tel:+19843109533" style={link}>
                  (984) 310-9533
                </Link>
                <br />🕒 Hours: Monday - Friday, 8AM - 6PM EST
              </Text>
            </Section>

            {/* Security Notice */}
            <Section style={securitySection}>
              <Text style={securityText}>
                <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email.
                Your account remains secure.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2025 NextPhase IT. All rights reserved.
              <br />
              Professional IT support and service management.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
}

const header = {
  padding: "32px 24px",
  textAlign: "center" as const,
  backgroundColor: "#0a192f",
  borderRadius: "8px 8px 0 0",
}

const logo = {
  margin: "0 auto 16px",
}

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0",
}

const content = {
  padding: "24px",
}

const h2 = {
  color: "#0a192f",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 16px",
}

const h3 = {
  color: "#0070f3",
  fontSize: "16px",
  fontWeight: "600",
  margin: "24px 0 16px",
}

const text = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 16px",
}

const stepText = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 12px",
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
}

const button = {
  backgroundColor: "#0070f3",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
}

const instructionsSection = {
  backgroundColor: "#f8fafc",
  padding: "20px",
  borderRadius: "6px",
  margin: "24px 0",
}

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
}

const supportSection = {
  backgroundColor: "#f0f9ff",
  padding: "20px",
  borderRadius: "6px",
  margin: "24px 0",
}

const supportText = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 8px",
}

const securitySection = {
  backgroundColor: "#fef3c7",
  padding: "16px",
  borderRadius: "6px",
  margin: "24px 0",
}

const securityText = {
  color: "#92400e",
  fontSize: "13px",
  lineHeight: "1.4",
  margin: "0",
}

const footer = {
  padding: "24px",
  textAlign: "center" as const,
  backgroundColor: "#f9fafb",
  borderRadius: "0 0 8px 8px",
}

const footerText = {
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "1.4",
  margin: "0",
}

const link = {
  color: "#0070f3",
  textDecoration: "none",
}

export default PasswordResetEmail
