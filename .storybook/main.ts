import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  /**
   * Storybook static builds must reference assets relative to wherever they
   * are served. CI sets `STORYBOOK_BASE_HREF` to the GitHub Pages repo
   * sub-path; local builds (and domain-root deployments) fall back to `/`.
   */
  viteFinal: (config) => {
    const base = (process.env.STORYBOOK_BASE_HREF ?? "").trim();
    config.base = base || "/";
    return config;
  },
};
export default config;
