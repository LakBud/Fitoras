import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/modal";
import { useSplitControl } from "../../../../../hooks/control/useSplitControl";
import type { WorkoutCategory } from "../../../../../types/splits";
import { readableColor } from "polished";
import { useThemeColor } from "../../../../../hooks/ui/useThemeColor";
import { FiX } from "react-icons/fi";

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

  const theme = useThemeColor(split?.category?.color);

  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<WorkoutCategory | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState("#ff0000");

  // ===== Handlers =====
  const handleAddCategory = () => {
    if (!newCategoryName?.trim()) return;
    addCategory?.();
    setNewCategoryName?.("");
    setNewCategoryColor?.("#ff0000");
  };

  const handleDeleteCategory = (id: string) => deleteCategory?.(id);

  const openEditModal = (category: WorkoutCategory) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditColor(category.color ?? "#ff0000");
  };

  const handleSaveEdit = () => {
    if (!editingCategory) return;
    updateCategory?.(editingCategory.id, { name: editName, color: editColor });
    setEditingCategory(null);
  };

  // ===== Renders =====

  const renderCategoryRow = () => (
    <div className="flex gap-3 mb-4 items-center">
      {/* New Category Input */}
      <input
        type="text"
        value={newCategoryName}
        onChange={(e) => {
          // Remove non-alphabet characters and limit to 20
          const lettersOnly = e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 20);
          setNewCategoryName?.(lettersOnly);
        }}
        placeholder="New category..."
        className="flex-1 border rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 transition shadow-sm text-sm w-[80px]"
        style={{ borderColor: theme.translucentStrong, color: theme.dark }}
      />

      <input
        type="color"
        value={newCategoryColor ?? "#ff0000"}
        onChange={(e) => setNewCategoryColor?.(e.target.value)}
        className="w-16 h-16 p-0 rounded-2xl cursor-pointer shadow-inner"
        title="Pick a category color"
      />

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleAddCategory}
        className="px-5 py-3 rounded-full font-semibold text-white shadow-md hover:shadow-lg transition"
        style={{
          background: `linear-gradient(to right, ${theme.dark}, ${theme.primary})`,
        }}
      >
        Add
      </motion.button>
    </div>
  );

  const renderCategoryList = () => (
    <div className="flex flex-col gap-2 w-full">
      {categories?.length > 0 && <p className="text-sm font-semibold text-gray-700 px-2">Categories:</p>}
      <ul className="flex flex-col gap-2 max-h-64 sm:max-h-80 overflow-y-auto pr-1">
        {categories?.length === 0 && <li className="text-gray-400 text-center py-4 italic">No categories yet.</li>}
        {categories?.map((cat) => {
          const textColor = readableColor(cat.color ?? "#ccc");
          return (
            <motion.li
              key={cat.id}
              layout
              whileHover={{ scale: 1.03 }}
              className="flex justify-between items-center rounded-xl px-4 py-3 shadow-sm cursor-pointer transition-transform duration-200 hover:shadow-md"
              style={{
                backgroundColor: cat.color ?? "#ccc",
                color: textColor,
              }}
            >
              <span className="flex-1 font-medium truncate" onClick={() => openEditModal(cat)} title={cat.name}>
                {cat.name}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );

  const renderEditForm = () => (
    <div className="flex flex-col gap-5">
      {/* Category Name */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1" style={{ color: theme.dark }}>
          Category Name
        </label>
        <input
          type="text"
          value={editName}
          onChange={(e) => {
            const lettersOnly = e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 20);
            setEditName(lettersOnly);
          }}
          placeholder="Enter category name"
          className="border rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 transition shadow-sm text-sm"
          style={{ borderColor: theme.translucentStrong }}
        />
      </div>

      {/* Color Picker */}
      <div className="flex flex-col items-center">
        <label className="text-sm font-semibold mb-1" style={{ color: theme.dark }}>
          Category Color
        </label>
        <div
          className="w-12 h-12 rounded-full shadow-inner cursor-pointer border"
          style={{ backgroundColor: editColor, borderColor: theme.translucentStrong }}
        >
          <input
            type="color"
            value={editColor}
            onChange={(e) => setEditColor(e.target.value)}
            className="w-full h-full opacity-0 cursor-pointer"
            title="Pick a category color"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4 gap-3">
        {/* Delete */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            if (editingCategory) handleDeleteCategory(editingCategory.id);
            setEditingCategory(null);
          }}
          className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold shadow-md transition"
        >
          Delete
        </motion.button>

        {/* Cancel */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setEditingCategory(null)}
          className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-full font-medium transition"
        >
          Cancel
        </motion.button>

        {/* Save */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleSaveEdit}
          className="flex-1 px-4 py-3 text-white rounded-full font-medium shadow-md hover:shadow-lg transition"
          style={{
            background: `linear-gradient(to right, ${theme.dark}, ${theme.primary})`,
          }}
        >
          Save
        </motion.button>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/*  Add Button */}

      <motion.button
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.97 }}
        className="px-4 py-2 font-medium text-sm rounded-t-lg transition-all whitespace-nowrap border-b-2 border-transparent hover:border-b-2 hover:border-gray-300"
        style={{
          color: theme.dark, // text color
        }}
      >
        + Add
      </motion.button>

      {/* Modal */}
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
            {/* X Button to close modal */}
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
                  {renderCategoryRow()}
                  {renderCategoryList()}
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-4 text-center" style={{ color: theme.dark }}>
                    Edit Category
                  </h2>
                  {renderEditForm()}
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
