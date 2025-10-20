import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { useSplitsStore } from "./useSplitStore";

export interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoriesState {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => Category;
  updateCategory: (id: string, updatedFields: Partial<Omit<Category, "id">>) => void;
  removeCategory: (id: string) => void;
  setCategories: (categories: Category[]) => void;
}

export const useCurrentCategories = create<CategoriesState>()(
  persist(
    (set, get) => ({
      categories: [],

      addCategory: (category) => {
        const newCategory: Category = { ...category, id: uuidv4() };
        const updated = [...get().categories, newCategory];
        set({ categories: updated });
        return newCategory;
      },

      updateCategory: (id, updatedFields) => {
        set({
          categories: get().categories.map((c) => (c.id === id ? { ...c, ...updatedFields } : c)),
        });
      },

      removeCategory: (id) => {
        // Remove category from current categories
        set({
          categories: get().categories.filter((c) => c.id !== id),
        });

        // Reset category for any splits that had this category
        const splits = useSplitsStore.getState().splits;
        const updateSplit = useSplitsStore.getState().updateSplit;

        splits.forEach((split) => {
          if (split.category?.id === id) {
            updateSplit(split.id, { category: undefined });
          }
        });
      },

      setCategories: (categories) => set({ categories }),
    }),
    {
      name: "fitoras_categories", //  localStorage key
    }
  )
);

export type UseCurrentCategoriesType = CategoriesState;
