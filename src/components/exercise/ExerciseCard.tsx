import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Exercises } from "@/types/exercise";

interface ExerciseCardProps {
  exercise: Exercises;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => (
  <Link to={`/exercise/${exercise.id}`}>
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 6px 15px rgba(220,38,38,0.25)" }}
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center border border-red-100 transition-all"
    >
      {exercise.images?.[0] ? (
        <img
          src={`/data/exercises/${exercise.images[0]}`}
          alt={exercise.name}
          className="w-full h-36 sm:h-40 md:h-44 object-cover rounded-xl mb-3"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-36 sm:h-40 md:h-44 bg-gray-100 rounded-xl mb-3 flex items-center justify-center text-gray-400 text-sm">
          No Image
        </div>
      )}
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-red-600 text-center break-words">{exercise.name}</h3>
      <p className="text-sm text-gray-500 text-center mt-1">
        {exercise.category || "General"}
        {exercise.primaryMuscles?.length ? ` | ${exercise.primaryMuscles.join(", ")}` : ""}
      </p>
    </motion.div>
  </Link>
);
