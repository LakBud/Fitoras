import { create } from "zustand";
import type { Split } from "../../types/splits";

interface CurrentSplitState {
  splits: Split[];
  currentSplit: Split | null;
  setCurrentSplit: (split: Split | null) => void;
  getSplitById: (id: string) => Split | undefined;
  clearCurrentSplit: () => void;
}

export const useCurrentSplitStore = create<CurrentSplitState>((set, get) => ({
  splits: [],
  currentSplit: null,
  setCurrentSplit: (split) => set({ currentSplit: split }),
  clearCurrentSplit: () => set({ currentSplit: null }),

  getSplitById: (id: string) => {
    return get().splits.find((s) => s.id === id);
  },
}));
