import { motion } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useCurrentCategories, type UseCurrentCategoriesType, type Category } from "../../stores/splits/useCurrentCategories";
import type { Weekday, WorkoutDay } from "../../types/splits";
import { useEffect } from "react";

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
  const updateCategory = useCurrentCategories((state: UseCurrentCategoriesType) => state.updateCategory);

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
      className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-w-sm sm:max-w-md w-full mx-auto border border-rose-200 relative"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 transition text-2xl font-bold"
        aria-label="Close form"
      >
        &times;
      </button>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-rose-500">Create New Split</h2>

      {/* Split Name */}
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-semibold text-rose-600">
          Split Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: true })}
          className={`mt-1 w-full px-4 py-3 rounded-2xl border border-rose-300 shadow-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-500 outline-none transition text-gray-800 ${
            errors.name ? "border-red-600 ring-red-200" : ""
          }`}
          placeholder="e.g. Push/Pull/Legs"
        />
        {errors.name && <p className="text-red-600 text-sm">This field is required</p>}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm font-semibold text-rose-600">
          Description <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="mt-1 w-full px-4 py-3 rounded-2xl border border-rose-300 shadow-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-500 outline-none transition resize-none text-gray-800"
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
          className="w-full border border-rose-300 rounded-2xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-500 transition"
        >
          <option value="">None</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
          <option value="new">+ Add New</option>
        </select>

        {/* Selected category color preview */}
        {watchCategoryId && watchCategoryId !== "new" && (
          <div className="flex items-center justify-between gap-4 mt-3 w-full max-w-xs mx-auto">
            {/* Color preview */}
            <div className="flex flex-col items-center">
              <span
                className="w-12 h-12 rounded-2xl border border-gray-200 shadow-sm"
                style={{ backgroundColor: categories.find((c) => c.id === watchCategoryId)?.color || "#ef4444" }}
                title="Current color"
              />
              <span className="mt-1 text-xs text-gray-600">Current</span>
            </div>

            {/* Color picker */}
            <div className="flex flex-col items-center">
              <input
                type="color"
                defaultValue={categories.find((c) => c.id === watchCategoryId)?.color}
                onChange={(e) => updateCategory(watchCategoryId, { color: e.target.value })}
                className="w-12 h-12 p-0 border-none cursor-pointer rounded-2xl shadow-inner transition hover:scale-105"
                title="Pick a new color"
              />
              <span className="mt-1 text-xs font-semibold text-rose-500">Change</span>
            </div>
          </div>
        )}

        {/* New category inputs */}
        {watchCategoryId === "new" && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-semibold text-rose-600 mb-1">Category Name</label>
              <input
                {...register("newCategoryName")}
                placeholder="Enter category name"
                className="w-full border border-rose-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-500 transition text-gray-800"
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-sm font-semibold text-rose-600 mb-1">Color</label>
              <div className="w-12 h-12 rounded-2xl border border-gray-200 overflow-hidden" title="Pick a color">
                <input
                  type="color"
                  {...register("newCategoryColor")}
                  defaultValue="#ef4444"
                  className="w-full h-full p-0 border-none cursor-pointer rounded-2xl"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold rounded-2xl shadow-lg hover:from-rose-600 hover:to-rose-700 hover:shadow-xl transition-all text-lg"
      >
        Create Split
      </button>
    </motion.form>
  );
};

export default SplitForm;
