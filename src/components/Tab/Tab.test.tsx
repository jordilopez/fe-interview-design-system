import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "../Badge/Badge";
import { Tab } from "./Tab";
import styles from "./Tab.module.scss";

describe("Tab", () => {
  it("renders as a button with the local tab class", () => {
    render(<Tab>Tab</Tab>);
    const tab = screen.getByRole("tab", { name: "Tab" });
    expect(tab.tagName).toBe("BUTTON");
    expect(tab).toHaveClass(styles["c-tab"]);
  });

  it("forwards native button attributes", () => {
    render(<Tab data-testid="tab">Tab</Tab>);
    expect(screen.getByTestId("tab")).toBeInTheDocument();
  });

  it("appends custom classes after the module class", () => {
    render(<Tab className="custom">Tab</Tab>);
    expect(screen.getByRole("tab")).toHaveClass(styles["c-tab"], "custom");
  });

  describe("variant", () => {
    it("defaults to pill when not set", () => {
      render(<Tab>Tab</Tab>);
      expect(screen.getByRole("tab")).toHaveAttribute("data-variant", "pill");
    });

    it("sets data-variant to underline", () => {
      render(<Tab variant="underline">Tab</Tab>);
      expect(screen.getByRole("tab")).toHaveAttribute("data-variant", "underline");
    });
  });

  describe("isSelected", () => {
    it("defaults to false and sets aria-selected accordingly", () => {
      render(<Tab>Tab</Tab>);
      const tab = screen.getByRole("tab");
      expect(tab).toHaveAttribute("data-is-selected", "false");
      expect(tab).toHaveAttribute("aria-selected", "false");
    });

    it("sets data-is-selected and aria-selected when true", () => {
      render(<Tab isSelected>Tab</Tab>);
      const tab = screen.getByRole("tab");
      expect(tab).toHaveAttribute("data-is-selected", "true");
      expect(tab).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("trailing", () => {
    it("renders the trailing content beside the label when provided", () => {
      render(<Tab trailing={<Badge>12</Badge>}>Notifications</Tab>);
      const tab = screen.getByRole("tab", { name: /Notifications/ });
      expect(tab).toHaveTextContent("12");
    });

    it("does not render a trailing wrapper when no trailing content is given", () => {
      render(<Tab>Tab</Tab>);
      expect(screen.getByRole("tab").querySelectorAll("span")).toHaveLength(1);
    });
  });

  describe("roving tabindex", () => {
    it("defaults tabIndex to -1 when not selected", () => {
      render(<Tab>Tab</Tab>);
      expect(screen.getByRole("tab")).toHaveAttribute("tabindex", "-1");
    });

    it("defaults tabIndex to 0 when selected", () => {
      render(<Tab isSelected>Tab</Tab>);
      expect(screen.getByRole("tab")).toHaveAttribute("tabindex", "0");
    });

    it("respects an explicit tabIndex override", () => {
      render(<Tab tabIndex={0}>Tab</Tab>);
      expect(screen.getByRole("tab")).toHaveAttribute("tabindex", "0");
    });
  });
});
