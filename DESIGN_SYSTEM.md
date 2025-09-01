# Design System

This project now includes a comprehensive design system built on top of Radix UI, CVA (Class Variance Authority), and Framer Motion using shadcn/ui patterns.

## Overview

The design system provides:

- **Consistent styling** with CSS variables and Tailwind CSS
- **Accessible components** built with Radix UI primitives  
- **Type-safe variants** using CVA for component variants
- **Smooth animations** powered by Framer Motion
- **Developer-friendly API** with the `cn()` utility for className composition
- **Backward compatibility** for existing components

## Components

### Core UI Components (`/components/ui/`)

- **Button** - Various button styles and sizes with `asChild` prop support
- **Badge** - Status indicators and labels 
- **Card** - Flexible container for content with header/footer sections
- **Input** - Text input field with proper styling
- **Label** - Form labels with accessible associations
- **Switch** - Toggle switch component
- **Tooltip** - Contextual tooltips with proper positioning

### Motion Components (`/components/ui/`)

- **MotionBox** - Versatile animated container with pre-configured animations
- **MotionButton** - Interactive buttons with hover, tap, and focus animations
- **MotionCard** - Animated cards with entrance effects and hover interactions

### Legacy Components (Maintained for backward compatibility)

- **Button** (`/components/Button/`) - Original button component, now using `cn()` utility
- **Tooltip** (`/components/Tooltip/`) - Original tooltip component, now using `cn()` utility

## Usage

### Using the new shadcn/ui components:

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from "@/components/ui"

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <Button>Submit</Button>
      </CardContent>
    </Card>
  )
}
```

### Using motion components:

```tsx
import { MotionBox, MotionButton, MotionCard } from "@/components/ui"

function AnimatedComponent() {
  return (
    <MotionBox animation="fadeInUp" delay="short">
      <MotionCard hoverEffect="lift" animation="scaleIn">
        <CardContent>
          <MotionButton motionType="all">Animated Button</MotionButton>
        </CardContent>
      </MotionCard>
    </MotionBox>
  )
}
```

### Using legacy components (for existing code):

```tsx
import { Button } from "@/components/Button/Button"
import { Tooltip } from "@/components/Tooltip/Tooltip"

// These continue to work as before
<Button href="/link" intent="primary" size="lg">
  Click me
</Button>
```

## Animation System

### Motion Variants

The motion system provides pre-configured animation variants:

- **Fade animations**: `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- **Scale animations**: `scaleIn`, `scaleUp`
- **Slide animations**: `slideInFromTop`, `slideInFromBottom`, `slideInFromLeft`, `slideInFromRight`

### Motion Components

**MotionBox** - Versatile container with configurable animations:
```tsx
<MotionBox animation="fadeInUp" duration="normal" delay="short">
  Content here
</MotionBox>
```

**MotionButton** - Interactive button with motion effects:
```tsx
<MotionButton motionType="all" variant="primary">
  Hover, tap, and focus me!
</MotionButton>
```

**MotionCard** - Animated card with hover effects:
```tsx
<MotionCard hoverEffect="lift" animation="slideUp" delay="medium">
  Card content
</MotionCard>
```

### Performance

All animations are GPU-accelerated and use Framer Motion's optimized animation engine. Components automatically handle entrance animations and interactive states.

## Utilities

### `cn()` function

The `cn()` utility (from `/lib/utils.ts`) combines `clsx` and `tailwind-merge` for optimal className composition:

```tsx
import { cn } from "@/lib/utils"

// Safely merge conditional classes and resolve conflicts
const className = cn(
  "base-classes",
  condition && "conditional-classes",
  variant === "primary" && "variant-classes",
  userClassName
)
```

## Styling System

The design system uses CSS variables for theming defined in `/styles/tailwind.css`:

- Light and dark mode support
- Consistent color palette
- Semantic color names (primary, secondary, destructive, etc.)
- Border radius and spacing tokens

## Demo

Visit `/components` to see all components in action with various configurations and states.

## Adding New Components

To add a new shadcn/ui component:

1. Create the component file in `/components/ui/`
2. Follow the shadcn/ui patterns with forwardRef and proper TypeScript types
3. Use the `cn()` utility for className composition
4. Export from `/components/ui/index.ts`
5. Add to the demo page if desired

## Migration Guide

Existing components can be gradually migrated to use the new system:

1. Update imports to use `cn()` instead of `twMerge`
2. Consider adopting shadcn/ui component patterns for new features
3. Legacy components remain fully functional during migration