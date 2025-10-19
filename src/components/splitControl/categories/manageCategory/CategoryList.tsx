import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { WorkoutCategory } from "@/types/splits";
import type { Theme } from "@/types/theme";

interface Props {
  theme: Theme;
  categories?: WorkoutCategory[];
  onEdit: (cat: WorkoutCategory) => void;
}

const CategoryList = ({ categories, onEdit, theme }: Props) => {
  const list = categories ?? [];

  return (
    <div className="flex flex-col gap-3 w-full p-4 rounded-xl" style={{ background: theme.lighter }}>
      {list.length > 0 && (
        <p className="text-sm font-semibold" style={{ color: theme.dark }}>
          Categories
        </p>
      )}

      <ul className="flex flex-col gap-2 max-h-64 sm:max-h-80 overflow-y-auto pr-1">
        {list.length === 0 && <li className="text-gray-400 text-center py-4 italic">No categories yet.</li>}

        {list.map((cat) => {
          const base = cat.color ?? "#ccc";

          return (
            <motion.li
              key={cat.id}
              layout
              whileHover={{ scale: 1.02 }}
              className="
                flex items-center justify-between rounded-lg px-4 py-3
                cursor-pointer bg-white border transition-all duration-200 hover:shadow-sm
              "
              style={{ borderColor: base }}
              onClick={() => onEdit(cat)}
              title={cat.name}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* color dot */}
                <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: base }} />
                <span className="font-medium truncate" style={{ color: theme.dark }}>
                  {cat.name}
                </span>
              </div>
              <ChevronRight size={18} style={{ color: theme.dark }} />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
