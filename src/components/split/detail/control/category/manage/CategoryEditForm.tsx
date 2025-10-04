import { useState } from "react";
import { motion } from "framer-motion";
import type { Theme } from "@/types/theme";
import type { WorkoutCategory } from "@/types/splits";

interface Props {
  theme: Theme;
  category: WorkoutCategory;
  onDelete: (id: string) => void;
  onCancel: () => void;
  onSave: (name: string, color: string) => void;
}

const CategoryEditForm = ({ theme, category, onDelete, onCancel, onSave }: Props) => {
  const [name, setName] = useState<string>(category.name);
  const [color, setColor] = useState<string>(category.color ?? "#ff0000");

  return (
    <div className="flex flex-col gap-5">
      {/* Name */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1" style={{ color: theme.dark }}>
          Category Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 20))}
          className="border rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 transition shadow-sm text-sm"
          style={{ borderColor: theme.translucentStrong }}
        />
      </div>

      {/* Color */}
      <div className="flex flex-col items-center">
        <label className="text-sm font-semibold mb-1" style={{ color: theme.dark }}>
          Category Color
        </label>
        <div
          className="w-12 h-12 rounded-full shadow-inner cursor-pointer border"
          style={{ backgroundColor: color, borderColor: theme.translucentStrong }}
        >
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-full opacity-0 cursor-pointer"
            title="Pick a category color"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4 gap-3">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onDelete(category.id)}
          className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold shadow-md transition"
        >
          Delete
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onCancel}
          className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-full font-medium transition"
        >
          Cancel
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onSave(name, color)}
          className="flex-1 px-4 py-3 text-white rounded-full font-medium shadow-md hover:shadow-lg transition"
          style={{ background: `linear-gradient(to right, ${theme.dark}, ${theme.primary})` }}
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export default CategoryEditForm;
