import { motion } from "framer-motion";
import type { Exercises } from "@/types/exercise";

interface Props {
  exercise: Exercises;
}

export function ExerciseHeader({ exercise }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-10"
    >
      {/* Category & Level Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        <span className="px-4 py-1.5 bg-rose-500 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md">
          {exercise.category ? exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1) : "Unknown"}
        </span>
        <span className="px-4 py-1.5 bg-rose-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md">
          {exercise.level ? exercise.level.charAt(0).toUpperCase() + exercise.level.slice(1) : "Unknown"}
        </span>
      </div>

      {/* Title */}
      <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-rose-700 mb-2 leading-tight"
        style={{ textShadow: "0 4px 20px rgba(225, 29, 72, 0.2)" }}
      >
        {exercise.name || "Unknown Exercise"}
      </h1>
    </motion.header>
  );
}
