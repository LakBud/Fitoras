import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiMove } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Category } from "../../stores/splits/useCurrentCategories";

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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileDrag={{ scale: 1.03 }}
      className="rounded-3xl border border-rose-200 bg-white flex overflow-hidden select-none transition-all"
    >
      {/* Left color strip with rounded corners */}
      <div className="w-2 rounded-l-3xl" style={{ backgroundColor: category?.color || "#f3f4f6" }} />

      {/* Card content */}
      <div className="flex flex-1 p-4 sm:p-5">
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex-shrink-0 text-grey hover:text-rose-600 cursor-grab active:cursor-grabbing p-3 touch-none rounded-full transition-colors"
          style={{
            backgroundColor: category ? `${category.color}33` : "transparent",
            color: category ? category.color : undefined,
          }}
        >
          <FiMove size={20} />
        </div>

        {/* Text content */}
        <Link to={`/splits/${id}`} className="flex flex-col flex-1 overflow-hidden ml-2">
          {/* Split name, category, and active badge */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              <h2
                className={`text-lg font-semibold truncate ${index === 0 ? "text-rose-600" : "text-gray-800"}`}
                style={category && !index ? { color: category.color } : undefined}
              >
                {name}
              </h2>

              {/* Category pill */}
              {category && (
                <span
                  className="text-xs font-semibold truncate px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: `${category.color}cc` }}
                  title={category.name}
                >
                  {category.name}
                </span>
              )}
            </div>

            {/* Active badge */}
            {index === 0 && (
              <span className="text-xs font-semibold bg-rose-100 text-rose-600 px-2 py-1 rounded-full">Active</span>
            )}
          </div>

          {/* Description */}
          <p className={description ? "text-gray-600 text-sm leading-snug line-clamp-2" : "text-gray-400 italic text-sm"}>
            {description || "No description"}
          </p>
        </Link>
      </div>
    </motion.div>
  );
};

export default SplitItem;
