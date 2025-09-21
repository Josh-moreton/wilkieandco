"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Project {
  id: number
  image: string
  alt: string
}

interface ProjectWithPosition extends Project {
  position: 'left' | 'center' | 'right'
}

const projects: Project[] = [
  {
    id: 1,
    image: "/images/IMG_0045.jpeg",
    alt: "Bespoke Kitchen Installation",
  },
  {
    id: 2,
    image: "/images/IMG_0048.jpeg",
    alt: "Victorian Home Built-ins",
  },
  {
    id: 3,
    image: "/images/IMG_0483.jpeg",
    alt: "Garden Room Extension",
  },
  {
    id: 4,
    image: "/images/IMG_0643.jpeg",
    alt: "Loft Conversion",
  },
  {
    id: 5,
    image: "/images/IMG_1182.jpeg",
    alt: "Home Office Makeover",
  },
  {
    id: 6,
    image: "/images/IMG_1490.jpeg",
    alt: "Custom Wardrobes",
  },
  {
    id: 7,
    image: "/images/IMG_1491.jpeg",
    alt: "Bathroom Renovation",
  },
  {
    id: 8,
    image: "/images/IMG_1495.jpeg",
    alt: "Fitted Shelving",
  },
  {
    id: 9,
    image: "/images/IMG_1497.jpeg",
    alt: "Kitchen Island",
  },
  {
    id: 10,
    image: "/images/IMG_1498.jpeg",
    alt: "Dining Room Built-ins",
  },
  {
    id: 11,
    image: "/images/IMG_1499.jpeg",
    alt: "Study Conversion",
  },
  {
    id: 12,
    image: "/images/IMG_1500.jpeg",
    alt: "Entrance Hall Storage",
  },
  {
    id: 13,
    image: "/images/IMG_2307.jpeg",
    alt: "Master Bedroom Suite",
  },
  {
    id: 14,
    image: "/images/IMG_3198.jpeg",
    alt: "Library Installation",
  },
  {
    id: 15,
    image: "/images/IMG_3424.jpeg",
    alt: "Open Plan Living",
  },
  {
    id: 16,
    image: "/images/IMG_4314.jpeg",
    alt: "Period Property Restoration",
  },
  {
    id: 17,
    image: "/images/IMG_5188.jpeg",
    alt: "Modern Kitchen Design",
  },
  {
    id: 18,
    image: "/images/IMG_5189.jpeg",
    alt: "Utility Room Organization",
  },
  {
    id: 19,
    image: "/images/IMG_5479.jpeg",
    alt: "Guest Bedroom Conversion",
  },
  {
    id: 20,
    image: "/images/IMG_5482.jpeg",
    alt: "Basement Workshop",
  },
]

export function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Auto-advance every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0]?.clientX || 0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0]?.clientX || 0)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextProject()
    } else if (isRightSwipe) {
      prevProject()
    }
  }

  // Get visible projects for desktop grid (center + adjacent)
  const getVisibleProjects = (): ProjectWithPosition[] => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length
    const nextIndex = (currentIndex + 1) % projects.length
    
    const currentProject = projects[currentIndex]
    const prevProject = projects[prevIndex]
    const nextProject = projects[nextIndex]
    
    if (!currentProject || !prevProject || !nextProject) {
      return []
    }
    
    return [
      { ...currentProject, position: 'center' as const },
      { ...prevProject, position: 'left' as const },
      { ...nextProject, position: 'right' as const },
    ]
  }

  return (
    <section className="relative min-h-[100dvh] w-screen bg-transparent text-white flex items-center">
      <div className="mx-auto w-full max-w-[min(1200px,92vw)] px-5 py-6 sm:px-6 sm:py-10 lg:py-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 text-center md:mb-12"
        >
          <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">Our Recent Work</h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            Explore our portfolio of completed joinery projects across Edinburgh
          </p>
        </motion.div>

        {/* Mobile Layout - Single Image Carousel */}
        <div className="md:hidden">
          <div
            className="relative h-64 overflow-hidden rounded-2xl sm:h-80"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={projects[currentIndex]?.image}
                alt={projects[currentIndex]?.alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Layout - 3 Images Grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            {getVisibleProjects().map((project, index) => (
              <motion.div
                key={`${project.id}-${project.position}`}
                className="relative h-64 overflow-hidden rounded-2xl lg:h-80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Image 
                  src={project.image} 
                  alt={project.alt} 
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Ring highlight for center image */}
                {project.position === 'center' && (
                  <div className="absolute inset-0 ring-2 ring-white/30 rounded-2xl" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Desktop only */}
        <button
          onClick={prevProject}
          className="absolute top-1/2 left-2 md:left-6 lg:left-12 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 z-10"
          aria-label="Previous project"
        >
          <svg
            className="h-5 w-5 text-slate-600 dark:text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextProject}
          className="absolute top-1/2 right-2 md:right-6 lg:right-12 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 z-10"
          aria-label="Next project"
        >
          <svg
            className="h-5 w-5 text-slate-600 dark:text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="mt-6 flex justify-center space-x-2 sm:mt-8">
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => goToProject(projects.findIndex((p) => p.id === proj.id))}
              className={`h-3 w-3 rounded-full transition-all ${
                projects.findIndex((p) => p.id === proj.id) === currentIndex
                  ? "scale-125 bg-slate-900 dark:bg-white"
                  : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
              }`}
              aria-label={`Go to project ${proj.id}`}
            />
          ))}
        </div>

        {/* Project Count */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {currentIndex + 1} of {projects.length}
          </p>
        </div>
      </div>
    </section>
  )
}
