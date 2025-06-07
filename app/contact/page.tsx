import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function ContactPage() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mt-16">
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
                  We typically respond to all inquiries within 2-4 hours during business hours. For urgent matters,
                  please call us directly at (984) 310-9533.
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
                Contact us today to discuss how NextPhase IT can help streamline your business operations and secure
                your technology infrastructure.
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
              <p className="text-gray-400 mb-4">
                Empowering businesses with cutting-edge technology solutions and expert support.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="https://portal.nextphaseit.org" className="text-gray-400 hover:text-white transition-colors">
                    Client Portal →
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
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
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NextPhase IT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
