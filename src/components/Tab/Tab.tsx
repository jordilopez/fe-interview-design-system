import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Badge, type BadgeTone } from "../Badge/Badge";
import styles from "./Tab.module.scss";

/** Shape of the optional `Badge` rendered inside the tab. */
export type TabBadge = {
  /** Visual emphasis of the badge (defaults to Badge's `neutral`). */
  tone?: BadgeTone;
  /** Badge content — text, or any composed node. */
  label: ReactNode;
};

/** Props for the `Tab` — native button attributes plus tab-specific props. */
export type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Visual style of the tab. */
  variant?: "pill" | "underline";
  /** Whether the tab is the active one in its tablist. Drives `aria-selected`. */
  isSelected?: boolean;
  /** Optional badge rendered beside the label to display additional
   *  information (e.g. a count or a status like "Included"). */
  badge?: TabBadge;
};

/**
 * Tab component — a single selectable item, intended to live inside a
 * `role="tablist"` container. It renders a native `<button>` so it is
 * focusable and activatable with keyboard and assistive tech out of the box.
 *
 * Accessibility notes:
 * - `role="tab"` and `aria-selected` (from `isSelected`) are set here; the
 *   parent must provide `role="tablist"` and the panels `role="tabpanel"`
 *   (point at them via `aria-controls`).
 * - Roving tabindex: keep only the selected tab in the tab order (`tabIndex`
 *   defaults to `isSelected ? 0 : -1`) and manage arrow-key navigation on the
 *   tablist.
 * - The selected state is also exposed visually via `data-is-selected`; the
 *   variant styles must never be the sole carrier of meaning (WCAG 1.4.1).
 */
export function Tab({
  variant = "pill",
  isSelected = false,
  badge,
  className,
  children,
  tabIndex,
  ...rest
}: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      data-variant={variant}
      data-is-selected={isSelected}
      aria-selected={isSelected}
      tabIndex={tabIndex ?? (isSelected ? 0 : -1)}
      className={[styles["c-tab"], className].filter(Boolean).join(" ")}
      {...rest}
    >
      <span className={styles["c-tab__label"]}>{children}</span>
      {badge ? (
        <span className={styles["c-tab__slot"]}>
          <Badge tone={badge.tone}>{badge.label}</Badge>
        </span>
      ) : null}
    </button>
  );
}
