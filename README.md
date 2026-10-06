# Frontend Interview - Design System

Hey 👋

This is the base repository for the home test. The repository is created with `vite` and is empty, but contains some packages already installed, in particular:

- `react`
- `storybook`
- `vitest`

## Install and run

```bash
# Install dependencies
# This project use `pnpm` as package manager, but you can use also `npm` or `yarn`.
pnpm install

# And run the project
pnpm dev

# Optional: Run Storybook
pnpm storybook
```

## Figma file

The figma file of the home test is available [here](https://www.figma.com/design/OclakAGLSXDoMKLFvwLNMP/%F0%9F%92%BB-Design-System-Home-Test---Tabs-Component?node-id=0-1&t=4pG7NN6HKxgxroDz-1).

## Components

### Badge

`Badge` lives at `src/components/Badge/Badge.tsx` and accepts React `children` as its content. Earlier versions took a `text: string` prop — that has been replaced so consumers can compose icons, links, or any node without a second prop slot.

```tsx
// Simple label
<Badge>New</Badge>

// With tone (default is "neutral")
<Badge tone="positive">Active</Badge>
<Badge tone="negative">Failed</Badge>

// Composed content
<Badge>
  <Icon /> Active
</Badge>
```

Migration: replace `text="..."` with `<Badge>...</Badge>`. The visual is decorative only — text inside the badge must be self-sufficient (WCAG 1.4.1).

### Tab

`Tab` lives at `src/components/Tab/Tab.tsx` and renders a single selectable item, intended to live inside a `role="tablist"` container. It renders a native `<button>` so it is focusable and activatable with keyboard and assistive tech out of the box.

```tsx
<div role="tablist">
  <Tab>Overview</Tab>
  <Tab isSelected>Notifications</Tab>
</div>
```

Props:

- `variant`: `"pill"` (default) or `"underline"` visual style.
- `isSelected`: marks the active tab; drives `aria-selected` and `data-is-selected`.
- `badge`: optional badge rendered beside the label to display additional
  information (e.g. a count or a status like "Included"). Takes `{ tone?, label }`
  — `tone` is `"neutral"` (default), `"positive"` or `"negative"`; `label` is the
  badge content.

```tsx
// Underline variant
<Tab variant="underline">Overview</Tab>
<Tab variant="underline" isSelected>Notifications</Tab>

// With a count badge
<Tab badge={{ label: "12" }}>Notifications</Tab>

// With a status badge
<Tab badge={{ tone: "positive", label: "Included" }}>Plan</Tab>
```

Accessibility notes:

- The parent must provide `role="tablist"` and the panels `role="tabpanel"` (point at them via `aria-controls`).
- Roving tabindex: only the selected tab stays in the tab order (`tabIndex` defaults to `isSelected ? 0 : -1`); manage arrow-key navigation on the tablist.
- The selected state is also exposed visually via `data-is-selected`; color alone never carries meaning (WCAG 1.4.1).
