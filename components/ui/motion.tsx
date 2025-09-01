"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { type HTMLMotionProps, motion, type MotionProps } from "framer-motion"
import * as React from "react"

import { cn } from "@/lib/utils"

// Base motion variants for common animations
export const motionVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  scaleUp: {
    initial: { scale: 0.95 },
    animate: { scale: 1 },
    exit: { scale: 0.95 },
  },
  // Slide animations
  slideInFromTop: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  },
  slideInFromBottom: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
  },
  slideInFromLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  },
  slideInFromRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
  },
}

// Motion configuration variants using CVA
const motionVariantsConfig = cva("", {
  variants: {
    animation: {
      none: "",
      fadeIn: "",
      fadeInUp: "",
      fadeInDown: "",
      fadeInLeft: "",
      fadeInRight: "",
      scaleIn: "",
      scaleUp: "",
      slideInFromTop: "",
      slideInFromBottom: "",
      slideInFromLeft: "",
      slideInFromRight: "",
    },
    duration: {
      fast: "",
      normal: "",
      slow: "",
    },
    delay: {
      none: "",
      short: "",
      medium: "",
      long: "",
    },
  },
  defaultVariants: {
    animation: "fadeIn",
    duration: "normal",
    delay: "none",
  },
})

// Default transition configurations
const transitionConfigs = {
  fast: { duration: 0.2 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
}

const delayConfigs = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
}

export interface MotionBoxProps
  extends Omit<HTMLMotionProps<"div">, "variants">,
    VariantProps<typeof motionVariantsConfig> {
  /**
   * Custom variants to override default animations
   */
  customVariants?: MotionProps["variants"]
  /**
   * Whether to animate on mount
   */
  animateOnMount?: boolean
}

/**
 * A versatile motion component that provides pre-configured animations
 * while allowing for customization. Built on top of Framer Motion.
 */
const MotionBox = React.forwardRef<HTMLDivElement, MotionBoxProps>(
  (
    {
      className,
      animation = "fadeIn",
      duration = "normal",
      delay = "none",
      customVariants,
      animateOnMount = true,
      initial,
      animate,
      exit,
      transition,
      ...props
    },
    ref
  ) => {
    // Use custom variants if provided, otherwise use predefined variants
    const variants = customVariants || (animation && animation !== "none" ? motionVariants[animation] : undefined)

    // Build transition configuration
    const transitionConfig = {
      ...(duration ? transitionConfigs[duration] : transitionConfigs.normal),
      delay: delay ? delayConfigs[delay] : delayConfigs.none,
      ...transition,
    }

    // Determine initial, animate, and exit states
    const motionProps: Partial<MotionProps> = {}

    if (variants && typeof variants === "object") {
      motionProps.variants = variants
      if (animateOnMount) {
        motionProps.initial = initial || "initial"
        motionProps.animate = animate || "animate"
        motionProps.exit = exit || "exit"
      }
    } else {
      motionProps.initial = initial
      motionProps.animate = animate
      motionProps.exit = exit
    }

    return (
      <motion.div
        ref={ref}
        className={cn(motionVariantsConfig({ animation, duration, delay }), className)}
        transition={transitionConfig}
        {...motionProps}
        {...props}
      />
    )
  }
)

MotionBox.displayName = "MotionBox"

export { MotionBox, motionVariantsConfig }