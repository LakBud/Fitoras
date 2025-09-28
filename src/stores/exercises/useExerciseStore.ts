import { create } from "zustand";
import { type Exercises } from "../../types/exercise";
import axios from "axios";

const STORAGE_KEY = "exercises";

interface ExerciseState {
  exercises: Exercises[];
  loading: boolean;
  visibleCount: number; // how many items are currently loaded
  scrollPosition: number; // scrollY
  fetchExercises: (jsonPath?: string) => void;
  setExercises: (exercises: Exercises[]) => void; // <--- added
  setVisibleCount: (count: number) => void;
  setScrollPosition: (pos: number) => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],
  loading: true,
  visibleCount: 0,
  scrollPosition: 0,

  // Fetch exercises from JSON or localStorage
  fetchExercises: async (jsonPath = "/data/allExercises.json") => {
    set({ loading: true });

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        set({ exercises: JSON.parse(stored), loading: false });
        return;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    try {
      const res = await axios.get<Exercises[]>(jsonPath);
      set({ exercises: res.data });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  // Set exercises directly
  setExercises: (exercises) => set({ exercises }),

  setVisibleCount: (count) => set({ visibleCount: count }),
  setScrollPosition: (pos) => set({ scrollPosition: pos }),
}));
