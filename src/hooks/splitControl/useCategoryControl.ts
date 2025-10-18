import { v4 as uuidv4 } from "uuid";
import { useSplitControlStore } from "@/stores/splitControl/useSplitControlStore";
import type { WorkoutCategory } from "../../types/splits";
import { useSplitBase } from "./useSplitBase";

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

  const categories = split?.days.find((d) => d.day === selectedDay)?.categories ?? [];

  const addCategory = () => {
    if (!split || !selectedDay || !newCategoryName.trim()) return;

    const newCategory: WorkoutCategory = {
      id: uuidv4(),
      name: newCategoryName.trim(),
      color: newCategoryColor ?? "#ff0000",
      exercises: [],
    };

    const updatedDays = split.days.map((d) =>
      d.day === selectedDay ? { ...d, categories: [...(d.categories ?? []), newCategory] } : d
    );

    updateSplit(split.id, { days: updatedDays });
    setNewCategoryName("");
    setNewCategoryColor("#ff0000");
    setSelectedCategoryId(newCategory.id);
  };

  const deleteCategory = (categoryId: string) => {
    if (!split || !selectedDay) return;

    const updatedDays = split.days.map((d) =>
      d.day === selectedDay
        ? {
            ...d,
            categories: d.categories?.filter((c) => c.id !== categoryId) ?? [],
          }
        : d
    );

    updateSplit(split.id, { days: updatedDays });

    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    }
  };

  const updateCategory = (categoryId: string, updatedFields: Partial<Pick<WorkoutCategory, "name" | "color">>) => {
    if (!split || !selectedDay) return;

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
    updateCategory, // replaces both name+color updaters
  };
}
