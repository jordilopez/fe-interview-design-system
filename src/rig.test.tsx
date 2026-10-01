import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

// Sanity test for the test rig itself: verifies the jsdom environment,
// the testing-library render path, and the jest-dom custom matchers
// are all wired up before the first component (Tabs) lands.
describe("test rig", () => {
  it("renders into jsdom and supports jest-dom matchers", () => {
    render(<p>design system</p>);

    expect(screen.getByText("design system")).toBeInTheDocument();
  });
});
