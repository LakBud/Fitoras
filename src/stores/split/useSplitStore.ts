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

export const useSplitsStore = create<SplitsState>((set, get) => ({
  splits: [],
  initialized: false,

  loadSplits: async () => {
    if (get().initialized) return;

    const splits = await getFromDB<Split[]>(STORE_NAME, KEY);
    set({ splits: splits || [], initialized: true });
  },

  addSplit: (split) => {
    const newSplit: Split = { ...split, id: uuidv4() };
    const updated = [...get().splits, newSplit];
    set({ splits: updated });
    saveToDB(STORE_NAME, KEY, updated);
  },

  removeSplit: (id) => {
    const updated = get().splits.filter((s) => s.id !== id);
    set({ splits: updated });
    saveToDB(STORE_NAME, KEY, updated);
  },

  updateSplit: (id, updatedFields) => {
    const updated = get().splits.map((s) => (s.id === id ? { ...s, ...updatedFields } : s));
    set({ splits: updated });
    saveToDB(STORE_NAME, KEY, updated);
  },

  setSplits: (splits) => {
    set({ splits });
    saveToDB(STORE_NAME, KEY, splits);
  },
}));
