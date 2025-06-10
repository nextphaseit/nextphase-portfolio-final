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
    clientName: "Inner Clarity INC",
    logo: "/images/inner-clarity-logo.png",
    challenge: "Inner Clarity INC needed a reliable IT partner to handle their website hosting and security needs while they focused on growing their business.",
    solution: "NextPhase IT implemented a comprehensive security solution including regular security audits, secure hosting infrastructure, and 24/7 monitoring.",
    result: "Inner Clarity INC now enjoys peace of mind with their IT infrastructure, allowing them to focus on their core business operations.",
    quote: "NextPhase IT has been excellent for our website hosting and security consults. Their proactive approach to security has given us confidence in our digital operations."
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