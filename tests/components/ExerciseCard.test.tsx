import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ExerciseCard } from "@/components/exercise/ExerciseCard";

const mockExercise = {
  id: "1",
  name: "Push Up",
  category: "Strength",
  primaryMuscles: ["Chest", "Triceps"],
  images: ["pushup.jpg"],
};

describe("ExerciseCard", () => {
  it("renders exercise name, category, and muscles", () => {
    render(
      <MemoryRouter>
        <ExerciseCard exercise={mockExercise} />
      </MemoryRouter>
    );

    // Check name
    expect(screen.getByText("Push Up")).toBeDefined();

    // Check category and muscles
    expect(screen.getByText("Strength | Chest, Triceps")).toBeDefined();

    // Check image
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.src).toContain("pushup.jpg");

    // Check link
    const link = screen.getByRole("link") as HTMLAnchorElement;
    expect(link.href).toContain("/exercise/1");
  });

  it("falls back to 'General' if category is missing", () => {
    const exerciseWithoutCategory = { ...mockExercise, category: undefined };
    render(
      <MemoryRouter>
        <ExerciseCard exercise={exerciseWithoutCategory} />
      </MemoryRouter>
    );

    expect(screen.getByText("General | Chest, Triceps")).toBeDefined();
  });

  it("does not render muscles if primaryMuscles is empty", () => {
    const exerciseWithoutMuscles = { ...mockExercise, primaryMuscles: [] };
    render(
      <MemoryRouter>
        <ExerciseCard exercise={exerciseWithoutMuscles} />
      </MemoryRouter>
    );

    expect(screen.getByText("Strength")).toBeDefined();
  });
});
