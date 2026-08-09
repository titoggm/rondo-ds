import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Button } from "./button"

describe("Button", () => {
  it("renders its children as a native button by default", () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole("button", { name: "Save" })
    expect(button.tagName).toBe("BUTTON")
  })

  it("exposes variant and size as data attributes (defaults applied)", () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole("button", { name: "Save" })
    expect(button).toHaveAttribute("data-slot", "button")
    expect(button).toHaveAttribute("data-variant", "default")
    expect(button).toHaveAttribute("data-size", "default")
  })

  it("reflects the chosen variant and size", () => {
    render(
      <Button variant="destructive" size="sm">
        Delete
      </Button>
    )
    const button = screen.getByRole("button", { name: "Delete" })
    expect(button).toHaveAttribute("data-variant", "destructive")
    expect(button).toHaveAttribute("data-size", "sm")
  })

  it("applies a module class for its variant", () => {
    render(<Button variant="outline">Cancel</Button>)
    const button = screen.getByRole("button", { name: "Cancel" })
    // CSS Modules hash class names, so just assert one was applied.
    expect(button.className.length).toBeGreaterThan(0)
  })

  it("forwards a custom className alongside the variant classes", () => {
    render(<Button className="custom">Save</Button>)
    expect(screen.getByRole("button", { name: "Save" })).toHaveClass("custom")
  })

  it("calls onClick when pressed", async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>Save</Button>)
    await user.click(screen.getByRole("button", { name: "Save" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn()
    // The disabled button sets `pointer-events: none`; bypass user-event's
    // pointer guard so we still exercise the click and assert it is ignored.
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>
    )
    await user.click(screen.getByRole("button", { name: "Save" }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("renders as a child element when asChild is set", () => {
    render(
      <Button asChild>
        <a href="/home">Home</a>
      </Button>
    )
    const link = screen.getByRole("link", { name: "Home" })
    expect(link.tagName).toBe("A")
    expect(link).toHaveAttribute("data-slot", "button")
  })
})
