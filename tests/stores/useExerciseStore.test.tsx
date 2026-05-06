import { describe, it, expect, beforeEach, vi } from "vitest";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import * as db from "../../src/lib/indexedDB";
import axios from "axios";
import type { Exercises } from "../../src/types/exercise";
import type { MockedFunction } from "vitest";

// Mock the entire IndexedDB module
vi.mock("../../src/lib/indexedDB", async () => {
  const actual: typeof import("../../src/lib/indexedDB") = await vi.importActual("../../src/lib/indexedDB");
  return {
    ...actual,
    getFromDB: vi.fn(), // mocked async function
    saveToDB: vi.fn(), // mocked async function
  };
});

// Mock axios
vi.mock("axios");

describe("useExerciseStore", () => {
  beforeEach(() => {
    // Reset Zustand store
    useExerciseStore.setState({
      exercises: [],
      loading: true,
      visibleCount: 0,
      scrollPosition: 0,
    });

    vi.clearAllMocks();
  });

  it("loads exercises from IndexedDB if available", async () => {
    const mockData: Exercises[] = [{ id: "1", name: "Push-ups", primaryMuscles: ["chest"], category: "strength" }];

    // Properly typed mocks
    (db.getFromDB as MockedFunction<typeof db.getFromDB>).mockResolvedValue(mockData);

    await useExerciseStore.getState().fetchExercises();

    const state = useExerciseStore.getState();
    expect(state.exercises).toEqual(mockData);
    expect(state.loading).toBe(false);
    expect(db.getFromDB).toHaveBeenCalledWith("exercises", "exerciseData");
    expect(axios.get).not.toHaveBeenCalled();
  });

  it("fetches exercises from axios if IndexedDB is empty", async () => {
    (db.getFromDB as MockedFunction<typeof db.getFromDB>).mockResolvedValue(null);

    const mockData: Exercises[] = [{ id: "2", name: "Squats", primaryMuscles: ["legs"], category: "strength" }];

    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockData });

    await useExerciseStore.getState().fetchExercises();

    const state = useExerciseStore.getState();
    expect(state.exercises).toEqual(mockData);
    expect(state.loading).toBe(false);
    expect(axios.get).toHaveBeenCalledWith("/data/allExercises.json");
    expect(db.saveToDB).toHaveBeenCalledWith("exercises", "exerciseData", mockData);
  });

  it("sets exercises manually and saves to IndexedDB", async () => {
    const newExercises: Exercises[] = [{ id: "3", name: "Burpees", primaryMuscles: ["full body"], category: "cardio" }];

    useExerciseStore.getState().setExercises(newExercises);

    const state = useExerciseStore.getState();
    expect(state.exercises).toEqual(newExercises);
    expect(db.saveToDB).toHaveBeenCalledWith("exercises", "exerciseData", newExercises);
  });

  it("updates visibleCount correctly", () => {
    useExerciseStore.getState().setVisibleCount(5);
    expect(useExerciseStore.getState().visibleCount).toBe(5);

    const currentCount = useExerciseStore.getState().visibleCount;
    useExerciseStore.getState().setVisibleCount(currentCount + 3);
    expect(useExerciseStore.getState().visibleCount).toBe(8);
  });

  it("updates scrollPosition correctly", () => {
    const setScrollPosition = useExerciseStore.getState().setScrollPosition;

    setScrollPosition(120);
    expect(useExerciseStore.getState().scrollPosition).toBe(120);
  });

  it("handles fetchExercises errors gracefully", async () => {
    (db.getFromDB as MockedFunction<typeof db.getFromDB>).mockResolvedValue(null);
    (axios.get as MockedFunction<typeof axios.get>).mockRejectedValue(new Error("Network error"));

    await useExerciseStore.getState().fetchExercises();

    const state = useExerciseStore.getState();
    expect(state.exercises).toEqual([]);
    expect(state.loading).toBe(false);
  });
});
