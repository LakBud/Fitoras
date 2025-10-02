import { motion } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSplitsStore } from "../../../stores/splits/useSplitStore";
import { useCurrentCategories, type UseCurrentCategoriesType, type Category } from "../../../stores/splits/useCurrentCategories";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import { useThemeColor } from "../../../hooks/ui/useThemeColor";
import { BsPersonFillGear } from "react-icons/bs";

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
        className="group flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-md transition-all active:scale-95 text-sm sm:text-base"
        style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}
        onClick={() => setIsOpen(true)}
      >
        <BsPersonFillGear className="text-base sm:text-lg group-hover:rotate-12 transition-transform" />
        Configure
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        style={{
          backgroundColor: "white",
          padding: "0",
        }}
      >
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col max-h-[90vh] w-full max-w-lg mx-auto overflow-y-auto px-4 sm:px-6 py-6 space-y-6 rounded-t-3xl sm:rounded-3xl"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-2xl font-bold hover:opacity-80 transition sm:top-4 sm:right-4"
            style={{ color: theme.darker }}
            aria-label="Close form"
          >
            &times;
          </button>

          {/* Heading */}
          <h2 className="text-3xl sm:text-3xl font-extrabold text-center pt-2 pb-1" style={{ color: theme.primary }}>
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
              className="mt-1 w-full px-4 py-3 rounded-xl shadow-sm focus:outline-none transition text-base"
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
              className="mt-1 w-full px-4 py-3 rounded-xl shadow-sm focus:outline-none transition resize-none text-base"
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
              className="w-full px-3 py-3 rounded-xl focus:outline-none transition text-base"
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
              <div className="mt-4 w-full">
                <div className="flex flex-row justify-between gap-4 w-full">
                  {/* Current Color */}
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-xs sm:text-sm font-medium mb-1" style={{ color: theme.darker }}>
                      Current Color
                    </span>
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border shadow-sm"
                      style={{
                        backgroundColor: categories.find((c) => c.id === watchCategoryId)?.color || theme.primary,
                        borderColor: theme.translucentStrong,
                      }}
                      title="Current category color"
                    />
                  </div>

                  {/* New Color Picker */}
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-xs sm:text-sm font-medium mb-1" style={{ color: theme.darker }}>
                      Pick New Color
                    </span>
                    <input
                      type="color"
                      defaultValue={categories.find((c) => c.id === watchCategoryId)?.color || theme.primary}
                      onChange={(e) => updateCategory(watchCategoryId, { color: e.target.value })}
                      className="w-12 h-12 sm:w-14 sm:h-14 p-0 border-none cursor-pointer rounded-xl shadow-inner transition-transform hover:scale-105 focus:scale-105"
                      title="Pick a new color"
                    />
                  </div>
                </div>
              </div>
            )}

            {watchCategoryId === "new" && (
              <div className="mt-3 space-y-2">
                <label className="block text-sm font-medium" style={{ color: theme.darker }}>
                  New Category
                </label>
                <p className="text-xs text-gray-500">Give your new category a name and color.</p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Category Name Input */}
                  <div className="relative flex-1">
                    <input
                      {...register("newCategoryName", { required: "Category name is required" })}
                      placeholder="e.g. Upper Body"
                      className={`w-full rounded-xl px-4 py-3 border focus:ring-2 transition placeholder-gray-400 text-base ${
                        errors.newCategoryName ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                      }`}
                      style={{ color: theme.dark }}
                    />
                    {errors.newCategoryName && <p className="text-xs text-red-500 mt-1">{errors.newCategoryName.message}</p>}
                  </div>

                  {/* Color Picker */}
                  <div className="relative flex-shrink-0 group self-start sm:self-center">
                    <input
                      type="color"
                      {...register("newCategoryColor")}
                      defaultValue={theme.primary}
                      className="appearance-none w-10 h-10 sm:w-12 sm:h-12 rounded-xl border cursor-pointer transition-transform transform group-hover:scale-110 focus:scale-110"
                      title="Pick a category color"
                    />
                    <div className="absolute inset-0 rounded-xl pointer-events-none shadow-inner" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-base sm:text-lg mt-2"
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
