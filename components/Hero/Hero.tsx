"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui"

export function Hero() {
  return (
  <section className="relative min-h-[100dvh] w-screen flex items-center bg-transparent text-white overflow-hidden">
      {/* Content */}
  <div className="relative mx-auto w-full max-w-[min(1200px,92vw)] px-5 py-10 sm:px-6 sm:py-12">
        <div className="text-center space-y-8">
          {/* Animated Company Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-[2.25rem] sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-serif tracking-tight leading-tight">
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
            className="max-w-3xl mx-auto"
          >
            <p className="text-base sm:text-2xl lg:text-3xl text-slate-300 font-light leading-relaxed">
              Crafting Excellence, Creating Beautiful Interiors
            </p>
            <p className="mt-3 text-sm sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Expert joinery services based in Edinburgh, specializing in bespoke kitchens, built-in furniture, and home renovations. 
              From small repairs to complete interior transformations, we bring craftsmanship and care to every project.
            </p>
          </motion.div>
          
          {/* Animated CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Button 
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg"
            >
              View Our Work
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-slate-300 text-slate-300 hover:bg-slate-800 hover:text-white px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-slate-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}