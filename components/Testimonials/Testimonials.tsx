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
    company: "Morningside, Edinburgh",
    quote:
      "Wilkie & Co completely transformed our kitchen beyond our wildest dreams. Their craftsmanship is exceptional and they understood exactly what we needed for our family. The attention to detail in every joint and finish is incredible.",
    rating: 5,
  },
  {
    id: 2,
    name: "James Henderson",
    title: "Homeowner",
    company: "Stockbridge, Edinburgh",
    quote:
      "We couldn't be happier with our Victorian house renovation. They respected the period features while creating beautiful modern storage solutions. The built-in wardrobes are a work of art and fit the space perfectly.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Thompson",
    title: "Homeowner",
    company: "Bruntsfield, Edinburgh",
    quote:
      "Our garden room has become the heart of our home. The quality of workmanship is outstanding and the team was wonderful to work with. They kept us informed every step of the way and finished exactly on time.",
    rating: 5,
  },
  {
    id: 4,
    name: "Robert MacLeod",
    title: "Homeowner",
    company: "Leith, Edinburgh",
    quote:
      "The loft conversion has given us so much extra space and it's beautifully finished. Every detail was considered, from the dormer windows to the fitted storage. Couldn't recommend them highly enough.",
    rating: 5,
  },
  {
    id: 5,
    name: "Claire Anderson",
    title: "Homeowner",
    company: "New Town, Edinburgh",
    quote:
      "My home office is now my favorite room in the house! The built-in desk and bookcases are perfectly proportioned and the craftsmanship is superb. They turned an unused space into something truly special.",
    rating: 5,
  },
  {
    id: 6,
    name: "Mark Davidson",
    title: "Homeowner",
    company: "Portobello, Edinburgh",
    quote:
      "From the initial consultation to the final touch-ups, Wilkie & Co made our home renovation stress-free. Their small team approach meant we got to know everyone and they really cared about getting every detail right.",
    rating: 5,
  },
]

const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  
  return (
    <div className="flex space-x-1">
      {stars.map((starNumber) => (
        <svg
          key={`star-${starNumber}`}
          className={`h-5 w-5 ${starNumber <= rating ? "fill-current text-yellow-400" : "text-slate-500"}`}
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
          <h2 className="mb-4 font-serif text-4xl font-bold text-white lg:text-5xl hidden md:block">What Our Clients Say</h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-300 hidden md:block">
            Don't just take our word for it. Hear from Edinburgh homeowners who have trusted us with their joinery and
            renovation projects.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-slate-600/50 bg-slate-800/80 shadow-lg backdrop-blur transition-shadow duration-300 hover:shadow-xl">
                <CardContent className="flex h-full flex-col p-6">
                  {/* Quote */}
                  <div className="mb-6 flex-1">
                    <div className="mb-2 text-slate-500">
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <p className="leading-relaxed text-slate-300 italic">"{testimonial.quote}"</p>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Client Info */}
                  <div>
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">{testimonial.title}</p>
                    <p className="text-sm font-medium text-slate-500">{testimonial.company}</p>
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
          className="mt-16 text-center"
        >
          <div className="rounded-2xl bg-slate-800/80 p-8 backdrop-blur lg:p-12">
            <h3 className="mb-4 font-serif text-2xl font-bold text-white lg:text-3xl">Ready to Transform Your Home?</h3>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-slate-300">
              Join our satisfied Edinburgh homeowners and experience the Wilkie & Co difference. Contact us today for a
              free consultation on your joinery or renovation project.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-yellow-600"
              >
                Get Free Consultation
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-slate-900"
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
