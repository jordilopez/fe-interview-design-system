import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Tabs } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    onChange: fn(),
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["pill", "underline"],
      table: { defaultValue: { summary: "pill" } },
    },
    defaultSelectedId: {
      control: { type: "text" },
      table: { defaultValue: { summary: "first tab" } },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity", badge: { label: "Important" } },
  { id: "settings", label: "Settings" },
];

export const Pill: Story = {
  args: { variant: "pill", tabs, defaultSelectedId: "overview" },
};

export const Underline: Story = {
  args: { variant: "underline", tabs, defaultSelectedId: "overview" },
};
