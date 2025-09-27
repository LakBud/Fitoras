import { create } from "zustand";
import type { Split } from "../types/splits";
import { v4 as uuidv4 } from "uuid";

interface SplitsState {
  splits: Split[];
  addSplit: (split: Omit<Split, "id">) => void;
  removeSplit: (id: string) => void;
  updateSplit: (id: string, updatedFields: Partial<Omit<Split, "id">>) => void;
  setSplits: (splits: Split[]) => void;
}

const STORAGE_KEY = "fitoras_splits";

export const useSplitsStore = create<SplitsState>((set, get) => {
  // Load splits from localStorage on store creation
  let initialSplits: Split[] = [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      initialSplits = JSON.parse(stored) as Split[];
    } catch (err) {
      console.error("Failed to parse stored splits:", err);
    }
  }

  return {
    splits: initialSplits,

    addSplit: (split) => {
      const newSplit: Split = { ...split, id: uuidv4() };
      const updated = [...get().splits, newSplit];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      set({ splits: updated });
    },

    removeSplit: (id) => {
      const updated = get().splits.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      set({ splits: updated });
    },

    updateSplit: (id, updatedFields) => {
      const updated = get().splits.map((s) => (s.id === id ? { ...s, ...updatedFields } : s));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      set({ splits: updated });
    },

    setSplits: (splits) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(splits));
      set({ splits });
    },
  };
});
