"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui"

interface Testimonial {
  id: number
  name: string
  title: string
  company: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "Homeowner",
    company: "Residential Client",
    quote: "Wilkie & Co exceeded our expectations in every way. From the initial consultation to the final walkthrough, their attention to detail and commitment to quality was outstanding. Our dream home became a reality thanks to their expertise.",
    rating: 5
  },
  {
    id: 2,
    name: "David Chen",
    title: "Property Manager",
    company: "Metro Commercial Properties",
    quote: "We've worked with many contractors over the years, but Wilkie & Co stands out for their professionalism and reliability. They completed our office renovation ahead of schedule and under budget, with exceptional quality throughout.",
    rating: 5
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    title: "Operations Director",
    company: "TechFlow Industries",
    quote: "The warehouse facility Wilkie & Co built for us has been instrumental in our company's growth. Their understanding of industrial construction requirements and ability to deliver on time was impressive.",
    rating: 5
  },
  {
    id: 4,
    name: "Michael Thompson",
    title: "Investment Banker",
    company: "Thompson & Associates",
    quote: "When we needed to restore our heritage building, Wilkie & Co was the obvious choice. Their expertise in historical restoration while incorporating modern systems was exactly what we needed.",
    rating: 5
  },
  {
    id: 5,
    name: "Amanda Foster",
    title: "Real Estate Developer",
    company: "Foster Development Group",
    quote: "Wilkie & Co has been our go-to construction partner for multiple luxury residential projects. Their craftsmanship and attention to detail consistently deliver results that exceed our clients' expectations.",
    rating: 5
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Facility Manager",
    company: "Wilson Manufacturing",
    quote: "The industrial complex Wilkie & Co constructed for us has performed flawlessly for over three years. Their expertise in industrial construction and commitment to safety made the entire process smooth and worry-free.",
    rating: 5
  }
]

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-400 fill-current" : "text-slate-300 dark:text-slate-600"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="bg-white dark:bg-slate-800 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-serif text-slate-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from the clients who have trusted us with their most important construction projects.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Quote */}
                  <div className="flex-1 mb-6">
                    <div className="text-slate-400 dark:text-slate-500 mb-2">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                      </svg>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Client Info */}
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {testimonial.title}
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold font-serif text-slate-900 dark:text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Join our satisfied clients and experience the Wilkie & Co difference. 
              Contact us today for a consultation on your next construction project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                Get Free Consultation
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors"
              >
                View Portfolio
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}