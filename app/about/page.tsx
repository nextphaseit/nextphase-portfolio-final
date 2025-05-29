"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Download, ExternalLink, Users, Target, Award, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const handleDownloadPDF = () => {
    // Create a link to download the PDF form
    const link = document.createElement("a")
    link.href = "/form"
    link.target = "_blank"
    link.click()
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

        {/* Contact Form Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Ready to transform your business with modern technology solutions? Fill out our contact form below or
              download the PDF version to get started.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <a href="https://forms.cloud.microsoft/r/5Ad9WuMA3G" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Fill Out Online Form
                </a>
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

          {/* Embedded Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">New Client Contact Form</CardTitle>
                <p className="text-center text-gray-400">Complete the form below to start your project consultation</p>
              </CardHeader>
              <CardContent>
                <div className="relative w-full" style={{ height: "800px" }}>
                  <iframe
                    src="https://forms.cloud.microsoft/r/5Ad9WuMA3G"
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

                {/* Fallback for iframe issues */}
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-400 text-center">
                    Having trouble with the form above?
                    <a
                      href="https://forms.cloud.microsoft/r/5Ad9WuMA3G"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-1"
                    >
                      Open in new window
                    </a>
                    {" or "}
                    <button onClick={handleDownloadPDF} className="text-primary hover:underline">
                      download the PDF version
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
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
    </main>
  )
}
