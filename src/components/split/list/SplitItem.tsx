import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiMove } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Category } from "@/stores/splitControl/useCurrentCategories";

interface SplitItemProps {
  id: string;
  name: string;
  description?: string;
  index: number;
  category?: Category;
}

const SplitItem = ({ id, name, description, index, category }: SplitItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 5 : "auto",
        boxShadow: isDragging ? "0 15px 25px rgba(0,0,0,0.2)" : undefined,
      }}
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileDrag={{ scale: 1.03 }}
      className="
    w-full max-w-[80vw] sm:max-w-[350px] md:max-w-[1000px] 
    mx-auto
    rounded-2xl border border-rose-200 bg-white
    flex flex-row overflow-hidden select-none transition-all
    shadow-sm hover:shadow-md active:shadow-lg
  "
    >
      {/* Left color strip */}
      <div className="w-2 shrink-0 rounded-l-2xl" style={{ backgroundColor: category?.color || "#f3f4f6" }} />

      {/* Content */}
      <div className="flex flex-1 items-start p-3 sm:p-4 gap-3 min-w-0 overflow-hidden">
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex-shrink-0 cursor-grab active:cursor-grabbing p-3 rounded-full touch-none transition-colors hover:bg-gray-100"
          style={{
            backgroundColor: category ? `${category.color}20` : "transparent",
            color: category ? category.color : "#6b7280",
          }}
        >
          <FiMove size={18} />
        </div>

        {/* Text content */}
        <Link to={`/splits/${id}`} className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
            <h2
              className={`
            text-base sm:text-lg font-semibold
            truncate whitespace-nowrap overflow-hidden
            max-w-[70vw] sm:max-w-[300px]
          `}
              style={category && !index ? { color: category.color } : undefined}
              title={name}
            >
              {name}
            </h2>

            {category && (
              <span
                className="text-[10px] sm:text-xs font-semibold truncate px-2 py-0.5 rounded-full text-white flex-shrink-0 max-w-[90px] sm:max-w-[120px] whitespace-nowrap"
                style={{ backgroundColor: `${category.color}cc` }}
                title={category.name}
              >
                {category.name}
              </span>
            )}
          </div>

          {/* Description (2-line clamp) */}
          <p
            className="mt-1 text-xs sm:text-sm leading-snug text-gray-500"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description || "No description"}
          </p>
        </Link>
      </div>
    </motion.div>
  );
};

export default SplitItem;
