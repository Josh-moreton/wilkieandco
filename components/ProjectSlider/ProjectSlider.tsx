"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"

interface Project {
  id: string
  title: string
  description: string
  image?: string
  category: string
  completedYear?: number
}

interface ProjectSliderProps {
  projects?: Project[]
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Modern Office Complex",
    description: "State-of-the-art commercial building with sustainable design and cutting-edge technology integration.",
    category: "Commercial",
    completedYear: 2023,
    image: "/projects/office-complex.jpg"
  },
  {
    id: "2", 
    title: "Luxury Residential Estate",
    description: "Premium residential development featuring custom homes with contemporary architecture and premium finishes.",
    category: "Residential",
    completedYear: 2023,
    image: "/projects/residential-estate.jpg"
  },
  {
    id: "3",
    title: "Industrial Warehouse Facility",
    description: "Large-scale warehouse and distribution center with advanced logistics systems and energy-efficient design.",
    category: "Industrial",
    completedYear: 2022,
    image: "/projects/warehouse.jpg"
  },
  {
    id: "4",
    title: "Healthcare Center Renovation",
    description: "Complete modernization of medical facility with patient-centered design and latest healthcare technology.",
    category: "Healthcare",
    completedYear: 2022,
    image: "/projects/healthcare.jpg"
  },
  {
    id: "5",
    title: "Educational Campus Expansion", 
    description: "Multi-building educational complex designed for modern learning environments and student collaboration.",
    category: "Education",
    completedYear: 2021,
    image: "/projects/education.jpg"
  }
]

export function ProjectSlider({ projects = defaultProjects }: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  // Auto-play functionality
  useState(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  })

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our portfolio of successful construction projects across various sectors, 
            showcasing our commitment to quality and innovation.
          </p>
        </motion.div>

        <div className="relative">
          {/* Main slider container */}
          <div className="relative overflow-hidden rounded-xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, _index) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <Card className="mx-4 h-[400px] flex flex-col md:flex-row overflow-hidden">
                    {/* Project image placeholder */}
                    <div className="md:w-1/2 h-48 md:h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      {project.image ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </>
                      ) : (
                        <div className="text-white text-center">
                          <div className="text-4xl mb-2">🏗️</div>
                          <p className="text-sm opacity-80">{project.category}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Project content */}
                    <div className="md:w-1/2 p-6 flex flex-col justify-center">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                            {project.category}
                          </span>
                          {project.completedYear && (
                            <span className="text-sm text-gray-500">
                              {project.completedYear}
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-orange-600 scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}