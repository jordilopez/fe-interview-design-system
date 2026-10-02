import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";
import styles from "./Badge.module.scss";

describe("Badge", () => {
  it("renders with the local badge class", () => {
    render(<Badge text="Badge" />);
    const badge = screen.getByText("Badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(styles["c-badge"]);
  });

  it("forwards native span attributes", () => {
    render(<Badge text="Badge" data-testid="badge" />);
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });

  it("appends custom classes after the module class", () => {
    render(<Badge text="Badge" className="custom" />);
    expect(screen.getByText("Badge")).toHaveClass(styles["c-badge"], "custom");
  });

  describe("tone", () => {
    it("defaults to neutral when not set", () => {
      render(<Badge text="Badge" />);
      expect(screen.getByText("Badge")).toHaveAttribute("data-tone", "neutral");
    });

    it("sets data-tone to positive", () => {
      render(<Badge text="Badge" tone="positive" />);
      expect(screen.getByText("Badge")).toHaveAttribute("data-tone", "positive");
    });

    it("sets data-tone to negative", () => {
      render(<Badge text="Badge" tone="negative" />);
      expect(screen.getByText("Badge")).toHaveAttribute("data-tone", "negative");
    });
  });
});
