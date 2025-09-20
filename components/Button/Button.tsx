import { cva, type VariantProps } from "class-variance-authority"

import { Button as ShadcnButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Legacy button variants for backward compatibility
const legacyButton = cva(
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof legacyButton> {
  underline?: boolean
  href: string
}

export function Button({ className, intent, size, underline, ...props }: ButtonProps) {
  return (
    <a className={cn(legacyButton({ intent, size, className, underline }))} {...props}>
      {props.children}
    </a>
  )
}

// Export the new shadcn button for new usage
export { ShadcnButton as ShadcnButton }
