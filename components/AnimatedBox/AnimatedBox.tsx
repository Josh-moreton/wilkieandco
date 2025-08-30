"use client"

import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

export interface AnimatedBoxProps {
  children: React.ReactNode
  className?: string
  animation?: "fade" | "slide" | "scale" | "bounce"
  duration?: number
  style?: React.CSSProperties
}

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
  bounce: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  },
}

export function AnimatedBox({ 
  children, 
  className, 
  animation = "fade", 
  duration = 0.5,
  style 
}: AnimatedBoxProps) {
  const animationProps = animations[animation]

  return (
    <motion.div
      initial={animationProps.initial}
      animate={animationProps.animate}
      exit={animationProps.exit}
      transition={{ duration }}
      className={twMerge("", className)}
      style={style}
    >
      {children}
    </motion.div>
  )
}