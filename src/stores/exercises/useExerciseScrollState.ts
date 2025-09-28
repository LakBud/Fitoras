import { create } from "zustand";

interface ExerciseScrollState {
  scrollY: number;
  setScrollY: (pos: number) => void;
}

export const useScrollStore = create<ExerciseScrollState>((set) => ({
  scrollY: 0,
  setScrollY: (pos) => set({ scrollY: pos }),
}));
