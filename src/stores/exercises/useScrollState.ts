import { create } from "zustand";

interface ScrollState {
  scrollY: number;
  setScrollY: (pos: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollY: 0,
  setScrollY: (pos) => set({ scrollY: pos }),
}));
