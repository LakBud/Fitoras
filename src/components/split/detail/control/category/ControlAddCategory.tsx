import { useState } from "react";
import Modal from "../../../../common/Modal";
import { useSplitControl } from "../../../../../hooks/control/useSplitControl";
import type { WorkoutCategory } from "../../../../../types/splits";

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
  } = useSplitControl();

  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<WorkoutCategory | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState("#ff0000");

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
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="min-w-[90px] h-12 flex items-center justify-center font-bold text-white shadow rounded-3xl cursor-pointer
                  transition-all duration-200 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
      >
        + Add
      </button>

      {isOpen && (
        <Modal className="bg-white p-6 rounded-lg max-w-md mx-auto" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {!editingCategory ? (
            <>
              <h1 className="text-2xl font-bold text-center mb-4">Categories</h1>

              {/* Add category */}
              <div className="flex gap-2 mb-4 items-center">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName?.(e.target.value)}
                  placeholder="New category..."
                  className="border rounded px-3 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="color"
                  value={newCategoryColor ?? "#ff0000"}
                  onChange={(e) => setNewCategoryColor?.(e.target.value)}
                  className="w-12 h-12 p-0 border-none cursor-pointer"
                  title="Pick a category color"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="bg-green-600 text-white px-4 rounded hover:bg-green-700 transition"
                >
                  Add
                </button>
              </div>

              {/* Category list */}
              <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {categories?.length === 0 && <li className="text-gray-500">No categories yet.</li>}
                {categories?.map((cat) => (
                  <li
                    key={cat.id}
                    className="flex justify-between items-center border rounded px-3 py-1 cursor-pointer"
                    style={{ backgroundColor: cat.color ?? "transparent" }}
                  >
                    <span className="flex-1" onClick={() => openEditModal(cat)}>
                      {cat.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            // Edit category form
            <>
              <h2 className="text-xl font-bold mb-4">Edit Category</h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Category name"
                />
                <input
                  type="color"
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                  className="w-12 h-12 p-0 border-none cursor-pointer"
                  title="Pick a category color"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ControlAddCategory;
