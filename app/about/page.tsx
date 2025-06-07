"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Users, Target, Award, Heart, Mail, Download } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-primary-hover text-surface py-20 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About NextPhase IT</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Your trusted technology partner, delivering innovative solutions and expert support to help your business
              thrive.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Company Overview */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 text-text-primary">Our Story</h2>
              <p className="text-text-secondary mb-6 text-lg leading-relaxed">
                NextPhase IT was founded with a simple mission: to make enterprise-level technology accessible to small
                and medium-sized businesses. We believe that every business, regardless of size, deserves secure,
                scalable, and efficient IT solutions.
              </p>
              <p className="text-text-secondary mb-12 text-lg leading-relaxed">
                Our team combines years of experience in web development, cloud infrastructure, cybersecurity, and
                business automation to deliver comprehensive solutions that help our clients focus on what they do best
                – running their business.
              </p>
              <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-text-secondary">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">99%</div>
                  <div className="text-text-secondary">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-text-primary">Client-Focused</h3>
                <p className="text-text-secondary">
                  Every solution is tailored to meet your specific business needs and goals.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-text-primary">Results-Driven</h3>
                <p className="text-text-secondary">
                  We measure success by the tangible improvements we bring to your business.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-text-primary">Excellence</h3>
                <p className="text-text-secondary">
                  We maintain the highest standards in everything we do, from code to customer service.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-text-primary">Integrity</h3>
                <p className="text-text-secondary">
                  Honest communication and transparent processes build lasting partnerships.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">Meet Our Team</h2>
            <div className="max-w-2xl mx-auto">
              <div className="bg-surface border border-border-color rounded-lg shadow-md p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 text-text-primary">Adrian Knight</h3>
                  <p className="text-primary mb-4 font-medium">Lead Web & IT Solutions Consultant</p>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    With over a decade of experience in web development and IT infrastructure, Adrian leads our team in
                    delivering innovative solutions that drive business growth. Specializing in cloud migrations,
                    security audits, and custom web applications.
                  </p>
                  <div className="flex justify-center">
                    <a
                      href="mailto:adrian.knight@nextphaseit.org"
                      className="text-primary hover:text-primary-hover transition-colors font-medium"
                    >
                      adrian.knight@nextphaseit.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NEW CLIENT CONTACT FORM SECTION */}
          <section id="new-client-form" className="mb-20">
            <div className="bg-blue-50 border border-border-color rounded-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">📋</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-text-primary">Ready to Get Started?</h2>
                <p className="text-text-secondary max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                  Complete our New Client Contact Form to begin your onboarding process. Our team will review your
                  information and contact you within 24 hours to discuss your specific needs.
                </p>

                {/* Primary CTA Button */}
                <Button
                  size="lg"
                  asChild
                  className="bg-primary hover:bg-primary-hover text-surface font-semibold px-8 py-4 text-lg"
                >
                  <a
                    href="https://forms.cloud.microsoft/r/QWtKpJuvTg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <span className="text-xl">📨</span>
                    Fill Out Form
                  </a>
                </Button>

                <p className="text-sm text-text-muted mt-4">
                  Form opens in a new tab • Submission confirmation sent via email
                </p>
              </div>

              <div className="bg-surface/50 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-text-primary">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  What happens after you submit the form?
                </h3>
                <ul className="space-y-3 text-text-secondary">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-medium">1.</span>
                    You'll receive an immediate confirmation email with a PDF copy of your submission
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-medium">2.</span>
                    Your information is securely stored in our client intake system
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-medium">3.</span>A NextPhase IT consultant will review your
                    information within 24 hours
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-medium">4.</span>
                    We'll schedule an initial consultation to discuss your specific needs and goals
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-medium">5.</span>
                    You'll receive a customized proposal tailored to your business requirements
                  </li>
                </ul>
              </div>

              {/* Alternative Options */}
              <div className="mt-8 pt-6 border-t border-border-color">
                <p className="text-center text-text-secondary mb-4">Prefer other contact methods?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="border-primary text-primary hover:bg-primary hover:text-surface"
                  >
                    <a href="mailto:info@nextphaseit.org">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Us Directly
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="border-primary text-primary hover:bg-primary hover:text-surface"
                  >
                    <a href="tel:+19843109533">
                      <span className="mr-2">📞</span>
                      Call (984) 310-9533
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="border-primary text-primary hover:bg-primary hover:text-surface"
                  >
                    <Link href="/form">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF Form
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">Why Choose NextPhase IT?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">24/7</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">Round-the-Clock Support</h3>
                <p className="text-text-secondary">
                  Our support team is available whenever you need assistance, ensuring your business never stops.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">Enterprise Security</h3>
                <p className="text-text-secondary">
                  Bank-level security protocols protect your data and ensure compliance with industry standards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">Rapid Deployment</h3>
                <p className="text-text-secondary">
                  Get up and running quickly with our streamlined implementation process and proven methodologies.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-primary text-surface rounded-xl p-12 shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Transform Your Business Today</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Join the growing number of businesses that trust NextPhase IT to power their digital transformation.
                Let's discuss how we can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-surface text-primary hover:bg-gray-100">
                  <Link href="/pricing">View Our Packages</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-surface text-surface hover:bg-surface hover:text-primary"
                >
                  <Link href="/contact">Contact Us Today</Link>
                </Button>
              </div>
            </div>
          </section>
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
