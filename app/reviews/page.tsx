import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Strokes of Faith',
    role: 'Healthcare Provider',
    content: 'NextPhase IT has transformed our practice with their expert IT solutions. Their team is responsive, knowledgeable, and always goes above and beyond to ensure our systems run smoothly.',
    logo: '/images/strokes-of-faith-logo.png',
    rating: 5,
  },
  {
    name: "Lu's Kitchen",
    role: 'Restaurant Owner',
    content: 'Their website design and automation tools have helped us grow our business significantly. The team at NextPhase IT truly understands the needs of small businesses.',
    logo: '/images/lus-kitchen-logo.png',
    rating: 5,
  },
  {
    name: 'TruFix Repair',
    role: 'Service Business',
    content: 'Professional IT support that keeps our business running smoothly. Their proactive approach to maintenance has prevented countless potential issues.',
    logo: '/images/trufix-logo.png',
    rating: 5,
  },
];

export default function ReviewsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Reviews</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See what our clients say about working with NextPhase IT
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="h-16 w-16 relative">
                    <Image
                      src={testimonial.logo}
                      alt={`${testimonial.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{testimonial.content}</p>
                <div>
                  <h3 className="font-semibold text-primary">{testimonial.name}</h3>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave a Review Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-primary mb-6">
              Share Your Experience
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We value your feedback and would love to hear about your experience
              working with NextPhase IT
            </p>
            <div className="space-y-4">
              <a
                href="mailto:reviews@nextphaseit.org"
                className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                Leave a Review
              </a>
              <p className="text-gray-500">
                Or share your experience on{' '}
                <a
                  href="https://g.page/r/nextphaseit/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/90"
                >
                  Google Reviews
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-primary mb-6">
              Ready to Experience Our Service?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book a free discovery call to discuss how we can help your business
            </p>
            <Link
              href="/book"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Book a Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 