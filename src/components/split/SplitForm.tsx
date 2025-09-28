import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useCurrentCategories, type UseCurrentCategoriesType, type Category } from "../../stores/splits/useCurrentCategories";
import type { Weekday, WorkoutDay } from "../../types/splits";

const allWeekdays: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface SplitFormProps {
  onClose: () => void;
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

  // 📝 Load last selected category on mount
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

    // ✅ Save the last selected category ID for next time
    if (category?.id) {
      localStorage.setItem(LAST_CATEGORY_KEY, category.id);
    }

    reset();
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gradient-to-tr from-rose-50 to-rose-100 rounded-3xl shadow-2xl p-8 space-y-6 max-w-lg w-full relative border border-rose-200"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-red-400 hover:text-red-700 transition text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-extrabold text-center text-rose-500">Create New Split</h2>

        {/* Split Name */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-red-600">Split Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className={`mt-1 w-full px-4 py-3 rounded-2xl border border-rose-300 shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition text-gray-800 ${
              errors.name ? "border-red-600 ring-red-200" : ""
            }`}
            placeholder="e.g. Push/Pull/Legs"
          />
          {errors.name && <span className="text-red-600 text-sm">This field is required</span>}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-red-600">
            Description <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            {...register("description")}
            className="mt-1 w-full px-4 py-3 rounded-2xl border border-rose-300 shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition resize-none text-gray-800"
            placeholder="Optional description..."
            rows={3}
          />
        </div>

        {/* Category Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-red-600">
            Category <span className="text-gray-400">(Optional)</span>
          </label>
          <select
            {...register("categoryId")}
            className="w-full border border-rose-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-500"
          >
            <option value="">None</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
            <option value="new">+ Add</option>
          </select>

          {/* Existing Category Color Editor */}
          {watchCategoryId && watchCategoryId !== "new" && (
            <div className="flex items-center gap-2 mt-2">
              <span
                className="w-12 h-12 rounded-2xl border border-gray-200"
                style={{ backgroundColor: categories.find((c) => c.id === watchCategoryId)?.color }}
              />
              <input
                type="color"
                defaultValue={categories.find((c) => c.id === watchCategoryId)?.color}
                onChange={(e) => updateCategory(watchCategoryId, { color: e.target.value })}
                className="w-12 h-12 p-0 border-none cursor-pointer rounded-2xl"
                title="Pick a color"
              />
            </div>
          )}

          {/* New Category Inputs */}
          {watchCategoryId === "new" && (
            <div className="flex gap-2 mt-2">
              <input
                {...register("newCategoryName")}
                placeholder="Category name"
                className="flex-1 border border-rose-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-500"
              />
              <input
                type="color"
                {...register("newCategoryColor")}
                defaultValue="#ef4444"
                className="w-12 h-12 p-0 border-none cursor-pointer rounded-2xl"
                title="Pick a color"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold rounded-2xl shadow-lg hover:from-rose-600 hover:to-rose-700 hover:shadow-xl transition-all text-lg"
        >
          Create Split
        </button>
      </motion.form>
    </motion.div>
  );
};

export default SplitForm;
