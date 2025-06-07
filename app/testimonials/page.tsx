import { Chatbot } from "@/components/chatbot"

export default function TestimonialsPage() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Hear what our satisfied clients have to say about our IT services and support.
            </p>
          </div>
        </div>

        {/* Rest of the existing content */}
        <div className="container mx-auto px-4 py-16">{/* Move all existing testimonials content here */}</div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </>
  )
}
