import { Chatbot } from "@/components/chatbot"

export default function AboutPage() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About NextPhase IT</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Your trusted technology partner, delivering innovative solutions and expert support to help your business
              thrive.
            </p>
          </div>
        </div>

        {/* Rest of the existing content goes here */}
        <div className="container mx-auto px-4 py-16">{/* Move all existing content inside this container */}</div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </>
  )
}
