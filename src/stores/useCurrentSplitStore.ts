import { create } from "zustand";
import type { Split } from "../types/splits";

interface CurrentSplitState {
  currentSplit: Split | null;
  setCurrentSplit: (split: Split) => void;
  clearCurrentSplit: () => void;
}

export const useCurrentSplitStore = create<CurrentSplitState>((set) => ({
  currentSplit: null,
  setCurrentSplit: (split) => set({ currentSplit: split }),
  clearCurrentSplit: () => set({ currentSplit: null }),
}));
