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
    expect(screen.getAllByText("Euan Wilkie")).toHaveLength(2) // Desktop and mobile versions
    expect(screen.getAllByText("Founder & Master Craftsman")).toHaveLength(2) // Desktop and mobile versions
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