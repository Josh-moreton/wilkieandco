import type { Meta, StoryObj } from "@storybook/react"

import { AnimatedBox } from "./AnimatedBox"

const meta: Meta<typeof AnimatedBox> = {
  title: "Components/AnimatedBox",
  component: AnimatedBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    animation: {
      control: { type: "select" },
      options: ["fade", "slide", "scale", "bounce"],
    },
    duration: {
      control: { type: "range", min: 0.1, max: 2, step: 0.1 },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Fade: Story = {
  args: {
    animation: "fade",
    duration: 0.5,
    children: (
      <div className="w-32 h-32 bg-blue-400 rounded-lg flex items-center justify-center text-white font-bold">
        Fade Animation
      </div>
    ),
  },
}

export const Slide: Story = {
  args: {
    animation: "slide",
    duration: 0.5,
    children: (
      <div className="w-32 h-32 bg-green-400 rounded-lg flex items-center justify-center text-white font-bold">
        Slide Animation
      </div>
    ),
  },
}

export const Scale: Story = {
  args: {
    animation: "scale",
    duration: 0.5,
    children: (
      <div className="w-32 h-32 bg-purple-400 rounded-lg flex items-center justify-center text-white font-bold">
        Scale Animation
      </div>
    ),
  },
}

export const Bounce: Story = {
  args: {
    animation: "bounce",
    duration: 0.5,
    children: (
      <div className="w-32 h-32 bg-red-400 rounded-lg flex items-center justify-center text-white font-bold">
        Bounce Animation
      </div>
    ),
  },
}

export const CustomContent: Story = {
  args: {
    animation: "fade",
    duration: 1,
    children: (
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-2">Animated Card</h3>
        <p className="text-gray-600">This card animates in with Framer Motion!</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Click me
        </button>
      </div>
    ),
  },
}