import { create } from "zustand";
import { useCurrentCategories } from "./useCurrentCategories";

interface SplitFilterState {
  name: string;
  categoryId: string;
  categories: { id: string; name: string }[];
  setName: (name: string) => void;
  setCategoryId: (categoryId: string) => void;
  setFilters: (filters: Partial<{ name: string; categoryId: string }>) => void;
  resetFilters: () => void;
  updateCategories: () => void;
}

export const useSplitFilterStore = create<SplitFilterState>((set) => ({
  name: "",
  categoryId: "",
  categories: [],
  setName: (name) => set({ name }),
  setCategoryId: (categoryId) => set({ categoryId }),
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  resetFilters: () => set({ name: "", categoryId: "" }),
  updateCategories: () => {
    const { categories } = useCurrentCategories.getState();
    set({ categories });
  },
}));
