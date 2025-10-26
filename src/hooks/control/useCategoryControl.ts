import { v4 as uuidv4 } from "uuid";
import { useSplitControlStore } from "@/stores/splitControl/useSplitControlStore";
import type { WorkoutCategory } from "../../types/splits";
import { useSplitBase } from "../splitControl/useSplitBase";

export function useCategoryControl() {
  const { split, updateSplit, selectedDay } = useSplitBase();
  const {
    selectedCategoryId,
    setSelectedCategoryId,
    newCategoryName,
    setNewCategoryName,
    newCategoryColor,
    setNewCategoryColor,
  } = useSplitControlStore();

  // Categories for currently selected day (or empty if none)
  const categories = split?.days.find((d) => d.day === selectedDay)?.categories ?? [];

  const addCategory = () => {
    if (!split || !selectedDay || !newCategoryName.trim()) return;

    // Build new category with default color & empty exercise list
    const newCategory: WorkoutCategory = {
      id: uuidv4(),
      name: newCategoryName.trim(),
      color: newCategoryColor ?? "#ff0000",
      exercises: [],
    };

    // Insert category into selected day
    const updatedDays = split.days.map((d) =>
      d.day === selectedDay ? { ...d, categories: [...(d.categories ?? []), newCategory] } : d
    );

    updateSplit(split.id, { days: updatedDays });

    // Reset UI input + select the created category
    setNewCategoryName("");
    setNewCategoryColor("#ff0000");
    setSelectedCategoryId(newCategory.id);
  };

  const deleteCategory = (categoryId: string) => {
    if (!split || !selectedDay) return;

    // Remove from categories of current day
    const updatedDays = split.days.map((d) =>
      d.day === selectedDay
        ? {
            ...d,
            categories: d.categories?.filter((c) => c.id !== categoryId) ?? [],
          }
        : d
    );

    updateSplit(split.id, { days: updatedDays });

    // Clear selection if we deleted the active one
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    }
  };

  const updateCategory = (categoryId: string, updatedFields: Partial<Pick<WorkoutCategory, "name" | "color">>) => {
    if (!split || !selectedDay) return;

    // Patch category fields inside current day
    const updatedDays = split.days.map((d) =>
      d.day === selectedDay
        ? {
            ...d,
            categories: d.categories?.map((c) => (c.id === categoryId ? { ...c, ...updatedFields } : c)),
          }
        : d
    );

    updateSplit(split.id, { days: updatedDays });
  };

  return {
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    newCategoryName,
    setNewCategoryName,
    newCategoryColor,
    setNewCategoryColor,
    addCategory,
    deleteCategory,
    updateCategory,
  };
}
