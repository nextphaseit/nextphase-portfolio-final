import { Button } from "@/components/ui/button"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Testimonials } from "@/components/testimonials"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"
import { Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Background Logo */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <Image
            src="/images/nextphase-logo.png"
            alt=""
            width={800}
            height={600}
            className="w-auto h-96 object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-20">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                <span className="block text-primary">Web & IT Solutions Consultant.</span>
              </h1>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                I serve as a Web & IT Solutions Consultant, for NextPhase IT helping small businesses build secure,
                scalable websites integrated with modern cloud tools.
              </p>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary hover:bg-primary/90 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-black transition-all duration-300"
                >
                  <a href="https://forms.cloud.microsoft/r/5Ad9WuMA3G" target="_blank" rel="noopener noreferrer">
                    Get Started
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <Stats />
        </section>

        {/* Other Sections */}
        <div className="container mx-auto px-4">
          <Services />
          <Projects />
          <Skills />
          <Testimonials />

          {/* Contact Section */}
          <section className="py-16" id="contact">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Let's Get In Touch</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Have a project in mind or want to discuss potential opportunities? I'm just a message away.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Phone className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-gray-400">+1 984-310-9533</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Mail className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-gray-400">support@nextphaseit.org</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <MapPin className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-gray-400">Clayton, NC</p>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary"
                  />
                  <textarea
                    placeholder="Message"
                    rows={6}
                    className="bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary"
                  />
                  <Button size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-card mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">NextPhase IT</h3>
                <p className="text-gray-400">
                  NextPhase IT is a technology consulting company dedicated to helping small businesses thrive through
                  smart, scalable solutions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>About</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Technical Support & Training</li>
                  <li>Workflow Automation</li>
                  <li>Custom Web Development</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>support@nextphaseit.org</li>
                  <li>+1 984-310-9533</li>
                  <li>Clayton, NC</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>© 2024 NextPhase IT. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </main>
  )
}
