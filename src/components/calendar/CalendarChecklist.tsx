import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { formatDateKey } from "@/lib/calendar";
import { useCalendarStore } from "@/stores/useCalendarStore";
import type { Exercises } from "@/types/exercise";
import { FiInfo } from "react-icons/fi";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { useCurrentSplitStore } from "@/stores/splits/useCurrentSplitStore";
import { Link } from "react-router-dom";

interface CalendarChecklistProps {
  selectedDate: Date;
  exercises: Exercises[];
  completionPercentage: number;
  fullyCompleted: boolean;
  isMobile: boolean;
  themeColor: string;
}

const CalendarChecklist = ({
  selectedDate,
  exercises,
  completionPercentage,
  fullyCompleted,
  isMobile,
  themeColor,
}: CalendarChecklistProps) => {
  const { toggleExercise, isExerciseCompleted } = useCalendarStore();
  const { currentSplit, splits } = useCurrentSplitStore();
  const theme = useThemeColor(currentSplit?.category?.color || splits?.[0]?.category?.color);

  const dateKey = formatDateKey(selectedDate);
  const getExerciseById = (id: string) => exercises.find((ex) => ex.id === id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 bg-white rounded-2xl shadow-sm border p-6"
      style={{ borderColor: themeColor }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 p-3 rounded-3xl" style={{ backgroundColor: theme.lighter }}>
        <div>
          <h3 className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-gray-800`}>
            {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </h3>
          <p className={`${isMobile ? "text-xs" : "text-sm"} text-gray-500 mt-1`}>
            {exercises.length} exercises • {completionPercentage.toFixed(0)}% complete
          </p>
        </div>

        {fullyCompleted && (
          <div className="flex items-center gap-2 text-green-600">
            <div className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} bg-green-100 rounded-full flex items-center justify-center`}>
              <Check className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
            </div>
            <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}>All Complete!</span>
          </div>
        )}
      </div>

      {/* Exercises List */}
      {exercises.length > 0 ? (
        <div className="space-y-3">
          {exercises.map((exercise) => {
            const done = isExerciseCompleted(dateKey, exercise.id);
            const fullEx = getExerciseById(exercise.id) || exercise;
            const imageSrc = fullEx.images?.[0] ? `/data/exercises/${fullEx.images[0]}` : undefined;

            return (
              <motion.div
                key={fullEx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center justify-between gap-4 ${
                  isMobile ? "p-3" : "p-4"
                } rounded-lg border transition-colors ${
                  done ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Link to={`/exercise/${fullEx.id}`} className="flex-1 flex items-center gap-3">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={fullEx.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: theme.translucent }}
                    >
                      <FiInfo className="text-gray-400 w-6 h-6" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{fullEx.name}</div>
                    {exercise.sets || exercise.reps ? (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {exercise.sets && exercise.reps
                          ? `${exercise.sets} × ${exercise.reps}`
                          : exercise.sets
                          ? `${exercise.sets} sets`
                          : `${exercise.reps} reps`}
                      </div>
                    ) : null}
                  </div>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${
                    isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
                  } font-medium rounded-lg border transition-colors ${
                    done
                      ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => toggleExercise(dateKey, fullEx.id)}
                >
                  {done ? "Completed" : "Mark as done"}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        // Empty state
        <div className="flex flex-col items-center justify-center py-8 border rounded">
          <div className={`${isMobile ? "text-3xl" : "text-4xl"} mb-2`} style={{ color: theme.dark }}>
            <FiInfo />
          </div>
          <div className={`${isMobile ? "text-xs" : "text-sm"} text-center`} style={{ color: theme.darker }}>
            No exercises scheduled for this day.
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CalendarChecklist;
