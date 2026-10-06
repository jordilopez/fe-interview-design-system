import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs } from "./Tabs";
import styles from "./TabsExamplePage.module.scss";

const meta = {
  title: "Pages/Tabs example page",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A full page example: a heading and a `Tabs` bar that swaps the content of the panel below it. Each of the five tabs renders a section with a title matching the tab and several Lorem ipsum paragraphs, so you can observe scrolling behaviour with many elements on the page.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sections = [
  {
    id: "overview",
    label: "Overview",
    paragraphs: 4,
  },
  {
    id: "details",
    label: "Details",
    paragraphs: 5,
  },
  {
    id: "activity",
    label: "Activity",
    paragraphs: 6,
  },
  {
    id: "billing",
    label: "Billing",
    paragraphs: 5,
  },
  {
    id: "settings",
    label: "Settings",
    paragraphs: 4,
  },
] as const;

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

/**
 * Renders the content panel for the currently selected tab: a title matching
 * the tab label followed by several Lorem ipsum paragraphs.
 */
function TabsExamplePageDemo({ variant }: { variant: "pill" | "underline" }) {
  const [selectedId, setSelectedId] = useState<string>(sections[0].id);
  const section = sections.find(({ id }) => id === selectedId) ?? sections[0];

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Tabs example page</h1>
      <div className={styles.tabs}>
        <Tabs
          variant={variant}
          overflow="scroll"
          tabs={sections.map(({ id, label }) => ({ id, label }))}
          defaultSelectedId={sections[0].id}
          onChange={setSelectedId}
        />
      </div>
      <div id={`panel-${section.id}`} role="tabpanel" className={styles.panel}>
        <h2 className={styles.panelTitle}>{section.label}</h2>
        {Array.from({ length: section.paragraphs }, (_, i) => (
          /* biome-ignore lint/suspicious/noArrayIndexKey: static content, order never changes */
          <p key={i} className={styles.paragraph}>
            {section.label} — paragraph {i + 1}. {lorem}
          </p>
        ))}
      </div>
    </div>
  );
}

export const TabsExamplePage: Story = {
  name: "Pill",
  render: () => <TabsExamplePageDemo variant="pill" />,
};

export const TabsExamplePageUnderline: Story = {
  name: "Underline",
  render: () => <TabsExamplePageDemo variant="underline" />,
};
