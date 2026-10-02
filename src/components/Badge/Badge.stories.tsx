import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: { type: "select" },
      options: ["neutral", "positive", "negative"],
      table: { defaultValue: { summary: "neutral" } },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Badge",
    tone: "neutral",
  },
};

export const Positive: Story = {
  args: {
    text: "Badge",
    tone: "positive",
  },
};

export const Negative: Story = {
  args: {
    text: "Badge",
    tone: "negative",
  },
};
