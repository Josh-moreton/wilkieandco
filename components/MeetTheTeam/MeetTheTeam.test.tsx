import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { MeetTheTeam } from "./MeetTheTeam"

// Mock framer-motion to avoid animation-related test issues
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h3 {...props}>{children}</h3>,
  },
}))

describe("MeetTheTeam", () => {
  it("renders the section title", () => {
    render(<MeetTheTeam />)
    expect(screen.getByText("Meet the Team")).toBeInTheDocument()
  })

  it("renders the founder profile prominently", () => {
    render(<MeetTheTeam />)
    // Founder is rendered as an h3; other instances may appear as h4 in grid/mobile
    expect(screen.getByRole("heading", { level: 3, name: "Euan Wilkie" })).toBeInTheDocument()
    expect(screen.getByText("Founder & Master Craftsman")).toBeInTheDocument()
  })

  it("renders team section header", () => {
    render(<MeetTheTeam />)
    expect(screen.getByText("Our Skilled Team")).toBeInTheDocument()
  })

  it("has proper main heading", () => {
    render(<MeetTheTeam />)
    const mainHeading = screen.getByRole("heading", { level: 2 })
    expect(mainHeading).toHaveTextContent("Meet the Team")
  })
})