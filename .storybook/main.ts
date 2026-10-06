import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  /**
   * GitHub Pages serves the site under a repo sub-path (e.g.
   * /fe-interview-design-system/), so built asset URLs need that base.
   * Set `STORYBOOK_BASE_HREF=/` for a build served from the domain root.
   */
  viteFinal: (config) => {
    config.base = process.env.STORYBOOK_BASE_HREF ?? "/fe-interview-design-system/";
    return config;
  },
};
export default config;
