import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Tab.module.scss";

/** Props for the `Tab` — native button attributes plus tab-specific props. */
export type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Visual style of the tab. */
  variant?: "pill" | "underline";
  /** Whether the tab is the active one in its tablist. Drives `aria-selected`. */
  isSelected?: boolean;
  /** Optional trailing content rendered beside the label (e.g. a `Badge` count).
   *  Named `trailing` rather than `slot` to avoid clashing with the native
   *  HTML `slot` attribute (`string`) shared by all elements. */
  trailing?: ReactNode;
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
  trailing,
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
      {trailing ? <span className={styles["c-tab__slot"]}>{trailing}</span> : null}
    </button>
  );
}
