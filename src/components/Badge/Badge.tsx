import type { HTMLAttributes } from "react";
import styles from "./Badge.module.scss";

/** Props for the `Badge` — native span attributes plus the badge content. */
export type BadgeProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  /** Visual emphasis of the badge. */
  tone?: "neutral" | "positive" | "negative";
};

/**
 * Badge component.
 *
 * Local styles can be added in `Badge.module.scss`.
 * All native span attributes are forwarded as-is.
 *
 * Accessibility: `tone` is purely visual (conveyed via `data-tone` and
 * background color ). Always pass self-sufficient text — the tone must never
 * be the sole carrier of meaning, e.g. write "3 failures", not "3" with
 * `tone="negative"` (WCAG 1.4.1). Avoid `aria-label` here: on a plain span
 * (ARIA `generic` role) it is ignored by assistive tech.
 */
export function Badge({ tone = "neutral", className, children, ...rest }: BadgeProps) {
  return (
    <span
      data-tone={tone}
      className={[styles["c-badge"], className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
}
