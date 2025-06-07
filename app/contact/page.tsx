import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function ContactPage() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-primary-hover text-surface py-20 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              We're here to help your business with IT solutions. Reach out to us using the information below.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-8">Get In Touch</h2>

                {/* Business Name */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-primary mb-2">NextPhase IT</h3>
                </div>

                {/* Contact Info Cards */}
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4 p-6 bg-surface rounded-lg border border-border-color shadow-md">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">Address</h4>
                      <p className="text-text-secondary">
                        83 Hardwick St
                        <br />
                        Clayton, NC 27527
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4 p-6 bg-surface rounded-lg border border-border-color shadow-md">
                    <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">Phone</h4>
                      <a
                        href="tel:+19843109533"
                        className="text-primary hover:text-primary-hover transition-colors font-medium"
                      >
                        (984) 310-9533
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4 p-6 bg-surface rounded-lg border border-border-color shadow-md">
                    <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">Email</h4>
                      <a
                        href="mailto:support@nextphaseit.org"
                        className="text-primary hover:text-primary-hover transition-colors font-medium"
                      >
                        support@nextphaseit.org
                      </a>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4 p-6 bg-surface rounded-lg border border-border-color shadow-md">
                    <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">Business Hours</h4>
                      <div className="text-text-secondary">
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
              <h3 className="text-2xl font-bold text-text-primary mb-8">Find Us</h3>
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
          <div className="bg-blue-50 rounded-xl p-8 mb-20">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">Frequently Asked Questions</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* FAQ Item 1 */}
              <div className="bg-surface p-6 rounded-lg border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-4">How soon will I get a response?</h3>
                <p className="text-text-secondary">
                  We typically respond to all inquiries within 2-4 hours during business hours. For urgent matters,
                  please call us directly at (984) 310-9533.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-surface p-6 rounded-lg border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-4">Do you offer emergency IT support?</h3>
                <p className="text-text-secondary">
                  Yes, we provide 24/7 emergency IT support for critical business issues. Contact us immediately for
                  system outages or security incidents.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-surface p-6 rounded-lg border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-4">Can I schedule a security audit?</h3>
                <p className="text-text-secondary">
                  We offer comprehensive security audits to identify vulnerabilities and strengthen your IT
                  infrastructure. Contact us to schedule your assessment.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-surface p-6 rounded-lg border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-4">Do you offer remote or onsite support?</h3>
                <p className="text-text-secondary">
                  We provide both remote and onsite support services. Many issues can be resolved remotely, but we're
                  happy to visit your location when needed.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-surface p-6 rounded-lg border border-border-color shadow-md md:col-span-2">
                <h3 className="text-xl font-semibold text-primary mb-4">What types of businesses do you work with?</h3>
                <p className="text-text-secondary">
                  We work with businesses of all sizes, from small startups to large enterprises. Our services are
                  tailored to meet the unique IT needs of each organization, regardless of industry or size.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-primary text-surface rounded-xl p-12 shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Contact us today to discuss how NextPhase IT can help streamline your business operations and secure
                your technology infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+19843109533"
                  className="bg-surface text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </a>
                <a
                  href="mailto:support@nextphaseit.org"
                  className="bg-primary-hover text-surface px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center justify-center"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering businesses with cutting-edge technology solutions and expert support.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <ul className="space-y-3 text-gray-400">
                <li>83 Hardwick St</li>
                <li>Clayton, NC 27527</li>
                <li>
                  <a href="tel:+19843109533" className="hover:text-white transition-colors">
                    (984) 310-9533
                  </a>
                </li>
                <li>
                  <a href="mailto:support@nextphaseit.org" className="hover:text-white transition-colors">
                    support@nextphaseit.org
                  </a>
                </li>
              </ul>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Mon-Fri: 9:00 AM - 6:00 PM</li>
                <li>Sat-Sun: Closed</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NextPhase IT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
