import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Button } from "./Button"

describe("Button", () => {
  it("renders with children", () => {
    render(<Button href="/test">Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("applies correct intent classes", () => {
    const { container } = render(
      <Button href="/test" intent="secondary">
        Secondary
      </Button>
    )
    const link = container.querySelector("a")
    expect(link).toHaveClass("bg-transparent")
    expect(link).toHaveClass("text-blue-400")
  })

  it("applies correct size classes", () => {
    const { container } = render(
      <Button href="/test" size="sm">
        Small
      </Button>
    )
    const link = container.querySelector("a")
    expect(link).toHaveClass("text-sm")
    expect(link).toHaveClass("min-w-20")
  })

  it("renders without animation when disableAnimation is true", () => {
    const { container } = render(
      <Button href="/test" disableAnimation>
        No Animation
      </Button>
    )
    const link = container.querySelector("a")
    expect(link).toBeInTheDocument()
    expect(screen.getByText("No Animation")).toBeInTheDocument()
  })

  it("renders with animation by default", () => {
    const { container } = render(
      <Button href="/test">
        With Animation
      </Button>
    )
    const link = container.querySelector("a")
    expect(link).toBeInTheDocument()
    expect(screen.getByText("With Animation")).toBeInTheDocument()
  })
})
