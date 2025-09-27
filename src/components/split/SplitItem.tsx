import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiMove } from "react-icons/fi";
import { Link } from "react-router-dom";

interface SplitItemProps {
  id: string;
  name: string;
  description?: string;
  index: number;
}

const SplitItem = ({ id, name, description, index }: SplitItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : "auto",
        boxShadow: isDragging ? "0 15px 25px rgba(0,0,0,0.2)" : undefined,
      }}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileDrag={{ scale: 1.03 }}
      className={`rounded-3xl border bg-white p-4 sm:p-5 flex items-center gap-4 transition-all ${
        index === 0 ? "border-rose-400 shadow-md" : "border-rose-200"
      }`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex-shrink-0 text-rose-400 hover:text-rose-600 cursor-grab active:cursor-grabbing p-2"
      >
        <FiMove size={20} />
      </div>

      {/* Card content */}
      <Link to={`/splits/${id}`} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <h2 className={`text-lg font-semibold truncate ${index === 0 ? "text-rose-600" : "text-gray-800"}`}>{name}</h2>
          {index === 0 && <span className="text-xs font-semibold bg-rose-100 text-rose-600 px-2 py-1 rounded-full">Active</span>}
        </div>
        <p className={description ? "text-gray-600 text-sm leading-snug line-clamp-2" : "text-gray-400 italic text-sm"}>
          {description || "No description"}
        </p>
      </Link>
    </motion.div>
  );
};

export default SplitItem;
