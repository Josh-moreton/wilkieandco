"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
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
    title: "Bespoke Kitchen Installation",
    category: "Kitchen Joinery",
    description:
      "Complete kitchen transformation in Morningside featuring handcrafted oak cabinets, granite worktops, and integrated appliances tailored to the family's lifestyle.",
    image: "/api/placeholder/600/400",
    features: ["Handcrafted Oak", "Granite Worktops", "Bespoke Design"],
  },
  {
    id: 2,
    title: "Victorian Home Built-ins",
    category: "Fitted Furniture",
    description:
      "Custom built-in wardrobes and shelving for a Victorian terrace in Stockbridge, designed to maximize space while respecting the home's period character.",
    image: "/api/placeholder/600/400",
    features: ["Period Sensitive", "Space Maximizing", "Custom Wardrobes"],
  },
  {
    id: 3,
    title: "Garden Room Extension",
    category: "Home Extension",
    description:
      "Beautiful garden room addition in Bruntsfield with oak beams, bi-fold doors, and underfloor heating - perfect for year-round enjoyment.",
    image: "/api/placeholder/600/400",
    features: ["Oak Beams", "Bi-fold Doors", "Underfloor Heating"],
  },
  {
    id: 4,
    title: "Loft Conversion",
    category: "Home Renovation",
    description:
      "Complete loft conversion in Leith creating a master bedroom suite with fitted wardrobes, dormer windows, and a modern en-suite bathroom.",
    image: "/api/placeholder/600/400",
    features: ["Dormer Windows", "En-suite Bathroom", "Fitted Wardrobes"],
  },
  {
    id: 5,
    title: "Home Office Makeover",
    category: "Interior Joinery",
    description:
      "Transformation of an unused bedroom in New Town into a stunning home office with built-in desk, bookcases, and storage solutions.",
    image: "/api/placeholder/600/400",
    features: ["Built-in Desk", "Custom Bookcases", "Storage Solutions"],
  },
]

export function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Auto-advance every 3 seconds on mobile
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
          <p className="mx-auto hidden max-w-3xl text-xl text-slate-300 md:block">
            Explore our portfolio of completed joinery projects across Edinburgh, showcasing our expertise in bespoke
            kitchens, built-in furniture, and home renovations.
          </p>
        </motion.div>

        {/* Main Slider */}
        <div className="relative md:min-h-[60vh]">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Card className="border-0 shadow-2xl">
                  <CardContent className="p-0">
                    {/* Mobile: Image Only */}
                    <div className="md:hidden">
                      <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-700">
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-500 to-slate-700">
                          <div className="text-center text-white">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-white/20">
                              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                              </svg>
                            </div>
                            <p className="text-lg font-medium">{projects[currentIndex]?.title}</p>
                            <p className="text-sm opacity-80">Project Image</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Full Content */}
                    <div className="hidden gap-0 md:grid md:min-h-[50vh] lg:grid-cols-2">
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden bg-slate-200 sm:h-64 lg:h-full dark:bg-slate-700">
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-500 to-slate-700">
                          <div className="text-center text-white">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-white/20">
                              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                              </svg>
                            </div>
                            <p className="text-lg font-medium">{projects[currentIndex]?.title}</p>
                            <p className="text-sm opacity-80">Project Image</p>
                          </div>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                        <Badge variant="secondary" className="mb-4 w-fit">
                          {projects[currentIndex]?.category}
                        </Badge>

                        <h3 className="mb-4 font-serif text-3xl font-bold lg:text-4xl">
                          {projects[currentIndex]?.title}
                        </h3>

                        <p className="mb-6 text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
                          {projects[currentIndex]?.description}
                        </p>

                        <div className="mb-8">
                          <h4 className="mb-3 text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-white">
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

                        <Button className="w-fit" size="lg">
                          View Work Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
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
