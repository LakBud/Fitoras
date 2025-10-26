import { create } from "zustand";
import { getFromDB, saveToDB } from "../../lib/indexedDB";
import type { Split } from "../../types/splits";
import { v4 as uuidv4 } from "uuid";

const STORE_NAME = "splits";
const KEY = "splits_data";

interface SplitsState {
  splits: Split[];
  initialized: boolean;
  addSplit: (split: Omit<Split, "id">) => void;
  removeSplit: (id: string) => void;
  updateSplit: (id: string, updatedFields: Partial<Omit<Split, "id">>) => void;
  setSplits: (splits: Split[]) => void;
  loadSplits: () => Promise<void>;
}

// Persisted splits (workout "routines") store
export const useSplitsStore = create<SplitsState>((set, get) => ({
  splits: [],
  initialized: false,

  // Load from IndexedDB once
  loadSplits: async () => {
    if (get().initialized) return;
    const splits = await getFromDB<Split[]>(STORE_NAME, KEY);
    set({ splits: splits || [], initialized: true });
  },

  // Add a new split with a generated id
  addSplit: (split) => {
    const newSplit: Split = { ...split, id: uuidv4() };
    const updated = [...get().splits, newSplit];
    set({ splits: updated });
    saveToDB(STORE_NAME, KEY, updated);
  },

  // Remove split by id
  removeSplit: (id) => {
    const updated = get().splits.filter((s) => s.id !== id);
    set({ splits: updated });
    saveToDB(STORE_NAME, KEY, updated);
  },

  // Merge updates into an existing split by id
  updateSplit: (id, updatedFields) => {
    const updated = get().splits.map((s) => {
      if (s.id !== id) return s;
      const next = { ...s, ...updatedFields };

      // remove category key entirely if explicitly undefined
      if ("category" in updatedFields && updatedFields.category === undefined) {
        delete next.category;
      }

      return next;
    });

    set({ splits: updated });
    saveToDB(STORE_NAME, KEY, updated);
  },

  // Replace entire array and persist
  setSplits: (splits) => {
    set({ splits });
    saveToDB(STORE_NAME, KEY, splits);
  },
}));
