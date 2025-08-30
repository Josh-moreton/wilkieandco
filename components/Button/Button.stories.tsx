import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  args: {
    intent: "primary",
    underline: false,
    children: "Button",
    size: "lg",
    href: "#",
    disableAnimation: false,
  },
  argTypes: {
    intent: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "lg"],
      control: { type: "select" },
    },
    disableAnimation: {
      control: { type: "boolean" },
    },
  },
}

type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: (args) => <Button {...args} />,
}

export const WithAnimation: Story = {
  args: {
    disableAnimation: false,
    children: "Hover & Click Me!",
  },
  render: (args) => (
    <div className="p-4">
      <p className="mb-4 text-gray-600">This button has hover and click animations enabled</p>
      <Button {...args} />
    </div>
  ),
}

export const WithoutAnimation: Story = {
  args: {
    disableAnimation: true,
    children: "Static Button",
  },
  render: (args) => (
    <div className="p-4">
      <p className="mb-4 text-gray-600">This button has animations disabled</p>
      <Button {...args} />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <Button href="#" intent="primary" size="lg">
          Primary Large
        </Button>
        <Button href="#" intent="secondary" size="lg">
          Secondary Large
        </Button>
      </div>
      <div className="flex gap-4">
        <Button href="#" intent="primary" size="sm">
          Primary Small
        </Button>
        <Button href="#" intent="secondary" size="sm">
          Secondary Small
        </Button>
      </div>
      <div className="flex gap-4">
        <Button href="#" intent="primary" disableAnimation>
          No Animation
        </Button>
        <Button href="#" intent="secondary" disableAnimation>
          No Animation
        </Button>
      </div>
    </div>
  ),
}

export default meta
