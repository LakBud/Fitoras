import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { formatDateKey } from "@/lib/calendar";
import { useCalendarStore } from "@/stores/useCalendarStore";
import type { Exercises } from "@/types/exercise";
import { FiInfo } from "react-icons/fi";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { useCurrentSplitStore } from "@/stores/split/useCurrentSplitStore";
import { Link } from "react-router-dom";
import useBreakpoint from "@/hooks/ui/useBreakpoint";

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
  themeColor,
}: CalendarChecklistProps) => {
  const { toggleExercise, isExerciseCompleted } = useCalendarStore();
  const { currentSplit, splits } = useCurrentSplitStore();
  const theme = useThemeColor(currentSplit?.category?.color || splits?.[0]?.category?.color);
  const { isMobile } = useBreakpoint();

  const dateKey = formatDateKey(selectedDate);
  const getExerciseById = (id: string) => exercises.find((ex) => ex.id === id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4 sm:mt-6 bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6"
      style={{ borderColor: themeColor }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-3 mb-4 sm:mb-5 p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl"
        style={{ backgroundColor: theme.lighter }}
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: isMobile ? "short" : "long",
              month: isMobile ? "short" : "long",
              day: "numeric",
            })}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
            {exercises.length} {isMobile ? "ex" : "exercises"} • {completionPercentage.toFixed(0)}% done
          </p>
        </div>

        {fullyCompleted && (
          <div className="flex items-center gap-1.5 sm:gap-2 text-green-600 flex-shrink-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">All Complete!</span>
            <span className="text-xs font-medium sm:hidden">Done!</span>
          </div>
        )}
      </div>

      {/* Exercises List */}
      {exercises.length > 0 ? (
        <div className="space-y-2.5 sm:space-y-3">
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
                className={`flex items-center justify-between gap-2.5 sm:gap-4 p-2.5 sm:p-3 md:p-4 rounded-lg border transition-colors ${
                  done ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Link to={`/exercise/${fullEx.id}`} className="flex-1 flex items-center gap-2.5 sm:gap-3 min-w-0">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={fullEx.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: theme.translucent }}
                    >
                      <FiInfo className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm sm:text-base font-medium truncate">{fullEx.name}</div>
                    {exercise.sets || exercise.reps ? (
                      <div className="text-xs sm:text-sm text-gray-500 mt-0.5">
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
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors flex-shrink-0 min-h-[36px] sm:min-h-[40px] ${
                    done
                      ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => toggleExercise(dateKey, fullEx.id)}
                >
                  {done ? (isMobile ? "Done" : "Completed") : isMobile ? "Mark" : "Mark as done"}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        // Empty state
        <div className="flex flex-col items-center justify-center py-6 sm:py-8 border rounded-lg">
          <div className="text-3xl sm:text-4xl mb-2" style={{ color: theme.dark }}>
            <FiInfo />
          </div>
          <div className="text-xs sm:text-sm text-center px-4" style={{ color: theme.darker }}>
            No exercises scheduled for this day.
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CalendarChecklist;
