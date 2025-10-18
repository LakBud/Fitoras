import { useState, useEffect, useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSplitsStore } from "@/stores/split/useSplitStore";
import { useCurrentCategories, type UseCurrentCategoriesType, type Category } from "@/stores/splitControl/useCurrentCategories";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { BsPersonFillGear } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CategoryDeleteButton from "./CategoryDeleteButton";
import { useCurrentSplitStore } from "@/stores/split/useCurrentSplitStore";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

interface EditSplitFormProps {
  splitToEdit: {
    id: string;
    name: string;
    description?: string;
    category?: Category;
  };
}

interface FormValues {
  name: string;
  description?: string;
  categoryId?: string;
  newCategoryName?: string;
  newCategoryColor?: string;
}

const EditSplitForm = ({ splitToEdit }: EditSplitFormProps) => {
  const updateSplit = useSplitsStore((state) => state.updateSplit);
  const categories = useCurrentCategories((state: UseCurrentCategoriesType) => state.categories);
  const addCategory = useCurrentCategories((state: UseCurrentCategoriesType) => state.addCategory);
  const updateCategory = useCurrentCategories((state: UseCurrentCategoriesType) => state.updateCategory);
  const { currentSplit } = useCurrentSplitStore();

  const [isOpen, setIsOpen] = useState(false);
  const [editingCategoryColor, setEditingCategoryColor] = useState<string>("");
  const [originalCategoryColor, setOriginalCategoryColor] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const watchCategoryId = watch("categoryId");
  const watchNewCategoryColor = watch("newCategoryColor");

  // Dynamically determine the color based on current form selection
  const currentColor = useMemo(() => {
    if (watchCategoryId === "new") return watchNewCategoryColor || "#6B7280";
    if (!watchCategoryId) return "#6B7280";
    return (
      editingCategoryColor || categories.find((c) => c.id === watchCategoryId)?.color || splitToEdit.category?.color || "#6B7280"
    );
  }, [watchCategoryId, watchNewCategoryColor, categories, splitToEdit.category?.color, editingCategoryColor]);

  const originalTheme = useThemeColor(currentSplit?.category?.color);
  const theme = useThemeColor(currentColor);

  useEffect(() => {
    setValue("name", splitToEdit.name);
    setValue("description", splitToEdit.description || "");
    setValue("categoryId", splitToEdit.category?.id || "");
  }, [splitToEdit, setValue]);

  // Update editingCategoryColor when category changes
  useEffect(() => {
    if (watchCategoryId && watchCategoryId !== "new") {
      const selectedCategory = categories.find((c) => c.id === watchCategoryId);
      if (selectedCategory) {
        setEditingCategoryColor(selectedCategory.color);
        setOriginalCategoryColor(selectedCategory.color);
      }
    }
  }, [watchCategoryId, categories]);

  const handleCategoryColorChange = (newColor: string) => {
    setEditingCategoryColor(newColor);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let category: Category | null | undefined;

    if (watchCategoryId === "new" && data.newCategoryName && data.newCategoryColor) {
      category = addCategory({ name: data.newCategoryName, color: data.newCategoryColor });
    } else if (data.categoryId) {
      category = categories.find((c) => c.id === data.categoryId);

      // If the category color was changed, update it
      if (category && editingCategoryColor !== originalCategoryColor) {
        updateCategory(category.id, { color: editingCategoryColor });

        // Update all splits that use this category
        const splits = useSplitsStore.getState().splits;
        const updateSplitFn = useSplitsStore.getState().updateSplit;

        if (!category) return;

        splits.forEach((split) => {
          if (!category) return;
          const cat = split.category;
          if (cat && cat.id === category.id) {
            updateSplitFn(split.id, {
              category: { ...cat, color: editingCategoryColor },
            });
          }
        });

        // Update the category object to reflect the new color
        category = { ...category, color: editingCategoryColor };
      }
    }
    updateSplit(splitToEdit.id, {
      name: data.name.trim(),
      description: data.description?.trim() || undefined,
      ...(category && { category }),
    });

    reset();
    setIsOpen(false);
  };

  const handleCategoryDeleted = () => {
    // Reset form selection to None if the selected category is deleted
    setValue("categoryId", "");
    setEditingCategoryColor("");
    setOriginalCategoryColor("");
  };

  return (
    <>
      <Button
        className="flex items-center gap-2"
        style={{ backgroundColor: originalTheme.primary, color: originalTheme.textOnPrimary }}
        onClick={() => setIsOpen(true)}
      >
        <BsPersonFillGear className="text-lg" /> Configure
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg w-full rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-extrabold break-words" style={{ color: theme.primary }}>
              Configure Split
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="flex flex-col space-y-1">
              <Label className="text-sm font-semibold break-words" style={{ color: theme.darker }}>
                Split Name
              </Label>
              <input
                {...register("name", { required: true })}
                placeholder="e.g. Push/Pull/Legs"
                className="w-full px-4 py-3 rounded-xl shadow-sm border focus:outline-none text-base break-words"
                style={{ borderColor: errors.name ? "#FF4D4F" : theme.translucentStrong, color: theme.dark }}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">This field is required</p>}
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-1">
              <Label className="text-sm font-semibold break-words" style={{ color: theme.darker }}>
                Description <span className="text-gray-400">(Optional)</span>
              </Label>
              <textarea
                {...register("description")}
                placeholder="Optional description..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl shadow-sm border focus:outline-none text-base break-words resize-none"
                style={{ borderColor: theme.translucentStrong, color: theme.dark }}
              />
            </div>

            {/* Category */}
            <div className="flex flex-col space-y-2">
              <Label className="text-sm font-semibold break-words" style={{ color: theme.darker }}>
                Category <span className="text-gray-400">(Optional)</span>
              </Label>

              <select
                {...register("categoryId")}
                className="w-full px-3 py-3 rounded-xl border focus:outline-none text-base"
                style={{ borderColor: theme.translucentStrong, color: theme.dark }}
              >
                <option value="">None</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
                <option value="new">+ Add New</option>
              </select>

              {/* Existing Category - Editable Color */}
              {watchCategoryId && watchCategoryId !== "new" && watchCategoryId !== "" && (
                <div
                  className="mt-3 flex flex-col gap-2 p-4 rounded-xl border"
                  style={{ borderColor: theme.translucentStrong, backgroundColor: theme.translucent }}
                >
                  <span className="text-sm font-semibold" style={{ color: theme.darker }}>
                    Category Color
                  </span>
                  <p className="text-xs" style={{ color: theme.dark }}>
                    Changes apply to all splits using this category
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl border shadow-sm flex-shrink-0"
                      style={{
                        backgroundColor: editingCategoryColor || "#6B7280",
                        borderColor: theme.translucentStrong,
                      }}
                    />
                    <Input
                      type="color"
                      value={editingCategoryColor}
                      onChange={(e) => handleCategoryColorChange(e.target.value)}
                      className="appearance-none w-18 h-14 rounded-xl border cursor-pointer transition-transform transform hover:scale-110 focus:scale-110"
                      style={{ borderColor: theme.translucentStrong }}
                    />
                    <span className="text-sm font-mono" style={{ color: theme.dark }}>
                      {editingCategoryColor}
                    </span>
                  </div>

                  {/* Delete Selected Category */}
                  {watchCategoryId && watchCategoryId !== "new" && (
                    <CategoryDeleteButton
                      category={categories.find((c) => c.id === watchCategoryId)}
                      onDeleted={handleCategoryDeleted}
                      editingColor={editingCategoryColor}
                    />
                  )}
                </div>
              )}

              {/* New Category */}
              {watchCategoryId === "new" && (
                <div className="mt-2 flex flex-col sm:flex-row gap-3">
                  <input
                    {...register("newCategoryName", { required: "Category name is required" })}
                    placeholder="New category name"
                    className="flex-1 w-full rounded-xl px-4 py-3 border focus:ring-2 text-base break-words"
                    style={{ borderColor: errors.newCategoryName ? "#FF4D4F" : theme.translucentStrong, color: theme.dark }}
                  />
                  <input
                    type="color"
                    {...register("newCategoryColor")}
                    defaultValue={theme.primary}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl cursor-pointer"
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}>
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditSplitForm;
