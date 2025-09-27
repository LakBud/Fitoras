import { create } from "zustand";
import type { Split } from "../types/splits";

interface SplitsState {
  splits: Split[];
  addSplit: (split: Split) => void;
  removeSplit: (id: string) => void;
  updateSplit: (id: string, updatedFields: Partial<Omit<Split, "id">>) => void;
}

export const useSplitsStore = create<SplitsState>((set) => ({
  splits: [],

  addSplit: (split) =>
    set((state) => ({
      splits: [...state.splits, split],
    })),

  removeSplit: (id) =>
    set((state) => ({
      splits: state.splits.filter((s) => s.id !== id),
    })),

  updateSplit: (id, updatedFields) =>
    set((state) => ({
      splits: state.splits.map((split) => (split.id === id ? { ...split, ...updatedFields } : split)),
    })),
}));
