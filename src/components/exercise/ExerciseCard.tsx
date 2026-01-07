import { Link } from "react-router-dom";
import type { Exercises } from "@/types/exercise";
import { memo } from "react";

interface ExerciseCardProps {
  exercise: Exercises;
}

export const ExerciseCard = memo(({ exercise }: ExerciseCardProps) => (
  <Link to={`/exercise/${exercise.id}`}>
    <div
      className="
      bg-white rounded-2xl shadow-md p-4 flex flex-col items-center
      border border-red-100
      transition-transform
      hover:shadow-[0_6px_15px_rgba(220,38,38,0.25)]
      [contain:layout_paint]
    "
    >
      <img
        src={`/data/exercises/${exercise.images?.[0]}`}
        alt={exercise.name}
        className="w-full aspect-[4/3] object-cover rounded-xl mb-3"
        loading="lazy"
      />
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-red-600 text-center">{exercise.name}</h3>
      <p className="text-sm text-gray-500 text-center mt-1">
        {exercise.category || "General"}
        {exercise.primaryMuscles?.length ? ` | ${exercise.primaryMuscles.join(", ")}` : ""}
      </p>
    </div>
  </Link>
));
