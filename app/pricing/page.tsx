import { motion } from 'framer-motion';
import Link from 'next/link';
import PricingCard from '@/components/PricingCard';

const pricingTiers = [
  {
    name: 'Starter',
    price: 299,
    description: 'Perfect for small businesses just getting started',
    features: [
      'Business Email Setup',
      '1 Website (Landing Page)',
      'Basic IT Support (Email/Phone)',
      'Up to 2 Users',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Business',
    price: 599,
    description: 'Ideal for growing businesses with more complex needs',
    features: [
      'Up to 3 Business Emails',
      'Full Website + Hosting',
      'SharePoint Setup',
      'Data Backup & Migration',
      '24/7 Support',
      'Up to 10 Users',
    ],
    cta: 'Choose Business',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'Custom solutions for businesses with specific requirements',
    features: [
      'Custom Portal or App',
      'HIPAA Audit & Security',
      'Full Microsoft 365 Tenant Mgmt',
      'Workflow Automation',
      'Staff Onboarding',
      'Unlimited Users',
    ],
    cta: 'Request Consultation',
    popular: false,
  },
];

const pricingComparisonData = [
  { feature: "Business Email Setup", starter: "✓", business: "✓", enterprise: "✓" },
  { feature: "Custom Website & Hosting", starter: "Landing Page Only", business: "✓", enterprise: "✓" },
  { feature: "Microsoft 365 Setup", starter: "✕", business: "✓", enterprise: "✓" },
  { feature: "SharePoint Integration", starter: "✕", business: "✓", enterprise: "✓" },
  { feature: "Workflow Automation", starter: "✕", business: "✕", enterprise: "✓" },
  { feature: "Data Migration", starter: "✕", business: "✓", enterprise: "✓" },
  { feature: "HIPAA Compliance Audit", starter: "✕", business: "✕", enterprise: "✓" },
  { feature: "Number of Users", starter: "Up to 2", business: "Up to 10", enterprise: "Unlimited" },
  { feature: "Support Availability", starter: "Business Hours", business: "24/7 Email + Chat", enterprise: "24/7 Phone + Email" },
  { feature: "Training & Onboarding", starter: "✕", business: "✕", enterprise: "✓" },
];

function PricingComparisonTable() {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Features</th>
            <th className="border px-4 py-2">Starter</th>
            <th className="border px-4 py-2">Business</th>
            <th className="border px-4 py-2">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {pricingComparisonData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{row.feature}</td>
              <td className="border px-4 py-2 text-center">{row.starter}</td>
              <td className="border px-4 py-2 text-center">{row.business}</td>
              <td className="border px-4 py-2 text-center">{row.enterprise}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Choose the perfect plan for your business needs. All plans include our core IT support services.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} {...tier} index={index} />
          ))}
        </div>

        {/* Comparison Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Compare Plans Side by Side
          </h2>
          <div className="max-w-5xl mx-auto">
            <PricingComparisonTable />
          </div>
        </motion.div>

        {/* Optional Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-primary mb-8">Optional Add-ons</h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Device Management</h3>
              <p className="text-gray-600">
                Comprehensive management of all your business devices
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Data Backup Monitoring</h3>
              <p className="text-gray-600">
                24/7 monitoring and management of your data backups
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Endpoint Security</h3>
              <p className="text-gray-600">
                Advanced security solutions for all your endpoints
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-primary mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">What happens if I need more users?</h3>
              <p className="text-gray-600">
                Contact us to discuss custom pricing for additional users or specific requirements.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Is there a setup fee?</h3>
              <p className="text-gray-600">
                No setup fees for our standard plans. Custom solutions may require a one-time setup fee.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">Need a Custom Solution?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us for a personalized quote tailored to your business needs
          </p>
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 