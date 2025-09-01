"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating?: number
}

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Project Manager",
    company: "TechCorp Industries",
    content: "Wilkie & Co transformed our vision into reality with their exceptional attention to detail and professional expertise. The project was completed on time and exceeded our expectations.",
    rating: 5
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Facilities Director",
    company: "Metropolitan Hospital",
    content: "Working with Wilkie & Co on our healthcare facility renovation was seamless. Their understanding of specialized construction requirements and commitment to quality is unmatched.",
    rating: 5
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    role: "Business Owner",
    company: "Rodriguez Manufacturing",
    content: "From initial consultation to project completion, Wilkie & Co demonstrated professionalism and craftsmanship that sets them apart. Highly recommend for any commercial project.",
    rating: 5
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Property Developer", 
    company: "Thompson Estates",
    content: "Wilkie & Co has been our trusted construction partner for multiple residential projects. Their reliability, quality workmanship, and competitive pricing make them our go-to choice.",
    rating: 5
  },
  {
    id: "5",
    name: "Lisa Park",
    role: "CFO",
    company: "GreenSpace Solutions",
    content: "The team at Wilkie & Co delivered an outstanding office renovation that perfectly balanced functionality with modern design. Their project management was exemplary.",
    rating: 5
  },
  {
    id: "6",
    name: "Robert Martinez",
    role: "Operations Manager",
    company: "LogiCorp Warehousing",
    content: "Wilkie & Co completed our warehouse expansion ahead of schedule while maintaining the highest safety standards. Their industrial construction expertise is impressive.",
    rating: 5
  }
]

export function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  }

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from the clients who have trusted us 
            with their most important construction projects.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="h-full"
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex-1 flex flex-col">
                  {/* Rating stars */}
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  {/* Testimonial content */}
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 flex-1 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  
                  {/* Client info */}
                  <div className="border-t pt-4">
                    <div className="flex items-center">
                      {/* Avatar placeholder */}
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      
                      {/* Client details */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Ready to join our satisfied clients?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            Start Your Project
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}