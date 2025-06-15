import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion/dist/framer-motion"

const stories = [
  {
    client: "Strokes of Faith",
    logo: "/assets/logos/strokes-of-faith-logo.png",
    quote: "NextPhase IT made our website and booking system work beautifully — they truly brought our vision to life.",
    services: [
      "Website creation and hosting",
      "Booking system integration",
      "Payment automation"
    ],
    alt: "Strokes of Faith logo"
  },
  {
    client: "Lu's Kitchen",
    logo: "/assets/logos/lus-kitchen-logo.png",
    quote: "Our new website gives us so much more visibility. NextPhase IT was fantastic to work with.",
    services: [
      "Website redesign and hosting",
      "Business email setup",
      "SEO optimization"
    ],
    alt: "Lu's Kitchen logo"
  },
  {
    client: "TruFix Repair",
    logo: "/assets/logos/trufix-repair-logo.png",
    quote: "Thanks to NextPhase IT, we now have secure email and great client communication tools in place.",
    services: [
      "Microsoft 365 setup",
      "Business email management",
      "Security and compliance configuration"
    ],
    alt: "TruFix Repair logo"
  }
]

export function SuccessStoriesSection() {
  return (
    <section className="py-20 bg-[#F9FAFB]" aria-labelledby="success-stories-heading">
      <div className="container mx-auto px-4">
        <h2 id="success-stories-heading" className="text-3xl font-bold text-center mb-12">Success Stories</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {stories.map((story, idx) => (
            <motion.div
              key={story.client}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center" style={{ minHeight: 96, minWidth: 120 }}>
                  <Image
                    src={story.logo}
                    alt={story.alt}
                    width={160}
                    height={96}
                    className="h-24 w-auto object-contain"
                    priority={idx === 0}
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1E88E5]">{story.client}</h3>
              <blockquote className="italic text-[#555555] mb-4">"{story.quote}"</blockquote>
              <ul className="text-[#555555] text-sm mb-2 space-y-1">
                {story.services.map((service, i) => (
                  <li key={i}>• {service}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-12">
          <Link href="/success-stories">
            <button className="bg-[#1E88E5] hover:bg-[#0A4DA1] text-white font-semibold px-8 py-4 rounded-lg shadow transition-colors text-lg">
              See All Success Stories
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
} 