import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import type { Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SplitList from "@/components/split/list/SplitList";

// Mock the custom hook
vi.mock("@/hooks/split/splitList", () => ({
  useSplitList: vi.fn(),
}));

import { useSplitList } from "@/hooks/split/splitList";

describe("SplitList component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders empty state when no splits", () => {
    (useSplitList as Mock).mockReturnValue({
      splits: [],
      filteredSplits: [],
      activeSplit: null,
      sensors: [],
      handleDragStart: vi.fn(),
      handleDragEnd: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SplitList />
      </MemoryRouter>
    );

    expect(screen.getByText("No split has been created.")).toBeInTheDocument();
    expect(screen.getByText("Click the + button on the corner to get started!")).toBeInTheDocument();
  });

  it("renders filtered empty state when no splits match filters", () => {
    (useSplitList as Mock).mockReturnValue({
      splits: [{ id: "1", name: "Split 1" }],
      filteredSplits: [],
      activeSplit: null,
      sensors: [],
      handleDragStart: vi.fn(),
      handleDragEnd: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SplitList />
      </MemoryRouter>
    );

    expect(screen.getByText("No splits match your filters.")).toBeInTheDocument();
    expect(screen.getByText("Maybe search something else?")).toBeInTheDocument();
  });

  it("renders splits when available", () => {
    (useSplitList as Mock).mockReturnValue({
      splits: [
        { id: "1", name: "Split 1", description: "Desc 1", category: { name: "Cat", color: "red" } },
        { id: "2", name: "Split 2", description: "Desc 2", category: null },
      ],
      filteredSplits: [
        { id: "1", name: "Split 1", description: "Desc 1", category: { name: "Cat", color: "red" } },
        { id: "2", name: "Split 2", description: "Desc 2", category: null },
      ],
      activeSplit: null,
      sensors: [],
      handleDragStart: vi.fn(),
      handleDragEnd: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SplitList />
      </MemoryRouter>
    );

    expect(screen.getByText("Split 1")).toBeInTheDocument();
    expect(screen.getByText("Split 2")).toBeInTheDocument();
  });

  it("renders DragOverlay when activeSplit is present", () => {
    (useSplitList as Mock).mockReturnValue({
      splits: [{ id: "1", name: "Split 1", description: "Desc 1", category: { name: "Cat", color: "red" } }],
      filteredSplits: [{ id: "1", name: "Split 1", description: "Desc 1", category: { name: "Cat", color: "red" } }],
      activeSplit: { id: "1", name: "Split 1", description: "Desc 1", category: { name: "Cat", color: "red" } },
      sensors: [],
      handleDragStart: vi.fn(),
      handleDragEnd: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SplitList />
      </MemoryRouter>
    );

    expect(screen.getByText("Split 1")).toBeInTheDocument();
    expect(screen.getByText("Cat")).toBeInTheDocument();
    expect(screen.getByText("Desc 1")).toBeInTheDocument();
  });
});
