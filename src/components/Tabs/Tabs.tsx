import { type KeyboardEvent, type ReactNode, useState } from "react";
import { Tab, type TabBadge } from "../Tab/Tab";
import styles from "./Tabs.module.scss";

/** Configuration for a tab rendered by `Tabs`. */
export type TabsItem = {
  /** Stable key for this tab. */
  id: string;
  /** Visible tab label. */
  label: ReactNode;
  /** Optional badge displayed beside the label. */
  badge?: TabBadge;
};

/** Props for the `Tabs` component. */
export type TabsProps = {
  /** Visual style applied to every tab. */
  variant?: "pill" | "underline";
  /** Overflow behaviour of the tablist. `"scroll"` lets a long tab row
   *  scroll horizontally inside the tablist and keeps the selected tab in
   *  view on selection; `"wrap"` (default) preserves the previous layout. */
  overflow?: "wrap" | "scroll";
  /** Tabs to render in the tablist. */
  tabs: TabsItem[];
  /** Id of the tab selected on mount. Defaults to the first tab. */
  defaultSelectedId?: string;
  /** Called with the id of the tab that becomes selected. */
  onChange?: (id: string) => void;
};

/**
 * Tabs component — renders a tablist of `Tab` items and owns the selection.
 *
 * Accessibility (WAI-ARIA APG tabs pattern):
 * - Roving tabindex: only the selected tab is in the `Tab` order (managed by
 *   `Tab` via `isSelected`), so one `Tab` press enters and the next one
 *   leaves the tablist.
 * - Arrow keys move focus and selection (`ArrowLeft` / `ArrowRight`, wrapping
 *   at the ends); `Home` / `End` jump to the first / last tab.
 * - Clicking a tab also selects it.
 * - Panels are not rendered here and the current API does not wire
 *   `aria-controls`; consumers provide `role="tabpanel"` elements and manage
 *   the tab-to-panel association themselves.
 * - With `overflow="scroll"`, the tablist becomes a horizontal scroll
 *   container (tabs keep their natural width and refuse to shrink) and the
 *   selected tab is scrolled into view on click and on keyboard selection,
 *   so focus never lands offscreen. Default (`"wrap"`) is unchanged.
 */
export function Tabs({
  variant = "pill",
  overflow = "wrap",
  tabs,
  defaultSelectedId,
  onChange,
}: TabsProps) {
  const [selectedId, setSelectedId] = useState(defaultSelectedId ?? tabs[0]?.id);

  /** In scroll mode, keep the newly selected tab visible in the tablist. */
  const scrollTabIntoView = (element: HTMLButtonElement | undefined) => {
    if (overflow !== "scroll") return;
    element?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const select = (index: number) => {
    const item = tabs[index];
    if (!item) return;
    setSelectedId(item.id);
    onChange?.(item.id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabElements = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
    );
    const index = tabElements.indexOf(event.target as HTMLButtonElement);
    if (index === -1) return;

    const last = tabs.length - 1;
    switch (event.key) {
      case "ArrowRight": {
        event.preventDefault();
        select((index + 1) % tabs.length);
        const next = tabElements[(index + 1) % tabs.length];
        next?.focus();
        scrollTabIntoView(next);
        break;
      }
      case "ArrowLeft": {
        event.preventDefault();
        select((index - 1 + tabs.length) % tabs.length);
        const previous = tabElements[(index - 1 + tabs.length) % tabs.length];
        previous?.focus();
        scrollTabIntoView(previous);
        break;
      }
      case "Home": {
        event.preventDefault();
        select(0);
        const first = tabElements[0];
        first?.focus();
        scrollTabIntoView(first);
        break;
      }
      case "End": {
        event.preventDefault();
        select(last);
        const lastTab = tabElements[last];
        lastTab?.focus();
        scrollTabIntoView(lastTab);
        break;
      }
    }
  };

  return (
    <div
      className={styles["c-tabs"]}
      role="tablist"
      onKeyDown={handleKeyDown}
      data-variant={variant}
      data-overflow={overflow}
    >
      {tabs.map(({ id, label, badge }, index) => (
        <Tab
          key={id}
          variant={variant}
          isSelected={id === selectedId}
          badge={badge}
          onClick={(event) => {
            select(index);
            scrollTabIntoView(event.currentTarget);
          }}
        >
          {label}
        </Tab>
      ))}
    </div>
  );
}
