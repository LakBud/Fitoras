import { motion } from "framer-motion";
import { readableColor } from "polished";
import type { Theme } from "@/types/theme";
import type { WorkoutCategory } from "@/types/splits";

interface Props {
  theme: Theme;
  categories?: WorkoutCategory[];
  onEdit: (cat: WorkoutCategory) => void;
}

const CategoryList = ({ categories, onEdit }: Props) => {
  const categoryList: WorkoutCategory[] = categories ?? [];

  return (
    <div className="flex flex-col gap-2 w-full">
      {categoryList.length > 0 && <p className="text-sm font-semibold text-gray-700 px-2">Categories:</p>}
      <ul className="flex flex-col gap-2 max-h-64 sm:max-h-80 overflow-y-auto pr-1">
        {categoryList.length === 0 && <li className="text-gray-400 text-center py-4 italic">No categories yet.</li>}
        {categoryList.map((cat) => {
          const textColor = readableColor(cat.color ?? "#ccc");
          return (
            <motion.li
              key={cat.id}
              layout
              whileHover={{ scale: 1.03 }}
              className="flex justify-between items-center rounded-xl px-4 py-3 shadow-sm cursor-pointer transition-transform duration-200 hover:shadow-md"
              style={{ backgroundColor: cat.color ?? "#ccc", color: textColor }}
              onClick={() => onEdit(cat)}
              title={cat.name}
            >
              <span className="flex-1 font-medium truncate">{cat.name}</span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
