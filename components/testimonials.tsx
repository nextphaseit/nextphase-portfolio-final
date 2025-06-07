import { FaStar } from "react-icons/fa"

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      quote: "This is an amazing product! I highly recommend it.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      quote: "I love the quality and the customer service is excellent.",
      rating: 4,
    },
    {
      id: 3,
      name: "Peter Jones",
      quote: "Great value for the price. I will definitely buy again.",
      rating: 5,
    },
  ]

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8 text-primary">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="bg-surface rounded-lg shadow-md p-6 border border-color">
              <p className="text-secondary italic mb-4">"{testimonial.quote}"</p>
              <h4 className="text-primary font-semibold">{testimonial.name}</h4>
              <div className="flex justify-center mt-2">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <FaStar key={index} className="text-accent" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
