import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

const tabs = [
  { id: "first", label: "First" },
  { id: "second", label: "Second", badge: { label: "3" } },
  { id: "third", label: "Third" },
];

describe("Tabs", () => {
  it("renders the configured tabs in a tablist and selects the first by default", () => {
    render(<Tabs tabs={tabs} />);

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: /Second/ })).toHaveTextContent("3");
  });

  it("honors defaultSelectedId", () => {
    render(<Tabs tabs={tabs} defaultSelectedId="third" />);

    expect(screen.getByRole("tab", { name: "Third" })).toHaveAttribute("aria-selected", "true");
  });

  it.each(["pill", "underline"] as const)("applies the %s variant to each tab", (variant) => {
    render(<Tabs tabs={tabs} variant={variant} />);

    for (const tab of screen.getAllByRole("tab")) {
      expect(tab).toHaveAttribute("data-variant", variant);
    }
  });

  describe("overflow", () => {
    afterEach(() => {
      vi.restoreAllMocks();
      delete (HTMLElement.prototype as { scrollIntoView?: unknown }).scrollIntoView;
    });

    /** jsdom has no layout, so scrollIntoView is stubbed; we assert calls. */
    const stubScrollIntoView = () => {
      HTMLElement.prototype.scrollIntoView = vi.fn();
      return vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    };

    it("exposes data-overflow on the tablist, defaulting to wrap", () => {
      render(<Tabs tabs={tabs} />);
      expect(screen.getByRole("tablist")).toHaveAttribute("data-overflow", "wrap");
    });

    it("exposes data-overflow=scroll when configured", () => {
      render(<Tabs tabs={tabs} overflow="scroll" />);
      expect(screen.getByRole("tablist")).toHaveAttribute("data-overflow", "scroll");
    });

    it("scrolls the clicked tab into view only in scroll mode", async () => {
      const user = userEvent.setup();
      const scrollIntoView = stubScrollIntoView();

      const { unmount } = render(<Tabs tabs={tabs} overflow="scroll" />);
      await user.click(screen.getByRole("tab", { name: /Second/ }));
      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      unmount();

      scrollIntoView.mockClear();
      render(<Tabs tabs={tabs} />);
      await user.click(screen.getByRole("tab", { name: /Second/ }));
      expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it("scrolls the keyboard-selected tab into view only in scroll mode", () => {
      const scrollIntoView = stubScrollIntoView();

      const { unmount } = render(<Tabs tabs={tabs} overflow="scroll" defaultSelectedId="third" />);
      fireEvent.keyDown(screen.getByRole("tab", { name: "Third" }), {
        key: "Home",
      });
      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      unmount();

      scrollIntoView.mockClear();
      render(<Tabs tabs={tabs} defaultSelectedId="third" />);
      fireEvent.keyDown(screen.getByRole("tab", { name: "Third" }), {
        key: "Home",
      });
      expect(scrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe("selection", () => {
    it("selects a tab on click and calls onChange", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Tabs tabs={tabs} onChange={onChange} />);

      await user.click(screen.getByRole("tab", { name: /Second/ }));

      expect(screen.getByRole("tab", { name: /Second/ })).toHaveAttribute("aria-selected", "true");
      expect(onChange).toHaveBeenCalledWith("second");
    });
  });

  describe("keyboard navigation", () => {
    it("moves focus and selection to the next tab on ArrowRight", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={tabs} />);

      await user.tab(); // enters the tablist on the selected (first) tab
      fireEvent.keyDown(screen.getByRole("tab", { name: "First" }), {
        key: "ArrowRight",
      });

      expect(screen.getByRole("tab", { name: /Second/ })).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tab", { name: /Second/ })).toHaveFocus();
    });

    it("wraps from the last tab to the first on ArrowRight", () => {
      render(<Tabs tabs={tabs} defaultSelectedId="third" />);

      fireEvent.keyDown(screen.getByRole("tab", { name: "Third" }), {
        key: "ArrowRight",
      });

      expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tab", { name: "First" })).toHaveFocus();
    });

    it("moves to the previous tab on ArrowLeft", () => {
      render(<Tabs tabs={tabs} defaultSelectedId="second" />);

      fireEvent.keyDown(screen.getByRole("tab", { name: /Second/ }), {
        key: "ArrowLeft",
      });

      expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tab", { name: "First" })).toHaveFocus();
    });

    it("jumps to the first and last tab on Home and End", () => {
      render(<Tabs tabs={tabs} defaultSelectedId="second" />);
      const second = screen.getByRole("tab", { name: /Second/ });

      fireEvent.keyDown(second, { key: "End" });
      expect(screen.getByRole("tab", { name: "Third" })).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tab", { name: "Third" })).toHaveFocus();

      fireEvent.keyDown(screen.getByRole("tab", { name: "Third" }), { key: "Home" });
      expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tab", { name: "First" })).toHaveFocus();
    });
  });
});
