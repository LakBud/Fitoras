import { motion } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSplitsStore } from "../../../stores/splits/useSplitStore";
import { useCurrentCategories, type UseCurrentCategoriesType, type Category } from "../../../stores/splits/useCurrentCategories";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import { useThemeColor } from "../../../hooks/ui/useThemeColor";

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

  const theme = useThemeColor(); // <- Using your hook

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const watchCategoryId = watch("categoryId");

  // Prefill form
  useEffect(() => {
    setValue("name", splitToEdit.name);
    setValue("description", splitToEdit.description || "");
    setValue("categoryId", splitToEdit.category?.id || "");
  }, [splitToEdit, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let category: Category | undefined;

    if (watchCategoryId === "new" && data.newCategoryName && data.newCategoryColor) {
      category = addCategory({ name: data.newCategoryName, color: data.newCategoryColor });
    } else if (data.categoryId) {
      category = categories.find((c) => c.id === data.categoryId);
    }

    updateSplit(splitToEdit.id, {
      name: data.name.trim(),
      description: data.description?.trim() || undefined,
      category,
    });

    reset();
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
        style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}
        onClick={() => setIsOpen(true)}
      >
        Edit Split
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 transition text-2xl font-bold"
            aria-label="Close form"
          >
            &times;
          </button>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-rose-500">Edit Split</h2>

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

            {watchCategoryId && watchCategoryId !== "new" && (
              <div className="flex items-center justify-between gap-4 mt-3 w-full max-w-xs mx-auto">
                <div
                  className="w-12 h-12 rounded-2xl border border-gray-200 shadow-sm"
                  style={{ backgroundColor: categories.find((c) => c.id === watchCategoryId)?.color || theme.primary }}
                  title="Current color"
                />
                <input
                  type="color"
                  defaultValue={categories.find((c) => c.id === watchCategoryId)?.color || theme.primary}
                  onChange={(e) => updateCategory(watchCategoryId, { color: e.target.value })}
                  className="w-12 h-12 p-0 border-none cursor-pointer rounded-2xl shadow-inner transition hover:scale-105"
                  title="Pick a new color"
                />
              </div>
            )}

            {watchCategoryId === "new" && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
                <input
                  {...register("newCategoryName")}
                  placeholder="Category Name"
                  className="w-full border border-rose-300 rounded-2xl px-4 py-3 text-gray-800"
                />
                <input
                  type="color"
                  {...register("newCategoryColor")}
                  defaultValue={theme.primary}
                  className="w-12 h-12 p-0 border-none cursor-pointer rounded-2xl"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all text-lg"
            style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}
          >
            Save Changes
          </button>
        </motion.form>
      </Modal>
    </>
  );
};

export default EditSplitForm;
