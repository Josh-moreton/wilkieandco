"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui"

interface TeamMember {
  id: number
  name: string
  title: string
  image: string
  isFounder?: boolean
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Euan Wilkie",
    title: "Founder & Master Craftsman",
    image: "/images/IMG_0045.jpeg", // Using placeholder - should be replaced with actual photo
    isFounder: true,
  },
  {
    id: 2,
    name: "James Morrison",
    title: "Senior Joiner",
    image: "/images/IMG_0048.jpeg", // Using placeholder - should be replaced with actual photo
  },
  {
    id: 3,
    name: "Sarah Campbell",
    title: "Project Manager",
    image: "/images/IMG_0483.jpeg", // Using placeholder - should be replaced with actual photo
  },
  {
    id: 4,
    name: "David Thomson",
    title: "Apprentice Joiner",
    image: "/images/IMG_0643.jpeg", // Using placeholder - should be replaced with actual photo
  },
  {
    id: 5,
    name: "Michael Grant",
    title: "Finishing Specialist",
    image: "/images/IMG_1182.jpeg", // Using placeholder - should be replaced with actual photo
  },
  {
    id: 6,
    name: "Emma Reid",
    title: "Design Consultant",
    image: "/images/IMG_1490.jpeg", // Using placeholder - should be replaced with actual photo
  },
]

export function MeetTheTeam() {
  const founder = teamMembers.find(member => member.isFounder)
  const otherMembers = teamMembers.filter(member => !member.isFounder)

  return (
    <section className="relative flex min-h-[100dvh] w-screen items-center bg-transparent text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center sm:mb-16"
        >
          <h2 className="mb-4 font-serif text-4xl font-bold text-white lg:text-5xl">Meet the Team</h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            Get to know the skilled craftspeople behind Wilkie & Co. Our experienced team brings passion, expertise, and 
            attention to detail to every project we undertake.
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {/* Founder Profile - Larger and Prominent */}
          {founder && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Card className="w-full max-w-lg border-yellow-500/30 bg-slate-800/80 shadow-2xl backdrop-blur">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-yellow-500/50">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  </div>
                  <h3 className="mb-2 font-serif text-2xl font-bold text-white">{founder.name}</h3>
                  <p className="mb-4 text-lg font-semibold text-yellow-500">{founder.title}</p>
                  <p className="text-slate-300 leading-relaxed">
                    Leading Wilkie & Co with decades of experience in traditional and modern joinery techniques, 
                    Euan brings unmatched expertise and craftsmanship to every project.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Team Grid */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center font-serif text-2xl font-semibold text-white md:text-3xl"
            >
              Our Skilled Team
            </motion.h3>

            {/* Desktop: 4x4 Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-slate-600/50 bg-slate-800/80 shadow-lg backdrop-blur transition-transform hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-slate-600">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      </div>
                      <h4 className="mb-1 font-semibold text-white">{member.name}</h4>
                      <p className="text-sm text-slate-400">{member.title}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Mobile: Horizontal Scrolling */}
            <div className="md:hidden">
              <div className="-mx-4">
                <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 pb-4">
                  {otherMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex-none w-[75%] snap-start min-w-0 first:ml-4 last:mr-4"
                    >
                      <Card className="h-full border-slate-600/50 bg-slate-800/80 shadow-lg backdrop-blur min-w-0">
                        <CardContent className="p-5 text-center min-w-0">
                          <div className="mb-4 flex justify-center">
                            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-slate-600">
                              <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                          </div>
                          <h4 className="mb-1 font-semibold text-white">{member.name}</h4>
                          <p className="text-sm text-slate-400">{member.title}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}