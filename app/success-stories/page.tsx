"use client"

import { Navbar } from "@/components/navbar"
import Image from "next/image"
import { motion } from "framer-motion"

interface SuccessStory {
  clientName: string
  logo: string
  challenge: string
  solution: string
  result: string
  quote: string
}

const successStories: SuccessStory[] = [
  {
    clientName: "Strokes of Faith",
    logo: "/assets/logos/strokes-of-faith-logo.png",
    challenge: "Strokes of Faith needed a modern, easy-to-manage website with integrated booking and payment features to streamline their art business.",
    solution: "NextPhase IT designed and hosted a custom website, integrated a booking system, and automated payment processing for seamless client experiences.",
    result: "Strokes of Faith now enjoys a professional online presence and efficient client management, freeing up more time for creativity.",
    quote: "NextPhase IT made our website and booking system work beautifully — they truly brought our vision to life."
  },
  {
    clientName: "Lu's Kitchen",
    logo: "/assets/logos/lus-kitchen-logo.png",
    challenge: "Lu's Kitchen wanted to boost their online visibility and streamline business communications with a fresh website and professional email setup.",
    solution: "NextPhase IT redesigned their website, set up business email, and optimized the site for search engines to attract more customers.",
    result: "Lu's Kitchen now benefits from increased web traffic, improved communication, and a strong digital brand.",
    quote: "Our new website gives us so much more visibility. NextPhase IT was fantastic to work with."
  },
  {
    clientName: "TruFix Repair",
    logo: "/assets/logos/trufix-repair-logo.png",
    challenge: "TruFix Repair needed secure, reliable email and compliance tools to support their growing tech repair business.",
    solution: "NextPhase IT implemented Microsoft 365, managed business email, and configured security and compliance features for peace of mind.",
    result: "TruFix Repair now has robust communication tools and meets industry security standards, helping them serve clients better.",
    quote: "Thanks to NextPhase IT, we now have secure email and great client communication tools in place."
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] text-[#222222]">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">
              Success Stories
            </h1>
            <p className="text-xl text-[#555555]">
              See how we've helped businesses transform their IT infrastructure
            </p>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center justify-center mb-8">
                    <Image
                      src={story.logo}
                      alt={`${story.clientName} logo`}
                      width={200}
                      height={80}
                      className="h-16 w-auto object-contain"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1E88E5] mb-2">Challenge</h3>
                      <p className="text-[#555555]">{story.challenge}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#1E88E5] mb-2">Solution</h3>
                      <p className="text-[#555555]">{story.solution}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#1E88E5] mb-2">Result</h3>
                      <p className="text-[#555555]">{story.result}</p>
                    </div>

                    <div className="bg-[#F9FAFB] p-6 rounded-lg">
                      <blockquote className="text-[#555555] italic">
                        "{story.quote}"
                      </blockquote>
                      <p className="mt-4 font-semibold text-[#1E88E5]">
                        — {story.clientName}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  )
} 