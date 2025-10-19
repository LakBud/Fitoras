import { useEffect, useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSplitsStore } from "@/stores/split/useSplitStore";
import { useCurrentCategories, type UseCurrentCategoriesType, type Category } from "@/stores/splitControl/useCurrentCategories";
import { useCurrentSplitStore } from "@/stores/split/useCurrentSplitStore";
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
  const updateSplit = useSplitsStore((s) => s.updateSplit);
  const splitsState = useSplitsStore.getState();
  const categories = useCurrentCategories((s: UseCurrentCategoriesType) => s.categories);
  const addCategory = useCurrentCategories((s) => s.addCategory);
  const updateCategory = useCurrentCategories((s) => s.updateCategory);
  const { currentSplit } = useCurrentSplitStore();

  const [editingCategoryColor, setEditingCategoryColor] = useState("");
  const [originalCategoryColor, setOriginalCategoryColor] = useState("");

  const { register, handleSubmit, watch, setValue, reset, formState, control } = useForm<FormValues>();
  const watchCategoryId = watch("categoryId");
  const watchNewCategoryColor = watch("newCategoryColor");

  const currentColor = useMemo(() => {
    if (watchCategoryId === "new") return watchNewCategoryColor || "#6B7280";
    if (!watchCategoryId) return "#6B7280";
    return (
      editingCategoryColor || categories.find((c) => c.id === watchCategoryId)?.color || splitToEdit.category?.color || "#6B7280"
    );
  }, [watchCategoryId, watchNewCategoryColor, categories, splitToEdit.category?.color, editingCategoryColor]);

  const theme = useThemeColor(currentColor);
  const originalTheme = useThemeColor(currentSplit?.category?.color);

  useEffect(() => {
    setValue("name", splitToEdit.name);
    setValue("description", splitToEdit.description || "");
    setValue("categoryId", splitToEdit.category?.id || "");
  }, [splitToEdit, setValue]);

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let category: Category | null | undefined;

    if (watchCategoryId === "new" && data.newCategoryName && data.newCategoryColor) {
      category = addCategory({ name: data.newCategoryName, color: data.newCategoryColor });
    } else if (data.categoryId) {
      category = categories.find((c) => c.id === data.categoryId);
      if (category && editingCategoryColor !== originalCategoryColor) {
        updateCategory(category.id, { color: editingCategoryColor });
        splitsState.splits.forEach((split) => {
          if (split.category?.id === category!.id) {
            splitsState.updateSplit(split.id, {
              category: { ...split.category!, color: editingCategoryColor },
            });
          }
        });
        category = { ...category!, color: editingCategoryColor };
      }
    }

    updateSplit(splitToEdit.id, {
      name: data.name.trim(),
      description: data.description?.trim() || undefined,
      ...(category && { category }),
    });

    reset();
  };

  const handleCategoryDeleted = () => {
    setValue("categoryId", "");
    setEditingCategoryColor("");
    setOriginalCategoryColor("");
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    watchCategoryId,
    editingCategoryColor,
    originalCategoryColor,
    handleCategoryColorChange,
    handleCategoryDeleted,
    formState,
    theme,
    originalTheme,
    categories,
    control,
  };
}
