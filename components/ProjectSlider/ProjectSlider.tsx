"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Badge, Button, Card, CardContent } from "@/components/ui"

interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  features: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Family Home",
    category: "Residential",
    description: "A contemporary 4-bedroom home featuring open-plan living, sustainable materials, and energy-efficient design.",
    image: "/api/placeholder/600/400",
    features: ["Energy Efficient", "Open Plan", "Sustainable Materials"]
  },
  {
    id: 2,
    title: "Downtown Office Complex",
    category: "Commercial",
    description: "15-story office building with modern amenities, green rooftop, and state-of-the-art HVAC systems.",
    image: "/api/placeholder/600/400",
    features: ["LEED Certified", "Smart Building", "Green Roof"]
  },
  {
    id: 3,
    title: "Heritage Restoration",
    category: "Restoration",
    description: "Careful restoration of a 1920s heritage building, preserving historical character while modernizing infrastructure.",
    image: "/api/placeholder/600/400",
    features: ["Heritage Preservation", "Modern Systems", "Historical Accuracy"]
  },
  {
    id: 4,
    title: "Industrial Warehouse",
    category: "Industrial",
    description: "50,000 sq ft warehouse facility with automated systems, high-bay lighting, and flexible space design.",
    image: "/api/placeholder/600/400",
    features: ["Automated Systems", "High-Bay Design", "Flexible Space"]
  },
  {
    id: 5,
    title: "Luxury Condominium",
    category: "Residential",
    description: "High-end 20-unit condominium building with premium finishes, concierge services, and panoramic city views.",
    image: "/api/placeholder/600/400",
    features: ["Luxury Finishes", "Concierge", "City Views"]
  }
]

export function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="bg-transparent min-h-[100dvh] w-screen flex items-center py-10 sm:py-16 lg:py-24 text-white">
      <div className="mx-auto w-full max-w-[min(1200px,92vw)] px-5 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-serif mb-4 text-white">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore our portfolio of completed projects, showcasing our expertise across residential, commercial, and industrial construction.
          </p>
        </motion.div>

        {/* Main Slider */}
        <div className="relative min-h-[60vh]">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="border-0 shadow-2xl">
                  <CardContent className="p-0">
                    <div className="grid gap-0 min-h-[50vh] lg:grid-cols-2">
                      {/* Project Image */}
                      <div className="relative h-56 sm:h-72 lg:h-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center">
                              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                              </svg>
                            </div>
                            <p className="text-lg font-medium">{projects[currentIndex]?.title}</p>
                            <p className="text-sm opacity-80">Project Image</p>
                          </div>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                        <Badge variant="secondary" className="w-fit mb-4">
                          {projects[currentIndex]?.category}
                        </Badge>
                        
                        <h3 className="text-3xl lg:text-4xl font-bold font-serif mb-4">
                          {projects[currentIndex]?.title}
                        </h3>
                        
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                          {projects[currentIndex]?.description}
                        </p>
                        
                        <div className="mb-8">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
                            Key Features
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {projects[currentIndex]?.features.map((feature) => (
                              <Badge key={feature} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-fit"
                          size="lg"
                        >
                          View Project Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            aria-label="Previous project"
          >
            <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextProject}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            aria-label="Next project"
          >
            <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
  <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => goToProject(projects.findIndex(p => p.id === proj.id))}
              className={`w-3 h-3 rounded-full transition-all ${
                projects.findIndex(p => p.id === proj.id) === currentIndex
                  ? "bg-slate-900 dark:bg-white scale-125"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
              }`}
              aria-label={`Go to project ${proj.id}`}
            />
          ))}
        </div>

        {/* Project Count */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {currentIndex + 1} of {projects.length}
          </p>
        </div>
      </div>
    </section>
  )
}