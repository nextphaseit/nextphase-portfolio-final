import { Navbar } from "@/components/navbar"

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-[#222222] mb-4">
            Schedule Your Free Consultation
          </h1>
          <p className="text-xl text-[#555555]">
            Pick a time that works for you — no pressure, just helpful advice.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Replace with your actual Microsoft Bookings or Calendly embed code */}
          <div className="w-full aspect-[4/3] bg-[#F9FAFB] rounded-lg shadow-lg">
            <iframe
              src="YOUR_BOOKING_EMBED_URL"
              className="w-full h-full rounded-lg"
              frameBorder="0"
            />
          </div>
        </div>
      </div>
    </main>
  )
} 