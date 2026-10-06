import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";
import styles from "./Badge.module.scss";

describe("Badge", () => {
  it("renders with the local badge class", () => {
    render(<Badge>Badge</Badge>);
    const badge = screen.getByText("Badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(styles["c-badge"]);
  });

  it("forwards native span attributes", () => {
    render(<Badge data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });

  it("appends custom classes after the module class", () => {
    render(<Badge className="custom">Badge</Badge>);
    expect(screen.getByText("Badge")).toHaveClass(styles["c-badge"], "custom");
  });

  describe("tone", () => {
    it("defaults to neutral when not set", () => {
      render(<Badge>Badge</Badge>);
      expect(screen.getByText("Badge")).toHaveAttribute("data-tone", "neutral");
    });

    it("sets data-tone to positive", () => {
      render(<Badge tone="positive">Badge</Badge>);
      expect(screen.getByText("Badge")).toHaveAttribute("data-tone", "positive");
    });

    it("sets data-tone to negative", () => {
      render(<Badge tone="negative">Badge</Badge>);
      expect(screen.getByText("Badge")).toHaveAttribute("data-tone", "negative");
    });
  });
});
