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

`Badge` accepts React `children` as its content. Earlier versions took a `text: string` prop — that has been replaced so consumers can compose icons, links, or any node without a second prop slot.

```tsx
import { Badge } from "@/components/Badge/Badge";

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
