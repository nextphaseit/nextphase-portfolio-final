const FAQPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">General Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">What is the Service Desk Portal?</h3>
            <p>
              The Service Desk Portal is your central hub for accessing IT support, submitting requests, and finding
              helpful resources.
            </p>
          </div>
          <div>
            <h3 className="font-medium">How do I access the Service Desk Portal?</h3>
            <p>You can access the Service Desk Portal by visiting [Portal Link].</p>
          </div>
          <div>
            <h3 className="font-medium">What kind of support can I get through the Service Desk Portal?</h3>
            <p>
              Through the Service Desk Portal, you can submit support tickets, request new software, report issues, and
              access our knowledge base.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Technical Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">I'm having trouble logging in. What should I do?</h3>
            <p>
              Please ensure you are using the correct username and password. If you are still having trouble, please
              contact the NextPhase IT Help Desk.
            </p>
          </div>
          <div>
            <h3 className="font-medium">My internet is not working. What should I do?</h3>
            <p>
              First, try restarting your modem and router. If the problem persists, please submit a support ticket
              through the Service Desk Portal.
            </p>
          </div>
          <div>
            <h3 className="font-medium">How do I reset my password?</h3>
            <p>You can reset your password through the "Forgot Password" link on the Service Desk Portal login page.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Let's Get In Touch</h2>
        <p>
          If you have any further questions or need assistance, please don't hesitate to contact the NextPhase IT Help
          Desk.
        </p>
        <p>You can reach us by:</p>
        <ul className="list-disc list-inside">
          <li>Email: support@nextphaseit.com</li>
          <li>Phone: 555-123-4567</li>
        </ul>
      </div>
    </div>
  )
}

export default FAQPage
