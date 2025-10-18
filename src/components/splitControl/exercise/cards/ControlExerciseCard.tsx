import { useThemeColor } from "@/hooks/ui/useThemeColor";
import type { Exercises } from "@/types/exercise";

interface ExerciseCardProps {
  exercise: Exercises;
  isAdded: boolean;
  onAdd: (ex: Exercises) => void;
  isMobile: boolean;
  categoryColor?: string;
}

export function ControlExerciseCard({ exercise, isAdded, onAdd, isMobile, categoryColor }: ExerciseCardProps) {
  const theme = useThemeColor(categoryColor);

  return (
    <div
      onClick={() => !isAdded && onAdd(exercise)}
      className={`rounded-xl border p-2 flex flex-col items-center transition-shadow hover:shadow-md cursor-pointer ${
        isAdded ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{
        backgroundColor: theme.lighter,
        borderColor: theme.translucentStrong,
      }}
    >
      {exercise.images?.[0] ? (
        <img
          src={`/data/exercises/${exercise.images[0]}`}
          alt={exercise.name}
          className={`w-full object-cover rounded-lg mb-2 ${isMobile ? "h-24" : "h-32"}`}
          loading="lazy"
        />
      ) : (
        <div
          className={`w-full rounded-lg mb-2 flex items-center justify-center text-gray-400 text-xs ${
            isMobile ? "h-24" : "h-32"
          }`}
          style={{ backgroundColor: theme.translucent }}
        >
          No Image
        </div>
      )}

      <h3
        className={`font-semibold text-center break-words ${isMobile ? "text-sm" : "text-base sm:text-lg md:text-xl"}`}
        style={{ color: theme.primary }}
      >
        {exercise.name}
      </h3>
    </div>
  );
}
