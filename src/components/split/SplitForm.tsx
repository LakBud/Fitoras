import { motion } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useCurrentCategories, type UseCurrentCategoriesType, type Category } from "../../stores/splits/useCurrentCategories";
import type { Weekday, WorkoutDay } from "../../types/splits";
import { useEffect } from "react";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";

const allWeekdays: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface SplitFormProps {
  onClose: () => void;
  splitToEdit?: {
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

const LAST_CATEGORY_KEY = "fitoras_last_selected_category";

const SplitForm = ({ onClose }: SplitFormProps) => {
  const addSplit = useSplitsStore((state) => state.addSplit);

  const categories = useCurrentCategories((state: UseCurrentCategoriesType) => state.categories);
  const addCategory = useCurrentCategories((state: UseCurrentCategoriesType) => state.addCategory);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const watchCategoryId = watch("categoryId");

  // Load last selected category on mount
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

    const newSplit = {
      id: uuidv4(),
      name: data.name.trim(),
      description: data.description?.trim() || undefined,
      category,
      days: allWeekdays.map<WorkoutDay>((day) => ({ day, exercises: [] })),
    };

    addSplit(newSplit);

    if (category?.id) {
      localStorage.setItem(LAST_CATEGORY_KEY, category.id);
    }

    reset();
    onClose();
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
      className="relative flex flex-col max-h-[90vh] w-full max-w-md mx-auto overflow-y-auto px-4 sm:px-6 py-6 space-y-6 bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-rose-200"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
    >
      {/* Close Button */}
      <Button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 text-2xl font-bold text-rose-400 hover:text-rose-600 transition sm:top-4 sm:right-4 bg-white"
        aria-label="Close form"
      >
        &times;
      </Button>

      {/* Heading */}
      <h2 className="text-3xl sm:text-3xl font-extrabold text-center pt-2 pb-1 text-rose-500">Create New Split</h2>

      {/* Split Name */}
      <div className="space-y-1">
        <Label htmlFor="name" className="block text-sm font-semibold text-rose-600">
          Split Name
        </Label>
        <input
          id="name"
          type="text"
          {...register("name", { required: true })}
          className={`mt-1 w-full px-4 py-3 rounded-xl shadow-sm focus:outline-none transition text-base text-gray-800 ${
            errors.name
              ? "border-red-600 ring-red-200 border focus:ring-2"
              : "border border-rose-300 focus:ring-2 focus:ring-rose-200 focus:border-rose-500"
          }`}
          placeholder="e.g. Push/Pull/Legs"
        />
        {errors.name && <p className="text-sm text-red-600">This field is required</p>}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <Label htmlFor="description" className="block text-sm font-semibold text-rose-600">
          Description <span className="text-gray-400">(Optional)</span>
        </Label>
        <textarea
          id="description"
          {...register("description")}
          className="mt-1 w-full px-4 py-3 rounded-xl shadow-sm focus:outline-none transition resize-none text-base text-gray-800 border border-rose-300 focus:ring-2 focus:ring-rose-200 focus:border-rose-500"
          placeholder="Optional description..."
          rows={3}
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label htmlFor="category" className="block text-sm font-semibold text-rose-600">
          Category <span className="text-gray-400">(Optional)</span>
        </label>

        <select
          id="category"
          {...register("categoryId")}
          className="w-full px-3 py-3 rounded-xl focus:outline-none transition text-base border border-rose-300 focus:ring-2 focus:ring-rose-200 focus:border-rose-500"
        >
          <option value="">None</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
          <option value="new">+ Add New</option>
        </select>

        {/* Existing Category Colors */}
        {watchCategoryId && watchCategoryId !== "new" && (
          <div className="mt-4 w-full">
            <div className="flex flex-row justify-between gap-4 w-full">
              {/* Current Color */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-xs sm:text-sm font-medium mb-1 text-rose-600">Color</span>
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border shadow-sm"
                  style={{
                    backgroundColor: categories.find((c) => c.id === watchCategoryId)?.color || "#ef4444",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* New Category */}
        {watchCategoryId === "new" && (
          <div className="mt-3 space-y-2">
            <label className="block text-sm font-medium text-rose-600">New Category</label>
            <p className="text-xs text-gray-500">Give your new category a name and color.</p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Name */}
              <div className="relative flex-1">
                <input
                  {...register("newCategoryName")}
                  placeholder="Enter category name"
                  className="w-full rounded-xl px-4 py-3 border text-base text-gray-800 border-rose-300 focus:ring-2 focus:ring-rose-200 focus:border-rose-500 transition placeholder-gray-400"
                />
              </div>

              {/* Color Picker */}
              <div className="relative flex-shrink-0 group self-start sm:self-center">
                <input
                  type="color"
                  {...register("newCategoryColor")}
                  defaultValue="#ef4444"
                  className="appearance-none w-10 h-10 sm:w-12 sm:h-12 rounded-xl border cursor-pointer transition-transform transform group-hover:scale-110 focus:scale-110"
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none shadow-inner" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full py-6 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-base sm:text-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white mt-2"
      >
        Create
      </Button>
    </motion.form>
  );
};

export default SplitForm;
