"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui"

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Construction Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
      </div>
      
      {/* Content */}
  <div className="relative mx-auto w-full max-w-[min(1200px,90vw)] px-6 py-12">
        <div className="text-center space-y-8">
          {/* Animated Company Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-serif tracking-tight">
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
            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 font-light leading-relaxed">
              Building Excellence, Creating Foundations for Tomorrow
            </p>
            <p className="mt-4 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Professional construction services with over two decades of experience. 
              From residential to commercial projects, we deliver quality that stands the test of time.
            </p>
          </motion.div>
          
          {/* Animated CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-8 py-4 text-lg"
            >
              View Our Projects
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-slate-300 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-lg"
              asChild
            >
              <a href="/contact">Get Quote</a>
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