import { motion } from "framer-motion";
import type { Theme } from "@/types/theme";

interface Props {
  theme: Theme;
  newCategoryName: string;
  setNewCategoryName?: (val: string) => void;
  newCategoryColor?: string;
  setNewCategoryColor?: (val: string) => void;
  onAdd: () => void;
}

const CategoryRow = ({ theme, newCategoryName, setNewCategoryName, newCategoryColor, setNewCategoryColor, onAdd }: Props) => (
  <div className="flex gap-3 mb-4 items-center">
    <input
      type="text"
      value={newCategoryName}
      onChange={(e) => setNewCategoryName?.(e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 20))}
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
      onClick={onAdd}
      className="px-5 py-3 rounded-full font-semibold text-white shadow-md hover:shadow-lg transition"
      style={{ background: `linear-gradient(to right, ${theme.dark}, ${theme.primary})` }}
    >
      Add
    </motion.button>
  </div>
);

export default CategoryRow;
