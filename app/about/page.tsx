"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Download, Users, Target, Award, Heart, FileText, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function AboutPage() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [formData, setFormData] = useState<any>(null)

  const handleDownloadPDF = () => {
    // Create a link to download the PDF form
    const link = document.createElement("a")
    link.href = "/form"
    link.target = "_blank"
    link.click()
  }

  // Function to handle form submission message
  const handleFormSubmitted = (data: any) => {
    setFormData(data)
    setIsFormSubmitted(true)
  }

  // Function to handle form message from iframe
  const handleFormMessage = (event: MessageEvent) => {
    // Check if the message is from Microsoft Forms
    if (event.origin.includes("forms.office.com") || event.origin.includes("forms.microsoft.com")) {
      if (event.data && event.data.formSubmitted) {
        handleFormSubmitted(event.data.formData)
      }
    }
  }

  // Add event listener for form submission
  if (typeof window !== "undefined") {
    window.addEventListener("message", handleFormMessage)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-primary">About</span> NextPhase IT
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Empowering small businesses with cutting-edge technology solutions that drive growth, enhance security, and
            streamline operations.
          </p>
        </section>

        {/* Company Overview */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-400 mb-6">
                NextPhase IT was founded with a simple mission: to make enterprise-level technology accessible to small
                and medium-sized businesses. We believe that every business, regardless of size, deserves secure,
                scalable, and efficient IT solutions.
              </p>
              <p className="text-gray-400 mb-6">
                Our team combines years of experience in web development, cloud infrastructure, cybersecurity, and
                business automation to deliver comprehensive solutions that help our clients focus on what they do best
                – running their business.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99%</div>
                  <div className="text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/about-img.png"
                alt="NextPhase IT Team"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card border-primary/20">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Client-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center">
                  Every solution is tailored to meet your specific business needs and goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20">
              <CardHeader className="text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Results-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center">
                  We measure success by the tangible improvements we bring to your business.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20">
              <CardHeader className="text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center">
                  We maintain the highest standards in everything we do, from code to customer service.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center">
                  Honest communication and transparent processes build lasting partnerships.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-primary/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/lucien.jpg"
                      alt="Adrian Knight"
                      width={200}
                      height={200}
                      className="rounded-full"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">Adrian Knight</h3>
                    <p className="text-primary mb-4">Lead Web & IT Solutions Consultant</p>
                    <p className="text-gray-400 mb-4">
                      With over a decade of experience in web development and IT infrastructure, Adrian leads our team
                      in delivering innovative solutions that drive business growth. Specializing in cloud migrations,
                      security audits, and custom web applications.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                      <a href="mailto:adrian.knight@nextphaseit.org" className="text-primary hover:underline">
                        adrian.knight@nextphaseit.org
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* NEW CLIENT CONTACT FORM SECTION */}
        <section id="new-client-form" className="mb-16">
          <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                  Fill out our New Client Contact Form to begin your journey with NextPhase IT. Our team will review
                  your information and contact you within 24 hours to discuss your specific needs.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => setIsFormDialogOpen(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    New Client Contact Form
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleDownloadPDF}
                    className="border-primary text-primary hover:bg-primary hover:text-black"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Form
                  </Button>
                </div>
              </div>

              <div className="bg-black/30 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  What happens after you submit the form?
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">1.</span>
                    You'll receive an immediate confirmation email with a PDF copy of your submission
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">2.</span>A NextPhase IT consultant will review your information
                    within 24 hours
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">3.</span>
                    We'll schedule an initial consultation to discuss your specific needs and goals
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">4.</span>
                    You'll receive a customized proposal tailored to your business requirements
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose NextPhase IT?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">24/7</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Round-the-Clock Support</h3>
              <p className="text-gray-400">
                Our support team is available whenever you need assistance, ensuring your business never stops.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
              <p className="text-gray-400">
                Bank-level security protocols protect your data and ensure compliance with industry standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Rapid Deployment</h3>
              <p className="text-gray-400">
                Get up and running quickly with our streamlined implementation process and proven methodologies.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Transform Your Business Today</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join the growing number of businesses that trust NextPhase IT to power their digital transformation.
                Let's discuss how we can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/pricing">View Our Packages</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary text-primary hover:bg-primary hover:text-black"
                >
                  <Link href="/#contact">Contact Us Today</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Microsoft Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-4xl h-[90vh] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>New Client Contact Form</DialogTitle>
            <DialogDescription>Please fill out the form below to get started with NextPhase IT</DialogDescription>
          </DialogHeader>

          {isFormSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-500 mb-6">
                Your form has been successfully submitted. We'll be in touch within 24 hours.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={() => window.open("/api/generate-pdf?formId=" + formData?.id, "_blank")}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Copy
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsFormSubmitted(false)
                    setIsFormDialogOpen(false)
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full">
              <iframe
                src="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__jVeO49UMkZUNzBHVDNTWTVLNkdTSzJTWkFXWEJGWS4u&embed=true"
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="rounded-lg"
                title="NextPhase IT Client Contact Form"
              >
                Loading form...
              </iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
