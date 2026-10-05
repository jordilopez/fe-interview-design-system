import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../Badge/Badge";
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
    trailing: <Badge>12</Badge>,
  },
  name: "With badge slot",
  render: (args) => <TabList {...args} />,
};

export const WithBadgeUnderline: Story = {
  args: {
    children: "Notifications",
    variant: "underline",
    trailing: <Badge>12</Badge>,
  },
  name: "With badge slot and underline variant",
  render: (args) => <TabList {...args} />,
};
