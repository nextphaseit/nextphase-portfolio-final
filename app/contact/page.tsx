import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            We're here to help your business with IT solutions. Reach out to us using the information below.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>

              {/* Business Name */}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">NextPhase IT</h3>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      83 Hardwick St
                      <br />
                      Clayton, NC 27527
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Phone className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <a href="tel:+19843109533" className="text-blue-600 hover:text-blue-800 transition-colors">
                      (984) 310-9533
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <a
                      href="mailto:support@nextphaseit.org"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      support@nextphaseit.org
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <div className="text-gray-600">
                      <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                      <p>Sat-Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h3>
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3265.8!2d-78.4569!3d35.6531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5a2f9f51e1d7%3A0x6c8d4c8d4c8d4c8d!2s83%20Hardwick%20St%2C%20Clayton%2C%20NC%2027527!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NextPhase IT Location"
                className="w-full h-96"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* FAQ Item 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">How soon will I get a response?</h3>
              <p className="text-gray-600">
                We typically respond to all inquiries within 2-4 hours during business hours. For urgent matters, please
                call us directly at (984) 310-9533.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Do you offer emergency IT support?</h3>
              <p className="text-gray-600">
                Yes, we provide 24/7 emergency IT support for critical business issues. Contact us immediately for
                system outages or security incidents.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Can I schedule a security audit?</h3>
              <p className="text-gray-600">
                We offer comprehensive security audits to identify vulnerabilities and strengthen your IT
                infrastructure. Contact us to schedule your assessment.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Do you offer remote or onsite support?</h3>
              <p className="text-gray-600">
                We provide both remote and onsite support services. Many issues can be resolved remotely, but we're
                happy to visit your location when needed.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">What types of businesses do you work with?</h3>
              <p className="text-gray-600">
                We work with businesses of all sizes, from small startups to large enterprises. Our services are
                tailored to meet the unique IT needs of each organization, regardless of industry or size.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Contact us today to discuss how NextPhase IT can help streamline your business operations and secure your
              technology infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+19843109533"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </a>
              <a
                href="mailto:support@nextphaseit.org"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
