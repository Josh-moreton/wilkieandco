import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { MotionBox, MotionButton, MotionCard } from "@/components/ui"

// Mock framer-motion for testing
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.ComponentProps<"button">) => <button {...props}>{children}</button>,
  },
}))

describe("Motion Components", () => {
  describe("MotionBox", () => {
    it("renders correctly", () => {
      render(<MotionBox>Test content</MotionBox>)
      expect(screen.getByText("Test content")).toBeInTheDocument()
    })

    it("applies custom className", () => {
      render(<MotionBox className="custom-class">Test content</MotionBox>)
      const element = screen.getByText("Test content")
      expect(element).toHaveClass("custom-class")
    })
  })

  describe("MotionButton", () => {
    it("renders as a button element", () => {
      render(<MotionButton>Click me</MotionButton>)
      const button = screen.getByRole("button", { name: "Click me" })
      expect(button).toBeInTheDocument()
    })

    it("applies button variants correctly", () => {
      render(<MotionButton variant="secondary">Secondary Button</MotionButton>)
      const button = screen.getByRole("button", { name: "Secondary Button" })
      expect(button).toHaveClass("bg-secondary")
    })
  })

  describe("MotionCard", () => {
    it("renders correctly", () => {
      render(<MotionCard>Card content</MotionCard>)
      expect(screen.getByText("Card content")).toBeInTheDocument()
    })

    it("applies card styling", () => {
      render(<MotionCard>Card content</MotionCard>)
      const card = screen.getByText("Card content")
      expect(card).toHaveClass("rounded-xl", "border", "bg-card")
    })
  })
})