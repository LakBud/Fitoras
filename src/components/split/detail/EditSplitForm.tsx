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

  const theme = useThemeColor(splitToEdit.category?.color);

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
      {/* Configure Details Button */}
      <button
        className="px-6 py-3 rounded-full font-semibold shadow-lg transition-transform duration-200"
        style={{
          backgroundColor: theme.primary,
          color: theme.textOnPrimary,
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = theme.primary;
        }}
        onClick={() => setIsOpen(true)}
      >
        Configure Details
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        style={{ backgroundColor: "white" }} // Solid white background
      >
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
          className="space-y-6 w-full relative"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-2xl font-bold hover:opacity-80 transition"
            style={{ color: theme.darker }}
            aria-label="Close form"
          >
            &times;
          </button>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center" style={{ color: theme.primary }}>
            Edit Split
          </h2>

          {/* Name */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-semibold" style={{ color: theme.darker }}>
              Split Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              className="mt-1 w-full px-4 py-3 rounded-2xl shadow-sm focus:outline-none transition"
              style={{
                border: `1px solid ${errors.name ? "#FF4D4F" : theme.translucentStrong}`,
                color: theme.dark,
              }}
              placeholder="e.g. Push/Pull/Legs"
            />
            {errors.name && (
              <p className="text-sm" style={{ color: "#FF4D4F" }}>
                This field is required
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-semibold" style={{ color: theme.darker }}>
              Description <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="mt-1 w-full px-4 py-3 rounded-2xl shadow-sm focus:outline-none transition resize-none"
              style={{
                border: `1px solid ${theme.translucentStrong}`,
                color: theme.dark,
              }}
              placeholder="Optional description..."
              rows={3}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-semibold" style={{ color: theme.darker }}>
              Category <span className="text-gray-400">(Optional)</span>
            </label>

            <select
              id="category"
              {...register("categoryId")}
              className="w-full px-3 py-3 rounded-2xl focus:outline-none transition"
              style={{
                border: `1px solid ${theme.translucentStrong}`,
                color: theme.dark,
              }}
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
                  className="w-12 h-12 rounded-2xl border shadow-sm"
                  style={{
                    backgroundColor: categories.find((c) => c.id === watchCategoryId)?.color || theme.primary,
                    borderColor: theme.translucentStrong,
                  }}
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
                  className="w-full rounded-2xl px-4 py-3 transition"
                  style={{
                    border: `1px solid ${theme.translucentStrong}`,
                    color: theme.dark,
                  }}
                />
                <input
                  type="color"
                  {...register("newCategoryColor")}
                  defaultValue={theme.primary}
                  className="w-12 h-12 p-0 border-none cursor-pointer rounded-2xl transition"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
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
