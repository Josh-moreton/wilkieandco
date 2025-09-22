"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui"

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-screen items-center overflow-hidden bg-transparent text-white">
      {/* Content */}
      <div className="relative mx-auto w-full max-w-[min(1200px,92vw)] px-5 py-10 sm:px-6 sm:py-12">
        <div className="space-y-8 text-center">
          {/* Animated Company Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-serif text-[2.25rem] leading-tight font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block"
              >
                Wilkie
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block text-yellow-400"
              >
                & Co
              </motion.span>
            </h1>
          </motion.div>

          {/* Animated Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto max-w-3xl"
          >
            <p className="text-base leading-relaxed font-light text-slate-300 sm:text-2xl lg:text-3xl">
              Crafting Excellence, Creating Beautiful Interiors
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-xl">
              Expert joinery services based in Edinburgh, specializing in bespoke kitchens, built-in furniture, and home
              renovations. From small repairs to complete interior transformations, we bring craftsmanship and care to
              every project.
            </p>
          </motion.div>

          {/* Animated CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              size="lg"
              className="bg-yellow-500 px-6 py-3 text-base font-semibold text-slate-900 hover:bg-yellow-600 sm:px-8 sm:py-4 sm:text-lg"
              asChild
            >
              <a href="#projects">View Our Work</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 px-6 py-3 text-base text-slate-300 hover:bg-slate-800 hover:text-white sm:px-8 sm:py-4 sm:text-lg"
              asChild
            >
              <a href="#contact">Get Free Quote</a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 justify-center rounded-full border-2 border-slate-400"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-2 h-3 w-1 rounded-full bg-slate-400"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
