import { create } from "zustand";
import { useCurrentCategories } from "./useCurrentCategories";

interface SplitFilterState {
  name: string;
  categoryId: string;
  categories: { id: string; name: string }[]; // optional if you want to store categories here
  setName: (name: string) => void;
  setCategoryId: (categoryId: string) => void;
  resetFilters: () => void;
  updateCategories: () => void; // optional helper
}

export const useSplitFilterStore = create<SplitFilterState>((set) => ({
  name: "",
  categoryId: "",
  categories: [],
  setName: (name) => set({ name }),
  setCategoryId: (categoryId) => set({ categoryId }),
  resetFilters: () => set({ name: "", categoryId: "" }),
  updateCategories: () => {
    const { categories } = useCurrentCategories.getState(); // get categories from other store
    set({ categories });
  },
}));
