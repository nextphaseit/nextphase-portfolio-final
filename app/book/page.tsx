import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaPhone } from 'react-icons/fa';

export default function BookPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book a Consultation</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Schedule a free discovery call to discuss your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Booking Instructions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">How to Book</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <FaCalendarAlt className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Choose a Time</h3>
                        <p className="text-gray-600">
                          Select a time that works best for your schedule. We offer flexible
                          booking options throughout the week.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <FaClock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">30-Minute Call</h3>
                        <p className="text-gray-600">
                          Our discovery calls typically last 30 minutes, giving us enough
                          time to understand your needs and discuss potential solutions.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <FaPhone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Phone or Video</h3>
                        <p className="text-gray-600">
                          Choose between a phone call or video conference based on your
                          preference.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-primary mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                      Discussion of your business needs and challenges
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                      Overview of our services and solutions
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                      Initial recommendations and next steps
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                      No-obligation consultation
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Booking Calendar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-bold text-primary mb-6">Schedule Your Call</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://squareup.com/appointments/book/placeholder-link"
                    className="w-full h-[600px] rounded-lg"
                    title="Booking Calendar"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-primary mb-6">
              Need to Contact Us Directly?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Give us a call or send us an email
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <a
                href="tel:+19843109533"
                className="text-accent hover:text-accent/90 text-lg font-medium"
              >
                (984) 310-9533
              </a>
              <a
                href="mailto:hello@nextphaseit.org"
                className="text-accent hover:text-accent/90 text-lg font-medium"
              >
                hello@nextphaseit.org
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 