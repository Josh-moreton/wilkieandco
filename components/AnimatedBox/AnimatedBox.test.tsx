import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { AnimatedBox } from "./AnimatedBox"

describe("AnimatedBox", () => {
  it("renders children correctly", () => {
    render(
      <AnimatedBox>
        <div>Test content</div>
      </AnimatedBox>
    )

    expect(screen.getByText("Test content")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <AnimatedBox className="custom-class">
        <div>Test content</div>
      </AnimatedBox>
    )

    expect(container.firstChild).toHaveClass("custom-class")
  })

  it("renders with different animation types", () => {
    const { rerender } = render(
      <AnimatedBox animation="fade">
        <div>Test content</div>
      </AnimatedBox>
    )

    expect(screen.getByText("Test content")).toBeInTheDocument()

    rerender(
      <AnimatedBox animation="slide">
        <div>Test content</div>
      </AnimatedBox>
    )

    expect(screen.getByText("Test content")).toBeInTheDocument()

    rerender(
      <AnimatedBox animation="scale">
        <div>Test content</div>
      </AnimatedBox>
    )

    expect(screen.getByText("Test content")).toBeInTheDocument()

    rerender(
      <AnimatedBox animation="bounce">
        <div>Test content</div>
      </AnimatedBox>
    )

    expect(screen.getByText("Test content")).toBeInTheDocument()
  })
})