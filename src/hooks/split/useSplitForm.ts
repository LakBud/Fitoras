import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useSplitsStore } from "@/stores/split/useSplitStore";
import { useCurrentCategories, type Category } from "@/stores/split/useCurrentCategories";
import type { WorkoutDay, Weekday } from "@/types/splits";

const allWeekdays: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const LAST_CATEGORY_KEY = "fitoras_last_selected_category";

export interface FormValues {
  name: string;
  description?: string;
  categoryId?: string;
  newCategoryName?: string;
  newCategoryColor?: string;
}

export const useSplitForm = (
  onClose: () => void,
  splitToEdit?: { id: string; name: string; description?: string; category?: Category }
) => {
  const addSplit = useSplitsStore((state) => state.addSplit);
  const categories = useCurrentCategories((state) => state.categories);
  const addCategory = useCurrentCategories((state) => state.addCategory);

  const form = useForm<FormValues>({
    defaultValues: splitToEdit
      ? {
          name: splitToEdit.name,
          description: splitToEdit.description,
          categoryId: splitToEdit.category?.id,
        }
      : {},
  });

  const { watch, setValue, reset, handleSubmit } = form;
  const watchCategoryId = watch("categoryId");

  // Load last selected category
  useEffect(() => {
    const lastCategoryId = localStorage.getItem(LAST_CATEGORY_KEY);
    if (lastCategoryId && categories.some((c) => c.id === lastCategoryId)) {
      setValue("categoryId", lastCategoryId);
    }
  }, [categories, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let category: Category | undefined;

    if (watchCategoryId === "new" && data.newCategoryName && data.newCategoryColor) {
      category = addCategory({ name: data.newCategoryName, color: data.newCategoryColor });
    } else if (data.categoryId) {
      category = categories.find((c) => c.id === data.categoryId);
    }

    // -----------------------------
    // EDIT MODE — splitToEdit exists
    // -----------------------------
    if (splitToEdit) {
      useSplitsStore.getState().updateSplit(splitToEdit.id, {
        name: data.name.trim(),
        description: data.description?.trim() || undefined,
        category: category ?? undefined, // <-- THIS CLEARS CATEGORY
      });

      if (category?.id) {
        localStorage.setItem(LAST_CATEGORY_KEY, category.id);
      }

      reset();
      onClose();
      return;
    }

    // -----------------------------
    // CREATE MODE — new split
    // -----------------------------
    const newSplit = {
      id: uuidv4(),
      name: data.name.trim(),
      description: data.description?.trim() || undefined,
      category,
      days: allWeekdays.map<WorkoutDay>((day) => ({ day, exercises: [] })),
    };

    addSplit(newSplit);

    if (category?.id) localStorage.setItem(LAST_CATEGORY_KEY, category.id);

    reset();
    onClose();
  };

  return { form, onSubmit: handleSubmit(onSubmit), watchCategoryId, categories };
};
