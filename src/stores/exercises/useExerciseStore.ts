import { create } from "zustand";
import { getFromDB, saveToDB } from "../../lib/indexedDB";
import { type Exercises } from "../../types/exercise";
import axios from "axios";

const STORE_NAME = "exercises";
const KEY = "exerciseData";

interface ExerciseState {
  exercises: Exercises[];
  loading: boolean;
  visibleCount: number;
  scrollPosition: number;
  fetchExercises: (jsonPath?: string) => void;
  setExercises: (exercises: Exercises[]) => void;
  setVisibleCount: (count: number) => void;
  setScrollPosition: (pos: number) => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],
  loading: true,
  visibleCount: 0,
  scrollPosition: 0,

  fetchExercises: async (jsonPath = "/data/allExercises.json") => {
    set({ loading: true });

    // Try to get from IndexedDB first
    const stored = await getFromDB<Exercises[]>(STORE_NAME, KEY);
    if (stored) {
      set({ exercises: stored, loading: false });
      return;
    }

    // Fetch from network if not in IndexedDB
    try {
      const res = await axios.get<Exercises[]>(jsonPath);
      set({ exercises: res.data });
      // Save to IndexedDB for future use
      await saveToDB(STORE_NAME, KEY, res.data);
    } catch (err) {
      console.error("Error fetching exercises:", err);
    } finally {
      set({ loading: false });
    }
  },

  setExercises: (exercises) => {
    set({ exercises });
    saveToDB(STORE_NAME, KEY, exercises);
  },

  setVisibleCount: (count) => set({ visibleCount: count }),
  setScrollPosition: (pos) => set({ scrollPosition: pos }),
}));
