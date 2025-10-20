import { useEffect, useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSplitsStore } from "@/stores/split/useSplitStore";
import { useCurrentCategories, type UseCurrentCategoriesType, type Category } from "@/stores/split/useCurrentCategories";
import { useThemeColor } from "@/hooks/ui/useThemeColor";

interface UseEditSplitFormArgs {
  splitToEdit: {
    id: string;
    name: string;
    description?: string;
    category?: Category;
  };
}

export interface FormValues {
  name: string;
  description?: string;
  categoryId?: string;
  newCategoryName?: string;
  newCategoryColor?: string;
}

export function useEditSplitForm({ splitToEdit }: UseEditSplitFormArgs) {
  // --- STORES ---
  const updateSplit = useSplitsStore((s) => s.updateSplit);
  const categories = useCurrentCategories((s: UseCurrentCategoriesType) => s.categories);
  const splitsState = useSplitsStore.getState(); // direct read (not reactive)
  const addCategory = useCurrentCategories((s) => s.addCategory);
  const updateCategory = useCurrentCategories((s) => s.updateCategory);

  // --- LOCAL STATE FOR COLOR EDITING ---
  const [editingCategoryColor, setEditingCategoryColor] = useState("");
  const [originalCategoryColor, setOriginalCategoryColor] = useState("");

  // --- REACT HOOK FORM ---
  const { register, handleSubmit, watch, setValue, reset, formState, control } = useForm<FormValues>();
  const watchCategoryId = watch("categoryId"); // currently selected category
  const watchNewCategoryColor = watch("newCategoryColor"); // color of new category input

  // --- COMPUTE CATEGORY COLOR TO PREVIEW ---
  const currentColor = useMemo(() => {
    if (watchCategoryId === "new") return watchNewCategoryColor || "#6B7280";
    if (!watchCategoryId) return "#6B7280"; // None selected
    return editingCategoryColor || categories.find((c) => c.id === watchCategoryId)?.color || "#6B7280";
  }, [watchCategoryId, watchNewCategoryColor, categories, editingCategoryColor]);

  // --- THEME BASED ON CURRENT COLOR ---
  const theme = useThemeColor(currentColor);
  const originalTheme = useThemeColor(splitToEdit.category?.color);

  // --- INITIAL FORM SETUP ---
  useEffect(() => {
    setValue("name", splitToEdit.name);
    setValue("description", splitToEdit.description || "");
    setValue("categoryId", splitToEdit.category?.id || "");
  }, [splitToEdit, setValue]);

  // --- WHEN USER CHOOSES EXISTING CATEGORY, LOAD ITS COLOR ---
  useEffect(() => {
    if (watchCategoryId && watchCategoryId !== "new") {
      const cat = categories.find((c) => c.id === watchCategoryId);
      if (cat) {
        setEditingCategoryColor(cat.color);
        setOriginalCategoryColor(cat.color);
      }
    }
  }, [watchCategoryId, categories]);

  const handleCategoryColorChange = (c: string) => setEditingCategoryColor(c);

  // --- FORM SUBMIT ---
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let category: Category | undefined;

    switch (watchCategoryId) {
      // === CASE: Create a new category ===
      case "new":
        if (data.newCategoryName && data.newCategoryColor) {
          category = addCategory({
            name: data.newCategoryName,
            color: data.newCategoryColor,
          });
        }
        break;

      // === CASE: Clear category (None selected) ===
      case "":
      case undefined:
        category = undefined;
        break;

      // === CASE: Existing category selected ===
      default: {
        const existing = categories.find((c) => c.id === watchCategoryId);
        if (existing) {
          // If color changed, update category and all splits using it
          if (editingCategoryColor !== originalCategoryColor) {
            updateCategory(existing.id, { color: editingCategoryColor });

            splitsState.splits.forEach((split) => {
              if (split.category?.id === existing.id) {
                splitsState.updateSplit(split.id, {
                  category: { ...split.category, color: editingCategoryColor },
                });
              }
            });

            category = { ...existing, color: editingCategoryColor };
          } else {
            category = existing;
          }
        }
        break;
      }
    }

    // === Update THIS split ===
    updateSplit(splitToEdit.id, {
      name: data.name.trim(),
      description: data.description?.trim() || undefined,
      category: category ?? undefined, // explicit clear
    });

    reset();
  };

  // --- HANDLER WHEN CATEGORY IS DELETED ---
  const handleCategoryDeleted = () => {
    setValue("categoryId", "");
    setEditingCategoryColor("");
    setOriginalCategoryColor("");
  };

  return {
    // form stuff
    register,
    handleSubmit,
    onSubmit,
    control,
    formState,

    // category editing state
    watchCategoryId,
    editingCategoryColor,
    originalCategoryColor,
    handleCategoryColorChange,
    handleCategoryDeleted,

    // theme + data
    theme,
    originalTheme,
    categories,
  };
}
