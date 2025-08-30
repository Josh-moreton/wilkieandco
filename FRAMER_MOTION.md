# Framer Motion Integration

This project now includes [Framer Motion](https://www.framer.com/motion/) for smooth, high-performance animations.

## Getting Started

Framer Motion is already installed and configured. You can start using it right away in your components.

## Available Components

### AnimatedBox

A versatile wrapper component that provides common animations out of the box.

```tsx
import { AnimatedBox } from "components/AnimatedBox"

function MyComponent() {
  return (
    <AnimatedBox animation="fade" duration={0.5}>
      <div>This content will fade in!</div>
    </AnimatedBox>
  )
}
```

**Props:**
- `animation`: "fade" | "slide" | "scale" | "bounce"
- `duration`: number (in seconds)
- `className`: string (additional CSS classes)
- `children`: React.ReactNode

### Enhanced Button Component

The existing Button component now includes hover and tap animations by default.

```tsx
import { Button } from "components/Button"

// Animated by default
<Button href="/example">Hover me!</Button>

// Disable animations if needed
<Button href="/example" disableAnimation>Static button</Button>
```

## Using Framer Motion Directly

For custom animations, import and use Framer Motion directly:

```tsx
import { motion } from "framer-motion"

function CustomAnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      Custom animation
    </motion.div>
  )
}
```

## Best Practices

1. **Performance**: Framer Motion is optimized for performance, but still use animations sparingly
2. **Accessibility**: Consider users who prefer reduced motion by using `prefers-reduced-motion` media query
3. **Consistency**: Use the provided AnimatedBox component for common animations to maintain consistency
4. **Client Components**: Remember to use `"use client"` directive when using Framer Motion in Next.js App Router

## Examples

Check out the Storybook stories for the AnimatedBox and Button components to see all available animations in action:

```bash
pnpm run storybook
```

## Documentation

For more advanced usage, refer to the [official Framer Motion documentation](https://www.framer.com/motion/).