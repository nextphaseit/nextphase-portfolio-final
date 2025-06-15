'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-lg max-w-none"
            >
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using NextPhase IT's services, you agree to be bound
                by these Terms of Service. If you disagree with any part of the
                terms, you may not access our services.
              </p>

              <h2>2. Services</h2>
              <p>
                NextPhase IT provides IT consulting, managed services, and technical
                support services. We reserve the right to modify, suspend, or
                discontinue any aspect of our services at any time.
              </p>

              <h2>3. User Responsibilities</h2>
              <p>As a user of our services, you agree to:</p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Notify us of any unauthorized access</li>
                <li>Use our services in compliance with applicable laws</li>
                <li>Not interfere with the proper functioning of our services</li>
              </ul>

              <h2>4. Payment Terms</h2>
              <p>
                Payment terms for our services are as follows:
              </p>
              <ul>
                <li>Payment is due within 30 days of invoice date</li>
                <li>All fees are exclusive of applicable taxes</li>
                <li>We reserve the right to modify our pricing with notice</li>
                <li>Late payments may incur additional fees</li>
              </ul>

              <h2>5. Intellectual Property</h2>
              <p>
                All content, features, and functionality of our services are owned by
                NextPhase IT and are protected by intellectual property laws. You may
                not use, reproduce, or distribute our content without permission.
              </p>

              <h2>6. Confidentiality</h2>
              <p>
                Both parties agree to maintain the confidentiality of any proprietary
                or confidential information shared during the course of our business
                relationship.
              </p>

              <h2>7. Limitation of Liability</h2>
              <p>
                NextPhase IT shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from your use
                of or inability to use our services.
              </p>

              <h2>8. Warranty Disclaimer</h2>
              <p>
                Our services are provided "as is" without any warranties, express or
                implied. We do not guarantee that our services will be uninterrupted
                or error-free.
              </p>

              <h2>9. Termination</h2>
              <p>
                We may terminate or suspend your access to our services immediately,
                without prior notice, for any breach of these Terms of Service.
              </p>

              <h2>10. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the
                laws of the state of North Carolina, without regard to its conflict
                of law provisions.
              </p>

              <h2>11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will
                notify users of any material changes by posting the new Terms of
                Service on this page.
              </p>

              <h2>12. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <ul>
                <li>Email: legal@nextphaseit.org</li>
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