import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Tabs } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Keyboard interaction (recommended WAI-ARIA tabs pattern): press `Tab` to move focus to the tablist — only the selected tab is in the tab order — then use the left/right arrow keys to move focus and selection between tabs (the keys wrap around). The tabs are native buttons, so `Space`/`Enter` also activate the focused tab. Try it with the keyboard in the canvas preview below.",
      },
    },
  },
  args: {
    onChange: fn(),
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["pill", "underline"],
      table: { defaultValue: { summary: "pill" } },
    },
    overflow: {
      control: { type: "select" },
      options: ["wrap", "scroll"],
      table: { defaultValue: { summary: "wrap" } },
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

const manyTabs = Array.from({ length: 12 }, (_, index) => ({
  id: `tab-${index + 1}`,
  label: `Tab ${index + 1}`,
}));

/** Long tab list; toggle the `overflow` control to compare wrap vs scroll. */
export const LongList: Story = {
  args: {
    variant: "pill",
    tabs: manyTabs,
    overflow: "scroll",
    defaultSelectedId: "tab-1",
  },
};
