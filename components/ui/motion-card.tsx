"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { type HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"

import { cn } from "@/lib/utils"

// Base card styles (matching the existing card component)
const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground shadow"
)

const motionCardVariants = cva("", {
  variants: {
    hoverEffect: {
      none: "",
      lift: "",
      scale: "",
      glow: "",
    },
    animation: {
      none: "",
      fadeIn: "",
      slideUp: "",
      scaleIn: "",
    },
  },
  defaultVariants: {
    hoverEffect: "lift",
    animation: "fadeIn",
  },
})

// Predefined motion configurations
const cardMotionConfigs = {
  hoverEffects: {
    lift: {
      y: -4,
      transition: { duration: 0.2 },
    },
    scale: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    glow: {
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
      transition: { duration: 0.2 },
    },
  },
  animations: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3 },
    },
  },
}

export interface MotionCardProps
  extends Omit<HTMLMotionProps<"div">, "variants">,
    VariantProps<typeof motionCardVariants> {
  /**
   * Custom hover animation
   */
  whileHover?: HTMLMotionProps<"div">["whileHover"]
  /**
   * Whether to animate on mount
   */
  animateOnMount?: boolean
  /**
   * Animation delay
   */
  delay?: "none" | "short" | "medium" | "long"
}

const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  (
    {
      className,
      hoverEffect = "lift",
      animation = "fadeIn",
      delay = "none",
      whileHover,
      animateOnMount = true,
      initial,
      animate,
      transition,
      ...props
    },
    ref
  ) => {
    // Build motion props
    const motionProps: Partial<HTMLMotionProps<"div">> = {}

    // Add hover effect
    if (hoverEffect !== "none" && hoverEffect) {
      motionProps.whileHover = whileHover || cardMotionConfigs.hoverEffects[hoverEffect]
    }

    // Add entrance animation
    if (animateOnMount && animation !== "none" && animation) {
      const animConfig = cardMotionConfigs.animations[animation]
      motionProps.initial = initial || animConfig.initial
      motionProps.animate = animate || animConfig.animate
      
      // Add delay to transition
      const delayValues = { none: 0, short: 0.1, medium: 0.2, long: 0.4 }
      motionProps.transition = transition || { 
        ...animConfig.transition, 
        delay: delayValues[delay] 
      }
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          cardVariants(),
          motionCardVariants({ hoverEffect, animation }),
          className
        )}
        {...motionProps}
        {...props}
      />
    )
  }
)

MotionCard.displayName = "MotionCard"

const MotionCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
MotionCardHeader.displayName = "MotionCardHeader"

const MotionCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
MotionCardTitle.displayName = "MotionCardTitle"

const MotionCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
MotionCardDescription.displayName = "MotionCardDescription"

const MotionCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
MotionCardContent.displayName = "MotionCardContent"

const MotionCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
MotionCardFooter.displayName = "MotionCardFooter"

export {
  MotionCard,
  MotionCardHeader,
  MotionCardFooter,
  MotionCardTitle,
  MotionCardDescription,
  MotionCardContent,
}