"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { twMerge } from "tailwind-merge"

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-xl",
    "text-center",
    "border",
    "border-blue-400",
    "transition-colors",
    "delay-50",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-blue-400", "text-white", "hover:enabled:bg-blue-700"],
        secondary: ["bg-transparent", "text-blue-400", "hover:enabled:bg-blue-400", "hover:enabled:text-white"],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6"],
      },
      underline: { true: ["underline"], false: [] },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof button> {
  underline?: boolean
  href: string
  disableAnimation?: boolean
}

export function Button({ className, intent, size, underline, disableAnimation = false, ...props }: ButtonProps) {
  const buttonClasses = twMerge(button({ intent, size, className, underline }))
  
  if (disableAnimation) {
    return (
      <a className={buttonClasses} {...props}>
        {props.children}
      </a>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{ display: "inline-block" }}
    >
      <a className={buttonClasses} {...props}>
        {props.children}
      </a>
    </motion.div>
  )
}
