import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tab } from "./Tab";

const meta = {
  title: "Components/Tab",
  component: Tab,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["pill", "underline"],
      table: { defaultValue: { summary: "pill" } },
    },
    isSelected: {
      control: { type: "boolean" },
      table: { defaultValue: { summary: "false" } },
    },
    tabIndex: {
      control: { type: "number" },
      table: { defaultValue: { summary: "0" } },
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

const TabList = (args: Story["args"]) => (
  <div role="tablist">
    <Tab {...args} />
  </div>
);

export const Default: Story = {
  args: {
    children: "Label",
    tabIndex: 0,
  },
  render: (args) => <TabList {...args} />,
};

export const Selected: Story = {
  args: {
    children: "Label",
    isSelected: true,
    tabIndex: 0,
  },
  render: (args) => <TabList {...args} />,
};

export const Underline: Story = {
  args: {
    children: "Label",
    variant: "underline",
    tabIndex: 0,
  },
  render: (args) => <TabList {...args} />,
};

export const UnderlineSelected: Story = {
  args: {
    children: "Label",
    variant: "underline",
    isSelected: true,
    tabIndex: 0,
  },
  render: (args) => <TabList {...args} />,
};

export const WithBadge: Story = {
  args: {
    children: "Notifications",
    badge: { label: "12" },
    tabIndex: 0,
  },
  name: "With badge",
  render: (args) => <TabList {...args} />,
};

export const WithBadgeTone: Story = {
  args: {
    children: "Plan",
    badge: { tone: "positive", label: "Included" },
    tabIndex: 0,
  },
  name: "With badge and tone",
  render: (args) => <TabList {...args} />,
};

export const WithBadgeUnderline: Story = {
  args: {
    children: "Notifications",
    variant: "underline",
    badge: { label: "12" },
    tabIndex: 0,
  },
  name: "With badge and underline variant",
  render: (args) => <TabList {...args} />,
};
