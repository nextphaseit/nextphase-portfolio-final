'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-lg max-w-none"
            >
              <h2>Introduction</h2>
              <p>
                NextPhase IT ("we," "our," or "us") is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you visit our website or use our
                services.
              </p>

              <h2>Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide to
                us when you:
              </p>
              <ul>
                <li>Fill out contact forms</li>
                <li>Request a quote</li>
                <li>Subscribe to our newsletter</li>
                <li>Schedule a consultation</li>
                <li>Use our services</li>
              </ul>
              <p>
                This information may include your name, email address, phone number,
                company name, and any other information you choose to provide.
              </p>

              <h3>Automatically Collected Information</h3>
              <p>
                When you visit our website, we automatically collect certain
                information about your device, including:
              </p>
              <ul>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Time and date of visits</li>
                <li>Referring websites</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and maintain our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Analyze usage patterns</li>
                <li>Protect against fraud and unauthorized access</li>
              </ul>

              <h2>Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or rent your personal information to third
                parties. We may share your information with:
              </p>
              <ul>
                <li>Service providers who assist in our operations</li>
                <li>Professional advisors and consultants</li>
                <li>Law enforcement when required by law</li>
              </ul>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your information</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to
                protect your personal information against unauthorized access,
                alteration, disclosure, or destruction.
              </p>

              <h2>Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity
                on our website and hold certain information. You can instruct your
                browser to refuse all cookies or to indicate when a cookie is being
                sent.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify
                you of any changes by posting the new Privacy Policy on this page
                and updating the "Last updated" date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact
                us at:
              </p>
              <ul>
                <li>Email: privacy@nextphaseit.org</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 Business Street, Suite 100, City, State 12345</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 