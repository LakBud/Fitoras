import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/modal";
import { useSplitControl } from "@/hooks/splitControl/useSplitControl";
import type { WorkoutCategory } from "@/types/splits";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { FiX } from "react-icons/fi";
import CategoryRow from "./CategoryRow";
import CategoryList from "./CategoryList";
import CategoryEditForm from "./CategoryEditForm";
import { type Theme } from "@/types/theme";
import { Plus } from "lucide-react";

const ControlAddCategory = () => {
  const {
    categories,
    newCategoryName,
    setNewCategoryName,
    addCategory,
    deleteCategory,
    newCategoryColor,
    setNewCategoryColor,
    updateCategory,
    split,
  } = useSplitControl();

  const theme: Theme = useThemeColor(split?.category?.color);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<WorkoutCategory | null>(null);

  const handleAddCategory = (): void => {
    if (!newCategoryName?.trim()) return;
    addCategory?.();
    setNewCategoryName?.("");
    setNewCategoryColor?.("#ff0000");
  };

  const handleDeleteCategory = (id: string): void => {
    deleteCategory?.(id);
    setEditingCategory(null);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.97 }}
        className="px-4 py-2 font-medium text-sm rounded-t-lg transition-all whitespace-nowrap border-b-2 border-transparent hover:border-b-2 hover:border-gray-300"
        style={{ color: theme.dark }}
      >
        <Plus />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
              setEditingCategory(null);
            }}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative"
          >
            <button
              onClick={() => {
                setIsOpen(false);
                setEditingCategory(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
              aria-label="Close modal"
            >
              <FiX className="text-xl" />
            </button>

            <motion.div
              key={editingCategory ? "edit" : "list"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {!editingCategory ? (
                <>
                  <h1 className="text-2xl font-bold text-center mb-5" style={{ color: theme.dark }}>
                    Manage Categories
                  </h1>
                  <CategoryRow
                    theme={theme}
                    newCategoryName={newCategoryName}
                    setNewCategoryName={setNewCategoryName}
                    newCategoryColor={newCategoryColor ?? "#ff0000"} // ensures it's never null
                    setNewCategoryColor={setNewCategoryColor}
                    onAdd={handleAddCategory}
                  />

                  <CategoryList theme={theme} categories={categories} onEdit={setEditingCategory} />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-4 text-center" style={{ color: theme.dark }}>
                    Edit Category
                  </h2>
                  <CategoryEditForm
                    theme={theme}
                    category={editingCategory}
                    onDelete={handleDeleteCategory}
                    onCancel={() => setEditingCategory(null)}
                    onSave={(name, color) => {
                      updateCategory?.(editingCategory.id, { name, color });
                      setEditingCategory(null);
                    }}
                  />
                </>
              )}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ControlAddCategory;
