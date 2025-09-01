"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { type HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

// Motion-specific variants for buttons
const motionButtonVariants = cva("", {
  variants: {
    motionType: {
      none: "",
      hover: "",
      tap: "",
      focus: "",
      all: "",
    },
  },
  defaultVariants: {
    motionType: "all",
  },
})

// Predefined motion configurations for buttons
const buttonMotionConfigs = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
  focus: {
    scale: 1.02,
    transition: { duration: 0.15 },
  },
}

export interface MotionButtonProps
  extends Omit<HTMLMotionProps<"button">, "variants">,
    VariantProps<typeof buttonVariants>,
    VariantProps<typeof motionButtonVariants> {
  asChild?: boolean
  /**
   * Custom hover animation
   */
  whileHover?: HTMLMotionProps<"button">["whileHover"]
  /**
   * Custom tap animation
   */
  whileTap?: HTMLMotionProps<"button">["whileTap"]
  /**
   * Custom focus animation
   */
  whileFocus?: HTMLMotionProps<"button">["whileFocus"]
}

/**
 * A motion-enabled button component that extends the base Button component
 * with smooth animations for hover, tap, and focus states.
 */
const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  (
    {
      className,
      variant,
      size,
      motionType = "all",
      whileHover,
      whileTap,
      whileFocus,
      asChild = false,
      ...props
    },
    ref
  ) => {
    // Build motion props based on motionType
    const motionProps: Partial<HTMLMotionProps<"button">> = {}

    if (motionType === "hover" || motionType === "all") {
      motionProps.whileHover = whileHover || buttonMotionConfigs.hover
    }

    if (motionType === "tap" || motionType === "all") {
      motionProps.whileTap = whileTap || buttonMotionConfigs.tap
    }

    if (motionType === "focus" || motionType === "all") {
      motionProps.whileFocus = whileFocus || buttonMotionConfigs.focus
    }

    if (asChild) {
      // When asChild is true, we need to handle it differently
      // For now, we'll just render a regular motion button
      // In a full implementation, you might want to use Slot from @radix-ui/react-slot
      console.warn("asChild prop is not fully supported with MotionButton yet")
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          motionButtonVariants({ motionType }),
          className
        )}
        {...motionProps}
        {...props}
      />
    )
  }
)

MotionButton.displayName = "MotionButton"

export { MotionButton, motionButtonVariants }