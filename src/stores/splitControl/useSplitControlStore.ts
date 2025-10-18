import { create } from "zustand";
import type { Weekday } from "../../types/splits";

interface SplitControlState {
  splitId: string | null;
  selectedDay: Weekday;
  selectedCategoryId: string | null;
  newCategoryName: string;
  newCategoryColor: string | null;

  setSplitId: (id: string) => void;
  setSelectedDay: (day: Weekday) => void;
  setSelectedCategoryId: (id: string | null) => void;
  setNewCategoryName: (name: string) => void;
  setNewCategoryColor: (color: string | null) => void;
  resetEditor: () => void;
}

export const useSplitControlStore = create<SplitControlState>((set) => ({
  splitId: null,
  selectedDay: "Monday",
  selectedCategoryId: null,
  newCategoryName: "",
  newCategoryColor: "#ff0000",

  setSplitId: (id) => set({ splitId: id }),
  setSelectedDay: (day) => set({ selectedDay: day }),
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
  setNewCategoryName: (name) => set({ newCategoryName: name }),
  setNewCategoryColor: (color) => set({ newCategoryColor: color }),

  resetEditor: () =>
    set({
      splitId: null,
      selectedDay: "Monday",
      selectedCategoryId: null,
      newCategoryName: "",
      newCategoryColor: "#ff0000",
    }),
}));
