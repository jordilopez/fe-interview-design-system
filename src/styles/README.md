# Styles

Design-system styles, split in two:

- **CSS output** (this directory except `tools/`) — tokens, reset, base and
  utilities. Plain CSS, no build step required: import `index.css` once per
  app and every rule is loaded.
- **`tools/`** — Sass mixins (`bpFrom`, `useType`) and their config maps.
  Compile-time only: emits no CSS, so it's safe to `@use` in every component
  file. Requires Sass.

## Cascade layers

All rules live inside `fe-interview-design-system.*` cascade layers, declared
in this order in `index.css`:

1. `reset` — lowest precedence
2. `tokens`
3. `base`
4. `utils` — highest precedence within the system

**Contract for consumers:** because everything ships inside layers, any CSS
you write *outside* a layer (the default) always wins over these rules,
regardless of specificity. To override design-system styles from layered
styles, declare your layer after the ones above, e.g.
`@layer fe-interview-design-system.utils, my-app;`.
